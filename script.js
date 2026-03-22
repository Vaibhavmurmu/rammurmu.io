function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuButton || !mobileMenu) {
        return;
    }

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        return;
    }

    const savedTheme = localStorage.getItem('theme') || 'default';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.value = savedTheme;

    themeToggle.addEventListener('change', function() {
        const selectedTheme = themeToggle.value;
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });
}

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmail = document.getElementById('newsletter-email');
    const newsletterMessage = document.getElementById('newsletter-message');

    if (!newsletterForm || !newsletterEmail || !newsletterMessage) {
        return;
    }

    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = newsletterEmail.value;

        if (validateEmail(email)) {
            newsletterMessage.textContent = 'Thank you for subscribing!';
            newsletterMessage.classList.add('text-green-500');
            newsletterMessage.classList.remove('text-red-500');
        } else {
            newsletterMessage.textContent = 'Please enter a valid email address.';
            newsletterMessage.classList.add('text-red-500');
            newsletterMessage.classList.remove('text-green-500');
        }
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (!contactForm || !formMessage) {
        return;
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name')?.value?.trim() || '';
        const email = document.getElementById('email')?.value?.trim() || '';
        const message = document.getElementById('message')?.value?.trim() || '';

        if (name && validateEmail(email) && message) {
            formMessage.textContent = 'Thank you for your message!';
            formMessage.classList.add('text-green-500');
            formMessage.classList.remove('text-red-500');
            contactForm.reset();
        } else {
            formMessage.textContent = 'Please fill out all fields correctly.';
            formMessage.classList.add('text-red-500');
            formMessage.classList.remove('text-green-500');
        }
    });
}

function initBlogFilters() {
    const blogPostsContainer = document.getElementById('blog-posts');
    const searchInput = document.getElementById('search-input');
    const categoryLinks = document.querySelectorAll('#categories a');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    if (!blogPostsContainer || !searchInput || !prevPageButton || !nextPageButton || !pageInfo) {
        return;
    }

    const blogPosts = [
        {
            title: 'My First Blog Post',
            date: '2025-02-20',
            summary: 'This is the summary of my first blog post.',
            link: 'blog/my-first-blog-post.html',
            category: 'personal'
        },
        {
            title: 'Another Interesting Post',
            date: '2025-02-22',
            summary: 'This is the summary of another interesting post.',
            link: 'blog/another-interesting-post.html',
            category: 'technical'
        }
    ];

    const postsPerPage = 5;
    let currentPage = 1;

    function updatePaginationControls(totalPosts) {
        const totalPages = Math.max(1, Math.ceil(totalPosts / postsPerPage));
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageButton.disabled = currentPage <= 1;
        nextPageButton.disabled = currentPage >= totalPages;
    }

    function displayPosts(posts) {
        blogPostsContainer.innerHTML = '';

        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = posts.slice(start, end);

        paginatedPosts.forEach(function(post) {
            const postElement = document.createElement('article');
            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
                <p><small>${post.date}</small></p>
                <p>${post.summary}</p>
            `;
            blogPostsContainer.appendChild(postElement);
        });

        updatePaginationControls(posts.length);
    }

    function filterPosts() {
        const query = searchInput.value.toLowerCase();
        const selectedCategory = document.querySelector('#categories a.active')?.dataset.category || 'all';

        const filteredPosts = blogPosts.filter(function(post) {
            const matchesQuery =
                post.title.toLowerCase().includes(query) ||
                post.summary.toLowerCase().includes(query);
            const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
            return matchesQuery && matchesCategory;
        });

        currentPage = 1;
        displayPosts(filteredPosts);
    }

    searchInput.addEventListener('input', filterPosts);

    categoryLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            categoryLinks.forEach(function(categoryLink) {
                categoryLink.classList.remove('active');
            });
            this.classList.add('active');
            filterPosts();
        });
    });

    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            filterPosts();
        }
    });

    nextPageButton.addEventListener('click', function() {
        const totalPages = Math.max(1, Math.ceil(blogPosts.length / postsPerPage));
        if (currentPage < totalPages) {
            currentPage++;
            filterPosts();
        }
    });

    filterPosts();
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav ul li a');
    if (!navLinks.length) {
        return;
    }

    navLinks.forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function initProjectFilters() {
    const filters = document.querySelectorAll('#project-filters button');
    const projects = document.querySelectorAll('.project');

    if (!filters.length || !projects.length) {
        return;
    }

    filters.forEach(function(filter) {
        filter.addEventListener('click', function() {
            filters.forEach(function(button) {
                button.classList.remove('active');
            });
            this.classList.add('active');

            const category = this.getAttribute('data-filter');
            projects.forEach(function(project) {
                const show = category === 'all' || project.getAttribute('data-category') === category;
                project.style.display = show ? 'block' : 'none';
            });
        });
    });
}

function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) {
        return;
    }

    window.addEventListener('scroll', function() {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    if (!progressBars.length) {
        return;
    }

    window.addEventListener('scroll', function() {
        progressBars.forEach(function(bar) {
            const barPosition = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (barPosition < windowHeight - 50) {
                bar.style.width = bar.getAttribute('data-progress');
            }
        });
    });
}

function initTypewriter() {
    const typewriterText = document.getElementById('typewriter-text');
    if (!typewriterText) {
        return;
    }

    const text = typewriterText.textContent;
    typewriterText.textContent = '';

    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typewriterText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
}

function initAccordions() {
    const accordions = document.querySelectorAll('.accordion-toggle');
    if (!accordions.length) {
        return;
    }

    accordions.forEach(function(accordion) {
        accordion.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (!content) {
                return;
            }

            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initThemeToggle();
    initNewsletterForm();
    initContactForm();
    initBlogFilters();
    initSmoothScrolling();
    initProjectFilters();
    initBackToTop();
    initProgressBars();
    initTypewriter();
    initAccordions();
});
