/*
  Purpose: Adds the submit functionality to the form
*/

import API from "./data"

export default () => {
  document.querySelector(".submit-entry").addEventListener("click", (e) => {
    e.preventDefault()
    if(document.querySelector(".entry-form").checkValidity()) {
      let title = document.querySelector("#entryTitle").value
      let content = document.querySelector("#entryContent").value
      let date = document.querySelector("#entryDate").value
      let concepts = document.querySelector("#entryConcepts").value
      let mood = document.querySelector("#entryMood").value

      let entryObj = {
        title: title,
        content: content,
        date: date,
        concepts: concepts.split(", "),
        mood: mood
      }

      API.postThenGet(entryObj)
        .then(entries => render.entries(entries, "#entries"))
        .then(() => alert("Your entry was posted"))
    } else {
      alert("There are some empty fields!")
    }
  })
}