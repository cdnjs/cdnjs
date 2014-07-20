/**
 * The FocusManager is responsible for managing the following according to WAI ARIA practices:
 *
 * 1. Component focus
 * 2. Keyboard navigation
 * 3. Provide a visual cue for focused components, in the form of a focus ring/frame.
 *
 */
 
Ext.define('Ext.aria.FocusManager', {
    singleton: true,

    requires: [
        'Ext.FocusManager',
        'Ext.util.KeyNav',
        'Ext.util.Observable'
    ],

    mixins: {
        observable:'Ext.util.Observable'
    },

    /**
     * @property {Boolean} enabled
     * Whether or not the FocusManager is currently enabled
     */
    enabled: false,

    /**
     * @property {Ext.Component} focusedCmp
     * The currently focused component.
     */

    /**
     * @property {String[]} whitelist
     * A list of xtypes that should ignore certain navigation input keys and
     * allow for the default browser event/behavior. These input keys include:
     *
     * 1. Backspace
     * 2. Delete
     * 3. Left
     * 4. Right
     * 5. Up
     * 6. Down
     *
     * The FocusManager will not attempt to navigate when a component is an xtype (or descendents thereof)
     * that belongs to this whitelist. E.g., an {@link Ext.form.field.Text} should allow
     * the user to move the input cursor left and right, and to delete characters, etc.
     */
    whitelist: [
        'textfield'
    ],

    /**
     * @event beforecomponentfocus
     * Fires before a component becomes focused. Return `false` to prevent
     * the component from gaining focus.
     * @param {Ext.aria.FocusManager} fm A reference to the FocusManager singleton
     * @param {Ext.Component} cmp The component that is being focused
     * @param {Ext.Component} previousCmp The component that was previously focused,
     * or `undefined` if there was no previously focused component.
     */

    /**
     * @event componentfocus
     * Fires after a component becomes focused.
     * @param {Ext.aria.FocusManager} fm A reference to the FocusManager singleton
     * @param {Ext.Component} cmp The component that has been focused
     * @param {Ext.Component} previousCmp The component that was previously focused,
     * or `undefined` if there was no previously focused component.
     */

    /**
     * @event disable
     * Fires when the FocusManager is disabled
     * @param {Ext.aria.FocusManager} fm A reference to the FocusManager singleton
     */

    /**
     * @event enable
     * Fires when the FocusManager is enabled
     * @param {Ext.aria.FocusManager} fm A reference to the FocusManager singleton
     */
    
    // Array to keep track of open windows
    windows: [],

    constructor: function(config) {
        var me = this,
            whitelist = me.whitelist,
            cache, i, len;

        me.mixins.observable.constructor.call(me, config);

        // Convert whitelist to object to speed up lookups
        me.whitelistCache = cache = {};
        
        for (i = 0, len = whitelist.length; i < len; i++) {
            cache[whitelist[i]] = true;
        }
    },

    /**
     * Adds the specified xtype to the {@link #whitelist}.
     * @param {String/String[]} xtype Adds the xtype(s) to the {@link #whitelist}.
     */
    addXTypeToWhitelist: function(xtype) {
        var me = this,
            whitelist = me.whitelist,
            cache = me.whitelistCache;

        if (Ext.isArray(xtype)) {
            Ext.Array.forEach(xtype, me.addXTypeToWhitelist, me);
            
            return;
        }

        if (!cache[xtype]) {
            whitelist.push(xtype);
            cache[xtype] = true;
        }
    },

    /**
     * Removes the specified xtype from the {@link #whitelist}.
     * @param {String/String[]} xtype Removes the xtype(s) from the {@link #whitelist}.
     */
    removeXTypeFromWhitelist: function(xtype) {
        var me = this,
            whitelist = me.whitelist,
            cache = me.whitelistCache;

        if (Ext.isArray(xtype)) {
            Ext.Array.forEach(xtype, me.removeXTypeFromWhitelist, me);
            
            return;
        }

        Ext.Array.remove(whitelist, xtype);
        delete cache[xtype];
    },

    isWhitelisted: function(cmp) {
        if (!cmp) {
            return false;
        }
        
        var cache = this.whitelistCache,
            type = cmp.getXType(),
            key;
            
        if (cache[type]) {
            return true;
        }
        
        // Not in the cache, might be a subclass, lets check here
        // We can also add it to the cache so we don't need to
        // do this again!
        for (key in cache) {
            if (cache.hasOwnProperty(key)) {
                if (cmp.isXType(key)) {
                    cache[key] = true;
                    return true;
                }
            }
        }
        
        return false;
    },

    clearComponent: function(cmp) {
        if (!cmp.isDestroyed) {
            cmp.blur();
        }
    },

    /**
     * Enables the FocusManager by turning on all automatic focus management and keyboard navigation
     * @param {Boolean/Object} options Either `true`/`false` to turn on the focus frame, or an object
     * with the following options:
     */
    enable: function() {
        var me = this,
            doc = Ext.getDoc();

        if (me.enabled) {
            return;
        }

        // initDom will call addFocusListener which needs the FocusManager to be enabled
        me.enabled = Ext.enableFocusManager = true;
        me.initDOM();

        // Setup KeyNav that's bound to document to catch all
        // unhandled/bubbled key events for navigation
        me.keyNav = new Ext.util.KeyNav({
            target: doc,
            scope: me,

            backspace: me.focusLast,
            enter: me.navigateIn,
            esc: me.navigateOut,
            tab: me.navigateSiblings,
            space: me.navigateIn,
            del: me.focusLast,
            left: me.navigateSiblings,
            right: me.navigateSiblings,
            down: me.navigateSiblings,
            up: me.navigateSiblings
        });
        
        // map F6 to toggle focus among open windows
        me.toggleKeyMap = new Ext.util.KeyMap({
            target: doc,
            scope: me,
            defaultEventAction: 'stopEvent',
            key: Ext.event.Event.F6,
            fn: me.toggleWindow
        });
        
        me.fireEvent('enable', me);
    },
    
    initViewport: function() {
        var me = this,
            cmp, el;
        
        // Make the container with role 'application' the global focus element
        // If no component with role application, then assign the role to viewport
        cmp = Ext.ComponentQuery.query('container[ariaRole=application]')[0];
        
        if (!cmp) {
            cmp = Ext.ComponentQuery.query('viewport')[0];
            if (cmp) {
                cmp.ariaUpdate({ role: 'application' });
            }
        }
        
        if (!cmp) {
            Ext.Error.raise('Failed to initialize ARIA support. No viewport or component with ariaRole of "application" was found.');
            
            return;
        }
        
        me.defaultFocusCmp = cmp;

        // create a dummy div with tabindex 0 at the end of the document.
        // This element will receive focus when the user wants to tab out of the application
        me.addStepOutDiv(cmp);
        
        // IE has an issue where it will not trigger the first focus on a viewport.
        // This is because the body is already focused & it won't trigger focus.
        // Focus something else, so that the element gets focus. 
        if (Ext.isIE) {
            el = cmp.getFocusEl();
            el = el ? el.dom : null;
            if (Ext.Element.getActiveElement() === el) {
                me.stepOutDiv.focus();
            }
        }

        // the first focused cmp (the application) is the first open window
        me.addWindow(cmp, cmp);
    },

    focusLast: function(e) {
        var me = this;

        if (me.isWhitelisted(me.focusedCmp)) {
            return true;
        }

        // Go back to last focused item
        if (me.previousFocusedCmp) {
            me.previousFocusedCmp.focus();
        }
    },

    initDOM: function() {
        var me = this,
            needListeners,
            i, len, cmp;

        if (!Ext.isReady) {
            return Ext.onReady(me.initDOM, me);
        }

        // When we are enabled, we must ensure that all Components which return a focusEl that is *not naturally focusable*
        // have focus/blur listeners enabled to then trigger onFocus/onBlur handling so that we get to know about their focus action.
        // These listeners are not added at initialization unless the FocusManager is enabled at that time.
        needListeners = Ext.ComponentQuery.query('{getFocusEl()}:not([focusListenerAdded])');
        len = needListeners.length;
        
        for (i = 0; i < len; i++) {
            cmp = needListeners[i];
            cmp.addFocusListener();
        }
    },
        
    getFocusedCmp: function () {
        return this.focusedCmp || this.defaultFocusCmp;
    },
        
    navigateIn: function(e, cmp, backward) {
        var me = this,
            focusedCmp = cmp || me.focusedCmp,
            firstChild;
        
        if (!focusedCmp) {
            // No focus yet, so use the default
            me.focusDefault();
            
            return false;
        }

        if (!focusedCmp.ariaIsSection() || me.isWhitelisted(focusedCmp)) {
            // if the focusedCmp is not a section or is white listed then let the event bubble
            return true;
        }
        else {
            firstChild = backward ? focusedCmp.ariaLastChild(e) : focusedCmp.ariaFirstChild(e);
            
            if (firstChild) {
                firstChild.focus();
            }
            else {
                return true;
            }
        }
        
        return false;
    },

    navigateOut: function(e, cmp) {
        var me = this,
            focusedCmp = cmp || me.focusedCmp,
            parent, candidateParent;

        if (!focusedCmp) {
            // No focus yet, so use the default
            me.focusDefault();
            
            return false;
        }

        parent = focusedCmp.ariaGetFocusableSection();

        if (parent && parent !== focusedCmp) {
            // Tab panels should "focus out" on tabs instead of themselves,
            // except when the tab is already focused, then we want to go
            // to the panel itself
            if (parent.isTabPanel) {
                candidateParent = parent.ariaFirstChild();
                
                if (!parent.ariaIsOwnTab(focusedCmp)) {
                    parent = candidateParent;
                }
            }
            
            // Some components (currently triggerfield and subclasses), have special
            // ways of handling blurring, so we need to force a call here to
            // ensure the blurring occurs properly.
            else if (focusedCmp.triggerBlur) {
                focusedCmp.triggerBlur();
            }
            
            parent.focus();
            
            return false;
        }
        
        // Windows have their own Esc key handling, so we need to
        // return true here to allow the event to bubble.
        return true;
    },

    navigateSiblings: function(e, source) {
        var me = this,
            src = source || me,
            key = e.getKey(),
            goBack = e.shiftKey || key === e.LEFT || key === e.UP,
            keyPress = key === e.LEFT || key === e.RIGHT || key === e.UP || key === e.DOWN,
            focusedCmp = src.focusedCmp,
            nextCmp, isWhiteListed;
        
        // Ctrl-tab should fall back to default browser behavior
        if (key === Ext.EventObject.TAB && e.ctrlKey) {
            return true;
        }

        if (!focusedCmp) {
            // No focus yet. Focus the default
            me.focusDefault();
            
            return false;
        }

        isWhiteListed = me.isWhitelisted(focusedCmp);
        if (keyPress && isWhiteListed) {
            return true;
        }
        
        // If we're inside a whitelisted field, a tab is akin to
        // left/right or up/down, so treat it as such. The exception is
        // if we're in a form, where we need to navigate between fieldsets
        // and other form-like containers.
        if (!keyPress && isWhiteListed) {
            keyPress = !focusedCmp.up('form');
        }

        if (keyPress) {
            if (goBack) {
                nextCmp = focusedCmp.ariaPreviousSibling('{isFocusable()}', true);
            }
            else {
                nextCmp = focusedCmp.ariaNextSibling('{isFocusable()}', true);
            }
        }

        if (!nextCmp) {
            if (goBack) {
                nextCmp = focusedCmp.ariaPreviousNode();
            }
            else {
                nextCmp = focusedCmp.ariaNextNode();
            }
        }

        if (!nextCmp && focusedCmp.ariaIsSection() && !focusedCmp.isWindow) {
           // The user is tabbing out of the application to the browser
           // set the focus to a dummy component placed at the end of the document
           if (!goBack) {
                me.stepOutOfApp(e);
           }
            // return true so the event bubbles and reaches the browser
            return true;
        }
        else if (nextCmp) {
            nextCmp.focus();
        }

        return false;
    },

    onComponentBlur: function(cmp, e) {
        var me = this;

        if (me.focusedCmp === cmp) {
            me.previousFocusedCmp = cmp;
        }

        Ext.globalEvents.fireEvent('componentblur', me, cmp, me.previousFocusedCmp);
        
        return false;
    },

    onComponentFocus: function(cmp, e) {
        var me = this;
        
        if (Ext.globalEvents.fireEvent('beforecomponentfocus', me, cmp, me.previousFocusedCmp) === false) {
            me.clearComponent(cmp);
            
            return;
        }
        
        me.focusedCmp = cmp;
        
        return false;
    },

    onComponentHide: function(cmp) {
        var me = this,
            cmpHadFocus = false,
            focusedCmp = me.focusedCmp,
            nextFocus;

        if (focusedCmp) {
            // See if the Component being hidden was the focused Component, or owns the focused Component
            // In these cases, focus needs to be removed from the focused Component to the nearest focusable ancestor
            cmpHadFocus = cmp.hasFocus || (cmp.isContainer && cmp.isAncestor(me.focusedCmp));
        }

        me.clearComponent(cmp);

        // Move focus onto the nearest parent. If the parent does not exist focus the default
        if (cmpHadFocus) {
            nextFocus = cmp.ariaGetFocusFallback();
            
            if (nextFocus) {
                nextFocus.focus();
                
                return;
            }
            
            me.focusDefault();
        }
    },

    // Do nothing for now
    onComponentDestroy: Ext.emptyFn,

    focusDefault: function(delay) {
        this.defaultFocusCmp.focus(false, delay);
    },

    addStepOutDiv: function(app) {
        var appEl = app.getEl(),
            stepOut;
        
        stepOut = appEl.createChild({
            tag: 'div',
            title: 'Step Out of Application', // should this be localized?
            tabIndex: 0
        });

        // Set the tab index of the app to 0 so it will get focus when tabbing in from the browser
        appEl.set({ tabIndex: 0 });

        this.stepOutDiv = stepOut;
    },

    stepOutOfApp: function(e) {
        var me = this;
        
        delete me.focusedCmp;
        me.stepOutDiv.focus();
    },

    toggleWindow: function(key, e) {
        var me = this,
            windows = me.windows,
            length = windows.length,
            focusedCmp = me.focusedCmp,
            curIndex = 0,
            newIndex = 0,
            current;

        if (length === 1) {
            return;
        }
        
        current = focusedCmp.isWindow ? focusedCmp : focusedCmp.up('window');
        
        if (current) {
            curIndex = me.findWindowIndex(current);
        }

        if (e.shiftKey) {
            newIndex = curIndex - 1;
            
            if (newIndex < 0) {
                newIndex = length - 1;
            }
        } else {
            newIndex = curIndex + 1;
            
            if (newIndex === length) {
                newIndex = 0;
            }
        }
        
        current = windows[newIndex];
        
        if (current.cmp.isWindow) {
            current.cmp.toFront();
        }
        
        current.cmp.focus(false, 100);
        
        return false;
    },

    addWindow: function(window, defaultFocus) {
        var me = this,
            win = {
                cmp: window
            };

        me.windows.push(win);
        defaultFocus.focus(false, 100);
    },

    removeWindow: function(window) {
        var me = this,
            windows = me.windows,
            current;
        
        if (windows.length === 1) {
            return;
        }
        
        current = me.findWindowIndex(window);
        
        if (current >= 0) {
            Ext.Array.erase(windows, current, 1);
        }
    },

    findWindowIndex: function(window) {
        var me = this,
            windows = me.windows,
            length = windows.length,
            curIndex = -1,
            i;
        
        for (i = 0; i < length; i++) {
            if (windows[i].cmp === window) {
                curIndex = i;
                
                break;
            }
        }
        
        return curIndex;
    }
},

function() {
    var mgr = Ext.FocusManager = Ext.aria.FocusManager;
    
    Ext.onReady(function() {
        mgr.enable();
    });
});
