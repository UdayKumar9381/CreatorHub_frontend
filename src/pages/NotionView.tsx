import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '../hooks/useNotes';
import Loader from '../components/Loader';
import { NoteListHeader } from '../components/notes/NoteListHeader';
import { NoteEditorHeader } from '../components/notes/NoteEditorHeader';
import { NoteCard } from '../components/notes/NoteCard';

export default function NotionView() {
  const {
    notes,
    activeNote,
    setActiveNote,
    loading,
    saving,
    createNote,
    saveNote,
    deleteNote,
    updateActiveNoteContent
  } = useNotes();

  if (loading) return <Loader />;

  return (
    <div className="h-full flex flex-col pt-20 px-8 relative z-10 pb-20">
      <AnimatePresence mode="wait">
        {!activeNote ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto w-full space-y-12"
          >
            <NoteListHeader onAdd={createNote} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {notes.map((note, i) => (
                  <NoteCard 
                    key={note.id}
                    note={note}
                    index={i}
                    onClick={setActiveNote}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            className="flex-1 flex flex-col max-w-5xl mx-auto w-full bg-black/60 backdrop-blur-3xl rounded-[3rem] p-8 md:p-16 border border-white/10 shadow-2xl shadow-black/80"
          >
            <NoteEditorHeader 
              onBack={() => setActiveNote(null)}
              onSave={() => saveNote(activeNote)}
              onDelete={() => deleteNote(activeNote.id)}
              saving={saving}
            />

            <input 
              value={activeNote.title}
              onChange={(e) => updateActiveNoteContent({ title: e.target.value })}
              className="text-4xl md:text-5xl font-black bg-transparent border-none outline-none text-white placeholder:text-gray-900 mb-10 italic tracking-tighter uppercase focus:ring-0"
              placeholder="Untitled Document"
            />
            
            <textarea 
              value={activeNote.content}
              onChange={(e) => updateActiveNoteContent({ content: e.target.value })}
              className="flex-1 w-full bg-transparent border-none outline-none text-xl text-gray-400 font-medium leading-relaxed resize-none focus:ring-0 placeholder:text-gray-900 scrollbar-hide"
              placeholder="Write your creative mission..."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

