import { createContext, useContext, useReducer } from "react";

const NotesContext = createContext();
const useNotesContext = () => useContext(NotesContext);

const notesReducer = (state, { type, payload }) => {
  switch (type) {
    case "USER":
      return { ...state, user: payload };
    case "NOTES":
      return { ...state, user: { ...state.user, notes: payload } };
    case "TITLE":
      return { ...state, title: payload };
    case "DESCRIPTION":
      return { ...state, description: payload };
    case "NOTE_ID":
      return { ...state, noteId: payload };
    case "ON_CLICK_EDIT_ICON":
      return { ...state, ...payload };
    case "CLEAR_NOTES_INPUTS":
      return {
        ...state,
        title: "",
        description: "",
        noteId: null,
      };
    case "DISPLAY_MODAL":
      return { ...state, isDisplayModal: payload };
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
  });

  const value = { notesState, notesDispatch };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export { useNotesContext, NotesProvider };
