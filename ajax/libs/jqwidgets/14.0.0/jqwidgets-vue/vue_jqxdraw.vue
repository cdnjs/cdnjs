<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxdraw.js';

    export default {
        props: {
            renderEngine: String,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxDraw' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxDraw(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxDraw(usedProps[i]);
                }
                return resultToReturn;
            },
            attr: function(element, attributes) {
                JQXLite(this.componentSelector).jqxDraw('attr', element, attributes);  
            },
            circle: function(cx, cy, r, attributes) {
                return JQXLite(this.componentSelector).jqxDraw('circle', cx, cy, r, attributes);  
            },
            clear: function() {
                JQXLite(this.componentSelector).jqxDraw('clear');  
            },
            getAttr: function(element, attributes) {
                return JQXLite(this.componentSelector).jqxDraw('getAttr', element, attributes);  
            },
            getSize: function() {
                return JQXLite(this.componentSelector).jqxDraw('getSize');  
            },
            line: function(x1, y1, x2, y2, attributes) {
                return JQXLite(this.componentSelector).jqxDraw('line', x1, y1, x2, y2, attributes);  
            },
            measureText: function(text, angle, attributes) {
                return JQXLite(this.componentSelector).jqxDraw('measureText', text, angle, attributes);  
            },
            on: function(element, event, func) {
                JQXLite(this.componentSelector).jqxDraw('on', element, event, func);  
            },
            off: function(element, event, func) {
                JQXLite(this.componentSelector).jqxDraw('off', element, event, func);  
            },
            path: function(path, attributes) {
                return JQXLite(this.componentSelector).jqxDraw('path', path, attributes);  
            },
            pieslice: function(cx, xy, innerRadius, outerRadius, fromAngle, endAngle, centerOffset, attributes) {
                return JQXLite(this.componentSelector).jqxDraw('pieslice', cx, xy, innerRadius, outerRadius, fromAngle, endAngle, centerOffset, attributes);  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxDraw('refresh');  
            },
            rect: function(x, y, width, height, attributes) {
                return JQXLite(this.componentSelector).jqxDraw('rect', x, y, width, height, attributes);  
            },
            saveAsJPEG: function(image, url) {
                JQXLite(this.componentSelector).jqxDraw('saveAsJPEG', image, url);  
            },
            saveAsPNG: function(image, url) {
                JQXLite(this.componentSelector).jqxDraw('saveAsPNG', image, url);  
            },
            text: function(text, x, y, width, height, angle, attributes, clip, halign, valign, rotateAround) {
                return JQXLite(this.componentSelector).jqxDraw('text', text, x, y, width, height, angle, attributes, clip, halign, valign, rotateAround);  
            },
            _renderEngine: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxDraw('renderEngine', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxDraw('renderEngine');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxDraw(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['renderEngine'];
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

                Object.defineProperty(that, 'renderEngine', {
                    get: function() {
                        return that._renderEngine();
                    },
                    set: function(newValue) {
                        that._renderEngine(newValue);
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
