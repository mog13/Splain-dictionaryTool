import React, {useReducer, useEffect} from 'react';

import {dictionaryReducer, initialDictionaryState} from '../../reducers/dictionary.reducer';
import Dictionary from '../../contexts/dictionary.context'
function Editor({children, loadedDictionary}) {
    const [state, dispatch] = useReducer(dictionaryReducer, initialDictionaryState);

    useEffect(()=>{
        if(loadedDictionary) {
            console.log('loading given dictionary');
            dispatch({type:'setDictionary',dictionary:loadedDictionary})
        }
    },[loadedDictionary]);


    return <Dictionary.Provider value={{...state, dispatchDictionaryAction:dispatch}}>
        {children}
    </Dictionary.Provider>;

}

export default Editor;