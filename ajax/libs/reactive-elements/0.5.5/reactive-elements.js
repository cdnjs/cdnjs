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
            parent.reactiveElement = element;
            return React.render(element, parent, props.onRender);
        }

        elementPrototype.createdCallback = function () {
            console.log('Created');
            var properties = utils.getProps(this);
            reactElement = create(this, properties);

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

},{"./utils":3}],3:[function(_dereq_,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZW5pc3JhZGluL1Jlc2VhcmNoZXMvSFRNTDpKUy9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGVuaXNyYWRpbi9SZXNlYXJjaGVzL0hUTUw6SlMvUmVhY3RpdmVFbGVtZW50cy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwiL1VzZXJzL2RlbmlzcmFkaW4vUmVzZWFyY2hlcy9IVE1MOkpTL1JlYWN0aXZlRWxlbWVudHMvc3JjL2Zha2VfYWI2YjU0YmMuanMiLCIvVXNlcnMvZGVuaXNyYWRpbi9SZXNlYXJjaGVzL0hUTUw6SlMvUmVhY3RpdmVFbGVtZW50cy9zcmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsbnVsbCwiKGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWdpc3RlckVsZW1lbnQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQgfHwgZG9jdW1lbnQucmVnaXN0ZXI7XG5cbiAgICBpZiAocmVnaXN0ZXJFbGVtZW50KSB7XG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudCA9IHJlZ2lzdGVyRWxlbWVudC5iaW5kKGRvY3VtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGN1c3RvbSBlbGVtZW50IHN1cHBvcnQgb3IgcG9seWZpbGwgZm91bmQhJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbiAgICBleHBvcnRzLnJlZ2lzdGVyUmVhY3QgPSBmdW5jdGlvbiAoZWxlbWVudE5hbWUsIFJlYWN0Q29tcG9uZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50UHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuICAgICAgICB2YXIgcmVhY3RFbGVtZW50O1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZShwYXJlbnQsIHByb3BzKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3RDb21wb25lbnQsIHByb3BzKTtcbiAgICAgICAgICAgIHBhcmVudC5yZWFjdGl2ZUVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LnJlbmRlcihlbGVtZW50LCBwYXJlbnQsIHByb3BzLm9uUmVuZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuY3JlYXRlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0ZWQnKTtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0aWVzID0gdXRpbHMuZ2V0UHJvcHModGhpcyk7XG4gICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcGVydGllcyk7XG5cbiAgICAgICAgICAgIGV4cG9zZU1ldGhvZHMocmVhY3RFbGVtZW50LCByZWFjdEVsZW1lbnQucHJvcHMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGV4cG9zZURlZmF1bHRNZXRob2RzKHJlYWN0RWxlbWVudCwgcmVhY3RFbGVtZW50LnByb3BzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHV0aWxzLmdldHRlclNldHRlcih0aGlzLCAncHJvcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0RWxlbWVudC5wcm9wcztcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmRldGFjaGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSZWFjdC51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IHV0aWxzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZShuYW1lKSxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHV0aWxzLnBhcnNlQXR0cmlidXRlVmFsdWUobmV3VmFsdWUpO1xuXG4gICAgICAgICAgICB2YXIgcHJvcGVydGllc09iamVjdCA9IHt9O1xuICAgICAgICAgICAgcHJvcGVydGllc09iamVjdFtwcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcHMocHJvcGVydGllc09iamVjdCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgdGhpcy5wcm9wcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckVsZW1lbnQoZWxlbWVudE5hbWUsIHtwcm90b3R5cGU6IGVsZW1lbnRQcm90b3R5cGV9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXhwb3NlRGVmYXVsdE1ldGhvZHMgKHJlYWN0Q29tcG9uZW50LCBjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIGN1c3RvbUVsZW1lbnQuZm9yY2VVcGRhdGUgPSByZWFjdENvbXBvbmVudC5mb3JjZVVwZGF0ZS5iaW5kKHJlYWN0Q29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBvc2VNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xuICAgICAgICB1dGlscy5leHRlbmQoY3VzdG9tRWxlbWVudCwgcmVhY3RDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGV4cG9ydHMudXRpbHMgPSB1dGlscztcblxuICAgIGRvY3VtZW50LnJlZ2lzdGVyUmVhY3QgPSBleHBvcnRzLnJlZ2lzdGVyUmVhY3Q7XG59KCkpXG4iLCJleHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uIChleHRhbmRhYmxlLCBleHRlbmRpbmcpIHtcbiAgICBmb3IgKHZhciBpIGluIGV4dGVuZGluZykge1xuICAgICAgICBpZiAoIShpIGluIGV4dGFuZGFibGUpKSB7XG4gICAgICAgICAgICBleHRhbmRhYmxlW2ldID0gZXh0ZW5kaW5nW2ldO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0cy5nZXRQcm9wcyA9IGZ1bmN0aW9uIChlbCkge1xuICAgIHZhciBwcm9wcyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGUgPSBlbC5hdHRyaWJ1dGVzW2ldO1xuICAgICAgICB2YXIgbmFtZSA9IGV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lKGF0dHJpYnV0ZS5uYW1lKTtcbiAgICAgICAgcHJvcHNbbmFtZV0gPSBleHBvcnRzLnBhcnNlQXR0cmlidXRlVmFsdWUoYXR0cmlidXRlLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm9wcy5jb250YWluZXIgPSBlbDtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGdldENoaWxkcmVuKGVsKTtcblxuICAgIHJldHVybiBwcm9wcztcbn07XG5cbmV4cG9ydHMuZ2V0dGVyU2V0dGVyID0gZnVuY3Rpb24gKHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uLCBzZXR0ZXJGdW5jdGlvbikge1xuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhcmlhYmxlUGFyZW50LCB2YXJpYWJsZU5hbWUsIHtcbiAgICAgICAgICAgIGdldDogZ2V0dGVyRnVuY3Rpb24sXG4gICAgICAgICAgICBzZXQ6IHNldHRlckZ1bmN0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmIChkb2N1bWVudC5fX2RlZmluZUdldHRlcl9fKSB7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lR2V0dGVyX18odmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbik7XG4gICAgICAgIHZhcmlhYmxlUGFyZW50Ll9fZGVmaW5lU2V0dGVyX18odmFyaWFibGVOYW1lLCBzZXR0ZXJGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgdmFyaWFibGVQYXJlbnRbJ2dldCcgKyB2YXJpYWJsZU5hbWVdID0gZ2V0dGVyRnVuY3Rpb247XG4gICAgdmFyaWFibGVQYXJlbnRbJ3NldCcgKyB2YXJpYWJsZU5hbWVdID0gc2V0dGVyRnVuY3Rpb247XG59O1xuXG5leHBvcnRzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZSA9IGZ1bmN0aW9uIChhdHRyaWJ1dGVOYW1lKSB7XG4gICAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVcbiAgICAgICAgLnJlcGxhY2UoL14oeHxkYXRhKVstXzpdL2ksICcnKVxuICAgICAgICAucmVwbGFjZSgvWy1fOl0oLikvZywgZnVuY3Rpb24gKHgsIGNocikge1xuICAgICAgICAgICAgcmV0dXJuIGNoci50b1VwcGVyQ2FzZSgpO1xuICAgICAgICB9KTtcbn07XG5cbmV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciBwb2ludGVyUmVnZXhwID0gL157Lio/fSQvaSxcbiAgICAgICAganNvblJlZ2V4cCA9IC9ee3syfS4qfXsyfSQvLFxuICAgICAgICBqc29uQXJyYXlSZWdleHAgPSAvXntcXFsuKlxcXX0kLztcblxuICAgIHZhciBwb2ludGVyTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKHBvaW50ZXJSZWdleHApLFxuICAgICAgICBqc29uTWF0Y2hlcyA9IHZhbHVlLm1hdGNoKGpzb25SZWdleHApIHx8IHZhbHVlLm1hdGNoKGpzb25BcnJheVJlZ2V4cCk7XG5cbiAgICBpZiAoanNvbk1hdGNoZXMpIHtcbiAgICAgICAgdmFsdWUgPSBKU09OLnBhcnNlKGpzb25NYXRjaGVzWzBdLnJlcGxhY2UoL157fH0kL2csICcnKSk7XG4gICAgfSBlbHNlIGlmIChwb2ludGVyTWF0Y2hlcykge1xuICAgICAgICB2YWx1ZSA9IGV2YWwocG9pbnRlck1hdGNoZXNbMF0ucmVwbGFjZSgvW3t9XS9nLCAnJykpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIGdldENoaWxkcmVuKGVsKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlIChlbC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50O1xufVxuIl19
(2)
});
