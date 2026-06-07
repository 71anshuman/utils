import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CssMinifier = () => {
  const [inputCss, setInputCss] = useState('');
  const [minifiedCss, setMinifiedCss] = useState('');
  const [beautifiedCss, setBeautifiedCss] = useState('');
  const [copied, setCopied] = useState({});
  const [compressionRatio, setCompressionRatio] = useState(0);

  useEffect(() => {
    document.title = "CSS Minifier & Beautifier"
  }, []);

  const minifyCSS = (css) => {
    return css
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      // Remove space around selectors and properties
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*}/g, '}')
      .replace(/;\s*/g, ';')
      .replace(/}\s*/g, '}')
      .replace(/:\s*/g, ':')
      .replace(/,\s*/g, ',')
      // Remove trailing semicolons before }
      .replace(/;}/g, '}')
      // Remove leading/trailing whitespace
      .trim();
  };

  const beautifyCSS = (css) => {
    let formatted = css
      // Remove comments for processing
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();

    // Add proper formatting
    formatted = formatted
      // Add newlines after selectors
      .replace(/\s*{\s*/g, ' {\n  ')
      // Add newlines after properties
      .replace(/;\s*/g, ';\n  ')
      // Add newlines after closing braces
      .replace(/}\s*/g, '\n}\n\n')
      // Add newlines after commas in selectors
      .replace(/,\s*/g, ',\n')
      // Add space after colons
      .replace(/:\s*/g, ': ')
      // Clean up extra newlines
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Remove extra spaces before closing braces
      .replace(/\s+}/g, '\n}')
      .trim();

    return formatted;
  };

  useEffect(() => {
    if (inputCss.trim()) {
      try {
        const minified = minifyCSS(inputCss);
        const beautified = beautifyCSS(inputCss);
        
        setMinifiedCss(minified);
        setBeautifiedCss(beautified);
        
        const originalSize = inputCss.length;
        const minifiedSize = minified.length;
        const ratio = originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0;
        setCompressionRatio(ratio);
      } catch (error) {
        console.error('CSS processing error:', error);
      }
    } else {
      setMinifiedCss('');
      setBeautifiedCss('');
      setCompressionRatio(0);
    }
  }, [inputCss]);

  const handleCopy = (type) => {
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const loadSampleCSS = () => {
    const sample = `/* Sample CSS for testing */
body {
  margin: 0;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header {
  color: #333;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .container {
    padding: 15px;
    margin: 10px;
  }
}`;
    setInputCss(sample);
  };

  const clearAll = () => {
    setInputCss('');
    setMinifiedCss('');
    setBeautifiedCss('');
    setCompressionRatio(0);
  };

  const getFileSize = (text) => {
    const bytes = new Blob([text]).size;
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6">CSS Minifier & Beautifier</h1>
            <p className="lead">Optimize and format your CSS code for production or development</p>
            <hr />

            {/* Controls */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="btn-group mb-3">
                  <button className="btn btn-outline-primary" onClick={loadSampleCSS}>
                    Load Sample CSS
                  </button>
                  <button className="btn btn-outline-secondary" onClick={clearAll}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Input CSS</h5>
                  </div>
                  <div className="card-body">
                    <textarea
                      className="form-control"
                      rows="12"
                      value={inputCss}
                      onChange={(e) => setInputCss(e.target.value)}
                      placeholder="Paste your CSS code here..."
                      style={{ fontFamily: 'Monaco, Consolas, monospace', fontSize: '14px' }}
                    />
                    <small className="text-muted">
                      Size: {getFileSize(inputCss)}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {(minifiedCss || beautifiedCss) && (
              <>
                {/* Results */}
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Minified CSS</h5>
                        <CopyToClipboard text={minifiedCss}>
                          <button 
                            className={`btn btn-sm ${copied.minified ? 'btn-success' : 'btn-outline-primary'}`}
                            onClick={() => handleCopy('minified')}
                          >
                            {copied.minified ? '✓ Copied!' : 'Copy'}
                          </button>
                        </CopyToClipboard>
                      </div>
                      <div className="card-body">
                        <textarea
                          className="form-control"
                          rows="10"
                          value={minifiedCss}
                          readOnly
                          style={{ 
                            fontFamily: 'Monaco, Consolas, monospace', 
                            fontSize: '12px',
                            backgroundColor: '#f8f9fa'
                          }}
                        />
                        <div className="mt-2">
                          <small className="text-muted">
                            Size: {getFileSize(minifiedCss)} 
                            {compressionRatio > 0 && (
                              <span className="text-success ml-2">
                                ({compressionRatio}% reduction)
                              </span>
                            )}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Beautified CSS</h5>
                        <CopyToClipboard text={beautifiedCss}>
                          <button 
                            className={`btn btn-sm ${copied.beautified ? 'btn-success' : 'btn-outline-primary'}`}
                            onClick={() => handleCopy('beautified')}
                          >
                            {copied.beautified ? '✓ Copied!' : 'Copy'}
                          </button>
                        </CopyToClipboard>
                      </div>
                      <div className="card-body">
                        <textarea
                          className="form-control"
                          rows="10"
                          value={beautifiedCss}
                          readOnly
                          style={{ 
                            fontFamily: 'Monaco, Consolas, monospace', 
                            fontSize: '12px',
                            backgroundColor: '#f8f9fa'
                          }}
                        />
                        <div className="mt-2">
                          <small className="text-muted">
                            Size: {getFileSize(beautifiedCss)}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                {compressionRatio > 0 && (
                  <div className="row mt-4">
                    <div className="col-12">
                      <div className="alert alert-success">
                        <strong>Minification Complete!</strong> 
                        Reduced file size by {compressionRatio}% 
                        (from {getFileSize(inputCss)} to {getFileSize(minifiedCss)})
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {!inputCss && (
              <div className="alert alert-info mt-4" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Paste your CSS code above to minify and beautify it instantly
              </div>
            )}

            {/* Features */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Features</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h6>Minification:</h6>
                        <ul className="small">
                          <li>Removes comments and unnecessary whitespace</li>
                          <li>Optimizes selectors and properties</li>
                          <li>Reduces file size for faster loading</li>
                          <li>Perfect for production deployment</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h6>Beautification:</h6>
                        <ul className="small">
                          <li>Proper indentation and formatting</li>
                          <li>Readable structure for development</li>
                          <li>Consistent code style</li>
                          <li>Easy to debug and maintain</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssMinifier;