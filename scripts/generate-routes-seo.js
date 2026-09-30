/**
 * Post-build step: pre-render every route and inject per-route SEO metadata.
 *
 * For each route this script:
 *   1. Loads the built app in headless Chrome (puppeteer) and captures the
 *      rendered `#root` markup, so crawlers get real content (H1, text,
 *      internal links) instead of an empty <div id="root"></div>.
 *   2. Writes build/<route>/index.html with that markup plus route-specific
 *      <title>, meta description/keywords, Open Graph, Twitter and canonical tags.
 *   3. Regenerates build/sitemap.xml from the same route list.
 *
 * The client (src/index.js) hydrates the pre-rendered markup instead of
 * re-rendering, so the initial app state must be deterministic — see the
 * note in src/App.js.
 *
 * Usage: runs automatically via the "postbuild" npm script.
 *        Set PRERENDER=0 to skip the browser step (metadata only).
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const TEMPLATE_PATH = path.join(BUILD_DIR, 'index.html');
const SITE_URL = 'https://tools.71anshuman.com';

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

// Full SEO configuration for each tool route.
// Keep titles <= 60 chars and descriptions <= 160 chars (search snippet limits).
const routes = [
  {
    path: '',
    title: 'Free Online Developer & Utility Tools - DevUtils',
    description: '25+ free online tools for developers: QR code generator, JSON formatter, minifiers, SIP & EMI calculators, converters and more. No signup, 100% client-side.',
    keywords: 'online tools, developer tools, free tools, formatters, minifiers, calculators, converters, privacy tools'
  },
  {
    path: 'sip-calculator',
    title: 'SIP Calculator - Mutual Fund Investment Returns Online',
    description: 'Calculate your Mutual Fund SIP returns online with our free interactive SIP calculator. Visualize your wealth growth with interactive charts.',
    keywords: 'SIP calculator, mutual fund calculator, SIP returns, investment calculator'
  },
  {
    path: 'emi-calculator',
    title: 'EMI Calculator - Home, Car & Personal Loan EMI Online',
    description: 'Calculate monthly loan payments, total interest, and visualize the amortization schedule with our interactive EMI calculator.',
    keywords: 'EMI calculator, loan calculator, home loan EMI, car loan EMI'
  },
  {
    path: 'salary-hike-calculator',
    title: 'Salary Hike Percentage Calculator - Increment Calculator',
    description: 'Calculate your salary increment percentage or new salary after increment with our simple salary hike calculator.',
    keywords: 'salary hike calculator, increment calculator, salary percentage increase'
  },
  {
    path: 'json-formatter',
    title: 'JSON Formatter & Beautifier - Format & Validate JSON',
    description: 'Format, validate, beautify, and minify your JSON data in real-time. Clean structure, tree view display, and syntax checking.',
    keywords: 'JSON formatter, JSON beautifier, validate JSON, online JSON parser'
  },
  {
    path: 'csv-to-json-converter',
    title: 'CSV to JSON Converter - Convert CSV to JSON Array Online',
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
    title: 'HTML Entity Encoder & Decoder - Escape HTML Characters',
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
    title: 'Password Generator - Create Strong & Secure Passwords',
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

function routeUrl(route) {
  return `${SITE_URL}/${route.path ? route.path + '/' : ''}`;
}

function validateRoutes() {
  const problems = [];
  routes.forEach((r) => {
    if (r.title.length > 60) problems.push(`title too long (${r.title.length}): /${r.path}`);
    if (r.description.length > 160) problems.push(`description too long (${r.description.length}): /${r.path}`);
  });
  if (problems.length) {
    console.warn('SEO metadata warnings:\n  ' + problems.join('\n  '));
  }
}

function applyMeta(baseHtml, route) {
  let html = baseHtml;
  const url = routeUrl(route);

  html = html.replace(/<title>.*?<\/title>/gis, `<title>${escapeHtml(route.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gis,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/gis,
    `<meta name="keywords" content="${escapeHtml(route.keywords)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gis,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gis,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gis,
    `<meta property="og:url" content="${url}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/gis,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/gis,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );

  // Canonical: replace if present in template, otherwise insert before </head>
  const canonical = `<link rel="canonical" href="${url}" />`;
  if (/<link\s+rel="canonical"[^>]*>/i.test(html)) {
    html = html.replace(/<link\s+rel="canonical"[^>]*>/i, canonical);
  } else {
    html = html.replace('</head>', `${canonical}</head>`);
  }
  return html;
}

function injectRoot(html, rootHtml) {
  if (!rootHtml) return html;
  return html.replace(/<div id="root"><\/div>/, () => `<div id="root">${rootHtml}</div>`);
}

function writeRoute(route, html) {
  if (route.path === '') {
    fs.writeFileSync(TEMPLATE_PATH, html, 'utf8');
    console.log('Wrote build/index.html');
  } else {
    const targetDir = path.join(BUILD_DIR, route.path);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
    console.log(`Wrote build/${route.path}/index.html`);
  }
}

function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = routes
    .map((r) => {
      const priority = r.path === '' ? '1.0' : '0.8';
      return `  <url>\n    <loc>${routeUrl(r)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log(`Wrote build/sitemap.xml (${routes.length} URLs)`);
}

// --- Static server with SPA fallback, used only during pre-rendering ---
function startServer() {
  const handler = require('serve-handler');
  const server = http.createServer((req, res) =>
    handler(req, res, {
      public: BUILD_DIR,
      cleanUrls: false,
      rewrites: [{ source: '**', destination: '/index.html' }]
    })
  );
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

async function prerenderAll() {
  const puppeteer = require('puppeteer');
  const { server, port } = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const results = {};
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });
    // Prefer light theme to match the deterministic initial React state.
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
    for (const route of routes) {
      const url = `http://127.0.0.1:${port}/${route.path}`;
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
      await page.waitForSelector('#root h1', { timeout: 15000 }).catch(() => {
        console.warn(`  (no <h1> found on /${route.path})`);
      });
      const rootHtml = await page.evaluate(() => {
        const root = document.getElementById('root');
        // Never ship scripts inside the pre-rendered markup
        root.querySelectorAll('script').forEach((s) => s.remove());
        // Google Charts draws into its container after mount; ship the empty
        // container only, so hydration matches what React renders.
        root.querySelectorAll('[id^="reactgooglegraph"]').forEach((el) => { el.innerHTML = ''; });
        return root.innerHTML;
      });
      results[route.path] = rootHtml;
      console.log(`Pre-rendered /${route.path} (${rootHtml.length} bytes)`);
    }
  } finally {
    await browser.close();
    server.close();
  }
  return results;
}

async function run() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`Build template not found at ${TEMPLATE_PATH}. Please run "npm run build" first.`);
    process.exit(1);
  }

  validateRoutes();

  // Read the pristine CRA template BEFORE we overwrite build/index.html.
  const baseHtml = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  let rendered = {};
  if (process.env.PRERENDER !== '0') {
    console.log('Pre-rendering routes in headless Chrome...');
    rendered = await prerenderAll();
  } else {
    console.log('PRERENDER=0 set: skipping pre-render, writing metadata only.');
  }

  console.log('Writing route HTML with SEO metadata...');
  routes.forEach((route) => {
    const html = injectRoot(applyMeta(baseHtml, route), rendered[route.path]);
    writeRoute(route, html);
  });

  writeSitemap();
  console.log('SEO generation complete! Ready for deployment.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
