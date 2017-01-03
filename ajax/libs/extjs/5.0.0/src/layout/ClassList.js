/**
 * This class provides a DOM ClassList API to buffer access to an element's class.
 * Instances of this class are created by {@link Ext.layout.ContextItem#getClassList}.
 */
Ext.define('Ext.layout.ClassList', (function () {

    var splitWords = Ext.String.splitWords,
        toMap = Ext.Array.toMap;

    return {
        dirty: false,

        constructor: function (owner) {
            this.owner = owner;
            this.map = toMap(this.classes = splitWords(owner.el.className));
        },

        /**
         * Adds a single class to the class list.
         */
        add: function (cls) {
            var me = this;

            if (!me.map[cls]) {
                me.map[cls] = true;
                me.classes.push(cls);
                if (!me.dirty) {
                    me.dirty = true;
                    me.owner.markDirty();
                }
            }
        },

        /**
         * Adds one or more classes in an array or space-delimited string to the class list.
         */
        addMany: function (classes) {
            Ext.each(splitWords(classes), this.add, this);
        },

        contains: function (cls) {
            return this.map[cls];
        },

        flush: function () {
            this.owner.el.className = this.classes.join(' ');
            this.dirty = false;
        },

        /**
         * Removes a single class from the class list.
         */
        remove: function (cls) {
            var me = this;

            if (me.map[cls]) {
                delete me.map[cls];
                me.classes = Ext.Array.filter(me.classes, function (c) {
                    return c != cls;
                });
                if (!me.dirty) {
                    me.dirty = true;
                    me.owner.markDirty();
                }
            }
        },

        /**
         * Removes one or more classes in an array or space-delimited string from the class
         * list.
         */
        removeMany: function (classes) {
            var me = this,
                remove = toMap(splitWords(classes));

            me.classes = Ext.Array.filter(me.classes, function (c) {
                if (!remove[c]) {
                    return true;
                }

                delete me.map[c];
                if (!me.dirty) {
                    me.dirty = true;
                    me.owner.markDirty();
                }
                return false;
            });
        }
    };
}()));
