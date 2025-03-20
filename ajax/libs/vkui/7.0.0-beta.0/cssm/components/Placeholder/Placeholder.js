import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Headline } from "../Typography/Headline/Headline.js";
import { Title } from "../Typography/Title/Title.js";
import styles from "./Placeholder.module.css";
const PlaceholderContainer = ({ stretched, noPadding = false, ...restProps })=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames(styles.host, stretched && styles.stretched, !noPadding && styles.withPadding),
        ...restProps
    });
const PlaceholderIcon = (props)=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: styles.icon,
        ...props
    });
const PlaceholderHeader = ({ className, ...restProps })=>/*#__PURE__*/ _jsx(Title, {
        level: "2",
        weight: "2",
        className: classNames(className, styles.header),
        ...restProps
    });
const PlaceholderText = ({ className, ...restProps })=>/*#__PURE__*/ _jsx(Headline, {
        weight: "3",
        className: classNames(className, styles.text),
        ...restProps
    });
const PlaceholderActions = (props)=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: styles.action,
        ...props
    });
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */ export const Placeholder = ({ icon, header, children, action, noPadding = false, ...restProps })=>/*#__PURE__*/ _jsxs(PlaceholderContainer, {
        noPadding: noPadding,
        ...restProps,
        children: [
            hasReactNode(icon) && /*#__PURE__*/ _jsx(PlaceholderIcon, {
                children: icon
            }),
            hasReactNode(header) && /*#__PURE__*/ _jsx(PlaceholderHeader, {
                children: header
            }),
            hasReactNode(children) && /*#__PURE__*/ _jsx(PlaceholderText, {
                children: children
            }),
            hasReactNode(action) && /*#__PURE__*/ _jsx(PlaceholderActions, {
                children: action
            })
        ]
    });
Placeholder.Container = PlaceholderContainer;
Placeholder.Icon = PlaceholderIcon;
Placeholder.Header = PlaceholderHeader;
Placeholder.Text = PlaceholderText;
Placeholder.Actions = PlaceholderActions;

//# sourceMappingURL=Placeholder.js.map