import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CryptoJS from 'crypto-js';

const HashGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [hashes, setHashes] = useState({});
  const [copied, setCopied] = useState({});
  const [fileInput, setFileInput] = useState(null);
  const [fileHashes, setFileHashes] = useState({});

  useEffect(() => {
    document.title = "Hash Generator"
  }, []);

  const generateHashes = (text) => {
    if (!text) {
      setHashes({});
      return;
    }

    const newHashes = {
      md5: CryptoJS.MD5(text).toString(),
      sha1: CryptoJS.SHA1(text).toString(),
      sha256: CryptoJS.SHA256(text).toString(),
      sha512: CryptoJS.SHA512(text).toString(),
      sha3: CryptoJS.SHA3(text).toString(),
      ripemd160: CryptoJS.RIPEMD160(text).toString(),
    };

    setHashes(newHashes);
  };

  const handleTextChange = (text) => {
    setInputText(text);
    generateHashes(text);
    setCopied({}); // Reset copied states
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setFileInput(null);
      setFileHashes({});
      return;
    }

    setFileInput(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
      
      const newFileHashes = {
        md5: CryptoJS.MD5(wordArray).toString(),
        sha1: CryptoJS.SHA1(wordArray).toString(),
        sha256: CryptoJS.SHA256(wordArray).toString(),
        sha512: CryptoJS.SHA512(wordArray).toString(),
        sha3: CryptoJS.SHA3(wordArray).toString(),
        ripemd160: CryptoJS.RIPEMD160(wordArray).toString(),
      };
      
      setFileHashes(newFileHashes);
    };
    
    reader.readAsArrayBuffer(file);
  };

  const handleCopy = (type, source = 'text') => {
    setCopied(prev => ({ ...prev, [`${source}_${type}`]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [`${source}_${type}`]: false }));
    }, 2000);
  };

  const hashTypes = [
    { 
      key: 'md5', 
      label: 'MD5', 
      description: '128-bit hash (deprecated for security)',
      color: 'warning'
    },
    { 
      key: 'sha1', 
      label: 'SHA-1', 
      description: '160-bit hash (deprecated for security)',
      color: 'warning'
    },
    { 
      key: 'sha256', 
      label: 'SHA-256', 
      description: '256-bit hash (recommended)',
      color: 'success'
    },
    { 
      key: 'sha512', 
      label: 'SHA-512', 
      description: '512-bit hash (most secure)',
      color: 'success'
    },
    { 
      key: 'sha3', 
      label: 'SHA-3', 
      description: '224-bit hash (latest standard)',
      color: 'info'
    },
    { 
      key: 'ripemd160', 
      label: 'RIPEMD-160', 
      description: '160-bit hash (alternative)',
      color: 'secondary'
    },
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="display-6">Hash Generator</h1>
            <p className="lead">Generate cryptographic hashes for text and files</p>
            <hr />

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Text Hash Generator</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="input-text">Enter text to hash</label>
                      <textarea
                        id="input-text"
                        className="form-control"
                        rows="4"
                        value={inputText}
                        onChange={(e) => handleTextChange(e.target.value)}
                        placeholder="Type or paste your text here..."
                      />
                      {inputText && (
                        <small className="text-muted">
                          {inputText.length} characters, {new Blob([inputText]).size} bytes
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">File Hash Generator</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="file-input">Select a file to hash</label>
                      <input
                        id="file-input"
                        type="file"
                        className="form-control-file"
                        onChange={handleFileSelect}
                      />
                      {fileInput && (
                        <div className="mt-2">
                          <small className="text-muted">
                            <strong>File:</strong> {fileInput.name}<br />
                            <strong>Size:</strong> {formatFileSize(fileInput.size)}<br />
                            <strong>Type:</strong> {fileInput.type || 'Unknown'}
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {(Object.keys(hashes).length > 0 || Object.keys(fileHashes).length > 0) && (
              <div className="row mt-4">
                <div className="col-12">
                  <h5 className="mb-3">Generated Hashes</h5>
                  
                  {Object.keys(hashes).length > 0 && (
                    <div className="mb-4">
                      <h6 className="text-muted">Text Hashes</h6>
                      {hashTypes.map(({ key, label, description, color }) => (
                        hashes[key] && (
                          <div key={key} className="card mb-2">
                            <div className="card-header d-flex justify-content-between align-items-center">
                              <div>
                                <span className={`badge badge-${color} mr-2`}>{label}</span>
                                <small className="text-muted">{description}</small>
                              </div>
                              <CopyToClipboard text={hashes[key]}>
                                <button 
                                  className={`btn btn-sm ${copied[`text_${key}`] ? 'btn-success' : 'btn-outline-primary'}`}
                                  onClick={() => handleCopy(key, 'text')}
                                >
                                  {copied[`text_${key}`] ? 'Copied!' : 'Copy'}
                                </button>
                              </CopyToClipboard>
                            </div>
                            <div className="card-body py-2">
                              <code style={{ 
                                wordBreak: 'break-all', 
                                fontSize: '0.9rem',
                                backgroundColor: 'transparent'
                              }}>
                                {hashes[key]}
                              </code>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {Object.keys(fileHashes).length > 0 && (
                    <div className="mb-4">
                      <h6 className="text-muted">File Hashes</h6>
                      {hashTypes.map(({ key, label, description, color }) => (
                        fileHashes[key] && (
                          <div key={key} className="card mb-2">
                            <div className="card-header d-flex justify-content-between align-items-center">
                              <div>
                                <span className={`badge badge-${color} mr-2`}>{label}</span>
                                <small className="text-muted">{description}</small>
                              </div>
                              <CopyToClipboard text={fileHashes[key]}>
                                <button 
                                  className={`btn btn-sm ${copied[`file_${key}`] ? 'btn-success' : 'btn-outline-primary'}`}
                                  onClick={() => handleCopy(key, 'file')}
                                >
                                  {copied[`file_${key}`] ? 'Copied!' : 'Copy'}
                                </button>
                              </CopyToClipboard>
                            </div>
                            <div className="card-body py-2">
                              <code style={{ 
                                wordBreak: 'break-all', 
                                fontSize: '0.9rem',
                                backgroundColor: 'transparent'
                              }}>
                                {fileHashes[key]}
                              </code>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="row mt-4">
              <div className="col-12">
                <div className="alert alert-info">
                  <h6><i className="fas fa-info-circle mr-2"></i>Hash Algorithm Information</h6>
                  <ul className="mb-0 small">
                    <li><strong>MD5 & SHA-1:</strong> Deprecated for security purposes, use only for non-cryptographic purposes</li>
                    <li><strong>SHA-256:</strong> Widely used and recommended for most applications</li>
                    <li><strong>SHA-512:</strong> More secure but produces longer hashes</li>
                    <li><strong>SHA-3:</strong> Latest standard, good for new applications</li>
                    <li><strong>RIPEMD-160:</strong> Alternative to SHA family algorithms</li>
                  </ul>
                </div>
              </div>
            </div>

            {!inputText && !fileInput && (
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Enter some text or select a file to generate cryptographic hashes
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashGenerator;