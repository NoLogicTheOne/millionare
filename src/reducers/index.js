import { combineReducers } from "redux"

import { default as main } from "./main"
import { default as qwestion } from "./question"
import {default as variants} from './variants'

export default combineReducers({main, qwestion, variants})