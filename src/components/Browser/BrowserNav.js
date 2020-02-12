import React, {useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAutoSave, getDictionaryName, getEntries} from "../../store/reducers/DictionaryReducer";
import {newDictionary, toggleAutoSave, updateDictionaryName} from "../../store/actions/DictionaryActions";

import './browser-nav.scss';

function BrowserNav() {
    const entries = useSelector(getEntries);
    const dispatch = useDispatch();
    const nameRef = useRef(null);
    const name = useSelector(getDictionaryName);
const autoSave = useSelector(getAutoSave);
    function download(content, fileName, contentType) {
        let a = document.createElement("a");
        let file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    function saveDictionary() {
        download(JSON.stringify(entries), `${name}.json`, 'application/json')
    }

    function onInputChange(event) {
        let reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);
    }

    function onReaderLoad(event) {
        dispatch(newDictionary(JSON.parse(event.target.result)));
    }

    function loadDictionary() {
        document.getElementById('file').click();
    }

    function handleNameChange(e) {
        e.preventDefault();
        dispatch(updateDictionaryName(nameRef.current.value))
    }

    function handleToggleAutoSave() {
        dispatch(toggleAutoSave());
    }

    function loadLocalDictionary() {
        let loadedDictionary = localStorage.getItem(`splain_${name}`);
        if (loadedDictionary) dispatch(newDictionary(JSON.parse(loadedDictionary)));
    }

    function saveLocal() {
        localStorage.setItem(`splain_${name}`,JSON.stringify(entries))
    }


    return <div className="browserNav">
        <form onSubmit={handleNameChange}>
            <input defaultValue={name} ref={nameRef} onBlur={handleNameChange}/>
        </form>
        <button onClick={saveDictionary}>save</button>
        <button onClick={loadDictionary}>loadFile</button>
        <button onClick={loadLocalDictionary}>loadLocal</button>
        <button onClick={saveLocal}>SaveLocal</button>
        <button onClick={handleToggleAutoSave}>AS {autoSave?1:0}</button>

        <input id="file" type="file" className="browser-nav__file-load" onChange={onInputChange}/>
    </div>
}

export default BrowserNav
