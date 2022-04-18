import axios from "axios";
import { getUniqueNumber } from "./common-functions";

const getArchivedNotes = async (notesDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    const response = await axios({
      method: "get",
      url: "/api/archives",
      headers: { authorization: encodedToken },
    });
    if (response.status === 200) {
      notesDispatch({
        type: "ADD_TO_ARCHIVE",
        payload: response.data.archives,
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

const addToArchive = async (note, notesDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    const response = await axios({
      method: "post",
      url: `/api/notes/archives/${note._id}`,
      headers: { authorization: encodedToken },
      data: { note: note },
    });

    if (response.status === 201) {
      notesDispatch({ type: "NOTES", payload: response.data.notes });
      notesDispatch({
        type: "ADD_TO_ARCHIVE",
        payload: response.data.archives,
      });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-success",
          message: "added to archive successfully",
        },
      });
    }
  } catch (error) {
    console.error("console", error);
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

const restoreArchivedNote = async (note, notesDispatch, toastDispatch) => {
  try {
    const encodedToken = localStorage.getItem("token");
    const response = await axios({
      method: "post",
      url: `/api/archives/restore/${note._id}`,
      headers: { authorization: encodedToken },
    });
    if (response.status === 200) {
      notesDispatch({ type: "NOTES", payload: response.data.notes });
      notesDispatch({
        type: "UPDATE_ARCHIVE",
        payload: response.data.archives,
      });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-success",
          message: "restored to notes successfully",
        },
      });
    }
  } catch (error) {
    console.error("console", error);
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

const deleteNoteFromArchive = async (
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
      url: `/api/archives/delete/${_id}`,
      headers: { authorization: encodedToken },
    });

    if (response.status === 200) {
      trashDispatch({ type: "ADD_TO_TRASH", payload: note });
      notesDispatch({
        type: "UPDATE_ARCHIVE",
        payload: response.data.archives,
      });
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

export {
  getArchivedNotes,
  addToArchive,
  restoreArchivedNote,
  deleteNoteFromArchive,
};
