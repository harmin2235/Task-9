// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function setTheme(pref) {
  if (pref === 'light') root.classList.add('light');
  else root.classList.remove('light');
  localStorage.setItem('theme', pref);
  themeToggle.textContent = pref === 'light' ? '☀️' : '🌙';
}

// Load preferred theme
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const next = root.classList.contains('light') ? 'dark' : 'light';
  setTheme(next);
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    menu.style.display = expanded ? 'none' : 'flex';
  });
}

// Projects data
const projects = [
  {
    title: 'Responsive Landing Page',
    desc: 'A high-performing, accessible landing page built with semantic HTML, CSS Grid, and vanilla JS.',
    tag: 'frontend',
    link: '#',
  },
  {
    title: 'Dashboard UI',
    desc: 'Interactive dashboard with charts, filters, and dark mode. Focused on UX patterns and performance.',
    tag: 'frontend',
    link: '#',
  },
  {
    title: 'Portfolio CMS',
    desc: 'Fullstack portfolio CMS with Express and MongoDB. Includes auth, CRUD, and image optimization.',
    tag: 'fullstack',
    link: '#',
  },
  {
    title: 'Design System',
    desc: 'Reusable components and tokens for consistent design across apps. Documented and tested.',
    tag: 'uiux',
    link: '#',
  },
  {
    title: 'API Explorer',
    desc: 'SPA to explore REST APIs with caching, pagination, and optimistic UI updates.',
    tag: 'fullstack',
    link: '#',
  },
];

// Render projects
const grid = document.getElementById('projectGrid');
function renderProjects(items) {
  grid.innerHTML = '';
  items.forEach(pr => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="thumb"></div>
      <div class="body">
        <h3>${pr.title}</h3>
        <p>${pr.desc}</p>
      </div>
      <div class="meta">
        <span class="badge">${pr.tag}</span>
        <a class="btn btn-outline" href="${pr.link}" aria-label="Open ${pr.title}">Open</a>
      </div>
    `;
    grid.appendChild(card);
  });
}
renderProjects(projects);

// Filter + search
const filterSelect = document.getElementById('filterSelect');
const searchInput = document.getElementById('searchInput');

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const tag = filterSelect.value;
  const filtered = projects.filter(p => {
    const matchesTag = tag === 'all' ? true : p.tag === tag;
    const matchesSearch = !q || (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    return matchesTag && matchesSearch;
  });
  renderProjects(filtered);
}

filterSelect.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();
