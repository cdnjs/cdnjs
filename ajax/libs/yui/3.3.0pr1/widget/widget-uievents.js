YUI.add('widget-uievents', function(Y) {

var UI_EVENT_REGEX = /(\w+):(\w+)/,
    UI_EVENT_REGEX_REPLACE = "$2",
    BOUNDING_BOX = "boundingBox",
    Widget = Y.Widget,
    RENDER = "render",
    L = Y.Lang;

Y.mix(Widget.prototype, {

    _destroyUIEvents: function() {

        var widgetGuid = Y.stamp(this, true),
            uievts = this._uievts;

        if (uievts) {
            Y.each(uievts, function (info, key) {
                if (info.instances[widgetGuid]) {
                    //  Unregister this Widget instance as needing this delegated
                    //  event listener.
                    delete info.instances[widgetGuid];
    
                    //  There are no more Widget instances using this delegated 
                    //  event listener, so detach it.
    
                    if (Y.Object.isEmpty(info.instances)) {
                        info.handle.detach();
    
                        if (uievts[key]) {
                            delete uievts[key];
                        }
                    }
                }
            });
        }
    },

    /**
     * Map of DOM events that should be fired as Custom Events by the  
     * Widget instance.
     *
     * @property UI_EVENTS
     * @type Object
     */
    UI_EVENTS: Y.Node.DOM_EVENTS,

    /**
     * Returns the node on which to bind delegate listeners.
     *
     * @method _getUIEventNode
     * @protected
     */
    _getUIEventNode: function () {
        return this.get(BOUNDING_BOX);
    },

    /**
     * Binds a delegated DOM event listener of the specified type to the 
     * Widget's outtermost DOM element to facilitate the firing of a Custom
     * Event of the same type for the Widget instance.  
     *
     * @private
     * @method _createUIEvent
     * @param type {String} String representing the name of the event
     */
    _createUIEvent: function (type) {

        var uiEvtNode = this._getUIEventNode(),
            key = (Y.stamp(uiEvtNode) + type),
            info,
            handle;

        this._uievts = this._uievts || {};
        info = this._uievts[key];

        //  For each Node instance: Ensure that there is only one delegated
        //  event listener used to fire Widget UI events.

        if (!info) {

            handle = uiEvtNode.delegate(type, function (evt) {

                var widget = Widget.getByNode(this);
                //  Make the DOM event a property of the custom event
                //  so that developers still have access to it.
                widget.fire(evt.type, { domEvent: evt });

            }, "." + Y.Widget.getClassName());

            this._uievts[key] = info = { instances: {}, handle: handle };
        }

        //  Register this Widget as using this Node as a delegation container.
        info.instances[Y.stamp(this)] = 1;
    },

    /**
     * Determines if the specified event is a UI event.
     *
     * @private
     * @method _isUIEvent
     * @param type {String} String representing the name of the event
     * @return {String} Event Returns the name of the UI Event, otherwise 
     * undefined.
     */
    _getUIEvent: function (type) {
        if (L.isString(type)) {
            var sType = type.replace(UI_EVENT_REGEX, UI_EVENT_REGEX_REPLACE),
                returnVal;

            if (this.UI_EVENTS[sType]) {
                returnVal = sType;
            }

            return returnVal;
        }
    },

    /**
     * Sets up infastructure required to fire a UI event.
     * 
     * @private
     * @method _initUIEvent
     * @param type {String} String representing the name of the event
     * @return {String}     
     */
    _initUIEvent: function (type) {
        var sType = this._getUIEvent(type),
            queue = this._uiEvtsInitQueue || {};

        if (sType && !queue[sType]) {

            this._uiEvtsInitQueue = queue[sType] = 1;

            this.after(RENDER, function() { 
                this._createUIEvent(sType);
                delete this._uiEvtsInitQueue[sType];
            });
        }
    },

    //  Override of "on" from Base to facilitate the firing of Widget events
    //  based on DOM events of the same name/type (e.g. "click", "mouseover").
    //  Temporary solution until we have the ability to listen to when 
    //  someone adds an event listener (bug 2528230)
    on: function (type) {
        this._initUIEvent(type);
        return Widget.superclass.on.apply(this, arguments);
    },

    //  Override of "after" from Base to facilitate the firing of Widget events
    //  based on DOM events of the same name/type (e.g. "click", "mouseover").    
    //  Temporary solution until we have the ability to listen to when 
    //  someone adds an event listener (bug 2528230)    
    after: function (type) {
        this._initUIEvent(type);
        return Widget.superclass.after.apply(this, arguments);
    },

    //  Override of "publish" from Base to facilitate the firing of Widget events
    //  based on DOM events of the same name/type (e.g. "click", "mouseover").    
    //  Temporary solution until we have the ability to listen to when 
    //  someone publishes an event (bug 2528230)     
    publish: function (type, config) {
        var sType = this._getUIEvent(type);
        if (sType && config && config.defaultFn) {
            this._initUIEvent(sType);
        }        
        return Widget.superclass.publish.apply(this, arguments);
    }

}, true); // overwrite existing EventTarget methods


}, '@VERSION@' ,{requires:['widget-base', 'node-event-delegate']});
