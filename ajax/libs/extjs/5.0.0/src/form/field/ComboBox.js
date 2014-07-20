/**
 * A combobox control with support for autocomplete, remote loading, and many other features.
 *
 * A ComboBox is like a combination of a traditional HTML text `<input>` field and a `<select>`
 * field; the user is able to type freely into the field, and/or pick values from a dropdown selection
 * list. The user can input any value by default, even if it does not appear in the selection list;
 * to prevent free-form values and restrict them to items in the list, set {@link #forceSelection} to `true`.
 *
 * The selection list's options are populated from any {@link Ext.data.Store}, including remote
 * stores. The data items in the store are mapped to each option's displayed text and backing value via
 * the {@link #valueField} and {@link #displayField} configurations, respectively.
 *
 * If your store is not remote, i.e. it depends only on local data and is loaded up front, you should be
 * sure to set the {@link #queryMode} to `'local'`, as this will improve responsiveness for the user.
 *
 * # Example usage:
 *
 *     @example
 *     // The data store containing the list of states
 *     var states = Ext.create('Ext.data.Store', {
 *         fields: ['abbr', 'name'],
 *         data : [
 *             {"abbr":"AL", "name":"Alabama"},
 *             {"abbr":"AK", "name":"Alaska"},
 *             {"abbr":"AZ", "name":"Arizona"}
 *             //...
 *         ]
 *     });
 *
 *     // Create the combo box, attached to the states data store
 *     Ext.create('Ext.form.ComboBox', {
 *         fieldLabel: 'Choose State',
 *         store: states,
 *         queryMode: 'local',
 *         displayField: 'name',
 *         valueField: 'abbr',
 *         renderTo: Ext.getBody()
 *     });
 *
 * # Events
 *
 * To do something when something in ComboBox is selected, configure the select event:
 *
 *     var cb = Ext.create('Ext.form.ComboBox', {
 *         // all of your config options
 *         listeners:{
 *              scope: yourScope,
 *              'select': yourFunction
 *         }
 *     });
 *
 *     // Alternatively, you can assign events after the object is created:
 *     var cb = new Ext.form.field.ComboBox(yourOptions);
 *     cb.on('select', yourFunction, yourScope);
 *
 * # Multiple Selection
 *
 * ComboBox also allows selection of multiple items from the list; to enable multi-selection set the
 * {@link #multiSelect} config to `true`.
 *
 * # Filtered Stores
 *
 * If you have a local store that is already filtered, you can use the {@link #lastQuery} config option
 * to prevent the store from having the filter being cleared on first expand.
 *
 * ## Customized combobox
 *
 * Both the text shown in dropdown menu and text field can be easily customized:
 *
 *     @example
 *     var states = Ext.create('Ext.data.Store', {
 *         fields: ['abbr', 'name'],
 *         data : [
 *             {"abbr":"AL", "name":"Alabama"},
 *             {"abbr":"AK", "name":"Alaska"},
 *             {"abbr":"AZ", "name":"Arizona"}
 *         ]
 *     });
 *
 *     Ext.create('Ext.form.ComboBox', {
 *         fieldLabel: 'Choose State',
 *         store: states,
 *         queryMode: 'local',
 *         valueField: 'abbr',
 *         renderTo: Ext.getBody(),
 *         // Template for the dropdown menu.
 *         // Note the use of "x-boundlist-item" class,
 *         // this is required to make the items selectable.
 *         tpl: Ext.create('Ext.XTemplate',
 *             '<tpl for=".">',
 *                 '<div class="x-boundlist-item">{abbr} - {name}</div>',
 *             '</tpl>'
 *         ),
 *         // template for the content inside text field
 *         displayTpl: Ext.create('Ext.XTemplate',
 *             '<tpl for=".">',
 *                 '{abbr} - {name}',
 *             '</tpl>'
 *         )
 *     });
 *
 * See also the {@link #listConfig} option for additional configuration of the dropdown.
 *
 */
Ext.define('Ext.form.field.ComboBox', {
    extend:'Ext.form.field.Picker',
    requires: [
        'Ext.util.DelayedTask',
        'Ext.view.BoundList',
        'Ext.view.BoundListKeyNav',
        'Ext.data.StoreManager'
    ],
    alternateClassName: 'Ext.form.ComboBox',
    alias: ['widget.combobox', 'widget.combo'],
    mixins: [
        'Ext.util.StoreHolder'
    ],

    config: {
        filters: null
    },

    /**
     * @cfg {String/String[]/Ext.XTemplate} displayTpl
     * The template to be used to display selected records inside the text field. An array of the selected records' data
     * will be passed to the template. Defaults to:
     *
     *     '<tpl for=".">' +
     *         '{[typeof values === "string" ? values : values["' + me.displayField + '"]]}' +
     *         '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' +
     *     '</tpl>'
     */

    /**
     * @cfg {String} [triggerCls='x-form-arrow-trigger']
     * An additional CSS class used to style the trigger button. The trigger will always get the {@link Ext.form.trigger.Trigger#baseCls}
     * by default and `triggerCls` will be **appended** if specified.
     */
    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',

    /**
     * @cfg {String} [hiddenName=""]
     * The name of an underlying hidden field which will be synchronized with the underlying value of the combo.
     * This option is useful if the combo is part of a form element doing a regular form post. The hidden field
     * will not be created unless a hiddenName is specified.
     */
    hiddenName: '',

    /**
     * @property {Ext.dom.Element} hiddenDataEl
     * @private
     */

    /**
     * @private
     * @cfg {String}
     * CSS class used to find the {@link #hiddenDataEl}
     */
    hiddenDataCls: Ext.baseCSSPrefix + 'hidden-display ' + Ext.baseCSSPrefix + 'form-data-hidden',
    
    ariaRole: 'combobox',

    /**
     * @property {Boolean} filtered
     * True if there are extra `filters` appllied to this component.
     * @private
     * @readonly
     * @since 5.0.0
     */
    filtered: false,

    afterRender: function(){
        var me = this;
        me.callParent(arguments);
        me.setHiddenValue(me.value);
    },

    /**
     * @cfg {Ext.data.Store/String/Array} store
     * The data source to which this combo is bound. Acceptable values for this property are:
     *
     *   - **any {@link Ext.data.Store Store} subclass**
     *   - **an {@link Ext.data.Store#storeId ID of a store}**
     *   - **an Array** : Arrays will be converted to a {@link Ext.data.Store} internally, automatically generating
     *     {@link Ext.data.Field#name field names} to work with all data components.
     *
     *     - **1-dimensional array** : (e.g., `['Foo','Bar']`)
     *
     *       A 1-dimensional array will automatically be expanded (each array item will be used for both the combo
     *       {@link #valueField} and {@link #displayField})
     *
     *     - **2-dimensional array** : (e.g., `[['f','Foo'],['b','Bar']]`)
     *
     *       For a multi-dimensional array, the value in index 0 of each item will be assumed to be the combo
     *       {@link #valueField}, while the value at index 1 is assumed to be the combo {@link #displayField}.
     *
     * See also {@link #queryMode}.
     */

    /**
     * @cfg {Boolean} multiSelect
     * If set to `true`, allows the combo field to hold more than one value at a time, and allows selecting multiple
     * items from the dropdown list. The combo's text field will show all selected values separated by the
     * {@link #delimiter}.
     */
    multiSelect: false,

    //<locale>
    /**
     * @cfg {String} delimiter
     * The character(s) used to separate the {@link #displayField display values} of multiple selected items when
     * `{@link #multiSelect} = true`.
     */
    delimiter: ', ',
    //</locale>

    /**
     * @cfg {String} displayField
     * The underlying {@link Ext.data.Field#name data field name} to bind to this ComboBox.
     *
     * See also `{@link #valueField}`.
     */
    displayField: 'text',

    /**
     * @cfg {String} valueField (required)
     * The underlying {@link Ext.data.Field#name data value name} to bind to this ComboBox.
     *
     * **Note**: use of a `valueField` requires the user to make a selection in order for a value to be mapped. See also
     * `{@link #displayField}`.
     *
     * Defaults to match the value of the {@link #displayField} config.
     */

    /**
     * @cfg {String} triggerAction
     * The action to execute when the trigger is clicked.
     *
     *   - **`'all'`** :
     *
     *     {@link #doQuery run the query} specified by the `{@link #allQuery}` config option
     *
     *   - **`'last'`** :
     *
     *     {@link #doQuery run the query} using the `{@link #lastQuery last query value}`.
     *
     *   - **`'query'`** :
     *
     *     {@link #doQuery run the query} using the {@link Ext.form.field.Base#getRawValue raw value}.
     *
     * See also `{@link #queryParam}`.
     */
    triggerAction: 'all',

    /**
     * @cfg {String} allQuery
     * The text query to send to the server to return all records for the list with no filtering
     */
    allQuery: '',

    /**
     * @cfg {String} queryParam
     * Name of the parameter used by the Store to pass the typed string when the ComboBox is configured with
     * `{@link #queryMode}: 'remote'`. If explicitly set to a falsy value it will not be sent.
     */
    queryParam: 'query',

    /**
     * @cfg {String} queryMode
     * The mode in which the ComboBox uses the configured Store. Acceptable values are:
     *
     *   - **`'remote'`** :
     *
     *     In `queryMode: 'remote'`, the ComboBox loads its Store dynamically based upon user interaction.
     *
     *     This is typically used for "autocomplete" type inputs, and after the user finishes typing, the Store is {@link
     *     Ext.data.Store#method-load load}ed.
     *
     *     A parameter containing the typed string is sent in the load request. The default parameter name for the input
     *     string is `query`, but this can be configured using the {@link #queryParam} config.
     *
     *     In `queryMode: 'remote'`, the Store may be configured with `{@link Ext.data.Store#remoteFilter remoteFilter}:
     *     true`, and further filters may be _programatically_ added to the Store which are then passed with every load
     *     request which allows the server to further refine the returned dataset.
     *
     *     Typically, in an autocomplete situation, {@link #hideTrigger} is configured `true` because it has no meaning for
     *     autocomplete.
     *
     *   - **`'local'`** :
     *
     *     ComboBox loads local data
     *
     *         var combo = new Ext.form.field.ComboBox({
     *             renderTo: document.body,
     *             queryMode: 'local',
     *             store: new Ext.data.ArrayStore({
     *                 id: 0,
     *                 fields: [
     *                     'myId',  // numeric value is the key
     *                     'displayText'
     *                 ],
     *                 data: [[1, 'item1'], [2, 'item2']]  // data is local
     *             }),
     *             valueField: 'myId',
     *             displayField: 'displayText',
     *             triggerAction: 'all'
     *         });
     */
    queryMode: 'remote',

    /**
     * @cfg {Boolean} [queryCaching=true]
     * When true, this prevents the combo from re-querying (either locally or remotely) when the current query
     * is the same as the previous query.
     */
    queryCaching: true,
    
    /**
     * @cfg {Boolean} autoLoadOnValue
     * This option controls whether to *initially* load the store when a value is set so that
     * the display value can be determined from the appropriate record.
     * The store will only be loaded in a limited set of circumstances:
     * - The store is not currently loading.
     * - The store does not have a pending {@link Ext.data.Store#autoLoad}.
     * - The store has not been loaded before.
     */
    autoLoadOnValue: false,

    /**
     * @cfg {Number} pageSize
     * If greater than `0`, a {@link Ext.toolbar.Paging} is displayed in the footer of the dropdown list and the
     * {@link #doQuery filter queries} will execute with page start and {@link Ext.view.BoundList#pageSize limit}
     * parameters. Only applies when `{@link #queryMode} = 'remote'`.
     */
    pageSize: 0,

    /**
     * @cfg {Number} queryDelay
     * The length of time in milliseconds to delay between the start of typing and sending the query to filter the
     * dropdown list.
     *
     * Defaults to `500` if `{@link #queryMode} = 'remote'` or `10` if `{@link #queryMode} = 'local'`
     */

    /**
     * @cfg {Number} minChars
     * The minimum number of characters the user must type before autocomplete and {@link #typeAhead} activate.
     *
     * Defaults to `4` if `{@link #queryMode} = 'remote'` or `0` if `{@link #queryMode} = 'local'`,
     * does not apply if `{@link Ext.form.field.Trigger#editable editable} = false`.
     */

    /**
     * @cfg {Boolean} [anyMatch=false]
     * Configure as `true` to allow matching of the typed characters at any position in the {@link #valueField}'s value.
     */
    anyMatch: false,

    /**
     * @cfg {Boolean} [caseSensitive=false]
     * Configure as `true` to make the filtering match with exact case matching
     */
    caseSensitive: false,

    /**
     * @cfg {Boolean} autoSelect
     * `true` to automatically highlight the first result gathered by the data store in the dropdown list when it is
     * opened. A false value would cause nothing in the list to be highlighted automatically, so
     * the user would have to manually highlight an item before pressing the enter or {@link #selectOnTab tab} key to
     * select it (unless the value of ({@link #typeAhead}) were true), or use the mouse to select a value.
     */
    autoSelect: true,

    /**
     * @cfg {Boolean} typeAhead
     * `true` to populate and autoselect the remainder of the text being typed after a configurable delay
     * ({@link #typeAheadDelay}) if it matches a known value.
     */
    typeAhead: false,

    /**
     * @cfg {Number} typeAheadDelay
     * The length of time in milliseconds to wait until the typeahead text is displayed if `{@link #typeAhead} = true`
     */
    typeAheadDelay: 250,

    /**
     * @cfg {Boolean} selectOnTab
     * Whether the Tab key should select the currently highlighted item.
     */
    selectOnTab: true,

    /**
     * @cfg {Boolean} forceSelection
     * `true` to restrict the selected value to one of the values in the list, `false` to allow the user to set
     * arbitrary text into the field.
     */
    forceSelection: false,

    /**
     * @cfg {Boolean} growToLongestValue
     * `false` to not allow the component to resize itself when its data changes
     * (and its {@link #grow} property is `true`)
     */
    growToLongestValue: true,

    /**
     * @cfg {Boolean} clearFilterOnBlur
     * *When {@link #queryMode} is `'local'` only*
     * 
     * As text is entered, the underlying store is filtered to match the value. When this option is `true`,
     * any filtering applied by this field will be cleared when focus is removed & reinstated on focus. 
     * If `false`, the filters will be left in place.
     */
    clearFilterOnBlur: true,
    
    /**
     * @cfg {Boolean} enableRegEx
     * *When {@link #queryMode} is `'local'` only*
     *
     * Set to `true` to have the ComboBox use the typed value as a RegExp source to filter the store to get possible matches.
     */

    /**
     * @cfg {String} valueNotFoundText
     * When using a name/value combo, if the value passed to setValue is not found in the store, valueNotFoundText will
     * be displayed as the field text if defined. If this default text is used, it means there
     * is no value set and no validation will occur on this field.
     */

    /**
     * @property {String} lastQuery
     * The value of the match string used to filter the store. Delete this property to force a requery. Example use:
     *
     *     var combo = new Ext.form.field.ComboBox({
     *         ...
     *         queryMode: 'remote',
     *         listeners: {
     *             // delete the previous query in the beforequery event or set
     *             // combo.lastQuery = null (this will reload the store the next time it expands)
     *             beforequery: function(qe){
     *                 delete qe.combo.lastQuery;
     *             }
     *         }
     *     });
     *
     * To make sure the filter in the store is not cleared the first time the ComboBox trigger is used configure the
     * combo with `lastQuery=''`. Example use:
     *
     *     var combo = new Ext.form.field.ComboBox({
     *         ...
     *         queryMode: 'local',
     *         triggerAction: 'all',
     *         lastQuery: ''
     *     });
     */

    /**
     * @cfg {Object} defaultListConfig
     * Set of options that will be used as defaults for the user-configured {@link #listConfig} object.
     */
    defaultListConfig: {
        loadingHeight: 70,
        minWidth: 70,
        maxHeight: 300,
        shadow: 'sides'
    },

    /**
     * @cfg {String/HTMLElement/Ext.dom.Element} transform
     * The id, DOM node or {@link Ext.dom.Element} of an existing HTML `<select>` element to convert into a ComboBox. The
     * target select's options will be used to build the options in the ComboBox dropdown; a configured {@link #store}
     * will take precedence over this.
     */
    
    /**
     * @cfg {Boolean} transformInPlace
     * `true` to automatically render this combo box in place of the select element that is being 
     * {@link #transform transformed}. If `false`, this combo will be rendered using the normal rendering,
     * either as part of a layout, or using {@link #renderTo} or {@link #method-render}.
     */
    transformInPlace: true,

    /**
     * @cfg {Object} listConfig
     * An optional set of configuration properties that will be passed to the {@link Ext.view.BoundList}'s constructor.
     * Any configuration that is valid for BoundList can be included. Some of the more useful ones are:
     *
     *   - {@link Ext.view.BoundList#cls cls} - defaults to empty
     *   - {@link Ext.view.BoundList#emptyText emptyText} - defaults to empty string
     *   - {@link Ext.view.BoundList#itemSelector itemSelector} - defaults to the value defined in BoundList
     *   - {@link Ext.view.BoundList#loadingText loadingText} - defaults to `'Loading...'`
     *   - {@link Ext.view.BoundList#minWidth minWidth} - defaults to `70`
     *   - {@link Ext.view.BoundList#maxWidth maxWidth} - defaults to `undefined`
     *   - {@link Ext.view.BoundList#maxHeight maxHeight} - defaults to `300`
     *   - {@link Ext.view.BoundList#resizable resizable} - defaults to `false`
     *   - {@link Ext.view.BoundList#shadow shadow} - defaults to `'sides'`
     *   - {@link Ext.view.BoundList#width width} - defaults to `undefined` (automatically set to the width of the ComboBox
     *     field if {@link #matchFieldWidth} is true)
     *     {@link Ext.view.BoundList#getInnerTpl getInnerTpl} A function which returns a template string which renders
     *     the ComboBox's {@link #displayField} value in the dropdown. This defaults to just outputting the raw value,
     *     but may use any {@link Ext.XTemplate XTemplate} methods to produce output.
     *
     *     The running template is configured with some extra properties that provide some context:
     *         - field {@link Ext.form.field.ComboBox ComboBox} This combobox
     *         - store {@link Ext.data.Store Store} This combobox's data store
     */

    //private
    ignoreSelection: 0,

    //private, tells the layout to recalculate its startingWidth when a record is removed from its bound store
    removingRecords: null,

    //private helper
    resizeComboToGrow: function () {
        var me = this;
        return me.grow && me.growToLongestValue;
    },

    /**
     * @event beforequery
     * Fires before all queries are processed. Return false to cancel the query or set the queryPlan's cancel
     * property to true.
     *
     * @param {Object} queryPlan An object containing details about the query to be executed.
     * @param {Ext.form.field.ComboBox} queryPlan.combo A reference to this ComboBox.
     * @param {String} queryPlan.query The query value to be used to match against the ComboBox's {@link #valueField}.
     * @param {Boolean} queryPlan.forceAll If `true`, causes the query to be executed even if the minChars threshold is not met.
     * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon return, causes the query not to be executed.
     * @param {Boolean} queryPlan.rawQuery If `true` indicates that the raw input field value is being used, and upon store load,
     */

    /**
     * @event select
     * Fires when at least one list item is selected.
     * @param {Ext.form.field.ComboBox} combo This combo box
     * @param {Ext.data.Model/Ext.data.Model[]} records The selected record or array of records
     */

    /**
     * @event beforeselect
     * Fires before the selected item is added to the collection
     * @param {Ext.form.field.ComboBox} combo This combo box
     * @param {Ext.data.Record} record The selected record
     * @param {Number} index The index of the selected record
     */

    /**
     * @event beforedeselect
     * Fires before the deselected item is removed from the collection
     * @param {Ext.form.field.ComboBox} combo This combo box
     * @param {Ext.data.Record} record The deselected record
     * @param {Number} index The index of the deselected record
     */

    initComponent: function() {
        var me = this,
            isDefined = Ext.isDefined,
            store = me.store,
            transform = me.transform,
            displayTpl = me.displayTpl,
            transformSelect, isLocalMode;

        Ext.applyIf(me.renderSelectors, {
            hiddenDataEl: '.' + me.hiddenDataCls.split(' ').join('.')
        });

        //<debug>
        if (me.typeAhead && me.multiSelect) {
            Ext.Error.raise('typeAhead and multiSelect are mutually exclusive options -- please remove one of them.');
        }
        if (me.typeAhead && !me.editable) {
            Ext.Error.raise('If typeAhead is enabled the combo must be editable: true -- please change one of those settings.');
        }
        if (me.selectOnFocus && !me.editable) {
            Ext.Error.raise('If selectOnFocus is enabled the combo must be editable: true -- please change one of those settings.');
        }
        //</debug>

        // Build store from 'transform' HTML select element's options
        if (transform) {
            transformSelect = Ext.getDom(transform);
            if (transformSelect) {
                if (!me.store) {
                    store = Ext.Array.map(Ext.Array.from(transformSelect.options), function(option){
                        return [option.value, option.text];
                    });
                }
                if (!me.name) {
                    me.name = transformSelect.name;
                }
                if (!('value' in me)) {
                    me.value = transformSelect.value;
                }
            }
        }

        me.bindStore(store || 'ext-empty-store', true, true);
        store = me.store;
        if (store.autoCreated) {
            me.queryMode = 'local';
            me.valueField = me.displayField = 'field1';
            if (!store.expanded) {
                me.displayField = 'field2';
            }
        }

        if (!isDefined(me.valueField)) {
            me.valueField = me.displayField;
        }

        isLocalMode = me.queryMode === 'local';
        if (!isDefined(me.queryDelay)) {
            me.queryDelay = isLocalMode ? 10 : 500;
        }
        if (!isDefined(me.minChars)) {
            me.minChars = isLocalMode ? 0 : 4;
        }

        if (!displayTpl) {
            me.displayTpl = new Ext.XTemplate(
                '<tpl for=".">' +
                    '{[typeof values === "string" ? values : values["' + me.displayField + '"]]}' +
                    '<tpl if="xindex < xcount">' + me.delimiter + '</tpl>' +
                '</tpl>'
            );
        } else if (!displayTpl.isTemplate) {
            me.displayTpl = new Ext.XTemplate(displayTpl);
        }

        me.callParent();

        me.doQueryTask = new Ext.util.DelayedTask(me.doRawQuery, me);

        // store has already been loaded, setValue
        if (me.store.getCount() > 0) {
            me.setValue(me.value);
        }

        // render in place of 'transform' select
        if (transformSelect) {
            if (me.transformInPlace) {
                me.render(transformSelect.parentNode, transformSelect);
                delete me.renderTo;
            }
            Ext.removeNode(transformSelect);
        }
    },

    getSubTplMarkup: function() {
        var me = this,
            hiddenDataElMarkup =
                '<div class="' + me.hiddenDataCls + '" role="presentation"></div>',
            markup = me.callParent();

        return hiddenDataElMarkup + markup;
    },

    applyFilters: function (filters, collection) {
        var me = this;
        if (filters === null || filters.isFilterCollection) {
            return filters;
        }

        if (filters) {
            if (!collection) {
                collection = this.getFilters();
            }

            collection.beginUpdate();
            collection.splice(0, collection.length, filters);
            collection.each(function (filter) {
                filter.ownerId = me.id;
            });
            collection.endUpdate();
        }

        return collection;
    },

    /**
     * Returns the `Ext.util.FilterCollection`. Unless `autoCreate` is explicitly passed
     * as `false` this collection will be automatically created if it does not yet exist.
     * @param [autoCreate=true] Pass `false` to disable auto-creation of the collection.
     * @return {Ext.util.FilterCollection} The collection of filters.
     */
    getFilters: function (autoCreate) {
        var ret = this.filters;

        if (!ret && autoCreate !== false) {
            ret = new Ext.util.FilterCollection();
            this.setFilters(ret);
        }

        return ret;
    },

    updateFilters: function (newFilters, oldFilters) {
        var me = this;

        if (oldFilters) {
            oldFilters.un('endupdate', 'onEndUpdateFilters', me);
        }

        if (newFilters) {
            newFilters.on('endupdate', 'onEndUpdateFilters', me);
        }

        me.onEndUpdateFilters(newFilters);
    },

    onEndUpdateFilters: function (filters) {
        var me = this,
            was = me.filtered,
            is = !!filters && (filters.length > 0), // booleanize filters
            old, storeFilters;

        if (was || is) {
            me.filtered = is;
            old = [];
            storeFilters = me.store.getFilters();

            storeFilters.each(function (filter) {
                if (filter.ownerId === me.id && !filters.contains(filter)) {
                    old.push(filter);
                }
            });

            storeFilters.splice(0, old, filters.items);
        }
    },

    /**
     * Returns the store associated with this ComboBox.
     * @return {Ext.data.Store} The store
     */
    getStore : function(){
        return this.store;
    },

    beforeBlur: function() {
        var me = this,
            filter = me.queryFilter;
            
        me.doQueryTask.cancel();
        me.assertValue();
        
        if (filter && me.queryMode === 'local' && me.clearFilterOnBlur) {
            me.getStore().getFilters().remove(filter);
        }
    },
    
    onFocus: function() {
        var me = this;
        
        me.callParent(arguments);    
        if (!me.duringTriggerClick && me.triggerAction !== 'all' && me.queryFilter && me.queryMode === 'local' && me.clearFilterOnBlur) {
            delete me.lastQuery;
            me.doRawQuery();
        }
    },

    // private
    assertValue: function() {
        var me = this,
            value = me.getRawValue(),
            rec, currentValue;

        if (me.forceSelection) {
            if (me.multiSelect) {
                // For multiselect, check that the current displayed value matches the current
                // selection, if it does not then revert to the most recent selection.
                if (value !== me.getDisplayValue()) {
                    me.setValue(me.lastSelection);
                }
            } else {
                // For single-select, match the displayed value to a record and select it,
                // if it does not match a record then revert to the most recent selection.
                rec = me.findRecordByDisplay(value);
                if (rec) {
                    currentValue = me.value;
                    // Prevent an issue where we have duplicate display values with
                    // different underlying values.
                    if (!me.findRecordByValue(currentValue)) {
                        me.select(rec, true);
                    }
                } else {
                    me.setValue(me.lastSelection);
                }
            }
        }
        me.collapse();
    },

    onTypeAhead: function() {
        var me = this,
            displayField = me.displayField,
            record = me.store.findRecord(displayField, me.getRawValue()),
            boundList = me.getPicker(),
            newValue, len, selStart;

        if (record) {
            newValue = record.get(displayField);
            len = newValue.length;
            selStart = me.getRawValue().length;

            boundList.highlightItem(boundList.getNode(record));

            if (selStart !== 0 && selStart !== len) {
                me.setRawValue(newValue);
                me.selectText(selStart, newValue.length);
            }
        }
    },

    // invoked when a different store is bound to this combo
    // than the original
    resetToDefault: Ext.emptyFn,

    beforeReset: function() {
        var filter = this.queryFilter;
        
        this.callParent();

        if (filter) {
            this.getStore().getFilters().remove(filter);
        }
    },

    onUnbindStore: function() {
        var me = this,
            picker = me.picker,
            filter = me.queryFilter;

        // If we'd added a local filter, remove it
        if (filter && !me.store.isDestroyed) {
            me.getStore().getFilters().remove(filter);
        }
        if (picker) {
            picker.bindStore(null);
        }
    },

    onBindStore: function(store, initial) {
        var picker = this.picker;
            
        if (!initial) {
            this.resetToDefault();
        }

        if (picker) {
            picker.bindStore(store);
        }
    },
    
    /**
     * Binds a store to this instance.
     * @param {Ext.data.AbstractStore/String} [store] The store to bind or ID of the store.
     * When no store given (or when `null` or `undefined` passed), unbinds the existing store.
     * @param {Boolean} [preventFilter] `true` to prevent any active filter from being activated
     * on the newly bound store. This is only valid when used with {@link #queryMode} `'local'`.
     */
    bindStore: function(store, preventFilter, /* private */ initial) {
        var me = this,
            filter = me.queryFilter;
            
        me.mixins.storeholder.bindStore.call(me, store, initial);
        store = me.getStore();
        if (store && filter && !preventFilter) {
            store.getFilters().add(filter);
        }
        if (!initial && store) {
            me.setValueOnData();
        }
    },

    getStoreListeners: function() {
        var me = this;

        return {
            beforeload: me.onBeforeLoad,
            clear: me.onClear,
            datachanged: me.onDataChanged,
            load: me.onLoad,
            exception: me.onException,
            remove: me.onRemove
        };
    },

    onBeforeLoad: function(){
        // If we're remote loading, the load mask will show which will trigger a deslectAll.
        // This selection change will trigger the collapse in onListSelectionChange. As such
        // we'll veto it for now and restore selection listeners when we've loaded.
        ++this.ignoreSelection;
    },

    onDataChanged: function() {
        var me = this;

        if (me.resizeComboToGrow()) {
            me.updateLayout();
        }
    },

    onClear: function() {
        var me = this;

        if (me.resizeComboToGrow()) {
            me.removingRecords = true;
            me.onDataChanged();
        }
    },

    onRemove: function() {
        var me = this;

        if (me.resizeComboToGrow()) {
            me.removingRecords = true;
        }
    },

    onException: function(){
        if (this.ignoreSelection > 0) {
            --this.ignoreSelection;
        }
        this.collapse();
    },

    onLoad: function(store, records, success) {
        if (this.ignoreSelection > 0) {
            --this.ignoreSelection;
        }

        // If not querying using the raw field value, we can set the value now we have data
        if (success && !store.lastOptions.rawQuery) {
            this.setValueOnData();
        }
    },
    
    setValueOnData: function() {
        var me = this;

        // There's no value.
        if (me.value == null) {
            // Highlight the first item in the list if autoSelect: true
            if (me.getStore().getCount()) {
                me.doAutoSelect();
            } else {
                // assign whatever empty value we have to prevent change from firing
                me.setValue(me.value);
            }
        } else {
            me.setValue(me.value);
        }
    },

    /**
     * @private
     * Execute the query with the raw contents within the textfield.
     */
    doRawQuery: function() {
        this.doQuery(this.getRawValue(), false, true);
    },

    /**
     * Executes a query to filter the dropdown list. Fires the {@link #beforequery} event prior to performing the query
     * allowing the query action to be canceled if needed.
     *
     * @param {String} queryString The string to use to filter available items by matching against the configured {@link #valueField}.
     * @param {Boolean} [forceAll=false] `true` to force the query to execute even if there are currently fewer characters in
     * the field than the minimum specified by the `{@link #minChars}` config option. It also clears any filter
     * previously saved in the current store.
     * @param {Boolean} [rawQuery=false] Pass as true if the raw typed value is being used as the query string. This causes the
     * resulting store load to leave the raw value undisturbed.
     * @return {Boolean} true if the query was permitted to run, false if it was cancelled by a {@link #beforequery}
     * handler.
     */
    doQuery: function(queryString, forceAll, rawQuery) {
        var me = this,

            // Decide if, and how we are going to query the store
            queryPlan = me.beforeQuery({
                query: queryString || '',
                rawQuery: rawQuery,
                forceAll: forceAll,
                combo: me,
                cancel: false
            });

        // Allow veto.
        if (queryPlan === false || queryPlan.cancel) {
            return false;
        }

        // If they're using the same value as last time, just show the dropdown
        if (me.queryCaching && queryPlan.query === me.lastQuery) {
            me.expand();
            if (me.queryMode === 'local') {
                me.doAutoSelect();
            }
        }

        // Otherwise filter or load the store
        else {
            me.lastQuery = queryPlan.query;

            if (me.queryMode === 'local') {
                me.doLocalQuery(queryPlan);

            } else {
                me.doRemoteQuery(queryPlan);
            }
        }

        return true;
    },

    /**
     * @template
     * A method which may modify aspects of how the store is to be filtered (if {@link #queryMode} is `"local"`)
     * of loaded (if {@link #queryMode} is `"remote"`).
     *
     * This is called by the {@link #doQuery method, and may be overridden in subclasses to modify
     * the default behaviour.
     *
     * This method is passed an object containing information about the upcoming query operation which it may modify
     * before returning.
     *
     * @param {Object} queryPlan An object containing details about the query to be executed.
     * @param {String} queryPlan.query The query value to be used to match against the ComboBox's {@link #valueField}.
     * @param {Boolean} queryPlan.forceAll If `true`, causes the query to be executed even if the minChars threshold is not met.
     * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon return, causes the query not to be executed.
     * @param {Boolean} queryPlan.rawQuery If `true` indicates that the raw input field value is being used, and upon store load,
     * the input field value should **not** be overwritten.
     *
     */
    beforeQuery: function(queryPlan) {
        var me = this;

        // Allow beforequery event to veto by returning false
        if (me.fireEvent('beforequery', queryPlan) === false) {
            queryPlan.cancel = true;
        }

        // Allow beforequery event to veto by returning setting the cancel flag
        else if (!queryPlan.cancel) {

            // If the minChars threshold has not been met, and we're not forcing an "all" query, cancel the query
            if (queryPlan.query.length < me.minChars && !queryPlan.forceAll) {
                queryPlan.cancel = true;
            }
        }
        return queryPlan;
    },

    doLocalQuery: function(queryPlan) {
        var me = this,
            queryString = queryPlan.query,
            filters = me.getStore().getFilters(),
            filter = me.queryFilter;
        
        me.queryFilter = null;
        filters.beginUpdate();
        if (filter) {
            filters.remove(filter);
        }

        // Querying by a string...
        if (queryString) {
            filter = me.queryFilter = new Ext.util.Filter({
                id: me.id + '-filter',
                anyMatch: me.anyMatch,
                caseSensitive: me.caseSensitive,
                root: 'data',
                property: me.displayField,
                value: me.enableRegEx ? new RegExp(queryString) : queryString
            });
            filters.add(filter);
        }
        filters.endUpdate();

        // Expand after adjusting the filter if there are records or if emptyText is configured.
        if (me.store.getCount() || me.getPicker().emptyText) {
            me.expand();
        } else {
            me.collapse();
        }

        me.afterQuery(queryPlan);
    },

    doRemoteQuery: function(queryPlan) {
        var me = this,
            loadCallback = function() {
                me.afterQuery(queryPlan);
            };

        // expand before loading so LoadMask can position itself correctly
        me.expand();

        // In queryMode: 'remote', we assume Store filters are added by the developer as remote filters,
        // and these are automatically passed as params with every load call, so we do *not* call clearFilter.
        if (me.pageSize) {
            // if we're paging, we've changed the query so start at page 1.
            me.loadPage(1, {
                rawQuery: queryPlan.rawQuery,
                callback: loadCallback
            });
        } else {
            me.store.load({
                params: me.getParams(queryPlan.query),
                rawQuery: queryPlan.rawQuery,
                callback: loadCallback
            });
        }
    },

    /**
     * @template
     * A method called when the filtering caused by the {@link #doQuery} call is complete and the store has been
     * either filtered locally (if {@link #queryMode} is `"local"`), or has been loaded using the specified filtering.
     *
     * @param {Object} queryPlan An object containing details about the query was executed.
     * @param {String} queryPlan.query The query value to be used to match against the ComboBox's {@link #valueField}.
     * @param {Boolean} queryPlan.forceAll If `true`, causes the query to be executed even if the minChars threshold is not met.
     * @param {Boolean} queryPlan.cancel A boolean value which, if set to `true` upon return, causes the query not to be executed.
     * @param {Boolean} queryPlan.rawQuery If `true` indicates that the raw input field value is being used, and upon store load,
     * the input field value should **not** be overwritten.
     *
     */
    afterQuery: function(queryPlan) {
        var me = this;

        if (me.store.getCount()) {
            if (me.typeAhead) {
                me.doTypeAhead();
            }

            // Clear current selection if it does not match the current value in the field
            if (me.getRawValue() !== me.getDisplayValue()) {
                me.ignoreSelection++;
                me.picker.getSelectionModel().deselectAll();
                me.ignoreSelection--;
            }

            if (queryPlan.rawQuery) {
                me.syncSelection();
                if (me.picker && !me.picker.getSelectionModel().hasSelection()) {
                    me.doAutoSelect();
                }
            } else {
                me.doAutoSelect();
            }
        }
    },

    loadPage: function(pageNum, options) {
        this.store.loadPage(pageNum, Ext.apply({
            params: this.getParams(this.lastQuery)
        }, options));
    },

    onPageChange: function(toolbar, newPage){
        /*
         * Return false here so we can call load ourselves and inject the query param.
         * We don't want to do this for every store load since the developer may load
         * the store through some other means so we won't add the query param.
         */
        this.loadPage(newPage);
        return false;
    },

    // private
    getParams: function(queryString) {
        var params = {},
            param = this.queryParam;

        if (param) {
            params[param] = queryString;
        }
        return params;
    },

    /**
     * @private
     * If the autoSelect config is true, and the picker is open, highlights the first item.
     */
    doAutoSelect: function() {
        var me = this,
            picker = me.picker,
            lastSelected, itemNode;
        if (picker && me.autoSelect && me.store.getCount() > 0) {
            // Highlight the last selected item and scroll it into view
            lastSelected = picker.getSelectionModel().lastSelected;
            itemNode = picker.getNode(lastSelected || 0);
            if (itemNode) {
                picker.highlightItem(itemNode);
                picker.listEl.scrollChildIntoView(itemNode, false);
            }
        }
    },

    doTypeAhead: function() {
        var me = this,
            Event = Ext.event.Event;
        if (!me.typeAheadTask) {
            me.typeAheadTask = new Ext.util.DelayedTask(me.onTypeAhead, me);
        }
        if (me.lastKey !== Event.BACKSPACE && me.lastKey !== Event.DELETE) {
            me.typeAheadTask.delay(me.typeAheadDelay);
        }
    },

    onTriggerClick: function() {
        var me = this;
        
        me.duringTriggerClick = true;
        if (!me.readOnly && !me.disabled) {
            if (me.isExpanded) {
                me.collapse();
            } else {
                me.onFocus({});
                if (me.triggerAction === 'all') {
                    me.doQuery(me.allQuery, true);
                } else if (me.triggerAction === 'last') {
                    me.doQuery(me.lastQuery, true);
                } else {
                    me.doQuery(me.getRawValue(), false, true);
                }
            }
            // If not using touch interactions, focus the input
            if (!Ext.supports.Touch) {
                me.inputEl.focus();
            }
        }
        delete me.duringTriggerClick;
    },

    onPaste: function(){
        var me = this;

        if (!me.readOnly && !me.disabled && me.editable) {
            me.doQueryTask.delay(me.queryDelay);
        }
    },

    // store the last key and doQuery if relevant
    onKeyUp: function(e, t) {
        var me = this,
            key = e.getKey();

        if (!me.readOnly && !me.disabled && me.editable) {
            me.lastKey = key;
            // we put this in a task so that we can cancel it if a user is
            // in and out before the queryDelay elapses

            // perform query w/ any normal key or backspace or delete
            if (!e.isSpecialKey() || key === e.BACKSPACE || key === e.DELETE) {
                me.doQueryTask.delay(me.queryDelay);
            }
        }

        if (me.enableKeyEvents) {
            me.callParent(arguments);
        }
    },

    initEvents: function() {
        var me = this;
        me.callParent();

        /*
         * Setup keyboard handling. If enableKeyEvents is true, we already have
         * a listener on the inputEl for keyup, so don't create a second.
         */
        if (!me.enableKeyEvents) {
            me.mon(me.inputEl, 'keyup', me.onKeyUp, me);
        }
        me.mon(me.inputEl, 'paste', me.onPaste, me);
    },

    onDestroy: function() {
        var me = this;
        
        if (me.typeAheadTask) {
            me.typeAheadTask.cancel();
            me.typeAheadTask = null;
        }
        
        Ext.destroy(me.listKeyNav);
        me.bindStore(null);
        me.callParent();
    },

    // The picker (the dropdown) must have its zIndex managed by the same ZIndexManager which is
    // providing the zIndex of our Container.
    onAdded: function() {
        var me = this;
        me.callParent(arguments);
        if (me.picker) {
            me.picker.ownerCt = me.up('[floating]');
            me.picker.registerWithOwnerCt();
        }
    },

    createPicker: function() {
        var me = this,
            picker,
            pickerCfg = Ext.apply({
                xtype: 'boundlist',
                pickerField: me,
                selModel: {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                },
                floating: true,
                hidden: true,
                store: me.store,
                displayField: me.displayField,
                focusOnToFront: false,
                preserveScrollOnRefresh: true,
                pageSize: me.pageSize,
                tpl: me.tpl
            }, me.listConfig, me.defaultListConfig);

        picker = me.picker = Ext.widget(pickerCfg);
        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }

        me.mon(picker, {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });

        me.mon(picker.getSelectionModel(), {
            beforeselect: me.onBeforeSelect,
            beforedeselect: me.onBeforeDeselect,
            selectionchange: me.onListSelectionChange,
            scope: me
        });

        return picker;
    },

    alignPicker: function(){
        var me = this,
            picker = me.getPicker(),
            heightAbove = me.getPosition()[1] - Ext.getBody().getScroll().top,
            heightBelow = Ext.Element.getViewportHeight() - heightAbove - me.getHeight(),
            space = Math.max(heightAbove, heightBelow),
            pickerEl = picker.getTargetEl().dom,
            pickerScrollPos = pickerEl.scrollTop;

        // Allow the picker to height itself naturally.
        if (picker.height) {
            delete picker.height;
            picker.updateLayout();
        }
        // Then ensure that vertically, the dropdown will fit into the space either above or below the inputEl.
        if (picker.getHeight() > space - 5) {
            picker.setHeight(space - 5); // have some leeway so we aren't flush against
        }
        me.callParent();
        pickerEl.scrollTop = pickerScrollPos;
    },

    onListRefresh: function() {
        // Picker will be aligned during the expand call
        if (!this.expanding) {
            this.alignPicker();
        }
        this.syncSelection();
    },

    onItemClick: function(picker, record){
        /*
         * If we're doing single selection, the selection change events won't fire when
         * clicking on the selected element. Detect it here.
         */
        var me = this,
            selection = me.picker.getSelectionModel().getSelection(),
            valueField = me.valueField;

        if (!me.multiSelect && selection.length) {
            if (record.get(valueField) === selection[0].get(valueField)) {
                // Make sure we also update the display value if it's only partial
                me.displayTplData = [record.data];
                me.setRawValue(me.getDisplayValue());
                me.collapse();
            }
        }
    },

    onBeforeSelect: function(list, record) {
        return this.fireEvent('beforeselect', this, record, this.getStore().indexOf(record));
    },

    onBeforeDeselect: function(list, record) {
        return this.fireEvent('beforedeselect', this, record, this.getStore().indexOf(record));
    },

    onListSelectionChange: function(list, selectedRecords) {
        var me = this,
            isMulti = me.multiSelect,
            hasRecords = selectedRecords.length > 0;
        // Only react to selection if it is not called from setValue, and if our list is
        // expanded (ignores changes to the selection model triggered elsewhere)
        if (!me.ignoreSelection && me.isExpanded) {
            if (!isMulti) {
                Ext.defer(me.collapse, 1, me);
            }
            /*
             * Only set the value here if we're in multi selection mode or we have
             * a selection. Otherwise setValue will be called with an empty value
             * which will cause the change event to fire twice.
             */
            if (isMulti || hasRecords) {
                me.setValue(selectedRecords, false);
            }
            if (hasRecords) {
                me.fireEvent('select', me, selectedRecords);
            }

            // If not using touch interactions, focus the input
            if (!Ext.supports.Touch) {
                me.inputEl.focus();
            }
        }
    },

    /**
     * @private
     * Enables the key nav for the BoundList when it is expanded.
     */
    onExpand: function() {
        var me = this,
            keyNav = me.listKeyNav,
            selectOnTab = me.selectOnTab,
            picker = me.getPicker();

        // Handle BoundList navigation from the input field. Insert a tab listener specially to enable selectOnTab.
        if (keyNav) {
            keyNav.enable();
        } else {
            keyNav = me.listKeyNav = new Ext.view.BoundListKeyNav(me.inputEl, {
                boundList: picker,
                forceKeyDown: true,
                tab: function(e) {
                    if (selectOnTab) {
                        this.selectHighlighted(e);
                        me.triggerBlur();
                    }
                    // Tab key event is allowed to propagate to field
                    return true;
                },
                enter: function(e){
                    var selModel = picker.getSelectionModel(),
                        count = selModel.getCount();

                    this.selectHighlighted(e);

                    // Handle the case where the highlighted item is already selected
                    // In this case, the change event won't fire, so just collapse
                    if (!me.multiSelect && count === selModel.getCount()) {
                        me.collapse();
                    }
                }
            });
        }

        // While list is expanded, stop tab monitoring from Ext.form.field.Trigger so it doesn't short-circuit selectOnTab
        if (selectOnTab) {
            me.ignoreMonitorTab = true;
        }

        // If not using touch interactions, focus the input
        if (!Ext.supports.Touch) {
            Ext.defer(keyNav.enable, 1, keyNav); //wait a bit so it doesn't react to the down arrow opening the picker
            me.inputEl.focus();
        }
    },

    /**
     * @private
     * Disables the key nav for the BoundList when it is collapsed.
     */
    onCollapse: function() {
        var me = this,
            keyNav = me.listKeyNav;
        if (keyNav) {
            keyNav.disable();
            me.ignoreMonitorTab = false;
        }
    },

    /**
     * Selects an item by a {@link Ext.data.Model Model}, or by a key value.
     * @param {Object} r
     */
    select: function(r, /* private */ assert) {
        var me = this,
            picker = me.picker,
            fireSelect;

        if (r && r.isModel && assert === true && picker) {
            fireSelect = !picker.getSelectionModel().isSelected(r);
        }

        me.setValue(r, true);
        // Select needs to be fired after setValue, so that when we call getValue
        // in select it returns the correct value
        if (fireSelect) {
            me.fireEvent('select', me, r);
        }
    },

    /**
     * Finds the record by searching for a specific field/value combination.
     * @param {String} field The name of the field to test.
     * @param {Object} value The value to match the field against.
     * @return {Ext.data.Model} The matched record or false.
     */
    findRecord: function(field, value) {
        var ds = this.store,
            idx = ds.findExact(field, value);
        return idx !== -1 ? ds.getAt(idx) : false;
    },
    
    getSelectedRecord: function() {
        return this.findRecordByValue(this.value) || null;
    },

    /**
     * Finds the record by searching values in the {@link #valueField}.
     * @param {Object} value The value to match the field against.
     * @return {Ext.data.Model} The matched record or false.
     */
    findRecordByValue: function(value) {
        return this.findRecord(this.valueField, value);
    },

    /**
     * Finds the record by searching values in the {@link #displayField}.
     * @param {Object} value The value to match the field against.
     * @return {Ext.data.Model} The matched record or false.
     */
    findRecordByDisplay: function(value) {
        return this.findRecord(this.displayField, value);
    },

    /**
     * Sets the specified value(s) into the field. For each value, if a record is found in the {@link #store} that
     * matches based on the {@link #valueField}, then that record's {@link #displayField} will be displayed in the
     * field. If no match is found, and the {@link #valueNotFoundText} config option is defined, then that will be
     * displayed as the default field text. Otherwise a blank value will be shown, although the value will still be set.
     * @param {String/String[]} value The value(s) to be set. Can be either a single String or {@link Ext.data.Model},
     * or an Array of Strings or Models.
     * @param {Boolean} [doSelect=true] Prevent selection of the value by passing `false` otherwise the row will be selected in the list.
     * @return {Ext.form.field.Field} this
     */
    setValue: function(value, doSelect) {
        var me = this,
            valueNotFoundText = me.valueNotFoundText,
            store = me.getStore(),
            inputEl = me.inputEl,
            matchedRecords = [],
            displayTplData = [],
            processedValue = [],
            autoLoadOnValue = me.autoLoadOnValue,
            pendingLoad = store.hasPendingLoad(),
            unloaded = autoLoadOnValue && store.loadCount === 0 && !pendingLoad,
            i, len, record, dataObj;

        if (value != null && (pendingLoad || unloaded || store.isEmptyStore)) {
            // Called while the Store is loading or we don't have the real store bound yet. 
            // Ensure it is processed by the onLoad/bindStore.
            me.value = value;
            me.setHiddenValue(me.value);
            if (unloaded && store.getProxy().isRemote) {
                store.load();
            }
            return me;
        }

        // This method processes multi-values, so ensure value is an array.
        value = Ext.Array.from(value);

        // Loop through values, matching each from the Store, and collecting matched records
        for (i = 0, len = value.length; i < len; i++) {
            record = value[i];
            if (!record || !record.isModel) {
                record = me.findRecordByValue(record);
            }
            // record found, select it.
            if (record) {
                matchedRecords.push(record);
                displayTplData.push(record.data);
                processedValue.push(record.get(me.valueField));
            }
            // record was not found, this could happen because
            // store is not loaded or they set a value not in the store
            else {
                // If we are allowing insertion of values not represented in the Store, then push the value and
                // create a fake record data object to push as a display value for use by the displayTpl
                if (!me.forceSelection) {
                    processedValue.push(value[i]);
                    dataObj = {};
                    dataObj[me.displayField] = value[i];
                    displayTplData.push(dataObj);
                    // TODO: Add config to create new records on selection of a value that has no match in the Store
                }
                // Else, if valueNotFoundText is defined, display it, otherwise display nothing for this value
                else if (Ext.isDefined(valueNotFoundText)) {
                    displayTplData.push(valueNotFoundText);
                }
            }
        }

        // Set the value of this field. If we are multiselecting, then that is an array.
        me.setHiddenValue(processedValue);
        me.value = me.multiSelect ? processedValue : processedValue[0];
        if (!Ext.isDefined(me.value)) {
            me.value = undefined;
        }
        me.displayTplData = displayTplData; //store for getDisplayValue method
        me.lastSelection = me.valueModels = matchedRecords;

        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
            inputEl.removeCls(me.emptyCls);
        }

        // Calculate raw value from the collection of Model data
        me.setRawValue(me.getDisplayValue());
        me.checkChange();

        if (doSelect !== false) {
            me.syncSelection();
        }
        me.applyEmptyText();

        return me;
    },

    /**
     * @private
     * Set the value of {@link #hiddenDataEl}
     * Dynamically adds and removes input[type=hidden] elements
     */
    setHiddenValue: function(values){
        var me = this,
            name = me.hiddenName,
            i,
            dom, childNodes, input, valueCount, childrenCount;

        if (!me.hiddenDataEl || !name) {
            return;
        }
        values = Ext.Array.from(values);
        dom = me.hiddenDataEl.dom;
        childNodes = dom.childNodes;
        input = childNodes[0];
        valueCount = values.length;
        childrenCount = childNodes.length;

        if (!input && valueCount > 0) {
            me.hiddenDataEl.setHtml(Ext.DomHelper.markup({
                tag: 'input',
                type: 'hidden',
                name: name
            }));
            childrenCount = 1;
            input = dom.firstChild;
        }
        while (childrenCount > valueCount) {
            dom.removeChild(childNodes[0]);
            -- childrenCount;
        }
        while (childrenCount < valueCount) {
            dom.appendChild(input.cloneNode(true));
            ++ childrenCount;
        }
        for (i = 0; i < valueCount; i++) {
            childNodes[i].value = values[i];
        }
    },

    /**
     * @private Generates the string value to be displayed in the text field for the currently stored value
     */
    getDisplayValue: function() {
        return this.displayTpl.apply(this.displayTplData);
    },

    getValue: function() {
        // If the user has not changed the raw field value since a value was selected from the list,
        // then return the structured value from the selection. If the raw field value is different
        // than what would be displayed due to selection, return that raw value.
        var me = this,
            picker = me.picker,
            rawValue = me.getRawValue(), //current value of text field
            value = me.value; //stored value from last selection or setValue() call

        if (me.getDisplayValue() !== rawValue) {
            value = rawValue;
            me.value = me.displayTplData = me.valueModels = undefined;
            if (picker) {
                me.ignoreSelection++;
                picker.getSelectionModel().deselectAll();
                me.ignoreSelection--;
            }
        }

        // Return null if value is undefined/null, not falsy.
        me.value = value == null ? null : value;
        return me.value;
    },

    getSubmitValue: function() {
        var value = this.getValue();
        // If the value is null/undefined, we still return an empty string. If we
        // don't, the field will never get posted to the server since nulls are ignored.
        if (Ext.isEmpty(value)) {
            value = '';
        }
        return value;
    },

    isEqual: function(v1, v2) {
        var fromArray = Ext.Array.from,
            i, len;

        v1 = fromArray(v1);
        v2 = fromArray(v2);
        len = v1.length;

        if (len !== v2.length) {
            return false;
        }

        for(i = 0; i < len; i++) {
            if (v2[i] !== v1[i]) {
                return false;
            }
        }

        return true;
    },

    /**
     * Clears any value currently set in the ComboBox.
     */
    clearValue: function() {
        this.setValue([]);
    },

    /**
     * @private Synchronizes the selection in the picker to match the current value of the combobox.
     */
    syncSelection: function() {
        var me = this,
            picker = me.picker,
            selection, selModel,
            values = me.valueModels || [],
            vLen  = values.length, v, value;

        if (picker) {
            // From the value, find the Models that are in the store's current data
            selection = [];
            for (v = 0; v < vLen; v++) {
                value = values[v];

                if (value && value.isModel && me.store.indexOf(value) >= 0) {
                    selection.push(value);
                }
            }

            // Update the selection to match
            me.ignoreSelection++;
            selModel = picker.getSelectionModel();
            selModel.deselectAll();
            if (selection.length) {
                selModel.select(selection, undefined, true);
            }
            me.ignoreSelection--;
        }
    },

    onEditorTab: function(e){
        var keyNav = this.listKeyNav;

        if (this.selectOnTab && keyNav) {
            keyNav.selectHighlighted(e);
        }
    }
});
