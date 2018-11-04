/*
  Purpose: Interact with the API
  Creates API object with methods for interacting with the API
*/

const API = {
  urls: {
    entries: "http://localhost:8088/entries",
    moods: "http://localhost:8088/moods"
  },
  getEntries() {
    return fetch(this.urls.entries)
      .then(response => response.json())
  },
  postEntry(entry) {
    return fetch(this.urls.entries, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  },
  postThenGet(entry) {
    return this.postEntry(entry)
      .then(() => API.getEntries())
  },
  getLatestEntry(entry) {
    let latestUrl = `${this.urls.entries}?_order=desc&_limit=1`
    return fetch(latestUrl)
      .then(response => response.json())
  },
  getMoods() {
    return fetch(this.urls.moods)
      .then(response => response.json())
  }
}