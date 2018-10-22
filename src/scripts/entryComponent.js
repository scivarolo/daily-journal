/* HTML Element Factory */
function buildEl(el, className, content, ...children) {
  let element = document.createElement(el);
  element.className = className || null;
  element.textContent = content || null;
  children.forEach((child) => {
    element.appendChild(child);
  });
  return element;
}

/*
  Create and return a journal entry component
*/

function buildEntry(entry) {

  let entryTitle = buildEl("h2", "entry__title", entry.title);
  let entryDate = buildEl("h3", "entry__date", entry.date);

  let concepts = [];
  entry.concepts.forEach((concept) => {
    concepts.push(buildEl("span", "concept", concept));
  });
  let entryConcepts = buildEl("div", "entry__concepts", null, ...concepts);

  let entryHeader = buildEl("header", "entry__header", null, entryTitle, entryDate, entryConcepts);

  let contentP = buildEl("p", null, entry.content);
  let entryContent = buildEl("div", "entry__content", null, contentP);

  let entryMood = buildEl("div", "entry__mood", `Mood: ${entry.mood}`,)
  let entryFooter = buildEl("footer", "entry__footer", null, entryMood);

  return buildEl("article", "entry", null, entryHeader, entryContent, entryFooter);
}
