/*!
 * Completer v0.1.3
 * https://github.com/fengyuanchen/completer
 *
 * Copyright (c) 2014-2016 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2016-06-13T12:43:37.946Z
 */
!function(a){"function"==typeof define&&define.amd?
// AMD. Register as anonymous module.
define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){"use strict";function b(c,d){this.$element=a(c),this.options=a.extend({},b.DEFAULTS,a.isPlainObject(d)&&d),this.init()}function c(a){return a.replace(/([\.\$\^\{\[\(\|\)\*\+\?\\])/g,"\\$1")}function d(a){return"string"==typeof a&&""!==a?(a=c(a),new RegExp(a+"+[^"+a+"]*$","i")):null}function e(b){return"string"==typeof b&&(b=b.replace(/[\{\}\[\]"']+/g,"").split(/\s*,+\s*/)),b=a.map(b,function(a){return"string"!=typeof a?a.toString():a})}var f=a(window),g=a(document),h="completer",i="resize",j="mousedown";b.prototype={constructor:b,init:function(){var b=this.options,c=e(b.source);c.length>0&&(this.data=c,this.regexp=d(b.separator),this.$completer=a(b.template),this.$completer.hide().appendTo("body"),this.place(),this.$element.attr("autocomplete","off").on({focus:a.proxy(this.enable,this),blur:a.proxy(this.disable,this)}),this.$element.is(":focus")&&this.enable())},enable:function(){this.active||(this.active=!0,this.$element.on({keydown:a.proxy(this.keydown,this),keyup:a.proxy(this.keyup,this)}),this.$completer.on({mousedown:a.proxy(this.mousedown,this),mouseover:a.proxy(this.mouseover,this)}))},disable:function(){this.active&&(this.active=!1,this.$element.off({keydown:this.keydown,keyup:this.keyup}),this.$completer.off({mousedown:this.mousedown,mouseover:this.mouseover}))},attach:function(b){var d,e,f=this.options,g=f.separator,h=this.regexp,i=h?b.match(h):null,j=[],k=[],l=this;i&&(i=i[0],b=b.replace(h,""),d=new RegExp("^"+c(i),"i")),a.each(this.data,function(a,c){c=g+c,e=l.template(b+c),d&&d.test(c)?j.push(e):k.push(e)}),j=j.length?j.sort():k,"top"===f.position&&(j=j.reverse()),this.fill(j.join(""))},suggest:function(b){var d=new RegExp(c(b),"i"),e=this,f=[];a.each(this.data,function(a,b){d.test(b)&&f.push(b)}),f.sort(function(a,c){return a.indexOf(b)-c.indexOf(b)}),a.each(f,function(a,b){f[a]=e.template(b)}),this.fill(f.join(""))},template:function(a){var b=this.options.itemTag;return"<"+b+">"+a+"</"+b+">"},fill:function(a){var b;this.$completer.empty(),a?(b="top"===this.options.position?":last":":first",this.$completer.html(a),this.$completer.children(b).addClass(this.options.selectedClass),this.show()):this.hide()},complete:function(){var a=this.options,b=a.filter(this.$element.val()).toString();return""===b?void this.hide():void(a.suggest?this.suggest(b):this.attach(b))},keydown:function(a){var b=a.keyCode||a.which||a.charCode;13===b&&(a.stopPropagation(),a.preventDefault())},keyup:function(a){var b=a.keyCode||a.which||a.charCode;13===b||38===b||40===b?this.toggle(b):this.complete()},mouseover:function(b){var c=this.options,d=c.selectedClass,e=a(b.target);e.is(c.itemTag)&&e.addClass(d).siblings().removeClass(d)},mousedown:function(b){b.stopPropagation(),b.preventDefault(),this.setValue(a(b.target).text())},setValue:function(a){this.$element.val(a),this.options.complete(),this.hide()},toggle:function(a){var b=this.options.selectedClass,c=this.$completer.find("."+b);switch(a){
// Down
case 40:c.removeClass(b),c=c.next();break;
// Up
case 38:c.removeClass(b),c=c.prev();break;
// Enter
case 13:this.setValue(c.text())}0===c.length&&(c=this.$completer.children(40===a?":first":":last")),c.addClass(b)},place:function(){var a=this.$element,b=a.offset(),c=b.left,d=b.top,e=a.outerHeight(),g=a.outerWidth(),h={minWidth:g,zIndex:this.options.zIndex};switch(this.options.position){case"right":h.left=c+g,h.top=d;break;case"left":h.right=f.innerWidth()-c,h.top=d;break;case"top":h.left=c,h.bottom=f.innerHeight()-d;break;
// case 'bottom':
default:h.left=c,h.top=d+e}this.$completer.css(h)},show:function(){this.$completer.show(),f.on(i,a.proxy(this.place,this)),g.on(j,a.proxy(this.hide,this))},hide:function(){this.$completer.hide(),f.off(i,this.place),g.off(j,this.hide)},destroy:function(){var a=this.$element;this.hide(),this.disable(),a.off({focus:this.enable,blur:this.disable}),a.removeData(h)}},b.DEFAULTS={itemTag:"li",position:"bottom",// or 'right'
source:[],selectedClass:"completer-selected",separator:"",suggest:!1,template:'<ul class="completer-container"></ul>',zIndex:1,complete:a.noop,filter:function(a){return a}},b.setDefaults=function(c){a.extend(b.DEFAULTS,c)},
// Save the other completer
b.other=a.fn.completer,
// Register as jQuery plugin
a.fn.completer=function(c){var d,e=[].slice.call(arguments,1);return this.each(function(){var f,g,i=a(this),j=i.data(h);if(!j){if(/destroy/.test(c))return;f=a.extend({},i.data(),a.isPlainObject(c)&&c),i.data(h,j=new b(this,f))}"string"==typeof c&&a.isFunction(g=j[c])&&(d=g.apply(j,e))}),"undefined"!=typeof d?d:this},a.fn.completer.Constructor=b,a.fn.completer.setDefaults=b.setDefaults,
// No conflict
a.fn.completer.noConflict=function(){return a.fn.completer=b.other,this},a(function(){a('[data-toggle="completer"]').completer()})});