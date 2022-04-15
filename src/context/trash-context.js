import { createContext, useContext, useReducer } from "react";

const TrashContext = createContext();
const useTrashContext = () => useContext(TrashContext);

const trashReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_TRASH":
      return { ...state, trashNotes: [...state.trashNotes, payload] };
    case "DELETE_FROM_TRASH":
      return { ...state, trashNotes: payload };
    default:
      return state;
  }
};

const TrashProvider = ({ children }) => {
  const [trashState, trashDispatch] = useReducer(trashReducer, {
    trashNotes: [],
  });

  const value = { trashState, trashDispatch };
  return (
    <TrashContext.Provider value={value}>{children}</TrashContext.Provider>
  );
};

export { useTrashContext, TrashProvider };
