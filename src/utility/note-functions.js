import axios from "axios";
import { getUniqueNumber } from "./common-functions";

const getDateAndTime = () => {
  const today = new Date();
  const date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateAndTime = date + " at " + time;
  return dateAndTime;
};

const getNotes = async (notesDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    const response = await axios({
      method: "get",
      url: "/api/notes",
      headers: { authorization: encodedToken },
    });
    if (response.status === 200) {
      notesDispatch({ type: "NOTES", payload: response.data.notes });
    }
  } catch (error) {
    console.error(error);
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: getUniqueNumber(),
        className: "toast-error",
        message: "check console!",
      },
    });
  }
};

const addToNotes = async (
  event,
  notesState,
  label,
  notesDispatch,
  toastDispatch
) => {
  try {
    event.preventDefault();
    const dateAndTime = getDateAndTime();
    const { title, description, backgroundColor, user } = notesState;
    const encodedToken = localStorage.getItem("token");

    if (title === "" && description === "") {
      return toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-warning",
          message: "enter all inputs to create note",
        },
      });
    }

    if (user._id) {
      const response = await axios({
        method: "POST",
        url: "/api/notes",
        headers: { authorization: encodedToken },
        data: {
          note: { title, description, label, backgroundColor, dateAndTime },
        },
      });

      if (response.status === 201) {
        notesDispatch({ type: "NOTES", payload: response.data.notes });
        notesDispatch({ type: "CLEAR_NOTES_INPUTS" });
        notesDispatch({ type: "DISPLAY_MODAL", payload: false });
        toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: getUniqueNumber(),
            className: "toast-success",
            message: "note is created",
          },
        });
      }
    } else {
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-error",
          message: "Page is reloaded, login again",
        },
      });
    }
  } catch (error) {
    console.error(error);
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: getUniqueNumber(),
        className: "toast-error",
        message: "check console!",
      },
    });
  }
};

const editNote = async (
  event,
  notesState,
  label,
  notesDispatch,
  toastDispatch
) => {
  try {
    event.preventDefault();
    const encodedToken = localStorage.getItem("token");
    const { noteId, title, description, backgroundColor } = notesState;

    const response = await axios({
      method: "post",
      url: `/api/notes/${noteId}`,
      headers: { authorization: encodedToken },
      data: {
        note: { title, description, label, backgroundColor },
      },
    });

    if (response.status === 201) {
      notesDispatch({ type: "NOTES", payload: response.data.notes });
      notesDispatch({ type: "CLEAR_NOTES_INPUTS" });
      notesDispatch({ type: "DISPLAY_MODAL", payload: false });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-success",
          message: "note is edited successfully",
        },
      });
    }
  } catch (error) {
    console.error(error);
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: getUniqueNumber(),
        className: "toast-error",
        message: "check console!",
      },
    });
  }
};

const deleteNote = async (
  note,
  notesDispatch,
  trashDispatch,
  toastDispatch
) => {
  try {
    const encodedToken = localStorage.getItem("token");
    const { _id } = note;
    const response = await axios({
      method: "delete",
      url: `/api/notes/${_id}`,
      headers: { authorization: encodedToken },
    });

    if (response.status === 200) {
      trashDispatch({ type: "ADD_TO_TRASH", payload: note });
      notesDispatch({ type: "NOTES", payload: response.data.notes });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-success",
          message: "note is moved trash page",
        },
      });
    }
  } catch (error) {
    console.error(error);
    toastDispatch({
      type: "ADD_TOAST",
      payload: {
        id: getUniqueNumber(),
        className: "toast-error",
        message: "check console!",
      },
    });
  }
};

export { getNotes, addToNotes, editNote, deleteNote };
