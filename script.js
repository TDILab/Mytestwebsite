document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded!');
    // alert('Hello from JavaScript!'); // You can uncomment this to see it work

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Prepare mailto link
            const name = contactForm.elements['name'].value;
            const email = contactForm.elements['email'].value;
            const message = contactForm.elements['message'].value;
            const subject = encodeURIComponent('Contact Request from ' + name);
            const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nMessage: ' + message);
            window.open(`mailto:roboeyewizard@gmail.com?subject=${subject}&body=${body}`);
            setTimeout(() => contactForm.reset(), 500);
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
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
        });
    }
});