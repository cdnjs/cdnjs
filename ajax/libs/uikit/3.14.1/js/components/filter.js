/*! UIkit 3.14.1 | https://www.getuikit.com | (c) 2014 - 2022 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitfilter', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitFilter = factory(global.UIkit.util));
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

    var Component = {
      mixins: [Animate],

      args: 'target',

      props: {
        target: Boolean,
        selActive: Boolean },


      data: {
        target: null,
        selActive: false,
        attrItem: 'uk-filter-control',
        cls: 'uk-active',
        duration: 250 },


      computed: {
        toggles: {
          get(_ref, $el) {let { attrItem } = _ref;
            return uikitUtil.$$("[" + attrItem + "],[data-" + attrItem + "]", $el);
          },

          watch() {
            this.updateState();

            if (this.selActive !== false) {
              const actives = uikitUtil.$$(this.selActive, this.$el);
              this.toggles.forEach((el) => uikitUtil.toggleClass(el, this.cls, uikitUtil.includes(actives, el)));
            }
          },

          immediate: true },


        children: {
          get(_ref2, $el) {let { target } = _ref2;
            return uikitUtil.$$(target + " > *", $el);
          },

          watch(list, old) {
            if (old && !isEqualList(list, old)) {
              this.updateState();
            }
          },

          immediate: true } },



      events: [
      {
        name: 'click',

        delegate() {
          return "[" + this.attrItem + "],[data-" + this.attrItem + "]";
        },

        handler(e) {
          e.preventDefault();
          this.apply(e.current);
        } }],



      methods: {
        apply(el) {
          const prevState = this.getState();
          const newState = mergeState(el, this.attrItem, this.getState());

          if (!isEqualState(prevState, newState)) {
            this.setState(newState);
          }
        },

        getState() {
          return this.toggles.
          filter((item) => uikitUtil.hasClass(item, this.cls)).
          reduce((state, el) => mergeState(el, this.attrItem, state), {
            filter: { '': '' },
            sort: [] });

        },

        setState(state, animate) {if (animate === void 0) {animate = true;}
          state = { filter: { '': '' }, sort: [], ...state };

          uikitUtil.trigger(this.$el, 'beforeFilter', [this, state]);

          this.toggles.forEach((el) =>
          uikitUtil.toggleClass(el, this.cls, !!matchFilter(el, this.attrItem, state)));


          Promise.all(
          uikitUtil.$$(this.target, this.$el).map((target) => {
            const filterFn = () => {
              applyState(state, target, uikitUtil.children(target));
              this.$update(this.$el);
            };
            return animate ? this.animate(filterFn, target) : filterFn();
          })).
          then(() => uikitUtil.trigger(this.$el, 'afterFilter', [this]));
        },

        updateState() {
          uikitUtil.fastdom.write(() => this.setState(this.getState(), false));
        } } };



    function getFilter(el, attr) {
      return uikitUtil.parseOptions(uikitUtil.data(el, attr), ['filter']);
    }

    function isEqualState(stateA, stateB) {
      return ['filter', 'sort'].every((prop) => uikitUtil.isEqual(stateA[prop], stateB[prop]));
    }

    function applyState(state, target, children) {
      const selector = getSelector(state);

      children.forEach((el) => uikitUtil.css(el, 'display', selector && !uikitUtil.matches(el, selector) ? 'none' : ''));

      const [sort, order] = state.sort;

      if (sort) {
        const sorted = sortItems(children, sort, order);
        if (!uikitUtil.isEqual(sorted, children)) {
          uikitUtil.append(target, sorted);
        }
      }
    }

    function mergeState(el, attr, state) {
      const filterBy = getFilter(el, attr);
      const { filter, group, sort, order = 'asc' } = filterBy;

      if (filter || uikitUtil.isUndefined(sort)) {
        if (group) {
          if (filter) {
            delete state.filter[''];
            state.filter[group] = filter;
          } else {
            delete state.filter[group];

            if (uikitUtil.isEmpty(state.filter) || '' in state.filter) {
              state.filter = { '': filter || '' };
            }
          }
        } else {
          state.filter = { '': filter || '' };
        }
      }

      if (!uikitUtil.isUndefined(sort)) {
        state.sort = [sort, order];
      }

      return state;
    }

    function matchFilter(
    el,
    attr, _ref3)

    {let { filter: stateFilter = { '': '' }, sort: [stateSort, stateOrder] } = _ref3;
      const { filter = '', group = '', sort, order = 'asc' } = getFilter(el, attr);

      return uikitUtil.isUndefined(sort) ?
      group in stateFilter && filter === stateFilter[group] ||
      !filter && group && !(group in stateFilter) && !stateFilter[''] :
      stateSort === sort && stateOrder === order;
    }

    function isEqualList(listA, listB) {
      return listA.length === listB.length && listA.every((el) => listB.includes(el));
    }

    function getSelector(_ref4) {let { filter } = _ref4;
      let selector = '';
      uikitUtil.each(filter, (value) => selector += value || '');
      return selector;
    }

    function sortItems(nodes, sort, order) {
      return [...nodes].sort(
      (a, b) =>
      uikitUtil.data(a, sort).localeCompare(uikitUtil.data(b, sort), undefined, { numeric: true }) * (
      order === 'asc' || -1));

    }

    if (typeof window !== 'undefined' && window.UIkit) {
      window.UIkit.component('filter', Component);
    }

    return Component;

}));
