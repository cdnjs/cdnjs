(function () {
    'use strict';

    angular.module('ezplus', [])
        .directive('ezPlus', ezPlus);

    ezPlus.$inject = ['$document'];
    function ezPlus($document) {
        var service = {
            restrict: 'A',
            scope: {
                ezpModel: '=',
                ezpOptions: '=',
                onComplete: '=ezpOnComplete',
                onDestroy: '=ezpOnDestroy',
                onImageClick: '=ezpOnImageClick',
                onImageSwap: '=ezpOnImageSwap',
                onImageSwapComplete: '=ezpOnImageSwapComplete',
                onShow: '=ezpOnShow',
                onZoomedImageLoaded: '=ezpOnZoomedImageLoaded'
            },
            link: link
        };
        return service;

        ////////////////////////////

        link.$inject = ['$scope', '$element', '$attributes'];
        function link($scope, $element, $attributes) {
            var bootstrapped = false;
            var lastPlugin = null;
            var zoomIds = {};
            var options = {
                onComplete: function () {
                    if ($scope.onComplete && $scope.onComplete()) {
                        $scope.onComplete()();
                    }
                },
                onDestroy: function () {
                    if ($scope.onDestroy && $scope.onDestroy()) {
                        $scope.onDestroy()();
                    }
                },
                onImageClick: function () {
                    if ($scope.onImageClick && $scope.onImageClick()) {
                        $scope.onImageClick()();
                    }
                },

                onImageSwap: function () {
                    if ($scope.onImageSwap && $scope.onImageSwap()) {
                        $scope.onImageSwap()();
                    }
                },
                onImageSwapComplete: function () {
                    if ($scope.onImageSwapComplete && $scope.onImageSwapComplete()) {
                        $scope.onImageSwapComplete()();
                    }
                },
                onShow: function () {
                    if ($scope.onShow && $scope.onShow()) {
                        $scope.onShow()();
                    }
                },
                onZoomedImageLoaded: function () {
                    if ($scope.onZoomedImageLoaded && $scope.onZoomedImageLoaded()) {
                        $scope.onZoomedImageLoaded()();
                    }
                }
            };

            //generic way that sets all (non-function) parameters of elevate zoom plus.
            if ($scope.ezpOptions) {
                angular.extend(options, $scope.ezpOptions);
            }
            if (options.appendto) {
                options.zoomContainerAppendTo = options.appendto;
            }

            var loader;
            if (options.loader) {
                loader = options.loader;
            }

            $scope.$on('ezp-hidesAll', function (e, msg) {
                hideZoom();
            });
            $scope.$on('ezp-showAll', function (e, msg) {
                showZoom();
            });
            $scope.$on('ezp-disableZoom', function (e, msg) {
                var plugin = getZoomPlugin();
                if (plugin) {
                    plugin.changeState('disable');
                }
            });
            $scope.$on('ezp-enableZoom', function (e, msg) {
                var plugin = getZoomPlugin();
                if (plugin) {
                    plugin.changeState('enable');
                }
            });
            //updates options dynamically by deeply watching the options object
            $scope.$watch('ezpOptions', function (newValue, oldValue) {
                if (!bootstrapped) {
                    bootstrapped = true;
                } else {
                    var plugin = getZoomPlugin();
                    plugin.destroy();
                    angular.extend(options, $scope.ezpOptions);
                    if (plugin) {
                        preparePlugin($element, options);
                    }
                }
            }, true);
            $scope.$watch('ezpModel', function (newValue, oldValue) {
                var image = newValue;
                var thumbUrl = (image && image.thumb) || '';
                var smallUrl = (image && image.small) || '';
                var largeUrl = (image && image.large) || '';

                var initialUrl = null;
                var plugin = getZoomPlugin();
                if (plugin && plugin.options.enabled) {
                    if (image) {
                        hideZoom();
                        if (loader) {
                            plugin.swaptheimage(loader, loader);
                        }

                        initialUrl = getInitialUrl(options, smallUrl);
                        $element.data($scope.ezpOptions.attrImageZoomSrc || 'zoom-image', $scope.ezpModel.large || '');
                        plugin.swaptheimage(initialUrl, largeUrl);
                        showZoom();
                    } else {
                        plugin.closeAll();
                    }
                } else {
                    if (image) {

                        initialUrl = getInitialUrl(options);
                        if (initialUrl) {
                            $element.attr('src', initialUrl);
                        }

                        $element.data($scope.ezpOptions.attrImageZoomSrc || 'zoom-image', $scope.ezpModel.large || '');

                        preparePlugin($element, options);
                    }
                }

                function getInitialUrl(options, defaultUrl) {
                    var initialUrl = defaultUrl;
                    if (options.initial === 'thumb') {
                        initialUrl = thumbUrl;
                    } else if (options.initial === 'small') {
                        initialUrl = smallUrl;
                    } else if (options.initial === 'large') {
                        initialUrl = largeUrl;
                    }
                    return initialUrl;
                }
            });

            $scope.$on('$destroy', destroyPlugin);

            function destroyPlugin() {
                var plugin = getZoomPlugin();
                if (plugin) {
                    plugin.destroy();
                }

                //in case the $destroy is called after the actual plugin element was removed, otherwise zoom containers
                //will be visible.
                for (var zoomId in zoomIds) {
                    if (zoomIds.hasOwnProperty(zoomId)) {
                        var zoomContainer = findZoomContainer(zoomId);
                        zoomContainer.remove();
                    }
                }
                zoomIds = {};
            }

            function findZoomContainer(uuid) {
                return angular.element($document).find('[uuid=' + uuid + ']');
            }

            function preparePlugin(element, options) {
                var plugin = angular.element(element).ezPlus(options);
                lastPlugin = plugin && plugin.length > 0 ? getZoomPlugin(plugin[0]) : null;
                if (lastPlugin) {
                    zoomIds[lastPlugin.options.zoomId] = true;
                }
                return lastPlugin;
            }

            function getZoomPlugin(element) {
                var plugin = angular.element(element ? element : $element).data('ezPlus');
                return plugin;
            }

            function hideZoom() {
                var action = 'hide';
                var plugin = getZoomPlugin();
                if (plugin) {
                    plugin.showHideZoomContainer(action);
                    /*plugin.showHideWindow(action);
                     plugin.showHideTint(action);
                     plugin.showHideLens(action);*/
                }
            }

            function showZoom() {
                var action = 'show';
                var plugin = getZoomPlugin();
                if (plugin) {
                    /*plugin.showHideLens(action);
                     plugin.showHideTint(action);
                     plugin.showHideWindow(action);*/
                    plugin.showHideZoomContainer(action);
                }
            }
        }
    }

})
();
