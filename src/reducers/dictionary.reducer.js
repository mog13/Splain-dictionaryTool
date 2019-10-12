import _ from 'lodash'

const initialDictionaryState = {
    dictionary: {},
    activePath: ""
};

function dictionaryReducer(state, action) {
    const {dictionary} = state;

    switch (action.type) {

        case "setDictionary":
            return {
                ...state,
                dictionary: action.dictionary
            };
        case "setActivePath":
            return {
                ...state,
                activePath: action.path
            };
        case "update":
            let newDictionary = Object.assign({},dictionary);
            _.set(newDictionary,action.path,action.value);
            return {
                ...state,
                dictionary: newDictionary
            };


        default:
            throw new Error();
    }

}


export {
    initialDictionaryState,
    dictionaryReducer
}