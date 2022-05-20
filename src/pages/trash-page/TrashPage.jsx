import { AsideBar, TrashCard } from "components";
import { useToastContext, useTrashContext } from "context";
import { useEffect } from "react";
import { getAllTrashNotes } from "utility";

const TrashPage = () => {
  // from trash context
  const {
    trashState: { trashNotes },
    trashDispatch,
  } = useTrashContext();

  // from toast context
  const { toastDispatch } = useToastContext();

  useEffect(() => {
    getAllTrashNotes(trashDispatch, toastDispatch);
  }, [trashDispatch, toastDispatch]);

  return (
    <div className="page-wrapper">
      <AsideBar />
      <main className="page-main">
        {trashNotes?.length > 0 ? (
          <>
            <h3>Trash Notes</h3>
            <div className="notes-container">
              {trashNotes.map((note) => (
                <TrashCard key={note._id} note={note} />
              ))}
            </div>
          </>
        ) : (
          <h1 className="text-center">The Trash page is empty!</h1>
        )}
      </main>
    </div>
  );
};

export { TrashPage };
