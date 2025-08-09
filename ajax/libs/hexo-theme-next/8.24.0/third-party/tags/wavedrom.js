/* global NexT, CONFIG, WaveDrom */

document.addEventListener('page:loaded', async () => {
  await NexT.utils.getScript(CONFIG.wavedrom.js, {
    condition: window.WaveDrom
  });
  await NexT.utils.getScript(CONFIG.wavedrom_skin.js, {
    condition: window.WaveSkin
  });
  WaveDrom.ProcessAll();
});
