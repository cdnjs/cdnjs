(function(){
    'use strict';

    angular.module('mdDataTable', ['templates', 'ngMaterial', 'uuid4', 'ngMdIcons']);
}());
(function(){
    'use strict';

    function mdDataTableAlternateHeadersDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableAlternateHeaders.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdDataTable'],
            link: function($scope){
                $scope.getNumberOfSelectedRows = _.bind($scope.tableDataStorageService.getNumberOfSelectedRows, $scope.tableDataStorageService);
                $scope.deleteSelectedRows = deleteSelectedRows;

                function deleteSelectedRows(){
                    var deletedRows = $scope.tableDataStorageService.deleteSelectedRows.apply($scope.tableDataStorageService, arguments);

                    $scope.deleteRowCallback({rows: deletedRows});
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableAlternateHeaders', mdDataTableAlternateHeadersDirective);
}());
(function(){
    'use strict';

    function mdDataTableDirective(ColumnOptionsFactory, TableDataStorageFactory, IndexTrackerFactory){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '=',
                alternateHeaders: '=',
                sortableColumns: '=',
                deleteRowCallback: '&'
            },
            controller: ['$scope', function($scope){
                var vm = this;

                initColumnOptionsFactoryAndBindMethods();
                initTableStorageServiceAndBindMethods();
                initIndexTrackerServiceAndBindMethods();

                vm.isSelectableRows = isSelectableRows;
                vm.isSortingEnabled = isSortingEnabled;

                vm.sortByColumn = sortByColumn;
                vm.getSortedColumnIndex = getSortedColumnIndex;

                function initTableStorageServiceAndBindMethods(){
                    $scope.tableDataStorageService = TableDataStorageFactory.getInstance();

                    vm.addRowData = _.bind($scope.tableDataStorageService.addRowData, $scope.tableDataStorageService);
                    vm.getRowData = _.bind($scope.tableDataStorageService.getRowData, $scope.tableDataStorageService);
                    vm.getRowOptions = _.bind($scope.tableDataStorageService.getRowOptions, $scope.tableDataStorageService);
                    vm.setAllRowsSelected = _.bind($scope.tableDataStorageService.setAllRowsSelected, $scope.tableDataStorageService);
                }

                function initIndexTrackerServiceAndBindMethods(){
                    var indexHelperService = IndexTrackerFactory.getInstance();

                    vm.increaseIndex = _.bind(indexHelperService.increaseIndex, indexHelperService);
                    vm.getIndex = _.bind(indexHelperService.getIndex, indexHelperService);
                }

                function initColumnOptionsFactoryAndBindMethods(){
                    var columnOptionsService = ColumnOptionsFactory.getInstance();

                    vm.addColumnOptions = _.bind(columnOptionsService.addColumnOptions, columnOptionsService);
                    vm.getColumnOptions = _.bind(columnOptionsService.getColumnOptions, columnOptionsService);
                }

                function isSelectableRows(){
                    return $scope.selectableRows;
                }

                function isSortingEnabled(){
                    return $scope.sortableColumns;
                }

                var sortByColumnLastIndex = null;
                var orderByAscending = true;
                function sortByColumn(columnIndex, iteratee){
                    if(sortByColumnLastIndex === columnIndex){
                        $scope.tableDataStorageService.reverseRows();

                        orderByAscending = !orderByAscending;
                    }else{
                        $scope.tableDataStorageService.sortByColumnIndex(columnIndex, iteratee);

                        sortByColumnLastIndex = columnIndex;
                        
                        orderByAscending = true;
                    }

                    return orderByAscending ? -1 : 1;
                }

                function getSortedColumnIndex(){
                    return sortByColumnLastIndex;
                }
            }],
            link: function($scope, element, attrs, ctrl, transclude){
                injectContentIntoTemplate();

                $scope.isAnyRowSelected = _.bind($scope.tableDataStorageService.isAnyRowSelected, $scope.tableDataStorageService);

                function injectContentIntoTemplate(){
                    transclude(function (clone) {
                        var headings = [];
                        var body = [];

                        _.each(clone, function (child) {
                            var $child = angular.element(child);

                            if ($child.hasClass('theadTrRow')) {
                                headings.push($child);
                            } else {
                                body.push($child);
                            }
                        });

                        element.find('table thead').append(headings);
                        element.find('table tbody').append(body);
                    });
                }
            }
        };
    }
    mdDataTableDirective.$inject = ['ColumnOptionsFactory', 'TableDataStorageFactory', 'IndexTrackerFactory'];

    angular
        .module('mdDataTable')
        .directive('mdDataTable', mdDataTableDirective);
}());
(function(){
    'use strict';

    function ColumnOptionsFactory(uuid4){

        function ColumnOptionsService(){
            this.columnOptionsList = [];
        }

        ColumnOptionsService.prototype.addColumnOptions = function(options){
            //TODO: maybe we can remove it, not used anymore
            var columnId = uuid4.generate();

            var columnOptions = {
                id: columnId,
                alignRule: options.alignRule,
                sortBy: options.sortBy
            };

            this.columnOptionsList.push(columnOptions);

            return columnOptions;
        };

        ColumnOptionsService.prototype.getColumnOptions = function(index){
            return this.columnOptionsList[index];
        };

        return {
            getInstance: function(){
                return new ColumnOptionsService();
            }
        };
    }
    ColumnOptionsFactory.$inject = ['uuid4'];

    angular
        .module('mdDataTable')
        .factory('ColumnOptionsFactory', ColumnOptionsFactory);
}());
(function(){
    'use strict';

    function IndexTrackerFactory(){

        function IndexTrackerService(){
            this.indexValue = 0;
        }

        IndexTrackerService.prototype.increaseIndex = function(){
            this.indexValue++;
        };

        IndexTrackerService.prototype.getIndex = function(){
            return this.indexValue;
        };

        return {
            getInstance: function(){
                return new IndexTrackerService();
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('IndexTrackerFactory', IndexTrackerFactory);
}());
(function(){
    'use strict';

    function TableDataStorageFactory(){

        function TableDataStorageService(){
            this.storage = [];
        }

        TableDataStorageService.prototype.addRowData = function(explicitRowId, rowArray){
            if(rowArray === undefined){
                throw new Error('`rowArray` parameter is required');
            }

            if(!(rowArray instanceof Array)){
                throw new Error('`rowArray` parameter should be array');
            }

            this.storage.push({
                rowId: explicitRowId,
                optionList: {
                    selected: false,
                    deleted: false
                },
                data: rowArray
            });
        };

        TableDataStorageService.prototype.getRowData = function(index){
            if(!this.storage[index]){
                throw Error('row is not exists at index: '+index);
            }

            return this.storage[index].data;
        };

        TableDataStorageService.prototype.getRowOptions = function(index){
            if(!this.storage[index]){
                throw Error('row is not exists at index: '+index);
            }

            return this.storage[index].optionList;
        };

        TableDataStorageService.prototype.setAllRowsSelected = function(isSelected){
            if(isSelected === undefined){
                throw new Error('`isSelected` parameter is required');
            }

            _.each(this.storage, function(rowData){
                rowData.optionList.selected = isSelected ? true : false;
            });
        };

        TableDataStorageService.prototype.reverseRows = function(){
            this.storage.reverse();
        };

        TableDataStorageService.prototype.sortByColumnIndex = function(index, iteratee){

            var sortFunction;
            if (typeof iteratee == 'function') {
                sortFunction = function(rowData) {
                    return iteratee(rowData.data[index], rowData, index)
                }
            } else {
                sortFunction = function (rowData) {
                    return rowData.data[index];
                }
            }

            var res = _.sortBy(this.storage, sortFunction);

            this.storage = res;
        };

        TableDataStorageService.prototype.isAnyRowSelected = function(){
            return _.some(this.storage, function(rowData){
                return rowData.optionList.selected === true && rowData.optionList.deleted === false;
            });
        };

        TableDataStorageService.prototype.getNumberOfSelectedRows = function(){
            var res = _.countBy(this.storage, function(rowData){
                return rowData.optionList.selected === true && rowData.optionList.deleted === false ? 'selected' : 'unselected';
            });

            return res.selected ? res.selected : 0;
        };

        TableDataStorageService.prototype.deleteSelectedRows = function(){
            var deletedRows = [];

            _.each(this.storage, function(rowData){
                if(rowData.optionList.selected && rowData.optionList.deleted === false){

                    if(rowData.rowId){
                        deletedRows.push(rowData.rowId);

                    //Fallback when no id was specified
                    } else{
                        deletedRows.push(rowData.data);
                    }

                    rowData.optionList.deleted = true;
                }
            });

            return deletedRows;
        };

        return {
            getInstance: function(){
                return new TableDataStorageService();
            }
        };
    }

    angular
        .module('mdDataTable')
        .factory('TableDataStorageFactory', TableDataStorageFactory);
}());
(function(){
    'use strict';

    var ColumnOptionProvider = {
        ALIGN_RULE : {
            ALIGN_LEFT: 'left',
            ALIGN_RIGHT: 'right'
        }
    };

    angular.module('mdDataTable')
        .value('ColumnOptionProvider', ColumnOptionProvider);
})();
(function(){
    'use strict';

    function ColumnAlignmentHelper(ColumnOptionProvider){
        var service = this;
        service.getColumnAlignClass = getColumnAlignClass;

        function getColumnAlignClass(alignRule) {
            if (alignRule === ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT) {
                return 'rightAlignedColumn';
            } else {
                return 'leftAlignedColumn';
            }
        }
    }
    ColumnAlignmentHelper.$inject = ['ColumnOptionProvider'];

    angular
        .module('mdDataTable')
        .service('ColumnAlignmentHelper', ColumnAlignmentHelper);
}());
(function(){
    'use strict';

    function mdDataTableCellDirective(ColumnAlignmentHelper, $parse){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCell.html',
            replace: true,
            transclude: true,
            scope: {
                htmlContent: '@'
            },
            require: ['^mdDataTable','^mdDataTableRow'],
            link: function($scope, element, attrs, ctrl, transclude){
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableRowCtrl = ctrl[1];
                var columnIndex = mdDataTableRowCtrl.getIndex();

                //TODO: refactor as the columnDirective
                $scope.getColumnAlignClass = ColumnAlignmentHelper.getColumnAlignClass(getColumnOptions().alignRule);

                transclude(function (clone) {

                    //TODO: rework, figure out something for including html content
                    if($scope.htmlContent){
                        mdDataTableRowCtrl.addToRowDataStorage(columnIndex);
                    }else{
                        //TODO: better idea?
                        var cellValue = $parse(clone.html().replace('{{', '').replace('}}', ''))($scope.$parent);
                        mdDataTableRowCtrl.addToRowDataStorage(cellValue);
                    }
                });

                $scope.getCellValue = getCellValue;

                mdDataTableRowCtrl.increaseIndex();

                function getColumnOptions(){
                    return mdDataTableCtrl.getColumnOptions(columnIndex);
                }

                function getCellValue(){
                    return mdDataTableRowCtrl.getRowDataStorageValue(columnIndex);
                }
            }
        };
    }
    mdDataTableCellDirective.$inject = ['ColumnAlignmentHelper', '$parse'];

    angular
        .module('mdDataTable')
        .directive('mdDataTableCell', mdDataTableCellDirective);
}());
(function(){
    'use strict';

    function mdDataTableRowDirective(IndexTrackerFactory){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableRow.html',
            replace: true,
            transclude: true,
            require: '^mdDataTable',
            scope: {
                tableRowId: '='
            },
            controller: ['$scope', function($scope){
                var vm = this;

                initIndexTrackerServiceAndBindMethods();

                vm.addToRowDataStorage = addToRowDataStorage;
                vm.getRowDataStorageValue = getRowDataStorageValue;
                $scope.rowDataStorage = [];

                function initIndexTrackerServiceAndBindMethods(){
                    var indexHelperService = IndexTrackerFactory.getInstance();

                    vm.increaseIndex = _.bind(indexHelperService.increaseIndex, indexHelperService);
                    vm.getIndex = _.bind(indexHelperService.getIndex, indexHelperService);
                }

                function addToRowDataStorage(value){
                    $scope.rowDataStorage.push(value);
                }

                function getRowDataStorageValue(columnIndex){
                    return $scope.getRowDataStorage()[columnIndex];
                }
            }],
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns();

                var rowIndex = ctrl.getIndex();
                $scope.getRowOptions = getRowOptions;
                $scope.isSelectableRows = ctrl.isSelectableRows;

                ctrl.addRowData($scope.tableRowId, $scope.rowDataStorage);

                $scope.getRowDataStorage = function(){
                    return ctrl.getRowData(rowIndex);
                };

                ctrl.increaseIndex();

                function appendColumns(){
                    //TODO: question: the commented out code is not working properly when data-table-row has an ng-repeat. Why?
                    //angular.element(transclude()).appendTo(element);

                    transclude(function (clone) {
                        element.append(clone);
                    });
                }

                function getRowOptions(){
                    return ctrl.getRowOptions(rowIndex);
                }
            }
        };
    }
    mdDataTableRowDirective.$inject = ['IndexTrackerFactory'];

    angular
        .module('mdDataTable')
        .directive('mdDataTableRow', mdDataTableRowDirective);
}());
(function(){
    'use strict';

    function mdDataTableColumnDirective(ColumnOptionProvider, ColumnAlignmentHelper){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableColumn.html',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@',
                sortBy: '=',
                columnDefinition: '@'
            },
            require: ['^mdDataTable', '^mdDataTableHeaderRow'],
            link: function ($scope, element, attrs, ctrl) {
                var mdDataTableCtrl = ctrl[0];
                var mdDataTableHeaderRowCtrl = ctrl[1];
                var columnIndex;

                getCurrentRowIndex();
                setColumnOptionsForMainController();
                setColumnAlignClass();

                $scope.isSorted = isSorted;
                $scope.clickHandler = clickHandler;
                $scope.isColumnLeftAligned = isColumnLeftAligned;
                $scope.isColumnRightAligned = isColumnRightAligned;
                $scope.isSortingEnabled = isSortingEnabled;

                increaseRowIndex();

                function clickHandler(){
                    if($scope.isSortingEnabled()) {
                        $scope.direction = mdDataTableCtrl.sortByColumn(columnIndex, $scope.sortBy);
                    }
                }

                function isSorted(){
                    return mdDataTableCtrl.getSortedColumnIndex() === columnIndex;
                }

                function setColumnOptionsForMainController(){
                    mdDataTableCtrl.addColumnOptions({
                        alignRule: $scope.alignRule,
                        sortBy: $scope.sortBy,
                        columnDefinition: $scope.columnDefinition
                    });
                }

                function setColumnAlignClass(){
                    $scope.columnAlignClass = ColumnAlignmentHelper.getColumnAlignClass($scope.alignRule);
                }

                function isColumnLeftAligned(){
                    return ColumnOptionProvider.ALIGN_RULE.ALIGN_LEFT === $scope.alignRule;
                }

                function isColumnRightAligned(){
                    return ColumnOptionProvider.ALIGN_RULE.ALIGN_RIGHT === $scope.alignRule;
                }

                function isSortingEnabled(){
                    return mdDataTableCtrl.isSortingEnabled();
                }

                function increaseRowIndex(){
                    mdDataTableHeaderRowCtrl.increaseIndex();
                }

                function getCurrentRowIndex(){
                    columnIndex = mdDataTableHeaderRowCtrl.getIndex();
                }
            }
        };
    }
    mdDataTableColumnDirective.$inject = ['ColumnOptionProvider', 'ColumnAlignmentHelper'];

    angular
        .module('mdDataTable')
        .directive('mdDataTableColumn', mdDataTableColumnDirective);
}());
(function(){
    'use strict';

    function mdDataTableHeaderRowDirective(IndexTrackerFactory){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableHeaderRow.html',
            replace: true,
            transclude: true,
            require: '^mdDataTable',
            scope: true,
            controller: function(){
                var vm = this;

                initIndexTrackerServiceAndBindMethods();

                function initIndexTrackerServiceAndBindMethods(){
                    var indexHelperService = IndexTrackerFactory.getInstance();

                    vm.increaseIndex = _.bind(indexHelperService.increaseIndex, indexHelperService);
                    vm.getIndex = _.bind(indexHelperService.getIndex, indexHelperService);
                }
            },
            link: function($scope, element, attrs, mdDataTableCtrl, transclude){
                $scope.isSelectableRows = mdDataTableCtrl.isSelectableRows;
                $scope.selectAllRows = false;

                appendColumns();
                setupWatchers();

                function appendColumns(){
                    transclude(function (clone) {
                        element.append(clone);
                    });
                }

                function setupWatchers() {
                    $scope.$watch('selectAllRows', function(newVal){
                        mdDataTableCtrl.setAllRowsSelected(newVal);
                    });
                }
            }
        };
    }
    mdDataTableHeaderRowDirective.$inject = ['IndexTrackerFactory'];

    angular
        .module('mdDataTable')
        .directive('mdDataTableHeaderRow', mdDataTableHeaderRowDirective);
}());
(function(){
    'use strict';

    function mdDataTableCardFooterDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCardFooter.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdDataTable']
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCardFooter', mdDataTableCardFooterDirective);
}());
(function(){
    'use strict';

    function mdDataTableCardHeaderDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableCardHeader.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdDataTable']
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCardHeader', mdDataTableCardHeaderDirective);
}());