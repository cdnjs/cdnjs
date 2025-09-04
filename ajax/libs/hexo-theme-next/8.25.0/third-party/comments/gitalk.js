/* global NexT, CONFIG, Gitalk */

document.addEventListener('page:loaded', async () => {
  if (!CONFIG.page.comments) return;

  await NexT.utils.loadComments('.gitalk-container');
  await NexT.utils.getScript(CONFIG.gitalk.js, {
    condition: window.Gitalk
  });
  const gitalk = new Gitalk({
    clientID           : CONFIG.gitalk.client_id,
    clientSecret       : CONFIG.gitalk.client_secret,
    repo               : CONFIG.gitalk.repo,
    owner              : CONFIG.gitalk.github_id,
    admin              : [CONFIG.gitalk.admin_user],
    id                 : CONFIG.gitalk.path_md5,
    proxy              : CONFIG.gitalk.proxy,
    language           : CONFIG.gitalk.language || window.navigator.language,
    distractionFreeMode: CONFIG.gitalk.distraction_free_mode
  });
  gitalk.render(document.querySelector('.gitalk-container'));
});
