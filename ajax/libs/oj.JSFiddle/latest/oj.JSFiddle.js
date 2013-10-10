//
// oj.JSFiddle.js v0.0.1
// ojjs.org/plugins#JSFiddle
//
// Copyright 2013, Evan Moran
// Released under the MIT License
//
// oj.JSFiddle.js

(function(){

// Create plugin
var plugin = function(oj, settings){
  if (typeof settings !== 'object')
    settings = {}

  var JSFiddle = oj.createType('JSFiddle', {

    base: oj.View,

    constructor: function(){
      var this_ = this;
      var union = oj.unionArguments(arguments);
      var options = union.options;
      var args = union.args;

      // Shift properties
      var props = [
        'url',
        'tabs',
        'style',
        'width',
        'height'
      ];
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (options[prop] != null)
          this[prop] = oj.argumentShift(options, prop);
      }

      // Accept url as first arg
      if (!this._url && args.length >= 1)
        this.url = args[0];

      // Create el
      this.el = oj(function(){

        if (!this_.url)
          throw new Error('oj.JSFiddle: url is not specified');

        var url = this_.url;

        var tabs = this_.tabs ? this_.tabs + '/' : '';

        var style = this_.style ? this_.style + '/' : '';

        // Calculate src to iframe
        var src = "http://jsfiddle.net/" + url + "/embedded/" + tabs + style;

        oj.iframe({
          src:src,
          width:this_.width,
          height:this_.height
        });
      });

      JSFiddle.base.constructor.apply(this, [options]);
    },

    properties: {
      url: {
        get:function(){
          return this._url || 'evanmoran/vhNcD';
        },
        set:function(v){
          // Strip off unecesary parts of url
          v = unprepend(v, 'http://');
          v = unprepend(v, 'jsfiddle.net')
          v = unappend(v, '/')
          this._url = v;
        }
      },
      tabs: 'result,js,html,css,resources',
      style: '',         // '' or 'presentation'
      width:{            // pixals if specified. Otherwise is calculate from settings
        get:function(){return this._width || 300},
        set:function(v){this._width = v;}
      },
      height:{           // pixals if specified. Otherwise is calculate from settings
        get:function(){return this._height || 200},
        set:function(v){this._height = v;}
      }
    },
  });

  return {JSFiddle:JSFiddle};
};

// Export in OJ
if (typeof oj != 'undefined')
  oj.use(plugin);

// Export in node
if (typeof module != 'undefined' && typeof module.exports != 'undefined')
  module.exports = plugin;

// Helper methods
// ---------------------------------------------------------------------------

function startsWith (strInput, strStart) {
  return strInput.length >= strStart.length && strInput.lastIndexOf(strStart, 0) == 0;
}

function endsWith (strInput, strEnd) {
  return strInput.length >= strEnd.length && strInput.lastIndexOf(strEnd, strInput.length - strEnd.length) == strInput.length - strEnd.length;
}

function unprepend (strInput, strStart) {
  if(startsWith(strInput, strStart))
    return strInput.slice(strStart.length);
  return strInput;
}

function unappend (strInput, strEnd) {
  if (endsWith(strInput, strEnd))
    return strInput.slice(0, strInput.length - strEnd.length);
  return strInput;
}

})(this);