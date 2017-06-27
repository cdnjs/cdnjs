/*
 * JCF directive for basic AngularJS 1.x integration
 */
angular.module("jcf",[]).directive("jcf",function(){return{restrict:"A",link:function(c,n,e){jcf.replace(n),c.$watch(e.ngModel,function(c){jcf.refresh(n)}),c.$on("$destroy",function(){jcf.destroy(n)})}}});