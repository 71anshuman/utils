import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [testText, setTestText] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState([]);
  const [isValidRegex, setIsValidRegex] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState({});

  useEffect(() => {
    document.title = "Regex Tester"
  }, []);

  const commonPatterns = [
    {
      name: 'Email Address',
      pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
      description: 'Matches email addresses',
      flags: 'gi'
    },
    {
      name: 'Phone Number (US)',
      pattern: '\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})',
      description: 'Matches US phone numbers',
      flags: 'g'
    },
    {
      name: 'URL/Website',
      pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
      description: 'Matches HTTP/HTTPS URLs',
      flags: 'gi'
    },
    {
      name: 'IP Address',
      pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
      description: 'Matches IPv4 addresses',
      flags: 'g'
    },
    {
      name: 'Credit Card Numbers',
      pattern: '\\b(?:\\d{4}[-\\s]?){3}\\d{4}\\b',
      description: 'Matches credit card number format',
      flags: 'g'
    },
    {
      name: 'Hex Colors',
      pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})',
      description: 'Matches hex color codes',
      flags: 'gi'
    },
    {
      name: 'HTML Tags',
      pattern: '<[^>]*>',
      description: 'Matches HTML tags',
      flags: 'g'
    },
    {
      name: 'Numbers (Integer)',
      pattern: '\\b\\d+\\b',
      description: 'Matches whole numbers',
      flags: 'g'
    },
    {
      name: 'Numbers (Decimal)',
      pattern: '\\b\\d+\\.\\d+\\b',
      description: 'Matches decimal numbers',
      flags: 'g'
    },
    {
      name: 'Words (Alphanumeric)',
      pattern: '\\b[a-zA-Z]+\\b',
      description: 'Matches words with letters only',
      flags: 'g'
    },
    {
      name: 'Date (MM/DD/YYYY)',
      pattern: '\\b(0?[1-9]|1[0-2])\\/(0?[1-9]|[12][0-9]|3[01])\\/(19|20)\\d{2}\\b',
      description: 'Matches MM/DD/YYYY format',
      flags: 'g'
    },
    {
      name: 'Time (24-hour)',
      pattern: '\\b([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?\\b',
      description: 'Matches 24-hour time format',
      flags: 'g'
    }
  ];

  const testRegex = () => {
    if (!pattern || !testText) {
      setMatches([]);
      setIsValidRegex(true);
      setError('');
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      setIsValidRegex(true);
      setError('');

      if (flags.includes('g')) {
        // Global search - find all matches
        const allMatches = [];
        let match;
        
        while ((match = regex.exec(testText)) !== null) {
          allMatches.push({
            match: match[0],
            groups: match.slice(1),
            index: match.index,
            lastIndex: match.index + match[0].length
          });
          
          // Prevent infinite loop on zero-length matches
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
        
        setMatches(allMatches);
      } else {
        // Single match
        const match = testText.match(regex);
        if (match) {
          setMatches([{
            match: match[0],
            groups: match.slice(1),
            index: match.index,
            lastIndex: match.index + match[0].length
          }]);
        } else {
          setMatches([]);
        }
      }
    } catch (e) {
      setIsValidRegex(false);
      setError(e.message);
      setMatches([]);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      testRegex();
    }, 300); // Debounce for better performance

    return () => clearTimeout(timeoutId);
  }, [pattern, testText, flags]);

  const highlightMatches = () => {
    if (!testText || matches.length === 0) {
      return testText;
    }

    let highlightedText = testText;
    let offset = 0;

    matches.forEach((match, index) => {
      const start = match.index + offset;
      const end = match.lastIndex + offset;
      const before = highlightedText.slice(0, start);
      const matchText = highlightedText.slice(start, end);
      const after = highlightedText.slice(end);
      
      const highlighted = `<mark class="match-highlight" style="background-color: #ffeb3b; color: #333; font-weight: bold;">${matchText}</mark>`;
      highlightedText = before + highlighted + after;
      offset += highlighted.length - matchText.length;
    });

    return highlightedText;
  };

  const loadCommonPattern = (commonPattern) => {
    setPattern(commonPattern.pattern);
    setFlags(commonPattern.flags);
  };

  const handleCopy = (type) => {
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const getFlagDescription = () => {
    const descriptions = [];
    if (flags.includes('g')) descriptions.push('Global (find all matches)');
    if (flags.includes('i')) descriptions.push('Case insensitive');
    if (flags.includes('m')) descriptions.push('Multiline');
    if (flags.includes('s')) descriptions.push('Dot matches newlines');
    if (flags.includes('u')) descriptions.push('Unicode');
    if (flags.includes('y')) descriptions.push('Sticky');
    return descriptions.join(', ') || 'No flags';
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="display-6">Regular Expression Tester</h1>
            <p className="lead">Test and debug regular expressions with real-time matching</p>
            <hr />

            <div className="row">
              <div className="col-md-8">
                <div className="form-group">
                  <label htmlFor="regex-pattern">Regular Expression Pattern</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">/</span>
                    </div>
                    <input
                      id="regex-pattern"
                      type="text"
                      className={`form-control ${!isValidRegex ? 'is-invalid' : ''}`}
                      value={pattern}
                      onChange={(e) => setPattern(e.target.value)}
                      placeholder="Enter your regex pattern here..."
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">/{flags}</span>
                    </div>
                  </div>
                  {!isValidRegex && (
                    <div className="invalid-feedback d-block">
                      <strong>Invalid regex:</strong> {error}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="regex-flags">Flags</label>
                  <div className="input-group">
                    <input
                      id="regex-flags"
                      type="text"
                      className="form-control"
                      value={flags}
                      onChange={(e) => setFlags(e.target.value)}
                      placeholder="gimsuxy"
                      maxLength="6"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" title={getFlagDescription()}>
                        <i className="fas fa-info-circle"></i>
                      </span>
                    </div>
                  </div>
                  <small className="text-muted">{getFlagDescription()}</small>
                </div>

                <div className="form-group">
                  <label htmlFor="test-text">Test Text</label>
                  <textarea
                    id="test-text"
                    className="form-control"
                    rows="8"
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    placeholder="Enter the text you want to test against your regex..."
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Common Patterns</h6>
                  </div>
                  <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {commonPatterns.map((commonPattern, index) => (
                      <div key={index} className="mb-2">
                        <button
                          className="btn btn-outline-secondary btn-sm btn-block text-left"
                          onClick={() => loadCommonPattern(commonPattern)}
                          title={commonPattern.description}
                        >
                          {commonPattern.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {isValidRegex && (pattern || testText) && (
              <div className="row mt-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h6 className="mb-0">Results ({matches.length} match{matches.length !== 1 ? 'es' : ''})</h6>
                      {matches.length > 0 && (
                        <span className="badge badge-success">{matches.length} found</span>
                      )}
                    </div>
                    <div className="card-body">
                      {testText && (
                        <div className="mb-3">
                          <h6>Highlighted Text</h6>
                          <div 
                            className="border p-3 bg-light"
                            style={{ 
                              whiteSpace: 'pre-wrap', 
                              fontFamily: 'monospace',
                              maxHeight: '300px',
                              overflowY: 'auto',
                              fontSize: '0.9rem'
                            }}
                            dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                          />
                        </div>
                      )}

                      {matches.length > 0 && (
                        <div>
                          <h6>Match Details</h6>
                          <div className="table-responsive">
                            <table className="table table-sm table-striped">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Match</th>
                                  <th>Position</th>
                                  <th>Length</th>
                                  <th>Groups</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {matches.map((match, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                      <code style={{ backgroundColor: '#fff3cd' }}>
                                        {match.match}
                                      </code>
                                    </td>
                                    <td>
                                      <span className="badge badge-info">
                                        {match.index}-{match.lastIndex - 1}
                                      </span>
                                    </td>
                                    <td>{match.match.length}</td>
                                    <td>
                                      {match.groups.length > 0 ? (
                                        <div>
                                          {match.groups.map((group, groupIndex) => (
                                            <span key={groupIndex} className="badge badge-secondary mr-1">
                                              {group || 'undefined'}
                                            </span>
                                          ))}
                                        </div>
                                      ) : (
                                        <span className="text-muted">None</span>
                                      )}
                                    </td>
                                    <td>
                                      <CopyToClipboard text={match.match}>
                                        <button 
                                          className={`btn btn-sm ${copied[`match_${index}`] ? 'btn-success' : 'btn-outline-primary'}`}
                                          onClick={() => handleCopy(`match_${index}`)}
                                        >
                                          {copied[`match_${index}`] ? '✓' : 'Copy'}
                                        </button>
                                      </CopyToClipboard>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {matches.length === 0 && testText && pattern && (
                        <div className="alert alert-warning">
                          <i className="fas fa-exclamation-triangle mr-2"></i>
                          No matches found for the given pattern.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row mt-4">
              <div className="col-12">
                <div className="alert alert-info">
                  <h6><i className="fas fa-info-circle mr-2"></i>Regex Flags Reference</h6>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="mb-0 small">
                        <li><strong>g</strong> - Global: Find all matches</li>
                        <li><strong>i</strong> - Ignore case: Case-insensitive matching</li>
                        <li><strong>m</strong> - Multiline: ^ and $ match line boundaries</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="mb-0 small">
                        <li><strong>s</strong> - Dot all: . matches newline characters</li>
                        <li><strong>u</strong> - Unicode: Enable Unicode matching</li>
                        <li><strong>y</strong> - Sticky: Match only from lastIndex</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!pattern && !testText && (
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Enter a regular expression pattern and test text to see matches in real-time, or choose from common patterns
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;