import React from 'react';
import './App.scss';

import Browser from "./components/Browser/Browser";
import Workspace from "./components/Workspace/Workspace";
import Toolbar from "./components/Toolbar/Toolbar";

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
