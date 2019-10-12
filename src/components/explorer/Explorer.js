import React from 'react';
import DictionaryKey from "./DictionaryKey";

import './explorer.scss'

function Explorer() {
    return <div>
          <DictionaryKey key={"entries"} path="entries"/>
        </div>;
}

export default Explorer;