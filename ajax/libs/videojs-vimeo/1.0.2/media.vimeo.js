(function() {
  /**
   * @fileoverview Vimeo Media Controller - Wrapper for Vimeo Media API
   */

  var VimeoState = {
    UNSTARTED: -1,
    ENDED: 0,
    PLAYING: 1,
    PAUSED: 2,
    BUFFERING: 3
  };

  /**
   * Vimeo Media Controller - Wrapper for Vimeo Media API
   * @param {videojs.Player|Object} player
   * @param {Object=} options
   * @param {Function=} ready
   * @constructor
   */
  videojs.Vimeo = videojs.MediaTechController.extend({
    init: function(player, options, ready){
      videojs.MediaTechController.call(this, player, options, ready);

      // Copy the JavaScript options if they exists
      if (typeof options['source'] != 'undefined') {
          for (var key in options['source']) {
              player.options()[key] = options['source'][key];
          }
      }

      this.player_ = player;
      this.player_el_ = document.getElementById(this.player_.id());

      // Disable lockShowing because we always use Vimeo controls
      this.player_.controls(false);

      this.id_ = this.player_.id() + '_vimeo_api';

      this.el_ = videojs.Component.prototype.createEl('iframe', {
        id: this.id_,
        className: 'vjs-tech',
        scrolling: 'no',
        marginWidth: 0,
        marginHeight: 0,
        frameBorder: 0
      });

      // Fix createEl not creating these attributes.
      this.el_.setAttribute('webkitAllowFullScreen', '')
      this.el_.setAttribute('mozallowfullscreen', '')
      this.el_.setAttribute('allowFullScreen', '')

      this.player_el_.insertBefore(this.el_, this.player_el_.firstChild);

      var protocol = (document.location.protocol === 'file:')?'http:': document.location.protocol;
      this.baseUrl = protocol + '//player.vimeo.com/video/';

      this.vimeo = {};
      this.vimeoInfo = {};

      var self = this;
      if ( this.el_.attachEvent ) { //Fix for the onLoad event listener on IE8
        this.el_.attachEvent( 'onload', vjs.bind( self, self.onLoad ) );
      }
      else {
        this.el_.onload = function() { self.onLoad(); };
      }

      this.startMuted = player.options()['muted'];

      this.src(player.options()['src']);
    }
  });

  videojs.Vimeo.prototype.dispose = function(){
    this.vimeo.removeEvent('ready');
    this.vimeo.api('unload');
    delete this.vimeo;
    this.el_.parentNode.removeChild(this.el_);

    videojs.MediaTechController.prototype.dispose.call(this);
  };

  videojs.Vimeo.prototype.src = function(src){
    this.isReady_ = false;

    // Regex that parse the video ID for any Vimeo URL
    var regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    var match = src.match(regExp);

    if (match){
      this.videoId = match[5];
    }

    var params = {
      api: 1,
      byline: 0,
      portrait: 0,
      show_title: 0,
      show_byline: 0,
      show_portait: 0,
      fullscreen: 1,
      player_id: this.id_,
      autoplay: (this.player_.options()['autoplay'])?1:0,
      loop: (this.player_.options()['loop'])?1:0,
      color: this.player_.options()['color'] || ''
    };

    if (params.color.substring(0, 1) === '#') {
      // vimeo API takes color without the hash
      params.color = params.color.substring(1);
    }

    this.el_.src = this.baseUrl + this.videoId + '?' + videojs.Vimeo.makeQueryString(params);
  };

  videojs.Vimeo.prototype.load = function(){};
  videojs.Vimeo.prototype.play = function(){ this.vimeo.api('play'); };
  videojs.Vimeo.prototype.pause = function(){ this.vimeo.api('pause'); };
  videojs.Vimeo.prototype.paused = function(){
    return this.vimeoInfo.state !== VimeoState.PLAYING &&
           this.vimeoInfo.state !== VimeoState.BUFFERING;
  };

  videojs.Vimeo.prototype.currentTime = function(){ return this.vimeoInfo.time || 0; };

  videojs.Vimeo.prototype.setCurrentTime = function(seconds){
    this.vimeo.api('seekTo', seconds);
    this.player_.trigger('timeupdate');
  };

  videojs.Vimeo.prototype.duration = function(){ return this.vimeoInfo.duration || 0; };
  videojs.Vimeo.prototype.buffered = function(){ return videojs.createTimeRange(0, (this.vimeoInfo.buffered*this.vimeoInfo.duration) || 0); };

  videojs.Vimeo.prototype.volume = function() { return (this.vimeoInfo.muted)? this.vimeoInfo.muteVolume : this.vimeoInfo.volume; };
  videojs.Vimeo.prototype.setVolume = function(percentAsDecimal){
    this.vimeo.api('setvolume', percentAsDecimal);
    this.vimeoInfo.volume = percentAsDecimal;
    this.player_.trigger('volumechange');
  };
  videojs.Vimeo.prototype.currentSrc = function() {
    return this.el_.src;
  };
  videojs.Vimeo.prototype.muted = function() { return this.vimeoInfo.muted || false; };
  videojs.Vimeo.prototype.setMuted = function(muted) {
    if (muted) {
      this.vimeoInfo.muteVolume = this.vimeoInfo.volume;
      this.setVolume(0);
    } else {
      this.setVolume(this.vimeoInfo.muteVolume);
    }

    this.vimeoInfo.muted = muted;
    this.player_.trigger('volumechange');
  };

  videojs.Vimeo.prototype.onReady = function(){
    this.isReady_ = true;
    this.triggerReady();
    this.player_.trigger('loadedmetadata');
    if (this.startMuted) {
      this.setMuted(true);
      this.startMuted = false;
    }
  };

  videojs.Vimeo.prototype.onLoad = function(){
    if (this.vimeo && this.vimeo.api) {
      this.vimeo.api('unload');
      delete this.vimeo;
    }

    this.vimeo = $f(this.el_);

    this.vimeoInfo = {
      state: VimeoState.UNSTARTED,
      volume: 1,
      muted: false,
      muteVolume: 1,
      time: 0,
      duration: 0,
      buffered: 0,
      url: this.baseUrl + this.videoId,
      error: null
    };

    var self = this;
    this.vimeo.addEvent('ready', function(id){
      self.onReady();

      self.vimeo.addEvent('loadProgress', function(data, id){ self.onLoadProgress(data); });
      self.vimeo.addEvent('playProgress', function(data, id){ self.onPlayProgress(data); });
      self.vimeo.addEvent('play', function(id){ self.onPlay(); });
      self.vimeo.addEvent('pause', function(id){ self.onPause(); });
      self.vimeo.addEvent('finish', function(id){ self.onFinish(); });
      self.vimeo.addEvent('seek', function(data, id){ self.onSeek(data); });

    });
  };

  videojs.Vimeo.prototype.onLoadProgress = function(data){
    var durationUpdate = !this.vimeoInfo.duration;
    this.vimeoInfo.duration = data.duration;
    this.vimeoInfo.buffered = data.percent;
    this.player_.trigger('progress');
    if (durationUpdate) this.player_.trigger('durationchange');
  };

  videojs.Vimeo.prototype.onPlayProgress = function(data){
    this.vimeoInfo.time = data.seconds;
    this.player_.trigger('timeupdate');
  };

  videojs.Vimeo.prototype.onPlay = function(){
    this.vimeoInfo.state = VimeoState.PLAYING;
    this.player_.trigger('play');
  };

  videojs.Vimeo.prototype.onPause = function(){
    this.vimeoInfo.state = VimeoState.PAUSED;
    this.player_.trigger('pause');
  };

  videojs.Vimeo.prototype.onFinish = function(){
    this.vimeoInfo.state = VimeoState.ENDED;
    this.player_.trigger('ended');
  };

  videojs.Vimeo.prototype.onSeek = function(data){
    this.player_.trigger('seeking');
    this.vimeoInfo.time = data.seconds;
    this.player_.trigger('timeupdate');
    this.player_.trigger('seeked');
  };

  videojs.Vimeo.prototype.onError = function(error){
    this.player_.error = error;
    this.player_.trigger('error');
  };

  videojs.Vimeo.isSupported = function(){
    var supportFlash = videojs.Flash.version()[0] >= 10;
    if (!supportFlash) {
      //Opera
      var isOpera = navigator.userAgent.indexOf("Opera") != -1;
      if (isOpera) {
        return false;
      }
      //Firefox on OSX
      var isOSX = navigator.userAgent.indexOf('Mac OS X') != -1;
      var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      if (isOSX && isFirefox) {
        return false;
      }
      //IE <= 10
      var tridentRegex = /Trident\/([\d\.]+)/;
      if (tridentRegex.test(navigator.userAgent)) {
        var version;
        if (tridentRegex.exec(navigator.userAgent) != null) {
          version = parseFloat( RegExp.$1 );
        }
        if (version && version < 7) {
          return false;
        }
      }
    }
    return true;
  };

  videojs.Vimeo.prototype.supportsFullScreen = function() {
    return false;
  };

  videojs.Vimeo.canPlaySource = function(srcObj){
    return (srcObj.type == 'video/vimeo');
  };

  videojs.Vimeo.makeQueryString = function(args){
    var array = [];
    for (var key in args){
      if (args.hasOwnProperty(key)){
        array.push(encodeURIComponent(key) + '=' + encodeURIComponent(args[key]));
      }
    }

    return array.join('&');
  };

  // Froogaloop API -------------------------------------------------------------

  // From https://github.com/vimeo/player-api/blob/master/javascript/froogaloop.js
  // Init style shamelessly stolen from jQuery http://jquery.com
  var Froogaloop = (function(){
      // Define a local copy of Froogaloop
      function Froogaloop(iframe) {
          // The Froogaloop object is actually just the init constructor
          return new Froogaloop.fn.init(iframe);
      }

      var eventCallbacks = {},
          hasWindowEvent = false,
          isReady = false,
          slice = Array.prototype.slice,
          playerOrigin = '*';

      Froogaloop.fn = Froogaloop.prototype = {
          element: null,

          init: function(iframe) {
              if (typeof iframe === "string") {
                  iframe = document.getElementById(iframe);
              }

              this.element = iframe;

              return this;
          },

          /*
           * Calls a function to act upon the player.
           *
           * @param {string} method The name of the Javascript API method to call. Eg: 'play'.
           * @param {Array|Function} valueOrCallback params Array of parameters to pass when calling an API method
           *                                or callback function when the method returns a value.
           */
          api: function(method, valueOrCallback) {
              if (!this.element || !method) {
                  return false;
              }

              var self = this,
                  element = self.element,
                  target_id = element.id !== '' ? element.id : null,
                  params = !isFunction(valueOrCallback) ? valueOrCallback : null,
                  callback = isFunction(valueOrCallback) ? valueOrCallback : null;

              // Store the callback for get functions
              if (callback) {
                  storeCallback(method, callback, target_id);
              }

              postMessage(method, params, element);
              return self;
          },

          /*
           * Registers an event listener and a callback function that gets called when the event fires.
           *
           * @param eventName (String): Name of the event to listen for.
           * @param callback (Function): Function that should be called when the event fires.
           */
          addEvent: function(eventName, callback) {
              if (!this.element) {
                  return false;
              }

              var self = this,
                  element = self.element,
                  target_id = element.id !== '' ? element.id : null;


              storeCallback(eventName, callback, target_id);

              // The ready event is not registered via postMessage. It fires regardless.
              if (eventName != 'ready') {
                  postMessage('addEventListener', eventName, element);
              }
              else if (eventName == 'ready' && isReady) {
                  callback.call(null, target_id);
              }

              return self;
          },

          /*
           * Unregisters an event listener that gets called when the event fires.
           *
           * @param eventName (String): Name of the event to stop listening for.
           */
          removeEvent: function(eventName) {
              if (!this.element) {
                  return false;
              }

              var self = this,
                  element = self.element,
                  target_id = element.id !== '' ? element.id : null,
                  removed = removeCallback(eventName, target_id);

              // The ready event is not registered
              if (eventName != 'ready' && removed) {
                  postMessage('removeEventListener', eventName, element);
              }
          }
      };

      /**
       * Handles posting a message to the parent window.
       *
       * @param method (String): name of the method to call inside the player. For api calls
       * this is the name of the api method (api_play or api_pause) while for events this method
       * is api_addEventListener.
       * @param params (Object or Array): List of parameters to submit to the method. Can be either
       * a single param or an array list of parameters.
       * @param target (HTMLElement): Target iframe to post the message to.
       */
      function postMessage(method, params, target) {
          if (!target.contentWindow.postMessage) {
              return false;
          }

          var data = JSON.stringify({
              method: method,
              value: params
          });

          target.contentWindow.postMessage(data, playerOrigin);
      }

      /**
       * Event that fires whenever the window receives a message from its parent
       * via window.postMessage.
       */
      function onMessageReceived(event) {
          var data, method;

          try {
              data = JSON.parse(event.data);
              method = data.event || data.method;
          }
          catch(e)  {
              //fail silently... like a ninja!
          }

          if (method == 'ready' && !isReady) {
              isReady = true;
          }

          // Handles messages from the vimeo player only
          if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
              return false;
          }

          if (playerOrigin === '*') {
              playerOrigin = event.origin;
          }

          var value = data.value,
              eventData = data.data,
              target_id = target_id === '' ? null : data.player_id,

              callback = getCallback(method, target_id),
              params = [];

          if (!callback) {
              return false;
          }

          if (value !== undefined) {
              params.push(value);
          }

          if (eventData) {
              params.push(eventData);
          }

          if (target_id) {
              params.push(target_id);
          }

          return params.length > 0 ? callback.apply(null, params) : callback.call();
      }


      /**
       * Stores submitted callbacks for each iframe being tracked and each
       * event for that iframe.
       *
       * @param eventName (String): Name of the event. Eg. api_onPlay
       * @param callback (Function): Function that should get executed when the
       * event is fired.
       * @param target_id (String) [Optional]: If handling more than one iframe then
       * it stores the different callbacks for different iframes based on the iframe's
       * id.
       */
      function storeCallback(eventName, callback, target_id) {
          if (target_id) {
              if (!eventCallbacks[target_id]) {
                  eventCallbacks[target_id] = {};
              }
              eventCallbacks[target_id][eventName] = callback;
          }
          else {
              eventCallbacks[eventName] = callback;
          }
      }

      /**
       * Retrieves stored callbacks.
       */
      function getCallback(eventName, target_id) {
          if (target_id && eventCallbacks[target_id]) {
              return eventCallbacks[target_id][eventName];
          }
          else {
              return eventCallbacks[eventName];
          }
      }

      function removeCallback(eventName, target_id) {
          if (target_id && eventCallbacks[target_id]) {
              if (!eventCallbacks[target_id][eventName]) {
                  return false;
              }
              eventCallbacks[target_id][eventName] = null;
          }
          else {
              if (!eventCallbacks[eventName]) {
                  return false;
              }
              eventCallbacks[eventName] = null;
          }

          return true;
      }

      function isFunction(obj) {
          return !!(obj && obj.constructor && obj.call && obj.apply);
      }

      function isArray(obj) {
          return toString.call(obj) === '[object Array]';
      }

      // Give the init function the Froogaloop prototype for later instantiation
      Froogaloop.fn.init.prototype = Froogaloop.fn;

      // Listens for the message event.
      // W3C
      if (window.addEventListener) {
          window.addEventListener('message', onMessageReceived, false);
      }
      // IE
      else {
          window.attachEvent('onmessage', onMessageReceived);
      }

      // Expose froogaloop to the global object
      return (window.Froogaloop = window.$f = Froogaloop);

  })();
})();
