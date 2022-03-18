/*! UIkit 3.13.0 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitsortable', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSortable = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    function getRows(items) {
      return sortBy(items, 'top', 'bottom');
    }

    function sortBy(items, startProp, endProp) {
      const sorted = [[]];

      for (const el of items) {
        if (!uikitUtil.isVisible(el)) {
          continue;
        }

        let dim = getOffset(el);

        for (let i = sorted.length - 1; i >= 0; i--) {
          const current = sorted[i];

          if (!current[0]) {
            current.push(el);
            break;
          }

          let startDim;
          if (current[0].offsetParent === el.offsetParent) {
            startDim = getOffset(current[0]);
          } else {
            dim = getOffset(el, true);
            startDim = getOffset(current[0], true);
          }

          if (dim[startProp] >= startDim[endProp] - 1 && dim[startProp] !== startDim[startProp]) {
            sorted.push([el]);
            break;
          }

          if (dim[endProp] - 1 > startDim[startProp] || dim[startProp] === startDim[startProp]) {
            current.push(el);
            break;
          }

          if (i === 0) {
            sorted.unshift([el]);
            break;
          }
        }
      }

      return sorted;
    }

    function getOffset(element, offset) {if (offset === void 0) {offset = false;}
      let { offsetTop, offsetLeft, offsetHeight, offsetWidth } = element;

      if (offset) {
        [offsetTop, offsetLeft] = uikitUtil.offsetPosition(element);
      }

      return {
        top: offsetTop,
        left: offsetLeft,
        bottom: offsetTop + offsetHeight,
        right: offsetLeft + offsetWidth };

    }

    const clsLeave = 'uk-transition-leave';
    const clsEnter = 'uk-transition-enter';

    function fade(action, target, duration, stagger) {if (stagger === void 0) {stagger = 0;}
      const index = transitionIndex(target, true);
      const propsIn = { opacity: 1 };
      const propsOut = { opacity: 0 };

      const wrapIndexFn = (fn) => () => index === transitionIndex(target) ? fn() : Promise.reject();

      const leaveFn = wrapIndexFn(() => {
        uikitUtil.addClass(target, clsLeave);

        return Promise.all(
        getTransitionNodes(target).map(
        (child, i) =>
        new Promise((resolve) =>
        setTimeout(
        () =>
        uikitUtil.Transition.start(child, propsOut, duration / 2, 'ease').then(
        resolve),

        i * stagger)))).



        then(() => uikitUtil.removeClass(target, clsLeave));
      });

      const enterFn = wrapIndexFn(() => {
        const oldHeight = uikitUtil.height(target);

        uikitUtil.addClass(target, clsEnter);
        action();

        uikitUtil.css(uikitUtil.children(target), { opacity: 0 });

        // Ensure UIkit updates have propagated
        return new Promise((resolve) =>
        requestAnimationFrame(() => {
          const nodes = uikitUtil.children(target);
          const newHeight = uikitUtil.height(target);

          // Ensure Grid cells do not stretch when height is applied
          uikitUtil.css(target, 'alignContent', 'flex-start');
          uikitUtil.height(target, oldHeight);

          const transitionNodes = getTransitionNodes(target);
          uikitUtil.css(nodes, propsOut);

          const transitions = transitionNodes.map(
          (child, i) =>
          new Promise((resolve) =>
          setTimeout(
          () =>
          uikitUtil.Transition.start(child, propsIn, duration / 2, 'ease').then(
          resolve),

          i * stagger)));




          if (oldHeight !== newHeight) {
            transitions.push(
            uikitUtil.Transition.start(
            target,
            { height: newHeight },
            duration / 2 + transitionNodes.length * stagger,
            'ease'));


          }

          Promise.all(transitions).then(() => {
            uikitUtil.removeClass(target, clsEnter);
            if (index === transitionIndex(target)) {
              uikitUtil.css(target, { height: '', alignContent: '' });
              uikitUtil.css(nodes, { opacity: '' });
              delete target.dataset.transition;
            }
            resolve();
          });
        }));

      });

      return uikitUtil.hasClass(target, clsLeave) ?
      waitTransitionend(target).then(enterFn) :
      uikitUtil.hasClass(target, clsEnter) ?
      waitTransitionend(target).then(leaveFn).then(enterFn) :
      leaveFn().then(enterFn);
    }

    function transitionIndex(target, next) {
      if (next) {
        target.dataset.transition = 1 + transitionIndex(target);
      }

      return uikitUtil.toNumber(target.dataset.transition) || 0;
    }

    function waitTransitionend(target) {
      return Promise.all(
      uikitUtil.children(target).
      filter(uikitUtil.Transition.inProgress).
      map(
      (el) =>
      new Promise((resolve) => uikitUtil.once(el, 'transitionend transitioncanceled', resolve))));


    }

    function getTransitionNodes(target) {
      return getRows(uikitUtil.children(target)).reduce(
      (nodes, row) =>
      nodes.concat(
      uikitUtil.sortBy(
      row.filter((el) => uikitUtil.isInView(el)),
      'offsetLeft')),


      []);

    }

    function slide (action, target, duration) {
      return new Promise((resolve) =>
      requestAnimationFrame(() => {
        let nodes = uikitUtil.children(target);

        // Get current state
        const currentProps = nodes.map((el) => getProps(el, true));
        const targetProps = uikitUtil.css(target, ['height', 'padding']);

        // Cancel previous animations
        uikitUtil.Transition.cancel(target);
        nodes.forEach(uikitUtil.Transition.cancel);
        reset(target);

        // Adding, sorting, removing nodes
        action();

        // Find new nodes
        nodes = nodes.concat(uikitUtil.children(target).filter((el) => !uikitUtil.includes(nodes, el)));

        // Wait for update to propagate
        Promise.resolve().then(() => {
          // Force update
          uikitUtil.fastdom.flush();

          // Get new state
          const targetPropsTo = uikitUtil.css(target, ['height', 'padding']);
          const [propsTo, propsFrom] = getTransitionProps(target, nodes, currentProps);

          // Reset to previous state
          nodes.forEach((el, i) => propsFrom[i] && uikitUtil.css(el, propsFrom[i]));
          uikitUtil.css(target, { display: 'block', ...targetProps });

          // Start transitions on next frame
          requestAnimationFrame(() => {
            const transitions = nodes.
            map(
            (el, i) =>
            uikitUtil.parent(el) === target &&
            uikitUtil.Transition.start(el, propsTo[i], duration, 'ease')).

            concat(uikitUtil.Transition.start(target, targetPropsTo, duration, 'ease'));

            Promise.all(transitions).
            then(() => {
              nodes.forEach(
              (el, i) =>
              uikitUtil.parent(el) === target &&
              uikitUtil.css(el, 'display', propsTo[i].opacity === 0 ? 'none' : ''));

              reset(target);
            }, uikitUtil.noop).
            then(resolve);
          });
        });
      }));

    }

    function getProps(el, opacity) {
      const zIndex = uikitUtil.css(el, 'zIndex');

      return uikitUtil.isVisible(el) ?
      {
        display: '',
        opacity: opacity ? uikitUtil.css(el, 'opacity') : '0',
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: zIndex === 'auto' ? uikitUtil.index(el) : zIndex,
        ...getPositionWithMargin(el) } :

      false;
    }

    function getTransitionProps(target, nodes, currentProps) {
      const propsTo = nodes.map((el, i) =>
      uikitUtil.parent(el) && i in currentProps ?
      currentProps[i] ?
      uikitUtil.isVisible(el) ?
      getPositionWithMargin(el) :
      { opacity: 0 } :
      { opacity: uikitUtil.isVisible(el) ? 1 : 0 } :
      false);


      const propsFrom = propsTo.map((props, i) => {
        const from = uikitUtil.parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));

        if (!from) {
          return false;
        }

        if (!props) {
          delete from.opacity;
        } else if (!('opacity' in props)) {
          const { opacity } = from;

          if (opacity % 1) {
            props.opacity = 1;
          } else {
            delete from.opacity;
          }
        }

        return from;
      });

      return [propsTo, propsFrom];
    }

    function reset(el) {
      uikitUtil.css(el.children, {
        height: '',
        left: '',
        opacity: '',
        pointerEvents: '',
        position: '',
        top: '',
        marginTop: '',
        marginLeft: '',
        transform: '',
        width: '',
        zIndex: '' });

      uikitUtil.css(el, { height: '', display: '', padding: '' });
    }

    function getPositionWithMargin(el) {
      const { height, width } = uikitUtil.offset(el);
      const { top, left } = uikitUtil.position(el);
      const { marginLeft, marginTop } = uikitUtil.css(el, ['marginTop', 'marginLeft']);

      return { top, left, height, width, marginLeft, marginTop, transform: '' };
    }

    var Animate = {
      props: {
        duration: Number,
        animation: Boolean },


      data: {
        duration: 150,
        animation: 'slide' },


      methods: {
        animate(action, target) {if (target === void 0) {target = this.$el;}
          const name = this.animation;
          const animationFn =
          name === 'fade' ?
          fade :
          name === 'delayed-fade' ?
          function () {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return fade(...args, 40);} :
          name ?
          slide :
          () => {
            action();
            return Promise.resolve();
          };

          return animationFn(action, target, this.duration).then(
          () => this.$update(target, 'resize'),
          uikitUtil.noop);

        } } };

    var Class = {
      connected() {
        !uikitUtil.hasClass(this.$el, this.$name) && uikitUtil.addClass(this.$el, this.$name);
      } };

    var Component = {
      mixins: [Class, Animate],

      props: {
        group: String,
        threshold: Number,
        clsItem: String,
        clsPlaceholder: String,
        clsDrag: String,
        clsDragState: String,
        clsBase: String,
        clsNoDrag: String,
        clsEmpty: String,
        clsCustom: String,
        handle: String },


      data: {
        group: false,
        threshold: 5,
        clsItem: 'uk-sortable-item',
        clsPlaceholder: 'uk-sortable-placeholder',
        clsDrag: 'uk-sortable-drag',
        clsDragState: 'uk-drag',
        clsBase: 'uk-sortable',
        clsNoDrag: 'uk-sortable-nodrag',
        clsEmpty: 'uk-sortable-empty',
        clsCustom: '',
        handle: false,
        pos: {} },


      created() {
        for (const key of ['init', 'start', 'move', 'end']) {
          const fn = this[key];
          this[key] = (e) => {
            uikitUtil.assign(this.pos, uikitUtil.getEventPos(e));
            fn(e);
          };
        }
      },

      events: {
        name: uikitUtil.pointerDown,
        passive: false,
        handler: 'init' },


      computed: {
        target() {
          return (this.$el.tBodies || [this.$el])[0];
        },

        items() {
          return uikitUtil.children(this.target);
        },

        isEmpty: {
          get() {
            return uikitUtil.isEmpty(this.items);
          },

          watch(empty) {
            uikitUtil.toggleClass(this.target, this.clsEmpty, empty);
          },

          immediate: true },


        handles: {
          get(_ref, el) {let { handle } = _ref;
            return handle ? uikitUtil.$$(handle, el) : this.items;
          },

          watch(handles, prev) {
            uikitUtil.css(prev, { touchAction: '', userSelect: '' });
            uikitUtil.css(handles, { touchAction: uikitUtil.hasTouch ? 'none' : '', userSelect: 'none' }); // touchAction set to 'none' causes a performance drop in Chrome 80
          },

          immediate: true } },



      update: {
        write(data) {
          if (!this.drag || !uikitUtil.parent(this.placeholder)) {
            return;
          }

          const {
            pos: { x, y },
            origin: { offsetTop, offsetLeft },
            placeholder } =
          this;

          uikitUtil.css(this.drag, {
            top: y - offsetTop,
            left: x - offsetLeft });


          const sortable = this.getSortable(document.elementFromPoint(x, y));

          if (!sortable) {
            return;
          }

          const { items } = sortable;

          if (items.some(uikitUtil.Transition.inProgress)) {
            return;
          }

          const target = findTarget(items, { x, y });

          if (items.length && (!target || target === placeholder)) {
            return;
          }

          const previous = this.getSortable(placeholder);
          const insertTarget = findInsertTarget(
          sortable.target,
          target,
          placeholder,
          x,
          y,
          sortable === previous && data.moved !== target);


          if (insertTarget === false) {
            return;
          }

          if (insertTarget && placeholder === insertTarget) {
            return;
          }

          if (sortable !== previous) {
            previous.remove(placeholder);
            data.moved = target;
          } else {
            delete data.moved;
          }

          sortable.insert(placeholder, insertTarget);

          this.touched.add(sortable);
        },

        events: ['move'] },


      methods: {
        init(e) {
          const { target, button, defaultPrevented } = e;
          const [placeholder] = this.items.filter((el) => uikitUtil.within(target, el));

          if (
          !placeholder ||
          defaultPrevented ||
          button > 0 ||
          uikitUtil.isInput(target) ||
          uikitUtil.within(target, "." + this.clsNoDrag) ||
          this.handle && !uikitUtil.within(target, this.handle))
          {
            return;
          }

          e.preventDefault();

          this.touched = new Set([this]);
          this.placeholder = placeholder;
          this.origin = { target, index: uikitUtil.index(placeholder), ...this.pos };

          uikitUtil.on(document, uikitUtil.pointerMove, this.move);
          uikitUtil.on(document, uikitUtil.pointerUp, this.end);

          if (!this.threshold) {
            this.start(e);
          }
        },

        start(e) {
          this.drag = appendDrag(this.$container, this.placeholder);
          const { left, top } = this.placeholder.getBoundingClientRect();
          uikitUtil.assign(this.origin, { offsetLeft: this.pos.x - left, offsetTop: this.pos.y - top });

          uikitUtil.addClass(this.drag, this.clsDrag, this.clsCustom);
          uikitUtil.addClass(this.placeholder, this.clsPlaceholder);
          uikitUtil.addClass(this.items, this.clsItem);
          uikitUtil.addClass(document.documentElement, this.clsDragState);

          uikitUtil.trigger(this.$el, 'start', [this, this.placeholder]);

          trackScroll(this.pos);

          this.move(e);
        },

        move(e) {
          if (this.drag) {
            this.$emit('move');
          } else if (
          Math.abs(this.pos.x - this.origin.x) > this.threshold ||
          Math.abs(this.pos.y - this.origin.y) > this.threshold)
          {
            this.start(e);
          }
        },

        end() {
          uikitUtil.off(document, uikitUtil.pointerMove, this.move);
          uikitUtil.off(document, uikitUtil.pointerUp, this.end);

          if (!this.drag) {
            return;
          }

          untrackScroll();

          const sortable = this.getSortable(this.placeholder);

          if (this === sortable) {
            if (this.origin.index !== uikitUtil.index(this.placeholder)) {
              uikitUtil.trigger(this.$el, 'moved', [this, this.placeholder]);
            }
          } else {
            uikitUtil.trigger(sortable.$el, 'added', [sortable, this.placeholder]);
            uikitUtil.trigger(this.$el, 'removed', [this, this.placeholder]);
          }

          uikitUtil.trigger(this.$el, 'stop', [this, this.placeholder]);

          uikitUtil.remove(this.drag);
          this.drag = null;

          for (const { clsPlaceholder, clsItem } of this.touched) {
            for (const sortable of this.touched) {
              uikitUtil.removeClass(sortable.items, clsPlaceholder, clsItem);
            }
          }
          this.touched = null;
          uikitUtil.removeClass(document.documentElement, this.clsDragState);
        },

        insert(element, target) {
          uikitUtil.addClass(this.items, this.clsItem);

          const insert = () => target ? uikitUtil.before(target, element) : uikitUtil.append(this.target, element);

          this.animate(insert);
        },

        remove(element) {
          if (!uikitUtil.within(element, this.target)) {
            return;
          }

          this.animate(() => uikitUtil.remove(element));
        },

        getSortable(element) {
          do {
            const sortable = this.$getComponent(element, 'sortable');

            if (
            sortable && (
            sortable === this || this.group !== false && sortable.group === this.group))
            {
              return sortable;
            }
          } while (element = uikitUtil.parent(element));
        } } };



    let trackTimer;
    function trackScroll(pos) {
      let last = Date.now();
      trackTimer = setInterval(() => {
        let { x, y } = pos;
        y += uikitUtil.scrollTop(window);

        const dist = (Date.now() - last) * 0.3;
        last = Date.now();

        uikitUtil.scrollParents(document.elementFromPoint(x, pos.y), /auto|scroll/).
        reverse().
        some((scrollEl) => {
          let { scrollTop: scroll, scrollHeight } = scrollEl;

          const { top, bottom, height } = uikitUtil.offset(uikitUtil.getViewport(scrollEl));

          if (top < y && top + 35 > y) {
            scroll -= dist;
          } else if (bottom > y && bottom - 35 < y) {
            scroll += dist;
          } else {
            return;
          }

          if (scroll > 0 && scroll < scrollHeight - height) {
            uikitUtil.scrollTop(scrollEl, scroll);
            return true;
          }
        });
      }, 15);
    }

    function untrackScroll() {
      clearInterval(trackTimer);
    }

    function appendDrag(container, element) {
      const clone = uikitUtil.append(
      container,
      element.outerHTML.replace(/(^<)(?:li|tr)|(?:li|tr)(\/>$)/g, '$1div$2'));


      uikitUtil.css(clone, 'margin', '0', 'important');
      uikitUtil.css(clone, {
        boxSizing: 'border-box',
        width: element.offsetWidth,
        height: element.offsetHeight,
        padding: uikitUtil.css(element, 'padding') });


      uikitUtil.height(clone.firstElementChild, uikitUtil.height(element.firstElementChild));

      return clone;
    }

    function findTarget(items, point) {
      return items[uikitUtil.findIndex(items, (item) => uikitUtil.pointInRect(point, item.getBoundingClientRect()))];
    }

    function findInsertTarget(list, target, placeholder, x, y, sameList) {
      if (!uikitUtil.children(list).length) {
        return;
      }

      const rect = target.getBoundingClientRect();
      if (!sameList) {
        if (!isHorizontal(list, placeholder)) {
          return y < rect.top + rect.height / 2 ? target : target.nextElementSibling;
        }

        return target;
      }

      const placeholderRect = placeholder.getBoundingClientRect();
      const sameRow = linesIntersect(
      [rect.top, rect.bottom],
      [placeholderRect.top, placeholderRect.bottom]);


      const pointerPos = sameRow ? x : y;
      const lengthProp = sameRow ? 'width' : 'height';
      const startProp = sameRow ? 'left' : 'top';
      const endProp = sameRow ? 'right' : 'bottom';

      const diff =
      placeholderRect[lengthProp] < rect[lengthProp] ?
      rect[lengthProp] - placeholderRect[lengthProp] :
      0;

      if (placeholderRect[startProp] < rect[startProp]) {
        if (diff && pointerPos < rect[startProp] + diff) {
          return false;
        }

        return target.nextElementSibling;
      }

      if (diff && pointerPos > rect[endProp] - diff) {
        return false;
      }

      return target;
    }

    function isHorizontal(list, placeholder) {
      const single = uikitUtil.children(list).length === 1;

      if (single) {
        uikitUtil.append(list, placeholder);
      }

      const items = uikitUtil.children(list);
      const isHorizontal = items.some((el, i) => {
        const rectA = el.getBoundingClientRect();
        return items.slice(i + 1).some((el) => {
          const rectB = el.getBoundingClientRect();
          return !linesIntersect([rectA.left, rectA.right], [rectB.left, rectB.right]);
        });
      });

      if (single) {
        uikitUtil.remove(placeholder);
      }

      return isHorizontal;
    }

    function linesIntersect(lineA, lineB) {
      return lineA[1] > lineB[0] && lineB[1] > lineA[0];
    }

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('sortable', Component);
    }

    return Component;

}));
