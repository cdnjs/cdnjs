<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdraw.js';
    import '../jqwidgets/jqxtimepicker.js';

    export default {
        props: {
            autoSwitchToMinutes: Boolean,
            disabled: Boolean,
            footer: Boolean,
            footerTemplate: String,
            format: String,
            height: [Number, String],
            minuteInterval: Number,
            name: String,
            readonly: Boolean,
            selection: String,
            theme: String,
            unfocusable: Boolean,
            value: Date,
            view: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxTimePicker' + JQXLite.generateID();
            this.componentSelector = '#' + this.id;
        },
        mounted: function () {
            if (this.autoCreate) this.__createComponent__();
        },
        methods: {
            createComponent: function (options) {
                if (!this.autoCreate) this.__createComponent__(options)
                else console.warn('Component is already created! If you want to use createComponent, please set "autoCreate" property to "false".');
            },
            setOptions: function (options) {
                JQXLite(this.componentSelector).jqxTimePicker(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxTimePicker(usedProps[i]);
                }
                return resultToReturn;
            },
            setHours: function(hours) {
                JQXLite(this.componentSelector).jqxTimePicker('setHours', hours);  
            },
            setMinutes: function(minutes) {
                JQXLite(this.componentSelector).jqxTimePicker('setMinutes', minutes);  
            },
            _autoSwitchToMinutes: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('autoSwitchToMinutes', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('autoSwitchToMinutes');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('disabled');
                }
            },
            _footer: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('footer', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('footer');
                }
            },
            _footerTemplate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('footerTemplate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('footerTemplate');
                }
            },
            _format: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('format', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('format');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('height');
                }
            },
            _minuteInterval: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('minuteInterval', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('minuteInterval');
                }
            },
            _name: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('name', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('name');
                }
            },
            _readonly: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('readonly', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('readonly');
                }
            },
            _selection: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('selection', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('selection');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('theme');
                }
            },
            _unfocusable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('unfocusable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('unfocusable');
                }
            },
            _value: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('value', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('value');
                }
            },
            _view: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('view', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('view');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTimePicker('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTimePicker('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxTimePicker(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['autoSwitchToMinutes','disabled','footer','footerTemplate','format','height','minuteInterval','name','readonly','selection','theme','unfocusable','value','view','width'];
                const componentProps = this.$options.propsData;
                let options = {};

                for (let prop in componentProps) {
                    if (widgetProps.indexOf(prop) !== -1) {
                        options[prop] = componentProps[prop];
                    }
                }
                return options;
            },
            __extendProps__: function () {
                const that = this;

                Object.defineProperty(that, 'autoSwitchToMinutes', {
                    get: function() {
                        return that._autoSwitchToMinutes();
                    },
                    set: function(newValue) {
                        that._autoSwitchToMinutes(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disabled', {
                    get: function() {
                        return that._disabled();
                    },
                    set: function(newValue) {
                        that._disabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'footer', {
                    get: function() {
                        return that._footer();
                    },
                    set: function(newValue) {
                        that._footer(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'footerTemplate', {
                    get: function() {
                        return that._footerTemplate();
                    },
                    set: function(newValue) {
                        that._footerTemplate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'format', {
                    get: function() {
                        return that._format();
                    },
                    set: function(newValue) {
                        that._format(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'height', {
                    get: function() {
                        return that._height();
                    },
                    set: function(newValue) {
                        that._height(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minuteInterval', {
                    get: function() {
                        return that._minuteInterval();
                    },
                    set: function(newValue) {
                        that._minuteInterval(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'name', {
                    get: function() {
                        return that._name();
                    },
                    set: function(newValue) {
                        that._name(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'readonly', {
                    get: function() {
                        return that._readonly();
                    },
                    set: function(newValue) {
                        that._readonly(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selection', {
                    get: function() {
                        return that._selection();
                    },
                    set: function(newValue) {
                        that._selection(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'theme', {
                    get: function() {
                        return that._theme();
                    },
                    set: function(newValue) {
                        that._theme(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'unfocusable', {
                    get: function() {
                        return that._unfocusable();
                    },
                    set: function(newValue) {
                        that._unfocusable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'value', {
                    get: function() {
                        return that._value();
                    },
                    set: function(newValue) {
                        that._value(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'view', {
                    get: function() {
                        return that._view();
                    },
                    set: function(newValue) {
                        that._view(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'width', {
                    get: function() {
                        return that._width();
                    },
                    set: function(newValue) {
                        that._width(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('change', function (event) { that.$emit('change', event); });
            }
        }
    }
</script>
