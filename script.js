document.addEventListener('DOMContentLoaded', () => {
    // Global visitor counter logic (backend)
    const visitorNumber = document.getElementById('visitor-number');
    if (visitorNumber) {
      fetch('/visitor-count', { method: 'POST' })
        .then(res => res.json())
        .then(data => { visitorNumber.textContent = data.count; })
        .catch(() => { visitorNumber.textContent = '...'; });
    }
    console.log('Website loaded!');
    // alert('Hello from JavaScript!'); // You can uncomment this to see it work

    // AJAX Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const status = document.getElementById('contactStatus');
        status.textContent = 'Sending...';
        // Dynamic backend URL for local and production
        const backendUrl =
          window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3001/contact'
            : 'https://your-production-domain.com/contact'; // TODO: Replace with your real domain for production
        fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: contactForm.elements['name'].value,
            email: contactForm.elements['email'].value,
            message: contactForm.elements['message'].value,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              status.textContent = 'Message sent! Thank you.';
              contactForm.reset();
            } else {
              status.textContent = 'Error: ' + (data.error || 'Could not send message.');
            }
          })
          .catch(() => {
            status.textContent = 'Network error. Please try again later.';
          });
      });
    }

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

    // Spiral menu animation
    const menuToggle = document.getElementById('menu-toggle');
    const collapsibleMenu = document.getElementById('collapsible-menu');
    if (menuToggle && collapsibleMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            if (collapsibleMenu.style.display === 'flex') {
                collapsibleMenu.style.display = 'none';
            } else {
                collapsibleMenu.style.display = 'flex';
            }
        });
        // Hide menu when a menu item is clicked (for mobile)
        var menuLinks = collapsibleMenu.querySelectorAll('a');
        for (var i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener('click', function() {
                collapsibleMenu.style.display = 'none';
                menuToggle.classList.remove('active');
            });
        }
        // Optional: close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!collapsibleMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                collapsibleMenu.style.display = 'none';
                menuToggle.classList.remove('active');
            }
        });
        // Multi-level dropdown logic
        var allDropBtns = collapsibleMenu.querySelectorAll('.dropbtn');
        allDropBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var parentDropdown = btn.parentElement;
                if (parentDropdown.classList.contains('dropdown')) {
                    e.preventDefault();
                    e.stopPropagation();
                    // Close other open sub-dropdowns at this level
                    var siblings = parentDropdown.parentElement.children;
                    for (var j = 0; j < siblings.length; j++) {
                        if (siblings[j] !== parentDropdown && siblings[j].classList && siblings[j].classList.contains('open')) {
                            siblings[j].classList.remove('open');
                        }
                    }
                    parentDropdown.classList.toggle('open');
                }
            });
        });
        // Close all dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            var openDropdowns = collapsibleMenu.querySelectorAll('.dropdown.open');
            openDropdowns.forEach(function(dd) { dd.classList.remove('open'); });
        });
    }

    // Dropdown inside menu (improved)
    const dropbtn = document.querySelector('.collapsible-menu .dropbtn');
    const dropdown = document.querySelector('.collapsible-menu .dropdown');
    const dropdownContent = document.querySelector('.collapsible-menu .dropdown-content');
    if (dropbtn && dropdown && dropdownContent) {
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
        // Close dropdown when a dropdown item is clicked
        dropdownContent.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                dropdown.classList.remove('open');
            });
        });
    }

    // Footer rating UI removed; corresponding JS removed to avoid errors.

        // Hide/show navbar on scroll: slide navbar out when scrolling down, show when scrolling up.
        (function() {
            var navbar = document.querySelector('.main-navbar');
            if (!navbar) return;
            var lastScroll = window.pageYOffset || document.documentElement.scrollTop;
            var ticking = false;

            function onScroll() {
                var st = window.pageYOffset || document.documentElement.scrollTop;
                // if scrolling down and past a small threshold, hide navbar
                if (st > lastScroll && st > 60) {
                    navbar.classList.add('nav-hidden');
                } else {
                    // scrolling up — show navbar
                    navbar.classList.remove('nav-hidden');
                }
                lastScroll = st <= 0 ? 0 : st;
            }

            window.addEventListener('scroll', function() {
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        onScroll();
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        })();
});