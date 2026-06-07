import React, { useState, useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const CsvToJsonConverter = () => {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [hasHeaders, setHasHeaders] = useState(true);
  const [indentSpaces, setIndentSpaces] = useState(2);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    document.title = "CSV to JSON Converter"
  }, []);

  const parseCSV = (csvText) => {
    if (!csvText.trim()) return [];

    const lines = csvText.trim().split('\n');
    const result = [];
    
    // Parse CSV with proper handling of quotes and delimiters
    const parseCSVLine = (line) => {
      const values = [];
      let current = '';
      let inQuotes = false;
      let i = 0;

      while (i < line.length) {
        const char = line[i];
        
        if (char === '"') {
          if (inQuotes && line[i + 1] === '"') {
            // Escaped quote
            current += '"';
            i += 2;
          } else {
            // Toggle quote state
            inQuotes = !inQuotes;
            i++;
          }
        } else if (char === delimiter && !inQuotes) {
          // End of field
          values.push(current.trim());
          current = '';
          i++;
        } else {
          current += char;
          i++;
        }
      }
      
      // Add the last field
      values.push(current.trim());
      return values;
    };

    try {
      const parsedLines = lines.map(parseCSVLine);
      
      if (hasHeaders) {
        const headers = parsedLines[0];
        for (let i = 1; i < parsedLines.length; i++) {
          const row = parsedLines[i];
          const obj = {};
          
          headers.forEach((header, index) => {
            const value = row[index] || '';
            // Try to parse numbers and booleans
            let parsedValue = value;
            
            if (value === 'true') parsedValue = true;
            else if (value === 'false') parsedValue = false;
            else if (value === 'null') parsedValue = null;
            else if (value === '') parsedValue = '';
            else if (!isNaN(value) && !isNaN(parseFloat(value)) && value.trim() !== '') {
              parsedValue = parseFloat(value);
            }
            
            obj[header] = parsedValue;
          });
          result.push(obj);
        }
      } else {
        // No headers, use array of arrays
        return parsedLines;
      }
      
      return result;
    } catch (err) {
      throw new Error('Failed to parse CSV: ' + err.message);
    }
  };

  // Auto-convert when inputs change
  useEffect(() => {
    const parseCSV = (csvText) => {
      if (!csvText.trim()) return [];

      const lines = csvText.trim().split('\n');
      const result = [];
      
      // Parse CSV with proper handling of quotes and delimiters
      const parseCSVLine = (line) => {
        const values = [];
        let current = '';
        let inQuotes = false;
        let i = 0;

        while (i < line.length) {
          const char = line[i];
          
          if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
              // Escaped quote
              current += '"';
              i += 2;
            } else {
              // Toggle quote state
              inQuotes = !inQuotes;
              i++;
            }
          } else if (char === delimiter && !inQuotes) {
            // End of field
            values.push(current.trim());
            current = '';
            i++;
          } else {
            current += char;
            i++;
          }
        }
        
        // Add the last field
        values.push(current.trim());
        return values;
      };

      try {
        const parsedLines = lines.map(parseCSVLine);
        
        if (hasHeaders) {
          const headers = parsedLines[0];
          for (let i = 1; i < parsedLines.length; i++) {
            const row = parsedLines[i];
            const obj = {};
            
            headers.forEach((header, index) => {
              const value = row[index] || '';
              // Try to parse numbers and booleans
              let parsedValue = value;
              
              if (value === 'true') parsedValue = true;
              else if (value === 'false') parsedValue = false;
              else if (value === 'null') parsedValue = null;
              else if (value === '') parsedValue = '';
              else if (!isNaN(value) && !isNaN(parseFloat(value)) && value.trim() !== '') {
                parsedValue = parseFloat(value);
              }
              
              obj[header] = parsedValue;
            });
            result.push(obj);
          }
        } else {
          // No headers, use array of arrays
          return parsedLines;
        }
        
        return result;
      } catch (err) {
        throw new Error('Failed to parse CSV: ' + err.message);
      }
    };

    setError('');
    
    if (!csvInput.trim()) {
      setJsonOutput('');
      return;
    }

    try {
      const data = parseCSV(csvInput);
      const jsonString = JSON.stringify(data, null, indentSpaces);
      setJsonOutput(jsonString);
    } catch (err) {
      setError(err.message);
      setJsonOutput('');
    }
  }, [csvInput, delimiter, hasHeaders, indentSpaces]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setCsvInput('');
    setJsonOutput('');
    setError('');
    setCopied(false);
  };

  const loadExample = () => {
    const example = `name,age,city,active
"John Doe",30,"New York",true
"Jane Smith",25,"Los Angeles",false
"Bob Johnson",35,"Chicago",true
"Alice Brown",28,"Houston",true`;
    
    setCsvInput(example);
  };

  const downloadJSON = () => {
    if (!jsonOutput) return;
    
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-warning text-white">
              <h4 className="mb-0">
                <i className="fas fa-table mr-2"></i>
                CSV to JSON Converter
              </h4>
              <small>Convert CSV data to JSON format with customizable options</small>
            </div>
            <div className="card-body">
              {/* Options */}
              <div className="row mb-4">
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="delimiter">
                      <strong>Delimiter:</strong>
                    </label>
                    <select
                      id="delimiter"
                      className="form-control"
                      value={delimiter}
                      onChange={(e) => setDelimiter(e.target.value)}
                    >
                      <option value=",">Comma (,)</option>
                      <option value=";">Semicolon (;)</option>
                      <option value="\t">Tab</option>
                      <option value="|">Pipe (|)</option>
                    </select>
                  </div>
                </div>
                
                <div className="col-md-3">
                  <div className="form-group">
                    <label htmlFor="indent">
                      <strong>JSON Indentation:</strong>
                    </label>
                    <select
                      id="indent"
                      className="form-control"
                      value={indentSpaces}
                      onChange={(e) => setIndentSpaces(parseInt(e.target.value))}
                    >
                      <option value={0}>Minified (0 spaces)</option>
                      <option value={2}>2 spaces</option>
                      <option value={4}>4 spaces</option>
                      <option value={8}>8 spaces</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label>&nbsp;</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="hasHeaders"
                        className="form-check-input"
                        checked={hasHeaders}
                        onChange={(e) => setHasHeaders(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="hasHeaders">
                        First row contains headers
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label>&nbsp;</label>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        id="previewMode"
                        className="form-check-input"
                        checked={previewMode}
                        onChange={(e) => setPreviewMode(e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor="previewMode">
                        Preview mode
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <button
                    className="btn btn-primary mr-2 mb-2"
                    onClick={loadExample}
                  >
                    <i className="fas fa-file-csv mr-1"></i>
                    Load Example CSV
                  </button>
                  <button
                    className="btn btn-secondary mr-2 mb-2"
                    onClick={clearAll}
                  >
                    <i className="fas fa-trash mr-1"></i>
                    Clear All
                  </button>
                  {jsonOutput && (
                    <>
                      <CopyToClipboard text={jsonOutput} onCopy={handleCopy}>
                        <button className="btn btn-success mr-2 mb-2">
                          <i className="fas fa-copy mr-1"></i>
                          {copied ? 'Copied!' : 'Copy JSON'}
                        </button>
                      </CopyToClipboard>
                      <button
                        className="btn btn-info mb-2"
                        onClick={downloadJSON}
                      >
                        <i className="fas fa-download mr-1"></i>
                        Download JSON
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="alert alert-danger mb-3">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  {error}
                </div>
              )}

              {/* Input/Output */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="csvInput">
                      <strong>
                        <i className="fas fa-file-csv mr-1"></i>
                        CSV Input:
                      </strong>
                    </label>
                    <textarea
                      id="csvInput"
                      className="form-control"
                      value={csvInput}
                      onChange={(e) => setCsvInput(e.target.value)}
                      placeholder={`Enter your CSV data here...\n\nExample:\n${hasHeaders ? 'name,age,city\nJohn,30,NYC' : '"John",30,"NYC"'}`}
                      rows="15"
                      style={{ 
                        fontFamily: 'Monaco, "Lucida Console", monospace', 
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-group">
                    <label>
                      <strong>
                        <i className="fas fa-code mr-1"></i>
                        JSON Output:
                      </strong>
                      {jsonOutput && (
                        <small className="text-muted ml-2">
                          ({JSON.parse(jsonOutput || '[]').length} records)
                        </small>
                      )}
                    </label>
                    
                    {previewMode && jsonOutput ? (
                      <div 
                        className="border rounded p-3"
                        style={{ 
                          minHeight: '360px', 
                          backgroundColor: '#f8f9fa',
                          overflowY: 'auto',
                          fontSize: '14px'
                        }}
                      >
                        <div className="table-responsive">
                          <table className="table table-sm table-bordered">
                            <thead className="thead-light">
                              {(() => {
                                try {
                                  const data = JSON.parse(jsonOutput);
                                  if (data.length > 0 && typeof data[0] === 'object') {
                                    return (
                                      <tr>
                                        {Object.keys(data[0]).map(key => (
                                          <th key={key}>{key}</th>
                                        ))}
                                      </tr>
                                    );
                                  }
                                } catch (e) {
                                  return null;
                                }
                                return null;
                              })()}
                            </thead>
                            <tbody>
                              {(() => {
                                try {
                                  const data = JSON.parse(jsonOutput);
                                  return data.slice(0, 10).map((row, index) => (
                                    <tr key={index}>
                                      {Object.values(row).map((value, cellIndex) => (
                                        <td key={cellIndex}>
                                          {typeof value === 'string' ? value : JSON.stringify(value)}
                                        </td>
                                      ))}
                                    </tr>
                                  ));
                                } catch (e) {
                                  return (
                                    <tr>
                                      <td colSpan="100%" className="text-center text-muted">
                                        Invalid JSON data
                                      </td>
                                    </tr>
                                  );
                                }
                              })()}
                            </tbody>
                          </table>
                          {(() => {
                            try {
                              const data = JSON.parse(jsonOutput);
                              if (data.length > 10) {
                                return (
                                  <div className="text-center text-muted">
                                    <small>... and {data.length - 10} more records</small>
                                  </div>
                                );
                              }
                            } catch (e) {}
                            return null;
                          })()}
                        </div>
                      </div>
                    ) : (
                      <textarea
                        className="form-control"
                        value={jsonOutput}
                        readOnly
                        placeholder="JSON output will appear here..."
                        rows="15"
                        style={{ 
                          fontFamily: 'Monaco, "Lucida Console", monospace', 
                          fontSize: '13px',
                          backgroundColor: '#f8f9fa'
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4">
                <div className="alert alert-info">
                  <h6><i className="fas fa-info-circle mr-1"></i>CSV Parsing Features:</h6>
                  <ul className="mb-0 small">
                    <li>Supports quoted fields with commas and newlines</li>
                    <li>Handles escaped quotes ("") within quoted fields</li>
                    <li>Automatically converts numbers, booleans (true/false), and null values</li>
                    <li>Customizable delimiters (comma, semicolon, tab, pipe)</li>
                    <li>Optional header row processing</li>
                    <li>Configurable JSON formatting and indentation</li>
                    <li>Table preview mode for easy data verification</li>
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

export default CsvToJsonConverter;