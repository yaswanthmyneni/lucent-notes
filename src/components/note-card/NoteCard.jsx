import {
  BsPin,
  MdArchive,
  FaTrash,
  MdOutlineEdit,
  MdLabel,
} from "assets/icons/icons";
import { useNotesContext, useToastContext, useTrashContext } from "context";
import { addToArchive, deleteNote } from "utility";
import "./NoteCard.css";

const NoteCard = ({ note }) => {
  const { _id, title, description, label, backgroundColor, dateAndTime } = note;

  // from notes context
  const { notesDispatch } = useNotesContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  // from trash context
  const { trashDispatch } = useTrashContext();

  return (
    <div className={`note-card ${backgroundColor}`}>
      <div className="flex space-between">
        <h4>{title}</h4>
        <BsPin className="cursor" />
      </div>
      <p>{description}</p>
      <small className="badge-text flex-badge note-badge-text">{label}</small>
      <div className="flex space-between">
        <h6 className="text-gray m-r-1rem">Created on {dateAndTime}</h6>
        <div className="flex gap-1rem">
          <MdLabel className="cursor label-icon" />
          <MdOutlineEdit
            className="cursor edit-icon"
            onClick={() => {
              notesDispatch({
                type: "ON_CLICK_EDIT_ICON",
                payload: {
                  title: title,
                  description: description,
                  labelForNote: label,
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
            className="cursor trash-icon"
            onClick={() =>
              deleteNote(note, notesDispatch, trashDispatch, toastDispatch)
            }
          />
        </div>
      </div>
    </div>
  );
};

export { NoteCard };
