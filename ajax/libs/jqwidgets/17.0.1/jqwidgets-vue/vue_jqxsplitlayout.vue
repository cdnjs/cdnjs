<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';

    export default {
        props: {
            disabled: {
                default: false,
                type: Boolean
            },
            dataSource: Object,
            ready: Function,
            orientation: String,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxSplitLayout' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxSplitLayout(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxSplitLayout(usedProps[i]);
                }
                return resultToReturn;
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxSplitLayout('refresh');  
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSplitLayout('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSplitLayout('disabled');
                }
            },
            _dataSource: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSplitLayout('dataSource', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSplitLayout('dataSource');
                }
            },
            _ready: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSplitLayout('ready', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSplitLayout('ready');
                }
            },
            _orientation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxSplitLayout('orientation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxSplitLayout('orientation');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxSplitLayout(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['disabled','dataSource','ready','orientation'];
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
                Object.defineProperty(that, 'dataSource', {
                    get: function() {
                        return that._dataSource();
                    },
                    set: function(newValue) {
                        that._dataSource(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'ready', {
                    get: function() {
                        return that._ready();
                    },
                    set: function(newValue) {
                        that._ready(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'orientation', {
                    get: function() {
                        return that._orientation();
                    },
                    set: function(newValue) {
                        that._orientation(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('resize', function (event) { that.$emit('resize', event); });
                JQXLite(this.componentSelector).on('stateChange', function (event) { that.$emit('stateChange', event); });
            }
        }
    }
</script>
