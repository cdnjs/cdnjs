/*
 * jQuery Scanner Detection
 *
 * Copyright (c) 2013 Julien Maurel
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 * https://github.com/julien-maurel/jQuery-Scanner-Detection
 *
 * Version: 1.2.0
 *
 * Implement some functions that not exist on old IE browser (IE<9)
 */
 if (!Date.now) {
   Date.now = function now() {
      return new Date().getTime();
  };
}

if (!Array.prototype.indexOf) {
   Array.prototype.indexOf = function (searchElement, fromIndex) {
      if ( this === undefined || this === null ) {
         throw new TypeError( '"this" is null or not defined' );
      }

      var length = this.length >>> 0; // Hack to convert object.length to a UInt32

      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
         fromIndex = 0;
      }

      if (fromIndex < 0) {
         fromIndex += length;
         if (fromIndex < 0) {
           fromIndex = 0;
         }
      }

      for (;fromIndex < length; fromIndex++) {
         if (this[fromIndex] === searchElement) {
            return fromIndex;
         }
      }

      return -1;
   };
}