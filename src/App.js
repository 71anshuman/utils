import Header from './components/Header';
import {Switch, Route} from 'react-router-dom';
import SipCalculator from './components/sip-calculator'
import MultiLineToSingleLine from './components/multi-line-to-single-line';
import SalaryHikePerCalculator from './components/salary-hike-percentage-calculator';
import PasswordGenerator from './components/password-generator';
import WordCounter from "./components/words-counter";

function App() {
  return (
    <>
    <Header />
    <div className="container-fluid">
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
    </Switch>
    </div>
    </>
  );
}

export default App;
