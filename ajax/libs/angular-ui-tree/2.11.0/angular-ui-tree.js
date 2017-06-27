/**
 * @license Angular UI Tree v2.11.0
 * (c) 2010-2015. https://github.com/angular-ui-tree/angular-ui-tree
 * License: MIT
 */
(function () {
  'use strict';

  angular.module('ui.tree', [])
    .constant('treeConfig', {
      treeClass: 'angular-ui-tree',
      emptyTreeClass: 'angular-ui-tree-empty',
      hiddenClass: 'angular-ui-tree-hidden',
      nodesClass: 'angular-ui-tree-nodes',
      nodeClass: 'angular-ui-tree-node',
      handleClass: 'angular-ui-tree-handle',
      placeholderClass: 'angular-ui-tree-placeholder',
      dragClass: 'angular-ui-tree-drag',
      dragThreshold: 3,
      levelThreshold: 30
    });

})();

(function () {
  'use strict';

  angular.module('ui.tree')

    .controller('TreeHandleController', ['$scope', '$element',
      function ($scope, $element) {
        this.scope = $scope;

        $scope.$element = $element;
        $scope.$nodeScope = null;
        $scope.$type = 'uiTreeHandle';

      }
    ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')
    .controller('TreeNodeController', ['$scope', '$element',
      function ($scope, $element) {
        this.scope = $scope;

        $scope.$element = $element;
        $scope.$modelValue = null; // Model value for node;
        $scope.$parentNodeScope = null; // uiTreeNode Scope of parent node;
        $scope.$childNodesScope = null; // uiTreeNodes Scope of child nodes.
        $scope.$parentNodesScope = null; // uiTreeNodes Scope of parent nodes.
        $scope.$treeScope = null; // uiTree scope
        $scope.$handleScope = null; // it's handle scope
        $scope.$type = 'uiTreeNode';
        $scope.$$apply = false;
        $scope.collapsed = false;

        $scope.init = function (controllersArr) {
          var treeNodesCtrl = controllersArr[0];
          $scope.$treeScope = controllersArr[1] ? controllersArr[1].scope : null;

          // find the scope of it's parent node
          $scope.$parentNodeScope = treeNodesCtrl.scope.$nodeScope;
          // modelValue for current node
          $scope.$modelValue = treeNodesCtrl.scope.$modelValue[$scope.$index];
          $scope.$parentNodesScope = treeNodesCtrl.scope;
          treeNodesCtrl.scope.initSubNode($scope); // init sub nodes

          $element.on('$destroy', function () {
            treeNodesCtrl.scope.destroySubNode($scope); // destroy sub nodes
          });
        };

        $scope.index = function () {
          return $scope.$parentNodesScope.$modelValue.indexOf($scope.$modelValue);
        };

        $scope.dragEnabled = function () {
          return !($scope.$treeScope && !$scope.$treeScope.dragEnabled);
        };

        $scope.isSibling = function (targetNode) {
          return $scope.$parentNodesScope == targetNode.$parentNodesScope;
        };

        $scope.isChild = function (targetNode) {
          var nodes = $scope.childNodes();
          return nodes && nodes.indexOf(targetNode) > -1;
        };

        $scope.prev = function () {
          var index = $scope.index();
          if (index > 0) {
            return $scope.siblings()[index - 1];
          }
          return null;
        };

        $scope.siblings = function () {
          return $scope.$parentNodesScope.childNodes();
        };

        $scope.childNodesCount = function () {
          return $scope.childNodes() ? $scope.childNodes().length : 0;
        };

        $scope.hasChild = function () {
          return $scope.childNodesCount() > 0;
        };

        $scope.childNodes = function () {
          return $scope.$childNodesScope && $scope.$childNodesScope.$modelValue ?
            $scope.$childNodesScope.childNodes() :
            null;
        };

        $scope.accept = function (sourceNode, destIndex) {
          return $scope.$childNodesScope &&
            $scope.$childNodesScope.$modelValue &&
            $scope.$childNodesScope.accept(sourceNode, destIndex);
        };

        $scope.removeNode = function () {
          var node = $scope.remove();
          $scope.$callbacks.removed(node);
          return node;
        };

        $scope.remove = function () {
          return $scope.$parentNodesScope.removeNode($scope);
        };

        $scope.toggle = function () {
          $scope.collapsed = !$scope.collapsed;
        };

        $scope.collapse = function () {
          $scope.collapsed = true;
        };

        $scope.expand = function () {
          $scope.collapsed = false;
        };

        $scope.depth = function () {
          var parentNode = $scope.$parentNodeScope;
          if (parentNode) {
            return parentNode.depth() + 1;
          }
          return 1;
        };

        /**
        * Returns the depth of the deepest subtree under this node
        * @param scope a TreeNodesController scope object
        * @returns Depth of all nodes *beneath* this node. If scope belongs to a leaf node, the
        *   result is 0 (it has no subtree).
        */
        function countSubTreeDepth(scope) {
          var thisLevelDepth = 0,
              childNodes = scope.childNodes(),
              childNode,
              childDepth,
              i;
          if (!childNodes || childNodes.length === 0) {
            return 0;
          }
          for (i = childNodes.length - 1; i >= 0 ; i--) {
            childNode = childNodes[i],
            childDepth = 1 + countSubTreeDepth(childNode);
            thisLevelDepth = Math.max(thisLevelDepth, childDepth);
          }
          return thisLevelDepth;
        }

        $scope.maxSubDepth = function () {
          return $scope.$childNodesScope ? countSubTreeDepth($scope.$childNodesScope) : 0;
        };
      }
    ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')

    .controller('TreeNodesController', ['$scope', '$element',
      function ($scope, $element) {
        this.scope = $scope;

        $scope.$element = $element;
        $scope.$modelValue = null;
        $scope.$nodeScope = null; // the scope of node which the nodes belongs to
        $scope.$treeScope = null;
        $scope.$type = 'uiTreeNodes';
        $scope.$nodesMap = {};

        $scope.nodropEnabled = false;
        $scope.maxDepth = 0;
        $scope.cloneEnabled = false;

        $scope.initSubNode = function (subNode) {
          if (!subNode.$modelValue) {
            return null;
          }
          $scope.$nodesMap[subNode.$modelValue.$$hashKey] = subNode;
        };

        $scope.destroySubNode = function (subNode) {
          if (!subNode.$modelValue) {
            return null;
          }
          $scope.$nodesMap[subNode.$modelValue.$$hashKey] = null;
        };

        $scope.accept = function (sourceNode, destIndex) {
          return $scope.$treeScope.$callbacks.accept(sourceNode, $scope, destIndex);
        };

        $scope.beforeDrag = function (sourceNode) {
          return $scope.$treeScope.$callbacks.beforeDrag(sourceNode);
        };

        $scope.isParent = function (node) {
          return node.$parentNodesScope == $scope;
        };

        $scope.hasChild = function () {
          return $scope.$modelValue.length > 0;
        };

        $scope.safeApply = function (fn) {
          var phase = this.$root.$$phase;
          if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };

        $scope.removeNode = function (node) {
          var index = $scope.$modelValue.indexOf(node.$modelValue);
          if (index > -1) {
            $scope.safeApply(function () {
              $scope.$modelValue.splice(index, 1)[0];
            });
            return node;
          }
          return null;
        };

        $scope.insertNode = function (index, nodeData) {
          $scope.safeApply(function () {
            $scope.$modelValue.splice(index, 0, nodeData);
          });
        };

        $scope.childNodes = function () {
          var i, nodes = [];
          if ($scope.$modelValue) {
            for (i = 0; i < $scope.$modelValue.length; i++) {
              nodes.push($scope.$nodesMap[$scope.$modelValue[i].$$hashKey]);
            }
          }
          return nodes;
        };

        $scope.depth = function () {
          if ($scope.$nodeScope) {
            return $scope.$nodeScope.depth();
          }
          return 0; // if it has no $nodeScope, it's root
        };

        // check if depth limit has reached
        $scope.outOfDepth = function (sourceNode) {
          var maxDepth = $scope.maxDepth || $scope.$treeScope.maxDepth;
          if (maxDepth > 0) {
            return $scope.depth() + sourceNode.maxSubDepth() + 1 > maxDepth;
          }
          return false;
        };

      }
    ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')

    .controller('TreeController', ['$scope', '$element',
      function ($scope, $element) {
        this.scope = $scope;

        $scope.$element = $element;
        $scope.$nodesScope = null; // root nodes
        $scope.$type = 'uiTree';
        $scope.$emptyElm = null;
        $scope.$callbacks = null;

        $scope.dragEnabled = true;
        $scope.emptyPlaceholderEnabled = true;
        $scope.maxDepth = 0;
        $scope.dragDelay = 0;
        $scope.cloneEnabled = false;
        $scope.nodropEnabled = false;

        // Check if it's a empty tree
        $scope.isEmpty = function () {
          return ($scope.$nodesScope && $scope.$nodesScope.$modelValue
          && $scope.$nodesScope.$modelValue.length === 0);
        };

        // add placeholder to empty tree
        $scope.place = function (placeElm) {
          $scope.$nodesScope.$element.append(placeElm);
          $scope.$emptyElm.remove();
        };

        this.resetEmptyElement = function () {
          if ((!$scope.$nodesScope.$modelValue || $scope.$nodesScope.$modelValue.length === 0) &&
            $scope.emptyPlaceholderEnabled) {
            $element.append($scope.$emptyElm);
          } else {
            $scope.$emptyElm.remove();
          }
        };

        $scope.resetEmptyElement = this.resetEmptyElement;

        var collapseOrExpand = function (scope, collapsed) {
          var i, subScope,
              nodes = scope.childNodes();
          for (i = 0; i < nodes.length; i++) {
            collapsed ? nodes[i].collapse() : nodes[i].expand();
            subScope = nodes[i].$childNodesScope;
            if (subScope) {
              collapseOrExpand(subScope, collapsed);
            }
          }
        };

        $scope.collapseAll = function () {
          collapseOrExpand($scope.$nodesScope, true);
        };

        $scope.expandAll = function () {
          collapseOrExpand($scope.$nodesScope, false);
        };

      }
    ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')
    .directive('uiTree', ['treeConfig', '$window',
      function (treeConfig, $window) {
        return {
          restrict: 'A',
          scope: true,
          controller: 'TreeController',
          link: function (scope, element, attrs, ctrl) {
            var callbacks = {
              accept: null,
              beforeDrag: null
            },
              config = {},
              tdElm,
              $trElm,
              emptyElmColspan;

            angular.extend(config, treeConfig);
            if (config.treeClass) {
              element.addClass(config.treeClass);
            }

            if (element.prop('tagName').toLowerCase() === 'table') {
              scope.$emptyElm = angular.element($window.document.createElement('tr'));
              $trElm = element.find('tr');
              // If we can find a tr, then we can use its td children as the empty element colspan.
              if ($trElm.length > 0) {
                emptyElmColspan = angular.element($trElm).children().length;
              } else {
                // If not, by setting a huge colspan we make sure it takes full width.
                emptyElmColspan = 1000000;
              }
              tdElm = angular.element($window.document.createElement('td'))
                .attr('colspan', emptyElmColspan);
              scope.$emptyElm.append(tdElm);
            } else {
              scope.$emptyElm = angular.element($window.document.createElement('div'));
            }

            if (config.emptyTreeClass) {
              scope.$emptyElm.addClass(config.emptyTreeClass);
            }

            scope.$watch('$nodesScope.$modelValue.length', function (val) {
              if (!angular.isNumber(val)) {
                return;
              }

              ctrl.resetEmptyElement();
            }, true);

            scope.$watch(attrs.dragEnabled, function (val) {
              if ((typeof val) == 'boolean') {
                scope.dragEnabled = val;
              }
            });

            scope.$watch(attrs.emptyPlaceholderEnabled, function (val) {
              if ((typeof val) == 'boolean') {
                scope.emptyPlaceholderEnabled = val;
                ctrl.resetEmptyElement();
              }
            });

            scope.$watch(attrs.nodropEnabled, function (val) {
              if ((typeof val) == 'boolean') {
                scope.nodropEnabled = val;
              }
            });

            scope.$watch(attrs.cloneEnabled, function (val) {
              if ((typeof val) == 'boolean') {
                scope.cloneEnabled = val;
              }
            });

            scope.$watch(attrs.maxDepth, function (val) {
              if ((typeof val) == 'number') {
                scope.maxDepth = val;
              }
            });

            scope.$watch(attrs.dragDelay, function (val) {
              if ((typeof val) == 'number') {
                scope.dragDelay = val;
              }
            });

            // check if the dest node can accept the dragging node
            // by default, we check the 'data-nodrop-enabled' attribute in `ui-tree-nodes`
            // and the 'max-depth' attribute in `ui-tree` or `ui-tree-nodes`.
            // the method can be overrided
            callbacks.accept = function (sourceNodeScope, destNodesScope, destIndex) {
              return !(destNodesScope.nodropEnabled || destNodesScope.outOfDepth(sourceNodeScope));
            };

            callbacks.beforeDrag = function (sourceNodeScope) {
              return true;
            };

            callbacks.removed = function (node) {

            };

            callbacks.dropped = function (event) {

            };

            callbacks.dragStart = function (event) {

            };

            callbacks.dragMove = function (event) {

            };

            callbacks.dragStop = function (event) {

            };

            callbacks.beforeDrop = function (event) {

            };

            scope.$watch(attrs.uiTree, function (newVal, oldVal) {
              angular.forEach(newVal, function (value, key) {
                if (callbacks[key]) {
                  if (typeof value === 'function') {
                    callbacks[key] = value;
                  }
                }
              });

              scope.$callbacks = callbacks;
            }, true);


          }
        };
      }
    ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')
    .directive('uiTreeHandle', ['treeConfig',
      function (treeConfig) {
        return {
          require: '^uiTreeNode',
          restrict: 'A',
          scope: true,
          controller: 'TreeHandleController',
          link: function (scope, element, attrs, treeNodeCtrl) {
            var config = {};
            angular.extend(config, treeConfig);
            if (config.handleClass) {
              element.addClass(config.handleClass);
            }
            // connect with the tree node.
            if (scope != treeNodeCtrl.scope) {
              scope.$nodeScope = treeNodeCtrl.scope;
              treeNodeCtrl.scope.$handleScope = scope;
            }
          }
        };
      }
    ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')

    .directive('uiTreeNode', ['treeConfig', 'UiTreeHelper', '$window', '$document', '$timeout', '$rootElement',
      function (treeConfig, UiTreeHelper, $window, $document, $timeout, $rootElement) {
        return {
          require: ['^uiTreeNodes', '^uiTree'],
          restrict: 'A',
          controller: 'TreeNodeController',
          link: function (scope, element, attrs, controllersArr) {
            // todo startPos is unused
            var config = {},
              hasTouch = 'ontouchstart' in window,
              startPos, firstMoving, dragInfo, pos,
              placeElm, hiddenPlaceElm, dragElm,
              treeScope = null,
              elements, // As a parameter for callbacks
              dragDelaying = true,
              dragStarted = false,
              dragTimer = null,
              body = document.body,
              html = document.documentElement,
              document_height,
              document_width,
              dragStart,
              tagName,
              dragMove,
              dragEnd,
              dragStartEvent,
              dragMoveEvent,
              dragEndEvent,
              dragCancelEvent,
              dragDelay,
              bindDrag,
              keydownHandler,
              outOfBounds;
            angular.extend(config, treeConfig);
            if (config.nodeClass) {
              element.addClass(config.nodeClass);
            }
            scope.init(controllersArr);

            scope.collapsed = !!UiTreeHelper.getNodeAttribute(scope, 'collapsed');
            scope.sourceOnly = scope.nodropEnabled || scope.$treeScope.nodropEnabled;

            scope.$watch(attrs.collapsed, function (val) {
              if ((typeof val) == 'boolean') {
                scope.collapsed = val;
              }
            });

            scope.$watch('collapsed', function (val) {
              UiTreeHelper.setNodeAttribute(scope, 'collapsed', val);
              attrs.$set('collapsed', val);
            });

            dragStart = function (e) {
              if (!hasTouch && (e.button == 2 || e.which == 3)) {
                // disable right click
                return;
              }
              if (e.uiTreeDragging || (e.originalEvent && e.originalEvent.uiTreeDragging)) { // event has already fired in other scope.
                return;
              }

              // the element which is clicked.
              var eventElm = angular.element(e.target),
                eventScope = eventElm.scope(),
                cloneElm = element.clone(),
                eventElmTagName, tagName,
                eventObj, tdElm, hStyle;
              if (!eventScope || !eventScope.$type) {
                return;
              }
              if (eventScope.$type != 'uiTreeNode'
                && eventScope.$type != 'uiTreeHandle') { // Check if it is a node or a handle
                return;
              }
              if (eventScope.$type == 'uiTreeNode'
                && eventScope.$handleScope) { // If the node has a handle, then it should be clicked by the handle
                return;
              }

              eventElmTagName = eventElm.prop('tagName').toLowerCase();
              if (eventElmTagName == 'input' ||
                eventElmTagName == 'textarea' ||
                eventElmTagName == 'button' ||
                eventElmTagName == 'select') { // if it's a input or button, ignore it
                return;
              }

              // check if it or it's parents has a 'data-nodrag' attribute
              while (eventElm && eventElm[0] && eventElm[0] != element) {
                if (UiTreeHelper.nodrag(eventElm)) { // if the node mark as `nodrag`, DONOT drag it.
                  return;
                }
                eventElm = eventElm.parent();
              }

              if (!scope.beforeDrag(scope)) {
                return;
              }

              e.uiTreeDragging = true; // stop event bubbling
              if (e.originalEvent) {
                e.originalEvent.uiTreeDragging = true;
              }
              e.preventDefault();
              eventObj = UiTreeHelper.eventObj(e);

              firstMoving = true;
              dragInfo = UiTreeHelper.dragInfo(scope);

              tagName = element.prop('tagName');

              if (tagName.toLowerCase() === 'tr') {
                placeElm = angular.element($window.document.createElement(tagName));
                tdElm = angular.element($window.document.createElement('td'))
                  .addClass(config.placeholderClass)
                  .attr('colspan', element[0].children.length);
                placeElm.append(tdElm);
              } else {
                placeElm = angular.element($window.document.createElement(tagName))
                  .addClass(config.placeholderClass);
              }
              hiddenPlaceElm = angular.element($window.document.createElement(tagName));
              if (config.hiddenClass) {
                hiddenPlaceElm.addClass(config.hiddenClass);
              }

              pos = UiTreeHelper.positionStarted(eventObj, element);
              placeElm.css('height', UiTreeHelper.height(element) + 'px');

              dragElm = angular.element($window.document.createElement(scope.$parentNodesScope.$element.prop('tagName')))
                .addClass(scope.$parentNodesScope.$element.attr('class')).addClass(config.dragClass);
              dragElm.css('width', UiTreeHelper.width(element) + 'px');
              dragElm.css('z-index', 9999);

              // Prevents cursor to change rapidly in Opera 12.16 and IE when dragging an element
              hStyle = (element[0].querySelector('.angular-ui-tree-handle') || element[0]).currentStyle;
              if (hStyle) {
                document.body.setAttribute('ui-tree-cursor', $document.find('body').css('cursor') || '');
                $document.find('body').css({'cursor': hStyle.cursor + '!important'});
              }

              if (scope.sourceOnly) {
                placeElm.css('display', 'none');
              }
              element.after(placeElm);
              element.after(hiddenPlaceElm);
              if (dragInfo.isClone() && scope.sourceOnly) {
                dragElm.append(cloneElm);
              } else {
                dragElm.append(element);
              }

              $rootElement.append(dragElm);

              dragElm.css({
                'left': eventObj.pageX - pos.offsetX + 'px',
                'top': eventObj.pageY - pos.offsetY + 'px'
              });
              elements = {
                placeholder: placeElm,
                dragging: dragElm
              };

              // Fire dragStart callback
              scope.$apply(function () {
                scope.$treeScope.$callbacks.dragStart(dragInfo.eventArgs(elements, pos));
              });

              angular.element($document).bind('touchend', dragEndEvent);
              angular.element($document).bind('touchcancel', dragEndEvent);
              angular.element($document).bind('touchmove', dragMoveEvent);
              angular.element($document).bind('mouseup', dragEndEvent);
              angular.element($document).bind('mousemove', dragMoveEvent);
              angular.element($document).bind('mouseleave', dragCancelEvent);

              document_height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
              document_width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
            };

            dragMove = function (e) {
              var eventObj = UiTreeHelper.eventObj(e),
                prev,
                next,
                leftElmPos,
                topElmPos,
                top_scroll,
                bottom_scroll,
                target,
                decrease,
                targetX,
                targetY,
                displayElm,
                targetNode,
                targetElm,
                isEmpty,
                targetOffset,
                targetBefore;

              if (dragElm) {
                e.preventDefault();

                if ($window.getSelection) {
                  $window.getSelection().removeAllRanges();
                } else if ($window.document.selection) {
                  $window.document.selection.empty();
                }

                leftElmPos = eventObj.pageX - pos.offsetX;
                topElmPos = eventObj.pageY - pos.offsetY;

                //dragElm can't leave the screen on the left
                if (leftElmPos < 0) {
                  leftElmPos = 0;
                }

                //dragElm can't leave the screen on the top
                if (topElmPos < 0) {
                  topElmPos = 0;
                }

                //dragElm can't leave the screen on the bottom
                if ((topElmPos + 10) > document_height) {
                  topElmPos = document_height - 10;
                }

                //dragElm can't leave the screen on the right
                if ((leftElmPos + 10) > document_width) {
                  leftElmPos = document_width - 10;
                }

                dragElm.css({
                  'left': leftElmPos + 'px',
                  'top': topElmPos + 'px'
                });

                top_scroll = window.pageYOffset || $window.document.documentElement.scrollTop;
                bottom_scroll = top_scroll + (window.innerHeight || $window.document.clientHeight || $window.document.clientHeight);

                // to scroll down if cursor y-position is greater than the bottom position the vertical scroll
                if (bottom_scroll < eventObj.pageY && bottom_scroll <= document_height) {
                  window.scrollBy(0, 10);
                }

                // to scroll top if cursor y-position is less than the top position the vertical scroll
                if (top_scroll > eventObj.pageY) {
                  window.scrollBy(0, -10);
                }

                UiTreeHelper.positionMoved(e, pos, firstMoving);
                if (firstMoving) {
                  firstMoving = false;
                  return;
                }

                // check if add it as a child node first
                // todo decrease is unused
                decrease = (UiTreeHelper.offset(dragElm).left - UiTreeHelper.offset(placeElm).left) >= config.threshold;

                targetX = eventObj.pageX - ($window.pageXOffset ||
                  $window.document.body.scrollLeft ||
                  $window.document.documentElement.scrollLeft) -
                  ($window.document.documentElement.clientLeft || 0);

                targetY = eventObj.pageY - ($window.pageYOffset ||
                  $window.document.body.scrollTop ||
                  $window.document.documentElement.scrollTop) -
                  ($window.document.documentElement.clientTop || 0);

                // Select the drag target. Because IE does not support CSS 'pointer-events: none', it will always
                // pick the drag element itself as the target. To prevent this, we hide the drag element while
                // selecting the target.
                if (angular.isFunction(dragElm.hide)) {
                  dragElm.hide();
                } else {
                  displayElm = dragElm[0].style.display;
                  dragElm[0].style.display = 'none';
                }

                // when using elementFromPoint() inside an iframe, you have to call
                // elementFromPoint() twice to make sure IE8 returns the correct value
                $window.document.elementFromPoint(targetX, targetY);

                targetElm = angular.element($window.document.elementFromPoint(targetX, targetY));

                if (angular.isFunction(dragElm.show)) {
                  dragElm.show();
                } else {
                  dragElm[0].style.display = displayElm;
                }

                outOfBounds = !targetElm.scope() || !(targetElm.scope().$type);

                // Detect out of bounds condition, update drop target display, and prevent drop
                if (outOfBounds) {

                  // Remove the placeholder
                  placeElm.remove();

                  // If the target was an empty tree, replace the empty element placeholder
                  if (treeScope) {
                    treeScope.resetEmptyElement();
                    treeScope = null;
                  }
                }

                // move horizontal
                if (pos.dirAx && pos.distAxX >= config.levelThreshold) {
                  pos.distAxX = 0;

                  // increase horizontal level if previous sibling exists and is not collapsed
                  if (pos.distX > 0) {
                    prev = dragInfo.prev();
                    if (prev && !prev.collapsed
                      && prev.accept(scope, prev.childNodesCount())) {
                      prev.$childNodesScope.$element.append(placeElm);
                      dragInfo.moveTo(prev.$childNodesScope, prev.childNodes(), prev.childNodesCount());
                    }
                  }

                  // decrease horizontal level
                  if (pos.distX < 0) {
                    // we can't decrease a level if an item preceeds the current one
                    next = dragInfo.next();
                    if (!next) {
                      target = dragInfo.parentNode(); // As a sibling of it's parent node
                      if (target
                        && target.$parentNodesScope.accept(scope, target.index() + 1)) {
                        target.$element.after(placeElm);
                        dragInfo.moveTo(target.$parentNodesScope, target.siblings(), target.index() + 1);
                      }
                    }
                  }
                }

                // move vertical
                if (!pos.dirAx) {
                  // check it's new position
                  targetNode = targetElm.scope();
                  isEmpty = false;
                  if (!targetNode) {
                    return;
                  }

                  // Show the placeholder if it was hidden for nodrop-enabled and this is a new tree
                  if (targetNode.$treeScope && !targetNode.$parent.nodropEnabled && !targetNode.$treeScope.nodropEnabled) {
                    placeElm.css('display', '');
                  }

                  if (targetNode.$type == 'uiTree' && targetNode.dragEnabled) {
                    isEmpty = targetNode.isEmpty(); // Check if it's empty tree
                  }

                  if (targetNode.$type == 'uiTreeHandle') {
                    targetNode = targetNode.$nodeScope;
                  }

                  if (targetNode.$type != 'uiTreeNode'
                    && !isEmpty) { // Check if it is a uiTreeNode or it's an empty tree
                    return;
                  }

                  // if placeholder move from empty tree, reset it.
                  if (treeScope && placeElm.parent()[0] != treeScope.$element[0]) {
                    treeScope.resetEmptyElement();
                    treeScope = null;
                  }

                  if (isEmpty) { // it's an empty tree
                    treeScope = targetNode;
                    if (targetNode.$nodesScope.accept(scope, 0)) {
                      targetNode.place(placeElm);
                      dragInfo.moveTo(targetNode.$nodesScope, targetNode.$nodesScope.childNodes(), 0);
                    }
                  } else if (targetNode.dragEnabled()) { // drag enabled
                    targetElm = targetNode.$element; // Get the element of ui-tree-node
                    targetOffset = UiTreeHelper.offset(targetElm);
                    targetBefore = targetNode.horizontal ? eventObj.pageX < (targetOffset.left + UiTreeHelper.width(targetElm) / 2)
                      : eventObj.pageY < (targetOffset.top + UiTreeHelper.height(targetElm) / 2);

                    if (targetNode.$parentNodesScope.accept(scope, targetNode.index())) {
                      if (targetBefore) {
                        targetElm[0].parentNode.insertBefore(placeElm[0], targetElm[0]);
                        dragInfo.moveTo(targetNode.$parentNodesScope, targetNode.siblings(), targetNode.index());
                      } else {
                        targetElm.after(placeElm);
                        dragInfo.moveTo(targetNode.$parentNodesScope, targetNode.siblings(), targetNode.index() + 1);
                      }
                    } else if (!targetBefore && targetNode.accept(scope, targetNode.childNodesCount())) { // we have to check if it can add the dragging node as a child
                      targetNode.$childNodesScope.$element.append(placeElm);
                      dragInfo.moveTo(targetNode.$childNodesScope, targetNode.childNodes(), targetNode.childNodesCount());
                    } else {
                      outOfBounds = true;
                    }
                  }
                }

                scope.$apply(function () {
                  scope.$treeScope.$callbacks.dragMove(dragInfo.eventArgs(elements, pos));
                });
              }
            };

            dragEnd = function (e) {

              e.preventDefault();

              if (dragElm) {
                scope.$treeScope.$apply(function () {
                  scope.$treeScope.$callbacks.beforeDrop(dragInfo.eventArgs(elements, pos));
                });
                // roll back elements changed
                hiddenPlaceElm.replaceWith(element);
                placeElm.remove();

                dragElm.remove();
                dragElm = null;
                if (scope.$$apply && !outOfBounds) {
                  scope.$treeScope.$apply(function () {
                    dragInfo.apply();
                    scope.$treeScope.$callbacks.dropped(dragInfo.eventArgs(elements, pos));
                  });
                } else {
                  bindDrag();
                }
                scope.$treeScope.$apply(function () {
                  scope.$treeScope.$callbacks.dragStop(dragInfo.eventArgs(elements, pos));
                });
                scope.$$apply = false;
                dragInfo = null;
              }

              // Restore cursor in Opera 12.16 and IE
              var oldCur = document.body.getAttribute('ui-tree-cursor');
              if (oldCur !== null) {
                $document.find('body').css({'cursor': oldCur});
                document.body.removeAttribute('ui-tree-cursor');
              }

              angular.element($document).unbind('touchend', dragEndEvent); // Mobile
              angular.element($document).unbind('touchcancel', dragEndEvent); // Mobile
              angular.element($document).unbind('touchmove', dragMoveEvent); // Mobile
              angular.element($document).unbind('mouseup', dragEndEvent);
              angular.element($document).unbind('mousemove', dragMoveEvent);
              angular.element($window.document.body).unbind('mouseleave', dragCancelEvent);
            };

            dragStartEvent = function (e) {
              if (scope.dragEnabled()) {
                dragStart(e);
              }
            };

            dragMoveEvent = function (e) {
              dragMove(e);
            };

            dragEndEvent = function (e) {
              scope.$$apply = true;
              dragEnd(e);
            };

            dragCancelEvent = function (e) {
              dragEnd(e);
            };

            dragDelay = (function () {
              var to;

              return {
                exec: function (fn, ms) {
                  if (!ms) {
                    ms = 0;
                  }
                  this.cancel();
                  to = $timeout(fn, ms);
                },
                cancel: function () {
                  $timeout.cancel(to);
                }
              };
            })();

            bindDrag = function () {
              element.bind('touchstart mousedown', function (e) {
                dragDelay.exec(function () {
                  dragStartEvent(e);
                }, scope.dragDelay || 0);
              });
              element.bind('touchend touchcancel mouseup', function () {
                dragDelay.cancel();
              });
            };
            bindDrag();

            keydownHandler = function (e) {
              if (e.keyCode == 27) {
                scope.$$apply = false;
                dragEnd(e);
              }
            };

            angular.element($window.document.body).bind('keydown', keydownHandler);

            //unbind handler that retains scope
            scope.$on('$destroy', function () {
              angular.element($window.document.body).unbind('keydown', keydownHandler);
            });
          }
        };
      }
    ]);

})();

(function () {
  'use strict';

  angular.module('ui.tree')
    .directive('uiTreeNodes', ['treeConfig', '$window',
      function (treeConfig) {
        return {
          require: ['ngModel', '?^uiTreeNode', '^uiTree'],
          restrict: 'A',
          scope: true,
          controller: 'TreeNodesController',
          link: function (scope, element, attrs, controllersArr) {

            var config = {},
                ngModel = controllersArr[0],
                treeNodeCtrl = controllersArr[1],
                treeCtrl = controllersArr[2];

            angular.extend(config, treeConfig);
            if (config.nodesClass) {
              element.addClass(config.nodesClass);
            }

            if (treeNodeCtrl) {
              treeNodeCtrl.scope.$childNodesScope = scope;
              scope.$nodeScope = treeNodeCtrl.scope;
            } else {
              // find the root nodes if there is no parent node and have a parent ui-tree
              treeCtrl.scope.$nodesScope = scope;
            }
            scope.$treeScope = treeCtrl.scope;

            if (ngModel) {
              ngModel.$render = function () {
                scope.$modelValue = ngModel.$modelValue;
              };
            }

            scope.$watch(attrs.maxDepth, function (val) {
              if ((typeof val) == 'number') {
                scope.maxDepth = val;
              }
            });

            scope.$watch(function () {
              return attrs.nodropEnabled;
            }, function (newVal) {
              if ((typeof newVal) != 'undefined') {
                scope.nodropEnabled = true;
              }
            }, true);

            attrs.$observe('horizontal', function (val) {
              scope.horizontal = ((typeof val) != 'undefined');
            });

          }
        };
      }
    ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')

  /**
   * @ngdoc service
   * @name ui.tree.service:UiTreeHelper
   * @requires ng.$document
   * @requires ng.$window
   *
   * @description
   * angular-ui-tree.
   */
    .factory('UiTreeHelper', ['$document', '$window',
      function ($document, $window) {
        return {

          /**
           * A hashtable used to storage data of nodes
           * @type {Object}
           */
          nodesData: {},

          setNodeAttribute: function (scope, attrName, val) {
            if (!scope.$modelValue) {
              return null;
            }
            var data = this.nodesData[scope.$modelValue.$$hashKey];
            if (!data) {
              data = {};
              this.nodesData[scope.$modelValue.$$hashKey] = data;
            }
            data[attrName] = val;
          },

          getNodeAttribute: function (scope, attrName) {
            if (!scope.$modelValue) {
              return null;
            }
            var data = this.nodesData[scope.$modelValue.$$hashKey];
            if (data) {
              return data[attrName];
            }
            return null;
          },

          /**
           * @ngdoc method
           * @methodOf ui.tree.service:$nodrag
           * @param  {Object} targetElm angular element
           * @return {Bool} check if the node can be dragged.
           */
          nodrag: function (targetElm) {
            if (typeof targetElm.attr('data-nodrag') != 'undefined') {
              return targetElm.attr('data-nodrag') !== 'false';
            }
            return false;
          },

          /**
           * get the event object for touches
           * @param  {[type]} e [description]
           * @return {[type]}   [description]
           */
          eventObj: function (e) {
            var obj = e;
            if (e.targetTouches !== undefined) {
              obj = e.targetTouches.item(0);
            } else if (e.originalEvent !== undefined && e.originalEvent.targetTouches !== undefined) {
              obj = e.originalEvent.targetTouches.item(0);
            }
            return obj;
          },

          dragInfo: function (node) {
            return {
              source: node,
              sourceInfo: {
                cloneModel: node.$treeScope.cloneEnabled === true ? angular.copy(node.$modelValue) : undefined,
                nodeScope: node,
                index: node.index(),
                nodesScope: node.$parentNodesScope
              },
              index: node.index(),
              siblings: node.siblings().slice(0),
              parent: node.$parentNodesScope,

              // Move the node to a new position
              moveTo: function (parent, siblings, index) {
                this.parent = parent;
                this.siblings = siblings.slice(0);

                // If source node is in the target nodes
                var i = this.siblings.indexOf(this.source);
                if (i > -1) {
                  this.siblings.splice(i, 1);
                  if (this.source.index() < index) {
                    index--;
                  }
                }

                this.siblings.splice(index, 0, this.source);
                this.index = index;
              },

              parentNode: function () {
                return this.parent.$nodeScope;
              },

              prev: function () {
                if (this.index > 0) {
                  return this.siblings[this.index - 1];
                }

                return null;
              },

              next: function () {
                if (this.index < this.siblings.length - 1) {
                  return this.siblings[this.index + 1];
                }

                return null;
              },

              isClone: function () {
                return this.source.$treeScope.cloneEnabled === true;
              },

              clonedNode: function (node) {
                return angular.copy(node);
              },

              isDirty: function () {
                return this.source.$parentNodesScope != this.parent ||
                  this.source.index() != this.index;
              },

              isForeign: function () {
                return this.source.$treeScope !== this.parent.$treeScope;
              },

              eventArgs: function (elements, pos) {
                return {
                  source: this.sourceInfo,
                  dest: {
                    index: this.index,
                    nodesScope: this.parent
                  },
                  elements: elements,
                  pos: pos
                };
              },

              apply: function () {

                var nodeData = this.source.$modelValue;

                // nodrop enabled on tree or parent
                if (this.parent.nodropEnabled || this.parent.$treeScope.nodropEnabled) {
                  return;
                }

                // node was dropped in the same place - do nothing
                if (!this.isDirty()) {
                  return;
                }

                // cloneEnabled and cross-tree so copy and do not remove from source
                if (this.isClone() && this.isForeign()) {
                  this.parent.insertNode(this.index, angular.copy(nodeData));
                } else { // Any other case, remove and reinsert
                  this.source.remove();
                  this.parent.insertNode(this.index, nodeData);
                }
              }
            };
          },

          /**
           * @ngdoc method
           * @name ui.tree#height
           * @methodOf ui.tree.service:UiTreeHelper
           *
           * @description
           * Get the height of an element.
           *
           * @param {Object} element Angular element.
           * @returns {String} Height
           */
          height: function (element) {
            return element.prop('scrollHeight');
          },

          /**
           * @ngdoc method
           * @name ui.tree#width
           * @methodOf ui.tree.service:UiTreeHelper
           *
           * @description
           * Get the width of an element.
           *
           * @param {Object} element Angular element.
           * @returns {String} Width
           */
          width: function (element) {
            return element.prop('scrollWidth');
          },

          /**
           * @ngdoc method
           * @name ui.tree#offset
           * @methodOf ui.nestedSortable.service:UiTreeHelper
           *
           * @description
           * Get the offset values of an element.
           *
           * @param {Object} element Angular element.
           * @returns {Object} Object with properties width, height, top and left
           */
          offset: function (element) {
            var boundingClientRect = element[0].getBoundingClientRect();

            return {
              width: element.prop('offsetWidth'),
              height: element.prop('offsetHeight'),
              top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop || $document[0].documentElement.scrollTop),
              left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft || $document[0].documentElement.scrollLeft)
            };
          },

          /**
           * @ngdoc method
           * @name ui.tree#positionStarted
           * @methodOf ui.tree.service:UiTreeHelper
           *
           * @description
           * Get the start position of the target element according to the provided event properties.
           *
           * @param {Object} e Event
           * @param {Object} target Target element
           * @returns {Object} Object with properties offsetX, offsetY, startX, startY, nowX and dirX.
           */
          positionStarted: function (e, target) {
            var pos = {},
              pageX = e.pageX,
              pageY = e.pageY;

            if (e.originalEvent && e.originalEvent.touches && (e.originalEvent.touches.length > 0)) {
              pageX = e.originalEvent.touches[0].pageX;
              pageY = e.originalEvent.touches[0].pageY;
            }
            pos.offsetX = pageX - this.offset(target).left;
            pos.offsetY = pageY - this.offset(target).top;
            pos.startX = pos.lastX = pageX;
            pos.startY = pos.lastY = pageY;
            pos.nowX = pos.nowY = pos.distX = pos.distY = pos.dirAx = 0;
            pos.dirX = pos.dirY = pos.lastDirX = pos.lastDirY = pos.distAxX = pos.distAxY = 0;
            return pos;
          },

          positionMoved: function (e, pos, firstMoving) {
            var pageX = e.pageX,
              pageY = e.pageY,
              newAx;
            if (e.originalEvent && e.originalEvent.touches && (e.originalEvent.touches.length > 0)) {
              pageX = e.originalEvent.touches[0].pageX;
              pageY = e.originalEvent.touches[0].pageY;
            }
            // mouse position last events
            pos.lastX = pos.nowX;
            pos.lastY = pos.nowY;

            // mouse position this events
            pos.nowX = pageX;
            pos.nowY = pageY;

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
            newAx = Math.abs(pos.distX) > Math.abs(pos.distY) ? 1 : 0;

            // do nothing on first move
            if (firstMoving) {
              pos.dirAx = newAx;
              pos.moving = true;
              return;
            }

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
          }
        };
      }

    ]);

})();
