import {useState} from 'react'
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

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <>
    <Header sidebar={{setShowSidebar: setShowSidebar, showSidebar: showSidebar}} />
    <div className="container-fluid">
      <div className="row">
        {showSidebar &&
          <Sidebar sidebar={{setShowSidebar: setShowSidebar, showSidebar: showSidebar}}/>
        }
        <div className={`${showSidebar ? 'col-10 offset-md-2 ': 'col-12'}`}>
          <Switch>
            <Route exact path="/">
              <SipCalculator />
            </Route>
            <Route path="/sip-calculator">
              <SipCalculator />
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
              <EMICalculator />
            </Route>
          </Switch>
          </div>
      </div>
    </div>
    </>
  );
}

export default App;
