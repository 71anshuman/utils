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

function App() {
  const [showSidebar, setShowSidebar] = useState(() => {
    const saved = localStorage.getItem('devutils_show_sidebar');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('devutils_theme');
    if (saved) return saved;
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Starred / Favorites State
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('devutils_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

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
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('devutils_show_sidebar', JSON.stringify(showSidebar));
  }, [showSidebar]);

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
          </div>
    </div>
    </>
  );
}

export default App;
