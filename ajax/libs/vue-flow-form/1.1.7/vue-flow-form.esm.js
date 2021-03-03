/*!
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Language data store

var LanguageModel = function LanguageModel(options) {
  this.enterKey = 'Enter';
  this.shiftKey = 'Shift';
  this.ok = 'OK';
  this.continue = 'Continue';
  this.skip = 'Skip';
  this.pressEnter = 'Press :enterKey';
  this.multipleChoiceHelpText = 'Choose as many as you like';
  this.multipleChoiceHelpTextSingle = 'Choose only one answer';
  this.otherPrompt = 'Other';
  this.placeholder = 'Type your answer here...';
  this.submitText = 'Submit';
  this.longTextHelpText = ':shiftKey + :enterKey to make a line break.';
  this.prev = 'Prev';
  this.next = 'Next';
  this.percentCompleted = ':percent% completed';
  this.invalidPrompt = 'Please fill out the field correctly';
  this.thankYouText = 'Thank you!';
  this.successText = 'Your submission has been sent.';
  this.ariaOk = 'Press to continue';
  this.ariaRequired = 'This step is required';
  this.ariaPrev = 'Previous step';
  this.ariaNext = 'Next step';
  this.ariaSubmitText = 'Press to submit';
  this.ariaMultipleChoice = 'Press :letter to select';
  this.ariaTypeAnswer = 'Type your answer here';

  Object.assign(this, options || {});
};

/**
 * Inserts a new CSS class into the language model string to format the :string
 * Use it in a component's v-html directive: v-html="language.formatString(language.languageString)"
 */
LanguageModel.prototype.formatString = function formatString (string) {
    var this$1 = this;

  return string.replace(/:(\w+)/g, function (match, word) {
    if (this$1[word]) {
      return '<span class="f-string-em">' + this$1[word] + '</span>'
    }
      
    return match
  })
};

/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

// Global data store

var QuestionType = Object.freeze({
  Date: 'FlowFormDateType',
  Dropdown: 'FlowFormDropdownType',
  Email: 'FlowFormEmailType',
  LongText: 'FlowFormLongTextType',
  MultipleChoice: 'FlowFormMultipleChoiceType',
  MultiplePictureChoice: 'FlowFormMultiplePictureChoiceType',
  Number: 'FlowFormNumberType',
  Password: 'FlowFormPasswordType',
  Phone: 'FlowFormPhoneType',
  SectionBreak: 'FlowFormSectionBreakType',
  Text: 'FlowFormTextType',
  Url: 'FlowFormUrlType'
});

var DropdownOptionBlank = Object.freeze({
  label: '',
  value: '',
  disabled: true
});

var MaskPresets = Object.freeze({
  Date: '##/##/####',
  DateIso: '####-##-##',
  PhoneUs: '(###) ###-####'
});

var ChoiceOption = function ChoiceOption(options) {
  this.label = '';
  this.value = null;
  this.selected = false;
  this.imageSrc = null;
  this.imageAlt = null;

  Object.assign(this, options);
};

ChoiceOption.prototype.choiceLabel = function choiceLabel () {
  return this.label || this.value
};

ChoiceOption.prototype.choiceValue = function choiceValue () {
  // Returns the value if it's anything other than the default (null).
  if (this.value !== null) {
    return this.value
  }

  // Returns any other non-empty property if the value has not been set.
  return this.label || this.imageAlt || this.imageSrc
};

ChoiceOption.prototype.toggle = function toggle () {
  this.selected = !this.selected;
};

var LinkOption = function LinkOption(options) {
  this.url = '';
  this.text = '';
  this.target = '_blank';

  Object.assign(this, options);
};

var QuestionModel = function QuestionModel(options) {
  this.id = null;
  this.answer = null;
  this.answered = false;
  this.index = 0;
  this.options = [];
  this.description = '';
  this.className = '';
  this.type = null;
  this.html = null;
  this.required = false;
  this.jump = null;
  this.placeholder = null;
  this.mask = '';
  this.multiple = false;
  this.allowOther = false;
  this.other = null;
  this.language = null;
  this.tagline = null;
  this.title = null;
  this.subtitle = null;
  this.content = null;
  this.inline = false;
  this.helpText = null;
  this.helpTextShow = true;
  this.descriptionLink = [];
  this.min = null;
  this.max = null;
  this.nextStepOnAnswer = false;

  Object.assign(this, options);

  // Sets default mask and placeholder value on PhoneType question
  if (this.type === QuestionType.Phone) {
    if (!this.mask) {
      this.mask = MaskPresets.Phone;
    }
    if (!this.placeholder) {
      this.placeholder = this.mask;
    }
  } 

  if (this.type === QuestionType.Url) {
    this.mask = null;
  }

  if (this.type === QuestionType.Date && !this.placeholder) {
    this.placeholder = 'yyyy-mm-dd';
  }

  if (this.multiple && !Array.isArray(this.answer)) {
    this.answer = this.answer ? [this.answer] : [];
  }

  this.resetOptions();
};

QuestionModel.prototype.getJumpId = function getJumpId () {
  var nextId = null;

  if (typeof this.jump === 'function') {
    nextId = this.jump.call(this);
  } else if (this.jump[this.answer]) {
    nextId = this.jump[this.answer];
  } else if (this.jump['_other']) {
    nextId = this.jump['_other'];
  }

  return nextId
};

QuestionModel.prototype.setAnswer = function setAnswer (answer) {
  if (this.type === QuestionType.Number && answer !== '' && !isNaN(+answer)) {
    answer = +answer;
  }

  this.answer = answer;
};

QuestionModel.prototype.setIndex = function setIndex (index) {
  if (!this.id) {
    this.id = 'q_' + index;
  }

  this.index = index;
};

QuestionModel.prototype.resetOptions = function resetOptions () {
    var this$1 = this;

  if (this.options) {
    var isArray = Array.isArray(this.answer);
    var numSelected = 0;

    this.options.forEach(function (o) {
      var optionValue = o.choiceValue();

      if (this$1.answer === optionValue || (isArray && this$1.answer.indexOf(optionValue) !== -1)) {
        o.selected = true;
        ++numSelected;
      }
    });

    if (this.allowOther) {
      var otherAnswer = null;

      if (isArray) {
        if (this.answer.length && this.answer.length !== numSelected) {
          otherAnswer = this.answer[this.answer.length - 1];
        }
      } else if (this.options.map(function (o) { return o.choiceValue(); }).indexOf(this.answer) === -1) {
        otherAnswer = this.answer;
      }

      if (otherAnswer !== null) {
        this.other = otherAnswer;
      }
    }
  }
};

/*
  Copyright (c) 2020 - present, DITDOT Ltd. - MIT Licence
  https://github.com/ditdot-dev/vue-flow-form
  https://www.ditdot.hr/en
*/

var
  isIos = false,
  isMobile = false;

if (typeof navigator !== 'undefined' && typeof document !== 'undefined') {
  // Simple mobile device/tablet detection
  isIos = navigator.userAgent.match(/iphone|ipad|ipod/i) || (navigator.userAgent.indexOf('Mac') !== -1 && 'ontouchend' in document);
  isMobile = isIos || navigator.userAgent.match(/android/i);
}

// Mixin that adds `isMobile` and `isIos` data variables
var IsMobile = {
  data: function data() {
    return {
      isIos: isIos,
      isMobile: isMobile
    }
  }
};

//

var script = {
  name: 'FlowFormBaseType',
  props: {
    language: LanguageModel,
    question: QuestionModel,
    active: Boolean,
    value: [String, Array, Boolean, Number, Object]
  },
  mixins: [
    IsMobile ],
  data: function data() {
    return {
      dirty: false,
      dataValue: null,
      answer: null,
      enterPressed: false,
      allowedChars: null,
      alwaysAllowedKeys: ['ArrowLeft', 'ArrowRight', 'Delete', 'Backspace'],
      focused: false,
      canReceiveFocus: false
    }
  },
  mounted: function mounted() {
    if (this.question.answer) {
      this.dataValue = this.answer = this.question.answer;
    } else if (this.question.multiple) {
      this.dataValue = [];
    }
  },
  methods: {
    /**
     * This method can be overriden in custom components to 
     * change the answer before going through validation.
     */
    fixAnswer: function fixAnswer(answer) {
      return answer
    },

    getElement: function getElement() {
      var el = this.$refs.input;

      // Sometimes the input is nested so we need to find it
      while (el && el.$el) {
        el = el.$el;
      }

      return el
    },

    setFocus: function setFocus() {
      this.focused = true;
    },

    // eslint-disable-next-line no-unused-vars
    unsetFocus: function unsetFocus($event) {
      this.focused = false;
    },

    focus: function focus() {
      if (!this.focused) {
        var el = this.getElement();

        el && el.focus();
      }
    },

    blur: function blur() {
      var el = this.getElement();

      el && el.blur();
    },

    onKeyDown: function onKeyDown($event) {
      this.enterPressed = false;
      clearTimeout(this.timeoutId);

      if ($event) {
        if ($event.key === 'Enter' && !$event.shiftKey) {
          this.unsetFocus();
        }

        if (this.allowedChars !== null) {
          // Check if the entered character is allowed.
          // We always allow keys from the alwaysAllowedKeys array.
          if (this.alwaysAllowedKeys.indexOf($event.key) === -1 && this.allowedChars.indexOf($event.key) === -1) {
            $event.preventDefault();
          }
        }
      }
    },

    onChange: function onChange($event) {
      this.dirty = true;
      this.dataValue = $event.target.value;

      this.onKeyDown();
      this.setAnswer(this.dataValue);
    },

    onEnter: function onEnter() {
      this._onEnter();
    },

    _onEnter: function _onEnter() {
      this.enterPressed = true;

      this.dataValue = this.fixAnswer(this.dataValue);
      this.setAnswer(this.dataValue);
      this.isValid() ? this.blur() : this.focus();
    },

    setAnswer: function setAnswer(answer) {
      this.question.setAnswer(answer);

      this.answer = this.question.answer;
      this.question.answered = this.isValid();

      this.$emit('input', this.answer);
    },

    showInvalid: function showInvalid() {
      return this.dirty && this.enterPressed && !this.isValid()
    },

    isValid: function isValid() {
      if (!this.question.required && !this.hasValue && this.dirty) {
        return true
      }

      if (this.validate()) {
        return true
      }

      return false
    },
    
    /**
     * This method validates the input and is meant to be overriden
     * in custom question types.
     */
    validate: function validate() {
      return !this.question.required || this.hasValue
    }
  },
  
  computed: {
    placeholder: function placeholder() {
      return this.question.placeholder || this.language.placeholder
    },

    hasValue: function hasValue() {
      if (this.dataValue !== null) {
        var v = this.dataValue;

        if (v.trim) {
          // Don't allow empty strings
          return v.trim().length > 0
        }

        if (Array.isArray(v)) {
          // Don't allow empty arrays
          return v.length > 0
        }

        // All other non-null values are allowed to pass through
        return true
      }

      return false
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

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    {},
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

//

var script$1 = {
  extends: __vue_component__,
  name: QuestionType.Dropdown,
  computed: {
    answerLabel: function answerLabel() {
      for (var i = 0; i < this.question.options.length; i++) {
        var option = this.question.options[i];

        if (option.choiceValue() === this.dataValue) {
          return option.choiceLabel()
        }
      }

      return this.question.placeholder
    }
  },
   methods: {
    onKeyDownListener: function onKeyDownListener($event) {
      if ($event.key === 'ArrowDown' || $event.key === 'ArrowUp') {
        this.setAnswer(this.dataValue);
      } else if ($event.key === 'Enter' && this.hasValue) {
        this.focused = false;
        this.blur();
      }
    },
    onKeyUpListener: function onKeyUpListener($event) {
      if ($event.key === 'Enter' && this.isValid()) {
        $event.stopPropagation();
        this._onEnter();
        this.$emit('next');
      }
    }
  }
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("span", { staticClass: "faux-form" }, [
    _c(
      "select",
      {
        ref: "input",
        attrs: { required: _vm.question.required },
        domProps: { value: _vm.dataValue },
        on: {
          change: _vm.onChange,
          keydown: _vm.onKeyDownListener,
          keyup: _vm.onKeyUpListener
        }
      },
      [
        _vm.question.required
          ? _c(
              "option",
              {
                attrs: {
                  label: " ",
                  value: "",
                  disabled: "",
                  selected: "",
                  hidden: ""
                }
              },
              [_vm._v(" ")]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm._l(_vm.question.options, function(option, index) {
          return _c(
            "option",
            {
              key: "o" + index,
              attrs: { disabled: option.disabled },
              domProps: { value: option.choiceValue() }
            },
            [_vm._v("\n      " + _vm._s(option.choiceLabel()) + "\n    ")]
          )
        })
      ],
      2
    ),
    _vm._v(" "),
    _c("span", [
      _c(
        "span",
        {
          staticClass: "f-empty",
          class: {
            "f-answered": this.question.answer && this.question.answered
          }
        },
        [_vm._v(_vm._s(_vm.answerLabel))]
      ),
      _vm._v(" "),
      _c("span", { staticClass: "f-arrow-down" }, [
        _c(
          "svg",
          {
            attrs: {
              version: "1.1",
              id: "Capa_1",
              xmlns: "http://www.w3.org/2000/svg",
              "xmlns:xlink": "http://www.w3.org/1999/xlink",
              x: "0px",
              y: "0px",
              viewBox: "-163 254.1 284.9 284.9",
              "xml:space": "preserve"
            }
          },
          [
            _c("g", [
              _c("path", {
                attrs: {
                  d:
                    "M119.1,330.6l-14.3-14.3c-1.9-1.9-4.1-2.9-6.6-2.9c-2.5,0-4.7,1-6.6,2.9L-20.5,428.5l-112.2-112.2c-1.9-1.9-4.1-2.9-6.6-2.9c-2.5,0-4.7,0.9-6.6,2.9l-14.3,14.3c-1.9,1.9-2.9,4.1-2.9,6.6c0,2.5,1,4.7,2.9,6.6l133,133c1.9,1.9,4.1,2.9,6.6,2.9s4.7-1,6.6-2.9l133.1-133c1.9-1.9,2.8-4.1,2.8-6.6C121.9,334.7,121,332.5,119.1,330.6z"
                }
              })
            ])
          ]
        )
      ])
    ])
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

function maskit (value, mask, masked, tokens) {
  if ( masked === void 0 ) masked = true;

  value = value || '';
  mask = mask || '';
  var iMask = 0;
  var iValue = 0;
  var output = '';
  while (iMask < mask.length && iValue < value.length) {
    var cMask = mask[iMask];
    var masker = tokens[cMask];
    var cValue = value[iValue];
    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
      	output += masker.transform ? masker.transform(cValue) : cValue;
        iMask++;
      }
      iValue++;
    } else {
      if (masker && masker.escape) {
        iMask++; // take the next mask char and treat it as char
        cMask = mask[iMask];
      }
      if (masked) { output += cMask; }
      if (cValue === cMask) { iValue++; } // user typed the same char
      iMask++;
    }
  }

  // fix mask that ends with a char: (#)
  var restOutput = '';
  while (iMask < mask.length && masked) {
    var cMask = mask[iMask];
    if (tokens[cMask]) {
      restOutput = '';
      break
    }
    restOutput += cMask;
    iMask++;
  }

  return output + restOutput
}

function dynamicMask (maskit, masks, tokens) {
  masks = masks.sort(function (a, b) { return a.length - b.length; });
  return function (value, mask, masked) {
    if ( masked === void 0 ) masked = true;

    var i = 0;
    while (i < masks.length) {
      var currentMask = masks[i];
      i++;
      var nextMask = masks[i];
      if (! (nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length) ) {
        return maskit(value, currentMask, masked, tokens)
      }
    }
    return '' // empty masks
  }
}

// Facade to maskit/dynamicMask when mask is String or Array
function masker (value, mask, masked, tokens) {
  if ( masked === void 0 ) masked = true;

  return Array.isArray(mask)
         ? dynamicMask(maskit, mask, tokens)(value, mask, masked, tokens)
         : maskit(value, mask, masked, tokens)
}

var tokens = {
  '#': {pattern: /\d/},
  'X': {pattern: /[0-9a-zA-Z]/},
  'S': {pattern: /[a-zA-Z]/},
  'A': {pattern: /[a-zA-Z]/, transform: function (v) { return v.toLocaleUpperCase(); }},
  'a': {pattern: /[a-zA-Z]/, transform: function (v) { return v.toLocaleLowerCase(); }},
  '!': {escape: true}
};

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#The_old-fashioned_way
function event (name) {
  var evt = document.createEvent('Event');
  evt.initEvent(name, true, true);
  return evt
}

function mask (el, binding) {
  var config = binding.value;
  if (Array.isArray(config) || typeof config === 'string') {
    config = {
      mask: config,
      tokens: tokens
    };
  }

  if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
    var els = el.getElementsByTagName('input');
    if (els.length !== 1) {
      throw new Error("v-mask directive requires 1 input, found " + els.length)
    } else {
      el = els[0];
    }
  }

  el.oninput = function (evt) {
    if (!evt.isTrusted) { return } // avoid infinite loop
    /* other properties to try to diferentiate InputEvent of Event (custom)
    InputEvent (native)
      cancelable: false
      isTrusted: true

      composed: true
      isComposing: false
      which: 0

    Event (custom)
      cancelable: true
      isTrusted: false
    */
    // by default, keep cursor at same position as before the mask
    var position = el.selectionEnd;
    // save the character just inserted
    var digit = el.value[position-1];
    el.value = masker(el.value, config.mask, true, config.tokens);
    // if the digit was changed, increment position until find the digit again
    while (position < el.value.length && el.value.charAt(position-1) !== digit) {
      position++;
    }
    if (el === document.activeElement) {
      el.setSelectionRange(position, position);
      setTimeout(function () {
        el.setSelectionRange(position, position);
      }, 0);
    }
    el.dispatchEvent(event('input'));
  };

  var newDisplay = masker(el.value, config.mask, true, config.tokens);
  if (newDisplay !== el.value) {
    el.value = newDisplay;
    el.dispatchEvent(event('input'));
  }
}

//

var script$2 = {
  name: 'TheMask',
  props: {
    value: [String, Number],
    mask: {
      type: [String, Array],
      required: true
    },
    masked: { // by default emits the value unformatted, change to true to format with the mask
      type: Boolean,
      default: false // raw
    },
    tokens: {
      type: Object,
      default: function () { return tokens; }
    }
  },
  directives: {mask: mask},
  data: function data () {
    return {
      lastValue: null, // avoid unecessary emit when has no change
      display: this.value
    }
  },
  watch : {
    value: function value (newValue) {
      if (newValue !== this.lastValue) {
        this.display = newValue;
      }
    },
    masked: function masked () {
      this.refresh(this.display);
    }
  },
  computed: {
    config: function config () {
      return {
        mask: this.mask,
        tokens: this.tokens,
        masked: this.masked
      }
    }
  },
  methods: {
    onInput: function onInput (e) {
      if (e.isTrusted) { return } // ignore native event
      this.refresh(e.target.value);
    },

    refresh: function refresh (value) {
      this.display = value;
      var value = masker(value, this.mask, this.masked, this.tokens);
      if (value !== this.lastValue) {
        this.lastValue = value;
        this.$emit('input', value);
      }
    }
  }
};

/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("input", {
    directives: [
      {
        name: "mask",
        rawName: "v-mask",
        value: _vm.config,
        expression: "config"
      }
    ],
    attrs: { type: "text" },
    domProps: { value: _vm.display },
    on: { input: _vm.onInput }
  })
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$3 = {
  extends: __vue_component__,
  name: QuestionType.Text,
  components: {
    TheMask: __vue_component__$2
  },

  data: function data() {
    return {
      inputType: 'text', 
      canReceiveFocus: true
    }
  }, 

  methods: {
    validate: function validate() {
      var this$1 = this;

      if (this.question.mask && this.hasValue) {
        if (Array.isArray(this.question.mask)) {
          return this.question.mask.some(function (mask) { return mask.length === this$1.dataValue.length; })
        }

        return this.dataValue.length === this.question.mask.length
      }

      return !this.question.required || this.hasValue
    }
  }
};

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    {
      attrs: {
        "data-placeholder": _vm.inputType === "date" ? _vm.placeholder : null
      }
    },
    [
      _vm.question.mask
        ? _c("the-mask", {
            ref: "input",
            attrs: {
              mask: _vm.question.mask,
              masked: false,
              type: _vm.inputType,
              value: _vm.value,
              required: _vm.question.required,
              placeholder: _vm.placeholder,
              min: _vm.question.min,
              max: _vm.question.max
            },
            on: { change: _vm.onChange },
            nativeOn: {
              keydown: function($event) {
                return _vm.onKeyDown($event)
              },
              keyup: [
                function($event) {
                  return _vm.onChange($event)
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  $event.preventDefault();
                  return _vm.onEnter($event)
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                  ) {
                    return null
                  }
                  $event.preventDefault();
                  return _vm.onEnter($event)
                }
              ],
              focus: function($event) {
                return _vm.setFocus($event)
              },
              blur: function($event) {
                return _vm.unsetFocus($event)
              }
            }
          })
        : _c("input", {
            ref: "input",
            attrs: {
              type: _vm.inputType,
              required: _vm.question.required,
              min: _vm.question.min,
              max: _vm.question.max,
              placeholder: _vm.placeholder
            },
            domProps: { value: _vm.value },
            on: {
              keydown: _vm.onKeyDown,
              keyup: [
                _vm.onChange,
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  $event.preventDefault();
                  return _vm.onEnter($event)
                },
                function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
                  ) {
                    return null
                  }
                  $event.preventDefault();
                  return _vm.onEnter($event)
                }
              ],
              focus: _vm.setFocus,
              blur: _vm.unsetFocus,
              change: _vm.onChange
            }
          })
    ],
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

var script$4 = {
  extends: __vue_component__$3,
  name: QuestionType.Email,
  data: function data() {
    return {
      inputType: 'email'
    }
  },
  methods: {
    validate: function validate() {
      if (this.hasValue) {
        return /^[^@]+@.+[^.]$/.test(this.dataValue)
      }

      return !this.question.required
    }
  }
};

/* script */
var __vue_script__$4 = script$4;

/* template */

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//

var script$5 = {
  name: 'TextareaAutosize',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    autosize: {
      type: Boolean,
      default: true
    },
    minHeight: {
      type: [Number],
      'default': null
    },
    maxHeight: {
      type: [Number],
      'default': null
    },
    /*
     * Force !important for style properties
     */
    important: {
      type: [Boolean, Array],
      default: false
    }
  },
  data: function data () {
    return {
      // data property for v-model binding with real textarea tag
      val: null,
      // works when content height becomes more then value of the maxHeight property
      maxHeightScroll: false,
      height: 'auto'
    }
  },
  computed: {
    computedStyles: function computedStyles () {
      if (!this.autosize) { return {} }
      return {
        resize: !this.isResizeImportant ? 'none' : 'none !important',
        height: this.height,
        overflow: this.maxHeightScroll ? 'auto' : (!this.isOverflowImportant ? 'hidden' : 'hidden !important')
      }
    },
    isResizeImportant: function isResizeImportant () {
      var imp = this.important;
      return imp === true || (Array.isArray(imp) && imp.includes('resize'))
    },
    isOverflowImportant: function isOverflowImportant () {
      var imp = this.important;
      return imp === true || (Array.isArray(imp) && imp.includes('overflow'))
    },
    isHeightImportant: function isHeightImportant () {
      var imp = this.important;
      return imp === true || (Array.isArray(imp) && imp.includes('height'))
    }
  },
  watch: {
    value: function value (val) {
      this.val = val;
    },
    val: function val (val$1) {
      this.$nextTick(this.resize);
      this.$emit('input', val$1);
    },
    minHeight: function minHeight () {
      this.$nextTick(this.resize);
    },
    maxHeight: function maxHeight () {
      this.$nextTick(this.resize);
    },
    autosize: function autosize (val) {
      if (val) { this.resize(); }
    }
  },
  methods: {
    resize: function resize () {
      var this$1 = this;

      var important = this.isHeightImportant ? 'important' : '';
      this.height = "auto" + (important ? ' !important' : '');
      this.$nextTick(function () {
        var contentHeight = this$1.$el.scrollHeight + 1;

        if (this$1.minHeight) {
          contentHeight = contentHeight < this$1.minHeight ? this$1.minHeight : contentHeight;
        }

        if (this$1.maxHeight) {
          if (contentHeight > this$1.maxHeight) {
            contentHeight = this$1.maxHeight;
            this$1.maxHeightScroll = true;
          } else {
            this$1.maxHeightScroll = false;
          }
        }

        var heightVal = contentHeight + 'px';
        this$1.height = "" + heightVal + (important ? ' !important' : '');
      });

      return this
    }
  },
  created: function created () {
    this.val = this.value;
  },
  mounted: function mounted () {
    this.resize();
  }
};

/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("textarea", {
    directives: [
      { name: "model", rawName: "v-model", value: _vm.val, expression: "val" }
    ],
    style: _vm.computedStyles,
    domProps: { value: _vm.val },
    on: {
      focus: _vm.resize,
      input: function($event) {
        if ($event.target.composing) {
          return
        }
        _vm.val = $event.target.value;
      }
    }
  })
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$6 = {
  extends: __vue_component__,
  name: QuestionType.LongText,
  components: {
    TextareaAutosize: __vue_component__$5
  },
  data: function data () {
    return {
      canReceiveFocus: true
    }
  },
  mounted: function mounted() {
    window.addEventListener('resize', this.onResizeListener);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.onResizeListener);
  },
  methods: {
    onResizeListener: function onResizeListener() {
      this.$refs.input.resize();
    },

    unsetFocus: function unsetFocus($event) {
      if ($event || !this.isMobile) {
        this.focused = false;
      }
    },

    onEnterDown: function onEnterDown($event) {
      if (!this.isMobile) {
        $event.preventDefault();
      }
    },

    onEnter: function onEnter() {
      if (!this.isMobile) {
        this._onEnter();
      }
    }
  }
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    [
      _c("textarea-autosize", {
        ref: "input",
        attrs: {
          rows: "1",
          value: _vm.value,
          required: _vm.question.required,
          placeholder: _vm.placeholder
        },
        nativeOn: {
          keydown: [
            function($event) {
              return _vm.onKeyDown($event)
            },
            function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              if (
                $event.ctrlKey ||
                $event.shiftKey ||
                $event.altKey ||
                $event.metaKey
              ) {
                return null
              }
              return _vm.onEnterDown($event)
            }
          ],
          keyup: [
            function($event) {
              return _vm.onChange($event)
            },
            function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              if (
                $event.ctrlKey ||
                $event.shiftKey ||
                $event.altKey ||
                $event.metaKey
              ) {
                return null
              }
              $event.preventDefault();
              return _vm.onEnter($event)
            },
            function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "tab", 9, $event.key, "Tab")
              ) {
                return null
              }
              $event.preventDefault();
              return _vm.onEnter($event)
            }
          ],
          focus: function($event) {
            return _vm.setFocus($event)
          },
          blur: function($event) {
            return _vm.unsetFocus($event)
          }
        }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$7 = {
  extends: __vue_component__,
  name: QuestionType.MultipleChoice,

  data: function data() {
    return {
      editingOther: false,
      hasImages: false
    }
  },

  mounted: function mounted() {
    this.addKeyListener();
  },

  beforeDestroy: function beforeDestroy() {
    this.removeKeyListener();
  },

  watch: {
    active: function active(value) {
      if (value) {
        this.addKeyListener();

        if (this.question.multiple && this.question.answered) {
          this.enterPressed = false;
        }
      } else {
        this.removeKeyListener();
      }
    }
  },
  
  methods: {
    addKeyListener: function addKeyListener() {
      this.removeKeyListener();
      document.addEventListener('keyup', this.onKeyListener);
    },

    removeKeyListener: function removeKeyListener() {
      document.removeEventListener('keyup', this.onKeyListener);
    },

    /**
     * Listens for keyboard events (A, B, C, ...)
     */
    onKeyListener: function onKeyListener($event) {
      if (this.active && !this.editingOther && $event.key && $event.key.length === 1) {
        var keyCode = $event.key.toUpperCase().charCodeAt(0);

        if (keyCode >= 65 && keyCode <= 90) {
          var index = keyCode - 65;

          if (index > -1) {
            var option = this.question.options[index];

            if (option) {
              this.toggleAnswer(option);
            } else if (this.question.allowOther && index === this.question.options.length) {
              this.startEditOther();
            }
          }
        }
      }
    },

    getLabel: function getLabel(index) {
      return this.language.ariaMultipleChoice.replace(':letter', this.getToggleKey(index))
    },

    getToggleKey: function getToggleKey(index) {
      var key = 65 + index;

      if (key <= 90) {
        return String.fromCharCode(key)
      }

      return ''
    },

    toggleAnswer: function toggleAnswer(option) {
      if (!this.question.multiple) {
        if (this.question.allowOther) {
          this.question.other = this.dataValue = null;
          this.setAnswer(this.dataValue);
        }

        for (var i = 0; i < this.question.options.length; i++) {
          var o = this.question.options[i];

          if (o.selected) {
            this._toggleAnswer(o);
          }
        }
      }

      this._toggleAnswer(option);
    },

    _toggleAnswer: function _toggleAnswer(option) {
      var optionValue = option.choiceValue();

      option.toggle();

      if (this.question.multiple) {
        this.enterPressed = false;

        if (!option.selected) {
          this._removeAnswer(optionValue);
        } else if (this.dataValue.indexOf(optionValue) === -1) {
          this.dataValue.push(optionValue);
        }
      } else {
        this.dataValue = option.selected ? optionValue : null;
      }

      if (this.isValid() && this.question.nextStepOnAnswer && !this.question.multiple) {
        this.$emit('next');
      }

      this.setAnswer(this.dataValue);
    },

    _removeAnswer: function _removeAnswer(value) {
      var index = this.dataValue.indexOf(value);

      if (index !== -1) {
        this.dataValue.splice(index, 1);
      }
    },

    startEditOther: function startEditOther() {
      var this$1 = this;

      this.editingOther = true;
      this.enterPressed = false;

      this.$nextTick(function () {
        this$1.$refs.otherInput.focus();
      });
    },

    onChangeOther: function onChangeOther() {
      if (this.editingOther) {
        var
          value = [],
          self = this;

        this.question.options.forEach(function(option) {
          if (option.selected) {
            if (self.question.multiple) {
              value.push(option.choiceValue());
            } else {
              option.toggle();
            }
          }
        });

        if (this.question.other && this.question.multiple) {
          value.push(this.question.other);
        } else if (!this.question.multiple) {
          value = this.question.other;
        }

        this.dataValue = value;
        this.setAnswer(this.dataValue);
      }
    },
    
    stopEditOther: function stopEditOther() {
      this.editingOther = false;
    }
  },

  computed: {
    hasValue: function hasValue() {
      if (this.question.options.filter(function (o) { return o.selected; }).length) {
        return true
      }

      if (this.question.allowOther) {
        return this.question.other && this.question.other.trim().length > 0
      }

      return false
    }
  }
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "f-radios-wrap" }, [
    _c(
      "ul",
      {
        staticClass: "f-radios",
        class: { "f-multiple": _vm.question.multiple },
        attrs: { role: "listbox" }
      },
      [
        _vm._l(_vm.question.options, function(option, index) {
          return _c(
            "li",
            {
              key: "m" + index,
              class: { "f-selected": option.selected },
              attrs: { "aria-label": _vm.getLabel(index), role: "option" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  return _vm.toggleAnswer(option)
                }
              }
            },
            [
              _vm.hasImages && option.imageSrc
                ? _c("span", { staticClass: "f-image" }, [
                    _c("img", {
                      attrs: { src: option.imageSrc, alt: option.imageAlt }
                    })
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("div", { staticClass: "f-label-wrap" }, [
                _c("span", { staticClass: "f-key" }, [
                  _vm._v(_vm._s(_vm.getToggleKey(index)))
                ]),
                _vm._v(" "),
                option.choiceLabel()
                  ? _c("span", { staticClass: "f-label" }, [
                      _vm._v(_vm._s(option.choiceLabel()))
                    ])
                  : _vm._e()
              ])
            ]
          )
        }),
        _vm._v(" "),
        !_vm.hasImages && _vm.question.allowOther
          ? _c(
              "li",
              {
                staticClass: "f-other",
                class: {
                  "f-selected": _vm.question.other,
                  "f-focus": _vm.editingOther
                },
                attrs: {
                  "aria-label": _vm.language.ariaTypeAnswer,
                  role: "option"
                },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    return _vm.startEditOther($event)
                  }
                }
              },
              [
                _c("div", { staticClass: "f-label-wrap" }, [
                  !_vm.editingOther
                    ? _c("span", { staticClass: "f-key" }, [
                        _vm._v(
                          _vm._s(_vm.getToggleKey(_vm.question.options.length))
                        )
                      ])
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.editingOther
                    ? _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.question.other,
                            expression: "question.other"
                          }
                        ],
                        ref: "otherInput",
                        attrs: { type: "text", maxlength: "256" },
                        domProps: { value: _vm.question.other },
                        on: {
                          blur: _vm.stopEditOther,
                          keyup: [
                            function($event) {
                              if (
                                !$event.type.indexOf("key") &&
                                _vm._k(
                                  $event.keyCode,
                                  "enter",
                                  13,
                                  $event.key,
                                  "Enter"
                                )
                              ) {
                                return null
                              }
                              $event.preventDefault();
                              return _vm.stopEditOther($event)
                            },
                            _vm.onChangeOther
                          ],
                          change: _vm.onChangeOther,
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.question, "other", $event.target.value);
                          }
                        }
                      })
                    : _vm.question.other
                    ? _c("span", { staticClass: "f-selected" }, [
                        _c("span", { staticClass: "f-label" }, [
                          _vm._v(_vm._s(_vm.question.other))
                        ])
                      ])
                    : _c("span", { staticClass: "f-label" }, [
                        _vm._v(_vm._s(_vm.language.otherPrompt))
                      ])
                ])
              ]
            )
          : _vm._e()
      ],
      2
    )
  ])
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$7 = undefined;
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

var script$8 = {
  extends: __vue_component__$7,
  name: QuestionType.MultiplePictureChoice,

  data: function data() {
    return {
      hasImages: true
    }
  }
};

/* script */
var __vue_script__$8 = script$8;

/* template */

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

var script$9 = {
  extends: __vue_component__$3,
  name: QuestionType.Number,

  data: function data() {
    return {
      inputType: 'tel',
      allowedChars: '-0123456789.'
    }
  },

  methods: {
    validate: function validate() {
      if (this.hasValue) {
        return !isNaN(+this.dataValue)
      }

      return !this.question.required || this.hasValue
    }
  }
};

/* script */
var __vue_script__$9 = script$9;

/* template */

  /* style */
  var __vue_inject_styles__$9 = undefined;
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );

var script$a = {
  extends: __vue_component__$3,
  name: QuestionType.Password,
  data: function data() {
    return {
      inputType: 'password'
    }
  }
};

/* script */
var __vue_script__$a = script$a;

/* template */

  /* style */
  var __vue_inject_styles__$a = undefined;
  /* scoped */
  var __vue_scope_id__$a = undefined;
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

var script$b = {
  extends: __vue_component__$3,
  name: QuestionType.Phone,
  data: function data() {
    return {
      inputType: 'tel', 
      canReceiveFocus: true
    }
  }
};

/* script */
var __vue_script__$b = script$b;

/* template */

  /* style */
  var __vue_inject_styles__$b = undefined;
  /* scoped */
  var __vue_scope_id__$b = undefined;
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$c = {
  extends: __vue_component__,
  name: QuestionType.SectionBreak,
  methods: {
    onEnter: function onEnter() {
      this.dirty = true;

      this._onEnter();
    },

    isValid: function isValid() {
      return true
    }
  }
};

/* script */
var __vue_script__$c = script$c;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.question.content
    ? _c("div", { staticClass: "f-content" }, [
        _c("span", { staticClass: "f-section-text" }, [
          _vm._v(_vm._s(_vm.question.content))
        ])
      ])
    : _vm._e()
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$c = undefined;
  /* scoped */
  var __vue_scope_id__$c = undefined;
  /* module identifier */
  var __vue_module_identifier__$c = undefined;
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );

var script$d = {
  extends: __vue_component__$3,
  name: QuestionType.Url,
  data: function data() {
    return {
      inputType: 'url'
    }
  },
  methods: {
    fixAnswer: function fixAnswer(answer) {
      if (answer && answer.indexOf('://') === -1) {
        // Insert https protocol to make it easier to enter
        // correct URLs
        answer = 'https://' + answer;
      }

      return answer
    },

    validate: function validate() {
      if (this.hasValue) {
        try {
          var url = new URL(this.fixAnswer(this.dataValue));

          return true
        } catch(_) { 
          // Invalid URL
          return false
        }
      }

      return !this.question.required
    }
  }
};

/* script */
var __vue_script__$d = script$d;

/* template */

  /* style */
  var __vue_inject_styles__$d = undefined;
  /* scoped */
  var __vue_scope_id__$d = undefined;
  /* module identifier */
  var __vue_module_identifier__$d = undefined;
  /* functional template */
  var __vue_is_functional_template__$d = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$d = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    undefined,
    undefined,
    undefined
  );

var script$e = {
  extends: __vue_component__$3,
  name: QuestionType.Date,
  data: function data() {
    return {
      inputType: 'date'
    }
  }, 
  methods: {
    validate: function validate() {
      if (this.question.min && this.dataValue < this.question.min) {
        return false
      }

      if (this.question.max && this.dataValue > this.question.max) {
        return false
      }

      return !this.question.required || this.hasValue
    }
  }
};

/* script */
var __vue_script__$e = script$e;

/* template */

  /* style */
  var __vue_inject_styles__$e = undefined;
  /* scoped */
  var __vue_scope_id__$e = undefined;
  /* module identifier */
  var __vue_module_identifier__$e = undefined;
  /* functional template */
  var __vue_is_functional_template__$e = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$e = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    undefined,
    undefined,
    undefined
  );

//


var script$f = {
  name: 'FlowFormQuestion',
  components: {
    FlowFormDateType: __vue_component__$e,
    FlowFormDropdownType: __vue_component__$1,
    FlowFormEmailType: __vue_component__$4,
    FlowFormLongTextType: __vue_component__$6,
    FlowFormMultipleChoiceType: __vue_component__$7,
    FlowFormMultiplePictureChoiceType: __vue_component__$8,
    FlowFormNumberType: __vue_component__$9,
    FlowFormPasswordType: __vue_component__$a,
    FlowFormPhoneType: __vue_component__$b,
    FlowFormSectionBreakType: __vue_component__$c,
    FlowFormTextType: __vue_component__$3,
    FlowFormUrlType: __vue_component__$d
  },
  props: {
    question: QuestionModel,
    language: LanguageModel,
    value: [String, Array, Boolean, Number, Object],
    active: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  mixins: [
    IsMobile
  ],
  data: function data() {
    return {
      QuestionType: QuestionType,
      dataValue: null,
      debounced: false
    }
  },
  mounted: function mounted() {
    this.focusField();
    this.dataValue = this.question.answer;

    this.$refs.qanimate.addEventListener('animationend', this.onAnimationEnd);
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.qanimate.removeEventListener('animationend', this.onAnimationEnd);
  },
  methods: {
    /**
     * Autofocus the input box of the current question
     */
    focusField: function focusField() {
      var el = this.$refs.questionComponent;
      
      el && el.focus();
    },

    onAnimationEnd: function onAnimationEnd() {
      this.focusField();
    },

    shouldFocus: function shouldFocus() {
      var q = this.$refs.questionComponent;

      return q && q.canReceiveFocus && !q.focused
    },

    returnFocus: function returnFocus() {
      var q = this.$refs.questionComponent;

      if (this.shouldFocus()) {
        this.focusField();
      }
    },

    /**
     * Emits "answer" event and calls "onEnter" method on Enter press
     */ 
    onEnter: function onEnter($event) {
      this.checkAnswer(this.emitAnswer);
    },

    onTab: function onTab($event) {
      this.checkAnswer(this.emitAnswerTab);
    },

    checkAnswer: function checkAnswer(fn) {
      var q = this.$refs.questionComponent;

      if (q.isValid() && this.question.nextStepOnAnswer && !this.question.multiple) {
        this.debounce(function () { return fn(q); }, 350);
      } else {
        fn(q);
      }
    },

    emitAnswer: function emitAnswer(q) {
      if (q) {
        if (!q.focused) {
          this.$emit('answer', q);
        }

        q.onEnter();
      }
    },

    emitAnswerTab: function emitAnswerTab(q) {
      if (q && this.question.type !== QuestionType.Date) {
        this.returnFocus();
        this.$emit('answer', q);
        
        q.onEnter();
      }
    },

    debounce: function debounce(fn, delay) {
      var debounceTimer;
      this.debounced = true;
    
      return (function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(fn, delay);
      })()
    },
    
    /**
     * Check if the "OK" button should be shown.
     */
    showOkButton: function showOkButton() {
      var q = this.$refs.questionComponent;

      if (this.question.type === QuestionType.SectionBreak) {
        return this.active
      }

      if (!this.question.required) {
        return true
      }

      if (this.question.allowOther && this.question.other) {
        return true
      }

      if (QuestionType.MultipleChoice && !this.question.multiple && this.question.nextStepOnAnswer) {
        return false
      }
    
      // If there is no question referenced, or dataValue is still set to its default (null).
      // This allows a ChoiceOption value of false, but will not allow you to use null as a value.
      if (!q || this.dataValue === null) {
        return false
      }

      return q.hasValue && q.isValid()
    },

    showSkip: function showSkip() {
      var q = this.$refs.questionComponent;

      // We might not have a reference to the question component at first
      // but we know that if we don't, it's definitely empty
      return !this.question.required && (!q || !q.hasValue)
    },

    /**
     * Determins if the invalid message should be shown.
     */
    showInvalid: function showInvalid() {
      var q = this.$refs.questionComponent;

      if (!q || this.dataValue === null) {
        return false
      }

      return q.showInvalid()
    }
  },
  computed: {
    mainClasses: {
      cache: false,
      get: function get() {
        var classes = {
          'q-is-active': this.active,
          'q-is-inactive': !this.active,
          'f-fade-in-down': this.reverse,
          'f-fade-in-up': !this.reverse,
          'f-focused': this.$refs.questionComponent && this.$refs.questionComponent.focused,
          'f-has-value': this.$refs.questionComponent && this.$refs.questionComponent.hasValue
        };

        classes['field-' + this.question.type.toLowerCase().substring(8, this.question.type.length - 4)] = true;

        return classes
      }
    },

    showHelperText: function showHelperText() {
      if (this.question.subtitle) {
        return true
      }

      if (this.question.type === QuestionType.LongText || this.question.type === QuestionType.MultipleChoice) {
        return this.question.helpTextShow
      }

      return false
    }
  }
};

/* script */
var __vue_script__$f = script$f;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      ref: "qanimate",
      staticClass: "vff-animate q-form",
      class: _vm.mainClasses
    },
    [
      _c("div", { staticClass: "q-inner" }, [
        _c(
          "div",
          {
            class: {
              "f-section-wrap":
                _vm.question.type === _vm.QuestionType.SectionBreak
            }
          },
          [
            _c(
              "div",
              {
                class: {
                  fh2: _vm.question.type !== _vm.QuestionType.SectionBreak
                }
              },
              [
                _vm.question.tagline
                  ? _c("span", { staticClass: "f-tagline" }, [
                      _vm._v(_vm._s(_vm.question.tagline))
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.question.title
                  ? [
                      _vm.question.type === _vm.QuestionType.SectionBreak
                        ? _c("span", { staticClass: "fh2" }, [
                            _vm._v(_vm._s(_vm.question.title))
                          ])
                        : _c("span", { staticClass: "f-text" }, [
                            _vm._v(
                              "\n            " +
                                _vm._s(_vm.question.title) +
                                " \n            "
                            ),
                            _vm._v(" "),
                            _vm.question.required
                              ? _c(
                                  "span",
                                  {
                                    staticClass: "f-required",
                                    attrs: {
                                      "aria-label": _vm.language.ariaRequired,
                                      role: "note"
                                    }
                                  },
                                  [
                                    _c(
                                      "span",
                                      { attrs: { "aria-hidden": "true" } },
                                      [_vm._v("*")]
                                    )
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.question.inline
                              ? _c(
                                  "span",
                                  { staticClass: "f-answer" },
                                  [
                                    _c(_vm.question.type, {
                                      ref: "questionComponent",
                                      tag: "component",
                                      attrs: {
                                        question: _vm.question,
                                        language: _vm.language,
                                        active: _vm.active
                                      },
                                      on: { next: _vm.onEnter },
                                      model: {
                                        value: _vm.dataValue,
                                        callback: function($$v) {
                                          _vm.dataValue = $$v;
                                        },
                                        expression: "dataValue"
                                      }
                                    })
                                  ],
                                  1
                                )
                              : _vm._e()
                          ])
                    ]
                  : _vm._e(),
                _vm._v(" "),
                _vm.showHelperText
                  ? _c("span", { staticClass: "f-sub" }, [
                      _vm.question.subtitle
                        ? _c("span", [_vm._v(_vm._s(_vm.question.subtitle))])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.question.type === _vm.QuestionType.LongText &&
                      !_vm.isMobile
                        ? _c("span", {
                            staticClass: "f-help",
                            domProps: {
                              innerHTML: _vm._s(
                                _vm.question.helpText ||
                                  _vm.language.formatString(
                                    _vm.language.longTextHelpText
                                  )
                              )
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.question.type === _vm.QuestionType.MultipleChoice &&
                      _vm.question.multiple
                        ? _c("span", { staticClass: "f-help" }, [
                            _vm._v(
                              _vm._s(
                                _vm.question.helpText ||
                                  _vm.language.multipleChoiceHelpText
                              )
                            )
                          ])
                        : _vm.question.type === _vm.QuestionType.MultipleChoice
                        ? _c("span", { staticClass: "f-help" }, [
                            _vm._v(
                              _vm._s(
                                _vm.question.helpText ||
                                  _vm.language.multipleChoiceHelpTextSingle
                              )
                            )
                          ])
                        : _vm._e()
                    ])
                  : _vm._e(),
                _vm._v(" "),
                !_vm.question.inline
                  ? _c(
                      "div",
                      { staticClass: "f-answer f-full-width" },
                      [
                        _c(_vm.question.type, {
                          ref: "questionComponent",
                          tag: "component",
                          attrs: {
                            question: _vm.question,
                            language: _vm.language,
                            active: _vm.active
                          },
                          on: { next: _vm.onEnter },
                          model: {
                            value: _vm.dataValue,
                            callback: function($$v) {
                              _vm.dataValue = $$v;
                            },
                            expression: "dataValue"
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e()
              ],
              2
            ),
            _vm._v(" "),
            _vm.question.description ||
            _vm.question.descriptionLink.length !== 0
              ? _c(
                  "p",
                  { staticClass: "f-description" },
                  [
                    _vm.question.description
                      ? _c("span", [_vm._v(_vm._s(_vm.question.description))])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._l(_vm.question.descriptionLink, function(link, index) {
                      return _c(
                        "a",
                        {
                          key: "m" + index,
                          staticClass: "f-link",
                          attrs: { href: link.url, target: link.target }
                        },
                        [_vm._v(_vm._s(link.text || link.url))]
                      )
                    })
                  ],
                  2
                )
              : _vm._e()
          ]
        ),
        _vm._v(" "),
        _vm.showOkButton()
          ? _c("div", { staticClass: "vff-animate f-fade-in f-enter" }, [
              _c(
                "button",
                {
                  ref: "button",
                  staticClass: "o-btn-action",
                  attrs: {
                    type: "button",
                    href: "#",
                    "aria-label": _vm.language.ariaOk
                  },
                  on: {
                    click: function($event) {
                      $event.preventDefault();
                      return _vm.onEnter($event)
                    }
                  }
                },
                [
                  _vm.question.type === _vm.QuestionType.SectionBreak
                    ? _c("span", [_vm._v(_vm._s(_vm.language.continue))])
                    : _vm.showSkip()
                    ? _c("span", [_vm._v(_vm._s(_vm.language.skip))])
                    : _c("span", [_vm._v(_vm._s(_vm.language.ok))])
                ]
              ),
              _vm._v(" "),
              _vm.question.type !== _vm.QuestionType.LongText || !_vm.isMobile
                ? _c("a", {
                    staticClass: "f-enter-desc",
                    attrs: { href: "#" },
                    domProps: {
                      innerHTML: _vm._s(
                        _vm.language.formatString(_vm.language.pressEnter)
                      )
                    },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.onEnter($event)
                      }
                    }
                  })
                : _vm._e()
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.showInvalid()
          ? _c(
              "div",
              {
                staticClass: "f-invalid",
                attrs: { role: "alert", "aria-live": "assertive" }
              },
              [_vm._v(_vm._s(_vm.language.invalidPrompt))]
            )
          : _vm._e()
      ])
    ]
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  var __vue_inject_styles__$f = undefined;
  /* scoped */
  var __vue_scope_id__$f = undefined;
  /* module identifier */
  var __vue_module_identifier__$f = undefined;
  /* functional template */
  var __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    undefined,
    undefined,
    undefined
  );

//

var script$g = {
  name: 'FlowForm',
  components: {
    FlowFormQuestion: __vue_component__$f
  },
  
  props: {
    questions: {
      type: Array,
      validator: function (value) { return value.every(function (q) { return q instanceof QuestionModel; }); }
    }, 
    language: {
      type: LanguageModel,
      default: function () { return new LanguageModel(); }
    },
    progressbar: {
      type: Boolean, 
      default: true
    },
    standalone: {
      type: Boolean, 
      default: true
    },
    navigation: {
      type: Boolean, 
      default: true
    },
    timer: {
      type: Boolean,
      default: false
    },
    timerStartStep: [String, Number],
    timerStopStep: [String, Number]
  },

  mixins: [
    IsMobile ],

  data: function data() {
    return {
      completed: false,
      submitted: false,
      activeQuestionIndex: 0,
      questionList: [],
      questionListActivePath: [],
      reverse: false,
      timerOn: false,
      timerInterval: null,
      time: 0
    }
  },

  mounted: function mounted() {
    document.addEventListener('keydown', this.onKeyDownListener);
    document.addEventListener('keyup', this.onKeyUpListener, true);
    window.addEventListener('beforeunload', this.onBeforeUnload);

    this.setQuestions();
    this.checkTimer();
  },

  beforeDestroy: function beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDownListener);
    document.removeEventListener('keyup', this.onKeyUpListener, true);
    window.removeEventListener('beforeunload', this.onBeforeUnload);
    
    this.stopTimer();
  },

  computed: {
    numActiveQuestions: function numActiveQuestions() {
      return this.questionListActivePath.length
    },

    activeQuestion: function activeQuestion() {
      return this.questionListActivePath[this.activeQuestionIndex]
    },

    activeQuestionId: function activeQuestionId() {
      var question = this.questionModels[this.activeQuestionIndex];

      if (this.isOnLastStep) {
        return '_submit'
      }

      if (question && question.id) {
        return question.id
      }

      return null
    },

    numCompletedQuestions: function numCompletedQuestions() {
      var num = 0;

      this.questionListActivePath.forEach(function (question) {
        if (question.answered) {
          ++num;
        }
      });

      return num
    },

    percentCompleted: function percentCompleted() {
      if (!this.numActiveQuestions) {
        return 0
      }

      return Math.floor((this.numCompletedQuestions / this.numActiveQuestions) * 100)
    },

    isOnLastStep: function isOnLastStep() {
      return this.numActiveQuestions > 0 && this.activeQuestionIndex === this.questionListActivePath.length
    }, 

    isOnTimerStartStep: function isOnTimerStartStep() {
      if (this.activeQuestionId === this.timerStartStep) {
        return true
      }

      if (!this.timerOn && !this.timerStartStep && this.activeQuestionIndex === 0) {
        return true
      }

      return false
    },

    isOnTimerStopStep: function isOnTimerStopStep() {
      if (this.submitted) {
        return true
      }
      
      if (this.activeQuestionId === this.timerStopStep) {
        return true 
      }

      return false
    },

    questionModels: {
      cache: false,

      get: function get() {
        if (this.questions && this.questions.length) {
          return this.questions
        }

        var questions = [];

        if (!this.questions) {
          var classMap = {
            'options': ChoiceOption,
            'descriptionLink': LinkOption
          };

          this
            .$slots
            .default
            .filter(function (q) { return q.tag && q.tag.indexOf('Question') !== -1; })
            .forEach(function (q) {
              var attrs = q.data.attrs;
              var model = new QuestionModel();

              if (q.componentInstance.question !== null) {
                model = q.componentInstance.question;
              } 

              if (q.data.model) {
                model.answer = q.data.model.value;
              }

              Object.keys(model).forEach(function (key) {
                if (attrs[key] !== undefined) {
                  if (typeof model[key] === 'boolean') {
                    model[key] = attrs[key] !== false;
                  } else if (key in classMap) {
                    var
                      classReference = classMap[key],
                      options = [];

                    attrs[key].forEach(function (option) {
                      var instance = new classReference();

                      Object.keys(instance).forEach(function (instanceKey) {
                        if (option[instanceKey] !== undefined) {
                          instance[instanceKey] = option[instanceKey];
                        }
                      });

                      options.push(instance);
                    });

                    model[key] = options;
                  } else {
                    switch(key) {
                      case 'type':
                        if (Object.values(QuestionType).indexOf(attrs[key]) !== -1) {
                          model[key] = attrs[key];
                        } else {
                          for (var questionTypeKey in QuestionType) {
                            if (questionTypeKey.toLowerCase() === attrs[key].toLowerCase()) {
                              model[key] = QuestionType[questionTypeKey];
                              break
                            }
                          }
                        }
                        break

                      default:
                        model[key] = attrs[key];
                        break
                    }
                  }
                }
              });

              q.componentInstance.question = model;

              model.resetOptions();

              questions.push(model);
            });
        }

        return questions
      }
    }
  },

  methods: {
    /**
     * Returns currently active question component (if any).
     */
    activeQuestionComponent: function activeQuestionComponent() {
      if (this.$refs.questions) {
        return this.$refs.questions[this.activeQuestionIndex]
      }

      return null
    },

    setQuestions: function setQuestions() {
      this.setQuestionListActivePath();
      this.setQuestionList();
    },

    /**
     * This method goes through all questions and sets the ones
     * that are in the current path (taking note of logic jumps)
     */
    setQuestionListActivePath: function setQuestionListActivePath() {
      var questions = [];

      if (!this.questionModels.length) {
        return
      }

      var
        index = 0,
        serialIndex = 0,
        nextId;

      do {
        var question = this.questionModels[index];

        question.setIndex(serialIndex);
        question.language = this.language;

        questions.push(question);

        if (!question.jump) {
          ++index;
        } else if (question.answered) {
          nextId = question.getJumpId();
          if (nextId) {
            if (nextId === '_submit') {
              index = this.questionModels.length;
            } else {
              for (var i = 0; i < this.questionModels.length; i++) {
                if (this.questionModels[i].id === nextId) {
                  index = i;
                  break
                }
              }
            }
          } else {
            ++index;
          }
        } else {
          index = this.questionModels.length;
        }

        ++serialIndex;
      } while (index < this.questionModels.length)

      this.questionListActivePath = questions;
    },

    /**
     * Sets the question list array
     * (all questions up to, and including, the current one)
     */
    setQuestionList: function setQuestionList() {
      var questions = [];

      for (var index = 0; index < this.questionListActivePath.length; index++) {
        var question = this.questionListActivePath[index];

        questions.push(question);

        if (!question.answered) {
          if (this.completed) {
            // The "completed" status changed - user probably changed an
            // already entered answer.
            this.completed = false;
          }
          break
        }
      }

      this.questionList = questions;
    },

    /**
     * If we have any answered questions, notify user before leaving
     * the page.
     */
    onBeforeUnload: function onBeforeUnload(event) {
      if (this.activeQuestionIndex > 0 && !this.submitted) {
        event.preventDefault();
        event.returnValue = '';
      }
    },

    /**
     * Global key listeners, listen for Enter or Tab key events.
     */
    onKeyDownListener: function onKeyDownListener(e) {
      if (e.key !== 'Tab' || this.submitted) {
        return
      }

      if (e.shiftKey) {
        e.stopPropagation();
        e.preventDefault();

        if (this.navigation) {
          this.goToPreviousQuestion();
        }
      } else {
        var q = this.activeQuestionComponent();

        if (q.shouldFocus()) {
          e.preventDefault();

          q.focusField();
        } else {
          e.stopPropagation();

          this.emitTab();
          this.reverse = false;
        }
      }
    }, 

    onKeyUpListener: function onKeyUpListener(e) {
      if (e.shiftKey || ['Tab', 'Enter'].indexOf(e.key) === -1 || this.submitted) {
        return
      }

      var q = this.activeQuestionComponent();

      if (e.key === 'Tab' && q.shouldFocus()) {
        q.focusField();
      } else {
        if (e.key === 'Enter') {
          this.emitEnter();
        } 

        e.stopPropagation();
        this.reverse = false;
      }
    },

    emitEnter: function emitEnter() {
      var q = this.activeQuestionComponent();

      if (q) {
        // Send enter event to the current question component
        q.onEnter();
      } else if (this.completed && this.isOnLastStep) {
        // We're finished - submit form
        this.submit();
      }
    },

    emitTab: function emitTab() {
      var q = this.activeQuestionComponent();

      if (q) {
        // Send tab event to the current question component
        q.onTab();
      } else {
        this.emitEnter();
      }
    },

    submit: function submit() {
      this.emitSubmit();
      this.submitted = true;
    },

    emitComplete: function emitComplete() {
      this.$emit('complete', this.completed, this.questionList);
    },

    emitSubmit: function emitSubmit() {
      this.$emit('submit', this.questionList);
    },

    /**
     * Checks if we have another question and if we
     * can jump to it.
     */
    isNextQuestionAvailable: function isNextQuestionAvailable() {
      if (this.submitted) {
        return false
      }

      var q = this.activeQuestion;
      if (q && !q.required) {
        return true
      }

      if (this.completed && !this.isOnLastStep) {
        return true
      }
 
      return this.activeQuestionIndex < this.questionList.length - 1
    },

    /**
     * Triggered by the "answer" event in the Question component
     */
    onQuestionAnswered: function onQuestionAnswered(question) {
      var this$1 = this;

      if (question.isValid()) {
        this.$emit('answer', question.question);

        if (this.activeQuestionIndex < this.questionListActivePath.length) {
          ++this.activeQuestionIndex;
        }
       
        this.$nextTick(function () {
          this$1.setQuestions();
          this$1.checkTimer();
          // Nested $nextTick so we're 100% sure that setQuestions
          // actually updated the question array
          this$1.$nextTick(function () {
            var q = this$1.activeQuestionComponent();

            if (q) {
              q.focusField();
              this$1.activeQuestionIndex = q.question.index;
            } else if (this$1.isOnLastStep) {
              // No more questions left - set "completed" to true
              this$1.completed = true;
              this$1.activeQuestionIndex = this$1.questionListActivePath.length;
              
              this$1.$refs.button && this$1.$refs.button.focus();
            }

            this$1.$emit('step', this$1.activeQuestionId, this$1.activeQuestion);
          });
        });
      } else if (this.completed) {
        this.completed = false;
      }
    },

    /**
     * Jumps to previous question.
     */
    goToPreviousQuestion: function goToPreviousQuestion() {
      this.blurFocus();
  
      if (this.activeQuestionIndex > 0 && !this.submitted) {
        if (this.isOnTimerStopStep) {
          this.startTimer();
        }

        --this.activeQuestionIndex;

        this.reverse = true;

        this.checkTimer();
      }
    },

    /**
     * Jumps to next question.
     */
    goToNextQuestion: function goToNextQuestion() {
      this.blurFocus();
      if (this.isNextQuestionAvailable()) {
        this.emitEnter();
      }

      this.reverse = false;
    },

    /**
     * Removes focus from the currently focused DOM element.
     */
    blurFocus: function blurFocus() {
      document.activeElement && document.activeElement.blur && document.activeElement.blur();
    },

    checkTimer: function checkTimer() {
      if (this.timer) {
        if (this.isOnTimerStartStep) {
          this.startTimer();
        } else if (this.isOnTimerStopStep) {
          this.stopTimer();
        }
      }
    },

    startTimer: function startTimer() {
      if (this.timer && !this.timerOn) {
        this.timerInterval = setInterval(this.incrementTime, 1000);
        this.timerOn = true;
      }
    },

    stopTimer: function stopTimer() {
      if (this.timerOn) {
        clearInterval(this.timerInterval);
      }

      this.timerOn = false;
    },

    incrementTime: function incrementTime() {
      ++this.time;
      
      this.$emit('timer', this.time, this.formatTime(this.time));
    },

    formatTime: function formatTime(seconds) {
      var
        startIndex = 14,
        length = 5;
          
      if (seconds >= 60 * 60) {
        startIndex = 11;
        length = 8;
      }

      return new Date(1000 * seconds).toISOString().substr(startIndex, length)
    }
  },

  watch: {
    completed: function completed() {
      this.emitComplete();
    },
    
    submitted: function submitted() {
      this.stopTimer();
    }
  }
};

/* script */
var __vue_script__$g = script$g;
/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "vff",
      class: {
        "vff-not-standalone": !_vm.standalone,
        "vff-is-mobile": _vm.isMobile,
        "vff-is-ios": _vm.isIos
      }
    },
    [
      _c("div", { staticClass: "f-container" }, [
        _c(
          "div",
          { staticClass: "f-form-wrap" },
          [
            _vm._l(_vm.questionList, function(q, index) {
              return _c("flow-form-question", {
                key: "q" + index,
                ref: "questions",
                refInFor: true,
                attrs: {
                  question: q,
                  language: _vm.language,
                  active: q.index === _vm.activeQuestionIndex,
                  reverse: _vm.reverse
                },
                on: { answer: _vm.onQuestionAnswered },
                model: {
                  value: q.answer,
                  callback: function($$v) {
                    _vm.$set(q, "answer", $$v);
                  },
                  expression: "q.answer"
                }
              })
            }),
            _vm._v(" "),
            _vm._t("default"),
            _vm._v(" "),
            _vm.isOnLastStep
              ? _c(
                  "div",
                  { staticClass: "vff-animate f-fade-in-up field-submittype" },
                  [
                    _vm._t("complete", [
                      _c("div", { staticClass: "f-section-wrap" }, [
                        _c("p", [
                          _c("span", { staticClass: "fh2" }, [
                            _vm._v(_vm._s(_vm.language.thankYouText))
                          ])
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _vm._t("completeButton", [
                      !_vm.submitted
                        ? _c(
                            "button",
                            {
                              ref: "button",
                              staticClass: "o-btn-action",
                              attrs: {
                                type: "button",
                                href: "#",
                                "aria-label": _vm.language.ariaSubmitText
                              },
                              on: {
                                click: function($event) {
                                  $event.preventDefault();
                                  return _vm.submit()
                                }
                              }
                            },
                            [
                              _c("span", [
                                _vm._v(_vm._s(_vm.language.submitText))
                              ])
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      !_vm.submitted
                        ? _c("a", {
                            staticClass: "f-enter-desc",
                            attrs: { href: "#" },
                            domProps: {
                              innerHTML: _vm._s(
                                _vm.language.formatString(
                                  _vm.language.pressEnter
                                )
                              )
                            },
                            on: {
                              click: function($event) {
                                $event.preventDefault();
                                return _vm.submit()
                              }
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.submitted
                        ? _c("p", { staticClass: "text-success" }, [
                            _vm._v(_vm._s(_vm.language.successText))
                          ])
                        : _vm._e()
                    ])
                  ],
                  2
                )
              : _vm._e()
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "vff-footer" }, [
        _c("div", { staticClass: "footer-inner-wrap" }, [
          _vm.progressbar
            ? _c(
                "div",
                {
                  staticClass: "f-progress",
                  class: {
                    "not-started": _vm.percentCompleted === 0,
                    completed: _vm.percentCompleted === 100
                  }
                },
                [
                  _c("div", { staticClass: "f-progress-bar" }, [
                    _c("div", {
                      staticClass: "f-progress-bar-inner",
                      style: "width: " + _vm.percentCompleted + "%;"
                    })
                  ]),
                  _vm._v(
                    "\n        " +
                      _vm._s(
                        _vm.language.percentCompleted.replace(
                          ":percent",
                          _vm.percentCompleted
                        )
                      ) +
                      "\n      "
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _vm.navigation
            ? _c("div", { staticClass: "f-nav" }, [
                _c(
                  "a",
                  {
                    staticClass: "f-prev",
                    class: {
                      "f-disabled":
                        _vm.activeQuestionIndex === 0 || _vm.submitted
                    },
                    attrs: {
                      href: "#",
                      role: "button",
                      "aria-label": _vm.language.ariaPrev
                    },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.goToPreviousQuestion()
                      }
                    }
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "xmlns:xlink": "http://www.w3.org/1999/xlink",
                          x: "0px",
                          y: "0px",
                          width: "42.333px",
                          height: "28.334px",
                          viewBox: "78.833 5.5 42.333 28.334",
                          "aria-hidden": "true"
                        }
                      },
                      [
                        _c("path", {
                          attrs: {
                            d:
                              "M82.039,31.971L100,11.442l17.959,20.529L120,30.187L101.02,8.492c-0.258-0.295-0.629-0.463-1.02-0.463c-0.39,0-0.764,0.168-1.02,0.463L80,30.187L82.039,31.971z"
                          }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "f-nav-text",
                        attrs: { "aria-hidden": "true" }
                      },
                      [_vm._v(_vm._s(_vm.language.prev))]
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "a",
                  {
                    staticClass: "f-next",
                    class: { "f-disabled": !_vm.isNextQuestionAvailable() },
                    attrs: {
                      href: "#",
                      role: "button",
                      "aria-label": _vm.language.ariaNext
                    },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        return _vm.goToNextQuestion()
                      }
                    }
                  },
                  [
                    _c(
                      "svg",
                      {
                        attrs: {
                          version: "1.1",
                          xmlns: "http://www.w3.org/2000/svg",
                          "xmlns:xlink": "http://www.w3.org/1999/xlink",
                          x: "0px",
                          y: "0px",
                          width: "42.333px",
                          height: "28.334px",
                          viewBox: "78.833 5.5 42.333 28.334",
                          "aria-hidden": "true"
                        }
                      },
                      [
                        _c("path", {
                          attrs: {
                            d:
                              "M117.963,8.031l-17.961,20.529L82.042,8.031l-2.041,1.784l18.98,21.695c0.258,0.295,0.629,0.463,1.02,0.463c0.39,0,0.764-0.168,1.02-0.463l18.98-21.695L117.963,8.031z"
                          }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "span",
                      {
                        staticClass: "f-nav-text",
                        attrs: { "aria-hidden": "true" }
                      },
                      [_vm._v(_vm._s(_vm.language.next))]
                    )
                  ]
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.timer
            ? _c("div", { staticClass: "f-timer" }, [
                _c("span", [_vm._v(_vm._s(_vm.formatTime(_vm.time)))])
              ])
            : _vm._e()
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  var __vue_inject_styles__$g = undefined;
  /* scoped */
  var __vue_scope_id__$g = undefined;
  /* module identifier */
  var __vue_module_identifier__$g = undefined;
  /* functional template */
  var __vue_is_functional_template__$g = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$g = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    undefined,
    undefined,
    undefined
  );

var script$h = {
  name: 'Question',
  
  data: function data() {
    return {
      question: null
    }
  },

  render: function render() {
    return null
  },

  watch: {
    'question.answer': function question_answer(val) {
      this.$emit('input', val);
    }
  }
};

/* script */
var __vue_script__$h = script$h;

/* template */

  /* style */
  var __vue_inject_styles__$h = undefined;
  /* scoped */
  var __vue_scope_id__$h = undefined;
  /* module identifier */
  var __vue_module_identifier__$h = undefined;
  /* functional template */
  var __vue_is_functional_template__$h = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$h = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

function assign(target, firstSource) {
  var arguments$1 = arguments;

  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments$1[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

var es6ObjectAssign = {
  assign: assign,
  polyfill: polyfill
};

es6ObjectAssign.polyfill();

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return }
  install.installed = true;
  Vue.component('FlowForm', __vue_component__$g);
}

// Create module definition for Vue.use()
var plugin = {
  install: install
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default __vue_component__$g;
export { ChoiceOption, LanguageModel, LinkOption, MaskPresets, __vue_component__$h as Question, QuestionModel, QuestionType, install };
