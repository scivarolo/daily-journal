/*
  Purpose: Interact with the API
  Contains an API object with methods for interacting with the API
*/

const API = {
  urls: {
    entries: "http://localhost:8088/entries?_expand=mood",
    moods: "http://localhost:8088/moods",
    concepts: "http://localhost:8088/entry_concepts"
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
  },
  getConcepts(entryId) {
    let url = `${this.urls.concepts}?entryId=${entryId}&_expand=concept`
    return fetch(url)
    .then(response => console.log(response.json()))
  }
  // http://localhost:8088/entry_concepts?entryId=1&_expand=concept
}

export default API