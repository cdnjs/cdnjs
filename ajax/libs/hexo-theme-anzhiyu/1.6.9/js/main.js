// 第一次播放音乐
var anzhiyu_musicFirst = false;
// 快捷键
var anzhiyu_keyboard = null;
// 音乐播放状态
var anzhiyu_musicPlaying = false;
var $bodyWrap = document.getElementById("body-wrap");
var anzhiyu_intype = false;
var anzhiyu_keyUpEvent_timeoutId = null;
var anzhiyu_keyUpShiftDelayEvent_timeoutId = null;

var popupWindowTimer = null;

var adjectives = [
  "美丽的",
  "英俊的",
  "聪明的",
  "勇敢的",
  "可爱的",
  "慷慨的",
  "善良的",
  "可靠的",
  "开朗的",
  "成熟的",
  "稳重的",
  "真诚的",
  "幽默的",
  "豁达的",
  "有趣的",
  "活泼的",
  "优雅的",
  "敏捷的",
  "温柔的",
  "温暖的",
  "敬业的",
  "细心的",
  "耐心的",
  "深沉的",
  "朴素的",
  "含蓄的",
  "率直的",
  "开放的",
  "务实的",
  "坚强的",
  "自信的",
  "谦虚的",
  "文静的",
  "深刻的",
  "纯真的",
  "朝气蓬勃的",
  "慎重的",
  "大方的",
  "顽强的",
  "迷人的",
  "机智的",
  "善解人意的",
  "富有想象力的",
  "有魅力的",
  "独立的",
  "好奇的",
  "干净的",
  "宽容的",
  "尊重他人的",
  "体贴的",
  "守信的",
  "有耐性的",
  "有责任心的",
  "有担当的",
  "有远见的",
  "有智慧的",
  "有眼光的",
  "有冒险精神的",
  "有爱心的",
  "有同情心的",
  "喜欢思考的",
  "喜欢学习的",
  "具有批判性思维的",
  "善于表达的",
  "善于沟通的",
  "善于合作的",
  "善于领导的",
  "有激情的",
  "有幽默感的",
  "有思想的",
  "有个性的",
  "有正义感的",
  "有责任感的",
  "有创造力的",
  "有想象力的",
  "有艺术细胞的",
  "有团队精神的",
  "有协调能力的",
  "有决策能力的",
  "有组织能力的",
  "有学习能力的",
  "有执行能力的",
  "有分析能力的",
  "有逻辑思维的",
  "有创新能力的",
  "有专业素养的",
  "有商业头脑的",
];
var vegetablesAndFruits = [
  "萝卜",
  "白菜",
  "芹菜",
  "生菜",
  "青椒",
  "辣椒",
  "茄子",
  "豆角",
  "黄瓜",
  "西红柿",
  "洋葱",
  "大蒜",
  "土豆",
  "南瓜",
  "豆腐",
  "韭菜",
  "花菜",
  "西兰花",
  "蘑菇",
  "金针菇",
  "苹果",
  "香蕉",
  "橙子",
  "柠檬",
  "猕猴桃",
  "草莓",
  "葡萄",
  "桃子",
  "杏子",
  "李子",
  "石榴",
  "西瓜",
  "哈密瓜",
  "蜜瓜",
  "樱桃",
  "蓝莓",
  "柿子",
  "橄榄",
  "柚子",
  "火龙果",
];

// 已随机的歌曲
var selectRandomSong = [];
// 音乐默认声音大小
var musicVolume = 0.8;
// 是否切换了周杰伦音乐列表
var changeMusicListFlag = false;
// 当前默认播放列表
var defaultPlayMusicList = [];
var themeColorMeta, pageHeaderEl, navMusicEl, consoleEl;

document.addEventListener("DOMContentLoaded", function () {
  let headerContentWidth, $nav, $rightMenu;
  let mobileSidebarOpen = false;

  const adjustMenu = init => {
    const getAllWidth = ele => {
      return Array.from(ele).reduce((width, i) => width + i.offsetWidth, 0);
    };

    if (init) {
      const blogInfoWidth = getAllWidth(document.querySelector("#blog_name > a").children);
      const menusWidth = getAllWidth(document.getElementById("menus").children);
      headerContentWidth = blogInfoWidth + menusWidth;
      $nav = document.getElementById("nav");
    }

    const hideMenuIndex = window.innerWidth <= 768 || headerContentWidth > $nav.offsetWidth - 120;
    $nav.classList.toggle("hide-menu", hideMenuIndex);
  };

  // 初始化header
  const initAdjust = () => {
    adjustMenu(true);
    $nav.classList.add("show");
  };

  // sidebar menus
  const sidebarFn = {
    open: () => {
      anzhiyu.sidebarPaddingR();
      anzhiyu.animateIn(document.getElementById("menu-mask"), "to_show 0.5s");
      document.getElementById("sidebar-menus").classList.add("open");
      mobileSidebarOpen = true;
    },
    close: () => {
      const $body = document.body;
      $body.style.paddingRight = "";
      anzhiyu.animateOut(document.getElementById("menu-mask"), "to_hide 0.5s");
      document.getElementById("sidebar-menus").classList.remove("open");
      mobileSidebarOpen = false;
    },
  };

  /**
   * 首頁top_img底下的箭頭
   */
  const scrollDownInIndex = () => {
    const handleScrollToDest = () => {
      const bbTimeList = document.getElementById("bbTimeList");
      if (bbTimeList) {
        anzhiyu.scrollToDest(bbTimeList.offsetTop - 62, 300);
      } else {
        anzhiyu.scrollToDest(document.getElementById("home_top").offsetTop - 60, 300);
      }
    };

    const $scrollDownEle = document.getElementById("scroll-down");
    $scrollDownEle && anzhiyu.addEventListenerPjax($scrollDownEle, "click", handleScrollToDest);
  };

  /**
   * 代码
   * 只适用于Hexo默认的代码渲染
   */
  const addHighlightTool = function () {
    const highLight = GLOBAL_CONFIG.highlight;
    if (!highLight) return;

    const isHighlightCopy = highLight.highlightCopy;
    const isHighlightLang = highLight.highlightLang;
    const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink;
    const highlightHeightLimit = highLight.highlightHeightLimit;
    const isShowTool = isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined;
    const $figureHighlight =
      highLight.plugin === "highlighjs"
        ? document.querySelectorAll("figure.highlight")
        : document.querySelectorAll('pre[class*="language-"]');

    if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length)) return;

    const isPrismjs = highLight.plugin === "prismjs";

    let highlightShrinkEle = "";
    let highlightCopyEle = "";
    const highlightShrinkClass = isHighlightShrink === true ? "closed" : "";

    if (isHighlightShrink !== undefined) {
      highlightShrinkEle = `<i class="anzhiyufont anzhiyu-icon-angle-down expand ${highlightShrinkClass}"></i>`;
    }

    if (isHighlightCopy) {
      highlightCopyEle = '<div class="copy-notice"></div><i class="anzhiyufont anzhiyu-icon-paste copy-button"></i>';
    }

    const copy = (text, ctx) => {
      if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        document.execCommand("copy");
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          anzhiyu.snackbarShow(GLOBAL_CONFIG.copy.success);
        } else {
          const prevEle = ctx.previousElementSibling;
          prevEle.innerText = GLOBAL_CONFIG.copy.success;
          prevEle.style.opacity = 1;
          setTimeout(() => {
            prevEle.style.opacity = 0;
          }, 700);
        }
      } else {
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          anzhiyu.snackbarShow(GLOBAL_CONFIG.copy.noSupport);
        } else {
          ctx.previousElementSibling.innerText = GLOBAL_CONFIG.copy.noSupport;
        }
      }
    };

    // click events
    const highlightCopyFn = ele => {
      const $buttonParent = ele.parentNode;
      $buttonParent.classList.add("copy-true");
      const selection = window.getSelection();
      const range = document.createRange();
      if (isPrismjs) range.selectNodeContents($buttonParent.querySelectorAll("pre code")[0]);
      else range.selectNodeContents($buttonParent.querySelectorAll("table .code pre")[0]);
      selection.removeAllRanges();
      selection.addRange(range);
      const text = selection.toString();
      copy(text, ele.lastChild);
      selection.removeAllRanges();
      $buttonParent.classList.remove("copy-true");
    };

    const highlightShrinkFn = ele => {
      const $nextEle = [...ele.parentNode.children].slice(1);
      ele.firstChild.classList.toggle("closed");
      if (anzhiyu.isHidden($nextEle[$nextEle.length - 1])) {
        $nextEle.forEach(e => {
          e.style.display = "block";
        });
      } else {
        $nextEle.forEach(e => {
          e.style.display = "none";
        });
      }
    };

    const highlightToolsFn = function (e) {
      const $target = e.target.classList;
      if ($target.contains("expand")) highlightShrinkFn(this);
      else if ($target.contains("copy-button")) highlightCopyFn(this);
    };

    const expandCode = function () {
      this.classList.toggle("expand-done");
    };

    const createEle = (lang, item, service) => {
      const fragment = document.createDocumentFragment();

      if (isShowTool) {
        const hlTools = document.createElement("div");
        hlTools.className = `highlight-tools ${highlightShrinkClass}`;
        hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle;
        anzhiyu.addEventListenerPjax(hlTools, "click", highlightToolsFn);
        fragment.appendChild(hlTools);
      }

      if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
        const ele = document.createElement("div");
        ele.className = "code-expand-btn";
        ele.innerHTML = '<i class="anzhiyufont anzhiyu-icon-angle-double-down"></i>';
        anzhiyu.addEventListenerPjax(ele, "click", expandCode);
        fragment.appendChild(ele);
      }

      if (service === "hl") {
        item.insertBefore(fragment, item.firstChild);
      } else {
        item.parentNode.insertBefore(fragment, item);
      }
    };

    if (isHighlightLang) {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          const langName = item.getAttribute("data-language") ? item.getAttribute("data-language") : "Code";
          const highlightLangEle = `<div class="code-lang">${langName}</div>`;
          anzhiyu.wrap(item, "figure", { class: "highlight" });
          createEle(highlightLangEle, item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          let langName = item.getAttribute("class").split(" ")[1];
          if (langName === "plain" || langName === undefined || langName === "plaintext") langName = "Code";
          const highlightLangEle = `<div class="code-lang">${langName}</div>`;
          createEle(highlightLangEle, item, "hl");
        });
      }
    } else {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          anzhiyu.wrap(item, "figure", { class: "highlight" });
          createEle("", item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          createEle("", item, "hl");
        });
      }
    }
  };

  /**
   * PhotoFigcaption
   */
  function addPhotoFigcaption() {
    document.querySelectorAll("#article-container img").forEach(function (item) {
      const parentEle = item.parentNode;
      const altValue = item.title || item.alt;
      if (altValue && !parentEle.parentNode.classList.contains("justified-gallery")) {
        const ele = document.createElement("div");
        ele.className = "img-alt is-center";
        ele.textContent = altValue;
        parentEle.insertBefore(ele, item.nextSibling);
      }
    });
  }

  /**
   * Lightbox
   */
  const runLightbox = () => {
    anzhiyu.loadLightbox(document.querySelectorAll("#article-container img:not(.no-lightbox)"));
  };

  /**
   * justified-gallery 圖庫排版
   */
  const runJustifiedGallery = function (ele) {
    const htmlStr = arr => {
      let str = "";
      const replaceDq = str => str.replace(/"/g, "&quot;"); // replace double quotes to &quot;
      arr.forEach(i => {
        const alt = i.alt ? `alt="${replaceDq(i.alt)}"` : "";
        const title = i.title ? `title="${replaceDq(i.title)}"` : "";
        const address = i.address ? i.address : "";
        const galleryItem = `
        <div class="fj-gallery-item">
          ${address ? `<div class="tag-address">${address}</div>` : ""}
          <img src="${i.url}" ${alt + title}>
        </div>
      `;
        str += galleryItem;
      });

      return str;
    };

    const lazyloadFn = (i, arr, limit) => {
      const loadItem = Number(limit);
      const arrLength = arr.length;
      if (arrLength > loadItem) i.insertAdjacentHTML("beforeend", htmlStr(arr.splice(0, loadItem)));
      else {
        i.insertAdjacentHTML("beforeend", htmlStr(arr));
        i.classList.remove("lazyload");
      }
      window.lazyLoadInstance && window.lazyLoadInstance.update();
      return arrLength > loadItem ? loadItem : arrLength;
    };

    const fetchUrl = async url => {
      const response = await fetch(url);
      return await response.json();
    };

    const runJustifiedGallery = (item, arr) => {
      const limit = item.getAttribute("data-limit") ?? arr.length;
      if (!item.classList.contains("lazyload") || arr.length < limit) {
        // 不懒加载
        item.innerHTML = htmlStr(arr);
        item.nextElementSibling.style.display = "none";
      } else {
        if (!item.classList.contains("btn_album_detail_lazyload") || item.classList.contains("page_img_lazyload")) {
          // 滚动懒加载
          lazyloadFn(item, arr, limit);
          const clickBtnFn = () => {
            const lastItemLength = lazyloadFn(item, arr, limit);
            fjGallery(
              item,
              "appendImages",
              item.querySelectorAll(`.fj-gallery-item:nth-last-child(-n+${lastItemLength})`)
            );
            anzhiyu.loadLightbox(item.querySelectorAll("img"));
            if (lastItemLength < Number(limit)) {
              observer.unobserve(item.nextElementSibling);
            }
          };

          // 创建IntersectionObserver实例
          const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              // 如果元素进入视口
              if (entry.isIntersecting) {
                // 执行clickBtnFn函数
                setTimeout(clickBtnFn(), 100);
              }
            });
          });
          observer.observe(item.nextElementSibling);
        } else {
          // 相册详情 按钮懒加载
          lazyloadFn(item, arr, limit);
          const clickBtnFn = () => {
            const lastItemLength = lazyloadFn(item, arr, limit);
            fjGallery(
              item,
              "appendImages",
              item.querySelectorAll(`.fj-gallery-item:nth-last-child(-n+${lastItemLength})`)
            );
            anzhiyu.loadLightbox(item.querySelectorAll("img"));
            lastItemLength < limit && item.nextElementSibling.removeEventListener("click", clickBtnFn);
          };
          item.nextElementSibling.addEventListener("click", clickBtnFn);
        }
      }

      anzhiyu.initJustifiedGallery(item);
      anzhiyu.loadLightbox(item.querySelectorAll("img"));
      window.lazyLoadInstance && window.lazyLoadInstance.update();
    };

    const addJustifiedGallery = () => {
      ele.forEach(item => {
        item.classList.contains("url")
          ? fetchUrl(item.textContent).then(res => {
              runJustifiedGallery(item, res);
            })
          : runJustifiedGallery(item, JSON.parse(item.textContent));
      });
    };

    if (window.fjGallery) {
      addJustifiedGallery();
      return;
    }

    getCSS(`${GLOBAL_CONFIG.source.justifiedGallery.css}`);
    getScript(`${GLOBAL_CONFIG.source.justifiedGallery.js}`).then(addJustifiedGallery);
  };

  /**
   * 滚动处理
   */
  const scrollFn = function () {
    const $rightside = document.getElementById("rightside");
    const innerHeight = window.innerHeight + 56;
    let lastScrollTop = 0;

    if (document.body.scrollHeight <= innerHeight) {
      $rightside.style.cssText = "opacity: 1; transform: translateX(-58px)";
    }

    // find the scroll direction
    function scrollDirection(currentTop) {
      const result = currentTop > initTop; // true is down & false is up
      initTop = currentTop;
      return result;
    }

    let initTop = 0;
    let isChatShow = true;
    const $header = document.getElementById("page-header");
    const $popupWindow = document.getElementById("popup-window");
    const isChatBtnHide = typeof chatBtnHide === "function";
    const isChatBtnShow = typeof chatBtnShow === "function";

    // 第一次滑动到底部的标识符
    let scrollBottomFirstFlag = false;
    // 缓存常用dom元素
    const musicDom = document.getElementById("nav-music"),
      footerDom = document.getElementById("footer"),
      waterfallDom = document.getElementById("waterfall"),
      $percentBtn = document.getElementById("percent"),
      $navTotop = document.getElementById("nav-totop"),
      $bodyWrap = document.getElementById("body-wrap");
    // 页面底部Dom是否存在
    let pageBottomDomFlag = document.getElementById("post-comment") || document.getElementById("footer");

    function percentageScrollFn(currentTop) {
      // 处理滚动百分比
      let docHeight = $bodyWrap.clientHeight;
      const winHeight = document.documentElement.clientHeight;
      const contentMath =
        docHeight > winHeight ? docHeight - winHeight : document.documentElement.scrollHeight - winHeight;
      const scrollPercent = currentTop / contentMath;
      const scrollPercentRounded = Math.round(scrollPercent * 100);
      const percentage = scrollPercentRounded > 100 ? 100 : scrollPercentRounded <= 0 ? 1 : scrollPercentRounded;
      $percentBtn.textContent = percentage;

      function isInViewPortOfOneNoDis(el) {
        if (!el) return;
        const elDisplay = window.getComputedStyle(el).getPropertyValue("display");
        if (elDisplay == "none") {
          return;
        }
        const viewPortHeight =
          window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.documentElement.scrollTop;
        const top = offsetTop - scrollTop;
        return top <= viewPortHeight;
      }

      if (isInViewPortOfOneNoDis(pageBottomDomFlag || percentage > 90) && currentTop > 20) {
        $navTotop.classList.add("long");
        $percentBtn.textContent = "返回顶部";
      } else {
        $navTotop.classList.remove("long");
        $percentBtn.textContent = percentage;
      }

      // 如果当前页面需要瀑布流，就处理瀑布流
      if (waterfallDom) {
        const waterfallResult = currentTop % document.documentElement.clientHeight; // 卷去一个视口
        if (!scrollBottomFirstFlag && waterfallResult + 100 >= document.documentElement.clientHeight) {
          console.info(waterfallResult, document.documentElement.clientHeight);
          setTimeout(() => {
            waterfall("#waterfall");
          }, 500);
        } else {
          setTimeout(() => {
            waterfallDom && waterfall("#waterfall");
          }, 500);
        }
      }
    }

    const scrollTask = anzhiyu.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      const isDown = scrollDirection(currentTop);

      const delta = Math.abs(lastScrollTop - currentTop);
      if (currentTop > 60 && delta < 20 && delta != 0) {
        // ignore small scrolls
        return;
      }
      if (
        $popupWindow &&
        $popupWindow.classList.contains("show-popup-window") &&
        currentTop > 60 &&
        delta > 20 &&
        lastScrollTop != 0
      ) {
        // 滚动后延迟1s关闭弹窗
        anzhiyu.throttle(() => {
          if (popupWindowTimer) clearTimeout(popupWindowTimer);
          popupWindowTimer = setTimeout(() => {
            if (!$popupWindow.classList.contains("popup-hide")) {
              $popupWindow.classList.add("popup-hide");
            }
            setTimeout(() => {
              $popupWindow.classList.remove("popup-hide");
              $popupWindow.classList.remove("show-popup-window");
            }, 1000);
          }, 1000);
        }, 1000)();
      }
      lastScrollTop = currentTop;

      if (currentTop > 26) {
        if (isDown) {
          if ($header.classList.contains("nav-visible")) $header.classList.remove("nav-visible");
          if (isChatBtnShow && isChatShow === true) {
            chatBtnHide();
            isChatShow = false;
          }
        } else {
          if (!$header.classList.contains("nav-visible")) $header.classList.add("nav-visible");
          if (isChatBtnHide && isChatShow === false) {
            chatBtnShow();
            isChatShow = true;
          }
        }
        requestAnimationFrame(() => {
          anzhiyu.initThemeColor();
          $header.classList.add("nav-fixed");
        });
        if (window.getComputedStyle($rightside).getPropertyValue("opacity") === "0") {
          $rightside.style.cssText = "opacity: 0.8; transform: translateX(-58px)";
        }
      } else {
        if (currentTop <= 5) {
          requestAnimationFrame(() => {
            $header.classList.remove("nav-fixed");
            $header.classList.remove("nav-visible");
            // 修改顶栏颜色
            anzhiyu.initThemeColor();
          });
        }
        $rightside.style.cssText = "opacity: ''; transform: ''";
      }

      if (document.body.scrollHeight <= innerHeight) {
        $rightside.style.cssText = "opacity: 0.8; transform: translateX(-58px)";
      }

      percentageScrollFn(currentTop);
    }, 96);

    // 进入footer隐藏音乐
    if (footerDom) {
      anzhiyu
        .intersectionObserver(
          () => {
            if (footerDom && musicDom && 768 < document.body.clientWidth) {
              musicDom.style.bottom = "-10px";
              musicDom.style.opacity = "0";
            }
            scrollBottomFirstFlag = true;
          },
          () => {
            if (footerDom && musicDom && 768 < document.body.clientWidth) {
              musicDom.style.bottom = "20px";
              musicDom.style.opacity = "1";
            }
          }
        )()
        .observe(footerDom);
    }

    scrollTask();
    anzhiyu.addEventListenerPjax(window, "scroll", scrollTask, { passive: true });
  };

  /**
   * toc,anchor
   */
  const scrollFnToDo = function () {
    const isToc = GLOBAL_CONFIG_SITE.isToc;
    const isAnchor = GLOBAL_CONFIG.isAnchor;
    const $article = document.getElementById("article-container");

    if (!($article && (isToc || isAnchor))) return;

    let $tocLink, $cardToc, autoScrollToc, isExpand;
    if (isToc) {
      const $cardTocLayout = document.getElementById("card-toc");
      $cardToc = $cardTocLayout.querySelector(".toc-content");
      $tocLink = $cardToc.querySelectorAll(".toc-link");
      $tocPercentage = $cardTocLayout.querySelector(".toc-percentage");
      isExpand = $cardToc.classList.contains("is-expand");

      // toc元素點擊
      const tocItemClickFn = e => {
        const target = e.target.closest(".toc-link");
        if (!target) return;

        e.preventDefault();
        anzhiyu.scrollToDest(
          anzhiyu.getEleTop(document.getElementById(decodeURI(target.getAttribute("href")).replace("#", ""))),
          300
        );
        if (window.innerWidth < 900) {
          $cardTocLayout.classList.remove("open");
        }
      };

      anzhiyu.addEventListenerPjax($cardToc, "click", tocItemClickFn);

      autoScrollToc = item => {
        const activePosition = item.getBoundingClientRect().top;
        const sidebarScrollTop = $cardToc.scrollTop;
        if (activePosition > document.documentElement.clientHeight - 100) {
          $cardToc.scrollTop = sidebarScrollTop + 150;
        }
        if (activePosition < 100) {
          $cardToc.scrollTop = sidebarScrollTop - 150;
        }
      };
    }

    // find head position & add active class
    const list = $article.querySelectorAll("h1,h2,h3,h4,h5,h6");
    const filteredHeadings = Array.from(list).filter(heading => heading.id !== "CrawlerTitle");
    let detectItem = "";
    const findHeadPosition = function (top) {
      if (top === 0) {
        return false;
      }

      let currentId = "";
      let currentIndex = "";

      filteredHeadings.forEach(function (ele, index) {
        if (top > anzhiyu.getEleTop(ele) - 80) {
          const id = ele.id;
          currentId = id ? "#" + encodeURI(id) : "";
          currentIndex = index;
        }
      });
      if (detectItem === currentIndex) return;
      if (isAnchor) anzhiyu.updateAnchor(currentId);
      detectItem = currentIndex;
      if (isToc) {
        $cardToc.querySelectorAll(".active").forEach(i => {
          i.classList.remove("active");
        });

        if (currentId === "") {
          return;
        }
        const currentActive = $tocLink[currentIndex];
        currentActive.classList.add("active");

        setTimeout(() => {
          autoScrollToc(currentActive);
        }, 0);

        if (isExpand) return;
        let parent = currentActive.parentNode;

        for (; !parent.matches(".toc"); parent = parent.parentNode) {
          if (parent.matches("li")) parent.classList.add("active");
        }
      }
    };

    // main of scroll
    const tocScrollFn = anzhiyu.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      findHeadPosition(currentTop);
    }, 100);

    anzhiyu.addEventListenerPjax(window, "scroll", tocScrollFn, { passive: true });
  };

  const handleThemeChange = mode => {
    const globalFn = window.globalFn || {};
    const themeChange = globalFn.themeChange || {};
    if (!themeChange) {
      return;
    }

    Object.keys(themeChange).forEach(key => {
      const themeChangeFn = themeChange[key];
      themeChangeFn(mode);
    });

    rm && rm.hideRightMenu();

    const menuDarkmodeText = $rightMenu.querySelector(".menu-darkmode-text");
    if (mode === "light") {
      menuDarkmodeText.textContent = "深色模式";
    } else {
      menuDarkmodeText.textContent = "浅色模式";
    }

    if (!GLOBAL_CONFIG_SITE.isPost) {
      const root = document.querySelector(":root");
      root.style.setProperty("--anzhiyu-bar-background", "var(--anzhiyu-meta-theme-color)");
      requestAnimationFrame(() => {
        anzhiyu.initThemeColor();
      });

      // 要改回来默认主色;
      document.documentElement.style.setProperty(
        "--anzhiyu-main",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-theme")
      );
      document.documentElement.style.setProperty(
        "--anzhiyu-theme-op",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
      );
      document.documentElement.style.setProperty(
        "--anzhiyu-theme-op-deep",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
      );
    }
  };

  /**
   * Rightside
   */
  const rightSideFn = {
    readmode: () => {
      // read mode
      const $body = document.body;
      $body.classList.add("read-mode");
      const newEle = document.createElement("button");
      newEle.type = "button";
      newEle.className = "anzhiyufont anzhiyu-icon-xmark exit-readmode";
      $body.appendChild(newEle);

      const clickFn = () => {
        $body.classList.remove("read-mode");
        newEle.remove();
        newEle.removeEventListener("click", clickFn);
      };

      newEle.addEventListener("click", clickFn);
    },
    darkmode: () => {
      // switch between light and dark mode
      const willChangeMode = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (willChangeMode === "dark") {
        activateDarkMode();
        GLOBAL_CONFIG.Snackbar !== undefined && anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      } else {
        activateLightMode();
        GLOBAL_CONFIG.Snackbar !== undefined && anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      }
      saveToLocal.set("theme", willChangeMode, 2);
      handleThemeChange(willChangeMode);
    },
    "rightside-config": item => {
      // Show or hide rightside-hide-btn
      const hideLayout = item.firstElementChild;
      if (hideLayout.classList.contains("show")) {
        hideLayout.classList.add("status");
        setTimeout(() => {
          hideLayout.classList.remove("status");
        }, 300);
      }

      hideLayout.classList.toggle("show");
    },
    "go-up": () => {
      // Back to top
      anzhiyu.scrollToDest(0, 500);
    },
    "hide-aside-btn": () => {
      // Hide aside
      const $htmlDom = document.documentElement.classList;
      const saveStatus = $htmlDom.contains("hide-aside") ? "show" : "hide";
      saveToLocal.set("aside-status", saveStatus, 2);
      $htmlDom.toggle("hide-aside");
    },
    "mobile-toc-button": item => {
      // Show mobile toc
      const tocEle = document.getElementById("card-toc");
      tocEle.style.transformOrigin = `right ${item.getBoundingClientRect().top + 17}px`;
      tocEle.style.transition = "transform 0.3s ease-in-out";
      tocEle.classList.toggle("open");
      tocEle.addEventListener(
        "transitionend",
        () => {
          tocEle.style.transition = "";
          tocEle.style.transformOrigin = "";
        },
        { once: true }
      );
    },
    "chat-btn": () => {
      // Show chat
      window.chatBtnFn();
    },
    translateLink: () => {
      // switch between traditional and simplified chinese
      window.translateFn.translatePage();
    },
  };

  document.getElementById("rightside").addEventListener("click", function (e) {
    const $target = e.target.closest("[id]");
    if ($target && rightSideFn[$target.id]) {
      rightSideFn[$target.id](this);
    }
  });

  //监听蒙版关闭
  document.addEventListener(
    "touchstart",
    e => {
      anzhiyu.removeRewardMask();
    },
    { passive: true }
  );

  /**
   * menu
   * 側邊欄sub-menu 展開/收縮
   */
  const clickFnOfSubMenu = () => {
    const handleClickOfSubMenu = e => {
      const target = e.target.closest(".site-page.group");
      if (!target) return;
      target.classList.toggle("hide");
    };

    document.querySelector("#sidebar-menus .menus_items") &&
      document.querySelector("#sidebar-menus .menus_items").addEventListener("click", handleClickOfSubMenu);
  };

  /**
   * 手机端目录点击
   */
  const openMobileMenu = () => {
    const handleClick = () => {
      sidebarFn.open();
    };
    anzhiyu.addEventListenerPjax(document.getElementById("toggle-menu"), "click", handleClick);
  };

  /**
   * 複製時加上版權信息
   */
  const addCopyright = () => {
    const { limitCount, languages, copy, copyrightEbable } = GLOBAL_CONFIG.copyright;

    const handleCopy = e => {
      if (copy) {
        anzhiyu.snackbarShow(languages.copySuccess);
      }
      if (copyrightEbable) {
        e.preventDefault();
        const copyFont = window.getSelection(0).toString();
        let textFont = copyFont;
        if (copyFont.length > limitCount) {
          textFont = `${copyFont}\n\n\n${languages.author}\n${languages.link}${window.location.href}\n${languages.source}\n${languages.info}`;
        }
        if (e.clipboardData) {
          return e.clipboardData.setData("text", textFont);
        } else {
          return window.clipboardData.setData("text", textFont);
        }
      }
    };

    document.body.addEventListener("copy", handleCopy);
  };

  /**
   * 網頁運行時間
   */
  const addRuntime = () => {
    const $runtimeCount = document.getElementById("runtimeshow");
    if ($runtimeCount) {
      const publishDate = $runtimeCount.getAttribute("data-publishDate");
      $runtimeCount.textContent = `${anzhiyu.diffDate(publishDate)} ${GLOBAL_CONFIG.runtime}`;
    }
  };

  /**
   * 最後一次更新時間
   */
  const addLastPushDate = () => {
    const $lastPushDateItem = document.getElementById("last-push-date");
    if ($lastPushDateItem) {
      const lastPushDate = $lastPushDateItem.getAttribute("data-lastPushDate");
      $lastPushDateItem.textContent = anzhiyu.diffDate(lastPushDate, true);
    }
  };

  /**
   * table overflow
   */
  const addTableWrap = () => {
    const $table = document.querySelectorAll("#article-container table");
    if (!$table.length) return;

    $table.forEach(item => {
      if (!item.closest(".highlight")) {
        anzhiyu.wrap(item, "div", { class: "table-wrap" });
      }
    });
  };

  /**
   * tag-hide
   */
  const clickFnOfTagHide = () => {
    const hideButtons = document.querySelectorAll("#article-container .hide-button");
    if (!hideButtons.length) return;
    const handleClick = function (e) {
      const $this = this;
      $this.classList.add("open");
      const $fjGallery = $this.nextElementSibling.querySelectorAll(".gallery-container");
      $fjGallery.length && addJustifiedGallery($fjGallery);
    };

    hideButtons.forEach(item => {
      item.addEventListener("click", handleClick, { once: true });
    });
  };

  const tabsFn = () => {
    const navTabsElement = document.querySelectorAll("#article-container .tabs");
    if (!navTabsElement.length) return;

    const removeAndAddActiveClass = (elements, detect) => {
      Array.from(elements).forEach(element => {
        element.classList.remove("active");
        if (element === detect || element.id === detect) {
          element.classList.add("active");
        }
      });
    };

    const addTabNavEventListener = (item, isJustifiedGallery) => {
      const navClickHandler = function (e) {
        const target = e.target.closest("button");
        if (target.classList.contains("active")) return;
        removeAndAddActiveClass(this.children, target);
        this.classList.remove("no-default");
        const tabId = target.getAttribute("data-href");
        const tabContent = this.nextElementSibling;
        removeAndAddActiveClass(tabContent.children, tabId);
        if (isJustifiedGallery) {
          const $isTabJustifiedGallery = tabContent.querySelectorAll(`#${tabId} .fj-gallery`);
          if ($isTabJustifiedGallery.length > 0) {
            anzhiyu.initJustifiedGallery($isTabJustifiedGallery);
          }
        }
      };
      anzhiyu.addEventListenerPjax(item.firstElementChild, "click", navClickHandler);
    };

    const addTabToTopEventListener = item => {
      const btnClickHandler = e => {
        const target = e.target.closest("button");
        if (!target) return;
        anzhiyu.scrollToDest(anzhiyu.getEleTop(item), 300);
      };
      anzhiyu.addEventListenerPjax(item.lastElementChild, "click", btnClickHandler);
    };

    navTabsElement.forEach(item => {
      const isJustifiedGallery = !!item.querySelectorAll(".gallery-container");
      addTabNavEventListener(item, isJustifiedGallery);
      addTabToTopEventListener(item);
    });
  };

  const toggleCardCategory = () => {
    const cardCategory = document.querySelector("#aside-cat-list.expandBtn");
    if (!cardCategory) return;

    const handleToggleBtn = e => {
      const target = e.target;
      if (target.nodeName === "I") {
        e.preventDefault();
        target.parentNode.classList.toggle("expand");
      }
    };
    anzhiyu.addEventListenerPjax(cardCategory, "click", handleToggleBtn, true);
  };

  const switchComments = () => {
    const switchBtn = document.getElementById("switch-btn");
    if (!switchBtn) return;
    let switchDone = false;
    const commentContainer = document.getElementById("post-comment");
    const handleSwitchBtn = () => {
      commentContainer.classList.toggle("move");
      if (!switchDone) {
        switchDone = true;
        loadOtherComment();
      }
    };
    anzhiyu.addEventListenerPjax(switchBtn, "click", handleSwitchBtn);
  };

  const addPostOutdateNotice = function () {
    const data = GLOBAL_CONFIG.noticeOutdate;
    const diffDay = anzhiyu.diffDate(GLOBAL_CONFIG_SITE.postUpdate);
    if (diffDay >= data.limitDay) {
      const ele = document.createElement("div");
      ele.className = "post-outdate-notice";
      ele.textContent = data.messagePrev + " " + diffDay + " " + data.messageNext;
      const $targetEle = document.getElementById("article-container");
      if (data.position === "top") {
        $targetEle.insertBefore(ele, $targetEle.firstChild);
      } else {
        $targetEle.appendChild(ele);
      }
    }
  };

  const lazyloadImg = () => {
    window.lazyLoadInstance = new LazyLoad({
      elements_selector: "img",
      threshold: 0,
      data_src: "lazy-src",
    });
  };

  const relativeDate = function (selector) {
    selector.forEach(item => {
      const timeVal = item.getAttribute("datetime");
      item.textContent = anzhiyu.diffDate(timeVal, true);
      item.style.display = "inline";
    });
  };

  const mouseleaveHomeCard = function () {
    const topGroup = document.querySelector(".topGroup");
    if (!topGroup) return;
    //首页大卡片恢复显示
    topGroup.addEventListener("mouseleave", function () {
      document.getElementById("todayCard").classList.remove("hide");
      document.getElementById("todayCard").style.zIndex = 1;
    });
  };

  // 表情放大
  const owoBig = function () {
    let flag = 1, // 设置节流阀
      owo_time = "", // 设置计时器
      m = 3; // 设置放大倍数
    // 创建盒子
    let div = document.createElement("div");
    // 设置ID
    div.id = "owo-big";
    // 插入盒子
    let body = document.querySelector("body");
    body.appendChild(div);

    // 监听 post-comment 元素的子元素添加事件
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        const addedNodes = mutation.addedNodes;
        // 判断新增的节点中是否包含 OwO-body 类名的元素
        for (let i = 0; i < addedNodes.length; i++) {
          const node = addedNodes[i];
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.classList.contains("OwO-body") &&
            !node.classList.contains("comment-barrage")
          ) {
            const owo_body = node;
            // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
            owo_body.addEventListener("contextmenu", e => e.preventDefault());
            // 鼠标移入
            owo_body.addEventListener("mouseover", handleMouseOver);
            // 鼠标移出
            owo_body.addEventListener("mouseout", handleMouseOut);
          }
        }
      });
    });

    // 配置 MutationObserver 选项
    const config = { childList: true, subtree: true };

    // 开始监听
    observer.observe(document.getElementById("post-comment"), config);

    function handleMouseOver(e) {
      if (e.target.tagName == "IMG" && flag) {
        flag = 0;
        // 移入100毫秒后显示盒子
        owo_time = setTimeout(() => {
          let height = e.target.clientHeight * m; // 盒子高
          let width = e.target.clientWidth * m; // 盒子宽
          let left = e.x - e.offsetX - (width - e.target.clientWidth) / 2; // 盒子与屏幕左边距离
          if (left + width > body.clientWidth) {
            left -= left + width - body.clientWidth + 10;
          } // 右边缘检测，防止超出屏幕
          if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
          let top = e.y - e.offsetY; // 盒子与屏幕顶部距离

          // 设置盒子样式
          div.style.height = height + "px";
          div.style.width = width + "px";
          div.style.left = left + "px";
          div.style.top = top + "px";
          div.style.display = "flex";
          // 在盒子中插入图片
          div.innerHTML = `<img src="${e.target.src}">`;
        }, 100);
      }
    }

    function handleMouseOut(e) {
      // 隐藏盒子
      div.style.display = "none";
      flag = 1;
      clearTimeout(owo_time);
    }
  };

  //封面纯色
  const coverColor = async () => {
    const root = document.querySelector(":root");
    const path = document.getElementById("post-top-bg")?.src;
    if (!path) {
      // 非文章情况，直接设置不需要请求了
      root.style.setProperty("--anzhiyu-bar-background", "var(--anzhiyu-meta-theme-color)");
      requestAnimationFrame(() => {
        anzhiyu.initThemeColor();
      });

      // 要改回来默认主色
      document.documentElement.style.setProperty(
        "--anzhiyu-main",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-theme")
      );
      document.documentElement.style.setProperty(
        "--anzhiyu-theme-op",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
      );
      document.documentElement.style.setProperty(
        "--anzhiyu-theme-op-deep",
        getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
      );

      return;
    }

    // 文章内
    if (GLOBAL_CONFIG.mainTone) {
      if (GLOBAL_CONFIG_SITE.postMainColor) {
        let value = GLOBAL_CONFIG_SITE.postMainColor;
        if (getContrastYIQ(value) === "light") {
          value = LightenDarkenColor(colorHex(value), -40);
        }

        root.style.setProperty("--anzhiyu-bar-background", value);
        requestAnimationFrame(() => {
          anzhiyu.initThemeColor();
        });

        if (GLOBAL_CONFIG.mainTone.cover_change) {
          document.documentElement.style.setProperty("--anzhiyu-main", value);
          document.documentElement.style.setProperty(
            "--anzhiyu-theme-op",
            getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
          );
          document.documentElement.style.setProperty(
            "--anzhiyu-theme-op-deep",
            getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
          );
        }
      } else {
        const fallbackValue = "var(--anzhiyu-theme)";
        let fetchPath = "";
        if (GLOBAL_CONFIG.mainTone.mode == "cdn" || GLOBAL_CONFIG.mainTone.mode == "both") {
          fetchPath = path + "?imageAve";
        } else if (GLOBAL_CONFIG.mainTone.mode == "api") {
          fetchPath = GLOBAL_CONFIG.mainTone.api + path;
        }
        // cdn/api模式请求
        try {
          const response = await fetch(fetchPath);
          if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
            const obj = await response.json();
            let value =
              GLOBAL_CONFIG.mainTone.mode == "cdn" || GLOBAL_CONFIG.mainTone.mode == "both"
                ? "#" + obj.RGB.slice(2)
                : obj.RGB;
            if (getContrastYIQ(value) === "light") {
              value = LightenDarkenColor(colorHex(value), -40);
            }

            root.style.setProperty("--anzhiyu-bar-background", value);
            requestAnimationFrame(() => {
              anzhiyu.initThemeColor();
            });

            if (GLOBAL_CONFIG.mainTone.cover_change) {
              document.documentElement.style.setProperty("--anzhiyu-main", value);
              document.documentElement.style.setProperty(
                "--anzhiyu-theme-op",
                getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
              );
              document.documentElement.style.setProperty(
                "--anzhiyu-theme-op-deep",
                getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
              );
            }
          } else {
            if (GLOBAL_CONFIG.mainTone.mode == "both") {
              // both继续请求
              try {
                const response = await fetch(GLOBAL_CONFIG.mainTone.api + path);
                if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
                  const obj = await response.json();
                  let value = obj.RGB;

                  if (getContrastYIQ(value) === "light") {
                    value = LightenDarkenColor(colorHex(value), -40);
                  }

                  root.style.setProperty("--anzhiyu-bar-background", value);
                  requestAnimationFrame(() => {
                    anzhiyu.initThemeColor();
                  });

                  if (GLOBAL_CONFIG.mainTone.cover_change) {
                    document.documentElement.style.setProperty("--anzhiyu-main", value);
                    document.documentElement.style.setProperty(
                      "--anzhiyu-theme-op",
                      getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "23"
                    );
                    document.documentElement.style.setProperty(
                      "--anzhiyu-theme-op-deep",
                      getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-main") + "dd"
                    );
                  }
                } else {
                  root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
                  requestAnimationFrame(() => {
                    anzhiyu.initThemeColor();
                  });
                  document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
                }
              } catch {
                root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
                requestAnimationFrame(() => {
                  anzhiyu.initThemeColor();
                });
                document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
              }
            } else {
              root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
              requestAnimationFrame(() => {
                anzhiyu.initThemeColor();
              });
              document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
            }
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
          requestAnimationFrame(() => {
            anzhiyu.initThemeColor();
          });
          document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
        }
      }
    }
  };

  //RGB颜色转化为16进制颜色
  const colorHex = str => {
    const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

    if (/^(rgb|RGB)/.test(str)) {
      const aColor = str.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return aColor.reduce((acc, val) => {
        const hex = Number(val).toString(16).padStart(2, "0");
        return acc + hex;
      }, "#");
    }

    if (hexRegex.test(str)) {
      if (str.length === 4) {
        return Array.from(str.slice(1)).reduce((acc, val) => acc + val + val, "#");
      }
      return str;
    }

    return str;
  };

  // Lighten or darken a color
  const LightenDarkenColor = (col, amt) => {
    const usePound = col.startsWith("#");

    if (usePound) {
      col = col.slice(1);
    }

    let num = parseInt(col, 16);

    const processColor = (colorValue, amount) => {
      colorValue += amount;
      return colorValue > 255 ? 255 : colorValue < 0 ? 0 : colorValue;
    };

    const r = processColor(num >> 16, amt);
    const b = processColor((num >> 8) & 0x00ff, amt);
    const g = processColor(num & 0x0000ff, amt);

    return (usePound ? "#" : "") + String("000000" + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
  };

  // Determine whether a color is light or dark
  const getContrastYIQ = hexcolor => {
    const colorRgb = color => {
      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      color = color.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
      return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
    };

    const colorrgb = colorRgb(hexcolor);
    const colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    const [_, red, green, blue] = colors;

    const brightness = (red * 299 + green * 587 + blue * 114) / 255000;

    return brightness >= 0.5 ? "light" : "dark";
  };

  //监听跳转页面输入框是否按下回车
  const listenToPageInputPress = function () {
    var input = document.getElementById("toPageText");
    if (input) {
      input.addEventListener("keydown", event => {
        if (event.keyCode === 13) {
          // 如果按下的是回车键，则执行特定的函数
          anzhiyu.toPage();
          var link = document.getElementById("toPageButton");
          var href = link.href;
          pjax.loadUrl(href);
        }
      });
    }
  };

  // 监听nav是否被其他音频暂停⏸️
  const listenNavMusicPause = function () {
    const timer = setInterval(() => {
      if (navMusicEl && navMusicEl.querySelector("#nav-music meting-js").aplayer) {
        clearInterval(timer);
        let msgPlay = '<i class="anzhiyufont anzhiyu-icon-play"></i><span>播放音乐</span>';
        let msgPause = '<i class="anzhiyufont anzhiyu-icon-pause"></i><span>暂停音乐</span>';
        navMusicEl.querySelector("#nav-music meting-js").aplayer.on("pause", function () {
          navMusicEl.classList.remove("playing");
          document.getElementById("menu-music-toggle").innerHTML = msgPlay;
          document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
          document.querySelector("#consoleMusic").classList.remove("on");
          anzhiyu_musicPlaying = false;
          navMusicEl.classList.remove("stretch");
        });
        navMusicEl.querySelector("#nav-music meting-js").aplayer.on("play", function () {
          navMusicEl.classList.add("playing");
          document.getElementById("menu-music-toggle").innerHTML = msgPause;
          document.querySelector("#consoleMusic").classList.add("on");
          anzhiyu_musicPlaying = true;
          // navMusicEl.classList.add("stretch");
        });
      }
    }, 16);
  };

  // 开发者工具键盘监听
  window.onkeydown = function (e) {
    123 === e.keyCode && anzhiyu.snackbarShow("开发者模式已打开，请遵循GPL协议", !1);
  };

  // 欢迎语
  function greetingInit() {
    const greetingBoxInfo = GLOBAL_CONFIG.greetingBox.list;
    const greetingBoxDefault = GLOBAL_CONFIG.greetingBox.default;
    //- 创建盒子
    let div = document.createElement("div");
    //- 设置ID
    div.id = "greeting";
    //- 设置class
    setTimeout(() => {
      div.classList.add("shown");
    }, 1000);
    //- 插入盒子
    let greetingBox = document.getElementById("greetingBox");
    if (!greetingBox) return;
    greetingBox.appendChild(div);
    const nowTime = new Date().getHours();
    let greetings = greetingBoxDefault;
    for (let i = 0; i < greetingBoxInfo.length; i++) {
      if (nowTime >= greetingBoxInfo[i].startTime && nowTime <= greetingBoxInfo[i].endTime) {
        greetings = greetingBoxInfo[i].greeting;
        break;
      }
    }
    div.innerHTML = greetings;
    setTimeout(() => {
      div.classList.remove("shown");
      setTimeout(() => {
        greetingBox.remove();
      }, 500);
    }, 3000);
  }
  function statistics51aInit() {
    const loadScript = (url, charset = "UTF-8", crossorigin, id) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        if (id) {
          script.setAttribute("id", id);
        }
        if (charset) {
          script.setAttribute("charset", charset);
        }
        if (crossorigin) {
          script.setAttribute("crossorigin", crossorigin);
        }
        script.onerror = reject;
        script.onload = script.onreadystatechange = function () {
          const loadState = this.readyState;
          if (loadState && loadState !== "loaded" && loadState !== "complete") return;
          script.onload = script.onreadystatechange = null;
          resolve();
        };
        document.head.appendChild(script);
      });
    };

    const scriptUrls = [
      { url: "https://sdk.51.la/js-sdk-pro.min.js", charset: "UTF-8", crossorigin: false, id: "LA_COLLECT" },
      { url: "https://sdk.51.la/perf/js-sdk-perf.min.js", crossorigin: "anonymous" },
    ];

    Promise.all(scriptUrls.map(({ url, charset, crossorigin, id }) => loadScript(url, charset, crossorigin, id)))
      .then(() => {
        LA.init({ id: GLOBAL_CONFIG.LA51.ck, ck: GLOBAL_CONFIG.LA51.ck });
        new LingQue.Monitor().init({ id: GLOBAL_CONFIG.LA51.LingQueMonitorID, sendSuspicious: true });
      })
      .catch(error => {
        console.error("加载51a统计异常，本地加载403是正常情况:", error);
      });
  }

  function setInputFocusListener() {
    const inputs = document.querySelectorAll("input, textarea");
    const filteredinputs = Array.from(inputs).filter(heading => {
      if (heading.id !== "center-console" || heading.id !== "page-type") {
        return;
      }
    });
    filteredinputs.forEach(input => {
      input.addEventListener("focus", () => {
        anzhiyu_intype = true;
      });

      input.addEventListener("blur", () => {
        anzhiyu_intype = false;
      });
    });
  }

  // 是否开启快捷键
  function executeShortcutKeyFunction() {
    // 是否开启快捷键
    anzhiyu_keyboard = localStorage.getItem("keyboardToggle") ? localStorage.getItem("keyboardToggle") : false;
    function addKeyShotListener() {
      const windowObject = window;
      windowObject.removeEventListener("keydown", keyDownEvent);
      windowObject.removeEventListener("keyup", keyUpEvent);
      windowObject.addEventListener("keydown", keyDownEvent);
      windowObject.addEventListener("keyup", keyUpEvent);
    }

    function keyDownEvent(event) {
      const isEscapeKeyPressed = event.keyCode === 27;
      const isShiftKeyPressed = event.shiftKey;
      const isKeyboardEnabled = anzhiyu_keyboard;
      const isInInputField = anzhiyu_intype;

      if (isEscapeKeyPressed) {
        anzhiyu.hideLoading();
        anzhiyu.hideConsole();
        rm.hideRightMenu();
      }
      const shortcutKeyDelay = GLOBAL_CONFIG.shortcutKey.delay ? GLOBAL_CONFIG.shortcutKey.delay : 100;
      const shortcutKeyShiftDelay = GLOBAL_CONFIG.shortcutKey.shiftDelay ? GLOBAL_CONFIG.shortcutKey.shiftDelay : 200;
      if (isKeyboardEnabled && isShiftKeyPressed && !isInInputField) {
        anzhiyu_keyUpShiftDelayEvent_timeoutId = setTimeout(() => {
          switch (event.keyCode) {
            case 16:
              anzhiyu_keyUpEvent_timeoutId = setTimeout(() => {
                document.querySelector("#keyboard-tips").classList.add("show");
              }, shortcutKeyShiftDelay);
              break;
            case 65:
              anzhiyu.switchConsole();
              break;
            case 77:
              anzhiyu.musicToggle();
              break;
            case 75:
              anzhiyu.keyboardToggle();
              break;
            case 73:
              anzhiyu.rightMenuToggle();
              break;
            case 82:
              toRandomPost();
              break;
            case 72:
              pjax.loadUrl("/");
              break;
            case 68:
              rightSideFn.darkmode();
              break;
            case 70:
              pjax.loadUrl("/fcircle/");
              break;
            case 76:
              pjax.loadUrl("/link/");
              break;
            case 80:
              pjax.loadUrl("/about/");
              break;
            default:
              break;
          }
          event.preventDefault();
        }, shortcutKeyDelay);
      }
    }

    window.onfocus = function () {
      document.getElementById("keyboard-tips").classList.remove("show");
    };

    function keyUpEvent(event) {
      anzhiyu_keyUpEvent_timeoutId && clearTimeout(anzhiyu_keyUpEvent_timeoutId);
      anzhiyu_keyUpShiftDelayEvent_timeoutId && clearTimeout(anzhiyu_keyUpShiftDelayEvent_timeoutId);
      if (event.keyCode === 16) {
        const keyboardTips = document.querySelector("#keyboard-tips");
        keyboardTips.classList.remove("show");
      }
    }

    addKeyShotListener();
  }

  function changeDocumentTitle() {
    let leaveTitle = GLOBAL_CONFIG.diytitle.leaveTitle;
    let backTitle = GLOBAL_CONFIG.diytitle.backTitle;
    let OriginTitile = document.title;
    let titleTime;

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        //离开当前页面时标签显示内容
        document.title = leaveTitle;
        clearTimeout(titleTime);
      } else {
        //返回当前页面时标签显示内容
        document.title = backTitle + OriginTitile;
        //两秒后变回正常标题
        titleTime = setTimeout(function () {
          document.title = OriginTitile;
        }, 2000);
      }
    });
  }

  function addDarkModeEventListener(elementId, childSelector) {
    const element = document.getElementById(elementId);
    if (element && childSelector) {
      const childElement = element.querySelector(childSelector);
      childElement && childElement.addEventListener("click", rightSideFn.darkmode);
    } else if (element) {
      element.addEventListener("click", rightSideFn.darkmode);
    }
  }

  const unRefreshFn = function () {
    window.addEventListener("resize", () => {
      adjustMenu(false);
      mobileSidebarOpen && anzhiyu.isHidden(document.getElementById("toggle-menu")) && sidebarFn.close();
    });

    document.getElementById("menu-mask").addEventListener("click", e => {
      sidebarFn.close();
    });

    // 处理右键
    $rightMenu = document.getElementById("rightMenu");
    addDarkModeEventListener("menu-darkmode");
    addDarkModeEventListener("sidebar", ".darkmode_switchbutton");

    clickFnOfSubMenu();
    GLOBAL_CONFIG.islazyload && lazyloadImg();
    GLOBAL_CONFIG.copyright !== undefined && addCopyright();
    GLOBAL_CONFIG.navMusic && listenNavMusicPause();
    if (GLOBAL_CONFIG.shortcutKey && document.getElementById("consoleKeyboard")) {
      localStorage.setItem("keyboardToggle", "true");
      document.getElementById("consoleKeyboard").classList.add("on");
      anzhiyu_keyboard = true;
      executeShortcutKeyFunction();
    }
    if (GLOBAL_CONFIG.autoDarkmode) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
        if (saveToLocal.get("theme") !== undefined) return;
        e.matches ? handleThemeChange("dark") : handleThemeChange("light");
      });
    }
    // 欢迎语
    GLOBAL_CONFIG.greetingBox && greetingInit();
    // 51la统计&灵雀统计
    GLOBAL_CONFIG.LA51 && statistics51aInit();
  };

  window.refreshFn = function () {
    initAdjust();
    themeColorMeta = document.querySelector('meta[name="theme-color"]');
    pageHeaderEl = document.getElementById("page-header");
    navMusicEl = document.getElementById("nav-music");
    consoleEl = document.getElementById("console");

    addDarkModeEventListener("console", ".darkmode_switchbutton");

    if (GLOBAL_CONFIG_SITE.isPost) {
      GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice();
      GLOBAL_CONFIG.relativeDate.post && relativeDate(document.querySelectorAll("#post-meta time"));
    } else {
      if (GLOBAL_CONFIG.relativeDate.homepage) {
        relativeDate(document.querySelectorAll("#recent-posts time"));
      } else if (GLOBAL_CONFIG.relativeDate.simplehomepage) {
        relativeDate(document.querySelectorAll("#recent-posts time"), true);
      }
      GLOBAL_CONFIG.runtime && addRuntime();
      addLastPushDate();
      toggleCardCategory();
    }

    GLOBAL_CONFIG.diytitle && changeDocumentTitle();
    scrollFnToDo();
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex();
    addHighlightTool();
    GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption();
    scrollFn();

    // 刷新时第一次滚动百分比
    window.scrollCollect && window.scrollCollect();

    const $jgEle = document.querySelectorAll("#content-inner .fj-gallery");
    $jgEle.length && runJustifiedGallery($jgEle);

    runLightbox();
    addTableWrap();
    clickFnOfTagHide();
    tabsFn();
    switchComments();
    document.getElementById("toggle-menu").addEventListener("click", () => {
      sidebarFn.open();
    });

    // 如果当前页有评论就执行函数
    if (document.getElementById("post-comment")) owoBig();

    mouseleaveHomeCard();
    coverColor();
    listenToPageInputPress();
    openMobileMenu();

    // needRefresh
    // nav中间的标题变化
    document.getElementById("page-name").innerText = document.title.split(` | ${GLOBAL_CONFIG_SITE.configTitle}`)[0];
    anzhiyu.initIndexEssay();
    anzhiyu.changeTimeInEssay();
    anzhiyu.removeBodyPaceClass();
    anzhiyu.qrcodeCreate();
    anzhiyu.changeTimeInAlbumDetail();
    anzhiyu.reflashEssayWaterFall();
    anzhiyu.sayhi();
    anzhiyu.stopImgRightDrag();
    anzhiyu.addNavBackgroundInit();
    anzhiyu.setValueToBodyType();
    anzhiyu.catalogActive();
    anzhiyu.tagsPageActive();
    anzhiyu.categoriesBarActive();
    anzhiyu.topCategoriesBarScroll();
    anzhiyu.switchRightClickMenuHotReview();
    anzhiyu.getCustomPlayList();
    anzhiyu.addEventListenerConsoleMusicList(false);
    anzhiyu.initPaginationObserver();

    setTimeout(() => {
      setInputFocusListener();
      if (typeof addFriendLinksInFooter === "function") {
        addFriendLinksInFooter();
      }
    }, 200);
  };

  refreshFn();
  unRefreshFn();
});
