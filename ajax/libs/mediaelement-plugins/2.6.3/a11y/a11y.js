/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

mejs.i18n.en['mejs.a11y-audio-description'] = 'Toggle audio description';
mejs.i18n.en['mejs.a11y-video-description'] = 'Toggle sign language';

Object.assign(mejs.MepDefaults, {
    videoDescriptionToggled: false,

    audioDescriptionToggled: false,

    defaultSource: null,

    audioDescriptionSource: null,

    videoDescriptionSource: null,

    isPlaying: false,

    isVoiceover: false,

    audioDescriptionCanPlay: false
});

Object.assign(MediaElementPlayer.prototype, {
    builda11y: function builda11y() {
        var t = this;

        t.options.defaultSource = {
            src: t.node.src,
            type: t.node.type
        };
        t.options.isVoiceover = t._loadBooleanFromAttribute('data-audio-description-voiceover');
        t.options.audioDescriptionSource = t._loadSourceFromAttribute('data-audio-description');
        t.options.videoDescriptionSource = t._loadSourceFromAttribute('data-video-description');

        if (t.options.audioDescriptionSource) t._createAudioDescription();
        if (t.options.videoDescriptionSource) t._createVideoDescription();

        t.media.addEventListener('play', function () {
            return t.options.isPlaying = true;
        });
        t.media.addEventListener('playing', function () {
            return t.options.isPlaying = true;
        });
        t.media.addEventListener('pause', function () {
            return t.options.isPlaying = false;
        });
        t.media.addEventListener('ended', function () {
            return t.options.isPlaying = false;
        });
    },
    _getFirstChildNodeByClassName: function _getFirstChildNodeByClassName(parentNode, className) {
        return [].concat(_toConsumableArray(parentNode.childNodes)).find(function (node) {
            return node.className.indexOf(className) > -1;
        });
    },
    _createAudioDescription: function _createAudioDescription() {
        var t = this;

        var audioDescriptionTitle = mejs.i18n.t('mejs.a11y-audio-description');
        var audioDescriptionButton = document.createElement('div');
        audioDescriptionButton.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'audio-description-button';
        audioDescriptionButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + audioDescriptionTitle + '" aria-label="' + audioDescriptionTitle + '" tabindex="0"></button>';

        t.addControlElement(audioDescriptionButton, 'audio-description');

        audioDescriptionButton.addEventListener('click', function () {
            t.options.audioDescriptionToggled = !t.options.audioDescriptionToggled;
            mejs.Utils.toggleClass(audioDescriptionButton, 'audio-description-on');

            t._toggleAudioDescription();
        });
    },
    _createVideoDescription: function _createVideoDescription() {
        var t = this;
        var videoDescriptionTitle = mejs.i18n.t('mejs.a11y-video-description');
        var videoDescriptionButton = document.createElement('div');
        videoDescriptionButton.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'video-description-button';
        videoDescriptionButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + videoDescriptionTitle + '" aria-label="' + videoDescriptionTitle + '" tabindex="0"></button>';
        t.addControlElement(videoDescriptionButton, 'video-description');

        videoDescriptionButton.addEventListener('click', function () {
            t.options.videoDescriptionToggled = !t.options.videoDescriptionToggled;
            mejs.Utils.toggleClass(videoDescriptionButton, 'video-description-on');

            t._toggleVideoDescription();
        });
    },
    _loadSourceFromAttribute: function _loadSourceFromAttribute(attribute) {
        var t = this;
        if (!t.node.hasAttribute(attribute)) return null;

        var sources = null;
        var json = void 0;

        try {
            var data = t.node.getAttribute(attribute);
            json = JSON.parse(data);
        } catch (error) {
            console.error('error loading ' + attribute + ': ' + error.message);
        } finally {
            sources = json;
        }

        return sources ? this._evaluateBestMatchingSource(sources) : null;
    },
    _loadBooleanFromAttribute: function _loadBooleanFromAttribute(attribute) {
        var t = this;
        if (!t.node.hasAttribute(attribute)) return false;

        var boolValue = t.node.getAttribute(attribute);
        return boolValue === 'true' || boolValue === '';
    },
    _evaluateBestMatchingSource: function _evaluateBestMatchingSource(sources) {
        var _this = this;

        var getMimeFromType = function getMimeFromType(type) {
            return mejs.Utils.getMimeFromType(type);
        };
        var canPlayType = function canPlayType(type) {
            return _this.node.canPlayType(type);
        };
        var matchesBrowser = function matchesBrowser(file) {
            return canPlayType(getMimeFromType(file.type));
        };

        var propablySource = sources.find(function (file) {
            return matchesBrowser(file) === 'probably';
        });
        if (propablySource) return propablySource;

        var alternativeSource = sources.find(function (file) {
            return matchesBrowser(file) === 'maybe';
        });
        if (alternativeSource) return alternativeSource;

        return null;
    },
    _createAudioDescriptionPlayer: function _createAudioDescriptionPlayer() {
        var t = this;

        var audioNode = document.createElement('audio');
        audioNode.setAttribute('preload', 'auto');
        audioNode.classList.add(t.options.classPrefix + 'audio-description-player');
        audioNode.setAttribute('src', t.options.audioDescriptionSource.src);
        audioNode.setAttribute('type', t.options.audioDescriptionSource.type);
        audioNode.load();
        document.body.appendChild(audioNode);

        t.audioDescription = new mejs.MediaElementPlayer(audioNode, {
            features: ['volume'],
            audioVolume: t.options.videoVolume,
            startVolume: t.node.volume,
            pauseOtherPlayers: false,

            iconSprite: t.options.iconSprite,

            fakeNodeName: t.options.fakeNodeName || 'mediaelementwrapper'
        });

        t.audioDescription.node.addEventListener('canplay', function () {
            return t.options.audioDescriptionCanPlay = true;
        });
        t.media.addEventListener('play', function () {
            return t.audioDescription.node.play().catch(function (e) {
                return console.error(e);
            });
        });
        t.media.addEventListener('playing', function () {
            return t.audioDescription.node.play().catch(function (e) {
                return console.error(e);
            });
        });
        t.media.addEventListener('pause', function () {
            return t.audioDescription.node.pause();
        });
        t.media.addEventListener('waiting', function () {
            return t.audioDescription.node.pause();
        });
        t.media.addEventListener('ended', function () {
            return t.audioDescription.node.pause();
        });
        t.media.addEventListener('timeupdate', function () {
            var shouldSync = Math.abs(t.currentTime - t.audioDescription.node.currentTime) > 0.35;
            var canPlay = t.options.audioDescriptionCanPlay;
            if (shouldSync && canPlay) t.audioDescription.node.currentTime = t.currentTime;
        });

        if (t.options.isVoiceover) {
            t.media.addEventListener('volumechange', function () {
                return t.audioDescription.node.volume = t.node.volume;
            });
        } else {
            var volumeButtonClass = t.options.classPrefix + 'volume-button';
            var videoVolumeButton = t._getFirstChildNodeByClassName(t.controls, volumeButtonClass);
            t.videoVolumeButton = videoVolumeButton;

            if (videoVolumeButton) {
                var descriptiveVolumeButton = t._getFirstChildNodeByClassName(t.audioDescription.controls, volumeButtonClass);
                videoVolumeButton.classList.add('hidden');
                t.controls.insertBefore(descriptiveVolumeButton, videoVolumeButton.nextSibling);
                t.descriptiveVolumeButton = descriptiveVolumeButton;
            }
        }
    },
    _toggleAudioDescription: function _toggleAudioDescription() {
        var t = this;

        if (!t.audioDescription) t._createAudioDescriptionPlayer();

        if (t.options.audioDescriptionToggled) {
            t.audioDescription.node.volume = t.volume;
            if (t.options.isPlaying && t.audioDescription) {
                t.audioDescription.node.muted = false;
                t.audioDescription.node.play().catch(function (e) {
                    return console.error(e);
                });
            }

            if (!t.options.isVoiceover) {
                t.muted = true;
                t.audioDescription.node.muted = false;
            }

            if (!t.options.isVoiceover && t.videoVolumeButton && t.descriptiveVolumeButton) {
                mejs.Utils.addClass(t.videoVolumeButton, 'hidden');
                mejs.Utils.removeClass(t.descriptiveVolumeButton, 'hidden');
            }
        } else {
            t.volume = t.audioDescription.node.volume;
            t.audioDescription.node.pause();
            t.audioDescription.node.muted = true;

            if (!t.options.isVoiceover) {
                t.muted = false;
                t.audioDescription.node.muted = true;
            }

            if (!t.options.isVoiceover && t.videoVolumeButton && t.descriptiveVolumeButton) {
                mejs.Utils.removeClass(t.videoVolumeButton, 'hidden');
                mejs.Utils.addClass(t.descriptiveVolumeButton, 'hidden');
            }
        }
    },
    _toggleVideoDescription: function _toggleVideoDescription() {
        var t = this;
        var currentTime = t.node.currentTime;
        var wasPlaying = t.options.isPlaying;
        var active = t.options.videoDescriptionToggled;

        t.node.pause();

        t.node.src = active ? t.options.videoDescriptionSource.src : t.options.defaultSource.src;
        t.node.type = active ? t.options.videoDescriptionSource.type : t.options.defaultSource.type;
        t.node.load();

        if (wasPlaying) {
            t.node.play().then(function () {
                return t.node.currentTime = currentTime;
            }).catch(function (e) {
                return console.error(e);
            });
        } else {
            t.node.setCurrentTime(currentTime);
        }
    }
});

},{}]},{},[1]);
