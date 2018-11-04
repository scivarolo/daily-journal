const form = {
  build() {
    const fragment = document.createDocumentFragment();

    function buildFormElement(id, inputType, labelText) {
      let label = build.element("label", {for: id}, labelText)
      let input
      if (inputType === "select") {
        input = build.element("select", {name: id, id: id, required: true})
      } else if (inputType === "textarea") {
        input = build.element("textarea", {name: id, id: id, cols: "30", rows: "10", required: true})
      } else if (inputType === "submit") {
        input = build.element("button", {type: "submit", required: true})
      } else {
        input = build.element("input", {type: inputType, id: id, name: id, required: true})
      }
      let fragment = document.createDocumentFragment()
      fragment.appendChild(label)
      fragment.appendChild(input)
      return fragment
    }

    //Entry Title
    let titleEls = buildFormElement("entryTitle", "text", "Entry Title")
    let titleWrapper = build.element("div", {class: "field-wrapper"}, null, titleEls)

    //Entry Content
    let contentEls = buildFormElement("entryContent", "textarea", "Journal Entry")
    let contentWrapper = build.element("div", {class: "field-wrapper field__entry"}, null, contentEls)

    //Entry Date
    let dateEls = buildFormElement("entryDate", "date", "Entry Date")
    let dateWrapper = build.element("div", {class: "field-wrapper field__date"}, null, dateEls)

    //Concepts
    let conceptEls = buildFormElement("entryConcepts", "text", "Concepts Covered")
    let conceptWrapper = build.element("div", {class: "field-wrapper field__concepts"}, null, conceptEls)
    conceptWrapper.childNodes[1].setAttribute("maxlength", "30")
    conceptWrapper.childNodes[1].addEventListener("keyup", event => {
      if(event.target.value.length === 30) {
        event.target.parentNode.classList.add("maxlength")
      } else {
        event.target.parentNode.classList.remove("maxlength")
      }
    })
    //Mood
    let moodEls = buildFormElement("entryMood", "select", "Mood")
    let moodWrapper = build.element("div", {class: "field-wrapper field__mood"}, null, moodEls)

    let optionsWrapper = build.element("div", {class:"field-group field-group__3col"}, null, dateWrapper, conceptWrapper, moodWrapper)

    //Save Button
    let saveButton = build.element("button", {class: "submit-entry", type: "submit"}, "save Journal Entry")

    let legend = build.element("legend", {}, "Write an Entry")
    let fieldset = build.element("fieldset", {}, null, legend, titleWrapper, contentWrapper, optionsWrapper, saveButton)
    let entryForm = build.element("form", {class: "entry-form"}, null, fieldset)

    return entryForm
  },
  buildMoods(moods) {
    let moodEls = document.createDocumentFragment()
    moods.forEach(mood => {
      let moodEl = build.element("option", {value: mood.mood}, mood.mood)
      moodEls.appendChild(moodEl)
    })
    return moodEls
  }
}