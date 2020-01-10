import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {ChooseGame} from "./pages/ChooseGame"
import {Marga} from "./pages/Marga"
import CodexesGame from "./pages/CodexesGame"
import {connect} from "react-redux"

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App({app = "/choose"}) {
  return (<>
    <Switch>
      <Route path="/choose" component={ChooseGame}/>
      <Route path="/codexes" component={CodexesGame}/>
      <Route path="/marga" component={Marga}/>
      <Redirect from="/" to={"/" + app}/>
    </Switch>
  </>);
}

const MSTP = state => state.settings

export default connect(MSTP)(App)
