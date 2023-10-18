import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { SizeType } from "../../../lib/adaptivity";
export function usePaginationPageClassNames(param) {
    var isCurrent = param.isCurrent, disabled = param.disabled;
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return classNames("vkuiPaginationPage", sizeY === "none" && "vkuiPaginationPage--sizeY-none", sizeY === SizeType.COMPACT && "vkuiPaginationPage--sizeY-compact", isCurrent && "vkuiPaginationPage--current", disabled && "vkuiPaginationPage--disabled");
}

//# sourceMappingURL=usePaginationPageClasses.js.map