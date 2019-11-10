(function(){
    'use strict';

    angular.module('mdDataTable', ['templates', 'ngMaterial', 'ngMdIcons']);
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
                $scope.deleteSelectedRows = deleteSelectedRows;

                function deleteSelectedRows(){
                    var deletedRows = $scope.tableDataStorageService.deleteSelectedRows();

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

    mdDataTableDirective.$inject = ['TableDataStorageFactory', 'mdtPaginationHelperFactory', 'IndexTrackerFactory'];
    function mdDataTableDirective(TableDataStorageFactory, mdtPaginationHelperFactory, IndexTrackerFactory){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '=',
                alternateHeaders: '=',
                sortableColumns: '=',
                deleteRowCallback: '&',
                animateSortIcon: '=',
                rippleEffect: '=',
                paginatedRows: '='
            },
            controller: ['$scope', function($scope){
                var vm = this;

                initTableStorageServiceAndBindMethods();
                initIndexTrackerServiceAndBindMethods();

                vm.addHeaderCell = addHeaderCell;

                function initTableStorageServiceAndBindMethods(){
                    $scope.tableDataStorageService = TableDataStorageFactory.getInstance();
                    $scope.mdtPaginationHelper = mdtPaginationHelperFactory.getInstance($scope.tableDataStorageService, $scope.paginatedRows);

                    vm.addRowData = _.bind($scope.tableDataStorageService.addRowData, $scope.tableDataStorageService);
                }

                function initIndexTrackerServiceAndBindMethods(){
                    var indexHelperService = IndexTrackerFactory.getInstance();

                    vm.increaseIndex = _.bind(indexHelperService.increaseIndex, indexHelperService);
                    vm.getIndex = _.bind(indexHelperService.getIndex, indexHelperService);
                }

                function addHeaderCell(ops){
                    $scope.tableDataStorageService.addHeaderCellData(ops);
                }
            }],
            link: function($scope, element, attrs, ctrl, transclude){
                injectContentIntoTemplate();

                $scope.isAnyRowSelected = _.bind($scope.tableDataStorageService.isAnyRowSelected, $scope.tableDataStorageService);
                $scope.isPaginationEnabled = isPaginationEnabled;

                function isPaginationEnabled(){
                    if($scope.paginatedRows === true || ($scope.paginatedRows && $scope.paginatedRows.hasOwnProperty('isEnabled') && $scope.paginatedRows.isEnabled === true)){
                        return true;
                    }

                    return false;
                }

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

                        element.find('#reader').append(headings).append(body);
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTable', mdDataTableDirective);
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

    TableDataStorageFactory.$inject = ['$log'];
    function TableDataStorageFactory($log){

        function TableDataStorageService(){
            this.storage = [];
            this.header = [];

            this.sortByColumnLastIndex = null;
            this.orderByAscending = true;
        }

        TableDataStorageService.prototype.addHeaderCellData = function(ops){
            this.header.push(ops);
        };

        TableDataStorageService.prototype.addRowData = function(explicitRowId, rowArray){
            if(rowArray === undefined){
                $log.error('`rowArray` parameter is required');
                return;
            }

            if(!(rowArray instanceof Array)){
                $log.error('`rowArray` parameter should be array');
                return;
            }

            this.storage.push({
                rowId: explicitRowId,
                optionList: {
                    selected: false,
                    deleted: false,
                    visible: true
                },
                data: rowArray
            });
        };

        TableDataStorageService.prototype.getRowData = function(index){
            if(!this.storage[index]){
                $log.error('row is not exists at index: '+index);
                return;
            }

            return this.storage[index].data;
        };

        TableDataStorageService.prototype.getRowOptions = function(index){
            if(!this.storage[index]){
                $log.error('row is not exists at index: '+index);
                return;
            }

            return this.storage[index].optionList;
        };

        TableDataStorageService.prototype.setAllRowsSelected = function(isSelected, isPaginationEnabled){
            if(isSelected === undefined){
                $log.error('`isSelected` parameter is required');
                return;
            }

            _.each(this.storage, function(rowData){
                if(isPaginationEnabled) {
                    if (rowData.optionList.visible) {
                        rowData.optionList.selected = isSelected ? true : false;
                    }
                }else{
                    rowData.optionList.selected = isSelected ? true : false;
                }
            });
        };

        TableDataStorageService.prototype.reverseRows = function(){
            this.storage.reverse();
        };

        TableDataStorageService.prototype.sortByColumn = function(columnIndex, iteratee){
            if(this.sortByColumnLastIndex === columnIndex){
                this.reverseRows();

                this.orderByAscending = !this.orderByAscending;
            }else{
                this.sortByColumnIndex(columnIndex, iteratee);

                this.sortByColumnLastIndex = columnIndex;
                this.orderByAscending = true;
            }

            return this.orderByAscending ? -1 : 1;
        };

        TableDataStorageService.prototype.sortByColumnIndex = function(index, iteratee){

            var sortFunction;
            if (typeof iteratee === 'function') {
                sortFunction = function(rowData) {
                    return iteratee(rowData.data[index], rowData, index);
                };
            } else {
                sortFunction = function (rowData) {
                    return rowData.data[index];
                };
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

    function mdtPaginationHelperFactory(){

        function mdtPaginationHelper(tableDataStorageService, paginationSetting){
            this.tableDataStorageService = tableDataStorageService;

            if(paginationSetting &&
                paginationSetting.hasOwnProperty('rowsPerPageValues') &&
                paginationSetting.rowsPerPageValues.length > 0){

                this.rowsPerPageValues = paginationSetting.rowsPerPageValues
            }else{
                this.rowsPerPageValues = [10,20,30,50,100];
            }

            this.rowsPerPage = this.rowsPerPageValues[0];
            this.page = 1;
        }

        mdtPaginationHelper.prototype.getRows = function(){
            var that = this;

            _.each(this.tableDataStorageService.storage, function (rowData, index) {
                if(index >= that.getStartRowIndex() && index <= that.getEndRowIndex()) {
                    rowData.optionList.visible = true;
                } else {
                    rowData.optionList.visible = false;
                }
            });

            return this.tableDataStorageService.storage;
        };

        mdtPaginationHelper.prototype.getStartRowIndex = function(){
            return (this.page-1) * this.rowsPerPage;
        };

        mdtPaginationHelper.prototype.getEndRowIndex = function(){
            return this.getStartRowIndex() + this.rowsPerPage-1;
        };

        mdtPaginationHelper.prototype.getTotalRowsCount = function(){
            return this.tableDataStorageService.storage.length;
        };

        mdtPaginationHelper.prototype.previousPage = function(){
            if(this.page > 1){
                this.page--;
            }
        };

        mdtPaginationHelper.prototype.nextPage = function(){
            var totalPages = Math.ceil(this.getTotalRowsCount() / this.rowsPerPage);

            if(this.page < totalPages){
                this.page++;
            }
        };

        return {
            getInstance: function(tableDataStorageService, isEnabled){
                return new mdtPaginationHelper(tableDataStorageService, isEnabled);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('mdtPaginationHelperFactory', mdtPaginationHelperFactory);
}());
(function(){
    'use strict';

    ColumnAlignmentHelper.$inject = ['ColumnOptionProvider'];
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

    angular
        .module('mdDataTable')
        .service('ColumnAlignmentHelper', ColumnAlignmentHelper);
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

    mdDataTableCellDirective.$inject = ['$parse'];
    function mdDataTableCellDirective($parse){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                htmlContent: '@'
            },
            require: ['^mdDataTable','^mdDataTableRow'],
            link: function($scope, element, attrs, ctrl, transclude){
                var mdDataTableRowCtrl = ctrl[1];

                transclude(function (clone) {
                    //TODO: rework, figure out something for including html content
                    if($scope.htmlContent){
                        mdDataTableRowCtrl.addToRowDataStorage(clone, 'htmlContent');
                    }else{
                        //TODO: better idea?
                        var cellValue = $parse(clone.html().replace('{{', '').replace('}}', ''))($scope.$parent);
                        mdDataTableRowCtrl.addToRowDataStorage(cellValue);
                    }
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableCell', mdDataTableCellDirective);
}());
(function(){
    'use strict';

    mdDataTableRowDirective.$inject = ['IndexTrackerFactory'];
    function mdDataTableRowDirective(IndexTrackerFactory){
        return {
            restrict: 'E',
            transclude: true,
            require: '^mdDataTable',
            scope: {
                tableRowId: '='
            },
            controller: ['$scope', function($scope){
                var vm = this;

                vm.addToRowDataStorage = addToRowDataStorage;
                $scope.rowDataStorage = [];

                initIndexTrackerServiceAndBindMethods();

                function initIndexTrackerServiceAndBindMethods(){
                    var indexHelperService = IndexTrackerFactory.getInstance();

                    vm.increaseIndex = _.bind(indexHelperService.increaseIndex, indexHelperService);
                    vm.getIndex = _.bind(indexHelperService.getIndex, indexHelperService);
                }

                function addToRowDataStorage(value, contentType){
                    if(contentType === 'htmlContent'){
                        $scope.rowDataStorage.push({value: value, type: 'html'});
                    }else{
                        $scope.rowDataStorage.push(value);
                    }
                }
            }],
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns();

                ctrl.addRowData($scope.tableRowId, $scope.rowDataStorage);
                //ctrl.increaseIndex();

                function appendColumns(){
                    transclude(function (clone) {
                        element.append(clone);
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableRow', mdDataTableRowDirective);
}());
(function(){
    'use strict';

    function mdDataTableColumnDirective(){
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@',
                sortBy: '=',
                columnDefinition: '@'
            },
            require: ['^mdDataTable'],
            link: function ($scope, element, attrs, ctrl, transclude) {
                var mdDataTableCtrl = ctrl[0];

                transclude(function (clone) {
                    mdDataTableCtrl.addHeaderCell({
                        alignRule: $scope.alignRule,
                        sortBy: $scope.sortBy,
                        columnDefinition: $scope.columnDefinition,
                        columnName: clone.html()
                    });
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableColumn', mdDataTableColumnDirective);
}());
(function(){
    'use strict';

    function mdDataTableGeneratedHeaderCellContentDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdDataTableGeneratedHeaderCellContent.html',
            replace: true,
            scope: false,
            link: function(){

            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableGeneratedHeaderCellContentDirective', mdDataTableGeneratedHeaderCellContentDirective);
}());
(function(){
    'use strict';

    function mdDataTableHeaderRowDirective(){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^mdDataTable',
            scope: true,
            link: function($scope, element, attrs, mdDataTableCtrl, transclude){
                appendColumns();

                function appendColumns(){
                    transclude(function (clone) {
                        element.append(clone);
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableHeaderRow', mdDataTableHeaderRowDirective);
}());
(function(){
    'use strict';

    mdDataTableAddAlignClass.$inject = ['ColumnAlignmentHelper'];
    function mdDataTableAddAlignClass(ColumnAlignmentHelper){
        return {
            restrict: 'A',
            scope: {
                mdDataTableAddAlignClass: '='
            },
            link: function($scope, element){
                var classToAdd = ColumnAlignmentHelper.getColumnAlignClass($scope.mdDataTableAddAlignClass);

                element.addClass(classToAdd);
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableAddAlignClass', mdDataTableAddAlignClass);
}());
(function(){
    'use strict';

    function mdDataTableAddHtmlContentToCellDirective(){
        return {
            restrict: 'A',
            scope: {
                htmlContent: '=mdDataTableAddHtmlContentToCell'
            },
            link: function($scope, element){
                element.append($scope.htmlContent);

                $scope.$watch('htmlContent', function(){
                    element.empty();
                    element.append($scope.htmlContent);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableAddHtmlContentToCell', mdDataTableAddHtmlContentToCellDirective);
}());
(function(){
    'use strict';

    function mdDataTableAnimateSortIconHandlerDirective(){
        return {
            restrict: 'A',
            scope: false,
            link: function($scope, element){
                if($scope.animateSortIcon){
                    element.addClass('animate-sort-icon');
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableAnimateSortIconHandler', mdDataTableAnimateSortIconHandlerDirective);
}());
(function(){
    'use strict';

    function mdDataTableSelectAllRowsHandlerDirective(){
        return {
            restrict: 'A',
            scope: false,
            link: function($scope){
                $scope.selectAllRows = false;

                $scope.$watch('selectAllRows', function(val){
                    $scope.tableDataStorageService.setAllRowsSelected(val, $scope.isPaginationEnabled());
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableSelectAllRowsHandler', mdDataTableSelectAllRowsHandlerDirective);
}());
(function(){
    'use strict';

    function mdDataTableSortHandlerDirective(){
        return {
            restrict: 'A',
            scope: false,
            link: function($scope, element){
                var columnIndex = $scope.$index;
                $scope.isSorted = isSorted;
                $scope.direction = 1;

                element.on('click', sortHandler);

                function sortHandler(){
                    $scope.$apply(function(){
                        $scope.direction = $scope.tableDataStorageService.sortByColumn(columnIndex, $scope.headerRowData.sortBy);
                    });
                }

                function isSorted(){
                    return $scope.tableDataStorageService.sortByColumnLastIndex === columnIndex;
                }

                $scope.$on('$destroy', function(){
                    element.off('click', sortHandler);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdDataTableSortHandler', mdDataTableSortHandlerDirective);
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
            require: ['^mdDataTable'],
            link: function($scope){
                
            }
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