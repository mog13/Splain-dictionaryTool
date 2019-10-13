import React, {useReducer, useEffect} from 'react';

import {dictionaryReducer, initialDictionaryState} from '../../reducers/dictionary.reducer';
import Dictionary from '../../contexts/dictionary.context'

import "./editor.scss";

function Editor({children, loadedDictionary}) {
    const [state, dispatch] = useReducer(dictionaryReducer, initialDictionaryState);

    useEffect(()=>{
        if(loadedDictionary) {
            dispatch({type:'setDictionary',dictionary:loadedDictionary})
        }
    },[loadedDictionary]);


    return <Dictionary.Provider value={{...state, dispatchDictionaryAction:dispatch}}>
        <div className="editor">
        {children}
        </div>
    </Dictionary.Provider>;

}

export default Editor;