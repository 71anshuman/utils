import Header from './components/Header';
import {Switch, Route} from 'react-router-dom';
import SipCalculator from './components/sip-calculator/SipCalculator'

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
    </Switch>
    </div>
    </>
  );
}

export default App;
