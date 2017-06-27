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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9kZW5pc3JhZGluL0Rlc2t0b3AvV29yay9SZWFjdGl2ZUVsZW1lbnRzL3NyYy9mYWtlXzYyMDk5ZjgxLmpzIiwiL1VzZXJzL2RlbmlzcmFkaW4vRGVza3RvcC9Xb3JrL1JlYWN0aXZlRWxlbWVudHMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWdpc3RlckVsZW1lbnQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQgfHwgZG9jdW1lbnQucmVnaXN0ZXI7XG5cbiAgICBpZiAocmVnaXN0ZXJFbGVtZW50KSB7XG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudCA9IHJlZ2lzdGVyRWxlbWVudC5iaW5kKGRvY3VtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGN1c3RvbSBlbGVtZW50IHN1cHBvcnQgb3IgcG9seWZpbGwgZm91bmQhJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbiAgICB2YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbiAgICBleHBvcnRzLnJlZ2lzdGVyUmVhY3QgPSBmdW5jdGlvbiAoZWxlbWVudE5hbWUsIFJlYWN0Q29tcG9uZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50UHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuICAgICAgICB2YXIgcmVhY3RFbGVtZW50O1xuXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZShwYXJlbnQsIHByb3BzKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3RDb21wb25lbnQsIHByb3BzKTtcbiAgICAgICAgICAgIHBhcmVudC5yZWFjdGl2ZUVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LnJlbmRlcihlbGVtZW50LCBwYXJlbnQsIHByb3BzLm9uUmVuZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuY3JlYXRlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHByb3BzID0gdXRpbHMuZ2V0UHJvcHModGhpcyk7XG4gICAgICAgICAgICBwcm9wcy5jaGlsZHJlbiA9IHV0aWxzLmdldENoaWxkcmVuKHRoaXMpO1xuICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHByb3BzKTtcbiAgICAgICAgICAgIGV4cG9zZU1ldGhvZHMocmVhY3RFbGVtZW50LCByZWFjdEVsZW1lbnQucHJvcHMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIGV4cG9zZURlZmF1bHRNZXRob2RzKHJlYWN0RWxlbWVudCwgcmVhY3RFbGVtZW50LnByb3BzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHV0aWxzLmdldHRlclNldHRlcih0aGlzLCAncHJvcHMnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWN0RWxlbWVudC5wcm9wcztcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChwcm9wcykge1xuICAgICAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmRldGFjaGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBSZWFjdC51bm1vdW50Q29tcG9uZW50QXROb2RlKHRoaXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGVsZW1lbnRQcm90b3R5cGUuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IHV0aWxzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZShuYW1lKSxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHV0aWxzLnBhcnNlQXR0cmlidXRlVmFsdWUobmV3VmFsdWUpO1xuXG4gICAgICAgICAgICB2YXIgcHJvcGVydGllc09iamVjdCA9IHt9O1xuICAgICAgICAgICAgcHJvcGVydGllc09iamVjdFtwcm9wZXJ0eU5hbWVdID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0UHJvcHMocHJvcGVydGllc09iamVjdCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgdGhpcy5wcm9wcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckVsZW1lbnQoZWxlbWVudE5hbWUsIHtwcm90b3R5cGU6IGVsZW1lbnRQcm90b3R5cGV9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXhwb3NlRGVmYXVsdE1ldGhvZHMgKHJlYWN0Q29tcG9uZW50LCBjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIGN1c3RvbUVsZW1lbnQuZm9yY2VVcGRhdGUgPSByZWFjdENvbXBvbmVudC5mb3JjZVVwZGF0ZS5iaW5kKHJlYWN0Q29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBvc2VNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xuICAgICAgICB1dGlscy5leHRlbmQoY3VzdG9tRWxlbWVudCwgcmVhY3RDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGV4cG9ydHMudXRpbHMgPSB1dGlscztcblxuICAgIGRvY3VtZW50LnJlZ2lzdGVyUmVhY3QgPSBleHBvcnRzLnJlZ2lzdGVyUmVhY3Q7XG59KCkpXG4iLCJ2YXIgZ2V0QWxsUHJvcGVydGllcyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgcHJvcHMgPSB7fTtcbiAgICB3aGlsZSAob2JqICYmIG9iaiAhPT0gUmVhY3QuQ29tcG9uZW50LnByb3RvdHlwZSAmJiBvYmogIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIHByb3BOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwcm9wc1twcm9wTmFtZXNbaV1dID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKTtcbiAgICB9XG4gICAgZGVsZXRlIHByb3BzLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wcyk7XG59O1xuXG5leHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uIChleHRlbnNpYmxlLCBleHRlbmRpbmcpIHtcbiAgICB2YXIgcHJvcHMgPSBnZXRBbGxQcm9wZXJ0aWVzKGV4dGVuZGluZyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgICBpZiAoIShwcm9wIGluIGV4dGVuc2libGUpKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gZXh0ZW5kaW5nW3Byb3BdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwuYmluZChleHRlbmRpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXh0ZW5zaWJsZVtwcm9wXSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydHMuZ2V0UHJvcHMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICB2YXIgcHJvcHMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXR0cmlidXRlID0gZWwuYXR0cmlidXRlc1tpXTtcbiAgICAgICAgdmFyIG5hbWUgPSBleHBvcnRzLmF0dHJpYnV0ZU5hbWVUb1Byb3BlcnR5TmFtZShhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgIHByb3BzW25hbWVdID0gZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlKGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvcHMuY29udGFpbmVyID0gZWw7XG5cbiAgICByZXR1cm4gcHJvcHM7XG59O1xuXG5leHBvcnRzLmdldHRlclNldHRlciA9IGZ1bmN0aW9uICh2YXJpYWJsZVBhcmVudCwgdmFyaWFibGVOYW1lLCBnZXR0ZXJGdW5jdGlvbiwgc2V0dGVyRnVuY3Rpb24pIHtcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YXJpYWJsZVBhcmVudCwgdmFyaWFibGVOYW1lLCB7XG4gICAgICAgICAgICBnZXQ6IGdldHRlckZ1bmN0aW9uLFxuICAgICAgICAgICAgc2V0OiBzZXR0ZXJGdW5jdGlvblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZG9jdW1lbnQuX19kZWZpbmVHZXR0ZXJfXykge1xuICAgICAgICB2YXJpYWJsZVBhcmVudC5fX2RlZmluZUdldHRlcl9fKHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24pO1xuICAgICAgICB2YXJpYWJsZVBhcmVudC5fX2RlZmluZVNldHRlcl9fKHZhcmlhYmxlTmFtZSwgc2V0dGVyRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIHZhcmlhYmxlUGFyZW50WydnZXQnICsgdmFyaWFibGVOYW1lXSA9IGdldHRlckZ1bmN0aW9uO1xuICAgIHZhcmlhYmxlUGFyZW50WydzZXQnICsgdmFyaWFibGVOYW1lXSA9IHNldHRlckZ1bmN0aW9uO1xufTtcblxuZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbiAoYXR0cmlidXRlTmFtZSkge1xuICAgIHJldHVybiBhdHRyaWJ1dGVOYW1lXG4gICAgICAgIC5yZXBsYWNlKC9eKHh8ZGF0YSlbLV86XS9pLCAnJylcbiAgICAgICAgLnJlcGxhY2UoL1stXzpdKC4pL2csIGZ1bmN0aW9uICh4LCBjaHIpIHtcbiAgICAgICAgICAgIHJldHVybiBjaHIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfSk7XG59O1xuXG5leHBvcnRzLnBhcnNlQXR0cmlidXRlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgcG9pbnRlclJlZ2V4cCA9IC9eey4qP30kL2ksXG4gICAgICAgIGpzb25SZWdleHAgPSAvXnt7Mn0uKn17Mn0kLyxcbiAgICAgICAganNvbkFycmF5UmVnZXhwID0gL157XFxbLipcXF19JC87XG5cbiAgICB2YXIgcG9pbnRlck1hdGNoZXMgPSB2YWx1ZS5tYXRjaChwb2ludGVyUmVnZXhwKSxcbiAgICAgICAganNvbk1hdGNoZXMgPSB2YWx1ZS5tYXRjaChqc29uUmVnZXhwKSB8fCB2YWx1ZS5tYXRjaChqc29uQXJyYXlSZWdleHApO1xuXG4gICAgaWYgKGpzb25NYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShqc29uTWF0Y2hlc1swXS5yZXBsYWNlKC9ee3x9JC9nLCAnJykpO1xuICAgIH0gZWxzZSBpZiAocG9pbnRlck1hdGNoZXMpIHtcbiAgICAgICAgdmFsdWUgPSBldmFsKHBvaW50ZXJNYXRjaGVzWzBdLnJlcGxhY2UoL1t7fV0vZywgJycpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnRzLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlIChlbC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50O1xufVxuIl19
(1)
});
