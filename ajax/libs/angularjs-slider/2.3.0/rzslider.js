/*! angularjs-slider - v2.3.0 - 
 (c) Rafal Zajac <rzajac@gmail.com>, Valentin Hervieu <valentin@hervieu.me>, Jussi Saarivirta <jusasi@gmail.com>, Angelin Sirbu <angelin.sirbu@gmail.com> - 
 https://github.com/angular-slider/angularjs-slider - 
 2015-12-22 */
/*jslint unparam: true */
/*global angular: false, console: false, define, module */
(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    // to support bundler like browserify
    module.exports = factory(require('angular'));
  } else {
    // Browser globals (root is window)
    factory(root.angular);
  }

}(this, function(angular) {
  'use strict';
  var module = angular.module('rzModule', [])

  .factory('RzSliderOptions', function() {
    var defaultOptions = {
      floor: 0,
      ceil: null, //defaults to rz-slider-model
      step: 1,
      precision: 0,
      id: null,
      translate: null,
      stepsArray: null,
      draggableRange: false,
      draggableRangeOnly: false,
      showSelectionBar: false,
      hideLimitLabels: false,
      readOnly: false,
      disabled: false,
      interval: 350,
      showTicks: false,
      showTicksValues: false,
      ticksValuesTooltip: null,
      vertical: false,
      selectionBarColor: null,
      keyboardSupport: true,
      scale: 1,
      onStart: null,
      onChange: null,
      onEnd: null
    };
    var globalOptions = {};

    var factory = {};
    /**
     * `options({})` allows global configuration of all sliders in the
     * application.
     *
     *   var app = angular.module( 'App', ['rzModule'], function( RzSliderOptions ) {
     *     // show ticks for all sliders
     *     RzSliderOptions.options( { showTicks: true } );
     *   });
     */
    factory.options = function(value) {
      angular.extend(globalOptions, value);
    };

    factory.getOptions = function(options) {
      return angular.extend({}, defaultOptions, globalOptions, options);
    };

    return factory;
  })

  .value('rzThrottle',
    /**
     * rzThrottle
     *
     * Taken from underscore project
     *
     * @param {Function} func
     * @param {number} wait
     * @param {ThrottleOptions} options
     * @returns {Function}
     */
    function throttle(func, wait, options) {
      'use strict';
      var getTime = (Date.now || function() {
        return new Date().getTime();
      });
      var context, args, result;
      var timeout = null;
      var previous = 0;
      options = options || {};
      var later = function() {
        previous = options.leading === false ? 0 : getTime();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      };
      return function() {
        var now = getTime();
        if (!previous && options.leading === false) {
          previous = now;
        }
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
          clearTimeout(timeout);
          timeout = null;
          previous = now;
          result = func.apply(context, args);
          context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    })

  .factory('RzSlider', ['$timeout', '$document', '$window', '$compile', 'RzSliderOptions', 'rzThrottle', function($timeout, $document, $window, $compile, RzSliderOptions, rzThrottle) {
    'use strict';

    /**
     * Slider
     *
     * @param {ngScope} scope            The AngularJS scope
     * @param {Element} sliderElem The slider directive element wrapped in jqLite
     * @constructor
     */
    var Slider = function(scope, sliderElem) {
      /**
       * The slider's scope
       *
       * @type {ngScope}
       */
      this.scope = scope;

      /**
       * Slider element wrapped in jqLite
       *
       * @type {jqLite}
       */
      this.sliderElem = sliderElem;

      /**
       * Slider type
       *
       * @type {boolean} Set to true for range slider
       */
      this.range = this.scope.rzSliderModel !== undefined && this.scope.rzSliderHigh !== undefined;

      /**
       * Values recorded when first dragging the bar
       *
       * @type {Object}
       */
      this.dragging = {
        active: false,
        value: 0,
        difference: 0,
        offset: 0,
        lowDist: 0,
        highDist: 0
      };

      /**
       * property that handle position (defaults to left for horizontal)
       * @type {string}
       */
      this.positionProperty = 'left';

      /**
       * property that handle dimension (defaults to width for horizontal)
       * @type {string}
       */
      this.dimensionProperty = 'width';

      /**
       * Half of the width or height of the slider handles
       *
       * @type {number}
       */
      this.handleHalfDim = 0;

      /**
       * Maximum position the slider handle can have
       *
       * @type {number}
       */
      this.maxPos = 0;

      /**
       * Precision
       *
       * @type {number}
       */
      this.precision = 0;

      /**
       * Step
       *
       * @type {number}
       */
      this.step = 0;

      /**
       * The name of the handle we are currently tracking
       *
       * @type {string}
       */
      this.tracking = '';

      /**
       * Minimum value (floor) of the model
       *
       * @type {number}
       */
      this.minValue = 0;

      /**
       * Maximum value (ceiling) of the model
       *
       * @type {number}
       */
      this.maxValue = 0;


      /**
       * The delta between min and max value
       *
       * @type {number}
       */
      this.valueRange = 0;

      /**
       * Set to true if init method already executed
       *
       * @type {boolean}
       */
      this.initHasRun = false;

      // Slider DOM elements wrapped in jqLite
      this.fullBar = null; // The whole slider bar
      this.selBar = null; // Highlight between two handles
      this.minH = null; // Left slider handle
      this.maxH = null; // Right slider handle
      this.flrLab = null; // Floor label
      this.ceilLab = null; // Ceiling label
      this.minLab = null; // Label above the low value
      this.maxLab = null; // Label above the high value
      this.cmbLab = null; // Combined label
      this.ticks = null; // The ticks

      // Initialize slider
      this.init();
    };

    // Add instance methods
    Slider.prototype = {

      /**
       * Initialize slider
       *
       * @returns {undefined}
       */
      init: function() {
        var thrLow, thrHigh,
          calcDimFn = angular.bind(this, this.calcViewDimensions),
          self = this;

        this.applyOptions();
        this.initElemHandles();
        this.manageElementsStyle();
        this.addAccessibility();
        this.setDisabledState();
        this.calcViewDimensions();
        this.setMinAndMax();

        $timeout(function() {
          self.updateCeilLab();
          self.updateFloorLab();
          self.initHandles();
          self.manageEventsBindings();
        });

        // Recalculate slider view dimensions
        this.scope.$on('reCalcViewDimensions', calcDimFn);

        // Recalculate stuff if view port dimensions have changed
        angular.element($window).on('resize', calcDimFn);

        this.initHasRun = true;

        // Watch for changes to the model

        thrLow = rzThrottle(function() {
          self.setMinAndMax();
          self.updateLowHandle(self.valueToOffset(self.scope.rzSliderModel));
          self.updateSelectionBar();
          self.updateTicksScale();
          self.updateAriaAttributes();

          if (self.range) {
            self.updateCmbLabel();
          }

        }, self.options.interval);

        thrHigh = rzThrottle(function() {
          self.setMinAndMax();
          self.updateHighHandle(self.valueToOffset(self.scope.rzSliderHigh));
          self.updateSelectionBar();
          self.updateTicksScale();
          self.updateCmbLabel();
          self.updateAriaAttributes();
        }, self.options.interval);

        this.scope.$on('rzSliderForceRender', function() {
          self.resetLabelsValue();
          thrLow();
          if (self.range) {
            thrHigh();
          }
          self.resetSlider();
        });

        // Watchers
        this.scope.$watch('rzSliderModel', function(newValue, oldValue) {
          if (newValue === oldValue)
            return;
          thrLow();
        });

        this.scope.$watch('rzSliderHigh', function(newValue, oldValue) {
          if (newValue === oldValue)
            return;
          if (newValue != null)
            thrHigh();
          if (self.range && newValue == null || !self.range && newValue != null) {
            self.applyOptions();
            self.resetSlider();
          }
        });

        this.scope.$watch('rzSliderOptions', function(newValue, oldValue) {
          if (newValue === oldValue)
            return;
          self.applyOptions();
          self.resetSlider();
        }, true);

        this.scope.$on('$destroy', function() {
          self.unbindEvents();
          angular.element($window).off('resize', calcDimFn);
        });
      },

      /**
       * Read the user options and apply them to the slider model
       */
      applyOptions: function() {
        this.options = RzSliderOptions.getOptions(this.scope.rzSliderOptions);

        if (this.options.step <= 0)
          this.options.step = 1;

        this.range = this.scope.rzSliderModel !== undefined && this.scope.rzSliderHigh !== undefined;
        this.options.draggableRange = this.range && this.options.draggableRange;
        this.options.draggableRangeOnly = this.range && this.options.draggableRangeOnly;
        if (this.options.draggableRangeOnly) {
          this.options.draggableRange = true;
        }

        this.options.showTicks = this.options.showTicks || this.options.showTicksValues;
        this.scope.showTicks = this.options.showTicks; //scope is used in the template

        if (this.options.stepsArray) {
          this.options.floor = 0;
          this.options.ceil = this.options.stepsArray.length - 1;
          this.options.step = 1;
          this.customTrFn = function(value) {
            return this.options.stepsArray[value];
          };
        } else if (this.options.translate)
          this.customTrFn = this.options.translate;
        else
          this.customTrFn = function(value) {
            return String(value);
          };

        if (this.options.vertical) {
          this.positionProperty = 'bottom';
          this.dimensionProperty = 'height';
        }
      },

      /**
       * Resets slider
       *
       * @returns {undefined}
       */
      resetSlider: function() {
        this.manageElementsStyle();
        this.setMinAndMax();
        this.updateCeilLab();
        this.updateFloorLab();
        this.unbindEvents();
        this.manageEventsBindings();
        this.setDisabledState();
        this.calcViewDimensions();
      },

      /**
       * Set the slider children to variables for easy access
       *
       * Run only once during initialization
       *
       * @returns {undefined}
       */
      initElemHandles: function() {
        // Assign all slider elements to object properties for easy access
        angular.forEach(this.sliderElem.children(), function(elem, index) {
          var jElem = angular.element(elem);

          switch (index) {
            case 0:
              this.fullBar = jElem;
              break;
            case 1:
              this.selBar = jElem;
              this.selBarChild = this.selBar.children('rz-selection');
              break;
            case 2:
              this.minH = jElem;
              break;
            case 3:
              this.maxH = jElem;
              break;
            case 4:
              this.flrLab = jElem;
              break;
            case 5:
              this.ceilLab = jElem;
              break;
            case 6:
              this.minLab = jElem;
              break;
            case 7:
              this.maxLab = jElem;
              break;
            case 8:
              this.cmbLab = jElem;
              break;
            case 9:
              this.ticks = jElem;
              break;
          }

        }, this);

        // Initialize offset cache properties
        this.selBar.rzsp = 0;
        this.minH.rzsp = 0;
        this.maxH.rzsp = 0;
        this.flrLab.rzsp = 0;
        this.ceilLab.rzsp = 0;
        this.minLab.rzsp = 0;
        this.maxLab.rzsp = 0;
        this.cmbLab.rzsp = 0;
      },

      /**
       * Update each elements style based on options
       */
      manageElementsStyle: function() {

        if (!this.range)
          this.maxH.css('display', 'none');
        else
          this.maxH.css('display', null);

        this.alwaysHide(this.flrLab, this.options.showTicksValues || this.options.hideLimitLabels);
        this.alwaysHide(this.ceilLab, this.options.showTicksValues || this.options.hideLimitLabels);
        this.alwaysHide(this.minLab, this.options.showTicksValues);
        this.alwaysHide(this.maxLab, this.options.showTicksValues || !this.range);
        this.alwaysHide(this.cmbLab, this.options.showTicksValues || !this.range);
        this.alwaysHide(this.selBar, !this.range && !this.options.showSelectionBar);

        if (this.options.vertical)
          this.sliderElem.addClass('vertical');

        if (this.options.draggableRange)
          this.selBar.addClass('rz-draggable');
        else
          this.selBar.removeClass('rz-draggable');
      },

      alwaysHide: function(el, hide) {
        el.rzAlwaysHide = hide;
        if (hide)
          this.hideEl(el);
        else
          this.showEl(el)
      },

      /**
       * Manage the events bindings based on readOnly and disabled options
       *
       * @returns {undefined}
       */
      manageEventsBindings: function() {
        if (this.options.disabled || this.options.readOnly)
          this.unbindEvents();
        else if (!this.options.disabled || !this.options.readOnly)
          this.bindEvents();
      },

      /**
       * Set the disabled state based on rzSliderDisabled
       *
       * @returns {undefined}
       */
      setDisabledState: function() {
        if (this.options.disabled) {
          this.sliderElem.attr('disabled', 'disabled');
        } else {
          this.sliderElem.attr('disabled', null);
        }
      },

      /**
       * Reset label values
       *
       * @return {undefined}
       */
      resetLabelsValue: function() {
        this.minLab.rzsv = undefined;
        this.maxLab.rzsv = undefined;
      },

      /**
       * Initialize slider handles positions and labels
       *
       * Run only once during initialization and every time view port changes size
       *
       * @returns {undefined}
       */
      initHandles: function() {
        this.updateLowHandle(this.valueToOffset(this.scope.rzSliderModel));

        /*
         the order here is important since the selection bar should be
         updated after the high handle but before the combined label
         */
        if (this.range)
          this.updateHighHandle(this.valueToOffset(this.scope.rzSliderHigh));
        this.updateSelectionBar();
        if (this.range)
          this.updateCmbLabel();

        this.updateTicksScale();
      },

      /**
       * Translate value to human readable format
       *
       * @param {number|string} value
       * @param {jqLite} label
       * @param {boolean} [useCustomTr]
       * @returns {undefined}
       */
      translateFn: function(value, label, useCustomTr) {
        useCustomTr = useCustomTr === undefined ? true : useCustomTr;

        var valStr = String((useCustomTr ? this.customTrFn(value, this.options.id) : value)),
          getDimension = false;

        if (label.rzsv === undefined || label.rzsv.length !== valStr.length || (label.rzsv.length > 0 && label.rzsd === 0)) {
          getDimension = true;
          label.rzsv = valStr;
        }

        label.text(valStr);

        // Update width only when length of the label have changed
        if (getDimension) {
          this.getDimension(label);
        }
      },

      /**
       * Set maximum and minimum values for the slider and ensure the model and high
       * value match these limits
       * @returns {undefined}
       */
      setMinAndMax: function() {

        this.step = +this.options.step;
        this.precision = +this.options.precision;

        this.scope.rzSliderModel = this.roundStep(this.scope.rzSliderModel);
        if (this.range)
          this.scope.rzSliderHigh = this.roundStep(this.scope.rzSliderHigh);

        this.minValue = this.roundStep(+this.options.floor);

        if (this.options.ceil != null)
          this.maxValue = this.roundStep(+this.options.ceil);
        else
          this.maxValue = this.options.ceil = this.range ? this.scope.rzSliderHigh : this.scope.rzSliderModel;

        this.valueRange = this.maxValue - this.minValue;
      },

      /**
       * Adds accessibility attributes
       *
       * Run only once during initialization
       *
       * @returns {undefined}
       */
      addAccessibility: function() {
        this.minH.attr('role', 'slider');
        this.updateAriaAttributes();
        if (this.options.keyboardSupport)
          this.minH.attr('tabindex', '0');
        if (this.options.vertical)
          this.minH.attr('aria-orientation', 'vertical');

        if (this.range) {
          this.maxH.attr('role', 'slider');
          if (this.options.keyboardSupport)
            this.maxH.attr('tabindex', '0');
          if (this.options.vertical)
            this.maxH.attr('aria-orientation', 'vertical');
        }
      },

      /**
       * Updates aria attributes according to current values
       */
      updateAriaAttributes: function() {
        this.minH.attr({
          'aria-valuenow': this.scope.rzSliderModel,
          'aria-valuetext': this.customTrFn(this.scope.rzSliderModel),
          'aria-valuemin': this.minValue,
          'aria-valuemax': this.maxValue
        });
        if (this.range) {
          this.maxH.attr({
            'aria-valuenow': this.scope.rzSliderHigh,
            'aria-valuetext': this.customTrFn(this.scope.rzSliderHigh),
            'aria-valuemin': this.minValue,
            'aria-valuemax': this.maxValue
          });
        }
      },

      /**
       * Calculate dimensions that are dependent on view port size
       *
       * Run once during initialization and every time view port changes size.
       *
       * @returns {undefined}
       */
      calcViewDimensions: function() {
        var handleWidth = this.getDimension(this.minH);

        this.handleHalfDim = handleWidth / 2;
        this.barDimension = this.getDimension(this.fullBar);

        this.maxPos = this.barDimension - handleWidth;

        this.getDimension(this.sliderElem);
        this.sliderElem.rzsp = this.sliderElem[0].getBoundingClientRect()[this.positionProperty];

        if (this.initHasRun) {
          this.updateFloorLab();
          this.updateCeilLab();
          this.initHandles();
        }
      },

      /**
       * Update the ticks position
       *
       * @returns {undefined}
       */
      updateTicksScale: function() {
        if (!this.options.showTicks) return;
        if (!this.step) return; //if step is 0, we'll get a zero division

        var positions = '',
          ticksCount = Math.round((this.maxValue - this.minValue) / this.step) + 1;
        this.scope.ticks = [];
        for (var i = 0; i < ticksCount; i++) {
          var value = this.roundStep(this.minValue + i * this.step);
          var tick =   {
            selected: this.isTickSelected(value)
          };
          if (tick.selected && this.options.getSelectionBarColor) {
            tick.style = {
              'background-color': this.getSelectionBarColor()
            };
          }
          if (this.options.showTicksValues) {
            tick.value = this.getDisplayValue(value);
            if (this.options.ticksValuesTooltip) {
              tick.tooltip = this.options.ticksValuesTooltip(value);
              tick.tooltipPlacement = this.options.vertical ? 'right' : 'top';
            }
          }
          this.scope.ticks.push(tick);
        }
      },

      isTickSelected: function(value) {
        if (!this.range && this.options.showSelectionBar && value <= this.scope.rzSliderModel)
          return true;
        if (this.range && value >= this.scope.rzSliderModel && value <= this.scope.rzSliderHigh)
          return true;
        return false;
      },

      /**
       * Update position of the ceiling label
       *
       * @returns {undefined}
       */
      updateCeilLab: function() {
        this.translateFn(this.maxValue, this.ceilLab);
        this.setPosition(this.ceilLab, this.barDimension - this.ceilLab.rzsd);
        this.getDimension(this.ceilLab);
      },

      /**
       * Update position of the floor label
       *
       * @returns {undefined}
       */
      updateFloorLab: function() {
        this.translateFn(this.minValue, this.flrLab);
        this.getDimension(this.flrLab);
      },

      /**
       * Call the onStart callback if defined
       *
       * @returns {undefined}
       */
      callOnStart: function() {
        if (this.options.onStart) {
          var self = this;
          $timeout(function() {
            self.options.onStart(self.options.id);
          });
        }
      },

      /**
       * Call the onChange callback if defined
       *
       * @returns {undefined}
       */
      callOnChange: function() {
        if (this.options.onChange) {
          var self = this;
          $timeout(function() {
            self.options.onChange(self.options.id);
          });
        }
      },

      /**
       * Call the onEnd callback if defined
       *
       * @returns {undefined}
       */
      callOnEnd: function() {
        if (this.options.onEnd) {
          var self = this;
          $timeout(function() {
            self.options.onEnd(self.options.id);
          });
        }
      },

      /**
       * Update slider handles and label positions
       *
       * @param {string} which
       * @param {number} newOffset
       */
      updateHandles: function(which, newOffset) {
        if (which === 'rzSliderModel') {
          this.updateLowHandle(newOffset);
          this.updateSelectionBar();
          this.updateTicksScale();

          if (this.range) {
            this.updateCmbLabel();
          }
          return;
        }

        if (which === 'rzSliderHigh') {
          this.updateHighHandle(newOffset);
          this.updateSelectionBar();
          this.updateTicksScale();

          if (this.range) {
            this.updateCmbLabel();
          }
          return;
        }

        // Update both
        this.updateLowHandle(newOffset);
        this.updateHighHandle(newOffset);
        this.updateSelectionBar();
        this.updateTicksScale();
        this.updateCmbLabel();
      },

      /**
       * Update low slider handle position and label
       *
       * @param {number} newOffset
       * @returns {undefined}
       */
      updateLowHandle: function(newOffset) {
        this.setPosition(this.minH, newOffset);
        this.translateFn(this.scope.rzSliderModel, this.minLab);
        var pos = Math.min(Math.max(newOffset - this.minLab.rzsd / 2 + this.handleHalfDim, 0), this.barDimension - this.ceilLab.rzsd);
        this.setPosition(this.minLab, pos);

        this.shFloorCeil();
      },

      /**
       * Update high slider handle position and label
       *
       * @param {number} newOffset
       * @returns {undefined}
       */
      updateHighHandle: function(newOffset) {
        this.setPosition(this.maxH, newOffset);
        this.translateFn(this.scope.rzSliderHigh, this.maxLab);
        var pos = Math.min((newOffset - this.maxLab.rzsd / 2 + this.handleHalfDim), (this.barDimension - this.ceilLab.rzsd));
        this.setPosition(this.maxLab, pos);

        this.shFloorCeil();
      },

      /**
       * Show / hide floor / ceiling label
       *
       * @returns {undefined}
       */
      shFloorCeil: function() {
        var flHidden = false,
          clHidden = false;

        if (this.minLab.rzsp <= this.flrLab.rzsp + this.flrLab.rzsd + 5) {
          flHidden = true;
          this.hideEl(this.flrLab);
        } else {
          flHidden = false;
          this.showEl(this.flrLab);
        }

        if (this.minLab.rzsp + this.minLab.rzsd >= this.ceilLab.rzsp - this.handleHalfDim - 10) {
          clHidden = true;
          this.hideEl(this.ceilLab);
        } else {
          clHidden = false;
          this.showEl(this.ceilLab);
        }

        if (this.range) {
          if (this.maxLab.rzsp + this.maxLab.rzsd >= this.ceilLab.rzsp - 10) {
            this.hideEl(this.ceilLab);
          } else if (!clHidden) {
            this.showEl(this.ceilLab);
          }

          // Hide or show floor label
          if (this.maxLab.rzsp <= this.flrLab.rzsp + this.flrLab.rzsd + this.handleHalfDim) {
            this.hideEl(this.flrLab);
          } else if (!flHidden) {
            this.showEl(this.flrLab);
          }
        }
      },

      /**
       * Update slider selection bar, combined label and range label
       *
       * @returns {undefined}
       */
      updateSelectionBar: function() {
        this.setDimension(this.selBar, Math.abs(this.maxH.rzsp - this.minH.rzsp) + this.handleHalfDim);
        this.setPosition(this.selBar, this.range ? this.minH.rzsp + this.handleHalfDim : 0);
        if (this.options.getSelectionBarColor) {
          var color = this.getSelectionBarColor();
          this.scope.barStyle = {
            backgroundColor: color
          };
        }
      },

      /**
       * Wrapper around the getSelectionBarColor of the user to pass to
       * correct parameters
       */
      getSelectionBarColor: function() {
        if (this.range)
          return this.options.getSelectionBarColor(this.scope.rzSliderModel, this.scope.rzSliderHigh);
        return this.options.getSelectionBarColor(this.scope.rzSliderModel);
      },

      /**
       * Update combined label position and value
       *
       * @returns {undefined}
       */
      updateCmbLabel: function() {
        var lowTr, highTr;

        if (this.minLab.rzsp + this.minLab.rzsd + 10 >= this.maxLab.rzsp) {
          lowTr = this.getDisplayValue(this.scope.rzSliderModel);
          highTr = this.getDisplayValue(this.scope.rzSliderHigh);

          this.translateFn(lowTr + ' - ' + highTr, this.cmbLab, false);
          var pos = Math.min(Math.max((this.selBar.rzsp + this.selBar.rzsd / 2 - this.cmbLab.rzsd / 2), 0), (this.barDimension - this.cmbLab.rzsd));
          this.setPosition(this.cmbLab, pos);
          this.hideEl(this.minLab);
          this.hideEl(this.maxLab);
          this.showEl(this.cmbLab);
        } else {
          this.showEl(this.maxLab);
          this.showEl(this.minLab);
          this.hideEl(this.cmbLab);
        }
      },

      /**
       * Return the translated value if a translate function is provided else the original value
       * @param value
       * @returns {*}
       */
      getDisplayValue: function(value) {
        return this.customTrFn(value, this.options.id);
      },

      /**
       * Round value to step and precision
       *
       * @param {number} value
       * @returns {number}
       */
      roundStep: function(value) {
        var steppedValue = Math.round(value / this.step) * this.step;
        steppedValue = steppedValue.toFixed(this.precision);
        return +steppedValue;
      },

      /**
       * Hide element
       *
       * @param element
       * @returns {jqLite} The jqLite wrapped DOM element
       */
      hideEl: function(element) {
        return element.css({
          opacity: 0
        });
      },

      /**
       * Show element
       *
       * @param element The jqLite wrapped DOM element
       * @returns {jqLite} The jqLite
       */
      showEl: function(element) {
        if (!!element.rzAlwaysHide) {
          return element;
        }

        return element.css({
          opacity: 1
        });
      },

      /**
       * Set element left/top offset depending on whether slider is horizontal or vertical
       *
       * @param {jqLite} elem The jqLite wrapped DOM element
       * @param {number} pos
       * @returns {number}
       */
      setPosition: function(elem, pos) {
        elem.rzsp = pos;
        var css = {};
        css[this.positionProperty] = pos + 'px';
        elem.css(css);
        return pos;
      },

      /**
       * Get element width/height depending on whether slider is horizontal or vertical
       *
       * @param {jqLite} elem The jqLite wrapped DOM element
       * @returns {number}
       */
      getDimension: function(elem) {
        var val = elem[0].getBoundingClientRect();
        if (this.options.vertical)
          elem.rzsd = (val.bottom - val.top) * this.options.scale;
        else
          elem.rzsd = (val.right - val.left) * this.options.scale;
        return elem.rzsd;
      },

      /**
       * Set element width/height depending on whether slider is horizontal or vertical
       *
       * @param {jqLite} elem  The jqLite wrapped DOM element
       * @param {number} dim
       * @returns {number}
       */
      setDimension: function(elem, dim) {
        elem.rzsd = dim;
        var css = {};
        css[this.dimensionProperty] = dim + 'px';
        elem.css(css);
        return dim;
      },

      /**
       * Translate value to pixel offset
       *
       * @param {number} val
       * @returns {number}
       */
      valueToOffset: function(val) {
        return (this.sanitizeValue(val) - this.minValue) * this.maxPos / this.valueRange || 0;
      },

      /**
       * Returns a value that is within slider range
       *
       * @param {number} val
       * @returns {number}
       */
      sanitizeValue: function(val) {
        return Math.min(Math.max(val, this.minValue), this.maxValue);
      },

      /**
       * Translate offset to model value
       *
       * @param {number} offset
       * @returns {number}
       */
      offsetToValue: function(offset) {
        return (offset / this.maxPos) * this.valueRange + this.minValue;
      },

      // Events

      /**
       * Get the X-coordinate or Y-coordinate of an event
       *
       * @param {Object} event  The event
       * @returns {number}
       */
      getEventXY: function(event) {
        /* http://stackoverflow.com/a/12336075/282882 */
        //noinspection JSLint
        var clientXY = this.options.vertical ? 'clientY' : 'clientX';
        if (clientXY in event) {
          return event[clientXY];
        }

        return event.originalEvent === undefined ?
          event.touches[0][clientXY] : event.originalEvent.touches[0][clientXY];
      },

      /**
       * Compute the event position depending on whether the slider is horizontal or vertical
       * @param event
       * @returns {number}
       */
      getEventPosition: function(event) {
        var sliderPos = this.sliderElem.rzsp,
          eventPos = 0;
        if (this.options.vertical)
          eventPos = -this.getEventXY(event) + sliderPos;
        else
          eventPos = this.getEventXY(event) - sliderPos;
        return (eventPos - this.handleHalfDim) * this.options.scale;
      },

      /**
       * Get the handle closest to an event.
       *
       * @param event {Event} The event
       * @returns {jqLite} The handle closest to the event.
       */
      getNearestHandle: function(event) {
        if (!this.range) {
          return this.minH;
        }
        var offset = this.getEventPosition(event);
        return Math.abs(offset - this.minH.rzsp) < Math.abs(offset - this.maxH.rzsp) ? this.minH : this.maxH;
      },

      /**
       * Wrapper function to focus an angular element
       *
       * @param el {AngularElement} the element to focus
       */
      focusElement: function(el) {
        var DOM_ELEMENT = 0;
        el[DOM_ELEMENT].focus();
      },

      /**
       * Bind mouse and touch events to slider handles
       *
       * @returns {undefined}
       */
      bindEvents: function() {
        if (this.options.readOnly || this.options.disabled) return;
        var barTracking, barStart, barMove;

        if (this.options.draggableRange) {
          barTracking = 'rzSliderDrag';
          barStart = this.onDragStart;
          barMove = this.onDragMove;
        } else {
          barTracking = 'rzSliderModel';
          barStart = this.onStart;
          barMove = this.onMove;
        }

        this.selBar.on('mousedown', angular.bind(this, barStart, null, barTracking));
        this.selBar.on('mousedown', angular.bind(this, barMove, this.selBar));

        if (this.options.draggableRangeOnly) {
          this.minH.on('mousedown', angular.bind(this, barStart, null, barTracking));
          if (this.range) {
            this.maxH.on('mousedown', angular.bind(this, barStart, null, barTracking));
          }
        } else {
          this.minH.on('mousedown', angular.bind(this, this.onStart, this.minH, 'rzSliderModel'));
          if (this.range) {
            this.maxH.on('mousedown', angular.bind(this, this.onStart, this.maxH, 'rzSliderHigh'));
          }
          this.fullBar.on('mousedown', angular.bind(this, this.onStart, null, null));
          this.fullBar.on('mousedown', angular.bind(this, this.onMove, this.fullBar));
          this.ticks.on('mousedown', angular.bind(this, this.onStart, null, null));
          this.ticks.on('mousedown', angular.bind(this, this.onMove, this.ticks));
        }

        this.selBar.on('touchstart', angular.bind(this, barStart, null, barTracking));
        this.selBar.on('touchstart', angular.bind(this, barMove, this.selBar));
        if (this.options.draggableRangeOnly) {
          this.minH.on('touchstart', angular.bind(this, barStart, null, barTracking));
          if (this.range) {
            this.maxH.on('touchstart', angular.bind(this, barStart, null, barTracking));
          }
        } else {
          this.minH.on('touchstart', angular.bind(this, this.onStart, this.minH, 'rzSliderModel'));
          if (this.range) {
            this.maxH.on('touchstart', angular.bind(this, this.onStart, this.maxH, 'rzSliderHigh'));
          }
          this.fullBar.on('touchstart', angular.bind(this, this.onStart, null, null));
          this.fullBar.on('touchstart', angular.bind(this, this.onMove, this.fullBar));
          this.ticks.on('touchstart', angular.bind(this, this.onStart, null, null));
          this.ticks.on('touchstart', angular.bind(this, this.onMove, this.ticks));
        }

        if (this.options.keyboardSupport) {
          this.minH.on('focus', angular.bind(this, this.onPointerFocus, this.minH, 'rzSliderModel'));
          if (this.range) {
            this.maxH.on('focus', angular.bind(this, this.onPointerFocus, this.maxH, 'rzSliderHigh'));
          }
        }
      },

      /**
       * Unbind mouse and touch events to slider handles
       *
       * @returns {undefined}
       */
      unbindEvents: function() {
        this.minH.off();
        this.maxH.off();
        this.fullBar.off();
        this.selBar.off();
        this.ticks.off();
      },

      /**
       * onStart event handler
       *
       * @param {?Object} pointer The jqLite wrapped DOM element; if null, the closest handle is used
       * @param {?string} ref     The name of the handle being changed; if null, the closest handle's value is modified
       * @param {Event}   event   The event
       * @returns {undefined}
       */
      onStart: function(pointer, ref, event) {
        var ehMove, ehEnd,
          eventNames = this.getEventNames(event);

        event.stopPropagation();
        event.preventDefault();

        // We have to do this in case the HTML where the sliders are on
        // have been animated into view.
        this.calcViewDimensions();

        if (pointer) {
          this.tracking = ref;
        } else {
          pointer = this.getNearestHandle(event);
          this.tracking = pointer === this.minH ? 'rzSliderModel' : 'rzSliderHigh';
        }

        pointer.addClass('rz-active');

        if (this.options.keyboardSupport)
          this.focusElement(pointer);

        ehMove = angular.bind(this, this.dragging.active ? this.onDragMove : this.onMove, pointer);
        ehEnd = angular.bind(this, this.onEnd, ehMove);

        $document.on(eventNames.moveEvent, ehMove);
        $document.one(eventNames.endEvent, ehEnd);
        this.callOnStart();
      },

      /**
       * onMove event handler
       *
       * @param {jqLite} pointer
       * @param {Event}  event The event
       * @returns {undefined}
       */
      onMove: function(pointer, event) {
        var newOffset = this.getEventPosition(event),
          newValue;

        if (newOffset <= 0) {
          if (pointer.rzsp === 0)
            return;
          newValue = this.minValue;
          newOffset = 0;
        } else if (newOffset >= this.maxPos) {
          if (pointer.rzsp === this.maxPos)
            return;
          newValue = this.maxValue;
          newOffset = this.maxPos;
        } else {
          newValue = this.offsetToValue(newOffset);
          newValue = this.roundStep(newValue);
          newOffset = this.valueToOffset(newValue);
        }
        this.positionTrackingHandle(newValue, newOffset);
      },

      /**
       * onEnd event handler
       *
       * @param {Event}    event    The event
       * @param {Function} ehMove   The the bound move event handler
       * @returns {undefined}
       */
      onEnd: function(ehMove, event) {
        var moveEventName = this.getEventNames(event).moveEvent;

        if (!this.options.keyboardSupport) {
          this.minH.removeClass('rz-active');
          this.maxH.removeClass('rz-active');
          this.tracking = '';
        }
        this.dragging.active = false;

        $document.off(moveEventName, ehMove);
        this.scope.$emit('slideEnded');
        this.callOnEnd();
      },

      onPointerFocus: function(pointer, ref) {
        this.tracking = ref;
        pointer.one('blur', angular.bind(this, this.onPointerBlur, pointer));
        pointer.on('keydown', angular.bind(this, this.onKeyboardEvent));
        pointer.addClass('rz-active');
      },

      onPointerBlur: function(pointer) {
        pointer.off('keydown');
        this.tracking = '';
        pointer.removeClass('rz-active');
      },

      onKeyboardEvent: function(event) {
        var currentValue = this.scope[this.tracking],
          keyCode = event.keyCode || event.which,
          keys = {
            38: 'UP',
            40: 'DOWN',
            37: 'LEFT',
            39: 'RIGHT',
            33: 'PAGEUP',
            34: 'PAGEDOWN',
            36: 'HOME',
            35: 'END'
          },
          actions = {
            UP: currentValue + this.step,
            DOWN: currentValue - this.step,
            LEFT: currentValue - this.step,
            RIGHT: currentValue + this.step,
            PAGEUP: currentValue + this.valueRange / 10,
            PAGEDOWN: currentValue - this.valueRange / 10,
            HOME: this.minValue,
            END: this.maxValue
          },
          key = keys[keyCode],
          action = actions[key];
        if (action == null || this.tracking === '') return;
        event.preventDefault();

        var newValue = this.roundStep(this.sanitizeValue(action)),
          newOffset = this.valueToOffset(newValue);
        if (!this.options.draggableRangeOnly) {
          this.positionTrackingHandle(newValue, newOffset);
        } else {
          var difference = this.scope.rzSliderHigh - this.scope.rzSliderModel,
            newMinOffset, newMaxOffset,
            newMinValue, newMaxValue;
          if (this.tracking === 'rzSliderModel') {
            newMinValue = newValue;
            newMinOffset = newOffset;
            newMaxValue = newValue + difference;
            if (newMaxValue > this.maxValue) return;
            newMaxOffset = this.valueToOffset(newMaxValue);
          } else {
            newMaxValue = newValue;
            newMaxOffset = newOffset;
            newMinValue = newValue - difference;
            if (newMinValue < this.minValue) return;
            newMinOffset = this.valueToOffset(newMinValue);
          }
          this.positionTrackingBar(newMinValue, newMaxValue, newMinOffset, newMaxOffset);
        }
      },

      /**
       * onDragStart event handler
       *
       * Handles dragging of the middle bar.
       *
       * @param {Object} pointer The jqLite wrapped DOM element
       * @param {string} ref     One of the refLow, refHigh values
       * @param {Event}  event   The event
       * @returns {undefined}
       */
      onDragStart: function(pointer, ref, event) {
        var offset = this.getEventPosition(event);
        this.dragging = {
          active: true,
          value: this.offsetToValue(offset),
          difference: this.scope.rzSliderHigh - this.scope.rzSliderModel,
          offset: offset,
          lowDist: offset - this.minH.rzsp,
          highDist: this.maxH.rzsp - offset
        };

        this.onStart(pointer, ref, event);
      },

      /**
       * onDragMove event handler
       *
       * Handles dragging of the middle bar.
       *
       * @param {jqLite} pointer
       * @param {Event}  event The event
       * @returns {undefined}
       */
      onDragMove: function(pointer, event) {
        var newOffset = this.getEventPosition(event),
          newMinOffset, newMaxOffset,
          newMinValue, newMaxValue;

        if (newOffset <= this.dragging.lowDist) {
          if (pointer.rzsp === this.dragging.lowDist) {
            return;
          }
          newMinValue = this.minValue;
          newMinOffset = 0;
          newMaxValue = this.minValue + this.dragging.difference;
          newMaxOffset = this.valueToOffset(newMaxValue);
        } else if (newOffset >= this.maxPos - this.dragging.highDist) {
          if (pointer.rzsp === this.dragging.highDist) {
            return;
          }
          newMaxValue = this.maxValue;
          newMaxOffset = this.maxPos;
          newMinValue = this.maxValue - this.dragging.difference;
          newMinOffset = this.valueToOffset(newMinValue);
        } else {
          newMinValue = this.offsetToValue(newOffset - this.dragging.lowDist);
          newMinValue = this.roundStep(newMinValue);
          newMinOffset = this.valueToOffset(newMinValue);
          newMaxValue = newMinValue + this.dragging.difference;
          newMaxOffset = this.valueToOffset(newMaxValue);
        }

        this.positionTrackingBar(newMinValue, newMaxValue, newMinOffset, newMaxOffset);
      },

      /**
       * Set the new value and offset for the entire bar
       *
       * @param {number} newMinValue   the new minimum value
       * @param {number} newMaxValue   the new maximum value
       * @param {number} newMinOffset  the new minimum offset
       * @param {number} newMaxOffset  the new maximum offset
       */
      positionTrackingBar: function(newMinValue, newMaxValue, newMinOffset, newMaxOffset) {
        this.scope.rzSliderModel = newMinValue;
        this.scope.rzSliderHigh = newMaxValue;
        this.updateHandles('rzSliderModel', newMinOffset);
        this.updateHandles('rzSliderHigh', newMaxOffset);
        this.scope.$apply();
        this.callOnChange();
      },

      /**
       * Set the new value and offset to the current tracking handle
       *
       * @param {number} newValue new model value
       * @param {number} newOffset new offset value
       */
      positionTrackingHandle: function(newValue, newOffset) {
        var valueChanged = false;
        var switched = false;

        if (this.range) {
          /* This is to check if we need to switch the min and max handles*/
          if (this.tracking === 'rzSliderModel' && newValue >= this.scope.rzSliderHigh) {
            switched = true;
            this.scope[this.tracking] = this.scope.rzSliderHigh;
            this.updateHandles(this.tracking, this.maxH.rzsp);
            this.updateAriaAttributes();
            this.tracking = 'rzSliderHigh';
            this.minH.removeClass('rz-active');
            this.maxH.addClass('rz-active');
            if (this.options.keyboardSupport)
              this.focusElement(this.maxH);
            valueChanged = true;
          } else if (this.tracking === 'rzSliderHigh' && newValue <= this.scope.rzSliderModel) {
            switched = true;
            this.scope[this.tracking] = this.scope.rzSliderModel;
            this.updateHandles(this.tracking, this.minH.rzsp);
            this.updateAriaAttributes();
            this.tracking = 'rzSliderModel';
            this.maxH.removeClass('rz-active');
            this.minH.addClass('rz-active');
            if (this.options.keyboardSupport)
              this.focusElement(this.minH);
            valueChanged = true;
          }
        }

        if (this.scope[this.tracking] !== newValue) {
          this.scope[this.tracking] = newValue;
          this.updateHandles(this.tracking, newOffset);
          this.updateAriaAttributes();
          valueChanged = true;
        }

        if (valueChanged) {
          this.scope.$apply();
          this.callOnChange();
        }
        return switched;
      },

      /**
       * Get event names for move and event end
       *
       * @param {Event}    event    The event
       *
       * @return {{moveEvent: string, endEvent: string}}
       */
      getEventNames: function(event) {
        var eventNames = {
          moveEvent: '',
          endEvent: ''
        };

        if (event.touches || (event.originalEvent !== undefined && event.originalEvent.touches)) {
          eventNames.moveEvent = 'touchmove';
          eventNames.endEvent = 'touchend';
        } else {
          eventNames.moveEvent = 'mousemove';
          eventNames.endEvent = 'mouseup';
        }

        return eventNames;
      }
    };

    return Slider;
  }])

  .directive('rzslider', ['RzSlider', function(RzSlider) {
    'use strict';

    return {
      restrict: 'E',
      scope: {
        rzSliderModel: '=?',
        rzSliderHigh: '=?',
        rzSliderOptions: '=?',
        rzSliderTplUrl: '@'
      },

      /**
       * Return template URL
       *
       * @param {jqLite} elem
       * @param {Object} attrs
       * @return {string}
       */
      templateUrl: function(elem, attrs) {
        //noinspection JSUnresolvedVariable
        return attrs.rzSliderTplUrl || 'rzSliderTpl.html';
      },

      link: function(scope, elem) {
        return new RzSlider(scope, elem);
      }
    };
  }]);

  // IDE assist

  /**
   * @name ngScope
   *
   * @property {number} rzSliderModel
   * @property {number} rzSliderHigh
   * @property {Object} rzSliderOptions
   */

  /**
   * @name jqLite
   *
   * @property {number|undefined} rzsp rzslider label position offset
   * @property {number|undefined} rzsd rzslider element dimension
   * @property {string|undefined} rzsv rzslider label value/text
   * @property {Function} css
   * @property {Function} text
   */

  /**
   * @name Event
   * @property {Array} touches
   * @property {Event} originalEvent
   */

  /**
   * @name ThrottleOptions
   *
   * @property {boolean} leading
   * @property {boolean} trailing
   */

  module.run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('rzSliderTpl.html',
    "<span class=rz-bar-wrapper><span class=rz-bar></span></span> <span class=rz-bar-wrapper><span class=\"rz-bar rz-selection\" ng-style=barStyle></span></span> <span class=rz-pointer></span> <span class=rz-pointer></span> <span class=\"rz-bubble rz-limit\"></span> <span class=\"rz-bubble rz-limit\"></span> <span class=rz-bubble></span> <span class=rz-bubble></span> <span class=rz-bubble></span><ul ng-show=showTicks class=rz-ticks><li ng-repeat=\"t in ticks track by $index\" class=tick ng-class=\"{selected: t.selected}\" ng-style=t.style><span ng-if=\"t.value != null && t.tooltip == null\" class=tick-value>{{ t.value }}</span> <span ng-if=\"t.value != null && t.tooltip != null\" class=tick-value uib-tooltip=\"{{ t.tooltip }}\" tooltip-placement={{t.tooltipPlacement}}>{{ t.value }}</span></li></ul>"
  );

}]);

  return module
}));
