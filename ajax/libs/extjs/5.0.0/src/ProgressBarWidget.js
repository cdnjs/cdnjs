/**
 * An updateable progress bar widget.
 *
 * In manual mode, you are responsible for showing, updating (via {@link #setValue})
 * and clearing the progress bar as needed from your own code. This method is most
 * appropriate when you want to show progress throughout an operation that has predictable
 * points of interest at which you can update the control.
 */
Ext.define('Ext.ProgressBarWidget', {
    extend: 'Ext.Widget',
    alias: 'widget.progressbarwidget',

    // Required to pull in the styles
    requires: [
        'Ext.ProgressBar'
    ],

    config: {
        /**
         * @cfg {String} [text]
         * The background text
         */
        text: null,

        /**
         * @cfg {Number} [value=0]
         * A floating point value between 0 and 1 (e.g., .5)
         */
        value: 0,

        /**
         * @cfg {Boolean} [animate=false]
         * Specify as `true` to have this progress bar animate to new extent when updated.
         */
        animate: false,

        /**
         * @cfg {String/Ext.XTemplate} [textTpl]
         * A template used to create this ProgressBar's background text given two values:
         *
         *    `value  ' - The raw progress value between 0 and 1
         *    'percent' - The value as a percentage between 0 and 100
         */
        textTpl: null
    },

    cachedConfig: {
        /**
         * @cfg {String} [baseCls='x-progress']
         * The base CSS class to apply to the progress bar's wrapper element.
         */
        baseCls: Ext.baseCSSPrefix + 'progress',

        textCls: Ext.baseCSSPrefix + 'progress-text',

        ui: 'default'
    },

    template: [{
        reference: 'backgroundEl'
    }, {
        reference: 'barEl',
        children: [{
            reference: 'textEl'
        }]
    }],

    defaultBindProperty: 'value',
            
    updateUi: function(ui, oldUi) {

        var baseCls = this.getBaseCls() + '-';

        if (oldUi) {
            this.element.removeCls(baseCls + oldUi);
            this.barEl.removeCls(baseCls + 'bar-' + oldUi);
        }

        this.element.addCls(baseCls + ui);
        this.barEl.addCls(baseCls + 'bar-' + ui);
    },

    updateBaseCls: function(baseCls, oldBaseCls) {
        //<debug>
        if (oldBaseCls) {
            Ext.Error.raise('You cannot configure baseCls - use a subclass');
        }
        //</debug>
        this.element.addCls(baseCls);
        this.barEl.addCls(baseCls + '-bar');
    },

    updateTextCls: function(textCls) {
        this.backgroundEl.addCls(textCls + ' ' + textCls + '-back');
        this.textEl.addCls(textCls);
    },

    updateValue: function(value, oldValue) {
        var me = this,
            textTpl = me.getTextTpl();

        if (textTpl) {
            me.setText(textTpl.apply({
                value: value,
                percent: value * 100
            }));
        }
        if (me.getAnimate()) {
            me.barEl.stopAnimation();
            me.barEl.animate(Ext.apply({
                from: {
                    width: (oldValue * 100) + '%'
                },
                to: {
                    width: (value * 100) + '%'
                }
            }, me.animate));
        } else {
            me.barEl.setStyle('width', (value * 100) + '%');
        }
    },

    updateText: function(text) {
        var me = this;

        me.backgroundEl.setHtml(text);
        me.textEl.setHtml(text);
    },

    applyTextTpl: function(textTpl) {
        if (!textTpl.isTemplate) {
            textTpl = new Ext.XTemplate(textTpl);
        }
        return textTpl;
    }
});