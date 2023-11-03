<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';

    export default {
        props: {
            adjustToNonworkingTime: Boolean,
            autoSchedule: Boolean,
            autoScheduleStrictMode: Boolean,
            autoScrollStep: Number,
            columnMenu: Boolean,
            columnMinWidth: [String, Number],
            columnResize: Boolean,
            columnResizeFeedback: Boolean,
            currentTime: [String, Date],
            currentTimeIndicator: Boolean,
            currentTimeIndicatorInterval: Number,
            dataExportFileName: String,
            source: Any,
            dayFormat: String,
            dateEnd: [String, Date],
            dateStart: [String, Date],
            dateMarkers: [{label?: string, date: Date, String, className?: string }[]],
            disabled: Boolean,
            disableAutoScroll: Boolean,
            disableTaskDrag: Boolean,
            disableTaskProgressChange: Boolean,
            disableTaskResize: Boolean,
            disableSelection: Boolean,
            disableSegmentDrag: Boolean,
            disableSegmentResize: Boolean,
            disableWindowEditor: Boolean,
            durationUnit: String,
            filterRow: Boolean,
            firstDayOfWeek: Number,
            groupByResources: Boolean,
            headerTemplate: Any,
            hideDateMarkers: Boolean,
            hideTimelineHeader: Boolean,
            hideTimelineHeaderDetails: Boolean,
            hideTimelineSecondHeaderDetails: Boolean,
            hideResourcePanel: Boolean,
            horizontalScrollBarVisibility: String,
            hourFormat: String,
            infiniteTimeline: Boolean,
            infiniteTimelineStep: Number,
            inverted: Boolean,
            keyboardNavigation: Boolean,
            max: [String, Date],
            min: [String, Date],
            monthFormat: String,
            monthScale: String,
            nonworkingDays: Number[],
            nonworkingHours: [Number[], Number[][]],
            onTaskRender: Any,
            popupWindowCustomizationFunction: Any,
            popupWindowTabs: String[],
            progressLabelFormatFunction: Any,
            quarterFormat: String,
            resources: {label: string, capacity: number, value: string, workload: number, progress: number, id: string,  class: string }[],
            resourceColumns: {label: string, value: string}[],
            resourceFiltering: Boolean,
            resourceGroupFormatFunction: Any,
            resourcePanelHeaderTemplate: Any,
            resourcePanelMin: [Number, String],
            resourcePanelSize: [Number, String],
            resourcePanelRefreshRate: Number,
            resourceTimelineFormatFunction: Any,
            resourceTimelineMode: String,
            resourceTimelineView: String,
            rightToLeft: Boolean,
            selectedTaskIds: [Number[], String[]],
            selectedResourceIds: [Number[], String[]],
            shadeUntilCurrentTime: Boolean,
            showSelectionColumn: Boolean,
            showBaseline: Boolean,
            showProgressLabel: Boolean,
            snapToNearest: Boolean,
            sortFunction: { (dataSource: any, sortColumns: string[], directions: string[], defaultCompareFunctions: { (firstRecord: any, secondRecord: any): number }[]): void },
            sortMode: String,
            tasks: [{label: string, dateStart: string, Date, dateEnd: string, Date, expanded?: boolean, progress?: number, type?: string}[]],
            taskColumns: {label: string, value: string}[],
            taskFiltering: Boolean,
            taskPanelMin: [String, Number],
            taskPanelSize: [String, Number],
            timelineMin: [String, Number],
            treeMin: [String, Number],
            treeSize: [String, Number],
            timelineHeaderFormatFunction: Any,
            tooltip: Object,
            verticalScrollBarVisibility: String,
            view: String,
            yearFormat: String,
            weekFormat: String,
            theme: String,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxGantt' + JQXLite.generateID();
            this.componentSelector = '#' + this.id;
        },
        mounted: function () {
            if (this.autoCreate) this.__createComponent__();
        },
        methods: {
            createComponent: function (options) {
                if (!this.autoCreate) this.__createComponent__(options)
                else console.warn('Component is already created! If you want to use createComponent, please set "autoCreate" property to "false".');
            },
            setOptions: function (options) {
                JQXLite(this.componentSelector).jqxGantt(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxGantt(usedProps[i]);
                }
                return resultToReturn;
            },
            addFilter: function(columns, filterGroup) {
                return JQXLite(this.componentSelector).jqxGantt('addFilter', columns, filterGroup);  
            },
            clearFilters: function() {
                return JQXLite(this.componentSelector).jqxGantt('clearFilters');  
            },
            clearSort: function() {
                return JQXLite(this.componentSelector).jqxGantt('clearSort');  
            },
            clearSelection: function() {
                return JQXLite(this.componentSelector).jqxGantt('clearSelection');  
            },
            clearState: function() {
                return JQXLite(this.componentSelector).jqxGantt('clearState');  
            },
            clearTasks: function() {
                return JQXLite(this.componentSelector).jqxGantt('clearTasks');  
            },
            clearResources: function() {
                return JQXLite(this.componentSelector).jqxGantt('clearResources');  
            },
            createConnection: function(startTaskIndex, taskEndIndex, connectionType, lag) {
                return JQXLite(this.componentSelector).jqxGantt('createConnection', startTaskIndex, taskEndIndex, connectionType, lag);  
            },
            collapse: function(id) {
                return JQXLite(this.componentSelector).jqxGantt('collapse', id);  
            },
            beginUpdate: function() {
                return JQXLite(this.componentSelector).jqxGantt('beginUpdate');  
            },
            endUpdate: function() {
                return JQXLite(this.componentSelector).jqxGantt('endUpdate');  
            },
            ensureVisible: function(taskId) {
                return JQXLite(this.componentSelector).jqxGantt('ensureVisible', taskId);  
            },
            expand: function(id) {
                return JQXLite(this.componentSelector).jqxGantt('expand', id);  
            },
            exportData: function(dataFormat, callback) {
                return JQXLite(this.componentSelector).jqxGantt('exportData', dataFormat, callback);  
            },
            getConnections: function() {
                return JQXLite(this.componentSelector).jqxGantt('getConnections');  
            },
            getConnectionDetails: function(connectionId) {
                return JQXLite(this.componentSelector).jqxGantt('getConnectionDetails', connectionId);  
            },
            getState: function() {
                return JQXLite(this.componentSelector).jqxGantt('getState');  
            },
            getItemPath: function(item) {
                return JQXLite(this.componentSelector).jqxGantt('getItemPath', item);  
            },
            getTask: function(itemId) {
                return JQXLite(this.componentSelector).jqxGantt('getTask', itemId);  
            },
            getTasks: function() {
                return JQXLite(this.componentSelector).jqxGantt('getTasks');  
            },
            getTaskIndex: function(task) {
                return JQXLite(this.componentSelector).jqxGantt('getTaskIndex', task);  
            },
            getTaskConnections: function(taskId) {
                return JQXLite(this.componentSelector).jqxGantt('getTaskConnections', taskId);  
            },
            getTaskProject: function(task) {
                return JQXLite(this.componentSelector).jqxGantt('getTaskProject', task);  
            },
            getResource: function(itemId) {
                return JQXLite(this.componentSelector).jqxGantt('getResource', itemId);  
            },
            getResources: function() {
                return JQXLite(this.componentSelector).jqxGantt('getResources');  
            },
            getResourceIndex: function(resource) {
                return JQXLite(this.componentSelector).jqxGantt('getResourceIndex', resource);  
            },
            getResourceTasks: function(resource) {
                return JQXLite(this.componentSelector).jqxGantt('getResourceTasks', resource);  
            },
            getSelectedIds: function() {
                return JQXLite(this.componentSelector).jqxGantt('getSelectedIds');  
            },
            getSelectedTasks: function() {
                return JQXLite(this.componentSelector).jqxGantt('getSelectedTasks');  
            },
            getSelectedResources: function() {
                return JQXLite(this.componentSelector).jqxGantt('getSelectedResources');  
            },
            getWorkingHours: function() {
                return JQXLite(this.componentSelector).jqxGantt('getWorkingHours');  
            },
            hideTooltip: function() {
                return JQXLite(this.componentSelector).jqxGantt('hideTooltip');  
            },
            isWorkingDay: function(date) {
                return JQXLite(this.componentSelector).jqxGantt('isWorkingDay', date);  
            },
            loadState: function(state) {
                return JQXLite(this.componentSelector).jqxGantt('loadState', state);  
            },
            removeAllConnections: function() {
                return JQXLite(this.componentSelector).jqxGantt('removeAllConnections');  
            },
            removeConnection: function(startTaskIndex, taskEndIndex, connectionType) {
                return JQXLite(this.componentSelector).jqxGantt('removeConnection', startTaskIndex, taskEndIndex, connectionType);  
            },
            removeTaskConnection: function(taskStart, taskEnd) {
                return JQXLite(this.componentSelector).jqxGantt('removeTaskConnection', taskStart, taskEnd);  
            },
            showTooltip: function(target, content) {
                return JQXLite(this.componentSelector).jqxGantt('showTooltip', target, content);  
            },
            saveState: function(state) {
                return JQXLite(this.componentSelector).jqxGantt('saveState', state);  
            },
            insertTask: function(taskObject, project, index) {
                return JQXLite(this.componentSelector).jqxGantt('insertTask', taskObject, project, index);  
            },
            updateTask: function(taskId, taskObject) {
                return JQXLite(this.componentSelector).jqxGantt('updateTask', taskId, taskObject);  
            },
            removeTask: function(taskId) {
                return JQXLite(this.componentSelector).jqxGantt('removeTask', taskId);  
            },
            insertResource: function(resourceId, resourceObject) {
                return JQXLite(this.componentSelector).jqxGantt('insertResource', resourceId, resourceObject);  
            },
            updateResource: function(resourceId, taskObject) {
                return JQXLite(this.componentSelector).jqxGantt('updateResource', resourceId, taskObject);  
            },
            removeResource: function(resourceId) {
                return JQXLite(this.componentSelector).jqxGantt('removeResource', resourceId);  
            },
            openWindow: function(taskId) {
                return JQXLite(this.componentSelector).jqxGantt('openWindow', taskId);  
            },
            closeWindow: function() {
                return JQXLite(this.componentSelector).jqxGantt('closeWindow');  
            },
            print: function() {
                return JQXLite(this.componentSelector).jqxGantt('print');  
            },
            setWorkTime: function(settings) {
                return JQXLite(this.componentSelector).jqxGantt('setWorkTime', settings);  
            },
            selectTask: function(id) {
                return JQXLite(this.componentSelector).jqxGantt('selectTask', id);  
            },
            selectResource: function(id) {
                return JQXLite(this.componentSelector).jqxGantt('selectResource', id);  
            },
            unselectTask: function(id) {
                return JQXLite(this.componentSelector).jqxGantt('unselectTask', id);  
            },
            unselectResource: function(id) {
                return JQXLite(this.componentSelector).jqxGantt('unselectResource', id);  
            },
            unsetWorkTime: function(settings) {
                return JQXLite(this.componentSelector).jqxGantt('unsetWorkTime', settings);  
            },
            sort: function(columns) {
                return JQXLite(this.componentSelector).jqxGantt('sort', columns);  
            },
            _adjustToNonworkingTime: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('adjustToNonworkingTime', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('adjustToNonworkingTime');
                }
            },
            _autoSchedule: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('autoSchedule', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('autoSchedule');
                }
            },
            _autoScheduleStrictMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('autoScheduleStrictMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('autoScheduleStrictMode');
                }
            },
            _autoScrollStep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('autoScrollStep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('autoScrollStep');
                }
            },
            _columnMenu: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('columnMenu', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('columnMenu');
                }
            },
            _columnMinWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('columnMinWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('columnMinWidth');
                }
            },
            _columnResize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('columnResize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('columnResize');
                }
            },
            _columnResizeFeedback: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('columnResizeFeedback', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('columnResizeFeedback');
                }
            },
            _currentTime: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('currentTime', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('currentTime');
                }
            },
            _currentTimeIndicator: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('currentTimeIndicator', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('currentTimeIndicator');
                }
            },
            _currentTimeIndicatorInterval: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('currentTimeIndicatorInterval', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('currentTimeIndicatorInterval');
                }
            },
            _dataExportFileName: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('dataExportFileName', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('dataExportFileName');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('source');
                }
            },
            _dayFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('dayFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('dayFormat');
                }
            },
            _dateEnd: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('dateEnd', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('dateEnd');
                }
            },
            _dateStart: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('dateStart', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('dateStart');
                }
            },
            _dateMarkers: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('dateMarkers', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('dateMarkers');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('disabled');
                }
            },
            _disableAutoScroll: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('disableAutoScroll', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('disableAutoScroll');
                }
            },
            _disableTaskDrag: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('disableTaskDrag', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('disableTaskDrag');
                }
            },
            _disableTaskProgressChange: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('disableTaskProgressChange', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('disableTaskProgressChange');
                }
            },
            _disableTaskResize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('disableTaskResize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('disableTaskResize');
                }
            },
            _disableSelection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('disableSelection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('disableSelection');
                }
            },
            _disableSegmentDrag: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('disableSegmentDrag', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('disableSegmentDrag');
                }
            },
            _disableSegmentResize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('disableSegmentResize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('disableSegmentResize');
                }
            },
            _disableWindowEditor: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('disableWindowEditor', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('disableWindowEditor');
                }
            },
            _durationUnit: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('durationUnit', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('durationUnit');
                }
            },
            _filterRow: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('filterRow', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('filterRow');
                }
            },
            _firstDayOfWeek: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('firstDayOfWeek', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('firstDayOfWeek');
                }
            },
            _groupByResources: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('groupByResources', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('groupByResources');
                }
            },
            _headerTemplate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('headerTemplate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('headerTemplate');
                }
            },
            _hideDateMarkers: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('hideDateMarkers', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('hideDateMarkers');
                }
            },
            _hideTimelineHeader: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('hideTimelineHeader', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('hideTimelineHeader');
                }
            },
            _hideTimelineHeaderDetails: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('hideTimelineHeaderDetails', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('hideTimelineHeaderDetails');
                }
            },
            _hideTimelineSecondHeaderDetails: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('hideTimelineSecondHeaderDetails', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('hideTimelineSecondHeaderDetails');
                }
            },
            _hideResourcePanel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('hideResourcePanel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('hideResourcePanel');
                }
            },
            _horizontalScrollBarVisibility: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('horizontalScrollBarVisibility', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('horizontalScrollBarVisibility');
                }
            },
            _hourFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('hourFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('hourFormat');
                }
            },
            _infiniteTimeline: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('infiniteTimeline', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('infiniteTimeline');
                }
            },
            _infiniteTimelineStep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('infiniteTimelineStep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('infiniteTimelineStep');
                }
            },
            _inverted: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('inverted', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('inverted');
                }
            },
            _keyboardNavigation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('keyboardNavigation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('keyboardNavigation');
                }
            },
            _max: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('max', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('max');
                }
            },
            _min: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('min', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('min');
                }
            },
            _monthFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('monthFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('monthFormat');
                }
            },
            _monthScale: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('monthScale', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('monthScale');
                }
            },
            _nonworkingDays: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('nonworkingDays', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('nonworkingDays');
                }
            },
            _nonworkingHours: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('nonworkingHours', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('nonworkingHours');
                }
            },
            _onTaskRender: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('onTaskRender', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('onTaskRender');
                }
            },
            _popupWindowCustomizationFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('popupWindowCustomizationFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('popupWindowCustomizationFunction');
                }
            },
            _popupWindowTabs: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('popupWindowTabs', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('popupWindowTabs');
                }
            },
            _progressLabelFormatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('progressLabelFormatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('progressLabelFormatFunction');
                }
            },
            _quarterFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('quarterFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('quarterFormat');
                }
            },
            _resources: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resources', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resources');
                }
            },
            _resourceColumns: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourceColumns', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourceColumns');
                }
            },
            _resourceFiltering: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourceFiltering', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourceFiltering');
                }
            },
            _resourceGroupFormatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourceGroupFormatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourceGroupFormatFunction');
                }
            },
            _resourcePanelHeaderTemplate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourcePanelHeaderTemplate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourcePanelHeaderTemplate');
                }
            },
            _resourcePanelMin: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourcePanelMin', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourcePanelMin');
                }
            },
            _resourcePanelSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourcePanelSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourcePanelSize');
                }
            },
            _resourcePanelRefreshRate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourcePanelRefreshRate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourcePanelRefreshRate');
                }
            },
            _resourceTimelineFormatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourceTimelineFormatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourceTimelineFormatFunction');
                }
            },
            _resourceTimelineMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourceTimelineMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourceTimelineMode');
                }
            },
            _resourceTimelineView: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('resourceTimelineView', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('resourceTimelineView');
                }
            },
            _rightToLeft: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('rightToLeft', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('rightToLeft');
                }
            },
            _selectedTaskIds: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('selectedTaskIds', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('selectedTaskIds');
                }
            },
            _selectedResourceIds: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('selectedResourceIds', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('selectedResourceIds');
                }
            },
            _shadeUntilCurrentTime: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('shadeUntilCurrentTime', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('shadeUntilCurrentTime');
                }
            },
            _showSelectionColumn: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('showSelectionColumn', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('showSelectionColumn');
                }
            },
            _showBaseline: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('showBaseline', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('showBaseline');
                }
            },
            _showProgressLabel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('showProgressLabel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('showProgressLabel');
                }
            },
            _snapToNearest: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('snapToNearest', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('snapToNearest');
                }
            },
            _sortFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('sortFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('sortFunction');
                }
            },
            _sortMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('sortMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('sortMode');
                }
            },
            _tasks: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('tasks', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('tasks');
                }
            },
            _taskColumns: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('taskColumns', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('taskColumns');
                }
            },
            _taskFiltering: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('taskFiltering', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('taskFiltering');
                }
            },
            _taskPanelMin: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('taskPanelMin', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('taskPanelMin');
                }
            },
            _taskPanelSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('taskPanelSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('taskPanelSize');
                }
            },
            _timelineMin: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('timelineMin', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('timelineMin');
                }
            },
            _treeMin: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('treeMin', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('treeMin');
                }
            },
            _treeSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('treeSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('treeSize');
                }
            },
            _timelineHeaderFormatFunction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('timelineHeaderFormatFunction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('timelineHeaderFormatFunction');
                }
            },
            _tooltip: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('tooltip', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('tooltip');
                }
            },
            _verticalScrollBarVisibility: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('verticalScrollBarVisibility', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('verticalScrollBarVisibility');
                }
            },
            _view: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('view', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('view');
                }
            },
            _yearFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('yearFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('yearFormat');
                }
            },
            _weekFormat: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('weekFormat', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('weekFormat');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGantt('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGantt('theme');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxGantt(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['adjustToNonworkingTime','autoSchedule','autoScheduleStrictMode','autoScrollStep','columnMenu','columnMinWidth','columnResize','columnResizeFeedback','currentTime','currentTimeIndicator','currentTimeIndicatorInterval','dataExportFileName','source','dayFormat','dateEnd','dateStart','dateMarkers','disabled','disableAutoScroll','disableTaskDrag','disableTaskProgressChange','disableTaskResize','disableSelection','disableSegmentDrag','disableSegmentResize','disableWindowEditor','durationUnit','filterRow','firstDayOfWeek','groupByResources','headerTemplate','hideDateMarkers','hideTimelineHeader','hideTimelineHeaderDetails','hideTimelineSecondHeaderDetails','hideResourcePanel','horizontalScrollBarVisibility','hourFormat','infiniteTimeline','infiniteTimelineStep','inverted','keyboardNavigation','max','min','monthFormat','monthScale','nonworkingDays','nonworkingHours','onTaskRender','popupWindowCustomizationFunction','popupWindowTabs','progressLabelFormatFunction','quarterFormat','resources','resourceColumns','resourceFiltering','resourceGroupFormatFunction','resourcePanelHeaderTemplate','resourcePanelMin','resourcePanelSize','resourcePanelRefreshRate','resourceTimelineFormatFunction','resourceTimelineMode','resourceTimelineView','rightToLeft','selectedTaskIds','selectedResourceIds','shadeUntilCurrentTime','showSelectionColumn','showBaseline','showProgressLabel','snapToNearest','sortFunction','sortMode','tasks','taskColumns','taskFiltering','taskPanelMin','taskPanelSize','timelineMin','treeMin','treeSize','timelineHeaderFormatFunction','tooltip','verticalScrollBarVisibility','view','yearFormat','weekFormat','theme'];
                const componentProps = this.$options.propsData;
                let options = {};

                for (let prop in componentProps) {
                    if (widgetProps.indexOf(prop) !== -1) {
                        options[prop] = componentProps[prop];
                    }
                }
                return options;
            },
            __extendProps__: function () {
                const that = this;

                Object.defineProperty(that, 'adjustToNonworkingTime', {
                    get: function() {
                        return that._adjustToNonworkingTime();
                    },
                    set: function(newValue) {
                        that._adjustToNonworkingTime(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoSchedule', {
                    get: function() {
                        return that._autoSchedule();
                    },
                    set: function(newValue) {
                        that._autoSchedule(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoScheduleStrictMode', {
                    get: function() {
                        return that._autoScheduleStrictMode();
                    },
                    set: function(newValue) {
                        that._autoScheduleStrictMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoScrollStep', {
                    get: function() {
                        return that._autoScrollStep();
                    },
                    set: function(newValue) {
                        that._autoScrollStep(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnMenu', {
                    get: function() {
                        return that._columnMenu();
                    },
                    set: function(newValue) {
                        that._columnMenu(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnMinWidth', {
                    get: function() {
                        return that._columnMinWidth();
                    },
                    set: function(newValue) {
                        that._columnMinWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnResize', {
                    get: function() {
                        return that._columnResize();
                    },
                    set: function(newValue) {
                        that._columnResize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnResizeFeedback', {
                    get: function() {
                        return that._columnResizeFeedback();
                    },
                    set: function(newValue) {
                        that._columnResizeFeedback(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'currentTime', {
                    get: function() {
                        return that._currentTime();
                    },
                    set: function(newValue) {
                        that._currentTime(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'currentTimeIndicator', {
                    get: function() {
                        return that._currentTimeIndicator();
                    },
                    set: function(newValue) {
                        that._currentTimeIndicator(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'currentTimeIndicatorInterval', {
                    get: function() {
                        return that._currentTimeIndicatorInterval();
                    },
                    set: function(newValue) {
                        that._currentTimeIndicatorInterval(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dataExportFileName', {
                    get: function() {
                        return that._dataExportFileName();
                    },
                    set: function(newValue) {
                        that._dataExportFileName(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'source', {
                    get: function() {
                        return that._source();
                    },
                    set: function(newValue) {
                        that._source(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dayFormat', {
                    get: function() {
                        return that._dayFormat();
                    },
                    set: function(newValue) {
                        that._dayFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dateEnd', {
                    get: function() {
                        return that._dateEnd();
                    },
                    set: function(newValue) {
                        that._dateEnd(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dateStart', {
                    get: function() {
                        return that._dateStart();
                    },
                    set: function(newValue) {
                        that._dateStart(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dateMarkers', {
                    get: function() {
                        return that._dateMarkers();
                    },
                    set: function(newValue) {
                        that._dateMarkers(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disabled', {
                    get: function() {
                        return that._disabled();
                    },
                    set: function(newValue) {
                        that._disabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disableAutoScroll', {
                    get: function() {
                        return that._disableAutoScroll();
                    },
                    set: function(newValue) {
                        that._disableAutoScroll(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disableTaskDrag', {
                    get: function() {
                        return that._disableTaskDrag();
                    },
                    set: function(newValue) {
                        that._disableTaskDrag(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disableTaskProgressChange', {
                    get: function() {
                        return that._disableTaskProgressChange();
                    },
                    set: function(newValue) {
                        that._disableTaskProgressChange(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disableTaskResize', {
                    get: function() {
                        return that._disableTaskResize();
                    },
                    set: function(newValue) {
                        that._disableTaskResize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disableSelection', {
                    get: function() {
                        return that._disableSelection();
                    },
                    set: function(newValue) {
                        that._disableSelection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disableSegmentDrag', {
                    get: function() {
                        return that._disableSegmentDrag();
                    },
                    set: function(newValue) {
                        that._disableSegmentDrag(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disableSegmentResize', {
                    get: function() {
                        return that._disableSegmentResize();
                    },
                    set: function(newValue) {
                        that._disableSegmentResize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disableWindowEditor', {
                    get: function() {
                        return that._disableWindowEditor();
                    },
                    set: function(newValue) {
                        that._disableWindowEditor(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'durationUnit', {
                    get: function() {
                        return that._durationUnit();
                    },
                    set: function(newValue) {
                        that._durationUnit(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filterRow', {
                    get: function() {
                        return that._filterRow();
                    },
                    set: function(newValue) {
                        that._filterRow(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'firstDayOfWeek', {
                    get: function() {
                        return that._firstDayOfWeek();
                    },
                    set: function(newValue) {
                        that._firstDayOfWeek(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupByResources', {
                    get: function() {
                        return that._groupByResources();
                    },
                    set: function(newValue) {
                        that._groupByResources(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'headerTemplate', {
                    get: function() {
                        return that._headerTemplate();
                    },
                    set: function(newValue) {
                        that._headerTemplate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'hideDateMarkers', {
                    get: function() {
                        return that._hideDateMarkers();
                    },
                    set: function(newValue) {
                        that._hideDateMarkers(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'hideTimelineHeader', {
                    get: function() {
                        return that._hideTimelineHeader();
                    },
                    set: function(newValue) {
                        that._hideTimelineHeader(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'hideTimelineHeaderDetails', {
                    get: function() {
                        return that._hideTimelineHeaderDetails();
                    },
                    set: function(newValue) {
                        that._hideTimelineHeaderDetails(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'hideTimelineSecondHeaderDetails', {
                    get: function() {
                        return that._hideTimelineSecondHeaderDetails();
                    },
                    set: function(newValue) {
                        that._hideTimelineSecondHeaderDetails(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'hideResourcePanel', {
                    get: function() {
                        return that._hideResourcePanel();
                    },
                    set: function(newValue) {
                        that._hideResourcePanel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'horizontalScrollBarVisibility', {
                    get: function() {
                        return that._horizontalScrollBarVisibility();
                    },
                    set: function(newValue) {
                        that._horizontalScrollBarVisibility(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'hourFormat', {
                    get: function() {
                        return that._hourFormat();
                    },
                    set: function(newValue) {
                        that._hourFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'infiniteTimeline', {
                    get: function() {
                        return that._infiniteTimeline();
                    },
                    set: function(newValue) {
                        that._infiniteTimeline(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'infiniteTimelineStep', {
                    get: function() {
                        return that._infiniteTimelineStep();
                    },
                    set: function(newValue) {
                        that._infiniteTimelineStep(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'inverted', {
                    get: function() {
                        return that._inverted();
                    },
                    set: function(newValue) {
                        that._inverted(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'keyboardNavigation', {
                    get: function() {
                        return that._keyboardNavigation();
                    },
                    set: function(newValue) {
                        that._keyboardNavigation(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'max', {
                    get: function() {
                        return that._max();
                    },
                    set: function(newValue) {
                        that._max(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'min', {
                    get: function() {
                        return that._min();
                    },
                    set: function(newValue) {
                        that._min(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'monthFormat', {
                    get: function() {
                        return that._monthFormat();
                    },
                    set: function(newValue) {
                        that._monthFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'monthScale', {
                    get: function() {
                        return that._monthScale();
                    },
                    set: function(newValue) {
                        that._monthScale(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'nonworkingDays', {
                    get: function() {
                        return that._nonworkingDays();
                    },
                    set: function(newValue) {
                        that._nonworkingDays(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'nonworkingHours', {
                    get: function() {
                        return that._nonworkingHours();
                    },
                    set: function(newValue) {
                        that._nonworkingHours(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'onTaskRender', {
                    get: function() {
                        return that._onTaskRender();
                    },
                    set: function(newValue) {
                        that._onTaskRender(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'popupWindowCustomizationFunction', {
                    get: function() {
                        return that._popupWindowCustomizationFunction();
                    },
                    set: function(newValue) {
                        that._popupWindowCustomizationFunction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'popupWindowTabs', {
                    get: function() {
                        return that._popupWindowTabs();
                    },
                    set: function(newValue) {
                        that._popupWindowTabs(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'progressLabelFormatFunction', {
                    get: function() {
                        return that._progressLabelFormatFunction();
                    },
                    set: function(newValue) {
                        that._progressLabelFormatFunction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'quarterFormat', {
                    get: function() {
                        return that._quarterFormat();
                    },
                    set: function(newValue) {
                        that._quarterFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resources', {
                    get: function() {
                        return that._resources();
                    },
                    set: function(newValue) {
                        that._resources(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourceColumns', {
                    get: function() {
                        return that._resourceColumns();
                    },
                    set: function(newValue) {
                        that._resourceColumns(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourceFiltering', {
                    get: function() {
                        return that._resourceFiltering();
                    },
                    set: function(newValue) {
                        that._resourceFiltering(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourceGroupFormatFunction', {
                    get: function() {
                        return that._resourceGroupFormatFunction();
                    },
                    set: function(newValue) {
                        that._resourceGroupFormatFunction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourcePanelHeaderTemplate', {
                    get: function() {
                        return that._resourcePanelHeaderTemplate();
                    },
                    set: function(newValue) {
                        that._resourcePanelHeaderTemplate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourcePanelMin', {
                    get: function() {
                        return that._resourcePanelMin();
                    },
                    set: function(newValue) {
                        that._resourcePanelMin(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourcePanelSize', {
                    get: function() {
                        return that._resourcePanelSize();
                    },
                    set: function(newValue) {
                        that._resourcePanelSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourcePanelRefreshRate', {
                    get: function() {
                        return that._resourcePanelRefreshRate();
                    },
                    set: function(newValue) {
                        that._resourcePanelRefreshRate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourceTimelineFormatFunction', {
                    get: function() {
                        return that._resourceTimelineFormatFunction();
                    },
                    set: function(newValue) {
                        that._resourceTimelineFormatFunction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourceTimelineMode', {
                    get: function() {
                        return that._resourceTimelineMode();
                    },
                    set: function(newValue) {
                        that._resourceTimelineMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'resourceTimelineView', {
                    get: function() {
                        return that._resourceTimelineView();
                    },
                    set: function(newValue) {
                        that._resourceTimelineView(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rightToLeft', {
                    get: function() {
                        return that._rightToLeft();
                    },
                    set: function(newValue) {
                        that._rightToLeft(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectedTaskIds', {
                    get: function() {
                        return that._selectedTaskIds();
                    },
                    set: function(newValue) {
                        that._selectedTaskIds(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectedResourceIds', {
                    get: function() {
                        return that._selectedResourceIds();
                    },
                    set: function(newValue) {
                        that._selectedResourceIds(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'shadeUntilCurrentTime', {
                    get: function() {
                        return that._shadeUntilCurrentTime();
                    },
                    set: function(newValue) {
                        that._shadeUntilCurrentTime(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showSelectionColumn', {
                    get: function() {
                        return that._showSelectionColumn();
                    },
                    set: function(newValue) {
                        that._showSelectionColumn(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showBaseline', {
                    get: function() {
                        return that._showBaseline();
                    },
                    set: function(newValue) {
                        that._showBaseline(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showProgressLabel', {
                    get: function() {
                        return that._showProgressLabel();
                    },
                    set: function(newValue) {
                        that._showProgressLabel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'snapToNearest', {
                    get: function() {
                        return that._snapToNearest();
                    },
                    set: function(newValue) {
                        that._snapToNearest(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'sortFunction', {
                    get: function() {
                        return that._sortFunction();
                    },
                    set: function(newValue) {
                        that._sortFunction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'sortMode', {
                    get: function() {
                        return that._sortMode();
                    },
                    set: function(newValue) {
                        that._sortMode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'tasks', {
                    get: function() {
                        return that._tasks();
                    },
                    set: function(newValue) {
                        that._tasks(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'taskColumns', {
                    get: function() {
                        return that._taskColumns();
                    },
                    set: function(newValue) {
                        that._taskColumns(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'taskFiltering', {
                    get: function() {
                        return that._taskFiltering();
                    },
                    set: function(newValue) {
                        that._taskFiltering(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'taskPanelMin', {
                    get: function() {
                        return that._taskPanelMin();
                    },
                    set: function(newValue) {
                        that._taskPanelMin(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'taskPanelSize', {
                    get: function() {
                        return that._taskPanelSize();
                    },
                    set: function(newValue) {
                        that._taskPanelSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'timelineMin', {
                    get: function() {
                        return that._timelineMin();
                    },
                    set: function(newValue) {
                        that._timelineMin(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'treeMin', {
                    get: function() {
                        return that._treeMin();
                    },
                    set: function(newValue) {
                        that._treeMin(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'treeSize', {
                    get: function() {
                        return that._treeSize();
                    },
                    set: function(newValue) {
                        that._treeSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'timelineHeaderFormatFunction', {
                    get: function() {
                        return that._timelineHeaderFormatFunction();
                    },
                    set: function(newValue) {
                        that._timelineHeaderFormatFunction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'tooltip', {
                    get: function() {
                        return that._tooltip();
                    },
                    set: function(newValue) {
                        that._tooltip(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'verticalScrollBarVisibility', {
                    get: function() {
                        return that._verticalScrollBarVisibility();
                    },
                    set: function(newValue) {
                        that._verticalScrollBarVisibility(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'view', {
                    get: function() {
                        return that._view();
                    },
                    set: function(newValue) {
                        that._view(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'yearFormat', {
                    get: function() {
                        return that._yearFormat();
                    },
                    set: function(newValue) {
                        that._yearFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'weekFormat', {
                    get: function() {
                        return that._weekFormat();
                    },
                    set: function(newValue) {
                        that._weekFormat(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'theme', {
                    get: function() {
                        return that._theme();
                    },
                    set: function(newValue) {
                        that._theme(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('beginUpdate', function (event) { that.$emit('beginUpdate', event); });
                JQXLite(this.componentSelector).on('endUpdate', function (event) { that.$emit('endUpdate', event); });
                JQXLite(this.componentSelector).on('connectionStart', function (event) { that.$emit('connectionStart', event); });
                JQXLite(this.componentSelector).on('connectionEnd', function (event) { that.$emit('connectionEnd', event); });
                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
                JQXLite(this.componentSelector).on('columnResize', function (event) { that.$emit('columnResize', event); });
                JQXLite(this.componentSelector).on('closing', function (event) { that.$emit('closing', event); });
                JQXLite(this.componentSelector).on('close', function (event) { that.$emit('close', event); });
                JQXLite(this.componentSelector).on('collapse', function (event) { that.$emit('collapse', event); });
                JQXLite(this.componentSelector).on('dragStart', function (event) { that.$emit('dragStart', event); });
                JQXLite(this.componentSelector).on('dragEnd', function (event) { that.$emit('dragEnd', event); });
                JQXLite(this.componentSelector).on('expand', function (event) { that.$emit('expand', event); });
                JQXLite(this.componentSelector).on('filter', function (event) { that.$emit('filter', event); });
                JQXLite(this.componentSelector).on('itemClick', function (event) { that.$emit('itemClick', event); });
                JQXLite(this.componentSelector).on('itemInsert', function (event) { that.$emit('itemInsert', event); });
                JQXLite(this.componentSelector).on('itemRemove', function (event) { that.$emit('itemRemove', event); });
                JQXLite(this.componentSelector).on('itemUpdate', function (event) { that.$emit('itemUpdate', event); });
                JQXLite(this.componentSelector).on('opening', function (event) { that.$emit('opening', event); });
                JQXLite(this.componentSelector).on('open', function (event) { that.$emit('open', event); });
                JQXLite(this.componentSelector).on('progressChangeStart', function (event) { that.$emit('progressChangeStart', event); });
                JQXLite(this.componentSelector).on('progressChangeEnd', function (event) { that.$emit('progressChangeEnd', event); });
                JQXLite(this.componentSelector).on('resizeStart', function (event) { that.$emit('resizeStart', event); });
                JQXLite(this.componentSelector).on('resizeEnd', function (event) { that.$emit('resizeEnd', event); });
                JQXLite(this.componentSelector).on('sort', function (event) { that.$emit('sort', event); });
                JQXLite(this.componentSelector).on('scrollBottomReached', function (event) { that.$emit('scrollBottomReached', event); });
                JQXLite(this.componentSelector).on('scrollTopReached', function (event) { that.$emit('scrollTopReached', event); });
                JQXLite(this.componentSelector).on('scrollLeftReached', function (event) { that.$emit('scrollLeftReached', event); });
                JQXLite(this.componentSelector).on('scrollRightReached', function (event) { that.$emit('scrollRightReached', event); });
            }
        }
    }
</script>
