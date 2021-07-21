import {useState, useEffect} from 'react'

export default function Base64Converter() {
    useEffect(() => {
        document.title = "Base64 Converter"
    }, []);

    const [text, setText] = useState("https://tools.71anshuman.com");
    const [encoded, setEncoded] = useState("aHR0cHM6Ly90b29scy43MWFuc2h1bWFuLmNvbQ==");

    function to64() {
        setEncoded(btoa(unescape(encodeURIComponent(text))))
    }

    function toText() {
        setText(decodeURIComponent(escape(window.atob(encoded))));
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="display-6">Base64 Converter</h1>
                            <p className="lead text-muted">You can convert <span className="text-dark"><em>String to Base64</em></span> and vice versa</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-md-5">
                    <form>
                        <div className="form-group">
                            <label htmlFor="multiLineText">Type/Paste multiliner text</label>
                            <textarea rows="16" className="form-control" value={text} name="multiLineText" onChange={e => setText(e.target.value)}></textarea>
                        </div>
                    </form>
                </div>
                <div className="col-md-2">
                    <div>
                        <button className="btn btn-dark btn-block" onClick={() => to64()}>
                            Convert To Base64
                        </button>
                        <button className="btn btn-outline-dark btn-block" onClick={() => toText()}>
                            Convert To Text
                        </button>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="form-group">
                        <label className="">Converted text</label>
                        <textarea rows="16" className="form-control" value={encoded} onChange={e => setEncoded(e.target.value)}></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}

