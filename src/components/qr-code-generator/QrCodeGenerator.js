import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

const QrCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [qrSize, setQrSize] = useState(256);
  const qrRef = React.useRef();

  useEffect(() => {
    document.title = "QR Code Generator"
  }, []);

  const handleDownload = () => {
    const svg = qrRef.current.querySelector('svg');
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const img = new window.Image();
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'qr-code.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgString)));
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="display-6">QR Code Generator</h1>
            <p className="lead">Generate QR codes for any text, URL, or data</p>
            <hr />
            
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="qr-input">Enter text or URL</label>
                  <div className="input-group">
                    <input
                      id="qr-input"
                      type="text"
                      className="form-control"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Enter text, URL, or any data..."
                    />
                    {input && (
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={clearInput}>
                          Clear
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="qr-size">QR Code Size</label>
                  <select 
                    id="qr-size"
                    className="form-control"
                    value={qrSize}
                    onChange={e => setQrSize(parseInt(e.target.value))}
                  >
                    <option value={128}>Small (128px)</option>
                    <option value={256}>Medium (256px)</option>
                    <option value={384}>Large (384px)</option>
                    <option value={512}>Extra Large (512px)</option>
                  </select>
                </div>
              </div>
            </div>

            {input && (
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Generated QR Code</h5>
                    </div>
                    <div className="card-body text-center">
                      <div ref={qrRef} className="mb-3">
                        <QRCode 
                          value={input} 
                          size={qrSize}
                          style={{ maxWidth: '100%', height: 'auto' }}
                        />
                      </div>
                      <button 
                        onClick={handleDownload} 
                        className="btn btn-primary btn-lg"
                      >
                        <i className="fas fa-download mr-2"></i>
                        Download QR Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!input && (
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Enter some text or URL above to generate a QR code
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerator;
