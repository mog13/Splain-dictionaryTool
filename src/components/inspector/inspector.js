import React, {useContext, useState, useEffect, useRef} from 'react';
import DictionaryContext from "../../contexts/dictionary.context";

import _ from 'lodash';
import Entry from "./Entry";

import './inspector.scss'

function Inspector() {
    let {dictionary, activePath, dispatchDictionaryAction} = useContext(DictionaryContext);
    const [entries, setEntries] = useState(null);
    const [keyRoot, setKeyRoot] = useState('');
    const [name, setName] = useState('');
    const nameRef = useRef(null);
    const entryRef = useRef(null);
    useEffect(() => {
        let found = _.get(dictionary, activePath);
        setEntries(Array.isArray(found) ? found : null);
    }, [activePath, dictionary]);

    useEffect(() => {
        setKeyRoot(activePath);
        let parts = activePath.split('.');
        let newName = parts[parts.length - 1];
        setName(newName);
        nameRef.current.value = newName;
    }, [activePath]);

    function updateName(e) {
        e.preventDefault();
        dispatchDictionaryAction({type: 'renameCategory', path: keyRoot, name: nameRef.current.value});
    }

    function deleteCategory(e) {
        e.preventDefault();
        dispatchDictionaryAction({type: 'deleteCategory', path: keyRoot});
    }

    function promoteCategory(e) {
        e.preventDefault();
        dispatchDictionaryAction({type: 'promoteCategory', path: keyRoot});
    }

    function addEntry(e) {
        e.preventDefault();
        dispatchDictionaryAction({type: 'addEntry', path: keyRoot, name:entryRef.current.value});
        entryRef.current.value = '';
    }


    return <div className="inspector">
        <h1 className="inspector__title">{activePath.replace('entries.','')}</h1>
        <div className="inspector__controls">
            <form onSubmit={updateName}>
                <input placeholder={name} onBlur={updateName} ref={nameRef}/>
            </form>
                <button onClick={deleteCategory}>delete</button>
                {entries && <button onClick={promoteCategory}>promote</button>}

        </div>
        {entries && <div className="inspector__entries">
            {entries.map((entry, i) =>
                <Entry key={`${keyRoot}.${i}`} entry={entry} path={activePath} index={i}/>
            )}
            <form onSubmit={addEntry}>
                <input ref={entryRef} placeholder="new entry" onBlur={addEntry}/>
            </form>
        </div>
        }
    </div>
}

export default Inspector;
