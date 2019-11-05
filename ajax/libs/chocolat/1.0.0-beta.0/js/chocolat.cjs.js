'use strict';

const defaults = {
  container: window,
  // window or jquery object or jquery selector, or element
  className: undefined,
  imageSize: 'default',
  // 'default', 'contain', 'cover' or 'native'
  initialZoomState: null,
  fullScreen: false,
  loop: false,
  linkImages: true,
  duration: 300,
  setIndex: 0,
  firstImage: 0,
  lastImage: false,
  currentImage: undefined,
  initialized: false,
  timer: false,
  timerDebounce: false,
  images: [],
  enableZoom: true,
  imageSource: 'href',
  setTitle: function () {
    return '';
  },
  description: function () {
    return this.settings.images[this.settings.currentImage].title;
  },
  pagination: function () {
    var last = this.settings.lastImage + 1;
    var position = this.settings.currentImage + 1;
    return position + '/' + last;
  },

  afterInitialize() {},

  afterMarkup() {},

  afterImageLoad() {},

  zoomedPaddingX: function (canvasWidth, imgWidth) {
    return 0;
  },
  zoomedPaddingY: function (canvasHeight, imgHeight) {
    return 0;
  }
};
class Chocolat {
  constructor(elements, settings) {
    this.settings = settings;
    this.elems = {};
    this.elements = elements;
    this.events = [];
    this._cssClasses = ['chocolat-open', 'chocolat-in-container', 'chocolat-cover', 'chocolat-zoomable', 'chocolat-zoomed'];
    this.elements.forEach((el, i) => {
      this.settings.images.push({
        title: el.getAttribute('title'),
        src: el.getAttribute(this.settings.imageSource),
        height: false,
        width: false
      });
      this.off(el, 'click.chocolat');
      this.on(el, 'click.chocolat', e => {
        this.init(i);
        e.preventDefault();
      });
    });
  }

  init(i) {
    if (!this.settings.initialized) {
      this.setDomContainer();
      this.markup();
      this.attachListeners();
      this.settings.lastImage = this.settings.images.length - 1;
      this.settings.initialized = true;
    }

    this.settings.afterInitialize.call(this);
    return this.load(i);
  }

  loadImage(src, image) {
    if ('decode' in image) {
      image.src = src;
      return image.decode();
    } else {
      return new Promise(function (resolve, reject) {
        image.onload = resolve;
        image.onerror = resolve;
        image.src = src;
      });
    }
  }

  load(i) {
    if (this.settings.fullScreen) {
      this.openFullScreen();
    }

    if (this.settings.currentImage === i) {
      return Promise.resolve();
    }

    setTimeout(() => {
      this.elems.overlay.classList.add('chocolat-visible');
      this.elems.wrapper.classList.add('chocolat-visible');
    }, 0);
    this.elems.domContainer.classList.add('chocolat-open');
    this.settings.timer = setTimeout(() => {
      if (this.elems !== undefined) {
        this.elems.loader.classList.add('chocolat-visible');
      }
    }, this.settings.duration);
    const imgLoader = new Image();
    return this.loadImage(this.settings.images[i].src, imgLoader).then(() => {
      const nextIndex = i + 1;

      if (this.settings.images[nextIndex] != undefined) {
        this.loadImage(this.settings.images[nextIndex].src, new Image());
      }

      this.settings.currentImage = i;
      const place = this.place(imgLoader);
      const appear = this.appear(i);
      return Promise.all([place, appear]);
    }).then(() => {
      this.zoomable();
      this.settings.afterImageLoad();
    });
  }

  place(image) {
    this.elems.description.textContent = this.settings.description.call(this);
    this.elems.pagination.textContent = this.settings.pagination.call(this);
    this.arrows();
    const {
      width,
      height,
      left,
      top
    } = this.fit(image, this.elems.wrapper);
    return this.center(width, height, left, top);
  }

  center(width, height, left, top) {
    return this.transitionAsPromise(() => {
      Object.assign(this.elems.content.style, {
        width: width + 'px',
        height: height + 'px',
        left: left + 'px',
        top: top + 'px'
      });
    }, this.elems.content);
  }

  appear(i) {
    clearTimeout(this.settings.timer);

    if (!this.elems.loader.classList.contains('chocolat-visible')) {
      return this.loadImage(this.settings.images[i].src, this.elems.img);
    }

    return this.transitionAsPromise(() => {
      this.elems.loader.classList.remove('chocolat-visible');
    }, this.elems.loader).then(() => {
      return this.loadImage(this.settings.images[i].src, this.elems.img);
    });
  }

  fit(image, container) {
    let height;
    let width;
    const imgHeight = image.naturalHeight;
    const imgWidth = image.naturalWidth;
    const holderHeight = container.clientHeight;
    const holderWidth = container.clientWidth;
    const holderOutMarginH = this.getOutMarginH();
    const holderOutMarginW = this.getOutMarginW();
    const holderGlobalWidth = holderWidth - holderOutMarginW;
    const holderGlobalHeight = holderHeight - holderOutMarginH;
    const holderGlobalRatio = holderGlobalHeight / holderGlobalWidth;
    const holderRatio = holderHeight / holderWidth;
    const imgRatio = imgHeight / imgWidth;

    if (this.settings.imageSize == 'cover') {
      if (imgRatio < holderRatio) {
        height = holderHeight;
        width = height / imgRatio;
      } else {
        width = holderWidth;
        height = width * imgRatio;
      }
    } else if (this.settings.imageSize == 'native') {
      height = imgHeight;
      width = imgWidth;
    } else {
      if (imgRatio > holderGlobalRatio) {
        height = holderGlobalHeight;
        width = height / imgRatio;
      } else {
        width = holderGlobalWidth;
        height = width * imgRatio;
      }

      if (this.settings.imageSize === 'default' && (width >= imgWidth || height >= imgHeight)) {
        width = imgWidth;
        height = imgHeight;
      }
    }

    return {
      height: height,
      width: width,
      top: (holderHeight - height) / 2,
      left: (holderWidth - width) / 2
    };
  }

  change(signe) {
    this.zoomOut(0);
    this.zoomable();
    var requestedImage = this.settings.currentImage + parseInt(signe);

    if (requestedImage > this.settings.lastImage) {
      if (this.settings.loop) {
        return this.load(0);
      }
    } else if (requestedImage < 0) {
      if (this.settings.loop) {
        return this.load(this.settings.lastImage);
      }
    } else {
      return this.load(requestedImage);
    }
  }

  arrows() {
    if (this.settings.loop) {
      this.elems.left.classList.add('active');
      this.elems.right.classList.add('active');
    } else if (this.settings.linkImages) {
      // right
      if (this.settings.currentImage == this.settings.lastImage) {
        this.elems.right.classList.remove('active');
      } else {
        this.elems.right.classList.add('active');
      } // left


      if (this.settings.currentImage === 0) {
        this.elems.left.classList.remove('active');
      } else {
        this.elems.left.classList.add('active');
      }
    } else {
      this.elems.left.classList.remove('active');
      this.elems.right.classList.remove('active');
    }
  }

  close() {
    if (this.settings.fullscreenOpen) {
      this.exitFullScreen();
      return;
    }

    this.settings.currentImage = undefined;
    const promiseOverlay = this.transitionAsPromise(() => {
      this.elems.overlay.classList.remove('chocolat-visible');
    }, this.elems.overlay);
    const promiseWrapper = this.transitionAsPromise(() => {
      this.elems.wrapper.classList.remove('chocolat-visible');
    }, this.elems.wrapper);
    return Promise.all([promiseOverlay, promiseWrapper]).then(() => {
      this.elems.domContainer.classList.remove('chocolat-open');
    });
  }

  destroy() {
    for (var i = this.events.length - 1; i >= 0; i--) {
      const {
        element,
        eventName
      } = this.events[i];
      this.off(element, eventName);
    }

    if (!this.settings.initialized) {
      return;
    }

    if (this.settings.fullscreenOpen) {
      this.exitFullScreen();
    }

    this.settings.currentImage = undefined;
    this.settings.initialized = false;
    this.elems.domContainer.classList.remove(...this._cssClasses);
    this.elems.wrapper.parentNode.removeChild(this.elems.wrapper);
  }

  getOutMarginW() {
    return this.elems.left.offsetWidth + this.elems.right.offsetWidth;
  }

  getOutMarginH() {
    return this.elems.top.offsetHeight + this.elems.bottom.offsetHeight;
  }

  markup() {
    this.elems.domContainer.classList.add('chocolat-open', this.settings.className);

    if (this.settings.imageSize == 'cover') {
      this.elems.domContainer.classList.add('chocolat-cover');
    }

    if (this.settings.container !== window) {
      this.elems.domContainer.classList.add('chocolat-in-container');
    }

    this.elems.wrapper = document.createElement('div');
    this.elems.wrapper.setAttribute('id', 'chocolat-content-' + this.settings.setIndex);
    this.elems.wrapper.setAttribute('class', 'chocolat-wrapper');
    this.elems.domContainer.appendChild(this.elems.wrapper);
    this.elems.overlay = document.createElement('div');
    this.elems.overlay.setAttribute('class', 'chocolat-overlay');
    this.elems.wrapper.appendChild(this.elems.overlay);
    this.elems.loader = document.createElement('div');
    this.elems.loader.setAttribute('class', 'chocolat-loader');
    this.elems.wrapper.appendChild(this.elems.loader);
    this.elems.content = document.createElement('div');
    this.elems.content.setAttribute('class', 'chocolat-content');
    this.elems.wrapper.appendChild(this.elems.content);
    this.elems.img = document.createElement('img');
    this.elems.img.setAttribute('class', 'chocolat-img');
    this.elems.content.appendChild(this.elems.img);
    this.elems.top = document.createElement('div');
    this.elems.top.setAttribute('class', 'chocolat-top');
    this.elems.wrapper.appendChild(this.elems.top);
    this.elems.left = document.createElement('div');
    this.elems.left.setAttribute('class', 'chocolat-left');
    this.elems.wrapper.appendChild(this.elems.left);
    this.elems.right = document.createElement('div');
    this.elems.right.setAttribute('class', 'chocolat-right');
    this.elems.wrapper.appendChild(this.elems.right);
    this.elems.bottom = document.createElement('div');
    this.elems.bottom.setAttribute('class', 'chocolat-bottom');
    this.elems.wrapper.appendChild(this.elems.bottom);
    this.elems.close = document.createElement('span');
    this.elems.close.setAttribute('class', 'chocolat-close');
    this.elems.top.appendChild(this.elems.close);
    this.elems.fullscreen = document.createElement('span');
    this.elems.fullscreen.setAttribute('class', 'chocolat-fullscreen');
    this.elems.bottom.appendChild(this.elems.fullscreen);
    this.elems.description = document.createElement('span');
    this.elems.description.setAttribute('class', 'chocolat-description');
    this.elems.bottom.appendChild(this.elems.description);
    this.elems.pagination = document.createElement('span');
    this.elems.pagination.setAttribute('class', 'chocolat-pagination');
    this.elems.bottom.appendChild(this.elems.pagination);
    this.elems.setTitle = document.createElement('span');
    this.elems.setTitle.setAttribute('class', 'chocolat-set-title');
    this.elems.setTitle.textContent = this.settings.setTitle();
    this.elems.bottom.appendChild(this.elems.setTitle);
    this.settings.afterMarkup.call(this);
  }

  openFullScreen() {
    var wrapper = this.elems.wrapper;

    if (wrapper.requestFullscreen) {
      this.settings.fullscreenOpen = true;
      wrapper.requestFullscreen();
    } else if (wrapper.mozRequestFullScreen) {
      this.settings.fullscreenOpen = true;
      wrapper.mozRequestFullScreen();
    } else if (wrapper.webkitRequestFullscreen) {
      this.settings.fullscreenOpen = true;
      wrapper.webkitRequestFullscreen();
    } else if (wrapper.msRequestFullscreen) {
      wrapper.msRequestFullscreen();
      this.settings.fullscreenOpen = true;
    } else {
      this.settings.fullscreenOpen = false;
    }
  }

  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      this.settings.fullscreenOpen = false;
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
      this.settings.fullscreenOpen = false;
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      this.settings.fullscreenOpen = false;
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      this.settings.fullscreenOpen = false;
    } else {
      this.settings.fullscreenOpen = true;
    }
  }

  attachListeners() {
    this.off(document, 'keydown.chocolat');
    this.on(document, 'keydown.chocolat', e => {
      if (this.settings.initialized) {
        if (e.keyCode == 37) {
          this.change(-1);
        } else if (e.keyCode == 39) {
          this.change(1);
        } else if (e.keyCode == 27) {
          this.close();
        }
      }
    });
    const right = this.elems.wrapper.querySelector('.chocolat-right');
    this.off(right, 'click.chocolat');
    this.on(right, 'click.chocolat', () => {
      this.change(+1);
    });
    const left = this.elems.wrapper.querySelector('.chocolat-left');
    this.off(left, 'click.chocolat');
    this.on(left, 'click.chocolat', () => {
      this.change(-1);
    });
    this.off(this.elems.close, 'click.chocolat');
    this.on(this.elems.close, 'click.chocolat', () => {
      this.close();
    });
    this.off(this.elems.fullscreen, 'click.chocolat');
    this.on(this.elems.fullscreen, 'click.chocolat', () => {
      if (this.settings.fullscreenOpen) {
        this.exitFullScreen();
        return;
      }

      this.openFullScreen();
    });

    if (this.settings.backgroundClose) {
      this.off(this.elems.overlay, 'click.chocolat');
      this.on(this.elems.overlay, 'click.chocolat', e => {
        this.close();
      });
    }

    this.off(this.elems.wrapper, 'click.chocolat');
    this.on(this.elems.wrapper, 'click.chocolat', e => {
      this.zoomOut(e);
    });
    const img = this.elems.wrapper.querySelector('.chocolat-img');
    this.off(img, 'click.chocolat');
    this.on(img, 'click.chocolat', e => {
      if (this.settings.initialZoomState === null && this.elems.domContainer.classList.contains('chocolat-zoomable')) {
        e.stopPropagation();
        this.zoomIn(e);
      }
    });
    this.on(this.elems.wrapper, 'mousemove.chocolat', e => {
      if (this.settings.initialZoomState === null) {
        return;
      }

      if (this.settings.currentImage === undefined) {
        return;
      }

      const rect = this.elems.wrapper.getBoundingClientRect();
      const pos = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX
      };
      var height = this.elems.wrapper.clientHeight;
      var width = this.elems.wrapper.clientWidth;
      var currentImage = this.settings.images[this.settings.currentImage];
      var imgWidth = this.elems.img.width;
      var imgHeight = this.elems.img.height;
      var coord = [e.pageX - width / 2 - pos.left, e.pageY - height / 2 - pos.top];
      var mvtX = 0;

      if (imgWidth > width) {
        var paddingX = this.settings.zoomedPaddingX(imgWidth, width);
        mvtX = coord[0] / (width / 2);
        mvtX = ((imgWidth - width) / 2 + paddingX) * mvtX;
      }

      var mvtY = 0;

      if (imgHeight > height) {
        var paddingY = this.settings.zoomedPaddingY(imgHeight, height);
        mvtY = coord[1] / (height / 2);
        mvtY = ((imgHeight - height) / 2 + paddingY) * mvtY;
      }

      this.elems.img.style.marginLeft = -mvtX + 'px';
      this.elems.img.style.marginTop = -mvtY + 'px';
    });
    this.on(window, 'resize.chocolat', e => {
      if (!this.settings.initialized || this.settings.currentImage === undefined) {
        return;
      }

      this.debounce(50, () => {
        const {
          width,
          height,
          left,
          top
        } = this.fit(this.elems.img, this.elems.wrapper);
        this.center(width, height, left, top, 0);
        this.zoomable();
      });
    });
  }

  zoomable() {
    var currentImage = this.settings.images[this.settings.currentImage];
    var wrapperWidth = this.elems.wrapper.clientWidth;
    var wrapperHeight = this.elems.wrapper.clientHeight;
    var isImageZoomable = this.settings.enableZoom && (this.elems.img.naturalWidth > wrapperWidth || this.elems.img.naturalHeight > wrapperHeight) ? true : false;
    var isImageStretched = this.elems.img.clientWidth > this.elems.img.naturalWidth || this.elems.img.clientHeight > this.elems.img.naturalHeight;

    if (isImageZoomable && !isImageStretched) {
      this.elems.domContainer.classList.add('chocolat-zoomable');
    } else {
      this.elems.domContainer.classList.remove('chocolat-zoomable');
    }
  }

  zoomIn(e) {
    this.settings.initialZoomState = this.settings.imageSize;
    this.settings.imageSize = 'native';
    this.elems.domContainer.classList.add('chocolat-zoomed');
    const {
      width,
      height,
      left,
      top
    } = this.fit(this.elems.img, this.elems.wrapper);
    return this.center(width, height, left, top, this.settings.duration);
  }

  zoomOut(e, duration) {
    if (this.settings.initialZoomState === null || this.settings.currentImage === undefined) {
      return;
    }

    duration = duration || this.settings.duration;
    this.settings.imageSize = this.settings.initialZoomState;
    this.settings.initialZoomState = null;
    this.elems.img.style.margin = 0;
    this.elems.domContainer.classList.remove('chocolat-zoomed');
    const {
      width,
      height,
      left,
      top
    } = this.fit(this.elems.img, this.elems.wrapper);
    return this.center(width, height, left, top, duration);
  }

  setDomContainer() {
    // if container == window
    // domContainer = body
    if (this.settings.container === window) {
      this.elems.domContainer = document.body;
    } else {
      this.elems.domContainer = this.settings.container;
    }
  }

  debounce(duration, callback) {
    clearTimeout(this.settings.timerDebounce);
    this.settings.timerDebounce = setTimeout(function () {
      callback();
    }, duration);
  }

  on(element, eventName, cb) {
    // const eventName = this.settings.setIndex + '-' + eventName
    const length = this.events.push({
      element,
      eventName,
      cb
    });
    element.addEventListener(eventName.split('.')[0], this.events[length - 1].cb);
    return this;
  }

  off(element, eventName) {
    // const eventName = this.settings.setIndex + '-' + eventName
    const index = this.events.findIndex(event => {
      return event.element === element && event.eventName === eventName;
    });

    if (this.events[index]) {
      element.removeEventListener(eventName.split('.')[0], this.events[index].cb);
      this.events.splice(index, 1);
    }

    return this;
  }

  transitionAsPromise(triggeringFunc, el) {
    return new Promise(resolve => {
      const handleTransitionEnd = () => {
        el.removeEventListener('transitionend', handleTransitionEnd);
        resolve();
      };

      el.addEventListener('transitionend', handleTransitionEnd);
      const classesBefore = el.getAttribute('class');
      const stylesBefore = el.getAttribute('style');
      triggeringFunc();

      if (classesBefore === el.getAttribute('class') && stylesBefore === el.getAttribute('style')) {
        handleTransitionEnd();
      }
    });
  }

  api() {
    return {
      open: i => {
        i = parseInt(i) || 0;
        return this.init(i);
      },
      close: () => {
        return this.close();
      },
      next: () => {
        return this.change(1);
      },
      prev: () => {
        return this.change(-1);
      },
      goto: i => {
        // open alias
        return this.open(i);
      },
      current: () => {
        return this.settings.currentImage;
      },
      place: () => {
        return this.place(this.elems.img, this.settings.duration);
      },
      destroy: () => {
        return this.destroy();
      },
      set: (property, value) => {
        this.settings[property] = value;
        return value;
      },
      get: property => {
        return this.settings[property];
      },
      getElem: name => {
        return this.elems[name];
      }
    };
  }

}

const instances = [];
function main_esm (options) {
  const settings = Object.assign({}, defaults, {
    images: []
  }, options, {
    setIndex: instances.length
  });
  const instance = new Chocolat(elements, settings);
  instances.push(instance);
  return instance;
}

module.exports = main_esm;
