window.addEventListener("load", () => {
  const openSearch = () => {
    const bodyStyle = document.body.style;
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    anzhiyu.animateIn(document.getElementById("search-mask"), "to_show 0.5s");
    anzhiyu.animateIn(document.querySelector("#algolia-search .search-dialog"), "titleScale 0.5s");
    setTimeout(() => {
      document.querySelector("#algolia-search .ais-SearchBox-input").focus();
    }, 100);

    // shortcut: ESC
    document.addEventListener("keydown", function f(event) {
      if (event.code === "Escape") {
        closeSearch();
        document.removeEventListener("keydown", f);
      }
    });
  };

  // shortcut: shift+S
  if (anzhiyu_keyboard) {
    window.addEventListener("keydown", function (event) {
      if (event.keyCode == 83 && event.shiftKey) {
        console.info(selectTextNow);
        if (selectTextNow) {
          openSearch();
          const t = document.querySelector("#algolia-search-input > div > form > input");
          t.value = selectTextNow;
          t.dispatchEvent(new Event("input"));
          setTimeout(() => {
            document.querySelector("#algolia-search-input > div > form > button.ais-SearchBox-submit").click();
          }, 64);
        } else {
          openSearch();
        }

        return false;
      }
    });
  }

  const closeSearch = () => {
    const bodyStyle = document.body.style;
    bodyStyle.width = "";
    bodyStyle.overflow = "";
    anzhiyu.animateOut(document.querySelector("#algolia-search .search-dialog"), "search_close .5s");
    anzhiyu.animateOut(document.getElementById("search-mask"), "to_hide 0.5s");
  };

  const searchClickFn = () => {
    document.querySelector("#search-button > .search").addEventListener("click", openSearch);
    document.getElementById("search-mask").addEventListener("click", closeSearch);
    document.querySelector("#algolia-search .search-close-button").addEventListener("click", closeSearch);
  };

  const searchClickFnOnce = () => {
    document.getElementById("search-mask").addEventListener("click", closeSearch);
    document.querySelector("#algolia-search .search-close-button").addEventListener("click", closeSearch);
    const menuSearch = document.querySelector("#menu-search");
    menuSearch.addEventListener("click", function () {
      rm.hideRightMenu();
      openSearch();
      const t = document.querySelector("#algolia-search-input > div > form > input");
      t.value = selectTextNow;
      t.dispatchEvent(new Event("input"));
      setTimeout(() => {
        document.querySelector("#algolia-search-input > div > form > button.ais-SearchBox-submit").click();
      }, 64);
    });
  };

  const cutContent = content => {
    if (content === "") return "";

    const firstOccur = content.indexOf("<mark>");

    let start = firstOccur - 30;
    let end = firstOccur + 120;
    let pre = "";
    let post = "";

    if (start <= 0) {
      start = 0;
      end = 140;
    } else {
      pre = "...";
    }

    if (end > content.length) {
      end = content.length;
    } else {
      post = "...";
    }

    let matchContent = pre + content.substring(start, end) + post;
    return matchContent;
  };

  const algolia = GLOBAL_CONFIG.algolia;
  const isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName;
  if (!isAlgoliaValid) {
    return console.error("Algolia setting is invalid!");
  }

  const search = instantsearch({
    indexName: algolia.indexName,
    searchClient: algoliasearch(algolia.appId, algolia.apiKey),
    searchFunction(helper) {
      if (helper.state.query) {
        let innerLoading = '<div class="anzhiyufont anzhiyu-icon-spinner anzhiyu-spin"></div>';
        document.getElementById("algolia-hits").innerHTML = innerLoading;
        helper.search();
      }
    },
  });

  const configure = instantsearch.widgets.configure({
    hitsPerPage: algolia.hits.per_page || 5,
  });

  const searchBox = instantsearch.widgets.searchBox({
    container: "#algolia-search-input",
    showReset: false,
    showSubmit: false,
    placeholder: GLOBAL_CONFIG.algolia.languages.input_placeholder,
    showLoadingIndicator: true,
    searchOnEnterKeyPressOnly: true,
    searchAsYouType: false,
  });

  const hits = instantsearch.widgets.hits({
    container: "#algolia-hits",
    templates: {
      item(data) {
        const link = data.permalink ? data.permalink : GLOBAL_CONFIG.root + data.path;
        const result = data._highlightResult;
        const content = result.contentStripTruncate
          ? cutContent(result.contentStripTruncate.value)
          : result.contentStrip
          ? cutContent(result.contentStrip.value)
          : result.content
          ? cutContent(result.content.value)
          : "";
        const tags = data.tags;
        let templates = `
          <div class="search-result">
            <a href="${link}" class="algolia-hit-item-link">
            ${result.title.value || "no-title"}
            </a>
            <p class="algolia-hit-item-content">${content}</p>
            <div class="search-result-tags">
        `;
        for (let i = 0; i < tags.length; i++) {
          templates += `<a class="tag-list" href="/tags/${tags[i]}/">#${tags[i]}</a>`;
        }
        templates += `
          </div>
        </div>`;
        const loadingLogo = document.querySelector("#algolia-hits .anzhiyu-spin");
        if (loadingLogo) {
          loadingLogo.style.display = "none";
        }
        setTimeout(() => {
          document.querySelector("#algolia-search .ais-SearchBox-input").focus();
        }, 100);
        return templates;
      },
      empty: function (data) {
        const loadingLogo = document.querySelector("#algolia-hits .anzhiyu-spin");
        console.info(loadingLogo);
        if (loadingLogo) {
          loadingLogo.style.display = "none";
        }
        setTimeout(() => {
          document.querySelector("#algolia-search .ais-SearchBox-input").focus();
        }, 100);
        return (
          '<div id="algolia-hits-empty">' +
          GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
          "</div>"
        );
      },
    },
  });

  const stats = instantsearch.widgets.stats({
    container: "#algolia-info > .algolia-stats",
    templates: {
      text: function (data) {
        const stats = GLOBAL_CONFIG.algolia.languages.hits_stats
          .replace(/\$\{hits}/, data.nbHits)
          .replace(/\$\{time}/, data.processingTimeMS);
        return `${stats}`;
      },
    },
  });

  const powerBy = instantsearch.widgets.poweredBy({
    container: "#algolia-info > .algolia-poweredBy",
  });

  const pagination = instantsearch.widgets.pagination({
    container: "#algolia-pagination",
    totalPages: 5,
    templates: {
      first: '<i class="anzhiyufont anzhiyu-icon-angle-double-left"></i>',
      last: '<i class="anzhiyufont anzhiyu-icon-angle-double-right"></i>',
      previous: '<i class="anzhiyufont anzhiyu-icon-angle-left"></i>',
      next: '<i class="anzhiyufont anzhiyu-icon-angle-right"></i>',
    },
  });

  search.addWidgets([configure, searchBox, hits, stats, powerBy, pagination]); // add the widgets to the instantsearch instance

  search.start();

  searchClickFn();
  searchClickFnOnce();

  window.addEventListener("pjax:complete", () => {
    getComputedStyle(document.querySelector("#algolia-search .search-dialog")).display === "block" && closeSearch();
    searchClickFn();
  });

  window.pjax &&
    search.on("render", () => {
      window.pjax.refresh(document.getElementById("algolia-hits"));
    });
});
