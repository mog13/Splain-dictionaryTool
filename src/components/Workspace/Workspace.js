import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedEntry, getSelected} from "../../store/reducers/DictionaryReducer";
import WorkspaceEntry from "./WorkSpaceEntry";
import {addEntry} from "../../store/actions/DictionaryActions";
import _ from 'lodash';

function Workspace() {

    const selected = useSelector(getSelected);
    const selectedEntry = useSelector(getSelectedEntry);
    const dispatch = useDispatch();

    const [entries, setEntries] = useState([]);

    useEffect(() => {
        setEntries((selectedEntry && Array.isArray(selectedEntry)) ? selectedEntry.sort((a, b) => {
            return a.toolIndex < b.toolIndex ? -1 : 1
        }) : [])
    }, [selectedEntry]);

    function addNewEntry() {
        let newEntry = {};
        _.set(newEntry, selected, ['new entry']);
        dispatch(addEntry(newEntry))
    }

    if(!selected) return <div className="workspace"/>;

    return <div className="workspace">
        <h1>{selected}</h1>
        {entries.map(entry => {
            return <WorkspaceEntry entry={entry} key={`${entry.value}-${entry.toolIndex}`}/>;
        })}
        <button className="workspace__add-entry" onClick={addNewEntry}>
            Add new entry
        </button>
        <p>{JSON.stringify(entries)}</p>
    </div>
}

export default Workspace;
