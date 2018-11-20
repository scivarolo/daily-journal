/*
  Purpose: Interact with the API
  Contains an API object with methods for interacting with the API
*/

const API = {
  urls: {
    base: "http://localhost:8088/",
    entries: "http://localhost:8088/entries?_expand=mood",
    moods: "http://localhost:8088/moods",
    entryConcepts: "http://localhost:8088/entry_concepts",
    concepts: "http://localhost:8088/concepts"
  },
  getEntries() {
    return fetch(this.urls.entries)
      .then(response => response.json())
  },
  saveData(entry, resource) {
    let url = this.urls.entries
    if(resource) { url = `${this.urls.base}${resource}`}
    return fetch(url, {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entry)
    })
    .then(response => response.json())
  },
  postThenGet(entry) {
    return API.saveData(entry)
      .then(() => API.getEntries())
  },
  getLatestEntry() {
    let latestUrl = `${this.urls.base}entries?_sort=id&_order=desc&_limit=1`
    return fetch(latestUrl)
      .then(response => response.json())
  },
  getMoods() {
    return fetch(this.urls.moods)
      .then(response => response.json())
  },
  getEntryConcepts(entryId) {
    let url = `${this.urls.entryConcepts}?entryId=${entryId}&_expand=concept`
    return fetch(url)
    .then(response => response.json())
  },
  getConcepts(entryId) {
    let url = this.urls.concepts
    if(entryId) {
      url = `${this.urls.concepts}?entryId=${entryId}`
    }
    return fetch(url)
    .then(response => response.json())
  }
  // http://localhost:8088/entry_concepts?entryId=1&_expand=concept
}

export default API