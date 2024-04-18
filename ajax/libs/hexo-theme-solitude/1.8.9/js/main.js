const sidebarFn = () => {
    const $toggleMenu = document.getElementById('toggle-menu')
    const $mobileSidebarMenus = document.getElementById('sidebar-menus')
    const $menuMask = document.getElementById('menu-mask')
    const $body = document.body

    function openMobileSidebar() {
        utils.sidebarPaddingR()
        $body.style.overflow = 'hidden'
        utils.fadeIn($menuMask, 0.5)
        $mobileSidebarMenus.classList.add('open')
    }

    function closeMobileSidebar() {
        $body.style.overflow = ''
        $body.style.paddingRight = ''
        utils.fadeOut($menuMask, 0.5)
        $mobileSidebarMenus.classList.remove('open')
    }

    $toggleMenu.addEventListener('click', openMobileSidebar)

    $menuMask.addEventListener('click', e => {
        if ($mobileSidebarMenus.classList.contains('open')) {
            closeMobileSidebar()
        }
    })

    window.addEventListener('resize', e => {
        if (utils.isHidden($toggleMenu)) {
            if ($mobileSidebarMenus.classList.contains('open')) closeMobileSidebar()
        }
        sco.refreshWaterFall();
    })
}

const scrollFn = function () {
    const innerHeight = window.innerHeight;
    if (document.body.scrollHeight <= innerHeight) return;
    let initTop = 0;
    const $header = document.getElementById('page-header');
    const throttledScroll = utils.throttle(function (e) {
        initThemeColor();
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        const isDown = scrollDirection(currentTop);
        if (currentTop > 0) {
            if (isDown) {
                if ($header.classList.contains('nav-visible')) $header.classList.remove('nav-visible');
            } else {
                if (!$header.classList.contains('nav-visible')) $header.classList.add('nav-visible');
            }
            $header.classList.add('nav-fixed');
        } else {
            $header.classList.remove('nav-fixed', 'nav-visible');
        }
    }, 200);
    window.addEventListener('scroll', function(e) {
        throttledScroll(e);
        if (window.scrollY === 0) {
            $header.classList.remove('nav-fixed', 'nav-visible');
        }
    });
    function scrollDirection(currentTop) {
        const result = currentTop > initTop;
        initTop = currentTop;
        return result;
    }
}

const percent = () => {
    const docEl = document.documentElement;
    const body = document.body;
    const scrollPos = window.pageYOffset || docEl.scrollTop;
    const scrollHeight = Math.max(body.scrollHeight, docEl.scrollHeight, body.offsetHeight, docEl.offsetHeight, body.clientHeight, docEl.clientHeight);
    const viewportHeight = docEl.clientHeight;
    const totalScrollableHeight = scrollHeight - viewportHeight;
    const scrolledPercent = Math.round((scrollPos / totalScrollableHeight) * 100);
    const navToTop = document.querySelector("#nav-totop");
    const percentDisplay = document.querySelector("#percent");
    const commentOrFooter = document.getElementById("post-comment") || document.getElementById("footer");
    const isNearEnd = (window.scrollY + viewportHeight) >= commentOrFooter.offsetTop;
    if (isNearEnd || scrolledPercent > 90) {
        navToTop.classList.add("long");
        percentDisplay.textContent = GLOBAL_CONFIG.lang.backtop;
    } else {
        navToTop.classList.remove("long");
        percentDisplay.textContent = scrolledPercent;
    }
    const elementsToHide = document.querySelectorAll(".needEndHide");
    elementsToHide.forEach(item => item.classList.toggle("hide", totalScrollableHeight - scrollPos < 100));
    window.onscroll = percent
}

const handleThemeChange = mode => {
    const globalFn = window.globalFn || {}
    const themeChange = globalFn.themeChange || {}
    if (!themeChange) {
        return
    }

    Object.keys(themeChange).forEach(key => {
        const themeChangeFn = themeChange[key]
        themeChangeFn(mode)
    })
}

const showTodayCard = () => {
    const el = document.getElementById('todayCard')
    const topGroup = document.getElementsByClassName('topGroup')[0]

    if (el && topGroup) {
        topGroup.addEventListener('mouseleave', () => {
            el.classList.remove('hide')
        })
    }
}

const initObserver = () => {
    let commentElement = document.getElementById("post-comment");
    let paginationElement = document.getElementById("pagination");

    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                paginationElement.classList.add("show-window");
                GLOBAL_CONFIG.comment.commentBarrage && (document.querySelector(".comment-barrage").style.bottom = "-200px");
            } else {
                paginationElement.classList.remove("show-window");
                GLOBAL_CONFIG.comment.commentBarrage && (document.querySelector(".comment-barrage").style.bottom = "0px");
            }
        });
    }

    if (commentElement && paginationElement) {
        let observer = new IntersectionObserver(handleIntersection);
        observer.observe(commentElement);
    }
}

function initThemeColor() {
    const currentTop = window.scrollY || document.documentElement.scrollTop;
    let themeColor;
    if (currentTop > 0) {
        themeColor = getComputedStyle(document.documentElement).getPropertyValue('--efu-card-bg');
    } else if (PAGE_CONFIG.is_post) {
        themeColor = getComputedStyle(document.documentElement).getPropertyValue('--efu-main');
    } else {
        themeColor = getComputedStyle(document.documentElement).getPropertyValue('--efu-background');
    }
    changeThemeColor(themeColor);
}

function changeThemeColor(color) {
    if (null !== document.querySelector('meta[name="theme-color"]') && (document.querySelector('meta[name="theme-color"]').setAttribute("content", color),
        document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", color)),
        window.matchMedia("(display-mode: standalone)").matches) {
        const t = document.body;
        t ? t.style.backgroundColor = color : console.error("document.body不存在")
    }
}

class toc {
    static init() {
        const tocContainer = document.getElementById('card-toc')
        if (!tocContainer || !tocContainer.querySelector('.toc a')) {
            tocContainer.style.display = 'none'
            return
        }
        const el = document.querySelectorAll('.toc a')
        el.forEach((e) => {
            e.addEventListener('click', (event) => {
                event.preventDefault()
                utils.scrollToDest(utils.getEleTop(document.getElementById(decodeURI((event.target.className === 'toc-text' ? event.target.parentNode.hash : event.target.hash).replace('#', '')))), 300)
            })
        })
        this.active(el)
    }

    static active(toc) {
        const $article = document.getElementById('article-container')
        const $tocContent = document.getElementById('toc-content')
        const list = $article.querySelectorAll('h1,h2,h3,h4,h5,h6')
        let detectItem = ''

        function autoScroll(el) {
            const activePosition = el.getBoundingClientRect().top
            const sidebarScrollTop = $tocContent.scrollTop
            if (activePosition > (document.documentElement.clientHeight - 100)) {
                $tocContent.scrollTop = sidebarScrollTop + 150
            }
            if (activePosition < 100) {
                $tocContent.scrollTop = sidebarScrollTop - 150
            }
        }

        function findHeadPosition(top) {
            if (top === 0) {
                return false
            }

            let currentIndex = ''

            list.forEach(function (ele, index) {
                if (top > utils.getEleTop(ele) - 80) {
                    currentIndex = index
                }
            })

            if (detectItem === currentIndex) return
            detectItem = currentIndex
            document.querySelectorAll('.toc .active').forEach((i) => {
                i.classList.remove('active')
            })
            const activeitem = toc[detectItem]
            if (activeitem) {
                let parent = toc[detectItem].parentNode
                activeitem.classList.add('active')
                autoScroll(activeitem)
                for (; !parent.matches('.toc'); parent = parent.parentNode) {
                    if (parent.matches('li')) parent.classList.add('active')
                }
            }
        }

        window.tocScrollFn = utils.throttle(function () {
            const currentTop = window.scrollY || document.documentElement.scrollTop
            findHeadPosition(currentTop)
        }, 100)

        window.addEventListener('scroll', tocScrollFn)
    }
}

let lastSayHello = "";
let wleelw_musicPlaying = false
let is_rm = typeof rm !== 'undefined'

let sco = {
    hideCookie: function () {
        setTimeout(() => {
            const cookiesWindow = document.getElementById("cookies-window");
            if (cookiesWindow) {
                cookiesWindow.classList.add("cw-hide");
                setTimeout(() => {
                    cookiesWindow.style.display = "none";
                }, 1000);
            }
        }, 3000);
    },
    scrollTo: function (elementId) {
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
            const startPosition = window.pageYOffset;
            const distanceToScroll = targetPosition - startPosition;
            let animationStartTime = null;
            window.requestAnimationFrame((function smoothScroll(currentTime) {
                animationStartTime = animationStartTime || currentTime;
                const elapsedTime = currentTime - animationStartTime;
                const progressRatio = Math.min(elapsedTime / 0, 1);
                const easing = progressRatio < .5 ? 2 * progressRatio * progressRatio : (4 - 2 * progressRatio) * progressRatio - 1;
                window.scrollTo(0, startPosition + distanceToScroll * easing);
                elapsedTime < 600 && window.requestAnimationFrame(smoothScroll);
            }));
        }
    },
    musicToggle: function () {
        const $music = document.querySelector('#nav-music');
        const $meting = document.querySelector('meting-js');
        const $console = document.getElementById('consoleMusic');
        const $rm_text = document.querySelector('#menu-music-toggle span');
        const $rm_icon = document.querySelector('#menu-music-toggle i');
        wleelw_musicPlaying = !wleelw_musicPlaying;
        $music.classList.toggle("playing", wleelw_musicPlaying);
        $console.classList.toggle("on", wleelw_musicPlaying);
        if (wleelw_musicPlaying) {
            $meting.aplayer.play();
            rm?.menuItems.music[0] && ($rm_text.textContent = GLOBAL_CONFIG.right_menu.music.stop) && ($rm_icon.className = 'solitude st-pause-fill')
        } else {
            $meting.aplayer.pause();
            rm?.menuItems.music[0] && ($rm_text.textContent = GLOBAL_CONFIG.right_menu.music.start) && ($rm_icon.className = 'solitude st-play-fill')
        }
    },
    switchCommentBarrage: function () {
        let commentBarrageElement = document.querySelector(".comment-barrage");
        if (commentBarrageElement) {
            if (window.getComputedStyle(commentBarrageElement).display === "flex") {
                commentBarrageElement.style.display = "none";
                document.querySelector("#consoleCommentBarrage").classList.remove("on");
                utils.saveToLocal.set("commentBarrageSwitch", false, .2);
                rm?.menuItems.barrage && rm.barrage(true)
            } else {
                commentBarrageElement.style.display = "flex";
                document.querySelector("#consoleCommentBarrage").classList.add("on");
                utils.saveToLocal.set("commentBarrageSwitch", true, .2);
                rm?.menuItems.barrage && rm.barrage(false)
            }
        }
    },
    switchHideAside: function () {
        const htmlClassList = document.documentElement.classList;
        htmlClassList.contains("hide-aside") ? utils.saveToLocal.set("aside-status", "show", 1) : utils.saveToLocal.set("aside-status", "hide", 1)
        htmlClassList.toggle("hide-aside");
        htmlClassList.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.add("on") : document.querySelector("#consoleHideAside").classList.remove("on");
    },
    switchKeyboard: function () {
        sco_keyboards = !sco_keyboards;
        const consoleKeyboard = document.querySelector("#consoleKeyboard");
        if (sco_keyboards) {
            consoleKeyboard.classList.add("on");
            openKeyboard()
            localStorage.setItem("keyboard", true);
        } else {
            closeKeyboard()
            consoleKeyboard.classList.remove("on");
            localStorage.setItem("keyboard", false);
            document.getElementById('keyboard-tips')?.classList.remove('show')
        }
    },
    initConsoleState: function () {
        document.documentElement.classList.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.add("on") : document.querySelector("#consoleHideAside").classList.remove("on")
    },
    changeSayHelloText: function () {
        const greetings = GLOBAL_CONFIG.aside.sayhello2;
        const greetingElement = document.getElementById("author-info__sayhi");
        let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        while (randomGreeting === lastSayHello) {
            randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        }
        greetingElement.textContent = randomGreeting;
        lastSayHello = randomGreeting;
    },
    switchDarkMode: function () {
        let nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' :
            'light'
        if (nowMode === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark')
            utils.saveToLocal.set('theme', 'dark', 0.02);
            utils.snackbarShow(GLOBAL_CONFIG.lang.theme.dark, false, 2000)
            is_rm && rm.mode(true)
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
            utils.saveToLocal.set('theme', 'light', 0.02);
            utils.snackbarShow(GLOBAL_CONFIG.lang.theme.light, false, 2000)
            is_rm && rm.mode(false)
        }
        handleThemeChange(nowMode)
    },
    hideTodayCard: () => document.getElementById('todayCard').classList.add('hide'),
    toTop: () => utils.scrollToDest(0),
    showConsole: function () {
        let el = document.getElementById('console')
        if (el && !el.classList.contains('show')) {
            el.classList.add('show')
        }
    },
    hideConsole: function () {
        const el = document.getElementById('console')
        el && el.classList.remove('show')
    },
    refreshWaterFall: function () {
        const els = document.querySelectorAll('.waterfall')
        if (els.length !== 0) {
            els.forEach(el => waterfall(el) || el.classList.add('show'))
        }
    },
    addRuntime: function () {
        let el = document.getElementById('runtimeshow')
        el && GLOBAL_CONFIG.runtime && (el.innerText = utils.timeDiff(new Date(GLOBAL_CONFIG.runtime), new Date()) + GLOBAL_CONFIG.lang.time.day)
    },
    toTalk: function (txt) {
        const inputs = ["#wl-edit", ".el-textarea__inner", "#veditor", ".atk-textarea"]
        for (let i = 0; i < inputs.length; i++) {
            let el = document.querySelector(inputs[i])
            if (el != null) {
                el.dispatchEvent(new Event('input', {
                    bubble: true,
                    cancelable: true
                }))
                el.value = '> ' + txt.replace(/\n/g, '\n> ') + '\n\n'
                utils.scrollToDest(utils.getEleTop(document.getElementById('post-comment')), 300)
                el.focus()
                el.setSelectionRange(-1, -1)
            }
        }
        utils.snackbarShow(GLOBAL_CONFIG.lang.totalk, !1, 2e3);
    },
    initbbtalk: function () {
        if (document.querySelector('#bber-talk')) {
            let swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                loop: true,
                autoplay: {
                    delay: 3000,
                    pauseOnMouseEnter: true
                },
            });
        }
    },
    addPhotoFigcaption: function () {
        let images = document.querySelectorAll('#article-container img');
        images.forEach((image) => {
            const imageParent = image.parentNode;
            const captionText = image.getAttribute('alt');

            if (captionText) {
                const captionElement = document.createElement('div');
                captionElement.className = 'img-alt is-center';
                captionElement.textContent = captionText;

                imageParent.insertBefore(captionElement, image.nextSibling);
            }
        });
    },
    scrollToComment: function () {
        utils.scrollToDest(utils.getEleTop(document.getElementById('post-comment')), 300)
    },
    setTimeState: function () {
        const el = document.getElementById('author-info__sayhi');
        if (el) {
            const timeNow = new Date();
            const hours = timeNow.getHours();
            const lang = GLOBAL_CONFIG.aside.sayhello;
            const greetings = [{
                start: 0,
                end: 5,
                text: lang.goodnight
            },
                {
                    start: 6,
                    end: 10,
                    text: lang.morning
                },
                {
                    start: 11,
                    end: 14,
                    text: lang.noon
                },
                {
                    start: 15,
                    end: 18,
                    text: lang.afternoon
                },
                {
                    start: 19,
                    end: 24,
                    text: lang.night
                },
            ];
            for (let greeting of greetings) {
                if (hours >= greeting.start && hours <= greeting.end) {
                    el.innerText = greeting.text;
                    break;
                }
            }
        }
    },
    tagPageActive: function () {
        const currentPath = window.location.pathname;
        const decodedPath = decodeURIComponent(currentPath);

        const isTagPage = /\/tags\/.*?\//.test(decodedPath);
        if (isTagPage) {
            const tag = decodedPath.split("/").slice(-2, -1)[0];

            const tagPageTagsElement = document.getElementById("#tag-page-tags");
            if (tagPageTagsElement) {
                const allLinks = document.querySelectorAll("a");
                allLinks.forEach(link => {
                    link.classList.remove("select");
                });

                const tagElement = document.getElementById(tag);
                if (tagElement) {
                    tagElement.classList.add("select");
                }
            }
        }
    },
    categoriesBarActive: function () {
        const categoryBar = document.querySelector("#category-bar");
        const currentPath = window.location.pathname;
        const decodedPath = decodeURIComponent(currentPath);

        if (categoryBar) {
            const categoryBarItems = document.querySelectorAll(".category-bar-item");
            categoryBarItems.forEach(item => {
                item.classList.remove("select");
            });
            if (decodedPath === "/") {
                const homeItem = document.getElementById("category-bar-home");
                homeItem.classList.add("select");
            } else {
                if (/\/categories\/.*?\//.test(decodedPath)) {
                    let category = decodedPath.split("/").slice(-2, -1)[0];
                    category = category.charAt(0).toUpperCase() + category.slice(1);
                    const categoryItem = document.getElementById(category);
                    if (categoryItem) {
                        categoryItem.classList.add("select");
                    }
                }
            }
        }
    },
    scrollCategoryBarToRight: function () {
        let timeoutId;
        let scrollBar = document.getElementById("category-bar-items");
        let nextElement = document.getElementById("category-bar-next");
        let scrollBarWidth = scrollBar.clientWidth;
        if (scrollBar) {
            if (scrollBar.scrollLeft + scrollBar.clientWidth >= scrollBar.scrollWidth - 8) {
                scrollBar.scroll({
                    left: 0,
                    behavior: "smooth"
                });
            } else {
                scrollBar.scrollBy({
                    left: scrollBarWidth,
                    behavior: "smooth"
                });
            }
            scrollBar.addEventListener("scroll", function onScroll() {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(function () {
                    if (scrollBar.scrollLeft + scrollBar.clientWidth >= scrollBar.scrollWidth - 8) {
                        nextElement.style.transform = "rotate(180deg)";
                    } else {
                        nextElement.style.transform = "";
                    }
                    scrollBar.removeEventListener("scroll", onScroll);
                }, 150);
            });
        }
    },
    openAllTags: function () {
        let tagCloudElements = document.querySelectorAll(".card-allinfo .card-tag-cloud");
        tagCloudElements.forEach(function (tagCloudElement) {
            tagCloudElement.classList.add("all-tags");
        });
        let moreTagsButton = document.getElementById("more-tags-btn");
        if (moreTagsButton) {
            moreTagsButton.parentNode.removeChild(moreTagsButton);
        }
    },
    listenToPageInputPress: function () {
        const pageText = document.getElementById("toPageText");
        const pageButton = document.getElementById("toPageButton");

        if (!pageText) return;

        const pageNumbers = document.querySelectorAll(".page-number");
        const lastPageNumber = +pageNumbers[pageNumbers.length - 1].textContent;

        if (lastPageNumber === 1) {
            const toPageGroup = document.querySelector(".toPageGroup");
            if (toPageGroup) toPageGroup.remove();
        }

        pageText.addEventListener("keydown", (event) => {
            if (event.keyCode === 13) {
                sco.toPage();
                pjax.loadUrl(pageButton.href);
            }
        });

        pageText.addEventListener("input", () => {
            if (pageText.value === "" || pageText.value === "0") {
                pageButton.classList.remove("haveValue");
            } else {
                pageButton.classList.add("haveValue");
            }

            const pageNumbers = document.querySelectorAll(".page-number");
            const lastPageNumber = +pageNumbers[pageNumbers.length - 1].textContent;

            if (+pageText.value > lastPageNumber) {
                pageText.value = lastPageNumber;
            }
        });
    },
    addNavBackgroundInit: function () {
        let e = 0
            , t = 0;
        document.body && (e = document.body.scrollTop),
        document.documentElement && (t = document.documentElement.scrollTop),
        0 !== (e - t > 0 ? e : t) && (document.getElementById("page-header").classList.add("nav-fixed"), document.getElementById("page-header").classList.add("nav-visible"))
        const cookiesWindow = document.getElementById("cookies-window");
        if (cookiesWindow) {
            cookiesWindow.style.display = 'none';
        }
    },
    initAdjust: function (change = false) {
        const $blogName = document.getElementById('site-name')
        let blogNameWidth = $blogName && $blogName.offsetWidth
        const $menusEle = document.querySelector('#menus .menus_items')
        let menusWidth = $menusEle && $menusEle.offsetWidth
        const $searchEle = document.querySelector('#search-button')
        let searchWidth = $searchEle && $searchEle.offsetWidth
        if (change) {
            blogNameWidth = $blogName && $blogName.offsetWidth
            menusWidth = $menusEle && $menusEle.offsetWidth
            searchWidth = $searchEle && $searchEle.offsetWidth
        }
        const $nav = document.getElementById('nav')
        let t
        if (window.innerWidth < 768) t = true
        else t = blogNameWidth + menusWidth + searchWidth > $nav?.offsetWidth - 120

        if (t) {
            $nav?.classList.add('hide-menu')
        } else {
            $nav?.classList.remove('hide-menu')
        }

        document.getElementById('nav')?.classList.add('show')
    },
    toPage: function () {
        const pageNumbers = document.querySelectorAll(".page-number");
        const maxPageNumber = parseInt(pageNumbers[pageNumbers.length - 1].innerHTML);
        const inputElement = document.getElementById("toPageText");
        const inputPageNumber = parseInt(inputElement.value);

        if (!isNaN(inputPageNumber) && inputPageNumber > 0 && inputPageNumber <= maxPageNumber) {
            const currentPageUrl = window.location.href.replace(/\/page\/\d+\/$/, "/");
            let targetPageUrl;

            if (inputPageNumber === 1) {
                targetPageUrl = currentPageUrl;
            } else {
                targetPageUrl = currentPageUrl + (currentPageUrl.endsWith("/") ? "" : "/") + "page/" + inputPageNumber + "/";
            }

            document.getElementById("toPageButton").href = targetPageUrl;
        }
    },
    owoBig(owoSelector) {

        let owoBig = document.getElementById('owo-big');
        if (!owoBig) {
            owoBig = document.createElement('div');
            owoBig.id = 'owo-big';
            document.body.appendChild(owoBig);
        }

        const debounce = (func, wait) => {
            let timeout;
            return function (...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        };

        const showOwoBig = (event) => {
            const target = event.target;
            const owoItem = target.closest(owoSelector.item);
            if (owoItem && target.closest(owoSelector.body)) {
                const imgSrc = owoItem.querySelector('img')?.src;
                if (imgSrc) {
                    owoBig.innerHTML = `<img src="${imgSrc}" style="max-width: 100%; height: auto;">`;
                    owoBig.style.display = 'block';
                    positionOwoBig(owoItem);
                }
            }
        };

        const hideOwoBig = (event) => {
            if (event.target.closest(owoSelector.item) && event.target.closest(owoSelector.body)) {
                owoBig.style.display = 'none';
            }
        };

        function positionOwoBig(owoItem) {
            const itemRect = owoItem.getBoundingClientRect();
            owoBig.style.left = `${itemRect.left - (owoBig.offsetWidth / 4)}px`;
            owoBig.style.top = `${itemRect.top}px`;
        }

        document.addEventListener('mouseover', debounce(showOwoBig, 100));
        document.addEventListener('mouseout', hideOwoBig);
    },
    changeTimeFormat(selector) {
        selector.forEach(item => {
            const timeVal = item.getAttribute('datetime')
            item.textContent = utils.diffDate(timeVal, true)
            item.style.display = 'inline'
        })
    },
    switchComments() {
        const switchBtn = document.getElementById('switch-btn')
        if (!switchBtn) return
        let switchDone = false
        const commentContainer = document.getElementById('post-comment')
        const handleSwitchBtn = () => {
            commentContainer.classList.toggle('move')
            if (!switchDone && typeof loadTwoComment === 'function') {
                switchDone = true
                loadTwoComment()
            }
        }
        utils.addEventListenerPjax(switchBtn, 'click', handleSwitchBtn)
    },
}

const addHighlight = () => {
    const highlight = GLOBAL_CONFIG.highlight;
    if (!highlight) return;

    const {copy, expand, limit, syntax} = highlight;
    const $isPrismjs = syntax === 'prismjs';
    const $isShowTool = highlight.enable || copy || expand || limit;
    const expandClass = !expand === true ? 'closed' : ''
    const $syntaxHighlight = syntax === 'highlight.js' ? document.querySelectorAll('figure.highlight') : document.querySelectorAll('pre[class*="language-"]')

    if (!(($isShowTool || limit) && $syntaxHighlight.length)) return

    const copyEle = copy ? `<i class="solitude st-copy-fill copy-button"></i>` : '<i></i>';
    const expandEle = `<i class="solitude st-arrow-down expand"></i>`;
    const limitEle = limit ? `<i class="solitude st-show-line"></i>` : '<i></i>';

    const alertInfo = (ele, text) => {
        utils.snackbarShow(text, false, 2000);
    }

    const copyCode = (e) => {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            document.execCommand('copy')
            alertInfo(e, GLOBAL_CONFIG.lang.copy.success)
        } else {
            alertInfo(e, GLOBAL_CONFIG.lang.copy.error)
        }
    }

    const copyFn = (e) => {
        const $buttonParent = e.parentNode
        $buttonParent.classList.add('copy-true')
        const selection = window.getSelection()
        const range = document.createRange()
        const preCodeSelector = $isPrismjs ? 'pre code' : 'table .code pre'
        range.selectNodeContents($buttonParent.querySelectorAll(`${preCodeSelector}`)[0])
        selection.removeAllRanges()
        selection.addRange(range)
        copyCode(e.lastChild)
        selection.removeAllRanges()
        $buttonParent.classList.remove('copy-true')
    }

    const expandClose = (e) => {
        e.classList.toggle('closed')
    }

    const shrinkEle = function () {
        this.classList.toggle('expand-done')
    }

    const ToolsFn = function (e) {
        const $target = e.target.classList
        if ($target.contains('expand')) expandClose(this)
        else if ($target.contains('copy-button')) copyFn(this)
    }

    const createEle = (lang, item, service) => {
        const fragment = document.createDocumentFragment()

        if ($isShowTool) {
            const hlTools = document.createElement('div')
            hlTools.className = `highlight-tools ${expandClass}`
            hlTools.innerHTML = expandEle + lang + copyEle
            utils.addEventListenerPjax(hlTools, 'click', ToolsFn)
            fragment.appendChild(hlTools)
        }

        if (limit && item.offsetHeight > limit + 30) {

            const ele = document.createElement('div')
            ele.className = 'code-expand-btn'
            ele.innerHTML = limitEle
            utils.addEventListenerPjax(ele, 'click', shrinkEle)
            fragment.appendChild(ele)
        }

        if (service === 'hl') {
            item.insertBefore(fragment, item.firstChild)
        } else {
            item.parentNode.insertBefore(fragment, item)
        }
    }

    if ($isPrismjs) {
        $syntaxHighlight.forEach(item => {
            const langName = item.getAttribute('data-language') || 'Code'
            const highlightLangEle = `<div class="code-lang">${langName}</div>`
            utils.wrap(item, 'figure', {
                class: 'highlight'
            })
            createEle(highlightLangEle, item)
        })
    } else {
        $syntaxHighlight.forEach(item => {
            let langName = item.getAttribute('class').split(' ')[1]
            if (langName === 'plain' || langName === undefined) langName = 'Code'
            const highlightLangEle = `<div class="code-lang">${langName}</div>`
            createEle(highlightLangEle, item, 'hl')
        })
    }
}

const addCopyright = () => {
    if (!GLOBAL_CONFIG.copyright) return
    const {limit, author, link, source, info} = GLOBAL_CONFIG.copyright
    const handleCopy = (e) => {
        e.preventDefault()
        const copyText = window.getSelection(0).toString()
        let text = copyText
        if (copyText.length > limit) {
            text = `${copyText}\n\n${author}\n${link}${window.location.href}\n${source}\n${info}`
        }
        if (e.clipboardData) {
            return e.clipboardData.setData('text', text)
        } else {
            return window.clipboardData.setData('text', text)
        }
    }
    document.body.addEventListener('copy', handleCopy)
}

const asideStatus = () => {
    const asideStatus = utils.saveToLocal.get('aside-status')
    if (asideStatus !== undefined) {
        if (asideStatus === 'hide') {
            document.documentElement.classList.add('hide-aside')
        } else {
            document.documentElement.classList.remove('hide-aside')
        }
    }
}

class tabs {
    static init() {
        this.clickFnOfTabs()
        this.backToTop()
    }

    static clickFnOfTabs() {
        document.querySelectorAll('#article-container .tab > button').forEach(function (item) {
            item.addEventListener('click', function (e) {
                const that = this
                const $tabItem = that.parentNode
                if (!$tabItem.classList.contains('active')) {
                    const $tabContent = $tabItem.parentNode.nextElementSibling
                    const $siblings = utils.siblings($tabItem, '.active')[0]
                    $siblings && $siblings.classList.remove('active')
                    $tabItem.classList.add('active')
                    const tabId = that.getAttribute('data-href').replace('#', '')
                    const childList = [...$tabContent.children]
                    childList.forEach(item => {
                        if (item.id === tabId) item.classList.add('active')
                        else item.classList.remove('active')
                    })
                }
            })
        })
    }

    static backToTop() {
        document.querySelectorAll('#article-container .tabs .tab-to-top').forEach(function (item) {
            item.addEventListener('click', function () {
                utils.scrollToDest(utils.getEleTop(item.parentElement.parentElement.parentNode), 300)

            })
        })
    }
}

window.refreshFn = () => {
    document.body.setAttribute('data-type', PAGE_CONFIG.page)
    if (PAGE_CONFIG.is_home || PAGE_CONFIG.is_page) {
        sco.changeTimeFormat(document.querySelectorAll('#recent-posts time, .webinfo-item time'))
        GLOBAL_CONFIG.runtime && sco.addRuntime()
    } else {
        sco.changeTimeFormat(document.querySelectorAll('#post-meta time'))
    }
    scrollFn()
    sidebarFn()
    sco.hideCookie()
    sco.addPhotoFigcaption()
    sco.setTimeState()
    sco.tagPageActive()
    sco.categoriesBarActive()
    sco.listenToPageInputPress()
    sco.addNavBackgroundInit()
    sco.refreshWaterFall()
    GLOBAL_CONFIG.lazyload.enable && utils.lazyloadImg()
    GLOBAL_CONFIG.lightbox && utils.lightbox(document.querySelectorAll("#article-container img:not(.flink-avatar,.gallery-group img)"))
    GLOBAL_CONFIG.randomlink && randomLinksList()
    PAGE_CONFIG.toc && toc.init();
    (PAGE_CONFIG.is_post || PAGE_CONFIG.is_page) && ((addHighlight()) || tabs.init())
    PAGE_CONFIG.is_home && showTodayCard()
    GLOBAL_CONFIG.covercolor.enable && coverColor()
    PAGE_CONFIG.page === "music" && scoMusic.init()
    GLOBAL_CONFIG.post_ai && PAGE_CONFIG.is_post && efu_ai.init()
    sco.switchComments()
}

document.addEventListener('DOMContentLoaded', function () {
    sco.initAdjust()
    initObserver()
    addCopyright()
    sco.initConsoleState()
    window.refreshFn()
    asideStatus()
    percent()
})

window.onkeydown = function (e) {
    (123 === e.keyCode || (17 === e.ctrlKey && 16 === e.shiftKey && 67 === e.keyCode)) && utils.snackbarShow(GLOBAL_CONFIG.lang.f12, !1, 3e3);
    (27 === e.keyCode) && sco.hideConsole();
}

document.addEventListener('copy', () => utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success, false, 3e3))