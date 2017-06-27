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
 * This layout manages multiple child Components, each fitted to the Container, where only a single child Component can be
 * visible at any given time.  This layout style is most commonly used for wizards, tab implementations, etc.
 * This class is intended to be extended or created via the layout:'card' {@link Ext.container.Container#layout} config,
 * and should generally not need to be created directly via the new keyword.
 *
 * The CardLayout's focal method is {@link #setActiveItem}.  Since only one panel is displayed at a time,
 * the only way to move from one Component to the next is by calling setActiveItem, passing the next panel to display
 * (or its id or index).  The layout itself does not provide a user interface for handling this navigation,
 * so that functionality must be provided by the developer.
 *
 * To change the active card of a container, call the setActiveItem method of its layout:
 *
 *     @example
 *     var p = Ext.create('Ext.panel.Panel', {
 *         layout: 'card',
 *         items: [
 *             { html: 'Card 1' },
 *             { html: 'Card 2' }
 *         ],
 *         renderTo: Ext.getBody()
 *     });
 *
 *     p.getLayout().setActiveItem(1);
 * 
 * The {@link Ext.Component#beforedeactivate beforedeactivate} and {@link Ext.Component#beforeactivate beforeactivate}
 * events can be used to prevent a card from activating or deactivating by returning `false`.
 * 
 *     @example   
 *     var active = 0;
 *     var main = Ext.create('Ext.panel.Panel', {
 *         renderTo: Ext.getBody(),
 *         width: 200,
 *         height: 200,
 *         layout: 'card',
 *         tbar: [{
 *             text: 'Next',
 *             handler: function(){
 *                 var layout = main.getLayout();
 *                 ++active;
 *                 layout.setActiveItem(active);
 *                 active = main.items.indexOf(layout.getActiveItem());
 *             }
 *         }],
 *         items: [{
 *             title: 'P1'
 *         }, {
 *             title: 'P2'
 *         }, {
 *             title: 'P3',
 *             listeners: {
 *                 beforeactivate: function(){
 *                     return false;
 *                 }
 *             }
 *         }]
 *     });
 *
 * In the following example, a simplistic wizard setup is demonstrated.  A button bar is added
 * to the footer of the containing panel to provide navigation buttons.  The buttons will be handled by a
 * common navigation routine.  Note that other uses of a CardLayout (like a tab control) would require a
 * completely different implementation.  For serious implementations, a better approach would be to extend
 * CardLayout to provide the custom functionality needed.
 *
 *     @example
 *     var navigate = function(panel, direction){
 *         // This routine could contain business logic required to manage the navigation steps.
 *         // It would call setActiveItem as needed, manage navigation button state, handle any
 *         // branching logic that might be required, handle alternate actions like cancellation
 *         // or finalization, etc.  A complete wizard implementation could get pretty
 *         // sophisticated depending on the complexity required, and should probably be
 *         // done as a subclass of CardLayout in a real-world implementation.
 *         var layout = panel.getLayout();
 *         layout[direction]();
 *         Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
 *         Ext.getCmp('move-next').setDisabled(!layout.getNext());
 *     };
 *
 *     Ext.create('Ext.panel.Panel', {
 *         title: 'Example Wizard',
 *         width: 300,
 *         height: 200,
 *         layout: 'card',
 *         bodyStyle: 'padding:15px',
 *         defaults: {
 *             // applied to each contained panel
 *             border: false
 *         },
 *         // just an example of one possible navigation scheme, using buttons
 *         bbar: [
 *             {
 *                 id: 'move-prev',
 *                 text: 'Back',
 *                 handler: function(btn) {
 *                     navigate(btn.up("panel"), "prev");
 *                 },
 *                 disabled: true
 *             },
 *             '->', // greedy spacer so that the buttons are aligned to each side
 *             {
 *                 id: 'move-next',
 *                 text: 'Next',
 *                 handler: function(btn) {
 *                     navigate(btn.up("panel"), "next");
 *                 }
 *             }
 *         ],
 *         // the panels (or "cards") within the layout
 *         items: [{
 *             id: 'card-0',
 *             html: '<h1>Welcome to the Wizard!</h1><p>Step 1 of 3</p>'
 *         },{
 *             id: 'card-1',
 *             html: '<p>Step 2 of 3</p>'
 *         },{
 *             id: 'card-2',
 *             html: '<h1>Congratulations!</h1><p>Step 3 of 3 - Complete</p>'
 *         }],
 *         renderTo: Ext.getBody()
 *     });
 */
Ext.define('Ext.layout.container.Card', {

    /* Begin Definitions */

    extend: 'Ext.layout.container.Fit',

    alternateClassName: 'Ext.layout.CardLayout',

    alias: 'layout.card',

    /* End Definitions */

    type: 'card',

    hideInactive: true,

    /**
     * @cfg {Boolean} deferredRender
     * True to render each contained item at the time it becomes active, false to render all contained items
     * as soon as the layout is rendered (defaults to false).  If there is a significant amount of content or
     * a lot of heavy controls being rendered into panels that are not displayed by default, setting this to
     * true might improve performance.
     */
    deferredRender : false,
    
    getRenderTree: function () {
        var me = this,
            activeItem = me.getActiveItem();

        if (activeItem) {

            // If they veto the activate, we have no active item
            if (activeItem.hasListeners.beforeactivate && activeItem.fireEvent('beforeactivate', activeItem) === false) {
 
                // We must null our activeItem reference, AND the one in our owning Container.
                // Because upon layout invalidation, renderChildren will use this.getActiveItem which
                // uses this.activeItem || this.owner.activeItem
                activeItem = me.activeItem = me.owner.activeItem = null;
            }
            
            // Item is to be the active one. Fire event after it is first layed out
            else if (activeItem.hasListeners.activate) {
                activeItem.on({
                    boxready: function() {
                        activeItem.fireEvent('activate', activeItem);
                    },
                    single: true
                });
            }

            if (me.deferredRender) {
                if (activeItem) {
                    return me.getItemsRenderTree([activeItem]);
                }
            } else {
                return me.callParent(arguments);
            }
        }
    },

    renderChildren: function () {
        var me = this,
            active = me.getActiveItem();
            
        if (!me.deferredRender) {
            me.callParent();
        } else if (active) {
            // ensure the active item is configured for the layout
            me.renderItems([active], me.getRenderTarget());
        }
    },

    isValidParent : function(item, target, position) {
        // Note: Card layout does not care about order within the target because only one is ever visible.
        // We only care whether the item is a direct child of the target.
        var itemEl = item.el ? item.el.dom : Ext.getDom(item);
        return (itemEl && itemEl.parentNode === (target.dom || target)) || false;
    },

    /**
     * Return the active (visible) component in the layout.
     * @returns {Ext.Component}
     */
    getActiveItem: function() {
        var me = this,
            // Ensure the calculated result references a Component
            result = me.parseActiveItem(me.activeItem || (me.owner && me.owner.activeItem));

        // Sanitize the result in case the active item is no longer there.
        if (result && me.owner.items.indexOf(result) != -1) {
            me.activeItem = result;
        } else {
            me.activeItem = null;
        }

        return me.activeItem;
    },

    // @private
    parseActiveItem: function(item) {
        if (item && item.isComponent) {
            return item;
        } else if (typeof item == 'number' || item === undefined) {
            return this.getLayoutItems()[item || 0];
        } else {
            return this.owner.getComponent(item);
        }
    },

    // @private. Called before both dynamic render, and bulk render.
    // Ensure that the active item starts visible, and inactive ones start invisible
    configureItem: function(item) {
        if (item === this.getActiveItem()) {
            item.hidden = false;
        } else {
            item.hidden = true;
        }
        this.callParent(arguments);
    },

    onRemove: function(component) {
        var me = this;
        
        if (component === me.activeItem) {
            me.activeItem = null;
        }
    },

    // @private
    getAnimation: function(newCard, owner) {
        var newAnim = (newCard || {}).cardSwitchAnimation;
        if (newAnim === false) {
            return false;
        }
        return newAnim || owner.cardSwitchAnimation;
    },

    /**
     * Return the active (visible) component in the layout to the next card
     * @returns {Ext.Component} The next component or false.
     */
    getNext: function() {
        var wrap = arguments[0],
            items = this.getLayoutItems(),
            index = Ext.Array.indexOf(items, this.activeItem);
            
        return items[index + 1] || (wrap ? items[0] : false);
    },

    /**
     * Sets the active (visible) component in the layout to the next card
     * @return {Ext.Component} the activated component or false when nothing activated.
     */
    next: function() {
        var anim = arguments[0], 
            wrap = arguments[1];
        return this.setActiveItem(this.getNext(wrap), anim);
    },

    /**
     * Return the active (visible) component in the layout to the previous card
     * @returns {Ext.Component} The previous component or false.
     */
    getPrev: function() {
        var wrap = arguments[0],
            items = this.getLayoutItems(),
            index = Ext.Array.indexOf(items, this.activeItem);
            
        return items[index - 1] || (wrap ? items[items.length - 1] : false);
    },

    /**
     * Sets the active (visible) component in the layout to the previous card
     * @return {Ext.Component} the activated component or false when nothing activated.
     */
    prev: function() {
        var anim = arguments[0], 
            wrap = arguments[1];
        return this.setActiveItem(this.getPrev(wrap), anim);
    },

    /**
     * Makes the given card active.
     *
     *     var card1 = Ext.create('Ext.panel.Panel', {itemId: 'card-1'});
     *     var card2 = Ext.create('Ext.panel.Panel', {itemId: 'card-2'});
     *     var panel = Ext.create('Ext.panel.Panel', {
     *         layout: 'card',
     *         activeItem: 0,
     *         items: [card1, card2]
     *     });
     *     // These are all equivalent
     *     panel.getLayout().setActiveItem(card2);
     *     panel.getLayout().setActiveItem('card-2');
     *     panel.getLayout().setActiveItem(1);
     *
     * @param {Ext.Component/Number/String} newCard  The component, component {@link Ext.Component#id id},
     * {@link Ext.Component#itemId itemId}, or index of component.
     * @return {Ext.Component} the activated component or false when nothing activated.
     * False is returned also when trying to activate an already active card.
     */
    setActiveItem: function(newCard) {
        var me = this,
            owner = me.owner,
            oldCard = me.activeItem,
            rendered = owner.rendered,
            newIndex;

        newCard = me.parseActiveItem(newCard);
        newIndex = owner.items.indexOf(newCard);

        // If the card is not a child of the owner, then add it.
        // Without doing a layout!
        if (newIndex == -1) {
            newIndex = owner.items.items.length;
            Ext.suspendLayouts();
            newCard = owner.add(newCard);
            Ext.resumeLayouts();
        }

        // Is this a valid, different card?
        if (newCard && oldCard != newCard) {
            // Fire the beforeactivate and beforedeactivate events on the cards
            if (newCard.fireEvent('beforeactivate', newCard, oldCard) === false) {
                return false;
            }
            if (oldCard && oldCard.fireEvent('beforedeactivate', oldCard, newCard) === false) {
                return false;
            }

            if (rendered) {
                Ext.suspendLayouts();

                // If the card has not been rendered yet, now is the time to do so.
                if (!newCard.rendered) {
                    me.renderItem(newCard, me.getRenderTarget(), owner.items.length);
                }

                if (oldCard) {
                    if (me.hideInactive) {
                        oldCard.hide();
                        oldCard.hiddenByLayout = true;
                    }
                    oldCard.fireEvent('deactivate', oldCard, newCard);
                }
                // Make sure the new card is shown
                if (newCard.hidden) {
                    newCard.show();
                }

                // Layout needs activeItem to be correct, so set it if the show has not been vetoed
                if (!newCard.hidden) {
                    me.activeItem = newCard;
                }
                Ext.resumeLayouts(true);
            } else {
                me.activeItem = newCard;
            }

            newCard.fireEvent('activate', newCard, oldCard);

            return me.activeItem;
        }
        return false;
    }
});
