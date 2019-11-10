"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function proposeGeometry(term) {
    if (!term.element.parentElement) {
        return null;
    }
    var parentElementStyle = window.getComputedStyle(term.element.parentElement);
    var parentElementHeight = parseInt(parentElementStyle.getPropertyValue('height'));
    var parentElementWidth = Math.max(0, parseInt(parentElementStyle.getPropertyValue('width')) - 17);
    var elementStyle = window.getComputedStyle(term.element);
    var elementPaddingVer = parseInt(elementStyle.getPropertyValue('padding-top')) + parseInt(elementStyle.getPropertyValue('padding-bottom'));
    var elementPaddingHor = parseInt(elementStyle.getPropertyValue('padding-right')) + parseInt(elementStyle.getPropertyValue('padding-left'));
    var availableHeight = parentElementHeight - elementPaddingVer;
    var availableWidth = parentElementWidth - elementPaddingHor;
    var geometry = {
        cols: Math.floor(availableWidth / term.renderer.dimensions.actualCellWidth),
        rows: Math.floor(availableHeight / term.renderer.dimensions.actualCellHeight)
    };
    return geometry;
}
exports.proposeGeometry = proposeGeometry;
;
function fit(term) {
    var geometry = proposeGeometry(term);
    if (geometry) {
        if (term.rows !== geometry.rows || term.cols !== geometry.cols) {
            term.renderer.clear();
            term.resize(geometry.cols, geometry.rows);
        }
    }
}
exports.fit = fit;
;
function apply(terminalConstructor) {
    terminalConstructor.prototype.proposeGeometry = function () {
        return proposeGeometry(this);
    };
    terminalConstructor.prototype.fit = function () {
        return fit(this);
    };
}
exports.apply = apply;

//# sourceMappingURL=fit.js.map
