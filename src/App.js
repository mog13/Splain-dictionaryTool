import React from 'react';
import './App.css';
import Editor from "./components/editor/Editor";
import Explorer from "./components/explorer/Explorer";
import Splain from "@mog13/splain"
Splain.addEntry({test:['hello']});
function App() {


  return (
  <Editor loadedDictionary={Splain.dictionaries.default}>
   <h1>coming soon</h1>
    <Explorer/>
  </Editor>
  );
}

export default App;
