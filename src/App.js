import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [activeSection, setActiveSection] = useState("quick-notes");

    const addNote = () => {
        if (newNote.trim()) {
            setNotes([...notes, { id: Date.now(), text: newNote }]);
            setNewNote("");
        }
    };

    const archiveNote = (id) => {
        const noteToArchive = notes.find((note) => note.id === id);
        setArchivedNotes([...archivedNotes, noteToArchive]);
        setNotes(notes.filter((note) => note.id !== id));
    };

    const deleteNote = (id, isArchived) => {
        if (isArchived) {
            setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
        } else {
            setNotes(notes.filter((note) => note.id !== id));
        }
    };

    const restoreNote = (id) => {
        const noteToRestore = archivedNotes.find((note) => note.id === id);
        setNotes([...notes, noteToRestore]);
        setArchivedNotes(archivedNotes.filter((note) => note.id !== id));
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Quick Notes</h1>

            <nav className="nav nav-tabs mb-3">
                <button className={`nav-link ${activeSection === "quick-notes" ? "active" : ""}`} onClick={() => setActiveSection("quick-notes")}>Quick Notes</button>
                <button className={`nav-link ${activeSection === "active-notes" ? "active" : ""}`} onClick={() => setActiveSection("active-notes")}>Active Notes</button>
                <button className={`nav-link ${activeSection === "archived-notes" ? "active" : ""}`} onClick={() => setActiveSection("archived-notes")}>Archived Notes</button>
            </nav>

            {activeSection === "quick-notes" && (
                <div>
                    <textarea
                        className="form-control mb-2"
                        placeholder="Write a note..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                    ></textarea>
                    <button className="btn btn-primary mb-4" onClick={addNote}>Save Note</button>
                </div>
            )}

            {activeSection === "active-notes" && (
                <div>
                    <h2>Active Notes</h2>
                    {notes.map((note) => (
                        <div key={note.id} className="card p-2 mb-2">
                            <div className="card-body">{note.text}</div>
                            <button className="btn btn-warning me-2" onClick={() => archiveNote(note.id)}>Archive</button>
                            <button className="btn btn-danger" onClick={() => deleteNote(note.id, false)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}

            {activeSection === "archived-notes" && (
                <div>
                    <h2 className="mt-4">Archived Notes</h2>
                    {archivedNotes.map((note) => (
                        <div key={note.id} className="card p-2 mb-2">
                            <div className="card-body">{note.text}</div>
                            <button className="btn btn-success me-2" onClick={() => restoreNote(note.id)}>Restore</button>
                            <button className="btn btn-danger" onClick={() => deleteNote(note.id, true)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
