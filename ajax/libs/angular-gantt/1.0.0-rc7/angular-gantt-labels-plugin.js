/*
Project: angular-gantt v1.0.0-rc7 - Gantt chart component for AngularJS
Authors: Marco Schweighauser, Rémi Alvergnat
License: MIT
Homepage: http://www.angular-gantt.com
Github: https://github.com/angular-gantt/angular-gantt.git
*/
(function(){
    'use strict';
    angular.module('gantt.labels', ['gantt', 'gantt.labels.templates']).directive('ganttLabels', ['ganttUtils', '$compile', '$document', '$timeout', function(utils, $compile, $document, $timeout) {
        // Provides the row sort functionality to any Gantt row
        // Uses the sortableState to share the current row

        return {
            restrict: 'E',
            require: '^gantt',
            scope: {
                enabled: '=?'
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

                scope.$watch('enabled', function(oldValue, newValue) {
                    if (oldValue !== newValue) {
                        $timeout(function() {
                            api.columns.refresh();
                        });
                    }
                });

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

            }
        };
    }]);
}());


(function(){
    'use strict';
    angular.module('gantt').directive('ganttLabelsBody', ['GanttDirectiveBuilder', function(Builder) {
        var builder = new Builder('ganttLabelsBody', 'plugins/labels/labelsBody.tmpl.html');
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