/**
 * jquery-data-remote
 *
 * @see {@link https://github.com/codfish/jquery-data-remote}
 *
 * jQuery plugin that simplifies the common task of making api/remote requests
 * and injecting the response to the page. Optionally leverages js templating
 * engines. Inpired by ruby on rails' [unobtrusive scripting adapter for
 * jQuery](https://github.com/rails/jquery-ujs).
 */
$.fn.dataRemote = function dataRemote() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  /**
   * Default success callback for ajax requests.
   *
   * Handles hiding of loader image, debugging (if option is set),
   * and handling the ajax requests' response (levering handlebars if option
   * is set or handlebars template is found inside the target element).
   *
   * @param {jQuery} $target - jquery object containing the target element for the ajax response
   * @param {object} options - plugin options set during instantiation
   * @param {object} response - data response from the ajax request
   */
  function successCallback($target, options, response) {
    var source = undefined;
    var template = undefined;
    var html = undefined;
    var $template = undefined;

    $target.find('.loader-image').hide();

    if (options.debug) {
      $.fn.dataRemote.debug($target, response);
    }

    // Use handlebars if the option is set to true *or* if a handlebars template is found
    if (options.handlebars !== false && typeof Handlebars !== 'undefined' || $target.find('[type="text/x-handlebars-template"]').length) {
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
   * Default error callback for ajax requests.
   *
   * Hides the loader image, triggers debugging if it's turned on.
   *
   * @param {jQuery} $target - Target element for the ajax response.
   * @param {object} options - Plugin options set during instantiation.
   * @param {object} response - Data response from the ajax request.
   * @param {string} error - Textual portion of the HTTP status, i.e. "Not Found"
   * @return {undefined}
   */
  function errorCallback($target, options, response, error) {
    $target.find('.loader-image').hide();

    if (options.debug) {
      $.fn.dataRemote.debug($target, response, error);
    }
  }

  /**
   * Private helper method for debounce
   *
   * @param {function} func - Function to debounce.
   * @param {integer} wait - Amount of time to wait between events.
   * @param {boolean} [immediate] - Cancels the debounce if True.
   * @return {function} Function with debounce wrapper.
   */
  function debounce(func, wait, immediate) {
    var timeout = undefined;
    return function debounced() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var context = this;
      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /**
   * Private helper method for making the ajax request.
   *
   * @param {object} url - request url.
   * @param {object} settings - additional settings for the request.
   * @param {jQuery} settings.element - jQuery object containing the current data remote element.
   * @param {object} settings.options - data remote plugin options for current data remote element.
   * @param {jQuery} settings.$target - jQuery object where response will be injected.
   * @return {undefined}
   */
  function fetch(url, settings) {
    var $element = settings.element;
    var $target = settings.target;
    var options = settings.options;

    // display loader image while retrieving content
    if (options.loaderImg) {
      $target.prepend('\n        <div class="loader-image" style="clear: both;">\n          <img src="' + options.loaderImg + '" alt="Loading...">\n        </div>');
    }

    // make the ajax request. Trigger the callbacks using $element as the
    // context, making the value of `this` for the callbacks the $element
    $.ajax({
      url: url,
      data: options.data,
      type: options.type,
      dataType: options.dataType,
      cache: true,
      success: function success(response) {
        options.success.call($element, $target, options, response);
        options.complete.call($element, $target);
      },
      error: function error(response, status, _error) {
        options.error.call($element, $target, options, response, _error);
        options.complete.call($element, $target);
      }
    });
  }

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
    debounceEvents: ['keyup', 'keydown', 'keypress', 'scroll', 'resize'],
    success: successCallback, // gets passed 3 parameters ($target, options, response)
    error: errorCallback, // gets passed 4 parameters ($target, options, response, error)
    complete: function complete() {}, // callback fires after the request is made (on success OR error)
    before: function before() {} };

  // callback fires directly before the request is made
  return this.each(function (idx, element) {
    var $element = $(element);

    // Create a local copy of the options for each element. This will allow each
    // individual element to override options from its' data attributes.
    var options = $.extend({}, defaults, opts);
    options.dataType = $element.data('response-type') || options.dataType;
    options.eventType = $element.data('event-type') || options.eventType;
    options.type = $element.data('type') || options.type;
    options.url = $element.data('url') || options.url;
    options.data = $element.data('data') ? $element.data('data') : options.data;
    options.template = $element.data('template') || options.template;
    options.placement = $element.data('response-placement') || options.placement;
    options.target = $element.data('target') || options.target;
    options.debug = element.hasAttribute('data-debug') ? $element.data('debug') : options.debug;
    options.oneAndDone = element.hasAttribute('data-one-and-done') ? $element.data('one-and-done') : options.oneAndDone;
    options.handlebars = element.hasAttribute('data-handlebars') ? $element.data('handlebars') : options.handlebars;

    // if no target selector is given, default to actual element
    var $target = options.target ? $(options.target) : $element;

    // this is the callback function that will fire on whatever event
    // is provided for this element. It's responsible for actually triggering
    // the ajax request && the before callback
    var callback = function callback() {
      var evt = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (evt) {
        evt.preventDefault();
      }

      // if you're watching on keyup or change events, let's assume you want to
      // send the value of the element as a query parameter.
      // Think autosuggest search boxes.
      // <input data-event-type="keyup" name="q" data-target="#search-results">
      if (['keyup', 'change'].indexOf(options.eventType) !== -1) {
        options.data[this.name] = this.value;
      }

      // execute before request callback
      options.before.call($element, $target);

      // make the ajax request
      fetch(options.url, {
        element: $element,
        target: $target,
        options: options
      });
    };

    // if event type is 'load', execute the request immediately otherwise,
    // execute ajax request on specified type (click, submit, mouseover, etc.)
    if (options.eventType === 'load') {
      callback();
    } else {
      // use proper jQuery method based on oneAndDone option
      var method = options.oneAndDone ? 'one' : 'on';

      // if the event type is a "debounce event", make sure to
      // debounce the callback function
      if (options.debounceEvents.indexOf(options.eventType) !== -1) {
        callback = debounce(callback, 500);
      }

      $element[method](options.eventType, callback);
    } // end if else (options.eventType)
  }); // end this.each
}; // end $.fn.dataRemote

/**
 * Helper function for debugging.
 */
$.fn.dataRemote.debug = function debug(element, output, error) {
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
//# sourceMappingURL=jquery.data-remote.js.map
