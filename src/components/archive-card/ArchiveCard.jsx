import { MdUnarchive, FaTrash } from "assets/icons/icons";
import { useNotesContext, useToastContext, useTrashContext } from "context";
import { deleteNoteFromArchive, restoreArchivedNote } from "utility";

const ArchiveCard = ({ note }) => {
  const { title, description, label, backgroundColor, dateAndTime } = note;

  // from notes context
  const { notesDispatch } = useNotesContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  // from trash context
  const { trashDispatch } = useTrashContext();

  return (
    <div className={`common-note-card ${backgroundColor}`}>
      <div className="flex space-between">
        <h4>{title}</h4>
      </div>
      <p>{description}</p>
      <small className="badge-text flex-badge note-badge-text">{label}</small>
      <div className="flex space-between">
        <h6 className="text-gray m-r-1rem">Created on {dateAndTime}</h6>
        <MdUnarchive
          className="cursor archive-icon"
          onClick={() =>
            restoreArchivedNote(note, notesDispatch, toastDispatch)
          }
        />
        <FaTrash
          className="cursor trash-icon"
          onClick={() =>
            deleteNoteFromArchive(
              note,
              notesDispatch,
              trashDispatch,
              toastDispatch
            )
          }
        />
      </div>
    </div>
  );
};

export { ArchiveCard };