import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const HtmlEntityEncoder = () => {
  const [inputText, setInputText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [copied, setCopied] = useState({});

  useEffect(() => {
    document.title = "HTML Entity Encoder/Decoder"
  }, []);

  useEffect(() => {
    const htmlEntities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      ' ': '&nbsp;',
      '©': '&copy;',
      '®': '&reg;',
      '™': '&trade;',
      '€': '&euro;',
      '£': '&pound;',
      '¥': '&yen;',
      '¢': '&cent;',
      '§': '&sect;',
      '¶': '&para;',
      '•': '&bull;',
      '…': '&hellip;',
      '–': '&ndash;',
      '—': '&mdash;',
      '\u2018': '&lsquo;',
      '\u2019': '&rsquo;',
      '\u201C': '&ldquo;',
      '\u201D': '&rdquo;',
      '«': '&laquo;',
      '»': '&raquo;',
      '°': '&deg;',
      '±': '&plusmn;',
      '×': '&times;',
      '÷': '&divide;',
      'α': '&alpha;',
      'β': '&beta;',
      'γ': '&gamma;',
      'δ': '&delta;',
      'ε': '&epsilon;',
      'π': '&pi;',
      'σ': '&sigma;',
      'τ': '&tau;',
      'φ': '&phi;',
      'χ': '&chi;',
      'ω': '&omega;',
      '←': '&larr;',
      '↑': '&uarr;',
      '→': '&rarr;',
      '↓': '&darr;',
      '↔': '&harr;',
      '∞': '&infin;',
      '≤': '&le;',
      '≥': '&ge;',
      '≠': '&ne;',
      '≈': '&asymp;',
      '∑': '&sum;',
      '∏': '&prod;',
      '√': '&radic;',
      '∂': '&part;',
      '∫': '&int;'
    };

    const encodeHtmlEntities = (text) => {
      return text.replace(/[&<>"']/g, (match) => htmlEntities[match] || match);
    };

    const decodeHtmlEntities = (text) => {
      // Create reverse mapping
      const reverseEntities = {};
      Object.entries(htmlEntities).forEach(([char, entity]) => {
        reverseEntities[entity] = char;
      });

      // Add numeric entities
      const numericPattern = /&#(\d+);/g;
      const hexPattern = /&#x([0-9a-fA-F]+);/g;
      
      return text
        // Decode named entities
        .replace(/&\w+;/g, (match) => reverseEntities[match] || match)
        // Decode numeric entities
        .replace(numericPattern, (match, decimal) => String.fromCharCode(parseInt(decimal, 10)))
        // Decode hex entities
        .replace(hexPattern, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
    };

    if (inputText) {
      setEncodedText(encodeHtmlEntities(inputText));
      setDecodedText(decodeHtmlEntities(inputText));
    } else {
      setEncodedText('');
      setDecodedText('');
    }
  }, [inputText]);

  const handleCopy = (type) => {
    setCopied(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const loadSampleText = () => {
    const sample = `<div class="example">
  <h1>HTML Entities & Special Characters</h1>
  <p>Copyright © 2024 - All rights reserved ®</p>
  <p>Price: €50 (£40 or ¥5000)</p>
  <p>Temperature: 25°C ± 2°</p>
  <p>Math: 5 × 3 = 15 ÷ 1 = 15</p>
  <p>Greek: α β γ δ π σ ω</p>
  <p>Arrows: ← ↑ → ↓ ↔</p>
  <p>Quotes: "Hello" & 'world' — it's great!</p>
  <p>Symbols: ∞ ≤ ≥ ≠ ≈ √ ∑ ∏</p>
</div>`;
    setInputText(sample);
  };

  const clearAll = () => {
    setInputText('');
    setEncodedText('');
    setDecodedText('');
  };

  const commonEntities = [
    { char: '&', entity: '&amp;', desc: 'Ampersand' },
    { char: '<', entity: '&lt;', desc: 'Less than' },
    { char: '>', entity: '&gt;', desc: 'Greater than' },
    { char: '"', entity: '&quot;', desc: 'Quotation mark' },
    { char: "'", entity: '&#39;', desc: 'Apostrophe' },
    { char: ' ', entity: '&nbsp;', desc: 'Non-breaking space' },
    { char: '©', entity: '&copy;', desc: 'Copyright' },
    { char: '®', entity: '&reg;', desc: 'Registered' },
    { char: '™', entity: '&trade;', desc: 'Trademark' },
    { char: '€', entity: '&euro;', desc: 'Euro' },
    { char: '£', entity: '&pound;', desc: 'Pound' },
    { char: '°', entity: '&deg;', desc: 'Degree' }
  ];

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6">HTML Entity Encoder/Decoder</h1>
            <p className="lead">Convert special characters to HTML entities and vice versa</p>
            <hr />

            {/* Controls */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="btn-group mb-3">
                  <button className="btn btn-outline-primary" onClick={loadSampleText}>
                    Load Sample HTML
                  </button>
                  <button className="btn btn-outline-secondary" onClick={clearAll}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Input Text</h5>
                  </div>
                  <div className="card-body">
                    <textarea
                      className="form-control"
                      rows="8"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter text with special characters or HTML entities..."
                      style={{ fontFamily: 'Monaco, Consolas, monospace', fontSize: '14px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {inputText && (
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">HTML Entities (Encoded)</h5>
                      <CopyToClipboard text={encodedText}>
                        <button 
                          className={`btn btn-sm ${copied.encoded ? 'btn-success' : 'btn-outline-primary'}`}
                          onClick={() => handleCopy('encoded')}
                        >
                          {copied.encoded ? '✓ Copied!' : 'Copy'}
                        </button>
                      </CopyToClipboard>
                    </div>
                    <div className="card-body">
                      <textarea
                        className="form-control"
                        rows="8"
                        value={encodedText}
                        readOnly
                        style={{ 
                          fontFamily: 'Monaco, Consolas, monospace', 
                          fontSize: '12px',
                          backgroundColor: '#f8f9fa'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Decoded Text</h5>
                      <CopyToClipboard text={decodedText}>
                        <button 
                          className={`btn btn-sm ${copied.decoded ? 'btn-success' : 'btn-outline-primary'}`}
                          onClick={() => handleCopy('decoded')}
                        >
                          {copied.decoded ? '✓ Copied!' : 'Copy'}
                        </button>
                      </CopyToClipboard>
                    </div>
                    <div className="card-body">
                      <textarea
                        className="form-control"
                        rows="8"
                        value={decodedText}
                        readOnly
                        style={{ 
                          fontFamily: 'Monaco, Consolas, monospace', 
                          fontSize: '12px',
                          backgroundColor: '#f8f9fa'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Common Entities Reference */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Common HTML Entities Reference</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {commonEntities.map((item, index) => (
                        <div key={index} className="col-md-6 col-lg-4 mb-2">
                          <div className="d-flex justify-content-between align-items-center border-bottom pb-1">
                            <span className="font-weight-bold">{item.char}</span>
                            <span className="text-monospace small text-muted">{item.entity}</span>
                            <span className="small text-secondary">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!inputText && (
              <div className="alert alert-info mt-4" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Enter text with special characters or HTML entities to see the conversion
              </div>
            )}

            {/* Features */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Features & Use Cases</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <h6>Encoding (Special Characters → HTML Entities):</h6>
                        <ul className="small">
                          <li>Prevent XSS attacks in web applications</li>
                          <li>Display special characters safely in HTML</li>
                          <li>Ensure proper character rendering</li>
                          <li>Make text browser-compatible</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <h6>Decoding (HTML Entities → Special Characters):</h6>
                        <ul className="small">
                          <li>Convert HTML entities back to readable text</li>
                          <li>Process scraped web content</li>
                          <li>Clean up encoded email content</li>
                          <li>Restore original text formatting</li>
                        </ul>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-12">
                        <h6>Supported Entities:</h6>
                        <p className="small text-muted">
                          Basic HTML entities (&amp;, &lt;, &gt;, &quot;, &#39;), 
                          Currency symbols (€, £, ¥, ¢), 
                          Mathematical symbols (×, ÷, ±, °), 
                          Greek letters (α, β, π, σ, ω), 
                          Arrows (←, →, ↑, ↓), 
                          Special punctuation (&hellip;, &ndash;, &mdash;),
                          and numeric entities (&#123; &#x1F4; etc.)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlEntityEncoder;