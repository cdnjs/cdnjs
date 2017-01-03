/**
 * @class Ext.draw.sprite.Image
 * @extends Ext.draw.sprite.Rect
 * 
 * A sprite that represents an image.
 */
Ext.define("Ext.draw.sprite.Image", {
    extend: "Ext.draw.sprite.Rect",
    alias: 'sprite.image',
    type: 'image',
    statics: {
        imageLoaders: {}
    },

    inheritableStatics: {
        def: {
            processors: {
                /**
                 * @cfg {String} [src=''] The image source of the sprite.
                 */
                src: 'string'
            },
            defaults: {
                src: '',
                width: null,
                height: null
            }
        }
    },

    render: function (surface, ctx) {
        var me = this,
            attr = me.attr,
            mat = attr.matrix,
            src = attr.src,
            x = attr.x,
            y = attr.y,
            width = attr.width,
            height = attr.height,
            loadingStub = Ext.draw.sprite.Image.imageLoaders[src],
            imageLoader,
            image,
            i;

        if (loadingStub && loadingStub.done) {
            mat.toContext(ctx);
            image = loadingStub.image;
            ctx.drawImage(image, x, y,
                    width || (image.naturalWidth || image.width) / surface.devicePixelRatio,
                    height || (image.naturalHeight || image.height) / surface.devicePixelRatio);
        } else if (!loadingStub) {
            imageLoader = new Image();
            loadingStub = Ext.draw.sprite.Image.imageLoaders[src] = {
                image: imageLoader,
                done: false,
                pendingSprites: [me],
                pendingSurfaces: [surface]
            };
            imageLoader.width = width;
            imageLoader.height = height;
            imageLoader.onload = function () {
                if (!loadingStub.done) {
                    loadingStub.done = true;
                    for (i = 0; i < loadingStub.pendingSprites.length; i++) {
                        loadingStub.pendingSprites[i].setDirty(true);
                    }
                    for (i in loadingStub.pendingSurfaces) {
                        loadingStub.pendingSurfaces[i].renderFrame();
                    }
                }
            };
            imageLoader.src = src;
        } else {
            Ext.Array.include(loadingStub.pendingSprites, me);
            Ext.Array.include(loadingStub.pendingSurfaces, surface);
        }
    }
});