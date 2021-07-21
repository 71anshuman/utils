import React, {useState, useEffect} from 'react'
import {countWords} from '../../helpers/helpers'

export default function WordCounter() {
    useEffect(() => {
        document.title = "Word Counter"
    }, []);
    
    const [text, setText] = useState("");

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="display-6">Word Counter</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <form>
                        <div className="form-group">
                            <label htmlFor="multiLineText">Type/Paste text</label>
                            <textarea rows="16" className="form-control" aria-label="With textarea" name="multiLineText" onChange={e => setText(e.target.value)}></textarea>
                        </div>
                    </form>
                </div>
                <div className="col-md-4">
                    <h2 className="display-4">
                        <small className="text-muted">Words count: </small>
                        {countWords(text)}
                    </h2>
                    <h2 className="display-4">
                        <small className="text-muted">Character count: </small>
                        {text.replace(/[\r\n\t]/g, '').length}
                    </h2>
                </div>
            </div>
        </>
    )
}
