'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { ModalContext } from "../../context/ModalContext.js";
import { inRange } from "../../helpers/range.js";
import { SNAP_POINT_DETENTS, SNAP_POINT_SAFE_RANGE } from "../../lib/sheet/index.js";
import { useModalManager } from "../ModalRoot/useModalManager.js";
import { ModalPageInternal } from "./ModalPageInternal.js";
const snapPointCache = new Map();
/**
 * @see https://vkui.io/components/modal-page
 */ export const ModalPage = ({ id: idProp, nav, open = false, modalOverlayTestId, noFocusToDialog, onOpen, onOpened, onClose, onClosed, size = 's', settlingHeight = 50, dynamicContentHeight, disableModalOverlay, keepMounted = false, ...restProps })=>{
    const { mounted, shouldPreserveSnapPoint, id, ...resolvedProps } = useModalManager({
        id: nav || idProp,
        open,
        keepMounted,
        modalOverlayTestId,
        disableModalOverlay,
        noFocusToDialog,
        onOpen,
        onOpened,
        onClose,
        onClosed
    });
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
        children: /*#__PURE__*/ _jsx(ModalPageInternal, {
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
            } : undefined,
            ...resolvedProps,
            ...restProps
        })
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