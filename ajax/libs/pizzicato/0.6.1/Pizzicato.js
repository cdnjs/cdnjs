(function(root) {
	'use strict';

	var Pizzicato = {};
	var Pz = Pizzicato;
	var commonJS = typeof module === "object" && module.exports;
	var amd = typeof define === "function" && define.amd;

	if (commonJS)
		module.exports = Pizzicato;
	else if (amd)
		define([], Pizzicato);
	else
		root.Pizzicato = root.Pz = Pizzicato;

	var AudioContext = root.AudioContext || root.webkitAudioContext; 

	if (!AudioContext) {
		console.error('No AudioContext found in this environment. Please ensure your window or global object contains a working AudioContext constructor function.');
		return;
	}

	Pizzicato.context = new AudioContext();

	var masterGainNode = Pizzicato.context.createGain();
	masterGainNode.connect(Pizzicato.context.destination);

	Pizzicato.Util = {
	
		isString: function(arg) {
			return toString.call(arg) === '[object String]';
		},
	
		isObject: function(arg) {
			return toString.call(arg) === '[object Object]';
		},
	
		isFunction: function(arg) {
			return toString.call(arg) === '[object Function]';
		},
	
		isNumber: function(arg) {
			return toString.call(arg) === '[object Number]' && arg === +arg;
		},
	
		isArray: function(arg) {
			return toString.call(arg) === '[object Array]';
		},
	
		isInRange: function(arg, min, max) {
			if (!Pz.Util.isNumber(arg) || !Pz.Util.isNumber(min) || !Pz.Util.isNumber(max))
				return false;
	
			return arg >= min && arg <= max;
		},
	
		isBool: function(arg) {
			return typeof(arg) === "boolean";
		},
	
		isOscillator: function(audioNode) {
			return (audioNode && audioNode.toString() === "[object OscillatorNode]");
		},
	
		isAudioBufferSourceNode: function(audioNode) {
			return (audioNode && audioNode.toString() === "[object AudioBufferSourceNode]");
		},
	
		isSound: function(sound) {
			return sound instanceof Pz.Sound;
		},
	
		isEffect: function(effect) {
			for (var key in Pizzicato.Effects)
				if (effect instanceof Pizzicato.Effects[key])
					return true;
	
			return false;
		},
	
		// Takes a number from 0 to 1 and normalizes it to fit within range floor to ceiling
		normalize: function(num, floor, ceil) {
			if (!Pz.Util.isNumber(num) || !Pz.Util.isNumber(floor) || !Pz.Util.isNumber(ceil))
				return;
			
			return ((ceil - floor) * num) / 1 + floor;
		},
	
		getDryLevel: function(mix) {
			if (!Pz.Util.isNumber(mix) || mix > 1 || mix < 0)
				return 0;
	
			if (mix <= 0.5)
				return 1;
	
			return 1 - ((mix - 0.5) * 2);
		},
	
		getWetLevel: function(mix) {
			if (!Pz.Util.isNumber(mix) || mix > 1 || mix < 0)
				return 0;
	
			if (mix >= 0.5)
				return 1;
	
			return 1 - ((0.5 - mix) * 2);
		}
	};
	/* In order to allow an AudioNode to connect to a Pizzicato 
	Effect object, we must shim its connect method */
	var gainNode = Pizzicato.context.createGain();
	var audioNode = Object.getPrototypeOf(Object.getPrototypeOf(gainNode));
	var connect = audioNode.connect;
	
	audioNode.connect = function(node) {
		var endpoint = Pz.Util.isEffect(node) ? node.inputNode : node;
		connect.call(this, endpoint);
		return node;
	};

	Object.defineProperty(Pizzicato, 'volume', {
		enumerable: true,
			
		get: function() {
			return masterGainNode.gain.value;
		},

		set: function(volume) {
			if (Pz.Util.isInRange(volume, 0, 1) && masterGainNode)
				masterGainNode.gain.value = volume;
		}
	});

	Object.defineProperty(Pizzicato, 'masterGainNode', {
		enumerable: false,

		get: function() {
			return masterGainNode;
		},

		set: function(volume) {
			console.error('Can\'t set the master gain node');
		}
	});
		Pizzicato.Events = {
		
			/**
			 * Adds an event handler that will be treated upon
			 * the triggering of that event.
			 */
			on: function(name, callback, context) {
				if (!name || !callback)
					return;
		
				this._events = this._events || {};
				var _event = this._events[name] || (this._events[name] = []);
		
				_event.push({
					callback: callback,
					context: context || this,
					handler: this
				});
			},
		
			/**
			 * Triggers a particular event. If a handler
			 * is linked to that event, the handler will be
			 * executed.
			 */
			trigger: function(name) {
				if (!name)
					return;
		
				var _event, length, args, i;
		
				this._events = this._events || {};
				_event = this._events[name] || (this._events[name] = []);
		
				if (!_event)
					return;
		
				length = Math.max(0, arguments.length - 1);
				args = [];
		
				for (i = 0; i < length; i++) 
					args[i] = arguments[i + 1];
		
				for (i = 0; i < _event.length; i++)
					_event[i].callback.apply(_event[i].context, args);	
			},
		
			/**
			 * Removes an event handler. If no name is provided,
			 * all handlers for this object will be removed.
			 */
			off: function(name) {
				if (name)
					this._events[name] = undefined;
		
				else
					this._events = {};
			}
		
		};
	Pizzicato.Sound = function(description, callback) {
		var self = this;
		var util = Pizzicato.Util;
		var descriptionError = getDescriptionError(description);
		var hasOptions = util.isObject(description) && util.isObject(description.options);
		var defaultAttack = 0.04;
		var defaultRelease = 0.04;
	
		if (descriptionError) {
			console.error(descriptionError);
			throw new Error('Error initializing Pizzicato Sound: ' + descriptionError);
		}
	
		this.detached = hasOptions && description.options.detached;
		this.masterVolume = Pizzicato.context.createGain();
		this.fadeNode = Pizzicato.context.createGain();
		this.fadeNode.gain.value = 0;
	
		if (!this.detached)
			this.masterVolume.connect(Pizzicato.masterGainNode);
	
		this.lastTimePlayed = 0;
		this.effects = [];
		this.effectConnectors = [];
		this.playing = this.paused = false;
		this.loop = hasOptions && description.options.loop;
		this.attack = hasOptions && util.isNumber(description.options.attack) ? description.options.attack : defaultAttack;
		this.volume = hasOptions && util.isNumber(description.options.volume) ? description.options.volume : 1;
	
		if (hasOptions && util.isNumber(description.options.release)) {
			this.release = description.options.release;
		} else if (hasOptions && util.isNumber(description.options.sustain)) {
			console.warn('\'sustain\' is deprecated. Use \'release\' instead.');
			this.release = description.options.sustain;
		} else {
			this.release = defaultRelease;
		}
	
		if (!description)
			(initializeWithWave.bind(this))({}, callback);
	
		else if (util.isString(description))
			(initializeWithUrl.bind(this))(description, callback);
	
		else if (util.isFunction(description))
			(initializeWithFunction.bind(this))(description, callback);
	
		else if (description.source === 'file')
			(initializeWithUrl.bind(this))(description.options.path, callback);
	
		else if (description.source === 'wave')
			(initializeWithWave.bind(this))(description.options, callback);
	
		else if (description.source === 'input')
			(initializeWithInput.bind(this))(description, callback);
	
		else if (description.source === 'script')
			(initializeWithFunction.bind(this))(description.options, callback);
	
		else if (description.source === 'sound')
			(initializeWithSoundObject.bind(this))(description.options, callback);
	
	
		function getDescriptionError(description) {
			var supportedSources = ['wave', 'file', 'input', 'script', 'sound'];
	
			if (description && (!util.isFunction(description) && !util.isString(description) && !util.isObject(description)))
				return 'Description type not supported. Initialize a sound using an object, a function or a string.';
	
			if (util.isObject(description)) {
	
				if (!util.isString(description.source) || supportedSources.indexOf(description.source) === -1)
					return 'Specified source not supported. Sources can be wave, file, input or script';
	
				if (description.source === 'file' && (!description.options || !description.options.path))
					return 'A path is needed for sounds with a file source';
	
				if (description.source === 'script' && (!description.options || !description.options.audioFunction))
					return 'An audio function is needed for sounds with a script source';
			}
		}
	
	
		function initializeWithWave(waveOptions, callback) {
			waveOptions = waveOptions || {};
			this.getRawSourceNode = function() {
				var frequency = this.sourceNode ? this.sourceNode.frequency.value : waveOptions.frequency;
				var node = Pizzicato.context.createOscillator();
				node.type = waveOptions.type || 'sine';
				node.frequency.value = (frequency || 440);
	
				return node;
			};
			this.sourceNode = this.getRawSourceNode();
			this.sourceNode.gainSuccessor = Pz.context.createGain();
			this.sourceNode.connect(this.sourceNode.gainSuccessor);
	
			if (util.isFunction(callback))
				callback();
		}
	
	
		function initializeWithUrl(paths, callback) {
			paths = util.isArray(paths) ? paths : [paths];
	
			var request = new XMLHttpRequest();
			request.open('GET', paths[0], true);
			request.responseType = 'arraybuffer';
	
			request.onload = function(progressEvent) {
	
				Pizzicato.context.decodeAudioData(progressEvent.target.response, (function(buffer) {
	
					self.getRawSourceNode = function() {
						var node = Pizzicato.context.createBufferSource();
						node.loop = this.loop;
						node.buffer = buffer;
						return node;
					};
					if (util.isFunction(callback))
						callback();
	
				}).bind(self), (function(error) {
	
					console.error('Error decoding audio file ' + paths[0]);
	
					if (paths.length > 1) {
						paths.shift();
						initializeWithUrl(paths, callback);
						return;
					}
	
					error = error || new Error('Error decoding audio file ' + paths[0]);
	
					if (util.isFunction(callback))
						callback(error);
	
				}).bind(self));
	
			};
			request.onreadystatechange = function(event) {
	
				if (request.readyState === 4 && request.status !== 200) {
					console.error('Error while fetching ' + paths[0] + '. ' + request.statusText);
				}
			};
			request.send();
		}
	
	
		function initializeWithInput(options, callback) {
			navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	
			if (!navigator.getUserMedia) {
				console.error('Your browser does not support getUserMedia');
				return;
			}
	
			navigator.getUserMedia({
				audio: true
			}, (function(stream) {
				self.getRawSourceNode = function() {
					return Pizzicato.context.createMediaStreamSource(stream);
				};
				if (util.isFunction(callback))
					callback();
	
			}).bind(self), function(error) {
				if (util.isFunction(callback))
					callback(error);
			});
		}
	
	
		function initializeWithFunction(options, callback) {
			var audioFunction = util.isFunction(options) ? options : options.audioFunction;
			var bufferSize = util.isObject(options) && options.bufferSize ? options.bufferSize : null;
	
			if (!bufferSize) {
				try { // Webkit does not automatically chose the buffer size
					var test = Pizzicato.context.createScriptProcessor();
				} catch (e) {
					bufferSize = 2048;
				}
			}
	
			this.getRawSourceNode = function() {
				var node = Pizzicato.context.createScriptProcessor(bufferSize, 1, 1);
				node.onaudioprocess = audioFunction;
				return node;
			};
		}
	
	
		function initializeWithSoundObject(options, callback) {
			this.getRawSourceNode = options.sound.getRawSourceNode;
	
			if (options.sound.sourceNode && Pz.Util.isOscillator(options.sound.sourceNode)) {
				this.sourceNode = this.getRawSourceNode();
				this.frequency = options.sound.frequency;
			}
		}
	};
	
	
	Pizzicato.Sound.prototype = Object.create(Pizzicato.Events, {
	
		play: {
			enumerable: true,
	
			value: function(when, offset) {
	
				if (this.playing)
					return;
	
				if (!Pz.Util.isNumber(offset))
					offset = this.offsetTime || 0;
	
				if (!Pz.Util.isNumber(when))
					when = 0;
	
				this.playing = true;
				this.paused = false;
				this.sourceNode = this.getSourceNode();
	
				this.applyAttack();
	
				if (Pz.Util.isFunction(this.sourceNode.start)) {
					this.lastTimePlayed = Pizzicato.context.currentTime - offset;
					this.sourceNode.start(Pz.context.currentTime + when, offset);
				}
	
				this.trigger('play');
			}
		},
	
	
		stop: {
			enumerable: true,
	
			value: function() {
				if (!this.paused && !this.playing)
					return;
	
				this.paused = this.playing = false;
				this.stopWithRelease();
	
				this.offsetTime = 0;
				this.trigger('stop');
			}
		},
	
	
		pause: {
			enumerable: true,
	
			value: function() {
				if (this.paused || !this.playing)
					return;
	
				this.paused = true;
				this.playing = false;
	
				this.stopWithRelease();
	
				var elapsedTime = Pz.context.currentTime - this.lastTimePlayed;
	
				// If we are using a buffer node - potentially in loop mode - we need to
				// know where to re-start the sound independently of the loop it is in.
				if (this.sourceNode.buffer)
					this.offsetTime = elapsedTime % (this.sourceNode.buffer.length / Pz.context.sampleRate);
				else
					this.offsetTime = elapsedTime;
	
				this.trigger('pause');
			}
		},
	
	
		clone: {
			enumerable: true,
	
			value: function() {
				var clone = new Pizzicato.Sound({
					source: 'sound',
					options: {
						loop: this.loop,
						attack: this.attack,
						release: this.release,
						volume: this.volume,
						sound: this
					}
				});
	
				for (var i = 0; i < this.effects.length; i++)
					clone.addEffect(this.effects[i]);
	
				return clone;
			}
		},
	
	
		onEnded: {
			enumerable: true,
	
			value: function(node) {
				return function() {
					// This function may've been called from the release
					// end. If in that time the Sound has been played again,
					// no action should be taken.
					if (!!this.sourceNode && this.sourceNode !== node)
						return;
	
					if (this.playing)
						this.stop();
					if (!this.paused)
						this.trigger('end');
				};
			}
		},
	
		/**
		 * Adding effects will create a graph in which there will be a
		 * gain node (effectConnector) in between every effect added. For example:
		 * [fadeNode]--->[effect 1]->[connector 1]--->[effect 2]->[connector 2]--->[masterGain]
		 * 
		 * Connectors are used to know what nodes to disconnect and not disrupt the
		 * connections of another Pz.Sound object using the same effect.
		 */
		addEffect: {
			enumerable: true,
	
			value: function(effect) {
				if (!Pz.Util.isEffect(effect)) {
					console.error('The object provided is not a Pizzicato effect.');
					return this;
				}
	
				this.effects.push(effect);
	
				// Connects effect in the last position
				var previousNode = this.effectConnectors.length > 0 ? this.effectConnectors[this.effectConnectors.length - 1] : this.fadeNode;
				previousNode.disconnect();
				previousNode.connect(effect);
	
				// Creates connector for the newly added effect
				var gain = Pz.context.createGain();
				this.effectConnectors.push(gain);
				effect.connect(gain);
				gain.connect(this.masterVolume);
	
				return this;
			}
		},
	
		/**
		 * When removing effects, the graph in which there will be a
		 * gain node (effectConnector) in between every effect should be 
		 * conserved. For example:
		 * [fadeNode]--->[effect 1]->[connector 1]--->[effect 2]->[connector 2]--->[masterGain]
		 * 
		 * Connectors are used to know what nodes to disconnect and not disrupt the
		 * connections of another Pz.Sound object using the same effect.
		 */
		removeEffect: {
			enumerable: true,
	
			value: function(effect) {
	
				var index = this.effects.indexOf(effect);
	
				if (index === -1) {
					console.warn('Cannot remove effect that is not applied to this sound.');
					return this;
				}
	
				var shouldResumePlaying = this.playing;
	
				if (shouldResumePlaying)
					this.pause();
	
				var previousNode = (index === 0) ? this.fadeNode : this.effectConnectors[index - 1];
				previousNode.disconnect();
	
				// Disconnect connector and effect
				var effectConnector = this.effectConnectors[index];
				effectConnector.disconnect();
				effect.disconnect(effectConnector);
	
				// Remove connector and effect from our arrays
				this.effectConnectors.splice(index, 1);
				this.effects.splice(index, 1);
	
				var targetNode; 
				if (index > this.effects.length - 1 || this.effects.length === 0)
					targetNode = this.masterVolume;
				else
					targetNode = this.effects[index];
	
				previousNode.connect(targetNode);
	
				if (shouldResumePlaying)
					this.play();
	
				return this;
			}
		},
	
	
		connect: {
			enumerable: true,
	
			value: function(audioNode) {
				this.masterVolume.connect(audioNode);
				return this;
			}
		},
	
	
		disconnect: {
			enumerable: true,
	
			value: function(audioNode) {
				this.masterVolume.disconnect(audioNode);
				return this;
			}
		},
	
	
		connectEffects: {
			enumerable: true,
	
			value: function() {
	
				var connectors = [];
	
				for (var i = 0; i < this.effects.length; i++) {
	
					var isLastEffect = i === this.effects.length - 1;
					var destinationNode = isLastEffect ? this.masterVolume : this.effects[i + 1].inputNode;
	
					connectors[i] = Pz.context.createGain();
	
					this.effects[i].outputNode.disconnect(this.effectConnectors[i]);
	
					this.effects[i].outputNode.connect(destinationNode);
				}
			}
		},
	
	
		volume: {
			enumerable: true,
	
			get: function() {
				if (this.masterVolume)
					return this.masterVolume.gain.value;
			},
	
			set: function(volume) {
				if (Pz.Util.isInRange(volume, 0, 1) && this.masterVolume)
					this.masterVolume.gain.value = volume;
			}
		},
	
	
		frequency: {
			enumerable: true,
	
			get: function() {
				if (this.sourceNode && Pz.Util.isOscillator(this.sourceNode)) {
					return this.sourceNode.frequency.value;
				}
	
				return null;
			},
	
			set: function(frequency) {
				if (this.sourceNode && Pz.Util.isOscillator(this.sourceNode)) {
					this.sourceNode.frequency.value = frequency;
				}
			}
		},
	
		/**
	 	 * @deprecated - Use "release"
		 */
		sustain: {
			enumerable: true,
	
			get: function() {
				console.warn('\'sustain\' is deprecated. Use \'release\' instead.');
				return this.release;
			},
	
			set: function(sustain){
				console.warn('\'sustain\' is deprecated. Use \'release\' instead.');
	
				if (Pz.Util.isInRange(sustain, 0, 10))
					this.release = sustain;
			}
		},
	
	
		/**
		 * Returns the node that produces the sound. For example, an oscillator
		 * if the Sound object was initialized with a wave option.
		 */
		getSourceNode: {
			enumerable: true,
	
			value: function() {
				if (!!this.sourceNode) {
	
					// Directly disconnecting the previous source node causes a 
					// 'click' noise, especially noticeable if the sound is played 
					// while the release is ongoing. To address this, we fadeout the 
					// old source node before disonnecting it.
	
					var previousSourceNode = this.sourceNode;
					previousSourceNode.gainSuccessor.gain.setValueAtTime(previousSourceNode.gainSuccessor.gain.value, Pz.context.currentTime);
					previousSourceNode.gainSuccessor.gain.linearRampToValueAtTime(0.0001, Pz.context.currentTime + 0.2);
					setTimeout(function() {
						previousSourceNode.disconnect();
						previousSourceNode.gainSuccessor.disconnect();
					}, 200);
				}
	
				var sourceNode = this.getRawSourceNode();
	
				// A gain node will be placed after the source node to avoid
				// clicking noises (by fading out the sound)
				sourceNode.gainSuccessor = Pz.context.createGain();
				sourceNode.connect(sourceNode.gainSuccessor);
				sourceNode.gainSuccessor.connect(this.fadeNode);
				this.fadeNode.connect(this.getInputNode());
	
				if (Pz.Util.isAudioBufferSourceNode(sourceNode))
					sourceNode.onended = this.onEnded(sourceNode).bind(this);
	
				return sourceNode;
			}
		},
	
	
		/**
		 * Returns the first node in the graph. When there are effects,
		 * the first node is the input node of the first effect.
		 */
		getInputNode: {
			enumerable: true,
	
			value: function() {
				if (this.effects.length > 0)
					return this.effects[0].inputNode;
	
				return this.masterVolume;
			}
		},
	
		/**
		 * Will take the current source node and work up the volume
		 * gradually in as much time as specified in the attack property
		 * of the sound.
		 */
		applyAttack: {
			enumerable: false,
	
			value: function() {
				var currentValue = this.fadeNode.gain.value;
				this.fadeNode.gain.cancelScheduledValues(Pz.context.currentTime);
				this.fadeNode.gain.setValueAtTime(currentValue, Pz.context.currentTime);
	
				if (!this.attack) {
					this.fadeNode.gain.setValueAtTime(1.0, Pizzicato.context.currentTime);
					return;
				}
	
				var remainingAttackTime = (1 - this.fadeNode.gain.value) * this.attack;
				this.fadeNode.gain.setValueAtTime(this.fadeNode.gain.value, Pizzicato.context.currentTime);
				this.fadeNode.gain.linearRampToValueAtTime(1, Pizzicato.context.currentTime + remainingAttackTime);
			}
		},
	
		/**
		 * Will take the current source node and work down the volume
		 * gradually in as much time as specified in the release property
		 * of the sound before stopping the source node.
		 */
		stopWithRelease: {
			enumerable: false,
	
			value: function(callback) {
	
				var node = this.sourceNode;
				var stopSound = function() {
					return Pz.Util.isFunction(node.stop) ? node.stop(0) : node.disconnect();
				};
	
				var currentValue = this.fadeNode.gain.value;
				this.fadeNode.gain.cancelScheduledValues(Pz.context.currentTime);
				this.fadeNode.gain.setValueAtTime(currentValue, Pz.context.currentTime);
	
				if (!this.release) {
					stopSound();
					return;
				}
	
				var remainingReleaseTime = this.fadeNode.gain.value * this.release;
				this.fadeNode.gain.setValueAtTime(this.fadeNode.gain.value, Pizzicato.context.currentTime);
				this.fadeNode.gain.linearRampToValueAtTime(0.00001, Pizzicato.context.currentTime + remainingReleaseTime);
	
				window.setTimeout(function() {
					stopSound();
				}, remainingReleaseTime * 1000);
			}
		}
	});
	
	Pizzicato.Group = function(sounds) {
	
		sounds = sounds || [];
		
		this.mergeGainNode = Pz.context.createGain();
		this.masterVolume = Pz.context.createGain();
		this.sounds = [];
		this.effects = [];
		this.effectConnectors = [];
	
		this.mergeGainNode.connect(this.masterVolume);
		this.masterVolume.connect(Pz.masterGainNode);
	
		for (var i = 0; i < sounds.length; i++)
			this.addSound(sounds[i]);
	};
	
	Pizzicato.Group.prototype = Object.create(Pz.Events, {
	
		connect: {
			enumerable: true,
	
			value: function(audioNode) {
				this.masterVolume.connect(audioNode);
				return this;
			}
		},
	
	
		disconnect: {
			enumerable: true,
	
			value: function(audioNode) {
				this.masterVolume.disconnect(audioNode);
				return this;
			}
		},
	
	
		addSound: {
			enumerable: true,
	
			value: function(sound) {
				if (!Pz.Util.isSound(sound)) {
					console.error('You can only add Pizzicato.Sound objects');
					return;
				}
				if (this.sounds.indexOf(sound) > -1) {
					console.warn('The Pizzicato.Sound object was already added to this group');
					return;
				}
				if (sound.detached) {
					console.warn('Groups do not support detached sounds. You can manually create an audio graph to group detached sounds together.');
				}
	
				sound.disconnect(Pz.masterGainNode);
				sound.connect(this.mergeGainNode);
				this.sounds.push(sound);
			}
		},
	
	
		removeSound: {
			enumerable: true,
	
			value: function(sound) {
				var index = this.sounds.indexOf(sound);
	
				if (index === -1) {
					console.warn('Cannot remove a sound that is not part of this group.');
					return;
				}
	
				sound.disconnect(this.mergeGainNode);
				sound.connect(Pz.masterGainNode);
				this.sounds.splice(index, 1);
			}
		},
	
	
		volume: {
			enumerable: true,
	
			get: function() {
				if (this.masterVolume)
					return this.masterVolume.gain.value;
			},
	
			set: function(volume) {
				if (Pz.Util.isInRange(volume, 0, 1))
					this.masterVolume.gain.value = volume;
			}
		},
	
	
		play: {
			enumerable: true,
	
			value: function() {
				for (var i = 0; i < this.sounds.length; i++)
					this.sounds[i].play();
	
				this.trigger('play');
			}
	
		},
	
	
		stop: {
			enumerable: true,
	
			value: function() {
				for (var i = 0; i < this.sounds.length; i++)
					this.sounds[i].stop();
	
				this.trigger('stop');
			}
	
		},
	
	
		pause: {
			enumerable: true,
	
			value: function() {
				for (var i = 0; i < this.sounds.length; i++)
					this.sounds[i].pause();
	
				this.trigger('pause');
			}
	
		},
	
		/**
		 * Similarly to Sound objects, adding effects will create a graph in which there will be a
		 * gain node (effectConnector) in between every effect added. For example:
		 * [fadeNode]--->[effect 1]->[connector 1]--->[effect 2]->[connector 2]--->[masterGain]
		 * 
		 * Connectors are used to know what nodes to disconnect and not disrupt the
		 * connections of another Pz.Group object using the same effect.
		 */
		addEffect: {
			enumerable: true,
	
			value: function(effect) {
				if (!Pz.Util.isEffect(effect)) {
					console.error('The object provided is not a Pizzicato effect.');
					return this;
				}
	
				this.effects.push(effect);
	
				// Connects effect in the last position
				var previousNode = this.effectConnectors.length > 0 ? this.effectConnectors[this.effectConnectors.length - 1] : this.mergeGainNode;
				previousNode.disconnect();
				previousNode.connect(effect);
	
				// Creates connector for the newly added effect
				var gain = Pz.context.createGain();
				this.effectConnectors.push(gain);
				effect.connect(gain);
				gain.connect(this.masterVolume);
	
				return this;
			}
		},
	
		/**
		 * When removing effects, the graph in which there will be a
		 * gain node (effectConnector) in between every effect should be 
		 * conserved. For example:
		 * [fadeNode]--->[effect 1]->[connector 1]--->[effect 2]->[connector 2]--->[masterGain]
		 * 
		 * Connectors are used to know what nodes to disconnect and not disrupt the
		 * connections of another Pz.Group object using the same effect.
		 */
		removeEffect: {
			enumerable: true,
	
			value: function(effect) {
				var index = this.effects.indexOf(effect);
	
				if (index === -1) {
					console.warn('Cannot remove effect that is not applied to this group.');
					return this;
				}
	
				var previousNode = (index === 0) ? this.mergeGainNode : this.effectConnectors(index - 1);
				previousNode.disconnect();
	
				// Disconnect connector and effect
				var effectConnector = this.effectConnectors[index];
				effectConnector.disconnect();
				effect.disconnect(effectConnector);
	
				// Remove connector and effect from our arrays
				this.effectConnectors.splice(index, 1);
				this.effects.splice(index, 1);
	
				var targetNode; 
				if (index > this.effects.length - 1 || this.effects.length === 0)
					targetNode = this.masterVolume;
				else
					targetNode = this.effects[index];
	
				previousNode.connect(targetNode);
	
				return this;
			}
		}
	
	});
	Pizzicato.Effects = {};
	
	var baseEffect = Object.create(null, {
	
		connect: {
			enumerable: true,
	
			value: function(audioNode) {
				this.outputNode.connect(audioNode);
				return this;
			}
		},
	
		disconnect: {
			enumerable: true,
	
			value: function(audioNode) {
				this.outputNode.disconnect(audioNode);
				return this;
			}
		}
	});
	Pizzicato.Effects.Delay = function(options) {
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			feedback: 0.5,
			time: 0.3,
			mix: 0.5
		};
	
		this.inputNode = Pizzicato.context.createGain();
		this.outputNode = Pizzicato.context.createGain();
		this.dryGainNode = Pizzicato.context.createGain();
		this.wetGainNode = Pizzicato.context.createGain();
		this.feedbackGainNode = Pizzicato.context.createGain();
		this.delayNode = Pizzicato.context.createDelay();
	
		// line in to dry mix
		this.inputNode.connect(this.dryGainNode);
		// dry line out
		this.dryGainNode.connect(this.outputNode);
	
		// feedback loop
		this.delayNode.connect(this.feedbackGainNode);
		this.feedbackGainNode.connect(this.delayNode);
	
		// line in to wet mix
		this.inputNode.connect(this.delayNode);
		// wet out
		this.delayNode.connect(this.wetGainNode);
		
		// wet line out
		this.wetGainNode.connect(this.outputNode);
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	Pizzicato.Effects.Delay.prototype = Object.create(baseEffect, {
	
		/**
		 * Gets and sets the dry/wet mix.
		 */
		mix: {
			enumerable: true,
	
			get: function() {
				return this.options.mix	;	
			},
	
			set: function(mix) {
				if (!Pz.Util.isInRange(mix, 0, 1))
					return;
	
				this.options.mix = mix;
				this.dryGainNode.gain.value = Pizzicato.Util.getDryLevel(this.mix);
				this.wetGainNode.gain.value = Pizzicato.Util.getWetLevel(this.mix);
			}
		},
	
		/**
		 * Time between each delayed sound
		 */
		time: {
			enumerable: true,
	
			get: function() {
				return this.options.time;	
			},
	
			set: function(time) {
				if (!Pz.Util.isInRange(time, 0, 180))
					return;
	
				this.options.time = time;
				this.delayNode.delayTime.value = time;
			}
		},
	
		/**
		 * Strength of each of the echoed delayed sounds.
		 */
		feedback: {
			enumerable: true,
	
			get: function() {
				return this.options.feedback;	
			},
	
			set: function(feedback) {
				if (!Pz.Util.isInRange(feedback, 0, 1))
					return;
	
				this.options.feedback = parseFloat(feedback, 10);
				this.feedbackGainNode.gain.value = this.feedback;
			}
		}
	
	});
	Pizzicato.Effects.Compressor = function(options) {
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			threshold: -24,
			knee: 30,
			attack: 0.003,
			release: 0.250,
			ratio: 12
		};
	
		this.inputNode = this.compressorNode = Pizzicato.context.createDynamicsCompressor();
		this.outputNode = Pizzicato.context.createGain();
		
		this.compressorNode.connect(this.outputNode);
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	Pizzicato.Effects.Compressor.prototype = Object.create(baseEffect, {
	
		/**
		 * The level above which compression is applied to the audio.
		 * MIN: -100
		 * MAX: 0
		 */
		threshold: {
			enumerable: true,
			
			get: function() {
				return this.compressorNode.threshold.value;
			},
			set: function(value) {
				if (Pizzicato.Util.isInRange(value, -100, 0))
					this.compressorNode.threshold.value = value;
			}
		},
	
		/**
		 * A value representing the range above the threshold where 
		 * the curve smoothly transitions to the "ratio" portion. More info:
		 * http://www.homestudiocorner.com/what-is-knee-on-a-compressor/
		 * MIN 0
		 * MAX 40
		 */
		knee: {
			enumerable: true,
			
			get: function() {
				return this.compressorNode.knee.value;
			},
			set: function(value) {
				if (Pizzicato.Util.isInRange(value, 0, 40))
					this.compressorNode.knee.value = value;
			}
		},
	
		/**
		 * How soon the compressor starts to compress the dynamics after 
		 * the threshold is exceeded. If volume changes are slow, you can 
		 * push this to a high value. Short attack times will result in a 
		 * fast response to sudden, loud sounds, but will make the changes 
		 * in volume much more obvious to listeners.
		 * MIN 0
		 * MAX 1
		 */
		attack: {
			enumerable: true,
			
			get: function() {
				return this.compressorNode.attack.value;
			},
			set: function(value) {
				if (Pizzicato.Util.isInRange(value, 0, 1))
					this.compressorNode.attack.value = value;
			}
		},
	
		/**
		 * How soon the compressor starts to release the volume level 
		 * back to normal after the level drops below the threshold. 
		 * A long time value will tend to lose quiet sounds that come 
		 * after loud ones, but will avoid the volume being raised too 
		 * much during short quiet sections like pauses in speech.
		 * MIN 0
		 * MAX 1
		 */
		release: {
			enumerable: true,
			
			get: function() {
				return this.compressorNode.release.value;
			},
			set: function(value) {
				if (Pizzicato.Util.isInRange(value, 0, 1))
					this.compressorNode.release.value = value;
			}
		},
	
		/**
		 * The amount of compression applied to the audio once it 
		 * passes the threshold level. The higher the Ratio the more 
		 * the loud parts of the audio will be compressed.
		 * MIN 1
		 * MAX 20
		 */
		ratio: {
			enumerable: true,
			
			get: function() {
				return this.compressorNode.ratio.value;
			},
			set: function(value) {
				if (Pizzicato.Util.isInRange(value, 1, 20))
					this.compressorNode.ratio.value = value;
			}
		},
	
		getCurrentGainReduction: function() {
			return this.compressorNode.reduction;
		}
	
	});
	/**
	 * Frequencies below the cutoff frequency pass 
	 * through; frequencies above it are attenuated.
	 */
	Pizzicato.Effects.LowPassFilter = function(options) {
		Filter.call(this, options, 'lowpass');
	};
	
	/**
	 * Frequencies below the cutoff frequency are 
	 * attenuated; frequencies above it pass through.
	 */
	Pizzicato.Effects.HighPassFilter = function(options) {
		Filter.call(this, options, 'highpass');
	};
	
	/**
	 * Filters used by Pizzicato stem from the biquad filter node. This 
	 * function acts as a common constructor. The only thing that changes 
	 * between filters is the 'type' of the biquad filter node.
	 */
	function Filter(options, type) {
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			frequency: 350,
			peak: 1
		};
	
		this.inputNode = this.filterNode = Pz.context.createBiquadFilter();
		this.filterNode.type = type;
	
		this.outputNode = Pizzicato.context.createGain();
	
		this.filterNode.connect(this.outputNode);
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	}
	
	var filterPrototype = Object.create(baseEffect, {
		
		/**
		 * The cutoff frequency of the filter.
		 * MIN: 10
		 * MAX: 22050 (half the sampling rate of the current context)
		 */
		frequency: {
			enumerable: true,
			
			get: function() {
				return this.filterNode.frequency.value;
			},
			set: function(value) {
				if (Pizzicato.Util.isInRange(value, 10, 22050))
					this.filterNode.frequency.value = value;
			}
		},
	
		/**
		 * Indicates how peaked the frequency is around 
		 * the cutoff. The greater the value is, the 
		 * greater is the peak.
		 * MIN: 0.0001
		 * MAX: 1000
		 */
		peak: {
			enumerable: true,
			
			get: function() {
				return this.filterNode.Q.value;
			},
			set: function(value) {
				if (Pizzicato.Util.isInRange(value, 0.0001, 1000))
					this.filterNode.Q.value = value;
			}
		}
	});
	
	Pizzicato.Effects.LowPassFilter.prototype = filterPrototype;
	Pizzicato.Effects.HighPassFilter.prototype = filterPrototype;
	Pizzicato.Effects.Distortion = function(options) {
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			gain: 0.5
		};
	
		this.waveShaperNode = Pizzicato.context.createWaveShaper();
		this.inputNode = this.outputNode = this.waveShaperNode;
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	Pizzicato.Effects.Distortion.prototype = Object.create(baseEffect, {
	
		/**
		 * Gets and sets the gain (amount of distortion).
		 */
		gain: {
			enumerable: true,
			
			get: function() {
				return this.options.gain;
			},
	
			set: function(gain) {
				if (!Pz.Util.isInRange(gain, 0, 1))
					return;
	
				this.options.gain = gain;
				this.adjustGain();
			}
		},
	
		/**
		 * Sets the wave curve with the correct gain. Taken from
		 * http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion
		 */
		adjustGain: {
			writable: false,
			configurable: false,
			enumerable: false,
			value: function() {
				var gain = Pz.Util.isNumber(this.options.gain) ? parseInt(this.options.gain * 100, 10) : 50;
				var n_samples = 44100;
				var curve = new Float32Array(n_samples);
				var deg = Math.PI / 180;
				var x;
	
				for (var i = 0; i < n_samples; ++i ) {
					x = i * 2 / n_samples - 1;
					curve[i] = (3 + gain) * x * 20 * deg / (Math.PI + gain * Math.abs(x));
				}
	
				this.waveShaperNode.curve = curve;
			}
		}
	
	});
	Pizzicato.Effects.Flanger = function(options) {
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			time: 0.45,
			speed: 0.2,
			depth: 0.1,
			feedback: 0.1,
			mix: 0.5
		};
	
		this.inputNode = Pizzicato.context.createGain();
		this.outputNode = Pizzicato.context.createGain();
		this.inputFeedbackNode = Pizzicato.context.createGain();
		this.wetGainNode = Pizzicato.context.createGain();
		this.dryGainNode = Pizzicato.context.createGain();
		this.delayNode = Pizzicato.context.createDelay();
		this.oscillatorNode = Pizzicato.context.createOscillator();
		this.gainNode = Pizzicato.context.createGain();
		this.feedbackNode = Pizzicato.context.createGain();
		this.oscillatorNode.type = 'sine';
	
		this.inputNode.connect(this.inputFeedbackNode);
		this.inputNode.connect(this.dryGainNode);
	
		this.inputFeedbackNode.connect(this.delayNode);
		this.inputFeedbackNode.connect(this.wetGainNode);
	
		this.delayNode.connect(this.wetGainNode);
		this.delayNode.connect(this.feedbackNode);
	
		this.feedbackNode.connect(this.inputFeedbackNode);
	
		this.oscillatorNode.connect(this.gainNode);
		this.gainNode.connect(this.delayNode.delayTime);
	
		this.dryGainNode.connect(this.outputNode);
		this.wetGainNode.connect(this.outputNode);
	
		this.oscillatorNode.start(0);
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	Pizzicato.Effects.Flanger.prototype = Object.create(baseEffect, {
		
		time: {
			enumberable: true,
			
			get: function() {
				return this.options.time;
			},
	
			set: function(time) {
	
				if (!Pz.Util.isInRange(time, 0, 1))
					return;
	
				this.options.time = time;
				this.delayNode.delayTime.value = Pz.Util.normalize(time, 0.001, 0.02);
			}
		},
	
	
		speed: {
			enumberable: true,
			
			get: function() {
				return this.options.speed;
			},
	
			set: function(speed) {
				if (!Pz.Util.isInRange(speed, 0, 1))
					return;
	
				this.options.speed = speed;
				this.oscillatorNode.frequency.value = Pz.Util.normalize(speed, 0.5, 5);
			}
		},
	
	
		depth: {
			enumberable: true,
			
			get: function() {
				return this.options.depth;
			},
	
			set: function(depth) {
				if (!Pz.Util.isInRange(depth, 0, 1))
					return;
	
				this.options.depth = depth;
				this.gainNode.gain.value = Pz.Util.normalize(depth, 0.0005, 0.005);
			}
		},
	
	
		feedback: {
			enumberable: true,
			
			get: function() {
				return this.options.feedback;
			},
	
			set: function(feedback) {
				if (!Pz.Util.isInRange(feedback, 0, 1))
					return;
	
				this.options.feedback = feedback;
				this.feedbackNode.gain.value = Pz.Util.normalize(feedback, 0, 0.8);
			}
		},
	
	
		mix: {
			enumberable: true,
			
			get: function() {
				return this.options.mix;
			},
	
			set: function(mix) {
				if (!Pz.Util.isInRange(mix, 0, 1))
					return;
	
				this.options.mix = mix;
				this.dryGainNode.gain.value = Pizzicato.Util.getDryLevel(this.mix);
				this.wetGainNode.gain.value = Pizzicato.Util.getWetLevel(this.mix);
			}
		}
	
	});
	Pizzicato.Effects.StereoPanner = function(options) {
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			pan: 0
		};
	
		this.inputNode = Pizzicato.context.createGain();
		this.outputNode = Pizzicato.context.createGain();
	
		if (Pizzicato.context.createStereoPanner) {
			this.pannerNode = Pizzicato.context.createStereoPanner();
			this.inputNode.connect(this.pannerNode);
			this.pannerNode.connect(this.outputNode);
		}
		else {
			this.inputNode.connect(this.outputNode);
		}
	
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	Pizzicato.Effects.StereoPanner.prototype = Object.create(baseEffect, {
	
		/**
		 * Pan position
		 */
		pan: {
			enumerable: true,
	
			get: function() {
				return this.options.pan;	
			},
	
			set: function(pan) {
				if (!Pz.Util.isInRange(pan, -1, 1))
					return;
	
				this.options.pan = pan;
				if (this.pannerNode) {
					this.pannerNode.pan.value = pan;	
				}
			}
		}
	
	});
	Pizzicato.Effects.Convolver = function(options, callback) {
	
		this.options = {};
		options = options || this.options;
	
		var self = this;
		var request = new XMLHttpRequest();
		var defaults = {
			mix: 0.5
		};
	
		this.callback = callback;
	
		this.inputNode = Pizzicato.context.createGain();
		this.convolverNode = Pizzicato.context.createConvolver();
		this.outputNode = Pizzicato.context.createGain();
	
		this.wetGainNode = Pizzicato.context.createGain();
		this.dryGainNode = Pizzicato.context.createGain();
	
		this.inputNode.connect(this.convolverNode);
	
		this.convolverNode.connect(this.wetGainNode);
		this.inputNode.connect(this.dryGainNode);
	
		this.dryGainNode.connect(this.outputNode);
		this.wetGainNode.connect(this.outputNode);
	
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	
		if (!options.impulse) {
			console.error('No impulse file specified.');
			return;
		}
	
		request.open('GET', options.impulse, true);
		request.responseType = 'arraybuffer';
		request.onload = function (e) {
			var audioData = e.target.response;
	
			Pizzicato.context.decodeAudioData(audioData, function(buffer) {
	
				self.convolverNode.buffer = buffer;
	
				if (self.callback && Pz.Util.isFunction(self.callback))
					self.callback();
	
			}, function(error) {
	
				error = error || new Error('Error decoding impulse file');
	
				if (self.callback && Pz.Util.isFunction(self.callback))
					self.callback(error);
			});
		};
	
		request.onreadystatechange = function(event) {
			if (request.readyState === 4 && request.status !== 200) {
				console.error('Error while fetching ' + options.impulse + '. ' + request.statusText);
			}
		};
	
		request.send();
	};
	
	Pizzicato.Effects.Convolver.prototype = Object.create(baseEffect, {
	
		mix: {
			enumerable: true,
	
			get: function() {
				return this.options.mix;
			},
	
			set: function(mix) {
				if (!Pz.Util.isInRange(mix, 0, 1))
					return;
	
				this.options.mix = mix;
				this.dryGainNode.gain.value = Pizzicato.Util.getDryLevel(this.mix);
				this.wetGainNode.gain.value = Pizzicato.Util.getWetLevel(this.mix);
			}
		}
	});
	/**
	 * Adapted from https://github.com/mmckegg/web-audio-school/blob/master/lessons/3.%20Effects/18.%20Ping%20Pong%20Delay/answer.js
	 */
	
	Pizzicato.Effects.PingPongDelay = function(options) {
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			feedback: 0.5,
			time: 0.3,
			mix: 0.5
		};
	
		this.inputNode = Pizzicato.context.createGain();
		this.outputNode = Pizzicato.context.createGain();
		this.delayNodeLeft = Pizzicato.context.createDelay();
		this.delayNodeRight = Pizzicato.context.createDelay();
		this.dryGainNode = Pizzicato.context.createGain();
		this.wetGainNode = Pizzicato.context.createGain();
		this.feedbackGainNode = Pizzicato.context.createGain();
		this.channelMerger = Pizzicato.context.createChannelMerger(2);
	
		// dry mix
		this.inputNode.connect(this.dryGainNode);
		// dry mix out
		this.dryGainNode.connect(this.outputNode);
	
		// the feedback loop
		this.delayNodeLeft.connect(this.channelMerger, 0, 0);
		this.delayNodeRight.connect(this.channelMerger, 0, 1);
		this.delayNodeLeft.connect(this.delayNodeRight);
		this.feedbackGainNode.connect(this.delayNodeLeft);
		this.delayNodeRight.connect(this.feedbackGainNode);
	
		// wet mix
		this.inputNode.connect(this.feedbackGainNode);
	
		// wet out
		this.channelMerger.connect(this.wetGainNode);
		this.wetGainNode.connect(this.outputNode);
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	Pizzicato.Effects.PingPongDelay.prototype = Object.create(baseEffect, {
	
		/**
		 * Gets and sets the dry/wet mix.
		 */
		mix: {
			enumerable: true,
	
			get: function() {
				return this.options.mix	;	
			},
	
			set: function(mix) {
				if (!Pz.Util.isInRange(mix, 0, 1))
					return;
	
				this.options.mix = mix;
				this.dryGainNode.gain.value = Pizzicato.Util.getDryLevel(this.mix);
				this.wetGainNode.gain.value = Pizzicato.Util.getWetLevel(this.mix);
			}
		},
	
		/**
		 * Time between each delayed sound
		 */
		time: {
			enumerable: true,
	
			get: function() {
				return this.options.time;	
			},
	
			set: function(time) {
				if (!Pz.Util.isInRange(time, 0, 180))
					return;
	
				this.options.time = time;
				this.delayNodeLeft.delayTime.value = time;
				this.delayNodeRight.delayTime.value = time;
			}
		},
	
		/**
		 * Strength of each of the echoed delayed sounds.
		 */
		feedback: {
			enumerable: true,
	
			get: function() {
				return this.options.feedback;	
			},
	
			set: function(feedback) {
				if (!Pz.Util.isInRange(feedback, 0, 1))
					return;
	
				this.options.feedback = parseFloat(feedback, 10);
				this.feedbackGainNode.gain.value = this.feedback;
			}
		}
	
	});
	/**
	 * Adapted from https://github.com/web-audio-components/simple-reverb
	 */
	
	Pizzicato.Effects.Reverb = function(options) {
		var self = this;
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			mix: 0.5,
			time: 0.01,
			decay: 0.01,
			reverse: false
		};
		
		this.inputNode = Pizzicato.context.createGain();
		this.reverbNode = Pizzicato.context.createConvolver();
		this.outputNode = Pizzicato.context.createGain();
		this.wetGainNode = Pizzicato.context.createGain();
		this.dryGainNode = Pizzicato.context.createGain();
	
		this.inputNode.connect(this.reverbNode);
		this.reverbNode.connect(this.wetGainNode);
		this.inputNode.connect(this.dryGainNode);
		this.dryGainNode.connect(this.outputNode);
		this.wetGainNode.connect(this.outputNode);
		
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	
		(buildImpulse.bind(this))();
	};
	
	Pizzicato.Effects.Reverb.prototype = Object.create(baseEffect, {
	
		mix: {
			enumerable: true,
			
			get: function() {
				return this.options.mix;
			},
	
			set: function (mix) {
				if (!Pz.Util.isInRange(mix, 0, 1))
					return;
	
				this.options.mix = mix;
				this.dryGainNode.gain.value = Pizzicato.Util.getDryLevel(this.mix);
				this.wetGainNode.gain.value = Pizzicato.Util.getWetLevel(this.mix);
			}
		},
	
		time: {
			enumerable: true,
	
			get: function () {
				return this.options.time;
			},
	
			set: function (time) {
				if (!Pz.Util.isInRange(time, 0.0001, 10))
					return;
	
				this.options.time = time;
				(buildImpulse.bind(this))();
			}
		},
	
		decay: {
			enumerable: true,
	
			get: function () {
				return this.options.decay;
			},
	
			set: function (decay) {
				if (!Pz.Util.isInRange(decay, 0.0001, 10))
					return;
	
				this.options.decay = decay;
				(buildImpulse.bind(this))();
			}
	
		},
	
		reverse: {
			enumerable: true,
	
			get: function () {
				return this.options.reverse;
			},
	
			set: function (reverse) {
				if (!Pz.Util.isBool(reverse))
					return;
	
				this.options.reverse = reverse;
				(buildImpulse.bind(this))();
			}
		}
	
	});
	
	function buildImpulse() {
	
		var length = Pz.context.sampleRate * this.time;
		var impulse = Pizzicato.context.createBuffer(2, length, Pz.context.sampleRate);
		var impulseL = impulse.getChannelData(0);
		var impulseR = impulse.getChannelData(1);
		var n, i;
	
		for (i = 0; i < length; i++) {
			n = this.reverse ? length - i : i;
			impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, this.decay);
			impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - n / length, this.decay);
		}
	
		this.reverbNode.buffer = impulse;
	}
	Pizzicato.Effects.Tremolo = function(options) {
	
		// adapted from
		// https://github.com/mmckegg/web-audio-school/blob/master/lessons/3.%20Effects/13.%20Tremolo/answer.js
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			speed: 4,
			depth: 1,
			mix: 0.8
		};
	
		// create nodes
		this.inputNode = Pizzicato.context.createGain();
		this.outputNode = Pizzicato.context.createGain();
		this.dryGainNode = Pizzicato.context.createGain();
		this.wetGainNode = Pizzicato.context.createGain();
	
		this.tremoloGainNode = Pizzicato.context.createGain();
		this.tremoloGainNode.gain.value = 0;
		this.lfoNode = Pizzicato.context.createOscillator();
	
		this.shaperNode = Pizzicato.context.createWaveShaper();
		this.shaperNode.curve = new Float32Array([0, 1]);
		this.shaperNode.connect(this.tremoloGainNode.gain);
	
		// dry mix
		this.inputNode.connect(this.dryGainNode);
		this.dryGainNode.connect(this.outputNode);
		
		// wet mix
		this.lfoNode.connect(this.shaperNode);
		this.lfoNode.type = 'sine';
		this.lfoNode.start(0);
	
		this.inputNode.connect(this.tremoloGainNode);
		this.tremoloGainNode.connect(this.wetGainNode);
		this.wetGainNode.connect(this.outputNode);
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	Pizzicato.Effects.Tremolo.prototype = Object.create(baseEffect, {
	
		/**
		 * Gets and sets the dry/wet mix.
		 */
		mix: {
			enumerable: true,
	
			get: function() {
				return this.options.mix	;	
			},
	
			set: function(mix) {
				if (!Pz.Util.isInRange(mix, 0, 1)) 
					return;
	
				this.options.mix = mix;
				this.dryGainNode.gain.value = Pizzicato.Util.getDryLevel(this.mix);
				this.wetGainNode.gain.value = Pizzicato.Util.getWetLevel(this.mix);
			}
		},
	
		/**
		 * Speed of the tremolo
		 */
		speed: {
			enumerable: true,
	
			get: function() {
				return this.options.speed;	
			},
	
			set: function(speed) {
				if (!Pz.Util.isInRange(speed, 0, 20)) 
					return;
				
				this.options.speed = speed;
				this.lfoNode.frequency.value = speed;
			}
		},
	
		/**
		 * Depth of the tremolo
		 */
		depth: {
			enumerable: true,
	
			get: function() {
				return this.options.depth;	
			},
	
			set: function(depth) {
				if (!Pz.Util.isInRange(depth, 0, 1)) 
					return;
				
				this.options.depth = depth;
				this.shaperNode.curve = new Float32Array([1-depth, 1]);
			}
		}
	
	});
	Pizzicato.Effects.DubDelay = function(options) {
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			feedback: 0.6,
			time: 0.7,
			mix: 0.5,
			cutoff: 700
		};
	
		this.inputNode = Pizzicato.context.createGain();
		this.outputNode = Pizzicato.context.createGain();
		this.dryGainNode = Pizzicato.context.createGain();
		this.wetGainNode = Pizzicato.context.createGain();
		this.feedbackGainNode = Pizzicato.context.createGain();
		this.delayNode = Pizzicato.context.createDelay();
		this.bqFilterNode = Pizzicato.context.createBiquadFilter(); 
	
	
		// dry mix
		this.inputNode.connect(this.dryGainNode);
		this.dryGainNode.connect(this.outputNode);
	
		// wet mix
		this.inputNode.connect(this.wetGainNode);
		this.inputNode.connect(this.feedbackGainNode);
	
		this.feedbackGainNode.connect(this.bqFilterNode);
		this.bqFilterNode.connect(this.delayNode);
		this.delayNode.connect(this.feedbackGainNode);
		this.delayNode.connect(this.wetGainNode);
	
		this.wetGainNode.connect(this.outputNode);
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	Pizzicato.Effects.DubDelay.prototype = Object.create(baseEffect, {
	
		/**
		 * Gets and sets the dry/wet mix.
		 */
		mix: {
			enumerable: true,
	
			get: function() {
				return this.options.mix	;	
			},
	
			set: function(mix) {
				if (!Pz.Util.isInRange(mix, 0, 1))
					return;
	
				this.options.mix = mix;
				this.dryGainNode.gain.value = Pizzicato.Util.getDryLevel(this.mix);
				this.wetGainNode.gain.value = Pizzicato.Util.getWetLevel(this.mix);
			}
		},
	
		/**
		 * Time between each delayed sound
		 */
		time: {
			enumerable: true,
	
			get: function() {
				return this.options.time;	
			},
	
			set: function(time) {
				if (!Pz.Util.isInRange(time, 0, 180))
					return;
	
				this.options.time = time;
				this.delayNode.delayTime.value = time;
			}
		},
	
		/**
		 * Strength of each of the echoed delayed sounds.
		 */
		feedback: {
			enumerable: true,
	
			get: function() {
				return this.options.feedback;	
			},
	
			set: function(feedback) {
				if (!Pz.Util.isInRange(feedback, 0, 1))
					return;
	
				this.options.feedback = parseFloat(feedback, 10);
				this.feedbackGainNode.gain.value = this.feedback;
			}
		},
	
		/**
		 * Frequency on delay repeats
		 */
		cutoff: {
			enumerable: true,
	
			get: function() {
				return this.options.cutoff;	
			},
	
			set: function(cutoff) {
				if (!Pz.Util.isInRange(cutoff, 0, 4000))
					return;
	
				this.options.cutoff = cutoff;
				this.bqFilterNode.frequency.value = this.cutoff;
			}
		}
	
	
	
	});
	/**
	 * See http://webaudio.prototyping.bbc.co.uk/ring-modulator/
	 */
	Pizzicato.Effects.RingModulator = function(options) {
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			speed: 30,
			distortion: 1,
			mix: 0.5
		};
	
		this.inputNode = Pizzicato.context.createGain();
		this.outputNode = Pizzicato.context.createGain();
		this.dryGainNode = Pizzicato.context.createGain();
		this.wetGainNode = Pizzicato.context.createGain();
	
	
		/**
		 * `vIn` is the modulation oscillator input 
		 * `vc` is the audio input.
		 */
		this.vIn = Pizzicato.context.createOscillator();
		this.vIn.start(0);
		this.vInGain = Pizzicato.context.createGain();
		this.vInGain.gain.value = 0.5;
		this.vInInverter1 = Pizzicato.context.createGain();
		this.vInInverter1.gain.value = -1;
		this.vInInverter2 = Pizzicato.context.createGain();
		this.vInInverter2.gain.value = -1;
		this.vInDiode1 = new DiodeNode(Pizzicato.context);
		this.vInDiode2 = new DiodeNode(Pizzicato.context);
		this.vInInverter3 = Pizzicato.context.createGain();
		this.vInInverter3.gain.value = -1;
		this.vcInverter1 = Pizzicato.context.createGain();
		this.vcInverter1.gain.value = -1;
		this.vcDiode3 = new DiodeNode(Pizzicato.context);
		this.vcDiode4 = new DiodeNode(Pizzicato.context);
	
		this.outGain = Pizzicato.context.createGain();
		this.outGain.gain.value = 3;
	
		this.compressor = Pizzicato.context.createDynamicsCompressor();
		this.compressor.threshold.value = -24;
		this.compressor.ratio.value = 16;
	
		// dry mix
		this.inputNode.connect(this.dryGainNode);
		this.dryGainNode.connect(this.outputNode);
	
		// wet mix	
		this.inputNode.connect(this.vcInverter1);
		this.inputNode.connect(this.vcDiode4.node);
		this.vcInverter1.connect(this.vcDiode3.node);
		this.vIn.connect(this.vInGain);
		this.vInGain.connect(this.vInInverter1);
		this.vInGain.connect(this.vcInverter1);
		this.vInGain.connect(this.vcDiode4.node);
		this.vInInverter1.connect(this.vInInverter2);
		this.vInInverter1.connect(this.vInDiode2.node);
		this.vInInverter2.connect(this.vInDiode1.node);
		this.vInDiode1.connect(this.vInInverter3);
		this.vInDiode2.connect(this.vInInverter3);
		this.vInInverter3.connect(this.compressor);
		this.vcDiode3.connect(this.compressor);
		this.vcDiode4.connect(this.compressor);
		this.compressor.connect(this.outGain);
		this.outGain.connect(this.wetGainNode);
	
		// line out
		this.wetGainNode.connect(this.outputNode);
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	var DiodeNode = function(context_) {
		this.context = context_;
		this.node = this.context.createWaveShaper();
		this.vb = 0.2;
		this.vl = 0.4;
		this.h = 1;
		this.setCurve();
	};
	
	DiodeNode.prototype.setDistortion = function (distortion) {
		this.h = distortion;
		return this.setCurve();
	};
	
	DiodeNode.prototype.setCurve = function () {
		var i, 
			samples, 
			v, 
			value, 
			wsCurve, 
			_i, 
			_ref, 
			retVal;
	
		samples = 1024;
		wsCurve = new Float32Array(samples);
		
		for (i = _i = 0, _ref = wsCurve.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
			v = (i - samples / 2) / (samples / 2);
			v = Math.abs(v);
			if (v <= this.vb) {
				value = 0;
			} else if ((this.vb < v) && (v <= this.vl)) {
				value = this.h * ((Math.pow(v - this.vb, 2)) / (2 * this.vl - 2 * this.vb));
			} else {
				value = this.h * v - this.h * this.vl + (this.h * ((Math.pow(this.vl - this.vb, 2)) / (2 * this.vl - 2 * this.vb)));
			}
			wsCurve[i] = value;
		}
	
		retVal = this.node.curve = wsCurve;
		return retVal;
	};
	
	DiodeNode.prototype.connect = function(destination) {
		return this.node.connect(destination);
	};
	
	
	Pizzicato.Effects.RingModulator.prototype = Object.create(baseEffect, {
	
		/**
		 * Gets and sets the dry/wet mix.
		 */
		mix: {
			enumerable: true,
	
			get: function() {
				return this.options.mix	;	
			},
	
			set: function(mix) {
				if (!Pz.Util.isInRange(mix, 0, 1))
					return;
	
				this.options.mix = mix;
				this.dryGainNode.gain.value = Pizzicato.Util.getDryLevel(this.mix);
				this.wetGainNode.gain.value = Pizzicato.Util.getWetLevel(this.mix);
			}
		},
	
		/**
		 * Speed on the input oscillator
		 */
		speed: {
			enumerable: true,
	
			get: function() {
				return this.options.speed;	
			},
	
			set: function(speed) {
				if (!Pz.Util.isInRange(speed, 0, 2000))
					return;
	
				this.options.speed = speed;
				this.vIn.frequency.value = speed;
			}
		},
	
		/**
		 * Level of distortion
		 */
		distortion: {
			enumerable: true,
	
			get: function() {
				return this.options.distortion;	
			},
	
			set: function(distortion) {
				if (!Pz.Util.isInRange(distortion, 0.2, 50))
					return;
	
				this.options.distortion = parseFloat(distortion, 10);
	
				var diodeNodes = [this.vInDiode1, this.vInDiode2, this.vcDiode3, this.vcDiode4];
	
				for (var i=0, l=diodeNodes.length; i<l; i++) {
					diodeNodes[i].setDistortion(distortion);
				}
			}
		}
	
	});
	Pizzicato.Effects.Quadrafuzz = function(options) {
	
		this.options = {};
		options = options || this.options;
	
		var defaults = {
			lowGain: 0.6,
			midLowGain: 0.8,
			midHighGain: 0.5,
			highGain: 0.6
		};
	
	
		this.inputNode = Pz.context.createGain();
		this.outputNode = Pz.context.createGain();
		this.dryGainNode = Pz.context.createGain();
		this.wetGainNode = Pz.context.createGain();
	
	
		this.lowpassLeft = Pz.context.createBiquadFilter();
		this.lowpassLeft.type = 'lowpass';
		this.lowpassLeft.frequency.value = 147;
		this.lowpassLeft.Q.value = 0.7071;
	
		this.bandpass1Left = Pz.context.createBiquadFilter();
		this.bandpass1Left.type = 'bandpass';
		this.bandpass1Left.frequency.value = 587;
		this.bandpass1Left.Q.value = 0.7071;
	
		this.bandpass2Left = Pz.context.createBiquadFilter();
		this.bandpass2Left.type = 'bandpass';
		this.bandpass2Left.frequency.value = 2490;
		this.bandpass2Left.Q.value = 0.7071;
	
		this.highpassLeft = Pz.context.createBiquadFilter();
		this.highpassLeft.type = 'highpass';
		this.highpassLeft.frequency.value = 4980;
		this.highpassLeft.Q.value = 0.7071;
	
	
		this.overdrives = [];
		for (var i = 0; i < 4; i++) {
			this.overdrives[i] = Pz.context.createWaveShaper();
			this.overdrives[i].curve = getDistortionCurve();
		}
	
	
		this.inputNode.connect(this.wetGainNode);
		this.inputNode.connect(this.dryGainNode);
		this.dryGainNode.connect(this.outputNode);
	
		var filters = [this.lowpassLeft, this.bandpass1Left, this.bandpass2Left, this.highpassLeft];
		for (i = 0; i < filters.length; i++) {
			this.wetGainNode.connect(filters[i]);
			filters[i].connect(this.overdrives[i]);
			this.overdrives[i].connect(this.outputNode);
		}
	
		for (var key in defaults) {
			this[key] = options[key];
			this[key] = (this[key] === undefined || this[key] === null) ? defaults[key] : this[key];
		}
	};
	
	function getDistortionCurve(gain) {
		var sampleRate = Pz.context.sampleRate;
		var curve = new Float32Array(sampleRate);
		var deg = Math.PI / 180;
	
		for (var i = 0; i < sampleRate; i++) {
			var x = i * 2 / sampleRate - 1;
			curve[i] = (3 + gain) * x * 20 * deg / (Math.PI + gain * Math.abs(x));
		}
		return curve;
	}
	
	Pizzicato.Effects.Quadrafuzz.prototype = Object.create(baseEffect, {
	
		lowGain: {
			enumerable: true,
	
			get: function() {
				return this.options.lowGain;
			},
	
			set: function(lowGain) {
				if (!Pz.Util.isInRange(lowGain, 0, 1))
					return;
	
				this.options.lowGain = lowGain;
				this.overdrives[0].curve = getDistortionCurve(Pz.Util.normalize(this.lowGain, 0, 150));
			}
		},
	
		midLowGain: {
			enumerable: true,
	
			get: function() {
				return this.options.midLowGain;
			},
	
			set: function(midLowGain) {
				if (!Pz.Util.isInRange(midLowGain, 0, 1))
					return;
	
				this.options.midLowGain = midLowGain;
				this.overdrives[1].curve = getDistortionCurve(Pz.Util.normalize(this.midLowGain, 0, 150));
			}
		},
	
		midHighGain: {
			enumerable: true,
	
			get: function() {
				return this.options.midHighGain;
			},
	
			set: function(midHighGain) {
				if (!Pz.Util.isInRange(midHighGain, 0, 1))
					return;
	
				this.options.midHighGain = midHighGain;
				this.overdrives[2].curve = getDistortionCurve(Pz.Util.normalize(this.midHighGain, 0, 150));
			}
		},
	
		highGain: {
			enumerable: true,
	
			get: function() {
				return this.options.highGain;
			},
	
			set: function(highGain) {
				if (!Pz.Util.isInRange(highGain, 0, 1))
					return;
	
				this.options.highGain = highGain;
				this.overdrives[3].curve = getDistortionCurve(Pz.Util.normalize(this.highGain, 0, 150));
			}
		}
	});
	
	
	
	return Pizzicato;
})(typeof window !== "undefined" ? window : global);