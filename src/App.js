import React from 'react';
import './App.scss';

import Browser from "./components/Browser/Browser";
import Workspace from "./components/Workspace/Workspace";
import Toolbar from "./components/Toolbar/Toolbar";


import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faDownload,
    faUpload,
    faSave,
    faPiggyBank,
    faCloudUploadAlt,
    faPlus,
    faMinus,
    faTrash
} from '@fortawesome/free-solid-svg-icons'

library.add(faDownload, faUpload, faSave, faPiggyBank, faCloudUploadAlt, faPlus, faMinus, faTrash);


function App() {
    return (
        <div className="app-container">
            <Browser/>
            <Workspace/>
            <Toolbar/>
        </div>
    );
}

export default App;
