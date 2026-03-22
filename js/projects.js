let projectsData = [];

const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'ai-agents', name: 'AI Agents & RAG' },
    { id: 'dl-cv', name: 'Deep Learning & CV' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'web-dev', name: 'Web Dev' },
    { id: 'resources', name: 'Resources' }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeProjects();
});

async function initializeProjects() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    try {
        const response = await fetch('data/projects.json');
        if (!response.ok) throw new Error('Fetch failed');
        projectsData = await response.json();
    } catch (error) {
        console.error('Error loading projects:', error);
        const grid = document.querySelector('.projects-grid');
        if (grid) {
            grid.innerHTML = `
                <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 20px; color: var(--accent);">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Unable to load projects locally.</p>
                    <small>Browsers block data fetching when opening HTML as a file. <br> 
                    Please run <code>python3 -m http.server</code> in this folder and visit <code>localhost:8000</code></small>
                </div>
            `;
        }
        return;
    }

    // 1. Create Filter Container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    filterContainer.innerHTML = categories.map(cat =>
        `<button class="filter-btn ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}">
            ${cat.name}
        </button>`
    ).join('');

    // Insert after the section title
    const sectionTitle = projectsSection.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.after(filterContainer);
    }

    const existingGrid = projectsSection.querySelector('.projects-grid');
    if (existingGrid) {
        existingGrid.id = 'featured-projects-grid';
        
        const dynamicGrid = document.createElement('div');
        dynamicGrid.className = 'projects-grid dynamic-grid';
        dynamicGrid.id = 'dynamic-projects-grid';
        existingGrid.after(dynamicGrid);
    }

    // 3. Render Initial State
    renderProjects('all');

    // 4. Component Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update UI
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const filter = e.target.dataset.filter;
            renderProjects(filter);
        });
    });
}

function renderProjects(filter) {
    const featuredGrid = document.getElementById('featured-projects-grid');
    const dynamicGrid = document.getElementById('dynamic-projects-grid');

    if (!dynamicGrid) return;

    dynamicGrid.innerHTML = '';

    let projectsToShow = [];

    if (filter === 'all') {
        if (featuredGrid) featuredGrid.style.display = 'grid';
        projectsToShow = projectsData.filter(p => !p.featured);
    } else {
        if (featuredGrid) featuredGrid.style.display = 'none';
        projectsToShow = projectsData.filter(p => p.category === filter);
    }

    // Generate HTML
    projectsToShow.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';

        const techHtml = project.tech ? project.tech.map(t => `<span class="tech">${t}</span>`).join('') : '';
        const linksHtml = `
            <a href="${project.github}" target="_blank" class="project-link">
                <i class="fab fa-github"></i>
            </a>
            ${project.demo ? `
            <a href="${project.demo}" target="_blank" class="project-link">
                <i class="fas fa-external-link-alt"></i>
            </a>` : ''}
        `;

        // Icon mapping based on category
        let icon = 'fa-code';
        if (project.category === 'ai-agents') icon = 'fa-robot';
        if (project.category === 'dl-cv') icon = 'fa-eye';
        if (project.category === 'data-science') icon = 'fa-chart-bar';
        if (project.category === 'web-dev') icon = 'fa-laptop-code';
        if (project.category === 'resources') icon = 'fa-book';

        card.innerHTML = `
            <div class="project-header">
                <div class="project-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="project-links">
                    ${linksHtml}
                </div>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${techHtml}
            </div>
        `;

        dynamicGrid.appendChild(card);
    });

    if (projectsToShow.length === 0 && filter !== 'all') {
        dynamicGrid.innerHTML = `<div class="no-projects">No active projects in this category yet.</div>`;
    }
}
