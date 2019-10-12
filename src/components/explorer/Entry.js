import React, {useContext} from 'react';
import DictionaryContext from "../../contexts/dictionary.context";

function Entry ({name, path}) {
    const { dispatchDictionaryAction, activePath} = useContext(DictionaryContext);

    function handleClick() {
        dispatchDictionaryAction({type:'setActivePath', path})
    }

    const classNames= `explorer__entry__title ${activePath===path?' explorer__entry__title--active':''}`;
    return <span className={classNames} onClick={handleClick}>{name}</span>
}

export default Entry;