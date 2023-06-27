/*! UIkit 3.16.15 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitfilter', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitFilter = factory(global.UIkit.util));
})(this, (function (uikitUtil) { 'use strict';

    function resize(options) {
      return observe(uikitUtil.observeResize, options, "resize");
    }
    function mutation(options) {
      return observe(uikitUtil.observeMutation, options);
    }
    function observe(observe2, options, emit) {
      return {
        observe: observe2,
        handler() {
          this.$emit(emit);
        },
        ...options
      };
    }

    ({
      props: {
        margin: String,
        firstColumn: Boolean
      },
      data: {
        margin: "uk-margin-small-top",
        firstColumn: "uk-first-column"
      },
      observe: [
        mutation({
          options: {
            childList: true,
            attributes: true,
            attributeFilter: ["style"]
          }
        }),
        resize({
          target: ({ $el }) => [$el, ...uikitUtil.children($el)]
        })
      ],
      update: {
        read() {
          const rows = getRows(this.$el.children);
          return {
            rows,
            columns: getColumns(rows)
          };
        },
        write({ columns, rows }) {
          for (const row of rows) {
            for (const column of row) {
              uikitUtil.toggleClass(column, this.margin, rows[0] !== row);
              uikitUtil.toggleClass(column, this.firstColumn, columns[0].includes(column));
            }
          }
        },
        events: ["resize"]
      }
    });
    function getRows(items) {
      return sortBy(items, "top", "bottom");
    }
    function getColumns(rows) {
      const columns = [];
      for (const row of rows) {
        const sorted = sortBy(row, "left", "right");
        for (let j = 0; j < sorted.length; j++) {
          columns[j] = columns[j] ? columns[j].concat(sorted[j]) : sorted[j];
        }
      }
      return uikitUtil.isRtl ? columns.reverse() : columns;
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
    function getOffset(element, offset = false) {
      let { offsetTop, offsetLeft, offsetHeight, offsetWidth } = element;
      if (offset) {
        [offsetTop, offsetLeft] = uikitUtil.offsetPosition(element);
      }
      return {
        top: offsetTop,
        left: offsetLeft,
        bottom: offsetTop + offsetHeight,
        right: offsetLeft + offsetWidth
      };
    }

    const clsLeave = "uk-transition-leave";
    const clsEnter = "uk-transition-enter";
    function fade(action, target, duration, stagger = 0) {
      const index = transitionIndex(target, true);
      const propsIn = { opacity: 1 };
      const propsOut = { opacity: 0 };
      const wrapIndexFn = (fn) => () => index === transitionIndex(target) ? fn() : Promise.reject();
      const leaveFn = wrapIndexFn(async () => {
        uikitUtil.addClass(target, clsLeave);
        await Promise.all(
          getTransitionNodes(target).map(
            (child, i) => new Promise(
              (resolve) => setTimeout(
                () => uikitUtil.Transition.start(child, propsOut, duration / 2, "ease").then(
                  resolve
                ),
                i * stagger
              )
            )
          )
        );
        uikitUtil.removeClass(target, clsLeave);
      });
      const enterFn = wrapIndexFn(async () => {
        const oldHeight = uikitUtil.height(target);
        uikitUtil.addClass(target, clsEnter);
        action();
        uikitUtil.css(uikitUtil.children(target), { opacity: 0 });
        await awaitFrame$1();
        const nodes = uikitUtil.children(target);
        const newHeight = uikitUtil.height(target);
        uikitUtil.css(target, "alignContent", "flex-start");
        uikitUtil.height(target, oldHeight);
        const transitionNodes = getTransitionNodes(target);
        uikitUtil.css(nodes, propsOut);
        const transitions = transitionNodes.map(async (child, i) => {
          await awaitTimeout(i * stagger);
          await uikitUtil.Transition.start(child, propsIn, duration / 2, "ease");
        });
        if (oldHeight !== newHeight) {
          transitions.push(
            uikitUtil.Transition.start(
              target,
              { height: newHeight },
              duration / 2 + transitionNodes.length * stagger,
              "ease"
            )
          );
        }
        await Promise.all(transitions).then(() => {
          uikitUtil.removeClass(target, clsEnter);
          if (index === transitionIndex(target)) {
            uikitUtil.css(target, { height: "", alignContent: "" });
            uikitUtil.css(nodes, { opacity: "" });
            delete target.dataset.transition;
          }
        });
      });
      return uikitUtil.hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : uikitUtil.hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
    }
    function transitionIndex(target, next) {
      if (next) {
        target.dataset.transition = 1 + transitionIndex(target);
      }
      return uikitUtil.toNumber(target.dataset.transition) || 0;
    }
    function waitTransitionend(target) {
      return Promise.all(
        uikitUtil.children(target).filter(uikitUtil.Transition.inProgress).map(
          (el) => new Promise((resolve) => uikitUtil.once(el, "transitionend transitioncanceled", resolve))
        )
      );
    }
    function getTransitionNodes(target) {
      return getRows(uikitUtil.children(target)).reduce(
        (nodes, row) => nodes.concat(
          uikitUtil.sortBy(
            row.filter((el) => uikitUtil.isInView(el)),
            "offsetLeft"
          )
        ),
        []
      );
    }
    function awaitFrame$1() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }
    function awaitTimeout(timeout) {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    }

    async function slide(action, target, duration) {
      await awaitFrame();
      let nodes = uikitUtil.children(target);
      const currentProps = nodes.map((el) => getProps(el, true));
      const targetProps = { ...uikitUtil.css(target, ["height", "padding"]), display: "block" };
      await Promise.all(nodes.concat(target).map(uikitUtil.Transition.cancel));
      action();
      nodes = nodes.concat(uikitUtil.children(target).filter((el) => !uikitUtil.includes(nodes, el)));
      await Promise.resolve();
      uikitUtil.fastdom.flush();
      const targetStyle = uikitUtil.attr(target, "style");
      const targetPropsTo = uikitUtil.css(target, ["height", "padding"]);
      const [propsTo, propsFrom] = getTransitionProps(target, nodes, currentProps);
      const attrsTo = nodes.map((el) => ({ style: uikitUtil.attr(el, "style") }));
      nodes.forEach((el, i) => propsFrom[i] && uikitUtil.css(el, propsFrom[i]));
      uikitUtil.css(target, targetProps);
      uikitUtil.trigger(target, "scroll");
      uikitUtil.fastdom.flush();
      await awaitFrame();
      const transitions = nodes.map((el, i) => uikitUtil.parent(el) === target && uikitUtil.Transition.start(el, propsTo[i], duration, "ease")).concat(uikitUtil.Transition.start(target, targetPropsTo, duration, "ease"));
      try {
        await Promise.all(transitions);
        nodes.forEach((el, i) => {
          uikitUtil.attr(el, attrsTo[i]);
          if (uikitUtil.parent(el) === target) {
            uikitUtil.css(el, "display", propsTo[i].opacity === 0 ? "none" : "");
          }
        });
        uikitUtil.attr(target, "style", targetStyle);
      } catch (e) {
        uikitUtil.attr(nodes, "style", "");
        resetProps(target, targetProps);
      }
    }
    function getProps(el, opacity) {
      const zIndex = uikitUtil.css(el, "zIndex");
      return uikitUtil.isVisible(el) ? {
        display: "",
        opacity: opacity ? uikitUtil.css(el, "opacity") : "0",
        pointerEvents: "none",
        position: "absolute",
        zIndex: zIndex === "auto" ? uikitUtil.index(el) : zIndex,
        ...getPositionWithMargin(el)
      } : false;
    }
    function getTransitionProps(target, nodes, currentProps) {
      const propsTo = nodes.map(
        (el, i) => uikitUtil.parent(el) && i in currentProps ? currentProps[i] ? uikitUtil.isVisible(el) ? getPositionWithMargin(el) : { opacity: 0 } : { opacity: uikitUtil.isVisible(el) ? 1 : 0 } : false
      );
      const propsFrom = propsTo.map((props, i) => {
        const from = uikitUtil.parent(nodes[i]) === target && (currentProps[i] || getProps(nodes[i]));
        if (!from) {
          return false;
        }
        if (!props) {
          delete from.opacity;
        } else if (!("opacity" in props)) {
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
    function resetProps(el, props) {
      for (const prop in props) {
        uikitUtil.css(el, prop, "");
      }
    }
    function getPositionWithMargin(el) {
      const { height, width } = uikitUtil.offset(el);
      return {
        height,
        width,
        transform: "",
        ...uikitUtil.position(el),
        ...uikitUtil.css(el, ["marginTop", "marginLeft"])
      };
    }
    function awaitFrame() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    var Animate = {
      props: {
        duration: Number,
        animation: Boolean
      },
      data: {
        duration: 150,
        animation: "slide"
      },
      methods: {
        animate(action, target = this.$el) {
          const name = this.animation;
          const animationFn = name === "fade" ? fade : name === "delayed-fade" ? (...args) => fade(...args, 40) : name ? slide : () => {
            action();
            return Promise.resolve();
          };
          return animationFn(action, target, this.duration).catch(uikitUtil.noop);
        }
      }
    };

    function parseOptions(options, args = []) {
      try {
        return options ? uikitUtil.startsWith(options, "{") ? JSON.parse(options) : args.length && !uikitUtil.includes(options, ":") ? { [args[0]]: options } : options.split(";").reduce((options2, option) => {
          const [key, value] = option.split(/:(.*)/);
          if (key && !uikitUtil.isUndefined(value)) {
            options2[key.trim()] = value.trim();
          }
          return options2;
        }, {}) : {};
      } catch (e) {
        return {};
      }
    }

    const keyMap = {
      TAB: 9,
      ESC: 27,
      SPACE: 32,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };

    var Component = {
      mixins: [Animate],
      args: "target",
      props: {
        target: Boolean,
        selActive: Boolean
      },
      data: {
        target: null,
        selActive: false,
        attrItem: "uk-filter-control",
        cls: "uk-active",
        duration: 250
      },
      computed: {
        toggles({ attrItem }, $el) {
          return uikitUtil.$$(`[${attrItem}],[data-${attrItem}]`, $el);
        },
        children({ target }, $el) {
          return uikitUtil.$$(`${target} > *`, $el);
        }
      },
      watch: {
        toggles(toggles) {
          this.updateState();
          const actives = uikitUtil.$$(this.selActive, this.$el);
          for (const toggle of toggles) {
            if (this.selActive !== false) {
              uikitUtil.toggleClass(toggle, this.cls, uikitUtil.includes(actives, toggle));
            }
            const button = findButton(toggle);
            if (uikitUtil.isTag(button, "a")) {
              uikitUtil.attr(button, "role", "button");
            }
          }
        },
        children(list, prev) {
          if (prev) {
            this.updateState();
          }
        }
      },
      events: {
        name: "click keydown",
        delegate() {
          return `[${this.attrItem}],[data-${this.attrItem}]`;
        },
        handler(e) {
          if (e.type === "keydown" && e.keyCode !== keyMap.SPACE) {
            return;
          }
          if (uikitUtil.closest(e.target, "a,button")) {
            e.preventDefault();
            this.apply(e.current);
          }
        }
      },
      methods: {
        apply(el) {
          const prevState = this.getState();
          const newState = mergeState(el, this.attrItem, this.getState());
          if (!isEqualState(prevState, newState)) {
            this.setState(newState);
          }
        },
        getState() {
          return this.toggles.filter((item) => uikitUtil.hasClass(item, this.cls)).reduce((state, el) => mergeState(el, this.attrItem, state), {
            filter: { "": "" },
            sort: []
          });
        },
        async setState(state, animate = true) {
          state = { filter: { "": "" }, sort: [], ...state };
          uikitUtil.trigger(this.$el, "beforeFilter", [this, state]);
          for (const toggle of this.toggles) {
            uikitUtil.toggleClass(toggle, this.cls, matchFilter(toggle, this.attrItem, state));
          }
          await Promise.all(
            uikitUtil.$$(this.target, this.$el).map((target) => {
              const filterFn = () => {
                applyState(state, target, uikitUtil.children(target));
                this.$update(this.$el);
              };
              return animate ? this.animate(filterFn, target) : filterFn();
            })
          );
          uikitUtil.trigger(this.$el, "afterFilter", [this]);
        },
        updateState() {
          uikitUtil.fastdom.write(() => this.setState(this.getState(), false));
        }
      }
    };
    function getFilter(el, attr2) {
      return parseOptions(uikitUtil.data(el, attr2), ["filter"]);
    }
    function isEqualState(stateA, stateB) {
      return ["filter", "sort"].every((prop) => uikitUtil.isEqual(stateA[prop], stateB[prop]));
    }
    function applyState(state, target, children) {
      const selector = getSelector(state);
      children.forEach((el) => uikitUtil.css(el, "display", selector && !uikitUtil.matches(el, selector) ? "none" : ""));
      const [sort, order] = state.sort;
      if (sort) {
        const sorted = sortItems(children, sort, order);
        if (!uikitUtil.isEqual(sorted, children)) {
          uikitUtil.append(target, sorted);
        }
      }
    }
    function mergeState(el, attr2, state) {
      const { filter, group, sort, order = "asc" } = getFilter(el, attr2);
      if (filter || uikitUtil.isUndefined(sort)) {
        if (group) {
          if (filter) {
            delete state.filter[""];
            state.filter[group] = filter;
          } else {
            delete state.filter[group];
            if (uikitUtil.isEmpty(state.filter) || "" in state.filter) {
              state.filter = { "": filter || "" };
            }
          }
        } else {
          state.filter = { "": filter || "" };
        }
      }
      if (!uikitUtil.isUndefined(sort)) {
        state.sort = [sort, order];
      }
      return state;
    }
    function matchFilter(el, attr2, { filter: stateFilter = { "": "" }, sort: [stateSort, stateOrder] }) {
      const { filter = "", group = "", sort, order = "asc" } = getFilter(el, attr2);
      return uikitUtil.isUndefined(sort) ? group in stateFilter && filter === stateFilter[group] || !filter && group && !(group in stateFilter) && !stateFilter[""] : stateSort === sort && stateOrder === order;
    }
    function getSelector({ filter }) {
      let selector = "";
      uikitUtil.each(filter, (value) => selector += value || "");
      return selector;
    }
    function sortItems(nodes, sort, order) {
      return [...nodes].sort(
        (a, b) => uikitUtil.data(a, sort).localeCompare(uikitUtil.data(b, sort), void 0, { numeric: true }) * (order === "asc" || -1)
      );
    }
    function findButton(el) {
      return uikitUtil.$("a,button", el) || el;
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("filter", Component);
    }

    return Component;

}));
