import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {ChooseGame} from "./pages/ChooseGame"
import {Marga} from "./pages/Marga"
import Cascading from "./pages/Cascading"
import CodexesGame from "./pages/CodexesGame"
import {connect} from "react-redux"

import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App({app = "/choose"}) {
  return (<>
    <Switch>
      {/* for my sweety wife temporary solution for fastest work*/}
      {/* <Route path="/choose" component={ChooseGame}/> */}
      {/* <Route path="/codexes" component={CodexesGame}/> */}
      <Route path="/" component={Marga}/>
      {/* <Route path="/cascading" component={Cascading}/> */}
      {/* <Redirect from="/" to={"/marga"}/> */}
    </Switch>
  </>);
}

const MSTP = state => state.settings

export default connect(MSTP)(App)
