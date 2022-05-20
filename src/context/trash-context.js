import { createContext, useContext, useReducer } from "react";

const TrashContext = createContext();
const useTrashContext = () => useContext(TrashContext);

const trashReducer = (state, { type, payload }) => {
  switch (type) {
    case "GET_ALL_TRASH_NOTES":
    case "UPDATE_TRASH_NOTES":
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
