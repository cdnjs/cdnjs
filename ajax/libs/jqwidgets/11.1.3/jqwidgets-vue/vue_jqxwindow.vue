<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxwindow.js';

    export default {
        props: {
            autoOpen: Boolean,
            animationType: String,
            collapsed: Boolean,
            collapseAnimationDuration: Number,
            content: String,
            closeAnimationDuration: Number,
            closeButtonSize: Number,
            closeButtonAction: String,
            cancelButton: [Object, String],
            dragArea: Object,
            draggable: Boolean,
            disabled: Boolean,
            height: [Number, String],
            initContent: Function,
            isModal: Boolean,
            keyboardCloseKey: Number,
            keyboardNavigation: Boolean,
            minHeight: Number,
            maxHeight: Number,
            minWidth: Number,
            maxWidth: Number,
            modalOpacity: [Number, String],
            modalZIndex: Number,
            modalBackgroundZIndex: Number,
            okButton: [String, Object],
            position: [String, Object],
            rtl: Boolean,
            resizable: Boolean,
            showAnimationDuration: Number,
            showCloseButton: Boolean,
            showCollapseButton: Boolean,
            theme: String,
            title: String,
            width: [Number, String],
            zIndex: Number,
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxWindow' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxWindow(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxWindow(usedProps[i]);
                }
                return resultToReturn;
            },
            bringToFront: function() {
                JQXLite(this.componentSelector).jqxWindow('bringToFront');  
            },
            close: function() {
                JQXLite(this.componentSelector).jqxWindow('close');  
            },
            collapse: function() {
                JQXLite(this.componentSelector).jqxWindow('collapse');  
            },
            closeAll: function() {
                JQXLite(this.componentSelector).jqxWindow('closeAll');  
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxWindow('disable');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxWindow('destroy');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxWindow('enable');  
            },
            expand: function() {
                JQXLite(this.componentSelector).jqxWindow('expand');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxWindow('focus');  
            },
            isOpen: function() {
                return JQXLite(this.componentSelector).jqxWindow('isOpen');  
            },
            move: function(top, left) {
                JQXLite(this.componentSelector).jqxWindow('move', top, left);  
            },
            open: function() {
                JQXLite(this.componentSelector).jqxWindow('open');  
            },
            hide: function() {
                JQXLite(this.componentSelector).jqxWindow('hide');  
            },
            resize: function(top, left) {
                JQXLite(this.componentSelector).jqxWindow('resize', top, left);  
            },
            setTitle: function(title) {
                JQXLite(this.componentSelector).jqxWindow('setTitle', title);  
            },
            setContent: function(content) {
                JQXLite(this.componentSelector).jqxWindow('setContent', content);  
            },
            _autoOpen: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('autoOpen', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('autoOpen');
                }
            },
            _animationType: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('animationType', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('animationType');
                }
            },
            _collapsed: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('collapsed', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('collapsed');
                }
            },
            _collapseAnimationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('collapseAnimationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('collapseAnimationDuration');
                }
            },
            _content: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('content', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('content');
                }
            },
            _closeAnimationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('closeAnimationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('closeAnimationDuration');
                }
            },
            _closeButtonSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('closeButtonSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('closeButtonSize');
                }
            },
            _closeButtonAction: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('closeButtonAction', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('closeButtonAction');
                }
            },
            _cancelButton: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('cancelButton', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('cancelButton');
                }
            },
            _dragArea: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('dragArea', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('dragArea');
                }
            },
            _draggable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('draggable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('draggable');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('disabled');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('height');
                }
            },
            _initContent: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('initContent', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('initContent');
                }
            },
            _isModal: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('isModal', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('isModal');
                }
            },
            _keyboardCloseKey: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('keyboardCloseKey', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('keyboardCloseKey');
                }
            },
            _keyboardNavigation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('keyboardNavigation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('keyboardNavigation');
                }
            },
            _minHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('minHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('minHeight');
                }
            },
            _maxHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('maxHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('maxHeight');
                }
            },
            _minWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('minWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('minWidth');
                }
            },
            _maxWidth: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('maxWidth', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('maxWidth');
                }
            },
            _modalOpacity: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('modalOpacity', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('modalOpacity');
                }
            },
            _modalZIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('modalZIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('modalZIndex');
                }
            },
            _modalBackgroundZIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('modalBackgroundZIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('modalBackgroundZIndex');
                }
            },
            _okButton: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('okButton', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('okButton');
                }
            },
            _position: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('position', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('position');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('rtl');
                }
            },
            _resizable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('resizable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('resizable');
                }
            },
            _showAnimationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('showAnimationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('showAnimationDuration');
                }
            },
            _showCloseButton: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('showCloseButton', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('showCloseButton');
                }
            },
            _showCollapseButton: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('showCollapseButton', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('showCollapseButton');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('theme');
                }
            },
            _title: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('title', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('title');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('width');
                }
            },
            _zIndex: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxWindow('zIndex', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxWindow('zIndex');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxWindow(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['autoOpen','animationType','collapsed','collapseAnimationDuration','content','closeAnimationDuration','closeButtonSize','closeButtonAction','cancelButton','dragArea','draggable','disabled','height','initContent','isModal','keyboardCloseKey','keyboardNavigation','minHeight','maxHeight','minWidth','maxWidth','modalOpacity','modalZIndex','modalBackgroundZIndex','okButton','position','rtl','resizable','showAnimationDuration','showCloseButton','showCollapseButton','theme','title','width','zIndex'];
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
                Object.defineProperty(that, 'animationType', {
                    get: function() {
                        return that._animationType();
                    },
                    set: function(newValue) {
                        that._animationType(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'collapsed', {
                    get: function() {
                        return that._collapsed();
                    },
                    set: function(newValue) {
                        that._collapsed(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'collapseAnimationDuration', {
                    get: function() {
                        return that._collapseAnimationDuration();
                    },
                    set: function(newValue) {
                        that._collapseAnimationDuration(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'content', {
                    get: function() {
                        return that._content();
                    },
                    set: function(newValue) {
                        that._content(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'closeAnimationDuration', {
                    get: function() {
                        return that._closeAnimationDuration();
                    },
                    set: function(newValue) {
                        that._closeAnimationDuration(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'closeButtonSize', {
                    get: function() {
                        return that._closeButtonSize();
                    },
                    set: function(newValue) {
                        that._closeButtonSize(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'closeButtonAction', {
                    get: function() {
                        return that._closeButtonAction();
                    },
                    set: function(newValue) {
                        that._closeButtonAction(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'cancelButton', {
                    get: function() {
                        return that._cancelButton();
                    },
                    set: function(newValue) {
                        that._cancelButton(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'dragArea', {
                    get: function() {
                        return that._dragArea();
                    },
                    set: function(newValue) {
                        that._dragArea(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'draggable', {
                    get: function() {
                        return that._draggable();
                    },
                    set: function(newValue) {
                        that._draggable(newValue);
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
                Object.defineProperty(that, 'initContent', {
                    get: function() {
                        return that._initContent();
                    },
                    set: function(newValue) {
                        that._initContent(newValue);
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
                Object.defineProperty(that, 'keyboardCloseKey', {
                    get: function() {
                        return that._keyboardCloseKey();
                    },
                    set: function(newValue) {
                        that._keyboardCloseKey(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'keyboardNavigation', {
                    get: function() {
                        return that._keyboardNavigation();
                    },
                    set: function(newValue) {
                        that._keyboardNavigation(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minHeight', {
                    get: function() {
                        return that._minHeight();
                    },
                    set: function(newValue) {
                        that._minHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'maxHeight', {
                    get: function() {
                        return that._maxHeight();
                    },
                    set: function(newValue) {
                        that._maxHeight(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'minWidth', {
                    get: function() {
                        return that._minWidth();
                    },
                    set: function(newValue) {
                        that._minWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'maxWidth', {
                    get: function() {
                        return that._maxWidth();
                    },
                    set: function(newValue) {
                        that._maxWidth(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'modalOpacity', {
                    get: function() {
                        return that._modalOpacity();
                    },
                    set: function(newValue) {
                        that._modalOpacity(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'modalZIndex', {
                    get: function() {
                        return that._modalZIndex();
                    },
                    set: function(newValue) {
                        that._modalZIndex(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'modalBackgroundZIndex', {
                    get: function() {
                        return that._modalBackgroundZIndex();
                    },
                    set: function(newValue) {
                        that._modalBackgroundZIndex(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'okButton', {
                    get: function() {
                        return that._okButton();
                    },
                    set: function(newValue) {
                        that._okButton(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'position', {
                    get: function() {
                        return that._position();
                    },
                    set: function(newValue) {
                        that._position(newValue);
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
                Object.defineProperty(that, 'resizable', {
                    get: function() {
                        return that._resizable();
                    },
                    set: function(newValue) {
                        that._resizable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showAnimationDuration', {
                    get: function() {
                        return that._showAnimationDuration();
                    },
                    set: function(newValue) {
                        that._showAnimationDuration(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showCloseButton', {
                    get: function() {
                        return that._showCloseButton();
                    },
                    set: function(newValue) {
                        that._showCloseButton(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showCollapseButton', {
                    get: function() {
                        return that._showCollapseButton();
                    },
                    set: function(newValue) {
                        that._showCollapseButton(newValue);
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
                Object.defineProperty(that, 'title', {
                    get: function() {
                        return that._title();
                    },
                    set: function(newValue) {
                        that._title(newValue);
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
                Object.defineProperty(that, 'zIndex', {
                    get: function() {
                        return that._zIndex();
                    },
                    set: function(newValue) {
                        that._zIndex(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('close', function (event) { that.$emit('close', event); });
                JQXLite(this.componentSelector).on('collapse', function (event) { that.$emit('collapse', event); });
                JQXLite(this.componentSelector).on('expand', function (event) { that.$emit('expand', event); });
                JQXLite(this.componentSelector).on('moving', function (event) { that.$emit('moving', event); });
                JQXLite(this.componentSelector).on('moved', function (event) { that.$emit('moved', event); });
                JQXLite(this.componentSelector).on('open', function (event) { that.$emit('open', event); });
                JQXLite(this.componentSelector).on('resizing', function (event) { that.$emit('resizing', event); });
                JQXLite(this.componentSelector).on('resized', function (event) { that.$emit('resized', event); });
            }
        }
    }
</script>
