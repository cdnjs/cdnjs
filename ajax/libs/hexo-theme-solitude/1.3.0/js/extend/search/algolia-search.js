window.addEventListener("load", () => {
    const $searchMask = document.getElementById("search-mask");
    const $searchDialog = document.querySelector("#algolia-search .search-dialog");

    const openSearch = () => {
        utils.animateIn($searchMask, "to_show 0.5s");
        $searchDialog.style.display = "block";
        setTimeout(() => {
            document.querySelector("#algolia-search .ais-SearchBox-input").focus();
        }, 100);
        document.addEventListener("keydown", function f(event) {
            if (event.code === "Escape") {
                closeSearch();
                document.removeEventListener("keydown", f);
            }
        });
        fixSafariHeight();
        window.addEventListener("resize", fixSafariHeight);
    };

    const closeSearch = () => {
        utils.animateOut($searchDialog, "search_close .5s");
        utils.animateOut($searchMask, "to_hide 0.5s");
        window.removeEventListener("resize", fixSafariHeight);
    };

    const fixSafariHeight = () => {
        if (window.innerWidth < 768) {
            $searchDialog.style.setProperty("--search-height", window.innerHeight + "px");
        }
    };

    const searchClickFn = () => {
        utils.addEventListenerPjax(document.querySelector("#search-button > .search"), "click", openSearch);
    };

    const searchFnOnce = () => {
        $searchMask.addEventListener("click", closeSearch);
        document.querySelector("#algolia-search .search-close-button").addEventListener("click", closeSearch);
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
                let innerLoading = '<i class="scoicon sco-loading-line sco-spin"></i>';
                document.getElementById("algolia-hits").innerHTML = innerLoading;
                helper.search();
            }
        },
    });

    const configure = instantsearch.widgets.configure({
        hitsPerPage: algolia.hits.per_page ?? 5,
    });

    const searchBox = instantsearch.widgets.searchBox({
        container: "#algolia-search-input",
        showReset: false,
        showSubmit: false,
        placeholder: GLOBAL_CONFIG.lang.search.placeholder,
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
                const loadingLogo = document.querySelector("#algolia-hits .sco-spin");
                if (loadingLogo) {
                    loadingLogo.style.display = "none";
                }
                setTimeout(() => {
                    document.querySelector("#algolia-search .ais-SearchBox-input").focus();
                }, 200);
                return `
          <a href="${link}" class="algolia-hit-item-link">
          <span class="algolia-hits-item-title">${result.title.value || "no-title"}</span>
          </a>`;
            },
            empty: function (data) {
                const loadingLogo = document.querySelector("#algolia-hits .sco-spin");
                if (loadingLogo) {
                    loadingLogo.style.display = "none";
                }
                setTimeout(() => {
                    document.querySelector("#algolia-search .ais-SearchBox-input").focus();
                }, 200);
                return (
                    '<div id="algolia-hits-empty">' +
                    GLOBAL_CONFIG.lang.search.empty.replace(/\$\{query}/, data.query) +
                    "</div>"
                );
            },
        },
        cssClasses: {
            item: "algolia-hit-item",
        },
    });

    const pagination = instantsearch.widgets.pagination({
        container: "#algolia-pagination",
        totalPages: algolia.hits.per_page ?? 5,
        scrollTo: false,
        showFirstLast: false,
        templates: {
            first: '<i class="scoicon sco-show-left-line"></i>',
            last: '<i class="scoicon sco-show-right-line"></i>',
            previous: '<i class="scoicon sco-arrow-left-bold"></i>',
            next: '<i class="scoicon sco-arrow-right-bold"></i>',
        },
        cssClasses: {
            root: "pagination",
            item: "pagination-item",
            link: "page-number",
            active: "current",
            disabled: "disabled-item",
        },
    });

    const stats = instantsearch.widgets.stats({
        container: "#algolia-tips > #algolia-stats",
        templates: {
            text: function (data) {
                const stats = GLOBAL_CONFIG.lang.search.hit
                    .replace(/\$\{hits}/, data.nbHits)
                    .replace(/\$\{time}/, data.processingTimeMS);
                return `<hr>${stats}`;
            },
        },
    });

    search.addWidgets([configure, searchBox,stats, hits, pagination]);

    search.start();

    searchClickFn();
    searchFnOnce();

    window.addEventListener("pjax:complete", () => {
        !utils.isHidden($searchMask) && closeSearch();
        searchClickFn();
    });

    window.pjax &&
    search.on("render", () => {
        window.pjax.refresh(document.getElementById("algolia-hits"));
    });
});