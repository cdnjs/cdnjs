/**
 * The Draw Container is a surface in which sprites can be rendered. The Draw Container
 * manages and holds a `Surface` instance: an interface that has
 * an SVG or Canvas implementation depending on the browser capabilities and where
 * Sprites can be appended.
 * One way to create a draw container is:
 *
 *     var drawContainer = new Ext.draw.Container({
 *         items: [{
 *             type: 'circle',
 *             fill: '#79BB3F',
 *             radius: 100,
 *             x: 100,
 *             y: 100
 *         }]
 *     });
 *
 *     new Ext.Panel({
 *         fullscreen: true,
 *         items: [drawContainer]
 *     });
 *
 * In this case we created a draw container and added a sprite to it.
 * The *type* of the sprite is *circle*, so if you run this code you'll see a yellow-ish circle.
 *
 * You can also add sprites by using the surface's add method:
 *
 *     drawContainer.getSurface('main').add({
 *         type: 'circle',
 *         fill: '#79BB3F',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 *
 * For more information on Sprites, the core elements added to a draw container's surface,
 * refer to the {@link Ext.draw.sprite.Sprite} documentation.
 */
Ext.define('Ext.draw.Container', {
    extend: 'Ext.draw.ContainerBase',
    alternateClassName: 'Ext.draw.Component',
    xtype: 'draw',
    defaultType: 'surface',

    requires: [
        'Ext.draw.Surface',
        'Ext.draw.engine.Svg',
        'Ext.draw.engine.Canvas',
        'Ext.draw.gradient.GradientDefinition'
    ],
    engine: 'Ext.draw.engine.Canvas',

    config: {
        cls: Ext.baseCSSPrefix + 'draw-container',

        /**
         * @cfg {Function} [resizeHandler] The resize function that can be configured to have a behavior.
         *
         * __Note:__ since resize events trigger {@link #renderFrame} calls automatically,
         * return `false` from the resize function, if it also calls `renderFrame`, to prevent double rendering.
         */
        resizeHandler: null,

        background: null,

        sprites: null,

        /**
         * @cfg {Object[]} gradients
         * Defines a set of gradients that can be used as color properties
         * (fillStyle and strokeStyle, but not shadowColor) in sprites.
         * The gradients array is an array of objects with the following properties:
         * - **id** - string - The unique name of the gradient.
         * - **type** - string, optional - The type of the gradient. Available types are: 'linear', 'radial'. Defaults to 'linear'.
         * - **angle** - number, optional - The angle of the gradient in degrees.
         * - **stops** - array - An array of objects with 'color' and 'offset' properties, where 'offset' is a real number from 0 to 1.
         *
         * For example:
         *
         *     gradients: [{
         *         id: 'gradientId1',
         *         type: 'linear',
         *         angle: 45,
         *         stops: [{
         *             offset: 0,
         *             color: 'red'
         *         }, {
         *            offset: 1,
         *            color: 'yellow'
         *         }]
         *     }, {
         *        id: 'gradientId2',
         *        type: 'radial',
         *        stops: [{
         *            offset: 0,
         *            color: '#555',
         *        }, {
         *            offset: 1,
         *            color: '#ddd',
         *        }]
         *     }]
         *
         * Then the sprites can use 'gradientId1' and 'gradientId2' by setting the color attributes to those ids, for example:
         *
         *     sprite.setAttributes({
         *         fillStyle: 'url(#gradientId1)',
         *         strokeStyle: 'url(#gradientId2)'
         *     });
         */
        gradients: []
    },

    /**
     * @property {String} [defaultDownloadServerUrl="http://svg.sencha.io"]
     * The default URL used by {@link #download}.
     */
    defaultDownloadServerUrl: 'http://svg.sencha.io',

    /**
     * @property {Array} [supportedFormats=["png", "pdf", "jpeg", "gif"]]
     * A list of export types supported by the server.
     * @private
     */
    supportedFormats: ['png', 'pdf', 'jpeg', 'gif'],

    supportedOptions: {
        version: Ext.isNumber,
        data: Ext.isString,
        format: function (format) {
            return Ext.Array.indexOf(this.supportedFormats, format) >= 0;
        },
        filename: Ext.isString,
        width: Ext.isNumber,
        height: Ext.isNumber,
        scale: Ext.isNumber,
        pdf: Ext.isObject,
        jpeg: Ext.isObject
    },

    initAnimator: function() {
        this.frameCallbackId = Ext.draw.Animator.addFrameCallback('renderFrame', this);
    },

    applyGradients: function (gradients) {
        var result = [],
            i, n, gradient, offset;
        if (!Ext.isArray(gradients)) {
            return result;
        }
        for (i = 0, n = gradients.length; i < n; i++) {
            gradient = gradients[i];
            if (!Ext.isObject(gradient)) {
                continue;
            }
            // ExtJS only supported linear gradients, so we didn't have to specify their type
            if (typeof gradient.type !== 'string') {
                gradient.type = 'linear';
            }
            if (gradient.angle) {
                gradient.degrees = gradient.angle;
                delete gradient.angle;
            }
            // Convert ExtJS stops object to Touch stops array
            if (Ext.isObject(gradient.stops)) {
                gradient.stops = (function (stops) {
                    var result = [], stop;
                    for (offset in stops) {
                        stop = stops[offset];
                        stop.offset = offset / 100;
                        result.push(stop);
                    }
                    return result;
                })(gradient.stops);
            }
            result.push(gradient);
        }
        Ext.draw.gradient.GradientDefinition.add(result);
        return result;
    },

    applySprites: function (sprites) {
        // Never update
        if (!sprites) {
            return;
        }

        sprites = Ext.Array.from(sprites);

        var ln = sprites.length,
            i, surface;

        for (i = 0; i < ln; i++) {
            if (sprites[i].surface instanceof Ext.draw.Surface) {
                surface = sprites[i].surface;
            } else if (Ext.isString(sprites[i].surface)) {
                surface = this.getSurface(sprites[i].surface);
            } else {
                surface = this.getSurface('main');
            }
            surface.add(sprites[i]);
        }
    },

    /**
     * @protected
     * Place watermark after resize.
     * @param {Number} width
     * @param {Number} height
     */
    onPlaceWatermark: Ext.emptyFn,

    onBodyResize: function () {
        var me = this,
            size = me.element.getSize(),
            resizeHandler = me.getResizeHandler() || me.resizeHandler,
            result;
        me.fireEvent('resize', me, size);
        result = resizeHandler.call(me, size);
        if (result !== false) {
            me.renderFrame();
            me.onPlaceWatermark(size.width, size.height);
        }
    },

    resizeHandler: function (size) {
        this.getItems().each(function (surface) {
            surface.setRect([0, 0, size.width, size.height]);
        });
    },

    /**
     * Get a surface by the given id or create one if it doesn't exist.
     * @param {String} [id="main"]
     * @return {Ext.draw.Surface}
     */
    getSurface: function (id) {
        id = this.getId() + '-' + (id || 'main');
        var me = this,
            surfaces = me.getItems(),
            surface = surfaces.get(id);
        if (!surface) {
            surface = me.add({xclass: me.engine, id: id});
            surface.renderFrame();
        }
        return surface;
    },

    /**
     * Render all the surfaces in the container.
     */
    renderFrame: function () {
        var me = this,
            surfaces = me.getItems(),
            i, ln, item;

        for (i = 0, ln = surfaces.length; i < ln; i++) {
            item = surfaces.items[i];
            if (item.isSurface) {
                item.renderFrame();
            }
        }
    },

    /**
     * Produces an image of the chart.
     * @param {String} [format] Possible options are 'image' (the method will return an Image object)
     *                          and 'stream' (the method will return the image as a byte stream).
     *                          If missing, the DataURL of the chart's image will be returned.
     * @return {Object}
     * @return {String} return.data Image element, byte stream or DataURL.
     * @return {String} return.type The type of the data (e.g. 'png' or 'svg').
     */
    getImage: function (format) {
        var size = this.innerElement.getSize(),
            surfaces = Array.prototype.slice.call(this.items.items),
            image, imageElement,
            zIndexes = this.surfaceZIndexes,
            i, j, surface, zIndex;

        // Sort the surfaces by zIndex using insertion sort.
        for (j = 1; j < surfaces.length; j++) {
            surface = surfaces[j];
            zIndex = zIndexes[surface.type];
            i = j - 1;
            while (i >= 0 && zIndexes[surfaces[i].type] > zIndex) {
                surfaces[i + 1] = surfaces[i];
                i--;
            }
            surfaces[i + 1] = surface;
        }

        image = surfaces[0].flatten(size, surfaces);

        if (format === 'image') {
            imageElement = new Image();
            imageElement.src = image.data;
            image.data = imageElement;
            return image;
        }
        if (format === 'stream') {
            image.data = image.data.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
            return image;
        }
        return image;
    },

    /**
     * Downloads an image or PDF of the chart or opens it in a separate browser tab/window
     * if the download can't be triggered. The exact behavior is platform and browser
     * specific.
     *
     * @param {Object} [config] The following config options are supported:
     *
     * @param {String} config.url The url to post the data to. Defaults to
     * the {@link #defaultUrl} configuration on the class.
     *
     * @param {String} config.format The format of image to export. See the
     * {@link #supportedFormats}. Defaults to 'png' on the Sencha IO server.
     *
     * @param {Number} config.width A width to send to the server for
     * configuring the image width. Defaults to natural image width on
     * the Sencha IO server.
     *
     * @param {Number} config.height A height to send to the server for
     * configuring the image height. Defaults to natural image height on
     * the Sencha IO server.
     *
     * @param {String} config.filename The filename of the downloaded image.
     * Defaults to 'chart' on the Sencha IO server. The config.format is used
     * as a filename extension.
     *
     * @param {Number} config.scale The scaling of the downloaded image.
     * Defaults to the value of window.devicePixelRatio on the client.
     * This parameter is ignored by the Sencha IO server if config.format is set to 'svg'.
     *
     * @param {Object} config.pdf PDF specific options.
     * This config is only used if config.format is set to 'pdf'.
     * The given object should be in either this format:
     *
     *     {
     *       width: '200px',
     *       height: '300px',
     *       border: '0px'
     *     }
     *
     * or this format:
     *
     *     {
     *       format: 'A4',
     *       orientation: 'portrait',
     *       border: '1cm'
     *     }
     *
     * Supported dimension units are: 'mm', 'cm', 'in', 'px'. No unit means 'px'.
     * Supported formats are: 'A3', 'A4', 'A5', 'Legal', 'Letter', 'Tabloid'.
     * Orientation ('portrait', 'landscape') is optional and defaults to 'portrait'.
     *
     * @param {Object} config.jpeg JPEG specific options.
     * This config is only used if config.format is set to 'jpeg'.
     * The given object should be in this format:
     *
     *     {
     *       quality: 80
     *     }
     *
     * Where quality is an integer between 0 and 100.
     *
     * @return {Boolean} True if request was successfully sent to the server.
     */
    download: function (config) {
        var me = this,
            inputs = [],
            markup, name, value;

        config = Ext.apply({
            version: 2,
            data: me.getImage().data
        }, config);

        for (name in config) {
            if (config.hasOwnProperty(name)) {
                value = config[name];
                if (name in me.supportedOptions) {
                    if (me.supportedOptions[name].call(me, value)) {
                        inputs.push({
                            tag: 'input',
                            type: 'hidden',
                            name: name,
                            value: Ext.isObject(value) ? Ext.JSON.encode(value) : value
                        });
                    }
                    //<debug>
                    else {
                        Ext.log.error('Invalid value for image download option "' + name + '": ' + value);
                    }
                    //</debug>
                }
                //<debug>
                else {
                    Ext.log.error('Invalid image download option: "' + name + '"');
                }
                //</debug>
            }
        }

        markup = Ext.dom.Helper.markup({
            tag: 'html',
            children: [
                {tag: 'head'},
                {
                    tag: 'body',
                    children: [
                        {
                            tag: 'form',
                            method: 'POST',
                            action: config.url || me.defaultDownloadServerUrl,
                            children: inputs
                        },
                        {
                            tag: 'script',
                            type: 'text/javascript',
                            children: 'document.getElementsByTagName("form")[0].submit();'
                        }
                    ]
                }
            ]
        });

        window.open('', 'ImageDownload_' + Date.now()).document.write(markup);
    },

    /**
     * @method preview
     * Displays an image of a Ext.draw.Container on screen.
     * On mobile devices this lets users tap-and-hold to bring up the menu
     * with image saving options.
     * Note: some browsers won't save the preview image if it's SVG based
     * (i.e. generated from a draw container that uses 'Ext.draw.engine.Svg' engine).
     * And some platforms may not have the means of viewing successfully saved SVG images.
     */

    destroy: function () {
        var callbackId = this.frameCallbackId;
        if (callbackId) {
            Ext.draw.Animator.removeFrameCallback(callbackId);
        }
        this.callParent();
    }

}, function () {
    if (location.search.match('svg')) {
        Ext.draw.Container.prototype.engine = 'Ext.draw.engine.Svg';
    } else if ((Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) || (Ext.browser.is.AndroidStock4 && (Ext.os.version.getMinor() === 1 || Ext.os.version.getMinor() === 2 || Ext.os.version.getMinor() === 3))) {
        // http://code.google.com/p/android/issues/detail?id=37529
        Ext.draw.Container.prototype.engine = 'Ext.draw.engine.Svg';
    }
});
