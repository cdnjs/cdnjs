/*!
 * angular-fontselect v0.0.9
 * https://github.com/Jimdo/angular-fontselect
 *
 * A fontselect directive for AngularJS
 *
 * Copyright 2014, Jimdo, Hannes Diercks <hannes.diercks@jimdo.com>
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // bower_components/yepnope/yepnope.js
  // yepnope.js
  // Version - 1.5.4pre
  //
  // by
  // Alex Sexton - @SlexAxton - AlexSexton[at]gmail.com
  // Ralph Holzmann - @ralphholzmann - ralphholzmann[at]gmail.com
  //
  // http://yepnopejs.com/
  // https://github.com/SlexAxton/yepnope.js/
  //
  // Tri-license - WTFPL | MIT | BSD
  //
  // Please minify before use.
  // Also available as Modernizr.load via the Modernizr Project
  //
  ( function ( window, doc, undef ) {
  
  var docElement            = doc.documentElement,
      sTimeout              = window.setTimeout,
      firstScript           = doc.getElementsByTagName( "script" )[ 0 ],
      toString              = {}.toString,
      execStack             = [],
      started               = 0,
      noop                  = function () {},
      // Before you get mad about browser sniffs, please read:
      // https://github.com/Modernizr/Modernizr/wiki/Undetectables
      // If you have a better solution, we are actively looking to solve the problem
      isGecko               = ( "MozAppearance" in docElement.style ),
      isGeckoLTE18          = isGecko && !! doc.createRange().compareNode,
      insBeforeObj          = isGeckoLTE18 ? docElement : firstScript.parentNode,
      // Thanks to @jdalton for showing us this opera detection (by way of @kangax) (and probably @miketaylr too, or whatever...)
      isOpera               = window.opera && toString.call( window.opera ) == "[object Opera]",
      isIE                  = !! doc.attachEvent && !isOpera,
      strJsElem             = isGecko ? "object" : isIE  ? "script" : "img",
      strCssElem            = isIE ? "script" : strJsElem,
      isArray               = Array.isArray || function ( obj ) {
        return toString.call( obj ) == "[object Array]";
      },
      isObject              = function ( obj ) {
        return Object(obj) === obj;
      },
      isString              = function ( s ) {
        return typeof s == "string";
      },
      isFunction            = function ( fn ) {
        return toString.call( fn ) == "[object Function]";
      },
      globalFilters         = [],
      scriptCache           = {},
      prefixes              = {
        // key value pair timeout options
        timeout : function( resourceObj, prefix_parts ) {
          if ( prefix_parts.length ) {
            resourceObj['timeout'] = prefix_parts[ 0 ];
          }
          return resourceObj;
        }
      },
      handler,
      yepnope;
  
    /* Loader helper functions */
    function isFileReady ( readyState ) {
      // Check to see if any of the ways a file can be ready are available as properties on the file's element
      return ( ! readyState || readyState == "loaded" || readyState == "complete" || readyState == "uninitialized" );
    }
  
  
    // Takes a preloaded js obj (changes in different browsers) and injects it into the head
    // in the appropriate order
    function injectJs ( src, cb, attrs, timeout, /* internal use */ err, internal ) {
      var script = doc.createElement( "script" ),
          done, i;
  
      timeout = timeout || yepnope['errorTimeout'];
  
      script.src = src;
  
      // Add our extra attributes to the script element
      for ( i in attrs ) {
          script.setAttribute( i, attrs[ i ] );
      }
  
      cb = internal ? executeStack : ( cb || noop );
  
      // Bind to load events
      script.onreadystatechange = script.onload = function () {
  
        if ( ! done && isFileReady( script.readyState ) ) {
  
          // Set done to prevent this function from being called twice.
          done = 1;
          cb();
  
          // Handle memory leak in IE
          script.onload = script.onreadystatechange = null;
        }
      };
  
      // 404 Fallback
      sTimeout(function () {
        if ( ! done ) {
          done = 1;
          // Might as well pass in an error-state if we fire the 404 fallback
          cb(1);
        }
      }, timeout );
  
      // Inject script into to document
      // or immediately callback if we know there
      // was previously a timeout error
      err ? script.onload() : firstScript.parentNode.insertBefore( script, firstScript );
    }
  
    // Takes a preloaded css obj (changes in different browsers) and injects it into the head
    function injectCss ( href, cb, attrs, timeout, /* Internal use */ err, internal ) {
  
      // Create stylesheet link
      var link = doc.createElement( "link" ),
          done, i;
  
      timeout = timeout || yepnope['errorTimeout'];
  
      cb = internal ? executeStack : ( cb || noop );
  
      // Add attributes
      link.href = href;
      link.rel  = "stylesheet";
      link.type = "text/css";
  
      // Add our extra attributes to the link element
      for ( i in attrs ) {
        link.setAttribute( i, attrs[ i ] );
      }
  
      if ( ! err ) {
        firstScript.parentNode.insertBefore( link, firstScript );
        sTimeout(cb, 0);
      }
    }
  
    function executeStack ( ) {
      // shift an element off of the stack
      var i   = execStack.shift();
      started = 1;
  
      // if a is truthy and the first item in the stack has an src
      if ( i ) {
        // if it's a script, inject it into the head with no type attribute
        if ( i['t'] ) {
          // Inject after a timeout so FF has time to be a jerk about it and
          // not double load (ignore the cache)
          sTimeout( function () {
            (i['t'] == "c" ?  yepnope['injectCss'] : yepnope['injectJs'])( i['s'], 0, i['a'], i['x'], i['e'], 1 );
          }, 0 );
        }
        // Otherwise, just call the function and potentially run the stack
        else {
          i();
          executeStack();
        }
      }
      else {
        // just reset out of recursive mode
        started = 0;
      }
    }
  
    function preloadFile ( elem, url, type, splicePoint, dontExec, attrObj, timeout ) {
  
      timeout = timeout || yepnope['errorTimeout'];
  
      // Create appropriate element for browser and type
      var preloadElem = doc.createElement( elem ),
          done        = 0,
          firstFlag   = 0,
          stackObject = {
            "t": type,     // type
            "s": url,      // src
          //r: 0,        // ready
            "e": dontExec,// set to true if we don't want to reinject
            "a": attrObj,
            "x": timeout
          };
  
      // The first time (common-case)
      if ( scriptCache[ url ] === 1 ) {
        firstFlag = 1;
        scriptCache[ url ] = [];
      }
  
      function onload ( first ) {
        // If the script/css file is loaded
        if ( ! done && isFileReady( preloadElem.readyState ) ) {
  
          // Set done to prevent this function from being called twice.
          stackObject['r'] = done = 1;
  
          ! started && executeStack();
  
          // Handle memory leak in IE
          preloadElem.onload = preloadElem.onreadystatechange = null;
          if ( first ) {
            if ( elem != "img" ) {
              sTimeout(function(){ insBeforeObj.removeChild( preloadElem ) }, 50);
            }
  
            for ( var i in scriptCache[ url ] ) {
              if ( scriptCache[ url ].hasOwnProperty( i ) ) {
                scriptCache[ url ][ i ].onload();
              }
            }
          }
        }
      }
  
  
      // Setting url to data for objects or src for img/scripts
      if ( elem == "object" ) {
        preloadElem.data = url;
      } else {
        preloadElem.src = url;
  
        // Setting bogus script type to allow the script to be cached
        preloadElem.type = elem;
      }
  
      // Don't let it show up visually
      preloadElem.width = preloadElem.height = "0";
  
      // Attach handlers for all browsers
      preloadElem.onerror = preloadElem.onload = preloadElem.onreadystatechange = function(){
        onload.call(this, firstFlag);
      };
      // inject the element into the stack depending on if it's
      // in the middle of other scripts or not
      execStack.splice( splicePoint, 0, stackObject );
  
      // The only place these can't go is in the <head> element, since objects won't load in there
      // so we have two options - insert before the head element (which is hard to assume) - or
      // insertBefore technically takes null/undefined as a second param and it will insert the element into
      // the parent last. We try the head, and it automatically falls back to undefined.
      if ( elem != "img" ) {
        // If it's the first time, or we've already loaded it all the way through
        if ( firstFlag || scriptCache[ url ] === 2 ) {
          insBeforeObj.insertBefore( preloadElem, isGeckoLTE18 ? null : firstScript );
  
          // If something fails, and onerror doesn't fire,
          // continue after a timeout.
          sTimeout( onload, timeout );
        }
        else {
          // instead of injecting, just hold on to it
          scriptCache[ url ].push( preloadElem );
        }
      }
    }
  
    function load ( resource, type, dontExec, attrObj, timeout ) {
      // If this method gets hit multiple times, we should flag
      // that the execution of other threads should halt.
      started = 0;
  
      // We'll do 'j' for js and 'c' for css, yay for unreadable minification tactics
      type = type || "j";
      if ( isString( resource ) ) {
        // if the resource passed in here is a string, preload the file
        preloadFile( type == "c" ? strCssElem : strJsElem, resource, type, this['i']++, dontExec, attrObj, timeout );
      } else {
        // Otherwise it's a callback function and we can splice it into the stack to run
        execStack.splice( this['i']++, 0, resource );
        execStack.length == 1 && executeStack();
      }
  
      // OMG is this jQueries? For chaining...
      return this;
    }
  
    // return the yepnope object with a fresh loader attached
    function getYepnope () {
      var y = yepnope;
      y['loader'] = {
        "load": load,
        "i" : 0
      };
      return y;
    }
  
    /* End loader helper functions */
    // Yepnope Function
    yepnope = function ( needs ) {
  
      var i,
          need,
          // start the chain as a plain instance
          chain = this['yepnope']['loader'];
  
      function satisfyPrefixes ( url ) {
        // split all prefixes out
        var parts   = url.split( "!" ),
        gLen    = globalFilters.length,
        origUrl = parts.pop(),
        pLen    = parts.length,
        res     = {
          "url"      : origUrl,
          // keep this one static for callback variable consistency
          "origUrl"  : origUrl,
          "prefixes" : parts
        },
        mFunc,
        j,
        prefix_parts;
  
        // loop through prefixes
        // if there are none, this automatically gets skipped
        for ( j = 0; j < pLen; j++ ) {
          prefix_parts = parts[ j ].split( '=' );
          mFunc = prefixes[ prefix_parts.shift() ];
          if ( mFunc ) {
            res = mFunc( res, prefix_parts );
          }
        }
  
        // Go through our global filters
        for ( j = 0; j < gLen; j++ ) {
          res = globalFilters[ j ]( res );
        }
  
        // return the final url
        return res;
      }
  
      function getExtension ( url ) {
          return url.split(".").pop().split("?").shift();
      }
  
      function loadScriptOrStyle ( input, callback, chain, index, testResult ) {
        // run through our set of prefixes
        var resource     = satisfyPrefixes( input ),
            autoCallback = resource['autoCallback'],
            extension    = getExtension( resource['url'] );
  
        // if no object is returned or the url is empty/0 just exit the load
        if ( resource['bypass'] ) {
          return;
        }
  
        // Determine callback, if any
        if ( callback ) {
          callback = isFunction( callback ) ?
            callback :
            callback[ input ] ||
            callback[ index ] ||
            callback[ ( input.split( "/" ).pop().split( "?" )[ 0 ] ) ];
        }
  
        // if someone is overriding all normal functionality
        if ( resource['instead'] ) {
          return resource['instead']( input, callback, chain, index, testResult );
        }
        else {
          // Handle if we've already had this url and it's completed loaded already
          if ( scriptCache[ resource['url'] ] ) {
            // don't let this execute again
            resource['noexec'] = true;
          }
          else {
            scriptCache[ resource['url'] ] = 1;
          }
  
          // Throw this into the queue
          chain.load( resource['url'], ( ( resource['forceCSS'] || ( ! resource['forceJS'] && "css" == getExtension( resource['url'] ) ) ) ) ? "c" : undef, resource['noexec'], resource['attrs'], resource['timeout'] );
  
          // If we have a callback, we'll start the chain over
          if ( isFunction( callback ) || isFunction( autoCallback ) ) {
            // Call getJS with our current stack of things
            chain['load']( function () {
              // Hijack yepnope and restart index counter
              getYepnope();
              // Call our callbacks with this set of data
              callback && callback( resource['origUrl'], testResult, index );
              autoCallback && autoCallback( resource['origUrl'], testResult, index );
  
              // Override this to just a boolean positive
              scriptCache[ resource['url'] ] = 2;
            } );
          }
        }
      }
  
      function loadFromTestObject ( testObject, chain ) {
          var testResult = !! testObject['test'],
              group      = testResult ? testObject['yep'] : testObject['nope'],
              always     = testObject['load'] || testObject['both'],
              callback   = testObject['callback'] || noop,
              cbRef      = callback,
              complete   = testObject['complete'] || noop,
              needGroupSize,
              callbackKey;
  
          // Reusable function for dealing with the different input types
          // NOTE:: relies on closures to keep 'chain' up to date, a bit confusing, but
          // much smaller than the functional equivalent in this case.
          function handleGroup ( needGroup, moreToCome ) {
            if ( ! needGroup ) {
              // Call the complete callback when there's nothing to load.
              ! moreToCome && complete();
            }
            // If it's a string
            else if ( isString( needGroup ) ) {
              // if it's a string, it's the last
              if ( !moreToCome ) {
                // Add in the complete callback to go at the end
                callback = function () {
                  var args = [].slice.call( arguments );
                  cbRef.apply( this, args );
                  complete();
                };
              }
              // Just load the script of style
              loadScriptOrStyle( needGroup, callback, chain, 0, testResult );
            }
            // See if we have an object. Doesn't matter if it's an array or a key/val hash
            // Note:: order cannot be guaranteed on an key value object with multiple elements
            // since the for-in does not preserve order. Arrays _should_ go in order though.
            else if ( isObject( needGroup ) ) {
              // I hate this, but idk another way for objects.
              needGroupSize = (function(){
                var count = 0, i
                for (i in needGroup ) {
                  if ( needGroup.hasOwnProperty( i ) ) {
                    count++;
                  }
                }
                return count;
              })();
  
              for ( callbackKey in needGroup ) {
                // Safari 2 does not have hasOwnProperty, but not worth the bytes for a shim
                // patch if needed. Kangax has a nice shim for it. Or just remove the check
                // and promise not to extend the object prototype.
                if ( needGroup.hasOwnProperty( callbackKey ) ) {
                  // Find the last added resource, and append to it's callback.
                  if ( ! moreToCome && ! ( --needGroupSize ) ) {
                    // If this is an object full of callbacks
                    if ( ! isFunction( callback ) ) {
                      // Add in the complete callback to go at the end
                      callback[ callbackKey ] = (function( innerCb ) {
                        return function () {
                          var args = [].slice.call( arguments );
                          innerCb && innerCb.apply( this, args );
                          complete();
                        };
                      })( cbRef[ callbackKey ] );
                    }
                    // If this is just a single callback
                    else {
                      callback = function () {
                        var args = [].slice.call( arguments );
                        cbRef.apply( this, args );
                        complete();
                      };
                    }
                  }
                  loadScriptOrStyle( needGroup[ callbackKey ], callback, chain, callbackKey, testResult );
                }
              }
            }
          }
  
          // figure out what this group should do
          handleGroup( group, !!always );
  
          // Run our loader on the load/both group too
          // the always stuff always loads second.
          always && handleGroup( always );
      }
  
      // Someone just decides to load a single script or css file as a string
      if ( isString( needs ) ) {
        loadScriptOrStyle( needs, 0, chain, 0 );
      }
      // Normal case is likely an array of different types of loading options
      else if ( isArray( needs ) ) {
        // go through the list of needs
        for( i = 0; i < needs.length; i++ ) {
          need = needs[ i ];
  
          // if it's a string, just load it
          if ( isString( need ) ) {
            loadScriptOrStyle( need, 0, chain, 0 );
          }
          // if it's an array, call our function recursively
          else if ( isArray( need ) ) {
            yepnope( need );
          }
          // if it's an object, use our modernizr logic to win
          else if ( isObject( need ) ) {
            loadFromTestObject( need, chain );
          }
        }
      }
      // Allow a single object to be passed in
      else if ( isObject( needs ) ) {
        loadFromTestObject( needs, chain );
      }
    };
  
    // This publicly exposed function is for allowing
    // you to add functionality based on prefixes on the
    // string files you add. 'css!' is a builtin prefix
    //
    // The arguments are the prefix (not including the !) as a string
    // and
    // A callback function. This function is passed a resource object
    // that can be manipulated and then returned. (like middleware. har.)
    //
    // Examples of this can be seen in the officially supported ie prefix
    yepnope['addPrefix'] = function ( prefix, callback ) {
      prefixes[ prefix ] = callback;
    };
  
    // A filter is a global function that every resource
    // object that passes through yepnope will see. You can
    // of course conditionally choose to modify the resource objects
    // or just pass them along. The filter function takes the resource
    // object and is expected to return one.
    //
    // The best example of a filter is the 'autoprotocol' officially
    // supported filter
    yepnope['addFilter'] = function ( filter ) {
      globalFilters.push( filter );
    };
  
    // Default error timeout to 10sec - modify to alter
    yepnope['errorTimeout'] = 1e4;
  
    // Webreflection readystate hack
    // safe for jQuery 1.4+ ( i.e. don't use yepnope with jQuery 1.3.2 )
    // if the readyState is null and we have a listener
    if ( doc.readyState == null && doc.addEventListener ) {
      // set the ready state to loading
      doc.readyState = "loading";
      // call the listener
      doc.addEventListener( "DOMContentLoaded", handler = function () {
        // Remove the listener
        doc.removeEventListener( "DOMContentLoaded", handler, 0 );
        // Set it to ready
        doc.readyState = "complete";
      }, 0 );
    }
  
    // Attach loader &
    // Leak it
    window['yepnope'] = getYepnope();
  
    // Exposing executeStack to better facilitate plugins
    window['yepnope']['executeStack'] = executeStack;
    window['yepnope']['injectJs'] = injectJs;
    window['yepnope']['injectCss'] = injectCss;
  
  })( this, document );

  // src/js/helper.module.js
  var fontselectModule = angular.module('jdFontselect', []);

  // src/js/helper.defaults.js
  /** @const */
  var PROVIDER_WEBSAFE = 'Websafe Fonts';
  
  /** @const */
  var PROVIDER_GOOGLE = 'Google Fonts';
  
  /** @const */
  var PROVIDERS = [
    PROVIDER_WEBSAFE,
    PROVIDER_GOOGLE
  ];
  
  /** @const */
  var DEFAULT_WEBSAFE_FONTS = [
    {
      name: 'Arial',
      key: 'arial',
      category: 'sansserif',
      stack: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
      popularity: 3,
      lastModified: '2014-01-28'
    },
    {
      name: 'Courier New',
      key: 'couriernew',
      category: 'other',
      stack: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
      popularity: 1,
      lastModified: '2014-01-28'
    },
    {
      name: 'Verdana',
      key: 'verdana',
      category: 'sansserif',
      stack: 'Verdana, Geneva, sans-serif',
      popularity: 6,
      lastModified: '2014-01-28'
    },
    {
      name: 'Times New Roman',
      key: 'timesnewroman',
      category: 'serif',
      stack: 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif',
      popularity: 2,
      lastModified: '2014-01-28'
    },
    {
      name: 'Brush Script',
      key: 'brushscript',
      category: 'handwriting',
      stack: '"Brush Script MT", cursive',
      popularity: 5,
      lastModified: '2014-01-29'
    }
  ];
  
  fontselectModule.constant('jdFontselectConfig', {
    googleApiKey: false
  });

  // src/js/helper.google-font-categories.js
  /** @const */
  var GOOGLE_FONT_CATEGORIES = {
    'Handwriting': [
      'Patrick Hand SC',
      'Grand Hotel',
      'Calligraffitti',
      'Coming Soon',
      'Crafty Girls',
      'Homemade Apple',
      'Just Another Hand',
      'Montez',
      'Permanent Marker',
      'Rancho',
      'Redressed',
      'Rochester',
      'Rock Salt',
      'Satisfy',
      'Schoolbell',
      'Sunshiney',
      'Walter Turncoat',
      'Yellowtail',
      'Aguafina Script',
      'Aladin',
      'Alex Brush',
      'Allura',
      'Amatic SC',
      'Annie Use Your Telescope',
      'Architects Daughter',
      'Arizonia',
      'Bad Script',
      'Berkshire Swash',
      'Bilbo',
      'Bilbo Swash Caps',
      'Bonbon',
      'Butterfly Kids',
      'Cedarville Cursive',
      'Clicker Script',
      'Condiment',
      'Cookie',
      'Courgette',
      'Covered By Your Grace',
      'Damion',
      'Dancing Script',
      'Dawning of a New Day',
      'Delius',
      'Delius Swash Caps',
      'Delius Unicase',
      'Devonshire',
      'Dr Sugiyama',
      'Eagle Lake',
      'Engagement',
      'Euphoria Script',
      'Felipa',
      'Fondamento',
      'Give You Glory',
      'Gloria Hallelujah',
      'Gochi Hand',
      'Great Vibes',
      'Handlee',
      'Herr Von Muellerhoff',
      'Indie Flower',
      'Italianno',
      'Jim Nightshade',
      'Julee',
      'Just Me Again Down Here',
      'Kaushan Script',
      'Kristi',
      'La Belle Aurore',
      'League Script',
      'Leckerli One',
      'Loved by the King',
      'Lovers Quarrel',
      'Marck Script',
      'Meddon',
      'Meie Script',
      'Merienda',
      'Merienda One',
      'Mervale Script',
      'Miama',
      'Miss Fajardose',
      'Miss Saint Delafield',
      'Molle',
      'Monsieur La Doulaise',
      'Mr Bedford',
      'Mr Bedfort',
      'Mr Dafoe',
      'Mr De Haviland',
      'Mrs Saint Delafield',
      'Mrs Sheppards',
      'Neucha',
      'Niconne',
      'Norican',
      'Nothing You Could Do',
      'Over the Rainbow',
      'Pacifico',
      'Parisienne',
      'Patrick Hand',
      'Pecita',
      'Petit Formal Script',
      'Pinyon Script',
      'Princess Sofia',
      'Quintessential',
      'Qwigley',
      'Reenie Beanie',
      'Romanesco',
      'Rouge Script',
      'Ruge Boogie',
      'Ruthie',
      'Sacramento',
      'Shadows Into Light',
      'Shadows Into Light Two',
      'Short Stack',
      'Sofia',
      'Stalemate',
      'Sue Ellen Francisco',
      'Swanky and Moo Moo',
      'Tangerine',
      'The Girl Next Door',
      'Vibur',
      'Waiting for the Sunrise',
      'Yesteryear',
      'Zeyada',
      'Domine',
      'Donegal One'
    ],
    'Sans Serif': [
      'Wendy One',
      'Tauri',
      'Sintony',
      'Pathway Gothic One',
      'Noto Sans',
      'Monda',
      'Merriweather Sans',
      'Exo 2',
      'Aclonica',
      'Alef',
      'Alegreya Sans',
      'Alegreya Sans SC',
      'Denk One',
      'Droid Sans',
      'Droid Sans Mono',
      'Open Sans',
      'Open Sans Condensed',
      'Roboto',
      'Roboto Condensed',
      'Syncopate',
      'ABeeZee',
      'Abel',
      'Acme',
      'Actor',
      'Advent Pro',
      'Aldrich',
      'Allerta',
      'Allerta Stencil',
      'Amaranth',
      'Anaheim',
      'Andika',
      'Anonymous Pro',
      'Antic',
      'Anton',
      'Archivo Black',
      'Archivo Narrow',
      'Arimo',
      'Armata',
      'Asap',
      'Asul',
      'Average Sans',
      'Basic',
      'Belleza',
      'BenchNine',
      'Bubbler One',
      'Cabin',
      'Cabin Condensed',
      'Cagliostro',
      'Candal',
      'Cantarell',
      'Cantora One',
      'Capriola',
      'Carme',
      'Carrois Gothic',
      'Carrois Gothic SC',
      'Changa',
      'Chau Philomene One',
      'Chivo',
      'Coda Caption',
      'Convergence',
      'Cousine',
      'Cuprum',
      'Days One',
      'Didact Gothic',
      'Doppio One',
      'Dorsa',
      'Dosis',
      'Duru Sans',
      'Economica',
      'Electrolize',
      'Englebert',
      'Exo',
      'Federo',
      'Fjalla One',
      'Francois One',
      'Fresca',
      'Gafata',
      'Galdeano',
      'Geo',
      'Gudea',
      'Hammersmith One',
      'Hermeneus One',
      'Homenaje',
      'Imprima',
      'Inconsolata',
      'Inder',
      'Istok Web',
      'Jockey One',
      'Josefin Sans',
      'Josefin Sans Std Light',
      'Julius Sans One',
      'Jura',
      'Karla',
      'Kite One',
      'Krona One',
      'Lato',
      'Lekton',
      'Magra',
      'Mako',
      'Marmelad',
      'Marvel',
      'Maven Pro',
      'Merge One',
      'Metrophobic',
      'Michroma',
      'Molengo',
      'Montserrat',
      'Montserrat Alternates',
      'Montserrat Subrayada',
      'Mouse Memoirs',
      'Muli',
      'News Cycle',
      'Nobile',
      'Numans',
      'Nunito',
      'Orbitron',
      'Orienta',
      'Oswald',
      'Oxygen',
      'Oxygen Mono',
      'Paytone One',
      'Philosopher',
      'Play',
      'Pontano Sans',
      'Port Lligat Sans',
      'PT Mono',
      'PT Sans',
      'PT Sans Caption',
      'PT Sans Narrow',
      'Puritan',
      'Quantico',
      'Quattrocento Sans',
      'Questrial',
      'Quicksand',
      'Raleway',
      'Rambla',
      'Rationale',
      'Ropa Sans',
      'Rosario',
      'Ruda',
      'Ruluko',
      'Rum Raisin',
      'Russo One',
      'Sansation',
      'Scada',
      'Seymour One',
      'Shanti',
      'Share Tech',
      'Share Tech Mono',
      'Signika',
      'Signika Negative',
      'Six Caps',
      'Snippet',
      'Source Code Pro',
      'Source Sans Pro',
      'Spinnaker',
      'Strait',
      'Strong',
      'Telex',
      'Tenor Sans',
      'Terminal Dosis',
      'Terminal Dosis Light',
      'Text Me One',
      'Titillium Web',
      'Tuffy',
      'Varela',
      'Varela Round',
      'Viga',
      'Voltaire',
      'Wire One',
      'Yanone Kaffeesatz',
      'Ubuntu',
      'Ubuntu Condensed',
      'Ubuntu Mono'
    ],
    'Display': [
      'Vampiro One',
      'Snowburst One',
      'Purple Purse',
      'New Rocker',
      'Milonga',
      'Margarine',
      'Lily Script One',
      'Kavoon',
      'Hanalei',
      'Hanalei Fill',
      'Fruktur',
      'Freckle Face',
      'Elsie',
      'Elsie Swash Caps',
      'Cherry Cream Soda',
      'Chewy',
      'Creepster Caps',
      'Crushed',
      'Fontdiner Swanky',
      'Irish Grover',
      'Irish Growler',
      'Kranky',
      'Luckiest Guy',
      'Maiden Orange',
      'Mountains of Christmas',
      'Slackey',
      'Smokum',
      'Special Elite',
      'Unkempt',
      'Abril Fatface',
      'Akronim',
      'Alfa Slab One',
      'Allan',
      'Almendra Display',
      'Amarante',
      'Arbutus',
      'Asset',
      'Astloch',
      'Atomic Age',
      'Aubrey',
      'Audiowide',
      'Autour One',
      'Averia Gruesa Libre',
      'Averia Libre',
      'Averia Sans Libre',
      'Averia Serif Libre',
      'Bangers',
      'Baumans',
      'Bevan',
      'Bigelow Rules',
      'Bigshot One',
      'Black Ops One',
      'Boogaloo',
      'Bowlby One',
      'Bowlby One SC',
      'Bubblegum Sans',
      'Buda',
      'Butcherman',
      'Butcherman Caps',
      'Cabin Sketch',
      'Caesar Dressing',
      'Carter One',
      'Ceviche One',
      'Changa One',
      'Chango',
      'Chela One',
      'Chelsea Market',
      'Cherry Swash',
      'Chicle',
      'Cinzel Decorative',
      'Clara',
      'Coda',
      'Codystar',
      'Combo',
      'Comfortaa',
      'Concert One',
      'Contrail One',
      'Corben',
      'Creepster',
      'Croissant One',
      'Diplomata',
      'Diplomata SC',
      'Dynalight',
      'Eater',
      'Eater Caps',
      'Emblema One',
      'Emilys Candy',
      'Erica One',
      'Ewert',
      'Expletus Sans',
      'Fascinate',
      'Fascinate Inline',
      'Faster One',
      'Federant',
      'Finger Paint',
      'Flamenco',
      'Flavors',
      'Forum',
      'Fredericka the Great',
      'Fredoka One',
      'Frijole',
      'Fugaz One',
      'Galindo',
      'Geostar',
      'Geostar Fill',
      'Germania One',
      'Glass Antiqua',
      'Goblin One',
      'Gorditas',
      'Graduate',
      'Gravitas One',
      'Griffy',
      'Gruppo',
      'Happy Monkey',
      'Henny Penny',
      'Iceberg',
      'Iceland',
      'Jacques Francois Shadow',
      'Jolly Lodger',
      'Joti One',
      'Keania One',
      'Kelly Slab',
      'Kenia',
      'Knewave',
      'Lancelot',
      'Lemon',
      'Lemon One',
      'Life Savers',
      'Lilita One',
      'Limelight',
      'Lobster',
      'Lobster Two',
      'Londrina Outline',
      'Londrina Shadow',
      'Londrina Sketch',
      'Londrina Solid',
      'Love Ya Like A Sister',
      'Macondo',
      'Macondo Swash Caps',
      'McLaren',
      'MedievalSharp',
      'Medula One',
      'Megrim',
      'Metal Mania',
      'Metamorphous',
      'Miltonian',
      'Miltonian Tattoo',
      'Miniver',
      'Modern Antiqua',
      'Monofett',
      'Monoton',
      'Mystery Quest',
      'Nixie One',
      'Nosifer',
      'Nosifer Caps',
      'Nova Cut',
      'Nova Flat',
      'Nova Mono',
      'Nova Oval',
      'Nova Round',
      'Nova Script',
      'Nova Slim',
      'Nova Square',
      'Offside',
      'Oldenburg',
      'Oleo Script',
      'Oleo Script Swash Caps',
      'Oregano',
      'Original Surfer',
      'Overlock',
      'Overlock SC',
      'Paprika',
      'Passero One',
      'Passion One',
      'Patua One',
      'Peralta',
      'Piedra',
      'Pirata One',
      'Plaster',
      'Playball',
      'Poetsen One',
      'Poiret One',
      'Poller One',
      'Pompiere',
      'Press Start 2P',
      'Prosto One',
      'Racing Sans One',
      'Raleway Dots',
      'Rammetto One',
      'Ranchers',
      'Revalia',
      'Ribeye',
      'Ribeye Marrow',
      'Righteous',
      'Risque',
      'Ruslan Display',
      'Rye',
      'Sail',
      'Salsa',
      'Sancreek',
      'Sansita One',
      'Sarina',
      'Seaweed Script',
      'Sevillana',
      'Share',
      'Shojumaru',
      'Sigmar One',
      'Simonetta',
      'Sirin Stencil',
      'Skranji',
      'Smythe',
      'Sniglet',
      'Sofadi One',
      'Sonsie One',
      'Spicy Rice',
      'Spirax',
      'Squada One',
      'Stalinist One',
      'Stalin One',
      'Stardos Stencil',
      'Stint Ultra Condensed',
      'Stint Ultra Expanded',
      'Supermercado One',
      'Titan One',
      'Trade Winds',
      'Trochut',
      'Tulpen One',
      'Uncial Antiqua',
      'Underdog',
      'Unica One',
      'UnifrakturCook',
      'UnifrakturMaguntia',
      'Unlock',
      'Vast Shadow',
      'Voces',
      'VT323',
      'Wallpoet',
      'Warnes',
      'Wellfleet',
      'Yeseva One'
    ],
    'Serif': [
      'Roboto Slab',
      'Noto Serif',
      'Libre Baskerville',
      'Gabriela',
      'Fauna One',
      'Droid Serif',
      'jsMath cmbx10',
      'jsMath cmex10',
      'jsMath cmmi10',
      'jsMath cmr10',
      'jsMath cmsy10',
      'jsMath cmti10',
      'Ultra',
      'Adamina',
      'Alegreya',
      'Alegreya SC',
      'Alice',
      'Alike',
      'Alike Angular',
      'Almendra',
      'Almendra SC',
      'Amethysta',
      'Amiri',
      'Andada',
      'Andada SC',
      'Antic Didone',
      'Antic Slab',
      'Arapey',
      'Arbutus Slab',
      'Artifika',
      'Arvo',
      'Average',
      'Balthazar',
      'Belgrano',
      'Bentham',
      'Bitter',
      'Brawler',
      'Bree Serif',
      'Buenard',
      'Cambo',
      'Cantata One',
      'Cardo',
      'Caudex',
      'Cinzel',
      'Copse',
      'Coustard',
      'Crete Round',
      'Crimson Text',
      'Cutive',
      'Cutive Mono',
      'Della Respira',
      'EB Garamond',
      'Enriqueta',
      'Esteban',
      'Fanwood Text',
      'Fenix',
      'Fjord One',
      'Gentium Basic',
      'Gentium Book Basic',
      'Gilda Display',
      'Glegoo',
      'Goudy Bookletter 1911',
      'Habibi',
      'Headland One',
      'Holtwood One SC',
      'IM Fell Double Pica',
      'IM Fell Double Pica SC',
      'IM Fell DW Pica',
      'IM Fell DW Pica SC',
      'IM Fell English',
      'IM Fell English SC',
      'IM Fell French Canon',
      'IM Fell French Canon SC',
      'IM Fell Great Primer',
      'IM Fell Great Primer SC',
      'Inika',
      'Italiana',
      'Jacques Francois',
      'Josefin Slab',
      'Judson',
      'Junge',
      'Kameron',
      'Kotta One',
      'Kreon',
      'Ledger',
      'Linden Hill',
      'Lora',
      'Lusitana',
      'Lustria',
      'Marcellus',
      'Marcellus SC',
      'Marko One',
      'Mate',
      'Mate SC',
      'Merriweather',
      'Montaga',
      'Neuton',
      'Noticia Text',
      'OFL Sorts Mill Goudy TT',
      'Old Standard TT',
      'Oranienbaum',
      'Ovo',
      'Petrona',
      'Playfair Display',
      'Playfair Display SC',
      'Podkova',
      'Poly',
      'Port Lligat Slab',
      'Prata',
      'Prociono',
      'PT Serif',
      'PT Serif Caption',
      'Quando',
      'Quattrocento',
      'Radley',
      'Rokkitt',
      'Rosarivo',
      'Rufina',
      'Sanchez',
      'Sedan',
      'Sedan SC',
      'Sorts Mill Goudy',
      'Stoke',
      'Tienne',
      'Tinos',
      'Trocchi',
      'Trykker',
      'Unna',
      'Vidaloka',
      'Volkhov',
      'Vollkorn'
    ],
    'Other': [
      'Angkor',
      'Battambang',
      'Bayon',
      'Bokor',
      'Chenla',
      'Content',
      'Dangrek',
      'Fasthand',
      'Freehand',
      'GFS Didot',
      'GFS Neohellenic',
      'Hanuman',
      'Kantumruy',
      'Kdam Thmor',
      'Khmer',
      'Koulen',
      'Metal',
      'Moul',
      'Moulpali',
      'Nokora',
      'Odor Mean Chey',
      'Preahvihear',
      'Siemreap',
      'Suwannaphum',
      'Taprom'
    ]
  };

  // src/js/helper.functions.js
  function _bind(fn, me) {
    return function() {
      return fn.apply(me, arguments);
    };
  }
  
  function _createKey(name) {
    return name.toLowerCase().replace(/[^a-z]+/g, '-');
  }

  // src/js/filter.start-from.js
  /* From: http://tech.small-improvements.com/2013/09/10/angularjs-performance-with-large-lists/ */
  fontselectModule.filter('startFrom', function() {
    return function(input, start) {
      if (!angular.isArray(input)) {
        return input;
      }
  
      return input.slice(start);
    };
  });

  // src/js/filter.fuzzy-search.js
  /**
   * Fuzzy search filter for angular.
   * Remove all entries from list that do not contain the
   * characters of our search (in the right sequence)
   *
   * Allow a configurable amount of typos (default: 1)
   *
   * @author Tim Sebastian <tim.sebastian@jimdo.com>
   * @author Hannes Diercks <hannes.diercks@jimdo.com>
   */
  fontselectModule.filter('fuzzySearch', function() {
    /** @const */
    var DEFAULTS = {
      teAmount: 0,
      tePercent: 0.3
    };
  
    return function(inputs, search, options) {
      if (!angular.isArray(inputs) || angular.isUndefined(search)) {
        return inputs;
      }
  
      var strict = true;
      var searches = [];
  
      options = angular.extend(DEFAULTS, options);
  
      function getRegex(str) {
        return new RegExp(str.replace(/./g, function(i) {return '([^' + i + ']*?(?:' + i + '))?'; }),'i');
      }
  
      var filter = function(input, matcher, length) {
        var matches = (input.match(matcher)||[]).filter(function(match, i) { return i !== 0 && match; });
  
        var errorAmountIsOk = (matches.length + options.teAmount) >= length;
        var errorPercentageIsOk = matches.length / length >= 1 - options.tePercent;
  
        return errorAmountIsOk || errorPercentageIsOk;
      };
  
      if (angular.isString(search)) {
        var rgx = getRegex(search);
  
        strict = false;
  
        angular.forEach(inputs[0], function(val, key) {
          if (key.substring(0, 1) === '$') {
            return;
          }
          searches.push({
            key: key,
            search: rgx,
            length: search.length
          });
        });
      } else if (angular.isObject(search)) {
        var valid = false;
        angular.forEach(search, function(s, k) {
          if (angular.isUndefined(s)) {
            return;
          }
          valid = true;
          searches.push({
            key: k,
            search: getRegex(s),
            length: s.length
          });
        });
  
        if (!valid) {
          return inputs;
        }
      }
  
      inputs = inputs.filter(function(input) {
        for (var i = 0, l = searches.length; i < l; i++) {
          var src = searches[i],
              searchVal = input[src.key] || '',
              ok = filter(searchVal, src.search, src.length);
  
          if (strict && !ok) {
            return false;
          } else if(ok) {
            return true;
          }
        }
  
        return false;
      });
  
      return inputs;
    };
  });

  // src/js/service.fonts.js
  /** @const */
  var REQUIRED_FONT_OBJECT_KEYS = [
    'name',
    'key',
    'stack'
  ];
  
  /** @const */
  var SUPPORT_KHMER = false;
  
  /** @const */
  var METHOD_GET = 'get';
  
  /** @const */
  var URL_GOOGLE_FONTS_API = 'https://www.googleapis.com/webfonts/v1/webfonts';
  
  /** @const */
  var URL_WEBFONTLOADER = '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
  
  /** @const */
  var SUBSET_CYRILLIC = 'cyrillic';
  
  /** @const */
  var SUBSET_CYRILLIC_EXT = 'cyrillic-ext';
  
  /** @const */
  var SUBSET_GREEK = 'greek';
  
  /** @const */
  var SUBSET_GREEK_EXT = 'greek-ext';
  
  /** @const */
  var SUBSET_LATIN = 'latin';
  
  /** @const */
  var SUBSET_LATIN_EXT = 'latin-ext';
  
  /** @const */
  var SUBSET_VIETNAMESE = 'vietnamese';
  
  /** @const */
  var SUBSET_PRIORITY = [
    SUBSET_LATIN,
    SUBSET_LATIN_EXT,
    SUBSET_GREEK,
    SUBSET_GREEK_EXT,
    SUBSET_CYRILLIC,
    SUBSET_CYRILLIC_EXT,
    SUBSET_VIETNAMESE
  ];
  
  /** @const */
  var VARIANTS_REGULAR = ['regular', '400', '300', '500'];
  
  /** @const */
  var VARIANTS_LIGHT = ['light', '100', '200'];
  
  /** @const */
  var VARIANTS_BOLD = ['bold', '600', '700', '800', '900'];
  
  /** @const */
  var VARIANTS_ITALIC = ['italic', '400italic', '300italic', '500italic'];
  
  /** @const */
  var VARIANTS_LIGHT_ITALIC = ['lightitalic', '100italic', '200italic'];
  
  /** @const */
  var VARIANTS_BOLD_ITALIC = ['bolditalic', '600italic', '700italic', '800italic', '900italic'];
  
  /** @const */
  var VARIANT_PRIORITY = VARIANTS_REGULAR.concat(
    VARIANTS_LIGHT,
    VARIANTS_BOLD,
    VARIANTS_ITALIC,
    VARIANTS_LIGHT_ITALIC,
    VARIANTS_BOLD_ITALIC
  );
  
  
  var _webFontLoaderInitiated = false;
  
  var _webFontLoaderDeferred, _webFontLoaderPromise;
  
  
  function FontsService($http, $q, config) {
    var self = this;
  
    self.config = config;
    self.$http = $http;
    self.$q = $q;
  
    _webFontLoaderDeferred = $q.defer();
    _webFontLoaderPromise = _webFontLoaderDeferred.promise;
    
    self._init();
  
    return self;
  }
  
  FontsService.prototype = {
    _init: function() {
      var self = this;
      
      self._fonts = self._fonts || {};
      self._map = {};
      self._addDefaultFonts();
    },
  
    getAllFonts: function() {
      return this._fonts;
    },
  
    add: function(fontObj, provider) {
      var self = this;
  
      if (!angular.isString(provider)) {
        provider = PROVIDER_WEBSAFE;
      }
  
      if (!self.isValidFontObject(fontObj)) {
        throw 'Invalid font object.';
      }
  
      if (!angular.isArray(self._fonts[provider])) {
        self._fonts[provider] = [];
      }
  
      if (!angular.isObject(self._map[provider])) {
        self._map[provider] = {};
      }
  
      var index = self._fonts[provider].push(fontObj)-1;
  
      self._map[provider][fontObj.key] = index;
    },
  
    getFontByKey: function(key, provider) {
      var self = this;
      
      if (!angular.isString(provider)) {
        throw 'Provider is not set.';
      }
  
      try {
        return self._fonts[provider][self._map[provider][key]];
      } catch (e) {
        throw 'Font "' + key + '" not found in "' + provider + '".';
      }
    },
  
    removeFont: function(font, provider) {
      var self = this;
  
      if (angular.isString(font)) {
        font = self.getFontByKey(font, provider);
      }
  
      try {
        var index = self._fonts[provider].indexOf(font);
        var retVal = 0;
  
        if (index >= 0) {
          delete self._map[provider][font.key];
          retVal = self._fonts[provider].splice(index, 1).length;
          self._remap(provider, index);
        }
        return retVal;
      } catch (e) {
        return 0;
      }
    },
  
    isValidFontObject: function(fontObj) {
      if (!angular.isObject(fontObj)) {
        return false;
      }
  
      var valid = true;
  
      angular.forEach(REQUIRED_FONT_OBJECT_KEYS, function(key) {
        if (angular.isUndefined(fontObj[key])) {
          valid = false;
        }
      });
  
      return valid;
    },
  
    getCategories: function() {
      return [
        {
          name: 'Serif',
          key: 'serif',
          fallback: 'serif'
        },
        {
          name: 'Sans Serif',
          key: 'sansserif',
          fallback: 'sans-serif'
        },
        {
          name: 'Handwriting',
          key: 'handwriting',
          fallback: 'cursive'
          
        },
        {
          name: 'Display',
          key: 'display',
          fallback: 'cursive'
        },
        {
          name: 'Other',
          key: 'other',
          fallback: 'sans-serif'
        }
      ];
    },
  
    load: function(font, provider) {
      if (font.loaded) {
        return;
      }
  
      font.loaded = true;
  
      if (provider === PROVIDER_WEBSAFE) {
        return;
      }
  
      this['_load' + provider](font);
    },
  
    _remap: function(provider, from) {
      var self = this;
      var fonts = self._fonts[provider];
  
      if (!angular.isNumber(from)) {
        from = 0;
      }
  
      for (var i = from, l = fonts.length; i < l; i++) {
        self._map[provider][fonts[i].key] = i;
      }
    },
  
    _getBestOf: function(things, prios) {
      for (var i = 0, l = prios.length; i < l; i++) {
        var thing = prios[i];
        if (things.indexOf(thing) >= 0) {
          return thing;
        }
      }
      return things[0];
    },
  
    _getBestVariantOf: function(variants) {
      return this._getBestOf(variants, VARIANT_PRIORITY);
    },
  
    _getBestSubsetOf: function(subsets) {
      return this._getBestOf(subsets, SUBSET_PRIORITY);
    },
  
    _initWebFontLoader: function() {
      if (_webFontLoaderInitiated) {
        return;
      }
  
      _webFontLoaderInitiated = true;
  
      yepnope({
        test: typeof WebFont !== 'undefined',
        nope: URL_WEBFONTLOADER,
        complete: function() {
          _webFontLoaderDeferred.resolve(WebFont);
        }
      });
    },
  
    _initGoogleFonts: function() {
      var self = this;
  
      if (!self.config.googleApiKey) {
        return;
      }
  
      self._initWebFontLoader();
  
      self.$http({
        method: METHOD_GET,
        url: URL_GOOGLE_FONTS_API,
        params: {
          sort: 'popularity',
          key: self.config.googleApiKey
        }
      }).success(function(response) {
        var amount = response.items.length;
  
        angular.forEach(response.items, function(font, i) {
          var category = self._getGoogleFontCat(font.family);
  
          if (SUPPORT_KHMER || font.subsets.length === 1 && font.subsets[0] === 'khmer') {
            return;
          }
  
          self.add({
            subsets: font.subsets,
            variants: font.variants,
            name: font.family,
            popularity: amount - i,
            key: _createKey(font.family),
            lastModified: font.lastModified,
            stack: '"' + font.family + '" ' + category.fallback,
            category: category.key
          }, PROVIDER_GOOGLE);
        });
      });
    },
  
    _getGoogleFontCat: function(font) {
      var self = this;
  
      var categories = self.getCategories();
      for (var i = 0, l = categories.length; i < l; i++) {
        var category = categories[i];
  
        if (typeof GOOGLE_FONT_CATEGORIES[category.name] === 'undefined') {
          continue;
        }
  
        if (GOOGLE_FONT_CATEGORIES[category.name].indexOf(font) >= 0) {
          return category;
        }
      }
  
      // console.error('Category not Found:', font);
      return categories[5];
    },
  
    _addDefaultFonts: function() {
      var self = this;
  
      angular.forEach(DEFAULT_WEBSAFE_FONTS, function(font) {
        self.add(font);
      });
    }
  };
  
  
  FontsService.prototype['_load' + PROVIDER_GOOGLE] = function(font) {
    var self = this;
  
    _webFontLoaderPromise.then(function(WebFont) {
      try {
        WebFont.load({
          google: {
            families: [font.name + ':' + self._getBestVariantOf(font.variants)],
            text: font.name,
            subset: self._getBestSubsetOf(font.subsets)
          }
        });
      } catch (e) {
        self.removeFont(font, PROVIDER_GOOGLE);
      }
    });
  };
  
  fontselectModule.factory(
    'jdFontselect.fonts',
    ['$http', '$q', 'jdFontselectConfig', function($http, $q, config) { return new FontsService($http, $q, config); }]
  );

  // src/js/directive.fontselect.js
  var id = 1;
  
  fontselectModule.directive('jdFontselect', [function() {
    return {
      scope: {},
      restrict: 'E',
      templateUrl: 'fontselect.html',
      replace: true,
      controller: ['$scope', 'jdFontselect.fonts', function($scope, fontsService) {
        $scope.fonts = fontsService.getAllFonts();
        $scope.id = id++;
        $scope.providers = PROVIDERS;
        $scope.active = false;
        $scope.categories = fontsService.getCategories();
        $scope.searchAttrs = [
          {
            name: 'Popularity',
            key: 'popularity',
            dir: true
          },
          {
            name: 'Alphabet',
            key: 'name',
            dir: false
          },
          {
            name: 'Latest',
            key: 'lastModified',
            dir: true
          }
        ];
  
        $scope.current = {
          sort: {
            attr: $scope.searchAttrs[0],
            direction: true
          },
          provider: PROVIDER_WEBSAFE,
          category: undefined,
          font: undefined,
          search: undefined
        };
  
        $scope.reverseSort = function() {
          var sort = $scope.current.sort;
  
          sort.direction = !sort.direction;
        };
  
        $scope.toggle = function() {
          $scope.active = !$scope.active;
        };
  
        $scope.setCategoryFilter = function(category) {
          var current = $scope.current;
  
          if (current.category === category) {
            current.category = undefined;
          } else {
            current.category = category;
          }
        };
      }]
    };
  }]);

  // src/js/directive.fontlist.js
  fontselectModule.directive('jdFontlist', ['jdFontselect.fonts', function(fontsService) {
    return {
      scope: {
        id: '=fsid',
        fonts: '=',
        current: '=',
        providerName: '@provider'
      },
      restrict: 'E',
      templateUrl: 'fontlist.html',
      replace: true,
      controller: ['$scope', '$filter', function($scope, $filter) {
        var _filteredFonts;
        var _lastPageCount = 0;
        var _activated = [PROVIDER_WEBSAFE];
        var _initiate = {};
  
        $scope.page = {
          size: 30,
          count: 0,
          current: 0
        };
  
        $scope.providerKey = _createKey($scope.providerName);
  
        /**
         * Set the current page
         *
         * @param {Number} currentPage
         * @return {void}
         */
        $scope.setCurrentPage = function(currentPage) {
          $scope.page.current = currentPage;
        };
  
        /**
         * Get an array with the length similar to the
         * amount of pages we have. (So we can use it in a repeater)
         *
         * Also update the current page and the current amount of pages.
         *
         * @return {Array}
         */
        $scope.getPages = function() {
          _updatePageCount();
          var pages = new Array($scope.page.count);
  
          _updateCurrentPage();
  
          /* Display the page buttons only if we have at least two pages. */
          if (pages.length <= 1) {
            return [];
          }
          return pages;
        };
  
        /**
         * Check if this list is active
         *
         * @return {Boolean}
         */
        $scope.isActive = function() {
          return $scope.current.provider === $scope.providerName;
        };
  
        /**
         * Apply the current filters to our internal font object.
         *
         * @return {Array}
         */
        $scope.getFilteredFonts = function() {
          if (!angular.isArray($scope.fonts)) {
            _filteredFonts = [];
          } else {
            var direction = $scope.current.sort.attr.dir;
  
            _filteredFonts = $filter('fuzzySearch')($scope.fonts, {name: $scope.current.search});
            _filteredFonts = $filter('filter')(_filteredFonts, {category: $scope.current.category}, true);
            _filteredFonts = $filter('orderBy')(
              _filteredFonts,
              $scope.current.sort.attr.key,
              $scope.current.sort.direction ? direction : !direction
            );
          }
  
          return _filteredFonts;
        };
  
        /**
         * Activate or deactivate the this List.
         *
         * @return {void}
         */
        $scope.toggle = function() {
          if ($scope.isActive()) {
            $scope.current.provider = undefined;
          } else {
            if (_activated.indexOf($scope.providerName) < 0) {
              _initiate[$scope.providerName]();
              _activated.push($scope.providerName);
            }
            $scope.current.provider = $scope.providerName;
          }
        };
  
        /**
         * Calculate the amount of pages we have.
         *
         * @return {void}
         */
        function _updatePageCount() {
          _lastPageCount = $scope.page.count;
  
          if (!angular.isArray($scope.fonts)) {
            return 0;
          }
  
          if (_filteredFonts.length) {
            $scope.page.count = Math.ceil(_filteredFonts.length / $scope.page.size);
          }
        }
  
        /**
         * Whenever the amount of pages is changing:
         * Make sure we're not staying on a page that does not exist.
         * And if we have a font selected, try to stay on the page of
         * that font.
         *
         * @return {void}
         */
        function _updateCurrentPage() {
          /* do nothing if the amount of pages hasn't change */
          if (_lastPageCount === $scope.page.count) {
            return;
          }
  
          /* try to get the complete current font object */
          var currentFont = fontsService.getFontByKey($scope.current.font, $scope.providerName);
          /* check if the current font is anywhere on our current pages */
          var index = _filteredFonts.indexOf(currentFont);
  
          /* If we have a font selected and it's inside the filter we use */
          if (currentFont && index >= 0) {
            /* go to this page */
            $scope.page.current = Math.ceil((index + 1) / $scope.page.size) - 1;
          } else {
            /* Just go to the last page if the current does not exist */
            if ($scope.page.current > $scope.page.count) {
              $scope.page.current = $scope.page.count-1;
            }
          }
        }
  
        /**
         * Initiation for the google list.
         *
         * @return {void}
         */
        _initiate[PROVIDER_GOOGLE] = function() {
          fontsService._initGoogleFonts();
        };
      }] /* controller END */
    };
  }]);

  // src/js/directive.font.js
  fontselectModule.directive('jdFont', ['jdFontselect.fonts', function(fontsService) {
    return {
      templateUrl: 'font.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', function($scope) {
        fontsService.load($scope.font, $scope.providerName);
      }]
    };
  }]);

  // src/partials/all.js
  angular.module('jdFontselect').run(['$templateCache', function($templateCache) {
    'use strict';
  
    $templateCache.put('font.html',
      "<li><input type=radio ng-model=current.font value={{font.key}} name=jdfs-{{id}}-font id=jdfs-{{id}}-font-{{font.key}}><label for=jdfs-{{id}}-font-{{font.key}} style=\"font-family: {{font.stack}}\">{{font.name}}</label></li>"
    );
  
  
    $templateCache.put('fontlist.html',
      "<div class=\"jdfs-provider jdfs-provider-{{providerKey}}\" ng-class=\"{'jdfs-active': isActive()}\"><h3 ng-click=toggle()>{{providerName}}</h3><div ng-if=isActive()><ul><jd-font ng-repeat=\"font in getFilteredFonts() | startFrom: page.current * page.size | limitTo: page.size\"></ul><button ng-repeat=\"i in getPages() track by $index\" ng-class=\"{'jdfs-active': page.current == $index}\" ng-click=setCurrentPage($index)>{{$index + 1}}</button></div></div>"
    );
  
  
    $templateCache.put('fontselect.html',
      "<div class=jdfs-main id=jd-fontselect-{{id}}><button ng-click=toggle() class=jdfs-toggle>Select Font</button><div class=jdfs-window ng-show=active><input name=jdfs-{{id}}-search ng-model=current.search><select ng-model=current.sort.attr ng-options=\"a.name for a in searchAttrs\"></select><button ng-click=reverseSort()>{{current.sort.direction ? '▼' : '▲'}}</button><div><button ng-repeat=\"category in categories\" ng-class=\"{'jdfs-active': category.key == current.category}\" ng-click=setCategoryFilter(category.key) ng-model=current.category>{{category.name}}</button></div><jd-fontlist fsid=id current=current fonts=fonts[provider] provider={{provider}} ng-repeat=\"provider in providers\"></div></div>"
    );
  
  }]);
})(angular);
