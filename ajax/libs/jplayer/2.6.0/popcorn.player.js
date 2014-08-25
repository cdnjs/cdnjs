(function( Popcorn ) {

  // combines calls of two function calls into one
  var combineFn = function( first, second ) {

    first = first || Popcorn.nop;
    second = second || Popcorn.nop;

    return function() {

      first.apply( this, arguments );
      second.apply( this, arguments );
    };
  };

  //  ID string matching
  var rIdExp  = /^(#([\w\-\_\.]+))$/;

  Popcorn.player = function( name, player ) {

    // return early if a player already exists under this name
    if ( Popcorn[ name ] ) {

      return;
    }

    player = player || {};

    var playerFn = function( target, src, options ) {

      options = options || {};

      // List of events
      var date = new Date() / 1000,
          baselineTime = date,
          currentTime = 0,
          readyState = 0,
          volume = 1,
          muted = false,
          events = {},

          // The container div of the resource
          container = typeof target === "string" ? Popcorn.dom.find( target ) : target,
          basePlayer = {},
          timeout,
          popcorn;

      if ( !Object.prototype.__defineGetter__ ) {

        basePlayer = container || document.createElement( "div" );
      }

      // copies a div into the media object
      for( var val in container ) {

        // don't copy properties if using container as baseplayer
        if ( val in basePlayer ) {

          continue;
        }

        if ( typeof container[ val ] === "object" ) {

          basePlayer[ val ] = container[ val ];
        } else if ( typeof container[ val ] === "function" ) {

          basePlayer[ val ] = (function( value ) {

            // this is a stupid ugly kludgy hack in honour of Safari
            // in Safari a NodeList is a function, not an object
            if ( "length" in container[ value ] && !container[ value ].call ) {

              return container[ value ];
            } else {

              return function() {

                return container[ value ].apply( container, arguments );
              };
            }
          }( val ));
        } else {

          Popcorn.player.defineProperty( basePlayer, val, {
            get: (function( value ) {

              return function() {

                return container[ value ];
              };
            }( val )),
            set: Popcorn.nop,
            configurable: true
          });
        }
      }

      var timeupdate = function() {

        date = new Date() / 1000;

        if ( !basePlayer.paused ) {

          basePlayer.currentTime = basePlayer.currentTime + ( date - baselineTime );
          basePlayer.dispatchEvent( "timeupdate" );
          timeout = setTimeout( timeupdate, 10 );
        }

        baselineTime = date;
      };

      basePlayer.play = function() {

        this.paused = false;

        if ( basePlayer.readyState >= 4 ) {

          baselineTime = new Date() / 1000;
          basePlayer.dispatchEvent( "play" );
          timeupdate();
        }
      };

      basePlayer.pause = function() {

        this.paused = true;
        basePlayer.dispatchEvent( "pause" );
      };

      Popcorn.player.defineProperty( basePlayer, "currentTime", {
        get: function() {

          return currentTime;
        },
        set: function( val ) {

          // make sure val is a number
          currentTime = +val;
          basePlayer.dispatchEvent( "timeupdate" );

          return currentTime;
        },
        configurable: true
      });

      Popcorn.player.defineProperty( basePlayer, "volume", {
        get: function() {

          return volume;
        },
        set: function( val ) {

          // make sure val is a number
          volume = +val;
          basePlayer.dispatchEvent( "volumechange" );
          return volume;
        },
        configurable: true
      });

      Popcorn.player.defineProperty( basePlayer, "muted", {
        get: function() {

          return muted;
        },
        set: function( val ) {

          // make sure val is a number
          muted = +val;
          basePlayer.dispatchEvent( "volumechange" );
          return muted;
        },
        configurable: true
      });

      Popcorn.player.defineProperty( basePlayer, "readyState", {
        get: function() {

          return readyState;
        },
        set: function( val ) {

          readyState = val;
          return readyState;
        },
        configurable: true
      });

      // Adds an event listener to the object
      basePlayer.addEventListener = function( evtName, fn ) {

        if ( !events[ evtName ] ) {

          events[ evtName ] = [];
        }

        events[ evtName ].push( fn );
        return fn;
      };

      // Removes an event listener from the object
      basePlayer.removeEventListener = function( evtName, fn ) {

        var i,
            listeners = events[ evtName ];

        if ( !listeners ){

          return;
        }

        // walk backwards so we can safely splice
        for ( i = events[ evtName ].length - 1; i >= 0; i-- ) {

          if( fn === listeners[ i ] ) {

            listeners.splice(i, 1);
          }
        }

        return fn;
      };

      // Can take event object or simple string
      basePlayer.dispatchEvent = function( oEvent ) {

        var evt,
            self = this,
            eventInterface,
            eventName = oEvent.type;

        // A string was passed, create event object
        if ( !eventName ) {

          eventName = oEvent;
          eventInterface  = Popcorn.events.getInterface( eventName );

          if ( eventInterface ) {

            evt = document.createEvent( eventInterface );
            evt.initEvent( eventName, true, true, window, 1 );
          }
        }

        if ( events[ eventName ] ) {

          for ( var i = events[ eventName ].length - 1; i >= 0; i-- ) {

            events[ eventName ][ i ].call( self, evt, self );
          }
        }
      };

      // Attempt to get src from playerFn parameter
      basePlayer.src = src || "";
      basePlayer.duration = 0;
      basePlayer.paused = true;
      basePlayer.ended = 0;

      options && options.events && Popcorn.forEach( options.events, function( val, key ) {

        basePlayer.addEventListener( key, val, false );
      });

      // true and undefined returns on canPlayType means we should attempt to use it,
      // false means we cannot play this type
      if ( player._canPlayType( container.nodeName, src ) !== false ) {

        if ( player._setup ) {

          player._setup.call( basePlayer, options );
        } else {

          // there is no setup, which means there is nothing to load
          basePlayer.readyState = 4;
          basePlayer.dispatchEvent( "loadedmetadata" );
          basePlayer.dispatchEvent( "loadeddata" );
          basePlayer.dispatchEvent( "canplaythrough" );
        }
      } else {

        // Asynchronous so that users can catch this event
        setTimeout( function() {
          basePlayer.dispatchEvent( "error" );
        }, 0 );
      }

      popcorn = new Popcorn.p.init( basePlayer, options );

      if ( player._teardown ) {

        popcorn.destroy = combineFn( popcorn.destroy, function() {

          player._teardown.call( basePlayer, options );
        });
      }

      return popcorn;
    };

    playerFn.canPlayType = player._canPlayType = player._canPlayType || Popcorn.nop;

    Popcorn[ name ] = Popcorn.player.registry[ name ] = playerFn;
  };

  Popcorn.player.registry = {};

  Popcorn.player.defineProperty = Object.defineProperty || function( object, description, options ) {

    object.__defineGetter__( description, options.get || Popcorn.nop );
    object.__defineSetter__( description, options.set || Popcorn.nop );
  };

  // player queue is to help players queue things like play and pause
  // HTML5 video's play and pause are asynch, but do fire in sequence
  // play() should really mean "requestPlay()" or "queuePlay()" and
  // stash a callback that will play the media resource when it's ready to be played
  Popcorn.player.playerQueue = function() {

    var _queue = [],
        _running = false;

    return {
      next: function() {

        _running = false;
        _queue.shift();
        _queue[ 0 ] && _queue[ 0 ]();
      },
      add: function( callback ) {

        _queue.push(function() {

          _running = true;
          callback && callback();
        });

        // if there is only one item on the queue, start it
        !_running && _queue[ 0 ]();
      }
    };
  };

  // Popcorn.smart will attempt to find you a wrapper or player. If it can't do that,
  // it will default to using an HTML5 video in the target.
  Popcorn.smart = function( target, src, options ) {
    var node = typeof target === "string" ? Popcorn.dom.find( target ) : target,
        i, srci, j, media, mediaWrapper, popcorn, srcLength, 
        // We leave HTMLVideoElement and HTMLAudioElement wrappers out
        // of the mix, since we'll default to HTML5 video if nothing
        // else works.  Waiting on #1254 before we add YouTube to this.
        wrappers = "HTMLYouTubeVideoElement HTMLVimeoVideoElement HTMLSoundCloudAudioElement HTMLNullVideoElement".split(" ");

    if ( !node ) {
      Popcorn.error( "Specified target `" + target + "` was not found." );
      return;
    }

    // If our src is not an array, create an array of one.
    src = typeof src === "string" ? [ src ] : src;

    // Loop through each src, and find the first playable.
    for ( i = 0, srcLength = src.length; i < srcLength; i++ ) {
      srci = src[ i ];

      // See if we can use a wrapper directly, if not, try players.
      for ( j = 0; j < wrappers.length; j++ ) {
        mediaWrapper = Popcorn[ wrappers[ j ] ];
        if ( mediaWrapper && mediaWrapper._canPlaySrc( srci ) === "probably" ) {
          media = mediaWrapper( node );
          popcorn = Popcorn( media, options );
          // Set src, but not until after we return the media so the caller
          // can get error events, if any.
          setTimeout( function() {
            media.src = srci;
          }, 0 );
          return popcorn;
        }
      }

      // No wrapper can play this, check players.
      for ( var key in Popcorn.player.registry ) {
        if ( Popcorn.player.registry.hasOwnProperty( key ) ) {
          if ( Popcorn.player.registry[ key ].canPlayType( node.nodeName, srci ) ) {
            // Popcorn.smart( player, src, /* options */ )
            return Popcorn[ key ]( node, srci, options );
          }
        }
      }
    }

    // If we don't have any players or wrappers that can handle this,
    // Default to using HTML5 video.  Similar to the HTMLVideoElement
    // wrapper, we put a video in the div passed to us via:
    // Popcorn.smart( div, src, options )
    var videoHTML,
        videoElement,
        videoID = Popcorn.guid( "popcorn-video-" ),
        videoHTMLContainer = document.createElement( "div" );

    videoHTMLContainer.style.width = "100%";
    videoHTMLContainer.style.height = "100%";

    // If we only have one source, do not bother with source elements.
    // This means we don't have the IE9 hack,
    // and we can properly listen to error events.
    // That way an error event can be told to backup to Flash if it fails.
    if ( src.length === 1 ) {
      videoElement = document.createElement( "video" );
      videoElement.id = videoID;
      node.appendChild( videoElement );
      setTimeout( function() {
        // Hack to decode html characters like &amp; to &
        var decodeDiv = document.createElement( "div" );
        decodeDiv.innerHTML = src[ 0 ];

        videoElement.src = decodeDiv.firstChild.nodeValue;
      }, 0 );
      return Popcorn( '#' + videoID, options );
    }

    node.appendChild( videoHTMLContainer );
    // IE9 doesn't like dynamic creation of source elements on <video>
    // so we do it in one shot via innerHTML.
    videoHTML = '<video id="' +  videoID + '" preload=auto autobuffer>';
    for ( i = 0, srcLength = src.length; i < srcLength; i++ ) {
      videoHTML += '<source src="' + src[ i ] + '">';
    }
    videoHTML += "</video>";
    videoHTMLContainer.innerHTML = videoHTML;

    if ( options && options.events && options.events.error ) {
      node.addEventListener( "error", options.events.error, false );
    }
    return Popcorn( '#' + videoID, options );
  };
})( Popcorn );
