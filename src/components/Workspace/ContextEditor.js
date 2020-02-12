import React, {useRef} from 'react';

import './context-editor.scss'
import {useDispatch, useSelector} from "react-redux";
import {getSelected} from "../../store/reducers/DictionaryReducer";
import {updateEntry} from "../../store/actions/DictionaryActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ContextEditor({entry}) {
    const path = useSelector(getSelected);
    const contextTypeRef = useRef(null);
    const contextEntryRef = useRef(null);
    const dispatch = useDispatch();

    function removeContext(contextType, contextToRemove) {
        let newEntry = {...entry};
        newEntry.contexts[contextType] = newEntry.contexts[contextType].filter(context => {
            return context !== contextToRemove
        });
        if(newEntry.contexts[contextType].length === 0) delete newEntry.contexts[contextType];
        dispatch(updateEntry(newEntry, path))
    }

    function addContext(e) {
        e.preventDefault();
        if (contextTypeRef.current.value && contextEntryRef.current.value) {
            let contextType = contextTypeRef.current.value;
            let contextEntry = contextEntryRef.current.value;
            let newEntry = {...entry};

            newEntry.contexts[contextType] = (newEntry.contexts[contextType] || []).concat(contextEntry);
            dispatch(updateEntry(newEntry, path));
            contextEntryRef.current.value = '';
        }
    }

    return <div className="context-editor">
        <div className="context-editor__new">
            <input placeholder="context type" ref={contextTypeRef}/>
            <form onSubmit={addContext}>
                <input placeholder="context value" ref={contextEntryRef} onBlur={addContext} />
            </form>
        </div>
        <div className="context-editor__existing">
            {entry.contexts && Object.keys(entry.contexts).map(key => {
                return <div key={key} className="context">
                    <h4 className="context__name">{key}</h4>
                    <div className="context__entries">
                    {Object.values(entry.contexts[key]).map(context => {
                        return <p  onClick={(e)=>{if(e.altKey) removeContext(key,context)}} className="context__entry" key={`${key}.${context}`}>
                            {context}</p>
                    })}
                    </div>
                </div>
            })}
        </div>
    </div>;
}


export default ContextEditor;

