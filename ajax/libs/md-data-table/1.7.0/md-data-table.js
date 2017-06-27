(function(){
    'use strict';

    /**
     * @description
     * Component resolution and creation flow:
     *
     * Because directives are not containing each other in their templates (e.g. not a general parent-child
     * relationship), that's why the resolution of different components are not obvious. They are working with
     * transclusion and it's rule will apply to the process flow.
     * Here is an overview on what directives and which part of that will execute in which order.
     *
     * 1. `mdtTable` controller
     *         - basic services initialized for future usage by other directives
     *
     * 2. `mdtTable` link
     *         - transclude `mdtHeaderRow` and all `mdtRow` elements generated contents (however it's not relevant,
     *           the real generated content is generated with the help of the collected data by `TableStorageService`.
     *         - bind some helper functions for real the generated content
     *
     * 3. Header resolution
     *
     *     3.1. `mdtHeaderRow` link
     *              - transclude all `mdtColumn` directive's generated contents
     *
     *     3.2. `mdtColumn` link(s)
     *              - add columns by the help of the `mdtTable` public API
     *              - contents generated but not yet transcluded
     *
     * 4. Rows resolution
     *
     *     4.1. `mdtRow` controller(s)
     *              - public function created which able to add a cell data to the locally stored array
     *
     *     4.2. `mdtRow` link(s)
     *              - transclude all `mdtCell` directive's generated  contents
     *              - add the collected row data to the service by the help of `mdtTable` public API
     *
     *     4.3. `mdtCell` link(s)
     *              - add cells data by the help of `mdtRow` public API
     *              - contents generated but not yet transcluded
     *
     */
    angular.module('mdDataTable', ['mdtTemplates', 'ngMaterial', 'ngMdIcons', 'ngSanitize']);
}());
(function(){
    'use strict';

    InlineEditModalCtrl.$inject = ['$scope', 'position', 'cellData', 'mdtTranslations', '$timeout', '$mdDialog'];
    function InlineEditModalCtrl($scope, position, cellData, mdtTranslations, $timeout, $mdDialog){

        $timeout(function() {
            var el = $('md-dialog');
            el.css('position', 'fixed');
            el.css('top', position['top']);
            el.css('left', position['left']);

            el.find('input[type="text"]').focus();
        });

        $scope.cellData = cellData;
        $scope.mdtTranslations = mdtTranslations;

        $scope.saveRow = saveRow;
        $scope.cancel = cancel;

        function saveRow(){
            if($scope.editFieldForm.$valid){
                $mdDialog.hide(cellData.value);
            }
        }

        function cancel(){
            $mdDialog.cancel();
        }
    }

    angular
        .module('mdDataTable')
        .controller('InlineEditModalCtrl', InlineEditModalCtrl);
}());
(function(){
    'use strict';

    mdtAlternateHeadersDirective.$inject = ['_'];
    function mdtAlternateHeadersDirective(_){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtAlternateHeaders.html',
            transclude: true,
            replace: true,
            scope: true,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                $scope.deleteSelectedRows = deleteSelectedRows;
                $scope.getNumberOfSelectedRows = _.bind(ctrl.dataStorage.getNumberOfSelectedRows, ctrl.dataStorage);

                function deleteSelectedRows(){
                    var deletedRows = ctrl.dataStorage.deleteSelectedRows();

                    $scope.deleteRowCallback({rows: deletedRows});
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtAlternateHeaders', mdtAlternateHeadersDirective);
}());
(function(){
    'use strict';

    /**
     * @ngdoc directive
     * @name mdtTable
     * @restrict E
     *
     * @description
     * The base HTML tag for the component.
     *
     * @param {object=} tableCard when set table will be embedded within a card, with data manipulation tools available
     *      at the top and bottom.
     *
     *      Properties:
     *
     *      - `{boolean=}` `visible` - enable/disable table card explicitly
     *      - `{string}` `title` - the title of the card
     *      - `{array=}` `actionIcons` - (not implemented yet)
     *
     * @param {boolean=} selectableRows when set each row will have a checkbox
     * @param {boolean=} virtualRepeat when set, virtual scrolling will be applied to the table. You must set a fixed
     *      height to the `.md-virtual-repeat-container` class in order to make it work properly. Since virtual
     *      scrolling is working with fixed height.
     * @param {String=} alternateHeaders some table cards may require headers with actions instead of titles.
     *      Two possible approaches to this are to display persistent actions, or a contextual header that activates
     *      when items are selected
     *
     *      Assignable values are:
     *
     *      - 'contextual' - when set table will have kind of dynamic header. E.g.: When selecting rows, the header will
     *        change and it'll show the number of selected rows and a delete icon on the right.
     *      - 'persistentActions' - (not implemented yet)
     *
     * @param {boolean=} sortableColumns sort data and display a sorted state in the header. Clicking on a column which
     *      is already sorted will reverse the sort order and rotate the sort icon.
     *      (not implemented yet: Use `sortable-rows-default` attribute directive on a column which intended to be the
     *      default sortable column)
     *
     * @param {function(rows)=} deleteRowCallback callback function when deleting rows.
     *      At default an array of the deleted row's data will be passed as the argument.
     *      When `table-row-id` set for the deleted row then that value will be passed.
     *
     * @param {function(rows)=} selectedRowCallback callback function when selecting rows.
     *      At default an array of the selected row's data will be passed as the argument.
     *      When `table-row-id` set for the selected row then that value will be passed.
     *
     * @param {boolean=} animateSortIcon sort icon will be animated on change
     * @param {boolean=} rippleEffect ripple effect will be applied on the columns when clicked (not implemented yet)
     * @param {boolean=} paginatedRows if set then basic pagination will applied to the bottom of the table.
     *
     *      Properties:
     *
     *      - `{boolean=}` `isEnabled` - enables pagination
     *      - `{array}` `rowsPerPageValues` - set page sizes. Example: [5,10,20]
     *
     * @param {object=} mdtRow passing rows data through this attribute will initialize the table with data. Additional
     *      benefit instead of using `mdt-row` element directive is that it makes possible to listen on data changes.
     *
     *      Properties:
     *
     *      - `{array}` `data` - the input data for rows
     *      - `{integer|string=}` `table-row-id-key` - the uniq identifier for a row
     *      - `{function(rowData)=}` `table-row-class-name` - callback to specify the class name of a row
     *      - `{array}` `column-keys` - specifying property names for the passed data array. Makes it possible to
     *        configure which property assigned to which column in the table. The list should provided at the same order
     *        as it was specified inside `mdt-header-row` element directive.
     *
     * @param {function(page, pageSize)=} mdtRowPaginator providing the data for the table by a function. Should set a
     *      function which returns a promise when it's called. When the function is called, these parameters will be
     *      passed: `page` and `pageSize` which can help implementing an ajax-based paging.
     *
     * @param {string=} mdtRowPaginatorErrorMessage overrides default error message when promise gets rejected by the
     *      paginator function.
     *
     * @param {string=} mdtRowPaginatorNoResultsMessage overrides default 'no results' message.
     *
     * @param {function(loadPageCallback)=} mdtTriggerRequest provide a callback function for manually triggering an
     *      ajax request. Can be useful when you want to populate the results in the table manually. (e.g.: having a
     *      search field in your page which then can trigger a new request in the table to show the results based on
     *      that filter.
     *
     * @param {object=} mdtTranslations accepts various key-value pairs for custom translations.
     *
     * @example
     * <h2>`mdt-row` attribute:</h2>
     *
     * When column names are: `Product name`, `Creator`, `Last Update`
     * The passed data row's structure: `id`, `item_name`, `update_date`, `created_by`
     *
     * Then the following setup will parse the data to the right columns:
     * <pre>
     *     <mdt-table
     *         mdt-row="{
     *             'data': controller.data,
     *             'table-row-id-key': 'id',
     *             'column-keys': ['item_name', 'update_date', 'created_by']
     *         }">
     *
     *         <mdt-header-row>
     *             <mdt-column>Product name</mdt-column>
     *             <mdt-column>Creator</mdt-column>
     *             <mdt-column>Last Update</mdt-column>
     *         </mdt-header-row>
     *     </mdt-table>
     * </pre>
     */
    mdtTableDirective.$inject = ['TableDataStorageFactory', 'EditRowFeature', 'SelectableRowsFeature', 'PaginationFeature', '_'];
    function mdtTableDirective(TableDataStorageFactory,
                               EditRowFeature,
                               SelectableRowsFeature,
                               PaginationFeature,
                               _){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtTable.html',
            transclude: true,
            scope: {
                tableCard: '=',
                selectableRows: '=',
                alternateHeaders: '=',
                sortableColumns: '=',
                deleteRowCallback: '&',
                selectedRowCallback: '&',
                saveRowCallback: '&',
                animateSortIcon: '=',
                rippleEffect: '=',
                paginatedRows: '=',
                mdtRow: '=',
                mdtRowPaginator: '&?',
                mdtRowPaginatorErrorMessage:"@",
                mdtRowPaginatorNoResultsMessage:"@",
                virtualRepeat: '=',
                mdtTriggerRequest: '&?',
                mdtTranslations: '=?'
            },
            controller: ['$scope', function mdtTable($scope){
                var vm = this;

                $scope.rippleEffectCallback = function(){
                    return $scope.rippleEffect ? $scope.rippleEffect : false;
                };

                _setDefaultTranslations();

                _initTableStorage();

                PaginationFeature.initFeature($scope, vm);

                _processData();

                // initialization of the storage service
                function _initTableStorage(){
                    vm.dataStorage = TableDataStorageFactory.getInstance(vm.virtualRepeat);
                }

                // set translations or fallback to a default value
                function _setDefaultTranslations(){
                    $scope.mdtTranslations = $scope.mdtTranslations || {};

                    $scope.mdtTranslations.rowsPerPage = $scope.mdtTranslations.rowsPerPage || 'Rows per page:';

                    $scope.mdtTranslations.largeEditDialog = $scope.mdtTranslations.largeEditDialog || {};
                    $scope.mdtTranslations.largeEditDialog.saveButtonLabel = $scope.mdtTranslations.largeEditDialog.saveButtonLabel || 'Save';
                    $scope.mdtTranslations.largeEditDialog.cancelButtonLabel = $scope.mdtTranslations.largeEditDialog.cancelButtonLabel || 'Cancel';
                }

                // fill storage with values if set
                function _processData(){
                    if(_.isEmpty($scope.mdtRow)) {
                        return;
                    }

                    //local search/filter
                    if (angular.isUndefined($scope.mdtRowPaginator)) {
                        $scope.$watch('mdtRow', function (mdtRow) {
                            vm.dataStorage.storage = [];

                            _addRawDataToStorage(mdtRow['data']);
                        }, true);
                    }else{
                        //if it's used for 'Ajax pagination'
                    }
                }

                function _addRawDataToStorage(data){
                    var rowId;
                    var columnValues = [];
                    _.each(data, function(row){
                        rowId = _.get(row, $scope.mdtRow['table-row-id-key']);
                        columnValues = [];

                        _.each($scope.mdtRow['column-keys'], function(columnKey){
                            columnValues.push({
                                attributes: {
                                    editableField: false
                                },
                                columnKey: columnKey,
                                value: _.get(row, columnKey)
                            });
                        });

                        vm.dataStorage.addRowData(rowId, columnValues);
                    });
                }
            }],
            link: function($scope, element, attrs, ctrl, transclude){

                $scope.dataStorage = ctrl.dataStorage;

                _injectContentIntoTemplate();

                _initEditRowFeature();
                _initSelectableRowsFeature();

                PaginationFeature.startFeature(ctrl);

                function _injectContentIntoTemplate(){
                    transclude(function (clone) {
                        var headings = [];
                        var body = [];
                        var customCell = [];

                        _.each(clone, function (child) {
                            var $child = angular.element(child);

                            if ($child.hasClass('theadTrRow')) {
                                headings.push($child);
                            } else if($child.hasClass('customCell')) {
                                customCell.push($child);
                            } else {
                                body.push($child);
                            }
                        });

                        element.find('#reader').append(headings).append(body);
                    });
                }

                function _initEditRowFeature(){
                    //TODO: make it possible to only register feature if there is at least
                    // one column which requires it.
                    // for that we need to change the place where we register edit-row.
                    // Remove mdt-row attributes --> do it in mdt-row attribute directive on mdtTable
                    EditRowFeature.addRequiredFunctions($scope, ctrl);
                }

                function _initSelectableRowsFeature(){
                    SelectableRowsFeature.getInstance({
                        $scope: $scope,
                        ctrl: ctrl
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtTable', mdtTableDirective);
}());

(function(){
    'use strict';

    TableDataStorageFactory.$inject = ['$log', '_'];
    function TableDataStorageFactory($log, _){

        function TableDataStorageService(isVirtualRepeatEnabled){
            this.storage = [];
            this.header = [];
            this.customCells = {};

            this.sortByColumnLastIndex = null;
            this.orderByAscending = true;
            this.isVirtualRepeatEnabled = isVirtualRepeatEnabled;
        }

        TableDataStorageService.prototype.addHeaderCellData = function(ops){
            this.header.push(ops);
        };

        TableDataStorageService.prototype.addRowData = function(explicitRowId, rowArray, className){
            if(!(rowArray instanceof Array)){
                $log.error('`rowArray` parameter should be array');
                return;
            }

            this.storage.push({
                rowId: explicitRowId,
                optionList: {
                    selected: false,
                    deleted: false,
                    visible: true,
                    className: className || false
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
            if(typeof isSelected === 'undefined'){
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
                    return iteratee(rowData.data[index].value, rowData, index);
                };
            } else {
                sortFunction = function (rowData) {
                    return rowData.data[index].value;
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

        TableDataStorageService.prototype.getSelectedRows = function(){
            var selectedRows = [];

            _.each(this.storage, function(rowData){
                if(rowData.optionList.selected && rowData.optionList.deleted === false){

                    if(rowData.rowId){
                        selectedRows.push(rowData.rowId);

                    //Fallback when no id was specified
                    } else{
                        selectedRows.push(rowData.data);
                    }
                }
            });

            return selectedRows;
        };

        TableDataStorageService.prototype.getSavedRowData = function(rowData){
            var rawRowData = [];

            _.each(rowData.data, function(aCell){
                rawRowData.push(aCell.value);
            });

            return rawRowData;
        };

        return {
            getInstance: function(isVirtualRepeatEnabled){
                return new TableDataStorageService(isVirtualRepeatEnabled);
            }
        };
    }

    angular
        .module('mdDataTable')
        .factory('TableDataStorageFactory', TableDataStorageFactory);
}());
(function(){
    'use strict';

    mdtAjaxPaginationHelperFactory.$inject = ['ColumnFilterFeature', '_'];
    function mdtAjaxPaginationHelperFactory(ColumnFilterFeature, _){

        function mdtAjaxPaginationHelper(params){
            this.dataStorage = params.dataStorage;
            this.rowOptions = params.mdtRowOptions;
            this.paginatorFunction = params.mdtRowPaginatorFunction;
            this.mdtRowPaginatorErrorMessage = params.mdtRowPaginatorErrorMessage || 'Ajax error during loading contents.';
            this.mdtRowPaginatorNoResultsMessage = params.mdtRowPaginatorNoResultsMessage || 'No results.';
            this.mdtTriggerRequest = params.mdtTriggerRequest;

            if(params.paginationSetting &&
                params.paginationSetting.hasOwnProperty('rowsPerPageValues') &&
                params.paginationSetting.rowsPerPageValues.length > 0){

                this.rowsPerPageValues = params.paginationSetting.rowsPerPageValues;
            }else{
                this.rowsPerPageValues = [10,20,30,50,100];
            }

            this.rowsPerPage = this.rowsPerPageValues[0];
            this.page = 1;
            this.totalResultCount = 0;
            this.totalPages = 0;

            this.isLoading = false;

            //fetching the 1st page
            //this.fetchPage(this.page);

            //triggering ajax call manually
            if(this.mdtTriggerRequest) {
                params.mdtTriggerRequest({
                    loadPageCallback: this.fetchPage.bind(this)
                });
            }
        }

        mdtAjaxPaginationHelper.prototype.getStartRowIndex = function(){
            return (this.page-1) * this.rowsPerPage;
        };

        mdtAjaxPaginationHelper.prototype.getEndRowIndex = function(){
            var lastItem = this.getStartRowIndex() + this.rowsPerPage - 1;

            if(this.totalResultCount < lastItem){
                return this.totalResultCount - 1;
            }

            return lastItem;
        };

        mdtAjaxPaginationHelper.prototype.getTotalRowsCount = function(){
            return this.totalResultCount;
        };

        mdtAjaxPaginationHelper.prototype.getRows = function(){
            return this.dataStorage.storage;
        };

        mdtAjaxPaginationHelper.prototype.previousPage = function(){
            var that = this;
            if(this.hasPreviousPage()){
                this.fetchPage(this.page-1).then(function(){
                    that.page--;
                });
            }
        };

        mdtAjaxPaginationHelper.prototype.nextPage = function(){
            var that = this;
            if(this.hasNextPage()){
                this.fetchPage(this.page+1).then(function(){
                    that.page++;
                });
            }
        };

        mdtAjaxPaginationHelper.prototype.hasNextPage = function(){
            return this.page < this.totalPages;
        };

        mdtAjaxPaginationHelper.prototype.hasPreviousPage = function(){
            return this.page > 1;
        };

        mdtAjaxPaginationHelper.prototype.fetchPage = function(page){
            this.isLoading = true;

            var that = this;

            var callbackArguments = {page: page, pageSize: this.rowsPerPage};

            ColumnFilterFeature.appendAppliedFiltersToCallbackArgument(this.dataStorage, callbackArguments);

            return this.paginatorFunction(callbackArguments)
                .then(function(data){
                    that.dataStorage.storage = [];
                    that.setRawDataToStorage(that, data.results, that.rowOptions['table-row-id-key'], that.rowOptions['column-keys'], that.rowOptions);
                    that.totalResultCount = data.totalResultCount;
                    that.totalPages = Math.ceil(data.totalResultCount / that.rowsPerPage);

                    if(that.totalResultCount == 0){
                        that.isNoResults = true;
                    }else{
                        that.isNoResults = false;
                    }

                    that.isLoadError = false;
                    that.isLoading = false;

                }, function(){
                    that.dataStorage.storage = [];

                    that.isLoadError = true;
                    that.isLoading = false;
                    that.isNoResults = true;
                });
        };

        mdtAjaxPaginationHelper.prototype.setRawDataToStorage = function(that, data, tableRowIdKey, columnKeys, rowOptions){
            var rowId;
            var columnValues = [];
            _.each(data, function(row){
                rowId = _.get(row, tableRowIdKey);
                columnValues = [];

                _.each(columnKeys, function(columnKey){
                    //TODO: centralize adding column values into one place.
                    // Duplication occurs at mdtCellDirective's link function.
                    columnValues.push({
                        attributes: {
                            editableField: false
                        },
                        columnKey: columnKey,
                        value: _.get(row, columnKey)
                    });
                });

                var className = rowOptions['table-row-class-name'] ? rowOptions['table-row-class-name'](row) : false;

                that.dataStorage.addRowData(rowId, columnValues, className);
            });
        };

        mdtAjaxPaginationHelper.prototype.setRowsPerPage = function(rowsPerPage){
            this.rowsPerPage = rowsPerPage;
            this.page = 1;

            this.fetchPage(this.page);
        };

        return {
            getInstance: function(dataStorage, isEnabled, paginatorFunction, rowOptions){
                return new mdtAjaxPaginationHelper(dataStorage, isEnabled, paginatorFunction, rowOptions);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('mdtAjaxPaginationHelperFactory', mdtAjaxPaginationHelperFactory);
}());

(function(){
    'use strict';

    mdtLodashFactory.$inject = ['$window'];
    function mdtLodashFactory($window){
        if(!$window._){
            throw Error('Lodash does not found. Please make sure you load Lodash before any source for mdDataTable');
        }

        return $window._;
    }

    angular
        .module('mdDataTable')
        .factory('_', mdtLodashFactory);
}());
(function(){
    'use strict';

    mdtPaginationHelperFactory.$inject = ['_'];
    function mdtPaginationHelperFactory(_){

        function mdtPaginationHelper(dataStorage, paginationSetting){
            this.dataStorage = dataStorage;

            if(paginationSetting &&
                paginationSetting.hasOwnProperty('rowsPerPageValues') &&
                paginationSetting.rowsPerPageValues.length > 0){

                this.rowsPerPageValues = paginationSetting.rowsPerPageValues;
            }else{
                this.rowsPerPageValues = [10,20,30,50,100];
            }

            this.rowsPerPage = this.rowsPerPageValues[0];
            this.page = 1;
        }

        mdtPaginationHelper.prototype.calculateVisibleRows = function (){
            var that = this;

            _.each(this.dataStorage.storage, function (rowData, index) {
                if(index >= that.getStartRowIndex() && index <= that.getEndRowIndex()) {
                    rowData.optionList.visible = true;
                } else {
                    rowData.optionList.visible = false;
                }
            });
        };

        mdtPaginationHelper.prototype.getStartRowIndex = function(){
            return (this.page-1) * this.rowsPerPage;
        };

        mdtPaginationHelper.prototype.getEndRowIndex = function(){
            var lastItem = this.getStartRowIndex() + this.rowsPerPage-1;

            if(this.dataStorage.storage.length < lastItem){
                return this.dataStorage.storage.length - 1;
            }

            return lastItem;
        };

        mdtPaginationHelper.prototype.getTotalRowsCount = function(){
            return this.dataStorage.storage.length;
        };

        mdtPaginationHelper.prototype.getRows = function(){
            this.calculateVisibleRows();

            return this.dataStorage.storage;
        };

        mdtPaginationHelper.prototype.previousPage = function(){
            if(this.hasPreviousPage()){
                this.page--;
            }
        };

        mdtPaginationHelper.prototype.nextPage = function(){
            if(this.hasNextPage()){
                this.page++;
            }
        };

        mdtPaginationHelper.prototype.hasNextPage = function(){
            var totalPages = Math.ceil(this.getTotalRowsCount() / this.rowsPerPage);

            return this.page < totalPages;
        };

        mdtPaginationHelper.prototype.hasPreviousPage = function(){
            return this.page > 1;
        };

        mdtPaginationHelper.prototype.setRowsPerPage = function(rowsPerPage){
            this.rowsPerPage = rowsPerPage;
            this.page = 1;
        };

        return {
            getInstance: function(dataStorage, isEnabled){
                return new mdtPaginationHelper(dataStorage, isEnabled);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('mdtPaginationHelperFactory', mdtPaginationHelperFactory);
}());
(function(){
    'use strict';

    function ColumnFilterFeature(){

        var service = this;

        /**
         * This is the first entry point when we initialize the feature.
         *
         * The method adds feature-related variable to the passed object.
         * The variables gets stored afterwards in the dataStorage for the header cell
         *
         * @param $scope
         * @param cellDataToStore
         */
        service.appendHeaderCellData = function($scope, cellDataToStore){

            if($scope.columnFilter && $scope.columnFilter.valuesProviderCallback){

                cellDataToStore.columnFilterIsEnabled = true;
                cellDataToStore.columnFiltersApplied = [];
                cellDataToStore.columnFilterValuesProviderCallback = $scope.columnFilter.valuesProviderCallback;
                cellDataToStore.chipTransformerCallback = $scope.columnFilter.chipTransformerCallback;
            }
        };

        /**
         * Generating the needed functions and variables for the header cell which will
         * handle the actions of the column filter component.
         *
         * @param $scope
         * @param headerData
         * @param parentCtrl
         */
        service.initGeneratedHeaderCellContent = function($scope, headerData, parentCtrl){
            if(!headerData.columnFilterIsEnabled){
                return;
            }

            $scope.isColumnFilterVisible = false;

            $scope.cancelFilterDialog = function(event){
                event.stopPropagation();
                $scope.isColumnFilterVisible = false;
            };

            $scope.confirmFilterDialog = function(params){
                params.event.stopPropagation();
                $scope.isColumnFilterVisible = false;

                headerData.columnFiltersApplied = params.selectedItems;

                if($scope.mdtRowPaginator){
                    parentCtrl.mdtPaginationHelper.fetchPage(1);
                }else{
                    // no support for non-ajax yet
                }
            }
        };

        /**
         * Click handler for the feature when header cell gets clicked
         * @param $scope
         * @param headerRowData
         */
        service.generatedHeaderCellClickHandler = function($scope, headerRowData){
            if(!headerRowData.columnFilterIsEnabled) {
                return;
            }

            $scope.isColumnFilterVisible = true;
        };

        /**
         * Returns with an array of currently applied filters on the columns.
         * @param dataStorage
         * @param callbackArguments
         */
        service.appendAppliedFiltersToCallbackArgument = function(dataStorage, callbackArguments){
            var columnFilters = [];
            var isEnabled = false;

            _.each(dataStorage.header, function(headerData){
                var filters = headerData.columnFiltersApplied || [];

                if(headerData.columnFilterIsEnabled){
                    isEnabled = true;
                }

                columnFilters.push(filters);
            });

            if(isEnabled){
                callbackArguments.filtersApplied = columnFilters;
            }
        }
    }

    angular
        .module('mdDataTable')
        .service('ColumnFilterFeature', ColumnFilterFeature);
}());
(function(){
    'use strict';

    EditRowFeature.$inject = ['$mdDialog'];
    function EditRowFeature($mdDialog){

        var service = this;

        service.addRequiredFunctions = function($scope, ctrl){

            $scope.saveRow = function(rowData){
                var rawRowData = ctrl.dataStorage.getSavedRowData(rowData);

                $scope.saveRowCallback({row: rawRowData});
            };

            $scope.showEditDialog = function(ev, cellData, rowData){
                var rect = ev.currentTarget.closest('td').getBoundingClientRect();
                var position = {
                    top: rect.top,
                    left: rect.left
                };

                var ops = {
                    controller: 'InlineEditModalCtrl',
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    escapeToClose: true,
                    focusOnOpen: false,
                    locals: {
                        position: position,
                        cellData: JSON.parse(JSON.stringify(cellData)),
                        mdtTranslations: $scope.mdtTranslations
                    }
                };

                if(cellData.attributes.editableField === 'smallEditDialog'){
                    ops.templateUrl = '/main/templates/smallEditDialog.html';
                }else{
                    ops.templateUrl = '/main/templates/largeEditDialog.html';
                }

                var that = this;
                $mdDialog.show(ops).then(function(cellValue){
                    cellData.value = cellValue;

                    that.saveRow(rowData);
                });
            };
        }
    }

    angular
        .module('mdDataTable')
        .service('EditRowFeature', EditRowFeature);
}());
(function(){
    'use strict';

    PaginationFeature.$inject = ['mdtPaginationHelperFactory', 'mdtAjaxPaginationHelperFactory'];
    function PaginationFeature(mdtPaginationHelperFactory, mdtAjaxPaginationHelperFactory){
        var service = this;

        service.initFeature = initFeature;
        service.startFeature = startFeature;

        function initFeature(scope, ctrl){
            if(!scope.mdtRowPaginator){
                ctrl.mdtPaginationHelper = scope.mdtPaginationHelper = mdtPaginationHelperFactory
                    .getInstance(ctrl.dataStorage, scope.paginatedRows, scope.mdtRow);
            }else{
                ctrl.mdtPaginationHelper = scope.mdtPaginationHelper = mdtAjaxPaginationHelperFactory.getInstance({
                    dataStorage: ctrl.dataStorage,
                    paginationSetting: scope.paginatedRows,
                    mdtRowOptions: scope.mdtRow,
                    mdtRowPaginatorFunction: scope.mdtRowPaginator,
                    mdtRowPaginatorErrorMessage: scope.mdtRowPaginatorErrorMessage,
                    mdtRowPaginatorNoResultsMessage: scope.mdtRowPaginatorNoResultsMessage,
                    mdtTriggerRequest: scope.mdtTriggerRequest
                });
            }

            scope.isPaginationEnabled = function(){
                if(scope.paginatedRows === true ||
                    (scope.paginatedRows && scope.paginatedRows.hasOwnProperty('isEnabled') && scope.paginatedRows.isEnabled === true)){
                    return true;
                }

                return false;
            };

            ctrl.paginationFeature = {
                startPaginationFeature: function() {
                    if (scope.mdtRowPaginator) {
                        scope.mdtPaginationHelper.fetchPage(1);
                    }
                }
            };
        }

        function startFeature(ctrl){
            ctrl.paginationFeature.startPaginationFeature();
        }
    }

    angular
        .module('mdDataTable')
        .service('PaginationFeature', PaginationFeature);
}());
(function(){
    'use strict';

    function SelectableRowsFeatureFactory(){

        function SelectableRowsFeature(params){
            this.$scope = params.$scope;
            this.ctrl = params.ctrl;

            this.$scope.onCheckboxChange = _.bind(this.onCheckboxChange, this);
        }

        SelectableRowsFeature.prototype.onCheckboxChange = function(){
            var that = this;
            // we need to push it to the event loop to make it happen last
            // (e.g.: all the elements can be selected before we call the callback)
            setTimeout(function(){
                that.$scope.selectedRowCallback({
                    rows: that.ctrl.dataStorage.getSelectedRows()
                });
            },0);
        };

        return {
            getInstance: function(params){
                return new SelectableRowsFeature(params);
            }
        };
    }

    angular
        .module('mdDataTable')
        .service('SelectableRowsFeature', SelectableRowsFeatureFactory);
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

    /**
     * @name ColumnOptionProvider
     * @returns possible assignable column options you can give
     *
     * @describe Representing the assignable properties to the columns you can give.
     */
    var ColumnOptionProvider = {
        ALIGN_RULE : {
            ALIGN_LEFT: 'left',
            ALIGN_RIGHT: 'right'
        }
    };

    angular
        .module('mdDataTable')
        .value('ColumnOptionProvider', ColumnOptionProvider);
})();

(function(){
    'use strict';

    /**
     * @ngdoc directive
     * @name mdtCell
     * @restrict E
     * @requires mdtTable
     * @requires mdtRow
     *
     * @description
     * Representing a cell which should be placed inside `mdt-row` element directive.
     *
     * @param {boolean=} htmlContent if set to true, then html content can be placed into the content of the directive.
     * @param {string=} editableField if set, then content can be editable.
     *
     *      Available modes are:
     *
     *      - "smallEditDialog" - A simple, one-field edit dialog on click
     *      - "largeEditDialog" - A complex, flexible edit edit dialog on click
     *
     * @param {string=} editableFieldTitle if set, then it sets the title of the dialog. (only for `largeEditDialog`)
     * @param {number=} editableFieldMaxLength if set, then it sets the maximum length of the field.
     *
     *
     * @example
     * <pre>
     *  <mdt-table>
     *      <mdt-header-row>
     *          <mdt-column>Product name</mdt-column>
     *          <mdt-column>Price</mdt-column>
     *          <mdt-column>Details</mdt-column>
     *      </mdt-header-row>
     *
     *      <mdt-row ng-repeat="product in ctrl.products">
     *          <mdt-cell>{{product.name}}</mdt-cell>
     *          <mdt-cell>{{product.price}}</mdt-cell>
     *          <mdt-cell html-content="true">
     *              <a href="productdetails/{{product.id}}">more details</a>
     *          </mdt-cell>
     *      </mdt-row>
     *  </mdt-table>
     * </pre>
     */
    mdtCellDirective.$inject = ['$interpolate'];
    function mdtCellDirective($interpolate){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^mdtRow',
            link: function($scope, element, attr, mdtRowCtrl, transclude){

                var attributes = {
                    htmlContent: attr.htmlContent ? attr.htmlContent : false,
                    editableField: attr.editableField ? attr.editableField : false,
                    editableFieldTitle: attr.editableFieldTitle ? attr.editableFieldTitle : false,
                    editableFieldMaxLength: attr.editableFieldMaxLength ? attr.editableFieldMaxLength : false
                };

                transclude(function (clone) {

                    if(attr.htmlContent){
                        mdtRowCtrl.addToRowDataStorage(clone, attributes);
                    }else{
                        //TODO: better idea?
                        var cellValue = $interpolate(clone.html())($scope.$parent);

                        mdtRowCtrl.addToRowDataStorage(cellValue, attributes);
                    }
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCell', mdtCellDirective);
}());
(function(){
    'use strict';

    /**
     * @ngdoc directive
     * @name mdtRow
     * @restrict E
     * @requires mdtTable
     *
     * @description
     * Representing a row which should be placed inside `mdt-table` element directive.
     *
     * <i>Please note the following: This element has limited functionality. It cannot listen on data changes that happens outside of the
     * component. E.g.: if you provide an ng-repeat to generate your data rows for the table, using this directive,
     * it won't work well if this data will change. Since the way how transclusions work, it's (with my best
     * knowledge) an impossible task to solve at the moment. If you intend to use dynamic data rows, it's still
     * possible with using mdtRow attribute of mdtTable.</i>
     *
     * @param {string|integer=} tableRowId when set table will have a uniqe id. In case of deleting a row will give
     *      back this id.
     *
     * @example
     * <pre>
     *  <mdt-table>
     *      <mdt-header-row>
     *          <mdt-column>Product name</mdt-column>
     *          <mdt-column>Price</mdt-column>
     *      </mdt-header-row>
     *
     *      <mdt-row
     *          ng-repeat="product in products"
     *          table-row-id="{{product.id}}">
     *          <mdt-cell>{{product.name}}</mdt-cell>
     *          <mdt-cell>{{product.price}}</mdt-cell>
     *      </mdt-row>
     *  </mdt-table>
     * </pre>
     */
    function mdtRowDirective(){
        return {
            restrict: 'E',
            transclude: true,
            require: '^mdtTable',
            scope: {
                tableRowId: '='
            },
            controller: ['$scope', function($scope){
                var vm = this;

                vm.addToRowDataStorage = addToRowDataStorage;
                $scope.rowDataStorage = [];

                function addToRowDataStorage(value, attributes){
                    $scope.rowDataStorage.push({value: value, attributes: attributes});
                }
            }],
            link: function($scope, element, attrs, ctrl, transclude){
                appendColumns();

                ctrl.dataStorage.addRowData($scope.tableRowId, $scope.rowDataStorage);

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
        .directive('mdtRow', mdtRowDirective);
}());
(function(){
    'use strict';

    mdtAddAlignClass.$inject = ['ColumnAlignmentHelper'];
    function mdtAddAlignClass(ColumnAlignmentHelper){
        return {
            restrict: 'A',
            scope: {
                mdtAddAlignClass: '='
            },
            link: function($scope, element){
                var classToAdd = ColumnAlignmentHelper.getColumnAlignClass($scope.mdtAddAlignClass);

                element.addClass(classToAdd);
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtAddAlignClass', mdtAddAlignClass);
}());
(function(){
    'use strict';

    mdtAddHtmlContentToCellDirective.$inject = ['$parse', '$compile', '$rootScope'];
    function mdtAddHtmlContentToCellDirective($parse, $compile, $rootScope){
        return {
            restrict: 'A',
            require: '^?mdtTable',
            link: function($scope, element, attr, ctrl){

                $scope.$watch(function(){
                    //this needs to be like that. Passing only `attr.mdtAddHtmlContentToCell` will cause digest to go crazy 10 times.
                    // so we has to say explicitly that we only want to watch the content and nor the attributes, or the additional metadata.
                    var val = $parse(attr.mdtAddHtmlContentToCell)($scope);

                    return val.value;

                }, function(val){
                    element.empty();

                    var originalValue = $parse(attr.mdtAddHtmlContentToCell)($scope);

                    // ctrl doesn't exist on the first row, making html content impossible to show up.
                    // TODO: make it as a global service .... I know but any better idea?
                    if(originalValue.columnKey && ctrl && ctrl.dataStorage.customCells[originalValue.columnKey]){
                        var customCellData = ctrl.dataStorage.customCells[originalValue.columnKey];

                        var clonedHtml = customCellData.htmlContent;

                        //append value to the scope
                        var localScope = $rootScope.$new();

                        localScope.clientScope = customCellData.scope;
                        localScope.value = val;

                        $compile(clonedHtml)(localScope, function(cloned){
                            element.append(cloned);
                        });

                    }else{
                        element.append(val);
                    }

                }, false);
                // issue with false value. If fields are editable then it won't reflect the change.
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtAddHtmlContentToCell', mdtAddHtmlContentToCellDirective);
}());
(function(){
    'use strict';

    function mdtAnimateSortIconHandlerDirective(){
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
        .directive('mdtAnimateSortIconHandler', mdtAnimateSortIconHandlerDirective);
}());
(function() {
    'use strict';

    function mdtColumnFilterDirective(){
        return{
            restrict: 'E',
            templateUrl: '/main/templates/mdtColumnFilter.html',
            scope: {
                confirmCallback: '=',
                cancelCallback: '&',
                headerRowData: '='
            },
            link: function($scope, elem, attr){

                init();

                $scope.transformChip = transformChip;

                function init(){
                    $scope.isLoading = true;
                    $scope.hasError = false;
                    $scope.selectedItem = null;
                    $scope.searchText = null;
                    $scope.availableItems = [];
                    $scope.selectedItems = $scope.headerRowData.columnFiltersApplied;
                    $scope.placeholderText = attr.placeholderText || 'Filter column...';
                }

                function transformChip(chip) {
                    if($scope.headerRowData.chipTransformerCallback){
                        return $scope.headerRowData.chipTransformerCallback(chip);
                    }

                    return chip;
                }
            }
        }
    }

    angular
        .module('mdDataTable')
        .directive('mdtColumnFilter', mdtColumnFilterDirective);
})();
(function(){
    'use strict';

    function mdtCustomCellDirective(){
        return {
            restrict: 'E',
            transclude: true,
            template: '<span class="customCell" ng-transclude></span>',
            require: '^mdtTable',
            link: {
                pre: function($scope, element, attrs, ctrl, transclude){
                    transclude(function (clone) {
                        var columnKey = attrs.columnKey;

                        ctrl.dataStorage.customCells[columnKey] = {
                            scope: $scope,
                            htmlContent: clone.clone()
                        };
                    });
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCustomCell', mdtCustomCellDirective);
}());
(function(){
    'use strict';

    function mdtSelectAllRowsHandlerDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                $scope.selectAllRows = false;

                $scope.$watch('selectAllRows', function(val){
                    ctrl.dataStorage.setAllRowsSelected(val, $scope.isPaginationEnabled());
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtSelectAllRowsHandler', mdtSelectAllRowsHandlerDirective);
}());

(function(){
    'use strict';

    function mdtSortHandlerDirective(){
        return {
            restrict: 'A',
            scope: false,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                var columnIndex = $scope.$index;
                $scope.isSorted = isSorted;
                $scope.direction = 1;

                element.on('click', sortHandler);

                function sortHandler(){
                    if($scope.sortableColumns){
                        $scope.$apply(function(){
                            $scope.direction = ctrl.dataStorage.sortByColumn(columnIndex, $scope.headerRowData.sortBy);
                        });
                    }
                }

                function isSorted(){
                    return ctrl.dataStorage.sortByColumnLastIndex === columnIndex;
                }

                $scope.$on('$destroy', function(){
                    element.off('click', sortHandler);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtSortHandler', mdtSortHandlerDirective);
}());
(function(){
    'use strict';

    /**
     * @ngdoc directive
     * @name mdtColumn
     * @restrict E
     * @requires mdtTable
     *
     * @description
     * Representing a header column cell which should be placed inside `mdt-header-row` element directive.
     *
     * @param {string=} alignRule align cell content. This settings will have affect on each data cells in the same
     *  column (e.g. every x.th cell in every row).
     *
     *  Assignable values:
     *    - 'left'
     *    - 'right'
     *
     * @param {function()=} sortBy compareFunction callback for sorting the column data's. As every compare function,
     *  should get two parameters and return with the comapred result (-1,1,0)
     *
     * @param {string=} columnDefinition displays a tooltip on hover.
     *
     * @example
     * <pre>
     *  <mdt-table>
     *      <mdt-header-row>
     *          <mdt-column align-rule="left">Product name</mdt-column>
     *          <mdt-column
     *              align-rule="right"
     *              column-definition="The price of the product in gross.">Price</mdt-column>
     *      </mdt-header-row>
     *
     *      <mdt-row ng-repeat="product in ctrl.products">
     *          <mdt-cell>{{product.name}}</mdt-cell>
     *          <mdt-cell>{{product.price}}</mdt-cell>
     *      </mdt-row>
     *  </mdt-table>
     * </pre>
     */
    mdtColumnDirective.$inject = ['$interpolate', 'ColumnFilterFeature'];
    function mdtColumnDirective($interpolate, ColumnFilterFeature){
        return {
            restrict: 'E',
            transclude: true,
            replace: true,
            scope: {
                alignRule: '@',
                sortBy: '=',
                columnDefinition: '@',
                columnFilter: '=?'
            },
            require: ['^mdtTable'],
            link: function ($scope, element, attrs, ctrl, transclude) {
                var mdtTableCtrl = ctrl[0];

                transclude(function (clone) {
                    // directive creates an isolate scope so use parent scope to resolve variables.
                    var cellValue = $interpolate(clone.html())($scope.$parent);
                    var cellDataToStore = {
                        alignRule: $scope.alignRule,
                        sortBy: $scope.sortBy,
                        columnDefinition: $scope.columnDefinition,
                        columnName: cellValue
                    };

                    ColumnFilterFeature.appendHeaderCellData($scope, cellDataToStore);

                    mdtTableCtrl.dataStorage.addHeaderCellData(cellDataToStore);
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtColumn', mdtColumnDirective);
}());
(function(){
    'use strict';

    mdtGeneratedHeaderCellContentDirective.$inject = ['ColumnFilterFeature'];
    function mdtGeneratedHeaderCellContentDirective(ColumnFilterFeature){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtGeneratedHeaderCellContent.html',
            replace: true,
            scope: false,
            require: '^mdtTable',
            link: function($scope, element, attrs, ctrl){
                ColumnFilterFeature.initGeneratedHeaderCellContent($scope, $scope.headerRowData, ctrl);

                $scope.columnClickHandler = function(){
                    ColumnFilterFeature.generatedHeaderCellClickHandler($scope, $scope.headerRowData);
                };
            }
        };
    }

    angular
    .module('mdDataTable')
        .directive('mdtGeneratedHeaderCellContent', mdtGeneratedHeaderCellContentDirective);
}());

(function(){
    'use strict';

    /**
     * @ngdoc directive
     * @name mdtHeaderRow
     * @restrict E
     * @requires mdtTable
     *
     * @description
     * Representing a header row which should be placed inside `mdt-table` element directive.
     * The main responsibility of this directive is to execute all the transcluded `mdt-column` element directives.
     *
     */
    function mdtHeaderRowDirective(){
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            require: '^mdtTable',
            scope: true,
            link: function($scope, element, attrs, mdtCtrl, transclude){
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
        .directive('mdtHeaderRow', mdtHeaderRowDirective);
}());
(function(){
    'use strict';

    function mdtCardFooterDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtCardFooter.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdtTable'],
            link: function($scope){
                $scope.rowsPerPage = $scope.mdtPaginationHelper.rowsPerPage;

                $scope.$watch('rowsPerPage', function(newVal, oldVal){
                    if(newVal !== oldVal){
                        $scope.mdtPaginationHelper.setRowsPerPage(newVal);
                    }
                });
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCardFooter', mdtCardFooterDirective);
}());

(function(){
    'use strict';

    function mdtCardHeaderDirective(){
        return {
            restrict: 'E',
            templateUrl: '/main/templates/mdtCardHeader.html',
            transclude: true,
            replace: true,
            scope: true,
            require: ['^mdtTable'],
            link: function($scope){
                $scope.isTableCardEnabled = false;

                if($scope.tableCard && $scope.tableCard.visible !== false){
                    $scope.isTableCardEnabled = true;
                }
            }
        };
    }

    angular
        .module('mdDataTable')
        .directive('mdtCardHeader', mdtCardHeaderDirective);
}());