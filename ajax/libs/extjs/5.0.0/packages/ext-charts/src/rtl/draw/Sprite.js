Ext.define('Ext.rtl.draw.Sprite', {
    override: 'Ext.draw.Sprite',
    
    /*
     * --------Using RTL text in charts--------
     * 
     * For RTL charts, the direction of the underlying SVG/VML elements is left
     * as LTR. This is to normalize cross browser differences that occur, especially since
     * getting the directions to work is mostly as simple as just flipping the order of
     * things. As such, by default the text will display in an LTR fashion as well.
     * 
     * One of the possible solutions is to go through and add direction: rtl; on all
     * of the text elements, however there are 2 problems with this:
     * 1) It doesn't work at all with VML.
     * 2) With SVG, the text displays differently between FF & Chrome, and also
     *    it affects the positioning of the text elements as well.
     * 
     * The option we've gone for is to include the right left mark (below) and
     * prepend it to any text. It's the easiest solution and should cover enough
     * cases to be handled in the charting package. The RLM tells the browser to
     * interpret character groups in a RTL fashion. Text with RTL characters will
     * display correctly whether in RTL or LTR mode, the RLM affects how other characters
     * are displayed around it.
     * 
     * Let's take the string (you'll need to paste these in browsers, somewhat of
     * a pain to get them to show up correctly in the LTR editor):
     * "10 \u05E9\u05DC\u05DD"
     * 
     * The above is how it will be displayed without the RLM.
     * With the RLM, it will be display as:
     * 
     * "\u200F10 \u05E9\u05DC\u05DD"
     * 
     * As you can see, the ordering of the Hebrew characters do
     * not change, however the surrounding characters move around
     * relative to what's already there.
     */
    
    // This character is the right to left mark
    // http://en.wikipedia.org/wiki/Right-to-left_mark
    // It is used to group characters in an RTL manner
    RLM: '\u200F',
    
    // A simple regex to match most strong RTL characters. Indicates that
    // the string contains RTL characters
    rtlRe: /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/,
    
    transformText: function(text) {
        var me = this;
        if (text && me.surface.isRtl && !Ext.isNumber(text) && me.rtlRe.test(text)) {
            // IE9m will display a strange visual artefact when showing
            // text with the RLM and there are no RTL characters in the string.
            // IE6 & 7 will still show the artefact, it seems to be unavoidable.
            return me.RLM + text;
        }
        return me.callParent(arguments);
    }    
});
