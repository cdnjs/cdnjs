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
// This override adds diagnostics to the Ext.layout.ContextItem class.

/**
 */
Ext.define('Ext.diag.layout.ContextItem', {
    override: 'Ext.layout.ContextItem',

    /** @ignore */
    requires: [
        'Ext.layout.Context',
        'Ext.diag.layout.Context'
    ],

    addBlock: function (name, layout, propName) {
        //Ext.log(this.id,'.',propName,' ',name,': ',this.getLayoutName(layout));
        (layout.blockedBy || (layout.blockedBy = {}))[
            this.id+'.'+propName+(name.substring(0,3)=='dom' ? ':dom' : '')] = 1;

        return this.callParent(arguments);
    },

    addBoxChild: function (boxChildItem) {
        var ret = this.callParent(arguments),
            boxChildren = this.boxChildren,
            boxParents;

        if (boxChildren && boxChildren.length == 1) {
            // the boxParent collection is created by the run override found in
            // Ext.diag.layout.Context, but IE sometimes does not load that override, so
            // we work around it for now
            boxParents = this.context.boxParents ||
                        (this.context.boxParents = new Ext.util.MixedCollection());
            boxParents.add(this);
        }

        return ret;
    },

    addTrigger: function (propName, inDom) {
        var layout = this.context.currentLayout,
            triggers;

        //Ext.log(this.id,'.',propName,' ',inDom ? ':dom' : '',' ',this.getLayoutName(layout));
        this.callParent(arguments);

        triggers = this.context.triggersByLayoutId;
        (triggers[layout.id] || (triggers[layout.id] = {}))[
            this.id+'.'+propName+(inDom ? ':dom' : '')] = {
                item: this,
                name: propName
            };
    },

    checkAuthority: function (prop) {
        var me = this,
            model = me[prop + 'Model'], // not me.sizeModel[prop] since it is immutable
            layout = me.context.currentLayout,
            ok,
            setBy;

        if (layout == me.target.ownerLayout) {
            // the ownerLayout is only allowed to set calculated dimensions
            ok = model.calculated;
        } else if (layout.isComponentLayout) {
            // the component's componentLayout (normally) is only allowed to set auto or
            // configured dimensions. The exception is when a component is run w/o its
            // ownerLayout in the picture (isTopLevel), someone must publish the lastBox
            // values and that lucky layout is the componentLayout (kinda had to be since
            // the ownerLayout is not running)
            ok = me.isTopLevel || model.auto || model.configured;
        }

        if (!ok) {
            setBy = me.getLayoutName(layout);

            Ext.log(setBy + ' cannot set ' + prop);
        }
    },

    clearBlocks: function (name, propName) {
        var collection = this[name],
            blockedLayouts = collection && collection[propName],
            key = this.id+'.'+propName+(name.substring(0,3)=='dom' ? ':dom' : ''),
            layout, layoutId;

        if (blockedLayouts) {
            for (layoutId in blockedLayouts) {
                layout = blockedLayouts[layoutId];
                delete layout.blockedBy[key];
            }
        }
        return this.callParent(arguments);
    },

    getEl: function (el) {
        var child = this.callParent(arguments);
        if (child && child !== this && child.parent !== this) {
            Ext.Error.raise({
                msg: 'Got element from wrong component'
            });
        }
        return child;
    },

    init: function () {
        var me = this,
            ret;

        ret = me.callParent(arguments);

        if (me.context.logOn.initItem) {
            Ext.log(me.id, ' consumers: content=', me.consumersContentWidth,'/',me.consumersContentHeight,
                ', container=', me.consumersContainerWidth,'/',me.consumersContainerHeight,
                ', size=', me.consumersWidth,'/',me.consumersHeight);
        }

        return ret;
    },

    invalidate: function () {
        if (this.wrapsComponent) {
            if (this.context.logOn.invalidate) {
                Ext.log('invalidate: ', this.id);
            }
        } else {
            Ext.Error.raise({
                msg: 'Cannot invalidate an element contextItem'
            });
        }
        return this.callParent(arguments);
    },

    setProp: function (propName, value, dirty) {
        var me = this,
            layout = me.context.currentLayout,
            setBy = me.getLayoutName(layout),
            fullName = me.id + '.' + propName,
            setByProps;

        if (value !== null) {
            setByProps = me.setBy || (me.setBy = {});
            if (!setByProps[propName]) {
                setByProps[propName] = setBy;
            } else if (setByProps[propName] != setBy) {
                Ext.log({level: 'warn'}, 'BAD! ', fullName, ' set by ', setByProps[propName], ' and ', setBy);
            }
        }

        if (me.context.logOn.setProp) {
            if (typeof value != 'undefined' && !isNaN(value) && me.props[propName] !== value) {
                Ext.log('set ', fullName, ' = ', value, ' (', dirty, ')');
            }
        }

        return this.callParent(arguments);
    },

    setHeight: function (height, dirty, /* private */force) {
        if (!force && this.wrapsComponent) {
            this.checkAuthority('height');
        }

        return this.callParent(arguments);
    },

    setWidth: function (width, dirty, /* private */force) {
        if (!force && this.wrapsComponent) {
            this.checkAuthority('width');
        }

        return this.callParent(arguments);
    }
},
function () {
    this.prototype.getLayoutName = Ext.layout.Context.prototype.getLayoutName;
});
