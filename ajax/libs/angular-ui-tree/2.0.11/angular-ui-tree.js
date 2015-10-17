/**
 * @license Angular UI Tree v2.0.11
 * (c) 2010-2014. https://github.com/JimLiu/angular-ui-tree
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
      placeHolderClass: 'angular-ui-tree-placeholder',
      dragClass: 'angular-ui-tree-drag',
      dragThreshold: 3,
      levelThreshold: 30
    });

})();

(function () {
  'use strict';

  angular.module('ui.tree')

   /**
    * @ngdoc service
    * @name ui.tree.service:$helper
    * @requires ng.$document
    * @requires ng.$window
    *
    * @description
    * angular-ui-tree.
    */
    .factory('$uiTreeHelper', ['$document', '$window',
      function ($document, $window) {
        return {

          /**
           * A hashtable used to storage data of nodes
           * @type {Object}
           */
          nodesData: {
          },

          setNodeAttribute: function(scope, attrName, val) {
            var data = this.nodesData[scope.$modelValue.$$hashKey];
            if (!data) {
              data = {};
              this.nodesData[scope.$modelValue.$$hashKey] = data;
            }
            data[attrName] = val;
          },

          getNodeAttribute: function(scope, attrName) {
            var data = this.nodesData[scope.$modelValue.$$hashKey];
            if (data) {
              return data[attrName];
            }
            return null;
          },

          /**
           * @ngdoc method
           * @methodOf ui.tree.service:$nodrag
           * @param  {Object} angular element
           * @return {Bool} check if the node can be dragged.
           */
          nodrag: function (targetElm) {
            return (typeof targetElm.attr('data-nodrag')) != "undefined";
          },

          /**
           * get the event object for touchs
           * @param  {[type]} e [description]
           * @return {[type]}   [description]
           */
          eventObj: function(e) {
            var obj = e;
            if (e.targetTouches !== undefined) {
              obj = e.targetTouches.item(0);
            } else if (e.originalEvent !== undefined && e.originalEvent.targetTouches !== undefined) {
              obj = e.originalEvent.targetTouches.item(0);
            }
            return obj;
          },

          dragInfo: function(node) {
            return {
              source: node,
              sourceInfo: {
                nodeScope: node,
                index: node.index(),
                nodesScope: node.$parentNodesScope,
              },
              index: node.index(),
              siblings: node.siblings().slice(0),
              parent: node.$parentNodesScope,

              moveTo: function(parent, siblings, index) { // Move the node to a new position
                this.parent = parent;
                this.siblings = siblings.slice(0);
                var i = this.siblings.indexOf(this.source); // If source node is in the target nodes
                if (i > -1) {
                  this.siblings.splice(i, 1);
                  if (this.source.index() < index) {
                    index--;
                  }
                }
                this.siblings.splice(index, 0, this.source);
                this.index = index;
              },

              parentNode: function() {
                return this.parent.$nodeScope;
              },

              prev: function() {
                if (this.index > 0) {
                  return this.siblings[this.index - 1];
                }
                return null;
              },

              next: function() {
                if (this.index < this.siblings.length - 1) {
                  return this.siblings[this.index + 1];
                }
                return null;
              },

              isDirty: function() {
                return this.source.$parentNodesScope != this.parent ||
                        this.source.index() != this.index;
              },

              eventArgs: function(elements, pos) {
                return {
                  source: this.sourceInfo,
                  dest: {
                    index: this.index,
                    nodesScope: this.parent,
                  },
                  elements: elements,
                  pos: pos,
                };
              },

              apply: function() {
                var nodeData = this.source.$modelValue;
                this.source.remove();
                this.parent.insertNode(this.index, nodeData);
              },
            };
          },

          /**
          * @ngdoc method
          * @name hippo.theme#height
          * @methodOf ui.tree.service:$helper
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
          * @name hippo.theme#width
          * @methodOf ui.tree.service:$helper
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
          * @name hippo.theme#offset
          * @methodOf ui.nestedSortable.service:$helper
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
                left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft  || $document[0].documentElement.scrollLeft)
              };
          },

          /**
          * @ngdoc method
          * @name hippo.theme#positionStarted
          * @methodOf ui.tree.service:$helper
          *
          * @description
          * Get the start position of the target element according to the provided event properties.
          *
          * @param {Object} e Event
          * @param {Object} target Target element
          * @returns {Object} Object with properties offsetX, offsetY, startX, startY, nowX and dirX.
          */
          positionStarted: function (e, target) {
            var pos = {};
            pos.offsetX = e.pageX - this.offset(target).left;
            pos.offsetY = e.pageY - this.offset(target).top;
            pos.startX = pos.lastX = e.pageX;
            pos.startY = pos.lastY = e.pageY;
            pos.nowX = pos.nowY = pos.distX = pos.distY = pos.dirAx = 0;
            pos.dirX = pos.dirY = pos.lastDirX = pos.lastDirY = pos.distAxX = pos.distAxY = 0;
            return pos;
          },

          positionMoved: function (e, pos, firstMoving) {
            // mouse position last events
            pos.lastX = pos.nowX;
            pos.lastY = pos.nowY;

            // mouse position this events
            pos.nowX  = e.pageX;
            pos.nowY  = e.pageY;

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
            var newAx   = Math.abs(pos.distX) > Math.abs(pos.distY) ? 1 : 0;

            // do nothing on first move
            if (firstMoving) {
              pos.dirAx  = newAx;
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
(function () {
  'use strict';

  angular.module('ui.tree')

    .controller('TreeController', ['$scope', '$element', '$attrs', 'treeConfig',
      function ($scope, $element, $attrs, treeConfig) {
        this.scope = $scope;

        $scope.$element = $element;
        $scope.$nodesScope = null; // root nodes
        $scope.$type = 'uiTree';
        $scope.$emptyElm = null;
        $scope.$callbacks = null;

        $scope.dragEnabled = true;
        $scope.maxDepth = 0;
        $scope.dragDelay = 0;

        // Check if it's a empty tree
        $scope.isEmpty = function() {
          return ($scope.$nodesScope && $scope.$nodesScope.$modelValue
            && $scope.$nodesScope.$modelValue.length === 0);
        };

        // add placeholder to empty tree
        $scope.place = function(placeElm) {
          $scope.$nodesScope.$element.append(placeElm);
          $scope.$emptyElm.remove();
        };

        $scope.resetEmptyElement = function() {
          if ($scope.$nodesScope.$modelValue.length === 0) {
            $element.append($scope.$emptyElm);
          } else {
            $scope.$emptyElm.remove();
          }
        };

        var collapseOrExpand = function(scope, collapsed) {
          var nodes = scope.childNodes();
          for (var i = 0; i < nodes.length; i++) {
            collapsed ? nodes[i].collapse() : nodes[i].expand();
            var subScope = nodes[i].$childNodesScope;
            if (subScope) {
              collapseOrExpand(subScope, collapsed);
            }
          }
        };

        $scope.collapseAll = function() {
          collapseOrExpand($scope.$nodesScope, true);
        };

        $scope.expandAll = function() {
          collapseOrExpand($scope.$nodesScope, false);
        };

      }
    ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')

    .controller('TreeNodesController', ['$scope', '$element', '$timeout', 'treeConfig',
      function ($scope, $element, $timeout, treeConfig) {
        this.scope = $scope;

        $scope.$element = $element;
        $scope.$modelValue = null;
        $scope.$nodeScope = null; // the scope of node which the nodes belongs to
        $scope.$treeScope = null;
        $scope.$type = 'uiTreeNodes';
        $scope.$nodesMap = {};

        $scope.nodrop = false;
        $scope.maxDepth = 0;

        $scope.initSubNode = function(subNode) {
          $timeout(function() {
            $scope.$nodesMap[subNode.$modelValue.$$hashKey] = subNode;
          });
        };

        $scope.destroySubNode = function(subNode) {
          $scope.$nodesMap[subNode.$modelValue.$$hashKey] = null;
        };

        $scope.accept = function(sourceNode, destIndex) {
          return $scope.$treeScope.$callbacks.accept(sourceNode, $scope, destIndex);
        };

        $scope.isParent = function(node) {
          return node.$parentNodesScope == $scope;
        };

        $scope.hasChild = function() {
          return $scope.$modelValue.length > 0;
        };

        $scope.safeApply = function(fn) {
          var phase = this.$root.$$phase;
          if(phase == '$apply' || phase == '$digest') {
            if(fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            this.$apply(fn);
          }
        };

        $scope.removeNode = function(node) {
          var index = $scope.$modelValue.indexOf(node.$modelValue);
          if (index > -1) {
            $scope.safeApply(function() {
              $scope.$modelValue.splice(index, 1)[0];
            });
            return node;
          }
          return null;
        };

        $scope.insertNode = function(index, nodeData) {
          $scope.safeApply(function() {
            $scope.$modelValue.splice(index, 0, nodeData);
          });
        };

        $scope.childNodes = function() {
          var nodes = [];
          if ($scope.$modelValue) {
            for (var i = 0; i < $scope.$modelValue.length; i++) {
              nodes.push($scope.$nodesMap[$scope.$modelValue[i].$$hashKey]);
            }
          }
          return nodes;
        };

        $scope.depth = function() {
          if ($scope.$nodeScope) {
            return $scope.$nodeScope.depth();
          }
          return 0; // if it has no $nodeScope, it's root
        };

        // check if depth limit has reached
        $scope.outOfDepth = function(sourceNode) {
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

    .controller('TreeNodeController', ['$scope', '$element', '$attrs', 'treeConfig',
      function ($scope, $element, $attrs, treeConfig) {
        this.scope = $scope;

        $scope.$element = $element;
        $scope.$modelValue = null; // Model value for node;
        $scope.$parentNodeScope = null; // uiTreeNode Scope of parent node;
        $scope.$childNodesScope = null; // uiTreeNodes Scope of child nodes.
        $scope.$parentNodesScope = null; // uiTreeNodes Scope of parent nodes.
        $scope.$treeScope = null; // uiTree scope
        $scope.$handleScope = null; // it's handle scope
        $scope.$type = 'uiTreeNode';
        $scope.$$apply = false; //

        $scope.collapsed = false;

        $scope.init = function(controllersArr) {
          var treeNodesCtrl = controllersArr[0];
          $scope.$treeScope = controllersArr[1] ? controllersArr[1].scope : null;

          // find the scope of it's parent node
          $scope.$parentNodeScope = treeNodesCtrl.scope.$nodeScope;
          // modelValue for current node
          $scope.$modelValue = treeNodesCtrl.scope.$modelValue[$scope.$index];
          $scope.$parentNodesScope = treeNodesCtrl.scope;
          treeNodesCtrl.scope.initSubNode($scope); // init sub nodes

          $element.on('$destroy', function() {
            treeNodesCtrl.scope.destroySubNode($scope); // destroy sub nodes
          });
        };

        $scope.index = function() {
          return $scope.$parentNodesScope.$modelValue.indexOf($scope.$modelValue);
        };

        $scope.dragEnabled = function() {
          return !($scope.$treeScope && !$scope.$treeScope.dragEnabled);
        };

        $scope.isSibling = function(targetNode) {
          return $scope.$parentNodesScope == targetNode.$parentNodesScope;
        };

        $scope.isChild = function(targetNode) {
          var nodes = $scope.childNodes();
          return nodes && nodes.indexOf(targetNode) > -1;
        };

        $scope.prev = function() {
          var index = $scope.index();
          if (index > 0) {
            return $scope.siblings()[index - 1];
          }
          return null;
        };

        $scope.siblings = function() {
          return $scope.$parentNodesScope.childNodes();
        };

        $scope.childNodesCount = function() {
          return $scope.childNodes() ? $scope.childNodes().length : 0;
        };

        $scope.hasChild = function() {
          return $scope.childNodesCount() > 0;
        };

        $scope.childNodes = function() {
          return $scope.$childNodesScope && $scope.$childNodesScope.$modelValue ?
              $scope.$childNodesScope.childNodes() :
              null;
        };

        $scope.accept = function(sourceNode, destIndex) {
          return $scope.$childNodesScope && $scope.$childNodesScope.accept(sourceNode, destIndex);
        };

        $scope.remove = function() {
          return $scope.$parentNodesScope.removeNode($scope);
        };

        $scope.toggle = function() {
          $scope.collapsed = !$scope.collapsed;
        };

        $scope.collapse = function() {
          $scope.collapsed = true;
        };

        $scope.expand = function() {
          $scope.collapsed = false;
        };

        $scope.depth = function() {
          var parentNode = $scope.$parentNodeScope;
          if (parentNode) {
            return parentNode.depth() + 1;
          }
          return 1;
        };

        var subDepth = 0;
        var countSubDepth = function(scope) {
          var count = 0;
          var nodes = scope.childNodes();
          for (var i = 0; i < nodes.length; i++) {
            var childNodes = nodes[i].$childNodesScope;
            if (childNodes) {
              count = 1;
              countSubDepth(childNodes);
            }
          }
          subDepth += count;
        };

        $scope.maxSubDepth = function() {
          subDepth = 0;
          if ($scope.$childNodesScope) {
            countSubDepth($scope.$childNodesScope);
          }
          return subDepth;
        };

      }
    ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')

    .controller('TreeHandleController', ['$scope', '$element', '$attrs', 'treeConfig',
      function ($scope, $element, $attrs, treeConfig) {
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
  .directive('uiTree', [ 'treeConfig', '$window',
    function(treeConfig, $window) {
      return {
        restrict: 'A',
        scope: true,
        controller: 'TreeController',
        link: function(scope, element, attrs) {
          var callbacks = {
            accept: null
          };

          var config = {};
          angular.extend(config, treeConfig);
          if (config.treeClass) {
            element.addClass(config.treeClass);
          }

          scope.$emptyElm = angular.element($window.document.createElement('div'));
          if (config.emptyTreeClass) {
            scope.$emptyElm.addClass(config.emptyTreeClass);
          }

          scope.$watch('$nodesScope.$modelValue.length', function() {
            if (scope.$nodesScope.$modelValue) {
              scope.resetEmptyElement();
            }
          }, true);

          attrs.$observe('dragEnabled', function(val) {
            var de = scope.$eval(val);
            if((typeof de) == "boolean") {
              scope.dragEnabled = de;
            }
          });

          attrs.$observe('maxDepth', function(val) {
            var md = scope.$eval(val);
            if((typeof md) == "number") {
              scope.maxDepth = md;
            }
          });

          attrs.$observe('dragDelay', function(val) {
            var dd = scope.$eval(val);
            if((typeof dd) == "number") {
              scope.dragDelay = dd;
            }
          });

          // check if the dest node can accept the dragging node
          // by default, we check the 'data-nodrop' attribute in `ui-tree-nodes`
          // and the 'max-depth' attribute in `ui-tree` or `ui-tree-nodes`.
          // the method can be overrided
          callbacks.accept = function(sourceNodeScope, destNodesScope, destIndex) {
            if (destNodesScope.nodrop || destNodesScope.outOfDepth(sourceNodeScope)) {
              return false;
            }
            return true;
          };

          callbacks.dropped = function(event) {

          };

          //
          callbacks.dragStart = function(event) {

          };

          callbacks.dragMove = function(event) {

          };

          callbacks.dragStop = function(event) {

          };

          scope.$watch(attrs.uiTree, function(newVal, oldVal){
            angular.forEach(newVal, function(value, key){
              if (callbacks[key]) {
                if (typeof value === "function") {
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
  .directive('uiTreeNodes', [ 'treeConfig', '$window',
    function(treeConfig) {
      return {
        require: ['ngModel', '?^uiTreeNode', '^uiTree'],
        restrict: 'A',
        scope: true,
        controller: 'TreeNodesController',
        link: function(scope, element, attrs, controllersArr) {

          var config = {};
          angular.extend(config, treeConfig);
          if (config.nodesClass) {
            element.addClass(config.nodesClass);
          }

          var ngModel = controllersArr[0];
          var treeNodeCtrl = controllersArr[1];
          var treeCtrl = controllersArr[2];
          if (treeNodeCtrl) {
            treeNodeCtrl.scope.$childNodesScope = scope;
            scope.$nodeScope = treeNodeCtrl.scope;
          }
          else { // find the root nodes if there is no parent node and have a parent ui-tree
            treeCtrl.scope.$nodesScope = scope;
          }
          scope.$treeScope = treeCtrl.scope;

          if (ngModel) {
            ngModel.$render = function() {
              if (!ngModel.$modelValue || !angular.isArray(ngModel.$modelValue)) {
                ngModel.$setViewValue([]);
              }
              scope.$modelValue = ngModel.$modelValue;
            };
          }

          attrs.$observe('maxDepth', function(val) {
            var md = scope.$eval(val);
            if((typeof md) == "number") {
              scope.maxDepth = md;
            }
          });

          attrs.$observe('nodrop', function(val) {
            scope.nodrop = ((typeof val) != "undefined");
          });

        }
      };
    }
  ]);
})();

(function () {
  'use strict';

  angular.module('ui.tree')

    .directive('uiTreeNode', ['treeConfig', '$uiTreeHelper', '$window', '$document','$timeout',
      function (treeConfig, $uiTreeHelper, $window, $document, $timeout) {
        return {
          require: ['^uiTreeNodes', '^uiTree'],
          restrict: 'A',
          controller: 'TreeNodeController',
          link: function(scope, element, attrs, controllersArr) {
            var config = {};
            angular.extend(config, treeConfig);
            if (config.nodeClass) {
              element.addClass(config.nodeClass);
            }
            scope.init(controllersArr);

            scope.collapsed = !!$uiTreeHelper.getNodeAttribute(scope, 'collapsed');
            attrs.$observe('collapsed', function(val) {
              var collapsed = scope.$eval(val);
              if((typeof collapsed) == "boolean") {
                scope.collapsed = collapsed;
              }
            });

            scope.$watch('collapsed', function(val) {
              $uiTreeHelper.setNodeAttribute(scope, 'collapsed', val);
              attrs.$set('collapsed', val);
            });

            var hasTouch = 'ontouchstart' in window;
            var startPos, firstMoving, dragInfo, pos;
            var placeElm, hiddenPlaceElm, dragElm;
            var treeScope = null;
            var elements; // As a parameter for callbacks
            var dragTimer = null;

            var dragStart = function(e) {
              if (!hasTouch && (e.button == 2 || e.which == 3)) {
                // disable right click
                return;
              }
              if (e.uiTreeDragging || (e.originalEvent && e.originalEvent.uiTreeDragging)) { // event has already fired in other scope.
                return;
              }

              // the element which is clicked.
              var eventElm = angular.element(e.target);
              var eventScope = eventElm.scope();
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

              // check if it or it's parents has a 'data-nodrag' attribute
              while (eventElm && eventElm[0] && eventElm[0] != element) {
                if ($uiTreeHelper.nodrag(eventElm)) { // if the node mark as `nodrag`, DONOT drag it.
                  return;
                }
                eventElm = eventElm.parent();
              }

              e.uiTreeDragging = true; // stop event bubbling
              if (e.originalEvent) {
                e.originalEvent.uiTreeDragging = true;
              }
              e.preventDefault();
              var eventObj = $uiTreeHelper.eventObj(e);

              firstMoving = true;
              dragInfo = $uiTreeHelper.dragInfo(scope);

              var tagName = scope.$element.prop('tagName');
              if (tagName.toLowerCase() === 'tr') {
                placeElm = angular.element($window.document.createElement(tagName));
                var tdElm = angular.element($window.document.createElement('td'))
                              .addClass(config.placeHolderClass);
                placeElm.append(tdElm);
              } else {
                placeElm = angular.element($window.document.createElement(tagName))
                              .addClass(config.placeHolderClass);
              }
              hiddenPlaceElm = angular.element($window.document.createElement(tagName));
              if (config.hiddenClass) {
                hiddenPlaceElm.addClass(config.hiddenClass);
              }
              pos = $uiTreeHelper.positionStarted(eventObj, scope.$element);
              placeElm.css('height', $uiTreeHelper.height(scope.$element) + 'px');
              dragElm = angular.element($window.document.createElement(scope.$parentNodesScope.$element.prop('tagName')))
                        .addClass(scope.$parentNodesScope.$element.attr('class')).addClass(config.dragClass);
              dragElm.css('width', $uiTreeHelper.width(scope.$element) + 'px');
              dragElm.css('z-index', 9999);

              scope.$element.after(placeElm);
              scope.$element.after(hiddenPlaceElm);
              dragElm.append(scope.$element);
              $document.find('body').append(dragElm);
              dragElm.css({
                'left' : eventObj.pageX - pos.offsetX + 'px',
                'top'  : eventObj.pageY - pos.offsetY + 'px'
              });
              elements = {
                placeholder: placeElm,
                dragging: dragElm
              };
              scope.$apply(function() {
                scope.$callbacks.dragStart(dragInfo.eventArgs(elements, pos));
              });

              angular.element($document).bind('touchend', dragEndEvent);
              angular.element($document).bind('touchcancel', dragEndEvent);
              angular.element($document).bind('touchmove', dragMoveEvent);
              angular.element($document).bind('mouseup', dragEndEvent);
              angular.element($document).bind('mousemove', dragMoveEvent);
              angular.element($window.document.body).bind('mouseleave', dragCancelEvent);
            };

            var dragMove = function(e) {
              var eventObj = $uiTreeHelper.eventObj(e);
              var prev;
              if (dragElm) {
                e.preventDefault();
                $window.getSelection().removeAllRanges();

                dragElm.css({
                  'left' : eventObj.pageX - pos.offsetX + 'px',
                  'top'  : eventObj.pageY - pos.offsetY + 'px'
                });

                $uiTreeHelper.positionMoved(e, pos, firstMoving);
                if (firstMoving) {
                  firstMoving = false;
                  return;
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
                    var next = dragInfo.next();
                    if (!next) {
                      var target = dragInfo.parentNode(); // As a sibling of it's parent node
                      if (target
                        && target.$parentNodesScope.accept(scope, target.index() + 1)) {
                        target.$element.after(placeElm);
                        dragInfo.moveTo(target.$parentNodesScope, target.siblings(), target.index() + 1);
                      }
                    }
                  }
                }

                // check if add it as a child node first
                var decrease = ($uiTreeHelper.offset(dragElm).left - $uiTreeHelper.offset(placeElm).left) >= config.threshold;
                var targetX = eventObj.pageX - $window.document.body.scrollLeft;
                var targetY = eventObj.pageY - (window.pageYOffset || $window.document.documentElement.scrollTop);

                // Select the drag target. Because IE does not support CSS 'pointer-events: none', it will always
                // pick the drag element itself as the target. To prevent this, we hide the drag element while
                // selecting the target.
                if (angular.isFunction(dragElm.hide)) {
                  dragElm.hide();
                }

                // when using elementFromPoint() inside an iframe, you have to call
                // elementFromPoint() twice to make sure IE8 returns the correct value
                $window.document.elementFromPoint(targetX, targetY);

                var targetElm = angular.element($window.document.elementFromPoint(targetX, targetY));
                if (angular.isFunction(dragElm.show)) {
                  dragElm.show();
                }

                // move vertical
                if (!pos.dirAx) {
                  var targetBefore, targetNode;
                  // check it's new position
                  targetNode = targetElm.scope();
                  var isEmpty = false;
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
                  } else if (targetNode.dragEnabled()){ // drag enabled
                    targetElm = targetNode.$element; // Get the element of ui-tree-node
                    var targetOffset = $uiTreeHelper.offset(targetElm);
                    targetBefore = eventObj.pageY < (targetOffset.top + $uiTreeHelper.height(targetElm) / 2);

                    if (targetNode.$parentNodesScope.accept(scope, targetNode.index())) {
                      if (targetBefore) {
                        targetElm[0].parentNode.insertBefore(placeElm[0], targetElm[0]);
                        dragInfo.moveTo(targetNode.$parentNodesScope, targetNode.siblings(), targetNode.index());
                      } else {
                        targetElm.after(placeElm);
                        dragInfo.moveTo(targetNode.$parentNodesScope, targetNode.siblings(), targetNode.index() + 1);
                      }
                    }
                    else if (!targetBefore && targetNode.accept(scope, targetNode.childNodesCount())) { // we have to check if it can add the dragging node as a child
                      targetNode.$childNodesScope.$element.append(placeElm);
                      dragInfo.moveTo(targetNode.$childNodesScope, targetNode.childNodes(), targetNode.childNodesCount());
                    }
                  }

                }

                scope.$apply(function() {
                  scope.$callbacks.dragMove(dragInfo.eventArgs(elements, pos));
                });
              }
            };

            var dragEnd = function(e) {
              e.preventDefault();

              if (dragElm) {
                // roll back elements changed
                hiddenPlaceElm.replaceWith(scope.$element);
                placeElm.remove();

                dragElm.remove();
                dragElm = null;
                if (scope.$$apply) {
                  dragInfo.apply();
                  scope.$treeScope.$apply(function() {
                    scope.$callbacks.dropped(dragInfo.eventArgs(elements, pos));
                  });
                } else {
                  bindDrag();
                }
                scope.$treeScope.$apply(function() {
                  scope.$callbacks.dragStop(dragInfo.eventArgs(elements, pos));
                });
                scope.$$apply = false;
                dragInfo = null;

              }


              angular.element($document).unbind('touchend', dragEndEvent); // Mobile
              angular.element($document).unbind('touchcancel', dragEndEvent); // Mobile
              angular.element($document).unbind('touchmove', dragMoveEvent); // Mobile
              angular.element($document).unbind('mouseup', dragEndEvent);
              angular.element($document).unbind('mousemove', dragMoveEvent);
              angular.element($window.document.body).unbind('mouseleave', dragCancelEvent);
            };

            var dragStartEvent = function(e) {
              if (scope.dragEnabled()) {
                dragStart(e);
              }
            };

            var dragMoveEvent = function(e) {
              dragMove(e);
            };

            var dragEndEvent = function(e) {
              scope.$$apply = true;
              dragEnd(e);
            };

            var dragCancelEvent = function(e) {
              dragEnd(e);
            };

            var bindDrag = function() {
              element.bind('touchstart', dragStartEvent);
              element.bind('mousedown', function (e) {
                dragTimer = $timeout(function(){dragStartEvent(e);}, scope.dragDelay);
              });
              element.bind('mouseup',function(){$timeout.cancel(dragTimer);});
            };
            bindDrag();

            angular.element($window.document.body).bind("keydown", function(e) {
              if (e.keyCode == 27) {
                scope.$$apply = false;
                dragEnd(e);
              }
            });
          }
        };
      }
    ]);

})();

(function () {
  'use strict';

  angular.module('ui.tree')
  .directive('uiTreeHandle', [ 'treeConfig', '$window',
    function(treeConfig) {
      return {
        require: '^uiTreeNode',
        restrict: 'A',
        scope: true,
        controller: 'TreeHandleController',
        link: function(scope, element, attrs, treeNodeCtrl) {
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
