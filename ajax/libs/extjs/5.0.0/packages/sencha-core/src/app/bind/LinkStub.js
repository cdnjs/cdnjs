/**
 * This class manages stubs associated with `link` requests. These bind to some other
 * descriptor and forward changes from there.
 * @private
 */
Ext.define('Ext.app.bind.LinkStub', {
    extend: 'Ext.app.bind.Stub',

    isLinkStub: true,

    binding: null,

    destroy: function () {
        var me = this,
            binding = me.binding,
            owner = me.owner;

        if (binding) {
            me.binding = null;
            binding.destroy();
            if (owner) {
                delete owner.linkData[me.name];
            }
        }
        me.target = null;

        me.callParent();
    },

    getFullName: function () {
        var me = this;
        return me.fullName ||
              (me.fullName = '(' + me.callParent() + ' -> ' + me.binding.getFullName() + ')');
    },

    getDataObject: function () {
        var binding = this.binding;
        return binding && binding.getDataObject();
    },

    getRawValue: function () {
        var binding = this.binding;
        return binding && binding.getRawValue();
    },

    getValue: function () {
        var binding = this.binding;

        return binding && binding.getValue();
    },

    getTargetStub: function () {
        var binding = this.binding;
        return binding && binding.stub;
    },

    isLoading: function () {
        var binding = this.binding;

        return binding ? binding.isLoading() : false;
    },

    link: function (bindDescriptor, target) {
        var me = this,
            binding = me.binding;

        if (binding) {
            binding.destroy();
        }

        target = me.target = target || me.owner; 
        me.linkDescriptor = bindDescriptor;
        me.binding = target.bind(bindDescriptor, me.onChange, me);
        me.binding.deep = true;
    },

    onChange: function () {
        this.invalidate(true);
    },

    react: function () {
        var me = this,
            linkData = me.owner.linkData;

        linkData[me.name] = me.getValue();
        me.callParent();
    },
    
    privates: {
        sort: function () {
            var binding = this.binding;

            if (binding) {
                // We want to make sure our binding reacts before we do so that it can provide
                // whatever value we might need first.
                this.scheduler.sortItem(binding);
            }
        }
    }
});
