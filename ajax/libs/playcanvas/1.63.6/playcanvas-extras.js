/**
 * @license
 * PlayCanvas Engine v1.63.6 revision cc63b25ad
 * Copyright 2011-2023 PlayCanvas Ltd. All rights reserved.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('playcanvas')) :
	typeof define === 'function' && define.amd ? define(['exports', 'playcanvas'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.pcx = {}, global.pc));
})(this, (function (exports, playcanvas) { 'use strict';

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
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
	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  _setPrototypeOf(subClass, superClass);
	}
	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };
	  return _setPrototypeOf(o, p);
	}
	function _toPrimitive(input, hint) {
	  if (typeof input !== "object" || input === null) return input;
	  var prim = input[Symbol.toPrimitive];
	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (typeof res !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (hint === "string" ? String : Number)(input);
	}
	function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");
	  return typeof key === "symbol" ? key : String(key);
	}

	var CpuTimer = function () {
		function CpuTimer(app) {
			this._frameIndex = 0;
			this._frameTimings = [];
			this._timings = [];
			this._prevTimings = [];
			this.unitsName = 'ms';
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
			var timestamp = playcanvas.now();
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
			this.unitsName = 'ms';
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
			return this._freeQueries.length > 0 ? this._freeQueries.splice(-1, 1)[0] : ['', this._gl.createQuery()];
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
			this.timingText = '';
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
			context.textAlign = 'left';
			context.textBaseline = 'alphabetic';
			context.fillStyle = 'rgb(255, 255, 255)';
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
				context.fillStyle = words[i].length === 1 ? 'rgb(255, 255, 255)' : 'rgb(150, 150, 150)';
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
			var vertexShader = 'attribute vec3 vertex_position;\n' + 'attribute vec4 vertex_texCoord0;\n' + 'uniform vec4 screenAndTextureSize;\n' + 'varying vec4 uv0;\n' + 'varying float enabled;\n' + 'void main(void) {\n' + '    vec2 pos = vertex_position.xy / screenAndTextureSize.xy;\n' + '    gl_Position = vec4(pos * 2.0 - 1.0, 0.5, 1.0);\n' + '    uv0 = vec4(vertex_texCoord0.xy / screenAndTextureSize.zw, vertex_texCoord0.zw);\n' + '    enabled = vertex_position.z;\n' + '}\n';
			var fragmentShader = 'varying vec4 uv0;\n' + 'varying float enabled;\n' + 'uniform vec4 clr;\n' + 'uniform vec4 col0;\n' + 'uniform vec4 col1;\n' + 'uniform vec4 col2;\n' + 'uniform vec4 watermark;\n' + 'uniform float watermarkSize;\n' + 'uniform vec4 background;\n' + 'uniform sampler2D source;\n' + 'void main (void) {\n' + '    vec4 tex = texture2D(source, uv0.xy);\n' + '    if (!(tex.rgb == vec3(1.0, 1.0, 1.0))) {\n' + '       if (enabled < 0.5)\n' + '           tex = background;\n' + '       else if (abs(uv0.w - tex.a) < watermarkSize)\n' + '           tex = watermark;\n' + '       else if (uv0.w < tex.r)\n' + '           tex = col0;\n' + '       else if (uv0.w < tex.g)\n' + '           tex = col1;\n' + '       else if (uv0.w < tex.b)\n' + '           tex = col2;\n' + '       else\n' + '           tex = background;\n' + '    }\n' + '    gl_FragColor = tex * clr;\n' + '}\n';
			var format = new playcanvas.VertexFormat(device, [{
				semantic: playcanvas.SEMANTIC_POSITION,
				components: 3,
				type: playcanvas.TYPE_FLOAT32
			}, {
				semantic: playcanvas.SEMANTIC_TEXCOORD0,
				components: 4,
				type: playcanvas.TYPE_FLOAT32
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
			this.shader = playcanvas.shaderChunks.createShaderFromCode(device, vertexShader, fragmentShader, 'mini-stats');
			this.buffer = new playcanvas.VertexBuffer(device, format, maxQuads * 4, playcanvas.BUFFER_STREAM);
			this.data = new Float32Array(this.buffer.numBytes / 4);
			this.indexBuffer = new playcanvas.IndexBuffer(device, playcanvas.INDEXFORMAT_UINT16, maxQuads * 6, playcanvas.BUFFER_STATIC, indices);
			this.prims = [];
			this.prim = null;
			this.primIndex = -1;
			this.quads = 0;
			var setupColor = function setupColor(name, value) {
				_this[name] = new Float32Array([value.r, value.g, value.b, value.a]);
				_this[name + 'Id'] = device.scope.resolve(name);
			};
			setupColor('col0', colors.graph0);
			setupColor('col1', colors.graph1);
			setupColor('col2', colors.graph2);
			setupColor('watermark', colors.watermark);
			setupColor('background', colors.background);
			this.watermarkSizeId = device.scope.resolve('watermarkSize');
			this.clrId = device.scope.resolve('clr');
			this.clr = new Float32Array(4);
			this.screenTextureSizeId = device.scope.resolve('screenAndTextureSize');
			this.screenTextureSize = new Float32Array(4);
			this.blendState = new playcanvas.BlendState(true, playcanvas.BLENDEQUATION_ADD, playcanvas.BLENDMODE_SRC_ALPHA, playcanvas.BLENDMODE_ONE_MINUS_SRC_ALPHA, playcanvas.BLENDEQUATION_ADD, playcanvas.BLENDMODE_ONE, playcanvas.BLENDMODE_ONE);
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
						type: playcanvas.PRIMITIVE_TRIANGLES,
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
			device.setCullMode(playcanvas.CULLFACE_NONE);
			device.setBlendState(this.blendState);
			device.setDepthState(playcanvas.DepthState.NODEPTH);
			device.setStencilState(null, null);
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
			device.canvas.addEventListener('webglcontextlost', this._contextLostHandler, false);
			options = options || MiniStats.getDefaultOptions();
			var graphs = this.initGraphs(app, device, options);
			var words = ['', 'ms', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
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
			device.on('resizecanvas', function () {
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
					graph0: new playcanvas.Color(0.7, 0.2, 0.2, 1),
					graph1: new playcanvas.Color(0.2, 0.7, 0.2, 1),
					graph2: new playcanvas.Color(0.2, 0.2, 0.7, 1),
					watermark: new playcanvas.Color(0.4, 0.4, 0.2, 1),
					background: new playcanvas.Color(0, 0, 0, 1.0)
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
					name: 'Frame',
					stats: ['frame.ms'],
					decimalPlaces: 1,
					unitsName: 'ms',
					watermark: 33
				}, {
					name: 'DrawCalls',
					stats: ['drawCalls.total'],
					watermark: 1000
				}]
			};
		};
		var _proto = MiniStats.prototype;
		_proto.initWordAtlas = function initWordAtlas(device, words, maxWidth, numGraphs) {
			var texture = new playcanvas.Texture(device, {
				name: 'mini-stats',
				width: playcanvas.math.nextPowerOfTwo(maxWidth),
				height: 64,
				mipmaps: false,
				minFilter: playcanvas.FILTER_NEAREST,
				magFilter: playcanvas.FILTER_NEAREST
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
			this.div.style.left = rect.left + 'px';
			this.div.style.bottom = window.innerHeight - rect.bottom + 'px';
			this.div.style.width = this.width + 'px';
			this.div.style.height = this.overallHeight + 'px';
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

	var CoreExporter = function () {
		function CoreExporter() {}
		var _proto = CoreExporter.prototype;
		_proto.textureToCanvas = function textureToCanvas(texture, options) {
			if (options === void 0) {
				options = {};
			}
			var image = texture.getSource();
			if (typeof HTMLImageElement !== 'undefined' && image instanceof HTMLImageElement || typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLCanvasElement || typeof OffscreenCanvas !== 'undefined' && image instanceof OffscreenCanvas || typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
				var width = image.width,
					height = image.height;
				var maxTextureSize = options.maxTextureSize;
				if (maxTextureSize) {
					var scale = Math.min(maxTextureSize / Math.max(width, height), 1);
					width = Math.round(width * scale);
					height = Math.round(height * scale);
				}
				var canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;
				var context = canvas.getContext('2d');
				context.drawImage(image, 0, 0, canvas.width, canvas.height);
				if (options.color) {
					var _options$color = options.color,
						r = _options$color.r,
						g = _options$color.g,
						b = _options$color.b;
					var imagedata = context.getImageData(0, 0, width, height);
					var data = imagedata.data;
					for (var i = 0; i < data.length; i += 4) {
						data[i + 0] = data[i + 0] * r;
						data[i + 1] = data[i + 1] * g;
						data[i + 2] = data[i + 2] * b;
					}
					context.putImageData(imagedata, 0, 0);
				}
				return canvas;
			}
		};
		return CoreExporter;
	}();

	var u8 = Uint8Array,
		u16 = Uint16Array,
		u32 = Uint32Array;
	var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
	var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
	var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
	var freb = function freb(eb, start) {
		var b = new u16(31);
		for (var i = 0; i < 31; ++i) {
			b[i] = start += 1 << eb[i - 1];
		}
		var r = new u32(b[30]);
		for (var i = 1; i < 30; ++i) {
			for (var j = b[i]; j < b[i + 1]; ++j) {
				r[j] = j - b[i] << 5 | i;
			}
		}
		return [b, r];
	};
	var _a = freb(fleb, 2),
		fl = _a[0],
		revfl = _a[1];
	fl[28] = 258, revfl[258] = 28;
	var _b = freb(fdeb, 0),
		revfd = _b[1];
	var rev = new u16(32768);
	for (var i = 0; i < 32768; ++i) {
		var x = (i & 0xAAAA) >>> 1 | (i & 0x5555) << 1;
		x = (x & 0xCCCC) >>> 2 | (x & 0x3333) << 2;
		x = (x & 0xF0F0) >>> 4 | (x & 0x0F0F) << 4;
		rev[i] = ((x & 0xFF00) >>> 8 | (x & 0x00FF) << 8) >>> 1;
	}
	var hMap = function hMap(cd, mb, r) {
		var s = cd.length;
		var i = 0;
		var l = new u16(mb);
		for (; i < s; ++i) {
			if (cd[i]) ++l[cd[i] - 1];
		}
		var le = new u16(mb);
		for (i = 0; i < mb; ++i) {
			le[i] = le[i - 1] + l[i - 1] << 1;
		}
		var co;
		if (r) {
			co = new u16(1 << mb);
			var rvb = 15 - mb;
			for (i = 0; i < s; ++i) {
				if (cd[i]) {
					var sv = i << 4 | cd[i];
					var r_1 = mb - cd[i];
					var v = le[cd[i] - 1]++ << r_1;
					for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
						co[rev[v] >>> rvb] = sv;
					}
				}
			}
		} else {
			co = new u16(s);
			for (i = 0; i < s; ++i) {
				if (cd[i]) {
					co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
				}
			}
		}
		return co;
	};
	var flt = new u8(288);
	for (var i = 0; i < 144; ++i) flt[i] = 8;
	for (var i = 144; i < 256; ++i) flt[i] = 9;
	for (var i = 256; i < 280; ++i) flt[i] = 7;
	for (var i = 280; i < 288; ++i) flt[i] = 8;
	var fdt = new u8(32);
	for (var i = 0; i < 32; ++i) fdt[i] = 5;
	var flm = hMap(flt, 9, 0);
		hMap(flt, 9, 1);
	var fdm = hMap(fdt, 5, 0);
		hMap(fdt, 5, 1);
	var shft = function shft(p) {
		return (p + 7) / 8 | 0;
	};
	var slc = function slc(v, s, e) {
		if (s == null || s < 0) s = 0;
		if (e == null || e > v.length) e = v.length;
		var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
		n.set(v.subarray(s, e));
		return n;
	};
	var ec = ['unexpected EOF', 'invalid block type', 'invalid length/literal', 'invalid distance', 'stream finished', 'no stream handler',, 'no callback', 'invalid UTF-8 data', 'extra field too long', 'date not in range 1980-2099', 'filename too long', 'stream finishing', 'invalid zip data'];
	var err = function err(ind, msg, nt) {
		var e = new Error(msg || ec[ind]);
		e.code = ind;
		if (Error.captureStackTrace) Error.captureStackTrace(e, err);
		if (!nt) throw e;
		return e;
	};
	var wbits = function wbits(d, p, v) {
		v <<= p & 7;
		var o = p / 8 | 0;
		d[o] |= v;
		d[o + 1] |= v >>> 8;
	};
	var wbits16 = function wbits16(d, p, v) {
		v <<= p & 7;
		var o = p / 8 | 0;
		d[o] |= v;
		d[o + 1] |= v >>> 8;
		d[o + 2] |= v >>> 16;
	};
	var hTree = function hTree(d, mb) {
		var t = [];
		for (var i = 0; i < d.length; ++i) {
			if (d[i]) t.push({
				s: i,
				f: d[i]
			});
		}
		var s = t.length;
		var t2 = t.slice();
		if (!s) return [et, 0];
		if (s == 1) {
			var v = new u8(t[0].s + 1);
			v[t[0].s] = 1;
			return [v, 1];
		}
		t.sort(function (a, b) {
			return a.f - b.f;
		});
		t.push({
			s: -1,
			f: 25001
		});
		var l = t[0],
			r = t[1],
			i0 = 0,
			i1 = 1,
			i2 = 2;
		t[0] = {
			s: -1,
			f: l.f + r.f,
			l: l,
			r: r
		};
		while (i1 != s - 1) {
			l = t[t[i0].f < t[i2].f ? i0++ : i2++];
			r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
			t[i1++] = {
				s: -1,
				f: l.f + r.f,
				l: l,
				r: r
			};
		}
		var maxSym = t2[0].s;
		for (var i = 1; i < s; ++i) {
			if (t2[i].s > maxSym) maxSym = t2[i].s;
		}
		var tr = new u16(maxSym + 1);
		var mbt = ln(t[i1 - 1], tr, 0);
		if (mbt > mb) {
			var i = 0,
				dt = 0;
			var lft = mbt - mb,
				cst = 1 << lft;
			t2.sort(function (a, b) {
				return tr[b.s] - tr[a.s] || a.f - b.f;
			});
			for (; i < s; ++i) {
				var i2_1 = t2[i].s;
				if (tr[i2_1] > mb) {
					dt += cst - (1 << mbt - tr[i2_1]);
					tr[i2_1] = mb;
				} else break;
			}
			dt >>>= lft;
			while (dt > 0) {
				var i2_2 = t2[i].s;
				if (tr[i2_2] < mb) dt -= 1 << mb - tr[i2_2]++ - 1;else ++i;
			}
			for (; i >= 0 && dt; --i) {
				var i2_3 = t2[i].s;
				if (tr[i2_3] == mb) {
					--tr[i2_3];
					++dt;
				}
			}
			mbt = mb;
		}
		return [new u8(tr), mbt];
	};
	var ln = function ln(n, l, d) {
		return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
	};
	var lc = function lc(c) {
		var s = c.length;
		while (s && !c[--s]);
		var cl = new u16(++s);
		var cli = 0,
			cln = c[0],
			cls = 1;
		var w = function w(v) {
			cl[cli++] = v;
		};
		for (var i = 1; i <= s; ++i) {
			if (c[i] == cln && i != s) ++cls;else {
				if (!cln && cls > 2) {
					for (; cls > 138; cls -= 138) w(32754);
					if (cls > 2) {
						w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
						cls = 0;
					}
				} else if (cls > 3) {
					w(cln), --cls;
					for (; cls > 6; cls -= 6) w(8304);
					if (cls > 2) w(cls - 3 << 5 | 8208), cls = 0;
				}
				while (cls--) w(cln);
				cls = 1;
				cln = c[i];
			}
		}
		return [cl.subarray(0, cli), s];
	};
	var clen = function clen(cf, cl) {
		var l = 0;
		for (var i = 0; i < cl.length; ++i) l += cf[i] * cl[i];
		return l;
	};
	var wfblk = function wfblk(out, pos, dat) {
		var s = dat.length;
		var o = shft(pos + 2);
		out[o] = s & 255;
		out[o + 1] = s >>> 8;
		out[o + 2] = out[o] ^ 255;
		out[o + 3] = out[o + 1] ^ 255;
		for (var i = 0; i < s; ++i) out[o + i + 4] = dat[i];
		return (o + 4 + s) * 8;
	};
	var wblk = function wblk(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
		wbits(out, p++, final);
		++lf[256];
		var _a = hTree(lf, 15),
			dlt = _a[0],
			mlb = _a[1];
		var _b = hTree(df, 15),
			ddt = _b[0],
			mdb = _b[1];
		var _c = lc(dlt),
			lclt = _c[0],
			nlc = _c[1];
		var _d = lc(ddt),
			lcdt = _d[0],
			ndc = _d[1];
		var lcfreq = new u16(19);
		for (var i = 0; i < lclt.length; ++i) lcfreq[lclt[i] & 31]++;
		for (var i = 0; i < lcdt.length; ++i) lcfreq[lcdt[i] & 31]++;
		var _e = hTree(lcfreq, 7),
			lct = _e[0],
			mlcb = _e[1];
		var nlcc = 19;
		for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc);
		var flen = bl + 5 << 3;
		var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
		var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
		if (flen <= ftlen && flen <= dtlen) return wfblk(out, p, dat.subarray(bs, bs + bl));
		var lm, ll, dm, dl;
		wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
		if (dtlen < ftlen) {
			lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
			var llm = hMap(lct, mlcb, 0);
			wbits(out, p, nlc - 257);
			wbits(out, p + 5, ndc - 1);
			wbits(out, p + 10, nlcc - 4);
			p += 14;
			for (var i = 0; i < nlcc; ++i) wbits(out, p + 3 * i, lct[clim[i]]);
			p += 3 * nlcc;
			var lcts = [lclt, lcdt];
			for (var it = 0; it < 2; ++it) {
				var clct = lcts[it];
				for (var i = 0; i < clct.length; ++i) {
					var len = clct[i] & 31;
					wbits(out, p, llm[len]), p += lct[len];
					if (len > 15) wbits(out, p, clct[i] >>> 5 & 127), p += clct[i] >>> 12;
				}
			}
		} else {
			lm = flm, ll = flt, dm = fdm, dl = fdt;
		}
		for (var i = 0; i < li; ++i) {
			if (syms[i] > 255) {
				var len = syms[i] >>> 18 & 31;
				wbits16(out, p, lm[len + 257]), p += ll[len + 257];
				if (len > 7) wbits(out, p, syms[i] >>> 23 & 31), p += fleb[len];
				var dst = syms[i] & 31;
				wbits16(out, p, dm[dst]), p += dl[dst];
				if (dst > 3) wbits16(out, p, syms[i] >>> 5 & 8191), p += fdeb[dst];
			} else {
				wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
			}
		}
		wbits16(out, p, lm[256]);
		return p + ll[256];
	};
	var deo = new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
	var et = new u8(0);
	var dflt = function dflt(dat, lvl, plvl, pre, post, lst) {
		var s = dat.length;
		var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
		var w = o.subarray(pre, o.length - post);
		var pos = 0;
		if (!lvl || s < 8) {
			for (var i = 0; i <= s; i += 65535) {
				var e = i + 65535;
				if (e >= s) {
					w[pos >> 3] = lst;
				}
				pos = wfblk(w, pos + 1, dat.subarray(i, e));
			}
		} else {
			var opt = deo[lvl - 1];
			var n = opt >>> 13,
				c = opt & 8191;
			var msk_1 = (1 << plvl) - 1;
			var prev = new u16(32768),
				head = new u16(msk_1 + 1);
			var bs1_1 = Math.ceil(plvl / 3),
				bs2_1 = 2 * bs1_1;
			var hsh = function hsh(i) {
				return (dat[i] ^ dat[i + 1] << bs1_1 ^ dat[i + 2] << bs2_1) & msk_1;
			};
			var syms = new u32(25000);
			var lf = new u16(288),
				df = new u16(32);
			var lc_1 = 0,
				eb = 0,
				i = 0,
				li = 0,
				wi = 0,
				bs = 0;
			for (; i < s; ++i) {
				var hv = hsh(i);
				var imod = i & 32767,
					pimod = head[hv];
				prev[imod] = pimod;
				head[hv] = imod;
				if (wi <= i) {
					var rem = s - i;
					if ((lc_1 > 7000 || li > 24576) && rem > 423) {
						pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
						li = lc_1 = eb = 0, bs = i;
						for (var j = 0; j < 286; ++j) lf[j] = 0;
						for (var j = 0; j < 30; ++j) df[j] = 0;
					}
					var l = 2,
						d = 0,
						ch_1 = c,
						dif = imod - pimod & 32767;
					if (rem > 2 && hv == hsh(i - dif)) {
						var maxn = Math.min(n, rem) - 1;
						var maxd = Math.min(32767, i);
						var ml = Math.min(258, rem);
						while (dif <= maxd && --ch_1 && imod != pimod) {
							if (dat[i + l] == dat[i + l - dif]) {
								var nl = 0;
								for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl);
								if (nl > l) {
									l = nl, d = dif;
									if (nl > maxn) break;
									var mmd = Math.min(dif, nl - 2);
									var md = 0;
									for (var j = 0; j < mmd; ++j) {
										var ti = i - dif + j + 32768 & 32767;
										var pti = prev[ti];
										var cd = ti - pti + 32768 & 32767;
										if (cd > md) md = cd, pimod = ti;
									}
								}
							}
							imod = pimod, pimod = prev[imod];
							dif += imod - pimod + 32768 & 32767;
						}
					}
					if (d) {
						syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
						var lin = revfl[l] & 31,
							din = revfd[d] & 31;
						eb += fleb[lin] + fdeb[din];
						++lf[257 + lin];
						++df[din];
						wi = i + l;
						++lc_1;
					} else {
						syms[li++] = dat[i];
						++lf[dat[i]];
					}
				}
			}
			pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
			if (!lst && pos & 7) pos = wfblk(w, pos + 1, et);
		}
		return slc(o, 0, pre + shft(pos) + post);
	};
	var crct = function () {
		var t = new Int32Array(256);
		for (var i = 0; i < 256; ++i) {
			var c = i,
				k = 9;
			while (--k) c = (c & 1 && -306674912) ^ c >>> 1;
			t[i] = c;
		}
		return t;
	}();
	var crc = function crc() {
		var c = -1;
		return {
			p: function p(d) {
				var cr = c;
				for (var i = 0; i < d.length; ++i) cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
				c = cr;
			},
			d: function d() {
				return ~c;
			}
		};
	};
	var dopt = function dopt(dat, opt, pre, post, st) {
		return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, !st);
	};
	var mrg = function mrg(a, b) {
		var o = {};
		for (var k in a) o[k] = a[k];
		for (var k in b) o[k] = b[k];
		return o;
	};
	var wbytes = function wbytes(d, b, v) {
		for (; v; ++b) d[b] = v, v >>>= 8;
	};
	function deflateSync(data, opts) {
		return dopt(data, opts || {}, 0, 0);
	}
	var fltn = function fltn(d, p, t, o) {
		for (var k in d) {
			var val = d[k],
				n = p + k,
				op = o;
			if (Array.isArray(val)) op = mrg(o, val[1]), val = val[0];
			if (val instanceof u8) t[n] = [val, op];else {
				t[n += '/'] = [new u8(0), op];
				fltn(val, n, t, o);
			}
		}
	};
	var te = typeof TextEncoder != 'undefined' && new TextEncoder();
	var td = typeof TextDecoder != 'undefined' && new TextDecoder();
	var tds = 0;
	try {
		td.decode(et, {
			stream: true
		});
		tds = 1;
	} catch (e) {}
	function strToU8(str, latin1) {
		if (latin1) {
			var ar_1 = new u8(str.length);
			for (var i = 0; i < str.length; ++i) ar_1[i] = str.charCodeAt(i);
			return ar_1;
		}
		if (te) return te.encode(str);
		var l = str.length;
		var ar = new u8(str.length + (str.length >> 1));
		var ai = 0;
		var w = function w(v) {
			ar[ai++] = v;
		};
		for (var i = 0; i < l; ++i) {
			if (ai + 5 > ar.length) {
				var n = new u8(ai + 8 + (l - i << 1));
				n.set(ar);
				ar = n;
			}
			var c = str.charCodeAt(i);
			if (c < 128 || latin1) w(c);else if (c < 2048) w(192 | c >> 6), w(128 | c & 63);else if (c > 55295 && c < 57344) c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);else w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
		}
		return slc(ar, 0, ai);
	}
	var exfl = function exfl(ex) {
		var le = 0;
		if (ex) {
			for (var k in ex) {
				var l = ex[k].length;
				if (l > 65535) err(9);
				le += l + 4;
			}
		}
		return le;
	};
	var wzh = function wzh(d, b, f, fn, u, c, ce, co) {
		var fl = fn.length,
			ex = f.extra,
			col = co && co.length;
		var exl = exfl(ex);
		wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
		if (ce != null) d[b++] = 20, d[b++] = f.os;
		d[b] = 20, b += 2;
		d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
		d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
		var dt = new Date(f.mtime == null ? Date.now() : f.mtime),
			y = dt.getFullYear() - 1980;
		if (y < 0 || y > 119) err(10);
		wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >>> 1), b += 4;
		if (c != -1) {
			wbytes(d, b, f.crc);
			wbytes(d, b + 4, c < 0 ? -c - 2 : c);
			wbytes(d, b + 8, f.size);
		}
		wbytes(d, b + 12, fl);
		wbytes(d, b + 14, exl), b += 16;
		if (ce != null) {
			wbytes(d, b, col);
			wbytes(d, b + 6, f.attrs);
			wbytes(d, b + 10, ce), b += 14;
		}
		d.set(fn, b);
		b += fl;
		if (exl) {
			for (var k in ex) {
				var exf = ex[k],
					l = exf.length;
				wbytes(d, b, +k);
				wbytes(d, b + 2, l);
				d.set(exf, b + 4), b += 4 + l;
			}
		}
		if (col) d.set(co, b), b += col;
		return b;
	};
	var wzf = function wzf(o, b, c, d, e) {
		wbytes(o, b, 0x6054B50);
		wbytes(o, b + 8, c);
		wbytes(o, b + 10, c);
		wbytes(o, b + 12, d);
		wbytes(o, b + 16, e);
	};
	function zipSync(data, opts) {
		if (!opts) opts = {};
		var r = {};
		var files = [];
		fltn(data, '', r, opts);
		var o = 0;
		var tot = 0;
		for (var fn in r) {
			var _a = r[fn],
				file = _a[0],
				p = _a[1];
			var compression = p.level == 0 ? 0 : 8;
			var f = strToU8(fn),
				s = f.length;
			var com = p.comment,
				m = com && strToU8(com),
				ms = m && m.length;
			var exl = exfl(p.extra);
			if (s > 65535) err(11);
			var d = compression ? deflateSync(file, p) : file,
				l = d.length;
			var c = crc();
			c.p(file);
			files.push(mrg(p, {
				size: file.length,
				crc: c.d(),
				c: d,
				f: f,
				m: m,
				u: s != fn.length || m && com.length != ms,
				o: o,
				compression: compression
			}));
			o += 30 + s + exl + l;
			tot += 76 + 2 * (s + exl) + (ms || 0) + l;
		}
		var out = new u8(tot + 22),
			oe = o,
			cdl = tot - o;
		for (var i = 0; i < files.length; ++i) {
			var f = files[i];
			wzh(out, f.o, f, f.f, f.u, f.c.length);
			var badd = 30 + f.f.length + exfl(f.extra);
			out.set(f.c, f.o + badd);
			wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
		}
		wzf(out, o, files.length, cdl, oe);
		return out;
	}

	var ROOT_FILE_NAME = 'root';
	var header = "#usda 1.0\n(\n    customLayerData = {\n        string creator = \"PlayCanvas UsdzExporter\"\n    }\n    metersPerUnit = 1\n    upAxis = \"Y\"\n)\n";
	var materialListTemplate = function materialListTemplate(materials) {
		return "\ndef \"Materials\"\n{\n    " + materials.join('\n') + "\n}\n";
	};
	var meshTemplate = function meshTemplate(faceVertexCounts, indices, normals, positions, uv0, uv1) {
		return "\ndef \"Mesh\"\n{\n    def Mesh \"Mesh\"\n    {\n        int[] faceVertexCounts = [" + faceVertexCounts + "]\n        int[] faceVertexIndices = [" + indices + "]\n        normal3f[] normals = [" + normals + "] (\n            interpolation = \"vertex\"\n        )\n        point3f[] points = [" + positions + "]\n        texCoord2f[] primvars:st = [" + uv0 + "] (\n            interpolation = \"vertex\"\n        )\n        texCoord2f[] primvars:st1 = [" + uv1 + "] (\n            interpolation = \"vertex\"\n        )\n        uniform token subdivisionScheme = \"none\"\n    }\n}\n";
	};
	var meshInstanceTemplate = function meshInstanceTemplate(nodeName, meshRefPath, worldMatrix, materialRefPath) {
		return "\ndef Xform \"" + nodeName + "\" (\n    prepend references = " + meshRefPath + "\n)\n{\n    matrix4d xformOp:transform = " + worldMatrix + "\n    uniform token[] xformOpOrder = [\"xformOp:transform\"]\n\n    rel material:binding = " + materialRefPath + "\n}\n";
	};
	var materialValueTemplate = function materialValueTemplate(type, name, value) {
		return "                    " + type + " inputs:" + name + " = " + value;
	};
	var UsdzExporter = function (_CoreExporter) {
		_inheritsLoose(UsdzExporter, _CoreExporter);
		function UsdzExporter() {
			var _this;
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
			_this = _CoreExporter.call.apply(_CoreExporter, [this].concat(args)) || this;
			_this.meshMap = void 0;
			_this.materialMap = void 0;
			_this.materials = void 0;
			_this.textureMap = void 0;
			_this.nodeNames = void 0;
			_this.files = void 0;
			return _this;
		}
		var _proto = UsdzExporter.prototype;
		_proto.init = function init() {
			this.meshMap = new Map();
			this.textureMap = new Map();
			this.materialMap = new Map();
			this.materials = [];
			this.files = {};
			this.nodeNames = new Set();
		};
		_proto.done = function done() {
			this.meshMap = null;
			this.textureMap = null;
			this.materialMap = null;
			this.materials = null;
			this.files = null;
			this.nodeNames = null;
		};
		_proto.build = function build(entity, options) {
			var _this2 = this;
			if (options === void 0) {
				options = {};
			}
			this.init();
			this.addFile(null, ROOT_FILE_NAME);
			var allMeshInstances = [];
			if (entity) {
				var renders = entity.findComponents("render");
				renders.forEach(function (render) {
					allMeshInstances.push.apply(allMeshInstances, render.meshInstances);
				});
			}
			var rootContent = '';
			allMeshInstances.forEach(function (meshInstance) {
				rootContent += _this2.buildMeshInstance(meshInstance);
			});
			rootContent += materialListTemplate(this.materials);
			this.addFile(null, ROOT_FILE_NAME, '', rootContent);
			var textureOptions = {
				maxTextureSize: options.maxTextureSize
			};
			var textureArray = Array.from(this.textureMap.keys());
			var promises = [];
			var _loop = function _loop() {
				var mimeType = 'image/png' ;
				var texture = textureArray[i];
				var canvas = _this2.textureToCanvas(texture, textureOptions);
				if (canvas) {
					promises.push(new Promise(function (resolve) {
						return canvas.toBlob(resolve, mimeType, 1);
					}).then(function (blob) {
						return blob.arrayBuffer();
					}));
				} else {
					console.log("Export of texture " + texture.name + " is not currently supported.");
				}
			};
			for (var i = 0; i < textureArray.length; i++) {
				_loop();
			}
			var finalData = Promise.all(promises).then(function (values) {
				values.forEach(function (textureArrayBuffer, index) {
					var texture = textureArray[index];
					var ids = _this2.getTextureFileIds(texture);
					_this2.files[ids.fileName] = new Uint8Array(textureArrayBuffer);
				});
				_this2.alignFiles();
				var arraybuffer = zipSync(_this2.files, {
					level: 0
				});
				_this2.done();
				return arraybuffer;
			});
			return finalData;
		};
		_proto.alignFiles = function alignFiles() {
			var offset = 0;
			for (var filename in this.files) {
				var file = this.files[filename];
				var headerSize = 34 + filename.length;
				offset += headerSize;
				var offsetMod64 = offset & 63;
				if (offsetMod64 !== 4) {
					var padLength = 64 - offsetMod64;
					var padding = new Uint8Array(padLength);
					this.files[filename] = [file, {
						extra: {
							12345: padding
						}
					}];
				}
				offset = file.length;
			}
		};
		_proto.getFileIds = function getFileIds(category, name, ref, extension) {
			if (extension === void 0) {
				extension = 'usda';
			}
			var fileName = (category ? category + "/" : '') + (name + "." + extension);
			var refName = "@./" + fileName + "@</" + ref + ">";
			return {
				name: name,
				fileName: fileName,
				refName: refName
			};
		};
		_proto.getTextureFileIds = function getTextureFileIds(texture) {
			return this.getFileIds('texture', "Texture_" + texture.id, 'Texture', 'png');
		};
		_proto.addFile = function addFile(category, uniqueId, refName, content) {
			if (refName === void 0) {
				refName = '';
			}
			if (content === void 0) {
				content = null;
			}
			var contentU8 = null;
			if (content) {
				content = header + '\n' + content;
				contentU8 = strToU8(content);
			}
			var ids = this.getFileIds(category, uniqueId, refName);
			this.files[ids.fileName] = contentU8;
			return ids.refName;
		};
		_proto.getMaterialRef = function getMaterialRef(material) {
			var materialRef = this.materialMap.get(material);
			if (!materialRef) {
				materialRef = this.buildMaterial(material);
				this.materialMap.set(material, materialRef);
			}
			return materialRef;
		};
		_proto.getMeshRef = function getMeshRef(mesh) {
			var meshRef = this.meshMap.get(mesh);
			if (!meshRef) {
				meshRef = this.buildMesh(mesh);
				this.meshMap.set(mesh, meshRef);
			}
			return meshRef;
		};
		_proto.buildArray2 = function buildArray2(array) {
			var components = [];
			var count = array.length;
			for (var i = 0; i < count; i += 2) {
				components.push("(" + array[i] + ", " + (1 - array[i + 1]) + ")");
			}
			return components.join(', ');
		};
		_proto.buildArray3 = function buildArray3(array) {
			var components = [];
			var count = array.length;
			for (var i = 0; i < count; i += 3) {
				components.push("(" + array[i] + ", " + array[i + 1] + ", " + array[i + 2] + ")");
			}
			return components.join(', ');
		};
		_proto.buildMat4 = function buildMat4(mat) {
			var data = mat.data;
			var vectors = [];
			for (var i = 0; i < 16; i += 4) {
				vectors.push("(" + data[i] + ", " + data[i + 1] + ", " + data[i + 2] + ", " + data[i + 3] + ")");
			}
			return "( " + vectors.join(', ') + " )";
		};
		_proto.buildMaterial = function buildMaterial(material) {
			var _this3 = this;
			var materialName = "Material_" + material.id;
			var materialPath = "/Materials/" + materialName;
			var materialPropertyPath = function materialPropertyPath(property) {
				return "<" + materialPath + property + ">";
			};
			var buildTexture = function buildTexture(texture, textureIds, mapType, uvChannel, tiling, offset, rotation, tintColor) {
				return "\n                def Shader \"Transform2d_" + mapType + "\" (\n                    sdrMetadata = {\n                        string role = \"math\"\n                    }\n                )\n                {\n                    uniform token info:id = \"UsdTransform2d\"\n                    float2 inputs:in.connect = " + materialPropertyPath("/uvReader_" + uvChannel + ".outputs:result") + "\n                    float inputs:rotation = " + rotation + "\n                    float2 inputs:scale = (" + tiling.x + ", " + tiling.y + ")\n                    float2 inputs:translation = (" + offset.x + ", " + offset.y + ")\n                    float2 outputs:result\n                }\n\n                def Shader \"Texture_" + texture.id + "_" + mapType + "\"\n                {\n                    uniform token info:id = \"UsdUVTexture\"\n                    asset inputs:file = @" + textureIds.fileName + "@\n                    float2 inputs:st.connect = " + materialPropertyPath("/Transform2d_" + mapType + ".outputs:result") + "\n                    token inputs:wrapS = \"repeat\"\n                    token inputs:wrapT = \"repeat\"\n                    float4 inputs:scale = (" + tintColor.r + ", " + tintColor.g + ", " + tintColor.b + ", " + tintColor.a + ")\n                    float outputs:r\n                    float outputs:g\n                    float outputs:b\n                    float3 outputs:rgb\n                    float outputs:a\n                }\n            ";
			};
			var inputs = [];
			var samplers = [];
			var addTexture = function addTexture(textureSlot, uniform, propType, propName, valueName, handleOpacity, tintTexture) {
				if (handleOpacity === void 0) {
					handleOpacity = false;
				}
				if (tintTexture === void 0) {
					tintTexture = false;
				}
				var texture = material[textureSlot];
				if (texture) {
					var textureIds = _this3.getTextureFileIds(texture);
					_this3.textureMap.set(texture, textureIds.refName);
					var channel = material[textureSlot + 'Channel'] || 'rgb';
					var textureValue = materialPropertyPath("/" + textureIds.name + "_" + valueName + ".outputs:" + channel);
					inputs.push(materialValueTemplate(propType, propName + ".connect", textureValue));
					if (handleOpacity) {
						if (material.alphaTest > 0.0) ;
					}
					var tiling = material[textureSlot + 'Tiling'];
					var offset = material[textureSlot + 'Offset'];
					var rotation = material[textureSlot + 'Rotation'];
					var uvChannel = material[textureSlot + 'Uv'] === 1 ? 'st1' : 'st';
					var tintColor = tintTexture && uniform ? uniform : playcanvas.Color.WHITE;
					samplers.push(buildTexture(texture, textureIds, valueName, uvChannel, tiling, offset, rotation, tintColor));
				} else if (uniform) {
					var value = propType === 'float' ? "" + uniform : "(" + uniform.r + ", " + uniform.g + ", " + uniform.b + ")";
					inputs.push(materialValueTemplate(propType, propName, value));
				}
			};
			addTexture('diffuseMap', material.diffuse, 'color3f', 'diffuseColor', 'diffuse', false, true);
			if (material.transparent || material.alphaTest > 0.0) {
				addTexture('opacityMap', material.opacity, 'float', 'opacity', 'opacity', true);
			}
			addTexture('normalMap', null, 'normal3f', 'normal', 'normal');
			addTexture('emissiveMap', material.emissive, 'color3f', 'emissiveColor', 'emissive', false, true);
			addTexture('aoMap', null, 'float', 'occlusion', 'occlusion');
			addTexture('metalnessMap', material.metalness, 'float', 'metallic', 'metallic');
			addTexture('glossMap', material.gloss, 'float', 'roughness', 'roughness');
			var materialObject = "\n            def Material \"" + materialName + "\"\n            {\n                def Shader \"PreviewSurface\"\n                {\n                    uniform token info:id = \"UsdPreviewSurface\"\n" + inputs.join('\n') + "\n                    int inputs:useSpecularWorkflow = 0\n                    token outputs:surface\n                }\n\n                token outputs:surface.connect = " + materialPropertyPath('/PreviewSurface.outputs:surface') + "\n\n                def Shader \"uvReader_st\"\n                {\n                    uniform token info:id = \"UsdPrimvarReader_float2\"\n                    token inputs:varname = \"st\"\n                    float2 inputs:fallback = (0.0, 0.0)\n                    float2 outputs:result\n                }\n\n                def Shader \"uvReader_st1\"\n                {\n                    uniform token info:id = \"UsdPrimvarReader_float2\"\n                    token inputs:varname = \"st1\"\n                    float2 inputs:fallback = (0.0, 0.0)\n                    float2 outputs:result\n                }\n\n                " + samplers.join('\n') + "\n            }\n        ";
			this.materials.push(materialObject);
			return materialPropertyPath('');
		};
		_proto.buildMesh = function buildMesh(mesh) {
			var positions = [];
			var indices = [];
			var normals = [];
			var uv0 = [];
			var uv1 = [];
			mesh.getVertexStream(playcanvas.SEMANTIC_POSITION, positions);
			mesh.getVertexStream(playcanvas.SEMANTIC_NORMAL, normals);
			mesh.getVertexStream(playcanvas.SEMANTIC_TEXCOORD0, uv0);
			mesh.getVertexStream(playcanvas.SEMANTIC_TEXCOORD1, uv1);
			mesh.getIndices(indices);
			var indicesCount = indices.length || positions.length;
			var faceVertexCounts = Array(indicesCount / 3).fill(3).join(', ');
			if (!indices.length) {
				for (var i = 0; i < indicesCount; i++) indices[i] = i;
			}
			var numVerts = positions.length / 3;
			normals = normals.length ? normals : Array(numVerts * 3).fill(0);
			uv0 = uv0.length ? uv0 : Array(numVerts * 2).fill(0);
			uv1 = uv1.length ? uv1 : Array(numVerts * 2).fill(0);
			positions = this.buildArray3(positions);
			normals = this.buildArray3(normals);
			uv0 = this.buildArray2(uv0);
			uv1 = this.buildArray2(uv1);
			var meshObject = meshTemplate(faceVertexCounts, indices, normals, positions, uv0, uv1);
			var refPath = this.addFile('mesh', "Mesh_" + mesh.id, 'Mesh', meshObject);
			return refPath;
		};
		_proto.buildMeshInstance = function buildMeshInstance(meshInstance) {
			var meshRefPath = this.getMeshRef(meshInstance.mesh);
			var materialRefPath = this.getMaterialRef(meshInstance.material);
			var worldMatrix = this.buildMat4(meshInstance.node.getWorldTransform());
			var name = meshInstance.node.name.replace(/[^a-z0-9]/gi, '_');
			var nodeName = name;
			while (this.nodeNames.has(nodeName)) {
				nodeName = name + "_" + Math.random().toString(36).slice(2, 7);
			}
			this.nodeNames.add(nodeName);
			return meshInstanceTemplate(nodeName, meshRefPath, worldMatrix, materialRefPath);
		};
		return UsdzExporter;
	}(CoreExporter);

	var ARRAY_BUFFER = 34962;
	var ELEMENT_ARRAY_BUFFER = 34963;
	var getIndexComponentType = function getIndexComponentType(indexFormat) {
		switch (indexFormat) {
			case playcanvas.INDEXFORMAT_UINT8:
				return 5121;
			case playcanvas.INDEXFORMAT_UINT16:
				return 5123;
			case playcanvas.INDEXFORMAT_UINT32:
				return 5125;
		}
		return 0;
	};
	var getComponentType = function getComponentType(dataType) {
		switch (dataType) {
			case playcanvas.TYPE_INT8:
				return 5120;
			case playcanvas.TYPE_UINT8:
				return 5121;
			case playcanvas.TYPE_INT16:
				return 5122;
			case playcanvas.TYPE_UINT16:
				return 5123;
			case playcanvas.TYPE_INT32:
				return 5124;
			case playcanvas.TYPE_UINT32:
				return 5125;
			case playcanvas.TYPE_FLOAT32:
				return 5126;
		}
		return 0;
	};
	var getAccessorType = function getAccessorType(componentCount) {
		switch (componentCount) {
			case 1:
				return 'SCALAR';
			case 2:
				return 'VEC2';
			case 3:
				return 'VEC3';
			case 4:
				return 'VEC4';
		}
		return 0;
	};
	var getSemantic = function getSemantic(engineSemantic) {
		switch (engineSemantic) {
			case playcanvas.SEMANTIC_POSITION:
				return 'POSITION';
			case playcanvas.SEMANTIC_NORMAL:
				return 'NORMAL';
			case playcanvas.SEMANTIC_TANGENT:
				return 'TANGENT';
			case playcanvas.SEMANTIC_COLOR:
				return 'COLOR_0';
			case playcanvas.SEMANTIC_BLENDINDICES:
				return 'JOINTS_0';
			case playcanvas.SEMANTIC_BLENDWEIGHT:
				return 'WEIGHTS_0';
			case playcanvas.SEMANTIC_TEXCOORD0:
				return 'TEXCOORD_0';
			case playcanvas.SEMANTIC_TEXCOORD1:
				return 'TEXCOORD_1';
			case playcanvas.SEMANTIC_TEXCOORD2:
				return 'TEXCOORD_2';
			case playcanvas.SEMANTIC_TEXCOORD3:
				return 'TEXCOORD_3';
			case playcanvas.SEMANTIC_TEXCOORD4:
				return 'TEXCOORD_4';
			case playcanvas.SEMANTIC_TEXCOORD5:
				return 'TEXCOORD_5';
			case playcanvas.SEMANTIC_TEXCOORD6:
				return 'TEXCOORD_6';
			case playcanvas.SEMANTIC_TEXCOORD7:
				return 'TEXCOORD_7';
		}
	};
	var getFilter = function getFilter(filter) {
		switch (filter) {
			case playcanvas.FILTER_NEAREST:
				return 9728;
			case playcanvas.FILTER_LINEAR:
				return 9729;
			case playcanvas.FILTER_NEAREST_MIPMAP_NEAREST:
				return 9984;
			case playcanvas.FILTER_LINEAR_MIPMAP_NEAREST:
				return 9985;
			case playcanvas.FILTER_NEAREST_MIPMAP_LINEAR:
				return 9986;
			case playcanvas.FILTER_LINEAR_MIPMAP_LINEAR:
				return 9987;
		}
	};
	var getWrap = function getWrap(wrap) {
		switch (wrap) {
			case playcanvas.ADDRESS_CLAMP_TO_EDGE:
				return 33071;
			case playcanvas.ADDRESS_MIRRORED_REPEAT:
				return 33648;
			case playcanvas.ADDRESS_REPEAT:
				return 10497;
		}
	};
	var textureSemantics = ['diffuseMap'];
	var GltfExporter = function (_CoreExporter) {
		_inheritsLoose(GltfExporter, _CoreExporter);
		function GltfExporter() {
			return _CoreExporter.apply(this, arguments) || this;
		}
		var _proto = GltfExporter.prototype;
		_proto.collectResources = function collectResources(root) {
			var resources = {
				buffers: [],
				cameras: [],
				entities: [],
				materials: [],
				textures: [],
				entityMeshInstances: [],
				bufferViewMap: new Map()
			};
			var materials = resources.materials,
				buffers = resources.buffers,
				entityMeshInstances = resources.entityMeshInstances,
				textures = resources.textures;
			root.forEach(function (entity) {
				resources.entities.push(entity);
			});
			var collectMeshInstances = function collectMeshInstances(meshInstances) {
				meshInstances.forEach(function (meshInstance) {
					var material = meshInstance.material;
					if (materials.indexOf(material) < 0) {
						resources.materials.push(material);
						textureSemantics.forEach(function (semantic) {
							var texture = material[semantic];
							if (texture && textures.indexOf(texture) < 0) {
								textures.push(texture);
							}
						});
					}
					var node = meshInstance.node;
					var nodeMeshInstances = entityMeshInstances.find(function (e) {
						return e.node === node;
					});
					if (!nodeMeshInstances) {
						nodeMeshInstances = {
							node: node,
							meshInstances: []
						};
						entityMeshInstances.push(nodeMeshInstances);
					}
					nodeMeshInstances.meshInstances.push(meshInstance);
					var mesh = meshInstance.mesh;
					var vertexBuffer = mesh.vertexBuffer;
					if (buffers.indexOf(vertexBuffer) < 0) {
						buffers.unshift(vertexBuffer);
					}
					var indexBuffer = mesh.indexBuffer[0];
					if (buffers.indexOf(indexBuffer) < 0) {
						buffers.push(indexBuffer);
					}
				});
			};
			resources.entities.forEach(function (entity) {
				if (entity.camera) {
					resources.cameras.push(entity.camera);
				}
				if (entity.render && entity.render.enabled) {
					collectMeshInstances(entity.render.meshInstances);
				}
				if (entity.model && entity.model.enabled && entity.model.meshInstances) {
					collectMeshInstances(entity.model.meshInstances);
				}
			});
			return resources;
		};
		_proto.writeBuffers = function writeBuffers(resources, json) {
			if (resources.buffers.length > 0) {
				json.buffers = [];
				var byteLength = 0;
				resources.buffers.forEach(function (buffer) {
					var arrayBuffer = buffer.lock();
					byteLength += arrayBuffer.byteLength;
				});
				var buffer = {
					byteLength: byteLength
				};
				json.buffers.push(buffer);
			}
		};
		_proto.writeBufferViews = function writeBufferViews(resources, json) {
			json.bufferViews = [];
			var offset = 0;
			resources.buffers.forEach(function (buffer) {
				var addBufferView = function addBufferView(target, byteLength, byteOffset, byteStride) {
					var bufferView = {
						target: target,
						buffer: 0,
						byteLength: byteLength,
						byteOffset: byteOffset,
						byteStride: byteStride
					};
					return json.bufferViews.push(bufferView) - 1;
				};
				var arrayBuffer = buffer.lock();
				if (buffer instanceof playcanvas.VertexBuffer) {
					var format = buffer.getFormat();
					if (format.interleaved) {
						var bufferViewIndex = addBufferView(ARRAY_BUFFER, arrayBuffer.byteLength, offset, format.size);
						resources.bufferViewMap.set(buffer, [bufferViewIndex]);
					} else {
						var bufferViewIndices = [];
						format.elements.forEach(function (element) {
							var bufferViewIndex = addBufferView(ARRAY_BUFFER, element.size * format.vertexCount, offset + element.offset, element.size);
							bufferViewIndices.push(bufferViewIndex);
						});
						resources.bufferViewMap.set(buffer, bufferViewIndices);
					}
				} else {
					var _bufferViewIndex = addBufferView(ELEMENT_ARRAY_BUFFER, arrayBuffer.byteLength, offset);
					resources.bufferViewMap.set(buffer, [_bufferViewIndex]);
				}
				offset += arrayBuffer.byteLength;
			});
		};
		_proto.writeCameras = function writeCameras(resources, json) {
			if (resources.cameras.length > 0) {
				json.cameras = resources.cameras.map(function (cam) {
					var projection = cam.projection;
					var nearClip = cam.nearClip;
					var farClip = cam.farClip;
					var camera = {};
					if (projection === playcanvas.PROJECTION_ORTHOGRAPHIC) {
						camera.type = "orthographic";
						camera.orthographic = {
							xmag: 1,
							ymag: 1,
							znear: nearClip,
							zfar: farClip
						};
					} else {
						var fov = cam.fov;
						camera.type = "perspective";
						camera.perspective = {
							yfov: fov * Math.PI / 180,
							znear: nearClip,
							zfar: farClip
						};
					}
					return camera;
				});
			}
		};
		_proto.writeMaterials = function writeMaterials(resources, json) {
			var attachTexture = function attachTexture(material, destination, name, textureSemantic) {
				var texture = material[textureSemantic];
				if (texture) {
					var textureIndex = resources.textures.indexOf(texture);
					if (textureIndex < 0) console.logWarn("Texture " + texture.name + " wasn't collected.");
					destination[name] = {
						"index": textureIndex
					};
				}
			};
			if (resources.materials.length > 0) {
				json.materials = resources.materials.map(function (mat) {
					var name = mat.name,
						diffuse = mat.diffuse,
						emissive = mat.emissive,
						opacity = mat.opacity,
						blendType = mat.blendType,
						cull = mat.cull;
					var material = {
						pbrMetallicRoughness: {}
					};
					var pbr = material.pbrMetallicRoughness;
					if (name && name.length > 0) {
						material.name = name;
					}
					if (!diffuse.equals(playcanvas.Color.WHITE) || opacity !== 1) {
						pbr.baseColorFactor = [diffuse.r, diffuse.g, diffuse.b, opacity];
					}
					attachTexture(mat, pbr, 'baseColorTexture', 'diffuseMap');
					if (!emissive.equals(playcanvas.Color.BLACK)) {
						material.emissiveFactor = [emissive.r, emissive.g, emissive.b];
					}
					if (blendType === playcanvas.BLEND_NORMAL) {
						material.alphaMode = "BLEND";
					}
					if (cull === playcanvas.CULLFACE_NONE) {
						material.doubleSided = true;
					}
					return material;
				});
			}
		};
		_proto.writeNodes = function writeNodes(resources, json) {
			if (resources.entities.length > 0) {
				json.nodes = resources.entities.map(function (entity) {
					var name = entity.name;
					var t = entity.getLocalPosition();
					var r = entity.getLocalRotation();
					var s = entity.getLocalScale();
					var node = {};
					if (name && name.length > 0) {
						node.name = name;
					}
					if (!t.equals(playcanvas.Vec3.ZERO)) {
						node.translation = [t.x, t.y, t.z];
					}
					if (!r.equals(playcanvas.Quat.IDENTITY)) {
						node.rotation = [r.x, r.y, r.z, r.w];
					}
					if (!s.equals(playcanvas.Vec3.ONE)) {
						node.scale = [s.x, s.y, s.z];
					}
					if (entity.camera && entity.camera.enabled) {
						node.camera = resources.cameras.indexOf(entity.camera);
					}
					var entityMeshInstance = resources.entityMeshInstances.find(function (e) {
						return e.node === entity;
					});
					if (entityMeshInstance) {
						node.mesh = resources.entityMeshInstances.indexOf(entityMeshInstance);
					}
					if (entity.children.length > 0) {
						node.children = [];
						entity.children.forEach(function (child) {
							node.children.push(resources.entities.indexOf(child));
						});
					}
					return node;
				});
			}
		};
		_proto.writeMeshes = function writeMeshes(resources, json) {
			if (resources.entityMeshInstances.length > 0) {
				json.accessors = [];
				json.meshes = [];
				resources.entityMeshInstances.forEach(function (entityMeshInstances) {
					var mesh = {
						primitives: []
					};
					var meshInstances = entityMeshInstances.meshInstances;
					meshInstances.forEach(function (meshInstance) {
						var primitive = {
							attributes: {},
							material: resources.materials.indexOf(meshInstance.material)
						};
						mesh.primitives.push(primitive);
						var vertexBuffer = meshInstance.mesh.vertexBuffer;
						var format = vertexBuffer.format;
						var interleaved = format.interleaved,
							elements = format.elements;
						var numVertices = vertexBuffer.getNumVertices();
						elements.forEach(function (element, elementIndex) {
							var viewIndex = resources.bufferViewMap.get(vertexBuffer)[interleaved ? 0 : elementIndex];
							var accessor = {
								bufferView: viewIndex,
								byteOffset: interleaved ? element.offset : 0,
								componentType: getComponentType(element.dataType),
								type: getAccessorType(element.numComponents),
								count: numVertices
							};
							var idx = json.accessors.push(accessor) - 1;
							primitive.attributes[getSemantic(element.name)] = idx;
							if (element.name === playcanvas.SEMANTIC_POSITION) {
								var positions = [];
								meshInstance.mesh.getPositions(positions);
								var min = new playcanvas.Vec3(),
									max = new playcanvas.Vec3();
								playcanvas.BoundingBox.computeMinMax(positions, min, max);
								accessor.min = [min.x, min.y, min.z];
								accessor.max = [max.x, max.y, max.z];
							}
						});
						var indexBuffer = meshInstance.mesh.indexBuffer[0];
						if (indexBuffer) {
							var viewIndex = resources.bufferViewMap.get(indexBuffer)[0];
							var accessor = {
								bufferView: viewIndex,
								componentType: getIndexComponentType(indexBuffer.getFormat()),
								count: indexBuffer.getNumIndices(),
								type: "SCALAR"
							};
							var idx = json.accessors.push(accessor) - 1;
							primitive.indices = idx;
						}
					});
					json.meshes.push(mesh);
				});
			}
		};
		_proto.convertTextures = function convertTextures(textures, json, options) {
			var textureOptions = {
				maxTextureSize: options.maxTextureSize
			};
			for (var i = 0; i < textures.length; i++) {
				var isRGBA = true;
				var mimeType = isRGBA ? 'image/png' : 'image/jpeg';
				var texture = textures[i];
				var canvas = this.textureToCanvas(texture, textureOptions);
				if (canvas) {
					var uri = canvas.toDataURL(mimeType);
					json.images[i] = {
						'uri': uri
					};
					json.samplers[i] = {
						'minFilter': getFilter(texture.minFilter),
						'magFilter': getFilter(texture.magFilter),
						'wrapS': getWrap(texture.addressU),
						'wrapT': getWrap(texture.addressV)
					};
					json.textures[i] = {
						'sampler': i,
						'source': i
					};
				} else {
					console.log("Export of texture " + texture.name + " is not currently supported.");
					textures[i] = null;
				}
			}
		};
		_proto.buildJson = function buildJson(resources, options) {
			var json = {
				asset: {
					version: "2.0",
					generator: "PlayCanvas GltfExporter"
				},
				scenes: [{
					nodes: [0]
				}],
				images: [],
				samplers: [],
				textures: [],
				scene: 0
			};
			this.writeBuffers(resources, json);
			this.writeBufferViews(resources, json);
			this.writeCameras(resources, json);
			this.writeNodes(resources, json);
			this.writeMaterials(resources, json);
			this.writeMeshes(resources, json);
			this.convertTextures(resources.textures, json, options);
			if (!json.images.length) delete json.images;
			if (!json.samplers.length) delete json.samplers;
			if (!json.textures.length) delete json.textures;
			return json;
		};
		_proto.build = function build(entity, options) {
			if (options === void 0) {
				options = {};
			}
			var resources = this.collectResources(entity);
			var json = this.buildJson(resources, options);
			var jsonText = JSON.stringify(json);
			var headerLength = 12;
			var jsonHeaderLength = 8;
			var jsonDataLength = jsonText.length;
			var jsonPaddingLength = 4 - (jsonDataLength & 3) & 3;
			var binaryHeaderLength = 8;
			var binaryDataLength = 0;
			resources.buffers.forEach(function (buffer) {
				binaryDataLength += buffer.lock().byteLength;
			});
			binaryDataLength = playcanvas.math.roundUp(binaryDataLength, 4);
			var totalLength = headerLength + jsonHeaderLength + jsonDataLength + jsonPaddingLength;
			if (binaryDataLength > 0) {
				totalLength += binaryHeaderLength + binaryDataLength;
			}
			var glbBuffer = new ArrayBuffer(totalLength);
			var glbView = new DataView(glbBuffer);
			glbView.setUint32(0, 0x46546C67, true);
			glbView.setUint32(4, 2, true);
			glbView.setUint32(8, totalLength, true);
			glbView.setUint32(12, jsonDataLength + jsonPaddingLength, true);
			glbView.setUint32(16, 0x4E4F534A, true);
			var offset = headerLength + jsonHeaderLength;
			for (var i = 0; i < jsonDataLength; i++) {
				glbView.setUint8(offset + i, jsonText.charCodeAt(i));
			}
			offset += jsonDataLength;
			for (var _i = 0; _i < jsonPaddingLength; _i++) {
				glbView.setUint8(offset + _i, 0x20);
			}
			offset += jsonPaddingLength;
			if (binaryDataLength > 0) {
				glbView.setUint32(offset, binaryDataLength, true);
				glbView.setUint32(offset + 4, 0x004E4942, true);
				offset += binaryHeaderLength;
				resources.buffers.forEach(function (buffer) {
					var srcBuffer = buffer.lock();
					var src;
					if (srcBuffer instanceof ArrayBuffer) {
						src = new Uint8Array(srcBuffer);
					} else {
						src = new Uint8Array(srcBuffer.buffer, srcBuffer.byteOffset, srcBuffer.byteLength);
					}
					var dst = new Uint8Array(glbBuffer, offset, srcBuffer.byteLength);
					dst.set(src);
					offset += srcBuffer.byteLength;
				});
			}
			return Promise.resolve(glbBuffer);
		};
		return GltfExporter;
	}(CoreExporter);

	exports.GltfExporter = GltfExporter;
	exports.MiniStats = MiniStats;
	exports.UsdzExporter = UsdzExporter;

}));
