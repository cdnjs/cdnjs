function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { extend } from '../lib';


export var react = {
    global: function global() {
        if (window.React && window.ReactDOM) {
            return {
                React: window.React,
                ReactDOM: window.ReactDOM
            };
        }
    },
    register: function register(component, _ref) {
        var React = _ref.React,
            ReactDOM = _ref.ReactDOM;


        if (React.createClass) {

            // $FlowFixMe
            component.react = React.createClass({
                render: function render() {
                    return React.createElement('div', null);
                },
                componentDidMount: function componentDidMount() {
                    component.log('instantiate_react_component');

                    var el = ReactDOM.findDOMNode(this);

                    var parent = component.init(extend({}, this.props), null, el);

                    this.setState({ parent: parent });

                    parent.render(el);
                },
                componentDidUpdate: function componentDidUpdate() {

                    if (this.state && this.state.parent) {
                        this.state.parent.updateProps(extend({}, this.props));
                    }
                },
                componentWillUnmount: function componentWillUnmount() {
                    if (this.state && this.state.parent) {
                        this.state.parent.destroy();
                    }
                }
            });
        } else {
            // $FlowFixMe
            component.react = function (_React$Component) {
                _inherits(_class, _React$Component);

                function _class() {
                    _classCallCheck(this, _class);

                    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
                }

                _class.prototype.render = function render() {
                    return React.createElement('div', null);
                };

                _class.prototype.componentDidMount = function componentDidMount() {
                    component.log('instantiate_react_component');

                    var el = ReactDOM.findDOMNode(this);

                    var parent = component.init(extend({}, this.props), null, el);

                    this.setState({ parent: parent });

                    parent.render(el);
                };

                _class.prototype.componentDidUpdate = function componentDidUpdate() {

                    if (this.state && this.state.parent) {
                        this.state.parent.updateProps(extend({}, this.props));
                    }
                };

                _class.prototype.componentWillUnmount = function componentWillUnmount() {
                    if (this.state && this.state.parent) {
                        this.state.parent.destroy();
                    }
                };

                return _class;
            }(React.Component);
        }

        return component.react;
    }
};