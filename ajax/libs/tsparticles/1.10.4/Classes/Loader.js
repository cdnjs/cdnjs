"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Container = require("./Container");

var _Constants = require("./Utils/Constants");

var tsParticlesDom = [];
/**
 * Main class for creating the [[Container]] objects
 */

var Loader = /*#__PURE__*/function () {
  function Loader() {
    (0, _classCallCheck2["default"])(this, Loader);
  }

  (0, _createClass2["default"])(Loader, null, [{
    key: "dom",

    /**
     * All the [[Container]] objects loaded
     */
    value: function dom() {
      if (!tsParticlesDom) {
        tsParticlesDom = [];
      }

      return tsParticlesDom;
    }
    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */

  }, {
    key: "domItem",
    value: function domItem(index) {
      return Loader.dom()[index];
    }
    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */

  }, {
    key: "loadFromArray",
    value: function loadFromArray(tagId, params, index) {
      var idx;

      if (index === undefined || index < 0 || index >= params.length) {
        idx = Math.floor(Math.random() * params.length);
      } else {
        idx = index;
      }

      return Loader.load(tagId, params[idx]);
    }
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options object to initialize the [[Container]]
     */

  }, {
    key: "load",
    value: function load(tagId, params) {
      /* elements */
      var domContainer = document.getElementById(tagId);

      if (!domContainer) {
        return;
      }

      var dom = Loader.dom();
      var idx = dom.findIndex(function (v) {
        return v.id === tagId;
      });

      if (idx >= 0) {
        var old = this.domItem(idx);
        old.destroy();
      }

      var existingCanvases = domContainer.getElementsByTagName("canvas");
      var canvasEl;
      var generatedCanvas;
      /* get existing canvas if present, otherwise a new one will be created */

      if (existingCanvases.length) {
        canvasEl = existingCanvases[0];

        if (!canvasEl.className) {
          canvasEl.className = _Constants.Constants.canvasClass;
        }

        generatedCanvas = false;
      } else {
        generatedCanvas = true;
        /* create canvas element */

        canvasEl = document.createElement("canvas");
        canvasEl.className = _Constants.Constants.canvasClass;
        /* set size canvas */

        canvasEl.style.width = "100%";
        canvasEl.style.height = "100%";
        /* append canvas */

        domContainer.appendChild(canvasEl);
      }
      /* launch tsparticle */


      var newItem = new _Container.Container(tagId, params);

      if (idx >= 0) {
        dom.splice(idx, 1, newItem);
      } else {
        dom.push(newItem);
      }

      newItem.canvas.loadCanvas(canvasEl, generatedCanvas);
      newItem.start();
      return newItem;
    }
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param jsonUrl the json path to use in the GET request
     */

  }, {
    key: "loadJSON",
    value: function () {
      var _loadJSON = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(tagId, jsonUrl) {
        var response, params;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(jsonUrl);

              case 2:
                response = _context.sent;

                if (!response.ok) {
                  _context.next = 14;
                  break;
                }

                _context.next = 6;
                return response.json();

              case 6:
                params = _context.sent;

                if (!(params instanceof Array)) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", Loader.loadFromArray(tagId, params));

              case 11:
                return _context.abrupt("return", Loader.load(tagId, params));

              case 12:
                _context.next = 16;
                break;

              case 14:
                console.error("Error tsParticles - fetch status: ".concat(response.status));
                console.error("Error tsParticles - File config not found");

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function loadJSON(_x, _x2) {
        return _loadJSON.apply(this, arguments);
      }

      return loadJSON;
    }()
  }, {
    key: "setOnClickHandler",

    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    value: function setOnClickHandler(callback) {
      var dom = Loader.dom();

      if (dom.length === 0) {
        throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = dom[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var domItem = _step.value;
          var el = domItem.interactivity.element;

          if (el) {
            el.addEventListener("click", callback);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);
  return Loader;
}();

exports.Loader = Loader;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DbGFzc2VzL0xvYWRlci50cyJdLCJuYW1lcyI6WyJ0c1BhcnRpY2xlc0RvbSIsIkxvYWRlciIsImluZGV4IiwiZG9tIiwidGFnSWQiLCJwYXJhbXMiLCJpZHgiLCJ1bmRlZmluZWQiLCJsZW5ndGgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJsb2FkIiwiZG9tQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZpbmRJbmRleCIsInYiLCJpZCIsIm9sZCIsImRvbUl0ZW0iLCJkZXN0cm95IiwiZXhpc3RpbmdDYW52YXNlcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2FudmFzRWwiLCJnZW5lcmF0ZWRDYW52YXMiLCJjbGFzc05hbWUiLCJDb25zdGFudHMiLCJjYW52YXNDbGFzcyIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsIndpZHRoIiwiaGVpZ2h0IiwiYXBwZW5kQ2hpbGQiLCJuZXdJdGVtIiwiQ29udGFpbmVyIiwic3BsaWNlIiwicHVzaCIsImNhbnZhcyIsImxvYWRDYW52YXMiLCJzdGFydCIsImpzb25VcmwiLCJmZXRjaCIsInJlc3BvbnNlIiwib2siLCJqc29uIiwiQXJyYXkiLCJsb2FkRnJvbUFycmF5IiwiY29uc29sZSIsImVycm9yIiwic3RhdHVzIiwiY2FsbGJhY2siLCJFcnJvciIsImVsIiwiaW50ZXJhY3Rpdml0eSIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFHQTs7QUFFQSxJQUFJQSxjQUEyQixHQUFHLEVBQWxDO0FBRUE7Ozs7SUFHYUMsTTs7Ozs7Ozs7QUFDVDs7OzBCQUdpQztBQUM3QixVQUFJLENBQUNELGNBQUwsRUFBcUI7QUFDakJBLFFBQUFBLGNBQWMsR0FBRyxFQUFqQjtBQUNIOztBQUVELGFBQU9BLGNBQVA7QUFDSDtBQUVEOzs7Ozs7OzRCQUlzQkUsSyxFQUEwQjtBQUM1QyxhQUFPRCxNQUFN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cUMsTzs7Ozs7Ozt1QkFFakJDLEtBQUssQ0FBQ0QsT0FBRCxDOzs7QUFBdEJFLGdCQUFBQSxROztxQkFFRkEsUUFBUSxDQUFDQyxFOzs7Ozs7dUJBQ1lELFFBQVEsQ0FBQ0UsSUFBVCxFOzs7QUFBZnhDLGdCQUFBQSxNOztzQkFFRkEsTUFBTSxZQUFZeUMsSzs7Ozs7aURBQ1g3QyxNQUFNLENBQUM4QyxhQUFQLENBQXFCM0MsS0FBckIsRUFBNEJDLE1BQTVCLEM7OztpREFFQUosTUFBTSxDQUFDVyxJQUFQLENBQVlSLEtBQVosRUFBbUJDLE1BQW5CLEM7Ozs7Ozs7QUFHWDJDLGdCQUFBQSxPQUFPLENBQUNDLEtBQVIsNkNBQW1ETixRQUFRLENBQUNPLE1BQTVEO0FBQ0FGLGdCQUFBQSxPQUFPLENBQUNDLEtBQVIsQ0FBYywyQ0FBZDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlSOzs7O3NDQUlnQ0UsUSxFQUFvRDtBQUNoRixVQUFNaEQsR0FBRyxHQUFHRixNQUFNLENBQUNFLEdBQVAsRUFBWjs7QUFFQSxVQUFJQSxHQUFHLENBQUNLLE1BQUosS0FBZSxDQUFuQixFQUFzQjtBQUNsQixjQUFNLElBQUk0QyxLQUFKLENBQVUsd0ZBQVYsQ0FBTjtBQUNIOztBQUwrRTtBQUFBO0FBQUE7O0FBQUE7QUFPaEYsNkJBQXNCakQsR0FBdEIsOEhBQTJCO0FBQUEsY0FBaEJpQixPQUFnQjtBQUN2QixjQUFNaUMsRUFBRSxHQUFHakMsT0FBTyxDQUFDa0MsYUFBUixDQUFzQkMsT0FBakM7O0FBRUEsY0FBSUYsRUFBSixFQUFRO0FBQ0pBLFlBQUFBLEVBQUUsQ0FBQ0csZ0JBQUgsQ0FBb0IsT0FBcEIsRUFBNkJMLFFBQTdCO0FBQ0g7QUFDSjtBQWIrRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBY25GIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7Q29udGFpbmVyfSBmcm9tIFwiLi9Db250YWluZXJcIjtcbmltcG9ydCB7SU9wdGlvbnN9IGZyb20gXCIuLi9JbnRlcmZhY2VzL09wdGlvbnMvSU9wdGlvbnNcIjtcbmltcG9ydCB7UmVjdXJzaXZlUGFydGlhbH0gZnJvbSBcIi4uL1R5cGVzL1JlY3Vyc2l2ZVBhcnRpYWxcIjtcbmltcG9ydCB7Q29uc3RhbnRzfSBmcm9tIFwiLi9VdGlscy9Db25zdGFudHNcIjtcblxubGV0IHRzUGFydGljbGVzRG9tOiBDb250YWluZXJbXSA9IFtdO1xuXG4vKipcbiAqIE1haW4gY2xhc3MgZm9yIGNyZWF0aW5nIHRoZSBbW0NvbnRhaW5lcl1dIG9iamVjdHNcbiAqL1xuZXhwb3J0IGNsYXNzIExvYWRlciB7XG4gICAgLyoqXG4gICAgICogQWxsIHRoZSBbW0NvbnRhaW5lcl1dIG9iamVjdHMgbG9hZGVkXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBkb20oKTogQ29udGFpbmVyW10ge1xuICAgICAgICBpZiAoIXRzUGFydGljbGVzRG9tKSB7XG4gICAgICAgICAgICB0c1BhcnRpY2xlc0RvbSA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRzUGFydGljbGVzRG9tO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHJpZXZlcyBhIFtbQ29udGFpbmVyXV0gZnJvbSBhbGwgdGhlIG9iamVjdHMgbG9hZGVkXG4gICAgICogQHBhcmFtIGluZGV4IHRoZSBvYmplY3QgaW5kZXhcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGRvbUl0ZW0oaW5kZXg6IG51bWJlcik6IENvbnRhaW5lciB7XG4gICAgICAgIHJldHVybiBMb2FkZXIuZG9tKClbaW5kZXhdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIGFuIG9wdGlvbnMgb2JqZWN0IGZyb20gdGhlIHByb3ZpZGVkIGFycmF5IHRvIGNyZWF0ZSBhIFtbQ29udGFpbmVyXV0gb2JqZWN0LlxuICAgICAqIEBwYXJhbSB0YWdJZCB0aGUgcGFydGljbGVzIGNvbnRhaW5lciBlbGVtZW50IGlkXG4gICAgICogQHBhcmFtIHBhcmFtcyB0aGUgb3B0aW9ucyBhcnJheSB0byBnZXQgdGhlIGl0ZW0gZnJvbVxuICAgICAqIEBwYXJhbSBpbmRleCBpZiBwcm92aWRlZCBnZXRzIHRoZSBjb3JyZXNwb25kaW5nIGl0ZW0gZnJvbSB0aGUgYXJyYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGxvYWRGcm9tQXJyYXkodGFnSWQ6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBSZWN1cnNpdmVQYXJ0aWFsPElPcHRpb25zPltdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleD86IG51bWJlcik6IENvbnRhaW5lciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGxldCBpZHg6IG51bWJlcjtcblxuICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCB8fCBpbmRleCA8IDAgfHwgaW5kZXggPj0gcGFyYW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcGFyYW1zLmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZHggPSBpbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBMb2FkZXIubG9hZCh0YWdJZCwgcGFyYW1zW2lkeF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBwcm92aWRlZCBvcHRpb25zIHRvIGNyZWF0ZSBhIFtbQ29udGFpbmVyXV0gb2JqZWN0LlxuICAgICAqIEBwYXJhbSB0YWdJZCB0aGUgcGFydGljbGVzIGNvbnRhaW5lciBlbGVtZW50IGlkXG4gICAgICogQHBhcmFtIHBhcmFtcyB0aGUgb3B0aW9ucyBvYmplY3QgdG8gaW5pdGlhbGl6ZSB0aGUgW1tDb250YWluZXJdXVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgbG9hZCh0YWdJZDogc3RyaW5nLCBwYXJhbXM/OiBSZWN1cnNpdmVQYXJ0aWFsPElPcHRpb25zPik6IENvbnRhaW5lciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIC8qIGVsZW1lbnRzICovXG4gICAgICAgIGNvbnN0IGRvbUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhZ0lkKTtcblxuICAgICAgICBpZiAoIWRvbUNvbnRhaW5lcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZG9tID0gTG9hZGVyLmRvbSgpO1xuICAgICAgICBjb25zdCBpZHggPSBkb20uZmluZEluZGV4KCh2KSA9PiB2LmlkID09PSB0YWdJZCk7XG5cbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBvbGQgPSB0aGlzLmRvbUl0ZW0oaWR4KTtcblxuICAgICAgICAgICAgb2xkLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nQ2FudmFzZXMgPSBkb21Db250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJjYW52YXNcIik7XG5cbiAgICAgICAgbGV0IGNhbnZhc0VsOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgICAgICAgbGV0IGdlbmVyYXRlZENhbnZhczogYm9vbGVhbjtcblxuICAgICAgICAvKiBnZXQgZXhpc3RpbmcgY2FudmFzIGlmIHByZXNlbnQsIG90aGVyd2lzZSBhIG5ldyBvbmUgd2lsbCBiZSBjcmVhdGVkICovXG4gICAgICAgIGlmIChleGlzdGluZ0NhbnZhc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FudmFzRWwgPSBleGlzdGluZ0NhbnZhc2VzWzBdO1xuXG4gICAgICAgICAgICBpZiAoIWNhbnZhc0VsLmNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGNhbnZhc0VsLmNsYXNzTmFtZSA9IENvbnN0YW50cy5jYW52YXNDbGFzcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2VuZXJhdGVkQ2FudmFzID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZW5lcmF0ZWRDYW52YXMgPSB0cnVlO1xuICAgICAgICAgICAgLyogY3JlYXRlIGNhbnZhcyBlbGVtZW50ICovXG4gICAgICAgICAgICBjYW52YXNFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbiAgICAgICAgICAgIGNhbnZhc0VsLmNsYXNzTmFtZSA9IENvbnN0YW50cy5jYW52YXNDbGFzcztcblxuICAgICAgICAgICAgLyogc2V0IHNpemUgY2FudmFzICovXG4gICAgICAgICAgICBjYW52YXNFbC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICAgICAgY2FudmFzRWwuc3R5bGUuaGVpZ2h0ID0gXCIxMDAlXCI7XG5cbiAgICAgICAgICAgIC8qIGFwcGVuZCBjYW52YXMgKi9cbiAgICAgICAgICAgIGRvbUNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXNFbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBsYXVuY2ggdHNwYXJ0aWNsZSAqL1xuICAgICAgICBjb25zdCBuZXdJdGVtID0gbmV3IENvbnRhaW5lcih0YWdJZCwgcGFyYW1zKTtcblxuICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIGRvbS5zcGxpY2UoaWR4LCAxLCBuZXdJdGVtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5wdXNoKG5ld0l0ZW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV3SXRlbS5jYW52YXMubG9hZENhbnZhcyhjYW52YXNFbCwgZ2VuZXJhdGVkQ2FudmFzKTtcbiAgICAgICAgbmV3SXRlbS5zdGFydCgpO1xuXG4gICAgICAgIHJldHVybiBuZXdJdGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBwcm92aWRlZCBqc29uIHdpdGggYSBHRVQgcmVxdWVzdC4gVGhlIGNvbnRlbnQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSBhIFtbQ29udGFpbmVyXV0gb2JqZWN0LlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGFzeW5jLCBzbyBpZiB5b3UgbmVlZCBhIGNhbGxiYWNrIHJlZmVyIHRvIEphdmFTY3JpcHQgZnVuY3Rpb24gYGZldGNoYFxuICAgICAqIEBwYXJhbSB0YWdJZCB0aGUgcGFydGljbGVzIGNvbnRhaW5lciBlbGVtZW50IGlkXG4gICAgICogQHBhcmFtIGpzb25VcmwgdGhlIGpzb24gcGF0aCB0byB1c2UgaW4gdGhlIEdFVCByZXF1ZXN0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBhc3luYyBsb2FkSlNPTih0YWdJZDogc3RyaW5nLCBqc29uVXJsOiBzdHJpbmcpOiBQcm9taXNlPENvbnRhaW5lciB8IHVuZGVmaW5lZD4ge1xuICAgICAgICAvKiBsb2FkIGpzb24gY29uZmlnICovXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goanNvblVybCk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmIChwYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBMb2FkZXIubG9hZEZyb21BcnJheSh0YWdJZCwgcGFyYW1zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIExvYWRlci5sb2FkKHRhZ0lkLCBwYXJhbXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgdHNQYXJ0aWNsZXMgLSBmZXRjaCBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHRzUGFydGljbGVzIC0gRmlsZSBjb25maWcgbm90IGZvdW5kXCIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gYWRkaXRpb25hbCBjbGljayBoYW5kbGVyIHRvIGFsbCB0aGUgbG9hZGVkIFtbQ29udGFpbmVyXV0gb2JqZWN0cy5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgdGhlIGZ1bmN0aW9uIGNhbGxlZCBhZnRlciB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNldE9uQ2xpY2tIYW5kbGVyKGNhbGxiYWNrOiBFdmVudExpc3RlbmVyT3JFdmVudExpc3RlbmVyT2JqZWN0KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRvbSA9IExvYWRlci5kb20oKTtcblxuICAgICAgICBpZiAoZG9tLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuIG9ubHkgc2V0IGNsaWNrIGhhbmRsZXJzIGFmdGVyIGNhbGxpbmcgdHNQYXJ0aWNsZXMubG9hZCgpIG9yIHRzUGFydGljbGVzLmxvYWRKU09OKClcIik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGNvbnN0IGRvbUl0ZW0gb2YgZG9tKSB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGRvbUl0ZW0uaW50ZXJhY3Rpdml0eS5lbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19