/* global NexT, CONFIG */

document.addEventListener('page:loaded', async () => {
  if (!CONFIG.page.comments) return;

  await NexT.utils.loadComments('.utterances-container');
  await NexT.utils.getScript('https://utteranc.es/client.js', {
    attributes: {
      async       : true,
      crossOrigin : 'anonymous',
      'repo'      : CONFIG.utterances.repo,
      'issue-term': CONFIG.utterances.issue_term,
      'theme'     : CONFIG.utterances.theme
    },
    parentNode: document.querySelector('.utterances-container')
  });
});
