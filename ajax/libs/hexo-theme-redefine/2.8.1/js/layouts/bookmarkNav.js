export default function initBookmarkNav() {
  const navItems = document.querySelectorAll('.bookmark-nav-item');
  const sections = document.querySelectorAll('section[id]');

  if (!navItems.length || !sections.length) return;

  // Throttle function
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  function setActiveNavItem() {
    const fromTop = window.scrollY + 100;
    let currentSection = null;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
        currentSection = section;
      }
    });

    navItems.forEach(item => {
      item.classList.remove('bg-second-background-color');
      if (currentSection && item.getAttribute('data-category') === currentSection.getAttribute('id')) {
        item.classList.add('bg-second-background-color');
      }
    });
  }

  // // Handle click events on nav items
  // navItems.forEach(item => {
  //   item.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     const targetId = item.getAttribute('data-category');
  //     const targetSection = document.getElementById(targetId);
  //     if (targetSection) {
  //       targetSection.scrollIntoView();
  //     }
  //   });
  // });

  // Throttle scroll handler to run at most every 100ms
  window.addEventListener('scroll', throttle(setActiveNavItem, 100));
  
  // Initial check
  setActiveNavItem();
}

try {
  swup.hooks.on("page:view", initBookmarkNav);
} catch (e) {}

document.addEventListener("DOMContentLoaded", initBookmarkNav); 