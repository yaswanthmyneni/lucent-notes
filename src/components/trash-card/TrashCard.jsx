import { FaTrash } from "assets/icons/icons";
import { useToastContext, useTrashContext } from "context";
import { getUniqueNumber } from "utility";

const TrashCard = ({ note }) => {
  const {
    _id,
    title,
    description,
    label,
    priority,
    backgroundColor,
    dateAndTime,
  } = note;

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

  // formatting date
  const newDate = new Date(dateAndTime);
  const date =
    newDate.getDate() +
    "/" +
    (newDate.getMonth() + 1) +
    "/" +
    newDate.getFullYear();
  const time =
    newDate.getHours() +
    ":" +
    newDate.getMinutes() +
    ":" +
    newDate.getSeconds();
  const dateAndTimeFormat = date + " at " + time;

  return (
    <div className={`common-note-card ${backgroundColor}`}>
      <div className="flex space-between">
        <h4 className="m-0">{title}</h4>
      </div>
      <p>{description}</p>
      <div className="mt-auto">
        <div className="flex flex-start gap-1rem">
          <small className="badge-text note-badge-text">{label}</small>
          <small className="badge-text note-badge-text">{priority}</small>
        </div>
        <div className="flex space-between mt-8px">
          <h6 className="text-gray m-r-1rem">Created on {dateAndTimeFormat}</h6>
          <FaTrash
            className="cursor trash-icon"
            onClick={() => deleteNoteFromTrash(_id, trashNotes, trashDispatch)}
          />
        </div>
      </div>
    </div>
  );
};

export { TrashCard };
