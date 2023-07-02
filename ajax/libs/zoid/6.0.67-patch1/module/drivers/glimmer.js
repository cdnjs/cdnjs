var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var glimmer = {
    global: function global() {
        // pass
    },
    register: function register(component, GlimmerComponent) {
        return function (_GlimmerComponent) {
            _inherits(_class, _GlimmerComponent);

            function _class() {
                _classCallCheck(this, _class);

                return _possibleConstructorReturn(this, _GlimmerComponent.apply(this, arguments));
            }

            _class.prototype.didInsertElement = function didInsertElement() {
                component.render(_extends({}, this.args), this.element);
            };

            return _class;
        }(GlimmerComponent);
    }
};