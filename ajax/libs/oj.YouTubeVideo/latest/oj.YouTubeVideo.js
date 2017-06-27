//
// oj.YouTubeVideo.js v0.0.1
// ojjs.org/plugins#YouTubeVideo
//
// Copyright 2013, Evan Moran
// Released under the MIT License
//
// oj.YouTubeVideo.js

(function(){

var plugin = function(oj,settings){
  if (typeof settings !== 'object')
    settings = {};

  var YouTubeVideo = oj.createType('YouTubeVideo', {
    // The model-key bind to the url of the movie
    base: oj.View,

    // YouTubeVideo(videoID, properties)
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
        'autoplay',
        'volume',
        'mute',
        'playbackRate'
      ];
      for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (options[prop] != null)
          this[prop] = oj.argumentShift(options, prop);
      }

      this.el = oj(function(){
        oj.iframe({
          src: this_.src,
          type: 'text/html',
          width:this_.width,
          height:this_.height,
          frameborder:0,
          webkitAllowFullScreen:1,
          mozallowfullscreen:1,
          allowFullScreen:1,
        });
      });

      YouTubeVideo.base.constructor.apply(this, [options]);

      this.loadYouTubeAPI();

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
        get: function(){ return this._height || 170; },
        set: function(v){
          this._height = v;
          if (this.isConstructed)
            this.$el.attr('height', v);
        }
      },

      volume: {
        get: function(){
          return this._volume != null ? this._volume : 1.0},
        set: function(v){
          this._volume = Math.min(Math.max(v,0),1);
          if (this.player) {
            this.player.setVolume(this._volume * 100);
          }
        }
      },

      mute: {
        get: function(){ return this._mute != null ? this._mute : false; },
        set: function(v){
          this._mute = !!v;
          if (this.player) {
            if (this._mute) {
              this.player.mute();
            } else {
              this.player.unMute();
            }
          }
        }
      },

      playbackRate: {
        get: function(){ return this._playbackRate != null ?  this._playbackRate : 1.0; },
        set: function(v){
          this._playbackRate = v;
          if (this.player) {
            this.player.setPlaybackRate(v);
          }
        }
      },

      availablePlaybackRates: {
        get: function(){ return this.player ? this.player.getAvailablePlaybackRates() : [1]; },
      },

      player: null,

      // The video id
      video: {
        get:function(){return this._video || 't-FUTp_oO5s';},
        set:function(v){
          this._video = v;
          if(this.player) {
            this.player.setVideo(v);
          }
        }
      },

      origin: {
        get: function(){
          if (!oj.isClient || window.location.protocol === 'file:')
            return null;
          else if (this._origin)
            return this._origin;
          // Calculate origin from window.location
          return this._origin = (window.location.protocol + '//' + window.location.hostname);
        },
        set: function(v){ this._origin = v; }
      },

      // Play the video automatically on load
      autoplay: false,
      loop: {
        get: function(){ return this._loop || false; },
        set: function(v){ this._loop = v; if (this.player){this.player.setLoop(v);} }
      },

      src: {
        get: function(){

          var options = this.videoOptions;
          var out = 'http://www.youtube.com/embed/' + this.video + '?autoplay=' + options.autoplay;
          if (options.origin) {
            out += 'origin=' + options.origin;
          }
          for(k in options)
            out += '&' + k + '=' + options[k];
          return out;
        }
      },

      // Gather options to set url (readonly)
      videoOptions: {
        get: function(){
          return {
            autoplay: (this.autoplay ? 1 : 0)
          };
        }
      },

      // Overridable state changed event handler
      playerStateChanged: function(state, player){
      }

    },

    methods: {

      loadYouTubeAPI: function(){

        var this_ = this;
        if (oj.isClient && !YouTubeVideo._loaded) {
          var p=/^http:/.test(document.location)?'http':'https';
          var url = p + '://www.youtube.com/iframe_api';
          $.ajax({
            url:url,
            cache:true,
            dataType:'script'
          }).always(function(result){
          });
          YouTubeVideo._loaded = true;
        }
      },

      // Called when the youtube javascript api loads
      youtubeAPILoaded: function(){
        var this_ = this;
        new YT.Player(this.id, {
          events: {
              onStateChange: function(){
                this_._onPlayerStateChange.apply(this_, arguments);
              },
              onReady: function(event){
                this_.player = event.target
                this_._onPlayerReady.apply(this_, arguments);
              }
            }
        });
      },

      play: function(){
        if(this.player) {
          this.player.playVideo();
        }
      },

      stop: function(){
        if(this.player) {
          this.player.stopVideo();
        }
      },

      pause: function(){
        if(this.player) {
          this._playing = false;
          this.player.pauseVideo();
        }
      },

      // Toggle play and pause
      playToggle: function(){
        if (this._playing)
          this.pause();
        else
          this.play();
      },

      // Toggle mute / unmute
      muteToggle: function(){
        this.mute = !this.mute;
      },

      seekTo: function(seconds, allowSeekAhead){
        if(this.player) {
          this.player.seekTo(seconds, allowSeekAhead);
        }
      },
      _onPlayerReady: function(event){
        this.mute = this.mute;
        this.volume = this.volume;
        this.playbackRate = this.playbackRate;
      },
      // Internal handler to built in onPlayerStateChange event
      // Parse the data into understandable strings and call
      // the playerStateChanged property
      _onPlayerStateChange: function(event){
        this._playing = false;
        switch(event.data) {
          case -1:
            this._state = 'stopped';
            break;
          case 0:
            this._state = 'ended';
            break;
          case 1:
            this._state = 'playing';
            this._playing = true;
            break;
          case 2:
            this._state = 'paused'
            break;
          case 3:
            this._state = 'buffering'
          case 4:
            this._state = 'cued'
            break;
        }

        // Call through to user event handler if available
        if(this.playerStateChanged)
          this.playerStateChanged(this._state, event.target);
      }
    }
  });

  // Client side create hook to YouTube API ready call
  if(oj.isClient) {
    // YouTube API requires this method to be global
    window.onYouTubeIframeAPIReady = YouTubeVideo.onYouTubeIframeAPIReady = function(){
      // Inform each player the JS API is loaded
      $('.oj-YouTubeVideo').each(function(){
        this.oj.youtubeAPILoaded();
      })
    }
  }

  return {YouTubeVideo:YouTubeVideo};
};

// Export in OJ
if (typeof oj != 'undefined')
  oj.use(plugin);

// Export in node
if (typeof module != 'undefined' && typeof module.exports != 'undefined')
  module.exports = plugin;

})(this);