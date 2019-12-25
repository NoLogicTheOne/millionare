import * as OldCodexes from "../codexes"
import { getRandomArticle } from "./getRandomArticle"
import { getQuestion } from "./getQuestion"

let Codexes = {...OldCodexes}

for(let key in Codexes){
  Codexes[key].getRandomArticle = getRandomArticle.bind(Codexes[key])
}

Codexes.getQuestion = getQuestion.bind(Codexes)

export { Codexes }
