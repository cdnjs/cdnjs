/*!
 * Bespoke.js v0.4.0
 *
 * Copyright 2014, Mark Dalgleish
 * This content is released under the MIT license
 * http://mit-license.org/markdalgleish
 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.bespoke=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var decks = [],

	addClass = function(el, cls) {
		el.classList.add('bespoke-' + cls);
	},

	removeClass = function(el, cls) {
		el.className = el.className
			.replace(RegExp('bespoke-' + cls +'(\\s|$)', 'g'), ' ')
			.trim();
	},

	from = function(selectorOrElement, plugins) {
		var parent = selectorOrElement.nodeType === 1 ? selectorOrElement : document.querySelector(selectorOrElement),
			slides = [].filter.call(parent.children, function(el) { return el.nodeName !== 'SCRIPT'; }),
			activeSlide = slides[0],
			listeners = {},

			activate = function(index, customData) {
				if (!slides[index]) {
					return;
				}

				fire('deactivate', createEventData(activeSlide, customData));

				activeSlide = slides[index];

				slides.map(deactivate);

				fire('activate', createEventData(activeSlide, customData));

				addClass(activeSlide, 'active');
				removeClass(activeSlide, 'inactive');
			},

			deactivate = function(el, index) {
				var offset = index - slides.indexOf(activeSlide),
					offsetClass = offset > 0 ? 'after' : 'before';

				['before(-\\d+)?', 'after(-\\d+)?', 'active', 'inactive'].map(removeClass.bind(null, el));

				el !== activeSlide &&
					['inactive', offsetClass, offsetClass + '-' + Math.abs(offset)].map(addClass.bind(null, el));
			},

			slide = function(index, customData) {
				if (arguments.length) {
					fire('slide', createEventData(slides[index], customData)) && activate(index, customData);
				} else {
					return slides.indexOf(activeSlide);
				}
			},

			step = function(offset, customData) {
				var slideIndex = slides.indexOf(activeSlide) + offset;

				fire(offset > 0 ? 'next' : 'prev', createEventData(activeSlide, customData)) && activate(slideIndex, customData);
			},

			on = function(eventName, callback) {
				(listeners[eventName] || (listeners[eventName] = [])).push(callback);

				return function() {
					listeners[eventName] = listeners[eventName].filter(function(listener) {
						return listener !== callback;
					});
				};
			},

			fire = function(eventName, eventData) {
				return (listeners[eventName] || [])
					.reduce(function(notCancelled, callback) {
						return notCancelled && callback(eventData) !== false;
					}, true);
			},

			createEventData = function(el, eventData) {
				eventData = eventData || {};
				eventData.index = slides.indexOf(el);
				eventData.slide = el;
				return eventData;
			},

			deck = {
				on: on,
				fire: fire,
				slide: slide,
				next: step.bind(null, 1),
				prev: step.bind(null, -1),
				parent: parent,
				slides: slides
			};

		addClass(parent, 'parent');

		slides.map(function(el) {
			addClass(el, 'slide');
		});

		(plugins || []).forEach(function(plugin) {
			plugin(deck);
		});

		activate(0);

		decks.push(deck);

		return deck;
	},

	callOnAllDecks = function(method) {
		return function() {
			var args = arguments;
			decks.map(function(deck) {
				deck[method].apply(null, args);
			});
		};
	};

module.exports = {
	from: from,
	slide: callOnAllDecks('slide'),
	next: callOnAllDecks('next'),
	prev: callOnAllDecks('prev')
};

},{}]},{},[1])
(1)
});