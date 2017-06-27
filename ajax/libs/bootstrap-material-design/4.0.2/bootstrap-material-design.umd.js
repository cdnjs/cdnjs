/*!
  * bootstrap-material-design  v4.0.2 (https://github.com/FezVrasta/bootstrap-material-design)
  * Copyright 2016 Federico Zivolo and contributors
  * Licensed under MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('babel-polyfill'), require('bootstrap/dist/js/bootstrap')) :
  typeof define === 'function' && define.amd ? define(['babel-polyfill', 'bootstrap/dist/js/bootstrap'], factory) :
  (factory(global.babelPolyfill,global.bootstrap_dist_js_bootstrap));
}(this, function (babelPolyfill,bootstrap_dist_js_bootstrap) { 'use strict';

  var Util = function () {

    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */

    var transitionEnd = false;
    var _transitionEndSelector = '';

    var TransitionEndEvent = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    function transitionEndTest() {
      if (window.QUnit) {
        return false;
      }

      var el = document.createElement('bmd');

      for (var name in TransitionEndEvent) {
        if (el.style[name] !== undefined) {
          return TransitionEndEvent[name]; // { end: TransitionEndEvent[name] }
        }
      }

      return false;
    }

    function setTransitionEndSupport() {
      transitionEnd = transitionEndTest();

      // generate a concatenated transition end event selector
      for (var name in TransitionEndEvent) {
        _transitionEndSelector += ' ' + TransitionEndEvent[name];
      }
    }

    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {
      transitionEndSupported: function transitionEndSupported() {
        return transitionEnd;
      },
      transitionEndSelector: function transitionEndSelector() {
        return _transitionEndSelector;
      },
      isChar: function isChar(event) {
        if (typeof event.which === 'undefined') {
          return true;
        } else if (typeof event.which === 'number' && event.which > 0) {
          return !event.ctrlKey && !event.metaKey && !event.altKey && event.which !== 8 // backspace
          && event.which !== 9 // tab
          && event.which !== 13 // enter
          && event.which !== 16 // shift
          && event.which !== 17 // ctrl
          && event.which !== 20 // caps lock
          && event.which !== 27 // escape
          ;
        }
        return false;
      },
      assert: function assert($element, invalidTest, message) {
        if (invalidTest) {
          if (!$element === undefined) {
            $element.css('border', '1px solid red');
          }
          console.error(message, $element); // eslint-disable-line no-console
          throw message;
        }
      },
      describe: function describe($element) {
        if ($element === undefined) {
          return 'undefined';
        } else if ($element.length === 0) {
          return '(no matching elements)';
        }
        return $element[0].outerHTML.split('>')[0] + '>';
      }
    };

    setTransitionEndSupport();
    return Util;
  }(jQuery);

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var Base = function ($) {

    var ClassName = {
      BMD_FORM_GROUP: 'bmd-form-group',
      IS_FILLED: 'is-filled',
      IS_FOCUSED: 'is-focused'
    };

    var Selector = {
      BMD_FORM_GROUP: '.' + ClassName.BMD_FORM_GROUP
    };

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Base = function () {

      /**
       *
       * @param element
       * @param config
       * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
       */
      function Base($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        classCallCheck(this, Base);

        this.$element = $element;
        this.config = $.extend(true, {}, Default, config);

        // set properties for use in the constructor initialization
        for (var key in properties) {
          this[key] = properties[key];
        }
      }

      createClass(Base, [{
        key: 'dispose',
        value: function dispose(dataKey) {
          this.$element.data(dataKey, null);
          this.$element = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // protected

      }, {
        key: 'addFormGroupFocus',
        value: function addFormGroupFocus() {
          if (!this.$element.prop('disabled')) {
            this.$bmdFormGroup.addClass(ClassName.IS_FOCUSED);
          }
        }
      }, {
        key: 'removeFormGroupFocus',
        value: function removeFormGroupFocus() {
          this.$bmdFormGroup.removeClass(ClassName.IS_FOCUSED);
        }
      }, {
        key: 'removeIsFilled',
        value: function removeIsFilled() {
          this.$bmdFormGroup.removeClass(ClassName.IS_FILLED);
        }
      }, {
        key: 'addIsFilled',
        value: function addIsFilled() {
          this.$bmdFormGroup.addClass(ClassName.IS_FILLED);
        }

        // Find bmd-form-group

      }, {
        key: 'findMdbFormGroup',
        value: function findMdbFormGroup() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

          var mfg = this.$element.closest(Selector.BMD_FORM_GROUP);
          if (mfg.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.BMD_FORM_GROUP + ' for ' + Util.describe(this.$element));
          }
          return mfg;
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }]);
      return Base;
    }();

    return Base;
  }(jQuery);

  var BaseInput = function ($) {

    var ClassName = {
      FORM_GROUP: 'form-group',
      BMD_FORM_GROUP: 'bmd-form-group',
      BMD_LABEL: 'bmd-label',
      BMD_LABEL_STATIC: 'bmd-label-static',
      BMD_LABEL_PLACEHOLDER: 'bmd-label-placeholder',
      BMD_LABEL_FLOATING: 'bmd-label-floating',
      HAS_DANGER: 'has-danger',
      IS_FILLED: 'is-filled',
      IS_FOCUSED: 'is-focused',
      INPUT_GROUP: 'input-group'
    };

    var Selector = {
      FORM_GROUP: '.' + ClassName.FORM_GROUP,
      BMD_FORM_GROUP: '.' + ClassName.BMD_FORM_GROUP,
      BMD_LABEL_WILDCARD: 'label[class^=\'' + ClassName.BMD_LABEL + '\'], label[class*=\' ' + ClassName.BMD_LABEL + '\']' // match any label variant if specified
    };

    var Default = {
      validate: false,
      formGroup: {
        required: false
      },
      bmdFormGroup: {
        template: '<span class=\'' + ClassName.BMD_FORM_GROUP + '\'></span>',
        create: true, // create a wrapper if form-group not found
        required: true // not recommended to turn this off, only used for inline components
      },
      label: {
        required: false,

        // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
        //  - a function(thisComponent); or
        //  - a string selector used like $bmdFormGroup.find(selector)
        //
        // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
        //
        selectors: ['.form-control-label', // in the case of horizontal or inline forms, this will be marked
        '> label' // usual case for text inputs, first child.  Deeper would find toggle labels so don't do that.
        ],
        className: ClassName.BMD_LABEL_STATIC
      },
      requiredClasses: [],
      invalidComponentMatches: [],
      convertInputSizeVariations: true
    };

    var FormControlSizeMarkers = {
      'form-control-lg': 'bmd-form-group-lg',
      'form-control-sm': 'bmd-form-group-sm'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseInput = function (_Base) {
      inherits(BaseInput, _Base);

      /**
       *
       * @param element
       * @param config
       * @param properties - anything that needs to be set as this[key] = value.  Works around the need to call `super` before using `this`
       */
      function BaseInput($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        classCallCheck(this, BaseInput);

        // Enforce no overlap between components to prevent side effects
        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseInput).call(this, $element, $.extend(true, {}, Default, config), properties));

        _this._rejectInvalidComponentMatches();

        // Enforce expected structure (if any)
        _this.rejectWithoutRequiredStructure();

        // Enforce required classes for a consistent rendering
        _this._rejectWithoutRequiredClasses();

        // Resolve the form-group first, it will be used for bmd-form-group if possible
        //   note: different components have different rules
        _this.$formGroup = _this.findFormGroup(_this.config.formGroup.required);

        // Will add bmd-form-group to form-group or create an bmd-form-group
        //  Performance Note: for those forms that are really performance driven, create the markup with the .bmd-form-group to avoid
        //    rendering changes once added.
        _this.$bmdFormGroup = _this.resolveMdbFormGroup();

        // Resolve and mark the bmdLabel if necessary as defined by the config
        _this.$bmdLabel = _this.resolveMdbLabel();

        // Signal to the bmd-form-group that a form-control-* variation is being used
        _this.resolveMdbFormGroupSizing();

        _this.addFocusListener();
        _this.addChangeListener();

        if (_this.$element.val() != '') {
          _this.addIsFilled();
        }
        return _this;
      }

      createClass(BaseInput, [{
        key: 'dispose',
        value: function dispose(dataKey) {
          get(Object.getPrototypeOf(BaseInput.prototype), 'dispose', this).call(this, dataKey);
          this.$bmdFormGroup = null;
          this.$formGroup = null;
        }

        // ------------------------------------------------------------------------
        // protected

      }, {
        key: 'rejectWithoutRequiredStructure',
        value: function rejectWithoutRequiredStructure() {
          // implement
        }
      }, {
        key: 'addFocusListener',
        value: function addFocusListener() {
          var _this2 = this;

          this.$element.on('focus', function () {
            _this2.addFormGroupFocus();
          }).on('blur', function () {
            _this2.removeFormGroupFocus();
          });
        }
      }, {
        key: 'addChangeListener',
        value: function addChangeListener() {
          var _this3 = this;

          this.$element.on('keydown paste', function (event) {
            if (Util.isChar(event)) {
              _this3.addIsFilled();
            }
          }).on('keyup change', function () {

            // make sure empty is added back when there is a programmatic value change.
            //  NOTE: programmatic changing of value using $.val() must trigger the change event i.e. $.val('x').trigger('change')
            if (_this3.isEmpty()) {
              _this3.removeIsFilled();
            } else {
              _this3.addIsFilled();
            }

            if (_this3.config.validate) {
              // Validation events do not bubble, so they must be attached directly to the text: http://jsfiddle.net/PEpRM/1/
              //  Further, even the bind method is being caught, but since we are already calling #checkValidity here, just alter
              //  the form-group on change.
              //
              // NOTE: I'm not sure we should be intervening regarding validation, this seems better as a README and snippet of code.
              //        BUT, I've left it here for backwards compatibility.
              var isValid = typeof _this3.$element[0].checkValidity === 'undefined' || _this3.$element[0].checkValidity();
              if (isValid) {
                _this3.removeHasDanger();
              } else {
                _this3.addHasDanger();
              }
            }
          });
        }
      }, {
        key: 'addHasDanger',
        value: function addHasDanger() {
          this.$bmdFormGroup.addClass(ClassName.HAS_DANGER);
        }
      }, {
        key: 'removeHasDanger',
        value: function removeHasDanger() {
          this.$bmdFormGroup.removeClass(ClassName.HAS_DANGER);
        }
      }, {
        key: 'isEmpty',
        value: function isEmpty() {
          return this.$element.val() === null || this.$element.val() === undefined || this.$element.val() === '';
        }

        // Will add bmd-form-group to form-group or create a bmd-form-group if necessary

      }, {
        key: 'resolveMdbFormGroup',
        value: function resolveMdbFormGroup() {
          var mfg = this.findMdbFormGroup(false);
          if (mfg === undefined || mfg.length === 0) {
            if (this.config.bmdFormGroup.create && (this.$formGroup === undefined || this.$formGroup.length === 0)) {
              // If a form-group doesn't exist (not recommended), take a guess and wrap the element (assuming no label).
              //  note: it's possible to make this smarter, but I need to see valid cases before adding any complexity.

              // this may be an input-group, wrap that instead
              if (this.outerElement().parent().hasClass(ClassName.INPUT_GROUP)) {
                this.outerElement().parent().wrap(this.config.bmdFormGroup.template);
              } else {
                this.outerElement().wrap(this.config.bmdFormGroup.template);
              }
            } else {
              // a form-group does exist, add our marker class to it
              this.$formGroup.addClass(ClassName.BMD_FORM_GROUP);

              // OLD: may want to implement this after all, see how the styling turns out, but using an existing form-group is less manipulation of the dom and therefore preferable
              // A form-group does exist, so add an bmd-form-group wrapping it's internal contents
              //fg.wrapInner(this.config.bmdFormGroup.template)
            }

            mfg = this.findMdbFormGroup(this.config.bmdFormGroup.required);
          }

          return mfg;
        }

        // Demarcation element (e.g. first child of a form-group)
        //  Subclasses such as file inputs may have different structures

      }, {
        key: 'outerElement',
        value: function outerElement() {
          return this.$element;
        }

        // Will add bmd-label to bmd-form-group if not already specified

      }, {
        key: 'resolveMdbLabel',
        value: function resolveMdbLabel() {

          var label = this.$bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD);
          if (label === undefined || label.length === 0) {
            // we need to find it based on the configured selectors
            label = this.findMdbLabel(this.config.label.required);

            if (label === undefined || label.length === 0) {
              // no label found, and finder did not require one
            } else {
              // a candidate label was found, add the configured default class name
              label.addClass(this.config.label.className);
            }
          }

          return label;
        }

        // Find bmd-label variant based on the config selectors

      }, {
        key: 'findMdbLabel',
        value: function findMdbLabel() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

          var label = null;

          // use the specified selector order
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this.config.label.selectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var selector = _step.value;

              if ($.isFunction(selector)) {
                label = selector(this);
              } else {
                label = this.$bmdFormGroup.find(selector);
              }

              if (label !== undefined && label.length > 0) {
                break;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (label.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.BMD_LABEL_WILDCARD + ' within form-group for ' + Util.describe(this.$element));
          }
          return label;
        }

        // Find bmd-form-group

      }, {
        key: 'findFormGroup',
        value: function findFormGroup() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

          var fg = this.$element.closest(Selector.FORM_GROUP);
          if (fg.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.FORM_GROUP + ' for ' + Util.describe(this.$element));
          }
          return fg;
        }

        // Due to the interconnected nature of labels/inputs/help-blocks, signal the bmd-form-group-* size variation based on
        //  a found form-control-* size

      }, {
        key: 'resolveMdbFormGroupSizing',
        value: function resolveMdbFormGroupSizing() {
          if (!this.config.convertInputSizeVariations) {
            return;
          }

          // Modification - Change text-sm/lg to form-group-sm/lg instead (preferred standard and simpler css/less variants)
          for (var inputSize in FormControlSizeMarkers) {
            if (this.$element.hasClass(inputSize)) {
              //this.$element.removeClass(inputSize)
              this.$bmdFormGroup.addClass(FormControlSizeMarkers[inputSize]);
            }
          }
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_rejectInvalidComponentMatches',
        value: function _rejectInvalidComponentMatches() {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = this.config.invalidComponentMatches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var otherComponent = _step2.value;

              otherComponent.rejectMatch(this.constructor.name, this.$element);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }, {
        key: '_rejectWithoutRequiredClasses',
        value: function _rejectWithoutRequiredClasses() {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = this.config.requiredClasses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var requiredClass = _step3.value;


              var found = false;
              // allow one of several classes to be passed in x||y
              if (requiredClass.indexOf('||') !== -1) {
                var oneOf = requiredClass.split('||');
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                  for (var _iterator4 = oneOf[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var _requiredClass = _step4.value;

                    if (this.$element.hasClass(_requiredClass)) {
                      found = true;
                      break;
                    }
                  }
                } catch (err) {
                  _didIteratorError4 = true;
                  _iteratorError4 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                      _iterator4.return();
                    }
                  } finally {
                    if (_didIteratorError4) {
                      throw _iteratorError4;
                    }
                  }
                }
              } else if (this.$element.hasClass(requiredClass)) {
                found = true;
              }

              // error if not found
              if (!found) {
                $.error(this.constructor.name + ' element: ' + Util.describe(this.$element) + ' requires class: ' + requiredClass);
              }
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        }

        // ------------------------------------------------------------------------
        // static

      }]);
      return BaseInput;
    }(Base);

    return BaseInput;
  }(jQuery);

  var BaseSelection = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var Default = {
      label: {
        required: false

        // Prioritized find order for resolving the label to be used as an bmd-label if not specified in the markup
        //  - a function(thisComponent); or
        //  - a string selector used like $bmdFormGroup.find(selector)
        //
        // Note this only runs if $bmdFormGroup.find(Selector.BMD_LABEL_WILDCARD) fails to find a label (as authored in the markup)
        //
        //selectors: [
        //  `.form-control-label`, // in the case of horizontal or inline forms, this will be marked
        //  `> label` // usual case for text inputs
        //]
      }
    };

    var Selector = {
      LABEL: 'label'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseSelection = function (_BaseInput) {
      inherits(BaseSelection, _BaseInput);

      function BaseSelection($element, config, properties) {
        classCallCheck(this, BaseSelection);

        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseSelection).call(this, $element, $.extend(true, {}, Default, config), properties));
        // properties = {inputType: checkbox, outerClass: checkbox-inline}
        // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
        // '.${this.outerClass} > label > input[type=${this.inputType}]'

        _this.decorateMarkup();
        return _this;
      }

      // ------------------------------------------------------------------------
      // protected

      createClass(BaseSelection, [{
        key: 'decorateMarkup',
        value: function decorateMarkup() {
          this.$element.after(this.config.template);
        }

        // Demarcation element (e.g. first child of a form-group)

      }, {
        key: 'outerElement',
        value: function outerElement() {
          // .checkbox|switch|radio > label > input[type=checkbox|radio]
          // label.checkbox-inline > input[type=checkbox|radio]
          // .${this.outerClass} > label > input[type=${this.inputType}]
          return this.$element.parent().closest('.' + this.outerClass);
        }
      }, {
        key: 'rejectWithoutRequiredStructure',
        value: function rejectWithoutRequiredStructure() {
          // '.checkbox|switch|radio > label > input[type=checkbox|radio]'
          // '.${this.outerClass} > label > input[type=${this.inputType}]'
          Util.assert(this.$element, !this.$element.parent().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element should be <label>.');
          Util.assert(this.$element, !this.outerElement().hasClass(this.outerClass), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' outer element should have class ' + this.outerClass + '.');
        }
      }, {
        key: 'addFocusListener',
        value: function addFocusListener() {
          var _this2 = this;

          // checkboxes didn't appear to bubble to the document, so we'll bind these directly
          this.$element.closest(Selector.LABEL).hover(function () {
            _this2.addFormGroupFocus();
          }, function () {
            _this2.removeFormGroupFocus();
          });
        }
      }, {
        key: 'addChangeListener',
        value: function addChangeListener() {
          var _this3 = this;

          this.$element.change(function () {
            _this3.$element.blur();
          });
        }

        // ------------------------------------------------------------------------
        // private

      }]);
      return BaseSelection;
    }(BaseInput);

    return BaseSelection;
  }(jQuery);

  var Checkbox = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'checkbox';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      template: '<span class=\'checkbox-decorator\'><span class=\'check\'></span></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Checkbox = function (_BaseSelection) {
      inherits(Checkbox, _BaseSelection);

      function Checkbox($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
        classCallCheck(this, Checkbox);
        return possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [File, Radio, Text, Textarea, Select]},
        Default, config), properties));
      }

      createClass(Checkbox, [{
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

          get(Object.getPrototypeOf(Checkbox.prototype), 'dispose', this).call(this, dataKey);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          // '.checkbox > label > input[type=checkbox]'
          if ($element.attr('type') === 'checkbox') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'checkbox\'.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Checkbox($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Checkbox;
    }(BaseSelection);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Checkbox._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Checkbox;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Checkbox._jQueryInterface;
    };

    return Checkbox;
  }(jQuery);

  var CheckboxInline = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'checkboxInline';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      bmdFormGroup: {
        create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
        required: false
      }
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var CheckboxInline = function (_Checkbox) {
      inherits(CheckboxInline, _Checkbox);

      function CheckboxInline($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'checkbox-inline' } : arguments[2];
        classCallCheck(this, CheckboxInline);
        return possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxInline).call(this, $element, $.extend(true, {}, Default, config), properties));
      }

      createClass(CheckboxInline, [{
        key: 'dispose',
        value: function dispose() {
          get(Object.getPrototypeOf(CheckboxInline.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        //static matches($element) {
        //  // '.checkbox-inline > input[type=checkbox]'
        //  if ($element.attr('type') === 'checkbox') {
        //    return true
        //  }
        //  return false
        //}
        //
        //static rejectMatch(component, $element) {
        //  Util.assert(this.$element, this.matches($element), `${component} component element ${Util.describe($element)} is invalid for type='checkbox'.`)
        //}

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new CheckboxInline($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return CheckboxInline;
    }(Checkbox);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = CheckboxInline._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = CheckboxInline;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return CheckboxInline._jQueryInterface;
    };

    return CheckboxInline;
  }(jQuery);

  var CollapseInline = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapseInline';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Selector = {
      ANY_INPUT: 'input, select, textarea'
    };

    var ClassName = {
      IN: 'in',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed',
      WIDTH: 'width'
    };
    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var CollapseInline = function (_Base) {
      inherits(CollapseInline, _Base);

      // $element is expected to be the trigger
      //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="collapse" data-target="#search-field" aria-expanded="false" aria-controls="search-field">
      function CollapseInline($element, config) {
        classCallCheck(this, CollapseInline);

        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(CollapseInline).call(this, $element, $.extend(true, {}, Default, config)));

        _this.$bmdFormGroup = _this.findMdbFormGroup(true);

        var collapseSelector = $element.data('target');
        _this.$collapse = $(collapseSelector);

        Util.assert($element, _this.$collapse.length === 0, 'Cannot find collapse target for ' + Util.describe($element));
        Util.assert(_this.$collapse, !_this.$collapse.hasClass(ClassName.COLLAPSE), Util.describe(_this.$collapse) + ' is expected to have the \'' + ClassName.COLLAPSE + '\' class.  It is being targeted by ' + Util.describe($element));

        // find the first input for focusing
        var $inputs = _this.$bmdFormGroup.find(Selector.ANY_INPUT);
        if ($inputs.length > 0) {
          _this.$input = $inputs.first();
        }

        // automatically add the marker class to collapse width instead of height - nice convenience because it is easily forgotten
        if (!_this.$collapse.hasClass(ClassName.WIDTH)) {
          _this.$collapse.addClass(ClassName.WIDTH);
        }

        if (_this.$input) {
          // add a listener to set focus
          _this.$collapse.on('shown.bs.collapse', function () {
            _this.$input.focus();
          });

          // add a listener to collapse field
          _this.$input.blur(function () {
            _this.$collapse.collapse('hide');
          });
        }
        return _this;
      }

      createClass(CollapseInline, [{
        key: 'dispose',
        value: function dispose() {
          get(Object.getPrototypeOf(CollapseInline.prototype), 'dispose', this).call(this, DATA_KEY);
          this.$bmdFormGroup = null;
          this.$collapse = null;
          this.$input = null;
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new CollapseInline($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return CollapseInline;
    }(Base);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = CollapseInline._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = CollapseInline;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return CollapseInline._jQueryInterface;
    };

    return CollapseInline;
  }(jQuery);

  var File = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'file';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    var ClassName = {
      FILE: NAME,
      IS_FILE: 'is-file'
    };

    var Selector = {
      FILENAMES: 'input.form-control[readonly]'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var File = function (_BaseInput) {
      inherits(File, _BaseInput);

      function File($element, config) {
        classCallCheck(this, File);

        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(File).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, Radio, Text, Textarea, Select, Switch]},
        Default, config)));

        _this.$bmdFormGroup.addClass(ClassName.IS_FILE);
        return _this;
      }

      createClass(File, [{
        key: 'dispose',
        value: function dispose() {
          get(Object.getPrototypeOf(File.prototype), 'dispose', this).call(this, DATA_KEY);
        }
      }, {
        key: 'outerElement',


        // ------------------------------------------------------------------------
        // protected

        // Demarcation element (e.g. first child of a form-group)
        value: function outerElement() {
          // label.file > input[type=file]
          return this.$element.parent().closest('.' + ClassName.FILE);
        }
      }, {
        key: 'rejectWithoutRequiredStructure',
        value: function rejectWithoutRequiredStructure() {
          // label.file > input[type=file]
          Util.assert(this.$element, !this.outerElement().prop('tagName') === 'label', this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should be <label>.');
          Util.assert(this.$element, !this.outerElement().hasClass(ClassName.FILE), this.constructor.name + '\'s ' + Util.describe(this.$element) + ' parent element ' + Util.describe(this.outerElement()) + ' should have class .' + ClassName.FILE + '.');
        }
      }, {
        key: 'addFocusListener',
        value: function addFocusListener() {
          var _this2 = this;

          this.$bmdFormGroup.on('focus', function () {
            _this2.addFormGroupFocus();
          }).on('blur', function () {
            _this2.removeFormGroupFocus();
          });
        }
      }, {
        key: 'addChangeListener',
        value: function addChangeListener() {
          var _this3 = this;

          // set the fileinput readonly field with the name of the file
          this.$element.on('change', function () {
            var value = '';
            $.each(_this3.$element.files, function (i, file) {
              value += file.name + '  , ';
            });
            value = value.substring(0, value.length - 2);
            if (value) {
              _this3.addIsFilled();
            } else {
              _this3.removeIsFilled();
            }
            _this3.$bmdFormGroup.find(Selector.FILENAMES).val(value);
          });
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.attr('type') === 'file') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'file\'.');
        }
      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new File($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return File;
    }(BaseInput);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = File._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = File;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return File._jQueryInterface;
    };

    return File;
  }(jQuery);

  var Radio = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'radio';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      template: '<span class=\'bmd-radio-outer-circle\'></span><span class=\'bmd-radio-inner-circle\'></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Radio = function (_BaseSelection) {
      inherits(Radio, _BaseSelection);

      function Radio($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: NAME, outerClass: NAME } : arguments[2];
        classCallCheck(this, Radio);
        return possibleConstructorReturn(this, Object.getPrototypeOf(Radio).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Switch, Text]},
        Default, config), properties));
      }

      createClass(Radio, [{
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

          get(Object.getPrototypeOf(Radio.prototype), 'dispose', this).call(this, dataKey);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          // '.radio > label > input[type=radio]'
          if ($element.attr('type') === 'radio') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'radio\'.');
        }

        // ------------------------------------------------------------------------
        // protected

        //decorateMarkup() {
        //  this.$element.after(this.config.template)
        //}


        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Radio($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Radio;
    }(BaseSelection);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Radio._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Radio;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Radio._jQueryInterface;
    };

    return Radio;
  }(jQuery);

  var RadioInline = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'radioInline';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      bmdFormGroup: {
        create: false, // no bmd-form-group creation if form-group not present. It messes with the layout.
        required: false
      }
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var RadioInline = function (_Radio) {
      inherits(RadioInline, _Radio);

      function RadioInline($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'radio', outerClass: 'radio-inline' } : arguments[2];
        classCallCheck(this, RadioInline);
        return possibleConstructorReturn(this, Object.getPrototypeOf(RadioInline).call(this, $element, $.extend(true, {}, Default, config), properties));
      }

      createClass(RadioInline, [{
        key: 'dispose',
        value: function dispose() {
          get(Object.getPrototypeOf(RadioInline.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new RadioInline($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return RadioInline;
    }(Radio);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = RadioInline._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = RadioInline;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return RadioInline._jQueryInterface;
    };

    return RadioInline;
  }(jQuery);

  var BaseFormControl = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var Default = {
      requiredClasses: ['form-control']
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseFormControl = function (_BaseInput) {
      inherits(BaseFormControl, _BaseInput);

      function BaseFormControl($element, config) {
        classCallCheck(this, BaseFormControl);

        // Initially mark as empty
        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseFormControl).call(this, $element, $.extend(true, Default, config)));

        if (_this.isEmpty()) {
          _this.removeIsFilled();
        }
        return _this;
      }

      return BaseFormControl;
    }(BaseInput);

    return BaseFormControl;
  }(jQuery);

  var Select = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'select';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      requiredClasses: ['form-control||custom-select']
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Select = function (_BaseFormControl) {
      inherits(Select, _BaseFormControl);

      function Select($element, config) {
        classCallCheck(this, Select);

        // floating labels will cover the options, so trigger them to be above (if used)
        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Select).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Text, Textarea]},
        Default, config)));

        _this.addIsFilled();
        return _this;
      }

      createClass(Select, [{
        key: 'dispose',
        value: function dispose() {
          get(Object.getPrototypeOf(Select.prototype), 'dispose', this).call(this, DATA_KEY);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.prop('tagName') === 'select') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <select>.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Select($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Select;
    }(BaseFormControl);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Select._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Select;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Select._jQueryInterface;
    };

    return Select;
  }(jQuery);

  var Switch = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'switch';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {
      template: '<span class=\'bmd-switch-track\'></span>'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Switch = function (_Checkbox) {
      inherits(Switch, _Checkbox);

      function Switch($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? { inputType: 'checkbox', outerClass: 'switch' } : arguments[2];
        classCallCheck(this, Switch);
        return possibleConstructorReturn(this, Object.getPrototypeOf(Switch).call(this, $element, $.extend(true, {}, Default, config), properties));
        // selector: '.switch > label > input[type=checkbox]'
      }

      createClass(Switch, [{
        key: 'dispose',
        value: function dispose() {
          get(Object.getPrototypeOf(Switch.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Switch($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Switch;
    }(Checkbox);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Switch._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Switch;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Switch._jQueryInterface;
    };

    return Switch;
  }(jQuery);

  var Text = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'text';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Text = function (_BaseFormControl) {
      inherits(Text, _BaseFormControl);

      function Text($element, config) {
        classCallCheck(this, Text);
        return possibleConstructorReturn(this, Object.getPrototypeOf(Text).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Switch, Select, Textarea]},
        Default, config)));
      }

      createClass(Text, [{
        key: 'dispose',
        value: function dispose() {
          var dataKey = arguments.length <= 0 || arguments[0] === undefined ? DATA_KEY : arguments[0];

          get(Object.getPrototypeOf(Text.prototype), 'dispose', this).call(this, dataKey);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.attr('type') === 'text') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for type=\'text\'.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Text($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Text;
    }(BaseFormControl);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Text._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Text;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Text._jQueryInterface;
    };

    return Text;
  }(jQuery);

  var Textarea = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'textarea';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Textarea = function (_BaseFormControl) {
      inherits(Textarea, _BaseFormControl);

      function Textarea($element, config) {
        classCallCheck(this, Textarea);
        return possibleConstructorReturn(this, Object.getPrototypeOf(Textarea).call(this, $element, $.extend(true,
        //{invalidComponentMatches: [Checkbox, File, Radio, Text, Select, Switch]},
        Default, config)));
      }

      createClass(Textarea, [{
        key: 'dispose',
        value: function dispose() {
          get(Object.getPrototypeOf(Textarea.prototype), 'dispose', this).call(this, DATA_KEY);
        }
      }], [{
        key: 'matches',
        value: function matches($element) {
          if ($element.prop('tagName') === 'textarea') {
            return true;
          }
          return false;
        }
      }, {
        key: 'rejectMatch',
        value: function rejectMatch(component, $element) {
          Util.assert(this.$element, this.matches($element), component + ' component element ' + Util.describe($element) + ' is invalid for <textarea>.');
        }

        // ------------------------------------------------------------------------
        // protected

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }, {
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Textarea($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Textarea;
    }(BaseFormControl);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Textarea._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Textarea;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Textarea._jQueryInterface;
    };

    return Textarea;
  }(jQuery);

  var BaseLayout = function ($) {

    var ClassName = {
      CANVAS: 'bmd-layout-canvas',
      CONTAINER: 'bmd-layout-container',
      BACKDROP: 'bmd-layout-backdrop'
    };

    var Selector = {
      CANVAS: '.' + ClassName.CANVAS,
      CONTAINER: '.' + ClassName.CONTAINER,
      BACKDROP: '.' + ClassName.BACKDROP
    };

    var Default = {
      canvas: {
        create: true,
        required: true,
        template: '<div class="' + ClassName.CANVAS + '"></div>'
      },
      backdrop: {
        create: true,
        required: true,
        template: '<div class="' + ClassName.BACKDROP + '"></div>'
      }
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BaseLayout = function (_Base) {
      inherits(BaseLayout, _Base);

      function BaseLayout($element, config) {
        var properties = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        classCallCheck(this, BaseLayout);

        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(BaseLayout).call(this, $element, $.extend(true, {}, Default, config), properties));

        _this.$container = _this.findContainer(true);
        _this.$backdrop = _this.resolveBackdrop();
        _this.resolveCanvas();
        return _this;
      }

      createClass(BaseLayout, [{
        key: 'dispose',
        value: function dispose(dataKey) {
          get(Object.getPrototypeOf(BaseLayout.prototype), 'dispose', this).call(this, dataKey);
          this.$container = null;
          this.$backdrop = null;
        }

        // ------------------------------------------------------------------------
        // protected

        // Will wrap container in bmd-layout-canvas if necessary

      }, {
        key: 'resolveCanvas',
        value: function resolveCanvas() {
          var bd = this.findCanvas(false);
          if (bd === undefined || bd.length === 0) {
            if (this.config.canvas.create) {
              this.$container.wrap(this.config.canvas.template);
            }

            bd = this.findCanvas(this.config.canvas.required);
          }

          return bd;
        }

        // Find closest bmd-layout-container based on the given context

      }, {
        key: 'findCanvas',
        value: function findCanvas() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

          var canvas = context.closest(Selector.CANVAS);
          if (canvas.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.CANVAS + ' for ' + Util.describe(context));
          }
          return canvas;
        }

        // Will add bmd-layout-backdrop to bmd-layout-container if necessary

      }, {
        key: 'resolveBackdrop',
        value: function resolveBackdrop() {
          var bd = this.findBackdrop(false);
          if (bd === undefined || bd.length === 0) {
            if (this.config.backdrop.create) {
              this.$container.append(this.config.backdrop.template);
            }

            bd = this.findBackdrop(this.config.backdrop.required);
          }

          return bd;
        }

        // Find closest bmd-layout-container based on the given context

      }, {
        key: 'findBackdrop',
        value: function findBackdrop() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.$container : arguments[1];

          var backdrop = context.find('> ' + Selector.BACKDROP);
          if (backdrop.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.BACKDROP + ' for ' + Util.describe(context));
          }
          return backdrop;
        }

        // Find closest bmd-layout-container based on the given context

      }, {
        key: 'findContainer',
        value: function findContainer() {
          var raiseError = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
          var context = arguments.length <= 1 || arguments[1] === undefined ? this.$element : arguments[1];

          var container = context.closest(Selector.CONTAINER);
          if (container.length === 0 && raiseError) {
            $.error('Failed to find ' + Selector.CONTAINER + ' for ' + Util.describe(context));
          }
          return container;
        }

        // ------------------------------------------------------------------------
        // private

        // ------------------------------------------------------------------------
        // static

      }]);
      return BaseLayout;
    }(Base);

    return BaseLayout;
  }(jQuery);

  var Drawer = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'drawer';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Keycodes = {
      ESCAPE: 27
      //ENTER: 13,
      //SPACE: 32
    };

    var ClassName = {
      IN: 'in',
      DRAWER_IN: 'bmd-drawer-in',
      DRAWER_OUT: 'bmd-drawer-out',
      DRAWER: 'bmd-layout-drawer',
      CONTAINER: 'bmd-layout-container'
    };

    var Default = {
      focusSelector: 'a, button, input'
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Drawer = function (_BaseLayout) {
      inherits(Drawer, _BaseLayout);

      // $element is expected to be the trigger
      //  i.e. <button class="btn bmd-btn-icon" for="search" data-toggle="drawer" data-target="#my-side-nav-drawer" aria-expanded="false" aria-controls="my-side-nav-drawer">
      function Drawer($element, config) {
        classCallCheck(this, Drawer);

        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Drawer).call(this, $element, $.extend(true, {}, Default, config)));

        _this.$toggles = $('[data-toggle="drawer"][href="#' + _this.$element[0].id + '"], [data-toggle="drawer"][data-target="#' + _this.$element[0].id + '"]');

        _this._addAria();

        // click or escape on the backdrop closes the drawer
        _this.$backdrop.keydown(function (ev) {
          if (ev.which === Keycodes.ESCAPE) {
            _this.hide();
          }
        }).click(function () {
          _this.hide();
        });

        // escape on the drawer closes it
        _this.$element.keydown(function (ev) {
          if (ev.which === Keycodes.ESCAPE) {
            _this.hide();
          }
        });

        // any toggle button clicks
        _this.$toggles.click(function () {
          _this.toggle();
        });
        return _this;
      }

      createClass(Drawer, [{
        key: 'dispose',
        value: function dispose() {
          get(Object.getPrototypeOf(Drawer.prototype), 'dispose', this).call(this, DATA_KEY);
          this.$toggles = null;
        }
      }, {
        key: 'toggle',
        value: function toggle() {
          if (this._isOpen()) {
            this.hide();
          } else {
            this.show();
          }
        }
      }, {
        key: 'show',
        value: function show() {
          if (this._isForcedClosed() || this._isOpen()) {
            return;
          }

          this.$toggles.attr('aria-expanded', true);
          this.$element.attr('aria-expanded', true);
          this.$element.attr('aria-hidden', false);

          // focus on the first focusable item
          var $focusOn = this.$element.find(this.config.focusSelector);
          if ($focusOn.length > 0) {
            $focusOn.first().focus();
          }

          this.$container.addClass(ClassName.DRAWER_IN);
          // backdrop is responsively styled based on bmd-drawer-overlay, therefore style is none of our concern, simply add the marker class and let the scss determine if it should be displayed or not.
          this.$backdrop.addClass(ClassName.IN);
        }
      }, {
        key: 'hide',
        value: function hide() {
          if (!this._isOpen()) {
            return;
          }

          this.$toggles.attr('aria-expanded', false);
          this.$element.attr('aria-expanded', false);
          this.$element.attr('aria-hidden', true);

          this.$container.removeClass(ClassName.DRAWER_IN);
          this.$backdrop.removeClass(ClassName.IN);
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_isOpen',
        value: function _isOpen() {
          return this.$container.hasClass(ClassName.DRAWER_IN);
        }
      }, {
        key: '_isForcedClosed',
        value: function _isForcedClosed() {
          return this.$container.hasClass(ClassName.DRAWER_OUT);
        }
      }, {
        key: '_addAria',
        value: function _addAria() {
          var isOpen = this._isOpen();
          this.$element.attr('aria-expanded', isOpen);
          this.$element.attr('aria-hidden', isOpen);

          if (this.$toggles.length) {
            this.$toggles.attr('aria-expanded', isOpen);
          }
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Drawer($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Drawer;
    }(BaseLayout);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Drawer._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Drawer;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Drawer._jQueryInterface;
    };

    return Drawer;
  }(jQuery);

  var Ripples = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'ripples';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var ClassName = {
      CONTAINER: 'ripple-container',
      DECORATOR: 'ripple-decorator'
    };

    var Selector = {
      CONTAINER: '.' + ClassName.CONTAINER,
      DECORATOR: '.' + ClassName.DECORATOR //,
    };

    var Default = {
      container: {
        template: '<div class=\'' + ClassName.CONTAINER + '\'></div>'
      },
      decorator: {
        template: '<div class=\'' + ClassName.DECORATOR + '\'></div>'
      },
      trigger: {
        start: 'mousedown touchstart',
        end: 'mouseup mouseleave touchend'
      },
      touchUserAgentRegex: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
      duration: 500
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Ripples = function () {
      function Ripples($element, config) {
        var _this = this;

        classCallCheck(this, Ripples);

        this.$element = $element;

        //console.log(`Adding ripples to ${Util.describe(this.$element)}`)  // eslint-disable-line no-console
        this.config = $.extend(true, {}, Default, config);

        // attach initial listener
        this.$element.on(this.config.trigger.start, function (event) {
          _this._onStartRipple(event);
        });
      }

      createClass(Ripples, [{
        key: 'dispose',
        value: function dispose() {
          this.$element.data(DATA_KEY, null);
          this.$element = null;
          this.$container = null;
          this.$decorator = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_onStartRipple',
        value: function _onStartRipple(event) {
          var _this2 = this;

          // Verify if the user is just touching on a device and return if so
          if (this._isTouch() && event.type === 'mousedown') {
            return;
          }

          // Find or create the ripple container element
          this._findOrCreateContainer();

          // Get relY and relX positions of the container element
          var relY = this._getRelY(event);
          var relX = this._getRelX(event);

          // If relY and/or relX are false, return the event
          if (!relY && !relX) {
            return;
          }

          // set the location and color each time (even if element is cached)
          this.$decorator.css({
            left: relX,
            top: relY,
            'background-color': this._getRipplesColor()
          });

          // Make sure the ripple has the styles applied (ugly hack but it works)
          this._forceStyleApplication();

          // Turn on the ripple animation
          this.rippleOn();

          // Call the rippleEnd function when the transition 'on' ends
          setTimeout(function () {
            _this2.rippleEnd();
          }, this.config.duration);

          // Detect when the user leaves the element to cleanup if not already done?
          this.$element.on(this.config.trigger.end, function () {
            if (_this2.$decorator) {
              // guard against race condition/mouse attack
              _this2.$decorator.data('mousedown', 'off');

              if (_this2.$decorator.data('animating') === 'off') {
                _this2.rippleOut();
              }
            }
          });
        }
      }, {
        key: '_findOrCreateContainer',
        value: function _findOrCreateContainer() {
          if (!this.$container || !this.$container.length > 0) {
            this.$element.append(this.config.container.template);
            this.$container = this.$element.find(Selector.CONTAINER);
          }

          // always add the rippleElement, it is always removed
          this.$container.append(this.config.decorator.template);
          this.$decorator = this.$container.find(Selector.DECORATOR);
        }

        // Make sure the ripple has the styles applied (ugly hack but it works)

      }, {
        key: '_forceStyleApplication',
        value: function _forceStyleApplication() {
          return window.getComputedStyle(this.$decorator[0]).opacity;
        }

        /**
         * Get the relX
         */

      }, {
        key: '_getRelX',
        value: function _getRelX(event) {
          var wrapperOffset = this.$container.offset();

          var result = null;
          if (!this._isTouch()) {
            // Get the mouse position relative to the ripple wrapper
            result = event.pageX - wrapperOffset.left;
          } else {
            // Make sure the user is using only one finger and then get the touch
            //  position relative to the ripple wrapper
            event = event.originalEvent;

            if (event.touches.length === 1) {
              result = event.touches[0].pageX - wrapperOffset.left;
            } else {
              result = false;
            }
          }

          return result;
        }

        /**
         * Get the relY
         */

      }, {
        key: '_getRelY',
        value: function _getRelY(event) {
          var containerOffset = this.$container.offset();
          var result = null;

          if (!this._isTouch()) {
            /**
             * Get the mouse position relative to the ripple wrapper
             */
            result = event.pageY - containerOffset.top;
          } else {
            /**
             * Make sure the user is using only one finger and then get the touch
             * position relative to the ripple wrapper
             */
            event = event.originalEvent;

            if (event.touches.length === 1) {
              result = event.touches[0].pageY - containerOffset.top;
            } else {
              result = false;
            }
          }

          return result;
        }

        /**
         * Get the ripple color
         */

      }, {
        key: '_getRipplesColor',
        value: function _getRipplesColor() {
          var color = this.$element.data('ripple-color') ? this.$element.data('ripple-color') : window.getComputedStyle(this.$element[0]).color;
          return color;
        }

        /**
         * Verify if the client is using a mobile device
         */

      }, {
        key: '_isTouch',
        value: function _isTouch() {
          return this.config.touchUserAgentRegex.test(navigator.userAgent);
        }

        /**
         * End the animation of the ripple
         */

      }, {
        key: 'rippleEnd',
        value: function rippleEnd() {
          if (this.$decorator) {
            // guard against race condition/mouse attack
            this.$decorator.data('animating', 'off');

            if (this.$decorator.data('mousedown') === 'off') {
              this.rippleOut(this.$decorator);
            }
          }
        }

        /**
         * Turn off the ripple effect
         */

      }, {
        key: 'rippleOut',
        value: function rippleOut() {
          var _this3 = this;

          this.$decorator.off();

          if (Util.transitionEndSupported()) {
            this.$decorator.addClass('ripple-out');
          } else {
            this.$decorator.animate({ opacity: 0 }, 100, function () {
              _this3.$decorator.trigger('transitionend');
            });
          }

          this.$decorator.on(Util.transitionEndSelector(), function () {
            if (_this3.$decorator) {
              _this3.$decorator.remove();
              _this3.$decorator = null;
            }
          });
        }

        /**
         * Turn on the ripple effect
         */

      }, {
        key: 'rippleOn',
        value: function rippleOn() {
          var _this4 = this;

          var size = this._getNewSize();

          if (Util.transitionEndSupported()) {
            this.$decorator.css({
              '-ms-transform': 'scale(' + size + ')',
              '-moz-transform': 'scale(' + size + ')',
              '-webkit-transform': 'scale(' + size + ')',
              transform: 'scale(' + size + ')'
            }).addClass('ripple-on').data('animating', 'on').data('mousedown', 'on');
          } else {
            this.$decorator.animate({
              width: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
              height: Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * 2,
              'margin-left': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
              'margin-top': Math.max(this.$element.outerWidth(), this.$element.outerHeight()) * -1,
              opacity: 0.2
            }, this.config.duration, function () {
              _this4.$decorator.trigger('transitionend');
            });
          }
        }

        /**
         * Get the new size based on the element height/width and the ripple width
         */

      }, {
        key: '_getNewSize',
        value: function _getNewSize() {
          return Math.max(this.$element.outerWidth(), this.$element.outerHeight()) / this.$decorator.outerWidth() * 2.5;
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Ripples($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Ripples;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Ripples._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Ripples;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Ripples._jQueryInterface;
    };

    return Ripples;
  }(jQuery);

  var Autofill = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'autofill';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = 'bmd' + (NAME.charAt(0).toUpperCase() + NAME.slice(1));
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    var Default = {};

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Autofill = function (_Base) {
      inherits(Autofill, _Base);

      function Autofill($element, config) {
        classCallCheck(this, Autofill);

        var _this = possibleConstructorReturn(this, Object.getPrototypeOf(Autofill).call(this, $element, $.extend(true, {}, Default, config)));

        _this._watchLoading();
        _this._attachEventHandlers();
        return _this;
      }

      createClass(Autofill, [{
        key: 'dispose',
        value: function dispose() {
          get(Object.getPrototypeOf(Autofill.prototype), 'dispose', this).call(this, DATA_KEY);
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_watchLoading',
        value: function _watchLoading() {
          var _this2 = this;

          // After 10 seconds we are quite sure all the needed inputs are autofilled then we can stop checking them
          setTimeout(function () {
            clearInterval(_this2._onLoading);
          }, 10000);
        }

        // This part of code will detect autofill when the page is loading (username and password inputs for example)

      }, {
        key: '_onLoading',
        value: function _onLoading() {
          setInterval(function () {
            $('input[type!=checkbox]').each(function (index, element) {
              var $element = $(element);
              if ($element.val() && $element.val() !== $element.attr('value')) {
                $element.trigger('change');
              }
            });
          }, 100);
        }
      }, {
        key: '_attachEventHandlers',
        value: function _attachEventHandlers() {
          // Listen on inputs of the focused form
          //  (because user can select from the autofill dropdown only when the input has focus)
          var focused = null;
          $(document).on('focus', 'input', function (event) {
            var $inputs = $(event.currentTarget).closest('form').find('input').not('[type=file]');
            focused = setInterval(function () {
              $inputs.each(function (index, element) {
                var $element = $(element);
                if ($element.val() !== $element.attr('value')) {
                  $element.trigger('change');
                }
              });
            }, 100);
          }).on('blur', '.form-group input', function () {
            clearInterval(focused);
          });
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new Autofill($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return Autofill;
    }(Base);

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = Autofill._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = Autofill;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return Autofill._jQueryInterface;
    };

    return Autofill;
  }(jQuery);

  /**
   * $.bootstrapMaterialDesign(config) is a macro class to configure the components generally
   *  used in Bootstrap Material Design.  You may pass overrides to the configurations
   *  which will be passed into each component, or you may omit use of this class and
   *  configure each component separately.
   */
  var BootstrapMaterialDesign = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'bootstrapMaterialDesign';
    var DATA_KEY = 'bmd.' + NAME;
    var JQUERY_NAME = NAME; // retain this full name since it is long enough not to conflict
    var JQUERY_NO_CONFLICT = $.fn[JQUERY_NAME];

    /**
     * Global configuration:
     *  The global configuration hash will be mixed in to each components' config.
     *    e.g. calling $.bootstrapMaterialDesign({global: { validate: true } }) would pass `validate:true` to every component
     *
     *
     * Component configuration:
     *  - selector: may be a string or an array.  Any array will be joined with a comma to generate the selector
     *  - disable any component by defining it as false with an override. e.g. $.bootstrapMaterialDesign({ autofill: false })
     *
     *  @see each individual component for more configuration settings.
     */
    var Default = {
      global: {
        validate: false,
        label: {
          className: 'bmd-label-static' // default style of label to be used if not specified in the html markup
        }
      },
      autofill: {
        selector: 'body'
      },
      checkbox: {
        selector: '.checkbox > label > input[type=checkbox]'
      },
      checkboxInline: {
        selector: 'label.checkbox-inline > input[type=checkbox]'
      },
      collapseInline: {
        selector: '.bmd-collapse-inline [data-toggle="collapse"]'
      },
      drawer: {
        selector: '.bmd-layout-drawer'
      },
      file: {
        selector: 'input[type=file]'
      },
      radio: {
        selector: '.radio > label > input[type=radio]'
      },
      radioInline: {
        selector: 'label.radio-inline > input[type=radio]'
      },
      ripples: {
        //selector: ['.btn:not(.btn-link):not(.ripple-none)'] // testing only
        selector: ['.btn:not(.btn-link):not(.ripple-none)', '.card-image:not(.ripple-none)', '.navbar a:not(.ripple-none)', '.dropdown-menu a:not(.ripple-none)', '.nav-tabs a:not(.ripple-none)', '.pagination li:not(.active):not(.disabled) a:not(.ripple-none)', '.ripple' // generic marker class to add ripple to elements
        ]
      },
      select: {
        selector: ['select']
      },
      switch: {
        selector: '.switch > label > input[type=checkbox]'
      },
      text: {
        // omit inputs we have specialized components to handle - we need to match text, email, etc.  The easiest way to do this appears to be just omit the ones we don't want to match and let the rest fall through to this.
        selector: ['input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=button]):not([type=submit]):not([type=reset])']
      },
      textarea: {
        selector: ['textarea']
      },
      arrive: true,
      // create an ordered component list for instantiation
      instantiation: ['ripples', 'checkbox', 'checkboxInline', 'collapseInline', 'drawer',
      //'file',
      'radio', 'radioInline', 'switch', 'text', 'textarea', 'select', 'autofill']
    };

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var BootstrapMaterialDesign = function () {
      function BootstrapMaterialDesign($element, config) {
        var _this = this;

        classCallCheck(this, BootstrapMaterialDesign);

        this.$element = $element;
        this.config = $.extend(true, {}, Default, config);
        var $document = $(document);

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          var _loop = function _loop() {
            var component = _step.value;


            // the component's config fragment is passed in directly, allowing users to override
            var componentConfig = _this.config[component];

            // check to make sure component config is enabled (not `false`)
            if (componentConfig) {
              (function () {

                // assemble the selector as it may be an array
                var selector = _this._resolveSelector(componentConfig);

                // mix in global options
                componentConfig = $.extend(true, {}, _this.config.global, componentConfig);

                // create the jquery fn name e.g. 'bmdText' for 'text'
                var componentName = '' + (component.charAt(0).toUpperCase() + component.slice(1));
                var jqueryFn = 'bmd' + componentName;

                try {
                  // safely instantiate component on selector elements with config, report errors and move on.
                  // console.debug(`instantiating: $('${selector}')[${jqueryFn}](${componentConfig})`) // eslint-disable-line no-console
                  $(selector)[jqueryFn](componentConfig);

                  // add to arrive if present and enabled
                  if (document.arrive && _this.config.arrive) {
                    $document.arrive(selector, function () {
                      // eslint-disable-line no-loop-func
                      $(this)[jqueryFn](componentConfig);
                    });
                  }
                } catch (e) {
                  var message = 'Failed to instantiate component: $(\'' + selector + '\')[' + jqueryFn + '](' + componentConfig + ')';
                  console.error(message, e, '\nSelected elements: ', $(selector)); // eslint-disable-line no-console
                  throw e;
                }
              })();
            }
          };

          for (var _iterator = this.config.instantiation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            _loop();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      createClass(BootstrapMaterialDesign, [{
        key: 'dispose',
        value: function dispose() {
          this.$element.data(DATA_KEY, null);
          this.$element = null;
          this.config = null;
        }

        // ------------------------------------------------------------------------
        // private

      }, {
        key: '_resolveSelector',
        value: function _resolveSelector(componentConfig) {
          var selector = componentConfig.selector;
          if (Array.isArray(selector)) {
            selector = selector.join(', ');
          }

          return selector;
        }

        // ------------------------------------------------------------------------
        // static

      }], [{
        key: '_jQueryInterface',
        value: function _jQueryInterface(config) {
          return this.each(function () {
            var $element = $(this);
            var data = $element.data(DATA_KEY);

            if (!data) {
              data = new BootstrapMaterialDesign($element, config);
              $element.data(DATA_KEY, data);
            }
          });
        }
      }]);
      return BootstrapMaterialDesign;
    }();

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[JQUERY_NAME] = BootstrapMaterialDesign._jQueryInterface;
    $.fn[JQUERY_NAME].Constructor = BootstrapMaterialDesign;
    $.fn[JQUERY_NAME].noConflict = function () {
      $.fn[JQUERY_NAME] = JQUERY_NO_CONFLICT;
      return BootstrapMaterialDesign._jQueryInterface;
    };

    return BootstrapMaterialDesign;
  }(jQuery);

}));
//# sourceMappingURL=bootstrap-material-design.umd.js.map
