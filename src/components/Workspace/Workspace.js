import React from "react";
import Splain from "@mog13/splain";


function Workspace() {

     function test() {
         console.log('it works');
         Splain.addEntry({dsfg: ['hello', 'howdy']});
     }
    return <div className="workspace">
        <h1 onClick={test}>i am workspace</h1>
    </div>
}

export default Workspace;
