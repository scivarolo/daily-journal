/*
  Main application logic
  Queries the API and outputs the entries into the DOM
*/

import API from "./data"
import buildForm from "./form"
import loadEntries from "./entries"
import submitListener from "./submit"
import moods from "./moods";

/* Render the Form and get Moods from database to populate dropdown and mood filter */

buildForm().render(".form-wrapper")

/* Event Listener to submit new entries from form */
submitListener()

/* Render the entries from the Database */
API.getEntries()
.then(entries => {
  let conceptPromises = []
  // set up Promises to get the concepts that go with each entry and add them to the entry object.
  entries.forEach(entry => {
    conceptPromises.push(
      API.getEntryConcepts(entry.id)
      .then(concepts => {
        entry.concepts = concepts
        return entry
      })
    )
  })
  return Promise.all(conceptPromises)
})
.then(entries => loadEntries(entries, "#entries"))

/* Moods filter */
moods()