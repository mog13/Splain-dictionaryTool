import React, {useReducer} from 'react';

import {dictionaryReducer, initialDictionaryState} from '../../reducers/dictionary.reducer';
import Dictionary from '../../contexts/dictionary.context'
function Editor({children}) {
    const [state, dispatch] = useReducer(dictionaryReducer, initialDictionaryState);

    return <Dictionary.Provider value={{dictionary:state.dictionary}}>
        {JSON.stringify(state.dictionary)}
        {children}
    </Dictionary.Provider>;

}

export default Editor;