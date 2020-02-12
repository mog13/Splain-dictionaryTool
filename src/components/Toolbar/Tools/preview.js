import React, {useState, useRef} from 'react';
import Splain from '@mog13/splain';

function Preview(){
    const [previews, setPreviews] = useState([]);
    const inputRef = useRef(null);

    function handleButtonClick(){
        setPreviews([Splain.execute(inputRef.current.value)].concat(previews));
    }

    return <div className="preview-tool">
            <input defaultValue={'{{test}}'} ref={inputRef}/> <button onClick={handleButtonClick}>execute</button>
        <h1>{previews[0]}</h1>
        <div className="preview-tool__history">
            {previews.slice(1).map(prev=><p>{prev}</p>)}
        </div>
    </div>
}

export default Preview;
