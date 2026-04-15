import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import Loader from '../components/Loader';
import { ProjectHeader } from '../components/projects/ProjectHeader';
import { ProjectForm } from '../components/projects/ProjectForm';
import { ProjectCard } from '../components/projects/ProjectCard';

const statusColors = {
  planning: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  building: 'text-sky-blue bg-sky-blue/10 border-sky-blue/20',
  judging: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  completed: 'text-apple-green bg-apple-green/10 border-apple-green/20'
};

export default function HackathonView() {
  const {
    projects,
    loading,
    isAdding,
    setIsAdding,
    addProject,
    deleteProject
  } = useProjects();

  if (loading) return <Loader />;

  return (
    <div className="h-full pt-20 px-8 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12 pb-20">
        <ProjectHeader onAdd={() => setIsAdding(true)} />

        <ProjectForm 
          show={isAdding}
          onClose={() => setIsAdding(false)}
          onAdd={addProject}
        />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full py-40 text-center opacity-30 select-none">
              <Trophy className="w-24 h-24 mx-auto mb-6 text-gray-700" />
              <h3 className="text-3xl font-black uppercase italic tracking-tighter">No active sprints</h3>
              <p className="font-bold text-gray-500">TIME TO BUILD SOMETHING LEGENDARY.</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {projects.map((project) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  onDelete={deleteProject}
                  statusColors={statusColors}
                />
              ))}
            </AnimatePresence>
          )}
        </section>
      </div>
    </div>
  );
}

