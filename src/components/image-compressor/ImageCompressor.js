import React, { useState, useEffect, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ImageCompressor = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [targetWidth, setTargetWidth] = useState('');
  const [targetHeight, setTargetHeight] = useState('');
  const [outputFormat, setOutputFormat] = useState('jpeg');
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.title = "Image Compressor & Converter"
  }, []);

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    setSelectedFile(file);
    setOriginalSize(file.size);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
        setTargetWidth(img.width);
        setTargetHeight(img.height);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const compressImage = () => {
    if (!originalImage) return;

    setIsProcessing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    const width = parseInt(targetWidth) || originalImage.width;
    const height = parseInt(targetHeight) || originalImage.height;
    
    canvas.width = width;
    canvas.height = height;

    // Draw and compress image
    ctx.drawImage(originalImage, 0, 0, width, height);
    
    const quality = compressionLevel / 100;
    const mimeType = `image/${outputFormat}`;
    
    canvas.toBlob((blob) => {
      if (blob) {
        setCompressedSize(blob.size);
        const url = URL.createObjectURL(blob);
        setCompressedImage({ url, blob, mimeType });
      }
      setIsProcessing(false);
    }, mimeType, quality);
  };

  const downloadImage = () => {
    if (!compressedImage) return;

    const link = document.createElement('a');
    link.href = compressedImage.url;
    link.download = `compressed_image.${outputFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetTool = () => {
    setSelectedFile(null);
    setOriginalImage(null);
    setCompressedImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setCompressionLevel(80);
    setTargetWidth('');
    setTargetHeight('');
    setOutputFormat('jpeg');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const maintainAspectRatio = (dimension, value) => {
    if (!originalImage || !value) return;
    
    const aspectRatio = originalImage.width / originalImage.height;
    
    if (dimension === 'width') {
      setTargetHeight(Math.round(value / aspectRatio));
    } else {
      setTargetWidth(Math.round(value * aspectRatio));
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompressionRatio = () => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6">Image Compressor & Converter</h1>
            <p className="lead">Compress, resize, and convert image formats online</p>
            <hr />

            {/* File Upload Area */}
            <div className="row">
              <div className="col-12">
                <div 
                  className="card border-dashed"
                  style={{ borderStyle: 'dashed', borderColor: '#007bff', backgroundColor: '#f8f9fa' }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="card-body text-center py-5">
                    <i className="fas fa-cloud-upload-alt fa-3x text-primary mb-3"></i>
                    <h5>Drop your image here or click to select</h5>
                    <p className="text-muted">Supports: JPG, PNG, WebP, GIF</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                      className="d-none"
                      id="file-input"
                    />
                    <label htmlFor="file-input" className="btn btn-primary">
                      Select Image
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {originalImage && (
              <>
                {/* Controls */}
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Compression Settings</h5>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label>Quality: {compressionLevel}%</label>
                          <input
                            type="range"
                            className="form-control-range"
                            min="10"
                            max="100"
                            value={compressionLevel}
                            onChange={(e) => setCompressionLevel(e.target.value)}
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Output Format</label>
                          <select
                            className="form-control"
                            value={outputFormat}
                            onChange={(e) => setOutputFormat(e.target.value)}
                          >
                            <option value="jpeg">JPEG</option>
                            <option value="png">PNG</option>
                            <option value="webp">WebP</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Resize Options</h5>
                      </div>
                      <div className="card-body">
                        <div className="form-row">
                          <div className="col-6">
                            <div className="form-group">
                              <label>Width (px)</label>
                              <input
                                type="number"
                                className="form-control"
                                value={targetWidth}
                                onChange={(e) => {
                                  setTargetWidth(e.target.value);
                                  maintainAspectRatio('width', e.target.value);
                                }}
                                placeholder="Width"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group">
                              <label>Height (px)</label>
                              <input
                                type="number"
                                className="form-control"
                                value={targetHeight}
                                onChange={(e) => {
                                  setTargetHeight(e.target.value);
                                  maintainAspectRatio('height', e.target.value);
                                }}
                                placeholder="Height"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <button
                          className="btn btn-success btn-block"
                          onClick={compressImage}
                          disabled={isProcessing}
                        >
                          {isProcessing ? 'Processing...' : 'Compress & Convert'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Original vs Compressed */}
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Original Image</h5>
                      </div>
                      <div className="card-body text-center">
                        <img
                          src={originalImage.src}
                          alt="Original"
                          style={{ maxWidth: '100%', maxHeight: '300px' }}
                          className="img-fluid mb-3"
                        />
                        <p className="text-muted">
                          Size: {formatFileSize(originalSize)}<br/>
                          Dimensions: {originalImage.width} × {originalImage.height}px
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Compressed Image</h5>
                      </div>
                      <div className="card-body text-center">
                        {compressedImage ? (
                          <>
                            <img
                              src={compressedImage.url}
                              alt="Compressed"
                              style={{ maxWidth: '100%', maxHeight: '300px' }}
                              className="img-fluid mb-3"
                            />
                            <p className="text-muted">
                              Size: {formatFileSize(compressedSize)}<br/>
                              Reduction: {getCompressionRatio()}%<br/>
                              Dimensions: {targetWidth} × {targetHeight}px
                            </p>
                            <div className="btn-group d-block">
                              <button
                                className="btn btn-primary mr-2"
                                onClick={downloadImage}
                              >
                                Download
                              </button>
                              <button
                                className="btn btn-outline-secondary"
                                onClick={resetTool}
                              >
                                Reset
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
                            <p className="text-muted">Compressed image will appear here</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {compressedImage && (
                  <div className="row mt-4">
                    <div className="col-12">
                      <div className="alert alert-success">
                        <strong>Compression Complete!</strong> 
                        {getCompressionRatio() > 0 ? 
                          ` Reduced file size by ${getCompressionRatio()}% (${formatFileSize(originalSize - compressedSize)} saved)` :
                          ' Image processed successfully'
                        }
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {!originalImage && (
              <div className="alert alert-info mt-4" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Select an image to start compressing and converting
              </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;