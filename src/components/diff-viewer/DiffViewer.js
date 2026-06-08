import React, { useState, useEffect } from 'react';

export default function DiffViewer() {
    useEffect(() => {
        document.title = "Text Diff Viewer";
    }, []);

    const [originalText, setOriginalText] = useState('');
    const [modifiedText, setModifiedText] = useState('');
    const [viewMode, setViewMode] = useState('split'); // 'split' or 'unified'
    const [diffLines, setDiffLines] = useState([]);
    const [isCompared, setIsCompared] = useState(false);

    const loadSample = () => {
        setOriginalText(
            `const user = {\n  name: "John Doe",\n  age: 30,\n  role: "developer",\n  skills: ["javascript", "react"]\n};\n\nconsole.log(user);`
        );
        setModifiedText(
            `const user = {\n  name: "John Doe",\n  age: 31,\n  role: "Lead Engineer",\n  skills: ["javascript", "react", "nextjs"]\n};\n\nconsole.log(JSON.stringify(user));`
        );
        setIsCompared(false);
    };

    const handleCompare = () => {
        // LCS Diff Algorithm
        const original = originalText.split('\n');
        const modified = modifiedText.split('\n');
        
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

    const handleClear = () => {
        setOriginalText('');
        setModifiedText('');
        setDiffLines([]);
        setIsCompared(false);
    };

    // Prepare split columns
    const getSplitDiff = () => {
        const left = [];
        const right = [];
        
        let leftLineNum = 1;
        let rightLineNum = 1;

        diffLines.forEach((item, index) => {
            if (item.type === 'unchanged') {
                left.push({ lineNum: leftLineNum++, type: 'unchanged', text: item.text });
                right.push({ lineNum: rightLineNum++, type: 'unchanged', text: item.text });
            } else if (item.type === 'removed') {
                left.push({ lineNum: leftLineNum++, type: 'removed', text: item.text });
                right.push({ lineNum: '', type: 'empty', text: '' });
            } else if (item.type === 'added') {
                left.push({ lineNum: '', type: 'empty', text: '' });
                right.push({ lineNum: rightLineNum++, type: 'added', text: item.text });
            }
        });

        return { left, right };
    };

    const { left, right } = getSplitDiff();

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="jumbotron jumbotron-fluid mb-4">
                <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <div>
                        <h1 className="display-6 font-weight-bold">Text Diff Viewer</h1>
                        <p className="lead text-secondary mb-0">Compare two blocks of text or code to see insertions, deletions, and updates.</p>
                    </div>
                    <div className="mt-3 mt-md-0">
                        <button className="btn btn-secondary mr-2" onClick={loadSample}>Load Sample</button>
                        <button className="btn btn-dark" onClick={handleClear}>Clear</button>
                    </div>
                </div>
            </div>

            {/* Inputs Panel */}
            {!isCompared && (
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="form-group">
                            <label className="font-weight-bold mb-2">Original Text (Left Side)</label>
                            <textarea
                                className="form-control font-monospace"
                                style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.4' }}
                                rows="15"
                                placeholder="Paste original text here..."
                                value={originalText}
                                onChange={e => setOriginalText(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-group">
                            <label className="font-weight-bold mb-2">Modified Text (Right Side)</label>
                            <textarea
                                className="form-control font-monospace"
                                style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.4' }}
                                rows="15"
                                placeholder="Paste modified text here..."
                                value={modifiedText}
                                onChange={e => setModifiedText(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12 text-center mt-2">
                        <button 
                            className="btn btn-primary btn-lg" 
                            disabled={!originalText && !modifiedText} 
                            onClick={handleCompare}
                            style={{ padding: '12px 40px', fontSize: '1.1rem' }}
                        >
                            Compare Text
                        </button>
                    </div>
                </div>
            )}

            {/* Comparison Results */}
            {isCompared && (
                <div className="card glass-panel border-0 shadow-sm p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                        <div className="d-flex align-items-center mb-2 mb-md-0">
                            <h3 className="h5 font-weight-bold mb-0 mr-3">Comparison Result</h3>
                            <span className="badge badge-success mr-2">
                                {diffLines.filter(l => l.type === 'added').length} additions
                            </span>
                            <span className="badge mr-2" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
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
                                    {left.map((item, index) => {
                                        let bg = 'transparent';
                                        let textCol = 'var(--text-main)';
                                        if (item.type === 'removed') {
                                            bg = 'rgba(239, 68, 68, 0.12)';
                                            textCol = '#ef4444';
                                        } else if (item.type === 'empty') {
                                            bg = 'rgba(226, 232, 240, 0.05)';
                                        }
                                        return (
                                            <div key={index} className="d-flex align-items-stretch" style={{ backgroundColor: bg, color: textCol, minHeight: '20px' }}>
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
                                    {right.map((item, index) => {
                                        let bg = 'transparent';
                                        let textCol = 'var(--text-main)';
                                        if (item.type === 'added') {
                                            bg = 'rgba(16, 185, 129, 0.12)';
                                            textCol = '#10b981';
                                        } else if (item.type === 'empty') {
                                            bg = 'rgba(226, 232, 240, 0.05)';
                                        }
                                        return (
                                            <div key={index} className="d-flex align-items-stretch" style={{ backgroundColor: bg, color: textCol, minHeight: '20px' }}>
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
