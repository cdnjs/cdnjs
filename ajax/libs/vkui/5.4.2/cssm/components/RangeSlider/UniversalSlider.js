import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { rescale } from '../../helpers/math';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { SizeType } from '../../lib/adaptivity';
import { Touch } from '../Touch/Touch';
import styles from '../Slider/Slider.module.css';
const sizeYClassNames = {
    none: styles['Slider--sizeY-none'],
    [SizeType.COMPACT]: styles['Slider--sizeY-compact']
};
export const UniversalSlider = ({ min =0 , max =100 , step , value =[
    0,
    0
] , defaultValue , onChange , getRootRef , disabled , className , ...restProps })=>{
    const [start, end] = value;
    const isRange = start != null;
    const gesture = React.useRef({
        dragging: false,
        startX: 0,
        containerWidth: 0
    }).current;
    const container = useExternRef(getRootRef);
    const thumbStart = React.useRef(null);
    const thumbEnd = React.useRef(null);
    const { sizeY ='none'  } = useAdaptivity();
    const offsetToValue = (absolute)=>{
        return rescale(absolute, [
            0,
            gesture.containerWidth
        ], [
            min,
            max
        ], {
            step
        });
    };
    const updateRange = (nextValue)=>{
        if (start == null) {
            return [
                null,
                nextValue
            ];
        }
        const { dragging  } = gesture;
        if (dragging === 'start') {
            if (nextValue > end) {
                // "перехватиться", если перетянули за конец
                gesture.dragging = 'end';
                return [
                    end,
                    nextValue
                ];
            }
            return [
                nextValue,
                end
            ];
        }
        if (dragging === 'end') {
            if (nextValue < start) {
                // "перехватиться", если перетянули за начало
                gesture.dragging = 'start';
                return [
                    nextValue,
                    start
                ];
            }
            return [
                start,
                nextValue
            ];
        }
        return value;
    };
    const snapDirection = (pos, target)=>{
        if (target === thumbStart.current) {
            return 'start';
        }
        if (target === thumbEnd.current) {
            return 'end';
        }
        return Math.abs((start ?? 0) - pos) <= Math.abs(end - pos) ? 'start' : 'end';
    };
    const onStart = (e)=>{
        const boundingRect = container.current?.getBoundingClientRect();
        gesture.containerWidth = boundingRect?.width ?? 0;
        const absolutePosition = e.startX - (boundingRect?.left ?? 0);
        const pos = offsetToValue(absolutePosition);
        gesture.dragging = snapDirection(pos, e.originalEvent.target);
        gesture.startX = absolutePosition;
        onChange?.(updateRange(pos), e);
        e.originalEvent.stopPropagation();
    };
    const onMove = (e)=>{
        onChange?.(updateRange(offsetToValue(gesture.startX + (e.shiftX || 0))), e);
        e.originalEvent.stopPropagation();
        e.originalEvent.preventDefault();
    };
    const onEnd = (e)=>{
        gesture.dragging = false;
        e.originalEvent.stopPropagation();
    };
    const toPercent = (v)=>(v - min) / (max - min) * 100;
    const draggerStyle = isRange ? {
        width: `${toPercent(end) - toPercent(start ?? 0)}%`,
        left: `${toPercent(start ?? 0)}%`
    } : {
        width: `${toPercent(end)}%`
    };
    return /*#__PURE__*/ React.createElement(Touch, {
        "data-value": isRange ? value.join(',') : value,
        ...restProps,
        ...disabled ? {} : {
            onStart,
            onMove,
            onEnd
        },
        className: classNames(styles['Slider'], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], disabled && styles['Slider--disabled'], className)
    }, /*#__PURE__*/ React.createElement("div", {
        ref: container,
        className: styles['Slider__in']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Slider__dragger'],
        style: draggerStyle
    }, isRange && /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['Slider__thumb'], styles['Slider__thumb--start']),
        ref: thumbStart
    }), /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['Slider__thumb'], styles['Slider__thumb--end']),
        ref: thumbEnd
    }))));
};

//# sourceMappingURL=UniversalSlider.js.map