import { AsideBar, FilterModal, NoteCard, NoteModal } from "components";
import { BiSearchAlt2, GoSettings } from "assets/icons/icons";
import { useNotesContext, useToastContext } from "context";
import { useEffect } from "react";
import {
  filterByLabel,
  filterByPriority,
  filterBySearch,
  getNotes,
  sortByDate,
} from "utility";
import "./NotesPage.css";
import { useState, useRef } from "react";

const NotesPage = () => {
  const [isFilter, setIsFilter] = useState(false);
  const [searchString, setSearchString] = useState("");
  let timerId = useRef(null);

  // from notes context
  const {
    notesState: {
      user,
      isDisplayModal,
      label,
      priority,
      sortByLatest,
      searchValue,
    },
    notesDispatch,
  } = useNotesContext();
  const { notes } = user;

  // from toast context
  const { toastDispatch } = useToastContext();

  useEffect(() => {
    getNotes(notesDispatch, toastDispatch);
  }, [notesDispatch, toastDispatch]);

  const handleSearch = (e) => {
    setSearchString(e.target.value);
    clearInterval(timerId.current);
    timerId.current = setTimeout(() => {
      notesDispatch({ type: "SEARCH", payload: e.target.value });
    }, 600);
  };

  // filters
  const filteredByLabel = filterByLabel(notes, label);
  const filteredByPriority = filterByPriority(filteredByLabel, priority);
  const filteredByDate = sortByDate(filteredByPriority, sortByLatest);
  const filteredBySearch = filterBySearch(filteredByDate, searchValue);

  return (
    <>
      <div className="page-wrapper">
        <AsideBar />
        <main className="notes-main">
          <div className="input-container notes-search-container">
            <BiSearchAlt2 />
            <label htmlFor="search-bar" className="notes-input-label">
              <input
                type="text"
                id="search-bar"
                className="input notes-input"
                value={searchString}
                onChange={handleSearch}
              />
            </label>
            <GoSettings
              className="filter-icon cursor"
              onClick={() => setIsFilter(!isFilter)}
            />
          </div>
          {isFilter && <FilterModal setIsFilter={setIsFilter} />}
          {filteredBySearch?.length ? (
            filteredBySearch.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))
          ) : (
            <h1 className="text-center">The Notes Page is empty!</h1>
          )}
        </main>
      </div>
      {isDisplayModal && <NoteModal />}
    </>
  );
};

export { NotesPage };
