/**
 * jQuery highlightTextarea 1.0
 *
 * Copyright 2012, Damien "Mistic" Sorel
 *    http://www.strangeplanet.fr
 *
 * thanks to Julien L for part of the code
 *    http://stackoverflow.com/a/7599199
 *
 * Dual licensed under the MIT or GPL Version 3 licenses.
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 *
 * Depends:
 *	  jquery.js
 *    jquery-ui.js | resizable (optional)
 */
 
 /*
  * BUGS :
  *   scroll doesn't work in Opera
  *   incompatible with textareas with % dimensions (sizes, margin, padding, border)
  */
 
(function($) {
  $.fn.highlightTextarea = function(options) {
      var defaults = {
          words: ['a','e','i','o','u'],
          color: '#ffff00',
          caseSensitive: true,
          resizable: false,
          id: null,
          debug: false
      };
      options = $.extend(defaults, options);
      
      options.regParam = 'g';
      if (options.caseSensitive == false) options.regParam+= 'i';
        
      this.each(function() {
          var $textarea = $(this);

          // create necessary wrappers
          $textarea.wrap('<div class="highlightTextarea" />');
          var $main = $textarea.parent('.highlightTextarea');
          $main.prepend('<div class="highlighterContainer"><div class="highlighter"></div></div>');
          var $highlighterContainer = $main.children('.highlighterContainer');
          var $highlighter = $highlighterContainer.children('.highlighter');
          
          // optional id
          if (options.id != null) {
              $main.attr('id', options.id);
          }
          
          // real relative textarea position
          var topMargin = toPx($textarea.css('margin-top'))+toPx($textarea.css('border-top-width'))+toPx($textarea.css('padding-top')),
              leftMargin = toPx($textarea.css('margin-left'))+toPx($textarea.css('border-left-width'))+toPx($textarea.css('padding-left'))+1;
          
          // the main container must have same sizes and position than the original textarea
          cloneCss($textarea, $main, [
            'float','vertical-align'
          ]);
          $main.css({
              'width':        $textarea.outerWidth(true), /* r */
              'height':       $textarea.outerHeight(true) /* r */
          });
          
          // the highlighter container is positionned at "real" top-left corner of the textarea and takes its background
          cloneCss($textarea, $highlighterContainer, [
            'background','background-image','background-color','background-position','background-repeat','background-origin','background-clip','background-size'
          ]);
          $highlighterContainer.css({
              'top':          topMargin+'px',
              'left':         leftMargin+'px',
              'width':        $textarea.width(), /* r */
              'height':       $textarea.height(), /* r */
          });
          
          // the highlighter has the same sizes than the inner textarea and must have same font properties
          cloneCss($textarea, $highlighter, [
            'font-size','font-family','font-style','font-weight','line-height'
          ]);
          $highlighter.css({
              'width':        $textarea.width(), /**/
              'height':       $textarea.height(), /* r */
          });
          
          // now make the textarea transparent to see the highlighter throught
          $textarea.css({
              'background':   'none',
          });
          
          // display highlighter text for debuging
          if (options.debug) {
            $highlighter.css({
                'color':      '#f00'
            });
          }
          
          // prevend positionning errors by allways focusing the textarea
          $highlighter.bind('click', function() {
              $textarea.focus();
          });
          
          // add triggers
          $textarea.bind({
              'keyup': function() {
                applyText($textarea.val());
              },
              'scroll': function() {
                updateSizePosition();
              },
              'resize': function() {
                updateSizePosition(true);
              }
          });
          
          // resizable with jquery-ui
          if (options.resizable) {
              if (jQuery.ui) { 
                  $textarea.resizable({
                    handles: "se",
                    resize: function() { 
                        updateSizePosition(true); 
                    }
                  });
                  $(".highlightTextarea .ui-resizable-se").css({
                      'bottom':  '13px',
                      'right':   '1px'
                  });
              }
          }
          
          // and finally make a first parse
          applyText($textarea.val());
          
          // applyText: replace $highlighter html with formated $textarea contents         
          function applyText(text) {
              text = replaceAll(text, '\n', '<br/>');
              text = replaceAll(text, '  ', '&nbsp;&nbsp;');
              
              if (options.words[0] != "") {
                replace = options.words[0];
                for (var i=1;i<options.words.length;i++) replace+= '|'+options.words[i];
                text = replaceAll(text, replace, "<span class=\"highlight\" style=\"background-color:"+options.color+";\">$1</span>");
              }
              
              $highlighter.html(text);
              updateSizePosition();
          }
          
          // replaceAll
          function replaceAll(txt, replace, with_this) {
              return txt.replace(new RegExp('('+replace+')', options.regParam), with_this);
          }
          
          // updateSizePosition: adapt $highlighter size and position according to $textarea size and scroll bar
          function updateSizePosition(forced) {              
              // resize containers
              if (forced) {
                  $main.css({
                      'width':         $textarea.outerWidth(true),
                      'height':        $textarea.outerHeight(true)
                  });
                  $highlighterContainer.css({
                      'width':         $textarea.width(),
                      'height':        $textarea.height()
                  });
                  $highlighter.css({
                      'height':        $textarea.height()
                  });
              }
              
              // adapt width with textarea width and scroll bar
              if (
                ($textarea[0].clientHeight < $textarea[0].scrollHeight && $textarea.css('overflow') != 'hidden' && $textarea.css('overflow-y') != 'hidden')
                || $textarea.css('overflow') == 'scroll' || $textarea.css('overflow-y') == 'scroll'
              ) {
                  $highlighter.css({
                      'width':         $textarea.width()-26,
                      'padding-right': '26px'
                  });
              } else {
                  $highlighter.css({
                      'width':         $textarea.width()-9,
                      'padding-right': '9px'
                  });
              }
              
              // follow scroll
              $highlighter.css({
                  'top':     '-'+$textarea.scrollTop()+'px',
                  'height':  $highlighter.height()+$textarea.scrollTop()
              });
          }

          // cloneCss: set 'to' css attributes listed in 'what' as defined for 'from'
          function cloneCss(from, to, what) {
            for (var i=0;i<what.length;i++) {
              to.css(what[i], from.css(what[i]));
            }
          }
          
          // toPx: clean/convert px and em size to px size (without 'px' suffix)
          function toPx(value) {
              if (value != value.replace('em', '')) {
                  // https://github.com/filamentgroup/jQuery-Pixel-Em-Converter
                  var that = parseFloat(value.replace('em', '')),
                      scopeTest = jQuery('<div style="display: none; font-size: 1em; margin: 0; padding:0; height: auto; line-height: 1; border:0;">&nbsp;</div>').appendTo('body'),
                      scopeVal = scopeTest.height();
                  scopeTest.remove();
                  return Math.round(that * scopeVal);
                  
              } else if (value != value.replace('px', '')) {
                  return parseInt(value.replace('px', ''));
                  
              } else {
                  return parseInt(value);
              }
          }
      });
      
      return this;
  };
})(jQuery);