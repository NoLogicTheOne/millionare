/* 
return random article from codex-object
need to bind to a codex interface
  interface codex: {
    id: Number,
    header: String,
    shortName: String,
    articles: Object
  }

  params:
  id: Number - if defined, return an article with this id

  returned interface RandomArticle: {
    article: String,
    idx: String
  }
*/

// construction with arrow function cannot be binding!!
export function getRandomArticle (id) {
    if(!this) {
        throw new Error(`function needs spetial this argument`)
    }

    if(id){
        if(!this.articles[id]){
            throw new Error("This id is not defined")
        }
        return {
            article: this.articles[id],
            idx: id
        }
    }
    
    let keys = Object.keys(this.articles)
    let len = keys.length
    let randomIdx = keys[(len * Math.random()) | 0]

    return {
        article: this.articles[randomIdx], 
        idx: randomIdx + " " + this.shortName,
        Codex: this.id
    }
}