import { createContext, useContext, useReducer } from "react";

const NotesContext = createContext();
const useNotesContext = () => useContext(NotesContext);

const initialFilterState = {
  label: {
    home: false,
    food: false,
    office: false,
  },
  priority: {
    low: false,
    medium: false,
    high: false,
  },
  sortByLatest: true,
};

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
    case "SET_LABEL":
      return { ...state, label: { ...state.label, ...payload } };
    case "SET_PRIORITY":
      return { ...state, priority: { ...state.priority, ...payload } };
    case "SET_LATEST":
      return { ...state, sortByLatest: payload };
    case "RESET_FILTERS":
      return {
        ...state,
        ...initialFilterState,
      };
    case "HAMBURGER":
      return {
        ...state,
        isHamburger: payload,
      };
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
    ...initialFilterState,
    isHamburger: false,
  });

  const value = { notesState, notesDispatch };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

export { useNotesContext, NotesProvider };
