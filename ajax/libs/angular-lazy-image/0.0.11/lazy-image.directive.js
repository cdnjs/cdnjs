/* global angular */
angular.module('afkl.lazyImage')
    .directive('afklImageContainer', function () {
        'use strict';

        return {
            restrict: 'A',
            // We have to use controller instead of link here so that it will always run earlier than nested afklLazyImage directives
            controller: ['$scope', '$element', function ($scope, $element) {
                $element.data('afklImageContainer', $element);
            }]
        };
    })
    .directive('afklLazyImage', ['$window', '$timeout', 'afklSrcSetService', '$parse', function ($window, $timeout, srcSetService, $parse) {
        'use strict';

        // Use srcSetService to find out our best available image
        var bestImage = function (images) {
            var image = srcSetService.get({srcset: images});
            var sourceUrl;
            if (image) {
                sourceUrl = image.best.src;
            }
            return sourceUrl;
        };

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                // CONFIGURATION VARS
                var $container = element.inheritedData('afklImageContainer');
                if (!$container) {
                    $container = angular.element(attrs.afklLazyImageContainer || $window);
                }

                var loaded = false;
                var timeout;

                var images = attrs.afklLazyImage; // srcset attributes
                var options = attrs.afklLazyImageOptions ? $parse(attrs.afklLazyImageOptions)(scope) : {}; // options (background, offset)

                var img; // Angular element to image which will be placed
                var currentImage = null; // current image url
                var offset = options.offset ? options.offset : 50; // default offset
                var alt = options.alt ? 'alt="' + options.alt + '"' : 'alt=""';

                var LOADING = 'afkl-lazy-image-loading';


                var _containerScrollTop = function () {
                    // See if we can use jQuery, with extra check
                    // TODO: check if number is returned
                    if ($container.scrollTop) {
                        var scrollTopPosition = $container.scrollTop();
                        if (scrollTopPosition) {
                            return scrollTopPosition;
                        }
                    }

                    var c = $container[0];
                    if (c.pageYOffset !== undefined) {
                        return c.pageYOffset;
                    }
                    else if (c.scrollTop !== undefined) {
                        return c.scrollTop;
                    }

                    return document.documentElement.scrollTop || 0;
                };

                var _containerInnerHeight = function () {
                    if ($container.innerHeight) {
                        return $container.innerHeight();
                    }

                    var c = $container[0];
                    if (c.innerHeight !== undefined) {
                        return c.innerHeight;
                    } else if (c.clientHeight !== undefined) {
                        return c.clientHeight;
                    }

                    return document.documentElement.clientHeight || 0;
                };

                // Begin with offset and update on resize
                var _elementOffset = function () {
                    if (element.offset) {
                        return element.offset().top;
                    }
                    var box = element[0].getBoundingClientRect();
                    return box.top + _containerScrollTop() - document.documentElement.clientTop;
                };

                var _elementOffsetContainer = function () {
                    if (element.offset) {
                        return element.offset().top - $container.offset().top;
                    }
                    return element[0].getBoundingClientRect().top - $container[0].getBoundingClientRect().top;
                };

                // Update url of our image
                var _setImage = function () {
                    if (options.background) {
                        element[0].style.backgroundImage = 'url("' + currentImage +'")';
                    } else {
                        img[0].src = currentImage;
                    }
                };

                // Append image to DOM
                var _placeImage = function () {

                    loaded = true;
                    // What is my best image available
                    var hasImage = bestImage(images);

                    if (hasImage) {
                        // we have to make an image if background is false (default)
                        if (!options.background) {
                            
                            if (!img) {
                                // element.addClass(LOADING);
                                img = angular.element('<img ' + alt + ' class="afkl-lazy-image" src=""/>');
                                // img.one('load', _loaded);
                                // remove loading class when image is acually loaded
                                element.append(img);
                            }

                        }

                        // set correct src/url
                        _checkIfNewImage();
                    }

                    // Element is added to dom, no need to listen to scroll anymore
                    $container.off('scroll', _onViewChange);

                };

                // Check on resize if actually a new image is best fit, if so then apply it
                var _checkIfNewImage = function () {
                    if (loaded) {
                        var newImage = bestImage(images);
                        if (newImage !== currentImage) {
                            // update current url
                            currentImage = newImage;

                            if (!options.background) {
                                element.addClass(LOADING);
                                img.one('load', _loaded);
                            }
                            
                            // update image url
                            _setImage();
                        }
                    }
                };

                // First update our begin offset
                _checkIfNewImage();

                var _loaded = function () {
                    element.removeClass(LOADING);
                };

                // Check if the container is in view for the first time. Utilized by the scroll and resize events.
                var _onViewChange = function () {
                    // Config vars
                    var remaining, shouldLoad, windowBottom;

                    var height = _containerInnerHeight();
                    var scroll = _containerScrollTop();

                    var elOffset = $container[0] === $window ? _elementOffset() : _elementOffsetContainer();
                    windowBottom = $container[0] === $window ? height + scroll : height;

                    remaining = elOffset - windowBottom;

                    // Is our top of our image container in bottom of our viewport?
                    //console.log($container[0].className, _elementOffset(), _elementPosition(), height, scroll, remaining, elOffset);
                    shouldLoad = remaining <= offset;


                    // Append image first time when it comes into our view, after that only resizing can have influence
                    if (shouldLoad && !loaded) {

                        _placeImage();

                    }
                };

                // EVENT: RESIZE THROTTLED
                var _onResize = function () {
                    $timeout.cancel(timeout);
                    timeout = $timeout(function() {
                        _checkIfNewImage();
                        _onViewChange();
                    }, 300);
                };


                // Remove events for total destroy
                var _eventsOff = function() {

                    $timeout.cancel(timeout);

                    $container.off('scroll', _onViewChange);
                    angular.element($window).off('resize', _onResize);
                    if ($container[0] !== $window) {
                        $container.off('resize', _onResize);
                    }

                    // remove image being placed
                    if (img) {
                        img.remove();
                    }

                    img = timeout = currentImage = undefined;
                };



                // Set events for scrolling and resizing
                $container.on('scroll', _onViewChange);
                angular.element($window).on('resize', _onResize);

                if ($container[0] !== $window) {
                    $container.on('resize', _onResize);
                }

                // events for image change
                attrs.$observe('afklLazyImage', function () {
                    images = attrs.afklLazyImage;
                    if (loaded) {
                        _placeImage();
                    }
                });

                // Image should be directly placed
                if (options.nolazy) {
                    _placeImage();
                }

                // Remove all events when destroy takes place
                scope.$on('$destroy', function () {
                    return _eventsOff();
                });

                return _onViewChange();

            }
        };

}]);
