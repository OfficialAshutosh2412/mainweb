export const mainWebsiteData = {
  hero: {
    title: "Hi, I'm a Creator.",
    subtitle: "Turning ideas into digital realities.",
    scrollText: "Scroll to discover my journey"
  },
  story: [
    {
      id: 1,
      heading: "The Beginning",
      content: "Every journey begins with a single step. Mine began with a fascination for how things work on the web, leading me down a rabbit hole of code and design."
    }
  ],
  notes: [
    { id: 1, title: "React 19 Server Components", snippet: "A deep dive into concurrent rendering, server actions, and compiling...", date: "2024-05-12", tech: "React" },
    { id: 2, title: "Modern Styling with Tailwind v4", snippet: "Exploring the new lightning-fast Rust compiler and zero-config setup...", date: "2024-06-01", tech: "Tailwind" },
    { id: 3, title: "TypeScript Generics & Patterns", snippet: "How to design reusable, type-safe API clients and utility types...", date: "2024-06-15", tech: "TypeScript" },
    { id: 4, title: "Framer Motion SVG Layouts", snippet: "Orchestrating paths, layout transitions, and complex spring animations...", date: "2024-07-02", tech: "Framer Motion" },
    { id: 5, title: "Node.js High Performance APIs", snippet: "Optimizing response times, caching strategies, and load balancing...", date: "2024-07-10", tech: "NodeJS" },
    { id: 6, title: "CSS Grid & Subgrid Masterclass", snippet: "Creating complex nested grid card structures without hacks...", date: "2024-07-20", tech: "CSS" }
  ],
  /* Every entry pairs a full YouTube playlist with the first episode of
     that series. The raw ids/links below are the single source of truth —
     embed URLs are derived from them via the helpers at the bottom of
     this file so a link only ever has to be updated in one place. */
  youtubeShowcase: [
    {
      id: 1,
      slug: "quality-management-system",
      title: "Quality Management System (QMS)",
      description: "Full-stack quality management platform walkthrough — ASP.NET Core Web API, React.js front end, JWT role-based auth and SignalR live analytics.",
      tech: ["ASP.NET Core", "React.js", "C#", "SQL Server", "SignalR"],
      videoId: "fVX_f-Qq9Ls",
      videoUrl: "https://youtu.be/fVX_f-Qq9Ls",
      playlistId: "PLRwgK8_Um5mQ",
      playlistUrl: "https://youtube.com/playlist?list=PLRwgK8_Um5mQ"
    },
    {
      id: 2,
      slug: "live-location-tracker-management",
      title: "Live Location Tracker Management",
      description: "Real-time fleet and asset tracking portal — live map coordinates, route history and driver/vehicle management modules.",
      tech: ["ASP.NET Core", "C#", "SQL Server", "JavaScript"],
      videoId: "lIDUB4KGas4",
      videoUrl: "https://youtu.be/lIDUB4KGas4",
      playlistId: "PLup3w_QU8oiasVrjhCvdU6mbJqqOpksJo",
      playlistUrl: "https://youtube.com/playlist?list=PLup3w_QU8oiasVrjhCvdU6mbJqqOpksJo"
    },
    {
      id: 3,
      slug: "fusionmart",
      title: "FusionMart",
      description: "E-commerce storefront and inventory system — product catalogue, cart and checkout flows backed by a normalised relational schema.",
      tech: ["ASP.NET MVC", "C#", "Entity Framework", "SQL Server", "Bootstrap"],
      videoId: "rgtYnIyF1rk",
      videoUrl: "https://youtu.be/rgtYnIyF1rk",
      playlistId: "PLup3w_QU8oiY1Jw98YuSHBGisJM6HYsS6",
      playlistUrl: "https://youtube.com/playlist?list=PLup3w_QU8oiY1Jw98YuSHBGisJM6HYsS6"
    },
    {
      id: 4,
      slug: "sunrise-infotech-solution",
      title: "Sunrise Infotech Solution",
      description: "Project series built during industrial and technology training at Sunrise Infotech Solution, Lucknow — ASP.NET MVC and Python/Flask builds.",
      tech: ["ASP.NET MVC", "ASP.NET Web Forms", "C#", "Python", "Flask"],
      videoId: "t5_Lfldbm7g",
      videoUrl: "https://youtu.be/t5_Lfldbm7g",
      playlistId: "PLup3w_QU8oiZBsQ1a9qTufiJK_8cpK-Uo",
      playlistUrl: "https://youtube.com/playlist?list=PLup3w_QU8oiZBsQ1a9qTufiJK_8cpK-Uo"
    },
    {
      id: 5,
      slug: "crime-tracking-system",
      title: "Crime Tracking System (CTS)",
      description: "Role-based crime reporting and investigation portal — FIR/incident records, police station management, AJAX report generation and status notifications.",
      tech: ["ASP.NET MVC", "C#", "Entity Framework", "SQL Server", "AJAX"],
      videoId: "cAhKgxAq99M",
      videoUrl: "https://youtu.be/cAhKgxAq99M",
      playlistId: "PLup3w_QU8oiY-B5BJ_nNQ1SRfGOEkcKbX",
      playlistUrl: "https://youtube.com/playlist?list=PLup3w_QU8oiY-B5BJ_nNQ1SRfGOEkcKbX"
    }
  ],
  showcaseProjects: [
    {
      id: 1,
      title: "Frontend Development",
      description: "Designing and building responsive, interactive user interfaces with React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, and AJAX for modern web applications.",
      type: "Personal",
      tech: ["React.js", "JavaScript", "Tailwind CSS", "Bootstrap"]
    },
    {
      id: 2,
      title: "Backend Development",
      description: "Architecting scalable RESTful APIs and secure server-side applications using C#, ASP.NET Core Web API, ASP.NET MVC, Entity Framework Core, JWT Authentication, and SQL Server.",
      type: "Certified",
      tech: ["C#", "ASP.NET Core", "SQL Server", "EF Core", "JWT Auth"]
    }
  ],
  storeProjects: {
    minor: [
      {
        id: 1,
        title: "Quality Management System (QMS)",
        description: "Full-stack QMS with role-based JWT auth, real-time SignalR analytics, ASP.NET Core Web API, React.js, and SQL Server/PostgreSQL database integration.",
        price: "$25",
        features: [
          "JWT Auth & Role-Based Security",
          "Real-Time SignalR Analytics & Notifications",
          "Complete Source Code & Architectural Blueprint"
        ],
        tech: ["ASP.NET Core", "React.js", "C#", "SQL Server", "SignalR"],
        hasDocumentation: true,
        hasThesis: true,
        youtubeId: 1
      },
      {
        id: 2,
        title: "Crime Tracking System (CTS)",
        description: "Role-based crime reporting & management portal using ASP.NET MVC, C#, Entity Framework, LINQ, SQL Server, and AJAX-based async retrieval.",
        price: "$20",
        features: [
          "Role-Based Incident & Crime Reporting",
          "AJAX Asynchronous Data Retrieval Modules",
          "Entity Framework & SQL Server Database Schema"
        ],
        tech: ["ASP.NET MVC", "C#", "SQL Server", "Bootstrap"],
        hasDocumentation: true,
        hasThesis: true,
        youtubeId: 5
      },
      {
        id: 3,
        title: "SIS Institute Academy Portal",
        description: "Academy management portal for student enrollment, record management, certificate generation, and status tracking using ASP.NET Web Forms & ADO.NET.",
        price: "$18",
        features: [
          "Student Enrollment & Transcript Management",
          "Automated Certificate Generation Engine",
          "ADO.NET Data Layer & Stored Procedures"
        ],
        tech: ["ASP.NET Web Forms", "C#", "SQL Server", "ADO.NET"],
        hasDocumentation: true,
        hasThesis: false
      },
      {
        id: 4,
        title: "Digital Diary & Cloud Note Vault",
        description: "Minimalist encrypted note taking & diary web application built with React.js, Tailwind CSS, PostgreSQL, and Supabase Authentication.",
        price: "$15",
        features: [
          "Client-Side Note Encryption & Secure Vault",
          "Supabase Auth & Cloud Database Sync",
          "Clean Modern UI & Markdown Support"
        ],
        tech: ["React.js", "Tailwind CSS", "Supabase", "PostgreSQL"],
        hasDocumentation: true,
        hasThesis: false
      }
    ]
  }
};

export const portfolioData = {
  header: {
    name: "ASHUTOSH PRASAD",
    role: "C# / .NET Developer",
    location: "Lucknow, Uttar Pradesh",
    phone: "+91-6386239194",
    email: "ashutoshprasad2427@gmail.com",
    linkedin: "https://linkedin.com/in/ashutosh-prasad-0449181ba",
    github: "https://github.com/OfficialAshutosh2412"
  },
  // summary: "MCA graduate with hands-on experience in C#, ASP.NET MVC, ASP.NET Core Web API, React.js, and SQL Server through internships, technical training, and academic projects. Skilled in developing full-stack web applications, RESTful APIs, authentication and authorization, and database-driven applications using Entity Framework Core and ADO.NET. Seeking an entry-level .NET Developer role to contribute to modern software solutions while continuing to grow professionally.",
  technicalSkills: {
    languages: ["C#", "JavaScript", "SQL", "Python", "C", "C++"],
    backend: ["ASP.NET Web Forms", "ASP.NET MVC", "ASP.NET Core Web API", "ADO.NET", "Entity Framework", "Entity Framework Core", "LINQ", "ASP.NET Core Identity", "JWT Authentication", "SignalR", "RESTful APIs"],
    frontend: ["HTML5", "CSS3", "JavaScript", "React.js", "Bootstrap", "Tailwind CSS", "jQuery", "AJAX"],
    database: ["SQL Server", "MySQL", "PostgreSQL"],
    tools: ["Visual Studio", "Visual Studio Code", "Git", "GitHub", "Postman", "Swagger/OpenAPI", "SQL Server Management Studio (SSMS)", "PgAdmin", "Vercel", "Render", "Supabase"]
  },
  experience: [
    {
      id: 1,
      role: "Summer Internship in Python",
      company: "MT Academy India Pvt. Ltd.",
      period: "June 2019 - August 2019",
      location: "Lucknow, India",
      bullets: [
        "Developed a desktop-based Restaurant Billing System using Python Tkinter and MySQL",
        "Wrote optimized MySQL queries to support CRUD operations"
      ]
    },
    {
      id: 2,
      role: "Python Technology Training",
      company: "Sunrise Infotech Solution",
      period: "February 2020 - June 2020",
      location: "Lucknow, India",
      bullets: [
        "Developed a CRUD-based Digital Diary web application using Flask and MySQL",
        "Designed database schema and relationships in MySQL (PhpMyAdmin) WampServer for a small-scale journal management"
      ]
    },
    {
      id: 3,
      role: "DOTNET MVC Technology Industrial Training",
      company: "Sunrise Infotech Solution",
      period: "June 2023 - July 2023",
      location: "Lucknow, India",
      bullets: [
        "Developed Crime Tracking System, a full stack web application using ASP.NET MVC",
        "Implemented AJAX-based server communication in ASP.NET MVC to perform refresh-free data retrieval"
      ]
    },
    {
      id: 4,
      role: "DOTNET CORE Online Training",
      company: "Shiva Concept Solution",
      period: "September 2024 - August 2025",
      location: "Madhya Pradesh, India",
      bullets: [
        "Developed a full-stack Quality Management System (QMS) using ASP.NET Core Web API and React.js with a RESTful architecture",
        "Implemented JWT-based authentication and ASP.NET Core Identity for secure user authentication and role-based authorization"
      ]
    }
  ],
  certificates: [
    { id: 1, type: "Industrial Training", title: "ASP.NET MVC Development", issuer: "Sunrise Infotech Solution", year: "July 2023" },
    { id: 2, type: "Full Stack Training", title: "ASP.NET Core Web API Development", issuer: "CodeMug Full Stack Online Training", year: "2024 - 2025" },
    { id: 3, type: "Bootcamp", title: "React.js Bootcamp", issuer: "Let's Upgrade", year: "May 2024" },
    { id: 4, type: "Bootcamp", title: "Frontend Web Development Bootcamp", issuer: "Udemy", year: "September 2024" }
  ],
  academicProjects: [
    {
      id: 1,
      title: "Quality Management System (QMS)",
      techStack: ["ASP.NET Core Web API", "React.js", "C#", "Entity Framework Core", "SQL Server", "PostgreSQL"],
      bullets: [
        "Developed a full-stack Quality Management System using ASP.NET Core Web API and React.js for quality process management and analytics",
        "Implemented JWT Authentication, ASP.NET Core Identity, role-based authorization, SignalR real-time notifications, and admin dashboards",
        "Designed and implemented RESTful APIs using Entity Framework Core with SQL Server/PostgreSQL integration",
        "Deployed the React.js frontend on Vercel, the ASP.NET Core Web API on Render, and a PostgreSQL database on Supabase for end-to-end cloud deployment"
      ]
    },
    {
      id: 2,
      title: "Crime Tracking System (CTS)",
      techStack: ["ASP.NET MVC", "C#", "Entity Framework", "LINQ", "SQL Server"],
      bullets: [
        "Built a role-based crime reporting and management system with Admin and User modules using ASP.NET MVC, SQL Server, and AJAX",
        "Implemented asynchronous CRUD operations, DataTables, report generation, police station management, and status notifications",
        "Developed a responsive UI using HTML, CSS, JavaScript, Bootstrap, and jQuery"
      ]
    },
    {
      id: 3,
      title: "SIS Institute Academy Portal",
      techStack: ["ASP.NET Web Forms", "C#", "ADO.NET", "SQL Server"],
      bullets: [
        "Developed an academy management portal for student enrollment, record management, certificate generation, and status tracking",
        "Built secure CRUD modules using ASP.NET Web Forms, ADO.NET, AJAX, and SQL Server for efficient academic administration"
      ]
    },
    {
      id: 4,
      title: "Digital Diary Web Application",
      techStack: ["Python", "Flask", "Jinja2", "MySQL"],
      bullets: [
        "Developed a diary management web application using Python Flask, Jinja2, and MySQL",
        "Implemented secure CRUD operations with a responsive interface using HTML, CSS, and JavaScript"
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Master of Computer Applications (MCA)",
      institution: "Dr. Abdul Kalam Technical University, Lucknow",
      period: "2021 - 2023",
      score: "CGPA: 8.24",
      iconType: "Building2"
    },
    {
      id: 2,
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "University of Lucknow, Lucknow",
      period: "2017 - 2020",
      score: "Percentage: 61.02%",
      iconType: "School"
    }
  ]
};



/* ── YouTube link helpers ──────────────────────────────────────────
   Components never build embed URLs by hand: they ask for these so a
   link change in `youtubeShowcase` propagates everywhere. */

/* Embeddable player URL for a single video id. `rel=0` keeps YouTube's
   "more video" suggestions off the embedded player. */
export const videoEmbedUrl = (videoId) =>
  `https://www.youtube.com/embed/${videoId}?rel=0`;

/* Embeddable playlist player — the `videoseries` list format is the only
   way YouTube exposes a whole playlist inside an <iframe>. */
export const playlistEmbedUrl = (playlistId) =>
  `https://www.youtube.com/embed/videoseries?list=${playlistId}`;

/* Resolve a `youtubeId` reference (used by store/project cards) to its
   showcase entry. Returns null when a project has no linked series. */
export const getShowcaseById = (youtubeId) =>
  mainWebsiteData.youtubeShowcase.find((item) => item.id === youtubeId) ?? null;

/* Resolve the `/video/<slug>` route parameter to its showcase entry.
   Returns null for an unknown slug so the page can render a 404 state. */
export const getShowcaseBySlug = (slug) =>
  mainWebsiteData.youtubeShowcase.find(
    (item) => item.slug === String(slug).toLowerCase()
  ) ?? null;
