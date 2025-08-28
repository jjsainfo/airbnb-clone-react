import { useState, useEffect } from "react";

export default function NoteSaver() {
  const [note, setNote] = useState("");
  const [miNumero, setMiNumero] = useState<number>(5000);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Load saved note on mount
  useEffect(() => {
    const savedNote = localStorage.getItem("myNote");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("myNote", note);
      setLastSaved(new Date().toLocaleTimeString());
    }, miNumero);

    return () => clearInterval(interval); // cleanup
  }, [note,miNumero]);

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>My Notes</h2>
      <input type="number" name="miNumero" id="numero" value={miNumero} onChange={(e) => setMiNumero(parseInt(e.target.value))}></input>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={5}
        cols={40}
      />
      <p>Characters: {note.length}</p>
      {lastSaved && <p>Last saved at: {lastSaved}</p>}
    </div>
  );
}