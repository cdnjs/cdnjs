/* global NexT, CONFIG */

document.addEventListener('page:loaded', async () => {
  const { appid, appkey } = CONFIG.changyan;
  const mainJs = 'https://cy-cdn.kuaizhan.com/upload/changyan.js';
  const countJs = `https://cy-cdn.kuaizhan.com/upload/plugins/plugins.list.count.js?clientId=${appid}`;

  // Get the number of comments
  setTimeout(() => {
    return NexT.utils.getScript(countJs, {
      attributes: {
        async: true,
        id   : 'cy_cmt_num'
      }
    });
  }, 0);

  // When scroll to comment section
  if (CONFIG.page.comments && !CONFIG.page.isHome) {
    try {
      await NexT.utils.loadComments('#SOHUCS');
      await NexT.utils.getScript(mainJs, {
        attributes: {
          async: true
        }
      });
      window.changyan.api.config({
        appid,
        conf: appkey
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load Changyan', error);
    }
  }
});
