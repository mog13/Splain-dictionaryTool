import Splain from "@mog13/splain";

let backupDictionary = localStorage.getItem('backup');
const dictionary = backupDictionary ? JSON.parse(backupDictionary) : Splain.dictionaries.default;
Splain.newDictionary(dictionary);

const defaultState = {
    entries: dictionary
};



const DictionaryReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_ENTRY':
            Splain.addEntry(action.entry);
            return {
                ...state,
                entries: Splain.dictionary.entries
            };
        default:
            return state
    }
}

export default DictionaryReducer

export const getEntries = state => state.entries;
