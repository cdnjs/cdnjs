/**
 * @private
 */
Ext.define('Ext.util.Offset', {

    /* Begin Definitions */

    statics: {
        fromObject: function(obj) {
            return new this(obj.x, obj.y);
        }
    },

    /* End Definitions */

    constructor: function(x, y) {
        this.x = (x != null && !isNaN(x)) ? x : 0;
        this.y = (y != null && !isNaN(y)) ? y : 0;

        return this;
    },

    copy: function() {
        return new Ext.util.Offset(this.x, this.y);
    },

    copyFrom: function(p) {
        this.x = p.x;
        this.y = p.y;
    },

    toString: function() {
        return "Offset[" + this.x + "," + this.y + "]";
    },

    equals: function(offset) {
        //<debug>
        if(!(offset instanceof this.statics())) {
            Ext.Error.raise('Offset must be an instance of Ext.util.Offset');
        }
        //</debug>

        return (this.x == offset.x && this.y == offset.y);
    },

    round: function(to) {
        if (!isNaN(to)) {
            var factor = Math.pow(10, to);
            this.x = Math.round(this.x * factor) / factor;
            this.y = Math.round(this.y * factor) / factor;
        } else {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }
    },

    isZero: function() {
        return this.x == 0 && this.y == 0;
    }
});
