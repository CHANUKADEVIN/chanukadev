const assetPath = (p: string) => {
  const base = import.meta.env.BASE_URL ?? '/';
  const normalizedBase = base.endsWith('/') ? base : base + '/';
  return normalizedBase + p.replace(/^\//, '');
};

export const portfolioData = {
  personal: {
    name: "Chanuka Devin",
    title: "Graduate Software Engineer | Go Developer | Full-Stack Engineer",
    tagline: "Building high-performance backend systems and innovative real-world solutions.",
    bioIntro: "Graduate Software Engineer with 2+ years of experience specializing in Go development, full-stack engineering, and AI/ML applications.",
    bio: "I have built scalable systems across LMS platforms, POS & inventory solutions, workflow automation tools, and AI-powered multimedia projects. Skilled in working directly with clients, delivering complete end-to-end solutions, and building clean, efficient, production-level software.",
    bioFocus: "Currently growing as a Go Developer and Full-Stack Engineer, with a strong focus on high-performance backend systems and innovative real-world problem solving.",
    techStack: ["Go", "React", "Next.js", "Node/NestJS", "Java Spring Boot", "Python (AI/ML)", "Docker", "AWS"],
    domains: ["Full-Stack Engineering", "AI/ML Applications", "LMS Platforms", "Workflow Automation"],
    email: "contact@chanukadev.com",
    avatar: assetPath('/profile/me.jpg')
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
    { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
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
      title: "Co-Founder & CTO",
      company: "AuralFlix · Self-employed",
      period: "Jan 2024 - Present · 2 yrs 4 mos",
      location: "Sri Lanka",
      description: "AuralFlix is a research-driven multimedia accessibility platform designed to support deaf and hard-of-hearing users through AI-powered 3D avatar-based sign language integration. As CTO, I led the technical vision, system architecture, and research development of the platform. My work focused on 3D modeling, gesture recognition, and inclusive multimedia technologies, bridging academic research with real-world assistive technology applications. I also contributed to research publications in multimedia accessibility and 3D avatar communication, resulting in two published research papers related to gesture recognition and accessible multimedia systems.",
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
  education: [
    {
      degree: "BSc (Hons) in Information Technology",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      location: "Sri Lanka",
      period: "2021 – 2025",
      status: "Completed",
      gpa: "3.12 – Second Lower Class",
      specialization: "Information Technology",
      logo: "https://asset.brandfetch.io/idRGDBe_PW/idhvS8W7kE.jpeg?updated=1717889740118",
      type: "degree",
      highlights: [
        "Specialization: Information Technology",
        "Relevant studies: Programming, Database Systems, Network Management, Web Development, Project Management",
        "Developed strong technical skills applicable to software development and IT project execution",
      ],
    },
    {
      degree: "Mastering the Startup Journey",
      institution: "IITM Pravartak Technologies Foundation, in collaboration with SLASSCOM & Govt. of India",
      location: "India",
      period: "2026",
      status: "Completed",
      logo: "https://upload.wikimedia.org/wikipedia/en/6/69/IIT_Madras_Logo.svg",
      type: "programme",
      highlights: [
        "Programme Focus: Entrepreneurial Thinking, Market Value, Product Development, Business Strategy & Sustainability",
        "Certificate received from Dr. Ganesanathan Geathiswaran, Deputy High Commissioner of Sri Lanka, in Chennai",
        "Participated alongside Prof. Ganesh L. S. and Prof. Rajendra Mootha",
        "Applied learnings directly to AuralFlix — focus on product validation, scalability, and venture building",
        "Supported by the Government of India 🇮🇳 and SLASSCOM",
      ],
    },
    {
      degree: "GCE Advanced Level",
      institution: "Ananda Central College, Elpitiya",
      location: "Sri Lanka",
      period: "2020",
      status: "Completed",
      logo: "https://tse1.mm.bing.net/th/id/OIP.YLfNqpYdVzNAr3ddkb1tlQHaHa?pid=Api&h=220&P=0",
      type: "school",
      highlights: [
        "Subjects & Grades: Combined Mathematics (C), Physics (C), Chemistry (C)",
      ],
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
    {
      title: "Mastering the Startup Journey – IITM Pravartak Certificate Ceremony",
      description: "Grateful to have successfully completed the Mastering the Startup Journey program conducted by IITM Pravartak Technologies Foundation, in collaboration with SLASSCOM and supported by the Government of India 🇮🇳. Honored to receive the certificate from Dr. Ganesanathan Geathiswaran, Deputy High Commissioner of Sri Lanka, at the Deputy High Commission of Sri Lanka in Chennai, alongside Prof. Ganesh L. S. and Prof. Rajendra Mootha.",
      date: "2026",
      image: assetPath('/events/final iitm.jpg')
    },
    {
      title: "IITM Pravartak – Certificate of Completion",
      description: "This program helped me develop a strong entrepreneurial thinking pattern, better understand market value, and focus on sustainability in every step of building a venture. Sincere thanks to Rajendra Mootha, Srikanth Valuthur, Balaraju Kondaveeti, and everyone who guided us throughout this journey. #IITMPravartak #StartupJourney #Entrepreneurship #Innovation",
      date: "2026",
      image: assetPath('/events/IITM certificate.jpeg')
    },
    {
      title: "Session with Prof. Gaurav Raina – AI Operating Systems @ IIT Madras",
      description: "With Professor Gaurav Raina during an insightful session with the Sri Lankan Entrepreneur Team at IIT Madras. Today reshaped how I think about building AI systems — AI is not about adding models, it's about designing an AI Operating System (AI-OS) within the organization. Key insights: Optimize across accuracy, reliability, latency, cost, personalization, AI-driven UX & multimodal delivery. Not every problem needs AI. Build across model scales with strong ModelOps, CostOps & governance. Don't 'add AI.' Architect around it. #IITMadras #AI #AIOS #SystemsThinking",
      date: "2026",
      image: assetPath('/events/rayna.jpg')
    },
    {
      title: "Mentoring Session with Abhisekh Bohra – Startup Strategy @ IIT Madras",
      description: "\"Don't attach ego or emotion to your startup — it makes decision-making harder.\" A powerful and practical reminder shared at IIT Madras by Abhisekh Bohra, Hyperscale Architect & Startup Mentor. He worked through a powerful framework to eliminate the #1 bottleneck in scaling startups — guiding clarity on measurement, emotional bottlenecks, and strategic positioning. Grateful for the impactful session. #IITMPravartak #StartupMentoring #Entrepreneurship",
      date: "2026",
      image: assetPath('/events/abishek.jpeg')
    },
    {
      title: "Week 1 at IIT Madras – People, Perspectives & Possibilities",
      description: "Week 1 reflections from India 🇮🇳✨ Being part of the first 25 startups selected for 'The Startup Journey' at IIT Madras Pravartak has opened doors to conversations that challenge how I think. Grateful to learn from Prof. Ganesh L.S., Vikram Sridhar – Storyteller & Public Speaker, Sribalaji Ravi, and Vijai Shankar Raja. A special highlight was meeting Mr. Gnanapragasam Gnanatheva, Deputy High Commissioner of India – Chennai. This journey is about reshaping mindset, unlearning old patterns, and embracing uncertainty with curiosity. Week 1 done. Many lessons unlocked. 🚀 #StartupLife #IITMPravartak #Innovation",
      date: "2026",
      image: assetPath('/events/wikram.jpeg')
    },
    {
      title: "ICAC 2025 – Research Paper Presentation",
      description: "Proud to share that our research paper 'AI-Driven 3D Avatar Framework for Sign Language Translation and Gesture Representation' has been officially published at the International Conference on Advancements in Computing (ICAC) 2025 🎓📚✨ Presenting our work at an international conference was a rewarding experience and a valuable opportunity to engage with the global research community 🌍 #ICAC2025 #ResearchPublication #ArtificialIntelligence",
      date: "2025",
      image: assetPath('/events/icac (1).jpeg')
    },
    {
      title: "ICAC 2025 – AI-Driven 3D Avatar for Sign Language",
      description: "Our research explores: AI-based gesture capture & keypoint extraction, mapping sign language movements to a 3D avatar, real-time animation & gesture synchronization, and enhancing accessibility for the Deaf community through inclusive technology. Grateful to the team — Manuja Edirisinghe, Hasini Rathnayake & Sachini Sarathchandra — and our supervisor Prof. Anuradha Jayakody for her guidance throughout this journey. #3DAvatar #SignLanguage #Accessibility #InclusiveTechnology",
      date: "2025",
      image: assetPath('/events/icac (2).jpeg')
    },
    {
      title: "ICAC 2025 – Team & Research Milestone",
      description: "Proud of what we've accomplished and excited for what's ahead 🚀 Months of dedicated research, development, testing, and collaboration came together at ICAC 2025. Presenting internationally reinforced our commitment to building inclusive, AI-powered technology for the Deaf community. #ICAC2025 #TeamWork #AcademicJourney #Innovation",
      date: "2025",
      image: assetPath('/events/icac (3).jpeg')
    },
  ]
};
