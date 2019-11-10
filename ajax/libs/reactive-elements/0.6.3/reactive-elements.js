!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactiveElements=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function() {
    var registerElement = document.registerElement || document.register;

    if (registerElement) {
        registerElement = registerElement.bind(document);
    } else {
        throw new Error('No custom element support or polyfill found!');
        return;
    }

    var React = window.React || _dereq_('react');
    var ReactDOM = window.ReactDOM || _dereq_('react-dom');
    var utils = _dereq_('./utils');

    exports.registerReact = function (elementName, ReactComponent) {
        var elementPrototype = Object.create(HTMLElement.prototype);
        var reactElement;

        function create(parent, props) {
            var element = React.createElement(ReactComponent, props);
            parent.reactiveElement = element;
            return ReactDOM.render(element, parent, props.onRender);
        }

        elementPrototype.createdCallback = function () {
            var props = utils.getProps(this);
            props.children = utils.getChildren(this);
            reactElement = create(this, props);
            exposeMethods(reactElement, reactElement.props.container);
            exposeDefaultMethods(reactElement, reactElement.props.container);

            utils.getterSetter(this, 'props', function () {
                return reactElement.props;
            }, function (props) {
                reactElement = create(this, props);
            });
        };

        elementPrototype.detachedCallback = function () {
            ReactDOM.unmountComponentAtNode(this);
        };

        elementPrototype.attributeChangedCallback = function (name, oldValue, newValue) {
            var propertyName = utils.attributeNameToPropertyName(name),
                value = utils.parseAttributeValue(newValue);

            var props = utils.shallowCopy({}, this.props);
            props[propertyName] = value;
            reactElement = create(this, props);
        };

        registerElement(elementName, {prototype: elementPrototype});
    };

    function exposeDefaultMethods (reactComponent, customElement) {
        customElement.forceUpdate = reactComponent.forceUpdate.bind(reactComponent);
    }

    function exposeMethods (reactComponent, customElement) {
        utils.extend(customElement, reactComponent);
    }

    exports.utils = utils;

    document.registerReact = exports.registerReact;
}())

},{"./utils":2,"react":"CwoHg3","react-dom":"NKHcwr"}],2:[function(_dereq_,module,exports){
var React = window.React || _dereq_('react');

var getAllProperties = function (obj) {
    var props = {};
    while (obj && obj !== React.Component.prototype && obj !== Object.prototype) {
        var propNames = Object.getOwnPropertyNames(obj);
        for (var i = 0; i < propNames.length; i++) {
            props[propNames[i]] = null;
        }
        obj = Object.getPrototypeOf(obj);
    }
    delete props.constructor;
    return Object.keys(props);
};

exports.extend = function (extensible, extending) {
    var props = getAllProperties(extending);
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (!(prop in extensible)) {
            var val = extending[prop];
            if (typeof val === 'function') {
                val = val.bind(extending);
            }
            extensible[prop] = val;
        }
    }
};

exports.getProps = function (el) {
    var props = {};

    for (var i = 0; i < el.attributes.length; i++) {
        var attribute = el.attributes[i];
        var name = exports.attributeNameToPropertyName(attribute.name);
        props[name] = exports.parseAttributeValue(attribute.value);
    }

    props.container = el;

    return props;
};

exports.getterSetter = function (variableParent, variableName, getterFunction, setterFunction) {
    if (Object.defineProperty) {
        Object.defineProperty(variableParent, variableName, {
            get: getterFunction,
            set: setterFunction
        });
    }
    else if (document.__defineGetter__) {
        variableParent.__defineGetter__(variableName, getterFunction);
        variableParent.__defineSetter__(variableName, setterFunction);
    }

    variableParent['get' + variableName] = getterFunction;
    variableParent['set' + variableName] = setterFunction;
};

exports.attributeNameToPropertyName = function (attributeName) {
    return attributeName
        .replace(/^(x|data)[-_:]/i, '')
        .replace(/[-_:](.)/g, function (x, chr) {
            return chr.toUpperCase();
        });
};

exports.parseAttributeValue = function (value) {
    if (!value) {
        return null;
    }

    var pointerRegexp = /^{.*?}$/i,
        jsonRegexp = /^{{2}.*}{2}$/,
        jsonArrayRegexp = /^{\[.*\]}$/;

    var pointerMatches = value.match(pointerRegexp),
        jsonMatches = value.match(jsonRegexp) || value.match(jsonArrayRegexp);

    if (jsonMatches) {
        value = JSON.parse(jsonMatches[0].replace(/^{|}$/g, ''));
    } else if (pointerMatches) {
        value = eval(pointerMatches[0].replace(/[{}]/g, ''));
    }

    return value;
};

exports.getChildren = function (el) {
    var fragment = document.createDocumentFragment();
    while (el.childNodes.length) {
        fragment.appendChild(el.childNodes[0]);
    }
    return fragment;
};

exports.shallowCopy = function (a, b) {
    for (var key in b) a[key] = b[key];
    return a;
};

},{"react":"CwoHg3"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGVuaXNyYWRpbi9EZXNrdG9wL1dvcmsvUmVhY3RpdmVFbGVtZW50cy9zcmMvZmFrZV9mMWIxMmQ0MS5qcyIsIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVnaXN0ZXJFbGVtZW50ID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50IHx8IGRvY3VtZW50LnJlZ2lzdGVyO1xuXG4gICAgaWYgKHJlZ2lzdGVyRWxlbWVudCkge1xuICAgICAgICByZWdpc3RlckVsZW1lbnQgPSByZWdpc3RlckVsZW1lbnQuYmluZChkb2N1bWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjdXN0b20gZWxlbWVudCBzdXBwb3J0IG9yIHBvbHlmaWxsIGZvdW5kIScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIFJlYWN0ID0gd2luZG93LlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG4gICAgdmFyIFJlYWN0RE9NID0gd2luZG93LlJlYWN0RE9NIHx8IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuICAgIGV4cG9ydHMucmVnaXN0ZXJSZWFjdCA9IGZ1bmN0aW9uIChlbGVtZW50TmFtZSwgUmVhY3RDb21wb25lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRQcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG4gICAgICAgIHZhciByZWFjdEVsZW1lbnQ7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlKHBhcmVudCwgcHJvcHMpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdENvbXBvbmVudCwgcHJvcHMpO1xuICAgICAgICAgICAgcGFyZW50LnJlYWN0aXZlRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKGVsZW1lbnQsIHBhcmVudCwgcHJvcHMub25SZW5kZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5jcmVhdGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJvcHMgPSB1dGlscy5nZXRQcm9wcyh0aGlzKTtcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gdXRpbHMuZ2V0Q2hpbGRyZW4odGhpcyk7XG4gICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuICAgICAgICAgICAgZXhwb3NlTWV0aG9kcyhyZWFjdEVsZW1lbnQsIHJlYWN0RWxlbWVudC5wcm9wcy5jb250YWluZXIpO1xuICAgICAgICAgICAgZXhwb3NlRGVmYXVsdE1ldGhvZHMocmVhY3RFbGVtZW50LCByZWFjdEVsZW1lbnQucHJvcHMuY29udGFpbmVyKTtcblxuICAgICAgICAgICAgdXRpbHMuZ2V0dGVyU2V0dGVyKHRoaXMsICdwcm9wcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RFbGVtZW50LnByb3BzO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuZGV0YWNoZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gdXRpbHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKG5hbWUpLFxuICAgICAgICAgICAgICAgIHZhbHVlID0gdXRpbHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHV0aWxzLnNoYWxsb3dDb3B5KHt9LCB0aGlzLnByb3BzKTtcbiAgICAgICAgICAgIHByb3BzW3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50KGVsZW1lbnROYW1lLCB7cHJvdG90eXBlOiBlbGVtZW50UHJvdG90eXBlfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGV4cG9zZURlZmF1bHRNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xuICAgICAgICBjdXN0b21FbGVtZW50LmZvcmNlVXBkYXRlID0gcmVhY3RDb21wb25lbnQuZm9yY2VVcGRhdGUuYmluZChyZWFjdENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwb3NlTWV0aG9kcyAocmVhY3RDb21wb25lbnQsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgdXRpbHMuZXh0ZW5kKGN1c3RvbUVsZW1lbnQsIHJlYWN0Q29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBleHBvcnRzLnV0aWxzID0gdXRpbHM7XG5cbiAgICBkb2N1bWVudC5yZWdpc3RlclJlYWN0ID0gZXhwb3J0cy5yZWdpc3RlclJlYWN0O1xufSgpKVxuIiwidmFyIFJlYWN0ID0gd2luZG93LlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBnZXRBbGxQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBwcm9wcyA9IHt9O1xuICAgIHdoaWxlIChvYmogJiYgb2JqICE9PSBSZWFjdC5Db21wb25lbnQucHJvdG90eXBlICYmIG9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgcHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByb3BzW3Byb3BOYW1lc1tpXV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIH1cbiAgICBkZWxldGUgcHJvcHMuY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHByb3BzKTtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24gKGV4dGVuc2libGUsIGV4dGVuZGluZykge1xuICAgIHZhciBwcm9wcyA9IGdldEFsbFByb3BlcnRpZXMoZXh0ZW5kaW5nKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwcm9wID0gcHJvcHNbaV07XG4gICAgICAgIGlmICghKHByb3AgaW4gZXh0ZW5zaWJsZSkpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBleHRlbmRpbmdbcHJvcF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5iaW5kKGV4dGVuZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHRlbnNpYmxlW3Byb3BdID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0cy5nZXRQcm9wcyA9IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBwcm9wcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGUgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICB2YXIgbmFtZSA9IGV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgcHJvcHNbbmFtZV0gPSBleHBvcnRzLnBhcnNlQXR0cmlidXRlVmFsdWUoYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm9wcy5jb250YWluZXIgPSBlbDtcblxuICAgIHJldHVybiBwcm9wcztcbn07XG5cbmV4cG9ydHMuZ2V0dGVyU2V0dGVyID0gZnVuY3Rpb24gKHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uLCBzZXR0ZXJGdW5jdGlvbikge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIHtcbiAgICAgICAgICAgIGdldDogZ2V0dGVyRnVuY3Rpb24sXG4gICAgICAgICAgICBzZXQ6IHNldHRlckZ1bmN0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChkb2N1bWVudC5fX2RlZmluZUdldHRlcl9fKSB7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lR2V0dGVyX18odmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbik7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lU2V0dGVyX18odmFyaWFibGVOYW1lLCBzZXR0ZXJGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgdmFyaWFibGVQYXJlbnRbJ2dldCcgKyB2YXJpYWJsZU5hbWVdID0gZ2V0dGVyRnVuY3Rpb247XG4gICAgdmFyaWFibGVQYXJlbnRbJ3NldCcgKyB2YXJpYWJsZU5hbWVdID0gc2V0dGVyRnVuY3Rpb247XG59O1xuXG5leHBvcnRzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZSA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgLnJlcGxhY2UoL14oeHxkYXRhKVstXzpdL2ksICcnKVxuICAgICAgICAucmVwbGFjZSgvWy1fOl0oLikvZywgZnVuY3Rpb24gKHgsIGNocikge1xuICAgICAgICAgICAgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9KTtcbn07XG5cbmV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHBvaW50ZXJSZWdleHAgPSAvXnsuKj99JC9pLFxuICAgICAgICBqc29uUmVnZXhwID0gL157ezJ9Lip9ezJ9JC8sXG4gICAgICAgIGpzb25BcnJheVJlZ2V4cCA9IC9ee1xcWy4qXFxdfSQvO1xuXG4gICAgdmFyIHBvaW50ZXJNYXRjaGVzID0gdmFsdWUubWF0Y2gocG9pbnRlclJlZ2V4cCksXG4gICAgICAgIGpzb25NYXRjaGVzID0gdmFsdWUubWF0Y2goanNvblJlZ2V4cCkgfHwgdmFsdWUubWF0Y2goanNvbkFycmF5UmVnZXhwKTtcblxuICAgIGlmIChqc29uTWF0Y2hlcykge1xuICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UoanNvbk1hdGNoZXNbMF0ucmVwbGFjZSgvXnt8fSQvZywgJycpKTtcbiAgICB9IGVsc2UgaWYgKHBvaW50ZXJNYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gZXZhbChwb2ludGVyTWF0Y2hlc1swXS5yZXBsYWNlKC9be31dL2csICcnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufTtcblxuZXhwb3J0cy5nZXRDaGlsZHJlbiA9IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAoZWwuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWwuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnbWVudDtcbn07XG5cbmV4cG9ydHMuc2hhbGxvd0NvcHkgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIGZvciAodmFyIGtleSBpbiBiKSBhW2tleV0gPSBiW2tleV07XG4gICAgcmV0dXJuIGE7XG59O1xuIl19
(1)
});
