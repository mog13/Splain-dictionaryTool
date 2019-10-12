import React, {useContext, useEffect, useState} from 'react';
import _ from 'lodash';
import DictionaryContext from "../../contexts/dictionary.context";
import Entry from "./Entry";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function DictionaryKey({path}) {
    const {dictionary} = useContext(DictionaryContext);
    const [isCategory, setIsCategory] = useState(undefined);
    const [keys, setKeys] = useState(null);
    const [name, setName] = useState(null);
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    useEffect(()=>{
        let entry = _.get(dictionary, path);
        if(entry) {
            let isEntry = Array.isArray(entry);
            setIsCategory(!isEntry);
            if (!isEntry) {
                setKeys(Object.keys(entry));
            }
            let pathPaths = path.split('.');
            setName(pathPaths[pathPaths.length-1]);
        }
    },[dictionary, path]);

    const titleClassname = `explorer__dictionary-key__title ${open? 'explorer__dictionary-key__title--opened':''}`;

    return <div >
        {isCategory && <span className={titleClassname} onClick={toggle}>
            {name}
        </span> }
        {isCategory && open && keys.map((key)=><div className="explorer__dictionary-key">
            <DictionaryKey key={key} path={`${path}.${key}`}/>
        </div>)}
        {!isCategory && <Entry name={name} path={path}/> }
    </div>;

}

export default DictionaryKey;