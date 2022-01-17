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
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_1 = require("react");
var ReactCardFlip = function (props) {
    var _a = props.cardStyles, back = _a.back, front = _a.front, cardZIndex = props.cardZIndex, containerStyle = props.containerStyle, containerClassName = props.containerClassName, flipDirection = props.flipDirection, flipSpeedFrontToBack = props.flipSpeedFrontToBack, flipSpeedBackToFront = props.flipSpeedBackToFront, infinite = props.infinite;
    var _b = react_1.useState(props.isFlipped), isFlipped = _b[0], setFlipped = _b[1];
    var _c = react_1.useState(0), rotation = _c[0], setRotation = _c[1];
    react_1.useEffect(function () {
        if (props.isFlipped !== isFlipped) {
            setFlipped(props.isFlipped);
            setRotation(function (c) { return c + 180; });
        }
    }, [props.isFlipped]);
    var getContainerClassName = react_1.useMemo(function () {
        var className = 'react-card-flip';
        if (containerClassName) {
            className += " " + containerClassName;
        }
        return className;
    }, [containerClassName]);
    var getComponent = function (key) {
        if (props.children.length !== 2) {
            throw new Error('Component ReactCardFlip requires 2 children to function');
        }
        return props.children[key];
    };
    var frontRotateY = "rotateY(" + (infinite ? rotation : isFlipped ? 180 : 0) + "deg)";
    var backRotateY = "rotateY(" + (infinite ? rotation + 180 : isFlipped ? 0 : -180) + "deg)";
    var frontRotateX = "rotateX(" + (infinite ? rotation : isFlipped ? 180 : 0) + "deg)";
    var backRotateX = "rotateX(" + (infinite ? rotation + 180 : isFlipped ? 0 : -180) + "deg)";
    var styles = {
        back: __assign({ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', height: '100%', left: '0', position: isFlipped ? 'relative' : 'absolute', top: '0', transform: flipDirection === 'horizontal' ? backRotateY : backRotateX, transformStyle: 'preserve-3d', transition: flipSpeedFrontToBack + "s", width: '100%' }, back),
        container: {
            perspective: '1000px',
            zIndex: "" + cardZIndex,
        },
        flipper: {
            height: '100%',
            position: 'relative',
            width: '100%',
        },
        front: __assign({ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', height: '100%', left: '0', position: isFlipped ? 'absolute' : 'relative', top: '0', transform: flipDirection === 'horizontal' ? frontRotateY : frontRotateX, transformStyle: 'preserve-3d', transition: flipSpeedBackToFront + "s", width: '100%', zIndex: '2' }, front),
    };
    return (React.createElement("div", { className: getContainerClassName, style: __assign(__assign({}, styles.container), containerStyle) },
        React.createElement("div", { className: "react-card-flipper", style: styles.flipper },
            React.createElement("div", { className: "react-card-front", style: styles.front }, getComponent(0)),
            React.createElement("div", { className: "react-card-back", style: styles.back }, getComponent(1)))));
};
ReactCardFlip.defaultProps = {
    cardStyles: {
        back: {},
        front: {},
    },
    cardZIndex: 'auto',
    containerStyle: {},
    flipDirection: 'horizontal',
    flipSpeedBackToFront: 0.6,
    flipSpeedFrontToBack: 0.6,
    infinite: false,
    isFlipped: false,
};
exports.default = ReactCardFlip;
