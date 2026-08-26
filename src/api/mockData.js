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
  youtubeVideos: [
    { id: 1, title: "ASP.NET Core Web API & React.js Integration Tutorial", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 2, title: "Building Secure REST APIs with JWT & Entity Framework", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    { id: 3, title: "Modern C# & .NET Architecture Best Practices 2026", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
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
        tech: ["ASP.NET Core", "React.js", "C#", "SQL Server", "SignalR"],
        hasDocumentation: true, 
        hasThesis: true 
      },
      { 
        id: 2, 
        title: "Crime Tracking System (CTS)", 
        description: "Role-based crime reporting & management portal using ASP.NET MVC, C#, Entity Framework, LINQ, SQL Server, and AJAX-based async retrieval.", 
        price: "$20", 
        tech: ["ASP.NET MVC", "C#", "SQL Server", "Bootstrap"],
        hasDocumentation: true, 
        hasThesis: true 
      },
      { 
        id: 3, 
        title: "SIS Institute Academy Portal", 
        description: "Academy management portal for student enrollment, record management, certificate generation, and status tracking using ASP.NET Web Forms & ADO.NET.", 
        price: "$18", 
        tech: ["ASP.NET Web Forms", "C#", "SQL Server", "ADO.NET"],
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
  summary: "MCA graduate with hands-on experience in C#, ASP.NET MVC, ASP.NET Core Web API, React.js, and SQL Server through internships, technical training, and academic projects. Skilled in developing full-stack web applications, RESTful APIs, authentication and authorization, and database-driven applications using Entity Framework Core and ADO.NET. Seeking an entry-level .NET Developer role to contribute to modern software solutions while continuing to grow professionally.",
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

