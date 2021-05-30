import './style.css';
import React, {useState, useRef} from 'react';
import axios from 'axios';
import Clipboard from 'react-clipboard.js';



const App = () => {
    const errorRef = useRef(null);
    const copiedRef = useRef(null);
    const [longURL, setLongURL] = useState("");
    const [resultURL, setResultURL] = useState(null);

    const url = {
        "domain": "bit.ly",
        "long_url": longURL
    };



    const headers = {
        'Authorization': 'key',
        'Content-Type': 'application/json'
    };

    


    const fetchShortLink = async () => {
        try {
        const response = await axios.post('https://api-ssl.bitly.com/v4/shorten', url, {headers});
        setResultURL(response.data.link);   
        } catch (er) {
            errorRef.current.classList.toggle('visible');
            setTimeout(() => {
                errorRef.current.classList.toggle('visible');
            }, 2000);
        };
    };


    const onFormSubmut = e => {
        e.preventDefault();
        fetchShortLink();
    };

    const onInputChange = e => {
        setLongURL(e.target.value);
        setResultURL('');
      
    };

    const onCopy = () => {
        copiedRef.current.classList.toggle('visible');
        setTimeout(() => {
            copiedRef.current.classList.toggle('visible');
        }, 1000);
    };
    
    
    const renderResult = () => {
        if(longURL && resultURL){
            return (
                <div className="shortURL">
                    Your Short URL:
                    <div>{resultURL}</div>
                    <div> 
                        <Clipboard className="button url" data-clipboard-text={resultURL} onClick={() => onCopy()}>
                            Click to Copy URL
                        </Clipboard>
                        <div className="hidden copied" ref={copiedRef}>Copied!</div>
                    </div>
                    
                   
                </div>
            );
        };
    };
    

    
    
    return (
        <React.Fragment>
            <div className="header">URL Shortener</div>
            <form onSubmit = {onFormSubmut}>
                <input placeholder="e.g. https://nodejs.org/api/process.html#process_process_env" value={longURL} onChange = {onInputChange}  type="text"></input>
                <div className="hidden error" ref={errorRef}>Invalid URL</div>
                <input className="button" type="submit" value="Shorten"></input>
                
            </form>
            {renderResult()}
        </React.Fragment>
    );
};

export default App;