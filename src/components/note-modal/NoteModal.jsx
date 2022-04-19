import { useState } from "react";
import { AiFillCloseCircle, IoColorPaletteOutline } from "assets/icons/icons";
import { useNotesContext, useToastContext } from "context";
import { addToNotes, editNote } from "utility";
import { ColorPalletteModal } from "components";
import "./NoteModal.css";

const NoteModal = () => {
  const [isColorsModal, setIsColorsModal] = useState(false);

  // from notes context
  const { notesState, notesDispatch } = useNotesContext();
  const { title, description, labelForNote, noteId, backgroundColor } =
    notesState;

  // from toast context
  const { toastDispatch } = useToastContext();

  const listOfLabels = ["office", "food", "home"];

  return (
    <>
      <div id="modal-bg" className="modal-bg"></div>
      <div className={`modal note-modal-container ${backgroundColor}`}>
        <form>
          <AiFillCloseCircle
            className="card-close-pos card-pos-abs color-green"
            onClick={() => {
              notesDispatch({ type: "DISPLAY_MODAL", payload: false });
              notesDispatch({ type: "CLEAR_NOTES_INPUTS" });
            }}
          />
          <h3>Title</h3>
          <label htmlFor="title">
            <input
              type="text"
              id="title"
              className="input note-modal-input"
              value={title}
              required
              onChange={(event) =>
                notesDispatch({ type: "TITLE", payload: event.target.value })
              }
            />
          </label>
          <h3 className="m-t-1rem">Labels</h3>
          <div className="flex flex-start gap-1rem">
            {listOfLabels.map((label) => (
              <label key={label} htmlFor={label} className="note-modal-label">
                <input
                  type="radio"
                  name="label"
                  id={label}
                  checked={labelForNote === label}
                  onChange={() =>
                    notesDispatch({ type: "LABEL_FOR_NOTE", payload: label })
                  }
                />
                {label}
              </label>
            ))}
          </div>
          <h3 className="m-t-1rem">Description</h3>
          <label htmlFor="description">
            <textarea
              id="description"
              className="input note-modal-input"
              rows="4"
              value={description}
              required
              onChange={(event) =>
                notesDispatch({
                  type: "DESCRIPTION",
                  payload: event.target.value,
                })
              }
            />
          </label>
          <div className="flex gap-1rem m-t-1rem">
            {!noteId ? (
              <button
                className="btn btn-primary"
                onClick={(event) =>
                  addToNotes(
                    event,
                    notesState,
                    labelForNote,
                    notesDispatch,
                    toastDispatch
                  )
                }
              >
                Add note
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={(event) =>
                  editNote(
                    event,
                    notesState,
                    labelForNote,
                    notesDispatch,
                    toastDispatch
                  )
                }
              >
                edit note
              </button>
            )}
            <IoColorPaletteOutline
              className="color-pallette-icon"
              onClick={() => setIsColorsModal(!isColorsModal)}
            />
          </div>
        </form>
        {isColorsModal && (
          <ColorPalletteModal setIsColorsModal={setIsColorsModal} />
        )}
      </div>
    </>
  );
};

export { NoteModal };
