/* global NexT, CONFIG, PDFObject */

document.addEventListener('page:loaded', async () => {
  if (document.querySelectorAll('.pdf-container').length) {
    await NexT.utils.getScript(CONFIG.pdf.object_url, {
      condition: window.PDFObject
    });
    document.querySelectorAll('.pdf-container').forEach(element => {
      PDFObject.embed(element.dataset.target, element, {
        pdfOpenParams: {
          navpanes : 0,
          toolbar  : 0,
          statusbar: 0,
          pagemode : 'thumbs',
          view     : 'FitH'
        },
        PDFJS_URL: CONFIG.pdf.url,
        height   : element.dataset.height
      });
    });
  }
});
