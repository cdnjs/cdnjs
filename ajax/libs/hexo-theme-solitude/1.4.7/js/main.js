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
    })
}

const scrollFn = function () {
    const innerHeight = window.innerHeight;
    const $header = document.getElementById('page-header');
    if (!$header || document.body.scrollHeight <= innerHeight) return;

    let initTop = 0;
    window.addEventListener('scroll', utils.throttle(function (e) {
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

        percent();
    }, 200));

    function scrollDirection(currentTop) {
        const result = currentTop > initTop;
        initTop = currentTop;
        return result;
    }
}

let ticking = false;

const percent = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            let scrollTop = document.documentElement.scrollTop || window.pageYOffset;
            let totalHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight;
            let scrollPercent = Math.round(scrollTop / totalHeight * 100);
            let percentElement = document.querySelector("#percent");
            let viewportBottom = window.scrollY + document.documentElement.clientHeight;
            let remainingScroll = totalHeight - scrollTop;

            if ((document.getElementById("post-comment") || document.getElementById("footer")).offsetTop < viewportBottom || scrollPercent > 90) {
                document.querySelector("#nav-totop").classList.add("long");
                percentElement.innerHTML = "返回顶部";
            } else {
                document.querySelector("#nav-totop").classList.remove("long");
                if (scrollPercent >= 0) {
                    percentElement.innerHTML = scrollPercent + "";
                }
            }

            let elementsToHide = document.querySelectorAll(".needEndHide");
            if (remainingScroll < 100) {
                elementsToHide.forEach(function (element) {
                    element.classList.add("hide");
                });
            } else {
                elementsToHide.forEach(function (element) {
                    element.classList.remove("hide");
                });
            }
            ticking = false;
        });
        ticking = true;
    }
};

window.onscroll = percent;


const showTodayCard = () => {
    const el = document.getElementById('todayCard')
    const topGroup = document.getElementsByClassName('topGroup')[0]

    if (el && topGroup) {
        topGroup.addEventListener('mouseleave', () => {
            el.classList.remove('hide')
        })
    }
}

const changeTimeFormat = () => {
    const timeElements = Array.from(document.getElementsByTagName("time"));
    const lang = GLOBAL_CONFIG.lang.time;
    const currentDate = new Date();

    timeElements.forEach(timeElement => {
        const datetime = timeElement.getAttribute("datetime");
        const timeObj = new Date(datetime);
        const daysDiff = utils.timeDiff(timeObj, currentDate);

        let timeString;
        if (daysDiff === 0) {
            timeString = lang.recent;
        } else if (daysDiff === 1) {
            timeString = lang.yesterday;
        } else if (daysDiff === 2) {
            timeString = lang.berforeyesterday;
        } else if (daysDiff <= 7) {
            timeString = `${daysDiff}${lang.daybefore}`;
        } else {
            if (timeObj.getFullYear() !== currentDate.getFullYear()) {
                timeString = `${timeObj.getFullYear()}/${timeObj.getMonth() + 1}/${timeObj.getDate()}`;
            } else {
                timeString = `${timeObj.getMonth() + 1}/${timeObj.getDate()}`;
            }
        }
        timeElement.textContent = timeString;
    });
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
    switchCommentBarrage: function () {
        let commentBarrageElement = document.querySelector(".comment-barrage");
        if (commentBarrageElement) {
            if (window.getComputedStyle(commentBarrageElement).display === "flex") {
                commentBarrageElement.style.display = "none";
                document.querySelector(".menu-commentBarrage-text").textContent = "显示热评";
                document.querySelector("#consoleCommentBarrage").classList.remove("on");
                localStorage.removeItem("commentBarrageSwitch");
            } else {
                commentBarrageElement.style.display = "flex";
                document.querySelector(".menu-commentBarrage-text").textContent = "关闭热评";
                document.querySelector("#consoleCommentBarrage").classList.add("on");
                localStorage.setItem("commentBarrageSwitch", "false");
            }
        }
    },
    switchHideAside: function () {
        const htmlClassList = document.documentElement.classList;
        htmlClassList.contains("hide-aside") ? saveToLocal.set("aside-status", "show", 1) : saveToLocal.set("aside-status", "hide", 1)
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
            saveToLocal.set('theme', 'dark', 0.02);
            utils.snackbarShow(GLOBAL_CONFIG.lang.theme.dark, false, 2000)
            GLOBAL_CONFIG.rightside && (document.querySelector(".menu-darkmode-text").textContent = "浅色模式");
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
            saveToLocal.set('theme', 'light', 0.02);
            utils.snackbarShow(GLOBAL_CONFIG.lang.theme.light, false, 2000)
            GLOBAL_CONFIG.rightside && (document.querySelector(".menu-darkmode-text").textContent = "深色模式");
        }
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
    reflashEssayWaterFall: function () {
        const el = document.getElementById('waterfall')
        el && (() => {
            setTimeout(function () {
                waterfall('#waterfall');
                el.classList.add('show');
            }, 500);
        })();
    },
    addRuntime: function () {
        let el = document.getElementById('runtimeshow')
        el && GLOBAL_CONFIG.runtime && (el.innerText = utils.timeDiff(new Date(GLOBAL_CONFIG.runtime), new Date()) + GLOBAL_CONFIG.lang.time.runtime)
    },
    toTalk: function (txt) {
        const inputs = ["#wl-edit", ".el-textarea__inner"]
        for (let i = 0; i < inputs.length; i++) {
            let el = document.querySelector(inputs[i])
            if (el != null) {
                el.dispatchEvent(new Event('input', {bubble: true, cancelable: true}))
                el.value = '> ' + txt.replace(/\n/g, '\n> ') + '\n\n'
                utils.scrollToDest(utils.getEleTop(document.getElementById('post-comment')), 300)
                el.focus()
                el.setSelectionRange(-1, -1)
            }
        }
        const commentTips = document.querySelector("#comment-tips");
        if (commentTips) {
            commentTips.classList.add("show");
        }
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
    downloadImage: function (imageUrl, filename = 'photo') {
        if (rm.downloadimging) {
            utils.snackbarShow("有正在进行中的下载，请稍后再试");
            return;
        }

        rm.hideRightMenu();
        rm.downloadimging = true;
        utils.snackbarShow("正在下载中，请稍后", false, 10000);

        let img = new Image();
        img.setAttribute("crossOrigin", "anonymous");
        img.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);

            let dataUrl = canvas.toDataURL("image/png");
            let link = document.createElement("a");
            link.download = filename;
            link.href = dataUrl;

            let clickEvent = new MouseEvent("click");
            link.dispatchEvent(clickEvent);

            utils.snackbarShow("图片已添加盲水印，请遵守版权协议");
            rm.downloadimging = false;
        };
        img.src = imageUrl;
    },
    musicToggle: function () {
        const $music = document.querySelector('#nav-music');
        const $meting = document.querySelector('meting-js');
        const $console = document.getElementById('consoleMusic');
        const $toggleButton = document.getElementById('menu-music-toggle');
        wleelw_musicPlaying = !wleelw_musicPlaying;
        $music.classList.toggle("playing", wleelw_musicPlaying);
        $console.classList.toggle("on", wleelw_musicPlaying);
        if (wleelw_musicPlaying) {
            $meting.aplayer.play();
            $toggleButton.innerHTML = `<i class="scoicon sco-pause-fill"></i><span>暂停音乐</span>`;
        } else {
            $meting.aplayer.pause();
            $toggleButton.innerHTML = `<i class="scoicon sco-play-fill"></i><span>播放音乐</span>`;
        }
        rm.hideRightMenu();
    },
    musicSkipBack: function () {
        document.querySelector('meting-js').aplayer.skipBack()
        rm.hideRightMenu()
    },
    musicSkipForward: function () {
        document.querySelector('meting-js').aplayer.skipForward()
        rm.hideRightMenu()
    },
    musicGetName: function () {
        const titles = Array.from(document.querySelectorAll('.aplayer-title')).map(e => e.innerText);
        return titles[0];
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
            const greetings = [
                {start: 0, end: 5, text: lang.goodnight},
                {start: 6, end: 10, text: lang.morning},
                {start: 11, end: 14, text: lang.noon},
                {start: 15, end: 18, text: lang.afternoon},
                {start: 19, end: 24, text: lang.night},
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
        }
        if (decodedPath === "/") {
            if (categoryBar) {
                const homeItem = document.getElementById("category-bar-home");
                homeItem.classList.add("select");
            }
        } else {
            if (/\/categories\/.*?\//.test(decodedPath)) {
                let category = decodedPath.split("/").slice(-2, -1)[0];
                category = category.charAt(0).toUpperCase() + category.slice(1);
                if (categoryBar) {
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
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (scrollTop !== 0) {
            var pageHeader = document.getElementById("page-header");
            if (pageHeader) {
                pageHeader.classList.add("nav-fixed", "nav-visible");
            }
            var cookiesWindow = document.getElementById("cookies-window");
            if (cookiesWindow) {
                cookiesWindow.style.display = 'none';
            }
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
    addRandomCommentInfo: function () {
        const e = `${GLOBAL_CONFIG.comment.randomInfoStart[Math.floor(Math.random() * GLOBAL_CONFIG.comment.randomInfoStart.length)]}${GLOBAL_CONFIG.comment.randomInfoEnd[Math.floor(Math.random() * GLOBAL_CONFIG.comment.randomInfoEnd.length)]}`;

        const nameSelectors = ["#author", "input[name='comname']", "#inpName", "input[name='author']", "#ds-dialog-name", "#name", "input[name='nick']", "#comment_author"];
        const emailSelectors = ["#mail", "#email", "input[name='commail']", "#inpEmail", "input[name='email']", "#ds-dialog-email", "input[name='mail']", "#comment_email"];

        const nameElements = nameSelectors.map(selector => document.querySelector(selector)).filter(Boolean);
        const emailElements = emailSelectors.map(selector => document.querySelector(selector)).filter(Boolean);

        nameElements.forEach(element => {
            element.value = e;
            element.dispatchEvent(new Event("input"));
        });

        emailElements.forEach(element => {
            element.value = "donotreply@examp.com";
            element.dispatchEvent(new Event("input"));
        });
    },
}

class hightlight {
    static createEle(langEl, item) {
        const fragment = document.createDocumentFragment()
        const highlightCopyEle = GLOBAL_CONFIG.hightlight.copy ? '<i class="scoicon sco-copy-fill"></i>' : '<i></i>'
        const highlightExpandEle = '<i class="scoicon sco-arrow-down expand"></i>'

        const hlTools = document.createElement('div')
        hlTools.className = `highlight-tools`
        hlTools.innerHTML = highlightExpandEle + langEl + highlightCopyEle
        let expand = GLOBAL_CONFIG.hightlight.expand
        hlTools.children[0].addEventListener('click', (e) => {
            if (expand) {
                hlTools.children[0].classList.add('closed')
                $table.setAttribute('style', 'display:none')
                if ($expand.length !== 0) {
                    $expand[0].setAttribute('style', 'display:none')
                }
            } else {
                hlTools.children[0].classList.remove('closed')
                $table.setAttribute('style', 'display:block')
                if ($expand.length !== 0) {
                    $expand[0].setAttribute('style', 'display:block')
                }
                if (GLOBAL_CONFIG.hightlight.limit && itemHeight > GLOBAL_CONFIG.hightlight.limit) {
                    $table.setAttribute('style', `height: ${GLOBAL_CONFIG.hightlight.limit}px`)
                } else {
                    $table.setAttribute('style', `height: auto`)
                }
            }
            expand = !expand
        })
        hlTools.children[2].addEventListener('click', (e) => {
            utils.copy($table.querySelector('.code').innerText)
        })
        const ele = document.createElement('div')
        fragment.appendChild(hlTools)
        const itemHeight = item.clientHeight, $table = item.querySelector('table'),
            $expand = item.getElementsByClassName('code-expand-btn')
        if (GLOBAL_CONFIG.hightlight.limit && itemHeight > GLOBAL_CONFIG.hightlight.limit) {
            $table.setAttribute('style', `height: ${GLOBAL_CONFIG.hightlight.limit}px`)
            ele.className = 'code-expand-btn'
            ele.innerHTML = '<i class="scoicon sco-show-line"></i>'
            ele.addEventListener('click', (e) => {
                $table.setAttribute('style', `height: ${itemHeight}px`)
                e.target.classList.add('expand-done')
                e.target.setAttribute('style', 'display:none')
            })
            fragment.appendChild(ele)
        }
        item.insertBefore(fragment, item.firstChild)
        if (!expand) {
            hlTools.children[0].classList.add('closed')
            $table.setAttribute('style', 'display:none')
            if ($expand.length !== 0) {
                $expand[0].setAttribute('style', 'display:none')
            }
        }
    }

    static init() {
        const $figureHighlight = document.querySelectorAll('figure.highlight'), that = this
        $figureHighlight.forEach(function (item) {
            let langName = item.getAttribute('class').split(' ')[1]
            if (langName === 'plaintext' || langName === undefined) langName = 'Code'
            const highlightLangEle = `<div class="code-lang">${langName.toUpperCase()}</div>`
            that.createEle(highlightLangEle, item)
        })
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
    sco.initAdjust()
    scrollFn()
    sidebarFn()
    changeTimeFormat()
    initObserver()
    sco.addRuntime()
    sco.hideCookie()
    sco.addPhotoFigcaption()
    sco.setTimeState()
    sco.tagPageActive()
    sco.categoriesBarActive()
    sco.listenToPageInputPress()
    sco.addNavBackgroundInit()
    GLOBAL_CONFIG.rightside.enable && addRightMenuClickEvent()
    GLOBAL_CONFIG.lazyload.enable && utils.lazyloadImg()
    GLOBAL_CONFIG.lightbox && utils.lightbox(document.querySelectorAll("#article-container img:not(.flink-avatar)"))
    GLOBAL_CONFIG.randomlinks && randomLinksList()
    PAGE_CONFIG.comment && initComment()
    PAGE_CONFIG.toc && toc.init();
    (PAGE_CONFIG.is_post || PAGE_CONFIG.is_page) && ((GLOBAL_CONFIG.hightlight.enable && hightlight.init()) || tabs.init())
    PAGE_CONFIG.is_home && showTodayCard()
    GLOBAL_CONFIG.covercolor.enable && coverColor()
    sco.initConsoleState()
    GLOBAL_CONFIG.comment.commentBarrage && PAGE_CONFIG.comment && initializeCommentBarrage()
    document.body.setAttribute('data-type', PAGE_CONFIG.page)
    PAGE_CONFIG.page === "music" && scoMusic.init()
    GLOBAL_CONFIG.music.enable && !document.querySelector('#Music-page') && document.removeEventListener('keydown', scoMusic.setKeydown)
    GLOBAL_CONFIG.ai.enable && PAGE_CONFIG.page === "post" && ScoAI.init()
}

document.addEventListener('DOMContentLoaded', function () {
    window.refreshFn()
})

window.onkeydown = function (e) {
    (123 === e.keyCode || (17 === e.ctrlKey && 16 === e.shiftKey && 67 === e.keyCode)) && utils.snackbarShow("开发者模式已打开，请遵循GPL协议", !1, 3e3);
    (27 === e.keyCode) && sco.hideConsole();
}