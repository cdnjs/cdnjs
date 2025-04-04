'use strict';

var detectNode = typeof window === 'undefined';

/**
 * 读取模板内容（同步方法）
 * @param   {string}    filename   模板名
 * @param   {?Object}   options
 * @return  {string}
 */
var loader = function loader(filename /*, options*/) {
    /* istanbul ignore else  */
    if (detectNode) {
        var fs = require('fs');
        return fs.readFileSync(filename, 'utf8');
    } else {
        var elem = document.getElementById(filename);
        return elem.value || elem.innerHTML;
    }
};

module.exports = loader;