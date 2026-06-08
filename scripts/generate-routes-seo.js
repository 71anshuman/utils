const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const TEMPLATE_PATH = path.join(BUILD_DIR, 'index.html');

// Helper to escape HTML characters
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Full SEO configuration for each tool route
const routes = [
  {
    path: '',
    title: 'Free Online Developer & Utility Tools Collection - tools.71anshuman.com',
    description: 'A comprehensive collection of 25+ free online tools for developers, designers, and professionals. QR code generator, formatters, minifiers, calculators, converters, and more. No signup required, 100% client-side and privacy-first.',
    keywords: 'online tools, developer tools, free tools, formatters, minifiers, calculators, converters, privacy tools'
  },
  {
    path: 'sip-calculator',
    title: 'Online SIP Calculator - Calculate Mutual Fund Investment Returns',
    description: 'Calculate your Mutual Fund SIP returns online with our free interactive SIP calculator. Visualize your wealth growth with interactive charts.',
    keywords: 'SIP calculator, mutual fund calculator, SIP returns, investment calculator'
  },
  {
    path: 'emi-calculator',
    title: 'Online Loan EMI Calculator - Calculate Home, Car, & Personal Loan EMI',
    description: 'Calculate monthly loan payments, total interest, and visualize the amortization schedule with our interactive EMI calculator.',
    keywords: 'EMI calculator, loan calculator, home loan EMI, car loan EMI'
  },
  {
    path: 'salary-hike-calculator',
    title: 'Salary Hike Percentage Calculator - Calculate Increment Percentage',
    description: 'Calculate your salary increment percentage or new salary after increment with our simple salary hike calculator.',
    keywords: 'salary hike calculator, increment calculator, salary percentage increase'
  },
  {
    path: 'json-formatter',
    title: 'Online JSON Formatter & Beautifier - Format, Validate & Clean JSON',
    description: 'Format, validate, beautify, and minify your JSON data in real-time. Clean structure, tree view display, and syntax checking.',
    keywords: 'JSON formatter, JSON beautifier, validate JSON, online JSON parser'
  },
  {
    path: 'csv-to-json-converter',
    title: 'Online CSV to JSON Converter - Convert CSV Tables to JSON Array',
    description: 'Convert CSV files or comma-separated values to JSON arrays instantly. Free online parser with copy-to-clipboard support.',
    keywords: 'CSV to JSON, convert CSV to JSON, CSV parser, Excel to JSON'
  },
  {
    path: 'css-minifier',
    title: 'Online CSS Minifier & Optimizer - Compress CSS Files',
    description: 'Minify and optimize your CSS stylesheet code online. Remove whitespaces, comments, and compress file size for faster page load.',
    keywords: 'CSS minifier, compress CSS, optimize CSS, CSS code compressor'
  },
  {
    path: 'js-minifier',
    title: 'Online JavaScript Minifier & Compressor - Optimize JS Code',
    description: 'Minify, compress, and obfuscate JavaScript code online. Improve website loading speed by reducing file sizes.',
    keywords: 'JS minifier, JavaScript minifier, compress JS, optimize JavaScript'
  },
  {
    path: 'regex-tester',
    title: 'Online Regex Tester & Debugger - Test Regular Expressions',
    description: 'Test and debug your regular expressions (regex) online with highlighting. Compatible with Javascript regular expressions.',
    keywords: 'regex tester, regular expression tester, debug regex, online regex editor'
  },
  {
    path: 'html-entity-encoder',
    title: 'HTML Entity Encoder & Decoder - Escape HTML Special Characters',
    description: 'Encode special characters to HTML entities or decode HTML-encoded strings. Safely escape code for markup.',
    keywords: 'HTML entity encoder, HTML escape, HTML unescape, HTML decoder'
  },
  {
    path: 'hash-generator',
    title: 'Online Hash Generator - MD5, SHA-256, SHA-512, SHA-3',
    description: 'Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512, SHA-3) from text. Secure client-side hashing.',
    keywords: 'hash generator, MD5 generator, SHA-256 generator, cryptographic hash'
  },
  {
    path: 'guid-generator',
    title: 'Online GUID / UUID Generator - Generate Random UUIDs',
    description: 'Generate random v4 GUIDs/UUIDs online. Bulk generate unique identifiers instantly. Privacy-first, client-side.',
    keywords: 'UUID generator, GUID generator, generate UUID online, unique ID generator'
  },
  {
    path: 'base-64-converter',
    title: 'Online Base64 Encoder & Decoder - Convert Text & Images',
    description: 'Encode text to Base64 format or decode Base64 strings back to text. Fast, secure, and running entirely in your browser.',
    keywords: 'Base64 encoder, Base64 decoder, Base64 converter, decode base64'
  },
  {
    path: 'url-encoder',
    title: 'Online URL Encoder & Decoder - Escape Query Parameters',
    description: 'Encode or decode URL query parameters, paths, and generate clean slugs. Safe URL escaping for web developers.',
    keywords: 'URL encoder, URL decoder, URL escape, URL encode online'
  },
  {
    path: 'password-generator',
    title: 'Online Password Generator - Generate Secure & Strong Passwords',
    description: 'Create custom, strong, and highly secure random passwords online. Customize length, numbers, symbols, and uppercase.',
    keywords: 'password generator, random password, secure password, strong password generator'
  },
  {
    path: 'word-counter',
    title: 'Online Word Counter - Count Words, Characters & Sentences',
    description: 'Count words, characters, sentences, paragraphs, and reading time in real-time. Perfect for bloggers, writers, and students.',
    keywords: 'word counter, character counter, online word count, word count tool'
  },
  {
    path: 'multi-line-to-single-line',
    title: 'Multi-line to Single-line Text Converter - Remove Newlines',
    description: 'Convert multi-line text blocks into a single line. Customize separator (comma, space, semicolons) and strip whitespaces.',
    keywords: 'remove newlines, multi line to single line, text joiner'
  },
  {
    path: 'text-case-converter',
    title: 'Online Text Case Converter - UPPERCASE, lowercase, camelCase',
    description: 'Convert text casing online into UPPERCASE, lowercase, camelCase, snake_case, PascalCase, title case, and more.',
    keywords: 'text case converter, camelcase converter, convert uppercase, text format'
  },
  {
    path: 'markdown-converter',
    title: 'Online Markdown to HTML Converter & Previewer',
    description: 'Write Markdown text and convert it to HTML in real-time. Clean live visual preview and copy-to-clipboard HTML output.',
    keywords: 'markdown to html, markdown previewer, markdown converter, markdown editor'
  },
  {
    path: 'lorem-generator',
    title: 'Lorem Ipsum Generator - Generate Custom Placeholder Text',
    description: 'Generate custom Lorem Ipsum placeholder paragraphs, sentences, words, or lists for your web design or mockups.',
    keywords: 'lorem ipsum generator, placeholder text, dummy text, lorem ipsum filler'
  },
  {
    path: 'ascii-art-generator',
    title: 'Online ASCII Art Generator - Convert Text to ASCII Font',
    description: 'Generate stylized ASCII art from text using standard, small, or block fonts. Copy ASCII font headers for code or terminal.',
    keywords: 'ASCII art generator, text to ASCII, ASCII font generator'
  },
  {
    path: 'color-picker',
    title: 'Online Color Picker & Palette Generator - HEX, RGB, HSL',
    description: 'Pick colors, generate harmonic palettes, convert between HEX, RGB, and HSL color values with our interactive designer tool.',
    keywords: 'color picker, palette generator, HEX to RGB, HSL converter'
  },
  {
    path: 'qr-code-generator',
    title: 'Online QR Code Generator - Generate QR Codes with Download',
    description: 'Generate high-quality custom QR codes online from URLs, text, or phone numbers. Customize color, size, and download as PNG.',
    keywords: 'QR code generator, generate QR code, download QR code, free QR generator'
  },
  {
    path: 'image-compressor',
    title: 'Online Image Compressor - Reduce Image File Size',
    description: 'Compress JPEG, PNG, and WebP images online without losing quality. Optimize images for fast website load times.',
    keywords: 'image compressor, compress image online, reduce png size, photo compressor'
  },
  {
    path: 'timestamp-converter',
    title: 'Online Unix Timestamp Converter - Epoch Date Conversion',
    description: 'Convert Unix epoch timestamps to human-readable date and time or vice versa. Real-time timestamp parser.',
    keywords: 'timestamp converter, epoch converter, unix timestamp, epoch date'
  },
  {
    path: 'ip-lookup',
    title: 'Online IP Lookup & Location Finder - Find My IP Info',
    description: 'Find your public IP address and query IP details like ISP, country, city, and geolocation information.',
    keywords: 'IP lookup, find my IP, IP location, IP details finder'
  },
  {
    path: 'unit-converter',
    title: 'Online Unit Converter - Length, Mass, Temp & Data',
    description: 'Convert values between different metric and imperial units of length, mass, temperature, and digital data.',
    keywords: 'unit converter, convert length, convert temp, metric converter'
  },
  {
    path: 'diff-viewer',
    title: 'Online Text Diff Viewer - Compare Code & Text Side-by-Side',
    description: 'Compare two text snippets side-by-side or inline to spot differences. Visual highlight of line insertions and deletions.',
    keywords: 'diff viewer, text compare, compare text, code diff online'
  },
  {
    path: 'jwt-decoder',
    title: 'Online JWT Decoder - Decode and Inspect JSON Web Tokens',
    description: 'Decode, parse, and verify JSON Web Tokens (JWT) online. Read header, payload claims, signature, and expiration times.',
    keywords: 'jwt decoder, decode jwt, jwt token parser, JSON web token'
  },
  {
    path: 'json-diff',
    title: 'Online JSON Diff Checker - Compare two JSON Objects',
    description: 'Find structural and text differences between two JSON objects online. Automatically parses, prettifies, and sorts keys before comparison.',
    keywords: 'json diff, compare json, json diff online, find differences in json'
  }
];

function run() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Build template not found at ${TEMPLATE_PATH}. Please run "npm run build" first.`);
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  console.log(`Generating static subfolders with custom SEO meta-tags...`);

  routes.forEach((route) => {
    let customHtml = baseHtml;

    // 1. Replace Title
    customHtml = customHtml.replace(
      /<title>.*?<\/title>/gis,
      `<title>${escapeHtml(route.title)}</title>`
    );

    // 2. Replace Description
    customHtml = customHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gis,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    );

    // 3. Replace Keywords
    customHtml = customHtml.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/gis,
      `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`
    );

    // 4. Replace Open Graph Tags
    customHtml = customHtml.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gis,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`
    );
    customHtml = customHtml.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gis,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`
    );
    customHtml = customHtml.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gis,
      `<meta property="og:url" content="https://tools.71anshuman.com${route.path ? '/' + route.path : ''}" />`
    );

    // 5. Replace Twitter Tags
    customHtml = customHtml.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gis,
      `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
    );
    customHtml = customHtml.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gis,
      `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
    );

    // Output Directory Setup
    if (route.path === '') {
      // For root route, overwrite main index.html
      fs.writeFileSync(TEMPLATE_PATH, customHtml, 'utf8');
      console.log(`Updated root metadata in build/index.html`);
    } else {
      // For sub-routes, create a directory and write index.html inside it
      const targetDir = path.join(BUILD_DIR, route.path);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const targetFilePath = path.join(targetDir, 'index.html');
      fs.writeFileSync(targetFilePath, customHtml, 'utf8');
      console.log(`Generated route SEO: build/${route.path}/index.html`);
    }
  });

  console.log('SEO Generation complete! Ready for deployment.');
}

run();
