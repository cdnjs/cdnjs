this.primevue = this.primevue || {};
this.primevue.scrollpanel = (function (utils, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-scrollpanel-wrapper {\n    overflow: hidden;\n    width: 100%;\n    height: 100%;\n    position: relative;\n    z-index: 1;\n    float: left;\n}\n\n.p-scrollpanel-content {\n    height: calc(100% + 18px);\n    width: calc(100% + 18px);\n    padding: 0 18px 18px 0;\n    position: relative;\n    overflow: scroll;\n    box-sizing: border-box;\n    scrollbar-width: none;\n}\n\n.p-scrollpanel-content::-webkit-scrollbar {\n    display: none;\n}\n\n.p-scrollpanel-bar {\n    position: relative;\n    background: #c1c1c1;\n    border-radius: 3px;\n    z-index: 2;\n    cursor: pointer;\n    opacity: 0;\n    transition: opacity 0.25s linear;\n}\n\n.p-scrollpanel-bar-y {\n    width: 9px;\n    top: 0;\n}\n\n.p-scrollpanel-bar-x {\n    height: 9px;\n    bottom: 0;\n}\n\n.p-scrollpanel-hidden {\n    visibility: hidden;\n}\n\n.p-scrollpanel:hover .p-scrollpanel-bar,\n.p-scrollpanel:active .p-scrollpanel-bar {\n    opacity: 1;\n}\n\n.p-scrollpanel-grabbed {\n    user-select: none;\n}\n";
    var classes = {
      root: 'p-scrollpanel p-component',
      wrapper: 'p-scrollpanel-wrapper',
      content: 'p-scrollpanel-content',
      barx: 'p-scrollpanel-bar p-scrollpanel-bar-x',
      bary: 'p-scrollpanel-bar p-scrollpanel-bar-y'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'scrollpanel',
        manual: true
      }),
      loadStyle = _useStyle.load;
    var script$1 = {
      name: 'BaseScrollPanel',
      "extends": BaseComponent__default["default"],
      props: {
        step: {
          type: Number,
          "default": 5
        }
      },
      css: {
        classes: classes,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    var script = {
      name: 'ScrollPanel',
      "extends": script$1,
      initialized: false,
      documentResizeListener: null,
      documentMouseMoveListener: null,
      documentMouseUpListener: null,
      frame: null,
      scrollXRatio: null,
      scrollYRatio: null,
      isXBarClicked: false,
      isYBarClicked: false,
      lastPageX: null,
      lastPageY: null,
      timer: null,
      outsideClickListener: null,
      data: function data() {
        return {
          id: utils.UniqueComponentId(),
          orientation: 'vertical',
          lastScrollTop: 0,
          lastScrollLeft: 0
        };
      },
      mounted: function mounted() {
        if (this.$el.offsetParent) {
          this.initialize();
        }
      },
      updated: function updated() {
        if (!this.initialized && this.$el.offsetParent) {
          this.initialize();
        }
      },
      beforeUnmount: function beforeUnmount() {
        this.unbindDocumentResizeListener();
        if (this.frame) {
          window.cancelAnimationFrame(this.frame);
        }
      },
      methods: {
        initialize: function initialize() {
          this.moveBar();
          this.bindDocumentResizeListener();
          this.calculateContainerHeight();
        },
        calculateContainerHeight: function calculateContainerHeight() {
          var containerStyles = getComputedStyle(this.$el),
            xBarStyles = getComputedStyle(this.$refs.xBar),
            pureContainerHeight = utils.DomHandler.getHeight(this.$el) - parseInt(xBarStyles['height'], 10);
          if (containerStyles['max-height'] !== 'none' && pureContainerHeight === 0) {
            if (this.$refs.content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
              this.$el.style.height = containerStyles['max-height'];
            } else {
              this.$el.style.height = this.$refs.content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
            }
          }
        },
        moveBar: function moveBar() {
          var _this = this;
          /* horizontal scroll */
          var totalWidth = this.$refs.content.scrollWidth;
          var ownWidth = this.$refs.content.clientWidth;
          var bottom = (this.$el.clientHeight - this.$refs.xBar.clientHeight) * -1;
          this.scrollXRatio = ownWidth / totalWidth;

          /* vertical scroll */
          var totalHeight = this.$refs.content.scrollHeight;
          var ownHeight = this.$refs.content.clientHeight;
          var right = (this.$el.clientWidth - this.$refs.yBar.clientWidth) * -1;
          this.scrollYRatio = ownHeight / totalHeight;
          this.frame = this.requestAnimationFrame(function () {
            if (_this.scrollXRatio >= 1) {
              _this.$refs.xBar.setAttribute('data-p-scrollpanel-hidden', 'true');
              !_this.isUnstyled && utils.DomHandler.addClass(_this.$refs.xBar, 'p-scrollpanel-hidden');
            } else {
              _this.$refs.xBar.setAttribute('data-p-scrollpanel-hidden', 'false');
              !_this.isUnstyled && utils.DomHandler.removeClass(_this.$refs.xBar, 'p-scrollpanel-hidden');
              _this.$refs.xBar.style.cssText = 'width:' + Math.max(_this.scrollXRatio * 100, 10) + '%; left:' + _this.$refs.content.scrollLeft / totalWidth * 100 + '%;bottom:' + bottom + 'px;';
            }
            if (_this.scrollYRatio >= 1) {
              _this.$refs.yBar.setAttribute('data-p-scrollpanel-hidden', 'true');
              !_this.isUnstyled && utils.DomHandler.addClass(_this.$refs.yBar, 'p-scrollpanel-hidden');
            } else {
              _this.$refs.yBar.setAttribute('data-p-scrollpanel-hidden', 'false');
              !_this.isUnstyled && utils.DomHandler.removeClass(_this.$refs.yBar, 'p-scrollpanel-hidden');
              _this.$refs.yBar.style.cssText = 'height:' + Math.max(_this.scrollYRatio * 100, 10) + '%; top: calc(' + _this.$refs.content.scrollTop / totalHeight * 100 + '% - ' + _this.$refs.xBar.clientHeight + 'px);right:' + right + 'px;';
            }
          });
        },
        onYBarMouseDown: function onYBarMouseDown(e) {
          this.isYBarClicked = true;
          this.$refs.yBar.focus();
          this.lastPageY = e.pageY;
          this.$refs.yBar.setAttribute('data-p-scrollpanel-grabbed', 'true');
          !this.isUnstyled && utils.DomHandler.addClass(this.$refs.yBar, 'p-scrollpanel-grabbed');
          document.body.setAttribute('data-p-scrollpanel-grabbed', 'true');
          !this.isUnstyled && utils.DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
          this.bindDocumentMouseListeners();
          e.preventDefault();
        },
        onXBarMouseDown: function onXBarMouseDown(e) {
          this.isXBarClicked = true;
          this.$refs.xBar.focus();
          this.lastPageX = e.pageX;
          this.$refs.yBar.setAttribute('data-p-scrollpanel-grabbed', 'false');
          !this.isUnstyled && utils.DomHandler.addClass(this.$refs.xBar, 'p-scrollpanel-grabbed');
          document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
          !this.isUnstyled && utils.DomHandler.addClass(document.body, 'p-scrollpanel-grabbed');
          this.bindDocumentMouseListeners();
          e.preventDefault();
        },
        onScroll: function onScroll(event) {
          if (this.lastScrollLeft !== event.target.scrollLeft) {
            this.lastScrollLeft = event.target.scrollLeft;
            this.orientation = 'horizontal';
          } else if (this.lastScrollTop !== event.target.scrollTop) {
            this.lastScrollTop = event.target.scrollTop;
            this.orientation = 'vertical';
          }
          this.moveBar();
        },
        onKeyDown: function onKeyDown(event) {
          if (this.orientation === 'vertical') {
            switch (event.code) {
              case 'ArrowDown':
                {
                  this.setTimer('scrollTop', this.step);
                  event.preventDefault();
                  break;
                }
              case 'ArrowUp':
                {
                  this.setTimer('scrollTop', this.step * -1);
                  event.preventDefault();
                  break;
                }
              case 'ArrowLeft':
              case 'ArrowRight':
                {
                  event.preventDefault();
                  break;
                }
            }
          } else if (this.orientation === 'horizontal') {
            switch (event.code) {
              case 'ArrowRight':
                {
                  this.setTimer('scrollLeft', this.step);
                  event.preventDefault();
                  break;
                }
              case 'ArrowLeft':
                {
                  this.setTimer('scrollLeft', this.step * -1);
                  event.preventDefault();
                  break;
                }
              case 'ArrowDown':
              case 'ArrowUp':
                {
                  event.preventDefault();
                  break;
                }
            }
          }
        },
        onKeyUp: function onKeyUp() {
          this.clearTimer();
        },
        repeat: function repeat(bar, step) {
          this.$refs.content[bar] += step;
          this.moveBar();
        },
        setTimer: function setTimer(bar, step) {
          var _this2 = this;
          this.clearTimer();
          this.timer = setTimeout(function () {
            _this2.repeat(bar, step);
          }, 40);
        },
        clearTimer: function clearTimer() {
          if (this.timer) {
            clearTimeout(this.timer);
          }
        },
        onDocumentMouseMove: function onDocumentMouseMove(e) {
          if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
          } else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
          } else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
          }
        },
        onMouseMoveForXBar: function onMouseMoveForXBar(e) {
          var _this3 = this;
          var deltaX = e.pageX - this.lastPageX;
          this.lastPageX = e.pageX;
          this.frame = this.requestAnimationFrame(function () {
            _this3.$refs.content.scrollLeft += deltaX / _this3.scrollXRatio;
          });
        },
        onMouseMoveForYBar: function onMouseMoveForYBar(e) {
          var _this4 = this;
          var deltaY = e.pageY - this.lastPageY;
          this.lastPageY = e.pageY;
          this.frame = this.requestAnimationFrame(function () {
            _this4.$refs.content.scrollTop += deltaY / _this4.scrollYRatio;
          });
        },
        onFocus: function onFocus(event) {
          if (this.$refs.xBar.isSameNode(event.target)) {
            this.orientation = 'horizontal';
          } else if (this.$refs.yBar.isSameNode(event.target)) {
            this.orientation = 'vertical';
          }
        },
        onBlur: function onBlur() {
          if (this.orientation === 'horizontal') {
            this.orientation = 'vertical';
          }
        },
        onDocumentMouseUp: function onDocumentMouseUp() {
          this.$refs.yBar.setAttribute('data-p-scrollpanel-grabbed', 'false');
          !this.isUnstyled && utils.DomHandler.removeClass(this.$refs.yBar, 'p-scrollpanel-grabbed');
          this.$refs.xBar.setAttribute('data-p-scrollpanel-grabbed', 'false');
          !this.isUnstyled && utils.DomHandler.removeClass(this.$refs.xBar, 'p-scrollpanel-grabbed');
          document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
          !this.isUnstyled && utils.DomHandler.removeClass(document.body, 'p-scrollpanel-grabbed');
          this.unbindDocumentMouseListeners();
          this.isXBarClicked = false;
          this.isYBarClicked = false;
        },
        requestAnimationFrame: function requestAnimationFrame(f) {
          var frame = window.requestAnimationFrame || this.timeoutFrame;
          return frame(f);
        },
        refresh: function refresh() {
          this.moveBar();
        },
        scrollTop: function scrollTop(_scrollTop) {
          var scrollableHeight = this.$refs.content.scrollHeight - this.$refs.content.clientHeight;
          _scrollTop = _scrollTop > scrollableHeight ? scrollableHeight : _scrollTop > 0 ? _scrollTop : 0;
          this.$refs.content.scrollTop = _scrollTop;
        },
        timeoutFrame: function timeoutFrame(fn) {
          setTimeout(fn, 0);
        },
        bindDocumentMouseListeners: function bindDocumentMouseListeners() {
          var _this5 = this;
          if (!this.documentMouseMoveListener) {
            this.documentMouseMoveListener = function (e) {
              _this5.onDocumentMouseMove(e);
            };
            document.addEventListener('mousemove', this.documentMouseMoveListener);
          }
          if (!this.documentMouseUpListener) {
            this.documentMouseUpListener = function (e) {
              _this5.onDocumentMouseUp(e);
            };
            document.addEventListener('mouseup', this.documentMouseUpListener);
          }
        },
        unbindDocumentMouseListeners: function unbindDocumentMouseListeners() {
          if (this.documentMouseMoveListener) {
            document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
          }
          if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
          }
        },
        bindDocumentResizeListener: function bindDocumentResizeListener() {
          var _this6 = this;
          if (!this.documentResizeListener) {
            this.documentResizeListener = function () {
              _this6.moveBar();
            };
            window.addEventListener('resize', this.documentResizeListener);
          }
        },
        unbindDocumentResizeListener: function unbindDocumentResizeListener() {
          if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
          }
        }
      }
    };

    var _hoisted_1 = ["aria-valuenow"];
    var _hoisted_2 = ["aria-valuenow"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root')
      }, _ctx.ptm('root'), {
        "data-pc-name": "scrollpanel"
      }), [vue.createElementVNode("div", vue.mergeProps({
        "class": _ctx.cx('wrapper')
      }, _ctx.ptm('wrapper')), [vue.createElementVNode("div", vue.mergeProps({
        ref: "content",
        "class": _ctx.cx('content'),
        onScroll: _cache[0] || (_cache[0] = function () {
          return $options.onScroll && $options.onScroll.apply($options, arguments);
        }),
        onMouseenter: _cache[1] || (_cache[1] = function () {
          return $options.moveBar && $options.moveBar.apply($options, arguments);
        })
      }, _ctx.ptm('content')), [vue.renderSlot(_ctx.$slots, "default")], 16)], 16), vue.createElementVNode("div", vue.mergeProps({
        ref: "xBar",
        "class": _ctx.cx('barx'),
        tabindex: "0",
        role: "scrollbar",
        "aria-orientation": "horizontal",
        "aria-valuenow": $data.lastScrollLeft,
        onMousedown: _cache[2] || (_cache[2] = function () {
          return $options.onXBarMouseDown && $options.onXBarMouseDown.apply($options, arguments);
        }),
        onKeydown: _cache[3] || (_cache[3] = function ($event) {
          return $options.onKeyDown($event);
        }),
        onKeyup: _cache[4] || (_cache[4] = function () {
          return $options.onKeyUp && $options.onKeyUp.apply($options, arguments);
        }),
        onFocus: _cache[5] || (_cache[5] = function () {
          return $options.onFocus && $options.onFocus.apply($options, arguments);
        }),
        onBlur: _cache[6] || (_cache[6] = function () {
          return $options.onBlur && $options.onBlur.apply($options, arguments);
        })
      }, _ctx.ptm('barx'), {
        "data-pc-group-section": "bar"
      }), null, 16, _hoisted_1), vue.createElementVNode("div", vue.mergeProps({
        ref: "yBar",
        "class": _ctx.cx('bary'),
        tabindex: "0",
        role: "scrollbar",
        "aria-orientation": "vertical",
        "aria-valuenow": $data.lastScrollTop,
        onMousedown: _cache[7] || (_cache[7] = function () {
          return $options.onYBarMouseDown && $options.onYBarMouseDown.apply($options, arguments);
        }),
        onKeydown: _cache[8] || (_cache[8] = function ($event) {
          return $options.onKeyDown($event);
        }),
        onKeyup: _cache[9] || (_cache[9] = function () {
          return $options.onKeyUp && $options.onKeyUp.apply($options, arguments);
        }),
        onFocus: _cache[10] || (_cache[10] = function () {
          return $options.onFocus && $options.onFocus.apply($options, arguments);
        })
      }, _ctx.ptm('bary'), {
        "data-pc-group-section": "bar"
      }), null, 16, _hoisted_2)], 16);
    }

    script.render = render;

    return script;

})(primevue.utils, primevue.basecomponent, primevue.usestyle, Vue);
