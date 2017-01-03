/**
 * @abstract
 * @extends Ext.chart.series.Cartesian
 * Abstract class for all the stacked cartesian series including area series
 * and bar series.
 */
Ext.define('Ext.chart.series.StackedCartesian', {

    extend: 'Ext.chart.series.Cartesian',

    config: {
        /**
         * @cfg {Boolean}
         * 'true' to display the series in its stacked configuration.
         */
        stacked: true,

        /**
         * @cfg {Array} hidden
         */
        hidden: []
    },

    animatingSprites: 0,

    themeColorCount: function() {
        var me = this,
            yField = me.getYField();
        return (Ext.isArray(yField) ? yField.length : 1);
    },

    updateStacked: function () {
        this.processData();
    },

    coordinateY: function () {
        return this.coordinateStacked('Y', 1, 2);
    },

    getFields: function (fieldCategory) {
        var me = this,
            fields = [], fieldsItem,
            i, ln;
        for (i = 0, ln = fieldCategory.length; i < ln; i++) {
            fieldsItem = me['get' + fieldCategory[i] + 'Field']();
            if (Ext.isArray(fieldsItem)) {
                fields.push.apply(fields, fieldsItem);
            } else {
                fields.push(fieldsItem);
            }
        }
        return fields;
    },

    updateLabelOverflowPadding: function (labelOverflowPadding) {
        this.getLabel().setAttributes({labelOverflowPadding: labelOverflowPadding});
    },

    getSprites: function () {
        var me = this,
            chart = this.getChart(),
            animation = chart && chart.getAnimation(),
            fields = me.getFields(me.fieldCategoryY),
            itemInstancing = me.getItemInstancing(),
            sprites = me.sprites, sprite,
            hidden = me.getHidden(),
            spritesCreated = false,
            i, length = fields.length;

        if (!chart) {
            return [];
        }

        for (i = 0; i < length; i++) {
            sprite = sprites[i];
            if (!sprite) {
                sprite = me.createSprite();
                sprite.setAttributes({zIndex: -i});

                sprite.setField(fields[i]);
                spritesCreated = true;
                hidden.push(false);
                if (itemInstancing) {
                    sprite.itemsMarker.getTemplate().setAttributes(me.getStyleByIndex(i));
                } else {
                    sprite.setAttributes(me.getStyleByIndex(i));
                }
            }
            if (animation) {
                if (itemInstancing) {
                    sprite.itemsMarker.getTemplate().fx.setConfig(animation);
                }
                sprite.fx.setConfig(animation);
            }
        }

        if (spritesCreated) {
            me.updateHidden(hidden);
        }
        return sprites;
    },

    getItemForPoint: function (x, y) {
        if (this.getSprites()) {
            var me = this,
                i, ln, sprite,
                itemInstancing = me.getItemInstancing(),
                sprites = me.getSprites(),
                store = me.getStore(),
                hidden = me.getHidden(),
                item, index, yField;

            for (i = 0, ln = sprites.length; i < ln; i++) {
                if (!hidden[i]) {
                    sprite = sprites[i];
                    index = sprite.getIndexNearPoint(x, y);
                    if (index !== -1) {
                        yField = me.getYField();
                        item = {
                            series: me,
                            index: index,
                            category: itemInstancing ? 'items' : 'markers',
                            record: store.getData().items[index],
                            // Handle the case where we're stacked but a single segment
                            field: typeof yField === 'string' ? yField : yField[i],
                            sprite: sprite
                        };
                        return item;
                    }
                }
            }
            return null;
        }
    },

    provideLegendInfo: function (target) {
        var me = this,
            sprites = me.getSprites(),
            title = me.getTitle(),
            field = me.getYField(),
            hidden = me.getHidden(),
            single = sprites.length === 1,
            style, name;

        for (var i = 0; i < sprites.length; i++) {
            style = me.getStyleByIndex(i);
            if (Ext.isArray(title)) {
                name = title[i];
            } else if (single) {
                name = title;
            } else if (Ext.isArray(field)) {
                name = field[i];
            } else {
                name = me.getId();
            }
            target.push({
                name: name,
                mark: style.fillStyle || style.strokeStyle || 'black',
                disabled: hidden[i],
                series: me.getId(),
                index: i
            });
        }
    },

    onSpriteAnimationStart: function (sprite) {
        this.animatingSprites++;
        if (this.animatingSprites === 1) {
            this.fireEvent('animationstart');
        }
    },

    onSpriteAnimationEnd: function (sprite) {
        this.animatingSprites--;
        if (this.animatingSprites === 0) {
            this.fireEvent('animationend');
        }
    }
});
