/*
  Purpose: Interact with the API
  Creates API object with methods for interacting with the API
*/

const API = {
  url: "http://localhost:8088/entries",
  getEntries() {
    return fetch(this.url)
      .then(response => response.json())
  },
  postEntry(entry) {
    return fetch(this.url, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
  },
  getLatestEntry(entry) {
    let latestUrl = `${this.url}?_order=desc&_limit=1`
    return fetch(latestUrl)
      .then(response => response.json())
  }
}