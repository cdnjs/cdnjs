/*! UIkit 3.14.1 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitslideshow', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSlideshow = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Class = {
      connected() {
        !uikitUtil.hasClass(this.$el, this.$name) && uikitUtil.addClass(this.$el, this.$name);
      } };

    var Animations$1 = {
      slide: {
        show(dir) {
          return [{ transform: translate(dir * -100) }, { transform: translate() }];
        },

        percent(current) {
          return translated(current);
        },

        translate(percent, dir) {
          return [
          { transform: translate(dir * -100 * percent) },
          { transform: translate(dir * 100 * (1 - percent)) }];

        } } };



    function translated(el) {
      return Math.abs(uikitUtil.css(el, 'transform').split(',')[4] / el.offsetWidth) || 0;
    }

    function translate(value, unit) {if (value === void 0) {value = 0;}if (unit === void 0) {unit = '%';}
      value += value ? unit : '';
      return "translate3d(" + value + ", 0, 0)";
    }

    function scale3d(value) {
      return "scale3d(" + value + ", " + value + ", 1)";
    }

    function Transitioner(prev, next, dir, _ref) {let { animation, easing } = _ref;
      const { percent, translate, show = uikitUtil.noop } = animation;
      const props = show(dir);
      const deferred = new uikitUtil.Deferred();

      return {
        dir,

        show(duration, percent, linear) {if (percent === void 0) {percent = 0;}
          const timing = linear ? 'linear' : easing;
          duration -= Math.round(duration * uikitUtil.clamp(percent, -1, 1));

          this.translate(percent);

          triggerUpdate(next, 'itemin', { percent, duration, timing, dir });
          triggerUpdate(prev, 'itemout', { percent: 1 - percent, duration, timing, dir });

          Promise.all([
          uikitUtil.Transition.start(next, props[1], duration, timing),
          uikitUtil.Transition.start(prev, props[0], duration, timing)]).
          then(() => {
            this.reset();
            deferred.resolve();
          }, uikitUtil.noop);

          return deferred.promise;
        },

        cancel() {
          uikitUtil.Transition.cancel([next, prev]);
        },

        reset() {
          for (const prop in props[0]) {
            uikitUtil.css([next, prev], prop, '');
          }
        },

        forward(duration, percent) {if (percent === void 0) {percent = this.percent();}
          uikitUtil.Transition.cancel([next, prev]);
          return this.show(duration, percent, true);
        },

        translate(percent) {
          this.reset();

          const props = translate(percent, dir);
          uikitUtil.css(next, props[1]);
          uikitUtil.css(prev, props[0]);
          triggerUpdate(next, 'itemtranslatein', { percent, dir });
          triggerUpdate(prev, 'itemtranslateout', { percent: 1 - percent, dir });
        },

        percent() {
          return percent(prev || next, next, dir);
        },

        getDistance() {
          return prev == null ? void 0 : prev.offsetWidth;
        } };

    }

    function triggerUpdate(el, type, data) {
      uikitUtil.trigger(el, uikitUtil.createEvent(type, false, false, data));
    }

    var Resize = {
      connected() {var _this$$options$resize;
        this.registerObserver(
        uikitUtil.observeResize(((_this$$options$resize = this.$options.resizeTargets) == null ? void 0 : _this$$options$resize.call(this)) || this.$el, () =>
        this.$emit('resize')));


      } };

    var SliderAutoplay = {
      props: {
        autoplay: Boolean,
        autoplayInterval: Number,
        pauseOnHover: Boolean },


      data: {
        autoplay: false,
        autoplayInterval: 7000,
        pauseOnHover: true },


      connected() {
        this.autoplay && this.startAutoplay();
      },

      disconnected() {
        this.stopAutoplay();
      },

      update() {
        uikitUtil.attr(this.slides, 'tabindex', '-1');
      },

      events: [
      {
        name: 'visibilitychange',

        el() {
          return document;
        },

        filter() {
          return this.autoplay;
        },

        handler() {
          if (document.hidden) {
            this.stopAutoplay();
          } else {
            this.startAutoplay();
          }
        } }],



      methods: {
        startAutoplay() {
          this.stopAutoplay();

          this.interval = setInterval(
          () =>
          (!this.draggable || !uikitUtil.$(':focus', this.$el)) && (
          !this.pauseOnHover || !uikitUtil.matches(this.$el, ':hover')) &&
          !this.stack.length &&
          this.show('next'),
          this.autoplayInterval);

        },

        stopAutoplay() {
          this.interval && clearInterval(this.interval);
        } } };

    var SliderDrag = {
      props: {
        draggable: Boolean },


      data: {
        draggable: true,
        threshold: 10 },


      created() {
        for (const key of ['start', 'move', 'end']) {
          const fn = this[key];
          this[key] = (e) => {
            const pos = uikitUtil.getEventPos(e).x * (uikitUtil.isRtl ? -1 : 1);

            this.prevPos = pos === this.pos ? this.prevPos : this.pos;
            this.pos = pos;

            fn(e);
          };
        }
      },

      events: [
      {
        name: uikitUtil.pointerDown,

        delegate() {
          return this.selSlides;
        },

        handler(e) {
          if (
          !this.draggable ||
          !uikitUtil.isTouch(e) && hasTextNodesOnly(e.target) ||
          uikitUtil.closest(e.target, uikitUtil.selInput) ||
          e.button > 0 ||
          this.length < 2)
          {
            return;
          }

          this.start(e);
        } },


      {
        name: 'dragstart',

        handler(e) {
          e.preventDefault();
        } }],



      methods: {
        start() {
          this.drag = this.pos;

          if (this._transitioner) {
            this.percent = this._transitioner.percent();
            this.drag += this._transitioner.getDistance() * this.percent * this.dir;

            this._transitioner.cancel();
            this._transitioner.translate(this.percent);

            this.dragging = true;

            this.stack = [];
          } else {
            this.prevIndex = this.index;
          }

          uikitUtil.on(document, uikitUtil.pointerMove, this.move, { passive: false });

          // 'input' event is triggered by video controls
          uikitUtil.on(document, uikitUtil.pointerUp + " " + uikitUtil.pointerCancel + " input", this.end, true);

          uikitUtil.css(this.list, 'userSelect', 'none');
        },

        move(e) {
          const distance = this.pos - this.drag;

          if (
          distance === 0 ||
          this.prevPos === this.pos ||
          !this.dragging && Math.abs(distance) < this.threshold)
          {
            return;
          }

          // prevent click event
          uikitUtil.css(this.list, 'pointerEvents', 'none');

          e.cancelable && e.preventDefault();

          this.dragging = true;
          this.dir = distance < 0 ? 1 : -1;

          const { slides } = this;
          let { prevIndex } = this;
          let dis = Math.abs(distance);
          let nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
          let width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;

          while (nextIndex !== prevIndex && dis > width) {
            this.drag -= width * this.dir;

            prevIndex = nextIndex;
            dis -= width;
            nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
            width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
          }

          this.percent = dis / width;

          const prev = slides[prevIndex];
          const next = slides[nextIndex];
          const changed = this.index !== nextIndex;
          const edge = prevIndex === nextIndex;

          let itemShown;

          [this.index, this.prevIndex].
          filter((i) => !uikitUtil.includes([nextIndex, prevIndex], i)).
          forEach((i) => {
            uikitUtil.trigger(slides[i], 'itemhidden', [this]);

            if (edge) {
              itemShown = true;
              this.prevIndex = prevIndex;
            }
          });

          if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
            uikitUtil.trigger(slides[this.index], 'itemshown', [this]);
          }

          if (changed) {
            this.prevIndex = prevIndex;
            this.index = nextIndex;

            !edge && uikitUtil.trigger(prev, 'beforeitemhide', [this]);
            uikitUtil.trigger(next, 'beforeitemshow', [this]);
          }

          this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);

          if (changed) {
            !edge && uikitUtil.trigger(prev, 'itemhide', [this]);
            uikitUtil.trigger(next, 'itemshow', [this]);
          }
        },

        end() {
          uikitUtil.off(document, uikitUtil.pointerMove, this.move, { passive: false });
          uikitUtil.off(document, uikitUtil.pointerUp + " " + uikitUtil.pointerCancel + " input", this.end, true);

          if (this.dragging) {
            this.dragging = null;

            if (this.index === this.prevIndex) {
              this.percent = 1 - this.percent;
              this.dir *= -1;
              this._show(false, this.index, true);
              this._transitioner = null;
            } else {
              const dirChange =
              (uikitUtil.isRtl ? this.dir * (uikitUtil.isRtl ? 1 : -1) : this.dir) < 0 ===
              this.prevPos > this.pos;
              this.index = dirChange ? this.index : this.prevIndex;

              if (dirChange) {
                this.percent = 1 - this.percent;
              }

              this.show(
              this.dir > 0 && !dirChange || this.dir < 0 && dirChange ?
              'next' :
              'previous',
              true);

            }
          }

          uikitUtil.css(this.list, { userSelect: '', pointerEvents: '' });

          this.drag = this.percent = null;
        } } };



    function hasTextNodesOnly(el) {
      return !el.children.length && el.childNodes.length;
    }

    var SliderNav = {
      data: {
        selNav: false },


      computed: {
        nav(_ref, $el) {let { selNav } = _ref;
          return uikitUtil.$(selNav, $el);
        },

        selNavItem(_ref2) {let { attrItem } = _ref2;
          return "[" + attrItem + "],[data-" + attrItem + "]";
        },

        navItems(_, $el) {
          return uikitUtil.$$(this.selNavItem, $el);
        } },


      update: {
        write() {
          if (this.nav && this.length !== this.nav.children.length) {
            uikitUtil.html(
            this.nav,
            this.slides.
            map((_, i) => "<li " + this.attrItem + "=\"" + i + "\"><a href></a></li>").
            join(''));

          }

          this.navItems.concat(this.nav).forEach((el) => el && (el.hidden = !this.maxIndex));

          this.updateNav();
        },

        events: ['resize'] },


      events: [
      {
        name: 'click',

        delegate() {
          return this.selNavItem;
        },

        handler(e) {
          e.preventDefault();
          this.show(uikitUtil.data(e.current, this.attrItem));
        } },


      {
        name: 'itemshow',
        handler: 'updateNav' }],



      methods: {
        updateNav() {
          const i = this.getValidIndex();
          for (const el of this.navItems) {
            const cmd = uikitUtil.data(el, this.attrItem);

            uikitUtil.toggleClass(el, this.clsActive, uikitUtil.toNumber(cmd) === i);
            uikitUtil.toggleClass(
            el,
            'uk-invisible',
            this.finite && (
            cmd === 'previous' && i === 0 || cmd === 'next' && i >= this.maxIndex));

          }
        } } };

    var Slider = {
      mixins: [SliderAutoplay, SliderDrag, SliderNav, Resize],

      props: {
        clsActivated: Boolean,
        easing: String,
        index: Number,
        finite: Boolean,
        velocity: Number,
        selSlides: String },


      data: () => ({
        easing: 'ease',
        finite: false,
        velocity: 1,
        index: 0,
        prevIndex: -1,
        stack: [],
        percent: 0,
        clsActive: 'uk-active',
        clsActivated: false,
        Transitioner: false,
        transitionOptions: {} }),


      connected() {
        this.prevIndex = -1;
        this.index = this.getValidIndex(this.$props.index);
        this.stack = [];
      },

      disconnected() {
        uikitUtil.removeClass(this.slides, this.clsActive);
      },

      computed: {
        duration(_ref, $el) {let { velocity } = _ref;
          return speedUp($el.offsetWidth / velocity);
        },

        list(_ref2, $el) {let { selList } = _ref2;
          return uikitUtil.$(selList, $el);
        },

        maxIndex() {
          return this.length - 1;
        },

        selSlides(_ref3) {let { selList, selSlides } = _ref3;
          return selList + " " + (selSlides || '> *');
        },

        slides: {
          get() {
            return uikitUtil.$$(this.selSlides, this.$el);
          },

          watch() {
            this.$reset();
          } },


        length() {
          return this.slides.length;
        } },


      methods: {
        show(index, force) {if (force === void 0) {force = false;}
          if (this.dragging || !this.length) {
            return;
          }

          const { stack } = this;
          const queueIndex = force ? 0 : stack.length;
          const reset = () => {
            stack.splice(queueIndex, 1);

            if (stack.length) {
              this.show(stack.shift(), true);
            }
          };

          stack[force ? 'unshift' : 'push'](index);

          if (!force && stack.length > 1) {
            if (stack.length === 2) {
              this._transitioner.forward(Math.min(this.duration, 200));
            }

            return;
          }

          const prevIndex = this.getIndex(this.index);
          const prev = uikitUtil.hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
          const nextIndex = this.getIndex(index, this.index);
          const next = this.slides[nextIndex];

          if (prev === next) {
            reset();
            return;
          }

          this.dir = getDirection(index, prevIndex);
          this.prevIndex = prevIndex;
          this.index = nextIndex;

          if (
          prev && !uikitUtil.trigger(prev, 'beforeitemhide', [this]) ||
          !uikitUtil.trigger(next, 'beforeitemshow', [this, prev]))
          {
            this.index = this.prevIndex;
            reset();
            return;
          }

          const promise = this._show(prev, next, force).then(() => {
            prev && uikitUtil.trigger(prev, 'itemhidden', [this]);
            uikitUtil.trigger(next, 'itemshown', [this]);

            return new Promise((resolve) => {
              uikitUtil.fastdom.write(() => {
                stack.shift();
                if (stack.length) {
                  this.show(stack.shift(), true);
                } else {
                  this._transitioner = null;
                }
                resolve();
              });
            });
          });

          prev && uikitUtil.trigger(prev, 'itemhide', [this]);
          uikitUtil.trigger(next, 'itemshow', [this]);

          return promise;
        },

        getIndex(index, prev) {if (index === void 0) {index = this.index;}if (prev === void 0) {prev = this.index;}
          return uikitUtil.clamp(uikitUtil.getIndex(index, this.slides, prev, this.finite), 0, this.maxIndex);
        },

        getValidIndex(index, prevIndex) {if (index === void 0) {index = this.index;}if (prevIndex === void 0) {prevIndex = this.prevIndex;}
          return this.getIndex(index, prevIndex);
        },

        _show(prev, next, force) {
          this._transitioner = this._getTransitioner(prev, next, this.dir, {
            easing: force ?
            next.offsetWidth < 600 ?
            'cubic-bezier(0.25, 0.46, 0.45, 0.94)' /* easeOutQuad */ :
            'cubic-bezier(0.165, 0.84, 0.44, 1)' /* easeOutQuart */ :
            this.easing,
            ...this.transitionOptions });


          if (!force && !prev) {
            this._translate(1);
            return Promise.resolve();
          }

          const { length } = this.stack;
          return this._transitioner[length > 1 ? 'forward' : 'show'](
          length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration,
          this.percent);

        },

        _getDistance(prev, next) {
          return this._getTransitioner(prev, prev !== next && next).getDistance();
        },

        _translate(percent, prev, next) {if (prev === void 0) {prev = this.prevIndex;}if (next === void 0) {next = this.index;}
          const transitioner = this._getTransitioner(prev !== next ? prev : false, next);
          transitioner.translate(percent);
          return transitioner;
        },

        _getTransitioner(
        prev,
        next,
        dir,
        options)
        {if (prev === void 0) {prev = this.prevIndex;}if (next === void 0) {next = this.index;}if (dir === void 0) {dir = this.dir || 1;}if (options === void 0) {options = this.transitionOptions;}
          return new this.Transitioner(
          uikitUtil.isNumber(prev) ? this.slides[prev] : prev,
          uikitUtil.isNumber(next) ? this.slides[next] : next,
          dir * (uikitUtil.isRtl ? -1 : 1),
          options);

        } } };



    function getDirection(index, prevIndex) {
      return index === 'next' ? 1 : index === 'previous' ? -1 : index < prevIndex ? -1 : 1;
    }

    function speedUp(x) {
      return 0.5 * x + 300; // parabola through (400,500; 600,600; 1800,1200)
    }

    var Slideshow = {
      mixins: [Slider],

      props: {
        animation: String },


      data: {
        animation: 'slide',
        clsActivated: 'uk-transition-active',
        Animations: Animations$1,
        Transitioner },


      computed: {
        animation(_ref) {let { animation, Animations } = _ref;
          return { ...(Animations[animation] || Animations.slide), name: animation };
        },

        transitionOptions() {
          return { animation: this.animation };
        } },


      events: {
        beforeitemshow(_ref2) {let { target } = _ref2;
          uikitUtil.addClass(target, this.clsActive);
        },

        itemshown(_ref3) {let { target } = _ref3;
          uikitUtil.addClass(target, this.clsActivated);
        },

        itemhidden(_ref4) {let { target } = _ref4;
          uikitUtil.removeClass(target, this.clsActive, this.clsActivated);
        } } };

    var Animations = {
      ...Animations$1,
      fade: {
        show() {
          return [{ opacity: 0, zIndex: 0 }, { zIndex: -1 }];
        },

        percent(current) {
          return 1 - uikitUtil.css(current, 'opacity');
        },

        translate(percent) {
          return [{ opacity: 1 - percent, zIndex: 0 }, { zIndex: -1 }];
        } },


      scale: {
        show() {
          return [{ opacity: 0, transform: scale3d(1 + 0.5), zIndex: 0 }, { zIndex: -1 }];
        },

        percent(current) {
          return 1 - uikitUtil.css(current, 'opacity');
        },

        translate(percent) {
          return [
          { opacity: 1 - percent, transform: scale3d(1 + 0.5 * percent), zIndex: 0 },
          { zIndex: -1 }];

        } },


      pull: {
        show(dir) {
          return dir < 0 ?
          [
          { transform: translate(30), zIndex: -1 },
          { transform: translate(), zIndex: 0 }] :

          [
          { transform: translate(-100), zIndex: 0 },
          { transform: translate(), zIndex: -1 }];

        },

        percent(current, next, dir) {
          return dir < 0 ? 1 - translated(next) : translated(current);
        },

        translate(percent, dir) {
          return dir < 0 ?
          [
          { transform: translate(30 * percent), zIndex: -1 },
          { transform: translate(-100 * (1 - percent)), zIndex: 0 }] :

          [
          { transform: translate(-percent * 100), zIndex: 0 },
          { transform: translate(30 * (1 - percent)), zIndex: -1 }];

        } },


      push: {
        show(dir) {
          return dir < 0 ?
          [
          { transform: translate(100), zIndex: 0 },
          { transform: translate(), zIndex: -1 }] :

          [
          { transform: translate(-30), zIndex: -1 },
          { transform: translate(), zIndex: 0 }];

        },

        percent(current, next, dir) {
          return dir > 0 ? 1 - translated(next) : translated(current);
        },

        translate(percent, dir) {
          return dir < 0 ?
          [
          { transform: translate(percent * 100), zIndex: 0 },
          { transform: translate(-30 * (1 - percent)), zIndex: -1 }] :

          [
          { transform: translate(-30 * percent), zIndex: -1 },
          { transform: translate(100 * (1 - percent)), zIndex: 0 }];

        } } };

    var SliderReactive = {
      update: {
        write() {
          if (this.stack.length || this.dragging) {
            return;
          }

          const index = this.getValidIndex(this.index);

          if (!~this.prevIndex || this.index !== index) {
            this.show(index);
          }
        },

        events: ['resize'] } };

    var Lazyload = {
      methods: {
        lazyload(observeTargets, targets) {if (observeTargets === void 0) {observeTargets = this.$el;}if (targets === void 0) {targets = this.$el;}
          this.registerObserver(
          uikitUtil.observeIntersection(observeTargets, (entries, observer) => {
            for (const el of uikitUtil.toNodes(uikitUtil.isFunction(targets) ? targets() : targets)) {
              uikitUtil.$$('[loading="lazy"]', el).forEach((el) => uikitUtil.removeAttr(el, 'loading'));
            }
            for (const el of entries.
            filter((_ref) => {let { isIntersecting } = _ref;return isIntersecting;}).
            map((_ref2) => {let { target } = _ref2;return target;})) {
              observer.unobserve(el);
            }
          }));

        } } };

    var SliderPreload = {
      mixins: [Lazyload],

      connected() {
        this.lazyload(this.slides, this.getAdjacentSlides);
      } };

    var Component = {
      mixins: [Class, Slideshow, SliderReactive, SliderPreload],

      props: {
        ratio: String,
        minHeight: Number,
        maxHeight: Number },


      data: {
        ratio: '16:9',
        minHeight: false,
        maxHeight: false,
        selList: '.uk-slideshow-items',
        attrItem: 'uk-slideshow-item',
        selNav: '.uk-slideshow-nav',
        Animations },


      update: {
        read() {
          if (!this.list) {
            return false;
          }

          let [width, height] = this.ratio.split(':').map(Number);

          height = height * this.list.offsetWidth / width || 0;

          if (this.minHeight) {
            height = Math.max(this.minHeight, height);
          }

          if (this.maxHeight) {
            height = Math.min(this.maxHeight, height);
          }

          return { height: height - uikitUtil.boxModelAdjust(this.list, 'height', 'content-box') };
        },

        write(_ref) {let { height } = _ref;
          height > 0 && uikitUtil.css(this.list, 'minHeight', height);
        },

        events: ['resize'] },


      methods: {
        getAdjacentSlides() {
          return [1, -1].map((i) => this.slides[this.getIndex(this.index + i)]);
        } } };

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('slideshow', Component);
    }

    return Component;

}));
