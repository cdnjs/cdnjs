const sidebarFn = () => {
  const $toggleMenu = document.getElementById("toggle-menu");
  const $mobileSidebarMenus = document.getElementById("sidebar-menus");
  const $menuMask = document.getElementById("menu-mask");
  const $body = document.body;

  const toggleMobileSidebar = (isOpen) => {
    $body.style.overflow = isOpen ? "hidden" : "";
    utils[isOpen ? "fadeIn" : "fadeOut"]($menuMask, 0.5);
    $mobileSidebarMenus.classList.toggle("open", isOpen);
  };

  const closeMobileSidebar = () => {
    if ($mobileSidebarMenus.classList.contains("open")) {
      toggleMobileSidebar(false);
    }
  };

  $toggleMenu.addEventListener("click", () => toggleMobileSidebar(true));
  $menuMask.addEventListener("click", closeMobileSidebar);

  window.addEventListener("resize", () => {
    if (
      utils.isHidden($toggleMenu) &&
      $mobileSidebarMenus.classList.contains("open")
    ) {
      closeMobileSidebar();
    }
    sco.refreshWaterFall();
  });
};

const scrollFn = () => {
  const $rightside = document.getElementById("rightside");
  const $header = document.getElementById("page-header");
  let initTop = 0;

  const updateHeaderAndRightside = (isDown, currentTop) => {
    if (currentTop > 0) {
      $header.classList.toggle("nav-visible", !isDown);
      $header.classList.add("nav-fixed");
      if ($rightside) {
        $rightside.style.opacity = "0.8";
        $rightside.style.transform = "translateX(-58px)";
      }
    } else {
      $header.classList.remove("nav-fixed", "nav-visible");
      if ($rightside) {
        $rightside.style.opacity = "";
        $rightside.style.transform = "";
      }
    }
  };

  const throttledScroll = utils.throttle(() => {
    initThemeColor();
    const currentTop = window.scrollY || document.documentElement.scrollTop;
    const isDown = currentTop > initTop;
    initTop = currentTop;
    updateHeaderAndRightside(isDown, currentTop);
  }, 200);

  window.addEventListener("scroll", (e) => {
    throttledScroll(e);
    if (window.scrollY === 0) {
      $header.classList.remove("nav-fixed", "nav-visible");
      if ($rightside) {
        $rightside.style.cssText = "opacity: ''; transform: ''";
      }
    }
  });
};

const percent = () => {
  const docEl = document.documentElement;
  const body = document.body;
  const scrollPos = window.pageYOffset || docEl.scrollTop;
  const totalScrollableHeight =
    Math.max(
      body.scrollHeight,
      docEl.scrollHeight,
      body.offsetHeight,
      docEl.offsetHeight,
      body.clientHeight,
      docEl.clientHeight
    ) - docEl.clientHeight;
  const scrolledPercent = Math.round((scrollPos / totalScrollableHeight) * 100);
  const navToTop = document.querySelector("#nav-totop");
  const rsToTop = document.querySelector(".rs_show .top i");
  const percentDisplay = document.querySelector("#percent");
  const isNearEnd =
    window.scrollY + docEl.clientHeight >=
    (
      document.getElementById("post-comment") ||
      document.getElementById("footer")
    ).offsetTop;

  navToTop?.classList.toggle("long", isNearEnd || scrolledPercent > 90);
  rsToTop?.classList.toggle("show", isNearEnd || scrolledPercent > 90);
  percentDisplay.textContent =
    isNearEnd || scrolledPercent > 90
      ? navToTop
        ? GLOBAL_CONFIG.lang.backtop
        : ""
      : scrolledPercent;

  document
    .querySelectorAll(".needEndHide")
    .forEach((item) =>
      item.classList.toggle("hide", totalScrollableHeight - scrollPos < 100)
    );
};

const showTodayCard = () => {
  const el = document.getElementById("todayCard");
  const topGroup = document.querySelector(".topGroup");
  topGroup?.addEventListener("mouseleave", () => el?.classList.remove("hide"));
};

const initObserver = () => {
  const commentElement = document.getElementById("post-comment");
  const paginationElement = document.getElementById("pagination");
  const commentBarrageElement = document.querySelector(".comment-barrage");

  if (commentElement && paginationElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        paginationElement.classList.toggle("show-window", entry.isIntersecting);
        if (GLOBAL_CONFIG.comment.commentBarrage) {
          commentBarrageElement.style.bottom = entry.isIntersecting
            ? "-200px"
            : "0px";
        }
      });
    });
    observer.observe(commentElement);
  }
};

const addCopyright = () => {
  if (!GLOBAL_CONFIG.copyright) return;
  const { limit, author, link, source, info } = GLOBAL_CONFIG.copyright;

  document.body.addEventListener("copy", (e) => {
    e.preventDefault();
    const copyText = window.getSelection().toString();
    const text =
      copyText.length > limit
        ? `${copyText}\n\n${author}\n${link}${window.location.href}\n${source}\n${info}`
        : copyText;
    e.clipboardData.setData("text", text);
  });
};

const asideStatus = () => {
  const status = utils.saveToLocal.get("aside-status");
  document.documentElement.classList.toggle("hide-aside", status === "hide");
};

function initThemeColor() {
  const currentTop = window.scrollY || document.documentElement.scrollTop;
  const themeColor =
    currentTop > 0
      ? "--efu-card-bg"
      : PAGE_CONFIG.is_post
      ? "--efu-main"
      : "--efu-background";
  applyThemeColor(
    getComputedStyle(document.documentElement).getPropertyValue(themeColor)
  );
}

function applyThemeColor(color) {
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const appleMobileWebAppMeta = document.querySelector(
    'meta[name="apple-mobile-web-app-status-bar-style"]'
  );
  themeColorMeta?.setAttribute("content", color);
  appleMobileWebAppMeta?.setAttribute("content", color);
  if (window.matchMedia("(display-mode: standalone)").matches) {
    document.body.style.backgroundColor = color;
  }
}

const handleThemeChange = (mode) => {
  const themeChange = window.globalFn?.themeChange || {};
  Object.values(themeChange).forEach((fn) => fn(mode));
};

const sco = {
  lastWittyWord: "",
  wasPageHidden: false,
  musicPlaying: false,
  scrollTo(elementId) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scroll({ top: targetPosition, behavior: "smooth" });
    }
  },
  musicBind() {
    const $music = document.querySelector("#nav-music meting-js");
    if ($music && $music.aplayer) { 
      this.isMusicBind = true;
      $music.onclick = () => this.musicPlaying && this.musicToggle(true);
      $music.aplayer.on('loadeddata', () =>{
        coverColor(true);
      })
    }
  },
  musicToggle(isMeting = true) {
    if (!this.isMusicBind) this.musicBind();
    
    const $music = document.querySelector("#nav-music");
    const $meting = document.querySelector("#nav-music meting-js");
    const $console = document.getElementById("consoleMusic");
    
    this.musicPlaying = !this.musicPlaying;
    
    $music.classList.toggle("playing", this.musicPlaying);
    $music.classList.toggle("stretch", this.musicPlaying);
    $console?.classList.toggle("on", this.musicPlaying);
    
    if (typeof rm !== "undefined" && rm?.menuItems.music[0]) {
      const $rmText = document.querySelector("#menu-music-toggle span");
      const $rmIcon = document.querySelector("#menu-music-toggle i");
      $rmText.textContent = this.musicPlaying 
        ? GLOBAL_CONFIG.right_menu.music.stop
        : GLOBAL_CONFIG.right_menu.music.start;
      $rmIcon.className = `solitude fas ${this.musicPlaying ? 'fa-pause' : 'fa-play'}`;
    }

    if (isMeting && $meting) {
      this.musicPlaying ? $meting.aplayer.play() : $meting.aplayer.pause();
    }
  },
  musicSkipBack() {
    document.querySelector("meting-js")?.aplayer?.skipBack();
  },
  musicSkipForward() {
    document.querySelector("meting-js")?.aplayer?.skipForward();
  },
  switchCommentBarrage() {
    const commentBarrageElement = document.querySelector(".comment-barrage");
    const consoleCommentBarrage = document.querySelector(
      "#consoleCommentBarrage"
    );
    if (!commentBarrageElement) return;

    const isDisplayed =
      window.getComputedStyle(commentBarrageElement).display === "flex";
    commentBarrageElement.style.display = isDisplayed ? "none" : "flex";
    consoleCommentBarrage?.classList.toggle("on", !isDisplayed);
    utils.saveToLocal.set("commentBarrageSwitch", !isDisplayed, 0.2);
    rm?.menuItems.barrage && rm.barrage(isDisplayed);
  },
  switchHideAside() {
    const htmlClassList = document.documentElement.classList;
    const consoleHideAside = document.querySelector("#consoleHideAside");
    const isHideAside = htmlClassList.contains("hide-aside");
    utils.saveToLocal.set("aside-status", isHideAside ? "show" : "hide", 1);
    htmlClassList.toggle("hide-aside");
    consoleHideAside.classList.toggle("on", !isHideAside);
  },
  switchKeyboard() {
    this.sco_keyboards = !this.sco_keyboards;
    const consoleKeyboard = document.querySelector("#consoleKeyboard");
    const keyboardFunction = this.sco_keyboards ? openKeyboard : closeKeyboard;
    consoleKeyboard?.classList.toggle("on", this.sco_keyboards);
    keyboardFunction();
    localStorage.setItem("keyboard", this.sco_keyboards);
    document.getElementById("keyboard-tips")?.classList.remove("show");
  },
  initConsoleState() {
    const consoleHideAside = document.querySelector("#consoleHideAside");
    if (!consoleHideAside) return;
    consoleHideAside.classList.toggle(
      "on",
      document.documentElement.classList.contains("hide-aside")
    );
  },
  changeWittyWord() {
    const greetings = GLOBAL_CONFIG.aside.witty_words || [];
    if (greetings.length === 0) {
      document.getElementById("sayhi").textContent = "Solitude";
      this.lastWittyWord = null;
      return;
    }
    const greetingElement = document.getElementById("sayhi");
    let randomGreeting;
    if (greetings.length === 1) {
      randomGreeting = greetings[0];
    } else {
      do {
        randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      } while (randomGreeting === this.lastWittyWord);
    }
    greetingElement.textContent = randomGreeting;
    this.lastWittyWord = randomGreeting;
  },
  switchDarkMode() {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";
    const newMode = isDarkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newMode);
    utils.saveToLocal.set("theme", newMode, 0.02);
    utils.snackbarShow(GLOBAL_CONFIG.lang.theme[newMode], false, 2000);
    if (typeof rm === "object") rm.mode(!isDarkMode) && rm.hideRightMenu();
    handleThemeChange(newMode);
  },
  hideTodayCard: () =>
    document.getElementById("todayCard").classList.add("hide"),
  toTop: () => utils.scrollToDest(0),
  showConsole: () =>
    document.getElementById("console")?.classList.toggle("show", true),
  hideConsole: () =>
    document.getElementById("console")?.classList.remove("show"),
  refreshWaterFall() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            waterfall(entry.target).then(() => {
              entry.target.classList.add("show");
            });
          }, 300);
        }
      });
    });
    document
      .querySelectorAll(".waterfall")
      .forEach((el) => observer.observe(el));
  },
  addRuntime() {
    const el = document.getElementById("runtimeshow");
    if (el && GLOBAL_CONFIG.runtime) {
      el.innerText =
        utils.timeDiff(new Date(GLOBAL_CONFIG.runtime), new Date()) +
        GLOBAL_CONFIG.lang.day;
    }
  },
  toTalk(txt) {
    const inputs = [
      "#wl-edit",
      ".el-textarea__inner",
      "#veditor",
      ".atk-textarea",
    ];
    inputs.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) {
        el.dispatchEvent(
          new Event("input", { bubble: true, cancelable: true })
        );
        el.value = "> " + txt.replace(/\n/g, "\n> ") + "\n\n";
        utils.scrollToDest(
          utils.getEleTop(document.getElementById("post-comment")),
          300
        );
        el.focus();
        el.setSelectionRange(-1, -1);
      }
    });
    utils.snackbarShow(GLOBAL_CONFIG.lang.totalk, false, 2000);
  },
  initbbtalk() {
    const bberTalkElement = document.querySelector("#bber-talk");
    if (bberTalkElement) {
      new Swiper(".swiper-container", {
        direction: "vertical",
        loop: true,
        autoplay: {
          delay: 3000,
          pauseOnMouseEnter: true,
        },
      });
    }
  },
  addPhotoFigcaption() {
    document
      .querySelectorAll(".article-container img:not(.gallery-item img)")
      .forEach((image) => {
        const captionText = image.getAttribute("alt");
        if (captionText) {
          image.insertAdjacentHTML(
            "afterend",
            `<div class="img-alt is-center">${utils.escapeHtml(
              captionText
            )}</div>`
          );
        }
      });
  },
  scrollToComment: () =>
    utils.scrollToDest(
      utils.getEleTop(document.getElementById("post-comment")),
      300
    ),
  setTimeState() {
    const el = document.getElementById("sayhi");
    if (el) {
      const hours = new Date().getHours();
      const lang = GLOBAL_CONFIG.aside.state;

      const localData = getLocalData([
        "twikoo",
        "WALINE_USER_META",
        "WALINE_USER",
        "_v_Cache_Meta",
        "ArtalkUser",
      ]);

      function getLocalData(keys) {
        for (let key of keys) {
          const data = localStorage.getItem(key);
          if (data) {
            return JSON.parse(data);
          }
        }
        return null;
      }
      const nick = localData ? localData.nick || localData.display_name : null;

      const prefix = this.wasPageHidden
        ? GLOBAL_CONFIG.aside.witty_comment.back + nick
        : GLOBAL_CONFIG.aside.witty_comment.prefix + nick;

      const greetings = [
        { start: 0, end: 5, text: nick ? prefix : lang.goodnight },
        { start: 6, end: 10, text: nick ? prefix : lang.morning },
        { start: 11, end: 14, text: nick ? prefix : lang.noon },
        { start: 15, end: 18, text: nick ? prefix : lang.afternoon },
        { start: 19, end: 24, text: nick ? prefix : lang.night },
      ];
      const greeting = greetings.find(
        (g) => hours >= g.start && hours <= g.end
      );
      el.innerText = greeting.text;
    }
  },
  tagPageActive() {
    const decodedPath = decodeURIComponent(window.location.pathname);
    const isTagPage = /\/tags\/.*?\//.test(decodedPath);
    if (isTagPage) {
      const tag = decodedPath.split("/").slice(-2, -1)[0];
      const tagElement = document.getElementById(tag);
      if (tagElement) {
        document.querySelectorAll("a.select").forEach((link) => {
          link.classList.remove("select");
        });
        tagElement.classList.add("select");
      }
    }
  },
  categoriesBarActive() {
    const categoryBar = document.querySelector("#category-bar");
    const currentPath = decodeURIComponent(window.location.pathname);
    const isHomePage = currentPath === GLOBAL_CONFIG.root;
    if (categoryBar) {
      const categoryItems = categoryBar.querySelectorAll(".category-bar-item");
      categoryItems.forEach((item) => item.classList.remove("select"));
      const activeItemId = isHomePage
        ? "category-bar-home"
        : currentPath.split("/").slice(-2, -1)[0];
      const activeItem = document.getElementById(activeItemId);
      if (activeItem) {
        activeItem.classList.add("select");
      }
    }
  },
  scrollCategoryBarToRight() {
    const scrollBar = document.getElementById("category-bar-items");
    const nextElement = document.getElementById("category-bar-next");
    if (scrollBar) {
      const isScrollBarAtEnd = () =>
        scrollBar.scrollLeft + scrollBar.clientWidth >=
        scrollBar.scrollWidth - 8;
      const scroll = () => {
        scrollBar.scroll({
          left: isScrollBarAtEnd() ? 0 : scrollBar.clientWidth,
          behavior: "smooth",
        });
      };
      scrollBar.addEventListener("scroll", () => {
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          nextElement.style.transform = isScrollBarAtEnd()
            ? "rotate(180deg)"
            : "";
        }, 150);
      });
      scroll();
    }
  },
  openAllTags() {
    document
      .querySelectorAll(".card-allinfo .card-tag-cloud")
      .forEach((tagCloudElement) => tagCloudElement.classList.add("all-tags"));
    document.getElementById("more-tags-btn")?.remove();
  },
  listenToPageInputPress() {
    const toGroup = document.querySelector(".toPageGroup");
    const pageText = document.getElementById("toPageText");
    if (!pageText) return;
    const pageButton = document.getElementById("toPageButton");
    const pageNumbers = document.querySelectorAll(".page-number");
    const lastPageNumber = +pageNumbers[pageNumbers.length - 1].textContent;
    if (!pageText || lastPageNumber === 1) {
      toGroup.style.display = "none";
      return;
    }
    pageText.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        sco.toPage();
        pjax.loadUrl(pageButton.href);
      }
    });
    pageText.addEventListener("input", () => {
      pageButton.classList.toggle(
        "haveValue",
        pageText.value !== "" && pageText.value !== "0"
      );
      if (+pageText.value > lastPageNumber) {
        pageText.value = lastPageNumber;
      }
    });
  },
  addNavBackgroundInit() {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop !== 0) {
      document
        .getElementById("page-header")
        .classList.add("nav-fixed", "nav-visible");
    }
  },
  toPage() {
    const pageNumbers = document.querySelectorAll(".page-number");
    const maxPageNumber = parseInt(
      pageNumbers[pageNumbers.length - 1].innerHTML
    );
    const inputElement = document.getElementById("toPageText");
    const inputPageNumber = parseInt(inputElement.value);
    document.getElementById("toPageButton").href =
      !isNaN(inputPageNumber) &&
      inputPageNumber <= maxPageNumber &&
      inputPageNumber > 1
        ? window.location.href.replace(/\/page\/\d+\/$/, "/") +
          "page/" +
          inputPageNumber +
          "/"
        : "/";
  },
  owoBig(owoSelector) {
    let owoBig = document.getElementById("owo-big");
    if (!owoBig) {
      owoBig = document.createElement("div");
      owoBig.id = "owo-big";
      document.body.appendChild(owoBig);
    }
    const showOwoBig = (event) => {
      const target = event.target;
      const owoItem = target.closest(owoSelector.item);
      if (owoItem && target.closest(owoSelector.body)) {
        const imgSrc = owoItem.querySelector("img")?.src;
        if (imgSrc) {
          owoBig.innerHTML = `<img src="${imgSrc}" style="max-width: 100%; height: auto;">`;
          owoBig.style.display = "block";
          positionOwoBig(owoItem);
        }
      }
    };
    const hideOwoBig = (event) => {
      if (
        event.target.closest(owoSelector.item) &&
        event.target.closest(owoSelector.body)
      ) {
        owoBig.style.display = "none";
      }
    };
    const positionOwoBig = (owoItem) => {
      const itemRect = owoItem.getBoundingClientRect();
      owoBig.style.left = `${itemRect.left - owoBig.offsetWidth / 4}px`;
      owoBig.style.top = `${itemRect.top}px`;
    };
    document.addEventListener("mouseover", showOwoBig);
    document.addEventListener("mouseout", hideOwoBig);
  },
  changeTimeFormat(selector) {
    selector.forEach((item) => {
      const timeVal = item.getAttribute("datetime");
      item.textContent = utils.diffDate(timeVal, true);
      item.style.display = "inline";
    });
  },
  switchComments() {
    const switchBtn = document.getElementById("switch-btn");
    if (!switchBtn) return;
    let switchDone = false;
    const commentContainer = document.getElementById("post-comment");
    const handleSwitchBtn = () => {
      commentContainer.classList.toggle("move");
      if (!switchDone && typeof loadTwoComment === "function") {
        switchDone = true;
        loadTwoComment();
      }
    };
    utils.addEventListenerPjax(switchBtn, "click", handleSwitchBtn);
  },
  homeTypeit() {
    if (typeof home_subtitle === "undefined") return;
    const ty = new TypeIt(".banners-title-small", {
      speed: 200,
      waitUntilVisible: true,
      loop: true,
      lifeLike: true,
    });
    home_subtitle.forEach((item) => {
      ty.type(item).pause(500).delete(item);
    });
    ty.go();
  },
};

const addHighlight = () => {
  const highlight = GLOBAL_CONFIG.highlight;
  if (!highlight) return;
  const { copy, expand, limit, syntax } = highlight;
  const $isPrismjs = syntax === "prismjs";
  const $isShowTool = highlight.enable || copy || expand || limit;
  const expandClass = expand ? "" : "closed";
  const $syntaxHighlight =
    syntax === "highlight.js"
      ? document.querySelectorAll("figure.highlight")
      : document.querySelectorAll('pre[class*="language-"]');

  if (!(($isShowTool || limit) && $syntaxHighlight.length)) return;

  const copyEle = copy
    ? `<i class="solitude fas fa-copy copy-button"></i>`
    : "<i></i>";
  const expandEle = `<i class="solitude fas fa-angle-down expand"></i>`;
  const limitEle = limit
    ? `<i class="solitude fas fa-angles-down"></i>`
    : "<i></i>";

  const alertInfo = (ele, text) => utils.snackbarShow(text, false, 2000);

  const copyFn = (e) => {
    const $buttonParent = e.parentNode;
    $buttonParent.classList.add("copy-true");
    const selection = window.getSelection();
    const range = document.createRange();
    const preCodeSelector = $isPrismjs ? "pre code" : "table .code pre";
    range.selectNodeContents(
      $buttonParent.querySelectorAll(`${preCodeSelector}`)[0]
    );
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    alertInfo(e.lastChild, GLOBAL_CONFIG.lang.copy.success);
    selection.removeAllRanges();
    $buttonParent.classList.remove("copy-true");
  };

  const expandClose = (e) => e.classList.toggle("closed");
  const shrinkEle = function () {
    this.classList.toggle("expand-done");
  };

  const ToolsFn = function (e) {
    const $target = e.target.classList;
    if ($target.contains("expand")) expandClose(this);
    else if ($target.contains("copy-button")) copyFn(this);
  };

  const createEle = (lang, item, service) => {
    const fragment = document.createDocumentFragment();
    if ($isShowTool) {
      const captionItem = item.querySelector("figcaption");
      let caption = "";
      if (captionItem) {
        caption = `<div class="caption">${captionItem.innerHTML}</div>`;
        item.removeChild(captionItem);
      }
      const hlTools = document.createElement("div");
      hlTools.className = `highlight-tools ${expandClass}`;
      hlTools.innerHTML = expandEle + lang + caption + copyEle;
      utils.addEventListenerPjax(hlTools, "click", ToolsFn);
      fragment.appendChild(hlTools);
    }
    if (limit && item.offsetHeight > limit + 30) {
      const ele = document.createElement("div");
      ele.className = "code-expand-btn";
      ele.innerHTML = limitEle;
      utils.addEventListenerPjax(ele, "click", shrinkEle);
      fragment.appendChild(ele);
    }
    if (service === "hl") {
      item.insertBefore(fragment, item.firstChild);
    } else {
      item.parentNode.insertBefore(fragment, item);
    }
  };

  if ($isPrismjs) {
    $syntaxHighlight.forEach((item) => {
      const langName = item.getAttribute("data-language") || "Code";
      const highlightLangEle = `<div class="code-lang">${utils.escapeHtml(
        langName
      )}</div>`;
      utils.wrap(item, "figure", { class: "highlight" });
      createEle(highlightLangEle, item);
    });
  } else {
    $syntaxHighlight.forEach((item) => {
      let langName = item.getAttribute("class").split(" ")[1];
      if (langName === "plain" || langName === undefined) langName = "Code";
      const highlightLangEle = `<div class="code-lang">${utils.escapeHtml(
        langName
      )}</div>`;
      createEle(highlightLangEle, item, "hl");
    });
  }
};

class toc {
  static init() {
    const tocContainer = document.getElementById("card-toc");
    if (!tocContainer || !tocContainer.querySelector(".toc a")) {
      tocContainer.style.display = "none";
      return;
    }
    const el = document.querySelectorAll(".toc a");
    el.forEach((e) => {
      e.addEventListener("click", (event) => {
        event.preventDefault();
        utils.scrollToDest(
          utils.getEleTop(
            document.getElementById(
              decodeURI(
                (event.target.className === "toc-text"
                  ? event.target.parentNode.hash
                  : event.target.hash
                ).replace("#", "")
              )
            )
          ),
          300
        );
      });
    });
    this.active(el);
  }

  static active(toc) {
    const $article = document.querySelector(".article-container");
    const $tocContent = document.getElementById("toc-content");
    const list = $article.querySelectorAll("h1,h2,h3,h4,h5,h6");
    let detectItem = "";

    const autoScroll = (el) => {
      const activePosition = el.getBoundingClientRect().top;
      const sidebarScrollTop = $tocContent.scrollTop;
      if (activePosition > document.documentElement.clientHeight - 100) {
        $tocContent.scrollTop = sidebarScrollTop + 150;
      }
      if (activePosition < 100) {
        $tocContent.scrollTop = sidebarScrollTop - 150;
      }
    };

    const findHeadPosition = (top) => {
      if (top === 0) return false;
      let currentIndex = "";
      list.forEach((ele, index) => {
        if (top > utils.getEleTop(ele) - 80) {
          currentIndex = index;
        }
      });
      if (detectItem === currentIndex) return;
      detectItem = currentIndex;
      document.querySelectorAll(".toc .active").forEach((i) => {
        i.classList.remove("active");
      });
      const activeitem = toc[detectItem];
      if (activeitem) {
        let parent = toc[detectItem].parentNode;
        activeitem.classList.add("active");
        autoScroll(activeitem);
        for (; !parent.matches(".toc"); parent = parent.parentNode) {
          if (parent.matches("li")) parent.classList.add("active");
        }
      }
    };

    window.tocScrollFn = utils.throttle(() => {
      const currentTop = window.scrollY || document.documentElement.scrollTop;
      findHeadPosition(currentTop);
    }, 100);
    window.addEventListener("scroll", tocScrollFn);
  }
}

class tabs {
  static init() {
    this.clickFnOfTabs();
  }

  static clickFnOfTabs() {
    document
      .querySelectorAll(".article-container .tab > button")
      .forEach((item) => {
        item.addEventListener("click", function () {
          const $tabItem = this.parentNode;
          if (!$tabItem.classList.contains("active")) {
            const $tabContent = $tabItem.parentNode.nextElementSibling;
            const $siblings = utils.siblings($tabItem, ".active")[0];
            $siblings && $siblings.classList.remove("active");
            $tabItem.classList.add("active");
            const tabId = this.getAttribute("data-href").replace("#", "");
            [...$tabContent.children].forEach((item) => {
              item.classList.toggle("active", item.id === tabId);
            });
          }
        });
      });
  }

  static lureAddListener() {
    if (!GLOBAL_CONFIG.lure) return;
    const title = document.title;
    document.addEventListener("visibilitychange", () => {
      const { lure } = GLOBAL_CONFIG;
      document.title =
        document.visibilityState === "hidden" ? lure.jump : lure.back;
      if (document.visibilityState === "visible") {
        setTimeout(() => {
          document.title = title;
        }, 2000);
      }
    });
  }

  static expireAddListener() {
    const { expire } = GLOBAL_CONFIG;
    if (!expire) return;
    const list = document.querySelectorAll(".post-meta-date time");
    const post_date = list.length
      ? list[list.length - 1]
      : document.querySelector(".datetime");
    if (!post_date) return;
    const ex = Math.ceil(
      (new Date().getTime() -
        new Date(post_date.getAttribute("datetime")).getTime()) /
        1000 /
        60 /
        60 /
        24
    );
    if (expire.time > ex) return;
    const ele = document.createElement("div");
    ele.className = "expire";
    ele.innerHTML = `<i class="solitude fas fa-circle-exclamation"></i>${
      expire.text_prev
    }${-(expire.time - ex)}${expire.text_next}`;
    const articleContainer = document.querySelector(".article-container");
    articleContainer.insertAdjacentElement(
      expire.position === "top" ? "afterbegin" : "beforeend",
      ele
    );
  }
}

const scrollFnToDo = () => {
  const { toc } = PAGE_CONFIG;

  if (toc) {
    const $cardTocLayout = document.getElementById("card-toc");
    const $cardToc = $cardTocLayout.querySelector(".toc-content");
    const tocItemClickFn = (e) => {
      const target = e.target.closest(".toc-link");
      if (!target) return;

      e.preventDefault();
      utils.scrollToDest(
        utils.getEleTop(
          document.getElementById(
            decodeURI(target.getAttribute("href")).replace("#", "")
          )
        ),
        300
      );
      if (window.innerWidth < 900) {
        $cardTocLayout.classList.remove("open");
      }
    };
    utils.addEventListenerPjax($cardToc, "click", tocItemClickFn);
  }
};

const forPostFn = () => {
  scrollFnToDo();
};

window.refreshFn = () => {
  const { is_home, is_page, page, is_post, ai_text } = PAGE_CONFIG;
  const { runtime, lazyload, lightbox, randomlink, covercolor, lure, expire } =
    GLOBAL_CONFIG;
  const timeSelector = ".datetime, .webinfo-item time, .post-meta-date time";
  document.body.setAttribute("data-type", page);
  sco.changeTimeFormat(document.querySelectorAll(timeSelector));
  runtime && sco.addRuntime();
  [
    scrollFn,
    sidebarFn,
    sco.addPhotoFigcaption,
    sco.setTimeState,
    sco.tagPageActive,
    sco.categoriesBarActive,
    sco.listenToPageInputPress,
    sco.musicBind,
    sco.addNavBackgroundInit,
    sco.refreshWaterFall,
  ].forEach((fn) => fn());
  lazyload.enable && utils.lazyloadImg();
  lightbox &&
    utils.lightbox(
      document.querySelectorAll(
        ".article-container img:not(.flink-avatar,.gallery-group img, .no-lightbox)"
      )
    );
  randomlink && randomLinksList();
  if (is_post) {
    if (ai_text) {
      ai.init();
    }
  }
  sco.switchComments();
  initObserver();
  if (is_home) {
    showTodayCard();
    sco.homeTypeit();
  }
  typeof updatePostsBasedOnComments === "function" &&
    updatePostsBasedOnComments();
  if (is_post || is_page) {
    addHighlight();
    tabs.init();
  }
  if (is_post && expire) {
    tabs.expireAddListener();
  }
  if (covercolor.enable) coverColor();
  if (PAGE_CONFIG.toc) toc.init();
  if (lure) tabs.lureAddListener();
  page === "music" && initializeMusicPlayer();
  forPostFn();
};

document.addEventListener("DOMContentLoaded", () => {
  [
    addCopyright,
    window.refreshFn,
    asideStatus,
    () => (window.onscroll = percent),
    sco.initConsoleState,
  ].forEach((fn) => fn());
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    sco.wasPageHidden = true;
  }
});

window.onkeydown = (e) => {
  const { code, ctrlKey, shiftKey } = e;
  if (
    code === "F12" ||
    (ctrlKey && shiftKey && (code === "KeyI" || code === "KeyC"))
  ) {
    utils.snackbarShow(GLOBAL_CONFIG.lang.f12, false, 3000);
  }
  if (code === "Escape") {
    sco.hideConsole();
  }
};

document.addEventListener("copy", () => {
  utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success, false, 3000);
});
