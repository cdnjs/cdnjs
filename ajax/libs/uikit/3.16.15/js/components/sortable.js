/*! UIkit 3.16.15 | https://www.getuikit.com | (c) 2014 - 2023 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
    typeof define === 'function' && define.amd ? define('uikitsortable', ['uikit-util'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkitSortable = factory(global.UIkit.util));
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

    var Class = {
      connected() {
        uikitUtil.addClass(this.$el, this.$options.id);
      }
    };

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
        handle: String
      },
      data: {
        group: false,
        threshold: 5,
        clsItem: "uk-sortable-item",
        clsPlaceholder: "uk-sortable-placeholder",
        clsDrag: "uk-sortable-drag",
        clsDragState: "uk-drag",
        clsBase: "uk-sortable",
        clsNoDrag: "uk-sortable-nodrag",
        clsEmpty: "uk-sortable-empty",
        clsCustom: "",
        handle: false,
        pos: {}
      },
      created() {
        for (const key of ["init", "start", "move", "end"]) {
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
        handler: "init"
      },
      computed: {
        target() {
          return (this.$el.tBodies || [this.$el])[0];
        },
        items() {
          return uikitUtil.children(this.target);
        },
        isEmpty() {
          return uikitUtil.isEmpty(this.items);
        },
        handles({ handle }, el) {
          return handle ? uikitUtil.$$(handle, el) : this.items;
        }
      },
      watch: {
        isEmpty(empty) {
          uikitUtil.toggleClass(this.target, this.clsEmpty, empty);
        },
        handles(handles, prev) {
          uikitUtil.css(prev, { touchAction: "", userSelect: "" });
          uikitUtil.css(handles, { touchAction: uikitUtil.hasTouch ? "none" : "", userSelect: "none" });
        }
      },
      update: {
        write(data) {
          if (!this.drag || !uikitUtil.parent(this.placeholder)) {
            return;
          }
          const {
            pos: { x, y },
            origin: { offsetTop, offsetLeft },
            placeholder
          } = this;
          uikitUtil.css(this.drag, {
            top: y - offsetTop,
            left: x - offsetLeft
          });
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
            sortable === previous && data.moved !== target
          );
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
        events: ["move"]
      },
      methods: {
        init(e) {
          const { target, button, defaultPrevented } = e;
          const [placeholder] = this.items.filter((el) => uikitUtil.within(target, el));
          if (!placeholder || defaultPrevented || button > 0 || uikitUtil.isInput(target) || uikitUtil.within(target, `.${this.clsNoDrag}`) || this.handle && !uikitUtil.within(target, this.handle)) {
            return;
          }
          e.preventDefault();
          this.touched = /* @__PURE__ */ new Set([this]);
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
          uikitUtil.trigger(this.$el, "start", [this, this.placeholder]);
          trackScroll(this.pos);
          this.move(e);
        },
        move(e) {
          if (this.drag) {
            this.$emit("move");
          } else if (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold) {
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
              uikitUtil.trigger(this.$el, "moved", [this, this.placeholder]);
            }
          } else {
            uikitUtil.trigger(sortable.$el, "added", [sortable, this.placeholder]);
            uikitUtil.trigger(this.$el, "removed", [this, this.placeholder]);
          }
          uikitUtil.trigger(this.$el, "stop", [this, this.placeholder]);
          uikitUtil.remove(this.drag);
          this.drag = null;
          for (const { clsPlaceholder, clsItem } of this.touched) {
            for (const sortable2 of this.touched) {
              uikitUtil.removeClass(sortable2.items, clsPlaceholder, clsItem);
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
            const sortable = this.$getComponent(element, "sortable");
            if (sortable && (sortable === this || this.group !== false && sortable.group === this.group)) {
              return sortable;
            }
          } while (element = uikitUtil.parent(element));
        }
      }
    };
    let trackTimer;
    function trackScroll(pos) {
      let last = Date.now();
      trackTimer = setInterval(() => {
        let { x, y } = pos;
        y += document.scrollingElement.scrollTop;
        const dist = (Date.now() - last) * 0.3;
        last = Date.now();
        uikitUtil.scrollParents(document.elementFromPoint(x, pos.y)).reverse().some((scrollEl) => {
          let { scrollTop: scroll, scrollHeight } = scrollEl;
          const { top, bottom, height: height2 } = uikitUtil.offsetViewport(scrollEl);
          if (top < y && top + 35 > y) {
            scroll -= dist;
          } else if (bottom > y && bottom - 35 < y) {
            scroll += dist;
          } else {
            return;
          }
          if (scroll > 0 && scroll < scrollHeight - height2) {
            scrollEl.scrollTop = scroll;
            return true;
          }
        });
      }, 15);
    }
    function untrackScroll() {
      clearInterval(trackTimer);
    }
    function appendDrag(container, element) {
      let clone;
      if (uikitUtil.isTag(element, "li", "tr")) {
        clone = uikitUtil.$("<div>");
        uikitUtil.append(clone, element.cloneNode(true).children);
        for (const attribute of element.getAttributeNames()) {
          uikitUtil.attr(clone, attribute, element.getAttribute(attribute));
        }
      } else {
        clone = element.cloneNode(true);
      }
      uikitUtil.append(container, clone);
      uikitUtil.css(clone, "margin", "0", "important");
      uikitUtil.css(clone, {
        boxSizing: "border-box",
        width: element.offsetWidth,
        height: element.offsetHeight,
        padding: uikitUtil.css(element, "padding")
      });
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
        [placeholderRect.top, placeholderRect.bottom]
      );
      const [pointerPos, lengthProp, startProp, endProp] = sameRow ? [x, "width", "left", "right"] : [y, "height", "top", "bottom"];
      const diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;
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
      const isHorizontal2 = items.some((el, i) => {
        const rectA = el.getBoundingClientRect();
        return items.slice(i + 1).some((el2) => {
          const rectB = el2.getBoundingClientRect();
          return !linesIntersect([rectA.left, rectA.right], [rectB.left, rectB.right]);
        });
      });
      if (single) {
        uikitUtil.remove(placeholder);
      }
      return isHorizontal2;
    }
    function linesIntersect(lineA, lineB) {
      return lineA[1] > lineB[0] && lineB[1] > lineA[0];
    }

    if (typeof window !== "undefined" && window.UIkit) {
      window.UIkit.component("sortable", Component);
    }

    return Component;

}));
