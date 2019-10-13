import React, {useRef, useState, useEffect, useContext} from 'react';
import Splain from "@mog13/splain";
import DictionaryContext from "../../contexts/dictionary.context";


function Preview() {
    const templateRef = useRef(null);
    const [outputs, setOutputs] = useState([]);
    const {dictionary} = useContext(DictionaryContext);

    function generateMore() {
        setOutputs(outputs.concat(Splain.process(templateRef.current.value,{dictionaryName:'preview'})));
    }

    useEffect(() => {
        setOutputs([]);
        if (dictionary.entries) {
        let newEntries = JSON.parse(JSON.stringify(dictionary.entries));
        Splain.addEntry(newEntries, 'preview');
    }
    },[dictionary]);



    return <div>
        <input ref={templateRef} type="text" defaultValue="{{hello}}"/>
        <button onClick={generateMore}> Generate</button>
        <ul>
            {outputs.reverse().map((o,i)=><p key={i}>{o}</p>)}
        </ul>
    </div>
}

export default Preview;