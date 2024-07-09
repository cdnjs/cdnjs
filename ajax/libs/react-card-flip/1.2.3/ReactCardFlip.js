"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactCardFlip = function (props) {
    var _a = __assign({ cardStyles: {
            back: {},
            front: {},
        }, cardZIndex: 'auto', containerStyle: {}, flipDirection: 'horizontal', flipSpeedBackToFront: 0.6, flipSpeedFrontToBack: 0.6, infinite: false, isFlipped: false }, props), _b = _a.cardStyles, back = _b.back, front = _b.front, cardZIndex = _a.cardZIndex, containerStyle = _a.containerStyle, containerClassName = _a.containerClassName, flipDirection = _a.flipDirection, flipSpeedFrontToBack = _a.flipSpeedFrontToBack, flipSpeedBackToFront = _a.flipSpeedBackToFront, infinite = _a.infinite, isFlipped = _a.isFlipped;
    var _c = (0, react_1.useState)(isFlipped), isFlippedState = _c[0], setFlipped = _c[1];
    var _d = (0, react_1.useState)(0), rotation = _d[0], setRotation = _d[1];
    (0, react_1.useEffect)(function () {
        if (isFlipped !== isFlippedState) {
            setFlipped(isFlipped);
            setRotation(function (c) { return c + 180; });
        }
    }, [isFlipped]);
    var getContainerClassName = (0, react_1.useMemo)(function () {
        var className = 'react-card-flip';
        if (containerClassName) {
            className += " ".concat(containerClassName);
        }
        return className;
    }, [containerClassName]);
    var getComponent = function (key) {
        if (props.children.length !== 2) {
            throw new Error('Component ReactCardFlip requires 2 children to function');
        }
        return props.children[key];
    };
    var frontRotateY = "rotateY(".concat(infinite ? rotation : isFlipped ? 180 : 0, "deg)");
    var backRotateY = "rotateY(".concat(infinite ? rotation + 180 : isFlipped ? 0 : -180, "deg)");
    var frontRotateX = "rotateX(".concat(infinite ? rotation : isFlipped ? 180 : 0, "deg)");
    var backRotateX = "rotateX(".concat(infinite ? rotation + 180 : isFlipped ? 0 : -180, "deg)");
    var styles = {
        back: __assign({ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', height: '100%', left: '0', position: isFlipped ? 'relative' : 'absolute', top: '0', transform: flipDirection === 'horizontal' ? backRotateY : backRotateX, transformStyle: 'preserve-3d', transition: "".concat(flipSpeedFrontToBack, "s"), width: '100%', zIndex: isFlipped ? '2' : '1' }, back),
        container: {
            zIndex: "".concat(cardZIndex),
        },
        flipper: {
            height: '100%',
            perspective: '1000px',
            position: 'relative',
            width: '100%',
        },
        front: __assign({ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', height: '100%', left: '0', position: isFlipped ? 'absolute' : 'relative', top: '0', transform: flipDirection === 'horizontal' ? frontRotateY : frontRotateX, transformStyle: 'preserve-3d', transition: "".concat(flipSpeedBackToFront, "s"), width: '100%', zIndex: '2' }, front),
    };
    return (React.createElement("div", { className: getContainerClassName, style: __assign(__assign({}, styles.container), containerStyle) },
        React.createElement("div", { className: "react-card-flipper", style: styles.flipper },
            React.createElement("div", { className: "react-card-front", style: styles.front }, getComponent(0)),
            React.createElement("div", { className: "react-card-back", style: styles.back }, getComponent(1)))));
};
exports.default = ReactCardFlip;
