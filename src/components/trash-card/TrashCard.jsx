import { FaTrash, FaTrashRestore } from "assets/icons/icons";
import { useNotesContext, useToastContext, useTrashContext } from "context";
import { deleteTrashedNote, restoreTrashedNote } from "utility";

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

  // from notes context
  const { notesDispatch } = useNotesContext();

  // from trash context
  const { trashDispatch } = useTrashContext();

  // from toast context
  const { toastDispatch } = useToastContext();

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
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <div className="mt-auto">
        <div className="flex flex-start gap-1rem">
          <small className="badge-text note-badge-text">{label}</small>
          <small className="badge-text note-badge-text">{priority}</small>
        </div>
        <div className="flex space-between mt-8px">
          <h6 className="text-gray m-r-1rem">Created on {dateAndTimeFormat}</h6>
          <FaTrashRestore
            className="cursor delete-icon"
            onClick={() =>
              restoreTrashedNote(
                _id,
                notesDispatch,
                trashDispatch,
                toastDispatch
              )
            }
          />
          <FaTrash
            className="cursor delete-icon"
            onClick={() => deleteTrashedNote(_id, trashDispatch, toastDispatch)}
          />
        </div>
      </div>
    </div>
  );
};

export { TrashCard };
