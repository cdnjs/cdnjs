/*
 * angular-elastic v0.0.3
 * (c) 2013 Monospaced http://monospaced.com
 * License: MIT
 */

angular.module('monospaced.elastic', [])
  .directive('msdElastic', ['$window', '$timeout', function($window, $timeout){
    'use strict';

    return {
      restrict: 'A, C',
      link: function(scope, element){

        /*
         * setup
         */

        // cache a reference to the DOM element
        var domElm = element[0];

        // ensure element is a textarea
        if (domElm.nodeName !== 'TEXTAREA') {
          return;
        }

        // set these properties before measuring dimensions
        element.css({
          'overflow': 'hidden',
          'resize': 'none'
        });

        var windowElm = angular.element($window),
            domTwin = document.createElement('div'),
            twin = angular.element(domTwin).css({
              'position': 'absolute',
              'top': '-10000px',
              'left': '-10000px',
              'white-space': 'pre-wrap',
              'word-wrap': 'break-word'
            }),
            domElmStyle = getComputedStyle(domElm),
            lineHeight = parseInt(domElmStyle.getPropertyValue('line-height'), 10) ||
                         parseInt(domElmStyle.getPropertyValue('font-size'), 10),
            minHeight = parseInt(domElmStyle.getPropertyValue('height'), 10) || lineHeight * 3,
            maxHeight = parseInt(domElmStyle.getPropertyValue('max-height'), 10) || Number.MAX_VALUE,
            targetHeight = 0,
            properties = ['padding-right',
                          'padding-left',
                          'border-right-width',
                          'border-right-style',
                          'border-left-width',
                          'border-left-style',
                          'width',
                          'font-weight',
                          'font-size',
                          'font-family',
                          'line-height'];

        // Opera returns max-height of -1 if not set
        if (maxHeight < 0) {
          maxHeight = Number.MAX_VALUE;
        }

        // copy the essential styles from the textarea to the twin
        var i = properties.length,
            property;
        while(i--){
          property = properties[i].toString();
          twin.css(property, domElmStyle.getPropertyValue(property));
        }

        // append the twin to the DOM
        element.parent().append(twin);

        /*
         * methods
         */

        function setTwinWidth(){
          // textareas with width set in percent can change size on resize events
          var curatedWidth = Math.floor(parseInt(domElm.offsetWidth, 10));

          if (domTwin.offsetWidth !== curatedWidth) {
            twin.css({
              'width': curatedWidth + 'px'
            });
            stretch(true);
          }
        }

        function setElmHeight(height, overflow){
          // apply the required textarea height
          var curratedHeight = Math.floor(parseInt(height, 10));

          if (domElm.offsetHeight !== curratedHeight) {
            element.css({
              'height': curratedHeight + 'px',
              'overflow': overflow
            });
          }
        }

        function shrink(){
          // remove the extra line required for smooth stretching
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

        function stretch(forced){
          // stretch the textarea if required
          var twinHeight,
              twinContent = twin.html().replace(/<br>/ig, '<br />'),
              elementContent = element.val().replace(/&/g, '&amp;')
                                            .replace(/ {2}/g, '&nbsp;')
                                            .replace(/<|>/g, '&gt;')
                                            .replace(/\n/g, '<br />');

          if (forced || elementContent + '&nbsp;' !== twinContent) {
            // add extra white space so new rows are added when at the end of a row
            twin.html(elementContent + '&nbsp;');

            // measure the twin
            twinHeight = domTwin.offsetHeight;

            // compare twin height and textarea height
            if (Math.abs((twinHeight + lineHeight) - domElm.offsetHeight) > 3) {
              // textarea needs to stretch, find the required height
              targetHeight = twinHeight + lineHeight;
              if (targetHeight >= maxHeight) {
                return setElmHeight(maxHeight, 'auto');
              }
              if (targetHeight <= minHeight) {
                return setElmHeight(minHeight, 'hidden');
              }
              return setElmHeight(targetHeight, 'hidden');
            }
          }
        }

        /*
         * initialise
         */

        // listen
        element
          .bind('keyup change cut paste', stretch)
          .bind('input paste', function(){
            // catch the browser paste event
            $timeout(stretch, 250);
          })
          .bind('blur', shrink)
          .bind('resize', setTwinWidth);

        windowElm.bind('resize', setTwinWidth);

        // set dimensions
        stretch();
        shrink();

        // apply animations only after setting dimenmsions
        $timeout(function(){
          element.css({
            '-webkit-transition': 'height 50ms ease-in-out',
               '-moz-transition': 'height 50ms ease-in-out',
                 '-o-transition': 'height 50ms ease-in-out',
                    'transition': 'height 50ms ease-in-out'
          });
        });

        /*
         * destroy
         */

        scope.$on('$destroy', function(){
          twin.remove();
          windowElm.unbind('resize', setTwinWidth);
        });
      }
    };

  }]);
