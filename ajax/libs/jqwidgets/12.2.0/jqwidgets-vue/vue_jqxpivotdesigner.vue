<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';

    export default {
        props: {
            type: String,
            target: Object,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxPivotDesigner' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxPivotDesigner(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxPivotDesigner(usedProps[i]);
                }
                return resultToReturn;
            },
            refresh: function() {
                return JQXLite(this.componentSelector).jqxPivotDesigner('refresh');  
            },
            _type: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotDesigner('type', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotDesigner('type');
                }
            },
            _target: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxPivotDesigner('target', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxPivotDesigner('target');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxPivotDesigner(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['type','target'];
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

                Object.defineProperty(that, 'type', {
                    get: function() {
                        return that._type();
                    },
                    set: function(newValue) {
                        that._type(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'target', {
                    get: function() {
                        return that._target();
                    },
                    set: function(newValue) {
                        that._target(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

            }
        }
    }
</script>
