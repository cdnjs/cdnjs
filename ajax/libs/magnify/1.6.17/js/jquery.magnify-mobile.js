/*!
 * Mobile plugin for jQuery Magnify (http://thdoan.github.io/magnify/)
 *
 * jQuery Magnify by T. H. Doan is licensed under the MIT License.
 * Read a copy of the license in the LICENSE file or at
 * http://choosealicense.com/licenses/mit
 */

(function($) {
  // Ensure this is loaded after jquery.magnify.js
  if (!$.fn.magnify) return;
  // Add required CSS
  $('<style>' +
    '.lens-mobile {' +
      'position:fixed;' +
      'top:0;' +
      'left:0;' +
      'width:100%;' +
      'height:100%;' +
      'background:#ccc;' +
      'display:none;' +
      'overflow:scroll;' +
      '-webkit-overflow-scrolling:touch;' +
    '}' +
    '.magnify-mobile>.close {' +
      'position:fixed;' +
      'top:10px;' +
      'right:10px;' +
      'width:32px;' +
      'height:32px;' +
      'background:#333;' +
      'border-radius:16px;' +
      'color:#fff;' +
      'display:inline-block;' +
      'font:normal bold 20px sans-serif;' +
      'line-height:32px;' +
      'opacity:0.8;' +
      'text-align:center;' +
    '}' +
    '@media only screen and (min-device-width:320px) and (max-device-width:773px) {' +
      '/* Assume QHD (1440 x 2560) is highest mobile resolution */' +
      '.lens-mobile { display:block; }' +
    '}' +
    '</style>').appendTo('head');
  // Ensure .magnify is rendered
  $(window).load(function() {
    $('body').append('<div class="magnify-mobile"><div class="lens-mobile"></div></div>');
    var $lensMobile = $('.lens-mobile');
    // Only enable mobile zoom on smartphones
    if ($lensMobile.is(':visible') && !!('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch) || navigator.msMaxTouchPoints)) {
      var $magnify = $('.magnify'),
        $magnifyMobile = $('.magnify-mobile');
      // Disable desktop magnifying lens
      $magnify.off();
      // Initiate mobile zoom
      // NOTE: Fixed elements inside a scrolling div have issues in iOS, so we
      // need to insert the close icon at the same level as the lens
      $magnifyMobile.hide().append('<i class="close">&times;</i>');
      // Hook up event handlers
      $magnifyMobile.children('.close').on('touchstart', function() {
        $magnifyMobile.toggle();
      });
      $magnify.children('img').on({
        touchend: function() {
          // Only execute on tap
          if ($(this).data('drag')) return;
          var oScrollOffset = $(this).data('scrollOffset');
          $magnifyMobile.toggle();
          // Zoom into touch point
          $lensMobile.scrollLeft(oScrollOffset.x);
          $lensMobile.scrollTop(oScrollOffset.y);
        },
        touchmove: function() {
          // Set drag state
          $(this).data('drag', true);
        },
        touchstart: function(e) {
          // Render zoom image
          // NOTE: In iOS background-image is url(...), not url("...")
          $lensMobile.html('<img src="' + $(this).prev('.magnify-lens').css('background-image').replace(/url\(["']?|["']?\)/g, '') + '" alt="">');
          // Determine zoom position
          var $magnifyImage = $(this),
            oZoomSize = $magnifyImage.data('zoomSize'),
            nX = e.originalEvent.touches[0].pageX - $magnifyImage.offset().left,
            nXPct = nX / $magnifyImage.width(),
            nY = e.originalEvent.touches[0].pageY - $magnifyImage.offset().top,
            nYPct = nY / $magnifyImage.height();
          // Store scroll offsets
          $magnifyImage.data('scrollOffset', {
            x: (oZoomSize.width*nXPct)-(window.innerWidth/2),
            y: (oZoomSize.height*nYPct)-(window.innerHeight/2)
          });
          // Reset drag state
          $(this).data('drag', false);
        }
      });
    }
  });
}(jQuery));
