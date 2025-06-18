/**
 * Academic Portfolio - Main JavaScript
 * Provides interactive functionality for the academic portfolio website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling for anchor links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if not empty hash
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL but without page jump
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // Add active class to current navigation item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.endsWith(linkPath) || 
            (currentLocation.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Initialize animation for elements when they come into view
    const animateOnScroll = () => {
        const elementsToAnimate = document.querySelectorAll('.research-card, .publication-item, .project-card, .credential');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };

    // Run animation check on initial load
    animateOnScroll();
    
    // Add scroll event listener for animations
    window.addEventListener('scroll', animateOnScroll);

    // Mobile navigation toggle (for responsive design)
    const createMobileNav = () => {
        const header = document.querySelector('header');
        
        if (header) {
            // Create mobile menu button
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-toggle');
            mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Add mobile menu button to header
            const headerInner = document.querySelector('.header-inner');
            if (headerInner && window.innerWidth < 768) {
                if (!document.querySelector('.mobile-menu-toggle')) {
                    headerInner.appendChild(mobileMenuBtn);
                    
                    // Add event listener to toggle menu
                    mobileMenuBtn.addEventListener('click', () => {
                        const navMenu = document.querySelector('.nav-menu');
                        navMenu.classList.toggle('active');
                        
                        // Change icon based on menu state
                        if (navMenu.classList.contains('active')) {
                            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
                        } else {
                            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                        }
                    });
                }
            } else {
                // Remove mobile menu button if screen is large
                const existingBtn = document.querySelector('.mobile-menu-toggle');
                if (existingBtn) {
                    existingBtn.remove();
                    document.querySelector('.nav-menu').classList.remove('active');
                }
            }
        }
    };

    // Initialize mobile nav
    createMobileNav();
    
    // Update mobile nav on window resize
    window.addEventListener('resize', createMobileNav);

    // Add print functionality for CV/Resume page
    const printButton = document.querySelector('.print-resume');
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }

    // Citation copy functionality
    const citationButtons = document.querySelectorAll('.copy-citation');
    
    citationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const citation = this.closest('.publication-item').querySelector('.citation-text').textContent;
            
            navigator.clipboard.writeText(citation).then(() => {
                // Show success message
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });
});
