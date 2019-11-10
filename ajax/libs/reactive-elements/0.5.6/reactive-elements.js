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
    var utils = _dereq_('./utils');

    exports.registerReact = function (elementName, ReactComponent) {
        var elementPrototype = Object.create(HTMLElement.prototype);
        var reactElement;

        function create(parent, props) {
            var element = React.createElement(ReactComponent, props);
            parent.reactiveElement = element;
            return React.render(element, parent, props.onRender);
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
            React.unmountComponentAtNode(this);
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

},{"./utils":2,"react":"CwoHg3"}],2:[function(_dereq_,module,exports){
exports.extend = function (extandable, extending) {
    for (var i in extending) {
        if (!(i in extandable)) {
            extandable[i] = extending[i];
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL3NyYy9mYWtlXzRiNWFmM2EyLmpzIiwiL1VzZXJzL2RlbmlzcmFkaW4vRGVza3RvcC9Xb3JrL1JlYWN0aXZlRWxlbWVudHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVnaXN0ZXJFbGVtZW50ID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50IHx8IGRvY3VtZW50LnJlZ2lzdGVyO1xuXG4gICAgaWYgKHJlZ2lzdGVyRWxlbWVudCkge1xuICAgICAgICByZWdpc3RlckVsZW1lbnQgPSByZWdpc3RlckVsZW1lbnQuYmluZChkb2N1bWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjdXN0b20gZWxlbWVudCBzdXBwb3J0IG9yIHBvbHlmaWxsIGZvdW5kIScpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIFJlYWN0ID0gd2luZG93LlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4gICAgZXhwb3J0cy5yZWdpc3RlclJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnROYW1lLCBSZWFjdENvbXBvbmVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcbiAgICAgICAgdmFyIHJlYWN0RWxlbWVudDtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUocGFyZW50LCBwcm9wcykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0Q29tcG9uZW50LCBwcm9wcyk7XG4gICAgICAgICAgICBwYXJlbnQucmVhY3RpdmVFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5yZW5kZXIoZWxlbWVudCwgcGFyZW50LCBwcm9wcy5vblJlbmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHV0aWxzLmdldFByb3BzKHRoaXMpO1xuICAgICAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSB1dGlscy5nZXRDaGlsZHJlbih0aGlzKTtcbiAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XG4gICAgICAgICAgICBleHBvc2VNZXRob2RzKHJlYWN0RWxlbWVudCwgcmVhY3RFbGVtZW50LnByb3BzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBleHBvc2VEZWZhdWx0TWV0aG9kcyhyZWFjdEVsZW1lbnQsIHJlYWN0RWxlbWVudC5wcm9wcy5jb250YWluZXIpO1xuXG4gICAgICAgICAgICB1dGlscy5nZXR0ZXJTZXR0ZXIodGhpcywgJ3Byb3BzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWFjdEVsZW1lbnQucHJvcHM7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5kZXRhY2hlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVhY3QudW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSB1dGlscy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUobmFtZSksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB1dGlscy5wYXJzZUF0dHJpYnV0ZVZhbHVlKG5ld1ZhbHVlKTtcblxuICAgICAgICAgICAgdmFyIHByb3BlcnRpZXNPYmplY3QgPSB7fTtcbiAgICAgICAgICAgIHByb3BlcnRpZXNPYmplY3RbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLnNldFByb3BzKHByb3BlcnRpZXNPYmplY3QsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHRoaXMucHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50KGVsZW1lbnROYW1lLCB7cHJvdG90eXBlOiBlbGVtZW50UHJvdG90eXBlfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGV4cG9zZURlZmF1bHRNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xuICAgICAgICBjdXN0b21FbGVtZW50LmZvcmNlVXBkYXRlID0gcmVhY3RDb21wb25lbnQuZm9yY2VVcGRhdGUuYmluZChyZWFjdENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwb3NlTWV0aG9kcyAocmVhY3RDb21wb25lbnQsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgdXRpbHMuZXh0ZW5kKGN1c3RvbUVsZW1lbnQsIHJlYWN0Q29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBleHBvcnRzLnV0aWxzID0gdXRpbHM7XG5cbiAgICBkb2N1bWVudC5yZWdpc3RlclJlYWN0ID0gZXhwb3J0cy5yZWdpc3RlclJlYWN0O1xufSgpKVxuIiwiZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbiAoZXh0YW5kYWJsZSwgZXh0ZW5kaW5nKSB7XG4gICAgZm9yICh2YXIgaSBpbiBleHRlbmRpbmcpIHtcbiAgICAgICAgaWYgKCEoaSBpbiBleHRhbmRhYmxlKSkge1xuICAgICAgICAgICAgZXh0YW5kYWJsZVtpXSA9IGV4dGVuZGluZ1tpXTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydHMuZ2V0UHJvcHMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgcHJvcHMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgdmFyIG5hbWUgPSBleHBvcnRzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIHByb3BzW25hbWVdID0gZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvcHMuY29udGFpbmVyID0gZWw7XG5cbiAgICByZXR1cm4gcHJvcHM7XG59O1xuXG5leHBvcnRzLmdldHRlclNldHRlciA9IGZ1bmN0aW9uICh2YXJpYWJsZVBhcmVudCwgdmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbiwgc2V0dGVyRnVuY3Rpb24pIHtcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YXJpYWJsZVBhcmVudCwgdmFyaWFibGVOYW1lLCB7XG4gICAgICAgICAgICBnZXQ6IGdldHRlckZ1bmN0aW9uLFxuICAgICAgICAgICAgc2V0OiBzZXR0ZXJGdW5jdGlvblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZG9jdW1lbnQuX19kZWZpbmVHZXR0ZXJfXykge1xuICAgICAgICB2YXJpYWJsZVBhcmVudC5fX2RlZmluZUdldHRlcl9fKHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24pO1xuICAgICAgICB2YXJpYWJsZVBhcmVudC5fX2RlZmluZVNldHRlcl9fKHZhcmlhYmxlTmFtZSwgc2V0dGVyRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHZhcmlhYmxlUGFyZW50WydnZXQnICsgdmFyaWFibGVOYW1lXSA9IGdldHRlckZ1bmN0aW9uO1xuICAgIHZhcmlhYmxlUGFyZW50WydzZXQnICsgdmFyaWFibGVOYW1lXSA9IHNldHRlckZ1bmN0aW9uO1xufTtcblxuZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lXG4gICAgICAgIC5yZXBsYWNlKC9eKHh8ZGF0YSlbLV86XS9pLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1stXzpdKC4pL2csIGZ1bmN0aW9uICh4LCBjaHIpIHtcbiAgICAgICAgICAgIHJldHVybiBjaHIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfSk7XG59O1xuXG5leHBvcnRzLnBhcnNlQXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgcG9pbnRlclJlZ2V4cCA9IC9eey4qP30kL2ksXG4gICAgICAgIGpzb25SZWdleHAgPSAvXnt7Mn0uKn17Mn0kLyxcbiAgICAgICAganNvbkFycmF5UmVnZXhwID0gL157XFxbLipcXF19JC87XG5cbiAgICB2YXIgcG9pbnRlck1hdGNoZXMgPSB2YWx1ZS5tYXRjaChwb2ludGVyUmVnZXhwKSxcbiAgICAgICAganNvbk1hdGNoZXMgPSB2YWx1ZS5tYXRjaChqc29uUmVnZXhwKSB8fCB2YWx1ZS5tYXRjaChqc29uQXJyYXlSZWdleHApO1xuXG4gICAgaWYgKGpzb25NYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShqc29uTWF0Y2hlc1swXS5yZXBsYWNlKC9ee3x9JC9nLCAnJykpO1xuICAgIH0gZWxzZSBpZiAocG9pbnRlck1hdGNoZXMpIHtcbiAgICAgICAgdmFsdWUgPSBldmFsKHBvaW50ZXJNYXRjaGVzWzBdLnJlcGxhY2UoL1t7fV0vZywgJycpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnRzLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlIChlbC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50O1xufVxuIl19
(1)
});
