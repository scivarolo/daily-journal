/*
  Main application logic
  Queries the API and outputs the entries into the DOM
*/

/* Render the Form and get Moods from database to populate dropdown and mood filter */

render.form(form.build(), ".form-wrapper")

API.getMoods()
  .then(moods => {
    $("#entryMood").append(form.buildMoods(moods))
    $("#mood-filter").append(form.buildMoodsFilter(moods))
    return document.querySelectorAll(".radio-group input")
  })
  .then(moodFilters => {
    moodFilters.forEach(radio => {
      radio.addEventListener("click", event => {
        let mood = event.target.value
        if (mood === "All") {
          API.getEntries().then(entries => render.entries(entries, "#entries"))
        } else {
          API.getEntries()
          .then(entries => entries.filter(entry => entry.mood.toLowerCase() === mood.toLowerCase()))
          .then(filteredEntries => {
            if(filteredEntries != 0) {
              render.entries(filteredEntries, "#entries")
            } else {
              document.querySelector("#entries").innerHTML = "There are no posts with that mood."
            }
          })
        }

      })
    })
  })

/* Render the entries from the Database */

API.getEntries()
  .then(entries => render.entries(entries, "#entries"))

/*
  Event Listener to submit new entries from form
*/

$(".submit-entry").click(function (e) {
  e.preventDefault()
  if(document.querySelector(".entry-form").checkValidity()) {
    let title = $("#entryTitle").val()
    let content = $("#entryContent").val()
    let date = $("#entryDate").val()
    let concepts = $("#entryConcepts").val()
    let mood = $("#entryMood").val()

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