/**
 * jQuery dataRemote Plugin
 * http://github.com/codonnell822/jquery-dataremote
 * Copyright 2014-2015, Chris O'Donnell
 *
 * Plugin to help make handling ajax requests easier.
 * Name inspired by Ruby on Rails
 */
;(function($, window, undefined) {
  "use strict";

  $.fn.dataRemote = function(opts) {
    // Default Settings
    var defaults = {
      url: null, // request url
      data: {}, // request data
      debug: false,
      eventType: 'load', // js event type to fire data request on (load, click, submit, mouseover, custom, etc.)
      dataType: 'json', // data type that's expected in response from your request
      type: 'GET', // type of request (currently only supports GET)
      target: '', // selector of the element where you want your response injected
      handlebars: false, // use handlebars to render the response?
      template: '', // handlebar template selector. by default it will look inside target
      placement: 'html', // where to inject response relative to target (jquery DOM insertion methods <html|append|prepend|before|after>)
      loaderImg: null, // target selector for data response
      oneAndDone: true, // whether to remove the event binding after the first time running
      success: successCallback, // gets passed 3 parameters ($target, options, response)
      error: errorCallback, // gets passed 4 parameters ($target, options, response, error)
      complete: function($target) {}, // callback fires after the request is made (on success OR error)
      before: function($target) {} // callback fires directly before the request is made
    };

    // Extend our default options with those provided when instantiating
    var options = $.extend({}, defaults, opts);

    /**
     * Default success callback for ajax requests.
     *
     * Handles hiding of loader image, debugging (if option is set),
     * and handling the ajax requests' response (levering handlebars if option
     * is set or handlebars template is found inside the target element).
     *
     * @param  {jQuery} $target  jquery object containing the target element for the ajax response
     * @param  {object} options  plugin options set during instantiation
     * @param  {object} response data response from the ajax request
     */
    function successCallback($target, options, response) {
      var source;
      var template;
      var html;
      var $template;

      $target.find('.loader-image').hide();

      if (options.debug) {
        $.fn.dataRemote.debug($target, response);
      }

      // Use handlebars if the option is set to true *or* if a handlebars template is found
      if (options.handlebars !== false || $target.find('[type="text/x-handlebars-template"]').length) {
        $template = options.template ? $(options.template) : $target.find('[type="text/x-handlebars-template"]');
        source = $template.html();
        template = Handlebars.compile(source);
        html = template(response);
      } else {
        html = response;
      }

      // use proper jQuery method based on append option
      // if append == true, append results to target element,
      // or else replace inner html with results
      var validPlacements = ['html', 'append', 'prepend', 'after', 'before'];
      var placementIsValid = validPlacements.indexOf(options.placement) !== -1;
      if (!placementIsValid) {
        return;
      }
      $target[options.placement](html);
    }

    /**
     * Default error callback for ajax requests
     *
     * Hides the loader image, triggers debugging if it's turned on.
     *
     * @param  {jQuery} $target  jquery object containing the target element for the ajax response
     * @param  {object} options  plugin options set during instantiation
     * @param  {object} response data response from the ajax request
     * @param  {string} error    textual portion of the HTTP status, i.e. "Not Found" or "Internal Server Error."
     */
    function errorCallback($target, options, response, error) {
      $target.find('.loader-image').hide();

      if (options.debug) {
        $.fn.dataRemote.debug($target, response, error);
      }
    }

    /**
     * Private helper method for making a get request
     *
     * @param {object} url       url to query
     * @param {object} settings  Additional settings for the request
     * {
     *    @param {object} context  the value of `this` provided for the callbacks
     *    @param {object} options  options for current request
     *    @param {object} $target  the jquery target element to inject response
     * }
     * @return {void}
     */
    function get(url, settings) {
      var $context = settings.context;
      var $target = settings.target;
      var options = settings.options;

      // display loader image while retrieving content
      if (options.loaderImg) {
        $target.prepend(String() +
          '<div class="loader-image" style="clear: both;">' +
            '<img src="' + options.loaderImg + '" alt="Loading...">' +
          '</div>'
        );
      }

      $.ajax({
        url: url,
        data: options.data,
        type: options.type,
        dataType: options.dataType,
        cache: true,
        success: function(response) {
          options.success.call($context, $target, options, response);
          options.complete.call($context, $target);
        },
        error: function(response, status, error) {
          options.error.call($context, $target, options, response, error);
          options.complete.call($context, $target);
        }
      });
    }

    return this.each(function(idx, element) {
      var $element = $(element);

      // set a local scope options variable for each element and
      // override options from data attributes of said element if set
      var _options = options;
      _options.dataType = $element.data('response-type') || options.dataType;
      _options.eventType = $element.data('event-type') || options.eventType;
      _options.type = $element.data('type') || options.type;
      _options.url = $element.data('url') || options.url;
      _options.data = $element.data('data') ? $element.data('data') : options.data;
      _options.oneAndDone = !!$element.data('one-and-done') || options.oneAndDone;
      _options.handlebars = !!$element.data('handlebars') || options.handlebars;
      _options.template = $element.data('template') || options.template;
      _options.placement = $element.data('response-placement') || options.placement;
      _options.debug = !!$element.data('debug') || options.debug;
      _options.target = $element.data('target') || options.target;

      // if no target selector is given, default to actual element
      var $target = _options.target ? $(_options.target) : $element;

      // if event type is 'load', execute the request immediately otherwise,
      // execute ajax request on specified type (click, submit, mouseover, etc.)
      if (_options.eventType === 'load') {
        _options.before.call($element, $target);

        // execute ajax request immediately
        get(_options.url, {
          context: $element,
          target: $target,
          options: _options,
        });
      } else {
        // use proper jQuery method based on oneAndDone option
        var method = _options.oneAndDone === true ? 'one' : 'on';

        // bind to specific event type
        $element[method](_options.eventType, function(e) {
          e.preventDefault();

          // execute before request callback
          _options.before.call($element, $target);

          get(_options.url, {
            context: $element,
            target: $target,
            options: _options,
          });
        });
      } // end if else (_options.eventType)
    }); // end this.each
  }; // end $.fn.dataRemote

  /**
   * Helper function for debugging
   */
  $.fn.dataRemote.debug = function(element, output, error) {
    if (window.console && window.console.log) {
      window.console.log('Element: ');
      window.console.log(element);
      window.console.log('Response: ');
      window.console.log(output);
      if (error) {
        window.console.log(' -> Error: ');
        window.console.log(error);
      }
      window.console.log('------------');
    }
  };

}(jQuery, window));
