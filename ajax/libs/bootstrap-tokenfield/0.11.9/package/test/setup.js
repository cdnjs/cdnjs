var jsdom = require('jsdom');
require('./helpers/jsdom-patch');

before(function (done) {
  jsdom.env({
    html: '<html><body></body></html>',
    done: function (err, window) {
      
      // Set clientTop and clientLeft to 0 so that offset() works
      window.document.documentElement.clientTop = 0;
      window.document.documentElement.clientLeft = 0;
      
      // Expose jQuery and require tokenfield
      window.$ = global.$ = global.jQuery = require('jquery')(window);
      require('../js/bootstrap-tokenfield')(window);
      
      // Globalize window, document, navigator
      global.window = window;
      global.document = window.document;
      global.navigator = window.navigator;

      // Provide a focus method on DOM elements if it does not exist.
      // Helps to avoid issues with the simulate-ext plugin
      window.HTMLDivElement.prototype.focus = window.HTMLDivElement.prototype.focus || function() {};

      // Global configuration object for our tests
      global.TFT = window.TFT = {};

      done();
    }
  });
});

// Global tokenfield test object
beforeEach(function() {
  var template = TFT.template || '<input type="text" class="tokenize" value="" />',
      options  = TFT.options  || null;

  this.$sandbox = $('<div />').appendTo($('body'));
  this.$template = $(template).appendTo(this.$sandbox);

  this.$field = this.$template.hasClass('tokenize') ? this.$template : this.$template.find('.tokenize');
  this.$field.tokenfield( options );

  // Shortcuts
  this.$input       = this.$field.data('bs.tokenfield').$input;
  this.$wrapper     = this.$field.data('bs.tokenfield').$wrapper;
  this.$copyHelper  = this.$field.data('bs.tokenfield').$copyHelper;

  // Set an initial empty value for inputs (workaround for bililiteRange `null` value error)
  this.$input.val('');
  this.$copyHelper.val('');
});

afterEach( function() {
  this.$field.tokenfield('destroy');
  this.$sandbox.remove();

  delete this.$field;
  delete this.$input;
  delete this.$wrapper;
  delete this.$copyHelper;
  delete this.$sandbox;
  delete this.$template;
});