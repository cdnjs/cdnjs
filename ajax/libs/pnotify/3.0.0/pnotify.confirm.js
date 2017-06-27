// Confirm
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.confirm', ['jquery', 'pnotify'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('./pnotify'));
    } else {
        // Browser globals
        factory(root.jQuery, root.PNotify);
    }
}(this, function($, PNotify){
    PNotify.prototype.options.confirm = {
        // Make a confirmation box.
        confirm: false,
        // Make a prompt.
        prompt: false,
        // Classes to add to the input element of the prompt.
        prompt_class: "",
        // The default value of the prompt.
        prompt_default: "",
        // Whether the prompt should accept multiple lines of text.
        prompt_multi_line: false,
        // Where to align the buttons. (right, center, left, justify)
        align: "right",
        // The buttons to display, and their callbacks.
        buttons: [
            {
                text: "Ok",
                addClass: "",
                // Whether to trigger this button when the user hits enter in a single line prompt.
                promptTrigger: true,
                click: function(notice, value){
                    notice.remove();
                    notice.get().trigger("pnotify.confirm", [notice, value]);
                }
            },
            {
                text: "Cancel",
                addClass: "",
                click: function(notice){
                    notice.remove();
                    notice.get().trigger("pnotify.cancel", notice);
                }
            }
        ]
    };
    PNotify.prototype.modules.confirm = {
        // The div that contains the buttons.
        container: null,
        // The input element of a prompt.
        prompt: null,

        init: function(notice, options){
            this.container = $('<div class="ui-pnotify-action-bar" style="margin-top:5px;clear:both;" />').css('text-align', options.align).appendTo(notice.container);

            if (options.confirm || options.prompt)
                this.makeDialog(notice, options);
            else
                this.container.hide();
        },

        update: function(notice, options){
            if (options.confirm) {
                this.makeDialog(notice, options);
                this.container.show();
            } else {
                this.container.hide().empty();
            }
        },

        afterOpen: function(notice, options){
            if (options.prompt)
                this.prompt.focus();
        },

        makeDialog: function(notice, options) {
            var already = false, that = this, btn, elem;
            this.container.empty();
            if (options.prompt) {
                this.prompt = $('<'+(options.prompt_multi_line ? 'textarea rows="5"' : 'input type="text"')+' style="margin-bottom:5px;clear:both;" />')
                .addClass((typeof notice.styles.input === "undefined" ? "" : notice.styles.input)+" "+(typeof options.prompt_class === "undefined" ? "" : options.prompt_class))
                .val(options.prompt_default)
                .appendTo(this.container);
            }
            var customButtons = (options.buttons[0] && options.buttons[0] !== PNotify.prototype.options.confirm.buttons[0]);
            for (var i = 0; i < options.buttons.length; i++) {
                if (options.buttons[i] === null || (customButtons && PNotify.prototype.options.confirm.buttons[i] && PNotify.prototype.options.confirm.buttons[i] === options.buttons[i])) {
                    continue;
                }
                btn = options.buttons[i];
                if (already)
                    this.container.append(' ');
                else
                    already = true;
                elem = $('<button type="button" class="ui-pnotify-action-button" />')
                .addClass((typeof notice.styles.btn === "undefined" ? "" : notice.styles.btn)+" "+(typeof btn.addClass === "undefined" ? "" : btn.addClass))
                .text(btn.text)
                .appendTo(this.container)
                .on("click", (function(btn){ return function(){
                    if (typeof btn.click == "function") {
                        btn.click(notice, options.prompt ? that.prompt.val() : null);
                    }
                }})(btn));
                if (options.prompt && !options.prompt_multi_line && btn.promptTrigger)
                    this.prompt.keypress((function(elem){ return function(e){
                        if (e.keyCode == 13)
                            elem.click();
                    }})(elem));
                if (notice.styles.text) {
                    elem.wrapInner('<span class="'+notice.styles.text+'"></span>');
                }
                if (notice.styles.btnhover) {
                    elem.hover((function(elem){ return function(){
                        elem.addClass(notice.styles.btnhover);
                    }})(elem), (function(elem){ return function(){
                        elem.removeClass(notice.styles.btnhover);
                    }})(elem));
                }
                if (notice.styles.btnactive) {
                    elem.on("mousedown", (function(elem){ return function(){
                        elem.addClass(notice.styles.btnactive);
                    }})(elem)).on("mouseup", (function(elem){ return function(){
                        elem.removeClass(notice.styles.btnactive);
                    }})(elem));
                }
                if (notice.styles.btnfocus) {
                    elem.on("focus", (function(elem){ return function(){
                        elem.addClass(notice.styles.btnfocus);
                    }})(elem)).on("blur", (function(elem){ return function(){
                        elem.removeClass(notice.styles.btnfocus);
                    }})(elem));
                }
            }
        }
    };
    $.extend(PNotify.styling.jqueryui, {
        btn: "ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only",
        btnhover: "ui-state-hover",
        btnactive: "ui-state-active",
        btnfocus: "ui-state-focus",
        input: "",
        text: "ui-button-text"
    });
    $.extend(PNotify.styling.bootstrap2, {
        btn: "btn",
        input: ""
    });
    $.extend(PNotify.styling.bootstrap3, {
        btn: "btn btn-default",
        input: "form-control"
    });
    $.extend(PNotify.styling.fontawesome, {
        btn: "btn btn-default",
        input: "form-control"
    });
}));
