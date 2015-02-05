/*
Project: angular-gantt v1.0.0 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: http://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.labels', ['gantt', 'gantt.labels.templates']).directive('ganttLabels', ['ganttUtils', '$compile', '$document', function(utils, $compile, $document) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?',
                header: '=?'
            },
            link: function(scope, element, attrs, ganttCtrl) {
                var api = ganttCtrl.gantt.api;

                // Load options from global options attribute.
                if (scope.options && typeof(scope.options.sortable) === 'object') {
                    for (var option in scope.options.sortable) {
                        scope[option] = scope.options[option];
                    }
                }

                if (scope.enabled === undefined) {
                    scope.enabled = true;
                }

                if (scope.header === undefined) {
                    scope.header = 'Name';
                }

                api.directives.on.new(scope, function(directiveName, sideContentScope, sideContentElement) {
                    if (directiveName === 'ganttSideContent') {
                        var labelsScope = sideContentScope.$new();
                        labelsScope.pluginScope = scope;

                        var ifElement = $document[0].createElement('div');
                        angular.element(ifElement).attr('data-ng-if', 'pluginScope.enabled');

                        var labelsElement = $document[0].createElement('gantt-side-content-labels');
                        angular.element(ifElement).append(labelsElement);

                        sideContentElement.append($compile(ifElement)(labelsScope));
                    }
                });

                function fitSideWidthToLabels() {
                    var labels = ganttCtrl.gantt.side.$element[0].getElementsByClassName('gantt-row-label');
                    var newSideWidth = 0;

                    angular.forEach(labels, function (label) {
                        var width = label.children[0].offsetWidth;
                        newSideWidth = Math.max(newSideWidth, width);
                    });

                    if (newSideWidth >= 0) {
                        api.side.setWidth(newSideWidth);
                    }
                }

                api.registerMethod('labels', 'fitSideWidth', fitSideWidthToLabels, this);
            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttLabelsBody', ['GanttDirectiveBuilder', 'ganttLayout', function(Builder, layout) {
        var builder = new Builder('ganttLabelsBody', 'plugins/labels/labelsBody.tmpl.html');
        builder.controller = function($scope) {
            var hScrollBarHeight = layout.getScrollBarHeight();

            $scope.getLabelsCss = function() {
                var css = {};

                if ($scope.maxHeight) {
                    var bodyScrollBarHeight = $scope.gantt.scroll.isHScrollbarVisible() ? hScrollBarHeight : 0;
                    css['max-height'] = $scope.maxHeight - bodyScrollBarHeight - $scope.gantt.header.getHeight() + 'px';
                }

                return css;
            };
        };
        return builder.build();
    }]);
}());



(function(){
    'use strict';
    angular.module('gantt').directive('ganttLabelsHeader', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttLabelsHeader', 'plugins/labels/labelsHeader.tmpl.html');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttRowHeader', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttRowHeader', 'plugins/labels/rowHeader.tmpl.html');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttRowLabel', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttRowLabel', 'plugins/labels/rowLabel.tmpl.html');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttRowLabels', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttRowLabels', 'plugins/labels/rowLabels.tmpl.html');
        return builder.build();
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttSideContentLabels', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttSideContentLabels', 'plugins/labels/sideContentLabels.tmpl.html');
        return builder.build();
    }]);
}());


//# sourceMappingURL=angular-gantt-labels-plugin.js.map