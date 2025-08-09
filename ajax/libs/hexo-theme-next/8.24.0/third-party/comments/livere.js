/* global NexT, CONFIG, LivereTower */

document.addEventListener('page:loaded', async () => {
  if (!CONFIG.page.comments) return;

  await NexT.utils.loadComments('#lv-container');
  window.livereOptions = {
    refer: CONFIG.page.path.replace(/index\.html$/, '')
  };

  if (typeof LivereTower === 'function') return;

  NexT.utils.getScript('https://cdn-city.livere.com/js/embed.dist.js', {
    attributes: {
      async: true
    }
  });
});
