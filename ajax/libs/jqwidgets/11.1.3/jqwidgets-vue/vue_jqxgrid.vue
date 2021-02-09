<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdata.js';
    import '../jqwidgets/jqxdata.export.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxbuttongroup.js';
    import '../jqwidgets/jqxscrollbar.js'
    import '../jqwidgets/jqxmenu.js'
    import '../jqwidgets/jqxlistbox.js'
    import '../jqwidgets/jqxdropdownlist.js'
    import '../jqwidgets/jqxcombobox.js'
    import '../jqwidgets/jqxnumberinput.js'
    import '../jqwidgets/jqxcheckbox.js'
    import '../jqwidgets/globalization/globalize.js'
    import '../jqwidgets/jqxcalendar.js'
    import '../jqwidgets/jqxnumberinput.js'
    import '../jqwidgets/jqxdatetimeinput.js'
    import '../jqwidgets/jqxgrid.js'
    import '../jqwidgets/jqxgrid.edit.js'
    import '../jqwidgets/jqxgrid.pager.js'
    import '../jqwidgets/jqxgrid.selection.js'
    import '../jqwidgets/jqxgrid.filter.js'
    import '../jqwidgets/jqxgrid.sort.js'
    import '../jqwidgets/jqxgrid.storage.js'
    import '../jqwidgets/jqxgrid.grouping.js'
    import '../jqwidgets/jqxgrid.export.js'
    import '../jqwidgets/jqxgrid.columnsresize.js'
    import '../jqwidgets/jqxgrid.columnsreorder.js'
    import '../jqwidgets/jqxgrid.aggregates.js'
    import '../jqwidgets/jqxgrid.chart.js'

    export default {
        props: {
            altrows: Boolean,
            altstart: Number,
            altstep: Number,
            autoshowloadelement: Boolean,
            autoshowfiltericon: Boolean,
            autoshowcolumnsmenubutton: Boolean,
            showcolumnlines: Boolean,
            showrowlines: Boolean,
            showcolumnheaderlines: Boolean,
            adaptive: Boolean,
            adaptivewidth: Number,
            clipboard: Boolean,
            closeablegroups: Boolean,
            columnsmenuwidth: Number,
            columnmenuopening: Function,
            columnmenuclosing: Function,
            cellhover: Function,
            enablekeyboarddelete: Boolean,
            enableellipsis: Boolean,
            enablemousewheel: Boolean,
            enableanimations: Boolean,
            enabletooltips: Boolean,
            enablehover: Boolean,
            enablebrowserselection: Boolean,
            everpresentrowposition: String,
            everpresentrowheight: Number,
            everpresentrowactions: String,
            everpresentrowactionsmode: String,
            filterrowheight: Number,
            filtermode: String,
            groupsrenderer: Function,
            groupcolumnrenderer: Function,
            groupsexpandedbydefault: Boolean,
            handlekeyboardnavigation: Function,
            pagerrenderer: Function,
            rtl: Boolean,
            showdefaultloadelement: Boolean,
            showfiltercolumnbackground: Boolean,
            showfiltermenuitems: Boolean,
            showpinnedcolumnbackground: Boolean,
            showsortcolumnbackground: Boolean,
            showsortmenuitems: Boolean,
            showgroupmenuitems: Boolean,
            showrowdetailscolumn: Boolean,
            showheader: Boolean,
            showgroupsheader: Boolean,
            showaggregates: Boolean,
            showgroupaggregates: Boolean,
            showeverpresentrow: Boolean,
            showfilterrow: Boolean,
            showemptyrow: Boolean,
            showstatusbar: Boolean,
            statusbarheight: Number,
            showtoolbar: Boolean,
            showfilterbar: Boolean,
            filterbarmode: String,
            selectionmode: String,
            updatefilterconditions: Function,
            updatefilterpanel: Function,
            theme: String,
            toolbarheight: Number,
            autoheight: Boolean,
            autorowheight: Boolean,
            columnsheight: Number,
            deferreddatafields: Array,
            groupsheaderheight: Number,
            groupindentwidth: Number,
            height: [String, Number],
            pagerheight: Number,
            rowsheight: Number,
            scrollbarsize: Number,
            scrollmode: String,
            scrollfeedback: Function,
            width: [String, Number],
            autosavestate: Boolean,
            autoloadstate: Boolean,
            columns: Array,
            columngroups: Array,
            columnsmenu: Boolean,
            columnsresize: Boolean,
            columnsautoresize: Boolean,
            columnsreorder: Boolean,
            charting: Object,
            disabled: Boolean,
            editable: Boolean,
            editmode: String,
            filter: Function,
            filterable: Boolean,
            groupable: Boolean,
            groups: Array,
            horizontalscrollbarstep: Number,
            horizontalscrollbarlargestep: Number,
            initrowdetails: Function,
            keyboardnavigation: Boolean,
            localization: Object,
            pagesize: Number,
            pagesizeoptions: Array,
            pagermode: String,
            pagerbuttonscount: Number,
            pageable: Boolean,
            autofill: Boolean,
            rowdetails: Boolean,
            rowdetailstemplate: Object,
            ready: Function,
            rendered: Function,
            renderstatusbar: Function,
            rendertoolbar: Function,
            rendergridrows: Function,
            sortable: Boolean,
            sortmode: String,
            selectedrowindex: Number,
            selectedrowindexes: Array,
            source: Object,
            sorttogglestates: Number,
            updatedelay: Number,
            virtualmode: Boolean,
            verticalscrollbarstep: Number,
            verticalscrollbarlargestep: Number,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxGrid' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxGrid(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxGrid(usedProps[i]);
                }
                return resultToReturn;
            },
            autoresizecolumns: function(type) {
                JQXLite(this.componentSelector).jqxGrid('autoresizecolumns', type);  
            },
            autoresizecolumn: function(dataField, type) {
                JQXLite(this.componentSelector).jqxGrid('autoresizecolumn', dataField, type);  
            },
            beginupdate: function() {
                JQXLite(this.componentSelector).jqxGrid('beginupdate');  
            },
            clear: function() {
                JQXLite(this.componentSelector).jqxGrid('clear');  
            },
            createChart: function(type, dataSource) {
                JQXLite(this.componentSelector).jqxGrid('createChart', type, dataSource);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxGrid('destroy');  
            },
            endupdate: function() {
                JQXLite(this.componentSelector).jqxGrid('endupdate');  
            },
            ensurerowvisible: function(rowBoundIndex) {
                JQXLite(this.componentSelector).jqxGrid('ensurerowvisible', rowBoundIndex);  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxGrid('focus');  
            },
            getcolumnindex: function(dataField) {
                return JQXLite(this.componentSelector).jqxGrid('getcolumnindex', dataField);  
            },
            getcolumn: function(dataField) {
                return JQXLite(this.componentSelector).jqxGrid('getcolumn', dataField);  
            },
            getcolumnproperty: function(dataField, propertyName) {
                return JQXLite(this.componentSelector).jqxGrid('getcolumnproperty', dataField, propertyName);  
            },
            getrowid: function(rowBoundIndex) {
                return JQXLite(this.componentSelector).jqxGrid('getrowid', rowBoundIndex);  
            },
            getrowdata: function(rowBoundIndex) {
                return JQXLite(this.componentSelector).jqxGrid('getrowdata', rowBoundIndex);  
            },
            getrowdatabyid: function(rowID) {
                return JQXLite(this.componentSelector).jqxGrid('getrowdatabyid', rowID);  
            },
            getrowboundindexbyid: function(rowID) {
                return JQXLite(this.componentSelector).jqxGrid('getrowboundindexbyid', rowID);  
            },
            getrowboundindex: function(rowDisplayIndex) {
                return JQXLite(this.componentSelector).jqxGrid('getrowboundindex', rowDisplayIndex);  
            },
            getrows: function() {
                return JQXLite(this.componentSelector).jqxGrid('getrows');  
            },
            getboundrows: function() {
                return JQXLite(this.componentSelector).jqxGrid('getboundrows');  
            },
            getdisplayrows: function() {
                return JQXLite(this.componentSelector).jqxGrid('getdisplayrows');  
            },
            getdatainformation: function() {
                return JQXLite(this.componentSelector).jqxGrid('getdatainformation');  
            },
            getsortinformation: function() {
                return JQXLite(this.componentSelector).jqxGrid('getsortinformation');  
            },
            getpaginginformation: function() {
                return JQXLite(this.componentSelector).jqxGrid('getpaginginformation');  
            },
            hidecolumn: function(dataField) {
                JQXLite(this.componentSelector).jqxGrid('hidecolumn', dataField);  
            },
            hideloadelement: function() {
                JQXLite(this.componentSelector).jqxGrid('hideloadelement');  
            },
            hiderowdetails: function(rowBoundIndex) {
                JQXLite(this.componentSelector).jqxGrid('hiderowdetails', rowBoundIndex);  
            },
            iscolumnvisible: function(dataField) {
                return JQXLite(this.componentSelector).jqxGrid('iscolumnvisible', dataField);  
            },
            iscolumnpinned: function(dataField) {
                return JQXLite(this.componentSelector).jqxGrid('iscolumnpinned', dataField);  
            },
            localizestrings: function(localizationobject) {
                JQXLite(this.componentSelector).jqxGrid('localizestrings', localizationobject);  
            },
            pincolumn: function(dataField) {
                JQXLite(this.componentSelector).jqxGrid('pincolumn', dataField);  
            },
            refreshdata: function() {
                JQXLite(this.componentSelector).jqxGrid('refreshdata');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxGrid('refresh');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxGrid('render');  
            },
            scrolloffset: function(top, left) {
                JQXLite(this.componentSelector).jqxGrid('scrolloffset', top, left);  
            },
            scrollposition: function() {
                return JQXLite(this.componentSelector).jqxGrid('scrollposition');  
            },
            showloadelement: function() {
                JQXLite(this.componentSelector).jqxGrid('showloadelement');  
            },
            showrowdetails: function(rowBoundIndex) {
                JQXLite(this.componentSelector).jqxGrid('showrowdetails', rowBoundIndex);  
            },
            setcolumnindex: function(dataField, index) {
                JQXLite(this.componentSelector).jqxGrid('setcolumnindex', dataField, index);  
            },
            setcolumnproperty: function(dataField, propertyName, propertyValue) {
                JQXLite(this.componentSelector).jqxGrid('setcolumnproperty', dataField, propertyName, propertyValue);  
            },
            showcolumn: function(dataField) {
                JQXLite(this.componentSelector).jqxGrid('showcolumn', dataField);  
            },
            unpincolumn: function(dataField) {
                JQXLite(this.componentSelector).jqxGrid('unpincolumn', dataField);  
            },
            updatebounddata: function(type) {
                JQXLite(this.componentSelector).jqxGrid('updatebounddata', type);  
            },
            updating: function() {
                return JQXLite(this.componentSelector).jqxGrid('updating');  
            },
            getsortcolumn: function() {
                return JQXLite(this.componentSelector).jqxGrid('getsortcolumn');  
            },
            removesort: function() {
                JQXLite(this.componentSelector).jqxGrid('removesort');  
            },
            sortby: function(dataField, sortOrder) {
                JQXLite(this.componentSelector).jqxGrid('sortby', dataField, sortOrder);  
            },
            addgroup: function(dataField) {
                JQXLite(this.componentSelector).jqxGrid('addgroup', dataField);  
            },
            cleargroups: function() {
                JQXLite(this.componentSelector).jqxGrid('cleargroups');  
            },
            collapsegroup: function(group) {
                JQXLite(this.componentSelector).jqxGrid('collapsegroup', group);  
            },
            collapseallgroups: function() {
                JQXLite(this.componentSelector).jqxGrid('collapseallgroups');  
            },
            expandallgroups: function() {
                JQXLite(this.componentSelector).jqxGrid('expandallgroups');  
            },
            expandgroup: function(group) {
                JQXLite(this.componentSelector).jqxGrid('expandgroup', group);  
            },
            getrootgroupscount: function() {
                return JQXLite(this.componentSelector).jqxGrid('getrootgroupscount');  
            },
            getgroup: function(groupIndex) {
                return JQXLite(this.componentSelector).jqxGrid('getgroup', groupIndex);  
            },
            insertgroup: function(groupIndex, dataField) {
                JQXLite(this.componentSelector).jqxGrid('insertgroup', groupIndex, dataField);  
            },
            iscolumngroupable: function() {
                return JQXLite(this.componentSelector).jqxGrid('iscolumngroupable');  
            },
            removegroupat: function(groupIndex) {
                JQXLite(this.componentSelector).jqxGrid('removegroupat', groupIndex);  
            },
            removegroup: function(dataField) {
                JQXLite(this.componentSelector).jqxGrid('removegroup', dataField);  
            },
            addfilter: function(dataField, filterGroup, refreshGrid) {
                JQXLite(this.componentSelector).jqxGrid('addfilter', dataField, filterGroup, refreshGrid);  
            },
            applyfilters: function() {
                JQXLite(this.componentSelector).jqxGrid('applyfilters');  
            },
            clearfilters: function() {
                JQXLite(this.componentSelector).jqxGrid('clearfilters');  
            },
            getfilterinformation: function() {
                return JQXLite(this.componentSelector).jqxGrid('getfilterinformation');  
            },
            getcolumnat: function(index) {
                return JQXLite(this.componentSelector).jqxGrid('getcolumnat', index);  
            },
            removefilter: function(dataField, refreshGrid) {
                JQXLite(this.componentSelector).jqxGrid('removefilter', dataField, refreshGrid);  
            },
            refreshfilterrow: function() {
                JQXLite(this.componentSelector).jqxGrid('refreshfilterrow');  
            },
            gotopage: function(pagenumber) {
                JQXLite(this.componentSelector).jqxGrid('gotopage', pagenumber);  
            },
            gotoprevpage: function() {
                JQXLite(this.componentSelector).jqxGrid('gotoprevpage');  
            },
            gotonextpage: function() {
                JQXLite(this.componentSelector).jqxGrid('gotonextpage');  
            },
            addrow: function(rowIds, data, rowPosition) {
                JQXLite(this.componentSelector).jqxGrid('addrow', rowIds, data, rowPosition);  
            },
            begincelledit: function(rowBoundIndex, dataField) {
                JQXLite(this.componentSelector).jqxGrid('begincelledit', rowBoundIndex, dataField);  
            },
            beginrowedit: function(rowBoundIndex) {
                JQXLite(this.componentSelector).jqxGrid('beginrowedit', rowBoundIndex);  
            },
            closemenu: function() {
                JQXLite(this.componentSelector).jqxGrid('closemenu');  
            },
            deleterow: function(rowIds) {
                JQXLite(this.componentSelector).jqxGrid('deleterow', rowIds);  
            },
            endcelledit: function(rowBoundIndex, dataField, confirmChanges) {
                JQXLite(this.componentSelector).jqxGrid('endcelledit', rowBoundIndex, dataField, confirmChanges);  
            },
            endrowedit: function(rowBoundIndex, confirmChanges) {
                JQXLite(this.componentSelector).jqxGrid('endrowedit', rowBoundIndex, confirmChanges);  
            },
            getcell: function(rowBoundIndex, datafield) {
                return JQXLite(this.componentSelector).jqxGrid('getcell', rowBoundIndex, datafield);  
            },
            getcellatposition: function(left, top) {
                return JQXLite(this.componentSelector).jqxGrid('getcellatposition', left, top);  
            },
            getcelltext: function(rowBoundIndex, dataField) {
                return JQXLite(this.componentSelector).jqxGrid('getcelltext', rowBoundIndex, dataField);  
            },
            getcelltextbyid: function(rowID, dataField) {
                return JQXLite(this.componentSelector).jqxGrid('getcelltextbyid', rowID, dataField);  
            },
            getcellvaluebyid: function(rowID, dataField) {
                return JQXLite(this.componentSelector).jqxGrid('getcellvaluebyid', rowID, dataField);  
            },
            getcellvalue: function(rowBoundIndex, dataField) {
                return JQXLite(this.componentSelector).jqxGrid('getcellvalue', rowBoundIndex, dataField);  
            },
            isBindingCompleted: function() {
                return JQXLite(this.componentSelector).jqxGrid('isBindingCompleted');  
            },
            openmenu: function(dataField) {
                JQXLite(this.componentSelector).jqxGrid('openmenu', dataField);  
            },
            setcellvalue: function(rowBoundIndex, dataField, value) {
                JQXLite(this.componentSelector).jqxGrid('setcellvalue', rowBoundIndex, dataField, value);  
            },
            setcellvaluebyid: function(rowID, dataField, value) {
                JQXLite(this.componentSelector).jqxGrid('setcellvaluebyid', rowID, dataField, value);  
            },
            showvalidationpopup: function(rowBoundIndex, dataField, validationMessage) {
                JQXLite(this.componentSelector).jqxGrid('showvalidationpopup', rowBoundIndex, dataField, validationMessage);  
            },
            updaterow: function(rowIds, data) {
                JQXLite(this.componentSelector).jqxGrid('updaterow', rowIds, data);  
            },
            clearselection: function() {
                JQXLite(this.componentSelector).jqxGrid('clearselection');  
            },
            getselectedrowindex: function() {
                return JQXLite(this.componentSelector).jqxGrid('getselectedrowindex');  
            },
            getselectedrowindexes: function() {
                return JQXLite(this.componentSelector).jqxGrid('getselectedrowindexes');  
            },
            getselectedcell: function() {
                return JQXLite(this.componentSelector).jqxGrid('getselectedcell');  
            },
            getselectedcells: function() {
                return JQXLite(this.componentSelector).jqxGrid('getselectedcells');  
            },
            selectcell: function(rowBoundIndex, dataField) {
                JQXLite(this.componentSelector).jqxGrid('selectcell', rowBoundIndex, dataField);  
            },
            selectallrows: function() {
                JQXLite(this.componentSelector).jqxGrid('selectallrows');  
            },
            selectrow: function(rowBoundIndex) {
                JQXLite(this.componentSelector).jqxGrid('selectrow', rowBoundIndex);  
            },
            unselectrow: function(rowBoundIndex) {
                JQXLite(this.componentSelector).jqxGrid('unselectrow', rowBoundIndex);  
            },
            unselectcell: function(rowBoundIndex, dataField) {
                JQXLite(this.componentSelector).jqxGrid('unselectcell', rowBoundIndex, dataField);  
            },
            getcolumnaggregateddata: function(dataField, aggregates) {
                return JQXLite(this.componentSelector).jqxGrid('getcolumnaggregateddata', dataField, aggregates);  
            },
            refreshaggregates: function() {
                JQXLite(this.componentSelector).jqxGrid('refreshaggregates');  
            },
            renderaggregates: function() {
                JQXLite(this.componentSelector).jqxGrid('renderaggregates');  
            },
            exportdata: function(dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet) {
                return JQXLite(this.componentSelector).jqxGrid('exportdata', dataType, fileName, exportHeader, rows, exportHiddenColumns, serverURL, charSet);  
            },
            exportview: function(dataType, fileName) {
                return JQXLite(this.componentSelector).jqxGrid('exportview', dataType, fileName);  
            },
            openColumnChooser: function(columns, header) {
                JQXLite(this.componentSelector).jqxGrid('openColumnChooser', columns, header);  
            },
            getstate: function() {
                return JQXLite(this.componentSelector).jqxGrid('getstate');  
            },
            loadstate: function(stateobject) {
                JQXLite(this.componentSelector).jqxGrid('loadstate', stateobject);  
            },
            savestate: function() {
                return JQXLite(this.componentSelector).jqxGrid('savestate');  
            },
            _altrows: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('altrows', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('altrows');
                }
            },
            _altstart: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('altstart', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('altstart');
                }
            },
            _altstep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('altstep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('altstep');
                }
            },
            _autoshowloadelement: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('autoshowloadelement', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('autoshowloadelement');
                }
            },
            _autoshowfiltericon: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('autoshowfiltericon', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('autoshowfiltericon');
                }
            },
            _autoshowcolumnsmenubutton: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('autoshowcolumnsmenubutton', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('autoshowcolumnsmenubutton');
                }
            },
            _showcolumnlines: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showcolumnlines', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showcolumnlines');
                }
            },
            _showrowlines: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showrowlines', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showrowlines');
                }
            },
            _showcolumnheaderlines: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showcolumnheaderlines', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showcolumnheaderlines');
                }
            },
            _adaptive: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('adaptive', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('adaptive');
                }
            },
            _adaptivewidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('adaptivewidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('adaptivewidth');
                }
            },
            _clipboard: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('clipboard', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('clipboard');
                }
            },
            _closeablegroups: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('closeablegroups', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('closeablegroups');
                }
            },
            _columnsmenuwidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columnsmenuwidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columnsmenuwidth');
                }
            },
            _columnmenuopening: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columnmenuopening', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columnmenuopening');
                }
            },
            _columnmenuclosing: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columnmenuclosing', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columnmenuclosing');
                }
            },
            _cellhover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('cellhover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('cellhover');
                }
            },
            _enablekeyboarddelete: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('enablekeyboarddelete', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('enablekeyboarddelete');
                }
            },
            _enableellipsis: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('enableellipsis', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('enableellipsis');
                }
            },
            _enablemousewheel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('enablemousewheel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('enablemousewheel');
                }
            },
            _enableanimations: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('enableanimations', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('enableanimations');
                }
            },
            _enabletooltips: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('enabletooltips', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('enabletooltips');
                }
            },
            _enablehover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('enablehover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('enablehover');
                }
            },
            _enablebrowserselection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('enablebrowserselection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('enablebrowserselection');
                }
            },
            _everpresentrowposition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('everpresentrowposition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('everpresentrowposition');
                }
            },
            _everpresentrowheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('everpresentrowheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('everpresentrowheight');
                }
            },
            _everpresentrowactions: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('everpresentrowactions', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('everpresentrowactions');
                }
            },
            _everpresentrowactionsmode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('everpresentrowactionsmode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('everpresentrowactionsmode');
                }
            },
            _filterrowheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('filterrowheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('filterrowheight');
                }
            },
            _filtermode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('filtermode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('filtermode');
                }
            },
            _groupsrenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('groupsrenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('groupsrenderer');
                }
            },
            _groupcolumnrenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('groupcolumnrenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('groupcolumnrenderer');
                }
            },
            _groupsexpandedbydefault: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('groupsexpandedbydefault', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('groupsexpandedbydefault');
                }
            },
            _handlekeyboardnavigation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('handlekeyboardnavigation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('handlekeyboardnavigation');
                }
            },
            _pagerrenderer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('pagerrenderer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('pagerrenderer');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('rtl');
                }
            },
            _showdefaultloadelement: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showdefaultloadelement', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showdefaultloadelement');
                }
            },
            _showfiltercolumnbackground: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showfiltercolumnbackground', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showfiltercolumnbackground');
                }
            },
            _showfiltermenuitems: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showfiltermenuitems', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showfiltermenuitems');
                }
            },
            _showpinnedcolumnbackground: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showpinnedcolumnbackground', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showpinnedcolumnbackground');
                }
            },
            _showsortcolumnbackground: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showsortcolumnbackground', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showsortcolumnbackground');
                }
            },
            _showsortmenuitems: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showsortmenuitems', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showsortmenuitems');
                }
            },
            _showgroupmenuitems: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showgroupmenuitems', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showgroupmenuitems');
                }
            },
            _showrowdetailscolumn: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showrowdetailscolumn', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showrowdetailscolumn');
                }
            },
            _showheader: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showheader', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showheader');
                }
            },
            _showgroupsheader: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showgroupsheader', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showgroupsheader');
                }
            },
            _showaggregates: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showaggregates', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showaggregates');
                }
            },
            _showgroupaggregates: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showgroupaggregates', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showgroupaggregates');
                }
            },
            _showeverpresentrow: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showeverpresentrow', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showeverpresentrow');
                }
            },
            _showfilterrow: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showfilterrow', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showfilterrow');
                }
            },
            _showemptyrow: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showemptyrow', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showemptyrow');
                }
            },
            _showstatusbar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showstatusbar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showstatusbar');
                }
            },
            _statusbarheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('statusbarheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('statusbarheight');
                }
            },
            _showtoolbar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showtoolbar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showtoolbar');
                }
            },
            _showfilterbar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('showfilterbar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('showfilterbar');
                }
            },
            _filterbarmode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('filterbarmode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('filterbarmode');
                }
            },
            _selectionmode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('selectionmode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('selectionmode');
                }
            },
            _updatefilterconditions: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('updatefilterconditions', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('updatefilterconditions');
                }
            },
            _updatefilterpanel: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('updatefilterpanel', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('updatefilterpanel');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('theme');
                }
            },
            _toolbarheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('toolbarheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('toolbarheight');
                }
            },
            _autoheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('autoheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('autoheight');
                }
            },
            _autorowheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('autorowheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('autorowheight');
                }
            },
            _columnsheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columnsheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columnsheight');
                }
            },
            _deferreddatafields: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('deferreddatafields', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('deferreddatafields');
                }
            },
            _groupsheaderheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('groupsheaderheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('groupsheaderheight');
                }
            },
            _groupindentwidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('groupindentwidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('groupindentwidth');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('height');
                }
            },
            _pagerheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('pagerheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('pagerheight');
                }
            },
            _rowsheight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('rowsheight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('rowsheight');
                }
            },
            _scrollbarsize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('scrollbarsize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('scrollbarsize');
                }
            },
            _scrollmode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('scrollmode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('scrollmode');
                }
            },
            _scrollfeedback: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('scrollfeedback', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('scrollfeedback');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('width');
                }
            },
            _autosavestate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('autosavestate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('autosavestate');
                }
            },
            _autoloadstate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('autoloadstate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('autoloadstate');
                }
            },
            _columns: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columns', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columns');
                }
            },
            _columngroups: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columngroups', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columngroups');
                }
            },
            _columnsmenu: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columnsmenu', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columnsmenu');
                }
            },
            _columnsresize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columnsresize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columnsresize');
                }
            },
            _columnsautoresize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columnsautoresize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columnsautoresize');
                }
            },
            _columnsreorder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('columnsreorder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('columnsreorder');
                }
            },
            _charting: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('charting', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('charting');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('disabled');
                }
            },
            _editable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('editable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('editable');
                }
            },
            _editmode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('editmode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('editmode');
                }
            },
            _filter: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('filter', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('filter');
                }
            },
            _filterable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('filterable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('filterable');
                }
            },
            _groupable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('groupable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('groupable');
                }
            },
            _groups: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('groups', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('groups');
                }
            },
            _horizontalscrollbarstep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('horizontalscrollbarstep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('horizontalscrollbarstep');
                }
            },
            _horizontalscrollbarlargestep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('horizontalscrollbarlargestep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('horizontalscrollbarlargestep');
                }
            },
            _initrowdetails: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('initrowdetails', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('initrowdetails');
                }
            },
            _keyboardnavigation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('keyboardnavigation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('keyboardnavigation');
                }
            },
            _localization: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('localization', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('localization');
                }
            },
            _pagesize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('pagesize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('pagesize');
                }
            },
            _pagesizeoptions: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('pagesizeoptions', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('pagesizeoptions');
                }
            },
            _pagermode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('pagermode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('pagermode');
                }
            },
            _pagerbuttonscount: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('pagerbuttonscount', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('pagerbuttonscount');
                }
            },
            _pageable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('pageable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('pageable');
                }
            },
            _autofill: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('autofill', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('autofill');
                }
            },
            _rowdetails: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('rowdetails', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('rowdetails');
                }
            },
            _rowdetailstemplate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('rowdetailstemplate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('rowdetailstemplate');
                }
            },
            _ready: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('ready', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('ready');
                }
            },
            _rendered: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('rendered', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('rendered');
                }
            },
            _renderstatusbar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('renderstatusbar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('renderstatusbar');
                }
            },
            _rendertoolbar: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('rendertoolbar', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('rendertoolbar');
                }
            },
            _rendergridrows: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('rendergridrows', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('rendergridrows');
                }
            },
            _sortable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('sortable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('sortable');
                }
            },
            _sortmode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('sortmode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('sortmode');
                }
            },
            _selectedrowindex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('selectedrowindex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('selectedrowindex');
                }
            },
            _selectedrowindexes: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('selectedrowindexes', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('selectedrowindexes');
                }
            },
            _source: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('source', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('source');
                }
            },
            _sorttogglestates: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('sorttogglestates', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('sorttogglestates');
                }
            },
            _updatedelay: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('updatedelay', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('updatedelay');
                }
            },
            _virtualmode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('virtualmode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('virtualmode');
                }
            },
            _verticalscrollbarstep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('verticalscrollbarstep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('verticalscrollbarstep');
                }
            },
            _verticalscrollbarlargestep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxGrid('verticalscrollbarlargestep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxGrid('verticalscrollbarlargestep');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxGrid(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['altrows','altstart','altstep','autoshowloadelement','autoshowfiltericon','autoshowcolumnsmenubutton','showcolumnlines','showrowlines','showcolumnheaderlines','adaptive','adaptivewidth','clipboard','closeablegroups','columnsmenuwidth','columnmenuopening','columnmenuclosing','cellhover','enablekeyboarddelete','enableellipsis','enablemousewheel','enableanimations','enabletooltips','enablehover','enablebrowserselection','everpresentrowposition','everpresentrowheight','everpresentrowactions','everpresentrowactionsmode','filterrowheight','filtermode','groupsrenderer','groupcolumnrenderer','groupsexpandedbydefault','handlekeyboardnavigation','pagerrenderer','rtl','showdefaultloadelement','showfiltercolumnbackground','showfiltermenuitems','showpinnedcolumnbackground','showsortcolumnbackground','showsortmenuitems','showgroupmenuitems','showrowdetailscolumn','showheader','showgroupsheader','showaggregates','showgroupaggregates','showeverpresentrow','showfilterrow','showemptyrow','showstatusbar','statusbarheight','showtoolbar','showfilterbar','filterbarmode','selectionmode','updatefilterconditions','updatefilterpanel','theme','toolbarheight','autoheight','autorowheight','columnsheight','deferreddatafields','groupsheaderheight','groupindentwidth','height','pagerheight','rowsheight','scrollbarsize','scrollmode','scrollfeedback','width','autosavestate','autoloadstate','columns','columngroups','columnsmenu','columnsresize','columnsautoresize','columnsreorder','charting','disabled','editable','editmode','filter','filterable','groupable','groups','horizontalscrollbarstep','horizontalscrollbarlargestep','initrowdetails','keyboardnavigation','localization','pagesize','pagesizeoptions','pagermode','pagerbuttonscount','pageable','autofill','rowdetails','rowdetailstemplate','ready','rendered','renderstatusbar','rendertoolbar','rendergridrows','sortable','sortmode','selectedrowindex','selectedrowindexes','source','sorttogglestates','updatedelay','virtualmode','verticalscrollbarstep','verticalscrollbarlargestep'];
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

                Object.defineProperty(that, 'altrows', {
                    get: function() {
                        return that._altrows();
                    },
                    set: function(newValue) {
                        that._altrows(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'altstart', {
                    get: function() {
                        return that._altstart();
                    },
                    set: function(newValue) {
                        that._altstart(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'altstep', {
                    get: function() {
                        return that._altstep();
                    },
                    set: function(newValue) {
                        that._altstep(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoshowloadelement', {
                    get: function() {
                        return that._autoshowloadelement();
                    },
                    set: function(newValue) {
                        that._autoshowloadelement(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoshowfiltericon', {
                    get: function() {
                        return that._autoshowfiltericon();
                    },
                    set: function(newValue) {
                        that._autoshowfiltericon(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoshowcolumnsmenubutton', {
                    get: function() {
                        return that._autoshowcolumnsmenubutton();
                    },
                    set: function(newValue) {
                        that._autoshowcolumnsmenubutton(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showcolumnlines', {
                    get: function() {
                        return that._showcolumnlines();
                    },
                    set: function(newValue) {
                        that._showcolumnlines(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showrowlines', {
                    get: function() {
                        return that._showrowlines();
                    },
                    set: function(newValue) {
                        that._showrowlines(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showcolumnheaderlines', {
                    get: function() {
                        return that._showcolumnheaderlines();
                    },
                    set: function(newValue) {
                        that._showcolumnheaderlines(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'adaptive', {
                    get: function() {
                        return that._adaptive();
                    },
                    set: function(newValue) {
                        that._adaptive(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'adaptivewidth', {
                    get: function() {
                        return that._adaptivewidth();
                    },
                    set: function(newValue) {
                        that._adaptivewidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'clipboard', {
                    get: function() {
                        return that._clipboard();
                    },
                    set: function(newValue) {
                        that._clipboard(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'closeablegroups', {
                    get: function() {
                        return that._closeablegroups();
                    },
                    set: function(newValue) {
                        that._closeablegroups(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsmenuwidth', {
                    get: function() {
                        return that._columnsmenuwidth();
                    },
                    set: function(newValue) {
                        that._columnsmenuwidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnmenuopening', {
                    get: function() {
                        return that._columnmenuopening();
                    },
                    set: function(newValue) {
                        that._columnmenuopening(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnmenuclosing', {
                    get: function() {
                        return that._columnmenuclosing();
                    },
                    set: function(newValue) {
                        that._columnmenuclosing(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'cellhover', {
                    get: function() {
                        return that._cellhover();
                    },
                    set: function(newValue) {
                        that._cellhover(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enablekeyboarddelete', {
                    get: function() {
                        return that._enablekeyboarddelete();
                    },
                    set: function(newValue) {
                        that._enablekeyboarddelete(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableellipsis', {
                    get: function() {
                        return that._enableellipsis();
                    },
                    set: function(newValue) {
                        that._enableellipsis(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enablemousewheel', {
                    get: function() {
                        return that._enablemousewheel();
                    },
                    set: function(newValue) {
                        that._enablemousewheel(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableanimations', {
                    get: function() {
                        return that._enableanimations();
                    },
                    set: function(newValue) {
                        that._enableanimations(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enabletooltips', {
                    get: function() {
                        return that._enabletooltips();
                    },
                    set: function(newValue) {
                        that._enabletooltips(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enablehover', {
                    get: function() {
                        return that._enablehover();
                    },
                    set: function(newValue) {
                        that._enablehover(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enablebrowserselection', {
                    get: function() {
                        return that._enablebrowserselection();
                    },
                    set: function(newValue) {
                        that._enablebrowserselection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'everpresentrowposition', {
                    get: function() {
                        return that._everpresentrowposition();
                    },
                    set: function(newValue) {
                        that._everpresentrowposition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'everpresentrowheight', {
                    get: function() {
                        return that._everpresentrowheight();
                    },
                    set: function(newValue) {
                        that._everpresentrowheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'everpresentrowactions', {
                    get: function() {
                        return that._everpresentrowactions();
                    },
                    set: function(newValue) {
                        that._everpresentrowactions(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'everpresentrowactionsmode', {
                    get: function() {
                        return that._everpresentrowactionsmode();
                    },
                    set: function(newValue) {
                        that._everpresentrowactionsmode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filterrowheight', {
                    get: function() {
                        return that._filterrowheight();
                    },
                    set: function(newValue) {
                        that._filterrowheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filtermode', {
                    get: function() {
                        return that._filtermode();
                    },
                    set: function(newValue) {
                        that._filtermode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupsrenderer', {
                    get: function() {
                        return that._groupsrenderer();
                    },
                    set: function(newValue) {
                        that._groupsrenderer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupcolumnrenderer', {
                    get: function() {
                        return that._groupcolumnrenderer();
                    },
                    set: function(newValue) {
                        that._groupcolumnrenderer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupsexpandedbydefault', {
                    get: function() {
                        return that._groupsexpandedbydefault();
                    },
                    set: function(newValue) {
                        that._groupsexpandedbydefault(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'handlekeyboardnavigation', {
                    get: function() {
                        return that._handlekeyboardnavigation();
                    },
                    set: function(newValue) {
                        that._handlekeyboardnavigation(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagerrenderer', {
                    get: function() {
                        return that._pagerrenderer();
                    },
                    set: function(newValue) {
                        that._pagerrenderer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rtl', {
                    get: function() {
                        return that._rtl();
                    },
                    set: function(newValue) {
                        that._rtl(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showdefaultloadelement', {
                    get: function() {
                        return that._showdefaultloadelement();
                    },
                    set: function(newValue) {
                        that._showdefaultloadelement(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showfiltercolumnbackground', {
                    get: function() {
                        return that._showfiltercolumnbackground();
                    },
                    set: function(newValue) {
                        that._showfiltercolumnbackground(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showfiltermenuitems', {
                    get: function() {
                        return that._showfiltermenuitems();
                    },
                    set: function(newValue) {
                        that._showfiltermenuitems(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showpinnedcolumnbackground', {
                    get: function() {
                        return that._showpinnedcolumnbackground();
                    },
                    set: function(newValue) {
                        that._showpinnedcolumnbackground(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showsortcolumnbackground', {
                    get: function() {
                        return that._showsortcolumnbackground();
                    },
                    set: function(newValue) {
                        that._showsortcolumnbackground(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showsortmenuitems', {
                    get: function() {
                        return that._showsortmenuitems();
                    },
                    set: function(newValue) {
                        that._showsortmenuitems(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showgroupmenuitems', {
                    get: function() {
                        return that._showgroupmenuitems();
                    },
                    set: function(newValue) {
                        that._showgroupmenuitems(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showrowdetailscolumn', {
                    get: function() {
                        return that._showrowdetailscolumn();
                    },
                    set: function(newValue) {
                        that._showrowdetailscolumn(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showheader', {
                    get: function() {
                        return that._showheader();
                    },
                    set: function(newValue) {
                        that._showheader(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showgroupsheader', {
                    get: function() {
                        return that._showgroupsheader();
                    },
                    set: function(newValue) {
                        that._showgroupsheader(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showaggregates', {
                    get: function() {
                        return that._showaggregates();
                    },
                    set: function(newValue) {
                        that._showaggregates(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showgroupaggregates', {
                    get: function() {
                        return that._showgroupaggregates();
                    },
                    set: function(newValue) {
                        that._showgroupaggregates(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showeverpresentrow', {
                    get: function() {
                        return that._showeverpresentrow();
                    },
                    set: function(newValue) {
                        that._showeverpresentrow(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showfilterrow', {
                    get: function() {
                        return that._showfilterrow();
                    },
                    set: function(newValue) {
                        that._showfilterrow(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showemptyrow', {
                    get: function() {
                        return that._showemptyrow();
                    },
                    set: function(newValue) {
                        that._showemptyrow(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showstatusbar', {
                    get: function() {
                        return that._showstatusbar();
                    },
                    set: function(newValue) {
                        that._showstatusbar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'statusbarheight', {
                    get: function() {
                        return that._statusbarheight();
                    },
                    set: function(newValue) {
                        that._statusbarheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showtoolbar', {
                    get: function() {
                        return that._showtoolbar();
                    },
                    set: function(newValue) {
                        that._showtoolbar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showfilterbar', {
                    get: function() {
                        return that._showfilterbar();
                    },
                    set: function(newValue) {
                        that._showfilterbar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filterbarmode', {
                    get: function() {
                        return that._filterbarmode();
                    },
                    set: function(newValue) {
                        that._filterbarmode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectionmode', {
                    get: function() {
                        return that._selectionmode();
                    },
                    set: function(newValue) {
                        that._selectionmode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'updatefilterconditions', {
                    get: function() {
                        return that._updatefilterconditions();
                    },
                    set: function(newValue) {
                        that._updatefilterconditions(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'updatefilterpanel', {
                    get: function() {
                        return that._updatefilterpanel();
                    },
                    set: function(newValue) {
                        that._updatefilterpanel(newValue);
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
                Object.defineProperty(that, 'toolbarheight', {
                    get: function() {
                        return that._toolbarheight();
                    },
                    set: function(newValue) {
                        that._toolbarheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoheight', {
                    get: function() {
                        return that._autoheight();
                    },
                    set: function(newValue) {
                        that._autoheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autorowheight', {
                    get: function() {
                        return that._autorowheight();
                    },
                    set: function(newValue) {
                        that._autorowheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsheight', {
                    get: function() {
                        return that._columnsheight();
                    },
                    set: function(newValue) {
                        that._columnsheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'deferreddatafields', {
                    get: function() {
                        return that._deferreddatafields();
                    },
                    set: function(newValue) {
                        that._deferreddatafields(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupsheaderheight', {
                    get: function() {
                        return that._groupsheaderheight();
                    },
                    set: function(newValue) {
                        that._groupsheaderheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupindentwidth', {
                    get: function() {
                        return that._groupindentwidth();
                    },
                    set: function(newValue) {
                        that._groupindentwidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'height', {
                    get: function() {
                        return that._height();
                    },
                    set: function(newValue) {
                        that._height(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagerheight', {
                    get: function() {
                        return that._pagerheight();
                    },
                    set: function(newValue) {
                        that._pagerheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rowsheight', {
                    get: function() {
                        return that._rowsheight();
                    },
                    set: function(newValue) {
                        that._rowsheight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollbarsize', {
                    get: function() {
                        return that._scrollbarsize();
                    },
                    set: function(newValue) {
                        that._scrollbarsize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollmode', {
                    get: function() {
                        return that._scrollmode();
                    },
                    set: function(newValue) {
                        that._scrollmode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollfeedback', {
                    get: function() {
                        return that._scrollfeedback();
                    },
                    set: function(newValue) {
                        that._scrollfeedback(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'width', {
                    get: function() {
                        return that._width();
                    },
                    set: function(newValue) {
                        that._width(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autosavestate', {
                    get: function() {
                        return that._autosavestate();
                    },
                    set: function(newValue) {
                        that._autosavestate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autoloadstate', {
                    get: function() {
                        return that._autoloadstate();
                    },
                    set: function(newValue) {
                        that._autoloadstate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columns', {
                    get: function() {
                        return that._columns();
                    },
                    set: function(newValue) {
                        that._columns(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columngroups', {
                    get: function() {
                        return that._columngroups();
                    },
                    set: function(newValue) {
                        that._columngroups(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsmenu', {
                    get: function() {
                        return that._columnsmenu();
                    },
                    set: function(newValue) {
                        that._columnsmenu(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsresize', {
                    get: function() {
                        return that._columnsresize();
                    },
                    set: function(newValue) {
                        that._columnsresize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsautoresize', {
                    get: function() {
                        return that._columnsautoresize();
                    },
                    set: function(newValue) {
                        that._columnsautoresize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'columnsreorder', {
                    get: function() {
                        return that._columnsreorder();
                    },
                    set: function(newValue) {
                        that._columnsreorder(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'charting', {
                    get: function() {
                        return that._charting();
                    },
                    set: function(newValue) {
                        that._charting(newValue);
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
                Object.defineProperty(that, 'editable', {
                    get: function() {
                        return that._editable();
                    },
                    set: function(newValue) {
                        that._editable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'editmode', {
                    get: function() {
                        return that._editmode();
                    },
                    set: function(newValue) {
                        that._editmode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filter', {
                    get: function() {
                        return that._filter();
                    },
                    set: function(newValue) {
                        that._filter(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'filterable', {
                    get: function() {
                        return that._filterable();
                    },
                    set: function(newValue) {
                        that._filterable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groupable', {
                    get: function() {
                        return that._groupable();
                    },
                    set: function(newValue) {
                        that._groupable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'groups', {
                    get: function() {
                        return that._groups();
                    },
                    set: function(newValue) {
                        that._groups(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'horizontalscrollbarstep', {
                    get: function() {
                        return that._horizontalscrollbarstep();
                    },
                    set: function(newValue) {
                        that._horizontalscrollbarstep(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'horizontalscrollbarlargestep', {
                    get: function() {
                        return that._horizontalscrollbarlargestep();
                    },
                    set: function(newValue) {
                        that._horizontalscrollbarlargestep(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'initrowdetails', {
                    get: function() {
                        return that._initrowdetails();
                    },
                    set: function(newValue) {
                        that._initrowdetails(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'keyboardnavigation', {
                    get: function() {
                        return that._keyboardnavigation();
                    },
                    set: function(newValue) {
                        that._keyboardnavigation(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'localization', {
                    get: function() {
                        return that._localization();
                    },
                    set: function(newValue) {
                        that._localization(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagesize', {
                    get: function() {
                        return that._pagesize();
                    },
                    set: function(newValue) {
                        that._pagesize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagesizeoptions', {
                    get: function() {
                        return that._pagesizeoptions();
                    },
                    set: function(newValue) {
                        that._pagesizeoptions(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagermode', {
                    get: function() {
                        return that._pagermode();
                    },
                    set: function(newValue) {
                        that._pagermode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pagerbuttonscount', {
                    get: function() {
                        return that._pagerbuttonscount();
                    },
                    set: function(newValue) {
                        that._pagerbuttonscount(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'pageable', {
                    get: function() {
                        return that._pageable();
                    },
                    set: function(newValue) {
                        that._pageable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'autofill', {
                    get: function() {
                        return that._autofill();
                    },
                    set: function(newValue) {
                        that._autofill(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rowdetails', {
                    get: function() {
                        return that._rowdetails();
                    },
                    set: function(newValue) {
                        that._rowdetails(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rowdetailstemplate', {
                    get: function() {
                        return that._rowdetailstemplate();
                    },
                    set: function(newValue) {
                        that._rowdetailstemplate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'ready', {
                    get: function() {
                        return that._ready();
                    },
                    set: function(newValue) {
                        that._ready(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rendered', {
                    get: function() {
                        return that._rendered();
                    },
                    set: function(newValue) {
                        that._rendered(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'renderstatusbar', {
                    get: function() {
                        return that._renderstatusbar();
                    },
                    set: function(newValue) {
                        that._renderstatusbar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rendertoolbar', {
                    get: function() {
                        return that._rendertoolbar();
                    },
                    set: function(newValue) {
                        that._rendertoolbar(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rendergridrows', {
                    get: function() {
                        return that._rendergridrows();
                    },
                    set: function(newValue) {
                        that._rendergridrows(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'sortable', {
                    get: function() {
                        return that._sortable();
                    },
                    set: function(newValue) {
                        that._sortable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'sortmode', {
                    get: function() {
                        return that._sortmode();
                    },
                    set: function(newValue) {
                        that._sortmode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectedrowindex', {
                    get: function() {
                        return that._selectedrowindex();
                    },
                    set: function(newValue) {
                        that._selectedrowindex(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectedrowindexes', {
                    get: function() {
                        return that._selectedrowindexes();
                    },
                    set: function(newValue) {
                        that._selectedrowindexes(newValue);
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
                Object.defineProperty(that, 'sorttogglestates', {
                    get: function() {
                        return that._sorttogglestates();
                    },
                    set: function(newValue) {
                        that._sorttogglestates(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'updatedelay', {
                    get: function() {
                        return that._updatedelay();
                    },
                    set: function(newValue) {
                        that._updatedelay(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'virtualmode', {
                    get: function() {
                        return that._virtualmode();
                    },
                    set: function(newValue) {
                        that._virtualmode(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'verticalscrollbarstep', {
                    get: function() {
                        return that._verticalscrollbarstep();
                    },
                    set: function(newValue) {
                        that._verticalscrollbarstep(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'verticalscrollbarlargestep', {
                    get: function() {
                        return that._verticalscrollbarlargestep();
                    },
                    set: function(newValue) {
                        that._verticalscrollbarlargestep(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('bindingcomplete', function (event) { that.$emit('bindingcomplete', event); });
                JQXLite(this.componentSelector).on('columnresized', function (event) { that.$emit('columnresized', event); });
                JQXLite(this.componentSelector).on('columnreordered', function (event) { that.$emit('columnreordered', event); });
                JQXLite(this.componentSelector).on('columnclick', function (event) { that.$emit('columnclick', event); });
                JQXLite(this.componentSelector).on('cellclick', function (event) { that.$emit('cellclick', event); });
                JQXLite(this.componentSelector).on('celldoubleclick', function (event) { that.$emit('celldoubleclick', event); });
                JQXLite(this.componentSelector).on('cellselect', function (event) { that.$emit('cellselect', event); });
                JQXLite(this.componentSelector).on('cellunselect', function (event) { that.$emit('cellunselect', event); });
                JQXLite(this.componentSelector).on('cellvaluechanged', function (event) { that.$emit('cellvaluechanged', event); });
                JQXLite(this.componentSelector).on('cellbeginedit', function (event) { that.$emit('cellbeginedit', event); });
                JQXLite(this.componentSelector).on('cellendedit', function (event) { that.$emit('cellendedit', event); });
                JQXLite(this.componentSelector).on('filter', function (event) { that.$emit('filter', event); });
                JQXLite(this.componentSelector).on('groupschanged', function (event) { that.$emit('groupschanged', event); });
                JQXLite(this.componentSelector).on('groupexpand', function (event) { that.$emit('groupexpand', event); });
                JQXLite(this.componentSelector).on('groupcollapse', function (event) { that.$emit('groupcollapse', event); });
                JQXLite(this.componentSelector).on('pagechanged', function (event) { that.$emit('pagechanged', event); });
                JQXLite(this.componentSelector).on('pagesizechanged', function (event) { that.$emit('pagesizechanged', event); });
                JQXLite(this.componentSelector).on('rowclick', function (event) { that.$emit('rowclick', event); });
                JQXLite(this.componentSelector).on('rowdoubleclick', function (event) { that.$emit('rowdoubleclick', event); });
                JQXLite(this.componentSelector).on('rowselect', function (event) { that.$emit('rowselect', event); });
                JQXLite(this.componentSelector).on('rowunselect', function (event) { that.$emit('rowunselect', event); });
                JQXLite(this.componentSelector).on('rowexpand', function (event) { that.$emit('rowexpand', event); });
                JQXLite(this.componentSelector).on('rowcollapse', function (event) { that.$emit('rowcollapse', event); });
                JQXLite(this.componentSelector).on('sort', function (event) { that.$emit('sort', event); });
            }
        }
    }
</script>
