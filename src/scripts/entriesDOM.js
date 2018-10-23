/*
  Purpose: Create render object with method for outputting entries to the DOM.
  Function to loop through Entries array and build component for each entry.
  Each entry is appended to entriesFrag document fragment.
  Entries frag is appended to entriesWrapper in DOM.
*/

const render = Object.create({
  entries(entries, wrapperEl) {
    const entriesWrapper = document.querySelector(wrapperEl)
    const entriesFrag = document.createDocumentFragment()

    entries.forEach((entry) => {
      entriesFrag.appendChild(build.entry(entry))
    })

    entriesWrapper.appendChild(entriesFrag)
  }
})