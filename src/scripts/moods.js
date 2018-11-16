/*
  Purpose: Creates the mood filter
*/
import DC from "nss-domcomponent"
import API from "./data"
import loadEntries from "./entries"

function buildMoodsDropdown(moods) {
  moods.forEach(mood => {
    new DC("option", {value: mood.label, id: `mood-${mood.id}`}, mood.label).render("#entryMood")
  })
}

function buildMoodsFilter(moods) {
  let legend = new DC("legend", {}, "Filter Posts by Mood")
  let moodEls = []
  moods.push({label: "All"})
  moods.forEach(mood => {
    let moodLabel = new DC("label", {htmlFor: mood.label}, mood.label)
    let moodInput = new DC("input", {type: "radio", name: "moodFilter", value: mood.label})
    let wrapper = new DC("div", {className:"radio-wrapper"}, moodInput, moodLabel)
    moodEls.push(wrapper)
  })

  let div = new DC("div", {className: "radio-group"}, ...moodEls)
  new DC("fieldset", {}, legend, div).render("#mood-filter")
  }


export default () => {
  API.getMoods()
  .then(moods => {
    buildMoodsDropdown(moods)
    buildMoodsFilter(moods)
    return document.querySelectorAll(".radio-group input")
  })
  .then(moodFilters => {
    moodFilters.forEach(radio => {
      radio.addEventListener("click", event => {
        let mood = event.target.value
        if (mood === "All") {
          API.getEntries().then(entries => loadEntries(entries, "#entries"))
        } else {
          API.getEntries()
          .then(entries => entries.filter(entry => entry.mood.label.toLowerCase() === mood.toLowerCase()))
          .then(filteredEntries => {
            if(filteredEntries.length !== 0) {
              loadEntries(filteredEntries, "#entries")
            } else {
              document.querySelector("#entries").innerHTML = "There are no posts with that mood."
            }
          })
        }
      })
    })
  })
}