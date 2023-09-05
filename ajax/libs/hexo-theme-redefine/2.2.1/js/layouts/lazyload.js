Global.initLazyLoad = () => {
  const imgs = document.querySelectorAll('img');
  const options = {
    rootMargin: '0px',
    threshold: 0.1
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        img.src = src;
        img.removeAttribute('lazyload');
        observer.unobserve(img);
      }
    });
  }, options);
  imgs.forEach(img => {
    if (img.hasAttribute('lazyload')) {
      observer.observe(img);
    }
  });
};

