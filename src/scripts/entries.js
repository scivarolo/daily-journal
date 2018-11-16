/*
  Purpose: Loops through entries from the database and outputs them to the DOM.
*/

import Entry from "./entry"
import DC from "nss-domcomponent"

function loadEntries(entries, wrapperEl) {
  document.querySelector(wrapperEl).innerHTML = ""
  let array = []
  entries.forEach(entry => array.push(new Entry(entry).element))
  new DC("div", {className: "entriesWrapper"}, ...array).render(wrapperEl)
}

export default loadEntries