/* global CONFIG */

(function() {
  const commentButton = document.querySelectorAll('.comment-button');
  commentButton.forEach(element => {
    const commentClass = element.classList[2];
    element.addEventListener('click', () => {
      commentButton.forEach(active => active.classList.toggle('active', active === element));
      document.querySelectorAll('.comment-position').forEach(active => active.classList.toggle('active', active.classList.contains(commentClass)));
      if (CONFIG.comments.storage) {
        localStorage.setItem('comments_active', commentClass);
      }
    });
  });
  let { activeClass } = CONFIG.comments;
  if (CONFIG.comments.storage) {
    activeClass = localStorage.getItem('comments_active') || activeClass;
  }
  if (activeClass) {
    const activeButton = document.querySelector(`.comment-button.${activeClass}`);
    if (activeButton) {
      activeButton.click();
    }
  }
})();
