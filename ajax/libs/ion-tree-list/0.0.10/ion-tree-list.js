"use strict";
/* global angular */

var CONF = {
    baseUrl: 'lib/ion-tree-list',
    digestTtl: 35
};

function addDepthToTree(obj, depth, collapsed) {
    for (var key in obj) {
        if (obj[key] && typeof(obj[key]) == 'object') {
            obj[key].depth = depth;
            obj[key].collapsed = collapsed;
            addDepthToTree(obj[key], key === 'tree' ? ++ depth : depth, collapsed)
        }
    }
    return obj
}

function toggleCollapse(obj) {
    for (var key in obj) {
        if (obj[key] && typeof(obj[key]) == 'object') {
            obj[key].collapsed = !obj[key].collapsed;
            toggleCollapse(obj[key])
        }
    }
    return obj
}

angular.module('ion-tree-list', [], ['$rootScopeProvider', function($rootScopeProvider){
    $rootScopeProvider.digestTtl(CONF.digestTtl)
}])
.directive('ionTreeList', [function() {
    return {
        restrict: 'E',
        scope: {
            items: '=',
            collapsed: '=',
            templateUrl: '@',
            showReorder: '='
        },
        templateUrl: CONF.baseUrl + '/ion-tree-list.tmpl.html',
        controller: ['$scope', function($scope) {
            $scope.baseUrl = CONF.baseUrl;

            $scope.toggleCollapse = function(item) {
                if (item && item.collapsible !== false) {
                    toggleCollapse(item);
                }
            };
            
            $scope.emitEvent = function(item){
                $scope.$emit('$ionTreeList:ItemClicked', item)
            };
            
            $scope.moveItem = function(item, fromIndex, toIndex) {
                $scope.items.splice(fromIndex, 1);
                $scope.items.splice(toIndex, 0, item)
            };
            
            $scope.$watch('collapsed', function() {
                $scope.toggleCollapse($scope.items)
            });

            $scope.$watch('items', function() {
                $scope.items = addDepthToTree($scope.items, 1, $scope.collapsed);
                $scope.$emit('$ionTreeList:LoadComplete', $scope.items)
            })
        }],
        compile: function(element, attrs){
            attrs.templateUrl = attrs.templateUrl ? attrs.templateUrl : 'item_default_renderer';
        }
    }
}]);
