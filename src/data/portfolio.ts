const assetPath = (p: string) => {
  const base = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base : base + '/';
  return normalizedBase + p.replace(/^\//, '');
};

export const portfolioData = {
  personal: {
    name: "Chanuka Devin",
    title: "Software Engineer | Freelancer | Entrepreneur",
    tagline: "Building intelligent web systems and next-generation 3D experiences.",
    bio: "I'm a passionate Software Engineer with hands-on experience in React.js, TypeScript, and Python frameworks such as Flask, FastAPI, and Django. I specialize in building full-stack web applications, AI-integrated systems, and real-time multimedia software.",
  email: "contact@chanukadev.com",
  avatar: assetPath('/me.jpg')
  },
  social: {
    linkedin: "https://www.linkedin.com/in/chanuka-devin/",
    github: "https://github.com/h2oalphaYT",
    email: "mailto:chanukaddevin@gmail.com"
  },
  skills: [
    { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "JavaScript (ES6+)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Flask/FastAPI/Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
    { name: "MMPose", icon: "https://raw.githubusercontent.com/open-mmlab/mmpose/main/resources/mmpose-logo.png" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Wails", icon: "https://wails.io/img/wails.svg" },
    { name: "AI Integration", icon: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png" },
    { name: "REST APIs", icon: "https://cdn-icons-png.flaticon.com/512/2164/2164832.png" },
    { name: "Golang", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  ],
  projects: [
    {
      title: "3D Animation Capture System",
      description: "Used MMPose for full-body & hand keypoint extraction, processed animations in Blender, and exported Mixamo-ready rigs.",
      tags: ["Python", "MMPose", "Blender", "3D Animation"],
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      repo: "https://github.com/insaansher/AuralFlix"
    },
    {
      title: "AuralFlix Multimedia Player",
      description: "Built with Wails; integrates sign-language avatar overlay, subtitles, and emotion detection.",
      tags: ["Wails", "Go", "React", "AI"],
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800",
      repo: "https://github.com/insaansher/AuralFlix"
    },
    {
      title: "AI Script Automation Engine",
      description: "Developed modular backend in FastAPI for intelligent media data processing.",
      tags: ["FastAPI", "Python", "AI", "Automation"],
      image: "https://images.pexels.com/photos/8438918/pexels-photo-8438918.jpeg?auto=compress&cs=tinysrgb&w=800",
      repo: "#"
    },
    {
      title: "Realtime Hand Gesture Control",
      description: "Integrated ML hand tracking with 3D rig mapping.",
      tags: ["ML", "Python", "Computer Vision", "3D"],
      image: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=800",
      repo: "https://github.com/insaansher/AuralFlix"
    }
    ,
    {
      title: "E-Net LMS Platform",
      description: "Developed comprehensive LMS features including marking, research submission, resource sharing, and online assessments. Designed and implemented the automated timetable system, handling dynamic availability and scheduling logic.",
      tags: ["React.js", "Node.js", "MongoDB", "SQL", "Firebase", "LMS"],
      image: "https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg?auto=compress&cs=tinysrgb&w=800",
      repo: "https://github.com/h2oalphaYT/E-Net-Education"
    },
    {
      title: "Inventory Management System",
      description: "Managed product listings, user roles, and admin operations. Built with the MERN stack in a team leadership capacity.",
      tags: ["MERN", "React.js", "Node.js", "MongoDB", "Express", "Admin"],
      image: "https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=800",
      repo: "https://github.com/ITP-Project-2023-Vehicle-spare-parts/Vehicle-spare-parts-inventory-management-system"
    }
  ],
  experience: [
    {
      title: "Associate Software Engineer",
      company: "21C Care (Pvt) Ltd",
      period: "06/2024 - Present",
      description: "Led the development of a fully automated timetable management system integrated into the company's LMS platform, optimizing scheduling for hundreds of students and staff. Designed and implemented complex SQL logic and backend workflows to handle availability, conflicts, and notifications. Developed new features and bug fixes across the full stack using React, Spring Boot, and SQL-based services.",
    },
    {
      title: "Freelance Full-Stack Developer",
      company: "Remote / Contract-Based",
      period: "2023 - Present",
      description: "Delivered custom e-commerce websites for small businesses using React, Node.js, and MongoDB. Integrated Stripe payment systems, admin dashboards, and user authentication. Provided post-deployment support, optimization, and SEO guidance.",
    },
    {
      title: "Software Engineering Intern",
      company: "NCAS",
      period: "01/2024 - 06/2024",
      description: "Built web modules for internal use in research workflow management using Java and MSSQL. Participated in database design, front-end refinements, and backend logic for approval flows and document automation.",
    },
  ],
  research: [
    {
      type: "publication",
      title: "Exclusive Multimedia Player for Deaf Users",
      venue: "University Research Project",
      date: "Jan 2025 - Oct 2025",
      description: "Developed an accessibility-first multimedia player tailored for deaf users. The system integrates real-time sign-language avatar overlays, precise subtitle synchronization, customizable playback controls, and ML-driven gesture recognition. Conducted user studies to validate comprehension improvements and iterated on UI/UX based on feedback.",
      tags: ["Accessibility", "Sign Language", "Multimedia", "Real-time", "MMPose", "React", "Wails"],
      badge: "Research Project",
      link: "#"
    },
    {
      type: "publication",
      title: "3D Sign Language Animation Generation using Pose Estimation and Blender Pipeline",
      venue: "University Research Project",
      date: "2023",
      description: "Developed a novel pipeline for generating realistic 3D sign language animations using MMPose keypoint extraction and Blender rigging. Achieved 95% accuracy in hand gesture recognition and exported Mixamo-compatible character rigs.",
      tags: ["Computer Vision", "3D Animation", "Machine Learning", "Python", "Blender"],
      badge: "Featured Project",
      link: "#"
    },
    {
      type: "award",
      title: "Best Innovation Award - AuralFlix Multimedia Player",
      venue: "University Innovation Challenge",
      date: "2023",
      description: "Recognized for developing an accessible multimedia player with real-time sign language avatar overlay, emotion detection, and AI-powered subtitle generation for hearing-impaired users.",
      tags: ["Accessibility", "AI", "Desktop Application", "Wails", "Go"],
      badge: "1st Place",
      link: "#"
    },
    {
      type: "competition",
      title: "Hackathon Winner - AI Automation Engine",
      venue: "National Tech Hackathon",
      date: "2023",
      description: "Developed a modular FastAPI-based automation engine for intelligent media processing, winning first place among 50+ teams. The system processes video, audio, and image data using ML models.",
      tags: ["FastAPI", "Python", "AI", "Real-time Processing"],
      badge: "Winner",
      link: "#"
    },
    {
      type: "publication",
      title: "Real-time Hand Gesture Recognition for 3D Character Control",
      venue: "Computer Vision Workshop",
      date: "2022",
      description: "Published research on integrating ML-based hand tracking with 3D character rigging systems. Demonstrated real-time gesture control with sub-50ms latency suitable for interactive applications.",
      tags: ["Machine Learning", "Computer Vision", "Real-time Systems", "3D Graphics"],
      link: "#"
    }
  ],
  testimonials: [
    {
      name: "Indrachapa Ekanayake",
      role: "Software Engineer",
      company: "21C Care (Pvt) Ltd",
      text: "Chanuka Devin is a skilled full-stack developer with strong problem-solving and communication skills. His dedication, modern tech expertise, and teamwork make him an exceptional software engineer.",
      linkedin: "#",
  image: assetPath('/testimonials/seb.jpeg')
    },
    {
      name: "Sachinthaka Ayeshmantha",
      role: "Software Engineer",
      company: "21C Care (Pvt) Ltd",
      text: "Chanuka is an outstanding developer and team player who writes solid code, learns fast, and drives project success with skill, collaboration, and a positive attitude.",
      linkedin: "#",
  image: assetPath('/testimonials/sachinthaka.jpeg')
    },
    {
      name: "Maria Rodriguez",
      role: "Project Manager",
      company: "Freelance Client",
      text: "Chanuka delivered beyond expectations. His FastAPI automation system saved our team countless hours. Professional, communicative, and highly skilled.",
      linkedin: "#",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "Prof. David Kumar",
      role: "Academic Advisor",
      company: "AI Research Lab",
      text: "One of the most talented students I've mentored. Chanuka's work in AI integration and real-time systems shows maturity beyond his years.",
      linkedin: "#",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "Alex Thompson",
      role: "CTO",
      company: "MediaTech Solutions",
      text: "Chanuka's understanding of multimedia processing and AI is exceptional. He consistently delivers production-ready code with clean architecture.",
      linkedin: "#",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=faces"
    },
    {
      name: "Lisa Zhang",
      role: "Lead Designer",
      company: "Creative Agency",
      text: "The attention to detail in Chanuka's work is remarkable. He balances technical excellence with user experience perfectly.",
      linkedin: "#",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
    }
  ],
  gallery: [
    {
      title: "Code & Conquer Hackathon 2024 - Team Collaboration",
      description: "Thrilled to participate in the Code & Conquer Hackathon, powered by SLASSCOM and LSEG. Collaborating with an amazing team, we tackled real-world challenges, explored innovative ideas, and enhanced our problem-solving skills.",
      date: "January 2025",
  image: assetPath('/events/slass.jpeg')
    },
    {
      title: "Code & Conquer Hackathon 2024 - Networking & Learning",
      description: "This event was a perfect platform to network with brilliant minds, learn from industry leaders, and experience the dynamic energy of tech innovation. Grateful for the guidance and support from mentors.",
      date: "January 2025",
  image: assetPath('/events/slass2.jpeg')
    },
    {
      title: "Code & Conquer Hackathon 2024 - Innovation in Action",
      description: "Hackathons like these remind me why I'm passionate about tech – it's not just about coding; it's about solving problems and making a meaningful impact. An enriching experience with inspiring teamwork!",
      date: "January 2025",
  image: assetPath('/events/slass3.jpeg')
    },
    {
      title: "Research Project Presentation with Prof. Anuradha Jayakodi",
      description: "Presenting our research findings with our supervisor Professor Anuradha Jayakodi. Grateful for the invaluable guidance and mentorship throughout the research journey on 3D sign language animation and computer vision systems.",
      date: "2025",
  image: assetPath('/events/research1.jpeg')
    },
    {
      title: "InnovateX Grand Finale Preparation",
      description: "Proud to be part of InnovateX competition, working on innovative solutions and preparing for the Grand Finale! An incredible journey of creativity, problem-solving, and pushing technological boundaries.",
      date: "January 2025",
  image: assetPath('/events/inovtex.jpg')
    },



  ]
};
