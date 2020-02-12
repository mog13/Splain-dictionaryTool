import React from "react";
import {useSelector } from 'react-redux';
import BrowserEntry from "./BrowserEntry";
import {getEntries} from "../../store/reducers/DictionaryReducer";


import './browser.scss';
import BrowserNav from "./BrowserNav";


function Browser() {

    const entries = useSelector(getEntries);

    return <div className="browser">
        <BrowserNav />
        <BrowserEntry key={'root'} entries={entries} classNames="browser-entry--initial"/>
    </div>

}

export default Browser;
