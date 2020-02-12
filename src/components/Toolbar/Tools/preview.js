import React, {useState, useRef} from 'react';
import Splain from '@mog13/splain';

import './preview.scss';
function Preview(){
    const [previews, setPreviews] = useState([]);
    const inputRef = useRef(null);

    function handleButtonClick(e){
        e.preventDefault();
        if(inputRef.current.value) setPreviews([Splain.execute(inputRef.current.value)].concat(previews));
    }

    return <div className="preview-tool">
        <div className="preview-tool__results">
            <h1 className="preview-tool__results__current">{previews[0]}</h1>
            <div className="preview-tool__results__history">
                {previews.slice(1).map(prev=><p>{prev}</p>)}
            </div>
        </div>
        <form className="preview-tool__input" onSubmit={handleButtonClick}>
        <input defaultValue={'{{test}}'} ref={inputRef} onBlur={handleButtonClick}/>
        </form>
    </div>
}

export default Preview;
