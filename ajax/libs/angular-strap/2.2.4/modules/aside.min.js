/**
 * angular-strap
 * @version v2.2.4 - 2015-05-28
 * @link http://mgcrea.github.io/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com> (https://github.com/mgcrea)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';angular.module('mgcrea.ngStrap.aside',['mgcrea.ngStrap.modal']).provider('$aside',function(){var e=this.defaults={animation:'am-fade-and-slide-right',prefixClass:'aside',prefixEvent:'aside',placement:'right',template:'aside/aside.tpl.html',contentTemplate:!1,container:!1,element:null,backdrop:!0,keyboard:!0,html:!1,show:!0};this.$get=['$modal',function(t){function n(n){var a={},i=angular.extend({},e,n);return a=t(i)}return n}]}).directive('bsAside',['$window','$sce','$aside',function(e,t,n){e.requestAnimationFrame||e.setTimeout;return{restrict:'EAC',scope:!0,link:function(e,a,i,r){var o={scope:e,element:a,show:!1};angular.forEach(['template','contentTemplate','placement','backdrop','keyboard','html','container','animation'],function(e){angular.isDefined(i[e])&&(o[e]=i[e])});var l=/^(false|0|)$/i;angular.forEach(['backdrop','keyboard','html','container'],function(e){angular.isDefined(i[e])&&l.test(i[e])&&(o[e]=!1)}),angular.forEach(['title','content'],function(n){i[n]&&i.$observe(n,function(a,i){e[n]=t.trustAsHtml(a)})}),i.bsAside&&e.$watch(i.bsAside,function(t,n){angular.isObject(t)?angular.extend(e,t):e.content=t},!0);var s=n(o);a.on(i.trigger||'click',s.toggle),e.$on('$destroy',function(){s&&s.destroy(),o=null,s=null})}}}]);
//# sourceMappingURL=../modules/aside.min.js.map