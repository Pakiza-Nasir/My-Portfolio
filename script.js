// 1. UNIVERSAL SCROLL ANIMATION OBSERVER
const initScrollAnimations = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
               
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.05, 
        rootMargin: "0px 0px -30px 0px"
    });

    
    const animatedElements = document.querySelectorAll('.slide-from-left, .slide-from-right, .slide-from-bottom, .zoom-in-out');
    animatedElements.forEach(el => observer.observe(el));
};

// 2. DIRECTIONAL SKILLS OBSERVER
let lastScrollY = window.scrollY;

const initSkillsObserver = () => {
    const skillsObserver = new IntersectionObserver((entries) => {
        const isScrollingDown = window.scrollY > lastScrollY;
        
        entries.forEach((entry, index) => {
            const el = entry.target;
            
            if (entry.isIntersecting) {
                if (!el.classList.contains('from-bottom') && !el.classList.contains('from-top')) {
                    if (isScrollingDown) {
                        el.classList.add('from-bottom');
                    } else {
                        el.classList.add('from-top');
                    }
                }
                
                setTimeout(() => {
                    el.classList.add('active');
                }, index * 40);

            } else {
                el.classList.remove('active', 'from-bottom', 'from-top');
            }
        });
        
        lastScrollY = window.scrollY;
    }, { threshold: 0.15 });

    document.querySelectorAll('.skill-card-anim').forEach(card => skillsObserver.observe(card));
};

// 3. PROJECT FILTER LOGIC
function filterProjects(category, event) {
    const buttons = document.querySelectorAll(".btn-filter");
    buttons.forEach((btn) => btn.classList.remove("active"));
    
    if (event && event.target) {
        event.target.classList.add("active");
    }

    const projects = document.querySelectorAll(".project-item");
    projects.forEach((item) => {
        if (category === "all" || item.classList.contains(category)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

// 4. MAIN DOM CONTENT LOADED HANDLER
document.addEventListener('DOMContentLoaded', () => {

    
    initScrollAnimations();
    initSkillsObserver();

    // AOS Library Support (If Loaded)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000, 
            once: false,      
            offset: 120      
        });
    }

    // Toggle Projects Button Handling
    const toggleBtn = document.getElementById('toggleProjectsBtn');
    const moreProjects = document.getElementById('moreProjects');

    if (toggleBtn && moreProjects) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = moreProjects.classList.contains('d-none');
            
            if (isHidden) {
                moreProjects.classList.remove('d-none');
                toggleBtn.innerHTML = 'Show Less Projects <i class="fa-solid fa-chevron-up ms-1"></i>';
                
                setTimeout(() => {
                    initScrollAnimations();
                }, 50);
            } else {
                moreProjects.classList.add('d-none');
                toggleBtn.innerHTML = 'View More Projects <i class="fa-solid fa-chevron-down ms-1"></i>';
            }
        });
    }

    // Typed.js Animation Initialization
    if (document.getElementById("typed-text") && typeof Typed !== 'undefined') {
        new Typed("#typed-text", {
            strings: [
                "Pakiza Nasir",
                "Software Engineer",
                "Web Developer",
                "Project Manager"
            ],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1800,
            loop: true,
            showCursor: true,
            cursorChar: "|"
        });
    }

    // Particles.js Initialization
    if (document.getElementById("particles-js") && typeof particlesJS !== "undefined") {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80,
                     density: { enable: true, value_area: 800 } },
                color: { value: "#ffb703" },
                shape: { type: "circle" },
                opacity: { value: 0.7, random: true },
                size: { value: 6, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffb703",
                    opacity: 0.35,
                    width: 1.2,
                },
                move: {
                    enable: true,
                    speed: 8,
                    direction: "none",
                    straight: false,
                    out_mode: "out",
                    bounce: false
                },
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true,
                },
                modes: {
                grab: {
                    distance: 180,
                    line_linked: { opacity: 0.7 }
                }
            } 
        },
            retina_detect: true,
        });
    }

// Contact Form Submission with Pure JavaScript AJAX
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const submitBtn = document.getElementById("submitBtn");
        const statusDiv = document.getElementById("formStatus");
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin ms-1"></i>';
        
        statusDiv.style.display = "block";
        statusDiv.className = "mt-3 text-center text-warning small";
        statusDiv.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> Sending your message...';

        const formData = new FormData(contactForm);

        fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // SUCCESS: Green Alert Display
                statusDiv.className = "mt-3 text-center text-success small p-2 alert alert-success";
                statusDiv.innerHTML = '<i class="fa-solid fa-circle-check me-1"></i> Thank you! Your message has been sent successfully.';
                contactForm.reset(); // Clear Form Inputs
            } else {
                // ERROR Response from Server
                throw new Error("Form submission failed");
            }
        })
        .catch(error => {
            // ERROR: Red Alert Display
            statusDiv.className = "mt-3 text-center text-danger small p-2 alert alert-danger";
            statusDiv.innerHTML = '<i class="fa-solid fa-circle-xmark me-1"></i> Oops! Something went wrong. Please try again.';
        })
        .finally(() => {
            // Restore Submit Button State
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        });
    });
}

    // Theme Switcher Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');

        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
});

//Interactive filter button
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.skill-filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide-skill');
                } else {
                    item.classList.add('hide-skill');
                }
            });
        });
    });
});

// Auto-close Bootstrap mobile menu when a nav link is clicked
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const navbarCollapse = document.getElementById('navbarNav');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            $('.navbar-collapse').collapse('hide');
        }
    });
});