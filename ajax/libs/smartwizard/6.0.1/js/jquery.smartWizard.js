"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*!
* jQuery SmartWizard v6.0.1
* The awesome step wizard plugin for jQuery
* http://www.techlaboratory.net/jquery-smartwizard
*
* Created by Dipu Raj (http://dipu.me)
*
* Licensed under the terms of the MIT License
* https://github.com/techlab/jquery-smartwizard/blob/master/LICENSE
*/
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }

      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  "use strict"; // Default options

  var defaults = {
    selected: 0,
    // Initial selected step, 0 = first step
    theme: 'basic',
    // theme for the wizard, related css need to include for other than default theme
    justified: true,
    // Nav menu justification. true/false
    autoAdjustHeight: true,
    // Automatically adjust content height
    backButtonSupport: true,
    // Enable the back button support
    enableUrlHash: true,
    // Enable selection of the step based on url hash
    transition: {
      animation: 'none',
      // Animation effect on navigation, none|fade|slideHorizontal|slideVertical|slideSwing|css(Animation CSS class also need to specify)
      speed: '400',
      // Animation speed. Not used if animation is 'css'
      easing: '',
      // Animation easing. Not supported without a jQuery easing plugin. Not used if animation is 'css'
      prefixCss: '',
      // Only used if animation is 'css'. Animation CSS prefix
      fwdShowCss: '',
      // Only used if animation is 'css'. Step show Animation CSS on forward direction
      fwdHideCss: '',
      // Only used if animation is 'css'. Step hide Animation CSS on forward direction
      bckShowCss: '',
      // Only used if animation is 'css'. Step show Animation CSS on backward direction
      bckHideCss: '' // Only used if animation is 'css'. Step hide Animation CSS on backward direction

    },
    toolbar: {
      position: 'bottom',
      // none|top|bottom|both
      showNextButton: true,
      // show/hide a Next button
      showPreviousButton: true,
      // show/hide a Previous button
      extraHtml: '' // Extra html to show on toolbar

    },
    anchor: {
      enableNavigation: true,
      // Enable/Disable anchor navigation 
      enableNavigationAlways: false,
      // Activates all anchors clickable always
      enableDoneState: true,
      // Add done state on visited steps
      markPreviousStepsAsDone: true,
      // When a step selected by url hash, all previous steps are marked done
      unDoneOnBackNavigation: false,
      // While navigate back, done state will be cleared
      enableDoneStateNavigation: true // Enable/Disable the done state navigation

    },
    keyboard: {
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
    style: {
      // CSS Class settings
      mainCss: 'sw',
      navCss: 'nav',
      navLinkCss: 'nav-link',
      contentCss: 'tab-content',
      contentPanelCss: 'tab-pane',
      themePrefixCss: 'sw-theme-',
      anchorDefaultCss: 'default',
      anchorDoneCss: 'done',
      anchorActiveCss: 'active',
      anchorDisabledCss: 'disabled',
      anchorHiddenCss: 'hidden',
      anchorErrorCss: 'error',
      anchorWarningCss: 'warning',
      justifiedCss: 'sw-justified',
      btnCss: 'sw-btn',
      btnNextCss: 'sw-btn-next',
      btnPrevCss: 'sw-btn-prev',
      loaderCss: 'sw-loading',
      progressCss: 'progress',
      progressBarCss: 'progress-bar',
      toolbarCss: 'toolbar',
      toolbarPrefixCss: 'toolbar-'
    },
    disabledSteps: [],
    // Array Steps disabled
    errorSteps: [],
    // Array Steps error
    warningSteps: [],
    // Array Steps warning
    hiddenSteps: [],
    // Hidden steps
    getContent: null // Callback function for content loading

  };

  var SmartWizard = /*#__PURE__*/function () {
    function SmartWizard(element, options) {
      var _this = this;

      _classCallCheck(this, SmartWizard);

      // Merge user settings with default
      this.options = $.extend(true, {}, defaults, options); // Main container element

      this.main = $(element); // Navigation bar element

      this.nav = this._getFirstDescendant('.' + this.options.style.navCss); // Content container

      this.container = this._getFirstDescendant('.' + this.options.style.contentCss); // Step anchor elements

      this.steps = this.nav.find('.' + this.options.style.navLinkCss); // Content pages

      this.pages = this.container.children('.' + this.options.style.contentPanelCss); // Progressbar

      this.progressbar = this.main.find('.' + this.options.style.progressCss); // Direction, RTL/LTR

      this.dir = this._getDir(); // Initial wizard index

      this.current_index = -1; // Is initialiazed

      this.is_init = false; // Initialize options

      this._init(); // Load wizard asynchronously


      setTimeout(function () {
        _this._load();
      }, 0);
    } // Initialize options


    _createClass(SmartWizard, [{
      key: "_init",
      value: function _init() {
        // Set the elements
        this._setElements(); // Add toolbar


        this._setToolbar(); // Skip if already init


        if (this.is_init === true) return true; // Assign plugin events

        this._setEvents();

        this.is_init = true; // Trigger the initialized event

        this._triggerEvent("initialized");
      } // Initial Load Method

    }, {
      key: "_load",
      value: function _load() {
        // Clean the elements
        this.pages.hide(); // Clear other states from the steps

        this.steps.removeClass([this.options.style.anchorDoneCss, this.options.style.anchorActiveCss]); // Initial step index

        this.current_index = -1; // Get the initial step index

        var idx = this._getURLHashIndex();

        idx = idx ? idx : this.options.selected;

        var idxShowable = this._getShowable(idx - 1, 'forward');

        idx = idxShowable === null && idx > 0 ? this._getShowable(-1, 'forward') : idxShowable; // Mark any previous steps done

        if (idx > 0 && this.options.anchor.enableDoneState && this.options.anchor.markPreviousStepsAsDone) {
          this.steps.slice(0, idx).addClass(this.options.style.anchorDoneCss);
        } // Show the initial step


        this._showStep(idx); // Trigger the loaded event


        this._triggerEvent("loaded");
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
      key: "_getDir",
      value: function _getDir() {
        var dir = this.main.prop('dir');

        if (dir.length === 0) {
          dir = document.documentElement.dir; // Helps to isolate related css classes

          this.main.prop('dir', dir);
        }

        return dir;
      }
    }, {
      key: "_setElements",
      value: function _setElements() {
        var _this2 = this;

        // Set the main element
        this.main.addClass(this.options.style.mainCss); // Set theme option

        this.main.removeClass(function (i, className) {
          return (className.match(/(^|\s)sw-theme-\S+/g) || []).join(' ');
        }).addClass(this.options.style.themePrefixCss + this.options.theme); // Set justify option

        this.main.toggleClass(this.options.style.justifiedCss, this.options.justified); // Set the anchor default style

        if (this.options.anchor.enableNavigationAlways !== true || this.options.anchor.enableNavigation !== true) {
          this.steps.addClass(this.options.style.anchorDefaultCss);
        } // Disabled steps


        $.each(this.options.disabledSteps, function (i, n) {
          _this2.steps.eq(n).addClass(_this2.options.style.anchorDisabledCss);
        }); // Error steps

        $.each(this.options.errorSteps, function (i, n) {
          _this2.steps.eq(n).addClass(_this2.options.style.anchorErrorCss);
        }); // Warning steps

        $.each(this.options.warningSteps, function (i, n) {
          _this2.steps.eq(n).addClass(_this2.options.style.anchorWarningCss);
        }); // Hidden steps

        $.each(this.options.hiddenSteps, function (i, n) {
          _this2.steps.eq(n).addClass(_this2.options.style.anchorHiddenCss);
        });
      }
    }, {
      key: "_setEvents",
      value: function _setEvents() {
        var _this3 = this;

        // Anchor click event
        this.steps.on("click", function (e) {
          e.preventDefault();

          if (_this3.options.anchor.enableNavigation !== true) {
            return;
          }

          var elm = $(e.currentTarget);

          if (_this3._isShowable(elm)) {
            // Get the step index
            _this3._showStep(_this3.steps.index(elm));
          }
        }); // Next/Previous button event

        this.main.on("click", function (e) {
          if ($(e.target).hasClass(_this3.options.style.btnNextCss)) {
            e.preventDefault();

            _this3._navigate('next');
          } else if ($(e.target).hasClass(_this3.options.style.btnPrevCss)) {
            e.preventDefault();

            _this3._navigate('prev');
          }

          return;
        }); // Keyboard navigation event            

        $(document).keyup(function (e) {
          _this3._keyNav(e);
        }); // Back/forward browser button event

        $(window).on('hashchange', function (e) {
          if (_this3.options.backButtonSupport !== true) {
            return;
          }

          var idx = _this3._getURLHashIndex();

          if (idx && _this3._isShowable(_this3.steps.eq(idx))) {
            e.preventDefault();

            _this3._showStep(idx);
          }
        }); // Fix content height on window resize

        $(window).on('resize', function (e) {
          _this3._fixHeight(_this3.current_index);
        });
      }
    }, {
      key: "_setToolbar",
      value: function _setToolbar() {
        // Remove already existing toolbar if any
        this.main.find(".sw-toolbar-elm").remove();
        var toolbarPosition = this.options.toolbar.position;

        if (toolbarPosition === 'none') {
          // Skip right away if the toolbar is not enabled
          return;
        } else if (toolbarPosition == 'both') {
          this.container.before(this._createToolbar('top'));
          this.container.after(this._createToolbar('bottom'));
        } else if (toolbarPosition == 'top') {
          this.container.before(this._createToolbar('top'));
        } else {
          this.container.after(this._createToolbar('bottom'));
        }
      }
    }, {
      key: "_createToolbar",
      value: function _createToolbar(position) {
        var toolbar = $('<div></div>').addClass('sw-toolbar-elm ' + this.options.style.toolbarCss + ' ' + this.options.style.toolbarPrefixCss + position).attr('role', 'toolbar'); // Create the toolbar buttons

        var btnNext = this.options.toolbar.showNextButton !== false ? $('<button></button>').text(this.options.lang.next).addClass('btn ' + this.options.style.btnNextCss + ' ' + this.options.style.btnCss).attr('type', 'button') : null;
        var btnPrevious = this.options.toolbar.showPreviousButton !== false ? $('<button></button>').text(this.options.lang.previous).addClass('btn ' + this.options.style.btnPrevCss + ' ' + this.options.style.btnCss).attr('type', 'button') : null;
        return toolbar.append(btnPrevious, btnNext, this.options.toolbar.extraHtml);
      }
    }, {
      key: "_navigate",
      value: function _navigate(dir) {
        this._showStep(this._getShowable(this.current_index, dir));
      }
    }, {
      key: "_showStep",
      value: function _showStep(idx) {
        var _this4 = this;

        if (idx === -1 || idx === null) return false; // If current step is requested again, skip

        if (idx == this.current_index) return false; // If step not found, skip

        if (!this.steps.eq(idx)) return false; // If it is a disabled step, skip

        if (!this._isEnabled(this.steps.eq(idx))) return false; // Get the direction of navigation

        var stepDirection = this._getStepDirection(idx);

        if (this.current_index !== -1) {
          // Trigger "leaveStep" event
          if (this._triggerEvent("leaveStep", [this._getStepAnchor(this.current_index), this.current_index, idx, stepDirection]) === false) {
            return false;
          }
        }

        this._loadContent(idx, function () {
          // Get step to show element
          var selStep = _this4._getStepAnchor(idx); // Change the url hash to new step


          _this4._setURLHash(selStep.attr("href")); // Update controls


          _this4._setAnchor(idx); // Get current step element


          var curPage = _this4._getStepPage(_this4.current_index); // Get next step element


          var selPage = _this4._getStepPage(idx); // transit the step


          _this4._transit(selPage, curPage, stepDirection, function () {
            // Update the current index
            _this4.current_index = idx; // Fix height with content

            _this4._fixHeight(idx); // Set the buttons based on the step


            _this4._setButtons(idx); // Set the progressbar based on the step


            _this4._setProgressbar(idx); // Trigger "showStep" event


            _this4._triggerEvent("showStep", [selStep, idx, stepDirection, _this4._getStepPosition(idx)]);
          });
        });
      }
    }, {
      key: "_getShowable",
      value: function _getShowable(idx, dir) {
        var _this5 = this;

        var si = null;
        var elmList = dir == 'prev' ? $(this.steps.slice(0, idx).get().reverse()) : this.steps.slice(idx + 1); // Find the next showable step in the direction

        elmList.each(function (i, elm) {
          if (_this5._isEnabled($(elm))) {
            si = dir == 'prev' ? idx - (i + 1) : i + idx + 1;
            return false;
          }
        });
        return si;
      }
    }, {
      key: "_isShowable",
      value: function _isShowable(elm) {
        if (!this._isEnabled(elm)) {
          return false;
        }

        var isDone = elm.hasClass(this.options.style.anchorDoneCss);

        if (this.options.anchor.enableDoneStateNavigation === false && isDone) {
          return false;
        }

        if (this.options.anchor.enableNavigationAlways === false && !isDone) {
          return false;
        }

        return true;
      }
    }, {
      key: "_isEnabled",
      value: function _isEnabled(elm) {
        return elm.hasClass(this.options.style.anchorDisabledCss) || elm.hasClass(this.options.style.anchorHiddenCss) ? false : true;
      }
    }, {
      key: "_getStepDirection",
      value: function _getStepDirection(idx) {
        return this.current_index < idx ? "forward" : "backward";
      }
    }, {
      key: "_getStepPosition",
      value: function _getStepPosition(idx) {
        if (idx === 0) {
          return 'first';
        } else if (idx === this.steps.length - 1) {
          return 'last';
        }

        return 'middle';
      }
    }, {
      key: "_getStepAnchor",
      value: function _getStepAnchor(idx) {
        if (idx == null || idx == -1) return null;
        return this.steps.eq(idx);
      }
    }, {
      key: "_getStepPage",
      value: function _getStepPage(idx) {
        if (idx == null || idx == -1) return null;
        return this.pages.eq(idx);
      }
    }, {
      key: "_loadContent",
      value: function _loadContent(idx, callback) {
        if (!$.isFunction(this.options.getContent)) {
          callback();
          return;
        }

        var selPage = this._getStepPage(idx);

        if (!selPage) {
          callback();
          return;
        } // Get step direction


        var stepDirection = this._getStepDirection(idx); // Get step position


        var stepPosition = this._getStepPosition(idx); // Get next step element


        var selStep = this._getStepAnchor(idx);

        this.options.getContent(idx, stepDirection, stepPosition, selStep, function (content) {
          if (content) selPage.html(content);
          callback();
        });
      }
    }, {
      key: "_transit",
      value: function _transit(elmToShow, elmToHide, stepDirection, callback) {
        var transitFn = $.fn.smartWizard.transitions[this.options.transition.animation];

        if ($.isFunction(transitFn)) {
          transitFn(elmToShow, elmToHide, stepDirection, this, function (res) {
            if (res === false) {
              if (elmToHide !== null) elmToHide.hide();
              elmToShow.show();
            }

            callback();
          });
        } else {
          if (elmToHide !== null) elmToHide.hide();
          elmToShow.show();
          callback();
        }
      }
    }, {
      key: "_fixHeight",
      value: function _fixHeight(idx) {
        if (this.options.autoAdjustHeight === false) return; // Auto adjust height of the container

        var contentHeight = this._getStepPage(idx).outerHeight();

        if ($.isFunction(this.container.finish) && $.isFunction(this.container.animate) && contentHeight > 0) {
          this.container.finish().animate({
            height: contentHeight
          }, this.options.transition.speed);
        } else {
          this.container.css({
            height: contentHeight > 0 ? contentHeight : 'auto'
          });
        }
      }
    }, {
      key: "_setAnchor",
      value: function _setAnchor(idx) {
        // Current step anchor > Remove other classes and add done class
        this.steps.eq(this.current_index).removeClass(this.options.style.anchorActiveCss);

        if (this.options.anchor.enableDoneState !== false && this.current_index !== null && this.current_index >= 0) {
          this.steps.eq(this.current_index).addClass(this.options.style.anchorDoneCss);

          if (this.options.anchor.unDoneOnBackNavigation !== false && this._getStepDirection(idx) === 'backward') {
            this.steps.eq(this.current_index).removeClass(this.options.style.anchorDoneCss);
          }
        } // Next step anchor > Remove other classes and add active class


        this.steps.eq(idx).removeClass(this.options.style.anchorDoneCss);
        this.steps.eq(idx).addClass(this.options.style.anchorActiveCss);
      }
    }, {
      key: "_setButtons",
      value: function _setButtons(idx) {
        // Previous/Next Button enable/disable based on step
        this.main.find('.' + this.options.style.btnNextCss + ', .' + this.options.style.btnPrevCss).removeClass(this.options.style.anchorDisabledCss);

        var p = this._getStepPosition(idx);

        if (p === 'first' || p === 'last') {
          var c = p === 'first' ? '.' + this.options.style.btnPrevCss : '.' + this.options.style.btnNextCss;
          this.main.find(c).addClass(this.options.style.anchorDisabledCss);
        } else {
          if (this._getShowable(idx, 'next') === null) {
            this.main.find('.' + this.options.style.btnNextCss).addClass(this.options.style.anchorDisabledCss);
          }

          if (this._getShowable(idx, 'prev') === null) {
            this.main.find('.' + this.options.style.btnPrevCss).addClass(this.options.style.anchorDisabledCss);
          }
        }
      }
    }, {
      key: "_setProgressbar",
      value: function _setProgressbar(idx) {
        var width = this.nav.width();
        var widthPercentage = width / this.steps.length * (idx + 1) / width * 100; // Set css variable for supported themes

        document.documentElement.style.setProperty('--sw-progress-width', widthPercentage + '%');

        if (this.progressbar.length > 0) {
          this.progressbar.find('.' + this.options.style.progressBarCss).css('width', widthPercentage + '%');
        }
      } // HELPER FUNCTIONS

    }, {
      key: "_keyNav",
      value: function _keyNav(e) {
        if (!this.options.keyboard.keyNavigation) {
          return;
        } // Keyboard navigation


        if ($.inArray(e.which, this.options.keyboard.keyLeft) > -1) {
          // left
          this._navigate('prev');

          e.preventDefault();
        } else if ($.inArray(e.which, this.options.keyboard.keyRight) > -1) {
          // right
          this._navigate('next');

          e.preventDefault();
        } else {
          return; // exit this handler for other keys
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
        if (this.options.enableUrlHash && window.location.hash !== hash) {
          history.pushState(null, null, hash);
        }
      }
    }, {
      key: "_getURLHashIndex",
      value: function _getURLHashIndex() {
        if (this.options.enableUrlHash) {
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
      key: "_showError",
      value: function _showError(msg) {
        console.error(msg);
      }
    }, {
      key: "_changeState",
      value: function _changeState(stepArray, state, addOrRemove) {
        var _this6 = this;

        // addOrRemove: true => Add, otherwise remove 
        addOrRemove = addOrRemove !== false ? true : false;
        var css = '';

        if (state == 'default') {
          css = this.options.style.anchorDefaultCss;
        } else if (state == 'active') {
          css = this.options.style.anchorActiveCss;
        } else if (state == 'done') {
          css = this.options.style.anchorDoneCss;
        } else if (state == 'disable') {
          css = this.options.style.anchorDisabledCss;
        } else if (state == 'hidden') {
          css = this.options.style.anchorHiddenCss;
        } else if (state == 'error') {
          css = this.options.style.anchorErrorCss;
        } else if (state == 'warning') {
          css = this.options.style.anchorWarningCss;
        }

        $.each(stepArray, function (i, n) {
          _this6.steps.eq(n).toggleClass(css, addOrRemove);
        });
      } // PUBLIC FUNCTIONS

    }, {
      key: "goToStep",
      value: function goToStep(stepIndex, force) {
        force = force !== false ? true : false;

        if (force !== true && !this._isShowable(this.steps.eq(stepIndex))) {
          return;
        } // Mark any previous steps done


        if (force === true && stepIndex > 0 && this.options.anchor.enableDoneState && this.options.anchor.markPreviousStepsAsDone) {
          this.steps.slice(0, stepIndex).addClass(this.options.style.anchorDoneCss);
        }

        this._showStep(stepIndex);
      }
    }, {
      key: "next",
      value: function next() {
        this._navigate('next');
      }
    }, {
      key: "prev",
      value: function prev() {
        this._navigate('prev');
      }
    }, {
      key: "reset",
      value: function reset() {
        // Clear css from steps except default, hidden and disabled
        this.steps.removeClass([this.options.style.anchorDoneCss, this.options.style.anchorActiveCss, this.options.style.anchorErrorCss, this.options.style.anchorWarningCss]); // Reset all

        this._setURLHash('#');

        this._init();

        this._load();
      }
    }, {
      key: "setState",
      value: function setState(stepArray, state) {
        this._changeState(stepArray, state, true);
      }
    }, {
      key: "unsetState",
      value: function unsetState(stepArray, state) {
        this._changeState(stepArray, state, false);
      }
    }, {
      key: "setOptions",
      value: function setOptions(options) {
        this.options = $.extend(true, {}, this.options, options);

        this._init();
      }
    }, {
      key: "getOptions",
      value: function getOptions() {
        return this.options;
      }
    }, {
      key: "getStepInfo",
      value: function getStepInfo() {
        return {
          currentStep: this.current_index ? this.current_index : 0,
          totalSteps: this.steps ? this.steps.length : 0
        };
      }
    }, {
      key: "loader",
      value: function loader(state) {
        this.main.toggleClass(this.options.style.loaderCss, state === "show");
      }
    }, {
      key: "fixHeight",
      value: function fixHeight() {
        this._fixHeight(this.current_index);
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
  }; // Transition effects


  $.fn.smartWizard.transitions = {
    fade: function fade(elmToShow, elmToHide, stepDirection, wizardObj, callback) {
      if (!$.isFunction(elmToShow.fadeOut)) {
        callback(false);
        return;
      }

      if (elmToHide) {
        elmToHide.fadeOut(wizardObj.options.transition.speed, wizardObj.options.transition.easing, function () {
          elmToShow.fadeIn(wizardObj.options.transition.speed, wizardObj.options.transition.easing, function () {
            callback();
          });
        });
      } else {
        elmToShow.fadeIn(wizardObj.options.transition.speed, wizardObj.options.transition.easing, function () {
          callback();
        });
      }
    },
    slideSwing: function slideSwing(elmToShow, elmToHide, stepDirection, wizardObj, callback) {
      if (!$.isFunction(elmToShow.slideDown)) {
        callback(false);
        return;
      }

      if (elmToHide) {
        elmToHide.slideUp(wizardObj.options.transition.speed, wizardObj.options.transition.easing, function () {
          elmToShow.slideDown(wizardObj.options.transition.speed, wizardObj.options.transition.easing, function () {
            callback();
          });
        });
      } else {
        elmToShow.slideDown(wizardObj.options.transition.speed, wizardObj.options.transition.easing, function () {
          callback();
        });
      }
    },
    slideHorizontal: function slideHorizontal(elmToShow, elmToHide, stepDirection, wizardObj, callback) {
      if (!$.isFunction(elmToShow.animate)) {
        callback(false);
        return;
      } // Horizontal slide


      var animFn = function animFn(elm, iniLeft, finLeft, cb) {
        elm.css({
          position: 'absolute',
          left: iniLeft
        }).show().animate({
          left: finLeft
        }, wizardObj.options.transition.speed, wizardObj.options.transition.easing, cb);
      };

      if (wizardObj.current_index == -1) {
        // Set container height at page load 
        wizardObj.container.height(elmToShow.outerHeight());
      }

      var containerWidth = wizardObj.container.width();

      if (elmToHide) {
        var initCss1 = elmToHide.css(["position", "left"]);
        var finLeft = containerWidth * (stepDirection == 'backward' ? 1 : -1);
        animFn(elmToHide, 0, finLeft, function () {
          elmToHide.hide().css(initCss1);
        });
      }

      var initCss2 = elmToShow.css(["position"]);
      var iniLeft = containerWidth * (stepDirection == 'backward' ? -2 : 1);
      animFn(elmToShow, iniLeft, 0, function () {
        elmToShow.css(initCss2);
        callback();
      });
    },
    slideVertical: function slideVertical(elmToShow, elmToHide, stepDirection, wizardObj, callback) {
      if (!$.isFunction(elmToShow.animate)) {
        callback(false);
        return;
      } // Vertical slide


      var animFn = function animFn(elm, iniTop, finTop, cb) {
        elm.css({
          position: 'absolute',
          top: iniTop
        }).show().animate({
          top: finTop
        }, wizardObj.options.transition.speed, wizardObj.options.transition.easing, cb);
      };

      if (wizardObj.current_index == -1) {
        // Set container height at page load 
        wizardObj.container.height(elmToShow.outerHeight());
      }

      var containerHeight = wizardObj.container.height();

      if (elmToHide) {
        var initCss1 = elmToHide.css(["position", "top"]);
        var finTop = containerHeight * (stepDirection == 'backward' ? -1 : 1);
        animFn(elmToHide, 0, finTop, function () {
          elmToHide.hide().css(initCss1);
        });
      }

      var initCss2 = elmToShow.css(["position"]);
      var iniTop = containerHeight * (stepDirection == 'backward' ? 1 : -2);
      animFn(elmToShow, iniTop, 0, function () {
        elmToShow.css(initCss2);
        callback();
      });
    },
    css: function css(elmToShow, elmToHide, stepDirection, wizardObj, callback) {
      if (wizardObj.options.transition.fwdHideCss.length == 0 || wizardObj.options.transition.bckHideCss.length == 0) {
        callback(false);
        return;
      } // CSS Animation


      var animFn = function animFn(elm, animation, cb) {
        if (!animation || animation.length == 0) cb();
        elm.addClass(animation).one("animationend", function (e) {
          $(e.currentTarget).removeClass(animation);
          cb();
        });
        elm.addClass(animation).one("animationcancel", function (e) {
          $(e.currentTarget).removeClass(animation);
          cb('cancel');
        });
      };

      var showCss = wizardObj.options.transition.prefixCss + ' ' + (stepDirection == 'backward' ? wizardObj.options.transition.bckShowCss : wizardObj.options.transition.fwdShowCss);

      if (elmToHide) {
        var hideCss = wizardObj.options.transition.prefixCss + ' ' + (stepDirection == 'backward' ? wizardObj.options.transition.bckHideCss : wizardObj.options.transition.fwdHideCss);
        animFn(elmToHide, hideCss, function () {
          elmToHide.hide();
          animFn(elmToShow, showCss, function () {
            callback();
          });
          elmToShow.show();
        });
      } else {
        animFn(elmToShow, showCss, function () {
          callback();
        });
        elmToShow.show();
      }
    }
  };
});