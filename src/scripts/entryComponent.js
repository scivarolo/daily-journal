/*
  Purpose: Build object with methods to build HTML Elements and build entries out of those elements.
*/

const build = Object.create({
  element(el, className, content, ...children) {
    // HTML Element Factory
    let element = document.createElement(el)
    element.className = className || null
    element.textContent = content || null
    children.forEach((child) => {
      element.appendChild(child)
    })
    return element
  },
  entry(entry) {
    // Build entry component
    let entryTitle = this.element("h2", "entry__title", entry.title)
    let entryDate = this.element("h3", "entry__date", entry.date)

    let concepts = []
    entry.concepts.forEach((concept) => {
      concepts.push(this.element("span", "concept", concept))
    })
    let entryConcepts = this.element("div", "entry__concepts", null, ...concepts)

    let entryHeader = this.element("header", "entry__header", null, entryTitle, entryDate, entryConcepts)

    let contentP = this.element("p", null, entry.content)
    let entryContent = this.element("div", "entry__content", null, contentP)

    let entryMood = this.element("div", "entry__mood", `Mood: ${entry.mood}`)
    let entryFooter = this.element("footer", "entry__footer", null, entryMood)

    return this.element("article", "entry", null, entryHeader, entryContent, entryFooter)
  }
})
