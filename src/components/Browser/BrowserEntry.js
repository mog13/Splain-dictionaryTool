import React, {useState, useRef} from "react";

import './browser-entry.scss';
import {useDispatch} from "react-redux";
import {addEntry, promoteDictionaryEntry, setSelectedEntry, updateName} from "../../store/actions/DictionaryActions";
import _ from 'lodash';

function BrowserEntry({entries, name}) {
    const [collapsed, setCollapsed] = useState(name);
    const [changingName, setChangingName] = useState(null);
    const newEntryRef = useRef(null);
    const newNameRef = useRef(null);
    const dispatch = useDispatch();

    function toggle() {
        setCollapsed(!collapsed);
    }

    function handleNameClick(e, name) {
        if (e.altKey) {
            setChangingName(name);
        } else {
            toggle();
        }
    }

    function createNewEntry(e) {
        e.preventDefault();
        let entryName = newEntryRef.current.value;

        if (entryName) {
            let newEntry = name ? _.set({}, `${name}.${entryName}`, ['hello']) : {[entryName]: ['hello']};
            dispatch(addEntry(newEntry));
            newEntryRef.current.value = '';
        }
    }

    function handleEntriesClicked(e, entry) {
        if (e.altKey) {
            setChangingName(entry);
        } else if (e.shiftKey) {
            dispatch(promoteDictionaryEntry(entry))
        } else {
            dispatch(setSelectedEntry(entry))
        }
    }

    function renderEntriesChangeName(path, name) {
        function finishedChanging(e) {
            e.preventDefault();
            if(newNameRef.current.value) {
                dispatch(updateName(path, name, newNameRef.current.value))
            }
            setChangingName(null);
        }

        return <form onSubmit={finishedChanging}>
            <input defaultValue={name} onBlur={finishedChanging} ref={newNameRef}/>
        </form>;
    }

    let parts, targetName;
    if (name) {
        parts = name.split('.');
        targetName = parts.pop();
    }
    return <div className="browser-entry">

        {name && (changingName === name ? renderEntriesChangeName(parts.join('.'), targetName) :
            <p className="browser-entry__name" onClick={(e) => {
                handleNameClick(e, name);
            }}>${name} </p>)}

        {!collapsed && Object.keys(entries).map(key => {
            const fullPath = `${name}.${key}`;
            if (!Array.isArray(entries[key])) {
                return <BrowserEntry key={`dictionary-entry-${key}-${entries[key].toolIndex}`} name={name ? fullPath : key} entries={entries[key]}/>;
            } else {
                if (changingName === fullPath || changingName === key) return renderEntriesChangeName(name, key);
                return <p key={`entries-${key}-${entries[key].toolIndex}`} className="browser-entry__entries"
                          onClick={(e) => {
                              handleEntriesClicked(e, name ? fullPath : key)
                          }}>
                    {key}
                </p>
            }
        })}
        {!collapsed &&
        <form onSubmit={createNewEntry}>
            <input className="browser-entry__new" ref={newEntryRef}/>
        </form>}
    </div>
}

export default BrowserEntry;
