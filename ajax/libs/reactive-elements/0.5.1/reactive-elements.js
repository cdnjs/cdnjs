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
            return React.render(element, parent);
        }

        elementPrototype.createdCallback = function () {
            reactElement = create(this, utils.getProps(this));
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

            this.props[propertyName] = value;
            reactElement = create(this, this.props);
        };

        registerElement(elementName, {prototype: elementPrototype});
    };

    function exposeDefaultMethods (reactComponent, customElement) {
        customElement.forceUpdate = reactComponent.forceUpdate.bind(reactComponent);
    }

    exports.utils = utils;

    document.registerReact = exports.registerReact;
}())

},{"./utils":2,"react":"CwoHg3"}],2:[function(_dereq_,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL3NyYy9mYWtlXzk3NWE0OWJmLmpzIiwiL1VzZXJzL2RlbmlzcmFkaW4vRGVza3RvcC9Xb3JrL1JlYWN0aXZlRWxlbWVudHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWdpc3RlckVsZW1lbnQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQgfHwgZG9jdW1lbnQucmVnaXN0ZXI7XG5cbiAgICBpZiAocmVnaXN0ZXJFbGVtZW50KSB7XG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudCA9IHJlZ2lzdGVyRWxlbWVudC5iaW5kKGRvY3VtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGN1c3RvbSBlbGVtZW50IHN1cHBvcnQgb3IgcG9seWZpbGwgZm91bmQhJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbiAgICBleHBvcnRzLnJlZ2lzdGVyUmVhY3QgPSBmdW5jdGlvbiAoZWxlbWVudE5hbWUsIFJlYWN0Q29tcG9uZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50UHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuICAgICAgICB2YXIgcmVhY3RFbGVtZW50O1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZShwYXJlbnQsIHByb3BzKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3RDb21wb25lbnQsIHByb3BzKTtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5yZW5kZXIoZWxlbWVudCwgcGFyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuY3JlYXRlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHV0aWxzLmdldFByb3BzKHRoaXMpKTtcbiAgICAgICAgICAgIGV4cG9zZURlZmF1bHRNZXRob2RzKHJlYWN0RWxlbWVudCwgcmVhY3RFbGVtZW50LnByb3BzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICB1dGlscy5nZXR0ZXJTZXR0ZXIodGhpcywgJ3Byb3BzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWFjdEVsZW1lbnQucHJvcHM7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5kZXRhY2hlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVhY3QudW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSB1dGlscy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUobmFtZSksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB1dGlscy5wYXJzZUF0dHJpYnV0ZVZhbHVlKG5ld1ZhbHVlKTtcblxuICAgICAgICAgICAgdGhpcy5wcm9wc1twcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgdGhpcy5wcm9wcyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJFbGVtZW50KGVsZW1lbnROYW1lLCB7cHJvdG90eXBlOiBlbGVtZW50UHJvdG90eXBlfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGV4cG9zZURlZmF1bHRNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xuICAgICAgICBjdXN0b21FbGVtZW50LmZvcmNlVXBkYXRlID0gcmVhY3RDb21wb25lbnQuZm9yY2VVcGRhdGUuYmluZChyZWFjdENvbXBvbmVudCk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy51dGlscyA9IHV0aWxzO1xuXG4gICAgZG9jdW1lbnQucmVnaXN0ZXJSZWFjdCA9IGV4cG9ydHMucmVnaXN0ZXJSZWFjdDtcbn0oKSlcbiIsImV4cG9ydHMuZ2V0UHJvcHMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgcHJvcHMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgdmFyIG5hbWUgPSBleHBvcnRzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIHByb3BzW25hbWVdID0gZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvcHMuY29udGFpbmVyID0gZWw7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBnZXRDaGlsZHJlbihlbCk7XG5cbiAgICByZXR1cm4gcHJvcHM7XG59O1xuXG5leHBvcnRzLmdldHRlclNldHRlciA9IGZ1bmN0aW9uICh2YXJpYWJsZVBhcmVudCwgdmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbiwgc2V0dGVyRnVuY3Rpb24pIHtcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YXJpYWJsZVBhcmVudCwgdmFyaWFibGVOYW1lLCB7XG4gICAgICAgICAgICBnZXQ6IGdldHRlckZ1bmN0aW9uLFxuICAgICAgICAgICAgc2V0OiBzZXR0ZXJGdW5jdGlvblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZG9jdW1lbnQuX19kZWZpbmVHZXR0ZXJfXykge1xuICAgICAgICB2YXJpYWJsZVBhcmVudC5fX2RlZmluZUdldHRlcl9fKHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24pO1xuICAgICAgICB2YXJpYWJsZVBhcmVudC5fX2RlZmluZVNldHRlcl9fKHZhcmlhYmxlTmFtZSwgc2V0dGVyRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHZhcmlhYmxlUGFyZW50WydnZXQnICsgdmFyaWFibGVOYW1lXSA9IGdldHRlckZ1bmN0aW9uO1xuICAgIHZhcmlhYmxlUGFyZW50WydzZXQnICsgdmFyaWFibGVOYW1lXSA9IHNldHRlckZ1bmN0aW9uO1xufTtcblxuZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lXG4gICAgICAgIC5yZXBsYWNlKC9eKHh8ZGF0YSlbLV86XS9pLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1stXzpdKC4pL2csIGZ1bmN0aW9uICh4LCBjaHIpIHtcbiAgICAgICAgICAgIHJldHVybiBjaHIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfSk7XG59O1xuXG5leHBvcnRzLnBhcnNlQXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgcG9pbnRlclJlZ2V4cCA9IC9eey4qP30kL2ksXG4gICAgICAgIGpzb25SZWdleHAgPSAvXnt7Mn0uKn17Mn0kLyxcbiAgICAgICAganNvbkFycmF5UmVnZXhwID0gL157XFxbLipcXF19JC87XG5cbiAgICB2YXIgcG9pbnRlck1hdGNoZXMgPSB2YWx1ZS5tYXRjaChwb2ludGVyUmVnZXhwKSxcbiAgICAgICAganNvbk1hdGNoZXMgPSB2YWx1ZS5tYXRjaChqc29uUmVnZXhwKSB8fCB2YWx1ZS5tYXRjaChqc29uQXJyYXlSZWdleHApO1xuXG4gICAgaWYgKGpzb25NYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShqc29uTWF0Y2hlc1swXS5yZXBsYWNlKC9ee3x9JC9nLCAnJykpO1xuICAgIH0gZWxzZSBpZiAocG9pbnRlck1hdGNoZXMpIHtcbiAgICAgICAgdmFsdWUgPSBldmFsKHBvaW50ZXJNYXRjaGVzWzBdLnJlcGxhY2UoL1t7fV0vZywgJycpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiBnZXRDaGlsZHJlbihlbCkge1xuICAgIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICB3aGlsZSAoZWwuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZWwuY2hpbGROb2Rlc1swXSk7XG4gICAgfVxuICAgIHJldHVybiBmcmFnbWVudDtcbn1cbiJdfQ==
(1)
});
