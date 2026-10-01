import {useState, useEffect} from 'react'
import Header from './components/header/Header';
import {Switch, Route} from 'react-router-dom';
import SipCalculator from './components/sip-calculator'
import MultiLineToSingleLine from './components/multi-line-to-single-line';
import SalaryHikePerCalculator from './components/salary-hike-percentage-calculator';
import PasswordGenerator from './components/password-generator';
import WordCounter from "./components/words-counter";
import JsonFormatter from './components/json-formatter';
import Base64Converter from './components/base64-converter/Base64Converter';
import EMICalculator from './components/emi-calculator';
import Sidebar from './components/sidebar';
import QrCodeGenerator from './components/qr-code-generator';
import ColorPicker from './components/color-picker';
import TextCaseConverter from './components/text-case-converter';
import UrlEncoder from './components/url-encoder';
import HashGenerator from './components/hash-generator';
import TimestampConverter from './components/timestamp-converter';
import LoremGenerator from './components/lorem-generator';
import RegexTester from './components/regex-tester';

// New tools
import AsciiArtGenerator from './components/ascii-art-generator';
import CssMinifier from './components/css-minifier';
import CsvToJsonConverter from './components/csv-to-json-converter';
import GuidGenerator from './components/guid-generator';
import HtmlEntityEncoder from './components/html-entity-encoder';
import ImageCompressor from './components/image-compressor';
import IpLookup from './components/ip-lookup';
import JsMinifier from './components/js-minifier';
import MarkdownConverter from './components/markdown-converter';
import UnitConverter from './components/unit-converter';

// Redesign & Additions
import Dashboard from './components/dashboard';
import DiffViewer from './components/diff-viewer';
import JwtDecoder from './components/jwt-decoder';
import JsonDiff from './components/json-diff';
import ToolInfo from './components/common/ToolInfo';

function App() {
  // NOTE: Initial state is deliberately deterministic (sidebar open, light theme)
  // so it matches the pre-rendered HTML produced at build time (see
  // scripts/generate-routes-seo.js). The user's saved preferences are applied
  // in an effect right after hydration. The inline script in public/index.html
  // already sets `data-theme` on <html> before first paint, so there is no
  // visible flash of the wrong theme.
  const [showSidebar, setShowSidebar] = useState(true);
  const [theme, setTheme] = useState('light');
  const [favorites, setFavorites] = useState([]);
  const [prefsLoaded, setPrefsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedSidebar = localStorage.getItem('devutils_show_sidebar');
      if (savedSidebar !== null) setShowSidebar(JSON.parse(savedSidebar));
    } catch (e) { /* ignore */ }

    try {
      const savedTheme = localStorage.getItem('devutils_theme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    } catch (e) { /* ignore */ }

    try {
      const savedFavorites = localStorage.getItem('devutils_favorites');
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    } catch (e) { /* ignore */ }

    setPrefsLoaded(true);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('devutils_theme', nextTheme);
      return nextTheme;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
      localStorage.setItem('devutils_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (!prefsLoaded) return; // inline script in index.html already set it for first paint
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, prefsLoaded]);

  useEffect(() => {
    if (!prefsLoaded) return; // don't persist the default before prefs are read
    localStorage.setItem('devutils_show_sidebar', JSON.stringify(showSidebar));
  }, [showSidebar, prefsLoaded]);

  return (
    <>
    <Header sidebar={{setShowSidebar: setShowSidebar, showSidebar: showSidebar}} theme={theme} toggleTheme={toggleTheme} />
    <div className="container-fluid px-0">
      {showSidebar &&
        <Sidebar 
          sidebar={{setShowSidebar: setShowSidebar, showSidebar: showSidebar}}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />
      }
      <div className={`main-content ${showSidebar ? 'sidebar-open' : 'sidebar-closed'} py-4`}>
          <Switch>
            <Route exact path="/">
              <Dashboard favorites={favorites} toggleFavorite={toggleFavorite} />
            </Route>
            <Route path="/sip-calculator">
              <SipCalculator theme={theme} />
            </Route>
            <Route path="/multi-line-to-single-line">
              <MultiLineToSingleLine />
            </Route>
            <Route path="/salary-hike-calculator">
              <SalaryHikePerCalculator />
            </Route>
            <Route path="/password-generator">
              <PasswordGenerator />
            </Route>
            <Route path="/word-counter">
              <WordCounter />
            </Route>
            <Route path="/json-formatter">
              <JsonFormatter />
            </Route>
            <Route path="/base-64-converter">
              <Base64Converter />
            </Route>
            <Route path="/emi-calculator">
              <EMICalculator theme={theme} />
            </Route>
            <Route path="/qr-code-generator">
              <QrCodeGenerator />
            </Route>
            <Route path="/color-picker">
              <ColorPicker />
            </Route>
            <Route path="/text-case-converter">
              <TextCaseConverter />
            </Route>
            <Route path="/url-encoder">
              <UrlEncoder />
            </Route>
            <Route path="/hash-generator">
              <HashGenerator />
            </Route>
            <Route path="/timestamp-converter">
              <TimestampConverter />
            </Route>
            <Route path="/lorem-generator">
              <LoremGenerator />
            </Route>
            <Route path="/regex-tester">
              <RegexTester />
            </Route>
            <Route path="/ascii-art-generator">
              <AsciiArtGenerator />
            </Route>
            <Route path="/css-minifier">
              <CssMinifier />
            </Route>
            <Route path="/csv-to-json-converter">
              <CsvToJsonConverter />
            </Route>
            <Route path="/guid-generator">
              <GuidGenerator />
            </Route>
            <Route path="/html-entity-encoder">
              <HtmlEntityEncoder />
            </Route>
            <Route path="/image-compressor">
              <ImageCompressor />
            </Route>
            <Route path="/ip-lookup">
              <IpLookup />
            </Route>
            <Route path="/js-minifier">
              <JsMinifier />
            </Route>
            <Route path="/markdown-converter">
              <MarkdownConverter />
            </Route>
            <Route path="/unit-converter">
              <UnitConverter />
            </Route>
            <Route path="/diff-viewer">
              <DiffViewer />
            </Route>
            <Route path="/jwt-decoder">
              <JwtDecoder />
            </Route>
            <Route path="/json-diff">
              <JsonDiff />
            </Route>
          </Switch>
          <ToolInfo />
          </div>
    </div>
    </>
  );
}

export default App;
