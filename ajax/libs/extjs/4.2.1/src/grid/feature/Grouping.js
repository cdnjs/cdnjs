/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * This feature allows to display the grid rows aggregated into groups as specified by the {@link Ext.data.Store#groupers}
 * specified on the Store. The group will show the title for the group name and then the appropriate records for the group
 * underneath. The groups can also be expanded and collapsed.
 * 
 * ## Extra Events
 *
 * This feature adds several extra events that will be fired on the grid to interact with the groups:
 *
 *  - {@link #groupclick}
 *  - {@link #groupdblclick}
 *  - {@link #groupcontextmenu}
 *  - {@link #groupexpand}
 *  - {@link #groupcollapse}
 *
 * ## Menu Augmentation
 *
 * This feature adds extra options to the grid column menu to provide the user with functionality to modify the grouping.
 * This can be disabled by setting the {@link #enableGroupingMenu} option. The option to disallow grouping from being turned off
 * by the user is {@link #enableNoGroups}.
 *
 * ## Controlling Group Text
 *
 * The {@link #groupHeaderTpl} is used to control the rendered title for each group. It can modified to customized
 * the default display.
 *
 * ## Example Usage
 *
 *     @example
 *     var store = Ext.create('Ext.data.Store', {
 *         storeId:'employeeStore',
 *         fields:['name', 'seniority', 'department'],
 *         groupField: 'department',
 *         data: {'employees':[
 *             { "name": "Michael Scott",  "seniority": 7, "department": "Management" },
 *             { "name": "Dwight Schrute", "seniority": 2, "department": "Sales" },
 *             { "name": "Jim Halpert",    "seniority": 3, "department": "Sales" },
 *             { "name": "Kevin Malone",   "seniority": 4, "department": "Accounting" },
 *             { "name": "Angela Martin",  "seniority": 5, "department": "Accounting" }
 *         ]},
 *         proxy: {
 *             type: 'memory',
 *             reader: {
 *                 type: 'json',
 *                 root: 'employees'
 *             }
 *         }
 *     });
 *
 *     Ext.create('Ext.grid.Panel', {
 *         title: 'Employees',
 *         store: Ext.data.StoreManager.lookup('employeeStore'),
 *         columns: [
 *             { text: 'Name',     dataIndex: 'name' },
 *             { text: 'Seniority', dataIndex: 'seniority' }
 *         ],
 *         features: [{ftype:'grouping'}],
 *         width: 200,
 *         height: 275,
 *         renderTo: Ext.getBody()
 *     });
 *
 * **Note:** To use grouping with a grid that has {@link Ext.grid.column.Column#locked locked columns}, you need to supply
 * the grouping feature as a config object - so the grid can create two instances of the grouping feature.
 *
 * @author Nigel White
 */
Ext.define('Ext.grid.feature.Grouping', {
    extend: 'Ext.grid.feature.Feature',
    mixins: {
        summary: 'Ext.grid.feature.AbstractSummary'
    },
    requires: ['Ext.grid.feature.GroupStore'],

    alias: 'feature.grouping',

    eventPrefix: 'group',
    groupCls: Ext.baseCSSPrefix + 'grid-group-hd',
    eventSelector: '.' + Ext.baseCSSPrefix + 'grid-group-hd',

    refreshData: {},
    groupInfo: {},
    wrapsItem: true,

    /**
     * @event groupclick
     * @param {Ext.view.Table} view
     * @param {HTMLElement} node
     * @param {String} group The name of the group
     * @param {Ext.EventObject} e
     */

    /**
     * @event groupdblclick
     * @param {Ext.view.Table} view
     * @param {HTMLElement} node
     * @param {String} group The name of the group
     * @param {Ext.EventObject} e
     */

    /**
     * @event groupcontextmenu
     * @param {Ext.view.Table} view
     * @param {HTMLElement} node
     * @param {String} group The name of the group
     * @param {Ext.EventObject} e
     */

    /**
     * @event groupcollapse
     * @param {Ext.view.Table} view
     * @param {HTMLElement} node
     * @param {String} group The name of the group
     */

    /**
     * @event groupexpand
     * @param {Ext.view.Table} view
     * @param {HTMLElement} node
     * @param {String} group The name of the group
     */

    /**
     * @cfg {String/Array/Ext.Template} groupHeaderTpl
     * A string Template snippet, an array of strings (optionally followed by an object containing Template methods) to be used to construct a Template, or a Template instance.
     * 
     * - Example 1 (Template snippet):
     * 
     *       groupHeaderTpl: 'Group: {name}'
     *     
     * - Example 2 (Array):
     * 
     *       groupHeaderTpl: [
     *           'Group: ',
     *           '<div>{name:this.formatName}</div>',
     *           {
     *               formatName: function(name) {
     *                   return Ext.String.trim(name);
     *               }
     *           }
     *       ]
     *     
     * - Example 3 (Template Instance):
     * 
     *       groupHeaderTpl: Ext.create('Ext.XTemplate',
     *           'Group: ',
     *           '<div>{name:this.formatName}</div>',
     *           {
     *               formatName: function(name) {
     *                   return Ext.String.trim(name);
     *               }
     *           }
     *       )
     *
     * @cfg {String}           groupHeaderTpl.groupField         The field name being grouped by.
     * @cfg {String}           groupHeaderTpl.columnName         The column header associated with the field being grouped by *if there is a column for the field*, falls back to the groupField name.
     * @cfg {Mixed}            groupHeaderTpl.groupValue         The value of the {@link Ext.data.Store#groupField groupField} for the group header being rendered.
     * @cfg {String}           groupHeaderTpl.renderedGroupValue The rendered value of the {@link Ext.data.Store#groupField groupField} for the group header being rendered, as produced by the column renderer.
     * @cfg {String}           groupHeaderTpl.name               An alias for renderedGroupValue
     * @cfg {Ext.data.Model[]} groupHeaderTpl.rows               Deprecated - use children instead. An array containing the child records for the group being rendered. *Not available if the store is {@link Ext.data.Store#buffered buffered}*
     * @cfg {Ext.data.Model[]} groupHeaderTpl.children           An array containing the child records for the group being rendered. *Not available if the store is {@link Ext.data.Store#buffered buffered}*
     */
    groupHeaderTpl: '{columnName}: {name}',

    /**
     * @cfg {Number} [depthToIndent=17]
     * Number of pixels to indent per grouping level
     */
    depthToIndent: 17,

    collapsedCls: Ext.baseCSSPrefix + 'grid-group-collapsed',
    hdCollapsedCls: Ext.baseCSSPrefix + 'grid-group-hd-collapsed',
    hdNotCollapsibleCls: Ext.baseCSSPrefix + 'grid-group-hd-not-collapsible',
    collapsibleCls: Ext.baseCSSPrefix + 'grid-group-hd-collapsible',
    ctCls: Ext.baseCSSPrefix  + 'group-hd-container',

    //<locale>
    /**
     * @cfg {String} [groupByText="Group by this field"]
     * Text displayed in the grid header menu for grouping by header.
     */
    groupByText : 'Group by this field',
    //</locale>
    //<locale>
    /**
     * @cfg {String} [showGroupsText="Show in groups"]
     * Text displayed in the grid header for enabling/disabling grouping.
     */
    showGroupsText : 'Show in groups',
    //</locale>

    /**
     * @cfg {Boolean} [hideGroupedHeader=false]
     * True to hide the header that is currently grouped.
     */
    hideGroupedHeader : false,

    /**
     * @cfg {Boolean} [startCollapsed=false]
     * True to start all groups collapsed.
     */
    startCollapsed : false,

    /**
     * @cfg {Boolean} [enableGroupingMenu=true]
     * True to enable the grouping control in the header menu.
     */
    enableGroupingMenu : true,

    /**
     * @cfg {Boolean} [enableNoGroups=true]
     * True to allow the user to turn off grouping.
     */
    enableNoGroups : true,

    /**
     * @cfg {Boolean} [collapsible=true]
     * Set to `false` to disable collapsing groups from the UI.
     *
     * This is set to `false` when the associated {@link Ext.data.Store store} is 
     * {@link Ext.data.Store#buffered buffered}.
     */
    collapsible: true,

    //<locale>
    expandTip: 'Click to expand. CTRL key collapses all others',
    //</locale>

    //<locale>
    collapseTip: 'Click to collapse. CTRL/click collapses all others',
    //</locale>

    showSummaryRow: false,

    tableTpl: {
        before: function(values) {
            // Do not process if we are disabled, and do not process summary records
            if (this.groupingFeature.disabled || values.rows.length === 1 && values.rows[0].isSummary) {
                return;
            }
            this.groupingFeature.setup(values.rows, values.view.rowValues);
        },
        after: function(values) {
            // Do not process if we are disabled, and do not process summary records
            if (this.groupingFeature.disabled || values.rows.length === 1 && values.rows[0].isSummary) {
                return;
            }
            this.groupingFeature.cleanup(values.rows, values.view.rowValues);
        },
        priority: 200
    },

    groupTpl: [
        '{%',
            'var me = this.groupingFeature;',
            // If grouping is disabled, do not call setupRowData, and do not wrap
            'if (me.disabled) {',
                'values.needsWrap = false;',
            '} else {',
                'me.setupRowData(values.record, values.recordIndex, values);',
                'values.needsWrap = !me.disabled && (values.isFirstRow || values.summaryRecord);',
            '}',
        '%}',
        '<tpl if="needsWrap">',
            '<tr data-boundView="{view.id}" data-recordId="{record.internalId}" data-recordIndex="{[values.isCollapsedGroup ? -1 : values.recordIndex]}"',
                'class="{[values.itemClasses.join(" ")]} ' + Ext.baseCSSPrefix + 'grid-wrap-row<tpl if="!summaryRecord"> ' + Ext.baseCSSPrefix + 'grid-group-row</tpl>">',
                '<td class="' + Ext.baseCSSPrefix + 'group-hd-container" colspan="{columns.length}">',
                    '<tpl if="isFirstRow">',
                        '{%',
                            // Group title is visible if not locking, or we are the locked side, or the locked side has no columns/
                            // Use visibility to keep row heights synced without intervention.
                            'var groupTitleStyle = (!values.view.lockingPartner || (values.view.ownerCt === values.view.ownerCt.ownerLockable.lockedGrid) || (values.view.lockingPartner.headerCt.getVisibleGridColumns().length === 0)) ? "" : "visibility:hidden";',
                        '%}',
                        '<div id="{groupId}" class="' + Ext.baseCSSPrefix + 'grid-group-hd {collapsibleCls}" tabIndex="0">',
                            '<div class="' + Ext.baseCSSPrefix + 'grid-group-title" style="{[groupTitleStyle]}">',
                                '{[values.groupHeaderTpl.apply(values.groupInfo, parent) || "&#160;"]}',
                            '</div>',
                        '</div>',
                    '</tpl>',

                    // Only output the child rows if  this is *not* a collapsed group
                    '<tpl if="summaryRecord || !isCollapsedGroup">',
                        '<table class="', Ext.baseCSSPrefix, '{view.id}-table ', Ext.baseCSSPrefix, 'grid-table',
                            '<tpl if="summaryRecord"> ', Ext.baseCSSPrefix, 'grid-table-summary</tpl>"',
                            'border="0" cellspacing="0" cellpadding="0" style="width:100%">',
                            '{[values.view.renderColumnSizer(out)]}',
                            // Only output the first row if this is *not* a collapsed group
                            '<tpl if="!isCollapsedGroup">',
                                '{%',
                                    'values.itemClasses.length = 0;',
                                    'this.nextTpl.applyOut(values, out, parent);',
                                '%}',
                            '</tpl>',
                            '<tpl if="summaryRecord">',
                                '{%me.outputSummaryRecord(values.summaryRecord, values, out);%}',
                            '</tpl>',
                        '</table>',
                    '</tpl>',
                '</td>',
            '</tr>',
        '<tpl else>',
            '{%this.nextTpl.applyOut(values, out, parent);%}',
        '</tpl>', {
            priority: 200,

            syncRowHeights: function(firstRow, secondRow) {
                firstRow = Ext.fly(firstRow, 'syncDest');
                secondRow = Ext.fly(secondRow, 'sycSrc');
                var owner = this.owner,
                    firstHd = firstRow.down(owner.eventSelector, true),
                    secondHd,
                    firstSummaryRow = firstRow.down(owner.summaryRowSelector, true),
                    secondSummaryRow,
                    firstHeight, secondHeight;

                // Sync the heights of header elements in each row if they need it.
                if (firstHd && (secondHd = secondRow.down(owner.eventSelector, true))) {
                    firstHd.style.height = secondHd.style.height = '';
                    if ((firstHeight = firstHd.offsetHeight) > (secondHeight = secondHd.offsetHeight)) {
                        Ext.fly(secondHd).setHeight(firstHeight);
                    }
                    else if (secondHeight > firstHeight) {
                        Ext.fly(firstHd).setHeight(secondHeight);
                    }
                }

                // Sync the heights of summary row in each row if they need it.
                if (firstSummaryRow && (secondSummaryRow = secondRow.down(owner.summaryRowSelector, true))) {
                    firstSummaryRow.style.height = secondSummaryRow.style.height = '';
                    if ((firstHeight = firstSummaryRow.offsetHeight) > (secondHeight = secondSummaryRow.offsetHeight)) {
                        Ext.fly(secondSummaryRow).setHeight(firstHeight);
                    }
                    else if (secondHeight > firstHeight) {
                        Ext.fly(firstSummaryRow).setHeight(secondHeight);
                    }
                }
            },

            syncContent: function(destRow, sourceRow) {
                destRow = Ext.fly(destRow, 'syncDest');
                sourceRow = Ext.fly(sourceRow, 'sycSrc');
                var owner = this.owner,
                    destHd = destRow.down(owner.eventSelector, true),
                    sourceHd = sourceRow.down(owner.eventSelector, true),
                    destSummaryRow = destRow.down(owner.summaryRowSelector, true),
                    sourceSummaryRow = sourceRow.down(owner.summaryRowSelector, true);

                // Sync the content of header element.
                if (destHd && sourceHd) {
                    Ext.fly(destHd).syncContent(sourceHd);
                }

                // Sync the content of summary row element.
                if (destSummaryRow && sourceSummaryRow) {
                    Ext.fly(destSummaryRow).syncContent(sourceSummaryRow);
                }
            }
        }
    ],

    constructor: function() {
        this.groupCache = {};
        this.callParent(arguments);
    },

    init: function(grid) {
        var me = this,
            view = me.view;

        view.isGrouping = true;

        // The expensively maintained groupCache is shared between twinned Grouping features.
        if (me.lockingPartner && me.lockingPartner.groupCache) {
            me.groupCache = me.lockingPartner.groupCache;
        }

        me.mixins.summary.init.call(me);

        me.callParent(arguments);
        view.headerCt.on({
            columnhide: me.onColumnHideShow,
            columnshow: me.onColumnHideShow,
            columnmove: me.onColumnMove,
            scope: me
        });

        // Add a table level processor
        view.addTableTpl(me.tableTpl).groupingFeature = me;

        // Add a row level processor
        view.addRowTpl(Ext.XTemplate.getTpl(me, 'groupTpl')).groupingFeature = me;

        view.preserveScrollOnRefresh = true;

        // Sparse store - we can never collapse groups
        if (view.store.buffered) {
            me.collapsible = false;
        }
        // If it's a local store we can build a grouped store for use as the view's dataSource
        else {

            // Share the GroupStore between both sides of a locked grid
            if (this.lockingPartner && this.lockingPartner.dataSource) {
                me.dataSource = view.dataSource = this.lockingPartner.dataSource;
            } else {
                me.dataSource = view.dataSource = new Ext.grid.feature.GroupStore(me, view.store);
            }
        }

        me.grid.on({
            reconfigure: me.onReconfigure
        });
        view.on({
            afterrender: me.afterViewRender,
            scope: me,
            single: true
        });
    },

    clearGroupCache: function() {
        var me = this,
            groupCache = me.groupCache = {};

        if (me.lockingPartner) {
            me.lockingPartner.groupCache = groupCache;
        }
        return groupCache;
    },

    vetoEvent: function(record, row, rowIndex, e) {
        // Do not veto mouseover/mouseout
        if (e.type !== 'mouseover' && e.type !== 'mouseout'  && e.type !== 'mouseenter' && e.type !== 'mouseleave' && e.getTarget(this.eventSelector)) {
            return false;
        }
    },

    enable: function() {
        var me    = this,
            view  = me.view,
            store = view.store,
            groupToggleMenuItem;

        me.lastGroupField = me.getGroupField();

        view.isGrouping = true;
        if (me.lastGroupIndex) {
            me.block();
            store.group(me.lastGroupIndex);
            me.unblock();
        }
        me.callParent();
        groupToggleMenuItem = me.view.headerCt.getMenu().down('#groupToggleMenuItem');
        if (groupToggleMenuItem) {
            groupToggleMenuItem.setChecked(true, true);
        }
        me.refreshIf();
    },

    disable: function() {
        var me    = this,
            view  = me.view,
            store = view.store,
            groupToggleMenuItem,
            lastGroup;

        view.isGrouping = false;
        lastGroup = store.groupers.first();
        if (lastGroup) {
            me.lastGroupIndex = lastGroup.property;
            me.block();
            store.clearGrouping();
            me.unblock();
        }

        me.callParent();
        groupToggleMenuItem = me.view.headerCt.getMenu().down('#groupToggleMenuItem');
        if (groupToggleMenuItem) {
            groupToggleMenuItem.setChecked(false, true);
        }
        me.refreshIf();
    },

    refreshIf: function() {
        var ownerCt = this.grid.ownerCt,
            view = this.view;

        if (!view.store.remoteGroup && !this.blockRefresh) {

            // We are one side of a lockable grid, so refresh the locking view
            if (ownerCt && ownerCt.lockable) {
                ownerCt.view.refresh();
            } else {
                view.refresh();
            }
        }
    },

    // Attach events to view
    afterViewRender: function() {
        var me = this,
            view = me.view;

        view.on({
            scope: me,
            groupclick: me.onGroupClick
        });

        if (me.enableGroupingMenu) {
            me.injectGroupingMenu();
        }

        me.pruneGroupedHeader();

        me.lastGroupField = me.getGroupField();
        me.block();
        me.onGroupChange();
        me.unblock();
    },

    injectGroupingMenu: function() {
        var me       = this,
            headerCt = me.view.headerCt;

        headerCt.showMenuBy = me.showMenuBy;
        headerCt.getMenuItems = me.getMenuItems();
    },

    onColumnHideShow: function(headerOwnerCt, header) {
        var view = this.view,
            headerCt = view.headerCt,
            menu = headerCt.getMenu(),
            groupToggleMenuItem  = menu.down('#groupMenuItem'),
            colCount = headerCt.getGridColumns().length,
            items,
            len,
            i;

        // "Group by this field" must be disabled if there's only one column left visible.
        if (groupToggleMenuItem) {
            if (headerCt.getVisibleGridColumns().length > 1) {
                groupToggleMenuItem.enable();
            } else {
                groupToggleMenuItem.disable();
            }
        }

        // header containing TDs have to span all columns, hiddens are just zero width
        if (view.rendered) {
            items = view.el.query('.' + this.ctCls);
            for (i = 0, len = items.length; i < len; ++i) {
                items[i].colSpan = colCount;
            }
        }
    },

    // Update first and last records in groups when column moves
    // Because of the RowWrap template, this will update the groups' headers and footers
    onColumnMove: function() {
        var me = this,
            store = me.view.store,
            groups,
            i, len,
            groupInfo, firstRec, lastRec;

        if (store.isGrouped()) {
            groups = store.getGroups();
            len = groups.length;

            // Iterate through groups, firing updates on boundary records
            for (i = 0; i < len; i++) {
                groupInfo = groups[i];
                firstRec = groupInfo.children[0];
                lastRec = groupInfo.children[groupInfo.children.length - 1];

                // Must pass the modifiedFields parameter as null so that the
                // listener options does not take that place in the arguments list
                store.fireEvent('update', store, firstRec, 'edit', null);
                if (lastRec !== firstRec) {
                    store.fireEvent('update', store, lastRec, 'edit', null);
                }
            }
        }
    },

    showMenuBy: function(t, header) {
        var menu = this.getMenu(),
            groupMenuItem  = menu.down('#groupMenuItem'),
            groupMenuMeth = header.groupable === false || this.view.headerCt.getVisibleGridColumns().length < 2 ?  'disable' : 'enable',
            groupToggleMenuItem  = menu.down('#groupToggleMenuItem'),
            isGrouped = this.view.store.isGrouped();

        groupMenuItem[groupMenuMeth]();
        if (groupToggleMenuItem) {
            groupToggleMenuItem.setChecked(isGrouped, true);
            groupToggleMenuItem[isGrouped ?  'enable' : 'disable']();
        }
        Ext.grid.header.Container.prototype.showMenuBy.apply(this, arguments);
    },

    getMenuItems: function() {
        var me                 = this,
            groupByText        = me.groupByText,
            disabled           = me.disabled || !me.getGroupField(),
            showGroupsText     = me.showGroupsText,
            enableNoGroups     = me.enableNoGroups,
            getMenuItems       = me.view.headerCt.getMenuItems;

        // runs in the scope of headerCt
        return function() {

            // We cannot use the method from HeaderContainer's prototype here
            // because other plugins or features may already have injected an implementation
            var o = getMenuItems.call(this);
            o.push('-', {
                iconCls: Ext.baseCSSPrefix + 'group-by-icon',
                itemId: 'groupMenuItem',
                text: groupByText,
                handler: me.onGroupMenuItemClick,
                scope: me
            });
            if (enableNoGroups) {
                o.push({
                    itemId: 'groupToggleMenuItem',
                    text: showGroupsText,
                    checked: !disabled,
                    checkHandler: me.onGroupToggleMenuItemClick,
                    scope: me
                });
            }
            return o;
        };
    },

    /**
     * Group by the header the user has clicked on.
     * @private
     */
    onGroupMenuItemClick: function(menuItem, e) {
        var me = this,
            menu = menuItem.parentMenu,
            hdr  = menu.activeHeader,
            view = me.view,
            store = view.store;

        me.lastGroupIndex = null;
        me.block();
        me.enable();
        store.group(hdr.dataIndex);
        me.pruneGroupedHeader();
        me.unblock();
        me.refreshIf();
    },

    block: function(fromPartner) {
        this.blockRefresh = this.view.blockRefresh = true;
        if (this.lockingPartner && !fromPartner) {
            this.lockingPartner.block(true);
        }
    },

    unblock: function(fromPartner) {
        this.blockRefresh = this.view.blockRefresh = false;
        if (this.lockingPartner && !fromPartner) {
            this.lockingPartner.unblock(true);
        }
    },

    /**
     * Turn on and off grouping via the menu
     * @private
     */
    onGroupToggleMenuItemClick: function(menuItem, checked) {
        this[checked ? 'enable' : 'disable']();
    },

    /**
     * Prunes the grouped header from the header container
     * @private
     */
    pruneGroupedHeader: function() {
        var me = this,
            header = me.getGroupedHeader();

        if (me.hideGroupedHeader && header) {
            Ext.suspendLayouts();
            if (me.prunedHeader && me.prunedHeader !== header) {
                me.prunedHeader.show();
            }
            me.prunedHeader = header;
            header.hide();
            Ext.resumeLayouts(true);
        }
    },

    getHeaderNode: function(groupName) {
        return Ext.get(this.createGroupId(groupName));
    },

    getGroup: function(name) {
        var cache = this.groupCache,
            item = cache[name];

        if (!item) {
            item = cache[name] = {
                isCollapsed: false
            };
        }    
        return item;
    },

    /**
     * Returns `true` if the named group is expanded.
     * @param {String} groupName The group name as returned from {@link Ext.data.Store#getGroupString getGroupString}. This is usually the value of
     * the {@link Ext.data.Store#groupField groupField}.
     * @return {Boolean} `true` if the group defined by that value is expanded.
     */
    isExpanded: function(groupName) {
        return !this.getGroup(groupName).isCollapsed;
    },

    /**
     * Expand a group
     * @param {String} groupName The group name
     * @param {Boolean} focus Pass `true` to focus the group after expand.
     */
    expand: function(groupName, focus) {
        this.doCollapseExpand(false, groupName, focus);
    },

    /**
     * Expand all groups
     */
    expandAll: function() {
        var me = this,
            view = me.view,
            groupCache = me.groupCache,
            groupName,
            lockingPartner = me.lockingPartner,
            partnerView;

        // Clear all collapsed flags.
        // groupCache is shared between two lockingPartners
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
                groupCache[groupName].isCollapsed = false;
            }
        }
        Ext.suspendLayouts();
        view.suspendEvent('beforerefresh', 'refresh');
        if (lockingPartner) {
            partnerView = lockingPartner.view
            partnerView.suspendEvent('beforerefresh', 'refresh');
        }
        me.dataSource.onRefresh();
        view.resumeEvent('beforerefresh', 'refresh');
        if (lockingPartner) {
            partnerView.resumeEvent('beforerefresh', 'refresh');
        }
        Ext.resumeLayouts(true);

        // Fire event for all groups post expand
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
                me.afterCollapseExpand(false, groupName);
                if (lockingPartner) {
                    lockingPartner.afterCollapseExpand(false, groupName);
                }
            }
        }
    },

    /**
     * Collapse a group
     * @param {String} groupName The group name
     * @param {Boolean} focus Pass `true` to focus the group after expand.
     */
    collapse: function(groupName, focus) {
        this.doCollapseExpand(true, groupName, focus);
    },

    // private
    // Returns true if all groups are collapsed
    isAllCollapsed: function() {
        var me = this,
            groupCache = me.groupCache,
            groupName;

        // Clear all collapsed flags.
        // groupCache is shared between two lockingPartners
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
                if (!groupCache[groupName].isCollapsed) {
                    return false;
                }
            }
        }
        return true;
    },

    // private
    // Returns true if all groups are expanded
    isAllExpanded: function() {
        var me = this,
            groupCache = me.groupCache,
            groupName;

        // Clear all collapsed flags.
        // groupCache is shared between two lockingPartners
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
                if (groupCache[groupName].isCollapsed) {
                    return false;
                }
            }
        }
        return true;
    },

    /**
     * Collapse all groups
     */
    collapseAll: function() {
        var me = this,
            view = me.view,
            groupCache = me.groupCache,
            groupName,
            lockingPartner = me.lockingPartner,
            partnerView;

        // Set all collapsed flags
        // groupCache is shared between two lockingPartners
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
                groupCache[groupName].isCollapsed = true;
            }
        }
        Ext.suspendLayouts();
        view.suspendEvent('beforerefresh', 'refresh');
        if (lockingPartner) {
            partnerView = lockingPartner.view
            partnerView.suspendEvent('beforerefresh', 'refresh');
        }
        me.dataSource.onRefresh();
        view.resumeEvent('beforerefresh', 'refresh');
        if (lockingPartner) {
            partnerView.resumeEvent('beforerefresh', 'refresh');
        }

        if (lockingPartner && !lockingPartner.isAllCollapsed()) {
            lockingPartner.collapseAll();
        }
        Ext.resumeLayouts(true);

        // Fire event for all groups post collapse
        for (groupName in groupCache) {
            if (groupCache.hasOwnProperty(groupName)) {
                me.afterCollapseExpand(true, groupName);
                if (lockingPartner) {
                    lockingPartner.afterCollapseExpand(true, groupName);
                }
            }
        }

    },

    doCollapseExpand: function(collapsed, groupName, focus) {
        var me = this,
            lockingPartner = me.lockingPartner,
            group = me.groupCache[groupName];

        // groupCache is shared between two lockingPartners
        if (group.isCollapsed != collapsed) {

            // The GroupStore is shared by partnered Grouping features, so this will refresh both sides.
            // We only want one layout as a result though, so suspend layouts while refreshing.
            Ext.suspendLayouts();
            if (collapsed) {
                me.dataSource.collapseGroup(group);
            } else {
                me.dataSource.expandGroup(group);
            }
            Ext.resumeLayouts(true);

            // Sync the group state and focus the row if requested.
            me.afterCollapseExpand(collapsed, groupName, focus);

            // Sync the lockingPartner's group state.
            // Do not pass on focus flag. If we were told to focus, we must focus, not the other side.
            if (lockingPartner) {
                lockingPartner.afterCollapseExpand(collapsed, groupName, false);
            }
        }
    },

    afterCollapseExpand: function(collapsed, groupName, focus) {
        var me = this,
            view = me.view,
            header;

        header = Ext.get(this.getHeaderNode(groupName));
        view.fireEvent(collapsed ? 'groupcollapse' : 'groupexpand', view, header, groupName);
        if (focus) {
            header.up(view.getItemSelector()).scrollIntoView(view.el, null, true);
        }
    },

    onGroupChange: function() {
        var me = this,
            field = me.getGroupField(),
            menuItem,
            visibleGridColumns,
            groupingByLastVisibleColumn;

        if (me.hideGroupedHeader) {
            if (me.lastGroupField) {
                menuItem = me.getMenuItem(me.lastGroupField);
                if (menuItem) {
                    menuItem.setChecked(true);
                }
            }
            if (field) {
                visibleGridColumns = me.view.headerCt.getVisibleGridColumns();

                // See if we are being asked to group by the sole remaining visible column.
                // If so, then do not hide that column.
                groupingByLastVisibleColumn = ((visibleGridColumns.length === 1) && (visibleGridColumns[0].dataIndex == field));
                menuItem = me.getMenuItem(field);
                if (menuItem && !groupingByLastVisibleColumn) {
                    menuItem.setChecked(false);
                }
            }
        }
        me.refreshIf();
        me.lastGroupField = field;
    },

    /**
     * Gets the related menu item for a dataIndex
     * @private
     * @return {Ext.grid.header.Container} The header
     */
    getMenuItem: function(dataIndex){
        var view = this.view,
            header = view.headerCt.down('gridcolumn[dataIndex=' + dataIndex + ']'),
            menu = view.headerCt.getMenu();

        return header ? menu.down('menuitem[headerId='+ header.id +']') : null;
    },

    onGroupKey: function(keyCode, event) {
        var me = this,
            groupName = me.getGroupName(event.target);

        if (groupName) {
            me.onGroupClick(me.view, event.target, groupName, event);
        }
    },

    /**
     * Toggle between expanded/collapsed state when clicking on
     * the group.
     * @private
     */
    onGroupClick: function(view, rowElement, groupName, e) {
        var me = this,
            groupCache = me.groupCache,
            groupIsCollapsed = !me.isExpanded(groupName),
            g;

        if (me.collapsible) {

            // CTRL means collapse all others
            if (e.ctrlKey) {
                Ext.suspendLayouts();
                for (g in groupCache) {
                    if (g === groupName) {
                        if (groupIsCollapsed) {
                            me.expand(groupName);
                        }
                    } else {
                        me.doCollapseExpand(true, g, false);
                    }
                }
                Ext.resumeLayouts(true);
                return;
            }

            if (groupIsCollapsed) {
               me.expand(groupName);
            } else {
                me.collapse(groupName);
            }
        }
    },

    setupRowData: function(record, idx, rowValues) {
        var me = this,
            data = me.refreshData,
            groupInfo = me.groupInfo,
            header = data.header,
            groupField = data.groupField,
            store = me.view.dataSource,
            grouper, groupName, prev, next;

        rowValues.isCollapsedGroup = false;
        rowValues.summaryRecord = null;

        if (data.doGrouping) {
            grouper = me.view.store.groupers.first();

            // This is a placeholder record which represents a whole collapsed group
            // It is a special case.
            if (record.children) {
                groupName = grouper.getGroupString(record.children[0]);

                rowValues.isFirstRow = rowValues.isLastRow = true;
                rowValues.itemClasses.push(me.hdCollapsedCls);
                rowValues.isCollapsedGroup = true;
                rowValues.groupInfo = groupInfo;
                groupInfo.groupField = groupField;
                groupInfo.name = groupName;
                groupInfo.groupValue = record.children[0].get(groupField);
                groupInfo.columnName = header ? header.text : groupField;
                rowValues.collapsibleCls = me.collapsible ? me.collapsibleCls : me.hdNotCollapsibleCls;
                rowValues.groupId = me.createGroupId(groupName);
                groupInfo.rows = groupInfo.children = record.children;
                if (me.showSummaryRow) {
                    rowValues.summaryRecord = data.summaryData[groupName];
                }
                return;
            }

            groupName = grouper.getGroupString(record);

            // See if the current record is the last in the group
            rowValues.isFirstRow = idx === 0;
            if (!rowValues.isFirstRow) {
                prev = store.getAt(idx - 1);
                // If the previous row is of a different group, then we're at the first for a new group
                if (prev) {
                    // Must use Model's comparison because Date objects are never equal
                    rowValues.isFirstRow = !prev.isEqual(grouper.getGroupString(prev), groupName);
                }
            }

            // See if the current record is the last in the group
            rowValues.isLastRow = idx == store.getTotalCount() - 1;
            if (!rowValues.isLastRow) {
                next = store.getAt(idx + 1);
                if (next) {
                    // Must use Model's comparison because Date objects are never equal
                    rowValues.isLastRow = !next.isEqual(grouper.getGroupString(next), groupName);
                }
            }

            if (rowValues.isFirstRow) {
                groupInfo.groupField = groupField;
                groupInfo.name = groupName;
                groupInfo.groupValue = record.get(groupField);
                groupInfo.columnName = header ? header.text : groupField;
                rowValues.collapsibleCls = me.collapsible ? me.collapsibleCls : me.hdNotCollapsibleCls;
                rowValues.groupId = me.createGroupId(groupName);

                if (!me.isExpanded(groupName)) {
                    rowValues.itemClasses.push(me.hdCollapsedCls);
                    rowValues.isCollapsedGroup = true;
                }

                // We only get passed a GroupStore if the store is not buffered
                if (store.buffered) {
                    groupInfo.rows = groupInfo.children = [];
                } else {
                    groupInfo.rows = groupInfo.children = me.getRecordGroup(record).children;
                }
                rowValues.groupInfo = groupInfo;
            }

            if (rowValues.isLastRow) {
                // Add the group's summary record to the last record in the group
                if (me.showSummaryRow) {
                    rowValues.summaryRecord = data.summaryData[groupName];
                }
            }
        }
    },

    setup: function(rows, rowValues) {
        var me = this,
            data = me.refreshData,
            isGrouping = !me.disabled && me.view.store.isGrouped();
            
        me.skippedRows = 0;
        if (rowValues.view.bufferedRenderer) {
            rowValues.view.bufferedRenderer.variableRowHeight = true;
        }
        data.groupField = me.getGroupField();
        data.header = me.getGroupedHeader(data.groupField);
        data.doGrouping = isGrouping;
        rowValues.groupHeaderTpl = Ext.XTemplate.getTpl(me, 'groupHeaderTpl');

        if (isGrouping && me.showSummaryRow) {
            data.summaryData = me.generateSummaryData();
        }
    },

    cleanup: function(rows, rowValues) {
        var data = this.refreshData;

        rowValues.groupInfo = rowValues.groupHeaderTpl = rowValues.isFirstRow = null;
        data.groupField = data.header = null;
    },

    getGroupName: function(element) {
        var me = this,
            view = me.view,
            eventSelector = me.eventSelector,
            parts,
            targetEl,
            row;

        // See if element is, or is within a group header. If so, we can extract its name
        targetEl = Ext.fly(element).findParent(eventSelector);

        if (!targetEl) {
            // Otherwise, navigate up to the row and look down to see if we can find it    
            row = Ext.fly(element).findParent(view.itemSelector);
            if (row) {
                targetEl = row.down(eventSelector, true);
            }
        }

        if (targetEl) {
            parts = targetEl.id.split(view.id + '-hd-');
            if (parts.length === 2) {
                return Ext.htmlDecode(parts[1]);
            }
        }
    },

    /**
     * Returns the group data object for the group to which the passed record belongs **if the Store is grouped**.
     *
     * @param {Ext.data.Model} record The record for which to return group information.
     * @return {Object} A single group data block as returned from {@link Ext.data.Store#getGroups Store.getGroups}. Returns
     * `undefined` if the Store is not grouped.
     *
     */
    getRecordGroup: function(record) {
        var grouper = this.view.store.groupers.first();
        if (grouper) {
            return this.groupCache[grouper.getGroupString(record)];
        }
    },

    createGroupId: function(group) {
        return this.view.id + '-hd-' + Ext.htmlEncode(group);
    },

    createGroupCls: function(group) {
        return this.view.id + '-' + Ext.htmlEncode(group) + '-item';    
    },

    getGroupField: function(){
        return this.view.store.getGroupField();
    },

    getGroupedHeader: function(groupField) {
        var me = this,
            headerCt = me.view.headerCt,
            partner = me.lockingPartner,
            selector, header;

        groupField = groupField || this.getGroupField();

        if (groupField) {
            selector = '[dataIndex=' + groupField + ']';
            header = headerCt.down(selector);
            // The header may exist in the locking partner, so check there as well
            if (!header && partner) {
                header = partner.view.headerCt.down(selector);
            }
        }
        return header || null;
    },

    getFireEventArgs: function(type, view, targetEl, e) {
        return [type, view, targetEl, this.getGroupName(targetEl), e];
    },

    destroy: function(){
        var me = this,
            dataSource = me.dataSource;

        me.view = me.prunedHeader = me.grid = me.groupCache = me.dataSource = null;
        me.callParent();
        if (dataSource) {
            dataSource.bindStore(null);
        }
    },

    onReconfigure: function(grid, store, columns, oldStore, oldColumns) {
        var me = grid;

        if (store && store !== oldStore) {
            // Grouping involves injecting a dataSource in early
            if (store.buffered !== oldStore.buffered) {
                Ext.Error.raise('Cannot reconfigure grouping switching between buffered and non-buffered stores');
            }
            if (store.buffered) {
                me.bindStore(store);
                me.dataSource.processStore(store);
            }
        }
    }
});