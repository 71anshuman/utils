import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const UrlEncoder = () => {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [queryParams, setQueryParams] = useState([]);
  const [slugText, setSlugText] = useState('');
  const [copied, setCopied] = useState({});

  useEffect(() => {
    document.title = "URL Encoder/Decoder"
  }, []);

  const handleInputChange = (text) => {
    setInputText(text);
    
    // Auto-encode
    try {
      setEncodedText(encodeURIComponent(text));
    } catch (e) {
      setEncodedText('Invalid input for encoding');
    }

    // Auto-decode
    try {
      setDecodedText(decodeURIComponent(text));
    } catch (e) {
      setDecodedText('Invalid input for decoding');
    }

    // Parse query parameters if it looks like a URL
    parseQueryParams(text);

    // Generate slug
    setSlugText(generateSlug(text));
  };

  const parseQueryParams = (url) => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : 'http://example.com' + (url.startsWith('/') ? url : '/' + url));
      const params = [];
      
      urlObj.searchParams.forEach((value, key) => {
        params.push({ key, value });
      });
      
      setQueryParams(params);
    } catch (e) {
      // If not a valid URL, try to parse as query string
      if (url.includes('=')) {
        const params = [];
        const pairs = url.split(/[?&]/);
        
        pairs.forEach(pair => {
          if (pair && pair.includes('=')) {
            const [key, value] = pair.split('=');
            if (key && value !== undefined) {
              params.push({ 
                key: decodeURIComponent(key), 
                value: decodeURIComponent(value) 
              });
            }
          }
        });
        
        setQueryParams(params);
      } else {
        setQueryParams([]);
      }
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const handleCopy = (type) => {
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const buildQueryString = () => {
    return queryParams
      .filter(param => param.key && param.value)
      .map(param => `${encodeURIComponent(param.key)}=${encodeURIComponent(param.value)}`)
      .join('&');
  };

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: '', value: '' }]);
  };

  const removeQueryParam = (index) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  const updateQueryParam = (index, field, value) => {
    const newParams = [...queryParams];
    newParams[index][field] = value;
    setQueryParams(newParams);
  };

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6">URL Encoder/Decoder</h1>
            <p className="lead">Encode and decode URLs, handle query parameters, and generate slugs</p>
            <hr />

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="url-input">Enter text or URL</label>
                  <textarea
                    id="url-input"
                    className="form-control"
                    rows="3"
                    value={inputText}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder="Enter text, URL, or query parameters..."
                  />
                </div>
              </div>
            </div>

            {inputText && (
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">URL Encoded</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows="3"
                          value={encodedText}
                          readOnly
                          style={{ backgroundColor: '#f8f9fa' }}
                        />
                        <CopyToClipboard text={encodedText}>
                          <button 
                            className={`btn btn-sm mt-2 ${copied.encoded ? 'btn-success' : 'btn-outline-primary'}`}
                            onClick={() => handleCopy('encoded')}
                          >
                            {copied.encoded ? '✓ Copied!' : 'Copy'}
                          </button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">URL Decoded</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows="3"
                          value={decodedText}
                          readOnly
                          style={{ backgroundColor: '#f8f9fa' }}
                        />
                        <CopyToClipboard text={decodedText}>
                          <button 
                            className={`btn btn-sm mt-2 ${copied.decoded ? 'btn-success' : 'btn-outline-primary'}`}
                            onClick={() => handleCopy('decoded')}
                          >
                            {copied.decoded ? '✓ Copied!' : 'Copy'}
                          </button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Slug Generator</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          value={slugText}
                          readOnly
                          style={{ backgroundColor: '#f8f9fa' }}
                          placeholder="Generated slug will appear here..."
                        />
                        <CopyToClipboard text={slugText}>
                          <button 
                            className={`btn btn-sm mt-2 ${copied.slug ? 'btn-success' : 'btn-outline-primary'}`}
                            onClick={() => handleCopy('slug')}
                            disabled={!slugText}
                          >
                            {copied.slug ? '✓ Copied!' : 'Copy'}
                          </button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Query String Builder</h5>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          value={buildQueryString()}
                          readOnly
                          style={{ backgroundColor: '#f8f9fa' }}
                          placeholder="Built query string will appear here..."
                        />
                        <CopyToClipboard text={buildQueryString()}>
                          <button 
                            className={`btn btn-sm mt-2 ${copied.query ? 'btn-success' : 'btn-outline-primary'}`}
                            onClick={() => handleCopy('query')}
                            disabled={!buildQueryString()}
                          >
                            {copied.query ? '✓ Copied!' : 'Copy'}
                          </button>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {queryParams.length > 0 && (
              <div className="row mt-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Query Parameters</h5>
                      <button className="btn btn-sm btn-primary" onClick={addQueryParam}>
                        Add Parameter
                      </button>
                    </div>
                    <div className="card-body">
                      {queryParams.map((param, index) => (
                        <div key={index} className="form-row mb-2">
                          <div className="col-md-5">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Key"
                              value={param.key}
                              onChange={(e) => updateQueryParam(index, 'key', e.target.value)}
                            />
                          </div>
                          <div className="col-md-5">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Value"
                              value={param.value}
                              onChange={(e) => updateQueryParam(index, 'value', e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <button 
                              className="btn btn-outline-danger btn-sm w-100"
                              onClick={() => removeQueryParam(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!inputText && (
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Enter a URL or text above to start encoding, decoding, or generating slugs
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlEncoder;
