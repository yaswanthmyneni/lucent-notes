import { createContext, useContext, useReducer } from "react";

const NotesContext = createContext();
const useNotesContext = () => useContext(NotesContext);

const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case "USER":
      return { ...state, user: payload };
    case "NOTES":
      return { ...state, user: { ...state.user, notes: payload } };
    case "ADD_TO_ARCHIVE":
    case "UPDATE_ARCHIVE":
      return { ...state, user: { ...state.user, archives: payload } };
    case "TITLE":
      return { ...state, title: payload };
    case "DESCRIPTION":
      return { ...state, description: payload };
    case "LABEL_FOR_NOTE":
      return { ...state, labelForNote: payload };
    case "PRIORITY":
      return { ...state, priorityForNote: payload };
    case "NOTE_ID":
      return { ...state, noteId: payload };
    case "ON_CLICK_EDIT_ICON":
      return { ...state, ...payload };
    case "CLEAR_NOTES_INPUTS":
      return {
        ...state,
        title: "",
        description: "",
        labelForNote: "",
        priorityForNote: "",
        backgroundColor: "",
        noteId: null,
      };
    case "DISPLAY_MODAL":
      return { ...state, isDisplayModal: payload };
    case "SET_COLOR":
      return { ...state, backgroundColor: payload };
    default:
      return state;
  }
};

const NotesProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(notesReducer, {
    user: {},
    title: "",
    description: "",
    noteId: null,
    isDisplayModal: false,
    backgroundColor: "",
    labelForNote: "",
    priorityForNote: "",
  });

  const value = { notesState, notesDispatch };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export { useNotesContext, NotesProvider };
