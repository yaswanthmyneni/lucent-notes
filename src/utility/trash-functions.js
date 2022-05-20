import axios from "axios";
import { getUniqueNumber } from "./common-functions";

const getAllTrashNotes = async (trashDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    const response = await axios({
      method: "GET",
      url: "/api/trash",
      headers: { authorization: encodedToken },
    });
    if (response.status === 200) {
      trashDispatch({
        type: "GET_ALL_TRASH_NOTES",
        payload: response.data.trash,
      });
    }
  } catch (error) {
    console.log(error);
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

const addToTrash = async (
  notesId,
  notesDispatch,
  trashDispatch,
  toastDispatch
) => {
  try {
    const encodedToken = localStorage.getItem("token");
    const response = await axios({
      method: "post",
      url: `/api/notes/trash/${notesId}`,
      headers: { authorization: encodedToken },
    });
    if (response.status === 201) {
      trashDispatch({
        type: "GET_ALL_TRASH_NOTES",
        payload: response.data.trash,
      });
      notesDispatch({
        type: "NOTES",
        payload: response.data.notes,
      });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-success",
          message: "added to trash successfully",
        },
      });
    }
  } catch (error) {
    console.log(error);
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

const restoreTrashedNote = async (
  notesId,
  notesDispatch,
  trashDispatch,
  toastDispatch
) => {
  try {
    const encodedToken = localStorage.getItem("token");
    const response = await axios({
      method: "post",
      url: `/api/trash/restore/${notesId}`,
      headers: { authorization: encodedToken },
    });
    if (response.status === 200) {
      trashDispatch({
        type: "UPDATE_TRASH_NOTES",
        payload: response.data.trash,
      });
      notesDispatch({
        type: "NOTES",
        payload: response.data.notes,
      });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-success",
          message: "Note got restored successfully",
        },
      });
    }
  } catch (error) {
    console.log(error);
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

const deleteTrashedNote = async (notesId, trashDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    const response = await axios({
      method: "delete",
      url: `/api/trash/delete/${notesId}`,
      headers: { authorization: encodedToken },
    });
    if (response.status === 200) {
      trashDispatch({
        type: "UPDATE_TRASH_NOTES",
        payload: response.data.trash,
      });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-success",
          message: "Note got deleted successfully",
        },
      });
    }
  } catch (error) {
    console.log(error);
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

export { getAllTrashNotes, addToTrash, restoreTrashedNote, deleteTrashedNote };
