/* global NexT, CONFIG */

document.addEventListener('page:loaded', async () => {
  if (!CONFIG.page.comments) return;

  await NexT.utils.loadComments('#isso-thread');
  await NexT.utils.getScript(`${CONFIG.isso}js/embed.min.js`, {
    attributes: {
      dataset: {
        isso: `${CONFIG.isso}`
      }
    },
    parentNode: document.querySelector('#isso-thread')
  });
});
