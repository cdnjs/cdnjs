!function(a,b){
// AMD
"function"==typeof define&&define.amd?define(["angular"],b):b(angular)}(this,function(a){/**
   * CKEditor directive.
   *
   * @example
   * <div ckeditor="options" ng-model="content" ready="onReady()"></div>
   */
function b(a){return{restrict:"A",require:["ckeditor","ngModel"],controller:["$scope","$element","$attrs","$parse","$q",c],link:function(b,c,e,f){
// get needed controllers
var g=f[0],h=f[1];
// Initialize the editor content when it is ready.
g.ready().then(function(){
// Sync view on specific events.
["dataReady","change","blur","saveSnapshot"].forEach(function(a){g.onCKEvent(a,function(){h.$setViewValue(g.instance.getData()||"")})}),g.instance.setReadOnly(!!e.readonly),e.$observe("readonly",function(a){g.instance.setReadOnly(!!a)}),
// Defer the ready handler calling to ensure that the editor is
// completely ready and populated with data.
d(function(){a(e.ready)(b)})}),
// Set editor data when view data change.
h.$render=function(){g.ready().then(function(){g.instance.setData(h.$viewValue||"",{noSnapshot:!0,callback:function(){
//Amends the top of the undo stack with the current DOM changes
g.instance.fire("updateSnapshot")}})})}}}}/**
   * CKEditor controller.
   */
function c(a,b,c,e,f){var g,h=e(c.ckeditor)(a)||{},i=b[0],j=f.defer();// a deferred to be resolved when the editor is ready
// Create editor instance.
g=i.hasAttribute("contenteditable")&&"true"==i.getAttribute("contenteditable").toLowerCase()?this.instance=CKEDITOR.inline(i,h):this.instance=CKEDITOR.replace(i,h),this.onCKEvent=function(b,c){function e(){var a=arguments;d(function(){f.apply(null,a)})}function f(){var b=arguments;a.$apply(function(){c.apply(null,b)})}return g.on(b,e),function(){g.removeListener(b,f)}},this.onCKEvent("instanceReady",function(){j.resolve(!0)}),this.ready=function(){return j.promise},a.$on("$destroy",function(){j.promise.then(function(){g.destroy(!1)})})}a.module("ckeditor",[]).directive("ckeditor",["$parse",b]);
// Polyfill setImmediate function.
var d=window&&window.setImmediate?window.setImmediate:function(a){setTimeout(a,0)}});
//# sourceMappingURL=angular-ckeditor.min.js.map