/**
 * @name    simple-gallery-js
 * @version 1.0.2 | July 25th 2016
 * @author  Fabio Carvalho
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SimpleGallery = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.polyfills = mod.exports;
  }
})(this, function () {
  'use strict';

  Element.prototype.is = function (elementSelector) {
    switch (elementSelector[0]) {
      case '.':
        var er = new RegExp(elementSelector.replace('.', ''));
        return this.className.match(er);
        break;
      case '#':
        return this.getAttribute('id') === elementSelector.replace('#', '');
        break;
      default:
        return this.tagName === elementSelector.toUpperCase();
        break;
    }
  };

  Element.prototype.delegate = function (eventName, elementSelector, cb) {
    var $this = this;

    $this.addEventListener(eventName, function (evt) {
      var $this = evt.target;

      if ($this.is(elementSelector)) {
        cb.call($this, evt);
      }
      if ($this.parentNode.is(elementSelector)) {
        cb.call($this.parentNode, evt);
      }
    });
  };

  Array.prototype.swap = function (a, b) {
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
  };
});

},{}],2:[function(require,module,exports){
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['module', './polyfills'], factory);
	} else if (typeof exports !== "undefined") {
		factory(module, require('./polyfills'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, global.polyfills);
		global.simpleGallery = mod.exports;
	}
})(this, function (module) {
	'use strict';

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var SimpleGallery = function () {
		function SimpleGallery(form) {
			var name = arguments.length <= 1 || arguments[1] === undefined ? 'gallery' : arguments[1];
			var container = arguments.length <= 2 || arguments[2] === undefined ? '.gallery-container' : arguments[2];

			_classCallCheck(this, SimpleGallery);

			this.form = document.querySelector(form);
			this.input = this.form.querySelector('input[name="' + name + '"]');

			// Initers
			this.initDOM(container);
			this.initGallery();
			this.initSortable();

			// Listeners
			this.eventListeners();
		}

		SimpleGallery.prototype.initDOM = function initDOM(container) {
			this.form.querySelector(container).innerHTML += '\n\t\t\t<div class="gallery">\n\t\t\t\t<div class="gallery-items"></div>\n\t\t\t\t<div class="loading">\n\t\t\t\t\t<span class="bar"></span>\n\t\t\t\t</div>\n\t\t\t</div>';
		};

		SimpleGallery.prototype.initGallery = function initGallery() {
			var _this2 = this;

			if (!this.input.value) return;

			var gallery = JSON.parse(this.input.value);

			if (gallery.lenght == 0) return;

			var html = gallery.reduce(function (html, image) {
				return html += _this2.generateDOM(image);
			}, '');

			this.form.querySelector('.gallery-items').innerHTML = html;
		};

		SimpleGallery.prototype.initSortable = function initSortable() {
			var _this3 = this;

			var container = this.form.querySelector('.gallery-items');
			Sortable.create(container, {
				animation: 150,
				onUpdate: function onUpdate(e) {
					var gallery = JSON.parse(_this3.input.value);
					var oldIndex = e.oldIndex;
					var newIndex = e.newIndex;

					gallery.swap(oldIndex, newIndex);

					_this3.input.value = JSON.stringify(gallery);
				}
			});
		};

		SimpleGallery.prototype.eventListeners = function eventListeners() {
			this.form.querySelector('.upload').addEventListener('change', this.addItem.bind(this));
			this.form.querySelector('.gallery').delegate('click', '.remove', this.removeItem.bind(this));
			this.form.querySelector('.gallery').delegate('change', '.title', this.changeTitle.bind(this));
		};

		SimpleGallery.prototype.addItem = function addItem(e) {
			e.preventDefault();
			var files = e.target.files;
			var data = new FormData();

			for (var i in files) {
				if (files.hasOwnProperty(i)) {
					data.append('gallery[]', files[i]);
				}
			}

			this.request(data);
		};

		SimpleGallery.prototype.request = function request(data) {
			var _this = this;
			var xhttp = new XMLHttpRequest();
			var custom = this.form.getAttribute('data-action-gallery');
			var action = custom ? custom : this.form.action;
			var gallery = this.form.querySelector('.gallery');

			gallery.classList.add('loading-active');

			xhttp.onreadystatechange = function () {
				if (xhttp.readyState == 4) {
					gallery.classList.remove('loading-active');
					if (xhttp.status == 200) {
						_this.addImages(xhttp.responseText);
					}
				}
			};

			xhttp.upload.addEventListener('progress', function (e) {
				var loading = _this.form.querySelector('.loading .bar');
				loading.style.width = Math.ceil(e.loaded / e.total * 100) + '%';
			}, false);

			xhttp.open('POST', action, true);
			xhttp.send(data);
		};

		SimpleGallery.prototype.addImages = function addImages(data) {
			var images = JSON.parse(data);
			var gallery = this.input.value != '' ? JSON.parse(this.input.value) : [];

			images.map(function (image) {
				image.title = 'No description.';
				gallery.push(image);
			});

			this.saveGallery(gallery);
		};

		SimpleGallery.prototype.removeItem = function removeItem(e) {
			e.preventDefault();
			var gallery = JSON.parse(this.input.value);
			var item = e.target.parentElement;
			var url = item.children[0].src;

			gallery.forEach(function (item, i) {
				if (item.url != url) return;
				gallery.splice(i, 1);
			});

			this.saveGallery(gallery);
		};

		SimpleGallery.prototype.saveGallery = function saveGallery(gallery) {
			var _this4 = this;

			var html = gallery.reduce(function (html, image) {
				return html += _this4.generateDOM(image);
			}, '');
			this.input.value = JSON.stringify(gallery);
			this.form.querySelector('.gallery-items').innerHTML = html;
		};

		SimpleGallery.prototype.changeTitle = function changeTitle(e) {
			var gallery = JSON.parse(this.input.value);
			var item = e.target.parentElement;
			var url = item.children[0].src;

			gallery.forEach(function (item, i) {
				if (item.url != url) return;
				gallery[i]['title'] = e.target.value;
			});

			this.input.value = JSON.stringify(gallery);
		};

		SimpleGallery.prototype.generateDOM = function generateDOM(image) {
			return '\n\t\t\t<div class="gallery-item">\n\t\t\t\t<img src=\'' + image.url + '\' alt=\'' + image.title + '\' />\n\t\t\t\t<input class="title" name="title" value="' + image.title + '" />\n\t\t\t\t<button class=\'remove\'>×</button>\n\t\t\t</div>\n\t\t';
		};

		return SimpleGallery;
	}();

	module.exports = SimpleGallery;
});

},{"./polyfills":1}]},{},[2])(2)
});