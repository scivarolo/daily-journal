/*
    Main application logic
    Queries the API and outputs the entries into the DOM
*/

API.getJournalEntries().then(entries => outputEntries(entries, "#entries"))