/* global NexT, CONFIG, mermaid */

document.addEventListener('page:loaded', () => {
  const mermaidElements = document.querySelectorAll('.mermaid');
  if (mermaidElements.length) {
    NexT.utils.getScript(CONFIG.mermaid.js, {
      condition: window.mermaid
    }).then(() => {
      mermaidElements.forEach(element => {
        const newElement = document.createElement('div');
        newElement.innerHTML = element.innerHTML;
        newElement.className = element.className;
        element.parentNode.replaceChild(newElement, element);
      });
      mermaid.initialize({
        theme    : CONFIG.darkmode && window.matchMedia('(prefers-color-scheme: dark)').matches ? CONFIG.mermaid.theme.dark : CONFIG.mermaid.theme.light,
        logLevel : 4,
        flowchart: { curve: 'linear' },
        gantt    : { axisFormat: '%m/%d/%Y' },
        sequence : { actorMargin: 50 }
      });
      mermaid.init();
    });
  }
});
