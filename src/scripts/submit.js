/*
  Purpose: Adds the submit functionality to the form
*/

import API from "./data"
import loadEntries from "./entries"
import saveConcepts from "./concepts";

export default () => {
  document.querySelector(".submit-entry").addEventListener("click", (e) => {
    e.preventDefault()
    if(document.querySelector(".entry-form").checkValidity()) {
      let title = document.querySelector("#entryTitle").value
      let content = document.querySelector("#entryContent").value
      let date = document.querySelector("#entryDate").value
      let concepts = document.querySelector("#entryConcepts").value
      let selected = document.querySelector("#entryMood").options.selectedIndex
      let moodId = document.querySelector("#entryMood").options[selected].id.split("-")[1]

      let entryObj = {
        title: title,
        content: content,
        date: date,
        moodId: moodId
      }

      API.postThenGet(entryObj)
        .then(entries => loadEntries(entries, "#entries"))
        .then(() => {
          API.getLatestEntry()
          .then(entry => {
            saveConcepts(concepts, entry[0].id)
          })
        })
    } else {
      alert("There are some empty fields!")
    }
  })
}