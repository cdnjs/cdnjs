window.addEventListener("load", () => {
    let store = [];
    const $searchMask = document.getElementById("search-mask");
    const $searchDialog = document.querySelector("#local-search .search-dialog");
    window.openSearch = () => {
        utils.animateIn($searchMask, "to_show 0.5s");
        $searchDialog.style.display = "block";
        setTimeout(() => {
            document.querySelector("#local-search .search-box-input").focus();
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
    const fixSafariHeight = () => {
        if (window.innerWidth < 768) {
            $searchDialog.style.setProperty("--search-height", window.innerHeight + "px");
        }
    };
    const closeSearch = () => {
        utils.animateOut($searchDialog, "search_close .5s");
        utils.animateOut($searchMask, "to_hide 0.5s");
        window.removeEventListener("resize", fixSafariHeight);
    };

    const addEventTagList = () => {
        const list = document.querySelectorAll("#local-search .tag-list");
        if (list.length > 0) {
            list.forEach(el => el.addEventListener("click", (e) => closeSearch()))
        }
    }

    addEventTagList()

    const addEventCtrlK = () => {
        document.addEventListener("keydown", function (event) {
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault();
                openSearch();
            }
        });
    }

    addEventCtrlK()

    const searchFnOnce = () => {
        $searchMask.addEventListener("click", closeSearch);
        utils.addEventListenerPjax(document.querySelector("#local-search .search-close-button"), "click", closeSearch);
    };

    searchFnOnce();

    const searchClickFn = () => {
        utils.addEventListenerPjax(document.querySelector("#search-button > .search"), "click", openSearch);

        GLOBAL_CONFIG.right_menu && document.getElementById("menu-search").addEventListener("click", function () {
            rm.hideRightMenu();
            openSearch();
            let t = document.getElementsByClassName('search-box-input')[0];
            let evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', true, true)
            t.value = selectTextNow
            t.dispatchEvent(evt)
        })
    }

    searchClickFn();

    function init() {
        fetch(GLOBAL_CONFIG.localsearch.path)
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data, "text/xml");
                let entries = xmlDoc.getElementsByTagName("entry");
                for (let i = 0; i < entries.length; i++) {
                    let entry = entries[i];
                    let title = entry.getElementsByTagName("title")[0].textContent;
                    let link = entry.getElementsByTagName("url")[0].textContent;
                    let content = entry.getElementsByTagName("content")[0].textContent;
                    store.push({
                        'title': title,
                        'link': link,
                        'content': content
                    });
                }
            })
            .catch(err => console.error("Error loading search data:", err));
    }

    let query = ''
    let currentPage = 0;
    const resultsPerPage = 10;
    let results = [];

    function initUI() {
        const $results = document.getElementById("search-results");
        const $search = document.getElementById("search-input");
        $search.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                $results.innerHTML = '';
                query = this.value.trim();
                if (query !== '') {
                    results = search(query);
                    renderResults(results, currentPage);
                    renderPagination(results.length);
                } else {
                    clearSearchResults();
                }
            }
        });
    }

    function clearSearchResults() {
        const $results = document.getElementById("search-results");
        const $pagination = document.getElementById("search-pagination");
        const $tips = document.getElementById("search-tips");

        $results.innerHTML = '';
        $pagination.innerHTML = '';
        $tips.innerHTML = '';
    }

    function search(query) {
        const regex = new RegExp(query.split('').join('.*'), 'i');
        return store.filter(page => regex.test(page.title) || regex.test(page.content));
    }

    function renderResults(results, page) {
        const $search_results = document.getElementById("search-results");
        $search_results.innerHTML = '';
        const $tips = document.getElementById("search-tips");
        $tips.innerHTML = '';
        const start = page * resultsPerPage;
        const end = start + resultsPerPage;
        if (!results.length) {
            const $empty = document.createElement("span");
            $empty.className = "search-result-empty";
            $empty.textContent = GLOBAL_CONFIG.lang.search.empty.replace(/\$\{query}/, query);
            $search_results.appendChild($empty);
            return;
        }
        results.slice(start, end).forEach(function (result) {
            const $result = document.createElement("li");
            $result.className = "search-result-item";
            const $link = document.createElement("a");
            $link.className = "search-result-title";
            $link.href = result.link;
            $link.innerHTML = highlightSearchKeyword(result.title, query);
            $result.appendChild($link);
            $search_results.appendChild($result);
        });
        const count = document.createElement("span");
        count.className = "search-result-count";
        count.innerHTML = GLOBAL_CONFIG.lang.search.count.replace(/\$\{count}/, results.length)
        $tips.appendChild(count);
    }

    function highlightSearchKeyword(text, keyword) {
        const regex = new RegExp(`(${keyword.split(' ').join('|')})`, 'gi');
        return text.replace(regex, '<em>$1</em>');
    }

    function renderPagination(totalResults) {
        const totalPages = Math.ceil(totalResults / resultsPerPage);
        const paginationContainer = document.getElementById("search-pagination");
        paginationContainer.innerHTML = '';
        const paginationList = document.createElement("ul");
        paginationList.className = "pagination-list";

        for (let i = 0; i < totalPages; i++) {
            const button = document.createElement("li");
            button.className = "pagination-item";
            button.textContent = i + 1;
            if (i === currentPage) {
                button.classList.add('select');
            }
            button.addEventListener('click', function () {
                currentPage = i;
                renderResults(results, i);
                document.querySelectorAll(".pagination-item").forEach(function (btn) {
                    btn.classList.remove('select');
                });
                button.classList.add('select');
            });
            paginationList.appendChild(button);
        }
        paginationContainer.appendChild(paginationList);
    }

    init();
    initUI();
    window.addEventListener('DOMContentLoaded', (event) => {
        initUI();
    });
    window.addEventListener('pjax:complete', () => {
        searchClickFn()
    })
});