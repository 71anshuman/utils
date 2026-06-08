import React, { useState, useEffect, useRef } from 'react';

export default function JsonDiff() {
    useEffect(() => {
        document.title = "JSON Diff Checker - DevUtils";
    }, []);

    const [leftJSON, setLeftJSON] = useState('');
    const [rightJSON, setRightJSON] = useState('');
    const [sortKeys, setSortKeys] = useState(() => {
        const saved = localStorage.getItem('json_diff_sort_keys');
        return saved !== null ? JSON.parse(saved) : true;
    });
    const [viewMode, setViewMode] = useState(() => {
        const saved = localStorage.getItem('diff_viewer_view_mode');
        return saved || 'split';
    }); // 'split' or 'unified'
    const [isCompared, setIsCompared] = useState(false);
    const [leftError, setLeftError] = useState('');
    const [rightError, setRightError] = useState('');
    const [diffLines, setDiffLines] = useState([]);

    useEffect(() => {
        localStorage.setItem('json_diff_sort_keys', JSON.stringify(sortKeys));
    }, [sortKeys]);

    useEffect(() => {
        localStorage.setItem('diff_viewer_view_mode', viewMode);
    }, [viewMode]);

    const leftInputGutterRef = useRef(null);
    const rightInputGutterRef = useRef(null);

    const handleLeftScroll = (e) => {
        if (leftInputGutterRef.current) {
            leftInputGutterRef.current.scrollTop = e.target.scrollTop;
        }
    };

    const handleRightScroll = (e) => {
        if (rightInputGutterRef.current) {
            rightInputGutterRef.current.scrollTop = e.target.scrollTop;
        }
    };

    const sampleLeft = `{
  "name": "DevUtils",
  "version": 2.0,
  "status": "active",
  "settings": {
    "theme": "dark",
    "fontSize": 14
  },
  "features": [
    "Formatting",
    "Password Gen"
  ]
}`;

    const sampleRight = `{
  "status": "active",
  "name": "DevUtils Suite",
  "version": 2.1,
  "features": [
    "Formatting",
    "Password Gen",
    "JSON Diff"
  ],
  "settings": {
    "fontSize": 15,
    "theme": "glassmorphic"
  }
}`;

    const loadSample = () => {
        setLeftJSON(sampleLeft);
        setRightJSON(sampleRight);
        setLeftError('');
        setRightError('');
        setIsCompared(false);
    };

    const handleClear = () => {
        setLeftJSON('');
        setRightJSON('');
        setLeftError('');
        setRightError('');
        setDiffLines([]);
        setIsCompared(false);
    };

    // Helper to recursively sort keys of a parsed JSON object/array
    const sortObjectKeys = (obj) => {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(sortObjectKeys);
        }
        return Object.keys(obj).sort().reduce((sorted, key) => {
            sorted[key] = sortObjectKeys(obj[key]);
            return sorted;
        }, {});
    };

    const handleCompare = () => {
        let leftParsed, rightParsed;
        let hasError = false;

        // Validate Left
        try {
            leftParsed = JSON.parse(leftJSON);
            setLeftError('');
        } catch (e) {
            setLeftError(e.message);
            hasError = true;
        }

        // Validate Right
        try {
            rightParsed = JSON.parse(rightJSON);
            setRightError('');
        } catch (e) {
            setRightError(e.message);
            hasError = true;
        }

        if (hasError) return;

        // Apply key sorting if toggled
        if (sortKeys) {
            leftParsed = sortObjectKeys(leftParsed);
            rightParsed = sortObjectKeys(rightParsed);
        }

        // Prettify objects for string comparison
        const leftStr = JSON.stringify(leftParsed, null, 2);
        const rightStr = JSON.stringify(rightParsed, null, 2);

        // Run LCS Diff Alignment
        const original = leftStr.split('\n');
        const modified = rightStr.split('\n');

        const dp = Array(original.length + 1).fill(0).map(() => Array(modified.length + 1).fill(0));

        for (let i = 1; i <= original.length; i++) {
            for (let j = 1; j <= modified.length; j++) {
                if (original[i - 1] === modified[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        let i = original.length;
        let j = modified.length;
        const result = [];

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && original[i - 1] === modified[j - 1]) {
                result.unshift({ type: 'unchanged', text: original[i - 1] });
                i--;
                j--;
            } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
                result.unshift({ type: 'added', text: modified[j - 1] });
                j--;
            } else {
                result.unshift({ type: 'removed', text: original[i - 1] });
                i--;
            }
        }

        setDiffLines(result);
        setIsCompared(true);
    };

    // Split result calculation
    const getSplitDiff = () => {
        const leftCols = [];
        const rightCols = [];
        let leftLine = 1;
        let rightLine = 1;

        diffLines.forEach((item) => {
            if (item.type === 'unchanged') {
                leftCols.push({ lineNum: leftLine++, type: 'unchanged', text: item.text });
                rightCols.push({ lineNum: rightLine++, type: 'unchanged', text: item.text });
            } else if (item.type === 'removed') {
                leftCols.push({ lineNum: leftLine++, type: 'removed', text: item.text });
                rightCols.push({ lineNum: '', type: 'empty', text: '' });
            } else if (item.type === 'added') {
                leftCols.push({ lineNum: '', type: 'empty', text: '' });
                rightCols.push({ lineNum: rightLine++, type: 'added', text: item.text });
            }
        });

        return { leftCols, rightCols };
    };

    const { leftCols, rightCols } = getSplitDiff();

    const leftLinesCount = leftJSON.split('\n').length || 1;
    const rightLinesCount = rightJSON.split('\n').length || 1;

    const editorStyle = {
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: '20px',
        paddingTop: '12px',
        paddingBottom: '12px',
        height: '400px',
        resize: 'none'
    };

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="jumbotron jumbotron-fluid mb-4">
                <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <div>
                        <h1 className="display-6 font-weight-bold">JSON Diff Checker</h1>
                        <p className="lead text-secondary mb-0">Compare two JSON blobs to visually inspect structural additions, deletions, or value adjustments.</p>
                    </div>
                    <div className="mt-3 mt-md-0">
                        <button className="btn btn-secondary mr-2" onClick={loadSample}>Load Sample</button>
                        <button className="btn btn-dark" onClick={handleClear}>Clear</button>
                    </div>
                </div>
            </div>

            {/* Inputs Panel */}
            {!isCompared && (
                <>
                    {/* Controls Row */}
                    <div className="card glass-panel border-0 p-3 mb-4">
                        <div className="d-flex justify-content-between align-items-center flex-wrap" style={{ gap: '16px' }}>
                            <div className="custom-control custom-switch">
                                <input
                                    type="checkbox"
                                    className="custom-control-input text-primary"
                                    id="sortKeysSwitch"
                                    checked={sortKeys}
                                    onChange={(e) => setSortKeys(e.target.checked)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <label className="custom-control-label small font-weight-bold text-muted text-uppercase" htmlFor="sortKeysSwitch" style={{ cursor: 'pointer', userSelect: 'none' }}>
                                    Auto-Sort Keys Alphabetically (Ignore Reordering)
                                </label>
                            </div>
                            <button
                                className="btn btn-primary px-4"
                                disabled={!leftJSON || !rightJSON}
                                onClick={handleCompare}
                            >
                                Compare JSON Blobs
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        {/* Left Input */}
                        <div className="col-md-6 mb-4">
                            <div className="form-group h-100 d-flex flex-column">
                                <label className="font-weight-bold mb-2">Original JSON (Left Side)</label>
                                <div className="d-flex border rounded overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                                    <div 
                                        ref={leftInputGutterRef}
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
                                        {Array.from({ length: leftLinesCount }).map((_, i) => (
                                            <div key={i} style={{ height: editorStyle.lineHeight }}>{i + 1}</div>
                                        ))}
                                    </div>
                                    <textarea
                                        className={`form-control border-0 flex-grow-1 ${leftError ? 'is-invalid' : ''}`}
                                        style={{ 
                                            ...editorStyle,
                                            borderTopLeftRadius: '0px !important',
                                            borderBottomLeftRadius: '0px !important',
                                            paddingLeft: '12px',
                                            whiteSpace: 'pre',
                                            overflowX: 'auto',
                                            background: 'transparent'
                                        }}
                                        onScroll={handleLeftScroll}
                                        placeholder="Paste original JSON here..."
                                        value={leftJSON}
                                        onChange={(e) => setLeftJSON(e.target.value)}
                                    />
                                </div>
                                {leftError && (
                                    <div className="alert alert-danger mt-3 mb-0" role="alert">
                                        <strong>⚠️ Invalid Left JSON:</strong> {leftError}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Input */}
                        <div className="col-md-6 mb-4">
                            <div className="form-group h-100 d-flex flex-column">
                                <label className="font-weight-bold mb-2">Modified JSON (Right Side)</label>
                                <div className="d-flex border rounded overflow-hidden" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                                    <div 
                                        ref={rightInputGutterRef}
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
                                        {Array.from({ length: rightLinesCount }).map((_, i) => (
                                            <div key={i} style={{ height: editorStyle.lineHeight }}>{i + 1}</div>
                                        ))}
                                    </div>
                                    <textarea
                                        className={`form-control border-0 flex-grow-1 ${rightError ? 'is-invalid' : ''}`}
                                        style={{ 
                                            ...editorStyle,
                                            borderTopLeftRadius: '0px !important',
                                            borderBottomLeftRadius: '0px !important',
                                            paddingLeft: '12px',
                                            whiteSpace: 'pre',
                                            overflowX: 'auto',
                                            background: 'transparent'
                                        }}
                                        onScroll={handleRightScroll}
                                        placeholder="Paste modified JSON here..."
                                        value={rightJSON}
                                        onChange={(e) => setRightJSON(e.target.value)}
                                    />
                                </div>
                                {rightError && (
                                    <div className="alert alert-danger mt-3 mb-0" role="alert">
                                        <strong>⚠️ Invalid Right JSON:</strong> {rightError}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Results Viewer */}
            {isCompared && (
                <div className="card glass-panel border-0 shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap" style={{ gap: '12px' }}>
                        <div className="d-flex align-items-center flex-wrap" style={{ gap: '8px' }}>
                            <h3 className="h5 font-weight-bold mb-0 mr-3">Comparison Result</h3>
                            <span className="badge badge-success">
                                {diffLines.filter(l => l.type === 'added').length} additions
                            </span>
                            <span className="badge" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                                {diffLines.filter(l => l.type === 'removed').length} deletions
                            </span>
                        </div>
                        <div className="btn-group" role="group">
                            <button 
                                className={`btn btn-sm ${viewMode === 'split' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setViewMode('split')}
                                style={{ borderTopRightRadius: '0px !important', borderBottomRightRadius: '0px !important' }}
                            >
                                Split View
                            </button>
                            <button 
                                className={`btn btn-sm ${viewMode === 'unified' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setViewMode('unified')}
                                style={{ borderTopLeftRadius: '0px !important', borderBottomLeftRadius: '0px !important' }}
                            >
                                Unified View
                            </button>
                            <button className="btn btn-sm btn-dark ml-3" onClick={() => setIsCompared(false)}>
                                Edit Inputs
                            </button>
                        </div>
                    </div>

                    <div 
                        className="overflow-auto rounded border" 
                        style={{ 
                            maxHeight: '600px', 
                            backgroundColor: 'var(--bg-app)', 
                            borderColor: 'var(--border-color)',
                            fontSize: '0.85rem'
                        }}
                    >
                        {viewMode === 'split' ? (
                            /* Split View rendering side-by-side */
                            <div className="d-flex font-monospace" style={{ minWidth: '800px', fontFamily: 'monospace', whiteSpace: 'pre' }}>
                                {/* Left Panel (Original) */}
                                <div className="w-50 border-right" style={{ borderColor: 'var(--border-color)' }}>
                                    {leftCols.map((item, index) => {
                                        let bg = 'transparent';
                                        let textCol = 'var(--text-main)';
                                        if (item.type === 'removed') {
                                            bg = 'rgba(239, 68, 68, 0.12)';
                                            textCol = '#ef4444';
                                        } else if (item.type === 'empty') {
                                            bg = 'rgba(226, 232, 240, 0.05)';
                                        }
                                        return (
                                            <div key={index} className="d-flex align-items-stretch" style={{ backgroundColor: bg, color: textCol, minHeight: '20px', lineHeight: '20px' }}>
                                                <div className="text-right pr-2 text-muted border-right" style={{ width: '45px', userSelect: 'none', borderColor: 'var(--border-color)', fontSize: '0.75rem', paddingRight: '6px' }}>
                                                    {item.lineNum}
                                                </div>
                                                <div className="px-2 w-100 overflow-hidden text-truncate">
                                                    {item.type === 'removed' && <span className="mr-1 font-weight-bold">-</span>}
                                                    {item.text || ' '}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* Right Panel (Modified) */}
                                <div className="w-50">
                                    {rightCols.map((item, index) => {
                                        let bg = 'transparent';
                                        let textCol = 'var(--text-main)';
                                        if (item.type === 'added') {
                                            bg = 'rgba(16, 185, 129, 0.12)';
                                            textCol = '#10b981';
                                        } else if (item.type === 'empty') {
                                            bg = 'rgba(226, 232, 240, 0.05)';
                                        }
                                        return (
                                            <div key={index} className="d-flex align-items-stretch" style={{ backgroundColor: bg, color: textCol, minHeight: '20px', lineHeight: '20px' }}>
                                                <div className="text-right pr-2 text-muted border-right" style={{ width: '45px', userSelect: 'none', borderColor: 'var(--border-color)', fontSize: '0.75rem', paddingRight: '6px' }}>
                                                    {item.lineNum}
                                                </div>
                                                <div className="px-2 w-100 overflow-hidden text-truncate">
                                                    {item.type === 'added' && <span className="mr-1 font-weight-bold">+</span>}
                                                    {item.text || ' '}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            /* Unified View rendering linearly */
                            <div className="font-monospace py-2" style={{ fontFamily: 'monospace', whiteSpace: 'pre', minWidth: '500px' }}>
                                {diffLines.map((item, index) => {
                                    let bg = 'transparent';
                                    let textCol = 'var(--text-main)';
                                    let sign = ' ';
                                    if (item.type === 'added') {
                                        bg = 'rgba(16, 185, 129, 0.12)';
                                        textCol = '#10b981';
                                        sign = '+';
                                    } else if (item.type === 'removed') {
                                        bg = 'rgba(239, 68, 68, 0.12)';
                                        textCol = '#ef4444';
                                        sign = '-';
                                    }
                                    return (
                                        <div key={index} className="d-flex align-items-center px-3" style={{ backgroundColor: bg, color: textCol, minHeight: '22px' }}>
                                            <span className="mr-3 text-muted" style={{ width: '15px', userSelect: 'none' }}>{sign}</span>
                                            <div className="w-100 overflow-hidden text-truncate">{item.text}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
