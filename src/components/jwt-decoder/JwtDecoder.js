import React, { useState, useEffect } from 'react';

export default function JwtDecoder() {
    useEffect(() => {
        document.title = "JWT Decoder";
    }, []);

    const [token, setToken] = useState('');
    const [header, setHeader] = useState(null);
    const [payload, setPayload] = useState(null);
    const [signature, setSignature] = useState('');
    const [error, setError] = useState('');
    const [tokenStats, setTokenStats] = useState(null);

    const sampleToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxODkzNDU2MDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    const loadSample = () => {
        setToken(sampleToken);
    };

    const handleClear = () => {
        setToken('');
        setHeader(null);
        setPayload(null);
        setSignature('');
        setError('');
        setTokenStats(null);
    };

    // Decode URL safe Base64
    const decodeSegment = (str) => {
        try {
            let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) {
                base64 += '=';
            }
            const raw = atob(base64);
            const decoded = decodeURIComponent(
                raw.split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
            );
            return JSON.parse(decoded);
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        if (!token.trim()) {
            setHeader(null);
            setPayload(null);
            setSignature('');
            setError('');
            setTokenStats(null);
            return;
        }

        const parts = token.trim().split('.');
        if (parts.length !== 3) {
            setError('JWT must have 3 segments separated by dots (header.payload.signature)');
            setHeader(null);
            setPayload(null);
            setTokenStats(null);
            return;
        }

        const decHeader = decodeSegment(parts[0]);
        const decPayload = decodeSegment(parts[1]);
        const sigPart = parts[2];

        if (!decHeader || !decPayload) {
            setError('Failed to decode JWT segments. Ensure it is a valid base64url token.');
            setHeader(null);
            setPayload(null);
            setTokenStats(null);
            return;
        }

        setHeader(decHeader);
        setPayload(decPayload);
        setSignature(sigPart);
        setError('');

        // Compute metadata
        const stats = {};
        if (decPayload.exp) {
            const expDate = new Date(decPayload.exp * 1000);
            const now = new Date();
            stats.expTime = expDate.toLocaleString();
            stats.isExpired = expDate < now;
            stats.timeLeft = Math.round((expDate - now) / 60000); // minutes
        }
        if (decPayload.iat) {
            stats.iatTime = new Date(decPayload.iat * 1000).toLocaleString();
        }
        stats.algorithm = decHeader.alg || 'None';
        stats.type = decHeader.typ || 'None';

        setTokenStats(stats);
    }, [token]);

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="jumbotron jumbotron-fluid mb-4">
                <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <div>
                        <h1 className="display-6 font-weight-bold">JWT Decoder</h1>
                        <p className="lead text-secondary mb-0">Paste a JSON Web Token (JWT) to decode its header, payload, and signature claims.</p>
                    </div>
                    <div className="mt-3 mt-md-0">
                        <button className="btn btn-secondary mr-2" onClick={loadSample}>Load Sample</button>
                        <button className="btn btn-dark" onClick={handleClear}>Clear</button>
                    </div>
                </div>
            </div>

            {/* Main Area */}
            <div className="row">
                {/* Left Panel: Token Input */}
                <div className="col-lg-5 mb-4">
                    <div className="form-group h-100 d-flex flex-column">
                        <label className="font-weight-bold mb-2">Encoded Token (Paste Here)</label>
                        <textarea
                            className="form-control font-monospace flex-grow-1"
                            style={{ 
                                fontFamily: 'monospace', 
                                fontSize: '0.9rem', 
                                lineHeight: '1.5',
                                height: '450px',
                                resize: 'none'
                            }}
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                        {error && (
                            <div className="alert alert-danger mt-3 mb-0" role="alert">
                                <strong>⚠️ Error:</strong> {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel: Decoded Contents */}
                <div className="col-lg-7 mb-4">
                    <label className="font-weight-bold mb-2">Decoded Claims</label>
                    <div className="d-flex flex-column" style={{ gap: '20px' }}>
                        
                        {/* Header Segment */}
                        <div className="card shadow-sm" style={{ borderLeft: '5px solid #ef4444' }}>
                            <div className="card-header font-weight-bold d-flex justify-content-between align-items-center py-2" style={{ color: '#ef4444' }}>
                                <span>Header: Algorithm & Token Type</span>
                                <span className="badge badge-info">Segment 1</span>
                            </div>
                            <div className="card-body p-3">
                                {header ? (
                                    <pre className="mb-0 font-monospace" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                        {JSON.stringify(header, null, 2)}
                                    </pre>
                                ) : (
                                    <span className="text-muted small">Awaiting token input...</span>
                                )}
                            </div>
                        </div>

                        {/* Payload Segment */}
                        <div className="card shadow-sm" style={{ borderLeft: '5px solid #8b5cf6' }}>
                            <div className="card-header font-weight-bold d-flex justify-content-between align-items-center py-2" style={{ color: '#8b5cf6' }}>
                                <span>Payload: Data Claims</span>
                                <span className="badge badge-info">Segment 2</span>
                            </div>
                            <div className="card-body p-3">
                                {payload ? (
                                    <pre className="mb-0 font-monospace" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                        {JSON.stringify(payload, null, 2)}
                                    </pre>
                                ) : (
                                    <span className="text-muted small">Awaiting token input...</span>
                                )}
                            </div>
                        </div>

                        {/* Signature Segment */}
                        {signature && (
                            <div className="card shadow-sm" style={{ borderLeft: '5px solid #10b981' }}>
                                <div className="card-header font-weight-bold d-flex justify-content-between align-items-center py-2" style={{ color: '#10b981' }}>
                                    <span>Signature</span>
                                    <span className="badge badge-info">Segment 3</span>
                                </div>
                                <div className="card-body p-3">
                                    <div className="text-muted small mb-2">VERIFY SIGNATURE (RAW BASE64URL)</div>
                                    <pre className="mb-0 font-monospace text-truncate" style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#10b981' }}>
                                        {signature}
                                    </pre>
                                </div>
                            </div>
                        )}

                        {/* Metadata Stats Card */}
                        {tokenStats && (
                            <div className="card shadow-sm" style={{ borderLeft: '5px solid #10b981' }}>
                                <div className="card-header font-weight-bold d-flex justify-content-between align-items-center py-2" style={{ color: '#10b981' }}>
                                    <span>Token Metadata Summary</span>
                                    <span className="badge badge-success">Processed</span>
                                </div>
                                <div className="card-body p-3">
                                    <div className="row text-center text-sm-left">
                                        <div className="col-sm-6 mb-2">
                                            <div className="text-muted small">ALGORITHM</div>
                                            <div className="font-weight-bold">{tokenStats.algorithm}</div>
                                        </div>
                                        <div className="col-sm-6 mb-2">
                                            <div className="text-muted small">TOKEN TYPE</div>
                                            <div className="font-weight-bold">{tokenStats.type}</div>
                                        </div>
                                        {tokenStats.iatTime && (
                                            <div className="col-sm-6 mb-2">
                                                <div className="text-muted small">ISSUED AT</div>
                                                <div className="font-weight-bold">{tokenStats.iatTime}</div>
                                            </div>
                                        )}
                                        {tokenStats.expTime && (
                                            <div className="col-sm-6 mb-2">
                                                <div className="text-muted small">EXPIRATION</div>
                                                <div className="font-weight-bold d-flex align-items-center">
                                                    <span>{tokenStats.expTime}</span>
                                                    {tokenStats.isExpired ? (
                                                        <span className="badge ml-2" style={{ backgroundColor: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>Expired</span>
                                                    ) : (
                                                        <span className="badge badge-success ml-2">Active ({tokenStats.timeLeft}m left)</span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
