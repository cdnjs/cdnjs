/*!
 * Jarallax v2.0.4 (https://github.com/nk-o/jarallax)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.jarallax = factory());
})(this, (function () { 'use strict';

  function ready(callback) {
    if ('complete' === document.readyState || 'interactive' === document.readyState) {
      // Already ready or interactive, execute callback
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback, {
        capture: true,
        once: true,
        passive: true
      });
    }
  }

  /* eslint-disable import/no-mutable-exports */

  /* eslint-disable no-restricted-globals */
  let win;

  if ('undefined' !== typeof window) {
    win = window;
  } else if ('undefined' !== typeof global) {
    win = global;
  } else if ('undefined' !== typeof self) {
    win = self;
  } else {
    win = {};
  }

  var global$1 = win;

  const {
    navigator
  } = global$1;
  const isMobile = /*#__PURE__*/ /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  let $deviceHelper;
  /**
   * The most popular mobile browsers changes height after page scroll and this generates image jumping.
   * We can fix it using this workaround with vh units.
   */

  function getDeviceHeight() {
    if (!$deviceHelper && document.body) {
      $deviceHelper = document.createElement('div');
      $deviceHelper.style.cssText = 'position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;';
      document.body.appendChild($deviceHelper);
    }

    return ($deviceHelper ? $deviceHelper.clientHeight : 0) || global$1.innerHeight || document.documentElement.clientHeight;
  } // Window height data


  let wndH;

  function updateWndVars() {
    if (isMobile) {
      wndH = getDeviceHeight();
    } else {
      wndH = global$1.innerHeight || document.documentElement.clientHeight;
    }
  }

  updateWndVars();
  global$1.addEventListener('resize', updateWndVars);
  global$1.addEventListener('orientationchange', updateWndVars);
  global$1.addEventListener('load', updateWndVars);
  ready(() => {
    updateWndVars();
  }); // list with all jarallax instances
  // need to render all in one scroll/resize event

  const jarallaxList = []; // get all parents of the element.

  function getParents(elem) {
    const parents = [];

    while (null !== elem.parentElement) {
      elem = elem.parentElement;

      if (1 === elem.nodeType) {
        parents.push(elem);
      }
    }

    return parents;
  }

  function updateParallax() {
    if (!jarallaxList.length) {
      return;
    }

    jarallaxList.forEach((data, k) => {
      const {
        instance,
        oldData
      } = data;
      const clientRect = instance.$item.getBoundingClientRect();
      const newData = {
        width: clientRect.width,
        height: clientRect.height,
        top: clientRect.top,
        bottom: clientRect.bottom,
        wndW: global$1.innerWidth,
        wndH
      };
      const isResized = !oldData || oldData.wndW !== newData.wndW || oldData.wndH !== newData.wndH || oldData.width !== newData.width || oldData.height !== newData.height;
      const isScrolled = isResized || !oldData || oldData.top !== newData.top || oldData.bottom !== newData.bottom;
      jarallaxList[k].oldData = newData;

      if (isResized) {
        instance.onResize();
      }

      if (isScrolled) {
        instance.onScroll();
      }
    });
    global$1.requestAnimationFrame(updateParallax);
  }

  let instanceID = 0; // Jarallax class

  class Jarallax {
    constructor(item, userOptions) {
      const self = this;
      self.instanceID = instanceID;
      instanceID += 1;
      self.$item = item;
      self.defaults = {
        type: 'scroll',
        // type of parallax: scroll, scale, opacity, scale-opacity, scroll-opacity
        speed: 0.5,
        // supported value from -1 to 2
        imgSrc: null,
        imgElement: '.jarallax-img',
        imgSize: 'cover',
        imgPosition: '50% 50%',
        imgRepeat: 'no-repeat',
        // supported only for background, not for <img> tag
        keepImg: false,
        // keep <img> tag in it's default place
        elementInViewport: null,
        zIndex: -100,
        disableParallax: false,
        disableVideo: false,
        // video
        videoSrc: null,
        videoStartTime: 0,
        videoEndTime: 0,
        videoVolume: 0,
        videoLoop: true,
        videoPlayOnlyVisible: true,
        videoLazyLoading: true,
        // events
        onScroll: null,
        // function(calculations) {}
        onInit: null,
        // function() {}
        onDestroy: null,
        // function() {}
        onCoverImage: null // function() {}

      }; // prepare data-options

      const dataOptions = self.$item.dataset || {};
      const pureDataOptions = {};
      Object.keys(dataOptions).forEach(key => {
        const loweCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);

        if (loweCaseOption && 'undefined' !== typeof self.defaults[loweCaseOption]) {
          pureDataOptions[loweCaseOption] = dataOptions[key];
        }
      });
      self.options = self.extend({}, self.defaults, pureDataOptions, userOptions);
      self.pureOptions = self.extend({}, self.options); // prepare 'true' and 'false' strings to boolean

      Object.keys(self.options).forEach(key => {
        if ('true' === self.options[key]) {
          self.options[key] = true;
        } else if ('false' === self.options[key]) {
          self.options[key] = false;
        }
      }); // fix speed option [-1.0, 2.0]

      self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed))); // prepare disableParallax callback

      if ('string' === typeof self.options.disableParallax) {
        self.options.disableParallax = new RegExp(self.options.disableParallax);
      }

      if (self.options.disableParallax instanceof RegExp) {
        const disableParallaxRegexp = self.options.disableParallax;

        self.options.disableParallax = () => disableParallaxRegexp.test(navigator.userAgent);
      }

      if ('function' !== typeof self.options.disableParallax) {
        self.options.disableParallax = () => false;
      } // prepare disableVideo callback


      if ('string' === typeof self.options.disableVideo) {
        self.options.disableVideo = new RegExp(self.options.disableVideo);
      }

      if (self.options.disableVideo instanceof RegExp) {
        const disableVideoRegexp = self.options.disableVideo;

        self.options.disableVideo = () => disableVideoRegexp.test(navigator.userAgent);
      }

      if ('function' !== typeof self.options.disableVideo) {
        self.options.disableVideo = () => false;
      } // custom element to check if parallax in viewport


      let elementInVP = self.options.elementInViewport; // get first item from array

      if (elementInVP && 'object' === typeof elementInVP && 'undefined' !== typeof elementInVP.length) {
        [elementInVP] = elementInVP;
      } // check if dom element


      if (!(elementInVP instanceof Element)) {
        elementInVP = null;
      }

      self.options.elementInViewport = elementInVP;
      self.image = {
        src: self.options.imgSrc || null,
        $container: null,
        useImgTag: false,
        // 1. Position fixed is needed for the most of browsers because absolute position have glitches
        // 2. On MacOS with smooth scroll there is a huge lags with absolute position - https://github.com/nk-o/jarallax/issues/75
        // 3. Previously used 'absolute' for mobile devices. But we re-tested on iPhone 12 and 'fixed' position is working better, then 'absolute', so for now position is always 'fixed'
        position: 'fixed'
      };

      if (self.initImg() && self.canInitParallax()) {
        self.init();
      }
    } // add styles to element
    // eslint-disable-next-line class-methods-use-this


    css(el, styles) {
      if ('string' === typeof styles) {
        return global$1.getComputedStyle(el).getPropertyValue(styles);
      }

      Object.keys(styles).forEach(key => {
        el.style[key] = styles[key];
      });
      return el;
    } // Extend like jQuery.extend
    // eslint-disable-next-line class-methods-use-this


    extend(out, ...args) {
      out = out || {};
      Object.keys(args).forEach(i => {
        if (!args[i]) {
          return;
        }

        Object.keys(args[i]).forEach(key => {
          out[key] = args[i][key];
        });
      });
      return out;
    } // get window size and scroll position. Useful for extensions
    // eslint-disable-next-line class-methods-use-this


    getWindowData() {
      return {
        width: global$1.innerWidth || document.documentElement.clientWidth,
        height: wndH,
        y: document.documentElement.scrollTop
      };
    } // Jarallax functions


    initImg() {
      const self = this; // find image element

      let $imgElement = self.options.imgElement;

      if ($imgElement && 'string' === typeof $imgElement) {
        $imgElement = self.$item.querySelector($imgElement);
      } // check if dom element


      if (!($imgElement instanceof Element)) {
        if (self.options.imgSrc) {
          $imgElement = new Image();
          $imgElement.src = self.options.imgSrc;
        } else {
          $imgElement = null;
        }
      }

      if ($imgElement) {
        if (self.options.keepImg) {
          self.image.$item = $imgElement.cloneNode(true);
        } else {
          self.image.$item = $imgElement;
          self.image.$itemParent = $imgElement.parentNode;
        }

        self.image.useImgTag = true;
      } // true if there is img tag


      if (self.image.$item) {
        return true;
      } // get image src


      if (null === self.image.src) {
        self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        self.image.bgImage = self.css(self.$item, 'background-image');
      }

      return !(!self.image.bgImage || 'none' === self.image.bgImage);
    }

    canInitParallax() {
      return !this.options.disableParallax();
    }

    init() {
      const self = this;
      const containerStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      };
      let imageStyles = {
        pointerEvents: 'none',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      };

      if (!self.options.keepImg) {
        // save default user styles
        const curStyle = self.$item.getAttribute('style');

        if (curStyle) {
          self.$item.setAttribute('data-jarallax-original-styles', curStyle);
        }

        if (self.image.useImgTag) {
          const curImgStyle = self.image.$item.getAttribute('style');

          if (curImgStyle) {
            self.image.$item.setAttribute('data-jarallax-original-styles', curImgStyle);
          }
        }
      } // set relative position and z-index to the parent


      if ('static' === self.css(self.$item, 'position')) {
        self.css(self.$item, {
          position: 'relative'
        });
      }

      if ('auto' === self.css(self.$item, 'z-index')) {
        self.css(self.$item, {
          zIndex: 0
        });
      } // container for parallax image


      self.image.$container = document.createElement('div');
      self.css(self.image.$container, containerStyles);
      self.css(self.image.$container, {
        'z-index': self.options.zIndex
      }); // it will remove some image overlapping
      // overlapping occur due to an image position fixed inside absolute position element
      // needed only when background in fixed position

      if ('fixed' === this.image.position) {
        self.css(self.image.$container, {
          '-webkit-clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
        });
      }

      self.image.$container.setAttribute('id', `jarallax-container-${self.instanceID}`);
      self.$item.appendChild(self.image.$container); // use img tag

      if (self.image.useImgTag) {
        imageStyles = self.extend({
          'object-fit': self.options.imgSize,
          'object-position': self.options.imgPosition,
          'max-width': 'none'
        }, containerStyles, imageStyles); // use div with background image
      } else {
        self.image.$item = document.createElement('div');

        if (self.image.src) {
          imageStyles = self.extend({
            'background-position': self.options.imgPosition,
            'background-size': self.options.imgSize,
            'background-repeat': self.options.imgRepeat,
            'background-image': self.image.bgImage || `url("${self.image.src}")`
          }, containerStyles, imageStyles);
        }
      }

      if ('opacity' === self.options.type || 'scale' === self.options.type || 'scale-opacity' === self.options.type || 1 === self.options.speed) {
        self.image.position = 'absolute';
      } // 1. Check if one of parents have transform style (without this check, scroll transform will be inverted if used parallax with position fixed)
      //    discussion - https://github.com/nk-o/jarallax/issues/9
      // 2. Check if parents have overflow scroll


      if ('fixed' === self.image.position) {
        const $parents = getParents(self.$item).filter(el => {
          const styles = global$1.getComputedStyle(el);
          const parentTransform = styles['-webkit-transform'] || styles['-moz-transform'] || styles.transform;
          const overflowRegex = /(auto|scroll)/;
          return parentTransform && 'none' !== parentTransform || overflowRegex.test(styles.overflow + styles['overflow-y'] + styles['overflow-x']);
        });
        self.image.position = $parents.length ? 'absolute' : 'fixed';
      } // add position to parallax block


      imageStyles.position = self.image.position; // insert parallax image

      self.css(self.image.$item, imageStyles);
      self.image.$container.appendChild(self.image.$item); // set initial position and size

      self.onResize();
      self.onScroll(true); // call onInit event

      if (self.options.onInit) {
        self.options.onInit.call(self);
      } // remove default user background


      if ('none' !== self.css(self.$item, 'background-image')) {
        self.css(self.$item, {
          'background-image': 'none'
        });
      }

      self.addToParallaxList();
    } // add to parallax instances list


    addToParallaxList() {
      jarallaxList.push({
        instance: this
      });

      if (1 === jarallaxList.length) {
        global$1.requestAnimationFrame(updateParallax);
      }
    } // remove from parallax instances list


    removeFromParallaxList() {
      const self = this;
      jarallaxList.forEach((data, key) => {
        if (data.instance.instanceID === self.instanceID) {
          jarallaxList.splice(key, 1);
        }
      });
    }

    destroy() {
      const self = this;
      self.removeFromParallaxList(); // return styles on container as before jarallax init

      const originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');
      self.$item.removeAttribute('data-jarallax-original-styles'); // null occurs if there is no style tag before jarallax init

      if (!originalStylesTag) {
        self.$item.removeAttribute('style');
      } else {
        self.$item.setAttribute('style', originalStylesTag);
      }

      if (self.image.useImgTag) {
        // return styles on img tag as before jarallax init
        const originalStylesImgTag = self.image.$item.getAttribute('data-jarallax-original-styles');
        self.image.$item.removeAttribute('data-jarallax-original-styles'); // null occurs if there is no style tag before jarallax init

        if (!originalStylesImgTag) {
          self.image.$item.removeAttribute('style');
        } else {
          self.image.$item.setAttribute('style', originalStylesTag);
        } // move img tag to its default position


        if (self.image.$itemParent) {
          self.image.$itemParent.appendChild(self.image.$item);
        }
      } // remove additional dom elements


      if (self.image.$container) {
        self.image.$container.parentNode.removeChild(self.image.$container);
      } // call onDestroy event


      if (self.options.onDestroy) {
        self.options.onDestroy.call(self);
      } // delete jarallax from item


      delete self.$item.jarallax;
    } // Fallback for removed function.
    // Does nothing now.
    // eslint-disable-next-line class-methods-use-this


    clipContainer() {}

    coverImage() {
      const self = this;
      const rect = self.image.$container.getBoundingClientRect();
      const contH = rect.height;
      const {
        speed
      } = self.options;
      const isScroll = 'scroll' === self.options.type || 'scroll-opacity' === self.options.type;
      let scrollDist = 0;
      let resultH = contH;
      let resultMT = 0; // scroll parallax

      if (isScroll) {
        // scroll distance and height for image
        if (0 > speed) {
          scrollDist = speed * Math.max(contH, wndH);

          if (wndH < contH) {
            scrollDist -= speed * (contH - wndH);
          }
        } else {
          scrollDist = speed * (contH + wndH);
        } // size for scroll parallax


        if (1 < speed) {
          resultH = Math.abs(scrollDist - wndH);
        } else if (0 > speed) {
          resultH = scrollDist / speed + Math.abs(scrollDist);
        } else {
          resultH += (wndH - contH) * (1 - speed);
        }

        scrollDist /= 2;
      } // store scroll distance


      self.parallaxScrollDistance = scrollDist; // vertical center

      if (isScroll) {
        resultMT = (wndH - resultH) / 2;
      } else {
        resultMT = (contH - resultH) / 2;
      } // apply result to item


      self.css(self.image.$item, {
        height: `${resultH}px`,
        marginTop: `${resultMT}px`,
        left: 'fixed' === self.image.position ? `${rect.left}px` : '0',
        width: `${rect.width}px`
      }); // call onCoverImage event

      if (self.options.onCoverImage) {
        self.options.onCoverImage.call(self);
      } // return some useful data. Used in the video cover function


      return {
        image: {
          height: resultH,
          marginTop: resultMT
        },
        container: rect
      };
    }

    isVisible() {
      return this.isElementInViewport || false;
    }

    onScroll(force) {
      const self = this;
      const rect = self.$item.getBoundingClientRect();
      const contT = rect.top;
      const contH = rect.height;
      const styles = {}; // check if in viewport

      let viewportRect = rect;

      if (self.options.elementInViewport) {
        viewportRect = self.options.elementInViewport.getBoundingClientRect();
      }

      self.isElementInViewport = 0 <= viewportRect.bottom && 0 <= viewportRect.right && viewportRect.top <= wndH && viewportRect.left <= global$1.innerWidth; // stop calculations if item is not in viewport

      if (force ? false : !self.isElementInViewport) {
        return;
      } // calculate parallax helping variables


      const beforeTop = Math.max(0, contT);
      const beforeTopEnd = Math.max(0, contH + contT);
      const afterTop = Math.max(0, -contT);
      const beforeBottom = Math.max(0, contT + contH - wndH);
      const beforeBottomEnd = Math.max(0, contH - (contT + contH - wndH));
      const afterBottom = Math.max(0, -contT + wndH - contH);
      const fromViewportCenter = 1 - 2 * ((wndH - contT) / (wndH + contH)); // calculate on how percent of section is visible

      let visiblePercent = 1;

      if (contH < wndH) {
        visiblePercent = 1 - (afterTop || beforeBottom) / contH;
      } else if (beforeTopEnd <= wndH) {
        visiblePercent = beforeTopEnd / wndH;
      } else if (beforeBottomEnd <= wndH) {
        visiblePercent = beforeBottomEnd / wndH;
      } // opacity


      if ('opacity' === self.options.type || 'scale-opacity' === self.options.type || 'scroll-opacity' === self.options.type) {
        styles.transform = 'translate3d(0,0,0)';
        styles.opacity = visiblePercent;
      } // scale


      if ('scale' === self.options.type || 'scale-opacity' === self.options.type) {
        let scale = 1;

        if (0 > self.options.speed) {
          scale -= self.options.speed * visiblePercent;
        } else {
          scale += self.options.speed * (1 - visiblePercent);
        }

        styles.transform = `scale(${scale}) translate3d(0,0,0)`;
      } // scroll


      if ('scroll' === self.options.type || 'scroll-opacity' === self.options.type) {
        let positionY = self.parallaxScrollDistance * fromViewportCenter; // fix if parallax block in absolute position

        if ('absolute' === self.image.position) {
          positionY -= contT;
        }

        styles.transform = `translate3d(0,${positionY}px,0)`;
      }

      self.css(self.image.$item, styles); // call onScroll event

      if (self.options.onScroll) {
        self.options.onScroll.call(self, {
          section: rect,
          beforeTop,
          beforeTopEnd,
          afterTop,
          beforeBottom,
          beforeBottomEnd,
          afterBottom,
          visiblePercent,
          fromViewportCenter
        });
      }
    }

    onResize() {
      this.coverImage();
    }

  } // global definition


  const jarallax = function (items, options, ...args) {
    // check for dom element
    // thanks: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
    if ('object' === typeof HTMLElement ? items instanceof HTMLElement : items && 'object' === typeof items && null !== items && 1 === items.nodeType && 'string' === typeof items.nodeName) {
      items = [items];
    }

    const len = items.length;
    let k = 0;
    let ret;

    for (k; k < len; k += 1) {
      if ('object' === typeof options || 'undefined' === typeof options) {
        if (!items[k].jarallax) {
          items[k].jarallax = new Jarallax(items[k], options);
        }
      } else if (items[k].jarallax) {
        // eslint-disable-next-line prefer-spread
        ret = items[k].jarallax[options].apply(items[k].jarallax, args);
      }

      if ('undefined' !== typeof ret) {
        return ret;
      }
    }

    return items;
  };

  jarallax.constructor = Jarallax;

  const $ = global$1.jQuery; // jQuery support

  if ('undefined' !== typeof $) {
    const $Plugin = function (...args) {
      Array.prototype.unshift.call(args, this);
      const res = jarallax.apply(global$1, args);
      return 'object' !== typeof res ? res : this;
    };

    $Plugin.constructor = jarallax.constructor; // no conflict

    const old$Plugin = $.fn.jarallax;
    $.fn.jarallax = $Plugin;

    $.fn.jarallax.noConflict = function () {
      $.fn.jarallax = old$Plugin;
      return this;
    };
  } // data-jarallax initialization


  ready(() => {
    jarallax(document.querySelectorAll('[data-jarallax]'));
  });

  return jarallax;

}));
//# sourceMappingURL=jarallax.js.map
