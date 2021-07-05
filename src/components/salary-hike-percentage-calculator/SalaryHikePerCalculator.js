import {useState, useEffect} from 'react'
import Input from '../common/Input'
import { useFinInput } from '../../hooks/useFinInput';
import { numberFormat } from '../../helpers/helpers';

export default function SalaryHikePerCalculator() {
    useEffect(() => {
        document.title = "Salary Hike Percentage Calculator"
    }, []);

    const [{currentSalary, perIncrement}, handleChange] = useFinInput(
        {
          currentSalary: 100000,
          perIncrement: 21,
        }
    );

    const [newSalary, setNewSalary] = useState(null);

    function calculate () {
        setNewSalary((currentSalary * perIncrement / 100 ) + currentSalary);
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
                                    <h2><small><em>Your new Salary is:</em></small> <span className="text-muted">{numberFormat(newSalary)}</span></h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 bg-white" style={{margin: 'auto 0', paddingTop: '1rem'}}>
                            <form>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">&#8377;</span>
                                        </div>
                                        <Input name='currentSalary' value={currentSalary} onChange={handleChange} placeholder="Current Salary" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group mb-3">
                                        <Input name='perIncrement' value={perIncrement} onChange={handleChange} placeholder="Percentage incremented" />
                                        <div className="input-group-append">
                                            <span className="input-group-text">%</span>
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
        </>
    )
}
