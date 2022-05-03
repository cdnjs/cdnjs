/*! UIkit 3.14.1 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitslider', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSlider = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    var Class = {
      connected() {
        !uikitUtil.hasClass(this.$el, this.$name) && uikitUtil.addClass(this.$el, this.$name);
      } };

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

    function translate(value, unit) {if (value === void 0) {value = 0;}if (unit === void 0) {unit = '%';}
      value += value ? unit : '';
      return "translate3d(" + value + ", 0, 0)";
    }

    function Transitioner (prev, next, dir, _ref) {let { center, easing, list } = _ref;
      const deferred = new uikitUtil.Deferred();

      const from = prev ?
      getLeft(prev, list, center) :
      getLeft(next, list, center) + uikitUtil.dimensions(next).width * dir;
      const to = next ?
      getLeft(next, list, center) :
      from + uikitUtil.dimensions(prev).width * dir * (uikitUtil.isRtl ? -1 : 1);

      return {
        dir,

        show(duration, percent, linear) {if (percent === void 0) {percent = 0;}
          const timing = linear ? 'linear' : easing;
          duration -= Math.round(duration * uikitUtil.clamp(percent, -1, 1));

          this.translate(percent);

          percent = prev ? percent : uikitUtil.clamp(percent, 0, 1);
          triggerUpdate(this.getItemIn(), 'itemin', { percent, duration, timing, dir });
          prev &&
          triggerUpdate(this.getItemIn(true), 'itemout', {
            percent: 1 - percent,
            duration,
            timing,
            dir });


          uikitUtil.Transition.start(
          list,
          { transform: translate(-to * (uikitUtil.isRtl ? -1 : 1), 'px') },
          duration,
          timing).
          then(deferred.resolve, uikitUtil.noop);

          return deferred.promise;
        },

        cancel() {
          uikitUtil.Transition.cancel(list);
        },

        reset() {
          uikitUtil.css(list, 'transform', '');
        },

        forward(duration, percent) {if (percent === void 0) {percent = this.percent();}
          uikitUtil.Transition.cancel(list);
          return this.show(duration, percent, true);
        },

        translate(percent) {
          const distance = this.getDistance() * dir * (uikitUtil.isRtl ? -1 : 1);

          uikitUtil.css(
          list,
          'transform',
          translate(
          uikitUtil.clamp(
          -to + (distance - distance * percent),
          -getWidth(list),
          uikitUtil.dimensions(list).width) * (
          uikitUtil.isRtl ? -1 : 1),
          'px'));



          const actives = this.getActives();
          const itemIn = this.getItemIn();
          const itemOut = this.getItemIn(true);

          percent = prev ? uikitUtil.clamp(percent, -1, 1) : 0;

          for (const slide of uikitUtil.children(list)) {
            const isActive = uikitUtil.includes(actives, slide);
            const isIn = slide === itemIn;
            const isOut = slide === itemOut;
            const translateIn =
            isIn ||
            !isOut && (
            isActive ||
            dir * (uikitUtil.isRtl ? -1 : 1) === -1 ^
            getElLeft(slide, list) > getElLeft(prev || next));

            triggerUpdate(slide, "itemtranslate" + (translateIn ? 'in' : 'out'), {
              dir,
              percent: isOut ? 1 - percent : isIn ? percent : isActive ? 1 : 0 });

          }
        },

        percent() {
          return Math.abs(
          (uikitUtil.css(list, 'transform').split(',')[4] * (uikitUtil.isRtl ? -1 : 1) + from) / (to - from));

        },

        getDistance() {
          return Math.abs(to - from);
        },

        getItemIn(out) {if (out === void 0) {out = false;}
          let actives = this.getActives();
          let nextActives = inView(list, getLeft(next || prev, list, center));

          if (out) {
            const temp = actives;
            actives = nextActives;
            nextActives = temp;
          }

          return nextActives[uikitUtil.findIndex(nextActives, (el) => !uikitUtil.includes(actives, el))];
        },

        getActives() {
          return inView(list, getLeft(prev || next, list, center));
        } };

    }

    function getLeft(el, list, center) {
      const left = getElLeft(el, list);

      return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
    }

    function getMax(list) {
      return Math.max(0, getWidth(list) - uikitUtil.dimensions(list).width);
    }

    function getWidth(list) {
      return uikitUtil.children(list).reduce((right, el) => uikitUtil.dimensions(el).width + right, 0);
    }

    function centerEl(el, list) {
      return uikitUtil.dimensions(list).width / 2 - uikitUtil.dimensions(el).width / 2;
    }

    function getElLeft(el, list) {
      return (
        el &&
        (uikitUtil.position(el).left + (uikitUtil.isRtl ? uikitUtil.dimensions(el).width - uikitUtil.dimensions(list).width : 0)) * (
        uikitUtil.isRtl ? -1 : 1) ||
        0);

    }

    function inView(list, listLeft) {
      listLeft -= 1;
      const listWidth = uikitUtil.dimensions(list).width;
      const listRight = listLeft + listWidth + 2;

      return uikitUtil.children(list).filter((slide) => {
        const slideLeft = getElLeft(slide, list);
        const slideRight = slideLeft + Math.min(uikitUtil.dimensions(slide).width, listWidth);

        return slideLeft >= listLeft && slideRight <= listRight;
      });
    }

    function triggerUpdate(el, type, data) {
      uikitUtil.trigger(el, uikitUtil.createEvent(type, false, false, data));
    }

    var Component = {
      mixins: [Class, Slider, SliderReactive, SliderPreload],

      props: {
        center: Boolean,
        sets: Boolean },


      data: {
        center: false,
        sets: false,
        attrItem: 'uk-slider-item',
        selList: '.uk-slider-items',
        selNav: '.uk-slider-nav',
        clsContainer: 'uk-slider-container',
        Transitioner },


      computed: {
        avgWidth() {
          return getWidth(this.list) / this.length;
        },

        finite(_ref) {let { finite } = _ref;
          return (
            finite ||
            Math.ceil(getWidth(this.list)) <
            Math.trunc(uikitUtil.dimensions(this.list).width + getMaxElWidth(this.list) + this.center));

        },

        maxIndex() {
          if (!this.finite || this.center && !this.sets) {
            return this.length - 1;
          }

          if (this.center) {
            return uikitUtil.last(this.sets);
          }

          let lft = 0;
          const max = getMax(this.list);
          const index = uikitUtil.findIndex(this.slides, (el) => {
            if (lft >= max) {
              return true;
            }

            lft += uikitUtil.dimensions(el).width;
          });

          return ~index ? index : this.length - 1;
        },

        sets(_ref2) {let { sets: enabled } = _ref2;
          if (!enabled) {
            return;
          }

          let left = 0;
          const sets = [];
          const width = uikitUtil.dimensions(this.list).width;
          for (let i = 0; i < this.slides.length; i++) {
            const slideWidth = uikitUtil.dimensions(this.slides[i]).width;

            if (left + slideWidth > width) {
              left = 0;
            }

            if (this.center) {
              if (
              left < width / 2 &&
              left + slideWidth + uikitUtil.dimensions(this.slides[+i + 1]).width / 2 > width / 2)
              {
                sets.push(+i);
                left = width / 2 - slideWidth / 2;
              }
            } else if (left === 0) {
              sets.push(Math.min(+i, this.maxIndex));
            }

            left += slideWidth;
          }

          if (sets.length) {
            return sets;
          }
        },

        transitionOptions() {
          return {
            center: this.center,
            list: this.list };

        } },


      connected() {
        uikitUtil.toggleClass(this.$el, this.clsContainer, !uikitUtil.$("." + this.clsContainer, this.$el));
      },

      update: {
        write() {
          for (const el of this.navItems) {
            const index = uikitUtil.toNumber(uikitUtil.data(el, this.attrItem));
            if (index !== false) {
              el.hidden =
              !this.maxIndex ||
              index > this.maxIndex ||
              this.sets && !uikitUtil.includes(this.sets, index);
            }
          }

          if (this.length && !this.dragging && !this.stack.length) {
            this.reorder();
            this._translate(1);
          }

          this.updateActiveClasses();
        },

        events: ['resize'] },


      events: {
        beforeitemshow(e) {
          if (
          !this.dragging &&
          this.sets &&
          this.stack.length < 2 &&
          !uikitUtil.includes(this.sets, this.index))
          {
            this.index = this.getValidIndex();
          }

          const diff = Math.abs(
          this.index -
          this.prevIndex + (
          this.dir > 0 && this.index < this.prevIndex ||
          this.dir < 0 && this.index > this.prevIndex ?
          (this.maxIndex + 1) * this.dir :
          0));


          if (!this.dragging && diff > 1) {
            for (let i = 0; i < diff; i++) {
              this.stack.splice(1, 0, this.dir > 0 ? 'next' : 'previous');
            }

            e.preventDefault();
            return;
          }

          const index =
          this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex;
          this.duration =
          speedUp(this.avgWidth / this.velocity) * (
          uikitUtil.dimensions(this.slides[index]).width / this.avgWidth);

          this.reorder();
        },

        itemshow() {
          if (~this.prevIndex) {
            uikitUtil.addClass(this._getTransitioner().getItemIn(), this.clsActive);
          }
        },

        itemshown() {
          this.updateActiveClasses();
        } },


      methods: {
        reorder() {
          if (this.finite) {
            uikitUtil.css(this.slides, 'order', '');
            return;
          }

          const index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;

          this.slides.forEach((slide, i) =>
          uikitUtil.css(
          slide,
          'order',
          this.dir > 0 && i < index ? 1 : this.dir < 0 && i >= this.index ? -1 : ''));



          if (!this.center) {
            return;
          }

          const next = this.slides[index];
          let width = uikitUtil.dimensions(this.list).width / 2 - uikitUtil.dimensions(next).width / 2;
          let j = 0;

          while (width > 0) {
            const slideIndex = this.getIndex(--j + index, index);
            const slide = this.slides[slideIndex];

            uikitUtil.css(slide, 'order', slideIndex > index ? -2 : -1);
            width -= uikitUtil.dimensions(slide).width;
          }
        },

        updateActiveClasses() {
          const actives = this._getTransitioner(this.index).getActives();
          const activeClasses = [
          this.clsActive,
          (!this.sets || uikitUtil.includes(this.sets, uikitUtil.toFloat(this.index))) && this.clsActivated ||
          ''];

          for (const slide of this.slides) {
            uikitUtil.toggleClass(slide, activeClasses, uikitUtil.includes(actives, slide));
          }
        },

        getValidIndex(index, prevIndex) {if (index === void 0) {index = this.index;}if (prevIndex === void 0) {prevIndex = this.prevIndex;}
          index = this.getIndex(index, prevIndex);

          if (!this.sets) {
            return index;
          }

          let prev;

          do {
            if (uikitUtil.includes(this.sets, index)) {
              return index;
            }

            prev = index;
            index = this.getIndex(index + this.dir, prevIndex);
          } while (index !== prev);

          return index;
        },

        getAdjacentSlides() {
          const { width } = uikitUtil.dimensions(this.list);
          const left = -width;
          const right = width * 2;
          const slideWidth = uikitUtil.dimensions(this.slides[this.index]).width;
          const slideLeft = this.center ? width / 2 - slideWidth / 2 : 0;
          const slides = new Set();
          for (const i of [-1, 1]) {
            let currentLeft = slideLeft + (i > 0 ? slideWidth : 0);
            let j = 0;
            do {
              const slide = this.slides[this.getIndex(this.index + i + j++ * i)];
              currentLeft += uikitUtil.dimensions(slide).width * i;
              slides.add(slide);
            } while (this.slides.length > j && currentLeft > left && currentLeft < right);
          }
          return Array.from(slides);
        } } };



    function getMaxElWidth(list) {
      return Math.max(0, ...uikitUtil.children(list).map((el) => uikitUtil.dimensions(el).width));
    }

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('slider', Component);
    }

    return Component;

}));
