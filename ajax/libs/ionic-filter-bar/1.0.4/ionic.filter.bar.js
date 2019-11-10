angular.module('jett.ionic.filter.bar', ['ionic']);
(function (angular) {
  'use strict';

  angular.module('jett.ionic.filter.bar')
    .directive('ionFilterBar', [
      '$document',
      '$timeout',
      '$ionicGesture',
      '$ionicPlatform',
      function ($document, $timeout, $ionicGesture, $ionicPlatform) {
        var filterBarTemplate;

        //create platform specific filterBar template using filterConfig items
        if ($ionicPlatform.is('android')) {
          filterBarTemplate =
            '<div class="filter-bar-wrapper filter-bar-{{::config.theme}} filter-bar-transition-{{::config.transition}}">' +
              '<div class="bar bar-header bar-{{::config.theme}} item-input-inset">' +
                '<button class="filter-bar-cancel button button-icon icon {{::config.back}}"></button>' +
                '<label class="item-input-wrapper">' +
                  '<input type="search" class="filter-bar-search" ng-model="filterText" placeholder="{{::config.placeholder}}" />' +
                  '<button style="display:none;" class="filter-bar-clear button button-icon icon {{::config.clear}}"></button>' +
                '</label>' +
              '</div>' +
            '</div>';
        } else {
          filterBarTemplate =
            '<div class="filter-bar-wrapper filter-bar-{{::config.theme}} filter-bar-transition-{{::config.transition}}">' +
              '<div class="bar bar-header bar-{{::config.theme}} item-input-inset">' +
                '<label class="item-input-wrapper">' +
                  '<i class="icon {{::config.search}} placeholder-icon"></i>' +
                  '<input type="search" class="filter-bar-search" ng-model="filterText" placeholder="{{::config.placeholder}}"/>' +
                  '<button style="display:none;" class="filter-bar-clear button button-icon icon {{::config.clear}}"></button>' +
                '</label>' +
                '<button class="filter-bar-cancel button button-clear" ng-bind-html="::cancelText"></button>' +
              '</div>' +
            '</div>';
        }

        return {
          restrict: 'E',
          scope: true,
          link: function ($scope, $element) {
            var clearEl = angular.element($element[0].querySelector('.filter-bar-clear'));
            var cancelEl = angular.element($element[0].querySelector('.filter-bar-cancel'));
            var inputEl = $element.find('input');
            var filterTextTimeout;
            var swipeGesture;
            var backdrop;
            var backdropClick;
            var filterWatch;

            $scope.filterText = '';

            // Action when filter bar is cancelled via backdrop click/swipe or cancel/back buton click.
            // Invokes cancel function defined in filterBar service
            var cancelFilterBar = function () {
              $scope.cancelFilterBar();
            };

            cancelEl.bind('click', cancelFilterBar);

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

            // No need to hide/show clear button via ng-show since we can easily do this with jqLite.  inline is fastest
            var showClearButton = function () {
              if(clearEl.css('display') === 'none') {
                clearEl.css('display', 'block');
              }
            };
            var hideClearButton = function () {
              if(clearEl.css('display') === 'block') {
                clearEl.css('display', 'none');
              }
            };

            // When clear button is clicked, clear filterText, hide clear button, show backdrop, and focus the input
            var clearClick = function () {
              $timeout(function () {
                $scope.filterText = '';
                hideClearButton();
                ionic.requestAnimationFrame(function () {
                  $scope.showBackdrop();
                  $scope.scrollItemsTop();
                  $scope.focusInput();
                });
              });
            };

            // Since we are wrapping with label, need to bind touchstart rather than click.
            // Even if we use div instead of label need to bind touchstart.  Click isn't allowing input to regain focus quickly
            clearEl.bind('touchstart mousedown', clearClick);

            // Bind touchstart so we can regain focus of input even while scrolling
            inputEl.bind('touchstart mousedown', function () {
              $scope.scrollItemsTop();
              $scope.focusInput();
            });

            // When a non escape key is pressed, show/hide backdrop/clear button based on filterText length
            var keyUp = function(e) {
              if (e.which == 27) {
                cancelFilterBar();
              } else if ($scope.filterText && $scope.filterText.length) {
                showClearButton();
                $scope.hideBackdrop();
              } else {
                hideClearButton();
                $scope.showBackdrop();
              }
            };

            $document.bind('keyup', keyUp);

            // Calls the services filterItems function with the filterText to filter items
            var filterItems = function () {
              $scope.filterItems($scope.filterText);
            };

            // Clean up when scope is destroyed
            $scope.$on('$destroy', function() {
              $element.remove();
              $document.unbind('keyup', keyUp);
              if (backdrop) {
                $ionicGesture.off(swipeGesture, 'swipe', backdropClick);
              }
              filterWatch();
            });

            // Watch for changes on filterText and call filterItems when filterText has changed.
            // If debounce is enabled, filter items by the specified or default delay.
            // Prefer timeout debounce over ng-model-options so if filterText is cleared, initial items show up right away with no delay
            filterWatch = $scope.$watch('filterText', function (newFilterText, oldFilterText) {
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

})(angular);

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
      '$ionicScrollDelegate',
      function ($document, $rootScope, $compile, $timeout, $filter, $ionicPlatform, $ionicFilterBarConfig, $ionicConfig, $ionicScrollDelegate) {
        var isShown = false;
        var $body = angular.element($document[0].body);
        var templateConfig = {
          theme: $ionicFilterBarConfig.theme(),
          transition: $ionicFilterBarConfig.transition(),
          back: $ionicConfig.backButton.icon(),
          clear: $ionicFilterBarConfig.clear(),
          search: $ionicFilterBarConfig.search(),
          backdrop: $ionicFilterBarConfig.backdrop(),
          placeholder: $ionicFilterBarConfig.placeholder()
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
            opts.container = angular.element($body[0].querySelector(opts.container));
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
            debounce: true,
            delay: 300,
            cancelText: 'Cancel',
            cancelOnStateChange: true,
            container: $body
          }, opts);

          //if no custom theme was configured, get theme of containers bar-header
          if (!scope.config.theme) {
            scope.config.theme = getNavBarTheme(scope.container[0].querySelector('.bar.bar-header'));
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
          var $scrollContainer = canScroll ? angular.element(scrollView.__container) : null;

          var stateChangeListenDone = scope.cancelOnStateChange ?
            $rootScope.$on('$stateChangeSuccess', function() { scope.cancelFilterBar(); }) :
            angular.noop;

          // Focus the input which will show the keyboard.
          var showKeyboard = function () {
            if (!isKeyboardShown) {
              isKeyboardShown = true;
              input && input.focus();
            }
          };

          // Blur the input which will hide the keyboard.
          // Even if we need to bring in ionic.keyboard in the future, blur is preferred for iOS so keyboard animates out.
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
            canScroll && scope.scrollDelegate.scrollTop && scope.scrollDelegate.scrollTop();
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

          // Filters the supplied list of items via the supplied filterText.
          // How items are filtered depends on the supplied filter object, and expression
          // Filtered items will be sent to update
          scope.filterItems = function(filterText) {
            var filterExp, filteredItems;

            // pass back original list if filterText is empty.  Otherwise filter by supplied properties, or filterText
            if (!filterText.length) {
              filteredItems = scope.items;
            } else {
              if (angular.isArray(scope.filterProperties)) {
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

              filteredItems = scope.filter(scope.items, filterExp);
            }

            $timeout(function() {
              scope.update(filteredItems);
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
                scope.cancelFilterBar.$scope = $scrollContainer = scrollView = filterWrapperEl = backdropEl = input = null;
                isShown = false;
                (done || angular.noop)();
              }, 350);
            });

            $timeout(function () {
              // wait to remove this due to a 300ms delay native
              // click which would trigging whatever was underneath this
              scope.container.removeClass('filter-bar-open');
            }, 400);

            scope.$deregisterBackButton();
            stateChangeListenDone();

            //unbind scroll event
            if ($scrollContainer) {
              $scrollContainer.off('scroll', handleScroll);
            }
          };

          // Appends the filterBar to the body.  Once the backdrop is hidden we can invoke done
          scope.showFilterBar = function(done) {
            if (scope.removed) return;

            scope.container.append(element).addClass('filter-bar-open');

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
              $scrollContainer.on('scroll', handleScroll);
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
