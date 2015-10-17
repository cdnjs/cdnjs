/*
 * angular-elastic v0.0.2
 * (c) 2013 Monospaced http://monospaced.com
 * License: MIT
 */

angular.module('monospaced.elastic', [])
  .directive('msdElastic', ['$window', '$timeout', function($window, $timeout){
    'use strict';
    return {
      restrict: 'A, C',
      link: function(scope, element){
        var domElm = element[0];

        if (domElm.nodeName !== 'TEXTAREA') {
          return;
        }

        // Hide scrollbars
        element.css({
          'overflow': 'hidden',
          'resize': 'none'
        });

        var domTwin = document.createElement('div'),
            twin = angular.element(domTwin).css({
              'position': 'absolute',
              'top': '-10000px',
              'left': '-10000px',
              'word-wrap': 'break-word',
              'white-space': 'pre-wrap'
            }),
            domElmStyle = getComputedStyle(domElm),
            lineHeight  = parseInt(domElmStyle.getPropertyValue('line-height'), 10) || parseInt(domElmStyle.getPropertyValue('font-size'), 10),
            minHeight = parseInt(domElmStyle.getPropertyValue('height'), 10) || lineHeight * 3,
            maxHeight = parseInt(domElmStyle.getPropertyValue('max-height'), 10) || Number.MAX_VALUE,
            goalHeight = 0,
            mimics = ['padding-right',
                      'padding-left',
                      'font-size',
                      'line-height',
                      'font-family',
                      'width',
                      'font-weight',
                      'border-right-width',
                      'border-right-style',
                      'border-left-width',
                      'border-left-style'];

        // Opera returns max-height of -1 if not set
        if (maxHeight < 0) {
          maxHeight = Number.MAX_VALUE;
        }

        // Append the twin to the DOM
        // We are going to meassure the height of this, not the textarea.
        element.parent().append(twin);

        // Copy the essential styles from the textarea to the twin
        var i = mimics.length,
            property;
        while(i--){
          property = mimics[i].toString();
          twin.css(property, domElmStyle.getPropertyValue(property));
        }

        // Updates the width of the twin
        // (solution for textareas with widths in percent)
        function setTwinWidth(){
          var curatedWidth = Math.floor(parseInt(domElm.offsetWidth, 10));
          if (domTwin.offsetWidth !== curatedWidth) {
            twin.css({
              'width': curatedWidth + 'px'
            });
            // Update height of textarea
            update(true);
          }
        }

        // Sets a given height and overflow state on the textarea
        function setHeightAndOverflow(height, overflow){
          var curratedHeight = Math.floor(parseInt(height, 10));
          if (domElm.offsetHeight !== curratedHeight) {
            element.css({
              'height': curratedHeight + 'px',
              'overflow': overflow
            });
          }
        }

        // Compact textarea on blur
        function compact() {
          var twinHeight = domTwin.offsetHeight;
          if (twinHeight < maxHeight) {
            if (twinHeight > minHeight) {
              element.css({
                'height': twinHeight + 'px'
              });
            } else {
              element.css({
                'height': minHeight + 'px'
              });
            }
          }
        }

        // This function will update the height of the textarea if necessary
        function update(forced) {

          // Get curated content from the textarea
          var textareaContent = element.val().replace(/&/g,'&amp;')
                              .replace(/ {2}/g, '&nbsp;')
                              .replace(/<|>/g, '&gt;')
                              .replace(/\n/g, '<br />');

          // Compare curated content with curated twin
          var twinContent = twin.html().replace(/<br>/ig,'<br />');

          if (forced || textareaContent + '&nbsp;' !== twinContent) {
            // Add an extra white space so new rows are added when you are at the end of a row
            twin.html(textareaContent + '&nbsp;');

            // Change textarea height
            // if twin + the height of 1 line differs more than 3 pixels from textarea height
            var twinHeight = domTwin.offsetHeight;
            if (Math.abs((twinHeight + lineHeight) - domElm.offsetHeight) > 3) {
              var goalHeight = twinHeight + lineHeight;
              if (goalHeight >= maxHeight) {
                setHeightAndOverflow(maxHeight, 'auto');
              } else if (goalHeight <= minHeight) {
                setHeightAndOverflow(minHeight, 'hidden');
              } else {
                setHeightAndOverflow(goalHeight, 'hidden');
              }
            }
          }
        }

        // Update textarea size on keyup, change, cut and paste
        element.bind('keyup change cut paste', function(){
          update();
        });

        // Update width of twin if browser or textarea is resized
        // (solution for textareas with widths in percent)
        angular.element($window).bind('resize', setTwinWidth);
        element.bind('resize', setTwinWidth);
        element.bind('update', update);

        // Compact textarea on blur
        element.bind('blur', compact);

        // Catch the browser paste event
        element.bind('input paste', function(){
          $timeout(update, 250);
        });

        // Run update once initialised
        update();
        compact();

        // apply animations after initalisation
        $timeout(function(){
          element.css({
            '-webkit-transition': 'height 50ms ease-in-out',
               '-moz-transition': 'height 50ms ease-in-out',
                 '-o-transition': 'height 50ms ease-in-out',
                    'transition': 'height 50ms ease-in-out'
          });
        });

        scope.$on('$destroy', function() {
           twin.remove();
        });
      }
    };
  }]);
