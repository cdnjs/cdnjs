YUI.add('panel', function(Y) {

/**
 * Provides a Panel widget, a widget that mimics the functionality of a regular OS window.
 * Comes with Standard Module support, XY Positioning, Alignment Support, Stack (z-index) support,
 * modality, auto-focus and auto-hide functionality, and header/footer button support.
 *
 * @module panel
 */

/**
 * A basic Panel Widget, which can be positioned based on Page XY co-ordinates and is stackable (z-index support).
 * It also provides alignment and centering support and uses a standard module format for it's content, with header,
 * body and footer section support. It can be made modal, and has functionality to hide and focus on different events.
 * The header and footer sections can be modified to allow for button support.
 *
 * @class Panel
 * @constructor
 * @extends Widget
 * @uses WidgetStdMod
 * @uses WidgetPosition
 * @uses WidgetStack
 * @uses WidgetPositionAlign
 * @uses WidgetPositionConstrain
 * @uses WidgetModality
 * @uses WidgetAutohide
 * @uses WidgetButtons
 * @param {Object} object The user configuration for the instance.
 */
Y.Panel = Y.Base.create("panel", Y.Widget, [Y.WidgetStdMod, Y.WidgetPosition, Y.WidgetStack, Y.WidgetPositionAlign, Y.WidgetPositionConstrain, Y.WidgetModality, Y.WidgetAutohide, Y.WidgetButtons]);


}, '@VERSION@' ,{requires:['widget', 'widget-autohide', 'widget-buttons',  'widget-modality', 'widget-position', 'widget-position-align', 'widget-position-constrain', 'widget-stack', 'widget-stdmod']});
