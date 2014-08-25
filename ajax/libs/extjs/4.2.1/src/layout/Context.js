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
 * Manages context information during a layout.
 *
 * # Algorithm
 *
 * This class performs the following jobs:
 *
 *  - Cache DOM reads to avoid reading the same values repeatedly.
 *  - Buffer DOM writes and flush them as a block to avoid read/write interleaving.
 *  - Track layout dependencies so each layout does not have to figure out the source of
 *    its dependent values.
 *  - Intelligently run layouts when the values on which they depend change (a trigger).
 *  - Allow layouts to avoid processing when required values are unavailable (a block).
 *
 * Work done during layout falls into either a "read phase" or a "write phase" and it is
 * essential to always be aware of the current phase. Most methods in
 * {@link Ext.layout.Layout Layout} are called during a read phase:
 * {@link Ext.layout.Layout#calculate calculate},
 * {@link Ext.layout.Layout#completeLayout completeLayout} and
 * {@link Ext.layout.Layout#finalizeLayout finalizeLayout}. The exceptions to this are
 * {@link Ext.layout.Layout#beginLayout beginLayout},
 * {@link Ext.layout.Layout#beginLayoutCycle beginLayoutCycle} and
 * {@link Ext.layout.Layout#finishedLayout finishedLayout} which are called during
 * a write phase. While {@link Ext.layout.Layout#finishedLayout finishedLayout} is called
 * a write phase, it is really intended to be a catch-all for post-processing after a
 * layout run.
 * 
 * In a read phase, it is OK to read the DOM but this should be done using the appropriate
 * {@link Ext.layout.ContextItem ContextItem} where possible since that provides a cache
 * to avoid redundant reads. No writes should be made to the DOM in a read phase! Instead,
 * the values should be written to the proper ContextItem for later write-back.
 * 
 * The rules flip-flop in a write phase. The only difference is that ContextItem methods
 * like {@link Ext.layout.ContextItem#getStyle getStyle} will still read the DOM unless the
 * value was previously read. This detail is unknowable from the outside of ContextItem, so
 * read calls to ContextItem should also be avoided in a write phase.
 *
 * Calculating interdependent layouts requires a certain amount of iteration. In a given
 * cycle, some layouts will contribute results that allow other layouts to proceed. The
 * general flow then is to gather all of the layouts (both component and container) in a
 * component tree and queue them all for processing. The initial queue order is bottom-up
 * and component layout first, then container layout (if applicable) for each component.
 *
 * This initial step also calls the beginLayout method on all layouts to clear any values
 * from the DOM that might interfere with calculations and measurements. In other words,
 * this is a "write phase" and reads from the DOM should be strictly avoided.
 * 
 * Next the layout enters into its iterations or "cycles". Each cycle consists of calling
 * the {@link Ext.layout.Layout#calculate calculate} method on all layouts in the
 * {@link #layoutQueue}. These calls are part of a "read phase" and writes to the DOM should
 * be strictly avoided.
 *
 * # Considerations
 *
 * **RULE 1**: Respect the read/write cycles. Always use the {@link Ext.layout.ContextItem#getProp getProp}
 * or {@link Ext.layout.ContextItem#getDomProp getDomProp} methods to get calculated values;
 * only use the {@link Ext.layout.ContextItem#getStyle getStyle} method to read styles; use
 * {@link Ext.layout.ContextItem#setProp setProp} to set DOM values. Some reads will, of
 * course, still go directly to the DOM, but if there is a method in
 * {@link Ext.layout.ContextItem ContextItem} to do a certain job, it should be used instead
 * of a lower-level equivalent.
 *
 * The basic logic flow in {@link Ext.layout.Layout#calculate calculate} consists of gathering
 * values by calling {@link Ext.layout.ContextItem#getProp getProp} or
 * {@link Ext.layout.ContextItem#getDomProp getDomProp}, calculating results and publishing
 * them by calling {@link Ext.layout.ContextItem#setProp setProp}. It is important to realize
 * that {@link Ext.layout.ContextItem#getProp getProp} will return `undefined` if the value
 * is not yet known. But the act of calling the method is enough to track the fact that the
 * calling layout depends (in some way) on this value. In other words, the calling layout is
 * "triggered" by the properties it requests.
 *
 * **RULE 2**: Avoid calling {@link Ext.layout.ContextItem#getProp getProp} unless the value
 * is needed. Gratuitous calls cause inefficiency because the layout will appear to depend on
 * values that it never actually uses. This applies equally to
 * {@link Ext.layout.ContextItem#getDomProp getDomProp} and the test-only methods
 * {@link Ext.layout.ContextItem#hasProp hasProp} and {@link Ext.layout.ContextItem#hasDomProp hasDomProp}.
 *
 * Because {@link Ext.layout.ContextItem#getProp getProp} can return `undefined`, it is often
 * the case that subsequent math will produce NaN's. This is usually not a problem as the
 * NaN's simply propagate along and result in final results that are NaN. Both `undefined`
 * and NaN are ignored by {@link Ext.layout.ContextItem#setProp}, so it is often not necessary
 * to even know that this is happening. It does become important for determining if a layout
 * is not done or if it might lead to publishing an incorrect (but not NaN or `undefined`)
 * value.
 * 
 * **RULE 3**: If a layout has not calculated all the values it is required to calculate, it
 * must set {@link Ext.layout.Layout#done done} to `false` before returning from
 * {@link Ext.layout.Layout#calculate calculate}. This value is always `true` on entry because
 * it is simpler to detect the incomplete state rather than the complete state (especially up
 * and down a class hierarchy).
 * 
 * **RULE 4**: A layout must never publish an incomplete (wrong) result. Doing so would cause
 * dependent layouts to run their calculations on those wrong values, producing more wrong
 * values and some layouts may even incorrectly flag themselves as {@link Ext.layout.Layout#done done}
 * before the correct values are determined and republished. Doing this will poison the
 * calculations.
 *
 * **RULE 5**: Each value should only be published by one layout. If multiple layouts attempt
 * to publish the same values, it would be nearly impossible to avoid breaking **RULE 4**. To
 * help detect this problem, the layout diagnostics will trap on an attempt to set a value
 * from different layouts.
 *
 * Complex layouts can produce many results as part of their calculations. These values are
 * important for other layouts to proceed and need to be published by the earliest possible
 * call to {@link Ext.layout.Layout#calculate} to avoid unnecessary cycles and poor performance. It is
 * also possible, however, for some results to be related in a way such that publishing them
 * may be an all-or-none proposition (typically to avoid breaking *RULE 4*).
 * 
 * **RULE 6**: Publish results as soon as they are known to be correct rather than wait for
 * all values to be calculated. Waiting for everything to be complete can lead to deadlock.
 * The key here is not to forget **RULE 4** in the process.
 *
 * Some layouts depend on certain critical values as part of their calculations. For example,
 * HBox depends on width and cannot do anything until the width is known. In these cases, it
 * is best to use {@link Ext.layout.ContextItem#block block} or
 * {@link Ext.layout.ContextItem#domBlock domBlock} and thereby avoid processing the layout
 * until the needed value is available.
 *
 * **RULE 7**: Use {@link Ext.layout.ContextItem#block block} or
 * {@link Ext.layout.ContextItem#domBlock domBlock} when values are required to make progress.
 * This will mimize wasted recalculations.
 *
 * **RULE 8**: Blocks should only be used when no forward progress can be made. If even one
 * value could still be calculated, a block could result in a deadlock.
 *
 * Historically, layouts have been invoked directly by component code, sometimes in places
 * like an `afterLayout` method for a child component. With the flexibility now available
 * to solve complex, iterative issues, such things should be done in a responsible layout
 * (be it component or container).
 *
 * **RULE 9**: Use layouts to solve layout issues and don't wait for the layout to finish to
 * perform further layouts. This is especially important now that layouts process entire
 * component trees and not each layout in isolation.
 *
 * # Sequence Diagram
 *
 * The simplest sequence diagram for a layout run looks roughly like this:
 *
 *       Context         Layout 1     Item 1     Layout 2     Item 2
 *          |               |           |           |           |
 *     ---->X-------------->X           |           |           |
 *     run  X---------------|-----------|---------->X           |
 *          X beginLayout   |           |           |           |
 *          X               |           |           |           |
 *        A X-------------->X           |           |           |
 *          X  calculate    X---------->X           |           |
 *          X             C X  getProp  |           |           |
 *        B X               X---------->X           |           |
 *          X               |  setProp  |           |           |
 *          X               |           |           |           |
 *        D X---------------|-----------|---------->X           |
 *          X  calculate    |           |           X---------->X
 *          X               |           |           |  setProp  |
 *        E X               |           |           |           |
 *          X---------------|-----------|---------->X           |
 *          X completeLayout|           |         F |           |
 *          X               |           |           |           |
 *        G X               |           |           |           |
 *        H X-------------->X           |           |           |
 *          X  calculate    X---------->X           |           |
 *          X             I X  getProp  |           |           |
 *          X               X---------->X           |           |
 *          X               |  setProp  |           |           |
 *        J X-------------->X           |           |           |
 *          X completeLayout|           |           |           |
 *          X               |           |           |           |
 *        K X-------------->X           |           |           |
 *          X---------------|-----------|---------->X           |
 *          X finalizeLayout|           |           |           |
 *          X               |           |           |           |
 *        L X-------------->X           |           |           |
 *          X---------------|-----------|---------->X           |
 *          X finishedLayout|           |           |           |
 *          X               |           |           |           |
 *        M X-------------->X           |           |           |
 *          X---------------|-----------|---------->X           |
 *          X notifyOwner   |           |           |           |
 *        N |               |           |           |           |
 *          -               -           -           -           -
 *
 *
 * Notes:
 *
 * **A.** This is a call from the {@link #run} method to the {@link #runCycle} method.
 * Each layout in the queue will have its {@link Ext.layout.Layout#calculate calculate}
 * method called.
 *
 * **B.** After each {@link Ext.layout.Layout#calculate calculate} method is called the
 * {@link Ext.layout.Layout#done done} flag is checked to see if the Layout has completed.
 * If it has completed and that layout object implements a
 * {@link Ext.layout.Layout#completeLayout completeLayout} method, this layout is queued to
 * receive its call. Otherwise, the layout will be queued again unless there are blocks or
 * triggers that govern its requeueing.
 * 
 * **C.** The call to {@link Ext.layout.ContextItem#getProp getProp} is made to the Item
 * and that will be tracked as a trigger (keyed by the name of the property being requested).
 * Changes to this property will cause this layout to be requeued. The call to
 * {@link Ext.layout.ContextItem#setProp setProp} will place a value in the item and not
 * directly into the DOM.
 * 
 * **D.** Call the other layouts now in the first cycle (repeat **B** and **C** for each
 * layout).
 * 
 * **E.** After completing a cycle, if progress was made (new properties were written to
 * the context) and if the {@link #layoutQueue} is not empty, the next cycle is run. If no
 * progress was made or no layouts are ready to run, all buffered values are written to
 * the DOM (a flush).
 *
 * **F.** After flushing, any layouts that were marked as {@link Ext.layout.Layout#done done}
 * that also have a {@link Ext.layout.Layout#completeLayout completeLayout} method are called.
 * This can cause them to become no longer done (see {@link #invalidate}). As with
 * {@link Ext.layout.Layout#calculate calculate}, this is considered a "read phase" and
 * direct DOM writes should be avoided.
 * 
 * **G.** Flushing and calling any pending {@link Ext.layout.Layout#completeLayout completeLayout}
 * methods will likely trigger layouts that called {@link Ext.layout.ContextItem#getDomProp getDomProp}
 * and unblock layouts that have called {@link Ext.layout.ContextItem#domBlock domBlock}.
 * These variants are used when a layout needs the value to be correct in the DOM and not
 * simply known. If this does not cause at least one layout to enter the queue, we have a
 * layout FAILURE. Otherwise, we continue with the next cycle.
 * 
 * **H.** Call {@link Ext.layout.Layout#calculate calculate} on any layouts in the queue
 * at the start of this cycle. Just a repeat of **B** through **G**.
 * 
 * **I.** Once the layout has calculated all that it is resposible for, it can leave itself
 * in the {@link Ext.layout.Layout#done done} state. This is the value on entry to
 * {@link Ext.layout.Layout#calculate calculate} and must be cleared in that call if the
 * layout has more work to do.
 * 
 * **J.** Now that all layouts are done, flush any DOM values and
 * {@link Ext.layout.Layout#completeLayout completeLayout} calls. This can again cause
 * layouts to become not done, and so we will be back on another cycle if that happens.
 * 
 * **K.** After all layouts are done, call the {@link Ext.layout.Layout#finalizeLayout finalizeLayout}
 * method on any layouts that have one. As with {@link Ext.layout.Layout#completeLayout completeLayout},
 * this can cause layouts to become no longer done. This is less desirable than using
 * {@link Ext.layout.Layout#completeLayout completeLayout} because it will cause all
 * {@link Ext.layout.Layout#finalizeLayout finalizeLayout} methods to be called again
 * when we think things are all wrapped up.
 *
 * **L.** After finishing the last iteration, layouts that have a
 * {@link Ext.layout.Layout#finishedLayout finishedLayout} method will be called. This
 * call will only happen once per run and cannot cause layouts to be run further.
 *
 * **M.** After calling finahedLayout, layouts that have a
 * {@link Ext.layout.Layout#notifyOwner notifyOwner} method will be called. This
 * call will only happen once per run and cannot cause layouts to be run further.
 *
 * **N.** One last flush to make sure everything has been written to the DOM.
 *
 * # Inter-Layout Collaboration
 * 
 * Many layout problems require collaboration between multiple layouts. In some cases, this
 * is as simple as a component's container layout providing results used by its component
 * layout or vise-versa. A slightly more distant collaboration occurs in a box layout when
 * stretchmax is used: the child item's component layout provides results that are consumed
 * by the ownerCt's box layout to determine the size of the children.
 *
 * The various forms of interdependence between a container and its children are described by
 * each components' {@link Ext.AbstractComponent#getSizeModel size model}.
 *
 * To facilitate this collaboration, the following pairs of properties are published to the
 * component's {@link Ext.layout.ContextItem ContextItem}:
 *
 *  - width/height: These hold the final size of the component. The layout indicated by the
 *    {@link Ext.AbstractComponent#getSizeModel size model} is responsible for setting these.
 *  - contentWidth/contentHeight: These hold size information published by the container
 *    layout or from DOM measurement. These describe the content only. These values are
 *    used by the component layout to determine the outer width/height when that component
 *    is {@link Ext.AbstractComponent#shrinkWrap shrink-wrapped}. They are also used to
 *    determine overflow. All container layouts must publish these values for dimensions
 *    that are shrink-wrapped. If a component has raw content (not container items), the
 *    componentLayout must publish these values instead.
 * 
 * @private
 */
Ext.define('Ext.layout.Context', {
    requires: [
        'Ext.util.Queue',
        'Ext.layout.ContextItem',
        'Ext.layout.Layout',
        'Ext.fx.Anim',
        'Ext.fx.Manager'
    ],

    remainingLayouts: 0,

    /**
     * @property {Number} state One of these values:
     *
     *  - 0 - Before run
     *  - 1 - Running
     *  - 2 - Run complete
     */
    state: 0,

    constructor: function (config) {
        var me = this;

        Ext.apply(me, config);

        // holds the ContextItem collection, keyed by element id
        me.items = {};

        // a collection of layouts keyed by layout id
        me.layouts = {};

        // the number of blocks of any kind:
        me.blockCount = 0;
        // the number of cycles that have been run:
        me.cycleCount = 0;
        // the number of flushes to the DOM:
        me.flushCount = 0;
        // the number of layout calculate calls:
        me.calcCount = 0;

        me.animateQueue = me.newQueue();
        me.completionQueue = me.newQueue();
        me.finalizeQueue = me.newQueue();
        me.finishQueue = me.newQueue();
        me.flushQueue = me.newQueue();

        me.invalidateData = {};

        /**
         * @property {Ext.util.Queue} layoutQueue
         * List of layouts to perform.
         */
        me.layoutQueue = me.newQueue();

        // this collection is special because we ensure that there are no parent/child pairs
        // present, only distinct top-level components
        me.invalidQueue = [];

        me.triggers = {
            data: {
                /*
                layoutId: [
                    { item: contextItem, prop: propertyName }
                ]
                */
            },
            dom: {}
        };
    },

    callLayout: function (layout, methodName) {
        this.currentLayout = layout;
        layout[methodName](this.getCmp(layout.owner));
    },

    cancelComponent: function (comp, isChild, isDestroying) {
        var me = this,
            components = comp,
            isArray = !comp.isComponent,
            length = isArray ? components.length : 1,
            i, k, klen, items, layout, newQueue, oldQueue, entry, temp,
            ownerCtContext;

        for (i = 0; i < length; ++i) {
            if (isArray) {
                comp = components[i];
            }

            // If the component is being destroyed, remove the component's ContextItem from its parent's contextItem.childItems array
            if (isDestroying && comp.ownerCt) {
                ownerCtContext = this.items[comp.ownerCt.el.id];
                if (ownerCtContext) {
                    Ext.Array.remove(ownerCtContext.childItems, me.getCmp(comp));
                }
            }

            if (!isChild) {
                oldQueue = me.invalidQueue;
                klen = oldQueue.length;

                if (klen) {
                    me.invalidQueue = newQueue = [];
                    for (k = 0; k < klen; ++k) {
                        entry = oldQueue[k];
                        temp = entry.item.target;
                        if (temp != comp && !temp.isDescendant(comp)) {
                            newQueue.push(entry);
                        }
                    }
                }
            }

            layout = comp.componentLayout;
            me.cancelLayout(layout);

            if (layout.getLayoutItems) {
                items = layout.getLayoutItems();
                if (items.length) {
                    me.cancelComponent(items, true);
                }
            }

            if (comp.isContainer && !comp.collapsed) {
                layout = comp.layout;
                me.cancelLayout(layout);

                items = layout.getVisibleItems();
                if (items.length) {
                    me.cancelComponent(items, true);
                }
            }
        }
    },

    cancelLayout: function (layout) {
        var me = this;

        me.completionQueue.remove(layout);
        me.finalizeQueue.remove(layout);
        me.finishQueue.remove(layout);
        me.layoutQueue.remove(layout);

        if (layout.running) {
            me.layoutDone(layout);
        }

        layout.ownerContext = null;
    },

    clearTriggers: function (layout, inDom) {
        var id = layout.id,
            collection = this.triggers[inDom ? 'dom' : 'data'],
            triggers = collection && collection[id],
            length = (triggers && triggers.length) || 0,
            i, item, trigger;

        for (i = 0; i < length; ++i) {
            trigger = triggers[i];
            item = trigger.item;

            collection = inDom ? item.domTriggers : item.triggers;
            delete collection[trigger.prop][id];
        }
    },

    /**
     * Flushes any pending writes to the DOM by calling each ContextItem in the flushQueue.
     */
    flush: function () {
        var me = this,
            items = me.flushQueue.clear(),
            length = items.length, i;

        if (length) {
            ++me.flushCount;

            for (i = 0; i < length; ++i) {
                items[i].flush();
            }
        }
    },

    flushAnimations: function() {
        var me = this,
            items = me.animateQueue.clear(),
            len = items.length,
            i;

        if (len) {
            for (i = 0; i < len; i++) {
                // Each Component may refuse to participate in animations.
                // This is used by the BoxReorder plugin which drags a Component,
                // during which that Component must be exempted from layout positioning.
                if (items[i].target.animate !== false) {
                    items[i].flushAnimations();
                }
            }

            // Ensure the first frame fires now to avoid a browser repaint with the elements in the "to" state
            // before they are returned to their "from" state by the animation.
            Ext.fx.Manager.runner();
        }
    },

    flushInvalidates: function () {
        var me = this,
            queue = me.invalidQueue,
            length = queue && queue.length,
            comp, components, entry, i;

        me.invalidQueue = [];

        if (length) {
            components = [];
            for (i = 0; i < length; ++i) {
                comp = (entry = queue[i]).item.target;
                // we filter out-of-body components here but allow them into the queue to
                // ensure that their child components are coalesced out (w/no additional
                // cost beyond our normal effort to avoid parent/child components in the
                // queue)
                if (!comp.container.isDetachedBody) {
                    components.push(comp);

                    if (entry.options) {
                        me.invalidateData[comp.id] = entry.options;
                    }
                }
            }

            me.invalidate(components, null);
        }
    },

    flushLayouts: function (queueName, methodName, dontClear) {
        var me = this,
            layouts = dontClear ? me[queueName].items : me[queueName].clear(),
            length = layouts.length,
            i, layout;

        if (length) {
            for (i = 0; i < length; ++i) {
                layout = layouts[i];
                if (!layout.running) {
                    me.callLayout(layout, methodName);
                }
            }
            me.currentLayout = null;
        }
    },

    /**
     * Returns the ContextItem for a component.
     * @param {Ext.Component} cmp
     */
    getCmp: function (cmp) {
        return this.getItem(cmp, cmp.el);
    },

    /**
     * Returns the ContextItem for an element.
     * @param {Ext.layout.ContextItem} parent
     * @param {Ext.dom.Element} el
     */
    getEl: function (parent, el) {
        var item = this.getItem(el, el);

        if (!item.parent) {
            item.parent = parent;

            // all items share an empty children array (to avoid null checks), so we can
            // only push on to the children array if there is already something there (we
            // copy-on-write):
            if (parent.children.length) {
                parent.children.push(item);
            } else {
                parent.children = [ item ]; // now parent has its own children[] (length=1)
            }
        }

        return item;
    },

    getItem: function (target, el) {
        var id = el.id,
            items = this.items,
            item = items[id] ||
                  (items[id] = new Ext.layout.ContextItem({
                                    context: this,
                                    target: target,
                                    el: el
                                }));

        return item;
    },

    handleFailure: function () {
        // This method should never be called, but is need when layouts fail (hence the
        // "should never"). We just disconnect any of the layouts from the run and return
        // them to the state they would be in had the layout completed properly.
        var layouts = this.layouts,
            layout, key;

        Ext.failedLayouts = (Ext.failedLayouts || 0) + 1;

        for (key in layouts) {
            layout = layouts[key];

            if (layouts.hasOwnProperty(key)) {
                layout.running      = false;
                layout.ownerContext = null;
            }
        }

        //<debug>
        if (Ext.repoDevMode && !this.pageAnalyzerMode) {
            Ext.Error.raise('Layout run failed');
        } else {
            Ext.log.error('Layout run failed');
        }
        //</debug>
    },

    /**
     * Invalidates one or more components' layouts (component and container). This can be
     * called before run to identify the components that need layout or during the run to
     * restart the layout of a component. This is called internally to flush any queued
     * invalidations at the start of a cycle. If called during a run, it is not expected
     * that new components will be introduced to the layout.
     * 
     * @param {Ext.Component/Array} components An array of Components or a single Component.
     * @param {Boolean} full True if all properties should be invalidated, otherwise only
     *  those calculated by the component should be invalidated.
     */
    invalidate: function (components, full) {
        var me = this,
            isArray = !components.isComponent,
            containerLayoutDone,
            firstTime, i, comp, item, items, length, componentLayout, layout,
            invalidateOptions, token;

        for (i = 0, length = isArray ? components.length : 1; i < length; ++i) {
            comp = isArray ? components[i] : components;

            if (comp.rendered && !comp.hidden) {
                item = me.getCmp(comp);
                
                // Layout optimizations had to be disabled because they break
                // Dock layout behavior.
//                 if (item.optOut) {
//                     continue;
//                 }

                componentLayout = comp.componentLayout;
                firstTime = !componentLayout.ownerContext;
                layout = (comp.isContainer && !comp.collapsed) ? comp.layout : null;

                // Extract any invalidate() options for this item.
                invalidateOptions = me.invalidateData[item.id];
                delete me.invalidateData[item.id];

                // We invalidate the contextItem's in a top-down manner so that SizeModel
                // info for containers is available to their children. This is a critical
                // optimization since sizeModel determination often requires knowing the
                // sizeModel of the ownerCt. If this weren't cached as we descend, this
                // would be an O(N^2) operation! (where N=number of components, or 300+/-
                // in Themes)
                token = item.init(full, invalidateOptions);

                if (invalidateOptions) {
                    me.processInvalidate(invalidateOptions, item, 'before');
                }

                // Allow the component layout a chance to effect its size model before we
                // recurse down the component hierarchy (since children need to know the
                // size model of their ownerCt).
                if (componentLayout.beforeLayoutCycle) {
                    componentLayout.beforeLayoutCycle(item);
                }
                
                if (layout && layout.beforeLayoutCycle) {
                    // allow the container layout take a peek as well. Table layout can
                    // influence its children's styling due to the interaction of nesting
                    // table-layout:fixed and auto inside each other without intervening
                    // elements of known size.
                    layout.beforeLayoutCycle(item);
                }

                // Finish up the item-level processing that is based on the size model of
                // the component.
                token = item.initContinue(token);

                // Start this state variable at true, since that is the value we want if
                // they do not apply (i.e., no work of this kind on which to wait).
                containerLayoutDone = true;

                // A ComponentLayout MUST implement getLayoutItems to allow its children
                // to be collected. Ext.container.Container does this, but non-Container
                // Components which manage Components as part of their structure (e.g.,
                // HtmlEditor) must still return child Components via getLayoutItems.
                if (componentLayout.getLayoutItems) {
                    componentLayout.renderChildren();

                    items = componentLayout.getLayoutItems();
                    if (items.length) {
                        me.invalidate(items, true);
                    }
                }

                if (layout) {
                    containerLayoutDone = false;
                    layout.renderChildren();

                    items = layout.getVisibleItems();
                    if (items.length) {
                        me.invalidate(items, true);
                    }
                }

                // Finish the processing that requires the size models of child items to
                // be determined (and some misc other stuff).
                item.initDone(containerLayoutDone);

                // Inform the layouts that we are about to begin (or begin again) now that
                // the size models of the component and its children are setup.
                me.resetLayout(componentLayout, item, firstTime);
                if (layout) {
                    me.resetLayout(layout, item, firstTime);
                }

                // This has to occur after the component layout has had a chance to begin
                // so that we can determine what kind of animation might be needed. TODO-
                // move this determination into the layout itself.
                item.initAnimation();

                if (invalidateOptions) {
                    me.processInvalidate(invalidateOptions, item, 'after');
                }
            }
        }

        me.currentLayout = null;
    },

    layoutDone: function (layout) {
        var ownerContext = layout.ownerContext;

        layout.running = false;

        // Once a component layout completes, we can mark it as "done".
        if (layout.isComponentLayout) {
            if (ownerContext.measuresBox) {
                ownerContext.onBoxMeasured(); // be sure to release our boxParent
            }

            ownerContext.setProp('done', true);
        } else {
            ownerContext.setProp('containerLayoutDone', true);
        }

        --this.remainingLayouts;
        ++this.progressCount; // a layout completion is progress
    },

    newQueue: function () {
        return new Ext.util.Queue();
    },

    processInvalidate: function (options, item, name) {
        // When calling a callback, the currentLayout needs to be adjusted so
        // that whichever layout caused the invalidate is the currentLayout...
        if (options[name]) {
            var me = this,
                currentLayout = me.currentLayout;

            me.currentLayout = options.layout || null;

            options[name](item, options);

            me.currentLayout = currentLayout;
        }
    },

    /**
     * Queues a ContextItem to have its {@link Ext.layout.ContextItem#flushAnimations} method called.
     *
     * @param {Ext.layout.ContextItem} item
     * @private
     */
    queueAnimation: function (item) {
        this.animateQueue.add(item);
    },

    /**
     * Queues a layout to have its {@link Ext.layout.Layout#completeLayout} method called.
     *
     * @param {Ext.layout.Layout} layout
     * @private
     */
    queueCompletion: function (layout) {
        this.completionQueue.add(layout);
    },

    /**
     * Queues a layout to have its {@link Ext.layout.Layout#finalizeLayout} method called.
     *
     * @param {Ext.layout.Layout} layout
     * @private
     */
    queueFinalize: function (layout) {
        this.finalizeQueue.add(layout);
    },

    /**
     * Queues a ContextItem for the next flush to the DOM. This should only be called by
     * the {@link Ext.layout.ContextItem} class.
     *
     * @param {Ext.layout.ContextItem} item
     * @private
     */
    queueFlush: function (item) {
        this.flushQueue.add(item);
    },

    chainFns: function (oldOptions, newOptions, funcName) {
        var me = this,
            oldLayout = oldOptions.layout,
            newLayout = newOptions.layout,
            oldFn = oldOptions[funcName],
            newFn = newOptions[funcName];

        // Call newFn last so it can get the final word on things... also, the "this"
        // pointer will be passed correctly by createSequence with oldFn first.
        return function (contextItem) {
            var prev = me.currentLayout;
            if (oldFn) {
                me.currentLayout = oldLayout;
                oldFn.call(oldOptions.scope || oldOptions, contextItem, oldOptions);
            }
            me.currentLayout = newLayout;
            newFn.call(newOptions.scope || newOptions, contextItem, newOptions);
            me.currentLayout = prev;
        };
    },

    /**
     * Queue a component (and its tree) to be invalidated on the next cycle.
     *
     * @param {Ext.Component/Ext.layout.ContextItem} item The component or ContextItem to invalidate.
     * @param {Object} options An object describing how to handle the invalidation (see
     *  {@link Ext.layout.ContextItem#invalidate} for details).
     * @private
     */
    queueInvalidate: function (item, options) {
        var me = this,
            newQueue = [],
            oldQueue = me.invalidQueue,
            index = oldQueue.length,
            comp, old, oldComp, oldOptions, oldState;

        if (item.isComponent) {
            item = me.getCmp(comp = item);
        } else {
            comp = item.target;
        }

        item.invalid = true;

        // See if comp is contained by any component already in the queue (ignore comp if
        // that is the case). Eliminate any components in the queue that are contained by
        // comp (by not adding them to newQueue).
        while (index--) {
            old = oldQueue[index];
            oldComp = old.item.target;

            if (comp.isDescendant(oldComp)) {
                return; // oldComp contains comp, so this invalidate is redundant
            }

            if (oldComp == comp) {
                // if already in the queue, update the options...
                if (!(oldOptions = old.options)) {
                    old.options = options;
                } else if (options) {
                    if (options.widthModel) {
                        oldOptions.widthModel = options.widthModel;
                    }
                    if (options.heightModel) {
                        oldOptions.heightModel = options.heightModel;
                    }
                    if (!(oldState = oldOptions.state)) {
                        oldOptions.state = options.state;
                    } else if (options.state) {
                        Ext.apply(oldState, options.state);
                    }

                    if (options.before) {
                        oldOptions.before = me.chainFns(oldOptions, options, 'before');
                    }
                    if (options.after) {
                        oldOptions.after = me.chainFns(oldOptions, options, 'after');
                    }
                }

                // leave the old queue alone now that we've update this comp's entry...
                return;
            }

            if (!oldComp.isDescendant(comp)) {
                newQueue.push(old); // comp does not contain oldComp
            }
            // else if (oldComp isDescendant of comp) skip
        }
        // newQueue contains only those components not a descendant of comp

        // to get here, comp must not be a child of anything already in the queue, so it
        // needs to be added along with its "options":
        newQueue.push({ item: item, options: options });

        me.invalidQueue = newQueue;
    },

    queueItemLayouts: function (item) {
        var comp = item.isComponent ? item : item.target,
            layout = comp.componentLayout;

        if (!layout.pending && !layout.invalid && !layout.done) {
            this.queueLayout(layout);
        }

        layout = comp.layout;
        if (layout && !layout.pending && !layout.invalid && !layout.done) {
            this.queueLayout(layout);
        }
    },

    /**
     * Queues a layout for the next calculation cycle. This should not be called if the
     * layout is done, blocked or already in the queue. The only classes that should call
     * this method are this class and {@link Ext.layout.ContextItem}.
     *
     * @param {Ext.layout.Layout} layout The layout to add to the queue.
     * @private
     */
    queueLayout: function (layout) {
        this.layoutQueue.add(layout);
        layout.pending = true;
    },

    /**
     * Removes the ContextItem for an element from the cache and from the parent's
     * "children" array.
     * @param {Ext.layout.ContextItem} parent
     * @param {Ext.dom.Element} el
     */
    removeEl: function (parent, el) {
        var id = el.id,
            children = parent.children,
            items = this.items;

        if(children) {
            Ext.Array.remove(children, items[id]);
        }
        delete items[id];
    },

    /**
     * Resets the given layout object. This is called at the start of the run and can also
     * be called during the run by calling {@link #invalidate}.
     */
    resetLayout: function (layout, ownerContext, firstTime) {
        var me = this;

        me.currentLayout = layout;

        layout.done = false;
        layout.pending = true;
        layout.firedTriggers = 0;

        me.layoutQueue.add(layout);

        if (firstTime) {
            me.layouts[layout.id] = layout; // track the layout for this run by its id
            layout.running = true;

            if (layout.finishedLayout) {
                me.finishQueue.add(layout);
            }

            // reset or update per-run counters:

            ++me.remainingLayouts;
            ++layout.layoutCount; // the number of whole layouts run for the layout

            layout.ownerContext = ownerContext;
            layout.beginCount = 0; // the number of beginLayout calls
            layout.blockCount = 0; // the number of blocks set for the layout
            layout.calcCount = 0; // the number of times calculate is called
            layout.triggerCount = 0; // the number of triggers set for the layout

            if (!layout.initialized) {
                layout.initLayout();
            }

            layout.beginLayout(ownerContext);
        } else {
            ++layout.beginCount;

            if (!layout.running) {
                // back into the mahem with this one:
                ++me.remainingLayouts;
                layout.running = true;

                if (layout.isComponentLayout) {
                    // this one is fun... if we call setProp('done', false) that would still
                    // trigger/unblock layouts, but what layouts are really looking for with
                    // this property is for it to go to true, not just be set to a value...
                    ownerContext.unsetProp('done');
                }

                // and it needs to be removed from the completion and/or finalize queues...
                me.completionQueue.remove(layout);
                me.finalizeQueue.remove(layout);
            }
        }

        layout.beginLayoutCycle(ownerContext, firstTime);
    },

    /**
     * Runs the layout calculations. This can be called only once on this object.
     * @return {Boolean} True if all layouts were completed, false if not.
     */
    run: function () {
        var me = this,
            flushed = false,
            watchDog = 100;

        me.flushInvalidates();

        me.state = 1;
        me.totalCount = me.layoutQueue.getCount();

        // We may start with unflushed data placed by beginLayout calls. Since layouts may
        // use setProp as a convenience, even in a write phase, we don't want to transition
        // to a read phase with unflushed data since we can write it now "cheaply". Also,
        // these value could easily be needed in the DOM in order to really get going with
        // the calculations. In particular, fixed (configured) dimensions fall into this
        // category.
        me.flush();

        // While we have layouts that have not completed...
        while ((me.remainingLayouts || me.invalidQueue.length) && watchDog--) {
            if (me.invalidQueue.length) {
                me.flushInvalidates();
            }

            // if any of them can run right now, run them
            if (me.runCycle()) {
                flushed = false; // progress means we probably need to flush something
                // but not all progress appears in the flushQueue (e.g. 'contentHeight')
            } else if (!flushed) {
                // as long as we are making progress, flush updates to the DOM and see if
                // that triggers or unblocks any layouts...
                me.flush();
                flushed = true; // all flushed now, so more progress is required

                me.flushLayouts('completionQueue', 'completeLayout');
            } else if (!me.invalidQueue.length) {
                // after a flush, we must make progress or something is WRONG
                me.state = 2;
                break;
            }

            if (!(me.remainingLayouts || me.invalidQueue.length)) {
                me.flush();
                me.flushLayouts('completionQueue', 'completeLayout');
                me.flushLayouts('finalizeQueue', 'finalizeLayout');
            }
        }

        return me.runComplete();
    },

    runComplete: function () {
        var me = this;

        me.state = 2;

        if (me.remainingLayouts) {
            me.handleFailure();
            return false;
        }

        me.flush();

        // Call finishedLayout on all layouts, but do not clear the queue.
        me.flushLayouts('finishQueue', 'finishedLayout', true);

        // Call notifyOwner on all layouts and then clear the queue.
        me.flushLayouts('finishQueue', 'notifyOwner');

        me.flush(); // in case any setProp calls were made

        me.flushAnimations();

        return true;
    },

    /**
     * Performs one layout cycle by calling each layout in the layout queue.
     * @return {Boolean} True if some progress was made, false if not.
     * @protected
     */
    runCycle: function () {
        var me = this,
            layouts = me.layoutQueue.clear(),
            length = layouts.length,
            i;

        ++me.cycleCount;

        // This value is incremented by ContextItem#setProp whenever new values are set
        // (thereby detecting forward progress):
        me.progressCount = 0;

        for (i = 0; i < length; ++i) {
            me.runLayout(me.currentLayout = layouts[i]);
        }

        me.currentLayout = null;

        return me.progressCount > 0;
    },

    /**
     * Runs one layout as part of a cycle.
     * @private
     */
    runLayout: function (layout) {
        var me = this,
            ownerContext = me.getCmp(layout.owner);

        layout.pending = false;

        if (ownerContext.state.blocks) {
            return;
        }

        // We start with the assumption that the layout will finish and if it does not, it
        // must clear this flag. It turns out this is much simpler than knowing when a layout
        // is done (100% correctly) when base classes and derived classes are collaborating.
        // Knowing that some part of the layout is not done is much more obvious.
        layout.done = true;

        ++layout.calcCount;
        ++me.calcCount;

        layout.calculate(ownerContext);

        if (layout.done) {
            me.layoutDone(layout);

            if (layout.completeLayout) {
                me.queueCompletion(layout);
            }
            if (layout.finalizeLayout) {
                me.queueFinalize(layout);
            }
        } else if (!layout.pending && !layout.invalid && !(layout.blockCount + layout.triggerCount - layout.firedTriggers)) {
            // A layout that is not done and has no blocks or triggers that will queue it
            // automatically, must be queued now:
            me.queueLayout(layout);
        }
    },

    /**
     * Set the size of a component, element or composite or an array of components or elements.
     * @param {Ext.Component/Ext.Component[]/Ext.dom.Element/Ext.dom.Element[]/Ext.dom.CompositeElement} items
     * The item(s) to size.
     * @param {Number} width The new width to set (ignored if undefined or NaN).
     * @param {Number} height The new height to set (ignored if undefined or NaN).
     */
    setItemSize: function(item, width, height) {
        var items = item,
            len = 1,
            contextItem, i;

        // NOTE: we don't pre-check for validity because:
        //  - maybe only one dimension is valid
        //  - the diagnostics layer will track the setProp call to help find who is trying
        //      (but failing) to set a property
        //  - setProp already checks this anyway

        if (item.isComposite) {
            items = item.elements;
            len = items.length;
            item = items[0];
        } else if (!item.dom && !item.el) { // array by process of elimination
            len = items.length;
            item = items[0];
        }
        // else len = 1 and items = item (to avoid error on "items[++i]")

        for (i = 0; i < len; ) {
            contextItem = this.get(item);
            contextItem.setSize(width, height);

            item = items[++i]; // this accomodation avoids making an array of 1
        }
    }
});
