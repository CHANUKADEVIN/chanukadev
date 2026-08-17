import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Zap, Server, Clock } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  codename: string;
  description: string;
  tags: string[];
  image: string;
  repo: string;
  demo?: string;
  metrics: { label: string; value: string; icon: React.ReactNode }[];
  arch: string[];
  status: 'LIVE' | 'ARCHIVED' | 'WIP';
}

const PROJECTS: Project[] = [
  {
    title: 'AuralFlix Multimedia Player',
    codename: 'PROJ_01',
    description: 'Accessibility-first multimedia platform for deaf users. Real-time 3D sign language avatar overlay, ML-driven emotion detection, and intelligent subtitle synchronization.',
    tags: ['Wails', 'Go', 'React', 'AI/ML', 'MMPose'],
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
    repo: 'https://github.com/insaansher/AuralFlix',
    metrics: [
      { label: 'GESTURE ACC.', value: '95%', icon: <Zap size={10} /> },
      { label: 'LATENCY', value: '<50ms', icon: <Clock size={10} /> },
      { label: 'STACK', value: 'Go + React', icon: <Server size={10} /> },
    ],
    arch: ['Wails desktop shell', 'Go backend engine', 'MMPose keypoint extraction', 'Blender rig pipeline'],
    status: 'LIVE',
  },
  {
    title: '3D Animation Capture System',
    codename: 'PROJ_02',
    description: 'Novel pipeline for generating realistic 3D sign language animations. MMPose keypoint extraction mapped to Blender rigs, exported as Mixamo-compatible characters.',
    tags: ['Python', 'MMPose', 'Blender', '3D Animation', 'Computer Vision'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    repo: 'https://github.com/insaansher/AuralFlix',
    metrics: [
      { label: 'ACCURACY', value: '95%', icon: <Zap size={10} /> },
      { label: 'FPS', value: '60fps', icon: <Clock size={10} /> },
      { label: 'FORMAT', value: 'Mixamo', icon: <Server size={10} /> },
    ],
    arch: ['MMPose keypoint extraction', 'Custom Blender scripting', 'Rig binding automation', 'FBX export pipeline'],
    status: 'ARCHIVED',
  },
  {
    title: 'E-Net LMS Platform',
    codename: 'PROJ_03',
    description: 'Full-stack Learning Management System with automated timetable scheduling, dynamic conflict resolution, online assessments, and research submission workflows.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Firebase', 'Spring Boot'],
    image: 'https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=800',
    repo: 'https://github.com/h2oalphaYT/E-Net-Education',
    metrics: [
      { label: 'USERS', value: '500+', icon: <Zap size={10} /> },
      { label: 'UPTIME', value: '99.2%', icon: <Clock size={10} /> },
      { label: 'STACK', value: 'MERN', icon: <Server size={10} /> },
    ],
    arch: ['React SPA frontend', 'Node.js REST API', 'MongoDB Atlas', 'Firebase real-time notifications'],
    status: 'LIVE',
  },
  {
    title: 'AI Script Automation Engine',
    codename: 'PROJ_04',
    description: 'Modular FastAPI-based automation engine for intelligent media data processing. Processes video, audio, and image data using ML models in a pipeline architecture.',
    tags: ['FastAPI', 'Python', 'AI', 'Automation', 'ML'],
    image: 'https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800',
    repo: '#',
    metrics: [
      { label: 'THROUGHPUT', value: '10k/hr', icon: <Zap size={10} /> },
      { label: 'LATENCY', value: '<200ms', icon: <Clock size={10} /> },
      { label: 'STACK', value: 'FastAPI', icon: <Server size={10} /> },
    ],
    arch: ['FastAPI async pipeline', 'Celery task queue', 'Redis caching', 'Docker containerized'],
    status: 'ARCHIVED',
  },
  {
    title: 'Inventory Management System',
    codename: 'PROJ_05',
    description: 'Enterprise-grade POS and inventory platform with role-based access control, real-time stock tracking, and multi-user admin dashboards.',
    tags: ['MERN', 'React.js', 'Node.js', 'MongoDB', 'Express'],
    image: 'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800',
    repo: 'https://github.com/ITP-Project-2023-Vehicle-spare-parts/Vehicle-spare-parts-inventory-management-system',
    metrics: [
      { label: 'LOAD TIME', value: '1.2s', icon: <Zap size={10} /> },
      { label: 'UPTIME', value: '99.8%', icon: <Clock size={10} /> },
      { label: 'STACK', value: 'MERN', icon: <Server size={10} /> },
    ],
    arch: ['React.js dashboard', 'Express REST API', 'MongoDB data layer', 'JWT auth + RBAC'],
    status: 'LIVE',
  },
];

const statusColor = (s: Project['status']) =>
  s === 'LIVE' ? '#ccff00' : s === 'WIP' ? '#00f0ff' : '#4a4a5a';

const ProjectCard = ({ project }: { project: Project }) => (
  <div
    className="flex-shrink-0 w-[min(85vw,480px)] h-full flex flex-col bg-carbon border border-grid-line hud-corner card-hover rounded-none relative overflow-hidden"
    style={{ padding: '32px' }}
  >
    {/* Status badge */}
    <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-xs">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: statusColor(project.status), boxShadow: `0 0 6px ${statusColor(project.status)}` }}
      />
      <span style={{ color: statusColor(project.status) }}>{project.status}</span>
    </div>

    {/* Image */}
    <div className="w-full h-40 overflow-hidden mb-6 relative">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300"
        style={{ filter: 'grayscale(0.3) contrast(1.1)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
      <div className="absolute bottom-2 left-2 font-mono text-xs text-neon-volt opacity-70">
        {project.codename}
      </div>
    </div>

    {/* Title */}
    <h3 className="font-display text-xl font-bold text-ghost-white mb-2">{project.title}</h3>
    <p className="font-body text-dim-gray text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

    {/* Architecture */}
    <div className="mb-4">
      <div className="font-mono text-xs text-cyber-cyan mb-2 tracking-widest">ARCHITECTURE</div>
      <ul className="space-y-1">
        {project.arch.map((item, i) => (
          <li key={i} className="flex items-center gap-2 font-mono text-xs text-dim-gray">
            <span className="text-neon-volt">▸</span> {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Metrics */}
    <div className="grid grid-cols-3 gap-2 mb-6">
      {project.metrics.map((m, i) => (
        <div
          key={i}
          className="border border-grid-line p-2 text-center"
          style={{ background: 'rgba(10,10,15,0.5)' }}
        >
          <div className="flex items-center justify-center gap-1 text-neon-volt mb-1">{m.icon}</div>
          <div className="font-mono text-xs font-bold text-ghost-white">{m.value}</div>
          <div className="font-mono text-xs text-dim-gray" style={{ fontSize: '9px' }}>{m.label}</div>
        </div>
      ))}
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mb-6">
      {project.tags.map((tag) => (
        <span
          key={tag}
          className="font-mono text-xs px-2 py-0.5 border border-grid-line text-dim-gray"
        >
          {tag}
        </span>
      ))}
    </div>

    {/* Actions */}
    <div className="flex gap-3">
      <a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 font-mono text-xs text-dim-gray hover:text-neon-volt border border-grid-line hover:border-neon-volt/40 px-4 py-2 transition-all duration-200"
      >
        <Github size={12} /> GITHUB
      </a>
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-mono text-xs text-obsidian bg-neon-volt px-4 py-2 hover:opacity-90 transition-opacity"
        >
          <ExternalLink size={12} /> LIVE DEMO
        </a>
      )}
    </div>
  </div>
);

export const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = track.querySelectorAll('.flex-shrink-0');
    const totalWidth = Array.from(cards).reduce((acc, card) => acc + (card as HTMLElement).offsetWidth + 32, 0);
    const scrollAmount = totalWidth - window.innerWidth + 128;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollAmount}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="bg-obsidian overflow-hidden">
      <div className="pt-20 pb-4 px-6 md:px-16">
        <SectionHeader
          index="03"
          title="ENGINEERING CASE STUDIES"
          subtitle="Production systems — architecture, metrics, and impact."
        />
      </div>

      {/* Horizontal track */}
      <div className="flex items-center h-[calc(100vh-180px)] px-16">
        <div
          ref={trackRef}
          className="flex gap-8 items-stretch will-change-transform"
          style={{ height: '520px' }}
        >
          {PROJECTS.map((project) => (
            <motion.div
              key={project.codename}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ height: '100%' }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}

          {/* End card */}
          <div
            className="flex-shrink-0 w-48 h-full flex flex-col items-center justify-center text-center border border-dashed border-grid-line"
            style={{ padding: '32px' }}
          >
            <div className="font-mono text-xs text-dim-gray mb-4">MORE ON</div>
            <a
              href="https://github.com/h2oalphaYT"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-neon-volt hover:glow-volt-text transition-all"
            >
              GITHUB →
            </a>
          </div>
        </div>
      </div>

      {/* Progress hint */}
      <div className="pb-4 px-16 flex items-center gap-3 font-mono text-xs text-dim-gray">
        <span>SCROLL TO EXPLORE</span>
        <div className="h-px flex-1 bg-grid-line" />
        <span>{PROJECTS.length} PROJECTS</span>
      </div>
    </section>
  );
};
