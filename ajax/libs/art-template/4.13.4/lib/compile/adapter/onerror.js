"use strict";

/**
 * 调试器
 * @param   {Object}    error
 * @param   {?Object}   options
 * @return  {string}
 */
var onerror = function onerror(error /*, options*/) {
  console.error(error.name, error.message);
};

module.exports = onerror;