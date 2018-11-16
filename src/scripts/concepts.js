/*
  Purpose: When an entry is submitted, this will go through the concepts and create entries in the entries_concepts joiner table based on the concepts in the concepts table
*/

// Split list of concepts into array

// For each concept in array, set up a fetch call to look for the concept in concepts table

// Do a Promise.all to search.

// If concept exists, grab the ID, if not, make a new entry and grab that id.

// For each concept, create an entry in entry_concepts with entryId and conceptId

import API from "./data"

const saveConcepts = (conceptsString, entryId) => {
  API.getConcepts()
  .then(dbConcepts => {
    let conceptsArray = conceptsString.split(", ")

    conceptsArray.forEach(concept => {

      let existingConcept = dbConcepts.find(dbConcept => concept.toLowerCase() === dbConcept.label.toLowerCase())

      if (existingConcept) {

        let entry_conceptsObj = {
          entryId: entryId,
          conceptId: existingConcept.id
        }
        API.saveData(entry_conceptsObj, "entry_concepts")
        .then(() => console.log(concept, "was saved"))

      } else {
        // create an entry in concepts with new label, and return new id
        // then create an entry in entry_concepts with Id and entryId
        let object = {
          label: concept
        }
        API.saveData(object, "concepts")
        .then(newConcept => {
          let entry_conceptsObj = {
            entryId: entryId,
            conceptId: newConcept.id
          }
          API.saveData(entry_conceptsObj, "entry_concepts")
        })
      }
    })
  })
}

export default saveConcepts