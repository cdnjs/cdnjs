/* global instantsearch, algoliasearch, CONFIG, pjax */

document.addEventListener('DOMContentLoaded', () => {
  const { indexName, appID, apiKey, hits } = CONFIG.algolia;

  const search = instantsearch({
    indexName,
    searchClient  : algoliasearch(appID, apiKey),
    searchFunction: helper => {
      if (document.querySelector('.search-input').value) {
        helper.search();
      }
    }
  });

  if (typeof pjax === 'object') {
    search.on('render', () => {
      pjax.refresh(document.querySelector('.algolia-hits'));
    });
  }

  // Registering Widgets
  search.addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: hits.per_page || 10
    }),

    instantsearch.widgets.searchBox({
      container           : '.search-input-container',
      placeholder         : CONFIG.i18n.placeholder,
      // Hide default icons of algolia search
      showReset           : false,
      showSubmit          : false,
      showLoadingIndicator: false,
      cssClasses          : {
        input: 'search-input'
      }
    }),

    instantsearch.widgets.stats({
      container: '.algolia-stats',
      templates: {
        text: data => {
          const stats = CONFIG.i18n.hits_time
            .replace(/\$\{hits}/, data.nbHits)
            .replace(/\$\{time}/, data.processingTimeMS);
          return `<span>${stats}</span>
            <img src="${CONFIG.images}/logo-algolia-nebula-blue-full.svg" alt="Algolia">`;
        }
      },
      cssClasses: {
        text: 'search-stats'
      }
    }),

    instantsearch.widgets.hits({
      container : '.algolia-hits',
      escapeHTML: false,
      templates : {
        item: data => {
          const { title, excerpt, excerptStrip, contentStripTruncate } = data._highlightResult;
          let result = `<a href="${data.permalink}" class="search-result-title">${title.value}</a>`;
          const content = excerpt || excerptStrip || contentStripTruncate;
          if (content && content.value) {
            const div = document.createElement('div');
            div.innerHTML = content.value;
            result += `<a href="${data.permalink}"><p class="search-result">${div.textContent.substr(0, 100)}...</p></a>`;
          }
          return result;
        },
        empty: data => {
          return `<div class="algolia-hits-empty">
              ${CONFIG.i18n.empty.replace(/\$\{query}/, data.query)}
            </div>`;
        }
      },
      cssClasses: {
        list: 'search-result-list'
      }
    }),

    instantsearch.widgets.pagination({
      container: '.algolia-pagination',
      scrollTo : false,
      showFirst: false,
      showLast : false,
      templates: {
        first   : '<i class="fa fa-angle-double-left"></i>',
        last    : '<i class="fa fa-angle-double-right"></i>',
        previous: '<i class="fa fa-angle-left"></i>',
        next    : '<i class="fa fa-angle-right"></i>'
      },
      cssClasses: {
        list        : ['pagination', 'algolia-pagination'],
        item        : 'pagination-item',
        link        : 'page-number',
        selectedItem: 'current',
        disabledItem: 'disabled-item'
      }
    })
  ]);

  search.start();

  // Handle and trigger popup window
  document.querySelectorAll('.popup-trigger').forEach(element => {
    element.addEventListener('click', () => {
      document.body.classList.add('search-active');
      setTimeout(() => document.querySelector('.search-input').focus(), 500);
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
  window.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
      onPopupClose();
    }
  });
});
