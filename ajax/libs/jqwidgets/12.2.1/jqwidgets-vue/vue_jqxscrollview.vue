<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxscrollview.js';

    export default {
        props: {
            animationDuration: Number,
            bounceEnabled: Boolean,
            buttonsOffset: Array,
            currentPage: Number,
            disabled: Boolean,
            height: [Number, String],
            moveThreshold: Number,
            showButtons: Boolean,
            slideShow: Boolean,
            slideDuration: Number,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxScrollView' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxScrollView(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxScrollView(usedProps[i]);
                }
                return resultToReturn;
            },
            back: function() {
                JQXLite(this.componentSelector).jqxScrollView('back');  
            },
            changePage: function(index) {
                JQXLite(this.componentSelector).jqxScrollView('changePage', index);  
            },
            forward: function() {
                JQXLite(this.componentSelector).jqxScrollView('forward');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxScrollView('refresh');  
            },
            _animationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('animationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('animationDuration');
                }
            },
            _bounceEnabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('bounceEnabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('bounceEnabled');
                }
            },
            _buttonsOffset: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('buttonsOffset', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('buttonsOffset');
                }
            },
            _currentPage: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('currentPage', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('currentPage');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('height');
                }
            },
            _moveThreshold: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('moveThreshold', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('moveThreshold');
                }
            },
            _showButtons: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('showButtons', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('showButtons');
                }
            },
            _slideShow: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('slideShow', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('slideShow');
                }
            },
            _slideDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('slideDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('slideDuration');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxScrollView('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxScrollView('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxScrollView(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationDuration','bounceEnabled','buttonsOffset','currentPage','disabled','height','moveThreshold','showButtons','slideShow','slideDuration','theme','width'];
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

                Object.defineProperty(that, 'animationDuration', {
                    get: function() {
                        return that._animationDuration();
                    },
                    set: function(newValue) {
                        that._animationDuration(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'bounceEnabled', {
                    get: function() {
                        return that._bounceEnabled();
                    },
                    set: function(newValue) {
                        that._bounceEnabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'buttonsOffset', {
                    get: function() {
                        return that._buttonsOffset();
                    },
                    set: function(newValue) {
                        that._buttonsOffset(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'currentPage', {
                    get: function() {
                        return that._currentPage();
                    },
                    set: function(newValue) {
                        that._currentPage(newValue);
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
                Object.defineProperty(that, 'moveThreshold', {
                    get: function() {
                        return that._moveThreshold();
                    },
                    set: function(newValue) {
                        that._moveThreshold(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showButtons', {
                    get: function() {
                        return that._showButtons();
                    },
                    set: function(newValue) {
                        that._showButtons(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'slideShow', {
                    get: function() {
                        return that._slideShow();
                    },
                    set: function(newValue) {
                        that._slideShow(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'slideDuration', {
                    get: function() {
                        return that._slideDuration();
                    },
                    set: function(newValue) {
                        that._slideDuration(newValue);
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

                JQXLite(this.componentSelector).on('pageChanged', function (event) { that.$emit('pageChanged', event); });
            }
        }
    }
</script>
