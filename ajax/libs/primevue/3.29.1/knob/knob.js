this.primevue = this.primevue || {};
this.primevue.knob = (function (BaseComponent, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var BaseComponent__default = /*#__PURE__*/_interopDefaultLegacy(BaseComponent);

    var script = {
        name: 'Knob',
        extends: BaseComponent__default["default"],
        emits: ['update:modelValue', 'change'],
        props: {
            modelValue: {
                type: Number,
                default: null
            },
            size: {
                type: Number,
                default: 100
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            step: {
                type: Number,
                default: 1
            },
            min: {
                type: Number,
                default: 0
            },
            max: {
                type: Number,
                default: 100
            },
            valueColor: {
                type: String,
                default: 'var(--primary-color, Black)'
            },
            rangeColor: {
                type: String,
                default: 'var(--surface-border, LightGray)'
            },
            textColor: {
                type: String,
                default: 'var(--text-color-secondary, Black)'
            },
            strokeWidth: {
                type: Number,
                default: 14
            },
            showValue: {
                type: Boolean,
                default: true
            },
            valueTemplate: {
                type: String,
                default: '{value}'
            },
            tabindex: {
                type: Number,
                default: 0
            },
            'aria-labelledby': {
                type: String,
                default: null
            },
            'aria-label': {
                type: String,
                default: null
            }
        },
        data() {
            return {
                radius: 40,
                midX: 50,
                midY: 50,
                minRadians: (4 * Math.PI) / 3,
                maxRadians: -Math.PI / 3
            };
        },
        methods: {
            updateValue(offsetX, offsetY) {
                let dx = offsetX - this.size / 2;
                let dy = this.size / 2 - offsetY;
                let angle = Math.atan2(dy, dx);
                let start = -Math.PI / 2 - Math.PI / 6;

                this.updateModel(angle, start);
            },
            updateModel(angle, start) {
                let mappedValue;

                if (angle > this.maxRadians) mappedValue = this.mapRange(angle, this.minRadians, this.maxRadians, this.min, this.max);
                else if (angle < start) mappedValue = this.mapRange(angle + 2 * Math.PI, this.minRadians, this.maxRadians, this.min, this.max);
                else return;

                let newValue = Math.round((mappedValue - this.min) / this.step) * this.step + this.min;

                this.$emit('update:modelValue', newValue);
                this.$emit('change', newValue);
            },
            updateModelValue(newValue) {
                if (newValue > this.max) this.$emit('update:modelValue', this.max);
                else if (newValue < this.min) this.$emit('update:modelValue', this.min);
                else this.$emit('update:modelValue', newValue);
            },
            mapRange(x, inMin, inMax, outMin, outMax) {
                return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
            },
            onClick(event) {
                if (!this.disabled && !this.readonly) {
                    this.updateValue(event.offsetX, event.offsetY);
                }
            },
            onMouseDown(event) {
                if (!this.disabled && !this.readonly) {
                    window.addEventListener('mousemove', this.onMouseMove);
                    window.addEventListener('mouseup', this.onMouseUp);
                    event.preventDefault();
                }
            },
            onMouseUp(event) {
                if (!this.disabled && !this.readonly) {
                    window.removeEventListener('mousemove', this.onMouseMove);
                    window.removeEventListener('mouseup', this.onMouseUp);
                    event.preventDefault();
                }
            },
            onTouchStart(event) {
                if (!this.disabled && !this.readonly) {
                    window.addEventListener('touchmove', this.onTouchMove);
                    window.addEventListener('touchend', this.onTouchEnd);
                    event.preventDefault();
                }
            },
            onTouchEnd(event) {
                if (!this.disabled && !this.readonly) {
                    window.removeEventListener('touchmove', this.onTouchMove);
                    window.removeEventListener('touchend', this.onTouchEnd);
                    event.preventDefault();
                }
            },
            onMouseMove(event) {
                if (!this.disabled && !this.readonly) {
                    this.updateValue(event.offsetX, event.offsetY);
                    event.preventDefault();
                }
            },
            onTouchMove(event) {
                if (!this.disabled && !this.readonly && event.touches.length == 1) {
                    const rect = this.$el.getBoundingClientRect();
                    const touch = event.targetTouches.item(0);
                    const offsetX = touch.clientX - rect.left;
                    const offsetY = touch.clientY - rect.top;

                    this.updateValue(offsetX, offsetY);
                }
            },
            onKeyDown(event) {
                if (!this.disabled && !this.readonly) {
                    switch (event.code) {
                        case 'ArrowRight':

                        case 'ArrowUp': {
                            event.preventDefault();
                            this.updateModelValue(this.modelValue + 1);
                            break;
                        }

                        case 'ArrowLeft':

                        case 'ArrowDown': {
                            event.preventDefault();
                            this.updateModelValue(this.modelValue - 1);
                            break;
                        }

                        case 'Home': {
                            event.preventDefault();
                            this.$emit('update:modelValue', this.min);
                            break;
                        }

                        case 'End': {
                            event.preventDefault();
                            this.$emit('update:modelValue', this.max);
                            break;
                        }

                        case 'PageUp': {
                            event.preventDefault();
                            this.updateModelValue(this.modelValue + 10);
                            break;
                        }

                        case 'PageDown': {
                            event.preventDefault();
                            this.updateModelValue(this.modelValue - 10);
                            break;
                        }
                    }
                }
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-knob p-component',
                    {
                        'p-disabled': this.disabled
                    }
                ];
            },
            rangePath() {
                return `M ${this.minX} ${this.minY} A ${this.radius} ${this.radius} 0 1 1 ${this.maxX} ${this.maxY}`;
            },
            valuePath() {
                return `M ${this.zeroX} ${this.zeroY} A ${this.radius} ${this.radius} 0 ${this.largeArc} ${this.sweep} ${this.valueX} ${this.valueY}`;
            },
            zeroRadians() {
                if (this.min > 0 && this.max > 0) return this.mapRange(this.min, this.min, this.max, this.minRadians, this.maxRadians);
                else return this.mapRange(0, this.min, this.max, this.minRadians, this.maxRadians);
            },
            valueRadians() {
                return this.mapRange(this.modelValue, this.min, this.max, this.minRadians, this.maxRadians);
            },
            minX() {
                return this.midX + Math.cos(this.minRadians) * this.radius;
            },
            minY() {
                return this.midY - Math.sin(this.minRadians) * this.radius;
            },
            maxX() {
                return this.midX + Math.cos(this.maxRadians) * this.radius;
            },
            maxY() {
                return this.midY - Math.sin(this.maxRadians) * this.radius;
            },
            zeroX() {
                return this.midX + Math.cos(this.zeroRadians) * this.radius;
            },
            zeroY() {
                return this.midY - Math.sin(this.zeroRadians) * this.radius;
            },
            valueX() {
                return this.midX + Math.cos(this.valueRadians) * this.radius;
            },
            valueY() {
                return this.midY - Math.sin(this.valueRadians) * this.radius;
            },
            largeArc() {
                return Math.abs(this.zeroRadians - this.valueRadians) < Math.PI ? 0 : 1;
            },
            sweep() {
                return this.valueRadians > this.zeroRadians ? 0 : 1;
            },
            valueToDisplay() {
                return this.valueTemplate.replace(/{value}/g, this.modelValue);
            }
        }
    };
    //Derived and forked from https://github.com/kramer99/vue-knob-control

    const _hoisted_1 = ["width", "height", "tabindex", "aria-valuemin", "aria-valuemax", "aria-valuenow", "aria-labelledby", "aria-label"];
    const _hoisted_2 = ["d", "stroke-width", "stroke"];
    const _hoisted_3 = ["d", "stroke-width", "stroke"];
    const _hoisted_4 = ["fill"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({ class: $options.containerClass }, _ctx.ptm('root')), [
        (vue.openBlock(), vue.createElementBlock("svg", vue.mergeProps({
          viewBox: "0 0 100 100",
          role: "slider",
          width: $props.size,
          height: $props.size,
          tabindex: $props.readonly || $props.disabled ? -1 : $props.tabindex,
          "aria-valuemin": $props.min,
          "aria-valuemax": $props.max,
          "aria-valuenow": $props.modelValue,
          "aria-labelledby": _ctx.ariaLabelledby,
          "aria-label": _ctx.ariaLabel,
          onClick: _cache[0] || (_cache[0] = (...args) => ($options.onClick && $options.onClick(...args))),
          onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args))),
          onMousedown: _cache[2] || (_cache[2] = (...args) => ($options.onMouseDown && $options.onMouseDown(...args))),
          onMouseup: _cache[3] || (_cache[3] = (...args) => ($options.onMouseUp && $options.onMouseUp(...args))),
          onTouchstart: _cache[4] || (_cache[4] = (...args) => ($options.onTouchStart && $options.onTouchStart(...args))),
          onTouchend: _cache[5] || (_cache[5] = (...args) => ($options.onTouchEnd && $options.onTouchEnd(...args)))
        }, _ctx.ptm('svg')), [
          vue.createElementVNode("path", vue.mergeProps({
            d: $options.rangePath,
            "stroke-width": $props.strokeWidth,
            stroke: $props.rangeColor,
            class: "p-knob-range"
          }, _ctx.ptm('range')), null, 16, _hoisted_2),
          vue.createElementVNode("path", vue.mergeProps({
            d: $options.valuePath,
            "stroke-width": $props.strokeWidth,
            stroke: $props.valueColor,
            class: "p-knob-value"
          }, _ctx.ptm('value')), null, 16, _hoisted_3),
          ($props.showValue)
            ? (vue.openBlock(), vue.createElementBlock("text", vue.mergeProps({
                key: 0,
                x: 50,
                y: 57,
                "text-anchor": "middle",
                fill: $props.textColor,
                class: "p-knob-text"
              }, _ctx.ptm('label')), vue.toDisplayString($options.valueToDisplay), 17, _hoisted_4))
            : vue.createCommentVNode("", true)
        ], 16, _hoisted_1))
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

    var css_248z = "\n@keyframes dash-frame {\n100% {\n        stroke-dashoffset: 0;\n}\n}\n.p-knob-range {\n    fill: none;\n    transition: stroke 0.1s ease-in;\n}\n.p-knob-value {\n    animation-name: dash-frame;\n    animation-fill-mode: forwards;\n    fill: none;\n}\n.p-knob-text {\n    font-size: 1.3rem;\n    text-align: center;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.basecomponent, Vue);
