/*
 * Author   : @arboshiki
 */
/**
 * Generates random string of n length. 
 * String contains only letters and numbers
 * 
 * @param {int} n
 * @returns {String}
 */
Math.randomString = function(n) {
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
String.prototype.getCss = function(){
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

/**
 *
 * @param {number} num1
 * @param {number} num2
 * @param {boolean} including
 * @returns {boolean}
 */
Number.prototype.isBetween = function(num1, num2, including){
    if ( ! including){
        if (this.valueOf() < num2 && this.valueOf() > num1) {
            return true;
        }
    }else{
        if (this.valueOf() <= num2 && this.valueOf() >= num1) {
            return true;
        }
    }
    return false;
};

/**
 * Inserts element at specific index in given elements children
 * 
 * @param {Integer} i
 * @param {String|jQuery instance} selector
 * @returns {undefined}
 */
$.fn.insertAt = function(i, selector) {
    var object = selector;
    if (typeof selector === 'string'){
        object = $(selector);
    }
    if(i == 0) {
        object.prepend(this);
        return this;
    }
    if (object.children() < i){
        i = object.children();
    }
    object.find(">*:nth-child(" + i + ")").after(this);
    return this;
};

$.fn.disableSelection = function() {
    return this
             .attr('unselectable', 'on')
             .css('user-select', 'none')
             .on('selectstart', false);
};

$.fn.enableSelection = function() {
    return this
             .removeAttr('unselectable')
             .css('user-select', 'initial')
             .off('selectstart');
};

$(function(){
    var LobiPanel = function($el, options) {
//------------------------------------------------------------------------------
//-----------------PRIVATE VARIABLES--------------------------------------------
//------------------------------------------------------------------------------
        var $heading, $body, innerId, me = this;
//------------------------------------------------------------------------------
//-----------------PRIVATE FUNCTIONS--------------------------------------------
//------------------------------------------------------------------------------
        var _processInput = function(options){
            if ( ! options) {
                options = {};
            }
            return $.extend({}, options, LobiPanel.DEFAULT_OPTIONS, options);
        };
        
        var _init = function(){
            if ( ! me.isPanelInit()) {
                me.$el.addClass('lobipanel')
                        .attr('data-inner-id', Math.randomString(10));

                $heading.append(_generateControls());
            } else {
                _initFromHTML();
            }
            innerId = me.$el.data('inner-id');
//------------------------------------------------------------------------------
            var parent = me.$el.parent();
            _appendInnerIdToParent(parent, innerId);
            _enableSorting();
            _adjustForScreenSize();
            _onToggleIconsBtnClick();
            _enableResponsiveness();
            me.$el.trigger("init.lobiPanel", me);
        };
        var _generateControls = function(){
            var dropdown = _generateDropdown();
            var menu = dropdown.find('.dropdown-menu');
            if (me.$options.editTitle !== false){
                menu.append(_generateEditTitle());
            }
            if (me.$options.unpin !== false){
                menu.append(_generateUnpin());
            }
            if (me.$options.reload !== false){
                menu.append(_generateReload());
            }
            if (me.$options.minimize !== false){
                menu.append(_generateMinimize());
            }
            if (me.$options.expand !== false){
                menu.append(_generateExpand());
            }
            if (me.$options.close !== false){
                menu.append(_generateClose());
            }
            menu.find('>li>a').on('click', function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
            });
            return dropdown;
        };
        var _generateDropdown = function(){
            return $('<div class="dropdown"></div>')
                    .append('<ul class="dropdown-menu"></ul>')
                    .append('<button class="dropdown-toggle" data-toggle="dropdown"><span class="'+LobiPanel.PRIVATE_OPTIONS.iconClass+' '+me.$options.toggleIcon+'"></button>');;
        };
        var _generateEditTitle = function(){
            var options = me.$options.editTitle;
            var control = $('<a href="#" data-func="editTitle"></a>');
            control.append('<i class="'+LobiPanel.PRIVATE_OPTIONS.iconClass+' '+options.icon+'"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">'+options.tooltip+'</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            
            _onEditTitleClick(control);
            return $('<li></li>').append(control);
        };
        var _onEditTitleClick = function(control){
            control.on('click', function (ev) {
                ev.stopPropagation();
                $heading.find('[data-func="editTitle"]').tooltip('hide');
                if (me.isTitleEditing()){
                    me.finishTitleEditing();
                }else{
                    me.startTitleEditing();
                }
            });
        };
        var _generateUnpin = function(){
            var options = me.$options.unpin;
            var control = $('<a href="#" data-func="unpin"></a>');
            control.append('<i class="'+LobiPanel.PRIVATE_OPTIONS.iconClass+' '+options.icon+'"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">'+options.tooltip+'</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            _onUnpinClick(control);
            return $('<li></li>').append(control);
        };
        var _onUnpinClick = function(unpin){
            unpin.on('click', function(ev) {
                me.togglePin();
            });
        };
        var _generateReload = function(){
            var options = me.$options.reload;
            var control = $('<a href="#" data-func="reload"></a>');
            control.append('<i class="'+LobiPanel.PRIVATE_OPTIONS.iconClass + ' ' + options.icon + '"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">'+options.tooltip+'</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            _onReloadClick(control);
            return $('<li></li>').append(control);
        };
        var _onReloadClick = function(reload){
            reload.on('click', function(ev) {
                if (me.$options.loadUrl){
                    me.load({
                        callback: function(){
                            reload.tooltip('hide');
                        }
                    });
                }
            });
        };
        var _generateMinimize = function(){
            var options = me.$options.minimize;
            var control = $('<a href="#" data-func="minimize"></a>');
            control.append('<i class="'+LobiPanel.PRIVATE_OPTIONS.iconClass+' '+ options.icon + '"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">'+options.tooltip+'</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            _onMinimizeClick(control);
            return $('<li></li>').append(control);
        };
        var _onMinimizeClick = function(minimize){
            minimize.on('click', function(ev) {
                ev.stopPropagation();
                minimize.tooltip('hide');
                me.toggleMinimize();
            });
        };
        var _generateExpand = function(){
            var options = me.$options.expand;
            var control = $('<a href="#" data-func="expand"></a>');
            control.append('<i class="'+LobiPanel.PRIVATE_OPTIONS.iconClass+' '+options.icon+'"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">'+options.tooltip+'</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            _onExpandClick(control);
            return $('<li></li>').append(control);
        };
        var _onExpandClick = function(expand) {
            expand.on('click', function(ev) {
                ev.stopPropagation();
                me.toggleSize();
            });
        };
        var _generateClose = function() {
            var options = me.$options.close;
            var control = $('<a href="#" data-func="close"></a>');
            control.append('<i class="' + LobiPanel.PRIVATE_OPTIONS.iconClass + ' ' + options.icon + '"></i>');
            if (options.tooltip && typeof options.tooltip === 'string') {
                control.append('<span class="control-title">'+options.tooltip+'</span>');
                control.attr('data-tooltip', options.tooltip);
            }
            _onCloseClick(control);
            return $('<li></li>').append(control);
        };
        var _onCloseClick = function(close) {
            close.on('click', function(ev) {
                ev.stopPropagation();
                me.close();
            });
        };
        /**
         * @TODO
         * THIS METHOD NEEDS REWRITE
         * @returns {undefined}
         */
        var _initFromHTML = function(){
            var controls = $heading.find('.controls .panel-control');
//            me.$options.controls = {};
            controls.each(function(index, el){
                var $el = $(el);
                var func = $el.attr('data-func');
                me.$options[func].tooltip = $el.data('tooltip');
                me.$options[func].icon = $el.data('icon');
                me.$options[func].icon2 = $el.data('icon2');
                
                if (func === 'unpin'){
                    _onUnpinClick($el);
                }else if (func === 'reload'){
                    _onReloadClick($el);
                }else if (func === 'minimize'){
                    _onMinimizeClick($el);
                }else if (func === 'expand'){
                    _onExpandClick($el);
                }else if (func === 'close'){
                    _onCloseClick($el);
                }
            });
            me.$options.minWidth = me.$el.attr('data-min-width') || LobiPanel.DEFAULT_OPTIONS.minWidth;
            me.$options.maxWidth = me.$el.attr('data-max-width') || LobiPanel.DEFAULT_OPTIONS.maxWidth;
            me.$options.minHeight = me.$el.attr('data-min-height') || LobiPanel.DEFAULT_OPTIONS.minHeight;
            me.$options.maxHeight = me.$el.attr('data-max-height') || LobiPanel.DEFAULT_OPTIONS.maxHeight;
            
            if (me.$el.attr('data-draggable') === undefined){
                me.$options.draggable = LobiPanel.DEFAULT_OPTIONS.draggable;
            }
            //if data-draggable attribute is "false" or "0" the panel will not be draggable
            //for any other text except "false" and "0" the panel will be draggable
            else {
                me.$options.draggable = ['false', '0'].indexOf(me.$el.attr('data-draggable').toLowerCase()) === -1;
            }
            me.$options.loadUrl = me.$el.attr('data-load-url') || LobiPanel.DEFAULT_OPTIONS.loadUrl;
            me.$options.resize = me.$el.attr('data-resize') || LobiPanel.DEFAULT_OPTIONS.resize;
        };
        var _getMaxZIndex = function(){
            var panels = $('.lobipanel.panel-unpin:not(.panel-minimized.panel-expanded)'),
                style,
                max,
                cur;
            if (panels.length === 0){
                return {
                    "id": "",
                    "z-index": LobiPanel.PRIVATE_OPTIONS.initialZIndex
                };
            }
            style = $(panels[0]).attr('style');
            var id = $(panels[0]).data('inner-id');
            if ( ! style){
                max = LobiPanel.PRIVATE_OPTIONS.initialZIndex;
            }else{
                max = style.getCss()['z-index'];
            }
            for (var i = 1; i<panels.length; i++){
                style = $(panels[i]).attr('style');
                if ( ! style){
                    cur = 0;
                }else{
                    cur = style.getCss()['z-index'];
                }
                if (cur > max){
                    id = $(panels[i]).data('inner-id');
                    max = cur;
                }
            }
            return {
                "id"        : id,
                "z-index"   : parseInt(max, 10)
            };
        };
        var _onPanelClick = function(){
            me.$el.on('mousedown.lobiPanel', function(ev){
                if (me.isPinned() ||
                        me.isMinimized() ||
                        me.isOnFullScreen()) {
                    return false;
                }
                me.bringToFront();
            });
        };
        var _offPanelClick = function(){
            me.$el.off('mousedown.lobiPanel');
        };
        var _changeClassOfControl = function(el){
            el = $(el);
            var opts = me.$options[el.attr('data-func')];
            if ( ! opts.icon){
                return;
            }
            el.find('.'+LobiPanel.PRIVATE_OPTIONS.iconClass).toggleClass(opts.icon).toggleClass(opts.icon2);
        };
        var _getFooterForMinimizedPanels = function(){
            //we grab footer where minimized panels should go
            var minimizedCtr = $('.'+LobiPanel.PRIVATE_OPTIONS.toolbarClass);
            //if panel does not exist we create it and append to body
            if (minimizedCtr.length === 0){
                minimizedCtr = $('<div class="'+LobiPanel.PRIVATE_OPTIONS.toolbarClass+'"></div>');
                $('body').append(minimizedCtr);
            }
            return minimizedCtr;
        };
        var _expandOnHeaderClick = function(){
            $heading.on('click.lobiPanel', function(){
                me.maximize();
                me.bringToFront();
            });
        };
        var _removeExpandOnHeaderClick = function(){
            $heading.off('click.lobiPanel');
        };
        var _getAvailableWidth = function(calcWidth){
            if (me.$options.maxWidth) {
                calcWidth = Math.min(calcWidth, me.$options.maxWidth);
            }
            if (me.$options.minWidth) {
                calcWidth = Math.max(calcWidth, me.$options.minWidth);
            }
            return calcWidth;
        };
        var _getAvailableHeight = function(calcHeight){
            if (me.$options.maxHeight) {
                calcHeight = Math.min(calcHeight, me.$options.maxHeight);
            }
            if (me.$options.minHeight) {
                calcHeight = Math.max(calcHeight, me.$options.minHeight);
            }
            return calcHeight;
        };
        var _calculateBodyHeight = function(h){
            return h - $heading.outerHeight() - me.$el.find('.panel-footer').outerHeight();
        };
        var _calculateBodyWidth = function(w){
            return w - 2;
        };
        var _appendInnerIdToParent = function(parent, innerId){
            //If this is first lobipanel element of its parent
            if (parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr) === undefined){
                parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr, innerId);
            }
            //This means that parent already has LobiPanel instance
            else{
                //if parent already has panel innerId than we do nothing
                if (parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr).indexOf(innerId) > -1) {
                    return;
                }
                var innerIds = parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr);
                parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr, innerIds+" "+innerId);
            }
            me.$el.attr('data-index', me.$el.index());
        };
        var _insertInParent = function(){
            //find its parent element
            var parent = $('[' + LobiPanel.PRIVATE_OPTIONS.parentAttr + '~=' + innerId + ']');
            me.$el.insertAt(me.$el.attr('data-index'), parent);
        };
        var _generateWindow8Spinner = function(){
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
            return $('<div class="spinner-wrapper">'+template+'</div>');
        };
        var _enableSorting = function(){
            var parent = me.$el.parent();
            if (parent.hasClass('ui-sortable')){
                parent.sortable("destroy");
            }
            if (me.$options.sortable){
                me.$el.addClass('lobipanel-sortable');
            }else{
                me.$el.removeClass('lobipanel-sortable');
            }
            parent.sortable({
                connectWith: me.$options.connectWith,
                items: '.lobipanel-sortable',
                handle: '.panel-heading',
                cursor: 'move',
                placeholder: 'lobipanel-placeholder',
                forcePlaceholderSize: true,
                opacity: 0.7,
                revert: 300,
                update: function (event, ui) {
                    var innerId = ui.item.data('inner-id');
                    _removeInnerIdFromParent(innerId);
                    _appendInnerIdToParent(ui.item.parent(), innerId);
                    _updateDataIndices(ui.item);
                }
            });
        };
        var _updateDataIndices = function(panel){
            var items = panel.parent().find('> *');
            items.each(function(index, el){
                $(el).attr('data-index', index);
            });
        };
        var _removeInnerIdFromParent = function(innerId){
            var parent = $('[' + LobiPanel.PRIVATE_OPTIONS.parentAttr + '~=' + innerId + ']');
            var innerIds = parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr).replace(innerId, '').trim().replace(/\s{2,}/g, ' ');
            parent.attr(LobiPanel.PRIVATE_OPTIONS.parentAttr, innerIds);
        };
        var _onToggleIconsBtnClick = function(){
            $heading.find('.toggle-controls').on('click.lobiPanel', function(ev){
                me.$el.toggleClass("controls-expanded");
            });
        };
        var _adjustForScreenSize = function(){
            me.disableTooltips();
            if ($(window).width() > 768 && me.$options.tooltips){
                me.enableTooltips();
            }
        };
        var _enableResponsiveness = function(){
            $(window).on('resize.lobiPanel', function(){
                _adjustForScreenSize();
            });
        };
//------------------------------------------------------------------------------
//----------------PROTOTYPE FUNCTIONS-------------------------------------------
//------------------------------------------------------------------------------
        /**
         * Checks if panel is initialized. Panel is initialized if it has 
         * lobipanel class and data-inner-id="" attribute
         * 
         * @returns {Boolean}
         */
        this.isPanelInit = function(){
            var me = this;
            return me.$el.hasClass('lobipanel') && me.$el.data('inner-id');
        };
        /**
         * Checks if panel is pinned or unpinned
         * 
         * @returns {Boolean}
         */
        this.isPinned = function(){
            return !me.$el.hasClass('panel-unpin');
        };
        /**
         * Pin the panel
         * 
         * @returns {LobiPanel}
         */
        this.pin = function(){
            me.$el.trigger("beforePin.lobiPanel", me);
            //hide the tooltip
            $heading.find('[data-func="unpin"]').tooltip('hide');
            //disable resize functionality
            me.disableResize();
            me.disableDrag();
            //remove on panel click event (which brings the panel into front)
            _offPanelClick();
            //remove panel-unpin class
            me.$el.removeClass('panel-unpin')
                //save current position, z-index and size to use it for later unpin
                .attr('old-style', me.$el.attr('style'))
                .removeAttr('style')
                .css('position', 'relative');
            $body.css({
                width: '',
                height: ''
            });
            
            _insertInParent();
            me.$el.trigger("onPin.lobiPanel", me);
            return me;
        };
        /**
         * Unpin the panel
         * 
         * @returns {LobiPanel}
         */
        this.unpin = function(){
            me.$el.trigger('beforeUnpin.lobiPanel', me);
            if (me.$el.hasClass("panel-collapsed")){
                return me;
            }
            $heading.find('[data-func="unpin"]').tooltip('hide');
            if (me.$el.attr('old-style')) {
                me.$el.attr('style', me.$el.attr('old-style'));
            } else {
                var width = me.$el.width();
                var height = me.$el.height();
//                var left = Math.round($(window).width() / 2 - width / 2);
              var left = Math.max(0, (($(window).width() - me.$el.outerWidth()) / 2));
//                var top = Math.round($(window).height() / 2 - height / 2);
                var top = Math.max(0, (($(window).height() - me.$el.outerHeight()) / 2));
                me.$el.css({
                    left: left,
                    top: top,
                    width: width,
                    height: height
//                    right: $(window).width() - left - width + 2,
//                    bottom: $(window).height() - top - height + 2
                });
            }
            var res = _getMaxZIndex();
            me.$el.css('z-index', res['z-index'] + 1);
            _onPanelClick();

            me.$el.addClass('panel-unpin');
            $('body').append(me.$el);
            
            var panelWidth = _getAvailableWidth(me.$el.width());
            var panelHeight = _getAvailableHeight(me.$el.height());
            me.$el.css({
                position: 'fixed',
                width: panelWidth,
                height: panelHeight
            });
            //we give .panel-body to width and height in order .panel-body to start scroling
            var bHeight = _calculateBodyHeight(panelHeight);
            var bWidth = _calculateBodyWidth(panelWidth);
            $body.css({
                width: bWidth,
                height: bHeight
            });
            
            if (me.$options.draggable) {
                me.enableDrag();
            }
            if (me.$options.resize !== 'none'){
                me.enableResize();
            }
            me.$el.trigger('onUnpin.lobiPanel', me);
            return me;
        };
        /**
         * Toggles (pin or unpin) the panel
         * 
         * @returns {LobiPanel}
         */
        this.togglePin = function(){
            if (this.isPinned()){
                this.unpin();
            }else{
                this.pin();
            }
            return me;
        };
        /**
         * Checks if panel is minimized or not. It does not matter if panel is pinned or not
         * 
         * @returns {Boolean}
         */
        this.isMinimized = function(){
            return me.$el.hasClass('panel-minimized') || me.$el.hasClass('panel-collapsed');
        };
        /**
         * Minimize the panel. If panel is pinned it is minimized on its place
         * if panel is unpinned it is minimized at the bottom of the page
         * 
         * @returns {LobiPanel}
         */
        this.minimize = function(){
            me.$el.trigger("beforeMinimize.lobiPanel", me);
            if (me.isMinimized()){
                return me;
            }
            if (me.isPinned()) {
                $body.slideUp();
                me.$el.find('.panel-footer').slideUp();
                me.$el.addClass('panel-collapsed');
                _changeClassOfControl($heading.find('[data-func="minimize"]'));
            } else {
                $heading.find('[data-func="minimize"]').tooltip('hide');
                //get footer where we need to put panel
                var footer = _getFooterForMinimizedPanels();
                //find other panels which are already inside footer
                var children = footer.find('>*');
                var left, top, height;
                //get top coordinate of footer
                top = footer.offset().top;
                //and get height of footer
                height = footer.height();
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
                    _expandOnHeaderClick();
                    //animation was made and panel is positioned in place we it must be
                    //so we append panel into footer
                    footer.append(me.$el);
                    $('body').addClass('lobipanel-minimized');
                    me.$el.trigger("onMinimize.lobiPanel", me);
                });
            }
            return me;
        };
        /**
         * Maximize the panel. This method works for minimized panel.
         * If panel is pinned it's maximized on its place.
         * If panel is unpinned it's maximized on position from which it was minimized
         * 
         * @returns {LobiPanel}
         */
        this.maximize = function(){
            me.$el.trigger("beforeMaximize.lobiPanel", me);
            if ( ! me.isMinimized()){
                return me;
            }
            if (me.isPinned()){
                $body.slideDown();
                me.$el.find('.panel-footer').slideDown();
                me.$el.removeClass('panel-collapsed');
                _changeClassOfControl($heading.find('[data-func="minimize"]'));
            }else{
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
                    if (me.$options.draggable){
                        me.enableDrag();
                    }
                    me.enableResize();
                    _removeExpandOnHeaderClick();
                    //If there are no other elements inside footer, remove it also
                    var footer = _getFooterForMinimizedPanels();
                    if (footer.children().length === 0) {
                        footer.remove();
                    }
                    $('body').removeClass('lobipanel-minimized');
                    me.$el.trigger("onMaximize.lobiPanel", me);
                });
            }
            return me;
        };
        /**
         * Toggles (minimize or maximize) the panel state.
         * 
         * @returns {LobiPanel}
         */
        this.toggleMinimize = function(){
            if (me.isMinimized()){
                me.maximize();
            }else{
                me.minimize();
            }
            return me;
        };
        /**
         * Checks if panel is on full screen
         * 
         * @returns {Boolean}
         */
        this.isOnFullScreen = function(){
            return me.$el.hasClass('panel-expanded');
        };
        /**
         * Expands the panel to full screen size
         * 
         * @returns {LobiPanel}
         */
        this.toFullScreen = function(){
            me.$el.trigger("beforeFullScreen.lobiPanel", me);
            if (me.$el.hasClass("panel-collapsed")){
                return me;
            }
            _changeClassOfControl($heading.find('[data-func="expand"]'));
            $heading.find('[data-func="expand"]').tooltip('hide');
            var res = _getMaxZIndex();
            //if panel is pinned or minimized, its position is not absolute and 
            //animation will not work correctly so we change its position and
            //other css properties and we append panel into body
            if (me.isPinned() || me.isMinimized()) {
                me.$el.css({
                    position: 'fixed',
                    "z-index": res["z-index"] + 1,
                    left: me.$el.offset().left,
                    top: me.$el.offset().top,
                    width: me.$el.width(),
                    height: me.$el.height()
                });
                $('body').append(me.$el);
                //If we are expanding panel to full screen from footer and in footer there are no more elements
                //remove footer also
                var footer = _getFooterForMinimizedPanels();
                if (footer.children().length === 0) {
                    footer.remove();
                }
            }else{
                $body.css({
                    width: '',
                    height: ''
                });
            }
            //if panel is not minimized we save its style property, because when 
            //toSmallSize() method is called panel needs to have style, it had before calling method
            // toFullScreen()
            if ( ! me.isMinimized()) {
                me.$el.attr('old-style', me.$el.attr('style'));
                me.disableResize();
            } else {
                me.$el.removeClass('panel-minimized');
                _removeExpandOnHeaderClick();
            }
            //get toolbar
            var toolbar = $('.'+LobiPanel.PRIVATE_OPTIONS.toolbarClass);
            var toolbarHeight = toolbar.outerHeight() || 0;
            me.$el.animate({
                width: $(window).width(),
                height: $(window).height() - toolbarHeight,
                left: 0,
                top: 0
            }, 100, function () {
                me.$el.css({
                    width: '',
                    height: '',
                    right: 0,
                    bottom: toolbarHeight
                });
                me.$el.addClass('panel-expanded');
                $('body').css('overflow', 'hidden');
                $body.css({
                    width: _calculateBodyWidth(me.$el.width()),
                    height: _calculateBodyHeight(me.$el.height())
                });
                me.disableDrag();
                
                me.$el.trigger("onFullScreen.lobiPanel", me);
            });
            return me;
        };
        /**
         * Collapse the panel to small size
         * 
         * @returns {LobiPanel}
         */
        this.toSmallSize = function(){
            me.$el.trigger("beforeSmallSize.lobiPanel", me);
            _changeClassOfControl($heading.find('[data-func="expand"]'));
            var css = me.$el.attr('old-style').getCss();
            //we get css properties from old-style (saved before expanding)
            //and we animate panel to this css properties
            me.$el.animate({
                left: css.left,
                top: css.top,
                width: css.width,
                height: css.height,
                right: css.right,
                bottom: css.bottom
            }, 100, function () {
                //we remove old-style as we do not need it
                me.$el.removeAttr('old-style');
                //if panel is pinned we also remove its style attribute and we
                //append panel in its parent element
                if (!me.$el.hasClass('panel-unpin')) {
                    me.$el.removeAttr('style');
                    _insertInParent();
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
                if ( ! me.isPinned()){
                    bWidth = _calculateBodyWidth(me.getWidth());
                    bHeight = _calculateBodyHeight(me.getHeight());
                }
                $body.css({
                    width: bWidth,
                    height: bHeight
                });
                me.$el.trigger("onSmallSize.lobiPanel", me);
            });
            return me;
        };
        /**
         * Toggles (changes to full screen size or to small size) the panel size
         * 
         * @returns {LobiPanel}
         */
        this.toggleSize = function(){
            if (me.isOnFullScreen()){
                me.toSmallSize();
            }else{
                me.toFullScreen();
            }
            return me;
        };
        /**
         * Closes the panel. Removes it from document
         * 
         * @returns {LobiPanel}
         */
        this.close = function(){
            me.$el.trigger('beforeClose.lobiPanel', me);
            me.$el.hide(100, function() {
                if (me.isOnFullScreen()){
                    $('body').css('overflow', 'auto');
                }
                me.$el.remove();
                //If there are no other elements inside footer, remove it also
                var footer = _getFooterForMinimizedPanels();
                if (footer.children().length === 0) {
                    footer.remove();
                }
                me.$el.trigger('onClose.lobiPanel', me);
            });
            return me;
        };
        /**
         * Moves unpinned panel to given position. 
         * This method will do nothing if panel is pinned
         * 
         * @param {number} left
         * @param {number} top
         * @returns {LobiPanel}
         */
        this.setPosition = function(left, top){
            //this method works only if panel is not pinned
            if (me.isPinned()){
                return me;
            }
            me.$el.animate({
               'left': left,
               'top' : top
            }, 100);
            return me;
        };
        /**
         * Set the width of the panel
         * 
         * @param {number} w
         * @returns {LobiPanel}
         */
        this.setWidth = function(w){
            if (me.isPinned()){
                return me;
            }
            var bWidth = _calculateBodyWidth(w);
            me.$el.animate({
                width: w
            }, 100);
            $body.animate({
                width: bWidth
            }, 100);
            return me;
        };
        /**
         * Set the height of the panel
         * 
         * @param {number} h
         * @returns {LobiPanel}
         */
        this.setHeight = function(h){
            if (me.isPinned()){
                return me;
            }
            var bHeight = _calculateBodyHeight(h);
            me.$el.animate({
                height: h
            }, 100);
            $body.animate({
                height: bHeight
            }, 100);
            return me;
        };
        /**
         * Set size (width and height) of the panel
         * 
         * @param {number} w
         * @param {number} h
         * @returns {LobiPanel}
         */
        this.setSize = function(w, h){
            if (me.isPinned()){
                return me;
            }
            var bHeight = _calculateBodyHeight(h);
            var bWidth = _calculateBodyWidth(w);
            me.$el.animate({
                height: h,
                width: w
            }, 100);
            $body.animate({
                height: bHeight,
                width: bWidth
            }, 100);
            return me;
        };
        /**
         * Get the position of the panel.
         * Returns object where x is left coordinate and y is top coordinate
         * 
         * @returns {Object}
         */
        this.getPosition = function(){
            var offset = me.$el.offset();
            return {
                x: offset.left,
                y: offset.top
            };
        };
        /**
         * Get width of the panel
         * 
         * @returns {number}
         */
        this.getWidth = function(){
            return me.$el.width();
        };
        /**
         * Get height of the panel
         * 
         * @returns {number}
         */
        this.getHeight = function(){
            return me.$el.height();
        };
        /**
         * If panel is overlapped by another panel this panel will be shown on front
         * (this panel will overlap other panels)
         * 
         * @returns {LobiPanel}
         */
        this.bringToFront = function(){
            me.$el.trigger("beforeToFront.lobiPanel", me);
            var res = _getMaxZIndex();
            if (res['id'] === me.$el.data('inner-id')) {
                return me;
            }
            me.$el.css('z-index', res['z-index'] + 1);
            me.$el.trigger("onToFront.lobiPanel", me);
            return me;
        };
        /**
         * Enable dragging of panel
         * 
         * @returns {LobiPanel}
         */
        this.enableDrag = function(){
            me.$el.draggable({
                handle: '.panel-heading'
            });
            return me;
        };
        /**
         * Disable dragging of the panel
         * 
         * @returns {LobiPanel}
         */
        this.disableDrag = function(){
            if (me.$el.hasClass('ui-draggable')){
                me.$el.draggable("destroy");
            }
            return me;
        };
        /**
         * Enable resize of the panel
         * 
         * @returns {LobiPanel}
         */
        this.enableResize = function(){
            var handles = false;
            if (me.$options.resize === 'vertical'){
                handles = 'n, s';
            }else if (me.$options.resize === 'horizontal'){
                handles = 'e, w';
            }else if (me.$options.resize === 'both'){
                handles = 'all';
            }
            if ( ! handles){
                return;
            }
            me.$el.resizable({
                minWidth: me.$options.minWidth,
                maxWidth: me.$options.maxWidth,
                minHeight: me.$options.minHeight,
                maxHeight: me.$options.maxHeight,
                handles: handles,
                resize: function(event, ui){
                    var bHeight = _calculateBodyHeight(me.$el.height());
                    var bWidth = _calculateBodyWidth(me.$el.width());
                    $body.css({
                        width: bWidth,
                        height: bHeight
                    });
                }
            });
            return me;
        };
        /**
         * Disable resize of the panel
         * 
         * @returns {LobiPanel}
         */
        this.disableResize = function(){
            if (me.$el.hasClass('ui-resizable')){
                me.$el.resizable("destroy");
            }
            return me;
        };
        /**
         * Start spinner of the panel loading
         * 
         * @returns {LobiPanel}
         */
        this.startLoading = function(){
            var spinner = _generateWindow8Spinner();
            me.$el.append(spinner);
            var sp = spinner.find('.spinner');
            sp.css('margin-top', Math.min((me.$el.height() - sp.height())/2, 200));
            return me;
        };
        /**
         * Stop spinner of the panel loading
         * 
         * @returns {LobiPanel}
         */
        this.stopLoading = function(){
            me.$el.find('.spinner-wrapper').remove();
            return me;
        };
        /**
         * Set url. This url will be used to load data when Reload button is clicked
         * or user calls .load() method without url parameter
         * 
         * @param {string} url
         * @returns {LobiPanel}
         */
        this.setLoadUrl = function(url){
            me.$options.loadUrl = url;
            return me;
        };
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
        this.load = function(params){
            params = params || {};
            if (typeof params === 'string'){
                params = {url: params};
            }
            var url = params.url || me.$options.loadUrl,
                data = params.data || {},
                callback = params.callback || null;

            if ( ! url){
                return me;
            }
            me.$el.trigger("beforeLoad.lobiPanel", me);
            me.startLoading();
            $body.load(url, data, function(result, status, xhr){
                if (callback && typeof callback === 'function'){
                    callback(result, status, xhr);
                }
                me.stopLoading();
                me.$el.trigger("loaded.lobiPanel", [me, result, status, xhr]);
            });
            return me;
        };
        /**
         * Destroy the LobiPanel instance
         * 
         * @returns {jQuery element}
         */
        this.destroy = function(){
            me.disableDrag();
            me.disableResize();
            me.$options.sortable = false;
            _enableSorting();
            _removeInnerIdFromParent(innerId);
            me.$el.removeClass('lobipanel')
                    .removeAttr('data-inner-id')
                    .removeAttr('data-index')
                    .removeData('lobiPanel');
            $heading.find('.dropdown').remove();
            return me.$el;
        };
        /**
         * Creates input field to edit panel title
         * 
         * @returns {LobiPanel}
         */
        this.startTitleEditing = function(){
            var title = $heading.find('.panel-title').text().trim();
            var input = $('<input value="'+title+'"/>');
            input.on('keydown', function(ev){
                if (ev.which === 13){
                    me.finishTitleEditing();
                }else if (ev.which === 27){
                    me.cancelTitleEditing();
                }
            });
            $heading.find('.panel-title')
                    .data('old-title', title)
                    .html("").append(input);
            _changeClassOfControl($heading.find('[data-func="editTitle"]'));
            return me;
        };
        /**
         * Check if panel title is being edited (if it is in edit process)
         * 
         * @returns {Boolean}
         */
        this.isTitleEditing = function(){
            return $heading.find('.panel-title input').length > 0;
        };
        /**
         * Cancel the panel new title and return to previous title when it is changed but not saved
         * 
         * @returns {LobiPanel}
         */
        this.cancelTitleEditing = function(){
            var title = $heading.find('.panel-title');
            title.html(title.data('old-title'))
                    .find('input').remove();
            _changeClassOfControl($heading.find('[data-func="editTitle"]'));
            return me;
        };
        /**
         * Finish the panel title editing process and save new title
         * 
         * @returns {LobiPanel}
         */
        this.finishTitleEditing = function(){
            var input = $heading.find('input');
            $heading.find('.panel-title').html(input.val());
            input.remove();
            _changeClassOfControl($heading.find('[data-func="editTitle"]'));
            return me;
        };
        /**
         * Enable tooltips on panel controls
         * 
         * @returns {LobiPanel}
         */
        this.enableTooltips = function () {
            var controls = $heading.find('.dropdown-menu>li>a');
            controls.each(function (index, el) {
                var $el = $(el);
                $el.attr('data-toggle', 'tooltip')
                        .attr('data-title', $el.data('tooltip'))
                        .attr('data-placement', 'bottom')
                        .attr('data-container', 'body')
                        ;
            });
            controls.tooltip();
            return me;
        };
        /**
         * Disable tooltips on panel controls
         * 
         * @returns {LobiPanel}
         */
        this.disableTooltips = function(){
            $heading.find('.dropdown-menu>li>a').tooltip('destroy');
            return me;
        };
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
        this.$el = $el;
        this.$options = _processInput(options);
        $heading = this.$el.find('>.panel-heading');
        $body = this.$el.find('>.panel-body');
        _init();
    };
    
    $.fn.lobiPanel = function(option){
        var args = arguments;
        var ret;
        this.each(function(index, el) {
            
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
        initialZIndex       : 10000,
        //This class is attached to every panel-control icon
        iconClass : 'panel-control-icon'
    };
    LobiPanel.DEFAULT_OPTIONS = {
        //Makes <b>unpinned</b> panel draggable
        //Warning!!! This requires jquery ui draggable widget to be included
        draggable : true,
        //Makes <b>pinned</b> panels sortable
        //Warning!!! This requires jquery ui sortable widget to be included
        sortable : false,
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
        loadUrl             : "",
        //This will enable tooltips on panel controls
        tooltips : true,
        toggleIcon: 'glyphicon glyphicon-cog',
        unpin: {
            icon        : 'glyphicon glyphicon-move',       //You can user glyphicons if you do not want to use font-awesome
            tooltip     : 'Unpin'               //tooltip text, If you want to disable tooltip, set it to false
        },
        reload: {
            icon        : 'glyphicon glyphicon-refresh',       //You can user glyphicons if you do not want to use font-awesome
            tooltip     : 'Reload'           //tooltip text, If you want to disable tooltip, set it to false
        },
        minimize: {
            icon        : 'glyphicon glyphicon-minus',       //icon is shown when panel is not minimized
            icon2       : 'glyphicon glyphicon-plus',        //icon2 is shown when panel is minimized
            tooltip     : 'Minimize'         //tooltip text, If you want to disable tooltip, set it to false
        },
        expand: {
            icon        : 'glyphicon glyphicon-resize-full',      //icon is shown when panel is not on full screen
            icon2       : 'glyphicon glyphicon-resize-small',    //icon2 is shown when pane is on full screen state
            tooltip     : 'Fullscreen'       //tooltip text, If you want to disable tooltip, set it to false
        },
        close: {
            icon        : 'glyphicon glyphicon-remove',        //You can user glyphicons if you do not want to use font-awesome
            tooltip     : 'Close'            //tooltip text, If you want to disable tooltip, set it to false
        },
        editTitle: {
            icon        : 'glyphicon glyphicon-pencil',
            icon2       : 'glyphicon glyphicon-floppy-disk',
            tooltip     : 'Edit title'
        }
        
    };
    
    $('.lobipanel').lobiPanel();
});

