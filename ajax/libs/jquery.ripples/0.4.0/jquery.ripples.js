/**
 * jQuery Ripples plugin v0.4.0 / http://github.com/sirxemic/jquery.ripples
 * MIT License
 * @author sirxemic / http://sirxemic.com/
 */

+function ($) {

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

	var supportsWebGL = hasWebGLSupport();

	function createProgram(vertexSource, fragmentSource, uniformValues)
	{
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
		var name, type, regex = /uniform (\w+) (\w+)/g, shaderCode = vertexSource + fragmentSource;
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

	// Extend the css
	$('head').prepend('<style>.jquery-ripples { position: relative; z-index: 0; }</style>');

	// RIPPLES CLASS DEFINITION
	// =========================

	var Ripples = function (el, options) {
		var that = this;

		this.$el = $(el);
		this.$el.addClass('jquery-ripples');

		// If this element doesn't have a background image, don't apply this effect to it
		var backgroundUrl = (/url\(["']?([^"']*)["']?\)/.exec(this.$el.css('background-image')));
		if (backgroundUrl == null) return;
		backgroundUrl = backgroundUrl[1];

		this.interactive = options.interactive;
		this.resolution = options.resolution || 256;
		this.textureDelta = new Float32Array([1 / this.resolution, 1 / this.resolution]);

		this.perturbance = options.perturbance;
		this.dropRadius = options.dropRadius;

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

		this.$el.append(canvas);
		this.context = gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

		// Load extensions
		gl.getExtension('OES_texture_float');
		var linearSupport = gl.getExtension('OES_texture_float_linear');

		// Init events
		$(window).on('resize', function() {
			if (that.$el.innerWidth() != that.canvas.width || that.$el.innerHeight() != that.canvas.height) {
				canvas.width = that.$el.innerWidth();
				canvas.height = that.$el.innerHeight();
			}
		});

		this.$el.on('mousemove.ripples', function(e) {
			if (that.visible && that.running && that.interactive) that.dropAtMouse(e, that.dropRadius, 0.01);
		}).on('mousedown.ripples', function(e) {
			if (that.visible && that.running && that.interactive) that.dropAtMouse(e, that.dropRadius * 1.5, 0.14);
		});

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

		this.running = true;

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

		// Init textures
		var image = new Image;
		image.crossOrigin = '';
		image.onload = function() {
			gl = that.context;

			function isPowerOfTwo(x) {
				return (x & (x - 1)) == 0;
			}

			var wrapping = (isPowerOfTwo(image.width) && isPowerOfTwo(image.height)) ? gl.REPEAT : gl.CLAMP_TO_EDGE;

			that.backgroundWidth = image.width;
			that.backgroundHeight = image.height;

			var texture = gl.createTexture();

			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapping);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapping);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

			that.backgroundTexture = texture;

			// Everything loaded successfully - hide the CSS background image
			that.$el.css('backgroundImage', 'none');
		};
		image.src = backgroundUrl;

		this.visible = true;

		gl.clearColor(0, 0, 0, 0);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		// Init animation
		function step() {
			that.step();
			requestAnimationFrame(step);
		}

		requestAnimationFrame(step);
	};

	Ripples.DEFAULTS = {
		resolution: 256,
		dropRadius: 20,
		perturbance: 0.03,
		interactive: true
	};

	Ripples.prototype = {

		step: function() {
			gl = this.context;

			if (!this.visible || !this.backgroundTexture) return;

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
			var backgroundPosition = this.$el.css('background-position').split(' ');

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

				if (isPercentage(backgroundWidth)) backgroundWidth = winWidth * parseFloat(backgroundWidth) / 100;
				else if (backgroundWidth != 'auto') backgroundWidth = parseFloat(backgroundWidth);

				if (isPercentage(backgroundHeight)) backgroundHeight = winHeight * parseFloat(backgroundHeight) / 100;
				else if (backgroundHeight != 'auto') backgroundHeight = parseFloat(backgroundHeight);

				if (backgroundWidth == 'auto' && backgroundHeight == 'auto') {
					backgroundWidth = this.backgroundWidth;
					backgroundHeight = this.backgroundHeight;
				}
				else {
					if (backgroundWidth == 'auto') backgroundWidth = this.backgroundWidth * (backgroundHeight / this.backgroundHeight);
					if (backgroundHeight == 'auto') backgroundHeight = this.backgroundHeight * (backgroundWidth / this.backgroundWidth);
				}
			}

			// Compute backgroundX and backgroundY in page coordinates
			var backgroundX = backgroundPosition[0] || '';
			var backgroundY = backgroundPosition[1] || backgroundX;

			if (backgroundX == 'left') backgroundX = winOffset.left;
			else if (backgroundX == 'center') backgroundX = winOffset.left + winWidth / 2 - backgroundWidth / 2;
			else if (backgroundX == 'right') backgroundX = winOffset.left + winWidth - backgroundWidth;
			else if (isPercentage(backgroundX)) {
				backgroundX = winOffset.left + (winWidth - backgroundWidth) * parseFloat(backgroundX) / 100;
			}
			else {
				backgroundX = parseFloat(backgroundX);
			}

			if (backgroundY == 'top') backgroundY = winOffset.top;
			else if (backgroundY == 'center') backgroundY = winOffset.top + winHeight / 2 - backgroundHeight / 2;
			else if (backgroundY == 'bottom') backgroundY = winOffset.top + winHeight - backgroundHeight;
			else if (isPercentage(backgroundY)) {
				backgroundY = winOffset.top + (winHeight - backgroundHeight) * parseFloat(backgroundY) / 100;
			}
			else {
				backgroundY = parseFloat(backgroundY);
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
			gl.uniform1f(this.renderProgram.locations.perturbance, this.perturbance);
		},

		dropAtMouse: function(e, radius, strength) {
			this.drop(
				e.pageX - this.$el.offset().left,
				e.pageY - this.$el.offset().top,
				radius,
				strength
			);
		},

		drop: function(x, y, radius, strength) {
			var that = this;

			gl = this.context;

			var elWidth = this.$el.outerWidth();
			var elHeight = this.$el.outerHeight();
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

		// Actions
		destroy: function() {
			this.canvas.remove();
			this.$el.off('.ripples');
			this.$el.css('backgroundImage', '');
			this.$el.removeClass('jquery-ripples').removeData('ripples');
		},

		show: function() {
			this.$canvas.show();
			this.$el.css('backgroundImage', 'none');
			this.visible = true;
		},

		hide: function() {
			this.$canvas.hide();
			this.$el.css('backgroundImage', '');
			this.visible = false;
		},

		pause: function() {
			this.running = false;
		},

		play: function() {
			this.running = true;
		},

		set: function(property, value)
		{
			switch (property)
			{
				case 'interactive':
					this.interactive = value;
					break;
			}
		}
	};

	// RIPPLES PLUGIN DEFINITION
	// ==========================

	var old = $.fn.ripples;

	$.fn.ripples = function(option) {
		if (!supportsWebGL) throw new Error('Your browser does not support WebGL or the OES_texture_float extension.');

		var args = (arguments.length > 1) ? Array.prototype.slice.call(arguments, 1) : undefined;

		return this.each(function() {
			var $this   = $(this);
			var data    = $this.data('ripples');
			var options = $.extend({}, Ripples.DEFAULTS, $this.data(), typeof option == 'object' && option);

			if (!data && typeof option == 'string') return;
			if (!data) $this.data('ripples', (data = new Ripples(this, options)));
			else if (typeof option == 'string') Ripples.prototype[option].apply(data, args);
		});
	}

	$.fn.ripples.Constructor = Ripples;


	// RIPPLES NO CONFLICT
	// ====================

	$.fn.ripples.noConflict = function() {
		$.fn.ripples = old;
		return this;
	}

}(window.jQuery);
