import {
  BsPin,
  MdArchive,
  FaTrash,
  MdOutlineEdit,
  MdLabel,
} from "assets/icons/icons";
import { useNotesContext, useToastContext, useTrashContext } from "context";
import { deleteNote } from "utility";
import "./NoteCard.css";

const NoteCard = ({ note }) => {
  const { _id, title, description, dateAndTime } = note;
  const { notesDispatch } = useNotesContext();
  const { toastDispatch } = useToastContext();
  const { trashDispatch } = useTrashContext();

  return (
    <div className="note-card">
      <div className="flex space-between">
        <h4>{title}</h4>
        <BsPin className="cursor" />
      </div>
      <p>{description}</p>
      <div className="flex space-between">
        <h6 className="text-gray m-r-1rem">Created on {dateAndTime}</h6>
        <div className="flex gap-1rem">
          <MdLabel className="cursor label-icon" />
          <MdOutlineEdit
            className="cursor edit-icon"
            onClick={() => {
              notesDispatch({ type: "DISPLAY_MODAL", payload: true });
              notesDispatch({ type: "NOTE_ID", payload: _id });
              notesDispatch({ type: "TITLE", payload: title });
              notesDispatch({ type: "DESCRIPTION", payload: description });
            }}
          />
          <MdArchive className="cursor archive-icon" />
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
