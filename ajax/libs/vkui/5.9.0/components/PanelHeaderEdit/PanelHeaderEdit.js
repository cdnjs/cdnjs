import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon28DoneOutline, Icon28EditOutline } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
/**
 * @see https://vkcom.github.io/VKUI/#/PanelHeaderButton
 */ export var PanelHeaderEdit = function(_param) {
    var _param_isActive = _param.isActive, isActive = _param_isActive === void 0 ? false : _param_isActive, _param_editLabel = _param.editLabel, editLabel = _param_editLabel === void 0 ? "Редактировать" : _param_editLabel, _param_doneLabel = _param.doneLabel, doneLabel = _param_doneLabel === void 0 ? "Готово" : _param_doneLabel, restProps = _object_without_properties(_param, [
        "isActive",
        "editLabel",
        "doneLabel"
    ]);
    var iOSText = isActive ? doneLabel : editLabel;
    var AndroidIcon = isActive ? Icon28DoneOutline : Icon28EditOutline;
    var platform = usePlatform();
    return /*#__PURE__*/ React.createElement(PanelHeaderButton, _object_spread({
        "aria-label": iOSText
    }, restProps), platform === Platform.IOS ? iOSText : /*#__PURE__*/ React.createElement(AndroidIcon, null));
};

//# sourceMappingURL=PanelHeaderEdit.js.map