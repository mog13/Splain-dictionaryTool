import React, {useContext} from 'react';
import {ToolbarContext} from "../../contexts";

import buttons from './ToolbarNavButtons';

function ToolbarNav() {

    const {activeWindow, setActiveWindow} = useContext(ToolbarContext);




    return <div className="toolbar-nav">
        {buttons.map((button)=>{
            return <button onClick={()=>{setActiveWindow(button.name)}}
            className={`toolbar-nav__button ${activeWindow===button.name? 'toolbar-nav__button--active':''}`}>
                {button.name}
            </button>
        })}
    </div>
}

export default ToolbarNav;
