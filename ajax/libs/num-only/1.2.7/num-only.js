/**
 * num-only v1.2.7
 *
 * @author Julio L. Muller.
 * @license MIT - 2020-2025
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.numOnly = factory());
})(this, (function () { 'use strict';

    function numOnly(target) {
      return String(target).replace(/\D/g, '');
    }

    return numOnly;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtLW9ubHkuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9udW0tb25seS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBudW1Pbmx5KHRhcmdldDogdW5rbm93bik6IHN0cmluZyB7XG4gIHJldHVybiBTdHJpbmcodGFyZ2V0KS5yZXBsYWNlKC9cXEQvZywgJycpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBudW1Pbmx5O1xuIl0sIm5hbWVzIjpbIm51bU9ubHkiLCJ0YXJnZXQiLCJTdHJpbmciLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQUEsU0FBU0EsT0FBT0EsQ0FBQ0MsTUFBZSxFQUFBO01BQzlCLE9BQU9DLE1BQU0sQ0FBQ0QsTUFBTSxDQUFDLENBQUNFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO0lBQzFDOzs7Ozs7OzsifQ==
