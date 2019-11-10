!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.ReactiveElements=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

},{}],2:[function(_dereq_,module,exports){
(function() {
    var registerElement = document.registerElement || document.register;

    if (registerElement) {
        registerElement = registerElement.bind(document);
    } else {
        throw new Error('No custom element support or polyfill found!');
        return;
    }

    var React = window.React || _dereq_('react');
    var ReactDOM = window.React || _dereq_('react-dom');
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

            var propertiesObject = {};
            propertiesObject[propertyName] = value;

            this.setProps(propertiesObject, function(){
                reactElement = create(this, this.props);
            });
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

},{"./utils":3,"react":"CwoHg3"}],3:[function(_dereq_,module,exports){
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
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL3NyYy9mYWtlX2I5ZTc1ZTNjLmpzIiwiL1VzZXJzL2RlbmlzcmFkaW4vRGVza3RvcC9Xb3JrL1JlYWN0aXZlRWxlbWVudHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLG51bGwsIihmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVnaXN0ZXJFbGVtZW50ID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50IHx8IGRvY3VtZW50LnJlZ2lzdGVyO1xuXG4gICAgaWYgKHJlZ2lzdGVyRWxlbWVudCkge1xuICAgICAgICByZWdpc3RlckVsZW1lbnQgPSByZWdpc3RlckVsZW1lbnQuYmluZChkb2N1bWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjdXN0b20gZWxlbWVudCBzdXBwb3J0IG9yIHBvbHlmaWxsIGZvdW5kIScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIFJlYWN0ID0gd2luZG93LlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG4gICAgdmFyIFJlYWN0RE9NID0gd2luZG93LlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0LWRvbScpO1xuICAgIHZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuICAgIGV4cG9ydHMucmVnaXN0ZXJSZWFjdCA9IGZ1bmN0aW9uIChlbGVtZW50TmFtZSwgUmVhY3RDb21wb25lbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnRQcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEhUTUxFbGVtZW50LnByb3RvdHlwZSk7XG4gICAgICAgIHZhciByZWFjdEVsZW1lbnQ7XG5cbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlKHBhcmVudCwgcHJvcHMpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gUmVhY3QuY3JlYXRlRWxlbWVudChSZWFjdENvbXBvbmVudCwgcHJvcHMpO1xuICAgICAgICAgICAgcGFyZW50LnJlYWN0aXZlRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3RET00ucmVuZGVyKGVsZW1lbnQsIHBhcmVudCwgcHJvcHMub25SZW5kZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5jcmVhdGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcHJvcHMgPSB1dGlscy5nZXRQcm9wcyh0aGlzKTtcbiAgICAgICAgICAgIHByb3BzLmNoaWxkcmVuID0gdXRpbHMuZ2V0Q2hpbGRyZW4odGhpcyk7XG4gICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuICAgICAgICAgICAgZXhwb3NlTWV0aG9kcyhyZWFjdEVsZW1lbnQsIHJlYWN0RWxlbWVudC5wcm9wcy5jb250YWluZXIpO1xuICAgICAgICAgICAgZXhwb3NlRGVmYXVsdE1ldGhvZHMocmVhY3RFbGVtZW50LCByZWFjdEVsZW1lbnQucHJvcHMuY29udGFpbmVyKTtcblxuICAgICAgICAgICAgdXRpbHMuZ2V0dGVyU2V0dGVyKHRoaXMsICdwcm9wcycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhY3RFbGVtZW50LnByb3BzO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuZGV0YWNoZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gdXRpbHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKG5hbWUpLFxuICAgICAgICAgICAgICAgIHZhbHVlID0gdXRpbHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShuZXdWYWx1ZSk7XG5cbiAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzT2JqZWN0ID0ge307XG4gICAgICAgICAgICBwcm9wZXJ0aWVzT2JqZWN0W3Byb3BlcnR5TmFtZV0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgdGhpcy5zZXRQcm9wcyhwcm9wZXJ0aWVzT2JqZWN0LCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCB0aGlzLnByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudChlbGVtZW50TmFtZSwge3Byb3RvdHlwZTogZWxlbWVudFByb3RvdHlwZX0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBleHBvc2VEZWZhdWx0TWV0aG9kcyAocmVhY3RDb21wb25lbnQsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgY3VzdG9tRWxlbWVudC5mb3JjZVVwZGF0ZSA9IHJlYWN0Q29tcG9uZW50LmZvcmNlVXBkYXRlLmJpbmQocmVhY3RDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cG9zZU1ldGhvZHMgKHJlYWN0Q29tcG9uZW50LCBjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIHV0aWxzLmV4dGVuZChjdXN0b21FbGVtZW50LCByZWFjdENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy51dGlscyA9IHV0aWxzO1xuXG4gICAgZG9jdW1lbnQucmVnaXN0ZXJSZWFjdCA9IGV4cG9ydHMucmVnaXN0ZXJSZWFjdDtcbn0oKSlcbiIsInZhciBnZXRBbGxQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBwcm9wcyA9IHt9O1xuICAgIHdoaWxlIChvYmogJiYgb2JqICE9PSBSZWFjdC5Db21wb25lbnQucHJvdG90eXBlICYmIG9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgcHJvcE5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHByb3BzW3Byb3BOYW1lc1tpXV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopO1xuICAgIH1cbiAgICBkZWxldGUgcHJvcHMuY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHByb3BzKTtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24gKGV4dGVuc2libGUsIGV4dGVuZGluZykge1xuICAgIHZhciBwcm9wcyA9IGdldEFsbFByb3BlcnRpZXMoZXh0ZW5kaW5nKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwcm9wID0gcHJvcHNbaV07XG4gICAgICAgIGlmICghKHByb3AgaW4gZXh0ZW5zaWJsZSkpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBleHRlbmRpbmdbcHJvcF07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5iaW5kKGV4dGVuZGluZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBleHRlbnNpYmxlW3Byb3BdID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0cy5nZXRQcm9wcyA9IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBwcm9wcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGUgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICB2YXIgbmFtZSA9IGV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgcHJvcHNbbmFtZV0gPSBleHBvcnRzLnBhcnNlQXR0cmlidXRlVmFsdWUoYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm9wcy5jb250YWluZXIgPSBlbDtcblxuICAgIHJldHVybiBwcm9wcztcbn07XG5cbmV4cG9ydHMuZ2V0dGVyU2V0dGVyID0gZnVuY3Rpb24gKHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uLCBzZXR0ZXJGdW5jdGlvbikge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIHtcbiAgICAgICAgICAgIGdldDogZ2V0dGVyRnVuY3Rpb24sXG4gICAgICAgICAgICBzZXQ6IHNldHRlckZ1bmN0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChkb2N1bWVudC5fX2RlZmluZUdldHRlcl9fKSB7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lR2V0dGVyX18odmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbik7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lU2V0dGVyX18odmFyaWFibGVOYW1lLCBzZXR0ZXJGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgdmFyaWFibGVQYXJlbnRbJ2dldCcgKyB2YXJpYWJsZU5hbWVdID0gZ2V0dGVyRnVuY3Rpb247XG4gICAgdmFyaWFibGVQYXJlbnRbJ3NldCcgKyB2YXJpYWJsZU5hbWVdID0gc2V0dGVyRnVuY3Rpb247XG59O1xuXG5leHBvcnRzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZSA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgLnJlcGxhY2UoL14oeHxkYXRhKVstXzpdL2ksICcnKVxuICAgICAgICAucmVwbGFjZSgvWy1fOl0oLikvZywgZnVuY3Rpb24gKHgsIGNocikge1xuICAgICAgICAgICAgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9KTtcbn07XG5cbmV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBwb2ludGVyUmVnZXhwID0gL157Lio/fSQvaSxcbiAgICAgICAganNvblJlZ2V4cCA9IC9ee3syfS4qfXsyfSQvLFxuICAgICAgICBqc29uQXJyYXlSZWdleHAgPSAvXntcXFsuKlxcXX0kLztcblxuICAgIHZhciBwb2ludGVyTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKHBvaW50ZXJSZWdleHApLFxuICAgICAgICBqc29uTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKGpzb25SZWdleHApIHx8IHZhbHVlLm1hdGNoKGpzb25BcnJheVJlZ2V4cCk7XG5cbiAgICBpZiAoanNvbk1hdGNoZXMpIHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGpzb25NYXRjaGVzWzBdLnJlcGxhY2UoL157fH0kL2csICcnKSk7XG4gICAgfSBlbHNlIGlmIChwb2ludGVyTWF0Y2hlcykge1xuICAgICAgICB2YWx1ZSA9IGV2YWwocG9pbnRlck1hdGNoZXNbMF0ucmVwbGFjZSgvW3t9XS9nLCAnJykpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbmV4cG9ydHMuZ2V0Q2hpbGRyZW4gPSBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgd2hpbGUgKGVsLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGVsLmNoaWxkTm9kZXNbMF0pO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZ21lbnQ7XG59XG4iXX0=
(2)
});
