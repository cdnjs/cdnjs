<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdockpanel.js';

    export default {
        props: {
            disabled: Boolean,
            height: [Number, String],
            lastchildfill: Boolean,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxDockPanel' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxDockPanel(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxDockPanel(usedProps[i]);
                }
                return resultToReturn;
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxDockPanel('refresh');  
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockPanel('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockPanel('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockPanel('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockPanel('height');
                }
            },
            _lastchildfill: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockPanel('lastchildfill', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockPanel('lastchildfill');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDockPanel('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDockPanel('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxDockPanel(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['disabled','height','lastchildfill','width'];
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
                Object.defineProperty(that, 'lastchildfill', {
                    get: function() {
                        return that._lastchildfill();
                    },
                    set: function(newValue) {
                        that._lastchildfill(newValue);
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

                JQXLite(this.componentSelector).on('layout', function (event) { that.$emit('layout', event); });
            }
        }
    }
</script>
