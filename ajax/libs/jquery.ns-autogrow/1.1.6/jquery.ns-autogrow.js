/*!
  Non-Sucking Autogrow 1.1.6
  license: MIT
  author: Roman Pushkin
  https://github.com/ro31337/jquery.ns-autogrow
*/
(function() {
  var getVerticalScrollbarWidth;

  (function($, window) {
    return $.fn.autogrow = function(options) {
      if (options == null) {
        options = {};
      }
      if (options.horizontal == null) {
        options.horizontal = true;
      }
      if (options.vertical == null) {
        options.vertical = true;
      }
      if (options.debugx == null) {
        options.debugx = -10000;
      }
      if (options.debugy == null) {
        options.debugy = -10000;
      }
      if (options.debugcolor == null) {
        options.debugcolor = 'yellow';
      }
      if (options.flickering == null) {
        options.flickering = true;
      }
      if (options.postGrowCallback == null) {
        options.postGrowCallback = function() {};
      }
      if (options.verticalScrollbarWidth == null) {
        options.verticalScrollbarWidth = getVerticalScrollbarWidth();
      }
      if (options.horizontal === false && options.vertical === false) {
        return;
      }
      return this.filter('textarea').each(function() {
        var $e, $shadow, fontSize, heightPadding, minHeight, minWidth, update;
        $e = $(this);
        if ($e.data('autogrow-enabled')) {
          return;
        }
        $e.data('autogrow-enabled');
        minHeight = $e.height();
        minWidth = $e.width();
        heightPadding = $e.css('lineHeight') * 1 || 0;
        $e.hasVerticalScrollBar = function() {
          return $e[0].clientHeight < $e[0].scrollHeight;
        };
        $shadow = $('<div class="autogrow-shadow"></div>').css({
          position: 'absolute',
          display: 'inline-block',
          'background-color': options.debugcolor,
          top: options.debugy,
          left: options.debugx,
          'max-width': $e.css('max-width'),
          'padding': $e.css('padding'),
          fontSize: $e.css('fontSize'),
          fontFamily: $e.css('fontFamily'),
          fontWeight: $e.css('fontWeight'),
          lineHeight: $e.css('lineHeight'),
          resize: 'none',
          'word-wrap': 'break-word'
        }).appendTo(document.body);
        if (options.horizontal === false) {
          $shadow.css({
            'width': $e.width()
          });
        } else {
          fontSize = $e.css('font-size');
          $shadow.css('padding-right', '+=' + fontSize);
          $shadow.normalPaddingRight = $shadow.css('padding-right');
        }
        update = (function(_this) {
          return function(event) {
            var height, val, width;
            val = _this.value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n /g, '<br/>&nbsp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\n$/, '<br/>&nbsp;').replace(/\n/g, '<br/>').replace(/ {2,}/g, function(space) {
              return Array(space.length - 1).join('&nbsp;') + ' ';
            });
            if (/(\n|\r)/.test(_this.value)) {
              val += '<br />';
              if (options.flickering === false) {
                val += '<br />';
              }
            }
            $shadow.html(val);
            if (options.vertical === true) {
              height = Math.max($shadow.height() + heightPadding, minHeight);
              $e.height(height);
            }
            if (options.horizontal === true) {
              $shadow.css('padding-right', $shadow.normalPaddingRight);
              if (options.vertical === false && $e.hasVerticalScrollBar()) {
                $shadow.css('padding-right', "+=" + options.verticalScrollbarWidth + "px");
              }
              width = Math.max($shadow.outerWidth(), minWidth);
              $e.width(width);
            }
            return options.postGrowCallback($e);
          };
        })(this);
        $e.change(update).keyup(update).keydown(update);
        $(window).resize(update);
        return update();
      });
    };
  })(window.jQuery, window);

  getVerticalScrollbarWidth = function() {
    var inner, outer, w1, w2;
    inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";
    outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    w2 = inner.offsetWidth;
    if (w1 === w2) {
      w2 = outer.clientWidth;
    }
    document.body.removeChild(outer);
    return w1 - w2;
  };

}).call(this);
