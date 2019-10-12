import { createContext } from 'react';

const DictionaryContext = createContext({
    dictionary:{},
    activePath: '',
    dispatchDictionaryAction: () =>{}
});

export default DictionaryContext;
