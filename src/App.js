import React from 'react';
import './App.css';
import Editor from "./components/editor/Editor";
import Explorer from "./components/explorer/Explorer";
import Splain from "@mog13/splain"
import Inspector from "./components/inspector/inspector";
import Preview from "./components/preview/preview";
import Nav from "./components/nav/Nav";

function App() {
    let backupDictionary = localStorage.getItem('backup');
    const dictionaryReference = backupDictionary ? JSON.parse(backupDictionary) :  Splain.dictionaries.default;

  return (
  <Editor loadedDictionary={dictionaryReference}>
    <Nav/>
    <Explorer/>
    <Inspector/>
    <Preview/>
  </Editor>
  );
}

export default App;
