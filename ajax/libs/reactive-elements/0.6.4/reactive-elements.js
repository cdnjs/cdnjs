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
    value = value.replace(/[\n\r]/g, '');

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qYW1lcy9Eb2N1bWVudHMvUmVhY3RpdmVFbGVtZW50cy9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL2phbWVzL0RvY3VtZW50cy9SZWFjdGl2ZUVsZW1lbnRzL3NyYy9mYWtlXzc5ZTljZGM3LmpzIiwiL1VzZXJzL2phbWVzL0RvY3VtZW50cy9SZWFjdGl2ZUVsZW1lbnRzL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWdpc3RlckVsZW1lbnQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQgfHwgZG9jdW1lbnQucmVnaXN0ZXI7XG5cbiAgICBpZiAocmVnaXN0ZXJFbGVtZW50KSB7XG4gICAgICAgIHJlZ2lzdGVyRWxlbWVudCA9IHJlZ2lzdGVyRWxlbWVudC5iaW5kKGRvY3VtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGN1c3RvbSBlbGVtZW50IHN1cHBvcnQgb3IgcG9seWZpbGwgZm91bmQhJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbiAgICB2YXIgUmVhY3RET00gPSB3aW5kb3cuUmVhY3RET00gfHwgcmVxdWlyZSgncmVhY3QtZG9tJyk7XG4gICAgdmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4gICAgZXhwb3J0cy5yZWdpc3RlclJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnROYW1lLCBSZWFjdENvbXBvbmVudCkge1xuICAgICAgICB2YXIgZWxlbWVudFByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcbiAgICAgICAgdmFyIHJlYWN0RWxlbWVudDtcblxuICAgICAgICBmdW5jdGlvbiBjcmVhdGUocGFyZW50LCBwcm9wcykge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBSZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0Q29tcG9uZW50LCBwcm9wcyk7XG4gICAgICAgICAgICBwYXJlbnQucmVhY3RpdmVFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoZWxlbWVudCwgcGFyZW50LCBwcm9wcy5vblJlbmRlcik7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IHV0aWxzLmdldFByb3BzKHRoaXMpO1xuICAgICAgICAgICAgcHJvcHMuY2hpbGRyZW4gPSB1dGlscy5nZXRDaGlsZHJlbih0aGlzKTtcbiAgICAgICAgICAgIHJlYWN0RWxlbWVudCA9IGNyZWF0ZSh0aGlzLCBwcm9wcyk7XG4gICAgICAgICAgICBleHBvc2VNZXRob2RzKHJlYWN0RWxlbWVudCwgcmVhY3RFbGVtZW50LnByb3BzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICBleHBvc2VEZWZhdWx0TWV0aG9kcyhyZWFjdEVsZW1lbnQsIHJlYWN0RWxlbWVudC5wcm9wcy5jb250YWluZXIpO1xuXG4gICAgICAgICAgICB1dGlscy5nZXR0ZXJTZXR0ZXIodGhpcywgJ3Byb3BzJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWFjdEVsZW1lbnQucHJvcHM7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgICAgICAgICByZWFjdEVsZW1lbnQgPSBjcmVhdGUodGhpcywgcHJvcHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZWxlbWVudFByb3RvdHlwZS5kZXRhY2hlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzKTtcbiAgICAgICAgfTtcblxuICAgICAgICBlbGVtZW50UHJvdG90eXBlLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eU5hbWUgPSB1dGlscy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUobmFtZSksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB1dGlscy5wYXJzZUF0dHJpYnV0ZVZhbHVlKG5ld1ZhbHVlKTtcblxuICAgICAgICAgICAgdmFyIHByb3BzID0gdXRpbHMuc2hhbGxvd0NvcHkoe30sIHRoaXMucHJvcHMpO1xuICAgICAgICAgICAgcHJvcHNbcHJvcGVydHlOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgcmVhY3RFbGVtZW50ID0gY3JlYXRlKHRoaXMsIHByb3BzKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckVsZW1lbnQoZWxlbWVudE5hbWUsIHtwcm90b3R5cGU6IGVsZW1lbnRQcm90b3R5cGV9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXhwb3NlRGVmYXVsdE1ldGhvZHMgKHJlYWN0Q29tcG9uZW50LCBjdXN0b21FbGVtZW50KSB7XG4gICAgICAgIGN1c3RvbUVsZW1lbnQuZm9yY2VVcGRhdGUgPSByZWFjdENvbXBvbmVudC5mb3JjZVVwZGF0ZS5iaW5kKHJlYWN0Q29tcG9uZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBvc2VNZXRob2RzIChyZWFjdENvbXBvbmVudCwgY3VzdG9tRWxlbWVudCkge1xuICAgICAgICB1dGlscy5leHRlbmQoY3VzdG9tRWxlbWVudCwgcmVhY3RDb21wb25lbnQpO1xuICAgIH1cblxuICAgIGV4cG9ydHMudXRpbHMgPSB1dGlscztcblxuICAgIGRvY3VtZW50LnJlZ2lzdGVyUmVhY3QgPSBleHBvcnRzLnJlZ2lzdGVyUmVhY3Q7XG59KCkpXG4iLCJ2YXIgUmVhY3QgPSB3aW5kb3cuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIGdldEFsbFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgdmFyIHByb3BzID0ge307XG4gICAgd2hpbGUgKG9iaiAmJiBvYmogIT09IFJlYWN0LkNvbXBvbmVudC5wcm90b3R5cGUgJiYgb2JqICE9PSBPYmplY3QucHJvdG90eXBlKSB7XG4gICAgICAgIHZhciBwcm9wTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcHJvcHNbcHJvcE5hbWVzW2ldXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaik7XG4gICAgfVxuICAgIGRlbGV0ZSBwcm9wcy5jb25zdHJ1Y3RvcjtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocHJvcHMpO1xufTtcblxuZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbiAoZXh0ZW5zaWJsZSwgZXh0ZW5kaW5nKSB7XG4gICAgdmFyIHByb3BzID0gZ2V0QWxsUHJvcGVydGllcyhleHRlbmRpbmcpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgICAgaWYgKCEocHJvcCBpbiBleHRlbnNpYmxlKSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IGV4dGVuZGluZ1twcm9wXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gdmFsLmJpbmQoZXh0ZW5kaW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4dGVuc2libGVbcHJvcF0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnRzLmdldFByb3BzID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIHByb3BzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZSA9IGVsLmF0dHJpYnV0ZXNbaV07XG4gICAgICAgIHZhciBuYW1lID0gZXhwb3J0cy5hdHRyaWJ1dGVOYW1lVG9Qcm9wZXJ0eU5hbWUoYXR0cmlidXRlLm5hbWUpO1xuICAgICAgICBwcm9wc1tuYW1lXSA9IGV4cG9ydHMucGFyc2VBdHRyaWJ1dGVWYWx1ZShhdHRyaWJ1dGUudmFsdWUpO1xuICAgIH1cblxuICAgIHByb3BzLmNvbnRhaW5lciA9IGVsO1xuXG4gICAgcmV0dXJuIHByb3BzO1xufTtcblxuZXhwb3J0cy5nZXR0ZXJTZXR0ZXIgPSBmdW5jdGlvbiAodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwgZ2V0dGVyRnVuY3Rpb24sIHNldHRlckZ1bmN0aW9uKSB7XG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFyaWFibGVQYXJlbnQsIHZhcmlhYmxlTmFtZSwge1xuICAgICAgICAgICAgZ2V0OiBnZXR0ZXJGdW5jdGlvbixcbiAgICAgICAgICAgIHNldDogc2V0dGVyRnVuY3Rpb25cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRvY3VtZW50Ll9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVHZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIGdldHRlckZ1bmN0aW9uKTtcbiAgICAgICAgdmFyaWFibGVQYXJlbnQuX19kZWZpbmVTZXR0ZXJfXyh2YXJpYWJsZU5hbWUsIHNldHRlckZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICB2YXJpYWJsZVBhcmVudFsnZ2V0JyArIHZhcmlhYmxlTmFtZV0gPSBnZXR0ZXJGdW5jdGlvbjtcbiAgICB2YXJpYWJsZVBhcmVudFsnc2V0JyArIHZhcmlhYmxlTmFtZV0gPSBzZXR0ZXJGdW5jdGlvbjtcbn07XG5cbmV4cG9ydHMuYXR0cmlidXRlTmFtZVRvUHJvcGVydHlOYW1lID0gZnVuY3Rpb24gKGF0dHJpYnV0ZU5hbWUpIHtcbiAgICByZXR1cm4gYXR0cmlidXRlTmFtZVxuICAgICAgICAucmVwbGFjZSgvXih4fGRhdGEpWy1fOl0vaSwgJycpXG4gICAgICAgIC5yZXBsYWNlKC9bLV86XSguKS9nLCBmdW5jdGlvbiAoeCwgY2hyKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIH0pO1xufTtcblxuZXhwb3J0cy5wYXJzZUF0dHJpYnV0ZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXFxuXFxyXS9nLCAnJyk7XG5cbiAgICB2YXIgcG9pbnRlclJlZ2V4cCA9IC9eey4qP30kL2ksXG4gICAgICAgIGpzb25SZWdleHAgPSAvXnt7Mn0uKn17Mn0kLyxcbiAgICAgICAganNvbkFycmF5UmVnZXhwID0gL157XFxbLipcXF19JC87XG5cbiAgICB2YXIgcG9pbnRlck1hdGNoZXMgPSB2YWx1ZS5tYXRjaChwb2ludGVyUmVnZXhwKSxcbiAgICAgICAganNvbk1hdGNoZXMgPSB2YWx1ZS5tYXRjaChqc29uUmVnZXhwKSB8fCB2YWx1ZS5tYXRjaChqc29uQXJyYXlSZWdleHApO1xuXG4gICAgaWYgKGpzb25NYXRjaGVzKSB7XG4gICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZShqc29uTWF0Y2hlc1swXS5yZXBsYWNlKC9ee3x9JC9nLCAnJykpO1xuICAgIH0gZWxzZSBpZiAocG9pbnRlck1hdGNoZXMpIHtcbiAgICAgICAgdmFsdWUgPSBldmFsKHBvaW50ZXJNYXRjaGVzWzBdLnJlcGxhY2UoL1t7fV0vZywgJycpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG5leHBvcnRzLmdldENoaWxkcmVuID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIHdoaWxlIChlbC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChlbC5jaGlsZE5vZGVzWzBdKTtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50O1xufTtcblxuZXhwb3J0cy5zaGFsbG93Q29weSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGIpIGFba2V5XSA9IGJba2V5XTtcbiAgICByZXR1cm4gYTtcbn07XG4iXX0=
(1)
});
