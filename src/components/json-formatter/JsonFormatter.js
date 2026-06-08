import React, { useState, useEffect, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function JsonFormatter() {
    useEffect(() => {
        document.title = "JSON Formatter - DevUtils";
    }, []);

    const [inputJSON, setInputJSON] = useState('');
    const [outputJSON, setOutputJSON] = useState('');
    const [indentation, setIndentation] = useState(() => {
        const saved = localStorage.getItem('json_formatter_indentation');
        return saved !== null ? Number(saved) : 4;
    }); // 2, 4, or 0 (for tabs)
    const [autoFormat, setAutoFormat] = useState(() => {
        const saved = localStorage.getItem('json_formatter_autoformat');
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        localStorage.setItem('json_formatter_indentation', indentation);
    }, [indentation]);

    useEffect(() => {
        localStorage.setItem('json_formatter_autoformat', JSON.stringify(autoFormat));
    }, [autoFormat]);

    const inputGutterRef = useRef(null);
    const outputGutterRef = useRef(null);

    const sampleJSON = `{
  "tool": "JSON Formatter",
  "version": "v2.0",
  "description": "Prettify, validate, and minify your JSON data in real-time.",
  "features": [
    "Custom indentation (2, 4 spaces or tabs)",
    "Compact/Minification support",
    "Live syntax validation & error trace",
    "Auto-format on type toggling"
  ],
  "author": {
    "name": "DevUtils Team",
    "active": true,
    "founded": 2026
  }
}`;

    const loadSample = () => {
        setInputJSON(sampleJSON);
        setError('');
    };

    const handleClear = () => {
        setInputJSON('');
        setOutputJSON('');
        setError('');
        setCopied(false);
    };

    const formatJSON = (rawText, indentSize) => {
        if (!rawText.trim()) {
            setOutputJSON('');
            setError('');
            return;
        }

        try {
            const parsed = JSON.parse(rawText);
            const space = indentSize === 0 ? '\t' : indentSize;
            const formatted = JSON.stringify(parsed, null, space);
            setOutputJSON(formatted);
            setError('');
        } catch (e) {
            setError(e.message);
        }
    };

    const minifyJSON = () => {
        if (!inputJSON.trim()) return;
        try {
            const parsed = JSON.parse(inputJSON);
            const minified = JSON.stringify(parsed);
            setOutputJSON(minified);
            setError('');
            setCopied(false);
        } catch (e) {
            setError(e.message);
        }
    };

    // Live Validation & Formatting Loop
    useEffect(() => {
        if (autoFormat) {
            const delayDebounce = setTimeout(() => {
                formatJSON(inputJSON, indentation);
            }, 250);
            return () => clearTimeout(delayDebounce);
        }
    }, [inputJSON, indentation, autoFormat]);

    const handleManualFormat = (e) => {
        e.preventDefault();
        formatJSON(inputJSON, indentation);
        setCopied(false);
    };

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Synced scrolling logic
    const handleInputScroll = (e) => {
        if (inputGutterRef.current) {
            inputGutterRef.current.scrollTop = e.target.scrollTop;
        }
    };

    const handleOutputScroll = (e) => {
        if (outputGutterRef.current) {
            outputGutterRef.current.scrollTop = e.target.scrollTop;
        }
    };

    const inputLines = inputJSON.split('\n');
    const outputLines = outputJSON.split('\n');

    // Layout configuration for strict alignment
    const editorStyle = {
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: '20px',
        paddingTop: '12px',
        paddingBottom: '12px',
        height: '500px',
        resize: 'none'
    };

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="jumbotron jumbotron-fluid mb-4">
                <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <div>
                        <h1 className="display-6 font-weight-bold">JSON Formatter</h1>
                        <p className="lead text-secondary mb-0">Format, parse, validate, and minify raw JSON payloads instantly.</p>
                    </div>
                    <div className="mt-3 mt-md-0 d-flex align-items-center" style={{ gap: '10px' }}>
                        <button className="btn btn-secondary" onClick={loadSample}>Load Sample</button>
                        <button className="btn btn-dark" onClick={handleClear}>Clear</button>
                    </div>
                </div>
            </div>

            {/* Controls panel */}
            <div className="card glass-panel border-0 p-3 mb-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center" style={{ gap: '16px' }}>
                    
                    {/* Spacing pills */}
                    <div className="d-flex align-items-center" style={{ gap: '12px' }}>
                        <span className="small font-weight-bold text-muted text-uppercase">Spacing:</span>
                        <div className="btn-group p-1" style={{ background: 'var(--primary-light)', borderRadius: '10px' }}>
                            <button
                                className={`btn btn-sm px-3 ${indentation === 2 ? 'btn-primary' : 'btn-link text-decoration-none'}`}
                                onClick={() => setIndentation(2)}
                                style={{ borderRadius: '8px !important', border: 'none', color: indentation === 2 ? '#fff' : 'var(--primary-on-light)', fontWeight: '600' }}
                            >
                                2 Spaces
                            </button>
                            <button
                                className={`btn btn-sm px-3 ${indentation === 4 ? 'btn-primary' : 'btn-link text-decoration-none'}`}
                                onClick={() => setIndentation(4)}
                                style={{ borderRadius: '8px !important', border: 'none', color: indentation === 4 ? '#fff' : 'var(--primary-on-light)', fontWeight: '600' }}
                            >
                                4 Spaces
                            </button>
                            <button
                                className={`btn btn-sm px-3 ${indentation === 0 ? 'btn-primary' : 'btn-link text-decoration-none'}`}
                                onClick={() => setIndentation(0)}
                                style={{ borderRadius: '8px !important', border: 'none', color: indentation === 0 ? '#fff' : 'var(--primary-on-light)', fontWeight: '600' }}
                            >
                                Tabs
                            </button>
                        </div>
                    </div>

                    {/* Auto-format Switch & Manual Action */}
                    <div className="d-flex align-items-center" style={{ gap: '20px' }}>
                        <div className="custom-control custom-switch">
                            <input
                                type="checkbox"
                                className="custom-control-input text-primary"
                                id="autoFormatSwitch"
                                checked={autoFormat}
                                onChange={(e) => setAutoFormat(e.target.checked)}
                                style={{ cursor: 'pointer' }}
                            />
                            <label className="custom-control-label small font-weight-bold text-muted text-uppercase" htmlFor="autoFormatSwitch" style={{ cursor: 'pointer', userSelect: 'none' }}>
                                Live Formatter
                            </label>
                        </div>
                        <button
                            className="btn btn-primary btn-sm"
                            disabled={autoFormat || !inputJSON}
                            onClick={handleManualFormat}
                        >
                            Format JSON
                        </button>
                        <button
                            className="btn btn-secondary btn-sm"
                            disabled={!inputJSON}
                            onClick={minifyJSON}
                        >
                            Minify JSON
                        </button>
                    </div>
                </div>
            </div>

            {/* Split Editor Panes */}
            <div className="row">
                
                {/* Input Editor */}
                <div className="col-lg-6 mb-4">
                    <div className="form-group h-100 d-flex flex-column">
                        <label className="font-weight-bold mb-2">Raw JSON Input</label>
                        <div className="d-flex border rounded overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            {/* Input Gutter */}
                            <div 
                                ref={inputGutterRef}
                                style={{
                                    width: '45px',
                                    backgroundColor: 'var(--primary-light)',
                                    color: 'var(--text-muted)',
                                    textAlign: 'right',
                                    paddingRight: '10px',
                                    paddingTop: editorStyle.paddingTop,
                                    paddingBottom: editorStyle.paddingBottom,
                                    fontFamily: editorStyle.fontFamily,
                                    fontSize: editorStyle.fontSize,
                                    lineHeight: editorStyle.lineHeight,
                                    height: editorStyle.height,
                                    overflowY: 'hidden',
                                    userSelect: 'none',
                                    borderRight: '1px solid var(--border-color)'
                                }}
                            >
                                {inputLines.map((_, i) => (
                                    <div key={i} style={{ height: editorStyle.lineHeight }}>{i + 1}</div>
                                ))}
                            </div>
                            {/* Textarea */}
                            <textarea
                                className={`form-control border-0 flex-grow-1 ${error ? 'is-invalid' : ''}`}
                                style={{ 
                                    ...editorStyle,
                                    borderTopLeftRadius: '0px !important',
                                    borderBottomLeftRadius: '0px !important',
                                    paddingLeft: '12px',
                                    whiteSpace: 'pre',
                                    overflowX: 'auto',
                                    background: 'transparent'
                                }}
                                onScroll={handleInputScroll}
                                placeholder="Paste your minified or unformatted JSON here..."
                                value={inputJSON}
                                onChange={(e) => setInputJSON(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div className="alert alert-danger mt-3 mb-0" role="alert">
                                <strong>⚠️ Invalid JSON:</strong> {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Output Editor */}
                <div className="col-lg-6 mb-4">
                    <div className="form-group h-100 d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="font-weight-bold mb-0">Formatted JSON Output</label>
                            {outputJSON && (
                                <CopyToClipboard text={outputJSON} onCopy={handleCopy}>
                                    <button className={`btn btn-sm ${copied ? 'btn-success' : 'btn-dark'}`}>
                                        {copied ? '✓ Copied' : 'Copy Output'}
                                    </button>
                                </CopyToClipboard>
                            )}
                        </div>
                        <div className="d-flex border rounded overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            {/* Output Gutter */}
                            <div 
                                ref={outputGutterRef}
                                style={{
                                    width: '45px',
                                    backgroundColor: 'var(--primary-light)',
                                    color: 'var(--text-muted)',
                                    textAlign: 'right',
                                    paddingRight: '10px',
                                    paddingTop: editorStyle.paddingTop,
                                    paddingBottom: editorStyle.paddingBottom,
                                    fontFamily: editorStyle.fontFamily,
                                    fontSize: editorStyle.fontSize,
                                    lineHeight: editorStyle.lineHeight,
                                    height: editorStyle.height,
                                    overflowY: 'hidden',
                                    userSelect: 'none',
                                    borderRight: '1px solid var(--border-color)'
                                }}
                            >
                                {outputLines.map((_, i) => (
                                    <div key={i} style={{ height: editorStyle.lineHeight }}>{i + 1}</div>
                                ))}
                            </div>
                            {/* Textarea */}
                            <textarea
                                className="form-control border-0 flex-grow-1"
                                style={{ 
                                    ...editorStyle,
                                    borderTopLeftRadius: '0px !important',
                                    borderBottomLeftRadius: '0px !important',
                                    paddingLeft: '12px',
                                    whiteSpace: 'pre',
                                    overflowX: 'auto',
                                    background: 'transparent'
                                }}
                                onScroll={handleOutputScroll}
                                readOnly
                                placeholder="Formatted JSON will appear here..."
                                value={outputJSON}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
