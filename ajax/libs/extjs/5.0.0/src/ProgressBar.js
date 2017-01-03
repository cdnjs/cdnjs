/**
 * An updateable progress bar component. The progress bar supports two different modes: manual and automatic.
 *
 * In manual mode, you are responsible for showing, updating (via {@link #updateProgress}) and clearing the progress bar
 * as needed from your own code. This method is most appropriate when you want to show progress throughout an operation
 * that has predictable points of interest at which you can update the control.
 *
 * In automatic mode, you simply call {@link #wait} and let the progress bar run indefinitely, only clearing it once the
 * operation is complete. You can optionally have the progress bar wait for a specific amount of time and then clear
 * itself. Automatic mode is most appropriate for timed operations or asynchronous operations in which you have no need
 * for indicating intermediate progress.
 *
 *     @example
 *     var p = Ext.create('Ext.ProgressBar', {
 *        renderTo: Ext.getBody(),
 *        width: 300
 *     });
 *
 *     // Wait for 5 seconds, then update the status el (progress bar will auto-reset)
 *     p.wait({
 *         interval: 500, //bar will move fast!
 *         duration: 50000,
 *         increment: 15,
 *         text: 'Updating...',
 *         scope: this,
 *         fn: function(){
 *             p.updateText('Done!');
 *         }
 *     });
 */
Ext.define('Ext.ProgressBar', {
    extend: 'Ext.Component',
    alias: 'widget.progressbar',

    requires: [
        'Ext.Template',
        'Ext.CompositeElement',
        'Ext.TaskManager',
        'Ext.layout.component.ProgressBar'
    ],

    uses: ['Ext.fx.Anim'],

    config: {
        /**
         * @cfg {Number} [value=0]
         * A floating point value between 0 and 1 (e.g., .5)
         */
        value: 0,

        /**
         * @cfg {String/Ext.XTemplate} [textTpl]
         * A template used to create this ProgressBar's background text given two values:
         *
         *    `value  ' - The raw progress value between 0 and 1
         *    'percent' - The value as a percentage between 0 and 100
         */
        textTpl: null
    },

   /**
    * @cfg {String/HTMLElement/Ext.dom.Element} textEl
    * The element to render the progress text to (defaults to the progress bar's internal text element)
    */

   /**
    * @cfg {String} id
    * The progress bar element's id (defaults to an auto-generated id)
    */

   /**
    * @cfg {String} [baseCls='x-progress']
    * The base CSS class to apply to the progress bar's wrapper element.
    */
    baseCls: Ext.baseCSSPrefix + 'progress',

    /**
     * @cfg {Boolean/Object} animate
     * True to animate the progress bar during transitions, or an animation configuration
     * (see the {@link #method-animate} method for details).
     */
    animate: false,

    /**
     * @cfg {String} text
     * The text shown in the progress bar.
     */
    text: '',

    // private
    waitTimer: null,

    childEls: [
        'bar'
    ],

    defaultBindProperty: 'value',

    renderTpl: [
        '<tpl if="internalText">',
            '<div class="{baseCls}-text {baseCls}-text-back">{text}</div>',
        '</tpl>',
        '<div id="{id}-bar" data-ref="bar" class="{baseCls}-bar {baseCls}-bar-{ui}" role="presentation" style="width:{percentage}%">',
            '<tpl if="internalText">',
                '<div class="{baseCls}-text">',
                    '<div>{text}</div>',
                '</div>',
            '</tpl>',
        '</div>'
    ],

    componentLayout: 'progressbar',
    
    ariaRole: 'progressbar',

    /**
     * @event update
     * Fires after each update interval
     * @param {Ext.ProgressBar} this
     * @param {Number} value The current progress value
     * @param {String} text The current progress text
     */

    initRenderData: function() {
        var me = this;
        return Ext.apply(me.callParent(), {
            internalText : !me.hasOwnProperty('textEl'),
            text         : me.text || '&#160;',
            percentage   : me.value ? me.value * 100 : 0
        });
    },

    onRender : function() {
        var me = this;

        me.callParent(arguments);

        // External text display
        if (me.textEl) {
            me.textEl = Ext.get(me.textEl);
            me.updateText(me.text);
        }
        // Inline text display
        else {
            // This produces a composite w/2 el's (which is why we cannot use childEls or
            // renderSelectors):
            me.textEl = me.el.select('.' + me.baseCls + '-text');
        }
    },

    updateValue: function(value) {
        this.updateProgress(value, Math.round(value * 100) + '%');
    },

    /**
     * Updates the progress bar value, and optionally its text.
     * 
     * If the text argument is not specified, then the {@link #textTpl} will be used to generate the text.
     * If there is no `textTpl`, any existing text value will be unchanged. To blank out existing text, pass `""`.
     *
     * Note that even if the progress bar value exceeds 1, it will never automatically reset --
     * you are responsible for determining when the progress is complete and
     * calling {@link #reset} to clear and/or hide the control.
     * @param {Number} [value=0] A floating point value between 0 and 1 (e.g., .5)
     * @param {String} [text=''] The string to display in the progress text element
     * @param {Boolean} [animate=false] Whether to animate the transition of the progress bar. If this value is not
     * specified, the default for the class is used
     * @return {Ext.ProgressBar} this
     */
    updateProgress: function(value, text, animate) {
        var me = this,
            oldValue = me.value,
            textTpl = me.getTextTpl();

        // Ensure value is not undefined.
        me.value = value || (value = 0);

        // Empty string (falsy) must blank out the text as per docs.
        if (text != null) {
            me.updateText(text);
        }
        // Generate text using template and progress values.
        else if (textTpl) {
            me.updateText(textTpl.apply({
                value: value,
                percent: value * 100
            }));
        }
        if (me.rendered && !me.isDestroyed) {
            if (animate === true || (animate !== false && me.animate)) {
                me.bar.stopAnimation();
                me.bar.animate(Ext.apply({
                    from: {
                        width: (oldValue * 100) + '%'
                    },
                    to: {
                        width: (value * 100) + '%'
                    }
                }, me.animate));
            } else {
                me.bar.setStyle('width', (value * 100) + '%');
            }
        }
        me.fireEvent('update', me, value, text);
        return me;
    },

    /**
     * Updates the progress bar text. If specified, textEl will be updated, otherwise the progress bar itself will
     * display the updated text.
     * @param {String} [text=''] The string to display in the progress text element
     * @return {Ext.ProgressBar} this
     */
    updateText: function(text) {
        var me = this;
        
        me.text = text;
        if (me.rendered) {
            me.textEl.setHtml(me.text);
        }
        return me;
    },

    applyTextTpl: function(textTpl) {
        if (!textTpl.isTemplate) {
            textTpl = new Ext.XTemplate(textTpl);
        }
        return textTpl;
    },

    applyText : function(text) {
        this.updateText(text);
    },
    
    getText: function(){
        return this.text;    
    },

    /**
     * Initiates an auto-updating progress bar. A duration can be specified, in which case the progress bar will
     * automatically reset after a fixed amount of time and optionally call a callback function if specified. If no
     * duration is passed in, then the progress bar will run indefinitely and must be manually cleared by calling
     * {@link #reset}.
     *
     * Example usage:
     *
     *     var p = new Ext.ProgressBar({
     *        renderTo: 'my-el'
     *     });
     *
     *     //Wait for 5 seconds, then update the status el (progress bar will auto-reset)
     *     var p = Ext.create('Ext.ProgressBar', {
     *        renderTo: Ext.getBody(),
     *        width: 300
     *     });
     *
     *     //Wait for 5 seconds, then update the status el (progress bar will auto-reset)
     *     p.wait({
     *        interval: 500, //bar will move fast!
     *        duration: 50000,
     *        increment: 15,
     *        text: 'Updating...',
     *        scope: this,
     *        fn: function(){
     *           p.updateText('Done!');
     *        }
     *     });
     *
     *     //Or update indefinitely until some async action completes, then reset manually
     *     p.wait();
     *     myAction.on('complete', function(){
     *         p.reset();
     *         p.updateText('Done!');
     *     });
     *
     * @param {Object} config (optional) Configuration options
     * @param {Number} config.duration The length of time in milliseconds that the progress bar should
     * run before resetting itself (defaults to undefined, in which case it will run indefinitely
     * until reset is called)
     * @param {Number} config.interval The length of time in milliseconds between each progress update
     * (defaults to 1000 ms)
     * @param {Boolean} config.animate Whether to animate the transition of the progress bar. If this
     * value is not specified, the default for the class is used.
     * @param {Number} config.increment The number of progress update segments to display within the
     * progress bar (defaults to 10).  If the bar reaches the end and is still updating, it will
     * automatically wrap back to the beginning.
     * @param {String} config.text Optional text to display in the progress bar element (defaults to '').
     * @param {Function} config.fn A callback function to execute after the progress bar finishes auto-
     * updating.  The function will be called with no arguments.  This function will be ignored if
     * duration is not specified since in that case the progress bar can only be stopped programmatically,
     * so any required function should be called by the same code after it resets the progress bar.
     * @param {Object} config.scope The scope that is passed to the callback function (only applies when
     * duration and fn are both passed).
     * @return {Ext.ProgressBar} this
     */
    wait: function(o) {
        var me = this, scope;
            
        if (!me.waitTimer) {
            scope = me;
            o = o || {};
            me.updateText(o.text);
            me.waitTimer = Ext.TaskManager.start({
                run: function(i){
                    var inc = o.increment || 10;
                    i -= 1;
                    me.updateProgress(((((i+inc)%inc)+1)*(100/inc))*0.01, null, o.animate);
                },
                interval: o.interval || 1000,
                duration: o.duration,
                onStop: function(){
                    if (o.fn) {
                        o.fn.apply(o.scope || me);
                    }
                    me.reset();
                },
                scope: scope
            });
        }
        return me;
    },

    /**
     * Returns true if the progress bar is currently in a {@link #wait} operation
     * @return {Boolean} True if waiting, else false
     */
    isWaiting: function(){
        return this.waitTimer !== null;
    },

    /**
     * Resets the progress bar value to 0 and text to empty string. If hide = true, the progress bar will also be hidden
     * (using the {@link #hideMode} property internally).
     * @param {Boolean} [hide=false] True to hide the progress bar.
     * @return {Ext.ProgressBar} this
     */
    reset: function(hide){
        var me = this;
        
        me.updateProgress(0);
        me.clearTimer();
        if (hide === true) {
            me.hide();
        }
        return me;
    },

    // private
    clearTimer: function(){
        var me = this;
        
        if (me.waitTimer) {
            me.waitTimer.onStop = null; //prevent recursion
            Ext.TaskManager.stop(me.waitTimer);
            me.waitTimer = null;
        }
    },

    onDestroy: function(){
        var me = this,
            bar = me.bar;
        
        me.clearTimer();
        if (me.rendered) {
            if (me.textEl.isComposite) {
                me.textEl.clear();
            }
            Ext.destroyMembers(me, 'textEl', 'progressBar');
            if (bar && me.animate) {
                bar.stopAnimation();
            }
        }
        me.callParent();
    }
});
