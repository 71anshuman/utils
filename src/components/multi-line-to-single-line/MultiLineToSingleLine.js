import React, {useState, useEffect} from 'react'
import {toSingleLine} from '../../helpers/helpers';

export default function MultiLineToSingleLine() {
    useEffect(() => {
        document.title = "Multi Line To Single Line text converter"
    }, []);

    const [text, setText] = useState("");

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="display-6">Multi Line To Single Line text conveter</h1>
                            <p className="lead">You can convert multiliner text to single line.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <label htmlFor="multiLineText">Type/Paste multiliner text</label>
                            <textarea rows="16" className="form-control" aria-label="With textarea" name="multiLineText" onChange={e => setText(e.target.value)}></textarea>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="">Converted text</label>
                        <textarea rows="16" readOnly className="form-control" value={toSingleLine(text, true)}></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}
