/**

JSZip - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2012 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

Usage:
   zip = new JSZip();
   zip.file("hello.txt", "Hello, World!").file("tempfile", "nothing");
   zip.folder("images").file("smile.gif", base64Data, {base64: true});
   zip.file("Xmas.txt", "Ho ho ho !", {date : new Date("December 25, 2007 00:00:01")});
   zip.remove("tempfile");

   base64zip = zip.generate();

**/

/**
 * Representation a of zip file in js
 * @constructor
 * @param {String=|ArrayBuffer=|Uint8Array=} data the data to load, if any (optional).
 * @param {Object=} options the options for creating this objects (optional).
 */
define(function(require){

var JSZip = function(data, options) {
   // object containing the files :
   // {
   //   "folder/" : {...},
   //   "folder/data.txt" : {...}
   // }
   this.files = {};

   // Where we are in the hierarchy
   this.root = "";

   if (data) {
      this.load(data, options);
   }
};



JSZip.prototype = require('jszip/object');
JSZip.prototype.clone = function() {
         var newObj = new JSZip();
         for (var i in this) {
            if (typeof this[i] !== "function") {
               newObj[i] = this[i];
            }
         }
         return newObj;
      };
JSZip.prototype.load=require('jszip/load');
JSZip.support = require('jszip/support');
JSZip.utils = require('jszip/utils');
JSZip.base64 = require('jszip/base64');
JSZip.compressions = require('jszip/compressions');
return JSZip;
});
