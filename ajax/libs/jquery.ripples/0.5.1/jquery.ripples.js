/*!
 * jQuery Ripples plugin v0.5.1 / http://github.com/sirxemic/jquery.ripples
 * MIT License
 * @author sirxemic / http://sirxemic.com/
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	}
	else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('jquery'));
	}
	else {
		// Browser globals
		factory(jQuery);
	}
}(function($) {

	'use strict';

	var gl;
	var $window = $(window); // There is only one window, so why not cache the jQuery-wrapped window?

	function isPercentage(str) {
		return str[str.length - 1] == '%';
	}

	function hasWebGLSupport() {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
		var result = context && context.getExtension('OES_texture_float');
		return result;
	}

	function createEmptyData(width, height) {
		try {
			return new ImageData(width, height);
		}
		catch (e) {
			// Fallback for IE
			var canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;

			return canvas.getContext('2d').getImageData(0, 0, width, height);
		}
	}

	function translateBackgroundPosition(value) {
		var parts = value.split(' ');

		if (parts.length === 1) {
			switch (value) {
				case 'center':
					return ['50%', '50%'];
				case 'top':
					return ['50%', '0'];
				case 'bottom':
					return ['50%', '100%'];
				case 'left':
					return ['0', '50%'];
				case 'right':
					return ['100%', '50%'];
				default:
					return [value, '50%'];
			}
		}
		else {
			return parts.map(function(part) {
				switch (value) {
					case 'center':
						return '50%';
					case 'top':
					case 'left':
						return '0';
					case 'right':
					case 'bottom':
						return '100%';
					default:
						return part;
				}
			});
		}
	}

	var transparentPixels = createEmptyData(32, 32);

	var supportsWebGL = hasWebGLSupport();

	function createProgram(vertexSource, fragmentSource, uniformValues) {
		function compileSource(type, source) {
			var shader = gl.createShader(type);
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				throw new Error('compile error: ' + gl.getShaderInfoLog(shader));
			}
			return shader;
		}

		var program = {};

		program.id = gl.createProgram();
		gl.attachShader(program.id, compileSource(gl.VERTEX_SHADER, vertexSource));
		gl.attachShader(program.id, compileSource(gl.FRAGMENT_SHADER, fragmentSource));
		gl.linkProgram(program.id);
		if (!gl.getProgramParameter(program.id, gl.LINK_STATUS)) {
			throw new Error('link error: ' + gl.getProgramInfoLog(program.id));
		}

		// Fetch the uniform and attribute locations
		program.uniforms = {};
		program.locations = {};
		gl.useProgram(program.id);
		gl.enableVertexAttribArray(0);
		var match, name, regex = /uniform (\w+) (\w+)/g, shaderCode = vertexSource + fragmentSource;
		while ((match = regex.exec(shaderCode)) != null) {
			name = match[2];
			program.locations[name] = gl.getUniformLocation(program.id, name);
		}

		return program;
	}

	function bindTexture(texture, unit) {
		gl.activeTexture(gl.TEXTURE0 + (unit || 0));
		gl.bindTexture(gl.TEXTURE_2D, texture);
	}

	function extractUrl(value) {
		var urlMatch = /url\(["']?([^"']*)["']?\)/.exec(value);
		if (urlMatch == null) {
			return null;
		}

		return urlMatch[1];
	}

	function isDataUri(url) {
		return url.match(/^data:/);
	}

	// Extend the css
	$('head').prepend('<style>.jquery-ripples { position: relative; z-index: 0; }</style>');

	// RIPPLES CLASS DEFINITION
	// =========================

	var Ripples = function (el, options) {
		var that = this;

		this.$el = $(el);

		// Init properties from options
		this.interactive = options.interactive;
		this.resolution = options.resolution;
		this.textureDelta = new Float32Array([1 / this.resolution, 1 / this.resolution]);

		this.perturbance = options.perturbance;
		this.dropRadius = options.dropRadius;

		this.crossOrigin = options.crossOrigin;
		this.imageUrl = options.imageUrl;

		// Init WebGL canvas
		var canvas = document.createElement('canvas');
		canvas.width = this.$el.innerWidth();
		canvas.height = this.$el.innerHeight();
		this.canvas = canvas;
		this.$canvas = $(canvas);
		this.$canvas.css({
			position: 'absolute',
			left: 0,
			top: 0,
			right: 0,
			bottom: 0,
			zIndex: -1
		});

		this.$el.addClass('jquery-ripples').append(canvas);
		this.context = gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

		// Load extensions
		gl.getExtension('OES_texture_float');
		var linearSupport = gl.getExtension('OES_texture_float_linear');

		// Start listening to window resize events
		$(window).on('resize', function() {
			var newWidth = that.$el.innerWidth(),
					newHeight = that.$el.innerHeight();

			if (newWidth != that.canvas.width || newHeight != that.canvas.height) {
				canvas.width = newWidth;
				canvas.height = newHeight;
			}
		});

		// Start listening to mouse events
		this.$el.on('mousemove.ripples', function(e) {
			if (that.visible && that.running && that.interactive) {
				that.dropAtMouse(e, that.dropRadius, 0.01);
			}
		}).on('mousedown.ripples', function(e) {
			if (that.visible && that.running && that.interactive) {
				that.dropAtMouse(e, that.dropRadius * 1.5, 0.14);
			}
		});

		// Init rendertargets for ripple data.
		this.textures = [];
		this.framebuffers = [];

		for (var i = 0; i < 2; i++) {
			var texture = gl.createTexture();
			var framebuffer = gl.createFramebuffer();

			gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
			framebuffer.width = this.resolution;
			framebuffer.height = this.resolution;

			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, linearSupport ? gl.LINEAR : gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, linearSupport ? gl.LINEAR : gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.resolution, this.resolution, 0, gl.RGBA, gl.FLOAT, null);

			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
			if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
				throw new Error('Rendering to this texture is not supported (incomplete framebuffer)');
			}

			gl.bindTexture(gl.TEXTURE_2D, null);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);

			this.textures.push(texture);
			this.framebuffers.push(framebuffer);
		}

		// Init GL stuff
		this.quad = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1, -1,
			+1, -1,
			+1, +1,
			-1, +1
		]), gl.STATIC_DRAW);

		this.initShaders();
		this.initTexture();
		this.setTransparentTexture();

		// Load the image either from the options or CSS rules
		this.loadImage();

		// Set correct clear color and blend mode (regular alpha blending)
		gl.clearColor(0, 0, 0, 0);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		// Plugin is successfully initialized!
		this.visible = true;
		this.running = true;
		this.inited = true;

		// Init animation
		function step() {
			that.step();
			requestAnimationFrame(step);
		}

		requestAnimationFrame(step);
	};

	Ripples.DEFAULTS = {
		imageUrl: null,
		resolution: 256,
		dropRadius: 20,
		perturbance: 0.03,
		interactive: true,
		crossOrigin: ''
	};

	Ripples.prototype = {

		// Load the image either from the options or the element's CSS rules.
		loadImage: function() {
			var that = this;

			gl = this.context;

			var newImageSource = this.imageUrl ||
				extractUrl(this.originalCssBackgroundImage) ||
				extractUrl(this.$el.css('backgroundImage'));

			// If image source is unchanged, don't reload it.
			if (newImageSource == this.imageSource) {
				return;
			}

			this.imageSource = newImageSource;

			// Falsy source means no background.
			if (!this.imageSource) {
				this.setTransparentTexture();
				return;
			}

			// Load the texture from a new image.
			var image = new Image;
			image.onload = function() {
				gl = that.context;

				// Only textures with dimensions of powers of two can have repeat wrapping.
				function isPowerOfTwo(x) {
					return (x & (x - 1)) == 0;
				}

				var wrapping = (isPowerOfTwo(image.width) && isPowerOfTwo(image.height)) ? gl.REPEAT : gl.CLAMP_TO_EDGE;

				gl.bindTexture(gl.TEXTURE_2D, that.backgroundTexture);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapping);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapping);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

				that.backgroundWidth = image.width;
				that.backgroundHeight = image.height;

				// Hide the background that we're replacing.
				that.hideCssBackground();
			};

			// Fall back to a transparent texture when loading the image failed.
			image.onerror = function() {
				gl = that.context;

				that.setTransparentTexture();
			};

			// Disable CORS when the image source is a data URI.
			image.crossOrigin = isDataUri(this.imageSource) ? null : this.crossOrigin;

			image.src = this.imageSource;
		},

		step: function() {
			gl = this.context;

			if (!this.visible) {
				return;
			}

			this.computeTextureBoundaries();

			if (this.running) {
				this.update();
			}

			this.render();
		},

		drawQuad: function() {
			gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
			gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
			gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
		},

		render: function() {
			gl.viewport(0, 0, this.canvas.width, this.canvas.height);

			gl.enable(gl.BLEND);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

			gl.useProgram(this.renderProgram.id);

			bindTexture(this.backgroundTexture, 0);
			bindTexture(this.textures[0], 1);

			gl.uniform1f(this.renderProgram.locations.perturbance, this.perturbance);
			gl.uniform2fv(this.renderProgram.locations.topLeft, this.renderProgram.uniforms.topLeft);
			gl.uniform2fv(this.renderProgram.locations.bottomRight, this.renderProgram.uniforms.bottomRight);
			gl.uniform2fv(this.renderProgram.locations.containerRatio, this.renderProgram.uniforms.containerRatio);
			gl.uniform1i(this.renderProgram.locations.samplerBackground, 0);
			gl.uniform1i(this.renderProgram.locations.samplerRipples, 1);

			this.drawQuad();
			gl.disable(gl.BLEND);
		},

		update: function() {
			gl.viewport(0, 0, this.resolution, this.resolution);

			for (var i = 0; i < 2; i++) {
				gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[i]);
				bindTexture(this.textures[1-i]);
				gl.useProgram(this.updateProgram[i].id);

				this.drawQuad();
			}

			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		},

		computeTextureBoundaries: function() {
			var backgroundSize = this.$el.css('background-size');
			var backgroundAttachment = this.$el.css('background-attachment');
			var backgroundPosition = translateBackgroundPosition(this.$el.css('background-position'));

			// Here the 'window' is the element which the background adapts to
			// (either the chrome window or some element, depending on attachment)
			var parElement = backgroundAttachment == 'fixed' ? $window : this.$el;
			var winOffset = parElement.offset() || {left: pageXOffset, top: pageYOffset};
			var winWidth = parElement.innerWidth();
			var winHeight = parElement.innerHeight();

			// TODO: background-clip
			if (backgroundSize == 'cover') {
				var scale = Math.max(winWidth / this.backgroundWidth, winHeight / this.backgroundHeight);

				var backgroundWidth = this.backgroundWidth * scale;
				var backgroundHeight = this.backgroundHeight * scale;
			}
			else if (backgroundSize == 'contain') {
				var scale = Math.min(winWidth / this.backgroundWidth, winHeight / this.backgroundHeight);

				var backgroundWidth = this.backgroundWidth * scale;
				var backgroundHeight = this.backgroundHeight * scale;
			}
			else {
				backgroundSize = backgroundSize.split(' ');
				var backgroundWidth = backgroundSize[0] || '';
				var backgroundHeight = backgroundSize[1] || backgroundWidth;

				if (isPercentage(backgroundWidth)) {
					backgroundWidth = winWidth * parseFloat(backgroundWidth) / 100;
				}
				else if (backgroundWidth != 'auto') {
					backgroundWidth = parseFloat(backgroundWidth);
				}

				if (isPercentage(backgroundHeight)) {
					backgroundHeight = winHeight * parseFloat(backgroundHeight) / 100;
				}
				else if (backgroundHeight != 'auto') {
					backgroundHeight = parseFloat(backgroundHeight);
				}

				if (backgroundWidth == 'auto' && backgroundHeight == 'auto') {
					backgroundWidth = this.backgroundWidth;
					backgroundHeight = this.backgroundHeight;
				}
				else {
					if (backgroundWidth == 'auto') {
						backgroundWidth = this.backgroundWidth * (backgroundHeight / this.backgroundHeight);
					}

					if (backgroundHeight == 'auto') {
						backgroundHeight = this.backgroundHeight * (backgroundWidth / this.backgroundWidth);
					}
				}
			}

			// Compute backgroundX and backgroundY in page coordinates
			var backgroundX = backgroundPosition[0];
			var backgroundY = backgroundPosition[1];

			if (isPercentage(backgroundX)) {
				backgroundX = winOffset.left + (winWidth - backgroundWidth) * parseFloat(backgroundX) / 100;
			}
			else {
				backgroundX = winOffset.left + parseFloat(backgroundX);
			}

			if (isPercentage(backgroundY)) {
				backgroundY = winOffset.top + (winHeight - backgroundHeight) * parseFloat(backgroundY) / 100;
			}
			else {
				backgroundY = winOffset.top + parseFloat(backgroundY);
			}

			var elementOffset = this.$el.offset();

			this.renderProgram.uniforms.topLeft = new Float32Array([
				(elementOffset.left - backgroundX) / backgroundWidth,
				(elementOffset.top - backgroundY) / backgroundHeight
			]);
			this.renderProgram.uniforms.bottomRight = new Float32Array([
				this.renderProgram.uniforms.topLeft[0] + this.$el.innerWidth() / backgroundWidth,
				this.renderProgram.uniforms.topLeft[1] + this.$el.innerHeight() / backgroundHeight
			]);

			var maxSide = Math.max(this.canvas.width, this.canvas.height);

			this.renderProgram.uniforms.containerRatio = new Float32Array([
				this.canvas.width / maxSide,
				this.canvas.height / maxSide
			]);
		},

		initShaders: function() {
			var vertexShader = [
				'attribute vec2 vertex;',
				'varying vec2 coord;',
				'void main() {',
					'coord = vertex * 0.5 + 0.5;',
					'gl_Position = vec4(vertex, 0.0, 1.0);',
				'}'
			].join('\n');

			this.dropProgram = createProgram(vertexShader, [
				'precision highp float;',

				'const float PI = 3.141592653589793;',
				'uniform sampler2D texture;',
				'uniform vec2 center;',
				'uniform float radius;',
				'uniform float strength;',

				'varying vec2 coord;',

				'void main() {',
					'vec4 info = texture2D(texture, coord);',

					'float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);',
					'drop = 0.5 - cos(drop * PI) * 0.5;',

					'info.r += drop * strength;',

					'gl_FragColor = info;',
				'}'
			].join('\n'));

			this.updateProgram = [0,0];
			this.updateProgram[0] = createProgram(vertexShader, [
				'precision highp float;',

				'uniform sampler2D texture;',
				'uniform vec2 delta;',

				'varying vec2 coord;',

				'void main() {',
					'vec4 info = texture2D(texture, coord);',

					'vec2 dx = vec2(delta.x, 0.0);',
					'vec2 dy = vec2(0.0, delta.y);',

					'float average = (',
						'texture2D(texture, coord - dx).r +',
						'texture2D(texture, coord - dy).r +',
						'texture2D(texture, coord + dx).r +',
						'texture2D(texture, coord + dy).r',
					') * 0.25;',

					'info.g += (average - info.r) * 2.0;',
					'info.g *= 0.995;',
					'info.r += info.g;',

					'gl_FragColor = info;',
				'}'
			].join('\n'));
			gl.uniform2fv(this.updateProgram[0].locations.delta, this.textureDelta);

			this.updateProgram[1] = createProgram(vertexShader, [
				'precision highp float;',

				'uniform sampler2D texture;',
				'uniform vec2 delta;',

				'varying vec2 coord;',

				'void main() {',
					'vec4 info = texture2D(texture, coord);',

					'vec3 dx = vec3(delta.x, texture2D(texture, vec2(coord.x + delta.x, coord.y)).r - info.r, 0.0);',
					'vec3 dy = vec3(0.0, texture2D(texture, vec2(coord.x, coord.y + delta.y)).r - info.r, delta.y);',
					'info.ba = normalize(cross(dy, dx)).xz;',

					'gl_FragColor = info;',
				'}'
			].join('\n'));
			gl.uniform2fv(this.updateProgram[1].locations.delta, this.textureDelta);

			this.renderProgram = createProgram([
				'precision highp float;',

				'attribute vec2 vertex;',
				'uniform vec2 topLeft;',
				'uniform vec2 bottomRight;',
				'uniform vec2 containerRatio;',
				'varying vec2 ripplesCoord;',
				'varying vec2 backgroundCoord;',
				'void main() {',
					'backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);',
					'backgroundCoord.y = 1.0 - backgroundCoord.y;',
					'ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;',
					'gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);',
				'}'
			].join('\n'), [
				'precision highp float;',

				'uniform sampler2D samplerBackground;',
				'uniform sampler2D samplerRipples;',
				'uniform float perturbance;',
				'varying vec2 ripplesCoord;',
				'varying vec2 backgroundCoord;',

				'void main() {',
					'vec2 offset = -texture2D(samplerRipples, ripplesCoord).ba;',
					'float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);',
					'gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;',
				'}'
			].join('\n'));
		},

		initTexture: function() {
			this.backgroundTexture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, this.backgroundTexture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		},

		setTransparentTexture: function() {
			gl.bindTexture(gl.TEXTURE_2D, this.backgroundTexture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, transparentPixels);
		},

		hideCssBackground: function() {

			// Check whether we're changing inline CSS or overriding a global CSS rule.
			var inlineCss = this.$el[0].style.backgroundImage;

			if (inlineCss == 'none') {
				return;
			}

			this.originalInlineCss = inlineCss;

			this.originalCssBackgroundImage = this.$el.css('backgroundImage');
			this.$el.css('backgroundImage', 'none');
		},

		restoreCssBackground: function() {

			// Restore background by either changing the inline CSS rule to what it was, or
			// simply remove the inline CSS rule if it never was inlined.
			this.$el.css('backgroundImage', this.originalInlineCss || '');
		},

		dropAtMouse: function(e, radius, strength) {
			var borderLeft = parseInt(this.$el.css('border-left-width')) || 0,
					borderTop = parseInt(this.$el.css('border-top-width')) || 0;

			this.drop(
				e.pageX - this.$el.offset().left - borderLeft,
				e.pageY - this.$el.offset().top - borderTop,
				radius,
				strength
			);
		},

		/**
		 *  Public methods
		 */
		drop: function(x, y, radius, strength) {
			gl = this.context;

			var elWidth = this.$el.innerWidth();
			var elHeight = this.$el.innerHeight();
			var longestSide = Math.max(elWidth, elHeight);

			radius = radius / longestSide;

			var dropPosition = new Float32Array([
				(2 * x - elWidth) / longestSide,
				(elHeight - 2 * y) / longestSide
			]);

			gl.viewport(0, 0, this.resolution, this.resolution);

			// Render onto texture/framebuffer 0
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffers[0]);

			// Using texture 1
			bindTexture(this.textures[1]);

			gl.useProgram(this.dropProgram.id);
			gl.uniform2fv(this.dropProgram.locations.center, dropPosition);
			gl.uniform1f(this.dropProgram.locations.radius, radius);
			gl.uniform1f(this.dropProgram.locations.strength, strength);

			this.drawQuad();

			// Switch textures
			var t = this.framebuffers[0]; this.framebuffers[0] = this.framebuffers[1]; this.framebuffers[1] = t;
			t = this.textures[0]; this.textures[0] = this.textures[1]; this.textures[1] = t;

			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		},

		destroy: function() {
			this.$el
				.off('.ripples')
				.removeClass('jquery-ripples')
				.removeData('ripples');

			this.$canvas.remove();
			this.restoreCssBackground();
		},

		show: function() {
			this.visible = true;

			this.$canvas.show();
			this.hideCssBackground();
		},

		hide: function() {
			this.visible = false;

			this.$canvas.hide();
			this.restoreCssBackground();
		},

		pause: function() {
			this.running = false;
		},

		play: function() {
			this.running = true;
		},

		set: function(property, value) {
			switch (property) {
				case 'dropRadius':
				case 'perturbance':
				case 'interactive':
				case 'crossOrigin':
					this[property] = value;
					break;
				case 'imageUrl':
					this.imageUrl = value;
					this.loadImage();
					break;
			}
		}
	};

	// RIPPLES PLUGIN DEFINITION
	// ==========================

	var old = $.fn.ripples;

	$.fn.ripples = function(option) {
		if (!supportsWebGL) {
			throw new Error('Your browser does not support WebGL or the OES_texture_float extension.');
		}

		var args = (arguments.length > 1) ? Array.prototype.slice.call(arguments, 1) : undefined;

		return this.each(function() {
			var $this = $(this),
					data = $this.data('ripples'),
					options = $.extend({}, Ripples.DEFAULTS, $this.data(), typeof option == 'object' && option);

			if (!data && typeof option == 'string') {
				return;
			}
			if (!data) {
				$this.data('ripples', (data = new Ripples(this, options)));
			}
			else if (typeof option == 'string') {
				Ripples.prototype[option].apply(data, args);
			}
		});
	};

	$.fn.ripples.Constructor = Ripples;


	// RIPPLES NO CONFLICT
	// ====================

	$.fn.ripples.noConflict = function() {
		$.fn.ripples = old;
		return this;
	};

}));
