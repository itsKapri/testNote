import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../contexts/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const navigate = useNavigate();
  const { showAlert } = props;
  const notes = useContext(noteContext);
  const { note, getAllNotes, editNote } = notes;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAllNotes();
      console.log(token);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note1, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note1.id, note1.etitle, note1.edescription);
    refClose.current.click();
    showAlert("Note Updated Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note1, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={showAlert} />
      <button
        style={{ display: "none" }}
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="exampleITitlenputEmail1"
                    className="form-label"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    value={note1.etitle}
                    onChange={onChange}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note1.edescription}
                    onChange={onChange}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                  />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note1.etag}
                    onChange={onChange}
                    className="form-control"
                    id="etag"
                    name="etag"
                  />
                </div> */}
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note1.etitle.length < 5 || note1.edescription.length < 5
                }
                type="button"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row flex my-3">
        <h1>Your Notes</h1>
        <div className="container">
          {note.length === 0 && "No Note to display(Add note to display here)"}
        </div>
        {note.map((n) => {
          return (
            <Noteitem
              key={n._id}
              showAlert={showAlert}
              updateNote={updateNote}
              notes={n}
            />
          );
        })}
      </div>
    </>
  );
}
