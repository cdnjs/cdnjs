'use strict';

var BaseComponent = require('primevue/basecomponent');
var utils = require('primevue/utils');
var vue = require('vue');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

var script = {
    name: 'Splitter',
    extends: BaseComponent__default["default"],
    emits: ['resizestart', 'resizeend'],
    props: {
        layout: {
            type: String,
            default: 'horizontal'
        },
        gutterSize: {
            type: Number,
            default: 4
        },
        stateKey: {
            type: String,
            default: null
        },
        stateStorage: {
            type: String,
            default: 'session'
        },
        step: {
            type: Number,
            default: 5
        }
    },
    dragging: false,
    mouseMoveListener: null,
    mouseUpListener: null,
    touchMoveListener: null,
    touchEndListener: null,
    size: null,
    gutterElement: null,
    startPos: null,
    prevPanelElement: null,
    nextPanelElement: null,
    nextPanelSize: null,
    prevPanelSize: null,
    panelSizes: null,
    prevPanelIndex: null,
    timer: null,
    data() {
        return {
            prevSize: null
        };
    },
    mounted() {
        if (this.panels && this.panels.length) {
            let initialized = false;

            if (this.isStateful()) {
                initialized = this.restoreState();
            }

            if (!initialized) {
                let children = [...this.$el.children].filter((child) => utils.DomHandler.hasClass(child, 'p-splitter-panel'));
                let _panelSizes = [];

                this.panels.map((panel, i) => {
                    let panelInitialSize = panel.props && panel.props.size ? panel.props.size : null;
                    let panelSize = panelInitialSize || 100 / this.panels.length;

                    _panelSizes[i] = panelSize;
                    children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
                });

                this.panelSizes = _panelSizes;
                this.prevSize = parseFloat(_panelSizes[0]).toFixed(4);
            }
        }
    },
    beforeUnmount() {
        this.clear();
        this.unbindMouseListeners();
    },
    methods: {
        isSplitterPanel(child) {
            return child.type.name === 'SplitterPanel';
        },
        onResizeStart(event, index, isKeyDown) {
            this.gutterElement = event.currentTarget || event.target.parentElement;
            this.size = this.horizontal ? utils.DomHandler.getWidth(this.$el) : utils.DomHandler.getHeight(this.$el);

            if (!isKeyDown) {
                this.dragging = true;
                this.startPos = this.layout === 'horizontal' ? event.pageX || event.changedTouches[0].pageX : event.pageY || event.changedTouches[0].pageY;
            }

            this.prevPanelElement = this.gutterElement.previousElementSibling;
            this.nextPanelElement = this.gutterElement.nextElementSibling;

            if (isKeyDown) {
                this.prevPanelSize = this.horizontal ? utils.DomHandler.getOuterWidth(this.prevPanelElement, true) : utils.DomHandler.getOuterHeight(this.prevPanelElement, true);
                this.nextPanelSize = this.horizontal ? utils.DomHandler.getOuterWidth(this.nextPanelElement, true) : utils.DomHandler.getOuterHeight(this.nextPanelElement, true);
            } else {
                this.prevPanelSize = (100 * (this.horizontal ? utils.DomHandler.getOuterWidth(this.prevPanelElement, true) : utils.DomHandler.getOuterHeight(this.prevPanelElement, true))) / this.size;
                this.nextPanelSize = (100 * (this.horizontal ? utils.DomHandler.getOuterWidth(this.nextPanelElement, true) : utils.DomHandler.getOuterHeight(this.nextPanelElement, true))) / this.size;
            }

            this.prevPanelIndex = index;
            this.$emit('resizestart', { originalEvent: event, sizes: this.panelSizes });
            utils.DomHandler.addClass(this.gutterElement, 'p-splitter-gutter-resizing');
            utils.DomHandler.addClass(this.$el, 'p-splitter-resizing');
        },
        onResize(event, step, isKeyDown) {
            let newPos, newPrevPanelSize, newNextPanelSize;

            if (isKeyDown) {
                if (this.horizontal) {
                    newPrevPanelSize = (100 * (this.prevPanelSize + step)) / this.size;
                    newNextPanelSize = (100 * (this.nextPanelSize - step)) / this.size;
                } else {
                    newPrevPanelSize = (100 * (this.prevPanelSize - step)) / this.size;
                    newNextPanelSize = (100 * (this.nextPanelSize + step)) / this.size;
                }
            } else {
                if (this.horizontal) newPos = (event.pageX * 100) / this.size - (this.startPos * 100) / this.size;
                else newPos = (event.pageY * 100) / this.size - (this.startPos * 100) / this.size;

                newPrevPanelSize = this.prevPanelSize + newPos;
                newNextPanelSize = this.nextPanelSize - newPos;
            }

            this.prevSize = parseFloat(newPrevPanelSize).toFixed(4);

            if (this.validateResize(newPrevPanelSize, newNextPanelSize)) {
                this.prevPanelElement.style.flexBasis = 'calc(' + newPrevPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
                this.nextPanelElement.style.flexBasis = 'calc(' + newNextPanelSize + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
                this.panelSizes[this.prevPanelIndex] = newPrevPanelSize;
                this.panelSizes[this.prevPanelIndex + 1] = newNextPanelSize;
            }
        },
        onResizeEnd(event) {
            if (this.isStateful()) {
                this.saveState();
            }

            this.$emit('resizeend', { originalEvent: event, sizes: this.panelSizes });
            utils.DomHandler.removeClass(this.gutterElement, 'p-splitter-gutter-resizing');
            utils.DomHandler.removeClass(this.$el, 'p-splitter-resizing');
            this.clear();
        },
        repeat(event, index, step) {
            this.onResizeStart(event, index, true);
            this.onResize(event, step, true);
        },
        setTimer(event, index, step) {
            this.clearTimer();
            this.timer = setTimeout(() => {
                this.repeat(event, index, step);
            }, 40);
        },
        clearTimer() {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        },
        onGutterKeyUp() {
            this.clearTimer();
            this.onResizeEnd();
        },
        onGutterKeyDown(event, index) {
            switch (event.code) {
                case 'ArrowLeft': {
                    if (this.layout === 'horizontal') {
                        this.setTimer(event, index, this.step * -1);
                    }

                    event.preventDefault();
                    break;
                }

                case 'ArrowRight': {
                    if (this.layout === 'horizontal') {
                        this.setTimer(event, index, this.step);
                    }

                    event.preventDefault();
                    break;
                }

                case 'ArrowDown': {
                    if (this.layout === 'vertical') {
                        this.setTimer(event, index, this.step * -1);
                    }

                    event.preventDefault();
                    break;
                }

                case 'ArrowUp': {
                    if (this.layout === 'vertical') {
                        this.setTimer(event, index, this.step);
                    }

                    event.preventDefault();
                    break;
                }
            }
        },
        onGutterMouseDown(event, index) {
            this.onResizeStart(event, index);
            this.bindMouseListeners();
        },
        onGutterTouchStart(event, index) {
            this.onResizeStart(event, index);
            this.bindTouchListeners();
            event.preventDefault();
        },
        onGutterTouchMove(event) {
            this.onResize(event);
            event.preventDefault();
        },
        onGutterTouchEnd(event) {
            this.onResizeEnd(event);
            this.unbindTouchListeners();
            event.preventDefault();
        },
        bindMouseListeners() {
            if (!this.mouseMoveListener) {
                this.mouseMoveListener = (event) => this.onResize(event);
                document.addEventListener('mousemove', this.mouseMoveListener);
            }

            if (!this.mouseUpListener) {
                this.mouseUpListener = (event) => {
                    this.onResizeEnd(event);
                    this.unbindMouseListeners();
                };

                document.addEventListener('mouseup', this.mouseUpListener);
            }
        },
        bindTouchListeners() {
            if (!this.touchMoveListener) {
                this.touchMoveListener = (event) => this.onResize(event.changedTouches[0]);
                document.addEventListener('touchmove', this.touchMoveListener);
            }

            if (!this.touchEndListener) {
                this.touchEndListener = (event) => {
                    this.resizeEnd(event);
                    this.unbindTouchListeners();
                };

                document.addEventListener('touchend', this.touchEndListener);
            }
        },
        validateResize(newPrevPanelSize, newNextPanelSize) {
            let prevPanelMinSize = utils.ObjectUtils.getVNodeProp(this.panels[0], 'minSize');

            if (this.panels[0].props && prevPanelMinSize && prevPanelMinSize > newPrevPanelSize) {
                return false;
            }

            let newPanelMinSize = utils.ObjectUtils.getVNodeProp(this.panels[1], 'minSize');

            if (this.panels[1].props && newPanelMinSize && newPanelMinSize > newNextPanelSize) {
                return false;
            }

            return true;
        },
        unbindMouseListeners() {
            if (this.mouseMoveListener) {
                document.removeEventListener('mousemove', this.mouseMoveListener);
                this.mouseMoveListener = null;
            }

            if (this.mouseUpListener) {
                document.removeEventListener('mouseup', this.mouseUpListener);
                this.mouseUpListener = null;
            }
        },
        unbindTouchListeners() {
            if (this.touchMoveListener) {
                document.removeEventListener('touchmove', this.touchMoveListener);
                this.touchMoveListener = null;
            }

            if (this.touchEndListener) {
                document.removeEventListener('touchend', this.touchEndListener);
                this.touchEndListener = null;
            }
        },
        clear() {
            this.dragging = false;
            this.size = null;
            this.startPos = null;
            this.prevPanelElement = null;
            this.nextPanelElement = null;
            this.prevPanelSize = null;
            this.nextPanelSize = null;
            this.gutterElement = null;
            this.prevPanelIndex = null;
        },
        isStateful() {
            return this.stateKey != null;
        },
        getStorage() {
            switch (this.stateStorage) {
                case 'local':
                    return window.localStorage;

                case 'session':
                    return window.sessionStorage;

                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        },
        saveState() {
            this.getStorage().setItem(this.stateKey, JSON.stringify(this.panelSizes));
        },
        restoreState() {
            const storage = this.getStorage();
            const stateString = storage.getItem(this.stateKey);

            if (stateString) {
                this.panelSizes = JSON.parse(stateString);
                let children = [...this.$el.children].filter((child) => utils.DomHandler.hasClass(child, 'p-splitter-panel'));

                children.forEach((child, i) => {
                    child.style.flexBasis = 'calc(' + this.panelSizes[i] + '% - ' + (this.panels.length - 1) * this.gutterSize + 'px)';
                });

                return true;
            }

            return false;
        }
    },
    computed: {
        containerClass() {
            return ['p-splitter p-component', 'p-splitter-' + this.layout];
        },
        panels() {
            const panels = [];

            this.$slots.default().forEach((child) => {
                if (this.isSplitterPanel(child)) {
                    panels.push(child);
                } else if (child.children instanceof Array) {
                    child.children.forEach((nestedChild) => {
                        if (this.isSplitterPanel(nestedChild)) {
                            panels.push(nestedChild);
                        }
                    });
                }
            });

            return panels;
        },
        gutterStyle() {
            if (this.horizontal) return { width: this.gutterSize + 'px' };
            else return { height: this.gutterSize + 'px' };
        },
        horizontal() {
            return this.layout === 'horizontal';
        }
    }
};

const _hoisted_1 = ["onMousedown", "onTouchstart", "onTouchmove", "onTouchend"];
const _hoisted_2 = ["aria-orientation", "aria-valuenow", "onKeydown"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.panels, (panel, i) => {
      return (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: i }, [
        (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(panel), { tabindex: "-1" })),
        (i !== $options.panels.length - 1)
          ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
              key: 0,
              class: "p-splitter-gutter",
              role: "separator",
              tabindex: "-1",
              onMousedown: $event => ($options.onGutterMouseDown($event, i)),
              onTouchstart: $event => ($options.onGutterTouchStart($event, i)),
              onTouchmove: $event => ($options.onGutterTouchMove($event, i)),
              onTouchend: $event => ($options.onGutterTouchEnd($event, i))
            }, _ctx.ptm('gutter')), [
              vue.createElementVNode("div", vue.mergeProps({
                class: "p-splitter-gutter-handle",
                tabindex: "0",
                style: $options.gutterStyle,
                "aria-orientation": $props.layout,
                "aria-valuenow": $data.prevSize,
                onKeyup: _cache[0] || (_cache[0] = (...args) => ($options.onGutterKeyUp && $options.onGutterKeyUp(...args))),
                onKeydown: $event => ($options.onGutterKeyDown($event, i))
              }, _ctx.ptm('gutterhandler')), null, 16, _hoisted_2)
            ], 16, _hoisted_1))
          : vue.createCommentVNode("", true)
      ], 64))
    }), 128))
  ], 16))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "\n.p-splitter {\n    display: flex;\n    flex-wrap: nowrap;\n}\n.p-splitter-vertical {\n    flex-direction: column;\n}\n.p-splitter-panel {\n    flex-grow: 1;\n}\n.p-splitter-panel-nested {\n    display: flex;\n}\n.p-splitter-panel .p-splitter {\n    flex-grow: 1;\n    border: 0 none;\n}\n.p-splitter-gutter {\n    flex-grow: 0;\n    flex-shrink: 0;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    cursor: col-resize;\n}\n.p-splitter-horizontal.p-splitter-resizing {\n    cursor: col-resize;\n    user-select: none;\n}\n.p-splitter-horizontal > .p-splitter-gutter > .p-splitter-gutter-handle {\n    height: 24px;\n    width: 100%;\n}\n.p-splitter-horizontal > .p-splitter-gutter {\n    cursor: col-resize;\n}\n.p-splitter-vertical.p-splitter-resizing {\n    cursor: row-resize;\n    user-select: none;\n}\n.p-splitter-vertical > .p-splitter-gutter {\n    cursor: row-resize;\n}\n.p-splitter-vertical > .p-splitter-gutter > .p-splitter-gutter-handle {\n    width: 24px;\n    height: 100%;\n}\n";
styleInject(css_248z);

script.render = render;

module.exports = script;
