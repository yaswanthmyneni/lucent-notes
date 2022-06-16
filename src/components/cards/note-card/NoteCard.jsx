import { MdArchive, FaTrash, MdOutlineEdit } from "assets/icons/icons";
import { useNotesContext, useToastContext, useTrashContext } from "context";
import { addToArchive, addToTrash } from "utility";
import "./NoteCard.css";

const NoteCard = ({ note }) => {
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
    <div className={`note-card ${backgroundColor}`}>
        <h4 className="m-0">{title}</h4>
      <div dangerouslySetInnerHTML={{ __html: description }} />
      <div className="flex flex-start gap-1rem">
        <small className="badge-text note-badge-text">{label}</small>
        <small className="badge-text note-badge-text">{priority}</small>
      </div>
      <div className="flex space-between mt-8px">
        <h6 className="text-gray m-r-1rem">Created on {dateAndTimeFormat}</h6>
        <div className="flex gap-1rem">
          <MdOutlineEdit
            className="cursor edit-icon"
            onClick={() => {
              notesDispatch({
                type: "ON_CLICK_EDIT_ICON",
                payload: {
                  title: title,
                  description: description,
                  labelForNote: label,
                  priorityForNote: priority,
                  isDisplayModal: true,
                  noteId: _id,
                  backgroundColor: backgroundColor,
                },
              });
            }}
          />
          <MdArchive
            className="cursor archive-icon"
            onClick={() => addToArchive(note, notesDispatch, toastDispatch)}
          />
          <FaTrash
            className="cursor delete-icon"
            onClick={() =>
              addToTrash(_id, notesDispatch, trashDispatch, toastDispatch)
            }
          />
        </div>
      </div>
    </div>
  );
};

export { NoteCard };
