import React, { useState, useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

// Simple ASCII art fonts
const fonts = {
  standard: {
    name: 'Standard',
    chars: {
      'A': ['  █  ', ' ███ ', '█   █', '█████', '█   █'],
      'B': ['████ ', '█   █', '████ ', '█   █', '████ '],
      'C': [' ████', '█    ', '█    ', '█    ', ' ████'],
      'D': ['████ ', '█   █', '█   █', '█   █', '████ '],
      'E': ['█████', '█    ', '███  ', '█    ', '█████'],
      'F': ['█████', '█    ', '███  ', '█    ', '█    '],
      'G': [' ████', '█    ', '█ ███', '█   █', ' ████'],
      'H': ['█   █', '█   █', '█████', '█   █', '█   █'],
      'I': ['█████', '  █  ', '  █  ', '  █  ', '█████'],
      'J': ['█████', '    █', '    █', '█   █', ' ████'],
      'K': ['█   █', '█  █ ', '███  ', '█  █ ', '█   █'],
      'L': ['█    ', '█    ', '█    ', '█    ', '█████'],
      'M': ['█   █', '██ ██', '█ █ █', '█   █', '█   █'],
      'N': ['█   █', '██  █', '█ █ █', '█  ██', '█   █'],
      'O': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
      'P': ['████ ', '█   █', '████ ', '█    ', '█    '],
      'Q': [' ███ ', '█   █', '█ █ █', '█  ██', ' ████'],
      'R': ['████ ', '█   █', '████ ', '█  █ ', '█   █'],
      'S': [' ████', '█    ', ' ███ ', '    █', '████ '],
      'T': ['█████', '  █  ', '  █  ', '  █  ', '  █  '],
      'U': ['█   █', '█   █', '█   █', '█   █', ' ███ '],
      'V': ['█   █', '█   █', '█   █', ' █ █ ', '  █  '],
      'W': ['█   █', '█   █', '█ █ █', '██ ██', '█   █'],
      'X': ['█   █', ' █ █ ', '  █  ', ' █ █ ', '█   █'],
      'Y': ['█   █', ' █ █ ', '  █  ', '  █  ', '  █  '],
      'Z': ['█████', '   █ ', '  █  ', ' █   ', '█████'],
      ' ': ['     ', '     ', '     ', '     ', '     '],
      '0': [' ███ ', '█   █', '█   █', '█   █', ' ███ '],
      '1': ['  █  ', ' ██  ', '  █  ', '  █  ', '█████'],
      '2': [' ███ ', '█   █', '  ██ ', ' █   ', '█████'],
      '3': ['████ ', '    █', ' ███ ', '    █', '████ '],
      '4': ['█   █', '█   █', '█████', '    █', '    █'],
      '5': ['█████', '█    ', '████ ', '    █', '████ '],
      '6': [' ████', '█    ', '████ ', '█   █', ' ███ '],
      '7': ['█████', '    █', '   █ ', '  █  ', ' █   '],
      '8': [' ███ ', '█   █', ' ███ ', '█   █', ' ███ '],
      '9': [' ███ ', '█   █', ' ████', '    █', ' ███ ']
    }
  },
  small: {
    name: 'Small',
    chars: {
      'A': [' █ ', '███', '█ █'],
      'B': ['██ ', '██ ', '██ '],
      'C': ['██', '█ ', '██'],
      'D': ['██ ', '█ █', '██ '],
      'E': ['███', '██ ', '███'],
      'F': ['███', '██ ', '█  '],
      'G': ['██', '██', '██'],
      'H': ['█ █', '███', '█ █'],
      'I': ['███', ' █ ', '███'],
      'J': ['███', '  █', '██ '],
      'K': ['█ █', '██ ', '█ █'],
      'L': ['█  ', '█  ', '███'],
      'M': ['███', '███', '█ █'],
      'N': ['███', '█ █', '█ █'],
      'O': ['███', '█ █', '███'],
      'P': ['██ ', '██ ', '█  '],
      'Q': ['███', '███', '███'],
      'R': ['██ ', '██ ', '█ █'],
      'S': ['███', '██ ', '███'],
      'T': ['███', ' █ ', ' █ '],
      'U': ['█ █', '█ █', '███'],
      'V': ['█ █', '█ █', ' █ '],
      'W': ['█ █', '███', '███'],
      'X': ['█ █', ' █ ', '█ █'],
      'Y': ['█ █', ' █ ', ' █ '],
      'Z': ['███', ' █ ', '███'],
      ' ': ['   ', '   ', '   '],
      '0': ['███', '█ █', '███'],
      '1': [' █ ', ' █ ', ' █ '],
      '2': ['██ ', ' █ ', '███'],
      '3': ['██ ', ' █ ', '██ '],
      '4': ['█ █', '███', '  █'],
      '5': ['███', '██ ', '██ '],
      '6': ['███', '██ ', '███'],
      '7': ['███', '  █', '  █'],
      '8': ['███', '███', '███'],
      '9': ['███', ' ██', '███']
    }
  },
  block: {
    name: 'Block',
    chars: {
      'A': ['██████', '██  ██', '██████', '██  ██', '██  ██'],
      'B': ['██████', '██  ██', '██████', '██  ██', '██████'],
      'C': ['██████', '██    ', '██    ', '██    ', '██████'],
      'D': ['██████', '██  ██', '██  ██', '██  ██', '██████'],
      'E': ['██████', '██    ', '██████', '██    ', '██████'],
      'F': ['██████', '██    ', '██████', '██    ', '██    '],
      'G': ['██████', '██    ', '██████', '██  ██', '██████'],
      'H': ['██  ██', '██  ██', '██████', '██  ██', '██  ██'],
      'I': ['██████', '  ██  ', '  ██  ', '  ██  ', '██████'],
      'J': ['██████', '    ██', '    ██', '██  ██', '██████'],
      'K': ['██  ██', '████  ', '██    ', '████  ', '██  ██'],
      'L': ['██    ', '██    ', '██    ', '██    ', '██████'],
      'M': ['██  ██', '██████', '██████', '██  ██', '██  ██'],
      'N': ['██  ██', '██████', '██████', '██  ██', '██  ██'],
      'O': ['██████', '██  ██', '██  ██', '██  ██', '██████'],
      'P': ['██████', '██  ██', '██████', '██    ', '██    '],
      'Q': ['██████', '██  ██', '██  ██', '██████', '██████'],
      'R': ['██████', '██  ██', '██████', '████  ', '██  ██'],
      'S': ['██████', '██    ', '██████', '    ██', '██████'],
      'T': ['██████', '  ██  ', '  ██  ', '  ██  ', '  ██  '],
      'U': ['██  ██', '██  ██', '██  ██', '██  ██', '██████'],
      'V': ['██  ██', '██  ██', '██  ██', '██████', '  ██  '],
      'W': ['██  ██', '██  ██', '██████', '██████', '██  ██'],
      'X': ['██  ██', '██████', '  ██  ', '██████', '██  ██'],
      'Y': ['██  ██', '██  ██', '  ██  ', '  ██  ', '  ██  '],
      'Z': ['██████', '    ██', '  ██  ', '██    ', '██████'],
      ' ': ['      ', '      ', '      ', '      ', '      '],
      '0': ['██████', '██  ██', '██  ██', '██  ██', '██████'],
      '1': ['  ██  ', '████  ', '  ██  ', '  ██  ', '██████'],
      '2': ['██████', '    ██', '██████', '██    ', '██████'],
      '3': ['██████', '    ██', '██████', '    ██', '██████'],
      '4': ['██  ██', '██  ██', '██████', '    ██', '    ██'],
      '5': ['██████', '██    ', '██████', '    ██', '██████'],
      '6': ['██████', '██    ', '██████', '██  ██', '██████'],
      '7': ['██████', '    ██', '    ██', '    ██', '    ██'],
      '8': ['██████', '██  ██', '██████', '██  ██', '██████'],
      '9': ['██████', '██  ██', '██████', '    ██', '██████']
    }
  }
};

const AsciiArtGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [asciiArt, setAsciiArt] = useState('');
  const [font, setFont] = useState('standard');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "ASCII Art Generator"
  }, []);

  useEffect(() => {
    if (!inputText.trim()) {
      setAsciiArt('');
      return;
    }

    setLoading(true);
    
    // Simulate processing time for better UX
    const timeoutId = setTimeout(() => {
      const selectedFont = fonts[font];
      const lines = selectedFont.chars['A'].length;
      const result = [];

      // Initialize empty lines
      for (let i = 0; i < lines; i++) {
        result[i] = '';
      }

      // Process each character
      for (let charIndex = 0; charIndex < inputText.length; charIndex++) {
        const char = inputText[charIndex].toUpperCase();
        const charPattern = selectedFont.chars[char];

        if (charPattern) {
          for (let lineIndex = 0; lineIndex < lines; lineIndex++) {
            result[lineIndex] += charPattern[lineIndex];
            // Add space between characters (except last character)
            if (charIndex < inputText.length - 1) {
              result[lineIndex] += ' ';
            }
          }
        }
      }

      setAsciiArt(result.join('\n'));
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputText, font]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Limit to reasonable length to prevent performance issues
    if (value.length <= 20) {
      setInputText(value);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setInputText('');
    setAsciiArt('');
    setCopied(false);
  };

  const presetTexts = ['HELLO', 'WORLD', 'ASCII', 'ART', '2024'];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">
                <i className="fas fa-font mr-2"></i>
                ASCII Art Generator
              </h4>
              <small>Convert text into ASCII art using different fonts</small>
            </div>
            <div className="card-body">
              {/* Input Controls */}
              <div className="row mb-4">
                <div className="col-md-8">
                  <div className="form-group">
                    <label htmlFor="textInput">
                      <strong>Text to Convert:</strong>
                    </label>
                    <input
                      type="text"
                      id="textInput"
                      className="form-control"
                      value={inputText}
                      onChange={handleInputChange}
                      placeholder="Enter text (max 20 characters)"
                      maxLength="20"
                    />
                    <small className="form-text text-muted">
                      {inputText.length}/20 characters
                    </small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="fontSelect">
                      <strong>Font Style:</strong>
                    </label>
                    <select
                      id="fontSelect"
                      className="form-control"
                      value={font}
                      onChange={(e) => setFont(e.target.value)}
                    >
                      {Object.entries(fonts).map(([key, fontData]) => (
                        <option key={key} value={key}>
                          {fontData.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="row mb-4">
                <div className="col-md-12">
                  <label className="mb-2">
                    <strong>Quick Presets:</strong>
                  </label>
                  <div>
                    {presetTexts.map((preset, index) => (
                      <button
                        key={index}
                        className="btn btn-outline-primary btn-sm mr-2 mb-2"
                        onClick={() => setInputText(preset)}
                        disabled={loading}
                      >
                        {preset}
                      </button>
                    ))}
                    <button
                      className="btn btn-outline-secondary btn-sm mb-2"
                      onClick={clearText}
                    >
                      <i className="fas fa-trash mr-1"></i>
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* ASCII Art Output */}
              {(loading || asciiArt) && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">
                      <i className="fas fa-palette mr-2"></i>
                      ASCII Art Output:
                    </h5>
                    {asciiArt && !loading && (
                      <CopyToClipboard text={asciiArt} onCopy={handleCopy}>
                        <button className="btn btn-success">
                          <i className="fas fa-copy mr-1"></i>
                          {copied ? 'Copied!' : 'Copy ASCII Art'}
                        </button>
                      </CopyToClipboard>
                    )}
                  </div>

                  <div 
                    className="card bg-dark text-white"
                    style={{ minHeight: '200px' }}
                  >
                    <div className="card-body">
                      {loading ? (
                        <div className="d-flex justify-content-center align-items-center h-100">
                          <div className="text-center">
                            <div className="spinner-border text-light mb-3" role="status">
                              <span className="sr-only">Generating...</span>
                            </div>
                            <div>Generating ASCII Art...</div>
                          </div>
                        </div>
                      ) : (
                        <pre 
                          className="text-white mb-0"
                          style={{ 
                            fontSize: '12px',
                            lineHeight: '1.2',
                            fontFamily: 'Monaco, "Lucida Console", monospace',
                            overflow: 'auto'
                          }}
                        >
                          {asciiArt || 'Enter text above to generate ASCII art'}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Font Preview */}
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fas fa-eye mr-1"></i>
                        Font Preview ({fonts[font].name})
                      </h6>
                    </div>
                    <div className="card-body bg-dark text-white">
                      <pre 
                        className="text-white mb-0"
                        style={{ 
                          fontSize: '10px',
                          lineHeight: '1.1',
                          fontFamily: 'Monaco, "Lucida Console", monospace'
                        }}
                      >
                        {(() => {
                          const sampleText = 'ABC 123';
                          const selectedFont = fonts[font];
                          const lines = selectedFont.chars['A'].length;
                          const result = [];

                          for (let i = 0; i < lines; i++) {
                            result[i] = '';
                          }

                          for (let charIndex = 0; charIndex < sampleText.length; charIndex++) {
                            const char = sampleText[charIndex].toUpperCase();
                            const charPattern = selectedFont.chars[char];

                            if (charPattern) {
                              for (let lineIndex = 0; lineIndex < lines; lineIndex++) {
                                result[lineIndex] += charPattern[lineIndex];
                                if (charIndex < sampleText.length - 1) {
                                  result[lineIndex] += ' ';
                                }
                              }
                            }
                          }

                          return result.join('\n');
                        })()}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4">
                <div className="alert alert-info">
                  <h6><i className="fas fa-info-circle mr-1"></i>Tips:</h6>
                  <ul className="mb-0 small">
                    <li>Keep text short (max 20 characters) for best results</li>
                    <li>Only letters, numbers, and spaces are supported</li>
                    <li>Try different fonts to find the style you prefer</li>
                    <li>ASCII art works best with monospace fonts when displayed</li>
                    <li>Copy the generated art to use in text files, emails, or code comments</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsciiArtGenerator;