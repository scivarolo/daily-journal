/*
  Purpose: Interact with the API
  Creates API object with methods for interacting with the API
*/

const API = {
  getJournalEntries () {
    return fetch(this.url)
      .then(response => response.json())
  }
}

const entriesAPI = Object.create(API)
entriesAPI.url = "http://localhost:8088/entries"