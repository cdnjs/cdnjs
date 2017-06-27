YUI.add('widget-autohide', function(Y) {

/**
 * "widget-autohide" is a widget-level plugin that allows widgets to be hidden
 * when certain events occur.
 *
 * By default, the widget will be hidden when the following events occur
 * <ul>
 *   <li>something is clicked outside the widget's bounding box</li>
 *   <li>something is focussed outside the widget's bounding box</li>
 *   <li>the escape key is pressed</li>
 * </ul>
 *
 * Events can be added or removed from this list through the "hideOn" attribute.
 * The following code demonstrates how to do this. Suppose I want to close the widget when
 * another node is resized.
 * <code>widget.plug(Y.Plugin.Autohide, {hideOn: [{node: resize, eventName: 'resize:end'}]});</code>.
 * The hideOn attribute must be an array of objects. For more details on this attribute, refer to the API docs for it.
 *
 * This module was originally part of the overlay-extras package by Eric Ferraiuolo but was promoted and abstracted
 * into the core library.
 *
 * @module widget-autohide
 * @author eferraiuolo, tilomitra
 * @since 3.4.0
 */


var WIDGET_AUTOHIDE    = 'widgetAutohide',
    AUTOHIDE            = 'autohide',
    CLICK_OUTSIDE     = 'clickoutside',
    FOCUS_OUTSIDE     = 'focusoutside',
    DOCUMENT            = 'doc',
    KEY                 = 'key',
    PRESS_ESCAPE         = 'esc',
    BIND_UI             = 'bindUI',
    SYNC_UI             = "syncUI",
    RENDERED            = "rendered",
    BOUNDING_BOX        = "boundingBox",
    VISIBLE             = "visible",
    HOST                = "host",
    CHANGE              = 'Change',

    getCN               = Y.ClassNameManager.getClassName;


WidgetAutohide = Y.Base.create(WIDGET_AUTOHIDE, Y.Plugin.Base, [], {

    // *** Instance Members *** //

    _uiHandles : null,

    // *** Lifecycle Methods *** //

    initializer : function (config) {

        this.afterHostMethod(BIND_UI, this.bindUI);
        this.afterHostMethod(SYNC_UI, this.syncUI);

        if (this.get(HOST).get(RENDERED)) {
            this.bindUI();
            this.syncUI();
        }
    },

    destructor : function () {

        this._detachUIHandles();
    },

    bindUI : function () {

        this.afterHostEvent(VISIBLE+CHANGE, this._afterHostVisibleChange);
    },

    syncUI : function () {

        this._uiSetHostVisible(this.get(HOST).get(VISIBLE));
    },

    // *** Private Methods *** //

    _uiSetHostVisible : function (visible) {

        if (visible) {
            //this._attachUIHandles();
            Y.later(1, this, '_attachUIHandles');
        } else {
            this._detachUIHandles();
        }
    },

    _attachUIHandles : function () {

        if (this._uiHandles) { return; }

        var host = this.get(HOST),
            bb = host.get(BOUNDING_BOX),
            hide = Y.bind(host.hide, host),
            uiHandles = [],
            self = this,
            hideOn = this.get('hideOn'),
            i = 0,
            o = {node: undefined, ev: undefined, keyCode: undefined};

            //push all events on which the widget should be hidden
            for (; i < hideOn.length; i++) {
                
                o.node = hideOn[i].node;
                o.ev = hideOn[i].eventName;
                o.keyCode = hideOn[i].keyCode;

                //no keycode or node defined
                if (!o.node && !o.keyCode && o.ev) {
                    uiHandles.push(bb.on(o.ev, hide));
                }

                //node defined, no keycode (not a keypress)
                else if (o.node && !o.keyCode && o.ev) {
                    uiHandles.push(o.node.on(o.ev, hide));
                }

                //node defined, keycode defined, event defined (its a key press)
                else if (o.node && o.keyCode && o.ev) {
                    uiHandles.push(o.node.on(o.ev, hide, o.keyCode));
                }
                
                else {
                    Y.Log('The event with name "'+o.ev+'" could not be attached.');
                }
                
            }

        this._uiHandles = uiHandles;
    },

    _detachUIHandles : function () {

        Y.each(this._uiHandles, function(h){
            h.detach();
        });
        this._uiHandles = null;
    },

    _afterHostVisibleChange : function (e) {

        this._uiSetHostVisible(e.newVal);
    }

}, {

    // *** Static *** //

    NS : AUTOHIDE,

    ATTRS : {

       /*
        * @description An array of events that will cause the widget to hide.
        * Each index in the array should be an object literal with the following properties:
        * 
        * eventName (required, string): Refers to the event to listen to. If no other properties are 
        * provided, it listens to this event on the widget's boundingBox. (ex: "clickoutside", "focusoutside")
        *
        * node (optional, Y.Node): Refers to the node on which the "eventName" event should be listening. 
        * For example, to close the widget when a resize on "#someDiv" occurs, pass in "Y.one("#someDiv")" to node, and "resize:end" to eventName
        *
        * keyCode (optional, string): When listening to "key" events, this property can be filled with a keyCode such as "esc" or "down:27"
        * 
        * By default, this attribute has 3 objects within its array, clicking outside the widget, focussing outside the widget, and pressing the escape key
        * @attribute hideOn
        * @public
        * @type array
        */
        hideOn: {
            value: [
                {
                    eventName: CLICK_OUTSIDE
                },
                {
                    eventName: FOCUS_OUTSIDE
                },

                {
                    node: Y.one(DOCUMENT),
                    eventName: KEY,
                    keyCode: PRESS_ESCAPE
                }
            ],
            validator: Y.Lang.isArray
        }
    }

});

Y.namespace("Plugin").Autohide = WidgetAutohide;


}, '@VERSION@' ,{requires:['base-build', 'widget', 'plugin', 'event-outside']});
