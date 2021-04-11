import { useState } from 'react';
import { Finance } from 'financejs';

import Header from './components/Header';
import Breakup from './components/Breakup';

let finance = new Finance();

function App() {
  const [sipAmount, setSipAmount] = useState();
  const [period, setPeriod] = useState();
  const [rateOfReturn, setRateOfReturn] = useState();
  const [meta, setMeta] = useState({});
  const [data, setData] = useState([]);

  function calculate() {
    let investmentAmount = 0;
    let interest = 0;
    let balanceAtEndOfMonth = 0;
    let transactions = [];

    for (var i = 1 ; i <= period * 12; i++) {
      const totalAmountThisMonth = investmentAmount + sipAmount;
      balanceAtEndOfMonth = totalAmountThisMonth * (1 + (rateOfReturn/100) / 12);
      const thisMonthInterest = Math.round(finance.CI(rateOfReturn/12, 1, totalAmountThisMonth, 1) - totalAmountThisMonth);
      interest += thisMonthInterest;

      transactions.push({
        year: parseInt(i / 12) === 1 ? 1 : parseInt(i / 12),
        month: parseInt(i % 12) === 0 ? 12 : parseInt(i % 12),
        initialBalance: Math.round(investmentAmount),
        investment: sipAmount,
        interest: thisMonthInterest,
        balanceAtEndOfMonth: Math.round(balanceAtEndOfMonth),
        totalInterest: interest
      });
      investmentAmount = balanceAtEndOfMonth;
    }
    setData(transactions);
    const invested = period * 12 * sipAmount;
    setMeta({
      investmentAmount: invested ?? 0,
      period,
      rateOfReturn,
      finalBalance: investmentAmount,
      interestAmount: parseInt(investmentAmount - invested),
    });

  }

  return (
    <>
    <Header />
    <div className="container">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h1 className="display-4">SIP Calculator</h1>
              <p className="lead">SIP is the best way to accumulate long term wealth.</p>
            </div>
            <div className="col-md-4">
              <form>
                <div className="form-group">
                  {/* <label>How much do you want to invest monthly?</label> */}
                  <input type="number" value={sipAmount} onChange={e => setSipAmount(parseInt(e.target.value))} className="form-control" placeholder="How much do you want to invest monthly?" />
                </div>
                <div className="form-group">
                  {/* <label>Investment Period</label> */}
                  <div className="input-group mb-3">
                    <input type="number" className="form-control" value={period} onChange={e => setPeriod(e.target.value)} placeholder="Investment Period" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2">Years</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  {/* <label>Expected Annual Returns (%)</label> */}
                  <div className="input-group mb-3">
                    <input type="number" value={rateOfReturn} onChange={e => setRateOfReturn(e.target.value)} className="form-control" placeholder="Expected Annual Returns (%)" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2">%</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <button className="btn btn-block btn-light btn-outline" onClick={(e) =>{e.preventDefault(); calculate()}}>Calculate</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <form>
            <div className="form-group">
              <label>How much do you want to invest monthly?</label>
              <input type="number" value={sipAmount} onChange={e => setSipAmount(parseInt(e.target.value))} className="form-control" placeholder="How much do you want to invest monthly?" />
            </div>
            <div className="form-group">
              <label>Investment Period</label>
              <div className="input-group mb-3">
                <input type="number" className="form-control" value={period} onChange={e => setPeriod(e.target.value)} placeholder="Investment Period" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2">Years</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Expected Annual Returns (%)</label>
              <div className="input-group mb-3">
                <input type="number" value={rateOfReturn} onChange={e => setRateOfReturn(e.target.value)} className="form-control" placeholder="Expected Annual Returns (%)" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2">%</span>
                </div>
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-block btn-light btn-outline" onClick={(e) =>{e.preventDefault(); calculate()}}>Calculate</button>
            </div>
          </form>
        </div>
        <div className="col-md-8">
          { data && <Breakup data={data} meta={meta}/> }
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
