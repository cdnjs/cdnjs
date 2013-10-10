//
// oj.VimeoVideo.js v0.0.4
// ojjs.org/plugins#VimeoVideo
//
// Copyright 2013, Evan Moran
// Released under the MIT License
//
// oj.VimeoVideo.js

(function(){

// Froogaloop is the offical javascript api to Vimeo
// https://github.com/vimeo/player-api/tree/master/javascript
var Froogaloop=function(){function e(a){return new e.fn.init(a)}function h(a,c,b){if(!b.contentWindow.postMessage)return!1;var f=b.getAttribute("src").split("?")[0],a=JSON.stringify({method:a,value:c});"//"===f.substr(0,2)&&(f=window.location.protocol+f);b.contentWindow.postMessage(a,f)}function j(a){var c,b;try{c=JSON.parse(a.data),b=c.event||c.method}catch(f){}"ready"==b&&!i&&(i=!0);if(a.origin!=k)return!1;var a=c.value,e=c.data,g=""===g?null:c.player_id;c=g?d[g][b]:d[b];b=[];if(!c)return!1;void 0!==
a&&b.push(a);e&&b.push(e);g&&b.push(g);return 0<b.length?c.apply(null,b):c.call()}function l(a,c,b){b?(d[b]||(d[b]={}),d[b][a]=c):d[a]=c}var d={},i=!1,k="";e.fn=e.prototype={element:null,init:function(a){"string"===typeof a&&(a=document.getElementById(a));this.element=a;a=this.element.getAttribute("src");"//"===a.substr(0,2)&&(a=window.location.protocol+a);for(var a=a.split("/"),c="",b=0,f=a.length;b<f;b++){if(3>b)c+=a[b];else break;2>b&&(c+="/")}k=c;return this},api:function(a,c){if(!this.element||
!a)return!1;var b=this.element,f=""!==b.id?b.id:null,d=!c||!c.constructor||!c.call||!c.apply?c:null,e=c&&c.constructor&&c.call&&c.apply?c:null;e&&l(a,e,f);h(a,d,b);return this},addEvent:function(a,c){if(!this.element)return!1;var b=this.element,d=""!==b.id?b.id:null;l(a,c,d);"ready"!=a?h("addEventListener",a,b):"ready"==a&&i&&c.call(null,d);return this},removeEvent:function(a){if(!this.element)return!1;var c=this.element,b;a:{if((b=""!==c.id?c.id:null)&&d[b]){if(!d[b][a]){b=!1;break a}d[b][a]=null}else{if(!d[a]){b=
!1;break a}d[a]=null}b=!0}"ready"!=a&&b&&h("removeEventListener",a,c)}};e.fn.init.prototype=e.fn;window.addEventListener?window.addEventListener("message",j,!1):window.attachEvent("onmessage",j);return window.Froogaloop=e}();

// Create url from Vimeo options
function vimeoUrl(video, options)
{
  var out = 'http://player.vimeo.com/video/' + video + '?api=1&player_id=' + options.player_id;
  for(k in options)
    out += '&' + k + '=' + options[k];
  return out;
}

var plugin = function(oj,settings){
  if (typeof settings !== 'object')
    settings = {}

  var VimeoVideo = oj.createType('VimeoVideo', {
    // The model-key bind to the url of the movie
    base: oj.View,

    // VimeoVideo(videoID, properties)
    constructor: function(){
      var this_ = this;
      var union = oj.unionArguments(arguments);
      var options = union.options;
      var args = union.args;

      // First argument is video id
      if(args.length > 0)
        this.video = args[0];

      // Shift properties
      var props = [
        'width',
        'height',
        'video',
        'showTitle',
        'showByline',
        'showPortrait',
        'color',
        'autoplay',
        'loop'
      ];
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (options[prop] != null)
          this[prop] = oj.argumentShift(options, prop);
      }

      this.el = oj(function(){
        oj.iframe({
          src: this_.src,
          width:this_.width,
          height:this_.height,
          frameborder:0,
          webkitAllowFullScreen:1,
          mozallowfullscreen:1,
          allowFullScreen:1,
        });
      });

      VimeoVideo.base.constructor.apply(this, [options]);

      // // // Bind events using javascript API
      // this.player = Froogaloop(this.el);

      // // // When the player is ready, add listeners for pause, finish, and playProgress
      // this.player.addEvent('ready', function() {});


      //   console.log("ready called");

      //   this_.player.addEvent('pause', function(){this_.onPause.apply(this_,arguments)});
      //   this_.player.addEvent('finish', function(){this_.onFinish.apply(this_,arguments)});
      //   this_.player.addEvent('playProgress', function(){this_.onPlayProgress.apply(this_,arguments)});
      // });

      // if (oj.isClient) {
      //   console.log("starting: ", starting);
      //   player.api('starting');
      // }
    },
    properties: {
      width: {
        get: function(){ return this._width || 300; },
        set: function(v){
          this._width = v;
          if (this.isConstructed)
            this.$el.attr('width', v);
        }
      },

      height: {
        get: function(){ return this._height || 178; },
        set: function(v){
          this._height = v;
          if (this.isConstructed)
            this.$el.attr('height', v);
        }
      },

      // The video id
      video: 24715531,

      // Show title (readwrite)
      showTitle: false,

      // Show the users byline on the video (readwrite)
      showByline: false,

      // Show the user's portrait on the video (readwrite)
      showPortrait: false,

      // Color of controls (readwrite)
      color: {
        get: function(){return this._color || '00adef';},
        set: function(v){
          // Remove prefix of '#'
          if(v.length > 0 && v[0] == '#')
            v = v.slice(1);
          this._color = v;
        }
      },

      // Play the video automatically on load
      autoplay: false,

      // Repeat video when it reaches the end
      loop: false,

      src: {
        get: function(){
          return vimeoUrl(this.video, this.videoOptions);
        }
      },

      // Gather options to set url (readonly)
      videoOptions: {
        get: function(){
          return {
            title: (this.showTitle ? 1 : 0),
            byline: (this.showByline ? 1 : 0),
            portrait: (this.showPortrait ? 1 : 0),
            color: this.color,
            autoplay: (this.autoplay ? 1 : 0),
            loop: (this.loop ? 1 : 0),
            player_id: (this.id ? 1 : 0)
          };
        }
      }
    },

    methods: {

      play: function(){
      },
      stop: function(){
      },

      rewind: function(){
      },

      onPause: function(id) {
        console.log('paused', id);
      },

      onFinish: function(id) {
        console.log('finish', id);
      },

      onPlayProgress: function(data, id) {
        console.log('playProgress: ', data, id);
      }

    }
  });

  return {VimeoVideo:VimeoVideo};
};

// Export in OJ
if (typeof oj != 'undefined')
  oj.use(plugin);

// Export in node
if (typeof module != 'undefined' && typeof module.exports != 'undefined')
  module.exports = plugin;

})(this);