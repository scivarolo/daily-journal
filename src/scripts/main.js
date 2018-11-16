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
.then(entries => loadEntries(entries, "#entries"))

/* Moods filter */
moods()