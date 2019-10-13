import React, { useEffect, useState, useContext } from 'react';
import DictionaryContext from "../../contexts/dictionary.context";

function Entry({entry,path,index}){
    const [isString, setIsString] = useState(false);

    const {dispatchDictionaryAction} = useContext(DictionaryContext);

    //if the entry isnt an object, convert to one
    useEffect(()=>{
        if(typeof entry === 'string') {
            setIsString(true);
            let convertedEntry = {
                value:entry,
                weight:1,
                context:[]
            };
            dispatchDictionaryAction({type:'UpdateEntry',path:path,index:index,newEntry: convertedEntry})
        }
        setIsString(false);
    },[dispatchDictionaryAction, entry, index, path]);

    function HandleUpdate(e) {
        e.preventDefault();
        let newEntry = Object.assign(entry,{[e.target.name]:e.target.value});
        dispatchDictionaryAction({type:'UpdateEntry',path:path,index:index,newEntry: newEntry});
    }

    if(isString) return <h1>wait</h1>;

    return <div className="inspector__entry">
        <input name="value" onChange={HandleUpdate}  type="text" defaultValue={entry.value}/>
        <input name="weight" onChange={HandleUpdate} type="number" defaultValue={entry.weight}/>
        <span>{JSON.stringify(entry.context)}</span>
    </div>
}

export default Entry;