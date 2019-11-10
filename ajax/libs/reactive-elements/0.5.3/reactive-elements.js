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
    var utils = _dereq_('./utils');

    exports.registerReact = function (elementName, ReactComponent) {
        var elementPrototype = Object.create(HTMLElement.prototype);
        var reactElement;

        function create(parent, props) {
            var element = React.createElement(ReactComponent, props);
            return React.render(element, parent, props.onRender);
        }

        elementPrototype.createdCallback = function () {
            console.log('Created');
            var properties = utils.getProps(this);
            reactElement = create(this, properties);

            exposeDefaultMethods(reactElement, reactElement.props.container);
            exposeMethods(reactElement, reactElement.props.container);

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

},{"./utils":3}],3:[function(_dereq_,module,exports){
exports.extend = function (extandable, extending) {
    for (var i in extending) {
        if (!(i in extandable)) {
            if (typeof extending[i] === 'function') {
                extandable[i] = extending[i].bind(extending);
            } else {
                extandable[i] = extending[i];
            }
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
    props.children = getChildren(el);

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

function getChildren(el) {
    var fragment = document.createDocumentFragment();
    while (el.childNodes.length) {
        fragment.appendChild(el.childNodes[0]);
    }
    return fragment;
}

},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZW5pc3JhZGluL1Jlc2VhcmNoZXMvSFRNTDpKUy9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGVuaXNyYWRpbi9SZXNlYXJjaGVzL0hUTUw6SlMvUmVhY3RpdmVFbGVtZW50cy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwiL1VzZXJzL2RlbmlzcmFkaW4vUmVzZWFyY2hlcy9IVE1MOkpTL1JlYWN0aXZlRWxlbWVudHMvc3JjL2Zha2VfN2M1MTU2OWIuanMiLCIvVXNlcnMvZGVuaXNyYWRpbi9SZXNlYXJjaGVzL0hUTUw6SlMvUmVhY3RpdmVFbGVtZW50cy9zcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsbnVsbCwiKGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWdpc3RlckVsZW1lbnQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQgfHwgZG9jdW1lbnQucmVnaXN0ZXI7XG5cbiAgICBpZiAocmVnaXN0ZXJFbGVtZW50KSB7XG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudCA9IHJlZ2lzdGVyRWxlbWVudC5iaW5kKGRvY3VtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGN1c3RvbSBlbGVtZW50IHN1cHBvcnQgb3IgcG9seWZpbGwgZm91bmQhJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbiAgICBleHBvcnRzLnJlZ2lzdGVyUmVhY3QgPSBmdW5jdGlvbiAoZWxlbWVudE5hbWUsIFJlYWN0Q29tcG9uZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50UHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuICAgICAgICB2YXIgcmVhY3RFbGVtZW50O1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZShwYXJlbnQsIHByb3BzKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3RDb21wb25lbnQsIHByb3BzKTtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5yZW5kZXIoZWxlbWVudCwgcGFyZW50LCBwcm9wcy5vblJlbmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDcmVhdGVkJyk7XG4gICAgICAgICAgICB2YXIgcHJvcGVydGllcyA9IHV0aWxzLmdldFByb3BzKHRoaXMpO1xuICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHByb3BlcnRpZXMpO1xuXG4gICAgICAgICAgICBleHBvc2VEZWZhdWx0TWV0aG9kcyhyZWFjdEVsZW1lbnQsIHJlYWN0RWxlbWVudC5wcm9wcy5jb250YWluZXIpO1xuICAgICAgICAgICAgZXhwb3NlTWV0aG9kcyhyZWFjdEVsZW1lbnQsIHJlYWN0RWxlbWVudC5wcm9wcy5jb250YWluZXIpO1xuXG4gICAgICAgICAgICB1dGlscy5nZXR0ZXJTZXR0ZXIodGhpcywgJ3Byb3BzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWFjdEVsZW1lbnQucHJvcHM7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5kZXRhY2hlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVhY3QudW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSB1dGlscy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUobmFtZSksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB1dGlscy5wYXJzZUF0dHJpYnV0ZVZhbHVlKG5ld1ZhbHVlKTtcblxuICAgICAgICAgICAgdmFyIHByb3BlcnRpZXNPYmplY3QgPSB7fTtcbiAgICAgICAgICAgIHByb3BlcnRpZXNPYmplY3RbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICB0aGlzLnNldFByb3BzKHByb3BlcnRpZXNPYmplY3QsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHRoaXMucHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50KGVsZW1lbnROYW1lLCB7cHJvdG90eXBlOiBlbGVtZW50UHJvdG90eXBlfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGV4cG9zZURlZmF1bHRNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xuICAgICAgICBjdXN0b21FbGVtZW50LmZvcmNlVXBkYXRlID0gcmVhY3RDb21wb25lbnQuZm9yY2VVcGRhdGUuYmluZChyZWFjdENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwb3NlTWV0aG9kcyAocmVhY3RDb21wb25lbnQsIGN1c3RvbUVsZW1lbnQpIHtcbiAgICAgICAgdXRpbHMuZXh0ZW5kKGN1c3RvbUVsZW1lbnQsIHJlYWN0Q29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBleHBvcnRzLnV0aWxzID0gdXRpbHM7XG5cbiAgICBkb2N1bWVudC5yZWdpc3RlclJlYWN0ID0gZXhwb3J0cy5yZWdpc3RlclJlYWN0O1xufSgpKVxuIiwiZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbiAoZXh0YW5kYWJsZSwgZXh0ZW5kaW5nKSB7XG4gICAgZm9yICh2YXIgaSBpbiBleHRlbmRpbmcpIHtcbiAgICAgICAgaWYgKCEoaSBpbiBleHRhbmRhYmxlKSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBleHRlbmRpbmdbaV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBleHRhbmRhYmxlW2ldID0gZXh0ZW5kaW5nW2ldLmJpbmQoZXh0ZW5kaW5nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXh0YW5kYWJsZVtpXSA9IGV4dGVuZGluZ1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydHMuZ2V0UHJvcHMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgcHJvcHMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgdmFyIG5hbWUgPSBleHBvcnRzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIHByb3BzW25hbWVdID0gZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvcHMuY29udGFpbmVyID0gZWw7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihlbCk7XG5cbiAgICByZXR1cm4gcHJvcHM7XG59O1xuXG5leHBvcnRzLmdldHRlclNldHRlciA9IGZ1bmN0aW9uICh2YXJpYWJsZVBhcmVudCwgdmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbiwgc2V0dGVyRnVuY3Rpb24pIHtcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YXJpYWJsZVBhcmVudCwgdmFyaWFibGVOYW1lLCB7XG4gICAgICAgICAgICBnZXQ6IGdldHRlckZ1bmN0aW9uLFxuICAgICAgICAgICAgc2V0OiBzZXR0ZXJGdW5jdGlvblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZG9jdW1lbnQuX19kZWZpbmVHZXR0ZXJfXykge1xuICAgICAgICB2YXJpYWJsZVBhcmVudC5fX2RlZmluZUdldHRlcl9fKHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24pO1xuICAgICAgICB2YXJpYWJsZVBhcmVudC5fX2RlZmluZVNldHRlcl9fKHZhcmlhYmxlTmFtZSwgc2V0dGVyRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHZhcmlhYmxlUGFyZW50WydnZXQnICsgdmFyaWFibGVOYW1lXSA9IGdldHRlckZ1bmN0aW9uO1xuICAgIHZhcmlhYmxlUGFyZW50WydzZXQnICsgdmFyaWFibGVOYW1lXSA9IHNldHRlckZ1bmN0aW9uO1xufTtcblxuZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lXG4gICAgICAgIC5yZXBsYWNlKC9eKHh8ZGF0YSlbLV86XS9pLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1stXzpdKC4pL2csIGZ1bmN0aW9uICh4LCBjaHIpIHtcbiAgICAgICAgICAgIHJldHVybiBjaHIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfSk7XG59O1xuXG5leHBvcnRzLnBhcnNlQXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgcG9pbnRlclJlZ2V4cCA9IC9eey4qP30kL2ksXG4gICAgICAgIGpzb25SZWdleHAgPSAvXnt7Mn0uKn17Mn0kLyxcbiAgICAgICAganNvbkFycmF5UmVnZXhwID0gL157XFxbLipcXF19JC87XG5cbiAgICB2YXIgcG9pbnRlck1hdGNoZXMgPSB2YWx1ZS5tYXRjaChwb2ludGVyUmVnZXhwKSxcbiAgICAgICAganNvbk1hdGNoZXMgPSB2YWx1ZS5tYXRjaChqc29uUmVnZXhwKSB8fCB2YWx1ZS5tYXRjaChqc29uQXJyYXlSZWdleHApO1xuXG4gICAgaWYgKGpzb25NYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShqc29uTWF0Y2hlc1swXS5yZXBsYWNlKC9ee3x9JC9nLCAnJykpO1xuICAgIH0gZWxzZSBpZiAocG9pbnRlck1hdGNoZXMpIHtcbiAgICAgICAgdmFsdWUgPSBldmFsKHBvaW50ZXJNYXRjaGVzWzBdLnJlcGxhY2UoL1t7fV0vZywgJycpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiBnZXRDaGlsZHJlbihlbCkge1xuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAoZWwuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWwuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnbWVudDtcbn1cbiJdfQ==
(2)
});
