import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const LoremGenerator = () => {
  const [generatedText, setGeneratedText] = useState('');
  const [count, setCount] = useState(3);
  const [type, setType] = useState('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [textType, setTextType] = useState('lorem');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Lorem Ipsum Generator";
    generateText();
  }, []);

  const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const casualWords = [
    'the', 'quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'and', 'runs',
    'through', 'forest', 'while', 'birds', 'sing', 'in', 'trees', 'above', 'water',
    'flows', 'down', 'mountain', 'creating', 'beautiful', 'scenery', 'for', 'all',
    'to', 'enjoy', 'nature', 'provides', 'peace', 'tranquility', 'people', 'seek',
    'during', 'busy', 'lives', 'time', 'spent', 'outdoors', 'helps', 'refresh',
    'mind', 'body', 'soul', 'giving', 'energy', 'face', 'challenges', 'ahead',
    'every', 'day', 'brings', 'new', 'opportunities', 'growth', 'learning'
  ];

  const techWords = [
    'application', 'framework', 'database', 'server', 'client', 'interface', 'protocol',
    'architecture', 'component', 'module', 'function', 'variable', 'algorithm', 'data',
    'structure', 'network', 'security', 'authentication', 'authorization', 'encryption',
    'deployment', 'container', 'microservice', 'api', 'endpoint', 'request', 'response',
    'cache', 'optimization', 'performance', 'scalability', 'monitoring', 'logging',
    'debugging', 'testing', 'integration', 'continuous', 'development', 'production',
    'environment', 'configuration', 'documentation', 'repository', 'version', 'control'
  ];

  const businessWords = [
    'strategy', 'management', 'leadership', 'innovation', 'solution', 'customer',
    'client', 'service', 'quality', 'excellence', 'efficiency', 'productivity',
    'growth', 'revenue', 'profit', 'market', 'competition', 'advantage', 'value',
    'proposition', 'stakeholder', 'partnership', 'collaboration', 'synergy', 'optimization',
    'process', 'workflow', 'methodology', 'framework', 'analysis', 'insight', 'data',
    'metrics', 'performance', 'objectives', 'goals', 'deliverable', 'timeline', 'budget',
    'resources', 'investment', 'return', 'sustainability', 'compliance', 'governance'
  ];

  const getWordList = () => {
    switch (textType) {
      case 'lorem': return loremWords;
      case 'casual': return casualWords;
      case 'tech': return techWords;
      case 'business': return businessWords;
      default: return loremWords;
    }
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const generateSentence = (minWords = 8, maxWords = 15) => {
    const words = getWordList();
    const sentenceLength = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const sentence = [];
    
    for (let i = 0; i < sentenceLength; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      sentence.push(randomWord);
    }
    
    return capitalizeFirst(sentence.join(' ')) + '.';
  };

  const generateParagraph = (minSentences = 4, maxSentences = 8) => {
    const paragraphLength = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
    const sentences = [];
    
    for (let i = 0; i < paragraphLength; i++) {
      sentences.push(generateSentence());
    }
    
    return sentences.join(' ');
  };

  const generateWords = (wordCount) => {
    const words = getWordList();
    const result = [];
    
    for (let i = 0; i < wordCount; i++) {
      result.push(words[Math.floor(Math.random() * words.length)]);
    }
    
    return result.join(' ');
  };

  const generateText = () => {
    let result = '';
    
    if (type === 'words') {
      result = generateWords(count);
      if (startWithLorem && textType === 'lorem') {
        result = 'Lorem ipsum ' + result;
      }
    } else if (type === 'sentences') {
      const sentences = [];
      for (let i = 0; i < count; i++) {
        sentences.push(generateSentence());
      }
      result = sentences.join(' ');
      
      if (startWithLorem && textType === 'lorem') {
        result = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + result;
      }
    } else if (type === 'paragraphs') {
      const paragraphs = [];
      for (let i = 0; i < count; i++) {
        paragraphs.push(generateParagraph());
      }
      result = paragraphs.join('\n\n');
      
      if (startWithLorem && textType === 'lorem') {
        const firstParagraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
        result = firstParagraph + '\n\n' + result;
      }
    }
    
    setGeneratedText(result);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateHTML = () => {
    const paragraphs = generatedText.split('\n\n');
    return paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('\n');
  };

  const getWordCount = () => {
    return generatedText.split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharacterCount = () => {
    return generatedText.length;
  };

  const getParagraphCount = () => {
    return generatedText.split('\n\n').length;
  };

  const handleParameterChange = (newType, newCount, newStartWithLorem, newTextType) => {
    setType(newType);
    setCount(newCount);
    setStartWithLorem(newStartWithLorem);
    setTextType(newTextType);
  };

  useEffect(() => {
    generateText();
  }, [count, type, startWithLorem, textType]);

  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="display-6">Lorem Ipsum Generator</h1>
            <p className="lead">Generate placeholder text for your designs and layouts</p>
            <hr />

            <div className="row">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h6 className="mb-0">Generation Options</h6>
                  </div>
                  <div className="card-body">
                    <div className="form-group">
                      <label>Text Type</label>
                      <select 
                        className="form-control"
                        value={textType}
                        onChange={(e) => handleParameterChange(type, count, startWithLorem, e.target.value)}
                      >
                        <option value="lorem">Lorem Ipsum</option>
                        <option value="casual">Casual Text</option>
                        <option value="tech">Tech Words</option>
                        <option value="business">Business Terms</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Generate</label>
                      <select 
                        className="form-control"
                        value={type}
                        onChange={(e) => handleParameterChange(e.target.value, count, startWithLorem, textType)}
                      >
                        <option value="paragraphs">Paragraphs</option>
                        <option value="sentences">Sentences</option>
                        <option value="words">Words</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Count</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        max="50"
                        value={count}
                        onChange={(e) => handleParameterChange(type, parseInt(e.target.value) || 1, startWithLorem, textType)}
                      />
                    </div>

                    {textType === 'lorem' && (
                      <div className="form-group">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="startWithLorem"
                            checked={startWithLorem}
                            onChange={(e) => handleParameterChange(type, count, e.target.checked, textType)}
                          />
                          <label className="form-check-label" htmlFor="startWithLorem">
                            Start with "Lorem ipsum"
                          </label>
                        </div>
                      </div>
                    )}

                    <button 
                      className="btn btn-primary btn-block"
                      onClick={generateText}
                    >
                      Generate New Text
                    </button>
                  </div>
                </div>

                {generatedText && (
                  <div className="card mt-3">
                    <div className="card-header">
                      <h6 className="mb-0">Statistics</h6>
                    </div>
                    <div className="card-body">
                      <small className="d-block">
                        <strong>Paragraphs:</strong> {getParagraphCount()}
                      </small>
                      <small className="d-block">
                        <strong>Words:</strong> {getWordCount()}
                      </small>
                      <small className="d-block">
                        <strong>Characters:</strong> {getCharacterCount()}
                      </small>
                      <small className="d-block">
                        <strong>Characters (no spaces):</strong> {generatedText.replace(/\s/g, '').length}
                      </small>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-8">
                {generatedText && (
                  <>
                    <div className="card">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">Generated Text</h6>
                        <CopyToClipboard text={generatedText}>
                          <button 
                            className={`btn ${copied ? 'btn-success' : 'btn-outline-primary'}`}
                            onClick={handleCopy}
                          >
                            {copied ? 'Copied!' : 'Copy Text'}
                          </button>
                        </CopyToClipboard>
                      </div>
                      <div className="card-body">
                        <textarea
                          className="form-control"
                          rows="15"
                          value={generatedText}
                          readOnly
                          style={{ fontSize: '0.9rem', lineHeight: '1.6' }}
                        />
                      </div>
                    </div>

                    <div className="card mt-3">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">HTML Format</h6>
                        <CopyToClipboard text={generateHTML()}>
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => {
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                            }}
                          >
                            Copy HTML
                          </button>
                        </CopyToClipboard>
                      </div>
                      <div className="card-body">
                        <textarea
                          className="form-control"
                          rows="8"
                          value={generateHTML()}
                          readOnly
                          style={{ fontSize: '0.85rem', fontFamily: 'monospace' }}
                        />
                        <small className="text-muted">
                          Ready to paste into your HTML documents
                        </small>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-12">
                <div className="alert alert-info">
                  <h6><i className="fas fa-info-circle mr-2"></i>About Lorem Ipsum</h6>
                  <p className="mb-0 small">
                    Lorem ipsum is simply dummy text used in the printing and typesetting industry. 
                    It has been the industry's standard dummy text since the 1500s, when an unknown 
                    printer took a galley of type and scrambled it to make a type specimen book. 
                    It allows designers to focus on visual elements without being distracted by readable content.
                  </p>
                </div>
              </div>
            </div>

            {!generatedText && (
              <div className="alert alert-info" role="alert">
                <i className="fas fa-info-circle mr-2"></i>
                Configure your options and click "Generate New Text" to create placeholder content
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoremGenerator;