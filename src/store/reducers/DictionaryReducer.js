import Splain from "@mog13/splain";
import _ from 'lodash';


let dictionaryName = localStorage.getItem('dictionaryName')||'default';
let backupDictionary = localStorage.getItem(`splain_${dictionaryName}`);
const dictionary = backupDictionary ? JSON.parse(backupDictionary) : {hello:['world']};
Splain.newDictionary(dictionary);

const defaultState = {
    entries: tagEntries(Splain.dictionary.entries),
    selected: null,
    name:dictionaryName,
    autoSave:false
};

function tagEntries(entries) {
    let newEntries = {};
    for (let [key, value] of Object.entries(entries)) {
        if (Array.isArray(value)) {
            newEntries[key] = value.map((e, i) => {
                return {...e, toolIndex: i}
            });
        } else {
            newEntries[key] = tagEntries(value)
        }
    }
    return newEntries;

}

function duplicateObject(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const DictionaryReducer = (state = defaultState, action) => {
    let newAllEntries = duplicateObject(state.entries);
    let newEntries, replacementSection, tempSection;
function reduceDeictionary() {
    switch (action.type) {
        case 'ADD_ENTRY':
            Splain.addEntry(action.entry);
            return {
                ...state,
                entries: tagEntries(Splain.dictionary.entries)
            };

        case 'SELECTED_ENTRY':
            return {
                ...state,
                selected: action.entry
            };

        case 'UPDATE_ENTRY':
            newEntries = duplicateObject(_.get(newAllEntries, action.path))
                .slice()
                .filter((entry) => {
                    return (entry.toolIndex !== action.entry.toolIndex)
                }).concat(action.entry);
            _.set(newAllEntries, action.path, newEntries);
            Splain.newDictionary(newAllEntries);
            return {
                ...state,
                entries: newAllEntries
            };

        case 'REMOVE_ENTRY':
            newEntries = duplicateObject(_.get(newAllEntries, action.path))
                .slice()
                .filter((entry) => {
                    return (entry.toolIndex !== action.entry.toolIndex)
                });
            _.set(newAllEntries, action.path, newEntries);
            Splain.newDictionary(newAllEntries);
            return {
                ...state,
                entries: newAllEntries
            };
        case 'PROMOTE_DICT_ENTRY':
            newEntries = duplicateObject(_.get(newAllEntries, action.path));
            _.set(newAllEntries, action.path, {newEntry: newEntries});
            Splain.newDictionary(newAllEntries);
            return {
                ...state,
                entries: newAllEntries,
                selected: `${action.path}.newEntry`
            };
        case 'NEW_DICT':
            Splain.newDictionary(action.dictionary);
            return {
                ...state,
                entries: tagEntries(Splain.dictionary.entries)
            };

        case 'UPDATE_NAME':
            let fullPath = action.path ? `${action.path}.${action.names.old}` : action.names.old;
            newEntries = duplicateObject(_.get(newAllEntries, fullPath));
            tempSection = duplicateObject(_.get(newAllEntries, action.path || '', newAllEntries));
            replacementSection = {};
            Object.keys(tempSection).forEach(key => {
                if (key !== action.names.old) replacementSection[key] = tempSection[key];
            });
            replacementSection[action.names.new] = newEntries;
            action.path ? _.set(newAllEntries, action.path, replacementSection) : newAllEntries = replacementSection;
            Splain.newDictionary(newAllEntries);
            return {
                ...state,
                entries: newAllEntries,
                selected: action.path ? `${action.path}.${action.names.new}` : action.names.new
            };

        case 'UPDATE_DICT_NAME':
            localStorage.setItem('dictionaryName', action.name);
            return {
                ...state,
                name: action.name
            };
        case 'TOGGLE_AUTO_SAVE':
            return{
                ...state,
                autoSave:!state.autoSave
            }
        default:
            return state
    }
}
let temp =  reduceDeictionary();
if(temp.autoSave) localStorage.setItem(`splain_${dictionaryName}`,JSON.stringify(temp.entries));
return temp;
};

export default DictionaryReducer

export const getEntries = state => state.entries;
export const getSelected = state => state.selected;
export const getDictionaryName = state => state.name;
export const getAutoSave = state => state.autoSave;
export const getSelectedEntry = state => {
    return _.get(state.entries, state.selected)
};
