/*!
 * artTemplate - Template Engine
 * https://github.com/aui/artTemplate
 * Released under the MIT, BSD, and GPL Licenses
 */
 
(function (global) {

'use strict';

/**
 * 模板引擎
 * 若第二个参数类型为 String 则执行 compile 方法, 否则执行 render 方法
 * @name    template
 * @param   {String}            模板ID
 * @param   {Object, String}    数据或者模板字符串
 * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
 */
var template = function (id, content) {
    return template[
        typeof content === 'string' ? 'compile' : 'render'
    ].apply(template, arguments);
};


template.version = '2.0.2'; 
template.openTag = '<%';     // 设置逻辑语法开始标签
template.closeTag = '%>';    // 设置逻辑语法结束标签
template.isEscape = true;    // HTML字符编码输出开关
template.isCompress = false; // 剔除渲染后HTML多余的空白开关
template.parser = null;      // 自定义语法插件接口



/**
 * 渲染模板
 * @name    template.render
 * @param   {String}    模板ID
 * @param   {Object}    数据
 * @return  {String}    渲染好的HTML字符串
 */
template.render = function (id, data) {

    var cache = template.get(id) || _debug({
        id: id,
        name: 'Render Error',
        message: 'No Template'
    });
    
    return cache(data); 
};



/**
 * 编译模板
 * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
 * @name    template.compile
 * @param   {String}    模板ID (可选，用作缓存索引)
 * @param   {String}    模板字符串
 * @return  {Function}  渲染方法
 */
template.compile = function (id, source) {
    
    var params = arguments;
    var isDebug = params[2];
    var anonymous = 'anonymous';
    
    if (typeof source !== 'string') {
        isDebug = params[1];
        source = params[0];
        id = anonymous;
    }

    
    try {
        
        var Render = _compile(id, source, isDebug);
        
    } catch (e) {
    
        e.id = id || source;
        e.name = 'Syntax Error';

        return _debug(e);
        
    }
    
    
    function render (data) {
        
        try {
            
            return new Render(data, id) + '';
            
        } catch (e) {
            
            if (!isDebug) {
                return template.compile(id, source, true)(data);
            }
            
            return _debug(e)();
            
        }
        
    }
    

    render.prototype = Render.prototype;
    render.toString = function () {
        return Render.toString();
    };
    
    
    if (id !== anonymous) {
        _cache[id] = render;
    }

    
    return render;

};



var _cache = template.cache = {};




// 辅助方法集合
var _helpers = template.helpers = (function () {

    var toString = function (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    var escapeHTML = function (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, function (s) {
            return escapeMap[s];
        });
    };


    var isArray = Array.isArray || function (obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    var each = function (data, callback) {             
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    return {

        $include: template.render,

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };
})();




/**
 * 添加模板辅助方法
 * @name    template.helper
 * @param   {String}    名称
 * @param   {Function}  方法
 */
template.helper = function (name, helper) {
    _helpers[name] = helper;
};




/**
 * 模板错误事件
 * @name    template.onerror
 * @event
 */
template.onerror = function (e) {
    var message = 'Template Error\n\n';
    for (var name in e) {
        message += '<' + name + '>\n' + e[name] + '\n\n';
    }
    
    if (global.console) {
        console.error(message);
    }
};







// 获取模板缓存
template.get = function (id) {

    var cache;
    
    if (_cache.hasOwnProperty(id)) {
        cache = _cache[id];
    } else if ('document' in global) {
        var elem = document.getElementById(id);
        
        if (elem) {
            var source = elem.value || elem.innerHTML;
            cache = template.compile(id, source.replace(/^\s*|\s*$/g, ''));
        }
    }

    return cache;
};



// 模板调试器
var _debug = function (e) {

    template.onerror(e);
    
    return function () {
        return '{Template Error}';
    };
};



// 模板编译器
var _compile = (function () {


    // 数组迭代
    var forEach = _helpers.$each;


    // 静态分析模板变量
    var KEYWORDS =
        // 关键字
        'break,case,catch,continue,debugger,default,delete,do,else,false'
        + ',finally,for,function,if,in,instanceof,new,null,return,switch,this'
        + ',throw,true,try,typeof,var,void,while,with'

        // 保留字
        + ',abstract,boolean,byte,char,class,const,double,enum,export,extends'
        + ',final,float,goto,implements,import,int,interface,long,native'
        + ',package,private,protected,public,short,static,super,synchronized'
        + ',throws,transient,volatile'

        // ECMA 5 - use strict
        + ',arguments,let,yield'

        + ',undefined';

    var REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g;
    var SPLIT_RE = /[^\w$]+/g;
    var KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, '\\b|\\b') + "\\b"].join('|'), 'g');
    var NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
    var BOUNDARY_RE = /^,+|,+$/g;

    var getVariable = function (code) {
        return code
        .replace(REMOVE_RE, '')
        .replace(SPLIT_RE, ',')
        .replace(KEYWORDS_RE, '')
        .replace(NUMBER_RE, '')
        .replace(BOUNDARY_RE, '')
        .split(/^$|,+/);
    };


    return function (id, source, isDebug) {
        
        var openTag = template.openTag;
        var closeTag = template.closeTag;
        var parser = template.parser;

        
        var code = source;
        var tempCode = '';
        var line = 1;
        var uniq = {$data:1,$id:1,$helpers:1,$out:1,$line:1};
        var prototype = {};

        
        var variables = "var $helpers=this,"
        + (isDebug ? "$line=0," : "");

        var isNewEngine = ''.trim;// '__proto__' in {}
        var replaces = isNewEngine
        ? ["$out='';", "$out+=", ";", "$out"]
        : ["$out=[];", "$out.push(", ");", "$out.join('')"];

        var concat = isNewEngine
            ? "if(content!==undefined){$out+=content;return content;}"
            : "$out.push(content);";
              
        var print = "function(content){" + concat + "}";

        var include = "function(id,data){"
        +     "data=data||$data;"
        +     "var content=$helpers.$include(id,data,$id);"
        +     concat
        + "}";
        
        
        // html与逻辑语法分离
        forEach(code.split(openTag), function (code, i) {
            code = code.split(closeTag);
            
            var $0 = code[0];
            var $1 = code[1];
            
            // code: [html]
            if (code.length === 1) {
                
                tempCode += html($0);
             
            // code: [logic, html]
            } else {
                
                tempCode += logic($0);
                
                if ($1) {
                    tempCode += html($1);
                }
            }
            

        });
        
        
        
        code = tempCode;
        
        
        // 调试语句
        if (isDebug) {
            code = "try{" + code + "}catch(e){"
            +       "throw {"
            +           "id:$id,"
            +           "name:'Render Error',"
            +           "message:e.message,"
            +           "line:$line,"
            +           "source:" + stringify(source)
            +           ".split(/\\n/)[$line-1].replace(/^[\\s\\t]+/,'')"
            +       "};"
            + "}";
        }
        
        
        code = variables + replaces[0] + code
        + "return new String(" + replaces[3] + ");";
        
        
        try {
            
            var Render = new Function("$data", "$id", code);
            Render.prototype = prototype;

            return Render;
            
        } catch (e) {
            e.temp = "function anonymous($data,$id) {" + code + "}";
            throw e;
        }



        
        // 处理 HTML 语句
        function html (code) {
            
            // 记录行号
            line += code.split(/\n/).length - 1;

            // 压缩多余空白与注释
            if (template.isCompress) {
                code = code
                .replace(/[\n\r\t\s]+/g, ' ')
                .replace(/<!--.*?-->/g, '');
            }
            
            if (code) {
                code = replaces[1] + stringify(code) + replaces[2] + "\n";
            }

            return code;
        }
        
        
        // 处理逻辑语句
        function logic (code) {

            var thisLine = line;
           
            if (parser) {
            
                 // 语法转换插件钩子
                code = parser(code);
                
            } else if (isDebug) {
            
                // 记录行号
                code = code.replace(/\n/g, function () {
                    line ++;
                    return "$line=" + line +  ";";
                });
                
            }
            
            
            // 输出语句. 转义: <%=value%> 不转义:<%==value%>
            if (code.indexOf('=') === 0) {

                var isEscape = code.indexOf('==') !== 0;

                code = code.replace(/^=*|[\s;]*$/g, '');

                if (isEscape && template.isEscape) {

                    // 转义处理，但排除辅助方法
                    var name = code.replace(/\s*\([^\)]+\)/, '');
                    if (
                        !_helpers.hasOwnProperty(name)
                        && !/^(include|print)$/.test(name)
                    ) {
                        code = "$escape(" + code + ")";
                    }

                } else {
                    code = "$string(" + code + ")";
                }
                

                code = replaces[1] + code + replaces[2];

            }
            
            if (isDebug) {
                code = "$line=" + thisLine + ";" + code;
            }
            
            getKey(code);
            
            return code + "\n";
        }
        
        
        // 提取模板中的变量名
        function getKey (code) {
            
            code = getVariable(code);
            
            // 分词
            forEach(code, function (name) {
             
                // 除重
                if (!uniq.hasOwnProperty(name)) {
                    setValue(name);
                    uniq[name] = true;
                }
                
            });
            
        }
        
        
        // 声明模板变量
        // 赋值优先级:
        // 内置特权方法(include, print) > 私有模板辅助方法 > 数据 > 公用模板辅助方法
        function setValue (name) {

            var value;

            if (name === 'print') {

                value = print;

            } else if (name === 'include') {
                
                prototype["$include"] = _helpers['$include'];
                value = include;
                
            } else {

                value = "$data." + name;

                if (_helpers.hasOwnProperty(name)) {

                    prototype[name] = _helpers[name];

                    if (name.indexOf('$') === 0) {
                        value = "$helpers." + name;
                    } else {
                        value = value
                        + "===undefined?$helpers." + name + ":" + value;
                    }
                }
                
                
            }
            
            variables += name + "=" + value + ",";
        }


        // 字符串转义
        function stringify (code) {
            return "'" + code
            // 单引号与反斜杠转义
            .replace(/('|\\)/g, '\\$1')
            // 换行符转义(windows + linux)
            .replace(/\r/g, '\\r')
            .replace(/\n/g, '\\n') + "'";
        }
        
        
    };
})();


// RequireJS && SeaJS
if (typeof define === 'function') {
    define(function() {
        return template;
    });

// NodeJS
} else if (typeof exports !== 'undefined') {
    module.exports = template;
}

global.template = template;


})(this);


