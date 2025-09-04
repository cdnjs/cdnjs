/* global CONFIG, firebase */

firebase.initializeApp({
  apiKey   : CONFIG.firestore.apiKey,
  projectId: CONFIG.firestore.projectId
});

(function() {
  const getCount = async (doc, increaseCount) => {
    // IncreaseCount will be false when not in article page
    const d = await doc.get();
    // Has no data, initialize count
    let count = d.exists ? d.data().count : 0;
    // If first view this article
    if (increaseCount) {
      // Increase count
      count++;
      doc.set({
        count
      });
    }
    return count;
  };

  const db = firebase.firestore();
  const articles = db.collection(CONFIG.firestore.collection);

  document.addEventListener('page:loaded', async () => {

    if (CONFIG.page.isPost) {
      // Fix issue #118
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
      const title = document.querySelector('.post-title').textContent.trim();
      const doc = articles.doc(title);
      let increaseCount = CONFIG.hostname === location.hostname;
      if (localStorage.getItem(title)) {
        increaseCount = false;
      } else {
        // Mark as visited
        localStorage.setItem(title, true);
      }
      const count = await getCount(doc, increaseCount);
      document.querySelector('.firestore-visitors-count').innerText = count;
    } else if (CONFIG.page.isHome) {
      const promises = [...document.querySelectorAll('.post-title')].map(element => {
        const title = element.textContent.trim();
        const doc = articles.doc(title);
        return getCount(doc);
      });
      const counts = await Promise.all(promises);
      const metas = document.querySelectorAll('.firestore-visitors-count');
      counts.forEach((val, idx) => {
        metas[idx].innerText = val;
      });
    }
  });
})();
