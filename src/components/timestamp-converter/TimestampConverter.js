import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copied, setCopied] = useState({});

  useEffect(() => {
    document.title = "Timestamp Converter";
    
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);
  
  const formatDate = (date, includeTime = true) => {
    if (!date || isNaN(date.getTime())) return 'Invalid Date';
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(includeTime && {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      })
    };
    
    return date.toLocaleString('en-US', options);
  };

  const handleTimestampChange = (value) => {
    setTimestamp(value);
    
    if (value && !isNaN(value)) {
      // Handle both seconds and milliseconds timestamps
      const ts = value.toString();
      const timestampMs = ts.length === 10 ? parseInt(ts) * 1000 : parseInt(ts);
      const date = new Date(timestampMs);
      
      if (!isNaN(date.getTime())) {
        setDateTime(date.toISOString().slice(0, 19));
      }
    } else {
      setDateTime('');
    }
  };

  const handleDateTimeChange = (value) => {
    setDateTime(value);
    
    if (value) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setTimestamp(Math.floor(date.getTime() / 1000).toString());
      }
    } else {
      setTimestamp('');
    }
  };

  const handleCopy = (type) => {
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const timestampToDate = (ts) => {
    if (!ts || isNaN(ts)) return null;
    const tsString = ts.toString();
    const timestampMs = tsString.length === 10 ? parseInt(tsString) * 1000 : parseInt(tsString);
    return new Date(timestampMs);
  };

  const getTimezoneOffset = () => {
    const offset = new Date().getTimezoneOffset();
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset > 0 ? '-' : '+';
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const commonFormats = [
    {
      label: 'ISO 8601',
      getValue: (date) => date ? date.toISOString() : '',
      description: 'International standard format'
    },
    {
      label: 'RFC 2822',
      getValue: (date) => date ? date.toUTCString() : '',
      description: 'Email header format'
    },
    {
      label: 'Local Date',
      getValue: (date) => date ? date.toLocaleDateString() : '',
      description: 'Local date format'
    },
    {
      label: 'Local Time',
      getValue: (date) => date ? date.toLocaleTimeString() : '',
      description: 'Local time format'
    },
    {
      label: 'UTC String',
      getValue: (date) => date ? date.toUTCString() : '',
      description: 'UTC format'
    },
    {
      label: 'JSON Format',
      getValue: (date) => date ? JSON.stringify(date).slice(1, -1) : '',
      description: 'JSON serialization format'
    }
  ];

  const convertedDate = timestampToDate(timestamp);

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="display-6">Timestamp Converter</h1>
            <p className="lead">Convert between Unix timestamps and human-readable dates</p>
            <hr />

            <div className="row">
              <div className="col-12">
                <div className="card mb-4">
                  <div className="card-header">
                    <h6 className="mb-0">Current Time</h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Current Unix Timestamp</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={getCurrentTimestamp()}
                              readOnly
                              style={{ backgroundColor: '#f8f9fa', fontFamily: 'monospace' }}
                            />
                            <div className="input-group-append">
                              <CopyToClipboard text={getCurrentTimestamp().toString()}>
                                <button 
                                  className={`btn ${copied.current ? 'btn-success' : 'btn-outline-primary'}`}
                                  onClick={() => handleCopy('current')}
                                >
                                  {copied.current ? 'Copied!' : 'Copy'}
                                </button>
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Current Date & Time</label>
                          <input
                            type="text"
                            className="form-control"
                            value={formatDate(currentTime)}
                            readOnly
                            style={{ backgroundColor: '#f8f9fa' }}
                          />
                        </div>
                      </div>
                    </div>
                    <small className="text-muted">
                      Timezone: {getTimezoneOffset()} | Updates every second
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Timestamp to Date</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Unix Timestamp</label>
                      <input
                        type="number"
                        className="form-control"
                        value={timestamp}
                        onChange={(e) => handleTimestampChange(e.target.value)}
                        placeholder="Enter Unix timestamp (seconds or milliseconds)"
                      />
                      <small className="text-muted">
                        Supports both 10-digit (seconds) and 13-digit (milliseconds) timestamps
                      </small>
                    </div>

                    {convertedDate && (
                      <div className="mt-3">
                        <h6>Converted Date Formats</h6>
                        {commonFormats.map((format, index) => (
                          <div key={index} className="mb-2">
                            <div className="input-group input-group-sm">
                              <div className="input-group-prepend">
                                <span className="input-group-text" style={{ minWidth: '100px' }}>
                                  {format.label}
                                </span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                value={format.getValue(convertedDate)}
                                readOnly
                                style={{ backgroundColor: '#f8f9fa', fontSize: '0.85rem' }}
                              />
                              <div className="input-group-append">
                                <CopyToClipboard text={format.getValue(convertedDate)}>
                                  <button 
                                    className={`btn btn-sm ${copied[format.label] ? 'btn-success' : 'btn-outline-secondary'}`}
                                    onClick={() => handleCopy(format.label)}
                                  >
                                    {copied[format.label] ? '✓' : 'Copy'}
                                  </button>
                                </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Date to Timestamp</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Date & Time</label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        value={dateTime}
                        onChange={(e) => handleDateTimeChange(e.target.value)}
                      />
                    </div>

                    {timestamp && (
                      <div className="mt-3">
                        <h6>Generated Timestamps</h6>
                        
                        <div className="form-group">
                          <label>Unix Timestamp (seconds)</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={timestamp}
                              readOnly
                              style={{ backgroundColor: '#f8f9fa', fontFamily: 'monospace' }}
                            />
                            <div className="input-group-append">
                              <CopyToClipboard text={timestamp}>
                                <button 
                                  className={`btn ${copied.seconds ? 'btn-success' : 'btn-outline-primary'}`}
                                  onClick={() => handleCopy('seconds')}
                                >
                                  {copied.seconds ? 'Copied!' : 'Copy'}
                                </button>
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>Unix Timestamp (milliseconds)</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={timestamp ? (parseInt(timestamp) * 1000).toString() : ''}
                              readOnly
                              style={{ backgroundColor: '#f8f9fa', fontFamily: 'monospace' }}
                            />
                            <div className="input-group-append">
                              <CopyToClipboard text={timestamp ? (parseInt(timestamp) * 1000).toString() : ''}>
                                <button 
                                  className={`btn ${copied.milliseconds ? 'btn-success' : 'btn-outline-primary'}`}
                                  onClick={() => handleCopy('milliseconds')}
                                >
                                  {copied.milliseconds ? 'Copied!' : 'Copy'}
                                </button>
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label>ISO 8601 Format</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              value={dateTime ? new Date(dateTime).toISOString() : ''}
                              readOnly
                              style={{ backgroundColor: '#f8f9fa', fontFamily: 'monospace' }}
                            />
                            <div className="input-group-append">
                              <CopyToClipboard text={dateTime ? new Date(dateTime).toISOString() : ''}>
                                <button 
                                  className={`btn ${copied.iso ? 'btn-success' : 'btn-outline-primary'}`}
                                  onClick={() => handleCopy('iso')}
                                >
                                  {copied.iso ? 'Copied!' : 'Copy'}
                                </button>
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="alert alert-info">
                  <h6><i className="fas fa-info-circle mr-2"></i>Unix Timestamp Information</h6>
                  <ul className="mb-0 small">
                    <li><strong>Unix Timestamp:</strong> Number of seconds that have elapsed since January 1, 1970 UTC</li>
                    <li><strong>Seconds vs Milliseconds:</strong> JavaScript uses milliseconds, while most Unix systems use seconds</li>
                    <li><strong>Timezone:</strong> Unix timestamps are always in UTC, conversion to local time happens during display</li>
                    <li><strong>Precision:</strong> Timestamps are precise to the second or millisecond depending on format</li>
                  </ul>
                </div>
              </div>
            </div>

            {!timestamp && !dateTime && (
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Enter a timestamp or select a date to see conversions
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimestampConverter;