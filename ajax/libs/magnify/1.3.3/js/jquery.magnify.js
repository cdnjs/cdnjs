/*!
 * jQuery Magnify Plugin v1.3.3 by Tom Doan (http://thdoan.github.io/magnify/)
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
        debug: false,
        speed: 100,
        onload: function(){}
      }, oOptions),
      $anchor,
      $container,
      $image,
      $lens,
      nMagnifiedWidth = 0,
      nMagnifiedHeight = 0,
      init = function(el) {
        // Initiate
        $image = $(el);
        $anchor = $image.parents('a');
        // Activate magnification!
        // Try to get zoom image dimensions
        // Proceed only if able to get zoom image dimensions OK
        zoom($image.attr('data-magnify-src') || oSettings.src || $anchor.attr('href') || '');
      },
      zoom = function(sImgSrc, bAnchor) {
        // Disable zooming if no valid zoom image source
        if (!sImgSrc) return;
        // Calculate the native (magnified) image dimensions. The zoomed version
        // is only shown after the native dimensions are available. To get the
        // actual dimensions we have to create this image object.
        var elImage = new Image();
        $(elImage).on({
          load: function() {
            // Got image dimensions OK

            // Fix overlap bug at the edges during magnification
            $image.css('display', 'block');

            // Create container div if necessary
            if (!$image.parent('.magnify').length) {
              $image.wrap('<div class="magnify"></div>');
            }
            $container = $image.parent('.magnify');
            // Create the magnifying lens div if necessary
            if ($image.prev('.magnify-lens').length) {
              $container.children('.magnify-lens').css('background-image', 'url(\'' + sImgSrc + '\')');
            } else {
              $image.before('<div class="magnify-lens loading" style="background:url(\'' + sImgSrc + '\') no-repeat 0 0"></div>');
            }
            $lens = $container.children('.magnify-lens');

            // Remove the "Loading..." text
            $lens.removeClass('loading');
            // This code is inside the .load() function, which is important.
            // The width and height of the object would return 0 if accessed
            // before the image is fully loaded.
            nMagnifiedWidth = elImage.width;
            nMagnifiedHeight = elImage.height;
            if (oSettings.debug) console.log('[MAGNIFY] Got zoom image dimensions OK (width x height): ' + nMagnifiedWidth + ' x ' + nMagnifiedHeight);
            // Clean up
            elImage = null;
            // Callback
            oSettings.onload();
            // Handle mouse movements
            $container.mousemove(function(e) {
              // x/y coordinates of the mouse pointer
              // This is the position of .magnify relative to the document.
              var oMagnifyOffset = $container.offset(),
                /* We deduct the positions of .magnify from the mouse positions
                   relative to the document to get the mouse positions relative
                   to the container (.magnify). */
                nX = e.pageX - oMagnifyOffset.left,
                nY = e.pageY - oMagnifyOffset.top;
              // Toggle magnifying lens
              if (!$lens.is(':animated')) {
                if (nX<$container.width() && nY<$container.height() && nX>0 && nY>0) {
                  if ($lens.is(':hidden')) $lens.fadeIn(oSettings.speed);
                } else {
                  if ($lens.is(':visible')) $lens.fadeOut(oSettings.speed);
                }
              }
              if ($lens.is(':visible')) {
                // Move the magnifying lens with the mouse
                var nPosX = nX - $lens.width()/2,
                  nPosY = nY - $lens.height()/2;
                if (nMagnifiedWidth && nMagnifiedHeight) {
                  // Change the background position of .magnify-lens according
                  // to the position of the mouse over the .magnify-image image.
                  // This allows us to get the ratio of the pixel under the
                  // mouse pointer with respect to the image and use that to
                  // position the large image inside the magnifying lens.
                  var nRatioX = Math.round(nX/$image.width()*nMagnifiedWidth - $lens.width()/2)*-1,
                    nRatioY = Math.round(nY/$image.height()*nMagnifiedHeight - $lens.height()/2)*-1,
                    sBgPos = nRatioX + 'px ' + nRatioY + 'px';
                }
                // Now the lens moves with the mouse. The logic is to deduct
                // half of the lens's width and height from the mouse
                // coordinates to place it with its center at the mouse
                // coordinates. If you hover on the image now, you should see
                // the magnifying lens in action.
                $lens.css({
                  top: Math.round(nPosY) + 'px',
                  left: Math.round(nPosX) + 'px',
                  backgroundPosition: sBgPos || ''
                });
              }
            });
            // Prevent magnifying lens from getting "stuck"
            $container.mouseleave(function() {
              if ($lens.is(':visible')) $lens.fadeOut(oSettings.speed);
            });

            if ($anchor.length) {
              // Make parent anchor inline-block to have correct dimensions
              $anchor.css('display', 'inline-block');
              // Disable parent anchor if it's sourcing the large image
              if (bAnchor || ($anchor.attr('href') && !($image.attr('data-magnify-src') || oSettings.src))) {
                $anchor.click(function(e) {
                  e.preventDefault();
                });
              }
            }

          },
          error: function() {
            // Clean up
            elImage = null;
            if (bAnchor) {
              if (oSettings.debug) console.log('[MAGNIFY] Parent anchor zoom source is invalid also. Disabling zoom...');
            } else {
              if (oSettings.debug) console.log('[MAGNIFY] Invalid data-magnify-src. Looking in parent anchor instead -> ' + $anchor.attr('href'));
              zoom($anchor.attr('href'), true);
            }
          }
        });

        elImage.src = sImgSrc;
      };

    return this.each(function() {
      // Initiate magnification powers
      init(this);
    });

  };
}(jQuery));