import { AsideBar, TrashCard } from "components";
import { useTrashContext } from "context";

const TrashPage = () => {
  // from trash context
  const {
    trashState: { trashNotes },
  } = useTrashContext();
  
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
