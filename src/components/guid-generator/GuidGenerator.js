import React, { useState, useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const GuidGenerator = () => {
  const [guids, setGuids] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [format, setFormat] = useState('standard');
  const [uppercase, setUppercase] = useState(false);
  const [includeHyphens, setIncludeHyphens] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(-1);

  useEffect(() => {
    document.title = "GUID/UUID Generator"
  }, []);

  // Generate a random UUID v4
  const generateUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const formatGuid = (guid) => {
    let formatted = guid;

    // Remove hyphens if not included
    if (!includeHyphens) {
      formatted = formatted.replace(/-/g, '');
    }

    // Apply format
    switch (format) {
      case 'brackets':
        formatted = `{${formatted}}`;
        break;
      case 'parentheses':
        formatted = `(${formatted})`;
        break;
      case 'quotes':
        formatted = `"${formatted}"`;
        break;
      case 'csharp':
        formatted = `new Guid("${formatted}")`;
        break;
      case 'javascript':
        formatted = `'${formatted}'`;
        break;
      case 'standard':
      default:
        break;
    }

    // Apply case
    return uppercase ? formatted.toUpperCase() : formatted.toLowerCase();
  };

  const generateGuids = () => {
    const newGuids = [];
    for (let i = 0; i < Math.max(1, Math.min(100, quantity)); i++) {
      const uuid = generateUuid();
      newGuids.push(formatGuid(uuid));
    }
    setGuids(newGuids);
    setCopiedIndex(-1);
  };

  const copyAllGuids = () => {
    return guids.join('\n');
  };

  const handleCopy = (index) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(-1), 2000);
  };

  const clearGuids = () => {
    setGuids([]);
    setCopiedIndex(-1);
  };

  useEffect(() => {
    generateGuids();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="fas fa-fingerprint mr-2"></i>
                GUID/UUID Generator
              </h4>
              <small>Generate unique identifiers (GUIDs/UUIDs) in various formats</small>
            </div>
            <div className="card-body">
              {/* Options */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="quantity">
                      <strong>Quantity:</strong>
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      className="form-control"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      min="1"
                      max="100"
                      placeholder="Enter quantity (1-100)"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="format">
                      <strong>Format:</strong>
                    </label>
                    <select
                      id="format"
                      className="form-control"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                    >
                      <option value="standard">Standard</option>
                      <option value="brackets">Brackets {'{}'}</option>
                      <option value="parentheses">Parentheses ()</option>
                      <option value="quotes">Quotes ""</option>
                      <option value="csharp">C# new Guid()</option>
                      <option value="javascript">JavaScript ''</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="uppercase"
                      className="form-check-input"
                      checked={uppercase}
                      onChange={(e) => setUppercase(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="uppercase">
                      Uppercase
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="hyphens"
                      className="form-check-input"
                      checked={includeHyphens}
                      onChange={(e) => setIncludeHyphens(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="hyphens">
                      Include Hyphens
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="row mb-4">
                <div className="col-md-12">
                  <button
                    className="btn btn-success mr-2 mb-2"
                    onClick={generateGuids}
                  >
                    <i className="fas fa-sync-alt mr-1"></i>
                    Generate New GUIDs
                  </button>
                  {guids.length > 1 && (
                    <CopyToClipboard
                      text={copyAllGuids()}
                      onCopy={() => handleCopy(-2)}
                    >
                      <button className="btn btn-info mr-2 mb-2">
                        <i className="fas fa-copy mr-1"></i>
                        Copy All ({guids.length})
                        {copiedIndex === -2 && (
                          <span className="text-success ml-1">✓</span>
                        )}
                      </button>
                    </CopyToClipboard>
                  )}
                  <button
                    className="btn btn-secondary mb-2"
                    onClick={clearGuids}
                  >
                    <i className="fas fa-trash mr-1"></i>
                    Clear
                  </button>
                </div>
              </div>

              {/* Generated GUIDs */}
              {guids.length > 0 && (
                <div>
                  <h5 className="mb-3">
                    Generated GUIDs ({guids.length}):
                  </h5>
                  <div className="guid-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {guids.map((guid, index) => (
                      <div key={index} className="card mb-2">
                        <div className="card-body py-2">
                          <div className="d-flex justify-content-between align-items-center">
                            <code 
                              className="text-primary flex-grow-1 mr-2"
                              style={{ fontSize: '14px', wordBreak: 'break-all' }}
                            >
                              {guid}
                            </code>
                            <CopyToClipboard
                              text={guid}
                              onCopy={() => handleCopy(index)}
                            >
                              <button className="btn btn-sm btn-outline-primary">
                                <i className="fas fa-copy mr-1"></i>
                                {copiedIndex === index ? 'Copied!' : 'Copy'}
                              </button>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="mt-4">
                <div className="alert alert-info">
                  <h6><i className="fas fa-info-circle mr-1"></i>About GUIDs/UUIDs:</h6>
                  <ul className="mb-0 small">
                    <li><strong>GUID:</strong> Globally Unique Identifier (Microsoft term)</li>
                    <li><strong>UUID:</strong> Universally Unique Identifier (RFC standard)</li>
                    <li><strong>Version 4:</strong> Random or pseudo-random generated</li>
                    <li><strong>Format:</strong> 8-4-4-4-12 hexadecimal digits</li>
                    <li><strong>Probability of collision:</strong> Negligible (1 in 2^122)</li>
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

export default GuidGenerator;