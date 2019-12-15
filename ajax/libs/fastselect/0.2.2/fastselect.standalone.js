;(function($, window, document) {

    var $document = $(document),
        instanceNum = 0,
        keyMap = {
            13: 'enter',
            27: 'escape',
            40: 'downArrow',
            38: 'upArrow'
        };

    function Fastsearch(inputElement, options) {

        this.init.apply(this, arguments);

    }

    $.extend(Fastsearch.prototype, {

        init: function(inputElement, options) {

            options = this.options = $.extend(true, {}, Fastsearch.defaults, options);

            this.$input = $(inputElement);
            this.$el = options.wrapSelector instanceof $ ? options.wrapSelector : this.$input.closest(options.wrapSelector);

            Fastsearch.pickTo(options, this.$el.data(), [
                'url', 'onItemSelect', 'noResultsText', 'inputIdName', 'apiInputName'
            ]);

            options.url = options.url || this.$el.attr('action');

            this.ens = '.fastsearch' + (++instanceNum);
            this.itemSelector = Fastsearch.selectorFromClass(options.itemClass);
            this.focusedItemSelector = Fastsearch.selectorFromClass(options.focusedItemClass);

            this.events();

        },

        namespaceEvents: function(events) {

            var eventNamespace = this.ens;

            return events.replace(/\w\b/g, function(match) {
                return match + eventNamespace;
            });

        },

        events: function() {

            var self = this,
                options = this.options;

            this.$input.on(this.namespaceEvents('keyup focus click'), function(e) {

                keyMap[e.keyCode] !== 'enter' && self.handleTyping();

            }).on(this.namespaceEvents('keydown'), function(e) {

                keyMap[e.keyCode] === 'enter' && options.preventSubmit && e.preventDefault();

                if (self.hasResults && self.resultsOpened) {

                    switch (keyMap[e.keyCode]) {
                        case 'downArrow': e.preventDefault(); self.navigateItem('down'); break;
                        case 'upArrow': e.preventDefault(); self.navigateItem('up'); break;
                        case 'enter': self.onEnter(e); break;
                    }

                }

            });

            this.$el.on(this.namespaceEvents('click'), this.itemSelector, function(e) {

                e.preventDefault();
                self.handleItemSelect($(this));

            });

            options.mouseEvents && this.$el.on(this.namespaceEvents('mouseleave'), this.itemSelector, function(e) {

                $(this).removeClass(options.focusedItemClass);

            }).on(this.namespaceEvents('mouseenter'), this.itemSelector, function(e) {

                self.$resultItems.removeClass(options.focusedItemClass);
                $(this).addClass(options.focusedItemClass);

            });

        },

        handleTyping: function() {

            var inputValue = $.trim(this.$input.val()),
                self = this;

            if (inputValue.length < this.options.minQueryLength) {

                this.hideResults();

            } else if (inputValue === this.query) {

                this.showResults();

            } else {

                clearTimeout(this.keyupTimeout);

                this.keyupTimeout = setTimeout(function() {

                    self.$el.addClass(self.options.loadingClass);

                    self.query = inputValue;

                    self.getResults(function(data) {

                        self.showResults(self.storeResponse(data).generateResults(data));

                    });

                }, this.options.typeTimeout);

            }

        },

        getResults: function(callback) {

            var self = this,
                options = this.options,
                formValues = this.$el.find('input, textarea, select').serializeArray();

            if (options.apiInputName) {
                formValues.push({'name': options.apiInputName, 'value': this.$input.val()});
            }

            $.get(options.url, formValues, function(data) {

                callback(options.parseResponse ? options.parseResponse.call(self, data, self) : data);

            });

        },

        storeResponse: function(data) {

            this.responseData = data;
            this.hasResults = data.length !== 0;

            return this;

        },

        generateResults: function(data) {

            var $allResults = $('<div>'),
                options = this.options;

            if (options.template) {
                return $(options.template(data, this));
            }

            if (data.length === 0) {

                $allResults.html(
                    '<p class="' + options.noResultsClass + '">' +
                        (typeof options.noResultsText === 'function' ? options.noResultsText.call(this) : options.noResultsText) +
                    '</p>'
                );

            } else {

                if (this.options.responseType === 'html') {

                    $allResults.html(data);

                } else {

                    this['generate' + (data[0][options.responseFormat.groupItems] ? 'GroupedResults' : 'SimpleResults')](data, $allResults);

                }

            }

            return $allResults.children();

        },

        generateSimpleResults: function(data, $cont) {

            var self = this;

            this.itemModels = data;

            $.each(data, function(i, item) {
                $cont.append(self.generateItem(item));
            });

        },

        generateGroupedResults: function(data, $cont) {

            var self = this,
                options = this.options,
                format = options.responseFormat;

            this.itemModels = [];

            $.each(data, function(i, groupData) {

                var $group = $('<div class="' + options.groupClass + '">').appendTo($cont);

                groupData[format.groupCaption] && $group.append(
                    '<h3 class="' + options.groupTitleClass + '">' + groupData[format.groupCaption] + '</h3>'
                );

                $.each(groupData.items, function(i, item) {

                    self.itemModels.push(item);
                    $group.append(self.generateItem(item));

                });

                options.onGroupCreate && options.onGroupCreate.call(self, $group, groupData, self);

            });

        },

        generateItem: function(item) {

            var options = this.options,
                format = options.responseFormat,
                url = item[format.url],
                html = item[format.html] || item[format.label],
                $tag = $('<' + (url ? 'a' : 'span') + '>').html(html).addClass(options.itemClass);

            url && $tag.attr('href', url);

            options.onItemCreate && options.onItemCreate.call(this, $tag, item, this);

            return $tag;

        },

        showResults: function($content) {

            if (!$content && this.resultsOpened) {
                return;
            }

            this.$el.removeClass(this.options.loadingClass).addClass(this.options.resultsOpenedClass);

            this.$resultsCont = this.$resultsCont || $('<div>').addClass(this.options.resultsContClass).appendTo(this.$el);

            if ($content) {

                this.$resultsCont.html($content);
                this.$resultItems = this.$resultsCont.find(this.itemSelector);
                this.options.onResultsCreate && this.options.onResultsCreate.call(this, this.$resultsCont, this.responseData, this);

            }

            if (!this.resultsOpened) {

                this.documentCancelEvents('on');
                this.$input.trigger('openingResults');

            }

            this.resultsOpened = true;

        },

        documentCancelEvents: function(setup, onCancel) {

            var self = this;

            if (setup === 'off' && this.closeEventsSetuped) {

                $document.off(this.ens);
                this.closeEventsSetuped = false;
                return;

            } else if (setup === 'on' && !this.closeEventsSetuped) {

                $document.on(this.namespaceEvents('click keyup'), function(e) {

                    if (keyMap[e.keyCode] === 'escape' || (!$(e.target).is(self.$el) && !$.contains(self.$el.get(0), e.target) && $.contains(document.documentElement, e.target))) {

                        onCancel ? onCancel.call(self) : self.hideResults();

                    }

                });

                this.closeEventsSetuped = true;

            }

        },

        navigateItem: function(direction) {

            var $currentItem = this.$resultItems.filter(this.focusedItemSelector),
                maxPosition = this.$resultItems.length - 1;

            if ($currentItem.length === 0) {

                this.$resultItems.eq(direction === 'up' ? maxPosition : 0).addClass(this.options.focusedItemClass);
                return;

            }

            var currentPosition = this.$resultItems.index($currentItem),
                nextPosition = direction === 'up' ? currentPosition - 1 : currentPosition + 1;

            nextPosition > maxPosition && (nextPosition = 0);
            nextPosition < 0 && (nextPosition = maxPosition);

            $currentItem.removeClass(this.options.focusedItemClass);

            this.$resultItems.eq(nextPosition).addClass(this.options.focusedItemClass);

        },

        navigateDown: function() {

            this.navigateItem('down');

        },

        navigateUp: function() {

            this.navigateItem('up');

        },

        onEnter: function(e) {

            var $currentItem = this.$resultItems.filter(this.focusedItemSelector);

            if ($currentItem.length) {
                e.preventDefault();
                this.handleItemSelect($currentItem);
            }

        },

        handleItemSelect: function($item) {

            var selectOption = this.options.onItemSelect,
                model = this.itemModels.length ? this.itemModels[this.$resultItems.index($item)] : {};

            this.$input.trigger('itemSelected');

            if (selectOption === 'fillInput') {

                this.fillInput(model);

            } else if (selectOption === 'follow') {

                window.location.href = $item.attr('href');

            } else if (typeof selectOption === 'function') {

                selectOption.call(this, $item, model, this);

            }

        },

        fillInput: function(model) {

            var options = this.options,
                format = options.responseFormat;

            this.query = model[format.label];
            this.$input.val(model[format.label]).trigger('change');

            if (options.fillInputId && model.id) {

                if (!this.$inputId) {

                    var inputIdName = options.inputIdName || this.$input.attr('name') + '_id';

                    this.$inputId = this.$el.find('input[name="' + inputIdName + '"]');

                    if (!this.$inputId.length) {
                        this.$inputId = $('<input type="hidden" name="' + inputIdName + '" />').appendTo(this.$el);
                    }

                }

                this.$inputId.val(model.id).trigger('change');

            }

            this.hideResults();

        },

        hideResults: function() {

            if (this.resultsOpened) {

                this.resultsOpened = false;
                this.$el.removeClass(this.options.resultsOpenedClass);
                this.$input.trigger('closingResults');
                this.documentCancelEvents('off');

            }

            return this;

        },

        clear: function() {

            this.hideResults();
            this.$input.val('').trigger('change');

            return this;

        },

        destroy: function() {

            $document.off(this.ens);

            this.$input.off(this.ens);

            this.$el.off(this.ens)
                .removeClass(this.options.resultsOpenedClass)
                .removeClass(this.options.loadingClass);

            if (this.$resultsCont) {

                this.$resultsCont.remove();
                delete this.$resultsCont;

            }

            delete this.$el.data().fastsearch;

        }

    });

    $.extend(Fastsearch, {

        pickTo: function(dest, src, keys) {

            $.each(keys, function(i, key) {
                dest[key] = (src && src[key]) || dest[key];
            });

            return dest;

        },

        selectorFromClass: function(classes) {

            return '.' + classes.replace(/\s/g, '.');

        }

    });

    Fastsearch.defaults = {
        wrapSelector: 'form', // fastsearch container defaults to closest form. Provide selector for something other
        url: null, // plugin will get data from data-url propery, url option or container action attribute
        responseType: 'JSON', // default expected server response type - can be set to html if that is what server returns
        preventSubmit: false, // prevent submit of form with enter keypress

        resultsContClass: 'fs_results', // html classes
        resultsOpenedClass: 'fsr_opened',
        groupClass: 'fs_group',
        itemClass: 'fs_result_item',
        groupTitleClass: 'fs_group_title',
        loadingClass: 'loading',
        noResultsClass: 'fs_no_results',
        focusedItemClass: 'focused',

        typeTimeout: 140, // try not to hammer server with request for each keystroke if possible
        minQueryLength: 2, // minimal number of characters needed for plugin to send request to server

        template: null, // provide your template function if you need one - function(data, fastsearchApi)
        mouseEvents: !('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0), // detect if client is touch enabled so plugin can decide if mouse specific events should be set.

        responseFormat: { // Adjust where plugin looks for data in your JSON server response
            url: 'url',
            html: 'html',
            label: 'label',
            groupCaption: 'caption',
            groupItems: 'items'
        },

        fillInputId: true, // on item select plugin will try to write selected id from item data model to input
        inputIdName: null, // on item select plugin will try to write selected id from item data model to input with this name

        apiInputName: null, // by default plugin will post input name as query parameter - you can provide custom one here

        noResultsText: 'No results found',
        onItemSelect: 'follow', // by default plugin follows selected link - other options available are "fillInput" and custom callback - function($item, model, fastsearchApi)

        parseResponse: null, // parse server response with your handler and return processed data - function(response, fastsearchApi)
        onResultsCreate: null, // adjust results element - function($allResults, data, fastsearchApi)
        onGroupCreate: null, // adjust group element when created - function($group, groupModel, fastsearchApi)
        onItemCreate: null // adjust item element when created - function($item, model, fastsearchApi)
    };

    $.fastsearch = Fastsearch;

    $.fn.fastsearch = function(options) {
        return this.each(function() {
            if (!$.data(this, 'fastsearch')) {
                $.data(this, 'fastsearch', new Fastsearch(this, options));
            }
        });
    };

})(window.jQuery || window.Zepto, window, document);

;(function($) {

    var $document = $(document),
        instanceNum = 0,
        Fastsearch = $.fastsearch,
        pickTo = Fastsearch.pickTo,
        selectorFromClass = Fastsearch.selectorFromClass;

    function Fastselect(inputElement, options) {

        this.init.apply(this, arguments);

    }

    $.extend(Fastselect.prototype, {

        init: function(inputElement, options) {

            this.$input = $(inputElement);

            this.options = pickTo($.extend(true, {}, Fastselect.defaults, options, {
                placeholder: this.$input.attr('placeholder')
            }), this.$input.data(), [
                'url', 'loadOnce', 'apiParam', 'initialValue'
            ]);

            this.ens = '.fastselect' + (++instanceNum);
            this.hasCustomLoader = this.$input.is('input');
            this.isMultiple = !!this.$input.attr('multiple');

            this.optionsCollection = new OptionsCollection(pickTo({multipleValues: this.isMultiple}, this.options, [
                'url', 'loadOnce', 'parseData', 'matcher'
            ]));

            this.setupDomElements();
            this.setupFastsearch();
            this.setupEvents();

        },

        setupDomElements: function() {

            this.$el = $('<div>').addClass(this.options.elementClass);

            this[this.isMultiple ? 'setupMultipleElement' : 'setupSingleElement'](function() {

                this.updateDomElements();
                this.$controls.appendTo(this.$el);
                this.$el.insertAfter(this.$input);
                this.$input.detach().appendTo(this.$el);

            });

        },

        setupSingleElement: function(onDone) {

            var initialOptions = this.processInitialOptions(),
                toggleBtnText = initialOptions && initialOptions.length ? initialOptions[0].text : this.options.placeholder;

            this.$el.addClass(this.options.singleModeClass);
            this.$controls = $('<div>').addClass(this.options.controlsClass);
            this.$toggleBtn = $('<div>').addClass(this.options.toggleButtonClass).text(toggleBtnText).appendTo(this.$el);
            this.$queryInput = $('<input>').attr('placeholder', this.options.searchPlaceholder).addClass(this.options.queryInputClass).appendTo(this.$controls);

            onDone.call(this);

        },

        setupMultipleElement: function(onDone) {

            var self = this,
                options = self.options,
                initialOptions = this.processInitialOptions();

            this.$el.addClass(options.multipleModeClass);
            this.$controls = $('<div>').addClass(options.controlsClass);
            this.$queryInput = $('<input>').addClass(options.queryInputClass).appendTo(this.$controls);

            initialOptions && $.each(initialOptions, function(i, option) {

                self.addChoiceItem(option);

            });

            onDone.call(this);

        },

        updateDomElements: function() {

            this.$el.toggleClass(this.options.noneSelectedClass, !this.optionsCollection.hasSelectedValues());
            this.adjustQueryInputLayout();

        },

        processInitialOptions: function() {

            var self = this, options;

            if (this.hasCustomLoader) {

                options = this.options.initialValue;

                $.isPlainObject(options) && (options = [options]);

            } else {

                options = $.map(this.$input.find('option:selected').get(), function(option) {

                    var $option = $(option);

                    return {
                        text: $option.text(),
                        value: $option.attr('value')
                    };

                });

            }

            options && $.each(options, function(i, option) {
                self.optionsCollection.setSelected(option);
            });

            return options;

        },

        addChoiceItem: function(optionModel) {

            $(
                '<div data-text="' + optionModel.text + '" data-value="' + optionModel.value + '" class="' + this.options.choiceItemClass + '">' +
                   optionModel.text +
                    '<button class="' + this.options.choiceRemoveClass + '" type="button">×</button>' +
                '</div>'
            ).insertBefore(this.$queryInput);

        },

        setupFastsearch: function() {

            var self = this,
                options = this.options,
                fastSearchParams = {};

            pickTo(fastSearchParams, options, [
                'resultsContClass', 'resultsOpenedClass', 'groupClass', 'itemClass',
                'groupTitleClass', 'loadingClass', 'noResultsClass', 'noResultsText', 'focusedItemClass'
            ]);

            this.fastsearch = new Fastsearch(this.$queryInput.get(0), $.extend(fastSearchParams, {

                wrapSelector: this.isMultiple ? this.$el : this.$controls,

                minQueryLength: 0,
                typeTimeout: this.hasCustomLoader ? options.typeTimeout : 0,
                preventSubmit: true,
                fillInputId: false,

                responseFormat: {
                    label: 'text',
                    groupCaption: 'label'
                },

                onItemSelect: function($item, model, fastsearch) {

                    self.setSelectedOption(model);
                    self.writeToInput();
                    !self.isMultiple && self.hide();
                    options.clearQueryOnSelect && fastsearch.clear();

                    options.onItemSelect && options.onItemSelect.call(self, $item, model, self, fastsearch);

                },

                onItemCreate: function($item, model) {

                    model.$item = $item;
                    model.selected && $item.addClass(options.itemSelectedClass);

                    options.onItemCreate && options.onItemCreate.call(self, $item, model, self);

                }

            }));

            this.fastsearch.getResults = function() {

                self.getOptions(function() {
                    self.renderOptions(true);
                });

            };

        },

        getOptions: function(onDone) {

            var options = this.options,
                self = this,
                params = {};

            if (this.hasCustomLoader) {

                params[options.apiParam] = $.trim(this.$queryInput.val());
                this.optionsCollection.fetch(params, onDone);

            } else {

                !this.optionsCollection.models && this.optionsCollection.reset(this.gleanSelectData(this.$input));
                onDone();

            }

        },

        namespaceEvents: function(events) {

            return Fastsearch.prototype.namespaceEvents.call(this, events);

        },

        setupEvents: function() {

            var self = this,
                options = this.options;

            if (this.isMultiple) {

                this.$el.on(this.namespaceEvents('click'), function(e) {

                    $(e.target).is(selectorFromClass(options.controlsClass)) && self.$queryInput.focus();

                });

                this.$queryInput.on(this.namespaceEvents('keyup'), function(e) {

                    // if (self.$queryInput.val().length === 0 && e.keyCode === 8) {
                    //     console.log('TODO implement delete');
                    // }

                    self.adjustQueryInputLayout();

                }).on(this.namespaceEvents('focus'), function() {

                    self.show();

                });

                this.$el.on(this.namespaceEvents('click'), selectorFromClass(options.choiceRemoveClass), function(e) {

                    var $choice = $(e.currentTarget).closest(selectorFromClass(options.choiceItemClass));

                    self.removeSelectedOption({
                        value: $choice.attr('data-value'),
                        text: $choice.attr('data-text')
                    }, $choice);

                });

            } else {

                this.$el.on(this.namespaceEvents('click'), selectorFromClass(options.toggleButtonClass), function() {

                    self.$el.hasClass(options.activeClass) ? self.hide() : self.show(true);

                });

            }

        },

        adjustQueryInputLayout: function() {

            if (this.isMultiple && this.$queryInput) {

                var noneSelected = this.$el.hasClass(this.options.noneSelectedClass);

                this.$queryInput.toggleClass(this.options.queryInputExpandedClass, noneSelected);

                if (noneSelected) {

                    this.$queryInput.attr({
                        style: '',
                        placeholder: this.options.placeholder
                    });

                } else {

                    this.$fakeInput = this.$fakeInput || $('<span>').addClass(this.options.fakeInputClass);
                    this.$fakeInput.html(this.$queryInput.val().replace(/\s/g, '&nbsp;'));
                    this.$queryInput.removeAttr('placeholder').css('width', this.$fakeInput.insertAfter(this.$queryInput).width() + 20);
                    this.$fakeInput.detach();

                }

            }

        },

        show: function(focus) {

            this.$el.addClass(this.options.activeClass);
            focus ? this.$queryInput.focus() : this.fastsearch.handleTyping();

            this.documentCancelEvents('on');

        },

        hide: function() {

            this.$el.removeClass(this.options.activeClass);

            this.documentCancelEvents('off');

        },

        documentCancelEvents: function(setup) {

            Fastsearch.prototype.documentCancelEvents.call(this, setup, this.hide);

        },

        setSelectedOption: function(option) {

            if (this.optionsCollection.isSelected(option.value)) {
                return;
            }

            this.optionsCollection.setSelected(option);

            var selectedModel = this.optionsCollection.findWhere(function(model) {
                return model.value === option.value;
            });

            if (this.isMultiple) {

                this.$controls && this.addChoiceItem(option);

            } else {

                this.fastsearch && this.fastsearch.$resultItems.removeClass(this.options.itemSelectedClass);
                this.$toggleBtn && this.$toggleBtn.text(option.text);

            }

            selectedModel && selectedModel.$item.addClass(this.options.itemSelectedClass);

            this.updateDomElements();

        },

        removeSelectedOption: function(option, $choiceItem) {

            var removedModel = this.optionsCollection.removeSelected(option);

            if (removedModel && removedModel.$item) {

                removedModel.$item.removeClass(this.options.itemSelectedClass);

            }

            if ($choiceItem) {
                $choiceItem.remove();
            } else {
                this.$el.find(selectorFromClass(this.options.choiceItemClass) + '[data-value="' + option.value + '"]').remove();
            }

            this.updateDomElements();
            this.writeToInput();

        },

        writeToInput: function() {

            var values = this.optionsCollection.getValues(),
                formattedValue = this.isMultiple ? (this.hasCustomLoader ? values.join(',') : values) : values[0];

            this.$input.val(formattedValue).trigger('change');

        },

        renderOptions: function(filter) {

            var data = filter ? this.optionsCollection.filter(this.$queryInput.val()) : this.optionsCollection.models;

            this.fastsearch.showResults(this.fastsearch.storeResponse(data).generateResults(data));

        },

        gleanSelectData: function($select) {

            var self = this,
                $elements = $select.children();

            if ($elements.eq(0).is('optgroup')) {

                return $.map($elements.get(), function(optgroup) {

                    var $optgroup = $(optgroup);

                    return {
                        label: $optgroup.attr('label'),
                        items: self.gleanOptionsData($optgroup.children())
                    };

                });

            } else {

                return this.gleanOptionsData($elements);

            }

        },

        gleanOptionsData: function($options) {

            return $.map($options.get(), function(option) {
                var $option = $(option);
                return {
                    text: $option.text(),
                    value: $option.attr('value'),
                    selected: $option.is(':selected')
                };
            });

        },

        destroy: function() {

            $document.off(this.ens);
            this.fastsearch.destroy();
            this.$input.off(this.ens).detach().insertAfter(this.$el);
            this.$el.off(this.ens).remove();

            this.$input.data() && delete this.$input.data().fastselect;

        }

    });

    function OptionsCollection(options) {

        this.init(options);

    }

    $.extend(OptionsCollection.prototype, {

        defaults: {
            loadOnce: false,
            url: null,
            parseData: null,
            multipleValues: false,
            matcher: function(text, query) {

                return text.toLowerCase().indexOf(query.toLowerCase()) > -1;

            }
        },

        init: function(options) {

            this.options = $.extend({}, this.defaults, options);
            this.selectedValues = {};

        },

        fetch: function(fetchParams, onDone) {

            var self = this,
                afterFetch = function() {
                    self.applySelectedValues(onDone);
                };

            if (this.options.loadOnce) {

                this.fetchDeferred = this.fetchDeferred || this.load(fetchParams);
                this.fetchDeferred.done(afterFetch);

            } else {
                this.load(fetchParams, afterFetch);
            }

        },

        reset: function(models) {

            this.models = this.options.parseData ? this.options.parseData(models) : models;
            this.applySelectedValues();

        },

        applySelectedValues: function(onDone) {

            this.each(function(option) {

                if (this.options.multipleValues && option.selected) {

                    this.selectedValues[option.value] = true;

                } else {

                    option.selected = !!this.selectedValues[option.value];

                }

            });

            onDone && onDone.call(this);

        },

        load: function(params, onDone) {

            var self = this,
                options = this.options;

            return $.get(options.url, params, function(data) {

                self.models = options.parseData ? options.parseData(data) : data;
                onDone && onDone.call(self);

            });

        },

        setSelected: function(option) {

            if (!this.options.multipleValues) {
                this.selectedValues = {};
            }

            this.selectedValues[option.value] = true;
            this.applySelectedValues();

        },

        removeSelected: function(option) {

            var model = this.findWhere(function(model) {
                return option.value === model.value;
            });

            model && (model.selected = false);

            delete this.selectedValues[option.value];

            return model;

        },

        isSelected: function(value) {

            return !!this.selectedValues[value];

        },

        hasSelectedValues: function() {

            return this.getValues().length > 0;

        },

        each: function(iterator) {

            var self = this;

            this.models && $.each(this.models, function(i, option) {

                option.items ? $.each(option.items, function(i, nestedOption) {
                    iterator.call(self, nestedOption);
                }) : iterator.call(self, option);

            });

        },

        where: function(predicate) {

            var temp = [];

            this.each(function(option) {
                predicate(option) && temp.push(option);
            });

            return temp;

        },

        findWhere: function(predicate) {

            var models = this.where(predicate);

            return models.length ? models[0] : undefined;

        },

        filter: function(query) {

            var self = this;

            function checkItem(item) {
                return self.options.matcher(item.text, query) ? item : null;
            }

            if (!query || query.length === 0) {
                return this.models;
            }

            return $.map(this.models, function(item) {

                if (item.items) {

                    var filteredItems = $.map(item.items, checkItem);

                    return filteredItems.length ? {
                        label: item.label,
                        items: filteredItems
                    } : null;

                } else {
                    return checkItem(item);
                }

            });

        },

        getValues: function() {

            return $.map(this.selectedValues, function(prop, key) {
                return prop ? key : null;
            });

        }

    });

    Fastselect.defaults = {

        elementClass: 'fstElement',
        singleModeClass: 'fstSingleMode',
        noneSelectedClass: 'fstNoneSelected',
        multipleModeClass: 'fstMultipleMode',
        queryInputClass: 'fstQueryInput',
        queryInputExpandedClass: 'fstQueryInputExpanded',
        fakeInputClass: 'fstFakeInput',
        controlsClass: 'fstControls',
        toggleButtonClass: 'fstToggleBtn',
        activeClass: 'fstActive',
        itemSelectedClass: 'fstSelected',
        choiceItemClass: 'fstChoiceItem',
        choiceRemoveClass: 'fstChoiceRemove',

        resultsContClass: 'fstResults',
        resultsOpenedClass: 'fstResultsOpened',
        groupClass: 'fstGroup',
        itemClass: 'fstResultItem',
        groupTitleClass: 'fstGroupTitle',
        loadingClass: 'fstLoading',
        noResultsClass: 'fstNoResults',
        focusedItemClass: 'fstFocused',

        matcher: null,

        url: null,
        loadOnce: false,
        apiParam: 'query',
        initialValue: null,
        clearQueryOnSelect: true,
        minQueryLength: 1,
        typeTimeout: 150,

        parseData: null,
        onItemSelect: null,
        onItemCreate: null,

        placeholder: 'Choose option',
        searchPlaceholder: 'Search options',
        noResultsText: 'No results'

    };

    $.Fastselect = Fastselect;
    $.Fastselect.OptionsCollection = OptionsCollection;

    $.fn.fastselect = function(options) {
        return this.each(function() {
            if (!$.data(this, 'fastselect')) {
                $.data(this, 'fastselect', new Fastselect(this, options));
            }
        });
    };

})(window.jQuery || window.Zepto);
