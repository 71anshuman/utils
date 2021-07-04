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
                            <p className="lead">You can convert multiner text to single line.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <form>
                        <label className="">Type/Paste multiliner text</label>
                        <div className="form-group">
                            <textarea rows="16" className="form-control" aria-label="With textarea" name="multiLineText" onChange={e => setText(e.target.value)}>Here you \n can \n type/paste multi Line Text</textarea>
                        </div>
                    </form>
                </div>
                <div className="col-md-6">
                    <label className="">Converted text</label>
                    <div className="form-group">
                        <textarea rows="16" className="form-control" value={toSingleLine(text, true)}></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}
