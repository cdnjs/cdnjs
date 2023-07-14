this.primevue = this.primevue || {};
this.primevue.tooltip = (function (utils, BaseDirective, usestyle) {
   'use strict';

   function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

   var BaseDirective__default = /*#__PURE__*/_interopDefaultLegacy(BaseDirective);

   var styles = "\n.p-tooltip {\n    position:absolute;\n    display:none;\n    padding: .25em .5rem;\n    max-width: 12.5rem;\n}\n\n.p-tooltip.p-tooltip-right,\n.p-tooltip.p-tooltip-left {\n    padding: 0 .25rem;\n}\n\n.p-tooltip.p-tooltip-top,\n.p-tooltip.p-tooltip-bottom {\n    padding:.25em 0;\n}\n\n.p-tooltip .p-tooltip-text {\n   white-space: pre-line;\n   word-break: break-word;\n}\n\n.p-tooltip-arrow {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-color: transparent;\n    border-style: solid;\n}\n\n.p-tooltip-right .p-tooltip-arrow {\n    top: 50%;\n    left: 0;\n    margin-top: -.25rem;\n    border-width: .25em .25em .25em 0;\n}\n\n.p-tooltip-left .p-tooltip-arrow {\n    top: 50%;\n    right: 0;\n    margin-top: -.25rem;\n    border-width: .25em 0 .25em .25rem;\n}\n\n.p-tooltip.p-tooltip-top {\n    padding: .25em 0;\n}\n\n.p-tooltip-top .p-tooltip-arrow {\n    bottom: 0;\n    left: 50%;\n    margin-left: -.25rem;\n    border-width: .25em .25em 0;\n}\n\n.p-tooltip-bottom .p-tooltip-arrow {\n    top: 0;\n    left: 50%;\n    margin-left: -.25rem;\n    border-width: 0 .25em .25rem;\n}\n";
   var classes = {
     root: 'p-tooltip p-component',
     arrow: 'p-tooltip-arrow',
     text: 'p-tooltip-text'
   };
   var _useStyle = usestyle.useStyle(styles, {
       name: 'tooltip',
       manual: true
     }),
     loadStyle = _useStyle.load;
   var BaseTooltip = BaseDirective__default["default"].extend({
     css: {
       classes: classes,
       loadStyle: loadStyle
     }
   });

   function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
   function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
   function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
   function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
   function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
   function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
   function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
   var Tooltip = BaseTooltip.extend('tooltip', {
     beforeMount: function beforeMount(el, options) {
       var _options$instance$$pr, _options$instance$$pr2, _options$value;
       var target = this.getTarget(el);
       target.$_ptooltipModifiers = this.getModifiers(options);
       if (!options.value) return;else if (typeof options.value === 'string') {
         target.$_ptooltipValue = options.value;
         target.$_ptooltipDisabled = false;
         target.$_ptooltipEscape = false;
         target.$_ptooltipClass = null;
         target.$_ptooltipFitContent = true;
         target.$_ptooltipIdAttr = utils.UniqueComponentId() + '_tooltip';
         target.$_ptooltipShowDelay = 0;
         target.$_ptooltipHideDelay = 0;
       } else if (_typeof(options.value) === 'object' && options.value) {
         if (utils.ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === '') return;else {
           target.$_ptooltipValue = options.value.value;
           target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
           target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : false;
           target.$_ptooltipClass = options.value["class"] || '';
           target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
           target.$_ptooltipIdAttr = options.value.id || utils.UniqueComponentId() + '_tooltip';
           target.$_ptooltipShowDelay = options.value.showDelay || 0;
           target.$_ptooltipHideDelay = options.value.hideDelay || 0;
         }
       }
       target.$_ptooltipZIndex = (_options$instance$$pr = options.instance.$primevue) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.config) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.zIndex) === null || _options$instance$$pr === void 0 ? void 0 : _options$instance$$pr.tooltip;
       target.unstyled = ((_options$instance$$pr2 = options.instance.$primevue) === null || _options$instance$$pr2 === void 0 || (_options$instance$$pr2 = _options$instance$$pr2.config) === null || _options$instance$$pr2 === void 0 ? void 0 : _options$instance$$pr2.unstyled) || ((_options$value = options.value) === null || _options$value === void 0 ? void 0 : _options$value.unstyled) || false;
       this.bindEvents(target, options);
       el.setAttribute('data-pd-tooltip', true);
     },
     updated: function updated(el, options) {
       var _options$instance$$pr3, _options$value2;
       var target = this.getTarget(el);
       target.$_ptooltipModifiers = this.getModifiers(options);
       this.unbindEvents(target);
       if (!options.value) {
         return;
       }
       if (typeof options.value === 'string') {
         target.$_ptooltipValue = options.value;
         target.$_ptooltipDisabled = false;
         target.$_ptooltipEscape = false;
         target.$_ptooltipClass = null;
         target.$_ptooltipIdAttr = target.$_ptooltipIdAttr || utils.UniqueComponentId() + '_tooltip';
         target.$_ptooltipShowDelay = 0;
         target.$_ptooltipHideDelay = 0;
         this.bindEvents(target, options);
       } else if (_typeof(options.value) === 'object' && options.value) {
         if (utils.ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === '') {
           this.unbindEvents(target, options);
           return;
         } else {
           target.$_ptooltipValue = options.value.value;
           target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
           target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : false;
           target.$_ptooltipClass = options.value["class"] || '';
           target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
           target.$_ptooltipIdAttr = options.value.id || target.$_ptooltipIdAttr || utils.UniqueComponentId() + '_tooltip';
           target.$_ptooltipShowDelay = options.value.showDelay || 0;
           target.$_ptooltipHideDelay = options.value.hideDelay || 0;
           this.bindEvents(target, options);
         }
       }
       target.unstyled = ((_options$instance$$pr3 = options.instance.$primevue) === null || _options$instance$$pr3 === void 0 || (_options$instance$$pr3 = _options$instance$$pr3.config) === null || _options$instance$$pr3 === void 0 ? void 0 : _options$instance$$pr3.unstyled) || ((_options$value2 = options.value) === null || _options$value2 === void 0 ? void 0 : _options$value2.unstyled) || false;
     },
     unmounted: function unmounted(el, options) {
       var target = this.getTarget(el);
       this.remove(target);
       this.unbindEvents(target, options);
       if (target.$_ptooltipScrollHandler) {
         target.$_ptooltipScrollHandler.destroy();
         target.$_ptooltipScrollHandler = null;
       }
     },
     timer: undefined,
     methods: {
       bindEvents: function bindEvents(el, options) {
         var _this = this;
         var modifiers = el.$_ptooltipModifiers;
         if (modifiers.focus) {
           el.$_focusevent = function (event) {
             return _this.onFocus(event, options);
           };
           el.addEventListener('focus', el.$_focusevent);
           el.addEventListener('blur', this.onBlur.bind(this));
         } else {
           el.$_mouseenterevent = function (event) {
             return _this.onMouseEnter(event, options);
           };
           el.addEventListener('mouseenter', el.$_mouseenterevent);
           el.addEventListener('mouseleave', this.onMouseLeave.bind(this));
           el.addEventListener('click', this.onClick.bind(this));
         }
         el.addEventListener('keydown', this.onKeydown.bind(this));
       },
       unbindEvents: function unbindEvents(el) {
         var modifiers = el.$_ptooltipModifiers;
         if (modifiers.focus) {
           el.removeEventListener('focus', el.$_focusevent);
           el.$_focusevent = null;
           el.removeEventListener('blur', this.onBlur.bind(this));
         } else {
           el.removeEventListener('mouseenter', el.$_mouseenterevent);
           el.$_mouseenterevent = null;
           el.removeEventListener('mouseleave', this.onMouseLeave.bind(this));
           el.removeEventListener('click', this.onClick.bind(this));
         }
         el.removeEventListener('keydown', this.onKeydown.bind(this));
       },
       bindScrollListener: function bindScrollListener(el) {
         var _this2 = this;
         if (!el.$_ptooltipScrollHandler) {
           el.$_ptooltipScrollHandler = new utils.ConnectedOverlayScrollHandler(el, function () {
             _this2.hide(el);
           });
         }
         el.$_ptooltipScrollHandler.bindScrollListener();
       },
       unbindScrollListener: function unbindScrollListener(el) {
         if (el.$_ptooltipScrollHandler) {
           el.$_ptooltipScrollHandler.unbindScrollListener();
         }
       },
       onMouseEnter: function onMouseEnter(event, options) {
         var el = event.currentTarget;
         var showDelay = el.$_ptooltipShowDelay;
         this.show(el, options, showDelay);
       },
       onMouseLeave: function onMouseLeave(event) {
         var el = event.currentTarget;
         var hideDelay = el.$_ptooltipHideDelay;
         this.hide(el, hideDelay);
       },
       onFocus: function onFocus(event, options) {
         var el = event.currentTarget;
         var showDelay = el.$_ptooltipShowDelay;
         this.show(el, options, showDelay);
       },
       onBlur: function onBlur(event) {
         var el = event.currentTarget;
         var hideDelay = el.$_ptooltipHideDelay;
         this.hide(el, hideDelay);
       },
       onClick: function onClick(event) {
         var el = event.currentTarget;
         var hideDelay = el.$_ptooltipHideDelay;
         this.hide(el, hideDelay);
       },
       onKeydown: function onKeydown(event) {
         var el = event.currentTarget;
         var hideDelay = el.$_ptooltipHideDelay;
         event.code === 'Escape' && this.hide(event.currentTarget, hideDelay);
       },
       tooltipActions: function tooltipActions(el, options) {
         if (el.$_ptooltipDisabled || !utils.DomHandler.isExist(el)) {
           return;
         }
         var tooltipElement = this.create(el, options);
         this.align(el);
         !el.unstyled && utils.DomHandler.fadeIn(tooltipElement, 250);
         var $this = this;
         window.addEventListener('resize', function onWindowResize() {
           if (!utils.DomHandler.isTouchDevice()) {
             $this.hide(el);
           }
           window.removeEventListener('resize', onWindowResize);
         });
         this.bindScrollListener(el);
         utils.ZIndexUtils.set('tooltip', tooltipElement, el.$_ptooltipZIndex);
       },
       show: function show(el, options, showDelay) {
         var _this3 = this;
         if (showDelay !== undefined) {
           this.timer = setTimeout(function () {
             return _this3.tooltipActions(el, options);
           }, showDelay);
         } else {
           this.tooltipActions(el, options);
         }
       },
       tooltipRemoval: function tooltipRemoval(el) {
         this.remove(el);
         this.unbindScrollListener(el);
       },
       hide: function hide(el, hideDelay) {
         var _this4 = this;
         clearTimeout(this.timer);
         if (hideDelay !== undefined) {
           setTimeout(function () {
             return _this4.tooltipRemoval(el);
           }, hideDelay);
         } else {
           this.tooltipRemoval(el);
         }
       },
       getTooltipElement: function getTooltipElement(el) {
         return document.getElementById(el.$_ptooltipId);
       },
       create: function create(el, options) {
         var tooltipArrow = utils.DomHandler.createElement('div', {
           "class": !el.unstyled && this.cx('arrow'),
           'p-bind': this.ptm('arrow')
         });
         var tooltipText = utils.DomHandler.createElement('div', {
           "class": !el.unstyled && this.cx('text'),
           'p-bind': this.ptm('text')
         });
         if (el.$_ptooltipEscape) {
           tooltipText.innerHTML = el.$_ptooltipValue;
         } else {
           tooltipText.innerHTML = '';
           tooltipText.appendChild(document.createTextNode(el.$_ptooltipValue));
         }
         var container = utils.DomHandler.createElement('div', {
           id: el.$_ptooltipIdAttr,
           role: 'tooltip',
           style: {
             display: 'inline-block',
             width: el.$_ptooltipFitContent ? 'fit-content' : undefined
           },
           "class": [!el.unstyled && this.cx('root'), el.$_ptooltipClass],
           'p-bind': this.ptm('root')
         }, tooltipArrow, tooltipText);
         document.body.appendChild(container);
         el.$_ptooltipId = container.id;
         this.$el = container;
         return container;
       },
       remove: function remove(el) {
         if (el) {
           var tooltipElement = this.getTooltipElement(el);
           if (tooltipElement && tooltipElement.parentElement) {
             utils.ZIndexUtils.clear(tooltipElement);
             document.body.removeChild(tooltipElement);
           }
           el.$_ptooltipId = null;
         }
       },
       align: function align(el) {
         var modifiers = el.$_ptooltipModifiers;
         if (modifiers.top) {
           this.alignTop(el);
           if (this.isOutOfBounds(el)) {
             this.alignBottom(el);
             if (this.isOutOfBounds(el)) {
               this.alignTop(el);
             }
           }
         } else if (modifiers.left) {
           this.alignLeft(el);
           if (this.isOutOfBounds(el)) {
             this.alignRight(el);
             if (this.isOutOfBounds(el)) {
               this.alignTop(el);
               if (this.isOutOfBounds(el)) {
                 this.alignBottom(el);
                 if (this.isOutOfBounds(el)) {
                   this.alignLeft(el);
                 }
               }
             }
           }
         } else if (modifiers.bottom) {
           this.alignBottom(el);
           if (this.isOutOfBounds(el)) {
             this.alignTop(el);
             if (this.isOutOfBounds(el)) {
               this.alignBottom(el);
             }
           }
         } else {
           this.alignRight(el);
           if (this.isOutOfBounds(el)) {
             this.alignLeft(el);
             if (this.isOutOfBounds(el)) {
               this.alignTop(el);
               if (this.isOutOfBounds(el)) {
                 this.alignBottom(el);
                 if (this.isOutOfBounds(el)) {
                   this.alignRight(el);
                 }
               }
             }
           }
         }
       },
       getHostOffset: function getHostOffset(el) {
         var offset = el.getBoundingClientRect();
         var targetLeft = offset.left + utils.DomHandler.getWindowScrollLeft();
         var targetTop = offset.top + utils.DomHandler.getWindowScrollTop();
         return {
           left: targetLeft,
           top: targetTop
         };
       },
       alignRight: function alignRight(el) {
         this.preAlign(el, 'right');
         var tooltipElement = this.getTooltipElement(el);
         var hostOffset = this.getHostOffset(el);
         var left = hostOffset.left + utils.DomHandler.getOuterWidth(el);
         var top = hostOffset.top + (utils.DomHandler.getOuterHeight(el) - utils.DomHandler.getOuterHeight(tooltipElement)) / 2;
         tooltipElement.style.left = left + 'px';
         tooltipElement.style.top = top + 'px';
       },
       alignLeft: function alignLeft(el) {
         this.preAlign(el, 'left');
         var tooltipElement = this.getTooltipElement(el);
         var hostOffset = this.getHostOffset(el);
         var left = hostOffset.left - utils.DomHandler.getOuterWidth(tooltipElement);
         var top = hostOffset.top + (utils.DomHandler.getOuterHeight(el) - utils.DomHandler.getOuterHeight(tooltipElement)) / 2;
         tooltipElement.style.left = left + 'px';
         tooltipElement.style.top = top + 'px';
       },
       alignTop: function alignTop(el) {
         this.preAlign(el, 'top');
         var tooltipElement = this.getTooltipElement(el);
         var hostOffset = this.getHostOffset(el);
         var left = hostOffset.left + (utils.DomHandler.getOuterWidth(el) - utils.DomHandler.getOuterWidth(tooltipElement)) / 2;
         var top = hostOffset.top - utils.DomHandler.getOuterHeight(tooltipElement);
         tooltipElement.style.left = left + 'px';
         tooltipElement.style.top = top + 'px';
       },
       alignBottom: function alignBottom(el) {
         this.preAlign(el, 'bottom');
         var tooltipElement = this.getTooltipElement(el);
         var hostOffset = this.getHostOffset(el);
         var left = hostOffset.left + (utils.DomHandler.getOuterWidth(el) - utils.DomHandler.getOuterWidth(tooltipElement)) / 2;
         var top = hostOffset.top + utils.DomHandler.getOuterHeight(el);
         tooltipElement.style.left = left + 'px';
         tooltipElement.style.top = top + 'px';
       },
       preAlign: function preAlign(el, position) {
         var tooltipElement = this.getTooltipElement(el);
         tooltipElement.style.left = -999 + 'px';
         tooltipElement.style.top = -999 + 'px';
         utils.DomHandler.removeClass(tooltipElement, "p-tooltip-".concat(tooltipElement.$_ptooltipPosition));
         utils.DomHandler.addClass(tooltipElement, "p-tooltip-".concat(position));
         tooltipElement.$_ptooltipPosition = position;
       },
       isOutOfBounds: function isOutOfBounds(el) {
         var tooltipElement = this.getTooltipElement(el);
         var offset = tooltipElement.getBoundingClientRect();
         var targetTop = offset.top;
         var targetLeft = offset.left;
         var width = utils.DomHandler.getOuterWidth(tooltipElement);
         var height = utils.DomHandler.getOuterHeight(tooltipElement);
         var viewport = utils.DomHandler.getViewport();
         return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
       },
       getTarget: function getTarget(el) {
         return utils.DomHandler.hasClass(el, 'p-inputwrapper') ? utils.DomHandler.findSingle(el, 'input') : el;
       },
       getModifiers: function getModifiers(options) {
         // modifiers
         if (options.modifiers && Object.keys(options.modifiers).length) {
           return options.modifiers;
         }

         // arg
         if (options.arg && _typeof(options.arg) === 'object') {
           return Object.entries(options.arg).reduce(function (acc, _ref) {
             var _ref2 = _slicedToArray(_ref, 2),
               key = _ref2[0],
               val = _ref2[1];
             if (key === 'event' || key === 'position') acc[val] = true;
             return acc;
           }, {});
         }
         return {};
       }
     }
   });

   return Tooltip;

})(primevue.utils, primevue.basedirective, primevue.usestyle);
