var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/* eslint new-cap: 0 */

import { replaceObject } from '../lib';


export var angular2 = {
    global: function global() {
        // pass
    },
    register: function register(zoid, _ref) {
        var AngularComponent = _ref.Component,
            NgModule = _ref.NgModule,
            ElementRef = _ref.ElementRef,
            NgZone = _ref.NgZone;


        zoid.log('initializing angular2 component');

        var getProps = function getProps(component) {
            return replaceObject(_extends({}, component.internalProps, component.props), {
                'function': function _function(value) {
                    if (typeof value === 'function') {
                        return function angular2Wrapped() {
                            var _this = this,
                                _arguments = arguments;

                            return component.zone.run(function () {
                                return value.apply(_this, _arguments);
                            });
                        };
                    }
                }
            });
        };

        var ComponentInstance = AngularComponent({
            selector: zoid.tag,
            template: '<div></div>',
            inputs: ['props']
        }).Class({
            constructor: [ElementRef, NgZone, function angularConstructor(elementRef, zone) {
                this.elementRef = elementRef;
                this.zone = zone;
            }],
            ngOnInit: function ngOnInit() {
                var targetElement = this.elementRef.nativeElement;
                var parent = zoid.init(getProps(this), null, targetElement);
                parent.render(targetElement);
                this.parent = parent;
            },
            ngOnChanges: function ngOnChanges() {
                if (this.parent) {
                    this.parent.updateProps(getProps(this));
                }
            }
        });

        var ModuleInstance = NgModule({
            declarations: [ComponentInstance],
            exports: [ComponentInstance]
        }).Class({
            constructor: function constructor() {
                // pass
            }
        });

        return ModuleInstance;
    }
};