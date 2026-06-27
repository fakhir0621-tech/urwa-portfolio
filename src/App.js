import React, { useState, useEffect, useRef } from 'react';
import './index.css';

// ---- ICONS ----
const Icon = ({ d, size = 20, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d={d} />
  </svg>
);

const ICONS = {
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z",
  arrow: "M5 12h14M12 5l7 7-7 7",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 9.81a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
  plus: "M12 5v14M5 12h14",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  up: "M18 15l-6-6-6 6",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  layout: "M12 2H2v10h10V2zM22 2h-8v6h8V2zM22 12h-8v10h8V12zM12 16H2v6h10v-6z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  img: "M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21",
  chevLeft:  "M15 18l-6-6 6-6",
  chevRight: "M9 18l6-6-6-6",
  expand: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3",
};

// ---- CONTACT HELPERS ----
const openGmail = () => {
  window.open('https://mail.google.com/mail/?view=cm&to=urwazareef4@gmail.com&su=Portfolio%20Inquiry', '_blank');
};

// ---- DATA ----
const navLinks = [
  { label: 'Home',       href: '#home' },
  { label: 'Services',   href: '#services' },
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
];

const services = [
  { icon: ICONS.layout, title: 'Frontend Development',    desc: 'Developing modern, responsive, and interactive web applications using React.js, JavaScript, HTML5, CSS3, and Bootstrap.' },
  { icon: ICONS.zap,    title: 'UI/UX Design',            desc: 'Designing clean, intuitive, and user-friendly interfaces that provide seamless user experiences across all devices.' },
  { icon: ICONS.code,   title: 'React.js Development',    desc: 'Creating reusable React components, state management solutions, dynamic interfaces, and scalable frontend architectures.' },
  { icon: ICONS.link,   title: 'API Integration',         desc: 'Connecting frontend applications with RESTful APIs, authentication systems, and third-party services efficiently.' },
  { icon: ICONS.eye,    title: 'Responsive Design',       desc: 'Building websites optimized for desktop, tablet, and mobile devices using modern responsive design techniques.' },
  { icon: ICONS.star,   title: 'Performance Optimization',desc: 'Improving website performance, accessibility, responsiveness, and overall user experience for better results.' },
];

const skills = [
  { cat: 'Programming Languages',  items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Node.js'] },
  { cat: 'Frontend Technologies',  items: ['React.js', 'Bootstrap', 'Responsive Web Design', 'Component-Based Dev', 'SPA Development'] },
  { cat: 'Backend & Database',     items: ['Node.js', 'MongoDB', 'Express.js', 'REST APIs', 'Authentication Systems'] },
  { cat: 'UI/UX',                  items: ['Wireframing', 'Responsive Design', 'User Interface Design', 'UX Principles', 'Prototyping', 'Design Systems'] },
  { cat: 'Tools & Platforms',      items: ['Git', 'GitHub', 'VS Code', 'Nodemailer', 'OpenAI APIs', 'Llama 3'] },
];

const projects = [
  {
    id: 1,
    title: 'Intelligent Tourism Platform',
    subtitle: 'Full Stack AI-Powered Tourism Management System',
    desc: 'An intelligent tourism platform developed as a final-year project that helps travelers discover destinations, receive AI-powered recommendations, and manage tour bookings.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'OpenAI', 'Express.js'],
    featured: true,
    features: [
      'AI Recommendations','NLP Chatbot','OpenAI Integration','Llama 3 Chatbot',
      'Role-Based Auth','Email Verification','Live Weather Forecast','Tour Booking',
      'Payment Integration','Admin Dashboard','Responsive UI','REST APIs',
    ],
    fullDesc: 'An intelligent tourism platform developed as a final-year project that helps travelers discover destinations, receive AI-powered recommendations, explore tourist attractions, and manage tour bookings. The platform includes secure authentication, role-based dashboards, AI chatbot integration, weather forecasting, payment processing, email notifications, and comprehensive tour management features.',
    // Place screenshots in public/projects/ and list filenames here:
    screenshots: [
      '/projects/screenshot1.png',
      '/projects/screenshot2.png',
      '/projects/screenshot3.png',
      '/projects/screenshot4.png',
      '/projects/screenshot5.png',
      '/projects/screenshot6.png',
      '/projects/screenshot7.png',
      '/projects/screenshot8.png',
      '/projects/screenshot9.png',
      '/projects/screenshot10.png',
      '/projects/screenshot11.png',
      '/projects/screenshot12.png',
      '/projects/screenshot13.png',
      '/projects/screenshot14.png',
      '/projects/screenshot15.png',
      '/projects/screenshot16.png',
      '/projects/screenshot17.png',
    ],
  },
];

const experience = [
  {
    period: 'June 2026',
    role: 'Frontend Developer Intern',
    company: 'Reverse4K × International Islamic University Islamabad',
    desc: 'Worked on modern web development projects while collaborating with experienced developers. Gained practical industry experience in frontend development, deployment workflows, responsive design implementation, and software development best practices.',
  },
  {
    period: 'January 2024 – June 2024',
    role: 'Web Development Trainee',
    company: 'National Freelancing Training Program (NFTP)',
    desc: 'Successfully completed an intensive web development training program covering frontend and full-stack development concepts. Acquired practical experience in HTML5, CSS3, JavaScript, React.js, Bootstrap, Tailwind CSS, and WordPress.',
  },
];

const education = [
  {
    period: '2022 – 2026',
    degree: 'Bachelor of Information Technology',
    school: 'International Islamic University Islamabad',
    desc: "Completing a Bachelor's degree in IT with focus on software engineering, web development, database systems, networking, cybersecurity, and modern application development.",
  },
  {
    period: '2019 – 2021',
    degree: 'Higher Secondary School Certificate (Pre-Medical)',
    school: 'Punjab Girls College Rawalakot, AJK',
    desc: 'Completed pre-medical studies before transitioning into Information Technology, demonstrating adaptability and a strong passion for technology.',
  },
];

const certs = [
  { name: 'Certificate of Completion – Web Development Track', org: 'National Freelancing Training Program (NFTP)' },
  { name: 'Certificate of Appreciation',                        org: 'CosmiCode Coding Quiz Competition' },
  { name: 'Web Development Internship Certificate',             org: 'Reverse4K × IIUI' },
];

const marqueeItems = ['React.js','JavaScript','TypeScript','UI/UX Design','Node.js','MongoDB','REST APIs','Responsive Design','Bootstrap','Git & GitHub'];

// ============================================================
// LIGHTBOX — fullscreen image viewer with prev/next/close
// ============================================================
function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const total = images.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  // Keyboard navigation
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape')      onClose();
      if (e.key === 'ArrowLeft')   prev();
      if (e.key === 'ArrowRight')  next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [next, onClose, prev]);

  // Touch swipe support
  const touchStartX = useRef(null);
  const handleTouchStart = e => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = e => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.2s ease',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* TOP BAR */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 600 }}>
          {current + 1} / {total}
        </span>
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', fontSize: '1.3rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#e53935'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          title="Close (Esc)"
        >✕</button>
      </div>

      {/* PREV BUTTON */}
      {total > 1 && (
        <button
          onClick={prev}
          style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            width: 50, height: 50, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', zIndex: 1,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent, #e8a020)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          title="Previous (←)"
        >
          <Icon d={ICONS.chevLeft} size={24} />
        </button>
      )}

      {/* MAIN IMAGE */}
      <div style={{
        maxWidth: '90vw', maxHeight: '80vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <img
          key={current}
          src={images[current]}
          alt={`Screenshot ${current + 1}`}
          style={{
            maxWidth: '90vw', maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: 8,
            boxShadow: '0 8px 60px rgba(0,0,0,0.6)',
            animation: 'slideUp 0.25s ease',
          }}
        />
      </div>

      {/* NEXT BUTTON */}
      {total > 1 && (
        <button
          onClick={next}
          style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            width: 50, height: 50, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s', zIndex: 1,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent, #e8a020)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          title="Next (→)"
        >
          <Icon d={ICONS.chevRight} size={24} />
        </button>
      )}

      {/* BOTTOM THUMBNAIL STRIP */}
      {total > 1 && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '16px 24px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          display: 'flex', gap: 8, justifyContent: 'center',
          overflowX: 'auto', flexWrap: 'nowrap',
        }}>
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Thumb ${i + 1}`}
              onClick={() => setCurrent(i)}
              style={{
                width: 56, height: 36, objectFit: 'cover',
                borderRadius: 4, cursor: 'pointer', flexShrink: 0,
                border: i === current ? '2px solid #e8a020' : '2px solid transparent',
                opacity: i === current ? 1 : 0.5,
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// PROJECT MODAL — gallery thumbnails → click → Lightbox
// ============================================================
function ProjectModal({ project, onClose }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape' && lightboxIndex === null) onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose, lightboxIndex]);

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <>
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && lightboxIndex === null && onClose()}>
        <div className="modal-box">
          {/* HEADER */}
          <div className="modal-header">
            <div>
              <h2>{project.title}</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginTop: 4 }}>{project.subtitle}</p>
            </div>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>

          <div className="modal-body">
            {/* GALLERY GRID */}
            {hasScreenshots ? (
              <>
                {/* Hint text */}
                <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon d={ICONS.expand} size={14} />
                  Click any image to view fullscreen
                </p>
                <div className="modal-gallery">
                  {project.screenshots.map((src, i) => (
                    <div
                      key={i}
                      className="gallery-item"
                      onClick={() => setLightboxIndex(i)}
                      title="Click to view fullscreen"
                    >
                      <img src={src} alt={`Screenshot ${i + 1}`} />
                      {/* Hover overlay with expand icon */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'rgba(26,58,42,0.6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        opacity: 0, transition: 'opacity 0.2s',
                        borderRadius: 6,
                      }}
                        className="gallery-hover-overlay"
                      >
                        <div style={{
                          background: 'rgba(255,255,255,0.15)',
                          border: '1px solid rgba(255,255,255,0.4)',
                          borderRadius: '50%', width: 36, height: 36,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff',
                        }}>
                          <Icon d={ICONS.expand} size={16} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="gallery-placeholder">
                <Icon d={ICONS.img} size={40} />
                <p>Project screenshots coming soon!</p>
                <small>Add images to <strong>public/projects/</strong> and list them in <strong>App.js → projects → screenshots</strong></small>
              </div>
            )}

            {/* PROJECT INFO */}
            <div className="modal-project-info">
              <div className="modal-tech-tags">
                {project.tags.map((t, i) => <span key={i} className="modal-tech-tag">{t}</span>)}
              </div>
              <p>{project.fullDesc}</p>
              <div className="modal-features">
                <h4>Key Features</h4>
                <ul>{project.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX — renders on top of everything */}
      {lightboxIndex !== null && (
        <Lightbox
          images={project.screenshots}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar({ dark, toggleDark, activeSection }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="navbar">
        <div className="nav-inner">
          <div className="nav-logo">UZ</div>
          <div className="nav-links">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} className={activeSection === l.href.slice(1) ? 'active' : ''}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-right">
            <button className="theme-toggle" onClick={toggleDark} title="Toggle dark mode">
              {dark ? <Icon d={ICONS.sun} size={17} /> : <Icon d={ICONS.moon} size={17} />}
            </button>
            <button className="nav-contact-btn" onClick={openGmail}>Contact Me</button>
            <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {navLinks.map(l => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <button className="btn btn-accent" style={{ marginTop: 8, justifyContent: 'center' }}
          onClick={() => { setOpen(false); openGmail(); }}>
          Contact Me
        </button>
      </div>
    </>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const [typed, setTyped] = useState('');
  const titles = ['Frontend Developer', 'React.js Developer', 'UI/UX Designer'];
  const titleRef = useRef(0);
  const charRef  = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = titles[titleRef.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charRef.current + 1));
        charRef.current++;
        if (charRef.current === current.length) { deleting.current = true; return 2000; }
      } else {
        setTyped(current.slice(0, charRef.current - 1));
        charRef.current--;
        if (charRef.current === 0) {
          deleting.current = false;
          titleRef.current = (titleRef.current + 1) % titles.length;
          return 400;
        }
      }
      return deleting.current ? 60 : 90;
    };
    let timeout;
    const run = () => { const delay = tick(); timeout = setTimeout(run, delay); };
    timeout = setTimeout(run, 800);
    return () => clearTimeout(timeout);
  }, [titles]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Urwa_Zareef_CV.pdf';
    link.download = 'Urwa_Zareef_CV.pdf';
    link.click();
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-greeting"><span>👋</span> Hello There!</div>
            <h1 className="hero-name">I'm <em>Urwa Zareef,</em></h1>
            <div className="hero-title">{typed}<span className="cursor">|</span></div>
            <p className="hero-desc">
              I'm a passionate Frontend Developer and UI/UX Designer specializing in creating responsive,
              interactive, and user-friendly web applications. With expertise in React.js, JavaScript,
              TypeScript, and modern frontend technologies, I transform ideas into scalable digital products.
            </p>
            <div className="hero-btns">
              <button className="btn btn-accent" onClick={openGmail}>
                <Icon d={ICONS.mail} size={16} /> Contact Me
              </button>
              <a href="#projects" className="btn btn-outline">
                View My Work <Icon d={ICONS.arrow} size={16} />
              </a>
              <button className="btn btn-primary" onClick={handleDownloadCV}>
                <Icon d={ICONS.download} size={16} /> Download CV
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat"><span className="stat-num">05<span>+</span></span><span className="stat-label">Projects Done</span></div>
              <div className="stat"><span className="stat-num">15<span>+</span></span><span className="stat-label">Technologies</span></div>
              <div className="stat"><span className="stat-num">03<span>+</span></span><span className="stat-label">Certificates</span></div>
              <div className="stat"><span className="stat-num">01<span>+</span></span><span className="stat-label">Internships</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-img-wrap">
              <div className="hero-badge badge-1"><span style={{ color: 'var(--accent)', marginRight: 6 }}>✦</span> UI/UX Designer</div>
              <div className="hero-img-circle">
                <img src="/images/hero.png" alt="Urwa Zareef"
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div className="hero-img-fallback" style={{ display: 'none' }}>
                  <Icon d={ICONS.user} size={70} />
                  <p>Add your photo to<br /><strong>public/images/hero.png</strong></p>
                </div>
              </div>
              <div className="hero-badge badge-2 badge-accent"><span style={{ marginRight: 4 }}>⚡</span> React Developer</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.cursor{color:var(--accent);font-weight:700;animation:blink 1s step-end infinite}@keyframes blink{50%{opacity:0}}`}</style>
    </section>
  );
}

// ============================================================
// MARQUEE
// ============================================================
function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="skills-marquee">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">{item}<span className="marquee-dot">✦</span></span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// SERVICES
// ============================================================
function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-label">Services</div>
        <h2 className="section-heading">Services <span className="display">I Provide</span></h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon"><Icon d={s.icon} size={22} /></div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="service-link">Learn more <Icon d={ICONS.arrow} size={14} /></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// ABOUT
// ============================================================
function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="about-grid">
          <div className="about-img-wrap">
            <div className="about-img-frame">
              <img src="/images/about.png" alt="About Urwa Zareef"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
              <div className="about-img-fallback" style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: 'rgba(255,255,255,0.5)', padding: 20, textAlign: 'center', background: 'linear-gradient(135deg,var(--primary) 0%,var(--primary-dark) 100%)' }}>
                <Icon d={ICONS.user} size={60} />
                <p style={{ fontSize: '0.82rem' }}>Add your photo to<br /><strong>public/images/about.png</strong></p>
              </div>
            </div>
            <div className="about-stat-card card2"><div className="num">05+</div><div className="lbl">Projects Completed</div></div>
            <div className="about-stat-card card1"><div className="num">15+</div><div className="lbl">Technologies</div></div>
          </div>
          <div className="about-content">
            <div>
              <div className="section-label">About Me</div>
              <h2 className="section-heading" style={{ marginBottom: 20 }}>Who is <span className="display">Urwa Zareef?</span></h2>
            </div>
            <p>Hi, I'm <strong>Urwa Zareef</strong>, a Frontend Developer and UI/UX Designer currently completing my Bachelor's degree in Information Technology at the International Islamic University Islamabad.</p>
            <p>I am a dedicated and enthusiastic Frontend Developer with a strong academic background in IT and a passion for crafting modern web applications using React.js, JavaScript, TypeScript, HTML5, CSS3, and Bootstrap.</p>
            <p>I believe that great software is built through collaboration, continuous learning, and attention to detail. My goal is to contribute to innovative projects where I can grow as a developer while creating impactful digital products.</p>
            <div className="about-info-grid">
              <div className="about-info-item"><span className="about-info-label">Full Name</span><span className="about-info-value">Urwa Zareef</span></div>
              <div className="about-info-item"><span className="about-info-label">Profession</span><span className="about-info-value">Frontend Developer</span></div>
              <div className="about-info-item"><span className="about-info-label">Location</span><span className="about-info-value">Islamabad, Pakistan</span></div>
              <div className="about-info-item"><span className="about-info-label">Email</span><span className="about-info-value" style={{ fontSize: '0.82rem' }}>urwazareef4@gmail.com</span></div>
              <div className="about-info-item"><span className="about-info-label">Phone</span><span className="about-info-value">0349-8537407</span></div>
              <div className="about-info-item"><span className="about-info-label">Languages</span><span className="about-info-value">English, Urdu</span></div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={openGmail}><Icon d={ICONS.mail} size={15} /> Hire Me</button>
              <a href="#projects" className="btn btn-outline">View Projects <Icon d={ICONS.arrow} size={15} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SKILLS
// ============================================================
function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-label">Expertise</div>
        <h2 className="section-heading">My Technical <span className="display">Skills</span></h2>
        <div className="skills-section-grid">
          {skills.map((cat, i) => (
            <div key={i} className="skill-category">
              <div className="skill-cat-title">{cat.cat}</div>
              <div className="skill-tags">
                {cat.items.map((tag, j) => <span key={j} className="skill-tag">{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROJECTS
// ============================================================
function Projects() {
  const [modal, setModal] = useState(null);
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <div className="projects-header">
          <div>
            <div className="section-label">Portfolio</div>
            <h2 className="section-heading" style={{ marginBottom: 0 }}>My Latest <span className="display">Projects</span></h2>
          </div>
          <button className="btn btn-primary" onClick={openGmail}>Hire Me <Icon d={ICONS.arrow} size={15} /></button>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card" onClick={() => setModal(project)}>
              <div className="project-img">
                <img src={`/projects/project${project.id}.jpg`} alt={project.title}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                <div className="project-img-placeholder" style={{ display: 'none' }}>
                  <Icon d={ICONS.layout} size={36} /><p>Click to view project details</p>
                </div>
                <div className="project-overlay">
                  <button className="overlay-btn" onClick={e => { e.stopPropagation(); setModal(project); }}>
                    <Icon d={ICONS.eye} size={14} /> View Gallery
                  </button>
                </div>
              </div>
              <div className="project-tags">
                {project.featured && <span className="project-tag featured">⭐ Featured</span>}
                {project.tags.slice(0, 3).map((t, i) => <span key={i} className="project-tag">{t}</span>)}
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </div>
          ))}
          {[2, 3].map(n => (
            <div key={n} className="project-card coming-soon">
              <div className="project-img">
                <div className="project-img-placeholder">
                  <Icon d={ICONS.plus} size={32} /><p>Coming Soon</p>
                </div>
              </div>
              <div className="project-tags">
                <span className="project-tag">React.js</span>
                <span className="project-tag">JavaScript</span>
              </div>
              <div className="project-info">
                <h3>New Project {n}</h3>
                <p>Another exciting project in progress. Stay tuned!</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}

// ============================================================
// EXPERIENCE + EDUCATION
// ============================================================
function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Education & Work</div>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>
            My Academic & <span className="display">Professional Journey</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <h3 className="journey-col-title"><span className="journey-col-icon">🎓</span> Education</h3>
            {education.map((edu, i) => (
              <div key={i} className="timeline-content">
                <div className="exp-period">{edu.period}</div>
                <div className="exp-role">{edu.degree}</div>
                <div className="exp-company">{edu.school}</div>
                <div className="exp-desc">{edu.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="journey-col-title"><span className="journey-col-icon">💼</span> Work Experience</h3>
            {experience.map((exp, i) => (
              <div key={i} className="timeline-content">
                <div className="exp-period">{exp.period}</div>
                <div className="exp-role">{exp.role}</div>
                <div className="exp-company">{exp.company}</div>
                <div className="exp-desc">{exp.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 60 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Achievements</div>
            <h3 className="section-heading" style={{ marginBottom: 0 }}>My <span className="display">Certificates</span></h3>
          </div>
          <div className="certs-grid">
            {certs.map((c, i) => (
              <div key={i} className="cert-card">
                <div className="cert-icon">🏆</div>
                <div><div className="cert-name">{c.name}</div><div className="cert-org">{c.org}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT
// ============================================================
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || 'Portfolio Inquiry from ' + form.name);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`);
    window.open(`https://mail.google.com/mail/?view=cm&to=urwazareef4@gmail.com&su=${subject}&body=${body}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };
  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <div className="contact-grid">
          <div>
            <div className="section-label">Contact Us</div>
            <h2 className="contact-heading">Let's Talk for <span className="display">Your Next Projects</span></h2>
            <p className="contact-desc">Whether you have a project idea, internship opportunity, freelance work, or simply want to connect, I'd love to hear from you.</p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon"><Icon d={ICONS.phone} size={18} /></div>
                <div><div className="contact-info-label">Phone</div><div className="contact-info-value">0349-8537407</div></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Icon d={ICONS.mail} size={18} /></div>
                <div><div className="contact-info-label">Email</div><div className="contact-info-value">urwazareef4@gmail.com</div></div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon"><Icon d={ICONS.map} size={18} /></div>
                <div><div className="contact-info-label">Location</div><div className="contact-info-value">Islamabad, Pakistan</div></div>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>Your Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required /></div>
                <div className="form-group"><label>Email *</label><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@gmail.com" required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Phone</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter Phone Number" /></div>
                <div className="form-group"><label>Subject</label><input name="subject" value={form.subject} onChange={handleChange} placeholder="Project Inquiry" /></div>
              </div>
              <div className="form-group"><label>Your Message *</label><textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell me about your project..." required /></div>
              <button type="submit" className="btn btn-accent form-submit">Send Message <Icon d={ICONS.arrow} size={16} /></button>
              {sent && <div className="form-success">✅ Opening Gmail with your message pre-filled!</div>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-logo">UZ</div>
            <div className="footer-brand-desc">Designing modern digital experiences through clean code, responsive interfaces, and user-centered solutions.</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { d: ICONS.github, href: 'https://github.com' },
                { d: ICONS.mail,   href: '#', action: openGmail },
                { d: ICONS.phone,  href: 'tel:+923498537407' },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  onClick={s.action ? e => { e.preventDefault(); s.action(); } : undefined}
                  target={s.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  className="footer-social-btn">
                  <Icon d={s.d} size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>{navLinks.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>{['Frontend Development','UI/UX Design','React.js Development','API Integration','Performance Optimization'].map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item"><Icon d={ICONS.phone} size={14} /><span>0349-8537407</span></div>
            <div className="footer-contact-item"><Icon d={ICONS.mail}  size={14} /><span>urwazareef4@gmail.com</span></div>
            <div className="footer-contact-item"><Icon d={ICONS.map}   size={14} /><span>Islamabad, Pakistan</span></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2024 <a href="#home">Urwa Zareef</a>. All Rights Reserved.</p>
          <p>Designed & Developed with ❤️ by Urwa Zareef</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// BACK TO TOP
// ============================================================
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <button className={`back-to-top${visible ? ' visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to top">
      <Icon d={ICONS.up} size={20} />
    </button>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [dark, setDark]               = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const sections = ['home','services','about','skills','projects','experience','contact'];
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Navbar dark={dark} toggleDark={() => setDark(d => !d)} activeSection={activeSection} />
      <Hero />
      <Marquee />
      <Services />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}