import { useNotesContext } from "context";
import "./ColorPalletteModal.css";

const ColorPalletteModal = ({ setIsColorsModal }) => {
  // from notes context
  const { notesDispatch } = useNotesContext();

  // array of classnames which represents colors
  const colors = [
    "background-color-blue-300",
    "background-color-red-800",
    "background-color-pink",
    "background-color-green-300",
    "background-color-orange",
    "background-color-orange-200",
  ];

  // This function will set backgroundColor in notes context
  const setColorToNote = (event) => {
    notesDispatch({
      type: "SET_COLOR",
      payload: event.currentTarget.className.split(" ")[1],
    });
    setIsColorsModal(false);
  };

  return (
    <div className="color-modal">
      {colors.map((className) => (
        <div
          key={className}
          className={`colors ${className}`}
          onClick={(e) => setColorToNote(e, notesDispatch)}
        ></div>
      ))}
    </div>
  );
};

export { ColorPalletteModal };
