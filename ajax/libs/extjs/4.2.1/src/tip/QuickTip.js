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
 * A specialized tooltip class for tooltips that can be specified in markup and automatically managed
 * by the global {@link Ext.tip.QuickTipManager} instance.  See the QuickTipManager documentation for
 * additional usage details and examples.
 */
Ext.define('Ext.tip.QuickTip', {
    extend: 'Ext.tip.ToolTip',
    alias: 'widget.quicktip',
    alternateClassName: 'Ext.QuickTip',

    /**
     * @cfg {String/HTMLElement/Ext.Element} target
     * The target HTMLElement, {@link Ext.Element} or id to associate with this Quicktip.
     * 
     * Defaults to the document.
     */

    /**
     * @cfg {Boolean} interceptTitles
     * `true` to automatically use the element's DOM title value if available.
     */
    interceptTitles : false,

    // Force creation of header Component
    title: '&#160;',

    // @private
    tagConfig : {
        namespace : 'data-',
        attribute : 'qtip',
        width : 'qwidth',
        target : 'target',
        title : 'qtitle',
        hide : 'hide',
        cls : 'qclass',
        align : 'qalign',
        anchor : 'anchor',
        showDelay: 'qshowDelay'
    },

    // @private
    initComponent : function(){
        var me = this;

        me.target = me.target || Ext.getDoc();
        me.targets = me.targets || {};
        me.callParent();
    },

    /**
     * Configures a new quick tip instance and assigns it to a target element.
     *
     * For example usage, see the {@link Ext.tip.QuickTipManager} class header.
     *
     * @param {Object} config The config object with the following properties:
     * @param config.autoHide
     * @param config.cls
     * @param config.dismissDelay overrides the singleton value
     * @param config.target required
     * @param config.text required
     * @param config.title
     * @param config.width
     */
    register : function(config){
        var configs = Ext.isArray(config) ? config : arguments,
            i = 0,
            len = configs.length,
            target, j, targetLen;

        for (; i < len; i++) {
            config = configs[i];
            target = config.target;
            if (target) {
                if (Ext.isArray(target)) {
                    for (j = 0, targetLen = target.length; j < targetLen; j++) {
                        this.targets[Ext.id(target[j])] = config;
                    }
                } else{
                    this.targets[Ext.id(target)] = config;
                }
            }
        }
    },

    /**
     * Removes this quick tip from its element and destroys it.
     * @param {String/HTMLElement/Ext.Element} el The element from which the quick tip
     * is to be removed or ID of the element.
     */
    unregister : function(el){
        delete this.targets[Ext.id(el)];
    },

    /**
     * Hides a visible tip or cancels an impending show for a particular element.
     * @param {String/HTMLElement/Ext.Element} el The element that is the target of
     * the tip or ID of the element.
     */
    cancelShow: function(el){
        var me = this,
            activeTarget = me.activeTarget;

        el = Ext.get(el).dom;
        if (me.isVisible()) {
            if (activeTarget && activeTarget.el == el) {
                me.hide();
            }
        } else if (activeTarget && activeTarget.el == el) {
            me.clearTimer('show');
        }
    },

    /**
     * @private
     * Reads the tip text from the closest node to the event target which contains the
     * attribute we are configured to look for. Returns an object containing the text
     * from the attribute, and the target element from which the text was read.
     */
    getTipCfg: function(e) {
        var t = e.getTarget(),
            titleText = t.title,
            cfg;

        if (this.interceptTitles && titleText && Ext.isString(titleText)) {
            t.qtip = titleText;
            t.removeAttribute("title");
            e.preventDefault();
            return {
                text: titleText
            };
        }
        else {
            cfg = this.tagConfig;
            t = e.getTarget('[' + cfg.namespace + cfg.attribute + ']');
            if (t) {
                return {
                    target: t,
                    text: t.getAttribute(cfg.namespace + cfg.attribute)
                };
            }
        }
    },

    // @private
    onTargetOver : function(e){
        var me = this,
            target = e.getTarget(me.delegate),
            hasShowDelay,
            delay,
            elTarget,
            cfg,
            ns,
            tipConfig,
            autoHide,
            targets, targetEl, value, key;

        if (me.disabled) {
            return;
        }

        // TODO - this causes "e" to be recycled in IE6/7 (EXTJSIV-1608) so ToolTip#setTarget
        // was changed to include freezeEvent. The issue seems to be a nested 'resize' event
        // that smashed Ext.EventObject.
        me.targetXY = e.getXY();

        // If the over target was filtered out by the delegate selector, or is not an HTMLElement, or is the <html> or the <body>, then return
        if(!target || target.nodeType !== 1 || target == document.documentElement || target == document.body){
            return;
        }

        if (me.activeTarget && ((target == me.activeTarget.el) || Ext.fly(me.activeTarget.el).contains(target))) {
            // We may have started a delayed show where we have an active target.
            // If the timer is yet to be fired, but the mouse moves, it will try to
            // show it immediately. If the attribute has been removed from the element,
            // we want to cancel the show.
            if (me.targetTextEmpty()) {
                me.onShowVeto();
                delete me.activeTarget;
            } else {
                me.clearTimer('hide');
                me.show();
            }
            return;
        }

        if (target) {
            targets = me.targets;

            for (key in targets) {
                if (targets.hasOwnProperty(key)) {
                    value = targets[key];

                    targetEl = Ext.fly(value.target);
                    if (targetEl && (targetEl.dom === target || targetEl.contains(target))) {
                        elTarget = targetEl.dom;
                        break;
                    }
                }
            }

            if (elTarget) {
                me.activeTarget = me.targets[elTarget.id];
                me.activeTarget.el = target;
                me.anchor = me.activeTarget.anchor;
                if (me.anchor) {
                    me.anchorTarget = target;
                }
                hasShowDelay = parseInt(me.activeTarget.showDelay, 10);
                if (hasShowDelay) {
                    delay = me.showDelay;
                    me.showDelay = hasShowDelay;
                }
                me.delayShow();
                if (hasShowDelay) {
                    me.showDelay = delay;
                }
                return;
            }
        }

        // Should be a fly.
        elTarget = Ext.fly(target, '_quicktip-target');
        cfg = me.tagConfig;
        ns = cfg.namespace;
        tipConfig = me.getTipCfg(e);

        if (tipConfig) {

            // getTipCfg may look up the parentNode axis for a tip text attribute and will return the new target node.
            // Change our target element to match that from which the tip text attribute was read.
            if (tipConfig.target) {
                target = tipConfig.target;
                elTarget = Ext.fly(target, '_quicktip-target');
            }
            autoHide = elTarget.getAttribute(ns + cfg.hide);

            me.activeTarget = {
                el: target,
                text: tipConfig.text,
                width: +elTarget.getAttribute(ns + cfg.width) || null,
                autoHide: autoHide != "user" && autoHide !== 'false',
                title: elTarget.getAttribute(ns + cfg.title),
                cls: elTarget.getAttribute(ns + cfg.cls),
                align: elTarget.getAttribute(ns + cfg.align),
                showDelay: parseInt(elTarget.getAttribute(ns + cfg.showDelay), 10)
            };
            me.anchor = elTarget.getAttribute(ns + cfg.anchor);
            if (me.anchor) {
                me.anchorTarget = target;
            }
            hasShowDelay = parseInt(me.activeTarget.showDelay, 10);
            if (hasShowDelay) {
                delay = me.showDelay;
                me.showDelay = hasShowDelay;
            }
            me.delayShow();
            if (hasShowDelay) {
                me.showDelay = delay;
            }
        }
    },

    // @private
    onTargetOut : function(e){
        var me = this,
            active = me.activeTarget,
            hasHideDelay,
            delay;

        // If moving within the current target, and it does not have a new tip, ignore the mouseout
        // EventObject.within is the only correct way to determine this.
        if (active && e.within(me.activeTarget.el) && !me.getTipCfg(e)) {
            return;
        }

        me.clearTimer('show');
        delete me.activeTarget;
        if (me.autoHide !== false) {
            hasHideDelay = active && parseInt(active.hideDelay, 10);
            if (hasHideDelay) {
                delay = me.hideDelay;
                me.hideDelay = hasHideDelay;
            }
            me.delayHide();
            if (hasHideDelay) {
                me.hideDelay = delay;
            }
        }
    },
    
    targetTextEmpty: function(){
        var me = this,
            target = me.activeTarget,
            cfg = me.tagConfig,
            el, text;
            
         if (target) {
             el = target.el;
             if (el) {
                 text = el.getAttribute(cfg.namespace + cfg.attribute);
                 // Note that the quicktip could also have been registered with the QuickTipManager.
                 // If this was the case, then we don't want to veto showing it.
                 // Simply do a lookup in the registered targets collection.
                 if (!text && !me.targets[target.target]) {
                     return true;
                 }
             }
         }
         return false;
    },
    
    show: function(){
        var me = this,
            fromDelay = me.fromDelayShow;
            
        // We're coming from a delayed show, so check whether
        // the attribute has been removed before we show it 
        if (fromDelay && me.targetTextEmpty()) {
            me.onShowVeto();
            delete me.activeTarget;
            return;
        }
        me.callParent(arguments);    
    },

    // @inheritdoc
    showAt : function(xy){
        var me = this,
            target = me.activeTarget,
            header = me.header,
            cls;

        if (target) {
            if (!me.rendered) {
                me.render(Ext.getBody());
                me.activeTarget = target;
            }
            me.suspendLayouts();
            if (target.title) {
                me.setTitle(target.title);
                header.show();
            } else if (header) {
                header.hide();
            }
            me.update(target.text);
            me.autoHide = target.autoHide;
            me.dismissDelay = target.dismissDelay || me.dismissDelay;
            if (target.mouseOffset) {
                xy[0] += target.mouseOffset[0];
                xy[1] += target.mouseOffset[1];
            }

            cls = me.lastCls;
            if (cls) {
                me.removeCls(cls);
                delete me.lastCls;
            }

            cls = target.cls;
            if (cls) {
                me.addCls(cls);
                me.lastCls = cls;
            }

            me.setWidth(target.width);

            if (me.anchor) {
                me.constrainPosition = false;
            } else if (target.align) { // TODO: this doesn't seem to work consistently
                xy = me.getAlignToXY(target.el, target.align);
                me.constrainPosition = false;
            }else{
                me.constrainPosition = true;
            }
            me.resumeLayouts(true);
        }
        me.callParent([xy]);
    },

    // @inheritdoc
    hide: function(){
        delete this.activeTarget;
        this.callParent();
    }
});
