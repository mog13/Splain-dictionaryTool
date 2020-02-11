import React, {useState, useRef} from "react";

import './browser-entry.scss';
import {useDispatch} from "react-redux";
import {addEntry} from "../../store/actions/DictionaryActions";
import _ from 'lodash';
function BrowserEntry({entries, name}) {
    const [collapsed, setCollapsed] = useState(name);
    const newEntryRef = useRef(null);
    const dispatch = useDispatch();

    function toggleCollapsed() {
        setCollapsed(!collapsed);
    }

    function createNewEntry(e) {
        e.preventDefault();
        let entryName = newEntryRef.current.value;
        if(entryName){
            let newEntry  = name?_.set({},`${name}.${entryName}`,['hello']): {[entryName]:['hello']};
            dispatch(addEntry(newEntry));
            newEntryRef.current.value = '';
        }
    }

    return <div className="browser-entry">
        {name && <p className="browser-entry__name" onClick={toggleCollapsed}>{name} </p>}

        {!collapsed && Object.keys(entries).map(key => {
            if (!Array.isArray(entries[key])) {
                return <BrowserEntry key={key} name={name ? `${name}.${key}` : key} entries={entries[key]}/>;
            } else {
                return <p key={key} className="browser-entry__entries">{key}</p>
            }
        })}
        {!collapsed &&
        <form onSubmit={createNewEntry}>
            <input className="browser-entry__new" ref={newEntryRef}/>
        </form>}
    </div>
}

export default BrowserEntry;
