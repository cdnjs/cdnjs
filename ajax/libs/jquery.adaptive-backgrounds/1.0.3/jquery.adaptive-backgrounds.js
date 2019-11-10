
/* jshint debug: true, expr: true */

;(function($){

  /* Constants & defaults. */
  var DATA_COLOR    = 'data-ab-color';
  var DATA_PARENT   = 'data-ab-parent';
  var DATA_CSS_BG   = 'data-ab-css-background';
  var EVENT_CF      = 'ab-color-found';

  var DEFAULTS      = {
    selector:             '[data-adaptive-background]',
    parent:               null,
    exclude:              [ 'rgb(0,0,0)', 'rgba(255,255,255)' ],
    normalizeTextColor:   false,
    normalizedTextColors:  {
      light:      "#fff",
      dark:       "#000"
    },
    lumaClasses:  {
      light:      "ab-light",
      dark:       "ab-dark"
    }
  };

  // Include RGBaster - https://github.com/briangonzalez/rgbaster.js
  /* jshint ignore:start */
  !function(n){"use strict";var t=function(){return document.createElement("canvas").getContext("2d")},e=function(n,e){var a=new Image,o=n.src||n;"data:"!==o.substring(0,5)&&(a.crossOrigin="Anonymous"),a.onload=function(){var n=t("2d");n.drawImage(a,0,0);var o=n.getImageData(0,0,a.width,a.height);e&&e(o.data)},a.src=o},a=function(n){return["rgb(",n,")"].join("")},o=function(n){return n.map(function(n){return a(n.name)})},r=5,i=10,c={};c.colors=function(n,t){t=t||{};var c=t.exclude||[],u=t.paletteSize||i;e(n,function(e){for(var i=n.width*n.height||e.length,m={},s="",d=[],f={dominant:{name:"",count:0},palette:Array.apply(null,new Array(u)).map(Boolean).map(function(){return{name:"0,0,0",count:0}})},l=0;i>l;){if(d[0]=e[l],d[1]=e[l+1],d[2]=e[l+2],s=d.join(","),m[s]=s in m?m[s]+1:1,-1===c.indexOf(a(s))){var g=m[s];g>f.dominant.count?(f.dominant.name=s,f.dominant.count=g):f.palette.some(function(n){return g>n.count?(n.name=s,n.count=g,!0):void 0})}l+=4*r}if(t.success){var p=o(f.palette);t.success({dominant:a(f.dominant.name),secondary:p[0],palette:p})}})},n.RGBaster=n.RGBaster||c}(window);
  /* jshint ignore:end */


  /*
    Our main function declaration.
  */
  $.adaptiveBackground = {
    run: function( options ){
      var opts = $.extend({}, DEFAULTS, options);

      /* Loop over each element, waiting for it to load
         then finding its color, and triggering the
         color found event when color has been found.
      */
      $( opts.selector ).each(function(index, el){
        var $this = $(this);

        /*  Small helper functions which applies
            colors, attrs, triggers events, etc.
        */
        var handleColors = function () {
          var img = useCSSBackground() ? getCSSBackground() : $this[0];

          RGBaster.colors(img, {
            paletteSize: 20,
            exclude: opts.exclude,
            success: function(colors) {
              $this.attr(DATA_COLOR, colors.dominant);
              $this.trigger(EVENT_CF, { color: colors.dominant, palette: colors.palette });
            }
          });

        };

        var useCSSBackground = function(){
          var attr = $this.attr( DATA_CSS_BG );
          return (typeof attr !== typeof undefined && attr !== false);
        };

        var getCSSBackground = function(){
          var str = $this.css('background-image');
          var regex = /\(([^)]+)\)/;
          var match = regex.exec(str)[1].replace(/"/g, '')
          return match;
        };

        /* Subscribe to our color-found event. */
        $this.on( EVENT_CF, function(ev, data){

          // Try to find the parent.
          var $parent;
          if ( opts.parent && $this.parents( opts.parent ).length ) {
            $parent = $this.parents( opts.parent );
          }
          else if ( $this.attr( DATA_PARENT ) && $this.parents( $this.attr( DATA_PARENT ) ).length ){
            $parent = $this.parents( $this.attr( DATA_PARENT ) );
          }
          else if ( useCSSBackground() ){
            $parent = $this;
          }
          else if (opts.parent) {
            $parent = $this.parents( opts.parent );
          }
          else {
            $parent = $this.parent();
          }

          $parent.css({ backgroundColor: data.color });

          // Helper function to calculate yiq - http://en.wikipedia.org/wiki/YIQ
          var getYIQ = function(color){
            var rgb = data.color.match(/\d+/g);
            return ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000;
          };

          var getNormalizedTextColor = function (color){
            return getYIQ(color) >= 128 ? opts.normalizedTextColors.dark : opts.normalizedTextColors.light;
          };

          var getLumaClass = function (color){
            return getYIQ(color) <= 128 ? opts.lumaClasses.dark : opts.lumaClasses.light;
          };

          // Normalize the text color based on luminance.
          if ( opts.normalizeTextColor )
            $parent.css({ color: getNormalizedTextColor(data.color) });

          // Add a class based on luminance.
          $parent.addClass( getLumaClass(data.color) )
                 .attr('data-ab-yaq', getYIQ(data.color));

          opts.success && opts.success($this, data);
        });

        /* Handle the colors. */
        handleColors();

      });
    },
  };

})(jQuery);
