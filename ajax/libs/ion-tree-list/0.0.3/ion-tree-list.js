"use strict";

var CONF = {
    baseUrl: 'lib/ion-tree-list',
    digestTtl: 35
};

function addDepthToTree(obj, depth, collapsed) {
    for (var key in obj) {
        if (typeof(obj[key]) == 'object') {
            obj[key].depth = depth;
            obj[key].collapsed = collapsed;
            addDepthToTree(obj[key], key === 'tree' ? ++ depth : depth, collapsed)
        }
    }
    return obj
}

function toggleCollapse(obj) {
    for (var key in obj) {
        if (typeof(obj[key]) == 'object') {
            obj[key].collapsed = !obj[key].collapsed;
            toggleCollapse(obj[key])
        }
    }
    return obj
}

angular.module('ion-tree-list', [], function($rootScopeProvider){
    $rootScopeProvider.digestTtl(CONF.digestTtl)
})
.directive('ionTreeList', function () {
    return {
        restrict: 'E',
        scope: {
            items: '=',
            collapsed: '=',
            templateUrl: '@'
        },
        templateUrl: CONF.baseUrl + '/ion-tree-list.tmpl.html',
        controller: function($scope){
            $scope.baseUrl = CONF.baseUrl;
            $scope.toggleCollapse = toggleCollapse;

            $scope.$watch('collapsed', function(){
                $scope.toggleCollapse($scope.items);
            });

            $scope.$watch('items', function(){
                $scope.items = addDepthToTree($scope.items, 1, $scope.collapsed);
            });

            $scope.templateUrl = $scope.templateUrl ? $scope.templateUrl : 'item_default_renderer';
        }
    }
});
