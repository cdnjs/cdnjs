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
const PlaceholderTitle = ({ className, ...restProps })=>/*#__PURE__*/ _jsx(Title, {
        level: "2",
        weight: "2",
        className: classNames(className, styles.title),
        ...restProps
    });
const PlaceholderDescription = ({ className, ...restProps })=>/*#__PURE__*/ _jsx(Headline, {
        weight: "3",
        className: classNames(className, styles.description),
        ...restProps
    });
const PlaceholderActions = (props)=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: styles.action,
        ...props
    });
/**
 * @see https://vkui.io/components/placeholder
 */ export const Placeholder = ({ icon, title, children, action, noPadding = false, ...restProps })=>/*#__PURE__*/ _jsxs(PlaceholderContainer, {
        noPadding: noPadding,
        ...restProps,
        children: [
            hasReactNode(icon) && /*#__PURE__*/ _jsx(PlaceholderIcon, {
                children: icon
            }),
            hasReactNode(title) && /*#__PURE__*/ _jsx(PlaceholderTitle, {
                children: title
            }),
            hasReactNode(children) && /*#__PURE__*/ _jsx(PlaceholderDescription, {
                children: children
            }),
            hasReactNode(action) && /*#__PURE__*/ _jsx(PlaceholderActions, {
                children: action
            })
        ]
    });
Placeholder.Container = PlaceholderContainer;
Placeholder.Icon = PlaceholderIcon;
Placeholder.Title = PlaceholderTitle;
Placeholder.Description = PlaceholderDescription;
Placeholder.Actions = PlaceholderActions;

//# sourceMappingURL=Placeholder.js.map