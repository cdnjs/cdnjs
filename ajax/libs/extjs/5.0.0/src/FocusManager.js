/**
 * The FocusManager is responsible for globally:
 *
 * 1. Managing component focus
 * 2. Providing basic keyboard navigation
 * 3. (optional) Provide a visual cue for focused components, in the form of a focus ring/frame.
 *
 * To activate the FocusManager, simply call `Ext.FocusManager.enable();`. In turn, you may
 * deactivate the FocusManager by subsequently calling `Ext.FocusManager.disable();`.  The
 * FocusManager is disabled by default.
 *
 * To enable the optional focus frame, pass `true` or `{focusFrame: true}` to {@link #method-enable}.
 *
 * Another feature of the FocusManager is to provide basic keyboard focus navigation scoped to any {@link Ext.container.Container}
 * that would like to have navigation between its child {@link Ext.Component}'s.
 *
 * @author Jarred Nicholls <jarred@sencha.com>
 * @docauthor Jarred Nicholls <jarred@sencha.com>
 */
Ext.define('Ext.FocusManager', {
    singleton: true,
    alternateClassName: ['Ext.FocusMgr' ],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    requires: [
        'Ext.Component',
        'Ext.ComponentManager',
        'Ext.ComponentQuery',
        'Ext.util.HashMap',
        'Ext.util.KeyNav'
    ],

    /**
     * @property {Boolean} enabled
     * Whether or not the FocusManager is currently enabled
     */
    enabled: false,

    /**
     * @property {Ext.Component} focusedCmp
     * The currently focused component.
     */

    focusElementCls: Ext.baseCSSPrefix + 'focus-element',

    focusFrameCls: Ext.baseCSSPrefix + 'focus-frame',

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
     * @param {Ext.FocusManager} fm A reference to the FocusManager singleton
     * @param {Ext.Component} cmp The component that is being focused
     * @param {Ext.Component} previousCmp The component that was previously focused,
     * or `undefined` if there was no previously focused component.
     */

    /**
     * @event componentfocus
     * Fires after a component becomes focused.
     * @param {Ext.FocusManager} fm A reference to the FocusManager singleton
     * @param {Ext.Component} cmp The component that has been focused
     * @param {Ext.Component} previousCmp The component that was previously focused,
     * or `undefined` if there was no previously focused component.
     */

    /**
     * @event disable
     * Fires when the FocusManager is disabled
     * @param {Ext.FocusManager} fm A reference to the FocusManager singleton
     */

    /**
     * @event enable
     * Fires when the FocusManager is enabled
     * @param {Ext.FocusManager} fm A reference to the FocusManager singleton
     */

    constructor: function(config) {
        var me = this,
            CQ = Ext.ComponentQuery;

        me.mixins.observable.constructor.call(me, config);

        me.focusTask = new Ext.util.DelayedTask(me.handleComponentFocus, me);

        // Gain control on Component focus, blur, hide and destroy
        Ext.override(Ext.Component, {
            onBlur: function () {
                this.callParent(arguments);
                if (me.enabled && !this.hasFocus) {
                    Array.prototype.unshift.call(arguments, this);
                    me.onComponentBlur.apply(me, arguments);
                }
            },
            onDestroy: function() {
                this.callParent(arguments);
                if (me.enabled) {
                    Array.prototype.unshift.call(arguments, this);
                    me.onComponentDestroy.apply(me, arguments);
                }
            },
            onFocus: function () {
                this.callParent(arguments);
                if (me.enabled && this.hasFocus) {
                    Array.prototype.unshift.call(arguments, this);
                    me.onComponentFocus.apply(me, arguments);
                }
            }
        });
        Ext.override(Ext.Component, {
            afterHide: function() {
                this.callParent(arguments);
                if (me.enabled) {
                    Array.prototype.unshift.call(arguments, this);
                    me.onComponentHide.apply(me, arguments);
                }
            }
        });

        me.focusData = {};
        me.subscribers = new Ext.util.HashMap();
        me.focusChain = {};

        // Setup some ComponentQuery pseudos
        Ext.apply(CQ.pseudos, {
            // Return the single next focusable sibling from the current idx in either direction (step -1 or 1)
            nextFocus: function(cmps, idx, step) {
                step = step || 1;
                idx = parseInt(idx, 10);

                var len = cmps.length,
                    i = idx, c;

                for (;;) {
                    // Increment index, and loop round if off either end
                    if ((i += step) >= len) {
                        i = 0;
                    } else if (i < 0) {
                        i = len - 1;
                    }

                    // As soon as we loop back to the starting index, give up, there are no focusable siblings.
                    if (i === idx) {
                        return [];
                    }

                    // If we have found a focusable sibling, return it
                    if ((c = cmps[i]).isFocusable()) {
                        return [c];
                    }
                }

                return [];
            },

            prevFocus: function(cmps, idx) {
                return this.nextFocus(cmps, idx, -1);
            },

            root: function(cmps) {
                var len = cmps.length,
                    results = [],
                    i = 0,
                    c;

                for (; i < len; i++) {
                    c = cmps[i];
                    if (!c.ownerCt) {
                        results.push(c);
                    }
                }

                return results;
            }
        });
    },

    getKeyNav: function() {
        var me = this;
        me.keyNav = me.keyNav || new Ext.util.KeyNav(Ext.getDoc(), {
            disabled: true,
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
        return me.keyNav;
    },

    /**
     * Adds the specified xtype to the {@link #whitelist}.
     * @param {String/String[]} xtype Adds the xtype(s) to the {@link #whitelist}.
     */
    addXTypeToWhitelist: function(xtype) {
        var me = this;

        if (Ext.isArray(xtype)) {
            Ext.Array.forEach(xtype, me.addXTypeToWhitelist, me);
            return;
        }

        if (!Ext.Array.contains(me.whitelist, xtype)) {
            me.whitelist.push(xtype);
        }
    },

    clearComponent: function(cmp) {
        clearTimeout(this.cmpFocusDelay);
        if (!cmp.isDestroyed) {
            cmp.blur();
        }
    },

    /**
     * Disables the FocusManager by turning of all automatic focus management and keyboard navigation
     */
    disable: function() {
        var me = this;

        if (!me.enabled) {
            return;
        }

        delete me.options;
        me.enabled = false;

        me.removeDOM();

        // Stop handling key navigation
        me.getKeyNav().disable();

        me.fireEvent('disable', me);
    },

    /**
     * Enables the FocusManager by turning on all automatic focus management and keyboard navigation
     * @param {Boolean/Object} options Either `true`/`false` to turn on the focus frame, or an object
     * with the following options:
     * @param {Boolean} [options.focusFrame=false] `true` to show the focus frame around a component when it is focused.
     */
    enable: function(options) {
        var me = this;

        if (options === true) {
            options = { focusFrame: true };
        }
        me.options = options = options || {};

        if (me.enabled) {
            return;
        }

        // When calling addFocusListener on Containers, the FocusManager must be enabled, otherwise it won't do it.
        me.enabled = Ext.enableFocusManager = true;
        me.initDOM(options);

        // Start handling key navigation
        me.getKeyNav().enable();

        // Finally, let's focus our global focus el so we start fresh
        me.focusEl.focus();
        delete me.focusedCmp;

        me.fireEvent('enable', me);
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

    getRootComponents: function() {
        var CQ = Ext.ComponentQuery,
            inline = CQ.query(':focusable:root:not([floating])'),
            floating = CQ.query(':focusable:root[floating]');

        // Floating items should go to the top of our root stack, and be ordered
        // by their z-index (highest first)
        floating.sort(function(a, b) {
            return a.el.getZIndex() > b.el.getZIndex();
        });

        return floating.concat(inline);
    },

    initDOM: function(options) {
        var me = this,
            cls = me.focusFrameCls,
            needListeners = Ext.ComponentQuery.query('{getFocusEl()}:not([focusListenerAdded])'),
            i = 0, len = needListeners.length;

        if (!Ext.isReady) {
            return Ext.onReady(me.initDOM, me);
        }

        // When we are enabled, we must ensure that all Components which return a focusEl that is *not naturally focusable*
        // have focus/blur listeners enabled to then trigger onFocus/onBlur handling so that we get to know about their focus action.
        // These listeners are not added at initialization unless the FocusManager is enabled at that time.
        for (; i < len; i++) {
            needListeners[i].addFocusListener();
        }

        // Make the document body the global focus element
        if (!me.focusEl) {
            me.focusEl = Ext.getBody();
            me.focusEl.dom.tabIndex = -1;
        }

        // Create global focus frame
        if (!me.focusFrame && options.focusFrame) {
            me.focusFrame = Ext.getBody().createChild({
                cls: cls,
                children: [
                    { cls: cls + '-top' },
                    { cls: cls + '-bottom' },
                    { cls: cls + '-left' },
                    { cls: cls + '-right' }
                ],
                style: 'top: -100px; left: -100px;'
            });
            me.focusFrame.setVisibilityMode(Ext.Element.DISPLAY);
            me.focusFrame.hide().setLocalXY(0, 0);
        }
    },

    isWhitelisted: function(cmp) {
        return cmp && Ext.Array.some(this.whitelist, function(x) {
            return cmp.isXType(x);
        });
    },

    navigateIn: function(e) {
        var me = this,
            focusedCmp = me.focusedCmp,
            defaultRoot,
            firstChild;

        if (me.isWhitelisted(focusedCmp)) {
            return true;
        }

        if (!focusedCmp) {
            // No focus yet, so focus the first root cmp on the page
            defaultRoot = me.getRootComponents()[0];
            if (defaultRoot) {
                // If the default root is based upon the body, then it will already be focused, and will not fire a focus event to
                // trigger its own onFocus processing, so we have to programatically blur it first.
                if (defaultRoot.getFocusEl() === me.focusEl) {
                    me.focusEl.blur();
                }
                defaultRoot.focus();
            }
        } else {
            // Drill into child ref items of the focused cmp, if applicable.
            // This works for any Component with a getRefItems implementation.
            firstChild = focusedCmp.hasFocus ? Ext.ComponentQuery.query('>:focusable', focusedCmp)[0] : focusedCmp;
            if (firstChild) {
                firstChild.focus();
            } else {
                // Let's try to fire a click event, as if it came from the mouse
                if (Ext.isFunction(focusedCmp.onClick)) {
                    e.button = 0;
                    focusedCmp.onClick(e);
                    if (focusedCmp.isVisible(true)) {
                        focusedCmp.focus();
                    } else {
                        me.navigateOut();
                    }
                }
            }
        }
    },

    navigateOut: function(e) {
        var me = this,
            parent;

        if (!me.focusedCmp || !(parent = me.focusedCmp.up(':focusable'))) {
            me.focusEl.focus();
        } else {
            parent.focus();
        }

        // In some browsers (Chrome) FocusManager can handle this before other
        // handlers. Ext Windows have their own Esc key handling, so we need to
        // return true here to allow the event to bubble.
        return true;
    },

    navigateSiblings: function(e, source, parent) {
        var me = this,
            src = source || me,
            key = e.getKey(),
            goBack = e.shiftKey || key == e.LEFT || key == e.UP,
            checkWhitelist = key === e.LEFT || key === e.RIGHT || key === e.UP || key === e.DOWN,
            nextSelector = goBack ? 'prev' : 'next',
            idx, next, focusedCmp, siblings;

        focusedCmp = (src.focusedCmp && src.focusedCmp.comp) || src.focusedCmp;
        if (!focusedCmp && !parent) {
            return true;
        }

        if (checkWhitelist && me.isWhitelisted(focusedCmp)) {
            return true;
        }

        // If no focused Component, or a root level one was focused, then siblings are root components.
        if (!focusedCmp || focusedCmp.is(':root')) {
            siblings = me.getRootComponents();
        } else {
            // Else if the focused component has a parent, get siblings from there
            parent = parent || focusedCmp.up();
            if (parent) {
                siblings = parent.getRefItems();
            }
        }


        // Navigate if we have found siblings.
        if (siblings) {
            idx = focusedCmp ? Ext.Array.indexOf(siblings, focusedCmp) : -1;
            next = Ext.ComponentQuery.query(':' + nextSelector + 'Focus(' + idx + ')', siblings)[0];
            if (next && focusedCmp !== next) {
                next.focus();
                return next;
            }
        }
    },

    onComponentBlur: function(cmp, e) {
        var me = this;

        if (me.focusedCmp === cmp) {
            me.previousFocusedCmp = cmp;
            delete me.focusedCmp;
        }

        if (me.focusFrame) {
            me.focusFrame.hide();
        }
    },

    onComponentFocus: function(cmp, e) {
        var me = this,
            chain = me.focusChain,
            parent;

        if (!cmp.isFocusable()) {
            me.clearComponent(cmp);

            // Check our focus chain, so we don't run into a never ending recursion
            // If we've attempted (unsuccessfully) to focus this component before,
            // then we're caught in a loop of child->parent->...->child and we
            // need to cut the loop off rather than feed into it.
            if (chain[cmp.id]) {
                return;
            }

            // Try to focus the parent instead
            parent = cmp.up();
            if (parent) {
                // Add component to our focus chain to detect infinite focus loop
                // before we fire off an attempt to focus our parent.
                // See the comments above.
                chain[cmp.id] = true;
                parent.focus();
            }

            return;
        }
        // Clear our focus chain when we have a focusable component
        me.focusChain = {};

        // Capture the focusEl to frame now.
        // Button returns its encapsulating element during the focus phase
        // So that element gets styled and framed.
        me.focusTask.delay(10, null, null, [cmp, cmp.getFocusEl()]);
    },

    handleComponentFocus: function(cmp, focusEl) {
        var me = this,
            cls,
            ff,
            box,
            bt,
            bl,
            bw,
            bh,
            ft,
            fb,
            fl,
            fr;

        if (me.fireEvent('beforecomponentfocus', me, cmp, me.previousFocusedCmp) === false) {
            me.clearComponent(cmp);
            return;
        }

        me.focusedCmp = cmp;

        // If we have a focus frame, show it around the focused component
        if (me.shouldShowFocusFrame(cmp)) {
            cls = '.' + me.focusFrameCls + '-';
            ff = me.focusFrame;
            
            // focusEl may in fact be a descendant component to which to delegate focus
            box = (focusEl.dom ? focusEl : focusEl.el).getBox();

            // Size the focus frame's t/b/l/r according to the box
            // This leaves a hole in the middle of the frame so user
            // interaction w/ the mouse can continue
            bt = box.top;
            bl = box.left;
            bw = box.width;
            bh = box.height;
            ft = ff.child(cls + 'top');
            fb = ff.child(cls + 'bottom');
            fl = ff.child(cls + 'left');
            fr = ff.child(cls + 'right');

            ft.setWidth(bw).setLocalXY(bl, bt);
            fb.setWidth(bw).setLocalXY(bl, bt + bh - 2);
            fl.setHeight(bh - 2).setLocalXY(bl, bt + 2);
            fr.setHeight(bh - 2).setLocalXY(bl + bw - 2, bt + 2);

            ff.show();
        }

        me.fireEvent('componentfocus', me, cmp, me.previousFocusedCmp);
    },

    onComponentHide: function(cmp) {
        var me = this,
            cmpHadFocus = false,
            focusedCmp = me.focusedCmp,
            parent;

        if (focusedCmp) {
            // See if the Component being hidden was the focused Component, or owns the focused Component
            // In these cases, focus needs to be removed from the focused Component to the nearest focusable ancestor
            cmpHadFocus = cmp.hasFocus || (cmp.isContainer && cmp.isAncestor(me.focusedCmp));
        }

        me.clearComponent(cmp);

        // Move focus onto the nearest focusable ancestor, or this is there is none
        if (cmpHadFocus && (parent = cmp.up(':focusable'))) {
            parent.focus();
        } else {
            me.focusEl.focus();
        }
    },

    onComponentDestroy: function() {

    },

    removeDOM: function() {
        var me = this;

        // If we are still enabled globally, or there are still subscribers
        // then we will halt here, since our DOM stuff is still being used
        if (me.enabled || me.subscribers.length) {
            return;
        }

        Ext.destroy(
            me.focusFrame
        );
        delete me.focusEl;
        delete me.focusFrame;
    },

    /**
     * Removes the specified xtype from the {@link #whitelist}.
     * @param {String/String[]} xtype Removes the xtype(s) from the {@link #whitelist}.
     */
    removeXTypeFromWhitelist: function(xtype) {
        var me = this;

        if (Ext.isArray(xtype)) {
            Ext.Array.forEach(xtype, me.removeXTypeFromWhitelist, me);
            return;
        }

        Ext.Array.remove(me.whitelist, xtype);
    },

    setupSubscriberKeys: function(container, keys) {
        var me = this,
            el = container.getFocusEl(),
            scope = keys.scope,
            handlers = {
                backspace: me.focusLast,
                enter: me.navigateIn,
                esc: me.navigateOut,
                scope: me
            },

            navSiblings = function(e) {
                if (me.focusedCmp === container) {
                    // Root the sibling navigation to this container, so that we
                    // can automatically dive into the container, rather than forcing
                    // the user to hit the enter key to dive in.
                    return me.navigateSiblings(e, me, container);
                } else {
                    return me.navigateSiblings(e);
                }
            };

        Ext.iterate(keys, function(key, cb) {
            handlers[key] = function(e) {
                var ret = navSiblings(e);

                if (Ext.isFunction(cb) && cb.call(scope || container, e, ret) === true) {
                    return true;
                }

                return ret;
            };
        }, me);

        return new Ext.util.KeyNav(el, handlers);
    },

    shouldShowFocusFrame: function(cmp) {
        var me = this,
            opts = me.options || {};

        // Do not show a focus frame if
        // 1. We are configured not to.
        // 2. No Component was passed
        if (!me.focusFrame || !cmp) {
            return false;
        }

        // Global trumps
        if (opts.focusFrame) {
            return true;
        }

        if (me.focusData[cmp.id].focusFrame) {
            return true;
        }

        return false;
    }
});
