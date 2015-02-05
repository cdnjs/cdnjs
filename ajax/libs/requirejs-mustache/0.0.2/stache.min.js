// RequireJS Mustache template plugin
// http://github.com/jfparadis/requirejs-mustache
//
// An alternative to https://github.com/millermedeiros/requirejs-hogan-plugin
//
// Using Mustache Logic-less templates at http://mustache.github.com
// Using and RequireJS text.js at http://requirejs.org/docs/api.html#text
// @author JF Paradis
// @version 0.0.2
//
// Released under the MIT license
define(["text","Mustache"],function(text,Mustache){var sourceMap={},buildMap={},buildTemplateSource="define('{pluginName}!{moduleName}', ['Mustache'], function (Mustache) { return Mustache.compile('{content}'); });\n";return{version:"0.0.2",load:function(moduleName,parentRequire,onload,config){if(buildMap[moduleName])onload(buildMap[moduleName]);else{var ext=config.stache&&config.stache.extension||".html";var path=config.stache&&config.stache.path||"";text.load(path+moduleName+ext,parentRequire,function(source){if(config.isBuild){sourceMap[moduleName]=
source;onload()}else{buildMap[moduleName]=Mustache.compile(source);onload(buildMap[moduleName])}},config)}},write:function(pluginName,moduleName,write,config){var source=sourceMap[moduleName],content=source&&text.jsEscape(source);if(content)write.asModule(pluginName+"!"+moduleName,buildTemplateSource.replace("{pluginName}",pluginName).replace("{moduleName}",moduleName).replace("{content}",content))}}});