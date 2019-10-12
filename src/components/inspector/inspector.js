import React, {useContext, useState, useEffect} from 'react';
import DictionaryContext from "../../contexts/dictionary.context";

import _ from 'lodash';
function Inspector() {
    let {dictionary, activePath} = useContext(DictionaryContext);
    const [entries, setEntries] = useState(null);

    useEffect(() =>{
        let found = _.get(dictionary,activePath);
        if(Array.isArray(found)) {
            setEntries(found);
        }
    },[activePath, dictionary]);

    return <div>
        <h1>{activePath}</h1>
        <span> {JSON.stringify(entries)}</span>
    </div>
}

export default Inspector;