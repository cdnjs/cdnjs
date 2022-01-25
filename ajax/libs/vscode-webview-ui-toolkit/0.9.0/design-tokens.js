// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { create } from './utilities/design-tokens/create';
/**
 * Global design tokens.
 */
export const borderWidth = create('border-width').withDefault(1);
export const contrastActiveBorder = create('contrast-active-border', '--vscode-contrastActiveBorder').withDefault('#f38518');
export const contrastBorder = create('contrast-border', '--vscode-contrastBorder').withDefault('#6fc3df');
export const cornerRadius = create('corner-radius').withDefault(0);
export const designUnit = create('design-unit').withDefault(4);
export const disabledOpacity = create('disabled-opacity').withDefault(0.4);
export const focusBorder = create('focus-border', '--vscode-focusBorder').withDefault('#007fd4');
export const fontFamily = create('font-family', '--vscode-font-family').withDefault('-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol');
export const fontWeight = create('font-weight', '--vscode-font-weight').withDefault('400');
export const foreground = create('foreground', '--vscode-foreground').withDefault('#cccccc');
export const inputHeight = create('input-height').withDefault('26');
export const inputMinWidth = create('input-min-width').withDefault('100px');
export const typeRampBaseFontSize = create('type-ramp-base-font-size', '--vscode-font-size').withDefault('13px');
export const typeRampBaseLineHeight = create('type-ramp-base-line-height').withDefault('normal');
export const typeRampMinus1FontSize = create('type-ramp-minus1-font-size').withDefault('11px');
export const typeRampMinus1LineHeight = create('type-ramp-minus1-line-height').withDefault('16px');
export const typeRampMinus2FontSize = create('type-ramp-minus2-font-size').withDefault('9px');
export const typeRampMinus2LineHeight = create('type-ramp-minus2-line-height').withDefault('16px');
export const typeRampPlus1FontSize = create('type-ramp-plus1-font-size').withDefault('16px');
export const typeRampPlus1LineHeight = create('type-ramp-plus1-line-height').withDefault('24px');
/**
 * Badge design tokens.
 */
export const badgeBackground = create('badge-background', '--vscode-badge-background').withDefault('#4d4d4d');
export const badgeForeground = create('badge-foreground', '--vscode-badge-foreground').withDefault('#ffffff');
/**
 * Button design tokens.
 */
// Note: Button border is used only for high contrast themes and should be left as transparent otherwise.
export const buttonBorder = create('button-border', '--vscode-button-border').withDefault('transparent');
export const buttonIconBackground = create('button-icon-background').withDefault('transparent');
export const buttonIconCornerRadius = create('button-icon-corner-radius').withDefault('5px');
export const buttonIconFocusBorderOffset = create('button-icon-outline-offset').withDefault(0);
export const buttonIconHoverBackground = create('button-icon-hover-background').withDefault('rgba(90, 93, 94, 0.31)');
export const buttonIconPadding = create('button-icon-padding').withDefault('3px');
export const buttonPrimaryBackground = create('button-primary-background', '--vscode-button-background').withDefault('#0e639c');
export const buttonPrimaryForeground = create('button-primary-foreground', '--vscode-button-foreground').withDefault('#ffffff');
export const buttonPrimaryHoverBackground = create('button-primary-hover-background', '--vscode-button-hoverBackground').withDefault('#1177bb');
export const buttonSecondaryBackground = create('button-secondary-background', '--vscode-button-secondaryBackground').withDefault('#3a3d41');
export const buttonSecondaryForeground = create('button-secondary-foreground', '--vscode-button-secondaryForeground').withDefault('#ffffff');
export const buttonSecondaryHoverBackground = create('button-secondary-hover-background', '--vscode-button-secondaryHoverBackground').withDefault('#45494e');
export const buttonPaddingHorizontal = create('button-padding-horizontal').withDefault('11px');
export const buttonPaddingVertical = create('button-padding-vertical').withDefault('6px');
/**
 * Checkbox design tokens.
 */
export const checkboxBackground = create('checkbox-background', '--vscode-checkbox-background').withDefault('#3c3c3c');
export const checkboxBorder = create('checkbox-border', '--vscode-checkbox-border').withDefault('#3c3c3c');
export const checkboxCornerRadius = create('checkbox-corner-radius').withDefault(3);
export const checkboxForeground = create('checkbox-foreground', '--vscode-checkbox-foreground').withDefault('#f0f0f0');
/**
 * Data Grid design tokens
 */
export const listActiveSelectionBackground = create('list-active-selection-background', '--vscode-list-activeSelectionBackground').withDefault('#094771');
export const listActiveSelectionForeground = create('list-active-selection-foreground', '--vscode-list-activeSelectionForeground').withDefault('#ffffff');
export const listHoverBackground = create('list-hover-background', '--vscode-list-hoverBackground').withDefault('#2a2d2e');
export const quickInputBackground = create('quick-input-background', '--vscode-quickInput-background').withDefault('#252526');
/**
 * Divider design tokens.
 */
export const dividerBackground = create('divider-background', '--vscode-settings-dropdownListBorder').withDefault('#454545');
/**
 * Dropdown design tokens.
 */
export const dropdownBackground = create('dropdown-background', '--vscode-dropdown-background').withDefault('#3c3c3c');
export const dropdownBorder = create('dropdown-border', '--vscode-dropdown-border').withDefault('#3c3c3c');
export const dropdownForeground = create('dropdown-foreground', '--vscode-dropdown-foreground').withDefault('#f0f0f0');
export const dropdownListMaxHeight = create('dropdown-list-max-height').withDefault('200px');
/**
 * Text Field & Area design tokens.
 */
export const inputBackground = create('input-background', '--vscode-input-background').withDefault('#3c3c3c');
export const inputForeground = create('input-foreground', '--vscode-input-foreground').withDefault('#cccccc');
export const inputPlaceholderForeground = create('input-placeholder-foreground', '--vscode-input-placeholderForeground').withDefault('#cccccc');
/**
 * Link design tokens.
 */
export const linkActiveForeground = create('link-active-foreground', '--vscode-textLink-activeForeground').withDefault('#3794ff');
export const linkForeground = create('link-foreground', '--vscode-textLink-foreground').withDefault('#3794ff');
/**
 * Progress ring design tokens.
 */
export const progressBackground = create('progress-background', '--vscode-progressBar-background').withDefault('#0e70c0');
/**
 * Panels design tokens.
 */
export const panelTabActiveBorder = create('panel-tab-active-border', '--vscode-panelTitle-activeBorder').withDefault('#e7e7e7');
export const panelTabActiveForeground = create('panel-tab-active-foreground', '--vscode-panelTitle-activeForeground').withDefault('#e7e7e7');
export const panelTabForeground = create('panel-tab-foreground', '--vscode-panelTitle-inactiveForeground').withDefault('#e7e7e799');
export const panelViewBackground = create('panel-view-background', '--vscode-panel-background').withDefault('#1e1e1e');
export const panelViewBorder = create('panel-view-border', '--vscode-panel-border').withDefault('#80808059');
/**
 * Tag design tokens.
 */
export const tagCornerRadius = create('tag-corner-radius').withDefault('2px');
