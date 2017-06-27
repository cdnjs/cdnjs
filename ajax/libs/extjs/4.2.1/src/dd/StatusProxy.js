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
 * A specialized floating Component that supports a drop status icon, {@link Ext.Layer} styles
 * and auto-repair.  This is the default drag proxy used by all Ext.dd components.
 */
Ext.define('Ext.dd.StatusProxy', {
    extend: 'Ext.Component',
    animRepair: false,

    childEls: [
        'ghost'
    ],

    renderTpl: [
        '<div class="' + Ext.baseCSSPrefix + 'dd-drop-icon"></div>' +
        '<div id="{id}-ghost" class="' + Ext.baseCSSPrefix + 'dd-drag-ghost"></div>'
    ],
    
    repairCls: Ext.baseCSSPrefix + 'dd-drag-repair',

    /**
     * Creates new StatusProxy.
     * @param {Object} [config] Config object.
     */
    constructor: function(config) {
        var me = this;

        config = config || {};

        Ext.apply(me, {
            hideMode: 'visibility',
            hidden: true,
            floating: true,
            id: me.id || Ext.id(),
            cls: Ext.baseCSSPrefix + 'dd-drag-proxy ' + this.dropNotAllowed,
            shadow: config.shadow || false,
            renderTo: Ext.getDetachedBody()
        });
        me.callParent(arguments);
        this.dropStatus = this.dropNotAllowed;
    },

    /**
     * @cfg {String} dropAllowed
     * The CSS class to apply to the status element when drop is allowed.
     */
    dropAllowed : Ext.baseCSSPrefix + 'dd-drop-ok',

    /**
     * @cfg {String} dropNotAllowed
     * The CSS class to apply to the status element when drop is not allowed.
     */
    dropNotAllowed : Ext.baseCSSPrefix + 'dd-drop-nodrop',

    /**
     * Updates the proxy's visual element to indicate the status of whether or not drop is allowed
     * over the current target element.
     * @param {String} cssClass The css class for the new drop status indicator image
     */
    setStatus : function(cssClass){
        cssClass = cssClass || this.dropNotAllowed;
        if (this.dropStatus != cssClass) {
            this.el.replaceCls(this.dropStatus, cssClass);
            this.dropStatus = cssClass;
        }
    },

    /**
     * Resets the status indicator to the default dropNotAllowed value
     * @param {Boolean} clearGhost True to also remove all content from the ghost, false to preserve it
     */
    reset : function(clearGhost){
        var me = this,
            clsPrefix = Ext.baseCSSPrefix + 'dd-drag-proxy ';

        me.el.replaceCls(clsPrefix + me.dropAllowed, clsPrefix + me.dropNotAllowed);
        me.dropStatus = me.dropNotAllowed;
        if (clearGhost) {
            me.ghost.update('');
        }
    },

    /**
     * Updates the contents of the ghost element
     * @param {String/HTMLElement} html The html that will replace the current innerHTML of the ghost element, or a
     * DOM node to append as the child of the ghost element (in which case the innerHTML will be cleared first).
     */
    update : function(html){
        if (typeof html == "string") {
            this.ghost.update(html);
        } else {
            this.ghost.update("");
            html.style.margin = "0";
            this.ghost.dom.appendChild(html);
        }
        var el = this.ghost.dom.firstChild;
        if (el) {
            Ext.fly(el).setStyle('float', 'none');
        }
    },

    /**
     * Returns the ghost element
     * @return {Ext.Element} el
     */
    getGhost : function(){
        return this.ghost;
    },

    /**
     * Hides the proxy
     * @param {Boolean} clear True to reset the status and clear the ghost contents,
     * false to preserve them
     */
    hide : function(clear) {
        this.callParent();
        if (clear) {
            this.reset(true);
        }
    },

    /**
     * Stops the repair animation if it's currently running
     */
    stop : function(){
        if (this.anim && this.anim.isAnimated && this.anim.isAnimated()) {
            this.anim.stop();
        }
    },

    /**
     * Force the Layer to sync its shadow and shim positions to the element
     */
    sync : function(){
        this.el.sync();
    },

    /**
     * Causes the proxy to return to its position of origin via an animation.
     * Should be called after an invalid drop operation by the item being dragged.
     * @param {Number[]} xy The XY position of the element ([x, y])
     * @param {Function} callback The function to call after the repair is complete.
     * @param {Object} scope The scope (`this` reference) in which the callback function is executed.
     * Defaults to the browser window.
     */
    repair : function(xy, callback, scope) {
        var me = this;

        me.callback = callback;
        me.scope = scope;
        if (xy && me.animRepair !== false) {
            me.el.addCls(me.repairCls);
            me.el.hideUnders(true);
            me.anim = me.el.animate({
                duration: me.repairDuration || 500,
                easing: 'ease-out',
                to: {
                    x: xy[0],
                    y: xy[1]
                },
                stopAnimation: true,
                callback: me.afterRepair,
                scope: me
            });
        } else {
            me.afterRepair();
        }
    },

    // private
    afterRepair : function() {
        var me = this;
    
        me.hide(true);
        me.el.removeCls(me.repairCls);
        if (typeof me.callback == "function") {
            me.callback.call(me.scope || me);
        }
        delete me.callback;
        delete me.scope;
    }
});
