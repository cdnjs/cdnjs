'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { setRef } from "../../../lib/utils.js";
import { ModalRootOverlayContext } from "../ModalRootContext.js";
/**
 * `ModalRoot` выставляет общий `ModalOverlay` для всех потомков, и чтобы не нарушить логику
 * в `ModalPage` и `ModalCard`, в них прокидывается данный компонент, который визуально не виден,
 * но при этом на нём сохраняется возможность взаимодействия.
 *
 * В `getRooRef` отдаёт ссылку на DOM общего `ModalOverlay`.
 *
 * @private
 */ export const VisuallyHiddenModalOverlay = (_param)=>{
    var { visible: visibleExcluded, position: positionExcluded, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "visible",
        "position",
        "getRootRef"
    ]);
    const ref = useContext(ModalRootOverlayContext);
    return /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({}, restProps), {
        "aria-hidden": "true",
        className: "vkuiVisuallyHiddenModalOverlay__host",
        ref: function handleCurrentRefForForwardContextRef() {
            setRef(ref.current, getRootRef);
        }
    }));
};

//# sourceMappingURL=VisuallyHiddenModalOverlay.js.map