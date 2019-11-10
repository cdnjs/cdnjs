/*!
 * Submitter v0.3.0
 * https://github.com/fengyuanchen/submitter
 *
 * Copyright (c) 2014-2015 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2015-06-11T07:32:10.012Z
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define('submitter', ['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  var FormData = window.FormData,

      // Constants
      NAMESPACE = 'submitter',

      // Events
      EVENT_SUBMIT = 'submit.' + NAMESPACE,
      EVENT_START = 'start.' + NAMESPACE,
      EVENT_DONE = 'done.' + NAMESPACE,
      EVENT_FAIL = 'fail.' + NAMESPACE,
      EVENT_END = 'end.' + NAMESPACE;

  function Submitter(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Submitter.DEFAULTS, $.isPlainObject(options) && options);
    this.disabled = false;
    this.sync = false;
    this.init();
  }

  Submitter.prototype = {
    constructor: Submitter,

    init: function () {
      var options = this.options,
          $this = this.$element;

      if (!options.url) {
        options.url = $this.prop('action'); // Use the current page if not set
      }

      // The "options.type" is for versions of jQuery prior to 1.9.0
      if (!options.method || !options.type) {
        options.method = $this.prop('method');
      }

      if (!FormData && $this.find(':file').length) {
        this.sync = true;
        this.initIframe();
      }

      this.bind();
    },

    bind: function () {
      var options = this.options,
          $this = this.$element;

      if ($.isFunction(options.start)) {
        $this.on(EVENT_START, options.start);
      }

      if ($.isFunction(options.done)) {
        $this.on(EVENT_DONE, options.done);
      }

      if ($.isFunction(options.fail)) {
        $this.on(EVENT_FAIL, options.fail);
      }

      if ($.isFunction(options.end)) {
        $this.on(EVENT_END, options.end);
      }

      $this.on(EVENT_SUBMIT, $.proxy(this.submit, this));
    },

    unbind: function () {
      var options = this.options,
          $this = this.$element;

      if ($.isFunction(options.start)) {
        $this.off(EVENT_START, options.start);
      }

      if ($.isFunction(options.done)) {
        $this.off(EVENT_DONE, options.done);
      }

      if ($.isFunction(options.fail)) {
        $this.off(EVENT_FAIL, options.fail);
      }

      if ($.isFunction(options.end)) {
        $this.off(EVENT_END, options.end);
      }

      $this.off(EVENT_SUBMIT, this.submit);
    },

    submit: function (e) {
      var options = this.options,
          $this = this.$element,
          startEvent = $.Event(EVENT_START),
          ajaxOptions;

      if (this.disabled) {
        e.preventDefault();
        return;
      }

      $this.trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        e.preventDefault();
        return;
      }

      this.disabled = true;
      $this.find(':submit').prop('disabled', true);

      if (!this.sync) {
        e.preventDefault();

        ajaxOptions = $.extend({}, options, {
          success: $.proxy(this.success, this),
          error: $.proxy(this.error, this),
          complete: $.proxy(this.complete, this)
        });

        if (FormData) {
          ajaxOptions.data = new FormData($this[0]);
          ajaxOptions.processData = false;
          ajaxOptions.contentType = false;
        } else {
          ajaxOptions.data = $this.serialize();
        }

        $.ajax(ajaxOptions.url, ajaxOptions);
      }
    },

    success: function (data, textStatus, jqXHR) {
      var options = this.options;

      if ($.isFunction(options.success)) {
        options.success(data, textStatus, jqXHR);
      }

      this.$element.trigger(EVENT_DONE, data, textStatus);
    },

    error: function (jqXHR, textStatus, errorThrown) {
      var options = this.options;

      if ($.isFunction(options.error)) {
        options.error(jqXHR, textStatus, errorThrown);
      }

      this.$element.trigger(EVENT_FAIL, textStatus, errorThrown);
    },

    complete: function (jqXHR, textStatus) {
      var options = this.options,
          $this = this.$element;

      this.disabled = false;
      $this.find(':submit').prop('disabled', false);

      if ($.isFunction(options.complete)) {
        options.complete(jqXHR, textStatus);
      }

      $this.trigger(EVENT_END, textStatus);
    },

    destroy: function () {
      this.unbind();

      if (this.sync) {
        this.$iframe.off('load').remove();
      }

      this.$element.removeData(NAMESPACE);
    },

    initIframe: function () {
      var iframeName = NAMESPACE + (new Date()).getTime(),
          $iframe = $('<iframe name="' + iframeName + '"></iframe>').hide(),
          _this = this;

      // Ready iframe
      $iframe.one('load', function () {

        // Respond submit
        $iframe.on('load', function () {
          var message,
              data;

          try {
            data = $(this).contents().find('body').text();

            if (_this.options.dataType === 'json') {
              data = $.parseJSON(data);
            }
          } catch (e) {
            message = e.message;
          }

          if (message) {
            _this.error(null, 'error', message);
          } else {
            _this.success(data, 'success', null);
          }

          _this.complete(null, 'complete');
        });
      });

      this.$element.attr('target', iframeName).after($iframe);
      this.$iframe = $iframe;
    }
  };

  Submitter.DEFAULTS = {
    // Note: jQuery.ajax's options are available too.

    // Request URL, use form's "action" property by default
    // Type: String
    url: '',

    // Request method, use form's "method" property by default
    // Type: String
    method: '',

    // Events (shortcuts)
    // Type: Function
    start: null,
    done: null,
    fail: null,
    end: null
  };

  Submitter.setDefaults = function (options) {
    $.extend(Submitter.DEFAULTS, options);
  };

  // Save the other submitter
  Submitter.other = $.fn.submitter;

  // Register as jQuery plugin
  $.fn.submitter = function (options) {
    var args = [].slice.call(arguments, 1);

    return this.each(function () {
      var $this = $(this),
          data = $this.data(NAMESPACE),
          fn;

      if (!data) {
        if (/destroy/.test(options)) {
          return;
        }

        $this.data(NAMESPACE, (data = new Submitter(this, options)));
      }

      if (typeof options === 'string' && $.isFunction((fn = data[options]))) {
        fn.apply(data, args);
      }
    });
  };

  $.fn.submitter.Constructor = Submitter;
  $.fn.submitter.setDefaults = Submitter.setDefaults;

  // No conflict
  $.fn.submitter.noConflict = function () {
    $.fn.submitter = Submitter.other;
    return this;
  };

});
