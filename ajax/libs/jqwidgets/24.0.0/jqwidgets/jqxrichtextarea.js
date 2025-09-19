/* tslint:disable */
/* eslint-disable */
(function(){
	if (typeof document === 'undefined') { 
		return;
	}

(function ($) {
    $.jqx.jqxWidget("jqxRichTextArea", "", {});
    $.extend($.jqx._jqxRichTextArea.prototype, {
        defineInstance: function () {
            var settings = {
                width: null,
                height: null,
                disabled: false,
                pasteMode: "html",
                editable: true,
                lineBreak: "default",
                changeType: null,
                toolbarPosition: "top",
                fontFamily: "sans-serif",
                commands:
                {
                    "bold": { tooltip: "Bold", command: "bold", type: 'toggleButton' },
                    "italic": { tooltip: "Italic", command: "italic", type: 'toggleButton' },
                    "underline": { tooltip: "Underline", command: "underline", type: 'toggleButton' },
                    "format": {
                        placeHolder: "Format Block", tooltip: "Format Block", command: "formatblock",
                        value: [
                            { value: 'p', label: 'Paragraph' },
                            { value: 'h1', label: 'Header 1' },
                            { value: 'h2', label: 'Header 2' },
                            { value: 'h3', label: 'Header 3' },
                            { value: 'h4', label: 'Header 4' }
                        ], type: 'list', width: 120, dropDownWidth: 190, height: 25
                    },
                    "font": {
                        placeHolder: "Font", tooltip: "Font Name", command: "fontname",
                        value:
                            [
                                { label: 'Arial', value: 'Arial, Helvetica, sans-serif' },
                                { label: 'Comic Sans MS', value: '"Comic Sans MS", cursive, sans-serif' },
                                { label: 'Courier New', value: '"Courier New", Courier, monospace' },
                                { label: 'Georgia', value: "Georgia,serif" },
                                { label: "Impact", value: "Impact,Charcoal,sans-serif" },
                                { label: "Lucida Console", value: "'Lucida Console',Monaco,monospace" },
                                { label: 'Tahoma', value: 'Tahoma,Geneva,sans-serif' },
                                { label: "Times New Roman", value: "'Times New Roman',Times,serif" },
                                { label: 'Trebuchet MS', value: '"Trebuchet MS",Helvetica,sans-serif' },
                                { label: 'Verdana', value: "Verdana,Geneva,sans-serif" }
                            ],

                        type: 'list', width: 160, height: 25, dropDownWidth: 160
                    },
                    "left": { tooltip: "Align Left", command: "justifyleft", type: 'toggleButton' },
                    "center": { tooltip: "Align Center", command: "justifycenter", type: 'toggleButton' },
                    "right": { tooltip: "Align Right", command: "justifyright", type: 'toggleButton' },
                    "outdent": { tooltip: "Indent Less", command: "outdent", type: 'button' },
                    "indent": { tooltip: "Indent More", command: "indent", type: 'button' },
                    "ul": { tooltip: "Insert unordered list", command: "insertunorderedlist", type: 'toggleButton' },
                    "ol": { tooltip: "Insert ordered list", command: "insertorderedlist", type: 'toggleButton' },
                    "clean": { tooltip: "Remove Formatting", command: "removeformat", type: 'button' }
                },
                createCommand: null,
                defaultLocalization:
                {
                    "bold": "Bold",
                    "italic": "Italic",
                    "underline": "Underline",
                    "format": "Format Block",
                    "font": "Font Name",
                    "size": "Font Size",
                    "color": "Text Color",
                    "background": "Fill Color",
                    "left": "Align Left",
                    "center": "Align Center",
                    "right": "Align Right",
                    "outdent": "Indent Less",
                    "indent": "Indent More",
                    "ul": "Insert unordered list",
                    "ol": "Insert ordered list",
                    "image": "Insert image",
                    "link": "Insert link",
                    "html": "View source",
                    "clean": "Remove Formatting",
                    "Remove": "Remove",
                    "Ok": "Ok",
                    "Cancel": "Cancel",
                    "Change": "Change",
                    "Go to link": "Go to link",
                    "Open in a new window/tab": "Open in a new window/tab",
                    "Align": "Align",
                    "VSpace": "VSpace",
                    "HSpace": "HSpace",
                    "Width": "Width",
                    "Height": "Height",
                    "Title": "Title",
                    "URL": "URL",
                    "Insert Image": "Insert Image",
                    "Insert Link": "Insert Link",
                    "Alt Text": "Alt Text",
                    "not set": "&ltnot set&gt",
                    "Left": "Left",
                    "Right": "Right",
                    "Paragraph": "Paragraph",
                    "Header": "Header",
                    "Arial": "Arial",
                    "Comic Sans MS": "Comic Sans MS",
                    "Courier New": "Courier New",
                    "Georgia": "Georgia",
                    "Impact": "Impact",
                    "Lucida Console": "Lucida Console",
                    "Tahoma": "Tahoma",
                    "Times New Roman": "Times New Roman",
                    "Trebuchet MS": "Trebuchet MS",
                    "Verdana": "Verdana"
                },
                localization: null,
                tools: "bold italic underline | format | left center right | outdent indent | ul ol | clean ",
                readOnly: false,
                stylesheets: new Array(),
                keyPressed: null,
                events: ['change']
            }
            if (this === $.jqx._jqxRichTextArea.prototype) {
                return settings;
            }

            $.extend(true, this, settings);
            this.localization = this.defaultLocalization;
            return settings;
        },

        createInstance: function (args) {
            var that = this;
            that.textArea = that.host;
            var isContentEditable = that.host.attr('contenteditable');
            that.host.addClass(that.toThemeProperty('jqx-widget'));


            var editor = $("<div class='jqx-editor'><div class='jqx-editor-container'><div class='jqx-editor-toolbar-container' aria-label='Formatting options' role='toolbar'><div class='jqx-editor-toolbar'></div></div><div class='jqx-editor-content'><iframe  src='javascript:\"<html></html>\"' allowtransparency='true' frameborder='0'></iframe></div></div></div>");
            that.widget = editor;
            that.widget[0].className = that.widget[0].className + " " + that.element.className;
            try {
                that.widget[0].style = that.element.style;
            }
            catch (error) {
            }

            var content = $.trim(that.host.html()) + "&#8203;";
            if (that.lineBreak == "default" || that.lineBreak == "div") {
                content = "<div>" + content + "</div>";
            }
            else if (that.lineBreak == "p") {
                content = "<p>" + content + "</p>";
            }

            content = content.replace(/&lt;/ig, '<');
            content = content.replace(/&gt;/ig, '>');


            that.host.css('display', 'none');
            that.host.after(editor);
            editor.find('iframe').after(that.host);
            that.container = editor.find('.jqx-editor-container');
            that.toolbarContainer = editor.find('.jqx-editor-toolbar-container');
            that.toolbar = editor.find('.jqx-editor-toolbar');
            that.iframe = editor.find('iframe');
            that.content = editor.find('.jqx-editor-content');

            var initIFrame = function () {
                that.editorDocument = that.iframe[0].contentWindow.document;
                that.selection = new jqxSelection(that.editorDocument);
                var loaded = 0;
                that.addHandler(that.iframe, 'load', function () {
                    loaded++;
                    if (loaded > 1) {
                        that.iframe.off('load');
                        that.content.find("iframe").remove();
                        var iframe = $("<iframe  src='javascript:\"<html></html>\"' allowtransparency='true' frameborder='0'></iframe>").appendTo(that.content);
                        that.iframe = editor.find('iframe');
                        initIFrame();
                    }
                });

                if (!$.jqx.browser.mozilla) {
                    that.editorDocument.designMode = 'On';
                }
                that.editorDocument.open();
                var rtlStyle = that.rtl ? "direction:rtl;" : "";
                var selectionStyle = $.jqx.browser.msie ? "::selection{color: #fff; background: #328EFD;};" +
                    "::-moz-selection{color: #fff; background: #328eD;};" +
                    "::selection:window-inactive {background: #c7c7c7; color: #000;}" +
                    "::-moz-selection:window-inactive {background: #c7c7c7; color: #000;}" +
                    "html{font-size:13px; height:100%;}body{padding-top:1px;margin-top:-1px; padding-right: 1px; overflow-x: hidden;" +
                    "word-wrap: break-word;-webkit-nbsp-mode: space;-webkit-line-break: after-white-space;"
                    : "";
                that.editorDocument.write(
                    "<!DOCTYPE html><html><head>" +
                    "<meta charset='utf-8' />" +
                    "<style>" +
                    "html,body{padding:0; margin:0; font-size: 13px; font-family: " + that.fontFamily + "; background:#fff; min-height:100%; " + rtlStyle + "}" +
                    selectionStyle +
                    "}" +
                    "h1{font-size:2em;margin:.67em 0}" +
                    "h2{font-size: 1.5em; margin: .75em 0}" +
                    "h3{font-size: 1.17em; margin: .83em 0}" +
                    "h4{font-size:1em; margin: 1.12em 0 }" +
                    "h5{font-size: .83em; margin: 1.5em 0}" +
                    "h6{font-size: .75em; margin: 1.67em 0}" +
                    "p{margin: 0px;padding:0 .2em}" +
                    "ul,ol{padding-left:2.5em}" +
                    "a{color:#00a}" +
                    "code{font-size:1.23em}" +
                    ".jqx-editor-paste-element {position: absolute; left: -1000px; height: 1px; overflow: hidden; top: -1000px;}" +
                    ".jqx-editor-focus {border: 1px solid #aaa !important;}" +
                    "</style>" +
                    $.map(that.stylesheets, function (href) {
                        return "<link rel='stylesheet' href='" + href + "'>";
                    }).join("") +
                    "</head><body autocorrect='off' contenteditable='true'></body></html>"
                );
                that.contentEditableElement = that.editorDocument.body;

                that._textArea = that.element;
                var hostData = that.host.data();
                hostData.jqxRichTextArea.host = editor;
                hostData.jqxRichTextArea.element = editor[0];

                that.element = editor[0];
                editor[0].id = that._textArea.id;
                that._textArea.id = that._textArea.id + "TextArea";
                $(that.element).addClass(that.toThemeProperty('jqx-widget'));
                that.host = $(that.element);
                that.host.data(hostData);

                try {
                    that.editorDocument.execCommand("useCSS", false, false);
                    that.editorDocument.execCommand("enableInlineTableEditing", null, false);
                }
                catch (e) {
                }
                try {
                    that.editorDocument.execCommand("styleWithCSS", 0, true);
                }
                catch (e) {
                }

                that.editorDocument.close();
                that.editor = $(that.editorDocument.body);
                that.editor.html(content).attr('spellcheck', false).attr('autocorrect', 'off');
            }
            initIFrame();
        },

        focus: function () {
            var that = this;
            if ($.jqx.browser.mozilla) {
                if (!that.focused) {
                    if (that.iframe) {
                        that.iframe.focus();
                    }
                    that.selection.selectNode(that.editor[0].firstChild, true);
                    that.selection.getRange().collapse(true);
                }
            }
            that.editor.focus();
            var range = that.range != null ? that.range : that.getRange();
            that.selectRange(range);
        },

        refresh: function (initialRefresh) {
            var that = this;
            $.each(this.defaultLocalization, function (index, value) {
                if (!that.localization[index]) {
                    that.localization[index] = value;
                }
            });
            that._removeHandlers();
            that.toolbar.addClass(that.toThemeProperty('jqx-widget-header'));
            if (that.content) {
                that.widget.css('width', that.width);
                that.widget.css('height', that.height);
                that.widget.addClass(that.toThemeProperty("jqx-editor"));
                that.widget.addClass(that.toThemeProperty("jqx-widget"));
                that.widget.addClass(that.toThemeProperty("jqx-rc-all"));
                that.widget.addClass(that.toThemeProperty("jqx-widget-header"));
                that.content.addClass(that.toThemeProperty('jqx-widget-content'));
                that.container.addClass(that.toThemeProperty('jqx-editor-container'));
            }
            else {
                that.toolbarContainer.addClass(that.toThemeProperty('jqx-widget-header'));
                that.toolbarContainer.addClass(that.toThemeProperty("jqx-editor-toolbar-inline"));
                that.toolbarContainer.addClass(that.toThemeProperty("jqx-widget"));
                that.toolbarContainer.addClass(that.toThemeProperty("jqx-rc-all"));
                that.toolbarContainer.hide();
                that.toolbarContainer.css('position', 'absolute');
                that.editor.addClass(that.toThemeProperty("jqx-editor-inline"));
                that.toolbarContainer.css('width', that.host.outerWidth() + 'px');
            }
            var index = that.toolbarContainer.index();


            var toolsValue = that.tools;
            // render toolbar.
            if (toolsValue !== false) {
                var tools = toolsValue.split(" ");
                var toolGroups = toolsValue.split(" | ");

                var addTools = function (ownerElement, tools) {
                    $.each(tools, function (index, value) {
                        var tool = that.commands[this];
                        if (!tool) {
                            if (that.createCommand) {
                                tool = that.createCommand(this.toString());
                                if (!tool) {
                                    return true;
                                }
                                if (!that.commands[this]) {
                                    that.commands[this] = tool;
                                }
                            }
                            else {
                                return true;
                            }
                        }
                        else if (that.createCommand) {
                            var toolExt = that.createCommand(this.toString());
                            tool = $.extend(tool, toolExt);
                        }

                        if (that.localization[this]) {
                            tool.tooltip = that.localization[this];
                        }
                        switch (tool.type) {
                            case 'list':
                                if (tool.widget) {
                                    tool.widget.jqxDropDownList('destroy');
                                }

                                var rendererFunc = function (index, label, value) {
                                    if (tool.command == "formatblock") {
                                        return '<' + value + ' unselectable="on" style="padding: 0px; margin: 0px;">' + label + '</' + value + '>';
                                    }
                                    else if (tool.command == "fontname") {
                                        return '<span unselectable="on" style="font-family: ' + value + ';">' + label + '<span>';
                                    }
                                    else if (tool.command == "fontsize") {
                                        return '<span unselectable="on" style="font-size: ' + value + ';">' + label + '<span>';
                                    }
                                };
                                var selectionRendererFunc = function () {
                                    var iconClass = that.toThemeProperty('jqx-editor-toolbar-icon') + " " + that.toThemeProperty('jqx-editor-toolbar-icon-' + tool.command);
                                    var icon = "<div unselectable='on' style='margin-top: 0px; padding:0px;' class='" + iconClass + "'></div>";
                                    return icon;
                                }

                                var fontRelated = tool.command == "formatblock" || tool.command == "fontname" || tool.command == "fontsize";

                                var dataValue = tool.value || [];
                                var dataSource = new Array();
                                var placeHolder = tool.placeHolder || "Please Choose:";

                                if (tool.command == "fontname") {
                                    $.each(dataValue, function () {
                                        var label = that.localization[this.label];
                                        dataSource.push({ label: label, value: this.value });
                                    });
                                }
                                else if (tool.command == "formatblock") {
                                    placeHolder = that.localization["format"];
                                    $.each(dataValue, function () {
                                        if (this.label.indexOf("Header") >= 0) {
                                            var label = this.label.replace("Header", that.localization["Header"]);
                                        }
                                        else {
                                            var label = that.localization[this.label];
                                        }
                                        dataSource.push({ label: label, value: this.value });
                                    });
                                }
                                else {
                                    dataSource = dataValue;
                                }

                                var settings = {
                                    enableBrowserBoundsDetection: true,
                                    touchMode: that.touchMode,
                                    width: tool.width || 100,
                                    height: tool.height || 25,
                                    dropDownWidth: tool.dropDownWidth || 'auto',
                                    autoDropDownHeight: (tool.value && tool.value.length) < 12 ? true : false,
                                    placeHolder: placeHolder,
                                    source: dataSource,
                                    theme: that.theme,
                                    hint: false,
                                    keyboardSelection: false,
                                    focusable: false,
                                    disabled: that.disabled,
                                    rtl: that.rtl,
                                    selectionRenderer: tool.command == "fontsize" ? selectionRendererFunc : null,
                                    renderer: fontRelated ? rendererFunc : null
                                }
                                var listClass = 'jqx-disableselect ' + that.toThemeProperty('jqx-editor-dropdownlist') + " " + that.toThemeProperty('jqx-editor-toolbar-item');
                                var widget = $("<div unselectable='on' class='" + listClass + "'></div>");
                                widget.appendTo(ownerElement);
                                widget.jqxDropDownList(settings);
                                if (tool.init) {
                                    tool.init(widget);
                                }

                                var value = null;
                                var newValue = null;
                                var closeType = "";
                                that.addHandler(widget, "mousedown", function (event) {
                                    if ($('.jqx-editor-dropdownpicker').length > 0) {
                                        $('.jqx-editor-dropdownpicker').jqxDropDownButton('close');
                                    }
                                    if ($('.jqx-editor-dropdownlist').length > 0) {
                                        var lists = $('.jqx-editor-dropdownlist');
                                        $.each(lists, function (index, value) {
                                            if (value != widget[0]) {
                                                $(value).jqxDropDownList('close');
                                            }
                                        });
                                    }
                                });

                                that.addHandler(widget, "open", function (event) {
                                    if (!that.focused) {
                                        that.focus();
                                    }
                                    that.updating = true;
                                    that.activeElement = widget;
                                    value = widget.val();
                                    closeType = "";
                                });
                                that.addHandler(widget, "change", function (event) {
                                    that.updating = false;
                                    that.activeElement = null;
                                    newValue = widget.val();
                                    closeType = event.args.type;
                                    if ($.jqx.browser.msie && $.jqx.browser.version < 9) {
                                        that.focus();
                                    }
                                });
                                that.addHandler(widget, "close", function (event) {
                                    that.updating = false;
                                    that.activeElement = null;

                                    if (value != newValue) {
                                        if (closeType == "mouse" || closeType == "keyboard") {
                                            that._refreshTools();
                                        }
                                    }
                                });
                                that._addCommandHandler(widget, 'change', tool.command, null, tool);
                                break;
                            case 'colorPicker':
                                if (tool.widget) {
                                    $(tool.colorPicker).remove();
                                    tool.widget.jqxDropDownButton('destroy');
                                }
                                var picker = $('<div unselectable="on" style="padding-top: 4px;"></div>').attr('id', 'picker-' + tool.command);
                                var listClass = 'jqx-disableselect ' + that.toThemeProperty('jqx-editor-dropdownpicker') + " " + that.toThemeProperty('jqx-editor-toolbar-item');
                                var widget = $("<div unselectable='on' class='" + listClass + "'></div>");
                                widget.appendTo(ownerElement);
                                widget.append(picker);
                                widget.jqxDropDownButton({
                                    hint: false,
                                    touchMode: that.touchMode,
                                    disabled: that.disabled,
                                    enableBrowserBoundsDetection: true,
                                    width: tool.width || 45,
                                    height: tool.height || 25,
                                    rtl: that.rtl,
                                    focusable: false,
                                    theme: that.theme
                                });
                                var content = $('<div unselectable="on" style="z-index: 55;">');
                                var iconClass = that.toThemeProperty('jqx-editor-toolbar-icon') + " " + that.toThemeProperty('jqx-editor-toolbar-icon-' + tool.command);
                                var icon = $("<div unselectable='on' class='" + iconClass + "'></div>");
                                content.append(icon);
                                var bar = $('<div unselectable="on" class="jqx-editor-color-bar">').attr('id', 'bar-' + tool.command).css('background-color', tool.value);
                                content.append(bar);
                                widget.jqxDropDownButton('setContent', content);
                                picker.append($(that.colorPickerTemplate));
                                tool.colorPicker = picker;
                                if (tool.init) {
                                    tool.init(widget);
                                }
                                picker.find('tr').attr('role', 'row').attr('unselectable', 'on');
                                picker.find('td').attr('role', 'gridcell').attr('unselectable', 'on').css('-webkit-user-select', 'none');
                                picker.find('div').attr('unselectable', 'on');

                                that.addHandler(widget, "mousedown", function (event) {
                                    if ($('.jqx-editor-dropdownlist').length > 0) {
                                        $('.jqx-editor-dropdownlist').jqxDropDownList('close');
                                    }
                                    if ($('.jqx-editor-dropdownpicker').length > 0) {
                                        var lists = $('.jqx-editor-dropdownpicker');
                                        $.each(lists, function (index, value) {
                                            if (value != widget[0]) {
                                                $(value).jqxDropDownButton('close');
                                            }
                                        });
                                    }
                                });

                                that.addHandler(widget, "open", function () {
                                    if (!that.focused) {
                                        that.focus();
                                    }
                                    that.updating = true;
                                    that.activeElement = picker;
                                });
                                that.addHandler(widget, "close", function (event) {
                                    that.updating = false;
                                    that.activeElement = null;
                                    if (value != newValue) {
                                        if (closeType == "mouse" || closeType == "keyboard") {
                                            that._refreshTools();
                                        }
                                    }
                                });
                                that.addHandler(picker, "keydown", function (event) {
                                    var key = event.keyCode;
                                    var activeColor = $(picker).find('.jqx-editor-color-picker-selected-cell');
                                    var rows = picker.find('tr');
                                    var rowsCount = rows.length;
                                    var columnsCount = activeColor.parent().children().length;
                                    var columnIndex = activeColor.index();
                                    var rowIndex = -999;
                                    var row = activeColor.parent();
                                    $.each(rows, function (index, value) {
                                        if (this == row[0]) {
                                            rowIndex = index;
                                            return false;
                                        }
                                    });

                                    switch (key) {
                                        case 27: // esc
                                            widget.jqxDropDownButton('close');
                                            break;
                                        case 13: // esc
                                            $(activeColor).trigger('mousedown');
                                            break;
                                        case 38: // up
                                            rowIndex--;
                                            break;
                                        case 40: // down
                                            rowIndex++;
                                            break;
                                        case 39: // right
                                            columnIndex++;
                                            break;
                                        case 37: // left
                                            columnIndex--;
                                            break;
                                    }
                                    if (rowIndex >= 0 && rowIndex <= rowsCount) {
                                        if (columnIndex >= 0 && columnIndex <= columnsCount) {
                                            var row = picker.find('tr')[rowIndex];
                                            var cell = $(row).children()[columnIndex];
                                            var color = $(cell).children().css('background-color');
                                            tool.val(color);
                                        }
                                    }

                                });
                                var pickerColors = $(picker).find('td');

                                tool.val = function (color) {
                                    var hexColor = that._rgbToHex(color);
                                    $.each(pickerColors, function () {
                                        var color = $(this).children().css('background-color');
                                        var pickerColor = that._rgbToHex(color);
                                        if (pickerColor == hexColor) {
                                            pickerColors.removeClass('jqx-editor-color-picker-selected-cell');
                                            $(this).addClass('jqx-editor-color-picker-selected-cell');
                                            $('#bar-' + tool.command).css('background', color);
                                            return false;
                                        }
                                    });
                                }
                                tool.val(tool.value);
                                that._addCommandHandler(pickerColors, 'mousedown', tool.command, null, tool);
                                break;
                            case "button":
                            case "toggleButton":
                            default:
                                if (tool.widget) {
                                    if (tool.type == "button") {
                                        tool.widget.jqxButton('destroy');
                                    }
                                    else {
                                        tool.widget.jqxToggleButton('destroy');
                                    }
                                }

                                var command = tool.command;
                                var action = tool.action;
                                var iconClass = that.toThemeProperty('jqx-editor-toolbar-icon') + " " + that.toThemeProperty('jqx-editor-toolbar-icon-' + command);
                                var icon = $("<div unselectable='on' class='" + iconClass + "'></div>");
                                var widget = $("<div unselectable='on'></div>").addClass('jqx-disableselect').addClass(that.toThemeProperty('jqx-editor-toolbar-button'));
                                if (!tool.init) {
                                    widget.append(icon);
                                }
                                else {
                                    if (command) {
                                        widget.append(icon);
                                    }
                                }

                                widget.appendTo(ownerElement);
                                if (tool.type == "button") {
                                    widget.jqxButton({
                                        disabled: that.disabled,
                                        rtl: that.rtl,
                                        theme: that.theme
                                    });
                                }
                                else if (tool.type == "toggleButton") {
                                    widget.jqxToggleButton({
                                        disabled: that.disabled,
                                        rtl: that.rtl,
                                        uiToggle: false,
                                        theme: that.theme
                                    });
                                }

                                if (tool.init) {
                                    tool.init(widget);
                                }

                                tool.toggled = false;
                                tool.toggle = function () {
                                    tool.toggled = !tool.toggled;
                                }

                                that.addHandler(widget, 'mousedown', function (event) {
                                    if (event.preventDefault) {
                                        event.preventDefault();
                                    }
                                    if (event.stopPropagation) {
                                        event.stopPropagation();
                                    }
                                    return false;
                                });
                                if (!$.jqx.mobile.isTouchDevice()) {
                                    that._addCommandHandler(widget, 'click', command, action, tool);
                                }
                                else {
                                    that._addCommandHandler(widget, 'mousedown', command, action, tool);
                                }
                                break;
                        }

                        tool.widget = widget;
                        if (widget) {
                            try {
                                if (tool.tooltip != "") {
                                    tool.widget.attr('title', tool.tooltip);
                                    tool.widget.attr('data-tooltip', tool.tooltip);
                                }

                                if (tool.command) {
                                    tool.widget.attr('data-command', tool.command);
                                }
                                tool.widget.attr('aria-label', tool.tooltip);
                            }
                            catch (error) {

                            }

                            if (tool.type == "button" || tool.type == "toggleButton") {
                                if (tools.length > 2) {
                                    if (index == 0) {
                                        widget.css('border-right-radius', '0px');
                                        widget.addClass(that.toThemeProperty('jqx-rc-l'));
                                    }
                                    else if (index == tools.length - 1) {
                                        widget.css('border-left-radius', '0px');
                                        widget.addClass(that.toThemeProperty('jqx-rc-r'));
                                    }
                                    widget.removeClass(that.toThemeProperty('jqx-rc-all'));
                                }

                                if (index != 0 && index != tools.length - 1 && tools.length > 2) {
                                    widget.css('border-left-radius', '0px');
                                    widget.css('border-right-radius', '0px');
                                    widget.removeClass(that.toThemeProperty('jqx-rc-all'));
                                }
                                else if (tools.length == 2) {
                                    if (index == 0) {
                                        widget.css('border-right-radius', '0px');
                                        widget.addClass(that.toThemeProperty('jqx-rc-l'));
                                    }
                                    else {
                                        widget.css('border-left-radius', '0px');
                                        widget.addClass(that.toThemeProperty('jqx-rc-r'));
                                    }
                                    widget.removeClass(that.toThemeProperty('jqx-rc-all'));
                                }
                                else if (tools.length == 1) {
                                    widget.css('margin-right', '0px');
                                }
                            }
                        }
                    });
                }

                that.toolbar.css('direction', !this.rtl ? 'ltr' : 'rtl');

                if (toolGroups.length == 0) {
                    addTools(that.toolbar, tools);
                }
                else {
                    for (var i = 0; i < toolGroups.length; i++) {
                        var toolGroup = toolGroups[i];
                        var tools = toolGroup.split(" ");
                        var groupClass = that.toThemeProperty('jqx-editor-toolbar-group') + " " + that.toThemeProperty('jqx-fill-state-normal');
                        var ownerElement = $("<div class='" + groupClass + "'></div>");
                        ownerElement.addClass(that.toThemeProperty('jqx-rc-all'));
                        that.toolbar.append(ownerElement);
                        addTools(ownerElement, tools);
                    }
                    var groups = that.toolbar.find('.jqx-editor-toolbar-group')
                    var groupsLength = groups.length;
                    for (var i = 0; i < groupsLength; i++) {
                        if ($(groups[i]).children().length == 0) {
                            $(groups[i]).remove();
                        }
                    }
                }
                if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
                    $(".jqx-editor-toolbar-group").css('float', 'left');
                    $(".jqx-editor-toolbar-group").children().css('float', 'left');
                    $(".jqx-editor-toolbar-group").css('zoom', '1');
                    $(".jqx-editor-toolbar-group").children().css('zoom', '1');
                }
            }

            that._arrange();
            that._addHandlers();
        },

        _arrange: function () {
            var that = this;
            if (that.content) {
                if (that.tools == "" || that.tools == false) {
                    that.content.height(that.container.outerHeight() - parseInt(that.container.css('padding-top')) - parseInt(that.container.css('padding-bottom')) - 6);
                    that.content.css('margin-top', '4px');
                    that.toolbar.hide();
                }
                else {
                    that.toolbar.show();
                    that.content.css('margin-top', '0px');
                    that.content.height(that.container.outerHeight() - that.toolbar.outerHeight() - parseInt(that.container.css('padding-top')) - parseInt(that.container.css('padding-bottom')) - 2);
                    if (that.toolbarPosition != "top") {
                        that.content.css('margin-top', '4px');
                        that.content.css('margin-bottom', '0px');
                    }
                }
                if ($.jqx.browser.msie && $.jqx.browser.version < 8) {
                    that.content.css('margin-top', '4px');
                    that.content.height(that.container.height() - that.toolbar.outerHeight() - 2 * parseInt(that.container.css('padding-bottom')) - 10);
                    that.content.width(that.container.width() - 2 * parseInt(that.container.css('padding-left')) - 2);
                }
                if (that.editor.height() < that.content.height()) {
                    that.editor.height(that.content.height());
                }
            }
        },

        propertyChangedHandler: function (object, key, oldvalue, value) {
            var that = object;
            if (that.isInitialized == undefined || that.isInitialized == false)
                return;

            if (key == "pasteMode" || key == "lineBreak" || key == "editable") {
                return;
            }

            if (key == "disabled") {
                object._refreshTools();
            }

            if (key == "width" || key == "height" || key == "toolbarPosition") {
                object._arrange();
                return;
            }

            if (key == "theme") {
                $.jqx.utilities.setTheme(oldvalue, value, object.host);
            }

            object.refresh();
        },

        selectRange: function (range) {
            var that = this;
            if (!range) range = that.getRange();
            that.selection.selectRange(range);
        },

        getRange: function () {
            var that = this;
            return that.selection.getRange();
        },

        getSelectedElement: function () {
            var range, root, start, end;
            var that = this;
            try {
                if (that.editorDocument.getSelection) {
                    var selection = that.editorDocument.getSelection();
                    range = selection.getRangeAt(selection.rangeCount - 1);
                    start = range.startContainer;
                    end = range.endContainer;
                    root = range.commonAncestorContainer;
                    if (start.nodeName == "#text") root = root.parentNode;
                    if (start.nodeName == "#text") start = start.parentNode;
                    if (start.nodeName.toLowerCase() == "body") start = start.firstChild;
                    if (end.nodeName == "#text") end = end.parentNode;
                    if (end.nodeName.toLowerCase() == "body") end = end.lastChild;
                    if (start == end) root = start;

                    return end;
                } else if (that.editorDocument.selection) {
                    range = that.editorDocument.selection.createRange()
                    if (!range.duplicate) return null;
                    root = range.parentElement();
                    var r1 = range.duplicate();
                    var r2 = range.duplicate();
                    r1.collapse(true);
                    r2.moveToElementText(r1.parentElement());
                    r2.setEndPoint("EndToStart", r1);
                    start = r1.parentElement();
                    r1 = range.duplicate();
                    r2 = range.duplicate();
                    r2.collapse(false);
                    r1.moveToElementText(r2.parentElement());
                    r1.setEndPoint("StartToEnd", r2);
                    end = r2.parentElement();
                    if (start.nodeName.toLowerCase() == "body") start = start.firstChild;
                    if (end.nodeName.toLowerCase() == "body") end = end.lastChild;

                    if (start == end) root = start;
                    return end;
                }
            }
            catch (error) {
                return null;
            }

            return null;
        },

        val: function (value) {
            if (value != undefined && typeof value != 'object') {
                this.editor.html(value)
            }


            if (this._documentMode === "source") {
                return this.editor.find('pre:first').html();
            }

            return this.editor.html();
        },

        _addHandlers: function () {
            var that = this;
            that.addHandler(that.toolbar, "mousedown.editor" + that.element.id, function (event) {
                if (event.preventDefault)
                    event.preventDefault();
                if (event.stopPropagation)
                    event.stopPropagation();

                return false;
            });

            var blur = function () {
                if (that._textArea) {
                    if (!that.updating) {
                        that._textArea.value = that.val();
                    }
                }

                if (that.changed) {
                    that._raiseEvent("change");
                    that.changed = false;
                }
                that.focused = false;
            }

            var focus = function () {
                that.focused = true;
                if (that.inline) {
                    that.host.addClass(that.toThemeProperty('jqx-fill-state-focus'));
                    that.host.addClass(that.toThemeProperty('jqx-editor-inline-focus'));
                    that.host.addClass(that.toThemeProperty('jqx-rc-all'));
                    if (that.tools == "" || that.tools == null)
                        return;
                    that.toolbarContainer.fadeIn('fast');
                    var location = that.host.coord();
                    if (that.toolbarPosition != "bottom") {
                        that.toolbarContainer.offset({ left: location.left, top: location.top - that.toolbarContainer.outerHeight() - 5 });
                    }
                    else {
                        that.toolbarContainer.offset({ left: location.left, top: location.top + 5 + that.host.height() });
                    }
                }
            }

            if ($.jqx.browser.mozilla) {
                this.addHandler($(document), "mousedown.editor" + that.element.id, function (event) {
                    blur();
                });
            }

            that.addHandler(that.editor, "blur.editor" + that.element.id, function (event) {
                blur();
            });

            that.addHandler(that.editor, "focus.editor" + that.element.id, function (event) {
                focus();
            });

            that.addHandler(that.editor, "beforedeactivate.editor" + that.element.id, function (event) {
                that.range = that.getRange();
            });

            that.addHandler(that.editor, "mousedown.editor" + that.element.id, function (event) {
                if (!event.target.href) {
                    if (that.linkPopup) that.linkPopup.remove();
                }

                that.range = that.getRange();
                if ($.jqx.browser.mozilla) {
                    focus();
                    event.stopPropagation();
                }

                if ($('.jqx-editor-dropdownpicker').length > 0) {
                    $('.jqx-editor-dropdownpicker').jqxDropDownButton('close');
                }
                if ($('.jqx-editor-dropdownlist').length > 0) {
                    $('.jqx-editor-dropdownlist').jqxDropDownList('close');
                }
                if (that.inline) {
                    that.editor.focus();
                }
            });
            if ($.jqx.mobile.isTouchDevice()) {
                that.addHandler($(that.editorDocument), "selectionchange.editor" + that.element.id, function () {
                    if (that.editorDocument.activeElement != that.editor[0]) {
                        setTimeout(function () {
                            if (that.iframe) {
                                that.iframe[0].contentWindow.focus();
                            }
                        }, 500);
                    }
                });
                that.addHandler($(that.editorDocument), "touchstart.editor" + that.element.id, function () {
                    setTimeout(function () {
                        if (that.iframe) {
                            that.iframe[0].contentWindow.focus();
                        }
                    }, 500);
                });
            }
            that.addHandler(that.editor, "mouseup.editor" + that.element.id, function (event) {
                if (that._documentMode == "source")
                    return true;

                that.range = that.getRange();
                that._refreshTools(null, true);
            });
            that.addHandler(that.editor, "keydown.editor" + that.element.id, function (event) {
                if (that.keyPressed) {
                    that.keyPressed(event);
                }

                if (that._documentMode == "source")
                    return true;

                if ($.jqx.browser.mozilla) {
                    if (!that.focused) {
                        focus();
                    }
                }

                that.changeType = "keyboard";

                if (that.disabled) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    return false;
                }

                if (that.updating) {
                    if (that.activeElement) {
                        var e = $.Event("keydown");
                        $.extend(e, event);
                        that.activeElement.trigger(e);
                    }

                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    return false;
                }
                var ev = event || window.event;
                var key = ev.keyCode;
                var keyChar = String.fromCharCode(key).toLowerCase();

                if (!that.editable) {
                    var selectionCodes = [9, 33, 34, 35, 36, 37, 38, 39, 40, 40, 45];
                    if ($.inArray(ev.keyCode, selectionCodes) == -1 && !(ev.ctrlKey && keyChar == "c") && !(ev.ctrlKey && keyChar == "a"))
                        event.preventDefault();
                }

                if (that.selection.getText().length > 0 || that.linkPopup) {
                    var selectionCodes = [8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 40, 45, 46];

                    if (!$.inArray(ev.keyCode, selectionCodes) != -1
                        || (ev.keyCode == 65 && ev.ctrlKey && !ev.altKey && !ev.shiftKey)) {
                        if (that._refreshToolsTimer) clearTimeout(that._refreshToolsTimer);
                        that._refreshToolsTimer = setTimeout(function () {
                            that._refreshTools(null, true, ev.keyCode);
                        }, 10);
                    }
                }
                if (key == 13 && that.lineBreak != "default") {
                    var selectedElement = that.getSelectedElement();
                    if (selectedElement) {
                        var nodeName = selectedElement.nodeName.toLowerCase();
                        switch (nodeName) {
                            case "pre":
                            case "li":
                            case "ul":
                            case "ol":
                            case "h1":
                            case "h2":
                            case "h3":
                            case "h4":
                            case "h5":
                            case "h6":
                                return true;
                        }

                        var parent = selectedElement;
                        while (parent != null) {
                            if (parent.nodeName == "#document") {
                                parent = that.editorDocument.body;
                                break;
                            }
                            if (parent.parentNode == that.editorDocument.body || parent == that.editorDocument.body)
                                break;

                            parent = parent.parentNode;
                        }
                    }
                    if (parent) {
                        var range = that.getRange();
                        if (that.editorDocument.body.innerHTML == "<div></div>" && that.lineBreak != "br") {
                            that.selection.insertContent("&#8203;");
                        }

                        if (that.lineBreak == "div") {
                            if (parent == that.editorDocument.body) {
                                $(parent).append("<div>&#8203;</div>" + "<span id='INSERTION_MARKER'>&nbsp;</span>");
                            }
                            else {
                                $("<div>&#8203;</div>" + "<span id='INSERTION_MARKER'>&nbsp;</span>").insertAfter(parent);
                            }
                        }
                        else if (that.lineBreak == "p") {
                            if (parent == that.editorDocument.body) {
                                $(parent).append("<p>&#8203;</p>" + "<span id='INSERTION_MARKER'>&nbsp;</span>");
                            }
                            else {
                                $("<p>&#8203;</p>" + "<span id='INSERTION_MARKER'>&nbsp;</span>").insertAfter(parent);
                            }
                        }
                        else {
                            that.execute("insertHTML", "<br/>&#8203;" + "<span id='INSERTION_MARKER'>&nbsp;</span>");
                        }

                        that.selectRange(range);
                        var marker = $(that.editorDocument).find("#INSERTION_MARKER");
                        if (that.lineBreak != "br") {
                            that.selection.selectNode($(marker).prev()[0], true);
                        }
                        else {
                            that.selection.selectNode(marker[0], true);
                            if (that.getRange().setStartAfter) {
                                that.getRange().setStartAfter(marker[0]);
                            }
                        }

                        marker.remove();
                        that.selection.collapse(false);

                        if (parent && parent.nodeName && that.lineBreak == "br") {
                            if (parent.nodeName.toLowerCase() != "#text") {
                                that.selection.selectNode(parent, true);
                                if (that.getRange().setStartAfter) {
                                    that.getRange().setStartAfter(parent);
                                }
                                that.selection.collapse(false);
                            }
                        }

                        if (that.lineBreak != "br") {
                            range = that.getRange();
                            if (range.select) {
                                range.select();
                            }
                        }
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                        return false;
                    }
                }
                if (ev.ctrlKey && (keyChar == "k" || keyChar == "u" || keyChar == "b" || keyChar == "i")) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    var command = null;
                    switch (keyChar) {
                        case "k":
                            command = 'link';
                            break;
                        case "u":
                            command = 'underline';
                            break;
                        case "b":
                            command = 'bold';
                            break;
                        case "i":
                            command = 'italic';
                            break;
                    }
                    if (that.commands[command].widget) {
                        that.commands[command].widget.trigger('click');
                    }
                    return false;
                }
            });


            that.addHandler(that.editor, "paste.editor" + that.element.id, function (event) {
                if (that._documentMode == "source")
                    return true;

                if (that.readOnly)
                    return true;

                that.updating = true;
                that.readOnly = true;

                var e = event;
                try {
                    var cleanHtml = function (html, plain) {
                        if (plain) {
                            if (!that.paragraphise) {
                                html = html.replace(/\n/g, "<br />");
                            }
                            else {
                                html = "<p>" + html + "<\/p>";
                                html = html.replace(/\n/g, "<\/p><p>");
                                html = html.replace(/<p>\s<\/p>/gi, '');
                            }
                        }
                        else {
                            // remove body and html tag
                            html = html.replace(/<html[^>]*?>(.*)/gim, "$1");
                            html = html.replace(/<\/html>/gi, '');
                            html = html.replace(/<body[^>]*?>(.*)/gi, "$1");
                            html = html.replace(/<\/body>/gi, '');

                            // remove style, meta and link tags
                            html = html.replace(/<style[^>]*?>[\s\S]*?<\/style[^>]*>/gi, '');
                            html = html.replace(/<(?:meta|link)[^>]*>\s*/gi, '');

                            // remove XML elements and declarations
                            html = html.replace(/<\\?\?xml[^>]*>/gi, '');

                            // remove w: tags with contents.
                            html = html.replace(/<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi, '');

                            // remove tags with XML namespace declarations: <o:p><\/o:p>
                            html = html.replace(/<o:p>\s*<\/o:p>/g, '');
                            html = html.replace(/<o:p>[\s\S]*?<\/o:p>/g, '&nbsp;');
                            html = html.replace(/<\/?\w+:[^>]*>/gi, '');

                            // remove comments [SF BUG-1481861].
                            html = html.replace(/<\!--[\s\S]*?-->/g, '');
                            html = html.replace(/<\!\[[\s\S]*?\]>/g, '');

                            // remove mso-xxx styles.
                            html = html.replace(/\s*mso-[^:]+:[^;"']+;?/gi, '');

                            // remove styles.
                            html = html.replace(/<(\w[^>]*) style='([^\']*)'([^>]*)/gim, "<$1$3");
                            html = html.replace(/<(\w[^>]*) style="([^\"]*)"([^>]*)/gim, "<$1$3");

                            // remove margin styles.
                            html = html.replace(/\s*margin: 0cm 0cm 0pt\s*;/gi, '');
                            html = html.replace(/\s*margin: 0cm 0cm 0pt\s*"/gi, "\"");

                            html = html.replace(/\s*text-indent: 0cm\s*;/gi, '');
                            html = html.replace(/\s*text-indent: 0cm\s*"/gi, "\"");

                            html = html.replace(/\s*text-align: [^\s;]+;?"/gi, "\"");

                            html = html.replace(/\s*page-break-before: [^\s;]+;?"/gi, "\"");

                            html = html.replace(/\s*font-variant: [^\s;]+;?"/gi, "\"");

                            html = html.replace(/\s*tab-stops:[^;"']*;?/gi, '');
                            html = html.replace(/\s*tab-stops:[^"']*/gi, '');

                            // remove font face attributes.
                            html = html.replace(/\s*face="[^"']*"/gi, '');
                            html = html.replace(/\s*face=[^ >]*/gi, '');

                            html = html.replace(/\s*font-family:[^;"']*;?/gi, '');
                            html = html.replace(/\s*font-size:[^;"']*;?/gi, '');

                            // remove class attributes
                            html = html.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3");

                            // remove "display:none" attributes.
                            html = html.replace(/<(\w+)[^>]*\sstyle="[^"']*display\s?:\s?none[\s \S]*?<\/\1>/ig, '');

                            // remove empty styles.
                            html = html.replace(/\s*style='\s*'/gi, '');
                            html = html.replace(/\s*style="\s*"/gi, '');

                            html = html.replace(/<span\s*[^>]*>\s*&nbsp;\s*<\/span>/gi, '&nbsp;');

                            html = html.replace(/<span\s*[^>]*><\/span>/gi, '');

                            // remove align attributes
                            html = html.replace(/<(\w[^>]*) align=([^ |>]*)([^>]*)/gi, "<$1$3");

                            // remove lang attributes
                            html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");

                            html = html.replace(/<span([^>]*)>([\s\S]*?)<\/span>/gi, '$2');

                            html = html.replace(/<font\s*>([\s\S]*?)<\/font>/gi, '$1');

                            html = html.replace(/<(u|i|strike)>&nbsp;<\/\1>/gi, '&nbsp;');

                            html = html.replace(/<h\d>\s*<\/h\d>/gi, '');

                            // remove language attributes
                            html = html.replace(/<(\w[^>]*) language=([^ |>]*)([^>]*)/gi, "<$1$3");

                            // remove onmouseover and onmouseout events (from MS word comments effect)
                            html = html.replace(/<(\w[^>]*) onmouseover="([^\"']*)"([^>]*)/gi, "<$1$3");
                            html = html.replace(/<(\w[^>]*) onmouseout="([^\"']*)"([^>]*)/gi, "<$1$3");

                            // the original <Hn> tag sent from word is something like this: <Hn style="margin-top:0px;margin-bottom:0px">
                            html = html.replace(/<h(\d)([^>]*)>/gi, '<h$1>');

                            // word likes to insert extra <font> tags, when using IE. (Weird).
                            html = html.replace(/<(h\d)><font[^>]*>([\s\S]*?)<\/font><\/\1>/gi, '<$1>$2<\/$1>');
                            html = html.replace(/<(h\d)><em>([\s\S]*?)<\/em><\/\1>/gi, '<$1>$2<\/$1>');

                            // i -> em, b -> strong - doesn't match nested tags e.g <b><i>some text</i></b> - not possible in regexp 
                            html = html.replace(/<b\b[^>]*>(.*?)<\/b[^>]*>/gi, '<strong>$1</strong>');
                            html = html.replace(/<i\b[^>]*>(.*?)<\/i[^>]*>/gi, '<em>$1</em>');

                            // remove "bad" tags
                            html = html.replace(/<\s+[^>]*>/gi, '');

                            // remove empty <span>s (ie. no attributes, no reason for span in pasted text)
                            // done twice for nested spans
                            html = html.replace(/<span>([\s\S]*?)<\/span>/gi, '$1');
                            html = html.replace(/<span>([\s\S]*?)<\/span>/gi, '$1');

                            // remove empty <div>s (see span)
                            html = html.replace(/<div>([\s\S]*?)<\/div>/gi, '$1');
                            html = html.replace(/<div>([\s\S]*?)<\/div>/gi, '$1');

                            // remove empty tags (three times, just to be sure - for nested empty tags).
                            // This also removes any empty anchors
                            html = html.replace(/<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g, '');
                            html = html.replace(/<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g, '');
                            html = html.replace(/<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g, '');

                            if (html.trim) {
                                html = html.trim();
                            }

                            // Convert <p> to <br />
                            if (!that.paragraphise) {
                                html.replace(/<p>/gi, '<br />');
                                html.replace(/<\/p>/gi, '');
                            }
                            // Check if in paragraph - this fixes FF3.6 and it's <br id=""> issue
                            else {
                                var check = html.substr(0, 2);
                                if ('<p' !== check) {
                                    html = '<p>' + html + '</p>';
                                    // Replace breaks with paragraphs
                                    html = html.replace(/\n/g, "<\/p><p>");
                                    html = html.replace(/<br[^>]*>/gi, '<\/p><p>');
                                }
                            }

                            // Make it valid xhtml
                            html = html.replace(/<br>/gi, '<br />');

                            // remove <br>'s that end a paragraph here.
                            html = html.replace(/<br[^>]*><\/p>/gim, '</p>');

                            // remove empty paragraphs - with just a &nbsp; (or whitespace) in (and tags again for good measure)
                            html = html.replace(/<p>&nbsp;<\/p>/gi, '');
                            html = html.replace(/<p>\s<\/p>/gi, '');
                            html = html.replace(/<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g, '');

                            html = html.replace(/MsoNormal/gi, "");
                            html = html.replace(/<\/?meta[^>]*>/gi, "");
                            html = html.replace(/<\/?xml[^>]*>/gi, "");
                            html = html.replace(/<\?xml[^>]*\/>/gi, "");
                            html = html.replace(/<!--(.*)-->/gi, "");
                            html = html.replace(/<!--(.*)>/gi, "");
                            html = html.replace(/<!(.*)-->/gi, "");
                            html = html.replace(/<w:[^>]*>(.*)<\/w:[^>]*>/gi, '');
                            html = html.replace(/<w:[^>]*\/>/gi, '');
                            html = html.replace(/<\/?w:[^>]*>/gi, "");
                            html = html.replace(/<m:[^>]*\/>/gi, '');
                            html = html.replace(/<m:[^>]>(.*)<\/m:[^>]*>/gi, '');
                            html = html.replace(/<o:[^>]*>(.*)<\/o:[^>]*>/gi, '');
                            html = html.replace(/<o:[^>]*\/>/gi, '');
                            html = html.replace(/<\/?m:[^>]*>/gi, "");
                            html = html.replace(/style=\"([^>]*)\"/gi, "");
                            html = html.replace(/style=\'([^>]*)\'/gi, "");
                            html = html.replace(/class=\"(.*)\"/gi, "");
                            html = html.replace(/class=\'(.*)\'/gi, "");
                            html = html.replace(/<b>/gi, '<strong>');
                            html = html.replace(/<\/b>/gi, '<\/strong>');
                            html = html.replace(/<p[^>]*>/gi, '<p>');
                            html = html.replace(/<\/p[^>]*>/gi, '<\/p>');
                            html = html.replace(/<span[^>]*>/gi, '');
                            html = html.replace(/<\/span[^>]*>/gi, '');
                            html = html.replace(/<st1:[^>]*>/gi, '');
                            html = html.replace(/<\/st1:[^>]*>/gi, '');
                            html = html.replace(/<font[^>]*>/gi, '');
                            html = html.replace(/<\/font[^>]*>/gi, '');
                            html = html.replace('  ', '');
                            html = html.replace(/<strong><\/strong>/gi, '');
                            html = html.replace(/<p><\/p>/gi, '');
                            html = html.replace(/\/\*(.*)\*\//gi, '');
                            html = html.replace(/<!--/gi, "");
                            html = html.replace(/-->/gi, "");
                            html = html.replace(/<style[^>]*>[^<]*<\/style[^>]*>/gi, '');


                            html = html.trim();
                        }

                        return html;
                    };

                    var oldRange = that.getRange();
                    if (that.pasteMode == "text" && !$.jqx.browser.mozilla) {
                        that.selection.insertContent('<textarea cols="50" contenteditable="false" class="jqx-editor-paste-element"></textarea>');
                    }
                    else {
                        that.selection.insertContent('<div class="jqx-editor-paste-element">&nbsp;</div>');
                    }
                    var scroll = $(window).scrollTop();

                    var marker = $(that.editorDocument).find(".jqx-editor-paste-element");
                    marker.css('top', scroll + "px");
                    if (that.editor[0].createTextRange) {
                        event.preventDefault();
                        var textRange = that.editor[0].createTextRange();
                        textRange.moveToElementText(marker[0]);
                        textRange.execCommand('Paste');
                    }
                    else {
                        var range = that.editorDocument.createRange();
                        range.selectNodeContents(marker[0]);
                        that.selectRange(range);
                    }
                    if (that.pasteMode == "text" && !$.jqx.browser.mozilla) {
                        marker.select();
                    }
                    that.marker = marker;

                    setTimeout(function () {
                        that.selectRange(oldRange);

                        var buildFragment = function (html) {
                            var container = that.editorDocument.createElement('div');
                            var fragment = that.editorDocument.createDocumentFragment();
                            container.innerHTML = html;

                            while (container.firstChild) {
                                fragment.appendChild(container.firstChild);
                            }

                            return fragment;
                        }

                        if (that.pasteMode != "text") {
                            var fragment = buildFragment(that.marker.html());

                            if (fragment.firstChild && fragment.firstChild.className === "jqx-editor-paste-element") {
                                var fragmentsHtml = [];
                                for (var i = 0, l = fragment.childNodes.length; i < l; i++) {
                                    fragmentsHtml.push(fragment.childNodes[i].innerHTML);
                                }

                                fragment = buildFragment(fragmentsHtml.join('<br />'));
                            }

                            var div = document.createElement('div');
                            div.appendChild(fragment.cloneNode(true));
                            var html = div.innerHTML;
                        }
                        else {
                            var html = that.marker.val();
                            if (that.marker.html() != "" && that.marker.val().indexOf('\n') == -1) {
                                var html = that.marker.html();
                                html = html.replace(/&nbsp;/gm, "");
                                html = html.replace(/\n\n/gm, "\n");
                                html = html.replace(/<br[^>]*>/gi, '\n');
                                html = html.replace(/<li[^>]*>/gi, '\n');
                                html = html.replace(/<p[^>]*>/gi, '\n');
                                that.marker.html(html);
                                var html = that.marker.text();
                            }
                        }
                        var txtPastetClean = cleanHtml(html, that.pasteMode == "text");
                        var range = that.getRange();
                        that.selection.insertContent(txtPastetClean + "<span id='INSERTION_MARKER'>&nbsp;</span>");
                        that.marker.remove();
                        var marker = $(that.editorDocument).find("#INSERTION_MARKER");
                        that.selection.selectNode(marker[0], true);
                        if (that.getRange().setStartAfter) {
                            that.getRange().setStartAfter(marker[0]);
                        }
                        marker.remove();
                        that.selection.collapse(false);
                        marker.removeAttr('id');
                        that._refreshTools();
                        that.changed = true;
                    }, 100);

                    that.updating = false;
                    that.readOnly = false;
                }
                catch (error) {
                    if (console) {
                        console.log(error);
                    }
                }
            });

            that.addHandler(that.editor, "keyup.editor" + that.element.id, function (event) {
                if (that._documentMode == "source")
                    return true;

                if (that.updating || that.disabled || !that.editable) {
                    if (event.preventDefault) {
                        event.preventDefault();
                    }
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    return false;
                }

                that.range = that.getRange();
                that.changed = true;
                var ev = event || window.event;
                var key = ev.keyCode;
                var selectionCodes = [8, 9, 13, 33, 34, 35, 36, 37, 38, 39, 40, 40, 45, 46];

                if ($.inArray(ev.keyCode, selectionCodes) != -1
                    || (ev.keyCode == 65 && ev.ctrlKey && !ev.altKey && !ev.shiftKey)) {
                    that._refreshTools(null, true, ev.keyCode);
                }
            });

            that.addHandler(that.editor, "click.editor" + that.element.id, function (event) {
                if (that._documentMode == "source")
                    return true;

                if (that.editImage) {
                    $(that.editImage).removeClass('jqx-editor-focus');
                    that.editImage = null;
                }
                if (event.target.tagName.toLowerCase() == 'img') {
                    var image = event.target;
                    that.editImage = image;
                    $(that.editImage).addClass('jqx-editor-focus');
                }
            });
            that.addHandler(that.editor, "dblclick.editor" + that.element.id, function (event) {
                if (that._documentMode == "source")
                    return true;

                if (event.target.tagName.toLowerCase() == 'img') {
                    var image = event.target;
                    if ($("#" + "imageWindow" + this.element.id).length > 0) {
                        that.editImage = image;
                        that._updateImageWindow();
                    }
                }
            });
        },


        _removeHandlers: function () {
            var that = this;
            if (that.editor) {
                that.removeHandler(that.editor, "paste.editor" + that.element.id);
                that.removeHandler(that.editor, 'blur.editor' + that.element.id);
                that.removeHandler(that.editor, 'focus.editor' + that.element.id);
                that.removeHandler(that.editor, 'click.editor' + that.element.id);
                that.removeHandler(that.editor, 'mousedown.editor' + that.element.id);
                that.removeHandler(that.editor, 'mouseup.editor' + that.element.id);
                that.removeHandler(that.editor, 'keyup.editor' + that.element.id);
                that.removeHandler(that.editor, 'keydown.editor' + that.element.id);
                that.removeHandler(that.editor, 'beforedeactivate.editor' + that.element.id);
                that.removeHandler(that.editor, 'dblclick.editor' + that.element.id);
            }
            if (that.toolbar) {
                that.removeHandler(that.toolbar, 'mousedown.editor' + that.element.id);
            }
        },

        getParentByTag: function (a, b) {
            var b = b.toLowerCase(), c = a;
            do
                if (b == "" || c.nodeName.toLowerCase() == b)
                    return c;
            while (c = c.parentNode);
            return a
        },

        isStyleProperty: function (a, b, c, d) {
            var b = b.toLowerCase(), e = a;
            do
                if (e.nodeName.toLowerCase() == b && e.style[c] == d)
                    return !0;
            while (e = e.parentNode);
            return !1
        },

        setStyleProperty: function (a, b) {
            this.style[b] = !1;
            var c = this.getParentByTag(a, b);
            c && c.tagName.toLowerCase() == b && (this.style[b] = !0);
            if (b == "del" && this.getParentByTag(a, "strike") && this.getParentByTag(a, "strike").tagName.toLowerCase() == "strike")
                this.style.del = !0
        },

        _rgbToHex: function (color) {
            if (color) {
                if (color.substr(0, 1) === "#") {
                    if (color.length == 4) {
                        var r = color.substr(1, 1);
                        var g = color.substr(2, 1);
                        var b = color.substr(3, 1);
                        return "#" + r + r + g + g + b + b;
                    }

                    return color;
                }
                var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color);
                if (!nums) {
                    return null;
                }

                var r = parseInt(nums[2], 10).toString(16);
                var g = parseInt(nums[3], 10).toString(16);
                var b = parseInt(nums[4], 10).toString(16);
                return "#" + (
                    (r.length == 1 ? "0" + r : r) +
                    (g.length == 1 ? "0" + g : g) +
                    (b.length == 1 ? "0" + b : b)
                );
            }
            return null;
        },

        updateStyle: function (el) {
            var that = this;
            var el = that.getSelectedElement() ? that.getSelectedElement() : el;
            if (!el || !that.setStyleProperty) return;
            try {
                if (window.getComputedStyle) {
                    if (el.nodeName.toLowerCase() == "#text") el = that.editor[0];

                    var st = window.getComputedStyle(el, null);
                    var fw = ((st.getPropertyValue("font-weight") == 401) ? 700 : st.getPropertyValue("font-weight"));
                    that.style = {
                        fontStyle: st.getPropertyValue("font-style"),
                        fontSize: st.getPropertyValue("font-size"),
                        textDecoration: st.getPropertyValue("text-decoration"),
                        fontWeight: fw,
                        fontFamily: st.getPropertyValue("font-family"),
                        textAlign: st.getPropertyValue("text-align"),
                        color: that._rgbToHex(st.color),
                        backColor: that._rgbToHex(st.backgroundColor)
                    };
                    that.style.fontStyle = st.getPropertyValue("font-style");
                    that.style.vAlign = st.getPropertyValue("vertical-align");
                    that.style.del = that.isStyleProperty(el, "span", "textDecoration", "line-through");
                    that.style.u = that.isStyleProperty(el, "span", "textDecoration", "underline");

                    var getActualBackgroundColor = function (elem) {
                        var transparentColor = "transparent";
                        var rgba = "rgba(0, 0, 0, 0)";
                        while (elem && (window.getComputedStyle(elem).backgroundColor == transparentColor || window.getComputedStyle(elem).backgroundColor == rgba))
                            elem = elem.parentNode;
                        return elem ? window.getComputedStyle(elem).backgroundColor : transparentColor;
                    }
                    if (!that.style.backColor) {
                        that.style.backColor = that._rgbToHex(getActualBackgroundColor(el));
                    }
                }
                else {
                    var st = el.currentStyle;
                    that.style = {
                        fontStyle: st.fontStyle,
                        fontSize: st.fontSize,
                        textDecoration: st.textDecoration,
                        fontWeight: st.fontWeight,
                        fontFamily: st.fontFamily,
                        textAlign: st.textAlign,
                        color: that._rgbToHex(st.color),
                        backColor: that._rgbToHex(st.backgroundColor)
                    };
                }
                that.setStyleProperty(el, "h1");
                that.setStyleProperty(el, "h2");
                that.setStyleProperty(el, "h3");
                that.setStyleProperty(el, "h4");
                that.setStyleProperty(el, "h5");
                that.setStyleProperty(el, "h6");
                that.setStyleProperty(el, "del");
                that.setStyleProperty(el, "sub");
                that.setStyleProperty(el, "sup");
                that.setStyleProperty(el, "u");
                if (el.nodeName.toLowerCase() == "a") {
                    if (that.style.textDecoration == "underline") {
                        that.style.u = true;
                    }
                }

                if (that.style.h1 || that.style.h2 || that.style.h3 || that.style.h4 || that.style.h5 || that.style.h6)
                    that.style.heading = true;
            }
            catch (e) { return null }
        },

        _refreshTools: function (el, navigate, key) {
            var that = this;
            if (that.updating)
                return;

            var el = that.getSelectedElement() ? that.getSelectedElement() : el;
            if (!el || !that.setStyleProperty) return;
            that.updateStyle(el);

            var s = that.readOnly;
            that.readOnly = true;

            if (that.tools !== false) {
                var tools = that.tools.split(" ");
                var toolGroups = that.tools.split(" | ");

                var resetTools = function (tools) {
                    $.each(tools, function (index, value) {
                        var tool = that.commands[this];
                        if (!tool) {
                            return true;
                        }

                        switch (tool.type) {
                            case 'list':
                                tool.widget.jqxDropDownList('clearSelection');
                                tool.widget.jqxDropDownList({ disabled: that.disabled });
                                break;
                            case 'colorPicker':
                                tool.val(tool.value);
                                tool.widget.jqxDropDownButton({ disabled: that.disabled });
                                break;
                            case "toggleButton":
                                tool.widget.jqxToggleButton('unCheck');
                                tool.widget.jqxToggleButton({ disabled: that.disabled });
                                break;
                            case "button":
                            default:
                                tool.widget.jqxButton({ disabled: that.disabled });
                                break;
                        }
                    });
                }

                if (toolGroups.length == 0) {
                    resetTools(tools);
                }
                else {
                    for (var i = 0; i < toolGroups.length; i++) {
                        var toolGroup = toolGroups[i];
                        var tools = toolGroup.split(" ");
                        resetTools(tools);
                    }
                }

                if (that.style) {
                    var updateTools = function (tools) {
                        $.each(tools, function (index, value) {
                            var tool = that.commands[this];
                            if (!tool) {
                                return true;
                            }
                            if (tool.refresh) {
                                tool.refresh(tool.widget, that.style);
                                return true;
                            }

                            switch (tool.type) {
                                case 'list':
                                    if (tool.command == "fontname") {
                                        var fontNameIndex = -1;
                                        var oldValueIndex = 999;
                                        for (var i = 0; i < tool.value.length; i++) {
                                            var value = tool.value[i].label.toLowerCase();
                                            var valueIndex = that.style.fontFamily.toLowerCase().indexOf(value);

                                            if (valueIndex >= 0) {
                                                if (valueIndex < oldValueIndex) {
                                                    fontNameIndex = i;
                                                }
                                                oldValueIndex = Math.min(oldValueIndex, valueIndex);
                                            }
                                        }
                                        tool.widget.jqxDropDownList('selectIndex', fontNameIndex);
                                    }
                                    else if (tool.command == "formatblock") {
                                        var value = null;
                                        if (that.style.h1) value = "h1";
                                        else if (that.style.h2) value = "h2";
                                        else if (that.style.h3) value = "h3";
                                        else if (that.style.h4) value = "h4";
                                        else if (that.style.h5) value = "h5";
                                        else if (that.style.h6) value = "h6";
                                        tool.widget.jqxDropDownList('selectItem', value);
                                    }
                                    else if (tool.command == "fontsize") {
                                        var fontSizes = 'xx-small,x-small,small,medium,large,x-large,xx-large'.split(',');
                                        var size = -1;
                                        try {
                                            var size = el.getAttribute('size') - 1;
                                            if (size == -1) size = that.editorDocument.queryCommandValue(tool.command) - 1;
                                        }
                                        catch (er) {
                                        }
                                        var fontSize = fontSizes[size];
                                        tool.widget.val(fontSize);
                                    }
                                    break;
                                case "toggleButton":
                                    if (tool.command == "viewsource") {
                                        return;
                                    }

                                    if (!tool.command) {
                                        return;
                                    }
                                    var formatted = false;
                                    var toggled = that.editorDocument.queryCommandState(tool.command) && that.editorDocument.queryCommandEnabled(tool.command);

                                    if (tool.command == "bold") {
                                        if (that.style.fontWeight && (that.style.fontWeight >= 600 || that.style.fontWeight == "bold")) {
                                            formatted = true;
                                        }
                                        if (that.selection.isCollapsed()) {
                                            tool.toggled = toggled;
                                        }
                                        else {
                                            tool.toggled = toggled || formatted;
                                        }

                                        toggled = tool.toggled;
                                    }
                                    else if (tool.command == "italic") {
                                        if (that.style.fontStyle && that.style.fontStyle == "italic") {
                                            formatted = true;
                                        }
                                        if (!navigate) {
                                            toggled = tool.toggled;
                                        }
                                        else tool.toggled = toggled;
                                    }
                                    else if (tool.command == "underline") {
                                        if (that.style.u) {
                                            formatted = true;
                                        }
                                        if (!navigate) {
                                            toggled = tool.toggled;
                                        }
                                        else tool.toggled = toggled;
                                    }
                                    else if (tool.command == "justifyleft") {
                                        if (that.style.textAlign == "left") {
                                            formatted = true;
                                        }
                                    }
                                    else if (tool.command == "justifyright") {
                                        if (that.style.textAlign == "right") {
                                            formatted = true;
                                        }
                                    }
                                    else if (tool.command == "justifycenter") {
                                        if (that.style.textAlign == "center") {
                                            formatted = true;
                                        }
                                    }
                                    else if (tool.command == "justifyfull") {
                                        if (that.style.textAlign == "justify") {
                                            formatted = true;
                                        }
                                    }
                                    else $.each(that.style, function (index, value) {
                                        if (tool.command == index.toLowerCase()) {
                                            formatted = true;
                                        }
                                    });

                                    var isActive = toggled;

                                    if (formatted && tool.command.indexOf('justify') != -1) {
                                        tool.widget.jqxToggleButton('check');
                                    }
                                    else {
                                        if (isActive) {
                                            tool.widget.jqxToggleButton('check');
                                        }
                                        else if (formatted && that.range.collapsed === false) {
                                            tool.widget.jqxToggleButton('check');
                                        }
                                        else if ($.jqx.browser.msie && $.jqx.browser.version < 9 && formatted && !that.selection.isCollapsed()) {
                                            tool.widget.jqxToggleButton('check');
                                        }
                                    }

                                    break;
                                case "button":
                                default:
                                    if (tool.refresh) {
                                        tool.refresh(tool.widget, that.style);
                                    }
                                    break;
                            }
                        });
                    }

                    if (toolGroups.length == 0) {
                        updateTools(tools);
                    }
                    else {
                        for (var i = 0; i < toolGroups.length; i++) {
                            var toolGroup = toolGroups[i];
                            var tools = toolGroup.split(" ");
                            updateTools(tools);
                        }
                    }
                }
            }

            that.readOnly = s;
        },

        _preventDefault: function (event, close) {
            if (close !== false) {
                if ($('.jqx-editor-dropdownpicker').length > 0) {
                    $('.jqx-editor-dropdownpicker').jqxDropDownButton('close');
                }
                if ($('.jqx-editor-dropdownlist').length > 0) {
                    $('.jqx-editor-dropdownlist').jqxDropDownList('close');
                }
            }

            if (event.preventDefault) {
                event.preventDefault();
            }
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            event.cancelBubble = true;
            event.returnValue = false;
        },

        _addCommandHandler: function (item, event, cmd, data, tool) {
            var that = this;
            var action;

            if (!cmd && tool.init) {
                cmd = "custom";
            }

            switch (cmd) {
                case 'custom':
                    switch (tool.type) {
                        case "list":
                            action = function (event) {
                                if (that._documentMode != "source") {
                                    if (event.args.type != "none") {
                                        tool.value = $(this).val();
                                        that.execute("custom", tool);
                                        if (!that.readOnly) {
                                            that._refreshTools();
                                        }
                                    }
                                }
                                that._preventDefault(event, false);
                            }
                            break;
                        case "colorPicker":
                            action = function (event) {
                                if (that._documentMode != "source") {
                                    var pickerColors = $(tool.colorPicker).find('td').removeClass('jqx-editor-color-picker-selected-cell');
                                    if (event.target.nodeName.toLowerCase() == "div") {
                                        var color = $(event.target).css('background-color');
                                        $(event.target).parent().addClass('jqx-editor-color-picker-selected-cell');
                                    }
                                    else {
                                        var color = $(event.target).find('div').css('background-color');
                                        $(event.target).addClass('jqx-editor-color-picker-selected-cell');
                                    }


                                    $('#bar-' + cmd).css('background', color);
                                    tool.widget.val = function () {
                                        var toColor = function (input) {
                                            if (typeof input != "number") {
                                                return input;
                                            }

                                            return "rgb(" + (input & 0xFF) + ", " +
                                                ((input & 0xFF00) >> 8) + ", " +
                                                ((input & 0xFF0000) >> 16) + ")";
                                        }
                                        var c = toColor(color);
                                        var hexColor = that._rgbToHex(c);
                                        return hexColor;
                                    }
                                    tool.widget.jqxDropDownButton('close');
                                    that.execute("custom", tool);
                                }
                                that._preventDefault(event);
                                return false;
                            }
                            break;
                        case "button":
                        case "toggleButton":
                        default:
                            action = function (event) {
                                if ($('.jqx-editor-dropdownpicker').length > 0) {
                                    $('.jqx-editor-dropdownpicker').jqxDropDownButton('close');
                                }
                                if ($('.jqx-editor-dropdownlist').length > 0) {
                                    $('.jqx-editor-dropdownlist').jqxDropDownList('close');
                                }

                                that._preventDefault(event);

                                var command = $(this).attr('data-command');
                                var obj = this;

                                if (that._documentMode != "source") {
                                    if (tool.toggle) {
                                        tool.toggle();
                                    }
                                    that.execute("custom", tool);
                                    that._refreshTools();
                                }
                                return false;
                            };
                            break;
                    }
                    break;
                case 'formatblock':
                    action = function (event) {
                        if (that._documentMode != "source") {
                            if (event.args.type != "none") {
                                that.execute($(this).attr('data-command'), "<" + $(this).val() + ">", tool);
                                if (!that.readOnly) {
                                    that.commands["bold"].toggled = false;
                                    that._refreshTools();
                                }
                            }
                        }
                        that._preventDefault(event, false);
                    }
                    break;
                case 'fontsize':
                    action = function (event) {
                        if (that._documentMode != "source") {
                            if (event.args.type != "none") {
                                var val = $(this).val();
                                var fontSizes = 'xx-small,x-small,small,medium,large,x-large,xx-large'.split(',');

                                var fontSize = $(this).jqxDropDownList('getSelectedIndex') + 1;
                                var fontSize = 1 + fontSizes.indexOf(val);
                                that.execute($(this).attr('data-command'), fontSize, tool);
                            }
                        }
                        that._preventDefault(event, false);
                    }
                    break;
                case 'fontname':
                    action = function (event) {
                        if (that._documentMode != "source") {
                            if (event.args.type != "none") {
                                var val = $(this).val();
                                that.execute($(this).attr('data-command'), val, tool);
                            }
                        }
                        that._preventDefault(event, false);
                    }
                    break;
                default:
                    action = function (event) {
                        if ($('.jqx-editor-dropdownpicker').length > 0) {
                            $('.jqx-editor-dropdownpicker').jqxDropDownButton('close');
                        }
                        if ($('.jqx-editor-dropdownlist').length > 0) {
                            $('.jqx-editor-dropdownlist').jqxDropDownList('close');
                        }

                        that._preventDefault(event);

                        var command = $(this).attr('data-command');
                        var obj = this;

                        if (that._documentMode != "source") {
                            if (command == "underline") {
                                if (that.getSelectedElement()) {
                                    var selectedElement = that.getSelectedElement();
                                    if (selectedElement && selectedElement.nodeName.toLowerCase() == "a") {
                                        if (tool.toggled) {
                                            $(selectedElement).css('text-decoration', "none");
                                        }
                                        else {
                                            $(selectedElement).css('text-decoration', "underline");
                                        }
                                        tool.toggle();
                                        that._refreshTools();
                                        return false;
                                    }
                                }
                            }
                            if (tool.toggle) {
                                tool.toggle();
                            }
                            that.execute(command, $(this).val(), tool);
                            that._refreshTools();
                        }
                        return false;
                    };
                    break;
            }
            that.addHandler(item, event, action);
            return false;
        },

        execute: function (cmd, args, tool) {
            var that = this;
            if (!that.readOnly) {
                var doc = that.editorDocument;
                if (that._documentMode == "source") {
                    return;
                }
                that.changeType = "mouse";
                if (that.linkPopup) that.linkPopup.remove();
                that.editor.focus();
                if ($.jqx.browser.mozilla) {
                    //         that.focus();
                }
                if ($.jqx.mobile.isTouchDevice()) {
                    setTimeout(function () {
                        //                        that.focus();
                    }, 25);
                }

                var performAction = function (action) {
                    try {
                        if (action.command && action.command.toLowerCase() == "inserthtml") {
                            var range = that.getRange();
                            var htmlString = action.value;
                            if (htmlString.toString().indexOf('<') == -1) {
                                htmlString = "<span>" + action.value + "</span>";
                            }
                            that.selection.insertContent("" + htmlString + "<span id='INSERTION_MARKER'>&nbsp;</span>");
                            that.selectRange(range);
                            setTimeout(function () {
                                var marker = $(that.editorDocument).find("#INSERTION_MARKER");
                                that.selection.selectNode($(marker).prev()[0], true);
                                marker.remove();
                                that.selection.collapse(false);
                            }, 10);
                        }
                        else if (action.command) {
                            if (doc.queryCommandEnabled(action.command)) {
                                doc.execCommand(action.command, false, action.value);
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            if (doc.queryCommandEnabled(action)) {
                                doc.execCommand(action, false, action);
                            }
                            else {
                                return false;
                            }
                        }
                    }
                    catch (er) {

                    }
                }

                if (cmd == "custom") {
                    var action = args.action(args.widget, that.editor);
                    if (action) {
                        performAction(action);
                    }
                }
                else {
                    try {
                        if (tool && tool.action) {
                            var action = tool.action(tool.widget, that.editor);
                            performAction(action);
                        }
                        else {
                            if (doc.queryCommandEnabled(cmd)) {
                                doc.execCommand(cmd, false, args);
                            }
                            else if (cmd == "insertHTML") {
                                that.selection.insertContent(args);
                            }
                            else {
                                return false;
                            }
                        }
                    }
                    catch (er) {
                        if (cmd == "insertHTML") {
                            that.selection.insertContent(args);
                        }
                        else {
                            return false;
                        }
                    }
                }

                if ($.jqx.mobile.isTouchDevice()) {
                    setTimeout(function () {
                        if (that.iframe) {
                            that.iframe[0].contentWindow.focus();
                        }
                    }, 500);
                }

                that._raiseEvent("change", {
                    command: cmd,
                    args: args
                });
                that.changed = true;
                that.range = that.getRange();
            }
        },

        destroy: function () {
            var that = this;
            that._removeHandlers();
            var tools = that.tools.split(" ");
            var toolGroups = that.tools.split(" | ");
            $.jqx.utilities.resize(this.host, null, true);

            var destroyTools = function (tools) {
                $.each(tools, function (index, value) {
                    var tool = that.commands[this];
                    if (!tool) {
                        return true;
                    }

                    switch (tool.type) {
                        case 'list':
                            tool.widget.jqxDropDownList('destroy');
                            break;
                        case 'colorPicker':
                            tool.colorPicker.remove();
                            tool.widget.jqxDropDownButton('destroy');
                            break;
                        case "toggleButton":
                            tool.widget.jqxToggleButton('destroy');
                            break;
                        case "custom":
                            if (that.destroyTool) that.destroyTool(this);
                            break;
                        case "button":
                        default:
                            tool.widget.jqxToggleButton('destroy');
                            if (tool.command === "insertimage") {
                                if ($("#imageWindow" + that.element.id).length > 0) {
                                    $("#imageWindow" + that.element.id).find('.jqx-editor-align').jqxDropDownList("destroy");
                                    $("#imageWindow" + that.element.id).find('button').jqxButton('destroy');
                                }
                            }
                            else if (tool.command === "createlink") {
                                if ($("#linkWindow" + that.element.id).length > 0) {
                                    $("#linkWindow" + that.element.id).find('.jqx-editor-align').jqxDropDownList("destroy");
                                    $("#linkWindow" + that.element.id).find('button').jqxButton('destroy');
                                    $("#linkWindow" + that.element.id).find('.jqx-editor-link-checkbox').jqxCheckBox('destroy');
                                }
                            }
                            break;
                    }
                });
            }

            if (toolGroups.length == 0) {
                destroyTools(tools);
            }
            else {
                for (var i = 0; i < toolGroups.length; i++) {
                    var toolGroup = toolGroups[i];
                    var tools = toolGroup.split(" ");
                    destroyTools(tools);
                }
            }
            var linkWindow = $("#" + "linkWindow" + this.element.id);
            var imageWindow = $("#" + "imageWindow" + this.element.id);
            if (linkWindow && linkWindow.length > 0) {
                linkWindow.jqxWindow('destroy');
            }
            if (imageWindow && imageWindow.length > 0) {
                imageWindow.jqxWindow('destroy');
            }

            if (that.inline) {
                that.toolbar.remove();
            }
            else {
                that.widget.remove();
                that.host.remove();
            }
            that.iframe.remove();
            that.iframe = null;
            that.selection = null;
            that.editorDocument = null;
            that.contentEditableElement = null;
        },

        _raiseEvent: function (id, arg) {
            if (arg == undefined)
                arg = { owner: null };

            if (this._documentMode == "source")
                return true;

            var evt = id;
            arg.type = this.changeType;
            this.changeType = null;
            var args = arg;
            args.owner = this;

            var event = new $.Event(evt);
            event.owner = this;
            event.args = args;
            if (this._textArea) {
                var result = $(this._textArea).trigger(event);
            }
            else {
                var result = this.host.trigger(event);
            }

            // save the new event arguments.
            arg = event.args;
            return result;
        }
    });

    var jqxSelection = function (document) {
        var selection = {
            initialize: function (document) {
                this.document = document;
            },

            getSelection: function () {
                return (this.document.getSelection) ? this.document.getSelection() : this.document.selection;
            },

            getRange: function () {
                var s = this.getSelection();

                if (!s) return null;

                try {
                    return s.rangeCount > 0 ? s.getRangeAt(0) : (this.document.createRange ? this.document.createRange() : this.document.selection.createRange());
                } catch (e) {
                    // IE bug when used in frameset
                    return this.document.body.createTextRange();
                }
            },

            selectRange: function (range) {
                if (range.select) {
                    range.select();
                } else {
                    var s = this.getSelection();
                    if (s.addRange) {
                        s.removeAllRanges();
                        s.addRange(range);
                    }
                }
            },

            selectNode: function (node, collapse) {
                var r = this.getRange();
                var s = this.getSelection();

                if (r.moveToElementText) {
                    r.moveToElementText(node);
                    r.select();
                } else if (s.addRange) {
                    try {
                        collapse ? r.selectNodeContents(node) : r.selectNode(node);
                        s.removeAllRanges();
                        s.addRange(r);
                    }
                    catch (error) {
                        var er = error;
                    }
                } else {
                    s.setBaseAndExtent(node, 0, node, 1);
                }

                return node;
            },

            isCollapsed: function () {
                var r = this.getRange();
                if (r.item) return false;
                return r.boundingWidth == 0 || this.getSelection().isCollapsed;
            },

            collapse: function (toStart) {
                var r = this.getRange();
                var s = this.getSelection();

                if (r.select) {
                    r.collapse(toStart);
                    r.select();
                } else {
                    toStart ? s.collapseToStart() : s.collapseToEnd();
                }
            },

            getContent: function () {
                var r = this.getRange();
                var body = $('<div>')[0];

                if (this.isCollapsed()) return '';

                if (r.cloneContents) {
                    body.appendChild(r.cloneContents());
                } else if (r.item != undefined || r.htmlText != undefined) {
                    $(body).html(r.item ? r.item(0).outerHTML : r.htmlText);
                } else {
                    $(body).html(r.toString());
                }

                var content = $(body).html();
                return content;
            },

            getText: function () {
                var r = this.getRange();
                var s = this.getSelection();
                return this.isCollapsed() ? '' : r.text || (s.toString ? s.toString() : '');
            },

            getNode: function () {
                var r = this.getRange();

                if (!$.jqx.browser.msie || $.jqx.browser.version >= 9) {
                    var el = null;

                    if (r) {
                        el = r.commonAncestorContainer;

                        // Handle selection a image or other control like element such as anchors
                        if (!r.collapsed)
                            if (r.startContainer == r.endContainer)
                                if (r.startOffset - r.endOffset < 2)
                                    if (r.startContainer.hasChildNodes())
                                        el = r.startContainer.childNodes[r.startOffset];

                        while (typeof (el) != 'element') el = el.parentNode;
                    }

                    return document.id(el);
                }

                return document.id(r.item ? r.item(0) : r.parentElement());
            },

            insertContent: function (content) {
                var r = this.getRange();
                if (r.pasteHTML) {
                    r.pasteHTML(content);
                    r.collapse(false);
                    r.select();
                } else if (r.insertNode) {
                    r.deleteContents();
                    if (r.createContextualFragment) {
                        r.insertNode(r.createContextualFragment(content));
                    } else {
                        var doc = this.document;
                        var fragment = doc.createDocumentFragment();
                        var temp = doc.createElement('div');
                        fragment.appendChild(temp);
                        temp.outerHTML = content;
                        r.insertNode(fragment);
                    }
                }
            }
        };
        selection.initialize(document);
        return selection;
    }

})(jqxBaseFramework);
})();
