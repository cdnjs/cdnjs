angular.module('ImgCache', [])

.provider('ImgCache', function() {

    ImgCache.$init = function() {

        ImgCache.init(function() {
            ImgCache.$deferred.resolve();
        }, function() {
            ImgCache.$deferred.reject();
        });
    }

    this.manualInit = false;

    this.setOptions = function(options) {
        angular.extend(ImgCache.options, options);
    }

    this.setOption = function(name, value) {
        ImgCache.options[name] = value;
    }

    this.$get = ['$q', function ($q) {

        ImgCache.$deferred = $q.defer();
        ImgCache.$promise = ImgCache.$deferred.promise;

        if(!this.manualInit) {
            ImgCache.$init();
        }

        return ImgCache;
    }];

})

.directive('imgCache', ['ImgCache', function() {

    return {
        restrict: 'A',
        scope: {
            icBg: '@',
            icSrc: '@'
        },
        link: function(scope, el, attrs) {

            var setImg = function(type, el, src) {

                ImgCache.getCachedFileURL(src, function(src, dest) {

                    if(type === 'bg') {
                        el.css({'background-image': 'url(' + dest + ')' });
                    } else {
                        el.attr('src', dest);
                    }
                });
            }

            var loadImg = function(type, el, src) {

                ImgCache.$promise.then(function() {

                    ImgCache.isCached(src, function(path, success) {

                        if (success) {
                            setImg(type, el, src);
                        } else {
                            ImgCache.cacheFile(src, function() {
                                setImg(type, el, src);
                            });
                        }

                    });
                });
            }

            attrs.$observe('icSrc', function(src) {

                loadImg('src', el, src);

            });

            attrs.$observe('icBg', function(src) {

                loadImg('bg', el, src);

            });

        }
    };
}]);