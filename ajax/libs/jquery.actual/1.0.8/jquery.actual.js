/*! Copyright 2012, Ben Lin (http://dreamerslab.com/)
* Licensed under the MIT License (LICENSE.txt).
*
* Version: 1.0.8
*
* Requires: jQuery 1.2.3 ~ 1.7.2
*/
;( function ( $ ){
  $.fn.extend({
    actual : function ( method, options ){
      // check if the jQuery method exist
      if( !this[ method ]){
        throw '$.actual => The jQuery method "' + method + '" you called does not exist';
      }

      var defaults = {
        absolute      : false,
        clone         : false,
        includeMargin : undefined
      };

      var configs = $.extend( defaults, options );

      var $target = this;
      var fix, restore;

      if( configs.clone === true ){
        fix = function (){
          var css = {
            position : 'absolute',
            top      : -1000
          };

          // this is useful with css3pie
          $target = $target.
            filter( ':first' ).
            clone().
            css( css ).
            appendTo( 'body' );
        };

        restore = function (){
          // remove DOM element after getting the width
          $target.remove();
        };
      }else{
        var tmp = [];
        var $hidden, css;

        fix = function (){
          // get all hidden parents
          $hidden = $target.
            parents().
            andSelf().
            filter( ':hidden' );

          css = {
            visibility : 'hidden',
            display    : 'block'
          };

          if( configs.absolute === true ) css.position = 'absolute';

          // save the origin style props
          // set the hidden el css to be got the actual value later
          $hidden.each( function (){
            var $this = $( this );

            // Save original style. If no style was set, attr() returns undefined
            tmp.push( $this.attr( 'style' ));
            $this.css( css );
          });
        };

        restore = function (){
          // restore origin style values
          $hidden.each( function ( i ){
            var $this = $( this );
            var _tmp  = tmp[ i ];

            if( _tmp === undefined ){
              $this.removeAttr( 'style' );
            }else{
              $this.attr( 'style', _tmp );
            }
          });
        };
      }

      fix();
      // get the actual value with user specific methed
      // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
      // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
      var actual = /(outer)/g.test( method ) ?
        $target[ method ]( configs.includeMargin ) :
        $target[ method ]();

      restore();
      // IMPORTANT, this plugin only return the value of the first element
      return actual;
    }
  });
})( jQuery );