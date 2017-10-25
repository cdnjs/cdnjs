/**
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/**
 * Implementing Drag and Drop functionality in AngularJS is easier than ever.
 * Demo: http://codef0rmer.github.com/angular-dragdrop/
 *
 * @version 1.0.13
 *
 * (c) 2013 Amit Gharat a.k.a codef0rmer <amit.2006.it@gmail.com> - amitgharat.wordpress.com
 */

(function (window, angular, $, undefined) {
'use strict';

var jqyoui = angular.module('ngDragDrop', []).service('ngDragDropService', ['$timeout', '$parse', '$q', function($timeout, $parse, $q) {
    this.draggableScope = null;
    this.droppableScope = null;

    $('head').prepend('<style type="text/css">@charset "UTF-8";.angular-dragdrop-hide{display: none !important;}</style>');

    this.callEventCallback = function (scope, callbackName, event, ui) {
      if (!callbackName) return;

      var objExtract = extract(callbackName),
          callback = objExtract.callback,
          constructor = objExtract.constructor,
          args = [event, ui].concat(objExtract.args);
      
      // call either $scoped method i.e. $scope.dropCallback or constructor's method i.e. this.dropCallback.
      // Removing scope.$apply call that was performance intensive (especially onDrag) and does not require it
      // always. So call it within the callback if needed.
      return (scope[callback] || scope[constructor][callback]).apply(scope[callback] ? scope : scope[constructor], args);
      
      function extract(callbackName) {
        var atStartBracket = callbackName.indexOf('(') !== -1 ? callbackName.indexOf('(') : callbackName.length,
            atEndBracket = callbackName.lastIndexOf(')') !== -1 ? callbackName.lastIndexOf(')') : callbackName.length,
            args = callbackName.substring(atStartBracket + 1, atEndBracket), // matching function arguments inside brackets
            constructor = callbackName.indexOf('.') !== -1 ? callbackName.substr(0, callbackName.indexOf('.')) : null; // matching a string upto a dot to check ctrl as syntax
            constructor = scope[constructor] && typeof scope[constructor].constructor === 'function' ? constructor : null;

        return {
          callback: callbackName.substring(constructor && constructor.length + 1 || 0, atStartBracket),
          args: $.map(args && args.split(',') || [], function(item) { return [$parse(item)(scope)]; }),
          constructor: constructor
        }
      }
    };

    this.invokeDrop = function ($draggable, $droppable, event, ui) {
      var dragModel = '',
        dropModel = '',
        dragSettings = {},
        dropSettings = {},
        jqyoui_pos = null,
        dragItem = {},
        dropItem = {},
        dragModelValue,
        dropModelValue,
        $droppableDraggable = null,
        droppableScope = this.droppableScope,
        draggableScope = this.draggableScope,
        $helper = null,
        promises = [],
        temp;

      dragModel = $draggable.ngattr('ng-model');
      dropModel = $droppable.ngattr('ng-model');
      dragModelValue = draggableScope.$eval(dragModel);
      dropModelValue = droppableScope.$eval(dropModel);

      $droppableDraggable = $droppable.find('[jqyoui-draggable]:last,[data-jqyoui-draggable]:last');
      dropSettings = droppableScope.$eval($droppable.attr('jqyoui-droppable') || $droppable.attr('data-jqyoui-droppable')) || [];
      dragSettings = draggableScope.$eval($draggable.attr('jqyoui-draggable') || $draggable.attr('data-jqyoui-draggable')) || [];

      // Helps pick up the right item
      dragSettings.index = this.fixIndex(draggableScope, dragSettings, dragModelValue);
      dropSettings.index = this.fixIndex(droppableScope, dropSettings, dropModelValue);

      jqyoui_pos = angular.isArray(dragModelValue) ? dragSettings.index : null;
      dragItem = angular.isArray(dragModelValue) ? dragModelValue[jqyoui_pos] : dragModelValue;

      if (dragSettings.deepCopy) {
        dragItem = angular.copy(dragItem);
      }

      if (angular.isArray(dropModelValue) && dropSettings && dropSettings.index !== undefined) {
        dropItem = dropModelValue[dropSettings.index];
      } else if (!angular.isArray(dropModelValue)) {
        dropItem = dropModelValue;
      } else {
        dropItem = {};
      }

      if (dropSettings.deepCopy) {
        dropItem = angular.copy(dropItem);
      }

      if (dragSettings.beforeDrop) {
        promises.push(this.callEventCallback(draggableScope, dragSettings.beforeDrop, event, ui));
      }

      $q.all(promises).then(angular.bind(this, function() {
        if (dragSettings.insertInline && dragModel === dropModel) {
          if (dragSettings.index > dropSettings.index) {
            temp = dragModelValue[dragSettings.index];
            for (var i = dragSettings.index; i > dropSettings.index; i--) {
              dropModelValue[i] = angular.copy(dropModelValue[i - 1]);
              dropModelValue[i - 1] = {};
              dropModelValue[i][dragSettings.direction] = 'left';
            }
            dropModelValue[dropSettings.index] = temp;
          } else {
            temp = dragModelValue[dragSettings.index];
            for (var i = dragSettings.index; i < dropSettings.index; i++) {
              dropModelValue[i] = angular.copy(dropModelValue[i + 1]);
              dropModelValue[i + 1] = {};
              dropModelValue[i][dragSettings.direction] = 'right';
            }
            dropModelValue[dropSettings.index] = temp;
          }
          this.callEventCallback(droppableScope, dropSettings.onDrop, event, ui);
        } else if (dragSettings.animate === true) {
          // be nice with absolutely positioned brethren :-)
          $helper = $draggable.clone();
          $helper.css({'position': 'absolute'}).css($draggable.offset());
          $('body').append($helper);
          $draggable.addClass('angular-dragdrop-hide');

          this.move($helper, $droppableDraggable.length > 0 ? $droppableDraggable : $droppable, null, 'fast', dropSettings, function() { $helper.remove(); });
          this.move($droppableDraggable.length > 0 && !dropSettings.multiple ? $droppableDraggable : [], $draggable.parent('[jqyoui-droppable],[data-jqyoui-droppable]'), jqyoui.startXY, 'fast', dropSettings, angular.bind(this, function() {
            $timeout(angular.bind(this, function() {
              // Do not move this into move() to avoid flickering issue
              $draggable.css({'position': 'relative', 'left': '', 'top': ''}).removeClass('angular-dragdrop-hide');
              // Angular v1.2 uses ng-hide to hide an element not display property
              // so we've to manually remove display:none set in this.move()
              $droppableDraggable.css({'position': 'relative', 'left': '', 'top': '', 'display': $droppableDraggable.css('display') === 'none' ? '' : $droppableDraggable.css('display')});

              this.mutateDraggable(draggableScope, dropSettings, dragSettings, dragModel, dropModel, dropItem, $draggable);
              this.mutateDroppable(droppableScope, dropSettings, dragSettings, dropModel, dragItem, jqyoui_pos);
              this.callEventCallback(droppableScope, dropSettings.onDrop, event, ui);
            }));
          }));
        } else {
          $timeout(angular.bind(this, function() {
            this.mutateDraggable(draggableScope, dropSettings, dragSettings, dragModel, dropModel, dropItem, $draggable);
            this.mutateDroppable(droppableScope, dropSettings, dragSettings, dropModel, dragItem, jqyoui_pos);
            this.callEventCallback(droppableScope, dropSettings.onDrop, event, ui);
          }));
        }
      })).finally(angular.bind(this, function() {
        this.restore($draggable);
      }));
    };

    this.move = function($fromEl, $toEl, toPos, duration, dropSettings, callback) {
      if ($fromEl.length === 0) {
        if (callback) {
          window.setTimeout(function() {
            callback();
          }, 300);
        }
        return false;
      }

      var zIndex = $fromEl.css('z-index'),
        fromPos = $fromEl[dropSettings.containment || 'offset'](),
        displayProperty = $toEl.css('display'), // sometimes `display` is other than `block`
        hadNgHideCls = $toEl.hasClass('ng-hide'),
        hadDNDHideCls = $toEl.hasClass('angular-dragdrop-hide');

      if (toPos === null && $toEl.length > 0) {
        if (($toEl.attr('jqyoui-draggable') || $toEl.attr('data-jqyoui-draggable')) !== undefined && $toEl.ngattr('ng-model') !== undefined && $toEl.is(':visible') && dropSettings && dropSettings.multiple) {
          toPos = $toEl[dropSettings.containment || 'offset']();
          if (dropSettings.stack === false) {
            toPos.left+= $toEl.outerWidth(true);
          } else {
            toPos.top+= $toEl.outerHeight(true);
          }
        } else {
          // Angular v1.2 uses ng-hide to hide an element 
          // so we've to remove it in order to grab its position
          if (hadNgHideCls) $toEl.removeClass('ng-hide');
          if (hadDNDHideCls) $toEl.removeClass('angular-dragdrop-hide');
          toPos = $toEl.css({'visibility': 'hidden', 'display': 'block'})[dropSettings.containment || 'offset']();
          $toEl.css({'visibility': '','display': displayProperty});
        }
      }

      $fromEl.css({'position': 'absolute', 'z-index': 9999})
        .css(fromPos)
        .animate(toPos, duration, function() {
          // Angular v1.2 uses ng-hide to hide an element
          // and as we remove it above, we've to put it back to
          // hide the element (while swapping) if it was hidden already
          // because we remove the display:none in this.invokeDrop()
          if (hadNgHideCls) $toEl.addClass('ng-hide');
          if (hadDNDHideCls) $toEl.addClass('angular-dragdrop-hide');
          $fromEl.css('z-index', zIndex);
          if (callback) callback();
        });
    };

    this.mutateDroppable = function(scope, dropSettings, dragSettings, dropModel, dragItem, jqyoui_pos) {
      var dropModelValue = scope.$eval(dropModel);

      scope.dndDragItem = dragItem;

      if (angular.isArray(dropModelValue)) {
        if (dropSettings && dropSettings.index >= 0) {
          dropModelValue[dropSettings.index] = dragItem;
        } else {
          dropModelValue.push(dragItem);
        }
        if (dragSettings && dragSettings.placeholder === true) {
          dropModelValue[dropModelValue.length - 1]['jqyoui_pos'] = jqyoui_pos;
        }
      } else {
        $parse(dropModel + ' = dndDragItem')(scope);
        if (dragSettings && dragSettings.placeholder === true) {
          dropModelValue['jqyoui_pos'] = jqyoui_pos;
        }
      }
    };

    this.mutateDraggable = function(scope, dropSettings, dragSettings, dragModel, dropModel, dropItem, $draggable) {
      var isEmpty = angular.equals(dropItem, {}) || !dropItem,
        dragModelValue = scope.$eval(dragModel);

      scope.dndDropItem = dropItem;

      if (dragSettings && dragSettings.placeholder) {
        if (dragSettings.placeholder != 'keep'){
          if (angular.isArray(dragModelValue) && dragSettings.index !== undefined) {
            dragModelValue[dragSettings.index] = dropItem;
          } else {
            $parse(dragModel + ' = dndDropItem')(scope);
          }
        }
      } else {
        if (angular.isArray(dragModelValue)) {
          if (isEmpty) {
            if (dragSettings && ( dragSettings.placeholder !== true && dragSettings.placeholder !== 'keep' )) {
              dragModelValue.splice(dragSettings.index, 1);
            }
          } else {
            dragModelValue[dragSettings.index] = dropItem;
          }
        } else {
          // Fix: LIST(object) to LIST(array) - model does not get updated using just scope[dragModel] = {...}
          // P.S.: Could not figure out why it happened
          $parse(dragModel + ' = dndDropItem')(scope);
          if (scope.$parent) {
            $parse(dragModel + ' = dndDropItem')(scope.$parent);
          }
        }
      }

      this.restore($draggable);
    };

    this.restore = function($draggable) {
      $draggable.css({'z-index': '', 'left': '', 'top': ''});
    };

    this.fixIndex = function(scope, settings, modelValue) {
      if (settings.applyFilter && angular.isArray(modelValue) && modelValue.length > 0) {
        var dragModelValueFiltered = scope[settings.applyFilter](),
            lookup = dragModelValueFiltered[settings.index],
            actualIndex = undefined;

        modelValue.forEach(function(item, i) {
           if (angular.equals(item, lookup)) {
             actualIndex = i;
           }
        });

        return actualIndex;
      }

      return settings.index;
    };
  }]).directive('jqyouiDraggable', ['ngDragDropService', function(ngDragDropService) {
    return {
      require: '?jqyouiDroppable',
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var element = $(elem);
        var dragSettings, jqyouiOptions, zIndex, killWatcher;
        var updateDraggable = function(newValue, oldValue) {
          if (newValue) {
            dragSettings = scope.$eval(element.attr('jqyoui-draggable') || element.attr('data-jqyoui-draggable')) || {};
            jqyouiOptions = scope.$eval(attrs.jqyouiOptions) || {};
            element
              .draggable({disabled: false})
              .draggable(jqyouiOptions)
              .draggable({
                start: function(event, ui) {
                  ngDragDropService.draggableScope = scope;
                  zIndex = $(jqyouiOptions.helper ? ui.helper : this).css('z-index');
                  $(jqyouiOptions.helper ? ui.helper : this).css('z-index', 9999);
                  jqyoui.startXY = $(this)[dragSettings.containment || 'offset']();
                  ngDragDropService.callEventCallback(scope, dragSettings.onStart, event, ui);
                },
                stop: function(event, ui) {
                  $(jqyouiOptions.helper ? ui.helper : this).css('z-index', zIndex);
                  ngDragDropService.callEventCallback(scope, dragSettings.onStop, event, ui);
                },
                drag: function(event, ui) {
                  ngDragDropService.callEventCallback(scope, dragSettings.onDrag, event, ui);
                }
              });
          } else {
            element.draggable({disabled: true});
          }

          if (killWatcher && angular.isDefined(newValue) && (angular.equals(attrs.drag, 'true') || angular.equals(attrs.drag, 'false'))) {
            killWatcher();
            killWatcher = null;
          }
        };

        killWatcher = scope.$watch(function() { return scope.$eval(attrs.drag); }, updateDraggable);
        updateDraggable();

        element.on('$destroy', function() {
          element.draggable({disabled: true}).draggable('destroy');
        });
      }
    };
  }]).directive('jqyouiDroppable', ['ngDragDropService', '$q', function(ngDragDropService, $q) {
    return {
      restrict: 'A',
      priority: 1,
      link: function(scope, elem, attrs) {
        var element = $(elem);
        var dropSettings, jqyouiOptions, killWatcher;
        var updateDroppable = function(newValue, oldValue) {
          if (newValue) {
            dropSettings = scope.$eval($(element).attr('jqyoui-droppable') || $(element).attr('data-jqyoui-droppable')) || {};
            jqyouiOptions = scope.$eval(attrs.jqyouiOptions) || {};
            element
              .droppable({disabled: false})
              .droppable(jqyouiOptions)
              .droppable({
                over: function(event, ui) {
                  ngDragDropService.callEventCallback(scope, dropSettings.onOver, event, ui);
                },
                out: function(event, ui) {
                  ngDragDropService.callEventCallback(scope, dropSettings.onOut, event, ui);
                },
                drop: function(event, ui) {
                  var beforeDropPromise = null;

                  if (dropSettings.beforeDrop) {
                    beforeDropPromise = ngDragDropService.callEventCallback(scope, dropSettings.beforeDrop, event, ui);
                  } else {
                    beforeDropPromise = (function() {
                      var deferred = $q.defer();
                      deferred.resolve();
                      return deferred.promise;
                    })();
                  }

                  beforeDropPromise.then(angular.bind(this, function() {
                    if ($(ui.draggable).ngattr('ng-model') && attrs.ngModel) {
                      ngDragDropService.droppableScope = scope;
                      ngDragDropService.invokeDrop($(ui.draggable), $(this), event, ui);
                    } else {
                      ngDragDropService.callEventCallback(scope, dropSettings.onDrop, event, ui);
                    }
                  }), function() {
                    ui.draggable.animate({left: '', top: ''}, jqyouiOptions.revertDuration || 0);
                  });
                }
              });
          } else {
            element.droppable({disabled: true});
          }

          if (killWatcher && angular.isDefined(newValue) && (angular.equals(attrs.drop, 'true') || angular.equals(attrs.drop, 'false'))) {
            killWatcher();
            killWatcher = null;
          }
        };

        killWatcher = scope.$watch(function() { return scope.$eval(attrs.drop); }, updateDroppable);
        updateDroppable();
        
        element.on('$destroy', function() {
          element.droppable({disabled: true}).droppable('destroy');
        });
      }
    };
  }]);

  $.fn.ngattr = function(name, value) {
    var element = this[0];

    return element.getAttribute(name) || element.getAttribute('data-' + name);
  };
})(window, window.angular, window.jQuery);
