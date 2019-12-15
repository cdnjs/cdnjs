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
        function link(scope, element) {
            scope.$watch('ngModel', function (image) {
                var thumbMediumUrl = (image && image.thumbMediumUrl) || '';
                var fullSizeUrl = (image && image.fullSizeUrl) || '';

                var plugin = angular.element(element).data('ezPlus');
                if (plugin) {
                    var loader = 'images/loader-small.gif';
                    plugin.swaptheimage(loader, loader);
                    plugin.swaptheimage(thumbMediumUrl, fullSizeUrl);
                } else if (image) {
                    element.attr('src', thumbMediumUrl);
                    element.attr('data-zoom-image', fullSizeUrl);
                    angular.element(element).ezPlus({
                        scrollZoom: true,
                        zoomWindowWidth: 600,
                        zoomWindowHeight: 600,
                        easing : true,
                        zoomWindowFadeIn: 500,
                        zoomWindowFadeOut: 500,
                        lensFadeIn: 500,
                        lensFadeOut: 500
                    });
                }
            });

            scope.$on('$destroy', function () {
                element.remove();
            });
        }
    }

})
();
