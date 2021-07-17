import {useState} from 'react'
import Input from '../common/Input';
import { createPassword } from '../../helpers/helpers';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function PasswordGenerator() {
    const [len, setLen] = useState(8);
    const [password, setPassword] = useState('');
    const [{hasSymbols, hasNumbers}, setBoolean] = useState({
        hasSymbols: true,
        hasNumbers: true
    });

    const [copied, setCopied] = useState(false);

    function generatePassword() {
        setPassword(createPassword(len, hasNumbers, hasSymbols));
        setCopied(false);
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
                                        <label>Generated Password {copied && <span class="badge badge-success">Copied!</span>}</label>
                                        <div class="input-group">
                                            <input type="text" className="form-control disabled" value={password} placeholder="Generated Password" />
                                            <div class="input-group-append">
                                                <CopyToClipboard text={password}>
                                                    <button className="btn btn-dark" disabled={password.length !== len || copied} onClick={() => setCopied(true)}>{copied ? 'Copied!': 'Copy to clipboard'}</button>
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
                                        <Input name='password-length' value={len} onChange={e => setLen(e.target.value)} placeholder="Password Length" />
                                    </div>
                                </div>
                                <div className="form-group form-check">
                                    <Input type="checkbox" className="form-check-input" id="Symbols" name='hasSymbols' checked={hasSymbols} onChange={e => setBoolean({hasNumbers, hasSymbols: !hasSymbols})}/>
                                    <label class="form-check-label" for="Symbols">Include Symbols</label>
                                </div>
                                <div className="form-group form-check">
                                    <Input type="checkbox" className="form-check-input" id="Numbers" name='hasNumbers' checked={hasNumbers} onChange={e => setBoolean({hasSymbols, hasNumbers: !hasNumbers})}/>
                                    <label class="form-check-label" for="Numbers">Include Numbers</label>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-block btn-dark btn-outline" onClick={(e) =>{e.preventDefault(); generatePassword()}}>Generate Password</button>
                                </div>
                            </form>
                            {hasSymbols}
                        </div>
                    </div>
                </div>
            </div>
    )
}