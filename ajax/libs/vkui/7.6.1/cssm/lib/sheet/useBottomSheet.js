'use client';
import { useMemo, useState } from "react";
import { noop } from "@vkontakte/vkjs";
import { useStableCallback } from "../../hooks/useStableCallback.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
import { BottomSheetController } from "./controllers/BottomSheetController.js";
import { CSSTransitionController } from "./controllers/CSSTransitionController.js";
/**
 * # Checklist
 *
 * ## Возможности
 *
 * - [x] есть возможность открывать до определенного размера (см. `snapPoint`)
 * - [x] есть возможность закрыть при сильном смахивании вниз
 * - [x] есть возможность отключить взаимодействие на определённых элементах используя data-атрибут
 * - [x] есть возможность отключить взаимодействие на определённых элементах используя stopPropagation()
 *
 * ## Анимации
 *
 * - [x] оверлей становится светлее в зависимости от процента сворачивания
 *    - [x] при `snapPoint !== 'auto'` процент высчитывается относительно переданного `snapPoint.initial`
 * - [x] при перетаскивании за пределы есть анимация натяжения
 *   > note: в `ModalPage` этого эффекта нет при высоте 100% из-за `max-block-size: 100%`
 *
 * ## Пограничные кейсы
 *
 * - [x] ⚠️ не блокирует взаимодействие с _горизонтальным_ скроллом
 * - [x] ⚠️ не блокирует взаимодействие с _вертикальным_ скроллом
 * - [x] ⚠️ не блокирует взаимодействие с полями ввода
 * - [x] ⚠️ не блокирует взаимодействие с элементами вне корневого элемента
 *
 * @private
 */ export const useBottomSheet = (enabled, { blocked, snapPoint, sheetCSSProperty, backdropCSSProperty, onSnapPointChange: onSnapPointChangeProp, onDismiss: onDismissProp })=>{
    const [sheetScrollEl, setSheetScrollEl] = useState(null);
    const [sheetEl, setSheetEl] = useState(null);
    const [backdropEl, setBackdropEl] = useState(null);
    const initialStyle = useMemo(()=>enabled && snapPoint !== 'auto' ? {
            [sheetCSSProperty]: `${snapPoint.initial}%`
        } : undefined, [
        enabled,
        snapPoint,
        sheetCSSProperty
    ]);
    const onSnapPointChange = useStableCallback(onSnapPointChangeProp || noop);
    const onDismiss = useStableCallback(onDismissProp || noop);
    const bsController = useMemo(()=>{
        if (!enabled || sheetEl === null) {
            return null;
        }
        return new BottomSheetController(sheetEl, {
            sheetScrollEl: sheetScrollEl || null,
            sheetTransitionController: new CSSTransitionController(sheetEl, sheetCSSProperty),
            backdropTransitionController: backdropEl ? new CSSTransitionController(backdropEl, backdropCSSProperty) : null,
            onSnapPointChange,
            onDismiss
        });
    }, [
        enabled,
        sheetEl,
        sheetCSSProperty,
        sheetScrollEl,
        backdropEl,
        backdropCSSProperty,
        onSnapPointChange,
        onDismiss
    ]);
    const onPanStart = function onPanStart(event) {
        if (!blocked) {
            bsController.panStart(event.nativeEvent);
        }
    };
    const onPanMove = function onPanMove(event) {
        bsController.panMove(event.nativeEvent);
    };
    const onPanEnd = function onPanEnd() {
        bsController.panEnd();
    };
    useIsomorphicLayoutEffect(function init() {
        if (bsController) {
            bsController.init(snapPoint);
        }
    }, [
        snapPoint,
        bsController
    ]);
    useIsomorphicLayoutEffect(()=>function unmount() {
            if (bsController) {
                bsController.destroy();
            }
        }, [
        bsController
    ]);
    return [
        {
            initialStyle,
            setSheetEl,
            setSheetScrollEl,
            setBackdropEl
        },
        bsController !== null ? {
            onTouchStart: onPanStart,
            onTouchMove: onPanMove,
            onTouchEnd: onPanEnd,
            onTouchCancel: onPanEnd,
            onMouseDown: onPanStart,
            onMouseMove: onPanMove,
            onMouseUp: onPanEnd,
            onMouseLeave: onPanEnd
        } : undefined
    ];
};

//# sourceMappingURL=useBottomSheet.js.map