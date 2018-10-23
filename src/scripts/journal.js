/*
    Main application logic
    Queries the API and outputs the entries into the DOM
*/

entriesAPI.getJournalEntries()
  .then(entries => render.entries(entries, "#entries"))