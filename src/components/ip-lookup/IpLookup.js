import React, { useState, useEffect } from 'react';

const IpLookup = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userIp, setUserIp] = useState('');

  useEffect(() => {
    document.title = "IP Address Lookup"
    // Get user's own IP address
    fetchUserIp();
  }, []);

  const fetchUserIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setUserIp(data.ip);
    } catch (err) {
      console.log('Could not fetch user IP');
    }
  };

  const validateIpAddress = (ip) => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  const lookupIp = async (ip = ipAddress) => {
    if (!ip) {
      setError('Please enter an IP address');
      return;
    }

    if (!validateIpAddress(ip)) {
      setError('Please enter a valid IP address');
      return;
    }

    setLoading(true);
    setError('');
    setIpInfo(null);

    try {
      // Using ip-api.com (free tier allows 1000 requests per month)
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
      const data = await response.json();

      if (data.status === 'success') {
        setIpInfo(data);
      } else {
        setError(data.message || 'Failed to lookup IP address');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    lookupIp();
  };

  const lookupMyIp = () => {
    if (userIp) {
      setIpAddress(userIp);
      lookupIp(userIp);
    }
  };

  const clearResults = () => {
    setIpAddress('');
    setIpInfo(null);
    setError('');
  };

  const formatValue = (value) => {
    return value || 'N/A';
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header bg-info text-white">
              <h4 className="mb-0">
                <i className="fas fa-globe mr-2"></i>
                IP Address Lookup
              </h4>
              <small>Get detailed information about any IP address</small>
            </div>
            <div className="card-body">
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                  <label htmlFor="ipInput">
                    <strong>IP Address:</strong>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      id="ipInput"
                      className="form-control"
                      value={ipAddress}
                      onChange={(e) => setIpAddress(e.target.value)}
                      placeholder="Enter IP address (e.g., 8.8.8.8)"
                      disabled={loading}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm mr-1" role="status"></span>
                            Looking up...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-search mr-1"></i>
                            Lookup
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Quick Actions */}
              <div className="row mb-4">
                <div className="col-md-12">
                  {userIp && (
                    <button
                      className="btn btn-success mr-2 mb-2"
                      onClick={lookupMyIp}
                      disabled={loading}
                    >
                      <i className="fas fa-user mr-1"></i>
                      Lookup My IP ({userIp})
                    </button>
                  )}
                  <button
                    className="btn btn-secondary mr-2 mb-2"
                    onClick={() => lookupIp('8.8.8.8')}
                    disabled={loading}
                  >
                    <i className="fas fa-bolt mr-1"></i>
                    Test with 8.8.8.8
                  </button>
                  <button
                    className="btn btn-outline-secondary mb-2"
                    onClick={clearResults}
                  >
                    <i className="fas fa-trash mr-1"></i>
                    Clear
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="alert alert-danger">
                  <i className="fas fa-exclamation-triangle mr-2"></i>
                  {error}
                </div>
              )}

              {/* IP Information */}
              {ipInfo && (
                <div>
                  <h5 className="mb-3">
                    <i className="fas fa-info-circle mr-2"></i>
                    IP Information for {ipInfo.query}
                  </h5>
                  
                  <div className="row">
                    {/* Location Information */}
                    <div className="col-md-6 mb-3">
                      <div className="card h-100">
                        <div className="card-header bg-light">
                          <h6 className="mb-0">
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            Location
                          </h6>
                        </div>
                        <div className="card-body">
                          <table className="table table-sm table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td><strong>Country:</strong></td>
                                <td>
                                  {ipInfo.countryCode && (
                                    <img 
                                      src={`https://flagcdn.com/16x12/${ipInfo.countryCode.toLowerCase()}.png`}
                                      alt={ipInfo.country}
                                      className="mr-2"
                                    />
                                  )}
                                  {formatValue(ipInfo.country)}
                                </td>
                              </tr>
                              <tr>
                                <td><strong>Region:</strong></td>
                                <td>{formatValue(ipInfo.regionName)}</td>
                              </tr>
                              <tr>
                                <td><strong>City:</strong></td>
                                <td>{formatValue(ipInfo.city)}</td>
                              </tr>
                              <tr>
                                <td><strong>ZIP Code:</strong></td>
                                <td>{formatValue(ipInfo.zip)}</td>
                              </tr>
                              <tr>
                                <td><strong>Timezone:</strong></td>
                                <td>{formatValue(ipInfo.timezone)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Network Information */}
                    <div className="col-md-6 mb-3">
                      <div className="card h-100">
                        <div className="card-header bg-light">
                          <h6 className="mb-0">
                            <i className="fas fa-network-wired mr-1"></i>
                            Network
                          </h6>
                        </div>
                        <div className="card-body">
                          <table className="table table-sm table-borderless mb-0">
                            <tbody>
                              <tr>
                                <td><strong>ISP:</strong></td>
                                <td>{formatValue(ipInfo.isp)}</td>
                              </tr>
                              <tr>
                                <td><strong>Organization:</strong></td>
                                <td>{formatValue(ipInfo.org)}</td>
                              </tr>
                              <tr>
                                <td><strong>AS Number:</strong></td>
                                <td>{formatValue(ipInfo.as)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coordinates */}
                  {ipInfo.lat && ipInfo.lon && (
                    <div className="row">
                      <div className="col-md-12">
                        <div className="card">
                          <div className="card-header bg-light">
                            <h6 className="mb-0">
                              <i className="fas fa-crosshairs mr-1"></i>
                              Coordinates
                            </h6>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-4">
                                <strong>Latitude:</strong> {ipInfo.lat}
                              </div>
                              <div className="col-md-4">
                                <strong>Longitude:</strong> {ipInfo.lon}
                              </div>
                              <div className="col-md-4">
                                <a
                                  href={`https://www.google.com/maps?q=${ipInfo.lat},${ipInfo.lon}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-outline-primary"
                                >
                                  <i className="fas fa-external-link-alt mr-1"></i>
                                  View on Map
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Disclaimer */}
              <div className="mt-4">
                <div className="alert alert-warning">
                  <h6><i className="fas fa-exclamation-triangle mr-1"></i>Disclaimer:</h6>
                  <ul className="mb-0 small">
                    <li>IP geolocation is approximate and may not be 100% accurate</li>
                    <li>Some information may not be available for all IP addresses</li>
                    <li>Private and reserved IP ranges will not return location data</li>
                    <li>This tool uses a free API service with usage limitations</li>
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

export default IpLookup;