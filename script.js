document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded!');

    // Initialize menu elements
    const menuToggle = document.getElementById('menu-toggle');
    const collapsibleMenu = document.getElementById('collapsible-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    // Image slider logic
    const slides = document.querySelectorAll('.slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 3000);
    }

    // Menu functionality
    if (menuToggle && collapsibleMenu && menuOverlay) {
        // Ensure menu is closed on page load
        menuToggle.classList.remove('active');
        collapsibleMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';

        function toggleMenu() {
            const isOpen = collapsibleMenu.classList.contains('active');
            if (isOpen) {
                menuToggle.classList.remove('active');
                collapsibleMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                menuToggle.classList.add('active');
                collapsibleMenu.classList.add('active');
                menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        // Toggle menu when hamburger is clicked
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Only close menu when overlay or a menu item is clicked
        menuOverlay.addEventListener('click', toggleMenu);

        // Close menu when clicking a menu item
        const menuItems = collapsibleMenu.querySelectorAll('.nav-item a');
        menuItems.forEach(item => {
            item.addEventListener('click', toggleMenu);
        });

        // Optional: close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && collapsibleMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Handle contact form if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = contactForm.elements['name'].value;
            const email = contactForm.elements['email'].value;
            const message = contactForm.elements['message'].value;
            const subject = encodeURIComponent('Contact Request from ' + name);
            const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nMessage: ' + message);
            window.open(`mailto:roboeyewizard@gmail.com?subject=${subject}&body=${body}`);
            setTimeout(() => contactForm.reset(), 500);
        });
    }
});