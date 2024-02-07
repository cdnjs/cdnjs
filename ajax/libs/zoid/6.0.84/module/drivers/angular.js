import { dasherizeToCamel, replaceObject } from '../lib';


export var angular = {
    global: function global() {
        return window.angular;
    },
    register: function register(component, ng) {

        var module = ng.module(component.tag, []).directive(dasherizeToCamel(component.tag), function () {

            var scope = {};

            for (var _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
                var key = _component$getPropNam2[_i2];
                scope[key] = '=';
            }

            if (component.looseProps) {
                scope.props = '=';
            }

            return {
                scope: scope,

                restrict: 'E',

                controller: ['$scope', '$element', function ($scope, $element) {

                    if (component.looseProps && !$scope.props) {
                        throw new Error('For angular bindings to work, prop definitions must be passed to zoid.create');
                    }

                    component.log('instantiate_angular_component');

                    function safeApply() {
                        if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                            try {
                                $scope.$apply();
                            } catch (err) {
                                // pass
                            }
                        }
                    }

                    var getProps = function getProps() {

                        var scopeProps = void 0;

                        if ($scope.props) {
                            scopeProps = $scope.props;
                        } else {
                            scopeProps = {};

                            for (var _i4 = 0, _Object$keys2 = Object.keys(scope), _length4 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
                                var _key = _Object$keys2[_i4];
                                if ($scope[_key] !== undefined) {
                                    scopeProps[_key] = $scope[_key];
                                }
                            }
                        }

                        scopeProps = replaceObject(scopeProps, {
                            'function': function _function(value) {
                                return function angularWrapped() {
                                    var result = value.apply(this, arguments);
                                    safeApply();
                                    return result;
                                };
                            }
                        });

                        return scopeProps;
                    };

                    var parent = component.init(getProps(), null, $element[0]);
                    parent.render($element[0]);

                    $scope.$watch(function () {
                        parent.updateProps(getProps());
                    });
                }]
            };
        });

        return module;
    }
};