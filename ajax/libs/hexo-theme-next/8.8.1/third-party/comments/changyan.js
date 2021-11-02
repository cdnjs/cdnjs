/* global NexT, CONFIG */

document.addEventListener('page:loaded', () => {
  if (CONFIG.page.isHome) {
    NexT.utils.getScript(
      `https://changyan.sohu.com/upload/plugins/plugins.list.count.js?clientId=${CONFIG.changyan.appid}`,
      { attributes: { id: 'cy_cmt_num' } }
    );
  } else if (CONFIG.page.comments) {
    NexT.utils.loadComments('#SOHUCS')
      .then(() => {
        delete window.changyan;
        delete window.cyan;
        return NexT.utils.getScript('https://changyan.sohu.com/upload/changyan.js');
      })
      .then(() => {
        window.changyan.api.config({
          appid: CONFIG.changyan.appid,
          conf : CONFIG.changyan.appkey
        });
      });
    NexT.utils.getScript('https://assets.changyan.sohu.com/upload/plugins/plugins.count.js');
  }
});
