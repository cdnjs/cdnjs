/*global angular */

/**
 * @ngdoc directive
 * @name vjsVideoApp.directive:vjs.directive.js
 * @description
 * # vjs.directive.js
 */
(function () {
    'use strict';

    var module = angular.module('vjs.video', []);

    function getVersion() {
        return (window.videojs && window.videojs.VERSION) ?
                window.videojs.VERSION : '0.0.0';
    }

    function isMediaElement(element) {
        return element[0].nodeName === 'VIDEO' || element[0].nodeName === 'AUDIO';
    }

    module.controller('VjsVideoController', ['$scope', function ($scope) {
        var self = this;

        function getVidElement(element, isContainer) {
            var vid = null,
                videos;

            if (!window.videojs) {
                throw new Error('video.js was not found!');
            }

            if (isContainer) {
                videos = element[0].querySelectorAll('video, audio');
                if (videos.length === 0) {
                    throw new Error('video tag must be defined within container directive!');
                } else if (videos.length > 1) {
                    throw new Error('only one video can be defined within the container directive!');
                }

                vid = videos[0];
            } else {
                if (isMediaElement(element)) {
                    vid = element[0];
                } else {
                    throw new Error('directive must be attached to a video or audio tag!');
                }
            }

            return vid;
        }

        function applyRatio(el, ratioVal) {
            var ratio = ratioVal,
                style = document.createElement('style'),
                parseRatio = function (r) {
                    var tokens = r.split(':'),
                        tokenErrorMsg = 'the ratio must either be "wide", "standard" or ' +
                                        'decimal values in the format of w:h';

                    //if invalid ratio throw an error
                    if (tokens.length !== 2) {
                        throw new Error(tokenErrorMsg);
                    }

                    //confirm that both tokens are numbers
                    if (isNaN(tokens[0]) || isNaN(tokens[1])) {
                        throw new Error(tokenErrorMsg);
                    }

                    //confirm that the width or height is not zero
                    if (Number(tokens[0]) === 0 || Number(tokens[1]) === 0) {
                        throw new Error('neither the width or height ratio can be zero!');
                    }

                    return (Number(tokens[1]) / Number(tokens[0])) * 100;
                },
                genContainerId = function (element) {
                    var container = element[0].querySelector('.vjs-tech'),
                        vjsId;

                    if (container) {
                        vjsId = 'vjs-container-' + container.getAttribute('id');
                    } else {
                        //vjsId = 'vjs-container-default';
                        throw new Error('Failed to find instance of video-js class!');
                    }

                    //add generated id to container
                    element[0].setAttribute('id', vjsId);

                    return vjsId;
                },
                containerId,
                ratioPercentage,
                css;

            //if ratio isn't defined lets default to wide screen
            if (!ratio) {
                ratio = '16:9';
            }

            switch (ratio) {
            case 'wide':
                ratio = '16:9';
                break;
            case 'standard':
                ratio = '4:3';
                break;
            }

            containerId = genContainerId(el);

            ratioPercentage = parseRatio(ratio);

            css = ['#', containerId, ' ',
                   '.video-js {padding-top:', ratioPercentage,
                   '%;}\n', '.vjs-fullscreen {padding-top: 0px;}'].join('');

            style.type = 'text/css';
            style.rel = 'stylesheet';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            el[0].appendChild(style);
        }

        function generateMedia(ctrl, mediaChangedHandler) {
            var errMsgNoValid = 'a sources and/or tracks element must be ' +
                                'defined for the vjs-media attribute',
                errMsgNoSrcs  = 'sources must be an array of objects with at ' +
                                'least one item',
                errMsgNoTrks  = 'tracks must be an array of objects with at ' +
                                'least one item',
                div,
                curDiv;
            //check to see if vjsMedia is defined
            if (!ctrl.vjsMedia) {
                return;
            }

            //if sources and tracks aren't defined, throw an error
            if (!ctrl.vjsMedia.sources && !ctrl.vjsMedia.tracks) {
                throw new Error(errMsgNoValid);
            }

            //verify sources and tracks are arrays if they are defined
            if (ctrl.vjsMedia.sources && !(ctrl.vjsMedia.sources instanceof Array)) {
                throw new Error(errMsgNoSrcs);
            }
            if (ctrl.vjsMedia.tracks && !(ctrl.vjsMedia.tracks instanceof Array)) {
                throw new Error(errMsgNoTrks);
            }

            //build DOM elements for sources and tracks as children to a div
            div = document.createElement("div");

            if (ctrl.vjsMedia.sources) {
                ctrl.vjsMedia.sources.forEach(function (curObj) {
                    curDiv = document.createElement('source');
                    curDiv.setAttribute('src', curObj.src || "");
                    curDiv.setAttribute('type', curObj.type || "");
                    div.appendChild(curDiv);
                });
            }

            if (ctrl.vjsMedia.tracks) {
                ctrl.vjsMedia.tracks.forEach(function (curObj) {
                    curDiv = document.createElement('track');
                    curDiv.setAttribute('kind', curObj.kind || "");
                    curDiv.setAttribute('label', curObj.label || "");
                    curDiv.setAttribute('src', curObj.src || "");
                    curDiv.setAttribute('srclang', curObj.srclang || "");

                    //check for default flag
                    if (curObj.default === true) {
                        curDiv.setAttribute('default', "");
                    }

                    div.appendChild(curDiv);
                });
            }

            //invoke callback
            mediaChangedHandler.call(undefined, {element: div});

        }

        function initVideoJs(vid, params, element, mediaChangedHandler) {
            var opts = params.vjsSetup || {},
                ratio = params.vjsRatio,
                isValidContainer =
                    (!isMediaElement(element) && !getVersion().match(/^5\./)) ? true : false,
                mediaWatcher;

            if (!window.videojs) {
                return null;
            }

            //override poster settings if defined in vjsMedia
            if (params.vjsMedia && params.vjsMedia.poster) {
                opts.poster = params.vjsMedia.poster;
            }

            //generate any defined sources or tracks
            generateMedia(params, mediaChangedHandler);

            //watch for changes to vjs-media
            mediaWatcher = $scope.$watch(
                function () {
                    return params.vjsMedia;
                },
                function (newVal, oldVal) {

                    if (newVal && !angular.equals(newVal, oldVal)) {
                        //deregister watcher
                        mediaWatcher();

                        if (isValidContainer) {
                            window.videojs(vid).dispose();
                            $scope.$emit('vjsVideoMediaChanged');
                        } else {
                            $scope.$emit('vjsVideoMediaChanged');
                        }
                    }
                }
            );

            //bootstrap videojs
            window.videojs(vid, opts, function () {
                if (isValidContainer) {
                    applyRatio(element, ratio);
                }

                //emit ready event with reference to video
                $scope.$emit('vjsVideoReady', {
                    id: vid.getAttribute('id'),
                    vid: this,
                    player: this,
                    controlBar: this.controlBar
                });
            });

            //dispose of videojs before destroying directive
            $scope.$on('$destroy', function () {
                window.videojs(vid).dispose();
            });
        }

        //export public methods
        self.initVideoJs = initVideoJs;
        self.getVidElement = getVidElement;
    }]);

    module.directive('vjsVideo', ['$compile', '$timeout', function ($compile, $timeout) {

        return {
            restrict: 'A',
            transclude: true,
            scope: {
                vjsSetup: '=?',
                vjsRatio: '@',
                vjsMedia: '=?'
            },
            controller: 'VjsVideoController',
            controllerAs: 'vjsCtrl',
            bindToController: true,
            link: function postLink(scope, element, attrs, ctrl, transclude) {
                var vid,
                    parentContainer,
                    origContent,
                    compiledEl,
                    mediaChangedHandler = function (e) {
                        //remove any inside contents
                        element.children().remove();
                        //add generated sources and tracks
                        element.append(e.element.childNodes);
                    },
                    init = function () {
                        vid = ctrl.getVidElement(element);

                        //check if video.js version 5.x is running
                        if (getVersion().match(/^5\./)) {
                            //if vjsRatio is defined,
                            //add it to the vjsSetup options
                            if (ctrl.vjsRatio) {
                                if (!ctrl.vjsSetup) {
                                    ctrl.vjsSetup = {};
                                }

                                ctrl.vjsSetup.aspectRatio = ctrl.vjsRatio;
                            }
                        }

                        //attach transcluded content
                        transclude(function (content) {
                            element.append(content);

                            //now that the transcluded content is injected
                            //initialize video.js
                            ctrl.initVideoJs(vid, ctrl, element, mediaChangedHandler);
                        });
                    };

                origContent = element.clone();

                //we need to wrap the video inside of a div
                //for easier DOM management
                if (!element.parent().hasClass('vjs-video-wrap')) {
                    element.wrap('<div class="vjs-video-wrap"></div>');
                }

                parentContainer = element.parent();

                scope.$on('vjsVideoMediaChanged', function () {
                    //retreive base element that video.js creates
                    var staleChild = parentContainer.children()[0];

                    //remove current directive instance
                    //destroy will trigger a video.js dispose
                    $timeout(function () {
                        scope.$destroy();
                    });

                    //compile the new directive and add it to the DOM
                    compiledEl = origContent.clone();
                    parentContainer.append(compiledEl);
                    //it is key to pass in the parent scope to the directive
                    compiledEl = $compile(compiledEl)(scope.$parent);

                    //remove original element created by video.js
                    staleChild.remove();
                });

                init();
            }
        };
    }]);

    module.directive('vjsVideoContainer', [function () {

        return {
            restrict: 'AE',
            transclude: true,
            template: '<div class="vjs-directive-container"><div ng-transclude></div></div>',
            scope: {
                vjsSetup: '=?',
                vjsRatio: '@',
                vjsMedia: '=?'
            },
            controller: 'VjsVideoController',
            controllerAs: 'vjsCtrl',
            bindToController: true,
            link: function postLink(scope, element, attrs, ctrl, transclude) {
                var vid,
                    origContent,
                    mediaChangedHandler = function (e) {
                        var vidEl = element[0].querySelector('video, audio');

                        if (vidEl) {
                            //remove any inside contents
                            while (vidEl.firstChild) {
                                vidEl.removeChild(vidEl.firstChild);
                            }

                            //add generated sources and tracks
                            while (e.element.childNodes.length > 0) {
                                vidEl.appendChild(e.element.childNodes[0]);
                            }
                        }
                    },
                    init = function () {
                        vid = ctrl.getVidElement(element, true);

                        //we want to confirm that the vjs-video directive or
                        //any corresponding attributes are not defined on the
                        //internal video element
                        if (vid.getAttribute('vjs-video') !== null) {
                            throw new Error(
                                'vjs-video should not be used on the video ' +
                                'tag when using vjs-video-container!');
                        }

                        //we also want to make sure that no vjs-* attributes
                        //are included on the internal video tag
                        if ((vid.getAttribute('vjs-setup') !== null) ||
                            (vid.getAttribute('vjs-media') !== null) ||
                            (vid.getAttribute('vjs-ratio') !== null)) {
                            throw new Error(
                                'directive attributes should not be used on ' +
                                'the video tag when using vjs-video-container!'
                            );

                        }

                        //check if video.js version 5.x is running
                        if (getVersion().match(/^5\./)) {

                            if (ctrl.vjsRatio) {
                                if (!ctrl.vjsSetup) {
                                    ctrl.vjsSetup = {};
                                }

                                ctrl.vjsSetup.aspectRatio = ctrl.vjsRatio;
                            }
                        } else {
                            //set width and height of video to auto
                            vid.setAttribute('width', 'auto');
                            vid.setAttribute('height', 'auto');
                        }

                        //bootstrap video js
                        ctrl.initVideoJs(vid, ctrl, element, mediaChangedHandler);
                    };

                //save original content
                transclude(function (content) {
                    origContent = content.clone();
                });

                scope.$on('vjsVideoMediaChanged', function () {
                    //replace element children with orignal content
                    element.children().remove();
                    element.append(origContent.clone());
                    init();
                });

                init();
            }
        };
    }]);
}());
