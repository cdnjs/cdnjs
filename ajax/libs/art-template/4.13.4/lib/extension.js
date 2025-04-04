'use strict';

var templatePath = require.resolve('./index.js');

/**
 * require.extensions 扩展注册函数
 * 使用动态编译机制
 * @param {Object} module
 * @param {string} flnm
 */
var extension = function extension(module, flnm) {
    var filename = flnm || module.filename;
    var imports = 'var template=require(' + JSON.stringify(templatePath) + ')';
    var options = JSON.stringify({
        filename: filename
    });

    module._compile(imports + '\n' + 'module.exports = template.compile(' + options + ');', filename);
};

module.exports = extension;