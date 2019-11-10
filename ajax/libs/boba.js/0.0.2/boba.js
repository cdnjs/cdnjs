(function() {
  var Boba = (function() {
    var defaults = {
      pageName: "page",
      siteName: "site",
      defaultCategory: null,
      defaultAction: null,
      defaultLabel: null
    };

    function Boba(opts) {
      this.ga = this._getGA();
      if (typeof this.ga !== "undefined") {
        // Extend defaults with options.
        this.opts = $.extend(defaults, opts);

        // Watch anything defined in the options.
        if (typeof this.opts.watch !== "undefined") {
          for (var i = this.opts.watch.length - 1; i >= 0; i--) {
            this.watch.apply(this, this.opts.watch[i]);
          };
        }

        this.pageName = this.opts.pageName;
        this.siteName = this.opts.siteName;

        this.trackLinks = $.proxy(this.trackLinks, this);
        this.push = $.proxy(this.push, this);
        this.watch = $.proxy(this.watch, this);
        this._onTrackedClick = $.proxy(this._onTrackedClick, this);
      } else {
        console.warn("Google Analytics not found. Boba could not initialize.");
      }

      return this;
    }


    //
    // Instance methods.
    //

    Boba.prototype = {
      watch: function watch(eventType, selector, func) {
        var trackingFunction = function(event) {
          this.push(func(event));
        };
        $("body").on(
          eventType + ".tracker",
          selector,
          $.proxy(trackingFunction, this)
        );
        return this;
      },

      trackLinks: function trackLinks(selector) {
        selector = selector || '.js-track';
        this.watch('click', selector, this._onTrackedClick);
        return this;
      },

      push: function bobaInstancePush(data) {
        data = [
          data.gaCategory || data.category || this.opts.defaultCategory,
          data.gaAction   || data.action   || this.opts.defaultAction,
          data.gaLabel    || data.label    || this.opts.defaultLabel
        ];
        this.ga.apply(null, data);
        return this;
      },

      _onTrackedClick: function trackClick(event) {
        if (this.ga) {
          return $(event.currentTarget).data();
        }
      },

      // Constructs a Google Analytics function.
      _getGA: function getGA() {
        var ga;
        if (typeof window.ga !== "undefined" && window.ga !== null) {
          ga = function gapush() {
            // Prepend "send" and "event" to the array and push it.
            var args = Array.prototype.slice.call(arguments);
            args.unshift("send", "event");
            window.ga.apply(window, args);
          };
        } else if (typeof window._gaq !== "undefined" && window._gaq !== null) {
          ga = function gaqpush() {
            // Prepend "_trackEvent" to the array and push it.
            var args = Array.prototype.slice.call(arguments);
            args.unshift("_trackEvent");
            window._gaq.push.apply(window, args);
          };
        }
        return ga;
      }
    };

    return Boba;
  }());
  module.exports = Boba;
  window.Boba = Boba;
}());
