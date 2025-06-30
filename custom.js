// Mobile menu toggle logic
(function() {
  const menuToggle = document.getElementById('menu-toggle');
  const collapsibleMenu = document.getElementById('collapsible-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuClose = document.getElementById('menu-close');
  function closeMenu() {
    collapsibleMenu.style.display = 'none';
    menuOverlay.style.display = 'none';
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (menuToggle && collapsibleMenu && menuOverlay) {
    menuToggle.addEventListener('click', function() {
      const isOpen = collapsibleMenu.style.display === 'block';
      if (!isOpen) {
        collapsibleMenu.style.display = 'block';
        menuOverlay.style.display = 'block';
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      } else {
        closeMenu();
      }
    });
    menuOverlay.addEventListener('click', closeMenu);
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    // Hide menu on nav item click (for single-page nav)
    collapsibleMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });
  }
})();

// Loader fade out
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if(loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 600);
    }
});

// Terms & Conditions modal logic
(function() {
  var tcLink = document.getElementById('tc-link');
  var tcModal = document.getElementById('tc-modal');
  var tcClose = null;
  if(tcLink && tcModal) {
    tcLink.addEventListener('click', function(e) {
      e.preventDefault();
      tcModal.style.display = 'flex';
      tcClose = document.getElementById('tc-close');
      if(tcClose) {
        tcClose.focus();
        tcClose.onclick = function() {
          tcModal.style.display = 'none';
        };
      }
      tcModal.onclick = function(event) {
        if(event.target === tcModal) tcModal.style.display = 'none';
      };
      document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          tcModal.style.display = 'none';
        }
      };
    });
  }
})();

// Gallery toggle logic
const galleryToggle = document.getElementById('gallery-toggle');
const galleryContent = document.getElementById('gallery-content');
const galleryArrow = document.getElementById('gallery-arrow');
if (galleryToggle && galleryContent && galleryArrow) {
    galleryToggle.addEventListener('click', function() {
        const expanded = galleryToggle.getAttribute('aria-expanded') === 'true';
        galleryToggle.setAttribute('aria-expanded', !expanded);
        if (expanded) {
            galleryContent.style.maxHeight = '0';
            galleryContent.style.overflow = 'hidden';
            galleryArrow.style.transform = 'rotate(-90deg)';
        } else {
            galleryContent.style.maxHeight = '400px';
            galleryContent.style.overflow = 'auto';
            galleryArrow.style.transform = 'rotate(0deg)';
        }
    });
}

// Blog dropdown logic (if needed)
const servicesLink = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');
if (servicesLink && dropdownContent) {
    servicesLink.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        document.addEventListener('click', function handler(event) {
            if (!dropdownContent.contains(event.target) && event.target !== servicesLink) {
                dropdownContent.style.display = 'none';
                document.removeEventListener('click', handler);
            }
        });
    });
}
