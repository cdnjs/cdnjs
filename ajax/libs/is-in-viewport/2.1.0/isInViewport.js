/**
 * @author  Mudit Ameta
 * @license https://github.com/zeusdeux/isInViewport/blob/master/license.md MIT
 */
(function($) {

  //lets you chain any arbitrary function and returns a jquery object
  $.fn.do = function(fn){
    fn.apply(this);
    return this;
  };

  //gets the width of the scrollbar
  function getScrollbarWidth(viewport) {
    var scrollBarWidth;

    //append a div that has 100% width to get true width of viewport
    var el = $('<div></div>').css({
      'width': '100%'
    });
    viewport.append(el);

    //subtract true width from the viewport width which is inclusive
    //of scrollbar by default
    scrollBarWidth = viewport.width() - el.width();

    //remove our element from DOM
    el.remove();
    return scrollBarWidth;
  }

  function isInViewport(element, options) {
    var boundingRect = element.getBoundingClientRect();
    var top = boundingRect.top;
    var bottom = boundingRect.bottom;
    var left = boundingRect.left;
    var right = boundingRect.right;
    var settings = $.extend({
      'tolerance': 0,
      'viewport': window
    }, options);
    var isVisibleFlag = false;
    var $viewport = settings.viewport.get ? settings.viewport : $(settings.viewport);
    var $viewportHeight = $viewport.height();
    var $viewportWidth = $viewport.width();
    var typeofViewport = $viewport.get(0).toString();

    if (!$viewport.length)
      console.warn('isInViewport: The viewport selector you have provided matches no element on page.');

    //if the viewport is other than window recalculate the top,
    //bottom,left and right wrt the new viewport
    //the [object DOMWindow] check is for window object type in PhantomJS
    if (typeofViewport !== '[object Window]' && typeofViewport !== '[object DOMWindow]') {
      var $viewportOffset = $viewport.offset();

      //recalculate these relative to viewport
      top = top - $viewportOffset.top;
      bottom = bottom - $viewportOffset.top;
      left = left - $viewportOffset.left;
      right = left + $viewportWidth;

      //get the scrollbar width from cache or calculate it
      isInViewport.scrollBarWidth = isInViewport.scrollBarWidth || getScrollbarWidth($viewport);

      //remove the width of the scrollbar from the viewport width
      $viewportWidth -= isInViewport.scrollBarWidth;
    }

    //handle falsy, non-number and non-integer tolerance value
    settings.tolerance = Math.round(parseFloat(settings.tolerance));
    if (isNaN(settings.tolerance))
      settings.tolerance = 0;
    else if (settings.tolerance < 0)
      settings.tolerance = $viewportHeight + settings.tolerance; //viewport height - tol

    //the element is NOT in viewport iff it is completely out of 
    //viewport laterally or if it is completely out of the tolerance
    //region. Therefore, if it is partially in view then it is considered
    //to be in the viewport and hence true is returned

    //if the element is laterally outside the viewport
    if (Math.abs(left) >= $viewportWidth)
      return isVisibleFlag;

    //if the element is bound to some tolerance
    if (settings.tolerance) {
      if (top <= settings.tolerance && bottom >= settings.tolerance)
        isVisibleFlag = true;
      else
        isVisibleFlag = false;
    }
    else {
      if (bottom > 0 && top <= $viewportHeight)
        isVisibleFlag = true;
      else
        isVisibleFlag = false;
    }
    return isVisibleFlag;
  }

  $.extend($.expr[':'], {
    'in-viewport': function(currObj, index, meta) {
      if ( !! meta[3]) {
        var args = meta[3].split(',');

        //when user only gives viewport and no tolerance
        if (args.length === 1 && isNaN(args[0])) {
          args[1] = args[0];
          args[0] = undefined;
        }
        return isInViewport(currObj, {
          tolerance: args[0] ? args[0].trim() : undefined,
          viewport: args[1] ? args[1].trim() : undefined
        });
      }
      else
        return isInViewport(currObj);
    }
  });
})(jQuery);
