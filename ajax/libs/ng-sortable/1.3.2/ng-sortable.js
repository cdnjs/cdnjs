/*
 ng-sortable v1.3.1
 The MIT License (MIT)

 Copyright (c) 2014 Muhammed Ashik

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */

/*jshint indent: 2 */
/*global angular: false */

(function () {
  'use strict';
  angular.module('as.sortable', [])
    .constant('sortableConfig', {
      itemClass: 'as-sortable-item',
      handleClass: 'as-sortable-item-handle',
      placeHolderClass: 'as-sortable-placeholder',
      dragClass: 'as-sortable-drag',
      hiddenClass: 'as-sortable-hidden',
      dragging: 'as-sortable-dragging'
    });
}());

/*jshint indent: 2 */
/*global angular: false */

(function () {
  'use strict';

  var mainModule = angular.module('as.sortable');

  /**
   * Helper factory for sortable.
   */
  mainModule.factory('$helper', ['$document', '$window',
    function ($document, $window) {
      return {

        /**
         * Get the height of an element.
         *
         * @param {Object} element Angular element.
         * @returns {String} Height
         */
        height: function (element) {
          return element[0].getBoundingClientRect().height;
        },

        /**
         * Get the width of an element.
         *
         * @param {Object} element Angular element.
         * @returns {String} Width
         */
        width: function (element) {
          return element[0].getBoundingClientRect().width;
        },

        /**
         * Get the offset values of an element.
         *
         * @param {Object} element Angular element.
         * @param {Object} [scrollableContainer] Scrollable container object for calculating relative top & left (optional, defaults to Document)
         * @returns {Object} Object with properties width, height, top and left
         */
        offset: function (element, scrollableContainer) {
          var boundingClientRect = element[0].getBoundingClientRect();
          if (!scrollableContainer) {
            scrollableContainer = $document[0].documentElement;
          }

          return {
            width: boundingClientRect.width || element.prop('offsetWidth'),
            height: boundingClientRect.height || element.prop('offsetHeight'),
            top: boundingClientRect.top + ($window.pageYOffset || scrollableContainer.scrollTop - scrollableContainer.offsetTop),
            left: boundingClientRect.left + ($window.pageXOffset || scrollableContainer.scrollLeft - scrollableContainer.offsetLeft)
          };
        },

        /**
         * get the event object for touch.
         *
         * @param  {Object} event the touch event
         * @return {Object} the touch event object.
         */
        eventObj: function (event) {
          var obj = event;
          if (event.targetTouches !== undefined) {
            obj = event.targetTouches.item(0);
          } else if (event.originalEvent !== undefined && event.originalEvent.targetTouches !== undefined) {
            obj = event.originalEvent.targetTouches.item(0);
          }
          return obj;
        },

        /**
         * Checks whether the touch is valid and multiple.
         *
         * @param event the event object.
         * @returns {boolean} true if touch is multiple.
         */
        isTouchInvalid: function (event) {

          var touchInvalid = false;
          if (event.touches !== undefined && event.touches.length > 1) {
            touchInvalid = true;
          } else if (event.originalEvent !== undefined &&
            event.originalEvent.touches !== undefined && event.originalEvent.touches.length > 1) {
            touchInvalid = true;
          }
          return touchInvalid;
        },

        /**
         * Get the start position of the target element according to the provided event properties.
         *
         * @param {Object} event Event
         * @param {Object} target Target element
         * @param {Object} [scrollableContainer] (optional) Scrollable container object
         * @returns {Object} Object with properties offsetX, offsetY.
         */
        positionStarted: function (event, target, scrollableContainer) {
          var pos = {};
          pos.offsetX = event.pageX - this.offset(target, scrollableContainer).left;
          pos.offsetY = event.pageY - this.offset(target, scrollableContainer).top;
          pos.startX = pos.lastX = event.pageX;
          pos.startY = pos.lastY = event.pageY;
          pos.nowX = pos.nowY = pos.distX = pos.distY = pos.dirAx = 0;
          pos.dirX = pos.dirY = pos.lastDirX = pos.lastDirY = pos.distAxX = pos.distAxY = 0;
          return pos;
        },

        /**
         * Calculates the event position and sets the direction
         * properties.
         *
         * @param pos the current position of the element.
         * @param event the move event.
         */
        calculatePosition: function (pos, event) {
          // mouse position last events
          pos.lastX = pos.nowX;
          pos.lastY = pos.nowY;

          // mouse position this events
          pos.nowX = event.pageX;
          pos.nowY = event.pageY;

          // distance mouse moved between events
          pos.distX = pos.nowX - pos.lastX;
          pos.distY = pos.nowY - pos.lastY;

          // direction mouse was moving
          pos.lastDirX = pos.dirX;
          pos.lastDirY = pos.dirY;

          // direction mouse is now moving (on both axis)
          pos.dirX = pos.distX === 0 ? 0 : pos.distX > 0 ? 1 : -1;
          pos.dirY = pos.distY === 0 ? 0 : pos.distY > 0 ? 1 : -1;

          // axis mouse is now moving on
          var newAx = Math.abs(pos.distX) > Math.abs(pos.distY) ? 1 : 0;

          // calc distance moved on this axis (and direction)
          if (pos.dirAx !== newAx) {
            pos.distAxX = 0;
            pos.distAxY = 0;
          } else {
            pos.distAxX += Math.abs(pos.distX);
            if (pos.dirX !== 0 && pos.dirX !== pos.lastDirX) {
              pos.distAxX = 0;
            }

            pos.distAxY += Math.abs(pos.distY);
            if (pos.dirY !== 0 && pos.dirY !== pos.lastDirY) {
              pos.distAxY = 0;
            }
          }
          pos.dirAx = newAx;
        },

        /**
         * Move the position by applying style.
         *
         * @param event the event object
         * @param element - the dom element
         * @param pos - current position
         * @param container - the bounding container.
         * @param containerPositioning - absolute or relative positioning.
         * @param {Object} [scrollableContainer] (optional) Scrollable container object
         */
        movePosition: function (event, element, pos, container, containerPositioning, scrollableContainer) {
          var bounds;
          var useRelative = (containerPositioning === 'relative');

          element.x = event.pageX - pos.offsetX;
          element.y = event.pageY - pos.offsetY;

          if (container) {
            bounds = this.offset(container, scrollableContainer);

            if (useRelative) {
              // reduce positioning by bounds
              element.x -= bounds.left;
              element.y -= bounds.top;

              // reset bounds
              bounds.left = 0;
              bounds.top = 0;
            }

            if (element.x < bounds.left) {
              element.x = bounds.left;
            } else if (element.x >= bounds.width + bounds.left - this.offset(element).width) {
              element.x = bounds.width + bounds.left - this.offset(element).width;
            }
            if (element.y < bounds.top) {
              element.y = bounds.top;
            } else if (element.y >= bounds.height + bounds.top - this.offset(element).height) {
              element.y = bounds.height + bounds.top - this.offset(element).height;
            }
          }

          element.css({
            'left': element.x + 'px',
            'top': element.y + 'px'
          });

          this.calculatePosition(pos, event);
        },

        /**
         * The drag item info and functions.
         * retains the item info before and after move.
         * holds source item and target scope.
         *
         * @param item - the drag item
         * @returns {{index: *, parent: *, source: *,
                 *          sourceInfo: {index: *, itemScope: (*|.dragItem.sourceInfo.itemScope|$scope.itemScope|itemScope), sortableScope: *},
                 *         moveTo: moveTo, isSameParent: isSameParent, isOrderChanged: isOrderChanged, eventArgs: eventArgs, apply: apply}}
         */
        dragItem: function (item) {

          return {
            index: item.index(),
            parent: item.sortableScope,
            source: item,
            sourceInfo: {
              index: item.index(),
              itemScope: item.itemScope,
              sortableScope: item.sortableScope
            },
            moveTo: function (parent, index) { // Move the item to a new position
              this.parent = parent;
              //If source Item is in the same Parent.
              if (this.isSameParent() && this.source.index() < index) { // and target after
                index = index - 1;
              }
              this.index = index;
            },
            isSameParent: function () {
              return this.parent.element === this.sourceInfo.sortableScope.element;
            },
            isOrderChanged: function () {
              return this.index !== this.sourceInfo.index;
            },
            eventArgs: function () {
              return {
                source: this.sourceInfo,
                dest: {
                  index: this.index,
                  sortableScope: this.parent
                }
              };
            },
            apply: function () {
              // If clone is not set to true, remove the item from the source model.
              if (!this.sourceInfo.sortableScope.options.clone) {
                this.sourceInfo.sortableScope.removeItem(this.sourceInfo.index);
              }

              // If the dragged item is not already there, insert the item. This avoids ng-repeat dupes error
              if(this.parent.options.allowDuplicates || this.parent.modelValue.indexOf(this.source.modelValue) < 0) {
                this.parent.insertItem(this.index, this.source.modelValue);
              }

            }
          };
        },

        /**
         * Check the drag is not allowed for the element.
         *
         * @param element - the element to check
         * @returns {boolean} - true if drag is not allowed.
         */
        noDrag: function (element) {
          return element.attr('no-drag') !== undefined || element.attr('data-no-drag') !== undefined;
        },

        /**
         * Helper function to find the first ancestor with a given selector
         * @param el - angular element to start looking at
         * @param selector - selector to find the parent
         * @returns {Object} - Angular element of the ancestor or body if not found
         * @private
         */
        findAncestor: function (el, selector) {
          el = el[0];
          var matches = Element.matches || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
          while ((el = el.parentElement) && !matches.call(el, selector)) {
          }
          return el ? angular.element(el) : angular.element(document.body);
        }
      };
    }
  ]);

}());
/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

(function () {

  'use strict';
  var mainModule = angular.module('as.sortable');

  /**
   * Controller for Sortable.
   * @param $scope - the sortable scope.
   */
  mainModule.controller('as.sortable.sortableController', ['$scope', function ($scope) {

    this.scope = $scope;

    $scope.modelValue = null; // sortable list.
    $scope.callbacks = null;
    $scope.type = 'sortable';
    $scope.options = {};
    $scope.isDisabled = false;

    /**
     * Inserts the item in to the sortable list.
     *
     * @param index - the item index.
     * @param itemData - the item model data.
     */
    $scope.insertItem = function (index, itemData) {
      if ($scope.options.allowDuplicates) {
        $scope.modelValue.splice(index, 0, angular.copy(itemData));
      } else {
        $scope.modelValue.splice(index, 0, itemData);
      }
    };

    /**
     * Removes the item from the sortable list.
     *
     * @param index - index to be removed.
     * @returns {*} - removed item.
     */
    $scope.removeItem = function (index) {
      var removedItem = null;
      if (index > -1) {
        removedItem = $scope.modelValue.splice(index, 1)[0];
      }
      return removedItem;
    };

    /**
     * Checks whether the sortable list is empty.
     *
     * @returns {null|*|$scope.modelValue|boolean}
     */
    $scope.isEmpty = function () {
      return ($scope.modelValue && $scope.modelValue.length === 0);
    };

    /**
     * Wrapper for the accept callback delegates to callback.
     *
     * @param sourceItemHandleScope - drag item handle scope.
     * @param destScope - sortable target scope.
     * @param destItemScope - sortable destination item scope.
     * @returns {*|boolean} - true if drop is allowed for the drag item in drop target.
     */
    $scope.accept = function (sourceItemHandleScope, destScope, destItemScope) {
      return $scope.callbacks.accept(sourceItemHandleScope, destScope, destItemScope);
    };

  }]);

  /**
   * Sortable directive - defines callbacks.
   * Parent directive for draggable and sortable items.
   * Sets modelValue, callbacks, element in scope.
   */
  mainModule.directive('asSortable',
    function () {
      return {
        require: 'ngModel', // get a hold of NgModelController
        restrict: 'A',
        scope: true,
        controller: 'as.sortable.sortableController',
        link: function (scope, element, attrs, ngModelController) {

          var ngModel, callbacks;

          ngModel = ngModelController;

          if (!ngModel) {
            return; // do nothing if no ng-model
          }

          // Set the model value in to scope.
          ngModel.$render = function () {
            scope.modelValue = ngModel.$modelValue;
          };
          //set the element in scope to be accessed by its sub scope.
          scope.element = element;
          element.data('_scope',scope); // #144, work with angular debugInfoEnabled(false)

          callbacks = {accept: null, orderChanged: null, itemMoved: null, dragStart: null, dragMove:null, dragCancel: null, dragEnd: null};

          /**
           * Invoked to decide whether to allow drop.
           *
           * @param sourceItemHandleScope - the drag item handle scope.
           * @param destSortableScope - the drop target sortable scope.
           * @param destItemScope - the drop target item scope.
           * @returns {boolean} - true if allowed for drop.
           */
          callbacks.accept = function (sourceItemHandleScope, destSortableScope, destItemScope) {
            return true;
          };

          /**
           * Invoked when order of a drag item is changed.
           *
           * @param event - the event object.
           */
          callbacks.orderChanged = function (event) {
          };

          /**
           * Invoked when the item is moved to other sortable.
           *
           * @param event - the event object.
           */
          callbacks.itemMoved = function (event) {
          };

          /**
           * Invoked when the drag started successfully.
           *
           * @param event - the event object.
           */
          callbacks.dragStart = function (event) {
          };

          /**
           * Invoked when the drag move.
           *
           * @param itemPosition - the item position.
           * @param containment - the containment element.
           * @param eventObj - the event object.
          */
          callbacks.dragMove = angular.noop;

          /**
           * Invoked when the drag cancelled.
           *
           * @param event - the event object.
           */
          callbacks.dragCancel = function (event) {
          };

          /**
           * Invoked when the drag stopped.
           *
           * @param event - the event object.
           */
          callbacks.dragEnd = function (event) {
          };

          //Set the sortOptions callbacks else set it to default.
          scope.$watch(attrs.asSortable, function (newVal, oldVal) {
            angular.forEach(newVal, function (value, key) {
              if (callbacks[key]) {
                if (typeof value === 'function') {
                  callbacks[key] = value;
                }
              } else {
                scope.options[key] = value;
              }
            });
            scope.callbacks = callbacks;
          }, true);

          // Set isDisabled if attr is set, if undefined isDisabled = false
          if (angular.isDefined(attrs.isDisabled)) {
            scope.$watch(attrs.isDisabled, function (newVal, oldVal) {
              if (!angular.isUndefined(newVal)) {
                scope.isDisabled = newVal;
              }
            }, true);
          }
        }
      };
    });

}());

/*jshint indent: 2 */
/*global angular: false */

(function () {

  'use strict';
  var mainModule = angular.module('as.sortable');

  /**
   * Controller for sortableItemHandle
   *
   * @param $scope - item handle scope.
   */
  mainModule.controller('as.sortable.sortableItemHandleController', ['$scope', function ($scope) {

    this.scope = $scope;

    $scope.itemScope = null;
    $scope.type = 'handle';
  }]);

  //Check if a node is parent to another node
  function isParent(possibleParent, elem) {
    if(!elem || elem.nodeName === 'HTML') {
      return false;
    }

    if(elem.parentNode === possibleParent) {
      return true;
    }

    return isParent(possibleParent, elem.parentNode);
  }

  /**
   * Directive for sortable item handle.
   */
  mainModule.directive('asSortableItemHandle', ['sortableConfig', '$helper', '$window', '$document',
    function (sortableConfig, $helper, $window, $document) {
      return {
        require: '^asSortableItem',
        scope: true,
        restrict: 'A',
        controller: 'as.sortable.sortableItemHandleController',
        link: function (scope, element, attrs, itemController) {

          var dragElement, //drag item element.
            placeHolder, //place holder class element.
            placeElement,//hidden place element.
            itemPosition, //drag item element position.
            dragItemInfo, //drag item data.
            containment,//the drag container.
            containerPositioning, // absolute or relative positioning.
            dragListen,// drag listen event.
            scrollableContainer, //the scrollable container
            dragStart,// drag start event.
            dragMove,//drag move event.
            dragEnd,//drag end event.
            dragCancel,//drag cancel event.
            isDraggable,//is element draggable.
            placeHolderIndex,//placeholder index in items elements.
            bindDrag,//bind drag events.
            unbindDrag,//unbind drag events.
            bindEvents,//bind the drag events.
            unBindEvents,//unbind the drag events.
            hasTouch,// has touch support.
            dragHandled, //drag handled.
            createPlaceholder,//create place holder.
            isPlaceHolderPresent,//is placeholder present.
            isDisabled = false, // drag enabled
            escapeListen; // escape listen event

          hasTouch = $window.hasOwnProperty('ontouchstart');

          if (sortableConfig.handleClass) {
            element.addClass(sortableConfig.handleClass);
          }

          scope.itemScope = itemController.scope;
          element.data('_scope', scope); // #144, work with angular debugInfoEnabled(false)

          scope.$watch('sortableScope.isDisabled', function (newVal) {
            if (isDisabled !== newVal) {
              isDisabled = newVal;
              if (isDisabled) {
                unbindDrag();
              } else {
                bindDrag();
              }
            }
          });

          scope.$on('$destroy', function () {
            angular.element($document[0].body).unbind('keydown', escapeListen);
          });

          createPlaceholder = function (itemScope) {
            if (typeof scope.sortableScope.options.placeholder === 'function') {
              return angular.element(scope.sortableScope.options.placeholder(itemScope));
            } else if (typeof scope.sortableScope.options.placeholder === 'string') {
              return angular.element(scope.sortableScope.options.placeholder);
            } else {
              return angular.element($document[0].createElement(itemScope.element.prop('tagName')));
            }
          };

          /**
           * Listens for a 10px movement before
           * dragStart is called to allow for
           * a click event on the element.
           *
           * @param event - the event object.
           */
          dragListen = function (event) {

            var unbindMoveListen = function () {
              angular.element($document).unbind('mousemove', moveListen);
              angular.element($document).unbind('touchmove', moveListen);
              element.unbind('mouseup', unbindMoveListen);
              element.unbind('touchend', unbindMoveListen);
              element.unbind('touchcancel', unbindMoveListen);
            };

            var startPosition;
            var moveListen = function (e) {
              e.preventDefault();
              var eventObj = $helper.eventObj(e);
              if (!startPosition) {
                startPosition = { clientX: eventObj.clientX, clientY: eventObj.clientY };
              }
              if (Math.abs(eventObj.clientX - startPosition.clientX) + Math.abs(eventObj.clientY - startPosition.clientY) > 10) {
                unbindMoveListen();
                dragStart(event);
              }
            };

            angular.element($document).bind('mousemove', moveListen);
            angular.element($document).bind('touchmove', moveListen);
            element.bind('mouseup', unbindMoveListen);
            element.bind('touchend', unbindMoveListen);
            element.bind('touchcancel', unbindMoveListen);
            event.stopPropagation();
          };

          /**
           * Triggered when drag event starts.
           *
           * @param event the event object.
           */
          dragStart = function (event) {

            var eventObj, tagName;

            if (!hasTouch && (event.button === 2 || event.which === 3)) {
              // disable right click
              return;
            }
            if (hasTouch && $helper.isTouchInvalid(event)) {
              return;
            }
            if (dragHandled || !isDraggable(event)) {
              // event has already fired in other scope.
              return;
            }
            // Set the flag to prevent other items from inheriting the drag event
            dragHandled = true;
            event.preventDefault();
            eventObj = $helper.eventObj(event);
            scope.sortableScope = scope.sortableScope || scope.itemScope.sortableScope; //isolate directive scope issue.
            scope.callbacks = scope.callbacks || scope.itemScope.callbacks; //isolate directive scope issue.

            // (optional) Scrollable container as reference for top & left offset calculations, defaults to Document
            scrollableContainer = angular.element($document[0].querySelector(scope.sortableScope.options.scrollableContainer)).length > 0 ?
              $document[0].querySelector(scope.sortableScope.options.scrollableContainer) : $document[0].documentElement;

            containment = (scope.sortableScope.options.containment)? $helper.findAncestor(element, scope.sortableScope.options.containment):angular.element($document[0].body);
            //capture mouse move on containment.
            containment.css('cursor', 'move');
            containment.css('cursor', '-webkit-grabbing');
            containment.css('cursor', '-moz-grabbing');
            containment.addClass('as-sortable-un-selectable');

            // container positioning
            containerPositioning = scope.sortableScope.options.containerPositioning || 'absolute';

            dragItemInfo = $helper.dragItem(scope);
            tagName = scope.itemScope.element.prop('tagName');

            dragElement = angular.element($document[0].createElement(scope.sortableScope.element.prop('tagName')))
              .addClass(scope.sortableScope.element.attr('class')).addClass(sortableConfig.dragClass);
            dragElement.css('width', $helper.width(scope.itemScope.element) + 'px');
            dragElement.css('height', $helper.height(scope.itemScope.element) + 'px');

            placeHolder = createPlaceholder(scope.itemScope)
              .addClass(sortableConfig.placeHolderClass).addClass(scope.sortableScope.options.additionalPlaceholderClass);
            placeHolder.css('width', $helper.width(scope.itemScope.element) + 'px');
            placeHolder.css('height', $helper.height(scope.itemScope.element) + 'px');

            placeElement = angular.element($document[0].createElement(tagName));
            if (sortableConfig.hiddenClass) {
              placeElement.addClass(sortableConfig.hiddenClass);
            }

            itemPosition = $helper.positionStarted(eventObj, scope.itemScope.element, scrollableContainer);
            //fill the immediate vacuum.
            if (!scope.itemScope.sortableScope.options.clone) {
              scope.itemScope.element.after(placeHolder);
            }

            //hidden place element in original position.
            scope.itemScope.element.after(placeElement);

            if (scope.itemScope.sortableScope.options.clone) {
              // clone option is true, so clone the element.
              dragElement.append(scope.itemScope.element.clone());
            }
            else {
              // Not cloning, so use the original element.
              dragElement.append(scope.itemScope.element);
            }

            containment.append(dragElement);
            $helper.movePosition(eventObj, dragElement, itemPosition, containment, containerPositioning, scrollableContainer);

            scope.sortableScope.$apply(function () {
              scope.callbacks.dragStart(dragItemInfo.eventArgs());
            });
            bindEvents();
          };

          /**
           * Allow Drag if it is a proper item-handle element.
           *
           * @param event - the event object.
           * @return boolean - true if element is draggable.
           */
          isDraggable = function (event) {

            var elementClicked, sourceScope, isDraggable;

            elementClicked = angular.element(event.target);

            // look for the handle on the current scope or parent scopes
            sourceScope = fetchScope(elementClicked);

            isDraggable = (sourceScope && sourceScope.type === 'handle');

            //If a 'no-drag' element inside item-handle if any.
            while (isDraggable && elementClicked[0] !== element[0]) {
              if ($helper.noDrag(elementClicked)) {
                isDraggable = false;
              }
              elementClicked = elementClicked.parent();
            }
            return isDraggable;
          };

          /**
           * Inserts the placeHolder in to the targetScope.
           *
           * @param targetElement the target element
           * @param targetScope the target scope
           */
          function insertBefore(targetElement, targetScope) {
            // Ensure the placeholder is visible in the target (unless it's a table row)
            if (placeHolder.css('display') !== 'table-row') {
              placeHolder.css('display', 'block');
            }
            if (!targetScope.sortableScope.options.clone) {
              targetElement[0].parentNode.insertBefore(placeHolder[0], targetElement[0]);
              dragItemInfo.moveTo(targetScope.sortableScope, targetScope.index());
            }
          }

          /**
           * Inserts the placeHolder next to the targetScope.
           *
           * @param targetElement the target element
           * @param targetScope the target scope
           */
          function insertAfter(targetElement, targetScope) {
            // Ensure the placeholder is visible in the target (unless it's a table row)
            if (placeHolder.css('display') !== 'table-row') {
              placeHolder.css('display', 'block');
            }
            if (!targetScope.sortableScope.options.clone) {
              targetElement.after(placeHolder);
              dragItemInfo.moveTo(targetScope.sortableScope, targetScope.index() + 1);
            }
          }

          /**
           * Triggered when drag is moving.
           *
           * @param event - the event object.
           */
          dragMove = function (event) {

            var eventObj, targetX, targetY, targetScope, targetElement;

            if (hasTouch && $helper.isTouchInvalid(event)) {
              return;
            }
            // Ignore event if not handled
            if (!dragHandled) {
              return;
            }
            if (dragElement) {

              event.preventDefault();

              eventObj = $helper.eventObj(event);

              // checking if dragMove callback exists, to prevent application
              // rerenderings on each mouse move event
              if (scope.callbacks.dragMove !== angular.noop) {
                scope.sortableScope.$apply(function () {
                  scope.callbacks.dragMove(itemPosition, containment, eventObj);
                });
              }

              $helper.movePosition(eventObj, dragElement, itemPosition, containment, containerPositioning, scrollableContainer);

              targetX = eventObj.pageX - $document[0].documentElement.scrollLeft;
              targetY = eventObj.pageY - ($window.pageYOffset || $document[0].documentElement.scrollTop);

              //IE fixes: hide show element, call element from point twice to return pick correct element.
              dragElement.addClass(sortableConfig.hiddenClass);
              $document[0].elementFromPoint(targetX, targetY);
              targetElement = angular.element($document[0].elementFromPoint(targetX, targetY));
              dragElement.removeClass(sortableConfig.hiddenClass);

              //Set Class as dragging starts
              dragElement.addClass(sortableConfig.dragging);

              targetScope = fetchScope(targetElement);

              if (!targetScope || !targetScope.type) {
                return;
              }
              if (targetScope.type === 'handle') {
                targetScope = targetScope.itemScope;
              }
              if (targetScope.type !== 'item' && targetScope.type !== 'sortable') {
                return;
              }

              if (targetScope.type === 'item' && targetScope.accept(scope, targetScope.sortableScope, targetScope)) {
                // decide where to insert placeholder based on target element and current placeholder if is present
                targetElement = targetScope.element;

                var placeholderIndex = placeHolderIndex(targetScope.sortableScope.element);
                if (placeholderIndex < 0) {
                  insertBefore(targetElement, targetScope);
                } else {
                  if (placeholderIndex <= targetScope.index()) {
                    insertAfter(targetElement, targetScope);
                  } else {
                    insertBefore(targetElement, targetScope);
                  }
                }
              }

              if (targetScope.type === 'sortable') {//sortable scope.
                if (targetScope.accept(scope, targetScope) &&
                  !isParent(targetScope.element[0], targetElement[0])) {
                  //moving over sortable bucket. not over item.
                  if (!isPlaceHolderPresent(targetElement) && !targetScope.options.clone) {
                    targetElement[0].appendChild(placeHolder[0]);
                    dragItemInfo.moveTo(targetScope, targetScope.modelValue.length);
                  }
                }
              }
            }
          };


          /**
           * Fetch scope from element or parents
           * @param  {object} element Source element
           * @return {object}         Scope, or null if not found
           */
          function fetchScope(element) {
            var scope;
            while (!scope && element.length) {
              scope = element.data('_scope');
              if (!scope) {
                element = element.parent();
              }
            }
            return scope;
          }


          /**
           * Get position of place holder among item elements in itemScope.
           * @param targetElement the target element to check with.
           * @returns {*} -1 if placeholder is not present, index if yes.
           */
          placeHolderIndex = function (targetElement) {
            var itemElements, i;
            // targetElement is placeHolder itself, return index 0
            if (targetElement.hasClass(sortableConfig.placeHolderClass)){
              return 0;
            }
            // find index in target children
            itemElements = targetElement.children();
            for (i = 0; i < itemElements.length; i += 1) {
              //TODO may not be accurate when elements contain other siblings than item elements
              //solve by adding 1 to model index of previous item element
              if (angular.element(itemElements[i]).hasClass(sortableConfig.placeHolderClass)) {
                return i;
              }
            }
            return -1;
          };


          /**
           * Check there is no place holder placed by itemScope.
           * @param targetElement the target element to check with.
           * @returns {*} true if place holder present.
           */
          isPlaceHolderPresent = function (targetElement) {
            return placeHolderIndex(targetElement) >= 0;
          };

          /**
           * Rollback the drag data changes.
           */

          function rollbackDragChanges() {
            placeElement.replaceWith(scope.itemScope.element);
            placeHolder.remove();
            dragElement.remove();
            dragElement = null;
            dragHandled = false;
            containment.css('cursor', '');
            containment.removeClass('as-sortable-un-selectable');
          }

          /**
           * triggered while drag ends.
           *
           * @param event - the event object.
           */
          dragEnd = function (event) {
            // Ignore event if not handled
            if (!dragHandled) {
              return;
            }
            event.preventDefault();
            if (dragElement) {
              //rollback all the changes.
              rollbackDragChanges();
              // update model data
              dragItemInfo.apply();
              scope.sortableScope.$apply(function () {
                if (dragItemInfo.isSameParent()) {
                  if (dragItemInfo.isOrderChanged()) {
                    scope.callbacks.orderChanged(dragItemInfo.eventArgs());
                  }
                } else {
                  scope.callbacks.itemMoved(dragItemInfo.eventArgs());
                }
              });
              scope.sortableScope.$apply(function () {
                scope.callbacks.dragEnd(dragItemInfo.eventArgs());
              });
              dragItemInfo = null;
            }
            unBindEvents();
          };

          /**
           * triggered while drag is cancelled.
           *
           * @param event - the event object.
           */
          dragCancel = function (event) {
            // Ignore event if not handled
            if (!dragHandled) {
              return;
            }
            event.preventDefault();

            if (dragElement) {
              //rollback all the changes.
              rollbackDragChanges();
              scope.sortableScope.$apply(function () {
                scope.callbacks.dragCancel(dragItemInfo.eventArgs());
              });
              dragItemInfo = null;
            }
            unBindEvents();
          };

          /**
           * Binds the drag start events.
           */
          bindDrag = function () {
            element.bind('touchstart', dragListen);
            element.bind('mousedown', dragListen);
          };

          /**
           * Unbinds the drag start events.
           */
          unbindDrag = function () {
            element.unbind('touchstart', dragListen);
            element.unbind('mousedown', dragListen);
          };

          //bind drag start events.
          bindDrag();

          //Cancel drag on escape press.
          escapeListen = function (event) {
            if (event.keyCode === 27) {
              dragCancel(event);
            }
          };
          angular.element($document[0].body).bind('keydown', escapeListen);

          /**
           * Binds the events based on the actions.
           */
          bindEvents = function () {
            angular.element($document).bind('touchmove', dragMove);
            angular.element($document).bind('touchend', dragEnd);
            angular.element($document).bind('touchcancel', dragCancel);
            angular.element($document).bind('mousemove', dragMove);
            angular.element($document).bind('mouseup', dragEnd);
          };

          /**
           * Un binds the events for drag support.
           */
          unBindEvents = function () {
            angular.element($document).unbind('touchend', dragEnd);
            angular.element($document).unbind('touchcancel', dragCancel);
            angular.element($document).unbind('touchmove', dragMove);
            angular.element($document).unbind('mouseup', dragEnd);
            angular.element($document).unbind('mousemove', dragMove);
          };
        }
      };
    }]);
}());

/*jshint indent: 2 */
/*global angular: false */

(function () {

  'use strict';
  var mainModule = angular.module('as.sortable');

  /**
   * Controller for sortable item.
   *
   * @param $scope - drag item scope
   */
  mainModule.controller('as.sortable.sortableItemController', ['$scope', function ($scope) {

    this.scope = $scope;

    $scope.sortableScope = null;
    $scope.modelValue = null; // sortable item.
    $scope.type = 'item';

    /**
     * returns the index of the drag item from the sortable list.
     *
     * @returns {*} - index value.
     */
    $scope.index = function () {
      return $scope.$index;
    };

    /**
     * Returns the item model data.
     *
     * @returns {*} - item model value.
     */
    $scope.itemData = function () {
      return $scope.sortableScope.modelValue[$scope.$index];
    };

  }]);

  /**
   * sortableItem directive.
   */
  mainModule.directive('asSortableItem', ['sortableConfig',
    function (sortableConfig) {
      return {
        require: ['^asSortable', '?ngModel'],
        restrict: 'A',
        controller: 'as.sortable.sortableItemController',
        link: function (scope, element, attrs, ctrl) {
          var sortableController = ctrl[0];
          var ngModelController = ctrl[1];
          if (sortableConfig.itemClass) {
            element.addClass(sortableConfig.itemClass);
          }
          scope.sortableScope = sortableController.scope;
          if (ngModelController) {
            ngModelController.$render = function () {
              scope.modelValue = ngModelController.$modelValue;
            };
          } else {
            scope.modelValue = sortableController.scope.modelValue[scope.$index];
          }
          scope.element = element;
          element.data('_scope',scope); // #144, work with angular debugInfoEnabled(false)
        }
      };
    }]);

}());
