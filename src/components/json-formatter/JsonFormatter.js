import React, {useState, useEffect} from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function JsonFormatter() {
    useEffect(() => {
        document.title = "JSON Formatter"
    }, []);

    const [text, setText] = useState('');
    const [prerryJSON, setPrettyJSON] = useState('');
    const [copied, setCopied] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);

    function toPrettyJson() {
        let json = text;
        try {
            json = JSON.parse(text)
            setIsInvalid(false)
        } catch(err) {
            setIsInvalid(true)
            return "";
        }
          
        return JSON.stringify(json, undefined, 4);
    }

    function prettifyJSON(e) {
        e.preventDefault()
        setPrettyJSON(toPrettyJson())
        setCopied(false)
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="display-6">JSON Formatter</h1>
                            <p className="lead">You can format your minified JSON</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="multiLineText" className="float-left">JSON Object</label>
                        <button onClick={(e) => prettifyJSON(e)} className="btn btn-sm btn-dark float-right">Format JSON</button>
                        
                        <textarea
                            rows="16"
                            className={`form-control ${isInvalid ? 'is-invalid': ''}`}
                            name="multiLineText"
                            onChange={e => setText(e.target.value)}>
                        </textarea>
                        <div className="invalid-feedback">
                            Please enter valid JSON
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <div>
                            <label className="float-left">Converted text</label>
                            <CopyToClipboard text={prerryJSON}>
                                <button
                                    className="float-right btn btn-dark btn-sm"
                                    disabled={prerryJSON.length < 1 || copied || isInvalid}
                                    onClick={() => setCopied(true)}
                                >
                                    {copied ? 'Copied!': 'Copy to clipboard'}
                                </button>
                            </CopyToClipboard>
                        </div>
                        <textarea rows="16" readOnly className="form-control" value={prerryJSON}></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}
