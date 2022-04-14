import {
  BsPin,
  MdArchive,
  FaTrash,
  MdOutlineEdit,
  MdLabel,
} from "assets/icons/icons";
import "./NoteCard.css";

const NoteCard = ({ note }) => {
  var today = new Date();
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateAndTime = date + " at " + time;

  const { title, description } = note;

  return (
    <div className="note-card">
      <div className="flex space-between">
        <h4>{title}</h4>
        <BsPin className="cursor" />
      </div>
      <p>{description}</p>
      <div className="flex space-between">
        <h6 className="text-gray">Created on {dateAndTime}</h6>
        <div className="flex gap-1rem">
          <MdLabel className="cursor label-icon" />
          <MdOutlineEdit className="cursor edit-icon" />
          <MdArchive className="cursor archive-icon" />
          <FaTrash className="cursor trash-icon" />
        </div>
      </div>
    </div>
  );
};

export { NoteCard };
