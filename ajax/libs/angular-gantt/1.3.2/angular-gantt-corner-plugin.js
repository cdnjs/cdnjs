/*
Project: angular-gantt v1.3.2 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: https://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.corner', ['gantt', 'gantt.corner.templates']).directive('ganttCorner', ['ganttUtils', '$compile', '$document', function(utils, $compile, $document) {
        // Provides customization for corner area

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                headersLabels: '=?',
                headersLabelsTemplates: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.corner) === 'object') {
                    for (var option in scope.options.corner) {
                        scope[option] = scope.options.corner[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                api.directives.on.new(scope, function(directiveName, sideBackgroundScope, sideBackgroundElement) {
                    if (directiveName === 'ganttSideBackground') {
                        var cornerScope = sideBackgroundScope.$new();
                        cornerScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');
                        angular.element(ifElement).addClass('gantt-corner-area');

                        var topElement = $document[0].createElement('gantt-corner-area');
                        angular.element(ifElement).append(topElement);

                        sideBackgroundElement[0].parentNode.insertBefore($compile(ifElement)(cornerScope)[0], sideBackgroundElement[0].nextSibling);
                    }
                });

            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt.corner').directive('ganttCornerArea', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttCornerArea', 'plugins/corner/corner.tmpl.html');
        builder.controller = function($scope) {
            var headers = $scope.gantt.columnsManager.headers;

            function updateModelWithHeaders(headers) {
                var scopeHeaders = [];
                for (var i=0; i<headers.length; i++) {
                    var columns = headers[i];
                    var name = columns[0].name;
                    var unit = columns[0].unit;
                    var scopeHeader = {columns: columns, unit: unit, name: name};
                    scopeHeaders.push(scopeHeader);
                }
                $scope.headers = scopeHeaders;

            }
            updateModelWithHeaders(headers);

            $scope.getLabel = function(header) {
                var label = header.name;

                if ($scope.pluginScope.headersLabels && header.name in $scope.pluginScope.headersLabels) {
                    label = $scope.pluginScope.headersLabels[header.name];
                    if (angular.isFunction(label)) {
                        label = label(header.name, header.unit, header.columns);
                    }
                } else if (angular.isFunction($scope.pluginScope.headersLabels)) {
                    label = $scope.pluginScope.headersLabels(header.name, header.unit, header.columns);
                }

                return label;
            };

            $scope.getLabelContent = function(header) {
                var content;
                if (content === undefined && $scope.pluginScope.headersLabelsTemplates !== undefined) {
                    content = $scope.pluginScope.headersLabelsTemplates;

                    if (angular.isObject(content) && header.name in content) {
                        content = content[header.name];
                    }

                    if (angular.isFunction(content)) {
                        content = content(header.name, header.unit, header.columns);
                    }
                }
                if (content === undefined) {
                    return '{{getLabel(header)}}';
                }
                return content;
            };

            $scope.gantt.api.columns.on.generate($scope, function(columns, headers) {
                updateModelWithHeaders(headers);
            });
        };
        return builder.build();
    }]);
}());


angular.module('gantt.corner.templates', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('plugins/corner/corner.tmpl.html',
        '<div class="gantt-corner-area-content">\n' +
        '    <div ng-show="$parent.ganttHeaderHeight" class="gantt-header-row" ng-repeat="header in headers">\n' +
        '        <div class="gantt-column-header" ><span class="gantt-label-text" gantt-bind-compile-html="getLabelContent(header)"></span></div>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
}]);

//# sourceMappingURL=angular-gantt-corner-plugin.js.map