import React from 'react'
import { Switch, Route } from 'react-router-dom'

import {ChooseGame} from "./ChooseGame"
import {Marga} from "./Marga"
import CodexesGame from "./CodexesGame"

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (<>
    <Switch>
      <Route exact path="/" component={ChooseGame}/>
      <Route path="/codexes" component={CodexesGame}/>
      <Route path="/marga" component={Marga}/>
    </Switch>
  </>);
}

export default App;
