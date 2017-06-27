YUI.add('calendarnavigator', function(Y) {

/**
 * Provides a plugin which adds navigation controls to Calendar.
 *
 * @module calendarnavigator
 */
var CONTENT_BOX = "contentBox",
    HOST        = "host",
    RENDERED    = "rendered",
    getCN       = Y.ClassNameManager.getClassName,
    substitute  = Y.substitute,
    node        = Y.Node,
    create      = node.create,
    CALENDAR    = 'calendar',
    CALENDARNAV = 'calendarnav',
    CAL_HD      = getCN(CALENDAR, 'header'),
    CAL_PREV_M  = getCN(CALENDARNAV, 'prevmonth'),
    CAL_NEXT_M  = getCN(CALENDARNAV, 'nextmonth'),
    ydate       = Y.DataType.Date;
/**
 * A plugin class which adds navigation controls to Calendar.
 *
 * @class CalendarNavigator
 * @extends Plugin.Base
 * @namespace Plugin
 */
function CalendarNavigator(config) {
    CalendarNavigator.superclass.constructor.apply(this, arguments);
}

/**
 * The namespace for the plugin. This will be the property on the widget, which will 
 * reference the plugin instance, when it's plugged in.
 *
 * @property CalendarNavigator.NS
 * @static
 * @type String
 * @default "navigator"
 */
CalendarNavigator.NS = "navigator";

/**
 * The NAME of the CalendarNavigator class. Used to prefix events generated
 * by the plugin class.
 *
 * @property CalendarNavigator.NAME
 * @static
 * @type String
 * @default "pluginCalendarNavigator"
 */
CalendarNavigator.NAME = "pluginCalendarNavigator";


/**
 * Static property used to define the default attribute 
 * configuration for the plugin.
 *
 * @property CalendarNavigator.ATTRS
 * @type Object
 * @static
 */
CalendarNavigator.ATTRS = {

    /**
     * The number of months to shift by when the control arrows are clicked.
     *
     * @attribute shiftByMonths
     * @type Number
     * @default 1 (months)
     */
    shiftByMonths : {
        value: 1
    }
};

   /**
    * The CSS classnames for the calendar navigator controls.
    * @property CalendarBase.CALENDARNAV_STRINGS
    * @type Object
    * @readOnly
    * @protected
    * @static
    */ 
CalendarNavigator.CALENDARNAV_STRINGS = {
   prev_month_class: CAL_PREV_M,
   next_month_class: CAL_NEXT_M
};

   /**
    * The template for the calendar navigator previous month control.
    * @property CalendarBase.PREV_MONTH_CONTROL_TEMPLATE
    * @type String
    * @protected
    * @static
    */ 
CalendarNavigator.PREV_MONTH_CONTROL_TEMPLATE = '<div class="yui3-u {prev_month_class}" style="width:15px;">' + 
                                                   "&#9668;" +
                                                '</div>';
   /**
    * The template for the calendar navigator next month control.
    * @property CalendarBase.NEXT_MONTH_CONTROL_TEMPLATE
    * @type String
    * @readOnly
    * @protected
    * @static
    */ 
CalendarNavigator.NEXT_MONTH_CONTROL_TEMPLATE = '<div class="yui3-u {next_month_class}" style="width:15px;">' + 
                                                   "&#9658;" +
                                                '</div>';


Y.extend(CalendarNavigator, Y.Plugin.Base, {

    /**
     * The initializer lifecycle implementation. Modifies the host widget's 
     * render to add navigation controls.
     *
     * @method initializer
     * @param {Object} config The user configuration for the plugin  
     */
    initializer : function(config) {

        // After the host has rendered its UI, place the navigation cotnrols
        this.afterHostMethod("renderUI", this._initNavigationControls);
    },

    /**
     * The initializer destructor implementation. Responsible for destroying the initialized
     * control mechanisms.
     * 
     * @method destructor
     */
    destructor : function() {
       
    },

    /**
     * Private utility method that subtracts months from the host calendar date
     * based on the control click and the shiftByMonths property.
     * 
     * @method _subtractMonths
     * @param {Event} ev Click event from the controls
     * @protected
     */
    _subtractMonths : function (ev) {
        var host = this.get(HOST);
        var oldDate = host.get("date");
        host.set("date", ydate.addMonths(oldDate, -1*this.get("shiftByMonths")));
        ev.preventDefault();
    },

    /**
     * Private utility method that adds months to the host calendar date
     * based on the control click and the shiftByMonths property.
     * 
     * @method _addMonths
     * @param {Event} ev Click event from the controls
     * @protected
     */
    _addMonths : function (ev) {
        var host = this.get(HOST);
        var oldDate = host.get("date");
        host.set("date", ydate.addMonths(oldDate, this.get("shiftByMonths")));
        ev.preventDefault();
    },

    /**
     * Private render assist method that renders the previous month control
     * 
     * @method _renderPrevControls
     * @private
     */
    _renderPrevControls : function () {
      var prevControlNode = create(substitute (CalendarNavigator.PREV_MONTH_CONTROL_TEMPLATE,
                               CalendarNavigator.CALENDARNAV_STRINGS));
      prevControlNode.on("click", this._subtractMonths, this);
      prevControlNode.on("selectstart", function (ev) {ev.preventDefault();});
      
      return prevControlNode;        
    },

    /**
     * Private render assist method that renders the next month control
     * 
     * @method _renderNextControls
     * @private
     */
    _renderNextControls : function () {
      var nextControlNode = create(substitute (CalendarNavigator.NEXT_MONTH_CONTROL_TEMPLATE,
                               CalendarNavigator.CALENDARNAV_STRINGS));
      nextControlNode.on("click", this._addMonths, this);
      nextControlNode.on("selectstart", function (ev) {ev.preventDefault();});
      
      return nextControlNode;     
    },

    /**
     * Protected render assist method that initialized and renders the navigation controls.
     * @method _initNavigationControls
     * @protected
     */
    _initNavigationControls : function() {
            var host = this.get(HOST);
            var headerCell = host.get(CONTENT_BOX).one("." + CAL_HD);
            headerCell.prepend(this._renderPrevControls(host));
            headerCell.append(this._renderNextControls(host));
    }
});

Y.namespace("Plugin").CalendarNavigator = CalendarNavigator;


}, '@VERSION@' ,{requires:['plugin', 'classnamemanager']});
