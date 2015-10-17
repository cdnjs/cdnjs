/*
Project: angular-gantt for AngularJS
Author: Marco Schweighauser
Contributors: Rémi Alvergnat
License: MIT.
Github: https://github.com/angular-gantt/angular-gantt
*/
(function(){
    'use strict';
    angular.module('gantt.sortable', ['gantt', 'ang-drag-drop']).directive('ganttSortable', ['ganttUtils', '$compile', function(utils, $compile) {
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

                api.directives.on.new(scope, function(directiveName, rowScope, rowElement) {
                    if (directiveName === 'ganttRowLabel') {
                        rowScope.checkDraggable = function() {
                            return utils.firstProperty([rowScope.row.model.sortable], 'enabled', scope.enabled);
                        };

                        rowScope.onDropSuccess = function() {
                            rowScope.$evalAsync();
                        };

                        rowScope.onDrop = function(evt, data) {
                            var row = rowScope.row.rowsManager.rowsMap[data.id];
                            if (row !== rowScope) {
                                rowScope.row.rowsManager.moveRow(row, rowScope.row);
                                rowScope.$evalAsync();
                            }
                        };

                        rowElement.attr('ui-draggable', '{{checkDraggable()}}');
                        rowElement.attr('drag-channel', '\'sortable\'');
                        rowElement.attr('ui-on-drop', 'onDrop($event, $data)');
                        rowElement.attr('on-drop-success', 'onDropSuccess()');

                        rowElement.attr('drop-channel', '\'sortable\'');
                        rowElement.attr('drag', 'row.model');

                        $compile(rowElement)(rowScope);
                    }
                });

            }
        };
    }]);
}());


//# sourceMappingURL=angular-gantt-sortable-plugin.js.map