import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Box from './components/Box';

function App() {


  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');

  const _getNotes = async () => {

    const allNotes = await JSON.parse(localStorage.getItem('notes')) || [];
    console.log(allNotes);
    setNotes(allNotes);

  }

  useEffect(() => {

    _getNotes();

    
    return () => {
      setNotes([]);
    };
  }, []);
  

  const _saveNote = async (e, noteTitle, noteDescription) => {
    e.preventDefault();

    if (noteTitle === null || noteTitle.trim().length === 0) {
        alert('Note Title is Required');
        return;
    }

    if (noteDescription === null || noteDescription.trim().length === 0) {
        alert('Note Description is Required');
        return;
    }

    await localStorage.setItem('notes', JSON.stringify([{ id: notes.length + 1, noteTitle, noteDescription },...notes]));
    
    setNoteTitle('');
    setNoteDescription('');
    await _getNotes();
}

const _deleteNote = async (noteId) => {

  const newNotes = notes.filter(note => note.id !== noteId);
  await localStorage.setItem('notes', JSON.stringify(newNotes));
  await _getNotes(0);
}

  return (
    <div className="App">
      <NavBar />
        <section className='boxes'>
          <Box id={new Date().getTime()} type="form" _saveNote={_saveNote} noteTitle={noteTitle} noteDescription={noteDescription} setNoteTitle={setNoteTitle} setNoteDescription={setNoteDescription}/>
          {
            notes.reverse().map(note => {
              return <Box id={note.id} _saveNote={_saveNote} note={note} _deleteNote={_deleteNote}/>
            })
          }
        </section>
        
    </div>
  );
}

export default App;
