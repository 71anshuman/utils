import {useState} from 'react'
import Input from '../common/Input';
import { createPassword } from '../../helpers/helpers';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function PasswordGenerator() {
    const [len, setLen] = useState(8);
    const [password, setPassword] = useState('');

    function generatePassword() {
        setPassword(createPassword(len));
    }

    return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="display-6">Password Generator</h1>
                            <hr />
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Generated Password</label>
                                        <div class="input-group">
                                            <input type="text" className="form-control disabled" value={password} placeholder="Generated Password" />
                                            <div class="input-group-append">
                                                <CopyToClipboard text={password}>
                                                    <button className="btn btn-dark">Copy to clipboard</button>
                                                </CopyToClipboard>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 bg-white" style={{margin: 'auto 0', paddingTop: '1rem'}}>
                            <form>
                                <div className="form-group">
                                    <label>Password Length</label>
                                    <div className="input-group">
                                        <Input name='currentSalary' value={len} onChange={e => setLen(e.target.value)} placeholder="Password Length" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block btn-dark btn-outline" onClick={(e) =>{e.preventDefault(); generatePassword()}}>Generate Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}
