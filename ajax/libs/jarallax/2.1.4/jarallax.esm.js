/*!
 * Jarallax v2.1.4 (https://github.com/nk-o/jarallax)
 * Copyright 2023 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
var defaults$1 = {
  // Base parallax options.
  type: 'scroll',
  speed: 0.5,
  containerClass: 'jarallax-container',
  imgSrc: null,
  imgElement: '.jarallax-img',
  imgSize: 'cover',
  imgPosition: '50% 50%',
  imgRepeat: 'no-repeat',
  keepImg: false,
  elementInViewport: null,
  zIndex: -100,
  disableParallax: false,
  // Callbacks.
  onScroll: null,
  onInit: null,
  onDestroy: null,
  onCoverImage: null,
  // Video options.
  videoClass: 'jarallax-video',
  videoSrc: null,
  videoStartTime: 0,
  videoEndTime: 0,
  videoVolume: 0,
  videoLoop: true,
  videoPlayOnlyVisible: true,
  videoLazyLoading: true,
  disableVideo: false,
  // Video callbacks.
  onVideoInsert: null,
  onVideoWorkerInit: null
};

/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-globals */
let win$1;
if (typeof window !== 'undefined') {
  win$1 = window;
} else if (typeof global !== 'undefined') {
  win$1 = global;
} else if (typeof self !== 'undefined') {
  win$1 = self;
} else {
  win$1 = {};
}
var global$2 = win$1;

/**
 * Add styles to element.
 *
 * @param {Element} el - element.
 * @param {String|Object} styles - styles list.
 *
 * @returns {Element}
 */
function css(el, styles) {
  if (typeof styles === 'string') {
    return global$2.getComputedStyle(el).getPropertyValue(styles);
  }
  Object.keys(styles).forEach(key => {
    el.style[key] = styles[key];
  });
  return el;
}

/**
 * Extend like jQuery.extend
 *
 * @param {Object} out - output object.
 * @param {...any} args - additional objects to extend.
 *
 * @returns {Object}
 */
function extend$1(out, ...args) {
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
}

/**
 * Get all parents of the element.
 *
 * @param {Element} elem - DOM element.
 *
 * @returns {Array}
 */
function getParents(elem) {
  const parents = [];
  while (elem.parentElement !== null) {
    elem = elem.parentElement;
    if (elem.nodeType === 1) {
      parents.push(elem);
    }
  }
  return parents;
}

/**
 * Document ready callback.
 * @param {Function} callback - callback will be fired once Document ready.
 */
function ready(callback) {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
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

const {
  navigator: navigator$1
} = global$2;
const mobileAgent = /*#__PURE__*/ /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator$1.userAgent);
function isMobile() {
  return mobileAgent;
}

let wndW;
let wndH;
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
  return ($deviceHelper ? $deviceHelper.clientHeight : 0) || global$2.innerHeight || document.documentElement.clientHeight;
}
function updateWindowHeight() {
  wndW = global$2.innerWidth || document.documentElement.clientWidth;
  if (isMobile()) {
    wndH = getDeviceHeight();
  } else {
    wndH = global$2.innerHeight || document.documentElement.clientHeight;
  }
}
updateWindowHeight();
global$2.addEventListener('resize', updateWindowHeight);
global$2.addEventListener('orientationchange', updateWindowHeight);
global$2.addEventListener('load', updateWindowHeight);
ready(() => {
  updateWindowHeight();
});
function getWindowSize() {
  return {
    width: wndW,
    height: wndH
  };
}

// List with all jarallax instances
// need to render all in one scroll/resize event.
const jarallaxList = [];
function updateParallax() {
  if (!jarallaxList.length) {
    return;
  }
  const {
    width: wndW,
    height: wndH
  } = getWindowSize();
  jarallaxList.forEach((data, k) => {
    const {
      instance,
      oldData
    } = data;
    if (!instance.isVisible()) {
      return;
    }
    const clientRect = instance.$item.getBoundingClientRect();
    const newData = {
      width: clientRect.width,
      height: clientRect.height,
      top: clientRect.top,
      bottom: clientRect.bottom,
      wndW,
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
  global$2.requestAnimationFrame(updateParallax);
}
const visibilityObserver = /*#__PURE__*/new global$2.IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.jarallax.isElementInViewport = entry.isIntersecting;
  });
}, {
  // We have to start parallax calculation before the block is in view
  // to prevent possible parallax jumping.
  rootMargin: '50px'
});
function addObserver(instance) {
  jarallaxList.push({
    instance
  });
  if (jarallaxList.length === 1) {
    global$2.requestAnimationFrame(updateParallax);
  }
  visibilityObserver.observe(instance.options.elementInViewport || instance.$item);
}
function removeObserver(instance) {
  jarallaxList.forEach((data, key) => {
    if (data.instance.instanceID === instance.instanceID) {
      jarallaxList.splice(key, 1);
    }
  });
  visibilityObserver.unobserve(instance.options.elementInViewport || instance.$item);
}

/* eslint-disable class-methods-use-this */
const {
  navigator
} = global$2;
let instanceID = 0;

// Jarallax class
class Jarallax {
  constructor(item, userOptions) {
    const self = this;
    self.instanceID = instanceID;
    instanceID += 1;
    self.$item = item;
    self.defaults = {
      ...defaults$1
    };

    // prepare data-options
    const dataOptions = self.$item.dataset || {};
    const pureDataOptions = {};
    Object.keys(dataOptions).forEach(key => {
      const lowerCaseOption = key.substr(0, 1).toLowerCase() + key.substr(1);
      if (lowerCaseOption && typeof self.defaults[lowerCaseOption] !== 'undefined') {
        pureDataOptions[lowerCaseOption] = dataOptions[key];
      }
    });
    self.options = self.extend({}, self.defaults, pureDataOptions, userOptions);
    self.pureOptions = self.extend({}, self.options);

    // prepare 'true' and 'false' strings to boolean
    Object.keys(self.options).forEach(key => {
      if (self.options[key] === 'true') {
        self.options[key] = true;
      } else if (self.options[key] === 'false') {
        self.options[key] = false;
      }
    });

    // fix speed option [-1.0, 2.0]
    self.options.speed = Math.min(2, Math.max(-1, parseFloat(self.options.speed)));

    // prepare disableParallax callback
    if (typeof self.options.disableParallax === 'string') {
      self.options.disableParallax = new RegExp(self.options.disableParallax);
    }
    if (self.options.disableParallax instanceof RegExp) {
      const disableParallaxRegexp = self.options.disableParallax;
      self.options.disableParallax = () => disableParallaxRegexp.test(navigator.userAgent);
    }
    if (typeof self.options.disableParallax !== 'function') {
      self.options.disableParallax = () => false;
    }

    // prepare disableVideo callback
    if (typeof self.options.disableVideo === 'string') {
      self.options.disableVideo = new RegExp(self.options.disableVideo);
    }
    if (self.options.disableVideo instanceof RegExp) {
      const disableVideoRegexp = self.options.disableVideo;
      self.options.disableVideo = () => disableVideoRegexp.test(navigator.userAgent);
    }
    if (typeof self.options.disableVideo !== 'function') {
      self.options.disableVideo = () => false;
    }

    // custom element to check if parallax in viewport
    let elementInVP = self.options.elementInViewport;
    // get first item from array
    if (elementInVP && typeof elementInVP === 'object' && typeof elementInVP.length !== 'undefined') {
      [elementInVP] = elementInVP;
    }
    // check if dom element
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
  }
  css(el, styles) {
    return css(el, styles);
  }
  extend(out, ...args) {
    return extend$1(out, ...args);
  }

  // get window size and scroll position. Useful for extensions
  getWindowData() {
    const {
      width,
      height
    } = getWindowSize();
    return {
      width,
      height,
      y: document.documentElement.scrollTop
    };
  }

  // Jarallax functions
  initImg() {
    const self = this;

    // find image element
    let $imgElement = self.options.imgElement;
    if ($imgElement && typeof $imgElement === 'string') {
      $imgElement = self.$item.querySelector($imgElement);
    }

    // check if dom element
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
    }

    // true if there is img tag
    if (self.image.$item) {
      return true;
    }

    // get image src
    if (self.image.src === null) {
      self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      self.image.bgImage = self.css(self.$item, 'background-image');
    }
    return !(!self.image.bgImage || self.image.bgImage === 'none');
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
    }

    // set relative position and z-index to the parent
    if (self.css(self.$item, 'position') === 'static') {
      self.css(self.$item, {
        position: 'relative'
      });
    }
    if (self.css(self.$item, 'z-index') === 'auto') {
      self.css(self.$item, {
        zIndex: 0
      });
    }

    // container for parallax image
    self.image.$container = document.createElement('div');
    self.css(self.image.$container, containerStyles);
    self.css(self.image.$container, {
      'z-index': self.options.zIndex
    });

    // it will remove some image overlapping
    // overlapping occur due to an image position fixed inside absolute position element
    // needed only when background in fixed position
    if (this.image.position === 'fixed') {
      self.css(self.image.$container, {
        '-webkit-clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
      });
    }

    // Add container unique ID.
    self.image.$container.setAttribute('id', `jarallax-container-${self.instanceID}`);

    // Add container class.
    if (self.options.containerClass) {
      self.image.$container.setAttribute('class', self.options.containerClass);
    }
    self.$item.appendChild(self.image.$container);

    // use img tag
    if (self.image.useImgTag) {
      imageStyles = self.extend({
        'object-fit': self.options.imgSize,
        'object-position': self.options.imgPosition,
        'max-width': 'none'
      }, containerStyles, imageStyles);

      // use div with background image
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
    if (self.options.type === 'opacity' || self.options.type === 'scale' || self.options.type === 'scale-opacity' || self.options.speed === 1) {
      self.image.position = 'absolute';
    }

    // 1. Check if one of parents have transform style (without this check, scroll transform will be inverted if used parallax with position fixed)
    //    discussion - https://github.com/nk-o/jarallax/issues/9
    // 2. Check if parents have overflow scroll
    if (self.image.position === 'fixed') {
      const $parents = getParents(self.$item).filter(el => {
        const styles = global$2.getComputedStyle(el);
        const parentTransform = styles['-webkit-transform'] || styles['-moz-transform'] || styles.transform;
        const overflowRegex = /(auto|scroll)/;
        return parentTransform && parentTransform !== 'none' || overflowRegex.test(styles.overflow + styles['overflow-y'] + styles['overflow-x']);
      });
      self.image.position = $parents.length ? 'absolute' : 'fixed';
    }

    // add position to parallax block
    imageStyles.position = self.image.position;

    // insert parallax image
    self.css(self.image.$item, imageStyles);
    self.image.$container.appendChild(self.image.$item);

    // set initial position and size
    self.onResize();
    self.onScroll(true);

    // call onInit event
    if (self.options.onInit) {
      self.options.onInit.call(self);
    }

    // remove default user background
    if (self.css(self.$item, 'background-image') !== 'none') {
      self.css(self.$item, {
        'background-image': 'none'
      });
    }
    addObserver(self);
  }
  destroy() {
    const self = this;
    removeObserver(self);

    // return styles on container as before jarallax init
    const originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');
    self.$item.removeAttribute('data-jarallax-original-styles');
    // null occurs if there is no style tag before jarallax init
    if (!originalStylesTag) {
      self.$item.removeAttribute('style');
    } else {
      self.$item.setAttribute('style', originalStylesTag);
    }
    if (self.image.useImgTag) {
      // return styles on img tag as before jarallax init
      const originalStylesImgTag = self.image.$item.getAttribute('data-jarallax-original-styles');
      self.image.$item.removeAttribute('data-jarallax-original-styles');
      // null occurs if there is no style tag before jarallax init
      if (!originalStylesImgTag) {
        self.image.$item.removeAttribute('style');
      } else {
        self.image.$item.setAttribute('style', originalStylesTag);
      }

      // move img tag to its default position
      if (self.image.$itemParent) {
        self.image.$itemParent.appendChild(self.image.$item);
      }
    }

    // remove additional dom elements
    if (self.image.$container) {
      self.image.$container.parentNode.removeChild(self.image.$container);
    }

    // call onDestroy event
    if (self.options.onDestroy) {
      self.options.onDestroy.call(self);
    }

    // delete jarallax from item
    delete self.$item.jarallax;
  }
  coverImage() {
    const self = this;
    const {
      height: wndH
    } = getWindowSize();
    const rect = self.image.$container.getBoundingClientRect();
    const contH = rect.height;
    const {
      speed
    } = self.options;
    const isScroll = self.options.type === 'scroll' || self.options.type === 'scroll-opacity';
    let scrollDist = 0;
    let resultH = contH;
    let resultMT = 0;

    // scroll parallax
    if (isScroll) {
      // scroll distance and height for image
      if (speed < 0) {
        scrollDist = speed * Math.max(contH, wndH);
        if (wndH < contH) {
          scrollDist -= speed * (contH - wndH);
        }
      } else {
        scrollDist = speed * (contH + wndH);
      }

      // size for scroll parallax
      if (speed > 1) {
        resultH = Math.abs(scrollDist - wndH);
      } else if (speed < 0) {
        resultH = scrollDist / speed + Math.abs(scrollDist);
      } else {
        resultH += (wndH - contH) * (1 - speed);
      }
      scrollDist /= 2;
    }

    // store scroll distance
    self.parallaxScrollDistance = scrollDist;

    // vertical center
    if (isScroll) {
      resultMT = (wndH - resultH) / 2;
    } else {
      resultMT = (contH - resultH) / 2;
    }

    // apply result to item
    self.css(self.image.$item, {
      height: `${resultH}px`,
      marginTop: `${resultMT}px`,
      left: self.image.position === 'fixed' ? `${rect.left}px` : '0',
      width: `${rect.width}px`
    });

    // call onCoverImage event
    if (self.options.onCoverImage) {
      self.options.onCoverImage.call(self);
    }

    // return some useful data. Used in the video cover function
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

    // stop calculations if item is not in viewport
    if (!force && !self.isVisible()) {
      return;
    }
    const {
      height: wndH
    } = getWindowSize();
    const rect = self.$item.getBoundingClientRect();
    const contT = rect.top;
    const contH = rect.height;
    const styles = {};

    // calculate parallax helping variables
    const beforeTop = Math.max(0, contT);
    const beforeTopEnd = Math.max(0, contH + contT);
    const afterTop = Math.max(0, -contT);
    const beforeBottom = Math.max(0, contT + contH - wndH);
    const beforeBottomEnd = Math.max(0, contH - (contT + contH - wndH));
    const afterBottom = Math.max(0, -contT + wndH - contH);
    const fromViewportCenter = 1 - 2 * ((wndH - contT) / (wndH + contH));

    // calculate on how percent of section is visible
    let visiblePercent = 1;
    if (contH < wndH) {
      visiblePercent = 1 - (afterTop || beforeBottom) / contH;
    } else if (beforeTopEnd <= wndH) {
      visiblePercent = beforeTopEnd / wndH;
    } else if (beforeBottomEnd <= wndH) {
      visiblePercent = beforeBottomEnd / wndH;
    }

    // opacity
    if (self.options.type === 'opacity' || self.options.type === 'scale-opacity' || self.options.type === 'scroll-opacity') {
      styles.transform = 'translate3d(0,0,0)';
      styles.opacity = visiblePercent;
    }

    // scale
    if (self.options.type === 'scale' || self.options.type === 'scale-opacity') {
      let scale = 1;
      if (self.options.speed < 0) {
        scale -= self.options.speed * visiblePercent;
      } else {
        scale += self.options.speed * (1 - visiblePercent);
      }
      styles.transform = `scale(${scale}) translate3d(0,0,0)`;
    }

    // scroll
    if (self.options.type === 'scroll' || self.options.type === 'scroll-opacity') {
      let positionY = self.parallaxScrollDistance * fromViewportCenter;

      // fix if parallax block in absolute position
      if (self.image.position === 'absolute') {
        positionY -= contT;
      }
      styles.transform = `translate3d(0,${positionY}px,0)`;
    }
    self.css(self.image.$item, styles);

    // call onScroll event
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
}

// global definition
const jarallax$1 = function (items, options, ...args) {
  // check for dom element
  // thanks: http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
  if (typeof HTMLElement === 'object' ? items instanceof HTMLElement : items && typeof items === 'object' && items !== null && items.nodeType === 1 && typeof items.nodeName === 'string') {
    items = [items];
  }
  const len = items.length;
  let k = 0;
  let ret;
  for (k; k < len; k += 1) {
    if (typeof options === 'object' || typeof options === 'undefined') {
      if (!items[k].jarallax) {
        items[k].jarallax = new Jarallax(items[k], options);
      }
    } else if (items[k].jarallax) {
      // eslint-disable-next-line prefer-spread
      ret = items[k].jarallax[options].apply(items[k].jarallax, args);
    }
    if (typeof ret !== 'undefined') {
      return ret;
    }
  }
  return items;
};
jarallax$1.constructor = Jarallax;

/*!
 * Video Worker v2.1.5 (https://github.com/nk-o/video-worker)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/video-worker/blob/master/LICENSE)
 */

/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-restricted-globals */
let win;
if (typeof window !== 'undefined') {
  win = window;
} else if (typeof global !== 'undefined') {
  win = global;
} else if (typeof self !== 'undefined') {
  win = self;
} else {
  win = {};
}
var global$1 = win;

// Deferred
// thanks http://stackoverflow.com/questions/18096715/implement-deferred-object-without-using-jquery
function Deferred() {
  this.doneCallbacks = [];
  this.failCallbacks = [];
}
Deferred.prototype = {
  execute(list, args) {
    let i = list.length;
    // eslint-disable-next-line no-param-reassign
    args = Array.prototype.slice.call(args);
    while (i) {
      i -= 1;
      list[i].apply(null, args);
    }
  },
  resolve(...args) {
    this.execute(this.doneCallbacks, args);
  },
  reject(...args) {
    this.execute(this.failCallbacks, args);
  },
  done(callback) {
    this.doneCallbacks.push(callback);
  },
  fail(callback) {
    this.failCallbacks.push(callback);
  }
};
var defaults = {
  autoplay: false,
  loop: false,
  mute: false,
  volume: 100,
  showControls: true,
  accessibilityHidden: false,
  // start / end video time in seconds
  startTime: 0,
  endTime: 0
};

/**
 * Extend like jQuery.extend
 *
 * @param {Object} out - output object.
 * @param {...any} args - additional objects to extend.
 *
 * @returns {Object}
 */
function extend(out, ...args) {
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
}
let ID = 0;
let YoutubeAPIadded = 0;
let VimeoAPIadded = 0;
let loadingYoutubePlayer = 0;
let loadingVimeoPlayer = 0;
const loadingYoutubeDefer = /*#__PURE__*/new Deferred();
const loadingVimeoDefer = /*#__PURE__*/new Deferred();
class VideoWorker {
  constructor(url, options) {
    const self = this;
    self.url = url;
    self.options_default = {
      ...defaults
    };
    self.options = extend({}, self.options_default, options);

    // check URL
    self.videoID = self.parseURL(url);

    // init
    if (self.videoID) {
      self.ID = ID;
      ID += 1;
      self.loadAPI();
      self.init();
    }
  }
  parseURL(url) {
    // parse youtube ID
    function getYoutubeID(ytUrl) {
      // eslint-disable-next-line no-useless-escape
      const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=)([^#\&\?]*).*/;
      const match = ytUrl.match(regExp);
      return match && match[1].length === 11 ? match[1] : false;
    }

    // parse vimeo ID
    function getVimeoID(vmUrl) {
      // eslint-disable-next-line no-useless-escape
      const regExp = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
      const match = vmUrl.match(regExp);
      return match && match[3] ? match[3] : false;
    }

    // parse local string
    function getLocalVideos(locUrl) {
      // eslint-disable-next-line no-useless-escape
      const videoFormats = locUrl.split(/,(?=mp4\:|webm\:|ogv\:|ogg\:)/);
      const result = {};
      let ready = 0;
      videoFormats.forEach(val => {
        // eslint-disable-next-line no-useless-escape
        const match = val.match(/^(mp4|webm|ogv|ogg)\:(.*)/);
        if (match && match[1] && match[2]) {
          // eslint-disable-next-line prefer-destructuring
          result[match[1] === 'ogv' ? 'ogg' : match[1]] = match[2];
          ready = 1;
        }
      });
      return ready ? result : false;
    }
    const Youtube = getYoutubeID(url);
    const Vimeo = getVimeoID(url);
    const Local = getLocalVideos(url);
    if (Youtube) {
      this.type = 'youtube';
      return Youtube;
    }
    if (Vimeo) {
      this.type = 'vimeo';
      return Vimeo;
    }
    if (Local) {
      this.type = 'local';
      return Local;
    }
    return false;
  }
  isValid() {
    return !!this.videoID;
  }

  // events
  on(name, callback) {
    this.userEventsList = this.userEventsList || [];

    // add new callback in events list
    (this.userEventsList[name] || (this.userEventsList[name] = [])).push(callback);
  }
  off(name, callback) {
    if (!this.userEventsList || !this.userEventsList[name]) {
      return;
    }
    if (!callback) {
      delete this.userEventsList[name];
    } else {
      this.userEventsList[name].forEach((val, key) => {
        if (val === callback) {
          this.userEventsList[name][key] = false;
        }
      });
    }
  }
  fire(name, ...args) {
    if (this.userEventsList && typeof this.userEventsList[name] !== 'undefined') {
      this.userEventsList[name].forEach(val => {
        // call with all arguments
        if (val) {
          val.apply(this, args);
        }
      });
    }
  }
  play(start) {
    const self = this;
    if (!self.player) {
      return;
    }
    if (self.type === 'youtube' && self.player.playVideo) {
      if (typeof start !== 'undefined') {
        self.player.seekTo(start || 0);
      }
      if (global$1.YT.PlayerState.PLAYING !== self.player.getPlayerState()) {
        self.player.playVideo();
      }
    }
    if (self.type === 'vimeo') {
      if (typeof start !== 'undefined') {
        self.player.setCurrentTime(start);
      }
      self.player.getPaused().then(paused => {
        if (paused) {
          self.player.play();
        }
      });
    }
    if (self.type === 'local') {
      if (typeof start !== 'undefined') {
        self.player.currentTime = start;
      }
      if (self.player.paused) {
        self.player.play();
      }
    }
  }
  pause() {
    const self = this;
    if (!self.player) {
      return;
    }
    if (self.type === 'youtube' && self.player.pauseVideo) {
      if (global$1.YT.PlayerState.PLAYING === self.player.getPlayerState()) {
        self.player.pauseVideo();
      }
    }
    if (self.type === 'vimeo') {
      self.player.getPaused().then(paused => {
        if (!paused) {
          self.player.pause();
        }
      });
    }
    if (self.type === 'local') {
      if (!self.player.paused) {
        self.player.pause();
      }
    }
  }
  mute() {
    const self = this;
    if (!self.player) {
      return;
    }
    if (self.type === 'youtube' && self.player.mute) {
      self.player.mute();
    }
    if (self.type === 'vimeo' && self.player.setVolume) {
      self.setVolume(0);
    }
    if (self.type === 'local') {
      self.$video.muted = true;
    }
  }
  unmute() {
    const self = this;
    if (!self.player) {
      return;
    }
    if (self.type === 'youtube' && self.player.mute) {
      self.player.unMute();
    }
    if (self.type === 'vimeo' && self.player.setVolume) {
      // In case the default volume is 0, we have to set 100 when unmute.
      self.setVolume(self.options.volume || 100);
    }
    if (self.type === 'local') {
      self.$video.muted = false;
    }
  }
  setVolume(volume = false) {
    const self = this;
    if (!self.player || typeof volume !== 'number') {
      return;
    }
    if (self.type === 'youtube' && self.player.setVolume) {
      self.player.setVolume(volume);
    }
    if (self.type === 'vimeo' && self.player.setVolume) {
      self.player.setVolume(volume / 100);
    }
    if (self.type === 'local') {
      self.$video.volume = volume / 100;
    }
  }
  getVolume(callback) {
    const self = this;
    if (!self.player) {
      callback(false);
      return;
    }
    if (self.type === 'youtube' && self.player.getVolume) {
      callback(self.player.getVolume());
    }
    if (self.type === 'vimeo' && self.player.getVolume) {
      self.player.getVolume().then(volume => {
        callback(volume * 100);
      });
    }
    if (self.type === 'local') {
      callback(self.$video.volume * 100);
    }
  }
  getMuted(callback) {
    const self = this;
    if (!self.player) {
      callback(null);
      return;
    }
    if (self.type === 'youtube' && self.player.isMuted) {
      callback(self.player.isMuted());
    }
    if (self.type === 'vimeo' && self.player.getVolume) {
      self.player.getVolume().then(volume => {
        callback(!!volume);
      });
    }
    if (self.type === 'local') {
      callback(self.$video.muted);
    }
  }
  getImageURL(callback) {
    const self = this;
    if (self.videoImage) {
      callback(self.videoImage);
      return;
    }
    if (self.type === 'youtube') {
      const availableSizes = ['maxresdefault', 'sddefault', 'hqdefault', '0'];
      let step = 0;
      const tempImg = new Image();
      tempImg.onload = function () {
        // if no thumbnail, youtube add their own image with width = 120px
        if ((this.naturalWidth || this.width) !== 120 || step === availableSizes.length - 1) {
          // ok
          self.videoImage = `https://img.youtube.com/vi/${self.videoID}/${availableSizes[step]}.jpg`;
          callback(self.videoImage);
        } else {
          // try another size
          step += 1;
          this.src = `https://img.youtube.com/vi/${self.videoID}/${availableSizes[step]}.jpg`;
        }
      };
      tempImg.src = `https://img.youtube.com/vi/${self.videoID}/${availableSizes[step]}.jpg`;
    }
    if (self.type === 'vimeo') {
      // We should provide width to get HQ thumbnail URL.
      let width = global$1.innerWidth || 1920;
      if (global$1.devicePixelRatio) {
        width *= global$1.devicePixelRatio;
      }
      width = Math.min(width, 1920);
      let request = new XMLHttpRequest();
      // https://vimeo.com/api/oembed.json?url=https://vimeo.com/235212527
      request.open('GET', `https://vimeo.com/api/oembed.json?url=${self.url}&width=${width}`, true);
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            // Success!
            const response = JSON.parse(this.responseText);
            if (response.thumbnail_url) {
              self.videoImage = response.thumbnail_url;
              callback(self.videoImage);
            }
          }
        }
      };
      request.send();
      request = null;
    }
  }

  // fallback to the old version.
  getIframe(callback) {
    this.getVideo(callback);
  }
  getVideo(callback) {
    const self = this;

    // return generated video block
    if (self.$video) {
      callback(self.$video);
      return;
    }

    // generate new video block
    self.onAPIready(() => {
      let hiddenDiv;
      if (!self.$video) {
        hiddenDiv = document.createElement('div');
        hiddenDiv.style.display = 'none';
      }

      // Youtube
      if (self.type === 'youtube') {
        self.playerOptions = {
          // GDPR Compliance.
          host: 'https://www.youtube-nocookie.com',
          videoId: self.videoID,
          playerVars: {
            autohide: 1,
            rel: 0,
            autoplay: 0,
            // autoplay enable on mobile devices
            playsinline: 1
          }
        };

        // hide controls
        if (!self.options.showControls) {
          self.playerOptions.playerVars.iv_load_policy = 3;
          self.playerOptions.playerVars.modestbranding = 1;
          self.playerOptions.playerVars.controls = 0;
          self.playerOptions.playerVars.showinfo = 0;
          self.playerOptions.playerVars.disablekb = 1;
        }

        // events
        let ytStarted;
        let ytProgressInterval;
        self.playerOptions.events = {
          onReady(e) {
            // mute
            if (self.options.mute) {
              e.target.mute();
            } else if (typeof self.options.volume === 'number') {
              e.target.setVolume(self.options.volume);
            }

            // autoplay
            if (self.options.autoplay) {
              self.play(self.options.startTime);
            }
            self.fire('ready', e);

            // For seamless loops, set the endTime to 0.1 seconds less than the video's duration
            // https://github.com/nk-o/video-worker/issues/2
            if (self.options.loop && !self.options.endTime) {
              const secondsOffset = 0.1;
              self.options.endTime = self.player.getDuration() - secondsOffset;
            }

            // volumechange
            setInterval(() => {
              self.getVolume(volume => {
                if (self.options.volume !== volume) {
                  self.options.volume = volume;
                  self.fire('volumechange', e);
                }
              });
            }, 150);
          },
          onStateChange(e) {
            // loop
            if (self.options.loop && e.data === global$1.YT.PlayerState.ENDED) {
              self.play(self.options.startTime);
            }
            if (!ytStarted && e.data === global$1.YT.PlayerState.PLAYING) {
              ytStarted = 1;
              self.fire('started', e);
            }
            if (e.data === global$1.YT.PlayerState.PLAYING) {
              self.fire('play', e);
            }
            if (e.data === global$1.YT.PlayerState.PAUSED) {
              self.fire('pause', e);
            }
            if (e.data === global$1.YT.PlayerState.ENDED) {
              self.fire('ended', e);
            }

            // progress check
            if (e.data === global$1.YT.PlayerState.PLAYING) {
              ytProgressInterval = setInterval(() => {
                self.fire('timeupdate', e);

                // check for end of video and play again or stop
                if (self.options.endTime && self.player.getCurrentTime() >= self.options.endTime) {
                  if (self.options.loop) {
                    self.play(self.options.startTime);
                  } else {
                    self.pause();
                  }
                }
              }, 150);
            } else {
              clearInterval(ytProgressInterval);
            }
          },
          onError(e) {
            self.fire('error', e);
          }
        };
        const firstInit = !self.$video;
        if (firstInit) {
          const div = document.createElement('div');
          div.setAttribute('id', self.playerID);
          hiddenDiv.appendChild(div);
          document.body.appendChild(hiddenDiv);
        }
        self.player = self.player || new global$1.YT.Player(self.playerID, self.playerOptions);
        if (firstInit) {
          self.$video = document.getElementById(self.playerID);

          // add accessibility attributes
          if (self.options.accessibilityHidden) {
            self.$video.setAttribute('tabindex', '-1');
            self.$video.setAttribute('aria-hidden', 'true');
          }

          // get video width and height
          self.videoWidth = parseInt(self.$video.getAttribute('width'), 10) || 1280;
          self.videoHeight = parseInt(self.$video.getAttribute('height'), 10) || 720;
        }
      }

      // Vimeo
      if (self.type === 'vimeo') {
        self.playerOptions = {
          // GDPR Compliance.
          dnt: 1,
          id: self.videoID,
          autopause: 0,
          transparent: 0,
          autoplay: self.options.autoplay ? 1 : 0,
          loop: self.options.loop ? 1 : 0,
          muted: self.options.mute || self.options.volume === 0 ? 1 : 0
        };

        // hide controls
        if (!self.options.showControls) {
          self.playerOptions.controls = 0;
        }

        // enable background option
        if (!self.options.showControls && self.options.loop && self.options.autoplay) {
          self.playerOptions.background = 1;
        }
        if (!self.$video) {
          let playerOptionsString = '';
          Object.keys(self.playerOptions).forEach(key => {
            if (playerOptionsString !== '') {
              playerOptionsString += '&';
            }
            playerOptionsString += `${key}=${encodeURIComponent(self.playerOptions[key])}`;
          });

          // we need to create iframe manually because when we create it using API
          // js events won't triggers after iframe moved to another place
          self.$video = document.createElement('iframe');
          self.$video.setAttribute('id', self.playerID);
          self.$video.setAttribute('src', `https://player.vimeo.com/video/${self.videoID}?${playerOptionsString}`);
          self.$video.setAttribute('frameborder', '0');
          self.$video.setAttribute('mozallowfullscreen', '');
          self.$video.setAttribute('allowfullscreen', '');
          self.$video.setAttribute('title', 'Vimeo video player');

          // add accessibility attributes
          if (self.options.accessibilityHidden) {
            self.$video.setAttribute('tabindex', '-1');
            self.$video.setAttribute('aria-hidden', 'true');
          }
          hiddenDiv.appendChild(self.$video);
          document.body.appendChild(hiddenDiv);
        }
        self.player = self.player || new global$1.Vimeo.Player(self.$video, self.playerOptions);

        // Since Vimeo removed the `volume` parameter, we have to set it manually.
        if (!self.options.mute && typeof self.options.volume === 'number') {
          self.setVolume(self.options.volume);
        }

        // set current time for autoplay
        if (self.options.startTime && self.options.autoplay) {
          self.player.setCurrentTime(self.options.startTime);
        }

        // get video width and height
        self.player.getVideoWidth().then(width => {
          self.videoWidth = width || 1280;
        });
        self.player.getVideoHeight().then(height => {
          self.videoHeight = height || 720;
        });

        // events
        let vmStarted;
        self.player.on('timeupdate', e => {
          if (!vmStarted) {
            self.fire('started', e);
            vmStarted = 1;
          }
          self.fire('timeupdate', e);

          // check for end of video and play again or stop
          if (self.options.endTime) {
            if (self.options.endTime && e.seconds >= self.options.endTime) {
              if (self.options.loop) {
                self.play(self.options.startTime);
              } else {
                self.pause();
              }
            }
          }
        });
        self.player.on('play', e => {
          self.fire('play', e);

          // check for the start time and start with it
          if (self.options.startTime && e.seconds === 0) {
            self.play(self.options.startTime);
          }
        });
        self.player.on('pause', e => {
          self.fire('pause', e);
        });
        self.player.on('ended', e => {
          self.fire('ended', e);
        });
        self.player.on('loaded', e => {
          self.fire('ready', e);
        });
        self.player.on('volumechange', e => {
          self.getVolume(volume => {
            self.options.volume = volume;
          });
          self.fire('volumechange', e);
        });
        self.player.on('error', e => {
          self.fire('error', e);
        });
      }

      // Local
      function addSourceToLocal(element, src, type) {
        const source = document.createElement('source');
        source.src = src;
        source.type = type;
        element.appendChild(source);
      }
      if (self.type === 'local') {
        if (!self.$video) {
          self.$video = document.createElement('video');
          self.player = self.$video;

          // show controls
          if (self.options.showControls) {
            self.$video.controls = true;
          }

          // set volume
          if (typeof self.options.volume === 'number') {
            self.setVolume(self.options.volume);
          }

          // mute (it is required to mute after the volume set)
          if (self.options.mute) {
            self.mute();
          }

          // loop
          if (self.options.loop) {
            self.$video.loop = true;
          }

          // autoplay enable on mobile devices
          self.$video.setAttribute('playsinline', '');
          self.$video.setAttribute('webkit-playsinline', '');

          // add accessibility attributes
          if (self.options.accessibilityHidden) {
            self.$video.setAttribute('tabindex', '-1');
            self.$video.setAttribute('aria-hidden', 'true');
          }
          self.$video.setAttribute('id', self.playerID);
          hiddenDiv.appendChild(self.$video);
          document.body.appendChild(hiddenDiv);
          Object.keys(self.videoID).forEach(key => {
            addSourceToLocal(self.$video, self.videoID[key], `video/${key}`);
          });
        }
        let locStarted;
        self.player.addEventListener('playing', e => {
          if (!locStarted) {
            self.fire('started', e);
          }
          locStarted = 1;
        });
        self.player.addEventListener('timeupdate', function (e) {
          self.fire('timeupdate', e);

          // check for end of video and play again or stop
          if (self.options.endTime) {
            if (self.options.endTime && this.currentTime >= self.options.endTime) {
              if (self.options.loop) {
                self.play(self.options.startTime);
              } else {
                self.pause();
              }
            }
          }
        });
        self.player.addEventListener('play', e => {
          self.fire('play', e);
        });
        self.player.addEventListener('pause', e => {
          self.fire('pause', e);
        });
        self.player.addEventListener('ended', e => {
          self.fire('ended', e);
        });
        self.player.addEventListener('loadedmetadata', function () {
          // get video width and height
          self.videoWidth = this.videoWidth || 1280;
          self.videoHeight = this.videoHeight || 720;
          self.fire('ready');

          // autoplay
          if (self.options.autoplay) {
            self.play(self.options.startTime);
          }
        });
        self.player.addEventListener('volumechange', e => {
          self.getVolume(volume => {
            self.options.volume = volume;
          });
          self.fire('volumechange', e);
        });
        self.player.addEventListener('error', e => {
          self.fire('error', e);
        });
      }
      callback(self.$video);
    });
  }
  init() {
    const self = this;
    self.playerID = `VideoWorker-${self.ID}`;
  }
  loadAPI() {
    const self = this;
    if (YoutubeAPIadded && VimeoAPIadded) {
      return;
    }
    let src = '';

    // load Youtube API
    if (self.type === 'youtube' && !YoutubeAPIadded) {
      YoutubeAPIadded = 1;
      src = 'https://www.youtube.com/iframe_api';
    }

    // load Vimeo API
    if (self.type === 'vimeo' && !VimeoAPIadded) {
      VimeoAPIadded = 1;

      // Useful when Vimeo API added using RequireJS https://github.com/nk-o/video-worker/pull/7
      if (typeof global$1.Vimeo !== 'undefined') {
        return;
      }
      src = 'https://player.vimeo.com/api/player.js';
    }
    if (!src) {
      return;
    }

    // add script in head section
    let tag = document.createElement('script');
    let head = document.getElementsByTagName('head')[0];
    tag.src = src;
    head.appendChild(tag);
    head = null;
    tag = null;
  }
  onAPIready(callback) {
    const self = this;

    // Youtube
    if (self.type === 'youtube') {
      // Listen for global YT player callback
      if ((typeof global$1.YT === 'undefined' || global$1.YT.loaded === 0) && !loadingYoutubePlayer) {
        // Prevents Ready event from being called twice
        loadingYoutubePlayer = 1;

        // Creates deferred so, other players know when to wait.
        global$1.onYouTubeIframeAPIReady = function () {
          global$1.onYouTubeIframeAPIReady = null;
          loadingYoutubeDefer.resolve('done');
          callback();
        };
      } else if (typeof global$1.YT === 'object' && global$1.YT.loaded === 1) {
        callback();
      } else {
        loadingYoutubeDefer.done(() => {
          callback();
        });
      }
    }

    // Vimeo
    if (self.type === 'vimeo') {
      if (typeof global$1.Vimeo === 'undefined' && !loadingVimeoPlayer) {
        loadingVimeoPlayer = 1;
        const vimeoInterval = setInterval(() => {
          if (typeof global$1.Vimeo !== 'undefined') {
            clearInterval(vimeoInterval);
            loadingVimeoDefer.resolve('done');
            callback();
          }
        }, 20);
      } else if (typeof global$1.Vimeo !== 'undefined') {
        callback();
      } else {
        loadingVimeoDefer.done(() => {
          callback();
        });
      }
    }

    // Local
    if (self.type === 'local') {
      callback();
    }
  }
}

function jarallaxVideo$1(jarallax = global$2.jarallax) {
  if (typeof jarallax === 'undefined') {
    return;
  }
  const Jarallax = jarallax.constructor;

  // append video after when block will be visible.
  const defOnScroll = Jarallax.prototype.onScroll;
  Jarallax.prototype.onScroll = function () {
    const self = this;
    defOnScroll.apply(self);
    const isReady = !self.isVideoInserted && self.video && (!self.options.videoLazyLoading || self.isElementInViewport) && !self.options.disableVideo();
    if (isReady) {
      self.isVideoInserted = true;
      self.video.getVideo(video => {
        const $parent = video.parentNode;
        self.css(video, {
          position: self.image.position,
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          width: '100%',
          height: '100%',
          maxWidth: 'none',
          maxHeight: 'none',
          pointerEvents: 'none',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          margin: 0,
          zIndex: -1
        });
        self.$video = video;

        // add Poster attribute to self-hosted video
        if (self.video.type === 'local') {
          if (self.image.src) {
            self.$video.setAttribute('poster', self.image.src);
          } else if (self.image.$item && self.image.$item.tagName === 'IMG' && self.image.$item.src) {
            self.$video.setAttribute('poster', self.image.$item.src);
          }
        }

        // add classname to video element
        if (self.options.videoClass) {
          self.$video.setAttribute('class', `${self.options.videoClass} ${self.options.videoClass}-${self.video.type}`);
        }

        // insert video tag
        self.image.$container.appendChild(video);

        // remove parent video element (created by VideoWorker)
        $parent.parentNode.removeChild($parent);

        // call onVideoInsert event
        if (self.options.onVideoInsert) {
          self.options.onVideoInsert.call(self);
        }
      });
    }
  };

  // cover video
  const defCoverImage = Jarallax.prototype.coverImage;
  Jarallax.prototype.coverImage = function () {
    const self = this;
    const imageData = defCoverImage.apply(self);
    const node = self.image.$item ? self.image.$item.nodeName : false;
    if (imageData && self.video && node && (node === 'IFRAME' || node === 'VIDEO')) {
      let h = imageData.image.height;
      let w = h * self.image.width / self.image.height;
      let ml = (imageData.container.width - w) / 2;
      let mt = imageData.image.marginTop;
      if (imageData.container.width > w) {
        w = imageData.container.width;
        h = w * self.image.height / self.image.width;
        ml = 0;
        mt += (imageData.image.height - h) / 2;
      }

      // add video height over than need to hide controls
      if (node === 'IFRAME') {
        h += 400;
        mt -= 200;
      }
      self.css(self.$video, {
        width: `${w}px`,
        marginLeft: `${ml}px`,
        height: `${h}px`,
        marginTop: `${mt}px`
      });
    }
    return imageData;
  };

  // init video
  const defInitImg = Jarallax.prototype.initImg;
  Jarallax.prototype.initImg = function () {
    const self = this;
    const defaultResult = defInitImg.apply(self);
    if (!self.options.videoSrc) {
      self.options.videoSrc = self.$item.getAttribute('data-jarallax-video') || null;
    }
    if (self.options.videoSrc) {
      self.defaultInitImgResult = defaultResult;
      return true;
    }
    return defaultResult;
  };
  const defCanInitParallax = Jarallax.prototype.canInitParallax;
  Jarallax.prototype.canInitParallax = function () {
    const self = this;
    let defaultResult = defCanInitParallax.apply(self);
    if (!self.options.videoSrc) {
      return defaultResult;
    }

    // Init video api
    const video = new VideoWorker(self.options.videoSrc, {
      autoplay: true,
      loop: self.options.videoLoop,
      showControls: false,
      accessibilityHidden: true,
      startTime: self.options.videoStartTime || 0,
      endTime: self.options.videoEndTime || 0,
      mute: !self.options.videoVolume,
      volume: self.options.videoVolume || 0
    });

    // call onVideoWorkerInit event
    if (self.options.onVideoWorkerInit) {
      self.options.onVideoWorkerInit.call(self, video);
    }
    function resetDefaultImage() {
      if (self.image.$default_item) {
        self.image.$item = self.image.$default_item;
        self.image.$item.style.display = 'block';

        // set image width and height
        self.coverImage();
        self.onScroll();
      }
    }
    if (video.isValid()) {
      // Force enable parallax.
      // When the parallax disabled on mobile devices, we still need to display videos.
      // https://github.com/nk-o/jarallax/issues/159
      if (this.options.disableParallax()) {
        defaultResult = true;
        self.image.position = 'absolute';
        self.options.type = 'scroll';
        self.options.speed = 1;
      }

      // if parallax will not be inited, we can add thumbnail on background.
      if (!defaultResult) {
        if (!self.defaultInitImgResult) {
          video.getImageURL(url => {
            // save default user styles
            const curStyle = self.$item.getAttribute('style');
            if (curStyle) {
              self.$item.setAttribute('data-jarallax-original-styles', curStyle);
            }

            // set new background
            self.css(self.$item, {
              'background-image': `url("${url}")`,
              'background-position': 'center',
              'background-size': 'cover'
            });
          });
        }

        // init video
      } else {
        video.on('ready', () => {
          if (self.options.videoPlayOnlyVisible) {
            const oldOnScroll = self.onScroll;
            self.onScroll = function () {
              oldOnScroll.apply(self);
              if (!self.videoError && (self.options.videoLoop || !self.options.videoLoop && !self.videoEnded)) {
                if (self.isVisible()) {
                  video.play();
                } else {
                  video.pause();
                }
              }
            };
          } else {
            video.play();
          }
        });
        video.on('started', () => {
          self.image.$default_item = self.image.$item;
          self.image.$item = self.$video;

          // set video width and height
          self.image.width = self.video.videoWidth || 1280;
          self.image.height = self.video.videoHeight || 720;
          self.coverImage();
          self.onScroll();

          // hide image
          if (self.image.$default_item) {
            self.image.$default_item.style.display = 'none';
          }
        });
        video.on('ended', () => {
          self.videoEnded = true;
          if (!self.options.videoLoop) {
            // show default image if Loop disabled.
            resetDefaultImage();
          }
        });
        video.on('error', () => {
          self.videoError = true;

          // show default image if video loading error.
          resetDefaultImage();
        });
        self.video = video;

        // set image if not exists
        if (!self.defaultInitImgResult) {
          // set empty image on self-hosted video if not defined
          self.image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          if (video.type !== 'local') {
            video.getImageURL(url => {
              self.image.bgImage = `url("${url}")`;
              self.init();
            });
            return false;
          }
        }
      }
    }
    return defaultResult;
  };

  // Destroy video parallax
  const defDestroy = Jarallax.prototype.destroy;
  Jarallax.prototype.destroy = function () {
    const self = this;
    if (self.image.$default_item) {
      self.image.$item = self.image.$default_item;
      delete self.image.$default_item;
    }
    defDestroy.apply(self);
  };
}

function jarallaxElement$1(jarallax = global$2.jarallax) {
  // eslint-disable-next-line no-console
  console.warn("Jarallax Element extension is DEPRECATED, please, avoid using it. We recommend you look at something like `lax.js` library <https://github.com/alexfoxy/lax.js>. It is much more powerful and has a less code (in cases when you don't want to add parallax backgrounds).");
  if (typeof jarallax === 'undefined') {
    return;
  }
  const Jarallax = jarallax.constructor;

  // redefine default methods
  ['initImg', 'canInitParallax', 'init', 'destroy', 'coverImage', 'isVisible', 'onScroll', 'onResize'].forEach(key => {
    const def = Jarallax.prototype[key];
    Jarallax.prototype[key] = function (...args) {
      const self = this;
      if (key === 'initImg' && self.$item.getAttribute('data-jarallax-element') !== null) {
        self.options.type = 'element';
        self.pureOptions.speed = self.$item.getAttribute('data-jarallax-element') || '100';
      }
      if (self.options.type !== 'element') {
        return def.apply(self, args);
      }
      self.pureOptions.threshold = self.$item.getAttribute('data-threshold') || '';
      switch (key) {
        case 'init':
          {
            const speedArr = `${self.pureOptions.speed}`.split(' ');
            self.options.speed = self.pureOptions.speed || 0;
            self.options.speedY = speedArr[0] ? parseFloat(speedArr[0]) : 0;
            self.options.speedX = speedArr[1] ? parseFloat(speedArr[1]) : 0;
            const thresholdArr = self.pureOptions.threshold.split(' ');
            self.options.thresholdY = thresholdArr[0] ? parseFloat(thresholdArr[0]) : null;
            self.options.thresholdX = thresholdArr[1] ? parseFloat(thresholdArr[1]) : null;
            def.apply(self, args);

            // restore background image if available.
            const originalStylesTag = self.$item.getAttribute('data-jarallax-original-styles');
            if (originalStylesTag) {
              self.$item.setAttribute('style', originalStylesTag);
            }
            return true;
          }
        case 'onResize':
          {
            const defTransform = self.css(self.$item, 'transform');
            self.css(self.$item, {
              transform: ''
            });
            const rect = self.$item.getBoundingClientRect();
            self.itemData = {
              width: rect.width,
              height: rect.height,
              y: rect.top + self.getWindowData().y,
              x: rect.left
            };
            self.css(self.$item, {
              transform: defTransform
            });
            break;
          }
        case 'onScroll':
          {
            const wnd = self.getWindowData();
            const centerPercent = (wnd.y + wnd.height / 2 - self.itemData.y - self.itemData.height / 2) / (wnd.height / 2);
            const moveY = centerPercent * self.options.speedY;
            const moveX = centerPercent * self.options.speedX;
            let my = moveY;
            let mx = moveX;
            if (self.options.thresholdY !== null && moveY > self.options.thresholdY) my = 0;
            if (self.options.thresholdX !== null && moveX > self.options.thresholdX) mx = 0;
            self.css(self.$item, {
              transform: `translate3d(${mx}px,${my}px,0)`
            });
            break;
          }
        case 'initImg':
        case 'isVisible':
        case 'coverImage':
          return true;
        // no default
      }

      return def.apply(self, args);
    };
  });
}

const jarallax = jarallax$1;
const jarallaxVideo = function jarallaxVideo() {
  return jarallaxVideo$1(jarallax);
};
const jarallaxElement = function jarallaxElement() {
  return jarallaxElement$1(jarallax);
};

export { jarallax, jarallaxElement, jarallaxVideo };
//# sourceMappingURL=jarallax.esm.js.map
