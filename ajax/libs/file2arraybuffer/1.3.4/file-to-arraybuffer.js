/**
 * file2arraybuffer v1.3.4
 *
 * @author [object Object].
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
          reader.onerror = function (ev) {
            var _a;
            return reject((_a = ev.target) === null || _a === void 0 ? void 0 : _a.error);
          };
          reader.onloadend = function (ev) {
            var _a, _b;
            var result = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.result;
            var error = (_b = ev.target) === null || _b === void 0 ? void 0 : _b.error;
            if (result) {
              resolve(result);
              return;
            }
            reject(error !== null && error !== void 0 ? error : new Error('FileReader failed to read the file.'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS10by1hcnJheWJ1ZmZlci5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2ZpbGUtdG8tYXJyYXlidWZmZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZmlsZVRvQXJyYXlCdWZmZXIodGFyZ2V0OiBBcnJheUJ1ZmZlcik6IFByb21pc2U8QXJyYXlCdWZmZXI+O1xuZnVuY3Rpb24gZmlsZVRvQXJyYXlCdWZmZXIodGFyZ2V0OiBCbG9iKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj47XG5mdW5jdGlvbiBmaWxlVG9BcnJheUJ1ZmZlcih0YXJnZXQ6IHN0cmluZyk6IFByb21pc2U8QXJyYXlCdWZmZXI+O1xuZnVuY3Rpb24gZmlsZVRvQXJyYXlCdWZmZXIodGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50KTogUHJvbWlzZTxBcnJheUJ1ZmZlcj47XG5mdW5jdGlvbiBmaWxlVG9BcnJheUJ1ZmZlcih0YXJnZXQ6IEZpbGVMaXN0KTogUHJvbWlzZTxBcnJheUJ1ZmZlcj47XG5mdW5jdGlvbiBmaWxlVG9BcnJheUJ1ZmZlcih0YXJnZXQ6IEZpbGUpOiBQcm9taXNlPEFycmF5QnVmZmVyPjtcblxuZnVuY3Rpb24gZmlsZVRvQXJyYXlCdWZmZXIodGFyZ2V0OiB1bmtub3duKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICBpZiAodHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdUaGlzIGVudmlyb25tZW50IGRvZXMgbm90IHN1cHBvcnQgUHJvbWlzZXMuJyk7XG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IEFycmF5QnVmZmVyLicpO1xuICB9XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICBuZXcgRXJyb3IoYEVtcHR5IHBhcmFtZXRlciB0byBjb252ZXJ0IHRvIEFycmF5QnVmZmVyICh2YWx1ZTogJyR7dGFyZ2V0fScpLmApLFxuICAgICk7XG4gIH1cblxuICBpZiAodGFyZ2V0LmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGFyZ2V0KTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdGFyZ2V0IGluc3RhbmNlb2YgQmxvYikge1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0LmFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0LmFycmF5QnVmZmVyKCk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBGaWxlUmVhZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IEZpbGVSZWFkZXIuJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5vbmVycm9yID0gKGV2KTogdm9pZCA9PiByZWplY3QoZXYudGFyZ2V0Py5lcnJvcik7XG5cbiAgICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoZXYpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gZXYudGFyZ2V0Py5yZXN1bHQ7XG4gICAgICAgIGNvbnN0IGVycm9yID0gZXYudGFyZ2V0Py5lcnJvcjtcblxuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQgYXMgQXJyYXlCdWZmZXIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlamVjdChlcnJvciA/PyBuZXcgRXJyb3IoJ0ZpbGVSZWFkZXIgZmFpbGVkIHRvIHJlYWQgdGhlIGZpbGUuJykpO1xuICAgICAgfTtcblxuICAgICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHRhcmdldCk7XG4gICAgfSk7XG4gIH1cblxuICBsZXQgZmlsZUlucHV0UmVsYXRlZCA9IHRhcmdldCBhcyBGaWxlIHwgRmlsZUxpc3QgfCBIVE1MSW5wdXRFbGVtZW50IHwgc3RyaW5nO1xuXG4gIGlmICh0eXBlb2YgZmlsZUlucHV0UmVsYXRlZCA9PT0gJ3N0cmluZycpIHtcbiAgICBmaWxlSW5wdXRSZWxhdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihmaWxlSW5wdXRSZWxhdGVkKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgaWYgKCFmaWxlSW5wdXRSZWxhdGVkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKGBObyBIVE1MIGZvdW5kIHdpdGggc2VsZWN0b3IgXCIke3RhcmdldH1cIi5gKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKFxuICAgIHR5cGVvZiBIVE1MSW5wdXRFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIGZpbGVJbnB1dFJlbGF0ZWQuY29uc3RydWN0b3IgPT09IEhUTUxJbnB1dEVsZW1lbnRcbiAgKSB7XG4gICAgZmlsZUlucHV0UmVsYXRlZCA9IGZpbGVJbnB1dFJlbGF0ZWQuZmlsZXMgYXMgRmlsZUxpc3Q7XG5cbiAgICBpZiAoIWZpbGVJbnB1dFJlbGF0ZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ0hUTUwgaW5wdXQgZWxlbWVudCByZWZlcmVuY2UgaXMgbm90IG9mIHR5cGUgXCJmaWxlXCIuJykpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgRmlsZUxpc3QgIT09ICd1bmRlZmluZWQnICYmIGZpbGVJbnB1dFJlbGF0ZWQuY29uc3RydWN0b3IgPT09IEZpbGVMaXN0KSB7XG4gICAgZmlsZUlucHV0UmVsYXRlZCA9IGZpbGVJbnB1dFJlbGF0ZWRbMF0gYXMgRmlsZTtcblxuICAgIGlmICghZmlsZUlucHV0UmVsYXRlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignT2JqZWN0IEZpbGVMaXN0IGlzIGVtcHR5LicpKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIGZpbGVJbnB1dFJlbGF0ZWQuY29uc3RydWN0b3IgPT09IEZpbGUpIHtcbiAgICByZXR1cm4gZmlsZVRvQXJyYXlCdWZmZXIoZmlsZUlucHV0UmVsYXRlZCk7IC8vIHdpbGwgYmUgdHJlYXRlZCBhcyBhIEJsb2JcbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICBuZXcgRXJyb3IoXG4gICAgICAnUGFyYW1ldGVyIHR5cGUgbXVzdCBiZSBhbiBpbnN0YW5jZSBvZiBIVE1MSW5wdXRFbGVtZW50LCBGaWxlTGlzdCwgRmlsZSwgU3RyaW5nIChpbnB1dCBzZWxlY3RvciksIEJsb2Igb3IgQXJyYXlCdWZmZXInLFxuICAgICksXG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZpbGVUb0FycmF5QnVmZmVyO1xuIl0sIm5hbWVzIjpbImZpbGVUb0FycmF5QnVmZmVyIiwidGFyZ2V0IiwiUHJvbWlzZSIsIlJlZmVyZW5jZUVycm9yIiwiQXJyYXlCdWZmZXIiLCJyZWplY3QiLCJFcnJvciIsImNvbmNhdCIsImNvbnN0cnVjdG9yIiwicmVzb2x2ZSIsIkJsb2IiLCJhcnJheUJ1ZmZlciIsIkZpbGVSZWFkZXIiLCJUeXBlRXJyb3IiLCJyZWFkZXIiLCJvbmVycm9yIiwiZXYiLCJfYSIsImVycm9yIiwib25sb2FkZW5kIiwicmVzdWx0IiwiX2IiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImZpbGVJbnB1dFJlbGF0ZWQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJIVE1MSW5wdXRFbGVtZW50IiwiZmlsZXMiLCJGaWxlTGlzdCIsIkZpbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7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
