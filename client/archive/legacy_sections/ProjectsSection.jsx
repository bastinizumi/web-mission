import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ExternalLink, FolderGit2, X } from 'lucide-react';

const CATEGORIES = ['All', 'E-Commerce', 'UI/UX Design', 'Web Development', 'Enterprise'];

function ProjectShowcaseCard({ project, index, onOpen }) {
  return (
    <div
      onClick={() => onOpen(project)}
      className="bento-card bento-card-hover cursor-pointer overflow-hidden flex flex-col justify-between bg-white/95 backdrop-blur-sm group"
    >
      {/* Application Window Chrome Header */}
      <div className="flex items-center justify-between border-b-[2px] border-black bg-slate-100 px-4 py-2.5 select-none">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
          <span className="ml-2 font-mono-tech text-[10px] font-bold text-slate-500 hidden sm:inline">
            app://{project.slug || 'project'}.prod
          </span>
        </div>

        {/* Browser SSL Address Pill */}
        <div className="flex items-center gap-1.5 rounded-md border border-black bg-white px-3 py-0.5 font-mono-tech text-[10px] font-bold text-slate-800 shadow-[1px_1px_0px_#000] truncate max-w-[200px]">
          <span className="text-emerald-700 font-bold">🔒</span>
          <span className="truncate">webmission.dev/{project.slug}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono-tech text-[10px] font-black text-black bg-white border border-black rounded px-1.5 py-0.2">
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Visual Application Viewport */}
      <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-950">
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-black/60 px-3 py-1 font-mono-tech text-[9px] font-bold text-white/90 backdrop-blur-xs">
          <span>CANVAS: 1440×900 RETINA</span>
          <span className="text-emerald-400 font-black">● RUNNING</span>
        </div>

        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-9 left-3.5 rounded-lg border-2 border-black bg-white px-3 py-1 font-mono-tech text-[10px] font-black uppercase text-black shadow-[2px_2px_0px_#000]">
          {project.clientName}
        </div>

        {project.impactMetric && (
          <div className="absolute top-9 right-3.5 rounded-lg border-2 border-black bg-black px-3 py-1 font-mono-tech text-[10px] font-black text-white shadow-[2px_2px_0px_#000]">
            {project.impactMetric}
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
          <div className="bg-white/95 border-2 border-black rounded-xl p-3 shadow-[3px_3px_0px_#000] flex-1">
            <p className="font-mono-tech text-[11px] font-bold text-slate-700">
              {project.headline}
            </p>
            <h3 className="font-display text-lg sm:text-xl font-black text-black">
              {project.title}
            </h3>
          </div>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[3px_3px_0px_#000] transition-transform group-hover:rotate-45">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Application Metadata & Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white px-5 py-4 border-t-2 border-black">
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-md border-2 border-black bg-slate-50 px-2.5 py-1 text-xs font-bold text-black"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 font-mono-tech text-xs font-black text-black group-hover:underline">
          <span>Open Application</span>
          <span>&rarr;</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects = [], onStartSimilar }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(
      (p) => p.category === activeCategory || p.tags?.includes(activeCategory)
    );
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-3.5 py-1 mb-4 shadow-[2px_2px_0px_#000]">
              <FolderGit2 className="h-4 w-4 text-black" />
              <span className="font-mono-tech text-xs font-bold tracking-wider text-black uppercase">
                Selected Portfolio ({filtered.length} Projects)
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-black max-w-2xl leading-[1.08]">
              Explore Our Best Recently Completed Projects
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-black border-2 border-black transition-all ${
                    active
                      ? 'bg-black text-white shadow-[3px_3px_0px_#000]'
                      : 'bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Bento Project Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, idx) => (
            <ProjectShowcaseCard
              key={project.slug || project.title}
              project={project}
              index={idx}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bento-card relative w-full max-w-2xl overflow-hidden p-0 shadow-[8px_8px_0px_#000]"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000] hover:bg-black hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative h-64 sm:h-72 border-b-2 border-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 bg-white">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-lg border-2 border-black bg-slate-100 px-3 py-1 font-mono-tech text-xs font-black text-black">
                    {selectedProject.clientName}
                  </span>
                  {selectedProject.impactMetric && (
                    <span className="rounded-lg border-2 border-black bg-black px-3 py-1 font-mono-tech text-xs font-black text-white">
                      {selectedProject.impactMetric}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-black text-black">
                  {selectedProject.title}
                </h3>
                <p className="mt-1 font-display text-sm font-bold text-slate-700">
                  {selectedProject.headline}
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-800 font-medium">
                  {selectedProject.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedProject.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border-2 border-black bg-slate-50 px-3 py-1 text-xs font-black text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t-2 border-black/15 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedProject.title;
                      setSelectedProject(null);
                      onStartSimilar?.(`Similar to: ${title}`);
                    }}
                    className="btn-bento-black inline-flex items-center gap-2 py-3 px-6 text-xs"
                  >
                    Build a Similar Project
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="text-xs font-black text-slate-600 hover:text-black"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
