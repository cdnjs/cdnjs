Ext.define('ChartsKitchenSink.view.Navigation', {
    extend: 'Ext.tree.Panel',
    xtype: 'navigation',
    requires: [
        'Ext.form.field.Trigger'
    ],

    title: 'Examples',
    rootVisible: false,
    lines: false,
    useArrows: true,
    hideHeaders: true,


    initComponent: function() {
        var me = this;

        me.columns = [{
            xtype: 'treecolumn',
            text: 'Name',
            flex: 1,
            dataIndex: 'text',
            scope: me,
            renderer: function(value) {
                var searchString = this.searchField.getValue();

                if (searchString.length > 0) {
                    return this.strMarkRedPlus(searchString, value);
                }

                return value;
            }
        }];

        var store = Ext.create('Ext.data.TreeStore', {
            proxy : {
                type : 'ajax',
                url  : 'resources/data/navigation.json'
            }
        });

        Ext.apply(me, {
            store: store,
            dockedItems : [
                {
                    xtype: 'textfield',
                    dock: 'top',
                    emptyText: 'Search',
                    enableKeyEvents: true,

                    triggers: {
                        clear: {
                            cls: 'x-form-clear-trigger',
                            handler: 'onClearTriggerClick',
                            hidden: true,
                            scope: 'this'
                        },
                        search: {
                            cls: 'x-form-search-trigger',
                            weight: 1,
                            handler: 'onSearchTriggerClick',
                            scope: 'this'

                        }
                    },

                    onClearTriggerClick: function() {
                        this.setValue();
                        me.store.clearFilter();
                        this.getTrigger('clear').hide();
                    },

                    onSearchTriggerClick: function() {
                        me.filterStore(this.getValue());
                    },

                    listeners: {
                        keyup: {
                            fn: function(field, event, eOpts) {
                                var value = field.getValue();

                                field.getTrigger('clear')[(value.length > 0) ? 'show' : 'hide']();

                                this.filterStore(value);
                            },
                            buffer: 300
                        },

                        render: function(field) {
                            this.searchField = field;
                        },

                        scope: me
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    filterStore: function(value) {
        var me = this,
            store = me.store,
            searchString = value.toLowerCase(),
            filterFn = function(node) {
                var children = node.childNodes,
                    len      = children && children.length,
                    visible  = v.test(node.get('text')),
                    i;

                // If the current node does NOT match the search condition
                // specified by the user...
                if ( !visible ) {

                    // Check to see if any of the child nodes of this node
                    // match the search condition.  If they do then we will
                    // mark the current node as visible as well.
                    for (i = 0; i < len; i++) {
                        if ( children[i].isLeaf() ) {
                            visible = children[i].get('visible');
                        }
                        else {
                            visible = filterFn(children[i]);
                        }
                        if (visible) {
                            break;
                        }
                    }

                }

                else { // Current node matches the search condition...

                    // Force all of its child nodes to be visible as well so
                    // that the user is able to select an example to display.
                    for (i = 0; i < len; i++) {
                        children[i].set('visible', true );
                    }

                }

                return visible;
            }, v;

        if (searchString.length < 1) {
            store.clearFilter();
        } else {
            v = new RegExp(searchString, 'i');
            store.getFilters().replaceAll({
                filterFn: filterFn
            });
        }
    },

    strMarkRedPlus : function (search, subject) {
        return subject.replace(
            new RegExp( '('+search+')', "gi" ),
            "<span style='color: red;'><b>$1</b></span>"
        );
    }
});