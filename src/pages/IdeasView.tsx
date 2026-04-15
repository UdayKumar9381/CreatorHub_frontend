import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useIdeas } from '../hooks/useIdeas';
import Loader from '../components/Loader';
import { IdeaHeader } from '../components/ideas/IdeaHeader';
import { IdeaForm } from '../components/ideas/IdeaForm';
import { IdeaItem } from '../components/ideas/IdeaItem';

export default function IdeasView() {
  const {
    ideas,
    loading,
    isAdding,
    setIsAdding,
    isGenerating,
    addIdea,
    deleteIdea,
    toggleStatus,
    generateConcept
  } = useIdeas();

  const [initialData, setInitialData] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        setIsAdding(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        handleGenerate();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAdding]);

  const handleGenerate = async () => {
    const concept = await generateConcept();
    if (concept) {
      setInitialData({ title: concept.title, description: concept.description });
      setIsAdding(true);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="pt-20 px-8 relative z-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <IdeaHeader 
          onGenerate={handleGenerate}
          onAdd={() => {
            setInitialData(null);
            setIsAdding(true);
          }}
          isGenerating={isGenerating}
        />

        <div className="space-y-4">
          <IdeaForm 
            show={isAdding}
            onClose={() => {
              setIsAdding(false);
              setInitialData(null);
            }}
            onAdd={addIdea}
            initialTitle={initialData?.title}
            initialDescription={initialData?.description}
          />

          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="popLayout">
              {ideas.map((idea) => (
                <IdeaItem 
                  key={idea.id}
                  idea={idea}
                  onToggle={toggleStatus}
                  onDelete={deleteIdea}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

