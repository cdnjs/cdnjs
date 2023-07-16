import React from 'react';
import PropTypes from 'prop-types';
export default function Divider(_a) {
    var children = _a.children;
    return React.createElement("span", { className: "react-date-picker__inputGroup__divider" }, children);
}
Divider.propTypes = {
    children: PropTypes.node,
};
