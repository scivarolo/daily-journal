/*
  Purpose: Build object with methods to build HTML Elements and build entries out of those elements.
*/

const build = {

  element(el, attrObj, content, ...children) {
    // HTML Element Factory
    let element = document.createElement(el)
    for(let attr in attrObj) {
      element.setAttribute(attr, attrObj[attr])
    }
    element.textContent = content || null
    children.forEach((child) => {
      element.appendChild(child)
    })
    return element
  },

  entry(entry) {
    // Build entry component
    let entryTitle = this.element("h2", {class: "entry__title"}, entry.title)
    let entryDate = this.element("h3", {class: "entry__date"}, entry.date)

    let concepts = []
    entry.concepts.forEach((concept) => {
      concepts.push(this.element("span", {class: "concept"}, concept))
    })
    let entryConcepts = this.element("div", {class: "entry__concepts"}, null, ...concepts)

    let entryHeader = this.element("header", {class: "entry__header"}, null, entryTitle, entryDate, entryConcepts)

    let contentP = this.element("p", {}, entry.content)
    let entryContent = this.element("div", {class: "entry__content"}, null, contentP)

    let entryMood = this.element("div", {class: "entry__mood"}, `Mood: ${entry.mood}`)
    let entryFooter = this.element("footer", {class: "entry__footer"}, null, entryMood)

    return this.element("article", {class: "entry"}, null, entryHeader, entryContent, entryFooter)
  }
}

export default build