(function (){
    'use strict';

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
    angular.module('angularVideoBg').directive('videoBg', videoBg);

    // this obviates using ngAnnotate in the build task
    videoBg.$inject = ['$window', '$q', '$timeout'];

    function videoBg($window, $q, $timeout) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                videoId: '=?',
                playlist: '=?',
                ratio: '=?',
                loop: '=?',
                mute: '=?',
                start: '=?',
                end: '=?',
                contentZIndex: '=?',
                allowClickEvents: '=?',
                mobileImage: '=?',
                playerCallback: '&?'
            },
            transclude: true,
            template: '<div><div></div><div ng-transclude></div></div>',
            link: function(scope, element) {

                var computedStyles,
                    ytScript = document.querySelector('script[src="//www.youtube.com/iframe_api"]'),
                    $player = element.children().eq(0),
                    playerId,
                    player,
                    parentDimensions,
                    playerDimensions,
                    playerCallback = scope.playerCallback,
                    backgroundImage = scope.mobileImage || '//img.youtube.com/vi/' + scope.videoId + '/maxresdefault.jpg',
                    videoArr,
                    videoTimeout;

                playerId = 'player' + Array.prototype.slice.call(document.querySelectorAll('div[video-id]')).indexOf(element[0]);
                $player.attr('id', playerId);

                scope.ratio = scope.ratio || 16/9;
                scope.loop = scope.loop === undefined ? true : scope.loop;
                scope.mute = scope.mute === undefined ? true : scope.mute;

                if (!scope.videoId && !scope.playlist) {
                    throw new Error('Either video-id or playlist must be defined.');
                }
                if (scope.videoId && scope.playlist) {
                    throw new Error('Both video-id and playlist cannot be defined, please choose one or the other.');
                }
                if (scope.playlist) {
                    videoArr = scope.playlist.map(function(videoObj) {
                        return videoObj.videoId;
                    });
                }


                // Utility methods

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

                /**
                 * detect IE
                 * returns version of IE or false, if browser is not Internet Explorer
                 */
                function detectIE() {
                    var ua = window.navigator.userAgent,
                        msie = ua.indexOf('MSIE '),
                        trident = ua.indexOf('Trident/'),
                        edge = ua.indexOf('Edge/');

                    if (msie > 0) {
                        // IE 10 or older => return version number
                        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
                    }

                    if (trident > 0) {
                        // IE 11 => return version number
                        var rv = ua.indexOf('rv:');
                        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
                    }

                    if (edge > 0) {
                        // IE 12 => return version number
                        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
                    }

                    // other browser
                    return false;
                }

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
                                return spacer[arg] ? _sum + spacer[arg] : _sum;
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
                        height: (detectIE() && detectIE() < 12) ? dimensions.height : dimensions.height + calculateSpacerValues('top', 'bottom')
                    };
                }

                function styleContentElements() {
                    var $content = element.children().eq(1),
                        hasContent = !!$content.children().length,
                        parentChildren = Array.prototype.slice.call(element.parent().children());
                    element.parent().css({
                        position: 'relative',
                        overflow: 'hidden'
                    });
                    if (!hasContent) {
                        element.css({
                            position: 'absolute',
                            left: '0',
                            top: '0'
                        });
                        var i = parentChildren.indexOf(element[0]);
                        if (i > -1) {
                            parentChildren.splice(i, 1);
                        }
                        $content = angular.element(parentChildren);
                    }
                    $content.css({
                        position: 'relative',
                        zIndex: scope.contentZIndex || 99
                    });
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
                    computedStyles = $window.getComputedStyle(element.parent()[0]);
                    var dimensionProperties = ['width', 'height'],
                        spacerProperties = ['border', 'margin'];
                    if (detectIE() && detectIE() < 12) {
                        spacerProperties.push('padding');
                    }
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
                    styleContentElements();
                    parentDimensions = getParentDimensions();
                    playerDimensions = getPlayerDimensions();
                }

                /**
                 * This method simply resizes and repositions the player based on the dimensions of the parent and video
                 * player, it is called when necessary.
                 */
                function resizeAndPositionPlayer() {
                    var options = {
                        zIndex: 1,
                        position: 'absolute',
                        width: playerDimensions.width + 'px',
                        height: playerDimensions.height + 'px',
                        left: parseInt((parentDimensions.width - playerDimensions.width)/2, 10) + 'px',
                        top: parseInt((parentDimensions.height - playerDimensions.height)/2, 10) + 'px'
                    };
                    if (!scope.allowClickEvents) {
                        options.pointerEvents = 'none';
                    }
                    $player.css(options);
                }

                /**
                 * This method simply seeks the video to either the beginning or to the start position (if set).
                 */
                function seekToStart(video) {
                    video = video || scope;
                    player.seekTo(video.start || 0);
                }

                /**
                 * This method handles looping the video better than the native YT embed API player var "loop", especially
                 * when start and end positions are set.
                 */
                function loopVideo(video) {
                    var duration, msDuration;
                    video = video || scope;
                    if (video.end) {
                        duration = video.end - (video.start || 0);
                    } else if (scope.start) {
                        duration = player.getDuration() - video.start;
                    } else {
                        duration = player.getDuration();
                    }
                    msDuration = duration * 1000;
                    console.log('duration', msDuration);
                    videoTimeout = setTimeout(function() {
                        if (scope.playlist) {
                            player.nextVideo();
                        } else {
                            seekToStart(video);
                        }
                    }, msDuration);
                }

                /**
                 * This method handles looping the video better than the native YT embed API player var "loop", especially
                 * when start and end positions are set.
                 */
                function playlistVideoChange() {
                    var videoObj = scope.playlist[player.getPlaylistIndex()];
                    loopVideo(videoObj);
                }

                /**
                 * This is the method called when the "player" object is ready and can be interfaced with.
                 */
                function playerReady() {
                    if (playerCallback) {
                        $timeout(function() {
                            playerCallback({ player: player });
                        });
                    }
                    if (scope.playlist) {
                        player.loadPlaylist(videoArr);
                        if (scope.loop) {
                            player.setLoop(true);
                        }
                    }
                    if (scope.mute && !player.isMuted()) {
                        player.mute();
                    } else if (player.isMuted()) {
                        player.unMute();
                    }
                    seekToStart();
                    scope.$on('$destroy', function() {
                        if (videoTimeout) {
                            clearTimeout(videoTimeout);
                        }
                        angular.element($window).off('resize', windowResized);
                        player.destroy();
                    });
                }

                /**
                 * This is the method called when the "player" object has changed state. It is used here to toggle the video's
                 * display css to block only when the video starts playing, and kick off the video loop (if enabled).
                 */
                function playerStateChange(evt) {
                    if (evt.data === YT.PlayerState.PLAYING) {
                        $player.css('display', 'block');
                        if (!scope.playlist && scope.loop) {
                            loopVideo();
                        }
                        if (scope.playlist && scope.loop) {
                            playlistVideoChange();
                        }
                    }
                    if (evt.data === YT.PlayerState.UNSTARTED && scope.playlist) {
                        var videoObj = scope.playlist[player.getPlaylistIndex()],
                            videoMute = videoObj.mute === undefined ? scope.mute : videoObj.mute;
                        backgroundImage = videoObj.mobileImage || scope.mobileImage || '//img.youtube.com/vi/' + videoObj.videoId + '/maxresdefault.jpg';
                        setBackgroundImage(backgroundImage);
                        $player.css('display', 'none');
                        seekToStart(videoObj);
                        if (videoMute || (videoMute && scope.mute)) {
                            console.log('mute');
                            if (!player.isMuted()) {
                                player.mute();
                            }
                        } else if (!videoMute || !scope.mute) {
                            console.log('unmute');
                            if (player.isMuted()) {
                                player.unMute();
                            }
                        }
                    }
                }

                /**
                 * This method initializes the video player and updates the dimensions and positions for the first time.
                 */
                function initVideoPlayer() {
                    updateDimensions();
                    var playerOptions = {
                        autoplay: 1,
                        controls: 0,
                        iv_load_policy: 3,
                        cc_load_policy: 0,
                        modestbranding: 1,
                        playsinline: 1,
                        rel: 0,
                        showinfo: 0,
                        playlist: scope.videoId
                    };
                    player = new YT.Player(playerId, {
                        width: playerDimensions.width,
                        height: playerDimensions.height,
                        videoId: scope.videoId,
                        playerVars: playerOptions,
                        events: {
                            onReady: playerReady,
                            onStateChange: playerStateChange
                        }
                    });
                    $player = element.children().eq(0);
                    $player.css('display', 'none');
                    resizeAndPositionPlayer();
                }

                function setBackgroundImage(img) {
                    element.parent().css({
                        backgroundImage: 'url(' + img + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center'
                    });
                }

                var windowResized = debounce(function() {
                    updateDimensions();
                    resizeAndPositionPlayer();
                }, 300);

                setBackgroundImage(backgroundImage);

                /**
                 * if it's not mobile or tablet then initialize video
                 */
                if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    var ytd;
                    /**
                     * Check to see if YouTube IFrame script is ready, if it is, resolve ytd defer, if not, wait for
                     * onYouTubeIframeAPIReady to be called by the script to resolve it.
                     */
                    if (!$window.youTubeIframeAPIReady) {
                        ytd = $q.defer();
                        $window.youTubeIframeAPIReady = ytd.promise;
                        $window.onYouTubeIframeAPIReady = function() {
                            ytd.resolve();
                        };
                    }

                    /**
                     * If YouTube IFrame Script hasn't been loaded, load the library asynchronously
                     */
                    if (!ytScript) {
                        var tag = document.createElement('script');
                        tag.src = "//www.youtube.com/iframe_api";
                        var firstScriptTag = document.getElementsByTagName('script')[0];
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    } else if (ytd) {
                        ytd.resolve();
                    }

                    /**
                     * When the YouTube IFrame API script is loaded, we initialize the video player.
                     */
                    $window.youTubeIframeAPIReady.then(initVideoPlayer);

                    /**
                     * Anytime the window is resized, update the video player dimensions and position. (this is debounced for
                     * performance reasons)
                     */
                    angular.element($window).on('resize', windowResized);

                }

                scope.$watch('videoId', function(current, old) {
                    if (current && old && current !== old) {
                        clearTimeout(videoTimeout);
                        backgroundImage = scope.mobileImage || '//img.youtube.com/vi/' + current + '/maxresdefault.jpg';
                        setBackgroundImage(backgroundImage);
                        $player.css('display', 'none');
                        player.loadVideoById(current);
                    }
                });

                scope.$watchCollection('playlist', function(current, old) {
                    if (current && old && current !== old) {
                        clearTimeout(videoTimeout);
                        videoArr = current.map(function(videoObj) {
                            return videoObj.videoId;
                        });
                        player.loadPlaylist(videoArr);
                        if (scope.loop) {
                            player.setLoop(true);
                        }
                    }
                });

            }
        };
    }

})();
