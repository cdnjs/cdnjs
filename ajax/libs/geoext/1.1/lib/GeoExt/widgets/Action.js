/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Control.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = Action
 *  base_link = `Ext.Action <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Action>`_
 */
Ext.namespace("GeoExt");

/** api: example
 *  Sample code to create a toolbar with an OpenLayers control into it.
 * 
 *  .. code-block:: javascript
 *  
 *      var action = new GeoExt.Action({
 *          text: "max extent",
 *          control: new OpenLayers.Control.ZoomToMaxExtent(),
 *          map: map
 *      });
 *      var toolbar = new Ext.Toolbar([action]);
 */

/** api: constructor
 *  .. class:: Action(config)
 *  
 *      Create a GeoExt.Action instance. A GeoExt.Action is created
 *      to insert an OpenLayers control in a toolbar as a button or
 *      in a menu as a menu item. A GeoExt.Action instance can be
 *      used like a regular Ext.Action, look at the Ext.Action API
 *      doc for more detail.
 */
GeoExt.Action = Ext.extend(Ext.Action, {

    /** api: config[control]
     *  ``OpenLayers.Control`` The OpenLayers control wrapped in this action.
     */
    control: null,

    /** api: config[activateOnEnable]
     *  ``Boolean`` Activate the action's control when the action is enabled.
     *  Default is ``false``.
     */

    /** api: property[activateOnEnable]
     *  ``Boolean`` Activate the action's control when the action is enabled.
     */
    activateOnEnable: false,

    /** api: config[deactivateOnDisable]
     *  ``Boolean`` Deactivate the action's control when the action is disabled.
     *  Default is ``false``.
     */

    /** api: property[deactivateOnDisable]
     *  ``Boolean`` Deactivate the action's control when the action is disabled.
     */
    deactivateOnDisable: false,

    /** api: config[map]
     *  ``OpenLayers.Map`` The OpenLayers map that the control should be added
     *  to.  For controls that don't need to be added to a map or have already
     *  been added to one, this config property may be omitted.
     */
    map: null,

    /** private: property[uScope]
     *  ``Object`` The user-provided scope, used when calling uHandler,
     *  uToggleHandler, and uCheckHandler.
     */
    uScope: null,

    /** private: property[uHandler]
     *  ``Function`` References the function the user passes through
     *  the "handler" property.
     */
    uHandler: null,

    /** private: property[uToggleHandler]
     *  ``Function`` References the function the user passes through
     *  the "toggleHandler" property.
     */
    uToggleHandler: null,

    /** private: property[uCheckHandler]
     *  ``Function`` References the function the user passes through
     *  the "checkHandler" property.
     */
    uCheckHandler: null,

    /** private */
    constructor: function(config) {
        
        // store the user scope and handlers
        this.uScope = config.scope;
        this.uHandler = config.handler;
        this.uToggleHandler = config.toggleHandler;
        this.uCheckHandler = config.checkHandler;

        config.scope = this;
        config.handler = this.pHandler;
        config.toggleHandler = this.pToggleHandler;
        config.checkHandler = this.pCheckHandler;

        // set control in the instance, the Ext.Action
        // constructor won't do it for us
        var ctrl = this.control = config.control;
        delete config.control;
        
        this.activateOnEnable = !!config.activateOnEnable;
        delete config.activateOnEnable;
        this.deactivateOnDisable = !!config.deactivateOnDisable;
        delete config.deactivateOnDisable;

        // register "activate" and "deactivate" listeners
        // on the control
        if(ctrl) {
            // If map is provided in config, add control to map.
            if(config.map) {
                config.map.addControl(ctrl);
                delete config.map;
            }
            if((config.pressed || config.checked) && ctrl.map) {
                ctrl.activate();
            }
            if (ctrl.active) {
                config.pressed = true;
                config.checked = true;
            }
            ctrl.events.on({
                activate: this.onCtrlActivate,
                deactivate: this.onCtrlDeactivate,
                scope: this
            });
        }

        arguments.callee.superclass.constructor.call(this, config);
    },

    /** private: method[pHandler]
     *  :param cmp: ``Ext.Component`` The component that triggers the handler.
     *
     *  The private handler.
     */
    pHandler: function(cmp) {
        var ctrl = this.control;
        if(ctrl &&
           ctrl.type == OpenLayers.Control.TYPE_BUTTON) {
            ctrl.trigger();
        }
        if(this.uHandler) {
            this.uHandler.apply(this.uScope, arguments);
        }
    },

    /** private: method[pTogleHandler]
     *  :param cmp: ``Ext.Component`` The component that triggers the toggle handler.
     *  :param state: ``Boolean`` The state of the toggle.
     *
     *  The private toggle handler.
     */
    pToggleHandler: function(cmp, state) {
        this.changeControlState(state);
        if(this.uToggleHandler) {
            this.uToggleHandler.apply(this.uScope, arguments);
        }
    },

    /** private: method[pCheckHandler]
     *  :param cmp: ``Ext.Component`` The component that triggers the check handler.
     *  :param state: ``Boolean`` The state of the toggle.
     *
     *  The private check handler.
     */
    pCheckHandler: function(cmp, state) {
        this.changeControlState(state);
        if(this.uCheckHandler) {
            this.uCheckHandler.apply(this.uScope, arguments);
        }
    },

    /** private: method[changeControlState]
     *  :param state: ``Boolean`` The state of the toggle.
     *
     *  Change the control state depending on the state boolean.
     */
    changeControlState: function(state) {
        if(state) {
            if(!this._activating) {
                this._activating = true;
                this.control.activate();
                // update initialConfig for next component created from this action
                this.initialConfig.pressed = true;
                this.initialConfig.checked = true;
                this._activating = false;
            }
        } else {
            if(!this._deactivating) {
                this._deactivating = true;
                this.control.deactivate();
                // update initialConfig for next component created from this action
                this.initialConfig.pressed = false;
                this.initialConfig.checked = false;
                this._deactivating = false;
            }
        }
    },

    /** private: method[onCtrlActivate]
     *  
     *  Called when this action's control is activated.
     */
    onCtrlActivate: function() {
        var ctrl = this.control;
        if(ctrl.type == OpenLayers.Control.TYPE_BUTTON) {
            this.enable();
        } else {
            // deal with buttons
            this.safeCallEach("toggle", [true]);
            // deal with check items
            this.safeCallEach("setChecked", [true]);
        }
    },

    /** private: method[onCtrlDeactivate]
     *  
     *  Called when this action's control is deactivated.
     */
    onCtrlDeactivate: function() {
        var ctrl = this.control;
        if(ctrl.type == OpenLayers.Control.TYPE_BUTTON) {
            this.disable();
        } else {
            // deal with buttons
            this.safeCallEach("toggle", [false]);
            // deal with check items
            this.safeCallEach("setChecked", [false]);
        }
    },

    /** private: method[safeCallEach]
     *
     */
    safeCallEach: function(fnName, args) {
        var cs = this.items;
        for(var i = 0, len = cs.length; i < len; i++){
            if(cs[i][fnName]) {
                cs[i].rendered ?
                    cs[i][fnName].apply(cs[i], args) :
                    cs[i].on({
                        "render": cs[i][fnName].createDelegate(cs[i], args),
                        single: true
                    });
            }
        }
    },
    
    /** private: method[setDisabled]
     *  :param v: ``Boolean`` Disable the action's components.
     *
     *  Override method on super to optionally deactivate controls on disable.
     */
    setDisabled : function(v) {
        if (!v && this.activateOnEnable && this.control && !this.control.active) {
            this.control.activate();
        }
        if (v && this.deactivateOnDisable && this.control && this.control.active) {
            this.control.deactivate();
        }
        return GeoExt.Action.superclass.setDisabled.apply(this, arguments);
    }

});
