(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs'), require('rxjs/operators'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('ngb', ['exports', '@angular/core', '@angular/common', 'rxjs', 'rxjs/operators', '@angular/forms'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ngb = {}, global.ng.core, global.ng.common, global.rxjs, global.rxjs.operators, global.ng.forms));
}(this, (function (exports, i0, i1, rxjs, operators, forms) { 'use strict';

    function toInteger(value) {
        return parseInt("" + value, 10);
    }
    function toString(value) {
        return (value !== undefined && value !== null) ? "" + value : '';
    }
    function getValueInRange(value, max, min) {
        if (min === void 0) { min = 0; }
        return Math.max(Math.min(value, max), min);
    }
    function isString(value) {
        return typeof value === 'string';
    }
    function isNumber(value) {
        return !isNaN(toInteger(value));
    }
    function isInteger(value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    }
    function isDefined(value) {
        return value !== undefined && value !== null;
    }
    function padNumber(value) {
        if (isNumber(value)) {
            return ("0" + value).slice(-2);
        }
        else {
            return '';
        }
    }
    function regExpEscape(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
    function hasClassName(element, className) {
        return element && element.className && element.className.split &&
            element.className.split(/\s+/).indexOf(className) >= 0;
    }
    if (typeof Element !== 'undefined' && !Element.prototype.closest) {
        // Polyfill for ie10+
        if (!Element.prototype.matches) {
            // IE uses the non-standard name: msMatchesSelector
            Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        Element.prototype.closest = function (s) {
            var el = this;
            if (!document.documentElement.contains(el)) {
                return null;
            }
            do {
                if (el.matches(s)) {
                    return el;
                }
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
    function closest(element, selector) {
        if (!selector) {
            return null;
        }
        /*
         * In certain browsers (e.g. Edge 44.18362.449.0) HTMLDocument does
         * not support `Element.prototype.closest`. To emulate the correct behaviour
         * we return null when the method is missing.
         *
         * Note that in evergreen browsers `closest(document.documentElement, 'html')`
         * will return the document element whilst in Edge null will be returned. This
         * compromise was deemed good enough.
         */
        if (typeof element.closest === 'undefined') {
            return null;
        }
        return element.closest(selector);
    }
    /**
     * Force a browser reflow
     * @param element element where to apply the reflow
     */
    function reflow(element) {
        return (element || document.body).getBoundingClientRect();
    }
    /**
     * Creates an observable where all callbacks are executed inside a given zone
     *
     * @param zone
     */
    function runInZone(zone) {
        return function (source) {
            return new rxjs.Observable(function (observer) {
                var onNext = function (value) { return zone.run(function () { return observer.next(value); }); };
                var onError = function (e) { return zone.run(function () { return observer.error(e); }); };
                var onComplete = function () { return zone.run(function () { return observer.complete(); }); };
                return source.subscribe(onNext, onError, onComplete);
            });
        };
    }
    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    var environment = {
        animation: true,
        transitionTimerDelayMs: 5,
    };

    /**
     * Global ng-bootstrap config
     *
     * @since 8.0.0
     */
    var NgbConfig = /** @class */ (function () {
        function NgbConfig() {
            this.animation = environment.animation;
        }
        return NgbConfig;
    }());
    NgbConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbConfig_Factory() { return new NgbConfig(); }, token: NgbConfig, providedIn: "root" });
    NgbConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    /**
     * A configuration service for the [NgbAccordion](#/components/accordion/api#NgbAccordion) component.
     *
     * You can inject this service, typically in your root component, and customize its properties
     * to provide default values for all accordions used in the application.
     */
    var NgbAccordionConfig = /** @class */ (function () {
        function NgbAccordionConfig(_ngbConfig) {
            this._ngbConfig = _ngbConfig;
            this.closeOthers = false;
        }
        Object.defineProperty(NgbAccordionConfig.prototype, "animation", {
            get: function () { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; },
            set: function (animation) { this._animation = animation; },
            enumerable: false,
            configurable: true
        });
        return NgbAccordionConfig;
    }());
    NgbAccordionConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbAccordionConfig_Factory() { return new NgbAccordionConfig(i0.ɵɵinject(NgbConfig)); }, token: NgbAccordionConfig, providedIn: "root" });
    NgbAccordionConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbAccordionConfig.ctorParameters = function () { return [
        { type: NgbConfig }
    ]; };

    function getTransitionDurationMs(element) {
        var _a = window.getComputedStyle(element), transitionDelay = _a.transitionDelay, transitionDuration = _a.transitionDuration;
        var transitionDelaySec = parseFloat(transitionDelay);
        var transitionDurationSec = parseFloat(transitionDuration);
        return (transitionDelaySec + transitionDurationSec) * 1000;
    }

    var noopFn = function () { };
    var ɵ0 = noopFn;
    var transitionTimerDelayMs = environment.transitionTimerDelayMs;
    var runningTransitions = new Map();
    var ngbRunTransition = function (zone, element, startFn, options) {
        // Getting initial context from options
        var context = options.context || {};
        // Checking if there are already running transitions on the given element.
        var running = runningTransitions.get(element);
        if (running) {
            switch (options.runningTransition) {
                // If there is one running and we want for it to 'continue' to run, we have to cancel the new one.
                // We're not emitting any values, but simply completing the observable (EMPTY).
                case 'continue':
                    return rxjs.EMPTY;
                // If there is one running and we want for it to 'stop', we have to complete the running one.
                // We're simply completing the running one and not emitting any values and merging newly provided context
                // with the one coming from currently running transition.
                case 'stop':
                    zone.run(function () { return running.transition$.complete(); });
                    context = Object.assign(running.context, context);
                    runningTransitions.delete(element);
            }
        }
        // Running the start function
        var endFn = startFn(element, options.animation, context) || noopFn;
        // If 'prefer-reduced-motion' is enabled, the 'transition' will be set to 'none'.
        // If animations are disabled, we have to emit a value and complete the observable
        // In this case we have to call the end function, but can finish immediately by emitting a value,
        // completing the observable and executing end functions synchronously.
        if (!options.animation || window.getComputedStyle(element).transitionProperty === 'none') {
            zone.run(function () { return endFn(); });
            return rxjs.of(undefined).pipe(runInZone(zone));
        }
        // Starting a new transition
        var transition$ = new rxjs.Subject();
        var finishTransition$ = new rxjs.Subject();
        var stop$ = transition$.pipe(operators.endWith(true));
        runningTransitions.set(element, {
            transition$: transition$,
            complete: function () {
                finishTransition$.next();
                finishTransition$.complete();
            },
            context: context
        });
        var transitionDurationMs = getTransitionDurationMs(element);
        // 1. We have to both listen for the 'transitionend' event and have a 'just-in-case' timer,
        // because 'transitionend' event might not be fired in some browsers, if the transitioning
        // element becomes invisible (ex. when scrolling, making browser tab inactive, etc.). The timer
        // guarantees, that we'll release the DOM element and complete 'ngbRunTransition'.
        // 2. We need to filter transition end events, because they might bubble from shorter transitions
        // on inner DOM elements. We're only interested in the transition on the 'element' itself.
        zone.runOutsideAngular(function () {
            var transitionEnd$ = rxjs.fromEvent(element, 'transitionend').pipe(operators.takeUntil(stop$), operators.filter(function (_b) {
                var target = _b.target;
                return target === element;
            }));
            var timer$ = rxjs.timer(transitionDurationMs + transitionTimerDelayMs).pipe(operators.takeUntil(stop$));
            rxjs.race(timer$, transitionEnd$, finishTransition$).pipe(operators.takeUntil(stop$)).subscribe(function () {
                runningTransitions.delete(element);
                zone.run(function () {
                    endFn();
                    transition$.next();
                    transition$.complete();
                });
            });
        });
        return transition$.asObservable();
    };
    var ngbCompleteTransition = function (element) {
        var _a;
        (_a = runningTransitions.get(element)) === null || _a === void 0 ? void 0 : _a.complete();
    };

    function measureCollapsingElementHeightPx(element) {
        // SSR fix for without injecting the PlatformId
        if (typeof navigator === 'undefined') {
            return '0px';
        }
        var classList = element.classList;
        var hasShownClass = classList.contains('show');
        if (!hasShownClass) {
            classList.add('show');
        }
        element.style.height = '';
        var height = element.getBoundingClientRect().height + 'px';
        if (!hasShownClass) {
            classList.remove('show');
        }
        return height;
    }
    var ngbCollapsingTransition = function (element, animation, context) {
        var direction = context.direction, maxHeight = context.maxHeight;
        var classList = element.classList;
        function setInitialClasses() {
            classList.add('collapse');
            if (direction === 'show') {
                classList.add('show');
            }
            else {
                classList.remove('show');
            }
        }
        // without animations we just need to set initial classes
        if (!animation) {
            setInitialClasses();
            return;
        }
        // No maxHeight -> running the transition for the first time
        if (!maxHeight) {
            maxHeight = measureCollapsingElementHeightPx(element);
            context.maxHeight = maxHeight;
            // Fix the height before starting the animation
            element.style.height = direction !== 'show' ? maxHeight : '0px';
            classList.remove('collapse');
            classList.remove('collapsing');
            classList.remove('show');
            reflow(element);
            // Start the animation
            classList.add('collapsing');
        }
        // Start or revert the animation
        element.style.height = direction === 'show' ? maxHeight : '0px';
        return function () {
            setInitialClasses();
            classList.remove('collapsing');
            element.style.height = '';
        };
    };

    var nextId = 0;
    /**
     * A directive that wraps an accordion panel header with any HTML markup and a toggling button
     * marked with [`NgbPanelToggle`](#/components/accordion/api#NgbPanelToggle).
     * See the [header customization demo](#/components/accordion/examples#header) for more details.
     *
     * You can also use [`NgbPanelTitle`](#/components/accordion/api#NgbPanelTitle) to customize only the panel title.
     *
     * @since 4.1.0
     */
    var NgbPanelHeader = /** @class */ (function () {
        function NgbPanelHeader(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPanelHeader;
    }());
    NgbPanelHeader.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPanelHeader]' },] }
    ];
    NgbPanelHeader.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A directive that wraps only the panel title with HTML markup inside.
     *
     * You can also use [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader) to customize the full panel header.
     */
    var NgbPanelTitle = /** @class */ (function () {
        function NgbPanelTitle(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPanelTitle;
    }());
    NgbPanelTitle.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPanelTitle]' },] }
    ];
    NgbPanelTitle.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A directive that wraps the accordion panel content.
     */
    var NgbPanelContent = /** @class */ (function () {
        function NgbPanelContent(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPanelContent;
    }());
    NgbPanelContent.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPanelContent]' },] }
    ];
    NgbPanelContent.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A directive that wraps an individual accordion panel with title and collapsible content.
     */
    var NgbPanel = /** @class */ (function () {
        function NgbPanel() {
            /**
             *  If `true`, the panel is disabled an can't be toggled.
             */
            this.disabled = false;
            /**
             *  An optional id for the panel that must be unique on the page.
             *
             *  If not provided, it will be auto-generated in the `ngb-panel-xxx` format.
             */
            this.id = "ngb-panel-" + nextId++;
            this.isOpen = false;
            /* A flag to specified that the transition panel classes have been initialized */
            this.initClassDone = false;
            /* A flag to specified if the panel is currently being animated, to ensure its presence in the dom */
            this.transitionRunning = false;
            /**
             * An event emitted when the panel is shown, after the transition. It has no payload.
             *
             * @since 8.0.0
             */
            this.shown = new i0.EventEmitter();
            /**
             * An event emitted when the panel is hidden, after the transition. It has no payload.
             *
             * @since 8.0.0
             */
            this.hidden = new i0.EventEmitter();
        }
        NgbPanel.prototype.ngAfterContentChecked = function () {
            // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
            // only @ContentChildren allows us to specify the {descendants: false} option.
            // Without {descendants: false} we are hitting bugs described in:
            // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
            this.titleTpl = this.titleTpls.first;
            this.headerTpl = this.headerTpls.first;
            this.contentTpl = this.contentTpls.first;
        };
        return NgbPanel;
    }());
    NgbPanel.decorators = [
        { type: i0.Directive, args: [{ selector: 'ngb-panel' },] }
    ];
    NgbPanel.propDecorators = {
        disabled: [{ type: i0.Input }],
        id: [{ type: i0.Input }],
        title: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        cardClass: [{ type: i0.Input }],
        shown: [{ type: i0.Output }],
        hidden: [{ type: i0.Output }],
        titleTpls: [{ type: i0.ContentChildren, args: [NgbPanelTitle, { descendants: false },] }],
        headerTpls: [{ type: i0.ContentChildren, args: [NgbPanelHeader, { descendants: false },] }],
        contentTpls: [{ type: i0.ContentChildren, args: [NgbPanelContent, { descendants: false },] }]
    };
    /**
     * Accordion is a collection of collapsible panels (bootstrap cards).
     *
     * It can ensure only one panel is opened at a time and allows to customize panel
     * headers.
     */
    var NgbAccordion = /** @class */ (function () {
        function NgbAccordion(config, _element, _ngZone, _changeDetector) {
            this._element = _element;
            this._ngZone = _ngZone;
            this._changeDetector = _changeDetector;
            /**
             * An array or comma separated strings of panel ids that should be opened **initially**.
             *
             * For subsequent changes use methods like `expand()`, `collapse()`, etc. and
             * the `(panelChange)` event.
             */
            this.activeIds = [];
            /**
             * If `true`, panel content will be detached from DOM and not simply hidden when the panel is collapsed.
             */
            this.destroyOnHide = true;
            /**
             * Event emitted right before the panel toggle happens.
             *
             * See [NgbPanelChangeEvent](#/components/accordion/api#NgbPanelChangeEvent) for payload details.
             */
            this.panelChange = new i0.EventEmitter();
            /**
             * An event emitted when the expanding animation is finished on the panel. The payload is the panel id.
             *
             * @since 8.0.0
             */
            this.shown = new i0.EventEmitter();
            /**
             * An event emitted when the collapsing animation is finished on the panel, and before the panel element is removed.
             * The payload is the panel id.
             *
             * @since 8.0.0
             */
            this.hidden = new i0.EventEmitter();
            this.animation = config.animation;
            this.type = config.type;
            this.closeOtherPanels = config.closeOthers;
        }
        /**
         * Checks if a panel with a given id is expanded.
         */
        NgbAccordion.prototype.isExpanded = function (panelId) { return this.activeIds.indexOf(panelId) > -1; };
        /**
         * Expands a panel with a given id.
         *
         * Has no effect if the panel is already expanded or disabled.
         */
        NgbAccordion.prototype.expand = function (panelId) { this._changeOpenState(this._findPanelById(panelId), true); };
        /**
         * Expands all panels, if `[closeOthers]` is `false`.
         *
         * If `[closeOthers]` is `true`, it will expand the first panel, unless there is already a panel opened.
         */
        NgbAccordion.prototype.expandAll = function () {
            var _this = this;
            if (this.closeOtherPanels) {
                if (this.activeIds.length === 0 && this.panels.length) {
                    this._changeOpenState(this.panels.first, true);
                }
            }
            else {
                this.panels.forEach(function (panel) { return _this._changeOpenState(panel, true); });
            }
        };
        /**
         * Collapses a panel with the given id.
         *
         * Has no effect if the panel is already collapsed or disabled.
         */
        NgbAccordion.prototype.collapse = function (panelId) { this._changeOpenState(this._findPanelById(panelId), false); };
        /**
         * Collapses all opened panels.
         */
        NgbAccordion.prototype.collapseAll = function () {
            var _this = this;
            this.panels.forEach(function (panel) { _this._changeOpenState(panel, false); });
        };
        /**
         * Toggles a panel with the given id.
         *
         * Has no effect if the panel is disabled.
         */
        NgbAccordion.prototype.toggle = function (panelId) {
            var panel = this._findPanelById(panelId);
            if (panel) {
                this._changeOpenState(panel, !panel.isOpen);
            }
        };
        NgbAccordion.prototype.ngAfterContentChecked = function () {
            var _this = this;
            // active id updates
            if (isString(this.activeIds)) {
                this.activeIds = this.activeIds.split(/\s*,\s*/);
            }
            // update panels open states
            this.panels.forEach(function (panel) { panel.isOpen = !panel.disabled && _this.activeIds.indexOf(panel.id) > -1; });
            // closeOthers updates
            if (this.activeIds.length > 1 && this.closeOtherPanels) {
                this._closeOthers(this.activeIds[0], false);
                this._updateActiveIds();
            }
            // Setup the initial classes here
            this._ngZone.onStable.pipe(operators.take(1)).subscribe(function () {
                _this.panels.forEach(function (panel) {
                    var panelElement = _this._getPanelElement(panel.id);
                    if (panelElement) {
                        if (!panel.initClassDone) {
                            panel.initClassDone = true;
                            ngbRunTransition(_this._ngZone, panelElement, ngbCollapsingTransition, {
                                animation: false,
                                runningTransition: 'continue',
                                context: { direction: panel.isOpen ? 'show' : 'hide' }
                            });
                        }
                    }
                    else {
                        // Classes must be initialized next time it will be in the dom
                        panel.initClassDone = false;
                    }
                });
            });
        };
        NgbAccordion.prototype._changeOpenState = function (panel, nextState) {
            if (panel != null && !panel.disabled && panel.isOpen !== nextState) {
                var defaultPrevented_1 = false;
                this.panelChange.emit({ panelId: panel.id, nextState: nextState, preventDefault: function () { defaultPrevented_1 = true; } });
                if (!defaultPrevented_1) {
                    panel.isOpen = nextState;
                    panel.transitionRunning = true;
                    if (nextState && this.closeOtherPanels) {
                        this._closeOthers(panel.id);
                    }
                    this._updateActiveIds();
                    this._runTransitions(this.animation);
                }
            }
        };
        NgbAccordion.prototype._closeOthers = function (panelId, enableTransition) {
            if (enableTransition === void 0) { enableTransition = true; }
            this.panels.forEach(function (panel) {
                if (panel.id !== panelId && panel.isOpen) {
                    panel.isOpen = false;
                    panel.transitionRunning = enableTransition;
                }
            });
        };
        NgbAccordion.prototype._findPanelById = function (panelId) { return this.panels.find(function (p) { return p.id === panelId; }) || null; };
        NgbAccordion.prototype._updateActiveIds = function () {
            this.activeIds = this.panels.filter(function (panel) { return panel.isOpen && !panel.disabled; }).map(function (panel) { return panel.id; });
        };
        NgbAccordion.prototype._runTransitions = function (animation) {
            var _this = this;
            // detectChanges is performed to ensure that all panels are in the dom (via transitionRunning = true)
            // before starting the animation
            this._changeDetector.detectChanges();
            this.panels.forEach(function (panel) {
                // When panel.transitionRunning is true, the transition needs to be started OR reversed,
                // The direction (show or hide) is choosen by each panel.isOpen state
                if (panel.transitionRunning) {
                    var panelElement = _this._getPanelElement(panel.id);
                    ngbRunTransition(_this._ngZone, panelElement, ngbCollapsingTransition, {
                        animation: animation,
                        runningTransition: 'stop',
                        context: { direction: panel.isOpen ? 'show' : 'hide' }
                    }).subscribe(function () {
                        panel.transitionRunning = false;
                        var id = panel.id;
                        if (panel.isOpen) {
                            panel.shown.emit();
                            _this.shown.emit(id);
                        }
                        else {
                            panel.hidden.emit();
                            _this.hidden.emit(id);
                        }
                    });
                }
            });
        };
        NgbAccordion.prototype._getPanelElement = function (panelId) {
            return this._element.nativeElement.querySelector('#' + panelId);
        };
        return NgbAccordion;
    }());
    NgbAccordion.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-accordion',
                    exportAs: 'ngbAccordion',
                    encapsulation: i0.ViewEncapsulation.None,
                    host: { 'class': 'accordion', 'role': 'tablist', '[attr.aria-multiselectable]': '!closeOtherPanels' },
                    template: "\n    <ng-template #t ngbPanelHeader let-panel>\n      <button class=\"btn btn-link\" [ngbPanelToggle]=\"panel\">\n        {{panel.title}}<ng-template [ngTemplateOutlet]=\"panel.titleTpl?.templateRef\"></ng-template>\n      </button>\n    </ng-template>\n    <ng-template ngFor let-panel [ngForOf]=\"panels\">\n      <div [class]=\"'card ' + (panel.cardClass || '')\">\n        <div role=\"tab\" id=\"{{panel.id}}-header\" [class]=\"'card-header ' + (panel.type ? 'bg-'+panel.type: type ? 'bg-'+type : '')\">\n          <ng-template [ngTemplateOutlet]=\"panel.headerTpl?.templateRef || t\"\n                       [ngTemplateOutletContext]=\"{$implicit: panel, opened: panel.isOpen}\"></ng-template>\n        </div>\n        <div id=\"{{panel.id}}\" role=\"tabpanel\" [attr.aria-labelledby]=\"panel.id + '-header'\"\n             *ngIf=\"!destroyOnHide || panel.isOpen || panel.transitionRunning\">\n          <div class=\"card-body\">\n               <ng-template [ngTemplateOutlet]=\"panel.contentTpl?.templateRef || null\"></ng-template>\n          </div>\n        </div>\n      </div>\n    </ng-template>\n  "
                },] }
    ];
    NgbAccordion.ctorParameters = function () { return [
        { type: NgbAccordionConfig },
        { type: i0.ElementRef },
        { type: i0.NgZone },
        { type: i0.ChangeDetectorRef }
    ]; };
    NgbAccordion.propDecorators = {
        panels: [{ type: i0.ContentChildren, args: [NgbPanel,] }],
        animation: [{ type: i0.Input }],
        activeIds: [{ type: i0.Input }],
        closeOtherPanels: [{ type: i0.Input, args: ['closeOthers',] }],
        destroyOnHide: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        panelChange: [{ type: i0.Output }],
        shown: [{ type: i0.Output }],
        hidden: [{ type: i0.Output }]
    };
    /**
     * A directive to put on a button that toggles panel opening and closing.
     *
     * To be used inside the [`NgbPanelHeader`](#/components/accordion/api#NgbPanelHeader)
     *
     * @since 4.1.0
     */
    var NgbPanelToggle = /** @class */ (function () {
        function NgbPanelToggle(accordion, panel) {
            this.accordion = accordion;
            this.panel = panel;
        }
        Object.defineProperty(NgbPanelToggle.prototype, "ngbPanelToggle", {
            set: function (panel) {
                if (panel) {
                    this.panel = panel;
                }
            },
            enumerable: false,
            configurable: true
        });
        return NgbPanelToggle;
    }());
    NgbPanelToggle.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'button[ngbPanelToggle]',
                    host: {
                        'type': 'button',
                        '[disabled]': 'panel.disabled',
                        '[class.collapsed]': '!panel.isOpen',
                        '[attr.aria-expanded]': 'panel.isOpen',
                        '[attr.aria-controls]': 'panel.id',
                        '(click)': 'accordion.toggle(panel.id)'
                    }
                },] }
    ];
    NgbPanelToggle.ctorParameters = function () { return [
        { type: NgbAccordion },
        { type: NgbPanel, decorators: [{ type: i0.Optional }, { type: i0.Host }] }
    ]; };
    NgbPanelToggle.propDecorators = {
        ngbPanelToggle: [{ type: i0.Input }]
    };

    var NGB_ACCORDION_DIRECTIVES = [NgbAccordion, NgbPanel, NgbPanelTitle, NgbPanelContent, NgbPanelHeader, NgbPanelToggle];
    var NgbAccordionModule = /** @class */ (function () {
        function NgbAccordionModule() {
        }
        return NgbAccordionModule;
    }());
    NgbAccordionModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: NGB_ACCORDION_DIRECTIVES, exports: NGB_ACCORDION_DIRECTIVES, imports: [i1.CommonModule] },] }
    ];

    /**
     * A configuration service for the [NgbAlert](#/components/alert/api#NgbAlert) component.
     *
     * You can inject this service, typically in your root component, and customize its properties
     * to provide default values for all alerts used in the application.
     */
    var NgbAlertConfig = /** @class */ (function () {
        function NgbAlertConfig(_ngbConfig) {
            this._ngbConfig = _ngbConfig;
            this.dismissible = true;
            this.type = 'warning';
        }
        Object.defineProperty(NgbAlertConfig.prototype, "animation", {
            get: function () { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; },
            set: function (animation) { this._animation = animation; },
            enumerable: false,
            configurable: true
        });
        return NgbAlertConfig;
    }());
    NgbAlertConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbAlertConfig_Factory() { return new NgbAlertConfig(i0.ɵɵinject(NgbConfig)); }, token: NgbAlertConfig, providedIn: "root" });
    NgbAlertConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbAlertConfig.ctorParameters = function () { return [
        { type: NgbConfig }
    ]; };

    var ngbAlertFadingTransition = function (_a) {
        var classList = _a.classList;
        classList.remove('show');
    };

    /**
     * Alert is a component to provide contextual feedback messages for user.
     *
     * It supports several alert types and can be dismissed.
     */
    var NgbAlert = /** @class */ (function () {
        function NgbAlert(config, _renderer, _element, _zone) {
            this._renderer = _renderer;
            this._element = _element;
            this._zone = _zone;
            /**
             * An event emitted when the close button is clicked. It has no payload and only relevant for dismissible alerts.
             *
             * @since 8.0.0
             */
            this.closed = new i0.EventEmitter();
            this.dismissible = config.dismissible;
            this.type = config.type;
            this.animation = config.animation;
        }
        /**
         * Triggers alert closing programmatically (same as clicking on the close button (×)).
         *
         * The returned observable will emit and be completed once the closing transition has finished.
         * If the animations are turned off this happens synchronously.
         *
         * Alternatively you could listen or subscribe to the `(closed)` output
         *
         * @since 8.0.0
         */
        NgbAlert.prototype.close = function () {
            var _this = this;
            var transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbAlertFadingTransition, { animation: this.animation, runningTransition: 'continue' });
            transition.subscribe(function () { return _this.closed.emit(); });
            return transition;
        };
        NgbAlert.prototype.ngOnChanges = function (changes) {
            var typeChange = changes['type'];
            if (typeChange && !typeChange.firstChange) {
                this._renderer.removeClass(this._element.nativeElement, "alert-" + typeChange.previousValue);
                this._renderer.addClass(this._element.nativeElement, "alert-" + typeChange.currentValue);
            }
        };
        NgbAlert.prototype.ngOnInit = function () { this._renderer.addClass(this._element.nativeElement, "alert-" + this.type); };
        return NgbAlert;
    }());
    NgbAlert.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-alert',
                    exportAs: 'ngbAlert',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    host: { 'role': 'alert', 'class': 'alert show', '[class.fade]': 'animation', '[class.alert-dismissible]': 'dismissible' },
                    template: "\n    <ng-content></ng-content>\n    <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" aria-label=\"Close\" i18n-aria-label=\"@@ngb.alert.close\"\n      (click)=\"close()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n    ",
                    styles: ["ngb-alert{display:block}"]
                },] }
    ];
    NgbAlert.ctorParameters = function () { return [
        { type: NgbAlertConfig },
        { type: i0.Renderer2 },
        { type: i0.ElementRef },
        { type: i0.NgZone }
    ]; };
    NgbAlert.propDecorators = {
        animation: [{ type: i0.Input }],
        dismissible: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        closed: [{ type: i0.Output }]
    };

    var NgbAlertModule = /** @class */ (function () {
        function NgbAlertModule() {
        }
        return NgbAlertModule;
    }());
    NgbAlertModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: [NgbAlert], exports: [NgbAlert], imports: [i1.CommonModule], entryComponents: [NgbAlert] },] }
    ];

    var NgbButtonLabel = /** @class */ (function () {
        function NgbButtonLabel() {
        }
        return NgbButtonLabel;
    }());
    NgbButtonLabel.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngbButtonLabel]',
                    host: { '[class.btn]': 'true', '[class.active]': 'active', '[class.disabled]': 'disabled', '[class.focus]': 'focused' }
                },] }
    ];

    /**
     * Allows to easily create Bootstrap-style checkbox buttons.
     *
     * Integrates with forms, so the value of a checked button is bound to the underlying form control
     * either in a reactive or template-driven way.
     */
    var NgbCheckBox = /** @class */ (function () {
        function NgbCheckBox(_label, _cd) {
            this._label = _label;
            this._cd = _cd;
            /**
             * If `true`, the checkbox button will be disabled
             */
            this.disabled = false;
            /**
             * The form control value when the checkbox is checked.
             */
            this.valueChecked = true;
            /**
             * The form control value when the checkbox is unchecked.
             */
            this.valueUnChecked = false;
            this.onChange = function (_) { };
            this.onTouched = function () { };
        }
        Object.defineProperty(NgbCheckBox.prototype, "focused", {
            set: function (isFocused) {
                this._label.focused = isFocused;
                if (!isFocused) {
                    this.onTouched();
                }
            },
            enumerable: false,
            configurable: true
        });
        NgbCheckBox.prototype.onInputChange = function ($event) {
            var modelToPropagate = $event.target.checked ? this.valueChecked : this.valueUnChecked;
            this.onChange(modelToPropagate);
            this.onTouched();
            this.writeValue(modelToPropagate);
        };
        NgbCheckBox.prototype.registerOnChange = function (fn) { this.onChange = fn; };
        NgbCheckBox.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        NgbCheckBox.prototype.setDisabledState = function (isDisabled) {
            this.disabled = isDisabled;
            this._label.disabled = isDisabled;
        };
        NgbCheckBox.prototype.writeValue = function (value) {
            this.checked = value === this.valueChecked;
            this._label.active = this.checked;
            // label won't be updated, if it is inside the OnPush component when [ngModel] changes
            this._cd.markForCheck();
        };
        return NgbCheckBox;
    }());
    NgbCheckBox.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngbButton][type=checkbox]',
                    host: {
                        '[checked]': 'checked',
                        '[disabled]': 'disabled',
                        '(change)': 'onInputChange($event)',
                        '(focus)': 'focused = true',
                        '(blur)': 'focused = false'
                    },
                    providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: i0.forwardRef(function () { return NgbCheckBox; }), multi: true }]
                },] }
    ];
    NgbCheckBox.ctorParameters = function () { return [
        { type: NgbButtonLabel },
        { type: i0.ChangeDetectorRef }
    ]; };
    NgbCheckBox.propDecorators = {
        disabled: [{ type: i0.Input }],
        valueChecked: [{ type: i0.Input }],
        valueUnChecked: [{ type: i0.Input }]
    };

    var nextId$1 = 0;
    /**
     * Allows to easily create Bootstrap-style radio buttons.
     *
     * Integrates with forms, so the value of a checked button is bound to the underlying form control
     * either in a reactive or template-driven way.
     */
    var NgbRadioGroup = /** @class */ (function () {
        function NgbRadioGroup() {
            this._radios = new Set();
            this._value = null;
            /**
             * Name of the radio group applied to radio input elements.
             *
             * Will be applied to all radio input elements inside the group,
             * unless [`NgbRadio`](#/components/buttons/api#NgbRadio)'s specify names themselves.
             *
             * If not provided, will be generated in the `ngb-radio-xx` format.
             */
            this.name = "ngb-radio-" + nextId$1++;
            this.onChange = function (_) { };
            this.onTouched = function () { };
        }
        Object.defineProperty(NgbRadioGroup.prototype, "disabled", {
            get: function () { return this._disabled; },
            set: function (isDisabled) { this.setDisabledState(isDisabled); },
            enumerable: false,
            configurable: true
        });
        NgbRadioGroup.prototype.onRadioChange = function (radio) {
            this.writeValue(radio.value);
            this.onChange(radio.value);
        };
        NgbRadioGroup.prototype.onRadioValueUpdate = function () { this._updateRadiosValue(); };
        NgbRadioGroup.prototype.register = function (radio) { this._radios.add(radio); };
        NgbRadioGroup.prototype.registerOnChange = function (fn) { this.onChange = fn; };
        NgbRadioGroup.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        NgbRadioGroup.prototype.setDisabledState = function (isDisabled) {
            this._disabled = isDisabled;
            this._updateRadiosDisabled();
        };
        NgbRadioGroup.prototype.unregister = function (radio) { this._radios.delete(radio); };
        NgbRadioGroup.prototype.writeValue = function (value) {
            this._value = value;
            this._updateRadiosValue();
        };
        NgbRadioGroup.prototype._updateRadiosValue = function () {
            var _this = this;
            this._radios.forEach(function (radio) { return radio.updateValue(_this._value); });
        };
        NgbRadioGroup.prototype._updateRadiosDisabled = function () { this._radios.forEach(function (radio) { return radio.updateDisabled(); }); };
        return NgbRadioGroup;
    }());
    NgbRadioGroup.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngbRadioGroup]',
                    host: { 'role': 'radiogroup' },
                    providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: i0.forwardRef(function () { return NgbRadioGroup; }), multi: true }]
                },] }
    ];
    NgbRadioGroup.propDecorators = {
        name: [{ type: i0.Input }]
    };
    /**
     * A directive that marks an input of type "radio" as a part of the
     * [`NgbRadioGroup`](#/components/buttons/api#NgbRadioGroup).
     */
    var NgbRadio = /** @class */ (function () {
        function NgbRadio(_group, _label, _renderer, _element, _cd) {
            this._group = _group;
            this._label = _label;
            this._renderer = _renderer;
            this._element = _element;
            this._cd = _cd;
            this._value = null;
            this._group.register(this);
            this.updateDisabled();
        }
        Object.defineProperty(NgbRadio.prototype, "value", {
            get: function () { return this._value; },
            /**
             * The form control value when current radio button is checked.
             */
            set: function (value) {
                this._value = value;
                var stringValue = value ? value.toString() : '';
                this._renderer.setProperty(this._element.nativeElement, 'value', stringValue);
                this._group.onRadioValueUpdate();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbRadio.prototype, "disabled", {
            get: function () { return this._group.disabled || this._disabled; },
            /**
             * If `true`, current radio button will be disabled.
             */
            set: function (isDisabled) {
                this._disabled = isDisabled !== false;
                this.updateDisabled();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbRadio.prototype, "focused", {
            set: function (isFocused) {
                if (this._label) {
                    this._label.focused = isFocused;
                }
                if (!isFocused) {
                    this._group.onTouched();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbRadio.prototype, "checked", {
            get: function () { return this._checked; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbRadio.prototype, "nameAttr", {
            get: function () { return this.name || this._group.name; },
            enumerable: false,
            configurable: true
        });
        NgbRadio.prototype.ngOnDestroy = function () { this._group.unregister(this); };
        NgbRadio.prototype.onChange = function () { this._group.onRadioChange(this); };
        NgbRadio.prototype.updateValue = function (value) {
            // label won't be updated, if it is inside the OnPush component when [ngModel] changes
            if (this.value !== value) {
                this._cd.markForCheck();
            }
            this._checked = this.value === value;
            this._label.active = this._checked;
        };
        NgbRadio.prototype.updateDisabled = function () { this._label.disabled = this.disabled; };
        return NgbRadio;
    }());
    NgbRadio.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngbButton][type=radio]',
                    host: {
                        '[checked]': 'checked',
                        '[disabled]': 'disabled',
                        '[name]': 'nameAttr',
                        '(change)': 'onChange()',
                        '(focus)': 'focused = true',
                        '(blur)': 'focused = false'
                    }
                },] }
    ];
    NgbRadio.ctorParameters = function () { return [
        { type: NgbRadioGroup },
        { type: NgbButtonLabel },
        { type: i0.Renderer2 },
        { type: i0.ElementRef },
        { type: i0.ChangeDetectorRef }
    ]; };
    NgbRadio.propDecorators = {
        name: [{ type: i0.Input }],
        value: [{ type: i0.Input, args: ['value',] }],
        disabled: [{ type: i0.Input, args: ['disabled',] }]
    };

    var NGB_BUTTON_DIRECTIVES = [NgbButtonLabel, NgbCheckBox, NgbRadioGroup, NgbRadio];
    var NgbButtonsModule = /** @class */ (function () {
        function NgbButtonsModule() {
        }
        return NgbButtonsModule;
    }());
    NgbButtonsModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: NGB_BUTTON_DIRECTIVES, exports: NGB_BUTTON_DIRECTIVES },] }
    ];

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * A configuration service for the [NgbCarousel](#/components/carousel/api#NgbCarousel) component.
     *
     * You can inject this service, typically in your root component, and customize its properties
     * to provide default values for all carousels used in the application.
     */
    var NgbCarouselConfig = /** @class */ (function () {
        function NgbCarouselConfig(_ngbConfig) {
            this._ngbConfig = _ngbConfig;
            this.interval = 5000;
            this.wrap = true;
            this.keyboard = true;
            this.pauseOnHover = true;
            this.pauseOnFocus = true;
            this.showNavigationArrows = true;
            this.showNavigationIndicators = true;
        }
        Object.defineProperty(NgbCarouselConfig.prototype, "animation", {
            get: function () { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; },
            set: function (animation) { this._animation = animation; },
            enumerable: false,
            configurable: true
        });
        return NgbCarouselConfig;
    }());
    NgbCarouselConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbCarouselConfig_Factory() { return new NgbCarouselConfig(i0.ɵɵinject(NgbConfig)); }, token: NgbCarouselConfig, providedIn: "root" });
    NgbCarouselConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbCarouselConfig.ctorParameters = function () { return [
        { type: NgbConfig }
    ]; };

    (function (NgbSlideEventDirection) {
        NgbSlideEventDirection["LEFT"] = "left";
        NgbSlideEventDirection["RIGHT"] = "right";
    })(exports.NgbSlideEventDirection || (exports.NgbSlideEventDirection = {}));
    var isBeingAnimated = function (_a) {
        var classList = _a.classList;
        return classList.contains('carousel-item-left') || classList.contains('carousel-item-right');
    };
    var ɵ0$1 = isBeingAnimated;
    var removeDirectionClasses = function (classList) {
        classList.remove('carousel-item-left');
        classList.remove('carousel-item-right');
    };
    var ɵ1 = removeDirectionClasses;
    var removeClasses = function (classList) {
        removeDirectionClasses(classList);
        classList.remove('carousel-item-prev');
        classList.remove('carousel-item-next');
    };
    var ɵ2 = removeClasses;
    var ngbCarouselTransitionIn = function (element, animation, _a) {
        var direction = _a.direction;
        var classList = element.classList;
        if (!animation) {
            removeDirectionClasses(classList);
            removeClasses(classList);
            classList.add('active');
            return;
        }
        if (isBeingAnimated(element)) {
            // Revert the transition
            removeDirectionClasses(classList);
        }
        else {
            // For the 'in' transition, a 'pre-class' is applied to the element to ensure its visibility
            classList.add('carousel-item-' + (direction === exports.NgbSlideEventDirection.LEFT ? 'next' : 'prev'));
            reflow(element);
            classList.add('carousel-item-' + direction);
        }
        return function () {
            removeClasses(classList);
            classList.add('active');
        };
    };
    var ngbCarouselTransitionOut = function (element, animation, _a) {
        var direction = _a.direction;
        var classList = element.classList;
        if (!animation) {
            removeDirectionClasses(classList);
            removeClasses(classList);
            classList.remove('active');
            return;
        }
        //  direction is left or right, depending on the way the slide goes out.
        if (isBeingAnimated(element)) {
            // Revert the transition
            removeDirectionClasses(classList);
        }
        else {
            classList.add('carousel-item-' + direction);
        }
        return function () {
            removeClasses(classList);
            classList.remove('active');
        };
    };

    var nextId$2 = 0;
    /**
     * A directive that wraps the individual carousel slide.
     */
    var NgbSlide = /** @class */ (function () {
        function NgbSlide(tplRef) {
            this.tplRef = tplRef;
            /**
             * Slide id that must be unique for the entire document.
             *
             * If not provided, will be generated in the `ngb-slide-xx` format.
             */
            this.id = "ngb-slide-" + nextId$2++;
            /**
             * An event emitted when the slide transition is finished
             *
             * @since 8.0.0
             */
            this.slid = new i0.EventEmitter();
        }
        return NgbSlide;
    }());
    NgbSlide.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbSlide]' },] }
    ];
    NgbSlide.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    NgbSlide.propDecorators = {
        id: [{ type: i0.Input }],
        slid: [{ type: i0.Output }]
    };
    /**
     * Carousel is a component to easily create and control slideshows.
     *
     * Allows to set intervals, change the way user interacts with the slides and provides a programmatic API.
     */
    var NgbCarousel = /** @class */ (function () {
        function NgbCarousel(config, _platformId, _ngZone, _cd, _container) {
            this._platformId = _platformId;
            this._ngZone = _ngZone;
            this._cd = _cd;
            this._container = _container;
            this.NgbSlideEventSource = exports.NgbSlideEventSource;
            this._destroy$ = new rxjs.Subject();
            this._interval$ = new rxjs.BehaviorSubject(0);
            this._mouseHover$ = new rxjs.BehaviorSubject(false);
            this._focused$ = new rxjs.BehaviorSubject(false);
            this._pauseOnHover$ = new rxjs.BehaviorSubject(false);
            this._pauseOnFocus$ = new rxjs.BehaviorSubject(false);
            this._pause$ = new rxjs.BehaviorSubject(false);
            this._wrap$ = new rxjs.BehaviorSubject(false);
            /**
             * An event emitted just before the slide transition starts.
             *
             * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
             */
            this.slide = new i0.EventEmitter();
            /**
             * An event emitted right after the slide transition is completed.
             *
             * See [`NgbSlideEvent`](#/components/carousel/api#NgbSlideEvent) for payload details.
             *
             * @since 8.0.0
             */
            this.slid = new i0.EventEmitter();
            /*
             * Keep the ids of the panels currently transitionning
             * in order to allow only the transition revertion
             */
            this._transitionIds = null;
            this.animation = config.animation;
            this.interval = config.interval;
            this.wrap = config.wrap;
            this.keyboard = config.keyboard;
            this.pauseOnHover = config.pauseOnHover;
            this.pauseOnFocus = config.pauseOnFocus;
            this.showNavigationArrows = config.showNavigationArrows;
            this.showNavigationIndicators = config.showNavigationIndicators;
        }
        Object.defineProperty(NgbCarousel.prototype, "interval", {
            get: function () { return this._interval$.value; },
            /**
             * Time in milliseconds before the next slide is shown.
             */
            set: function (value) {
                this._interval$.next(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbCarousel.prototype, "wrap", {
            get: function () { return this._wrap$.value; },
            /**
             * If `true`, will 'wrap' the carousel by switching from the last slide back to the first.
             */
            set: function (value) {
                this._wrap$.next(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbCarousel.prototype, "pauseOnHover", {
            get: function () { return this._pauseOnHover$.value; },
            /**
             * If `true`, will pause slide switching when mouse cursor hovers the slide.
             *
             * @since 2.2.0
             */
            set: function (value) {
                this._pauseOnHover$.next(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbCarousel.prototype, "pauseOnFocus", {
            get: function () { return this._pauseOnFocus$.value; },
            /**
             * If `true`, will pause slide switching when the focus is inside the carousel.
             */
            set: function (value) {
                this._pauseOnFocus$.next(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbCarousel.prototype, "mouseHover", {
            get: function () { return this._mouseHover$.value; },
            set: function (value) { this._mouseHover$.next(value); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbCarousel.prototype, "focused", {
            get: function () { return this._focused$.value; },
            set: function (value) { this._focused$.next(value); },
            enumerable: false,
            configurable: true
        });
        NgbCarousel.prototype.arrowLeft = function () {
            this.focus();
            this.prev(exports.NgbSlideEventSource.ARROW_LEFT);
        };
        NgbCarousel.prototype.arrowRight = function () {
            this.focus();
            this.next(exports.NgbSlideEventSource.ARROW_RIGHT);
        };
        NgbCarousel.prototype.ngAfterContentInit = function () {
            var _this = this;
            // setInterval() doesn't play well with SSR and protractor,
            // so we should run it in the browser and outside Angular
            if (i1.isPlatformBrowser(this._platformId)) {
                this._ngZone.runOutsideAngular(function () {
                    var hasNextSlide$ = rxjs.combineLatest([
                        _this.slide.pipe(operators.map(function (slideEvent) { return slideEvent.current; }), operators.startWith(_this.activeId)),
                        _this._wrap$, _this.slides.changes.pipe(operators.startWith(null))
                    ])
                        .pipe(operators.map(function (_b) {
                        var _c = __read(_b, 2), currentSlideId = _c[0], wrap = _c[1];
                        var slideArr = _this.slides.toArray();
                        var currentSlideIdx = _this._getSlideIdxById(currentSlideId);
                        return wrap ? slideArr.length > 1 : currentSlideIdx < slideArr.length - 1;
                    }), operators.distinctUntilChanged());
                    rxjs.combineLatest([
                        _this._pause$, _this._pauseOnHover$, _this._mouseHover$, _this._pauseOnFocus$, _this._focused$, _this._interval$,
                        hasNextSlide$
                    ])
                        .pipe(operators.map(function (_b) {
                        var _c = __read(_b, 7), pause = _c[0], pauseOnHover = _c[1], mouseHover = _c[2], pauseOnFocus = _c[3], focused = _c[4], interval = _c[5], hasNextSlide = _c[6];
                        return ((pause || (pauseOnHover && mouseHover) || (pauseOnFocus && focused) || !hasNextSlide) ?
                            0 :
                            interval);
                    }), operators.distinctUntilChanged(), operators.switchMap(function (interval) { return interval > 0 ? rxjs.timer(interval, interval) : rxjs.NEVER; }), operators.takeUntil(_this._destroy$))
                        .subscribe(function () { return _this._ngZone.run(function () { return _this.next(exports.NgbSlideEventSource.TIMER); }); });
                });
            }
            this.slides.changes.pipe(operators.takeUntil(this._destroy$)).subscribe(function () {
                var _a;
                (_a = _this._transitionIds) === null || _a === void 0 ? void 0 : _a.forEach(function (id) { return ngbCompleteTransition(_this._getSlideElement(id)); });
                _this._transitionIds = null;
                _this._cd.markForCheck();
                // The following code need to be done asynchronously, after the dom becomes stable,
                // otherwise all changes will be undone.
                _this._ngZone.onStable.pipe(operators.take(1)).subscribe(function () {
                    var e_1, _b;
                    try {
                        for (var _c = __values(_this.slides), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var id = _d.value.id;
                            var element = _this._getSlideElement(id);
                            if (id === _this.activeId) {
                                element.classList.add('active');
                            }
                            else {
                                element.classList.remove('active');
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                });
            });
        };
        NgbCarousel.prototype.ngAfterContentChecked = function () {
            var activeSlide = this._getSlideById(this.activeId);
            this.activeId = activeSlide ? activeSlide.id : (this.slides.length ? this.slides.first.id : '');
        };
        NgbCarousel.prototype.ngAfterViewInit = function () {
            // Initialize the 'active' class (not managed by the template)
            if (this.activeId) {
                var element = this._getSlideElement(this.activeId);
                if (element) {
                    element.classList.add('active');
                }
            }
        };
        NgbCarousel.prototype.ngOnDestroy = function () { this._destroy$.next(); };
        /**
         * Navigates to a slide with the specified identifier.
         */
        NgbCarousel.prototype.select = function (slideId, source) {
            this._cycleToSelected(slideId, this._getSlideEventDirection(this.activeId, slideId), source);
        };
        /**
         * Navigates to the previous slide.
         */
        NgbCarousel.prototype.prev = function (source) {
            this._cycleToSelected(this._getPrevSlide(this.activeId), exports.NgbSlideEventDirection.RIGHT, source);
        };
        /**
         * Navigates to the next slide.
         */
        NgbCarousel.prototype.next = function (source) {
            this._cycleToSelected(this._getNextSlide(this.activeId), exports.NgbSlideEventDirection.LEFT, source);
        };
        /**
         * Pauses cycling through the slides.
         */
        NgbCarousel.prototype.pause = function () { this._pause$.next(true); };
        /**
         * Restarts cycling through the slides from left to right.
         */
        NgbCarousel.prototype.cycle = function () { this._pause$.next(false); };
        /**
         * Set the focus on the carousel.
         */
        NgbCarousel.prototype.focus = function () { this._container.nativeElement.focus(); };
        NgbCarousel.prototype._cycleToSelected = function (slideIdx, direction, source) {
            var _this = this;
            var transitionIds = this._transitionIds;
            if (transitionIds && (transitionIds[0] !== slideIdx || transitionIds[1] !== this.activeId)) {
                // Revert prevented
                return;
            }
            var selectedSlide = this._getSlideById(slideIdx);
            if (selectedSlide && selectedSlide.id !== this.activeId) {
                this._transitionIds = [this.activeId, slideIdx];
                this.slide.emit({ prev: this.activeId, current: selectedSlide.id, direction: direction, paused: this._pause$.value, source: source });
                var options = {
                    animation: this.animation,
                    runningTransition: 'stop',
                    context: { direction: direction },
                };
                var transitions = [];
                var activeSlide_1 = this._getSlideById(this.activeId);
                if (activeSlide_1) {
                    var activeSlideTransition = ngbRunTransition(this._ngZone, this._getSlideElement(activeSlide_1.id), ngbCarouselTransitionOut, options);
                    activeSlideTransition.subscribe(function () { activeSlide_1.slid.emit({ isShown: false, direction: direction, source: source }); });
                    transitions.push(activeSlideTransition);
                }
                var previousId_1 = this.activeId;
                this.activeId = selectedSlide.id;
                var nextSlide_1 = this._getSlideById(this.activeId);
                var transition = ngbRunTransition(this._ngZone, this._getSlideElement(selectedSlide.id), ngbCarouselTransitionIn, options);
                transition.subscribe(function () { nextSlide_1 === null || nextSlide_1 === void 0 ? void 0 : nextSlide_1.slid.emit({ isShown: true, direction: direction, source: source }); });
                transitions.push(transition);
                rxjs.zip.apply(void 0, __spread(transitions)).pipe(operators.take(1)).subscribe(function () {
                    _this._transitionIds = null;
                    _this.slid.emit({ prev: previousId_1, current: selectedSlide.id, direction: direction, paused: _this._pause$.value, source: source });
                });
            }
            // we get here after the interval fires or any external API call like next(), prev() or select()
            this._cd.markForCheck();
        };
        NgbCarousel.prototype._getSlideEventDirection = function (currentActiveSlideId, nextActiveSlideId) {
            var currentActiveSlideIdx = this._getSlideIdxById(currentActiveSlideId);
            var nextActiveSlideIdx = this._getSlideIdxById(nextActiveSlideId);
            return currentActiveSlideIdx > nextActiveSlideIdx ? exports.NgbSlideEventDirection.RIGHT : exports.NgbSlideEventDirection.LEFT;
        };
        NgbCarousel.prototype._getSlideById = function (slideId) {
            return this.slides.find(function (slide) { return slide.id === slideId; }) || null;
        };
        NgbCarousel.prototype._getSlideIdxById = function (slideId) {
            var slide = this._getSlideById(slideId);
            return slide != null ? this.slides.toArray().indexOf(slide) : -1;
        };
        NgbCarousel.prototype._getNextSlide = function (currentSlideId) {
            var slideArr = this.slides.toArray();
            var currentSlideIdx = this._getSlideIdxById(currentSlideId);
            var isLastSlide = currentSlideIdx === slideArr.length - 1;
            return isLastSlide ? (this.wrap ? slideArr[0].id : slideArr[slideArr.length - 1].id) :
                slideArr[currentSlideIdx + 1].id;
        };
        NgbCarousel.prototype._getPrevSlide = function (currentSlideId) {
            var slideArr = this.slides.toArray();
            var currentSlideIdx = this._getSlideIdxById(currentSlideId);
            var isFirstSlide = currentSlideIdx === 0;
            return isFirstSlide ? (this.wrap ? slideArr[slideArr.length - 1].id : slideArr[0].id) :
                slideArr[currentSlideIdx - 1].id;
        };
        NgbCarousel.prototype._getSlideElement = function (slideId) {
            return this._container.nativeElement.querySelector("#slide-" + slideId);
        };
        return NgbCarousel;
    }());
    NgbCarousel.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-carousel',
                    exportAs: 'ngbCarousel',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    host: {
                        'class': 'carousel slide',
                        '[style.display]': '"block"',
                        'tabIndex': '0',
                        '(keydown.arrowLeft)': 'keyboard && arrowLeft()',
                        '(keydown.arrowRight)': 'keyboard && arrowRight()',
                        '(mouseenter)': 'mouseHover = true',
                        '(mouseleave)': 'mouseHover = false',
                        '(focusin)': 'focused = true',
                        '(focusout)': 'focused = false',
                        '[attr.aria-activedescendant]': "'slide-' + activeId"
                    },
                    template: "\n    <ol class=\"carousel-indicators\" [class.sr-only]=\"!showNavigationIndicators\" role=\"tablist\">\n      <li *ngFor=\"let slide of slides\" [class.active]=\"slide.id === activeId\"\n          role=\"tab\" [attr.aria-labelledby]=\"'slide-' + slide.id\" [attr.aria-controls]=\"'slide-' + slide.id\"\n          [attr.aria-selected]=\"slide.id === activeId\"\n          (click)=\"focus();select(slide.id, NgbSlideEventSource.INDICATOR);\"></li>\n    </ol>\n    <div class=\"carousel-inner\">\n      <div *ngFor=\"let slide of slides; index as i; count as c\" class=\"carousel-item\" [id]=\"'slide-' + slide.id\" role=\"tabpanel\">\n        <span class=\"sr-only\" i18n=\"Currently selected slide number read by screen reader@@ngb.carousel.slide-number\">\n          Slide {{i + 1}} of {{c}}\n        </span>\n        <ng-template [ngTemplateOutlet]=\"slide.tplRef\"></ng-template>\n      </div>\n    </div>\n    <a class=\"carousel-control-prev\" role=\"button\" (click)=\"arrowLeft()\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.previous\">Previous</span>\n    </a>\n    <a class=\"carousel-control-next\" role=\"button\" (click)=\"arrowRight()\" *ngIf=\"showNavigationArrows\">\n      <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\" i18n=\"@@ngb.carousel.next\">Next</span>\n    </a>\n  "
                },] }
    ];
    NgbCarousel.ctorParameters = function () { return [
        { type: NgbCarouselConfig },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] },
        { type: i0.NgZone },
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef }
    ]; };
    NgbCarousel.propDecorators = {
        slides: [{ type: i0.ContentChildren, args: [NgbSlide,] }],
        animation: [{ type: i0.Input }],
        activeId: [{ type: i0.Input }],
        interval: [{ type: i0.Input }],
        wrap: [{ type: i0.Input }],
        keyboard: [{ type: i0.Input }],
        pauseOnHover: [{ type: i0.Input }],
        pauseOnFocus: [{ type: i0.Input }],
        showNavigationArrows: [{ type: i0.Input }],
        showNavigationIndicators: [{ type: i0.Input }],
        slide: [{ type: i0.Output }],
        slid: [{ type: i0.Output }]
    };
    (function (NgbSlideEventSource) {
        NgbSlideEventSource["TIMER"] = "timer";
        NgbSlideEventSource["ARROW_LEFT"] = "arrowLeft";
        NgbSlideEventSource["ARROW_RIGHT"] = "arrowRight";
        NgbSlideEventSource["INDICATOR"] = "indicator";
    })(exports.NgbSlideEventSource || (exports.NgbSlideEventSource = {}));
    var NGB_CAROUSEL_DIRECTIVES = [NgbCarousel, NgbSlide];

    var NgbCarouselModule = /** @class */ (function () {
        function NgbCarouselModule() {
        }
        return NgbCarouselModule;
    }());
    NgbCarouselModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: NGB_CAROUSEL_DIRECTIVES, exports: NGB_CAROUSEL_DIRECTIVES, imports: [i1.CommonModule] },] }
    ];

    /**
     * A configuration service for the [NgbCollapse](#/components/collapse/api#NgbCollapse) component.
     *
     * You can inject this service, typically in your root component, and customize its properties
     * to provide default values for all collapses used in the application.
     */
    var NgbCollapseConfig = /** @class */ (function () {
        function NgbCollapseConfig(_ngbConfig) {
            this._ngbConfig = _ngbConfig;
        }
        Object.defineProperty(NgbCollapseConfig.prototype, "animation", {
            get: function () { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; },
            set: function (animation) { this._animation = animation; },
            enumerable: false,
            configurable: true
        });
        return NgbCollapseConfig;
    }());
    NgbCollapseConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbCollapseConfig_Factory() { return new NgbCollapseConfig(i0.ɵɵinject(NgbConfig)); }, token: NgbCollapseConfig, providedIn: "root" });
    NgbCollapseConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbCollapseConfig.ctorParameters = function () { return [
        { type: NgbConfig }
    ]; };

    /**
     * A directive to provide a simple way of hiding and showing elements on the page.
     */
    var NgbCollapse = /** @class */ (function () {
        function NgbCollapse(_element, config, _zone) {
            this._element = _element;
            this._zone = _zone;
            /**
             * If `true`, will collapse the element or show it otherwise.
             */
            this.collapsed = false;
            this.ngbCollapseChange = new i0.EventEmitter();
            /**
             * An event emitted when the collapse element is shown, after the transition. It has no payload.
             *
             * @since 8.0.0
             */
            this.shown = new i0.EventEmitter();
            /**
             * An event emitted when the collapse element is hidden, after the transition. It has no payload.
             *
             * @since 8.0.0
             */
            this.hidden = new i0.EventEmitter();
            this.animation = config.animation;
        }
        NgbCollapse.prototype.ngOnInit = function () { this._runTransition(this.collapsed, false); };
        NgbCollapse.prototype.ngOnChanges = function (_a) {
            var collapsed = _a.collapsed;
            if (!collapsed.firstChange) {
                this._runTransitionWithEvents(this.collapsed, this.animation);
            }
        };
        /**
         * Triggers collapsing programmatically.
         *
         * If there is a collapsing transition running already, it will be reversed.
         * If the animations are turned off this happens synchronously.
         *
         * @since 8.0.0
         */
        NgbCollapse.prototype.toggle = function (open) {
            if (open === void 0) { open = this.collapsed; }
            this.collapsed = !open;
            this.ngbCollapseChange.next(this.collapsed);
            this._runTransitionWithEvents(this.collapsed, this.animation);
        };
        NgbCollapse.prototype._runTransition = function (collapsed, animation) {
            return ngbRunTransition(this._zone, this._element.nativeElement, ngbCollapsingTransition, { animation: animation, runningTransition: 'stop', context: { direction: collapsed ? 'hide' : 'show' } });
        };
        NgbCollapse.prototype._runTransitionWithEvents = function (collapsed, animation) {
            var _this = this;
            this._runTransition(collapsed, animation).subscribe(function () {
                if (collapsed) {
                    _this.hidden.emit();
                }
                else {
                    _this.shown.emit();
                }
            });
        };
        return NgbCollapse;
    }());
    NgbCollapse.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngbCollapse]', exportAs: 'ngbCollapse' },] }
    ];
    NgbCollapse.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: NgbCollapseConfig },
        { type: i0.NgZone }
    ]; };
    NgbCollapse.propDecorators = {
        animation: [{ type: i0.Input }],
        collapsed: [{ type: i0.Input, args: ['ngbCollapse',] }],
        ngbCollapseChange: [{ type: i0.Output }],
        shown: [{ type: i0.Output }],
        hidden: [{ type: i0.Output }]
    };

    var NgbCollapseModule = /** @class */ (function () {
        function NgbCollapseModule() {
        }
        return NgbCollapseModule;
    }());
    NgbCollapseModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: [NgbCollapse], exports: [NgbCollapse] },] }
    ];

    /**
     * A simple class that represents a date that datepicker also uses internally.
     *
     * It is the implementation of the `NgbDateStruct` interface that adds some convenience methods,
     * like `.equals()`, `.before()`, etc.
     *
     * All datepicker APIs consume `NgbDateStruct`, but return `NgbDate`.
     *
     * In many cases it is simpler to manipulate these objects together with
     * [`NgbCalendar`](#/components/datepicker/api#NgbCalendar) than native JS Dates.
     *
     * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
     *
     * @since 3.0.0
     */
    var NgbDate = /** @class */ (function () {
        function NgbDate(year, month, day) {
            this.year = isInteger(year) ? year : null;
            this.month = isInteger(month) ? month : null;
            this.day = isInteger(day) ? day : null;
        }
        /**
         * A **static method** that creates a new date object from the `NgbDateStruct`,
         *
         * ex. `NgbDate.from({year: 2000, month: 5, day: 1})`.
         *
         * If the `date` is already of `NgbDate` type, the method will return the same object.
         */
        NgbDate.from = function (date) {
            if (date instanceof NgbDate) {
                return date;
            }
            return date ? new NgbDate(date.year, date.month, date.day) : null;
        };
        /**
         * Checks if the current date is equal to another date.
         */
        NgbDate.prototype.equals = function (other) {
            return other != null && this.year === other.year && this.month === other.month && this.day === other.day;
        };
        /**
         * Checks if the current date is before another date.
         */
        NgbDate.prototype.before = function (other) {
            if (!other) {
                return false;
            }
            if (this.year === other.year) {
                if (this.month === other.month) {
                    return this.day === other.day ? false : this.day < other.day;
                }
                else {
                    return this.month < other.month;
                }
            }
            else {
                return this.year < other.year;
            }
        };
        /**
         * Checks if the current date is after another date.
         */
        NgbDate.prototype.after = function (other) {
            if (!other) {
                return false;
            }
            if (this.year === other.year) {
                if (this.month === other.month) {
                    return this.day === other.day ? false : this.day > other.day;
                }
                else {
                    return this.month > other.month;
                }
            }
            else {
                return this.year > other.year;
            }
        };
        return NgbDate;
    }());

    function fromJSDate(jsDate) {
        return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
    }
    function toJSDate(date) {
        var jsDate = new Date(date.year, date.month - 1, date.day, 12);
        // this is done avoid 30 -> 1930 conversion
        if (!isNaN(jsDate.getTime())) {
            jsDate.setFullYear(date.year);
        }
        return jsDate;
    }
    function NGB_DATEPICKER_CALENDAR_FACTORY() {
        return new NgbCalendarGregorian();
    }
    /**
     * A service that represents the calendar used by the datepicker.
     *
     * The default implementation uses the Gregorian calendar. You can inject it in your own
     * implementations if necessary to simplify `NgbDate` calculations.
     */
    var NgbCalendar = /** @class */ (function () {
        function NgbCalendar() {
        }
        return NgbCalendar;
    }());
    NgbCalendar.ɵprov = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_CALENDAR_FACTORY, token: NgbCalendar, providedIn: "root" });
    NgbCalendar.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_CALENDAR_FACTORY },] }
    ];
    var NgbCalendarGregorian = /** @class */ (function (_super) {
        __extends(NgbCalendarGregorian, _super);
        function NgbCalendarGregorian() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NgbCalendarGregorian.prototype.getDaysPerWeek = function () { return 7; };
        NgbCalendarGregorian.prototype.getMonths = function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
        NgbCalendarGregorian.prototype.getWeeksPerMonth = function () { return 6; };
        NgbCalendarGregorian.prototype.getNext = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            var jsDate = toJSDate(date);
            var checkMonth = true;
            var expectedMonth = jsDate.getMonth();
            switch (period) {
                case 'y':
                    jsDate.setFullYear(jsDate.getFullYear() + number);
                    break;
                case 'm':
                    expectedMonth += number;
                    jsDate.setMonth(expectedMonth);
                    expectedMonth = expectedMonth % 12;
                    if (expectedMonth < 0) {
                        expectedMonth = expectedMonth + 12;
                    }
                    break;
                case 'd':
                    jsDate.setDate(jsDate.getDate() + number);
                    checkMonth = false;
                    break;
                default:
                    return date;
            }
            if (checkMonth && jsDate.getMonth() !== expectedMonth) {
                // this means the destination month has less days than the initial month
                // let's go back to the end of the previous month:
                jsDate.setDate(0);
            }
            return fromJSDate(jsDate);
        };
        NgbCalendarGregorian.prototype.getPrev = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            return this.getNext(date, period, -number);
        };
        NgbCalendarGregorian.prototype.getWeekday = function (date) {
            var jsDate = toJSDate(date);
            var day = jsDate.getDay();
            // in JS Date Sun=0, in ISO 8601 Sun=7
            return day === 0 ? 7 : day;
        };
        NgbCalendarGregorian.prototype.getWeekNumber = function (week, firstDayOfWeek) {
            // in JS Date Sun=0, in ISO 8601 Sun=7
            if (firstDayOfWeek === 7) {
                firstDayOfWeek = 0;
            }
            var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
            var date = week[thursdayIndex];
            var jsDate = toJSDate(date);
            jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
            var time = jsDate.getTime();
            jsDate.setMonth(0); // Compare with Jan 1
            jsDate.setDate(1);
            return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
        };
        NgbCalendarGregorian.prototype.getToday = function () { return fromJSDate(new Date()); };
        NgbCalendarGregorian.prototype.isValid = function (date) {
            if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
                return false;
            }
            // year 0 doesn't exist in Gregorian calendar
            if (date.year === 0) {
                return false;
            }
            var jsDate = toJSDate(date);
            return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year && jsDate.getMonth() + 1 === date.month &&
                jsDate.getDate() === date.day;
        };
        return NgbCalendarGregorian;
    }(NgbCalendar));
    NgbCalendarGregorian.decorators = [
        { type: i0.Injectable }
    ];

    function isChangedDate(prev, next) {
        return !dateComparator(prev, next);
    }
    function isChangedMonth(prev, next) {
        return !prev && !next ? false : !prev || !next ? true : prev.year !== next.year || prev.month !== next.month;
    }
    function dateComparator(prev, next) {
        return (!prev && !next) || (!!prev && !!next && prev.equals(next));
    }
    function checkMinBeforeMax(minDate, maxDate) {
        if (maxDate && minDate && maxDate.before(minDate)) {
            throw new Error("'maxDate' " + maxDate + " should be greater than 'minDate' " + minDate);
        }
    }
    function checkDateInRange(date, minDate, maxDate) {
        if (date && minDate && date.before(minDate)) {
            return minDate;
        }
        if (date && maxDate && date.after(maxDate)) {
            return maxDate;
        }
        return date || null;
    }
    function isDateSelectable(date, state) {
        var minDate = state.minDate, maxDate = state.maxDate, disabled = state.disabled, markDisabled = state.markDisabled;
        // clang-format off
        return !(date === null ||
            date === undefined ||
            disabled ||
            (markDisabled && markDisabled(date, { year: date.year, month: date.month })) ||
            (minDate && date.before(minDate)) ||
            (maxDate && date.after(maxDate)));
        // clang-format on
    }
    function generateSelectBoxMonths(calendar, date, minDate, maxDate) {
        if (!date) {
            return [];
        }
        var months = calendar.getMonths(date.year);
        if (minDate && date.year === minDate.year) {
            var index = months.findIndex(function (month) { return month === minDate.month; });
            months = months.slice(index);
        }
        if (maxDate && date.year === maxDate.year) {
            var index = months.findIndex(function (month) { return month === maxDate.month; });
            months = months.slice(0, index + 1);
        }
        return months;
    }
    function generateSelectBoxYears(date, minDate, maxDate) {
        if (!date) {
            return [];
        }
        var start = minDate ? Math.max(minDate.year, date.year - 500) : date.year - 10;
        var end = maxDate ? Math.min(maxDate.year, date.year + 500) : date.year + 10;
        var length = end - start + 1;
        var numbers = Array(length);
        for (var i = 0; i < length; i++) {
            numbers[i] = start + i;
        }
        return numbers;
    }
    function nextMonthDisabled(calendar, date, maxDate) {
        var nextDate = Object.assign(calendar.getNext(date, 'm'), { day: 1 });
        return maxDate != null && nextDate.after(maxDate);
    }
    function prevMonthDisabled(calendar, date, minDate) {
        var prevDate = Object.assign(calendar.getPrev(date, 'm'), { day: 1 });
        return minDate != null && (prevDate.year === minDate.year && prevDate.month < minDate.month ||
            prevDate.year < minDate.year && minDate.month === 1);
    }
    function buildMonths(calendar, date, state, i18n, force) {
        var displayMonths = state.displayMonths, months = state.months;
        // move old months to a temporary array
        var monthsToReuse = months.splice(0, months.length);
        // generate new first dates, nullify or reuse months
        var firstDates = Array.from({ length: displayMonths }, function (_, i) {
            var firstDate = Object.assign(calendar.getNext(date, 'm', i), { day: 1 });
            months[i] = null;
            if (!force) {
                var reusedIndex = monthsToReuse.findIndex(function (month) { return month.firstDate.equals(firstDate); });
                // move reused month back to months
                if (reusedIndex !== -1) {
                    months[i] = monthsToReuse.splice(reusedIndex, 1)[0];
                }
            }
            return firstDate;
        });
        // rebuild nullified months
        firstDates.forEach(function (firstDate, i) {
            if (months[i] === null) {
                months[i] = buildMonth(calendar, firstDate, state, i18n, monthsToReuse.shift() || {});
            }
        });
        return months;
    }
    function buildMonth(calendar, date, state, i18n, month) {
        if (month === void 0) { month = {}; }
        var dayTemplateData = state.dayTemplateData, minDate = state.minDate, maxDate = state.maxDate, firstDayOfWeek = state.firstDayOfWeek, markDisabled = state.markDisabled, outsideDays = state.outsideDays, weekdayWidth = state.weekdayWidth, weekdaysVisible = state.weekdaysVisible;
        var calendarToday = calendar.getToday();
        month.firstDate = null;
        month.lastDate = null;
        month.number = date.month;
        month.year = date.year;
        month.weeks = month.weeks || [];
        month.weekdays = month.weekdays || [];
        date = getFirstViewDate(calendar, date, firstDayOfWeek);
        // clearing weekdays, if not visible
        if (!weekdaysVisible) {
            month.weekdays.length = 0;
        }
        // month has weeks
        for (var week = 0; week < calendar.getWeeksPerMonth(); week++) {
            var weekObject = month.weeks[week];
            if (!weekObject) {
                weekObject = month.weeks[week] = { number: 0, days: [], collapsed: true };
            }
            var days = weekObject.days;
            // week has days
            for (var day = 0; day < calendar.getDaysPerWeek(); day++) {
                if (week === 0 && weekdaysVisible) {
                    month.weekdays[day] = i18n.getWeekdayLabel(calendar.getWeekday(date), weekdayWidth);
                }
                var newDate = new NgbDate(date.year, date.month, date.day);
                var nextDate = calendar.getNext(newDate);
                var ariaLabel = i18n.getDayAriaLabel(newDate);
                // marking date as disabled
                var disabled = !!((minDate && newDate.before(minDate)) || (maxDate && newDate.after(maxDate)));
                if (!disabled && markDisabled) {
                    disabled = markDisabled(newDate, { month: month.number, year: month.year });
                }
                // today
                var today = newDate.equals(calendarToday);
                // adding user-provided data to the context
                var contextUserData = dayTemplateData ? dayTemplateData(newDate, { month: month.number, year: month.year }) : undefined;
                // saving first date of the month
                if (month.firstDate === null && newDate.month === month.number) {
                    month.firstDate = newDate;
                }
                // saving last date of the month
                if (newDate.month === month.number && nextDate.month !== month.number) {
                    month.lastDate = newDate;
                }
                var dayObject = days[day];
                if (!dayObject) {
                    dayObject = days[day] = {};
                }
                dayObject.date = newDate;
                dayObject.context = Object.assign(dayObject.context || {}, {
                    $implicit: newDate,
                    date: newDate,
                    data: contextUserData,
                    currentMonth: month.number,
                    currentYear: month.year,
                    disabled: disabled,
                    focused: false,
                    selected: false,
                    today: today
                });
                dayObject.tabindex = -1;
                dayObject.ariaLabel = ariaLabel;
                dayObject.hidden = false;
                date = nextDate;
            }
            weekObject.number = calendar.getWeekNumber(days.map(function (day) { return day.date; }), firstDayOfWeek);
            // marking week as collapsed
            weekObject.collapsed = outsideDays === 'collapsed' && days[0].date.month !== month.number &&
                days[days.length - 1].date.month !== month.number;
        }
        return month;
    }
    function getFirstViewDate(calendar, date, firstDayOfWeek) {
        var daysPerWeek = calendar.getDaysPerWeek();
        var firstMonthDate = new NgbDate(date.year, date.month, 1);
        var dayOfWeek = calendar.getWeekday(firstMonthDate) % daysPerWeek;
        return calendar.getPrev(firstMonthDate, 'd', (daysPerWeek + dayOfWeek - firstDayOfWeek) % daysPerWeek);
    }

    function NGB_DATEPICKER_18N_FACTORY(locale) {
        return new NgbDatepickerI18nDefault(locale);
    }
    /**
     * A service supplying i18n data to the datepicker component.
     *
     * The default implementation of this service uses the Angular locale and registered locale data for
     * weekdays and month names (as explained in the Angular i18n guide).
     *
     * It also provides a way to i18n data that depends on calendar calculations, like aria labels, day, week and year
     * numerals. For other static labels the datepicker uses the default Angular i18n.
     *
     * See the [i18n demo](#/components/datepicker/examples#i18n) and
     * [Hebrew calendar demo](#/components/datepicker/calendars#hebrew) on how to extend this class and define
     * a custom provider for i18n.
     */
    var NgbDatepickerI18n = /** @class */ (function () {
        function NgbDatepickerI18n() {
        }
        /**
         * Returns the weekday label using specified width
         *
         * @since 9.1.0
         */
        NgbDatepickerI18n.prototype.getWeekdayLabel = function (weekday, width) { return this.getWeekdayShortName(weekday); };
        /**
         * Returns the text label to display above the day view.
         *
         * @since 9.1.0
         */
        NgbDatepickerI18n.prototype.getMonthLabel = function (date) {
            return this.getMonthFullName(date.month, date.year) + " " + this.getYearNumerals(date.year);
        };
        /**
         * Returns the textual representation of a day that is rendered in a day cell.
         *
         * @since 3.0.0
         */
        NgbDatepickerI18n.prototype.getDayNumerals = function (date) { return "" + date.day; };
        /**
         * Returns the textual representation of a week number rendered by datepicker.
         *
         * @since 3.0.0
         */
        NgbDatepickerI18n.prototype.getWeekNumerals = function (weekNumber) { return "" + weekNumber; };
        /**
         * Returns the textual representation of a year that is rendered in the datepicker year select box.
         *
         * @since 3.0.0
         */
        NgbDatepickerI18n.prototype.getYearNumerals = function (year) { return "" + year; };
        /**
         * Returns the week label to display in the heading of the month view.
         *
         * @since 9.1.0
         */
        NgbDatepickerI18n.prototype.getWeekLabel = function () { return ''; };
        return NgbDatepickerI18n;
    }());
    NgbDatepickerI18n.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbDatepickerI18n_Factory() { return NGB_DATEPICKER_18N_FACTORY(i0.ɵɵinject(i0.LOCALE_ID)); }, token: NgbDatepickerI18n, providedIn: "root" });
    NgbDatepickerI18n.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_18N_FACTORY, deps: [i0.LOCALE_ID] },] }
    ];
    /**
     * A service providing default implementation for the datepicker i18n.
     * It can be used as a base implementation if necessary.
     *
     * @since 9.1.0
     */
    var NgbDatepickerI18nDefault = /** @class */ (function (_super) {
        __extends(NgbDatepickerI18nDefault, _super);
        function NgbDatepickerI18nDefault(_locale) {
            var _this = _super.call(this) || this;
            _this._locale = _locale;
            _this._monthsShort = i1.getLocaleMonthNames(_locale, i1.FormStyle.Standalone, i1.TranslationWidth.Abbreviated);
            _this._monthsFull = i1.getLocaleMonthNames(_locale, i1.FormStyle.Standalone, i1.TranslationWidth.Wide);
            return _this;
        }
        NgbDatepickerI18nDefault.prototype.getWeekdayShortName = function (weekday) { return this.getWeekdayLabel(weekday, i1.TranslationWidth.Short); };
        NgbDatepickerI18nDefault.prototype.getWeekdayLabel = function (weekday, width) {
            var weekdaysStartingOnSunday = i1.getLocaleDayNames(this._locale, i1.FormStyle.Standalone, width === undefined ? i1.TranslationWidth.Short : width);
            var weekdays = weekdaysStartingOnSunday.map(function (day, index) { return weekdaysStartingOnSunday[(index + 1) % 7]; });
            return weekdays[weekday - 1] || '';
        };
        NgbDatepickerI18nDefault.prototype.getMonthShortName = function (month) { return this._monthsShort[month - 1] || ''; };
        NgbDatepickerI18nDefault.prototype.getMonthFullName = function (month) { return this._monthsFull[month - 1] || ''; };
        NgbDatepickerI18nDefault.prototype.getDayAriaLabel = function (date) {
            var jsDate = new Date(date.year, date.month - 1, date.day);
            return i1.formatDate(jsDate, 'fullDate', this._locale);
        };
        return NgbDatepickerI18nDefault;
    }(NgbDatepickerI18n));
    NgbDatepickerI18nDefault.decorators = [
        { type: i0.Injectable }
    ];
    NgbDatepickerI18nDefault.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Inject, args: [i0.LOCALE_ID,] }] }
    ]; };

    var NgbDatepickerService = /** @class */ (function () {
        function NgbDatepickerService(_calendar, _i18n) {
            var _this = this;
            this._calendar = _calendar;
            this._i18n = _i18n;
            this._VALIDATORS = {
                dayTemplateData: function (dayTemplateData) {
                    if (_this._state.dayTemplateData !== dayTemplateData) {
                        return { dayTemplateData: dayTemplateData };
                    }
                },
                displayMonths: function (displayMonths) {
                    displayMonths = toInteger(displayMonths);
                    if (isInteger(displayMonths) && displayMonths > 0 && _this._state.displayMonths !== displayMonths) {
                        return { displayMonths: displayMonths };
                    }
                },
                disabled: function (disabled) {
                    if (_this._state.disabled !== disabled) {
                        return { disabled: disabled };
                    }
                },
                firstDayOfWeek: function (firstDayOfWeek) {
                    firstDayOfWeek = toInteger(firstDayOfWeek);
                    if (isInteger(firstDayOfWeek) && firstDayOfWeek >= 0 && _this._state.firstDayOfWeek !== firstDayOfWeek) {
                        return { firstDayOfWeek: firstDayOfWeek };
                    }
                },
                focusVisible: function (focusVisible) {
                    if (_this._state.focusVisible !== focusVisible && !_this._state.disabled) {
                        return { focusVisible: focusVisible };
                    }
                },
                markDisabled: function (markDisabled) {
                    if (_this._state.markDisabled !== markDisabled) {
                        return { markDisabled: markDisabled };
                    }
                },
                maxDate: function (date) {
                    var maxDate = _this.toValidDate(date, null);
                    if (isChangedDate(_this._state.maxDate, maxDate)) {
                        return { maxDate: maxDate };
                    }
                },
                minDate: function (date) {
                    var minDate = _this.toValidDate(date, null);
                    if (isChangedDate(_this._state.minDate, minDate)) {
                        return { minDate: minDate };
                    }
                },
                navigation: function (navigation) {
                    if (_this._state.navigation !== navigation) {
                        return { navigation: navigation };
                    }
                },
                outsideDays: function (outsideDays) {
                    if (_this._state.outsideDays !== outsideDays) {
                        return { outsideDays: outsideDays };
                    }
                },
                weekdays: function (weekdays) {
                    var weekdayWidth = weekdays === true || weekdays === false ? i1.TranslationWidth.Short : weekdays;
                    var weekdaysVisible = weekdays === true || weekdays === false ? weekdays : true;
                    if (_this._state.weekdayWidth !== weekdayWidth || _this._state.weekdaysVisible !== weekdaysVisible) {
                        return { weekdayWidth: weekdayWidth, weekdaysVisible: weekdaysVisible };
                    }
                }
            };
            this._model$ = new rxjs.Subject();
            this._dateSelect$ = new rxjs.Subject();
            this._state = {
                dayTemplateData: null,
                markDisabled: null,
                maxDate: null,
                minDate: null,
                disabled: false,
                displayMonths: 1,
                firstDate: null,
                firstDayOfWeek: 1,
                lastDate: null,
                focusDate: null,
                focusVisible: false,
                months: [],
                navigation: 'select',
                outsideDays: 'visible',
                prevDisabled: false,
                nextDisabled: false,
                selectedDate: null,
                selectBoxes: { years: [], months: [] },
                weekdayWidth: i1.TranslationWidth.Short,
                weekdaysVisible: true
            };
        }
        Object.defineProperty(NgbDatepickerService.prototype, "model$", {
            get: function () { return this._model$.pipe(operators.filter(function (model) { return model.months.length > 0; })); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbDatepickerService.prototype, "dateSelect$", {
            get: function () { return this._dateSelect$.pipe(operators.filter(function (date) { return date !== null; })); },
            enumerable: false,
            configurable: true
        });
        NgbDatepickerService.prototype.set = function (options) {
            var _this = this;
            var patch = Object.keys(options)
                .map(function (key) { return _this._VALIDATORS[key](options[key]); })
                .reduce(function (obj, part) { return (Object.assign(Object.assign({}, obj), part)); }, {});
            if (Object.keys(patch).length > 0) {
                this._nextState(patch);
            }
        };
        NgbDatepickerService.prototype.focus = function (date) {
            var focusedDate = this.toValidDate(date, null);
            if (focusedDate != null && !this._state.disabled && isChangedDate(this._state.focusDate, focusedDate)) {
                this._nextState({ focusDate: date });
            }
        };
        NgbDatepickerService.prototype.focusSelect = function () {
            if (isDateSelectable(this._state.focusDate, this._state)) {
                this.select(this._state.focusDate, { emitEvent: true });
            }
        };
        NgbDatepickerService.prototype.open = function (date) {
            var firstDate = this.toValidDate(date, this._calendar.getToday());
            if (firstDate != null && !this._state.disabled &&
                (!this._state.firstDate || isChangedMonth(this._state.firstDate, firstDate))) {
                this._nextState({ firstDate: firstDate });
            }
        };
        NgbDatepickerService.prototype.select = function (date, options) {
            if (options === void 0) { options = {}; }
            var selectedDate = this.toValidDate(date, null);
            if (selectedDate != null && !this._state.disabled) {
                if (isChangedDate(this._state.selectedDate, selectedDate)) {
                    this._nextState({ selectedDate: selectedDate });
                }
                if (options.emitEvent && isDateSelectable(selectedDate, this._state)) {
                    this._dateSelect$.next(selectedDate);
                }
            }
        };
        NgbDatepickerService.prototype.toValidDate = function (date, defaultValue) {
            var ngbDate = NgbDate.from(date);
            if (defaultValue === undefined) {
                defaultValue = this._calendar.getToday();
            }
            return this._calendar.isValid(ngbDate) ? ngbDate : defaultValue;
        };
        NgbDatepickerService.prototype.getMonth = function (struct) {
            var e_1, _a;
            try {
                for (var _b = __values(this._state.months), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var month = _c.value;
                    if (struct.month === month.number && struct.year === month.year) {
                        return month;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            throw new Error("month " + struct.month + " of year " + struct.year + " not found");
        };
        NgbDatepickerService.prototype._nextState = function (patch) {
            var newState = this._updateState(patch);
            this._patchContexts(newState);
            this._state = newState;
            this._model$.next(this._state);
        };
        NgbDatepickerService.prototype._patchContexts = function (state) {
            var months = state.months, displayMonths = state.displayMonths, selectedDate = state.selectedDate, focusDate = state.focusDate, focusVisible = state.focusVisible, disabled = state.disabled, outsideDays = state.outsideDays;
            state.months.forEach(function (month) {
                month.weeks.forEach(function (week) {
                    week.days.forEach(function (day) {
                        // patch focus flag
                        if (focusDate) {
                            day.context.focused = focusDate.equals(day.date) && focusVisible;
                        }
                        // calculating tabindex
                        day.tabindex =
                            !disabled && focusDate && day.date.equals(focusDate) && focusDate.month === month.number ? 0 : -1;
                        // override context disabled
                        if (disabled === true) {
                            day.context.disabled = true;
                        }
                        // patch selection flag
                        if (selectedDate !== undefined) {
                            day.context.selected = selectedDate !== null && selectedDate.equals(day.date);
                        }
                        // visibility
                        if (month.number !== day.date.month) {
                            day.hidden = outsideDays === 'hidden' || outsideDays === 'collapsed' ||
                                (displayMonths > 1 && day.date.after(months[0].firstDate) &&
                                    day.date.before(months[displayMonths - 1].lastDate));
                        }
                    });
                });
            });
        };
        NgbDatepickerService.prototype._updateState = function (patch) {
            // patching fields
            var state = Object.assign({}, this._state, patch);
            var startDate = state.firstDate;
            // min/max dates changed
            if ('minDate' in patch || 'maxDate' in patch) {
                checkMinBeforeMax(state.minDate, state.maxDate);
                state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
                state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
                startDate = state.focusDate;
            }
            // disabled
            if ('disabled' in patch) {
                state.focusVisible = false;
            }
            // initial rebuild via 'select()'
            if ('selectedDate' in patch && this._state.months.length === 0) {
                startDate = state.selectedDate;
            }
            // terminate early if only focus visibility was changed
            if ('focusVisible' in patch) {
                return state;
            }
            // focus date changed
            if ('focusDate' in patch) {
                state.focusDate = checkDateInRange(state.focusDate, state.minDate, state.maxDate);
                startDate = state.focusDate;
                // nothing to rebuild if only focus changed and it is still visible
                if (state.months.length !== 0 && state.focusDate && !state.focusDate.before(state.firstDate) &&
                    !state.focusDate.after(state.lastDate)) {
                    return state;
                }
            }
            // first date changed
            if ('firstDate' in patch) {
                state.firstDate = checkDateInRange(state.firstDate, state.minDate, state.maxDate);
                startDate = state.firstDate;
            }
            // rebuilding months
            if (startDate) {
                var forceRebuild = 'dayTemplateData' in patch || 'firstDayOfWeek' in patch || 'markDisabled' in patch ||
                    'minDate' in patch || 'maxDate' in patch || 'disabled' in patch || 'outsideDays' in patch ||
                    'weekdaysVisible' in patch;
                var months = buildMonths(this._calendar, startDate, state, this._i18n, forceRebuild);
                // updating months and boundary dates
                state.months = months;
                state.firstDate = months[0].firstDate;
                state.lastDate = months[months.length - 1].lastDate;
                // reset selected date if 'markDisabled' returns true
                if ('selectedDate' in patch && !isDateSelectable(state.selectedDate, state)) {
                    state.selectedDate = null;
                }
                // adjusting focus after months were built
                if ('firstDate' in patch) {
                    if (!state.focusDate || state.focusDate.before(state.firstDate) || state.focusDate.after(state.lastDate)) {
                        state.focusDate = startDate;
                    }
                }
                // adjusting months/years for the select box navigation
                var yearChanged = !this._state.firstDate || this._state.firstDate.year !== state.firstDate.year;
                var monthChanged = !this._state.firstDate || this._state.firstDate.month !== state.firstDate.month;
                if (state.navigation === 'select') {
                    // years ->  boundaries (min/max were changed)
                    if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.years.length === 0 || yearChanged) {
                        state.selectBoxes.years = generateSelectBoxYears(state.firstDate, state.minDate, state.maxDate);
                    }
                    // months -> when current year or boundaries change
                    if ('minDate' in patch || 'maxDate' in patch || state.selectBoxes.months.length === 0 || yearChanged) {
                        state.selectBoxes.months =
                            generateSelectBoxMonths(this._calendar, state.firstDate, state.minDate, state.maxDate);
                    }
                }
                else {
                    state.selectBoxes = { years: [], months: [] };
                }
                // updating navigation arrows -> boundaries change (min/max) or month/year changes
                if ((state.navigation === 'arrows' || state.navigation === 'select') &&
                    (monthChanged || yearChanged || 'minDate' in patch || 'maxDate' in patch || 'disabled' in patch)) {
                    state.prevDisabled = state.disabled || prevMonthDisabled(this._calendar, state.firstDate, state.minDate);
                    state.nextDisabled = state.disabled || nextMonthDisabled(this._calendar, state.lastDate, state.maxDate);
                }
            }
            return state;
        };
        return NgbDatepickerService;
    }());
    NgbDatepickerService.decorators = [
        { type: i0.Injectable }
    ];
    NgbDatepickerService.ctorParameters = function () { return [
        { type: NgbCalendar },
        { type: NgbDatepickerI18n }
    ]; };

    // clang-format on
    var NavigationEvent;
    (function (NavigationEvent) {
        NavigationEvent[NavigationEvent["PREV"] = 0] = "PREV";
        NavigationEvent[NavigationEvent["NEXT"] = 1] = "NEXT";
    })(NavigationEvent || (NavigationEvent = {}));

    /**
     * A configuration service for the [`NgbDatepicker`](#/components/datepicker/api#NgbDatepicker) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the datepickers used in the application.
     */
    var NgbDatepickerConfig = /** @class */ (function () {
        function NgbDatepickerConfig() {
            this.displayMonths = 1;
            this.firstDayOfWeek = 1;
            this.navigation = 'select';
            this.outsideDays = 'visible';
            this.showWeekdays = true;
            this.showWeekNumbers = false;
            this.weekdays = i1.TranslationWidth.Short;
        }
        return NgbDatepickerConfig;
    }());
    NgbDatepickerConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbDatepickerConfig_Factory() { return new NgbDatepickerConfig(); }, token: NgbDatepickerConfig, providedIn: "root" });
    NgbDatepickerConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    function NGB_DATEPICKER_DATE_ADAPTER_FACTORY() {
        return new NgbDateStructAdapter();
    }
    /**
     * An abstract service that does the conversion between the internal datepicker `NgbDateStruct` model and
     * any provided user date model `D`, ex. a string, a native date, etc.
     *
     * The adapter is used **only** for conversion when binding datepicker to a form control,
     * ex. `[(ngModel)]="userDateModel"`. Here `userDateModel` can be of any type.
     *
     * The default datepicker implementation assumes we use `NgbDateStruct` as a user model.
     *
     * See the [date format overview](#/components/datepicker/overview#date-model) for more details
     * and the [custom adapter demo](#/components/datepicker/examples#adapter) for an example.
     */
    var NgbDateAdapter = /** @class */ (function () {
        function NgbDateAdapter() {
        }
        return NgbDateAdapter;
    }());
    NgbDateAdapter.ɵprov = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY, token: NgbDateAdapter, providedIn: "root" });
    NgbDateAdapter.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_DATE_ADAPTER_FACTORY },] }
    ];
    var NgbDateStructAdapter = /** @class */ (function (_super) {
        __extends(NgbDateStructAdapter, _super);
        function NgbDateStructAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Converts a NgbDateStruct value into NgbDateStruct value
         */
        NgbDateStructAdapter.prototype.fromModel = function (date) {
            return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
                { year: date.year, month: date.month, day: date.day } :
                null;
        };
        /**
         * Converts a NgbDateStruct value into NgbDateStruct value
         */
        NgbDateStructAdapter.prototype.toModel = function (date) {
            return (date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day)) ?
                { year: date.year, month: date.month, day: date.day } :
                null;
        };
        return NgbDateStructAdapter;
    }(NgbDateAdapter));
    NgbDateStructAdapter.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * A directive that marks the content template that customizes the way datepicker months are displayed
     *
     * @since 5.3.0
     */
    var NgbDatepickerContent = /** @class */ (function () {
        function NgbDatepickerContent(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbDatepickerContent;
    }());
    NgbDatepickerContent.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbDatepickerContent]' },] }
    ];
    NgbDatepickerContent.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A highly configurable component that helps you with selecting calendar dates.
     *
     * `NgbDatepicker` is meant to be displayed inline on a page or put inside a popup.
     */
    var NgbDatepicker = /** @class */ (function () {
        function NgbDatepicker(_service, _calendar, i18n, config, cd, _elementRef, _ngbDateAdapter, _ngZone) {
            var _this = this;
            this._service = _service;
            this._calendar = _calendar;
            this.i18n = i18n;
            this._elementRef = _elementRef;
            this._ngbDateAdapter = _ngbDateAdapter;
            this._ngZone = _ngZone;
            this._controlValue = null;
            this._destroyed$ = new rxjs.Subject();
            this._publicState = {};
            /**
             * An event emitted right before the navigation happens and displayed month changes.
             *
             * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
             */
            this.navigate = new i0.EventEmitter();
            /**
             * An event emitted when user selects a date using keyboard or mouse.
             *
             * The payload of the event is currently selected `NgbDate`.
             *
             * @since 5.2.0
             */
            this.dateSelect = new i0.EventEmitter();
            this.onChange = function (_) { };
            this.onTouched = function () { };
            ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
                'maxDate', 'navigation', 'outsideDays', 'showWeekdays', 'showWeekNumbers', 'startDate', 'weekdays']
                .forEach(function (input) { return _this[input] = config[input]; });
            _service.dateSelect$.pipe(operators.takeUntil(this._destroyed$)).subscribe(function (date) { _this.dateSelect.emit(date); });
            _service.model$.pipe(operators.takeUntil(this._destroyed$)).subscribe(function (model) {
                var newDate = model.firstDate;
                var oldDate = _this.model ? _this.model.firstDate : null;
                // update public state
                _this._publicState = {
                    maxDate: model.maxDate,
                    minDate: model.minDate,
                    firstDate: model.firstDate,
                    lastDate: model.lastDate,
                    focusedDate: model.focusDate,
                    months: model.months.map(function (viewModel) { return viewModel.firstDate; })
                };
                var navigationPrevented = false;
                // emitting navigation event if the first month changes
                if (!newDate.equals(oldDate)) {
                    _this.navigate.emit({
                        current: oldDate ? { year: oldDate.year, month: oldDate.month } : null,
                        next: { year: newDate.year, month: newDate.month },
                        preventDefault: function () { return navigationPrevented = true; }
                    });
                    // can't prevent the very first navigation
                    if (navigationPrevented && oldDate !== null) {
                        _this._service.open(oldDate);
                        return;
                    }
                }
                var newSelectedDate = model.selectedDate;
                var newFocusedDate = model.focusDate;
                var oldFocusedDate = _this.model ? _this.model.focusDate : null;
                _this.model = model;
                // handling selection change
                if (isChangedDate(newSelectedDate, _this._controlValue)) {
                    _this._controlValue = newSelectedDate;
                    _this.onTouched();
                    _this.onChange(_this._ngbDateAdapter.toModel(newSelectedDate));
                }
                // handling focus change
                if (isChangedDate(newFocusedDate, oldFocusedDate) && oldFocusedDate && model.focusVisible) {
                    _this.focus();
                }
                cd.markForCheck();
            });
        }
        Object.defineProperty(NgbDatepicker.prototype, "showWeekdays", {
            get: function () { return this._showWeekdays; },
            /**
             * If `true`, weekdays will be displayed.
             *
             * @deprecated 9.1.0, please use 'weekdays' instead
             */
            set: function (weekdays) {
                this.weekdays = weekdays;
                this._showWeekdays = weekdays;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbDatepicker.prototype, "state", {
            /**
             *  Returns the readonly public state of the datepicker
             *
             * @since 5.2.0
             */
            get: function () { return this._publicState; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbDatepicker.prototype, "calendar", {
            /**
             *  Returns the calendar service used in the specific datepicker instance.
             *
             *  @since 5.3.0
             */
            get: function () { return this._calendar; },
            enumerable: false,
            configurable: true
        });
        /**
         *  Focuses on given date.
         */
        NgbDatepicker.prototype.focusDate = function (date) { this._service.focus(NgbDate.from(date)); };
        /**
         *  Selects focused date.
         */
        NgbDatepicker.prototype.focusSelect = function () { this._service.focusSelect(); };
        NgbDatepicker.prototype.focus = function () {
            var _this = this;
            this._ngZone.onStable.asObservable().pipe(operators.take(1)).subscribe(function () {
                var elementToFocus = _this._elementRef.nativeElement.querySelector('div.ngb-dp-day[tabindex="0"]');
                if (elementToFocus) {
                    elementToFocus.focus();
                }
            });
        };
        /**
         * Navigates to the provided date.
         *
         * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date provided calendar will open current month.
         *
         * Use the `[startDate]` input as an alternative.
         */
        NgbDatepicker.prototype.navigateTo = function (date) {
            this._service.open(NgbDate.from(date ? date.day ? date : Object.assign(Object.assign({}, date), { day: 1 }) : null));
        };
        NgbDatepicker.prototype.ngAfterViewInit = function () {
            var _this = this;
            this._ngZone.runOutsideAngular(function () {
                var focusIns$ = rxjs.fromEvent(_this._contentEl.nativeElement, 'focusin');
                var focusOuts$ = rxjs.fromEvent(_this._contentEl.nativeElement, 'focusout');
                var nativeElement = _this._elementRef.nativeElement;
                // we're changing 'focusVisible' only when entering or leaving months view
                // and ignoring all focus events where both 'target' and 'related' target are day cells
                rxjs.merge(focusIns$, focusOuts$)
                    .pipe(operators.filter(function (_a) {
                    var target = _a.target, relatedTarget = _a.relatedTarget;
                    return !(hasClassName(target, 'ngb-dp-day') && hasClassName(relatedTarget, 'ngb-dp-day') &&
                        nativeElement.contains(target) && nativeElement.contains(relatedTarget));
                }), operators.takeUntil(_this._destroyed$))
                    .subscribe(function (_a) {
                    var type = _a.type;
                    return _this._ngZone.run(function () { return _this._service.set({ focusVisible: type === 'focusin' }); });
                });
            });
        };
        NgbDatepicker.prototype.ngOnDestroy = function () { this._destroyed$.next(); };
        NgbDatepicker.prototype.ngOnInit = function () {
            var _this = this;
            if (this.model === undefined) {
                var inputs_1 = {};
                ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
                    'outsideDays', 'weekdays']
                    .forEach(function (name) { return inputs_1[name] = _this[name]; });
                this._service.set(inputs_1);
                this.navigateTo(this.startDate);
            }
            if (!this.dayTemplate) {
                this.dayTemplate = this._defaultDayTemplate;
            }
        };
        NgbDatepicker.prototype.ngOnChanges = function (changes) {
            var _this = this;
            var inputs = {};
            if (changes.showWeekdays) {
                inputs['weekdays'] = this.weekdays;
            }
            ['dayTemplateData', 'displayMonths', 'markDisabled', 'firstDayOfWeek', 'navigation', 'minDate', 'maxDate',
                'outsideDays', 'weekdays']
                .filter(function (name) { return name in changes; })
                .forEach(function (name) { return inputs[name] = _this[name]; });
            this._service.set(inputs);
            if ('startDate' in changes) {
                var _a = changes.startDate, currentValue = _a.currentValue, previousValue = _a.previousValue;
                if (isChangedMonth(previousValue, currentValue)) {
                    this.navigateTo(this.startDate);
                }
            }
        };
        NgbDatepicker.prototype.onDateSelect = function (date) {
            this._service.focus(date);
            this._service.select(date, { emitEvent: true });
        };
        NgbDatepicker.prototype.onNavigateDateSelect = function (date) { this._service.open(date); };
        NgbDatepicker.prototype.onNavigateEvent = function (event) {
            switch (event) {
                case NavigationEvent.PREV:
                    this._service.open(this._calendar.getPrev(this.model.firstDate, 'm', 1));
                    break;
                case NavigationEvent.NEXT:
                    this._service.open(this._calendar.getNext(this.model.firstDate, 'm', 1));
                    break;
            }
        };
        NgbDatepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
        NgbDatepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        NgbDatepicker.prototype.setDisabledState = function (disabled) { this._service.set({ disabled: disabled }); };
        NgbDatepicker.prototype.writeValue = function (value) {
            this._controlValue = NgbDate.from(this._ngbDateAdapter.fromModel(value));
            this._service.select(this._controlValue);
        };
        return NgbDatepicker;
    }());
    NgbDatepicker.decorators = [
        { type: i0.Component, args: [{
                    exportAs: 'ngbDatepicker',
                    selector: 'ngb-datepicker',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <ng-template #defaultDayTemplate let-date=\"date\" let-currentMonth=\"currentMonth\" let-selected=\"selected\"\n                 let-disabled=\"disabled\" let-focused=\"focused\">\n      <div ngbDatepickerDayView\n        [date]=\"date\"\n        [currentMonth]=\"currentMonth\"\n        [selected]=\"selected\"\n        [disabled]=\"disabled\"\n        [focused]=\"focused\">\n      </div>\n    </ng-template>\n\n    <ng-template #defaultContentTemplate>\n      <div *ngFor=\"let month of model.months; let i = index;\" class=\"ngb-dp-month\">\n        <div *ngIf=\"navigation === 'none' || (displayMonths > 1 && navigation === 'select')\" class=\"ngb-dp-month-name\">\n          {{ i18n.getMonthLabel(month.firstDate) }}\n        </div>\n        <ngb-datepicker-month [month]=\"month.firstDate\"></ngb-datepicker-month>\n      </div>\n    </ng-template>\n\n    <div class=\"ngb-dp-header\">\n      <ngb-datepicker-navigation *ngIf=\"navigation !== 'none'\"\n        [date]=\"model.firstDate!\"\n        [months]=\"model.months\"\n        [disabled]=\"model.disabled\"\n        [showSelect]=\"model.navigation === 'select'\"\n        [prevDisabled]=\"model.prevDisabled\"\n        [nextDisabled]=\"model.nextDisabled\"\n        [selectBoxes]=\"model.selectBoxes\"\n        (navigate)=\"onNavigateEvent($event)\"\n        (select)=\"onNavigateDateSelect($event)\">\n      </ngb-datepicker-navigation>\n    </div>\n\n    <div class=\"ngb-dp-content\" [class.ngb-dp-months]=\"!contentTemplate\" #content>\n      <ng-template [ngTemplateOutlet]=\"contentTemplate?.templateRef || defaultContentTemplate\"></ng-template>\n    </div>\n\n    <ng-template [ngTemplateOutlet]=\"footerTemplate\"></ng-template>\n  ",
                    providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: i0.forwardRef(function () { return NgbDatepicker; }), multi: true }, NgbDatepickerService],
                    styles: ["ngb-datepicker{border:1px solid #dfdfdf;border-radius:.25rem;display:inline-block}ngb-datepicker-month{pointer-events:auto}ngb-datepicker.dropdown-menu{padding:0}.ngb-dp-body{z-index:1050}.ngb-dp-header{background-color:#f8f9fa;background-color:var(--light);border-bottom:0;border-radius:.25rem .25rem 0 0;padding-top:.25rem}.ngb-dp-months{display:flex}.ngb-dp-month{pointer-events:none}.ngb-dp-month-name{background-color:#f8f9fa;background-color:var(--light);font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-month+.ngb-dp-month .ngb-dp-month-name,.ngb-dp-month+.ngb-dp-month .ngb-dp-week{padding-left:1rem}.ngb-dp-month:last-child .ngb-dp-week{padding-right:.25rem}.ngb-dp-month:first-child .ngb-dp-week{padding-left:.25rem}.ngb-dp-month .ngb-dp-week:last-child{padding-bottom:.25rem}"]
                },] }
    ];
    NgbDatepicker.ctorParameters = function () { return [
        { type: NgbDatepickerService },
        { type: NgbCalendar },
        { type: NgbDatepickerI18n },
        { type: NgbDatepickerConfig },
        { type: i0.ChangeDetectorRef },
        { type: i0.ElementRef },
        { type: NgbDateAdapter },
        { type: i0.NgZone }
    ]; };
    NgbDatepicker.propDecorators = {
        _defaultDayTemplate: [{ type: i0.ViewChild, args: ['defaultDayTemplate', { static: true },] }],
        _contentEl: [{ type: i0.ViewChild, args: ['content', { static: true },] }],
        contentTemplate: [{ type: i0.ContentChild, args: [NgbDatepickerContent, { static: true },] }],
        dayTemplate: [{ type: i0.Input }],
        dayTemplateData: [{ type: i0.Input }],
        displayMonths: [{ type: i0.Input }],
        firstDayOfWeek: [{ type: i0.Input }],
        footerTemplate: [{ type: i0.Input }],
        markDisabled: [{ type: i0.Input }],
        maxDate: [{ type: i0.Input }],
        minDate: [{ type: i0.Input }],
        navigation: [{ type: i0.Input }],
        outsideDays: [{ type: i0.Input }],
        showWeekdays: [{ type: i0.Input }],
        showWeekNumbers: [{ type: i0.Input }],
        startDate: [{ type: i0.Input }],
        weekdays: [{ type: i0.Input }],
        navigate: [{ type: i0.Output }],
        dateSelect: [{ type: i0.Output }]
    };

    var Key;
    (function (Key) {
        Key[Key["Tab"] = 9] = "Tab";
        Key[Key["Enter"] = 13] = "Enter";
        Key[Key["Escape"] = 27] = "Escape";
        Key[Key["Space"] = 32] = "Space";
        Key[Key["PageUp"] = 33] = "PageUp";
        Key[Key["PageDown"] = 34] = "PageDown";
        Key[Key["End"] = 35] = "End";
        Key[Key["Home"] = 36] = "Home";
        Key[Key["ArrowLeft"] = 37] = "ArrowLeft";
        Key[Key["ArrowUp"] = 38] = "ArrowUp";
        Key[Key["ArrowRight"] = 39] = "ArrowRight";
        Key[Key["ArrowDown"] = 40] = "ArrowDown";
    })(Key || (Key = {}));

    /**
     * A service that represents the keyboard navigation.
     *
     * Default keyboard shortcuts [are documented in the overview](#/components/datepicker/overview#keyboard-shortcuts)
     *
     * @since 5.2.0
     */
    var NgbDatepickerKeyboardService = /** @class */ (function () {
        function NgbDatepickerKeyboardService() {
        }
        /**
         * Processes a keyboard event.
         */
        NgbDatepickerKeyboardService.prototype.processKey = function (event, datepicker) {
            var state = datepicker.state, calendar = datepicker.calendar;
            // tslint:disable-next-line:deprecation
            switch (event.which) {
                case Key.PageUp:
                    datepicker.focusDate(calendar.getPrev(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                    break;
                case Key.PageDown:
                    datepicker.focusDate(calendar.getNext(state.focusedDate, event.shiftKey ? 'y' : 'm', 1));
                    break;
                case Key.End:
                    datepicker.focusDate(event.shiftKey ? state.maxDate : state.lastDate);
                    break;
                case Key.Home:
                    datepicker.focusDate(event.shiftKey ? state.minDate : state.firstDate);
                    break;
                case Key.ArrowLeft:
                    datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', 1));
                    break;
                case Key.ArrowUp:
                    datepicker.focusDate(calendar.getPrev(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                    break;
                case Key.ArrowRight:
                    datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', 1));
                    break;
                case Key.ArrowDown:
                    datepicker.focusDate(calendar.getNext(state.focusedDate, 'd', calendar.getDaysPerWeek()));
                    break;
                case Key.Enter:
                case Key.Space:
                    datepicker.focusSelect();
                    break;
                default:
                    return;
            }
            event.preventDefault();
            event.stopPropagation();
        };
        return NgbDatepickerKeyboardService;
    }());
    NgbDatepickerKeyboardService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbDatepickerKeyboardService_Factory() { return new NgbDatepickerKeyboardService(); }, token: NgbDatepickerKeyboardService, providedIn: "root" });
    NgbDatepickerKeyboardService.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    /**
     * A component that renders one month including all the days, weekdays and week numbers. Can be used inside
     * the `<ng-template ngbDatepickerMonths></ng-template>` when you want to customize months layout.
     *
     * For a usage example, see [custom month layout demo](#/components/datepicker/examples#custommonth)
     *
     * @since 5.3.0
     */
    var NgbDatepickerMonth = /** @class */ (function () {
        function NgbDatepickerMonth(i18n, datepicker, _keyboardService, _service) {
            this.i18n = i18n;
            this.datepicker = datepicker;
            this._keyboardService = _keyboardService;
            this._service = _service;
        }
        Object.defineProperty(NgbDatepickerMonth.prototype, "month", {
            /**
             * The first date of month to be rendered.
             *
             * This month must one of the months present in the
             * [datepicker state](#/components/datepicker/api#NgbDatepickerState).
             */
            set: function (month) {
                this.viewModel = this._service.getMonth(month);
            },
            enumerable: false,
            configurable: true
        });
        NgbDatepickerMonth.prototype.onKeyDown = function (event) { this._keyboardService.processKey(event, this.datepicker); };
        NgbDatepickerMonth.prototype.doSelect = function (day) {
            if (!day.context.disabled && !day.hidden) {
                this.datepicker.onDateSelect(day.date);
            }
        };
        return NgbDatepickerMonth;
    }());
    NgbDatepickerMonth.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-datepicker-month',
                    host: { 'role': 'grid', '(keydown)': 'onKeyDown($event)' },
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <div *ngIf=\"viewModel.weekdays.length > 0\" class=\"ngb-dp-week ngb-dp-weekdays\" role=\"row\">\n      <div *ngIf=\"datepicker.showWeekNumbers\" class=\"ngb-dp-weekday ngb-dp-showweek small\">{{ i18n.getWeekLabel() }}</div>\n      <div *ngFor=\"let weekday of viewModel.weekdays\" class=\"ngb-dp-weekday small\" role=\"columnheader\">{{ weekday }}</div>\n    </div>\n    <ng-template ngFor let-week [ngForOf]=\"viewModel.weeks\">\n      <div *ngIf=\"!week.collapsed\" class=\"ngb-dp-week\" role=\"row\">\n        <div *ngIf=\"datepicker.showWeekNumbers\" class=\"ngb-dp-week-number small text-muted\">{{ i18n.getWeekNumerals(week.number) }}</div>\n        <div *ngFor=\"let day of week.days\" (click)=\"doSelect(day); $event.preventDefault()\" class=\"ngb-dp-day\" role=\"gridcell\"\n             [class.disabled]=\"day.context.disabled\"\n             [tabindex]=\"day.tabindex\"\n             [class.hidden]=\"day.hidden\"\n             [class.ngb-dp-today]=\"day.context.today\"\n             [attr.aria-label]=\"day.ariaLabel\">\n          <ng-template [ngIf]=\"!day.hidden\">\n            <ng-template [ngTemplateOutlet]=\"datepicker.dayTemplate\" [ngTemplateOutletContext]=\"day.context\"></ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </ng-template>\n  ",
                    styles: ["ngb-datepicker-month{display:block}.ngb-dp-week-number,.ngb-dp-weekday{font-style:italic;line-height:2rem;text-align:center}.ngb-dp-weekday{color:#5bc0de;color:var(--info)}.ngb-dp-week{border-radius:.25rem;display:flex}.ngb-dp-weekdays{background-color:#f8f9fa;background-color:var(--light);border-bottom:1px solid rgba(0,0,0,.125);border-radius:0}.ngb-dp-day,.ngb-dp-week-number,.ngb-dp-weekday{height:2rem;width:2rem}.ngb-dp-day{cursor:pointer}.ngb-dp-day.disabled,.ngb-dp-day.hidden{cursor:default;pointer-events:none}.ngb-dp-day[tabindex=\"0\"]{z-index:1}"]
                },] }
    ];
    NgbDatepickerMonth.ctorParameters = function () { return [
        { type: NgbDatepickerI18n },
        { type: NgbDatepicker },
        { type: NgbDatepickerKeyboardService },
        { type: NgbDatepickerService }
    ]; };
    NgbDatepickerMonth.propDecorators = {
        month: [{ type: i0.Input }]
    };

    var NgbDatepickerNavigation = /** @class */ (function () {
        function NgbDatepickerNavigation(i18n) {
            this.i18n = i18n;
            this.navigation = NavigationEvent;
            this.months = [];
            this.navigate = new i0.EventEmitter();
            this.select = new i0.EventEmitter();
        }
        NgbDatepickerNavigation.prototype.onClickPrev = function (event) {
            event.currentTarget.focus();
            this.navigate.emit(this.navigation.PREV);
        };
        NgbDatepickerNavigation.prototype.onClickNext = function (event) {
            event.currentTarget.focus();
            this.navigate.emit(this.navigation.NEXT);
        };
        return NgbDatepickerNavigation;
    }());
    NgbDatepickerNavigation.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-datepicker-navigation',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <div class=\"ngb-dp-arrow\">\n      <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\" (click)=\"onClickPrev($event)\" [disabled]=\"prevDisabled\"\n              i18n-aria-label=\"@@ngb.datepicker.previous-month\" aria-label=\"Previous month\"\n              i18n-title=\"@@ngb.datepicker.previous-month\" title=\"Previous month\">\n        <span class=\"ngb-dp-navigation-chevron\"></span>\n      </button>\n    </div>\n    <ngb-datepicker-navigation-select *ngIf=\"showSelect\" class=\"ngb-dp-navigation-select\"\n      [date]=\"date\"\n      [disabled] = \"disabled\"\n      [months]=\"selectBoxes.months\"\n      [years]=\"selectBoxes.years\"\n      (select)=\"select.emit($event)\">\n    </ngb-datepicker-navigation-select>\n\n    <ng-template *ngIf=\"!showSelect\" ngFor let-month [ngForOf]=\"months\" let-i=\"index\">\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i > 0\"></div>\n      <div class=\"ngb-dp-month-name\">\n        {{ i18n.getMonthFullName(month.number, month.year) }} {{ i18n.getYearNumerals(month.year) }}\n      </div>\n      <div class=\"ngb-dp-arrow\" *ngIf=\"i !== months.length - 1\"></div>\n    </ng-template>\n    <div class=\"ngb-dp-arrow right\">\n      <button type=\"button\" class=\"btn btn-link ngb-dp-arrow-btn\" (click)=\"onClickNext($event)\" [disabled]=\"nextDisabled\"\n              i18n-aria-label=\"@@ngb.datepicker.next-month\" aria-label=\"Next month\"\n              i18n-title=\"@@ngb.datepicker.next-month\" title=\"Next month\">\n        <span class=\"ngb-dp-navigation-chevron\"></span>\n      </button>\n    </div>\n    ",
                    styles: ["ngb-datepicker-navigation{align-items:center;display:flex}.ngb-dp-navigation-chevron{border-style:solid;border-width:.2em .2em 0 0;display:inline-block;height:.75em;margin-left:.25em;margin-right:.15em;transform:rotate(-135deg);width:.75em}.ngb-dp-arrow{display:flex;flex:1 1 auto;height:2rem;margin:0;padding-left:0;padding-right:0;width:2rem}.ngb-dp-arrow.right{justify-content:flex-end}.ngb-dp-arrow.right .ngb-dp-navigation-chevron{margin-left:.15em;margin-right:.25em;transform:rotate(45deg)}.ngb-dp-arrow-btn{background-color:transparent;border:none;margin:0 .5rem;padding:0 .25rem;z-index:1}.ngb-dp-arrow-btn:focus{outline-style:auto;outline-width:1px}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.ngb-dp-arrow-btn:focus{outline-style:solid}}.ngb-dp-month-name{font-size:larger;height:2rem;line-height:2rem;text-align:center}.ngb-dp-navigation-select{display:flex;flex:1 1 9rem}"]
                },] }
    ];
    NgbDatepickerNavigation.ctorParameters = function () { return [
        { type: NgbDatepickerI18n }
    ]; };
    NgbDatepickerNavigation.propDecorators = {
        date: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        months: [{ type: i0.Input }],
        showSelect: [{ type: i0.Input }],
        prevDisabled: [{ type: i0.Input }],
        nextDisabled: [{ type: i0.Input }],
        selectBoxes: [{ type: i0.Input }],
        navigate: [{ type: i0.Output }],
        select: [{ type: i0.Output }]
    };

    var isContainedIn = function (element, array) { return array ? array.some(function (item) { return item.contains(element); }) : false; };
    var ɵ0$2 = isContainedIn;
    var matchesSelectorIfAny = function (element, selector) { return !selector || closest(element, selector) != null; };
    var ɵ1$1 = matchesSelectorIfAny;
    var ɵ2$1 = function () {
        var isIOS = function () { return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
            (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2); };
        var isAndroid = function () { return /Android/.test(navigator.userAgent); };
        return typeof navigator !== 'undefined' ? !!navigator.userAgent && (isIOS() || isAndroid()) : false;
    };
    // we have to add a more significant delay to avoid re-opening when handling (click) on a toggling element
    // TODO: use proper Angular platform detection when NgbAutoClose becomes a service and we can inject PLATFORM_ID
    var isMobile = (ɵ2$1)();
    // setting 'ngbAutoClose' synchronously on mobile results in immediate popup closing
    // when tapping on the triggering element
    var wrapAsyncForMobile = function (fn) { return isMobile ? function () { return setTimeout(function () { return fn(); }, 100); } : fn; };
    var ɵ3 = wrapAsyncForMobile;
    function ngbAutoClose(zone, document, type, close, closed$, insideElements, ignoreElements, insideSelector) {
        // closing on ESC and outside clicks
        if (type) {
            zone.runOutsideAngular(wrapAsyncForMobile(function () {
                var shouldCloseOnClick = function (event) {
                    var element = event.target;
                    if (event.button === 2 || isContainedIn(element, ignoreElements)) {
                        return false;
                    }
                    if (type === 'inside') {
                        return isContainedIn(element, insideElements) && matchesSelectorIfAny(element, insideSelector);
                    }
                    else if (type === 'outside') {
                        return !isContainedIn(element, insideElements);
                    }
                    else /* if (type === true) */ {
                        return matchesSelectorIfAny(element, insideSelector) || !isContainedIn(element, insideElements);
                    }
                };
                var escapes$ = rxjs.fromEvent(document, 'keydown')
                    .pipe(operators.takeUntil(closed$), 
                // tslint:disable-next-line:deprecation
                operators.filter(function (e) { return e.which === Key.Escape; }), operators.tap(function (e) { return e.preventDefault(); }));
                // we have to pre-calculate 'shouldCloseOnClick' on 'mousedown',
                // because on 'mouseup' DOM nodes might be detached
                var mouseDowns$ = rxjs.fromEvent(document, 'mousedown').pipe(operators.map(shouldCloseOnClick), operators.takeUntil(closed$));
                var closeableClicks$ = rxjs.fromEvent(document, 'mouseup')
                    .pipe(operators.withLatestFrom(mouseDowns$), operators.filter(function (_a) {
                    var _b = __read(_a, 2), _ = _b[0], shouldClose = _b[1];
                    return shouldClose;
                }), operators.delay(0), operators.takeUntil(closed$));
                rxjs.race([
                    escapes$.pipe(operators.map(function (_) { return 0; } /* ESCAPE */)), closeableClicks$.pipe(operators.map(function (_) { return 1; } /* CLICK */))
                ]).subscribe(function (source) { return zone.run(function () { return close(source); }); });
            }));
        }
    }

    var FOCUSABLE_ELEMENTS_SELECTOR = [
        'a[href]', 'button:not([disabled])', 'input:not([disabled]):not([type="hidden"])', 'select:not([disabled])',
        'textarea:not([disabled])', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    /**
     * Returns first and last focusable elements inside of a given element based on specific CSS selector
     */
    function getFocusableBoundaryElements(element) {
        var list = Array.from(element.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR))
            .filter(function (el) { return el.tabIndex !== -1; });
        return [list[0], list[list.length - 1]];
    }
    /**
     * Function that enforces browser focus to be trapped inside a DOM element.
     *
     * Works only for clicks inside the element and navigation with 'Tab', ignoring clicks outside of the element
     *
     * @param zone Angular zone
     * @param element The element around which focus will be trapped inside
     * @param stopFocusTrap$ The observable stream. When completed the focus trap will clean up listeners
     * and free internal resources
     * @param refocusOnClick Put the focus back to the last focused element whenever a click occurs on element (default to
     * false)
     */
    var ngbFocusTrap = function (zone, element, stopFocusTrap$, refocusOnClick) {
        if (refocusOnClick === void 0) { refocusOnClick = false; }
        zone.runOutsideAngular(function () {
            // last focused element
            var lastFocusedElement$ = rxjs.fromEvent(element, 'focusin').pipe(operators.takeUntil(stopFocusTrap$), operators.map(function (e) { return e.target; }));
            // 'tab' / 'shift+tab' stream
            rxjs.fromEvent(element, 'keydown')
                .pipe(operators.takeUntil(stopFocusTrap$), 
            // tslint:disable:deprecation
            operators.filter(function (e) { return e.which === Key.Tab; }), 
            // tslint:enable:deprecation
            operators.withLatestFrom(lastFocusedElement$))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), tabEvent = _b[0], focusedElement = _b[1];
                var _c = __read(getFocusableBoundaryElements(element), 2), first = _c[0], last = _c[1];
                if ((focusedElement === first || focusedElement === element) && tabEvent.shiftKey) {
                    last.focus();
                    tabEvent.preventDefault();
                }
                if (focusedElement === last && !tabEvent.shiftKey) {
                    first.focus();
                    tabEvent.preventDefault();
                }
            });
            // inside click
            if (refocusOnClick) {
                rxjs.fromEvent(element, 'click')
                    .pipe(operators.takeUntil(stopFocusTrap$), operators.withLatestFrom(lastFocusedElement$), operators.map(function (arr) { return arr[1]; }))
                    .subscribe(function (lastFocusedElement) { return lastFocusedElement.focus(); });
            }
        });
    };

    // previous version:
    // https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
    var Positioning = /** @class */ (function () {
        function Positioning() {
        }
        Positioning.prototype.getAllStyles = function (element) { return window.getComputedStyle(element); };
        Positioning.prototype.getStyle = function (element, prop) { return this.getAllStyles(element)[prop]; };
        Positioning.prototype.isStaticPositioned = function (element) {
            return (this.getStyle(element, 'position') || 'static') === 'static';
        };
        Positioning.prototype.offsetParent = function (element) {
            var offsetParentEl = element.offsetParent || document.documentElement;
            while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
                offsetParentEl = offsetParentEl.offsetParent;
            }
            return offsetParentEl || document.documentElement;
        };
        Positioning.prototype.position = function (element, round) {
            if (round === void 0) { round = true; }
            var elPosition;
            var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
            if (this.getStyle(element, 'position') === 'fixed') {
                elPosition = element.getBoundingClientRect();
                elPosition = {
                    top: elPosition.top,
                    bottom: elPosition.bottom,
                    left: elPosition.left,
                    right: elPosition.right,
                    height: elPosition.height,
                    width: elPosition.width
                };
            }
            else {
                var offsetParentEl = this.offsetParent(element);
                elPosition = this.offset(element, false);
                if (offsetParentEl !== document.documentElement) {
                    parentOffset = this.offset(offsetParentEl, false);
                }
                parentOffset.top += offsetParentEl.clientTop;
                parentOffset.left += offsetParentEl.clientLeft;
            }
            elPosition.top -= parentOffset.top;
            elPosition.bottom -= parentOffset.top;
            elPosition.left -= parentOffset.left;
            elPosition.right -= parentOffset.left;
            if (round) {
                elPosition.top = Math.round(elPosition.top);
                elPosition.bottom = Math.round(elPosition.bottom);
                elPosition.left = Math.round(elPosition.left);
                elPosition.right = Math.round(elPosition.right);
            }
            return elPosition;
        };
        Positioning.prototype.offset = function (element, round) {
            if (round === void 0) { round = true; }
            var elBcr = element.getBoundingClientRect();
            var viewportOffset = {
                top: window.pageYOffset - document.documentElement.clientTop,
                left: window.pageXOffset - document.documentElement.clientLeft
            };
            var elOffset = {
                height: elBcr.height || element.offsetHeight,
                width: elBcr.width || element.offsetWidth,
                top: elBcr.top + viewportOffset.top,
                bottom: elBcr.bottom + viewportOffset.top,
                left: elBcr.left + viewportOffset.left,
                right: elBcr.right + viewportOffset.left
            };
            if (round) {
                elOffset.height = Math.round(elOffset.height);
                elOffset.width = Math.round(elOffset.width);
                elOffset.top = Math.round(elOffset.top);
                elOffset.bottom = Math.round(elOffset.bottom);
                elOffset.left = Math.round(elOffset.left);
                elOffset.right = Math.round(elOffset.right);
            }
            return elOffset;
        };
        /*
          Return false if the element to position is outside the viewport
        */
        Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
            var _a = __read(placement.split('-'), 2), _b = _a[0], placementPrimary = _b === void 0 ? 'top' : _b, _c = _a[1], placementSecondary = _c === void 0 ? 'center' : _c;
            var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
            var targetElStyles = this.getAllStyles(targetElement);
            var marginTop = parseFloat(targetElStyles.marginTop);
            var marginBottom = parseFloat(targetElStyles.marginBottom);
            var marginLeft = parseFloat(targetElStyles.marginLeft);
            var marginRight = parseFloat(targetElStyles.marginRight);
            var topPosition = 0;
            var leftPosition = 0;
            switch (placementPrimary) {
                case 'top':
                    topPosition = (hostElPosition.top - (targetElement.offsetHeight + marginTop + marginBottom));
                    break;
                case 'bottom':
                    topPosition = (hostElPosition.top + hostElPosition.height);
                    break;
                case 'left':
                    leftPosition = (hostElPosition.left - (targetElement.offsetWidth + marginLeft + marginRight));
                    break;
                case 'right':
                    leftPosition = (hostElPosition.left + hostElPosition.width);
                    break;
            }
            switch (placementSecondary) {
                case 'top':
                    topPosition = hostElPosition.top;
                    break;
                case 'bottom':
                    topPosition = hostElPosition.top + hostElPosition.height - targetElement.offsetHeight;
                    break;
                case 'left':
                    leftPosition = hostElPosition.left;
                    break;
                case 'right':
                    leftPosition = hostElPosition.left + hostElPosition.width - targetElement.offsetWidth;
                    break;
                case 'center':
                    if (placementPrimary === 'top' || placementPrimary === 'bottom') {
                        leftPosition = (hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2);
                    }
                    else {
                        topPosition = (hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2);
                    }
                    break;
            }
            /// The translate3d/gpu acceleration render a blurry text on chrome, the next line is commented until a browser fix
            // targetElement.style.transform = `translate3d(${Math.round(leftPosition)}px, ${Math.floor(topPosition)}px, 0px)`;
            targetElement.style.transform = "translate(" + Math.round(leftPosition) + "px, " + Math.round(topPosition) + "px)";
            // Check if the targetElement is inside the viewport
            var targetElBCR = targetElement.getBoundingClientRect();
            var html = document.documentElement;
            var windowHeight = window.innerHeight || html.clientHeight;
            var windowWidth = window.innerWidth || html.clientWidth;
            return targetElBCR.left >= 0 && targetElBCR.top >= 0 && targetElBCR.right <= windowWidth &&
                targetElBCR.bottom <= windowHeight;
        };
        return Positioning;
    }());
    var placementSeparator = /\s+/;
    var positionService = new Positioning();
    /*
     * Accept the placement array and applies the appropriate placement dependent on the viewport.
     * Returns the applied placement.
     * In case of auto placement, placements are selected in order
     *   'top', 'bottom', 'left', 'right',
     *   'top-left', 'top-right',
     *   'bottom-left', 'bottom-right',
     *   'left-top', 'left-bottom',
     *   'right-top', 'right-bottom'.
     * */
    function positionElements(hostElement, targetElement, placement, appendToBody, baseClass) {
        var e_1, _a;
        var placementVals = Array.isArray(placement) ? placement : placement.split(placementSeparator);
        var allowedPlacements = [
            'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'left-top', 'left-bottom',
            'right-top', 'right-bottom'
        ];
        var classList = targetElement.classList;
        var addClassesToTarget = function (targetPlacement) {
            var _a = __read(targetPlacement.split('-'), 2), primary = _a[0], secondary = _a[1];
            var classes = [];
            if (baseClass) {
                classes.push(baseClass + "-" + primary);
                if (secondary) {
                    classes.push(baseClass + "-" + primary + "-" + secondary);
                }
                classes.forEach(function (classname) { classList.add(classname); });
            }
            return classes;
        };
        // Remove old placement classes to avoid issues
        if (baseClass) {
            allowedPlacements.forEach(function (placementToRemove) { classList.remove(baseClass + "-" + placementToRemove); });
        }
        // replace auto placement with other placements
        var hasAuto = placementVals.findIndex(function (val) { return val === 'auto'; });
        if (hasAuto >= 0) {
            allowedPlacements.forEach(function (obj) {
                if (placementVals.find(function (val) { return val.search('^' + obj) !== -1; }) == null) {
                    placementVals.splice(hasAuto++, 1, obj);
                }
            });
        }
        // coordinates where to position
        // Required for transform:
        var style = targetElement.style;
        style.position = 'absolute';
        style.top = '0';
        style.left = '0';
        style['will-change'] = 'transform';
        var testPlacement = null;
        var isInViewport = false;
        try {
            for (var placementVals_1 = __values(placementVals), placementVals_1_1 = placementVals_1.next(); !placementVals_1_1.done; placementVals_1_1 = placementVals_1.next()) {
                testPlacement = placementVals_1_1.value;
                var addedClasses = addClassesToTarget(testPlacement);
                if (positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody)) {
                    isInViewport = true;
                    break;
                }
                // Remove the baseClasses for further calculation
                if (baseClass) {
                    addedClasses.forEach(function (classname) { classList.remove(classname); });
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (placementVals_1_1 && !placementVals_1_1.done && (_a = placementVals_1.return)) _a.call(placementVals_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!isInViewport) {
            // If nothing match, the first placement is the default one
            testPlacement = placementVals[0];
            addClassesToTarget(testPlacement);
            positionService.positionElements(hostElement, targetElement, testPlacement, appendToBody);
        }
        return testPlacement;
    }

    function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
        return new NgbDateISOParserFormatter();
    }
    /**
     * An abstract service for parsing and formatting dates for the
     * [`NgbInputDatepicker`](#/components/datepicker/api#NgbInputDatepicker) directive.
     * Converts between the internal `NgbDateStruct` model presentation and a `string` that is displayed in the
     * input element.
     *
     * When user types something in the input this service attempts to parse it into a `NgbDateStruct` object.
     * And vice versa, when users selects a date in the calendar with the mouse, it must be displayed as a `string`
     * in the input.
     *
     * Default implementation uses the ISO 8601 format, but you can provide another implementation via DI
     * to use an alternative string format or a custom parsing logic.
     *
     * See the [date format overview](#/components/datepicker/overview#date-model) for more details.
     */
    var NgbDateParserFormatter = /** @class */ (function () {
        function NgbDateParserFormatter() {
        }
        return NgbDateParserFormatter;
    }());
    NgbDateParserFormatter.ɵprov = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY, token: NgbDateParserFormatter, providedIn: "root" });
    NgbDateParserFormatter.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY },] }
    ];
    var NgbDateISOParserFormatter = /** @class */ (function (_super) {
        __extends(NgbDateISOParserFormatter, _super);
        function NgbDateISOParserFormatter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NgbDateISOParserFormatter.prototype.parse = function (value) {
            if (value != null) {
                var dateParts = value.trim().split('-');
                if (dateParts.length === 1 && isNumber(dateParts[0])) {
                    return { year: toInteger(dateParts[0]), month: null, day: null };
                }
                else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                    return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: null };
                }
                else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                    return { year: toInteger(dateParts[0]), month: toInteger(dateParts[1]), day: toInteger(dateParts[2]) };
                }
            }
            return null;
        };
        NgbDateISOParserFormatter.prototype.format = function (date) {
            return date ?
                date.year + "-" + (isNumber(date.month) ? padNumber(date.month) : '') + "-" + (isNumber(date.day) ? padNumber(date.day) : '') :
                '';
        };
        return NgbDateISOParserFormatter;
    }(NgbDateParserFormatter));
    NgbDateISOParserFormatter.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * A configuration service for the [`NgbDatepickerInput`](#/components/datepicker/api#NgbDatepicker) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the datepicker inputs used in the application.
     *
     * @since 5.2.0
     */
    var NgbInputDatepickerConfig = /** @class */ (function (_super) {
        __extends(NgbInputDatepickerConfig, _super);
        function NgbInputDatepickerConfig() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.autoClose = true;
            _this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
            _this.restoreFocus = true;
            return _this;
        }
        return NgbInputDatepickerConfig;
    }(NgbDatepickerConfig));
    NgbInputDatepickerConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbInputDatepickerConfig_Factory() { return new NgbInputDatepickerConfig(); }, token: NgbInputDatepickerConfig, providedIn: "root" });
    NgbInputDatepickerConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    /**
     * A directive that allows to stick a datepicker popup to an input field.
     *
     * Manages interaction with the input field itself, does value formatting and provides forms integration.
     */
    var NgbInputDatepicker = /** @class */ (function () {
        function NgbInputDatepicker(_parserFormatter, _elRef, _vcRef, _renderer, _cfr, _ngZone, _calendar, _dateAdapter, _document, _changeDetector, config) {
            var _this = this;
            this._parserFormatter = _parserFormatter;
            this._elRef = _elRef;
            this._vcRef = _vcRef;
            this._renderer = _renderer;
            this._cfr = _cfr;
            this._ngZone = _ngZone;
            this._calendar = _calendar;
            this._dateAdapter = _dateAdapter;
            this._document = _document;
            this._changeDetector = _changeDetector;
            this._cRef = null;
            this._disabled = false;
            this._elWithFocus = null;
            this._model = null;
            /**
             * An event emitted when user selects a date using keyboard or mouse.
             *
             * The payload of the event is currently selected `NgbDate`.
             *
             * @since 1.1.1
             */
            this.dateSelect = new i0.EventEmitter();
            /**
             * Event emitted right after the navigation happens and displayed month changes.
             *
             * See [`NgbDatepickerNavigateEvent`](#/components/datepicker/api#NgbDatepickerNavigateEvent) for the payload info.
             */
            this.navigate = new i0.EventEmitter();
            /**
             * An event fired after closing datepicker window.
             *
             * @since 4.2.0
             */
            this.closed = new i0.EventEmitter();
            this._onChange = function (_) { };
            this._onTouched = function () { };
            this._validatorChange = function () { };
            ['autoClose', 'container', 'positionTarget', 'placement'].forEach(function (input) { return _this[input] = config[input]; });
            this._zoneSubscription = _ngZone.onStable.subscribe(function () { return _this._updatePopupPosition(); });
        }
        Object.defineProperty(NgbInputDatepicker.prototype, "showWeekdays", {
            get: function () { return this._showWeekdays; },
            /**
             * If `true`, weekdays will be displayed.
             *
             * @deprecated 9.1.0, please use 'weekdays' instead
             */
            set: function (weekdays) {
                this.weekdays = weekdays;
                this._showWeekdays = weekdays;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbInputDatepicker.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (value) {
                this._disabled = value === '' || (value && value !== 'false');
                if (this.isOpen()) {
                    this._cRef.instance.setDisabledState(this._disabled);
                }
            },
            enumerable: false,
            configurable: true
        });
        NgbInputDatepicker.prototype.registerOnChange = function (fn) { this._onChange = fn; };
        NgbInputDatepicker.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
        NgbInputDatepicker.prototype.registerOnValidatorChange = function (fn) { this._validatorChange = fn; };
        NgbInputDatepicker.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
        NgbInputDatepicker.prototype.validate = function (c) {
            var value = c.value;
            if (value != null) {
                var ngbDate = this._fromDateStruct(this._dateAdapter.fromModel(value));
                if (!ngbDate) {
                    return { 'ngbDate': { invalid: value } };
                }
                if (this.minDate && ngbDate.before(NgbDate.from(this.minDate))) {
                    return { 'ngbDate': { minDate: { minDate: this.minDate, actual: value } } };
                }
                if (this.maxDate && ngbDate.after(NgbDate.from(this.maxDate))) {
                    return { 'ngbDate': { maxDate: { maxDate: this.maxDate, actual: value } } };
                }
            }
            return null;
        };
        NgbInputDatepicker.prototype.writeValue = function (value) {
            this._model = this._fromDateStruct(this._dateAdapter.fromModel(value));
            this._writeModelValue(this._model);
        };
        NgbInputDatepicker.prototype.manualDateChange = function (value, updateView) {
            if (updateView === void 0) { updateView = false; }
            var inputValueChanged = value !== this._inputValue;
            if (inputValueChanged) {
                this._inputValue = value;
                this._model = this._fromDateStruct(this._parserFormatter.parse(value));
            }
            if (inputValueChanged || !updateView) {
                this._onChange(this._model ? this._dateAdapter.toModel(this._model) : (value === '' ? null : value));
            }
            if (updateView && this._model) {
                this._writeModelValue(this._model);
            }
        };
        NgbInputDatepicker.prototype.isOpen = function () { return !!this._cRef; };
        /**
         * Opens the datepicker popup.
         *
         * If the related form control contains a valid date, the corresponding month will be opened.
         */
        NgbInputDatepicker.prototype.open = function () {
            var _this = this;
            if (!this.isOpen()) {
                var cf = this._cfr.resolveComponentFactory(NgbDatepicker);
                this._cRef = this._vcRef.createComponent(cf);
                this._applyPopupStyling(this._cRef.location.nativeElement);
                this._applyDatepickerInputs(this._cRef.instance);
                this._subscribeForDatepickerOutputs(this._cRef.instance);
                this._cRef.instance.ngOnInit();
                this._cRef.instance.writeValue(this._dateAdapter.toModel(this._model));
                // date selection event handling
                this._cRef.instance.registerOnChange(function (selectedDate) {
                    _this.writeValue(selectedDate);
                    _this._onChange(selectedDate);
                    _this._onTouched();
                });
                this._cRef.changeDetectorRef.detectChanges();
                this._cRef.instance.setDisabledState(this.disabled);
                if (this.container === 'body') {
                    this._document.querySelector(this.container).appendChild(this._cRef.location.nativeElement);
                }
                // focus handling
                this._elWithFocus = this._document.activeElement;
                ngbFocusTrap(this._ngZone, this._cRef.location.nativeElement, this.closed, true);
                this._cRef.instance.focus();
                ngbAutoClose(this._ngZone, this._document, this.autoClose, function () { return _this.close(); }, this.closed, [], [this._elRef.nativeElement, this._cRef.location.nativeElement]);
            }
        };
        /**
         * Closes the datepicker popup.
         */
        NgbInputDatepicker.prototype.close = function () {
            if (this.isOpen()) {
                this._vcRef.remove(this._vcRef.indexOf(this._cRef.hostView));
                this._cRef = null;
                this.closed.emit();
                this._changeDetector.markForCheck();
                // restore focus
                var elementToFocus = this._elWithFocus;
                if (isString(this.restoreFocus)) {
                    elementToFocus = this._document.querySelector(this.restoreFocus);
                }
                else if (this.restoreFocus !== undefined) {
                    elementToFocus = this.restoreFocus;
                }
                // in IE document.activeElement can contain an object without 'focus()' sometimes
                if (elementToFocus && elementToFocus['focus']) {
                    elementToFocus.focus();
                }
                else {
                    this._document.body.focus();
                }
            }
        };
        /**
         * Toggles the datepicker popup.
         */
        NgbInputDatepicker.prototype.toggle = function () {
            if (this.isOpen()) {
                this.close();
            }
            else {
                this.open();
            }
        };
        /**
         * Navigates to the provided date.
         *
         * With the default calendar we use ISO 8601: 'month' is 1=Jan ... 12=Dec.
         * If nothing or invalid date provided calendar will open current month.
         *
         * Use the `[startDate]` input as an alternative.
         */
        NgbInputDatepicker.prototype.navigateTo = function (date) {
            if (this.isOpen()) {
                this._cRef.instance.navigateTo(date);
            }
        };
        NgbInputDatepicker.prototype.onBlur = function () { this._onTouched(); };
        NgbInputDatepicker.prototype.onFocus = function () { this._elWithFocus = this._elRef.nativeElement; };
        NgbInputDatepicker.prototype.ngOnChanges = function (changes) {
            if (changes['minDate'] || changes['maxDate']) {
                this._validatorChange();
                if (this.isOpen()) {
                    if (changes['minDate']) {
                        this._cRef.instance.minDate = this.minDate;
                    }
                    if (changes['maxDate']) {
                        this._cRef.instance.maxDate = this.maxDate;
                    }
                    this._cRef.instance.ngOnChanges(changes);
                }
            }
            if (changes['datepickerClass']) {
                var _b = changes['datepickerClass'], currentValue = _b.currentValue, previousValue = _b.previousValue;
                this._applyPopupClass(currentValue, previousValue);
            }
        };
        NgbInputDatepicker.prototype.ngOnDestroy = function () {
            this.close();
            this._zoneSubscription.unsubscribe();
        };
        NgbInputDatepicker.prototype._applyDatepickerInputs = function (datepickerInstance) {
            var _this = this;
            ['dayTemplate', 'dayTemplateData', 'displayMonths', 'firstDayOfWeek', 'footerTemplate', 'markDisabled', 'minDate',
                'maxDate', 'navigation', 'outsideDays', 'showNavigation', 'showWeekNumbers', 'weekdays']
                .forEach(function (optionName) {
                if (_this[optionName] !== undefined) {
                    datepickerInstance[optionName] = _this[optionName];
                }
            });
            datepickerInstance.startDate = this.startDate || this._model;
        };
        NgbInputDatepicker.prototype._applyPopupClass = function (newClass, oldClass) {
            var _a;
            var popupEl = (_a = this._cRef) === null || _a === void 0 ? void 0 : _a.location.nativeElement;
            if (popupEl) {
                if (newClass) {
                    this._renderer.addClass(popupEl, newClass);
                }
                if (oldClass) {
                    this._renderer.removeClass(popupEl, oldClass);
                }
            }
        };
        NgbInputDatepicker.prototype._applyPopupStyling = function (nativeElement) {
            this._renderer.addClass(nativeElement, 'dropdown-menu');
            this._renderer.addClass(nativeElement, 'show');
            if (this.container === 'body') {
                this._renderer.addClass(nativeElement, 'ngb-dp-body');
            }
            this._applyPopupClass(this.datepickerClass);
        };
        NgbInputDatepicker.prototype._subscribeForDatepickerOutputs = function (datepickerInstance) {
            var _this = this;
            datepickerInstance.navigate.subscribe(function (navigateEvent) { return _this.navigate.emit(navigateEvent); });
            datepickerInstance.dateSelect.subscribe(function (date) {
                _this.dateSelect.emit(date);
                if (_this.autoClose === true || _this.autoClose === 'inside') {
                    _this.close();
                }
            });
        };
        NgbInputDatepicker.prototype._writeModelValue = function (model) {
            var value = this._parserFormatter.format(model);
            this._inputValue = value;
            this._renderer.setProperty(this._elRef.nativeElement, 'value', value);
            if (this.isOpen()) {
                this._cRef.instance.writeValue(this._dateAdapter.toModel(model));
                this._onTouched();
            }
        };
        NgbInputDatepicker.prototype._fromDateStruct = function (date) {
            var ngbDate = date ? new NgbDate(date.year, date.month, date.day) : null;
            return this._calendar.isValid(ngbDate) ? ngbDate : null;
        };
        NgbInputDatepicker.prototype._updatePopupPosition = function () {
            if (!this._cRef) {
                return;
            }
            var hostElement;
            if (isString(this.positionTarget)) {
                hostElement = this._document.querySelector(this.positionTarget);
            }
            else if (this.positionTarget instanceof HTMLElement) {
                hostElement = this.positionTarget;
            }
            else {
                hostElement = this._elRef.nativeElement;
            }
            if (this.positionTarget && !hostElement) {
                throw new Error('ngbDatepicker could not find element declared in [positionTarget] to position against.');
            }
            positionElements(hostElement, this._cRef.location.nativeElement, this.placement, this.container === 'body');
        };
        return NgbInputDatepicker;
    }());
    NgbInputDatepicker.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input[ngbDatepicker]',
                    exportAs: 'ngbDatepicker',
                    host: {
                        '(input)': 'manualDateChange($event.target.value)',
                        '(change)': 'manualDateChange($event.target.value, true)',
                        '(focus)': 'onFocus()',
                        '(blur)': 'onBlur()',
                        '[disabled]': 'disabled'
                    },
                    providers: [
                        { provide: forms.NG_VALUE_ACCESSOR, useExisting: i0.forwardRef(function () { return NgbInputDatepicker; }), multi: true },
                        { provide: forms.NG_VALIDATORS, useExisting: i0.forwardRef(function () { return NgbInputDatepicker; }), multi: true },
                        { provide: NgbDatepickerConfig, useExisting: NgbInputDatepickerConfig }
                    ],
                },] }
    ];
    NgbInputDatepicker.ctorParameters = function () { return [
        { type: NgbDateParserFormatter },
        { type: i0.ElementRef },
        { type: i0.ViewContainerRef },
        { type: i0.Renderer2 },
        { type: i0.ComponentFactoryResolver },
        { type: i0.NgZone },
        { type: NgbCalendar },
        { type: NgbDateAdapter },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: i0.ChangeDetectorRef },
        { type: NgbInputDatepickerConfig }
    ]; };
    NgbInputDatepicker.propDecorators = {
        autoClose: [{ type: i0.Input }],
        datepickerClass: [{ type: i0.Input }],
        dayTemplate: [{ type: i0.Input }],
        dayTemplateData: [{ type: i0.Input }],
        displayMonths: [{ type: i0.Input }],
        firstDayOfWeek: [{ type: i0.Input }],
        footerTemplate: [{ type: i0.Input }],
        markDisabled: [{ type: i0.Input }],
        minDate: [{ type: i0.Input }],
        maxDate: [{ type: i0.Input }],
        navigation: [{ type: i0.Input }],
        outsideDays: [{ type: i0.Input }],
        placement: [{ type: i0.Input }],
        restoreFocus: [{ type: i0.Input }],
        showWeekdays: [{ type: i0.Input }],
        showWeekNumbers: [{ type: i0.Input }],
        startDate: [{ type: i0.Input }],
        container: [{ type: i0.Input }],
        positionTarget: [{ type: i0.Input }],
        weekdays: [{ type: i0.Input }],
        dateSelect: [{ type: i0.Output }],
        navigate: [{ type: i0.Output }],
        closed: [{ type: i0.Output }],
        disabled: [{ type: i0.Input }]
    };

    var NgbDatepickerDayView = /** @class */ (function () {
        function NgbDatepickerDayView(i18n) {
            this.i18n = i18n;
        }
        NgbDatepickerDayView.prototype.isMuted = function () { return !this.selected && (this.date.month !== this.currentMonth || this.disabled); };
        return NgbDatepickerDayView;
    }());
    NgbDatepickerDayView.decorators = [
        { type: i0.Component, args: [{
                    selector: '[ngbDatepickerDayView]',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    host: {
                        'class': 'btn-light',
                        '[class.bg-primary]': 'selected',
                        '[class.text-white]': 'selected',
                        '[class.text-muted]': 'isMuted()',
                        '[class.outside]': 'isMuted()',
                        '[class.active]': 'focused'
                    },
                    template: "{{ i18n.getDayNumerals(date) }}",
                    styles: ["[ngbDatepickerDayView]{background:transparent;border-radius:.25rem;height:2rem;line-height:2rem;text-align:center;width:2rem}[ngbDatepickerDayView].outside{opacity:.5}"]
                },] }
    ];
    NgbDatepickerDayView.ctorParameters = function () { return [
        { type: NgbDatepickerI18n }
    ]; };
    NgbDatepickerDayView.propDecorators = {
        currentMonth: [{ type: i0.Input }],
        date: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        focused: [{ type: i0.Input }],
        selected: [{ type: i0.Input }]
    };

    var NgbDatepickerNavigationSelect = /** @class */ (function () {
        function NgbDatepickerNavigationSelect(i18n, _renderer) {
            this.i18n = i18n;
            this._renderer = _renderer;
            this.select = new i0.EventEmitter();
            this._month = -1;
            this._year = -1;
        }
        NgbDatepickerNavigationSelect.prototype.changeMonth = function (month) { this.select.emit(new NgbDate(this.date.year, toInteger(month), 1)); };
        NgbDatepickerNavigationSelect.prototype.changeYear = function (year) { this.select.emit(new NgbDate(toInteger(year), this.date.month, 1)); };
        NgbDatepickerNavigationSelect.prototype.ngAfterViewChecked = function () {
            if (this.date) {
                if (this.date.month !== this._month) {
                    this._month = this.date.month;
                    this._renderer.setProperty(this.monthSelect.nativeElement, 'value', this._month);
                }
                if (this.date.year !== this._year) {
                    this._year = this.date.year;
                    this._renderer.setProperty(this.yearSelect.nativeElement, 'value', this._year);
                }
            }
        };
        return NgbDatepickerNavigationSelect;
    }());
    NgbDatepickerNavigationSelect.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-datepicker-navigation-select',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <select #month\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      i18n-aria-label=\"@@ngb.datepicker.select-month\" aria-label=\"Select month\"\n      i18n-title=\"@@ngb.datepicker.select-month\" title=\"Select month\"\n      (change)=\"changeMonth($any($event).target.value)\">\n        <option *ngFor=\"let m of months\" [attr.aria-label]=\"i18n.getMonthFullName(m, date?.year)\"\n                [value]=\"m\">{{ i18n.getMonthShortName(m, date?.year) }}</option>\n    </select><select #year\n      [disabled]=\"disabled\"\n      class=\"custom-select\"\n      i18n-aria-label=\"@@ngb.datepicker.select-year\" aria-label=\"Select year\"\n      i18n-title=\"@@ngb.datepicker.select-year\" title=\"Select year\"\n      (change)=\"changeYear($any($event).target.value)\">\n        <option *ngFor=\"let y of years\" [value]=\"y\">{{ i18n.getYearNumerals(y) }}</option>\n    </select>\n  ",
                    styles: ["ngb-datepicker-navigation-select>.custom-select{flex:1 1 auto;font-size:.875rem;height:1.85rem;padding:0 .5rem}ngb-datepicker-navigation-select>.custom-select:focus{z-index:1}ngb-datepicker-navigation-select>.custom-select::-ms-value{background-color:transparent!important}"]
                },] }
    ];
    NgbDatepickerNavigationSelect.ctorParameters = function () { return [
        { type: NgbDatepickerI18n },
        { type: i0.Renderer2 }
    ]; };
    NgbDatepickerNavigationSelect.propDecorators = {
        date: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        months: [{ type: i0.Input }],
        years: [{ type: i0.Input }],
        select: [{ type: i0.Output }],
        monthSelect: [{ type: i0.ViewChild, args: ['month', { static: true, read: i0.ElementRef },] }],
        yearSelect: [{ type: i0.ViewChild, args: ['year', { static: true, read: i0.ElementRef },] }]
    };

    var NgbCalendarHijri = /** @class */ (function (_super) {
        __extends(NgbCalendarHijri, _super);
        function NgbCalendarHijri() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NgbCalendarHijri.prototype.getDaysPerWeek = function () { return 7; };
        NgbCalendarHijri.prototype.getMonths = function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
        NgbCalendarHijri.prototype.getWeeksPerMonth = function () { return 6; };
        NgbCalendarHijri.prototype.getNext = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            date = new NgbDate(date.year, date.month, date.day);
            switch (period) {
                case 'y':
                    date = this._setYear(date, date.year + number);
                    date.month = 1;
                    date.day = 1;
                    return date;
                case 'm':
                    date = this._setMonth(date, date.month + number);
                    date.day = 1;
                    return date;
                case 'd':
                    return this._setDay(date, date.day + number);
                default:
                    return date;
            }
        };
        NgbCalendarHijri.prototype.getPrev = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            return this.getNext(date, period, -number);
        };
        NgbCalendarHijri.prototype.getWeekday = function (date) {
            var day = this.toGregorian(date).getDay();
            // in JS Date Sun=0, in ISO 8601 Sun=7
            return day === 0 ? 7 : day;
        };
        NgbCalendarHijri.prototype.getWeekNumber = function (week, firstDayOfWeek) {
            // in JS Date Sun=0, in ISO 8601 Sun=7
            if (firstDayOfWeek === 7) {
                firstDayOfWeek = 0;
            }
            var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
            var date = week[thursdayIndex];
            var jsDate = this.toGregorian(date);
            jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
            var time = jsDate.getTime();
            var MuhDate = this.toGregorian(new NgbDate(date.year, 1, 1)); // Compare with Muharram 1
            return Math.floor(Math.round((time - MuhDate.getTime()) / 86400000) / 7) + 1;
        };
        NgbCalendarHijri.prototype.getToday = function () { return this.fromGregorian(new Date()); };
        NgbCalendarHijri.prototype.isValid = function (date) {
            return date != null && isNumber(date.year) && isNumber(date.month) && isNumber(date.day) &&
                !isNaN(this.toGregorian(date).getTime());
        };
        NgbCalendarHijri.prototype._setDay = function (date, day) {
            day = +day;
            var mDays = this.getDaysPerMonth(date.month, date.year);
            if (day <= 0) {
                while (day <= 0) {
                    date = this._setMonth(date, date.month - 1);
                    mDays = this.getDaysPerMonth(date.month, date.year);
                    day += mDays;
                }
            }
            else if (day > mDays) {
                while (day > mDays) {
                    day -= mDays;
                    date = this._setMonth(date, date.month + 1);
                    mDays = this.getDaysPerMonth(date.month, date.year);
                }
            }
            date.day = day;
            return date;
        };
        NgbCalendarHijri.prototype._setMonth = function (date, month) {
            month = +month;
            date.year = date.year + Math.floor((month - 1) / 12);
            date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
            return date;
        };
        NgbCalendarHijri.prototype._setYear = function (date, year) {
            date.year = +year;
            return date;
        };
        return NgbCalendarHijri;
    }(NgbCalendar));
    NgbCalendarHijri.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * Checks if islamic year is a leap year
     */
    function isIslamicLeapYear(hYear) {
        return (14 + 11 * hYear) % 30 < 11;
    }
    /**
     * Checks if gregorian years is a leap year
     */
    function isGregorianLeapYear(gDate) {
        var year = gDate.getFullYear();
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    /**
     * Returns the start of Hijri Month.
     * `hMonth` is 0 for Muharram, 1 for Safar, etc.
     * `hYear` is any Hijri hYear.
     */
    function getIslamicMonthStart(hYear, hMonth) {
        return Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30.0);
    }
    /**
     * Returns the start of Hijri year.
     * `year` is any Hijri year.
     */
    function getIslamicYearStart(year) {
        return (year - 1) * 354 + Math.floor((3 + 11 * year) / 30.0);
    }
    function mod(a, b) {
        return a - b * Math.floor(a / b);
    }
    /**
     * The civil calendar is one type of Hijri calendars used in islamic countries.
     * Uses a fixed cycle of alternating 29- and 30-day months,
     * with a leap day added to the last month of 11 out of every 30 years.
     * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
     * All the calculations here are based on the equations from "Calendrical Calculations" By Edward M. Reingold, Nachum
     * Dershowitz.
     */
    var GREGORIAN_EPOCH = 1721425.5;
    var ISLAMIC_EPOCH = 1948439.5;
    var NgbCalendarIslamicCivil = /** @class */ (function (_super) {
        __extends(NgbCalendarIslamicCivil, _super);
        function NgbCalendarIslamicCivil() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Returns the equivalent islamic(civil) date value for a give input Gregorian date.
         * `gDate` is a JS Date to be converted to Hijri.
         */
        NgbCalendarIslamicCivil.prototype.fromGregorian = function (gDate) {
            var gYear = gDate.getFullYear(), gMonth = gDate.getMonth(), gDay = gDate.getDate();
            var julianDay = GREGORIAN_EPOCH - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) +
                -Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
                Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear(gDate) ? -1 : -2) + gDay);
            julianDay = Math.floor(julianDay) + 0.5;
            var days = julianDay - ISLAMIC_EPOCH;
            var hYear = Math.floor((30 * days + 10646) / 10631.0);
            var hMonth = Math.ceil((days - 29 - getIslamicYearStart(hYear)) / 29.5);
            hMonth = Math.min(hMonth, 11);
            var hDay = Math.ceil(days - getIslamicMonthStart(hYear, hMonth)) + 1;
            return new NgbDate(hYear, hMonth + 1, hDay);
        };
        /**
         * Returns the equivalent JS date value for a give input islamic(civil) date.
         * `hDate` is an islamic(civil) date to be converted to Gregorian.
         */
        NgbCalendarIslamicCivil.prototype.toGregorian = function (hDate) {
            var hYear = hDate.year;
            var hMonth = hDate.month - 1;
            var hDay = hDate.day;
            var julianDay = hDay + Math.ceil(29.5 * hMonth) + (hYear - 1) * 354 + Math.floor((3 + 11 * hYear) / 30) + ISLAMIC_EPOCH - 1;
            var wjd = Math.floor(julianDay - 0.5) + 0.5, depoch = wjd - GREGORIAN_EPOCH, quadricent = Math.floor(depoch / 146097), dqc = mod(depoch, 146097), cent = Math.floor(dqc / 36524), dcent = mod(dqc, 36524), quad = Math.floor(dcent / 1461), dquad = mod(dcent, 1461), yindex = Math.floor(dquad / 365);
            var year = quadricent * 400 + cent * 100 + quad * 4 + yindex;
            if (!(cent === 4 || yindex === 4)) {
                year++;
            }
            var gYearStart = GREGORIAN_EPOCH + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
                Math.floor((year - 1) / 400);
            var yearday = wjd - gYearStart;
            var tjd = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
                Math.floor((year - 1) / 400) + Math.floor(739 / 12 + (isGregorianLeapYear(new Date(year, 3, 1)) ? -1 : -2) + 1);
            var leapadj = wjd < tjd ? 0 : isGregorianLeapYear(new Date(year, 3, 1)) ? 1 : 2;
            var month = Math.floor(((yearday + leapadj) * 12 + 373) / 367);
            var tjd2 = GREGORIAN_EPOCH - 1 + 365 * (year - 1) + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) +
                Math.floor((year - 1) / 400) +
                Math.floor((367 * month - 362) / 12 + (month <= 2 ? 0 : isGregorianLeapYear(new Date(year, month - 1, 1)) ? -1 : -2) +
                    1);
            var day = wjd - tjd2 + 1;
            return new Date(year, month - 1, day);
        };
        /**
         * Returns the number of days in a specific Hijri month.
         * `month` is 1 for Muharram, 2 for Safar, etc.
         * `year` is any Hijri year.
         */
        NgbCalendarIslamicCivil.prototype.getDaysPerMonth = function (month, year) {
            year = year + Math.floor(month / 13);
            month = ((month - 1) % 12) + 1;
            var length = 29 + month % 2;
            if (month === 12 && isIslamicLeapYear(year)) {
                length++;
            }
            return length;
        };
        return NgbCalendarIslamicCivil;
    }(NgbCalendarHijri));
    NgbCalendarIslamicCivil.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * Umalqura calendar is one type of Hijri calendars used in islamic countries.
     * This Calendar is used by Saudi Arabia for administrative purpose.
     * Unlike tabular calendars, the algorithm involves astronomical calculation, but it's still deterministic.
     * http://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types
     */
    var GREGORIAN_FIRST_DATE = new Date(1882, 10, 12);
    var GREGORIAN_LAST_DATE = new Date(2174, 10, 25);
    var HIJRI_BEGIN = 1300;
    var HIJRI_END = 1600;
    var ONE_DAY = 1000 * 60 * 60 * 24;
    var MONTH_LENGTH = [
        // 1300-1304
        '101010101010', '110101010100', '111011001001', '011011010100', '011011101010',
        // 1305-1309
        '001101101100', '101010101101', '010101010101', '011010101001', '011110010010',
        // 1310-1314
        '101110101001', '010111010100', '101011011010', '010101011100', '110100101101',
        // 1315-1319
        '011010010101', '011101001010', '101101010100', '101101101010', '010110101101',
        // 1320-1324
        '010010101110', '101001001111', '010100010111', '011010001011', '011010100101',
        // 1325-1329
        '101011010101', '001011010110', '100101011011', '010010011101', '101001001101',
        // 1330-1334
        '110100100110', '110110010101', '010110101100', '100110110110', '001010111010',
        // 1335-1339
        '101001011011', '010100101011', '101010010101', '011011001010', '101011101001',
        // 1340-1344
        '001011110100', '100101110110', '001010110110', '100101010110', '101011001010',
        // 1345-1349
        '101110100100', '101111010010', '010111011001', '001011011100', '100101101101',
        // 1350-1354
        '010101001101', '101010100101', '101101010010', '101110100101', '010110110100',
        // 1355-1359
        '100110110110', '010101010111', '001010010111', '010101001011', '011010100011',
        // 1360-1364
        '011101010010', '101101100101', '010101101010', '101010101011', '010100101011',
        // 1365-1369
        '110010010101', '110101001010', '110110100101', '010111001010', '101011010110',
        // 1370-1374
        '100101010111', '010010101011', '100101001011', '101010100101', '101101010010',
        // 1375-1379
        '101101101010', '010101110101', '001001110110', '100010110111', '010001011011',
        // 1380-1384
        '010101010101', '010110101001', '010110110100', '100111011010', '010011011101',
        // 1385-1389
        '001001101110', '100100110110', '101010101010', '110101010100', '110110110010',
        // 1390-1394
        '010111010101', '001011011010', '100101011011', '010010101011', '101001010101',
        // 1395-1399
        '101101001001', '101101100100', '101101110001', '010110110100', '101010110101',
        // 1400-1404
        '101001010101', '110100100101', '111010010010', '111011001001', '011011010100',
        // 1405-1409
        '101011101001', '100101101011', '010010101011', '101010010011', '110101001001',
        // 1410-1414
        '110110100100', '110110110010', '101010111001', '010010111010', '101001011011',
        // 1415-1419
        '010100101011', '101010010101', '101100101010', '101101010101', '010101011100',
        // 1420-1424
        '010010111101', '001000111101', '100100011101', '101010010101', '101101001010',
        // 1425-1429
        '101101011010', '010101101101', '001010110110', '100100111011', '010010011011',
        // 1430-1434
        '011001010101', '011010101001', '011101010100', '101101101010', '010101101100',
        // 1435-1439
        '101010101101', '010101010101', '101100101001', '101110010010', '101110101001',
        // 1440-1444
        '010111010100', '101011011010', '010101011010', '101010101011', '010110010101',
        // 1445-1449
        '011101001001', '011101100100', '101110101010', '010110110101', '001010110110',
        // 1450-1454
        '101001010110', '111001001101', '101100100101', '101101010010', '101101101010',
        // 1455-1459
        '010110101101', '001010101110', '100100101111', '010010010111', '011001001011',
        // 1460-1464
        '011010100101', '011010101100', '101011010110', '010101011101', '010010011101',
        // 1465-1469
        '101001001101', '110100010110', '110110010101', '010110101010', '010110110101',
        // 1470-1474
        '001011011010', '100101011011', '010010101101', '010110010101', '011011001010',
        // 1475-1479
        '011011100100', '101011101010', '010011110101', '001010110110', '100101010110',
        // 1480-1484
        '101010101010', '101101010100', '101111010010', '010111011001', '001011101010',
        // 1485-1489
        '100101101101', '010010101101', '101010010101', '101101001010', '101110100101',
        // 1490-1494
        '010110110010', '100110110101', '010011010110', '101010010111', '010101000111',
        // 1495-1499
        '011010010011', '011101001001', '101101010101', '010101101010', '101001101011',
        // 1500-1504
        '010100101011', '101010001011', '110101000110', '110110100011', '010111001010',
        // 1505-1509
        '101011010110', '010011011011', '001001101011', '100101001011', '101010100101',
        // 1510-1514
        '101101010010', '101101101001', '010101110101', '000101110110', '100010110111',
        // 1515-1519
        '001001011011', '010100101011', '010101100101', '010110110100', '100111011010',
        // 1520-1524
        '010011101101', '000101101101', '100010110110', '101010100110', '110101010010',
        // 1525-1529
        '110110101001', '010111010100', '101011011010', '100101011011', '010010101011',
        // 1530-1534
        '011001010011', '011100101001', '011101100010', '101110101001', '010110110010',
        // 1535-1539
        '101010110101', '010101010101', '101100100101', '110110010010', '111011001001',
        // 1540-1544
        '011011010010', '101011101001', '010101101011', '010010101011', '101001010101',
        // 1545-1549
        '110100101001', '110101010100', '110110101010', '100110110101', '010010111010',
        // 1550-1554
        '101000111011', '010010011011', '101001001101', '101010101010', '101011010101',
        // 1555-1559
        '001011011010', '100101011101', '010001011110', '101000101110', '110010011010',
        // 1560-1564
        '110101010101', '011010110010', '011010111001', '010010111010', '101001011101',
        // 1565-1569
        '010100101101', '101010010101', '101101010010', '101110101000', '101110110100',
        // 1570-1574
        '010110111001', '001011011010', '100101011010', '101101001010', '110110100100',
        // 1575-1579
        '111011010001', '011011101000', '101101101010', '010101101101', '010100110101',
        // 1580-1584
        '011010010101', '110101001010', '110110101000', '110111010100', '011011011010',
        // 1585-1589
        '010101011011', '001010011101', '011000101011', '101100010101', '101101001010',
        // 1590-1594
        '101110010101', '010110101010', '101010101110', '100100101110', '110010001111',
        // 1595-1599
        '010100100111', '011010010101', '011010101010', '101011010110', '010101011101',
        // 1600
        '001010011101'
    ];
    function getDaysDiff(date1, date2) {
        // Ignores the time part in date1 and date2:
        var time1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        var time2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        var diff = Math.abs(time1 - time2);
        return Math.round(diff / ONE_DAY);
    }
    var NgbCalendarIslamicUmalqura = /** @class */ (function (_super) {
        __extends(NgbCalendarIslamicUmalqura, _super);
        function NgbCalendarIslamicUmalqura() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
        * Returns the equivalent islamic(Umalqura) date value for a give input Gregorian date.
        * `gdate` is s JS Date to be converted to Hijri.
        */
        NgbCalendarIslamicUmalqura.prototype.fromGregorian = function (gDate) {
            var hDay = 1, hMonth = 0, hYear = 1300;
            var daysDiff = getDaysDiff(gDate, GREGORIAN_FIRST_DATE);
            if (gDate.getTime() - GREGORIAN_FIRST_DATE.getTime() >= 0 && gDate.getTime() - GREGORIAN_LAST_DATE.getTime() <= 0) {
                var year = 1300;
                for (var i = 0; i < MONTH_LENGTH.length; i++, year++) {
                    for (var j = 0; j < 12; j++) {
                        var numOfDays = +MONTH_LENGTH[i][j] + 29;
                        if (daysDiff <= numOfDays) {
                            hDay = daysDiff + 1;
                            if (hDay > numOfDays) {
                                hDay = 1;
                                j++;
                            }
                            if (j > 11) {
                                j = 0;
                                year++;
                            }
                            hMonth = j;
                            hYear = year;
                            return new NgbDate(hYear, hMonth + 1, hDay);
                        }
                        daysDiff = daysDiff - numOfDays;
                    }
                }
                return null;
            }
            else {
                return _super.prototype.fromGregorian.call(this, gDate);
            }
        };
        /**
        * Converts the current Hijri date to Gregorian.
        */
        NgbCalendarIslamicUmalqura.prototype.toGregorian = function (hDate) {
            var hYear = hDate.year;
            var hMonth = hDate.month - 1;
            var hDay = hDate.day;
            var gDate = new Date(GREGORIAN_FIRST_DATE);
            var dayDiff = hDay - 1;
            if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
                for (var y = 0; y < hYear - HIJRI_BEGIN; y++) {
                    for (var m = 0; m < 12; m++) {
                        dayDiff += +MONTH_LENGTH[y][m] + 29;
                    }
                }
                for (var m = 0; m < hMonth; m++) {
                    dayDiff += +MONTH_LENGTH[hYear - HIJRI_BEGIN][m] + 29;
                }
                gDate.setDate(GREGORIAN_FIRST_DATE.getDate() + dayDiff);
            }
            else {
                gDate = _super.prototype.toGregorian.call(this, hDate);
            }
            return gDate;
        };
        /**
        * Returns the number of days in a specific Hijri hMonth.
        * `hMonth` is 1 for Muharram, 2 for Safar, etc.
        * `hYear` is any Hijri hYear.
        */
        NgbCalendarIslamicUmalqura.prototype.getDaysPerMonth = function (hMonth, hYear) {
            if (hYear >= HIJRI_BEGIN && hYear <= HIJRI_END) {
                var pos = hYear - HIJRI_BEGIN;
                return +MONTH_LENGTH[pos][hMonth - 1] + 29;
            }
            return _super.prototype.getDaysPerMonth.call(this, hMonth, hYear);
        };
        return NgbCalendarIslamicUmalqura;
    }(NgbCalendarIslamicCivil));
    NgbCalendarIslamicUmalqura.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * Returns the equivalent JS date value for a give input Jalali date.
     * `jalaliDate` is an Jalali date to be converted to Gregorian.
     */
    function toGregorian(jalaliDate) {
        var jdn = jalaliToJulian(jalaliDate.year, jalaliDate.month, jalaliDate.day);
        var date = julianToGregorian(jdn);
        date.setHours(6, 30, 3, 200);
        return date;
    }
    /**
     * Returns the equivalent jalali date value for a give input Gregorian date.
     * `gdate` is a JS Date to be converted to jalali.
     * utc to local
     */
    function fromGregorian(gdate) {
        var g2d = gregorianToJulian(gdate.getFullYear(), gdate.getMonth() + 1, gdate.getDate());
        return julianToJalali(g2d);
    }
    function setJalaliYear(date, yearValue) {
        date.year = +yearValue;
        return date;
    }
    function setJalaliMonth(date, month) {
        month = +month;
        date.year = date.year + Math.floor((month - 1) / 12);
        date.month = Math.floor(((month - 1) % 12 + 12) % 12) + 1;
        return date;
    }
    function setJalaliDay(date, day) {
        var mDays = getDaysPerMonth(date.month, date.year);
        if (day <= 0) {
            while (day <= 0) {
                date = setJalaliMonth(date, date.month - 1);
                mDays = getDaysPerMonth(date.month, date.year);
                day += mDays;
            }
        }
        else if (day > mDays) {
            while (day > mDays) {
                day -= mDays;
                date = setJalaliMonth(date, date.month + 1);
                mDays = getDaysPerMonth(date.month, date.year);
            }
        }
        date.day = day;
        return date;
    }
    function mod$1(a, b) {
        return a - b * Math.floor(a / b);
    }
    function div(a, b) {
        return Math.trunc(a / b);
    }
    /*
     This function determines if the Jalali (Persian) year is
     leap (366-day long) or is the common year (365 days), and
     finds the day in March (Gregorian calendar) of the first
     day of the Jalali year (jalaliYear).
     @param jalaliYear Jalali calendar year (-61 to 3177)
     @return
     leap: number of years since the last leap year (0 to 4)
     gYear: Gregorian year of the beginning of Jalali year
     march: the March day of Farvardin the 1st (1st day of jalaliYear)
     @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
     @see: http://www.fourmilab.ch/documents/calendar/
     */
    function jalCal(jalaliYear) {
        // Jalali years starting the 33-year rule.
        var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
        var breaksLength = breaks.length;
        var gYear = jalaliYear + 621;
        var leapJ = -14;
        var jp = breaks[0];
        if (jalaliYear < jp || jalaliYear >= breaks[breaksLength - 1]) {
            throw new Error('Invalid Jalali year ' + jalaliYear);
        }
        // Find the limiting years for the Jalali year jalaliYear.
        var jump;
        for (var i = 1; i < breaksLength; i += 1) {
            var jm = breaks[i];
            jump = jm - jp;
            if (jalaliYear < jm) {
                break;
            }
            leapJ = leapJ + div(jump, 33) * 8 + div(mod$1(jump, 33), 4);
            jp = jm;
        }
        var n = jalaliYear - jp;
        // Find the number of leap years from AD 621 to the beginning
        // of the current Jalali year in the Persian calendar.
        leapJ = leapJ + div(n, 33) * 8 + div(mod$1(n, 33) + 3, 4);
        if (mod$1(jump, 33) === 4 && jump - n === 4) {
            leapJ += 1;
        }
        // And the same in the Gregorian calendar (until the year gYear).
        var leapG = div(gYear, 4) - div((div(gYear, 100) + 1) * 3, 4) - 150;
        // Determine the Gregorian date of Farvardin the 1st.
        var march = 20 + leapJ - leapG;
        // Find how many years have passed since the last leap year.
        if (jump - n < 6) {
            n = n - jump + div(jump + 4, 33) * 33;
        }
        var leap = mod$1(mod$1(n + 1, 33) - 1, 4);
        if (leap === -1) {
            leap = 4;
        }
        return { leap: leap, gy: gYear, march: march };
    }
    /*
     Calculates Gregorian and Julian calendar dates from the Julian Day number
     (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
     calendars) to some millions years ahead of the present.
     @param jdn Julian Day number
     @return
     gYear: Calendar year (years BC numbered 0, -1, -2, ...)
     gMonth: Calendar month (1 to 12)
     gDay: Calendar day of the month M (1 to 28/29/30/31)
     */
    function julianToGregorian(julianDayNumber) {
        var j = 4 * julianDayNumber + 139361631;
        j = j + div(div(4 * julianDayNumber + 183187720, 146097) * 3, 4) * 4 - 3908;
        var i = div(mod$1(j, 1461), 4) * 5 + 308;
        var gDay = div(mod$1(i, 153), 5) + 1;
        var gMonth = mod$1(div(i, 153), 12) + 1;
        var gYear = div(j, 1461) - 100100 + div(8 - gMonth, 6);
        return new Date(gYear, gMonth - 1, gDay);
    }
    /*
     Converts a date of the Jalali calendar to the Julian Day number.
     @param jy Jalali year (1 to 3100)
     @param jm Jalali month (1 to 12)
     @param jd Jalali day (1 to 29/31)
     @return Julian Day number
     */
    function gregorianToJulian(gy, gm, gd) {
        var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) + div(153 * mod$1(gm + 9, 12) + 2, 5) + gd - 34840408;
        d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
        return d;
    }
    /*
     Converts the Julian Day number to a date in the Jalali calendar.
     @param julianDayNumber Julian Day number
     @return
     jalaliYear: Jalali year (1 to 3100)
     jalaliMonth: Jalali month (1 to 12)
     jalaliDay: Jalali day (1 to 29/31)
     */
    function julianToJalali(julianDayNumber) {
        var gy = julianToGregorian(julianDayNumber).getFullYear() // Calculate Gregorian year (gy).
        , jalaliYear = gy - 621, r = jalCal(jalaliYear), gregorianDay = gregorianToJulian(gy, 3, r.march), jalaliDay, jalaliMonth, numberOfDays;
        // Find number of days that passed since 1 Farvardin.
        numberOfDays = julianDayNumber - gregorianDay;
        if (numberOfDays >= 0) {
            if (numberOfDays <= 185) {
                // The first 6 months.
                jalaliMonth = 1 + div(numberOfDays, 31);
                jalaliDay = mod$1(numberOfDays, 31) + 1;
                return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
            }
            else {
                // The remaining months.
                numberOfDays -= 186;
            }
        }
        else {
            // Previous Jalali year.
            jalaliYear -= 1;
            numberOfDays += 179;
            if (r.leap === 1) {
                numberOfDays += 1;
            }
        }
        jalaliMonth = 7 + div(numberOfDays, 30);
        jalaliDay = mod$1(numberOfDays, 30) + 1;
        return new NgbDate(jalaliYear, jalaliMonth, jalaliDay);
    }
    /*
     Converts a date of the Jalali calendar to the Julian Day number.
     @param jYear Jalali year (1 to 3100)
     @param jMonth Jalali month (1 to 12)
     @param jDay Jalali day (1 to 29/31)
     @return Julian Day number
     */
    function jalaliToJulian(jYear, jMonth, jDay) {
        var r = jalCal(jYear);
        return gregorianToJulian(r.gy, 3, r.march) + (jMonth - 1) * 31 - div(jMonth, 7) * (jMonth - 7) + jDay - 1;
    }
    /**
     * Returns the number of days in a specific jalali month.
     */
    function getDaysPerMonth(month, year) {
        if (month <= 6) {
            return 31;
        }
        if (month <= 11) {
            return 30;
        }
        if (jalCal(year).leap === 0) {
            return 30;
        }
        return 29;
    }

    var NgbCalendarPersian = /** @class */ (function (_super) {
        __extends(NgbCalendarPersian, _super);
        function NgbCalendarPersian() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NgbCalendarPersian.prototype.getDaysPerWeek = function () { return 7; };
        NgbCalendarPersian.prototype.getMonths = function () { return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; };
        NgbCalendarPersian.prototype.getWeeksPerMonth = function () { return 6; };
        NgbCalendarPersian.prototype.getNext = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            date = new NgbDate(date.year, date.month, date.day);
            switch (period) {
                case 'y':
                    date = setJalaliYear(date, date.year + number);
                    date.month = 1;
                    date.day = 1;
                    return date;
                case 'm':
                    date = setJalaliMonth(date, date.month + number);
                    date.day = 1;
                    return date;
                case 'd':
                    return setJalaliDay(date, date.day + number);
                default:
                    return date;
            }
        };
        NgbCalendarPersian.prototype.getPrev = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            return this.getNext(date, period, -number);
        };
        NgbCalendarPersian.prototype.getWeekday = function (date) {
            var day = toGregorian(date).getDay();
            // in JS Date Sun=0, in ISO 8601 Sun=7
            return day === 0 ? 7 : day;
        };
        NgbCalendarPersian.prototype.getWeekNumber = function (week, firstDayOfWeek) {
            // in JS Date Sun=0, in ISO 8601 Sun=7
            if (firstDayOfWeek === 7) {
                firstDayOfWeek = 0;
            }
            var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
            var date = week[thursdayIndex];
            var jsDate = toGregorian(date);
            jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
            var time = jsDate.getTime();
            var startDate = toGregorian(new NgbDate(date.year, 1, 1));
            return Math.floor(Math.round((time - startDate.getTime()) / 86400000) / 7) + 1;
        };
        NgbCalendarPersian.prototype.getToday = function () { return fromGregorian(new Date()); };
        NgbCalendarPersian.prototype.isValid = function (date) {
            return date != null && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) &&
                !isNaN(toGregorian(date).getTime());
        };
        return NgbCalendarPersian;
    }(NgbCalendar));
    NgbCalendarPersian.decorators = [
        { type: i0.Injectable }
    ];

    var PARTS_PER_HOUR = 1080;
    var PARTS_PER_DAY = 24 * PARTS_PER_HOUR;
    var PARTS_FRACTIONAL_MONTH = 12 * PARTS_PER_HOUR + 793;
    var PARTS_PER_MONTH = 29 * PARTS_PER_DAY + PARTS_FRACTIONAL_MONTH;
    var BAHARAD = 11 * PARTS_PER_HOUR + 204;
    var HEBREW_DAY_ON_JAN_1_1970 = 2092591;
    var GREGORIAN_EPOCH$1 = 1721425.5;
    function isGregorianLeapYear$1(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }
    function numberOfFirstDayInYear(year) {
        var monthsBeforeYear = Math.floor((235 * year - 234) / 19);
        var fractionalMonthsBeforeYear = monthsBeforeYear * PARTS_FRACTIONAL_MONTH + BAHARAD;
        var dayNumber = monthsBeforeYear * 29 + Math.floor(fractionalMonthsBeforeYear / PARTS_PER_DAY);
        var timeOfDay = fractionalMonthsBeforeYear % PARTS_PER_DAY;
        var dayOfWeek = dayNumber % 7; // 0 == Monday
        if (dayOfWeek === 2 || dayOfWeek === 4 || dayOfWeek === 6) {
            dayNumber++;
            dayOfWeek = dayNumber % 7;
        }
        if (dayOfWeek === 1 && timeOfDay > 15 * PARTS_PER_HOUR + 204 && !isHebrewLeapYear(year)) {
            dayNumber += 2;
        }
        else if (dayOfWeek === 0 && timeOfDay > 21 * PARTS_PER_HOUR + 589 && isHebrewLeapYear(year - 1)) {
            dayNumber++;
        }
        return dayNumber;
    }
    function getDaysInGregorianMonth(month, year) {
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (isGregorianLeapYear$1(year)) {
            days[1]++;
        }
        return days[month - 1];
    }
    function getHebrewMonths(year) {
        return isHebrewLeapYear(year) ? 13 : 12;
    }
    /**
     * Returns the number of days in a specific Hebrew year.
     * `year` is any Hebrew year.
     */
    function getDaysInHebrewYear(year) {
        return numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
    }
    function isHebrewLeapYear(year) {
        if (year != null) {
            var b = (year * 12 + 17) % 19;
            return b >= ((b < 0) ? -7 : 12);
        }
        return false;
    }
    /**
     * Returns the number of days in a specific Hebrew month.
     * `month` is 1 for Nisan, 2 for Iyar etc. Note: Hebrew leap year contains 13 months.
     * `year` is any Hebrew year.
     */
    function getDaysInHebrewMonth(month, year) {
        var yearLength = numberOfFirstDayInYear(year + 1) - numberOfFirstDayInYear(year);
        var yearType = (yearLength <= 380 ? yearLength : (yearLength - 30)) - 353;
        var leapYear = isHebrewLeapYear(year);
        var daysInMonth = leapYear ? [30, 29, 29, 29, 30, 30, 29, 30, 29, 30, 29, 30, 29] :
            [30, 29, 29, 29, 30, 29, 30, 29, 30, 29, 30, 29];
        if (yearType > 0) {
            daysInMonth[2]++; // Kislev gets an extra day in normal or complete years.
        }
        if (yearType > 1) {
            daysInMonth[1]++; // Heshvan gets an extra day in complete years only.
        }
        return daysInMonth[month - 1];
    }
    function getDayNumberInHebrewYear(date) {
        var numberOfDay = 0;
        for (var i = 1; i < date.month; i++) {
            numberOfDay += getDaysInHebrewMonth(i, date.year);
        }
        return numberOfDay + date.day;
    }
    function setHebrewMonth(date, val) {
        var after = val >= 0;
        if (!after) {
            val = -val;
        }
        while (val > 0) {
            if (after) {
                if (val > getHebrewMonths(date.year) - date.month) {
                    val -= getHebrewMonths(date.year) - date.month + 1;
                    date.year++;
                    date.month = 1;
                }
                else {
                    date.month += val;
                    val = 0;
                }
            }
            else {
                if (val >= date.month) {
                    date.year--;
                    val -= date.month;
                    date.month = getHebrewMonths(date.year);
                }
                else {
                    date.month -= val;
                    val = 0;
                }
            }
        }
        return date;
    }
    function setHebrewDay(date, val) {
        var after = val >= 0;
        if (!after) {
            val = -val;
        }
        while (val > 0) {
            if (after) {
                if (val > getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date)) {
                    val -= getDaysInHebrewYear(date.year) - getDayNumberInHebrewYear(date) + 1;
                    date.year++;
                    date.month = 1;
                    date.day = 1;
                }
                else if (val > getDaysInHebrewMonth(date.month, date.year) - date.day) {
                    val -= getDaysInHebrewMonth(date.month, date.year) - date.day + 1;
                    date.month++;
                    date.day = 1;
                }
                else {
                    date.day += val;
                    val = 0;
                }
            }
            else {
                if (val >= date.day) {
                    val -= date.day;
                    date.month--;
                    if (date.month === 0) {
                        date.year--;
                        date.month = getHebrewMonths(date.year);
                    }
                    date.day = getDaysInHebrewMonth(date.month, date.year);
                }
                else {
                    date.day -= val;
                    val = 0;
                }
            }
        }
        return date;
    }
    /**
     * Returns the equivalent Hebrew date value for a give input Gregorian date.
     * `gdate` is a JS Date to be converted to Hebrew date.
     */
    function fromGregorian$1(gdate) {
        var date = new Date(gdate);
        var gYear = date.getFullYear(), gMonth = date.getMonth(), gDay = date.getDate();
        var julianDay = GREGORIAN_EPOCH$1 - 1 + 365 * (gYear - 1) + Math.floor((gYear - 1) / 4) -
            Math.floor((gYear - 1) / 100) + Math.floor((gYear - 1) / 400) +
            Math.floor((367 * (gMonth + 1) - 362) / 12 + (gMonth + 1 <= 2 ? 0 : isGregorianLeapYear$1(gYear) ? -1 : -2) + gDay);
        julianDay = Math.floor(julianDay + 0.5);
        var daysSinceHebEpoch = julianDay - 347997;
        var monthsSinceHebEpoch = Math.floor(daysSinceHebEpoch * PARTS_PER_DAY / PARTS_PER_MONTH);
        var hYear = Math.floor((monthsSinceHebEpoch * 19 + 234) / 235) + 1;
        var firstDayOfThisYear = numberOfFirstDayInYear(hYear);
        var dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
        while (dayOfYear < 1) {
            hYear--;
            firstDayOfThisYear = numberOfFirstDayInYear(hYear);
            dayOfYear = daysSinceHebEpoch - firstDayOfThisYear;
        }
        var hMonth = 1;
        var hDay = dayOfYear;
        while (hDay > getDaysInHebrewMonth(hMonth, hYear)) {
            hDay -= getDaysInHebrewMonth(hMonth, hYear);
            hMonth++;
        }
        return new NgbDate(hYear, hMonth, hDay);
    }
    /**
     * Returns the equivalent JS date value for a given Hebrew date.
     * `hebrewDate` is an Hebrew date to be converted to Gregorian.
     */
    function toGregorian$1(hebrewDate) {
        var hYear = hebrewDate.year;
        var hMonth = hebrewDate.month;
        var hDay = hebrewDate.day;
        var days = numberOfFirstDayInYear(hYear);
        for (var i = 1; i < hMonth; i++) {
            days += getDaysInHebrewMonth(i, hYear);
        }
        days += hDay;
        var diffDays = days - HEBREW_DAY_ON_JAN_1_1970;
        var after = diffDays >= 0;
        if (!after) {
            diffDays = -diffDays;
        }
        var gYear = 1970;
        var gMonth = 1;
        var gDay = 1;
        while (diffDays > 0) {
            if (after) {
                if (diffDays >= (isGregorianLeapYear$1(gYear) ? 366 : 365)) {
                    diffDays -= isGregorianLeapYear$1(gYear) ? 366 : 365;
                    gYear++;
                }
                else if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                    diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                    gMonth++;
                }
                else {
                    gDay += diffDays;
                    diffDays = 0;
                }
            }
            else {
                if (diffDays >= (isGregorianLeapYear$1(gYear - 1) ? 366 : 365)) {
                    diffDays -= isGregorianLeapYear$1(gYear - 1) ? 366 : 365;
                    gYear--;
                }
                else {
                    if (gMonth > 1) {
                        gMonth--;
                    }
                    else {
                        gMonth = 12;
                        gYear--;
                    }
                    if (diffDays >= getDaysInGregorianMonth(gMonth, gYear)) {
                        diffDays -= getDaysInGregorianMonth(gMonth, gYear);
                    }
                    else {
                        gDay = getDaysInGregorianMonth(gMonth, gYear) - diffDays + 1;
                        diffDays = 0;
                    }
                }
            }
        }
        return new Date(gYear, gMonth - 1, gDay);
    }
    function hebrewNumerals(numerals) {
        if (!numerals) {
            return '';
        }
        var hArray0_9 = ['', '\u05d0', '\u05d1', '\u05d2', '\u05d3', '\u05d4', '\u05d5', '\u05d6', '\u05d7', '\u05d8'];
        var hArray10_19 = [
            '\u05d9', '\u05d9\u05d0', '\u05d9\u05d1', '\u05d9\u05d2', '\u05d9\u05d3', '\u05d8\u05d5', '\u05d8\u05d6',
            '\u05d9\u05d6', '\u05d9\u05d7', '\u05d9\u05d8'
        ];
        var hArray20_90 = ['', '', '\u05db', '\u05dc', '\u05de', '\u05e0', '\u05e1', '\u05e2', '\u05e4', '\u05e6'];
        var hArray100_900 = [
            '', '\u05e7', '\u05e8', '\u05e9', '\u05ea', '\u05ea\u05e7', '\u05ea\u05e8', '\u05ea\u05e9', '\u05ea\u05ea',
            '\u05ea\u05ea\u05e7'
        ];
        var hArray1000_9000 = [
            '', '\u05d0', '\u05d1', '\u05d1\u05d0', '\u05d1\u05d1', '\u05d4', '\u05d4\u05d0', '\u05d4\u05d1',
            '\u05d4\u05d1\u05d0', '\u05d4\u05d1\u05d1'
        ];
        var geresh = '\u05f3', gershaim = '\u05f4';
        var mem = 0;
        var result = [];
        var step = 0;
        while (numerals > 0) {
            var m = numerals % 10;
            if (step === 0) {
                mem = m;
            }
            else if (step === 1) {
                if (m !== 1) {
                    result.unshift(hArray20_90[m], hArray0_9[mem]);
                }
                else {
                    result.unshift(hArray10_19[mem]);
                }
            }
            else if (step === 2) {
                result.unshift(hArray100_900[m]);
            }
            else {
                if (m !== 5) {
                    result.unshift(hArray1000_9000[m], geresh, ' ');
                }
                break;
            }
            numerals = Math.floor(numerals / 10);
            if (step === 0 && numerals === 0) {
                result.unshift(hArray0_9[m]);
            }
            step++;
        }
        result = result.join('').split('');
        if (result.length === 1) {
            result.push(geresh);
        }
        else if (result.length > 1) {
            result.splice(result.length - 1, 0, gershaim);
        }
        return result.join('');
    }

    /**
     * @since 3.2.0
     */
    var NgbCalendarHebrew = /** @class */ (function (_super) {
        __extends(NgbCalendarHebrew, _super);
        function NgbCalendarHebrew() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NgbCalendarHebrew.prototype.getDaysPerWeek = function () { return 7; };
        NgbCalendarHebrew.prototype.getMonths = function (year) {
            if (year && isHebrewLeapYear(year)) {
                return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
            }
            else {
                return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            }
        };
        NgbCalendarHebrew.prototype.getWeeksPerMonth = function () { return 6; };
        NgbCalendarHebrew.prototype.isValid = function (date) {
            if (date != null) {
                var b = isNumber(date.year) && isNumber(date.month) && isNumber(date.day);
                b = b && date.month > 0 && date.month <= (isHebrewLeapYear(date.year) ? 13 : 12);
                b = b && date.day > 0 && date.day <= getDaysInHebrewMonth(date.month, date.year);
                return b && !isNaN(toGregorian$1(date).getTime());
            }
            return false;
        };
        NgbCalendarHebrew.prototype.getNext = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            date = new NgbDate(date.year, date.month, date.day);
            switch (period) {
                case 'y':
                    date.year += number;
                    date.month = 1;
                    date.day = 1;
                    return date;
                case 'm':
                    date = setHebrewMonth(date, number);
                    date.day = 1;
                    return date;
                case 'd':
                    return setHebrewDay(date, number);
                default:
                    return date;
            }
        };
        NgbCalendarHebrew.prototype.getPrev = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            return this.getNext(date, period, -number);
        };
        NgbCalendarHebrew.prototype.getWeekday = function (date) {
            var day = toGregorian$1(date).getDay();
            // in JS Date Sun=0, in ISO 8601 Sun=7
            return day === 0 ? 7 : day;
        };
        NgbCalendarHebrew.prototype.getWeekNumber = function (week, firstDayOfWeek) {
            var date = week[week.length - 1];
            return Math.ceil(getDayNumberInHebrewYear(date) / 7);
        };
        NgbCalendarHebrew.prototype.getToday = function () { return fromGregorian$1(new Date()); };
        /**
         * @since 3.4.0
         */
        NgbCalendarHebrew.prototype.toGregorian = function (date) { return fromJSDate(toGregorian$1(date)); };
        /**
         * @since 3.4.0
         */
        NgbCalendarHebrew.prototype.fromGregorian = function (date) { return fromGregorian$1(toJSDate(date)); };
        return NgbCalendarHebrew;
    }(NgbCalendar));
    NgbCalendarHebrew.decorators = [
        { type: i0.Injectable }
    ];

    var WEEKDAYS = ['שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת', 'ראשון'];
    var MONTHS = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
    var MONTHS_LEAP = ['תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳', 'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול'];
    /**
     * @since 3.2.0
     */
    var NgbDatepickerI18nHebrew = /** @class */ (function (_super) {
        __extends(NgbDatepickerI18nHebrew, _super);
        function NgbDatepickerI18nHebrew() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NgbDatepickerI18nHebrew.prototype.getMonthShortName = function (month, year) { return this.getMonthFullName(month, year); };
        NgbDatepickerI18nHebrew.prototype.getMonthFullName = function (month, year) {
            return isHebrewLeapYear(year) ? MONTHS_LEAP[month - 1] || '' : MONTHS[month - 1] || '';
        };
        NgbDatepickerI18nHebrew.prototype.getWeekdayShortName = function (weekday) { return WEEKDAYS[weekday - 1] || ''; };
        NgbDatepickerI18nHebrew.prototype.getDayAriaLabel = function (date) {
            return hebrewNumerals(date.day) + " " + this.getMonthFullName(date.month, date.year) + " " + hebrewNumerals(date.year);
        };
        NgbDatepickerI18nHebrew.prototype.getDayNumerals = function (date) { return hebrewNumerals(date.day); };
        NgbDatepickerI18nHebrew.prototype.getWeekNumerals = function (weekNumber) { return hebrewNumerals(weekNumber); };
        NgbDatepickerI18nHebrew.prototype.getYearNumerals = function (year) { return hebrewNumerals(year); };
        return NgbDatepickerI18nHebrew;
    }(NgbDatepickerI18n));
    NgbDatepickerI18nHebrew.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * Returns the equivalent JS date value for a give input Buddhist date.
     * `date` is an Buddhist date to be converted to Gregorian.
     */
    function toGregorian$2(date) {
        return new Date(date.year - 543, date.month - 1, date.day);
    }
    /**
     * Returns the equivalent Buddhist date value for a give input Gregorian date.
     * `gdate` is a JS Date to be converted to Buddhist.
     * utc to local
     */
    function fromGregorian$2(gdate) {
        return new NgbDate(gdate.getFullYear() + 543, gdate.getMonth() + 1, gdate.getDate());
    }

    /**
     * @since 9.1.0
     */
    var NgbCalendarBuddhist = /** @class */ (function (_super) {
        __extends(NgbCalendarBuddhist, _super);
        function NgbCalendarBuddhist() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NgbCalendarBuddhist.prototype.getToday = function () { return fromGregorian$2(new Date()); };
        NgbCalendarBuddhist.prototype.getNext = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            var jsDate = toGregorian$2(date);
            var checkMonth = true;
            var expectedMonth = jsDate.getMonth();
            switch (period) {
                case 'y':
                    jsDate.setFullYear(jsDate.getFullYear() + number);
                    break;
                case 'm':
                    expectedMonth += number;
                    jsDate.setMonth(expectedMonth);
                    expectedMonth = expectedMonth % 12;
                    if (expectedMonth < 0) {
                        expectedMonth = expectedMonth + 12;
                    }
                    break;
                case 'd':
                    jsDate.setDate(jsDate.getDate() + number);
                    checkMonth = false;
                    break;
                default:
                    return date;
            }
            if (checkMonth && jsDate.getMonth() !== expectedMonth) {
                // this means the destination month has less days than the initial month
                // let's go back to the end of the previous month:
                jsDate.setDate(0);
            }
            return fromGregorian$2(jsDate);
        };
        NgbCalendarBuddhist.prototype.getPrev = function (date, period, number) {
            if (period === void 0) { period = 'd'; }
            if (number === void 0) { number = 1; }
            return this.getNext(date, period, -number);
        };
        NgbCalendarBuddhist.prototype.getWeekday = function (date) {
            var jsDate = toGregorian$2(date);
            var day = jsDate.getDay();
            // in JS Date Sun=0, in ISO 8601 Sun=7
            return day === 0 ? 7 : day;
        };
        NgbCalendarBuddhist.prototype.getWeekNumber = function (week, firstDayOfWeek) {
            // in JS Date Sun=0, in ISO 8601 Sun=7
            if (firstDayOfWeek === 7) {
                firstDayOfWeek = 0;
            }
            var thursdayIndex = (4 + 7 - firstDayOfWeek) % 7;
            var date = week[thursdayIndex];
            var jsDate = toGregorian$2(date);
            jsDate.setDate(jsDate.getDate() + 4 - (jsDate.getDay() || 7)); // Thursday
            var time = jsDate.getTime();
            jsDate.setMonth(0); // Compare with Jan 1
            jsDate.setDate(1);
            return Math.floor(Math.round((time - jsDate.getTime()) / 86400000) / 7) + 1;
        };
        NgbCalendarBuddhist.prototype.isValid = function (date) {
            if (!date || !isInteger(date.year) || !isInteger(date.month) || !isInteger(date.day)) {
                return false;
            }
            // year 0 doesn't exist in Gregorian calendar
            if (date.year === 0) {
                return false;
            }
            var jsDate = toGregorian$2(date);
            return !isNaN(jsDate.getTime()) && jsDate.getFullYear() === date.year - 543 &&
                jsDate.getMonth() + 1 === date.month && jsDate.getDate() === date.day;
        };
        return NgbCalendarBuddhist;
    }(NgbCalendarGregorian));
    NgbCalendarBuddhist.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * [`NgbDateAdapter`](#/components/datepicker/api#NgbDateAdapter) implementation that uses
     * native javascript dates as a user date model.
     */
    var NgbDateNativeAdapter = /** @class */ (function (_super) {
        __extends(NgbDateNativeAdapter, _super);
        function NgbDateNativeAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Converts a native `Date` to a `NgbDateStruct`.
         */
        NgbDateNativeAdapter.prototype.fromModel = function (date) {
            return (date instanceof Date && !isNaN(date.getTime())) ? this._fromNativeDate(date) : null;
        };
        /**
         * Converts a `NgbDateStruct` to a native `Date`.
         */
        NgbDateNativeAdapter.prototype.toModel = function (date) {
            return date && isInteger(date.year) && isInteger(date.month) && isInteger(date.day) ? this._toNativeDate(date) :
                null;
        };
        NgbDateNativeAdapter.prototype._fromNativeDate = function (date) {
            return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
        };
        NgbDateNativeAdapter.prototype._toNativeDate = function (date) {
            var jsDate = new Date(date.year, date.month - 1, date.day, 12);
            // avoid 30 -> 1930 conversion
            jsDate.setFullYear(date.year);
            return jsDate;
        };
        return NgbDateNativeAdapter;
    }(NgbDateAdapter));
    NgbDateNativeAdapter.decorators = [
        { type: i0.Injectable }
    ];

    /**
     * Same as [`NgbDateNativeAdapter`](#/components/datepicker/api#NgbDateNativeAdapter), but with UTC dates.
     *
     * @since 3.2.0
     */
    var NgbDateNativeUTCAdapter = /** @class */ (function (_super) {
        __extends(NgbDateNativeUTCAdapter, _super);
        function NgbDateNativeUTCAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NgbDateNativeUTCAdapter.prototype._fromNativeDate = function (date) {
            return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1, day: date.getUTCDate() };
        };
        NgbDateNativeUTCAdapter.prototype._toNativeDate = function (date) {
            var jsDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
            // avoid 30 -> 1930 conversion
            jsDate.setUTCFullYear(date.year);
            return jsDate;
        };
        return NgbDateNativeUTCAdapter;
    }(NgbDateNativeAdapter));
    NgbDateNativeUTCAdapter.decorators = [
        { type: i0.Injectable }
    ];

    var NgbDatepickerModule = /** @class */ (function () {
        function NgbDatepickerModule() {
        }
        return NgbDatepickerModule;
    }());
    NgbDatepickerModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [
                        NgbDatepicker, NgbDatepickerContent, NgbDatepickerMonth, NgbDatepickerNavigation, NgbDatepickerNavigationSelect,
                        NgbDatepickerDayView, NgbInputDatepicker
                    ],
                    exports: [NgbDatepicker, NgbDatepickerContent, NgbInputDatepicker, NgbDatepickerMonth],
                    imports: [i1.CommonModule, forms.FormsModule],
                    entryComponents: [NgbDatepicker]
                },] }
    ];

    /**
     * A configuration service for the [`NgbDropdown`](#/components/dropdown/api#NgbDropdown) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the dropdowns used in the application.
     */
    var NgbDropdownConfig = /** @class */ (function () {
        function NgbDropdownConfig() {
            this.autoClose = true;
            this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
        }
        return NgbDropdownConfig;
    }());
    NgbDropdownConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbDropdownConfig_Factory() { return new NgbDropdownConfig(); }, token: NgbDropdownConfig, providedIn: "root" });
    NgbDropdownConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    var NgbNavbar = /** @class */ (function () {
        function NgbNavbar() {
        }
        return NgbNavbar;
    }());
    NgbNavbar.decorators = [
        { type: i0.Directive, args: [{ selector: '.navbar' },] }
    ];
    /**
     * A directive you should put on a dropdown item to enable keyboard navigation.
     * Arrow keys will move focus between items marked with this directive.
     *
     * @since 4.1.0
     */
    var NgbDropdownItem = /** @class */ (function () {
        function NgbDropdownItem(elementRef) {
            this.elementRef = elementRef;
            this._disabled = false;
        }
        Object.defineProperty(NgbDropdownItem.prototype, "disabled", {
            get: function () { return this._disabled; },
            set: function (value) {
                this._disabled = value === '' || value === true; // accept an empty attribute as true
            },
            enumerable: false,
            configurable: true
        });
        return NgbDropdownItem;
    }());
    NgbDropdownItem.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngbDropdownItem]', host: { 'class': 'dropdown-item', '[class.disabled]': 'disabled' } },] }
    ];
    NgbDropdownItem.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    NgbDropdownItem.propDecorators = {
        disabled: [{ type: i0.Input }]
    };
    /**
     * A directive that wraps dropdown menu content and dropdown items.
     */
    var NgbDropdownMenu = /** @class */ (function () {
        function NgbDropdownMenu(dropdown, _elementRef) {
            this.dropdown = dropdown;
            this.placement = 'bottom';
            this.isOpen = false;
            this.nativeElement = _elementRef.nativeElement;
        }
        return NgbDropdownMenu;
    }());
    NgbDropdownMenu.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngbDropdownMenu]',
                    host: {
                        '[class.dropdown-menu]': 'true',
                        '[class.show]': 'dropdown.isOpen()',
                        '[attr.x-placement]': 'placement',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Enter)': 'dropdown.onKeyDown($event)',
                        '(keydown.Space)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
                    }
                },] }
    ];
    NgbDropdownMenu.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i0.forwardRef(function () { return NgbDropdown; }),] }] },
        { type: i0.ElementRef }
    ]; };
    NgbDropdownMenu.propDecorators = {
        menuItems: [{ type: i0.ContentChildren, args: [NgbDropdownItem,] }]
    };
    /**
     * A directive to mark an element to which dropdown menu will be anchored.
     *
     * This is a simple version of the `NgbDropdownToggle` directive.
     * It plays the same role, but doesn't listen to click events to toggle dropdown menu thus enabling support
     * for events other than click.
     *
     * @since 1.1.0
     */
    var NgbDropdownAnchor = /** @class */ (function () {
        function NgbDropdownAnchor(dropdown, _elementRef) {
            this.dropdown = dropdown;
            this.nativeElement = _elementRef.nativeElement;
        }
        return NgbDropdownAnchor;
    }());
    NgbDropdownAnchor.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngbDropdownAnchor]', host: { 'class': 'dropdown-toggle', '[attr.aria-expanded]': 'dropdown.isOpen()' } },] }
    ];
    NgbDropdownAnchor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i0.forwardRef(function () { return NgbDropdown; }),] }] },
        { type: i0.ElementRef }
    ]; };
    /**
     * A directive to mark an element that will toggle dropdown via the `click` event.
     *
     * You can also use `NgbDropdownAnchor` as an alternative.
     */
    var NgbDropdownToggle = /** @class */ (function (_super) {
        __extends(NgbDropdownToggle, _super);
        function NgbDropdownToggle(dropdown, elementRef) {
            return _super.call(this, dropdown, elementRef) || this;
        }
        return NgbDropdownToggle;
    }(NgbDropdownAnchor));
    NgbDropdownToggle.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngbDropdownToggle]',
                    host: {
                        'class': 'dropdown-toggle',
                        '[attr.aria-expanded]': 'dropdown.isOpen()',
                        '(click)': 'dropdown.toggle()',
                        '(keydown.ArrowUp)': 'dropdown.onKeyDown($event)',
                        '(keydown.ArrowDown)': 'dropdown.onKeyDown($event)',
                        '(keydown.Home)': 'dropdown.onKeyDown($event)',
                        '(keydown.End)': 'dropdown.onKeyDown($event)',
                        '(keydown.Tab)': 'dropdown.onKeyDown($event)',
                        '(keydown.Shift.Tab)': 'dropdown.onKeyDown($event)'
                    },
                    providers: [{ provide: NgbDropdownAnchor, useExisting: i0.forwardRef(function () { return NgbDropdownToggle; }) }]
                },] }
    ];
    NgbDropdownToggle.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i0.forwardRef(function () { return NgbDropdown; }),] }] },
        { type: i0.ElementRef }
    ]; };
    /**
     * A directive that provides contextual overlays for displaying lists of links and more.
     */
    var NgbDropdown = /** @class */ (function () {
        function NgbDropdown(_changeDetector, config, _document, _ngZone, _elementRef, _renderer, ngbNavbar) {
            var _this = this;
            this._changeDetector = _changeDetector;
            this._document = _document;
            this._ngZone = _ngZone;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._closed$ = new rxjs.Subject();
            this._bodyContainer = null;
            /**
             * Defines whether or not the dropdown menu is opened initially.
             */
            this._open = false;
            /**
             * An event fired when the dropdown is opened or closed.
             *
             * The event payload is a `boolean`:
             * * `true` - the dropdown was opened
             * * `false` - the dropdown was closed
             */
            this.openChange = new i0.EventEmitter();
            this.placement = config.placement;
            this.container = config.container;
            this.autoClose = config.autoClose;
            this.display = ngbNavbar ? 'static' : 'dynamic';
            this._zoneSubscription = _ngZone.onStable.subscribe(function () { _this._positionMenu(); });
        }
        NgbDropdown.prototype.ngAfterContentInit = function () {
            var _this = this;
            this._ngZone.onStable.pipe(operators.take(1)).subscribe(function () {
                _this._applyPlacementClasses();
                if (_this._open) {
                    _this._setCloseHandlers();
                }
            });
        };
        NgbDropdown.prototype.ngOnChanges = function (changes) {
            if (changes.container && this._open) {
                this._applyContainer(this.container);
            }
            if (changes.placement && !changes.placement.isFirstChange) {
                this._applyPlacementClasses();
            }
            if (changes.dropdownClass) {
                var _a = changes.dropdownClass, currentValue = _a.currentValue, previousValue = _a.previousValue;
                this._applyCustomDropdownClass(currentValue, previousValue);
            }
        };
        /**
         * Checks if the dropdown menu is open.
         */
        NgbDropdown.prototype.isOpen = function () { return this._open; };
        /**
         * Opens the dropdown menu.
         */
        NgbDropdown.prototype.open = function () {
            if (!this._open) {
                this._open = true;
                this._applyContainer(this.container);
                this.openChange.emit(true);
                this._setCloseHandlers();
                if (this._anchor) {
                    this._anchor.nativeElement.focus();
                }
            }
        };
        NgbDropdown.prototype._setCloseHandlers = function () {
            var _this = this;
            ngbAutoClose(this._ngZone, this._document, this.autoClose, function (source) {
                _this.close();
                if (source === 0 /* ESCAPE */) {
                    _this._anchor.nativeElement.focus();
                }
            }, this._closed$, this._menu ? [this._menu.nativeElement] : [], this._anchor ? [this._anchor.nativeElement] : [], '.dropdown-item,.dropdown-divider');
        };
        /**
         * Closes the dropdown menu.
         */
        NgbDropdown.prototype.close = function () {
            if (this._open) {
                this._open = false;
                this._resetContainer();
                this._closed$.next();
                this.openChange.emit(false);
                this._changeDetector.markForCheck();
            }
        };
        /**
         * Toggles the dropdown menu.
         */
        NgbDropdown.prototype.toggle = function () {
            if (this.isOpen()) {
                this.close();
            }
            else {
                this.open();
            }
        };
        NgbDropdown.prototype.ngOnDestroy = function () {
            this._resetContainer();
            this._closed$.next();
            this._zoneSubscription.unsubscribe();
        };
        NgbDropdown.prototype.onKeyDown = function (event) {
            var _this = this;
            // tslint:disable-next-line:deprecation
            var key = event.which;
            var itemElements = this._getMenuElements();
            var position = -1;
            var itemElement = null;
            var isEventFromToggle = this._isEventFromToggle(event);
            if (!isEventFromToggle && itemElements.length) {
                itemElements.forEach(function (item, index) {
                    if (item.contains(event.target)) {
                        itemElement = item;
                    }
                    if (item === _this._document.activeElement) {
                        position = index;
                    }
                });
            }
            // closing on Enter / Space
            if (key === Key.Space || key === Key.Enter) {
                if (itemElement && (this.autoClose === true || this.autoClose === 'inside')) {
                    // Item is either a button or a link, so click will be triggered by the browser on Enter or Space.
                    // So we have to register a one-time click handler that will fire after any user defined click handlers
                    // to close the dropdown
                    rxjs.fromEvent(itemElement, 'click').pipe(operators.take(1)).subscribe(function () { return _this.close(); });
                }
                return;
            }
            if (key === Key.Tab) {
                if (event.target && this.isOpen() && this.autoClose) {
                    if (this._anchor.nativeElement === event.target) {
                        if (this.container === 'body' && !event.shiftKey) {
                            /* This case is special: user is using [Tab] from the anchor/toggle.
                               User expects the next focusable element in the dropdown menu to get focus.
                               But the menu is not a sibling to anchor/toggle, it is at the end of the body.
                               Trick is to synchronously focus the menu element, and let the [keydown.Tab] go
                               so that browser will focus the proper element (first one focusable in the menu) */
                            this._renderer.setAttribute(this._menu.nativeElement, 'tabindex', '0');
                            this._menu.nativeElement.focus();
                            this._renderer.removeAttribute(this._menu.nativeElement, 'tabindex');
                        }
                        else if (event.shiftKey) {
                            this.close();
                        }
                        return;
                    }
                    else if (this.container === 'body') {
                        var focusableElements = this._menu.nativeElement.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
                        if (event.shiftKey && event.target === focusableElements[0]) {
                            this._anchor.nativeElement.focus();
                            event.preventDefault();
                        }
                        else if (!event.shiftKey && event.target === focusableElements[focusableElements.length - 1]) {
                            this._anchor.nativeElement.focus();
                            this.close();
                        }
                    }
                    else {
                        rxjs.fromEvent(event.target, 'focusout').pipe(operators.take(1)).subscribe(function (_a) {
                            var relatedTarget = _a.relatedTarget;
                            if (!_this._elementRef.nativeElement.contains(relatedTarget)) {
                                _this.close();
                            }
                        });
                    }
                }
                return;
            }
            // opening / navigating
            if (isEventFromToggle || itemElement) {
                this.open();
                if (itemElements.length) {
                    switch (key) {
                        case Key.ArrowDown:
                            position = Math.min(position + 1, itemElements.length - 1);
                            break;
                        case Key.ArrowUp:
                            if (this._isDropup() && position === -1) {
                                position = itemElements.length - 1;
                                break;
                            }
                            position = Math.max(position - 1, 0);
                            break;
                        case Key.Home:
                            position = 0;
                            break;
                        case Key.End:
                            position = itemElements.length - 1;
                            break;
                    }
                    itemElements[position].focus();
                }
                event.preventDefault();
            }
        };
        NgbDropdown.prototype._isDropup = function () { return this._elementRef.nativeElement.classList.contains('dropup'); };
        NgbDropdown.prototype._isEventFromToggle = function (event) {
            return this._anchor.nativeElement.contains(event.target);
        };
        NgbDropdown.prototype._getMenuElements = function () {
            var menu = this._menu;
            if (menu == null) {
                return [];
            }
            return menu.menuItems.filter(function (item) { return !item.disabled; }).map(function (item) { return item.elementRef.nativeElement; });
        };
        NgbDropdown.prototype._positionMenu = function () {
            var menu = this._menu;
            if (this.isOpen() && menu) {
                this._applyPlacementClasses(this.display === 'dynamic' ? positionElements(this._anchor.nativeElement, this._bodyContainer || this._menu.nativeElement, this.placement, this.container === 'body') :
                    this._getFirstPlacement(this.placement));
            }
        };
        NgbDropdown.prototype._getFirstPlacement = function (placement) {
            return Array.isArray(placement) ? placement[0] : placement.split(' ')[0];
        };
        NgbDropdown.prototype._resetContainer = function () {
            var renderer = this._renderer;
            if (this._menu) {
                var dropdownElement = this._elementRef.nativeElement;
                var dropdownMenuElement = this._menu.nativeElement;
                renderer.appendChild(dropdownElement, dropdownMenuElement);
                renderer.removeStyle(dropdownMenuElement, 'position');
                renderer.removeStyle(dropdownMenuElement, 'transform');
            }
            if (this._bodyContainer) {
                renderer.removeChild(this._document.body, this._bodyContainer);
                this._bodyContainer = null;
            }
        };
        NgbDropdown.prototype._applyContainer = function (container) {
            if (container === void 0) { container = null; }
            this._resetContainer();
            if (container === 'body') {
                var renderer = this._renderer;
                var dropdownMenuElement = this._menu.nativeElement;
                var bodyContainer = this._bodyContainer = this._bodyContainer || renderer.createElement('div');
                // Override some styles to have the positioning working
                renderer.setStyle(bodyContainer, 'position', 'absolute');
                renderer.setStyle(dropdownMenuElement, 'position', 'static');
                renderer.setStyle(bodyContainer, 'z-index', '1050');
                renderer.appendChild(bodyContainer, dropdownMenuElement);
                renderer.appendChild(this._document.body, bodyContainer);
            }
            this._applyCustomDropdownClass(this.dropdownClass);
        };
        NgbDropdown.prototype._applyCustomDropdownClass = function (newClass, oldClass) {
            var targetElement = this.container === 'body' ? this._bodyContainer : this._elementRef.nativeElement;
            if (targetElement) {
                if (oldClass) {
                    this._renderer.removeClass(targetElement, oldClass);
                }
                if (newClass) {
                    this._renderer.addClass(targetElement, newClass);
                }
            }
        };
        NgbDropdown.prototype._applyPlacementClasses = function (placement) {
            var menu = this._menu;
            if (menu) {
                if (!placement) {
                    placement = this._getFirstPlacement(this.placement);
                }
                var renderer = this._renderer;
                var dropdownElement = this._elementRef.nativeElement;
                // remove the current placement classes
                renderer.removeClass(dropdownElement, 'dropup');
                renderer.removeClass(dropdownElement, 'dropdown');
                menu.placement = this.display === 'static' ? null : placement;
                /*
                * apply the new placement
                * in case of top use up-arrow or down-arrow otherwise
                */
                var dropdownClass = placement.search('^top') !== -1 ? 'dropup' : 'dropdown';
                renderer.addClass(dropdownElement, dropdownClass);
                var bodyContainer = this._bodyContainer;
                if (bodyContainer) {
                    renderer.removeClass(bodyContainer, 'dropup');
                    renderer.removeClass(bodyContainer, 'dropdown');
                    renderer.addClass(bodyContainer, dropdownClass);
                }
            }
        };
        return NgbDropdown;
    }());
    NgbDropdown.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngbDropdown]', exportAs: 'ngbDropdown', host: { '[class.show]': 'isOpen()' } },] }
    ];
    NgbDropdown.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: NgbDropdownConfig },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: i0.NgZone },
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: NgbNavbar, decorators: [{ type: i0.Optional }] }
    ]; };
    NgbDropdown.propDecorators = {
        _menu: [{ type: i0.ContentChild, args: [NgbDropdownMenu, { static: false },] }],
        _anchor: [{ type: i0.ContentChild, args: [NgbDropdownAnchor, { static: false },] }],
        autoClose: [{ type: i0.Input }],
        dropdownClass: [{ type: i0.Input }],
        _open: [{ type: i0.Input, args: ['open',] }],
        placement: [{ type: i0.Input }],
        container: [{ type: i0.Input }],
        display: [{ type: i0.Input }],
        openChange: [{ type: i0.Output }]
    };

    var NGB_DROPDOWN_DIRECTIVES = [NgbDropdown, NgbDropdownAnchor, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem, NgbNavbar];
    var NgbDropdownModule = /** @class */ (function () {
        function NgbDropdownModule() {
        }
        return NgbDropdownModule;
    }());
    NgbDropdownModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: NGB_DROPDOWN_DIRECTIVES, exports: NGB_DROPDOWN_DIRECTIVES },] }
    ];

    /**
     * A configuration service for the [`NgbModal`](#/components/modal/api#NgbModal) service.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all modals used in the application.
    *
    * @since 3.1.0
    */
    var NgbModalConfig = /** @class */ (function () {
        function NgbModalConfig(_ngbConfig) {
            this._ngbConfig = _ngbConfig;
            this.backdrop = true;
            this.keyboard = true;
        }
        Object.defineProperty(NgbModalConfig.prototype, "animation", {
            get: function () { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; },
            set: function (animation) { this._animation = animation; },
            enumerable: false,
            configurable: true
        });
        return NgbModalConfig;
    }());
    NgbModalConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbModalConfig_Factory() { return new NgbModalConfig(i0.ɵɵinject(NgbConfig)); }, token: NgbModalConfig, providedIn: "root" });
    NgbModalConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbModalConfig.ctorParameters = function () { return [
        { type: NgbConfig }
    ]; };

    var ContentRef = /** @class */ (function () {
        function ContentRef(nodes, viewRef, componentRef) {
            this.nodes = nodes;
            this.viewRef = viewRef;
            this.componentRef = componentRef;
        }
        return ContentRef;
    }());
    var PopupService = /** @class */ (function () {
        function PopupService(_type, _injector, _viewContainerRef, _renderer, _ngZone, _componentFactoryResolver, _applicationRef) {
            this._type = _type;
            this._injector = _injector;
            this._viewContainerRef = _viewContainerRef;
            this._renderer = _renderer;
            this._ngZone = _ngZone;
            this._componentFactoryResolver = _componentFactoryResolver;
            this._applicationRef = _applicationRef;
            this._windowRef = null;
            this._contentRef = null;
        }
        PopupService.prototype.open = function (content, context, animation) {
            var _this = this;
            if (animation === void 0) { animation = false; }
            if (!this._windowRef) {
                this._contentRef = this._getContentRef(content, context);
                this._windowRef = this._viewContainerRef.createComponent(this._componentFactoryResolver.resolveComponentFactory(this._type), this._viewContainerRef.length, this._injector, this._contentRef.nodes);
            }
            var nativeElement = this._windowRef.location.nativeElement;
            var transition$ = this._ngZone.onStable.pipe(operators.take(1), operators.mergeMap(function () { return ngbRunTransition(_this._ngZone, nativeElement, function (_b) {
                var classList = _b.classList;
                return classList.add('show');
            }, { animation: animation, runningTransition: 'continue' }); }));
            return { windowRef: this._windowRef, transition$: transition$ };
        };
        PopupService.prototype.close = function (animation) {
            var _this = this;
            if (animation === void 0) { animation = false; }
            if (!this._windowRef) {
                return rxjs.of(undefined);
            }
            return ngbRunTransition(this._ngZone, this._windowRef.location.nativeElement, function (_b) {
                var classList = _b.classList;
                return classList.remove('show');
            }, { animation: animation, runningTransition: 'stop' })
                .pipe(operators.tap(function () {
                var _a;
                if (_this._windowRef) {
                    // this is required because of the container='body' option
                    _this._viewContainerRef.remove(_this._viewContainerRef.indexOf(_this._windowRef.hostView));
                    _this._windowRef = null;
                }
                if ((_a = _this._contentRef) === null || _a === void 0 ? void 0 : _a.viewRef) {
                    _this._applicationRef.detachView(_this._contentRef.viewRef);
                    _this._contentRef.viewRef.destroy();
                    _this._contentRef = null;
                }
            }));
        };
        PopupService.prototype._getContentRef = function (content, context) {
            if (!content) {
                return new ContentRef([]);
            }
            else if (content instanceof i0.TemplateRef) {
                var viewRef = content.createEmbeddedView(context);
                this._applicationRef.attachView(viewRef);
                return new ContentRef([viewRef.rootNodes], viewRef);
            }
            else {
                return new ContentRef([[this._renderer.createText("" + content)]]);
            }
        };
        return PopupService;
    }());

    var noop = function () { };
    var ɵ0$3 = noop;
    /**
     * Utility to handle the scrollbar.
     *
     * It allows to compensate the lack of a vertical scrollbar by adding an
     * equivalent padding on the right of the body, and to remove this compensation.
     */
    var ScrollBar = /** @class */ (function () {
        function ScrollBar(_document) {
            this._document = _document;
        }
        /**
         * To be called right before a potential vertical scrollbar would be removed:
         *
         * - if there was a scrollbar, adds some compensation padding to the body
         * to keep the same layout as when the scrollbar is there
         * - if there was none, there is nothing to do
         *
         * @return a callback used to revert the compensation (noop if there was none,
         * otherwise a function removing the padding)
         */
        ScrollBar.prototype.compensate = function () {
            var width = this._getWidth();
            return !this._isPresent(width) ? noop : this._adjustBody(width);
        };
        /**
         * Adds a padding of the given width on the right of the body.
         *
         * @return a callback used to revert the padding to its previous value
         */
        ScrollBar.prototype._adjustBody = function (scrollbarWidth) {
            var body = this._document.body;
            var userSetPaddingStyle = body.style.paddingRight;
            var actualPadding = parseFloat(window.getComputedStyle(body)['padding-right']);
            body.style['padding-right'] = actualPadding + scrollbarWidth + "px";
            return function () { return body.style['padding-right'] = userSetPaddingStyle; };
        };
        /**
         * Tells whether a scrollbar is currently present on the body.
         *
         * @return true if scrollbar is present, false otherwise
         */
        ScrollBar.prototype._isPresent = function (scrollbarWidth) {
            var rect = this._document.body.getBoundingClientRect();
            var bodyToViewportGap = window.innerWidth - (rect.left + rect.right);
            var uncertainty = 0.1 * scrollbarWidth;
            return bodyToViewportGap >= scrollbarWidth - uncertainty;
        };
        /**
         * Calculates and returns the width of a scrollbar.
         *
         * @return the width of a scrollbar on this page
         */
        ScrollBar.prototype._getWidth = function () {
            var measurer = this._document.createElement('div');
            measurer.className = 'modal-scrollbar-measure';
            var body = this._document.body;
            body.appendChild(measurer);
            var width = measurer.getBoundingClientRect().width - measurer.clientWidth;
            body.removeChild(measurer);
            return width;
        };
        return ScrollBar;
    }());
    ScrollBar.ɵprov = i0.ɵɵdefineInjectable({ factory: function ScrollBar_Factory() { return new ScrollBar(i0.ɵɵinject(i1.DOCUMENT)); }, token: ScrollBar, providedIn: "root" });
    ScrollBar.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    ScrollBar.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
    ]; };

    var NgbModalBackdrop = /** @class */ (function () {
        function NgbModalBackdrop(_el, _zone) {
            this._el = _el;
            this._zone = _zone;
        }
        NgbModalBackdrop.prototype.ngOnInit = function () {
            var _this = this;
            this._zone.onStable.asObservable().pipe(operators.take(1)).subscribe(function () {
                ngbRunTransition(_this._zone, _this._el.nativeElement, function (element, animation) {
                    if (animation) {
                        reflow(element);
                    }
                    element.classList.add('show');
                }, { animation: _this.animation, runningTransition: 'continue' });
            });
        };
        NgbModalBackdrop.prototype.hide = function () {
            return ngbRunTransition(this._zone, this._el.nativeElement, function (_a) {
                var classList = _a.classList;
                return classList.remove('show');
            }, { animation: this.animation, runningTransition: 'stop' });
        };
        return NgbModalBackdrop;
    }());
    NgbModalBackdrop.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-modal-backdrop',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: '',
                    host: {
                        '[class]': '"modal-backdrop" + (backdropClass ? " " + backdropClass : "")',
                        '[class.show]': '!animation',
                        '[class.fade]': 'animation',
                        'style': 'z-index: 1050'
                    }
                },] }
    ];
    NgbModalBackdrop.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.NgZone }
    ]; };
    NgbModalBackdrop.propDecorators = {
        animation: [{ type: i0.Input }],
        backdropClass: [{ type: i0.Input }]
    };

    /**
     * A reference to the currently opened (active) modal.
     *
     * Instances of this class can be injected into your component passed as modal content.
     * So you can `.close()` or `.dismiss()` the modal window from your component.
     */
    var NgbActiveModal = /** @class */ (function () {
        function NgbActiveModal() {
        }
        /**
         * Closes the modal with an optional `result` value.
         *
         * The `NgbModalRef.result` promise will be resolved with the provided value.
         */
        NgbActiveModal.prototype.close = function (result) { };
        /**
         * Dismisses the modal with an optional `reason` value.
         *
         * The `NgbModalRef.result` promise will be rejected with the provided value.
         */
        NgbActiveModal.prototype.dismiss = function (reason) { };
        return NgbActiveModal;
    }());
    /**
     * A reference to the newly opened modal returned by the `NgbModal.open()` method.
     */
    var NgbModalRef = /** @class */ (function () {
        function NgbModalRef(_windowCmptRef, _contentRef, _backdropCmptRef, _beforeDismiss) {
            var _this = this;
            this._windowCmptRef = _windowCmptRef;
            this._contentRef = _contentRef;
            this._backdropCmptRef = _backdropCmptRef;
            this._beforeDismiss = _beforeDismiss;
            this._closed = new rxjs.Subject();
            this._dismissed = new rxjs.Subject();
            this._hidden = new rxjs.Subject();
            _windowCmptRef.instance.dismissEvent.subscribe(function (reason) { _this.dismiss(reason); });
            this.result = new Promise(function (resolve, reject) {
                _this._resolve = resolve;
                _this._reject = reject;
            });
            this.result.then(null, function () { });
        }
        Object.defineProperty(NgbModalRef.prototype, "componentInstance", {
            /**
             * The instance of a component used for the modal content.
             *
             * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
             */
            get: function () {
                if (this._contentRef && this._contentRef.componentRef) {
                    return this._contentRef.componentRef.instance;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbModalRef.prototype, "closed", {
            /**
             * The observable that emits when the modal is closed via the `.close()` method.
             *
             * It will emit the result passed to the `.close()` method.
             *
             * @since 8.0.0
             */
            get: function () { return this._closed.asObservable().pipe(operators.takeUntil(this._hidden)); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbModalRef.prototype, "dismissed", {
            /**
             * The observable that emits when the modal is dismissed via the `.dismiss()` method.
             *
             * It will emit the reason passed to the `.dismissed()` method by the user, or one of the internal
             * reasons like backdrop click or ESC key press.
             *
             * @since 8.0.0
             */
            get: function () { return this._dismissed.asObservable().pipe(operators.takeUntil(this._hidden)); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbModalRef.prototype, "hidden", {
            /**
             * The observable that emits when both modal window and backdrop are closed and animations were finished.
             * At this point modal and backdrop elements will be removed from the DOM tree.
             *
             * This observable will be completed after emitting.
             *
             * @since 8.0.0
             */
            get: function () { return this._hidden.asObservable(); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbModalRef.prototype, "shown", {
            /**
             * The observable that emits when modal is fully visible and animation was finished.
             * Modal DOM element is always available synchronously after calling 'modal.open()' service.
             *
             * This observable will be completed after emitting.
             * It will not emit, if modal is closed before open animation is finished.
             *
             * @since 8.0.0
             */
            get: function () { return this._windowCmptRef.instance.shown.asObservable(); },
            enumerable: false,
            configurable: true
        });
        /**
         * Closes the modal with an optional `result` value.
         *
         * The `NgbMobalRef.result` promise will be resolved with the provided value.
         */
        NgbModalRef.prototype.close = function (result) {
            if (this._windowCmptRef) {
                this._closed.next(result);
                this._resolve(result);
                this._removeModalElements();
            }
        };
        NgbModalRef.prototype._dismiss = function (reason) {
            this._dismissed.next(reason);
            this._reject(reason);
            this._removeModalElements();
        };
        /**
         * Dismisses the modal with an optional `reason` value.
         *
         * The `NgbModalRef.result` promise will be rejected with the provided value.
         */
        NgbModalRef.prototype.dismiss = function (reason) {
            var _this = this;
            if (this._windowCmptRef) {
                if (!this._beforeDismiss) {
                    this._dismiss(reason);
                }
                else {
                    var dismiss = this._beforeDismiss();
                    if (dismiss && dismiss.then) {
                        dismiss.then(function (result) {
                            if (result !== false) {
                                _this._dismiss(reason);
                            }
                        }, function () { });
                    }
                    else if (dismiss !== false) {
                        this._dismiss(reason);
                    }
                }
            }
        };
        NgbModalRef.prototype._removeModalElements = function () {
            var _this = this;
            var windowTransition$ = this._windowCmptRef.instance.hide();
            var backdropTransition$ = this._backdropCmptRef ? this._backdropCmptRef.instance.hide() : rxjs.of(undefined);
            // hiding window
            windowTransition$.subscribe(function () {
                var nativeElement = _this._windowCmptRef.location.nativeElement;
                nativeElement.parentNode.removeChild(nativeElement);
                _this._windowCmptRef.destroy();
                if (_this._contentRef && _this._contentRef.viewRef) {
                    _this._contentRef.viewRef.destroy();
                }
                _this._windowCmptRef = null;
                _this._contentRef = null;
            });
            // hiding backdrop
            backdropTransition$.subscribe(function () {
                if (_this._backdropCmptRef) {
                    var nativeElement = _this._backdropCmptRef.location.nativeElement;
                    nativeElement.parentNode.removeChild(nativeElement);
                    _this._backdropCmptRef.destroy();
                    _this._backdropCmptRef = null;
                }
            });
            // all done
            rxjs.zip(windowTransition$, backdropTransition$).subscribe(function () {
                _this._hidden.next();
                _this._hidden.complete();
            });
        };
        return NgbModalRef;
    }());

    (function (ModalDismissReasons) {
        ModalDismissReasons[ModalDismissReasons["BACKDROP_CLICK"] = 0] = "BACKDROP_CLICK";
        ModalDismissReasons[ModalDismissReasons["ESC"] = 1] = "ESC";
    })(exports.ModalDismissReasons || (exports.ModalDismissReasons = {}));

    var NgbModalWindow = /** @class */ (function () {
        function NgbModalWindow(_document, _elRef, _zone) {
            this._document = _document;
            this._elRef = _elRef;
            this._zone = _zone;
            this._closed$ = new rxjs.Subject();
            this._elWithFocus = null; // element that is focused prior to modal opening
            this.backdrop = true;
            this.keyboard = true;
            this.dismissEvent = new i0.EventEmitter();
            this.shown = new rxjs.Subject();
            this.hidden = new rxjs.Subject();
        }
        NgbModalWindow.prototype.dismiss = function (reason) { this.dismissEvent.emit(reason); };
        NgbModalWindow.prototype.ngOnInit = function () { this._elWithFocus = this._document.activeElement; };
        NgbModalWindow.prototype.ngAfterViewInit = function () { this._show(); };
        NgbModalWindow.prototype.ngOnDestroy = function () { this._disableEventHandling(); };
        NgbModalWindow.prototype.hide = function () {
            var _this = this;
            var nativeElement = this._elRef.nativeElement;
            var context = { animation: this.animation, runningTransition: 'stop' };
            var windowTransition$ = ngbRunTransition(this._zone, nativeElement, function () { return nativeElement.classList.remove('show'); }, context);
            var dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, function () { }, context);
            var transitions$ = rxjs.zip(windowTransition$, dialogTransition$);
            transitions$.subscribe(function () {
                _this.hidden.next();
                _this.hidden.complete();
            });
            this._disableEventHandling();
            this._restoreFocus();
            return transitions$;
        };
        NgbModalWindow.prototype._show = function () {
            var _this = this;
            var context = { animation: this.animation, runningTransition: 'continue' };
            var windowTransition$ = ngbRunTransition(this._zone, this._elRef.nativeElement, function (element, animation) {
                if (animation) {
                    reflow(element);
                }
                element.classList.add('show');
            }, context);
            var dialogTransition$ = ngbRunTransition(this._zone, this._dialogEl.nativeElement, function () { }, context);
            rxjs.zip(windowTransition$, dialogTransition$).subscribe(function () {
                _this.shown.next();
                _this.shown.complete();
            });
            this._enableEventHandling();
            this._setFocus();
        };
        NgbModalWindow.prototype._enableEventHandling = function () {
            var _this = this;
            var nativeElement = this._elRef.nativeElement;
            this._zone.runOutsideAngular(function () {
                rxjs.fromEvent(nativeElement, 'keydown')
                    .pipe(operators.takeUntil(_this._closed$), 
                // tslint:disable-next-line:deprecation
                operators.filter(function (e) { return e.which === Key.Escape; }))
                    .subscribe(function (event) {
                    if (_this.keyboard) {
                        requestAnimationFrame(function () {
                            if (!event.defaultPrevented) {
                                _this._zone.run(function () { return _this.dismiss(exports.ModalDismissReasons.ESC); });
                            }
                        });
                    }
                    else if (_this.backdrop === 'static') {
                        _this._bumpBackdrop();
                    }
                });
                // We're listening to 'mousedown' and 'mouseup' to prevent modal from closing when pressing the mouse
                // inside the modal dialog and releasing it outside
                var preventClose = false;
                rxjs.fromEvent(_this._dialogEl.nativeElement, 'mousedown')
                    .pipe(operators.takeUntil(_this._closed$), operators.tap(function () { return preventClose = false; }), operators.switchMap(function () { return rxjs.fromEvent(nativeElement, 'mouseup').pipe(operators.takeUntil(_this._closed$), operators.take(1)); }), operators.filter(function (_a) {
                    var target = _a.target;
                    return nativeElement === target;
                }))
                    .subscribe(function () { preventClose = true; });
                // We're listening to 'click' to dismiss modal on modal window click, except when:
                // 1. clicking on modal dialog itself
                // 2. closing was prevented by mousedown/up handlers
                // 3. clicking on scrollbar when the viewport is too small and modal doesn't fit (click is not triggered at all)
                rxjs.fromEvent(nativeElement, 'click').pipe(operators.takeUntil(_this._closed$)).subscribe(function (_a) {
                    var target = _a.target;
                    if (nativeElement === target) {
                        if (_this.backdrop === 'static') {
                            _this._bumpBackdrop();
                        }
                        else if (_this.backdrop === true && !preventClose) {
                            _this._zone.run(function () { return _this.dismiss(exports.ModalDismissReasons.BACKDROP_CLICK); });
                        }
                    }
                    preventClose = false;
                });
            });
        };
        NgbModalWindow.prototype._disableEventHandling = function () { this._closed$.next(); };
        NgbModalWindow.prototype._setFocus = function () {
            var nativeElement = this._elRef.nativeElement;
            if (!nativeElement.contains(document.activeElement)) {
                var autoFocusable = nativeElement.querySelector("[ngbAutofocus]");
                var firstFocusable = getFocusableBoundaryElements(nativeElement)[0];
                var elementToFocus = autoFocusable || firstFocusable || nativeElement;
                elementToFocus.focus();
            }
        };
        NgbModalWindow.prototype._restoreFocus = function () {
            var _this = this;
            var body = this._document.body;
            var elWithFocus = this._elWithFocus;
            var elementToFocus;
            if (elWithFocus && elWithFocus['focus'] && body.contains(elWithFocus)) {
                elementToFocus = elWithFocus;
            }
            else {
                elementToFocus = body;
            }
            this._zone.runOutsideAngular(function () {
                setTimeout(function () { return elementToFocus.focus(); });
                _this._elWithFocus = null;
            });
        };
        NgbModalWindow.prototype._bumpBackdrop = function () {
            if (this.backdrop === 'static') {
                ngbRunTransition(this._zone, this._elRef.nativeElement, function (_a) {
                    var classList = _a.classList;
                    classList.add('modal-static');
                    return function () { return classList.remove('modal-static'); };
                }, { animation: this.animation, runningTransition: 'continue' });
            }
        };
        return NgbModalWindow;
    }());
    NgbModalWindow.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-modal-window',
                    host: {
                        '[class]': '"modal d-block" + (windowClass ? " " + windowClass : "")',
                        '[class.fade]': 'animation',
                        'role': 'dialog',
                        'tabindex': '-1',
                        '[attr.aria-modal]': 'true',
                        '[attr.aria-labelledby]': 'ariaLabelledBy',
                        '[attr.aria-describedby]': 'ariaDescribedBy'
                    },
                    template: "\n    <div #dialog [class]=\"'modal-dialog' + (size ? ' modal-' + size : '') + (centered ? ' modal-dialog-centered' : '') +\n     (scrollable ? ' modal-dialog-scrollable' : '') + (modalDialogClass ? ' ' + modalDialogClass : '')\" role=\"document\">\n        <div class=\"modal-content\"><ng-content></ng-content></div>\n    </div>\n    ",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: ["ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}"]
                },] }
    ];
    NgbModalWindow.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: i0.ElementRef },
        { type: i0.NgZone }
    ]; };
    NgbModalWindow.propDecorators = {
        _dialogEl: [{ type: i0.ViewChild, args: ['dialog', { static: true },] }],
        animation: [{ type: i0.Input }],
        ariaLabelledBy: [{ type: i0.Input }],
        ariaDescribedBy: [{ type: i0.Input }],
        backdrop: [{ type: i0.Input }],
        centered: [{ type: i0.Input }],
        keyboard: [{ type: i0.Input }],
        scrollable: [{ type: i0.Input }],
        size: [{ type: i0.Input }],
        windowClass: [{ type: i0.Input }],
        modalDialogClass: [{ type: i0.Input }],
        dismissEvent: [{ type: i0.Output, args: ['dismiss',] }]
    };

    var NgbModalStack = /** @class */ (function () {
        function NgbModalStack(_applicationRef, _injector, _document, _scrollBar, _rendererFactory, _ngZone) {
            var _this = this;
            this._applicationRef = _applicationRef;
            this._injector = _injector;
            this._document = _document;
            this._scrollBar = _scrollBar;
            this._rendererFactory = _rendererFactory;
            this._ngZone = _ngZone;
            this._activeWindowCmptHasChanged = new rxjs.Subject();
            this._ariaHiddenValues = new Map();
            this._backdropAttributes = ['animation', 'backdropClass'];
            this._modalRefs = [];
            this._windowAttributes = [
                'animation', 'ariaLabelledBy', 'ariaDescribedBy', 'backdrop', 'centered', 'keyboard', 'scrollable', 'size',
                'windowClass'
            ];
            this._windowCmpts = [];
            this._activeInstances = new i0.EventEmitter();
            // Trap focus on active WindowCmpt
            this._activeWindowCmptHasChanged.subscribe(function () {
                if (_this._windowCmpts.length) {
                    var activeWindowCmpt = _this._windowCmpts[_this._windowCmpts.length - 1];
                    ngbFocusTrap(_this._ngZone, activeWindowCmpt.location.nativeElement, _this._activeWindowCmptHasChanged);
                    _this._revertAriaHidden();
                    _this._setAriaHidden(activeWindowCmpt.location.nativeElement);
                }
            });
        }
        NgbModalStack.prototype.open = function (moduleCFR, contentInjector, content, options) {
            var _this = this;
            var containerEl = options.container instanceof HTMLElement ? options.container : isDefined(options.container) ?
                this._document.querySelector(options.container) :
                this._document.body;
            var renderer = this._rendererFactory.createRenderer(null, null);
            var revertPaddingForScrollBar = this._scrollBar.compensate();
            var removeBodyClass = function () {
                if (!_this._modalRefs.length) {
                    renderer.removeClass(_this._document.body, 'modal-open');
                    _this._revertAriaHidden();
                }
            };
            if (!containerEl) {
                throw new Error("The specified modal container \"" + (options.container || 'body') + "\" was not found in the DOM.");
            }
            var activeModal = new NgbActiveModal();
            var contentRef = this._getContentRef(moduleCFR, options.injector || contentInjector, content, activeModal, options);
            var backdropCmptRef = options.backdrop !== false ? this._attachBackdrop(moduleCFR, containerEl) : undefined;
            var windowCmptRef = this._attachWindowComponent(moduleCFR, containerEl, contentRef);
            var ngbModalRef = new NgbModalRef(windowCmptRef, contentRef, backdropCmptRef, options.beforeDismiss);
            this._registerModalRef(ngbModalRef);
            this._registerWindowCmpt(windowCmptRef);
            ngbModalRef.result.then(revertPaddingForScrollBar, revertPaddingForScrollBar);
            ngbModalRef.result.then(removeBodyClass, removeBodyClass);
            activeModal.close = function (result) { ngbModalRef.close(result); };
            activeModal.dismiss = function (reason) { ngbModalRef.dismiss(reason); };
            this._applyWindowOptions(windowCmptRef.instance, options);
            if (this._modalRefs.length === 1) {
                renderer.addClass(this._document.body, 'modal-open');
            }
            if (backdropCmptRef && backdropCmptRef.instance) {
                this._applyBackdropOptions(backdropCmptRef.instance, options);
            }
            return ngbModalRef;
        };
        Object.defineProperty(NgbModalStack.prototype, "activeInstances", {
            get: function () { return this._activeInstances; },
            enumerable: false,
            configurable: true
        });
        NgbModalStack.prototype.dismissAll = function (reason) { this._modalRefs.forEach(function (ngbModalRef) { return ngbModalRef.dismiss(reason); }); };
        NgbModalStack.prototype.hasOpenModals = function () { return this._modalRefs.length > 0; };
        NgbModalStack.prototype._attachBackdrop = function (moduleCFR, containerEl) {
            var backdropFactory = moduleCFR.resolveComponentFactory(NgbModalBackdrop);
            var backdropCmptRef = backdropFactory.create(this._injector);
            this._applicationRef.attachView(backdropCmptRef.hostView);
            containerEl.appendChild(backdropCmptRef.location.nativeElement);
            return backdropCmptRef;
        };
        NgbModalStack.prototype._attachWindowComponent = function (moduleCFR, containerEl, contentRef) {
            var windowFactory = moduleCFR.resolveComponentFactory(NgbModalWindow);
            var windowCmptRef = windowFactory.create(this._injector, contentRef.nodes);
            this._applicationRef.attachView(windowCmptRef.hostView);
            containerEl.appendChild(windowCmptRef.location.nativeElement);
            return windowCmptRef;
        };
        NgbModalStack.prototype._applyWindowOptions = function (windowInstance, options) {
            this._windowAttributes.forEach(function (optionName) {
                if (isDefined(options[optionName])) {
                    windowInstance[optionName] = options[optionName];
                }
            });
        };
        NgbModalStack.prototype._applyBackdropOptions = function (backdropInstance, options) {
            this._backdropAttributes.forEach(function (optionName) {
                if (isDefined(options[optionName])) {
                    backdropInstance[optionName] = options[optionName];
                }
            });
        };
        NgbModalStack.prototype._getContentRef = function (moduleCFR, contentInjector, content, activeModal, options) {
            if (!content) {
                return new ContentRef([]);
            }
            else if (content instanceof i0.TemplateRef) {
                return this._createFromTemplateRef(content, activeModal);
            }
            else if (isString(content)) {
                return this._createFromString(content);
            }
            else {
                return this._createFromComponent(moduleCFR, contentInjector, content, activeModal, options);
            }
        };
        NgbModalStack.prototype._createFromTemplateRef = function (content, activeModal) {
            var context = {
                $implicit: activeModal,
                close: function (result) { activeModal.close(result); },
                dismiss: function (reason) { activeModal.dismiss(reason); }
            };
            var viewRef = content.createEmbeddedView(context);
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        };
        NgbModalStack.prototype._createFromString = function (content) {
            var component = this._document.createTextNode("" + content);
            return new ContentRef([[component]]);
        };
        NgbModalStack.prototype._createFromComponent = function (moduleCFR, contentInjector, content, context, options) {
            var contentCmptFactory = moduleCFR.resolveComponentFactory(content);
            var modalContentInjector = i0.Injector.create({ providers: [{ provide: NgbActiveModal, useValue: context }], parent: contentInjector });
            var componentRef = contentCmptFactory.create(modalContentInjector);
            var componentNativeEl = componentRef.location.nativeElement;
            if (options.scrollable) {
                componentNativeEl.classList.add('component-host-scrollable');
            }
            this._applicationRef.attachView(componentRef.hostView);
            // FIXME: we should here get rid of the component nativeElement
            // and use `[Array.from(componentNativeEl.childNodes)]` instead and remove the above CSS class.
            return new ContentRef([[componentNativeEl]], componentRef.hostView, componentRef);
        };
        NgbModalStack.prototype._setAriaHidden = function (element) {
            var _this = this;
            var parent = element.parentElement;
            if (parent && element !== this._document.body) {
                Array.from(parent.children).forEach(function (sibling) {
                    if (sibling !== element && sibling.nodeName !== 'SCRIPT') {
                        _this._ariaHiddenValues.set(sibling, sibling.getAttribute('aria-hidden'));
                        sibling.setAttribute('aria-hidden', 'true');
                    }
                });
                this._setAriaHidden(parent);
            }
        };
        NgbModalStack.prototype._revertAriaHidden = function () {
            this._ariaHiddenValues.forEach(function (value, element) {
                if (value) {
                    element.setAttribute('aria-hidden', value);
                }
                else {
                    element.removeAttribute('aria-hidden');
                }
            });
            this._ariaHiddenValues.clear();
        };
        NgbModalStack.prototype._registerModalRef = function (ngbModalRef) {
            var _this = this;
            var unregisterModalRef = function () {
                var index = _this._modalRefs.indexOf(ngbModalRef);
                if (index > -1) {
                    _this._modalRefs.splice(index, 1);
                    _this._activeInstances.emit(_this._modalRefs);
                }
            };
            this._modalRefs.push(ngbModalRef);
            this._activeInstances.emit(this._modalRefs);
            ngbModalRef.result.then(unregisterModalRef, unregisterModalRef);
        };
        NgbModalStack.prototype._registerWindowCmpt = function (ngbWindowCmpt) {
            var _this = this;
            this._windowCmpts.push(ngbWindowCmpt);
            this._activeWindowCmptHasChanged.next();
            ngbWindowCmpt.onDestroy(function () {
                var index = _this._windowCmpts.indexOf(ngbWindowCmpt);
                if (index > -1) {
                    _this._windowCmpts.splice(index, 1);
                    _this._activeWindowCmptHasChanged.next();
                }
            });
        };
        return NgbModalStack;
    }());
    NgbModalStack.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbModalStack_Factory() { return new NgbModalStack(i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(ScrollBar), i0.ɵɵinject(i0.RendererFactory2), i0.ɵɵinject(i0.NgZone)); }, token: NgbModalStack, providedIn: "root" });
    NgbModalStack.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbModalStack.ctorParameters = function () { return [
        { type: i0.ApplicationRef },
        { type: i0.Injector },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: ScrollBar },
        { type: i0.RendererFactory2 },
        { type: i0.NgZone }
    ]; };

    /**
     * A service for opening modal windows.
     *
     * Creating a modal is straightforward: create a component or a template and pass it as an argument to
     * the `.open()` method.
     */
    var NgbModal = /** @class */ (function () {
        function NgbModal(_moduleCFR, _injector, _modalStack, _config) {
            this._moduleCFR = _moduleCFR;
            this._injector = _injector;
            this._modalStack = _modalStack;
            this._config = _config;
        }
        /**
         * Opens a new modal window with the specified content and supplied options.
         *
         * Content can be provided as a `TemplateRef` or a component type. If you pass a component type as content,
         * then instances of those components can be injected with an instance of the `NgbActiveModal` class. You can then
         * use `NgbActiveModal` methods to close / dismiss modals from "inside" of your component.
         *
         * Also see the [`NgbModalOptions`](#/components/modal/api#NgbModalOptions) for the list of supported options.
         */
        NgbModal.prototype.open = function (content, options) {
            if (options === void 0) { options = {}; }
            var combinedOptions = Object.assign(Object.assign(Object.assign({}, this._config), { animation: this._config.animation }), options);
            return this._modalStack.open(this._moduleCFR, this._injector, content, combinedOptions);
        };
        Object.defineProperty(NgbModal.prototype, "activeInstances", {
            /**
             * Returns an observable that holds the active modal instances.
             */
            get: function () { return this._modalStack.activeInstances; },
            enumerable: false,
            configurable: true
        });
        /**
         * Dismisses all currently displayed modal windows with the supplied reason.
         *
         * @since 3.1.0
         */
        NgbModal.prototype.dismissAll = function (reason) { this._modalStack.dismissAll(reason); };
        /**
         * Indicates if there are currently any open modal windows in the application.
         *
         * @since 3.3.0
         */
        NgbModal.prototype.hasOpenModals = function () { return this._modalStack.hasOpenModals(); };
        return NgbModal;
    }());
    NgbModal.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbModal_Factory() { return new NgbModal(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(NgbModalStack), i0.ɵɵinject(NgbModalConfig)); }, token: NgbModal, providedIn: "root" });
    NgbModal.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbModal.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: i0.Injector },
        { type: NgbModalStack },
        { type: NgbModalConfig }
    ]; };

    var NgbModalModule = /** @class */ (function () {
        function NgbModalModule() {
        }
        return NgbModalModule;
    }());
    NgbModalModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [NgbModalBackdrop, NgbModalWindow],
                    entryComponents: [NgbModalBackdrop, NgbModalWindow],
                    providers: [NgbModal]
                },] }
    ];

    /**
     * A configuration service for the [`NgbNav`](#/components/nav/api#NgbNav) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the navs used in the application.
     *
     * @since 5.2.0
     */
    var NgbNavConfig = /** @class */ (function () {
        function NgbNavConfig(_ngbConfig) {
            this._ngbConfig = _ngbConfig;
            this.destroyOnHide = true;
            this.orientation = 'horizontal';
            this.roles = 'tablist';
            this.keyboard = false;
        }
        Object.defineProperty(NgbNavConfig.prototype, "animation", {
            get: function () { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; },
            set: function (animation) { this._animation = animation; },
            enumerable: false,
            configurable: true
        });
        return NgbNavConfig;
    }());
    NgbNavConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbNavConfig_Factory() { return new NgbNavConfig(i0.ɵɵinject(NgbConfig)); }, token: NgbNavConfig, providedIn: "root" });
    NgbNavConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbNavConfig.ctorParameters = function () { return [
        { type: NgbConfig }
    ]; };

    var isValidNavId = function (id) { return isDefined(id) && id !== ''; };
    var ɵ0$4 = isValidNavId;
    var navCounter = 0;
    /**
     * This directive must be used to wrap content to be displayed in the nav.
     *
     * @since 5.2.0
     */
    var NgbNavContent = /** @class */ (function () {
        function NgbNavContent(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbNavContent;
    }());
    NgbNavContent.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbNavContent]' },] }
    ];
    NgbNavContent.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * The directive used to group nav link and related nav content. As well as set nav identifier and some options.
     *
     * @since 5.2.0
     */
    var NgbNavItem = /** @class */ (function () {
        function NgbNavItem(nav, elementRef) {
            this.elementRef = elementRef;
            /**
             * If `true`, the current nav item is disabled and can't be toggled by user.
             *
             * Nevertheless disabled nav can be selected programmatically via the `.select()` method and the `[activeId]` binding.
             */
            this.disabled = false;
            /**
             * An event emitted when the fade in transition is finished on the related nav content
             *
             * @since 8.0.0
             */
            this.shown = new i0.EventEmitter();
            /**
             * An event emitted when the fade out transition is finished on the related nav content
             *
             * @since 8.0.0
             */
            this.hidden = new i0.EventEmitter();
            // TODO: cf https://github.com/angular/angular/issues/30106
            this._nav = nav;
        }
        NgbNavItem.prototype.ngAfterContentChecked = function () {
            // We are using @ContentChildren instead of @ContentChild as in the Angular version being used
            // only @ContentChildren allows us to specify the {descendants: false} option.
            // Without {descendants: false} we are hitting bugs described in:
            // https://github.com/ng-bootstrap/ng-bootstrap/issues/2240
            this.contentTpl = this.contentTpls.first;
        };
        NgbNavItem.prototype.ngOnInit = function () {
            if (!isDefined(this.domId)) {
                this.domId = "ngb-nav-" + navCounter++;
            }
        };
        Object.defineProperty(NgbNavItem.prototype, "active", {
            get: function () { return this._nav.activeId === this.id; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbNavItem.prototype, "id", {
            get: function () { return isValidNavId(this._id) ? this._id : this.domId; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbNavItem.prototype, "panelDomId", {
            get: function () { return this.domId + "-panel"; },
            enumerable: false,
            configurable: true
        });
        NgbNavItem.prototype.isPanelInDom = function () {
            return (isDefined(this.destroyOnHide) ? !this.destroyOnHide : !this._nav.destroyOnHide) || this.active;
        };
        return NgbNavItem;
    }());
    NgbNavItem.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngbNavItem]', exportAs: 'ngbNavItem', host: { '[class.nav-item]': 'true' } },] }
    ];
    NgbNavItem.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i0.forwardRef(function () { return NgbNav; }),] }] },
        { type: i0.ElementRef }
    ]; };
    NgbNavItem.propDecorators = {
        destroyOnHide: [{ type: i0.Input }],
        disabled: [{ type: i0.Input }],
        domId: [{ type: i0.Input }],
        _id: [{ type: i0.Input, args: ['ngbNavItem',] }],
        shown: [{ type: i0.Output }],
        hidden: [{ type: i0.Output }],
        contentTpls: [{ type: i0.ContentChildren, args: [NgbNavContent, { descendants: false },] }]
    };
    /**
     * A nav directive that helps with implementing tabbed navigation components.
     *
     * @since 5.2.0
     */
    var NgbNav = /** @class */ (function () {
        function NgbNav(role, config, _cd, _document) {
            this.role = role;
            this._cd = _cd;
            this._document = _document;
            /**
             * The event emitted after the active nav changes
             * The payload of the event is the newly active nav id
             *
             * If you want to prevent nav change, you should use `(navChange)` event
             */
            this.activeIdChange = new i0.EventEmitter();
            /**
             * An event emitted when the fade in transition is finished for one of the items.
             *
             * Payload of the event is the nav id that was just shown.
             *
             * @since 8.0.0
             */
            this.shown = new i0.EventEmitter();
            /**
             * An event emitted when the fade out transition is finished for one of the items.
             *
             * Payload of the event is the nav id that was just hidden.
             *
             * @since 8.0.0
             */
            this.hidden = new i0.EventEmitter();
            this.destroy$ = new rxjs.Subject();
            this.navItemChange$ = new rxjs.Subject();
            /**
             * The nav change event emitted right before the nav change happens on user click.
             *
             * This event won't be emitted if nav is changed programmatically via `[activeId]` or `.select()`.
             *
             * See [`NgbNavChangeEvent`](#/components/nav/api#NgbNavChangeEvent) for payload details.
             */
            this.navChange = new i0.EventEmitter();
            this.animation = config.animation;
            this.destroyOnHide = config.destroyOnHide;
            this.orientation = config.orientation;
            this.roles = config.roles;
            this.keyboard = config.keyboard;
        }
        NgbNav.prototype.click = function (item) {
            if (!item.disabled) {
                this._updateActiveId(item.id);
            }
        };
        NgbNav.prototype.onKeyDown = function (event) {
            var _this = this;
            if (this.roles !== 'tablist' || !this.keyboard) {
                return;
            }
            // tslint:disable-next-line: deprecation
            var key = event.which;
            var enabledLinks = this.links.filter(function (link) { return !link.navItem.disabled; });
            var length = enabledLinks.length;
            var position = -1;
            enabledLinks.forEach(function (link, index) {
                if (link.elRef.nativeElement === _this._document.activeElement) {
                    position = index;
                }
            });
            if (length) {
                switch (key) {
                    case Key.ArrowLeft:
                        if (this.orientation === 'vertical') {
                            return;
                        }
                        position = (position - 1 + length) % length;
                        break;
                    case Key.ArrowRight:
                        if (this.orientation === 'vertical') {
                            return;
                        }
                        position = (position + 1) % length;
                        break;
                    case Key.ArrowDown:
                        if (this.orientation === 'horizontal') {
                            return;
                        }
                        position = (position + 1) % length;
                        break;
                    case Key.ArrowUp:
                        if (this.orientation === 'horizontal') {
                            return;
                        }
                        position = (position - 1 + length) % length;
                        break;
                    case Key.Home:
                        position = 0;
                        break;
                    case Key.End:
                        position = length - 1;
                        break;
                }
                if (this.keyboard === 'changeWithArrows') {
                    this.select(enabledLinks[position].navItem.id);
                }
                enabledLinks[position].elRef.nativeElement.focus();
                event.preventDefault();
            }
        };
        /**
         * Selects the nav with the given id and shows its associated pane.
         * Any other nav that was previously selected becomes unselected and its associated pane is hidden.
         */
        NgbNav.prototype.select = function (id) { this._updateActiveId(id, false); };
        NgbNav.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (!isDefined(this.activeId)) {
                var nextId = this.items.first ? this.items.first.id : null;
                if (isValidNavId(nextId)) {
                    this._updateActiveId(nextId, false);
                    this._cd.detectChanges();
                }
            }
            this.items.changes.pipe(operators.takeUntil(this.destroy$)).subscribe(function () { return _this._notifyItemChanged(_this.activeId); });
        };
        NgbNav.prototype.ngOnChanges = function (_a) {
            var activeId = _a.activeId;
            if (activeId && !activeId.firstChange) {
                this._notifyItemChanged(activeId.currentValue);
            }
        };
        NgbNav.prototype.ngOnDestroy = function () { this.destroy$.next(); };
        NgbNav.prototype._updateActiveId = function (nextId, emitNavChange) {
            if (emitNavChange === void 0) { emitNavChange = true; }
            if (this.activeId !== nextId) {
                var defaultPrevented_1 = false;
                if (emitNavChange) {
                    this.navChange.emit({ activeId: this.activeId, nextId: nextId, preventDefault: function () { defaultPrevented_1 = true; } });
                }
                if (!defaultPrevented_1) {
                    this.activeId = nextId;
                    this.activeIdChange.emit(nextId);
                    this._notifyItemChanged(nextId);
                }
            }
        };
        NgbNav.prototype._notifyItemChanged = function (nextItemId) { this.navItemChange$.next(this._getItemById(nextItemId)); };
        NgbNav.prototype._getItemById = function (itemId) {
            return this.items && this.items.find(function (item) { return item.id === itemId; }) || null;
        };
        return NgbNav;
    }());
    NgbNav.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngbNav]',
                    exportAs: 'ngbNav',
                    host: {
                        '[class.nav]': 'true',
                        '[class.flex-column]': "orientation === 'vertical'",
                        '[attr.aria-orientation]': "orientation === 'vertical' && roles === 'tablist' ? 'vertical' : undefined",
                        '[attr.role]': "role ? role : roles ? 'tablist' : undefined",
                        '(keydown.arrowLeft)': 'onKeyDown($event)',
                        '(keydown.arrowRight)': 'onKeyDown($event)',
                        '(keydown.arrowDown)': 'onKeyDown($event)',
                        '(keydown.arrowUp)': 'onKeyDown($event)',
                        '(keydown.Home)': 'onKeyDown($event)',
                        '(keydown.End)': 'onKeyDown($event)'
                    }
                },] }
    ];
    NgbNav.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Attribute, args: ['role',] }] },
        { type: NgbNavConfig },
        { type: i0.ChangeDetectorRef },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] }
    ]; };
    NgbNav.propDecorators = {
        activeId: [{ type: i0.Input }],
        activeIdChange: [{ type: i0.Output }],
        animation: [{ type: i0.Input }],
        destroyOnHide: [{ type: i0.Input }],
        orientation: [{ type: i0.Input }],
        roles: [{ type: i0.Input }],
        keyboard: [{ type: i0.Input }],
        shown: [{ type: i0.Output }],
        hidden: [{ type: i0.Output }],
        items: [{ type: i0.ContentChildren, args: [NgbNavItem,] }],
        links: [{ type: i0.ContentChildren, args: [i0.forwardRef(function () { return NgbNavLink; }), { descendants: true },] }],
        navChange: [{ type: i0.Output }]
    };
    /**
     * A directive to put on the nav link.
     *
     * @since 5.2.0
     */
    var NgbNavLink = /** @class */ (function () {
        function NgbNavLink(role, navItem, nav, elRef) {
            this.role = role;
            this.navItem = navItem;
            this.nav = nav;
            this.elRef = elRef;
        }
        NgbNavLink.prototype.hasNavItemClass = function () {
            // with alternative markup we have to add `.nav-item` class, because `ngbNavItem` is on the ng-container
            return this.navItem.elementRef.nativeElement.nodeType === Node.COMMENT_NODE;
        };
        return NgbNavLink;
    }());
    NgbNavLink.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'a[ngbNavLink]',
                    host: {
                        '[id]': 'navItem.domId',
                        '[class.nav-link]': 'true',
                        '[class.nav-item]': 'hasNavItemClass()',
                        '[attr.role]': "role ? role : nav.roles ? 'tab' : undefined",
                        'href': '',
                        '[class.active]': 'navItem.active',
                        '[class.disabled]': 'navItem.disabled',
                        '[attr.tabindex]': 'navItem.disabled ? -1 : undefined',
                        '[attr.aria-controls]': 'navItem.isPanelInDom() ? navItem.panelDomId : null',
                        '[attr.aria-selected]': 'navItem.active',
                        '[attr.aria-disabled]': 'navItem.disabled',
                        '(click)': 'nav.click(navItem); $event.preventDefault()'
                    }
                },] }
    ];
    NgbNavLink.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Attribute, args: ['role',] }] },
        { type: NgbNavItem },
        { type: NgbNav },
        { type: i0.ElementRef }
    ]; };

    var ngbNavFadeOutTransition = function (_a) {
        var classList = _a.classList;
        classList.remove('show');
        return function () { return classList.remove('active'); };
    };
    var ngbNavFadeInTransition = function (element, animation) {
        if (animation) {
            reflow(element);
        }
        element.classList.add('show');
    };

    var NgbNavPane = /** @class */ (function () {
        function NgbNavPane(elRef) {
            this.elRef = elRef;
        }
        return NgbNavPane;
    }());
    NgbNavPane.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngbNavPane]',
                    host: {
                        '[id]': 'item.panelDomId',
                        'class': 'tab-pane',
                        '[class.fade]': 'nav.animation',
                        '[attr.role]': 'role ? role : nav.roles ? "tabpanel" : undefined',
                        '[attr.aria-labelledby]': 'item.domId'
                    }
                },] }
    ];
    NgbNavPane.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    NgbNavPane.propDecorators = {
        item: [{ type: i0.Input }],
        nav: [{ type: i0.Input }],
        role: [{ type: i0.Input }]
    };
    /**
     * The outlet where currently active nav content will be displayed.
     *
     * @since 5.2.0
     */
    var NgbNavOutlet = /** @class */ (function () {
        function NgbNavOutlet(_cd, _ngZone) {
            this._cd = _cd;
            this._ngZone = _ngZone;
            this._activePane = null;
        }
        NgbNavOutlet.prototype.isPanelTransitioning = function (item) { var _a; return ((_a = this._activePane) === null || _a === void 0 ? void 0 : _a.item) === item; };
        NgbNavOutlet.prototype.ngAfterViewInit = function () {
            var _this = this;
            var _a;
            // initial display
            this._updateActivePane();
            // this will be emitted for all 3 types of nav changes: .select(), [activeId] or (click)
            this.nav.navItemChange$
                .pipe(operators.takeUntil(this.nav.destroy$), operators.startWith(((_a = this._activePane) === null || _a === void 0 ? void 0 : _a.item) || null), operators.distinctUntilChanged(), operators.skip(1))
                .subscribe(function (nextItem) {
                var options = { animation: _this.nav.animation, runningTransition: 'stop' };
                // next panel we're switching to will only appear in DOM after the change detection is done
                // and `this._panes` will be updated
                _this._cd.detectChanges();
                // fading out
                if (_this._activePane) {
                    ngbRunTransition(_this._ngZone, _this._activePane.elRef.nativeElement, ngbNavFadeOutTransition, options)
                        .subscribe(function () {
                        var _a;
                        var activeItem = (_a = _this._activePane) === null || _a === void 0 ? void 0 : _a.item;
                        _this._activePane = _this._getPaneForItem(nextItem);
                        // mark for check when transition finishes as outlet or parent containers might be OnPush
                        // without this the panes that have "faded out" will stay in DOM
                        _this._cd.markForCheck();
                        // fading in
                        if (_this._activePane) {
                            // we have to add the '.active' class before running the transition,
                            // because it should be in place before `ngbRunTransition` does `reflow()`
                            _this._activePane.elRef.nativeElement.classList.add('active');
                            ngbRunTransition(_this._ngZone, _this._activePane.elRef.nativeElement, ngbNavFadeInTransition, options)
                                .subscribe(function () {
                                if (nextItem) {
                                    nextItem.shown.emit();
                                    _this.nav.shown.emit(nextItem.id);
                                }
                            });
                        }
                        if (activeItem) {
                            activeItem.hidden.emit();
                            _this.nav.hidden.emit(activeItem.id);
                        }
                    });
                }
                else {
                    _this._updateActivePane();
                }
            });
        };
        NgbNavOutlet.prototype._updateActivePane = function () {
            var _a, _b;
            this._activePane = this._getActivePane();
            (_a = this._activePane) === null || _a === void 0 ? void 0 : _a.elRef.nativeElement.classList.add('show');
            (_b = this._activePane) === null || _b === void 0 ? void 0 : _b.elRef.nativeElement.classList.add('active');
        };
        NgbNavOutlet.prototype._getPaneForItem = function (item) {
            return this._panes && this._panes.find(function (pane) { return pane.item === item; }) || null;
        };
        NgbNavOutlet.prototype._getActivePane = function () {
            return this._panes && this._panes.find(function (pane) { return pane.item.active; }) || null;
        };
        return NgbNavOutlet;
    }());
    NgbNavOutlet.decorators = [
        { type: i0.Component, args: [{
                    selector: '[ngbNavOutlet]',
                    host: { '[class.tab-content]': 'true' },
                    encapsulation: i0.ViewEncapsulation.None,
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-template ngFor let-item [ngForOf]=\"nav.items\">\n      <div ngbNavPane *ngIf=\"item.isPanelInDom() || isPanelTransitioning(item)\" [item]=\"item\" [nav]=\"nav\" [role]=\"paneRole\">\n        <ng-template [ngTemplateOutlet]=\"item.contentTpl?.templateRef || null\"\n                     [ngTemplateOutletContext]=\"{$implicit: item.active || isPanelTransitioning(item)}\"></ng-template>\n      </div>\n    </ng-template>\n  "
                },] }
    ];
    NgbNavOutlet.ctorParameters = function () { return [
        { type: i0.ChangeDetectorRef },
        { type: i0.NgZone }
    ]; };
    NgbNavOutlet.propDecorators = {
        _panes: [{ type: i0.ViewChildren, args: [NgbNavPane,] }],
        paneRole: [{ type: i0.Input }],
        nav: [{ type: i0.Input, args: ['ngbNavOutlet',] }]
    };

    var NGB_NAV_DIRECTIVES = [NgbNavContent, NgbNav, NgbNavItem, NgbNavLink, NgbNavOutlet, NgbNavPane];
    var NgbNavModule = /** @class */ (function () {
        function NgbNavModule() {
        }
        return NgbNavModule;
    }());
    NgbNavModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: NGB_NAV_DIRECTIVES, exports: NGB_NAV_DIRECTIVES, imports: [i1.CommonModule] },] }
    ];

    /**
     * A configuration service for the [`NgbPagination`](#/components/pagination/api#NgbPagination) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the paginations used in the application.
     */
    var NgbPaginationConfig = /** @class */ (function () {
        function NgbPaginationConfig() {
            this.disabled = false;
            this.boundaryLinks = false;
            this.directionLinks = true;
            this.ellipses = true;
            this.maxSize = 0;
            this.pageSize = 10;
            this.rotate = false;
        }
        return NgbPaginationConfig;
    }());
    NgbPaginationConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbPaginationConfig_Factory() { return new NgbPaginationConfig(); }, token: NgbPaginationConfig, providedIn: "root" });
    NgbPaginationConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    /**
     * A directive to match the 'ellipsis' link template
     *
     * @since 4.1.0
     */
    var NgbPaginationEllipsis = /** @class */ (function () {
        function NgbPaginationEllipsis(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPaginationEllipsis;
    }());
    NgbPaginationEllipsis.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPaginationEllipsis]' },] }
    ];
    NgbPaginationEllipsis.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A directive to match the 'first' link template
     *
     * @since 4.1.0
     */
    var NgbPaginationFirst = /** @class */ (function () {
        function NgbPaginationFirst(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPaginationFirst;
    }());
    NgbPaginationFirst.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPaginationFirst]' },] }
    ];
    NgbPaginationFirst.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A directive to match the 'last' link template
     *
     * @since 4.1.0
     */
    var NgbPaginationLast = /** @class */ (function () {
        function NgbPaginationLast(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPaginationLast;
    }());
    NgbPaginationLast.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPaginationLast]' },] }
    ];
    NgbPaginationLast.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A directive to match the 'next' link template
     *
     * @since 4.1.0
     */
    var NgbPaginationNext = /** @class */ (function () {
        function NgbPaginationNext(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPaginationNext;
    }());
    NgbPaginationNext.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPaginationNext]' },] }
    ];
    NgbPaginationNext.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A directive to match the page 'number' link template
     *
     * @since 4.1.0
     */
    var NgbPaginationNumber = /** @class */ (function () {
        function NgbPaginationNumber(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPaginationNumber;
    }());
    NgbPaginationNumber.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPaginationNumber]' },] }
    ];
    NgbPaginationNumber.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A directive to match the 'previous' link template
     *
     * @since 4.1.0
     */
    var NgbPaginationPrevious = /** @class */ (function () {
        function NgbPaginationPrevious(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPaginationPrevious;
    }());
    NgbPaginationPrevious.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPaginationPrevious]' },] }
    ];
    NgbPaginationPrevious.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A directive to match the 'pages' whole content
     *
     * @since 9.1.0
     */
    var NgbPaginationPages = /** @class */ (function () {
        function NgbPaginationPages(templateRef) {
            this.templateRef = templateRef;
        }
        return NgbPaginationPages;
    }());
    NgbPaginationPages.decorators = [
        { type: i0.Directive, args: [{ selector: 'ng-template[ngbPaginationPages]' },] }
    ];
    NgbPaginationPages.ctorParameters = function () { return [
        { type: i0.TemplateRef }
    ]; };
    /**
     * A component that displays page numbers and allows to customize them in several ways.
     */
    var NgbPagination = /** @class */ (function () {
        function NgbPagination(config) {
            this.pageCount = 0;
            this.pages = [];
            /**
             *  The current page.
             *
             *  Page numbers start with `1`.
             */
            this.page = 1;
            /**
             *  An event fired when the page is changed. Will fire only if collection size is set and all values are valid.
             *
             *  Event payload is the number of the newly selected page.
             *
             *  Page numbers start with `1`.
             */
            this.pageChange = new i0.EventEmitter(true);
            this.disabled = config.disabled;
            this.boundaryLinks = config.boundaryLinks;
            this.directionLinks = config.directionLinks;
            this.ellipses = config.ellipses;
            this.maxSize = config.maxSize;
            this.pageSize = config.pageSize;
            this.rotate = config.rotate;
            this.size = config.size;
        }
        NgbPagination.prototype.hasPrevious = function () { return this.page > 1; };
        NgbPagination.prototype.hasNext = function () { return this.page < this.pageCount; };
        NgbPagination.prototype.nextDisabled = function () { return !this.hasNext() || this.disabled; };
        NgbPagination.prototype.previousDisabled = function () { return !this.hasPrevious() || this.disabled; };
        NgbPagination.prototype.selectPage = function (pageNumber) { this._updatePages(pageNumber); };
        NgbPagination.prototype.ngOnChanges = function (changes) { this._updatePages(this.page); };
        NgbPagination.prototype.isEllipsis = function (pageNumber) { return pageNumber === -1; };
        /**
         * Appends ellipses and first/last page number to the displayed pages
         */
        NgbPagination.prototype._applyEllipses = function (start, end) {
            if (this.ellipses) {
                if (start > 0) {
                    // The first page will always be included. If the displayed range
                    // starts after the third page, then add ellipsis. But if the range
                    // starts on the third page, then add the second page instead of
                    // an ellipsis, because the ellipsis would only hide a single page.
                    if (start > 2) {
                        this.pages.unshift(-1);
                    }
                    else if (start === 2) {
                        this.pages.unshift(2);
                    }
                    this.pages.unshift(1);
                }
                if (end < this.pageCount) {
                    // The last page will always be included. If the displayed range
                    // ends before the third-last page, then add ellipsis. But if the range
                    // ends on third-last page, then add the second-last page instead of
                    // an ellipsis, because the ellipsis would only hide a single page.
                    if (end < (this.pageCount - 2)) {
                        this.pages.push(-1);
                    }
                    else if (end === (this.pageCount - 2)) {
                        this.pages.push(this.pageCount - 1);
                    }
                    this.pages.push(this.pageCount);
                }
            }
        };
        /**
         * Rotates page numbers based on maxSize items visible.
         * Currently selected page stays in the middle:
         *
         * Ex. for selected page = 6:
         * [5,*6*,7] for maxSize = 3
         * [4,5,*6*,7] for maxSize = 4
         */
        NgbPagination.prototype._applyRotation = function () {
            var start = 0;
            var end = this.pageCount;
            var leftOffset = Math.floor(this.maxSize / 2);
            var rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
            if (this.page <= leftOffset) {
                // very beginning, no rotation -> [0..maxSize]
                end = this.maxSize;
            }
            else if (this.pageCount - this.page < leftOffset) {
                // very end, no rotation -> [len-maxSize..len]
                start = this.pageCount - this.maxSize;
            }
            else {
                // rotate
                start = this.page - leftOffset - 1;
                end = this.page + rightOffset;
            }
            return [start, end];
        };
        /**
         * Paginates page numbers based on maxSize items per page.
         */
        NgbPagination.prototype._applyPagination = function () {
            var page = Math.ceil(this.page / this.maxSize) - 1;
            var start = page * this.maxSize;
            var end = start + this.maxSize;
            return [start, end];
        };
        NgbPagination.prototype._setPageInRange = function (newPageNo) {
            var prevPageNo = this.page;
            this.page = getValueInRange(newPageNo, this.pageCount, 1);
            if (this.page !== prevPageNo && isNumber(this.collectionSize)) {
                this.pageChange.emit(this.page);
            }
        };
        NgbPagination.prototype._updatePages = function (newPage) {
            var _a, _b;
            this.pageCount = Math.ceil(this.collectionSize / this.pageSize);
            if (!isNumber(this.pageCount)) {
                this.pageCount = 0;
            }
            // fill-in model needed to render pages
            this.pages.length = 0;
            for (var i = 1; i <= this.pageCount; i++) {
                this.pages.push(i);
            }
            // set page within 1..max range
            this._setPageInRange(newPage);
            // apply maxSize if necessary
            if (this.maxSize > 0 && this.pageCount > this.maxSize) {
                var start = 0;
                var end = this.pageCount;
                // either paginating or rotating page numbers
                if (this.rotate) {
                    _a = __read(this._applyRotation(), 2), start = _a[0], end = _a[1];
                }
                else {
                    _b = __read(this._applyPagination(), 2), start = _b[0], end = _b[1];
                }
                this.pages = this.pages.slice(start, end);
                // adding ellipses
                this._applyEllipses(start, end);
            }
        };
        return NgbPagination;
    }());
    NgbPagination.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-pagination',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    host: { 'role': 'navigation' },
                    template: "\n    <ng-template #first><span aria-hidden=\"true\" i18n=\"@@ngb.pagination.first\">&laquo;&laquo;</span></ng-template>\n    <ng-template #previous><span aria-hidden=\"true\" i18n=\"@@ngb.pagination.previous\">&laquo;</span></ng-template>\n    <ng-template #next><span aria-hidden=\"true\" i18n=\"@@ngb.pagination.next\">&raquo;</span></ng-template>\n    <ng-template #last><span aria-hidden=\"true\" i18n=\"@@ngb.pagination.last\">&raquo;&raquo;</span></ng-template>\n    <ng-template #ellipsis>...</ng-template>\n    <ng-template #defaultNumber let-page let-currentPage=\"currentPage\">\n      {{ page }}\n      <span *ngIf=\"page === currentPage\" class=\"sr-only\">(current)</span>\n    </ng-template>\n    <ng-template #defaultPages let-page let-pages=\"pages\" let-disabled=\"disabled\">\n      <li *ngFor=\"let pageNumber of pages\" class=\"page-item\" [class.active]=\"pageNumber === page\"\n        [class.disabled]=\"isEllipsis(pageNumber) || disabled\" [attr.aria-current]=\"(pageNumber === page ? 'page' : null)\">\n        <a *ngIf=\"isEllipsis(pageNumber)\" class=\"page-link\" tabindex=\"-1\" aria-disabled=\"true\">\n          <ng-template [ngTemplateOutlet]=\"tplEllipsis?.templateRef || ellipsis\"\n                      [ngTemplateOutletContext]=\"{disabled: true, currentPage: page}\"></ng-template>\n        </a>\n        <a *ngIf=\"!isEllipsis(pageNumber)\" class=\"page-link\" href (click)=\"selectPage(pageNumber); $event.preventDefault()\"\n          [attr.tabindex]=\"disabled ? '-1' : null\" [attr.aria-disabled]=\"disabled ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplNumber?.templateRef || defaultNumber\"\n                      [ngTemplateOutletContext]=\"{disabled: disabled, $implicit: pageNumber, currentPage: page}\"></ng-template>\n        </a>\n      </li>\n    </ng-template>\n    <ul [class]=\"'pagination' + (size ? ' pagination-' + size : '')\">\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\"\n        [class.disabled]=\"previousDisabled()\">\n        <a aria-label=\"First\" i18n-aria-label=\"@@ngb.pagination.first-aria\" class=\"page-link\" href\n          (click)=\"selectPage(1); $event.preventDefault()\" [attr.tabindex]=\"previousDisabled() ? '-1' : null\"\n          [attr.aria-disabled]=\"previousDisabled() ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplFirst?.templateRef || first\"\n                       [ngTemplateOutletContext]=\"{disabled: previousDisabled(), currentPage: page}\"></ng-template>\n        </a>\n      </li>\n\n      <li *ngIf=\"directionLinks\" class=\"page-item\"\n        [class.disabled]=\"previousDisabled()\">\n        <a aria-label=\"Previous\" i18n-aria-label=\"@@ngb.pagination.previous-aria\" class=\"page-link\" href\n          (click)=\"selectPage(page-1); $event.preventDefault()\" [attr.tabindex]=\"previousDisabled() ? '-1' : null\"\n          [attr.aria-disabled]=\"previousDisabled() ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplPrevious?.templateRef || previous\"\n                       [ngTemplateOutletContext]=\"{disabled: previousDisabled()}\"></ng-template>\n        </a>\n      </li>\n      <ng-template\n        [ngTemplateOutlet]=\"tplPages?.templateRef || defaultPages\"\n        [ngTemplateOutletContext]=\"{ $implicit: page, pages: pages, disabled: disabled }\"\n      >\n      </ng-template>\n      <li *ngIf=\"directionLinks\" class=\"page-item\" [class.disabled]=\"nextDisabled()\">\n        <a aria-label=\"Next\" i18n-aria-label=\"@@ngb.pagination.next-aria\" class=\"page-link\" href\n          (click)=\"selectPage(page+1); $event.preventDefault()\" [attr.tabindex]=\"nextDisabled() ? '-1' : null\"\n          [attr.aria-disabled]=\"nextDisabled() ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplNext?.templateRef || next\"\n                       [ngTemplateOutletContext]=\"{disabled: nextDisabled(), currentPage: page}\"></ng-template>\n        </a>\n      </li>\n\n      <li *ngIf=\"boundaryLinks\" class=\"page-item\" [class.disabled]=\"nextDisabled()\">\n        <a aria-label=\"Last\" i18n-aria-label=\"@@ngb.pagination.last-aria\" class=\"page-link\" href\n          (click)=\"selectPage(pageCount); $event.preventDefault()\" [attr.tabindex]=\"nextDisabled() ? '-1' : null\"\n          [attr.aria-disabled]=\"nextDisabled() ? 'true' : null\">\n          <ng-template [ngTemplateOutlet]=\"tplLast?.templateRef || last\"\n                       [ngTemplateOutletContext]=\"{disabled: nextDisabled(), currentPage: page}\"></ng-template>\n        </a>\n      </li>\n    </ul>\n  "
                },] }
    ];
    NgbPagination.ctorParameters = function () { return [
        { type: NgbPaginationConfig }
    ]; };
    NgbPagination.propDecorators = {
        tplEllipsis: [{ type: i0.ContentChild, args: [NgbPaginationEllipsis, { static: false },] }],
        tplFirst: [{ type: i0.ContentChild, args: [NgbPaginationFirst, { static: false },] }],
        tplLast: [{ type: i0.ContentChild, args: [NgbPaginationLast, { static: false },] }],
        tplNext: [{ type: i0.ContentChild, args: [NgbPaginationNext, { static: false },] }],
        tplNumber: [{ type: i0.ContentChild, args: [NgbPaginationNumber, { static: false },] }],
        tplPrevious: [{ type: i0.ContentChild, args: [NgbPaginationPrevious, { static: false },] }],
        tplPages: [{ type: i0.ContentChild, args: [NgbPaginationPages, { static: false },] }],
        disabled: [{ type: i0.Input }],
        boundaryLinks: [{ type: i0.Input }],
        directionLinks: [{ type: i0.Input }],
        ellipses: [{ type: i0.Input }],
        rotate: [{ type: i0.Input }],
        collectionSize: [{ type: i0.Input }],
        maxSize: [{ type: i0.Input }],
        page: [{ type: i0.Input }],
        pageSize: [{ type: i0.Input }],
        pageChange: [{ type: i0.Output }],
        size: [{ type: i0.Input }]
    };

    var DIRECTIVES = [
        NgbPagination, NgbPaginationEllipsis, NgbPaginationFirst, NgbPaginationLast, NgbPaginationNext, NgbPaginationNumber,
        NgbPaginationPrevious, NgbPaginationPages
    ];
    var NgbPaginationModule = /** @class */ (function () {
        function NgbPaginationModule() {
        }
        return NgbPaginationModule;
    }());
    NgbPaginationModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: DIRECTIVES, exports: DIRECTIVES, imports: [i1.CommonModule] },] }
    ];

    var Trigger = /** @class */ (function () {
        function Trigger(open, close) {
            this.open = open;
            this.close = close;
            if (!close) {
                this.close = open;
            }
        }
        Trigger.prototype.isManual = function () { return this.open === 'manual' || this.close === 'manual'; };
        return Trigger;
    }());
    var DEFAULT_ALIASES = {
        'hover': ['mouseenter', 'mouseleave'],
        'focus': ['focusin', 'focusout'],
    };
    function parseTriggers(triggers, aliases) {
        if (aliases === void 0) { aliases = DEFAULT_ALIASES; }
        var trimmedTriggers = (triggers || '').trim();
        if (trimmedTriggers.length === 0) {
            return [];
        }
        var parsedTriggers = trimmedTriggers.split(/\s+/).map(function (trigger) { return trigger.split(':'); }).map(function (triggerPair) {
            var alias = aliases[triggerPair[0]] || triggerPair;
            return new Trigger(alias[0], alias[1]);
        });
        var manualTriggers = parsedTriggers.filter(function (triggerPair) { return triggerPair.isManual(); });
        if (manualTriggers.length > 1) {
            throw 'Triggers parse error: only one manual trigger is allowed';
        }
        if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
            throw 'Triggers parse error: manual trigger can\'t be mixed with other triggers';
        }
        return parsedTriggers;
    }
    function observeTriggers(renderer, nativeElement, triggers, isOpenedFn) {
        return new rxjs.Observable(function (subscriber) {
            var listeners = [];
            var openFn = function () { return subscriber.next(true); };
            var closeFn = function () { return subscriber.next(false); };
            var toggleFn = function () { return subscriber.next(!isOpenedFn()); };
            triggers.forEach(function (trigger) {
                if (trigger.open === trigger.close) {
                    listeners.push(renderer.listen(nativeElement, trigger.open, toggleFn));
                }
                else {
                    listeners.push(renderer.listen(nativeElement, trigger.open, openFn), renderer.listen(nativeElement, trigger.close, closeFn));
                }
            });
            return function () { listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); }); };
        });
    }
    var delayOrNoop = function (time) { return time > 0 ? operators.delay(time) : function (a) { return a; }; };
    var ɵ0$5 = delayOrNoop;
    function triggerDelay(openDelay, closeDelay, isOpenedFn) {
        return function (input$) {
            var pending = null;
            var filteredInput$ = input$.pipe(operators.map(function (open) { return ({ open: open }); }), operators.filter(function (event) {
                var currentlyOpen = isOpenedFn();
                if (currentlyOpen !== event.open && (!pending || pending.open === currentlyOpen)) {
                    pending = event;
                    return true;
                }
                if (pending && pending.open !== event.open) {
                    pending = null;
                }
                return false;
            }), operators.share());
            var delayedOpen$ = filteredInput$.pipe(operators.filter(function (event) { return event.open; }), delayOrNoop(openDelay));
            var delayedClose$ = filteredInput$.pipe(operators.filter(function (event) { return !event.open; }), delayOrNoop(closeDelay));
            return rxjs.merge(delayedOpen$, delayedClose$)
                .pipe(operators.filter(function (event) {
                if (event === pending) {
                    pending = null;
                    return event.open !== isOpenedFn();
                }
                return false;
            }), operators.map(function (event) { return event.open; }));
        };
    }
    function listenToTriggers(renderer, nativeElement, triggers, isOpenedFn, openFn, closeFn, openDelay, closeDelay) {
        if (openDelay === void 0) { openDelay = 0; }
        if (closeDelay === void 0) { closeDelay = 0; }
        var parsedTriggers = parseTriggers(triggers);
        if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
            return function () { };
        }
        var subscription = observeTriggers(renderer, nativeElement, parsedTriggers, isOpenedFn)
            .pipe(triggerDelay(openDelay, closeDelay, isOpenedFn))
            .subscribe(function (open) { return (open ? openFn() : closeFn()); });
        return function () { return subscription.unsubscribe(); };
    }

    /**
     * A configuration service for the [`NgbPopover`](#/components/popover/api#NgbPopover) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the popovers used in the application.
     */
    var NgbPopoverConfig = /** @class */ (function () {
        function NgbPopoverConfig(_ngbConfig) {
            this._ngbConfig = _ngbConfig;
            this.autoClose = true;
            this.placement = 'auto';
            this.triggers = 'click';
            this.disablePopover = false;
            this.openDelay = 0;
            this.closeDelay = 0;
        }
        Object.defineProperty(NgbPopoverConfig.prototype, "animation", {
            get: function () { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; },
            set: function (animation) { this._animation = animation; },
            enumerable: false,
            configurable: true
        });
        return NgbPopoverConfig;
    }());
    NgbPopoverConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbPopoverConfig_Factory() { return new NgbPopoverConfig(i0.ɵɵinject(NgbConfig)); }, token: NgbPopoverConfig, providedIn: "root" });
    NgbPopoverConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbPopoverConfig.ctorParameters = function () { return [
        { type: NgbConfig }
    ]; };

    var nextId$3 = 0;
    var NgbPopoverWindow = /** @class */ (function () {
        function NgbPopoverWindow() {
        }
        NgbPopoverWindow.prototype.isTitleTemplate = function () { return this.title instanceof i0.TemplateRef; };
        return NgbPopoverWindow;
    }());
    NgbPopoverWindow.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-popover-window',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    host: {
                        '[class]': '"popover" + (popoverClass ? " " + popoverClass : "")',
                        '[class.fade]': 'animation',
                        'role': 'tooltip',
                        '[id]': 'id'
                    },
                    template: "\n    <div class=\"arrow\"></div>\n    <h3 class=\"popover-header\" *ngIf=\"title\">\n      <ng-template #simpleTitle>{{title}}</ng-template>\n      <ng-template [ngTemplateOutlet]=\"isTitleTemplate() ? $any(title) : simpleTitle\" [ngTemplateOutletContext]=\"context\"></ng-template>\n    </h3>\n    <div class=\"popover-body\"><ng-content></ng-content></div>",
                    styles: ["ngb-popover-window.bs-popover-bottom>.arrow,ngb-popover-window.bs-popover-top>.arrow{left:50%;margin-left:-.5rem}ngb-popover-window.bs-popover-bottom-left>.arrow,ngb-popover-window.bs-popover-top-left>.arrow{left:2em}ngb-popover-window.bs-popover-bottom-right>.arrow,ngb-popover-window.bs-popover-top-right>.arrow{left:auto;right:2em}ngb-popover-window.bs-popover-left>.arrow,ngb-popover-window.bs-popover-right>.arrow{margin-top:-.5rem;top:50%}ngb-popover-window.bs-popover-left-top>.arrow,ngb-popover-window.bs-popover-right-top>.arrow{top:.7em}ngb-popover-window.bs-popover-left-bottom>.arrow,ngb-popover-window.bs-popover-right-bottom>.arrow{bottom:.7em;top:auto}"]
                },] }
    ];
    NgbPopoverWindow.propDecorators = {
        animation: [{ type: i0.Input }],
        title: [{ type: i0.Input }],
        id: [{ type: i0.Input }],
        popoverClass: [{ type: i0.Input }],
        context: [{ type: i0.Input }]
    };
    /**
     * A lightweight and extensible directive for fancy popover creation.
     */
    var NgbPopover = /** @class */ (function () {
        function NgbPopover(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
            var _this = this;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._ngZone = _ngZone;
            this._document = _document;
            this._changeDetector = _changeDetector;
            /**
             * An event emitted when the popover opening animation has finished. Contains no payload.
             */
            this.shown = new i0.EventEmitter();
            /**
             * An event emitted when the popover closing animation has finished. Contains no payload.
             *
             * At this point popover is not in the DOM anymore.
             */
            this.hidden = new i0.EventEmitter();
            this._ngbPopoverWindowId = "ngb-popover-" + nextId$3++;
            this._windowRef = null;
            this.animation = config.animation;
            this.autoClose = config.autoClose;
            this.placement = config.placement;
            this.triggers = config.triggers;
            this.container = config.container;
            this.disablePopover = config.disablePopover;
            this.popoverClass = config.popoverClass;
            this.openDelay = config.openDelay;
            this.closeDelay = config.closeDelay;
            this._popupService = new PopupService(NgbPopoverWindow, injector, viewContainerRef, _renderer, this._ngZone, componentFactoryResolver, applicationRef);
            this._zoneSubscription = _ngZone.onStable.subscribe(function () {
                if (_this._windowRef) {
                    positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body', 'bs-popover');
                }
            });
        }
        NgbPopover.prototype._isDisabled = function () {
            if (this.disablePopover) {
                return true;
            }
            if (!this.ngbPopover && !this.popoverTitle) {
                return true;
            }
            return false;
        };
        /**
         * Opens the popover.
         *
         * This is considered to be a "manual" triggering.
         * The `context` is an optional value to be injected into the popover template when it is created.
         */
        NgbPopover.prototype.open = function (context) {
            var _this = this;
            if (!this._windowRef && !this._isDisabled()) {
                // this type assertion is safe because otherwise _isDisabled would return true
                var _a = this._popupService.open(this.ngbPopover, context, this.animation), windowRef = _a.windowRef, transition$ = _a.transition$;
                this._windowRef = windowRef;
                this._windowRef.instance.animation = this.animation;
                this._windowRef.instance.title = this.popoverTitle;
                this._windowRef.instance.context = context;
                this._windowRef.instance.popoverClass = this.popoverClass;
                this._windowRef.instance.id = this._ngbPopoverWindowId;
                this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbPopoverWindowId);
                if (this.container === 'body') {
                    this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
                }
                // We need to detect changes, because we don't know where .open() might be called from.
                // Ex. opening popover from one of lifecycle hooks that run after the CD
                // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
                this._windowRef.changeDetectorRef.detectChanges();
                // We need to mark for check, because popover won't work inside the OnPush component.
                // Ex. when we use expression like `{{ popover.isOpen() : 'opened' : 'closed' }}`
                // inside the template of an OnPush component and we change the popover from
                // open -> closed, the expression in question won't be updated unless we explicitly
                // mark the parent component to be checked.
                this._windowRef.changeDetectorRef.markForCheck();
                ngbAutoClose(this._ngZone, this._document, this.autoClose, function () { return _this.close(); }, this.hidden, [this._windowRef.location.nativeElement]);
                transition$.subscribe(function () { return _this.shown.emit(); });
            }
        };
        /**
         * Closes the popover.
         *
         * This is considered to be a "manual" triggering of the popover.
         */
        NgbPopover.prototype.close = function () {
            var _this = this;
            if (this._windowRef) {
                this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
                this._popupService.close(this.animation).subscribe(function () {
                    _this._windowRef = null;
                    _this.hidden.emit();
                    _this._changeDetector.markForCheck();
                });
            }
        };
        /**
         * Toggles the popover.
         *
         * This is considered to be a "manual" triggering of the popover.
         */
        NgbPopover.prototype.toggle = function () {
            if (this._windowRef) {
                this.close();
            }
            else {
                this.open();
            }
        };
        /**
         * Returns `true`, if the popover is currently shown.
         */
        NgbPopover.prototype.isOpen = function () { return this._windowRef != null; };
        NgbPopover.prototype.ngOnInit = function () {
            this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
        };
        NgbPopover.prototype.ngOnChanges = function (_a) {
            var ngbPopover = _a.ngbPopover, popoverTitle = _a.popoverTitle, disablePopover = _a.disablePopover, popoverClass = _a.popoverClass;
            if (popoverClass && this.isOpen()) {
                this._windowRef.instance.popoverClass = popoverClass.currentValue;
            }
            // close popover if title and content become empty, or disablePopover set to true
            if ((ngbPopover || popoverTitle || disablePopover) && this._isDisabled()) {
                this.close();
            }
        };
        NgbPopover.prototype.ngOnDestroy = function () {
            this.close();
            // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
            // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
            if (this._unregisterListenersFn) {
                this._unregisterListenersFn();
            }
            this._zoneSubscription.unsubscribe();
        };
        return NgbPopover;
    }());
    NgbPopover.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngbPopover]', exportAs: 'ngbPopover' },] }
    ];
    NgbPopover.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: i0.Injector },
        { type: i0.ComponentFactoryResolver },
        { type: i0.ViewContainerRef },
        { type: NgbPopoverConfig },
        { type: i0.NgZone },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: i0.ChangeDetectorRef },
        { type: i0.ApplicationRef }
    ]; };
    NgbPopover.propDecorators = {
        animation: [{ type: i0.Input }],
        autoClose: [{ type: i0.Input }],
        ngbPopover: [{ type: i0.Input }],
        popoverTitle: [{ type: i0.Input }],
        placement: [{ type: i0.Input }],
        triggers: [{ type: i0.Input }],
        container: [{ type: i0.Input }],
        disablePopover: [{ type: i0.Input }],
        popoverClass: [{ type: i0.Input }],
        openDelay: [{ type: i0.Input }],
        closeDelay: [{ type: i0.Input }],
        shown: [{ type: i0.Output }],
        hidden: [{ type: i0.Output }]
    };

    var NgbPopoverModule = /** @class */ (function () {
        function NgbPopoverModule() {
        }
        return NgbPopoverModule;
    }());
    NgbPopoverModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [NgbPopover, NgbPopoverWindow],
                    exports: [NgbPopover],
                    imports: [i1.CommonModule],
                    entryComponents: [NgbPopoverWindow]
                },] }
    ];

    /**
     * A configuration service for the [`NgbProgressbar`](#/components/progressbar/api#NgbProgressbar) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the progress bars used in the application.
     */
    var NgbProgressbarConfig = /** @class */ (function () {
        function NgbProgressbarConfig() {
            this.max = 100;
            this.animated = false;
            this.striped = false;
            this.showValue = false;
        }
        return NgbProgressbarConfig;
    }());
    NgbProgressbarConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbProgressbarConfig_Factory() { return new NgbProgressbarConfig(); }, token: NgbProgressbarConfig, providedIn: "root" });
    NgbProgressbarConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    /**
     * A directive that provides feedback on the progress of a workflow or an action.
     */
    var NgbProgressbar = /** @class */ (function () {
        function NgbProgressbar(config) {
            /**
             * The current value for the progress bar.
             *
             * Should be in the `[0, max]` range.
             */
            this.value = 0;
            this.max = config.max;
            this.animated = config.animated;
            this.striped = config.striped;
            this.textType = config.textType;
            this.type = config.type;
            this.showValue = config.showValue;
            this.height = config.height;
        }
        Object.defineProperty(NgbProgressbar.prototype, "max", {
            get: function () { return this._max; },
            /**
             * The maximal value to be displayed in the progress bar.
             *
             * Should be a positive number. Will default to 100 otherwise.
             */
            set: function (max) {
                this._max = !isNumber(max) || max <= 0 ? 100 : max;
            },
            enumerable: false,
            configurable: true
        });
        NgbProgressbar.prototype.getValue = function () { return getValueInRange(this.value, this.max); };
        NgbProgressbar.prototype.getPercentValue = function () { return 100 * this.getValue() / this.max; };
        return NgbProgressbar;
    }());
    NgbProgressbar.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-progressbar',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    host: { class: 'progress' },
                    template: "\n    <div class=\"progress-bar{{type ? ' bg-' + type : ''}}{{textType ? ' text-' + textType : ''}}\n    {{animated ? ' progress-bar-animated' : ''}}{{striped ? ' progress-bar-striped' : ''}}\"\n    role=\"progressbar\" [style.width.%]=\"getPercentValue()\"\n    [attr.aria-valuenow]=\"getValue()\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"max\">\n      <span *ngIf=\"showValue\" i18n=\"@@ngb.progressbar.value\">{{getValue() / max | percent}}</span><ng-content></ng-content>\n    </div>\n  "
                },] }
    ];
    NgbProgressbar.ctorParameters = function () { return [
        { type: NgbProgressbarConfig }
    ]; };
    NgbProgressbar.propDecorators = {
        max: [{ type: i0.Input }],
        animated: [{ type: i0.Input }],
        striped: [{ type: i0.Input }],
        showValue: [{ type: i0.Input }],
        textType: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        value: [{ type: i0.Input }],
        height: [{ type: i0.Input }, { type: i0.HostBinding, args: ['style.height',] }]
    };

    var NgbProgressbarModule = /** @class */ (function () {
        function NgbProgressbarModule() {
        }
        return NgbProgressbarModule;
    }());
    NgbProgressbarModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: [NgbProgressbar], exports: [NgbProgressbar], imports: [i1.CommonModule] },] }
    ];

    /**
     * A configuration service for the [`NgbRating`](#/components/rating/api#NgbRating) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the ratings used in the application.
     */
    var NgbRatingConfig = /** @class */ (function () {
        function NgbRatingConfig() {
            this.max = 10;
            this.readonly = false;
            this.resettable = false;
        }
        return NgbRatingConfig;
    }());
    NgbRatingConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbRatingConfig_Factory() { return new NgbRatingConfig(); }, token: NgbRatingConfig, providedIn: "root" });
    NgbRatingConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    /**
     * A directive that helps visualising and interacting with a star rating bar.
     */
    var NgbRating = /** @class */ (function () {
        function NgbRating(config, _changeDetectorRef) {
            this._changeDetectorRef = _changeDetectorRef;
            this.contexts = [];
            this.disabled = false;
            /**
             * An event emitted when the user is hovering over a given rating.
             *
             * Event payload equals to the rating being hovered over.
             */
            this.hover = new i0.EventEmitter();
            /**
             * An event emitted when the user stops hovering over a given rating.
             *
             * Event payload equals to the rating of the last item being hovered over.
             */
            this.leave = new i0.EventEmitter();
            /**
             * An event emitted when the user selects a new rating.
             *
             * Event payload equals to the newly selected rating.
             */
            this.rateChange = new i0.EventEmitter(true);
            this.onChange = function (_) { };
            this.onTouched = function () { };
            this.max = config.max;
            this.readonly = config.readonly;
        }
        NgbRating.prototype.ariaValueText = function () { return this.nextRate + " out of " + this.max; };
        NgbRating.prototype.isInteractive = function () { return !this.readonly && !this.disabled; };
        NgbRating.prototype.enter = function (value) {
            if (this.isInteractive()) {
                this._updateState(value);
            }
            this.hover.emit(value);
        };
        NgbRating.prototype.handleBlur = function () { this.onTouched(); };
        NgbRating.prototype.handleClick = function (value) {
            if (this.isInteractive()) {
                this.update(this.resettable && this.rate === value ? 0 : value);
            }
        };
        NgbRating.prototype.handleKeyDown = function (event) {
            // tslint:disable-next-line:deprecation
            switch (event.which) {
                case Key.ArrowDown:
                case Key.ArrowLeft:
                    this.update(this.rate - 1);
                    break;
                case Key.ArrowUp:
                case Key.ArrowRight:
                    this.update(this.rate + 1);
                    break;
                case Key.Home:
                    this.update(0);
                    break;
                case Key.End:
                    this.update(this.max);
                    break;
                default:
                    return;
            }
            // note 'return' in default case
            event.preventDefault();
        };
        NgbRating.prototype.ngOnChanges = function (changes) {
            if (changes['rate']) {
                this.update(this.rate);
            }
        };
        NgbRating.prototype.ngOnInit = function () {
            this.contexts = Array.from({ length: this.max }, function (v, k) { return ({ fill: 0, index: k }); });
            this._updateState(this.rate);
        };
        NgbRating.prototype.registerOnChange = function (fn) { this.onChange = fn; };
        NgbRating.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        NgbRating.prototype.reset = function () {
            this.leave.emit(this.nextRate);
            this._updateState(this.rate);
        };
        NgbRating.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
        NgbRating.prototype.update = function (value, internalChange) {
            if (internalChange === void 0) { internalChange = true; }
            var newRate = getValueInRange(value, this.max, 0);
            if (this.isInteractive() && this.rate !== newRate) {
                this.rate = newRate;
                this.rateChange.emit(this.rate);
            }
            if (internalChange) {
                this.onChange(this.rate);
                this.onTouched();
            }
            this._updateState(this.rate);
        };
        NgbRating.prototype.writeValue = function (value) {
            this.update(value, false);
            this._changeDetectorRef.markForCheck();
        };
        NgbRating.prototype._updateState = function (nextValue) {
            this.nextRate = nextValue;
            this.contexts.forEach(function (context, index) { return context.fill = Math.round(getValueInRange(nextValue - index, 1, 0) * 100); });
        };
        return NgbRating;
    }());
    NgbRating.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-rating',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    host: {
                        'class': 'd-inline-flex',
                        '[tabindex]': 'disabled ? -1 : 0',
                        'role': 'slider',
                        'aria-valuemin': '0',
                        '[attr.aria-valuemax]': 'max',
                        '[attr.aria-valuenow]': 'nextRate',
                        '[attr.aria-valuetext]': 'ariaValueText()',
                        '[attr.aria-disabled]': 'readonly ? true : null',
                        '(blur)': 'handleBlur()',
                        '(keydown)': 'handleKeyDown($event)',
                        '(mouseleave)': 'reset()'
                    },
                    template: "\n    <ng-template #t let-fill=\"fill\">{{ fill === 100 ? '&#9733;' : '&#9734;' }}</ng-template>\n    <ng-template ngFor [ngForOf]=\"contexts\" let-index=\"index\">\n      <span class=\"sr-only\">({{ index < nextRate ? '*' : ' ' }})</span>\n      <span (mouseenter)=\"enter(index + 1)\" (click)=\"handleClick(index + 1)\" [style.cursor]=\"isInteractive() ? 'pointer' : 'default'\">\n        <ng-template [ngTemplateOutlet]=\"starTemplate || starTemplateFromContent || t\" [ngTemplateOutletContext]=\"contexts[index]\">\n        </ng-template>\n      </span>\n    </ng-template>\n  ",
                    providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: i0.forwardRef(function () { return NgbRating; }), multi: true }]
                },] }
    ];
    NgbRating.ctorParameters = function () { return [
        { type: NgbRatingConfig },
        { type: i0.ChangeDetectorRef }
    ]; };
    NgbRating.propDecorators = {
        max: [{ type: i0.Input }],
        rate: [{ type: i0.Input }],
        readonly: [{ type: i0.Input }],
        resettable: [{ type: i0.Input }],
        starTemplate: [{ type: i0.Input }],
        starTemplateFromContent: [{ type: i0.ContentChild, args: [i0.TemplateRef, { static: false },] }],
        hover: [{ type: i0.Output }],
        leave: [{ type: i0.Output }],
        rateChange: [{ type: i0.Output }]
    };

    var NgbRatingModule = /** @class */ (function () {
        function NgbRatingModule() {
        }
        return NgbRatingModule;
    }());
    NgbRatingModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: [NgbRating], exports: [NgbRating], imports: [i1.CommonModule] },] }
    ];

    var NgbTime = /** @class */ (function () {
        function NgbTime(hour, minute, second) {
            this.hour = toInteger(hour);
            this.minute = toInteger(minute);
            this.second = toInteger(second);
        }
        NgbTime.prototype.changeHour = function (step) {
            if (step === void 0) { step = 1; }
            this.updateHour((isNaN(this.hour) ? 0 : this.hour) + step);
        };
        NgbTime.prototype.updateHour = function (hour) {
            if (isNumber(hour)) {
                this.hour = (hour < 0 ? 24 + hour : hour) % 24;
            }
            else {
                this.hour = NaN;
            }
        };
        NgbTime.prototype.changeMinute = function (step) {
            if (step === void 0) { step = 1; }
            this.updateMinute((isNaN(this.minute) ? 0 : this.minute) + step);
        };
        NgbTime.prototype.updateMinute = function (minute) {
            if (isNumber(minute)) {
                this.minute = minute % 60 < 0 ? 60 + minute % 60 : minute % 60;
                this.changeHour(Math.floor(minute / 60));
            }
            else {
                this.minute = NaN;
            }
        };
        NgbTime.prototype.changeSecond = function (step) {
            if (step === void 0) { step = 1; }
            this.updateSecond((isNaN(this.second) ? 0 : this.second) + step);
        };
        NgbTime.prototype.updateSecond = function (second) {
            if (isNumber(second)) {
                this.second = second < 0 ? 60 + second % 60 : second % 60;
                this.changeMinute(Math.floor(second / 60));
            }
            else {
                this.second = NaN;
            }
        };
        NgbTime.prototype.isValid = function (checkSecs) {
            if (checkSecs === void 0) { checkSecs = true; }
            return isNumber(this.hour) && isNumber(this.minute) && (checkSecs ? isNumber(this.second) : true);
        };
        NgbTime.prototype.toString = function () { return (this.hour || 0) + ":" + (this.minute || 0) + ":" + (this.second || 0); };
        return NgbTime;
    }());

    /**
     * A configuration service for the [`NgbTimepicker`](#/components/timepicker/api#NgbTimepicker) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the timepickers used in the application.
     */
    var NgbTimepickerConfig = /** @class */ (function () {
        function NgbTimepickerConfig() {
            this.meridian = false;
            this.spinners = true;
            this.seconds = false;
            this.hourStep = 1;
            this.minuteStep = 1;
            this.secondStep = 1;
            this.disabled = false;
            this.readonlyInputs = false;
            this.size = 'medium';
        }
        return NgbTimepickerConfig;
    }());
    NgbTimepickerConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbTimepickerConfig_Factory() { return new NgbTimepickerConfig(); }, token: NgbTimepickerConfig, providedIn: "root" });
    NgbTimepickerConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
        return new NgbTimeStructAdapter();
    }
    /**
     * An abstract service that does the conversion between the internal timepicker `NgbTimeStruct` model and
     * any provided user time model `T`, ex. a string, a native date, etc.
     *
     * The adapter is used **only** for conversion when binding timepicker to a form control,
     * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
     *
     * The default timepicker implementation assumes we use `NgbTimeStruct` as a user model.
     *
     * See the [custom time adapter demo](#/components/timepicker/examples#adapter) for an example.
     *
     * @since 2.2.0
     */
    var NgbTimeAdapter = /** @class */ (function () {
        function NgbTimeAdapter() {
        }
        return NgbTimeAdapter;
    }());
    NgbTimeAdapter.ɵprov = i0.ɵɵdefineInjectable({ factory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY, token: NgbTimeAdapter, providedIn: "root" });
    NgbTimeAdapter.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY },] }
    ];
    var NgbTimeStructAdapter = /** @class */ (function (_super) {
        __extends(NgbTimeStructAdapter, _super);
        function NgbTimeStructAdapter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * Converts a NgbTimeStruct value into NgbTimeStruct value
         */
        NgbTimeStructAdapter.prototype.fromModel = function (time) {
            return (time && isInteger(time.hour) && isInteger(time.minute)) ?
                { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
                null;
        };
        /**
         * Converts a NgbTimeStruct value into NgbTimeStruct value
         */
        NgbTimeStructAdapter.prototype.toModel = function (time) {
            return (time && isInteger(time.hour) && isInteger(time.minute)) ?
                { hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : null } :
                null;
        };
        return NgbTimeStructAdapter;
    }(NgbTimeAdapter));
    NgbTimeStructAdapter.decorators = [
        { type: i0.Injectable }
    ];

    function NGB_TIMEPICKER_I18N_FACTORY(locale) {
        return new NgbTimepickerI18nDefault(locale);
    }
    /**
     * Type of the service supplying day periods (for example, 'AM' and 'PM') to NgbTimepicker component.
     * The default implementation of this service honors the Angular locale, and uses the registered locale data,
     * as explained in the Angular i18n guide.
     */
    var NgbTimepickerI18n = /** @class */ (function () {
        function NgbTimepickerI18n() {
        }
        return NgbTimepickerI18n;
    }());
    NgbTimepickerI18n.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbTimepickerI18n_Factory() { return NGB_TIMEPICKER_I18N_FACTORY(i0.ɵɵinject(i0.LOCALE_ID)); }, token: NgbTimepickerI18n, providedIn: "root" });
    NgbTimepickerI18n.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root', useFactory: NGB_TIMEPICKER_I18N_FACTORY, deps: [i0.LOCALE_ID] },] }
    ];
    var NgbTimepickerI18nDefault = /** @class */ (function (_super) {
        __extends(NgbTimepickerI18nDefault, _super);
        function NgbTimepickerI18nDefault(locale) {
            var _this = _super.call(this) || this;
            _this._periods = i1.getLocaleDayPeriods(locale, i1.FormStyle.Standalone, i1.TranslationWidth.Narrow);
            return _this;
        }
        NgbTimepickerI18nDefault.prototype.getMorningPeriod = function () { return this._periods[0]; };
        NgbTimepickerI18nDefault.prototype.getAfternoonPeriod = function () { return this._periods[1]; };
        return NgbTimepickerI18nDefault;
    }(NgbTimepickerI18n));
    NgbTimepickerI18nDefault.decorators = [
        { type: i0.Injectable }
    ];
    NgbTimepickerI18nDefault.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Inject, args: [i0.LOCALE_ID,] }] }
    ]; };

    var FILTER_REGEX = /[^0-9]/g;
    /**
     * A directive that helps with wth picking hours, minutes and seconds.
     */
    var NgbTimepicker = /** @class */ (function () {
        function NgbTimepicker(_config, _ngbTimeAdapter, _cd, i18n) {
            this._config = _config;
            this._ngbTimeAdapter = _ngbTimeAdapter;
            this._cd = _cd;
            this.i18n = i18n;
            this.onChange = function (_) { };
            this.onTouched = function () { };
            this.meridian = _config.meridian;
            this.spinners = _config.spinners;
            this.seconds = _config.seconds;
            this.hourStep = _config.hourStep;
            this.minuteStep = _config.minuteStep;
            this.secondStep = _config.secondStep;
            this.disabled = _config.disabled;
            this.readonlyInputs = _config.readonlyInputs;
            this.size = _config.size;
        }
        Object.defineProperty(NgbTimepicker.prototype, "hourStep", {
            get: function () { return this._hourStep; },
            /**
             * The number of hours to add/subtract when clicking hour spinners.
             */
            set: function (step) {
                this._hourStep = isInteger(step) ? step : this._config.hourStep;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbTimepicker.prototype, "minuteStep", {
            get: function () { return this._minuteStep; },
            /**
             * The number of minutes to add/subtract when clicking minute spinners.
             */
            set: function (step) {
                this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbTimepicker.prototype, "secondStep", {
            get: function () { return this._secondStep; },
            /**
             * The number of seconds to add/subtract when clicking second spinners.
             */
            set: function (step) {
                this._secondStep = isInteger(step) ? step : this._config.secondStep;
            },
            enumerable: false,
            configurable: true
        });
        NgbTimepicker.prototype.writeValue = function (value) {
            var structValue = this._ngbTimeAdapter.fromModel(value);
            this.model = structValue ? new NgbTime(structValue.hour, structValue.minute, structValue.second) : new NgbTime();
            if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
                this.model.second = 0;
            }
            this._cd.markForCheck();
        };
        NgbTimepicker.prototype.registerOnChange = function (fn) { this.onChange = fn; };
        NgbTimepicker.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        NgbTimepicker.prototype.setDisabledState = function (isDisabled) { this.disabled = isDisabled; };
        NgbTimepicker.prototype.changeHour = function (step) {
            this.model.changeHour(step);
            this.propagateModelChange();
        };
        NgbTimepicker.prototype.changeMinute = function (step) {
            this.model.changeMinute(step);
            this.propagateModelChange();
        };
        NgbTimepicker.prototype.changeSecond = function (step) {
            this.model.changeSecond(step);
            this.propagateModelChange();
        };
        NgbTimepicker.prototype.updateHour = function (newVal) {
            var isPM = this.model.hour >= 12;
            var enteredHour = toInteger(newVal);
            if (this.meridian && (isPM && enteredHour < 12 || !isPM && enteredHour === 12)) {
                this.model.updateHour(enteredHour + 12);
            }
            else {
                this.model.updateHour(enteredHour);
            }
            this.propagateModelChange();
        };
        NgbTimepicker.prototype.updateMinute = function (newVal) {
            this.model.updateMinute(toInteger(newVal));
            this.propagateModelChange();
        };
        NgbTimepicker.prototype.updateSecond = function (newVal) {
            this.model.updateSecond(toInteger(newVal));
            this.propagateModelChange();
        };
        NgbTimepicker.prototype.toggleMeridian = function () {
            if (this.meridian) {
                this.changeHour(12);
            }
        };
        NgbTimepicker.prototype.formatInput = function (input) { input.value = input.value.replace(FILTER_REGEX, ''); };
        NgbTimepicker.prototype.formatHour = function (value) {
            if (isNumber(value)) {
                if (this.meridian) {
                    return padNumber(value % 12 === 0 ? 12 : value % 12);
                }
                else {
                    return padNumber(value % 24);
                }
            }
            else {
                return padNumber(NaN);
            }
        };
        NgbTimepicker.prototype.formatMinSec = function (value) { return padNumber(isNumber(value) ? value : NaN); };
        Object.defineProperty(NgbTimepicker.prototype, "isSmallSize", {
            get: function () { return this.size === 'small'; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgbTimepicker.prototype, "isLargeSize", {
            get: function () { return this.size === 'large'; },
            enumerable: false,
            configurable: true
        });
        NgbTimepicker.prototype.ngOnChanges = function (changes) {
            if (changes['seconds'] && !this.seconds && this.model && !isNumber(this.model.second)) {
                this.model.second = 0;
                this.propagateModelChange(false);
            }
        };
        NgbTimepicker.prototype.propagateModelChange = function (touched) {
            if (touched === void 0) { touched = true; }
            if (touched) {
                this.onTouched();
            }
            if (this.model.isValid(this.seconds)) {
                this.onChange(this._ngbTimeAdapter.toModel({ hour: this.model.hour, minute: this.model.minute, second: this.model.second }));
            }
            else {
                this.onChange(this._ngbTimeAdapter.toModel(null));
            }
        };
        return NgbTimepicker;
    }());
    NgbTimepicker.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-timepicker',
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "\n    <fieldset [disabled]=\"disabled\" [class.disabled]=\"disabled\">\n      <div class=\"ngb-tp\">\n        <div class=\"ngb-tp-input-container ngb-tp-hour\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeHour(hourStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-hours\">Increment hours</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\"\n            [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" inputmode=\"numeric\" placeholder=\"HH\" i18n-placeholder=\"@@ngb.timepicker.HH\"\n            [value]=\"formatHour(model?.hour)\" (change)=\"updateHour($any($event).target.value)\"\n            [readOnly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Hours\" i18n-aria-label=\"@@ngb.timepicker.hours\"\n            (input)=\"formatInput($any($event).target)\"\n            (keydown.ArrowUp)=\"changeHour(hourStep); $event.preventDefault()\"\n            (keydown.ArrowDown)=\"changeHour(-hourStep); $event.preventDefault()\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeHour(-hourStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-hours\">Decrement hours</span>\n          </button>\n        </div>\n        <div class=\"ngb-tp-spacer\">:</div>\n        <div class=\"ngb-tp-input-container ngb-tp-minute\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeMinute(minuteStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-minutes\">Increment minutes</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\" [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" inputmode=\"numeric\" placeholder=\"MM\" i18n-placeholder=\"@@ngb.timepicker.MM\"\n            [value]=\"formatMinSec(model?.minute)\" (change)=\"updateMinute($any($event).target.value)\"\n            [readOnly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Minutes\" i18n-aria-label=\"@@ngb.timepicker.minutes\"\n            (input)=\"formatInput($any($event).target)\"\n            (keydown.ArrowUp)=\"changeMinute(minuteStep); $event.preventDefault()\"\n            (keydown.ArrowDown)=\"changeMinute(-minuteStep); $event.preventDefault()\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeMinute(-minuteStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"  [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\"  i18n=\"@@ngb.timepicker.decrement-minutes\">Decrement minutes</span>\n          </button>\n        </div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-spacer\">:</div>\n        <div *ngIf=\"seconds\" class=\"ngb-tp-input-container ngb-tp-second\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeSecond(secondStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\" [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.increment-seconds\">Increment seconds</span>\n          </button>\n          <input type=\"text\" class=\"ngb-tp-input form-control\" [class.form-control-sm]=\"isSmallSize\" [class.form-control-lg]=\"isLargeSize\"\n            maxlength=\"2\" inputmode=\"numeric\" placeholder=\"SS\" i18n-placeholder=\"@@ngb.timepicker.SS\"\n            [value]=\"formatMinSec(model?.second)\" (change)=\"updateSecond($any($event).target.value)\"\n            [readOnly]=\"readonlyInputs\" [disabled]=\"disabled\" aria-label=\"Seconds\" i18n-aria-label=\"@@ngb.timepicker.seconds\"\n            (input)=\"formatInput($any($event).target)\"\n            (keydown.ArrowUp)=\"changeSecond(secondStep); $event.preventDefault()\"\n            (keydown.ArrowDown)=\"changeSecond(-secondStep); $event.preventDefault()\">\n          <button *ngIf=\"spinners\" tabindex=\"-1\" type=\"button\" (click)=\"changeSecond(-secondStep)\"\n            class=\"btn btn-link\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"  [class.disabled]=\"disabled\"\n            [disabled]=\"disabled\">\n            <span class=\"chevron ngb-tp-chevron bottom\"></span>\n            <span class=\"sr-only\" i18n=\"@@ngb.timepicker.decrement-seconds\">Decrement seconds</span>\n          </button>\n        </div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-spacer\"></div>\n        <div *ngIf=\"meridian\" class=\"ngb-tp-meridian\">\n          <button type=\"button\" class=\"btn btn-outline-primary\" [class.btn-sm]=\"isSmallSize\" [class.btn-lg]=\"isLargeSize\"\n            [disabled]=\"disabled\" [class.disabled]=\"disabled\"\n                  (click)=\"toggleMeridian()\">\n            <ng-container *ngIf=\"model && model.hour >= 12; else am\"\n                          i18n=\"@@ngb.timepicker.PM\">{{ i18n.getAfternoonPeriod() }}</ng-container>\n            <ng-template #am i18n=\"@@ngb.timepicker.AM\">{{ i18n.getMorningPeriod() }}</ng-template>\n          </button>\n        </div>\n      </div>\n    </fieldset>\n  ",
                    providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: i0.forwardRef(function () { return NgbTimepicker; }), multi: true }],
                    styles: ["ngb-timepicker{font-size:1rem}.ngb-tp{align-items:center;display:flex}.ngb-tp-input-container{width:4em}.ngb-tp-chevron:before{border-style:solid;border-width:.29em .29em 0 0;content:\"\";display:inline-block;height:.69em;left:.05em;position:relative;top:.15em;transform:rotate(-45deg);vertical-align:middle;width:.69em}.ngb-tp-chevron.bottom:before{top:-.3em;transform:rotate(135deg)}.ngb-tp-input{text-align:center}.ngb-tp-hour,.ngb-tp-meridian,.ngb-tp-minute,.ngb-tp-second{align-items:center;display:flex;flex-direction:column;justify-content:space-around}.ngb-tp-spacer{text-align:center;width:1em}"]
                },] }
    ];
    NgbTimepicker.ctorParameters = function () { return [
        { type: NgbTimepickerConfig },
        { type: NgbTimeAdapter },
        { type: i0.ChangeDetectorRef },
        { type: NgbTimepickerI18n }
    ]; };
    NgbTimepicker.propDecorators = {
        meridian: [{ type: i0.Input }],
        spinners: [{ type: i0.Input }],
        seconds: [{ type: i0.Input }],
        hourStep: [{ type: i0.Input }],
        minuteStep: [{ type: i0.Input }],
        secondStep: [{ type: i0.Input }],
        readonlyInputs: [{ type: i0.Input }],
        size: [{ type: i0.Input }]
    };

    var NgbTimepickerModule = /** @class */ (function () {
        function NgbTimepickerModule() {
        }
        return NgbTimepickerModule;
    }());
    NgbTimepickerModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: [NgbTimepicker], exports: [NgbTimepicker], imports: [i1.CommonModule] },] }
    ];

    /**
     * Configuration service for the NgbToast component. You can inject this service, typically in your root component,
     * and customize the values of its properties in order to provide default values for all the toasts used in the
     * application.
     *
     * @since 5.0.0
     */
    var NgbToastConfig = /** @class */ (function () {
        function NgbToastConfig(_ngbConfig) {
            this._ngbConfig = _ngbConfig;
            this.autohide = true;
            this.delay = 500;
            this.ariaLive = 'polite';
        }
        Object.defineProperty(NgbToastConfig.prototype, "animation", {
            get: function () { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; },
            set: function (animation) { this._animation = animation; },
            enumerable: false,
            configurable: true
        });
        return NgbToastConfig;
    }());
    NgbToastConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbToastConfig_Factory() { return new NgbToastConfig(i0.ɵɵinject(NgbConfig)); }, token: NgbToastConfig, providedIn: "root" });
    NgbToastConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbToastConfig.ctorParameters = function () { return [
        { type: NgbConfig }
    ]; };

    var ngbToastFadeInTransition = function (element, animation) {
        var classList = element.classList;
        if (!animation) {
            classList.add('show');
            return;
        }
        classList.remove('hide');
        reflow(element);
        classList.add('showing');
        return function () {
            classList.remove('showing');
            classList.add('show');
        };
    };
    var ngbToastFadeOutTransition = function (_a) {
        var classList = _a.classList;
        classList.remove('show');
        return function () { classList.add('hide'); };
    };

    /**
     * This directive allows the usage of HTML markup or other directives
     * inside of the toast's header.
     *
     * @since 5.0.0
     */
    var NgbToastHeader = /** @class */ (function () {
        function NgbToastHeader() {
        }
        return NgbToastHeader;
    }());
    NgbToastHeader.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngbToastHeader]' },] }
    ];
    /**
     * Toasts provide feedback messages as notifications to the user.
     * Goal is to mimic the push notifications available both on mobile and desktop operating systems.
     *
     * @since 5.0.0
     */
    var NgbToast = /** @class */ (function () {
        function NgbToast(ariaLive, config, _zone, _element) {
            this.ariaLive = ariaLive;
            this._zone = _zone;
            this._element = _element;
            /**
             * A template like `<ng-template ngbToastHeader></ng-template>` can be
             * used in the projected content to allow markup usage.
             */
            this.contentHeaderTpl = null;
            /**
             * An event fired after the animation triggered by calling `.show()` method has finished.
             *
             * @since 8.0.0
             */
            this.shown = new i0.EventEmitter();
            /**
             * An event fired after the animation triggered by calling `.hide()` method has finished.
             *
             * It can only occur in 2 different scenarios:
             * - `autohide` timeout fires
             * - user clicks on a closing cross
             *
             * Additionally this output is purely informative. The toast won't be removed from DOM automatically, it's up
             * to the user to take care of that.
             *
             * @since 8.0.0
             */
            this.hidden = new i0.EventEmitter();
            if (this.ariaLive == null) {
                this.ariaLive = config.ariaLive;
            }
            this.delay = config.delay;
            this.autohide = config.autohide;
            this.animation = config.animation;
        }
        NgbToast.prototype.ngAfterContentInit = function () {
            var _this = this;
            this._zone.onStable.asObservable().pipe(operators.take(1)).subscribe(function () {
                _this._init();
                _this.show();
            });
        };
        NgbToast.prototype.ngOnChanges = function (changes) {
            if ('autohide' in changes) {
                this._clearTimeout();
                this._init();
            }
        };
        /**
         * Triggers toast closing programmatically.
         *
         * The returned observable will emit and be completed once the closing transition has finished.
         * If the animations are turned off this happens synchronously.
         *
         * Alternatively you could listen or subscribe to the `(hidden)` output
         *
         * @since 8.0.0
         */
        NgbToast.prototype.hide = function () {
            var _this = this;
            this._clearTimeout();
            var transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeOutTransition, { animation: this.animation, runningTransition: 'stop' });
            transition.subscribe(function () { _this.hidden.emit(); });
            return transition;
        };
        /**
         * Triggers toast opening programmatically.
         *
         * The returned observable will emit and be completed once the opening transition has finished.
         * If the animations are turned off this happens synchronously.
         *
         * Alternatively you could listen or subscribe to the `(shown)` output
         *
         * @since 8.0.0
         */
        NgbToast.prototype.show = function () {
            var _this = this;
            var transition = ngbRunTransition(this._zone, this._element.nativeElement, ngbToastFadeInTransition, {
                animation: this.animation,
                runningTransition: 'continue',
            });
            transition.subscribe(function () { _this.shown.emit(); });
            return transition;
        };
        NgbToast.prototype._init = function () {
            var _this = this;
            if (this.autohide && !this._timeoutID) {
                this._timeoutID = setTimeout(function () { return _this.hide(); }, this.delay);
            }
        };
        NgbToast.prototype._clearTimeout = function () {
            if (this._timeoutID) {
                clearTimeout(this._timeoutID);
                this._timeoutID = null;
            }
        };
        return NgbToast;
    }());
    NgbToast.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-toast',
                    exportAs: 'ngbToast',
                    encapsulation: i0.ViewEncapsulation.None,
                    host: {
                        'role': 'alert',
                        '[attr.aria-live]': 'ariaLive',
                        'aria-atomic': 'true',
                        'class': 'toast',
                        '[class.fade]': 'animation',
                    },
                    template: "\n    <ng-template #headerTpl>\n      <strong class=\"mr-auto\">{{header}}</strong>\n    </ng-template>\n    <ng-template [ngIf]=\"contentHeaderTpl || header\">\n      <div class=\"toast-header\">\n        <ng-template [ngTemplateOutlet]=\"contentHeaderTpl || headerTpl\"></ng-template>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" i18n-aria-label=\"@@ngb.toast.close-aria\" (click)=\"hide()\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n    </ng-template>\n    <div class=\"toast-body\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    styles: [".ngb-toasts{margin:.5em;position:fixed;right:0;top:0;z-index:1200}ngb-toast{display:block}ngb-toast .toast-header .close{margin-bottom:.25rem;margin-left:auto}"]
                },] }
    ];
    NgbToast.ctorParameters = function () { return [
        { type: String, decorators: [{ type: i0.Attribute, args: ['aria-live',] }] },
        { type: NgbToastConfig },
        { type: i0.NgZone },
        { type: i0.ElementRef }
    ]; };
    NgbToast.propDecorators = {
        animation: [{ type: i0.Input }],
        delay: [{ type: i0.Input }],
        autohide: [{ type: i0.Input }],
        header: [{ type: i0.Input }],
        contentHeaderTpl: [{ type: i0.ContentChild, args: [NgbToastHeader, { read: i0.TemplateRef, static: true },] }],
        shown: [{ type: i0.Output }],
        hidden: [{ type: i0.Output }]
    };

    var NgbToastModule = /** @class */ (function () {
        function NgbToastModule() {
        }
        return NgbToastModule;
    }());
    NgbToastModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: [NgbToast, NgbToastHeader], imports: [i1.CommonModule], exports: [NgbToast, NgbToastHeader] },] }
    ];

    /**
     * A configuration service for the [`NgbTooltip`](#/components/tooltip/api#NgbTooltip) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the tooltips used in the application.
     */
    var NgbTooltipConfig = /** @class */ (function () {
        function NgbTooltipConfig(_ngbConfig) {
            this._ngbConfig = _ngbConfig;
            this.autoClose = true;
            this.placement = 'auto';
            this.triggers = 'hover focus';
            this.disableTooltip = false;
            this.openDelay = 0;
            this.closeDelay = 0;
        }
        Object.defineProperty(NgbTooltipConfig.prototype, "animation", {
            get: function () { return (this._animation === undefined) ? this._ngbConfig.animation : this._animation; },
            set: function (animation) { this._animation = animation; },
            enumerable: false,
            configurable: true
        });
        return NgbTooltipConfig;
    }());
    NgbTooltipConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbTooltipConfig_Factory() { return new NgbTooltipConfig(i0.ɵɵinject(NgbConfig)); }, token: NgbTooltipConfig, providedIn: "root" });
    NgbTooltipConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    NgbTooltipConfig.ctorParameters = function () { return [
        { type: NgbConfig }
    ]; };

    var nextId$4 = 0;
    var NgbTooltipWindow = /** @class */ (function () {
        function NgbTooltipWindow() {
        }
        return NgbTooltipWindow;
    }());
    NgbTooltipWindow.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-tooltip-window',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    host: {
                        '[class]': '"tooltip" + (tooltipClass ? " " + tooltipClass : "")',
                        '[class.fade]': 'animation',
                        'role': 'tooltip',
                        '[id]': 'id'
                    },
                    template: "<div class=\"arrow\"></div><div class=\"tooltip-inner\"><ng-content></ng-content></div>",
                    styles: ["ngb-tooltip-window.bs-tooltip-bottom .arrow,ngb-tooltip-window.bs-tooltip-top .arrow{left:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-bottom-left .arrow,ngb-tooltip-window.bs-tooltip-top-left .arrow{left:1em}ngb-tooltip-window.bs-tooltip-bottom-right .arrow,ngb-tooltip-window.bs-tooltip-top-right .arrow{left:auto;right:.8rem}ngb-tooltip-window.bs-tooltip-left .arrow,ngb-tooltip-window.bs-tooltip-right .arrow{top:calc(50% - .4rem)}ngb-tooltip-window.bs-tooltip-left-top .arrow,ngb-tooltip-window.bs-tooltip-right-top .arrow{top:.4rem}ngb-tooltip-window.bs-tooltip-left-bottom .arrow,ngb-tooltip-window.bs-tooltip-right-bottom .arrow{bottom:.4rem;top:auto}"]
                },] }
    ];
    NgbTooltipWindow.propDecorators = {
        animation: [{ type: i0.Input }],
        id: [{ type: i0.Input }],
        tooltipClass: [{ type: i0.Input }]
    };
    /**
     * A lightweight and extensible directive for fancy tooltip creation.
     */
    var NgbTooltip = /** @class */ (function () {
        function NgbTooltip(_elementRef, _renderer, injector, componentFactoryResolver, viewContainerRef, config, _ngZone, _document, _changeDetector, applicationRef) {
            var _this = this;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._ngZone = _ngZone;
            this._document = _document;
            this._changeDetector = _changeDetector;
            /**
             * An event emitted when the tooltip opening animation has finished. Contains no payload.
             */
            this.shown = new i0.EventEmitter();
            /**
             * An event emitted when the tooltip closing animation has finished. Contains no payload.
             */
            this.hidden = new i0.EventEmitter();
            this._ngbTooltipWindowId = "ngb-tooltip-" + nextId$4++;
            this._windowRef = null;
            this.animation = config.animation;
            this.autoClose = config.autoClose;
            this.placement = config.placement;
            this.triggers = config.triggers;
            this.container = config.container;
            this.disableTooltip = config.disableTooltip;
            this.tooltipClass = config.tooltipClass;
            this.openDelay = config.openDelay;
            this.closeDelay = config.closeDelay;
            this._popupService = new PopupService(NgbTooltipWindow, injector, viewContainerRef, _renderer, this._ngZone, componentFactoryResolver, applicationRef);
            this._zoneSubscription = _ngZone.onStable.subscribe(function () {
                if (_this._windowRef) {
                    positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body', 'bs-tooltip');
                }
            });
        }
        Object.defineProperty(NgbTooltip.prototype, "ngbTooltip", {
            get: function () { return this._ngbTooltip; },
            /**
             * The string content or a `TemplateRef` for the content to be displayed in the tooltip.
             *
             * If the content if falsy, the tooltip won't open.
             */
            set: function (value) {
                this._ngbTooltip = value;
                if (!value && this._windowRef) {
                    this.close();
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Opens the tooltip.
         *
         * This is considered to be a "manual" triggering.
         * The `context` is an optional value to be injected into the tooltip template when it is created.
         */
        NgbTooltip.prototype.open = function (context) {
            var _this = this;
            if (!this._windowRef && this._ngbTooltip && !this.disableTooltip) {
                var _a = this._popupService.open(this._ngbTooltip, context, this.animation), windowRef = _a.windowRef, transition$ = _a.transition$;
                this._windowRef = windowRef;
                this._windowRef.instance.animation = this.animation;
                this._windowRef.instance.tooltipClass = this.tooltipClass;
                this._windowRef.instance.id = this._ngbTooltipWindowId;
                this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ngbTooltipWindowId);
                if (this.container === 'body') {
                    this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
                }
                // We need to detect changes, because we don't know where .open() might be called from.
                // Ex. opening tooltip from one of lifecycle hooks that run after the CD
                // (say from ngAfterViewInit) will result in 'ExpressionHasChanged' exception
                this._windowRef.changeDetectorRef.detectChanges();
                // We need to mark for check, because tooltip won't work inside the OnPush component.
                // Ex. when we use expression like `{{ tooltip.isOpen() : 'opened' : 'closed' }}`
                // inside the template of an OnPush component and we change the tooltip from
                // open -> closed, the expression in question won't be updated unless we explicitly
                // mark the parent component to be checked.
                this._windowRef.changeDetectorRef.markForCheck();
                ngbAutoClose(this._ngZone, this._document, this.autoClose, function () { return _this.close(); }, this.hidden, [this._windowRef.location.nativeElement]);
                transition$.subscribe(function () { return _this.shown.emit(); });
            }
        };
        /**
         * Closes the tooltip.
         *
         * This is considered to be a "manual" triggering of the tooltip.
         */
        NgbTooltip.prototype.close = function () {
            var _this = this;
            if (this._windowRef != null) {
                this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
                this._popupService.close(this.animation).subscribe(function () {
                    _this._windowRef = null;
                    _this.hidden.emit();
                    _this._changeDetector.markForCheck();
                });
            }
        };
        /**
         * Toggles the tooltip.
         *
         * This is considered to be a "manual" triggering of the tooltip.
         */
        NgbTooltip.prototype.toggle = function () {
            if (this._windowRef) {
                this.close();
            }
            else {
                this.open();
            }
        };
        /**
         * Returns `true`, if the popover is currently shown.
         */
        NgbTooltip.prototype.isOpen = function () { return this._windowRef != null; };
        NgbTooltip.prototype.ngOnInit = function () {
            this._unregisterListenersFn = listenToTriggers(this._renderer, this._elementRef.nativeElement, this.triggers, this.isOpen.bind(this), this.open.bind(this), this.close.bind(this), +this.openDelay, +this.closeDelay);
        };
        NgbTooltip.prototype.ngOnChanges = function (_a) {
            var tooltipClass = _a.tooltipClass;
            if (tooltipClass && this.isOpen()) {
                this._windowRef.instance.tooltipClass = tooltipClass.currentValue;
            }
        };
        NgbTooltip.prototype.ngOnDestroy = function () {
            this.close();
            // This check is needed as it might happen that ngOnDestroy is called before ngOnInit
            // under certain conditions, see: https://github.com/ng-bootstrap/ng-bootstrap/issues/2199
            if (this._unregisterListenersFn) {
                this._unregisterListenersFn();
            }
            this._zoneSubscription.unsubscribe();
        };
        return NgbTooltip;
    }());
    NgbTooltip.decorators = [
        { type: i0.Directive, args: [{ selector: '[ngbTooltip]', exportAs: 'ngbTooltip' },] }
    ];
    NgbTooltip.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.Renderer2 },
        { type: i0.Injector },
        { type: i0.ComponentFactoryResolver },
        { type: i0.ViewContainerRef },
        { type: NgbTooltipConfig },
        { type: i0.NgZone },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: i0.ChangeDetectorRef },
        { type: i0.ApplicationRef }
    ]; };
    NgbTooltip.propDecorators = {
        animation: [{ type: i0.Input }],
        autoClose: [{ type: i0.Input }],
        placement: [{ type: i0.Input }],
        triggers: [{ type: i0.Input }],
        container: [{ type: i0.Input }],
        disableTooltip: [{ type: i0.Input }],
        tooltipClass: [{ type: i0.Input }],
        openDelay: [{ type: i0.Input }],
        closeDelay: [{ type: i0.Input }],
        shown: [{ type: i0.Output }],
        hidden: [{ type: i0.Output }],
        ngbTooltip: [{ type: i0.Input }]
    };

    var NgbTooltipModule = /** @class */ (function () {
        function NgbTooltipModule() {
        }
        return NgbTooltipModule;
    }());
    NgbTooltipModule.decorators = [
        { type: i0.NgModule, args: [{ declarations: [NgbTooltip, NgbTooltipWindow], exports: [NgbTooltip], entryComponents: [NgbTooltipWindow] },] }
    ];

    /**
     * A component that helps with text highlighting.
     *
     * If splits the `result` text into parts that contain the searched `term` and generates the HTML markup to simplify
     * highlighting:
     *
     * Ex. `result="Alaska"` and `term="as"` will produce `Al<span class="ngb-highlight">as</span>ka`.
     */
    var NgbHighlight = /** @class */ (function () {
        function NgbHighlight() {
            /**
             * The CSS class for `<span>` elements wrapping the `term` inside the `result`.
             */
            this.highlightClass = 'ngb-highlight';
            /**
             * Boolean option to determine if the highlighting should be sensitive to accents or not.
             *
             * This feature is only available for browsers that implement the `String.normalize` function
             * (typically not Internet Explorer).
             * If you want to use this feature in a browser that does not implement `String.normalize`,
             * you will have to include a polyfill in your application (`unorm` for example).
             *
             * @since 9.1.0
             */
            this.accentSensitive = true;
        }
        NgbHighlight.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (!this.accentSensitive && !String.prototype.normalize) {
                console.warn('The `accentSensitive` input in `ngb-highlight` cannot be set to `false` in a browser ' +
                    'that does not implement the `String.normalize` function. ' +
                    'You will have to include a polyfill in your application to use this feature in the current browser.');
                this.accentSensitive = true;
            }
            var result = toString(this.result);
            var terms = Array.isArray(this.term) ? this.term : [this.term];
            var prepareTerm = function (term) { return _this.accentSensitive ? term : removeAccents(term); };
            var escapedTerms = terms.map(function (term) { return regExpEscape(prepareTerm(toString(term))); }).filter(function (term) { return term; });
            var toSplit = this.accentSensitive ? result : removeAccents(result);
            var parts = escapedTerms.length ? toSplit.split(new RegExp("(" + escapedTerms.join('|') + ")", 'gmi')) : [result];
            if (this.accentSensitive) {
                this.parts = parts;
            }
            else {
                var offset_1 = 0;
                this.parts = parts.map(function (part) { return result.substring(offset_1, offset_1 += part.length); });
            }
        };
        return NgbHighlight;
    }());
    NgbHighlight.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-highlight',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    encapsulation: i0.ViewEncapsulation.None,
                    template: "<ng-template ngFor [ngForOf]=\"parts\" let-part let-isOdd=\"odd\">" +
                        "<span *ngIf=\"isOdd; else even\" [class]=\"highlightClass\">{{part}}</span><ng-template #even>{{part}}</ng-template>" +
                        "</ng-template>",
                    styles: [".ngb-highlight{font-weight:700}"]
                },] }
    ];
    NgbHighlight.propDecorators = {
        highlightClass: [{ type: i0.Input }],
        result: [{ type: i0.Input }],
        term: [{ type: i0.Input }],
        accentSensitive: [{ type: i0.Input }]
    };

    var NgbTypeaheadWindow = /** @class */ (function () {
        function NgbTypeaheadWindow() {
            this.activeIdx = 0;
            /**
             * Flag indicating if the first row should be active initially
             */
            this.focusFirst = true;
            /**
             * A function used to format a given result before display. This function should return a formatted string without any
             * HTML markup
             */
            this.formatter = toString;
            /**
             * Event raised when user selects a particular result row
             */
            this.selectEvent = new i0.EventEmitter();
            this.activeChangeEvent = new i0.EventEmitter();
        }
        NgbTypeaheadWindow.prototype.hasActive = function () { return this.activeIdx > -1 && this.activeIdx < this.results.length; };
        NgbTypeaheadWindow.prototype.getActive = function () { return this.results[this.activeIdx]; };
        NgbTypeaheadWindow.prototype.markActive = function (activeIdx) {
            this.activeIdx = activeIdx;
            this._activeChanged();
        };
        NgbTypeaheadWindow.prototype.next = function () {
            if (this.activeIdx === this.results.length - 1) {
                this.activeIdx = this.focusFirst ? (this.activeIdx + 1) % this.results.length : -1;
            }
            else {
                this.activeIdx++;
            }
            this._activeChanged();
        };
        NgbTypeaheadWindow.prototype.prev = function () {
            if (this.activeIdx < 0) {
                this.activeIdx = this.results.length - 1;
            }
            else if (this.activeIdx === 0) {
                this.activeIdx = this.focusFirst ? this.results.length - 1 : -1;
            }
            else {
                this.activeIdx--;
            }
            this._activeChanged();
        };
        NgbTypeaheadWindow.prototype.resetActive = function () {
            this.activeIdx = this.focusFirst ? 0 : -1;
            this._activeChanged();
        };
        NgbTypeaheadWindow.prototype.select = function (item) { this.selectEvent.emit(item); };
        NgbTypeaheadWindow.prototype.ngOnInit = function () { this.resetActive(); };
        NgbTypeaheadWindow.prototype._activeChanged = function () {
            this.activeChangeEvent.emit(this.activeIdx >= 0 ? this.id + '-' + this.activeIdx : undefined);
        };
        return NgbTypeaheadWindow;
    }());
    NgbTypeaheadWindow.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ngb-typeahead-window',
                    exportAs: 'ngbTypeaheadWindow',
                    encapsulation: i0.ViewEncapsulation.None,
                    host: {
                        '(mousedown)': '$event.preventDefault()',
                        '[class]': '"dropdown-menu show" + (popupClass ? " " + popupClass : "")',
                        'role': 'listbox',
                        '[id]': 'id'
                    },
                    template: "\n    <ng-template #rt let-result=\"result\" let-term=\"term\" let-formatter=\"formatter\">\n      <ngb-highlight [result]=\"formatter(result)\" [term]=\"term\"></ngb-highlight>\n    </ng-template>\n    <ng-template ngFor [ngForOf]=\"results\" let-result let-idx=\"index\">\n      <button type=\"button\" class=\"dropdown-item\" role=\"option\"\n        [id]=\"id + '-' + idx\"\n        [class.active]=\"idx === activeIdx\"\n        (mouseenter)=\"markActive(idx)\"\n        (click)=\"select(result)\">\n          <ng-template [ngTemplateOutlet]=\"resultTemplate || rt\"\n          [ngTemplateOutletContext]=\"{result: result, term: term, formatter: formatter}\"></ng-template>\n      </button>\n    </ng-template>\n  "
                },] }
    ];
    NgbTypeaheadWindow.propDecorators = {
        id: [{ type: i0.Input }],
        focusFirst: [{ type: i0.Input }],
        results: [{ type: i0.Input }],
        term: [{ type: i0.Input }],
        formatter: [{ type: i0.Input }],
        resultTemplate: [{ type: i0.Input }],
        popupClass: [{ type: i0.Input }],
        selectEvent: [{ type: i0.Output, args: ['select',] }],
        activeChangeEvent: [{ type: i0.Output, args: ['activeChange',] }]
    };

    var ARIA_LIVE_DELAY = new i0.InjectionToken('live announcer delay', { providedIn: 'root', factory: ARIA_LIVE_DELAY_FACTORY });
    function ARIA_LIVE_DELAY_FACTORY() {
        return 100;
    }
    function getLiveElement(document, lazyCreate) {
        if (lazyCreate === void 0) { lazyCreate = false; }
        var element = document.body.querySelector('#ngb-live');
        if (element == null && lazyCreate) {
            element = document.createElement('div');
            element.setAttribute('id', 'ngb-live');
            element.setAttribute('aria-live', 'polite');
            element.setAttribute('aria-atomic', 'true');
            element.classList.add('sr-only');
            document.body.appendChild(element);
        }
        return element;
    }
    var Live = /** @class */ (function () {
        function Live(_document, _delay) {
            this._document = _document;
            this._delay = _delay;
        }
        Live.prototype.ngOnDestroy = function () {
            var element = getLiveElement(this._document);
            if (element) {
                // if exists, it will always be attached to the <body>
                element.parentElement.removeChild(element);
            }
        };
        Live.prototype.say = function (message) {
            var element = getLiveElement(this._document, true);
            var delay = this._delay;
            if (element != null) {
                element.textContent = '';
                var setText = function () { return element.textContent = message; };
                if (delay === null) {
                    setText();
                }
                else {
                    setTimeout(setText, delay);
                }
            }
        };
        return Live;
    }());
    Live.ɵprov = i0.ɵɵdefineInjectable({ factory: function Live_Factory() { return new Live(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(ARIA_LIVE_DELAY)); }, token: Live, providedIn: "root" });
    Live.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];
    Live.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: undefined, decorators: [{ type: i0.Inject, args: [ARIA_LIVE_DELAY,] }] }
    ]; };

    /**
     * A configuration service for the [`NgbTypeahead`](#/components/typeahead/api#NgbTypeahead) component.
     *
     * You can inject this service, typically in your root component, and customize the values of its properties in
     * order to provide default values for all the typeaheads used in the application.
     */
    var NgbTypeaheadConfig = /** @class */ (function () {
        function NgbTypeaheadConfig() {
            this.editable = true;
            this.focusFirst = true;
            this.showHint = false;
            this.placement = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];
        }
        return NgbTypeaheadConfig;
    }());
    NgbTypeaheadConfig.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgbTypeaheadConfig_Factory() { return new NgbTypeaheadConfig(); }, token: NgbTypeaheadConfig, providedIn: "root" });
    NgbTypeaheadConfig.decorators = [
        { type: i0.Injectable, args: [{ providedIn: 'root' },] }
    ];

    var nextWindowId = 0;
    /**
     * A directive providing a simple way of creating powerful typeaheads from any text input.
     */
    var NgbTypeahead = /** @class */ (function () {
        function NgbTypeahead(_elementRef, viewContainerRef, _renderer, injector, componentFactoryResolver, config, ngZone, _live, _document, _ngZone, _changeDetector, applicationRef) {
            var _this = this;
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this._live = _live;
            this._document = _document;
            this._ngZone = _ngZone;
            this._changeDetector = _changeDetector;
            this._subscription = null;
            this._closed$ = new rxjs.Subject();
            this._inputValueBackup = null;
            this._windowRef = null;
            /**
             * The value for the `autocomplete` attribute for the `<input>` element.
             *
             * Defaults to `"off"` to disable the native browser autocomplete, but you can override it if necessary.
             *
             * @since 2.1.0
             */
            this.autocomplete = 'off';
            /**
             * The preferred placement of the typeahead.
             *
             * Possible values are `"top"`, `"top-left"`, `"top-right"`, `"bottom"`, `"bottom-left"`,
             * `"bottom-right"`, `"left"`, `"left-top"`, `"left-bottom"`, `"right"`, `"right-top"`,
             * `"right-bottom"`
             *
             * Accepts an array of strings or a string with space separated possible values.
             *
             * The default order of preference is `"bottom-left bottom-right top-left top-right"`
             *
             * Please see the [positioning overview](#/positioning) for more details.
             */
            this.placement = 'bottom-left';
            /**
             * An event emitted right before an item is selected from the result list.
             *
             * Event payload is of type [`NgbTypeaheadSelectItemEvent`](#/components/typeahead/api#NgbTypeaheadSelectItemEvent).
             */
            this.selectItem = new i0.EventEmitter();
            this.activeDescendant = null;
            this.popupId = "ngb-typeahead-" + nextWindowId++;
            this._onTouched = function () { };
            this._onChange = function (_) { };
            this.container = config.container;
            this.editable = config.editable;
            this.focusFirst = config.focusFirst;
            this.showHint = config.showHint;
            this.placement = config.placement;
            this._valueChanges = rxjs.fromEvent(_elementRef.nativeElement, 'input')
                .pipe(operators.map(function ($event) { return $event.target.value; }));
            this._resubscribeTypeahead = new rxjs.BehaviorSubject(null);
            this._popupService = new PopupService(NgbTypeaheadWindow, injector, viewContainerRef, _renderer, this._ngZone, componentFactoryResolver, applicationRef);
            this._zoneSubscription = ngZone.onStable.subscribe(function () {
                if (_this.isPopupOpen()) {
                    positionElements(_this._elementRef.nativeElement, _this._windowRef.location.nativeElement, _this.placement, _this.container === 'body');
                }
            });
        }
        NgbTypeahead.prototype.ngOnInit = function () { this._subscribeToUserInput(); };
        NgbTypeahead.prototype.ngOnChanges = function (_b) {
            var ngbTypeahead = _b.ngbTypeahead;
            if (ngbTypeahead && !ngbTypeahead.firstChange) {
                this._unsubscribeFromUserInput();
                this._subscribeToUserInput();
            }
        };
        NgbTypeahead.prototype.ngOnDestroy = function () {
            this._closePopup();
            this._unsubscribeFromUserInput();
            this._zoneSubscription.unsubscribe();
        };
        NgbTypeahead.prototype.registerOnChange = function (fn) { this._onChange = fn; };
        NgbTypeahead.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
        NgbTypeahead.prototype.writeValue = function (value) {
            this._writeInputValue(this._formatItemForInput(value));
            if (this.showHint) {
                this._inputValueBackup = value;
            }
        };
        NgbTypeahead.prototype.setDisabledState = function (isDisabled) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
        };
        /**
         * Dismisses typeahead popup window
         */
        NgbTypeahead.prototype.dismissPopup = function () {
            if (this.isPopupOpen()) {
                this._resubscribeTypeahead.next(null);
                this._closePopup();
                if (this.showHint && this._inputValueBackup !== null) {
                    this._writeInputValue(this._inputValueBackup);
                }
                this._changeDetector.markForCheck();
            }
        };
        /**
         * Returns true if the typeahead popup window is displayed
         */
        NgbTypeahead.prototype.isPopupOpen = function () { return this._windowRef != null; };
        NgbTypeahead.prototype.handleBlur = function () {
            this._resubscribeTypeahead.next(null);
            this._onTouched();
        };
        NgbTypeahead.prototype.handleKeyDown = function (event) {
            if (!this.isPopupOpen()) {
                return;
            }
            // tslint:disable-next-line:deprecation
            switch (event.which) {
                case Key.ArrowDown:
                    event.preventDefault();
                    this._windowRef.instance.next();
                    this._showHint();
                    break;
                case Key.ArrowUp:
                    event.preventDefault();
                    this._windowRef.instance.prev();
                    this._showHint();
                    break;
                case Key.Enter:
                case Key.Tab:
                    var result = this._windowRef.instance.getActive();
                    if (isDefined(result)) {
                        event.preventDefault();
                        event.stopPropagation();
                        this._selectResult(result);
                    }
                    this._closePopup();
                    break;
            }
        };
        NgbTypeahead.prototype._openPopup = function () {
            var _this = this;
            if (!this.isPopupOpen()) {
                this._inputValueBackup = this._elementRef.nativeElement.value;
                var windowRef = this._popupService.open().windowRef;
                this._windowRef = windowRef;
                this._windowRef.instance.id = this.popupId;
                this._windowRef.instance.selectEvent.subscribe(function (result) { return _this._selectResultClosePopup(result); });
                this._windowRef.instance.activeChangeEvent.subscribe(function (activeId) { return _this.activeDescendant = activeId; });
                this._windowRef.instance.popupClass = this.popupClass;
                if (this.container === 'body') {
                    this._document.querySelector(this.container).appendChild(this._windowRef.location.nativeElement);
                }
                this._changeDetector.markForCheck();
                ngbAutoClose(this._ngZone, this._document, 'outside', function () { return _this.dismissPopup(); }, this._closed$, [this._elementRef.nativeElement, this._windowRef.location.nativeElement]);
            }
        };
        NgbTypeahead.prototype._closePopup = function () {
            var _this = this;
            this._popupService.close().subscribe(function () {
                _this._closed$.next();
                _this._windowRef = null;
                _this.activeDescendant = null;
            });
        };
        NgbTypeahead.prototype._selectResult = function (result) {
            var defaultPrevented = false;
            this.selectItem.emit({ item: result, preventDefault: function () { defaultPrevented = true; } });
            this._resubscribeTypeahead.next(null);
            if (!defaultPrevented) {
                this.writeValue(result);
                this._onChange(result);
            }
        };
        NgbTypeahead.prototype._selectResultClosePopup = function (result) {
            this._selectResult(result);
            this._closePopup();
        };
        NgbTypeahead.prototype._showHint = function () {
            var _a;
            if (this.showHint && ((_a = this._windowRef) === null || _a === void 0 ? void 0 : _a.instance.hasActive()) && this._inputValueBackup != null) {
                var userInputLowerCase = this._inputValueBackup.toLowerCase();
                var formattedVal = this._formatItemForInput(this._windowRef.instance.getActive());
                if (userInputLowerCase === formattedVal.substr(0, this._inputValueBackup.length).toLowerCase()) {
                    this._writeInputValue(this._inputValueBackup + formattedVal.substr(this._inputValueBackup.length));
                    this._elementRef.nativeElement['setSelectionRange'].apply(this._elementRef.nativeElement, [this._inputValueBackup.length, formattedVal.length]);
                }
                else {
                    this._writeInputValue(formattedVal);
                }
            }
        };
        NgbTypeahead.prototype._formatItemForInput = function (item) {
            return item != null && this.inputFormatter ? this.inputFormatter(item) : toString(item);
        };
        NgbTypeahead.prototype._writeInputValue = function (value) {
            this._renderer.setProperty(this._elementRef.nativeElement, 'value', toString(value));
        };
        NgbTypeahead.prototype._subscribeToUserInput = function () {
            var _this = this;
            var results$ = this._valueChanges.pipe(operators.tap(function (value) {
                _this._inputValueBackup = _this.showHint ? value : null;
                _this._onChange(_this.editable ? value : undefined);
            }), this.ngbTypeahead ? this.ngbTypeahead : function () { return rxjs.of([]); });
            this._subscription = this._resubscribeTypeahead.pipe(operators.switchMap(function () { return results$; })).subscribe(function (results) {
                if (!results || results.length === 0) {
                    _this._closePopup();
                }
                else {
                    _this._openPopup();
                    _this._windowRef.instance.focusFirst = _this.focusFirst;
                    _this._windowRef.instance.results = results;
                    _this._windowRef.instance.term = _this._elementRef.nativeElement.value;
                    if (_this.resultFormatter) {
                        _this._windowRef.instance.formatter = _this.resultFormatter;
                    }
                    if (_this.resultTemplate) {
                        _this._windowRef.instance.resultTemplate = _this.resultTemplate;
                    }
                    _this._windowRef.instance.resetActive();
                    // The observable stream we are subscribing to might have async steps
                    // and if a component containing typeahead is using the OnPush strategy
                    // the change detection turn wouldn't be invoked automatically.
                    _this._windowRef.changeDetectorRef.detectChanges();
                    _this._showHint();
                }
                // live announcer
                var count = results ? results.length : 0;
                _this._live.say(count === 0 ? 'No results available' : count + " result" + (count === 1 ? '' : 's') + " available");
            });
        };
        NgbTypeahead.prototype._unsubscribeFromUserInput = function () {
            if (this._subscription) {
                this._subscription.unsubscribe();
            }
            this._subscription = null;
        };
        return NgbTypeahead;
    }());
    NgbTypeahead.decorators = [
        { type: i0.Directive, args: [{
                    selector: 'input[ngbTypeahead]',
                    exportAs: 'ngbTypeahead',
                    host: {
                        '(blur)': 'handleBlur()',
                        '[class.open]': 'isPopupOpen()',
                        '(keydown)': 'handleKeyDown($event)',
                        '[autocomplete]': 'autocomplete',
                        'autocapitalize': 'off',
                        'autocorrect': 'off',
                        'role': 'combobox',
                        'aria-multiline': 'false',
                        '[attr.aria-autocomplete]': 'showHint ? "both" : "list"',
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isPopupOpen() ? popupId : null',
                        '[attr.aria-expanded]': 'isPopupOpen()'
                    },
                    providers: [{ provide: forms.NG_VALUE_ACCESSOR, useExisting: i0.forwardRef(function () { return NgbTypeahead; }), multi: true }]
                },] }
    ];
    NgbTypeahead.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.ViewContainerRef },
        { type: i0.Renderer2 },
        { type: i0.Injector },
        { type: i0.ComponentFactoryResolver },
        { type: NgbTypeaheadConfig },
        { type: i0.NgZone },
        { type: Live },
        { type: undefined, decorators: [{ type: i0.Inject, args: [i1.DOCUMENT,] }] },
        { type: i0.NgZone },
        { type: i0.ChangeDetectorRef },
        { type: i0.ApplicationRef }
    ]; };
    NgbTypeahead.propDecorators = {
        autocomplete: [{ type: i0.Input }],
        container: [{ type: i0.Input }],
        editable: [{ type: i0.Input }],
        focusFirst: [{ type: i0.Input }],
        inputFormatter: [{ type: i0.Input }],
        ngbTypeahead: [{ type: i0.Input }],
        resultFormatter: [{ type: i0.Input }],
        resultTemplate: [{ type: i0.Input }],
        showHint: [{ type: i0.Input }],
        placement: [{ type: i0.Input }],
        popupClass: [{ type: i0.Input }],
        selectItem: [{ type: i0.Output }]
    };

    var NgbTypeaheadModule = /** @class */ (function () {
        function NgbTypeaheadModule() {
        }
        return NgbTypeaheadModule;
    }());
    NgbTypeaheadModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [NgbTypeahead, NgbHighlight, NgbTypeaheadWindow],
                    exports: [NgbTypeahead, NgbHighlight],
                    imports: [i1.CommonModule],
                    entryComponents: [NgbTypeaheadWindow]
                },] }
    ];

    var NGB_MODULES = [
        NgbAccordionModule, NgbAlertModule, NgbButtonsModule, NgbCarouselModule, NgbCollapseModule, NgbDatepickerModule,
        NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPaginationModule, NgbPopoverModule, NgbProgressbarModule,
        NgbRatingModule, NgbTimepickerModule, NgbToastModule, NgbTooltipModule, NgbTypeaheadModule
    ];
    var NgbModule = /** @class */ (function () {
        function NgbModule() {
        }
        return NgbModule;
    }());
    NgbModule.decorators = [
        { type: i0.NgModule, args: [{ imports: NGB_MODULES, exports: NGB_MODULES },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgbAccordion = NgbAccordion;
    exports.NgbAccordionConfig = NgbAccordionConfig;
    exports.NgbAccordionModule = NgbAccordionModule;
    exports.NgbActiveModal = NgbActiveModal;
    exports.NgbAlert = NgbAlert;
    exports.NgbAlertConfig = NgbAlertConfig;
    exports.NgbAlertModule = NgbAlertModule;
    exports.NgbButtonLabel = NgbButtonLabel;
    exports.NgbButtonsModule = NgbButtonsModule;
    exports.NgbCalendar = NgbCalendar;
    exports.NgbCalendarBuddhist = NgbCalendarBuddhist;
    exports.NgbCalendarGregorian = NgbCalendarGregorian;
    exports.NgbCalendarHebrew = NgbCalendarHebrew;
    exports.NgbCalendarIslamicCivil = NgbCalendarIslamicCivil;
    exports.NgbCalendarIslamicUmalqura = NgbCalendarIslamicUmalqura;
    exports.NgbCalendarPersian = NgbCalendarPersian;
    exports.NgbCarousel = NgbCarousel;
    exports.NgbCarouselConfig = NgbCarouselConfig;
    exports.NgbCarouselModule = NgbCarouselModule;
    exports.NgbCheckBox = NgbCheckBox;
    exports.NgbCollapse = NgbCollapse;
    exports.NgbCollapseConfig = NgbCollapseConfig;
    exports.NgbCollapseModule = NgbCollapseModule;
    exports.NgbConfig = NgbConfig;
    exports.NgbDate = NgbDate;
    exports.NgbDateAdapter = NgbDateAdapter;
    exports.NgbDateNativeAdapter = NgbDateNativeAdapter;
    exports.NgbDateNativeUTCAdapter = NgbDateNativeUTCAdapter;
    exports.NgbDateParserFormatter = NgbDateParserFormatter;
    exports.NgbDatepicker = NgbDatepicker;
    exports.NgbDatepickerConfig = NgbDatepickerConfig;
    exports.NgbDatepickerContent = NgbDatepickerContent;
    exports.NgbDatepickerI18n = NgbDatepickerI18n;
    exports.NgbDatepickerI18nDefault = NgbDatepickerI18nDefault;
    exports.NgbDatepickerI18nHebrew = NgbDatepickerI18nHebrew;
    exports.NgbDatepickerKeyboardService = NgbDatepickerKeyboardService;
    exports.NgbDatepickerModule = NgbDatepickerModule;
    exports.NgbDatepickerMonth = NgbDatepickerMonth;
    exports.NgbDropdown = NgbDropdown;
    exports.NgbDropdownAnchor = NgbDropdownAnchor;
    exports.NgbDropdownConfig = NgbDropdownConfig;
    exports.NgbDropdownItem = NgbDropdownItem;
    exports.NgbDropdownMenu = NgbDropdownMenu;
    exports.NgbDropdownModule = NgbDropdownModule;
    exports.NgbDropdownToggle = NgbDropdownToggle;
    exports.NgbHighlight = NgbHighlight;
    exports.NgbInputDatepicker = NgbInputDatepicker;
    exports.NgbInputDatepickerConfig = NgbInputDatepickerConfig;
    exports.NgbModal = NgbModal;
    exports.NgbModalConfig = NgbModalConfig;
    exports.NgbModalModule = NgbModalModule;
    exports.NgbModalRef = NgbModalRef;
    exports.NgbModule = NgbModule;
    exports.NgbNav = NgbNav;
    exports.NgbNavConfig = NgbNavConfig;
    exports.NgbNavContent = NgbNavContent;
    exports.NgbNavItem = NgbNavItem;
    exports.NgbNavLink = NgbNavLink;
    exports.NgbNavModule = NgbNavModule;
    exports.NgbNavOutlet = NgbNavOutlet;
    exports.NgbNavPane = NgbNavPane;
    exports.NgbNavbar = NgbNavbar;
    exports.NgbPagination = NgbPagination;
    exports.NgbPaginationConfig = NgbPaginationConfig;
    exports.NgbPaginationEllipsis = NgbPaginationEllipsis;
    exports.NgbPaginationFirst = NgbPaginationFirst;
    exports.NgbPaginationLast = NgbPaginationLast;
    exports.NgbPaginationModule = NgbPaginationModule;
    exports.NgbPaginationNext = NgbPaginationNext;
    exports.NgbPaginationNumber = NgbPaginationNumber;
    exports.NgbPaginationPages = NgbPaginationPages;
    exports.NgbPaginationPrevious = NgbPaginationPrevious;
    exports.NgbPanel = NgbPanel;
    exports.NgbPanelContent = NgbPanelContent;
    exports.NgbPanelHeader = NgbPanelHeader;
    exports.NgbPanelTitle = NgbPanelTitle;
    exports.NgbPanelToggle = NgbPanelToggle;
    exports.NgbPopover = NgbPopover;
    exports.NgbPopoverConfig = NgbPopoverConfig;
    exports.NgbPopoverModule = NgbPopoverModule;
    exports.NgbProgressbar = NgbProgressbar;
    exports.NgbProgressbarConfig = NgbProgressbarConfig;
    exports.NgbProgressbarModule = NgbProgressbarModule;
    exports.NgbRadio = NgbRadio;
    exports.NgbRadioGroup = NgbRadioGroup;
    exports.NgbRating = NgbRating;
    exports.NgbRatingConfig = NgbRatingConfig;
    exports.NgbRatingModule = NgbRatingModule;
    exports.NgbSlide = NgbSlide;
    exports.NgbTimeAdapter = NgbTimeAdapter;
    exports.NgbTimepicker = NgbTimepicker;
    exports.NgbTimepickerConfig = NgbTimepickerConfig;
    exports.NgbTimepickerI18n = NgbTimepickerI18n;
    exports.NgbTimepickerModule = NgbTimepickerModule;
    exports.NgbToast = NgbToast;
    exports.NgbToastConfig = NgbToastConfig;
    exports.NgbToastHeader = NgbToastHeader;
    exports.NgbToastModule = NgbToastModule;
    exports.NgbTooltip = NgbTooltip;
    exports.NgbTooltipConfig = NgbTooltipConfig;
    exports.NgbTooltipModule = NgbTooltipModule;
    exports.NgbTypeahead = NgbTypeahead;
    exports.NgbTypeaheadConfig = NgbTypeaheadConfig;
    exports.NgbTypeaheadModule = NgbTypeaheadModule;
    exports.ɵa = NGB_CAROUSEL_DIRECTIVES;
    exports.ɵb = NGB_DATEPICKER_CALENDAR_FACTORY;
    exports.ɵba = ContentRef;
    exports.ɵc = NgbDatepickerDayView;
    exports.ɵd = NgbDatepickerNavigation;
    exports.ɵe = NgbDatepickerNavigationSelect;
    exports.ɵf = NGB_DATEPICKER_18N_FACTORY;
    exports.ɵg = NGB_DATEPICKER_DATE_ADAPTER_FACTORY;
    exports.ɵh = NgbDateStructAdapter;
    exports.ɵi = NGB_DATEPICKER_PARSER_FORMATTER_FACTORY;
    exports.ɵj = NgbDateISOParserFormatter;
    exports.ɵk = NgbPopoverWindow;
    exports.ɵl = NGB_DATEPICKER_TIME_ADAPTER_FACTORY;
    exports.ɵm = NgbTimeStructAdapter;
    exports.ɵn = NGB_TIMEPICKER_I18N_FACTORY;
    exports.ɵo = NgbTimepickerI18nDefault;
    exports.ɵp = NgbTooltipWindow;
    exports.ɵq = NgbTypeaheadWindow;
    exports.ɵr = NgbDatepickerService;
    exports.ɵs = NgbModalBackdrop;
    exports.ɵt = NgbModalWindow;
    exports.ɵu = NgbModalStack;
    exports.ɵv = ScrollBar;
    exports.ɵw = ARIA_LIVE_DELAY;
    exports.ɵx = ARIA_LIVE_DELAY_FACTORY;
    exports.ɵy = Live;
    exports.ɵz = NgbCalendarHijri;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-bootstrap.umd.js.map
