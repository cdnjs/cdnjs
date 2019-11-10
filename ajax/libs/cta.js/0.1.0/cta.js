/*! cta.js - v0.1.0 - 2015-03-30
* http://kushagragour.in/lab/ctajs/
* Copyright (c) 2015 Kushagra Gour; Licensed MIT */

;(function () {

	// Only support chrome for now.
	var isSupportedBrowser = /chrome/.test(navigator.userAgent.toLowerCase());

	// Credits to angular-animate for the nice animation duration detection code.
	// Detect proper transitionend/animationend event names.
	var TRANSITION_PROP, ANIMATION_PROP;
	var DURATION_KEY = 'Duration';
	var PROPERTY_KEY = 'Property';
	var DELAY_KEY = 'Delay';
	var ANIMATION_ITERATION_COUNT_KEY = 'IterationCount';
	var ONE_SECOND = 1000;

	if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
		TRANSITION_PROP = 'WebkitTransition';
	} else {
		TRANSITION_PROP = 'transition';
	}

	if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
		ANIMATION_PROP = 'WebkitAnimation';
	} else {
		ANIMATION_PROP = 'animation';
	}

	function parseMaxTime(str) {
		var maxValue = 0, value;
		var values = typeof(str) === 'string' ?
			str.split(/\s*,\s*/) :
			[];
		for (var i = values.length; i--;) {
			value = values[i];
			maxValue = Math.max(parseFloat(value) || 0, maxValue);
		}
		return maxValue;
	}

	function getAnimationTime(element) {
		var transitionDuration = 0;
		var transitionDelay = 0;
		var animationDuration = 0;
		var animationDelay = 0;
		var elementStyles = window.getComputedStyle(element) || {};

		var transitionDurationStyle = elementStyles[TRANSITION_PROP + DURATION_KEY];
		transitionDuration = Math.max(parseMaxTime(transitionDurationStyle), transitionDuration);

		var transitionDelayStyle = elementStyles[TRANSITION_PROP + DELAY_KEY];
		transitionDelay  = Math.max(parseMaxTime(transitionDelayStyle), transitionDelay);

		var animationDelayStyle = elementStyles[ANIMATION_PROP + DELAY_KEY];
		animationDelay   = Math.max(parseMaxTime(elementStyles[ANIMATION_PROP + DELAY_KEY]), animationDelay);

		var aDuration  = parseMaxTime(elementStyles[ANIMATION_PROP + DURATION_KEY]);

		if (aDuration > 0) {
			aDuration *= parseInt(elementStyles[ANIMATION_PROP + ANIMATION_ITERATION_COUNT_KEY], 10) || 1;
		}
		animationDuration = Math.max(aDuration, animationDuration);

		return animationDuration || transitionDuration;
	}

	var defaults = {
		duration: 0.3, // Duration for the animation to happen (seconds)

		// Duration in which the target will become visible, (seconds)
		targetShowDuration: 0,

		// Extra time just to ensure continuity between dummy element and target (seconds)
		extraTransitionDuration: 1,

		// Whether to position the dummy animating element relative to window (fixed positioned) or not.
		relativeToWindow: false
	}

	function cta(trigger, target, options, callback) {
		if (!isSupportedBrowser) {
			callback && callback(target);
			return;
		}

		var targetBackground,
			triggerBackground,
			targetBounds,
			triggerBounds,
			dummy,
			extraTransitionDuration = 1;

		// Support optional arguments
		if (typeof options === 'function') {
			callback = options;
			options = {};
		}
		options = options || {};
		options.duration = options.duration || defaults.duration;
		options.targetShowDuration = options.targetShowDuration || getAnimationTime(target) || defaults.targetShowDuration;
		options.relativeToWindow = options.relativeToWindow || defaults.relativeToWindow;

		// Set some properties to make the target visible so we can get its dimensions.
		// Set `display` to `block` only when its already hidden. Otherwise changing an already visible
		// element's `display` property can lead to its position getting changed.
		if (window.getComputedStyle(target).display === 'none') {
			target.style.setProperty('display', 'block', 'important');
		}

		// Calculate some property differences to animate.
		targetBackground = window.getComputedStyle(target).background;
		triggerBackground = window.getComputedStyle(trigger).background;
		targetBounds = target.getBoundingClientRect();
		triggerBounds = trigger.getBoundingClientRect();
		scaleXRatio = triggerBounds.width / targetBounds.width;
		scaleYRatio = triggerBounds.height / targetBounds.height;
		diffX = triggerBounds.left - targetBounds.left;
		diffY = triggerBounds.top - targetBounds.top;

		// Remove the props we put earlier.
		target.style.removeProperty('display');

		// Create a dummy element for transition.
		dummy = document.createElement('div');
		dummy.style.setProperty('pointer-events', 'none', 'important');
		dummy.style.setProperty('position', (options.relativeToWindow ? 'fixed' : 'absolute'), 'important');
		dummy.style.setProperty('transform-origin', 'top left', 'important');
		dummy.style.setProperty('transition', options.duration + 's ease');

		// Set dummy element's dimensions to final state.
		dummy.style.setProperty('width', targetBounds.width + 'px', 'important');
		dummy.style.setProperty('height', targetBounds.height + 'px', 'important');
		dummy.style.setProperty('left', (targetBounds.left + (options.relativeToWindow ? 0 : window.pageXOffset)) + 'px', 'important');
		dummy.style.setProperty('top', (targetBounds.top + (options.relativeToWindow ? 0 : window.pageYOffset)) + 'px', 'important');
		dummy.style.setProperty('background', triggerBackground, 'important');

		// Apply a reverse transform to bring back dummy element to the dimensions of the trigger/starting element.
		// Credits: This technique is inspired by Paul Lewis: http://aerotwist.com/blog/flip-your-animations/ He is amazing!
		dummy.style.setProperty('transform', 'translate(' + diffX + 'px, ' + diffY + 'px) scale(' + scaleXRatio + ', ' + scaleYRatio + ')', 'important');
		document.body.appendChild(dummy);

		// We start animation on the next available frame.
		requestAnimationFrame(function () {
			dummy.style.setProperty('background', targetBackground, 'important');

			// Remove the reverse transforms to get the dummy transition back to its normal/final state.
			dummy.style.removeProperty('transform');

			dummy.addEventListener('transitionend', function transitionEndCallback() {
				dummy.removeEventListener('transitionend', transitionEndCallback);

				callback && callback(target);
				// Animate the dummy element to zero opacity while the target is getting rendered.
				dummy.style.transitionDuration = (options.targetShowDuration + extraTransitionDuration) + 's';
				dummy.style.opacity = 0;
				setTimeout(function () {
					dummy.parentNode.removeChild(dummy);
				}, (options.targetShowDuration + extraTransitionDuration) * 1000);
			});
		});

		// Return a reverse animation function for the called animation.
		return function (options, callback) {
			cta(target, trigger, options, callback);
		};
	}

	cta.isSupported = isSupportedBrowser;

	// open to the world.
	// commonjs
	if( typeof exports === 'object' )  {
		module.exports = cta;
	}
	// AMD module
	else if( typeof define === 'function' && define.amd ) {
		define([], cta);
	}
	// Browser global
	else {
		window.cta = cta;
	}
})();
