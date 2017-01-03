/**
 * @private
 */
Ext.define('Ext.fx.animation.Wipe', {
    extend: 'Ext.fx.Animation',
    alternateClassName: 'Ext.fx.animation.WipeIn',

    config: {
        /**
         * Valid values are 'ease', 'linear', ease-in', 'ease-out', 'ease-in-out',
         * or a cubic-bezier curve as defined by CSS.
         */
        easing: 'ease-out',

        /**
         * @cfg {String} direction The direction of which the slide animates
         * @accessor
         */
        direction: 'right',

        /**
         * @cfg {Boolean} out True if you want to make this animation wipe out, instead of slide in.
         * @accessor
         */
        out: false
    },

    refresh: function() {
        var me = this,
            el        = me.getElement(),
            elBox     = el.dom.getBoundingClientRect(),
            elWidth   = elBox.width,
            elHeight  = elBox.height,
            from      = me.getFrom(),
            to        = me.getTo(),
            out       = me.getOut(),
            direction = me.getDirection(),
            maskFromX = 0,
            maskFromY = 0,
            maskToX   = 0,
            maskToY   = 0,
            mask, tmp;

        switch (direction) {
            case 'up':
                if (out) {
                    mask = '-webkit-gradient(linear, left top, left bottom, from(#000), to(transparent), color-stop(33%, #000), color-stop(66%, transparent))';
                    maskFromY = elHeight * 3 + 'px';
                    maskToY = elHeight + 'px';
                } else {
                    mask = '-webkit-gradient(linear, left top, left bottom, from(transparent), to(#000), color-stop(66%, #000), color-stop(33%, transparent))';
                    maskFromY = -elHeight * 2 + 'px';
                    maskToY = 0;
                }

                break;

            case 'down':
                if (out) {
                    mask = '-webkit-gradient(linear, left top, left bottom, from(transparent), to(#000), color-stop(66%, #000), color-stop(33%, transparent))';
                    maskFromY = -elHeight * 2 + 'px';
                    maskToY = 0;
                } else {
                    mask = '-webkit-gradient(linear, left top, left bottom, from(#000), to(transparent), color-stop(33%, #000), color-stop(66%, transparent))';
                    maskFromY = elHeight * 3 + 'px';
                    maskToY = elHeight + 'px';
                }

                break;

            case 'right':
                if (out) {
                    mask = '-webkit-gradient(linear, right top, left top, from(#000), to(transparent), color-stop(33%, #000), color-stop(66%, transparent))';
                    maskFromX = -elWidth * 2 + 'px';
                    maskToX = 0;
                } else {
                    mask = '-webkit-gradient(linear, right top, left top, from(transparent), to(#000), color-stop(66%, #000), color-stop(33%, transparent))';
                    maskToX = -elWidth * 2 + 'px';
                }

                break;

            case 'left':
                if (out) {
                    mask = '-webkit-gradient(linear, right top, left top, from(transparent), to(#000), color-stop(66%, #000), color-stop(33%, transparent))';
                    maskToX = -elWidth * 2 + 'px';
                } else {
                    mask = '-webkit-gradient(linear, right top, left top, from(#000), to(transparent), color-stop(33%, #000), color-stop(66%, transparent))';
                    maskFromX = -elWidth * 2 + 'px';
                    maskToX = 0;
                }

                break;
        }

        if (!out) {
            tmp = maskFromY;
            maskFromY = maskToY;
            maskToY = tmp;

            tmp = maskFromX;
            maskFromX = maskToX;
            maskToX = tmp;
        }

        from.set('mask-image', mask);
        from.set('mask-size', elWidth * 3 + 'px ' + elHeight * 3 + 'px');
        from.set('mask-position-x', maskFromX);
        from.set('mask-position-y', maskFromY);

        to.set('mask-position-x', maskToX);
        to.set('mask-position-y', maskToY);

        // me.setEasing(out ? 'ease-in' : 'ease-out');
    },

    getData: function() {
        this.refresh();

        return this.callParent(arguments);
    }
});
