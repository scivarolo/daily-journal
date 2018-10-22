/*
  Purpose: Interact with the API
  Creates API object with methods for interacting with the API
*/

const API = {
  getJournalEntries () {
    return fetch("http://localhost:8088/entries")
      .then(response => response.json())
  }
}