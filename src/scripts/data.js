/*
  Purpose: Interact with the API
  Creates API object with methods for interacting with the API
*/


// Generic API Object to use with Object.create
const API = {
  getJournalEntries () {
    return fetch(this.url)
      .then(response => response.json())
  }
}

// Create entriesAPI based on API and add a url property.
const entriesAPI = Object.create(API)
entriesAPI.url = "http://localhost:8088/entries"