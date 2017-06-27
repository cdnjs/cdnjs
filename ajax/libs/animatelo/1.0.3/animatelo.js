/*! Animatelo | The MIT License (MIT) | Copyright (c) 2017 GibboK */
; (function (animatelo) {
    'use strict';
    animatelo.version = '1.0.3';

    var _defaultOptions = {
        duration: 1000,
        delay: 0,
        iterations: 1,
        direction: 'normal',
        fill: 'both'
    },
        _UUID = function () {
            var d = new Date().getTime(),
                uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = (d + Math.random() * 16) % 16 | 0;
                    d = Math.floor(d / 16);
                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });
            return uuid;
        },
        _select = function (selector) {
            var nodeList,
                isNodeList = selector instanceof NodeList,
                isNode = selector instanceof Node,
                isHTMLCollection = selector instanceof HTMLCollection,
                isString = typeof selector === 'string';
            if (isNodeList) {
                nodeList = selector;
            } else if (isNode) {
                nodeList = [selector];
            } else if(isHTMLCollection){
                nodeList = selector;
            } else if (isString) {
                nodeList = document.querySelectorAll(selector)
            } else {
                throw 'selector is invaid';
            }
            return nodeList;
        },
        _validate = function (options) {
            var directionValid = [
                'normal',
                'reverse',
                'alternate',
                'alternate-reverse',
                'initial'
            ],
                fillValid = [
                    'none',
                    'forwards',
                    'backwards',
                    'both',
                    'initial'
                ];
            if (typeof options.duration !== 'number') {
                throw 'parameter duration is invalid';
            }
            if (typeof options.delay !== 'number') {
                throw 'parameter delay is invalid';
            }
            if (typeof options.iterations !== 'number') {
                throw 'parameter iterations is invalid';
            }

            if (typeof options.direction !== 'string' ||
                directionValid.indexOf(options.direction) === -1) {
                throw 'parameter direction is invalid';
            }
            if (typeof options.fill !== 'string' ||
                directionValid.indexOf(options.direction) === -1) {
                throw 'parameter fill is invalid';
            }
        };

    animatelo._animate = function (selector, keyframes, optionsArg) {
        var options = {
            duration: optionsArg && 'duration' in optionsArg ? optionsArg.duration : _defaultOptions.duration,
            delay: optionsArg && 'delay' in optionsArg ? optionsArg.delay : _defaultOptions.delay,
            iterations: optionsArg && 'iterations' in optionsArg ? optionsArg.iterations : _defaultOptions.iterations,
            direction: optionsArg && 'direction' in optionsArg ? optionsArg.direction : _defaultOptions.direction,
            fill: optionsArg && 'fill' in optionsArg ? optionsArg.fill : _defaultOptions.fill,
            id: optionsArg && 'id' in optionsArg ? optionsArg.id : _UUID()
        },
            hasUserId = optionsArg && 'id' in optionsArg ? true : false,
            nodeList = _select(selector),
            players = [],
            nodeListArr = [].slice.call(nodeList);
        _validate(options);
        nodeListArr.forEach(function (node, index) {
            var player = node.animate(keyframes, options);
            if (hasUserId) {
                player.id = options.id + '-' + index;
            } else {
                player.id = _UUID();
            }
            players.push(player);
        });
        return players;
    };

})(window.animatelo = window.animatelo || {});
