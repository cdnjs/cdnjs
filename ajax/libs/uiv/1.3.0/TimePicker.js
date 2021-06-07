// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
function assign (target, varArgs) {
  var arguments$1 = arguments;

  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  var to = Object(target);
  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments$1[index];
    if (nextSource !== null && nextSource !== undefined) {
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to
}

function isExist (obj) {
  return typeof obj !== 'undefined' && obj !== null
}

function isFunction (obj) {
  return typeof obj === 'function'
}

var defaultLang = {
  uiv: {
    datePicker: {
      clear: 'Clear',
      today: 'Today',
      month: 'Month',
      month1: 'January',
      month2: 'February',
      month3: 'March',
      month4: 'April',
      month5: 'May',
      month6: 'June',
      month7: 'July',
      month8: 'August',
      month9: 'September',
      month10: 'October',
      month11: 'November',
      month12: 'December',
      year: 'Year',
      week1: 'Mon',
      week2: 'Tue',
      week3: 'Wed',
      week4: 'Thu',
      week5: 'Fri',
      week6: 'Sat',
      week7: 'Sun'
    },
    timePicker: {
      am: 'AM',
      pm: 'PM'
    },
    modal: {
      cancel: 'Cancel',
      ok: 'OK'
    },
    multiSelect: {
      placeholder: 'Select...',
      filterPlaceholder: 'Search...'
    }
  }
};

// https://github.com/ElemeFE/element/blob/dev/src/locale/index.js

var lang = defaultLang;

var i18nHandler = function () {
  var vuei18n = Object.getPrototypeOf(this).$t;
  /* istanbul ignore else */
  /* istanbul ignore next */
  if (isFunction(vuei18n)) {
    /* istanbul ignore next */
    try {
      return vuei18n.apply(this, arguments)
    } catch (err) {
      return this.$t.apply(this, arguments)
    }
  }
};

var t$1 = function (path, options) {
  options = options || {};
  var value;
  try {
    value = i18nHandler.apply(this, arguments);
    /* istanbul ignore next */
    if (isExist(value) && !options.$$locale) {
      return value
    }
  } catch (e) {
    // ignore
  }
  var array = path.split('.');
  var current = options.$$locale || lang;

  for (var i = 0, j = array.length; i < j; i++) {
    var property = array[i];
    value = current[property];
    if (i === j - 1) { return value }
    if (!value) { return '' }
    current = value;
  }
  /* istanbul ignore next */
  return ''
};

var Local = {
  methods: {
    t: function t$1$1 () {
      var arguments$1 = arguments;

      var args = [];
      for (var i = 0; i < arguments.length; ++i) {
        args.push(arguments$1[i]);
      }
      args[1] = assign({}, { $$locale: this.locale }, args[1]);
      return t$1.apply(this, args)
    }
  },
  props: {
    locale: Object
  }
};

var e=function(){return (e=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++){ for(var a in t=arguments[r]){ Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]); } }return e}).apply(this,arguments)},t={kebab:/-(\w)/g,styleProp:/:(.*)/,styleList:/;(?![^(]*\))/g};function r(e,t){return t?t.toUpperCase():""}function s(e){for(var s,a={},c=0,o=e.split(t.styleList);c<o.length;c++){var n=o[c].split(t.styleProp),i=n[0],l=n[1];(i=i.trim())&&("string"==typeof l&&(l=l.trim()),a[(s=i,s.replace(t.kebab,r))]=l);}return a}function a(){
var arguments$1 = arguments;
for(var t,r,a={},c=arguments.length;c--;){ for(var o=0,n=Object.keys(arguments[c]);o<n.length;o++){ switch(t=n[o]){case"class":case"style":case"directives":if(Array.isArray(a[t])||(a[t]=[]),"style"===t){var i=void 0;i=Array.isArray(arguments$1[c].style)?arguments$1[c].style:[arguments$1[c].style];for(var l=0;l<i.length;l++){var y=i[l];"string"==typeof y&&(i[l]=s(y));}arguments$1[c].style=i;}a[t]=a[t].concat(arguments$1[c][t]);break;case"staticClass":if(!arguments$1[c][t]){ break; }void 0===a[t]&&(a[t]=""),a[t]&&(a[t]+=" "),a[t]+=arguments$1[c][t].trim();break;case"on":case"nativeOn":a[t]||(a[t]={});for(var p=0,f=Object.keys(arguments[c][t]||{});p<f.length;p++){ r=f[p],a[t][r]?a[t][r]=[].concat(a[t][r],arguments$1[c][t][r]):a[t][r]=arguments$1[c][t][r]; }break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":a[t]||(a[t]={}),a[t]=e({},arguments$1[c][t],a[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:a[t]||(a[t]=arguments$1[c][t]);} } }return a}

var linkMixin = {
  props: {
    // <a> props
    href: String,
    target: String,
    // <router-link> props
    to: null,
    replace: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    exact: {
      type: Boolean,
      default: false
    }
  }
};

var BtnGroup = {
  functional: true,
  render: function render (h, ref) {
    var obj;

    var props = ref.props;
    var children = ref.children;
    var data = ref.data;
    return h(
      'div',
      a(data, {
        class: ( obj = {
          'btn-group': !props.vertical,
          'btn-group-vertical': props.vertical,
          'btn-group-justified': props.justified
        }, obj[("btn-group-" + (props.size))] = props.size, obj ),
        attrs: {
          role: 'group',
          'data-toggle': 'buttons'
        }
      }),
      children
    )
  },
  props: {
    size: String,
    vertical: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    }
  }
};

var INPUT_TYPE_CHECKBOX = 'checkbox';
var INPUT_TYPE_RADIO = 'radio';

var Btn = {
  functional: true,
  mixins: [linkMixin],
  render: function render (h, ref) {
    var children = ref.children;
    var props = ref.props;
    var data = ref.data;

    // event listeners
    var listeners = data.on || {};
    // checkbox: model contain inputValue
    // radio: model === inputValue
    var isInputActive = props.inputType === INPUT_TYPE_CHECKBOX ? props.value.indexOf(props.inputValue) >= 0 : props.value === props.inputValue;
    // button class
    var classes = {
      btn: true,
      active: props.inputType ? isInputActive : props.active,
      disabled: props.disabled,
      'btn-block': props.block
    };
    classes[("btn-" + (props.type))] = Boolean(props.type);
    classes[("btn-" + (props.size))] = Boolean(props.size);
    // prevent event for disabled links
    var on = {
      click: function click (e) {
        if (props.disabled && e instanceof Event) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };
    // render params
    var tag, options, slot;

    if (props.href) {
      // is native link
      tag = 'a';
      slot = children;
      options = a(data, {
        on: on,
        class: classes,
        attrs: {
          role: 'button',
          href: props.href,
          target: props.target
        }
      });
    } else if (props.to) {
      // is vue router link
      tag = 'router-link';
      slot = children;
      options = a(data, {
        nativeOn: on,
        class: classes,
        props: {
          event: props.disabled ? '' : 'click', // prevent nav while disabled
          to: props.to,
          replace: props.replace,
          append: props.append,
          exact: props.exact
        },
        attrs: {
          role: 'button'
        }
      });
    } else if (props.inputType) {
      // is input checkbox or radio
      tag = 'label';
      options = a(data, {
        on: on,
        class: classes
      });
      slot = [
        h('input', {
          attrs: {
            autocomplete: 'off',
            type: props.inputType,
            checked: isInputActive ? 'checked' : null,
            disabled: props.disabled
          },
          domProps: {
            checked: isInputActive // required
          },
          on: {
            input: function input (evt) {
              evt.stopPropagation();
            },
            change: function change () {
              if (props.inputType === INPUT_TYPE_CHECKBOX) {
                var valueCopied = props.value.slice();
                if (isInputActive) {
                  valueCopied.splice(valueCopied.indexOf(props.inputValue), 1);
                } else {
                  valueCopied.push(props.inputValue);
                }
                listeners.input(valueCopied);
              } else {
                listeners.input(props.inputValue);
              }
            }
          }
        }),
        children
      ];
    } else if (props.justified) {
      // is in justified btn-group
      tag = BtnGroup;
      options = {};
      slot = [
        h('button', a(data, {
          on: on,
          class: classes,
          attrs: {
            type: props.nativeType,
            disabled: props.disabled
          }
        }), children)
      ];
    } else {
      // is button
      tag = 'button';
      slot = children;
      options = a(data, {
        on: on,
        class: classes,
        attrs: {
          type: props.nativeType,
          disabled: props.disabled
        }
      });
    }

    return h(tag, options, slot)
  },
  props: {
    justified: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    size: String,
    block: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // <input> props
    value: null,
    inputValue: null,
    inputType: {
      type: String,
      validator: function validator (value) {
        return value === INPUT_TYPE_CHECKBOX || value === INPUT_TYPE_RADIO
      }
    }
  }
};

function pad (value, num) {
  value = value + '';
  for (var i = num - value.length; i > 0; i--) {
    value = '0' + value;
  }
  return value
}

var maxHours = 23;
var zero = 0;
var maxMinutes = 59;
var cutUpAmAndPm = 12;

var script = {
  components: { Btn: Btn },
  mixins: [Local],
  props: {
    value: {
      type: Date,
      required: true
    },
    showMeridian: {
      type: Boolean,
      default: true
    },
    min: null,
    max: null,
    hourStep: {
      type: Number,
      default: 1
    },
    minStep: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    iconControlUp: {
      type: String,
      default: 'glyphicon glyphicon-chevron-up'
    },
    iconControlDown: {
      type: String,
      default: 'glyphicon glyphicon-chevron-down'
    },
    inputWidth: {
      type: Number,
      default: 50
    }
  },
  data: function data () {
    return {
      hours: 0,
      minutes: 0,
      meridian: true,
      hoursText: '',
      minutesText: ''
    }
  },
  mounted: function mounted () {
    this.updateByValue(this.value);
  },
  computed: {
    inputStyles: function inputStyles () {
      return {
        width: ((this.inputWidth) + "px")
      }
    }
  },
  watch: {
    value: function value (value$1) {
      this.updateByValue(value$1);
    },
    showMeridian: function showMeridian (value) {
      this.setTime();
    },
    hoursText: function hoursText (value) {
      if (this.hours === 0 && value === '') {
        // Prevent a runtime reset from being overwritten
        return
      }
      var hour = parseInt(value);
      if (this.showMeridian) {
        if (hour >= 1 && hour <= cutUpAmAndPm) {
          if (this.meridian) {
            this.hours = hour === cutUpAmAndPm ? 0 : hour;
          } else {
            this.hours = hour === cutUpAmAndPm ? cutUpAmAndPm : hour + cutUpAmAndPm;
          }
        }
      } else if (hour >= zero && hour <= maxHours) {
        this.hours = hour;
      }
      this.setTime();
    },
    minutesText: function minutesText (value) {
      if (this.minutes === 0 && value === '') {
        // Prevent a runtime reset from being overwritten
        return
      }
      var minutesStr = parseInt(value);
      if (minutesStr >= zero && minutesStr <= maxMinutes) {
        this.minutes = minutesStr;
      }
      this.setTime();
    }
  },
  methods: {
    updateByValue: function updateByValue (value) {
      if (isNaN(value.getTime())) {
        this.hours = 0;
        this.minutes = 0;
        this.hoursText = '';
        this.minutesText = '';
        this.meridian = true;
        return
      }
      this.hours = value.getHours();
      this.minutes = value.getMinutes();
      if (!this.showMeridian) {
        this.hoursText = pad(this.hours, 2);
      } else {
        if (this.hours >= cutUpAmAndPm) {
          if (this.hours === cutUpAmAndPm) {
            this.hoursText = this.hours + '';
          } else {
            this.hoursText = pad(this.hours - cutUpAmAndPm, 2);
          }
          this.meridian = false;
        } else {
          if (this.hours === zero) {
            this.hoursText = cutUpAmAndPm.toString();
          } else {
            this.hoursText = pad(this.hours, 2);
          }
          this.meridian = true;
        }
      }
      this.minutesText = pad(this.minutes, 2);
      // lazy model won't update when using keyboard up/down
      this.$refs.hoursInput.value = this.hoursText;
      this.$refs.minutesInput.value = this.minutesText;
    },
    addHour: function addHour (step) {
      step = step || this.hourStep;
      this.hours = this.hours >= maxHours ? zero : this.hours + step;
    },
    reduceHour: function reduceHour (step) {
      step = step || this.hourStep;
      this.hours = this.hours <= zero ? maxHours : this.hours - step;
    },
    addMinute: function addMinute () {
      if (this.minutes >= maxMinutes) {
        this.minutes = zero;
        this.addHour(1);
      } else {
        this.minutes += this.minStep;
      }
    },
    reduceMinute: function reduceMinute () {
      if (this.minutes <= zero) {
        this.minutes = maxMinutes + 1 - this.minStep;
        this.reduceHour(1);
      } else {
        this.minutes -= this.minStep;
      }
    },
    changeTime: function changeTime (isHour, isPlus) {
      if (!this.readonly) {
        if (isHour && isPlus) {
          this.addHour();
        } else if (isHour && !isPlus) {
          this.reduceHour();
        } else if (!isHour && isPlus) {
          this.addMinute();
        } else {
          this.reduceMinute();
        }
        this.setTime();
      }
    },
    toggleMeridian: function toggleMeridian () {
      this.meridian = !this.meridian;
      if (this.meridian) {
        this.hours -= cutUpAmAndPm;
      } else {
        this.hours += cutUpAmAndPm;
      }
      this.setTime();
    },
    onWheel: function onWheel (e, isHour) {
      if (!this.readonly) {
        e.preventDefault();
        this.changeTime(isHour, e.deltaY < 0);
      }
    },
    setTime: function setTime () {
      var time = this.value;
      if (isNaN(time.getTime())) {
        time = new Date();
        time.setHours(0);
        time.setMinutes(0);
      }
      time.setHours(this.hours);
      time.setMinutes(this.minutes);
      if (this.max instanceof Date) {
        var max = new Date(time);
        max.setHours(this.max.getHours());
        max.setMinutes(this.max.getMinutes());
        time = time > max ? max : time;
      }
      if (this.min instanceof Date) {
        var min = new Date(time);
        min.setHours(this.min.getHours());
        min.setMinutes(this.min.getMinutes());
        time = time < min ? min : time;
      }
      this.$emit('input', new Date(time));
    },
    selectInputValue: function selectInputValue (e) {
      // mouseup should be prevented!
      // See various comments in https://stackoverflow.com/questions/3272089/programmatically-selecting-text-in-an-input-field-on-ios-devices-mobile-safari
      e.target.setSelectionRange(0, 2);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "section",
    {
      on: {
        click: function($event) {
          $event.stopPropagation();
        }
      }
    },
    [
      _c("table", [
        _c("tbody", [
          _vm.controls
            ? _c("tr", { staticClass: "text-center" }, [
                _c(
                  "td",
                  [
                    _c(
                      "btn",
                      {
                        attrs: {
                          type: "link",
                          size: "sm",
                          disabled: _vm.readonly
                        },
                        on: {
                          click: function($event) {
                            return _vm.changeTime(1, 1)
                          }
                        }
                      },
                      [_c("i", { class: _vm.iconControlUp })]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("td", [_vm._v(" ")]),
                _vm._v(" "),
                _c(
                  "td",
                  [
                    _c(
                      "btn",
                      {
                        attrs: {
                          type: "link",
                          size: "sm",
                          disabled: _vm.readonly
                        },
                        on: {
                          click: function($event) {
                            return _vm.changeTime(0, 1)
                          }
                        }
                      },
                      [_c("i", { class: _vm.iconControlUp })]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.showMeridian ? _c("td") : _vm._e()
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("tr", [
            _c("td", { staticClass: "form-group" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.lazy",
                    value: _vm.hoursText,
                    expression: "hoursText",
                    modifiers: { lazy: true }
                  }
                ],
                ref: "hoursInput",
                staticClass: "form-control text-center",
                style: _vm.inputStyles,
                attrs: {
                  type: "tel",
                  pattern: "\\d*",
                  placeholder: "HH",
                  readonly: _vm.readonly,
                  maxlength: "2",
                  size: "2"
                },
                domProps: { value: _vm.hoursText },
                on: {
                  mouseup: _vm.selectInputValue,
                  keydown: [
                    function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "up", 38, $event.key, [
                          "Up",
                          "ArrowUp"
                        ])
                      ) {
                        return null
                      }
                      $event.preventDefault();
                      return _vm.changeTime(1, 1)
                    },
                    function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "down", 40, $event.key, [
                          "Down",
                          "ArrowDown"
                        ])
                      ) {
                        return null
                      }
                      $event.preventDefault();
                      return _vm.changeTime(1, 0)
                    }
                  ],
                  wheel: function($event) {
                    return _vm.onWheel($event, true)
                  },
                  change: function($event) {
                    _vm.hoursText = $event.target.value;
                  }
                }
              })
            ]),
            _vm._v(" "),
            _vm._m(0),
            _vm._v(" "),
            _c("td", { staticClass: "form-group" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model.lazy",
                    value: _vm.minutesText,
                    expression: "minutesText",
                    modifiers: { lazy: true }
                  }
                ],
                ref: "minutesInput",
                staticClass: "form-control text-center",
                style: _vm.inputStyles,
                attrs: {
                  type: "tel",
                  pattern: "\\d*",
                  placeholder: "MM",
                  readonly: _vm.readonly,
                  maxlength: "2",
                  size: "2"
                },
                domProps: { value: _vm.minutesText },
                on: {
                  mouseup: _vm.selectInputValue,
                  keydown: [
                    function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "up", 38, $event.key, [
                          "Up",
                          "ArrowUp"
                        ])
                      ) {
                        return null
                      }
                      $event.preventDefault();
                      return _vm.changeTime(0, 1)
                    },
                    function($event) {
                      if (
                        !$event.type.indexOf("key") &&
                        _vm._k($event.keyCode, "down", 40, $event.key, [
                          "Down",
                          "ArrowDown"
                        ])
                      ) {
                        return null
                      }
                      $event.preventDefault();
                      return _vm.changeTime(0, 0)
                    }
                  ],
                  wheel: function($event) {
                    return _vm.onWheel($event, false)
                  },
                  change: function($event) {
                    _vm.minutesText = $event.target.value;
                  }
                }
              })
            ]),
            _vm._v(" "),
            _vm.showMeridian
              ? _c(
                  "td",
                  [
                    _vm._v("\n         \n        "),
                    _c("btn", {
                      attrs: {
                        "data-action": "toggleMeridian",
                        disabled: _vm.readonly
                      },
                      domProps: {
                        textContent: _vm._s(
                          _vm.meridian
                            ? _vm.t("uiv.timePicker.am")
                            : _vm.t("uiv.timePicker.pm")
                        )
                      },
                      on: { click: _vm.toggleMeridian }
                    })
                  ],
                  1
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _vm.controls
            ? _c("tr", { staticClass: "text-center" }, [
                _c(
                  "td",
                  [
                    _c(
                      "btn",
                      {
                        attrs: {
                          type: "link",
                          size: "sm",
                          disabled: _vm.readonly
                        },
                        on: {
                          click: function($event) {
                            return _vm.changeTime(1, 0)
                          }
                        }
                      },
                      [_c("i", { class: _vm.iconControlDown })]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("td", [_vm._v(" ")]),
                _vm._v(" "),
                _c(
                  "td",
                  [
                    _c(
                      "btn",
                      {
                        attrs: {
                          type: "link",
                          size: "sm",
                          disabled: _vm.readonly
                        },
                        on: {
                          click: function($event) {
                            return _vm.changeTime(0, 0)
                          }
                        }
                      },
                      [_c("i", { class: _vm.iconControlDown })]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.showMeridian ? _c("td") : _vm._e()
              ])
            : _vm._e()
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__ = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("td", [_vm._v(" "), _c("b", [_vm._v(":")]), _vm._v(" ")])
  }
];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export default __vue_component__;
//# sourceMappingURL=TimePicker.js.map
