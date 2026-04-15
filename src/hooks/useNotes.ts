import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { noteService } from '../services/api';
import { Note } from '../types';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await noteService.getNotes();
      setNotes(res.data);
    } catch (err) {
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const createNote = async () => {
    try {
      const res = await noteService.createNote({ title: 'Untitled Document', content: '' });
      setNotes(prev => [res.data, ...prev]);
      setActiveNote(res.data);
      return res.data;
    } catch (err) {
      toast.error('Creation failed');
      return null;
    }
  };

  const saveNote = async (note: Note) => {
    setSaving(true);
    try {
      await noteService.updateNote(note.id, note);
      setNotes(prev => prev.map(n => n.id === note.id ? note : n));
      toast.success('Document saved');
      return true;
    } catch (err) {
      toast.error('Save failed');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const deleteNote = async (id: number) => {
    const originalNotes = [...notes];
    setNotes(prev => prev.filter(n => n.id !== id));
    if (activeNote?.id === id) setActiveNote(null);
    
    try {
      await noteService.deleteNote(id);
      toast.success('Document moved to trash');
    } catch (err) {
      setNotes(originalNotes);
      toast.error('Delete failed');
    }
  };

  // Logic for handling local note updates before auto-save
  const updateActiveNoteContent = (updates: Partial<Note>) => {
    if (!activeNote) return;
    const updated = { ...activeNote, ...updates };
    setActiveNote(updated);

    // Debounced Auto-save
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(async () => {
      try {
        await noteService.updateNote(updated.id, updated);
        setNotes(prev => prev.map(n => n.id === updated.id ? updated : n));
      } catch (err) {
        console.error('Auto-save failed');
      }
    }, 2000);
  };

  return {
    notes,
    activeNote,
    setActiveNote,
    loading,
    saving,
    createNote,
    saveNote,
    deleteNote,
    updateActiveNoteContent,
    refresh: fetchNotes
  };
}
