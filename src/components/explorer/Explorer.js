import React from 'react';
import DictionaryKey from "./DictionaryKey";

import './explorer.scss'

function Explorer() {
    return <div className="explorer">
        <h1 className='explorer__header'>Dictionary</h1>
          <DictionaryKey  initialOpen={true} key={"entries-root"} path="entries"/>
        </div>;
}

export default Explorer;