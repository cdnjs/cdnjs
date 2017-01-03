Ext.define('Ext.aria.menu.KeyNav', {
    override: 'Ext.menu.KeyNav',
    
    tab: function(e) {
        var me = this,
            menu = me.menu,
            focusedItem = menu.focusedItem,
            mgr = Ext['aria'].FocusManager, // Don't need the dependency
            owner, ev;
        
        if (!focusedItem) {
            return false;
        }
        
        owner = me.ariaFindMenuOwner(focusedItem);
        
        if (owner) {
            // Hiding the menu modifies the original event that caused it,
            // so we have to keep a clone and reuse it a bit later
            ev = e.clone();
            Ext.defer(function() { mgr.navigateSiblings(ev, { focusedCmp: owner }) }, 10);
            me.escape(e);
        }
        
        return false;
    },
    
    enter: function(e) {
        var menu = this.menu,
            focused = menu.focusedItem;
        
        if (focused && !focused.isFormField && focused.onClick) {
            focused.onClick(e);
        }
        else {
            this.callParent(arguments);
        }
    },
    
    focusNextItem: function(step) {
        var menu = this.menu,
            focusedItem = menu.focusedItem,
            count = 0,
            items, startIdx, idx, len, item;
        
        items    = menu.query(':focusable');
        startIdx = focusedItem ? Ext.Array.indexOf(items, focusedItem) : -1;
        idx      = startIdx + step;
        len      = items.length;
        
        while (count < len && idx !== startIdx) {
            if (idx < 0) {
                idx = len - 1;
            }
            else if (idx >= len) {
                idx = 0;
            }
            
            item = items[idx];
            
            if (menu.canActivateItem(item)) {
                menu.setActiveItem(item);
                break;
            }
            
            idx += step;
            ++count;
        }
    },
    
    ariaFindMenuOwner: function(cmp) {
        var menu;
        
        menu = cmp.up('menu[ownerButton],menu[ownerCt]');
        
        if (!menu) {
            return null;
        }
        
        if (menu.ownerButton) {
            return menu.ownerButton;
        }
        else {
            return menu.ownerCt;
        }
    }
});
