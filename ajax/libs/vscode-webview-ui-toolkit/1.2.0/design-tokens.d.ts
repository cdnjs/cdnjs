/**
 * Developer note:
 *
 * There are some tokens defined in this file that make use of `--fake-vscode-token`. This is
 * done when a toolkit token should be added to the tokenMappings map (and subsequently altered
 * in the applyTheme function) but does not have a corresponding VS Code token that can be used.
 *
 * An example is buttonIconHoverBackground token which does not have a corresponding VS Code token
 * at this time (it's a hardcoded value in VS Code), but needs to be adjusted to be transparent when a
 * high contrast theme is applied.
 *
 * As a rule of thumb, if there are special cases where a token needs to be adjusted based on the
 * VS Code theme and does not have a corresponding VS Code token, `--fake-vscode-token` can be used
 * to indicate that it should be added to the tokenMappings map and thus make it accessible to the
 * applyTheme function where it can be dynamically adjusted.
 */
/**
 * Global design tokens.
 */
export declare const background: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const borderWidth: import("@microsoft/fast-foundation").CSSDesignToken<number>;
export declare const contrastActiveBorder: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const contrastBorder: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const cornerRadius: import("@microsoft/fast-foundation").CSSDesignToken<number>;
export declare const designUnit: import("@microsoft/fast-foundation").CSSDesignToken<number>;
export declare const disabledOpacity: import("@microsoft/fast-foundation").CSSDesignToken<number>;
export declare const focusBorder: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const fontFamily: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const fontWeight: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const foreground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const inputHeight: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const inputMinWidth: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const typeRampBaseFontSize: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const typeRampBaseLineHeight: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const typeRampMinus1FontSize: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const typeRampMinus1LineHeight: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const typeRampMinus2FontSize: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const typeRampMinus2LineHeight: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const typeRampPlus1FontSize: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const typeRampPlus1LineHeight: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const scrollbarWidth: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const scrollbarHeight: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const scrollbarSliderBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const scrollbarSliderHoverBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const scrollbarSliderActiveBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Badge design tokens.
 */
export declare const badgeBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const badgeForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Button design tokens.
 */
export declare const buttonBorder: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonIconBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonIconCornerRadius: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonIconFocusBorderOffset: import("@microsoft/fast-foundation").CSSDesignToken<number>;
export declare const buttonIconHoverBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonIconPadding: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonPrimaryBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonPrimaryForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonPrimaryHoverBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonSecondaryBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonSecondaryForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonSecondaryHoverBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonPaddingHorizontal: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const buttonPaddingVertical: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Checkbox design tokens.
 */
export declare const checkboxBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const checkboxBorder: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const checkboxCornerRadius: import("@microsoft/fast-foundation").CSSDesignToken<number>;
export declare const checkboxForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Data Grid design tokens
 */
export declare const listActiveSelectionBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const listActiveSelectionForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const listHoverBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Divider design tokens.
 */
export declare const dividerBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Dropdown design tokens.
 */
export declare const dropdownBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const dropdownBorder: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const dropdownForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const dropdownListMaxHeight: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Text Field & Area design tokens.
 */
export declare const inputBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const inputForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const inputPlaceholderForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Link design tokens.
 */
export declare const linkActiveForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const linkForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Progress ring design tokens.
 */
export declare const progressBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Panels design tokens.
 */
export declare const panelTabActiveBorder: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const panelTabActiveForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const panelTabForeground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const panelViewBackground: import("@microsoft/fast-foundation").CSSDesignToken<string>;
export declare const panelViewBorder: import("@microsoft/fast-foundation").CSSDesignToken<string>;
/**
 * Tag design tokens.
 */
export declare const tagCornerRadius: import("@microsoft/fast-foundation").CSSDesignToken<string>;
