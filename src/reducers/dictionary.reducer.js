import _ from 'lodash'

const initialDictionaryState = {
    dictionary: {},
    activePath: ""
};

function dictionaryReducer(state, action) {
    let newDictionary;
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

        //new entries will only ever be objects, pass index
        case "UpdateEntry":
            if (!action.path || !action.newEntry || action.index === undefined) return state;
            newDictionary = Object.assign({}, dictionary);
            let newEntries = _.get(newDictionary,action.path);
            if(action.index >= newEntries.length) {
                newEntries.push(action.newEntry);
            }
            else{
                newEntries[action.index] =  action.newEntry;
            }

            _.set(newDictionary,action.path,newEntries);

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