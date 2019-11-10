/*
 * QRious v2.0.0
 * Copyright (C) 2016 Alasdair Mercer
 * Copyright (C) 2010 Tom Zerucha
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('qrious', factory) :
  (global.QRious = factory());
}(this, function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /*
   * QRious
   * Copyright (C) 2016 Alasdair Mercer
   * Copyright (C) 2010 Tom Zerucha
   *
   * This program is free software: you can redistribute it and/or modify
   * it under the terms of the GNU General Public License as published by
   * the Free Software Foundation, either version 3 of the License, or
   * (at your option) any later version.
   *
   * This program is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   * GNU General Public License for more details.
   *
   * You should have received a copy of the GNU General Public License
   * along with this program.  If not, see <http://www.gnu.org/licenses/>.
   */

  /**
   * Contains utility methods that are useful throughout the library.
   *
   * @public
   */

  var Utilities = function () {
    function Utilities() {
      classCallCheck(this, Utilities);
    }

    createClass(Utilities, null, [{
      key: 'privatize',


      /**
       * Copies all properties from the <code>source</code> object to the <code>target</code> object, however, all property
       * names on the <code>target</code> will be prefixed with an underscore, used to indicate that they are private.
       *
       * @param {Object} target - the object to which the private fields are to be copied
       * @param {Object} source - the object from which the fields are to be copied
       * @return {Object} A reference to the <code>target</code> object.
       * @public
       * @static
       */
      value: function privatize(target, source) {
        for (var key in source) {
          if (source.hasOwnProperty(key)) {
            target['_' + key] = source[key];
          }
        }

        return target;
      }

      /**
       * Sets the specified <code>value</code> on a given field on the <code>object</code> provided.
       *
       * If <code>value</code> is <code>null</code>, the specified default value will be used instead.
       *
       * An optional <code>transformer</code> can be specified which will be used to transform the value (or default value)
       * before it is assigned to the field.
       *
       * @param {Object} object - the object whose field is to be set with <code>value</code>
       * @param {String} fieldName - the field to be set with <code>value</code>
       * @param {*} value - the value to be set on the named field
       * @param {*} [defaultValue] - the value to be used if <code>value</code> is <code>null</code>
       * @param {Function} [transformer] - a function used to transform the value before it is assigned to the named field
       * @return {Boolean} <code>true</code> if the value of the field has changed as a result of the assignment; otherwise
       * <code>false</code>.
       * @public
       * @static
       */

    }, {
      key: 'setter',
      value: function setter(object, fieldName, value, defaultValue, transformer) {
        var oldValue = object[fieldName];
        var newValue = value != null ? value : defaultValue;
        if (typeof transformer === 'function') {
          newValue = transformer(newValue);
        }

        object[fieldName] = newValue;

        return newValue !== oldValue;
      }

      /**
       * Throws an error indicating that the a given method on a specific class has not been implemented.
       *
       * @param {String} className - the name of the class on which the method has not been implemented
       * @param {String} methodName - the name of the method which has not been implemented
       * @throws {Error} The error describing the class method which has not been implemented.
       * @public
       * @static
       */

    }, {
      key: 'throwUnimplemented',
      value: function throwUnimplemented(className, methodName) {
        throw new Error('"' + methodName + '" method must be implemented on the ' + className + ' class');
      }

      /**
       * Transforms the specified <code>string</code> to upper case while remaining null-safe.
       *
       * @param {String} string - the string to be transformed to upper case
       * @return {String} <code>string</code> transformed to upper case if <code>string</code> is not <code>null</code>.
       * @public
       * @static
       */

    }, {
      key: 'toUpperCase',
      value: function toUpperCase(string) {
        return string != null && string.toUpperCase();
      }
    }]);
    return Utilities;
  }();

  /**
   * Defines a service contract that must be met by all implementations.
   *
   * @public
   */

  var Service = function () {
    function Service() {
      classCallCheck(this, Service);
    }

    createClass(Service, [{
      key: 'getName',


      /**
       * Returns the name of this {@link Service}.
       *
       * @return {String} The service name.
       * @public
       */
      value: function getName() {
        Utilities.throwUnimplemented('Service', 'getName');
      }
    }]);
    return Service;
  }();

  /**
   * A service for working with elements.
   *
   * @public
   * @extends Service
   */

  var ElementService = function (_Service) {
    inherits(ElementService, _Service);

    function ElementService() {
      classCallCheck(this, ElementService);
      return possibleConstructorReturn(this, Object.getPrototypeOf(ElementService).apply(this, arguments));
    }

    createClass(ElementService, [{
      key: 'createCanvas',


      /**
       * Creates an instance of a canvas element.
       *
       * @return {*} The newly created canvas element.
       * @public
       */
      value: function createCanvas() {
        Utilities.throwUnimplemented('ElementService', 'createCanvas');
      }

      /**
       * Creates an instance of a image element.
       *
       * @return {*} The newly created image element.
       * @public
       */

    }, {
      key: 'createImage',
      value: function createImage() {
        Utilities.throwUnimplemented('ElementService', 'createImage');
      }

      /**
       * @override
       */

    }, {
      key: 'getName',
      value: function getName() {
        return 'element';
      }

      /**
       * Returns whether the specified <code>element</code> is a canvas.
       *
       * @param {*} element - the element to be checked
       * @return {Boolean} <code>true</code> if <code>element</code> is a canvas; otherwise <code>false</code>.
       * @public
       */

    }, {
      key: 'isCanvas',
      value: function isCanvas(element) {
        Utilities.throwUnimplemented('ElementService', 'isCanvas');
      }

      /**
       * Returns whether the specified <code>element</code> is an image.
       *
       * @param {*} element - the element to be checked
       * @return {Boolean} <code>true</code> if <code>element</code> is an image; otherwise <code>false</code>.
       * @public
       */

    }, {
      key: 'isImage',
      value: function isImage(element) {
        Utilities.throwUnimplemented('ElementService', 'isImage');
      }
    }]);
    return ElementService;
  }(Service);

  /**
   * An implementation of {@link ElementService} intended for use within a browser environment.
   *
   * @public
   * @extends ElementService
   */

  var BrowserElementService = function (_ElementService) {
    inherits(BrowserElementService, _ElementService);

    function BrowserElementService() {
      classCallCheck(this, BrowserElementService);
      return possibleConstructorReturn(this, Object.getPrototypeOf(BrowserElementService).apply(this, arguments));
    }

    createClass(BrowserElementService, [{
      key: 'createCanvas',


      /**
       * @override
       */
      value: function createCanvas() {
        return document.createElement('canvas');
      }

      /**
       * @override
       */

    }, {
      key: 'createImage',
      value: function createImage() {
        return document.createElement('img');
      }

      /**
       * @override
       */

    }, {
      key: 'isCanvas',
      value: function isCanvas(element) {
        return element instanceof HTMLCanvasElement;
      }

      /**
       * @override
       */

    }, {
      key: 'isImage',
      value: function isImage(element) {
        return element instanceof HTMLImageElement;
      }
    }]);
    return BrowserElementService;
  }(ElementService);

  /**
   * Responsible for rendering a QR code {@link Frame} on a specific type of element.
   *
   * A renderer may be dependant on the rendering of another element, so ordering of their execution is important.
   *
   * @public
   */

  var Renderer = function () {

    /**
     * Creates a new instance of {@link Renderer} for the <code>qrious</code> instance provided.
     *
     * @param {QRious} qrious - the {@link QRious} instance to be used
     * @public
     */

    function Renderer(qrious) {
      classCallCheck(this, Renderer);

      /**
       * The {@link QRious} instance.
       *
       * @protected
       * @type {QRious}
       */
      this.qrious = qrious;
    }

    /**
     * Draws the specified QR code <code>frame</code> on the underlying element.
     *
     * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
     *
     * @param {Frame} frame - the {@link Frame} to be drawn
     * @protected
     */


    createClass(Renderer, [{
      key: 'draw',
      value: function draw(frame) {
        Utilities.throwUnimplemented('Renderer', 'draw');
      }

      /**
       * Calculates the size (in pixel units) to represent an individual module within the QR code based on the
       * <code>frame</code> provided.
       *
       * The returned value will be at least one, even in cases where the size of the QR code does not fit its contents.
       * This is done so that the inevitable clipping is handled more gracefully since this way at least something is
       * displayed instead of just a blank space filled by the background color.
       *
       * @param {Frame} frame - the {@link Frame} from which the module size is to be derived
       * @return {Number} The pixel size for each module in the QR code which will be no less than one.
       * @protected
       */

    }, {
      key: 'getModuleSize',
      value: function getModuleSize(frame) {
        var pixels = Math.floor(this.qrious.size / frame.width);

        return Math.max(1, pixels);
      }

      /**
       * Calculates the offset/padding (in pixel units) to be inserted before the QR code based on the <code>frame</code>
       * provided.
       *
       * The returned value will be zero if there is no available offset or if the size of the QR code does not fit its
       * contents. It will never be a negative value. This is done so that the inevitable clipping appears more naturally
       * and it is not clipped from all directions.
       *
       * @param {Frame} frame - the {@link Frame} from which the offset is to be derived
       * @return {Number} The pixel offset for the QR code which will be no less than zero.
       * @protected
       */

    }, {
      key: 'getOffset',
      value: function getOffset(frame) {
        var moduleSize = this.getModuleSize(frame);
        var offset = Math.floor((this.qrious.size - moduleSize * frame.width) / 2);

        return Math.max(0, offset);
      }

      /**
       * Renders a QR code on the underlying element based on the <code>frame</code> provided.
       *
       * @param {Frame} frame - the {@link Frame} to be rendered
       * @public
       */

    }, {
      key: 'render',
      value: function render(frame) {
        this.resize();
        this.reset();
        this.draw(frame);
      }

      /**
       * Resets the underlying element, effectively clearing any previously rendered QR code.
       *
       * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
       *
       * @protected
       */

    }, {
      key: 'reset',
      value: function reset() {
        Utilities.throwUnimplemented('Renderer', 'reset');
      }

      /**
       * Ensures that the size of the underlying element matches that defined on the associated {@link QRious} instance.
       *
       * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
       *
       * @protected
       */

    }, {
      key: 'resize',
      value: function resize() {
        Utilities.throwUnimplemented('Renderer', 'resize');
      }
    }]);
    return Renderer;
  }();

  /**
   * An implementation of {@link Renderer} for working with <code>canvas</code> elements.
   *
   * @public
   * @extends Renderer
   */

  var CanvasRenderer = function (_Renderer) {
    inherits(CanvasRenderer, _Renderer);

    function CanvasRenderer() {
      classCallCheck(this, CanvasRenderer);
      return possibleConstructorReturn(this, Object.getPrototypeOf(CanvasRenderer).apply(this, arguments));
    }

    createClass(CanvasRenderer, [{
      key: 'draw',


      /**
       * @override
       */
      value: function draw(frame) {
        var qrious = this.qrious;
        var moduleSize = this.getModuleSize(frame);
        var offset = this.getOffset(frame);
        var context = qrious.canvas.getContext('2d');

        context.fillStyle = qrious.foreground;

        for (var i = 0; i < frame.width; i++) {
          for (var j = 0; j < frame.width; j++) {
            if (frame.buffer[j * frame.width + i]) {
              context.fillRect(moduleSize * i + offset, moduleSize * j + offset, moduleSize, moduleSize);
            }
          }
        }
      }

      /**
       * @override
       */

    }, {
      key: 'reset',
      value: function reset() {
        var qrious = this.qrious;
        var context = qrious.canvas.getContext('2d');

        context.lineWidth = 1;
        context.clearRect(0, 0, qrious.size, qrious.size);
        context.fillStyle = qrious.background;
        context.fillRect(0, 0, qrious.size, qrious.size);
      }

      /**
       * @override
       */

    }, {
      key: 'resize',
      value: function resize() {
        var qrious = this.qrious;
        var canvas = qrious.canvas;

        canvas.width = qrious.size;
        canvas.height = qrious.size;
      }
    }]);
    return CanvasRenderer;
  }(Renderer);

  /*
   * QRious
   * Copyright (C) 2016 Alasdair Mercer
   * Copyright (C) 2010 Tom Zerucha
   *
   * This program is free software: you can redistribute it and/or modify
   * it under the terms of the GNU General Public License as published by
   * the Free Software Foundation, either version 3 of the License, or
   * (at your option) any later version.
   *
   * This program is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   * GNU General Public License for more details.
   *
   * You should have received a copy of the GNU General Public License
   * along with this program.  If not, see <http://www.gnu.org/licenses/>.
   */

  /* eslint no-multi-spaces: 0 */

  /**
   * Contains alignment pattern information.
   *
   * @public
   */

  var Alignment = function () {
    function Alignment() {
      classCallCheck(this, Alignment);
    }

    createClass(Alignment, null, [{
      key: "BLOCK",


      /**
       * Returns the alignment pattern block.
       *
       * @return {Number[]} The alignment pattern block.
       * @public
       * @static
       */
      get: function get() {
        return [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28];
      }
    }]);
    return Alignment;
  }();

  /*
   * QRious
   * Copyright (C) 2016 Alasdair Mercer
   * Copyright (C) 2010 Tom Zerucha
   *
   * This program is free software: you can redistribute it and/or modify
   * it under the terms of the GNU General Public License as published by
   * the Free Software Foundation, either version 3 of the License, or
   * (at your option) any later version.
   *
   * This program is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   * GNU General Public License for more details.
   *
   * You should have received a copy of the GNU General Public License
   * along with this program.  If not, see <http://www.gnu.org/licenses/>.
   */

  /* eslint no-multi-spaces: 0 */

  /**
   * Contains error correction information.
   *
   * @public
   */

  var ErrorCorrection = function () {
    function ErrorCorrection() {
      classCallCheck(this, ErrorCorrection);
    }

    createClass(ErrorCorrection, null, [{
      key: "BLOCKS",


      /**
       * Returns the error correction blocks.
       *
       * There are four elements per version. The first two indicate the number of blocks, then the data width, and finally
       * the ECC width.
       *
       * @return {Number[]} The ECC blocks.
       * @public
       * @static
       */
      get: function get() {
        return [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30];
      }

      /**
       * Returns the final format bits with mask (level << 3 | mask).
       *
       * @return {Number[]} The final format bits.
       * @public
       * @static
       */

    }, {
      key: "FINAL_FORMAT",
      get: function get() {
        return [
        // L
        0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
        // M
        0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0,
        // Q
        0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed,
        // H
        0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b];
      }

      /**
       * Returns a map of human-readable ECC levels.
       *
       * @return {Object<String, Number>} A ECC level mapping.
       * @public
       * @static
       */

    }, {
      key: "LEVELS",
      get: function get() {
        return {
          L: 1,
          M: 2,
          Q: 3,
          H: 4
        };
      }
    }]);
    return ErrorCorrection;
  }();

  /*
   * QRious
   * Copyright (C) 2016 Alasdair Mercer
   * Copyright (C) 2010 Tom Zerucha
   *
   * This program is free software: you can redistribute it and/or modify
   * it under the terms of the GNU General Public License as published by
   * the Free Software Foundation, either version 3 of the License, or
   * (at your option) any later version.
   *
   * This program is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   * GNU General Public License for more details.
   *
   * You should have received a copy of the GNU General Public License
   * along with this program.  If not, see <http://www.gnu.org/licenses/>.
   */

  /**
   * Contains Galois field information.
   *
   * @public
   */

  var Galois = function () {
    function Galois() {
      classCallCheck(this, Galois);
    }

    createClass(Galois, null, [{
      key: "EXPONENT",


      /**
       * Returns the Galois field exponent table.
       *
       * @return {Number[]} The Galois field exponent table.
       * @public
       * @static
       */
      get: function get() {
        return [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26, 0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0, 0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23, 0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1, 0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0, 0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2, 0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce, 0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc, 0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54, 0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73, 0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff, 0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41, 0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6, 0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09, 0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16, 0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00];
      }

      /**
       * Returns the Galois field log table.
       *
       * @return {Number[]} The Galois field log table.
       * @public
       * @static
       */

    }, {
      key: "LOG",
      get: function get() {
        return [0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b, 0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71, 0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45, 0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6, 0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88, 0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40, 0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d, 0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57, 0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18, 0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e, 0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61, 0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2, 0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6, 0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a, 0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7, 0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf];
      }
    }]);
    return Galois;
  }();

  /*
   * QRious
   * Copyright (C) 2016 Alasdair Mercer
   * Copyright (C) 2010 Tom Zerucha
   *
   * This program is free software: you can redistribute it and/or modify
   * it under the terms of the GNU General Public License as published by
   * the Free Software Foundation, either version 3 of the License, or
   * (at your option) any later version.
   *
   * This program is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   * GNU General Public License for more details.
   *
   * You should have received a copy of the GNU General Public License
   * along with this program.  If not, see <http://www.gnu.org/licenses/>.
   */

  /**
   * Contains version pattern information.
   *
   * @public
   */

  var Version = function () {
    function Version() {
      classCallCheck(this, Version);
    }

    createClass(Version, null, [{
      key: "BLOCK",


      /**
       * Returns the version pattern block.
       *
       * @return {Number[]} The version pattern block.
       * @public
       * @static
       */
      get: function get() {
        return [0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d, 0x928, 0xb78, 0x45d, 0xa17, 0x532, 0x9a6, 0x683, 0x8c9, 0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75, 0x250, 0x9d5, 0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64, 0x541, 0xc69];
      }
    }]);
    return Version;
  }();

  /**
   * Generates information for a QR code frame based on a specific value to be encoded.
   *
   * @public
   */

  var Frame = function () {
    createClass(Frame, null, [{
      key: '_createArray',
      value: function _createArray(length) {
        var array = [];

        for (var i = 0; i < length; i++) {
          array[i] = 0;
        }

        return array;
      }
    }, {
      key: '_getMaskBit',
      value: function _getMaskBit(x, y) {
        var bit = void 0;

        if (x > y) {
          bit = x;
          x = y;
          y = bit;
        }

        bit = y;
        bit += y * y;
        bit >>= 1;
        bit += x;

        return bit;
      }
    }, {
      key: '_modN',
      value: function _modN(x) {
        while (x >= 255) {
          x -= 255;
          x = (x >> 8) + (x & 255);
        }

        return x;
      }

      // *Badness* coefficients.

    }, {
      key: 'N1',
      get: function get() {
        return 3;
      }
    }, {
      key: 'N2',
      get: function get() {
        return 3;
      }
    }, {
      key: 'N3',
      get: function get() {
        return 40;
      }
    }, {
      key: 'N4',
      get: function get() {
        return 10;
      }

      /**
       * Creates an instance of {@link Frame} based on the <code>options</code> provided.
       *
       * @param {Frame~Options} options - the options to be used
       * @public
       */

    }]);

    function Frame(options) {
      classCallCheck(this, Frame);

      this._badness = [];
      this._level = ErrorCorrection.LEVELS[options.level];
      this._polynomial = [];
      this._value = options.value;
      this._valueLength = this._value.length;
      this._version = 0;
      this._stringBuffer = this._value.slice(0);

      var dataBlock = void 0;
      var eccBlock = void 0;
      var neccBlock1 = void 0;
      var neccBlock2 = void 0;

      while (this._version < 40) {
        this._version++;

        var index = (this._level - 1) * 4 + (this._version - 1) * 16;

        neccBlock1 = ErrorCorrection.BLOCKS[index++];
        neccBlock2 = ErrorCorrection.BLOCKS[index++];
        dataBlock = ErrorCorrection.BLOCKS[index++];
        eccBlock = ErrorCorrection.BLOCKS[index];

        index = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2 - 3 + (this._version <= 9);

        if (this._valueLength <= index) {
          break;
        }
      }

      this._dataBlock = dataBlock;
      this._eccBlock = eccBlock;
      this._neccBlock1 = neccBlock1;
      this._neccBlock2 = neccBlock2;

      /**
       * The data width is based on version.
       *
       * @public
       * @type {Number}
       */
      // FIXME: Ensure that it fits instead of being truncated.
      this.width = 17 + 4 * this._version;

      /**
       * The image buffer.
       *
       * @public
       * @type {Number[]}
       */
      this.buffer = Frame._createArray(this.width * this.width);

      this._ecc = Frame._createArray(this._dataBlock + (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2);
      this._mask = Frame._createArray((this.width * (this.width + 1) + 1) / 2);

      this._insertFinders();
      this._insertAlignments();

      // Insert single foreground cell.
      this.buffer[8 + this.width * (this.width - 8)] = 1;

      this._insertTimingGap();
      this._reverseMask();
      this._insertTimingRowAndColumn();
      this._insertVersion();
      this._syncMask();
      this._convertBitStream(this._stringBuffer.length);
      this._calculatePolynomial();
      this._appendEccToData();
      this._interleaveBlocks();
      this._pack();
      this._finish();
    }

    createClass(Frame, [{
      key: '_addAlignment',
      value: function _addAlignment(x, y) {
        this.buffer[x + this.width * y] = 1;

        for (var i = -2; i < 2; i++) {
          this.buffer[x + i + this.width * (y - 2)] = 1;
          this.buffer[x - 2 + this.width * (y + i + 1)] = 1;
          this.buffer[x + 2 + this.width * (y + i)] = 1;
          this.buffer[x + i + 1 + this.width * (y + 2)] = 1;
        }

        for (var _i = 0; _i < 2; _i++) {
          this._setMask(x - 1, y + _i);
          this._setMask(x + 1, y - _i);
          this._setMask(x - _i, y - 1);
          this._setMask(x + _i, y + 1);
        }
      }
    }, {
      key: '_appendData',
      value: function _appendData(data, dataLength, ecc, eccLength) {
        for (var i = 0; i < eccLength; i++) {
          this._stringBuffer[ecc + i] = 0;
        }

        for (var _i2 = 0; _i2 < dataLength; _i2++) {
          var bit = Galois.LOG[this._stringBuffer[data + _i2] ^ this._stringBuffer[ecc]];

          if (bit !== 255) {
            for (var j = 1; j < eccLength; j++) {
              this._stringBuffer[ecc + j - 1] = this._stringBuffer[ecc + j] ^ Galois.EXPONENT[Frame._modN(bit + this._polynomial[eccLength - j])];
            }
          } else {
            for (var _j = ecc; _j < ecc + eccLength; _j++) {
              this._stringBuffer[_j] = this._stringBuffer[_j + 1];
            }
          }

          this._stringBuffer[ecc + eccLength - 1] = bit === 255 ? 0 : Galois.EXPONENT[Frame._modN(bit + this._polynomial[0])];
        }
      }
    }, {
      key: '_appendEccToData',
      value: function _appendEccToData() {
        var data = 0;
        var ecc = this._calculateMaxLength();

        for (var i = 0; i < this._neccBlock1; i++) {
          this._appendData(data, this._dataBlock, ecc, this._eccBlock);

          data += this._dataBlock;
          ecc += this._eccBlock;
        }

        for (var _i3 = 0; _i3 < this._neccBlock2; _i3++) {
          this._appendData(data, this._dataBlock + 1, ecc, this._eccBlock);

          data += this._dataBlock + 1;
          ecc += this._eccBlock;
        }
      }
    }, {
      key: '_applyMask',
      value: function _applyMask(mask) {
        var width = this.width;

        switch (mask) {
          case 0:
            for (var y = 0; y < width; y++) {
              for (var x = 0; x < width; x++) {
                if (!(x + y & 1) && !this._isMasked(x, y)) {
                  this.buffer[x + y * width] ^= 1;
                }
              }
            }

            break;
          case 1:
            for (var _y = 0; _y < width; _y++) {
              for (var _x = 0; _x < width; _x++) {
                if (!(_y & 1) && !this._isMasked(_x, _y)) {
                  this.buffer[_x + _y * width] ^= 1;
                }
              }
            }

            break;
          case 2:
            for (var _y2 = 0; _y2 < width; _y2++) {
              for (var r3x = 0, _x2 = 0; _x2 < width; _x2++, r3x++) {
                if (r3x === 3) {
                  r3x = 0;
                }

                if (!r3x && !this._isMasked(_x2, _y2)) {
                  this.buffer[_x2 + _y2 * width] ^= 1;
                }
              }
            }

            break;
          case 3:
            for (var r3y = 0, _y3 = 0; _y3 < width; _y3++, r3y++) {
              if (r3y === 3) {
                r3y = 0;
              }

              for (var _r3x = r3y, _x3 = 0; _x3 < width; _x3++, _r3x++) {
                if (_r3x === 3) {
                  _r3x = 0;
                }

                if (!_r3x && !this._isMasked(_x3, _y3)) {
                  this.buffer[_x3 + _y3 * width] ^= 1;
                }
              }
            }

            break;
          case 4:
            for (var _y4 = 0; _y4 < width; _y4++) {
              for (var _r3x2 = 0, _r3y = _y4 >> 1 & 1, _x4 = 0; _x4 < width; _x4++, _r3x2++) {
                if (_r3x2 === 3) {
                  _r3x2 = 0;
                  _r3y = !_r3y;
                }

                if (!_r3y && !this._isMasked(_x4, _y4)) {
                  this.buffer[_x4 + _y4 * width] ^= 1;
                }
              }
            }

            break;
          case 5:
            for (var _r3y2 = 0, _y5 = 0; _y5 < width; _y5++, _r3y2++) {
              if (_r3y2 === 3) {
                _r3y2 = 0;
              }

              for (var _r3x3 = 0, _x5 = 0; _x5 < width; _x5++, _r3x3++) {
                if (_r3x3 === 3) {
                  _r3x3 = 0;
                }

                if (!((_x5 & _y5 & 1) + !(!_r3x3 | !_r3y2)) && !this._isMasked(_x5, _y5)) {
                  this.buffer[_x5 + _y5 * width] ^= 1;
                }
              }
            }

            break;
          case 6:
            for (var _r3y3 = 0, _y6 = 0; _y6 < width; _y6++, _r3y3++) {
              if (_r3y3 === 3) {
                _r3y3 = 0;
              }

              for (var _r3x4 = 0, _x6 = 0; _x6 < width; _x6++, _r3x4++) {
                if (_r3x4 === 3) {
                  _r3x4 = 0;
                }

                if (!(_x6 & _y6 & 1 + (_r3x4 && _r3x4 === _r3y3) & 1) && !this._isMasked(_x6, _y6)) {
                  this.buffer[_x6 + _y6 * width] ^= 1;
                }
              }
            }

            break;
          case 7:
            for (var _r3y4 = 0, _y7 = 0; _y7 < width; _y7++, _r3y4++) {
              if (_r3y4 === 3) {
                _r3y4 = 0;
              }

              for (var _r3x5 = 0, _x7 = 0; _x7 < width; _x7++, _r3x5++) {
                if (_r3x5 === 3) {
                  _r3x5 = 0;
                }

                if (!((_r3x5 && _r3x5 === _r3y4) + (_x7 + _y7 & 1) & 1) && !this._isMasked(_x7, _y7)) {
                  this.buffer[_x7 + _y7 * width] ^= 1;
                }
              }
            }

            break;
        }
      }
    }, {
      key: '_calculateMaxLength',
      value: function _calculateMaxLength() {
        return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
      }
    }, {
      key: '_calculatePolynomial',
      value: function _calculatePolynomial() {
        this._polynomial[0] = 1;

        for (var i = 0; i < this._eccBlock; i++) {
          this._polynomial[i + 1] = 1;

          for (var j = i; j > 0; j--) {
            this._polynomial[j] = this._polynomial[j] ? this._polynomial[j - 1] ^ Galois.EXPONENT[Frame._modN(Galois.LOG[this._polynomial[j]] + i)] : this._polynomial[j - 1];
          }

          this._polynomial[0] = Galois.EXPONENT[Frame._modN(Galois.LOG[this._polynomial[0]] + i)];
        }

        // Use logs for generator polynomial to save calculation step.
        for (var _i4 = 0; _i4 <= this._eccBlock; _i4++) {
          this._polynomial[_i4] = Galois.LOG[this._polynomial[_i4]];
        }
      }
    }, {
      key: '_checkBadness',
      value: function _checkBadness() {
        var bad = 0;
        var width = this.width;

        // Blocks of same colour.
        for (var y = 0; y < width - 1; y++) {
          for (var x = 0; x < width - 1; x++) {
            // All foreground colour.
            if (this.buffer[x + width * y] && this.buffer[x + 1 + width * y] && this.buffer[x + width * (y + 1)] && this.buffer[x + 1 + width * (y + 1)] ||
            // All background colour.
            !(this.buffer[x + width * y] || this.buffer[x + 1 + width * y] || this.buffer[x + width * (y + 1)] || this.buffer[x + 1 + width * (y + 1)])) {
              bad += Frame.N2;
            }
          }
        }

        var bw = 0;

        // X runs.
        for (var _y8 = 0; _y8 < width; _y8++) {
          var h = 0;

          this._badness[0] = 0;

          for (var b = 0, _x8 = 0; _x8 < width; _x8++) {
            var b1 = this.buffer[_x8 + width * _y8];

            if (b === b1) {
              this._badness[h]++;
            } else {
              this._badness[++h] = 1;
            }

            b = b1;
            bw += b ? 1 : -1;
          }

          bad += this._getBadness(h);
        }

        if (bw < 0) {
          bw = -bw;
        }

        var count = 0;
        var big = bw;
        big += big << 2;
        big <<= 1;

        while (big > width * width) {
          big -= width * width;
          count++;
        }

        bad += count * Frame.N4;

        // Y runs.
        for (var _x9 = 0; _x9 < width; _x9++) {
          var _h = 0;

          this._badness[0] = 0;

          for (var _b = 0, _y9 = 0; _y9 < width; _y9++) {
            var _b2 = this.buffer[_x9 + width * _y9];

            if (_b === _b2) {
              this._badness[_h]++;
            } else {
              this._badness[++_h] = 1;
            }

            _b = _b2;
          }

          bad += this._getBadness(_h);
        }

        return bad;
      }
    }, {
      key: '_convertBitStream',
      value: function _convertBitStream(length) {
        // Convert string to bit stream. 8-bit data to QR-coded 8-bit data (numeric, alphanum, or kanji
        // not supported).

        for (var i = 0; i < length; i++) {
          this._ecc[i] = this._stringBuffer.charCodeAt(i);
        }

        this._stringBuffer = this._ecc.slice(0);

        var maxLength = this._calculateMaxLength();

        if (length >= maxLength - 2) {
          length = maxLength - 2;

          if (this._version > 9) {
            length--;
          }
        }

        // Shift and re-pack to insert length prefix.
        var index = length;

        if (this._version > 9) {
          this._stringBuffer[index + 2] = 0;
          this._stringBuffer[index + 3] = 0;

          while (index--) {
            var bit = this._stringBuffer[index];

            this._stringBuffer[index + 3] |= 255 & bit << 4;
            this._stringBuffer[index + 2] = bit >> 4;
          }

          this._stringBuffer[2] |= 255 & length << 4;
          this._stringBuffer[1] = length >> 4;
          this._stringBuffer[0] = 0x40 | length >> 12;
        } else {
          this._stringBuffer[index + 1] = 0;
          this._stringBuffer[index + 2] = 0;

          while (index--) {
            var _bit = this._stringBuffer[index];

            this._stringBuffer[index + 2] |= 255 & _bit << 4;
            this._stringBuffer[index + 1] = _bit >> 4;
          }

          this._stringBuffer[1] |= 255 & length << 4;
          this._stringBuffer[0] = 0x40 | length >> 4;
        }

        // Fill to end with pad pattern.
        index = length + 3 - (this._version < 10);

        while (index < maxLength) {
          this._stringBuffer[index++] = 0xec;
          this._stringBuffer[index++] = 0x11;
        }
      }
    }, {
      key: '_getBadness',
      value: function _getBadness(length) {
        var badRuns = 0;

        for (var i = 0; i <= length; i++) {
          if (this._badness[i] >= 5) {
            badRuns += Frame.N1 + this._badness[i] - 5;
          }
        }

        // FBFFFBF as in finder.
        for (var _i5 = 3; _i5 < length - 1; _i5 += 2) {
          if (this._badness[_i5 - 2] === this._badness[_i5 + 2] && this._badness[_i5 + 2] === this._badness[_i5 - 1] && this._badness[_i5 - 1] === this._badness[_i5 + 1] && this._badness[_i5 - 1] * 3 === this._badness[_i5] && (
          // Background around the foreground pattern? Not part of the specs.
          this._badness[_i5 - 3] === 0 || _i5 + 3 > length || this._badness[_i5 - 3] * 3 >= this._badness[_i5] * 4 || this._badness[_i5 + 3] * 3 >= this._badness[_i5] * 4)) {
            badRuns += Frame.N3;
          }
        }

        return badRuns;
      }
    }, {
      key: '_finish',
      value: function _finish() {
        // Save pre-mask copy of frame.
        this._stringBuffer = this.buffer.slice(0);

        var bit = 0;
        var i = void 0;
        var mask = 30000;

        /*
         * Using for instead of while since in original Arduino code if an early mask was "good enough" it wouldn't try for
         * a better one since they get more complex and take longer.
         */
        for (i = 0; i < 8; i++) {
          // Returns foreground-background imbalance.
          this._applyMask(i);

          var currentMask = this._checkBadness();

          // Is current mask better than previous best?
          if (currentMask < mask) {
            mask = currentMask;
            bit = i;
          }

          // Don't increment "i" to a void redoing mask.
          if (bit === 7) {
            break;
          }

          // Reset for next pass.
          this.buffer = this._stringBuffer.slice(0);
        }

        // Redo best mask as none were "good enough" (i.e. last wasn't bit).
        if (bit !== i) {
          this._applyMask(bit);
        }

        // Add in final mask/ECC level bytes.
        mask = ErrorCorrection.FINAL_FORMAT[bit + (this._level - 1 << 3)];

        // Low byte.
        for (i = 0; i < 8; i++, mask >>= 1) {
          if (mask & 1) {
            this.buffer[this.width - 1 - i + this.width * 8] = 1;

            if (i < 6) {
              this.buffer[8 + this.width * i] = 1;
            } else {
              this.buffer[8 + this.width * (i + 1)] = 1;
            }
          }
        }

        // High byte.
        for (i = 0; i < 7; i++, mask >>= 1) {
          if (mask & 1) {
            this.buffer[8 + this.width * (this.width - 7 + i)] = 1;

            if (i) {
              this.buffer[6 - i + this.width * 8] = 1;
            } else {
              this.buffer[7 + this.width * 8] = 1;
            }
          }
        }
      }
    }, {
      key: '_interleaveBlocks',
      value: function _interleaveBlocks() {
        var maxLength = this._calculateMaxLength();
        var i = void 0;
        var k = 0;

        for (i = 0; i < this._dataBlock; i++) {
          for (var j = 0; j < this._neccBlock1; j++) {
            this._ecc[k++] = this._stringBuffer[i + j * this._dataBlock];
          }

          for (var _j2 = 0; _j2 < this._neccBlock2; _j2++) {
            this._ecc[k++] = this._stringBuffer[this._neccBlock1 * this._dataBlock + i + _j2 * (this._dataBlock + 1)];
          }
        }

        for (var _j3 = 0; _j3 < this._neccBlock2; _j3++) {
          this._ecc[k++] = this._stringBuffer[this._neccBlock1 * this._dataBlock + i + _j3 * (this._dataBlock + 1)];
        }

        for (i = 0; i < this._eccBlock; i++) {
          for (var _j4 = 0; _j4 < this._neccBlock1 + this._neccBlock2; _j4++) {
            this._ecc[k++] = this._stringBuffer[maxLength + i + _j4 * this._eccBlock];
          }
        }

        this._stringBuffer = this._ecc;
      }
    }, {
      key: '_insertAlignments',
      value: function _insertAlignments() {
        var width = this.width;

        if (this._version > 1) {
          var i = Alignment.BLOCK[this._version];
          var y = width - 7;

          for (;;) {
            var x = width - 7;

            while (x > i - 3) {
              this._addAlignment(x, y);

              if (x < i) {
                break;
              }

              x -= i;
            }

            if (y <= i + 9) {
              break;
            }

            y -= i;

            this._addAlignment(6, y);
            this._addAlignment(y, 6);
          }
        }
      }
    }, {
      key: '_insertFinders',
      value: function _insertFinders() {
        var width = this.width;

        for (var i = 0; i < 3; i++) {
          var j = 0;
          var y = 0;

          if (i === 1) {
            j = width - 7;
          }
          if (i === 2) {
            y = width - 7;
          }

          this.buffer[y + 3 + width * (j + 3)] = 1;

          for (var x = 0; x < 6; x++) {
            this.buffer[y + x + width * j] = 1;
            this.buffer[y + width * (j + x + 1)] = 1;
            this.buffer[y + 6 + width * (j + x)] = 1;
            this.buffer[y + x + 1 + width * (j + 6)] = 1;
          }

          for (var _x10 = 1; _x10 < 5; _x10++) {
            this._setMask(y + _x10, j + 1);
            this._setMask(y + 1, j + _x10 + 1);
            this._setMask(y + 5, j + _x10);
            this._setMask(y + _x10 + 1, j + 5);
          }

          for (var _x11 = 2; _x11 < 4; _x11++) {
            this.buffer[y + _x11 + width * (j + 2)] = 1;
            this.buffer[y + 2 + width * (j + _x11 + 1)] = 1;
            this.buffer[y + 4 + width * (j + _x11)] = 1;
            this.buffer[y + _x11 + 1 + width * (j + 4)] = 1;
          }
        }
      }
    }, {
      key: '_insertTimingGap',
      value: function _insertTimingGap() {
        var width = this.width;

        for (var y = 0; y < 7; y++) {
          this._setMask(7, y);
          this._setMask(width - 8, y);
          this._setMask(7, y + width - 7);
        }

        for (var x = 0; x < 8; x++) {
          this._setMask(x, 7);
          this._setMask(x + width - 8, 7);
          this._setMask(x, width - 8);
        }
      }
    }, {
      key: '_insertTimingRowAndColumn',
      value: function _insertTimingRowAndColumn() {
        var width = this.width;

        for (var x = 0; x < width - 14; x++) {
          if (x & 1) {
            this._setMask(8 + x, 6);
            this._setMask(6, 8 + x);
          } else {
            this.buffer[8 + x + width * 6] = 1;
            this.buffer[6 + width * (8 + x)] = 1;
          }
        }
      }
    }, {
      key: '_insertVersion',
      value: function _insertVersion() {
        var width = this.width;

        if (this._version > 6) {
          var i = Version.BLOCK[this._version - 7];
          var j = 17;

          for (var x = 0; x < 6; x++) {
            for (var y = 0; y < 3; y++, j--) {
              if (1 & (j > 11 ? this._version >> j - 12 : i >> j)) {
                this.buffer[5 - x + width * (2 - y + width - 11)] = 1;
                this.buffer[2 - y + width - 11 + width * (5 - x)] = 1;
              } else {
                this._setMask(5 - x, 2 - y + width - 11);
                this._setMask(2 - y + width - 11, 5 - x);
              }
            }
          }
        }
      }
    }, {
      key: '_isMasked',
      value: function _isMasked(x, y) {
        var bit = Frame._getMaskBit(x, y);

        return this._mask[bit] === 1;
      }
    }, {
      key: '_pack',
      value: function _pack() {
        var x = this.width - 1;
        var y = this.width - 1;
        var k = 1;
        var v = 1;

        // Interleaved data and ECC codes.
        var length = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;

        for (var i = 0; i < length; i++) {
          var bit = this._stringBuffer[i];

          for (var j = 0; j < 8; j++, bit <<= 1) {
            if (0x80 & bit) {
              this.buffer[x + this.width * y] = 1;
            }

            // Find next fill position.
            do {
              if (v) {
                x--;
              } else {
                x++;

                if (k) {
                  if (y !== 0) {
                    y--;
                  } else {
                    x -= 2;
                    k = !k;

                    if (x === 6) {
                      x--;
                      y = 9;
                    }
                  }
                } else if (y !== this.width - 1) {
                  y++;
                } else {
                  x -= 2;
                  k = !k;

                  if (x === 6) {
                    x--;
                    y -= 8;
                  }
                }
              }

              v = !v;
            } while (this._isMasked(x, y));
          }
        }
      }
    }, {
      key: '_reverseMask',
      value: function _reverseMask() {
        var width = this.width;

        for (var x = 0; x < 9; x++) {
          this._setMask(x, 8);
        }

        for (var _x12 = 0; _x12 < 8; _x12++) {
          this._setMask(_x12 + width - 8, 8);
          this._setMask(8, _x12);
        }

        for (var y = 0; y < 7; y++) {
          this._setMask(8, y + width - 7);
        }
      }
    }, {
      key: '_setMask',
      value: function _setMask(x, y) {
        var bit = Frame._getMaskBit(x, y);

        this._mask[bit] = 1;
      }
    }, {
      key: '_syncMask',
      value: function _syncMask() {
        var width = this.width;

        for (var y = 0; y < width; y++) {
          for (var x = 0; x <= y; x++) {
            if (this.buffer[x + width * y]) {
              this._setMask(x, y);
            }
          }
        }
      }
    }]);
    return Frame;
  }();

  /**
   * An implementation of {@link Renderer} for working with <code>img</code> elements.
   *
   * This depends on {@link CanvasRenderer} being executed first as this implementation simply applies the data URL from
   * the rendered <code>canvas</code> element as the <code>src</code> for the <code>img</code> element being rendered.
   *
   * @public
   * @extends Renderer
   */

  var ImageRenderer = function (_Renderer) {
    inherits(ImageRenderer, _Renderer);

    function ImageRenderer() {
      classCallCheck(this, ImageRenderer);
      return possibleConstructorReturn(this, Object.getPrototypeOf(ImageRenderer).apply(this, arguments));
    }

    createClass(ImageRenderer, [{
      key: 'draw',


      /**
       * @override
       */
      value: function draw() {
        var qrious = this.qrious;

        qrious.image.src = qrious.toDataURL();
      }

      /**
       * @override
       */

    }, {
      key: 'reset',
      value: function reset() {
        var qrious = this.qrious;

        qrious.image.src = '';
      }

      /**
       * @override
       */

    }, {
      key: 'resize',
      value: function resize() {
        var qrious = this.qrious;
        var image = qrious.image;

        image.width = qrious.size;
        image.height = qrious.size;
      }
    }]);
    return ImageRenderer;
  }(Renderer);

  /*
   * QRious
   * Copyright (C) 2016 Alasdair Mercer
   * Copyright (C) 2010 Tom Zerucha
   *
   * This program is free software: you can redistribute it and/or modify
   * it under the terms of the GNU General Public License as published by
   * the Free Software Foundation, either version 3 of the License, or
   * (at your option) any later version.
   *
   * This program is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   * GNU General Public License for more details.
   *
   * You should have received a copy of the GNU General Public License
   * along with this program.  If not, see <http://www.gnu.org/licenses/>.
   */

  /**
   * A basic manager for {@link Service} implementations that are mapped to simple names.
   *
   * @public
   */

  var ServiceManager = function () {

    /**
     * Creates a new instance of {@link ServiceManager}.
     *
     * @public
     */

    function ServiceManager() {
      classCallCheck(this, ServiceManager);

      this._services = {};
    }

    /**
     * Returns the {@link Service} being managed with the specified <code>name</code>.
     *
     * @param {String} name - the name of the {@link Service} to be returned
     * @return {Service} The {@link Service} is being managed with <code>name</code>.
     * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
     * @public
     */


    createClass(ServiceManager, [{
      key: "getService",
      value: function getService(name) {
        var service = this._services[name];
        if (!service) {
          throw new Error("Service is not being managed with name: " + name);
        }

        return service;
      }

      /**
       * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
       * <code>service</code> provided.
       *
       * @param {String} name - the name of the {@link Service} to be managed with <code>name</code>
       * @param {Service} service - the {@link Service} implementation to be managed
       * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
       * @public
       */

    }, {
      key: "setService",
      value: function setService(name, service) {
        if (this._services[name]) {
          throw new Error("Service is already managed with name: " + name);
        }

        if (service) {
          this._services[name] = service;
        }
      }
    }]);
    return ServiceManager;
  }();

  /**
   * Enables configuration of a QR code generator which uses HTML5 <code>canvas</code> for rendering.
   *
   * @public
   */

  var QRious = function () {
    createClass(QRious, null, [{
      key: 'use',


      /**
       * Configures the <code>service</code> provided to be used by all {@link QRious} instances.
       *
       * @param {Service} service - the {@link Service} to be configured
       * @throws {Error} If a {@link Service} has already been configured with the same name.
       * @public
       * @static
       */
      value: function use(service) {
        QRious._serviceManager.setService(service.getName(), service);
      }
    }, {
      key: '_parseOptions',
      value: function _parseOptions(options) {
        options = Object.assign({}, QRious.DEFAULTS, options);
        options.level = Utilities.toUpperCase(options.level);
        options.size = Math.abs(options.size);

        return options;
      }

      /**
       * Creates a new instance of {@link QRious} based on the <code>options</code> provided.
       *
       * @param {QRious~Options} [options] - the options to be used
       * @public
       */

    }, {
      key: 'DEFAULTS',


      /**
       * Returns the default options for {@link QRious}.
       *
       * @return {QRious~Options} The default options.
       * @public
       * @static
       */
      get: function get() {
        return {
          background: 'white',
          foreground: 'black',
          level: 'L',
          mime: 'image/png',
          size: 100,
          value: ''
        };
      }

      /**
       * Returns the current version of {@link QRious}.
       *
       * @return {String} The current version.
       * @public
       * @static
       */

    }, {
      key: 'VERSION',
      get: function get() {
        return '2.0.0';
      }
    }]);

    function QRious(options) {
      classCallCheck(this, QRious);

      options = QRious._parseOptions(options);

      Utilities.privatize(this, options);

      var element = this._element;
      var elementService = QRious._serviceManager.getService('element');

      /**
       * The <code>canvas</code> being used to render the QR code for this {@link QRious}.
       *
       * @public
       * @type {*}
       */
      this.canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
      this.canvas.qrious = this;

      /**
       * The <code>img</code> to contain the rendered QR code for this {@link QRious}.
       *
       * @public
       * @type {*}
       */
      this.image = element && elementService.isImage(element) ? element : elementService.createImage();
      this.image.qrious = this;

      this._renderers = [new CanvasRenderer(this), new ImageRenderer(this)];

      this.update();
    }

    /**
     * Returns the image data URI for the generated QR code using the <code>mime</code> provided.
     *
     * @param {String} [mime] - the MIME type for the image
     * @return {String} The image data URI for the QR code.
     * @public
     */


    createClass(QRious, [{
      key: 'toDataURL',
      value: function toDataURL(mime) {
        return this.canvas.toDataURL(mime || this.mime);
      }

      /**
       * Updates this {@link QRious} by generating a new {@link Frame} and re-rendering the QR code.
       *
       * @protected
       */

    }, {
      key: 'update',
      value: function update() {
        var frame = new Frame({
          level: this.level,
          value: this.value
        });

        this._renderers.forEach(function (renderer) {
          return renderer.render(frame);
        });
      }

      /**
       * Returns the background color for the QR code.
       *
       * @return {String} The background color.
       * @public
       */

    }, {
      key: 'background',
      get: function get() {
        return this._background;
      }

      /**
       * Sets the background color for the QR code to <code>background</code>.
       *
       * @param {String} [background="white"] - the background color to be set
       * @public
       */
      ,
      set: function set(background) {
        var changed = Utilities.setter(this, '_background', background, QRious.DEFAULTS.background);

        if (changed) {
          this.update();
        }
      }

      /**
       * Returns the foreground color for the QR code.
       *
       * @return {String} The foreground color.
       * @public
       */

    }, {
      key: 'foreground',
      get: function get() {
        return this._foreground;
      }

      /**
       * Sets the foreground color for the QR code to <code>foreground</code>.
       *
       * @param {String} [foreground="black"] - the foreground color to be set
       * @public
       */
      ,
      set: function set(foreground) {
        var changed = Utilities.setter(this, '_foreground', foreground, QRious.DEFAULTS.foreground);

        if (changed) {
          this.update();
        }
      }

      /**
       * Returns the error correction level for the QR code.
       *
       * @return {String} The ECC level.
       * @public
       */

    }, {
      key: 'level',
      get: function get() {
        return this._level;
      }

      /**
       * Sets the error correction level for the QR code to <code>level</code>.
       *
       * <code>level</code> will be transformed to upper case to aid mapping to known ECC level blocks.
       *
       * @param {String} [level="L"] - the ECC level to be set
       * @public
       */
      ,
      set: function set(level) {
        var changed = Utilities.setter(this, '_level', level, QRious.DEFAULTS.level, Utilities.toUpperCase);

        if (changed) {
          this.update();
        }
      }

      /**
       * Returns the MIME type for the image rendered for the QR code.
       *
       * @return {String} The image MIME type.
       * @public
       */

    }, {
      key: 'mime',
      get: function get() {
        return this._mime;
      }

      /**
       * Sets the MIME type for the image rendered for the QR code to <code>mime</code>.
       *
       * @param {String} [mime="image/png"] - the image MIME type to be set
       * @public
       */
      ,
      set: function set(mime) {
        var changed = Utilities.setter(this, '_mime', mime, QRious.DEFAULTS.mime);

        if (changed) {
          this.update();
        }
      }

      /**
       * Returns the size of the QR code.
       *
       * @return {Number} The size in pixels.
       * @public
       */

    }, {
      key: 'size',
      get: function get() {
        return this._size;
      }

      /**
       * Sets the size of the QR code to <code>size</code>.
       *
       * <code>size</code> will be transformed to ensure that it is always an absolute positive numbers (e.g.
       * <code>-100</code> would become <code>100</code>).
       *
       * @param {Number} [size=100] - the size in pixels to be set
       * @public
       */
      ,
      set: function set(size) {
        var changed = Utilities.setter(this, '_size', size, QRious.DEFAULTS.size, Math.abs);

        if (changed) {
          this.update();
        }
      }

      /**
       * Returns the value of the QR code.
       *
       * @return {String} The value.
       * @public
       */

    }, {
      key: 'value',
      get: function get() {
        return this._value;
      }

      /**
       * Sets the value of the QR code to <code>value</code>.
       *
       * @param {String} [value=""] - the value to be set
       * @public
       */
      ,
      set: function set(value) {
        var changed = Utilities.setter(this, '_value', value, QRious.DEFAULTS.value);

        if (changed) {
          this.update();
        }
      }
    }]);
    return QRious;
  }();

  QRious._serviceManager = new ServiceManager();

  QRious.use(new BrowserElementService());

  return QRious;

}));
//# sourceMappingURL=qrious.js.map