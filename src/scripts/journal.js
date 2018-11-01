/*
  Main application logic
  Queries the API and outputs the entries into the DOM
*/

API.getEntries()
  .then(entries => render.entries(entries, "#entries"))

/*
  Event Listener to submit new entries from form
*/

document.querySelector(".submit-entry").addEventListener("click", (e) => {
  //e.preventDefault()
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
  API.postEntry(entryObj)
    .then(render.entry(entryObj, "#entries"))
    .then(alert("Your entry was posted"))
})