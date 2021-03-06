import { default as Data } from "../codexes"
import { sample } from "lodash"

import random from "../utils/random"

const Codexes = Object.keys(Data)
  .reduce((a, c) => Data[c].isCodex === true ? {...a, [c]: Data[c]} : a, {})

const initialState = {
  Codexes,
  question: getQuestion([], Codexes)
}

const questionReducer = (state = initialState, action) => {
  let { names } = action
  switch (action.type){
    case "SET_QUESTION":
      return {
        ...state,
        question: getQuestion(names)
      }
    default:
      return state
  }
}

function getRandomArticle(codexName, idx){
  const codex = Codexes[codexName]
  if(idx) {
    return {
      article: codex.articles[idx],
      idx: idx + " " + codex.shortName,
      Codex: codex.id
    }
  }

  let randomIdx = sample(Object.keys(codex.articles))
  
  return {
    article: codex.articles[randomIdx],
    idx: randomIdx + " " + codex.shortName,
    Codex: codex.id
  }
}

function getQuestion(names = new Set([])){    
  let result = {
    vars: []
  }

  const getRandomCodex = () => {
    let keys = names.size ? [...names] : Object.keys(Codexes)
    return sample(keys)
  }

  const getArticle = idx => getRandomArticle(getRandomCodex(), idx)

  const getVariant = ({idx: articleNum, article: articleText}, isRight) => ({
    articleNum,
    articleText,
    isRight,
    color: 'transparent'
  })

  let rightVariant = random(0, 3)
  result.vars[rightVariant] = getVariant(getArticle(), true)
  result.rightVariant =  result.vars[rightVariant]
  result.rightIdx = rightVariant

  for(let i = 0; i < 4; i++){
    if(i === rightVariant) continue
    result.vars[i] = getVariant(getArticle())
  }
  
  return result
}

export default questionReducer