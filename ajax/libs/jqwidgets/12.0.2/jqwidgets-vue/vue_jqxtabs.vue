<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxtabs.js';

    export default {
        props: {
            animationType: String,
            autoHeight: Boolean,
            closeButtonSize: Number,
            collapsible: Boolean,
            contentTransitionDuration: Number,
            disabled: Boolean,
            enabledHover: Boolean,
            enableScrollAnimation: Boolean,
            enableDropAnimation: Boolean,
            height: [Number, String],
            initTabContent: Function,
            keyboardNavigation: Boolean,
            next: Object,
            previous: Object,
            position: String,
            reorder: Boolean,
            rtl: Boolean,
            scrollAnimationDuration: Number,
            selectedItem: Number,
            selectionTracker: Boolean,
            scrollable: Boolean,
            scrollPosition: String,
            scrollStep: Number,
            showCloseButtons: Boolean,
            toggleMode: String,
            theme: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxTabs' + JQXLite.generateID();
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
                JQXLite(this.componentSelector).jqxTabs(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxTabs(usedProps[i]);
                }
                return resultToReturn;
            },
            addAt: function(index, title, content) {
                JQXLite(this.componentSelector).jqxTabs('addAt', index, title, content);  
            },
            addFirst: function(htmlElement1, htmlElement2) {
                JQXLite(this.componentSelector).jqxTabs('addFirst', htmlElement1, htmlElement2);  
            },
            addLast: function(htmlElement1, htmlElement2) {
                JQXLite(this.componentSelector).jqxTabs('addLast', htmlElement1, htmlElement2);  
            },
            collapse: function() {
                JQXLite(this.componentSelector).jqxTabs('collapse');  
            },
            disable: function() {
                JQXLite(this.componentSelector).jqxTabs('disable');  
            },
            disableAt: function(index) {
                JQXLite(this.componentSelector).jqxTabs('disableAt', index);  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxTabs('destroy');  
            },
            ensureVisible: function(index) {
                JQXLite(this.componentSelector).jqxTabs('ensureVisible', index);  
            },
            enableAt: function(index) {
                JQXLite(this.componentSelector).jqxTabs('enableAt', index);  
            },
            expand: function() {
                JQXLite(this.componentSelector).jqxTabs('expand');  
            },
            enable: function() {
                JQXLite(this.componentSelector).jqxTabs('enable');  
            },
            focus: function() {
                JQXLite(this.componentSelector).jqxTabs('focus');  
            },
            getTitleAt: function(index) {
                return JQXLite(this.componentSelector).jqxTabs('getTitleAt', index);  
            },
            getContentAt: function(index) {
                return JQXLite(this.componentSelector).jqxTabs('getContentAt', index);  
            },
            getDisabledTabsCount: function() {
                return JQXLite(this.componentSelector).jqxTabs('getDisabledTabsCount');  
            },
            hideCloseButtonAt: function(index) {
                JQXLite(this.componentSelector).jqxTabs('hideCloseButtonAt', index);  
            },
            hideAllCloseButtons: function() {
                JQXLite(this.componentSelector).jqxTabs('hideAllCloseButtons');  
            },
            length: function() {
                return JQXLite(this.componentSelector).jqxTabs('length');  
            },
            removeAt: function(index) {
                JQXLite(this.componentSelector).jqxTabs('removeAt', index);  
            },
            removeFirst: function() {
                JQXLite(this.componentSelector).jqxTabs('removeFirst');  
            },
            removeLast: function() {
                JQXLite(this.componentSelector).jqxTabs('removeLast');  
            },
            select: function(index) {
                JQXLite(this.componentSelector).jqxTabs('select', index);  
            },
            setContentAt: function(index, htmlElement) {
                JQXLite(this.componentSelector).jqxTabs('setContentAt', index, htmlElement);  
            },
            setTitleAt: function(index, htmlElement) {
                JQXLite(this.componentSelector).jqxTabs('setTitleAt', index, htmlElement);  
            },
            showCloseButtonAt: function(index) {
                JQXLite(this.componentSelector).jqxTabs('showCloseButtonAt', index);  
            },
            showAllCloseButtons: function() {
                JQXLite(this.componentSelector).jqxTabs('showAllCloseButtons');  
            },
            val: function(value) {
                if (value !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('val',  value)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('val');
                }
            },
            _animationType: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('animationType', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('animationType');
                }
            },
            _autoHeight: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('autoHeight', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('autoHeight');
                }
            },
            _closeButtonSize: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('closeButtonSize', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('closeButtonSize');
                }
            },
            _collapsible: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('collapsible', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('collapsible');
                }
            },
            _contentTransitionDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('contentTransitionDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('contentTransitionDuration');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('disabled');
                }
            },
            _enabledHover: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('enabledHover', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('enabledHover');
                }
            },
            _enableScrollAnimation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('enableScrollAnimation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('enableScrollAnimation');
                }
            },
            _enableDropAnimation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('enableDropAnimation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('enableDropAnimation');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('height');
                }
            },
            _initTabContent: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('initTabContent', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('initTabContent');
                }
            },
            _keyboardNavigation: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('keyboardNavigation', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('keyboardNavigation');
                }
            },
            _next: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('next', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('next');
                }
            },
            _previous: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('previous', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('previous');
                }
            },
            _position: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('position', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('position');
                }
            },
            _reorder: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('reorder', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('reorder');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('rtl');
                }
            },
            _scrollAnimationDuration: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('scrollAnimationDuration', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('scrollAnimationDuration');
                }
            },
            _selectedItem: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('selectedItem', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('selectedItem');
                }
            },
            _selectionTracker: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('selectionTracker', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('selectionTracker');
                }
            },
            _scrollable: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('scrollable', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('scrollable');
                }
            },
            _scrollPosition: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('scrollPosition', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('scrollPosition');
                }
            },
            _scrollStep: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('scrollStep', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('scrollStep');
                }
            },
            _showCloseButtons: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('showCloseButtons', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('showCloseButtons');
                }
            },
            _toggleMode: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('toggleMode', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('toggleMode');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('theme');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxTabs('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxTabs('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxTabs(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['animationType','autoHeight','closeButtonSize','collapsible','contentTransitionDuration','disabled','enabledHover','enableScrollAnimation','enableDropAnimation','height','initTabContent','keyboardNavigation','next','previous','position','reorder','rtl','scrollAnimationDuration','selectedItem','selectionTracker','scrollable','scrollPosition','scrollStep','showCloseButtons','toggleMode','theme','width'];
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
                Object.defineProperty(that, 'autoHeight', {
                    get: function() {
                        return that._autoHeight();
                    },
                    set: function(newValue) {
                        that._autoHeight(newValue);
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
                Object.defineProperty(that, 'collapsible', {
                    get: function() {
                        return that._collapsible();
                    },
                    set: function(newValue) {
                        that._collapsible(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'contentTransitionDuration', {
                    get: function() {
                        return that._contentTransitionDuration();
                    },
                    set: function(newValue) {
                        that._contentTransitionDuration(newValue);
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
                Object.defineProperty(that, 'enabledHover', {
                    get: function() {
                        return that._enabledHover();
                    },
                    set: function(newValue) {
                        that._enabledHover(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableScrollAnimation', {
                    get: function() {
                        return that._enableScrollAnimation();
                    },
                    set: function(newValue) {
                        that._enableScrollAnimation(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'enableDropAnimation', {
                    get: function() {
                        return that._enableDropAnimation();
                    },
                    set: function(newValue) {
                        that._enableDropAnimation(newValue);
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
                Object.defineProperty(that, 'initTabContent', {
                    get: function() {
                        return that._initTabContent();
                    },
                    set: function(newValue) {
                        that._initTabContent(newValue);
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
                Object.defineProperty(that, 'next', {
                    get: function() {
                        return that._next();
                    },
                    set: function(newValue) {
                        that._next(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'previous', {
                    get: function() {
                        return that._previous();
                    },
                    set: function(newValue) {
                        that._previous(newValue);
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
                Object.defineProperty(that, 'reorder', {
                    get: function() {
                        return that._reorder();
                    },
                    set: function(newValue) {
                        that._reorder(newValue);
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
                Object.defineProperty(that, 'scrollAnimationDuration', {
                    get: function() {
                        return that._scrollAnimationDuration();
                    },
                    set: function(newValue) {
                        that._scrollAnimationDuration(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectedItem', {
                    get: function() {
                        return that._selectedItem();
                    },
                    set: function(newValue) {
                        that._selectedItem(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'selectionTracker', {
                    get: function() {
                        return that._selectionTracker();
                    },
                    set: function(newValue) {
                        that._selectionTracker(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollable', {
                    get: function() {
                        return that._scrollable();
                    },
                    set: function(newValue) {
                        that._scrollable(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollPosition', {
                    get: function() {
                        return that._scrollPosition();
                    },
                    set: function(newValue) {
                        that._scrollPosition(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'scrollStep', {
                    get: function() {
                        return that._scrollStep();
                    },
                    set: function(newValue) {
                        that._scrollStep(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'showCloseButtons', {
                    get: function() {
                        return that._showCloseButtons();
                    },
                    set: function(newValue) {
                        that._showCloseButtons(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'toggleMode', {
                    get: function() {
                        return that._toggleMode();
                    },
                    set: function(newValue) {
                        that._toggleMode(newValue);
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

                JQXLite(this.componentSelector).on('add', function (event) { that.$emit('add', event); });
                JQXLite(this.componentSelector).on('collapsed', function (event) { that.$emit('collapsed', event); });
                JQXLite(this.componentSelector).on('dragStart', function (event) { that.$emit('dragStart', event); });
                JQXLite(this.componentSelector).on('dragEnd', function (event) { that.$emit('dragEnd', event); });
                JQXLite(this.componentSelector).on('expanded', function (event) { that.$emit('expanded', event); });
                JQXLite(this.componentSelector).on('removed', function (event) { that.$emit('removed', event); });
                JQXLite(this.componentSelector).on('selecting', function (event) { that.$emit('selecting', event); });
                JQXLite(this.componentSelector).on('selected', function (event) { that.$emit('selected', event); });
                JQXLite(this.componentSelector).on('tabclick', function (event) { that.$emit('tabclick', event); });
                JQXLite(this.componentSelector).on('unselecting', function (event) { that.$emit('unselecting', event); });
                JQXLite(this.componentSelector).on('unselected', function (event) { that.$emit('unselected', event); });
            }
        }
    }
</script>
