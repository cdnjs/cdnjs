(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var docElem = window.document.documentElement;
var loadingClass = "usa-js-loading";

function addLoadingClass() {
  docElem.className += " ".concat(loadingClass);
}

function revertClass() {
  docElem.className = docElem.className.replace(loadingClass, "");
} // Based on https://www.filamentgroup.com/lab/enhancing-optimistically.html


if ("querySelector" in window.document && "addEventListener" in window) {
  addLoadingClass();
  var fallback = setTimeout(revertClass, 8000);
  var timeout = 100;

  var poll = function poll() {
    setTimeout(function () {
      timeout += 1;

      if (typeof uswdsPresent !== "undefined") {
        // USWDS library loaded
        clearTimeout(fallback);
        setTimeout(revertClass, 100);
      } else if (timeout > 0) {
        poll();
      } else {// USWDS library failed to load
      }
    }, 100);
  };

  poll();
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvdXN3ZHMtaW5pdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVAsQ0FBZ0IsZUFBaEM7QUFDQSxJQUFNLFlBQVksR0FBRyxnQkFBckI7O0FBRUEsU0FBUyxlQUFULEdBQTJCO0FBQ3pCLEVBQUEsT0FBTyxDQUFDLFNBQVIsZUFBeUIsWUFBekI7QUFDRDs7QUFFRCxTQUFTLFdBQVQsR0FBdUI7QUFDckIsRUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQixPQUFPLENBQUMsU0FBUixDQUFrQixPQUFsQixDQUEwQixZQUExQixFQUF3QyxFQUF4QyxDQUFwQjtBQUNELEMsQ0FFRDs7O0FBQ0EsSUFBSSxtQkFBbUIsTUFBTSxDQUFDLFFBQTFCLElBQXNDLHNCQUFzQixNQUFoRSxFQUF3RTtBQUN0RSxFQUFBLGVBQWU7QUFFZixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsV0FBRCxFQUFjLElBQWQsQ0FBM0I7QUFDQSxNQUFJLE9BQU8sR0FBRyxHQUFkOztBQUVBLE1BQU0sSUFBSSxHQUFHLFNBQVAsSUFBTyxHQUFNO0FBQ2pCLElBQUEsVUFBVSxDQUFDLFlBQU07QUFDZixNQUFBLE9BQU8sSUFBSSxDQUFYOztBQUNBLFVBQUksT0FBTyxZQUFQLEtBQXdCLFdBQTVCLEVBQXlDO0FBQ3ZDO0FBQ0EsUUFBQSxZQUFZLENBQUMsUUFBRCxDQUFaO0FBQ0EsUUFBQSxVQUFVLENBQUMsV0FBRCxFQUFjLEdBQWQsQ0FBVjtBQUNELE9BSkQsTUFJTyxJQUFJLE9BQU8sR0FBRyxDQUFkLEVBQWlCO0FBQ3RCLFFBQUEsSUFBSTtBQUNMLE9BRk0sTUFFQSxDQUNMO0FBQ0Q7QUFDRixLQVhTLEVBV1AsR0FYTyxDQUFWO0FBWUQsR0FiRDs7QUFlQSxFQUFBLElBQUk7QUFDTCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGRvY0VsZW0gPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuY29uc3QgbG9hZGluZ0NsYXNzID0gXCJ1c2EtanMtbG9hZGluZ1wiO1xuXG5mdW5jdGlvbiBhZGRMb2FkaW5nQ2xhc3MoKSB7XG4gIGRvY0VsZW0uY2xhc3NOYW1lICs9IGAgJHtsb2FkaW5nQ2xhc3N9YDtcbn1cblxuZnVuY3Rpb24gcmV2ZXJ0Q2xhc3MoKSB7XG4gIGRvY0VsZW0uY2xhc3NOYW1lID0gZG9jRWxlbS5jbGFzc05hbWUucmVwbGFjZShsb2FkaW5nQ2xhc3MsIFwiXCIpO1xufVxuXG4vLyBCYXNlZCBvbiBodHRwczovL3d3dy5maWxhbWVudGdyb3VwLmNvbS9sYWIvZW5oYW5jaW5nLW9wdGltaXN0aWNhbGx5Lmh0bWxcbmlmIChcInF1ZXJ5U2VsZWN0b3JcIiBpbiB3aW5kb3cuZG9jdW1lbnQgJiYgXCJhZGRFdmVudExpc3RlbmVyXCIgaW4gd2luZG93KSB7XG4gIGFkZExvYWRpbmdDbGFzcygpO1xuXG4gIGNvbnN0IGZhbGxiYWNrID0gc2V0VGltZW91dChyZXZlcnRDbGFzcywgODAwMCk7XG4gIGxldCB0aW1lb3V0ID0gMTAwO1xuXG4gIGNvbnN0IHBvbGwgPSAoKSA9PiB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lb3V0ICs9IDE7XG4gICAgICBpZiAodHlwZW9mIHVzd2RzUHJlc2VudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAvLyBVU1dEUyBsaWJyYXJ5IGxvYWRlZFxuICAgICAgICBjbGVhclRpbWVvdXQoZmFsbGJhY2spO1xuICAgICAgICBzZXRUaW1lb3V0KHJldmVydENsYXNzLCAxMDApO1xuICAgICAgfSBlbHNlIGlmICh0aW1lb3V0ID4gMCkge1xuICAgICAgICBwb2xsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVU1dEUyBsaWJyYXJ5IGZhaWxlZCB0byBsb2FkXG4gICAgICB9XG4gICAgfSwgMTAwKTtcbiAgfTtcblxuICBwb2xsKCk7XG59XG4iXX0=
