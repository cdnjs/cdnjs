/* utils function */
import { navbarShrink } from "./layouts/navbarShrink.js";
import { initTOC } from "./layouts/toc.js";
import { main } from "./main.js";
import imageViewer from "./tools/imageViewer.js";

export const navigationState = {
  isNavigating: false,
};

export default function initUtils() {
  const utils = {
    html_root_dom: document.querySelector("html"),
    pageContainer_dom: document.querySelector(".page-container"),
    pageTop_dom: document.querySelector(".main-content-header"),
    homeBanner_dom: document.querySelector(".home-banner-container"),
    homeBannerBackground_dom: document.querySelector(".home-banner-background"),
    scrollProgressBar_dom: document.querySelector(".scroll-progress-bar"),
    pjaxProgressBar_dom: document.querySelector(".pjax-progress-bar"),
    pjaxProgressIcon_dom: document.querySelector(".swup-progress-icon"),
    backToTopButton_dom: document.querySelector(".tool-scroll-to-top"),
    toolsList: document.querySelector(".hidden-tools-list"),
    toggleButton: document.querySelector(".toggle-tools-list"),

    innerHeight: window.innerHeight,
    pjaxProgressBarTimer: null,
    prevScrollValue: 0,
    fontSizeLevel: 0,
    triggerViewHeight: 0.5 * window.innerHeight,

    isHasScrollProgressBar: theme.global.scroll_progress.bar === true,
    isHasScrollPercent: theme.global.scroll_progress.percentage === true,

    // Scroll Style
    updateScrollStyle() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const percent = this.calculatePercentage(
        scrollTop,
        scrollHeight,
        clientHeight,
      );

      this.updateScrollProgressBar(percent);
      this.updateScrollPercent(percent);
      this.updatePageTopVisibility(scrollTop, clientHeight);

      this.prevScrollValue = scrollTop;
    },

    updateScrollProgressBar(percent) {
      if (this.isHasScrollProgressBar) {
        const progressPercent = percent.toFixed(3);
        const visibility = percent === 0 ? "hidden" : "visible";

        this.scrollProgressBar_dom.style.visibility = visibility;
        this.scrollProgressBar_dom.style.width = `${progressPercent}%`;
      }
    },

    updateScrollPercent(percent) {
      if (this.isHasScrollPercent) {
        const percentDom = this.backToTopButton_dom.querySelector(".percent");
        const showButton = percent !== 0 && percent !== undefined;

        this.backToTopButton_dom.classList.toggle("show", showButton);
        percentDom.innerHTML = percent.toFixed(0);
      }
    },

    updatePageTopVisibility(scrollTop, clientHeight) {
      if (theme.navbar.auto_hide) {
        const prevScrollValue = this.prevScrollValue;
        const hidePageTop =
          prevScrollValue > clientHeight && scrollTop > prevScrollValue;

        this.pageTop_dom.classList.toggle("hide", hidePageTop);
      } else {
        this.pageTop_dom.classList.remove("hide");
      }
    },

    calculatePercentage(scrollTop, scrollHeight, clientHeight) {
      return Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
    },

    // register window scroll event
    registerWindowScroll() {
      window.addEventListener("scroll", () => {
        this.updateScrollStyle();
        this.updateTOCScroll();
        this.updateNavbarShrink();
        // this.updateHomeBannerBlur();
        this.updateAutoHideTools();
        this.updateAPlayerAutoHide();
      });
      window.addEventListener(
        "scroll",
        this.debounce(() => this.updateHomeBannerBlur(), 80),
      );
    },

    updateTOCScroll() {
      if (
        theme.articles.toc.enable &&
        initTOC().hasOwnProperty("updateActiveTOCLink")
      ) {
        initTOC().updateActiveTOCLink();
      }
    },

    updateNavbarShrink() {
      if (!navigationState.isNavigating) {
        navbarShrink.init();
      }
    },

    debounce(func, delay) {
      let timer;
      return function () {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, arguments), delay);
      };
    },

    updateHomeBannerBlur() {
      if (!this.homeBannerBackground_dom) return;

      if (
        theme.home_banner.style === "fixed" &&
        location.pathname === config.root
      ) {
        const scrollY = window.scrollY || window.pageYOffset;
        const blurValue = scrollY >= this.triggerViewHeight ? 15 : 0;

        try {
          requestAnimationFrame(() => {
            this.homeBannerBackground_dom.style.transition = "0.3s";
            this.homeBannerBackground_dom.style.webkitFilter = `blur(${blurValue}px)`;
          });
        } catch (e) {
          // Handle or log the error properly
          console.error("Error updating banner blur:", e);
        }
      }
    },

    updateAutoHideTools() {
      const y = window.pageYOffset;
      const height = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const toolList = document.getElementsByClassName(
        "right-side-tools-container",
      );

      for (let i = 0; i < toolList.length; i++) {
        const tools = toolList[i];
        if (y <= 0) {
          if (location.pathname !== "/") {
            //console.log(location.pathname)
          } else {
            tools.classList.add("hide");
          }
        } else if (y + windowHeight >= height - 20) {
          tools.classList.add("hide");
        } else {
          tools.classList.remove("hide");
        }
      }
    },

    updateAPlayerAutoHide() {
      const aplayer = document.getElementById("aplayer");
      if (aplayer == null) {
      } else {
        const y = window.pageYOffset;
        const height = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        if (y <= 0) {
          if (location.pathname !== "/") {
            //console.log(location.pathname)
          } else {
            aplayer.classList.add("hide");
          }
        } else if (y + windowHeight >= height - 20) {
          aplayer.classList.add("hide");
        } else {
          aplayer.classList.remove("hide");
        }
      }
    },

    toggleToolsList() {
      this.toggleButton.addEventListener("click", () => {
        this.toolsList.classList.toggle("show");
      });
    },

    fontAdjPlus_dom: document.querySelector(".tool-font-adjust-plus"),
    fontAdMinus_dom: document.querySelector(".tool-font-adjust-minus"),
    globalFontSizeAdjust() {
      const htmlRoot = this.html_root_dom;
      const fontAdjustPlus = this.fontAdjPlus_dom;
      const fontAdjustMinus = this.fontAdMinus_dom;

      const fontSize = document.defaultView.getComputedStyle(
        document.body,
      ).fontSize;
      const baseFontSize = parseFloat(fontSize);

      let fontSizeLevel = 0;
      const styleStatus = main.getStyleStatus();
      if (styleStatus) {
        fontSizeLevel = styleStatus.fontSizeLevel;
        setFontSize(fontSizeLevel);
      }

      function setFontSize(level) {
        const fontSize = baseFontSize * (1 + level * 0.05);
        htmlRoot.style.fontSize = `${fontSize}px`;
        main.styleStatus.fontSizeLevel = level;
        main.setStyleStatus();
      }

      function increaseFontSize() {
        fontSizeLevel = Math.min(fontSizeLevel + 1, 5);
        setFontSize(fontSizeLevel);
      }

      function decreaseFontSize() {
        fontSizeLevel = Math.max(fontSizeLevel - 1, 0);
        setFontSize(fontSizeLevel);
      }

      fontAdjustPlus.addEventListener("click", increaseFontSize);
      fontAdjustMinus.addEventListener("click", decreaseFontSize);
    },
    // go comment anchor
    goComment() {
      this.goComment_dom = document.querySelector(".go-comment");
      if (this.goComment_dom) {
        this.goComment_dom.addEventListener("click", () => {
          const target = document.querySelector("#comment-anchor");
          if (target) {
            const offset = target.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
              top: offset,
              behavior: "smooth",
            });
          }
        });
      }
    },

    // get dom element height
    getElementHeight(selectors) {
      const dom = document.querySelector(selectors);
      return dom ? dom.getBoundingClientRect().height : 0;
    },

    // init first screen height
    inithomeBannerHeight() {
      this.homeBanner_dom &&
        (this.homeBanner_dom.style.height = this.innerHeight + "px");
    },

    // init page height handle
    initPageHeightHandle() {
      if (this.homeBanner_dom) return;
      const temp_h1 = this.getElementHeight(".main-content-header");
      const temp_h2 = this.getElementHeight(".main-content-body");
      const temp_h3 = this.getElementHeight(".main-content-footer");
      const allDomHeight = temp_h1 + temp_h2 + temp_h3;
      const innerHeight = window.innerHeight;
      const pb_dom = document.querySelector(".main-content-footer");
      if (allDomHeight < innerHeight) {
        const marginTopValue = Math.floor(innerHeight - allDomHeight);
        if (marginTopValue > 0) {
          pb_dom.style.marginTop = `${marginTopValue - 2}px`;
        }
      }
    },

    // big image viewer

    // set how long ago language
    setHowLongAgoLanguage(p1, p2) {
      return p2.replace(/%s/g, p1);
    },

    getHowLongAgo(timestamp) {
      const l = lang_ago;

      const __Y = Math.floor(timestamp / (60 * 60 * 24 * 30) / 12);
      const __M = Math.floor(timestamp / (60 * 60 * 24 * 30));
      const __W = Math.floor(timestamp / (60 * 60 * 24) / 7);
      const __d = Math.floor(timestamp / (60 * 60 * 24));
      const __h = Math.floor((timestamp / (60 * 60)) % 24);
      const __m = Math.floor((timestamp / 60) % 60);
      const __s = Math.floor(timestamp % 60);

      if (__Y > 0) {
        return this.setHowLongAgoLanguage(__Y, l.year);
      } else if (__M > 0) {
        return this.setHowLongAgoLanguage(__M, l.month);
      } else if (__W > 0) {
        return this.setHowLongAgoLanguage(__W, l.week);
      } else if (__d > 0) {
        return this.setHowLongAgoLanguage(__d, l.day);
      } else if (__h > 0) {
        return this.setHowLongAgoLanguage(__h, l.hour);
      } else if (__m > 0) {
        return this.setHowLongAgoLanguage(__m, l.minute);
      } else if (__s > 0) {
        return this.setHowLongAgoLanguage(__s, l.second);
      }
    },

    relativeTimeInHome() {
      const post = document.querySelectorAll(
        ".home-article-meta-info .home-article-date",
      );
      const df = theme.home.article_date_format;
      if (df === "relative") {
        post &&
          post.forEach((v) => {
            const nowDate = Date.now();
            const postDate = new Date(
              v.dataset.date.split(" GMT")[0],
            ).getTime();
            v.innerHTML = this.getHowLongAgo(
              Math.floor((nowDate - postDate) / 1000),
            );
          });
      } else if (df === "auto") {
        post &&
          post.forEach((v) => {
            const nowDate = Date.now();
            const postDate = new Date(
              v.dataset.date.split(" GMT")[0],
            ).getTime();
            const finalDays = Math.floor(
              (nowDate - postDate) / (60 * 60 * 24 * 1000),
            );
            if (finalDays < 7) {
              v.innerHTML = this.getHowLongAgo(
                Math.floor((nowDate - postDate) / 1000),
              );
            }
          });
      }
    },
  };

  // init scroll
  utils.registerWindowScroll();

  // toggle show tools list
  utils.toggleToolsList();

  // main font adjust
  utils.globalFontSizeAdjust();

  // go comment
  utils.goComment();

  // init page height handle
  utils.initPageHeightHandle();

  // init first screen height
  utils.inithomeBannerHeight();

  // set how long ago in home article block
  utils.relativeTimeInHome();

  // image viewer handle
  imageViewer();
}
