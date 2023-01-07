"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*!
 * jQuery SmartWizard v5.0.0
 * The awesome jQuery step wizard plugin
 * http://www.techlaboratory.net/jquery-smartwizard
 *
 * Created by Dipu Raj
 * http://dipu.me
 *
 * @license Licensed under the terms of the MIT License
 * https://github.com/techlab/jquery-smartwizard/blob/master/LICENSE
 */
;

(function ($, window, document, undefined) {
  "use strict"; // Default options

  var defaults = {
    selected: 0,
    // Initial selected step, 0 = first step
    theme: 'default',
    // theme for the wizard, related css need to include for other than default theme
    justified: true,
    // Nav menu justification. true/false
    autoAdjustHeight: true,
    // Automatically adjust content height
    cycleSteps: false,
    // Allows to cycle the navigation of steps
    backButtonSupport: true,
    // Enable the back button support
    enableURLhash: true,
    // Enable selection of the step based on url hash
    transition: {
      animation: 'none',
      // Effect on navigation, none/fade/slide-horizontal/slide-vertical/slide-swing
      speed: '400',
      // Transion animation speed
      easing: '' // Transition animation easing. Not supported without a jQuery easing plugin

    },
    toolbarSettings: {
      toolbarPosition: 'bottom',
      // none, top, bottom, both
      toolbarButtonPosition: 'right',
      // left, right, center
      showNextButton: true,
      // show/hide a Next button
      showPreviousButton: true,
      // show/hide a Previous button
      toolbarExtraButtons: [] // Extra buttons to show on toolbar, array of jQuery input/buttons elements

    },
    anchorSettings: {
      anchorClickable: true,
      // Enable/Disable anchor navigation
      enableAllAnchors: false,
      // Activates all anchors clickable all times
      markDoneStep: true,
      // Add done state on navigation
      markAllPreviousStepsAsDone: true,
      // When a step selected by url hash, all previous steps are marked done
      removeDoneStepOnNavigateBack: false,
      // While navigate back done step after active step will be cleared
      enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation

    },
    keyboardSettings: {
      keyNavigation: true,
      // Enable/Disable keyboard navigation(left and right keys are used if enabled)
      keyLeft: [37],
      // Left key code
      keyRight: [39] // Right key code

    },
    lang: {
      // Language variables for button
      next: 'Next',
      previous: 'Previous'
    },
    disabledSteps: [],
    // Array Steps disabled
    errorSteps: [],
    // Highlight step with errors
    hiddenSteps: [] // Hidden steps

  };

  var SmartWizard =
  /*#__PURE__*/
  function () {
    function SmartWizard(element, options) {
      _classCallCheck(this, SmartWizard);

      // Merge user settings with default
      this.options = $.extend(true, {}, defaults, options); // Main container element

      this.main = $(element); // Navigation bar element

      this.nav = this._getFirstDescendant('.nav'); // Step anchor elements

      this.steps = this.nav.find('.nav-link'); // Content container

      this.container = this._getFirstDescendant('.tab-content'); // Content pages

      this.pages = this.container.children('.tab-pane'); // Assign options

      this._initOptions(); // Initial load


      this._initLoad();
    } // Initial Load Method


    _createClass(SmartWizard, [{
      key: "_initLoad",
      value: function _initLoad() {
        // Clean the elements
        this.pages.hide();
        this.steps.removeClass('done active'); // Active step index

        this.current_index = null; // Get the initial step index

        var idx = this._getStepIndex(); // Mark any previous steps done


        this._setPreviousStepsDone(idx); // Show the initial step


        this._showStep(idx);
      } // Initialize options

    }, {
      key: "_initOptions",
      value: function _initOptions() {
        // Set the elements
        this._setElements(); // Add toolbar


        this._setToolbar(); // Assign plugin events


        this._setEvents();
      }
    }, {
      key: "_getFirstDescendant",
      value: function _getFirstDescendant(selector) {
        // Check for first level element
        var elm = this.main.children(selector);

        if (elm.length > 0) {
          return elm;
        } // Check for second level element


        this.main.children().each(function (i, n) {
          var tmp = $(n).children(selector);

          if (tmp.length > 0) {
            elm = tmp;
            return false;
          }
        });

        if (elm.length > 0) {
          return elm;
        } // Element not found


        this._showError("Element not found " + selector);

        return false;
      }
    }, {
      key: "_setElements",
      value: function _setElements() {
        // Set the main element
        this.main.addClass('sw');

        this._setTheme(this.options.theme);

        this._setJustify(this.options.justified); // Set the anchor default style


        if (this.options.anchorSettings.enableAllAnchors !== true || this.options.anchorSettings.anchorClickable !== true) {
          this.steps.addClass('inactive');
        } // Disabled steps


        this._setCSSClass(this.options.disabledSteps, "disabled"); // Error steps


        this._setCSSClass(this.options.errorSteps, "danger"); // Hidden steps


        this._setCSSClass(this.options.hiddenSteps, "hidden");
      }
    }, {
      key: "_setEvents",
      value: function _setEvents() {
        var _this = this;

        // Check if event handler already exists
        if (this.main.data('click-init')) {
          return true;
        } // Flag item to prevent attaching handler again


        this.main.data('click-init', true); // Anchor click event

        $(this.steps).on("click", function (e) {
          e.preventDefault();

          if (_this.options.anchorSettings.anchorClickable === false) {
            return true;
          } // Get the step index


          var idx = _this.steps.index(e.currentTarget);

          if (idx === _this.current_index) {
            return true;
          }

          if (_this.options.anchorSettings.enableAnchorOnDoneStep === false && _this._isDone(idx)) {
            return true;
          }

          if (_this.options.anchorSettings.enableAllAnchors !== false || _this._isDone(idx)) {
            _this._showStep(idx);
          }
        }); // Next button event

        this.main.find('.sw-btn-next').on("click", function (e) {
          e.preventDefault();

          _this._showNext();
        }); // Previous button event

        this.main.find('.sw-btn-prev').on("click", function (e) {
          e.preventDefault();

          _this._showPrevious();
        }); // Keyboard navigation event

        if (this.options.keyboardSettings.keyNavigation) {
          $(document).keyup(function (e) {
            _this._keyNav(e);
          });
        } // Back/forward browser button event


        if (this.options.backButtonSupport) {
          $(window).on('hashchange', function (e) {
            var idx = _this._getURLHashIndex();

            if (idx !== false) {
              e.preventDefault();

              _this._showStep(idx);
            }
          });
        }
      }
    }, {
      key: "_setToolbar",
      value: function _setToolbar() {
        // Skip right away if the toolbar is not enabled
        if (this.options.toolbarSettings.toolbarPosition === 'none') {
          return true;
        } // Append toolbar based on the position


        switch (this.options.toolbarSettings.toolbarPosition) {
          case 'top':
            this.container.before(this._createToolbar('top'));
            break;

          case 'bottom':
            this.container.after(this._createToolbar('bottom'));
            break;

          case 'both':
            this.container.before(this._createToolbar('top'));
            this.container.after(this._createToolbar('bottom'));
            break;

          default:
            this.container.after(this._createToolbar('bottom'));
            break;
        }
      }
    }, {
      key: "_createToolbar",
      value: function _createToolbar(position) {
        // Skip if the toolbar is already created
        if (this.main.find('.toolbar-' + position).length > 0) {
          return null;
        }

        var toolbar = $('<div></div>').addClass('toolbar toolbar-' + position).attr('role', 'toolbar'); // Create the toolbar buttons

        var btnNext = this.options.toolbarSettings.showNextButton !== false ? $('<button></button>').text(this.options.lang.next).addClass('btn sw-btn-next').attr('type', 'button') : null;
        var btnPrevious = this.options.toolbarSettings.showPreviousButton !== false ? $('<button></button>').text(this.options.lang.previous).addClass('btn sw-btn-prev').attr('type', 'button') : null;
        toolbar.append(btnPrevious, btnNext); // Add extra toolbar buttons

        if (this.options.toolbarSettings.toolbarExtraButtons && this.options.toolbarSettings.toolbarExtraButtons.length > 0) {
          $.each(this.options.toolbarSettings.toolbarExtraButtons, function (_i, n) {
            toolbar.append(n.clone(true));
          });
        }

        toolbar.css('text-align', this.options.toolbarSettings.toolbarButtonPosition);
        return toolbar;
      }
    }, {
      key: "_showNext",
      value: function _showNext() {
        var si = this._getNextShowable(this.current_index);

        if (si === false) {
          return false;
        }

        this._showStep(si);
      }
    }, {
      key: "_showPrevious",
      value: function _showPrevious() {
        var si = this._getPreviousShowable(this.current_index);

        if (si === false) {
          return false;
        }

        this._showStep(si);
      }
    }, {
      key: "_showStep",
      value: function _showStep(idx) {
        // If current step is requested again, skip
        if (idx == this.current_index) {
          return false;
        } // If step not found, skip


        if (!this.steps.eq(idx)) {
          return false;
        } // If it is a disabled step, skip


        if (!this._isShowable(idx)) {
          return false;
        } // Load step content


        this._loadStep(idx);
      }
    }, {
      key: "_getNextShowable",
      value: function _getNextShowable(idx) {
        var si = false; // Find the next showable step

        for (var i = idx + 1; i < this.steps.length; i++) {
          if (this._isShowable(i)) {
            si = i;
            break;
          }
        }

        if (si !== false && this.steps.length <= si) {
          if (!this.options.cycleSteps) {
            return false;
          }

          si = 0;
        }

        return si;
      }
    }, {
      key: "_getPreviousShowable",
      value: function _getPreviousShowable(idx) {
        var si = false; // Find the previous showable step

        for (var i = idx - 1; i >= 0; i--) {
          if (this._isShowable(i)) {
            si = i;
            break;
          }
        }

        if (si !== false && 0 > si) {
          if (!this.options.cycleSteps) {
            return false;
          }

          si = this.steps.length - 1;
        }

        return si;
      }
    }, {
      key: "_isShowable",
      value: function _isShowable(idx) {
        var elm = this.steps.eq(idx);

        if (elm.hasClass('disabled') || elm.hasClass('hidden')) {
          return false;
        }

        return true;
      }
    }, {
      key: "_isDone",
      value: function _isDone(idx) {
        var elm = this.steps.eq(idx);

        if (elm.hasClass('done')) {
          return true;
        }

        return false;
      }
    }, {
      key: "_setPreviousStepsDone",
      value: function _setPreviousStepsDone(idx) {
        if (idx > 0 && this.options.anchorSettings.markDoneStep && this.options.anchorSettings.markAllPreviousStepsAsDone) {
          // Mark previous steps of the active step as done
          for (var i = idx; i >= 0; i--) {
            this._setCSSClass(i, "done");
          }
        }
      }
    }, {
      key: "_setCSSClass",
      value: function _setCSSClass(idx, cls) {
        var _this2 = this;

        if (idx === null) {
          return false;
        }

        var idxs = $.isArray(idx) ? idx : [idx];
        idxs.map(function (i) {
          _this2.steps.eq(i).addClass(cls);
        });
      }
    }, {
      key: "_resetCSSClass",
      value: function _resetCSSClass(idx, cls) {
        var _this3 = this;

        var idxs = $.isArray(idx) ? idx : [idx];
        idxs.map(function (i) {
          _this3.steps.eq(i).removeClass(cls);
        });
      }
    }, {
      key: "_getStepDirection",
      value: function _getStepDirection(idx) {
        if (this.current_index == null) {
          return '';
        }

        return this.current_index < idx ? "forward" : "backward";
      }
    }, {
      key: "_getStepPosition",
      value: function _getStepPosition(idx) {
        var stepPosition = 'middle';

        if (idx === 0) {
          stepPosition = 'first';
        } else if (idx === this.steps.length - 1) {
          stepPosition = 'last';
        }

        return stepPosition;
      }
    }, {
      key: "_getStepAnchor",
      value: function _getStepAnchor(idx) {
        if (idx == null) {
          return null;
        }

        return this.steps.eq(idx);
      }
    }, {
      key: "_getStepPage",
      value: function _getStepPage(idx) {
        if (idx == null) {
          return null;
        }

        var anchor = this._getStepAnchor(idx);

        return anchor.length > 0 ? this.main.find(anchor.attr("href")) : null;
      }
    }, {
      key: "_setStepContent",
      value: function _setStepContent(idx, html) {
        var page = this._getStepPage(idx);

        if (page) {
          page.html(html);
        }
      }
    }, {
      key: "_loadStep",
      value: function _loadStep(idx) {
        var _this4 = this;

        // Get current step element
        var curStep = this._getStepAnchor(this.current_index); // Get step direction


        var stepDirection = this._getStepDirection(idx); // Get the direction of step navigation


        if (this.current_index !== null) {
          // Trigger "leaveStep" event
          if (this._triggerEvent("leaveStep", [curStep, this.current_index, stepDirection]) === false) {
            return false;
          }
        } // Get next step element


        var selStep = this._getStepAnchor(idx); // Get the content if used


        var getStepContent = this._triggerEvent("stepContent", [selStep, idx, stepDirection]);

        if (getStepContent) {
          if (_typeof(getStepContent) == "object") {
            getStepContent.then(function (res) {
              _this4._setStepContent(idx, res);

              _this4._transitStep(idx);
            })["catch"](function (err) {
              console.error(err);

              _this4._setStepContent(idx, err);

              _this4._transitStep(idx);
            });
          } else if (typeof getStepContent == "string") {
            this._setStepContent(idx, getStepContent);

            this._transitStep(idx);
          } else {
            this._transitStep(idx);
          }
        } else {
          this._transitStep(idx);
        }
      }
    }, {
      key: "_transitStep",
      value: function _transitStep(idx) {
        var _this5 = this;

        // Get step to show element
        var selStep = this._getStepAnchor(idx); // Change the url hash to new step


        this._setURLHash(selStep.attr("href")); // Update controls


        this._setAnchor(idx); // Animate the step


        this._doStepAnimation(idx, function () {
          // Fix height with content
          _this5._fixHeight(idx); // Get the direction of step navigation


          var stepDirection = _this5._getStepDirection(idx); // Get the position of step


          var stepPosition = _this5._getStepPosition(idx); // Trigger "showStep" event


          _this5._triggerEvent("showStep", [selStep, _this5.current_index, stepDirection, stepPosition]);
        }); // Update the current index


        this.current_index = idx; // Set the buttons based on the step

        this._setButtons(idx);
      }
    }, {
      key: "_doStepAnimation",
      value: function _doStepAnimation(idx, callback) {
        var _this6 = this;

        // Get current step element
        var curPage = this._getStepPage(this.current_index); // Get next step element


        var selPage = this._getStepPage(idx); // Get the animation


        var animation = this.options.transition.animation.toLowerCase(); // Complete any ongoing animations

        this._stopAnimations();

        switch (animation) {
          case 'slide-horizontal':
          case 'slide-h':
            // horizontal slide
            var containerWidth = this.container.width();
            var curLastLeft = containerWidth;
            var nextFirstLeft = containerWidth * -2; // Forward direction

            if (idx > this.current_index) {
              curLastLeft = containerWidth * -1;
              nextFirstLeft = containerWidth;
            } // First load set the container width


            if (this.current_index == null) {
              this.container.height(selPage.outerHeight());
            }

            var css_pos, css_left;

            if (curPage) {
              css_pos = curPage.css("position");
              css_left = curPage.css("left");
              curPage.css("position", 'absolute').css("left", 0).animate({
                left: curLastLeft
              }, this.options.transition.speed, this.options.transition.easing, function () {
                $(this).hide();
                curPage.css("position", css_pos).css("left", css_left);
              });
            }

            css_pos = selPage.css("position");
            css_left = selPage.css("left");
            selPage.css("position", 'absolute').css("left", nextFirstLeft).outerWidth(containerWidth).show().animate({
              left: 0
            }, this.options.transition.speed, this.options.transition.easing, function () {
              selPage.css("position", css_pos).css("left", css_left);
              callback();
            });
            break;

          case 'slide-vertical':
          case 'slide-v':
            // vertical slide
            var containerHeight = this.container.height();
            var curLastTop = containerHeight;
            var nextFirstTop = containerHeight * -2; // Forward direction

            if (idx > this.current_index) {
              curLastTop = containerHeight * -1;
              nextFirstTop = containerHeight;
            }

            var css_vpos, css_vtop;

            if (curPage) {
              css_vpos = curPage.css("position");
              css_vtop = curPage.css("top");
              curPage.css("position", 'absolute').css("top", 0).animate({
                top: curLastTop
              }, this.options.transition.speed, this.options.transition.easing, function () {
                $(this).hide();
                curPage.css("position", css_vpos).css("top", css_vtop);
              });
            }

            css_vpos = selPage.css("position");
            css_vtop = selPage.css("top");
            selPage.css("position", 'absolute').css("top", nextFirstTop).show().animate({
              top: 0
            }, this.options.transition.speed, this.options.transition.easing, function () {
              selPage.css("position", css_vpos).css("top", css_vtop);
              callback();
            });
            break;

          case 'slide-swing':
          case 'slide-s':
            // normal slide
            if (curPage) {
              curPage.slideUp('fast', this.options.transition.easing, function () {
                selPage.slideDown(_this6.options.transition.speed, _this6.options.transition.easing, function () {
                  callback();
                });
              });
            } else {
              selPage.slideDown(this.options.transition.speed, this.options.transition.easing, function () {
                callback();
              });
            }

            break;

          case 'fade':
            // normal fade
            if (curPage) {
              curPage.fadeOut('fast', this.options.transition.easing, function () {
                selPage.fadeIn('fast', _this6.options.transition.easing, function () {
                  callback();
                });
              });
            } else {
              selPage.fadeIn(this.options.transition.speed, this.options.transition.easing, function () {
                callback();
              });
            }

            break;

          default:
            if (curPage) {
              curPage.hide();
            }

            selPage.show();
            callback();
            break;
        }
      }
    }, {
      key: "_stopAnimations",
      value: function _stopAnimations() {
        this.pages.finish();
        this.container.finish();
      }
    }, {
      key: "_setAnchor",
      value: function _setAnchor(idx) {
        // Current step anchor > Remove other classes and add done class
        this._resetCSSClass(this.current_index, "active");

        if (this.options.anchorSettings.markDoneStep !== false && this.current_index !== null) {
          this._setCSSClass(this.current_index, "done");

          if (this.options.anchorSettings.removeDoneStepOnNavigateBack !== false && this._getStepDirection(idx) === 'backward') {
            this._resetCSSClass(this.current_index, "done");
          }
        } // Next step anchor > Remove other classes and add active class


        this._resetCSSClass(idx, "done");

        this._setCSSClass(idx, "active");
      }
    }, {
      key: "_setButtons",
      value: function _setButtons(idx) {
        // Previous/Next Button enable/disable based on step
        if (!this.options.cycleSteps) {
          this.main.find('.sw-btn-prev').removeClass("disabled");
          this.main.find('.sw-btn-next').removeClass("disabled");

          switch (this._getStepPosition(idx)) {
            case 'first':
              this.main.find('.sw-btn-prev').addClass("disabled");
              break;

            case 'last':
              this.main.find('.sw-btn-next').addClass("disabled");
              break;

            default:
              if (this._getNextShowable(idx) === false) {
                this.main.find('.sw-btn-next').addClass("disabled");
              }

              if (this._getPreviousShowable(idx) === false) {
                this.main.find('.sw-btn-prev').addClass("disabled");
              }

              break;
          }
        }
      }
    }, {
      key: "_getStepIndex",
      value: function _getStepIndex() {
        // Get selected step from the url
        var idx = this._getURLHashIndex();

        return idx === false ? this.options.selected : idx;
      }
    }, {
      key: "_setTheme",
      value: function _setTheme(theme) {
        this.main.removeClass(function (index, className) {
          return (className.match(/(^|\s)sw-theme-\S+/g) || []).join(' ');
        }).addClass('sw-theme-' + theme);
      }
    }, {
      key: "_setJustify",
      value: function _setJustify(justified) {
        if (justified === true) {
          this.main.addClass('sw-justified');
        } else {
          this.main.removeClass('sw-justified');
        }
      } // HELPER FUNCTIONS

    }, {
      key: "_keyNav",
      value: function _keyNav(e) {
        // Keyboard navigation
        if ($.inArray(e.which, this.options.keyboardSettings.keyLeft) > -1) {
          // left
          this._showPrevious();

          e.preventDefault();
        } else if ($.inArray(e.which, this.options.keyboardSettings.keyRight) > -1) {
          // right
          this._showNext();

          e.preventDefault();
        } else {
          return; // exit this handler for other keys
        }
      }
    }, {
      key: "_fixHeight",
      value: function _fixHeight(idx) {
        // Auto adjust height of the container
        if (this.options.autoAdjustHeight) {
          var selPage = this._getStepPage(idx);

          this.container.finish().animate({
            height: selPage.outerHeight()
          }, this.options.transition.speed);
        }
      }
    }, {
      key: "_triggerEvent",
      value: function _triggerEvent(name, params) {
        // Trigger an event
        var e = $.Event(name);
        this.main.trigger(e, params);

        if (e.isDefaultPrevented()) {
          return false;
        }

        return e.result;
      }
    }, {
      key: "_setURLHash",
      value: function _setURLHash(hash) {
        if (this.options.enableURLhash && window.location.hash !== hash) {
          history.pushState(null, null, hash);
        }
      }
    }, {
      key: "_getURLHashIndex",
      value: function _getURLHashIndex() {
        if (this.options.enableURLhash) {
          // Get step number from url hash if available
          var hash = window.location.hash;

          if (hash.length > 0) {
            var elm = this.nav.find("a[href*='" + hash + "']");

            if (elm.length > 0) {
              return this.steps.index(elm);
            }
          }
        }

        return false;
      }
    }, {
      key: "_loader",
      value: function _loader(action) {
        switch (action) {
          case 'show':
            this.main.addClass('sw-loading');
            break;

          case 'hide':
            this.main.removeClass('sw-loading');
            break;

          default:
            this.main.toggleClass('sw-loading');
        }
      }
    }, {
      key: "_showError",
      value: function _showError(msg) {
        console.error(msg);
      } // PUBLIC FUNCTIONS

    }, {
      key: "goToStep",
      value: function goToStep(stepIndex) {
        this._showStep(stepIndex);
      }
    }, {
      key: "next",
      value: function next() {
        this._showNext();
      }
    }, {
      key: "prev",
      value: function prev() {
        this._showPrevious();
      }
    }, {
      key: "reset",
      value: function reset() {
        // Reset all
        this._setURLHash('#');

        this._initOptions();

        this._initLoad();
      }
    }, {
      key: "stepState",
      value: function stepState(stepArray, state) {
        if (!stepArray) {
          return false;
        }

        switch (state) {
          case 'disable':
            this._setCSSClass(stepArray, 'disabled');

            break;

          case 'enable':
            this._resetCSSClass(stepArray, 'disabled');

            break;

          case 'hide':
            this._setCSSClass(stepArray, 'hidden');

            break;

          case 'show':
            this._resetCSSClass(stepArray, 'hidden');

            break;

          case 'error-on':
            this._setCSSClass(stepArray, 'danger');

            break;

          case 'error-off':
            this._resetCSSClass(stepArray, 'danger');

            break;
        }
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        this.options = $.extend(true, {}, this.options, options);

        this._initOptions();
      }
    }, {
      key: "getStepIndex",
      value: function getStepIndex() {
        return this.current_index;
      }
    }, {
      key: "loader",
      value: function loader(state) {
        if (state === "show") {
          this.main.addClass('sw-loading');
        } else {
          this.main.removeClass('sw-loading');
        }
      }
    }]);

    return SmartWizard;
  }(); // Wrapper for the plugin


  $.fn.smartWizard = function (options) {
    if (options === undefined || _typeof(options) === 'object') {
      return this.each(function () {
        if (!$.data(this, "smartWizard")) {
          $.data(this, "smartWizard", new SmartWizard(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      var instance = $.data(this[0], 'smartWizard');

      if (options === 'destroy') {
        $.data(this, 'smartWizard', null);
      }

      if (instance instanceof SmartWizard && typeof instance[options] === 'function') {
        return instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
      } else {
        return this;
      }
    }
  };
})(jQuery, window, document);