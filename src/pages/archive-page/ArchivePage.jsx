import { useEffect } from "react";
import { AsideBar, ArchiveCard } from "components";
import { useNotesContext, useToastContext } from "context";
import { getArchivedNotes } from "utility";

const ArchivePage = () => {
  // from notes context
  const {
    notesState: { user },
    notesDispatch,
  } = useNotesContext();
  const { archives } = user;

  // from toast context
  const { toastDispatch } = useToastContext();

  useEffect(() => {
    getArchivedNotes(notesDispatch, toastDispatch);
  }, [notesDispatch, toastDispatch]);

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="page-main">
        {archives?.length > 0 ? (
          <>
            <h3>Archive Notes</h3>
            <div className="notes-container">
              {archives.map((note) => (
                <ArchiveCard key={note._id} note={note} />
              ))}
            </div>
          </>
        ) : (
          <h1 className="text-center">The Archive page is empty!</h1>
        )}
      </main>
    </div>
  );
};

export { ArchivePage };
