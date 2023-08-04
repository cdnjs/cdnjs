/* global NexT */

document.addEventListener('page:loaded', () => {
  NexT.utils.getScript('https://static.addtoany.com/menu/page.js', { condition: window.a2a })
    .then(() => {
      window.a2a.init();
    });
});
