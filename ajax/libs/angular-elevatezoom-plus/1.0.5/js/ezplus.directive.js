(function () {
    'use strict';

    angular.module('ezplus')
        .directive('ezPlus', ezPlus);

    function ezPlus() {
        var service = {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            link: link
        };
        return service;

        ////////////////////////////


        link.$inject = ['scope', 'element'];
        function link(scope, element, attrs) {
            scope.appendto = typeof(attrs.appendto) !== 'undefined' ? attrs.appendto : null;

            scope.$on("ezp-hidesAll", function (e, msg) {
                var plugin = angular.element(element).data('ezPlus');
                if (plugin) {
                    plugin.showHideWindow('hide');
                    plugin.showHideTint('hide');
                    plugin.showHideLens('hide');
                }
            });
            scope.$on("ezp-showAll", function (e, msg) {
                var plugin = angular.element(element).data('ezPlus');
                if (plugin) {
                    plugin.showHideWindow('show');
                    plugin.showHideTint('show');
                    plugin.showHideLens('show');
                }
            });
            scope.$on("ezp-disableZoom", function (e, msg) {
                var plugin = angular.element(element).data('ezPlus');
                if (plugin) {
                    plugin.changeState('disable');
                }
            });
            scope.$on("ezp-enableZoom", function (e, msg) {
                var plugin = angular.element(element).data('ezPlus');
                if (plugin) {
                    plugin.changeState('enable');
                }
            });
            scope.$watch('ngModel', function (image) {
                var thumbMediumUrl = (image && image.thumbMediumUrl) || '';
                var fullSizeUrl = (image && image.fullSizeUrl) || '';

                var plugin = angular.element(element).data('ezPlus');
                if (plugin) {
                    if (image) {
                        var loader = 'images/loader-small.gif';
                        plugin.showHideWindow();
                        plugin.swaptheimage(loader, loader);
                        plugin.swaptheimage(thumbMediumUrl, fullSizeUrl);
                    } else {
                        plugin.closeAll();
                    }
                } else {
                    if (image) {
                        element.attr('src', thumbMediumUrl);
                        element.attr('data-zoom-image', fullSizeUrl);
                        var options = {
                            scrollZoom: true,
                            zoomWindowWidth: 600,
                            zoomWindowHeight: 600,
                            easing: true,
                            zoomWindowFadeIn: 500,
                            zoomWindowFadeOut: 500,
                            lensFadeIn: 500,
                            lensFadeOut: 500
                        };
                        if (scope.appendto) {
                            options.zoomContainerAppendTo = scope.appendto;
                        }
                        angular.element(element).ezPlus(options);
                    }
                }
            });

            scope.$on('$destroy', function () {
                element.remove();
            });
        }
    }

})
();
