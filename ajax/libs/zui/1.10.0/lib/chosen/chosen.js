/* ========================================================================
 * Chosen: chosen.js [version 1.1.0]
 * https://github.com/harvesthq/chosen
 *
 * Chosen, a Select Box Enhancer for jQuery and Prototype
 * by Patrick Filler for Harvest, http://getharvest.com
 *
 * ZUI: The file has been changed in ZUI. It will not keep update with the
 * official version in the future.
 * http://openzui.com
 * ========================================================================
 * Copyright (c) 2011 Harvest http://getharvest.com
 * MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
 * ========================================================================
 * Improvement in ZUI:
 * 1. New option 'drop_direction': 'auto' | 'top' | 'bottom';
 * 2. Enhance the search experience, support search items by custom data
 *    with 'data-keys=*' attribute in option;
 * 3. ‘middle_highlight’ option can make hightlight item in the middle of
 *    the dropdown menu;
 * 4. 'compact_search' option
 * 5. 'drop_width' option
 * 6. 'max_drop_width' option
 * 7. 'highlight_selected' option
 * 8. 'no_wrap' option
 * 9. 'sort_field' option
 * 10.'sort_value_splitter' option
 * ======================================================================== */


/*!
Chosen, a Select Box Enhancer for jQuery and Prototype
by Patrick Filler for Harvest, http://getharvest.com

Version 1.1.0
Full source at https://github.com/harvesthq/chosen
Copyright (c) 2011 Harvest http://getharvest.com

MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
*/


(function() {
    var $, AbstractChosen, Chosen, SelectParser, _ref,
        __hasProp = {}.hasOwnProperty,
        __extends = function(child, parent) {
            for(var key in parent) {
                if(__hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };

    var LANGUAGES = {
        zh_cn: {
            no_results_text: '没有找到'
        },
        zh_tw: {
            no_results_text: '沒有找到'
        },
        en: {
            no_results_text: 'No results match'
        }
    };

    var DEFAULTS = {};

    SelectParser = (function() {
        function SelectParser() {
            this.options_index = 0;
            this.parsed = [];
        }

        SelectParser.prototype.add_node = function(child) {
            if(child.nodeName.toUpperCase() === "OPTGROUP") {
                return this.add_group(child);
            } else {
                return this.add_option(child);
            }
        };

        SelectParser.prototype.add_group = function(group) {
            var group_position, option, _i, _len, _ref, _results;
            group_position = this.parsed.length;
            this.parsed.push({
                array_index: group_position,
                group: true,
                label: this.escapeExpression(group.label),
                children: 0,
                disabled: group.disabled,
                title: group.title,
                search_keys: ($.trim(group.getAttribute('data-keys') || '')).replace(/,/g, ' ')
            });
            _ref = group.childNodes;
            _results = [];
            for(_i = 0, _len = _ref.length; _i < _len; _i++) {
                option = _ref[_i];
                _results.push(this.add_option(option, group_position, group.disabled));
            }
            return _results;
        };

        SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
            if(option.nodeName.toUpperCase() === "OPTION") {
                if(option.text !== "") {
                    if(group_position != null) {
                        this.parsed[group_position].children += 1;
                    }
                    this.parsed.push({
                        array_index: this.parsed.length,
                        options_index: this.options_index,
                        value: option.value,
                        text: option.text,
                        title: option.title,
                        html: option.innerHTML,
                        selected: option.selected,
                        disabled: group_disabled === true ? group_disabled : option.disabled,
                        group_array_index: group_position,
                        classes: option.className,
                        style: option.style.cssText,
                        data: option.getAttribute('data-data'),
                        search_keys: ($.trim(option.getAttribute('data-keys') || '') + option.value).replace(/,/, ' ')
                    });
                } else {
                    this.parsed.push({
                        array_index: this.parsed.length,
                        options_index: this.options_index,
                        empty: true
                    });
                }
                return this.options_index += 1;
            }
        };

        SelectParser.prototype.escapeExpression = function(text) {
            var map, unsafe_chars;
            if((text == null) || text === false) {
                return "";
            }
            if(!/[\&\<\>\"\'\`]/.test(text)) {
                return text;
            }
            map = {
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            };
            unsafe_chars = /&(?!\w+;)|[\<\>\"\'\`]/g;
            return text.replace(unsafe_chars, function(chr) {
                return map[chr] || "&amp;";
            });
        };

        return SelectParser;

    })();

    SelectParser.select_to_array = function(select) {
        var child, parser, _i, _len, _ref;
        parser = new SelectParser();
        _ref = select.childNodes;
        for(_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            parser.add_node(child);
        }
        return parser.parsed;
    };

    AbstractChosen = (function() {
        function AbstractChosen(form_field, options) {
            this.form_field = form_field;
            this.options = $.extend({}, DEFAULTS, options != null ? options : {});
            if(!AbstractChosen.browser_is_supported()) {
                return;
            }

            var lang = this.options.lang || $.zui.clientLang ? $.zui.clientLang() : 'en';
            var defaultLang = $.zui.clientLang ? $.zui.clientLang() : 'en';
            if ($.isPlainObject(lang)) {
                this.lang = $.zui.getLangData ? $.zui.getLangData('chosen', defaultLang, LANGUAGES) : $.extend(lang, LANGUAGES.en, LANGUAGES[defaultLang]);
            } else {
                this.lang = $.zui.getLangData ? $.zui.getLangData('chosen', lang, LANGUAGES) : (LANGUAGES[lang || defaultLang] || LANGUAGES.en);
            }
            this.is_multiple = this.form_field.multiple;
            this.set_default_text();
            this.set_default_values();
            this.setup();
            this.set_up_html();
            this.register_observers();
        }

        AbstractChosen.prototype.set_default_values = function() {
            var _this = this;
            var _options = _this.options;
            _this.click_test_action = function(evt) {
                return _this.test_active_click(evt);
            };
            _this.activate_action = function(evt) {
                return _this.activate_field(evt);
            };
            _this.active_field = false;
            _this.mouse_on_container = false;
            _this.results_showing = false;
            _this.result_highlighted = null;
            _this.allow_single_deselect = (_options.allow_single_deselect != null) && (this.form_field.options[0] != null) && _this.form_field.options[0].text === "" ? _options.allow_single_deselect : false;
            _this.disable_search_threshold = _options.disable_search_threshold || 0;
            _this.disable_search = _options.disable_search || false;
            _this.enable_split_word_search = _options.enable_split_word_search != null ? _options.enable_split_word_search : true;
            _this.group_search = _options.group_search != null ? _options.group_search : true;
            _this.search_contains = _options.search_contains || false;
            _this.single_backstroke_delete = _options.single_backstroke_delete != null ? _options.single_backstroke_delete : true;
            _this.max_selected_options = _options.max_selected_options || Infinity;
            _this.drop_direction = _options.drop_direction || 'auto';
            _this.drop_item_height = _options.drop_item_height !== undefined ? _options.drop_item_height : 25;
            _this.max_drop_height = _options.max_drop_height !== undefined ? _options.max_drop_height : 240;
            _this.middle_highlight = _options.middle_highlight;
            _this.compact_search = _options.compact_search || false;
            _this.inherit_select_classes = _options.inherit_select_classes || false;
            _this.display_selected_options = _options.display_selected_options != null ? _options.display_selected_options : true;
            _this.sort_value_splitter = _options.sort_value_spliter || _options.sort_value_splitter || ',';
            _this.sort_field = _options.sort_field;
            var max_drop_width = _options.max_drop_width;
            if (typeof max_drop_width === 'string' && max_drop_width.indexOf('px') === (max_drop_width.length - 2)) {
                max_drop_width = parseInt(max_drop_width.substring(0, max_drop_width.length - 2));
            }
            _this.max_drop_width = max_drop_width;

            return _this.display_disabled_options = _options.display_disabled_options != null ? _options.display_disabled_options : true;
        };

        AbstractChosen.prototype.set_default_text = function() {
            if(this.form_field.getAttribute("data-placeholder")) {
                this.default_text = this.form_field.getAttribute("data-placeholder");
            } else if(this.is_multiple) {
                this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
            } else {
                this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
            }
            return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || this.lang.no_results_text || AbstractChosen.default_no_result_text;
        };

        AbstractChosen.prototype.mouse_enter = function() {
            return this.mouse_on_container = true;
        };

        AbstractChosen.prototype.mouse_leave = function() {
            return this.mouse_on_container = false;
        };

        AbstractChosen.prototype.input_focus = function(evt) {
            var _this = this;
            if(this.is_multiple) {
                if(!this.active_field) {
                    return setTimeout((function() {
                        return _this.container_mousedown();
                    }), 50);
                }
            } else {
                if(!this.active_field) {
                    return this.activate_field();
                }
            }
        };

        AbstractChosen.prototype.input_blur = function(evt) {
            var _this = this;
            if(!this.mouse_on_container) {
                this.active_field = false;
                return setTimeout((function() {
                    return _this.blur_test();
                }), 100);
            }
        };

        AbstractChosen.prototype.results_option_build = function(options) {
            var content, data, _i, _len, _ref;
            content = '';
            _ref = this.results_data;
            var _firstSelections = (options && options.first) ? [] : null;
            for(_i = 0, _len = _ref.length; _i < _len; _i++) {
                data = _ref[_i];
                if(data.group) {
                    content += this.result_add_group(data);
                } else {
                    content += this.result_add_option(data);
                }
                if(_firstSelections && data.selected) {
                    _firstSelections.push(data);

                }
            }
            if (_firstSelections) {
                var $selectField;
                var sortValues;
                if(this.sort_field && this.is_multiple) {
                    $selectField = $(this.sort_field);
                    var sortFieldValue = $selectField.val();
                    sortValues = (typeof sortFieldValue === 'string' && sortFieldValue.length) ? sortFieldValue.split(this.sort_value_splitter) : [];
                    if(sortValues.length) {
                        var sortValuesMap = {};
                        for(_i = 0; _i < sortValues.length; ++_i) {
                            sortValuesMap[sortValues[_i]] = _i;
                        }
                        _firstSelections.sort(function(data1, data2) {
                            var data1Value = sortValuesMap[data1.value];
                            var data2Value = sortValuesMap[data2.value];
                            if(data1Value === undefined) data1Value = 0;
                            if(data2Value === undefined) data2Value = 0;
                            return data1Value - data2Value;
                        });
                    }
                }
                sortValues = [];
                for(_i = 0; _i < _firstSelections.length; ++_i) {
                    data = _firstSelections[_i];
                    if(this.is_multiple) {
                        this.choice_build(data);
                        sortValues.push(data.value);
                    } else {
                        this.single_set_selected_text(data.text);
                    }
                }
                if($selectField && $selectField.length) {
                    $selectField.val(sortValues.join(this.sort_value_splitter));
                }
            }
            return content;
        };

        AbstractChosen.prototype.result_add_option = function(option) {
            var classes, option_el;
            if(!option.search_match) {
                return '';
            }
            if(!this.include_option_in_results(option)) {
                return '';
            }
            classes = [];
            if(!option.disabled && !(option.selected && this.is_multiple)) {
                classes.push("active-result");
            }
            if(option.disabled && !(option.selected && this.is_multiple)) {
                classes.push("disabled-result");
            }
            if(option.selected) {
                classes.push("result-selected");
            }
            if(option.group_array_index != null) {
                classes.push("group-option");
            }
            if(option.classes !== "") {
                classes.push(option.classes);
            }
            option_el = document.createElement("li");
            option_el.className = classes.join(" ");
            option_el.style.cssText = option.style;
            option_el.title = option.title;
            option_el.setAttribute("data-option-array-index", option.array_index);
            option_el.setAttribute("data-data", option.data);
            option_el.innerHTML = option.search_text;
            return this.outerHTML(option_el);
        };

        AbstractChosen.prototype.result_add_group = function(group) {
            var group_el;
            if(!(group.search_match || group.group_match)) {
                return '';
            }
            if(!(group.active_options > 0)) {
                return '';
            }
            group_el = document.createElement("li");
            group_el.className = "group-result";
            group_el.title = group.title;
            group_el.innerHTML = group.search_text;
            return this.outerHTML(group_el);
        };

        AbstractChosen.prototype.results_update_field = function() {
            this.set_default_text();
            if(!this.is_multiple) {
                this.results_reset_cleanup();
            }
            this.result_clear_highlight();
            this.results_build();
            if(this.results_showing) {
                this.winnow_results();
                this.autoResizeDrop();
            }
        };

        AbstractChosen.prototype.reset_single_select_options = function() {
            var result, _i, _len, _ref, _results;
            _ref = this.results_data;
            _results = [];
            for(_i = 0, _len = _ref.length; _i < _len; _i++) {
                result = _ref[_i];
                if(result.selected) {
                    _results.push(result.selected = false);
                } else {
                    _results.push(void 0);
                }
            }
            return _results;
        };

        AbstractChosen.prototype.results_toggle = function() {
            if(this.results_showing) {
                return this.results_hide();
            } else {
                return this.results_show();
            }
        };

        AbstractChosen.prototype.results_search = function(evt) {
            if(this.results_showing) {
                return this.winnow_results(1);
            } else {
                return this.results_show();
            }
        };

        AbstractChosen.prototype.winnow_results = function(canMiddleHighlight) {
            var escapedSearchText, option, regex, regexAnchor, results, results_group, searchText, startpos, text, zregex, _i, _len, _ref;
            this.no_results_clear();
            results = 0;
            searchText = this.get_search_text();
            escapedSearchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            regexAnchor = this.search_contains ? "" : "^";
            regex = new RegExp(regexAnchor + escapedSearchText, 'i');
            zregex = new RegExp(escapedSearchText, 'i');
            _ref = this.results_data;
            for(_i = 0, _len = _ref.length; _i < _len; _i++) {
                option = _ref[_i];
                option.search_match = false;
                results_group = null;
                if(this.include_option_in_results(option)) {
                    if(option.group) {
                        option.group_match = false;
                        option.active_options = 0;
                    }
                    if((option.group_array_index != null) && this.results_data[option.group_array_index]) {
                        results_group = this.results_data[option.group_array_index];
                        if(results_group.active_options === 0 && results_group.search_match) {
                            results += 1;
                        }
                        results_group.active_options += 1;
                    }
                    if(!(option.group && !this.group_search)) {
                        option.search_text = option.group ? option.label : option.html;
                        option.search_keys_match = this.search_string_match(option.search_keys, regex);
                        option.search_text_match = this.search_string_match(option.search_text, regex);
                        option.search_match = option.search_text_match || option.search_keys_match;
                        if(option.search_match && !option.group) {
                            results += 1;
                        }
                        if(option.search_match) {
                            if(option.search_text_match && option.search_text.length) {
                                startpos = option.search_text.search(zregex);
                                text = option.search_text.substr(0, startpos + searchText.length) + '</em>' + option.search_text.substr(startpos + searchText.length);
                                option.search_text = text.substr(0, startpos) + '<em>' + text.substr(startpos);
                            } else if(option.search_keys_match && option.search_keys.length) {
                                startpos = option.search_keys.search(zregex);
                                text = option.search_keys.substr(0, startpos + searchText.length) + '</em>' + option.search_keys.substr(startpos + searchText.length);
                                option.search_text += '&nbsp; <small style="opacity: 0.7">' + text.substr(0, startpos) + '<em>' + text.substr(startpos) + '</small>';
                            }
                            if(results_group != null) {
                                results_group.group_match = true;
                            }
                        } else if((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
                            option.search_match = true;
                        }
                    }
                }
            }
            this.result_clear_highlight();
            if(results < 1 && searchText.length) {
                this.update_results_content("");
                return this.no_results(searchText);
            } else {
                this.update_results_content(this.results_option_build());
                return this.winnow_results_set_highlight(canMiddleHighlight);
            }
        };

        AbstractChosen.prototype.search_string_match = function(search_string, regex) {
            var part, parts, _i, _len;
            if(regex.test(search_string)) {
                return true;
            } else if(this.enable_split_word_search && (search_string.indexOf(" ") >= 0 || search_string.indexOf("[") === 0)) {
                parts = search_string.replace(/\[|\]/g, "").split(" ");
                if(parts.length) {
                    for(_i = 0, _len = parts.length; _i < _len; _i++) {
                        part = parts[_i];
                        if(regex.test(part)) {
                            return true;
                        }
                    }
                }
            }
        };

        AbstractChosen.prototype.choices_count = function() {
            var option, _i, _len, _ref;
            if(this.selected_option_count != null) {
                return this.selected_option_count;
            }
            this.selected_option_count = 0;
            _ref = this.form_field.options;
            for(_i = 0, _len = _ref.length; _i < _len; _i++) {
                option = _ref[_i];
                if(option.selected && option.value != '') {
                    this.selected_option_count += 1;
                }
            }
            return this.selected_option_count;
        };

        AbstractChosen.prototype.choices_click = function(evt) {
            evt.preventDefault();
            if(!(this.results_showing || this.is_disabled)) {
                return this.results_show();
            }
        };

        AbstractChosen.prototype.keyup_checker = function(evt) {
            var stroke, _ref;
            stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;
            this.search_field_scale();
            switch(stroke) {
                case 8:
                    if(this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
                        return this.keydown_backstroke();
                    } else if(!this.pending_backstroke) {
                        this.result_clear_highlight();
                        return this.results_search();
                    }
                    break;
                case 13:
                    evt.preventDefault();
                    if(this.results_showing) {
                        return this.result_select(evt);
                    }
                    break;
                case 27:
                    if(this.results_showing) {
                        this.results_hide();
                    }
                    return true;
                case 9:
                case 38:
                case 40:
                case 16:
                case 91:
                case 17:
                    break;
                default:
                    return this.results_search();
            }
        };

        AbstractChosen.prototype.clipboard_event_checker = function(evt) {
            var _this = this;
            return setTimeout((function() {
                return _this.results_search();
            }), 50);
        };

        AbstractChosen.prototype.container_width = function() {
            if (this.options.width != null) {
                return this.options.width;
            } else if (this.form_field && this.form_field.classList && this.form_field.classList.contains('form-control')) {
                return '100%';
            } else {
                return "" + this.form_field.offsetWidth + "px";
            }
        };

        AbstractChosen.prototype.include_option_in_results = function(option) {
            if(this.is_multiple && (!this.display_selected_options && option.selected)) {
                return false;
            }
            if(!this.display_disabled_options && option.disabled) {
                return false;
            }
            if(option.empty) {
                return false;
            }
            return true;
        };

        AbstractChosen.prototype.search_results_touchstart = function(evt) {
            this.touch_started = true;
            return this.search_results_mouseover(evt);
        };

        AbstractChosen.prototype.search_results_touchmove = function(evt) {
            this.touch_started = false;
            return this.search_results_mouseout(evt);
        };

        AbstractChosen.prototype.search_results_touchend = function(evt) {
            if(this.touch_started) {
                return this.search_results_mouseup(evt);
            }
        };

        AbstractChosen.prototype.outerHTML = function(element) {
            var tmp;
            if(element.outerHTML) {
                return element.outerHTML;
            }
            tmp = document.createElement("div");
            tmp.appendChild(element);
            return tmp.innerHTML;
        };

        AbstractChosen.browser_is_supported = function() {
            if(window.navigator.appName === "Microsoft Internet Explorer") {
                return document.documentMode >= 8;
            }
            if(/iP(od|hone)/i.test(window.navigator.userAgent)) {
                return false;
            }
            if(/Android/i.test(window.navigator.userAgent)) {
                if(/Mobile/i.test(window.navigator.userAgent)) {
                    return false;
                }
            }
            return true;
        };

        AbstractChosen.default_multiple_text = "";

        AbstractChosen.default_single_text = "";

        AbstractChosen.default_no_result_text = "No results match";

        return AbstractChosen;

    })();

    $ = jQuery;

    $.fn.extend({
        chosen: function(options) {
            if(!AbstractChosen.browser_is_supported()) {
                return this;
            }
            return this.each(function(input_field) {
                var $this = $(this);
                var chosen = $this.data('chosen');
                if(options === 'destroy' && chosen) {
                    chosen.destroy();
                } else if(!chosen) {
                    $this.data('chosen', new Chosen(this, $.extend({}, $this.data(), options)));
                }
            });
        }
    });

    Chosen = (function(_super) {
        __extends(Chosen, _super);

        function Chosen() {
            _ref = Chosen.__super__.constructor.apply(this, arguments);
            return _ref;
        }

        Chosen.prototype.setup = function() {
            this.form_field_jq = $(this.form_field);
            this.current_selectedIndex = this.form_field.selectedIndex;
            return this.is_rtl = this.form_field_jq.hasClass("chosen-rtl");
        };

        Chosen.prototype.set_up_html = function() {
            var container_classes, container_props;
            container_classes = ["chosen-container"];
            container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));
            if(this.inherit_select_classes && this.form_field.className) {
                container_classes.push(this.form_field.className);
            }
            if(this.is_rtl) {
                container_classes.push("chosen-rtl");
            }
            var strClass = this.form_field.getAttribute('data-css-class');
            if(strClass) {
                container_classes.push(strClass);
            }

            container_props = {
                'class': container_classes.join(' '),
                'style': "width: " + (this.container_width()) + ";",
                'title': this.form_field.title
            };
            if(this.form_field.id.length) {
                container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
            }
            this.container = $("<div />", container_props);
            if(this.is_multiple) {
                this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>');
            } else {
                this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>' + this.default_text + '</span><div><b></b></div><div class="chosen-search"><input type="text" autocomplete="off" /></div></a><div class="chosen-drop"><ul class="chosen-results"></ul></div>');
                if (this.compact_search) {
                    this.container.addClass('chosen-compact').find('.chosen-search').appendTo(this.container.find('.chosen-single'));
                } else {
                    this.container.find('.chosen-search').prependTo(this.container.find('.chosen-drop'));
                }
                if (this.options.highlight_selected !== false) {
                    this.container.addClass('chosen-highlight-selected');
                }
            }
            this.form_field_jq.hide().after(this.container);
            this.dropdown = this.container.find('div.chosen-drop').first();
            this.search_field = this.container.find('input').first();
            this.search_results = this.container.find('ul.chosen-results').first();
            this.search_field_scale();
            this.search_no_results = this.container.find('li.no-results').first();
            if(this.is_multiple) {
                this.search_choices = this.container.find('ul.chosen-choices').first();
                this.search_container = this.container.find('li.search-field').first();
            } else {
                this.search_container = this.container.find('div.chosen-search').first();
                this.selected_item = this.container.find('.chosen-single').first();
            }
            if(this.options.drop_width) {
                this.dropdown.css('width', this.options.drop_width).addClass('chosen-drop-size-limited');
            }
            if (this.max_drop_width) {
                this.dropdown.addClass('chosen-auto-max-width');
            }
            if (this.options.no_wrap) {
                this.dropdown.addClass('chosen-no-wrap');
            }
            this.results_build();
            this.set_tab_index();
            this.set_label_behavior();
            return this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            });
        };

        Chosen.prototype.register_observers = function() {
            var _this = this;
            this.container.bind('mousedown.chosen', function(evt) {
                _this.container_mousedown(evt);
            });
            this.container.bind('mouseup.chosen', function(evt) {
                _this.container_mouseup(evt);
            });
            this.container.bind('mouseenter.chosen', function(evt) {
                _this.mouse_enter(evt);
            });
            this.container.bind('mouseleave.chosen', function(evt) {
                _this.mouse_leave(evt);
            });
            this.search_results.bind('mouseup.chosen', function(evt) {
                _this.search_results_mouseup(evt);
            });
            this.search_results.bind('mouseover.chosen', function(evt) {
                _this.search_results_mouseover(evt);
            });
            this.search_results.bind('mouseout.chosen', function(evt) {
                _this.search_results_mouseout(evt);
            });
            this.search_results.bind('mousewheel.chosen DOMMouseScroll.chosen', function(evt) {
                _this.search_results_mousewheel(evt);
            });
            this.search_results.bind('touchstart.chosen', function(evt) {
                _this.search_results_touchstart(evt);
            });
            this.search_results.bind('touchmove.chosen', function(evt) {
                _this.search_results_touchmove(evt);
            });
            this.search_results.bind('touchend.chosen', function(evt) {
                _this.search_results_touchend(evt);
            });
            this.form_field_jq.bind("chosen:updated.chosen", function(evt) {
                _this.results_update_field(evt);
            });
            this.form_field_jq.bind("chosen:activate.chosen", function(evt) {
                _this.activate_field(evt);
            });
            this.form_field_jq.bind("chosen:open.chosen", function(evt) {
                _this.container_mousedown(evt);
            });
            this.form_field_jq.bind("chosen:close.chosen", function(evt) {
                _this.input_blur(evt);
            });
            this.search_field.bind('blur.chosen', function(evt) {
                _this.input_blur(evt);
            });
            this.search_field.bind('keyup.chosen', function(evt) {
                _this.keyup_checker(evt);
            });
            this.search_field.bind('keydown.chosen', function(evt) {
                _this.keydown_checker(evt);
            });
            this.search_field.bind('focus.chosen', function(evt) {
                _this.input_focus(evt);
            });
            this.search_field.bind('cut.chosen', function(evt) {
                _this.clipboard_event_checker(evt);
            });
            this.search_field.bind('paste.chosen', function(evt) {
                _this.clipboard_event_checker(evt);
            });
            if(this.is_multiple) {
                return this.search_choices.bind('click.chosen', function(evt) {
                    _this.choices_click(evt);
                });
            } else {
                return this.container.bind('click.chosen', function(evt) {
                    evt.preventDefault();
                });
            }
        };

        Chosen.prototype.destroy = function() {
            $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
            if(this.search_field[0].tabIndex) {
                this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
            }
            this.container.remove();
            this.form_field_jq.removeData('chosen');
            return this.form_field_jq.show();
        };

        Chosen.prototype.search_field_disabled = function() {
            this.is_disabled = this.form_field_jq[0].disabled;
            if(this.is_disabled) {
                this.container.addClass('chosen-disabled');
                this.search_field[0].disabled = true;
                if(!this.is_multiple) {
                    this.selected_item.unbind("focus.chosen", this.activate_action);
                }
                return this.close_field();
            } else {
                this.container.removeClass('chosen-disabled');
                this.search_field[0].disabled = false;
                if(!this.is_multiple) {
                    return this.selected_item.bind("focus.chosen", this.activate_action);
                }
            }
        };

        Chosen.prototype.container_mousedown = function(evt) {
            if(!this.is_disabled) {
                if(evt && evt.type === "mousedown" && !this.results_showing) {
                    evt.preventDefault();
                }
                if(!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {
                    if(!this.active_field) {
                        if(this.is_multiple) {
                            this.search_field.val("");
                        }
                        $(this.container[0].ownerDocument).bind('click.chosen', this.click_test_action);
                        this.results_show();
                    } else if(!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
                        evt.preventDefault();
                        this.results_toggle();
                    }
                    return this.activate_field();
                }
            }
        };

        Chosen.prototype.container_mouseup = function(evt) {
            if(evt.target.nodeName === "ABBR" && !this.is_disabled) {
                return this.results_reset(evt);
            }
        };

        Chosen.prototype.search_results_mousewheel = function(evt) {
            var delta;
            if(evt.originalEvent) {
                delta = -evt.originalEvent.wheelDelta || evt.originalEvent.detail;
            }
            if(delta != null) {
                evt.preventDefault();
                if(evt.type === 'DOMMouseScroll') {
                    delta = delta * 40;
                }
                return this.search_results.scrollTop(delta + this.search_results.scrollTop());
            }
        };

        Chosen.prototype.blur_test = function(evt) {
            if(!this.active_field && this.container.hasClass("chosen-container-active")) {
                return this.close_field();
            }
        };

        Chosen.prototype.close_field = function() {
            $(this.container[0].ownerDocument).unbind("click.chosen", this.click_test_action);
            this.active_field = false;
            this.results_hide();
            this.container.removeClass("chosen-container-active");
            this.clear_backstroke();
            this.show_search_field_default();
            return this.search_field_scale();
        };

        Chosen.prototype.activate_field = function() {
            this.container.addClass("chosen-container-active");
            this.active_field = true;
            this.search_field.val(this.search_field.val());
            return this.search_field.focus();
        };

        Chosen.prototype.test_active_click = function(evt) {
            var active_container;
            active_container = $(evt.target).closest('.chosen-container');
            if(active_container.length && this.container[0] === active_container[0]) {
                return this.active_field = true;
            } else {
                return this.close_field();
            }
        };

        Chosen.prototype.results_build = function() {
            this.parsing = true;
            this.selected_option_count = null;
            this.results_data = SelectParser.select_to_array(this.form_field);
            if(this.is_multiple) {
                this.search_choices.find("li.search-choice").remove();
            } else if(!this.is_multiple) {
                this.single_set_selected_text();
                if(this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
                    this.search_field[0].readOnly = true;
                    this.container.addClass("chosen-container-single-nosearch");
                    this.container.removeClass('chosen-with-search');
                } else {
                    this.search_field[0].readOnly = false;
                    this.container.removeClass("chosen-container-single-nosearch");
                    this.container.addClass('chosen-with-search');
                }
            }
            this.update_results_content(this.results_option_build({
                first: true
            }));
            this.search_field_disabled();
            this.show_search_field_default();
            this.search_field_scale();
            return this.parsing = false;
        };

        Chosen.prototype.result_do_highlight = function(el, canMiddleHighlight) {
            if(el.length) {
                var high_bottom, high_top, maxHeight, visible_bottom, visible_top, resultHeight, scrollTop = -1;
                this.result_clear_highlight();
                this.result_highlight = el;

                this.result_highlight.addClass("highlighted");
                maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
                resultHeight = this.result_highlight.outerHeight();
                visible_top = this.search_results.scrollTop();
                visible_bottom = maxHeight + visible_top;
                high_top = this.result_highlight.position().top + this.search_results.scrollTop();
                high_bottom = high_top + resultHeight;

                if(this.middle_highlight && (canMiddleHighlight || this.middle_highlight === 'always')) {
                    scrollTop = Math.min(high_top - resultHeight, Math.max(0, high_top - (maxHeight - resultHeight)/2));
                } else if(high_bottom >= visible_bottom) {
                    scrollTop = (high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0;
                } else if(high_top < visible_top) {
                    scrollTop = high_top;
                }
                if(scrollTop > -1) {
                    this.search_results.scrollTop(scrollTop);
                } else if (this.result_highlight.scrollIntoView) {
                    this.result_highlight.scrollIntoView();
                }
            }
        };

        Chosen.prototype.result_clear_highlight = function() {
            if(this.result_highlight) {
                this.result_highlight.removeClass("highlighted");
            }
            return this.result_highlight = null;
        };

        Chosen.prototype.results_show = function() {
            var that = this;
            if(that.is_multiple && that.max_selected_options <= that.choices_count()) {
                that.form_field_jq.trigger("chosen:maxselected", {
                    chosen: this
                });
                return false;
            }
            that.results_showing = true;
            that.search_field.focus();
            that.search_field.val(that.search_field.val());

            that.container.addClass("chosen-with-drop");

            that.winnow_results(1);

            var dropDirection = that.drop_direction;
            if (typeof dropDirection === 'function') {
                dropDirection = dropDirection.call(this);
            }
            if(dropDirection === 'auto') {
                if (!that.drop_directionFixed) {
                    var $drop = that.container.find('.chosen-drop');
                    var dropHeight = $drop.outerHeight();
                    if (that.drop_item_height && dropHeight < that.max_drop_height) {
                        dropHeight = Math.min(that.max_drop_height, $drop.find('.chosen-results>.active-result').length * that.drop_item_height);
                    }
                    var offset = that.container.offset();
                    if(offset.top + dropHeight + 30 > $(window).height() + $(window).scrollTop()) {
                        dropDirection = 'up';
                    }
                    that.drop_directionFixed = dropDirection;
                } else {
                    dropDirection = that.drop_directionFixed;
                }
            }
            that.container.toggleClass('chosen-up', dropDirection === 'up');

            that.autoResizeDrop();

            return that.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: that
            });
        };

        Chosen.prototype.autoResizeDrop = function() {
            var that = this;
            var maxDropWidth = that.max_drop_width;
            if (maxDropWidth) {
                var $drop = that.container.find('.chosen-drop');
                $drop.removeClass('in');
                var maxWidth = 0;
                var $dropResults = $drop.find('.chosen-results');
                var $dropItems = $dropResults.children('li');
                var paddingLeft = parseFloat($dropResults.css('padding-left').replace('px', ''));
                var paddingRight = parseFloat($dropResults.css('padding-right').replace('px', ''));
                var padding = (isNaN(paddingLeft) ? 0 : paddingLeft) + (isNaN(paddingRight) ? 0 : paddingRight);
                $dropItems.each(function() {
                    maxWidth = Math.max(maxWidth, $(this).outerWidth());
                });
                $drop.css('width', Math.min(maxWidth + padding + 20, maxDropWidth));
                that.fixDropWidthTimer = setTimeout(function() {
                    that.fixDropWidthTimer = null;
                    $drop.addClass('in');
                    that.winnow_results_set_highlight(1);
                }, 50);
            }
        };

        Chosen.prototype.update_results_content = function(content) {
            return this.search_results.html(content);
        };

        Chosen.prototype.results_hide = function() {
            var that = this;
            if (that.fixDropWidthTimer) {
                clearTimeout(that.fixDropWidthTimer);
                that.fixDropWidthTimer = null;
            }
            if(that.results_showing) {
                that.result_clear_highlight();
                that.container.removeClass("chosen-with-drop");
                that.form_field_jq.trigger("chosen:hiding_dropdown", {
                    chosen: that
                });
                that.drop_directionFixed = 0;
            }
            return that.results_showing = false;
        };

        Chosen.prototype.set_tab_index = function(el) {
            var ti;
            if(this.form_field.tabIndex) {
                ti = this.form_field.tabIndex;
                this.form_field.tabIndex = -1;
                return this.search_field[0].tabIndex = ti;
            }
        };

        Chosen.prototype.set_label_behavior = function() {
            var _this = this;
            this.form_field_label = this.form_field_jq.parents("label");
            if(!this.form_field_label.length && this.form_field.id.length) {
                this.form_field_label = $("label[for='" + this.form_field.id + "']");
            }
            if(this.form_field_label.length > 0) {
                return this.form_field_label.bind('click.chosen', function(evt) {
                    if(_this.is_multiple) {
                        return _this.container_mousedown(evt);
                    } else {
                        return _this.activate_field();
                    }
                });
            }
        };

        Chosen.prototype.show_search_field_default = function() {
            if(this.is_multiple && this.choices_count() < 1 && !this.active_field) {
                this.search_field.val(this.default_text);
                return this.search_field.addClass("default");
            } else {
                this.search_field.val("");
                return this.search_field.removeClass("default");
            }
        };

        Chosen.prototype.search_results_mouseup = function(evt) {
            var target;
            target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
            if(target.length) {
                this.result_highlight = target;
                this.result_select(evt);
                return this.search_field.focus();
            }
        };

        Chosen.prototype.search_results_mouseover = function(evt) {
            var target;
            target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
            if(target) {
                return this.result_do_highlight(target);
            }
        };

        Chosen.prototype.search_results_mouseout = function(evt) {
            if($(evt.target).hasClass("active-result" || $(evt.target).parents('.active-result').first())) {
                return this.result_clear_highlight();
            }
        };

        Chosen.prototype.choice_build = function(item) {
            var choice, close_link,
                _this = this;
            choice = $('<li />', {
                "class": "search-choice"
                    /// ZUI change begin
                    /// Set title to span with item value
                    ///            }).html("<span>" + item.html + "</span>");
            }).html("<span title='" + item.html + "'>" + item.html + "</span>");
            /// ZUI change end
            if(item.disabled) {
                choice.addClass('search-choice-disabled');
            } else {
                close_link = $('<a />', {
                    "class": 'search-choice-close',
                    'data-option-array-index': item.array_index
                });
                close_link.bind('click.chosen', function(evt) {
                    return _this.choice_destroy_link_click(evt);
                });
                choice.append(close_link);
            }
            return this.search_container.before(choice);
        };

        Chosen.prototype.choice_destroy_link_click = function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if(!this.is_disabled) {
                return this.choice_destroy($(evt.target));
            }
        };

        Chosen.prototype.choice_destroy = function(link) {
            if(this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
                this.show_search_field_default();
                if(this.is_multiple && this.choices_count() > 0 && this.search_field.val().length < 1) {
                    this.results_hide();
                }
                link.parents('li').first().remove();
                return this.search_field_scale();
            }
        };

        Chosen.prototype.results_reset = function() {
            var oldValue = this.form_field_jq.val();
            this.reset_single_select_options();
            this.form_field.options[0].selected = true;
            this.single_set_selected_text();
            this.show_search_field_default();
            this.results_reset_cleanup();
            var newValue = this.form_field_jq.val();
            var changeData = {selected: newValue};
            if (oldValue !== newValue && !newValue.length) {
                changeData.deselected = oldValue;
            }
            this.form_field_jq.trigger("change", changeData);
            this.sync_sort_field();
            if(this.active_field) {
                return this.results_hide();
            }
        };

        Chosen.prototype.results_reset_cleanup = function() {
            this.current_selectedIndex = this.form_field.selectedIndex;
            return this.selected_item.find("abbr").remove();
        };

        Chosen.prototype.result_select = function(evt) {
            var high, item;
            if(this.result_highlight) {
                high = this.result_highlight;
                this.result_clear_highlight();
                if(this.is_multiple && this.max_selected_options <= this.choices_count()) {
                    this.form_field_jq.trigger("chosen:maxselected", {
                        chosen: this
                    });
                    return false;
                }
                if(this.is_multiple) {
                    high.removeClass("active-result");
                } else {
                    this.reset_single_select_options();
                }
                item = this.results_data[high[0].getAttribute("data-option-array-index")];
                item.selected = true;
                this.form_field.options[item.options_index].selected = true;
                this.selected_option_count = null;
                if(this.is_multiple) {
                    this.choice_build(item);
                } else {
                    this.single_set_selected_text(item.text);
                }
                if(!((evt.metaKey || evt.ctrlKey) && this.is_multiple)) {
                    this.results_hide();
                }
                this.search_field.val("");
                if(this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
                    this.form_field_jq.trigger("change", {
                        'selected': this.form_field.options[item.options_index].value
                    });
                    this.sync_sort_field();
                }
                this.current_selectedIndex = this.form_field.selectedIndex;
                return this.search_field_scale();
            }
        };

        Chosen.prototype.single_set_selected_text = function(text) {
            if(text == null) {
                text = this.default_text;
            }
            if(text === this.default_text) {
                this.selected_item.addClass("chosen-default");
            } else {
                this.single_deselect_control_build();
                this.selected_item.removeClass("chosen-default");
            }
            /// ZUI change begin
            /// Change title with text
            ///         return this.selected_item.find("span").text(text); // old code
            if (this.compact_search) {
                this.search_field.attr('placeholder', text);
            }
            return this.selected_item.find("span").attr('title', text).text(text);
            /// ZUI change end
        };

        Chosen.prototype.sync_sort_field = function() {
            var that = this;
            if (that.is_multiple && that.sort_field) {
                var $sortField = $(that.sort_field);
                if (!$sortField.length) return;
                var sortedValues = [];
                that.search_choices.find('li.search-choice').each(function() {
                    var $choice = $(this);
                    var optionIndex = $choice.children('.search-choice-close').first().data('optionArrayIndex');
                    var optionData = that.results_data[optionIndex];
                    if (optionData && optionData.selected) {
                        sortedValues.push(optionData.value);
                    }
                });
                $sortField.val(sortedValues.join(that.sort_value_splitter)).trigger('change');
            }
        };

        Chosen.prototype.result_deselect = function(pos) {
            var result_data;
            result_data = this.results_data[pos];
            if(!this.form_field.options[result_data.options_index].disabled) {
                result_data.selected = false;
                this.form_field.options[result_data.options_index].selected = false;
                this.selected_option_count = null;
                this.result_clear_highlight();
                if(this.results_showing) {
                    this.winnow_results();
                }
                this.form_field_jq.trigger("change", {
                    deselected: this.form_field.options[result_data.options_index].value
                });
                this.sync_sort_field();
                this.search_field_scale();
                return true;
            } else {
                return false;
            }
        };

        Chosen.prototype.single_deselect_control_build = function() {
            if(!this.allow_single_deselect) {
                return;
            }
            if(!this.selected_item.find("abbr").length) {
                this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
            }
            return this.selected_item.addClass("chosen-single-with-deselect");
        };

        Chosen.prototype.get_search_text = function() {
            if(this.search_field.val() === this.default_text) {
                return "";
            } else {
                return $('<div/>').text($.trim(this.search_field.val())).html();
            }
        };

        Chosen.prototype.winnow_results_set_highlight = function(canMiddleHighlight) {
            var do_high, selected_results;
            selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
            do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
            if(do_high != null) {
                return this.result_do_highlight(do_high, canMiddleHighlight);
            }
        };

        Chosen.prototype.no_results = function(terms) {
            var no_results_html;
            no_results_html = $('<li class="no-results">' + this.results_none_found + ' "<span></span>"</li>');
            no_results_html.find("span").first().html(terms);
            this.search_results.append(no_results_html);
            return this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            });
        };

        Chosen.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove();
        };

        Chosen.prototype.keydown_arrow = function() {
            var next_sib;
            if(this.results_showing && this.result_highlight) {
                next_sib = this.result_highlight.nextAll("li.active-result").first();
                if(next_sib) {
                    return this.result_do_highlight(next_sib);
                }
            } else {
                return this.results_show();
            }
        };

        Chosen.prototype.keyup_arrow = function() {
            var prev_sibs;
            if(!this.results_showing && !this.is_multiple) {
                return this.results_show();
            } else if(this.result_highlight) {
                prev_sibs = this.result_highlight.prevAll("li.active-result");
                if(prev_sibs.length) {
                    return this.result_do_highlight(prev_sibs.first());
                } else {
                    if(this.choices_count() > 0) {
                        this.results_hide();
                    }
                    return this.result_clear_highlight();
                }
            }
        };

        Chosen.prototype.keydown_backstroke = function() {
            var next_available_destroy;
            if(this.pending_backstroke) {
                this.choice_destroy(this.pending_backstroke.find("a").first());
                return this.clear_backstroke();
            } else {
                next_available_destroy = this.search_container.siblings("li.search-choice").last();
                if(next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
                    this.pending_backstroke = next_available_destroy;
                    if(this.single_backstroke_delete) {
                        return this.keydown_backstroke();
                    } else {
                        return this.pending_backstroke.addClass("search-choice-focus");
                    }
                }
            }
        };

        Chosen.prototype.clear_backstroke = function() {
            if(this.pending_backstroke) {
                this.pending_backstroke.removeClass("search-choice-focus");
            }
            return this.pending_backstroke = null;
        };

        Chosen.prototype.keydown_checker = function(evt) {
            var stroke, _ref1;
            stroke = (_ref1 = evt.which) != null ? _ref1 : evt.keyCode;
            this.search_field_scale();
            if(stroke !== 8 && this.pending_backstroke) {
                this.clear_backstroke();
            }
            switch(stroke) {
                case 8:
                    this.backstroke_length = this.search_field.val().length;
                    break;
                case 9:
                    if(this.results_showing && !this.is_multiple) {
                        this.result_select(evt);
                    }
                    this.mouse_on_container = false;
                    break;
                case 13:
                    evt.preventDefault();
                    break;
                case 38:
                    evt.preventDefault();
                    this.keyup_arrow();
                    break;
                case 40:
                    evt.preventDefault();
                    this.keydown_arrow();
                    break;
            }
        };

        Chosen.prototype.search_field_scale = function() {
            var div, f_width, h, style, style_block, styles, w, _i, _len;
            if(this.is_multiple) {
                h = 0;
                w = 0;
                style_block = "position:absolute; left: -1000px; top: -1000px; display:none;";
                styles = ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'];
                for(_i = 0, _len = styles.length; _i < _len; _i++) {
                    style = styles[_i];
                    style_block += style + ":" + this.search_field.css(style) + ";";
                }
                div = $('<div />', {
                    'style': style_block
                });
                div.text(this.search_field.val());
                $('body').append(div);
                w = div.width() + 25;
                div.remove();
                f_width = this.container.outerWidth();
                if(w > f_width - 10) {
                    w = f_width - 10;
                }
                return this.search_field.css({
                    'width': w + 'px'
                });
            }
        };

        return Chosen;

    })(AbstractChosen);

    Chosen.DEFAULTS = DEFAULTS;
    Chosen.LANGUAGES = LANGUAGES;
    $.fn.chosen.Constructor = Chosen;
}).call(this);
