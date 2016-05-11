/*
 * knockout-kendo 0.9.7
 * Copyright © 2015 Ryan Niemeyer & Telerik
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
;(function(factory) {
    // CommonJS
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        factory(require('knockout'), require('jquery'), require('kendo'));
        // AMD
    } else if (typeof define === 'function' && define.amd) {
        define(['knockout', 'jquery', 'kendo'], factory);
        // Normal script tag
    } else {
        factory(window.ko, window.jQuery, window.kendo);
    }
}(function(ko, $, kendo, undefined) {

//handle require.js scenarios where kendo is not actually returned
kendo = kendo || window.kendo;

ko.kendo = ko.kendo || {};

var unwrap = ko.utils.unwrapObservable; //support older 2.x KO where ko.unwrap was not defined

ko.kendo.BindingFactory = function() {
    var self = this;

    this.createBinding = function(widgetConfig) {
        //only support widgets that are available when this script runs
        if (!$()[widgetConfig.parent || widgetConfig.name]) {
            return;
        }

        var binding = {};

        //the binding handler's init function
        binding.init = function(element, valueAccessor, all, vm, context) {
            //step 1: build appropriate options for the widget from values passed in and global options
            var options = self.buildOptions(widgetConfig, valueAccessor);

            //apply async, so inner templates can finish content needed during widget initialization
            if (options.async === true || (widgetConfig.async === true && options.async !== false)) {
                setTimeout(function() {
                    binding.setup(element, options, context);
                }, 0);
                return;
            }

            binding.setup(element, options, context);

            if (options && options.useKOTemplates) {
                return { controlsDescendantBindings: true };
            }
        };

        //build the core logic for the init function
        binding.setup = function(element, options, context) {
            var widget, $element = $(element);

            //step 2: setup templates
            self.setupTemplates(widgetConfig.templates, options, element, context);

            //step 3: initialize widget
            widget = self.getWidget(widgetConfig, options, $element);

            //step 4: add handlers for events that we need to react to for updating the model
            self.handleEvents(options, widgetConfig, element, widget, context);

            //step 5: set up computed observables to update the widget when observable model values change
            self.watchValues(widget, options, widgetConfig, element);

            //step 6: handle disposal, if there is a destroy method on the widget
            if (widget.destroy) {
                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    if (widget.element) {
                        if (typeof kendo.destroy === "function") {
                            kendo.destroy(widget.element);
                        } else {
                            widget.destroy();
                        }
                    }
                });
            }
        };

        binding.options = {}; //global options
        binding.widgetConfig = widgetConfig; //expose the options to use in generating tests

        ko.bindingHandlers[widgetConfig.bindingName || widgetConfig.name] = binding;
    };

    //combine options passed in binding with global options
    this.buildOptions = function(widgetConfig, valueAccessor) {
        var defaultOption = widgetConfig.defaultOption,
            options = ko.utils.extend({}, ko.bindingHandlers[widgetConfig.name].options),
            valueOrOptions = unwrap(valueAccessor());

        if (valueOrOptions instanceof kendo.data.DataSource || typeof valueOrOptions !== "object" || valueOrOptions === null || (defaultOption && !(defaultOption in valueOrOptions))) {
            options[defaultOption] = valueAccessor();
        }  else {
            ko.utils.extend(options, valueOrOptions);
        }

        return options;
    };

    var templateRenderer = function(id, context) {
        return function(data) {
            return ko.renderTemplate(id, context.createChildContext((data._raw && data._raw()) || data));
        };
    };

    //prepare templates, if the widget uses them
    this.setupTemplates = function(templateConfig, options, element, context) {
        var i, j, option, existingHandler;

        if (templateConfig && options && options.useKOTemplates) {
            //create a function to render each configured template
            for (i = 0, j = templateConfig.length; i < j; i++) {
                option = templateConfig[i];
                if (options[option]) {
                    options[option] = templateRenderer(options[option], context);
                }
            }

            //initialize bindings in dataBound event
            existingHandler = options.dataBound;
            options.dataBound = function() {
                ko.memoization.unmemoizeDomNodeAndDescendants(element);
                if (existingHandler) {
                    existingHandler.apply(this, arguments);
                }
            };
        }
    };

    //unless the object is a kendo datasource, get a clean object with one level unwrapped
    this.unwrapOneLevel = function(object) {
        var prop,
            result = {};

        if (object) {
            if (object instanceof kendo.data.DataSource) {
                result = object;
            }
            else if (typeof object === "object") {
                for (prop in object) {
                    //include things on prototype
                    result[prop] = unwrap(object[prop]);
                }
            }
        }

        return result;
    };

    //return the actual widget
    this.getWidget = function(widgetConfig, options, $element) {
        var widget;
        if (widgetConfig.parent) {
            //locate the actual widget
            var parent = $element.closest("[data-bind*='" + widgetConfig.parent + ":']");
            widget = parent.length ? parent.data(widgetConfig.parent) : null;
        } else {
            widget = $element[widgetConfig.name](this.unwrapOneLevel(options)).data(widgetConfig.name);
        }

        //if the widget option was specified, then fill it with our widget
        if (ko.isObservable(options.widget)) {
            options.widget(widget);
        }

        return widget;
    };

    //respond to changes in the view model
    this.watchValues = function(widget, options, widgetConfig, element) {
        var watchProp, watchValues = widgetConfig.watch;
        if (watchValues) {
            for (watchProp in watchValues) {
                if (watchValues.hasOwnProperty(watchProp)) {
                    self.watchOneValue(watchProp, widget, options, widgetConfig, element);
                }
            }
        }
    };

    this.watchOneValue = function(prop, widget, options, widgetConfig, element) {
        var computed = ko.computed({
            read: function() {
                var existing, custom,
                    action = widgetConfig.watch[prop],
                    value = unwrap(options[prop]),
                    params = widgetConfig.parent ? [element] : []; //child bindings pass element first to APIs

                //support passing multiple events like ["open", "close"]
                if ($.isArray(action)) {
                    action = widget[value ? action[0] : action[1]];
                } else if (typeof action === "string") {
                    action = widget[action];
                } else {
                    custom = true; //running a custom function
                }

                if (action && options[prop] !== undefined) {
                    if (!custom) {
                        existing = action.apply(widget, params);
                        params.push(value);
                    } else {
                        params.push(value, options);
                    }

                    //try to avoid unnecessary updates when the new value matches the current value
                    if (custom || existing !== value) {
                        action.apply(widget, params);
                    }
                }
            },
            disposeWhenNodeIsRemoved: element
        }).extend({ throttle: (options.throttle || options.throttle === 0) ? options.throttle : 1 });

        //if option is not observable, then dispose up front after executing the logic once
        if (!ko.isObservable(options[prop])) {
            computed.dispose();
        }
    };

    //write changes to the widgets back to the model
    this.handleEvents = function(options, widgetConfig, element, widget, context) {
        var prop, eventConfig, events = widgetConfig.events;

        if (events) {
            for (prop in events) {
                if (events.hasOwnProperty(prop)) {
                    eventConfig = events[prop];
                    if (typeof eventConfig === "string") {
                        eventConfig = { value: eventConfig, writeTo: eventConfig };
                    }

                    self.handleOneEvent(prop, eventConfig, options, element, widget, widgetConfig.childProp, context);
                }
            }
        }
    };

    //bind to a single event
    this.handleOneEvent = function(eventName, eventConfig, options, element, widget, childProp, context) {
        var handler = typeof eventConfig === "function" ? eventConfig : options[eventConfig.call];

        //call a function defined directly in the binding definition, supply options that were passed to the binding
        if (typeof eventConfig === "function") {
            handler = handler.bind(context.$data, options);
        }
        //use function passed in binding options as handler with normal KO args
        else if (eventConfig.call && typeof options[eventConfig.call] === "function") {
            handler = options[eventConfig.call].bind(context.$data, context.$data);
        }
        //option is observable, determine what to write to it
        else if (eventConfig.writeTo && ko.isWriteableObservable(options[eventConfig.writeTo])) {
            handler = function(e) {
                var propOrValue, value;

                if (!childProp || !e[childProp] || e[childProp] === element) {
                    propOrValue = eventConfig.value;
                    value = (typeof propOrValue === "string" && this[propOrValue]) ? this[propOrValue](childProp && element) : propOrValue;
                    options[eventConfig.writeTo](value);
                }
            };
        }

        if (handler) {
            widget.bind(eventName, handler);
        }
    };
};

ko.kendo.bindingFactory = new ko.kendo.BindingFactory();

//utility to set the dataSource with a clean copy of data. Could be overridden at run-time.
ko.kendo.setDataSource = function(widget, data, options) {
    var isMapped, cleanData;

    if (data instanceof kendo.data.DataSource) {
        widget.setDataSource(data);
        return;
    }

    if (!options || !options.useKOTemplates) {
        isMapped = ko.mapping && data && data.__ko_mapping__;
        cleanData = data && isMapped ? ko.mapping.toJS(data) : ko.toJS(data);
    }

    widget.dataSource.data(cleanData || data);
};

//attach the raw data after Kendo wraps our items
(function() {
    var existing = kendo.data.ObservableArray.fn.wrap;
    kendo.data.ObservableArray.fn.wrap = function(object) {
        var result = existing.apply(this, arguments);
        result._raw = function() {
            return object;
        };

        return result;
    };
})();

//private utility function generator for gauges
var extendAndRedraw = function(prop) {
    return function(value) {
        if (value) {
            ko.utils.extend(this.options[prop], value);
            this.redraw();
            this.value(0.001 + this.value());
        }
    };
};

var openIfVisible = function(value, options) {
    if (!value) {
        //causes issues with event triggering, if closing programmatically, when unnecessary
        if (this.element.parent().is(":visible")) {
            this.close();
        }
    } else {
        this.open(typeof options.target === "string" ? $(unwrap(options.target)) : options.target);
    }
};


//library is in a closure, use this private variable to reduce size of minified file
var createBinding = ko.kendo.bindingFactory.createBinding.bind(ko.kendo.bindingFactory);

//use constants to ensure consistency and to help reduce minified file size
var CLICK = "click",
    CENTER = "center",
    CHECK = "check",
    CHECKED = "checked",
    CLICKED = "clicked",
    CLOSE = "close",
    COLLAPSE = "collapse",
    CONTENT = "content",
    DATA = "data",
    DATE = "date",
    DISABLE = "disable",
    ENABLE = "enable",
    EXPAND = "expand",
    ENABLED = "enabled",
    EXPANDED = "expanded",
    ERROR = "error",
    FILTER = "filter",
    HIDE = "hide",
    INFO = "info",
    ISOPEN = "isOpen",
    ITEMS = "items",
    MAX = "max",
    MIN = "min",
    OPEN = "open",
    PALETTE = "palette",
    READONLY = "readonly",
    RESIZE = "resize",
    SCROLLTO = "scrollTo",
    SEARCH = "search",
    SELECT = "select",
    SELECTED = "selected",
    SELECTEDINDEX = "selectedIndex",
    SHOW = "show",
    SIZE = "size",
    SUCCESS = "success",
    TARGET = "target",
    TITLE = "title",
    VALUE = "value",
    VALUES = "values",
    WARNING = "warning",
    ZOOM = "zoom";

createBinding({
    name: "kendoAutoComplete",
    events: {
        change: VALUE,
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        search: [SEARCH, CLOSE],
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        },
        value: VALUE
    }
});

createBinding({
    name: "kendoButton",
    defaultOption: CLICKED,
    events: {
        click: {
            call: CLICKED
        }
    },
    watch: {
        enabled: ENABLE
    }
});

createBinding({
    name: "kendoCalendar",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        max: MAX,
        min: MIN,
        value: VALUE
    }
});

createBinding({
    name: "kendoColorPicker",
    events: {
        change: VALUE,
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        value: VALUE,
        color: VALUE,
        palette: PALETTE
    }
});

createBinding({
    name: "kendoComboBox",
    events: {
        change: VALUE,
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE],
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        },
        value: VALUE
    }
});

createBinding({
    name: "kendoDatePicker",
    defaultOption: VALUE,
    events: {
        change: VALUE,
        open:
        {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        max: MAX,
        min: MIN,
        value: VALUE,
        isOpen: [OPEN, CLOSE]
    }
});

createBinding({
    name: "kendoDateTimePicker",
    defaultOption: VALUE,
    events: {
        change: VALUE,
        open:
        {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        max: MAX,
        min: MIN,
        value: VALUE,
        isOpen: [OPEN, CLOSE]
    }
});

createBinding({
    name: "kendoDropDownList",
    events: {
        change: VALUE,
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE],
        data: function(value) {
            ko.kendo.setDataSource(this, value);

            //if nothing is selected and there is an optionLabel, select it
            if (value.length && this.options.optionLabel && this.select() < 0) {
                this.select(0);
            }
        },
        value: VALUE
    }
});

createBinding({
    name: "kendoEditor",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        enabled: ENABLE,
        value: VALUE
    }
});

createBinding({
    name: "kendoGantt",
    defaultOption: DATA,
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});

createBinding({
    name: "kendoGrid",
    defaultOption: DATA,
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    templates: ["rowTemplate", "altRowTemplate"]
});

createBinding({
    name: "kendoListView",
    defaultOption: DATA,
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    templates: ["template"]
});

createBinding({
    name: "kendoPager",
    defaultOption: DATA,
    watch: {
        data: function (value, options) {
            ko.kendo.setDataSource(this, value, options);
        },
        page: "page"
    },
    templates: ["selectTemplate", "linkTemplate"]
});

createBinding({
    name: "kendoMaskedTextBox",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        enabled: ENABLE,
        isReadOnly: READONLY,
        value: VALUE
    }
});

createBinding({
    name: "kendoMap",
    events: {
        zoomEnd: function (options, event) {
            if (ko.isWriteableObservable(options.zoom)) {
                options.zoom(event.sender.zoom());
            }
        },
        panEnd: function (options, event) {
            var coordinates;

            if (ko.isWriteableObservable(options.center)) {
                coordinates = event.sender.center();

                options.center([coordinates.lat, coordinates.lng]);
            }
        }
    },
    watch: {
        center: CENTER,
        zoom: ZOOM
    }
});

createBinding({
    name: "kendoMenu",
    async: true
});

createBinding({
    name: "kendoMenuItem",
    parent: "kendoMenu",
    watch: {
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE]
    },
    async: true
});

createBinding({
    name: "kendoMobileActionSheet",
    events: {
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        isOpen: openIfVisible
    },
    async: true
});

createBinding({
    name: "kendoMobileButton",
    defaultOption: CLICKED,
    events: {
        click: {
            call: CLICKED
        }
    },
    watch: {
        enabled: ENABLE
    }
});

createBinding({
    name: "kendoMobileButtonGroup",
    events: {
        select: function(options, event) {
            if (ko.isWriteableObservable(options.selectedIndex)) {
                options.selectedIndex(event.sender.current().index());
            }
        }
    },
    watch: {
        enabled: ENABLE,
        selectedIndex: SELECT
    }
});

createBinding({
    name: "kendoMobileDrawer",
    events: {
        show: {
            writeTo: ISOPEN,
            value: true
        },
        hide: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        isOpen: function(value) {
            this[value ? "show" : "hide"]();
        }
    },
    async: true
});

createBinding({
    name: "kendoMobileListView",
    defaultOption: DATA,
    events: {
        click: {
            call: CLICKED
        }
    },
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    templates: ["template"]
});

createBinding({
    name: "kendoMobileModalView",
    events: {
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        isOpen: openIfVisible
    },
    async: true
});

createBinding({
    name: "kendoMobileNavBar",
    watch: {
        title: TITLE
    }
});

createBinding({
    name: "kendoMobilePopOver",
    events: {
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        isOpen: openIfVisible
    },
    async: true
});

createBinding({
    name: "kendoMobileScroller",
    events: {
        pull: function(options, event) {
            var doneCallback = event.sender.pullHandled.bind(event.sender);

            if (typeof options.pulled === "function") {
                options.pulled.call(this, this, event, doneCallback);
            }
        }
    },
    watch: {
        enabled: [ENABLE, DISABLE]
    }
});

createBinding({
    name: "kendoMobileScrollView",
    events: {
        change: function(options, event) {
            if ((event.page || event.page === 0) && ko.isWriteableObservable(options.currentIndex)) {
                options.currentIndex(event.page);
            }
        }
    },
    watch: {
        currentIndex: SCROLLTO,
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});

createBinding({
    name: "kendoMobileSwitch",
    events: {
        change: function(options, event) {
            if (ko.isWriteableObservable(options.checked)) {
                options.checked(event.checked);
            }
        }
    },
    watch: {
        enabled: ENABLE,
        checked: CHECK
    }
});

createBinding({
    name: "kendoMobileTabStrip",
    events: {
        select: function(options, event) {
            if (ko.isWriteableObservable(options.selectedIndex)) {
                options.selectedIndex(event.item.index());
            }
        }
    },
    watch: {
        selectedIndex: function(value) {
            if (value || value === 0) {
                this.switchTo(value);
            }
        }
    }
});

createBinding({
    name: "kendoMultiSelect",
    events: {
        change: VALUE,
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        enabled: ENABLE,
        search: [SEARCH, CLOSE],
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        },
        value: function(value) {
            this.dataSource.filter({});
            this.value(value);
        }
    }
});

var notificationHandler = function(type, value) {
    if (value || value === 0) {
        this.show(value, type);
    }
    else {
        this.hide();
    }
};

createBinding({
    name: "kendoNotification",
    watch: {
        error: function(value) {
            notificationHandler.call(this, ERROR, value);
        },
        info: function(value) {
            notificationHandler.call(this, INFO, value);
        },
        success: function(value) {
            notificationHandler.call(this, SUCCESS, value);
        },
        warning: function(value) {
            notificationHandler.call(this, WARNING, value);
        }
    }
});

createBinding({
    name: "kendoNumericTextBox",
    defaultOption: VALUE,
    events: {
        change: VALUE,
        spin: VALUE
    },
    watch: {
        enabled: ENABLE,
        value: VALUE,
        max: function(newMax) {
            this.options.max = newMax;
            //make sure current value is still valid
            var value = this.value();
            if ((value || value === 0) && value > newMax) {
                this.value(newMax);
            }
        },
        min: function(newMin) {
            this.options.min = newMin;
            //make sure that current value is still valid
            var value = this.value();
            if ((value || value === 0) && value < newMin ) {
                this.value(newMin);
            }
        }
    }
});


createBinding({
    name: "kendoPanelBar",
    async: true
});

createBinding({
    name: "kendoPanelItem",
    parent: "kendoPanelBar",
    watch: {
        enabled: ENABLE,
        expanded: [EXPAND, COLLAPSE],
        selected: [SELECT]
    },
    childProp: "item",
    events: {
        expand: {
            writeTo: EXPANDED,
            value: true
        },
        collapse: {
            writeTo: EXPANDED,
            value: false
        },
        select: {
            writeTo: SELECTED,
            value: VALUE
        }
    },
    async: true
});

createBinding({
    name: "kendoPivotGrid",
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});

createBinding({
    name: "kendoProgressBar",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        enabled: ENABLE,
        value: VALUE
    }
});

createBinding({
    name: "kendoRangeSlider",
    defaultOption: VALUES,
    events: {
        change: VALUES
    },
    watch: {
        values: VALUES,
        enabled: ENABLE
    }
});

var schedulerUpdateModel = function(func) {
    return function(options, e) {
        var allModels = unwrap(options.data || options.dataSource),
            idField = unwrap(options.idField) || "id",
            model = ko.utils.arrayFirst(allModels, function(item) {
                return unwrap(item[idField]) === e.event[idField];
            }),
            write = function(data) {
                for (var prop in model) {
                    if (data.hasOwnProperty(prop) && model.hasOwnProperty(prop)) {
                        var value = data[prop],
                            writeTo = model[prop];

                        if (ko.isWriteableObservable(writeTo)) {
                            writeTo(value);
                        }
                    }
                }
            };

        if (model) {
            func(options, e, model, write);
        }
    };
};

createBinding({
    name: "kendoScheduler",
    events: {
        moveEnd: schedulerUpdateModel(function(options, e, model, write) {
            write(e);
            write(e.resources);
        }),
        save: schedulerUpdateModel(function(options, e, model, write) {
            write(e.event);
        }),
        remove: function(options, e) {
            var match;
            var data = options.data || options.dataSource;
            var unwrapped = ko.unwrap(data);

            if (unwrapped && unwrapped.length) {
                match = ko.utils.arrayFirst(ko.unwrap(data), function(item) {
                    return item.uuid === e.event.uuid;
                });

                if (match) {
                    ko.utils.arrayRemoveItem(unwrapped, match);

                    if (ko.isWriteableObservable(data)) {
                        data.valueHasMutated();
                    }
                }
            }
        }
    },
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        },
        date: DATE
    },
    async: true
});

createBinding({
    name: "kendoSlider",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        value: VALUE,
        enabled: ENABLE
    }
});

createBinding({
    name: "kendoSortable",
    defaultOption: DATA,
    events: {
        end: function(options, e) {
            var dataKey = "__ko_kendo_sortable_data__",
                data = e.action !== "receive" ? ko.dataFor(e.item[0]) : e.draggableEvent[dataKey],
                items = options.data,
                underlyingArray = options.data;

            //remove item from its original position
            if (e.action === "sort" || e.action === "remove") {
                underlyingArray.splice(e.oldIndex, 1);

                //keep track of the item between remove and receive
                if (e.action === "remove") {
                    e.draggableEvent[dataKey] = data;
                }
            }

            //add the item to its new position
            if (e.action === "sort" || e.action === "receive") {
                underlyingArray.splice(e.newIndex, 0, data);

                //clear the data we passed
                delete e.draggableEvent[dataKey];

                //we are moving the item ourselves via the observableArray, cancel the draggable and hide the animation
                e.sender.placeholder.remove();
            }

            //signal that the observableArray has changed now that we are done changing the array
            items.valueHasMutated();
        }
    }
});


createBinding({
    name: "kendoSplitter",
    async: true
});

createBinding({
    name: "kendoSplitterPane",
    parent: "kendoSplitter",
    watch: {
        max: MAX,
        min: MIN,
        size: SIZE,
        expanded: [EXPAND, COLLAPSE]
    },
    childProp: "pane",
    events: {
        collapse: {
            writeTo: EXPANDED,
            value: false
        },
        expand: {
            writeTo: EXPANDED,
            value: true
        },
        resize: SIZE
    },
    async: true
});

createBinding({
    name: "kendoTabStrip",
    async: true
});

createBinding({
    name: "kendoTab",
    parent: "kendoTabStrip",
    watch: {
        enabled: ENABLE
    },
    childProp: "item",
    async: true
});

createBinding({
    name: "kendoToolBar"
});

createBinding({
    name: "kendoTooltip",
    events: {},
    watch: {
        content: function(content) {
            this.options.content = content;
            this.refresh();
        },
        filter: FILTER
    }
});


createBinding({
    name: "kendoTimePicker",
    defaultOption: VALUE,
    events: {
        change: VALUE
    },
    watch: {
        max: MAX,
        min: MIN,
        value: VALUE,
        enabled: ENABLE,
        isOpen: [OPEN, CLOSE]
    }
});

createBinding({
    name: "kendoTreeMap",
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});

createBinding({
    name: "kendoTreeView",
    watch: {
        data: function(value, options) {
            ko.kendo.setDataSource(this, value, options);
        }
    },
    events: {
        change: function(options, e) {
            if (ko.isWriteableObservable(options.value)) {
                var tree = e.sender;
                options.value(tree.dataItem(tree.select()));
            }
        }
    },
    async: true
});

createBinding({
    name: "kendoTreeItem",
    parent: "kendoTreeView",
    watch: {
        enabled: ENABLE,
        expanded: [EXPAND, COLLAPSE],
        selected: function(element, value) {
            if (value) {
                this.select(element);
            } else if (this.select()[0] == element) {
                this.select(null);
            }
        }
    },
    childProp: "node",
    events: {
        collapse: {
            writeTo: EXPANDED,
            value: false
        },
        expand: {
            writeTo: EXPANDED,
            value: true
        },
        select: {
            writeTo: SELECTED,
            value: true
        }
    },
    async: true
});


createBinding({
    name: "kendoUpload",
    watch: {
        enabled: ENABLE
    }
});

createBinding({
    name: "kendoWindow",
    events: {
        open: {
            writeTo: ISOPEN,
            value: true
        },
        close: {
            writeTo: ISOPEN,
            value: false
        }
    },
    watch: {
        content: CONTENT,
        title: TITLE,
        isOpen: [OPEN, CLOSE]
    },
    async: true
});

createBinding({
    name: "kendoBarcode",
    watch: {
        value: VALUE
    }
});

createBinding({
    name: "kendoChart",
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});

createBinding({
    name: "kendoLinearGauge",
    defaultOption: VALUE,
    watch: {
        value: VALUE,
        gaugeArea: extendAndRedraw("gaugeArea"),
        pointer: extendAndRedraw("pointer"),
        scale: extendAndRedraw("scale")
    }
});

createBinding({
    name: "kendoQRCode",
    watch: {
        value: VALUE
    }
});

createBinding({
    name: "kendoRadialGauge",
    defaultOption: VALUE,
    watch: {
        value: VALUE,
        gaugeArea: extendAndRedraw("gaugeArea"),
        pointer: extendAndRedraw("pointer"),
        scale: extendAndRedraw("scale")
    }
});

createBinding({
    name: "kendoSparkline",
    watch: {
        data: function (value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});


createBinding({
    name: "kendoStockChart",
    watch: {
        data: function(value) {
            ko.kendo.setDataSource(this, value);
        }
    }
});

}));
