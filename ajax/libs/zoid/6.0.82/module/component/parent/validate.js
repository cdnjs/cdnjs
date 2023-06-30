var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// $FlowFixMe

/* eslint complexity: off */

export function validateProp(prop, key, value, props) {
    var required = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;


    var hasProp = value !== null && value !== undefined && value !== '';

    if (!hasProp) {
        if (required && prop.required !== false && !prop.hasOwnProperty('def')) {
            throw new Error('Prop is required: ' + key);
        }

        return;
    }

    if (value && typeof value.then === 'function' && prop.promise) {
        return;
    }

    if (prop.type === 'function') {

        if (!(typeof value === 'function')) {
            throw new TypeError('Prop is not of type function: ' + key);
        }
    } else if (prop.type === 'string') {

        if (typeof value !== 'string') {
            throw new TypeError('Prop is not of type string: ' + key);
        }
    } else if (prop.type === 'object') {

        // Since we're sending everything by post-message, everything must be json serializable

        if (prop.sendToChild !== false) {
            try {
                JSON.stringify(value);
            } catch (err) {
                throw new Error('Unable to serialize prop: ' + key);
            }
        }
    } else if (prop.type === 'number') {

        if (isNaN(parseInt(value, 10))) {
            throw new TypeError('Prop is not a number: ' + key);
        }
    }

    if (typeof prop.validate === 'function' && value) {
        prop.validate(value, props);
    }
}

/*  Validate Props
    --------------

    Validate user-defined props. Users can pass props down from the parent into the child component, but first we
    double check the values are what we expect, based on the props spec defined in the original component.
*/

export function validateProps(component, props) {
    var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


    props = props || {};

    if (props.env && _typeof(component.url) === 'object' && !component.url[props.env]) {
        throw new Error('Invalid env: ' + props.env);
    }

    // Set aliases

    for (var _i2 = 0, _component$getPropNam2 = component.getPropNames(), _length2 = _component$getPropNam2 == null ? 0 : _component$getPropNam2.length; _i2 < _length2; _i2++) {
        var key = _component$getPropNam2[_i2];

        // $FlowFixMe
        var prop = component.getProp(key);

        if (prop.alias && props.hasOwnProperty(prop.alias)) {

            var value = props[prop.alias];
            delete props[prop.alias];

            if (!props[key]) {
                props[key] = value;
            }
        }
    }

    // First make sure all of the props we were sent are actually valid prop names

    /*
     if (!component.looseProps) {
        for (let key of Object.keys(props)) {
            if (component.getPropNames().indexOf(key) === -1) {
                throw component.error(`Invalid prop: ${key}`);
            }
        }
    }
     */

    // Then loop over the props we expect, and make sure they're all present and valid

    for (var _i4 = 0, _Object$keys2 = Object.keys(props), _length4 = _Object$keys2 == null ? 0 : _Object$keys2.length; _i4 < _length4; _i4++) {
        var _key = _Object$keys2[_i4];

        // $FlowFixMe
        var _prop = component.getProp(_key);
        var _value = props[_key];

        if (_prop) {
            // $FlowFixMe
            validateProp(_prop, _key, _value, props, required);
        }
    }

    for (var _i6 = 0, _component$getPropNam4 = component.getPropNames(), _length6 = _component$getPropNam4 == null ? 0 : _component$getPropNam4.length; _i6 < _length6; _i6++) {
        var _key2 = _component$getPropNam4[_i6];

        // $FlowFixMe
        var _prop2 = component.getProp(_key2);
        var _value2 = props[_key2];

        if (_prop2 && !props.hasOwnProperty(_key2)) {
            validateProp(_prop2, _key2, _value2, props, required);
        }
    }
}