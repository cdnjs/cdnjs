/*!
 * jQuery Magnify Plugin v1.2.6 by Tom Doan (http://thdoan.github.io/magnify/)
 * Based on http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3
 *
 * jQuery Magnify by Tom Doan is licensed under the MIT License.
 * Read a copy of the license in the LICENSE file or at
 * http://choosealicense.com/licenses/mit
 */

(function($) {
  $.fn.magnify = function(oOptions) {

    var oSettings = $.extend({
        /* Default options */
        speed: 100
      }, oOptions),
      init = function(o) {
        var $image = $(o),
          $container,
          $lens,
          $anchor = $image.parents('a'),
          sMagnifiedSrc = $image.attr('data-magnify-src') || oSettings.src || $anchor.attr('href') || '',
          nMagnifiedWidth = 0,
          nMagnifiedHeight = 0;

        // Fix overlap bug at the edges during magnification
        $image.css('display', 'block');

        // Create container div if necessary
        if (!$image.parent('.magnify').length) {
          $image.wrap('<div class="magnify"></div>');
        }
        $container = $image.parent('.magnify');
        // Create the magnifying lens div if necessary
        if ($image.prev('.magnify-lens').length) {
          $container.children('.magnify-lens').css('background-image', 'url(' + sMagnifiedSrc + ')');
        } else {
          $image.before('<div class="magnify-lens loading" style="background:url(' + sMagnifiedSrc + ') no-repeat 0 0;"></div>');
        }
        $lens = $container.children('.magnify-lens');

        // Calculate the native (magnified) image dimensions. The zoomed version
        // is only shown after the native dimensions are available. To get the
        // actual dimensions we have to create this image object.
        var oImage = new Image();
        $(oImage).load(function() {
          // Remove the "Loading..." text.
          $lens.removeClass('loading');
          // This code is inside the .load() function, which is important.
          // The width and height of the object would return 0 if accessed
          // before the image is fully loaded.
          nMagnifiedWidth = oImage.width;
          nMagnifiedHeight = oImage.height;
        });
        oImage.src = sMagnifiedSrc;

        // Handle mouse movements
        $container.mousemove(function(e) {
          // x/y coordinates of the mouse pointer
          // This is the position of .magnify relative to the document.
          var oMagnifyOffset = $container.offset(),
            /* We deduct the positions of .magnify from the mouse positions
               relative to the document to get the mouse positions relative to
               the container (.magnify). */
            nX = e.pageX - oMagnifyOffset.left;
            nY = e.pageY - oMagnifyOffset.top;
          // Fade out the lens if the mouse pointer is outside the container.
          if (nX<$container.width() && nY<$container.height() && nX>0 && nY>0) {
            $lens.fadeIn(oSettings.speed);
          } else {
            $lens.fadeOut(oSettings.speed);
          }
          if ($lens.is(':visible')) {
            /* Move the magnifying lens with the mouse */
            var nPosX = nX - $lens.width()/2,
              nPosY = nY - $lens.height()/2;
            if (nMagnifiedWidth && nMagnifiedHeight) {
              // Change the background position of .magnify-lens according to
              // the position of the mouse over the .magnify-image image. This
              // allows us to get the ratio of the pixel under the mouse pointer
              // with respect to the image and use that to position the large
              // image inside the magnifying lens.
              var nRatioX = Math.round(nX/$image.width()*nMagnifiedWidth - $lens.width()/2)*-1,
                nRatioY = Math.round(nY/$image.height()*nMagnifiedHeight - $lens.height()/2)*-1,
                sBgPos = nRatioX + 'px ' + nRatioY + 'px';
            }
            // Now the lens moves with the mouse. The logic is to deduct half
            // of the lens's width and height from the mouse coordinates to
            // place it with its center at the mouse coordinates. If you hover
            // on the image now, you should see the magnifying lens in action.
            //console.log('$image.width(): ' + $image.width() + ', nMagnifiedWidth: ' + nMagnifiedWidth + ', $lens.width(): ' + $lens.width() + ', nX: ' + nX + ', sBgPos: ' + sBgPos);
            $lens.css({
              top: nPosY,
              left: nPosX,
              backgroundPosition: sBgPos || ''
            });
          }
        });

        // Disable parent anchor if it's sourcing the large image
        if ($anchor.attr('href') && !($image.attr('data-magnify-src') || oSettings.src)) {
          $anchor.click(function(e) {
            e.preventDefault();
          });
        }

      };

    return this.each(function() {
      /* Initiate magnification powers */
      init(this);
    });

  };
}(jQuery));