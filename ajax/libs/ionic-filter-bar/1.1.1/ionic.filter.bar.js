angular.module('jett.ionic.filter.bar', ['ionic']);
(function (angular, document) {
  'use strict';

  angular.module('jett.ionic.filter.bar')
    .directive('ionFilterBar', [
      '$timeout',
      '$ionicGesture',
      '$ionicPlatform',
      function ($timeout, $ionicGesture, $ionicPlatform) {
        var filterBarTemplate;

        //create platform specific filterBar template using filterConfig items
        if ($ionicPlatform.is('android')) {
          filterBarTemplate =
            '<div class="filter-bar-wrapper filter-bar-{{::config.theme}} filter-bar-transition-{{::config.transition}}">' +
              '<div class="bar bar-header bar-{{::config.theme}} item-input-inset">' +
                '<button class="filter-bar-cancel button button-icon icon {{::config.back}}"></button>' +
                '<label class="item-input-wrapper">' +
                  '<input type="search" class="filter-bar-search" ng-model="data.filterText" placeholder="{{::config.placeholder}}" />' +
                  '<button class="filter-bar-clear button button-icon icon" ng-class="getClearButtonClass()"></button>' +
                '</label>' +
              '</div>' +
            '</div>';
        } else {
          filterBarTemplate =
            '<div class="filter-bar-wrapper filter-bar-{{::config.theme}} filter-bar-transition-{{::config.transition}}">' +
              '<div class="bar bar-header bar-{{::config.theme}} item-input-inset">' +
                '<label class="item-input-wrapper">' +
                  '<i class="icon {{::config.search}} placeholder-icon"></i>' +
                  '<input type="search" class="filter-bar-search" ng-model="data.filterText" placeholder="{{::config.placeholder}}"/>' +
                  '<button class="filter-bar-clear button button-icon icon" ng-class="getClearButtonClass()"></button>' +
                '</label>' +
                '<button class="filter-bar-cancel button button-clear" ng-bind-html="::cancelText"></button>' +
              '</div>' +
            '</div>';
        }

        return {
          restrict: 'E',
          scope: true,
          link: function ($scope, $element) {
            var el = $element[0];
            var clearEl = el.querySelector('.filter-bar-clear');
            var cancelEl = el.querySelector('.filter-bar-cancel');
            var inputEl = el.querySelector('.filter-bar-search');
            var filterTextTimeout;
            var swipeGesture;
            var backdrop;
            var backdropClick;
            var filterWatch;

            // Action when filter bar is cancelled via backdrop click/swipe or cancel/back buton click.
            // Invokes cancel function defined in filterBar service
            var cancelFilterBar = function () {
              $scope.cancelFilterBar();
            };

            // If backdrop is enabled, create and append it to filter, then add click/swipe listeners to cancel filter
            if ($scope.config.backdrop) {
              backdrop = angular.element('<div class="filter-bar-backdrop"></div>');
              $element.append(backdrop);

              backdropClick = function(e) {
                if (e.target == backdrop[0]) {
                  cancelFilterBar();
                }
              };

              backdrop.bind('click', backdropClick);
              swipeGesture = $ionicGesture.on('swipe', backdropClick, backdrop);
            }

            //Sure we could have had 1 function that also checked for favoritesEnabled.. but no need to keep checking a var that wont change
            if ($scope.favoritesEnabled) {
              $scope.getClearButtonClass = function () {
                return $scope.data.filterText.length ? $scope.config.clear : $scope.config.favorite;
              }
            } else {
              $scope.getClearButtonClass = function () {
                return $scope.data.filterText.length ? $scope.config.clear : 'filter-bar-element-hide';
              }
            }

            // When clear button is clicked, clear filterText, hide clear button, show backdrop, and focus the input
            var clearClick = function () {
              if (clearEl.classList.contains($scope.config.favorite)) {
                $scope.showModal();
              } else {
                $timeout(function () {
                  $scope.data.filterText = '';
                  ionic.requestAnimationFrame(function () {
                    $scope.showBackdrop();
                    $scope.scrollItemsTop();
                    $scope.focusInput();
                  });
                });
              }
            };

            // Bind touchstart so we can regain focus of input even while scrolling
            var inputClick = function () {
              $scope.scrollItemsTop();
              $scope.focusInput();
            };

            // When a non escape key is pressed, show/hide backdrop/clear button based on filterText length
            var keyUp = function(e) {
              if (e.which == 27) {
                cancelFilterBar();
              } else if ($scope.data.filterText && $scope.data.filterText.length) {
                $scope.hideBackdrop();
              } else {
                $scope.showBackdrop();
              }
            };

            //Event Listeners
            cancelEl.addEventListener('click', cancelFilterBar);
            // Since we are wrapping with label, need to bind touchstart rather than click.
            // Even if we use div instead of label need to bind touchstart.  Click isn't allowing input to regain focus quickly
            clearEl.addEventListener('touchstart', clearClick);
            clearEl.addEventListener('mousedown', clearClick);

            inputEl.addEventListener('touchstart', inputClick);
            inputEl.addEventListener('mousedown', inputClick);

            document.addEventListener('keyup', keyUp);

            // Calls the services filterItems function with the filterText to filter items
            var filterItems = function () {
              $scope.filterItems($scope.data.filterText);
            };

            // Clean up when scope is destroyed
            $scope.$on('$destroy', function() {
              $element.remove();
              document.removeEventListener('keyup', keyUp);
              if (backdrop) {
                $ionicGesture.off(swipeGesture, 'swipe', backdropClick);
              }
              filterWatch();
            });

            // Watch for changes on filterText and call filterItems when filterText has changed.
            // If debounce is enabled, filter items by the specified or default delay.
            // Prefer timeout debounce over ng-model-options so if filterText is cleared, initial items show up right away with no delay
            filterWatch = $scope.$watch('data.filterText', function (newFilterText, oldFilterText) {
              var delay;

              if (filterTextTimeout) {
                $timeout.cancel(filterTextTimeout);
              }

              if (newFilterText !== oldFilterText) {
                delay = (newFilterText.length && $scope.debounce) ? $scope.delay : 0;
                filterTextTimeout = $timeout(filterItems, delay, false);
              }
            });
          },
          template: filterBarTemplate
        };
      }]);

})(angular, document);

/* global angular */
/**
 * This copies the functionality of the ionicConfig provider to allow for platform specific configuration
 */
(function (angular) {
  'use strict';

  angular.module('jett.ionic.filter.bar')
    .provider('$ionicFilterBarConfig', function () {

      var provider = this;
      provider.platform = {};
      var PLATFORM = 'platform';

      var configProperties = {
        theme: PLATFORM,
        clear: PLATFORM,
        add: PLATFORM,
        close: PLATFORM,
        done: PLATFORM,
        remove: PLATFORM,
        reorder: PLATFORM,
        favorite: PLATFORM,
        search: PLATFORM,
        backdrop: PLATFORM,
        transition: PLATFORM,
        platform: {},
        placeholder: PLATFORM
      };

      createConfig(configProperties, provider, '');

      // Default
      // -------------------------
      setPlatformConfig('default', {
        clear: 'ion-ios-close',
        add: 'ion-ios-plus-outline',
        close: 'ion-ios-close-empty',
        done: 'ion-ios-checkmark-empty',
        remove: 'ion-ios-trash-outline',
        reorder: 'ion-drag',
        favorite: 'ion-ios-star',
        search: 'ion-ios-search-strong',
        backdrop: true,
        transition: 'vertical',
        placeholder: 'Search'
      });

      // iOS (it is the default already)
      // -------------------------
      setPlatformConfig('ios', {});

      // Android
      // -------------------------
      setPlatformConfig('android', {
        clear: 'ion-android-close',
        close: 'ion-android-close',
        done: 'ion-android-done',
        remove: 'ion-android-delete',
        favorite: 'ion-android-star',
        search: false,
        backdrop: false,
        transition: 'horizontal'
      });

      provider.setPlatformConfig = setPlatformConfig;

      // private: used to set platform configs
      function setPlatformConfig(platformName, platformConfigs) {
        configProperties.platform[platformName] = platformConfigs;
        provider.platform[platformName] = {};

        addConfig(configProperties, configProperties.platform[platformName]);

        createConfig(configProperties.platform[platformName], provider.platform[platformName], '');
      }

      // private: used to recursively add new platform configs
      function addConfig(configObj, platformObj) {
        for (var n in configObj) {
          if (n != PLATFORM && configObj.hasOwnProperty(n)) {
            if (angular.isObject(configObj[n])) {
              if (!angular.isDefined(platformObj[n])) {
                platformObj[n] = {};
              }
              addConfig(configObj[n], platformObj[n]);

            } else if (!angular.isDefined(platformObj[n])) {
              platformObj[n] = null;
            }
          }
        }
      }

      // private: create methods for each config to get/set
      function createConfig(configObj, providerObj, platformPath) {
        angular.forEach(configObj, function(value, namespace) {

          if (angular.isObject(configObj[namespace])) {
            // recursively drill down the config object so we can create a method for each one
            providerObj[namespace] = {};
            createConfig(configObj[namespace], providerObj[namespace], platformPath + '.' + namespace);

          } else {
            // create a method for the provider/config methods that will be exposed
            providerObj[namespace] = function(newValue) {
              if (arguments.length) {
                configObj[namespace] = newValue;
                return providerObj;
              }
              if (configObj[namespace] == PLATFORM) {
                // if the config is set to 'platform', then get this config's platform value
                var platformConfig = stringObj(configProperties.platform, ionic.Platform.platform() + platformPath + '.' + namespace);
                if (platformConfig || platformConfig === false) {
                  return platformConfig;
                }
                // didnt find a specific platform config, now try the default
                return stringObj(configProperties.platform, 'default' + platformPath + '.' + namespace);
              }
              return configObj[namespace];
            };
          }

        });
      }

      //splits a string by dot operator and accesses the end var.  For example in a.b.c,
      function stringObj(obj, str) {
        str = str.split(".");
        for (var i = 0; i < str.length; i++) {
          if (obj && angular.isDefined(obj[str[i]])) {
            obj = obj[str[i]];
          } else {
            return null;
          }
        }
        return obj;
      }

      provider.$get = function() {
        return provider;
      };

    });

})(angular);

/* global angular,ionic */
/**
 * @ngdoc service
 * @name $ionicFilterBar
 * @module ionic
 * @description The Filter Bar is an animated bar that allows a user to search or filter an array of items.
 */
(function (angular, ionic) {
  'use strict';

  var filterBarModalTemplate =
    '<ion-modal-view ng-controller="$ionicFilterBarModalCtrl" class="filter-bar-modal">' +
    '<ion-header-bar class="bar bar-{{::config.theme}} disable-user-behavior">' +
      '<button class="button button-icon {{::config.close}}" ng-click="closeModal()"></button>' +
      '<h1 class="title" ng-bind-html="::favoritesTitle"></h1>' +
      '<button ng-if="searches.length > 1" class="button button-icon" ng-class="displayData.showReorder ? config.done : config.reorder" ng-click="displayData.showReorder = !displayData.showReorder"></button>' +
    '</ion-header-bar>' +
    '<ion-content>' +
      '<ion-list show-reorder="displayData.showReorder" delegate-handle="searches-list">' +
        '<ion-item ng-repeat="item in searches" class="item-remove-animate" ng-class="{reordered: item.reordered}" ng-click="itemClicked(item.text, $event)">' +
          '<span ng-bind-html="item.text"></span>' +
          '<ion-option-button class="button-assertive icon {{::config.remove}}" ng-click="deleteItem(item)"></ion-option-button>' +
          '<ion-reorder-button class="{{::config.reorder}}" on-reorder="moveItem(item, $fromIndex, $toIndex)"></ion-reorder-button>' +
        '</ion-item>' +
        '<div class="item item-input">' +
          '<input type="text" ng-model="newItem.text" placeholder="{{::favoritesAddPlaceholder}}"/>' +
          '<button class="button button-icon icon {{::config.add}}" ng-click="addItem(newItem)"></button>' +
        '</div>' +
      '</ion-list>' +
    '</ion-content> ' +
    '</ion-modal-view>';

  var getNavBarTheme = function ($navBar) {
    var themes = ['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'];
    var classList = $navBar && $navBar.classList;

    if (!classList) {
      return;
    }

    for (var i = 0; i < themes.length; i++) {
      if (classList.contains('bar-' + themes[i])) {
        return themes[i];
      }
    }
  };

  angular.module('jett.ionic.filter.bar')
    .factory('$ionicFilterBar', [
      '$document',
      '$rootScope',
      '$compile',
      '$timeout',
      '$filter',
      '$ionicPlatform',
      '$ionicFilterBarConfig',
      '$ionicConfig',
      '$ionicModal',
      '$ionicScrollDelegate',
      function ($document, $rootScope, $compile, $timeout, $filter, $ionicPlatform, $ionicFilterBarConfig, $ionicConfig, $ionicModal, $ionicScrollDelegate) {
        var isShown = false;
        var $body = $document[0].body;
        var templateConfig = {
          theme: $ionicFilterBarConfig.theme(),
          transition: $ionicFilterBarConfig.transition(),
          back: $ionicConfig.backButton.icon(),
          clear: $ionicFilterBarConfig.clear(),
          favorite: $ionicFilterBarConfig.favorite(),
          search: $ionicFilterBarConfig.search(),
          backdrop: $ionicFilterBarConfig.backdrop(),
          placeholder: $ionicFilterBarConfig.placeholder(),
          close: $ionicFilterBarConfig.close(),
          done: $ionicFilterBarConfig.done(),
          reorder: $ionicFilterBarConfig.reorder(),
          remove: $ionicFilterBarConfig.remove(),
          add: $ionicFilterBarConfig.add()
        };

        /**
         * @ngdoc method
         * @name $ionicFilterBar#show
         * @description
         * Load and return a new filter bar.
         *
         * A new isolated scope will be created for the filter bar and the new filter bar will be appended to the
         * body, covering the header bar.
         *
         * @returns {function} `hideFilterBar` A function which, when called, hides & cancels the filter bar.
         */
        function filterBar (opts) {
          //if filterBar is already shown return
          if (isShown) {
            return;
          }

          isShown = true;
          opts = opts || {};

          var scope = $rootScope.$new(true);
          var backdropShown = false;
          var isKeyboardShown = false;

          //if container option is set, determine the container element by querying for the container class
          if (opts.container) {
            opts.container = $body.querySelector(opts.container);
          }

          //extend scope defaults with supplied options
          angular.extend(scope, {
            config: templateConfig,
            $deregisterBackButton: angular.noop,
            update: angular.noop,
            cancel: angular.noop,
            done: angular.noop,
            scrollDelegate: $ionicScrollDelegate,
            filter: $filter('filter'),
            filterProperties: null,
            expression: null,
            comparator: null,
            debounce: true,
            delay: 300,
            cancelText: 'Cancel',
            cancelOnStateChange: true,
            container: $body,
            favoritesTitle: 'Favorite Searches',
            favoritesAddPlaceholder: 'Add a search term',
            favoritesEnabled: false,
            favoritesKey: 'ionic_filter_bar_favorites'
          }, opts);

          scope.data = {filterText: ''};

          //if no custom theme was configured, get theme of containers bar-header
          if (!scope.config.theme) {
            scope.config.theme = getNavBarTheme(scope.container.querySelector('.bar.bar-header'));
          }

          // Compile the template
          var element = scope.element = $compile('<ion-filter-bar class="filter-bar"></ion-filter-bar>')(scope);

          // Grab required jQLite elements
          var filterWrapperEl = element.children().eq(0);
          var input = filterWrapperEl.find('input')[0];
          var backdropEl = element.children().eq(1);

          //get scrollView
          var scrollView = scope.scrollDelegate.getScrollView();
          var canScroll = !!scrollView;

          //get the scroll container if scrolling is available
          var $scrollContainer = canScroll ? scrollView.__container : null;

          var stateChangeListenDone = scope.cancelOnStateChange ?
            $rootScope.$on('$stateChangeSuccess', function () { scope.cancelFilterBar(); }) :
            angular.noop;

          // Focus the input which will show the keyboard.
          var showKeyboard = function () {
            if (!isKeyboardShown) {
              isKeyboardShown = true;
              input && input.focus();
            }
          };

          // Blur the input which will hide the keyboard.
          // Even if we need to bring in ionic.keyboard in the future, blur is preferred so keyboard animates out.
          var hideKeyboard = function () {
            if (isKeyboardShown) {
              isKeyboardShown = false;
              input && input.blur();
            }
          };

          // When the filtered list is scrolled, we want to hide the keyboard as long as it's not already hidden
          var handleScroll = function () {
            if (scrollView.__scrollTop > 0) {
              hideKeyboard();
            }
          };

          // Scrolls the list of items to the top via the scroll delegate
          scope.scrollItemsTop = function () {
            if (canScroll && scrollView.__scrollTop > 0 && scope.scrollDelegate.scrollTop) {
              scope.scrollDelegate.scrollTop();
            }
          };

          // Set isKeyboardShown to force showing keyboard on search focus.
          scope.focusInput = function () {
            isKeyboardShown = false;
            showKeyboard();
          };

          // Hide the filterBar backdrop if in the DOM and not already hidden.
          scope.hideBackdrop = function () {
            if (backdropEl.length && backdropShown) {
              backdropShown = false;
              backdropEl.removeClass('active').css('display', 'none');
            }
          };

          // Show the filterBar backdrop if in the DOM and not already shown.
          scope.showBackdrop = function () {
            if (backdropEl.length && !backdropShown) {
              backdropShown = true;
              backdropEl.css('display', 'block').addClass('active');
            }
          };

          scope.showModal = function () {
            scope.modal = $ionicModal.fromTemplate(filterBarModalTemplate, {
              scope: scope
            });
            scope.modal.show();
          };

          // Filters the supplied list of items via the supplied filterText.
          // How items are filtered depends on the supplied filter object, and expression
          // Filtered items will be sent to update
          scope.filterItems = function(filterText) {
            var filterExp, filteredItems;

            // pass back original list if filterText is empty.
            // Otherwise filter by expression, supplied properties, or filterText.
            if (!filterText.length) {
              filteredItems = scope.items;
            } else {
              if (scope.expression) {
                filterExp = angular.bind(this, scope.expression, filterText);
              } else if (angular.isArray(scope.filterProperties)) {
                filterExp = {};
                angular.forEach(scope.filterProperties, function (property) {
                  filterExp[property] = filterText;
                });
              } else if (scope.filterProperties) {
                filterExp = {};
                filterExp[scope.filterProperties] = filterText;
              } else {
                filterExp = filterText;
              }

              filteredItems = scope.filter(scope.items, filterExp, scope.comparator);
            }

            $timeout(function() {
              scope.update(filteredItems, filterText);
              scope.scrollItemsTop();
            });
          };

          // registerBackButtonAction returns a callback to deregister the action
          scope.$deregisterBackButton = $ionicPlatform.registerBackButtonAction(
            function() {
              $timeout(scope.cancelFilterBar);
            }, 300
          );

          // Removes the filterBar from the body and cleans up vars/events.  Once the backdrop is hidden we can invoke done
          scope.removeFilterBar = function(done) {
            if (scope.removed) return;

            scope.removed = true;

            //animate the filterBar out, hide keyboard and backdrop
            ionic.requestAnimationFrame(function () {
              filterWrapperEl.removeClass('filter-bar-in');
              hideKeyboard();
              scope.hideBackdrop();

              //Wait before cleaning up so element isn't removed before filter bar animates out
              $timeout(function () {
                scope.scrollItemsTop();
                scope.update(scope.items);

                scope.$destroy();
                element.remove();
                scope.cancelFilterBar.$scope = scope.modal = $scrollContainer = scrollView = filterWrapperEl = backdropEl = input = null;
                isShown = false;
                (done || angular.noop)();
              }, 350);
            });

            $timeout(function () {
              // wait to remove this due to a 300ms delay native
              // click which would trigging whatever was underneath this
              scope.container.classList.remove('filter-bar-open');
            }, 400);

            scope.$deregisterBackButton();
            stateChangeListenDone();

            //unbind scroll event
            if ($scrollContainer) {
              $scrollContainer.removeEventListener('scroll', handleScroll);
            }
          };

          // Appends the filterBar to the body.  Once the backdrop is hidden we can invoke done
          scope.showFilterBar = function(done) {
            if (scope.removed) return;

            scope.container.appendChild(element[0]);
            scope.container.classList.add('filter-bar-open');

            //scroll items to the top before starting the animation
            scope.scrollItemsTop();

            //start filterBar animation, show backrop and focus the input
            ionic.requestAnimationFrame(function () {
              if (scope.removed) return;

              $timeout(function () {
                filterWrapperEl.addClass('filter-bar-in');
                scope.focusInput();
                scope.showBackdrop();
                (done || angular.noop)();
              }, 20, false);
            });

            if ($scrollContainer) {
              $scrollContainer.addEventListener('scroll', handleScroll);
            }
          };

          // called when the user presses the backdrop, cancel/back button, changes state
          scope.cancelFilterBar = function() {
            // after the animation is out, call the cancel callback
            scope.removeFilterBar(scope.cancel);
          };

          scope.showFilterBar(scope.done);

          // Expose the scope on $ionFilterBar's return value for the sake of testing it.
          scope.cancelFilterBar.$scope = scope;

          return scope.cancelFilterBar;
        }

        return {
          show: filterBar
        };
      }]);


})(angular, ionic);

/* global angular */
(function (angular) {
  'use strict';

  angular.module('jett.ionic.filter.bar')
    .controller('$ionicFilterBarModalCtrl', [
      '$window',
      '$scope',
      '$timeout',
      '$ionicListDelegate',
      function ($window, $scope, $timeout, $ionicListDelegate) {
        var searchesKey = $scope.$parent.favoritesKey;

        $scope.displayData = {showReorder: false};
        $scope.searches = angular.fromJson($window.localStorage.getItem(searchesKey)) || [];
        $scope.newItem = {text: ''};

        $scope.moveItem = function(item, fromIndex, toIndex) {
          item.reordered = true;
          $scope.searches.splice(fromIndex, 1);
          $scope.searches.splice(toIndex, 0, item);

          $timeout(function () {
            delete item.reordered;
          }, 500);
        };

        $scope.deleteItem = function(item) {
          var index = $scope.searches.indexOf(item);
          $scope.searches.splice(index, 1);
        };

        $scope.addItem = function () {
          if ($scope.newItem.text) {
            $scope.searches.push({
              text: $scope.newItem.text
            });
            $scope.newItem.text = '';
          }
        };

        $scope.closeModal = function () {
          $window.localStorage.setItem(searchesKey, angular.toJson($scope.searches));
          $scope.$parent.modal.remove();
        };

        $scope.itemClicked = function (filterText, $event) {
          var isOptionButtonsClosed = !!$event.currentTarget.querySelector('.item-options.invisible');

          if (isOptionButtonsClosed) {
            $scope.closeModal();
            $scope.$parent.hideBackdrop();
            $scope.$parent.data.filterText = filterText;
            $scope.$parent.filterItems(filterText);
          } else {
            $ionicListDelegate.$getByHandle('searches-list').closeOptionButtons();
          }
        };

      }]);

})(angular);
