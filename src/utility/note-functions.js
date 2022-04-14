import axios from "axios";
import { v4 as uuid } from "uuid";

const getDateAndTime = () => {
  const today = new Date();
  const date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateAndTime = date + " at " + time;
  return dateAndTime;
};

const getNotes = async (notesDispatch, toastDispatch, user) => {
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
        id: uuid(),
        className: "toast-error",
        message: "check console!",
      },
    });
  }
};

const addToNotes = async (
  event,
  notesState,
  notesDispatch,
  toastDispatch,
  dateAndTime
) => {
  try {
    event.preventDefault();
    const dateAndTime = getDateAndTime();
    const { title, description, user } = notesState;
    const encodedToken = localStorage.getItem("token");

    if (title === "" && description === "") {
      return toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
          className: "toast-warning",
          message: "enter all inputs to create note",
        },
      });
    }

    if (Object.keys(user).length > 0) {
      const response = await axios({
        method: "POST",
        url: "/api/notes",
        headers: { authorization: encodedToken },
        data: {
          note: { title, description, dateAndTime },
        },
      });

      if (response.status === 201) {
        notesDispatch({ type: "NOTES", payload: response.data.notes });
        notesDispatch({ type: "CLEAR_NOTES_INPUTS" });
        notesDispatch({ type: "DISPLAY_MODAL", payload: false });
        toastDispatch({
          type: "ADD_TOAST",
          payload: {
            id: uuid(),
            className: "toast-success",
            message: "note is created",
          },
        });
      }
    } else {
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: uuid(),
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
        id: uuid(),
        className: "toast-error",
        message: "check console!",
      },
    });
  }
};

export { getNotes, addToNotes };
