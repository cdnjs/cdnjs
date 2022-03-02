/**
 * @license
 * PlayCanvas Engine v1.52.2 revision 610e6669f
 * Copyright 2011-2022 PlayCanvas Ltd. All rights reserved.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.pcx = {}));
})(this, (function (exports) { 'use strict';

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}

	var CpuTimer = function () {
		function CpuTimer(app) {
			this._frameIndex = 0;
			this._frameTimings = [];
			this._timings = [];
			this._prevTimings = [];
			this.unitsName = "ms";
			this.decimalPlaces = 1;
			this.enabled = true;
			app.on('frameupdate', this.begin.bind(this, 'update'));
			app.on('framerender', this.mark.bind(this, 'render'));
			app.on('frameend', this.mark.bind(this, 'other'));
		}

		var _proto = CpuTimer.prototype;

		_proto.begin = function begin(name) {
			if (!this.enabled) {
				return;
			}

			if (this._frameIndex < this._frameTimings.length) {
				this._frameTimings.splice(this._frameIndex);
			}

			var tmp = this._prevTimings;
			this._prevTimings = this._timings;
			this._timings = this._frameTimings;
			this._frameTimings = tmp;
			this._frameIndex = 0;
			this.mark(name);
		};

		_proto.mark = function mark(name) {
			if (!this.enabled) {
				return;
			}

			var timestamp = pc.now();

			if (this._frameIndex > 0) {
				var prev = this._frameTimings[this._frameIndex - 1];
				prev[1] = timestamp - prev[1];
			} else if (this._timings.length > 0) {
				var _prev = this._timings[this._timings.length - 1];
				_prev[1] = timestamp - _prev[1];
			}

			if (this._frameIndex >= this._frameTimings.length) {
				this._frameTimings.push([name, timestamp]);
			} else {
				var timing = this._frameTimings[this._frameIndex];
				timing[0] = name;
				timing[1] = timestamp;
			}

			this._frameIndex++;
		};

		_createClass(CpuTimer, [{
			key: "timings",
			get: function get() {
				return this._timings.slice(0, -1).map(function (v) {
					return v[1];
				});
			}
		}]);

		return CpuTimer;
	}();

	var GpuTimer = function () {
		function GpuTimer(app) {
			this._gl = app.graphicsDevice.gl;
			this._ext = app.graphicsDevice.extDisjointTimerQuery;
			this._freeQueries = [];
			this._frameQueries = [];
			this._frames = [];
			this._timings = [];
			this._prevTimings = [];
			this.enabled = true;
			this.unitsName = "ms";
			this.decimalPlaces = 1;
			app.on('frameupdate', this.begin.bind(this, 'update'));
			app.on('framerender', this.mark.bind(this, 'render'));
			app.on('frameend', this.end.bind(this));
		}

		var _proto = GpuTimer.prototype;

		_proto.loseContext = function loseContext() {
			this._freeQueries = [];
			this._frameQueries = [];
			this._frames = [];
		};

		_proto.begin = function begin(name) {
			if (!this.enabled) {
				return;
			}

			if (this._frameQueries.length > 0) {
				this.end();
			}

			this._checkDisjoint();

			if (this._frames.length > 0) {
				if (this._resolveFrameTimings(this._frames[0], this._prevTimings)) {
					var tmp = this._prevTimings;
					this._prevTimings = this._timings;
					this._timings = tmp;
					this._freeQueries = this._freeQueries.concat(this._frames.splice(0, 1)[0]);
				}
			}

			this.mark(name);
		};

		_proto.mark = function mark(name) {
			if (!this.enabled) {
				return;
			}

			if (this._frameQueries.length > 0) {
				this._gl.endQuery(this._ext.TIME_ELAPSED_EXT);
			}

			var query = this._allocateQuery();

			query[0] = name;

			this._gl.beginQuery(this._ext.TIME_ELAPSED_EXT, query[1]);

			this._frameQueries.push(query);
		};

		_proto.end = function end() {
			if (!this.enabled) {
				return;
			}

			this._gl.endQuery(this._ext.TIME_ELAPSED_EXT);

			this._frames.push(this._frameQueries);

			this._frameQueries = [];
		};

		_proto._checkDisjoint = function _checkDisjoint() {
			var disjoint = this._gl.getParameter(this._ext.GPU_DISJOINT_EXT);

			if (disjoint) {
				this._freeQueries = [this._frames, [this._frameQueries], [this._freeQueries]].flat(2);
				this._frameQueries = [];
				this._frames = [];
			}
		};

		_proto._allocateQuery = function _allocateQuery() {
			return this._freeQueries.length > 0 ? this._freeQueries.splice(-1, 1)[0] : ["", this._gl.createQuery()];
		};

		_proto._resolveFrameTimings = function _resolveFrameTimings(frame, timings) {
			if (!this._gl.getQueryParameter(frame[frame.length - 1][1], this._gl.QUERY_RESULT_AVAILABLE)) {
				return false;
			}

			for (var i = 0; i < frame.length; ++i) {
				timings[i] = [frame[i][0], this._gl.getQueryParameter(frame[i][1], this._gl.QUERY_RESULT) * 0.000001];
			}

			return true;
		};

		_createClass(GpuTimer, [{
			key: "timings",
			get: function get() {
				return this._timings.map(function (v) {
					return v[1];
				});
			}
		}]);

		return GpuTimer;
	}();

	var StatsTimer = function () {
		function StatsTimer(app, statNames, decimalPlaces, unitsName, multiplier) {
			var _this = this;

			this.app = app;
			this.values = [];
			this.statNames = statNames;
			if (this.statNames.length > 3) this.statNames.length = 3;
			this.unitsName = unitsName;
			this.decimalPlaces = decimalPlaces;
			this.multiplier = multiplier || 1;

			var resolve = function resolve(path, obj) {
				return path.split('.').reduce(function (prev, curr) {
					return prev ? prev[curr] : null;
				}, obj || _this);
			};

			app.on('frameupdate', function (ms) {
				for (var i = 0; i < _this.statNames.length; i++) {
					_this.values[i] = resolve(_this.statNames[i], _this.app.stats) * _this.multiplier;
				}
			});
		}

		_createClass(StatsTimer, [{
			key: "timings",
			get: function get() {
				return this.values;
			}
		}]);

		return StatsTimer;
	}();

	var Graph = function () {
		function Graph(name, app, watermark, textRefreshRate, timer) {
			this.name = name;
			this.device = app.graphicsDevice;
			this.timer = timer;
			this.watermark = watermark;
			this.enabled = false;
			this.textRefreshRate = textRefreshRate;
			this.avgTotal = 0;
			this.avgTimer = 0;
			this.avgCount = 0;
			this.timingText = "";
			this.texture = null;
			this.yOffset = 0;
			this.cursor = 0;
			this.sample = new Uint8ClampedArray(4);
			this.sample.set([0, 0, 0, 255]);
			app.on('frameupdate', this.update.bind(this));
			this.counter = 0;
		}

		var _proto = Graph.prototype;

		_proto.loseContext = function loseContext() {
			if (this.timer && typeof this.timer.loseContext === 'function') {
				this.timer.loseContext();
			}
		};

		_proto.update = function update(ms) {
			var timings = this.timer.timings;
			var total = timings.reduce(function (a, v) {
				return a + v;
			}, 0);
			this.avgTotal += total;
			this.avgTimer += ms;
			this.avgCount++;

			if (this.avgTimer > this.textRefreshRate) {
				this.timingText = (this.avgTotal / this.avgCount).toFixed(this.timer.decimalPlaces);
				this.avgTimer = 0;
				this.avgTotal = 0;
				this.avgCount = 0;
			}

			if (this.enabled) {
				var value = 0;
				var range = 1.5 * this.watermark;

				for (var i = 0; i < timings.length; ++i) {
					value += Math.floor(timings[i] / range * 255);
					this.sample[i] = value;
				}

				this.sample[3] = this.watermark / range * 255;
				var gl = this.device.gl;
				this.device.bindTexture(this.texture);
				gl.texSubImage2D(gl.TEXTURE_2D, 0, this.cursor, this.yOffset, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, this.sample);
				this.cursor++;

				if (this.cursor === this.texture.width) {
					this.cursor = 0;
				}
			}
		};

		_proto.render = function render(render2d, x, y, w, h) {
			render2d.quad(this.texture, x + w, y, -w, h, this.cursor, 0.5 + this.yOffset, -w, 0, this.enabled);
		};

		return Graph;
	}();

	var WordAtlas = function () {
		function WordAtlas(texture, words) {
			var canvas = document.createElement('canvas');
			canvas.width = texture.width;
			canvas.height = texture.height;
			var context = canvas.getContext('2d', {
				alpha: true
			});
			context.font = '10px "Lucida Console", Monaco, monospace';
			context.textAlign = "left";
			context.textBaseline = "alphabetic";
			context.fillStyle = "rgb(255, 255, 255)";
			var padding = 5;
			var x = padding;
			var y = padding;
			var placements = [];

			for (var i = 0; i < words.length; ++i) {
				var measurement = context.measureText(words[i]);
				var l = Math.ceil(-measurement.actualBoundingBoxLeft);
				var r = Math.ceil(measurement.actualBoundingBoxRight);
				var a = Math.ceil(measurement.actualBoundingBoxAscent);
				var d = Math.ceil(measurement.actualBoundingBoxDescent);
				var w = l + r;
				var h = a + d;

				if (x + w >= canvas.width) {
					x = padding;
					y += 16;
				}

				context.fillStyle = words[i].length === 1 ? "rgb(255, 255, 255)" : "rgb(150, 150, 150)";
				context.fillText(words[i], x - l, y + a);
				placements.push({
					l: l,
					r: r,
					a: a,
					d: d,
					x: x,
					y: y,
					w: w,
					h: h
				});
				x += w + padding;
			}

			var wordMap = {};
			words.forEach(function (w, i) {
				wordMap[w] = i;
			});
			this.words = words;
			this.wordMap = wordMap;
			this.placements = placements;
			this.texture = texture;
			var source = context.getImageData(0, 0, canvas.width, canvas.height);
			var dest = texture.lock();

			for (var _y = 0; _y < source.height; ++_y) {
				for (var _x = 0; _x < source.width; ++_x) {
					var offset = (_x + _y * texture.width) * 4;
					dest[offset] = 255;
					dest[offset + 1] = 255;
					dest[offset + 2] = 255;
					var red = source.data[(_x + (source.height - 1 - _y) * source.width) * 4];
					var alpha = source.data[(_x + (source.height - 1 - _y) * source.width) * 4 + 3];
					dest[offset + 3] = alpha * (red > 150 ? 1 : 0.7);
				}
			}
		}

		var _proto = WordAtlas.prototype;

		_proto.render = function render(render2d, word, x, y) {
			var p = this.placements[this.wordMap[word]];

			if (p) {
				var padding = 1;
				render2d.quad(this.texture, x + p.l - padding, y - p.d + padding, p.w + padding * 2, p.h + padding * 2, p.x - padding, 64 - p.y - p.h - padding, undefined, undefined, true);
				return p.w;
			}

			return 0;
		};

		return WordAtlas;
	}();

	var Render2d = function () {
		function Render2d(device, colors, maxQuads) {
			var _this = this;

			if (maxQuads === void 0) {
				maxQuads = 512;
			}

			var vertexShader = 'attribute vec3 vertex_position;\n' + 'attribute vec4 vertex_texCoord0;\n' + 'uniform vec4 screenAndTextureSize;\n' + 'varying vec4 uv0;\n' + 'varying float enabled;\n' + 'void main(void) {\n' + '		vec2 pos = vertex_position.xy / screenAndTextureSize.xy;\n' + '		gl_Position = vec4(pos * 2.0 - 1.0, 0.5, 1.0);\n' + '		uv0 = vec4(vertex_texCoord0.xy / screenAndTextureSize.zw, vertex_texCoord0.zw);\n' + '		enabled = vertex_position.z;\n' + '}\n';
			var fragmentShader = 'varying vec4 uv0;\n' + 'varying float enabled;\n' + 'uniform vec4 clr;\n' + 'uniform vec4 col0;\n' + 'uniform vec4 col1;\n' + 'uniform vec4 col2;\n' + 'uniform vec4 watermark;\n' + 'uniform float watermarkSize;\n' + 'uniform vec4 background;\n' + 'uniform sampler2D source;\n' + 'void main (void) {\n' + '		vec4 tex = texture2D(source, uv0.xy);\n' + '		if (!(tex.rgb == vec3(1.0, 1.0, 1.0))) {\n' + '			 if (enabled < 0.5)\n' + '					 tex = background;\n' + '			 else if (abs(uv0.w - tex.a) < watermarkSize)\n' + '					 tex = watermark;\n' + '			 else if (uv0.w < tex.r)\n' + '					 tex = col0;\n' + '			 else if (uv0.w < tex.g)\n' + '					 tex = col1;\n' + '			 else if (uv0.w < tex.b)\n' + '					 tex = col2;\n' + '			 else\n' + '					 tex = background;\n' + '		}\n' + '		gl_FragColor = tex * clr;\n' + '}\n';
			var format = new pc.VertexFormat(device, [{
				semantic: pc.SEMANTIC_POSITION,
				components: 3,
				type: pc.TYPE_FLOAT32
			}, {
				semantic: pc.SEMANTIC_TEXCOORD0,
				components: 4,
				type: pc.TYPE_FLOAT32
			}]);
			var indices = new Uint16Array(maxQuads * 6);

			for (var i = 0; i < maxQuads; ++i) {
				indices[i * 6 + 0] = i * 4;
				indices[i * 6 + 1] = i * 4 + 1;
				indices[i * 6 + 2] = i * 4 + 2;
				indices[i * 6 + 3] = i * 4;
				indices[i * 6 + 4] = i * 4 + 2;
				indices[i * 6 + 5] = i * 4 + 3;
			}

			this.device = device;
			this.shader = pc.shaderChunks.createShaderFromCode(device, vertexShader, fragmentShader, "mini-stats");
			this.buffer = new pc.VertexBuffer(device, format, maxQuads * 4, pc.BUFFER_STREAM);
			this.data = new Float32Array(this.buffer.numBytes / 4);
			this.indexBuffer = new pc.IndexBuffer(device, pc.INDEXFORMAT_UINT16, maxQuads * 6, pc.BUFFER_STATIC, indices);
			this.prims = [];
			this.prim = null;
			this.primIndex = -1;
			this.quads = 0;

			var setupColor = function setupColor(name, value) {
				_this[name] = new Float32Array([value.r, value.g, value.b, value.a]);
				_this[name + "Id"] = device.scope.resolve(name);
			};

			setupColor("col0", colors.graph0);
			setupColor("col1", colors.graph1);
			setupColor("col2", colors.graph2);
			setupColor("watermark", colors.watermark);
			setupColor("background", colors.background);
			this.watermarkSizeId = device.scope.resolve('watermarkSize');
			this.clrId = device.scope.resolve('clr');
			this.clr = new Float32Array(4);
			this.screenTextureSizeId = device.scope.resolve('screenAndTextureSize');
			this.screenTextureSize = new Float32Array(4);
		}

		var _proto = Render2d.prototype;

		_proto.quad = function quad(texture, x, y, w, h, u, v, uw, uh, enabled) {
			var quad = this.quads++;
			var prim = this.prim;

			if (prim && prim.texture === texture) {
				prim.count += 6;
			} else {
				this.primIndex++;

				if (this.primIndex === this.prims.length) {
					prim = {
						type: pc.PRIMITIVE_TRIANGLES,
						indexed: true,
						base: quad * 6,
						count: 6,
						texture: texture
					};
					this.prims.push(prim);
				} else {
					prim = this.prims[this.primIndex];
					prim.base = quad * 6;
					prim.count = 6;
					prim.texture = texture;
				}

				this.prim = prim;
			}

			var x1 = x + w;
			var y1 = y + h;
			var u1 = u + (uw === undefined ? w : uw);
			var v1 = v + (uh === undefined ? h : uh);
			var colorize = enabled ? 1 : 0;
			this.data.set([x, y, colorize, u, v, 0, 0, x1, y, colorize, u1, v, 1, 0, x1, y1, colorize, u1, v1, 1, 1, x, y1, colorize, u, v1, 0, 1], 4 * 7 * quad);
		};

		_proto.render = function render(clr, height) {
			var device = this.device;
			var buffer = this.buffer;
			buffer.setData(this.data.buffer);
			device.updateBegin();
			device.setDepthTest(false);
			device.setDepthWrite(false);
			device.setCullMode(pc.CULLFACE_NONE);
			device.setBlending(true);
			device.setBlendFunctionSeparate(pc.BLENDMODE_SRC_ALPHA, pc.BLENDMODE_ONE_MINUS_SRC_ALPHA, pc.BLENDMODE_ONE, pc.BLENDMODE_ONE);
			device.setBlendEquationSeparate(pc.BLENDEQUATION_ADD, pc.BLENDEQUATION_ADD);
			device.setVertexBuffer(buffer, 0);
			device.setIndexBuffer(this.indexBuffer);
			device.setShader(this.shader);
			var pr = Math.min(device.maxPixelRatio, window.devicePixelRatio);
			this.clr.set(clr, 0);
			this.clrId.setValue(this.clr);
			this.screenTextureSize[0] = device.width / pr;
			this.screenTextureSize[1] = device.height / pr;
			this.col0Id.setValue(this.col0);
			this.col1Id.setValue(this.col1);
			this.col2Id.setValue(this.col2);
			this.watermarkId.setValue(this.watermark);
			this.backgroundId.setValue(this.background);

			for (var i = 0; i <= this.primIndex; ++i) {
				var prim = this.prims[i];
				this.screenTextureSize[2] = prim.texture.width;
				this.screenTextureSize[3] = prim.texture.height;
				this.screenTextureSizeId.setValue(this.screenTextureSize);
				device.constantTexSource.setValue(prim.texture);
				this.watermarkSizeId.setValue(0.5 / height);
				device.draw(prim);
			}

			device.updateEnd();
			this.prim = null;
			this.primIndex = -1;
			this.quads = 0;
		};

		return Render2d;
	}();

	var MiniStats = function () {
		function MiniStats(app, options) {
			var _this = this;

			var device = app.graphicsDevice;

			this._contextLostHandler = function (event) {
				event.preventDefault();

				if (_this.graphs) {
					for (var i = 0; i < _this.graphs.length; i++) {
						_this.graphs[i].loseContext();
					}
				}
			};

			device.canvas.addEventListener("webglcontextlost", this._contextLostHandler, false);
			options = options || MiniStats.getDefaultOptions();
			var graphs = this.initGraphs(app, device, options);
			var words = ["", "ms", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
			graphs.forEach(function (graph) {
				words.push(graph.name);
			});

			if (options.stats) {
				options.stats.forEach(function (stat) {
					if (stat.unitsName) words.push(stat.unitsName);
				});
			}

			words = words.filter(function (item, index) {
				return words.indexOf(item) >= index;
			});
			var maxWidth = options.sizes.reduce(function (max, v) {
				return v.width > max ? v.width : max;
			}, 0);
			var wordAtlasData = this.initWordAtlas(device, words, maxWidth, graphs.length);
			var texture = wordAtlasData.texture;
			graphs.forEach(function (graph, i) {
				graph.texture = texture;
				graph.yOffset = i;
			});
			this.sizes = options.sizes;
			this._activeSizeIndex = options.startSizeIndex;
			var div = document.createElement('div');
			div.style.cssText = 'position:fixed;bottom:0;left:0;background:transparent;';
			document.body.appendChild(div);
			div.addEventListener('mouseenter', function (event) {
				_this.opacity = 1.0;
			});
			div.addEventListener('mouseleave', function (event) {
				_this.opacity = 0.5;
			});
			div.addEventListener('click', function (event) {
				event.preventDefault();

				if (_this._enabled) {
					_this.activeSizeIndex = (_this.activeSizeIndex + 1) % _this.sizes.length;

					_this.resize(_this.sizes[_this.activeSizeIndex].width, _this.sizes[_this.activeSizeIndex].height, _this.sizes[_this.activeSizeIndex].graphs);
				}
			});
			device.on("resizecanvas", function () {
				_this.updateDiv();
			});
			app.on('postrender', function () {
				if (_this._enabled) {
					_this.render();
				}
			});
			this.device = device;
			this.texture = texture;
			this.wordAtlas = wordAtlasData.atlas;
			this.render2d = new Render2d(device, options.colors);
			this.graphs = graphs;
			this.div = div;
			this.width = 0;
			this.height = 0;
			this.gspacing = 2;
			this.clr = [1, 1, 1, 0.5];
			this._enabled = true;
			this.activeSizeIndex = this._activeSizeIndex;
		}

		MiniStats.getDefaultOptions = function getDefaultOptions() {
			return {
				sizes: [{
					width: 100,
					height: 16,
					spacing: 0,
					graphs: false
				}, {
					width: 128,
					height: 32,
					spacing: 2,
					graphs: true
				}, {
					width: 256,
					height: 64,
					spacing: 2,
					graphs: true
				}],
				startSizeIndex: 0,
				textRefreshRate: 500,
				colors: {
					graph0: new pc.Color(0.7, 0.2, 0.2, 1),
					graph1: new pc.Color(0.2, 0.7, 0.2, 1),
					graph2: new pc.Color(0.2, 0.2, 0.7, 1),
					watermark: new pc.Color(0.4, 0.4, 0.2, 1),
					background: new pc.Color(0, 0, 0, 1.0)
				},
				cpu: {
					enabled: true,
					watermark: 33
				},
				gpu: {
					enabled: true,
					watermark: 33
				},
				stats: [{
					name: "Frame",
					stats: ["frame.ms"],
					decimalPlaces: 1,
					unitsName: "ms",
					watermark: 33
				}, {
					name: "DrawCalls",
					stats: ["drawCalls.total"],
					watermark: 1000
				}]
			};
		};

		var _proto = MiniStats.prototype;

		_proto.initWordAtlas = function initWordAtlas(device, words, maxWidth, numGraphs) {
			var texture = new pc.Texture(device, {
				name: 'mini-stats',
				width: pc.math.nextPowerOfTwo(maxWidth),
				height: 64,
				mipmaps: false,
				minFilter: pc.FILTER_NEAREST,
				magFilter: pc.FILTER_NEAREST
			});
			var wordAtlas = new WordAtlas(texture, words);
			var dest = texture.lock();

			for (var i = 0; i < texture.width * numGraphs; ++i) {
				dest.set([0, 0, 0, 255], i * 4);
			}

			texture.unlock();
			device.setTexture(texture, 0);
			return {
				atlas: wordAtlas,
				texture: texture
			};
		};

		_proto.initGraphs = function initGraphs(app, device, options) {
			var graphs = [];

			if (options.cpu.enabled) {
				var timer = new CpuTimer(app);
				var graph = new Graph('CPU', app, options.cpu.watermark, options.textRefreshRate, timer);
				graphs.push(graph);
			}

			if (options.gpu.enabled && device.extDisjointTimerQuery) {
				var _timer = new GpuTimer(app);

				var _graph = new Graph('GPU', app, options.gpu.watermark, options.textRefreshRate, _timer);

				graphs.push(_graph);
			}

			if (options.stats) {
				options.stats.forEach(function (entry) {
					var timer = new StatsTimer(app, entry.stats, entry.decimalPlaces, entry.unitsName, entry.multiplier);
					var graph = new Graph(entry.name, app, entry.watermark, options.textRefreshRate, timer);
					graphs.push(graph);
				});
			}

			return graphs;
		};

		_proto.render = function render() {
			var graphs = this.graphs;
			var wordAtlas = this.wordAtlas;
			var render2d = this.render2d;
			var width = this.width;
			var height = this.height;
			var gspacing = this.gspacing;

			for (var i = 0; i < graphs.length; ++i) {
				var graph = graphs[i];
				var y = i * (height + gspacing);
				graph.render(render2d, 0, y, width, height);
				var x = 1;
				y += height - 13;
				x += wordAtlas.render(render2d, graph.name, x, y) + 10;
				var timingText = graph.timingText;

				for (var j = 0; j < timingText.length; ++j) {
					x += wordAtlas.render(render2d, timingText[j], x, y);
				}

				if (graph.timer.unitsName) {
					x += 3;
					wordAtlas.render(render2d, graph.timer.unitsName, x, y);
				}
			}

			render2d.render(this.clr, height);
		};

		_proto.resize = function resize(width, height, showGraphs) {
			var graphs = this.graphs;

			for (var i = 0; i < graphs.length; ++i) {
				graphs[i].enabled = showGraphs;
			}

			this.width = width;
			this.height = height;
			this.updateDiv();
		};

		_proto.updateDiv = function updateDiv() {
			var rect = this.device.canvas.getBoundingClientRect();
			this.div.style.left = rect.left + "px";
			this.div.style.bottom = window.innerHeight - rect.bottom + "px";
			this.div.style.width = this.width + "px";
			this.div.style.height = this.overallHeight + "px";
		};

		_createClass(MiniStats, [{
			key: "activeSizeIndex",
			get: function get() {
				return this._activeSizeIndex;
			},
			set: function set(value) {
				this._activeSizeIndex = value;
				this.gspacing = this.sizes[value].spacing;
				this.resize(this.sizes[value].width, this.sizes[value].height, this.sizes[value].graphs);
			}
		}, {
			key: "opacity",
			get: function get() {
				return this.clr[3];
			},
			set: function set(value) {
				this.clr[3] = value;
			}
		}, {
			key: "overallHeight",
			get: function get() {
				var graphs = this.graphs;
				var spacing = this.gspacing;
				return this.height * graphs.length + spacing * (graphs.length - 1);
			}
		}, {
			key: "enabled",
			get: function get() {
				return this._enabled;
			},
			set: function set(value) {
				if (value !== this._enabled) {
					this._enabled = value;

					for (var i = 0; i < this.graphs.length; ++i) {
						this.graphs[i].enabled = value;
						this.graphs[i].timer.enabled = value;
					}
				}
			}
		}]);

		return MiniStats;
	}();

	exports.MiniStats = MiniStats;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
