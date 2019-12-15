/* global window alert jQuery */
/*
 * Gijgo JavaScript Library v0.6.2
 * http://gijgo.com/
 *
 * Copyright 2014, 2016 gijgo.com
 * Released under the MIT license
 */
/**  */
if (typeof (gj) === 'undefined') {
    gj = {};
}
if (typeof (gj.dialog) === 'undefined') {
    gj.dialog = {
        plugins: {}
    };
}

gj.dialog.config = {
    base: {
        /** If set to true, the dialog will automatically open upon initialization.
         * If false, the dialog will stay hidden until the open() method is called. */
        autoOpen: true,

        /** Specifies whether the dialog should close when it has focus and the user presses the escape (ESC) key. */
        closeOnEscape: true,

        /** If set to true, the dialog will be draggable by the title bar. */
        draggable: true,

        /** The height of the dialog. */
        height: 'auto',

        /** The minimum height in pixels to which the dialog can be resized. */
        minHeight: undefined,

        /** The maximum height in pixels to which the dialog can be resized. */
        maxHeight: undefined,

        /** The width of the dialog. */
        width: 300,

        /** The minimum width in pixels to which the dialog can be resized. */
        minWidth: undefined,

        /** The maximum width in pixels to which the dialog can be resized. */
        maxWidth: undefined,

        /** If set to true, the dialog will have modal behavior.
         * Modal dialogs create an overlay below the dialog, but above other page elements and you can't interact with them. */
        modal: false,

        /** If set to true, the dialog will be resizable. */
        resizable: false,

        /** The title of the dialog. Can be also set through the title attribute of the html element. */
        title: 'Dialog',

        /** The name of the UI library that is going to be in use. Currently we support only jQuery UI and Bootstrap.  */
        uiLibrary: undefined,

        style: {
            modal: 'gj-modal',
            content: 'gj-content',
            header: 'gj-header',
            headerTitle: 'gj-title',
            headerCloseButton: 'gj-close',
            body: 'gj-body',
            footer: 'gj-dialog-footer'
        }
    },

    bootstrap: {
        style: {
            modal: 'modal',
            content: 'modal-content',
            header: 'modal-header',
            headerTitle: 'modal-title',
            headerCloseButton: 'close',
            body: 'modal-body',
            footer: 'gj-dialog-footer modal-footer'
        }
    },

    jqueryui: {
        style: {
            modal: 'gj-modal',
            content: 'ui-widget ui-widget-content gj-dialog-content',
            header: 'gj-dialog-ui-header ui-widget-header',
            headerTitle: 'gj-dialog-ui-title',
            headerCloseButton: 'gj-dialog-ui-close ui-button ui-widget ui-state-default ui-corner-all',
            body: 'gj-dialog-ui-body',
            footer: 'gj-dialog-footer'
        }
    },

    foundation: {
        style: {
            modal: 'reveal-modal-bg',
            content: 'reveal-modal gj-dialog-fd-content',
            header: '',
            headerTitle: 'gj-dialog-fd-title gj-dialog-unselectable',
            headerCloseButton: 'close-reveal-modal right gj-dialog-fd-close',
            body: 'gj-dialog-fd-body',
            footer: 'gj-dialog-footer gj-dialog-fd-footer'
        }
    }
};
/**  */
gj.dialog.events = {
    /**
     * Triggered when the dialog is initialized.
     * */
    initialized: function ($dialog) {
        $dialog.trigger("initialized");
    },

    /**
     * Triggered before the dialog is opened. */
    opening: function ($dialog) {
        $dialog.trigger("opening");
    },

    /**
     * Triggered when the dialog is opened. */
    opened: function ($dialog) {
        $dialog.trigger("opened");
    },

    /**
     * Triggered before the dialog is closed. */
    closing: function ($dialog) {
        $dialog.trigger("closing");
    },

    /**
     * Triggered when the dialog is closed. */
    closed: function ($dialog) {
        $dialog.trigger("closed");
    },

    /**
     * Triggered while the dialog is being dragged. */
    drag: function ($dialog) {
        $dialog.trigger("drag");
    },

    /**
     * Triggered when the user starts dragging the dialog. */
    dragStart: function ($dialog) {
        $dialog.trigger("dragStart");
    },

    /**
     * Triggered after the dialog has been dragged. */
    dragStop: function ($dialog) {
        $dialog.trigger("dragStop");
    },

    /**
     * Triggered while the dialog is being resized. */
    resize: function ($dialog) {
        $dialog.trigger("resize");
    },

    /**
     * Triggered when the user starts resizing the dialog. */
    resizeStart: function ($dialog) {
        $dialog.trigger("resizeStart");
    },

    /**
     * Triggered after the dialog has been resized. */
    resizeStop: function ($dialog) {
        $dialog.trigger("resizeStop");
    }
};

gj.dialog.methods = {

    init: function (jsConfig) {
        var plugin, option, data;
        gj.dialog.methods.configure(this, jsConfig || {});

        //Apply plugins configuration
        for (plugin in gj.dialog.plugins) {
            if (gj.dialog.plugins.hasOwnProperty(plugin)) {
                gj.dialog.plugins[plugin].configure(this);
            }
        }

        //Initialize events configured as options
        data = this.data();
        for (option in data) {
            if (gj.dialog.events.hasOwnProperty(option)) {
                this.on(option, data[option]);
                delete data[option];
            }
        }

        gj.dialog.methods.initialize(this);
        gj.dialog.events.initialized(this);
        return this;
    },

    configure: function ($dialog, jsConfig) {
        var options = $.extend(true, {}, gj.dialog.config.base),
            htmlConfig = gj.dialog.methods.getHTMLConfiguration($dialog);
        if ((jsConfig.uiLibrary && jsConfig.uiLibrary === 'bootstrap') || (htmlConfig.uiLibrary && htmlConfig.uiLibrary === 'bootstrap')) {
            $.extend(true, options, gj.dialog.config.bootstrap);
        } else if ((jsConfig.uiLibrary && jsConfig.uiLibrary === 'jqueryui') || (htmlConfig.uiLibrary && htmlConfig.uiLibrary === 'jqueryui')) {
            $.extend(true, options, gj.dialog.config.jqueryui);
        } else if ((jsConfig.uiLibrary && jsConfig.uiLibrary === 'foundation') || (htmlConfig.uiLibrary && htmlConfig.uiLibrary === 'foundation')) {
            $.extend(true, options, gj.dialog.config.foundation);
        }
        $.extend(true, options, htmlConfig);
        $.extend(true, options, jsConfig);
        $dialog.data(options);
    },

    getHTMLConfiguration: function ($dialog) {
        var result = $dialog.data(),
            attrs = $dialog[0].attributes;
        if (attrs['title']) {
            result.title = attrs['title'].nodeValue;
        }
        if (attrs['width']) {
            result.width = attrs['width'].nodeValue;
        }
        if (attrs['height']) {
            result.height = attrs['height'].nodeValue;
        }
        return result;
    },

    initialize: function ($dialog) {
        var data = $dialog.data(),
            $body, $header;

        $dialog.addClass(data.style.content);

        gj.dialog.methods.setSize($dialog);

        if (data.closeOnEscape) {
            $(document).keyup(function (e) {
                if (e.keyCode === 27) {
                    $dialog.close();
                }
            });
        }

        $body = $dialog.children('div[data-role="body"]');
        if ($body.length === 0) {
            $body = $('<div data-role="body"/>').addClass(data.style.body);
            $dialog.wrapInner($body);
        } else {
            $body.addClass(data.style.body);
        }

        $header = $dialog.children('div[data-role="header"]');
        if ($header.length === 0) {
            $header = $('<div data-role="header" />');
            gj.dialog.methods.createHeader($dialog, $header);
        }
        $header.addClass(data.style.header);

        $dialog.children('div[data-role="footer"]').addClass(data.style.footer);

        $dialog.find('[data-role="close"]').on('click', function () {
            $dialog.close();
        });

        if (data.draggable && $.fn.draggable) {
            gj.dialog.methods.draggable($dialog, $header);
        }

        if (data.resizable && $.fn.draggable) {
            gj.dialog.methods.resizable($dialog);
        }

        gj.dialog.methods.setPosition($dialog);

        if (data.modal) {
            $dialog.wrapAll('<div data-role="modal" class="' + data.style.modal + '"/>');
        }

        if (data.autoOpen) {
            $dialog.open();
        }
    },

    setSize: function ($dialog) {
        var data = $dialog.data();
        if (data.width) {
            $dialog.css("width", data.width);
        }
        if (data.height) {
            $dialog.css("height", data.height);
        }
    },

    createHeader: function ($dialog, $header) {
        var data = $dialog.data(),
            $closeButton = $('<button type="button" data-role="close"><span>×</span></button>');
        $closeButton.addClass(data.style.headerCloseButton);
        $header.append($closeButton);
        $header.append('<h4 data-role="title" class="' + data.style.headerTitle + '">' + data.title + '</h4>');
        $dialog.prepend($header);
    },

    setPosition: function ($dialog) {
        $dialog.css('position', 'absolute');
        $dialog.css('left', ($(window).width() / 2) - ($dialog.width() / 2));
        $dialog.css('top', ($(window).height() / 2) - ($dialog.height() / 2));
    },

    draggable: function ($dialog, $header) {
        $dialog.appendTo('body');
        $header.addClass('gj-draggable');
        $dialog.draggable({
            handle: $header,
            start: function () {
                $dialog.addClass('gj-dialog-unselectable');
                gj.dialog.events.dragStart($dialog);
            },
            stop: function () {
                $dialog.removeClass('gj-dialog-unselectable');
                gj.dialog.events.dragStop($dialog);
            }
        });
    },

    resizable: function ($dialog) {
        var config = {
            'drag': gj.dialog.methods.resize,
            'start': function () {
                $dialog.addClass('gj-dialog-unselectable');
                gj.dialog.events.resizeStart($dialog);
            },
            'stop': function () {
                $dialog.removeClass('gj-dialog-unselectable');
                gj.dialog.events.resizeStop($dialog);
            }
        };
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-n"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-e"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-s"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-w"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-ne"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-nw"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-sw"></div>').draggable($.extend(true, {}, config)));
        $dialog.append($('<div class="gj-resizable-handle gj-resizable-se"></div>').draggable($.extend(true, {}, config)));
    },

    resize: function (e, offset) {
        var $el, $dialog, data, height, width, top, left;

        $el = $(this);
        $dialog = $el.parent();
        data = $dialog.data();

        //TODO: Include margins in the calculations
        if ($el.hasClass('gj-resizable-n')) {
            height = $dialog.height() - offset.top;
            top = $dialog.offset().top + offset.top;
        } else if ($el.hasClass('gj-resizable-e')) {
            width = $dialog.width() + offset.left;
        } else if ($el.hasClass('gj-resizable-s')) {
            height = $dialog.height() + offset.top;
        } else if ($el.hasClass('gj-resizable-w')) {
            width = $dialog.width() - offset.left;
            left = $dialog.offset().left + offset.left;
        } else if ($el.hasClass('gj-resizable-ne')) {
            height = $dialog.height() - offset.top;
            top = $dialog.offset().top + offset.top;
            width = $dialog.width() + offset.left;
        } else if ($el.hasClass('gj-resizable-nw')) {
            height = $dialog.height() - offset.top;
            top = $dialog.offset().top + offset.top;
            width = $dialog.width() - offset.left;
            left = $dialog.offset().left + offset.left;
        } else if ($el.hasClass('gj-resizable-se')) {
            height = $dialog.height() + offset.top;
            width = $dialog.width() + offset.left;
        } else if ($el.hasClass('gj-resizable-sw')) {
            height = $dialog.height() + offset.top;
            width = $dialog.width() - offset.left;
            left = $dialog.offset().left + offset.left;
        }

        if (height && (!data.minHeight || height >= data.minHeight) && (!data.maxHeight || height <= data.maxHeight)) {
            $dialog.height(height);
            if (top) {
                $dialog.css('top', top);
            }
        }

        if (width && (!data.minWidth || width >= data.minWidth) && (!data.maxWidth || width <= data.maxWidth)) {
            $dialog.width(width);
            if (left) {
                $dialog.css('left', left);
            }
        }

        gj.dialog.events.resize($dialog);
    },

    open: function ($dialog) {
        if (!$dialog.is(':visible')) {
            gj.dialog.events.opening($dialog);
            $dialog.css('display', 'block');
            $dialog.closest('div[data-role="modal"]').css('display', 'block');
            gj.dialog.events.opened($dialog);
        }
        return $dialog;
    },

    close: function ($dialog) {
        if ($dialog.is(':visible')) {
            gj.dialog.events.closing($dialog);
            $dialog.css('display', 'none');
            $dialog.closest('div[data-role="modal"]').css('display', 'none');
            gj.dialog.events.closed($dialog);
        }
        return $dialog;
    },

    isOpen: function ($dialog) {
        return $dialog.is(':visible');
    }
};
/**  */
function Dialog($dialog, arguments) {
    var self = this,
        methods = gj.dialog.methods;

    /**
     * Opens the dialog. */
    self.open = function () {
        return methods.open(this);
    },

    /**
     * Close the dialog. */
    self.close = function () {
        return methods.close(this);
    },

    /**
     * Check if the dialog is currently open. */
    self.isOpen = function () {
        return methods.isOpen(this);
    }

    $.extend($dialog, self);
    methods.init.apply($dialog, arguments);

    return $dialog;
};

(function ($) {
    $.fn.dialog = function (method) {
        if (typeof method === 'object' || !method) {
            return new Dialog(this, arguments);
        } else if (gj.dialog.methods[method]) {
            return gj.dialog.methods[method].apply(this, [this].concat(Array.prototype.slice.call(arguments, 1)));
        } else {
            throw 'Method ' + method + ' does not exist.';
        }
    };
})(jQuery);
