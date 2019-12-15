/*
 *  email-autocomplete - 0.1.3
 *  jQuery plugin that displays in-place autocomplete suggestions for email input fields.
 *  
 *
 *  Made by Low Yong Zhen <yz@stargate.io> 
 */
"use strict";

(function ($, window, document, undefined) {

  var pluginName = "emailautocomplete";
  var defaults = {
    suggClass: "eac-sugg",
    domains: ["yahoo.com" ,"hotmail.com" ,"gmail.com" ,"me.com" ,"aol.com" ,"mac.com" ,"live.com" ,"comcast.net" ,"googlemail.com" ,"msn.com" ,"hotmail.co.uk" ,"yahoo.co.uk" ,"facebook.com" ,"verizon.net" ,"sbcglobal.net" ,"att.net" ,"gmx.com" ,"outlook.com" ,"icloud.com"]
  };

  function EmailAutocomplete(elem, options) {
    this.$field = $(elem);
    this.options = $.extend(true, {}, defaults, options); //we want deep extend
    this._defaults = defaults;
    this._domains = this.options.domains;
    this.init();
  }

  EmailAutocomplete.prototype = {
    init: function () {

      //shim indexOf
      if (!Array.prototype.indexOf) {
        this.doIndexOf();
      }

      //this will be calculated upon keyup
      this.fieldLeftOffset = null;

      //wrap our field
      var $wrap = $("<div class='eac-input-wrap' />").css({
        display: this.$field.css("display"),
        position: this.$field.css("position") === 'static' ? 'relative' : this.$field.css("position"),
        fontSize: this.$field.css("fontSize")
      });
      this.$field.wrap($wrap);

      //create container to test width of current val
      this.$cval = $("<span class='eac-cval' />").css({
        visibility: "hidden",
        position: "absolute",
        display: "inline-block",
        fontFamily: this.$field.css("fontFamily"),
        fontWeight: this.$field.css("fontWeight"),
        letterSpacing: this.$field.css("letterSpacing")
      }).insertAfter(this.$field);

      //create the suggestion overlay
      /* touchstart jquery 1.7+ */
      var heightPad = (this.$field.outerHeight(true) - this.$field.height()) / 2; //padding+border
      this.$suggOverlay = $("<span class='"+this.options.suggClass+"' />").css({
        display: "block",
        "box-sizing": "content-box", //standardize
        lineHeight: this.$field.css('lineHeight'),
        paddingTop: heightPad + "px",
        paddingBottom: heightPad + "px",
        fontFamily: this.$field.css("fontFamily"),
        fontWeight: this.$field.css("fontWeight"),
        letterSpacing: this.$field.css("letterSpacing"),
        position: "absolute",
        top: 0,
        left: 0
      }).insertAfter(this.$field);

      //bind events and handlers
      this.$field.on("keyup.eac", $.proxy(this.displaySuggestion, this));

      this.$field.on("blur.eac", $.proxy(this.autocomplete, this));

      this.$field.on("keydown.eac", $.proxy(function(e){
        if(e.which === 39 || e.which === 9){
          this.autocomplete();
        }
      }, this));

      this.$suggOverlay.on("mousedown.eac touchstart.eac", $.proxy(this.autocomplete, this));
    },

    suggest: function (str) {
      var str_arr = str.split("@");
      if (str_arr.length > 1) {
        str = str_arr.pop();
        if (!str.length) {
          return "";
        }
      } else {
        return "";
      }

      var match = this._domains.filter(function (domain) {
        return domain.indexOf(str) === 0;
      }).shift() || "";

      return match.replace(str, "");
    },

    autocomplete: function () {
      if(typeof this.suggestion === "undefined" || this.suggestion.length < 1){
        return false;
      }
      this.$field.val(this.val + this.suggestion);
      this.$suggOverlay.text("");
      this.$cval.text("");
    },

    /**
     * Displays the suggestion, handler for field keyup event
     */
    displaySuggestion: function (e) {
      this.val = this.$field.val();
      this.suggestion = this.suggest(this.val);

      if (!this.suggestion.length) {
        this.$suggOverlay.text("");
      } else {
        e.preventDefault();
      }

      //update with new suggestion
      this.$suggOverlay.text(this.suggestion);
      this.$cval.text(this.val);

      // get input padding, border and margin to offset text
      if(this.fieldLeftOffset === null){
        this.fieldLeftOffset = (this.$field.outerWidth(true) - this.$field.width()) / 2;
      }

      //find width of current input val so we can offset the suggestion text
      var cvalWidth = this.$cval.width();

      if(this.$field.outerWidth() > cvalWidth){
        //offset our suggestion container
        this.$suggOverlay.css('left', this.fieldLeftOffset + cvalWidth + "px");
      }
    },

    /**
     * indexof polyfill
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
    */
    doIndexOf: function(){

        Array.prototype.indexOf = function (searchElement, fromIndex) {
          if ( this === undefined || this === null ) {
            throw new TypeError( '"this" is null or not defined' );
          }

          var length = this.length >>> 0; // Hack to convert object.length to a UInt32

          fromIndex = +fromIndex || 0;

          if (Math.abs(fromIndex) === Infinity) {
            fromIndex = 0;
          }

          if (fromIndex < 0) {
            fromIndex += length;
            if (fromIndex < 0) {
              fromIndex = 0;
            }
          }

          for (;fromIndex < length; fromIndex++) {
            if (this[fromIndex] === searchElement) {
              return fromIndex;
            }
          }

          return -1;
        };
      }
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, "yz_" + pluginName)) {
        $.data(this, "yz_" + pluginName, new EmailAutocomplete(this, options));
      }
    });
  };

})(jQuery, window, document);
