//Author      : @arboshiki
/**
 * Generates random string of n length.
 * String contains only letters and numbers
 *
 * @param {int} n
 * @returns {String}
 */
Math.randomString = function (n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

/**
 * This function is for HTML element style attribute.
 * It converts the style attribute to css object
 *
 * @returns {object}
 */
String.prototype.getCss = function () {
    var css = {};
    var style = this.valueOf().split(';');
    for (var i = 0; i < style.length; i++) {
        style[i] = $.trim(style[i]);
        if (style[i]) {
            var s = style[i].split(':');
            css[$.trim(s[0])] = $.trim(s[1]);
        }
    }
    return css;
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.toCamel = function () {
    return this.replace(/(\-[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('-', '');
    });
};

String.prototype.toDash = function () {
    return this.replace(/([A-Z])/g, function ($1) {
        return "-" + $1.toLowerCase();
    });
};
String.prototype.toUnderscore = function () {
    return this.replace(/([A-Z])/g, function ($1) {
        return "_" + $1.toLowerCase();
    });
};

/**
 * Checks if number is between two numbers
 *
 * @param {number} num1
 * @param {number} num2
 * @param {boolean} including "include these numbers in comparison or not" default false
 * @returns boolean
 */
Number.prototype.isBetween = function (num1, num2, including) {
    if (!including) {
        if (this.valueOf() < num2 && this.valueOf() > num1) {
            return true;
        }
    } else {
        if (this.valueOf() <= num2 && this.valueOf() >= num1) {
            return true;
        }
    }
    return false;
};

/**
 * Inserts element at specific index in given elements children
 *
 * @param {number} i
 * @param {string} selector
 * @returns {undefined}
 */
$.fn.insertAt = function (i, selector) {
    var object = selector;
    if (typeof selector === 'string') {
        object = $(selector);
    }

    i = Math.min(object.children().length, i);
    if (i == 0) {
        object.prepend(this);
        return this;
    }
    var oldIndex = this.data('index');

    this.attr('data-index', i);
    object.find(">*:nth-child(" + i + ")").after(this);
    object.children().each(function (index, el) {
        var $el = $(el);
        if (oldIndex < i && index > oldIndex && index <= i) {
            $el.attr('data-index', parseInt($el.data('data-index'), 10) - 1);
        } else if (oldIndex >= i && index > i && index <= oldIndex) {
            $el.attr('data-index', parseInt($el.attr('data-index'), 10) + 1);
        }
    });
    return this;
};

$.fn.disableSelection = function () {
    return this
        .attr('unselectable', 'on')
        .css('user-select', 'none')
        .on('selectstart', false);
};

$.fn.enableSelection = function () {
    return this
        .removeAttr('unselectable')
        .css('user-select', 'initial')
        .off('selectstart');
};

$(function () {
    var STORAGE_PREFIX = 'lobipanel_';

    var LobiPanel = function ($el, options) {
        var me = this;

        this.hasRandomId = false;
        this.storage = null;


        this.$el = $el;
        if (!me.$el.data('inner-id')) {
            me.hasRandomId = true;
            me.$el.attr('data-inner-id', Math.randomString(10));
        }

        this.innerId = me.$el.data('inner-id');

        this.$options = me._processInput(options);
        me.$heading = this.$el.find('>.panel-heading');
        me.$body = this.$el.find('>.panel-body');
        me._init();
        me.$el.css('display', 'none');
        me._applyState(me.$options.state, me.$options.stateParams);
        me.$el.css('display', 'block');
        me._applyIndex(me.$options.initialIndex);
    };

    LobiPanel.prototype = {
        _processInput: function (options) {
            var me = this;
            if (!options) {
                options = {};
            }


            if (!me.hasRandomId) {
                me.storage = localStorage.getItem(STORAGE_PREFIX + me.innerId);
                me.storage = JSON.parse(me.storage) || {};
            }
            var opts = me._getOptionsFromAttributes();
//            window.console.log(opts);
            options = $.extend({}, $.fn.lobiPanel.DEFAULTS, me.storage, options, opts);
            var objects = ['unpin', 'reload', 'expand', 'minimize', 'close', 'editTitle'];
            for (var i = 0; i < objects.length; i++) {
                var prop = objects[i];
                if (typeof options[prop] === 'object') {
                    options[prop] = $.extend({}, $.fn.lobiPanel.DEFAULTS[prop], options[prop], opts[prop]);
                }
            }
            return options;
        },
        _init: function () {
            var me = this;
            me.$el.addClass('lobipanel');

            me.$heading.append(me._generateControls());
//------------------------------------------------------------------------------
            var parent = me.$el.parent();
            me._appendInnerIdToParent(parent, me.innerId);
            me._enableSorting();
            me._onToggleIconsBtnClick();
            me._enableResponsiveness();
            me._setBodyHeight();
            if (me.$options.autoload) {
                me.load();
            }
            var maxWidth = 'calc(100% - ' + me.$heading.find('.dropdown-menu').children().length * me.$heading.find('.dropdown-menu li').first().outerWidth() + "px)";
            me.$heading.find('.panel-title').css('max-width', maxWidth);

            me._triggerEvent("init");
        },
        /**
         * Checks if panel is initialized. Panel is initialized if it has
         * lobipanel class and data-inner-id="" attribute
         *
         * @returns {boolean}
         */
        isPanelInit: function () {
            var me = this;
            return me.$el.hasClass('lobipanel') && me.$el.data('inner-id');
        },

        /**
         * Checks if panel is pinned or unpinned
         *
         * @returns {Boolean}
         */
        isPinned: function () {
            var me = this;
            return !me.$el.hasClass('panel-unpin');
        },

        /**
         * Pin the panel
         *
         * @returns {LobiPanel}
         */
        pin: function () {
            var me = this;

            //disable resize functionality
            me.disableResize();
            me.disableDrag();
            me._enableSorting();
            //remove on panel click event (which brings the panel into front)
            me._offPanelClick();
            //remove panel-unpin class
            me.$el.removeClass('panel-unpin')
                //save current position, z-index and size to use it for later unpin
                .attr('old-style', me.$el.attr('style'))
                .removeAttr('style')
                .css('position', 'relative');
            me.$body.css({
                width: '',
                height: ''
            });
            me._setBodyHeight();
            me._insertInParent();
            return me;
        },

        /**
         * Unpin the panel
         *
         * @returns {LobiPanel}
         */
        unpin: function () {
            var me = this;
            if (me.$el.hasClass("panel-collapsed")) {
                return me;
            }
            me._disableSorting();
            if (me.$el.attr('old-style')) {
                me.$el.attr('style', me.$el.attr('old-style'));
            } else {
                var width = me.$el.width();
                var height = me.$el.height();
                var left = Math.max(0, (($(window).width() - me.$el.outerWidth()) / 2));
                var top = Math.max(0, ($(document).scrollTop() + ($(window).height() - me.$el.outerHeight()) / 2));
                me.$el.css({
                    left: left,
                    top: top,
                    width: width,
                    height: height
                });
            }
            var res = me._getMaxZIndex();
            me.$el.css('z-index', res['z-index'] + 1);
            me._onPanelClick();

            me.$el.addClass('panel-unpin');
            $('body').append(me.$el);

            var panelWidth = me._getAvailableWidth(me.$el.width());
            var panelHeight = me._getAvailableHeight(me.$el.height());
            me.$el.css({
                position: 'absolute',
                width: panelWidth,
                height: panelHeight
            });
            //we give .panel-body to width and height in order .panel-body to start scroling
            var bHeight = me._calculateBodyHeight(panelHeight);
            var bWidth = me._calculateBodyWidth(panelWidth);
            me.$body.css({
                width: bWidth,
                height: bHeight
            });

            if (me.$options.draggable) {
                me.enableDrag();
            }
            if (me.$options.resize !== 'none') {
                me.enableResize();
            }
            return me;
        },

        /**
         * Toggles (pin or unpin) the panel
         *
         * @returns {LobiPanel}
         */
        togglePin: function () {
            var me = this;
            if (this.isPinned()) {
                this.unpin();
            } else {
                this.pin();
            }
            return me;
        },

        /**
         * Checks if panel is minimized or not. It does not matter if panel is pinned or not
         *
         * @returns {Boolean}
         */
        isMinimized: function () {
            var me = this;
            return me.$el.hasClass('panel-minimized') || me.$el.hasClass('panel-collapsed');
        },

        /**
         * Minimize the panel. If panel is pinned it is minimized on its place
         * if panel is unpinned it is minimized at the bottom of the page
         *
         * @returns {LobiPanel}
         */
        minimize: function () {
            var me = this;
            me._triggerEvent("beforeMinimize");
            if (me.isMinimized()) {
                return me;
            }
            if (me.isPinned()) {
                me.$body.slideUp();
                me.$el.find('.panel-footer').slideUp();
                me.$el.addClass('panel-collapsed');
                me._saveState('collapsed');
                me._changeClassOfControl(me.$heading.find('[data-func="minimize"]'));
            } else {
                me.disableTooltips();
                //get footer where we need to put panel
                var footer = me._getFooterForMinimizedPanels();
                //find other panels which are already inside footer
                var children = footer.find('>*');
                var left, top;
                //get top coordinate of footer
                top = footer.offset().top;
                //if there are no other panels inside footer, this panel will be first
                //and its left coordinate will be footer's left coordinate
                if (children.length === 0) {
                    left = footer.offset().left;
                } else {
                    //if there exist panels inside footer, then this panel's left
                    //coordinate will be last panel's (in footer) right coordinate
                    var ch = $(children[children.length - 1]);
                    left = ch.offset().left + ch.width();
                }
                //if panel was not expanded and it was jus unpin we need to save
                //panel's style
                if (!me.$el.hasClass('panel-expanded')) {
                    me.$el.attr('old-style', me.$el.attr('style'));
                }
                me.$el.animate({
                    left: left,
                    top: top,
                    width: 200,
                    height: footer.height()
                }, 100, function () {
                    //if panel was expanded on full screen before we minimize it
                    //after minimization we remove 'panel-expanded' class and we change icon
                    if (me.$el.hasClass('panel-expanded')) {
                        me.$el.removeClass('panel-expanded');
                        me.$el.find('.panel-heading [data-func=expand] .' + LobiPanel.PRIVATE_OPTIONS.iconClass)
                            .removeClass(me.$options.expand.icon2)
                            .addClass(me.$options.expand.icon)
                        ;
                    }
                    //we add 'panel-minimized' class
                    me.$el.addClass('panel-minimized');
                    me.$el.removeAttr('style');
                    me.disableDrag();
                    me.disableResize();
                    me._expandOnHeaderClick();
                    //animation was made and panel is positioned in place we it must be
                    //so we append panel into footer
                    footer.append(me.$el);
                    $('body').addClass('lobipanel-minimized');
                    var maxWidth = 'calc(100% - ' + me.$heading.find('.dropdown-menu li>a:visible').length * me.$heading.find('.dropdown-menu li>a:visible').first().outerWidth() + "px)";
                    me.$heading.find('.panel-title').css('max-width', maxWidth);
                    me._saveState('minimized');
                    me._triggerEvent("onMinimize");
                });
            }
            return me;
        },

        /**
         * Maximize the panel. This method works for minimized panel.
         * If panel is pinned it's maximized on its place.
         * If panel is unpinned it's maximized on position from which it was minimized
         *
         * @returns {LobiPanel}
         */
        maximize: function () {
            var me = this;
            me._triggerEvent("beforeMaximize");
            if (!me.isMinimized()) {
                return me;
            }
            if (me.isPinned()) {
                me.$body.slideDown();
                me.$el.find('.panel-footer').slideDown();
                me.$el.removeClass('panel-collapsed');
                me._saveState('pinned');
                me._changeClassOfControl(me.$heading.find('[data-func="minimize"]'));
            } else {
                me.enableTooltips();
                //we get css style which was saved before minimization
                var css = me.$el.attr('old-style').getCss();
                //we give panel these css properties, coz animation work
                me.$el.css({
                    position: css.position || 'fixed',
                    'z-index': css['z-index'],
                    left: me.$el.offset().left,
                    top: me.$el.offset().top,
                    width: me.$el.width(),
                    height: me.$el.height()
                });
                //we append panel into body
                $('body').append(me.$el);
                //It is not possible to make animations to these propeties and we remove it
                delete css['position'];
                delete css['z-index'];
//            css['position'] = 'absolute';
                //and we animate panel to its saved style
                me.$el.animate(css, 100, function () {
                    //we remove position property from style, before 'panel-unpin'
                    //class has it to absolute
                    me.$el.css('position', '');
                    me.$el.removeClass('panel-minimized');
                    //as panel is already in its place we remove 'old-style' property
                    me.$el.removeAttr('old-style');
                    if (me.$options.draggable) {
                        me.enableDrag();
                    }
                    me.enableResize();
                    me._removeExpandOnHeaderClick();
                    //If there are no other elements inside footer, remove it also
                    var footer = me._getFooterForMinimizedPanels();
                    if (footer.children().length === 0) {
                        footer.remove();
                    }
                    $('body').removeClass('lobipanel-minimized')
                        .addClass('lobipanel-minimized');
                    var maxWidth = 'calc(100% - ' + me.$heading.find('.dropdown-menu li').length * me.$heading.find('.dropdown-menu li').first().outerWidth() + "px)";
                    me.$heading.find('.panel-title').css('max-width', maxWidth);
                    me._updateUnpinnedState();
                    me._triggerEvent("onMaximize");
                });
            }
            return me;
        },

        /**
         * Toggles (minimize or maximize) the panel state.
         *
         * @returns {LobiPanel}
         */
        toggleMinimize: function () {
            var me = this;
            if (me.isMinimized()) {
                me.maximize();
            } else {
                me.minimize();
            }
            return me;
        },

        /**
         * Checks if panel is on full screen
         *
         * @returns {Boolean}
         */
        isOnFullScreen: function () {
            var me = this;
            return me.$el.hasClass('panel-expanded');
        },

        /**
         * Expands the panel to full screen size
         *
         * @returns {LobiPanel}
         */
        toFullScreen: function () {
            var me = this;
            me._triggerEvent("beforeFullScreen");
            if (me.$el.hasClass("panel-collapsed")) {
                return me;
            }
            me._changeClassOfControl(me.$heading.find('[data-func="expand"]'));
            me.$el.css('position', 'fixed');
            var res = me._getMaxZIndex();
            //if panel is pinned or minimized, its position is not absolute and
            //animation will not work correctly so we change its position and
            //other css properties and we append panel into body
            if (me.isPinned() || me.isMinimized()) {
                me.enableTooltips();
                me.$el.css({
                    "z-index": res["z-index"] + 1,
                    left: me.$el.offset().left,
                    top: me.$el.offset().top - $(window).scrollTop(),
                    width: me.$el.width(),
                    height: me.$el.height()
                });
                $('body').append(me.$el);
                //If we are expanding panel to full screen from footer and in footer there are no more elements
                //remove footer also
                var footer = me._getFooterForMinimizedPanels();
                if (footer.children().length === 0) {
                    footer.remove();
                }
            } else {
                me.$body.css({
                    width: '',
                    height: ''
                });
                me._setBodyHeight();
            }
            //if panel is not minimized we save its style property, because when
            //toSmallSize() method is called panel needs to have style, it had before calling method
            // toFullScreen()
            if (!me.isMinimized()) {
                me.$el.attr('old-style', me.$el.attr('style'));
                me.disableResize();
            } else {
                me.$el.removeClass('panel-minimized');
                me._removeExpandOnHeaderClick();
            }
            //get toolbar
            var toolbar = $('.' + LobiPanel.PRIVATE_OPTIONS.toolbarClass);
            var toolbarHeight = toolbar.outerHeight() || 0;
            me.$el.animate({
                width: $(window).width(),
                height: $(window).height() - toolbarHeight,
                left: 0,
                top: 0
            }, me.$options.expandAnimation, function () {
                me.$el.css({
                    width: '',
                    height: '',
                    right: 0,
                    bottom: toolbarHeight
                });
                me.$el.addClass('panel-expanded');
                $('body').css('overflow', 'hidden');
                me.$body.css({
                    width: me._calculateBodyWidth(me.$el.width()),
                    height: me._calculateBodyHeight(me.$el.height())
                });
                me.disableDrag();
                if (me.isPinned()) {
                    me._disableSorting();
                }
                me._saveState('fullscreen');
                me._triggerEvent("onFullScreen");
            });
            return me;
        },

        /**
         * Collapse the panel to small size
         *
         * @returns {LobiPanel}
         */
        toSmallSize: function () {
            var me = this;
            me._triggerEvent("beforeSmallSize");
            me._changeClassOfControl(me.$heading.find('[data-func="expand"]'));
            var css = me.$el.attr('old-style').getCss();
            //we get css properties from old-style (saved before expanding)
            //and we animate panel to this css properties
            me.$el.animate({
                position: 'absolute',
                left: css.left,
                top: css.top,
                width: css.width,
                height: css.height,
                right: css.right,
                bottom: css.bottom
            }, me.$options.collapseAnimation, function () {
                //we remove old-style as we do not need it
                me.$el.removeAttr('old-style');
                //if panel is pinned we also remove its style attribute and we
                //append panel in its parent element
                if (!me.$el.hasClass('panel-unpin')) {
                    me.$el.removeAttr('style');
                    me._insertInParent();
                    me._enableSorting();
                } else {
                    if (me.$options.draggable) {
                        me.enableDrag();
                    }
                    me.enableResize();
                }
                me.$el.removeClass('panel-expanded');
                $('body').css('overflow', 'auto');
                var bWidth = '';
                var bHeight = '';
                if (!me.isPinned()) {
                    bWidth = me._calculateBodyWidth(me.getWidth());
                    bHeight = me._calculateBodyHeight(me.getHeight());
                } else if (me.$options.bodyHeight !== 'auto') {
                    bHeight = me.$options.bodyHeight;
                }
                if (me.$options.bodyHeight !== 'auto'){
                    me._saveState('pinnned');
                } else {
                    me._updateUnpinnedState();
                }
                me.$body.css({
                    width: bWidth,
                    height: bHeight
                });
                me._triggerEvent("onSmallSize");
            });
            return me;
        },

        /**
         * Toggles (changes to full screen size or to small size) the panel size
         *
         * @returns {LobiPanel}
         */
        toggleSize: function () {
            var me = this;
            if (me.isOnFullScreen()) {
                me.toSmallSize();
            } else {
                me.toFullScreen();
            }
            return me;
        },

        /**
         * Closes the panel. Removes it from document
         *
         * @param {number} animationDuration
         * @returns {LobiPanel}
         */
        close: function (animationDuration) {
            var me = this,
                animationDuration = animationDuration  === undefined ? 100 : animationDuration;
            me._triggerEvent('beforeClose');
            me.$el.hide(animationDuration, function () {
                if (me.isOnFullScreen()) {
                    $('body').css('overflow', 'auto');
                }
                me._triggerEvent('onClose');
                me.$el.remove();
                var footer = me._getFooterForMinimizedPanels();
                if (footer.children().length === 0) {
                    footer.remove();
                }
            });
            return me;
        },

        /**
         * Moves unpinned panel to given position.
         * This method will do nothing if panel is pinned
         *
         * @param {number} left
         * @param {number} top
         * @param {number} animationDuration
         * @returns {LobiPanel}
         */
        setPosition: function (left, top, animationDuration) {
            var me = this,
                animationDuration = animationDuration  === undefined ? 100 : animationDuration;

            //this method works only if panel is not pinned
            if (me.isPinned()) {
                return me;
            }
            me.$el.animate({
                'left': left,
                'top': top
            }, animationDuration);
            return me;
        },

        /**
         * Set the width of the panel
         *
         * @param {number} w
         * @param {number} animationDuration
         * @returns {LobiPanel}
         */
        setWidth: function (w, animationDuration) {
            var me = this,
                animationDuration = animationDuration  === undefined ? 100 : animationDuration;
            if (me.isPinned()) {
                return me;
            }
            var bWidth = me._calculateBodyWidth(w);
            me.$el.animate({
                width: w
            }, animationDuration);
            me.$body.animate({
                width: bWidth
            }, animationDuration);
            return me;
        },

        /**
         * Set the height of the panel
         *
         * @param {number} h
         * @param {number} animationDuration
         * @returns {LobiPanel}
         */
        setHeight: function (h, animationDuration) {
            var me = this,
                animationDuration = animationDuration  === undefined ? 100 : animationDuration;
            if (me.isPinned()) {
                return me;
            }
            var bHeight = me._calculateBodyHeight(h);
            me.$el.animate({
                height: h
            }, animationDuration);
            me.$body.animate({
                height: bHeight
            }, animationDuration);
            return me;
        },

        /**
         * Set size (width and height) of the panel
         *
         * @param {number} w
         * @param {number} h
         * @param {number} animationDuration
         * @returns {LobiPanel}
         */
        setSize: function (w, h, animationDuration) {
            var me = this,
                animationDuration = animationDuration  === undefined ? 100 : animationDuration;
            if (me.isPinned()) {
                return me;
            }
            var bHeight = me._calculateBodyHeight(h);
            var bWidth = me._calculateBodyWidth(w);
            me.$el.animate({
                height: h,
                width: w
            }, animationDuration);
            me.$body.animate({
                height: bHeight,
                width: bWidth
            }, animationDuration);
            return me;
        },

        /**
         * Get the position of the panel.
         * Returns object where x is left coordinate and y is top coordinate
         *
         * @returns {Object}
         */
        getPosition: function () {
            var me = this;
            var offset = me.$el.offset();
            return {
                x: offset.left,
                y: offset.top
            };
        },

        /**
         * Get width of the panel
         *
         * @returns {number}
         */
        getWidth: function () {
            var me = this;
            return me.$el.width();
        },

        /**
         * Get height of the panel
         *
         * @returns {number}
         */
        getHeight: function () {
            var me = this;
            return me.$el.height();
        },

        /**
         * If panel is overlapped by another panel this panel will be shown on front
         * (this panel will overlap other panels)
         *
         * @returns {LobiPanel}
         */
        bringToFront: function () {
            var me = this;
            me._triggerEvent("beforeToFront");
            var res = me._getMaxZIndex();
            if (res['id'] === me.$el.data('inner-id')) {
                return me;
            }
            me.$el.css('z-index', res['z-index'] + 1);
            me._triggerEvent("onToFront");
            return me;
        },

        /**
         * Enable dragging of panel
         *
         * @returns {LobiPanel}
         */
        enableDrag: function () {
            var me = this;
            me.$el.draggable({
                handle: '.panel-heading',
                containment: me.$options.constrain,
                start: function () {
                    me.$el.css('position', 'absolute');
                },
                stop: function () {
                    me.$el.css('position', '');
                    me._updateUnpinnedState();
                }
            });
            return me;
        },

        /**
         * Disable dragging of the panel
         *
         * @returns {LobiPanel}
         */
        disableDrag: function () {
            var me = this;
            if (me.$el.hasClass('ui-draggable')) {
                me.$el.draggable("destroy");
            }
            return me;
        },

        /**
         * Enable resize of the panel
         *
         * @returns {LobiPanel}
         */
        enableResize: function () {
            var me = this;
            var handles = false;
            if (me.$options.resize === 'vertical') {
                handles = 'n, s';
            } else if (me.$options.resize === 'horizontal') {
                handles = 'e, w';
            } else if (me.$options.resize === 'both') {
                handles = 'all';
            }
            if (!handles) {
                return me;
            }
            me.$el.resizable({
                minWidth: me.$options.minWidth,
                maxWidth: me.$options.maxWidth,
                minHeight: me.$options.minHeight,
                maxHeight: me.$options.maxHeight,
                handles: handles,
                start: function () {
                    me.$el.disableSelection();
                    me._triggerEvent('resizeStart');
                },
                stop: function () {
                    me.$el.enableSelection();
                    me._triggerEvent('resizeStop');
                },
                resize: function () {
                    var bHeight = me._calculateBodyHeight(me.$el.height());
                    var bWidth = me._calculateBodyWidth(me.$el.width());
                    me.$body.css({
                        width: bWidth,
                        height: bHeight
                    });
                    me._updateUnpinnedState();
                    me._triggerEvent("onResize");
                }
            });
            return me;
        },

        /**
         * Disable resize of the panel
         *
         * @returns {LobiPanel}
         */
        disableResize: function () {
            var me = this;
            if (me.$el.hasClass('ui-resizable')) {
                me.$el.resizable("destroy");
            }
            return me;
        },

        /**
         * Start spinner of the panel loading
         *
         * @returns {LobiPanel}
         */
        startLoading: function () {
            var me = this;
            var spinner = me._generateWindow8Spinner();
            me.$el.append(spinner);
            var sp = spinner.find('.spinner');
            sp.css('margin-top', 50);
            return me;
        },

        /**
         * Stop spinner of the panel loading
         *
         * @returns {LobiPanel}
         */
        stopLoading: function () {
            var me = this;
            me.$el.find('.spinner-wrapper').remove();
            return me;
        },

        /**
         * Set url. This url will be used to load data when Reload button is clicked
         * or user calls .load() method without url parameter
         *
         * @param {string} url
         * @returns {LobiPanel}
         */
        setLoadUrl: function (url) {
            var me = this;
            me.$options.loadUrl = url;
            return me;
        },

        /**
         * Load data into .panel-body.
         * params object is in format
         * {
         *      url: '', //Optional: load url
         *      data: 'PlainObject or String', //Optional: A plain object or string of parameters which is sent to the server with the request.
         *      callback: 'function' //Optional: callback function which is called when load is finished
         * }
         *
         * @param {Object} params
         * @returns {LobiPanel}
         */
        load: function (params) {
            var me = this;
            params = params || {};
            if (typeof params === 'string') {
                params = {url: params};
            }
            var url = params.url || me.$options.loadUrl,
                data = params.data || {},
                callback = params.callback || null;

            if (!url) {
                return me;
            }
            me._triggerEvent("beforeLoad");
            me.startLoading();
            me.$body.load(url, data, function (result, status, xhr) {
                if (callback && typeof callback === 'function') {
                    me.callback(result, status, xhr);
                }
                me.stopLoading();
                me._triggerEvent("loaded", result, status, xhr);
            });
            return me;
        },

        /**
         * Destroy the LobiPanel instance
         *
         * @returns {jQuery}
         */
        destroy: function () {
            var me = this;
            me.disableDrag();
            me.disableResize();
            me.$options.sortable = false;
            me._enableSorting();
            me._removeInnerIdFromParent(me.innerId);
            me.$el.removeClass('lobipanel')
                .removeAttr('data-inner-id')
                .removeAttr('data-index')
                .removeData('lobiPanel');
            me.$heading.find('.dropdown').remove();
            return me.$el;
        },

        /**
         * Creates input field to edit panel title
         *
         * @returns {LobiPanel}
         */
        startTitleEditing: function () {
            var me = this;
            var title = me.$heading.find('.panel-title').text().trim();
            var input = $('<input value="' + title + '"/>');
            input.on('keydown', function (ev) {
                if (ev.which === 13) {
                    me.finishTitleEditing();
                } else if (ev.which === 27) {
                    me.cancelTitleEditing();
                }
            });
            me.$heading.find('.panel-title')
                .data('old-title', title)
                .html("").append(input);
            input[0].focus();
            input[0].select();
            me._changeClassOfControl(me.$heading.find('[data-func="editTitle"]'));
            return me;
        },

        /**
         * Check if panel title is being edited (if it is in edit process)
         *
         * @returns {Boolean}
         */
        isTitleEditing: function () {
            var me = this;
            return me.$heading.find('.panel-title input').length > 0;
        },

        /**
         * Cancel the panel new title and return to previous title when it is changed but not saved
         *
         * @returns {LobiPanel}
         */
        cancelTitleEditing: function () {
            var me = this;
            var title = me.$heading.find('.panel-title');
            title.html(title.data('old-title'))
                .find('input').remove();
            me._changeClassOfControl(me.$heading.find('[data-func="editTitle"]'));
            return me;
        },

        /**
         * Finish the panel title editing process and save new title
         *
         * @returns {LobiPanel}
         */
        finishTitleEditing: function () {
            var me = this,
                input = me.$heading.find('input');
            if (me._triggerEvent('beforeTitleChange', input.val()) === false){
                return me;
            }
            me.$heading.find('.panel-title').html(input.val());
            input.remove();
            me._changeClassOfControl(me.$heading.find('[data-func="editTitle"]'));
            me._triggerEvent('onTitleChange', input.val());
            return me;
        },

        /**
         * Enable tooltips on panel controls
         *
         * @returns {LobiPanel}
         */
        enableTooltips: function () {
            var me = this;
            if ($(window).width() < 768) {
                return me;
            }
            var controls = me.$heading.find('.dropdown-menu>li>a');
            controls.each(function (index, el) {
                var $el = $(el);
                $el.attr('data-toggle', 'tooltip')
                    .attr('data-title', $el.data('tooltip'))
                    .attr('data-placement', 'bottom')
                ;
            });
            controls.each(function (ind, el) {
                $(el).tooltip({
                    container: 'body',
                    template: '<div class="tooltip lobipanel-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                });
            });
            return me;
        },

        /**
         * Disable tooltips on panel controls
         *
         * @returns {LobiPanel}
         */
        disableTooltips: function () {
            var me = this;
            var $links = me.$heading.find('.dropdown-menu>li>a');
            $links.each(function(ind, el){
                var bsTooltip = $(el).data('bs.tooltip');
                if (bsTooltip){
                    $(el).tooltip('destroy');
                }
            });
            // me.$heading.find('.dropdown-menu>li>a').tooltip('destroy');
            return me;
        },

        _generateControls: function () {
            var me = this;
            var dropdown = me._generateDropdown();
            var menu = dropdown.find('.dropdown-menu');
            if (me.$options.editTitle !== false) {
                menu.append(me._generateEditTitle());
            }
            if (me.$options.unpin !== false) {
                menu.append(me._generateUnpin());
            }
            if (me.$options.reload !== false) {
                menu.append(me._generateReload());
            }
            if (me.$options.minimize !== false) {
                menu.append(me._generateMinimize());
            }
            if (me.$options.expand !== false) {
                menu.append(me._generateExpand());
            }
            if (me.$options.close !== false) {
                menu.append(me._generateClose());
            }
            menu.find('>li>a').on('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
            });
            return dropdown;
        },
        _generateDropdown: function () {
            var me = this;
            return $('<div class="dropdown"></div>')
                .append('<ul class="dropdown-menu dropdown-menu-right"></ul>')
                .append('<div class="dropdown-toggle" data-toggle="dropdown"><span class="' + LobiPanel.PRIVATE_OPTIONS.iconClass + ' ' + me.$options.toggleIcon + '"></div>');
        },
        _generateEditTitle: function () {
            var me = this;
            var options = me.$options.editTitle;
            var control = $('<a data-func="editTitle"></a>');
            control.append('<i class="' + LobiPanel.PRIVATE_OPTIONS.iconClass + ' ' + options.icon + '"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">' + options.tooltip + '</span>');
                control.attr('data-tooltip', options.tooltip);
            }

            me._attachEditTitleClickListener(control);
            return $('<li></li>').append(control);
        },
        _attachEditTitleClickListener: function (control) {
            var me = this;
            control.on('mousedown', function (ev) {
                ev.stopPropagation();
            });
            control.on('click', function (ev) {
                ev.stopPropagation();
                me.hideTooltip(control);
                if (me.isTitleEditing()) {
                    me.finishTitleEditing();
                } else {
                    me.startTitleEditing();
                }
            });
        },

        hideTooltip: function($el){
            var bsTooltip = $el.data('bs.tooltip');

            if (bsTooltip){
                $el.tooltip('hide');
            }
            return this;
        },
        _generateUnpin: function () {
            var me = this;
            var options = me.$options.unpin;
            var control = $('<a data-func="unpin"></a>');
            control.append('<i class="' + LobiPanel.PRIVATE_OPTIONS.iconClass + ' ' + options.icon + '"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">' + options.tooltip + '</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            me._attachUnpinClickListener(control);
            return $('<li></li>').append(control);
        },
        _attachUnpinClickListener: function (control) {
            var me = this;
            //hide the tooltip
            control.on('mousedown', function (ev) {
                ev.stopPropagation();
            });
            control.on('click', function () {
                me.hideTooltip(control);
                me.doTogglePin();
            });
        },
        _generateReload: function () {
            var me = this;
            var options = me.$options.reload;
            var control = $('<a data-func="reload"></a>');
            control.append('<i class="' + LobiPanel.PRIVATE_OPTIONS.iconClass + ' ' + options.icon + '"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">' + options.tooltip + '</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            me._attachReloadClickListener(control);
            return $('<li></li>').append(control);
        },
        _attachReloadClickListener: function (control) {
            var me = this;
            control.on('mousedown', function (ev) {
                ev.stopPropagation();
            });
            control.on('click', function () {
                me.hideTooltip(control);
                me.load();
            });
        },
        _generateMinimize: function () {
            var me = this;
            var options = me.$options.minimize;
            var control = $('<a data-func="minimize"></a>');
            control.append('<i class="' + LobiPanel.PRIVATE_OPTIONS.iconClass + ' ' + options.icon + '"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">' + options.tooltip + '</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            me._attachMinimizeClickListener(control);
            return $('<li></li>').append(control);
        },
        _attachMinimizeClickListener: function (control) {
            var me = this;
            control.on('mousedown', function (ev) {
                ev.stopPropagation();
            });
            control.on('click', function (ev) {
                ev.stopPropagation();
                me.hideTooltip(control);
                me.toggleMinimize();
            });
        },
        _generateExpand: function () {
            var me = this;
            var options = me.$options.expand;
            var control = $('<a data-func="expand"></a>');
            control.append('<i class="' + LobiPanel.PRIVATE_OPTIONS.iconClass + ' ' + options.icon + '"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">' + options.tooltip + '</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            me._attachExpandClickListener(control);
            return $('<li></li>').append(control);
        },
        _attachExpandClickListener: function (control) {
            var me = this;
            control.on('mousedown', function (ev) {
                ev.stopPropagation();
            });
            control.on('click', function (ev) {
                ev.stopPropagation();
                me.hideTooltip(control);
                me.toggleSize();
            });
        },
        _generateClose: function () {
            var me = this;
            var options = me.$options.close;
            var control = $('<a data-func="close"></a>');
            control.append('<i class="' + LobiPanel.PRIVATE_OPTIONS.iconClass + ' ' + options.icon + '"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">' + options.tooltip + '</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            me._attachCloseClickListener(control);
            return $('<li></li>').append(control);
        },
        _attachCloseClickListener: function (control) {
            var me = this;
            control.on('mousedown', function (ev) {
                ev.stopPropagation();
            });
            control.on('click', function (ev) {
                ev.stopPropagation();
                me.hideTooltip(control);
                me.close();
            });
        },
        _getMaxZIndex: function () {
            var me = this;
            var panels = $('.lobipanel.panel-unpin:not(.panel-minimized.panel-expanded)'),
                style,
                max,
                cur;
            if (panels.length === 0) {
                return {
                    "id": "",
                    "z-index": LobiPanel.PRIVATE_OPTIONS.initialZIndex
                };
            }
            style = $(panels[0]).attr('style');
            var id = $(panels[0]).data('inner-id');
            if (!style) {
                max = LobiPanel.PRIVATE_OPTIONS.initialZIndex;
            } else {
                max = style.getCss()['z-index'];
            }
            for (var i = 1; i < panels.length; i++) {
                style = $(panels[i]).attr('style');
                if (!style) {
                    cur = 0;
                } else {
                    cur = style.getCss()['z-index'];
                }
                if (cur > max) {
                    id = $(panels[i]).data('inner-id');
                    max = cur;
                }
            }
            return {
                "id": id,
                "z-index": parseInt(max, 10)
            };
        },
        _onPanelClick: function () {
            var me = this;
            me.$el.on('mousedown.lobiPanel', function () {
                if (me.isPinned() ||
                    me.isMinimized() ||
                    me.isOnFullScreen()) {
                    return false;
                }
                me.bringToFront();
            });
        },
        _offPanelClick: function () {
            var me = this;
            me.$el.off('mousedown.lobiPanel');
        },
        _changeClassOfControl: function (el) {
            var me = this;
            el = $(el);
            var opts = me.$options[el.attr('data-func')];
            if (!opts.icon) {
                return;
            }
            el.find('.' + LobiPanel.PRIVATE_OPTIONS.iconClass).toggleClass(opts.icon).toggleClass(opts.icon2);
        },
        _getFooterForMinimizedPanels: function () {
            var me = this;
            //we grab footer where minimized panels should go
            var minimizedCtr = $('.' + LobiPanel.PRIVATE_OPTIONS.toolbarClass);
            //if panel does not exist we create it and append to body
            if (minimizedCtr.length === 0) {
                minimizedCtr = $('<div class="' + LobiPanel.PRIVATE_OPTIONS.toolbarClass + '"></div>');
                $('body').append(minimizedCtr);
            }
            return minimizedCtr;
        },
        _expandOnHeaderClick: function () {
            var me = this;
            me.$heading.on('click.lobiPanel', function () {
                me.maximize();
                me.bringToFront();
            });
        },
        _removeExpandOnHeaderClick: function () {
            var me = this;
            me.$heading.off('click.lobiPanel');
        },
        _getAvailableWidth: function (calcWidth) {
            var me = this;
            if (me.$options.maxWidth) {
                calcWidth = Math.min(calcWidth, me.$options.maxWidth);
            }
            if (me.$options.minWidth) {
                calcWidth = Math.max(calcWidth, me.$options.minWidth);
            }
            return calcWidth;
        },
        _getAvailableHeight: function (calcHeight) {
            var me = this;
            if (me.$options.maxHeight) {
                calcHeight = Math.min(calcHeight, me.$options.maxHeight);
            }
            if (me.$options.minHeight) {
                calcHeight = Math.max(calcHeight, me.$options.minHeight);
            }
            return calcHeight;
        },
        _calculateBodyHeight: function (h) {
            var me = this;
            return h - me.$heading.outerHeight() - me.$el.find('.panel-footer').outerHeight();
        },
        _calculateBodyWidth: function (w) {
            var me = this;
            return w - 2;
        },
        _appendInnerIdToParent: function (parent, innerId) {
            var me = this;
            //If this is first lobipanel element of its parent
            if (parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr) === undefined) {
                parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr, innerId);
            }
            //This means that parent already has LobiPanel instance
            else {
                //if parent already has panel innerId than we do nothing
                if (parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr).indexOf(innerId) > -1) {
                    return;
                }
                var innerIds = parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr);
                parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr, innerIds + " " + innerId);
            }
            me.$el.attr('data-index', me.$el.index());
        },
        _insertInParent: function () {
            var me = this;
            //find its parent element
            var parent = $('[' + LobiPanel.PRIVATE_OPTIONS.parentAttr + '~=' + me.innerId + ']');
            me.$el.insertAt(me.$el.attr('data-index'), parent);
        },
        _generateWindow8Spinner: function () {
            var me = this;
            var template = ['<div class="spinner spinner-windows8">',
                '<div class="wBall">',
                '<div class="wInnerBall">',
                '</div>',
                '</div>',
                '<div class="wBall">',
                '<div class="wInnerBall">',
                '</div>',
                '</div>',
                '<div class="wBall">',
                '<div class="wInnerBall">',
                '</div>',
                '</div>',
                '<div class="wBall">',
                '<div class="wInnerBall">',
                '</div>',
                '</div>',
                '<div class="wBall">',
                '<div class="wInnerBall">',
                '</div>',
                '</div>',
                '</div>'].join("");
            return $('<div class="spinner-wrapper">' + template + '</div>');
        },
        _enableSorting: function () {
            var me = this;
            var parent = me.$el.parent();
            if (parent.hasClass('ui-sortable')) {
                parent.sortable("destroy");
            }
            if (me.$options.sortable) {
                me.$el.addClass('lobipanel-sortable');
                parent.addClass('lobipanel-parent-sortable');
            } else {
                me.$el.removeClass('lobipanel-sortable');
            }
            parent.sortable({
                connectWith: '.lobipanel-parent-sortable',
                items: '.lobipanel-sortable',
                handle: '.panel-heading',
                cursor: 'move',
                placeholder: 'lobipanel-placeholder',
                forcePlaceholderSize: true,
                opacity: 0.7,
                revert: 300,
                update: function (event, ui) {
                    var innerId = ui.item.data('inner-id');
                    me._removeInnerIdFromParent(innerId);
                    me._appendInnerIdToParent(ui.item.parent(), innerId);
                    me._updateDataIndices(ui.item);
                    me._triggerEvent('dragged');
                }
            });
        },
        _disableSorting: function () {
            var me = this;
            var parent = me.$el.parent();
            if (parent.hasClass('ui-sortable')) {
                parent.sortable("destroy");
            }
        },
        _updateDataIndices: function (panel) {
            var me = this;
            var items = panel.parent().children();
            items.each(function (index, el) {
                $(el).attr('data-index', index);
                var lobiPanel = $(el).data('lobiPanel');
                if (lobiPanel && lobiPanel.$options.stateful && !lobiPanel.hasRandomId){
                    lobiPanel._saveState('pinned', {index: index});
                }
            });
            // me._saveState('pinned', {index: panel.index()})
            console.log("Save indices in localstorage");

        },
        _removeInnerIdFromParent: function (innerId) {
            var me = this;
            var parent = $('[' + LobiPanel.PRIVATE_OPTIONS.parentAttr + '~=' + innerId + ']');
            var innerIds = parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr).replace(innerId, '').trim().replace(/\s{2,}/g, ' ');
            parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr, innerIds);
        },
        _onToggleIconsBtnClick: function () {
            var me = this;
            me.$heading.find('.toggle-controls').on('click.lobiPanel', function () {
                me.$el.toggleClass("controls-expanded");
            });
        },
        _adjustForScreenSize: function () {
            var me = this;
            me.disableTooltips();
            if ($(window).width() > 768 && me.$options.tooltips) {
                me.enableTooltips();
            }
            if (me.isOnFullScreen()) {
                me.$body.css({
                    width: me._calculateBodyWidth(me.$el.width()),
                    height: me._calculateBodyHeight(me.$el.height())
                });
            }
        },
        _enableResponsiveness: function () {
            var me = this;
            me._adjustForScreenSize();
            $(window).on('resize.lobiPanel', function () {
                me._adjustForScreenSize();
            });
        },
        _setBodyHeight: function () {
            var me = this;
            if (me.$options.bodyHeight !== 'auto') {
                me.$body.css({
                    'height': me.$options.bodyHeight,
                    overflow: 'auto'
                });
            }
        },
        _getOptionsFromAttributes: function () {
            var me = this;
            var $el = me.$el;
            var options = {};
            for (var key in $.fn.lobiPanel.DEFAULTS) {
                var k = key.toDash();
                var val = $el.data(k);
                if (val !== undefined) {
                    if (typeof $.fn.lobiPanel.DEFAULTS[key] !== 'object') {
                        options[key] = val;
                    } else {
                        options[key] = eval('(' + val + ')');
                    }
                }
            }
            return options;
        },
        _saveState: function (state, params) {
            var me = this;
            console.log("Save state ", state, params);
            if (!me.hasRandomId && me.$options.stateful) {
                me.storage.state = state;
                if (params) {
                    me.storage.stateParams = params;
                }
                me._saveLocalStorage(me.storage);
            }
        },
        _saveLocalStorage: function (storage) {
            var me = this;
            localStorage.setItem(STORAGE_PREFIX + me.innerId, JSON.stringify(storage));
        },
        _applyState: function (state, params) {
            var me = this;
            switch (state) {
                case 'pinned':
                    if (params && params.index !== null && params.index !== undefined) {
                        me._applyIndex(params.index);
                    }
                    break;
                case 'unpinned':
                    me.unpin();
                    me.setPosition(params.left, params.top, 0);
                    me.setSize(params.width, params.height, 0);
                    break;
                case 'minimized':
                    me.unpin();
                    me.minimize();
                    break;
                case 'collapsed':
                    me.minimize();
                    break;
                case 'fullscreen':
                    me.toFullScreen();
                    break;
                default:
                    break;
            }
        },
        _applyIndex: function (index) {
            var me = this;
            if (index !== null) {
                me.$el.insertAt(index, me.$el.parent());
            }
        },
        _triggerEvent: function (eventType) {
            var me = this;
            var args = Array.prototype.slice.call(arguments, 1);
            args.unshift(me);

            me.$el.trigger(eventType + '.lobiPanel', args);
            if (me.$options[eventType] && typeof me.$options[eventType] === 'function'){
                return me.$options[eventType].apply(me, args);
            }

            return true;
        },
        doPin: function(){
            var me = this;
            if (me._triggerEvent("beforePin") !== false){
                me.pin();
                me._saveState('pinned');
                me._triggerEvent("onPin");
            }
            return me;
        },
        doUnpin: function(){
            var me = this;
            if (me._triggerEvent('beforeUnpin') !== false){
                me.unpin();
                me._updateUnpinnedState();
                me._triggerEvent('onUnpin');
            }
            return me;
        },
        doTogglePin: function(){
            var me = this;
            if (this.isPinned()) {
                this.doUnpin();
            } else {
                this.doPin();
            }
            return me;
        },
        _updateUnpinnedState: function(){
            var me = this;
            me._saveState('unpinned', me.getAlignment());
        },
        getAlignment: function(){
            var me = this;
            return {
                top: me.$el.css('top'),
                left: me.$el.css('left'),
                width: me.$el.css('width'),
                height: me.$el.css('height')
            };
        }
    };

    $.fn.lobiPanel = function (option) {
        var args = arguments,
            ret = null;
        this.each(function () {

            var $this = $(this);
            var data = $this.data('lobiPanel');
            var options = typeof option === 'object' && option;

            if (!data) {
                $this.data('lobiPanel', (data = new LobiPanel($this, options)));
            }
            if (typeof option === 'string') {
                args = Array.prototype.slice.call(args, 1);
                ret = data[option].apply(data, args);
            }
        });
        return ret;
    };
    LobiPanel.PRIVATE_OPTIONS = {
        //We need to know what is the parent of the panel, that's why we add
        //this attribute to parent element and it contains space seperated inner-ids of all its child lobipanel
        parentAttr: 'data-lobipanel-child-inner-id',
        toolbarClass: 'lobipanel-minimized-toolbar', //This class is added to container which contains all minimized panels
        //First instance on lobiPanel will get this z-index css property.
        //Every next instance will get 1 + previous z-index
        initialZIndex: 10000,
        //This class is attached to every panel-control icon
        iconClass: 'panel-control-icon'
    };
    $.fn.lobiPanel.DEFAULTS = {
        //Makes <b>unpinned</b> panel draggable
        //Warning!!! This requires jquery ui draggable widget to be included
        draggable: true,
        //Makes <b>pinned</b> panels sortable
        //Warning!!! This requires jquery ui sortable widget to be included
        sortable: false,
        //jquery ui sortable plugin option.
        //To avoid any problems this option must be same for all panels which are direct children of their parent
        connectWith: '.ui-sortable',
        //This parameter accepts string ['both', 'vertical', 'horizontal', 'none']. none means disable resize
        resize: 'both',
        //Minimum width <b>unpin, resizable</b> panel can have.
        minWidth: 200,
        //Minimum height <b>unpin, resizable</b> panel can have.
        minHeight: 100,
        //Maximum width <b>unpin, resizable</b> panel can have.
        maxWidth: 1200,
        //Maximum height <b>unpin, resizable</b> panel can have.
        maxHeight: 700,
        //The url which will be used to load content. If not provided reload button will do nothing
        loadUrl: "",
        //If loadUrl is provided plugin will load content as soon as plugin is initialized
        autoload: true,
        bodyHeight: 'auto',
        //This will enable tooltips on panel controls
        tooltips: true,
        toggleIcon: 'glyphicon glyphicon-cog',
        expandAnimation: 100,
        collapseAnimation: 100,
        state: 'pinned', // Initial state of the panel. Available options: pinned, unpinned, collapsed, minimized, fullscreen
        initialIndex: null, // Initial index of the panel among its siblings
        stateful: false, // If you set this to true you must specify data-inner-id. Plugin will save (in localStorage) it's states such as
                         // pinned, unpinned, collapsed, minimized, fullscreen, position among it's siblings
                         // and apply them when you reload the browser
        constrain: 'document', // 'parent', 'document', 'window'
        unpin: {
            icon: 'glyphicon glyphicon-move', //You can user glyphicons if you do not want to use font-awesome
            tooltip: 'Unpin'               //tooltip text, If you want to disable tooltip, set it to false
        },
        reload: {
            icon: 'glyphicon glyphicon-refresh', //You can user glyphicons if you do not want to use font-awesome
            tooltip: 'Reload'           //tooltip text, If you want to disable tooltip, set it to false
        },
        minimize: {
            icon: 'glyphicon glyphicon-minus', //icon is shown when panel is not minimized
            icon2: 'glyphicon glyphicon-plus', //icon2 is shown when panel is minimized
            tooltip: 'Minimize'         //tooltip text, If you want to disable tooltip, set it to false
        },
        expand: {
            icon: 'glyphicon glyphicon-resize-full', //icon is shown when panel is not on full screen
            icon2: 'glyphicon glyphicon-resize-small', //icon2 is shown when pane is on full screen state
            tooltip: 'Fullscreen'       //tooltip text, If you want to disable tooltip, set it to false
        },
        close: {
            icon: 'glyphicon glyphicon-remove', //You can user glyphicons if you do not want to use font-awesome
            tooltip: 'Close'            //tooltip text, If you want to disable tooltip, set it to false
        },
        editTitle: {
            icon: 'glyphicon glyphicon-pencil',
            icon2: 'glyphicon glyphicon-floppy-disk',
            tooltip: 'Edit title'
        },




        // Events
        /**
         * @event beforeTitleChange
         * Fires before title change happens. Returning false will prevent title change from happening.
         * @param {LobiPanel} The <code>LobiPanel</code> instance
         */
        beforeTitleChange: null
    };

    $('.lobipanel').lobiPanel();
});

