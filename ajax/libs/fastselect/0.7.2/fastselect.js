(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'fastsearch'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'), require('fastsearch'));
    } else {
        factory(root.jQuery);
    }

}(this, function($) {

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
                'url', 'loadOnce', 'apiParam', 'initialValue', 'userOptionAllowed'
            ]);

            this.ens = '.fastselect' + (++instanceNum);
            this.hasCustomLoader = this.$input.is('input');
            this.isMultiple = !!this.$input.attr('multiple');
            this.userOptionAllowed = this.hasCustomLoader && this.isMultiple && this.options.userOptionAllowed;

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
                    $('<div>').html(optionModel.text).text() +
                    '<button class="' + this.options.choiceRemoveClass + '" type="button">×</button>' +
                '</div>'
            ).insertBefore(this.$queryInput);

        },

        setupFastsearch: function() {

            var self = this,
                options = this.options,
                fastSearchParams = {};

            pickTo(fastSearchParams, options, [
                'resultsContClass', 'resultsOpenedClass', 'resultsFlippedClass', 'groupClass', 'itemClass', 'focusFirstItem',
                'groupTitleClass', 'loadingClass', 'noResultsClass', 'noResultsText', 'focusedItemClass', 'flipOnBottom'
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

                    var maxItems = options.maxItems;

                    if (self.isMultiple && maxItems && (self.optionsCollection.getValues().length > (maxItems - 1))) {

                        options.onMaxItemsReached && options.onMaxItemsReached(this);

                    } else {

                        self.setSelectedOption(model);
                        self.writeToInput();
                        !self.isMultiple && self.hide();
                        options.clearQueryOnSelect && fastsearch.clear();

                        if (self.userOptionAllowed && model.isUserOption) {
                            fastsearch.$resultsCont.remove();
                            delete fastsearch.$resultsCont;
                            self.hide();
                        }

                        options.onItemSelect && options.onItemSelect.call(self, $item, model, self, fastsearch);

                    }

                },

                onItemCreate: function($item, model) {

                    model.$item = $item;
                    model.selected && $item.addClass(options.itemSelectedClass);

                    if (self.userOptionAllowed && model.isUserOption) {
                        $item.text(self.options.userOptionPrefix + $item.text()).addClass(self.options.userOptionClass);
                    }

                    options.onItemCreate && options.onItemCreate.call(self, $item, model, self);

                }

            }));

            this.fastsearch.getResults = function() {

                if (self.userOptionAllowed && self.$queryInput.val().length > 1) {
                    self.renderOptions();
                }

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

                var query = $.trim(this.$queryInput.val());

                if (query && options.apiParam) {
                    params[options.apiParam] = query;
                }

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
                    self.show();

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
                    this.$fakeInput.text(this.$queryInput.val().replace(/\s/g, '&nbsp;'));
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
                delimiter = this.options.valueDelimiter,
                formattedValue = this.isMultiple ? (this.hasCustomLoader ? values.join(delimiter) : values) : values[0];

            this.$input.val(formattedValue).trigger('change');

        },

        renderOptions: function(filter) {

            var query = this.$queryInput.val();
            var data;

            if (this.optionsCollection.models) {
                data = (filter ? this.optionsCollection.filter(query) : this.optionsCollection.models).slice(0);
            } else {
                data = [];
            }

            if (this.userOptionAllowed) {

                var queryInList = this.optionsCollection.models && this.optionsCollection.findWhere(function(model) {
                    return model.value === query;
                });

                query && !queryInList && data.unshift({
                    text: query,
                    value: query,
                    isUserOption: true
                });

            }

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
        userOptionClass: 'fstUserOption',

        resultsContClass: 'fstResults',
        resultsOpenedClass: 'fstResultsOpened',
        resultsFlippedClass: 'fstResultsFilpped',
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
        focusFirstItem: false,
        flipOnBottom: true,
        typeTimeout: 150,
        userOptionAllowed: false,
        valueDelimiter: ',',
        maxItems: null,

        parseData: null,
        onItemSelect: null,
        onItemCreate: null,
        onMaxItemsReached: null,

        placeholder: 'Choose option',
        searchPlaceholder: 'Search options',
        noResultsText: 'No results',
        userOptionPrefix: 'Add '

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

    return $;

}));
