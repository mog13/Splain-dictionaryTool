import React, {useRef} from "react";

import './workspace-entry.scss';
import {useDispatch, useSelector} from "react-redux";
import {getSelected} from "../../store/reducers/DictionaryReducer";
import {removeEntry, updateEntry} from "../../store/actions/DictionaryActions";
import ContextEditor from "./ContextEditor";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function WorkspaceEntry({entry}) {

    const path = useSelector(getSelected);
    const nameRef = useRef(null);
    const dispatch = useDispatch();

    function handleNameClick() {
        const newName = nameRef.current.value;
        if (newName) {
            dispatch(updateEntry({...entry, value: newName, target: entry.value}, path));
        } else {
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
        <button className="workspace-entry__delete" onClick={handleDelete}><FontAwesomeIcon size={"lg"} icon={"trash"}/></button>
        <div className="workspace-entry__details">
            <input defaultValue={entry.value} ref={nameRef} onBlur={handleNameClick}/>

            <div className="workspace-entry__details__weights">
                <div className="weight-container">
                    <p className="weight-container__title"> Weight </p>
                    <div className="weight weight--given">
                        <FontAwesomeIcon icon={'minus'} className="weight__modify" onClick={() => {
                            handleWeightChange(-1)
                        }}/>
                        <h3 className="weight__value">{entry.weight}</h3>
                        <FontAwesomeIcon icon={'plus'} className="weight__modify" onClick={() => {
                            handleWeightChange(1)
                        }}/>
                    </div>
                </div>
                <div className="weight-container">
                    <p className="weight-container__title"> Computed </p>
                    <div className="weight weight--given">
                        <h3  className="weight__value"> {entry.computedWeight}</h3>
                    </div>
                </div>
            </div>

        </div>
        <div className="workspace-entry__contexts">
            <ContextEditor entry={entry}/>
        </div>
    </div>
}

export default WorkspaceEntry;
