import React, {useState, useEffect} from "react";
import ToolbarNav from "./ToolbarNav";
import {ToolbarContext} from "../../contexts";
import buttons from './ToolbarNavButtons';

import './toolbar.scss';

function Toolbar() {
    const [activeWindow, setActiveWindow] = useState('preview');
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        setActiveButton(buttons.find((button) => button.name === activeWindow) || null)
    }, [activeWindow]);

    return <div className="toolbar">
        <ToolbarContext.Provider value={{activeWindow, setActiveWindow}}>
            <ToolbarNav/>
            <div className="toolbar__window">
                {activeButton? activeButton.component : <h1> unimplemented </h1>}
            </div>
        </ToolbarContext.Provider>
    </div>
}

export default Toolbar;
