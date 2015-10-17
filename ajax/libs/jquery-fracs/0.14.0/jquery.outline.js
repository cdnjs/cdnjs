/* jQuery.fracs 0.14.0 - http://larsjung.de/fracs/ */
(function (window, $) {
	'use strict';

		// Some often used references.
	var $window = $(window),
		extend = $.extend,

		fracs = $.fracs,
		Rect = fracs.Rect,
		Viewport = fracs.Viewport;




	// Outline
	// -------

	var defaults = {
			crop: false,
			duration: 0,
			focusWidth: 0.5,
			focusHeight: 0.5,
			autoFocus: true,
			styles: [{
				selector: 'header,footer,section,article',
				fillStyle: 'rgb(230,230,230)'
			}, {
				selector: 'h1,h2,h3,h4',
				fillStyle: 'rgb(255,144,55)'
			}],
			viewportStyle: {
				fillStyle: 'rgba(255,144,55,0.3)'
			},
			viewportDragStyle: {
				fillStyle: 'rgba(255,144,55,0.5)'
			},
			invertViewport: false
		};

	// Quick and dirty.
	var Outline = function (canvas, options, viewport) {

		if (!canvas || !$.isFunction(canvas.getContext)) {
			return null;
		}

		var context = canvas.getContext('2d');
		if (!context) {
			return null;
		}

		viewport = viewport || window;

		var settings = extend({}, defaults, options),

			$canvas = $(canvas),
			width = $canvas.attr('width'),
			height = $canvas.attr('height'),

			$viewport = $(viewport),
			viewportObj = new Viewport(viewport),
			find = viewport === window ? function (selector) {
				return $(selector);
			} : function (selector) {
				return $viewport.find(selector);
			},

			drag = false,

			currentContentRect,
			currentViewportRect,
			currentScale,
			focusWidth,
			focusHeight,

			drawRect = function (rect, strokeWidth, strokeStyle, fillStyle, invert) {

				if (!rect || !(strokeStyle || fillStyle)) {
					return;
				}

				if (fillStyle) {
					context.beginPath();
					if (invert) {
						context.rect(0, 0, currentContentRect.width, rect.top);
						context.rect(0, rect.top, rect.left, rect.height);
						context.rect(rect.right, rect.top, currentContentRect.width - rect.right, rect.height);
						context.rect(0, rect.bottom, currentContentRect.width, currentContentRect.height - rect.bottom);
					} else {
						context.rect(rect.left, rect.top, rect.width, rect.height);
					}
					context.fillStyle = fillStyle;
					context.fill();
				}
				if (strokeStyle) {
					context.beginPath();
					context.rect(rect.left, rect.top, rect.width, rect.height);
					context.lineWidth = currentScale ? Math.max(strokeWidth, 0.2 / currentScale) : strokeWidth;
					context.strokeStyle = strokeStyle;
					context.stroke();
				}
			},
			drawElement = function (element, strokeWidth, strokeStyle, fillStyle) {

				var $element = $(element),
					rect = Rect.ofElement(element);

				if (!rect || rect.width <= 0 || rect.height <= 0 || $element.css('visibility') === 'hidden') {
					return;
				}

				rect = rect.relativeTo(currentContentRect);
				strokeWidth = strokeWidth === 'auto' ? parseInt($element.css('border-top-width'), 10) : strokeWidth;
				strokeStyle = strokeStyle === 'auto' ? $element.css('border-top-color') : strokeStyle;
				fillStyle = fillStyle === 'auto' ? $element.css('background-color') : fillStyle;
				drawRect(rect, strokeWidth, strokeStyle, fillStyle);
			},
			applyStyles = function () {

				$.each(settings.styles, function (idx, style) {
					find(style.selector).each(function () {
						drawElement(this, style.strokeWidth, style.strokeStyle, style.fillStyle);
					});
				});
			},
			drawViewport = function () {

				var style = drag && settings.viewportDragStyle ? settings.viewportDragStyle : settings.viewportStyle;

				drawRect(currentViewportRect, style.strokeWidth, style.strokeStyle, style.fillStyle, settings.invertViewport);
			},
			draw = function () {

				currentContentRect = Rect.ofContent(viewport);
				currentViewportRect = Rect.ofViewport(viewport, true);
				currentScale = Math.min(width / currentContentRect.width, height / currentContentRect.height);

				if (settings.crop) {
					$canvas.attr('width', currentContentRect.width * currentScale).attr('height', currentContentRect.height * currentScale);
				}

				context.setTransform(1, 0, 0, 1, 0, 0);
				context.clearRect(0, 0, $canvas.width(), $canvas.height());

				context.scale(currentScale, currentScale);
				applyStyles();
				drawViewport();
			},
			onDrag = function (event) {

				var r = Rect.ofElement(canvas),
					x = (event.pageX - r.left) / currentScale - currentViewportRect.width * focusWidth,
					y = (event.pageY - r.top) / currentScale - currentViewportRect.height * focusHeight;

				viewportObj.scrollTo(x, y, settings.duration);
			},
			onDragEnd = function (event) {

				drag = false;
				event.preventDefault();

				$canvas.css('cursor', 'pointer').removeClass('dragOn');
				$('body').css('cursor', 'auto');
				$window.off('mousemove', onDrag);
				draw();
			},
			onDragStart = function (event) {

				var r;
				if (settings.autoFocus) {
					r = Rect.ofElement(canvas);
					focusWidth = (((event.pageX - r.left) / currentScale) - currentViewportRect.left) / currentViewportRect.width;
					focusHeight = (((event.pageY - r.top) / currentScale) - currentViewportRect.top) / currentViewportRect.height;
				}
				if (!settings.autoFocus || focusWidth < 0 || focusWidth > 1 || focusHeight < 0 || focusHeight > 1) {
					focusWidth = settings.focusWidth;
					focusHeight = settings.focusHeight;
				}

				drag = true;
				event.preventDefault();

				$canvas.css('cursor', 'crosshair').addClass('dragOn');
				$('body').css('cursor', 'crosshair');
				$window.on('mousemove', onDrag).one('mouseup', onDragEnd);
				onDrag(event);
			},
			init = function () {

				$canvas.css('cursor', 'pointer').mousedown(onDragStart);
				$viewport.on('load resize scroll', draw);
				draw();
			};

		init();

		this.redraw = draw;
	};





	// Register the plug-in
	// ===================

		// The namespace used to register the plug-in and to attach
		// data to elements.
	var namespace = 'fracs.outline';

	// The methods are sorted in alphabetical order. All methods that do
	// not provide a return value will return `this` to enable method chaining.
	fracs.modplug({

		// Static methods
		// --------------
		// These methods are accessible via `$.outline.<methodname>`.
		statics: {

			// Publish object constructors (for testing).
			Outline: Outline
		},

		// Instance methods
		// ----------------
		// These methods are accessible via `$(selector).outline('<methodname>', ...)`.
		methods: {

			// ### 'outline'
			// Generates a document outline in a selected canvas. Will be redrawn on every
			// 'window resize` and `window scroll` event.
			//
			//      .outline([options: OutlineOptions]): jQuery
			outline: function (action, options, viewport) {

				if (typeof action !== 'string') {
					viewport = options;
					options = action;
					action = null;
				}
				if (viewport instanceof $) {
					viewport = viewport[0];
				}

				if (action === 'redraw') {
					return this.each(function () {

						var outline = $(this).data(namespace);
						if (outline) {
							outline.redraw();
						}
					});
				}

				return this.each(function () {

					var outline = $(this).data(namespace);
					if (!outline) {
						outline = new Outline(this, options, viewport);
						if (outline) {
							$(this).data(namespace, outline);
						}
					}
				});
			}
		}
	});

}(window, jQuery));
