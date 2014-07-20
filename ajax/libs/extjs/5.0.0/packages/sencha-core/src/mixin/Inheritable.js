/**
 * A mixin that provides the functionality for inheritable configs. This allows linking
 * components and containers via a prototype-chained object for accessing inherited
 * values.
 *
 * ## Getting Inherited Properties
 *
 * A component's inherited state is used to keep track of aspects of a component's state
 * that might be influenced by its ancestors like "collapsed" and "hidden". For example:
 *
 *      var hidden = this.getInheritedConfig('hidden');
 *
 * The above will produce `true` if this or any ancestor component has its `hidden` config
 * set to `true`.
 *
 * ## Chained Objects
 *
 * Inheritable properties are implemented by chaining each component's inherited state
 * object to its parent container's inherited state object via the prototype. The result
 * is such that if a component's `inheritedState` does not have it's own property, it
 * inherits the property from the nearest ancestor that does.
 *
 * In the case of a Container, two state objects are created. The primary ("outer") object
 * is used for reading inherited properties. It is also what a child will prototype chain
 * to if that child is not part of the container's `items` collection. Anything in the
 * `items` collection will chain to the inheritedStateInner object instead. This object is
 * prototype chained to inheritedState but allows for Container's layout to set inherited
 * properties that specifically apply only to children of the container. This inner object
 * is unlikely to be needed by user code.
 *
 * ## Publishing Inherited Properties
 *
 * The first step to publishing inherited properties is to override `initInheritedState`
 * and add properties that have inheritable values.
 *
 *      initInheritedState: function (inheritedState) {
 *          this.callParent(arguments);
 *
 *          if (this.getHidden()) {
 *              inheritedState.hidden = true;
 *          }
 *      }
 *
 * The above is important because `initInheritedState` is called whenever the object needs
 * to be repopulated. As you can see, only `true` values are added to `inheritedState` in
 * this case because `false` would mask a `hidden` value of `true` from an ancestor.
 *
 * If these values change dynamically, these properties must be maintained. For example:
 *
 *      updateHidden: function (hidden) {
 *          var inherited = this.getInherited();
 *
 *          if (hidden) {
 *              inherited.hidden = true;
 *          } else {
 *              // Unmask whatever may be inherited:
 *              delete inherited.hidden;
 *          }
 *      }
 *
 * ## Proper Usage
 *
 * ALWAYS access inherited state using `getInherited` or `getInheritedConfig`, not by
 * accessing `inheritedState` directly.
 *
 * The `inheritedState` property does not exist until the first call to `getInherited`. At
 * that point `getInherited` walks up the component tree to establish the `inheritedState`
 * prototype chain. Additionally the `inheritedState` property should NOT be relied upon
 * even after the initial call to `getInherited` because it is possible for it to become
 * invalid.
 *
 * Invalidation typically happens when a component is moved to a new container. In such a
 * case the `inheritedState` remains invalid until the next time `getInherited` is called
 * on the component or one of its descendants.
 * @private
 * @since 5.0.0
 */
Ext.define('Ext.mixin.Inheritable', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'inheritable'
    },

    /**
     * This method returns an object containing the inherited properties for this instance.
     *
     * @param {Boolean} [inner=false] Pass `true` to return `inheritedStateInner` instead
     * of the normal `inheritedState` object. This is only needed internally and should
     * not be passed by user code.
     *
     * @return {Object} The `inheritedState` object containing inherited properties.
     * @since 5.0.0
     */
    getInherited: function (inner) {
        var me = this,
            inheritedState = (inner && me.inheritedStateInner) || me.inheritedState,
            ownerCt = me.ownerCt || me.initOwnerCt,
            isContainer = me.isContainer,
            parent, inheritedStateInner, getInner;

        if (!inheritedState || inheritedState.invalid) {
            // Use upward navigational link, not ownerCt.
            // 99% of the time, this will use ownerCt/floatParent.
            // Certain floating components do not have an ownerCt, but they are still linked
            // into a navigational hierarchy. The getRefOwner method normalizes these differences.
            parent = me.getRefOwner();

            if (ownerCt) {
                // This will only be true if the item is a "child" of its owning container
                // For example, a docked item will not get the inner inheritedState.
                getInner = me.ownerLayout === ownerCt.layout;
            }

            me.inheritedState = inheritedState =
                // chain this component's inheritedState to that of its parent.  If it
                // doesn't have a parent, then chain to the rootInheritedState.  This is
                // done so that when there is a viewport, all component's will inherit
                // from its inheritedState, even components that are not descendants of
                // the viewport.
                Ext.Object.chain(parent ? parent.getInherited(getInner)
                                        : Ext.rootInheritedState);

            if (isContainer) {
                me.inheritedStateInner = inheritedStateInner = Ext.Object.chain(inheritedState);
            }

            me.initInheritedState(inheritedState, inheritedStateInner);

            // initInheritedState is allowed to replace the objects we provide, so we go
            // back to the instance here at the end.
            inheritedState = (isContainer && inner) ? me.inheritedStateInner : me.inheritedState;
        }

        return inheritedState;
    },

    /**
     * This method returns the value of a config property that may be inherited from some
     * ancestor.
     *
     * In some cases, a config may be explicitly set on a component with the intent of
     * *only* being presented to its children while that component should act upon the
     * inherited value (see `referenceHolder` for example). In these cases the `skipThis`
     * parameter should be specified as `true`.
     *
     * @param {String} property The name of the config property to return.
     * @param {Boolean} [skipThis=false] Pass `true` if the property should be ignored if
     * found on this instance. In other words, `true` means the property must be inherited
     * and not explicitly set on this instance.
     * @return {Mixed} The value of the requested `property`.
     * @since 5.0.0
     */
    getInheritedConfig: function (property, skipThis) {
        var state = this.inheritedState,
            old, ret;

        // Avoid the extra method call since user has already made one to get here
        if (!state || state.invalid) {
            state = this.getInherited();
        }

        ret = state[property];

        if (skipThis && state.hasOwnProperty(property)) {
            old = ret;

            delete state[property];
            ret = state[property];

            state[property] = old;
        }

        return ret;
    },

    /**
     * Sets up a reference on our current reference holder.
     *
     * @private
     */
    fixReference: function() {
        var me = this,
            refHolder;

        if (me.reference) {
            refHolder = me.lookupReferenceHolder();
            if (refHolder) {
                refHolder.attachReference(me);
            }
        }
    },

    /**
     * Gets the Controller or Component that is used as the event root for this view.
     *
     * @param {Object} [defaultScope=this] The default scope to return if none is found.
     * @return {Ext.app.ViewController/Ext.container.Container} The default listener scope.
     *
     * @protected
     * @since 5.0.0
     */
    resolveListenerScope: function (defaultScope) {
        var ret,
            isThis = defaultScope === 'this',
            preventClimb = isThis || defaultScope === 'controller';

        // If defaultScope is 'this' or 'controller', we only ever want to resolve to our own defaultListenerScope
        // on ourselves, we never want to climb up
        if (preventClimb) {
            if (isThis) {
                ret = this;
            } else {
                ret = this.getController();
            }
        } else {
            ret = this.getInheritedConfig('defaultListenerScope', true) || defaultScope;
        }
        return ret || null;
    },

    /**
     * Gets the Controller or Component that is used as the reference holder for this view.
     *
     * @param {Boolean} [skipThis=true] `false` to return this as the reference holder if
     * this instance has set `referenceHolder`. Unlike `getInheritedConfig` this method
     * defaults to `true` because it is possible that a `reference` property set by the
     * owner of a component that is also a `referenceHolder` itself. In this case, the
     * `reference` connects not to this component but to the parent referenceHolder.
     *
     * @return {Ext.app.ViewController/Ext.container.Container} The reference holder.
     *
     * @private
     * @since 5.0.0
     */
    lookupReferenceHolder: function (skipThis) {
        return this.getInheritedConfig('referenceHolder', skipThis !== false) || null;
    },

    /**
     * Used by {@link Ext.ComponentQuery ComponentQuery}, and the {@link Ext.Component#up up}
     * method to find the owning Component in the linkage hierarchy.
     *
     * By default this returns the Container which contains this Component.
     *
     * This may be overridden by Component authors who implement ownership hierarchies
     * which are not based upon ownerCt, such as BoundLists being owned by Fields or Menus
     * being owned by Buttons.
     * @protected
     */
    getRefOwner: function () {
        return this.ownerCt || this.initOwnerCt || this.floatParent;
    },

    /**
     * This method is called to initialize the `inheritedState` objects for this instance.
     * This amounts to typically copying certain properties from the instance to the given
     * object.
     *
     * @param {Object} inheritedState The state object for this instance.
     * @param {Object} [inheritedStateInner] This object is only provided for containers.
     * @method
     * @protected
     * @since 5.0.0
     */
    initInheritedState: Ext.emptyFn,

    /**
     * This method marks the current inherited state as invalid. The next time a call is
     * made to `getInherited` the objects will be recreated and initialized.
     * @private
     * @since 5.0.0
     */
    invalidateInheritedState: function () {
        var inheritedState = this.inheritedState;

        if (inheritedState) {
            // if component has a inheritedState at this point we set an invalid flag in
            // the inheritedState so descendants of this component know to re-initialize
            // their inheritedState the next time it is requested (see getInherited())
            inheritedState.invalid = true;

            // We can now delete the old inheritedState since it is invalid.  IMPORTANT:
            // the descendants are still linked to the old inheritedState via the
            // prototype chain, and their inheritedState property will be synced up
            // the next time their getInherited() method is called.  For this reason
            // inheritedState should always be accessed using getInherited()
            delete this.inheritedState;
        }
    }
},
function () {
    /**
     * @property {Object} rootInheritedState
     * The top level inheritedState to which all other inheritedStates are chained. If
     * there is a `Viewport` instance, this object becomes the Viewport's inheritedState.
     * See also {@link Ext.Component#getInherited}.
     *
     * @private
     * @member Ext
     * @since 5.0.0
     */
    Ext.rootInheritedState = {};
});
