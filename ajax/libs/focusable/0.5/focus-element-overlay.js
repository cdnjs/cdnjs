/*!
 * Focus element overlay (Focusable) v0.1
 * https://github.com/zzarcon/focus-element-overlay
 *
 * Copyright (c) 2014 @zzarcon <hezarco@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Date: 2014-11-18
 */

(function(exports) {
  var $overlay = null;
  var $element = null;
  var isVisible = false;
  var options = {
    fadeDuration: 700,
    hideOnClick: false,
    hideOnESC: false,
    findOnResize: false
  };

  $(document).ready(setup);

  function setup() {
    createPlugin();

  	$('body').prepend('<div id="overlay-layer"></div>');
  	$overlay = $('#overlay-layer');

  	addStylesheet();
    addEvents();
  }

  /**
   * Defines Focusable as jQuey plugin
   * @return {jQuery object} this
   */
  function createPlugin() {
    $.fn.focusable = function(options) {
      Focusable.setFocus(this, options);
      return this;
    };
  }

  function addEvents() {
    $overlay.on('click', '.column', clickOnOverlay);
    $(window).on("resize", resizeHandler);
    $(window).on("keyup", keyupHandler);
  }

  function resizeHandler() {
    if (!$element) {
      return;
    }
    //Refind the element
    $element = options.findOnResize ? $($element.selector) : $element;

    createColumns();
  }

  function keyupHandler(e) {
    options.hideOnESC && e.keyCode === 27 && isVisible && hide();
  }

  function clickOnOverlay() {
    if (!options.hideOnClick) {
      return;
    }

    hide();
  }

  function setFocus($el, userOptions) {
    $('body').css('overflow', 'hidden');
    options = $.extend(options, userOptions);
    $element = $el;
    createColumns();
    $overlay.fadeIn(options.fadeDuration);
  };

  function clearColumns() {
  	$overlay.find('.column').remove();
  }

  function hide() {
  	isVisible = false;
    $element = null;
  	$('body').css('overflow', '');
    $overlay.fadeOut(options.fadeDuration, clearColumns);
  }

  function createColumns() {
  	if (!$element) {
  		return;
  	}

		var createdColumns = 0;
  	isVisible = true;
  	clearColumns();

    while (createdColumns < 4) {
      createColumn(createdColumns);
      createdColumns++;
    }
  }

  function createColumn(index) {
  	var offset = $element.offset();
    var top = 0, left = 0, width = px($element.outerWidth()), height = "100%";
    var styles = '';

    switch (index) {
      case 0:
        width = px(offset.left);
        break;
      case 1:
        left = px(offset.left);
        height = px(offset.top);
        break;
      case 2:
        left = px(offset.left);
        top = px($element.outerHeight() + offset.top);
        break;
      case 3:
        width = "100%";
        left = px(($element.outerWidth() + offset.left));
        break;
    }

    styles = 'top:' + top + ';left:' + left + ';width:' + width + ';height:' + height;
    $overlay.append('<div class="column" style="' + styles + '"></div>');
  }

  function px(value) {
    return value + 'px';
  }

  function addStylesheet() {
  	var sheet = (function() {
			var style = document.createElement("style");

			style.appendChild(document.createTextNode(""));
			document.head.appendChild(style);

			return style.sheet;
		})();

		sheet.insertRule("#overlay-layer{ display:none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; overflow: hidden; pointer-events: none; }", 0);
		sheet.insertRule("#overlay-layer .column{ position: absolute; background: rgba(0,0,0,0.8); pointer-events: all; }", 1);
  }

  exports.Focusable = {
    setFocus: setFocus,
    hide: hide,
    refresh: createColumns
  };
})(window);