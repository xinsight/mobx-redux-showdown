import React from 'react';
// import { RecoilRoot, useSetRecoilState } from 'recoil'
import { RecoilRoot } from 'recoil'
import ValueSetDisplay, { ValueSetModel, Dispatcher } from './ValueSetDisplay'

import './App.css';


function App() {

  return (
    <RecoilRoot>
      <div className="App">
        {/* ?: do we need the dispatcher here? */}
        <Dispatcher />
        <ValueSetDisplay code="34206005" valueSet="511308" />
        <ValueSetDisplay code="6064005" valueSet="511308" />
        <ValueSetDisplay code="non-existent-code" valueSet="511308" />
      </div>
    </RecoilRoot>
  );
}

export default App;
