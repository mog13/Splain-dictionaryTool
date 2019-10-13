import React, {useContext, useEffect, useState} from 'react';
import _ from 'lodash';
import DictionaryContext from "../../contexts/dictionary.context";
import Entry from "./Entry";


function DictionaryKey({path, initialOpen, hideEntry}) {
    const {dictionary, activePath} = useContext(DictionaryContext);
    const [isCategory, setIsCategory] = useState(undefined);
    const [keys, setKeys] = useState(null);
    const [name, setName] = useState(null);
    const [open, setOpen] = useState(initialOpen || false);
    const [active, setActive] = useState(false);
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

    useEffect(()=>{
        setActive(activePath.indexOf(path)>=0)
    },[activePath, path]);

    const titleClassname = `explorer__dictionary-key__title ${open? 'explorer__dictionary-key__title--opened':''} 
    ${active? 'explorer__dictionary-key__title--active':'' }`;

    return <div >
        {isCategory && !hideEntry && <span className={titleClassname} onClick={toggle}>
            {name}
        </span> }
        {isCategory && open && keys.map((key)=><div className="explorer__dictionary-key">
            <DictionaryKey key={key} path={`${path}.${key}`}/>
        </div>)}
        {!isCategory && <Entry name={name} path={path}/> }
    </div>;

}

export default DictionaryKey;