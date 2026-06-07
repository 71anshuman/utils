import React, { useState, useEffect } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const MarkdownConverter = () => {
  const [markdownText, setMarkdownText] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Markdown to HTML Converter"
  }, []);

  // Simple Markdown to HTML converter
  const convertMarkdownToHtml = (markdown) => {
    let html = markdown;

    // Headers (must come before bold/italic to avoid conflicts)
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Strikethrough
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Code (inline)
    html = html.replace(/`(.*?)`/g, '<code>$1</code>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />');

    // Horizontal Rule
    html = html.replace(/^---$/gm, '<hr />');
    html = html.replace(/^\*\*\*$/gm, '<hr />');

    // Lists (unordered)
    html = html.replace(/^\* (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^\+ (.+)$/gm, '<li>$1</li>');
    
    // Lists (ordered)
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Wrap consecutive list items in ul/ol tags
    html = html.replace(/(<li>.*<\/li>)/gs, (match) => {
      // Check if the list items are numbered (ordered list)
      const isOrdered = /^\d+\./.test(markdownText.match(/^\d+\. .+|^[*\-+] .+/gm)?.[0] || '');
      const tag = isOrdered ? 'ol' : 'ul';
      return `<${tag}>${match}</${tag}>`;
    });

    // Blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    // Tables (simple implementation)
    html = html.replace(/\|(.+)\|/g, (match, content) => {
      const cells = content.split('|').map(cell => cell.trim());
      const cellsHtml = cells.map(cell => `<td>${cell}</td>`).join('');
      return `<tr>${cellsHtml}</tr>`;
    });
    
    // Wrap table rows in table tag
    if (html.includes('<tr>')) {
      html = html.replace(/(<tr>.*<\/tr>)/gs, '<table border="1" style="border-collapse: collapse; width: 100%;">$1</table>');
    }

    // Line breaks
    html = html.replace(/\n/g, '<br />');

    // Clean up extra breaks in block elements
    html = html.replace(/<\/h[1-6]><br \/>/g, '</h1>');
    html = html.replace(/<\/h[1-6]><br \/>/g, '</h2>');
    html = html.replace(/<\/h[1-6]><br \/>/g, '</h3>');
    html = html.replace(/<\/blockquote><br \/>/g, '</blockquote>');
    html = html.replace(/<\/pre><br \/>/g, '</pre>');
    html = html.replace(/<hr \/><br \/>/g, '<hr />');

    return html;
  };

  const handleMarkdownChange = (e) => {
    const value = e.target.value;
    setMarkdownText(value);
    setHtmlOutput(convertMarkdownToHtml(value));
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => {
    setMarkdownText('');
    setHtmlOutput('');
    setCopied(false);
  };

  const loadExample = () => {
    const example = `# Markdown to HTML Example

This is a **markdown** document with *various* elements.

## Features

- **Bold text** and *italic text*
- ~~Strikethrough text~~
- \`Inline code\` and code blocks
- [Links](https://example.com)
- Lists and more!

### Code Block

\`\`\`
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Blockquote

> This is a blockquote.
> It can span multiple lines.

### List

1. First item
2. Second item
3. Third item

---

*Happy converting!*`;
    
    setMarkdownText(example);
    setHtmlOutput(convertMarkdownToHtml(example));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">
                <i className="fab fa-markdown mr-2"></i>
                Markdown to HTML Converter
              </h4>
              <small>Convert Markdown text to HTML markup</small>
            </div>
            <div className="card-body">
              {/* Controls */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <button
                    className="btn btn-primary mr-2 mb-2"
                    onClick={loadExample}
                  >
                    <i className="fas fa-file-alt mr-1"></i>
                    Load Example
                  </button>
                  <button
                    className="btn btn-secondary mr-2 mb-2"
                    onClick={clearText}
                  >
                    <i className="fas fa-trash mr-1"></i>
                    Clear
                  </button>
                  <button
                    className={`btn mb-2 ${previewMode ? 'btn-warning' : 'btn-info'}`}
                    onClick={() => setPreviewMode(!previewMode)}
                  >
                    <i className={`fas ${previewMode ? 'fa-code' : 'fa-eye'} mr-1`}></i>
                    {previewMode ? 'Show HTML' : 'Preview Mode'}
                  </button>
                </div>
              </div>

              {/* Input/Output */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="markdownInput">
                      <strong>
                        <i className="fab fa-markdown mr-1"></i>
                        Markdown Input:
                      </strong>
                    </label>
                    <textarea
                      id="markdownInput"
                      className="form-control"
                      value={markdownText}
                      onChange={handleMarkdownChange}
                      placeholder="Enter your Markdown text here..."
                      rows="20"
                      style={{ fontFamily: 'Monaco, "Lucida Console", monospace', fontSize: '14px' }}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="form-group">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label>
                        <strong>
                          <i className="fab fa-html5 mr-1"></i>
                          {previewMode ? 'HTML Preview:' : 'HTML Output:'}
                        </strong>
                      </label>
                      {htmlOutput && !previewMode && (
                        <CopyToClipboard text={htmlOutput} onCopy={handleCopy}>
                          <button className="btn btn-success btn-sm">
                            <i className="fas fa-copy mr-1"></i>
                            {copied ? 'Copied!' : 'Copy HTML'}
                          </button>
                        </CopyToClipboard>
                      )}
                    </div>
                    
                    {previewMode ? (
                      <div 
                        className="border rounded p-3"
                        style={{ 
                          minHeight: '480px', 
                          backgroundColor: '#f8f9fa',
                          overflowY: 'auto'
                        }}
                        dangerouslySetInnerHTML={{ __html: htmlOutput || '<em>Preview will appear here...</em>' }}
                      />
                    ) : (
                      <textarea
                        className="form-control"
                        value={htmlOutput}
                        readOnly
                        placeholder="HTML output will appear here..."
                        rows="20"
                        style={{ 
                          fontFamily: 'Monaco, "Lucida Console", monospace', 
                          fontSize: '13px',
                          backgroundColor: '#f8f9fa'
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Markdown Reference */}
              <div className="mt-4">
                <div className="card">
                  <div className="card-header bg-light">
                    <h6 className="mb-0">
                      <i className="fas fa-question-circle mr-1"></i>
                      Markdown Quick Reference
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <small>
                          <strong>Headers:</strong><br />
                          <code># H1</code>, <code>## H2</code>, <code>### H3</code><br /><br />
                          
                          <strong>Text Styling:</strong><br />
                          <code>**bold**</code>, <code>*italic*</code>, <code>~~strike~~</code><br /><br />
                          
                          <strong>Links & Images:</strong><br />
                          <code>[link](url)</code>, <code>![alt](image.jpg)</code><br /><br />
                        </small>
                      </div>
                      <div className="col-md-6">
                        <small>
                          <strong>Lists:</strong><br />
                          <code>- item</code> or <code>1. item</code><br /><br />
                          
                          <strong>Code:</strong><br />
                          <code>`inline code`</code>, <code>```code block```</code><br /><br />
                          
                          <strong>Other:</strong><br />
                          <code>&gt; blockquote</code>, <code>---</code> (horizontal rule)<br />
                        </small>
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

export default MarkdownConverter;