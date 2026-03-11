const sections = Array.from(document.querySelectorAll('[data-reveal]'));
const navLinks = Array.from(document.querySelectorAll('.nav a')).filter((link) => link.getAttribute('href').startsWith('#'));
const progress = document.querySelector('.progress');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.25 }
);

sections.forEach((section) => observer.observe(section));

const highlightActive = () => {
  const scrollPos = window.scrollY + 160;
  let active = navLinks[0];

  navLinks.forEach((link) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    if (target.offsetTop <= scrollPos) {
      active = link;
    }
  });

  navLinks.forEach((link) => link.classList.remove('active'));
  if (active) active.classList.add('active');
};

const updateProgress = () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progressRatio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
  progress.style.width = `${Math.min(progressRatio * 100, 100)}%`;
};

const toggleMenu = () => {
  nav.classList.toggle('open');
};

menuToggle.addEventListener('click', toggleMenu);
navLinks.forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

window.addEventListener('scroll', () => {
  highlightActive();
  updateProgress();
});

window.addEventListener('load', () => {
  highlightActive();
  updateProgress();
  sections.forEach((section, index) => {
    setTimeout(() => section.classList.add('is-visible'), index * 120);
  });
});
