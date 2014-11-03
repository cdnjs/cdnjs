/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('datatable-paginator', function (Y, NAME) {

/**
 Adds support for paging through data in the DataTable.

 @module datatable
 @submodule datatable-paginator
 @since 3.11.0
 */

var Model,
    View,
    PaginatorTemplates = Y.DataTable.Templates.Paginator,
    sub = Y.Lang.sub,
    getClassName = Y.ClassNameManager.getClassName,
    CLASS_DISABLED = getClassName(NAME, 'control-disabled'),
    EVENT_UI = 'paginator:ui';


/**
 @class DataTable.Paginator.Model
 @extends Model
 @since 3.11.0
 */
Model = Y.Base.create('dt-pg-model', Y.Model, [Y.Paginator.Core]),

/**
 @class DataTable.Paginator.View
 @extends View
 @since 3.11.0
 */
View = Y.Base.create('dt-pg-view', Y.View, [], {
    /**
     Array of event handles to keep track of what should be destroyed later
     @protected
     @property _eventHandles
     @type {Array}
     @since 3.11.0
     */
    _eventHandles: [],

    /**
     Template for this view's container.
     @property containerTemplate
     @type {String}
     @default '<div class="yui3-datatable-paginator"/>'
     @since 3.11.0
     */
    containerTemplate: '<div class="{paginator}"/>',

    /**
     Template for content. Helps maintain order of controls.
     @property contentTemplate
     @type {String}
     @default '{buttons}{goto}{perPage}'
     @since 3.11.0
     */
    contentTemplate: '{buttons}{goto}{perPage}',

    /**
     Disables ad-hoc ATTRS for our view.
     @protected
     @property _allowAdHocAttrs
     @type {Boolean}
     @default false
     @since 3.11.0
     */
    _allowAdHocAttrs: false,

    /**
     Sets classnames on the templates and bind events
     @method initializer
     @since 3.11.0
     */
    initializer: function () {
        this.containerTemplate = sub(this.containerTemplate, {
            paginator: getClassName(NAME)
        });

        this._initStrings();
        this._initClassNames();

        this.attachEvents();
    },

    /**
     @method render
     @chainable
     @since 3.11.0
     */
    render: function () {
        var model = this.get('model'),
            content = sub(this.contentTemplate, {
                'buttons': this._buildButtonsGroup(),
                'goto': this._buildGotoGroup(),
                'perPage': this._buildPerPageGroup()
            });

        this.get('container').append(content);
        this.attachEvents();

        this._rendered = true;

        this._updateControlsUI(model.get('page'));
        this._updateItemsPerPageUI(model.get('itemsPerPage'));

        return this;
    },

    /**
     @method attachEvents
     @since 3.11.0
     */
    attachEvents: function () {
        View.superclass.attachEvents.apply(this, arguments);

        var container = this.get('container');

        if (!this.classNames) {
            this._initClassNames();
        }

        this._attachedViewEvents.push(
            container.delegate('click', this._controlClick, '.' + this.classNames.control, this),
            this.get('model').after('change', this._modelChange, this)
        );

        container.all('form').each(Y.bind(function (frm) {
            this._attachedViewEvents.push(
                frm.after('submit', this._controlSubmit, this)
            );
        }, this));

        container.all('select').each(Y.bind(function (sel) {
            this._attachedViewEvents.push(
                sel.after('change', this._controlChange, this)
            );
        }, this));

    },

    /**
     Returns a string built from the button and buttons templates.
     @protected
     @method _buildButtonsGroup
     @return {String}
     @since 3.11.0
     */
    _buildButtonsGroup: function () {
        var strings = this.get('strings'),
            classNames = this.classNames,
            buttons;

        buttons = PaginatorTemplates.button({
                    type: 'first', label: strings.first, classNames: classNames
                }) +
                PaginatorTemplates.button({
                    type: 'prev',  label: strings.prev,  classNames: classNames
                }) +
                PaginatorTemplates.button({
                    type: 'next',  label: strings.next,  classNames: classNames
                }) +
                PaginatorTemplates.button({
                    type: 'last',  label: strings.last,  classNames: classNames
                });

        return PaginatorTemplates.buttons({
            classNames: classNames,
            buttons: buttons
        });

    },

    /**
     Returns a string built from the gotoPage template.
     @protected
     @method _buildGotoGroup
     @return {String}
     @since 3.11.0
     */
    _buildGotoGroup: function () {

        return PaginatorTemplates.gotoPage({
            classNames: this.classNames,
            strings: this.get('strings'),
            page: this.get('model').get('page')
        });
    },

    /**
     Returns a string built from the perPage template
     @protected
     @method _buildPerPageGroup
     @return {String}
     @since 3.11.0
     */
    _buildPerPageGroup: function () {
        var options = this.get('pageSizes'),
            rowsPerPage = this.get('model').get('rowsPerPage'),
            option,
            len,
            i;

        for (i = 0, len = options.length; i < len; i++ ) {
            option = options[i];

            if (typeof option !== 'object') {
                option = {
                    value: option,
                    label: option
                };
            }
            option.selected = (option.value === rowsPerPage) ? ' selected' : '';
        }

        return PaginatorTemplates.perPage({
            classNames: this.classNames,
            strings: this.get('strings'),
            options: this.get('pageSizes')
        });

    },

    /**
     Update the UI after the model has changed.
     @protected
     @method _modelChange
     @param {EventFacade} e
     @since 3.11.0
     */
    _modelChange: function (e) {
        var changed = e.changed,
            page = (changed && changed.page),
            itemsPerPage = (changed && changed.itemsPerPage);

        if (page) {
            this._updateControlsUI(page.newVal);
        }
        if (itemsPerPage) {
            this._updateItemsPerPageUI(itemsPerPage.newVal);
            if (!page) {
                this._updateControlsUI(e.target.get('page'));
            }
        }

    },

    /**
     Updates the button controls and the gotoPage form
     @protected
     @method _updateControlsUI
     @param {Number} val Page number to set the UI input to
     @since 3.11.0
     */
    _updateControlsUI: function (val) {
        if (!this._rendered) {
            return;
        }

        var model = this.get('model'),
            controlClass = '.' + this.classNames.control,
            container = this.get('container'),
            hasPrev = model.hasPrevPage(),
            hasNext = model.hasNextPage();

        container.one(controlClass + '-first')
                 .toggleClass(CLASS_DISABLED, !hasPrev)
                 .set('disabled', !hasPrev);

        container.one(controlClass + '-prev')
                 .toggleClass(CLASS_DISABLED, !hasPrev)
                 .set('disabled', !hasPrev);

        container.one(controlClass + '-next')
                 .toggleClass(CLASS_DISABLED, !hasNext)
                 .set('disabled', !hasNext);

        container.one(controlClass + '-last')
                 .toggleClass(CLASS_DISABLED, !hasNext)
                 .set('disabled', !hasNext);

        container.one('form input').set('value', val);
    },

    /**
     Updates the drop down select for items per page
     @protected
     @method _updateItemsPerPageUI
     @param {Number} val Number of items to display per page
     @since 3.11.0
     */
    _updateItemsPerPageUI: function (val) {
        if (!this._rendered) {
            return;
        }

        this.get('container').one('select').set('value', val);
    },

    /**
     Fire EVENT_UI when an enabled control button is clicked
     @protected
     @method _controlClick
     @param {EventFacade} e
     @since 3.11.0
     */
    _controlClick: function (e) { // buttons
        e.preventDefault();
        var control = e.currentTarget;
        // register click events from the four control buttons
        if (control.hasClass(CLASS_DISABLED)) {
            return;
        }
        this.fire(EVENT_UI, {
            type: control.getData('type'),
            val: control.getData('page') || null
        });
    },

    /**
     Fire EVENT_UI with `type:perPage` after the select drop down changes
     @protected
     @method _controlChange
     @param {EventFacade} e
     @since 3.11.0
     */
    _controlChange: function (e) {

        // register change events from the perPage select
        if ( e.target.hasClass(CLASS_DISABLED) ) {
            return;
        }

        val = e.target.get('value');
        this.fire(EVENT_UI, { type: 'perPage', val: parseInt(val, 10) });
    },

    /**
     Fire EVENT_UI with `type:page` after form is submitted
     @protected
     @method _controlSubmit
     @param {EventFacade} e
     @since 3.11.0
     */
    _controlSubmit: function (e) {
        if ( e.target.hasClass(CLASS_DISABLED) ) {
            return;
        }

        // the only form we have is the go to page form
        e.preventDefault();

        input = e.target.one('input');

        // Note: Convert input's value into a number.
        this.fire(EVENT_UI, { type: 'page', val: +input.get('value') });
    },

    /**
     Initializes classnames to be used with the templates
     @protected
     @method _initClassNames
     @since 3.11.0
     */
    _initClassNames: function () {
        this.classNames = {
            control: getClassName(NAME, 'control'),
            controls: getClassName(NAME, 'controls'),
            group: getClassName(NAME, 'group'),
            perPage: getClassName(NAME, 'per-page')
        };
    },

    /**
     Initializes strings used for internationalization
     @protected
     @method _initStrings
     @since 3.11.0
     */
    _initStrings: function () {
        // Not a valueFn because other class extensions may want to add to it
        this.set('strings', Y.mix((this.get('strings') || {}),
            Y.Intl.get('datatable-paginator')));
    },


    /**
     Returns an Array with default values for the Rows Per Page select option.
     We had to use a valueFn to enable language string replacement.

     @protected
     @method _defPageSizeVal
     @since 3.13.0
     */
    _defPageSizeVal: function () {
        this._initStrings();

        var str = this.get('strings');

        return [10, 50, 100, { label: str.showAll, value: -1 }]
    }

}, {
    ATTRS: {
        /**
         Array of values used to populate the drop down for items per page
         @attribute pageSizes
         @type {Array}
         @default [ 10, 50, 100, { label: 'Show All', value: -1 } ]
         @since 3.11.0
         */
        pageSizes: {
            valueFn: '_defPageSizeVal'
        },

        /**
         Model used for this view
         @attribute model
         @type {Model}
         @default null
         @since 3.11.0
         */
        model: {}
    }
});

/**
 @class DataTable.Paginator
 @since 3.11.0
 */
function Controller () {}

Controller.ATTRS = {
    /**
     A model instance or a configuration object for the Model.
     @attribute paginatorModel
     @type {Model|Object}
     @default null
     @since 3.11.0
     */
    paginatorModel: {
        setter: '_setPaginatorModel',
        value: null,
        writeOnce: 'initOnly'
    },

    /**
     A pointer to a Model object to be instantiated, or a String off of the
     `Y` namespace.

     This is only used if the `paginatorModel` is a configuration object or
     is null.
     @attribute paginatorModelType
     @type {Model|String}
     @default 'DataTable.Paginator.Model'
     @since 3.11.0
     */
    paginatorModelType: {
        getter: '_getConstructor',
        value: 'DataTable.Paginator.Model',
        writeOnce: 'initOnly'
    },

    /**
     A pointer to a `Y.View` object to be instantiated. A new view will be
     created for each location provided. Each view created will be given the
     same model instance.
     @attribute paginatorView
     @type {View|String}
     @default 'DataTable.Paginator.View'
     @since 3.11.0
     */
    paginatorView: {
        getter: '_getConstructor',
        value: 'DataTable.Paginator.View',
        writeOnce: 'initOnly'
    },

    // PAGINATOR CONFIGS
    /**
     Array of values used to populate the values in the Paginator UI allowing
     the end user to select the number of items to display per page.
     @attribute pageSizes
     @type {Array}
     @default [10, 50, 100, { label: 'Show All', value: -1 }]
     @since 3.11.0
     */
    pageSizes: {
        setter: '_setPageSizesFn',
        valueFn: '_defPageSizeVal'
    },

    paginatorStrings: {},

    /**
     Number of rows to display per page. As the UI changes the number of pages
     to display, this will update to reflect the value selected in the UI
     @attribute rowsPerPage
     @type {Number | null}
     @default null
     @since 3.11.0
     */
    rowsPerPage: {
        value: null
    },

    /**
     String of `footer` or `header`, a Y.Node, or an Array or any combination
     of those values.
     @attribute paginatorLocation
     @type {String|Array|Node}
     @default footer
     @since 3.11.0
     */
    paginatorLocation: {
        value: 'footer'
    }
};

Y.mix(Controller.prototype, {
    /**
     Sets the `paginatorModel` to the first page.
     @method firstPage
     @chainable
     @since 3.11.0
     */
    firstPage: function () {
        this.get('paginatorModel').set('page', 1);
        return this;
    },

    /**
     Sets the `paginatorModel` to the last page.
     @method lastPage
     @chainable
     @since 3.11.0
     */
    lastPage: function () {
        var model = this.get('paginatorModel');
        model.set('page', model.get('totalPages'));
        return this;
    },

    /**
     Sets the `paginatorModel` to the previous page.
     @method previousPage
     @chainable
     @since 3.11.0
     */
    previousPage: function () {
        this.get('paginatorModel').prevPage();
        return this;
    },

    /**
     Sets the `paginatorModel` to the next page.
     @method nextPage
     @chainable
     @since 3.11.0
     */
    nextPage: function () {
        this.get('paginatorModel').nextPage();
        return this;
    },


    /// Init and protected
    /**
     Constructor logic
     @protected
     @method initializer
     @since 3.11.0
     */
    initializer: function () {
        // allow DT to use paged data
        this._initPaginatorStrings();
        this._augmentData();

        if (!this._eventHandles.paginatorRender) {
            this._eventHandles.paginatorRender = Y.Do.after(this._paginatorRender, this, 'render');
        }
    },

    /**
     Renders the paginator into locations and attaches events.
     @protected
     @method _paginatorRender
     @since 3.11.0
     */
    _paginatorRender: function () {
        var model = this.get('paginatorModel');

        this._paginatorRenderUI();
        model.after('change', this._afterPaginatorModelChange, this);
        this.after('dataChange', this._afterDataChangeWithPaginator, this);
        this.after('rowsPerPageChange', this._afterRowsPerPageChange, this);
        this.data.after(['add', 'remove', 'change'], this._afterDataUpdatesWithPaginator, this);

        // ensure our model has the correct totalItems set
        model.set('itemsPerPage', this.get('rowsPerPage'));
        model.set('totalItems', this.get('data').size());
    },

    /**
     After the data changes, we ensure we are on the first page and the data
     is augmented
     @protected
     @method _afterDataChangeWithPaginator
     @since 3.11.0
     */
    _afterDataChangeWithPaginator: function () {
        var data = this.get('data'),
            model = this.get('paginatorModel');

        model.set('totalItems', data.size());

        if (model.get('page') !== 1) {
            this.firstPage();
        } else {
            this._augmentData();

            data.fire.call(data, 'reset', {
                src: 'reset',
                models: data._items.concat()
            });
        }
    },

    /**
     After data has changed due to a model being added, removed, or changed,
     update paginator model totalItems to reflect the changes.
     @protected
     @method _afterDataUpdatesWithPaginator
     @param {EventFacade} e
     @since 3.13.0
    */
    _afterDataUpdatesWithPaginator: function () {
        var model = this.get('paginatorModel'),
            data = this.get('data');

        model.set('totalItems', data.size());
    },

    /**
     After the rowsPerPage changes, update the UI to reflect the new number of
     rows to be displayed. If the new value is `null`, destroy all instances
     of the paginators.
     @protected
     @method _afterRowsPerPageChange
     @param {EventFacade} e
     @since 3.11.0
     */
    _afterRowsPerPageChange: function (e) {
        var data = this.get('data'),
            model = this.get('paginatorModel'),
            view;

        if (e.newVal !== null) {
            // turning on
            this._paginatorRenderUI();

            if (!(data._paged)) {
                this._augmentData();
            }

            data._paged.index = (model.get('page') - 1) * model.get('itemsPerPage');
            data._paged.length = model.get('itemsPerPage');

        } else { // e.newVal === null
            // destroy!
            while(this._pgViews.length) {
                view = this._pgViews.shift();
                view.destroy({ remove: true });
                view._rendered = null;
            }

            data._paged.index = 0;
            data._paged.length = null;
        }

        this.get('paginatorModel').set('itemsPerPage', parseInt(e.newVal, 10));
    },

    /**
     Parse each location and render a new view into each area.
     @protected
     @method _paginatorRenderUI
     @since 3.11.0
     */
    _paginatorRenderUI: function () {
        if (!this.get('rowsPerPage')) {
            return;
        }
        var views = this._pgViews,
            ViewClass = this.get('paginatorView'),
            viewConfig = {
                pageSizes: this.get('pageSizes'),
                model: this.get('paginatorModel')
            },
            locations = this.get('paginatorLocation');

        if (!Y.Lang.isArray(locations)) {
            locations = [locations];
        }

        if (!views) { // set up initial rendering of views
            views = this._pgViews = [];
        }

        // for each placement area, push to views
        Y.Array.each(locations, function (location) {
            var view = new ViewClass(viewConfig),
                container = view.render().get('container'),
                row;

            view.after('*:ui', this._uiPgHandler, this);
            views.push(view);

            if (location._node) { // assume Y.Node
                location.append(container);
                // remove this container row if the view is ever destroyed
                this.after('destroy', function (/* e */) {
                    view.destroy({ remove: true });
                });
            } else if (location === 'footer') { // DT Footer
                // Render a table footer if there isn't one
                if (!this.foot) {
                    this.foot = new Y.DataTable.FooterView({ host: this });
                    this.foot.render();
                    this.fire('renderFooter', { view: this.foot });
                }

                // create a row for the paginator to sit in
                row = Y.Node.create(PaginatorTemplates.rowWrapper({
                    wrapperClass: getClassName(NAME, 'wrapper'),
                    numOfCols: this.get('columns').length
                }));

                row.one('td').append(container);
                this.foot.tfootNode.append(row);

                // remove this container row if the view is ever destroyed
                view.after('destroy', function (/* e */) {
                    row.remove(true);
                });
            } else if (location === 'header') {
                // 'header' means insert before the table
                // placement with the caption may need to be addressed
                if (this.view && this.view.tableNode) {
                    this.view.tableNode.insert(container, 'before');
                } else {
                    this.get('contentBox').prepend(container);
                }
            }
        }, this);

    },

    /**
     Handles the paginator's UI event into a single location. Updates the
     `paginatorModel` according to what type is provided.
     @protected
     @method _uiPgHandler
     @param {EventFacade} e
     @since 3.11.0
     */
    _uiPgHandler: function (e) {
        // e.type = control type (first|prev|next|last|page|perPage)
        // e.val = value based on the control type to pass to the model
        var model = this.get('paginatorModel');

        switch (e.type) {
            case 'first':
                model.set('page', 1);
                break;
            case 'last':
                model.set('page', model.get('totalPages'));
                break;
            case 'prev':
            case 'next': // overflow intentional
                model[e.type + 'Page']();
                break;
            case 'page':
                model.set('page', e.val);
                break;
            case 'perPage':
                model.set('itemsPerPage', e.val);
                model.set('page', 1);
                break;
        }
    },

    /**
     Augments the model list with a paged structure, or updates the paged
     data. Then fires reset on the model list.
     @protected
     @method _afterPaginatorModelChange
     @param {EventFacade} [e]
     @since 3.11.0
     */
    _afterPaginatorModelChange: function () {
        var model = this.get('paginatorModel'),
            data = this.get('data');

        if (!data._paged) {
            this._augmentData();
        } else {
            data._paged.index = (model.get('page') - 1) * model.get('itemsPerPage');
            data._paged.length = model.get('itemsPerPage');
        }

        data.fire.call(data, 'reset', {
            src: 'reset',
            models: data._items.concat()
        });
    },

    /**
     Augments the model list data structure with paged implementations.

     The model list will contain a method for `getPage` that will return the
     given number of items listed within the range.

     `each` will also loop over the items in the page
     @protected
     @method _augmentData
     @since 3.11.0
     */
    _augmentData: function () {
        var model = this.get('paginatorModel');

        if (this.get('rowsPerPage') === null) {
            return;
        }

        Y.mix(this.get('data'), {

            _paged: {
                index: (model.get('page') - 1) * model.get('itemsPerPage'),
                length: model.get('itemsPerPage')
            },

            getPage: function () {
                var _pg = this._paged,
                    min = _pg.index;

                // IE LTE 8 doesn't allow "undefined" as a second param - gh890
                return (_pg.length >= 0) ?
                        this._items.slice(min, min + _pg.length) :
                        this._items.slice(min);
            },

            size: function (paged) {
                return (paged && this._paged.length >=0 ) ?
                    this._paged.length :
                    this._items.length;
            },

            each: function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(this.getPage());

                Y.Array.each.apply(null, args);

                return this;
            }
        }, true);
    },

    /**
     Ensures `pageSizes` value is an array of objects to be used in the
     paginator view.
     @protected
     @method _setPageSizesFn
     @param {Array} val
     @return Array
     @since 3.11.0
     */
    _setPageSizesFn: function (val) {
        var i,
            len = val.length,
            label,
            value;

        if (!Y.Lang.isArray(val)) {
            val = [val];
            len = val.length;
        }

        for ( i = 0; i < len; i++ ) {
            if (typeof val[i] !== 'object') {
                label = val[i];
                value = val[i];

                // We want to check to see if we have a number or a string
                // of a number. If we do not, we want the value to be -1 to
                // indicate "all rows"
                /*jshint eqeqeq:false */
                if (parseInt(value, 10) != value) {
                    value = -1;
                }
                /*jshint eqeqeq:true */
                val[i] = { label: label, value: value };
            }
        }

        return val;
    },

    /**
     Ensures the object provided is an instance of a `Y.Model`. If it is not,
     it assumes it is the configuration of a model, and gets the new model
     type from `paginatorModelType`.
     @protected
     @method _setPaginatorModel
     @param {Model|Object} model
     @return Y.Model instance
     @since 3.11.0
     */
    _setPaginatorModel: function (model) {
        if (!(model && model._isYUIModel)) {
            var ModelConstructor = this.get('paginatorModelType');
            model = new ModelConstructor(model);
        }

        return model;
    },

    /**
     Returns a pointer to an object to be instantiated if the provided type is
     a string
     @protected
     @method _getConstructor
     @param {Object | String} type Type of Object to contruct. If `type` is a
       String, we assume it is a namespace off the Y object
     @return
     @since 3.11.0
     */
    _getConstructor: function (type) {
        return typeof type === 'string' ?
            Y.Object.getValue(Y, type.split('.')) :
            type;
    },

    /**
     Initializes paginatorStrings used for internationalization
     @protected
     @method _initPaginatorStrings
     @since 3.13.0
     */
    _initPaginatorStrings: function () {
        // Not a valueFn because other class extensions may want to add to it
        this.set('paginatorStrings', Y.mix((this.get('paginatorStrings') || {}),
            Y.Intl.get('datatable-paginator')));
    },

    /**
     Returns an Array with default values for the Rows Per Page select option.
     We had to use a valueFn to enable language string replacement.

     @protected
     @method _defPageSizeVal
     @since 3.13.0
     */
    _defPageSizeVal: function () {
        this._initPaginatorStrings();

        var str = this.get('paginatorStrings');

        return [10, 50, 100, { label: str.showAll, value: -1 }]
    }
}, true);


Y.DataTable.Paginator = Controller;
Y.DataTable.Paginator.Model = Model;
Y.DataTable.Paginator.View = View;

Y.Base.mix(Y.DataTable, [Y.DataTable.Paginator]);


}, '3.17.2', {
    "requires": [
        "model",
        "view",
        "paginator-core",
        "datatable-foot",
        "datatable-paginator-templates"
    ],
    "lang": [
        "en",
        "fr"
    ],
    "skinnable": true
});
