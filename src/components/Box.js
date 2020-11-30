import React, { useState } from "react";
import { Button, Icon, Modal } from 'semantic-ui-react';

const Box = (props) => {
  const {
    type,
    note,
    _saveNote,
    setNoteTitle,
    setNoteDescription,
    noteTitle,
    _deleteNote,
    noteDescription,
  } = props;

  
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(null);

  if (type === "form") {
    return (
      <div className="box">
        <div className="box-header"> 
          <h2>Add Note</h2>
        </div>
        <div className="ui fluid icon input">
          <input
            type="text"
            placeholder="Title..."
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </div>
        <br />
        <div className="ui fluid icon input">
          <textarea
            placeholder="Note..."
            rows="7"
            value={noteDescription}
            onChange={(e) => setNoteDescription(e.target.value)}
          ></textarea>
        </div>
        <br />
        <button
          className="ui fluid button teal"
          onClick={(e) => {
            _saveNote(e, noteTitle, noteDescription);
          }}
        >
          Save Note
        </button>
      </div>
    );
  }

  return (
    <div className="box">
      <div className="box-header">
        <h3>{note.noteTitle}</h3>
        <div className="box-footer">
          <button
            className="ui vertical animated button red"
            onClick={() => {
              setOpen(true);
              setSize("mini");
            }}
          >
            <div className="hidden content">Delete</div>
            <div className="visible content">
              <i aria-hidden="true" className="trash icon"></i>
            </div>
          </button>
        </div>
      </div>
      <p>{note.noteDescription}</p>
      <Modal
        size={size}
        open={open}
        onClose={() => { setOpen(false); setSize('mini') }}
      >
        <Modal.Header>Delete Your Note</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete your note: {note.noteTitle}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() =>{ setOpen(false); setSize('mini')  } }>
            No
          </Button>
          <Button positive onClick={() => { _deleteNote(note.id); setOpen(false);  }}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Box;
