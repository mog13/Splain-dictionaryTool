import _ from 'lodash'
import Splain from "@mog13/splain"

const initialDictionaryState = {
    dictionary: {},
    activePath: ""
};

function setSplainDictionary(newDictionary) {
    Splain.addEntry(Object.assign({}, newDictionary.entries));
}

function dictionaryReducer(state, action) {
    const {dictionary} = state;
    let newDictionary = JSON.parse(JSON.stringify(dictionary));
    let stem;
    switch (action.type) {

        case "setDictionary":
            setSplainDictionary(action.dictionary);
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
            let newEntries = _.get(newDictionary, action.path);
            if (action.index >= newEntries.length) {
                newEntries.push(action.newEntry);
            } else {
                newEntries[action.index] = action.newEntry;
            }

            _.set(newDictionary, action.path, newEntries);
            setSplainDictionary(newDictionary);
            return {
                ...state,
                dictionary: newDictionary
            };

        case "addEntry":

            let entries = _.get(newDictionary, action.path);
            entries.push({
                value:action.name,
                weight:1,
                context:[]
            });

            return {
                ...state,
                dictionary: newDictionary
            };

        case "newCategory":
            let getCategory = _.get(newDictionary, action.path);
            getCategory[action.name] = [];

            return {
                ...state,
                dictionary: newDictionary
            };

        case "renameCategory":
            let category = _.get(newDictionary, action.path);
            let newCat = JSON.parse(JSON.stringify(category));
            stem = action.path.split('.');
            let oldName = stem.pop();
            stem = stem.join('.');
            let newPath = `${stem}.${action.name}`;
            _.set(newDictionary, stem, _.omit(_.get(newDictionary, stem), oldName));
            _.set(newDictionary, newPath, newCat);

            return {
                ...state,
                dictionary: newDictionary,
                activePath: newPath
            };

        case "deleteCategory":
            stem = action.path.split('.');
            let toRemove = stem.pop();
            stem = stem.join('.');
            _.set(newDictionary, stem, _.omit(_.get(newDictionary, stem), toRemove));
            return {
                ...state,
                dictionary: newDictionary,
                activePath: 'entries'
            };

        case "promoteCategory":
            let cat = _.get(newDictionary, action.path);
            _.set(newDictionary, action.path, {newEntry: cat});
            return {
                ...state,
                dictionary: newDictionary,
                activePath: `${action.path}.newEntry`
            };

        default:
            throw new Error();
    }

}


export {
    initialDictionaryState,
    dictionaryReducer
}
