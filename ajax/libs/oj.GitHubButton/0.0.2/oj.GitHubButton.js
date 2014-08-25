//
// oj.GitHubButton.js v0.0.2
// ojjs.org/plugins#GitHubButton
//
// Copyright 2013, Evan Moran
// Released under the MIT License
//
// oj.GitHubButton.js

(function(){

// Create plugin
var plugin = function(oj, settings){
  if (typeof settings !== 'object')
    settings = {}

  var GitHubButton = oj.createType('GitHubButton', {

    base: oj.View,

    constructor: function(){
      var this_ = this;
      var union = oj.unionArguments(arguments);
      var options = union.options;
      var args = union.args;

      // Accept user as first arg
      if (args.length >= 1)
        this.user = args[0];

      // Accept repo as second arg
      if(args.length >= 2)
        this.repo = args[1];

      // Shift properties
      var props = [
        'type',
        'user',
        'repo',
        'showCount',
        'size',
        'width',
        'height'
      ];
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (options[prop] != null)
          this[prop] = oj.argumentShift(options, prop);
      }

      // Create el
      this.el = oj(function(){

        // Calculate arguments to ghbts.com
        var size = '', count = '', user = '', repo = '', type = '';
        if (!this_.user)
          throw new Error('oj.GitHubButton: user is not specified');
        user = 'user=' + this_.user
        if (this_.repo)
          repo = '&repo=' + this_.repo
        if (this_.size)
          size = '&size=' + this_.size
        if (this_.showCount)
          count = '&count=' + this_.showCount
        if (this_.type)
          type = '&type=' + this_.type

        src = "http://ghbtns.com/github-btn.html?" + user + repo + type + count + size;

        oj.iframe({
          src:src,
          allowtransparency:"true",
          frameborder:"0",
          scrolling:"0",
          width:this_.width,
          height:this_.height
        });
      });

      GitHubButton.base.constructor.apply(this, [options]);
    },

    properties: {
      user: 'evanmoran',
      repo: null,
      type: { // watch, follow, fork, (star)==watch
        // Default to follow if no repro is set
        get:function(){return this._type || (this.repo == null ? 'follow' : 'watch');},
        set:function(v){
          if(!v || v == 'star')
            v = 'watch';
          this._type = v;
        }
      },
      showCount: true,
      size:{              // null or large
        get:function(){return this._size;},
        set:function(v){this._size = v;}
      },
      width:{            // pixals if specified. Otherwise is calculate from settings
        get:function(){return this._width || _widthFromType(this.type,this.showCount,this.size)},
        set:function(v){this._width = v;}
      },
      height:{           // pixals if specified. Otherwise is calculate from settings
        get:function(){return this._height || this.size == 'large' ? 30 : 20},
        set:function(v){this._height = v;}
      }
    },
  });

  return {GitHubButton:GitHubButton};
};

// Export in OJ
if (typeof oj != 'undefined')
  oj.use(plugin);

// Export in node
if (typeof module != 'undefined' && typeof module.exports != 'undefined')
  module.exports = plugin;

_widthFromType = function(type, showCount, size){
  w = 0;
  if (type == 'watch' && showCount == false)
    w = 62;
  else if (type == 'watch' && showCount == true)
    w = 110;
  else if (type == 'fork' && showCount == false)
    w = 53;
  else if (type == 'fork' && showCount == true)
    w = 95;
  else if (type == 'follow' && showCount == false)
    w = 132;
  else if (type == 'follow' && showCount == true)
    w = 165;
  w += size == 'large' ? 30 : 0;
}


})(this);