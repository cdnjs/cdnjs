class LocalSearch {
    constructor() {
        this.store = [];
        this.currentQuery = '';
        this.currentPage = 0;
        this.resultsPerPage = 10;
        this.currentResults = [];
        this.isLoading = false;
        this.searchTimeout = null;
        
        // DOM 元素缓存
        this.elements = this.cacheElements();
        
        // 初始化
        this.init();
    }

    /**
     * 缓存常用的DOM元素
     */
    cacheElements() {
        return {
            searchMask: document.getElementById("search-mask"),
            searchDialog: document.querySelector("#local-search .search-dialog"),
            searchInput: document.getElementById("search-input"),
            searchResults: document.getElementById("search-results"),
            searchPagination: document.getElementById("search-pagination"),
            searchTips: document.getElementById("search-tips"),
            searchButton: document.querySelector("#search-button > .search"),
            closeButton: document.querySelector("#local-search .search-close-button"),
            menuSearch: document.getElementById("menu-search")
        };
    }

    /**
     * 初始化搜索功能
     */
    async init() {
        try {
            await this.loadSearchData();
            this.bindEvents();
            this.bindKeyboardShortcuts();
        } catch (error) {
            console.error('Search initialization failed:', error);
        }
    }

    /**
     * 加载搜索数据
     */
    async loadSearchData() {
        if (!GLOBAL_CONFIG?.localsearch?.path) {
            throw new Error('Search data path not configured');
        }

        this.isLoading = true;
        try {
            const response = await fetch(GLOBAL_CONFIG.localsearch.path);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.text();
            this.parseSearchData(data);
        } catch (error) {
            throw new Error(`Failed to load search data: ${error.message}`);
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * 解析搜索数据
     */
    parseSearchData(xmlData) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, "text/xml");
            const entries = xmlDoc.getElementsByTagName("entry");
            
            this.store = Array.from(entries).map(entry => {
                const getTextContent = (tagName) => {
                    const element = entry.getElementsByTagName(tagName)[0];
                    return element ? element.textContent.trim() : '';
                };
                
                return {
                    title: getTextContent("title"),
                    link: getTextContent("url"),
                    content: getTextContent("content")
                };
            }).filter(item => item.title && item.link);
        } catch (error) {
            throw new Error(`Failed to parse search data: ${error.message}`);
        }
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 搜索输入事件
        this.elements.searchInput?.addEventListener('input', this.debounce((e) => {
            this.handleSearchInput(e.target.value.trim());
        }, 300));

        // 打开/关闭搜索
        this.elements.searchButton?.addEventListener('click', () => this.openSearch());
        this.elements.closeButton?.addEventListener('click', () => this.closeSearch());
        this.elements.searchMask?.addEventListener('click', () => this.closeSearch());

        // 标签列表点击事件
        this.bindTagListEvents();

        // 右键菜单搜索
        if (GLOBAL_CONFIG.right_menu && this.elements.menuSearch) {
            this.elements.menuSearch.addEventListener('click', () => {
                rm.hideRightMenu();
                this.openSearch();
                if (window.selectTextNow) {
                    this.elements.searchInput.value = window.selectTextNow;
                    this.handleSearchInput(window.selectTextNow);
                }
            });
        }

        // PJAX 兼容性
        window.addEventListener('pjax:complete', () => {
            this.elements = this.cacheElements();
            this.bindEvents();
        });
    }

    /**
     * 绑定标签列表事件
     */
    bindTagListEvents() {
        const tagLists = document.querySelectorAll("#local-search .tag-list");
        tagLists.forEach(el => {
            el.addEventListener("click", () => this.closeSearch());
        });
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
            this.elements.searchInput?.focus();
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
        
        // 清理搜索状态
        this.currentQuery = '';
        this.currentPage = 0;
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
     * 处理搜索输入
     */
    handleSearchInput(query) {
        if (this.isLoading) return;

        this.currentQuery = query;
        this.currentPage = 0;

        if (query === '') {
            this.clearSearchResults();
            return;
        }

        try {
            const startTime = performance.now();
            this.currentResults = this.performSearch(query);
            const endTime = performance.now();
            const searchTime = (endTime - startTime).toFixed(2);
            
            this.renderResults(this.currentResults, this.currentPage, searchTime);
            this.renderPagination(this.currentResults.length);
        } catch (error) {
            console.error('Search error:', error);
            this.showErrorMessage('Search failed, please try again');
        }
    }

    /**
     * 执行搜索
     */
    performSearch(query) {
        if (!query || !this.store.length) return [];

        const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0);
        if (keywords.length === 0) return [];

        return this.store.filter(item => {
            const titleLower = item.title.toLowerCase();
            const contentLower = item.content.toLowerCase();
            
            // 所有关键词都必须在标题或内容中找到
            return keywords.every(keyword => 
                titleLower.includes(keyword) || contentLower.includes(keyword)
            );
        }).sort((a, b) => {
            // 按标题匹配度排序
            const aScore = this.calculateRelevanceScore(a, keywords);
            const bScore = this.calculateRelevanceScore(b, keywords);
            return bScore - aScore;
        });
    }

    /**
     * 计算相关性评分
     */
    calculateRelevanceScore(item, keywords) {
        let score = 0;
        const titleLower = item.title.toLowerCase();
        
        keywords.forEach(keyword => {
            // 标题完全匹配加分更多
            if (titleLower === keyword) score += 10;
            else if (titleLower.includes(keyword)) score += 5;
            // 内容匹配加分较少
            else if (item.content.toLowerCase().includes(keyword)) score += 1;
        });
        
        return score;
    }

    /**
     * 渲染搜索结果
     */
    renderResults(results, page, searchTime = null) {
        if (!this.elements.searchResults || !this.elements.searchTips) return;

        this.elements.searchResults.innerHTML = '';
        this.elements.searchTips.innerHTML = '';

        const start = page * this.resultsPerPage;
        const end = start + this.resultsPerPage;

        if (!results.length) {
            this.showEmptyMessage();
            return;
        }

        // 创建结果列表
        const fragment = document.createDocumentFragment();
        results.slice(start, end).forEach(result => {
            const resultElement = this.createResultElement(result);
            fragment.appendChild(resultElement);
        });
        this.elements.searchResults.appendChild(fragment);

        // 显示结果计数
        this.showResultCount(results.length, searchTime);
    }

    /**
     * 创建单个结果元素
     */
    createResultElement(result) {
            const $result = document.createElement("li");
            $result.className = "search-result-item";
        
            const $link = document.createElement("a");
            $link.className = "search-result-title";
            $link.href = result.link;
        $link.innerHTML = this.highlightKeywords(result.title, this.currentQuery);
        
            $result.appendChild($link);
        return $result;
    }

    /**
     * 高亮关键词
     */
    highlightKeywords(text, query) {
        if (!query) return text;
        
        const keywords = query.split(/\s+/).filter(k => k.length > 0);
        let highlightedText = text;
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${this.escapeRegExp(keyword)})`, 'gi');
            highlightedText = highlightedText.replace(regex, '<em>$1</em>');
        });
        
        return highlightedText;
    }

    /**
     * 转义正则表达式特殊字符
     */
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * 渲染分页
     */
    renderPagination(totalResults) {
        if (!this.elements.searchPagination) return;

        const totalPages = Math.ceil(totalResults / this.resultsPerPage);
        this.elements.searchPagination.innerHTML = '';

        if (totalPages <= 1) return;

        const paginationList = document.createElement("ul");
        paginationList.className = "pagination-list";

        for (let i = 0; i < totalPages; i++) {
            const button = this.createPaginationButton(i + 1, i === this.currentPage);
            button.addEventListener('click', () => this.goToPage(i));
            paginationList.appendChild(button);
        }

        this.elements.searchPagination.appendChild(paginationList);
    }

    /**
     * 创建分页按钮
     */
    createPaginationButton(pageNumber, isActive) {
        const button = document.createElement("li");
        button.className = "pagination-item";
        button.textContent = pageNumber;
        
        if (isActive) {
            button.classList.add('select');
        }
        
        return button;
    }

    /**
     * 跳转到指定页面
     */
    goToPage(page) {
        this.currentPage = page;
        this.renderResults(this.currentResults, page);
        
        // 更新分页按钮状态
        document.querySelectorAll(".pagination-item").forEach((btn, index) => {
            btn.classList.toggle('select', index === page);
        });
    }

    /**
     * 显示空结果消息
     */
    showEmptyMessage() {
        const $empty = document.createElement("span");
        $empty.className = "search-result-empty";
        $empty.textContent = GLOBAL_CONFIG.lang?.search?.empty?.replace(/\$\{query}/, this.currentQuery) || 
                           `没有找到与 "${this.currentQuery}" 相关的内容`;
        this.elements.searchResults.appendChild($empty);
    }

    /**
     * 显示结果计数
     */
    showResultCount(count, time) {
        const countElement = document.createElement("span");
        countElement.className = "search-result-count";
        countElement.innerHTML = GLOBAL_CONFIG.lang?.search?.hit?.replace(/\$\{hits}/, count).replace(/\$\{time}/, time);
        this.elements.searchTips.appendChild(countElement);
    }

    /**
     * 显示错误消息
     */
    showErrorMessage(message) {
        if (!this.elements.searchResults) return;
        
        this.elements.searchResults.innerHTML = '';
        const $error = document.createElement("span");
        $error.className = "search-result-error";
        $error.textContent = message;
        this.elements.searchResults.appendChild($error);
    }

    /**
     * 清空搜索结果
     */
    clearSearchResults() {
        if (this.elements.searchResults) this.elements.searchResults.innerHTML = '';
        if (this.elements.searchPagination) this.elements.searchPagination.innerHTML = '';
        if (this.elements.searchTips) this.elements.searchTips.innerHTML = '';
        
        this.currentResults = [];
        this.currentPage = 0;
    }

    /**
     * 防抖函数
     */
    debounce(func, wait) {
        return (...args) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
}

// 页面加载完成后初始化搜索功能
window.addEventListener("load", () => {
    window.localSearch = new LocalSearch();
});
