export const TOOLS = [
  // Financial
  { id: 'sip-calculator', name: 'SIP Calculator', path: '/sip-calculator', category: 'Financial', icon: '📊', desc: 'Calculate the future value of your systematic investment plan.' },
  { id: 'emi-calculator', name: 'EMI Calculator', path: '/emi-calculator', category: 'Financial', icon: '💰', desc: 'Calculate Equated Monthly Installments for home/car loans.' },
  { id: 'salary-hike-calculator', name: 'Salary Hike Calc', path: '/salary-hike-calculator', category: 'Financial', icon: '📈', desc: 'Calculate percentage salary hike and projections.' },

  // Developer
  { id: 'json-formatter', name: 'JSON Formatter', path: '/json-formatter', category: 'Developer', icon: '⚙️', desc: 'Format, parse, and prettify raw minified JSON.' },
  { id: 'csv-to-json-converter', name: 'CSV to JSON', path: '/csv-to-json-converter', category: 'Developer', icon: '📄', desc: 'Convert comma-separated values to clean JSON format.' },
  { id: 'css-minifier', name: 'CSS Minifier', path: '/css-minifier', category: 'Developer', icon: '🎨', desc: 'Compress and minify raw CSS code to reduce size.' },
  { id: 'js-minifier', name: 'JS Minifier', path: '/js-minifier', category: 'Developer', icon: '💻', desc: 'Compress Javascript code and remove comments/whitespace.' },
  { id: 'regex-tester', name: 'Regex Tester', path: '/regex-tester', category: 'Developer', icon: '🔍', desc: 'Test and debug regular expressions with highlighting.' },
  { id: 'html-entity-encoder', name: 'HTML Entity Enc', path: '/html-entity-encoder', category: 'Developer', icon: '🔣', desc: 'Encode or decode HTML entities to prevent rendering issues.' },
  { id: 'hash-generator', name: 'Hash Generator', path: '/hash-generator', category: 'Developer', icon: '🔑', desc: 'Generate secure MD5, SHA-1, SHA-256 cryptographic hashes.' },
  { id: 'guid-generator', name: 'GUID/UUID Gen', path: '/guid-generator', category: 'Developer', icon: '🆔', desc: 'Generate unique RFC 4122 compliant UUID v4 IDs.' },
  { id: 'base-64-converter', name: 'Base64 Converter', path: '/base-64-converter', category: 'Developer', icon: '📦', desc: 'Encode or decode data in RFC 4648 Base64 format.' },
  { id: 'url-encoder', name: 'URL Encoder/Dec', path: '/url-encoder', category: 'Developer', icon: '🔗', desc: 'Safely encode or decode URL query string parameters.' },
  { id: 'password-generator', name: 'Password Gen', path: '/password-generator', category: 'Developer', icon: '🛡️', desc: 'Generate highly secure custom passwords with modifiers.' },
  { id: 'jwt-decoder', name: 'JWT Decoder', path: '/jwt-decoder', category: 'Developer', icon: '🎟️', desc: 'Decode and inspect JWT header, payload, and expiry state.' },
  { id: 'json-diff', name: 'JSON Diff Checker', path: '/json-diff', category: 'Developer', icon: '⚖️', desc: 'Compare and find structural differences between two JSON objects.' },

  // Text & Content
  { id: 'word-counter', name: 'Word Counter', path: '/word-counter', category: 'Text', icon: '📝', desc: 'Count characters, words, sentences, and read-time stats.' },
  { id: 'multi-line-to-single-line', name: 'Multi to Single Line', path: '/multi-line-to-single-line', category: 'Text', icon: '↕️', desc: 'Strip linebreaks and merge text blocks into one line.' },
  { id: 'text-case-converter', name: 'Text Case Conv', path: '/text-case-converter', category: 'Text', icon: 'Aa', desc: 'Convert text case (UPPER, lower, Title, Camel, Sentence).' },
  { id: 'markdown-converter', name: 'Markdown Converter', path: '/markdown-converter', category: 'Text', icon: '✍️', desc: 'Parse and render GitHub-Flavored Markdown to HTML.' },
  { id: 'lorem-generator', name: 'Lorem Ipsum Gen', path: '/lorem-generator', category: 'Text', icon: '📜', desc: 'Generate placeholder paragraphs, words, or sentences.' },
  { id: 'ascii-art-generator', name: 'ASCII Art Gen', path: '/ascii-art-generator', category: 'Text', icon: '👾', desc: 'Convert standard text strings to creative ASCII graphics.' },
  { id: 'diff-viewer', name: 'Diff Viewer', path: '/diff-viewer', category: 'Text', icon: '⚖️', desc: 'Compare two text snippets side-by-side or inline to spot differences.' },

  // Utilities & Design
  { id: 'color-picker', name: 'Color Picker', path: '/color-picker', category: 'Utilities', icon: '🌈', desc: 'Pick colors, convert formats (HEX, RGB, HSL), palettes.' },
  { id: 'qr-code-generator', name: 'QR Code Gen', path: '/qr-code-generator', category: 'Utilities', icon: '📱', desc: 'Generate customized scannable high-resolution QR codes.' },
  { id: 'image-compressor', name: 'Image Compressor', path: '/image-compressor', category: 'Utilities', icon: '🖼️', desc: 'Compress and resize JPG/PNG images directly in-browser.' },
  { id: 'timestamp-converter', name: 'Timestamp Conv', path: '/timestamp-converter', category: 'Utilities', icon: '⏰', desc: 'Convert Unix timestamps to readable datetimes and vice-versa.' },
  { id: 'ip-lookup', name: 'IP Lookup', path: '/ip-lookup', category: 'Utilities', icon: '🌐', desc: 'Perform client or target IP geolocation and DNS info lookups.' },
  { id: 'unit-converter', name: 'Unit Converter', path: '/unit-converter', category: 'Utilities', icon: '⚖️', desc: 'Convert standard physical units (length, weight, temp).' }
];
