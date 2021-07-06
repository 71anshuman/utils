import {useState, useEffect} from 'react'
import Input from '../common/Input'
import { useFinInput } from '../../hooks/useFinInput';
import { numberFormat } from '../../helpers/helpers';

export default function SalaryHikePerCalculator() {
    useEffect(() => {
        document.title = "Salary Hike Percentage Calculator"
    }, []);
    let percentage;
    const [{currentSalary, perIncrement}, handleChange] = useFinInput(
        {
          currentSalary: 0,
          perIncrement: 0,
        }
    );

    const [newSalary, setNewSalary] = useState(0);

    function calculate () {
        setNewSalary((currentSalary * perIncrement / 100 ) + currentSalary);
    }

    function calculatePercentage () {
        const salaryHiked = (newSalary - currentSalary);
        percentage = (salaryHiked / currentSalary) * 100;
        handleChange({target:{name: 'perIncrement', value: percentage}});
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="display-6">Salary Hike Calculator</h1>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                    {newSalary > 0 &&
                                        <h2>
                                            <small>
                                                <em>Your new Salary is:</em>
                                            </small>
                                            <span className="text-muted">{numberFormat(newSalary)}</span>
                                        </h2>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 bg-white" style={{margin: 'auto 0', paddingTop: '1rem'}}>
                            <form>
                                <div className="form-group">
                                    <label>Current Salary</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&#8377;</span>
                                        </div>
                                        <Input name='currentSalary' value={currentSalary} onChange={handleChange} placeholder="Current Salary" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Hike Percentage</label>
                                    <div className="input-group mb-3">
                                        <Input name='perIncrement' value={perIncrement.toFixed(2)} onChange={handleChange} placeholder="Percentage incremented" />
                                        <div className="input-group-append">
                                            <span className="input-group-text">%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block btn-dark btn-outline" onClick={(e) =>{e.preventDefault(); calculate()}}>Calculate</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="display-6">Salary Percentage Hike Calculator</h1>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                    {perIncrement > 0 &&
                                        <h2>
                                            <small>
                                                <em>Your salary hike percentage is:</em>
                                            </small>
                                            <span className="text-muted">{perIncrement.toFixed(2)}%</span>
                                        </h2>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 bg-white" style={{margin: 'auto 0', paddingTop: '1rem'}}>
                            <form>
                                <div className="form-group">
                                    <label>Current Salary</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&#8377;</span>
                                        </div>
                                        <Input name='currentSalary' value={currentSalary} onChange={handleChange} placeholder="Current Salary" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>New Salary</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&#8377;</span>
                                        </div>
                                        <Input name='newSalary' value={newSalary} onChange={e => setNewSalary(e.target.value)} placeholder="New salary" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block btn-dark btn-outline" onClick={(e) =>{e.preventDefault(); calculatePercentage()}}>Calculate</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
