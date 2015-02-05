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
 * Layout class for components with {@link Ext.form.Labelable field labeling}, handling the sizing and alignment of
 * the form control, label, and error message treatment.
 * @private
 */
Ext.define('Ext.layout.component.field.Field', {

    /* Begin Definitions */

    extend: 'Ext.layout.component.Auto',

    alias: 'layout.field',

    uses: ['Ext.tip.QuickTip', 'Ext.util.TextMetrics', 'Ext.util.CSS'],

    /* End Definitions */

    type: 'field',
    
    naturalSizingProp: 'size',

    beginLayout: function(ownerContext) {
        var me = this,
            owner = me.owner;

        me.callParent(arguments);

        ownerContext.labelStrategy = me.getLabelStrategy();
        ownerContext.errorStrategy = me.getErrorStrategy();

        ownerContext.labelContext = ownerContext.getEl('labelEl');
        ownerContext.bodyCellContext = ownerContext.getEl('bodyEl');
        ownerContext.inputContext = ownerContext.getEl('inputEl');
        ownerContext.errorContext = ownerContext.getEl('errorEl');

        // width:100% on an element inside a table in IE6/7 "strict" sizes the content box.
        // store the input element's border and padding info so that subclasses can take it into consideration if needed
        if (Ext.isIE7m && Ext.isStrict && ownerContext.inputContext) {
            me.ieInputWidthAdjustment = ownerContext.inputContext.getPaddingInfo().width + ownerContext.inputContext.getBorderInfo().width;
        }

        // perform preparation on the label and error (setting css classes, qtips, etc.)
        ownerContext.labelStrategy.prepare(ownerContext, owner);
        ownerContext.errorStrategy.prepare(ownerContext, owner);
    },
    
    beginLayoutCycle: function(ownerContext){
        var me = this,
            owner = me.owner,
            widthModel = ownerContext.widthModel,
            ownerNaturalSize = owner[me.naturalSizingProp],
            width;
            
        me.callParent(arguments);
        // Body cell must stretch to use up available width unless the field is auto width
        if (widthModel.shrinkWrap) {
            // When the width needs to be auto, table-layout cannot be fixed
            me.beginLayoutShrinkWrap(ownerContext);
        } else if (widthModel.natural) {

            // When a size specified, natural becomes fixed width unless the inpiutWidth is specified - we shrinkwrap that
            if (typeof ownerNaturalSize == 'number' && !owner.inputWidth) {
                me.beginLayoutFixed(ownerContext, (width = ownerNaturalSize * 6.5 + 20), 'px');
            }

            // Otherwise it is the same as shrinkWrap
            else {
                me.beginLayoutShrinkWrap(ownerContext);
            }
            ownerContext.setWidth(width, false);
        } else {
            me.beginLayoutFixed(ownerContext, '100', '%');
        }    
    },

    beginLayoutFixed: function (ownerContext, width, suffix) {
        var owner = ownerContext.target,
            inputEl = owner.inputEl,
            inputWidth = owner.inputWidth;

        owner.el.setStyle('table-layout', 'fixed');
        owner.bodyEl.setStyle('width', width + suffix);
        if (inputEl) {
            if (inputWidth) {
                inputEl.setStyle('width', inputWidth + 'px');
            } else {
                inputEl.setStyle('width', owner.stretchInputElFixed ? '100%' : '');
            }
        }
        ownerContext.isFixed = true;
    },

    beginLayoutShrinkWrap: function (ownerContext) {
        var owner = ownerContext.target,
            inputEl = owner.inputEl,
            inputWidth = owner.inputWidth;

        if (inputEl && inputEl.dom) {
            inputEl.dom.removeAttribute('size');
            if (inputWidth) {
                inputEl.setStyle('width', inputWidth + 'px');
            } else {
                inputEl.setStyle('width', '');
            }
        }
        owner.el.setStyle('table-layout', 'auto');
        owner.bodyEl.setStyle('width', '');
    },

    finishedLayout: function(ownerContext){
        var owner = this.owner;

        this.callParent(arguments);        
        ownerContext.labelStrategy.finishedLayout(ownerContext, owner);
        ownerContext.errorStrategy.finishedLayout(ownerContext, owner);
    },

    calculateOwnerHeightFromContentHeight: function(ownerContext, contentHeight) {
        return contentHeight;
    },

    measureContentHeight: function (ownerContext) {
        return ownerContext.el.getHeight();
    },
    
    measureContentWidth: function (ownerContext) {
        return ownerContext.el.getWidth();
    },

    measureLabelErrorHeight: function (ownerContext) {
        return ownerContext.labelStrategy.getHeight(ownerContext) +
               ownerContext.errorStrategy.getHeight(ownerContext);
    },

    onFocus: function() {
        this.getErrorStrategy().onFocus(this.owner);    
    },

    /**
     * Return the set of strategy functions from the {@link #labelStrategies labelStrategies collection}
     * that is appropriate for the field's {@link Ext.form.Labelable#labelAlign labelAlign} config.
     */
    getLabelStrategy: function() {
        var me = this,
            strategies = me.labelStrategies,
            labelAlign = me.owner.labelAlign;
        return strategies[labelAlign] || strategies.base;
    },

    /**
     * Return the set of strategy functions from the {@link #errorStrategies errorStrategies collection}
     * that is appropriate for the field's {@link Ext.form.Labelable#msgTarget msgTarget} config.
     */
    getErrorStrategy: function() {
        var me = this,
            owner = me.owner,
            strategies = me.errorStrategies,
            msgTarget = owner.msgTarget;
        return !owner.preventMark && Ext.isString(msgTarget) ?
                (strategies[msgTarget] || strategies.elementId) :
                strategies.none;
    },

    /**
     * Collection of named strategies for laying out and adjusting labels to accommodate error messages.
     * An appropriate one will be chosen based on the owner field's {@link Ext.form.Labelable#labelAlign} config.
     */
    labelStrategies: (function() {
        var base = {
                prepare: function(ownerContext, owner) {
                    var cls = owner.labelCls + '-' + owner.labelAlign,
                        labelEl = owner.labelEl;

                    if (labelEl) {
                        labelEl.addCls(cls);
                    }
                },

                getHeight: function () {
                    return 0;
                },
                
                finishedLayout: Ext.emptyFn
            };

        return {
            base: base,

            /**
             * Label displayed above the bodyEl
             */
            top: Ext.applyIf({        
                        
                getHeight: function (ownerContext) {
                    var labelContext = ownerContext.labelContext,
                        props = labelContext.props,
                        height = props.height;
                        
                    if (height === undefined) {
                        props.height = height = labelContext.el.getHeight();
                    }

                    return height;
                }
            }, base),

            /**
             * Label displayed to the left of the bodyEl
             */
            left: base,

            /**
             * Same as left, only difference is text-align in CSS
             */
            right: base
        };
    }()),

    /**
     * Collection of named strategies for laying out and adjusting insets to accommodate error messages.
     * An appropriate one will be chosen based on the owner field's {@link Ext.form.Labelable#msgTarget} config.
     */
    errorStrategies: (function() {
        function showTip(owner) {
            var tip = Ext.layout.component.field.Field.tip,
                target;
                
            if (tip && tip.isVisible()) {
                target = tip.activeTarget;
                if (target && target.el === owner.getActionEl().dom) {
                    tip.toFront(true);
                }
            }
        }

        var applyIf = Ext.applyIf,
            emptyFn = Ext.emptyFn,
            iconCls = Ext.baseCSSPrefix + 'form-invalid-icon',
            iconWidth,
            base = {
                prepare: function(ownerContext, owner) {
                    var el = owner.errorEl;
                    if (el) {
                        el.setDisplayed(false);
                    }
                },
                getHeight: function () {
                    return 0;
                },
                onFocus: emptyFn,
                finishedLayout: emptyFn
            };

        return {
            none: base,

            /**
             * Error displayed as icon (with QuickTip on hover) to right of the bodyEl
             */
            side: applyIf({
                prepare: function(ownerContext, owner) {
                    var errorEl = owner.errorEl,
                        sideErrorCell = owner.sideErrorCell,
                        displayError = owner.hasActiveError(),
                        tempEl;

                    // Capture error icon width once
                    if (!iconWidth) {
                        iconWidth = (tempEl = Ext.getBody().createChild({style: 'position:absolute', cls: iconCls})).getWidth();
                        tempEl.remove();
                    }

                    errorEl.addCls(iconCls);
                    errorEl.set({'data-errorqtip': owner.getActiveError() || ''});
                    if (owner.autoFitErrors) {
                        errorEl.setDisplayed(displayError);
                    }
                    // Not autofitting, the space must still be allocated.
                    else {
                        errorEl.setVisible(displayError);
                    }

                    // If we are auto fitting, then hide and show the entire cell
                    if (sideErrorCell && owner.autoFitErrors) {
                        sideErrorCell.setDisplayed(displayError);
                    }
                    owner.bodyEl.dom.colSpan = owner.getBodyColspan();

                    // TODO: defer the tip call until after the layout to avoid immediate DOM reads now
                    Ext.layout.component.field.Field.initTip();
                },
                onFocus: showTip
            }, base),

            /**
             * Error message displayed underneath the bodyEl
             */
            under: applyIf({
                prepare: function(ownerContext, owner) {
                    var errorEl = owner.errorEl,
                        cls = Ext.baseCSSPrefix + 'form-invalid-under';

                    errorEl.addCls(cls);
                    errorEl.setDisplayed(owner.hasActiveError());
                },
                getHeight: function (ownerContext) {
                    var height = 0,
                        errorContext, props;

                    if (ownerContext.target.hasActiveError()) {
                        errorContext = ownerContext.errorContext;
                        props = errorContext.props;
                        height = props.height;

                        if (height === undefined) {
                            props.height = height = errorContext.el.getHeight();
                        }
                    }

                    return height;
                }
            }, base),

            /**
             * Error displayed as QuickTip on hover of the field container
             */
            qtip: applyIf({
                prepare: function(ownerContext, owner) {
                    Ext.layout.component.field.Field.initTip();
                    owner.getActionEl().dom.setAttribute('data-errorqtip', owner.getActiveError() || '');
                },
                onFocus: showTip
            }, base),

            /**
             * Error displayed as title tip on hover of the field container
             */
            title: applyIf({
                prepare: function(ownerContext, owner) {
                    owner.getActionEl().dom.setAttribute('title', owner.getActiveError() || '');
                }
            }, base),

            /**
             * Error message displayed as content of an element with a given id elsewhere in the app
             */
            elementId: applyIf({
                prepare: function(ownerContext, owner) {
                    var targetEl = Ext.fly(owner.msgTarget);
                    if (targetEl) {
                        targetEl.dom.innerHTML = owner.getActiveError() || '';
                        targetEl.setDisplayed(owner.hasActiveError());
                    }
                }
            }, base)
        };
    }()),

    statics: {
        /**
         * Use a custom QuickTip instance separate from the main QuickTips singleton, so that we
         * can give it a custom frame style. Responds to errorqtip rather than the qtip property.
         * @static
         */
        initTip: function() {
            var tip = this.tip;
            if (!tip) {
                tip = this.tip = Ext.create('Ext.tip.QuickTip', {
                    ui: 'form-invalid'
                });
                tip.tagConfig = Ext.apply({}, {attribute: 'errorqtip'}, tip.tagConfig);
            }
        },

        /**
         * Destroy the error tip instance.
         * @static
         */
        destroyTip: function() {
            var tip = this.tip;
            if (tip) {
                tip.destroy();
                delete this.tip;
            }
        }
    }
});