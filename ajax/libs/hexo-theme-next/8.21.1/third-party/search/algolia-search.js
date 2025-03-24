/* global CONFIG, NexT, pjax, algoliasearch */

document.addEventListener('DOMContentLoaded', () => {
  const { indexName, appID, apiKey, hits } = CONFIG.algolia;
  const client = algoliasearch(appID, apiKey);
  const index = client.initIndex(indexName);

  const input = document.querySelector('.search-input');
  const container = document.querySelector('.search-result-container');

  const formatHits = data => {
    const { title, excerpt, excerptStrip, contentStripTruncate } = data._highlightResult;
    let result = `<li><a href="${data.permalink}" class="search-result-title">${title.value}</a>`;
    const content = excerpt || excerptStrip || contentStripTruncate;
    if (content && content.value) {
      const div = document.createElement('div');
      div.innerHTML = content.value;
      result += `<a href="${data.permalink}"><p class="search-result">${div.textContent.substring(0, 100)}...</p></a></li>`;
    }
    return result;
  };

  let isSearching = false;
  let pendingQuery = null;

  const searchAlgolia = async(searchText, page = 0) => {
    if (isSearching) {
      pendingQuery = { searchText, page };
      return;
    }
    isSearching = true;
    const startTime = Date.now();
    const data = await index.search(searchText, {
      page,
      attributesToRetrieve : ['permalink'],
      attributesToHighlight: ['title', 'excerpt', 'excerptStrip', 'contentStripTruncate'],
      hitsPerPage          : hits.per_page || 10,
      highlightPreTag      : '<mark class="search-keyword">',
      highlightPostTag     : '</mark>'
    });
    if (data.nbHits === 0) {
      container.innerHTML = '<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>';
    } else {
      const stats = CONFIG.i18n.hits_time
        .replace('${hits}', data.nbHits)
        .replace('${time}', Date.now() - startTime);
      let pagination = '';
      if (data.nbPages > 1) {
        pagination += '<nav class="pagination algolia-pagination">';
        for (let i = 0; i < data.nbPages; i++) {
          if (i === page) {
            pagination += `<span class="page-number current">${i + 1}</span>`;
          } else {
            pagination += `<a class="page-number" href="#" data-index=${i}>${i + 1}</a>`;
          }
        }
        pagination += '</nav>';
      }

      container.innerHTML = `<div class="search-stats">
          <span>${stats}</span>
          <img src="${CONFIG.images}/logo-algolia-nebula-blue-full.svg" alt="Algolia">
        </div>
        <hr>
        <ul class="search-result-list">${data.hits.map(formatHits).join('')}</ul>
        ${pagination}`;
      if (typeof pjax === 'object') pjax.refresh(container);
      container.querySelectorAll('.page-number').forEach(element => {
        element.addEventListener('click', async event => {
          event.preventDefault();
          await searchAlgolia(searchText, Number(element.dataset.index));
        });
      });
    }
    isSearching = false;
    if (pendingQuery !== null && (pendingQuery.searchText !== searchText || pendingQuery.page !== page)) {
      const { searchText, page } = pendingQuery;
      pendingQuery = null;
      searchAlgolia(searchText, page);
    }
  };

  const inputEventFunction = async() => {
    const searchText = input.value.trim();
    if (searchText === '') {
      container.innerHTML = '<div class="search-result-icon"><i class="fab fa-algolia fa-5x"></i></div>';
      return;
    }
    // Algolia client will automatically cache the data for same queries
    await searchAlgolia(searchText, 0);
  };

  const debouncedSearch = NexT.utils.debounce(inputEventFunction, 500);
  input.addEventListener('input', debouncedSearch);

  // Handle and trigger popup window
  document.querySelectorAll('.popup-trigger').forEach(element => {
    element.addEventListener('click', () => {
      document.body.classList.add('search-active');
      // Wait for search-popup animation to complete
      setTimeout(() => input.focus(), 500);
    });
  });

  // Monitor main search box
  const onPopupClose = () => {
    document.body.classList.remove('search-active');
  };

  document.querySelector('.search-pop-overlay').addEventListener('click', event => {
    if (event.target === document.querySelector('.search-pop-overlay')) {
      onPopupClose();
    }
  });
  document.querySelector('.popup-btn-close').addEventListener('click', onPopupClose);
  document.addEventListener('pjax:success', onPopupClose);
  window.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      document.body.classList.add('search-active');
      setTimeout(() => input.focus(), 500);
    }
  });
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
});
