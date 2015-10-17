/**
 * @ngdoc overview
 * @name angularVideoBg
 * @description This module contains a directive that allows you easily make a YouTube video play as the background of
 * any container on your site.
 */

angular.module('angularVideoBg', []);

/**
 * @ngdoc directive
 * @name angularVideoBg.directive:videoBg
 * @description This directive makes it super simple to turn the background of any element on your site into a YouTube
 * video. All you need is the video id! You can place content within the directive and it will be transcluded over top
 * of the video background.
 * @element <video-bg video-id="videoId" ratio="ratio" loop="loop" mute="mute" start="start" content-z-index="contentZIndex" allow-click-events="allowClickEvents"></video-bg>
 */
angular.module('angularVideoBg').directive('videoBg', function($window, $q) {
	return {
		restrict: 'EA',
		replace: true,
		scope: {
            videoId: '=',
            ratio: '=?',
            loop: '=?',
            mute: '=?',
            start: '=?',
            contentZIndex: '=?',
            allowClickEvents: '=?'
		},
        transclude: true,
		template: '<div><div id="player"></div><div ng-transclude></div></div>',
		link: function(scope, element, attrs, fn) {

            element.css({
                position: 'relative',
                overflow: 'hidden'
            });
            scope.ratio = scope.ratio || 16/9;
            scope.mute = scope.mute === undefined ? true : scope.mute;

            var computedStyles = $window.getComputedStyle(element[0]),
                ytd = $q.defer(),
                tag = document.createElement('script'),
                player,
                parentDimensions,
                playerDimensions;

            /**
             * @ngdoc method
             * @name getPropertyAllSides
             * @methodOf angularVideoBg.directive:videoBg
             * @description This method takes a property such as margin and returns the computed styles for all four
             * sides of the parent container.
             * @param {string} property - the css property to get
             * @param {Function} func - the function to call on computedStyles
             * @returns {object} - object that contains all four property sides (top, right, bottom, top)
             * @example
             * getPropertyAllSides('margin', computedStyles.getPropertyValue);
             * // returns { margin-top: 10, margin-right: 10, margin-bottom: 10, margin-left: 10 }
             */
            function getPropertyAllSides(property, func) {
                var sides = ['top', 'right', 'bottom', 'left'],
                    getProperty = function(obj, side) {
                        obj[side] = parseInt(func.call(computedStyles, property + '-' + side), 10);
                        return obj;
                    };
                return sides.reduce(getProperty, {});
            }

            /**
             * @ngdoc method
             * @name calculateParentDimensions
             * @methodOf angularVideoBg.directive:videoBg
             * @description This method takes the dimensions (width and height) of the parent, as well as the "spacers"
             * (simply all of the margin, padding and border values) and adds the margin, padding and border values to
             * the dimensions in order to get back the outer dimensions of the parent.
             * @param {object} dimensions - width and height of parent container
             * @param {object} spacers - margin, padding and border values of parent container
             * @returns {{width: number, height: number}}
             * @example
             *
             * var dimensions = {
             *      width: 1000,
             *      height: 400
             * };
             *
             * var spacers = {
             *      margin: {
             *          top: 10,
             *          right: 10,
             *          bottom: 10,
             *          left: 10
             *      },
             *      padding: {
             *          top: 0,
             *          right: 10,
             *          bottom: 0,
             *          left: 10
             *      },
             *      border: {
             *          top: 0,
             *          right: 0,
             *          bottom: 0,
             *          left: 0
             *      }
             * };
             *
             * calculateParentDimensions(dimensions, spacers);
             * // returns { width: 1040, height: 420 }
             *
             */
            function calculateParentDimensions(dimensions, spacers) {
                function calculateSpacerValues() {
                    var args = Array.prototype.slice.call(arguments),
                        spacer,
                        sum = 0,
                        sumValues = function(_sum, arg) {
                            return _sum + spacer[arg];
                        };
                    for (var key in spacers) {
                        if (spacers.hasOwnProperty(key)) {
                            spacer = spacers[key];
                            sum += args.reduce(sumValues, 0);
                        }
                    }
                    return sum;
                }
                return {
                    width: dimensions.width + calculateSpacerValues('left', 'right'),
                    height: dimensions.height + calculateSpacerValues('top', 'bottom')
                };
            }

            /**
             * @ngdoc method
             * @name getParentDimensions
             * @methodOf angularVideoBg.directive:videoBg
             * @description This method utilizes the getPropertyAllSides and calculateParentDimensions in order to get
             * the parent container dimensions and return them.
             * @returns {{width: number, height: number}}
             */
            function getParentDimensions() {
                var dimensionProperties = ['width', 'height'],
                    spacerProperties = ['border', 'margin', 'padding'];
                dimensionProperties = dimensionProperties.reduce(function(obj, property) {
                    obj[property] = parseInt(computedStyles.getPropertyValue(property), 10);
                    return obj;
                }, {});
                spacerProperties = spacerProperties.reduce(function(obj, property) {
                    obj[property] = getPropertyAllSides(property, computedStyles.getPropertyValue);
                    return obj;
                }, {});
                return calculateParentDimensions(dimensionProperties, spacerProperties);
            }

            /**
             * @ngdoc method
             * @name getPlayerDimensions
             * @methodOf angularVideoBg.directive:videoBg
             * @description This method uses the aspect ratio of the video and the height/width of the parent container
             * in order to calculate the width and height of the video player.
             * @returns {{width: number, height: number}}
             */
            function getPlayerDimensions() {
                var aspectHeight = parseInt(parentDimensions.width / scope.ratio, 10),
                    aspectWidth = parseInt(parentDimensions.height * scope.ratio, 10),
                    useAspectHeight = parentDimensions.height < aspectHeight;
                return {
                    width: useAspectHeight ? parentDimensions.width : aspectWidth,
                    height: useAspectHeight ? aspectHeight : parentDimensions.height
                };
            }

            /**
             * This method simply executes getParentDimensions and getPlayerDimensions when necessary.
             */
            function updateDimensions() {
                parentDimensions = getParentDimensions();
                playerDimensions = getPlayerDimensions();
            }

            /**
             * This method simply resizes and repositions the player based on the dimensions of the parent and video
             * player, it is called when necessary.
             */
            function resizeAndPositionPlayer() {
                var $content = element.children().eq(1);
                var $player = element.children().eq(0);

                $content.css({
                    position: 'relative',
                    zIndex: scope.contentZIndex || 99
                });

                var options = {
                    zIndex: 1,
                    position: 'absolute',
                    width: playerDimensions.width + 'px',
                    height: playerDimensions.height + 'px',
                    left: '0',
                    top: parseInt((parentDimensions.height - playerDimensions.height)/2, 10) + 'px'
                };
                if (!scope.allowClickEvents) {
                    options.pointerEvents = 'none';
                }
                $player.css(options);
            }

            function playerReady() {
                if (scope.mute && !player.isMuted()) {
                    player.mute();
                } else if (player.isMuted()) {
                    player.unMute();
                }
            }

            /**
             * This method initializes the video player and updates the dimensions and positions for the first time.
             */
            function initVideoPlayer() {
                updateDimensions();
                player = new YT.Player('player', {
                    width: parentDimensions.width,
                    height: parseInt(parentDimensions.width / scope.ratio, 10),
                    videoId: scope.videoId,
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        iv_load_policy: 3,
                        loop: scope.loop ? 1 : 0,
                        playsinline: 1,
                        rel: 0,
                        showinfo: 0,
                        start: scope.start || 0
                    },
                    events: {
                        onReady: playerReady
                    }
                });
                resizeAndPositionPlayer();
            }

            function debounce(func, wait) {
                var timeout;
                return function() {
                    var context = this, args = arguments;
                    var later = function() {
                        timeout = null;
                        func.apply(context, args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }

            $window.onYouTubeIframeAPIReady = function() {
                ytd.resolve();
            };

            /**
             * Load the YouTube IFrame Script library asynchronously
             */
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            /**
             * When the YouTube IFrame API script is loaded, we initialize the video player.
             */
            ytd.promise.then(initVideoPlayer);

            /**
             * Anytime the window is resized, update the video player dimensions and position. (this is debounced for
             * performance reasons)
             */
            angular.element($window).on('resize', debounce(function() {
                updateDimensions();
                resizeAndPositionPlayer();
                console.log('Window resized!');
            }, 300));

		}
	};
});
