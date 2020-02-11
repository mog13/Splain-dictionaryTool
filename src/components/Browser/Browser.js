import React from "react";
import {useSelector } from 'react-redux';
import BrowserEntry from "./BrowserEntry";
import {getEntries} from "../../store/reducers/DictionaryReducer";


import './browser.scss';


function Browser() {

    const entries = useSelector(getEntries);

    return <div className="browser">
        <h1>i am browser</h1>
        <BrowserEntry key={'root'} entries={entries}/>
    </div>

}

export default Browser;
