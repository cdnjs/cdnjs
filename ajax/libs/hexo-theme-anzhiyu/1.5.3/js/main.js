// 第一次播放音乐
var anzhiyu_musicFirst = false;
// 快捷键
var anzhiyu_keyboard = null;
// 音乐播放状态
var anzhiyu_musicPlaying = false;
var $web_container = document.getElementById("web_container");
var $web_box = document.getElementById("web_box");
var $bodyWrap = document.getElementById("body-wrap");
var $main = document.querySelector("main");
var dragStartX;

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
document.addEventListener("DOMContentLoaded", function () {
  function onDragStart(event) {
    // event.preventDefault();
    dragStartX = getEventX(event);
    $web_box.style.transition = "all .3s";
    addMoveEndListeners(onDragMove, onDragEnd);
  }

  function onDragMove(event) {
    const deltaX = getEventX(event) - dragStartX;
    if (deltaX < 0) {
      const screenWidth = window.innerWidth;
      const translateX = Math.min(-300, ((-1 * deltaX) / screenWidth) * 300);
      const scale = Math.min(1, 0.86 + (deltaX / screenWidth) * (1 - 0.86));
      $web_box.style.transform = `translate3d(-${translateX}px, 0px, 0px) scale3d(${scale}, ${scale}, 1)`;
    }
  }

  function onDragEnd(event) {
    const screenWidth = window.innerWidth;
    if (getEventX(event) <= screenWidth / 1.5) {
      completeTransition();
    } else {
      resetTransition();
    }
    removeMoveEndListeners(onDragMove, onDragEnd);
  }

  function completeTransition() {
    $web_box.style.transition = "all 0.3s ease-out";
    $web_box.style.transform = "none";
    sidebarFn.close();
    removeMoveEndListeners(onDragMove, onDragEnd);
  }

  function resetTransition() {
    $web_box.style.transition = "";
    $web_box.style.transform = "";
  }

  function getEventX(event) {
    return event.type.startsWith("touch") ? event.changedTouches[0].clientX : event.clientX;
  }

  function addMoveEndListeners(moveHandler, endHandler) {
    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", endHandler);
    document.addEventListener("touchmove", moveHandler, { passive: false });
    document.addEventListener("touchend", endHandler);
  }

  function removeMoveEndListeners(moveHandler, endHandler) {
    document.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", endHandler);
    document.removeEventListener("touchmove", moveHandler);
    document.removeEventListener("touchend", endHandler);
  }

  let blogNameWidth, menusWidth, searchWidth;
  let mobileSidebarOpen = false;
  const $sidebarMenus = document.getElementById("sidebar-menus");
  const $rightside = document.getElementById("rightside");
  let $nav = document.getElementById("nav");
  const adjustMenu = init => {
    if (init) {
      blogNameWidth = document.getElementById("site-name").offsetWidth;
      const $menusEle = document.querySelectorAll("#menus .menus_item");
      menusWidth = 0;
      $menusEle.length &&
        $menusEle.forEach(i => {
          menusWidth += i.offsetWidth;
        });
      const $searchEle = document.querySelector("#search-button");
      searchWidth = $searchEle ? $searchEle.offsetWidth : 0;
      $nav = document.getElementById("nav");
    }

    let hideMenuIndex = "";
    if (window.innerWidth <= 768) hideMenuIndex = true;
    else hideMenuIndex = blogNameWidth + menusWidth + searchWidth > $nav.offsetWidth - 120;

    if (hideMenuIndex) {
      $nav.classList.add("hide-menu");
    } else {
      $nav.classList.remove("hide-menu");
    }
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
      anzhiyu.changeThemeMetaColor("#607d8b");
      anzhiyu.animateIn(document.getElementById("menu-mask"), "to_show 0.5s");
      $sidebarMenus.classList.add("open");
      $web_box.classList.add("open");
      $rightside.classList.add("hide");
      $nav.style.borderTopLeftRadius = "12px";
      mobileSidebarOpen = true;
      document.body.style.overflow = "hidden";
      $web_box.addEventListener("mousedown", onDragStart);
      $web_box.addEventListener("touchstart", onDragStart, { passive: false });
      if (window.location.pathname.startsWith("/music/")) {
        $web_container.style.background = "rgb(255 255 255 / 20%)";
      } else {
        $web_container.style.background = "var(--global-bg)";
      }
    },
    close: () => {
      const $body = document.body;
      anzhiyu.initThemeColor();
      $body.style.paddingRight = "";
      anzhiyu.animateOut(document.getElementById("menu-mask"), "to_hide 0.5s");
      $sidebarMenus.classList.remove("open");
      $web_box.classList.remove("open");
      $rightside.classList.remove("hide");
      $nav.style.borderTopLeftRadius = "0px";
      mobileSidebarOpen = false;
      document.body.style.overflow = "auto";
      anzhiyu.addNavBackgroundInit();
    },
  };

  /**
   * 首頁top_img底下的箭頭
   */
  const scrollDownInIndex = () => {
    const $bbTimeList = document.getElementById("bbTimeList");
    const $scrollDownEle = document.getElementById("scroll-down");
    $scrollDownEle &&
      $scrollDownEle.addEventListener("click", function () {
        if ($bbTimeList) {
          anzhiyu.scrollToDest($bbTimeList.offsetTop, 300);
        } else {
          anzhiyu.scrollToDest(document.getElementById("content-inner").offsetTop, 300);
        }
      });
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

    function createEle(lang, item, service) {
      const fragment = document.createDocumentFragment();

      if (isShowTool) {
        const hlTools = document.createElement("div");
        hlTools.className = `highlight-tools ${highlightShrinkClass}`;
        hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle;
        hlTools.addEventListener("click", highlightToolsFn);
        fragment.appendChild(hlTools);
      }

      if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
        const ele = document.createElement("div");
        ele.className = "code-expand-btn";
        ele.innerHTML = '<i class="anzhiyufont anzhiyu-icon-angle-double-down"></i>';
        ele.addEventListener("click", expandCode);
        fragment.appendChild(ele);
      }

      if (service === "hl") {
        item.insertBefore(fragment, item.firstChild);
      } else {
        item.parentNode.insertBefore(fragment, item);
      }
    }

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

      if (isInViewPortOfOneNoDis(pageBottomDomFlag) || percentage > 90) {
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

    const scroolTask = anzhiyu.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      const isDown = scrollDirection(currentTop);

      const delta = Math.abs(lastScrollTop - currentTop);
      if (currentTop > 60 && delta < 20 && delta != 0) {
        // ignore small scrolls
        return;
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

    window.scrollCollect = scroolTask;
    window.addEventListener("scroll", scrollCollect);
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
      $cardToc = $cardTocLayout.getElementsByClassName("toc-content")[0];
      $tocLink = $cardToc.querySelectorAll(".toc-link");
      isExpand = $cardToc.classList.contains("is-expand");

      window.mobileToc = {
        open: () => {
          $cardTocLayout.style.cssText = "animation: toc-open .3s; opacity: 1; right: 55px";
        },

        close: () => {
          $cardTocLayout.style.animation = "toc-close .2s";
          setTimeout(() => {
            $cardTocLayout.style.cssText = "opacity:''; animation: ''; right: ''";
          }, 100);
        },
      };

      // toc元素點擊
      $cardToc.addEventListener("click", e => {
        e.preventDefault();
        const target = e.target.classList;
        if (target.contains("toc-content")) return;
        const $target = target.contains("toc-link") ? e.target : e.target.parentElement;
        anzhiyu.scrollToDest(
          anzhiyu.getEleTop(document.getElementById(decodeURI($target.getAttribute("href")).replace("#", ""))) - 60,
          300
        );
        if (window.innerWidth < 900) {
          window.mobileToc.close();
        }
      });

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
    let detectItem = "";
    const findHeadPosition = function (top) {
      if (top === 0) {
        return false;
      }

      let currentId = "";
      let currentIndex = "";

      list.forEach(function (ele, index) {
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
    window.tocScrollFn = anzhiyu.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      findHeadPosition(currentTop);
    }, 96);

    window.addEventListener("scroll", tocScrollFn);
  };

  /**
   * Rightside
   */
  const rightSideFn = {
    switchReadMode: () => {
      // read-mode
      const $body = document.body;
      $body.classList.add("read-mode");
      const newEle = document.createElement("button");
      newEle.type = "button";
      newEle.className = "anzhiyufont anzhiyu-icon-sign-out-alt exit-readmode";
      $body.appendChild(newEle);

      function clickFn() {
        $body.classList.remove("read-mode");
        newEle.remove();
        newEle.removeEventListener("click", clickFn);
      }

      newEle.addEventListener("click", clickFn);
    },
    showOrHideBtn: e => {
      // rightside 點擊設置 按鈕 展開
      const rightsideHideClassList = document.getElementById("rightside-config-hide").classList;
      rightsideHideClassList.toggle("show");
      if (e.classList.contains("show")) {
        rightsideHideClassList.add("status");
        setTimeout(() => {
          rightsideHideClassList.remove("status");
        }, 300);
      }
      e.classList.toggle("show");
    },
    scrollToTop: () => {
      // Back to top
      anzhiyu.scrollToDest(0, 500);
    },
    hideAsideBtn: () => {
      // Hide aside
      const $htmlDom = document.documentElement.classList;
      $htmlDom.contains("hide-aside")
        ? saveToLocal.set("aside-status", "show", 2)
        : saveToLocal.set("aside-status", "hide", 2);
      $htmlDom.toggle("hide-aside");
    },

    runMobileToc: () => {
      if (window.getComputedStyle(document.getElementById("card-toc")).getPropertyValue("opacity") === "0")
        window.mobileToc.open();
      else window.mobileToc.close();
    },
  };

  document.getElementById("rightside").addEventListener("click", function (e) {
    const $target = e.target.id ? e.target : e.target.parentNode;
    switch ($target.id) {
      case "go-up":
        rightSideFn.scrollToTop();
        break;
      case "rightside_config":
        rightSideFn.showOrHideBtn($target);
        break;
      case "mobile-toc-button":
        rightSideFn.runMobileToc();
        break;
      case "readmode":
        rightSideFn.switchReadMode();
        break;
      case "darkmode":
        anzhiyu.switchDarkMode();
        break;
      case "hide-aside-btn":
        rightSideFn.hideAsideBtn();
        break;
      default:
        break;
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
    document.querySelectorAll("#sidebar-menus .site-page.group").forEach(function (item) {
      item.addEventListener("click", function () {
        this.classList.toggle("hide");
      });
    });
  };

  /**
   * 複製時加上版權信息
   */
  const addCopyright = () => {
    const copyright = GLOBAL_CONFIG.copyright;
    document.body.oncopy = e => {
      e.preventDefault();
      let textFont;
      const copyFont = window.getSelection(0).toString();
      if (copyFont.length > copyright.limitCount) {
        textFont =
          copyFont +
          "\n" +
          "\n" +
          "\n" +
          copyright.languages.author +
          "\n" +
          copyright.languages.link +
          window.location.href +
          "\n" +
          copyright.languages.source +
          "\n" +
          copyright.languages.info;
      } else {
        textFont = copyFont;
      }
      if (e.clipboardData) {
        return e.clipboardData.setData("text", textFont);
      } else {
        return window.clipboardData.setData("text", textFont);
      }
    };
  };

  /**
   * 網頁運行時間
   */
  const addRuntime = () => {
    const $runtimeCount = document.getElementById("runtimeshow");
    if ($runtimeCount) {
      const publishDate = $runtimeCount.getAttribute("data-publishDate");
      $runtimeCount.innerText = anzhiyu.diffDate(publishDate) + " " + GLOBAL_CONFIG.runtime;
    }
  };

  /**
   * 最後一次更新時間
   */
  const addLastPushDate = () => {
    const $lastPushDateItem = document.getElementById("last-push-date");
    if ($lastPushDateItem) {
      const lastPushDate = $lastPushDateItem.getAttribute("data-lastPushDate");
      $lastPushDateItem.innerText = anzhiyu.diffDate(lastPushDate, true);
    }
  };

  /**
   * table overflow
   */
  const addTableWrap = () => {
    const $table = document.querySelectorAll("#article-container :not(.highlight) > table, #article-container > table");
    if ($table.length) {
      $table.forEach(item => {
        anzhiyu.wrap(item, "div", { class: "table-wrap" });
      });
    }
  };

  /**
   * tag-hide
   */
  const clickFnOfTagHide = function () {
    const $hideInline = document.querySelectorAll("#article-container .hide-button");
    if ($hideInline.length) {
      $hideInline.forEach(function (item) {
        item.addEventListener("click", function (e) {
          const $this = this;
          $this.classList.add("open");
          const $fjGallery = $this.nextElementSibling.querySelectorAll(".fj-gallery");
          $fjGallery.length && anzhiyu.initJustifiedGallery($fjGallery);
        });
      });
    }
  };

  const tabsFn = {
    clickFnOfTabs: function () {
      document.querySelectorAll("#article-container .tab > button").forEach(function (item) {
        item.addEventListener("click", function (e) {
          const $this = this;
          const $tabItem = $this.parentNode;

          if (!$tabItem.classList.contains("active")) {
            const $tabContent = $tabItem.parentNode.nextElementSibling;
            const $siblings = anzhiyu.siblings($tabItem, ".active")[0];
            $siblings && $siblings.classList.remove("active");
            $tabItem.classList.add("active");
            const tabId = $this.getAttribute("data-href").replace("#", "");
            const childList = [...$tabContent.children];
            childList.forEach(item => {
              if (item.id === tabId) item.classList.add("active");
              else item.classList.remove("active");
            });
            const $isTabJustifiedGallery = $tabContent.querySelectorAll(`#${tabId} .fj-gallery`);
            if ($isTabJustifiedGallery.length > 0) {
              anzhiyu.initJustifiedGallery($isTabJustifiedGallery);
            }
          }
        });
      });
    },
    backToTop: () => {
      document.querySelectorAll("#article-container .tabs .tab-to-top").forEach(function (item) {
        item.addEventListener("click", function () {
          anzhiyu.scrollToDest(anzhiyu.getEleTop(anzhiyu.getParents(this, ".tabs")) - 60, 300);
        });
      });
    },
  };

  const toggleCardCategory = function () {
    const $cardCategory = document.querySelectorAll("#aside-cat-list .card-category-list-item.parent i");
    if ($cardCategory.length) {
      $cardCategory.forEach(function (item) {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          const $this = this;
          $this.classList.toggle("expand");
          const $parentEle = $this.parentNode.nextElementSibling;
          if (anzhiyu.isHidden($parentEle)) {
            $parentEle.style.display = "block";
          } else {
            $parentEle.style.display = "none";
          }
        });
      });
    }
  };

  const switchComments = function () {
    let switchDone = false;
    const $switchBtn = document.querySelector("#comment-switch > .switch-btn");
    $switchBtn &&
      $switchBtn.addEventListener("click", function () {
        this.classList.toggle("move");
        document.querySelectorAll("#post-comment > .comment-wrap > div").forEach(function (item) {
          if (anzhiyu.isHidden(item)) {
            item.style.cssText = "display: block;animation: tabshow .5s";
          } else {
            item.style.cssText = "display: none;animation: ''";
          }
        });

        if (!switchDone && typeof loadOtherComment === "function") {
          switchDone = true;
          loadOtherComment();
        }
      });
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

  const relativeDate = function (selector, simple = false) {
    selector.forEach(item => {
      const $this = item;
      const timeVal = $this.getAttribute("datetime");
      if (simple) {
        $this.innerText = anzhiyu.diffDate(timeVal, false, simple);
      } else {
        $this.innerText = anzhiyu.diffDate(timeVal, true);
      }
      $this.style.display = "inline";
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
      anzhiyu.initThemeColor();

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
        let value = GLOBAL_CONFIG_SITE.postMainColor
        if (getContrastYIQ(value) === "light") {
          value = LightenDarkenColor(colorHex(value), -40);
        }

        root.style.setProperty("--anzhiyu-bar-background", value);
        anzhiyu.initThemeColor();

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
            anzhiyu.initThemeColor();

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
                  anzhiyu.initThemeColor();

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
                  anzhiyu.initThemeColor();
                  document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
                }
              } catch {
                root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
                anzhiyu.initThemeColor();
                document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
              }
            } else {
              root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
              anzhiyu.initThemeColor();
              document.documentElement.style.setProperty("--anzhiyu-main", fallbackValue);
            }
          }
        } catch (err) {
          console.error("Error fetching data:", err);
          root.style.setProperty("--anzhiyu-bar-background", fallbackValue);
          anzhiyu.initThemeColor();
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

  //16进制颜色转化为RGB颜色
  const colorRgb = str => {
    const hexRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    let sColor = str.toLowerCase();

    if (sColor && hexRegex.test(sColor)) {
      if (sColor.length === 4) {
        sColor = Array.from(sColor.slice(1)).reduce((acc, val) => acc + val + val, "#");
      }

      const sColorChange = Array.from({ length: 3 }, (_, i) => parseInt(sColor.slice(i * 2 + 1, i * 2 + 3), 16));

      return `rgb(${sColorChange.join(",")})`;
    }

    return sColor;
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
      if (navMusicEl.querySelector("#nav-music meting-js").aplayer) {
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

  const unRefreshFn = function () {
    window.addEventListener("resize", () => {
      adjustMenu(false);
      anzhiyu.isHidden(document.getElementById("toggle-menu")) && mobileSidebarOpen && sidebarFn.close();
    });

    anzhiyu.darkModeStatus();

    document.getElementById("menu-mask").addEventListener("click", e => {
      sidebarFn.close();
    });
    GLOBAL_CONFIG.islazyload && lazyloadImg();
    GLOBAL_CONFIG.copyright !== undefined && addCopyright();
    GLOBAL_CONFIG.navMusic && listenNavMusicPause();
    if (GLOBAL_CONFIG.shortcutKey && document.getElementById("consoleKeyboard")) {
      localStorage.setItem("keyboardToggle", "true");
      document.getElementById("consoleKeyboard").classList.add("on");
      anzhiyu_keyboard = true;
    }
    clickFnOfSubMenu();
  };

  window.refreshFn = function () {
    initAdjust();

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
    tabsFn.clickFnOfTabs();
    tabsFn.backToTop();
    switchComments();
    document.getElementById("toggle-menu").addEventListener("click", () => {
      sidebarFn.open();
    });

    // 如果当前页有评论就执行函数
    if (document.getElementById("post-comment")) owoBig();

    mouseleaveHomeCard();
    coverColor();
    listenToPageInputPress();
  };

  refreshFn();
  unRefreshFn();
});
