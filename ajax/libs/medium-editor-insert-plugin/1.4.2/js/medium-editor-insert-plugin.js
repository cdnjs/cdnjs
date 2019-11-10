/*! 
 * medium-editor-insert-plugin v1.4.2 - jQuery insert plugin for MediumEditor
 *
 * https://github.com/orthes/medium-editor-insert-plugin
 * 
 * Copyright (c) 2014 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

this["MediumInsert"] = this["MediumInsert"] || {};
this["MediumInsert"]["Templates"] = this["MediumInsert"]["Templates"] || {};

this["MediumInsert"]["Templates"]["src/js/templates/core-buttons.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "            <li><a data-addon=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" data-action=\"add\" class=\"medium-insert-action\">";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"medium-insert-buttons\" contenteditable=\"false\" style=\"display: none\">\n    <a class=\"medium-insert-buttons-show\">+</a>\n    <ul class=\"medium-insert-buttons-addons\" style=\"display: none\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.addons : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </ul>\n</div>\n";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/core-caption.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<figcaption contenteditable=\"true\">\n	<div class=\"medium-insert-caption-placeholder\" contenteditable=\"false\">"
    + escapeExpression(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"placeholder","hash":{},"data":data}) : helper)))
    + "</div>\n</figcaption>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/core-empty-line.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<p><br></p>\n";
  },"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/embeds-placeholder.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"medium-insert-embeds-placeholder\" contenteditable=\"false\">"
    + escapeExpression(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"placeholder","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/embeds-toolbar.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.label : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "                <li>\n                    <button class=\"medium-editor-action\" data-action=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\">";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</button>\n                </li>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, buffer = "	<div class=\"medium-insert-embeds-toolbar2 medium-editor-toolbar medium-editor-toolbar-active\">\n		<ul class=\"medium-editor-toolbar-actions clearfix\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.actions : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    	</ul>\n    </div>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.label : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"6":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "        	        <li>\n        	            <button class=\"medium-editor-action\" data-action=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\">";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</button>\n        	        </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"medium-insert-embeds-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n    <ul class=\"medium-editor-toolbar-actions clearfix\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.styles : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </ul>\n</div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.actions : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/embeds-wrapper.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, buffer = "<div class=\"medium-insert-embeds\" contenteditable=\"false\">\n	<figure>\n		<div class=\"medium-insert-embed\">\n			";
  stack1 = ((helper = (helper = helpers.html || (depth0 != null ? depth0.html : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"html","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n		</div>\n	</figure>\n	<div class=\"medium-insert-embeds-overlay\"></div>\n</div>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-fileupload.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<input type=\"file\" multiple>";
  },"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-image.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "        <div class=\"medium-insert-images-progress\"></div>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<figure contenteditable=\"false\">\n    <img src=\""
    + escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.progress : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</figure>";
},"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-progressbar.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "<progress min=\"0\" max=\"100\" value=\"0\">0</progress>";
  },"useData":true});

this["MediumInsert"]["Templates"]["src/js/templates/images-toolbar.hbs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.label : depth0), {"name":"if","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "                <li>\n                    <button class=\"medium-editor-action\" data-action=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\">";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</button>\n                </li>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, buffer = "	<div class=\"medium-insert-images-toolbar2 medium-editor-toolbar medium-editor-toolbar-active\">\n		<ul class=\"medium-editor-toolbar-actions clearfix\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.actions : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    	</ul>\n    </div>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.label : depth0), {"name":"if","hash":{},"fn":this.program(6, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"6":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing, buffer = "        	        <li>\n        	            <button class=\"medium-editor-action\" data-action=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\">";
  stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"label","hash":{},"data":data}) : helper));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</button>\n        	        </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"medium-insert-images-toolbar medium-editor-toolbar medium-toolbar-arrow-under medium-editor-toolbar-active\">\n    <ul class=\"medium-editor-toolbar-actions clearfix\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.styles : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </ul>\n</div>\n\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.actions : depth0), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        defaults = {
            editor: null,
            enabled: true,
            addons: {
                images: true, // boolean or object containing configuration
                embeds: true
            }
        };

    /**
     * Capitalize first character
     *
     * @param {string} str
     * @return {string}
     */

    function ucfirst (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Core plugin's object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Core (el, options) {
        var editor;

        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;

        if (options) {
            // Fix #142
            // Avoid deep copying editor object, because since v2.3.0 it contains circular references which causes jQuery.extend to break
            // Instead copy editor object to this.options manually
            editor = options.editor;
            options.editor = null;
        }
        this.options = $.extend(true, {}, defaults, options);
        this.options.editor = editor;

        this._defaults = defaults;
        this._name = pluginName;

        // Extend editor's functions
        if (this.options && this.options.editor) {
            this.options.editor._serialize = this.options.editor.serialize;
            this.options.editor._deactivate = this.options.editor.deactivate;
            this.options.editor._activate = this.options.editor.activate;
            this.options.editor._hideInsertButtons = this.hideButtons;
            this.options.editor.serialize = this.editorSerialize;
            this.options.editor.deactivate = this.editorDeactivate;
            this.options.editor.activate = this.editorActivate;
            this.options.editor.activatePlaceholder = this.editorActivatePlaceholder;
        }
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Core.prototype.init = function () {
        this.$el.addClass('medium-editor-insert-plugin');

        if (typeof this.options.addons !== 'object' || Object.keys(this.options.addons).length === 0) {
            this.disable();
        }

        this.initAddons();
        this.clean();
        this.events();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Core.prototype.events = function () {
        this.$el
            .on('dragover drop', function (e) {
                e.preventDefault();
            })
            .on('keyup click', $.proxy(this, 'toggleButtons'))
            .on('selectstart mousedown', '.medium-insert, .medium-insert-buttons', $.proxy(this, 'disableSelection'))
            .on('keydown', $.proxy(this, 'fixSelectAll'))
            .on('click', '.medium-insert-buttons-show', $.proxy(this, 'toggleAddons'))
            .on('click', '.medium-insert-action', $.proxy(this, 'addonAction'));

        $(window).on('resize', $.proxy(this, 'positionButtons', null));
    };

    /**
     * Extend editor's serialize function
     *
     * @return {object} Serialized data
     */

    Core.prototype.editorSerialize = function () {
        var data = this._serialize();

        $.each(data, function (key) {
            var $data = $('<div />').html(data[key].value);

            $data.find('.medium-insert-buttons').remove();

            data[key].value = $data.html();
        });

        return data;
    };

    /**
     * Extend editor's deactivate function to deactivate this plugin too
     *
     * @return {void}
     */

    Core.prototype.editorDeactivate = function () {
        this._deactivate();

        $.each(this.elements, function (key, el) {
            $(el).data('plugin_' + pluginName).disable();
        });
    };

    /**
     * Extend editor's activate function to activate this plugin too
     *
     * @return {void}
     */

    Core.prototype.editorActivate = function () {
        this._activate();

        $.each(this.elements, function (key, el) {
            $(el).data('plugin_' + pluginName).enable();
        });
    };

    /**
     * Extend editor's activatePlaceholder function to activate placeholder dispite of the plugin buttons
     *
     * @return {void}
     */

    Core.prototype.editorActivatePlaceholder = function (el) {
        var $clone = $(el).clone(),
            cloneHtml;

        $clone.find('.medium-insert-buttons').remove();
        cloneHtml = $clone.html().replace(/^\s+|\s+$/g, '').replace(/^<p( class="medium-insert-active")?><br><\/p>$/, '');

        if (!(el.querySelector('img')) &&
            !(el.querySelector('blockquote')) &&
            cloneHtml === '') {

            el.classList.add('medium-editor-placeholder');
            this._hideInsertButtons($(el));
        }
    };

    /**
     * Deselects selected text
     *
     * @return {void}
     */

    Core.prototype.deselect = function () {
        document.getSelection().removeAllRanges();
    };

    /**
     * Disables the plugin
     *
     * @return {void}
     */

    Core.prototype.disable = function () {
        this.options.enabled = false;

        this.$el.find('.medium-insert-buttons').addClass('hide');
    };

    /**
     * Enables the plugin
     *
     * @return {void}
     */

    Core.prototype.enable = function () {
        this.options.enabled = true;

        this.$el.find('.medium-insert-buttons').removeClass('hide');
    };

    /**
     * Disables selectstart mousedown events on plugin elements except images
     *
     * @return {void}
     */

    Core.prototype.disableSelection = function (e) {
        var $el = $(e.target);

        if ($el.is('img') === false || $el.hasClass('medium-insert-buttons-show')) {
            e.preventDefault();
        }
    };

    /**
     * Fix #39
     * For some reason Chrome doesn't "select-all", when the last placeholder is visible.
     * So it's needed to hide it when the user "selects all", and show it again when they presses any other key.
     *
     * @return {boolean} document.execCommand()
     */

    Core.prototype.fixSelectAll = function (e) {
        this.$el.children().last().removeClass('hide');

         if ((e.ctrlKey || e.metaKey) && e.which === 65) {
            e.preventDefault();

            if(this.$el.find('p').text().trim().length === 0) {
              return false;
            }

            this.$el.children().last().addClass('hide');

            return document.execCommand('selectAll', false, null);
        }
    };

    /**
     * Initialize addons
     *
     * @return {void}
     */

    Core.prototype.initAddons = function () {
        var that = this;

        $.each(this.options.addons, function (addon, options) {
            var addonName = pluginName + ucfirst(addon);

            if (options === false) {
                delete that.options.addons[addon];
                return;
            }

            that.$el[addonName](options);
            that.options.addons[addon] = that.$el.data('plugin_'+ addonName).options;
        });
    };

    /**
     * Cleans a content of the editor
     *
     * @return {void}
     */

    Core.prototype.clean = function () {
        var that = this,
            $buttons, $lastEl, $text;

        if (this.options.enabled === false) {
            return;
        }

        // Fix #39
        // After deleting all content (ctrl+A and delete) in Firefox, all content is deleted and only <br> appears
        // To force placeholder to appear, set <p><br></p> as content of the $el

        if (this.$el.html().trim() === '' || this.$el.html().trim() === '<br>') {
            this.$el.html(this.templates['src/js/templates/core-empty-line.hbs']().trim());
        }

        // Fix #29
        // Wrap content text in <p></p> to avoid Firefox problems
        $text = this.$el
            .contents()
            .filter(function () {
                return this.nodeName === '#text' && $.trim($(this).text()) !== '';
            });

        $text.each(function () {
            $(this).wrap('<p />');

            // Fix #145
            // Move caret at the end of the element that's being wrapped
            that.moveCaret($(this).parent(), $(this).text().length);
        });

        this.addButtons();

        $buttons = this.$el.find('.medium-insert-buttons');
        $lastEl = $buttons.prev();
        if ($lastEl.attr('class') && $lastEl.attr('class').match(/medium\-insert(?!\-active)/)) {
            $buttons.before(this.templates['src/js/templates/core-empty-line.hbs']().trim());
        }
    };

    /**
     * Returns HTML template of buttons
     *
     * @return {string} HTML template of buttons
     */

    Core.prototype.getButtons = function () {
        if (this.options.enabled === false) {
            return;
        }

        return this.templates['src/js/templates/core-buttons.hbs']({
            addons: this.options.addons
        }).trim();
    };

    /**
     * Appends buttons at the end of the $el
     *
     * @return {void}
     */

    Core.prototype.addButtons = function () {
        if (this.$el.find('.medium-insert-buttons').length === 0) {
            this.$el.append(this.getButtons());
        }
    };

    /**
     * Move buttons to current active, empty paragraph and show them
     *
     * @return {void}
     */

    Core.prototype.toggleButtons = function (e) {
        var $el = $(e.target),
            selection = window.getSelection(),
            that = this,
            range, $current, $p, activeAddon;

        if (!selection || selection.rangeCount === 0) {
            $current = $el;
        } else {
            range = selection.getRangeAt(0);
            $current = $(range.commonAncestorContainer);
        }

        $p = $current.is('p') ? $current : $current.closest('p');

        this.clean();

        if ($el.hasClass('medium-editor-placeholder') === false && $el.closest('.medium-insert-buttons').length === 0 && $current.closest('.medium-insert-buttons').length === 0) {

            this.$el.find('.medium-insert-active').removeClass('medium-insert-active');

            $.each(this.options.addons, function (addon) {
                if ($el.closest('.medium-insert-'+ addon).length) {
                    $current = $el;
                }
                
                if ($current.closest('.medium-insert-'+ addon).length) {
                    $p = $current.closest('.medium-insert-'+ addon);
                    activeAddon = addon;
                    return;
                }
            });

            if ($p.length && (($p.text().trim() === '' && !activeAddon) || activeAddon === 'images')) {
                $p.addClass('medium-insert-active');

                // If buttons are displayed on addon paragraph, wait 100ms for possible captions to display
                setTimeout(function () {
                    that.positionButtons(activeAddon);
                    that.showButtons(activeAddon);
                }, activeAddon ? 100 : 0);
            } else {
                this.hideButtons();
            }
        }
    };

    /**
     * Show buttons
     *
     * @param {string} activeAddon - Name of active addon
     * @returns {void}
     */

    Core.prototype.showButtons = function (activeAddon) {
        var $buttons = this.$el.find('.medium-insert-buttons');

        $buttons.show();
        $buttons.find('li').show();

        if (activeAddon) {
            $buttons.find('li').hide();
            $buttons.find('a[data-addon="'+ activeAddon +'"]').parent().show();   
        }
    };

    /**
     * Hides buttons
     *
     * @param {jQuery} $el - Editor element
     * @returns {void}
     */

    Core.prototype.hideButtons = function ($el) {
        $el = $el || this.$el;

        $el.find('.medium-insert-buttons').hide();
        $el.find('.medium-insert-buttons-addons').hide();
    };

    /**
     * Position buttons
     *
     * @param {string} activeAddon - Name of active addon
     * @return {void}
     */

    Core.prototype.positionButtons = function (activeAddon) {
        var $buttons = this.$el.find('.medium-insert-buttons'),
            $p = this.$el.find('.medium-insert-active'),
            $last = $p.find('figure:last').length ? $p.find('figure:last') : $p,
            $first = $p.find('figure:first').length ? $p.find('figure:first') : $p,
            left, top, $caption;

        if ($p.length) {

            left = $p.position().left - parseInt($buttons.find('.medium-insert-buttons-addons').css('left'), 10) - parseInt($buttons.find('.medium-insert-buttons-addons a:first').css('margin-left'), 10);
            left = left < 0 ? $p.position().left : left;

            if (activeAddon) {
                if ($p.position().left !== $first.position().left) {
                    left = $first.position().left;
                }

                top = $last.position().top + $last.height() + parseInt($p.css('margin-bottom'), 10) - 5; // 5px - adjustment

                $caption = $last.find('figcaption');
                if ($caption.length) {
                    top -= $caption.height() + parseInt($caption.css('margin-top'), 10);
                }
            } else {
                top = $p.position().top + parseInt($p.css('margin-top'), 10);
            }

            $buttons.css({
                left: left,
                top: top
            });
        }
    };

    /**
     * Toggles addons buttons
     *
     * @return {void}
     */

    Core.prototype.toggleAddons = function () {
        this.$el.find('.medium-insert-buttons-addons').toggle();
    };

    /**
     * Hide addons buttons
     *
     * @return {void}
     */

    Core.prototype.hideAddons = function () {
        this.$el.find('.medium-insert-buttons-addons').hide();
    };

    /**
     * Call addon's action
     *
     * @param {Event} e
     * @return {void}
     */

    Core.prototype.addonAction = function (e) {
        var $a = $(e.target).is('a') ? $(e.target) : $(e.target).closest('a'),
            addon = $a.data('addon'),
            action = $a.data('action');

        this.$el.data('plugin_'+ pluginName + ucfirst(addon))[action]();
    };

    /**
     * Move caret at the beginning of the empty paragraph
     *
     * @param {jQuery} $el Element where to place the caret
     * @param {integer} position Position where to move caret. Default: 0
     *
     * @return {void}
     */

    Core.prototype.moveCaret = function ($el, position) {
        var range, sel, el;

        position = position || 0;
        range = document.createRange();
        sel = window.getSelection();
        el = $el.get(0);

        if (!el.childNodes.length) {
            var textEl = document.createTextNode(' ');
            el.appendChild(textEl);
        }

        range.setStart(el.childNodes[0], position);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    };

    /**
     * Add caption
     *
     * @param {jQuery Element} $el
     * @param {string} placeholder
     * @return {void}
     */

    Core.prototype.addCaption = function ($el, placeholder) {
        var $caption = $el.find('figcaption');

        if ($caption.length === 0) {
            $el.append(this.templates['src/js/templates/core-caption.hbs']({
                placeholder: placeholder
            }));
        }
    };

    /**
     * Remove captions
     *
     * @param {jQuery Element} $ignore
     * @return {void}
     */

    Core.prototype.removeCaptions = function ($ignore) {
        var $captions = this.$el.find('figcaption');

        if ($ignore) {
            $captions = $captions.not($ignore);
        }

        $captions.each(function () {
            if ($(this).find('.medium-insert-caption-placeholder').length || $(this).text().trim() === '') {
                $(this).remove();
            }
        });
    };

    /**
     * Remove caption placeholder
     *
     * @param {jQuery Element} $el
     * @return {void}
     */

    Core.prototype.removeCaptionPlaceholder = function ($el) {
        $el.find('.medium-insert-caption-placeholder').remove();
    };

    /** Plugin initialization */

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                // Plugin initialization
                $.data(this, 'plugin_' + pluginName, new Core(this, options));
                $.data(this, 'plugin_' + pluginName).init();
            } else if (typeof options === 'string' && $.data(this, 'plugin_' + pluginName)[options]) {
                // Method call
                $.data(this, 'plugin_' + pluginName)[options]();
            }
        });
    };

})(jQuery, window, document);

;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Embeds', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-youtube-play"></span>',
            placeholder: 'Paste a YouTube, Vimeo, Facebook, Twitter or Instagram link and press Enter',
            oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1',
            styles: {
                wide: {
                    label: '<span class="fa fa-align-justify"></span>'
                },
                left: {
                    label: '<span class="fa fa-align-left"></span>'
                },
                right: {
                    label: '<span class="fa fa-align-right"></span>'
                }
            },
            captionPlaceholder: 'Type caption (optional)',
            actions: {
                remove: {
                    label: '<span class="fa fa-times"></span>',
                    clicked: function () {
                        var $event = $.Event('keydown');
                        
                        $event.which = 8;
                        $(document).trigger($event);   
                    }
                }
            }
        };

    /**
     * Embeds object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Embeds (el, options) {
        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;
        this.core = this.$el.data('plugin_'+ pluginName);

        this.options = $.extend(true, {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Embeds.prototype.init = function () {
        this.events();
        this.backwardsCompatibility();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Embeds.prototype.events = function () {
        $(document)
            .on('click', $.proxy(this, 'unselectEmbed'))
            .on('keydown', $.proxy(this, 'removeEmbed'))
            .on('click', '.medium-insert-embeds-toolbar .medium-editor-action', $.proxy(this, 'toolbarAction'))
            .on('click', '.medium-insert-embeds-toolbar2 .medium-editor-action', $.proxy(this, 'toolbar2Action'));

        this.$el
            .on('selectstart mousedown', '.medium-insert-embeds-placeholder', $.proxy(this, 'disablePlaceholderSelection'))
            .on('keyup click', $.proxy(this, 'togglePlaceholder'))
            .on('keydown', $.proxy(this, 'processLink'))
            .on('click', '.medium-insert-embeds-overlay', $.proxy(this, 'selectEmbed'));
    };

    /**
     * Replace v0.* class names with new ones, wrap embedded content to new structure
     *
     * @return {void}
     */

    Embeds.prototype.backwardsCompatibility = function () {
        var that = this;

        this.$el.find('.mediumInsert-embeds')
            .removeClass('mediumInsert-embeds')
            .addClass('medium-insert-embeds');

        this.$el.find('.medium-insert-embeds').each(function () {
            if ($(this).find('.medium-insert-embed').length === 0) {
                $(this).after(that.templates['src/js/templates/embeds-wrapper.hbs']({
                    html: $(this).html()
                }));    
                $(this).remove(); 
            }
        });
    };

    /**
     * Get the Core object
     *
     * @return {object} Core object
     */
    Embeds.prototype.getCore = function () {
        return this.core;
    };

    /**
     * Add embedded element
     *
     * @return {void}
     */

    Embeds.prototype.add = function () {
        var $place = this.$el.find('.medium-insert-active');

        // Fix #132
        // Make sure that the content of the paragraph is empty and <br> is wrapped in <p></p> to avoid Firefox problems
        $place.html(this.templates['src/js/templates/core-empty-line.hbs']().trim());

        // Replace paragraph with div to prevent #124 issue with pasting in Chrome,
        // because medium editor wraps inserted content into paragraph and paragraphs can't be nested
        if ($place.is('p')) {
            $place.replaceWith('<div class="medium-insert-active">'+ $place.html() +'</div>');
            $place = this.$el.find('.medium-insert-active');
            this.getCore().moveCaret($place);
        }

        $place.addClass('medium-insert-embeds medium-insert-embeds-input medium-insert-embeds-active');

        this.togglePlaceholder({ target: $place.get(0) });

        $place.click();
        this.getCore().hideButtons();
    };

    /**
     * Disable placeholder selection, instead move cursor to input
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.disablePlaceholderSelection = function (e) {
        var $place = $(e.target).closest('.medium-insert-embeds-input');

        e.preventDefault();
        e.stopPropagation();

        this.getCore().moveCaret($place);
    };

    /**
     * Toggles placeholder
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.togglePlaceholder = function (e) {
        var $place = $(e.target),
            selection = window.getSelection(),
            range, $current, $placeholder, re, text;

        if (!selection || selection.rangeCount === 0) {
            return;
        }

        range = selection.getRangeAt(0);
        $current = $(range.commonAncestorContainer);

        if ($current.hasClass('medium-insert-embeds-active')) {
            $place = $current;
        } else if ($current.closest('.medium-insert-embeds-active').length) {
            $place = $current.closest('.medium-insert-embeds-active');
        }

        if ($place.hasClass('medium-insert-embeds-active')) {

            $placeholder = $place.find('.medium-insert-embeds-placeholder');
            re = new RegExp(this.options.placeholder, 'g');
            text = $place.text().replace(re, '').trim();

            if (text === '' && $placeholder.length === 0) {
                $place.append(this.templates['src/js/templates/embeds-placeholder.hbs']({
                    placeholder: this.options.placeholder
                }));
            } else if (text !== '' && $placeholder.length) {
                $placeholder.remove();
            }

        } else {
            this.$el.find('.medium-insert-embeds-active').remove();
        }
    };

    /**
     * Process link
     *
     * @param {Event} e
     * @return {void}
     */

    Embeds.prototype.processLink = function (e) {
        var $place = this.$el.find('.medium-insert-embeds-active'),
            re, url;

        if (!$place.length) {
            return;
        }

        re = new RegExp(this.options.placeholder, 'g');
        url = $place.text().replace(re, '').trim();

        // Return empty placeholder on backspace, delete or enter
        if (url === '' && [8, 46, 13].indexOf(e.which) !== -1) {
            $place.remove();
            return;
        }

        if (e.which === 13) {
            e.preventDefault();
            e.stopPropagation();

            if (this.options.oembedProxy) {
                this.oembed(url);
            } else {
                this.parseUrl(url);
            }
        }
    };

    /**
     * Get HTML via oEmbed proxy
     *
     * @param {string} url
     * @return {void}
     */

    Embeds.prototype.oembed = function (url) {
        var that = this;

        $.support.cors = true;

        $.ajax({
            crossDomain: true,
            cache: false,
            url: this.options.oembedProxy,
            dataType: 'json',
            data: {
                url: url
            },
            success: function(data) {
                var html = data && data.html;

                if (data && !data.html && data.type === 'photo' && data.url) {
                    html = '<img src="' + data.url + '" alt="">';
                }

                $.proxy(that, 'embed', html)();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                var responseJSON = (function() {
                    try {
                        return JSON.parse(jqXHR.responseText);
                    } catch(e) {}
                })();

                if (typeof window.console !== 'undefined') {
                    window.console.log((responseJSON && responseJSON.error) || jqXHR.status || errorThrown.message);
                } else {
                    window.alert('Error requesting media from ' + that.options.oembedProxy + ' to insert: ' + errorThrown + ' (response status: ' + jqXHR.status + ')');
                }

                $.proxy(that, 'convertBadEmbed', url)();
            }
        });
    };

    /**
     * Get HTML using regexp
     *
     * @param {string} url
     * @return {void}
     */

    Embeds.prototype.parseUrl = function (url) {
        var html;

        if (!(new RegExp(['youtube', 'youtu.be', 'vimeo', 'instagram'].join('|')).test(url))) {
            $.proxy(this, 'convertBadEmbed', url)();
            return false;
        }

        html = url.replace(/\n?/g, '')
            .replace(/^((http(s)?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=|v\/)?)([a-zA-Z0-9\-_]+)(.*)?$/, '<div class="video"><iframe width="420" height="315" src="//www.youtube.com/embed/$7" frameborder="0" allowfullscreen></iframe></div>')
            .replace(/^http:\/\/vimeo\.com(\/.+)?\/([0-9]+)$/, '<iframe src="//player.vimeo.com/video/$2" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
            //.replace(/^https:\/\/twitter\.com\/(\w+)\/status\/(\d+)\/?$/, '<blockquote class="twitter-tweet" align="center" lang="en"><a href="https://twitter.com/$1/statuses/$2"></a></blockquote><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>')
            //.replace(/^https:\/\/www\.facebook\.com\/(video.php|photo.php)\?v=(\d+).+$/, '<div class="fb-post" data-href="https://www.facebook.com/photo.php?v=$2"><div class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/photo.php?v=$2">Post</a></div></div>')
            .replace(/^http:\/\/instagram\.com\/p\/(.+)\/?$/, '<span class="instagram"><iframe src="//instagram.com/p/$1/embed/" width="612" height="710" frameborder="0" scrolling="no" allowtransparency="true"></iframe></span>');


        this.embed((/<("[^"]*"|'[^']*'|[^'">])*>/).test(html) ? html : false);
    };

    /**
     * Add html to page
     *
     * @param {string} html
     * @return {void}
     */

    Embeds.prototype.embed = function (html) {
        var $place = this.$el.find('.medium-insert-embeds-active');

        if (!html) {
            alert('Incorrect URL format specified');
            return false;
        } else {
            $place.after(this.templates['src/js/templates/embeds-wrapper.hbs']({
                html: html
            }));
            $place.remove();

            this.$el.trigger('input');

            if (html.indexOf('facebook') !== -1) {
                if (typeof(FB) !== 'undefined') {
                    setTimeout(function () {
                        FB.XFBML.parse();
                    }, 2000);
                }
            }
        }
    };

    /**
     * Convert bad oEmbed content to an actual line.
     * Instead of displaying the error message we convert the bad embed
     *
     * @param {string} content Bad content
     *
     * @return {void}
     */
    Embeds.prototype.convertBadEmbed = function (content) {
        var $place, $empty, $content,
            emptyTemplate = this.templates['src/js/templates/core-empty-line.hbs']().trim();

        $place = this.$el.find('.medium-insert-embeds-active');

        // convert embed node to an empty node and insert the bad embed inside
        $content = $(emptyTemplate);
        $place.before($content);
        $place.remove();
        $content.html(content);

        // add an new empty node right after to simulate Enter press
        $empty = $(emptyTemplate);
        $content.after($empty);

        this.$el.trigger('input');

        this.getCore().moveCaret($place);
    };

    /**
     * Select clicked embed
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.selectEmbed = function (e) {
        var $embed = $(e.target).hasClass('medium-insert-embeds') ? $(e.target) : $(e.target).closest('.medium-insert-embeds'),
            that = this;

        $embed.addClass('medium-insert-embeds-selected');

        setTimeout(function () {
            that.addToolbar();
            that.getCore().addCaption($embed.find('figure'), that.options.captionPlaceholder);
        }, 50);
    };

    /**
     * Unselect selected embed
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.unselectEmbed = function (e) {
        var $el = $(e.target).hasClass('medium-insert-embeds') ? $(e.target) : $(e.target).closest('.medium-insert-embeds'),
            $embed = this.$el.find('.medium-insert-embeds-selected');

        if ($el.hasClass('medium-insert-embeds-selected')) {
            $embed.not($el).removeClass('medium-insert-embeds-selected');
            $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();
            this.getCore().removeCaptions($el.find('figcaption'));

            if ($(e.target).is('.medium-insert-caption-placeholder') || $(e.target).is('figcaption')) {
                $el.removeClass('medium-insert-embeds-selected');
                this.getCore().removeCaptionPlaceholder($el.find('figure'));
            }
            return;
        }

        $embed.removeClass('medium-insert-embeds-selected');
        $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();

        if ($(e.target).is('.medium-insert-caption-placeholder')) {
            this.getCore().removeCaptionPlaceholder($el.find('figure'));
        } else if ($el.is('figcaption') === false) {
            this.getCore().removeCaptions();
        }
    };

    /**
     * Remove embed
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.removeEmbed = function (e) {
        var $embed, $empty;

        if (e.which === 8 || e.which === 46) {
            $embed = this.$el.find('.medium-insert-embeds-selected');

            if ($embed.length) {
                e.preventDefault();

                $('.medium-insert-embeds-toolbar, .medium-insert-embeds-toolbar2').remove();

                $empty = $(this.templates['src/js/templates/core-empty-line.hbs']().trim());
                $embed.before($empty);
                $embed.remove();

                // Hide addons
                this.getCore().hideAddons();

                this.getCore().moveCaret($empty);
                this.$el.trigger('input');
            }
        }
    };

    /**
     * Adds embed toolbar to editor
     *
     * @returns {void}
     */

    Embeds.prototype.addToolbar = function () {
        var $embed = this.$el.find('.medium-insert-embeds-selected'),
            active = false,
            $toolbar, $toolbar2, top;

        if ($embed.length === 0) {
            return;
        }

        $('body').append(this.templates['src/js/templates/embeds-toolbar.hbs']({
            styles: this.options.styles,
            actions: this.options.actions
        }).trim());

        $toolbar = $('.medium-insert-embeds-toolbar');
        $toolbar2 = $('.medium-insert-embeds-toolbar2');

        top = $embed.offset().top - $toolbar.height() - 8 - 2 - 5; // 8px - hight of an arrow under toolbar, 2px - height of an embed outset, 5px - distance from an embed
        if (top < 0) {
            top = 0;
        }

        $toolbar
            .css({
                top: top,
                left: $embed.offset().left + $embed.width() / 2 - $toolbar.width() / 2
            })
            .show();

        $toolbar2
            .css({
                top: $embed.offset().top + 2, // 2px - distance from a border
                left: $embed.offset().left + $embed.width() - $toolbar2.width() - 4 // 4px - distance from a border
            })
            .show();

        $toolbar.find('button').each(function () {
            if ($embed.hasClass('medium-insert-embeds-'+ $(this).data('action'))) {
                $(this).addClass('medium-editor-button-active');
                active = true;
            }
        });

        if (active === false) {
            $toolbar.find('button').first().addClass('medium-editor-button-active');
        }
    };

    /**
     * Fires toolbar action
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.toolbarAction = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            $li = $button.closest('li'),
            $ul = $li.closest('ul'),
            $lis = $ul.find('li'),
            $embed = this.$el.find('.medium-insert-embeds-selected'),
            that = this;

        $button.addClass('medium-editor-button-active');
        $li.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');

        $lis.find('button').each(function () {
            var className = 'medium-insert-embeds-'+ $(this).data('action');

            if ($(this).hasClass('medium-editor-button-active')) {
                $embed.addClass(className);

                if (that.options.styles[$(this).data('action')].added) {
                    that.options.styles[$(this).data('action')].added($embed);
                }
            } else {
                $embed.removeClass(className);

                if (that.options.styles[$(this).data('action')].removed) {
                    that.options.styles[$(this).data('action')].removed($embed);
                }
            }
        });

        this.$el.trigger('input');
    };

    /**
     * Fires toolbar2 action
     *
     * @param {Event} e
     * @returns {void}
     */

    Embeds.prototype.toolbar2Action = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            callback = this.options.actions[$button.data('action')].clicked;

        if (callback) {
            callback(this.$el.find('.medium-insert-embeds-selected'));
        }

        this.$el.trigger('input');
    };

    /** Plugin initialization */

    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Embeds(this, options));
            }
        });
    };

})(jQuery, window, document);

;(function ($, window, document, undefined) {

    'use strict';

    /** Default values */
    var pluginName = 'mediumInsert',
        addonName = 'Images', // first char is uppercase
        defaults = {
            label: '<span class="fa fa-camera"></span>',
            uploadScript: 'upload.php',
            deleteScript: 'delete.php',
            preview: true,
            captionPlaceholder: 'Type caption for image (optional)',
            autoGrid: 3,
            styles: {
                wide: {
                    label: '<span class="fa fa-align-justify"></span>'
                },
                left: {
                    label: '<span class="fa fa-align-left"></span>'
                },
                right: {
                    label: '<span class="fa fa-align-right"></span>'
                },
                grid: {
                    label: '<span class="fa fa-th"></span>'
                }
            },
            actions: {
                remove: {
                    label: '<span class="fa fa-times"></span>',
                    clicked: function () {
                        var $event = $.Event('keydown');
                        
                        $event.which = 8;
                        $(document).trigger($event);   
                    }
                }
            },
            sorting: function () {
                var that = this;

                $('.medium-insert-images').sortable({
                    group: 'medium-insert-images',
                    containerSelector: '.medium-insert-images',
                    itemSelector: 'figure',
                    placeholder: '<figure class="placeholder">',
                    handle: 'img',
                    nested: false,
                    vertical: false,
                    afterMove: function () {
                        that.$el.trigger('input');
                    }
                });
            }
        };

    /**
     * Images object
     *
     * Sets options, variables and calls init() function
     *
     * @constructor
     * @param {DOM} el - DOM element to init the plugin on
     * @param {object} options - Options to override defaults
     * @return {void}
     */

    function Images (el, options) {
        this.el = el;
        this.$el = $(el);
        this.templates = window.MediumInsert.Templates;
        this.core = this.$el.data('plugin_'+ pluginName);

        this.options = $.extend(true, {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        // Allow image preview only in browsers, that support's that
        if (this.options.preview && !window.FileReader) {
            this.options.preview = false;
        }

        this.init();
    }

    /**
     * Initialization
     *
     * @return {void}
     */

    Images.prototype.init = function () {
        this.events();
        this.backwardsCompatibility();
        this.sorting();
    };

    /**
     * Event listeners
     *
     * @return {void}
     */

    Images.prototype.events = function () {
        $(document)
            .on('click', $.proxy(this, 'unselectImage'))
            .on('keydown', $.proxy(this, 'removeImage'))
            .on('click', '.medium-insert-images-toolbar .medium-editor-action', $.proxy(this, 'toolbarAction'))
            .on('click', '.medium-insert-images-toolbar2 .medium-editor-action', $.proxy(this, 'toolbar2Action'));

        this.$el
            .on('click', '.medium-insert-images img', $.proxy(this, 'selectImage'));
    };

    /**
     * Replace v0.* class names with new ones
     *
     * @return {void}
     */

    Images.prototype.backwardsCompatibility = function () {
        this.$el.find('.mediumInsert')
            .removeClass('mediumInsert')
            .addClass('medium-insert-images');

        this.$el.find('.medium-insert-images.small')
            .removeClass('small')
            .addClass('medium-insert-images-left');
    };

    /**
     * Get the Core object
     *
     * @return {object} Core object
     */
    Images.prototype.getCore = function () {
        return this.core;
    };

    /**
     * Add image
     *
     * @return {void}
     */

    Images.prototype.add = function () {
        var that = this,
            $file = $(this.templates['src/js/templates/images-fileupload.hbs']());

        var fileUploadOptions = {
            url: this.options.uploadScript,
            dataType: 'json',
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            add: function (e, data) {
                $.proxy(that, 'uploadAdd', e, data)();
            },
            done: function (e, data) {
                $.proxy(that, 'uploadDone', e, data)();
            }
        };

        // Only add progress callbacks for browsers that support XHR2,
        // and test for XHR2 per:
        // http://stackoverflow.com/questions/6767887/
        // what-is-the-best-way-to-check-for-xhr2-file-upload-support
        if (new XMLHttpRequest().upload) {
            fileUploadOptions.progress = function (e, data) {
                $.proxy(that, 'uploadProgress', e, data)();
            };

            fileUploadOptions.progressall = function (e, data) {
                $.proxy(that, 'uploadProgressall', e, data)();
            };
        }

        $file.fileupload(fileUploadOptions);

        $file.click();
    };

    /**
     * Callback invoked as soon as files are added to the fileupload widget - via file input selection, drag & drop or add API call.
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#add
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */

    Images.prototype.uploadAdd = function (e, data) {
        var $place = this.$el.find('.medium-insert-active'),
            that = this,
            reader;

        this.getCore().hideButtons();

        // Replace paragraph with div, because figure elements can't be inside paragraph
        if ($place.is('p')) {
            $place.replaceWith('<div class="medium-insert-active">'+ $place.html() +'</div>');
            $place = this.$el.find('.medium-insert-active');
            this.getCore().moveCaret($place);
        }

        $place.addClass('medium-insert-images');

        if (this.options.preview === false && $place.find('progress').length === 0 && (new XMLHttpRequest().upload)) {
            $place.append(this.templates['src/js/templates/images-progressbar.hbs']());
        }

        if (data.autoUpload || (data.autoUpload !== false && $(e.target).fileupload('option', 'autoUpload'))) {
            data.process().done(function () {
                // If preview is set to true, let the showImage handle the upload start
                if (that.options.preview) {
                    reader = new FileReader();

                    reader.onload = function (e) {
                        $.proxy(that, 'showImage', e.target.result, data)();
                    };

                    reader.readAsDataURL(data.files[0]);
                } else {
                    data.submit();
                }
            });
        }
    };

    /**
     * Callback for global upload progress events
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#progressall
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */

    Images.prototype.uploadProgressall = function (e, data) {
        var progress, $progressbar;

        if (this.options.preview === false) {
            progress = parseInt(data.loaded / data.total * 100, 10);
            $progressbar = this.$el.find('.medium-insert-active').find('progress');

            $progressbar
                .attr('value', progress)
                .text(progress);

            if (progress === 100) {
                $progressbar.remove();
            }
        }
    };

    /**
     * Callback for upload progress events.
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#progress
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */

    Images.prototype.uploadProgress = function (e, data) {
        var progress, $progressbar;

        if (this.options.preview) {
            progress = 100 - parseInt(data.loaded / data.total * 100, 10);
            $progressbar = data.context.find('.medium-insert-images-progress');

            $progressbar.css('width', progress +'%');

            if (progress === 0) {
                $progressbar.remove();
            }
        }
    };

    /**
     * Callback for successful upload requests.
     * https://github.com/blueimp/jQuery-File-Upload/wiki/Options#done
     *
     * @param {Event} e
     * @param {object} data
     * @return {void}
     */

    Images.prototype.uploadDone = function (e, data) {
        $.proxy(this, 'showImage', data.result.files[0].url, data)();

        this.getCore().clean();
        this.$el.trigger('input');

        this.sorting();
    };

    /**
     * Add uploaded / preview image to DOM
     *
     * @param {string} img
     * @returns {void}
     */

    Images.prototype.showImage = function (img, data) {
        var $place, domImage;

        // If preview is allowed and preview image already exists,
        // replace it with uploaded image
        if (this.options.preview && data.context) {
            domImage = this.getDOMImage();
            domImage.onload = function () {
                data.context.find('img').attr('src', domImage.src);
            };
            domImage.src = img;
        } else {
            $place = this.$el.find('.medium-insert-active');

            data.context = $(this.templates['src/js/templates/images-image.hbs']({
                img: img,
                progress: this.options.preview
            })).appendTo($place);

            $place.find('br').remove();

            if (this.options.autoGrid && $place.find('figure').length >= this.options.autoGrid) {
                $place.addClass('medium-insert-images-grid');

                if (this.options.styles.grid.added) {
                    this.options.styles.grid.added($place);
                }
            }

            if (this.options.preview) {
                data.submit();
            }
        }
    };

    Images.prototype.getDOMImage = function () {
        return new window.Image();
    };

    /**
     * Select clicked image
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.selectImage = function (e) {
        var $image = $(e.target),
            that = this;

        // Hide keyboard on mobile devices
        this.$el.blur();

        $image.addClass('medium-insert-image-active');
        $image.closest('.medium-insert-images').addClass('medium-insert-active');

        setTimeout(function () {
            that.addToolbar();
            that.getCore().addCaption($image.closest('figure'), that.options.captionPlaceholder);
        }, 50);
    };

    /**
     * Unselect selected image
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.unselectImage = function (e) {
        var $el = $(e.target),
            $image = this.$el.find('.medium-insert-image-active');

        if ($el.is('img') && $el.hasClass('medium-insert-image-active')) {
            $image.not($el).removeClass('medium-insert-image-active');
            $('.medium-insert-images-toolbar, .medium-insert-images-toolbar2').remove();
            this.getCore().removeCaptions($el);
            return;
        }

        $image.removeClass('medium-insert-image-active');
        $('.medium-insert-images-toolbar, .medium-insert-images-toolbar2').remove();

        if ($el.is('.medium-insert-caption-placeholder')) {
            this.getCore().removeCaptionPlaceholder($image.closest('figure'));
        } else if ($el.is('figcaption') === false) {
            this.getCore().removeCaptions();
        }
    };

    /**
     * Remove image
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.removeImage = function (e) {
        var $image, $parent, $empty;

        if (e.which === 8 || e.which === 46) {
            $image = this.$el.find('.medium-insert-image-active');

            if ($image.length) {
                e.preventDefault();

                this.deleteFile($image.attr('src'));

                $parent = $image.closest('.medium-insert-images');
                $image.closest('figure').remove();

                if (this.options.autoGrid && $parent.find('figure').length < this.options.autoGrid) {
                    $parent.removeClass('medium-insert-images-grid');

                    if (this.options.styles.grid.removed) {
                        this.options.styles.grid.removed($parent);
                    }
                }

                $('.medium-insert-images-toolbar, .medium-insert-images-toolbar2').remove();

                if ($parent.find('figure').length === 0) {
                    $empty = $(this.templates['src/js/templates/core-empty-line.hbs']().trim());
                    $parent.before($empty);
                    $parent.remove();

                    // Hide addons
                    this.getCore().hideAddons();

                    this.getCore().moveCaret($empty);
                }

                this.$el.trigger('input');
            }
        }
    };

    /**
     * Makes ajax call to deleteScript
     *
     * @param {String} file File name
     * @returns {void}
     */

    Images.prototype.deleteFile = function (file) {
        if (this.options.deleteScript) {
            $.post(this.options.deleteScript, { file: file });
        }
    };

    /**
     * Adds image toolbar to editor
     *
     * @returns {void}
     */

    Images.prototype.addToolbar = function () {
        var $image = this.$el.find('.medium-insert-image-active'),
            $p = $image.closest('.medium-insert-images'),
            active = false,
            $toolbar, $toolbar2, top;

        $('body').append(this.templates['src/js/templates/images-toolbar.hbs']({
            styles: this.options.styles,
            actions: this.options.actions
        }).trim());

        $toolbar = $('.medium-insert-images-toolbar');
        $toolbar2 = $('.medium-insert-images-toolbar2');

        top = $image.offset().top - $toolbar.height() - 8 - 2 - 5; // 8px - hight of an arrow under toolbar, 2px - height of an image outset, 5px - distance from an image
        if (top < 0) {
            top = 0;
        }

        $toolbar
            .css({
                top: top,
                left: $image.offset().left + $image.width() / 2 - $toolbar.width() / 2
            })
            .show();

        $toolbar2
            .css({
                top: $image.offset().top + 2, // 2px - distance from a border
                left: $image.offset().left + $image.width() - $toolbar2.width() - 4 // 4px - distance from a border
            })
            .show();

        $toolbar.find('button').each(function () {
            if ($p.hasClass('medium-insert-images-'+ $(this).data('action'))) {
                $(this).addClass('medium-editor-button-active');
                active = true;
            }
        });

        if (active === false) {
            $toolbar.find('button').first().addClass('medium-editor-button-active');
        }
    };

    /**
     * Fires toolbar action
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.toolbarAction = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            $li = $button.closest('li'),
            $ul = $li.closest('ul'),
            $lis = $ul.find('li'),
            $p = this.$el.find('.medium-insert-active'),
            that = this;

        $button.addClass('medium-editor-button-active');
        $li.siblings().find('.medium-editor-button-active').removeClass('medium-editor-button-active');

        $lis.find('button').each(function () {
            var className = 'medium-insert-images-'+ $(this).data('action');

            if ($(this).hasClass('medium-editor-button-active')) {
                $p.addClass(className);

                if (that.options.styles[$(this).data('action')].added) {
                    that.options.styles[$(this).data('action')].added($p);
                }
            } else {
                $p.removeClass(className);

                if (that.options.styles[$(this).data('action')].removed) {
                    that.options.styles[$(this).data('action')].removed($p);
                }
            }
        });

        this.getCore().positionButtons('images');

        this.$el.trigger('input');
    };

    /**
     * Fires toolbar2 action
     *
     * @param {Event} e
     * @returns {void}
     */

    Images.prototype.toolbar2Action = function (e) {
        var $button = $(e.target).is('button') ? $(e.target) : $(e.target).closest('button'),
            callback = this.options.actions[$button.data('action')].clicked;

        if (callback) {
            callback(this.$el.find('.medium-insert-image-active'));
        }

        this.$el.trigger('input');
    };

    /**
     * Initialize sorting
     *
     * @returns {void}
     */

    Images.prototype.sorting = function () {
        this.options.sorting();
    };

    /** Plugin initialization */

    $.fn[pluginName + addonName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName + addonName)) {
                $.data(this, 'plugin_' + pluginName + addonName, new Images(this, options));
            }
        });
    };

})(jQuery, window, document);
