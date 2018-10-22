/*
  Prepare to output entries to DOM
  Collecting the wrapper from DOM
  Create a document fragment to collect the Entry components.
*/

const entriesWrapper = document.querySelector("#entries");
const entriesFrag = document.createDocumentFragment();

/*
  Function to loop through Entries array and build component for each entry.
  Each entry is appended to entriesFrag document fragment.
  Entries frag is appended to entriesWrapper in DOM.
*/

function outputEntries(entries) {
  entries.forEach((entry) => {
    entriesFrag.appendChild(buildEntry(entry));
  });
  entriesWrapper.appendChild(entriesFrag);
}