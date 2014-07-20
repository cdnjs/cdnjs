Ext.define('Ext.sparkline.Shape', {
    constructor: function (target, id, type, args) {
        this.target = target;
        this.id = id;
        this.type = type;
        this.args = args;
    },
    append: function () {
        this.target.appendShape(this);
        return this;
    }
});