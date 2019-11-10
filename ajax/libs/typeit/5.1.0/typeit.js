/*!
 *
 *   typeit - The most versatile animated typing utility on the planet.
 *   Author: Alex MacArthur <alex@macarthur.me> (https://macarthur.me)
 *   Version: v5.1.0
 *   URL: https://typeitjs.com
 *   License: GPL-2.0
 *
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.TypeIt = factory());
}(this, (function () { 'use strict';

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

var Instance = function () {
  function Instance(element, id, options) {
    classCallCheck(this, Instance);

    this.defaults = {
      strings: [],
      speed: 100,
      deleteSpeed: undefined,
      lifeLike: true,
      cursor: true,
      cursorSpeed: 1000,
      breakLines: true,
      startDelay: 250,
      startDelete: false,
      nextStringDelay: 750,
      loop: false,
      loopDelay: 750,
      html: true,
      autoStart: true,
      callback: function callback() {}
    };

    this.timeouts = [];
    this.id = id;
    this.queue = [];
    this.queueIndex = 0;
    this.hasStarted = false;
    this.inTag = false;
    this.stringsToDelete = "";
    this.style = 'style="display:inline;position:relative;font:inherit;color:inherit;"';
    this.element = element;

    this.setOptions(options, this.defaults, false);
    this.init();
  }

  createClass(Instance, [{
    key: "init",
    value: function init() {
      this.checkElement();

      this.options.strings = this.toArray(this.options.strings);
      this.options.strings = this.removeComments(this.options.strings);

      //-- We don't have anything. Get out of here.
      if (this.options.strings.length >= 1 && this.options.strings[0] === "") {
        return;
      }

      this.element.innerHTML = '<i class="ti-placeholder" style="display:inline-block;width:0;line-height:0;overflow:hidden;">.</i><span ' + this.style + ' class="ti-container"></span>';

      this.element.setAttribute("data-typeitid", this.id);
      this.elementContainer = this.element.querySelector("span");

      if (this.options.startDelete) {
        this.insert(this.stringsToDelete);
        this.queue.push([this.delete]);
        this.insertPauseIntoQueue(1);
      }

      this.generateQueue();
      this.kickoff();
    }
  }, {
    key: "removeComments",
    value: function removeComments(arrayOfStrings) {
      return arrayOfStrings.map(function (string) {
        return string.replace(/<\!--.*?-->/g, "");
      });
    }
  }, {
    key: "generateQueue",
    value: function generateQueue() {
      for (var i = 0; i < this.options.strings.length; i++) {
        this.queue.push([this.type, this.options.strings[i]]);

        if (i < this.options.strings.length - 1) {
          this.queue.push([this.options.breakLines ? this.break : this.delete]);
          this.insertPauseIntoQueue(this.queue.length);
        }
      }
    }
  }, {
    key: "insertPauseIntoQueue",
    value: function insertPauseIntoQueue(position) {
      var halfDelay = this.options.nextStringDelay / 2;
      this.queue.splice(position - 1, 0, [this.pause, halfDelay]);
      this.queue.splice(position + 2, 0, [this.pause, halfDelay]);
    }
  }, {
    key: "kickoff",
    value: function kickoff() {
      this.cursor();

      if (this.options.autoStart) {
        this.startQueue();
      } else {
        if (this.isVisible()) {
          this.hasStarted = true;
          this.startQueue();
        } else {
          var that = this;

          window.addEventListener("scroll", function checkForStart(event) {
            if (that.isVisible() && !that.hasStarted) {
              that.hasStarted = true;
              that.startQueue();
              event.currentTarget.removeEventListener(event.type, checkForStart);
            }
          });
        }
      }
    }
  }, {
    key: "startQueue",
    value: function startQueue() {
      var _this = this;

      setTimeout(function () {
        _this.executeQueue();
      }, this.options.startDelay);
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      var coordinates = this.element.getBoundingClientRect();

      var viewport = {
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      };

      //-- Element extends outside of viewport.
      if (coordinates.right > viewport.width || coordinates.bottom > viewport.height) {
        return false;
      }

      //-- Top or left aren't visible.
      if (coordinates.top < 0 || coordinates.left < 0) {
        return false;
      }

      return true;
    }
  }, {
    key: "cursor",
    value: function cursor() {
      if (!this.options.cursor) return;

      var styleBlock = document.createElement("style");

      styleBlock.id = this.id;

      var styles = "\n          @keyframes blink-" + this.id + " {\n            0% {opacity: 0}\n            49%{opacity: 0}\n            50% {opacity: 1}\n          }\n\n          [data-typeitid='" + this.id + "'] .ti-cursor {\n            animation: blink-" + this.id + " " + this.options.cursorSpeed / 1000 + "s infinite;\n          }\n        ";

      styleBlock.appendChild(document.createTextNode(styles));

      document.head.appendChild(styleBlock);

      this.element.insertAdjacentHTML("beforeend", "<span " + this.style + 'class="ti-cursor">|</span>');
    }

    /**
     * Appends string to element container.
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

      //-- Split & rejoin to avoid odd spacing issues in some browsers.
      this.elementContainer.innerHTML = this.elementContainer.innerHTML.split("").join("");
    }

    /**
     * Converts a string to an array, if it's not already.
     *
     * @return array
     */

  }, {
    key: "toArray",
    value: function toArray$$1(string) {
      return string.constructor === Array ? string.slice(0) : string.split("<br>");
    }

    /**
     * Depending on if we're starting by deleting an existing string or typing
     * from nothing, set a specific variable to what's in the HTML.
     */

  }, {
    key: "checkElement",
    value: function checkElement() {
      if (!this.options.startDelete && this.element.innerHTML.length > 0) {
        this.options.strings = this.element.innerHTML.trim();
      } else {
        this.stringsToDelete = this.element.innerHTML;
      }
    }
  }, {
    key: "break",
    value: function _break() {
      this.insert("<br>");
      this.executeQueue();
    }
  }, {
    key: "pause",
    value: function pause(time) {
      var _this2 = this;

      time = time === undefined ? this.options.nextStringDelay : time;

      setTimeout(function () {
        _this2.executeQueue();
      }, time);
    }

    /*
      Convert each string in the array to a sub-array. While happening, search the subarrays for HTML tags.
      When a complete tag is found, slice the subarray to get the complete tag, insert it at the correct index,
      and delete the range of indexes where the indexed tag used to be.
    */

  }, {
    key: "rake",
    value: function rake(array) {
      var _this3 = this;

      return array.map(function (item) {
        //-- Convert string to array.
        item = item.split("");

        //-- If we're parsing HTML, group tags into their own array items.
        if (_this3.options.html) {
          var tPosition = [];
          var tag = void 0;
          var isEntity = false;

          for (var j = 0; j < item.length; j++) {
            if (item[j] === "<" || item[j] === "&") {
              tPosition[0] = j;
              isEntity = item[j] === "&";
            }

            if (item[j] === ">" || item[j] === ";" && isEntity) {
              tPosition[1] = j;
              j = 0;
              tag = item.slice(tPosition[0], tPosition[1] + 1).join("");
              item.splice(tPosition[0], tPosition[1] - tPosition[0] + 1, tag);
              isEntity = false;
            }
          }
        }

        return item;
      });
    }
  }, {
    key: "print",
    value: function print(character) {
      if (this.inTag) {
        this.insert(character, true);

        if (this.tagCount < this.tagDuration) {
          this.tagCount++;
        } else {
          this.inTag = false;
        }
      } else {
        this.insert(character);
      }
    }

    /**
     * Pass in a string, and loop over that string until empty. Then return true.
     */

  }, {
    key: "type",
    value: function type(string) {
      var _this4 = this;

      var rake = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      string = this.toArray(string);

      //-- If it's designated, rake that bad boy for HTML tags and stuff.
      if (rake) {
        string = this.rake(string);
        string = string[0];
      }

      this.timeouts[0] = setTimeout(function () {
        //-- Randomize the timeout each time, if that's your thing.
        _this4.setPace(_this4);

        //-- If an opening HTML tag is found and we're not already printing inside a tag
        if (_this4.options.html && string[0].indexOf("<") !== -1 && string[0].indexOf("</") === -1 && !_this4.inTag) {
          //-- loop the string to find where the tag ends
          for (var i = string.length - 1; i >= 0; i--) {
            if (string[i].indexOf("</") !== -1) {
              _this4.tagCount = 1;
              _this4.tagDuration = i;
            }
          }

          _this4.inTag = true;

          //-- Create node of that string name.
          var matches = string[0].match(/\<(.*?)\>/);
          var doc = document.implementation.createHTMLDocument();
          doc.body.innerHTML = "<" + matches[1] + "></" + matches[1] + ">";

          //-- Add that new node to the element.
          _this4.elementContainer.appendChild(doc.body.children[0]);
        } else {
          _this4.print(string[0]);
        }

        //-- Shorten it by one character.
        string.splice(0, 1);

        //-- If there's more to it, run again until fully printed.
        if (string.length) {
          _this4.type(string, false);
        } else {
          _this4.executeQueue();
        }
      }, this.typePace);
    }

    /**
     * Removes helper elements with certain classes from the TypeIt element.
     */

  }, {
    key: "removeHelperElements",
    value: function removeHelperElements() {
      var _this5 = this;

      var helperElements = this.element.querySelectorAll(".ti-container, .ti-cursor, .ti-placeholder");
      [].forEach.call(helperElements, function (helperElement) {
        _this5.element.removeChild(helperElement);
      });
    }
  }, {
    key: "setOptions",
    value: function setOptions(settings) {
      var defaults$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var autoExecuteQueue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

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

      if (autoExecuteQueue) {
        this.executeQueue();
      }
    }
  }, {
    key: "randomInRange",
    value: function randomInRange(value, range) {
      return Math.abs(Math.random() * (value + range - (value - range)) + (value - range));
    }
  }, {
    key: "setPace",
    value: function setPace() {
      var typeSpeed = this.options.speed;
      var deleteSpeed = this.options.deleteSpeed !== undefined ? this.options.deleteSpeed : this.options.speed / 3;
      var typeRange = typeSpeed / 2;
      var deleteRange = deleteSpeed / 2;

      this.typePace = this.options.lifeLike ? this.randomInRange(typeSpeed, typeRange) : typeSpeed;
      this.deletePace = this.options.lifeLike ? this.randomInRange(deleteSpeed, deleteRange) : deleteSpeed;
    }
  }, {
    key: "delete",
    value: function _delete() {
      var _this6 = this;

      var chars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this.timeouts[1] = setTimeout(function () {
        _this6.setPace();

        var textArray = _this6.elementContainer.innerHTML.split("");

        var amount = chars === null ? textArray.length - 1 : chars + 1;

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
        if (_this6.elementContainer.innerHTML.indexOf("></") > -1) {
          for (var i = _this6.elementContainer.innerHTML.indexOf("></") - 2; i >= 0; i--) {
            if (textArray[i] === "<") {
              textArray.splice(i, textArray.length - i);
              break;
            }
          }
        }

        _this6.elementContainer.innerHTML = textArray.join("");

        //-- Characters still in the string.
        if (amount > (chars === null ? 0 : 2)) {
          _this6.delete(chars === null ? null : chars - 1);
        } else {
          _this6.executeQueue();
        }
      }, this.deletePace);
    }

    /*
      Empty the existing text, clearing it instantly.
    */

  }, {
    key: "empty",
    value: function empty() {
      this.elementContainer.innerHTML = "";
      this.executeQueue();
    }
  }, {
    key: "executeQueue",
    value: function executeQueue() {
      var _this7 = this;

      if (this.queueIndex < this.queue.length) {
        var thisFunc = this.queue[this.queueIndex];
        this.queueIndex++;

        //-- Delay execution if looping back to the beginning of the queue.
        if (this.isLooping && this.queueIndex === 1) {
          setTimeout(function () {
            thisFunc[0].call(_this7, thisFunc[1]);
          }, this.options.loopDelay / 2);
        } else {
          thisFunc[0].call(this, thisFunc[1]);
        }

        return;
      }

      this.options.callback();

      if (this.options.loop) {
        this.queueIndex = 0;
        this.isLooping = true;
        setTimeout(function () {
          _this7.delete();
        }, this.options.loopDelay / 2);
      }
    }
  }]);
  return Instance;
}();

var TypeIt = function () {
  function TypeIt(element, args) {
    classCallCheck(this, TypeIt);

    this.id = this.generateHash();
    this.instances = [];
    this.elements = [];
    this.args = args;

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

    this.createInstances();
  }

  createClass(TypeIt, [{
    key: "generateHash",
    value: function generateHash() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
  }, {
    key: "createInstances",
    value: function createInstances() {
      var _this = this;

      [].slice.call(this.elements).forEach(function (element) {
        _this.instances.push(new Instance(element, _this.id, _this.args));
      });
    }
  }, {
    key: "pushAction",
    value: function pushAction(func) {
      var argument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      this.instances.forEach(function (instance) {
        instance.queue.push([instance[func], argument]);
      });
    }
  }, {
    key: "type",
    value: function type(string) {
      this.pushAction("type", string);
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var removeCursor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      this.instances.forEach(function (instance) {
        instance.timeouts.forEach(function (timeout) {
          clearTimeout(timeout);
        });

        if (removeCursor) {
          instance.element.removeChild(instance.element.querySelector(".ti-cursor"));
        }
      });

      this.instances = [];
    }
  }, {
    key: "delete",
    value: function _delete(numCharacters) {
      this.pushAction("delete", numCharacters);
      return this;
    }
  }, {
    key: "empty",
    value: function empty() {
      this.pushAction("empty");
      return this;
    }
  }, {
    key: "pause",
    value: function pause(ms) {
      this.pushAction("pause", ms);
      return this;
    }
  }, {
    key: "break",
    value: function _break() {
      this.pushAction("break");
      return this;
    }
  }, {
    key: "options",
    value: function options(_options) {
      this.pushAction("setOptions", _options);
      return this;
    }
  }]);
  return TypeIt;
}();

return TypeIt;

})));
