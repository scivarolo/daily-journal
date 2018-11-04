/*
  Main application logic
  Queries the API and outputs the entries into the DOM
*/

/* Render the Form and get Moods from database */

render.form(form.build(), ".form-wrapper")
API.getMoods()
  .then(moods => {
    document.querySelector("#entryMood").appendChild(form.buildMoods(moods))
  })


/* Render the entries from the Database */

API.getEntries()
  .then(entries => render.entries(entries, "#entries"))

/*
  Event Listener to submit new entries from form
*/

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
    // API.postEntry(entryObj)
    //   .then(render.entry(entryObj, "#entries"))
    //   .then(() => alert("Your entry was posted"))
  } else {
    alert("There are some empty fields!")
  }
})