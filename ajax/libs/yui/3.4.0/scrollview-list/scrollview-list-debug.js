YUI.add('scrollview-list', function(Y) {

/**
 * Provides a plugin, which adds support for a scroll indicator to ScrollView instances
 *
 * @module scrollview-scrollbars
 */
var getCN = Y.ClassNameManager.getClassName,
SCROLLVIEW = 'scrollview',
LIST_CLASS = getCN(SCROLLVIEW, 'list'),
ITEM_CLASS = getCN(SCROLLVIEW, 'item'),
CONTENT_BOX = "contentBox",
RENDERED = 'rendered',
RENDER_UI = 'renderUI',
HOST = "host";

/**
 * ScrollView plugin that adds scroll indicators to ScrollView instances
 *
 * @class ScrollViewScrollbars
 * @namespace Plugin
 * @extends Plugin.Base
 * @constructor
 */
function ListPlugin() {
    ListPlugin.superclass.constructor.apply(this, arguments);
}

 
/**
 * The identity of the plugin
 *
 * @property ListPlugin.NAME
 * @type String
 * @default 'pluginList'
 * @static
 */
ListPlugin.NAME = 'pluginList';
    
/**
 * The namespace on which the plugin will reside.
 *
 * @property ListPlugin.NS
 * @type String
 * @default 'list'
 * @static
 */
ListPlugin.NS = 'list';

/**
 * HTML template for the scrollbar
 *
 * @property ScrollViewScrollbars.SCROLLBAR_TEMPLATE
 * @type Object
 * @static
 */


/**
 * The default attribute configuration for the plugin
 *
 * @property ScrollViewScrollbars.ATTRS
 * @type Object
 * @static
 */
ListPlugin.ATTRS = {
    
    /**
     * Specifies whether the list elements (the immediate <ul>'s and the immediate <li>'s inside those <ul>'s) have class names attached to them or not
     *
     * @property ScrollView.list.isAttached
     * @type boolean
     * @static
     */
    isAttached: {
        value:false,
        validator: Y.Lang.isBoolean
    }
};

Y.namespace("Plugin").ScrollViewList = Y.extend(ListPlugin, Y.Plugin.Base, {

    /**
     * Designated initializer
     *
     * @method initializer
     */    
    initializer: function() {
        this._host = this.get(HOST);

        this.afterHostMethod("renderUI", this._addClassesToList);

        if (this._host.get(RENDERED)) {
            this._addClassesToList();
        }

    },

    _addClassesToList: function() {

        if (!this.get('isAttached')) {
            var cb = this._host.get(CONTENT_BOX),
            ulList,
            liList;

            if (cb.hasChildNodes()) {
                //get all direct descendants of the UL's that are directly under the content box.
                ulList = cb.all('> ul');
                liList = cb.all('> ul > li');

                //go through the UL's and add the class
                ulList.each(function(list) {
                    list.addClass(LIST_CLASS);
                });

                //go through LI's and add the class
                liList.each(function(item) {
                    item.addClass(ITEM_CLASS);
                });

                this.set('isAttached', true);
            }
        }


    }

});












}, '@VERSION@' ,{skinnable:true, requires:['plugin']});
