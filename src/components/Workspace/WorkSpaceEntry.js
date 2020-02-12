import React, {useRef} from "react";

import './workspace-entry.scss';
import {useDispatch, useSelector} from "react-redux";
import {getSelected} from "../../store/reducers/DictionaryReducer";
import {removeEntry, updateEntry} from "../../store/actions/DictionaryActions";
import ContextEditor from "./ContextEditor";

function WorkspaceEntry({entry}) {

    const path = useSelector(getSelected);
    const nameRef = useRef(null);
    const dispatch = useDispatch();

    function handleNameClick() {
        const newName = nameRef.current.value;
        if(newName) {
            dispatch(updateEntry({...entry, value: newName, target: entry.value}, path));
        }else{
            nameRef.current.value = entry.value;
        }
    }

    function handleWeightChange(change) {
        dispatch(updateEntry({...entry, target: entry.value, weight: entry.weight + change}, path));
    }

    function handleDelete() {
        dispatch(removeEntry({...entry, target: entry.value}, path))
    }

    return <div className="workspace-entry">
        <div className="workspace-entry__details">
            <input defaultValue={entry.value} ref={nameRef} onBlur={handleNameClick}/>
            <sub>{path}</sub> <button onClick={handleDelete}>delete</button>
            <div className="workspace-entry__details__weights">
                <h3>
                    <button onClick={() => {handleWeightChange(-1)}}>-</button>
                    {entry.weight}
                    <button onClick={() => {handleWeightChange(1)}}>+</button>
                </h3>
                <h3> {entry.computedWeight}</h3>
            </div>

        </div>
        <div className="workspace-entry__contexts">
            <ContextEditor entry={entry}/>
        </div>
    </div>
}

export default WorkspaceEntry;
