/**
 * file-to-arraybuffer v1.2.2
 *
 * @author Julio L. Muller.
 * @license MIT - 2020-2022
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.fileToArrayBuffer = factory());
})(this, (function () { 'use strict';

  function fileToArrayBuffer(target) {
      if (typeof Promise === 'undefined') {
          throw new ReferenceError('This environment does not support Promises.');
      }
      else if (typeof ArrayBuffer === 'undefined') {
          throw new ReferenceError('This environment does not support ArrayBuffer.');
      }
      if (!target) {
          return Promise.reject(new Error("Empty parameter to convert to ArrayBuffer (value: '".concat(target, "').")));
      }
      if (target.constructor === ArrayBuffer) {
          return Promise.resolve(target);
      }
      if (typeof Blob !== 'undefined' && target instanceof Blob) {
          if (typeof target.arrayBuffer === 'function') {
              return target.arrayBuffer();
          }
          if (typeof FileReader === 'undefined') {
              throw new TypeError('This environment does not support FileReader.');
          }
          return new Promise(function (resolve, reject) {
              var reader = new FileReader();
              reader.onloadend = function (ev) { var _a; return resolve((_a = ev.target) === null || _a === void 0 ? void 0 : _a.result); };
              reader.onerror = function (ev) { var _a; return reject((_a = ev.target) === null || _a === void 0 ? void 0 : _a.error); };
              reader.readAsArrayBuffer(target);
          });
      }
      var fileInputRelated = target;
      if (typeof fileInputRelated === 'string') {
          fileInputRelated = document.querySelector(fileInputRelated);
          if (!fileInputRelated) {
              return Promise.reject(new Error("No HTML found with selector \"".concat(target, "\".")));
          }
      }
      if (typeof HTMLInputElement !== 'undefined' && fileInputRelated.constructor === HTMLInputElement) {
          fileInputRelated = fileInputRelated.files;
          if (!fileInputRelated) {
              return Promise.reject(new Error('HTML input element reference is not of type "file".'));
          }
      }
      if (typeof FileList !== 'undefined' && fileInputRelated.constructor === FileList) {
          fileInputRelated = fileInputRelated[0];
          if (!fileInputRelated) {
              return Promise.reject(new Error('Object FileList is empty.'));
          }
      }
      if (typeof File !== 'undefined' && fileInputRelated.constructor === File) {
          return fileToArrayBuffer(fileInputRelated); // will be treated as a Blob
      }
      return Promise.reject(new Error('Parameter type must be an instance of HTMLInputElement, FileList, File, String (input selector), Blob or ArrayBuffer'));
  }

  return fileToArrayBuffer;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS10by1hcnJheWJ1ZmZlci5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
