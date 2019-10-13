import React, {useContext, useState, useEffect} from 'react';
import DictionaryContext from "../../contexts/dictionary.context";

import _ from 'lodash';
import Entry from "./Entry";

import './inspector.scss'

function Inspector() {
    let {dictionary, activePath} = useContext(DictionaryContext);
    const [entries, setEntries] = useState(null);
    const [keyRoot, setKeyRoot] = useState('');
    useEffect(() =>{
        let found = _.get(dictionary,activePath);
        if(Array.isArray(found)) {
            setEntries(found);
        }
    },[activePath, dictionary]);

    useEffect(()=>{
        setKeyRoot(activePath);
    },[activePath]);

    return <div className="inspector">
        <h1 className="inspector__title">{activePath}</h1>
        {entries && entries.map((entry,i)=><Entry key={`${keyRoot}.${i}`} entry={entry} path={activePath} index={i}/>)}
    </div>
}

export default Inspector;