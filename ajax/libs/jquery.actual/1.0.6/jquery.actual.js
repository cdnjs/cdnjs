/*! Copyright 2011, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.6
*
* Requires: jQuery 1.2.3 ~ 1.7.1
*/
;( function( $ ){
  $.fn.extend({
    actual : function( method, options ){
      var $hidden, $target, configs, css, tmp, actual, fix, restore;

      // check if the jQuery method exist
      if( !this[ method ]){
        throw '$.actual => The jQuery method "' + method + '" you called does not exist';
      }

      configs = $.extend({
        absolute : false,
        clone : false,
        includeMargin : undefined
      }, options );

      $target = this;

      if( configs.clone === true ){
        fix = function(){
          // this is useful with css3pie
          $target = $target.filter( ':first' ).clone().css({
            position : 'absolute',
            top : -1000
          }).appendTo( 'body' );
        };

        restore = function(){
          // remove DOM element after getting the width
          $target.remove();
        };
      }else{
        fix = function(){
          // get all hidden parents
          $hidden = $target.parents().andSelf().filter( ':hidden' );

          css = configs.absolute === true ?
            { position : 'absolute', visibility: 'hidden', display: 'block' } :
            { visibility: 'hidden', display: 'block' };

          tmp = [];

          // save the origin style props
          // set the hidden el css to be got the actual value later
          $hidden.each( function(){
            var _tmp = {}, name;
            for( name in css ){
              // save current style
              _tmp[ name ] = this.style[ name ];
              // set current style to proper css style
              this.style[ name ] = css[ name ];
            }
            tmp.push( _tmp );
          });
        };

        restore = function(){
          // restore origin style values
          $hidden.each( function( i ){
            var _tmp = tmp[ i ], name;
            for( name in css ){
              this.style[ name ] = _tmp[ name ];
            }
          });
        };
      }

      fix();
      // get the actual value with user specific methed
      // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
      // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
      actual = /(outer)/g.test( method ) ?
        $target[ method ]( configs.includeMargin ) :
        $target[ method ]();

      restore();
      // IMPORTANT, this plugin only return the value of the first element
      return actual;
    }
  });
})( jQuery );