/*!
 * template.js v0.1.0 (https://github.com/yanhaijing/template.js)
 * Copyright 2015 yanhaijing. All Rights Reserved
 * Licensed under MIT (https://github.com/yanhaijing/template.js/blob/master/MIT-LICENSE.txt)
 */
;(function(root, factory) {
    var template = factory(root);
    if (typeof define === 'function' && define.amd) {
        // AMD
        define('template', function() {
            return template;
        });
    } else if (typeof exports === 'object') {
        // Node.js
        module.exports = template;
    } else {
        // Browser globals
        var _template = root.template;

        template.noConflict = function() {
            if (root.template === template) {
                root.template = _template;
            }

            return template;
        };
        root.template = template;
    }
}(this, function(root) {
    'use strict';
    var o = {
        sTag: '<%',//开始标签
        eTag: '%>',//结束标签
        compress: false//是否压缩html
    };
    function isObj(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
    function extend() {
        var target = arguments[0] || {};
        var arrs = Array.prototype.slice.call(arguments, 1);
        var len = arrs.length;
     
        for (var i = 0; i < len; i++) {
            var arr = arrs[i];
            for (var name in arr) {
                target[name] = arr[name];
            }
     
        }
        return target;
    }
    function encodeHTML(source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/\\/g,'&#92;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
    };
    function compile(tpl) {
        var reg = new RegExp(o.sTag + '(.*?)' + o.eTag, 'g');// /<%(.*?)%>/g;
        var match;
        var point = 0;
        var code = '';
        function add(line, js) {
            //非js
            if (!js) {
                code += '__r__.push("' + line.replace(/"/g, '\\"') + '");\n';
                return 0;
            }   
            //原生js
            if (line.search(/^(:|=)/) === -1) {
                code += line + '\n';
                return 1;
            }
            var html;
            if (line.search(/^=/) !== -1) {
                //默认输出
                html = line.slice(1);
                code += '__r__.push(__encodeHTML__(' + html + '));\n';
                return 2;
            } else if (line.search(/^:=/) !== -1) {
                //不转义
                html = line.slice(2);
                code += '__r__.push(' + html + ');\n';
                return 3;
            } else if (line.search(/^:u=/) !== -1) {
                //URL转义
                html = line.slice(3);
                code += '__r__.push(encodeURI(' + html + '));\n';
                return 4;
            }
            return 5;
        }
        while(match = reg.exec(tpl)){
            add(tpl.slice(point, match.index));
            add(match[1], true);
            point = match.index + match[0].length;
        }
        add(tpl.substr(point, tpl.length - point));

        code = '\nvar r = (function (__data__, __encodeHTML__) {var __str__ = "", __r__ = [];\nfor(var key in __data__) {\n__str__+=("var " + key + "=__data__[\'" + key + "\'];");\n}\neval(__str__);\n' + code + ';\nreturn __r__}(data, encodeHTML));\nreturn r.join("");';
        return new Function('data', 'encodeHTML', code.replace(/[\r\t\n]/g, ''));
    }
    function template(tpl, data) {
        if (typeof tpl !== 'string') {
            return '';
        }

        var fn = compile(tpl);
        if (!isObj(data)) {
            return function (data) {
                var html;
                return html = fn.call(null, data, encodeHTML), o.compress ? html.replace(/\s/g, '') : html;
            };
        }
        var html;
        return html = fn.call(null, data, encodeHTML), o.compress ? html.replace(/\s/g, '') : html;
    }
    template.config = function (option) {
        if (!isObj(option)) {
            return false;
        }
        o = extend(o, option);
        return true;
    };
    template.version = '0.1.0';
    return template;
}));