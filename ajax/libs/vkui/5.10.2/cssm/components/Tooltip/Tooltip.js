import * as React from 'react';
import ReactDOM from 'react-dom';
import { hasReactNode } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { arrowMiddleware, autoPlacementMiddleware, autoUpdateFloatingElement, checkIsNotAutoPlacement, convertFloatingDataToReactCSSProperties, flipMiddleware, getAutoPlacementAlign, offsetMiddleware, shiftMiddleware, useFloating } from '../../lib/floating';
import { warnOnce } from '../../lib/warnOnce';
import { useNavTransition } from '../NavTransitionContext/NavTransitionContext';
import { TOOLTIP_MAX_WIDTH, TooltipBase } from '../TooltipBase/TooltipBase';
import { tooltipContainerAttr } from './TooltipContainer';
import styles from './Tooltip.module.css';
const isDOMTypeElement = (element)=>{
    return /*#__PURE__*/ React.isValidElement(element) && typeof element.type === 'string';
};
const warn = warnOnce('Tooltip');
function mapAlignX(x) {
    switch(x){
        case 'left':
            return 'start';
        case 'right':
            return 'end';
        default:
            return '';
    }
}
function getDefaultPlacement(alignX, alignY) {
    return [
        alignY || 'bottom',
        mapAlignX(alignX || 'left')
    ].filter((p)=>!!p).join('-');
}
function isVerticalPlacement(placement) {
    return placement.startsWith('top') || placement.startsWith('bottom');
}
/**
 * @see https://vkcom.github.io/VKUI/#/Tooltip
 */ export const Tooltip = ({ children, isShown: isShownProp = true, offsetX = 0, offsetY = 15, alignX, alignY, onClose, cornerOffset = 0, cornerAbsoluteOffset, arrow = true, arrowPadding = 14, getRootRef, placement: placementProp, maxWidth = TOOLTIP_MAX_WIDTH, ...restProps })=>{
    const [arrowRef, setArrowRef] = React.useState(null);
    const [target, setTarget] = React.useState(null);
    /* eslint-disable no-restricted-properties */ const tooltipContainer = React.useMemo(()=>target?.closest(`[${tooltipContainerAttr}]`), [
        target
    ]);
    const { entering } = useNavTransition();
    const isShown = isShownProp && tooltipContainer && !entering;
    const placement = placementProp || getDefaultPlacement(alignX, alignY);
    const isNotAutoPlacement = checkIsNotAutoPlacement(placement);
    if (process.env.NODE_ENV === 'development') {
        const multiChildren = React.Children.count(children) > 1;
        // Empty children is a noop
        const primitiveChild = hasReactNode(children) && typeof children !== 'object';
        (multiChildren || primitiveChild) && warn([
            'children должен быть одним React элементом, получено',
            multiChildren && 'несколько',
            primitiveChild && JSON.stringify(children)
        ].filter(Boolean).join(' '), 'error');
    }
    const floatingPositionStrategy = React.useMemo(()=>target?.style.position === 'fixed' ? 'fixed' : 'absolute', [
        target
    ]);
    if (process.env.NODE_ENV === 'development' && target && !tooltipContainer) {
        throw new Error('Use TooltipContainer for Tooltip outside Panel (see docs)');
    }
    const memoizedMiddlewares = React.useMemo(()=>{
        const middlewares = [
            offsetMiddleware({
                crossAxis: offsetX,
                mainAxis: offsetY
            })
        ];
        // см. https://floating-ui.com/docs/flip#conflict-with-autoplacement
        if (isNotAutoPlacement) {
            middlewares.push(flipMiddleware());
        } else {
            middlewares.push(autoPlacementMiddleware({
                alignment: placement ? getAutoPlacementAlign(placement) : null
            }));
        }
        middlewares.push(shiftMiddleware());
        // см. https://floating-ui.com/docs/arrow#order
        if (arrow) {
            middlewares.push(arrowMiddleware({
                element: arrowRef,
                padding: arrowPadding
            }));
            middlewares.push({
                name: 'arrowOffset',
                fn ({ placement, middlewareData }) {
                    if (!middlewareData.arrow) {
                        return Promise.resolve({});
                    }
                    if (isVerticalPlacement(placement)) {
                        if (cornerAbsoluteOffset !== undefined) {
                            middlewareData.arrow.x = cornerAbsoluteOffset;
                        } else if (middlewareData.arrow.x !== undefined) {
                            middlewareData.arrow.x += cornerOffset;
                        }
                    } else {
                        if (cornerAbsoluteOffset !== undefined) {
                            middlewareData.arrow.y = cornerAbsoluteOffset;
                        } else if (middlewareData.arrow.y !== undefined) {
                            middlewareData.arrow.y += cornerOffset;
                        }
                    }
                    return Promise.resolve({});
                }
            });
        }
        return middlewares;
    }, [
        arrow,
        arrowRef,
        arrowPadding,
        cornerAbsoluteOffset,
        cornerOffset,
        offsetX,
        offsetY,
        placement,
        isNotAutoPlacement
    ]);
    const { x: floatingDataX, y: floatingDataY, placement: resolvedPlacement, refs, middlewareData: { arrow: arrowCoords } } = useFloating({
        strategy: floatingPositionStrategy,
        placement: isNotAutoPlacement ? placement : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted: autoUpdateFloatingElement
    });
    const childRef = isDOMTypeElement(children) ? children.ref : /*#__PURE__*/ React.isValidElement(children) ? children.props.getRootRef : null;
    const patchedRef = useExternRef(setTarget, refs.setReference, childRef);
    const child = /*#__PURE__*/ React.isValidElement(children) ? /*#__PURE__*/ React.cloneElement(children, {
        [isDOMTypeElement(children) ? 'ref' : 'getRootRef']: patchedRef
    }) : children;
    const tooltipBaseRef = useExternRef(refs.setFloating, getRootRef);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, isShown && target != null && /*#__PURE__*/ ReactDOM.createPortal(/*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(TooltipBase, {
        ...restProps,
        getRootRef: tooltipBaseRef,
        floatingStyle: convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY),
        withArrow: arrow,
        arrowCoords: arrowCoords,
        arrowPlacement: resolvedPlacement,
        getArrowRef: setArrowRef,
        maxWidth: maxWidth
    }), /*#__PURE__*/ React.createElement("div", {
        className: styles['Tooltip__overlay'],
        onClickCapture: onClose
    })), tooltipContainer));
};

//# sourceMappingURL=Tooltip.js.map