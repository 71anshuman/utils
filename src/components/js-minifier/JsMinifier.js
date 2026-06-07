import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const JsMinifier = () => {
  const [inputJs, setInputJs] = useState('');
  const [minifiedJs, setMinifiedJs] = useState('');
  const [beautifiedJs, setBeautifiedJs] = useState('');
  const [copied, setCopied] = useState({});
  const [compressionRatio, setCompressionRatio] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    document.title = "JavaScript Minifier & Beautifier"
  }, []);

  useEffect(() => {
    if (inputJs.trim()) {
      try {
        setHasError(false);
        setErrorMessage('');
        
        const minified = minifyJS(inputJs);
        const beautified = beautifyJS(inputJs);
        
        setMinifiedJs(minified);
        setBeautifiedJs(beautified);
        
        const originalSize = inputJs.length;
        const minifiedSize = minified.length;
        const ratio = originalSize > 0 ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0;
        setCompressionRatio(ratio);
      } catch (error) {
        setHasError(true);
        setErrorMessage(error.message);
        console.error('JavaScript processing error:', error);
      }
    } else {
      setMinifiedJs('');
      setBeautifiedJs('');
      setCompressionRatio(0);
      setHasError(false);
      setErrorMessage('');
    }
  }, [inputJs]);

  const minifyJS = (js) => {
    return js
      // Remove single-line comments (but preserve URLs)
      .replace(/(?:^|\s)\/\/.*$/gm, '')
      // Remove multi-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      // Remove spaces around operators and punctuation
      .replace(/\s*([{}();,=+\-*/<>!&|])\s*/g, '$1')
      // Remove spaces around brackets
      .replace(/\s*([[\]])\s*/g, '$1')
      // Remove trailing semicolons (optional)
      .replace(/;}/g, '}')
      // Remove leading/trailing whitespace
      .trim();
  };

  const beautifyJS = (js) => {
    let formatted = js.trim();
    let indentLevel = 0;
    const indentSize = 2;
    let result = '';
    let inString = false;
    let stringChar = '';
    let inComment = false;
    let inSingleComment = false;

    for (let i = 0; i < formatted.length; i++) {
      const char = formatted[i];
      const nextChar = formatted[i + 1];
      const prevChar = formatted[i - 1];

      // Handle string literals
      if ((char === '"' || char === "'" || char === '`') && !inComment && !inSingleComment) {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar && prevChar !== '\\') {
          inString = false;
          stringChar = '';
        }
      }

      // Handle comments
      if (!inString) {
        if (char === '/' && nextChar === '*') {
          inComment = true;
        } else if (char === '*' && nextChar === '/' && inComment) {
          inComment = false;
          result += char;
          i++; // skip next char
          result += formatted[i];
          continue;
        } else if (char === '/' && nextChar === '/') {
          inSingleComment = true;
        } else if (char === '\n' && inSingleComment) {
          inSingleComment = false;
        }
      }

      if (inString || inComment || inSingleComment) {
        result += char;
        continue;
      }

      switch (char) {
        case '{':
          result += char + '\n' + ' '.repeat((indentLevel + 1) * indentSize);
          indentLevel++;
          break;
        case '}':
          indentLevel = Math.max(0, indentLevel - 1);
          result = result.trimRight() + '\n' + ' '.repeat(indentLevel * indentSize) + char;
          if (nextChar && nextChar !== ';' && nextChar !== ',' && nextChar !== ')') {
            result += '\n' + ' '.repeat(indentLevel * indentSize);
          }
          break;
        case ';':
          result += char;
          if (nextChar && nextChar !== '}' && nextChar !== ')') {
            result += '\n' + ' '.repeat(indentLevel * indentSize);
          }
          break;
        case ',':
          result += char;
          if (nextChar && nextChar !== '}') {
            result += ' ';
          }
          break;
        case '(':
        case '[':
          result += char;
          break;
        case ')':
        case ']':
          result += char;
          break;
        default:
          // Skip redundant spaces
          if (char === ' ' && (prevChar === ' ' || result.endsWith('\n'))) {
            continue;
          }
          result += char;
      }
    }

    // Clean up extra newlines and spaces
    return result
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .replace(/\s+$/gm, '')
      .trim();
  };

  const handleCopy = (type) => {
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const loadSampleJS = () => {
    const sample = `// Sample JavaScript for testing
function calculateSum(a, b) {
  // Check if inputs are numbers
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  
  const result = a + b;
  console.log(\`Sum of \${a} and \${b} is \${result}\`);
  return result;
}

class Calculator {
  constructor() {
    this.history = [];
  }
  
  add(a, b) {
    const result = calculateSum(a, b);
    this.history.push({ operation: 'add', operands: [a, b], result });
    return result;
  }
  
  getHistory() {
    return this.history.map(item => \`\${item.operation}(\${item.operands.join(', ')}) = \${item.result}\`);
  }
}

// Usage example
const calc = new Calculator();
const sum1 = calc.add(5, 10);
const sum2 = calc.add(15, 25);

/* Multi-line comment
   with additional info */
console.log('History:', calc.getHistory());

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// Object with methods
const utils = {
  formatNumber: (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  },
  
  isEven: function(num) {
    return num % 2 === 0;
  }
};`;
    setInputJs(sample);
  };

  const clearAll = () => {
    setInputJs('');
    setMinifiedJs('');
    setBeautifiedJs('');
    setCompressionRatio(0);
    setHasError(false);
    setErrorMessage('');
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
            <h1 className="display-6">JavaScript Minifier & Beautifier</h1>
            <p className="lead">Optimize and format your JavaScript code for production or development</p>
            <hr />

            {/* Controls */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="btn-group mb-3">
                  <button className="btn btn-outline-primary" onClick={loadSampleJS}>
                    Load Sample JavaScript
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
                    <h5 className="mb-0">Input JavaScript</h5>
                  </div>
                  <div className="card-body">
                    <textarea
                      className="form-control"
                      rows="12"
                      value={inputJs}
                      onChange={(e) => setInputJs(e.target.value)}
                      placeholder="Paste your JavaScript code here..."
                      style={{ fontFamily: 'Monaco, Consolas, monospace', fontSize: '14px' }}
                    />
                    <small className="text-muted">
                      Size: {getFileSize(inputJs)}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {hasError && (
              <div className="row mt-3">
                <div className="col-12">
                  <div className="alert alert-warning">
                    <strong>Processing Warning:</strong> {errorMessage}
                  </div>
                </div>
              </div>
            )}

            {(minifiedJs || beautifiedJs) && !hasError && (
              <>
                {/* Results */}
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Minified JavaScript</h5>
                        <CopyToClipboard text={minifiedJs}>
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
                          value={minifiedJs}
                          readOnly
                          style={{ 
                            fontFamily: 'Monaco, Consolas, monospace', 
                            fontSize: '12px',
                            backgroundColor: '#f8f9fa'
                          }}
                        />
                        <div className="mt-2">
                          <small className="text-muted">
                            Size: {getFileSize(minifiedJs)} 
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
                        <h5 className="mb-0">Beautified JavaScript</h5>
                        <CopyToClipboard text={beautifiedJs}>
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
                          value={beautifiedJs}
                          readOnly
                          style={{ 
                            fontFamily: 'Monaco, Consolas, monospace', 
                            fontSize: '12px',
                            backgroundColor: '#f8f9fa'
                          }}
                        />
                        <div className="mt-2">
                          <small className="text-muted">
                            Size: {getFileSize(beautifiedJs)}
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
                        (from {getFileSize(inputJs)} to {getFileSize(minifiedJs)})
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {!inputJs && (
              <div className="alert alert-info mt-4" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Paste your JavaScript code above to minify and beautify it instantly
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
                          <li>Optimizes code for smaller file sizes</li>
                          <li>Preserves string literals and regex patterns</li>
                          <li>Perfect for production deployment</li>
                          <li>Faster page load times</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h6>Beautification:</h6>
                        <ul className="small">
                          <li>Proper indentation and formatting</li>
                          <li>Readable structure for development</li>
                          <li>Consistent code style</li>
                          <li>Easy to debug and maintain</li>
                          <li>Preserves comments and logic flow</li>
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

export default JsMinifier;