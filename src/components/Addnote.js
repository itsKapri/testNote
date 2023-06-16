import React, { useContext, useState } from "react";
import noteContext from "../contexts/notes/noteContext";

export default function Addnote(props) {
  const { showAlert } = props;
  const notes = useContext(noteContext);
  const [note, setNote] = useState({
    title: "",
    description: "",
  });
  const { addNote } = notes;

  const handleClick = (e) => {
    e.preventDefault();
    setNote({
      title: "",
      description: "",
    });
    addNote(note.title, note.description);
    showAlert("Note added successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="contanier my-3">
        <h1>Add a Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleITitlenputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              onChange={onChange}
              className="form-control"
              value={note.title}
              id="title"
              name="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="form-label">
              Description
            </label>
            <input
              type="text"
              onChange={onChange}
              className="form-control"
              value={note.description}
              id="description"
              name="description"
            />
          </div>
          {/* <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              onChange={onChange}
              className="form-control"
              value={note.tag}
              id="description"
              name="tag"
            />
          </div> */}
          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            onClick={handleClick}
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
