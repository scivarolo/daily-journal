import DC from "nss-domcomponent"

class Input {
  constructor(id, inputType, labelText, wrapperClass) {
    this.id = id
    this.inputType = inputType
    this.labelText = labelText
    this.wrapperClass = wrapperClass
  }
  get element() {
    let label = new DC("label", {htmlFor: this.id}, this.labelText)
    let input
    if (this.inputType === "select") {
      input = new DC("select", {name: this.id, id: this.id, required: true})
    } else if (this.inputType === "textarea") {
      input = new DC("textarea", {name: this.id, id: this.id, cols: "30", rows: "10", required: true})
    } else if (this.inputType === "submit") {
      input = new DC("button", {type: "submit", required: true})
    } else {
      input = new DC("input", {type: this.inputType, id: this.id, name: this.id, required: true})
    }

    let wrapper = new DC("div", {className: `field-wrapper ${this.wrapperClass}`}, label, input)
    return wrapper
  }
}

function buildForm() {
  let title = new Input("entryTitle", "text", "Entry Title").element
  let content = new Input("entryContent", "textarea", "Journal Entry", "field__entry").element
  let date = new Input("entryDate", "date", "Entry Date", "field__date").element
  let concepts = new Input("entryConcepts", "text", "Concepts Covered", "field__concepts").element
  let mood = new Input("entryMood", "select", "Mood", "field__mood").element
  let optionsWrapper = new DC("div", {className: "field-group field-group__3col"}, date, concepts, mood)
  let save = new DC("button", {className: "submit-entry", type: "submit"}, "Save Journal Entry")
  let legend = new DC("legend", "Write an Entry")
  let fieldset = new DC("fieldset", legend, title, content, optionsWrapper, save)
  return new DC("form", {className: "entry-form"}, fieldset)
}

export default buildForm