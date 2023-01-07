/*!
 * SmartWizard v4.4.1
 * The awesome jQuery step wizard plugin with Bootstrap support
 * http://www.techlaboratory.net/smartwizard
 *
 * Created by Dipu Raj
 * http://dipuraj.me
 *
 * Licensed under the terms of the MIT License
 * https://github.com/techlab/SmartWizard/blob/master/LICENSE
 */
;

(function ($, window, document, undefined) {
  "use strict"; // Default options

  var defaults = {
    selected: 0,
    // Initial selected step, 0 = first step
    keyNavigation: true,
    // Enable/Disable keyboard navigation(left and right keys are used if enabled)
    autoAdjustHeight: true,
    // Automatically adjust content height
    cycleSteps: false,
    // Allows to cycle the navigation of steps
    backButtonSupport: true,
    // Enable the back button support
    useURLhash: true,
    // Enable selection of the step based on url hash
    showStepURLhash: true,
    // Show url hash based on step
    lang: {
      // Language variables for button
      next: 'Next',
      previous: 'Previous'
    },
    toolbarSettings: {
      toolbarPosition: 'bottom',
      // none, top, bottom, both
      toolbarButtonPosition: 'end',
      // start, end
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
      // Add done css
      markAllPreviousStepsAsDone: true,
      // When a step selected by url hash, all previous steps are marked done
      removeDoneStepOnNavigateBack: false,
      // While navigate back done step after active step will be cleared
      enableAnchorOnDoneStep: true // Enable/Disable the done steps navigation

    },
    contentURL: null,
    // content url, Enables Ajax content loading. Can also set as data data-content-url on anchor
    contentCache: true,
    // cache step contents, if false content is fetched always from ajax url
    ajaxSettings: {},
    // Ajax extra settings
    disabledSteps: [],
    // Array Steps disabled
    errorSteps: [],
    // Highlight step with errors
    hiddenSteps: [],
    // Hidden steps
    theme: 'default',
    // theme for the wizard, related css need to include for other than default theme
    transitionEffect: 'none',
    // Effect on navigation, none/slide/fade
    transitionSpeed: '400'
  }; // The plugin constructor

  function SmartWizard(element, options) {
    // Merge user settings with default, recursively
    this.options = $.extend(true, {}, defaults, options); // Main container element

    this.main = $(element); // Navigation bar element

    this.nav = this.main.children('ul'); // Step anchor elements

    this.steps = $("li > a", this.nav); // Content container

    this.container = this.main.children('div'); // Content pages

    this.pages = this.container.children('div'); // Active step index

    this.current_index = null; // Backward compatibility

    this.options.toolbarSettings.toolbarButtonPosition = this.options.toolbarSettings.toolbarButtonPosition === 'right' ? 'end' : this.options.toolbarSettings.toolbarButtonPosition;
    this.options.toolbarSettings.toolbarButtonPosition = this.options.toolbarSettings.toolbarButtonPosition === 'left' ? 'start' : this.options.toolbarSettings.toolbarButtonPosition; // Default fix

    this.options.theme = this.options.theme === null || this.options.theme === '' ? 'default' : this.options.theme; // Call initial method

    this.init();
  }

  $.extend(SmartWizard.prototype, {
    init: function () {
      // Set the elements
      this._setElements(); // Add toolbar


      this._setToolbar(); // Assign plugin events


      this._setEvents();

      var idx = this.options.selected; // Get selected step from the url

      if (this.options.useURLhash) {
        // Get step number from url hash if available
        var hash = window.location.hash;

        if (hash && hash.length > 0) {
          var elm = $("a[href*='" + hash + "']", this.nav);

          if (elm.length > 0) {
            var id = this.steps.index(elm);
            idx = id >= 0 ? id : idx;
          }
        }
      }

      if (idx > 0 && this.options.anchorSettings.markDoneStep && this.options.anchorSettings.markAllPreviousStepsAsDone) {
        // Mark previous steps of the active step as done
        this.steps.eq(idx).parent('li').prevAll().addClass("done");
      } // Show the initial step


      this._showStep(idx);
    },
    // PRIVATE FUNCTIONS
    _setElements: function () {
      // Set the main element
      this.main.addClass('sw-main sw-theme-' + this.options.theme); // Set anchor elements

      this.nav.addClass('nav nav-tabs step-anchor').children('li').addClass('nav-item').children('a').addClass('nav-link'); // nav-justified  nav-pills
      // Make the anchor clickable

      if (this.options.anchorSettings.enableAllAnchors !== false && this.options.anchorSettings.anchorClickable !== false) {
        this.steps.parent('li').addClass('clickable');
      } // Set content container


      this.container.addClass('sw-container tab-content'); // Set content pages

      this.pages.addClass('tab-pane step-content'); // Disabled steps

      var mi = this;

      if (this.options.disabledSteps && this.options.disabledSteps.length > 0) {
        $.each(this.options.disabledSteps, function (i, n) {
          mi.steps.eq(n).parent('li').addClass('disabled');
        });
      } // Error steps


      if (this.options.errorSteps && this.options.errorSteps.length > 0) {
        $.each(this.options.errorSteps, function (i, n) {
          mi.steps.eq(n).parent('li').addClass('danger');
        });
      } // Hidden steps


      if (this.options.hiddenSteps && this.options.hiddenSteps.length > 0) {
        $.each(this.options.hiddenSteps, function (i, n) {
          mi.steps.eq(n).parent('li').addClass('hidden');
        });
      }

      return true;
    },
    _setToolbar: function () {
      // Skip right away if the toolbar is not enabled
      if (this.options.toolbarSettings.toolbarPosition === 'none') {
        return true;
      } // Create the toolbar buttons


      var btnNext = this.options.toolbarSettings.showNextButton !== false ? $('<button></button>').text(this.options.lang.next).addClass('btn btn-secondary sw-btn-next').attr('type', 'button') : null;
      var btnPrevious = this.options.toolbarSettings.showPreviousButton !== false ? $('<button></button>').text(this.options.lang.previous).addClass('btn btn-secondary sw-btn-prev').attr('type', 'button') : null;
      var btnGroup = $('<div></div>').addClass('btn-group mr-2 sw-btn-group').attr('role', 'group').append(btnPrevious, btnNext); // Add extra toolbar buttons

      var btnGroupExtra = null;

      if (this.options.toolbarSettings.toolbarExtraButtons && this.options.toolbarSettings.toolbarExtraButtons.length > 0) {
        btnGroupExtra = $('<div></div>').addClass('btn-group mr-2 sw-btn-group-extra').attr('role', 'group');
        $.each(this.options.toolbarSettings.toolbarExtraButtons, function (i, n) {
          btnGroupExtra.append(n.clone(true));
        });
      }

      var toolbarTop, toolbarBottom; // Append toolbar based on the position

      switch (this.options.toolbarSettings.toolbarPosition) {
        case 'top':
          toolbarTop = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-top justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
          toolbarTop.append(btnGroup);

          if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
            toolbarTop.prepend(btnGroupExtra);
          } else {
            toolbarTop.append(btnGroupExtra);
          }

          this.container.before(toolbarTop);
          break;

        case 'bottom':
          toolbarBottom = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
          toolbarBottom.append(btnGroup);

          if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
            toolbarBottom.prepend(btnGroupExtra);
          } else {
            toolbarBottom.append(btnGroupExtra);
          }

          this.container.after(toolbarBottom);
          break;

        case 'both':
          toolbarTop = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-top justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
          toolbarTop.append(btnGroup);

          if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
            toolbarTop.prepend(btnGroupExtra);
          } else {
            toolbarTop.append(btnGroupExtra);
          }

          this.container.before(toolbarTop);
          toolbarBottom = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
          toolbarBottom.append(btnGroup.clone(true));

          if (btnGroupExtra !== null) {
            if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
              toolbarBottom.prepend(btnGroupExtra.clone(true));
            } else {
              toolbarBottom.append(btnGroupExtra.clone(true));
            }
          }

          this.container.after(toolbarBottom);
          break;

        default:
          toolbarBottom = $('<div></div>').addClass('btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-' + this.options.toolbarSettings.toolbarButtonPosition);
          toolbarBottom.append(btnGroup);

          if (this.options.toolbarSettings.toolbarButtonPosition === 'start') {
            toolbarBottom.append(btnGroupExtra);
          } else {
            toolbarBottom.append(btnGroupExtra);
          }

          this.container.after(toolbarBottom);
          break;
      }

      return true;
    },
    _setEvents: function () {
      // Anchor click event
      var mi = this;
      $(this.steps).on("click", function (e) {
        e.preventDefault();

        if (mi.options.anchorSettings.anchorClickable === false) {
          return true;
        }

        var idx = mi.steps.index(this);

        if (mi.options.anchorSettings.enableAnchorOnDoneStep === false && mi.steps.eq(idx).parent('li').hasClass('done')) {
          return true;
        }

        if (idx !== mi.current_index) {
          if (mi.options.anchorSettings.enableAllAnchors !== false && mi.options.anchorSettings.anchorClickable !== false) {
            mi._showStep(idx);
          } else {
            if (mi.steps.eq(idx).parent('li').hasClass('done')) {
              mi._showStep(idx);
            }
          }
        }
      }); // Next button event

      $('.sw-btn-next', this.main).on("click", function (e) {
        e.preventDefault();

        mi._showNext();
      }); // Previous button event

      $('.sw-btn-prev', this.main).on("click", function (e) {
        e.preventDefault();

        mi._showPrevious();
      }); // Keyboard navigation event

      if (this.options.keyNavigation) {
        $(document).keyup(function (e) {
          mi._keyNav(e);
        });
      } // Back/forward browser button event


      if (this.options.backButtonSupport) {
        $(window).on('hashchange', function (e) {
          if (!mi.options.useURLhash) {
            return true;
          }

          if (window.location.hash) {
            var elm = $("a[href*='" + window.location.hash + "']", mi.nav);

            if (elm && elm.length > 0) {
              e.preventDefault();

              mi._showStep(mi.steps.index(elm));
            }
          }
        });
      }

      return true;
    },
    _showNext: function () {
      var si = this.current_index + 1; // Find the next not disabled step

      for (var i = si; i < this.steps.length; i++) {
        if (!this.steps.eq(i).parent('li').hasClass('disabled') && !this.steps.eq(i).parent('li').hasClass('hidden')) {
          si = i;
          break;
        }
      }

      if (this.steps.length <= si) {
        if (!this.options.cycleSteps) {
          return false;
        }

        si = 0;
      }

      this._showStep(si);

      return true;
    },
    _showPrevious: function () {
      var si = this.current_index - 1; // Find the previous not disabled step

      for (var i = si; i >= 0; i--) {
        if (!this.steps.eq(i).parent('li').hasClass('disabled') && !this.steps.eq(i).parent('li').hasClass('hidden')) {
          si = i;
          break;
        }
      }

      if (0 > si) {
        if (!this.options.cycleSteps) {
          return false;
        }

        si = this.steps.length - 1;
      }

      this._showStep(si);

      return true;
    },
    _showStep: function (idx) {
      // If step not found, skip
      if (!this.steps.eq(idx)) {
        return false;
      } // If current step is requested again, skip


      if (idx == this.current_index) {
        return false;
      } // If it is a disabled step, skip


      if (this.steps.eq(idx).parent('li').hasClass('disabled') || this.steps.eq(idx).parent('li').hasClass('hidden')) {
        return false;
      } // Load step content


      this._loadStepContent(idx);

      return true;
    },
    _loadStepContent: function (idx) {
      var mi = this; // Get current step elements

      var curTab = this.steps.eq(this.current_index); // Get the direction of step navigation

      var stepDirection = '';
      var elm = this.steps.eq(idx);
      var contentURL = elm.data('content-url') && elm.data('content-url').length > 0 ? elm.data('content-url') : this.options.contentURL;

      if (this.current_index !== null && this.current_index !== idx) {
        stepDirection = this.current_index < idx ? "forward" : "backward";
      } // Trigger "leaveStep" event


      if (this.current_index !== null && this._triggerEvent("leaveStep", [curTab, this.current_index, stepDirection]) === false) {
        return false;
      }

      if (contentURL && contentURL.length > 0 && (!elm.data('has-content') || !this.options.contentCache)) {
        // Get ajax content and then show step
        var selPage = elm.length > 0 ? $(elm.attr("href"), this.main) : null;
        var ajaxSettings = $.extend(true, {}, {
          url: contentURL,
          type: "POST",
          data: {
            step_number: idx
          },
          dataType: "text",
          beforeSend: function () {
            mi._loader('show');
          },
          error: function (jqXHR, status, message) {
            mi._loader('hide');

            $.error(message);
          },
          success: function (res) {
            if (res && res.length > 0) {
              elm.data('has-content', true);
              selPage.html(res);
            }

            mi._loader('hide');

            mi._transitPage(idx);
          }
        }, this.options.ajaxSettings);
        $.ajax(ajaxSettings);
      } else {
        // Show step
        this._transitPage(idx);
      }

      return true;
    },
    _transitPage: function (idx) {
      var mi = this; // Get current step elements

      var curTab = this.steps.eq(this.current_index);
      var curPage = curTab.length > 0 ? $(curTab.attr("href"), this.main) : null; // Get step to show elements

      var selTab = this.steps.eq(idx);
      var selPage = selTab.length > 0 ? $(selTab.attr("href"), this.main) : null; // Get the direction of step navigation

      var stepDirection = '';

      if (this.current_index !== null && this.current_index !== idx) {
        stepDirection = this.current_index < idx ? "forward" : "backward";
      }

      var stepPosition = 'middle';

      if (idx === 0) {
        stepPosition = 'first';
      } else if (idx === this.steps.length - 1) {
        stepPosition = 'final';
      }

      this.options.transitionEffect = this.options.transitionEffect.toLowerCase();
      this.pages.finish();

      if (this.options.transitionEffect === 'slide') {
        // normal slide
        if (curPage && curPage.length > 0) {
          curPage.slideUp('fast', this.options.transitionEasing, function () {
            selPage.slideDown(mi.options.transitionSpeed, mi.options.transitionEasing);
          });
        } else {
          selPage.slideDown(this.options.transitionSpeed, this.options.transitionEasing);
        }
      } else if (this.options.transitionEffect === 'fade') {
        // normal fade
        if (curPage && curPage.length > 0) {
          curPage.fadeOut('fast', this.options.transitionEasing, function () {
            selPage.fadeIn('fast', mi.options.transitionEasing, function () {
              $(this).show();
            });
          });
        } else {
          selPage.fadeIn(this.options.transitionSpeed, this.options.transitionEasing, function () {
            $(this).show();
          });
        }
      } else {
        if (curPage && curPage.length > 0) {
          curPage.hide();
        }

        selPage.show();
      } // Change the url hash to new step


      this._setURLHash(selTab.attr("href")); // Update controls


      this._setAnchor(idx); // Set the buttons based on the step


      this._setButtons(idx); // Fix height with content


      this._fixHeight(idx); // Update the current index


      this.current_index = idx; // Trigger "showStep" event

      this._triggerEvent("showStep", [selTab, this.current_index, stepDirection, stepPosition]);

      return true;
    },
    _setAnchor: function (idx) {
      // Current step anchor > Remove other classes and add done class
      this.steps.eq(this.current_index).parent('li').removeClass("active");

      if (this.options.anchorSettings.markDoneStep !== false && this.current_index !== null) {
        this.steps.eq(this.current_index).parent('li').addClass("done");

        if (this.options.anchorSettings.removeDoneStepOnNavigateBack !== false) {
          this.steps.eq(idx).parent('li').nextAll().removeClass("done");
        }
      } // Next step anchor > Remove other classes and add active class


      this.steps.eq(idx).parent('li').removeClass("done").addClass("active");
      return true;
    },
    _setButtons: function (idx) {
      // Previous/Next Button enable/disable based on step
      if (!this.options.cycleSteps) {
        if (0 >= idx) {
          $('.sw-btn-prev', this.main).addClass("disabled");
        } else {
          $('.sw-btn-prev', this.main).removeClass("disabled");
        }

        if (this.steps.length - 1 <= idx) {
          $('.sw-btn-next', this.main).addClass("disabled");
        } else {
          $('.sw-btn-next', this.main).removeClass("disabled");
        }
      }

      return true;
    },
    // HELPER FUNCTIONS
    _keyNav: function (e) {
      var mi = this; // Keyboard navigation

      switch (e.which) {
        case 37:
          // left
          mi._showPrevious();

          e.preventDefault();
          break;

        case 39:
          // right
          mi._showNext();

          e.preventDefault();
          break;

        default:
          return;
        // exit this handler for other keys
      }
    },
    _fixHeight: function (idx) {
      // Auto adjust height of the container
      if (this.options.autoAdjustHeight) {
        var selPage = this.steps.eq(idx).length > 0 ? $(this.steps.eq(idx).attr("href"), this.main) : null;
        this.container.finish().animate({
          minHeight: selPage.outerHeight()
        }, this.options.transitionSpeed, function () {});
      }

      return true;
    },
    _triggerEvent: function (name, params) {
      // Trigger an event
      var e = $.Event(name);
      this.main.trigger(e, params);

      if (e.isDefaultPrevented()) {
        return false;
      }

      return e.result;
    },
    _setURLHash: function (hash) {
      if (this.options.showStepURLhash && window.location.hash !== hash) {
        window.location.hash = hash;
      }
    },
    _loader: function (action) {
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
    },
    // PUBLIC FUNCTIONS
    goToStep: function (stepNum) {
      this._transitPage(stepNum);
    },
    hiddenSteps: function (r) {
      this.options.hiddenSteps = r; // Hidden steps

      if (this.options.hiddenSteps && this.options.hiddenSteps.length > 0) {
        var mi = this;
        $.each(mi.steps, function (i, n) {
          if ($.inArray(i, mi.options.hiddenSteps) > -1) {
            $(n).parent('li').addClass('hidden');
          } else {
            $(n).parent('li').removeClass('hidden');
          }
        });
      }
    },
    theme: function (v) {
      if (this.options.theme === v) {
        return false;
      }

      this.main.removeClass('sw-theme-' + this.options.theme);
      this.options.theme = v;
      this.main.addClass('sw-theme-' + this.options.theme); // Trigger "themeChanged" event

      this._triggerEvent("themeChanged", [this.options.theme]);
    },
    next: function () {
      this._showNext();
    },
    prev: function () {
      this._showPrevious();
    },
    reset: function () {
      // Trigger "beginReset" event
      if (this._triggerEvent("beginReset") === false) {
        return false;
      } // Reset all elements and classes


      this.container.stop(true);
      this.pages.stop(true);
      this.pages.hide();
      this.current_index = null;

      this._setURLHash(this.steps.eq(this.options.selected).attr("href"));

      $(".sw-toolbar", this.main).remove();
      this.steps.removeClass();
      this.steps.parents('li').removeClass();
      this.steps.data('has-content', false);
      this.init(); // Trigger "endReset" event

      this._triggerEvent("endReset");
    },
    stepState: function (stepArray, state) {
      var mi = this;
      stepArray = $.isArray(stepArray) ? stepArray : [stepArray];
      var selSteps = $.grep(this.steps, function (n, i) {
        return $.inArray(i, stepArray) !== -1; //  && i !== mi.current_index
      });

      if (selSteps && selSteps.length > 0) {
        switch (state) {
          case 'disable':
            $(selSteps).parents('li').addClass('disabled');
            break;

          case 'enable':
            $(selSteps).parents('li').removeClass('disabled');
            break;

          case 'hide':
            $(selSteps).parents('li').addClass('hidden');
            break;

          case 'show':
            $(selSteps).parents('li').removeClass('hidden');
            break;

          case 'error-on':
            $(selSteps).parents('li').addClass('danger');
            break;

          case 'error-off':
            $(selSteps).parents('li').removeClass('danger');
            break;
        }
      }
    }
  }); // Wrapper for the plugin

  $.fn.smartWizard = function (options) {
    var args = arguments;
    var instance;

    if (options === undefined || typeof options === 'object') {
      return this.each(function () {
        if (!$.data(this, "smartWizard")) {
          $.data(this, "smartWizard", new SmartWizard(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      instance = $.data(this[0], 'smartWizard');

      if (options === 'destroy') {
        $.data(this, 'smartWizard', null);
      }

      if (instance instanceof SmartWizard && typeof instance[options] === 'function') {
        return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
      } else {
        return this;
      }
    }
  };
})(jQuery, window, document);