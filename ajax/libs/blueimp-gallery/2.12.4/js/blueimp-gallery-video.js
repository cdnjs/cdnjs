/*
 * blueimp Gallery Video Factory JS 1.1.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global define, window, document */

(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            './blueimp-helper',
            './blueimp-gallery'
        ], factory);
    } else {
        // Browser globals:
        factory(
            window.blueimp.helper || window.jQuery,
            window.blueimp.Gallery
        );
    }
}(function ($, Gallery) {
    'use strict';

    $.extend(Gallery.prototype.options, {
        // The class for video content elements:
        videoContentClass: 'video-content',
        // The class for video when it is loading:
        videoLoadingClass: 'video-loading',
        // The class for video when it is playing:
        videoPlayingClass: 'video-playing',
        // The list object property (or data attribute) for the video poster URL:
        videoPosterProperty: 'poster',
        // The list object property (or data attribute) for the video sources array:
        videoSourcesProperty: 'sources'
    });

    Gallery.prototype.videoFactory = function (obj, callback, videoInterface) {
        var that = this,
            options = this.options,
            videoContainerNode = this.elementPrototype.cloneNode(false),
            videoContainer = $(videoContainerNode),
            errorArgs = [{
                type: 'error',
                target: videoContainerNode
            }],
            video = videoInterface || document.createElement('video'),
            url = this.getItemProperty(obj, options.urlProperty),
            type = this.getItemProperty(obj, options.typeProperty),
            title = this.getItemProperty(obj, options.titleProperty),
            posterUrl = this.getItemProperty(obj, options.videoPosterProperty),
            posterImage,
            sources = this.getItemProperty(
                obj,
                options.videoSourcesProperty
            ),
            source,
            playMediaControl,
            isLoading,
            hasControls;
        videoContainer.addClass(options.videoContentClass);
        if (title) {
            videoContainerNode.title = title;
        }
        if (video.canPlayType) {
            if (url && type && video.canPlayType(type)) {
                video.src = url;
            } else {
                while (sources && sources.length) {
                    source = sources.shift();
                    url = this.getItemProperty(source, options.urlProperty);
                    type = this.getItemProperty(source, options.typeProperty);
                    if (url && type && video.canPlayType(type)) {
                        video.src = url;
                        break;
                    }
                }
            }
        }
        if (posterUrl) {
            video.poster = posterUrl;
            posterImage = this.imagePrototype.cloneNode(false);
            $(posterImage).addClass(options.toggleClass);
            posterImage.src = posterUrl;
            posterImage.draggable = false;
            videoContainerNode.appendChild(posterImage);
        }
        playMediaControl = document.createElement('a');
        playMediaControl.setAttribute('target', '_blank');
        if (!videoInterface) {
            playMediaControl.setAttribute('download', title);
        }
        playMediaControl.href = url;
        if (video.src) {
            video.controls = true;
            (videoInterface || $(video))
                .on('error', function () {
                    that.setTimeout(callback, errorArgs);
                })
                .on('pause', function () {
                    isLoading = false;
                    videoContainer
                        .removeClass(that.options.videoLoadingClass)
                        .removeClass(that.options.videoPlayingClass);
                    if (hasControls) {
                        that.container.addClass(that.options.controlsClass);
                    }
                    if (that.interval) {
                        that.play();
                    }
                })
                .on('playing', function () {
                    isLoading = false;
                    videoContainer
                        .removeClass(that.options.videoLoadingClass)
                        .addClass(that.options.videoPlayingClass);
                    if (that.container.hasClass(that.options.controlsClass)) {
                        hasControls = true;
                        that.container.removeClass(that.options.controlsClass);
                    } else {
                        hasControls = false;
                    }
                })
                .on('play', function () {
                    window.clearTimeout(that.timeout);
                    isLoading = true;
                    videoContainer.addClass(that.options.videoLoadingClass);
                });
            $(playMediaControl).on('click', function (event) {
                that.preventDefault(event);
                if (isLoading) {
                    video.pause();
                } else {
                    video.play();
                }
            });
            videoContainerNode.appendChild(
                (videoInterface && videoInterface.element) || video
            );
        }
        videoContainerNode.appendChild(playMediaControl);
        this.setTimeout(callback, [{
            type: 'load',
            target: videoContainerNode
        }]);
        return videoContainerNode;
    };

    return Gallery;
}));
