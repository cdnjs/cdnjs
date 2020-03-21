"use strict";
/* -----------------------------------------------
/* Author : Matteo Bruni - https://www.matteobruni.it
/* MIT license: https://opensource.org/licenses/MIT
/* Demo / Generator : https://particles.matteobruni.it/
/* GitHub : https://www.github.com/matteobruni/tsparticles
/* How to use? : Check the GitHub README
/* v1.10.4
/* ----------------------------------------------- */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Loader = require("./Classes/Loader");

var _support = require("./support");

/* ---------- global functions - vendors ------------ */
window.customRequestAnimationFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
}();

window.customCancelRequestAnimationFrame = function () {
  return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
}();
/* ---------- tsParticles functions - start ------------ */

/**
 * Main class for creating the singleton on window.
 * It's a proxy to the static [[Loader]] class
 */


var Main = /*#__PURE__*/function () {
  function Main() {
    (0, _classCallCheck2["default"])(this, Main);
  }

  (0, _createClass2["default"])(Main, [{
    key: "loadFromArray",

    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */
    value: function loadFromArray(tagId, params, index) {
      return _Loader.Loader.loadFromArray(tagId, params, index);
    }
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options object to initialize the [[Container]]
     */

  }, {
    key: "load",
    value: function load(tagId, params) {
      return _Loader.Loader.load(tagId, params);
    }
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param pathConfigJson the json path to use in the GET request
     */

  }, {
    key: "loadJSON",
    value: function loadJSON(tagId, pathConfigJson) {
      return _Loader.Loader.loadJSON(tagId, pathConfigJson);
    }
    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */

  }, {
    key: "setOnClickHandler",
    value: function setOnClickHandler(callback) {
      _Loader.Loader.setOnClickHandler(callback);
    }
    /**
     * All the [[Container]] objects loaded
     */

  }, {
    key: "dom",
    value: function dom() {
      return _Loader.Loader.dom();
    }
    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */

  }, {
    key: "domItem",
    value: function domItem(index) {
      return _Loader.Loader.domItem(index);
    }
  }]);
  return Main;
}();
/**
 * The new singleton, replacing the old particlesJS
 */


window.tsParticles = new Main();
Object.freeze(window.tsParticles);
/* particles.js compatibility */

/**
 * Loads the provided options to create a [[Container]] object.
 * @deprecated this method is obsolete, please use the new tsParticles.load
 * @param tagId the particles container element id
 * @param params the options object to initialize the [[Container]]
 */

window.particlesJS = function (tagId, params) {
  return _support.ParticlesJS.load(tagId, params);
};
/**
 * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
 * @deprecated this method is obsolete, please use the new tsParticles.loadJSON
 * @param tagId the particles container element id
 * @param pathConfigJson the json path to use in the GET request
 * @param callback the function called after the [[Container]] object is loaded that will be passed as a parameter
 */


window.particlesJS.load = function (tagId, pathConfigJson, callback) {
  return _support.ParticlesJS.loadJson(tagId, pathConfigJson, callback);
};
/**
 * Adds an additional click handler to all the loaded [[Container]] objects.
 * @deprecated this method is obsolete, please use the new tsParticles.setOnClickHandler
 * @param callback the function called after the click event is fired
 */


window.particlesJS.setOnClickHandler = function (callback) {
  return _support.ParticlesJS.setOnClickHandler(callback);
};
/**
 * All the [[Container]] objects loaded
 * @deprecated this method is obsolete, please use the new tsParticles.dom
 */


window.pJSDom = function () {
  if (console) {
    console.warn("this method is obsolete, please use the new tsParticles.dom");
  }

  return window.tsParticles.dom();
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9NYWluLnRzIl0sIm5hbWVzIjpbIndpbmRvdyIsImN1c3RvbVJlcXVlc3RBbmltYXRpb25GcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJtc1JlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbGxiYWNrIiwic2V0VGltZW91dCIsImN1c3RvbUNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwid2Via2l0Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXJUaW1lb3V0IiwiTWFpbiIsInRhZ0lkIiwicGFyYW1zIiwiaW5kZXgiLCJMb2FkZXIiLCJsb2FkRnJvbUFycmF5IiwibG9hZCIsInBhdGhDb25maWdKc29uIiwibG9hZEpTT04iLCJzZXRPbkNsaWNrSGFuZGxlciIsImRvbSIsImRvbUl0ZW0iLCJ0c1BhcnRpY2xlcyIsIk9iamVjdCIsImZyZWV6ZSIsInBhcnRpY2xlc0pTIiwiUGFydGljbGVzSlMiLCJsb2FkSnNvbiIsInBKU0RvbSIsImNvbnNvbGUiLCJ3YXJuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUFTQTs7QUFFQTs7QUFZQTtBQUVBQSxNQUFNLENBQUNDLDJCQUFQLEdBQXNDLFlBQU07QUFDeEMsU0FBT0QsTUFBTSxDQUFDRSxxQkFBUCxJQUNIRixNQUFNLENBQUNHLDJCQURKLElBRUhILE1BQU0sQ0FBQ0ksd0JBRkosSUFHSEosTUFBTSxDQUFDSyxzQkFISixJQUlITCxNQUFNLENBQUNNLHVCQUpKLElBS0YsVUFBQ0MsUUFBRDtBQUFBLFdBQWNQLE1BQU0sQ0FBQ1EsVUFBUCxDQUFrQkQsUUFBbEIsRUFBNEIsT0FBTyxFQUFuQyxDQUFkO0FBQUEsR0FMTDtBQU1ILENBUG9DLEVBQXJDOztBQVNBUCxNQUFNLENBQUNTLGlDQUFQLEdBQTRDLFlBQU07QUFDOUMsU0FBT1QsTUFBTSxDQUFDVSxvQkFBUCxJQUNIVixNQUFNLENBQUNXLGlDQURKLElBRUhYLE1BQU0sQ0FBQ1ksOEJBRkosSUFHSFosTUFBTSxDQUFDYSw0QkFISixJQUlIYixNQUFNLENBQUNjLDZCQUpKLElBS0hDLFlBTEo7QUFNSCxDQVAwQyxFQUEzQztBQVNBOztBQUVBOzs7Ozs7SUFJTUMsSTs7Ozs7Ozs7QUFDRjs7Ozs7O2tDQU1xQkMsSyxFQUFlQyxNLEVBQXNDQyxLLEVBQXVDO0FBQzdHLGFBQU9DLGVBQU9DLGFBQVAsQ0FBcUJKLEtBQXJCLEVBQTRCQyxNQUE1QixFQUFvQ0MsS0FBcEMsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7O3lCQUtZRixLLEVBQWVDLE0sRUFBMkQ7QUFDbEYsYUFBT0UsZUFBT0UsSUFBUCxDQUFZTCxLQUFaLEVBQW1CQyxNQUFuQixDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OzZCQU1nQkQsSyxFQUFlTSxjLEVBQXdEO0FBQ25GLGFBQU9ILGVBQU9JLFFBQVAsQ0FBZ0JQLEtBQWhCLEVBQXVCTSxjQUF2QixDQUFQO0FBQ0g7QUFFRDs7Ozs7OztzQ0FJeUJoQixRLEVBQW9EO0FBQ3pFYSxxQkFBT0ssaUJBQVAsQ0FBeUJsQixRQUF6QjtBQUNIO0FBRUQ7Ozs7OzswQkFHMEI7QUFDdEIsYUFBT2EsZUFBT00sR0FBUCxFQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs0QkFJZVAsSyxFQUEwQjtBQUNyQyxhQUFPQyxlQUFPTyxPQUFQLENBQWVSLEtBQWYsQ0FBUDtBQUNIOzs7O0FBR0w7Ozs7O0FBR0FuQixNQUFNLENBQUM0QixXQUFQLEdBQXFCLElBQUlaLElBQUosRUFBckI7QUFFQWEsTUFBTSxDQUFDQyxNQUFQLENBQWM5QixNQUFNLENBQUM0QixXQUFyQjtBQUVBOztBQUVBOzs7Ozs7O0FBTUE1QixNQUFNLENBQUMrQixXQUFQLEdBQXFCLFVBQUNkLEtBQUQsRUFBZ0JDLE1BQWhCO0FBQUEsU0FBdURjLHFCQUFZVixJQUFaLENBQWlCTCxLQUFqQixFQUF3QkMsTUFBeEIsQ0FBdkQ7QUFBQSxDQUFyQjtBQUVBOzs7Ozs7Ozs7QUFPQWxCLE1BQU0sQ0FBQytCLFdBQVAsQ0FBbUJULElBQW5CLEdBQTBCLFVBQUNMLEtBQUQsRUFBZ0JNLGNBQWhCLEVBQXdDaEIsUUFBeEM7QUFBQSxTQUN0QnlCLHFCQUFZQyxRQUFaLENBQXFCaEIsS0FBckIsRUFBNEJNLGNBQTVCLEVBQTRDaEIsUUFBNUMsQ0FEc0I7QUFBQSxDQUExQjtBQUdBOzs7Ozs7O0FBS0FQLE1BQU0sQ0FBQytCLFdBQVAsQ0FBbUJOLGlCQUFuQixHQUF1QyxVQUFDbEIsUUFBRDtBQUFBLFNBQ25DeUIscUJBQVlQLGlCQUFaLENBQThCbEIsUUFBOUIsQ0FEbUM7QUFBQSxDQUF2QztBQUdBOzs7Ozs7QUFJQVAsTUFBTSxDQUFDa0MsTUFBUCxHQUFnQixZQUFNO0FBQ2xCLE1BQUlDLE9BQUosRUFBYTtBQUNUQSxJQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSw2REFBYjtBQUNIOztBQUVELFNBQU9wQyxNQUFNLENBQUM0QixXQUFQLENBQW1CRixHQUFuQixFQUFQO0FBQ0gsQ0FORCIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyogQXV0aG9yIDogTWF0dGVvIEJydW5pIC0gaHR0cHM6Ly93d3cubWF0dGVvYnJ1bmkuaXRcbi8qIE1JVCBsaWNlbnNlOiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuLyogRGVtbyAvIEdlbmVyYXRvciA6IGh0dHBzOi8vcGFydGljbGVzLm1hdHRlb2JydW5pLml0L1xuLyogR2l0SHViIDogaHR0cHM6Ly93d3cuZ2l0aHViLmNvbS9tYXR0ZW9icnVuaS90c3BhcnRpY2xlc1xuLyogSG93IHRvIHVzZT8gOiBDaGVjayB0aGUgR2l0SHViIFJFQURNRVxuLyogdjEuMTAuNFxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmltcG9ydCB7Q29udGFpbmVyfSBmcm9tIFwiLi9DbGFzc2VzL0NvbnRhaW5lclwiO1xuaW1wb3J0IHtMb2FkZXJ9IGZyb20gXCIuL0NsYXNzZXMvTG9hZGVyXCI7XG5pbXBvcnQge0lQYXJ0aWNsZXNKc30gZnJvbSBcIi4vSW50ZXJmYWNlcy9JUGFydGljbGVzSnNcIjtcbmltcG9ydCB7UGFydGljbGVzSlN9IGZyb20gXCIuL3N1cHBvcnRcIjtcbmltcG9ydCB7SU9wdGlvbnN9IGZyb20gXCIuL0ludGVyZmFjZXMvT3B0aW9ucy9JT3B0aW9uc1wiO1xuaW1wb3J0IHtSZWN1cnNpdmVQYXJ0aWFsfSBmcm9tIFwiLi9UeXBlcy9SZWN1cnNpdmVQYXJ0aWFsXCI7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICAgICAgcGFydGljbGVzSlM6IElQYXJ0aWNsZXNKcztcbiAgICAgICAgdHNQYXJ0aWNsZXM6IE1haW47XG4gICAgICAgIHBKU0RvbTogKCkgPT4gQ29udGFpbmVyW107XG4gICAgfVxufVxuXG4vKiAtLS0tLS0tLS0tIGdsb2JhbCBmdW5jdGlvbnMgLSB2ZW5kb3JzIC0tLS0tLS0tLS0tLSAqL1xuXG53aW5kb3cuY3VzdG9tUmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gKCgpID0+IHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgICgoY2FsbGJhY2spID0+IHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApKTtcbn0pKCk7XG5cbndpbmRvdy5jdXN0b21DYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSAoKCkgPT4ge1xuICAgIHJldHVybiB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93LndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5vQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tc0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICBjbGVhclRpbWVvdXRcbn0pKCk7XG5cbi8qIC0tLS0tLS0tLS0gdHNQYXJ0aWNsZXMgZnVuY3Rpb25zIC0gc3RhcnQgLS0tLS0tLS0tLS0tICovXG5cbi8qKlxuICogTWFpbiBjbGFzcyBmb3IgY3JlYXRpbmcgdGhlIHNpbmdsZXRvbiBvbiB3aW5kb3cuXG4gKiBJdCdzIGEgcHJveHkgdG8gdGhlIHN0YXRpYyBbW0xvYWRlcl1dIGNsYXNzXG4gKi9cbmNsYXNzIE1haW4ge1xuICAgIC8qKlxuICAgICAqIExvYWRzIGFuIG9wdGlvbnMgb2JqZWN0IGZyb20gdGhlIHByb3ZpZGVkIGFycmF5IHRvIGNyZWF0ZSBhIFtbQ29udGFpbmVyXV0gb2JqZWN0LlxuICAgICAqIEBwYXJhbSB0YWdJZCB0aGUgcGFydGljbGVzIGNvbnRhaW5lciBlbGVtZW50IGlkXG4gICAgICogQHBhcmFtIHBhcmFtcyB0aGUgb3B0aW9ucyBhcnJheSB0byBnZXQgdGhlIGl0ZW0gZnJvbVxuICAgICAqIEBwYXJhbSBpbmRleCBpZiBwcm92aWRlZCBnZXRzIHRoZSBjb3JyZXNwb25kaW5nIGl0ZW0gZnJvbSB0aGUgYXJyYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZEZyb21BcnJheSh0YWdJZDogc3RyaW5nLCBwYXJhbXM6IFJlY3Vyc2l2ZVBhcnRpYWw8SU9wdGlvbnM+W10sIGluZGV4PzogbnVtYmVyKTogQ29udGFpbmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIExvYWRlci5sb2FkRnJvbUFycmF5KHRhZ0lkLCBwYXJhbXMsIGluZGV4KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgcHJvdmlkZWQgb3B0aW9ucyB0byBjcmVhdGUgYSBbW0NvbnRhaW5lcl1dIG9iamVjdC5cbiAgICAgKiBAcGFyYW0gdGFnSWQgdGhlIHBhcnRpY2xlcyBjb250YWluZXIgZWxlbWVudCBpZFxuICAgICAqIEBwYXJhbSBwYXJhbXMgdGhlIG9wdGlvbnMgb2JqZWN0IHRvIGluaXRpYWxpemUgdGhlIFtbQ29udGFpbmVyXV1cbiAgICAgKi9cbiAgICBwdWJsaWMgbG9hZCh0YWdJZDogc3RyaW5nLCBwYXJhbXM6IFJlY3Vyc2l2ZVBhcnRpYWw8SU9wdGlvbnM+KTogQ29udGFpbmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIExvYWRlci5sb2FkKHRhZ0lkLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSBwcm92aWRlZCBqc29uIHdpdGggYSBHRVQgcmVxdWVzdC4gVGhlIGNvbnRlbnQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSBhIFtbQ29udGFpbmVyXV0gb2JqZWN0LlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGFzeW5jLCBzbyBpZiB5b3UgbmVlZCBhIGNhbGxiYWNrIHJlZmVyIHRvIEphdmFTY3JpcHQgZnVuY3Rpb24gYGZldGNoYFxuICAgICAqIEBwYXJhbSB0YWdJZCB0aGUgcGFydGljbGVzIGNvbnRhaW5lciBlbGVtZW50IGlkXG4gICAgICogQHBhcmFtIHBhdGhDb25maWdKc29uIHRoZSBqc29uIHBhdGggdG8gdXNlIGluIHRoZSBHRVQgcmVxdWVzdFxuICAgICAqL1xuICAgIHB1YmxpYyBsb2FkSlNPTih0YWdJZDogc3RyaW5nLCBwYXRoQ29uZmlnSnNvbjogc3RyaW5nKTogUHJvbWlzZTxDb250YWluZXIgfCB1bmRlZmluZWQ+IHtcbiAgICAgICAgcmV0dXJuIExvYWRlci5sb2FkSlNPTih0YWdJZCwgcGF0aENvbmZpZ0pzb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYW4gYWRkaXRpb25hbCBjbGljayBoYW5kbGVyIHRvIGFsbCB0aGUgbG9hZGVkIFtbQ29udGFpbmVyXV0gb2JqZWN0cy5cbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgdGhlIGZ1bmN0aW9uIGNhbGxlZCBhZnRlciB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0T25DbGlja0hhbmRsZXIoY2FsbGJhY2s6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgTG9hZGVyLnNldE9uQ2xpY2tIYW5kbGVyKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGwgdGhlIFtbQ29udGFpbmVyXV0gb2JqZWN0cyBsb2FkZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZG9tKCk6IENvbnRhaW5lcltdIHtcbiAgICAgICAgcmV0dXJuIExvYWRlci5kb20oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZXMgYSBbW0NvbnRhaW5lcl1dIGZyb20gYWxsIHRoZSBvYmplY3RzIGxvYWRlZFxuICAgICAqIEBwYXJhbSBpbmRleCB0aGUgb2JqZWN0IGluZGV4XG4gICAgICovXG4gICAgcHVibGljIGRvbUl0ZW0oaW5kZXg6IG51bWJlcik6IENvbnRhaW5lciB7XG4gICAgICAgIHJldHVybiBMb2FkZXIuZG9tSXRlbShpbmRleCk7XG4gICAgfVxufVxuXG4vKipcbiAqIFRoZSBuZXcgc2luZ2xldG9uLCByZXBsYWNpbmcgdGhlIG9sZCBwYXJ0aWNsZXNKU1xuICovXG53aW5kb3cudHNQYXJ0aWNsZXMgPSBuZXcgTWFpbigpO1xuXG5PYmplY3QuZnJlZXplKHdpbmRvdy50c1BhcnRpY2xlcyk7XG5cbi8qIHBhcnRpY2xlcy5qcyBjb21wYXRpYmlsaXR5ICovXG5cbi8qKlxuICogTG9hZHMgdGhlIHByb3ZpZGVkIG9wdGlvbnMgdG8gY3JlYXRlIGEgW1tDb250YWluZXJdXSBvYmplY3QuXG4gKiBAZGVwcmVjYXRlZCB0aGlzIG1ldGhvZCBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IHRzUGFydGljbGVzLmxvYWRcbiAqIEBwYXJhbSB0YWdJZCB0aGUgcGFydGljbGVzIGNvbnRhaW5lciBlbGVtZW50IGlkXG4gKiBAcGFyYW0gcGFyYW1zIHRoZSBvcHRpb25zIG9iamVjdCB0byBpbml0aWFsaXplIHRoZSBbW0NvbnRhaW5lcl1dXG4gKi9cbndpbmRvdy5wYXJ0aWNsZXNKUyA9ICh0YWdJZDogc3RyaW5nLCBwYXJhbXM6IFJlY3Vyc2l2ZVBhcnRpYWw8SU9wdGlvbnM+KSA9PiBQYXJ0aWNsZXNKUy5sb2FkKHRhZ0lkLCBwYXJhbXMpO1xuXG4vKipcbiAqIExvYWRzIHRoZSBwcm92aWRlZCBqc29uIHdpdGggYSBHRVQgcmVxdWVzdC4gVGhlIGNvbnRlbnQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSBhIFtbQ29udGFpbmVyXV0gb2JqZWN0LlxuICogQGRlcHJlY2F0ZWQgdGhpcyBtZXRob2QgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyB0c1BhcnRpY2xlcy5sb2FkSlNPTlxuICogQHBhcmFtIHRhZ0lkIHRoZSBwYXJ0aWNsZXMgY29udGFpbmVyIGVsZW1lbnQgaWRcbiAqIEBwYXJhbSBwYXRoQ29uZmlnSnNvbiB0aGUganNvbiBwYXRoIHRvIHVzZSBpbiB0aGUgR0VUIHJlcXVlc3RcbiAqIEBwYXJhbSBjYWxsYmFjayB0aGUgZnVuY3Rpb24gY2FsbGVkIGFmdGVyIHRoZSBbW0NvbnRhaW5lcl1dIG9iamVjdCBpcyBsb2FkZWQgdGhhdCB3aWxsIGJlIHBhc3NlZCBhcyBhIHBhcmFtZXRlclxuICovXG53aW5kb3cucGFydGljbGVzSlMubG9hZCA9ICh0YWdJZDogc3RyaW5nLCBwYXRoQ29uZmlnSnNvbjogc3RyaW5nLCBjYWxsYmFjazogKGNvbnRhaW5lcjogQ29udGFpbmVyKSA9PiB2b2lkKSA9PlxuICAgIFBhcnRpY2xlc0pTLmxvYWRKc29uKHRhZ0lkLCBwYXRoQ29uZmlnSnNvbiwgY2FsbGJhY2spO1xuXG4vKipcbiAqIEFkZHMgYW4gYWRkaXRpb25hbCBjbGljayBoYW5kbGVyIHRvIGFsbCB0aGUgbG9hZGVkIFtbQ29udGFpbmVyXV0gb2JqZWN0cy5cbiAqIEBkZXByZWNhdGVkIHRoaXMgbWV0aG9kIGlzIG9ic29sZXRlLCBwbGVhc2UgdXNlIHRoZSBuZXcgdHNQYXJ0aWNsZXMuc2V0T25DbGlja0hhbmRsZXJcbiAqIEBwYXJhbSBjYWxsYmFjayB0aGUgZnVuY3Rpb24gY2FsbGVkIGFmdGVyIHRoZSBjbGljayBldmVudCBpcyBmaXJlZFxuICovXG53aW5kb3cucGFydGljbGVzSlMuc2V0T25DbGlja0hhbmRsZXIgPSAoY2FsbGJhY2s6IEV2ZW50TGlzdGVuZXJPckV2ZW50TGlzdGVuZXJPYmplY3QpID0+XG4gICAgUGFydGljbGVzSlMuc2V0T25DbGlja0hhbmRsZXIoY2FsbGJhY2spO1xuXG4vKipcbiAqIEFsbCB0aGUgW1tDb250YWluZXJdXSBvYmplY3RzIGxvYWRlZFxuICogQGRlcHJlY2F0ZWQgdGhpcyBtZXRob2QgaXMgb2Jzb2xldGUsIHBsZWFzZSB1c2UgdGhlIG5ldyB0c1BhcnRpY2xlcy5kb21cbiAqL1xud2luZG93LnBKU0RvbSA9ICgpID0+IHtcbiAgICBpZiAoY29uc29sZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJ0aGlzIG1ldGhvZCBpcyBvYnNvbGV0ZSwgcGxlYXNlIHVzZSB0aGUgbmV3IHRzUGFydGljbGVzLmRvbVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2luZG93LnRzUGFydGljbGVzLmRvbSgpO1xufTtcbiJdfQ==