/*!
 *
 *   typeit - The most versatile animated typing utility on the planet.
 *   Author: Alex MacArthur <alex@macarthur.me> (https://macarthur.me)
 *   Version: v5.10.2
 *   URL: https://typeitjs.com
 *   License: GPL-2.0
 *
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.TypeIt = factory());
}(this, (function () { 'use strict';

  function isVisible(element) {
    var coordinates = element.getBoundingClientRect();

    //-- Element extends past bottom or right.
    if (coordinates.right > window.innerWidth || coordinates.bottom > window.innerHeight) {
      return false;
    }

    //-- Element extends past top or left.
    if (coordinates.top < 0 || coordinates.left < 0) {
      return false;
    }

    return true;
  }

  function randomInRange(value, range) {
    return Math.abs(Math.random() * (value + range - (value - range)) + (value - range));
  }

  function generateHash() {
    return Math.random().toString(36).substring(2, 15);
  }

  function removeComments(arrayOfStrings) {
    return arrayOfStrings.map(function (string) {
      return string.replace(/<\!--.*?-->/g, "");
    });
  }

  function startsWith(string, search) {
    return string.indexOf(search) === 0;
  }

  function toArray(string) {
    return Array.isArray(string) ? string.slice(0) : string.split("<br>");
  }

  function groupHTMLTags(arr) {
    var tPosition = [];
    var tag = void 0;
    var isEntity = false;

    for (var j = 0; j < arr.length; j++) {
      if (arr[j] === "<" || arr[j] === "&") {
        tPosition[0] = j;
        isEntity = arr[j] === "&";
      }

      if (arr[j] === ">" || arr[j] === ";" && isEntity) {
        tPosition[1] = j;
        j = 0;
        tag = arr.slice(tPosition[0], tPosition[1] + 1).join("");
        arr.splice(tPosition[0], tPosition[1] - tPosition[0] + 1, tag);
        isEntity = false;
      }
    }

    return arr;
  }

  window.TypeItDefaults = {
    strings: [],
    speed: 100,
    deleteSpeed: null,
    lifeLike: true,
    cursor: true,
    cursorChar: "|",
    cursorSpeed: 1000,
    breakLines: true,
    startDelay: 250,
    startDelete: false,
    nextStringDelay: 750,
    loop: false,
    loopDelay: false,
    html: true,
    autoStart: true,
    callback: false,
    beforeString: false,
    afterString: false,
    beforeStep: false,
    afterStep: false,
    afterComplete: false
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var Instance = function () {
    function Instance(element, id, options, autoInit, typeit) {
      classCallCheck(this, Instance);

      this.id = id;
      this.typeit = typeit;
      this.autoInit = autoInit;
      this.element = element;
      this.timeouts = [];
      this.hasStarted = false;
      this.isFrozen = false;
      this.isComplete = false;
      this.hasBeenDestroyed = false;
      this.queue = [];
      this.isInTag = false;
      this.stringsToDelete = "";
      this.style = "display:inline;position:relative;font:inherit;color:inherit;";
      this.setOptions(options, window.TypeItDefaults, false);
      this.prepareTargetElement();
      this.prepareDelay("nextStringDelay");
      this.prepareDelay("loopDelay");
      this.prepareDOM();
      this.prepareStrings();

      if (this.options.startDelete && this.stringsToDelete) {
        this.insert(this.stringsToDelete);
        this.queue.push([this.delete]);
        this.insertSplitPause(1);
      }

      this.generateQueue();

      //-- We have no strings! So, don't do anything.
      if (!this.options.strings.length || !this.options.strings[0]) return;

      if (this.autoInit) {
        this.init();
      }
    }

    /**
     * Prepares strings for processing.
     */


    createClass(Instance, [{
      key: "prepareStrings",
      value: function prepareStrings() {
        this.options.strings = removeComments(toArray(this.options.strings));
      }

      /**
       * Performs DOM-related work to prepare for typing.
       */

    }, {
      key: "prepareDOM",
      value: function prepareDOM() {
        this.element.innerHTML = "\n        <span style=\"" + this.style + "\" class=\"ti-container\"></span>\n      ";
        this.element.setAttribute("data-typeitid", this.id);
        this.elementContainer = this.element.querySelector("span");
      }

      /**
       * Reset the instance to new status.
       */

    }, {
      key: "reset",
      value: function reset() {
        return new Instance(this.element, this.id, this.options, this.autoInit, this.typeit);
      }

      /**
       * If argument is passed, set to content according to `html` option.
       * If not, just return the contents of the element, based on `html` option.
       * @param {string | null} content
       */

    }, {
      key: "contents",
      value: function contents() {
        var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        //-- Just return the contents of the element.
        if (content === null) {
          return this.options.html ? this.elementContainer.innerHTML : this.elementContainer.innerText;
        }

        this.elementContainer[this.options.html ? "innerHTML" : "innerText"] = content;

        return content;
      }
    }, {
      key: "prepareDelay",
      value: function prepareDelay(delayType) {
        var delay = this.options[delayType];

        if (!delay) return;

        var isArray = Array.isArray(delay);
        var halfDelay = !isArray ? delay / 2 : null;

        this.options[delayType] = {
          before: isArray ? delay[0] : halfDelay,
          after: isArray ? delay[1] : halfDelay,
          total: isArray ? delay[0] + delay[1] : delay
        };
      }
    }, {
      key: "generateQueue",
      value: function generateQueue() {
        var _this = this;

        var initialStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        initialStep = initialStep === null ? [this.pause, this.options.startDelay] : initialStep;

        this.queue.push(initialStep);

        this.options.strings.forEach(function (string, index) {
          _this.queueString(string);

          //-- This is the last string. Get outta here.
          if (index + 1 === _this.options.strings.length) return;

          if (_this.options.breakLines) {
            _this.queue.push([_this.break]);
            _this.insertSplitPause(_this.queue.length);
            return;
          }

          _this.queueDeletions(string);
          _this.insertSplitPause(_this.queue.length, string.length);
        });
      }

      /**
       * Delete each character from a string.
       */

    }, {
      key: "queueDeletions",
      value: function queueDeletions() {
        var stringOrNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var number = typeof stringOrNumber === "string" ? stringOrNumber.length : stringOrNumber;

        for (var i = 0; i < number; i++) {
          this.queue.push([this.delete, 1]);
        }
      }

      /**
       * Add steps to the queue for each character in a given string.
       */

    }, {
      key: "queueString",
      value: function queueString(string) {
        var rake = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (!string) return;

        string = toArray(string);

        var doc = document.implementation.createHTMLDocument("");
        doc.body.innerHTML = string;

        //-- If it's designated, rake that bad boy for HTML tags and stuff.
        if (rake) {
          string = this.rake(string)[0];
        }

        //-- @todo Improve this check by using regex (rather than startsWith() checks).
        //-- If an opening HTML tag is found and we're not already printing inside a tag
        if (this.options.html && startsWith(string[0], "<") && !startsWith(string[0], "</")) {
          //-- Create node of that string name, by regexing for the closing tag.
          var matches = string[0].match(/\<(.*?)\>/);
          var _doc = document.implementation.createHTMLDocument("");
          _doc.body.innerHTML = "<" + matches[1] + "></" + matches[1] + ">";

          //-- Add to the queue.
          this.queue.push([this.type, _doc.body.children[0]]);
        } else {
          this.queue.push([this.type, string[0]]);
        }

        //-- Shorten it by one character.
        string.splice(0, 1);

        //-- If rake is true, this is the first time we've queued this string.
        if (rake) {
          this.queue[this.queue.length - 1].push("first-of-string");
        }

        //-- If there's more to it, run again until fully printed.
        if (string.length) {
          this.queueString(string, false);
          return;
        }

        //-- End of string!
        this.queue[this.queue.length - 1].push("last-of-string");
      }

      /**
       * Insert a split pause around a range of queue items.
       *
       * @param  {Number} startPosition The position at which to start wrapping.
       * @param  {Number} numberOfActionsToWrap The number of actions in the queue to wrap.
       * @return {void}
       */

    }, {
      key: "insertSplitPause",
      value: function insertSplitPause(startPosition) {
        var numberOfActionsToWrap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        this.queue.splice(startPosition, 0, [this.pause, this.options.nextStringDelay.before]);
        this.queue.splice(startPosition - numberOfActionsToWrap, 0, [this.pause, this.options.nextStringDelay.after]);
      }
    }, {
      key: "init",
      value: function init() {
        if (this.hasStarted) return;

        this.cursor();

        if (this.options.autoStart) {
          this.hasStarted = true;
          this.next();
          return;
        }

        if (isVisible(this.element)) {
          this.hasStarted = true;
          this.next();
          return;
        }

        var that = this;

        function checkForStart(event) {
          if (isVisible(that.element) && !that.hasStarted) {
            that.hasStarted = true;
            that.next();
            event.currentTarget.removeEventListener(event.type, checkForStart);
          }
        }

        window.addEventListener("scroll", checkForStart);
      }
    }, {
      key: "cursor",
      value: function cursor() {
        var visibilityStyle = "visibility: hidden;";

        if (this.options.cursor) {
          var styleBlock = document.createElement("style");

          styleBlock.id = this.id;

          var styles = "\n            @keyframes blink-" + this.id + " {\n              0% {opacity: 0}\n              49% {opacity: 0}\n              50% {opacity: 1}\n            }\n\n            [data-typeitid='" + this.id + "'] .ti-cursor {\n              animation: blink-" + this.id + " " + this.options.cursorSpeed / 1000 + "s infinite;\n            }\n          ";

          styleBlock.appendChild(document.createTextNode(styles));

          document.head.appendChild(styleBlock);

          visibilityStyle = "";
        }

        this.element.insertAdjacentHTML("beforeend", "<span style=\"" + this.style + visibilityStyle + "\" class=\"ti-cursor\">" + this.options.cursorChar + "</span>");
      }

      /**
       * Inserts string to element container.
       */

    }, {
      key: "insert",
      value: function insert(content) {
        var toChildNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (toChildNode) {
          this.elementContainer.lastChild.insertAdjacentHTML("beforeend", content);
        } else {
          this.elementContainer.insertAdjacentHTML("beforeend", content);
        }

        this.contents(this.contents().split("").join(""));
      }

      /**
       * Depending on if we're starting by deleting an existing string or typing
       * from nothing, set a specific variable to what's in the HTML.
       */

    }, {
      key: "prepareTargetElement",
      value: function prepareTargetElement() {
        var _this2 = this;

        //-- If any of the existing children nodes have .ti-container, clear it out because this is a remnant of a previous instance.
        [].slice.call(this.element.childNodes).forEach(function (node) {
          if (node.classList === undefined) return;

          if (node.classList.contains("ti-container")) {
            _this2.element.innerHTML = "";
          }
        });

        //-- Set the hard-coded string as the string(s) we'll type.
        if (!this.options.startDelete && this.element.innerHTML.length > 0) {
          this.options.strings = this.element.innerHTML.trim();
          return;
        }

        this.stringsToDelete = this.element.innerHTML;
      }
    }, {
      key: "break",
      value: function _break() {
        this.insert("<br>");
        this.next();
      }
    }, {
      key: "pause",
      value: function pause() {
        var _this3 = this;

        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        setTimeout(function () {
          _this3.next();
        }, time ? time : this.options.nextStringDelay.total);
      }

      /*
        Convert each string in the array to a sub-array. While happening, search the subarrays for HTML tags.
        When a complete tag is found, slice the subarray to get the complete tag, insert it at the correct index,
        and delete the range of indexes where the indexed tag used to be.
      */

    }, {
      key: "rake",
      value: function rake(array) {
        var _this4 = this;

        return array.map(function (item) {
          //-- Convert string to array.
          item = item.split("");

          //-- If we're parsing HTML, group tags into their own array items.
          if (_this4.options.html) {
            return groupHTMLTags(item);
          }

          return item;
        });
      }
    }, {
      key: "type",
      value: function type(character) {
        var _this5 = this;

        this.setPace();

        this.timeouts[0] = setTimeout(function () {
          //-- We must have an HTML tag!
          if (typeof character !== "string") {
            character.innerHTML = "";
            _this5.elementContainer.appendChild(character);
            _this5.isInTag = true;
            _this5.next();
            return;
          }

          //-- When we hit the end of the tag, turn it off!
          if (startsWith(character, "</")) {
            _this5.isInTag = false;
            _this5.next();
            return;
          }

          _this5.insert(character, _this5.isInTag);

          _this5.next();
        }, this.typePace);
      }
    }, {
      key: "setOptions",
      value: function setOptions(settings) {
        var defaults$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var autonext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        var mergedSettings = {};

        if (defaults$$1 === null) {
          defaults$$1 = this.options;
        }

        for (var attrname in defaults$$1) {
          mergedSettings[attrname] = defaults$$1[attrname];
        }

        for (var _attrname in settings) {
          mergedSettings[_attrname] = settings[_attrname];
        }

        this.options = mergedSettings;

        if (autonext) {
          this.next();
        }
      }
    }, {
      key: "setPace",
      value: function setPace() {
        var typeSpeed = this.options.speed;
        var deleteSpeed = this.options.deleteSpeed !== null ? this.options.deleteSpeed : this.options.speed / 3;
        var typeRange = typeSpeed / 2;
        var deleteRange = deleteSpeed / 2;

        this.typePace = this.options.lifeLike ? randomInRange(typeSpeed, typeRange) : typeSpeed;
        this.deletePace = this.options.lifeLike ? randomInRange(deleteSpeed, deleteRange) : deleteSpeed;
      }
    }, {
      key: "delete",
      value: function _delete() {
        var _this6 = this;

        var chars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.timeouts[1] = setTimeout(function () {
          _this6.setPace();

          var textArray = _this6.contents().split("");

          //-- Cut the array by a character.
          for (var n = textArray.length - 1; n > -1; n--) {
            if ((textArray[n] === ">" || textArray[n] === ";") && _this6.options.html) {
              for (var o = n; o > -1; o--) {
                if (textArray.slice(o - 3, o + 1).join("") === "<br>") {
                  textArray.splice(o - 3, 4);
                  break;
                }

                if (textArray[o] === "&") {
                  textArray.splice(o, n - o + 1);
                  break;
                }

                if (textArray[o] === "<") {
                  if (textArray[o - 1] !== ">") {
                    if (textArray[o - 1] === ";") {
                      for (var p = o - 1; p > -1; p--) {
                        if (textArray[p] === "&") {
                          textArray.splice(p, o - p);
                          break;
                        }
                      }
                    }

                    textArray.splice(o - 1, 1);
                    break;
                  }
                }
              }
              break;
            } else {
              textArray.pop();
              break;
            }
          }

          //-- If we've found an empty set of HTML tags...
          if (_this6.options.html && _this6.contents().indexOf("></") > -1) {
            for (var i = _this6.contents().indexOf("></") - 2; i >= 0; i--) {
              if (textArray[i] === "<") {
                textArray.splice(i, textArray.length - i);
                break;
              }
            }
          }

          //-- Make the content a string again, AND strip out any empty HTML tags.
          //-- We want do strip empty tags here and ONLY here because when we're
          //-- typing new content inside an HTML tag, there is momentarily an empty
          //-- tag we want to keep.
          _this6.contents(textArray.join("").replace(/<[^\/>][^>]*><\/[^>]+>/, ""));

          //-- Delete again! Don't call directly, to respect possible pauses.
          if (chars === null) {
            _this6.queue.unshift([_this6.delete, textArray.length]);
          }

          if (chars > 1) {
            _this6.queue.unshift([_this6.delete, chars - 1]);
          }

          _this6.next();
        }, this.deletePace);
      }

      /*
      * Empty the existing text, clearing it instantly.
      */

    }, {
      key: "empty",
      value: function empty() {
        this.contents("");
        this.next();
      }
    }, {
      key: "next",
      value: function next() {
        var _this7 = this;

        if (this.isFrozen) {
          return;
        }

        //-- We haven't reached the end of the queue, go again.
        if (this.queue.length > 0) {
          this.step = this.queue.shift();

          if (this.step[2] === "first-of-string" && this.options.beforeString) {
            this.options.beforeString(this.step, this.queue, this.typeit);
          }

          if (this.options.beforeStep) {
            this.options.beforeStep(this.step, this.queue, this.typeit);
          }

          //-- Execute this step!
          this.step[0].call(this, this.step[1], this.step[2]);

          if (this.step[2] === "last-of-string" && this.options.afterString) {
            this.options.afterString(this.step, this.queue, this.typeit);
          }

          if (this.options.afterStep) {
            this.options.afterStep(this.step, this.queue, this.typeit);
          }

          return;
        }

        //-- @todo: Remove in next major release.
        if (this.options.callback) {
          this.options.callback();
        }

        if (this.options.afterComplete) {
          this.options.afterComplete(this.typeit);
        }

        if (this.options.loop) {
          var delay = this.options.loopDelay ? this.options.loopDelay : this.options.nextStringDelay;
          this.queueDeletions(this.contents());
          this.generateQueue([this.pause, delay.before]);

          setTimeout(function () {
            _this7.next();
          }, delay.after);

          return;
        }

        this.isComplete = true;
      }
    }]);
    return Instance;
  }();

  var Core = function () {
    function Core(element, args) {
      var autoInit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      classCallCheck(this, Core);

      this.id = generateHash();
      this.instances = [];
      this.elements = [];
      this.args = args;
      this.autoInit = autoInit;

      if ((typeof element === "undefined" ? "undefined" : _typeof(element)) === "object") {
        //-- There's only one!
        if (element.length === undefined) {
          this.elements.push(element);
        } else {
          //-- It's already an array!
          this.elements = element;
        }
      }

      //-- Convert to array of elements.
      if (typeof element === "string") {
        this.elements = document.querySelectorAll(element);
      }

      this.generateInstances();
    }

    createClass(Core, [{
      key: "generateInstances",
      value: function generateInstances() {
        var _this = this;

        [].slice.call(this.elements).forEach(function (element) {
          _this.instances.push(new Instance(element, _this.id, _this.args, _this.autoInit, _this));
        });
      }

      /**
       * Push a specific action into the queue of each instance.
       * If an instance has already completed, trigger the queeu again.
       *
       * @param {string} function
       * @param {*} argument
       */

    }, {
      key: "queueUp",
      value: function queueUp(action) {
        var argument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        this.init(true);

        this.instances.forEach(function (instance) {
          instance.queue.push([instance[action], argument]);

          if (instance.isComplete === true) {
            instance.next();
          }

          //-- We KNOW we have items to process now, so make sure we set this to false.
          instance.isComplete = false;
        });
      }
    }]);
    return Core;
  }();

  var TypeIt = function (_Core) {
    inherits(TypeIt, _Core);

    function TypeIt(element, args) {
      var autoInit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      classCallCheck(this, TypeIt);
      return possibleConstructorReturn(this, (TypeIt.__proto__ || Object.getPrototypeOf(TypeIt)).call(this, element, args, autoInit));
    }

    createClass(TypeIt, [{
      key: "type",


      /**
       * If used after typing has started, will append strings to the end of the existing queue. If used when typing is paused, will restart it.
       *
       * @param  {string} string The string to be typed.
       * @return {object} TypeIt instance
       */
      value: function type() {
        var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

        this.init(true);

        this.instances.forEach(function (instance) {
          //-- Queue up a string right off the bat.
          instance.queueString(string);

          if (instance.isComplete === true) {
            instance.next();
          }

          //-- We KNOW we have items to process now, so make sure we set this to false.
          instance.isComplete = false;
        });

        return this;
      }

      /**
       * If null is passed, will delete whatever's currently in the element.
       *
       * @param  { number } numCharacters Number of characters to delete.
       * @return { TypeIt }
       */

    }, {
      key: "delete",
      value: function _delete() {
        var numCharacters = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.queueUp("delete", numCharacters);
        return this;
      }
    }, {
      key: "pause",
      value: function pause() {
        var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        this.queueUp("pause", ms);
        return this;
      }
    }, {
      key: "empty",
      value: function empty() {
        this.queueUp("empty");
        return this;
      }
    }, {
      key: "break",
      value: function _break() {
        this.queueUp("break");
        return this;
      }
    }, {
      key: "options",
      value: function options(_options) {
        this.queueUp("setOptions", _options);
        return this;
      }
    }, {
      key: "freeze",
      value: function freeze() {
        this.instances.forEach(function (instance) {
          instance.isFrozen = true;
        });
      }
    }, {
      key: "unfreeze",
      value: function unfreeze() {
        this.instances.forEach(function (instance) {
          if (!instance.isFrozen) return;

          instance.isFrozen = false;
          instance.next();
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var removeCursor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this.instances.forEach(function (instance) {
          instance.timeouts.forEach(function (timeout) {
            clearTimeout(timeout);
          });

          instance.timeouts = [];

          if (removeCursor && instance.options.cursor) {
            instance.element.removeChild(instance.element.querySelector(".ti-cursor"));
          }

          instance.hasBeenDestroyed = true;
        });
      }

      /**
       * Reset each instance with a new instance.
       */

    }, {
      key: "reset",
      value: function reset() {
        this.instances = this.instances.map(function (instance) {
          return instance.reset();
        });
      }
    }, {
      key: "init",
      value: function init() {
        var requireAutoInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        this.instances.forEach(function (instance) {
          if (!requireAutoInit) {
            instance.init();
            return;
          }

          if (instance.autoInit) {
            instance.init();
          }
        });
      }
    }, {
      key: "isComplete",
      get: function get$$1() {
        if (!this.instances.length) return false;

        return this.instances[0].isComplete;
      }
    }, {
      key: "hasBeenDestroyed",
      get: function get$$1() {
        if (!this.instances.length) return false;

        return this.instances[0].hasBeenDestroyed;
      }
    }, {
      key: "hasStarted",
      get: function get$$1() {
        if (!this.instances.length) return false;

        return this.instances[0].hasStarted;
      }
    }, {
      key: "isFrozen",
      get: function get$$1() {
        if (!this.instances.length) return false;

        return this.instances[0].isFrozen;
      }
    }]);
    return TypeIt;
  }(Core);

  return TypeIt;

})));
