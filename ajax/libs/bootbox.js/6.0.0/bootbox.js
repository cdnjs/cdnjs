/*! @preserve
 * bootbox.js
 * version: 6.0.0
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals (root is window)
    root.bootbox = factory(root.jQuery);
  }
}(this, function init($, undefined) {
  'use strict';

  let exports = {};

  let VERSION = '6.0.0';
  exports.VERSION = VERSION;

  let locales = {
    'en' : {
      OK      : 'OK',
      CANCEL  : 'Cancel',
      CONFIRM : 'OK'
    }
  };

  let templates = {
    dialog:         '<div class="bootbox modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"><div class="bootbox-body"></div></div></div></div></div>',
    header:         '<div class="modal-header"><h5 class="modal-title"></h5></div>',
    footer:         '<div class="modal-footer"></div>',
    closeButton:    '<button type="button" class="bootbox-close-button close btn-close" aria-hidden="true" aria-label="Close"></button>',
    form:           '<form class="bootbox-form"></form>',
    button:         '<button type="button" class="btn"></button>',
    option:         '<option value=""></option>',
    promptMessage:  '<div class="bootbox-prompt-message"></div>',
    inputs: {
      text:         '<input class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="text" />',
      textarea:     '<textarea class="bootbox-input bootbox-input-textarea form-control"></textarea>',
      email:        '<input class="bootbox-input bootbox-input-email form-control" autocomplete="off" type="email" />',
      select:       '<select class="bootbox-input bootbox-input-select form-select"></select>',
      checkbox:     '<div class="form-check checkbox"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-checkbox" type="checkbox" /></label></div>',
      radio:        '<div class="form-check radio"><label class="form-check-label"><input class="form-check-input bootbox-input bootbox-input-radio" type="radio" name="bootbox-radio" /></label></div>',
      date:         '<input class="bootbox-input bootbox-input-date form-control" autocomplete="off" type="date" />',
      time:         '<input class="bootbox-input bootbox-input-time form-control" autocomplete="off" type="time" />',
      number:       '<input class="bootbox-input bootbox-input-number form-control" autocomplete="off" type="number" />',
      password:     '<input class="bootbox-input bootbox-input-password form-control" autocomplete="off" type="password" />',
      range:        '<input class="bootbox-input bootbox-input-range form-control-range" autocomplete="off" type="range" />'
    }
  };


  let defaults = {
    // Default language used when generating buttons for alert, confirm, and prompt dialogs
    locale: 'en',
    // Show backdrop or not. Default to static so user has to interact with dialog
    backdrop: 'static',
    // Animate the modal in/out
    animate: true,
    // Additional class string applied to the top level dialog
    className: null,
    // Whether or not to include a close button
    closeButton: true,
    // Show the dialog immediately by default
    show: true,
    // Dialog container
    container: 'body',
    // Default value (used by the prompt helper)
    value: '',
    // Default input type (used by the prompt helper)
    inputType: 'text',
    // Custom error message to report if prompt fails validation
    errorMessage: null,
    // Switch button order from cancel/confirm (default) to confirm/cancel
    swapButtonOrder: false,
    // Center modal vertically in page
    centerVertical: false,
    // Append "multiple" property to the select when using the "prompt" helper
    multiple: false,
    // Automatically scroll modal content when height exceeds viewport height
    scrollable: false,
    // Whether or not to destroy the modal on hide
    reusable: false,
    // The element which triggered the dialog
    relatedTarget: null,
    // The size of the modal to generate
    size: null,
    // A unique indentifier for this modal
    id: null
  };


  // PUBLIC FUNCTIONS
  // *************************************************************************************************************

  /**
   * Return all currently registered locales, or a specific locale if "name" is defined
   * @param {string} [name]
   * @returns {(Object|Object[])} An array of the available locale objects, or a single locale object if {name} is not null
   */
  exports.locales = function (name) {
    return name ? locales[name] : locales;
  };


  /**
   * Register localized strings for the OK, CONFIRM, and CANCEL buttons
   * @param {string} name - The key used to identify the new locale in the locales array
   * @param {Object} values - An object containing the localized string for each of the OK, CANCEL, and CONFIRM properties of a locale
   * @returns The updated bootbox object
   */
  exports.addLocale = function (name, values) {
    $.each(['OK', 'CANCEL', 'CONFIRM'], function (_, v) {
      if (!values[v]) {
        throw new Error('Please supply a translation for "' + v + '"');
      }
    });

    locales[name] = {
      OK: values.OK,
      CANCEL: values.CANCEL,
      CONFIRM: values.CONFIRM
    };

    return exports;
  };

 
  /**
   * Remove a previously-registered locale
   * @param {string} name - The key identifying the locale to remove
   * @returns The updated bootbox object
   */
  exports.removeLocale = function (name) {
    if (name !== 'en') {
      delete locales[name];
    }
    else {
      throw new Error('"en" is used as the default and fallback locale and cannot be removed.');
    }

    return exports;
  };


  /**
   * Set the default locale
   * @param {string} name - The key identifying the locale to set as the default locale for all future bootbox calls 
   * @returns The updated bootbox object
   */
  exports.setLocale = function (name) {
    return exports.setDefaults('locale', name);
  };


  /**
   * Override default value(s) of Bootbox.
   * @returns The updated bootbox object
   */
  exports.setDefaults = function () {
    let values = {};

    if (arguments.length === 2) {
      // Allow passing of single key/value...
      values[arguments[0]] = arguments[1];
    } else {
      // ... and as an object too
      values = arguments[0];
    }

    $.extend(defaults, values);

    return exports;
  };


  /**
   * Hides all currently active Bootbox modals
   * @returns The current bootbox object
   */
  exports.hideAll = function () {
    $('.bootbox').modal('hide');

    return exports;
  };

 
  /**
   * Allows the base init() function to be overridden
   * @param {function} _$ - A function to be called when the bootbox instance is created
   * @returns The current bootbox object
   */
  exports.init = function (_$) {
    return init(_$ || $);
  };


  // CORE HELPER FUNCTIONS
  // *************************************************************************************************************

  /**
   * The core dialog helper function, which can be used to create any custom Bootstrap modal. 
   * @param {Object} options - An object used to configure the various properties which define a Bootbox dialog
   * @returns A jQuery object upon which Bootstrap's modal function has been called
   */
  exports.dialog = function (options) {
    if ($.fn.modal === undefined) {
      throw new Error(
        '"$.fn.modal" is not defined; please double check you have included the Bootstrap JavaScript library. See https://getbootstrap.com/docs/5.1/getting-started/introduction/ for more details.'
      );
    }

    options = sanitize(options);

    if ($.fn.modal.Constructor.VERSION) {
      options.fullBootstrapVersion = $.fn.modal.Constructor.VERSION;
      let i = options.fullBootstrapVersion.indexOf('.');
      options.bootstrap = options.fullBootstrapVersion.substring(0, i);
    }
    else {
      // Assuming version 2.3.2, as that was the last "supported" 2.x version
      options.bootstrap = '2';
      options.fullBootstrapVersion = '2.3.2';
      console.warn('Bootbox will *mostly* work with Bootstrap 2, but we do not officially support it. Please upgrade, if possible.');
    }

    let dialog = $(templates.dialog);
    let innerDialog = dialog.find('.modal-dialog');
    let body = dialog.find('.modal-body');
    let header = $(templates.header);
    let footer = $(templates.footer);
    let buttons = options.buttons;

    let callbacks = {
      onEscape: options.onEscape
    };

    body.find('.bootbox-body').html(options.message);

    // Only attempt to create buttons if at least one has been defined in the options object
    if (getKeyLength(options.buttons) > 0) {
      each(buttons, function (key, b) {
        let button = $(templates.button);
        button.data('bb-handler', key);
        button.addClass(b.className);

        switch (key) {
          case 'ok':
          case 'confirm':
            button.addClass('bootbox-accept');
            break;

          case 'cancel':
            button.addClass('bootbox-cancel');
            break;
        }

        button.html(b.label);

        if (b.id) {
          button.attr({ 'id': b.id });
        }

        if (b.disabled === true) {
          button.prop({ disabled: true });
        }

        footer.append(button);

        callbacks[key] = b.callback;
      });

      body.after(footer);
    }

    if (options.animate === true) {
      dialog.addClass('fade');
    }

    if (options.className) {
      dialog.addClass(options.className);
    }

    if (options.id) {
      dialog.attr({ 'id': options.id });
    }

    if (options.size) {
      // Requires Bootstrap 3.1.0 or higher
      if (options.fullBootstrapVersion.substring(0, 3) < '3.1') {
        console.warn('"size" requires Bootstrap 3.1.0 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
      }

      switch (options.size) {
        case 'small':
        case 'sm':
          innerDialog.addClass('modal-sm');
          break;

        case 'large':
        case 'lg':
          innerDialog.addClass('modal-lg');
          break;

        case 'extra-large':
        case 'xl':
          innerDialog.addClass('modal-xl');

          // Requires Bootstrap 4.2.0 or higher
          if (options.fullBootstrapVersion.substring(0, 3) < '4.2') {
            console.warn('Using size "xl"/"extra-large" requires Bootstrap 4.2.0 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
          }
          break;
      }
    }

    if (options.scrollable) {
      innerDialog.addClass('modal-dialog-scrollable');

      // Requires Bootstrap 4.3.0 or higher
      if (options.fullBootstrapVersion.substring(0, 3) < '4.3') {
        console.warn('Using "scrollable" requires Bootstrap 4.3.0 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
      }
    }

    if(options.title || options.closeButton) {
      if (options.title) {
        header.find('.modal-title').html(options.title);
      }
      else {
        header.addClass('border-0');
      }

      if (options.closeButton) {
        let closeButton = $(templates.closeButton);      
        if (options.bootstrap < 5) {
          closeButton.html('&times;');
        }

        /* Note: the close button for Bootstrap 5+ does not contain content */
        if(options.bootstrap < 4) {
          /* Bootstrap 3 and under */
          header.prepend(closeButton);
        }
        else {
          header.append(closeButton);
        }
      }

      body.before(header);
    }

    if (options.centerVertical) {
      innerDialog.addClass('modal-dialog-centered');

      // Requires Bootstrap 4.0.0-beta.3 or higher
      if (options.fullBootstrapVersion < '4.0.0') {
        console.warn('"centerVertical" requires Bootstrap 4.0.0-beta.3 or higher. You appear to be using ' + options.fullBootstrapVersion + '. Please upgrade to use this option.');
      }
    }

    // Bootstrap event listeners; these handle extra setup & teardown required after the underlying modal has performed certain actions.

    if(!options.reusable) {
      // make sure we unbind any listeners once the dialog has definitively been dismissed
      dialog.one('hide.bs.modal', { dialog: dialog }, unbindModal);
      dialog.one('hidden.bs.modal', { dialog: dialog }, destroyModal);
    }

    if (options.onHide) {
      if ($.isFunction(options.onHide)) {
        dialog.on('hide.bs.modal', options.onHide);
      }
      else {
        throw new Error('Argument supplied to "onHide" must be a function');
      }
    }

    if (options.onHidden) {
      if ($.isFunction(options.onHidden)) {
        dialog.on('hidden.bs.modal', options.onHidden);
      }
      else {
        throw new Error('Argument supplied to "onHidden" must be a function');
      }
    }

    if (options.onShow) {
      if ($.isFunction(options.onShow)) {
        dialog.on('show.bs.modal', options.onShow);
      }
      else {
        throw new Error('Argument supplied to "onShow" must be a function');
      }
    }

    dialog.one('shown.bs.modal', { dialog: dialog }, focusPrimaryButton);

    if (options.onShown) {
      if ($.isFunction(options.onShown)) {
        dialog.on('shown.bs.modal', options.onShown);
      }
      else {
        throw new Error('Argument supplied to "onShown" must be a function');
      }
    }

    // Bootbox event listeners; used to decouple some behaviours from their respective triggers

    if (options.backdrop === true) {
      let startedOnBody = false;

      // Prevents the event from propagating to the backdrop, when something inside the dialog is clicked
      dialog.on('mousedown', '.modal-content', function(e) {
        e.stopPropagation();

        startedOnBody = true;
      });

      // A boolean true/false according to the Bootstrap docs should show a dialog the user can dismiss by clicking on the background.
      // We always only ever pass static/false to the actual $.modal function because with "true" we can't trap this event (the .modal-backdrop swallows it).
      // However, we still want to sort-of respect true and invoke the escape mechanism instead
      dialog.on('click.dismiss.bs.modal', function (e) {
        if (startedOnBody || e.target !== e.currentTarget) {
          return;
        }

        dialog.trigger('escape.close.bb');
      });
    }

    dialog.on('escape.close.bb', function (e) {
      // The if() statement looks redundant but it isn't; without it, if we *didn't* have an onEscape handler then processCallback would automatically dismiss the dialog
      if (callbacks.onEscape) {
        processCallback(e, dialog, callbacks.onEscape);
      }
    });

    dialog.on('click', '.modal-footer button:not(.disabled)', function (e) {
      let callbackKey = $(this).data('bb-handler');

      if (callbackKey !== undefined) {
        // Only process callbacks for buttons we recognize:
        processCallback(e, dialog, callbacks[callbackKey]);
      }
    });

    dialog.on('click', '.bootbox-close-button', function (e) {
      // onEscape might be falsy, but that's fine; the fact is if the user has managed to click the close button we have to close the dialog, callback or not
      processCallback(e, dialog, callbacks.onEscape);
    });

    dialog.on('keyup', function (e) {
      if (e.which === 27) {
        dialog.trigger('escape.close.bb');
      }
    });

    /*
    The remainder of this method simply deals with adding our dialog element to the DOM, augmenting it with 
    Bootstrap's modal functionality and then giving the resulting object back to our caller
    */

    $(options.container).append(dialog);

    dialog.modal({
      backdrop: options.backdrop,
      keyboard: false,
      show: false
    });

    if (options.show) {
      dialog.modal('show', options.relatedTarget);
    }

    return dialog;
  };


  /**
   * Helper function to simulate the native alert() behavior. **NOTE**: This is non-blocking, so any code that must happen after the alert is dismissed should be placed within the callback function for this alert.
   * @returns  A jQuery object upon which Bootstrap's modal function has been called
   */
  exports.alert = function () {
    let options;

    options = mergeDialogOptions('alert', ['ok'], ['message', 'callback'], arguments);

    // @TODO: can this move inside exports.dialog when we're iterating over each button and checking its button.callback value instead?
    if (options.callback && !$.isFunction(options.callback)) {
      throw new Error('alert requires the "callback" property to be a function when provided');
    }

    // Override the ok and escape callback to make sure they just invoke the single user-supplied one (if provided)
    options.buttons.ok.callback = options.onEscape = function () {
      if ($.isFunction(options.callback)) {
        return options.callback.call(this);
      }

      return true;
    };

    return exports.dialog(options);
  };


  /**
   * Helper function to simulate the native confirm() behavior. **NOTE**: This is non-blocking, so any code that must happen after the confirm is dismissed should be placed within the callback function for this confirm.
   * @returns A jQuery object upon which Bootstrap's modal function has been called
   */
  exports.confirm = function () {
    let options;

    options = mergeDialogOptions('confirm', ['cancel', 'confirm'], ['message', 'callback'], arguments);

    // confirm specific validation; they don't make sense without a callback so make sure it's present
    if (!$.isFunction(options.callback)) {
      throw new Error('confirm requires a callback');
    }

    // Overrides; undo anything the user tried to set they shouldn't have
    options.buttons.cancel.callback = options.onEscape = function () {
      return options.callback.call(this, false);
    };

    options.buttons.confirm.callback = function () {
      return options.callback.call(this, true);
    };

    return exports.dialog(options);
  };


  /**
   * Helper function to simulate the native prompt() behavior. **NOTE**: This is non-blocking, so any code that must happen after the prompt is dismissed should be placed within the callback function for this prompt.
   * @returns A jQuery object upon which Bootstrap's modal function has been called
   */
  exports.prompt = function () {
    let options;
    let promptDialog;
    let form;
    let input;
    let shouldShow;
    let inputOptions;

    // We have to create our form first, otherwise its value is undefined when gearing up our options.
    // @TODO this could be solved by allowing message to be a function instead...
    form = $(templates.form);

    // prompt defaults are more complex than others in that users can override more defaults
    options = mergeDialogOptions('prompt', ['cancel', 'confirm'], ['title', 'callback'], arguments);

    if (!options.value) {
      options.value = defaults.value;
    }

    if (!options.inputType) {
      options.inputType = defaults.inputType;
    }

    // Capture the user's 'show' value; we always set this to false before spawning the dialog to give us a chance to attach some handlers to it, but we need to make sure we respect a preference not to show it
    shouldShow = (options.show === undefined) ? defaults.show : options.show;

    // This is required prior to calling the dialog builder below - we need to add an event handler just before the prompt is shown
    options.show = false;

    // Handles the 'cancel' action
    options.buttons.cancel.callback = options.onEscape = function () {
      return options.callback.call(this, null);
    };

    // Prompt submitted - extract the prompt value. This requires a bit of work, given the different input types available.
    options.buttons.confirm.callback = function () {
      let value;

      if (options.inputType === 'checkbox') {
        value = input.find('input:checked').map(function () {
          return $(this).val();
        }).get();
      } else if (options.inputType === 'radio') {
        value = input.find('input:checked').val();
      }
      else {
        let el = input[0];
        
        // Clear any previous custom error message
        if(options.errorMessage) {
          el.setCustomValidity('');
        }

        if (el.checkValidity && !el.checkValidity()) {
          // If a custom error message was provided, add it now
          if(options.errorMessage){
            el.setCustomValidity(options.errorMessage);
          }
          
          if(el.reportValidity) { 
            el.reportValidity();
          }

          // prevents button callback from being called
          return false;
        } else {
          if (options.inputType === 'select' && options.multiple === true) {
            value = input.find('option:selected').map(function () {
              return $(this).val();
            }).get();
          }
          else {
            value = input.val();
          }
        }
      }

      return options.callback.call(this, value);
    };

    // prompt-specific validation
    if (!options.title) {
      throw new Error('prompt requires a title');
    }

    if (!$.isFunction(options.callback)) {
      throw new Error('prompt requires a callback');
    }

    if (!templates.inputs[options.inputType]) {
      throw new Error('Invalid prompt type');
    }

    // Create the input based on the supplied type
    input = $(templates.inputs[options.inputType]);

    switch (options.inputType) {
      case 'text':
      case 'textarea':
      case 'email':
      case 'password':
        input.val(options.value);

        if (options.placeholder) {
          input.attr('placeholder', options.placeholder);
        }

        if (options.pattern) {
          input.attr('pattern', options.pattern);
        }

        if (options.maxlength) {
          input.attr('maxlength', options.maxlength);
        }

        if (options.required) {
          input.prop({ 'required': true });
        }

        if (options.rows && !isNaN(parseInt(options.rows))) {
          if (options.inputType === 'textarea') {
            input.attr({ 'rows': options.rows });
          }
        }
        break;

      case 'date':
      case 'time':
      case 'number':
      case 'range':
        input.val(options.value);

        if (options.placeholder) {
          input.attr('placeholder', options.placeholder);
        }

        if (options.pattern) {
          input.attr('pattern', options.pattern);
        }
        else {
          if(options.inputType === 'date') {
            // Add the ISO-8601 short date format as a fallback for browsers without native type="date" support
            input.attr('pattern', '\d{4}-\d{2}-\d{2}');
          }
          else if(options.inputType === 'time') {
            // Add an HH:MM pattern as a fallback for browsers without native type="time" support
            input.attr('pattern', '\d{2}:\d{2}');
          }
        }

        if (options.required) {
          input.prop({ 'required': true });
        }

        // These input types have extra attributes which affect their input validation.
        // Warning: For most browsers, date inputs are buggy in their implementation of 'step', so this attribute will have no effect. Therefore, we don't set the attribute for date inputs.
        // @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date#Setting_maximum_and_minimum_dates
        if (options.inputType !== 'date') {
          if (options.step) {
            if (options.step === 'any' || (!isNaN(options.step) && parseFloat(options.step) > 0)) {
              input.attr('step', options.step);
            }
            else {
              throw new Error('"step" must be a valid positive number or the value "any". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-step for more information.');
            }
          }
        }

        if (minAndMaxAreValid(options.inputType, options.min, options.max)) {
          if (options.min !== undefined) {
            input.attr('min', options.min);
          }
          if (options.max !== undefined) {
            input.attr('max', options.max);
          }
        }
        break;

      case 'select':
        let groups = {};
        inputOptions = options.inputOptions || [];

        if (!$.isArray(inputOptions)) {
          throw new Error('Please pass an array of input options');
        }

        if (!inputOptions.length) {
          throw new Error('prompt with "inputType" set to "select" requires at least one option');
        }

        if (options.required) {
          input.prop({ 'required': true });
        }

        if (options.multiple) {
          input.prop({ 'multiple': true });
        }

        each(inputOptions, function (_, option) {
          // Assume the element to attach to is the input...
          let elem = input;

          if (option.value === undefined || option.text === undefined) {
            throw new Error('each option needs a "value" property and a "text" property');
          }

          // ... but override that element if this option sits in a group

          if (option.group) {
            // Initialise group if necessary
            if (!groups[option.group]) {
              groups[option.group] = $('<optgroup />').attr('label', option.group);
            }

            elem = groups[option.group];
          }

          let o = $(templates.option);
          o.attr('value', option.value).text(option.text);
          elem.append(o);
        });

        each(groups, function (_, group) {
          input.append(group);
        });

        // Safe to set a select's value as per a normal input
        input.val(options.value);
        if (options.bootstrap < 5) {
          input.removeClass('form-select').addClass('form-control');
        }
        break;

      case 'checkbox':
        let checkboxValues = $.isArray(options.value) ? options.value : [options.value];
        inputOptions = options.inputOptions || [];

        if (!inputOptions.length) {
          throw new Error('prompt with "inputType" set to "checkbox" requires at least one option');
        }

        // Checkboxes have to nest within a containing element, so they break the rules a bit and we end up re-assigning our 'input' element to this container instead
        input = $('<div class="bootbox-checkbox-list"></div>');

        each(inputOptions, function (_, option) {
          if (option.value === undefined || option.text === undefined) {
            throw new Error('each option needs a "value" property and a "text" property');
          }

          let checkbox = $(templates.inputs[options.inputType]);

          checkbox.find('input').attr('value', option.value);
          checkbox.find('label').append('\n' + option.text);

          // We've ensured values is an array, so we can always iterate over it
          each(checkboxValues, function (_, value) {
            if (value === option.value) {
              checkbox.find('input').prop('checked', true);
            }
          });

          input.append(checkbox);
        });
        break;

      case 'radio':
        // Make sure that value is not an array (only a single radio can ever be checked)
        if (options.value !== undefined && $.isArray(options.value)) {
          throw new Error('prompt with "inputType" set to "radio" requires a single, non-array value for "value"');
        }

        inputOptions = options.inputOptions || [];

        if (!inputOptions.length) {
          throw new Error('prompt with "inputType" set to "radio" requires at least one option');
        }

        // Radiobuttons have to nest within a containing element, so they break the rules a bit and we end up re-assigning our 'input' element to this container instead
        input = $('<div class="bootbox-radiobutton-list"></div>');

        // Radiobuttons should always have an initial checked input checked in a "group".
        // If value is undefined or doesn't match an input option, select the first radiobutton
        let checkFirstRadio = true;

        each(inputOptions, function (_, option) {
          if (option.value === undefined || option.text === undefined) {
            throw new Error('each option needs a "value" property and a "text" property');
          }

          let radio = $(templates.inputs[options.inputType]);

          radio.find('input').attr('value', option.value);
          radio.find('label').append('\n' + option.text);

          if (options.value !== undefined) {
            if (option.value === options.value) {
              radio.find('input').prop('checked', true);
              checkFirstRadio = false;
            }
          }

          input.append(radio);
        });

        if (checkFirstRadio) {
          input.find('input[type="radio"]').first().prop('checked', true);
        }
        break;
    }

    // Now place it in our form
    form.append(input);

    form.on('submit', function (e) {
      e.preventDefault();
      // Fix for SammyJS (or similar JS routing library) hijacking the form post.
      e.stopPropagation();

      // @TODO can we actually click *the* button object instead?
      // e.g. buttons.confirm.click() or similar
      promptDialog.find('.bootbox-accept').trigger('click');
    });

    if ($.trim(options.message) !== '') {
      // Add the form to whatever content the user may have added.
      let message = $(templates.promptMessage).html(options.message);
      form.prepend(message);
      options.message = form;
    }
    else {
      options.message = form;
    }

    // Generate the dialog
    promptDialog = exports.dialog(options);

    // Clear the existing handler focusing the submit button...
    promptDialog.off('shown.bs.modal', focusPrimaryButton);

    // ...and replace it with one focusing our input, if possible
    promptDialog.on('shown.bs.modal', function () {
      // Need the closure here since input isn'tcan object otherwise
      input.focus();
    });

    if (shouldShow === true) {
      promptDialog.modal('show');
    }

    return promptDialog;
  };


  // INTERNAL FUNCTIONS
  // *************************************************************************************************************

  // Map a flexible set of arguments into a single returned object.
  // If args.length is already one just return it, otherwise use the properties argument to map the unnamed args to object properties.
  // So in the latter case:
  //
  //    mapArguments(["foo", $.noop], ["message", "callback"])
  //  
  //  results in
  //
  //    { message: "foo", callback: $.noop }
  //
  function mapArguments(args, properties) {
    let argsLength = args.length;
    let options = {};

    if (argsLength < 1 || argsLength > 2) {
      throw new Error('Invalid argument length');
    }

    if (argsLength === 2 || typeof args[0] === 'string') {
      options[properties[0]] = args[0];
      options[properties[1]] = args[1];
    } else {
      options = args[0];
    }

    return options;
  }


  // Merge a set of default dialog options with user supplied arguments
  function mergeArguments(defaults, args, properties) {
    return $.extend(
      // Deep merge
      true,
      // Ensure the target is an empty, unreferenced object
      {},
      // The base options object for this type of dialog (often just buttons)
      defaults,
      // 'args' could be an object or array; if it's an array properties will map it to a proper options object
      mapArguments(args, properties)
    );
  }


  // This entry-level method makes heavy use of composition to take a simple range of inputs and return valid options suitable for passing to bootbox.dialog
  function mergeDialogOptions(className, labels, properties, args) {
    let locale;
    if (args && args[0]) {
      locale = args[0].locale || defaults.locale;
      let swapButtons = args[0].swapButtonOrder || defaults.swapButtonOrder;

      if (swapButtons) {
        labels = labels.reverse();
      }
    }

    // Build up a base set of dialog properties
    let baseOptions = {
      className: 'bootbox-' + className,
      buttons: createLabels(labels, locale)
    };

    // Ensure the buttons properties generated, *after* merging with user args are still valid against the supplied labels
    return validateButtons(
      // Merge the generated base properties with user supplied arguments
      mergeArguments(
        baseOptions,
        args,
        // If args.length > 1, properties specify how each arg maps to an object key
        properties
      ),
      labels
    );
  }


  // Checks each button object to see if key is valid. 
  // This function will only be called by the alert, confirm, and prompt helpers. 
  function validateButtons(options, buttons) {
    let allowedButtons = {};
    each(buttons, function (key, value) {
      allowedButtons[value] = true;
    });

    each(options.buttons, function (key) {
      if (allowedButtons[key] === undefined) {
        throw new Error('button key "' + key + '" is not allowed (options are ' + buttons.join(' ') + ')');
      }
    });

    return options;
  }


  // From a given list of arguments, return a suitable object of button labels.
  // All this does is normalise the given labels and translate them where possible.
  // e.g. "ok", "confirm" -> { ok: "OK", cancel: "Annuleren" }
  function createLabels(labels, locale) {
    let buttons = {};

    for (let i = 0, j = labels.length; i < j; i++) {
      let argument = labels[i];
      let key = argument.toLowerCase();
      let value = argument.toUpperCase();

      buttons[key] = {
        label: getText(value, locale)
      };
    }

    return buttons;
  }


  // Get localized text from a locale. Defaults to 'en' locale if no locale provided or a non-registered locale is requested
  function getText(key, locale) {
    let labels = locales[locale];

    return labels ? labels[key] : locales.en[key];
  }


  // Filter and tidy up any user supplied parameters to this dialog.
  // Also looks for any shorthands used and ensures that the options which are returned are all normalized properly
  function sanitize(options) {
    let buttons;
    let total;

    if (typeof options !== 'object') {
      throw new Error('Please supply an object of options');
    }

    if (!options.message) {
      throw new Error('"message" option must not be null or an empty string.');
    }

    // Make sure any supplied options take precedence over defaults
    options = $.extend({}, defaults, options);

    // Make sure backdrop is either true, false, or 'static'
    if (!options.backdrop) {
      options.backdrop = (options.backdrop === false || options.backdrop === 0) ? false : 'static';
    } else {
      options.backdrop = typeof options.backdrop === 'string' && options.backdrop.toLowerCase() === 'static' ? 'static' : true;
    } 

    // No buttons is still a valid dialog but it's cleaner to always have a buttons object to iterate over, even if it's empty
    if (!options.buttons) {
      options.buttons = {};
    }
    
    buttons = options.buttons;

    total = getKeyLength(buttons);

    each(buttons, function (key, button, index) {
      if ($.isFunction(button)) {
        // Short form, assume value is our callback. Since button isn't an object it isn't a reference either so re-assign it
        button = buttons[key] = {
          callback: button
        };
      }

      // Before any further checks, make sure button is the correct type
      if ($.type(button) !== 'object') {
        throw new Error('button with key "' + key + '" must be an object');
      }

      if (!button.label) {
        // The lack of an explicit label means we'll assume the key is good enough
        button.label = key;
      }

      if (!button.className) {
        let isPrimary = false;
        if (options.swapButtonOrder) {
          isPrimary = index === 0;
        }
        else {
          isPrimary = index === total - 1;
        }

        if (total <= 2 && isPrimary) {
          // always add a primary to the main option in a one or two-button dialog
          button.className = 'btn-primary';
        } 
        else {
          // adding both classes allows us to target both BS3 and BS4+ without needing to check the version
          button.className = 'btn-secondary btn-default';
        }
      }
    });

    return options;
  }


  // Returns a count of the properties defined on the object
  function getKeyLength(obj) {
    return Object.keys(obj).length;
  }


  // Tiny wrapper function around jQuery.each; just adds index as the third parameter
  function each(collection, iterator) {
    let index = 0;
    $.each(collection, function (key, value) {
      iterator(key, value, index++);
    });
  }


  function focusPrimaryButton(e) {
    e.data.dialog.find('.bootbox-accept').first().trigger('focus');
  }


  function destroyModal(e) {
    // Ensure we don't accidentally intercept hidden events triggered by children of the current dialog. 
    // We shouldn't need to handle this anymore, now that Bootstrap namespaces its events, but still worth doing.
    if (e.target === e.data.dialog[0]) {
      e.data.dialog.remove();
    }
  }


  function unbindModal(e) {
    if (e.target === e.data.dialog[0]) {
      e.data.dialog.off('escape.close.bb');
      e.data.dialog.off('click');
    }
  }


  //  Handle the invoked dialog callback
  function processCallback(e, dialog, callback) {
    e.stopPropagation();
    e.preventDefault();

    // By default we assume a callback will get rid of the dialog, although it is given the opportunity to override this

    // If the callback can be invoked and it *explicitly returns false*, then we'll set a flag to keep the dialog active...
    let preserveDialog = $.isFunction(callback) && callback.call(dialog, e) === false;

    // ... otherwise we'll bin it
    if (!preserveDialog) {
      dialog.modal('hide');
    }
  }

  // Validate `min` and `max` values based on the current `inputType` value
  function minAndMaxAreValid(type, min, max) {
    let result = false;
    let minValid = true;
    let maxValid = true;

    if (type === 'date') {
      if (min !== undefined && !(minValid = dateIsValid(min))) {
        console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your min value may not be enforced by this browser.');
      }
      else if (max !== undefined && !(maxValid = dateIsValid(max))) {
        console.warn('Browsers which natively support the "date" input type expect date values to be of the form "YYYY-MM-DD" (see ISO-8601 https://www.iso.org/iso-8601-date-and-time-format.html). Bootbox does not enforce this rule, but your max value may not be enforced by this browser.');
      }
    }
    else if (type === 'time') {
      if (min !== undefined && !(minValid = timeIsValid(min))) {
        throw new Error('"min" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.');
      }
      else if (max !== undefined && !(maxValid = timeIsValid(max))) {
        throw new Error('"max" is not a valid time. See https://www.w3.org/TR/2012/WD-html-markup-20120315/datatypes.html#form.data.time for more information.');
      }
    }
    else {
      if (min !== undefined && isNaN(min)) {
        minValid = false;
        throw new Error('"min" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-min for more information.');
      }

      if (max !== undefined && isNaN(max)) {
        maxValid = false;
        throw new Error('"max" must be a valid number. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.');
      }
    }

    if (minValid && maxValid) {
      if (max <= min) {
        throw new Error('"max" must be greater than "min". See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-max for more information.');
      }
      else {
        result = true;
      }
    }

    return result;
  }

  function timeIsValid(value) {
    return /([01][0-9]|2[0-3]):[0-5][0-9]?:[0-5][0-9]/.test(value);
  }

  function dateIsValid(value) {
    return /(\d{4})-(\d{2})-(\d{2})/.test(value);
  }

  //  The Bootbox object
  return exports;
}));
