//
// oj.TwitterButton.js v0.0.4
// ojjs.org/plugins#TwitterButton
//
// Copyright 2013, Evan Moran
// Released under the MIT License
//
// oj.TwitterButton.js

(function(){

// Create plugin
var plugin = function(oj,settings){
  if (typeof settings !== 'object')
    settings = {}

  var TwitterButton = oj.createType('TwitterButton', {

    base: oj.View,

    constructor: function(){
      var this_ = this;
      var union = oj.unionArguments(arguments);
      var options = union.options;
      var args = union.args;

      // First argument is username
      if(args.length > 0)
        this.username = args[0];

      // Shift properties
      var props = [
        'label',
        'size',
        'showCount',
        'showUsername',
        'username'
      ];
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (options[prop] != null)
          this[prop] = oj.argumentShift(options, prop);
      }

      // Create el
      this.el = oj(function(){
        var size = null, tailor = null;
        if (this_.size)
          size = {'data-size':this_.size.toString()};
        if (!this_.showTailoring)
          tailor = {'data-dnt':(!this_.showTailoring).toString()};

        oj.a("Follow @" + this_.username, {
            href: 'https://twitter.com/' + this_.username.toString(),
            c:'twitter-follow-button',
            'data-show-count':this_.showCount.toString(),
            'data-show-screen-name':this_.showUsername.toString(),
            style:{display:'none'}
          },
          tailor,
          size
        );
      });

      TwitterButton.base.constructor.apply(this, [options]);

      this.loadTwitterAPI();
    },
    properties: {
      username: 'evanmoran',
      showCount: true,
      showUsername: true,
      showTailoring: true,
      size:{
        get:function(){return this._size || 'medium';},
        set:function(v){this._size = v;}
      }
    },

    methods: {
      loadTwitterAPI:function(){
        var this_ = this;
        if (oj.isClient && !TwitterButton._loaded) {
          var p=/^http:/.test(document.location)?'http':'https';
          var url = p + '://platform.twitter.com/widgets.js';
          $.ajax({
            url:url,
            cache:true,
            dataType:'script'
          // Prevents flickering for slow connections
          }).always(function(result){
            this_.$el.show()
          });
          TwitterButton._loaded = true;
        }

      }
    }
  });

  return {TwitterButton:TwitterButton};
};

// Export in OJ
if (typeof oj != 'undefined')
  oj.use(plugin);

// Export in node
if (typeof module != 'undefined' && typeof module.exports != 'undefined')
  module.exports = plugin;

})(this);