'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { useId, useMemo } from "react";
import { ModalContext } from "../../context/ModalContext.js";
import { inRange } from "../../helpers/range.js";
import { getNavId } from "../../lib/getNavId.js";
import { SNAP_POINT_DETENTS, SNAP_POINT_SAFE_RANGE } from "../../lib/sheet/index.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { useModalManager } from "../ModalRoot/useModalManager.js";
import { ModalPageInternal } from "./ModalPageInternal.js";
const warn = warnOnce('ModalPage');
const snapPointCache = new Map();
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */ export const ModalPage = (_param)=>{
    var { id: idProp, nav, open = false, modalOverlayTestId, noFocusToDialog, onOpen, onOpened, onClose, onClosed, size = 's', settlingHeight = 50, dynamicContentHeight, keepMounted = false } = _param, restProps = _object_without_properties(_param, [
        "id",
        "nav",
        "open",
        "modalOverlayTestId",
        "noFocusToDialog",
        "onOpen",
        "onOpened",
        "onClose",
        "onClosed",
        "size",
        "settlingHeight",
        "dynamicContentHeight",
        "keepMounted"
    ]);
    const generatingId = useId();
    const id = getNavId({
        nav,
        id: idProp
    }, warn) || generatingId;
    const _useModalManager = useModalManager({
        id,
        open,
        keepMounted,
        modalOverlayTestId,
        noFocusToDialog,
        onOpen,
        onOpened,
        onClose,
        onClosed
    }), { mounted, shouldPreserveSnapPoint } = _useModalManager, resolvedProps = _object_without_properties(_useModalManager, [
        "mounted",
        "shouldPreserveSnapPoint"
    ]);
    const snapPoint = useMemo(()=>{
        if (dynamicContentHeight) {
            return 'auto';
        }
        if (shouldPreserveSnapPoint) {
            const snapPointCached = snapPointCache.get(id);
            if (snapPointCached) {
                return snapPointCached;
            }
            const nextSnapPoint = transformSettlingHeightToSnapPoint(settlingHeight);
            snapPointCache.set(id, nextSnapPoint);
            return nextSnapPoint;
        } else {
            snapPointCache.delete(id);
        }
        return transformSettlingHeightToSnapPoint(settlingHeight);
    }, [
        id,
        shouldPreserveSnapPoint,
        dynamicContentHeight,
        settlingHeight
    ]);
    if (!mounted) {
        return null;
    }
    return /*#__PURE__*/ _jsx(ModalContext.Provider, {
        value: id,
        children: /*#__PURE__*/ _jsx(ModalPageInternal, _object_spread({
            id: id,
            size: size,
            "aria-labelledby": `${id}-label`,
            snapPoint: snapPoint,
            onSnapPointChange: snapPoint !== 'auto' && shouldPreserveSnapPoint ? (snapPoint)=>{
                const snapPointCached = snapPointCache.get(id);
                if (snapPointCached) {
                    snapPointCached.initial = snapPoint;
                    snapPointCache.set(id, snapPointCached);
                }
            } : undefined
        }, resolvedProps, restProps))
    });
};
function transformSettlingHeightToSnapPoint(settlingHeight) {
    const currentSnapPoint = Math.min(Math.max(settlingHeight, SNAP_POINT_SAFE_RANGE.LOWER), SNAP_POINT_DETENTS.LARGE);
    return {
        initial: currentSnapPoint,
        detents: inRange(currentSnapPoint, SNAP_POINT_SAFE_RANGE.LOWER, SNAP_POINT_SAFE_RANGE.HIGHEST) ? [
            SNAP_POINT_DETENTS.MIN,
            currentSnapPoint,
            SNAP_POINT_DETENTS.LARGE
        ] : [
            SNAP_POINT_DETENTS.MIN,
            currentSnapPoint
        ]
    };
}

//# sourceMappingURL=ModalPage.js.map