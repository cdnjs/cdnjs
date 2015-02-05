(function() {

	var version = '0.1.0';

	/**
	 * Adds some support to IE8
	 */
	if (!Event.prototype.preventDefault) {
		Event.prototype.preventDefault = function() {
			this.returnValue=false;
		};
	}

	if (!Object.keys) {
		Object.keys = function(obj) {
			var keys = [];

			for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
					keys.push(i);
				}
			}

			return keys;
		};
	}

	/**
	 * Simple/basic promise style functionality
	 */
	var Promise = this.Promise = function() {
		this.callbacks = [];
		this.state = null;
		this.data = null;
	};
	Promise.prototype.fire = function(type, data) {

		if (typeof type != 'function') {
			this.state = (type == 'success') ? true : false;
		}

		this.callbacks.filter(function(cb) {

			if (typeof type == 'function') {
				return cb.fn == type && !cb.fired;
			}

			return cb.type == type && !cb.fired;

		}).forEach(function(cb) {
			cb.fire(data);
		});

	};
	Promise.prototype.then = function(good, bad) {

		this.callbacks.push(new Promise.Callback(good, 'success'));

		if (bad) {
			this.callbacks.push(new Promise.Callback(bad, 'fail'));
		}

		if (this.state !== null) {
			if (this.state) {
				this.fire(good, this.data);
			} else {
				this.fire(bad, this.data);
			}
		}

	};

	Promise.Callback = function(fn, type) {
		this.fired = false;
		this.fn = fn;
		this.type = type;
	};
	Promise.Callback.prototype.fire = function(data) {
		this.fn(data);
		this.fired = true;
	};
	var Defer = this.Defer = function() {
		this.promise = new Promise();
	};
	Defer.prototype.resolve = function(data) {
		this.promise.data = data;
		this.promise.fire('success', data);
	};
	Defer.prototype.reject = function(error) {
		this.promise.data = data;
		this.promise.fire('fail', error);
	};

	var Result = function(data) {

		this.data = data;

		this.outputs = {};

		Object.keys(this.data).forEach(function(index) {
			this.outputs[index] = new Result.Output(this.data[index]);
		}, this);

	};

	Result.prototype.getOutput = function(outputName) {
		return this.outputs[outputName];
	};

	Result.Output = function(data) {

		this.data = data;

		this.refs = {};

		Object.keys(this.data.output).forEach(function(index) {
			this.refs[index] = this.data.output[index];
		}, this);

	};

	Result.Output.prototype.getLocation = function(refName) {
		return this.refs[refName].location;
	};

	Result.Output.prototype.getWidth = function(refName) {
		return this.refs[refName].info.width;
	};

	Result.Output.prototype.getHeight = function(refName) {
		return this.refs[refName].info.height;
	};

	Result.Output.prototype.getSize = function(refName) {
		return this.refs[refName].info;
	};

	Result.Output.prototype.getBytes = function(refName) {
		return this.refs[refName].info.bytes;
	};

	/**
	 * A response object formatted for an info call
	 */
	Result.Info = function(data) {
		this.data = data.getOutput('info');
	};
	Result.Info.prototype.getWidth = function(refName) {
		return this.data.getWidth(refName);
	};
	Result.Info.prototype.getHeight = function(refName) {
		return this.data.getHeight(refName);
	};
	Result.Info.prototype.getBytes = function(refName) {
		return this.data.getBytes(refName);
	};
	Result.Info.prototype.getSize = function(refName) {
		return this.data.getSize(refName);
	};



	/**
	 * Represents an Output through 6px.
	 *
	 * Outputs are basically images that are created through 6px.  It contains all of
	 * the information needed to build the image.
	 */
	var Output = function(refs) {

	    this.refs = (refs || {});

	    this.type = 'image/png';
	    this.urlLocation = false;
	    this.actions = [];
		this.tagName = '';
	    this.hasFilters = false;
	    this.filters = {};

		this.data = {};
	};

	/**
	 * Every output needs a tag name.  It is what is used to define that image
	 * going forward.
	 *
	 * @method tag
	 * @param  {String} name The string name
	 * @chainable
	 */
	Output.prototype.tag = function(name) {
		this.tagName = name;

		return this;
	};

	/**
	 * Resize an image based off of the size object.
	 *
	 * If you just pass one value (width or height) the omitted value is assumed based on the aspect ratio.
	 *
	 * @method resize
	 * @param  {Object} size [description]
	 * @chainable
	 */
	Output.prototype.resize = function(size) {

	    this.data.resize = px.mergeObject((this.data.resize || {}), size);

	    return this;

	};

	/**
	 * Add some filters to an image
	 *
	 * @method filter
	 * @param  {String} type  The filter name.  For instance: 'sepia'
	 * @param  {Mixed} value  The value or strength that you are looking for.
	 * @chainable
	 */
	Output.prototype.filter = function(type, value) {

	    if (typeof type == 'object' && !(type instanceof Array)) {

	        this.filters = type;

	        this.hasFilters = true;

	        return this;

	    }

	    this.filters[type] = value;

	    this.hasFilters = true;

	    return this;
	};

	/**
	 * The location that we will attempt to save this to.
	 *
	 * The most convenient would be to save simply to 6px's CDN. To do that, just
	 * pass in '6px'.
	 *
	 * @method url
	 * @param  {String} location The location to save this to.
	 * @chainable
	 */
	Output.prototype.url = function(location) {

	    this.urlLocation = location;

	    return this;

	};

	/**
	 * Rotate an image
	 *
	 * @method rotate
	 * @param  {Object} options Pass in degrees.  Pass in the optional background color as `color` (it assumes 'transparent')
	 * @chainable
	 */
	Output.prototype.rotate = function(options) {

	    this.data.rotate = px.mergeObject((this.data.rotate || {}), options);

	    return this;

	};

	/**
	 * Crop the image
	 *
	 * @method crop
	 * @param  {Object} position Contains x, y, width, and height
	 * @chainable
	 */
	Output.prototype.crop = function(position) {

		this.data.crop = px.mergeObject((this.data.crop || {}), position);

	    return this;
	};

	/**
	 * Place one input on top of another.  Watermarking.
	 *
	 * @method layer
	 * @param  {String} refName The name of the input you want to put on top.
	 * @param  {Object} options The options object that contains (all optional): opacity, x, y, width, height
	 * @chainable
	 */
	Output.prototype.layer = function(refName, options) {

	    var action = {
	        method: 'layer',
	        options: {
	            ref: refName
	        }
	    };

	    if (options && typeof options == 'object' && !(options instanceof Array)) {

	        Object.keys(options).forEach(function(index) {
	            action.options[index] = options[index];
	        });

	    }

	    this.actions.push(action);

	    return this;

	};

	/**
	 * The mime type to save this out as
	 *
	 * It assumes 'image/png'.
	 *
	 * @method type
	 * @param  {String} mime The mime type to save as
	 * @chainable
	 */
	Output.prototype.type = function(mime) {

	    this.type = mime;

	    return this;

	};

	/**
	 * Called by the SDK to make sense of all of the data the user inputted.
	 *
	 * @method export
	 * @return {Object}
	 */
	Output.prototype.export = function() {

	    if (this.hasFilters) {

	        this.actions.push({
	            method: 'filter',
	            options: this.filters
	        });

	    }

		Object.keys(this.data).forEach(function(index) {

			var val = this.data[index];

			this.actions.push({
				method: index,
				options: val
			});

		}, this);


	    var output = {
	        ref: this.refs,
	        type: this.type,
			tag: this.tagName,
	        methods: this.actions
	    };

	    if (this.urlLocation) {
	        output.url = this.urlLocation;
	    }

	    return output;

	};


	/**
	 * Constructor
	 */
	var _6px = function(images) {

		// Setting some default values
		this.reset();

		if (images && typeof images == 'object') {
	        Object.keys(images).forEach(function(index) {
	            this.load(index, images[index]);
	        }, this);
	    }

	};

	/**
	 * Load an input.
	 *
	 * Define a name and then where the file is.  Could be a local file or a file
	 * somewhere online.
	 *
	 * @method load
	 * @param {String} name The name we want to give our image.
	 * @param {Mixed}  path The location or the file itself.  Can be a Buffer, relative path, or location on the web.
	 * @chainable
	 */
	_6px.prototype.load = function(name, path) {

	    this.images[name] = path;

	    return this;
	};

	/**
	 * Create a new output.
	 *
	 * Will create an Output object and add it to the list of outputs.
	 *
	 * @method  output
	 * @param   {Object} refs A key/value pair.  Key refers to the ref (input name).  Value is the filename you wish to have.  If false, we will generate one for you.
	 * @returns {Output} An output object
	 */
	_6px.prototype.output = function(refs) {

	    var output = new Output(refs);

	    this.outputs.push(output);

	    return output;
	};

	/**
	* Reset the request
	*
	* @method reset
	*/
	_6px.prototype.reset = function() {
		// Setting some default values
	    this.images = {};
	    this.outputs = [];
	    this.callback = false;
	};

	/**
	 * Set a callback URL for the API to send a POST request to when finished.
	 *
	 * @method callback
	 * @param {String} url The URL to post to
	 * @chainable
	 */
	_6px.prototype.callback = function(url) {

		this.url = url;

		return this;

	};

	/**
	 * Grab an output that has been already defined and tagged.
	 *
	 * @param {String} tag The tag name you want to search for
	 */
	_6px.prototype.getOutputByTagName = function(tag) {

		var relevant = this.outputs.filter(function(out) {
			return out.tagName == tag;
		});

		return (relevant.length > 0) ? relevant[0] : null;
	};

	/**
	* Shortcut for sending an image and just getting the info about it.
	*/
	_6px.prototype.getInfo = function(fn) {

		var d = new Defer();

		var refs = {};
		Object.keys(this.images).forEach(function(index) {
			refs[index] = false;
		});

		this.output(refs)
			.tag('info');

		this.save().then(function(res) {

			var r = new Result.Info(res);

			d.resolve(r);
			if (fn) fn(null, r);

		}, function(err) {

			d.reject(err);
			if (fn) fn(err);

		});

		return d.promise;

	};

	/**
	 * Shortcut for uploading an image to our CDN and returning the location.
	 */
	_6px.prototype.upload = function(fn) {

		var d = new Defer();

		var refs = {};
		Object.keys(this.images).forEach(function(index) {
			refs[index] = false;
		});

		this.output(refs)
			.url('6px')
			.tag('info');

		this.save().then(function(res) {

			var r = new Result.Info(res);

			d.resolve(r);
			if (fn) fn(null, r);

		}, function(err) {

			d.reject(err);
			if (fn) fn(err);

		});

		return d.promise;

	};

	/**
	 * Send the request up to the server for processing.
	 *
	 * Options:
	 * - dryRun: Does not post the request to the server.
	 *
	 * @method save
	 * @param {Object} [options] Some saving options.  Described above.
	 * @param {Function} [fn] Callback function.  Ran whenever we hear back from the API that the request was sent.  Does not mean the job has finished.
	 * @chainable
	 */
	_6px.prototype.save = function(options, fn) {

		var d = new Defer();

		var _this = this;

	    if (typeof options == 'function') {
	        fn = options;
	        options = {};
	    }

	    var inputs = {};

	    var inputTotal = Object.keys(this.images),
	        inputTotalLen = inputTotal.length;

	    var done = function() {

	        var json = {
	            input: inputs,
	            output: _this.outputs.map(function(output) {
	                return output.export();
	            })
	        };

	        if (_this.callback) {

	            json.callback = {
	                url: _this.callback
	            };

	        }

	        px.sendToServer(
				'post',
				'/users/:userId/jobs',
				json,
				function(res) {

					px.once('job.done.'+ res.id, function(e) {

						px.get(res.id, function(job) {

							var r = new Result(job.processed);
							d.resolve(r);

							if (fn) {
								fn.call(_this, null, r);
							}

						});

					});

				},
				function() {

					d.reject('Error sending to server');
					if (fn) {
						fn.call(_this, 'Error sending to server');
					}

				});

	    };

	    // parse the inputs, then run done() when finished.
	    inputTotal.forEach(function(index) {

	        px.parseInput(this.images[index], function(data) {

	            inputs[index] = data;

	            if (!--inputTotalLen) {
	                done();
	            }

	        });

	    }, this);

		return d.promise;

	};

	/**
	 * The main px object and convenience functions.
	 *
	 * Will throw an exception if px.init has not been called.
	 */
	var px = function(input) {

		if (!px.userData) {
			throw '6px: You must call init!';
		}

		return new _6px(input);

	};

	/**
	 * Use this to set up your account with apiKey, etc
	 *
	 * Must be called before any other functions.
	 */
	px.init = function(data) {

		var d = new Defer();

		if (px.userData) {
			throw '6px: Init must only be called once!';
		}

		px.debug = (!!data.debug || false);
        px.dryRun = (!!data.dryRun || false);

		if (!data.apiKey) {
			throw '6px: apiKey is required!';
		}

		if (!data.userId) {
			throw '6px: userId is required!';
		}

		px.userData = data;

		var success = function(res) {
			px.openSocket(d);
			px.log(res);

			px.on('job.update', function(e, jobId, status) {
				if (status == 'complete') {
					px.trigger('job.done.'+ jobId);
				}
			});
		};

		var failed = function(res) {
			px.log('failed:', res);
			px.trigger('error', '');
		};

		px.sendToServer('post', '/users/:userId/auth', null, success, failed);

		return d.promise;
	};

	px.openSocket = function(d) {

		var host = 'ws://socks.6px.io';

		var socket = new WebSocket(host);

		socket.onopen = function() {
			// Send up a simple auth command, which will register our session
			px.sendSocketMsg(socket, { auth: { user_id: px.userData.userId } });
		};

		// ping server to keep socket connection open (closes after 55s)
		setInterval(function() {
			socket.send(JSON.stringify({ ping: true }));
		}, 30000);

		socket.onclose = function() {
			setTimeout(function() {
				px.openSocket();
			}, 1000);
		};

		socket.onmessage = function(msg) {
			px.handleIncoming(msg, d);
		};

	};

	px.sendSocketMsg = function(socket, obj) {
		socket.send(JSON.stringify(obj));
	};

	px.handleIncoming = function(msg, d) {
		var data = JSON.parse(msg.data);

		if (data.auth && data.auth === true) {
			px.trigger('connection');
			d.resolve();
		}

		if (data.job_id && data.status) {
			px.trigger('job.update', data.job_id, data.status);
		}
	};

	/**
	 * Built in events
	 */
	px.on = function(name, fn) {
		window.addEventListener(name, function(e) {
			var args = [e];
			if (e.detail) {
				Object.keys(e.detail).forEach(function(index) {
					args.push(e.detail[index]);
				}, this);
			}
			fn.apply(null, args);
		}, false);
	};

	/**
	 * Just like "on", but it removes the event handler when fired.
	 */
	px.once = function(name, fn) {
		var listener = function(e) {
			var args = [e];
			if (e.detail) {
				Object.keys(e.detail).forEach(function(index) {
					args.push(e.detail[index]);
				}, this);
			}
			fn.apply(null, args);

			window.removeEventListener(name, listener, false);
		};

		window.addEventListener(name, listener, false);
	};

	px.trigger = function(name) {
		var options = Array.prototype.slice.call(arguments, 1);
		if (name == 'error') {
			px.log(options[0], true);
		}
		window.dispatchEvent(new CustomEvent(name, { detail: options }));
	};

	/**
	 * Very simple dropzone creator to help with creating HTML5 file uploads.
	 *
	 * Allows an element on the page to be set up so you can drag a file from your computer
	 * and have it read the file inline.
	 *
	 * @example
	 * 	px.dropZone('#dropzone', { onDrop: function(e) {
	 *		console.log(e.dataTransfer.files);
     *     } });
	 */
	px.dropZone = function(input, options) {

		var elm;

		if (typeof input == 'string') {
			elm = document.querySelector(input);
		} else {
			elm = input;
		}

		if (!elm) {
			px.trigger('error', 'Element is not defined');
			return false;
		}

		var wrapCallbacks = function(e, cb) {
			e.preventDefault();

			if (cb) cb(e);

			return false;
		};

		var dragOver = function(e) {
			return wrapCallbacks(e, options.onDragOver);
		};
		var dragEnd = function(e) {
			return wrapCallbacks(e, options.onDragEnd);
		};
		var dropped = function(e) {
			return wrapCallbacks(e, options.onDrop);
		};

		elm.ondragover = dragOver;
		elm.ondragend = function() { return dragEnd; };
		elm.ondrop = dropped;

	};

	/**
	 * Reads in an input of multiple types for parsing as a DataURI
	 *
	 * If using with dropzone, you should utilize e.dataTransfer
	 * @param {Mixed} input Can be a query string of the element, or the element itself.
	 * @param {Function} fn Runs when the input has been parsed.
	 * @example
	 * 	px.dropZone('#dropzone', {
	 *         onDrop: function(e) {
	 *		      px.parseInput(e.dataTransfer, function(uri) {
	 *			     console.log('data uri:', uri);
	 *			  }
	 *		   }
	 *	   });
	 */
	px.parseInput = function(input, fn) {

		if (typeof input == 'string') {

			fn.call(null, input);
			return;
		}

		if (input instanceof Image) {

			fn.call(null, input.src);

			return;
		}

		if (input.nodeType === 1) {

			if (input.tagName.toLowerCase() == 'img') {
				fn.call(null, input.src);
				return;
			}
		}

		// All else failed... must be a FileAPI upload

		if (window.FormData === undefined) {
			throw '6px: FileAPI not supported with your browser.';
		}

		var f = input.files[0];

		var dataUrlReader = new FileReader();
		dataUrlReader.onloadend = function() {

			fn.call(null, this.result);

		};

		dataUrlReader.readAsDataURL(f);
	};

	/**
	 * Sends our data up to the 6px server
	 *
	 * Basically a wrapper that sends an XHR request to the 6px API server
	 */
	px.sendToServer = function(method, path, json, success, failed) {

		var user = px.userData;

		path = path.replace(":userId", user.userId); // make life easier, eh?

		var url = 'https://api.6px.io/v1'+ path + (/\?/.test(url) ? '&' : '?') + 'key='+ user.apiKey;
		// var url = 'http://localhost:3000/v1'+ path + (/\?/.test(url) ? '&' : '?') + 'key='+ user.apiKey;

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState < 4)
				return;

			if (xhr.status !== 200)
				return failed.call(window, JSON.parse(xhr.responseText));

			if (xhr.readyState === 4)
				success.call(null, JSON.parse(xhr.responseText));
		};

		xhr.open(method.toUpperCase(), url, true);
		if (json) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(json));
		} else {
			xhr.send();
		}

	};

	/**
	 * Wrapper for a console log.  Only shows if console.log is available and debug is enabled.
	 */
	px.log = function(msg, err) {
		if (px.debug && console && console.log) {
			if (err) {
				console.error('6px:', msg);
			} else {
				console.log('6px:', msg);
			}
		}
	};

	px.get = function(jobId, cb, binding) {

		px.sendToServer('get', '/users/:userId/jobs/'+ jobId, false,
			function success(res) {
				cb.call((binding || window), res);
			},

			function failedr(res) {
				cb.call((binding || window), res);
			}
		);

	};

	/**
	 * Utility to merge two objects together and return the result as a new object.
	 *
	 * @param {Object} obj1 [description]
	 * @param {[type]} obj2 [description]
	 */
	px.mergeObject = function(obj1, obj2) {

		var obj3 = {};

		Object.keys(obj1).forEach(function(index) {
			obj3[index] = obj1[index];
		});

		Object.keys(obj2).forEach(function(index) {
			obj3[index] = obj2[index];
		});

		return obj3;

	};

	px.version = version;
	window.px = px;

})();
