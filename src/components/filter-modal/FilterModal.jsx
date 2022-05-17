import { useNotesContext } from "context";
import "./FilterModal.css";

const FilterModal = ({ setIsFilter }) => {
  const {
    notesState: { label, priority, sortByLatest },
    notesDispatch,
  } = useNotesContext();

  const listOfLabels = ["office", "food", "home"];
  const listOfPriorities = ["low", "medium", "high"];

  return (
    <div className="filter">
      <div className="flex space-between">
        <h4>Tags:</h4>
        <button
          className="btn btn-clear"
          onClick={() => {
            notesDispatch({ type: "RESET_FILTERS" });
            setIsFilter(false);
          }}
        >
          clear all
        </button>
      </div>
      <div className="flex gap-1rem flex-start">
        {listOfLabels.map((singleLabel, index) => (
          <label
            key={index}
            htmlFor={`${singleLabel}-filter`}
            className="note-modal-label"
          >
            <input
              type="checkbox"
              id={`${singleLabel}-filter`}
              checked={label[singleLabel]}
              onChange={(e) =>
                notesDispatch({
                  type: "SET_LABEL",
                  payload: { [singleLabel]: e.target.checked },
                })
              }
            />
            {singleLabel}
          </label>
        ))}
      </div>
      <h4>Priorities:</h4>
      <div className="flex gap-1rem flex-start">
        {listOfPriorities.map((singlePriority, index) => (
          <label
            key={index}
            htmlFor={`${singlePriority}-filter`}
            className="note-modal-label"
          >
            <input
              type="checkbox"
              id={`${singlePriority}-filter`}
              checked={priority[singlePriority]}
              onChange={(e) =>
                notesDispatch({
                  type: "SET_PRIORITY",
                  payload: { [singlePriority]: e.target.checked },
                })
              }
            />
            {singlePriority}
          </label>
        ))}
      </div>
      <h4>Sort by date:</h4>
      <div className="flex gap-1rem flex-start">
        <label htmlFor="latest" className="cursor">
          <input
            type="radio"
            id="latest"
            name="sortByDate"
            checked={sortByLatest}
            onChange={() =>
              notesDispatch({ type: "SET_LATEST", payload: true })
            }
          />
          latest
        </label>
        <label htmlFor="old" className="cursor">
          <input
            type="radio"
            id="old"
            name="sortByDate"
            checked={!sortByLatest}
            onChange={() =>
              notesDispatch({ type: "SET_LATEST", payload: false })
            }
          />
          old
        </label>
      </div>
      <div className="text-center m-t-1rem">
        <button className="btn btn-primary" onClick={() => setIsFilter(false)}>
          done
        </button>
      </div>
    </div>
  );
};

export { FilterModal };
