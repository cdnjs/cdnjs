/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('datatable-foot', function (Y, NAME) {

/**
View class responsible for rendering the `<tfoot>` section of a table. Can be
used as the default `footerView` for `Y.DataTable.Base` and `Y.DataTable`
classes.

@module datatable
@submodule datatable-foot
@since 3.11.0
**/


Y.namespace('DataTable').FooterView = Y.Base.create('tableFooter', Y.View, [], {
    // -- Instance properties -------------------------------------------------

    /**
    HTML templates used to create the `<tfoot>` containing the table footers.

    @property TFOOT_TEMPLATE
    @type {String}
    @default '<tfoot class="{className}"/>'
    @since 3.11.0
    **/
    TFOOT_TEMPLATE: '<tfoot class="{className}"/>',

    // -- Public methods ------------------------------------------------------

    /**
    Returns the generated CSS classname based on the input.  If the `host`
    attribute is configured, it will attempt to relay to its `getClassName`
    or use its static `NAME` property as a string base.

    If `host` is absent or has neither method nor `NAME`, a CSS classname
    will be generated using this class's `NAME`.

    @method getClassName
    @param {String} token* Any number of token strings to assemble the
        classname from.
    @return {String}
    @protected
    @since 3.11.0
    **/
    getClassName: function () {
        // TODO: add attribute with setter? to host to use property this.host
        // for performance
        var host = this.host,
            NAME = (host && host.constructor.NAME) ||
                    this.constructor.NAME;

        if (host && host.getClassName) {
            return host.getClassName.apply(host, arguments);
        } else {
            return Y.ClassNameManager.getClassName
                .apply(Y.ClassNameManager,
                       [NAME].concat(Y.Array(arguments, 0, true)));
        }
    },

    /**
    Creates the `<tfoot>` Node and inserts it after the `<thead>` Node.

    @method render
    @return {FooterView} The instance
    @chainable
    @since 3.11.0
    **/
    render: function () {
        var tfoot    = this.tfootNode ||
                        (this.tfootNode = this._createTFootNode());

        if (this.host && this.host._theadNode) {
            this.host._theadNode.insert(tfoot, 'after');
        }

        return this;
    },

    /**
    Creates the `<tfoot>` node that will store the footer rows and cells.

    @method _createTFootNode
    @return {Node}
    @protected
    @since 3.11.0
    **/
    _createTFootNode: function () {
        return Y.Node.create(Y.Lang.sub(this.TFOOT_TEMPLATE, {
            className: this.getClassName('foot')
        }));
    },

    /**
    Initializes the instance. Reads the following configuration properties:

      * `host`    - The object to serve as source of truth for column info

    @method initializer
    @param {Object} config Configuration data
    @protected
    @since 3.11.0
    **/
    initializer: function (config) {
        this.host  = (config && config.host);
    }



});


}, '3.17.2', {"requires": ["datatable-core", "view"]});
