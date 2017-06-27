/*
 *  jquery-boilerplate - v4.0.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
!function(a,b,c,d){"use strict";function e(b,c){this.element=b,this.settings=a.extend({},g,c),this._defaults=g,this._name=f,this.init()}var f="defaultPluginName",g={propertyName:"value"};a.extend(e.prototype,{init:function(){this.yourOtherFunction("jQuery Boilerplate")},yourOtherFunction:function(b){a(this.element).text(b)}}),a.fn[f]=function(b){return this.each(function(){a.data(this,"plugin_"+f)||a.data(this,"plugin_"+f,new e(this,b))})}}(jQuery,window,document);