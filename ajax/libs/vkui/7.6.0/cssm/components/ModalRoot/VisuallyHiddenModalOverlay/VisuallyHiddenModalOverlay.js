'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { setRef } from "../../../lib/utils.js";
import { ModalRootOverlayContext } from "../ModalRootContext.js";
import styles from "./VisuallyHiddenModalOverlay.module.css";
/**
 * `ModalRoot` выставляет общий `ModalOverlay` для всех потомков, и чтобы не нарушить логику
 * в `ModalPage` и `ModalCard`, в них прокидывается данный компонент, который визуально не виден,
 * но при этом на нём сохраняется возможность взаимодействия.
 *
 * В `getRooRef` отдаёт ссылку на DOM общего `ModalOverlay`.
 *
 * @private
 */ export const VisuallyHiddenModalOverlay = ({ visible: visibleExcluded, position: positionExcluded, getRootRef, ...restProps })=>{
    const ref = useContext(ModalRootOverlayContext);
    return /*#__PURE__*/ _jsx("div", {
        ...restProps,
        "aria-hidden": "true",
        className: styles.host,
        ref: function handleCurrentRefForForwardContextRef() {
            setRef(ref.current, getRootRef);
        }
    });
};

//# sourceMappingURL=VisuallyHiddenModalOverlay.js.map