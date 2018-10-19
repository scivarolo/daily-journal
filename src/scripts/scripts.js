/* 
  Create and return a journal entry component
*/

const buildEntryComponent = (entry) => {
  let entryHTML = document.createElement('article');
  entryHTML.className = "entry";
  entryHTML.innerHTML = `
    <header class="entry__header">
      <h2 class="entry__title">${entry.title}</h2>
      <h3 class="entry__date">${entry.date}</h3>
      <div class="entry__concepts">${entry.concepts.join(", ")}</div>
    </header>
    <div class="entry__content">
      <p>${entry.content}</p>
    </div>
    <footer class="entry__footer">
      <div class="entry__mood">${entry.mood}</div>
    </footer>
  `;
  return entryHTML;
}

/* 
  Prepare to output entries to DOM
  Collecting the wrapper from DOM
  Create a document fragment to collect the Entry components.
*/

const entriesWrapper = document.querySelector('#entries');
const entriesFrag = document.createDocumentFragment();

/* 
  Function to loop through Entries array and build component for each entry.
  Each entry is appended to entriesFrag document fragment.
  Entries frag is appended to entriesWrapper in DOM.
*/

const outputEntries = (entries) => {
  entries.forEach((entry) => {
    entriesFrag.appendChild(buildEntryComponent(entry));
  });
  entriesWrapper.appendChild(entriesFrag);
}

//outputEntries(journalEntries);

/* 
  Fetch journal entries from the API
  Output entries to the DOM with outputEntries();
*/

fetch('http://localhost:8088/entries')
  .then(response => response.json())
  .then(entries => {
    outputEntries(entries);
  });
