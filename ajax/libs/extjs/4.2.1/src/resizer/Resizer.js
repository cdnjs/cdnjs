/*
This file is part of Ext JS 4.2

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
*/
/**
 * Applies drag handles to an element or component to make it resizable. The drag handles are inserted into the element
 * (or component's element) and positioned absolute.
 *
 * Textarea and img elements will be wrapped with an additional div because these elements do not support child nodes.
 * The original element can be accessed through the originalTarget property.
 *
 * Here is the list of valid resize handles:
 *
 *     Value   Description
 *     ------  -------------------
 *      'n'     north
 *      's'     south
 *      'e'     east
 *      'w'     west
 *      'nw'    northwest
 *      'sw'    southwest
 *      'se'    southeast
 *      'ne'    northeast
 *      'all'   all
 *
 * {@img Ext.resizer.Resizer/Ext.resizer.Resizer.png Ext.resizer.Resizer component}
 *
 * Here's an example showing the creation of a typical Resizer:
 *
 *     Ext.create('Ext.resizer.Resizer', {
 *         el: 'elToResize',
 *         handles: 'all',
 *         minWidth: 200,
 *         minHeight: 100,
 *         maxWidth: 500,
 *         maxHeight: 400,
 *         pinned: true
 *     });
 */
Ext.define('Ext.resizer.Resizer', {
    mixins: {
        observable: 'Ext.util.Observable'
    },
    uses: ['Ext.resizer.ResizeTracker', 'Ext.Component'],

    alternateClassName: 'Ext.Resizable',

    handleCls: Ext.baseCSSPrefix + 'resizable-handle',
    pinnedCls: Ext.baseCSSPrefix + 'resizable-pinned',
    overCls:   Ext.baseCSSPrefix + 'resizable-over',
    wrapCls:   Ext.baseCSSPrefix + 'resizable-wrap',
    delimiterRe: /(?:\s*[,;]\s*)|\s+/,

    /**
     * @cfg {Boolean} dynamic
     * Specify as true to update the {@link #target} (Element or {@link Ext.Component Component}) dynamically during
     * dragging. This is `true` by default, but the {@link Ext.Component Component} class passes `false` when it is
     * configured as {@link Ext.Component#resizable}.
     *
     * If specified as `false`, a proxy element is displayed during the resize operation, and the {@link #target} is
     * updated on mouseup.
     */
    dynamic: true,

    /**
     * @cfg {String} handles
     * String consisting of the resize handles to display. Defaults to 's e se' for Elements and fixed position
     * Components. Defaults to 8 point resizing for floating Components (such as Windows). Specify either `'all'` or any
     * of `'n s e w ne nw se sw'`.
     */
    handles: 's e se',

    /**
     * @cfg {Number} height
     * Optional. The height to set target to in pixels
     */
    height : null,

    /**
     * @cfg {Number} width
     * Optional. The width to set the target to in pixels
     */
    width : null,

    /**
     * @cfg {Number} heightIncrement
     * The increment to snap the height resize in pixels.
     */
    heightIncrement : 0,

    /**
     * @cfg {Number} widthIncrement
     * The increment to snap the width resize in pixels.
     */
    widthIncrement : 0,

    /**
     * @cfg {Number} minHeight
     * The minimum height for the element
     */
    minHeight : 20,

    /**
     * @cfg {Number} minWidth
     * The minimum width for the element
     */
    minWidth : 20,

    /**
     * @cfg {Number} maxHeight
     * The maximum height for the element
     */
    maxHeight : 10000,

    /**
     * @cfg {Number} maxWidth
     * The maximum width for the element
     */
    maxWidth : 10000,

    /**
     * @cfg {Boolean} pinned
     * True to ensure that the resize handles are always visible, false indicates resizing by cursor changes only
     */
    pinned: false,

    /**
     * @cfg {Boolean} preserveRatio
     * True to preserve the original ratio between height and width during resize
     */
    preserveRatio: false,

    /**
     * @cfg {Boolean} transparent
     * True for transparent handles. This is only applied at config time.
     */
    transparent: false,

    /**
     * @cfg {Ext.Element/Ext.util.Region} constrainTo
     * An element, or a {@link Ext.util.Region Region} into which the resize operation must be constrained.
     */

    possiblePositions: {
        n:  'north',
        s:  'south',
        e:  'east',
        w:  'west',
        se: 'southeast',
        sw: 'southwest',
        nw: 'northwest',
        ne: 'northeast'
    },

    /**
     * @cfg {Ext.Element/Ext.Component} target
     * The Element or Component to resize.
     */

    /**
     * @property {Ext.Element} el
     * Outer element for resizing behavior.
     */

    constructor: function(config) {
        var me = this,
            target,
            targetEl,
            tag,
            handles = me.handles,
            handleCls,
            possibles,
            len,
            i = 0,
            pos, 
            handleEls = [],
            eastWestStyle, style,
            box, targetBaseCls,
            unselectableCls = Ext.dom.Element.unselectableCls;

        me.addEvents(
            /**
             * @event beforeresize
             * Fired before resize is allowed. Return false to cancel resize.
             * @param {Ext.resizer.Resizer} this
             * @param {Number} width The start width
             * @param {Number} height The start height
             * @param {Ext.EventObject} e The mousedown event
             */
            'beforeresize',
            /**
             * @event resizedrag
             * Fires during resizing. Return false to cancel resize.
             * @param {Ext.resizer.Resizer} this
             * @param {Number} width The new width
             * @param {Number} height The new height
             * @param {Ext.EventObject} e The mousedown event
             */
            'resizedrag',
            /**
             * @event resize
             * Fired after a resize.
             * @param {Ext.resizer.Resizer} this
             * @param {Number} width The new width
             * @param {Number} height The new height
             * @param {Ext.EventObject} e The mouseup event
             */
            'resize'
        );

        if (Ext.isString(config) || Ext.isElement(config) || config.dom) {
            target = config;
            config = arguments[1] || {};
            config.target = target;
        }
        // will apply config to this
        me.mixins.observable.constructor.call(me, config);

        // If target is a Component, ensure that we pull the element out.
        // Resizer must examine the underlying Element.
        target = me.target;
        if (target) {
            if (target.isComponent) {

                // Resizable Components get a new UI class on them which makes them overflow:visible
                // if the border width is non-zero and therefore the SASS has embedded the handles 
                // in the borders using -ve position.
                target.addClsWithUI('resizable');

                me.el = target.getEl();
                if (target.minWidth) {
                    me.minWidth = target.minWidth;
                }
                if (target.minHeight) {
                    me.minHeight = target.minHeight;
                }
                if (target.maxWidth) {
                    me.maxWidth = target.maxWidth;
                }
                if (target.maxHeight) {
                    me.maxHeight = target.maxHeight;
                }
                if (target.floating) {
                    if (!me.hasOwnProperty('handles')) {
                        me.handles = 'n ne e se s sw w nw';
                    }
                }
            } else {
                me.el = me.target = Ext.get(target);
            }
        }
        // Backwards compatibility with Ext3.x's Resizable which used el as a config.
        else {
            me.target = me.el = Ext.get(me.el);
        }

        // Tags like textarea and img cannot
        // have children and therefore must
        // be wrapped
        tag = me.el.dom.tagName.toUpperCase();
        if (tag == 'TEXTAREA' || tag == 'IMG' || tag == 'TABLE') {
            /**
             * @property {Ext.Element/Ext.Component} originalTarget
             * Reference to the original resize target if the element of the original resize target was a
             * {@link Ext.form.field.Field Field}, or an IMG or a TEXTAREA which must be wrapped in a DIV.
             */
            me.originalTarget = me.target;
            targetEl = me.el;
            box = targetEl.getBox();
            me.target = me.el = me.el.wrap({
                cls: me.wrapCls,
                id: me.el.id + '-rzwrap',
                style: targetEl.getStyles('margin-top', 'margin-bottom')
            });

            // Transfer originalTarget's positioning+sizing+margins
            me.el.setPositioning(targetEl.getPositioning());
            targetEl.clearPositioning();
            me.el.setBox(box);

            // Position the wrapped element absolute so that it does not stretch the wrapper
            targetEl.setStyle('position', 'absolute');
        }

        // Position the element, this enables us to absolute position
        // the handles within this.el
        me.el.position();
        if (me.pinned) {
            me.el.addCls(me.pinnedCls);
        }

        /**
         * @property {Ext.resizer.ResizeTracker} resizeTracker
         */
        me.resizeTracker = new Ext.resizer.ResizeTracker({
            disabled: me.disabled,
            target: me.target,
            constrainTo: me.constrainTo,
            overCls: me.overCls,
            throttle: me.throttle,
            originalTarget: me.originalTarget,
            delegate: '.' + me.handleCls,
            dynamic: me.dynamic,
            preserveRatio: me.preserveRatio,
            heightIncrement: me.heightIncrement,
            widthIncrement: me.widthIncrement,
            minHeight: me.minHeight,
            maxHeight: me.maxHeight,
            minWidth: me.minWidth,
            maxWidth: me.maxWidth
        });

        // Relay the ResizeTracker's superclass events as our own resize events
        me.resizeTracker.on({
            mousedown: me.onBeforeResize,
            drag: me.onResize,
            dragend: me.onResizeEnd,
            scope: me
        });

        if (me.handles == 'all') {
            me.handles = 'n s e w ne nw se sw';
        }

        handles = me.handles = me.handles.split(me.delimiterRe);
        possibles = me.possiblePositions;
        len = handles.length;

        handleCls = me.handleCls + ' ' + me.handleCls + '-{0}';
        if (me.target.isComponent) {
            targetBaseCls = me.target.baseCls
            handleCls += ' ' + targetBaseCls + '-handle ' + targetBaseCls + '-handle-{0}';
            if (Ext.supports.CSS3BorderRadius) {
                handleCls += ' ' + targetBaseCls + '-handle-{0}-br';
            }
        }

        // Needs heighting on IE6!
        eastWestStyle = Ext.isIE6 ? ' style="height:' + me.el.getHeight() + 'px"' : '';

        for (; i < len; i++){
            // if specified and possible, create
            if (handles[i] && possibles[handles[i]]) {
                pos = possibles[handles[i]];
                if (pos === 'east' || pos === 'west') {
                    style = eastWestStyle;
                } else {
                    style = '';
                }

                handleEls.push(
                    '<div id="', me.el.id, '-', pos, '-handle"',
                        ' class="', Ext.String.format(handleCls, pos), ' ', unselectableCls, '"',
                        ' unselectable="on"',
                        style,
                    '></div>'
                );
            }
        }
        Ext.DomHelper.append(me.el, handleEls.join(''));

        // store a reference to each handle element in this.east, this.west, etc
        for (i = 0; i < len; i++){
            // if specified and possible, create
            if (handles[i] && possibles[handles[i]]) {
                pos = possibles[handles[i]];
                me[pos] = me.el.getById(me.el.id + '-' + pos + '-handle');
                me[pos].region = pos;

                if (me.transparent) {
                    me[pos].setOpacity(0);
                }
            }
        }

        // Constrain within configured maxima
        if (Ext.isNumber(me.width)) {
            me.width = Ext.Number.constrain(me.width, me.minWidth, me.maxWidth);
        }
        if (Ext.isNumber(me.height)) {
            me.height = Ext.Number.constrain(me.height, me.minHeight, me.maxHeight);
        }

        // Size the target (and originalTarget)
        if (me.width !== null || me.height !== null) {
            if (me.originalTarget) {
                me.originalTarget.setWidth(me.width);
                me.originalTarget.setHeight(me.height);
            }
            me.resizeTo(me.width, me.height);
        }

        me.forceHandlesHeight();
    },

    disable: function() {
        this.resizeTracker.disable();
    },

    enable: function() {
        this.resizeTracker.enable();
    },

    /**
     * @private Relay the Tracker's mousedown event as beforeresize
     * @param tracker The Resizer
     * @param e The Event
     */
    onBeforeResize: function(tracker, e) {
        var box = this.el.getBox();
        return this.fireEvent('beforeresize', this, box.width, box.height, e);
    },

    /**
     * @private Relay the Tracker's drag event as resizedrag
     * @param tracker The Resizer
     * @param e The Event
     */
    onResize: function(tracker, e) {
        var me = this,
            box = me.el.getBox();
            
        me.forceHandlesHeight();
        return me.fireEvent('resizedrag', me, box.width, box.height, e);
    },

    /**
     * @private Relay the Tracker's dragend event as resize
     * @param tracker The Resizer
     * @param e The Event
     */
    onResizeEnd: function(tracker, e) {
        var me = this,
            box = me.el.getBox();
            
        me.forceHandlesHeight();
        return me.fireEvent('resize', me, box.width, box.height, e);
    },

    /**
     * Perform a manual resize and fires the 'resize' event.
     * @param {Number} width
     * @param {Number} height
     */
    resizeTo : function(width, height) {
        var me = this;
        me.target.setSize(width, height);
        me.fireEvent('resize', me, width, height, null);
    },

    /**
     * Returns the element that was configured with the el or target config property. If a component was configured with
     * the target property then this will return the element of this component.
     *
     * Textarea and img elements will be wrapped with an additional div because these elements do not support child
     * nodes. The original element can be accessed through the originalTarget property.
     * @return {Ext.Element} element
     */
    getEl : function() {
        return this.el;
    },

    /**
     * Returns the element or component that was configured with the target config property.
     *
     * Textarea and img elements will be wrapped with an additional div because these elements do not support child
     * nodes. The original element can be accessed through the originalTarget property.
     * @return {Ext.Element/Ext.Component}
     */
    getTarget: function() {
        return this.target;
    },

    destroy: function() {
        var me = this,
            i,
            handles = me.handles,
            len = handles.length,
            positions = me.possiblePositions,
            handle;

        me.resizeTracker.destroy();
        for (i = 0; i < len; i++) {
            if (handle = me[positions[handles[i]]]) {
                handle.remove();
            }
        }
    },

    /**
     * @private
     * Fix IE6 handle height issue.
     */
    forceHandlesHeight : function() {
        var me = this,
            handle;
        if (Ext.isIE6) {
            handle = me.east;
            if (handle) {
                handle.setHeight(me.el.getHeight());
            }
            handle = me.west;
            if (handle) {
                handle.setHeight(me.el.getHeight());
            }
            me.el.repaint();
        }
    }
});
