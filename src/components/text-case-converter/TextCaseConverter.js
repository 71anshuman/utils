import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TextCaseConverter = () => {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState({});
  const [copiedStates, setCopiedStates] = useState({});

  useEffect(() => {
    document.title = "Text Case Converter"
  }, []);

  // Text conversion functions
  const convertToLowerCase = (text) => text.toLowerCase();
  
  const convertToUpperCase = (text) => text.toUpperCase();
  
  const convertToTitleCase = (text) => {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  
  const convertToSentenceCase = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  
  const convertToCamelCase = (text) => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  };
  
  const convertToPascalCase = (text) => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => {
        return word.toUpperCase();
      })
      .replace(/\s+/g, '');
  };
  
  const convertToSnakeCase = (text) => {
    return text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
  };
  
  const convertToKebabCase = (text) => {
    return text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-');
  };
  
  const convertToConstantCase = (text) => {
    return text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toUpperCase())
      .join('_');
  };

  const convertToDotCase = (text) => {
    return text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('.');
  };

  const convertToPathCase = (text) => {
    return text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('/');
  };

  const convertToToggleCase = (text) => {
    return text
      .split('')
      .map(char => {
        return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
      })
      .join('');
  };

  const convertToInverseCase = (text) => {
    return text
      .split('')
      .map(char => {
        return char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
      })
      .join('');
  };

  const handleTextChange = (text) => {
    setInputText(text);
    
    if (text.trim()) {
      const newResults = {
        lowercase: convertToLowerCase(text),
        uppercase: convertToUpperCase(text),
        titlecase: convertToTitleCase(text),
        sentencecase: convertToSentenceCase(text),
        camelcase: convertToCamelCase(text),
        pascalcase: convertToPascalCase(text),
        snakecase: convertToSnakeCase(text),
        kebabcase: convertToKebabCase(text),
        constantcase: convertToConstantCase(text),
        dotcase: convertToDotCase(text),
        pathcase: convertToPathCase(text),
        togglecase: convertToToggleCase(text),
        inversecase: convertToInverseCase(text)
      };
      setResults(newResults);
    } else {
      setResults({});
    }
    
    // Reset all copied states
    setCopiedStates({});
  };

  const handleCopy = (caseType) => {
    setCopiedStates(prev => ({ ...prev, [caseType]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [caseType]: false }));
    }, 2000);
  };

  const caseTypes = [
    { key: 'lowercase', label: 'lowercase', description: 'all letters in lowercase' },
    { key: 'uppercase', label: 'UPPERCASE', description: 'ALL LETTERS IN UPPERCASE' },
    { key: 'titlecase', label: 'Title Case', description: 'First Letter Of Each Word Capitalized' },
    { key: 'sentencecase', label: 'Sentence case', description: 'First letter capitalized, rest lowercase' },
    { key: 'camelcase', label: 'camelCase', description: 'firstWordLowercase, subsequentWordsCapitalized' },
    { key: 'pascalcase', label: 'PascalCase', description: 'FirstLetterOfEachWordCapitalized' },
    { key: 'snakecase', label: 'snake_case', description: 'words_separated_by_underscores' },
    { key: 'kebabcase', label: 'kebab-case', description: 'words-separated-by-hyphens' },
    { key: 'constantcase', label: 'CONSTANT_CASE', description: 'WORDS_SEPARATED_BY_UNDERSCORES_UPPERCASE' },
    { key: 'dotcase', label: 'dot.case', description: 'words.separated.by.dots' },
    { key: 'pathcase', label: 'path/case', description: 'words/separated/by/slashes' },
    { key: 'togglecase', label: 'tOgGlE cAsE', description: 'rAnDoM cApItAlIzAtIoN' },
    { key: 'inversecase', label: 'iNVERSE cASE', description: 'oPPOSITE oF oRIGINAL cASE' }
  ];

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6">Text Case Converter</h1>
            <p className="lead">Convert text between different case formats</p>
            <hr />

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="input-text">Enter your text</label>
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
                      {inputText.length} characters, {inputText.split(/\s+/).filter(word => word.length > 0).length} words
                    </small>
                  )}
                </div>
              </div>
            </div>

            {Object.keys(results).length > 0 && (
              <div className="row">
                <div className="col-12">
                  <h5 className="mb-3">Converted Text</h5>
                  <div className="row">
                    {caseTypes.map(({ key, label, description }) => (
                      <div key={key} className="col-md-4 mb-3">
                        <div className="card">
                          <div className="card-header d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-0">{label}</h6>
                              <small className="text-muted">{description}</small>
                            </div>
                            <CopyToClipboard text={results[key] || ''}>
                              <button 
                                className={`btn btn-sm ${copiedStates[key] ? 'btn-success' : 'btn-outline-primary'}`}
                                onClick={() => handleCopy(key)}
                                disabled={!results[key]}
                              >
                                {copiedStates[key] ? 'Copied!' : 'Copy'}
                              </button>
                            </CopyToClipboard>
                          </div>
                          <div className="card-body">
                            <div 
                              className="form-control"
                              style={{ 
                                minHeight: '60px', 
                                backgroundColor: '#f8f9fa',
                                border: 'none',
                                wordBreak: 'break-word'
                              }}
                            >
                              {results[key] || ''}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!inputText && (
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Enter some text above to see all case conversion options
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextCaseConverter;