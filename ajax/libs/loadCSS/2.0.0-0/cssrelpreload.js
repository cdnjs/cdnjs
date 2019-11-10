/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
/* This file is meant as a standalone workflow for:
- testing support for link[rel=preload]
- enabling async CSS loading in browsers that do not support rel=preload
- synchronously activating preload stylesheets that have been cached already
*/
(function( w ){
  "use strict";
  // rel=preload support test
  if( !w.loadCSS ){
    w.loadCSS = function(){};
  }
  var rp = loadCSS.relpreload = {};
  // rel=preload feature support test
  rp.support = function(){
    try {
      return w.document.createElement( "link" ).relList.supports( "preload" );
    } catch (e) {
      return false;
    }
  };

  // function to enable a stylesheet so it applies
  rp.enableStylesheet = function( link, media ){
    link.rel = "stylesheet";
    link.media = media;
    // set a localStorage flag
    if( w.localStorage ){
      try {
        w.localStorage[ link.href ] = true;
      } catch( e ){}
    }
  };

  // loop through link elements in DOM
  rp.poly = function(){
    var links = w.document.getElementsByTagName( "link" );
    for( var i = 0; i < links.length; i++ ){
      var link = links[ i ];
      // qualify links to those with rel=preload and as=style attrs
      if( link.rel === "preload" && link.getAttribute( "as" ) === "style" && !link.getAttribute( "data-loadcss" ) ){
        // remember existing media attr for ultimate state, or default to 'all'
        var finalMedia = link.media || "all";
        // remember onload attr, if set, to call it later
        var priorOnload = link.onload;
        // if preload isn't supported, get an asynchronous load by using a non-matching media attribute
        // then change that media back to its intended value on load
        link.onload = function(){
          rp.enableStylesheet( link, finalMedia );
          if( priorOnload ){
            priorOnload.call( link );
          }
        };
        // if a localStorage flag claims we've loaded/cached this stylesheet already, enable it synchronously now
        if( w.localStorage && w.localStorage[ link.href ] ){
          return rp.enableStylesheet( link, finalMedia );
        }
        // if preload is not supported, try to load asynchronously by using a non-matching media query
        if( !rp.support() ){
          link.media = "x";
          link.rel = "stylesheet";
        }
        // supported or not, set rel=preload to stylesheet after 3 seconds
        setTimeout( function(){
          rp.enableStylesheet(link, finalMedia );
        }, 3000 );
        // prevent rerunning on link
        link.setAttribute( "data-loadcss", true );
      }
    }
  };
  rp.poly();
  var run = w.setInterval( rp.poly, 300 );
  if( w.addEventListener ){
    w.addEventListener( "load", function(){
      rp.poly();
      w.clearInterval( run );
    } );
  }
  if( w.attachEvent ){
    w.attachEvent( "onload", function(){
      w.clearInterval( run );
    } );
  }
  // commonjs
	if( typeof exports !== "undefined" ){
    exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ) );
