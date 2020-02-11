import React, {useState} from "react";

import './browser-entry.scss';

function BrowserEntry({entries, name}) {
    const [collapsed, setCollapsed] = useState(name);

    function toggleCollapsed() {
        setCollapsed(!collapsed);
    }

    return <div className="browser-entry">
        {name && <p className="browser-entry__name" onClick={toggleCollapsed}>{name} </p>}
        {!collapsed && Object.keys(entries).map(key => {
            if (!Array.isArray(entries[key])) {
                return <BrowserEntry key={key} name={key} entries={entries[key]}/>;
            }
            else{
               return <p className="browser-entry__entries">{key}</p>
            }

        })}
    </div>
}

export default BrowserEntry;
