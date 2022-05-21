import { useState } from "react";
import { AiFillCloseCircle, IoColorPaletteOutline } from "assets/icons/icons";
import { useNotesContext, useToastContext } from "context";
import { addToNotes, editNote } from "utility";
import { ColorPalletteModal } from "components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./NoteModal.css";

const NoteModal = () => {
  const [isColorsModal, setIsColorsModal] = useState(false);

  const formats = ["italic", "underline", "strike", "list"];

  const modules = {
    toolbar: [
      ["italic", "underline", "strike"],
      [],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  // from notes context
  const { notesState, notesDispatch } = useNotesContext();
  const {
    title,
    description,
    labelForNote,
    noteId,
    backgroundColor,
    priorityForNote,
  } = notesState;

  // from toast context
  const { toastDispatch } = useToastContext();

  const listOfLabels = ["office", "food", "home"];
  const listOfPriorities = ["low", "medium", "high"];

  return (
    <>
      <div id="modal-bg" className="modal-bg"></div>
      <div className={`modal note-modal-container ${backgroundColor}`}>
        <form>
          <AiFillCloseCircle
            className="card-pos-abs close-modal"
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
              className="input note-modal-input text-lg"
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
                  className='m-0 cursor'
                  id={label}
                  checked={labelForNote === label}
                  onChange={() =>
                    notesDispatch({ type: "LABEL_FOR_NOTE", payload: label })
                  }
                />
                <p className='m-0'>{label}</p>
              </label>
            ))}
          </div>
          <h3 className="m-t-1rem">Priority</h3>
          <div className="flex flex-start gap-1rem">
            {listOfPriorities.map((priority) => (
              <label
                key={priority}
                htmlFor={priority}
                className="note-modal-label"
              >
                <input
                  type="radio"
                  name="priority"
                  className='m-0 cursor'
                  id={priority}
                  checked={priorityForNote === priority}
                  onChange={() =>
                    notesDispatch({ type: "PRIORITY", payload: priority })
                  }
                />
                <p className='m-0'>{priority}</p>
              </label>
            ))}
          </div>
          <h3 className="m-t-1rem">Description</h3>
          <label htmlFor="description">
            <ReactQuill
              id="description"
              theme="snow"
              formats={formats}
              modules={modules}
              value={description}
              required
              onChange={(event) =>
                notesDispatch({
                  type: "DESCRIPTION",
                  payload: event,
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
                    priorityForNote,
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
                    priorityForNote,
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
