const adjustMenu = (change = false) => {
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
    else t = blogNameWidth + menusWidth + searchWidth > $nav.offsetWidth - 120

    if (t) {
        $nav.classList.add('hide-menu')
    } else {
        $nav.classList.remove('hide-menu')
    }
}

// 初始化header
const initAdjust = () => {
    adjustMenu()
    document.getElementById('nav').classList.add('show')
}

/**
 * side menu
 */
const sidebarFn = () => {
    const $toggleMenu = document.getElementById('toggle-menu')
    const $mobileSidebarMenus = document.getElementById('sidebar-menus')
    const $menuMask = document.getElementById('menu-mask')
    const $body = document.body

    const isOpen = () => $mobileSidebarMenus.classList.contains('open')

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

    $menuMask.addEventListener('click', () => {
        if (isOpen()) {
            closeMobileSidebar()
        }
    })

    window.addEventListener('resize', () => {
        if (utils.isHidden($toggleMenu) && isOpen()) {
            closeMobileSidebar()
        }
    })
}

/**
 * 滚动处理
 */
const scrollFn = function () {
    const innerHeight = window.innerHeight;
    const $header = document.getElementById('page-header');
    if (!$header || document.body.scrollHeight <= innerHeight) return;

    let initTop = 0;
    window.addEventListener('scroll', utils.throttle(function (e) {
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        const isDown = scrollDirection(currentTop);

        if (currentTop > 0) {
            $header.classList.add('nav-fixed');
            if (isDown) {
                if ($header.classList.contains('nav-visible')) $header.classList.remove('nav-visible');
            } else {
                if (!$header.classList.contains('nav-visible')) $header.classList.add('nav-visible');
            }
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

/**
 * 滑动导航栏数字变化
 */
const percent = () => {
    let scrollTop = document.documentElement.scrollTop || window.pageYOffset
    let totalHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight
    let scrollPercent = Math.round(scrollTop / totalHeight * 100)
    let percentElement = document.querySelector("#percent")
    let viewportBottom = window.scrollY + document.documentElement.clientHeight
    let remainingScroll = totalHeight - scrollTop

    if ((document.getElementById("post-comment") || document.getElementById("footer")).offsetTop < viewportBottom || scrollPercent > 90) {
        document.querySelector("#nav-totop").classList.add("long")
        percentElement.innerHTML = "返回顶部"
    } else {
        document.querySelector("#nav-totop").classList.remove("long")
        if (scrollPercent >= 0) {
            percentElement.innerHTML = scrollPercent
        }
    }

    let elementsToHide = document.querySelectorAll(".needEndHide")
    if (remainingScroll < 100) {
        elementsToHide.forEach(function (element) {
            element.classList.add("hide")
        })
    } else {
        elementsToHide.forEach(function (element) {
            element.classList.remove("hide")
        })
    }

    window.onscroll = percent
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

/**
 * 修改时间格式
 */
const changeTimeFormat = () => {
    const timeElements = document.getElementsByTagName("time"), lang = GLOBAL_CONFIG.lang.time
    for (let i = 0; i < timeElements.length; i++) {
        const datetime = timeElements[i].getAttribute("datetime"), timeObj = new Date(datetime),
            daysDiff = utils.timeDiff(timeObj, new Date())
        let timeString;
        if (daysDiff === 0) {
            timeString = lang.recent;
        } else if (daysDiff === 1) {
            timeString = lang.yesterday;
        } else if (daysDiff === 2) {
            timeString = lang.berforeyesterday;
        } else if (daysDiff <= 7) {
            timeString = daysDiff + lang.daybefore;
        } else {
            if (timeObj.getFullYear() !== new Date().getFullYear()) {
                timeString = timeObj.getFullYear() + "/" + (timeObj.getMonth() + 1) + "/" + timeObj.getDate();
            } else {
                timeString = (timeObj.getMonth() + 1) + "/" + timeObj.getDate();
            }
        }
        timeElements[i].textContent = timeString;
    }
}

/*
 * 文章页右下角下一篇
 */
const initObserver = () => {
    let commentElement = document.getElementById("post-comment");
    let paginationElement = document.getElementById("pagination");

    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                paginationElement.classList.add("show-window");
                document.querySelector(".comment-barrage").style.bottom = "-200px";
            } else {
                paginationElement.classList.remove("show-window");
                document.querySelector(".comment-barrage").style.bottom = "0px";
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
        const autoScroll = (el) => {
            const activePosition = el.getBoundingClientRect().top
            const sidebarScrollTop = $tocContent.scrollTop
            if (activePosition > (document.documentElement.clientHeight - 100)) {
                $tocContent.scrollTop = sidebarScrollTop + 150
            }
            if (activePosition < 100) {
                $tocContent.scrollTop = sidebarScrollTop - 150
            }
        }
        const findHeadPosition = (top) => {
            if (top === 0) {
                return false
            }
            let currentIndex = ''
            list.forEach((ele, index) => {
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
                activeitem.classList.add('active')
                autoScroll(activeitem)
                let parent = activeitem.parentNode
                while (!parent.matches('.toc')) {
                    if (parent.matches('li')) parent.classList.add('active')
                    parent = parent.parentNode
                }
            }
        }
        window.tocScrollFn = utils.throttle(() => {
            const currentTop = window.scrollY || document.documentElement.scrollTop
            findHeadPosition(currentTop)
        }, 100)
        window.addEventListener('scroll', tocScrollFn)
    }
}

let lastSayHello = "";
let wleelw_musicPlaying = false

let sco = {
    /**
     * 个性定位
     */
    card_welcome: function () {
        ipLoacation = window.saveToLocal.get('ipLocation');
        if (!ipLoacation) {
            // 数据已过期或不存在
            let script = document.createElement('script');
            let url = `https://apis.map.qq.com/ws/location/v1/ip?key=${txkey}&output=jsonp`;
            script.src = url;
            window.QQmap = function (data) {
                ipLoacation = data;
                // 将数据保存到 localStorage，过期时间设置为 1 天
                window.saveToLocal.set('ipLocation', ipLoacation, 1);
                document.body.removeChild(script);
                delete window.QQmap;
            };
            document.body.appendChild(script);
        }
        showWelcome();
    },
    /**
     * 那年今日
     */
    card_history: function () {
        if (document.getElementById('history-container')) {
            async function fetchHistoryData() {
                let myDate = new Date();
                let myMonth = myDate.getMonth() + 1;
                let getDate = myDate.getDate();
                let getMonth = myMonth < 10 ? "0" + myMonth : "" + myMonth;
                let getDay = getDate < 10 ? "0" + getDate : "" + getDate;
                let getMonthDate = "S" + getMonth + getDay;
                let history_data_url = `https://cdn.meuicat.com/gh/Zfour/Butterfly-card-history@2.08/${getMonth}.json`;

                let response = await fetch(history_data_url);
                let data = await response.json();
                return data[getMonthDate];
            }

            function append(parent, text) {
                let temp = document.createElement('div');
                temp.innerHTML = text;
                let frag = document.createDocumentFragment();
                while (temp.firstChild) {
                    frag.appendChild(temp.firstChild);
                }
                parent.appendChild(frag);
            }

            fetchHistoryData().then(data => {
                let html_item = data.map(item => `
            <div class="swiper-slide history_slide">
                <span class="history_slide_time">A.D.${item.year}</span>
                <span class="history_slide_link">${item.title}</span>
            </div>
        `).join('');
                let history_container_wrapper = document.getElementById('history_container_wrapper');
                append(history_container_wrapper, html_item);
                let swiper_history = new Swiper('.history_swiper-container', {
                    passiveListeners: true,
                    spaceBetween: 30,
                    effect: 'coverflow',
                    coverflowEffect: {
                        rotate: 30,
                        slideShadows: false,
                    },
                    loop: true,
                    direction: 'vertical',
                    autoplay: {
                        disableOnInteraction: true,
                        delay: 5000
                    },
                    mousewheel: false,
                });
                let history_container = document.getElementById('history-container');
                history_container.onmouseenter = function () {
                    swiper_history.autoplay.stop();
                };
                history_container.onmouseleave = function () {
                    swiper_history.autoplay.start();
                }
            });
        }
    },
    /**
     * 隐藏协议小助手
     */
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
    /**
     * 平滑滚动处理
     * @param elementId
     */
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
    /**
     * 控制台热评隐藏显示切换
     */
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
    /**
     * 控制台侧边栏隐藏显示切换
     */
    switchHideAside: function () {
        const htmlClassList = document.documentElement.classList;
        htmlClassList.contains("hide-aside") ? saveToLocal.set("aside-status", "show", 1) : saveToLocal.set("aside-status", "hide", 1)
        htmlClassList.toggle("hide-aside");
        htmlClassList.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.add("on") : document.querySelector("#consoleHideAside").classList.remove("on");
    },
    initConsoleState: function () {
        document.documentElement.classList.contains("hide-aside") ? document.querySelector("#consoleHideAside").classList.add("on") : document.querySelector("#consoleHideAside").classList.remove("on")
    },
    /**
     * 个人信息顶部
     */
    changeSayHelloText: function () {
        const greetings = ["🤖️ 数码科技爱好者", "🔍 分享与热心帮助", "🏠 智能家居小能手", "🔨 设计开发一条龙", "🤝 专修交互与设计", "🏃 脚踏实地行动派", "🧱 团队小组发动机", "💢 壮汉人狠话不多"];
        const greetingElement = document.getElementById("author-info__sayhi");
        let randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        while (randomGreeting === lastSayHello) {
            randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        }
        greetingElement.textContent = randomGreeting;
        lastSayHello = randomGreeting;
    },
    /**
     * 昼夜切换
     */
    switchDarkMode: function () {
        let nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' :
            'light'
        if (nowMode === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark')
            saveToLocal.set('theme', 'dark', 0.04);
            utils.snackbarShow(GLOBAL_CONFIG.lang.theme.dark, false, 2000)
            document.querySelector(".menu-darkmode-text").textContent = "深色模式";
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
            saveToLocal.set('theme', 'light', 0.04);
            utils.snackbarShow(GLOBAL_CONFIG.lang.theme.light, false, 2000)
            document.querySelector(".menu-darkmode-text").textContent = "浅色模式";
        }
    },
    hideTodayCard: function () {
        document.getElementById('todayCard').classList.add('hide')
    },
    /**
     * 返回顶部
     */
    toTop: function () {
        utils.scrollToDest(0)
    },
    /**
     * 显示控制台
     */
    showConsole: function () {
        let el = document.getElementById('console')
        if (!el.classList.contains('show')) {
            el.classList.add('show')
        }
    },
    /**
     * 隐藏控制台
     */
    hideConsole: function () {
        const el = document.getElementById('console')
        if (el.classList.contains('show')) {
            el.classList.remove('show')
        }
    },
    /**
     * 灯箱使用
     */
    lightbox: function () {
        window.ViewImage && window.ViewImage.init("#article-container img:not(.flink-avatar), .bber-content-img img, #album_detail img, #equipment img, #twikoo .tk-content img:not(.tk-owo-emotion)");
    },
    /**
     * 初始化
     */
    initTheme: function () {
        let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        try {
            const cachedMode = saveToLocal.get('theme');
            if (cachedMode === undefined) {
                const nowMode =
                    isDarkMode ? 'dark' : 'light'
                document.documentElement.setAttribute('data-theme', nowMode);
                saveToLocal.set('theme', nowMode, 0.5);
            } else {
                document.documentElement.setAttribute('data-theme', cachedMode);
            }
        } catch (e) {
            if (isDarkMode) {
                saveToLocal.set('theme', 'dark', 0.5)
            } else {
                saveToLocal.set('theme', 'light', 0.5)
            }
        }
    },
    /**
     *
     */
    reflashEssayWaterFall: function () {
        if (document.getElementById('waterfall')) {
            setTimeout(function () {
                waterfall('#waterfall');
                document.getElementById("waterfall").classList.add('show');
            }, 500);
        }
    },
    /**
     * 更新站点运行时间
     */
    addRuntime: function () {
        let el = document.getElementById('runtimeshow')
        if (el && GLOBAL_CONFIG.runtime) {
            el.innerText = utils.timeDiff(new Date(GLOBAL_CONFIG.runtime), new Date()) + GLOBAL_CONFIG.lang.time.runtime
        }
    },
    /**
     * 懒加载图片
     */
    lazyloadImg: function () {
        window.lazyLoadInstance = new LazyLoad({
            elements_selector: 'img',
            threshold: 0,
            data_src: 'lazy-src',
            callback_error: (img) => {
                img.setAttribute("src", GLOBAL_CONFIG.lazyload.error);
            }
        })
    },
    /**
     * 跳转到输评论
     * @param txt
     */
    toTalk: function (txt) {
        const input = document.querySelector('.el-textarea__inner');
        const evt = new Event('input', {bubbles: true, cancelable: true});
        const inputValue = txt.replace(/\n/g, '\n> ');
        input.value = '> ' + inputValue + '\n\n';
        input.dispatchEvent(evt);
        utils.scrollToDest(utils.getEleTop(document.getElementById('post-comment')), 300)
        input.focus();
        input.setSelectionRange(-1, -1);
        const commentTips = document.querySelector("#comment-tips");
        if (commentTips) {
            commentTips.classList.add("show");
        }
    },
    /**
     * 初始化即刻mini
     */
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
    /**
     * 图片添加水印
     */
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
    /**
     * 下载图片并添加水印
     */
    downloadImage: async function (url, filename) {
        rm.hideRightMenu();
        if (rm.downloadimging) {
            utils.snackbarShow("有正在进行中的下载，请稍后再试");
            return;
        }
        try {
            rm.downloadimging = true;
            utils.snackbarShow("正在下载中，请稍后", false, 10000);
            await new Promise(resolve => setTimeout(resolve, 10000));
            const img = new Image();
            img.setAttribute("crossOrigin", "anonymous");
            img.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                ctx.font = "30px Arial";
                ctx.fillText(window.location.href, 10, img.height - 10);
                const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                const event = new MouseEvent("click");
                link.download = filename || "photo";
                link.href = dataUrl;
                link.dispatchEvent(event);
                utils.snackbarShow("图片已添加盲水印，请遵守版权协议");
                rm.downloadimging = false;
            };
            img.src = url;
        } catch (error) {
            console.error(error);
            utils.snackbarShow("下载图片时出错");
            rm.downloadimging = false;
        }
    },
    /**
     * 音乐播放暂停
     */
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
    /**
     * 音乐上一首
     */
    musicSkipBack: function () {
        document.querySelector('meting-js').aplayer.skipBack()
        rm.hideRightMenu()
    },
    /**
     * 音乐下一首
     */
    musicSkipForward: function () {
        document.querySelector('meting-js').aplayer.skipForward()
        rm.hideRightMenu()
    },
    /**
     * 获取歌曲名称
     */
    musicGetName: function () {
        const titles = Array.from(document.querySelectorAll('.aplayer-title')).map(e => e.innerText);
        return titles[0];
    },
    /**
     * 跳转到评论
     */
    scrollToComment: function () {
        utils.scrollToDest(utils.getEleTop(document.getElementById('post-comment')), 300)
    },
    /**
     * 一些日子灰色页面
     */
    setFest: function () {
        const date = new Date();
        const currentDate = `${date.getMonth() + 1}.${date.getDate()}`;

        const specialDates = ['1.8', '9.9', '7.7', '9.18', '12.13'];

        if (specialDates.includes(currentDate)) {
            const css = `
        html {
            filter: grayscale(100%);
        }
        `;

            const styleElement = document.createElement('style');
            styleElement.textContent = css;
            document.head.appendChild(styleElement);
        }
    },
    /**
     * 个人信息顶部文字更新
     */
    setTimeState: function () {
        const el = document.getElementById('author-info__sayhi');
        if (el) {
            const timeNow = new Date();
            const hours = timeNow.getHours();
            const lang = GLOBAL_CONFIG.lang.sayhello;
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
    /**
     * tagPageActive
     */
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
    /**
     * categoryBarActive
     */
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
    /**
     * categoryBarRightButton
     */
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
    /**
     * 打开侧边栏标签隐藏
     */
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
    /**
     * 监听底部分页输入框
     */
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
                heo.toPage();
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
    /**
     * 初始化Nav背景
     */
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
    }
}

/*
 * 代码高亮显示
 */
class hightlight {
    static createEle(langEl, item) {
        const fragment = document.createDocumentFragment();
        const highlightCopyEle = '<i class="scoicon sco-copy-fill"></i>';
        const highlightExpandEle = '<i class="scoicon sco-arrow-down expand" style="font-size: 16px"></i>';

        const hlTools = document.createElement('div');
        hlTools.className = 'highlight-tools';
        hlTools.innerHTML = `${highlightExpandEle}${langEl}${highlightCopyEle}`;

        const itemHeight = item.clientHeight;
        const $table = item.querySelector('table');
        const $expand = item.getElementsByClassName('code-expand-btn');

        let expand = true;
        hlTools.children[0].addEventListener('click', () => {
            expand = !expand;
            hlTools.children[0].classList.toggle('closed');
            $table.style.display = expand ? 'none' : 'block';
            if ($expand.length !== 0) {
                $expand[0].style.display = expand ? 'none' : 'block';
            }
            if (!expand) {
                $table.style.height = itemHeight < 200 ? 'auto' : '200px';
                if (itemHeight >= 200) {
                    item.classList.remove("expand-done");
                }
            }
        });

        hlTools.children[2].addEventListener('click', () => {
            utils.copy($table.querySelector('.code').innerText);
        });

        fragment.appendChild(hlTools);

        if (GLOBAL_CONFIG.hightlight.limit && itemHeight > GLOBAL_CONFIG.hightlight.limit + 30) {
            $table.style.height = `${GLOBAL_CONFIG.hightlight.limit}px`;
            const ele = document.createElement('div');
            ele.className = 'code-expand-btn';
            ele.innerHTML = '<i class="scoicon sco-show-line" style="font-size: 1.2rem"></i>';
            ele.addEventListener('click', (e) => {
                $table.style.height = `${itemHeight}px`;
                const target = e.target.className !== 'code-expand-btn' ? e.target.parentNode : e.target;
                target.classList.add('expand-done');
            });
            fragment.appendChild(ele);
        }
        item.insertBefore(fragment, item.firstChild);
    }

    static init() {
        const $figureHighlight = document.querySelectorAll('figure.highlight');
        $figureHighlight.forEach(item => {
            let langName = item.classList[1] || 'Code';
            if (langName === 'plaintext') langName = 'Code';
            const highlightLangEle = `<div class="code-lang">${langName.toUpperCase()}</div>`;
            this.createEle(highlightLangEle, item);
        });
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
    if (PAGE_CONFIG.page === "404") return;
    initAdjust()
    scrollFn()
    sidebarFn()
    changeTimeFormat()
    initObserver()
    sco.addRuntime()
    sco.hideCookie()
    sco.addPhotoFigcaption()
    sco.setFest()
    sco.setTimeState()
    sco.tagPageActive()
    sco.categoriesBarActive()
    sco.listenToPageInputPress()
    sco.addNavBackgroundInit()
    GLOBAL_CONFIG.rightside.enable && addRightMenuClickEvent()
    GLOBAL_CONFIG.lazyload.enable && sco.lazyloadImg()
    GLOBAL_CONFIG.lightbox && sco.lightbox('')
    GLOBAL_CONFIG.randomlinks && randomLinksList()
    GLOBAL_CONFIG.comment.enable && newestCommentInit()
    if (PAGE_CONFIG.comment) {
        initComment()
    }
    PAGE_CONFIG.toc && toc.init()
    if (PAGE_CONFIG.is_post || PAGE_CONFIG.is_page) {
        GLOBAL_CONFIG.hightlight.enable && hightlight.init()
        tabs.init()
    }
    if (PAGE_CONFIG.is_home) {
        showTodayCard()
        sco.initbbtalk()
    }
    GLOBAL_CONFIG.covercolor && coverColor();
    sco.initConsoleState()
    if (document.getElementById('history-baidu')) sco.card_history() // 那年今日
    if (document.getElementById('welcome-info')) sco.card_welcome() // 个性定位
    if (GLOBAL_CONFIG.comment.type === "twikoo" && PAGE_CONFIG.comment) initializeCommentBarrage() // 热评
}

sco.initTheme()

document.addEventListener('DOMContentLoaded', function () {
    window.refreshFn()
})

document.addEventListener('pjax:complete', () => {
    window.refreshFn()
})

window.onkeydown = function (e) {
    123 === e.keyCode && utils.snackbarShow("开发者模式已打开，请遵循GPL协议", !1, 3e3)
};