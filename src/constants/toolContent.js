/**
 * Static, crawlable help content rendered under every tool by
 * src/components/common/ToolInfo.js (keyed by route path, without slashes).
 *
 * Each entry: { name, about, steps: [string], faqs: [{ q, a }] }
 * Keep each entry at roughly 180-250 words so every page clears the
 * "thin content" bar once combined with the tool UI itself.
 */
const TOOL_CONTENT = {
  'sip-calculator': {
    name: 'SIP Calculator',
    about:
      'A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund at regular intervals, usually monthly. This calculator projects how those contributions can grow over time using an expected annual return, so you can compare scenarios before committing money. It shows the total amount invested, the estimated gain, the maturity value, and a year-by-year breakdown with an interactive chart. Everything is computed in your browser; nothing you enter is sent to a server.',
    steps: [
      'Enter the monthly SIP amount you plan to invest.',
      'Set the expected annual return rate (for example 12% for an equity fund).',
      'Choose the investment duration in years and the results update instantly.',
      'Review the invested-versus-gain chart and the yearly amortization table to see how compounding builds up.'
    ],
    faqs: [
      {
        q: 'How is the SIP maturity value calculated?',
        a: 'It uses the standard future value of an annuity formula: each monthly instalment compounds at the monthly rate (annual rate divided by 12) for the number of months remaining until maturity.'
      },
      {
        q: 'Are returns guaranteed?',
        a: 'No. The return rate is an assumption. Actual mutual fund returns vary with the market, so treat the output as an estimate rather than a promise.'
      },
      {
        q: 'Does the calculator account for inflation or taxes?',
        a: 'Not directly. Use a lower expected return to approximate the effect of inflation, and remember that capital gains tax may apply when you redeem.'
      }
    ]
  },

  'emi-calculator': {
    name: 'EMI Calculator',
    about:
      'An Equated Monthly Instalment (EMI) is the fixed payment you make every month to repay a loan, covering both principal and interest. This EMI calculator works for home loans, car loans, personal loans and education loans. Enter the loan amount, interest rate and tenure to see your monthly payment, total interest payable and the overall cost of borrowing, along with charts that show how the balance between principal and interest shifts over the life of the loan.',
    steps: [
      'Enter the principal loan amount you intend to borrow.',
      'Set the annual interest rate quoted by your lender.',
      'Choose the loan tenure in months or years.',
      'Read the EMI, total interest and amortization schedule, and adjust the inputs to compare offers.'
    ],
    faqs: [
      {
        q: 'What formula does the EMI calculator use?',
        a: 'EMI = P × r × (1 + r)^n / ((1 + r)^n − 1), where P is the principal, r is the monthly interest rate and n is the number of monthly instalments.'
      },
      {
        q: 'Why is most of my early EMI going towards interest?',
        a: 'Interest is charged on the outstanding balance. Early on the balance is high, so the interest portion is large; as the principal reduces, more of each EMI goes towards repaying it.'
      },
      {
        q: 'Can I use this for a floating-rate loan?',
        a: 'Yes, as an estimate for the current rate. If the rate changes later, re-run the calculator with the new rate and the remaining tenure.'
      }
    ]
  },

  'salary-hike-calculator': {
    name: 'Salary Hike Calculator',
    about:
      'This salary hike calculator helps you understand an increment in both directions: find the percentage hike when you know your old and new salary, or find the new salary when you know the hike percentage. It is useful when evaluating an appraisal, comparing a job offer with your current pay, or planning what to ask for in a negotiation. You can also project future salary growth by applying the same percentage over several years.',
    steps: [
      'Enter your current (old) salary.',
      'Enter either the new salary or the hike percentage, depending on what you want to find.',
      'The calculator fills in the missing value and shows the absolute increase.',
      'Use the projection section to see what repeated annual hikes would add up to.'
    ],
    faqs: [
      {
        q: 'How is hike percentage calculated?',
        a: 'Hike % = (New salary − Old salary) ÷ Old salary × 100. For example, moving from 50,000 to 60,000 is a 20% hike.'
      },
      {
        q: 'Should I use gross or take-home salary?',
        a: 'Use the same basis for both values. Most offers are quoted as gross or cost-to-company, so comparing gross figures is usually the most accurate.'
      },
      {
        q: 'Is my data stored anywhere?',
        a: 'No. All calculations happen locally in your browser and nothing is uploaded.'
      }
    ]
  },

  'json-formatter': {
    name: 'JSON Formatter',
    about:
      'The JSON formatter turns compact or messy JSON into a clean, indented structure that is easy to read and debug. Paste any JSON payload, such as an API response, a configuration file or a log entry, and the tool validates it, reports syntax errors with their position, and pretty-prints it with consistent indentation. You can also minify formatted JSON back into a single line to save bandwidth or fit it into a request.',
    steps: [
      'Paste your JSON into the input area.',
      'Click Format to beautify it, or Minify to compress it.',
      'If the JSON is invalid, read the error message to locate the problem, such as a trailing comma or unquoted key.',
      'Copy the result to the clipboard with one click.'
    ],
    faqs: [
      {
        q: 'Why does my JSON fail validation?',
        a: 'Common causes are single quotes instead of double quotes, trailing commas, comments, or unquoted property names. JSON is stricter than JavaScript object syntax.'
      },
      {
        q: 'Is there a size limit?',
        a: 'The formatter runs in your browser, so very large documents (tens of megabytes) may be slow, but typical API responses format instantly.'
      },
      {
        q: 'Is my data sent to a server?',
        a: 'No. Parsing and formatting happen entirely on your device, which makes it safe for sensitive payloads.'
      }
    ]
  },

  'csv-to-json-converter': {
    name: 'CSV to JSON Converter',
    about:
      'Convert comma-separated values into JSON without writing a script. Paste CSV exported from Excel, Google Sheets or a database and the converter produces an array of objects, using the first row as keys, or an array of arrays if your data has no header row. It handles quoted fields, escaped quotes, alternative delimiters such as semicolons, tabs and pipes, and automatically converts numbers, booleans and null values to their JSON types.',
    steps: [
      'Paste or type your CSV data into the input box.',
      'Pick the delimiter used in your file and tick whether the first row contains headers.',
      'Choose the JSON indentation you prefer, or minified output.',
      'Copy the JSON or download it as a file; use preview mode to double-check the parsed table.'
    ],
    faqs: [
      {
        q: 'My columns are misaligned. What went wrong?',
        a: 'Usually the delimiter is wrong. Files from some regions use semicolons instead of commas. Switch the delimiter option and the columns should line up.'
      },
      {
        q: 'How are numbers and booleans handled?',
        a: 'Values that look like numbers become JSON numbers, "true" and "false" become booleans, and "null" becomes null. Everything else stays a string.'
      },
      {
        q: 'Can I convert a file with thousands of rows?',
        a: 'Yes. Conversion runs locally and handles large files well; only the preview is limited to the first rows.'
      }
    ]
  },

  'css-minifier': {
    name: 'CSS Minifier',
    about:
      'Minifying CSS removes comments, whitespace and redundant characters so your stylesheet downloads faster without changing how it renders. This tool compresses CSS in one click and shows how many bytes you saved. It can also do the reverse: beautify minified CSS back into readable, indented rules when you need to inspect or edit a production stylesheet. Processing happens in your browser, so proprietary styles never leave your machine.',
    steps: [
      'Paste your CSS into the input panel.',
      'Click Minify to compress it, or Beautify to expand minified CSS.',
      'Check the size comparison to see the reduction.',
      'Copy the output or download it as a .css file.'
    ],
    faqs: [
      {
        q: 'Will minification break my styles?',
        a: 'No. Only comments and unnecessary whitespace are removed; selectors, properties and values stay exactly the same.'
      },
      {
        q: 'How much smaller will my file get?',
        a: 'Typically 15–40%, depending on how much whitespace and commenting the original contains. Gzip on the server compresses it further.'
      },
      {
        q: 'Should I minify during build instead?',
        a: 'For production projects, yes; bundlers do this automatically. This tool is ideal for quick one-off tasks, snippets and legacy sites.'
      }
    ]
  },

  'js-minifier': {
    name: 'JavaScript Minifier',
    about:
      'The JavaScript minifier strips comments, line breaks and extra whitespace from your code to reduce its size for faster page loads. It is handy for small scripts, inline snippets, bookmarklets and legacy pages that do not go through a build pipeline. The same tool can beautify minified JavaScript so you can read third-party code or debug a production bundle. Everything runs locally in your browser.',
    steps: [
      'Paste the JavaScript you want to process.',
      'Click Minify to compress or Beautify to reformat.',
      'Review the size statistics and the output.',
      'Copy the result or download it as a .js file.'
    ],
    faqs: [
      {
        q: 'Does this rename variables or change logic?',
        a: 'No. It performs safe whitespace and comment removal only, so behaviour is unchanged. For aggressive mangling use a build tool such as Terser.'
      },
      {
        q: 'Can minification break code that relies on ASI?',
        a: 'Code that depends on automatic semicolon insertion can be fragile when line breaks are removed. Add explicit semicolons before minifying to be safe.'
      },
      {
        q: 'Is ES module and modern syntax supported?',
        a: 'Yes. Because the tool works on text rather than parsing a full AST, it handles any syntax, including ES2020+ features.'
      }
    ]
  },

  'regex-tester': {
    name: 'Regex Tester',
    about:
      'Write and test regular expressions against sample text and see matches highlighted in real time. The regex tester supports JavaScript regular-expression syntax with the global, case-insensitive, multiline and other flags, lists every match with its captured groups, and includes a library of common patterns such as emails, URLs, phone numbers and dates to start from. It is a quick way to debug a pattern before putting it into code.',
    steps: [
      'Type your regular expression in the pattern field.',
      'Toggle flags such as g (global), i (case-insensitive) or m (multiline).',
      'Paste the text you want to search in the test area.',
      'Inspect the highlighted matches and the group breakdown, then copy the final pattern.'
    ],
    faqs: [
      {
        q: 'Why does my pattern only find the first match?',
        a: 'Enable the g (global) flag. Without it, JavaScript regular expressions stop after the first match.'
      },
      {
        q: 'Does this use the same engine as my code?',
        a: 'It uses your browser\'s JavaScript engine, so results match Node.js and browser code. Other languages (Python, Java, PCRE) differ slightly in syntax.'
      },
      {
        q: 'How do I match across multiple lines?',
        a: 'Use the m flag so ^ and $ match at line boundaries, and the s flag if you want . to match newline characters.'
      }
    ]
  },

  'html-entity-encoder': {
    name: 'HTML Entity Encoder',
    about:
      'HTML entities let you display characters that would otherwise be interpreted as markup, such as <, >, & and quotes, or characters that are hard to type, like © and €. This tool encodes plain text into HTML entities and decodes entity-encoded strings back to readable text. It is useful when embedding code samples in a web page, sanitising user input for display, or reading escaped strings from an API or database.',
    steps: [
      'Paste the text or HTML you want to convert.',
      'Encode to turn special characters into entities, or Decode to turn entities back into characters.',
      'Use the reference table to look up a specific entity.',
      'Copy the result into your template or content.'
    ],
    faqs: [
      {
        q: 'What is the difference between named and numeric entities?',
        a: 'Named entities such as &amp; are readable; numeric entities such as &#38; or &#x26; work for any Unicode character even if no name exists.'
      },
      {
        q: 'Does encoding protect against XSS?',
        a: 'Encoding output for display is one important defence, because it stops injected markup from being executed. It should be combined with proper input validation.'
      },
      {
        q: 'Which characters must always be encoded in HTML?',
        a: 'At minimum &, < and > in text content, and additionally quotes inside attribute values.'
      }
    ]
  },

  'hash-generator': {
    name: 'Hash Generator',
    about:
      'Generate cryptographic hashes from text or files using MD5, SHA-1, SHA-256, SHA-512 and SHA-3. Hashes are fixed-length fingerprints: the same input always produces the same hash, while even a one-character change produces a completely different one. Use this tool to verify file downloads against a published checksum, create cache keys, compare data without exposing it, or simply learn how hashing works. Hashing runs in your browser, so files are never uploaded.',
    steps: [
      'Choose the hashing algorithm you need.',
      'Type or paste text, or select a file to hash.',
      'The digest appears instantly as a hexadecimal string.',
      'Copy the hash and compare it with the expected value.'
    ],
    faqs: [
      {
        q: 'Which algorithm should I use?',
        a: 'SHA-256 is the safe default for integrity checks. MD5 and SHA-1 are fast but no longer collision-resistant, so avoid them for security purposes.'
      },
      {
        q: 'Can a hash be reversed to get the original text?',
        a: 'No. Hash functions are one-way. Short or common inputs can be guessed via precomputed tables, which is why passwords should be salted and hashed with a slow algorithm.'
      },
      {
        q: 'Is hashing the same as encryption?',
        a: 'No. Encryption is reversible with a key; hashing is not reversible at all.'
      }
    ]
  },

  'guid-generator': {
    name: 'GUID / UUID Generator',
    about:
      'Generate random version 4 UUIDs (also called GUIDs) for database keys, API identifiers, test fixtures and configuration. A UUID is a 128-bit value written as 32 hexadecimal digits in the 8-4-4-4-12 pattern, and the chance of two random UUIDs colliding is effectively zero. This generator can create up to 100 IDs at once, with options for uppercase, hyphen removal and ready-to-paste formats for C#, JavaScript, braces, parentheses or quotes.',
    steps: [
      'Choose how many UUIDs you need (1–100).',
      'Pick an output format and whether to use uppercase or drop hyphens.',
      'Click Generate New GUIDs.',
      'Copy a single ID or copy all of them at once.'
    ],
    faqs: [
      {
        q: 'What does the 4 in a v4 UUID mean?',
        a: 'The third group always starts with 4, which marks the UUID as version 4, meaning it was generated from random numbers rather than a timestamp or name.'
      },
      {
        q: 'Are these UUIDs unique?',
        a: 'With 122 random bits, duplicates are astronomically unlikely, so they are safe to use as unique identifiers without a central registry.'
      },
      {
        q: 'Is a GUID the same as a UUID?',
        a: 'Yes. GUID is the term Microsoft uses; UUID is the RFC 4122 name. The format is identical.'
      }
    ]
  },

  'base-64-converter': {
    name: 'Base64 Converter',
    about:
      'Base64 encodes binary data as plain ASCII text so it can travel safely through systems that only handle text, such as email, JSON, URLs and HTML. This converter encodes any text to Base64 and decodes Base64 strings back to readable text, which is handy for inspecting authentication headers, data URIs, JWT segments, configuration secrets and API payloads. It works entirely in your browser.',
    steps: [
      'Paste the text or Base64 string into the input box.',
      'Click Encode to produce Base64, or Decode to read an encoded string.',
      'Check the output for correctness.',
      'Copy the result with one click.'
    ],
    faqs: [
      {
        q: 'Is Base64 encryption?',
        a: 'No. Base64 is an encoding, not encryption; anyone can decode it. Never rely on it to hide secrets.'
      },
      {
        q: 'Why is the encoded output longer than the input?',
        a: 'Base64 represents every 3 bytes as 4 characters, so output is about 33% larger, plus padding with = characters.'
      },
      {
        q: 'Does it support Unicode and emoji?',
        a: 'Yes. Text is converted to UTF-8 bytes before encoding, so any character is handled correctly.'
      }
    ]
  },

  'url-encoder': {
    name: 'URL Encoder / Decoder',
    about:
      'URLs can only contain a limited set of characters, so spaces, symbols and non-English letters must be percent-encoded, for example a space becomes %20. This tool encodes text for safe use in query strings and paths, and decodes encoded URLs back to readable form so you can see what parameters a link actually carries. It is a quick helper when building API requests, debugging redirects or sharing links.',
    steps: [
      'Paste a URL, query parameter or plain text.',
      'Click Encode to percent-encode it, or Decode to read an encoded URL.',
      'Compare the encoded and decoded panels.',
      'Copy the version you need.'
    ],
    faqs: [
      {
        q: 'What is the difference between encodeURI and encodeURIComponent?',
        a: 'encodeURIComponent encodes everything except letters, digits and a few marks, making it right for individual parameter values. encodeURI leaves characters like / ? & = intact, so it suits whole URLs.'
      },
      {
        q: 'Why does a + sometimes mean a space?',
        a: 'In HTML form submissions (application/x-www-form-urlencoded) spaces are sent as +. In the rest of a URL, a space should be %20.'
      },
      {
        q: 'Can I encode non-English text?',
        a: 'Yes. Characters are converted to UTF-8 and each byte is percent-encoded.'
      }
    ]
  },

  'password-generator': {
    name: 'Password Generator',
    about:
      'Create strong, random passwords that are resistant to guessing and brute-force attacks. Choose the length and which character sets to include: uppercase, lowercase, digits and symbols. Longer passwords with a mix of character types are exponentially harder to crack, and a unique password per site limits the damage of any single breach. Generation uses your browser\'s random number source and nothing is transmitted or stored.',
    steps: [
      'Set the desired password length (12 or more characters is recommended).',
      'Tick the character types you want to include.',
      'Click Generate to produce a new password.',
      'Copy it into your password manager.'
    ],
    faqs: [
      {
        q: 'How long should a password be?',
        a: 'At least 12 characters for everyday accounts and 16 or more for email, banking and admin access. Length matters more than complexity.'
      },
      {
        q: 'Are the generated passwords stored anywhere?',
        a: 'No. They exist only on your screen until you copy them. Reloading the page produces different ones.'
      },
      {
        q: 'Should I reuse a strong password across sites?',
        a: 'No. Use a different password for every account and store them in a password manager so you only have to remember one.'
      }
    ]
  },

  'word-counter': {
    name: 'Word Counter',
    about:
      'Count words, characters, sentences and paragraphs as you type or paste. The word counter is useful for essays and assignments with length limits, blog posts and SEO copy, social media captions with character caps, and any writing where you need to hit a target. Counts update live, so you can trim or expand your text and watch the numbers change. Your text stays in the browser and is never uploaded.',
    steps: [
      'Paste or type your text in the editor.',
      'Watch the word and character counts update in real time.',
      'Use the counts to meet a minimum or maximum length.',
      'Clear the box to start a new piece.'
    ],
    faqs: [
      {
        q: 'How is a word counted?',
        a: 'Any run of characters separated by whitespace counts as one word, which matches how most word processors count.'
      },
      {
        q: 'Do characters include spaces?',
        a: 'The character count includes spaces and punctuation, which is the convention used by platforms with character limits.'
      },
      {
        q: 'How long does it take to read my text?',
        a: 'Average reading speed is about 200–250 words per minute, so divide the word count by 225 for a rough estimate.'
      }
    ]
  },

  'multi-line-to-single-line': {
    name: 'Multi-line to Single-line Converter',
    about:
      'Join text spread across many lines into one continuous line. This is useful for turning a column of values into a comma-separated list for a SQL IN clause or a spreadsheet formula, flattening a multi-line log message, preparing a one-line command, or cleaning text copied from a PDF where every line ends with a hard break. Choose the separator and whether to trim extra spaces.',
    steps: [
      'Paste the multi-line text into the input area.',
      'Choose a separator such as a comma, space or semicolon.',
      'Optionally strip leading and trailing whitespace from each line.',
      'Copy the single-line result.'
    ],
    faqs: [
      {
        q: 'Can I wrap each item in quotes?',
        a: 'Add the quotes before joining, or use the comma separator and then find-and-replace in your editor. This keeps the tool simple and predictable.'
      },
      {
        q: 'What happens to empty lines?',
        a: 'Empty lines are skipped so you do not get double separators in the output.'
      },
      {
        q: 'Is there a limit on the number of lines?',
        a: 'No practical limit; the conversion runs locally and handles thousands of lines instantly.'
      }
    ]
  },

  'text-case-converter': {
    name: 'Text Case Converter',
    about:
      'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case and kebab-case in one click. Developers use it to rename variables and keys consistently, writers use it to fix headlines and shouting text, and anyone can use it to clean up copied content. All conversions happen instantly in your browser with no sign-up.',
    steps: [
      'Paste the text you want to convert.',
      'Pick the target case from the list of options.',
      'Review the converted output.',
      'Copy it to the clipboard.'
    ],
    faqs: [
      {
        q: 'What is the difference between camelCase and PascalCase?',
        a: 'camelCase starts with a lowercase letter (userName); PascalCase starts with an uppercase letter (UserName). Both remove spaces between words.'
      },
      {
        q: 'How does Title Case treat small words?',
        a: 'Every word is capitalised for simplicity. Edit minor words such as "and" or "of" manually if your style guide requires it.'
      },
      {
        q: 'Does it handle accented characters?',
        a: 'Yes. Case conversion uses Unicode-aware rules, so é becomes É and vice versa.'
      }
    ]
  },

  'markdown-converter': {
    name: 'Markdown to HTML Converter',
    about:
      'Write Markdown and get clean HTML, with a live preview of how it renders. Markdown is a lightweight way to format text using plain characters: # for headings, ** for bold, - for lists, and so on. This converter supports headings, emphasis, strikethrough, inline code and code blocks, links, images, blockquotes, lists, horizontal rules and simple tables. It is ideal for drafting README files, blog posts and documentation.',
    steps: [
      'Type or paste Markdown in the left panel, or load the example.',
      'Watch the HTML output or the rendered preview on the right.',
      'Toggle between HTML source and preview mode.',
      'Copy the HTML into your CMS or template.'
    ],
    faqs: [
      {
        q: 'Which Markdown flavour is supported?',
        a: 'The core syntax common to CommonMark and GitHub Flavored Markdown. Advanced extensions such as footnotes or task lists are not supported.'
      },
      {
        q: 'Can I paste raw HTML inside Markdown?',
        a: 'Yes. HTML passes through unchanged, which is useful for elements Markdown cannot express.'
      },
      {
        q: 'Why does my list look wrong?',
        a: 'Make sure each list item starts at the beginning of a line with -, * or a number followed by a period and a space.'
      }
    ]
  },

  'lorem-generator': {
    name: 'Lorem Ipsum Generator',
    about:
      'Lorem ipsum is scrambled Latin used as placeholder text in design mockups so that layouts can be judged without being distracted by real content. This generator produces any number of paragraphs, sentences or words on demand, optionally wrapped in HTML tags so you can drop it straight into a template. It is a staple for web designers, front-end developers and anyone preparing a wireframe or print layout.',
    steps: [
      'Choose whether you want paragraphs, sentences or words.',
      'Set how many you need.',
      'Optionally enable HTML output with paragraph tags.',
      'Generate and copy the text.'
    ],
    faqs: [
      {
        q: 'Where does lorem ipsum come from?',
        a: 'It is derived from a passage of Cicero\'s De Finibus Bonorum et Malorum written in 45 BC, altered so that it no longer reads as proper Latin.'
      },
      {
        q: 'Why not use real text for mockups?',
        a: 'Placeholder text keeps reviewers focused on layout, typography and spacing instead of the wording, and it avoids copyright concerns.'
      },
      {
        q: 'Can I generate a specific word count?',
        a: 'Yes. Select the words option and enter the exact number you need.'
      }
    ]
  },

  'ascii-art-generator': {
    name: 'ASCII Art Generator',
    about:
      'Turn short text into large block-letter ASCII art for terminal banners, code comments, README headers, Discord messages and retro-style graphics. Choose from standard, small and block fonts and the preview updates as you type. Because the output is plain text, it displays anywhere a monospace font is available, from a shell prompt to a plain-text email.',
    steps: [
      'Enter up to 20 letters, numbers or spaces.',
      'Pick a font style from the dropdown.',
      'Preview the result in the dark output panel.',
      'Copy the ASCII art and paste it where you need it.'
    ],
    faqs: [
      {
        q: 'Why does the art look broken after pasting?',
        a: 'It must be displayed in a monospace font. Proportional fonts change character widths and misalign the rows.'
      },
      {
        q: 'Can I use lowercase letters and punctuation?',
        a: 'Letters are converted to uppercase automatically. Only letters, digits and spaces are supported in the built-in fonts.'
      },
      {
        q: 'How do I add it to a script banner?',
        a: 'Paste it inside a comment block or a heredoc, keeping every line\'s leading spaces intact.'
      }
    ]
  },

  'color-picker': {
    name: 'Color Picker & Palette Generator',
    about:
      'Pick any colour and instantly see it in HEX, RGB and HSL, generate harmonious palettes (complementary, analogous, triadic and more), and check text contrast against light and dark backgrounds for accessibility. Designers use it to build brand palettes, developers use it to convert between formats for CSS, and both can verify that colour combinations meet WCAG contrast guidelines before shipping.',
    steps: [
      'Use the picker or type a HEX value to choose a base colour.',
      'Read the equivalent RGB and HSL values and copy the one you need.',
      'Explore the generated palette variations.',
      'Check the contrast ratios to make sure text stays readable.'
    ],
    faqs: [
      {
        q: 'What contrast ratio do I need for accessibility?',
        a: 'WCAG AA requires at least 4.5:1 for normal text and 3:1 for large text; AAA raises that to 7:1 and 4.5:1 respectively.'
      },
      {
        q: 'When should I use HSL instead of HEX?',
        a: 'HSL makes it easy to create lighter, darker or less saturated variants of a colour by adjusting one number, which is ideal for theming.'
      },
      {
        q: 'What is a complementary colour?',
        a: 'The colour directly opposite on the colour wheel (180° apart in hue). Complementary pairs give strong contrast and are good for accents.'
      }
    ]
  },

  'qr-code-generator': {
    name: 'QR Code Generator',
    about:
      'Generate a QR code from any URL, text, phone number, email address or Wi-Fi details and download it as an image. QR codes let people open a link or save information by pointing a phone camera at it, which makes them useful on posters, menus, business cards, product packaging and presentation slides. The code is rendered in your browser and never uploaded.',
    steps: [
      'Enter the URL or text you want to encode.',
      'Adjust size and colours if needed.',
      'Scan the preview with your phone to test it.',
      'Download the PNG and place it in your design.'
    ],
    faqs: [
      {
        q: 'Do QR codes expire?',
        a: 'No. A static QR code encodes the data directly and works forever, as long as the URL it points to stays live.'
      },
      {
        q: 'How much data can a QR code hold?',
        a: 'Up to a few thousand characters, but shorter content produces a simpler code that scans more reliably from a distance.'
      },
      {
        q: 'Can I change the colours?',
        a: 'Yes, but keep strong contrast between the modules and the background, and avoid inverting (light on dark) for best scanner compatibility.'
      }
    ]
  },

  'image-compressor': {
    name: 'Image Compressor',
    about:
      'Reduce the file size of JPEG, PNG and WebP images directly in your browser, without uploading them to a server. Smaller images load faster, improve Core Web Vitals and save bandwidth on mobile. Adjust the quality level to balance size against visual fidelity, optionally resize the dimensions, and convert between formats. Your photos never leave your device, which makes this safe for private or client images.',
    steps: [
      'Drop an image onto the upload area or click to select one.',
      'Choose the output format and quality level.',
      'Compare the original and compressed sizes.',
      'Download the optimised image.'
    ],
    faqs: [
      {
        q: 'Which format should I choose?',
        a: 'WebP usually gives the smallest files with good quality. Use JPEG for photos when WebP is not supported, and PNG when you need transparency or crisp line art.'
      },
      {
        q: 'Will compression make my image blurry?',
        a: 'At quality 75–85 the difference is rarely visible. Go lower only for thumbnails or when size matters more than detail.'
      },
      {
        q: 'Is there a file size limit?',
        a: 'Processing happens in the browser, so very large images depend on your device memory, but typical photos of several megabytes work fine.'
      }
    ]
  },

  'timestamp-converter': {
    name: 'Timestamp Converter',
    about:
      'Convert Unix timestamps (seconds or milliseconds since 1 January 1970 UTC) into human-readable dates and back again. Timestamps appear everywhere in logs, databases, APIs and JWT tokens, and this converter makes them readable in both UTC and your local time zone. You can also see the current timestamp ticking live, which is handy when writing tests or checking token expiry.',
    steps: [
      'Paste a Unix timestamp to see the corresponding date and time.',
      'Or pick a date and time to get its timestamp.',
      'Switch between seconds and milliseconds as needed.',
      'Copy the value you need.'
    ],
    faqs: [
      {
        q: 'Seconds or milliseconds: how do I tell?',
        a: 'A 10-digit number is seconds; a 13-digit number is milliseconds. JavaScript uses milliseconds, most Unix tools use seconds.'
      },
      {
        q: 'Why does the converted date differ from what I expected?',
        a: 'Timestamps are always UTC. The displayed local time depends on your browser\'s time zone, so compare the UTC value when in doubt.'
      },
      {
        q: 'What is the year 2038 problem?',
        a: 'Systems that store timestamps as signed 32-bit integers overflow on 19 January 2038. Modern systems use 64-bit values and are unaffected.'
      }
    ]
  },

  'ip-lookup': {
    name: 'IP Lookup',
    about:
      'Find your public IP address and look up details about any IPv4 or IPv6 address, including the country, region, city, approximate coordinates, time zone, ISP and autonomous system. IP lookup is useful for troubleshooting connectivity, checking where a server is hosted, investigating suspicious log entries and verifying that a VPN is working. Location data comes from a public geolocation service and is approximate.',
    steps: [
      'Click Lookup My IP to inspect your own connection.',
      'Or enter any IP address and press Lookup.',
      'Read the location and network details.',
      'Open the coordinates on a map if you need a visual.'
    ],
    faqs: [
      {
        q: 'How accurate is IP geolocation?',
        a: 'Country is usually right; city-level accuracy varies and can be off by tens of kilometres, since it reflects the ISP\'s routing rather than your exact position.'
      },
      {
        q: 'Why does a private IP return no data?',
        a: 'Addresses such as 192.168.x.x or 10.x.x.x are reserved for local networks and have no public location.'
      },
      {
        q: 'Can someone find my home address from my IP?',
        a: 'Not from geolocation alone. It reveals a general area and your ISP, not a street address.'
      }
    ]
  },

  'unit-converter': {
    name: 'Unit Converter',
    about:
      'Convert between metric and imperial units of length, weight and temperature instantly. Switch metres to feet, kilometres to miles, kilograms to pounds, or Celsius to Fahrenheit and Kelvin without memorising conversion factors. Results update as you type, and the swap button reverses the direction of conversion in one click. It is handy for travel, cooking, fitness tracking, engineering homework and international shipping.',
    steps: [
      'Select a category: length, weight or temperature.',
      'Choose the unit you are converting from and the unit you want.',
      'Enter a value and read the converted result.',
      'Use the swap button to convert in the other direction.'
    ],
    faqs: [
      {
        q: 'How many feet are in a metre?',
        a: 'One metre equals 3.28084 feet, and one foot equals exactly 0.3048 metres.'
      },
      {
        q: 'How do I convert Celsius to Fahrenheit?',
        a: 'Multiply by 9/5 and add 32. For example, 25 °C is 77 °F. Kelvin is Celsius plus 273.15.'
      },
      {
        q: 'How precise are the results?',
        a: 'Results are shown to six decimal places with trailing zeros removed, which is more than enough for everyday and most technical use.'
      }
    ]
  },

  'diff-viewer': {
    name: 'Text Diff Viewer',
    about:
      'Compare two blocks of text or code and see exactly what changed, with insertions and deletions highlighted line by line. The diff viewer is useful for reviewing edits to a document, comparing two versions of a configuration file, checking what a colleague changed in a snippet, or verifying that generated output matches an expected result. Comparison runs locally in your browser.',
    steps: [
      'Paste the original text in the left panel.',
      'Paste the modified text in the right panel.',
      'Choose side-by-side or inline view.',
      'Review the highlighted additions and removals.'
    ],
    faqs: [
      {
        q: 'Does it ignore whitespace differences?',
        a: 'Whitespace changes are shown, because they matter in code and in some data formats. Normalise indentation first if you want to ignore them.'
      },
      {
        q: 'Can I compare very long files?',
        a: 'Yes, though extremely large inputs may take a moment. Typical source files and documents compare instantly.'
      },
      {
        q: 'Is this the same as git diff?',
        a: 'It works on the same principle, finding the minimal set of line changes, but it does not need a repository and works on any pasted text.'
      }
    ]
  },

  'jwt-decoder': {
    name: 'JWT Decoder',
    about:
      'Decode a JSON Web Token to inspect its header, payload claims and signature without sending it anywhere. JWTs are used for authentication and authorisation in web APIs, and being able to read the issuer, subject, audience, issued-at and expiry claims makes debugging login problems much faster. The decoder also tells you whether the token has expired based on the exp claim.',
    steps: [
      'Paste the full token (three dot-separated Base64url parts).',
      'Read the decoded header and payload as formatted JSON.',
      'Check the expiry status and timestamps.',
      'Copy any claim you need.'
    ],
    faqs: [
      {
        q: 'Is it safe to paste my token here?',
        a: 'Decoding happens entirely in your browser and nothing is transmitted. Still, treat production tokens as secrets and avoid sharing them.'
      },
      {
        q: 'Does decoding verify the signature?',
        a: 'No. Verification requires the signing secret or public key. This tool only decodes the content so you can read it.'
      },
      {
        q: 'Why can anyone read my token\'s payload?',
        a: 'JWT payloads are Base64url-encoded, not encrypted. Never put sensitive data in a JWT unless you also encrypt it (JWE).'
      }
    ]
  },

  'json-diff': {
    name: 'JSON Diff Checker',
    about:
      'Compare two JSON documents and find the structural differences between them, ignoring formatting and key order. The checker parses both inputs, prettifies and sorts keys, then highlights added, removed and changed values. It is ideal for comparing API responses between environments, reviewing configuration changes, validating migrations, or checking what a deployment altered in a settings file.',
    steps: [
      'Paste the first JSON document on the left.',
      'Paste the second JSON document on the right.',
      'Run the comparison.',
      'Review the highlighted differences line by line.'
    ],
    faqs: [
      {
        q: 'Does key order matter?',
        a: 'No. Keys are sorted before comparison, so {"a":1,"b":2} and {"b":2,"a":1} are reported as identical.'
      },
      {
        q: 'What if one input is not valid JSON?',
        a: 'You will see a parse error indicating which side failed. Fix the syntax, for example a trailing comma, and run the comparison again.'
      },
      {
        q: 'Can I compare arrays?',
        a: 'Yes. Array elements are compared by position, so a reordered array shows as changed.'
      }
    ]
  }
};

export default TOOL_CONTENT;
