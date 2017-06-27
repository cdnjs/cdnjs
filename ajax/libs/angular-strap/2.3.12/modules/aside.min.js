/**
 * angular-strap
 * @version v2.3.12 - 2017-01-26
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';angular.module('mgcrea.ngStrap.aside',['mgcrea.ngStrap.modal']).provider('$aside',function(){var e=this.defaults={animation:'am-fade-and-slide-right',prefixClass:'aside',prefixEvent:'aside',placement:'right',templateUrl:'aside/aside.tpl.html',contentTemplate:!1,container:!1,element:null,backdrop:!0,keyboard:!0,html:!1,show:!0};this.$get=['$modal',function(n){function t(t){var a={},r=angular.extend({},e,t);return a=n(r)}return t}]}).directive('bsAside',['$window','$sce','$aside',function(e,n,t){return{restrict:'EAC',scope:!0,link:function(e,a,r,o){var i={scope:e,element:a,show:!1};angular.forEach(['template','templateUrl','controller','controllerAs','contentTemplate','placement','backdrop','keyboard','html','container','animation'],function(e){angular.isDefined(r[e])&&(i[e]=r[e])});var l=/^(false|0|)$/i;angular.forEach(['backdrop','keyboard','html','container'],function(e){angular.isDefined(r[e])&&l.test(r[e])&&(i[e]=!1)}),angular.forEach(['onBeforeShow','onShow','onBeforeHide','onHide'],function(n){var t='bs'+n.charAt(0).toUpperCase()+n.slice(1);angular.isDefined(r[t])&&(i[n]=e.$eval(r[t]))}),angular.forEach(['title','content'],function(t){r[t]&&r.$observe(t,function(a,r){e[t]=n.trustAsHtml(a)})}),r.bsAside&&e.$watch(r.bsAside,function(n,t){angular.isObject(n)?angular.extend(e,n):e.content=n},!0);var c=t(i);a.on(r.trigger||'click',c.toggle),e.$on('$destroy',function(){c&&c.destroy(),i=null,c=null})}}}]);
//# sourceMappingURL=aside.min.js.map
