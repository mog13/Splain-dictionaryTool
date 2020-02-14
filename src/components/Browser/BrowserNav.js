import React, {useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAutoSave, getDictionaryName, getEntries} from "../../store/reducers/DictionaryReducer";
import {newDictionary, toggleAutoSave, updateDictionaryName} from "../../store/actions/DictionaryActions";

import './browser-nav.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
        let loadName = prompt('What dictionary would you like to load?', name );
        let loadedDictionary = localStorage.getItem(`splain_${loadName}`);
        if (loadedDictionary) {
            dispatch(newDictionary(JSON.parse(loadedDictionary)));
            dispatch(updateDictionaryName(loadName));
            nameRef.current.value = loadName;
        }
    }

    function saveLocal() {
        localStorage.setItem(`splain_${name}`, JSON.stringify(entries))
    }


    return <div className="browser-nav">

        <div className="browser-nav__toolbox">
            <button onClick={saveDictionary}><FontAwesomeIcon icon="download" size={"lg"}/></button>
            <button onClick={loadDictionary}><FontAwesomeIcon icon="upload" size={"lg"}/></button>
            <button onClick={saveLocal}><FontAwesomeIcon icon="save" size={"lg"}/></button>
            <button onClick={loadLocalDictionary}><FontAwesomeIcon icon="cloud-upload-alt" size={"lg"}/></button>
            <button onClick={handleToggleAutoSave} className={`auto-save ${autoSave?'auto-save--active': ''}`}><FontAwesomeIcon icon="piggy-bank" size={"lg"}/></button>

            <input id="file" type="file" className="file-load" onChange={onInputChange}/>
        </div>
        <div className="browser-nav__name">
            <label>Name: </label>
            <form onSubmit={handleNameChange} className="browser-nav__name__form">
                <input className="browser-nav__name__input" defaultValue={name} ref={nameRef}
                       onBlur={handleNameChange}/>
            </form>
        </div>
    </div>
}

export default BrowserNav
