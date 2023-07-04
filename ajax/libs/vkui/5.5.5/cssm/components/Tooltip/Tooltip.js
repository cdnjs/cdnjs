import * as React from 'react';
import ReactDOM from 'react-dom';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useDOM } from '../../lib/dom';
import { arrowMiddleware, autoPlacementMiddleware, autoUpdateFloatingElement, checkIsNotAutoPlacement, convertFloatingDataToReactCSSProperties, flipMiddleware, getAutoPlacementAlign, offsetMiddleware, shiftMiddleware, useFloating } from '../../lib/floating';
import { warnOnce } from '../../lib/warnOnce';
import { useNavTransition } from '../NavTransitionContext/NavTransitionContext';
import { DefaultIcon } from '../PopperArrow/DefaultIcon';
import { PopperArrow } from '../PopperArrow/PopperArrow';
import { Subhead } from '../Typography/Subhead/Subhead';
import { tooltipContainerAttr } from './TooltipContainer';
import styles from './Tooltip.module.css';
const isDOMTypeElement = (element)=>{
    return /*#__PURE__*/ React.isValidElement(element) && typeof element.type === 'string';
};
const warn = warnOnce('Tooltip');
const stylesAppearance = {
    accent: styles['Tooltip--appearance-accent'],
    white: styles['Tooltip--appearance-white'],
    black: styles['Tooltip--appearance-black'],
    inversion: styles['Tooltip--appearance-inversion']
};
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
 */ export const Tooltip = ({ children , isShown: isShownProp = true , offsetX =0 , offsetY =15 , alignX , alignY , onClose , cornerOffset =0 , cornerAbsoluteOffset , appearance ='accent' , arrow =true , arrowPadding =14 , ArrowIcon =DefaultIcon , placement: placementProp , text , header , className , ...restProps })=>{
    const [arrowRef, setArrowRef] = React.useState(null);
    const [target, setTarget] = React.useState(null);
    /* eslint-disable no-restricted-properties */ const tooltipContainer = React.useMemo(()=>target?.closest(`[${tooltipContainerAttr}]`), [
        target
    ]);
    const { entering  } = useNavTransition();
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
                fn ({ placement , middlewareData  }) {
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
    const { x: floatingDataX , y: floatingDataY , placement: resolvedPlacement , refs , middlewareData: { arrow: arrowCoords  }  } = useFloating({
        strategy: floatingPositionStrategy,
        placement: isNotAutoPlacement ? placement : undefined,
        middleware: memoizedMiddlewares,
        whileElementsMounted: autoUpdateFloatingElement
    });
    const { document  } = useDOM();
    useGlobalEventListener(document, 'click', isShown && onClose, {
        capture: true,
        passive: true
    });
    const childRef = isDOMTypeElement(children) ? children.ref : /*#__PURE__*/ React.isValidElement(children) ? children.props.getRootRef : null;
    const patchedRef = useExternRef(setTarget, refs.setReference, childRef);
    const child = /*#__PURE__*/ React.isValidElement(children) ? /*#__PURE__*/ React.cloneElement(children, {
        [isDOMTypeElement(children) ? 'ref' : 'getRootRef']: patchedRef
    }) : children;
    return /*#__PURE__*/ React.createElement(React.Fragment, null, child, isShown && target != null && /*#__PURE__*/ ReactDOM.createPortal(/*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['Tooltip'], appearance !== 'neutral' && stylesAppearance[appearance], className)
    }, /*#__PURE__*/ React.createElement("div", {
        ref: refs.setFloating,
        style: convertFloatingDataToReactCSSProperties(floatingPositionStrategy, floatingDataX, floatingDataY)
    }, arrow && /*#__PURE__*/ React.createElement(PopperArrow, {
        coords: arrowCoords,
        placement: resolvedPlacement,
        arrowClassName: styles['Tooltip__arrow'],
        getRootRef: setArrowRef,
        Icon: ArrowIcon
    }), /*#__PURE__*/ React.createElement("div", {
        className: styles['Tooltip__content']
    }, header && /*#__PURE__*/ React.createElement(Subhead, {
        weight: "2"
    }, header), text && /*#__PURE__*/ React.createElement(Subhead, null, text)))), tooltipContainer));
};

//# sourceMappingURL=Tooltip.js.map