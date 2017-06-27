(function () {
   'use strict';

   angular.module('mobile-angular-ui.gestures.drag', [
     'mobile-angular-ui.gestures.swipe',
     'mobile-angular-ui.gestures.transform'
   ])

  // `$drag` Service wraps `$swipe` to extend its behavior moving target element through css transform according to the `$swipe` coords thus creating 
  // a drag effect.

  // $drag interface is very close to `$swipe`:

  // app.controller('MyController', function($drag, $element){
  //   var unbindDrag = $drag.bind($element, {
  //    // drag callbacks
  //    // - rect is the current result of getBoundingClientRect() for bound element
  //    // - cancelFn issue a "touchcancel" on element
  //    // - resetFn restore the initial transform
  //    // - undoFn undoes the current movement
  //    // - swipeCoords are the coordinates exposed by the underlying $swipe service
  //    start: function(rect, cancelFn, resetFn, swipeCoords){},
  //    move: function(rect, cancelFn, resetFn, swipeCoords){},
  //    end: function(rect, undoFn, resetFn, swipeCoords) {};
  //    cancel: function(rect, resetFn){},

  //    // constraints for the movement
  //    // you can use a "static" object of the form:
  //    // {top: .., lelf: .., bottom: .., rigth: ..}
  //    // or pass a function that is called on each movement 
  //    // and return it in a dynamic way.
  //    // This is useful if you have to constraint drag movement while bounduaries are
  //    // changing over time.

  //    constraint: function(){ return {top: y1, left: x1, bottom: y2, right: x2}; }, // or just {top: y1, left: x1, bottom: y2, right: x2}

  //    // instantiates the Trasform according to touch movement (defaults to `t.translate(dx, dy);`)
  //    // dx, dy are the distances of movement for x and y axis after constraints are applyied
  //    transform: function(transform, dx, dy, currSwipeX, currSwipeY, startSwipeX, startSwipeY) {},

  //    // changes the Transform before is applied to element (useful to add something like easing or accelleration)
  //    adaptTransform: function(transform, dx, dy, currSwipeX, currSwipeY, startSwipeX, startSwipeY) {}

  //   });
    
  //   // This is automatically called when element is disposed so it is not necessary
  //   // that you call this manually but if you have to detatch $drag service before
  //   // this you could just call:
  //   unbindDrag();
  // });

  // Main differences with `$swipe` are:
  //  - bound elements will move following swipe direction automatically
  //  - coords param take into account css transform so you can easily detect collision with other elements.
  //  - start, move, end callback receive a cancel funcion that can be used to cancel the motion and reset
  //    the transform.
  //  - you can configure the transform behavior passing a transform function to options.
  //  - you can constraint the motion through the constraint option (setting relative movement limits)
   
  // Example (drag to dismiss):

  // app.directive('dragToDismiss', function($drag, $parse, $timeout){
  //   return {
  //     restrict: 'A',
  //     compile: function(elem, attrs) {
  //       var dismissFn = $parse(attrs.dragToDismiss);
  //       return function(scope, elem, attrs){
  //         var dismiss = false;

  //         $drag.bind(elem, {
  //           constraint: {
  //             minX: 0, 
  //             minY: 0, 
  //             maxY: 0 
  //           },
  //           move: function(c) {
  //             if( c.left >= c.width / 4) {
  //               dismiss = true;
  //               elem.addClass('dismiss');
  //             } else {
  //               dismiss = false;
  //               elem.removeClass('dismiss');
  //             }
  //           },
  //           cancel: function(){
  //             elem.removeClass('dismiss');
  //           },
  //           end: function(c, undo, reset) {
  //             if (dismiss) {
  //               elem.addClass('dismitted');
  //               $timeout(function() { 
  //                 scope.$apply(function() {
  //                   dismissFn(scope);  
  //                 });
  //               }, 400);
  //             } else {
  //               reset();
  //             }
  //           }
  //         });
  //       };
  //     }
  //   };
  // });

  .provider('$drag', function() {
    this.$get = ['$swipe', '$document', 'Transform', function($swipe, $document, Transform) {

      var style = document.createElement('style');
      style.appendChild(document.createTextNode(''));
      document.head.appendChild(style);
      var sheet = style.sheet;

      // Makes z-index 99999
      sheet.insertRule('html .ui-drag-move{z-index: 99999 !important;}', 0);
      // Disable transitions
      sheet.insertRule('html .ui-drag-move{-webkit-transition: none !important;-moz-transition: none !important;-o-transition: none !important;-ms-transition: none !important;transition: none !important;}', 0);
      // Makes text unselectable
      sheet.insertRule('html .ui-drag-move, html .ui-drag-move *{-webkit-touch-callout: none !important;-webkit-user-select: none !important;-khtml-user-select: none !important;-moz-user-select: none !important;-ms-user-select: none !important;user-select: none !important;}', 0);

      return {
        Transform: Transform,
        bind: function(elem, options) {
          var defaults = {
            constraint: {}
          };

          options = angular.extend({}, defaults, options || {});

          var
            e = angular.element(elem)[0],
            moving = false,
            deltaXTot = 0, // total movement since elem is bound
            deltaYTot = 0,
            x0, y0, // touch coords on start 
            t0, // transform on start
            tOrig = Transform.fromElement(e),
            x, y, // current touch coords
            t, // current transform
            minX = options.constraint.minX !== undefined ? options.constraint.minX : Number.NEGATIVE_INFINITY,
            maxX = options.constraint.maxX !== undefined ? options.constraint.maxX : Number.POSITIVE_INFINITY,
            minY = options.constraint.minY !== undefined ? options.constraint.minY : Number.NEGATIVE_INFINITY,
            maxY = options.constraint.maxY !== undefined ? options.constraint.maxY : Number.POSITIVE_INFINITY,
            
            preventedWhileMoving = ['click', 'tap', 'mouseup', 'touchend'],

            captureClicks = function(e) {
              e.stopPropagation();
            },

            cancelFn = function(){
              elem.triggerHandler('touchcancel');
            },

            resetFn = function(){
              elem.triggerHandler('touchcancel');
              deltaXTot = 0;
              deltaYTot = 0;
              tOrig.set(e);
            },

            callbacks = {
              move: function(c, event) {
                event.stopPropagation();
                event.preventDefault();

                if (elem[0].addEventListener) {
                  for (var i = 0; i < preventedWhileMoving.length; i++) {
                    
                    // Sorry.. for IE8 we are not capturing clicks
                    // for inner elements, hope it wont cause too 
                    // much problems
                    elem[0].addEventListener(preventedWhileMoving[i], captureClicks, true);
                  }                  
                }

                if (!moving) {    // $swipe calls start at the first touch
                                  // to ensure $drag start is called only while actually
                                  // dragging and not for touches we will bind $drag.start
                                  // to the first time move is called.

                  t0 = Transform.fromElement(e);
                  x  = x0 = c.x;
                  y  = y0 = c.y; 

                  elem.addClass('ui-drag-move');

                  if (options.start) {
                    options.start(e.getBoundingClientRect(), cancelFn, resetFn, c);    
                  }

                  moving = true;
                }

                // total movement shoud match constraints
                var dx, dy,
                deltaX, deltaY, r,
                rectBefore = e.getBoundingClientRect(),
                _maxX = angular.isFunction(maxX) ? maxX() : maxX,
                _maxY = angular.isFunction(maxY) ? maxY() : maxY,
                _minX = angular.isFunction(minX) ? minX() : minX,
                _minY = angular.isFunction(minY) ? minY() : minY;

                deltaX = Math.max(Math.min(_maxX - deltaXTot, c.x - x0), _minX - deltaXTot);
                deltaY = Math.max(Math.min(_maxY - deltaYTot, c.y - y0), _minY - deltaYTot);

                dx = deltaX - (x - x0);
                dy = deltaY - (y - y0);

                t = Transform.fromElement(e); 

                if (options.transform) {
                  r = options.transform(t, dx, dy, c.x, c.y, x0, y0);
                  t = r || t;
                } else {
                  t.translate(dx, dy);
                }

                if (options.adaptTransform) {
                  r = options.adaptTransform(t, dx, dy, c.x, c.y, x0, y0);
                  t = r || t;
                }
                
                x = deltaX + x0;
                y = deltaY + y0;

                t.set(e);

                if (options.move) {
                  options.move(e.getBoundingClientRect(), cancelFn, resetFn, c);  
                }

              },

              end: function(c) {
                moving = false;
                if (elem[0].removeEventListener) {
                  for (var i = 0; i < preventedWhileMoving.length; i++) {
                    elem[0].removeEventListener(preventedWhileMoving[i], captureClicks);
                  }                  
                }

                var deltaXTotOld = deltaXTot;
                var deltaYTotOld = deltaYTot;

                var undoFn = function() {
                  deltaXTot = deltaXTotOld;
                  deltaYTot = deltaYTotOld;
                  t0.set(e);
                };

                deltaXTot = deltaXTot + x - x0;
                deltaYTot = deltaYTot + y - y0;
                
                if (options.end) {
                  options.end(e.getBoundingClientRect(), undoFn, resetFn, c);
                }
                
                elem.removeClass('ui-drag-move');
              },

              cancel: function() {
                if (elem[0].removeEventListener) {
                  for (var i = 0; i < preventedWhileMoving.length; i++) {
                    elem[0].removeEventListener(preventedWhileMoving[i], captureClicks);
                  }                  
                }

                if (moving) {
                  t0.set(e);  
                  if (options.cancel) {
                    options.cancel(e.getBoundingClientRect(), resetFn);
                  }
                  moving = false;
                  elem.removeClass('ui-drag-move');
                }
              }
            };

          elem.on('$destroy', function() { 
            $document.unbind('mouseout', cancelFn);
            callbacks = options = e = moving = deltaXTot = deltaYTot = x0 = y0 = t0 = tOrig = x = y = t = minX = maxX = minY = maxY = null;
          });

          var unbind = $swipe.bind(elem, callbacks);
          $document.on('mouseout', cancelFn);
          return unbind;
        }
      };
    }];
  });

}());
(function() {
  'use strict';

  // An adaptation of ngTouch.$swipe
  // basically the same despite of:
  // 1) It does not require ngTouch thus is better compatible with fastclick.js 
  // 2) It allows to unbind
  var module = angular.module('mobile-angular-ui.gestures.swipe', []);

  module.factory('$swipe', [function() {
    var MOVE_BUFFER_RADIUS = 10;

    var POINTER_EVENTS = {
      'mouse': {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
      },
      'touch': {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend',
        cancel: 'touchcancel'
      }
    };

    function getCoordinates(event) {
      var touches = event.touches && event.touches.length ? event.touches : [event];
      var e = (event.changedTouches && event.changedTouches[0]) ||
          (event.originalEvent && event.originalEvent.changedTouches &&
              event.originalEvent.changedTouches[0]) ||
          touches[0].originalEvent || touches[0];

      return {
        x: e.clientX,
        y: e.clientY
      };
    }

    function getEvents(pointerTypes, eventType) {
      var res = [];
      angular.forEach(pointerTypes, function(pointerType) {
        var eventName = POINTER_EVENTS[pointerType][eventType];
        if (eventName) {
          res.push(eventName);
        }
      });
      return res.join(' ');
    }

    return {
      bind: function(element, eventHandlers, pointerTypes) {
        // Absolute total movement, used to control swipe vs. scroll.
        var totalX, totalY;
        // Coordinates of the start position.
        var startCoords;
        // Last event's position.
        var lastPos;
        // Whether a swipe is active.
        var active = false;

        pointerTypes = pointerTypes || ['mouse', 'touch'];

        var cancelEvents = getEvents(pointerTypes, 'cancel');
        var startEvents = getEvents(pointerTypes, 'start');
        var endEvents = getEvents(pointerTypes, 'end');
        var moveEvents = getEvents(pointerTypes, 'move');

        var startCb = function(event) {
          startCoords = getCoordinates(event);
          active = true;
          totalX = 0;
          totalY = 0;
          lastPos = startCoords;
          if (eventHandlers.start) {
            eventHandlers.start(startCoords, event);
          }
        };

        var moveCb = function(event) {
          if (!active) return;

          // Android will send a touchcancel if it thinks we're starting to scroll.
          // So when the total distance (+ or - or both) exceeds 10px in either direction,
          // we either:
          // - On totalX > totalY, we send preventDefault() and treat this as a swipe.
          // - On totalY > totalX, we let the browser handle it as a scroll.

          if (!startCoords) return;
          var coords = getCoordinates(event);

          totalX += Math.abs(coords.x - lastPos.x);
          totalY += Math.abs(coords.y - lastPos.y);

          lastPos = coords;

          if (totalX < MOVE_BUFFER_RADIUS && totalY < MOVE_BUFFER_RADIUS) {
            return;
          }

          // One of totalX or totalY has exceeded the buffer, so decide on swipe vs. scroll.
          if (totalY > totalX) {
            // Allow native scrolling to take over.
            active = false;
            if (eventHandlers.cancel) {
              eventHandlers.cancel(event);
            }
            return;
          } else {
            // Prevent the browser from scrolling.
            event.preventDefault();
            if (eventHandlers.move) {
              eventHandlers.move(coords, event);
            }
          }
        };

        var cancelCb = function(event) {
          active = false;
          if (eventHandlers.cancel) {
            eventHandlers.cancel(event);
          }        
        };

        var endCb = function(event) {
          if (!active) return;
          active = false;
          if(eventHandlers.end) {
            eventHandlers.end(getCoordinates(event), event);
          }
        };

        element.on(startEvents, startCb);
        if (cancelEvents) { element.on(cancelEvents, cancelCb); }
        element.on(moveEvents, moveCb);
        element.on(endEvents, endCb);
      
        return function unbind() {
          element.off(startEvents, startCb);
          if (cancelEvents) { element.off(cancelEvents, cancelCb); }
          element.off(moveEvents, moveCb);
          element.off(endEvents, endCb);
          element = startEvents = startCb = moveEvents = moveCb = endEvents = endCb = cancelEvents = cancelCb = null;
        };
      }
    };
  }]);

  // Same that for ng-swipe-left/ng-swipe-right but allows for nesting
  // Only inner directive will trigger swipe handler
  var makeSwipeDirective = function(directiveName, direction, eventName) {
    module.directive(directiveName, ['$parse', '$swipe', function($parse, $swipe) {
      // The maximum vertical delta for a swipe should be less than 75px.
      var MAX_VERTICAL_DISTANCE = 75;
      // Vertical distance should not be more than a fraction of the horizontal distance.
      var MAX_VERTICAL_RATIO = 0.3;
      // At least a 30px lateral motion is necessary for a swipe.
      var MIN_HORIZONTAL_DISTANCE = 30;

      return function(scope, element, attr) {
        var swipeHandler = $parse(attr[directiveName]);

        var startCoords, valid;

        function validSwipe(coords) {
          // Check that it's within the coordinates.
          // Absolute vertical distance must be within tolerances.
          // Horizontal distance, we take the current X - the starting X.
          // This is negative for leftward swipes and positive for rightward swipes.
          // After multiplying by the direction (-1 for left, +1 for right), legal swipes
          // (ie. same direction as the directive wants) will have a positive delta and
          // illegal ones a negative delta.
          // Therefore this delta must be positive, and larger than the minimum.
          if (!startCoords) return false;
          var deltaY = Math.abs(coords.y - startCoords.y);
          var deltaX = (coords.x - startCoords.x) * direction;
          return valid && // Short circuit for already-invalidated swipes.
              deltaY < MAX_VERTICAL_DISTANCE &&
              deltaX > 0 &&
              deltaX > MIN_HORIZONTAL_DISTANCE &&
              deltaY / deltaX < MAX_VERTICAL_RATIO;
        }

        var pointerTypes = ['touch'];
        if (!angular.isDefined(attr.ngSwipeDisableMouse)) {
          pointerTypes.push('mouse');
        }
        $swipe.bind(element, {
          'start': function(coords, event) {
            startCoords = coords;
            valid = true;
          },
          'cancel': function(event) {
            valid = false;
          },
          'end': function(coords, event) {
              event.stopPropagation();

              if (validSwipe(coords)) {
                scope.$apply(function() {
                  element.triggerHandler(eventName);
                  swipeHandler(scope, {$event: event});
                });
              }

          }
        }, pointerTypes);
      };
    }]);
  };

  // Left is negative X-coordinate, right is positive.
  makeSwipeDirective('ngSwipeLeft', -1, 'swipeleft');
  makeSwipeDirective('ngSwipeRight', 1, 'swiperight');
}());




(function() {
  'use strict';
  angular.module('mobile-angular-ui.gestures.transform', [])

  .factory('Transform', [
    '$window',
    function($window){

      function matrixHeight(m) {
        return m.length;
      }

      function matrixWidth(m) {
        return m[0] ? m[0].length : 0;
      }

      function matrixMult(m1, m2) {
        var width1  = matrixWidth(m1), 
            width2  = matrixWidth(m2), 
            height1 = matrixHeight(m1), 
            height2 = matrixHeight(m2);

        if (width1 != height2) {
          throw new Error("error: incompatible sizes");
        }
      
        var result = [];
        for (var i = 0; i < height1; i++) {
            result[i] = [];
            for (var j = 0; j < width2; j++) {
                var sum = 0;
                for (var k = 0; k < width1; k++) {
                    sum += m1[i][k] * m2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result; 
      }

      //
      // Cross-Browser stuffs
      // 
      var cssPrefix,
          transformProperty,
          styleProperty,
          prefixes = ['', 'webkit', 'Moz', 'O', 'ms'],
          d = $window.document.createElement('div');
      
      for (var i = 0; i < prefixes.length; i++) {
        var prefix = prefixes[i];
        if ( (prefix + 'Perspective') in d.style ) {
          cssPrefix = (prefix === '' ? '' : '-' + prefix.toLowerCase() + '-');
          styleProperty = prefix + (prefix === '' ? 'transform' : 'Transform');
          transformProperty = cssPrefix + 'transform';
          break;
        }
      }

      d = null;

      //
      // Represents a 2d transform, 
      // behind the scene is a transform matrix exposing methods to get/set
      // meaningfull primitives like rotation, translation and scale.
      // 
      // Allows to apply multiple transforms through #merge.
      //
      function Transform(matrix) {
        this.mtx = matrix || [
          [1,0,0],
          [0,1,0],
          [0,0,1]
        ];
      }
      
      Transform.getElementTransformProperty = function(e) {
        e = e.length ? e[0] : e;
        var tr = $window
                .getComputedStyle(e, null)
                .getPropertyValue(transformProperty);
        return tr;
      };

      Transform.setElementTransformProperty = function(e, value) {
        e = e.length ? e[0] : e;
        e.style[styleProperty] = value;
      };

      Transform.fromElement = function(e) {
        e = e.length ? e[0] : e;
        var tr = Transform.getElementTransformProperty(e);

        if (!tr || tr === 'none') {
          return new Transform();
        }

        if (tr.match('matrix3d')) {
          throw new Error('Handling 3d transform is not supported yet');
        }

        var values = 
          tr.split('(')[1]
            .split(')')[0]
            .split(',')
            .map(Number);

        var mtx = [
          [values[0], values[2], values[4]],
          [values[1], values[3], values[5]],
          [        0,         0,        1 ],
        ];

        return new Transform(mtx);
      };

      Transform.prototype.apply = function(e, options) {
        e = e.length ? e[0] : e;
        var mtx = Transform.fromElement(e).merge(this).mtx;
        e.style[styleProperty] = 'matrix(' + [ mtx[0][0], mtx[1][0], mtx[0][1], mtx[1][1], mtx[0][2], mtx[1][2] ].join(',') + ')';
        return this;
      };

      Transform.prototype.set = function(e) {
        e = e.length ? e[0] : e;
        var mtx = this.mtx;
        e.style[styleProperty] = 'matrix(' + [ mtx[0][0], mtx[1][0], mtx[0][1], mtx[1][1], mtx[0][2], mtx[1][2] ].join(',') + ')';
        return this;
      };

      Transform.prototype.rotate = function(a) {
        a = a * (Math.PI / 180); // deg2rad
        var t = [
          [Math.cos(a), -Math.sin(a),  0],
          [Math.sin(a),  Math.cos(a),  0],
          [          0,            0,  1]
        ];

        this.mtx = matrixMult(t, this.mtx);
        return this;
      };

      Transform.prototype.translate = function(x, y) {
        y = (y === null || y === undefined) ? x : y;
        var t = [
          [1,0,x],
          [0,1,y],
          [0,0,1]
        ];
        this.mtx = matrixMult(t, this.mtx);
        return this;
      };

      Transform.prototype.scale = function(a) {
        var t = [
          [a,0,0],
          [0,a,0],
          [0,0,1]
        ];
        this.mtx = matrixMult(t, this.mtx);
        return this;
      };

      Transform.prototype.merge = function(t) {
        this.mtx = matrixMult(this.mtx, t.mtx);
        return this;
      };

      Transform.prototype.getRotation = function() {
        var mtx = this.mtx;
        return Math.round(Math.atan2(mtx[1][0], mtx[0][0]) * (180/Math.PI)); // rad2deg
      };

      Transform.prototype.getTranslation = function() {
        var mtx = this.mtx;
        return {
          x: mtx[0][2],
          y: mtx[1][2]
        };
      };

      Transform.prototype.getScale = function() {
        var mtx = this.mtx, a = mtx[0][0], b = mtx[1][0], d = 10;
        return Math.round( Math.sqrt( a*a + b*b ) * d ) / d;
      };

      Transform.prototype.matrixToString = function() {
        var mtx = this.mtx;
        var res = "";
        for (var i = 0; i < mtx.length; i++) {
          for (var j = 0; j < mtx[i].length; j++) {
            var n = '' + mtx[i][j];
            res += n;
            for (var k = 0; k < 5 - n.length; k++) {
              res += ' ';
            }
          }
          res += '\n';
        }
        return res;
      };

      return Transform;
    }
  ]);
}());
(function () {
   'use strict';

   angular.module('mobile-angular-ui.gestures', [
     'mobile-angular-ui.gestures.drag',
     'mobile-angular-ui.gestures.swipe',
     'mobile-angular-ui.gestures.transform'
   ]);

}());