/* 
return valid question from codexes-object
need to bind to a codex interface
  interface codexes: {
    codex1: Codex,
    codex2: Codex...
  }

  params:
  Codex: String - if defined, return a question only from this codex

  returned interface Question: {
    vars: Array of Variant,
    rightVariant: Number,
    rightIdx: Number
  }

  interface Variant: {
      articleNum: Number,
      articleText: String,
      isRight: Bool,
      color: String,
      setColor: function
  }
*/

export function getQuestion(Codex) {
    let result = {
      vars: []
    }

    const getRandomCodex = () => {
        let keys = Object.keys(this)
        keys = keys.filter(c => typeof this[c] !== "function")
        let len = keys.length
        let randomIdx = (Math.random() * len) | 0

        return keys[randomIdx]
    }

    const getArticle = (idx) => Codex 
        ? this[Codex].getRandomArticle(idx)
        : this[getRandomCodex()].getRandomArticle(idx)

    const getVariant = ({idx: articleNum, article: articleText}, isRight) => ({
        articleNum,
        articleText,
        isRight,
        color: 'transparent',
        setColor: (color) => {this.color = color} 
    })

    let rightVariant = (Math.random() * 4) | 0
    result.vars[rightVariant] = getVariant(getArticle(), true)
    result.rightVariant =  result.vars[rightVariant]
    result.rightIdx = rightVariant

    for(let i = 0; i < 4; i++){
      if(i == rightVariant) continue
      result.vars[i] = getVariant(getArticle())
    }

    // result.rightVariant = rightVariant

    return result
  }