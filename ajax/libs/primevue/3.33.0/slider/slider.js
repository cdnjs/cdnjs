this.primevue = this.primevue || {};
this.primevue.slider = (function (utils, BaseComponent, usestyle, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var styles = "\n.p-slider {\n    position: relative;\n}\n\n.p-slider .p-slider-handle {\n    cursor: grab;\n    touch-action: none;\n    display: block;\n}\n\n.p-slider-range {\n    display: block;\n}\n\n.p-slider-horizontal .p-slider-range {\n    top: 0;\n    left: 0;\n    height: 100%;\n}\n\n.p-slider-horizontal .p-slider-handle {\n    top: 50%;\n}\n\n.p-slider-vertical {\n    height: 100px;\n}\n\n.p-slider-vertical .p-slider-handle {\n    left: 50%;\n}\n\n.p-slider-vertical .p-slider-range {\n    bottom: 0;\n    left: 0;\n    width: 100%;\n}\n";
    var inlineStyles = {
      handle: {
        position: 'absolute'
      },
      range: {
        position: 'absolute'
      }
    };
    var classes = {
      root: function root(_ref) {
        var props = _ref.props;
        return ['p-slider p-component', {
          'p-disabled': props.disabled,
          'p-slider-horizontal': props.orientation === 'horizontal',
          'p-slider-vertical': props.orientation === 'vertical'
        }];
      },
      range: 'p-slider-range',
      handle: 'p-slider-handle'
    };
    var _useStyle = usestyle.useStyle(styles, {
        name: 'slider',
        manual: true
      }),
      loadStyle = _useStyle.load;
      _useStyle.unload;
    var script$1 = {
      name: 'BaseSlider',
      "extends": BaseComponent__default["default"],
      props: {
        modelValue: [Number, Array],
        min: {
          type: Number,
          "default": 0
        },
        max: {
          type: Number,
          "default": 100
        },
        orientation: {
          type: String,
          "default": 'horizontal'
        },
        step: {
          type: Number,
          "default": null
        },
        range: {
          type: Boolean,
          "default": false
        },
        disabled: {
          type: Boolean,
          "default": false
        },
        tabindex: {
          type: Number,
          "default": 0
        },
        'aria-labelledby': {
          type: String,
          "default": null
        },
        'aria-label': {
          type: String,
          "default": null
        }
      },
      css: {
        classes: classes,
        inlineStyles: inlineStyles,
        loadStyle: loadStyle
      },
      provide: function provide() {
        return {
          $parentInstance: this
        };
      }
    };

    function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
    function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
    function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
    function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
    var script = {
      name: 'Slider',
      "extends": script$1,
      emits: ['update:modelValue', 'change', 'slideend'],
      dragging: false,
      handleIndex: null,
      initX: null,
      initY: null,
      barWidth: null,
      barHeight: null,
      dragListener: null,
      dragEndListener: null,
      beforeUnmount: function beforeUnmount() {
        this.unbindDragListeners();
      },
      methods: {
        updateDomData: function updateDomData() {
          var rect = this.$el.getBoundingClientRect();
          this.initX = rect.left + utils.DomHandler.getWindowScrollLeft();
          this.initY = rect.top + utils.DomHandler.getWindowScrollTop();
          this.barWidth = this.$el.offsetWidth;
          this.barHeight = this.$el.offsetHeight;
        },
        setValue: function setValue(event) {
          var handleValue;
          var pageX = event.touches ? event.touches[0].pageX : event.pageX;
          var pageY = event.touches ? event.touches[0].pageY : event.pageY;
          if (this.orientation === 'horizontal') handleValue = (pageX - this.initX) * 100 / this.barWidth;else handleValue = (this.initY + this.barHeight - pageY) * 100 / this.barHeight;
          var newValue = (this.max - this.min) * (handleValue / 100) + this.min;
          if (this.step) {
            var oldValue = this.range ? this.modelValue[this.handleIndex] : this.modelValue;
            var diff = newValue - oldValue;
            if (diff < 0) newValue = oldValue + Math.ceil(newValue / this.step - oldValue / this.step) * this.step;else if (diff > 0) newValue = oldValue + Math.floor(newValue / this.step - oldValue / this.step) * this.step;
          } else {
            newValue = Math.floor(newValue);
          }
          this.updateModel(event, newValue);
        },
        updateModel: function updateModel(event, value) {
          var newValue = parseFloat(value.toFixed(10));
          var modelValue;
          if (this.range) {
            modelValue = this.modelValue ? _toConsumableArray(this.modelValue) : [];
            if (this.handleIndex == 0) {
              if (newValue < this.min) newValue = this.min;else if (newValue >= this.max) newValue = this.max;
              modelValue[0] = newValue;
            } else {
              if (newValue > this.max) newValue = this.max;else if (newValue <= this.min) newValue = this.min;
              modelValue[1] = newValue;
            }
          } else {
            if (newValue < this.min) newValue = this.min;else if (newValue > this.max) newValue = this.max;
            modelValue = newValue;
          }
          this.$emit('update:modelValue', modelValue);
          this.$emit('change', modelValue);
        },
        onDragStart: function onDragStart(event, index) {
          if (this.disabled) {
            return;
          }
          this.$el.setAttribute('data-p-sliding', true);
          this.dragging = true;
          this.updateDomData();
          if (this.range && this.modelValue[0] === this.max) {
            this.handleIndex = 0;
          } else {
            this.handleIndex = index;
          }
          event.currentTarget.focus();
          event.preventDefault();
        },
        onDrag: function onDrag(event) {
          if (this.dragging) {
            this.setValue(event);
            event.preventDefault();
          }
        },
        onDragEnd: function onDragEnd(event) {
          if (this.dragging) {
            this.dragging = false;
            this.$el.setAttribute('data-p-sliding', false);
            this.$emit('slideend', {
              originalEvent: event,
              value: this.modelValue
            });
          }
        },
        onBarClick: function onBarClick(event) {
          if (this.disabled) {
            return;
          }
          if (utils.DomHandler.getAttribute(event.target, 'data-pc-section') !== 'handle') {
            this.updateDomData();
            this.setValue(event);
          }
        },
        onMouseDown: function onMouseDown(event, index) {
          this.bindDragListeners();
          this.onDragStart(event, index);
        },
        onKeyDown: function onKeyDown(event, index) {
          this.handleIndex = index;
          switch (event.code) {
            case 'ArrowDown':
            case 'ArrowLeft':
              this.decrementValue(event, index);
              event.preventDefault();
              break;
            case 'ArrowUp':
            case 'ArrowRight':
              this.incrementValue(event, index);
              event.preventDefault();
              break;
            case 'PageDown':
              this.decrementValue(event, index, true);
              event.preventDefault();
              break;
            case 'PageUp':
              this.incrementValue(event, index, true);
              event.preventDefault();
              break;
            case 'Home':
              this.updateModel(event, this.min);
              event.preventDefault();
              break;
            case 'End':
              this.updateModel(event, this.max);
              event.preventDefault();
              break;
          }
        },
        decrementValue: function decrementValue(event, index) {
          var pageKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var newValue;
          if (this.range) {
            if (this.step) newValue = this.modelValue[index] - this.step;else newValue = this.modelValue[index] - 1;
          } else {
            if (this.step) newValue = this.modelValue - this.step;else if (!this.step && pageKey) newValue = this.modelValue - 10;else newValue = this.modelValue - 1;
          }
          this.updateModel(event, newValue);
          event.preventDefault();
        },
        incrementValue: function incrementValue(event, index) {
          var pageKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var newValue;
          if (this.range) {
            if (this.step) newValue = this.modelValue[index] + this.step;else newValue = this.modelValue[index] + 1;
          } else {
            if (this.step) newValue = this.modelValue + this.step;else if (!this.step && pageKey) newValue = this.modelValue + 10;else newValue = this.modelValue + 1;
          }
          this.updateModel(event, newValue);
          event.preventDefault();
        },
        bindDragListeners: function bindDragListeners() {
          if (!this.dragListener) {
            this.dragListener = this.onDrag.bind(this);
            document.addEventListener('mousemove', this.dragListener);
          }
          if (!this.dragEndListener) {
            this.dragEndListener = this.onDragEnd.bind(this);
            document.addEventListener('mouseup', this.dragEndListener);
          }
        },
        unbindDragListeners: function unbindDragListeners() {
          if (this.dragListener) {
            document.removeEventListener('mousemove', this.dragListener);
            this.dragListener = null;
          }
          if (this.dragEndListener) {
            document.removeEventListener('mouseup', this.dragEndListener);
            this.dragEndListener = null;
          }
        }
      },
      computed: {
        horizontal: function horizontal() {
          return this.orientation === 'horizontal';
        },
        vertical: function vertical() {
          return this.orientation === 'vertical';
        },
        rangeStyle: function rangeStyle() {
          if (this.range) {
            var rangeSliderWidth = this.rangeEndPosition > this.rangeStartPosition ? this.rangeEndPosition - this.rangeStartPosition : this.rangeStartPosition - this.rangeEndPosition;
            var rangeSliderPosition = this.rangeEndPosition > this.rangeStartPosition ? this.rangeStartPosition : this.rangeEndPosition;
            if (this.horizontal) return {
              left: rangeSliderPosition + '%',
              width: rangeSliderWidth + '%'
            };else return {
              bottom: rangeSliderPosition + '%',
              height: rangeSliderWidth + '%'
            };
          } else {
            if (this.horizontal) return {
              width: this.handlePosition + '%'
            };else return {
              height: this.handlePosition + '%'
            };
          }
        },
        handleStyle: function handleStyle() {
          if (this.horizontal) return {
            left: this.handlePosition + '%'
          };else return {
            bottom: this.handlePosition + '%'
          };
        },
        handlePosition: function handlePosition() {
          if (this.modelValue < this.min) return 0;else if (this.modelValue > this.max) return 100;else return (this.modelValue - this.min) * 100 / (this.max - this.min);
        },
        rangeStartPosition: function rangeStartPosition() {
          if (this.modelValue && this.modelValue[0]) return (this.modelValue[0] < this.min ? 0 : this.modelValue[0] - this.min) * 100 / (this.max - this.min);else return 0;
        },
        rangeEndPosition: function rangeEndPosition() {
          if (this.modelValue && this.modelValue.length === 2) return (this.modelValue[1] > this.max ? 100 : this.modelValue[1] - this.min) * 100 / (this.max - this.min);else return 100;
        },
        rangeStartHandleStyle: function rangeStartHandleStyle() {
          if (this.horizontal) return {
            left: this.rangeStartPosition + '%'
          };else return {
            bottom: this.rangeStartPosition + '%'
          };
        },
        rangeEndHandleStyle: function rangeEndHandleStyle() {
          if (this.horizontal) return {
            left: this.rangeEndPosition + '%'
          };else return {
            bottom: this.rangeEndPosition + '%'
          };
        }
      }
    };

    var _hoisted_1 = ["tabindex", "aria-valuemin", "aria-valuenow", "aria-valuemax", "aria-labelledby", "aria-label", "aria-orientation"];
    var _hoisted_2 = ["tabindex", "aria-valuemin", "aria-valuenow", "aria-valuemax", "aria-labelledby", "aria-label", "aria-orientation"];
    var _hoisted_3 = ["tabindex", "aria-valuemin", "aria-valuenow", "aria-valuemax", "aria-labelledby", "aria-label", "aria-orientation"];
    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
        "class": _ctx.cx('root'),
        onClick: _cache[15] || (_cache[15] = function () {
          return $options.onBarClick && $options.onBarClick.apply($options, arguments);
        })
      }, _ctx.ptm('root'), {
        "data-p-sliding": false,
        "data-pc-name": "slider"
      }), [vue.createElementVNode("span", vue.mergeProps({
        "class": _ctx.cx('range'),
        style: [_ctx.sx('range'), $options.rangeStyle]
      }, _ctx.ptm('range')), null, 16), !_ctx.range ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 0,
        "class": _ctx.cx('handle'),
        style: [_ctx.sx('handle'), $options.handleStyle],
        onTouchstart: _cache[0] || (_cache[0] = function ($event) {
          return $options.onDragStart($event);
        }),
        onTouchmove: _cache[1] || (_cache[1] = function ($event) {
          return $options.onDrag($event);
        }),
        onTouchend: _cache[2] || (_cache[2] = function ($event) {
          return $options.onDragEnd($event);
        }),
        onMousedown: _cache[3] || (_cache[3] = function ($event) {
          return $options.onMouseDown($event);
        }),
        onKeydown: _cache[4] || (_cache[4] = function ($event) {
          return $options.onKeyDown($event);
        }),
        tabindex: _ctx.tabindex,
        role: "slider",
        "aria-valuemin": _ctx.min,
        "aria-valuenow": _ctx.modelValue,
        "aria-valuemax": _ctx.max,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        "aria-orientation": _ctx.orientation
      }, _ctx.ptm('handle')), null, 16, _hoisted_1)) : vue.createCommentVNode("", true), _ctx.range ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 1,
        "class": _ctx.cx('handle'),
        style: [_ctx.sx('handle'), $options.rangeStartHandleStyle],
        onTouchstart: _cache[5] || (_cache[5] = function ($event) {
          return $options.onDragStart($event, 0);
        }),
        onTouchmove: _cache[6] || (_cache[6] = function ($event) {
          return $options.onDrag($event);
        }),
        onTouchend: _cache[7] || (_cache[7] = function ($event) {
          return $options.onDragEnd($event);
        }),
        onMousedown: _cache[8] || (_cache[8] = function ($event) {
          return $options.onMouseDown($event, 0);
        }),
        onKeydown: _cache[9] || (_cache[9] = function ($event) {
          return $options.onKeyDown($event, 0);
        }),
        tabindex: _ctx.tabindex,
        role: "slider",
        "aria-valuemin": _ctx.min,
        "aria-valuenow": _ctx.modelValue ? _ctx.modelValue[0] : null,
        "aria-valuemax": _ctx.max,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        "aria-orientation": _ctx.orientation
      }, _ctx.ptm('startHandler')), null, 16, _hoisted_2)) : vue.createCommentVNode("", true), _ctx.range ? (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
        key: 2,
        "class": _ctx.cx('handle'),
        style: [_ctx.sx('handle'), $options.rangeEndHandleStyle],
        onTouchstart: _cache[10] || (_cache[10] = function ($event) {
          return $options.onDragStart($event, 1);
        }),
        onTouchmove: _cache[11] || (_cache[11] = function ($event) {
          return $options.onDrag($event);
        }),
        onTouchend: _cache[12] || (_cache[12] = function ($event) {
          return $options.onDragEnd($event);
        }),
        onMousedown: _cache[13] || (_cache[13] = function ($event) {
          return $options.onMouseDown($event, 1);
        }),
        onKeydown: _cache[14] || (_cache[14] = function ($event) {
          return $options.onKeyDown($event, 1);
        }),
        tabindex: _ctx.tabindex,
        role: "slider",
        "aria-valuemin": _ctx.min,
        "aria-valuenow": _ctx.modelValue ? _ctx.modelValue[1] : null,
        "aria-valuemax": _ctx.max,
        "aria-labelledby": _ctx.ariaLabelledby,
        "aria-label": _ctx.ariaLabel,
        "aria-orientation": _ctx.orientation
      }, _ctx.ptm('endHandler')), null, 16, _hoisted_3)) : vue.createCommentVNode("", true)], 16);
    }

    script.render = render;

    return script;

})(primevue.utils, primevue.basecomponent, primevue.usestyle, Vue);
