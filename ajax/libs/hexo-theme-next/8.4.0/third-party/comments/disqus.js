/* global NexT, CONFIG, DISQUS */

document.addEventListener('page:loaded', () => {

  if (CONFIG.disqus.count) {
    const loadCount = () => {
      NexT.utils.getScript(`https://${CONFIG.disqus.shortname}.disqus.com/count.js`, {
        attributes: { id: 'dsq-count-scr' }
      });
    };

    // defer loading until the whole page loading is completed
    window.addEventListener('load', loadCount, false);
  }

  if (CONFIG.page.comments) {
    const disqus_config = function() {
      this.page.url = CONFIG.page.permalink;
      this.page.identifier = CONFIG.page.path;
      this.page.title = CONFIG.page.title;
      if (CONFIG.disqus.i18n.disqus !== 'disqus') {
        this.language = CONFIG.disqus.i18n.disqus;
      }
    };
    NexT.utils.loadComments('#disqus_thread').then(() => {
      if (window.DISQUS) {
        DISQUS.reset({
          reload: true,
          config: disqus_config
        });
      } else {
        NexT.utils.getScript(`https://${CONFIG.disqus.shortname}.disqus.com/embed.js`, {
          attributes: { dataset: { timestamp: '' + +new Date() } }
        });
      }
    });
  }

});
