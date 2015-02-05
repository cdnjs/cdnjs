/* Flot plugin for drawing all elements of a plot on the canvas.

Copyright (c) 2007-2013 IOLA and Ole Laursen.
Licensed under the MIT license.

Flot normally produces certain elements, like axis labels and the legend, using
HTML elements. This permits greater interactivity and customization, and often
looks better, due to cross-browser canvas text inconsistencies and limitations.

It can also be desirable to render the plot entirely in canvas, particularly
if the goal is to save it as an image, or if Flot is being used in a context
where the HTML DOM does not exist, as is the case within Node.js. This plugin
switches out Flot's standard drawing operations for canvas-only replacements.

Currently the plugin supports only axis labels, but it will eventually allow
every element of the plot to be rendered directly to canvas.

The plugin supports these options:

{
    canvas: boolean
}

The "canvas" option controls whether full canvas drawing is enabled, making it
possible to toggle on and off. This is useful when a plot uses HTML text in the
browser, but needs to redraw with canvas text when exporting as an image.

*/

(function($) {

	var options = {
		canvas: true
	};

	var render, getTextInfo, addText;

	// Cache the prototype hasOwnProperty for faster access

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	function init(plot, classes) {

		var Canvas = classes.Canvas;

		// We only want to replace the functions once; the second time around
		// we would just get our new function back.  This whole replacing of
		// prototype functions is a disaster, and needs to be changed ASAP.

		if (render == null) {
			getTextInfo = Canvas.prototype.getTextInfo,
			addText = Canvas.prototype.addText,
			render = Canvas.prototype.render;
		}

		// Finishes rendering the canvas, including overlaid text

		Canvas.prototype.render = function() {

			if (!plot.getOptions().canvas) {
				return render.call(this);
			}

			var context = this.context,
				cache = this._textCache;

			// For each text layer, render elements marked as active

			context.save();

			for (var layerKey in cache) {
				if (hasOwnProperty.call(cache, layerKey)) {
					var layerCache = cache[layerKey];
					for (var styleKey in layerCache) {
						if (hasOwnProperty.call(layerCache, styleKey)) {
							var styleCache = layerCache[styleKey],
								updateStyles = true;
							for (var key in styleCache) {
								if (hasOwnProperty.call(styleCache, key)) {

									var info = styleCache[key];

									if (!info.active) {
										delete styleCache[key];
										continue;
									}

									var x = info.x,
										y = info.y,
										lines = info.lines,
										halign = info.halign;

									// Since every element at this level of the cache have the
									// same font and fill styles, we can just change them once
									// using the values from the first element.

									if (updateStyles) {
										context.fillStyle = info.font.color;
										context.font = info.font.definition;
										updateStyles = false;
									}

									// TODO: Comments in Ole's implementation indicate that
									// some browsers differ in their interpretation of 'top';
									// so far I don't see this, but it requires more testing.
									// We'll stick with top until this can be verified.

									// Original comment was:
									// Top alignment would be more natural, but browsers can
									// differ a pixel or two in where they consider the top to
									// be, so instead we middle align to minimize variation
									// between browsers and compensate when calculating the
									// coordinates.

									context.textBaseline = "top";

									for (var i = 0; i < lines.length; ++i) {

										var line = lines[i],
											linex = x;

										// Apply horizontal alignment per-line

										if (halign == "center") {
											linex -= line.width / 2;
										} else if (halign == "right") {
											linex -= line.width;
										}

										// FIXME: LEGACY BROWSER FIX
										// AFFECTS: Opera < 12.00

										// Round the coordinates, since Opera otherwise
										// switches to uglier (probably non-hinted) rendering.
										// Also offset the y coordinate, since Opera is off
										// pretty consistently compared to the other browsers.

										if (!!(window.opera && window.opera.version().split(".")[0] < 12)) {
											linex = Math.floor(linex);
											y = Math.ceil(y - 2);
										}

										context.fillText(line.text, linex, y);
										y += line.height;
									}
								}
							}
						}
					}
				}
			}

			context.restore();
		};

		// Creates (if necessary) and returns a text info object.
		//
		// When the canvas option is set, the object looks like this:
		//
		// {
		//     x: X coordinate at which the text is located.
		//     x: Y coordinate at which the text is located.
		//     width: Width of the text's bounding box.
		//     height: Height of the text's bounding box.
		//     active: Flag indicating whether the text should be visible.
		//     lines: [{
		//         height: Height of this line.
		//         widths: Width of this line.
		//         text: Text on this line.
		//     }],
		//     font: {
		//         definition: Canvas font property string.
		//         color: Color of the text.
		//     },
		// }

		Canvas.prototype.getTextInfo = function(layer, text, font, angle) {

			if (!plot.getOptions().canvas) {
				return getTextInfo.call(this, layer, text, font, angle);
			}

			var textStyle, layerCache, styleCache, info;

			// Cast the value to a string, in case we were given a number

			text = "" + text;

			// If the font is a font-spec object, generate a CSS definition

			if (typeof font === "object") {
				textStyle = font.style + " " + font.variant + " " + font.weight + " " + font.size + "px " + font.family;
			} else {
				textStyle = font;
			}

			// Retrieve (or create) the cache for the text's layer and styles

			layerCache = this._textCache[layer];

			if (layerCache == null) {
				layerCache = this._textCache[layer] = {};
			}

			styleCache = layerCache[textStyle];

			if (styleCache == null) {
				styleCache = layerCache[textStyle] = {};
			}

			info = styleCache[text];

			if (info == null) {

				var context = this.context;

				// If the font was provided as CSS, create a div with those
				// classes and examine it to generate a canvas font spec.

				if (typeof font !== "object") {

					var element = $("<div></div>").html(text)
						.addClass(typeof font === "string" ? font : null)
						.css({
							position: "absolute",
							top: -9999
						})
						.appendTo(this.getTextLayer(layer));

					font = {
						style: element.css("font-style"),
						variant: element.css("font-variant"),
						weight: element.css("font-weight"),
						size: parseInt(element.css("font-size"), 10),
						family: element.css("font-family"),
						color: element.css("color")
					};

					element.remove();
				}

				textStyle = font.style + " " + font.variant + " " + font.weight + " " + font.size + "px " + font.family;

				// Create a new info object, initializing the dimensions to
				// zero so we can count them up line-by-line.

				info = styleCache[text] = {
					x: null,
					y: null,
					width: 0,
					height: 0,
					active: false,
					lines: [],
					font: {
						definition: textStyle,
						color: font.color
					}
				};

				context.save();
				context.font = textStyle;

				// Canvas can't handle multi-line strings; break on various
				// newlines, including HTML brs, to build a list of lines.
				// Note that we could split directly on regexps, but IE < 9 is
				// broken; revisit when we drop IE 7/8 support.

				var lines = (text + "").replace(/<br ?\/?>|\r\n|\r/g, "\n").split("\n");

				for (var i = 0; i < lines.length; ++i) {

					var lineText = lines[i],
						measured = context.measureText(lineText),
						lineWidth, lineHeight;

					lineWidth = measured.width;

					// Height might not be defined; not in the standard yet

					lineHeight = measured.height || font.size;

					// Add a bit of margin since font rendering is not pixel
					// perfect and cut off letters look bad.  This also doubles
					// as spacing between lines.

					lineHeight += Math.round(font.size * 0.15);

					info.width = Math.max(lineWidth, info.width);
					info.height += lineHeight;

					info.lines.push({
						text: lineText,
						width: lineWidth,
						height: lineHeight
					});
				}

				context.restore();
			}

			return info;
		};

		// Adds a text string to the canvas text overlay.

		Canvas.prototype.addText = function(layer, x, y, text, font, angle, halign, valign) {

			if (!plot.getOptions().canvas) {
				return addText.call(this, layer, x, y, text, font, angle, halign, valign);
			}

			var info = this.getTextInfo(layer, text, font, angle);

			info.x = x;
			info.y = y;

			// Mark the text for inclusion in the next render pass

			info.active = true;

			// Save horizontal alignment for later; we'll apply it per-line

			info.halign = halign;

			// Tweak the initial y-position to match vertical alignment

			if (valign == "middle") {
				info.y = y - info.height / 2;
			} else if (valign == "bottom") {
				info.y = y - info.height;
			}
		};
	}

	$.plot.plugins.push({
		init: init,
		options: options,
		name: "canvas",
		version: "1.0"
	});

})(jQuery);
