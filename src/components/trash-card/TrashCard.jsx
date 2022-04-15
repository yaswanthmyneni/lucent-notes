import { FaTrash } from "assets/icons/icons";
import { useToastContext, useTrashContext } from "context";
import { getUniqueNumber } from "utility";
import "./TrashCard.css";

const TrashCard = ({ note }) => {
  const { _id, title, description, dateAndTime } = note;

  // from trash context
  const {
    trashState: { trashNotes },
    trashDispatch,
  } = useTrashContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  // delete function
  const deleteNoteFromTrash = (id, trashNotes, trashDispatch) => {
    try {
      const filteredTrashNotes = [...trashNotes].filter(
        (note) => note._id !== id
      );
      trashDispatch({ type: "DELETE_FROM_TRASH", payload: filteredTrashNotes });
      toastDispatch({
        type: "ADD_TOAST",
        payload: {
          id: getUniqueNumber(),
          className: "toast-success",
          message: "note is deleted from trash",
        },
      });
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

  return (
    <div className="trash-note-card">
      <div className="flex space-between">
        <h4>{title}</h4>
      </div>
      <p>{description}</p>
      <div className="flex space-between">
        <h6 className="text-gray m-r-1rem">Created on {dateAndTime}</h6>
        <FaTrash
          className="cursor trash-icon"
          onClick={() => deleteNoteFromTrash(_id, trashNotes, trashDispatch)}
        />
      </div>
    </div>
  );
};

export { TrashCard };
