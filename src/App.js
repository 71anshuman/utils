import Header from './components/Header';
import {Switch, Route} from 'react-router-dom';
import SipCalculator from './components/sip-calculator'
import MultiLineToSingleLine from './components/multi-line-to-single-line';

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
    </Switch>
    </div>
    </>
  );
}

export default App;
