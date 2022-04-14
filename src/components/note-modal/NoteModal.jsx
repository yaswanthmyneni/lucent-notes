import { AiFillCloseCircle } from "assets/icons/icons";
import { useNotesContext, useToastContext } from "context";
import { addToNotes } from "utility";
import "./NoteModal.css";

const NoteModal = () => {
  // from notes context
  const { notesState, notesDispatch } = useNotesContext();
  const { title, description } = notesState;

  // from toast context
  const { toastDispatch } = useToastContext();

  return (
    <>
      <div id="modal-bg" className="modal-bg"></div>
      <form className="modal note-modal-container">
        <AiFillCloseCircle
          className="card-close-pos card-pos-abs"
          onClick={() => {
            notesDispatch({ type: "DISPLAY_MODAL", payload: false });
            notesDispatch({ type: "CLEAR_NOTES_INPUTS" });
          }}
        />
        <h3>Title</h3>
        <input
          type="text"
          className="input note-modal-input"
          value={title}
          required
          onChange={(event) =>
            notesDispatch({ type: "TITLE", payload: event.target.value })
          }
        />
        <h3 className="m-t-1rem">Description</h3>
        <textarea
          className="input note-modal-input"
          rows="4"
          value={description}
          required
          onChange={(event) =>
            notesDispatch({ type: "DESCRIPTION", payload: event.target.value })
          }
        />
        <div className="text-center">
          <button
            className="btn btn-primary m-t-1rem"
            onClick={(event) =>
              addToNotes(event, notesState, notesDispatch, toastDispatch)
            }
          >
            Add note
          </button>
        </div>
      </form>
    </>
  );
};

export { NoteModal };
