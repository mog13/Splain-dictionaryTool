import React from 'react';

let toolbarContextDefault = {
    activeWindow: 'default',
    setActiveWindow: ()=>{}
};

export const ToolbarContext = React.createContext(toolbarContextDefault);
