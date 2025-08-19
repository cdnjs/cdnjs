class AlgoliaSearch {
    constructor() {
        this.searchInstance = null;
        this.isInitialized = false;
        
        // DOM 元素缓存
        this.elements = this.cacheElements();
        
        // Algolia 配置
        this.config = GLOBAL_CONFIG.algolia;
        
        // 初始化
        this.init();
    }

    /**
     * 缓存常用的DOM元素
     */
    cacheElements() {
        return {
            searchMask: document.getElementById("search-mask"),
            searchDialog: document.querySelector("#algolia-search .search-dialog"),
            searchButton: document.querySelector("#search-button > .search"),
            closeButton: document.querySelector("#algolia-search .search-close-button"),
            menuSearch: document.getElementById("menu-search"),
            hitsContainer: document.getElementById("algolia-hits"),
            inputContainer: "#algolia-search-input",
            paginationContainer: "#algolia-pagination",
            statsContainer: "#algolia-tips > #algolia-stats"
        };
    }

    /**
     * 初始化搜索功能
     */
    init() {
        try {
            if (!this.validateConfig()) {
                console.error("Algolia configuration is invalid!");
                return;
            }

            this.setupSearchInstance();
            this.bindEvents();
            this.bindKeyboardShortcuts();
            
            this.isInitialized = true;
        } catch (error) {
            console.error('Algolia search initialization failed:', error);
        }
    }

    /**
     * 验证 Algolia 配置
     */
    validateConfig() {
        return this.config && 
               this.config.appId && 
               this.config.apiKey && 
               this.config.indexName;
    }

    /**
     * 设置搜索实例
     */
    setupSearchInstance() {
        this.searchInstance = instantsearch({
            indexName: this.config.indexName,
            searchClient: algoliasearch.algoliasearch(this.config.appId, this.config.apiKey),
            searchFunction: (helper) => this.handleSearch(helper)
        });

        this.addWidgets();
        this.searchInstance.start();
    }

    /**
     * 处理搜索逻辑
     */
    handleSearch(helper) {
        if (helper.state.query) {
            this.showLoading();
            helper.search();
        } else {
            this.clearResults();
        }
    }

    /**
     * 显示加载状态
     */
    showLoading() {
        if (this.elements.hitsContainer) {
            const loadingHtml = `<div class="loading">${GLOBAL_CONFIG.lang?.search?.loading || 'Searching...'}</div>`;
            this.elements.hitsContainer.innerHTML = loadingHtml;
        }
    }

    /**
     * 清空搜索结果
     */
    clearResults() {
        if (this.elements.hitsContainer) {
            this.elements.hitsContainer.innerHTML = '';
        }
    }

    /**
     * 添加搜索组件
     */
    addWidgets() {
        const widgets = [
            this.createConfigureWidget(),
            this.createSearchBoxWidget(),
            this.createStatsWidget(),
            this.createHitsWidget(),
            this.createPaginationWidget()
        ];

        this.searchInstance.addWidgets(widgets);
    }

    /**
     * 创建配置组件
     */
    createConfigureWidget() {
        return instantsearch.widgets.configure({
            hitsPerPage: this.config.hits?.per_page || 5,
        });
    }

    /**
     * 创建搜索框组件
     */
    createSearchBoxWidget() {
        return instantsearch.widgets.searchBox({
            container: this.elements.inputContainer,
            showReset: false,
            showSubmit: false,
            placeholder: GLOBAL_CONFIG.lang?.search?.placeholder || 'Search by keywords',
            showLoadingIndicator: false,
            searchAsYouType: true,
        });
    }

    /**
     * 创建统计组件
     */
    createStatsWidget() {
        return instantsearch.widgets.stats({
            container: this.elements.statsContainer,
            templates: {
                text: (data) => this.formatStatsText(data)
            },
        });
    }

    /**
     * 格式化统计文本
     */
    formatStatsText(data) {
        const statsText = GLOBAL_CONFIG.lang?.search?.hit
            ?.replace(/\$\{hits}/, data.nbHits)
            ?.replace(/\$\{time}/, data.processingTimeMS) || 
            `Found ${data.nbHits} results, took ${data.processingTimeMS} ms`;
        
        return `<hr>${statsText}`;
    }

    /**
     * 创建结果组件
     */
    createHitsWidget() {
        return instantsearch.widgets.hits({
            container: "#algolia-hits",
            templates: {
                item: (data) => this.renderHitItem(data),
                empty: (data) => this.renderEmptyState(data)
            },
            cssClasses: {
                item: "algolia-hit-item",
            },
        });
    }

    /**
     * 渲染搜索结果项
     */
    renderHitItem(data) {
        try {
            const link = data.permalink || (GLOBAL_CONFIG.root + data.path);
            const result = data._highlightResult;
            
            // 隐藏加载状态
            this.hideLoadingIndicator();
            
            // 延迟聚焦搜索框
            this.delayedFocus();
            
            return `
                <a href="${this.escapeHtml(link)}" class="algolia-hit-item-link">
                    <span class="algolia-hits-item-title">${result.title?.value || "无标题"}</span>
                </a>`;
        } catch (error) {
            console.error('Failed to render search result item:', error);
            return '<div class="algolia-hit-error">Failed to render</div>';
        }
    }

    /**
     * 渲染空状态
     */
    renderEmptyState(data) {
        this.hideLoadingIndicator();
        this.delayedFocus();
        
        const emptyText = GLOBAL_CONFIG.lang?.search?.empty?.replace(/\$\{query}/, data.query) || 
                         `No results found for "${data.query}"`;
        
        return `<div id="algolia-hits-empty">${emptyText}</div>`;
    }

    /**
     * 隐藏加载指示器
     */
    hideLoadingIndicator() {
        const loadingElement = document.querySelector("#algolia-hits .loading");
        if (loadingElement) {
            loadingElement.style.display = "none";
        }
    }

    /**
     * 延迟聚焦搜索框
     */
    delayedFocus() {
        setTimeout(() => {
            const searchInput = document.querySelector("#algolia-search .ais-SearchBox-input");
            searchInput?.focus();
        }, 200);
    }

    /**
     * 转义HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 创建分页组件
     */
    createPaginationWidget() {
        return instantsearch.widgets.pagination({
            container: this.elements.paginationContainer,
            totalPages: this.config.hits?.per_page ?? 5,
            scrollTo: false,
            showFirstLast: false,
            templates: {
                first: '<i class="solitude fas fa-angles-left"></i>',
                last: '<i class="solitude fas fa-angles-right"></i>',
                previous: '<i class="solitude fas fa-angle-left"></i>',
                next: '<i class="solitude fas fa-angle-right"></i>',
            },
            cssClasses: {
                root: "pagination",
                item: "pagination-item",
                link: "page-number",
                active: "current",
                disabled: "disabled-item",
            },
        });
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 基础搜索事件
        this.bindSearchEvents();
        
        // 右键菜单搜索
        this.bindRightMenuSearch();
        
        // PJAX 兼容性
        this.bindPjaxEvents();
    }

    /**
     * 绑定搜索相关事件
     */
    bindSearchEvents() {
        // 搜索按钮
        if (this.elements.searchButton) {
            utils.addEventListenerPjax(this.elements.searchButton, "click", () => this.openSearch());
        }

        // 关闭按钮和遮罩
        if (this.elements.closeButton) {
            this.elements.closeButton.addEventListener("click", () => this.closeSearch());
        }
        
        if (this.elements.searchMask) {
            this.elements.searchMask.addEventListener("click", () => this.closeSearch());
        }
    }

    /**
     * 绑定右键菜单搜索
     */
    bindRightMenuSearch() {
        if (GLOBAL_CONFIG.right_menu && this.elements.menuSearch) {
            this.elements.menuSearch.addEventListener("click", () => {
                rm.hideRightMenu();
                this.openSearch();
                
                // 设置选中文本
                if (window.selectTextNow) {
                    const searchInput = document.querySelector('.ais-SearchBox-input');
                    if (searchInput) {
                        searchInput.value = window.selectTextNow;
                        const event = new Event('input', { bubbles: true });
                        searchInput.dispatchEvent(event);
                    }
                }
            });
        }
    }

    /**
     * 绑定 PJAX 事件
     */
    bindPjaxEvents() {
        window.addEventListener("pjax:complete", () => {
            if (!utils.isHidden(this.elements.searchMask)) {
                this.closeSearch();
            }
            
            // 重新缓存元素并绑定事件
            this.elements = this.cacheElements();
            this.bindSearchEvents();
        });

        // PJAX 刷新搜索结果
        if (window.pjax && this.searchInstance) {
            this.searchInstance.on("render", () => {
                const hitsElement = document.getElementById("algolia-hits");
                if (hitsElement) {
                    window.pjax.refresh(hitsElement);
                }
            });
        }
    }

    /**
     * 绑定键盘快捷键
     */
    bindKeyboardShortcuts() {
        document.addEventListener("keydown", (event) => {
            // Ctrl+K 打开搜索
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault();
                this.openSearch();
                return;
            }

            // ESC 关闭搜索
            if (event.code === "Escape" && this.isSearchOpen()) {
                this.closeSearch();
            }
        });
    }

    /**
     * 打开搜索框
     */
    openSearch() {
        if (!this.elements.searchMask || !this.elements.searchDialog) return;

        utils.animateIn(this.elements.searchMask, "to_show 0.5s");
        this.elements.searchDialog.style.display = "flex";
        
        // 延迟聚焦以确保动画完成
        setTimeout(() => {
            const searchInput = document.querySelector("#algolia-search .ais-SearchBox-input");
            searchInput?.focus();
        }, 100);

        this.fixSafariHeight();
        window.addEventListener("resize", this.fixSafariHeight);
        
        // 暴露到全局作用域以保持兼容性
        window.openSearch = () => this.openSearch();
    }

    /**
     * 关闭搜索框
     */
    closeSearch() {
        if (!this.elements.searchMask || !this.elements.searchDialog) return;

        utils.animateOut(this.elements.searchDialog, "search_close .5s");
        utils.animateOut(this.elements.searchMask, "to_hide 0.5s");
        window.removeEventListener("resize", this.fixSafariHeight);
    }

    /**
     * 检查搜索框是否打开
     */
    isSearchOpen() {
        return this.elements.searchDialog?.style.display === "flex";
    }

    /**
     * 修复Safari高度问题
     */
    fixSafariHeight = () => {
        if (window.innerWidth < 768 && this.elements.searchDialog) {
            this.elements.searchDialog.style.setProperty("--search-height", `${window.innerHeight}px`);
        }
    };

    /**
     * 销毁搜索实例
     */
    destroy() {
        if (this.searchInstance) {
            this.searchInstance.dispose();
            this.searchInstance = null;
        }
        this.isInitialized = false;
    }
}

// DOM 加载完成后初始化搜索功能
document.addEventListener("DOMContentLoaded", () => {
    window.algoliaSearch = new AlgoliaSearch();
});
