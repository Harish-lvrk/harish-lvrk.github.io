const projectsData = [
    // --- AI Engineering & Agents ---
    {
        title: "Ask-Chatbot",
        description: "Medical assistance chatbot answering health queries using RAG and LangChain.",
        category: "ai-agents",
        tech: ["LangChain", "RAG", "FAISS", "Streamlit"],
        github: "https://github.com/Harish-lvrk/Ask-Chatbot",
        featured: true // Already featured in HTML, but good to have here
    },
    {
        title: "LangGraph Agent",
        description: "Stateful orchestration for LLM applications using LangGraph.",
        category: "ai-agents",
        tech: ["LangGraph", "Python", "LLM", "Agents"],
        github: "https://github.com/Harish-lvrk/LangGraph-ChatBot"
    },
    {
        title: "YouTube Video Analyzer",
        description: "Chat with YouTube videos using RAG to extract insights from transcripts.",
        category: "ai-agents",
        tech: ["RAG", "Gemini", "FAISS", "LangChain"],
        github: "https://github.com/Harish-lvrk/YouTube_videos_Analyzer",
        featured: false
    },
    {
        title: "MCPs Collection",
        description: "Implementation of Model Context Protocols for standardizing AI context.",
        category: "ai-agents",
        tech: ["MCP", "Python", "AI Standards"],
        github: "https://github.com/Harish-lvrk/MCPs"
    },
    {
        title: "RAG LangChain",
        description: "Comprehensive RAG implementation patterns and experiments.",
        category: "ai-agents",
        tech: ["LangChain", "Vector DB", "Embeddings"],
        github: "https://github.com/Harish-lvrk/RAG_LangChain"
    },

    // --- Deep Learning & Computer Vision ---
    {
        title: "Pneumonia Detection CNN",
        description: "Custom CNN architecture delivering 90.4% accuracy on Chest X-Rays.",
        category: "dl-cv",
        tech: ["TensorFlow", "Keras", "CNN", "Medical AI"],
        github: "https://github.com/Harish-lvrk/Pneumonia-Detection",
        featured: true
    },
    {
        title: "Football Field Segmentation",
        description: "Computer vision project for segmenting play areas in sports footage.",
        category: "dl-cv",
        tech: ["OpenCV", "Deep Learning", "Segmentation"],
        github: "https://github.com/Harish-lvrk/football-field-segmentation"
    },
    {
        title: "PyTorch Experiments",
        description: "Collection of deep learning models and implementations from scratch.",
        category: "dl-cv",
        tech: ["PyTorch", "Neural Networks", "Research"],
        github: "https://github.com/Harish-lvrk/PyTorch"
    },
    {
        title: "NLP Projects",
        description: "Natural Language Processing implementations including text classification.",
        category: "dl-cv",
        tech: ["NLP", "Transformers", "Text Analysis"],
        github: "https://github.com/Harish-lvrk/NLP"
    },

    // --- Data Science & Analytics ---
    {
        title: "Insurance Premium API",
        description: "Production-ready FastAPI service for predicting insurance costs.",
        category: "data-science",
        tech: ["FastAPI", "Scikit-learn", "Docker", "Pydantic"],
        github: "https://github.com/Harish-lvrk/Insurance-Premium-Prediction-API",
        demo: "https://fastapi-insurance-app-1-0.onrender.com/docs",
        featured: true
    },
    {
        title: "NYC Taxi Fare Prediction",
        description: "XGBoost model ranking in top 30% for fare estimation.",
        category: "data-science",
        tech: ["XGBoost", "Pandas", "Feature Engineering"],
        github: "https://github.com/Harish-lvrk/ml-from-scratch" // Specific link handled in UI if manual
    },
    {
        title: "Cyberattack Detection",
        description: "Network traffic analysis to detect potential security threats.",
        category: "data-science",
        tech: ["Machine Learning", "Cybersecurity", "Anomaly Detection"],
        github: "https://github.com/Harish-lvrk/Cyberattack-Detection-using_Network-Traffic-Data"
    },
    {
        title: "Email Spam Classifier",
        description: "Classic ML project to classify emails as spam or ham.",
        category: "data-science",
        tech: ["Classification", "NLP", "Scikit-learn"],
        github: "https://github.com/Harish-lvrk/email_spam_or_not"
    },
    {
        title: "Data Analysis Projects",
        description: "Exploratory data analysis on various datasets.",
        category: "data-science",
        tech: ["Pandas", "Matplotlib", "Seaborn"],
        github: "https://github.com/Harish-lvrk/Data-Analysis-project"
    },

    // --- Web Development ---
    {
        title: "Logic Type",
        description: "Reflex-based typing game to improve keyboard speed and accuracy.",
        category: "web-dev",
        tech: ["Web", "Reflex", "Gamification"],
        github: "https://github.com/Harish-lvrk/logic-type"
    },
    {
        title: "Stark Careers",
        description: "Career portal website with modern UI/UX.",
        category: "web-dev",
        tech: ["HTML/CSS", "JavaScript", "Frontend"],
        github: "https://github.com/Harish-lvrk/stark-careers-website-v2"
    },
    {
        title: "FastAPI Starter",
        description: "Boilerplate and examples for building high-performance APIs.",
        category: "web-dev",
        tech: ["FastAPI", "Python", "Backend"],
        github: "https://github.com/Harish-lvrk/FastAPI"
    },

    // --- Resources & Utilities ---
    {
        title: "ML From Scratch",
        description: "Educational implementations of core ML algorithms.",
        category: "resources",
        tech: ["Education", "Algorithms", "Math"],
        github: "https://github.com/Harish-lvrk/ml-from-scratch"
    },
    {
        title: "Data Science Roadmap",
        description: "Comprehensive guide and resources for learning Data Science.",
        category: "resources",
        tech: ["Guide", "Roadmap", "Learning"],
        github: "https://github.com/Harish-lvrk/Data-Science-Roadmap"
    }
];

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

function initializeProjects() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

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
    sectionTitle.after(filterContainer);

    // 2. Create "More Projects" Grid
    // We will keep the existing static "Featured" grid as is, 
    // and append a new dynamic grid below it.
    // When filtering, we might toggle visibility of the Featured grid 
    // or just filter everything if we decide to merge them.

    // Strategy: 
    // - On 'all': Show Featured Grid (static HTML) + More Projects Grid (dynamic).
    // - On specific filter: Hide Featured Grid, Show Dynamic Grid with filtered items (including featured ones if they match).

    const existingGrid = projectsSection.querySelector('.projects-grid');
    existingGrid.id = 'featured-projects-grid';

    const dynamicGrid = document.createElement('div');
    dynamicGrid.className = 'projects-grid dynamic-grid';
    dynamicGrid.id = 'dynamic-projects-grid';

    existingGrid.after(dynamicGrid);

    // 3. Render Initial State (Remaining projects)
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

    dynamicGrid.innerHTML = '';

    // Logic: 
    // If 'all': Show Featured Grid blocks. Fill dynamic grid with non-featured items.
    // If 'filter': Hide Featured Grid blocks. Fill dynamic grid with ALL items matching filter.

    let projectsToShow = [];

    if (filter === 'all') {
        featuredGrid.style.display = 'grid'; // Show static featured
        // Filter out projects that are likely already in the manually coded section 
        // to avoid duplicates. 
        // (Simplified check: based on title or logic)
        // For this implementation, we'll just show the ones NOT marked as featured in our data
        // assuming our data 'featured: true' aligns with HTML.
        projectsToShow = projectsData.filter(p => !p.featured);
    } else {
        featuredGrid.style.display = 'none'; // Hide static featured to show clean filtered list
        projectsToShow = projectsData.filter(p => p.category === filter);
    }

    // Generate HTML
    projectsToShow.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in'; // Add animation class

        const techHtml = project.tech.map(t => `<span class="tech">${t}</span>`).join('');
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

    // Append simple "No projects found" if empty
    if (projectsToShow.length === 0 && filter !== 'all') {
        dynamicGrid.innerHTML = `<div class="no-projects">No active projects in this category yet.</div>`;
    }
}
