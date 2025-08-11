/**
 * file-to-arraybuffer v1.3.0
 *
 * @author Julio L. Muller.
 * @license MIT - 2020-2025
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
      if (typeof ArrayBuffer === 'undefined') {
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
          reader.onloadend = function (ev) {
            var _a;
            return resolve((_a = ev.target) === null || _a === void 0 ? void 0 : _a.result);
          };
          reader.onerror = function (ev) {
            var _a;
            return reject((_a = ev.target) === null || _a === void 0 ? void 0 : _a.error);
          };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS10by1hcnJheWJ1ZmZlci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2ZpbGUtdG8tYXJyYXlidWZmZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5mdW5jdGlvbiBmaWxlVG9BcnJheUJ1ZmZlcih0YXJnZXQ6IEFycmF5QnVmZmVyKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj5cbmZ1bmN0aW9uIGZpbGVUb0FycmF5QnVmZmVyKHRhcmdldDogQmxvYik6IFByb21pc2U8QXJyYXlCdWZmZXI+XG5mdW5jdGlvbiBmaWxlVG9BcnJheUJ1ZmZlcih0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+XG5mdW5jdGlvbiBmaWxlVG9BcnJheUJ1ZmZlcih0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiBQcm9taXNlPEFycmF5QnVmZmVyPlxuZnVuY3Rpb24gZmlsZVRvQXJyYXlCdWZmZXIodGFyZ2V0OiBGaWxlTGlzdCk6IFByb21pc2U8QXJyYXlCdWZmZXI+XG5mdW5jdGlvbiBmaWxlVG9BcnJheUJ1ZmZlcih0YXJnZXQ6IEZpbGUpOiBQcm9taXNlPEFycmF5QnVmZmVyPlxuXG5mdW5jdGlvbiBmaWxlVG9BcnJheUJ1ZmZlcih0YXJnZXQ6IGFueSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgaWYgKHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IFByb21pc2VzLicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IEFycmF5QnVmZmVyLicpXG4gIH1cblxuICBpZiAoIXRhcmdldCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoYEVtcHR5IHBhcmFtZXRlciB0byBjb252ZXJ0IHRvIEFycmF5QnVmZmVyICh2YWx1ZTogJyR7dGFyZ2V0fScpLmApKVxuICB9XG5cbiAgaWYgKHRhcmdldC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRhcmdldClcbiAgfVxuXG4gIGlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdGFyZ2V0IGluc3RhbmNlb2YgQmxvYikge1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0LmFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmFycmF5QnVmZmVyKClcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIEZpbGVSZWFkZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgRmlsZVJlYWRlci4nKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG5cbiAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoZXYpID0+IHJlc29sdmUoZXYudGFyZ2V0Py5yZXN1bHQpXG4gICAgICByZWFkZXIub25lcnJvciA9IChldikgPT4gcmVqZWN0KGV2LnRhcmdldD8uZXJyb3IpXG4gICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIodGFyZ2V0KVxuICAgIH0pXG4gIH1cblxuICBsZXQgZmlsZUlucHV0UmVsYXRlZCA9IHRhcmdldCBhcyBzdHJpbmcgfCBIVE1MSW5wdXRFbGVtZW50IHwgRmlsZUxpc3QgfCBGaWxlXG5cbiAgaWYgKHR5cGVvZiBmaWxlSW5wdXRSZWxhdGVkID09PSAnc3RyaW5nJykge1xuICAgIGZpbGVJbnB1dFJlbGF0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZpbGVJbnB1dFJlbGF0ZWQpIGFzIEhUTUxJbnB1dEVsZW1lbnRcblxuICAgIGlmICghZmlsZUlucHV0UmVsYXRlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgTm8gSFRNTCBmb3VuZCB3aXRoIHNlbGVjdG9yIFwiJHt0YXJnZXR9XCIuYCkpXG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBIVE1MSW5wdXRFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlSW5wdXRSZWxhdGVkLmNvbnN0cnVjdG9yID09PSBIVE1MSW5wdXRFbGVtZW50KSB7XG4gICAgZmlsZUlucHV0UmVsYXRlZCA9IGZpbGVJbnB1dFJlbGF0ZWQuZmlsZXMgYXMgRmlsZUxpc3RcblxuICAgIGlmICghZmlsZUlucHV0UmVsYXRlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignSFRNTCBpbnB1dCBlbGVtZW50IHJlZmVyZW5jZSBpcyBub3Qgb2YgdHlwZSBcImZpbGVcIi4nKSlcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIEZpbGVMaXN0ICE9PSAndW5kZWZpbmVkJyAmJiBmaWxlSW5wdXRSZWxhdGVkLmNvbnN0cnVjdG9yID09PSBGaWxlTGlzdCkge1xuICAgIGZpbGVJbnB1dFJlbGF0ZWQgPSBmaWxlSW5wdXRSZWxhdGVkWzBdIGFzIEZpbGVcblxuICAgIGlmICghZmlsZUlucHV0UmVsYXRlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignT2JqZWN0IEZpbGVMaXN0IGlzIGVtcHR5LicpKVxuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgZmlsZUlucHV0UmVsYXRlZC5jb25zdHJ1Y3RvciA9PT0gRmlsZSkge1xuICAgIHJldHVybiBmaWxlVG9BcnJheUJ1ZmZlcihmaWxlSW5wdXRSZWxhdGVkKSAvLyB3aWxsIGJlIHRyZWF0ZWQgYXMgYSBCbG9iXG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdQYXJhbWV0ZXIgdHlwZSBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIEhUTUxJbnB1dEVsZW1lbnQsIEZpbGVMaXN0LCBGaWxlLCBTdHJpbmcgKGlucHV0IHNlbGVjdG9yKSwgQmxvYiBvciBBcnJheUJ1ZmZlcicpKVxufVxuXG5leHBvcnQgZGVmYXVsdCBmaWxlVG9BcnJheUJ1ZmZlclxuIl0sIm5hbWVzIjpbImZpbGVUb0FycmF5QnVmZmVyIiwidGFyZ2V0IiwiUHJvbWlzZSIsIlJlZmVyZW5jZUVycm9yIiwiQXJyYXlCdWZmZXIiLCJyZWplY3QiLCJFcnJvciIsImNvbmNhdCIsImNvbnN0cnVjdG9yIiwicmVzb2x2ZSIsIkJsb2IiLCJhcnJheUJ1ZmZlciIsIkZpbGVSZWFkZXIiLCJUeXBlRXJyb3IiLCJyZWFkZXIiLCJvbmxvYWRlbmQiLCJldiIsIl9hIiwicmVzdWx0Iiwib25lcnJvciIsImVycm9yIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJmaWxlSW5wdXRSZWxhdGVkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiSFRNTElucHV0RWxlbWVudCIsImZpbGVzIiwiRmlsZUxpc3QiLCJGaWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBUUEsU0FBU0EsaUJBQWlCQSxDQUFDQyxNQUFXLEVBQUE7SUFDcEMsRUFBQSxJQUFJLE9BQU9DLE9BQU8sS0FBSyxXQUFXLEVBQUU7SUFDbEMsSUFBQSxNQUFNLElBQUlDLGNBQWMsQ0FBQyw2Q0FBNkMsQ0FBQztJQUN6RTtJQUVBLEVBQUEsSUFBSSxPQUFPQyxXQUFXLEtBQUssV0FBVyxFQUFFO0lBQ3RDLElBQUEsTUFBTSxJQUFJRCxjQUFjLENBQUMsZ0RBQWdELENBQUM7SUFDNUU7TUFFQSxJQUFJLENBQUNGLE1BQU0sRUFBRTtJQUNYLElBQUEsT0FBT0MsT0FBTyxDQUFDRyxNQUFNLENBQUMsSUFBSUMsS0FBSyxDQUFDLHFEQUFBLENBQUFDLE1BQUEs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
