import _ from 'lodash'

const initialDictionaryState = {
    dictionary: {test:'hello'}
};

function dictionaryReducer(state, action) {
    const {dictionary} = state;

    switch (action.type) {

        case "set":
            return {
                ...state,
                dictionary: action.dictionary
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