(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* angular-file-saver
*
* A AngularJS service that implements the HTML5 W3C saveAs() in browsers that
* do not natively support it
*
* (c) 2015 Philipp Alferov
* License: MIT
*
*/

(function() {
  'use strict';

  angular
    .module('fileSaver', [])
    .factory('SaveAs', SaveAs);

    function SaveAs() {

      function isBlobInstance (data) {
        return data instanceof Blob;
      }

      function save(blob, filename) {
        try {
          saveAs(blob, filename);
        } catch(err) {
          console.error(err.message);
        }
      }

      return {

        /**
        * saveFile - Immediately starts saving a file, returns undefined.
        *
        * @param  {array|Blob} data Represented as an array or a Blob object
        * @param  {string} filename
        * @param  {object} options Set of Blob constructor options.
        * Optional parameter, if Blob object is passed as first argument
        * @return {undefined}
        */

        download: function (data, filename, options) {
          var blob;
          data = data instanceof Array ? data : [data];

          if (isBlobInstance(data)) {
            save(data, filename);
          }

          blob = new Blob(data, options);
          save(blob, filename);
        }
      };
    }

})();

},{}]},{},[1]);
