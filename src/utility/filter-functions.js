const filterByLabel = (allNotes, label) => {
  const { home, food, office } = label;
  if (food && office && home) {
    return allNotes;
  } else if (food && office) {
    return allNotes.filter((note) => note.label !== "home");
  } else if (food && home) {
    return allNotes.filter((note) => note.label !== "office");
  } else if (office && home) {
    return allNotes.filter((note) => note.label !== "food");
  } else if (office) {
    return allNotes.filter((note) => note.label === "office");
  } else if (home) {
    return allNotes.filter((note) => note.label === "home");
  } else if (food) {
    return allNotes.filter((note) => note.label === "food");
  } else {
    return allNotes;
  }
};

const filterByPriority = (allNotes, priority) => {
  const { low, medium, high } = priority;
  if (medium && high && low) {
    return allNotes;
  } else if (medium && high) {
    return allNotes.filter((note) => note.priority !== "low");
  } else if (medium && low) {
    return allNotes.filter((note) => note.priority !== "high");
  } else if (high && low) {
    return allNotes.filter((note) => note.priority !== "medium");
  } else if (high) {
    return allNotes.filter((note) => note.priority === "high");
  } else if (low) {
    return allNotes.filter((note) => note.priority === "low");
  } else if (medium) {
    return allNotes.filter((note) => note.priority === "medium");
  } else {
    return allNotes;
  }
};

const sortByDate = (allNotes, latest) => {
  if (latest) {
    return allNotes?.sort(
      (a, b) => new Date(b.dateAndTime) - new Date(a.dateAndTime)
    );
  } else {
    return allNotes?.sort(
      (a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime)
    );
  }
};

export { filterByLabel, filterByPriority, sortByDate };
