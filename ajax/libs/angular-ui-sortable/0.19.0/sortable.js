/**
 * angular-ui-sortable - This directive allows you to jQueryUI Sortable.
 * @version v0.19.0 - 2018-01-14
 * @link http://angular-ui.github.com
 * @license MIT
 */

(function(window, angular, undefined) {
'use strict';
/*
 jQuery UI Sortable plugin wrapper

 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
 */
angular
  .module('ui.sortable', [])
  .value('uiSortableConfig', {
    // the default for jquery-ui sortable is "> *", we need to restrict this to
    // ng-repeat items
    // if the user uses
    items: '> [ng-repeat],> [data-ng-repeat],> [x-ng-repeat]'
  })
  .directive('uiSortable', [
    'uiSortableConfig',
    '$timeout',
    '$log',
    function(uiSortableConfig, $timeout, $log) {
      return {
        require: '?ngModel',
        scope: {
          ngModel: '=',
          uiSortable: '=',
          ////Expression bindings from html.
          create: '&uiSortableCreate',
          // helper:'&uiSortableHelper',
          start: '&uiSortableStart',
          activate: '&uiSortableActivate',
          // sort:'&uiSortableSort',
          // change:'&uiSortableChange',
          // over:'&uiSortableOver',
          // out:'&uiSortableOut',
          beforeStop: '&uiSortableBeforeStop',
          update: '&uiSortableUpdate',
          remove: '&uiSortableRemove',
          receive: '&uiSortableReceive',
          deactivate: '&uiSortableDeactivate',
          stop: '&uiSortableStop'
        },
        link: function(scope, element, attrs, ngModel) {
          var savedNodes;
          var helper;

          function combineCallbacks(first, second) {
            var firstIsFunc = typeof first === 'function';
            var secondIsFunc = typeof second === 'function';
            if (firstIsFunc && secondIsFunc) {
              return function() {
                first.apply(this, arguments);
                second.apply(this, arguments);
              };
            } else if (secondIsFunc) {
              return second;
            }
            return first;
          }

          function getSortableWidgetInstance(element) {
            // this is a fix to support jquery-ui prior to v1.11.x
            // otherwise we should be using `element.sortable('instance')`
            var data = element.data('ui-sortable');
            if (
              data &&
              typeof data === 'object' &&
              data.widgetFullName === 'ui-sortable'
            ) {
              return data;
            }
            return null;
          }

          function setItemChildrenWidth(item) {
            item.children().each(function() {
              var $el = angular.element(this);

              // Preserve the with of the element
              $el.width($el.width());
            });
          }

          function dummyHelper(e, item) {
            return item;
          }

          function patchSortableOption(key, value) {
            if (callbacks[key]) {
              if (key === 'stop') {
                // call apply after stop
                value = combineCallbacks(value, function() {
                  scope.$apply();
                });

                value = combineCallbacks(value, afterStop);
              }
              // wrap the callback
              value = combineCallbacks(callbacks[key], value);
            } else if (wrappers[key]) {
              value = wrappers[key](value);
            }

            // patch the options that need to have values set
            if (!value && (key === 'items' || key === 'ui-model-items')) {
              value = uiSortableConfig.items;
            }

            return value;
          }

          function patchUISortableOptions(
            newOpts,
            oldOpts,
            sortableWidgetInstance
          ) {
            function addDummyOptionKey(value, key) {
              if (!(key in opts)) {
                // add the key in the opts object so that
                // the patch function detects and handles it
                opts[key] = null;
              }
            }
            // for this directive to work we have to attach some callbacks
            angular.forEach(callbacks, addDummyOptionKey);

            // only initialize it in case we have to
            // update some options of the sortable
            var optsDiff = null;

            if (oldOpts) {
              // reset deleted options to default
              var defaultOptions;
              angular.forEach(oldOpts, function(oldValue, key) {
                if (!newOpts || !(key in newOpts)) {
                  if (key in directiveOpts) {
                    if (key === 'ui-floating') {
                      opts[key] = 'auto';
                    } else {
                      opts[key] = patchSortableOption(key, undefined);
                    }
                    return;
                  }

                  if (!defaultOptions) {
                    defaultOptions = angular.element.ui.sortable().options;
                  }
                  var defaultValue = defaultOptions[key];
                  defaultValue = patchSortableOption(key, defaultValue);

                  if (!optsDiff) {
                    optsDiff = {};
                  }
                  optsDiff[key] = defaultValue;
                  opts[key] = defaultValue;
                }
              });
            }

            newOpts = angular.extend({}, newOpts);
            // update changed options
            // handle the custom option of the directive first
            angular.forEach(newOpts, function(value, key) {
              if (key in directiveOpts) {
                if (
                  key === 'ui-floating' &&
                  (value === false || value === true) &&
                  sortableWidgetInstance
                ) {
                  sortableWidgetInstance.floating = value;
                }

                if (
                  key === 'ui-preserve-size' &&
                  (value === false || value === true)
                ) {
                  var userProvidedHelper = opts.helper;
                  newOpts.helper = function(e, item) {
                    if (opts['ui-preserve-size'] === true) {
                      setItemChildrenWidth(item);
                    }
                    return (userProvidedHelper || dummyHelper).apply(
                      this,
                      arguments
                    );
                  };
                }

                opts[key] = patchSortableOption(key, value);
              }
            });

            // handle the normal option of the directive
            angular.forEach(newOpts, function(value, key) {
              if (key in directiveOpts) {
                // the custom option of the directive are already handled
                return;
              }

              value = patchSortableOption(key, value);

              if (!optsDiff) {
                optsDiff = {};
              }
              optsDiff[key] = value;
              opts[key] = value;
            });

            return optsDiff;
          }

          function getPlaceholderElement(element) {
            var placeholder = element.sortable('option', 'placeholder');

            // placeholder.element will be a function if the placeholder, has
            // been created (placeholder will be an object).  If it hasn't
            // been created, either placeholder will be false if no
            // placeholder class was given or placeholder.element will be
            // undefined if a class was given (placeholder will be a string)
            if (
              placeholder &&
              placeholder.element &&
              typeof placeholder.element === 'function'
            ) {
              var result = placeholder.element();
              // workaround for jquery ui 1.9.x,
              // not returning jquery collection
              result = angular.element(result);
              return result;
            }
            return null;
          }

          function getPlaceholderExcludesludes(element, placeholder) {
            // exact match with the placeholder's class attribute to handle
            // the case that multiple connected sortables exist and
            // the placeholder option equals the class of sortable items
            var notCssSelector = opts['ui-model-items'].replace(/[^,]*>/g, '');
            var excludes = element.find(
              '[class="' +
                placeholder.attr('class') +
                '"]:not(' +
                notCssSelector +
                ')'
            );
            return excludes;
          }

          function hasSortingHelper(element, ui) {
            var helperOption = element.sortable('option', 'helper');
            return (
              helperOption === 'clone' ||
              (typeof helperOption === 'function' &&
                ui.item.sortable.isCustomHelperUsed())
            );
          }

          function getSortingHelper(element, ui /*, savedNodes*/) {
            var result = null;
            if (
              hasSortingHelper(element, ui) &&
              element.sortable('option', 'appendTo') === 'parent'
            ) {
              // The .ui-sortable-helper element (that's the default class name)
              result = helper;
            }
            return result;
          }

          // thanks jquery-ui
          function isFloating(item) {
            return (
              /left|right/.test(item.css('float')) ||
              /inline|table-cell/.test(item.css('display'))
            );
          }

          function getElementContext(elementScopes, element) {
            for (var i = 0; i < elementScopes.length; i++) {
              var c = elementScopes[i];
              if (c.element[0] === element[0]) {
                return c;
              }
            }
          }

          function afterStop(e, ui) {
            ui.item.sortable._destroy();
          }

          // return the index of ui.item among the items
          // we can't just do ui.item.index() because there it might have siblings
          // which are not items
          function getItemIndex(item) {
            return item
              .parent()
              .find(opts['ui-model-items'])
              .index(item);
          }

          var opts = {};

          // directive specific options
          var directiveOpts = {
            'ui-floating': undefined,
            'ui-model-items': uiSortableConfig.items,
            'ui-preserve-size': undefined
          };

          var callbacks = {
            create: null,
            start: null,
            activate: null,
            // sort: null,
            // change: null,
            // over: null,
            // out: null,
            beforeStop: null,
            update: null,
            remove: null,
            receive: null,
            deactivate: null,
            stop: null
          };

          var wrappers = {
            helper: null
          };

          angular.extend(
            opts,
            directiveOpts,
            uiSortableConfig,
            scope.uiSortable
          );

          if (!angular.element.fn || !angular.element.fn.jquery) {
            $log.error(
              'ui.sortable: jQuery should be included before AngularJS!'
            );
            return;
          }

          function wireUp() {
            // When we add or remove elements, we need the sortable to 'refresh'
            // so it can find the new/removed elements.
            scope.$watchCollection('ngModel', function() {
              // Timeout to let ng-repeat modify the DOM
              $timeout(
                function() {
                  // ensure that the jquery-ui-sortable widget instance
                  // is still bound to the directive's element
                  if (!!getSortableWidgetInstance(element)) {
                    element.sortable('refresh');
                  }
                },
                0,
                false
              );
            });

            callbacks.start = function(e, ui) {
              if (opts['ui-floating'] === 'auto') {
                // since the drag has started, the element will be
                // absolutely positioned, so we check its siblings
                var siblings = ui.item.siblings();
                var sortableWidgetInstance = getSortableWidgetInstance(
                  angular.element(e.target)
                );
                sortableWidgetInstance.floating = isFloating(siblings);
              }

              // Save the starting position of dragged item
              var index = getItemIndex(ui.item);
              ui.item.sortable = {
                model: ngModel.$modelValue[index],
                index: index,
                source: element,
                sourceList: ui.item.parent(),
                sourceModel: ngModel.$modelValue,
                cancel: function() {
                  ui.item.sortable._isCanceled = true;
                },
                isCanceled: function() {
                  return ui.item.sortable._isCanceled;
                },
                isCustomHelperUsed: function() {
                  return !!ui.item.sortable._isCustomHelperUsed;
                },
                _isCanceled: false,
                _isCustomHelperUsed: ui.item.sortable._isCustomHelperUsed,
                _destroy: function() {
                  angular.forEach(ui.item.sortable, function(value, key) {
                    ui.item.sortable[key] = undefined;
                  });
                },
                _connectedSortables: [],
                _getElementContext: function(element) {
                  return getElementContext(this._connectedSortables, element);
                }
              };
            };

            callbacks.activate = function(e, ui) {
              var isSourceContext = ui.item.sortable.source === element;
              var savedNodesOrigin = isSourceContext
                ? ui.item.sortable.sourceList
                : element;
              var elementContext = {
                element: element,
                scope: scope,
                isSourceContext: isSourceContext,
                savedNodesOrigin: savedNodesOrigin
              };
              // save the directive's scope so that it is accessible from ui.item.sortable
              ui.item.sortable._connectedSortables.push(elementContext);

              // We need to make a copy of the current element's contents so
              // we can restore it after sortable has messed it up.
              // This is inside activate (instead of start) in order to save
              // both lists when dragging between connected lists.
              savedNodes = savedNodesOrigin.contents();
              helper = ui.helper;

              // If this list has a placeholder (the connected lists won't),
              // don't inlcude it in saved nodes.
              var placeholder = getPlaceholderElement(element);
              if (placeholder && placeholder.length) {
                var excludes = getPlaceholderExcludesludes(
                  element,
                  placeholder
                );
                savedNodes = savedNodes.not(excludes);
              }
            };

            callbacks.update = function(e, ui) {
              // Save current drop position but only if this is not a second
              // update that happens when moving between lists because then
              // the value will be overwritten with the old value
              if (!ui.item.sortable.received) {
                ui.item.sortable.dropindex = getItemIndex(ui.item);
                var droptarget = ui.item
                  .parent()
                  .closest(
                    '[ui-sortable], [data-ui-sortable], [x-ui-sortable]'
                  );
                ui.item.sortable.droptarget = droptarget;
                ui.item.sortable.droptargetList = ui.item.parent();

                var droptargetContext = ui.item.sortable._getElementContext(
                  droptarget
                );
                ui.item.sortable.droptargetModel =
                  droptargetContext.scope.ngModel;

                // Cancel the sort (let ng-repeat do the sort for us)
                // Don't cancel if this is the received list because it has
                // already been canceled in the other list, and trying to cancel
                // here will mess up the DOM.
                element.sortable('cancel');
              }

              // Put the nodes back exactly the way they started (this is very
              // important because ng-repeat uses comment elements to delineate
              // the start and stop of repeat sections and sortable doesn't
              // respect their order (even if we cancel, the order of the
              // comments are still messed up).
              var sortingHelper =
                !ui.item.sortable.received &&
                getSortingHelper(element, ui, savedNodes);
              if (sortingHelper && sortingHelper.length) {
                // Restore all the savedNodes except from the sorting helper element.
                // That way it will be garbage collected.
                savedNodes = savedNodes.not(sortingHelper);
              }
              var elementContext = ui.item.sortable._getElementContext(element);
              savedNodes.appendTo(elementContext.savedNodesOrigin);

              // If this is the target connected list then
              // it's safe to clear the restored nodes since:
              // update is currently running and
              // stop is not called for the target list.
              if (ui.item.sortable.received) {
                savedNodes = null;
              }

              // If received is true (an item was dropped in from another list)
              // then we add the new item to this list otherwise wait until the
              // stop event where we will know if it was a sort or item was
              // moved here from another list
              if (ui.item.sortable.received && !ui.item.sortable.isCanceled()) {
                scope.$apply(function() {
                  ngModel.$modelValue.splice(
                    ui.item.sortable.dropindex,
                    0,
                    ui.item.sortable.moved
                  );
                });
                scope.$emit('ui-sortable:moved', ui);
              }
            };

            callbacks.stop = function(e, ui) {
              // If the received flag hasn't be set on the item, this is a
              // normal sort, if dropindex is set, the item was moved, so move
              // the items in the list.
              var wasMoved =
                'dropindex' in ui.item.sortable &&
                !ui.item.sortable.isCanceled();

              if (wasMoved && !ui.item.sortable.received) {
                scope.$apply(function() {
                  ngModel.$modelValue.splice(
                    ui.item.sortable.dropindex,
                    0,
                    ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0]
                  );
                });
                scope.$emit('ui-sortable:moved', ui);
              } else if (
                !wasMoved &&
                !angular.equals(
                  element.contents().toArray(),
                  savedNodes.toArray()
                )
              ) {
                // if the item was not moved
                // and the DOM element order has changed,
                // then restore the elements
                // so that the ngRepeat's comment are correct.

                var sortingHelper = getSortingHelper(element, ui, savedNodes);
                if (sortingHelper && sortingHelper.length) {
                  // Restore all the savedNodes except from the sorting helper element.
                  // That way it will be garbage collected.
                  savedNodes = savedNodes.not(sortingHelper);
                }
                var elementContext = ui.item.sortable._getElementContext(
                  element
                );
                savedNodes.appendTo(elementContext.savedNodesOrigin);
              }

              // It's now safe to clear the savedNodes and helper
              // since stop is the last callback.
              savedNodes = null;
              helper = null;
            };

            callbacks.receive = function(e, ui) {
              // An item was dropped here from another list, set a flag on the
              // item.
              ui.item.sortable.received = true;
            };

            callbacks.remove = function(e, ui) {
              // Workaround for a problem observed in nested connected lists.
              // There should be an 'update' event before 'remove' when moving
              // elements. If the event did not fire, cancel sorting.
              if (!('dropindex' in ui.item.sortable)) {
                element.sortable('cancel');
                ui.item.sortable.cancel();
              }

              // Remove the item from this list's model and copy data into item,
              // so the next list can retrive it
              if (!ui.item.sortable.isCanceled()) {
                scope.$apply(function() {
                  ui.item.sortable.moved = ngModel.$modelValue.splice(
                    ui.item.sortable.index,
                    1
                  )[0];
                });
              }
            };

            // setup attribute handlers
            angular.forEach(callbacks, function(value, key) {
              callbacks[key] = combineCallbacks(callbacks[key], function() {
                var attrHandler = scope[key];
                var attrHandlerFn;
                if (
                  typeof attrHandler === 'function' &&
                  (
                    'uiSortable' +
                    key.substring(0, 1).toUpperCase() +
                    key.substring(1)
                  ).length &&
                  typeof (attrHandlerFn = attrHandler()) === 'function'
                ) {
                  attrHandlerFn.apply(this, arguments);
                }
              });
            });

            wrappers.helper = function(inner) {
              if (inner && typeof inner === 'function') {
                return function(e, item) {
                  var oldItemSortable = item.sortable;
                  var index = getItemIndex(item);

                  item.sortable = {
                    model: ngModel.$modelValue[index],
                    index: index,
                    source: element,
                    sourceList: item.parent(),
                    sourceModel: ngModel.$modelValue,
                    _restore: function() {
                      angular.forEach(item.sortable, function(value, key) {
                        item.sortable[key] = undefined;
                      });

                      item.sortable = oldItemSortable;
                    }
                  };

                  var innerResult = inner.apply(this, arguments);
                  item.sortable._restore();
                  item.sortable._isCustomHelperUsed = item !== innerResult;
                  return innerResult;
                };
              }
              return inner;
            };

            scope.$watchCollection(
              'uiSortable',
              function(newOpts, oldOpts) {
                // ensure that the jquery-ui-sortable widget instance
                // is still bound to the directive's element
                var sortableWidgetInstance = getSortableWidgetInstance(element);
                if (!!sortableWidgetInstance) {
                  var optsDiff = patchUISortableOptions(
                    newOpts,
                    oldOpts,
                    sortableWidgetInstance
                  );

                  if (optsDiff) {
                    element.sortable('option', optsDiff);
                  }
                }
              },
              true
            );

            patchUISortableOptions(opts);
          }

          function init() {
            if (ngModel) {
              wireUp();
            } else {
              $log.info('ui.sortable: ngModel not provided!', element);
            }

            // Create sortable
            element.sortable(opts);
          }

          function initIfEnabled() {
            if (scope.uiSortable && scope.uiSortable.disabled) {
              return false;
            }

            init();

            // Stop Watcher
            initIfEnabled.cancelWatcher();
            initIfEnabled.cancelWatcher = angular.noop;

            return true;
          }

          initIfEnabled.cancelWatcher = angular.noop;

          if (!initIfEnabled()) {
            initIfEnabled.cancelWatcher = scope.$watch(
              'uiSortable.disabled',
              initIfEnabled
            );
          }
        }
      };
    }
  ]);

})(window, window.angular);
