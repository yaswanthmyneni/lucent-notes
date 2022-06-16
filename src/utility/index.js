export {
  submitSignInDetails,
  submitSignUpDetails,
} from "./authentication-functions";
export { getUniqueNumber } from "./common-functions";
export { getNotes, addToNotes, editNote, deleteNote } from "./note-functions";
export {
  getArchivedNotes,
  addToArchive,
  restoreArchivedNote,
  deleteNoteFromArchive,
} from "./archive-functions";
export {
  filterByLabel,
  filterByPriority,
  sortByDate,
  filterBySearch,
} from "./filter-functions";
export {
  getAllTrashNotes,
  addToTrash,
  restoreTrashedNote,
  deleteTrashedNote,
} from "./trash-functions";
