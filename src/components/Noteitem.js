import React, { useContext } from "react";
import noteContext from "../contexts/notes/noteContext";

export default function Noteitem(props) {
  const { showAlert } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { notes, updateNote } = props;
  return (
    <div className="col-md-4 d-flex justify-content-center my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontWeight: "bold" }}>
            {notes.title}
          </h5>
          <p className="card-text">{notes.description}</p>
          <i
            className="fa-solid fa-trash mx-3"
            onClick={() => {
              deleteNote(notes._id);
              showAlert("Note Deleted Successfully", "success");
            }}
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => {
              updateNote(notes);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
