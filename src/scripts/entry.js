/*
  Purpose: Defines an Entry class for build a journal entry ready for output to the DOM.
*/

import DC from "nss-domcomponent"

class Entry {

  constructor(props) {
    this.title = props.title
    this.date = props.date
    this.concepts = props.concepts
    this.content = props.content
    this.mood = props.mood.label
  }

  get element() {
    const eTitle = new DC("h2", {className: "entry__title"}, this.title)
    const eDate = new DC("h3", {className: "entry__date"}, this.date)
    let concepts = []
    this.concepts.forEach(concept => {
      concepts.push(new DC("span", {className: "concept"}, concept))
    })
    let eConcepts = new DC("div", {className: "entry__concepts"}, ...concepts)
    let eHeader = new DC("header", {className: "entry__header"}, eTitle, eDate, eConcepts)
    let contentP = new DC("p", this.content)
    let eContent = new DC("div", {className: "entry__content"}, contentP)
    let eMood = new DC("div", {className: "entry__mood"}, `Mood: ${this.mood}`)
    let eFooter = new DC("footer", {className:"entry__footer"}, eMood)

    return new DC("article", {className:"entry"}, eHeader, eContent, eFooter)
  }
}

export default Entry