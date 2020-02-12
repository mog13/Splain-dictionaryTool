
export const addEntry = (entry) => ({
   type: 'ADD_ENTRY',
   entry
});

export const setSelectedEntry = (entry) => ({
   type: 'SELECTED_ENTRY',
   entry
});

export const updateEntry = (entry,path) => ({
   type: 'UPDATE_ENTRY',
   entry,
   path
});

export const promoteDictionaryEntry = (path) => ({
   type: 'PROMOTE_DICT_ENTRY',
   path
});

export const newDictionary = (dictionary) => ({
   type: 'NEW_DICT',
   dictionary
});
export const updateDictionaryName = (name) => ({
   type: 'UPDATE_DICT_NAME',
   name
});

export const toggleAutoSave = () => ({
   type: 'TOGGLE_AUTO_SAVE'
});

export const removeEntry = (entry, path) => ({
   type: 'REMOVE_ENTRY',
   entry,
   path
});

export const updateName = (path, oldname, newName) => ({
   type: 'UPDATE_NAME',
   path,
   names:{
      old:oldname,
      new:newName
   }
});

