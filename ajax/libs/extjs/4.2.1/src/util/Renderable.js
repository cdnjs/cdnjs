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
 * Given a component hierarchy of this:
 *
 *      {
 *          xtype: 'panel',
 *          id: 'ContainerA',
 *          layout: 'hbox',
 *          renderTo: Ext.getBody(),
 *          items: [
 *              {
 *                  id: 'ContainerB',
 *                  xtype: 'container',
 *                  items: [
 *                      { id: 'ComponentA' }
 *                  ]
 *              }
 *          ]
 *      }
 *
 * The rendering of the above proceeds roughly like this:
 *
 *  - ContainerA's initComponent calls #render passing the `renderTo` property as the
 *    container argument.
 *  - `render` calls the `getRenderTree` method to get a complete {@link Ext.DomHelper} spec.
 *  - `getRenderTree` fires the "beforerender" event and calls the #beforeRender
 *    method. Its result is obtained by calling #getElConfig.
 *  - The #getElConfig method uses the `renderTpl` and its render data as the content
 *    of the `autoEl` described element.
 *  - The result of `getRenderTree` is passed to {@link Ext.DomHelper#append}.
 *  - The `renderTpl` contains calls to render things like docked items, container items
 *    and raw markup (such as the `html` or `tpl` config properties). These calls are to
 *    methods added to the {@link Ext.XTemplate} instance by #setupRenderTpl.
 *  - The #setupRenderTpl method adds methods such as `renderItems`, `renderContent`, etc.
 *    to the template. These are directed to "doRenderItems", "doRenderContent" etc..
 *  - The #setupRenderTpl calls traverse from components to their {@link Ext.layout.Layout}
 *    object.
 *  - When a container is rendered, it also has a `renderTpl`. This is processed when the
 *    `renderContainer` method is called in the component's `renderTpl`. This call goes to
 *    Ext.layout.container.Container#doRenderContainer. This method repeats this
 *    process for all components in the container.
 *  - After the top-most component's markup is generated and placed in to the DOM, the next
 *    step is to link elements to their components and finish calling the component methods
 *    `onRender` and `afterRender` as well as fire the corresponding events.
 *  - The first step in this is to call #finishRender. This method descends the
 *    component hierarchy and calls `onRender` and fires the `render` event. These calls
 *    are delivered top-down to approximate the timing of these calls/events from previous
 *    versions.
 *  - During the pass, the component's `el` is set. Likewise, the `renderSelectors` and
 *    `childEls` are applied to capture references to the component's elements.
 *  - These calls are also made on the {@link Ext.layout.container.Container} layout to
 *    capture its elements. Both of these classes use {@link Ext.util.ElementContainer} to
 *    handle `childEls` processing.
 *  - Once this is complete, a similar pass is made by calling #finishAfterRender.
 *    This call also descends the component hierarchy, but this time the calls are made in
 *    a bottom-up order to `afterRender`.
 *
 * @private
 */
Ext.define('Ext.util.Renderable', {
    requires: [
        'Ext.dom.Element'
    ],

    frameCls: Ext.baseCSSPrefix + 'frame',

    frameIdRegex: /[\-]frame\d+[TMB][LCR]$/,
    
    frameElNames: ['TL','TC','TR','ML','MC','MR','BL','BC','BR'],

    frameTpl: [
        '{%this.renderDockedItems(out,values,0);%}',
        '<tpl if="top">',
            '<tpl if="left"><div id="{fgid}TL" class="{frameCls}-tl {baseCls}-tl {baseCls}-{ui}-tl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tl</tpl>{frameElCls}" role="presentation"></tpl>',
                '<tpl if="right"><div id="{fgid}TR" class="{frameCls}-tr {baseCls}-tr {baseCls}-{ui}-tr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tr</tpl>{frameElCls}" role="presentation"></tpl>',
                    '<div id="{fgid}TC" class="{frameCls}-tc {baseCls}-tc {baseCls}-{ui}-tc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tc</tpl>{frameElCls}" role="presentation"></div>',
                '<tpl if="right"></div></tpl>',
            '<tpl if="left"></div></tpl>',
        '</tpl>',
        '<tpl if="left"><div id="{fgid}ML" class="{frameCls}-ml {baseCls}-ml {baseCls}-{ui}-ml<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-ml</tpl>{frameElCls}" role="presentation"></tpl>',
            '<tpl if="right"><div id="{fgid}MR" class="{frameCls}-mr {baseCls}-mr {baseCls}-{ui}-mr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mr</tpl>{frameElCls}" role="presentation"></tpl>',
                '<div id="{fgid}MC" class="{frameCls}-mc {baseCls}-mc {baseCls}-{ui}-mc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mc</tpl>{frameElCls}" role="presentation">',
                    '{%this.applyRenderTpl(out, values)%}',
                '</div>',
            '<tpl if="right"></div></tpl>',
        '<tpl if="left"></div></tpl>',
        '<tpl if="bottom">',
            '<tpl if="left"><div id="{fgid}BL" class="{frameCls}-bl {baseCls}-bl {baseCls}-{ui}-bl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bl</tpl>{frameElCls}" role="presentation"></tpl>',
                '<tpl if="right"><div id="{fgid}BR" class="{frameCls}-br {baseCls}-br {baseCls}-{ui}-br<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-br</tpl>{frameElCls}" role="presentation"></tpl>',
                    '<div id="{fgid}BC" class="{frameCls}-bc {baseCls}-bc {baseCls}-{ui}-bc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bc</tpl>{frameElCls}" role="presentation"></div>',
                '<tpl if="right"></div></tpl>',
            '<tpl if="left"></div></tpl>',
        '</tpl>',
        '{%this.renderDockedItems(out,values,1);%}'
    ],

    frameTableTpl: [
        '{%this.renderDockedItems(out,values,0);%}',
        '<table class="', Ext.plainTableCls, '" cellpadding="0"><tbody>',
            '<tpl if="top">',
                '<tr>',
                    '<tpl if="left"><td id="{fgid}TL" class="{frameCls}-tl {baseCls}-tl {baseCls}-{ui}-tl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tl</tpl>{frameElCls}" role="presentation"></td></tpl>',
                    '<td id="{fgid}TC" class="{frameCls}-tc {baseCls}-tc {baseCls}-{ui}-tc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tc</tpl>{frameElCls}" role="presentation"></td>',
                    '<tpl if="right"><td id="{fgid}TR" class="{frameCls}-tr {baseCls}-tr {baseCls}-{ui}-tr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-tr</tpl>{frameElCls}" role="presentation"></td></tpl>',
                '</tr>',
            '</tpl>',
            '<tr>',
                '<tpl if="left"><td id="{fgid}ML" class="{frameCls}-ml {baseCls}-ml {baseCls}-{ui}-ml<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-ml</tpl>{frameElCls}" role="presentation"></td></tpl>',
                '<td id="{fgid}MC" class="{frameCls}-mc {baseCls}-mc {baseCls}-{ui}-mc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mc</tpl>{frameElCls}" role="presentation">',
                    '{%this.applyRenderTpl(out, values)%}',
                '</td>',
                '<tpl if="right"><td id="{fgid}MR" class="{frameCls}-mr {baseCls}-mr {baseCls}-{ui}-mr<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-mr</tpl>{frameElCls}" role="presentation"></td></tpl>',
            '</tr>',
            '<tpl if="bottom">',
                '<tr>',
                    '<tpl if="left"><td id="{fgid}BL" class="{frameCls}-bl {baseCls}-bl {baseCls}-{ui}-bl<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bl</tpl>{frameElCls}" role="presentation"></td></tpl>',
                    '<td id="{fgid}BC" class="{frameCls}-bc {baseCls}-bc {baseCls}-{ui}-bc<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-bc</tpl>{frameElCls}" role="presentation"></td>',
                    '<tpl if="right"><td id="{fgid}BR" class="{frameCls}-br {baseCls}-br {baseCls}-{ui}-br<tpl for="uiCls"> {parent.baseCls}-{parent.ui}-{.}-br</tpl>{frameElCls}" role="presentation"></td></tpl>',
                '</tr>',
            '</tpl>',
        '</tbody></table>',
        '{%this.renderDockedItems(out,values,1);%}'
    ],

    /**
     * Allows addition of behavior after rendering is complete. At this stage the Component’s Element
     * will have been styled according to the configuration, will have had any configured CSS class
     * names added, and will be in the configured visibility and the configured enable state.
     *
     * @template
     * @protected
     */
    afterRender : function() {
        var me = this,
            data = {},
            protoEl = me.protoEl,
            target = me.el,
            item, pre, hide, contentEl;

        me.finishRenderChildren();
        
        // We need to do the contentEl here because it depends on the layout items (inner/outerCt)
        // to be rendered before we can put it in
        if (me.contentEl) {
            pre = Ext.baseCSSPrefix;
            hide = pre + 'hide-';
            contentEl = Ext.get(me.contentEl);
            contentEl.removeCls([pre+'hidden', hide+'display', hide+'offsets', hide+'nosize']);
            me.getContentTarget().appendChild(contentEl.dom);
        }

        protoEl.writeTo(data);
        
        // Here we apply any styles that were set on the protoEl during the rendering phase
        // A majority of times this will not happen, but we still need to handle it
        
        item = data.removed;
        if (item) {
            target.removeCls(item);
        }
        
        item = data.cls;
        if (item.length) {
            target.addCls(item);
        }
        
        item = data.style;
        if (data.style) {
            target.setStyle(item);
        }
        
        me.protoEl = null;

        // If this is the outermost Container, lay it out as soon as it is rendered.
        if (!me.ownerCt) {
            me.updateLayout();
        }
    },

    afterFirstLayout : function(width, height) {
        var me = this,
            x = me.x,
            y = me.y,
            hasX,
            hasY,
            pos, xy;

        // We only have to set absolute position here if there is no ownerlayout which should take responsibility.
        // Consider the example of rendered components outside of a viewport - these might need their positions setting.
        if (!me.ownerLayout) {
            hasX = Ext.isDefined(x);
            hasY = Ext.isDefined(y);
        }

        // For floaters, calculate x and y if they aren't defined by aligning
        // the sized element to the center of either the container or the ownerCt
        if (me.floating && (!hasX || !hasY)) {
            if (me.floatParent) {
                pos = me.floatParent.getTargetEl().getViewRegion();
                xy = me.el.getAlignToXY(me.floatParent.getTargetEl(), 'c-c');
                pos.x = xy[0] - pos.x;
                pos.y = xy[1] - pos.y;
            } else {
                xy = me.el.getAlignToXY(me.container, 'c-c');
                pos = me.container.translateXY(xy[0], xy[1]);
            }
            x = hasX ? x : pos.x;
            y = hasY ? y : pos.y;
            hasX = hasY = true;
        }

        if (hasX || hasY) {
            me.setPosition(x, y);
        }
        me.onBoxReady(width, height);
    },

    /**
     * Sets references to elements inside the component. This applies {@link Ext.AbstractComponent#cfg-renderSelectors renderSelectors}
     * as well as {@link Ext.AbstractComponent#cfg-childEls childEls}.
     * @private
     */
    applyRenderSelectors: function() {
        var me = this,
            selectors = me.renderSelectors,
            el = me.el,
            dom = el.dom,
            selector;

        me.applyChildEls(el);

        // We still support renderSelectors. There are a few places in the framework that
        // need them and they are a documented part of the API. In fact, we support mixing
        // childEls and renderSelectors (no reason not to).
        if (selectors) {
            for (selector in selectors) {
                if (selectors.hasOwnProperty(selector) && selectors[selector]) {
                    me[selector] = Ext.get(Ext.DomQuery.selectNode(selectors[selector], dom));
                }
            }
        }
    },

    beforeRender: function () {
        var me = this,
            target = me.getTargetEl(),
            overflowEl = me.getOverflowEl(),
            layout = me.getComponentLayout(),
            // Call the style calculation early which sets the public scrollFlags property
            overflowStyle = me.getOverflowStyle();

        // Just before rendering, set the frame flag if we are an always-framed component like Window or Tip.
        me.frame = me.frame || me.alwaysFramed;

        if (!layout.initialized) {
            layout.initLayout();
        }

        // Attempt to set overflow style prior to render if the targetEl can be accessed.
        // If the targetEl does not exist yet, this will take place in finishRender
        if (overflowEl) {
            overflowEl.setStyle(overflowStyle);
            me.overflowStyleSet = true;
        }

        me.setUI(me.ui);

        if (me.disabled) {
            // pass silent so the event doesn't fire the first time.
            me.disable(true);
        }
    },

    /**
     * @private
     * Called from the selected frame generation template to insert this Component's inner structure inside the framing structure.
     *
     * When framing is used, a selected frame generation template is used as the primary template of the #getElConfig instead
     * of the configured {@link Ext.AbstractComponent#renderTpl renderTpl}. The renderTpl is invoked by this method which is injected into the framing template.
     */
    doApplyRenderTpl: function(out, values) {
        // Careful! This method is bolted on to the frameTpl so all we get for context is
        // the renderData! The "this" pointer is the frameTpl instance!

        var me = values.$comp,
            tpl;

        // Don't do this if the component is already rendered:
        if (!me.rendered) {
            tpl = me.initRenderTpl();
            tpl.applyOut(values.renderData, out);
        }
    },

    /**
     * Handles autoRender.
     * Floating Components may have an ownerCt. If they are asking to be constrained, constrain them within that
     * ownerCt, and have their z-index managed locally. Floating Components are always rendered to document.body
     */
    doAutoRender: function() {
        var me = this;
        if (!me.rendered) {
            if (me.floating) {
                me.render(document.body);
            } else {
                me.render(Ext.isBoolean(me.autoRender) ? Ext.getBody() : me.autoRender);
            }
        }
    },

    doRenderContent: function (out, renderData) {
        // Careful! This method is bolted on to the renderTpl so all we get for context is
        // the renderData! The "this" pointer is the renderTpl instance!

        var me = renderData.$comp;

        if (me.html) {
            Ext.DomHelper.generateMarkup(me.html, out);
            delete me.html;
        }

        if (me.tpl) {
            // Make sure this.tpl is an instantiated XTemplate
            if (!me.tpl.isTemplate) {
                me.tpl = new Ext.XTemplate(me.tpl);
            }

            if (me.data) {
                //me.tpl[me.tplWriteMode](target, me.data);
                me.tpl.applyOut(me.data, out);
                delete me.data;
            }
        }
    },

    doRenderFramingDockedItems: function (out, renderData, after) {
        // Careful! This method is bolted on to the frameTpl so all we get for context is
        // the renderData! The "this" pointer is the frameTpl instance!

        var me = renderData.$comp;

        // Most components don't have dockedItems, so check for doRenderDockedItems on the
        // component (also, don't do this if the component is already rendered):
        if (!me.rendered && me.doRenderDockedItems) {
            // The "renderData" property is placed in scope for the renderTpl, but we don't
            // want to render docked items at that level in addition to the framing level:
            renderData.renderData.$skipDockedItems = true;

            // doRenderDockedItems requires the $comp property on renderData, but this is
            // set on the frameTpl's renderData as well:
            me.doRenderDockedItems.call(this, out, renderData, after);
        }
    },

    /**
     * This method visits the rendered component tree in a "top-down" order. That is, this
     * code runs on a parent component before running on a child. This method calls the
     * {@link #onRender} method of each component.
     * @param {Number} containerIdx The index into the Container items of this Component.
     *
     * @private
     */
    finishRender: function(containerIdx) {
        var me = this,
            tpl, data, el;

        // We are typically called w/me.el==null as a child of some ownerCt that is being
        // rendered. We are also called by render for a normal component (w/o a configured
        // me.el). In this case, render sets me.el and me.rendering (indirectly). Lastly
        // we are also called on a component (like a Viewport) that has a configured me.el
        // (body for a Viewport) when render is called. In this case, it is not flagged as
        // "me.rendering" yet becasue it does not produce a renderTree. We use this to know
        // not to regen the renderTpl.

        if (!me.el || me.$pid) {
            if (me.container) {
                el = me.container.getById(me.id, true);
            } else {
                el = Ext.getDom(me.id);
            }

            if (!me.el) {
                // Typical case: we produced the el during render
                me.wrapPrimaryEl(el);
            } else {
                // We were configured with an el and created a proxy, so now we can swap
                // the proxy for me.el:
                delete me.$pid;

                if (!me.el.dom) {
                    // make sure me.el is an Element
                    me.wrapPrimaryEl(me.el);
                }
                el.parentNode.insertBefore(me.el.dom, el);
                Ext.removeNode(el); // remove placeholder el
                // TODO - what about class/style?
            }
        } else if (!me.rendering) {
            // We were configured with an el and then told to render (e.g., Viewport). We
            // need to generate the proper DOM. Insert first because the layout system
            // insists that child Component elements indices match the Component indices.
            tpl = me.initRenderTpl();
            if (tpl) {
                data = me.initRenderData();
                tpl.insertFirst(me.getTargetEl(), data);
            }
        }
        // else we are rendering

        if (!me.container) {
            // top-level rendered components will already have me.container set up
            me.container = Ext.get(me.el.dom.parentNode);
        }

        if (me.ctCls) {
            me.container.addCls(me.ctCls);
        }

        // Sets the rendered flag and clears the rendering flag
        me.onRender(me.container, containerIdx);

        // If we could not access a target protoEl in beforeRender, we have to set the overflow styles here.
        if (!me.overflowStyleSet) {
            me.getOverflowEl().setStyle(me.getOverflowStyle());
        }

        // Tell the encapsulating element to hide itself in the way the Component is configured to hide
        // This means DISPLAY, VISIBILITY or OFFSETS.
        me.el.setVisibilityMode(Ext.Element[me.hideMode.toUpperCase()]);

        if (me.overCls) {
            me.el.hover(me.addOverCls, me.removeOverCls, me);
        }

        if (me.hasListeners.render) {
            me.fireEvent('render', me);
        }

        me.afterRender(); // this can cause a layout
        if (me.hasListeners.afterrender) {
            me.fireEvent('afterrender', me);
        }
        me.initEvents();

        if (me.hidden) {
            // Hiding during the render process should not perform any ancillary
            // actions that the full hide process does; It is not hiding, it begins in a hidden state.'
            // So just make the element hidden according to the configured hideMode
            me.el.hide();
        }
    },

    finishRenderChildren: function () {
        var layout = this.getComponentLayout();

        layout.finishRender();
    },

    getElConfig : function() {
        var me = this,
            autoEl = me.autoEl,
            frameInfo = me.getFrameInfo(),
            config = {
                tag: 'div',
                tpl: frameInfo ? me.initFramingTpl(frameInfo.table) : me.initRenderTpl()
            },
            protoEl = me.protoEl,
            i, frameElNames, len, suffix, frameGenId, frameData;

        me.initStyles(protoEl);
        protoEl.writeTo(config);
        protoEl.flush();

        if (Ext.isString(autoEl)) {
            config.tag = autoEl;
        } else {
            Ext.apply(config, autoEl); // harmless if !autoEl
        }

        // It's important to assign the id here as an autoEl.id could have been (wrongly) applied and this would get things out of sync
        config.id = me.id;

        if (config.tpl) {
            // Use the framingTpl as the main content creating template. It will call out to this.applyRenderTpl(out, values)
            if (frameInfo) {
                frameElNames = me.frameElNames;
                len = frameElNames.length;

                config.tplData = frameData = me.getFrameRenderData();
                frameData.renderData = me.initRenderData();
                frameGenId = frameData.fgid;

                // Add the childEls for each of the frame elements
                for (i = 0; i < len; i++) {
                    suffix = frameElNames[i];
                    me.addChildEls({ name: 'frame' + suffix, id: frameGenId + suffix });
                }

                // Panel must have a frameBody
                me.addChildEls({
                    name: 'frameBody',
                    id: frameGenId + 'MC'
                });
            } else {
                config.tplData = me.initRenderData();
            }
        }

        return config;
    },

    // Create the framingTpl from the string.
    // Poke in a reference to applyRenderTpl(frameInfo, out)
    initFramingTpl: function(table) {
        var tpl = this.getFrameTpl(table);

        if (tpl && !tpl.applyRenderTpl) {
            this.setupFramingTpl(tpl);
        }

        return tpl;
    },

    /**
     * @private
     * Inject a reference to the function which applies the render template into the framing template. The framing template
     * wraps the content.
     */
    setupFramingTpl: function(frameTpl) {
        frameTpl.applyRenderTpl = this.doApplyRenderTpl;
        frameTpl.renderDockedItems = this.doRenderFramingDockedItems;
    },

    /**
     * This function takes the position argument passed to onRender and returns a
     * DOM element that you can use in the insertBefore.
     * @param {String/Number/Ext.dom.Element/HTMLElement} position Index, element id or element you want
     * to put this component before.
     * @return {HTMLElement} DOM element that you can use in the insertBefore
     */
    getInsertPosition: function(position) {
        // Convert the position to an element to insert before
        if (position !== undefined) {
            if (Ext.isNumber(position)) {
                position = this.container.dom.childNodes[position];
            }
            else {
                position = Ext.getDom(position);
            }
        }

        return position;
    },

    getRenderTree: function() {
        var me = this;

        if (!me.hasListeners.beforerender || me.fireEvent('beforerender', me) !== false) {
            me.beforeRender();

            // Flag to let the layout's finishRenderItems and afterFinishRenderItems
            // know which items to process
            me.rendering = true;

            if (me.el) {
                // Since we are producing a render tree, we produce a "proxy el" that will
                // sit in the rendered DOM precisely where me.el belongs. We replace the
                // proxy el in the finishRender phase.
                return {
                    tag: 'div',
                    id: (me.$pid = Ext.id())
                };
            }

            return me.getElConfig();
        }

        return null;
    },

    initContainer: function(container) {
        var me = this;

        // If you render a component specifying the el, we get the container
        // of the el, and make sure we dont move the el around in the dom
        // during the render
        if (!container && me.el) {
            container = me.el.dom.parentNode;
            me.allowDomMove = false;
        }
        me.container = container.dom ? container : Ext.get(container);

        return me.container;
    },

    /**
     * Initialized the renderData to be used when rendering the renderTpl.
     * @return {Object} Object with keys and values that are going to be applied to the renderTpl
     * @protected
     */
    initRenderData: function() {
        var me = this;

        return Ext.apply({
            $comp: me,
            id: me.id,
            ui: me.ui,
            uiCls: me.uiCls,
            baseCls: me.baseCls,
            componentCls: me.componentCls,
            frame: me.frame,
            childElCls: '' // overridden in RTL
        }, me.renderData);
    },

    /**
     * Initializes the renderTpl.
     * @return {Ext.XTemplate} The renderTpl XTemplate instance.
     * @private
     */
    initRenderTpl: function() {
        var tpl = this.getTpl('renderTpl');

        if (tpl && !tpl.renderContent) {
            this.setupRenderTpl(tpl);
        }

        return tpl;
    },

    /**
     * Template method called when this Component's DOM structure is created.
     *
     * At this point, this Component's (and all descendants') DOM structure *exists* but it has not
     * been layed out (positioned and sized).
     *
     * Subclasses which override this to gain access to the structure at render time should
     * call the parent class's method before attempting to access any child elements of the Component.
     *
     * @param {Ext.core.Element} parentNode The parent Element in which this Component's encapsulating element is contained.
     * @param {Number} containerIdx The index within the parent Container's child collection of this Component.
     *
     * @template
     * @protected
     */
    onRender: function(parentNode, containerIdx) {
        var me = this,
            x = me.x,
            y = me.y,
            lastBox = null,
            width, height,
            el = me.el;

        me.applyRenderSelectors();

        // Flag set on getRenderTree to flag to the layout's postprocessing routine that
        // the Component is in the process of being rendered and needs postprocessing.
        me.rendering = null;

        me.rendered = true;

        // We need to remember these to avoid writing them during the initial layout:
        if (x != null) {
            lastBox = {x:x};
        }
        if (y != null) {
            (lastBox = lastBox || {}).y = y;
        }
        // Framed components need their width/height to apply to the frame, which is
        // best handled in layout at present.
        // If we're using the content box model, we also cannot assign initial sizes since we do not know the border widths to subtract
        if (!me.getFrameInfo() && Ext.isBorderBox) {
            width = me.width;
            height = me.height;

            if (typeof width === 'number') {
                lastBox = lastBox || {};
                lastBox.width = width;
            }
            if (typeof height === 'number') {
                lastBox = lastBox || {};
                lastBox.height = height;
            }
        }

        me.lastBox = el.lastBox = lastBox;
    },

    /**
     * Renders the Component into the passed HTML element.
     * 
     * **If you are using a {@link Ext.container.Container Container} object to house this
     * Component, then do not use the render method.**
     *
     * A Container's child Components are rendered by that Container's
     * {@link Ext.container.Container#layout layout} manager when the Container is first rendered.
     *
     * If the Container is already rendered when a new child Component is added, you may need to call
     * the Container's {@link Ext.container.Container#doLayout doLayout} to refresh the view which
     * causes any unrendered child Components to be rendered. This is required so that you can add
     * multiple child components if needed while only refreshing the layout once.
     *
     * When creating complex UIs, it is important to remember that sizing and positioning
     * of child items is the responsibility of the Container's {@link Ext.container.Container#layout layout}
     * manager.  If you expect child items to be sized in response to user interactions, you must
     * configure the Container with a layout manager which creates and manages the type of layout you
     * have in mind.
     *
     * **Omitting the Container's {@link Ext.Container#layout layout} config means that a basic
     * layout manager is used which does nothing but render child components sequentially into the
     * Container. No sizing or positioning will be performed in this situation.**
     *
     * @param {Ext.Element/HTMLElement/String} [container] The element this Component should be
     * rendered into. If it is being created from existing markup, this should be omitted.
     * @param {String/Number} [position] The element ID or DOM node index within the container **before**
     * which this component will be inserted (defaults to appending to the end of the container)
     */
    render: function(container, position) {
        var me = this,
            el = me.el && (me.el = Ext.get(me.el)), // ensure me.el is wrapped
            vetoed,
            tree,
            nextSibling;

        Ext.suspendLayouts();

        container = me.initContainer(container);

        nextSibling = me.getInsertPosition(position);

        if (!el) {
            tree = me.getRenderTree();
            if (me.ownerLayout && me.ownerLayout.transformItemRenderTree) {
                tree = me.ownerLayout.transformItemRenderTree(tree);
            }

            // tree will be null if a beforerender listener returns false
            if (tree) {
                if (nextSibling) {
                    el = Ext.DomHelper.insertBefore(nextSibling, tree);
                } else {
                    el = Ext.DomHelper.append(container, tree);
                }

                me.wrapPrimaryEl(el);
            }
        } else {
            if (!me.hasListeners.beforerender || me.fireEvent('beforerender', me) !== false) {
                me.beforeRender();
                // Set configured styles on pre-rendered Component's element
                me.initStyles(el);
                if (me.allowDomMove !== false) {
                    if (nextSibling) {
                        container.dom.insertBefore(el.dom, nextSibling);
                    } else {
                        container.dom.appendChild(el.dom);
                    }
                }
            } else {
                vetoed = true;
            }
        }

        if (el && !vetoed) {
            me.finishRender(position);
        }

        Ext.resumeLayouts(!me.hidden && !container.isDetachedBody);
    },

    /**
     * Ensures that this component is attached to `document.body`. If the component was
     * rendered to {@link Ext#getDetachedBody}, then it will be appended to `document.body`.
     * Any configured position is also restored.
     * @param {Boolean} [runLayout=false] True to run the component's layout.
     */
    ensureAttachedToBody: function (runLayout) {
        var comp = this,
            body;

        while (comp.ownerCt) {
            comp = comp.ownerCt;
        }

        if (comp.container.isDetachedBody) {
            comp.container = body = Ext.getBody();
            body.appendChild(comp.el.dom);
            if (runLayout) {
                comp.updateLayout();
            }
            if (typeof comp.x == 'number' || typeof comp.y == 'number') {
                comp.setPosition(comp.x, comp.y);
            }
        }
    },

    setupRenderTpl: function (renderTpl) {
        renderTpl.renderBody = renderTpl.renderContent = this.doRenderContent;
    },

    wrapPrimaryEl: function (dom) {
        this.el = Ext.get(dom, true);
    },

    /**
     * @private
     */
    initFrame : function() {
        if (Ext.supports.CSS3BorderRadius || !this.frame) {
            return;
        }

        var me = this,
            frameInfo = me.getFrameInfo(),
            frameTpl, frameGenId,
            frameElNames = me.frameElNames,
            len = frameElNames.length,
            i, frameData, suffix;

        if (frameInfo) {
            frameTpl = me.getFrameTpl(frameInfo.table);
            frameData = me.getFrameRenderData();
            frameGenId = frameData.fgid;

            // Here we render the frameTpl to this component. This inserts the 9point div
            // or the table framing.
            frameTpl.insertFirst(me.el, frameData);

            // The frameBody is returned in getTargetEl, so that layouts render items to
            // the correct target.
            me.frameBody = me.el.down('.' + me.frameCls + '-mc');

            // Clean out the childEls for the old frame elements (the majority of the els)
            me.removeChildEls(function (c) {
                return c.id && me.frameIdRegex.test(c.id);
            });

            // Grab references to the childEls for each of the new frame elements
            for (i = 0; i < len; i++) {
                suffix = frameElNames[i];
                me['frame' + suffix] = me.el.getById(frameGenId + suffix);
            }
        }
    },

    getFrameRenderData: function () {
        var me = this,
            // we are only called if framing so this has already been determined:
            frameInfo = me.frameSize,
            frameGenId = (me.frameGenId || 0) + 1;

        // since we render id's into the markup and id's NEED to be unique, we have a
        // simple strategy for numbering their generations.
        me.frameGenId = frameGenId;

        return {
            $comp:      me,
            fgid:       me.id + '-frame' + frameGenId,
            ui:         me.ui,
            uiCls:      me.uiCls,
            frameCls:   me.frameCls,
            baseCls:    me.baseCls,
            top:        !!frameInfo.top,
            left:       !!frameInfo.left,
            right:      !!frameInfo.right,
            bottom:     !!frameInfo.bottom,
            // can be optionally set by a subclass or override to be an extra class to
            // be applied to all framing elements (used by RTL)
            frameElCls: ''
        };
    },

    updateFrame: function() {
        if (Ext.supports.CSS3BorderRadius || !this.frame) {
            return;
        }

        var me = this,
            wasTable = me.frameSize && me.frameSize.table,
            oldFrameTL = me.frameTL,
            oldFrameBL = me.frameBL,
            oldFrameML = me.frameML,
            oldFrameMC = me.frameMC,
            newMCClassName;

        me.initFrame();

        if (oldFrameMC) {
            if (me.frame) {

                // Store the class names set on the new MC
                newMCClassName = me.frameMC.dom.className;

                // Framing elements have been selected in initFrame, no need to run applyRenderSelectors
                // Replace the new mc with the old mc
                oldFrameMC.insertAfter(me.frameMC);
                me.frameMC.remove();

                // Restore the reference to the old frame mc as the framebody
                me.frameBody = me.frameMC = oldFrameMC;

                // Apply the new mc classes to the old mc element
                oldFrameMC.dom.className = newMCClassName;

                // Remove the old framing
                if (wasTable) {
                    me.el.query('> table')[1].remove();
                }
                else {
                    if (oldFrameTL) {
                        oldFrameTL.remove();
                    }
                    if (oldFrameBL) {
                        oldFrameBL.remove();
                    }
                    if (oldFrameML) {
                        oldFrameML.remove();
                    }
                }
            }
        }
        else if (me.frame) {
            me.applyRenderSelectors();
        }
    },

    /**
     * @private
     * On render, reads an encoded style attribute, "filter" from the style of this Component's element.
     * This information is memoized based upon the CSS class name of this Component's element.
     * Because child Components are rendered as textual HTML as part of the topmost Container, a dummy div is inserted
     * into the document to receive the document element's CSS class name, and therefore style attributes.
     */
    getFrameInfo: function() {
        // If native framing can be used, or this component is not going to be framed, then do not attempt to read CSS framing info.
        if (Ext.supports.CSS3BorderRadius || !this.frame) {
            return false;
        }

        var me = this,
            frameInfoCache = me.frameInfoCache,
            cls = me.getFramingInfoCls() + '-frameInfo',
            frameInfo = frameInfoCache[cls],
            max = Math.max,
            styleEl, match, info, frameTop, frameRight, frameBottom, frameLeft,
            borderWidthT, borderWidthR, borderWidthB, borderWidthL,
            paddingT, paddingR, paddingB, paddingL,
            borderRadiusTL, borderRadiusTR, borderRadiusBR, borderRadiusBL;

        if (frameInfo == null) {
            // Get the singleton frame style proxy with our el class name stamped into it.
            styleEl = Ext.fly(me.getStyleProxy(cls), 'frame-style-el');
            info = styleEl.getStyle('font-family');

            if (info) {
                // The framing data is encoded as
                // 
                //         D=div|T=table
                //         |   H=horz|V=vert
                //         |   |
                //         |   |
                //        [DT][HV]-[T-R-B-L]-[T-R-B-L]-[T-R-B-L]
                //                /       /  |       |  \      \
                //              /        /   |       |   \      \
                //            /         /   /         \   \      \
                //          /          /    border-width   \      \
                //        border-radius                      padding
                //
                // The first 2 chars hold the div/table and horizontal/vertical flags.
                // The 3 sets of TRBL 4-tuples are the CSS3 values for border-radius,
                // border-width and padding, respectively.
                //
                info = info.split('-');
                
                borderRadiusTL = parseInt(info[1], 10);
                borderRadiusTR = parseInt(info[2], 10);
                borderRadiusBR = parseInt(info[3], 10);
                borderRadiusBL = parseInt(info[4], 10);
                borderWidthT   = parseInt(info[5], 10);
                borderWidthR   = parseInt(info[6], 10);
                borderWidthB   = parseInt(info[7], 10);
                borderWidthL   = parseInt(info[8], 10);
                paddingT       = parseInt(info[9], 10);
                paddingR       = parseInt(info[10], 10);
                paddingB       = parseInt(info[11], 10);
                paddingL       = parseInt(info[12], 10);

                // This calculation should follow ext-theme-base/etc/mixins/frame.css
                // with respect to the CSS3 equivalent formulation:
                frameTop    = max(borderWidthT, max(borderRadiusTL, borderRadiusTR));
                frameRight  = max(borderWidthR, max(borderRadiusTR, borderRadiusBR));
                frameBottom = max(borderWidthB, max(borderRadiusBL, borderRadiusBR));
                frameLeft   = max(borderWidthL, max(borderRadiusTL, borderRadiusBL));

                frameInfo = {
                    table: info[0].charAt(0) === 't',
                    vertical: info[0].charAt(1) === 'v',

                    top: frameTop,
                    right: frameRight,
                    bottom: frameBottom,
                    left: frameLeft,

                    width: frameLeft + frameRight,
                    height: frameTop + frameBottom,

                    maxWidth: max(frameTop, frameRight, frameBottom, frameLeft),

                    border: {
                        top:    borderWidthT,
                        right:  borderWidthR,
                        bottom: borderWidthB,
                        left:   borderWidthL,
                        width:  borderWidthL + borderWidthR,
                        height: borderWidthT + borderWidthB
                    },
                    padding: {
                        top:    paddingT,
                        right:  paddingR,
                        bottom: paddingB,
                        left:   paddingL,
                        width:  paddingL + paddingR,
                        height: paddingT + paddingB
                    },
                    radius: {
                        tl: borderRadiusTL,
                        tr: borderRadiusTR,
                        br: borderRadiusBR,
                        bl: borderRadiusBL
                    }
                };
            } else {
                frameInfo = false;
            }

            //<debug error>
            // This happens when you set frame: true explicitly without using the x-frame mixin in sass.
            // This way IE can't figure out what sizes to use and thus framing can't work.
            if (me.frame === true && !frameInfo) {
                Ext.log.error('You have set frame: true explicity on this component (' + me.getXType() + ') and it ' +
                        'does not have any framing defined in the CSS template. In this case IE cannot figure out ' +
                        'what sizes to use and thus framing on this component will be disabled.');
            }
            //</debug>

            frameInfoCache[cls] = frameInfo;
        }

        me.frame = !!frameInfo;
        me.frameSize = frameInfo;

        return frameInfo;
    },
    
    getFramingInfoCls: function(){
        return this.baseCls + '-' + this.ui;
    },

    /**
     * @private
     * Returns an offscreen div with the same class name as the element this is being rendered.
     * This is because child item rendering takes place in a detached div which, being not
     * part of the document, has no styling.
     */
    getStyleProxy: function(cls) {
        var result = this.styleProxyEl || (Ext.AbstractComponent.prototype.styleProxyEl = Ext.getBody().createChild({
                style: {
                    position: 'absolute',
                    top: '-10000px'
                }
            }, null, true));

        result.className = cls;
        return result;
    },

    /**
     * @private
     */
    getFrameTpl : function(table) {
        return this.getTpl(table ? 'frameTableTpl' : 'frameTpl');
    },

    // Cache the frame information object so as not to cause style recalculations
    frameInfoCache: {}
});
