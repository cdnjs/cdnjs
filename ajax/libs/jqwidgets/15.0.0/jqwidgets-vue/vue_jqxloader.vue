<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxloader.js';

    export default {
        props: {
            autoOpen: Boolean,
            height: [Number, String],
            html: String,
            isModal: Boolean,
            imagePosition: String,
            rtl: Boolean,
            text: String,
            textPosition: String,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxLoader' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxLoader(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxLoader(usedProps[i]);
                }
                return resultToReturn;
            },
            close: function() {
                JQXLite(this.componentSelector).jqxLoader('close');  
            },
            open: function(left, top) {
                JQXLite(this.componentSelector).jqxLoader('open', left, top);  
            },
            _autoOpen: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('autoOpen', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('autoOpen');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('height');
                }
            },
            _html: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('html', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('html');
                }
            },
            _isModal: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('isModal', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('isModal');
                }
            },
            _imagePosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('imagePosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('imagePosition');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('rtl');
                }
            },
            _text: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('text', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('text');
                }
            },
            _textPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('textPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('textPosition');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxLoader('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxLoader('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxLoader(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['autoOpen','height','html','isModal','imagePosition','rtl','text','textPosition','theme','width'];
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

                Object.defineProperty(that, 'autoOpen', {
                    get: function() {
                        return that._autoOpen();
                    },
                    set: function(newValue) {
                        that._autoOpen(newValue);
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
                Object.defineProperty(that, 'html', {
                    get: function() {
                        return that._html();
                    },
                    set: function(newValue) {
                        that._html(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'isModal', {
                    get: function() {
                        return that._isModal();
                    },
                    set: function(newValue) {
                        that._isModal(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'imagePosition', {
                    get: function() {
                        return that._imagePosition();
                    },
                    set: function(newValue) {
                        that._imagePosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rtl', {
                    get: function() {
                        return that._rtl();
                    },
                    set: function(newValue) {
                        that._rtl(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'text', {
                    get: function() {
                        return that._text();
                    },
                    set: function(newValue) {
                        that._text(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'textPosition', {
                    get: function() {
                        return that._textPosition();
                    },
                    set: function(newValue) {
                        that._textPosition(newValue);
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

            }
        }
    }
</script>
