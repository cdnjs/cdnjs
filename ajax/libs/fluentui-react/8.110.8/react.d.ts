import { addDays } from '@fluentui/date-time-utilities';
import { addDirectionalKeyCode } from '@fluentui/utilities';
import { addElementAtIndex } from '@fluentui/utilities';
import { addMonths } from '@fluentui/date-time-utilities';
import { addWeeks } from '@fluentui/date-time-utilities';
import { addYears } from '@fluentui/date-time-utilities';
import { allowOverscrollOnElement } from '@fluentui/utilities';
import { allowScrollOnElement } from '@fluentui/utilities';
import { anchorProperties } from '@fluentui/utilities';
import { AnimationClassNames } from '@fluentui/style-utilities';
import { AnimationStyles } from '@fluentui/style-utilities';
import { AnimationVariables } from '@fluentui/style-utilities';
import { appendFunction } from '@fluentui/utilities';
import { arraysEqual } from '@fluentui/utilities';
import { asAsync } from '@fluentui/utilities';
import { assertNever } from '@fluentui/utilities';
import { assign } from '@fluentui/utilities';
import { Async } from '@fluentui/utilities';
import { audioProperties } from '@fluentui/utilities';
import { AutoScroll } from '@fluentui/utilities';
import { BaseComponent } from '@fluentui/utilities';
import { baseElementEvents } from '@fluentui/utilities';
import { baseElementProperties } from '@fluentui/utilities';
import { buildClassMap } from '@fluentui/style-utilities';
import { buttonProperties } from '@fluentui/utilities';
import { calculatePrecision } from '@fluentui/utilities';
import { canUseDOM } from '@fluentui/utilities';
import { classNamesFunction } from '@fluentui/utilities';
import { colGroupProperties } from '@fluentui/utilities';
import { ColorClassNames } from '@fluentui/style-utilities';
import { colProperties } from '@fluentui/utilities';
import { CommunicationColors } from '@fluentui/theme';
import { compareDatePart } from '@fluentui/date-time-utilities';
import { compareDates } from '@fluentui/date-time-utilities';
import { ComponentsStyles } from '@fluentui/theme';
import { ComponentStyles } from '@fluentui/theme';
import { composeComponentAs } from '@fluentui/utilities';
import { composeRenderFunction } from '@fluentui/utilities';
import { concatStyleSets } from '@fluentui/style-utilities';
import { concatStyleSetsWithProps } from '@fluentui/style-utilities';
import { createArray } from '@fluentui/utilities';
import { createFontStyles } from '@fluentui/style-utilities';
import { createMemoizer } from '@fluentui/utilities';
import { createMergedRef } from '@fluentui/utilities';
import { createTheme } from '@fluentui/theme';
import { css } from '@fluentui/utilities';
import { customizable } from '@fluentui/utilities';
import { Customizations } from '@fluentui/utilities';
import { Customizer } from '@fluentui/utilities';
import { CustomizerContext } from '@fluentui/utilities';
import { DATA_IS_SCROLLABLE_ATTRIBUTE } from '@fluentui/utilities';
import { DATA_PORTAL_ATTRIBUTE } from '@fluentui/utilities';
import { DateRangeType } from '@fluentui/date-time-utilities';
import { DayOfWeek } from '@fluentui/date-time-utilities';
import { DAYS_IN_WEEK } from '@fluentui/date-time-utilities';
import { DefaultEffects } from '@fluentui/style-utilities';
import { DefaultFontStyles } from '@fluentui/style-utilities';
import { DefaultPalette } from '@fluentui/style-utilities';
import { DefaultSpacing } from '@fluentui/theme';
import { DelayedRender } from '@fluentui/utilities';
import { Depths } from '@fluentui/theme';
import { disableBodyScroll } from '@fluentui/utilities';
import { divProperties } from '@fluentui/utilities';
import { doesElementContainFocus } from '@fluentui/utilities';
import { EdgeChromiumHighContrastSelector } from '@fluentui/style-utilities';
import { elementContains } from '@fluentui/utilities';
import { elementContainsAttribute } from '@fluentui/utilities';
import { enableBodyScroll } from '@fluentui/utilities';
import { EventGroup } from '@fluentui/utilities';
import { extendComponent } from '@fluentui/utilities';
import { FabricPerformance } from '@fluentui/utilities';
import { filteredAssign } from '@fluentui/utilities';
import { find } from '@fluentui/utilities';
import { findElementRecursive } from '@fluentui/utilities';
import { findIndex } from '@fluentui/utilities';
import { findScrollableParent } from '@fluentui/utilities';
import { FirstWeekOfYear } from '@fluentui/date-time-utilities';
import { fitContentToBounds } from '@fluentui/utilities';
import { FitMode } from '@fluentui/utilities';
import { flatten } from '@fluentui/utilities';
import { FluentTheme } from '@fluentui/theme';
import { focusAsync } from '@fluentui/utilities';
import { focusClear } from '@fluentui/style-utilities';
import { focusFirstChild } from '@fluentui/utilities';
import { FocusRects } from '@fluentui/utilities';
import { FocusRectsContext } from '@fluentui/utilities';
import { FocusRectsProvider } from '@fluentui/utilities';
import { FocusZone } from '@fluentui/react-focus';
import { FocusZoneDirection } from '@fluentui/react-focus';
import { FocusZoneTabbableElements } from '@fluentui/react-focus';
import { FontClassNames } from '@fluentui/style-utilities';
import { fontFace } from '@fluentui/style-utilities';
import { FontSizes } from '@fluentui/style-utilities';
import { FontWeights } from '@fluentui/style-utilities';
import { format } from '@fluentui/utilities';
import { formProperties } from '@fluentui/utilities';
import { getChildren } from '@fluentui/utilities';
import { getDatePartHashValue } from '@fluentui/date-time-utilities';
import { getDateRangeArray } from '@fluentui/date-time-utilities';
import { getDistanceBetweenPoints } from '@fluentui/utilities';
import { getDocument } from '@fluentui/utilities';
import { getEdgeChromiumNoHighContrastAdjustSelector } from '@fluentui/style-utilities';
import { getElementIndexPath } from '@fluentui/utilities';
import { getEndDateOfWeek } from '@fluentui/date-time-utilities';
import { getFadedOverflowStyle } from '@fluentui/style-utilities';
import { getFirstFocusable } from '@fluentui/utilities';
import { getFirstTabbable } from '@fluentui/utilities';
import { getFirstVisibleElementFromSelector } from '@fluentui/utilities';
import { getFocusableByIndexPath } from '@fluentui/utilities';
import { getFocusOutlineStyle } from '@fluentui/style-utilities';
import { getFocusStyle } from '@fluentui/style-utilities';
import { getGlobalClassNames } from '@fluentui/style-utilities';
import { getHighContrastNoAdjustStyle } from '@fluentui/style-utilities';
import { getIcon } from '@fluentui/style-utilities';
import { getIconClassName } from '@fluentui/style-utilities';
import { getId } from '@fluentui/utilities';
import { getInitials } from '@fluentui/utilities';
import { getInputFocusStyle } from '@fluentui/style-utilities';
import { getLanguage } from '@fluentui/utilities';
import { getLastFocusable } from '@fluentui/utilities';
import { getLastTabbable } from '@fluentui/utilities';
import { getMonthEnd } from '@fluentui/date-time-utilities';
import { getMonthStart } from '@fluentui/date-time-utilities';
import { getNativeElementProps } from '@fluentui/utilities';
import { getNativeProps } from '@fluentui/utilities';
import { getNextElement } from '@fluentui/utilities';
import { getParent } from '@fluentui/utilities';
import { getPlaceholderStyles } from '@fluentui/style-utilities';
import { getPreviousElement } from '@fluentui/utilities';
import { getPropsWithDefaults } from '@fluentui/utilities';
import { getRect } from '@fluentui/utilities';
import { getResourceUrl } from '@fluentui/utilities';
import { getRTL } from '@fluentui/utilities';
import { getRTLSafeKeyCode } from '@fluentui/utilities';
import { getScreenSelector } from '@fluentui/style-utilities';
import { getScrollbarWidth } from '@fluentui/utilities';
import { getStartDateOfWeek } from '@fluentui/date-time-utilities';
import { getTheme } from '@fluentui/style-utilities';
import { getThemedContext } from '@fluentui/style-utilities';
import { getVirtualParent } from '@fluentui/utilities';
import { getWeekNumber } from '@fluentui/date-time-utilities';
import { getWeekNumbersInMonth } from '@fluentui/date-time-utilities';
import { getWindow } from '@fluentui/utilities';
import { getYearEnd } from '@fluentui/date-time-utilities';
import { getYearStart } from '@fluentui/date-time-utilities';
import { GlobalClassNames } from '@fluentui/style-utilities';
import { GlobalSettings } from '@fluentui/utilities';
import { hasHorizontalOverflow } from '@fluentui/utilities';
import { hasOverflow } from '@fluentui/utilities';
import { hasVerticalOverflow } from '@fluentui/utilities';
import { hiddenContentStyle } from '@fluentui/style-utilities';
import { HighContrastSelector } from '@fluentui/style-utilities';
import { HighContrastSelectorBlack } from '@fluentui/style-utilities';
import { HighContrastSelectorWhite } from '@fluentui/style-utilities';
import { hoistMethods } from '@fluentui/utilities';
import { hoistStatics } from '@fluentui/utilities';
import { htmlElementProperties } from '@fluentui/utilities';
import { IAnimationStyles } from '@fluentui/style-utilities';
import { IAnimationVariables } from '@fluentui/style-utilities';
import { IAsAsyncOptions } from '@fluentui/utilities';
import { IBaseProps } from '@fluentui/utilities';
import { ICalendarStrings } from '@fluentui/date-time-utilities';
import { ICancelable } from '@fluentui/utilities';
import { IChangeDescription } from '@fluentui/utilities';
import { IChangeEventCallback } from '@fluentui/utilities';
import { IClassNames } from '@fluentui/utilities';
import { IClassNamesFunctionOptions } from '@fluentui/utilities';
import type { IComponent } from '@fluentui/foundation-legacy';
import { IComponentAs } from '@fluentui/utilities';
import { IComponentAsProps } from '@fluentui/utilities';
import type { IComponentStyles } from '@fluentui/foundation-legacy';
import { IconFontSizes } from '@fluentui/style-utilities';
import { IconNames } from '@fluentui/font-icons-mdl2';
import { ICSPSettings } from '@fluentui/style-utilities';
import { ICssInput } from '@fluentui/utilities';
import type { ICSSPixelUnitRule } from '@fluentui/merge-styles';
import type { ICSSRule } from '@fluentui/merge-styles';
import { ICustomizableProps } from '@fluentui/utilities';
import { ICustomizations } from '@fluentui/utilities';
import { ICustomizerContext } from '@fluentui/utilities';
import { ICustomizerProps } from '@fluentui/utilities';
import { IDateFormatting } from '@fluentui/date-time-utilities';
import type { IDayGridOptions } from '@fluentui/date-time-utilities';
import { IDeclaredEventsByName } from '@fluentui/utilities';
import { IDelayedRenderProps } from '@fluentui/utilities';
import { IDelayedRenderState } from '@fluentui/utilities';
import { IDictionary } from '@fluentui/utilities';
import { IDisposable } from '@fluentui/utilities';
import { IEffects } from '@fluentui/style-utilities';
import { IEventRecord } from '@fluentui/utilities';
import { IEventRecordList } from '@fluentui/utilities';
import { IEventRecordsByName } from '@fluentui/utilities';
import { IFitContentToBoundsOptions } from '@fluentui/utilities';
import { IFocusRectsContext } from '@fluentui/utilities';
import { IFocusZone } from '@fluentui/react-focus';
import { IFocusZoneProps } from '@fluentui/react-focus';
import { IFontFace } from '@fluentui/style-utilities';
import { IFontStyles } from '@fluentui/style-utilities';
import { IFontWeight } from '@fluentui/style-utilities';
import { iframeProperties } from '@fluentui/utilities';
import { IGetFocusStylesOptions } from '@fluentui/style-utilities';
import type { IHTMLSlot } from '@fluentui/foundation-legacy';
import { IIconOptions } from '@fluentui/style-utilities';
import { IIconRecord } from '@fluentui/style-utilities';
import { IIconSubset } from '@fluentui/style-utilities';
import { IIconSubsetRecord } from '@fluentui/style-utilities';
import { imageProperties } from '@fluentui/utilities';
import { imgProperties } from '@fluentui/utilities';
import { initializeComponentRef } from '@fluentui/utilities';
import { initializeFocusRects } from '@fluentui/utilities';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { InjectionMode } from '@fluentui/style-utilities';
import { inputProperties } from '@fluentui/utilities';
import { IObjectWithKey } from '@fluentui/utilities';
import { IPalette } from '@fluentui/style-utilities';
import { IPartialTheme } from '@fluentui/style-utilities';
import { IPerfData } from '@fluentui/utilities';
import { IPerfMeasurement } from '@fluentui/utilities';
import { IPerfSummary } from '@fluentui/utilities';
import { IPoint } from '@fluentui/utilities';
import { IProcessedStyleSet } from '@fluentui/style-utilities';
import { IPropsWithStyles } from '@fluentui/utilities';
import { IRawStyle } from '@fluentui/style-utilities';
import { IReactProps } from '@fluentui/utilities';
import { IRectangle } from '@fluentui/utilities';
import { IRefObject } from '@fluentui/utilities';
import { IRenderComponent } from '@fluentui/utilities';
import { IRenderFunction } from '@fluentui/utilities';
import { IScheme } from '@fluentui/style-utilities';
import { ISchemeNames } from '@fluentui/style-utilities';
import { isControlled } from '@fluentui/utilities';
import { isDirectionalKeyCode } from '@fluentui/utilities';
import { ISelection } from '@fluentui/utilities';
import { ISelectionOptions } from '@fluentui/utilities';
import { ISelectionOptionsWithRequiredGetKey } from '@fluentui/utilities';
import { isElementFocusSubZone } from '@fluentui/utilities';
import { isElementFocusZone } from '@fluentui/utilities';
import { isElementTabbable } from '@fluentui/utilities';
import { isElementVisible } from '@fluentui/utilities';
import { isElementVisibleAndNotHidden } from '@fluentui/utilities';
import { ISemanticColors } from '@fluentui/style-utilities';
import { ISemanticTextColors } from '@fluentui/style-utilities';
import { ISerializableObject } from '@fluentui/utilities';
import { ISettings } from '@fluentui/utilities';
import { ISettingsFunction } from '@fluentui/utilities';
import { ISettingsMap } from '@fluentui/utilities';
import { IsFocusVisibleClassName } from '@fluentui/utilities';
import { isIE11 } from '@fluentui/utilities';
import { isInDateRangeArray } from '@fluentui/date-time-utilities';
import { isIOS } from '@fluentui/utilities';
import { ISize } from '@fluentui/utilities';
import type { ISlotProp } from '@fluentui/foundation-legacy';
import type { ISlottableProps } from '@fluentui/foundation-legacy';
import { isMac } from '@fluentui/utilities';
import { ISpacing } from '@fluentui/style-utilities';
import { IStyle } from '@fluentui/style-utilities';
import type { IStyleableComponentProps } from '@fluentui/foundation-legacy';
import { IStyleFunction } from '@fluentui/utilities';
import { IStyleFunctionOrObject } from '@fluentui/utilities';
import { IStyleSet } from '@fluentui/style-utilities';
import { IStyleSheetConfig } from '@fluentui/style-utilities';
import { isVirtualElement } from '@fluentui/utilities';
import { ITheme } from '@fluentui/style-utilities';
import { IVirtualElement } from '@fluentui/utilities';
import { IWarnControlledUsageParams } from '@fluentui/utilities';
import { KeyCodes } from '@fluentui/utilities';
import { keyframes } from '@fluentui/style-utilities';
import { labelProperties } from '@fluentui/utilities';
import { liProperties } from '@fluentui/utilities';
import { loadTheme } from '@fluentui/style-utilities';
import { LocalizedFontFamilies } from '@fluentui/theme';
import { LocalizedFontNames } from '@fluentui/theme';
import { mapEnumByName } from '@fluentui/utilities';
import { memoize } from '@fluentui/utilities';
import { memoizeFunction } from '@fluentui/utilities';
import { merge } from '@fluentui/utilities';
import { mergeAriaAttributeValues } from '@fluentui/utilities';
import { mergeCustomizations } from '@fluentui/utilities';
import { mergeScopedSettings } from '@fluentui/utilities';
import { mergeSettings } from '@fluentui/utilities';
import { mergeStyles } from '@fluentui/style-utilities';
import { mergeStyleSets } from '@fluentui/style-utilities';
import { mergeThemes } from '@fluentui/theme';
import { modalize } from '@fluentui/utilities';
import { MonthOfYear } from '@fluentui/date-time-utilities';
import { MotionAnimations } from '@fluentui/theme';
import { MotionDurations } from '@fluentui/theme';
import { MotionTimings } from '@fluentui/theme';
import { NeutralColors } from '@fluentui/theme';
import { normalize } from '@fluentui/style-utilities';
import { noWrap } from '@fluentui/style-utilities';
import { nullRender } from '@fluentui/utilities';
import { olProperties } from '@fluentui/utilities';
import { omit } from '@fluentui/utilities';
import { Omit as Omit_2 } from '@fluentui/utilities';
import { on } from '@fluentui/utilities';
import { optionProperties } from '@fluentui/utilities';
import { PartialTheme } from '@fluentui/theme';
import { Point } from '@fluentui/utilities';
import { portalContainsElement } from '@fluentui/utilities';
import { precisionRound } from '@fluentui/utilities';
import { PulsingBeaconAnimationStyles } from '@fluentui/style-utilities';
import { raiseClick } from '@fluentui/utilities';
import * as React_2 from 'react';
import type { ReactNode } from 'react';
import { Rectangle } from '@fluentui/utilities';
import { RefObject } from '@fluentui/utilities';
import { registerDefaultFontFaces } from '@fluentui/theme';
import { registerIconAlias } from '@fluentui/style-utilities';
import { registerIcons } from '@fluentui/style-utilities';
import { registerOnThemeChangeCallback } from '@fluentui/style-utilities';
import { removeDirectionalKeyCode } from '@fluentui/utilities';
import { removeIndex } from '@fluentui/utilities';
import { removeOnThemeChangeCallback } from '@fluentui/style-utilities';
import { replaceElement } from '@fluentui/utilities';
import { resetControlledWarnings } from '@fluentui/utilities';
import { resetIds } from '@fluentui/utilities';
import { resetMemoizations } from '@fluentui/utilities';
import { safeRequestAnimationFrame } from '@fluentui/utilities';
import { safeSetTimeout } from '@fluentui/utilities';
import { ScreenWidthMaxLarge } from '@fluentui/style-utilities';
import { ScreenWidthMaxMedium } from '@fluentui/style-utilities';
import { ScreenWidthMaxSmall } from '@fluentui/style-utilities';
import { ScreenWidthMaxXLarge } from '@fluentui/style-utilities';
import { ScreenWidthMaxXXLarge } from '@fluentui/style-utilities';
import { ScreenWidthMinLarge } from '@fluentui/style-utilities';
import { ScreenWidthMinMedium } from '@fluentui/style-utilities';
import { ScreenWidthMinSmall } from '@fluentui/style-utilities';
import { ScreenWidthMinUhfMobile } from '@fluentui/style-utilities';
import { ScreenWidthMinXLarge } from '@fluentui/style-utilities';
import { ScreenWidthMinXXLarge } from '@fluentui/style-utilities';
import { ScreenWidthMinXXXLarge } from '@fluentui/style-utilities';
import { Selection as Selection_2 } from '@fluentui/utilities';
import { SELECTION_CHANGE } from '@fluentui/utilities';
import { SelectionDirection } from '@fluentui/utilities';
import { SelectionMode as SelectionMode_2 } from '@fluentui/utilities';
import { selectProperties } from '@fluentui/utilities';
import { setBaseUrl } from '@fluentui/utilities';
import { setFocusVisibility } from '@fluentui/utilities';
import { setIconOptions } from '@fluentui/style-utilities';
import { setLanguage } from '@fluentui/utilities';
import { setMemoizeWeakMap } from '@fluentui/utilities';
import { setMonth } from '@fluentui/date-time-utilities';
import { setPortalAttribute } from '@fluentui/utilities';
import { setRTL } from '@fluentui/utilities';
import { setSSR } from '@fluentui/utilities';
import { Settings } from '@fluentui/utilities';
import { SettingsFunction } from '@fluentui/utilities';
import { setVirtualParent } from '@fluentui/utilities';
import { setWarningCallback } from '@fluentui/utilities';
import { shallowCompare } from '@fluentui/utilities';
import { SharedColors } from '@fluentui/theme';
import { shouldWrapFocus } from '@fluentui/utilities';
import { styled } from '@fluentui/utilities';
import { StyleFunction } from '@fluentui/utilities';
import { Stylesheet } from '@fluentui/style-utilities';
import { tableProperties } from '@fluentui/utilities';
import { Target } from '@fluentui/react-hooks';
import { tdProperties } from '@fluentui/utilities';
import { textAreaProperties } from '@fluentui/utilities';
import { Theme } from '@fluentui/theme';
import { ThemeSettingName } from '@fluentui/style-utilities';
import { thProperties } from '@fluentui/utilities';
import { TimeConstants } from '@fluentui/date-time-utilities';
import { toMatrix } from '@fluentui/utilities';
import { trProperties } from '@fluentui/utilities';
import { unhoistMethods } from '@fluentui/utilities';
import { unregisterIcons } from '@fluentui/style-utilities';
import { useCustomizationSettings } from '@fluentui/utilities';
import { useDocument } from '@fluentui/react-window-provider';
import { useFocusRects } from '@fluentui/utilities';
import { useWindow } from '@fluentui/react-window-provider';
import { values } from '@fluentui/utilities';
import { videoProperties } from '@fluentui/utilities';
import { warn } from '@fluentui/utilities';
import { warnConditionallyRequiredProps } from '@fluentui/utilities';
import { warnControlledUsage } from '@fluentui/utilities';
import { warnDeprecations } from '@fluentui/utilities';
import { warnMutuallyExclusive } from '@fluentui/utilities';
import { WindowContext } from '@fluentui/react-window-provider';
import { WindowProvider } from '@fluentui/react-window-provider';
import { WindowProviderProps } from '@fluentui/react-window-provider';
import { ZIndexes } from '@fluentui/style-utilities';

/**
 * {@docCategory Button}
 */
export declare class ActionButton extends React_2.Component<IButtonProps, {}> {
    render(): JSX.Element;
}

/**
 * {@docCategory ActivityItem}
 */
export declare class ActivityItem extends React_2.Component<IActivityItemProps, {}> {
    constructor(props: IActivityItemProps);
    render(): JSX.Element;
    private _onRenderIcon;
    private _onRenderActivityDescription;
    private _onRenderComments;
    private _onRenderTimeStamp;
    private _onRenderPersonaArray;
    private _getClassNames;
}

export { addDays }

export { addDirectionalKeyCode }

export { addElementAtIndex }

export { addMonths }

export { addWeeks }

export { addYears }

/**
 * Defines a type made by the union of the different values that the align-items and justify-content flexbox
 * properties can take.
 * {@docCategory Stack}
 */
export declare type Alignment = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'baseline' | 'stretch';

export { allowOverscrollOnElement }

export { allowScrollOnElement }

export { anchorProperties }

export { AnimationClassNames }

/**
 * {@docCategory Calendar}
 */
export declare enum AnimationDirection {
    /**
     * Grid will transition out and in horizontally
     */
    Horizontal = 0,
    /**
     * Grid will transition out and in vertically
     */
    Vertical = 1
}

export { AnimationStyles }

export { AnimationVariables }

export declare const Announced: React_2.FunctionComponent<IAnnouncedProps>;

/**
 * {@docCategory Announced}
 */
export declare class AnnouncedBase extends React_2.Component<IAnnouncedProps> {
    static defaultProps: Partial<IAnnouncedProps>;
    render(): JSX.Element;
}

export { appendFunction }

export { arraysEqual }

export { asAsync }

export { assertNever }

export { assign }

export { Async }

export { audioProperties }

/**
 * {@docCategory Autofill}
 */
export declare class Autofill extends React_2.Component<IAutofillProps, IAutofillState> implements IAutofill {
    static defaultProps: {
        enableAutofillOnKeyPress: number[];
    };
    private _inputElement;
    private _autoFillEnabled;
    private _async;
    static getDerivedStateFromProps(props: IAutofillProps, state: IAutofillState): IAutofillState | null;
    constructor(props: IAutofillProps);
    get cursorLocation(): number | null;
    get isValueSelected(): boolean;
    get value(): string;
    get selectionStart(): number | null;
    get selectionEnd(): number | null;
    get inputElement(): HTMLInputElement | null;
    componentDidUpdate(_: any, _1: any, cursor: ICursorLocation | null): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    focus(): void;
    clear(): void;
    getSnapshotBeforeUpdate(): ICursorLocation | null;
    private _onCompositionStart;
    private _onCompositionUpdate;
    private _onCompositionEnd;
    private _onClick;
    private _onKeyDown;
    private _onInputChanged;
    private _onChanged;
    private _getCurrentInputValue;
    /**
     * Attempts to enable autofill. Whether or not autofill is enabled depends on the input value,
     * whether or not any text is selected, and only if the new input value is longer than the old input value.
     * Autofill should never be set to true if the value is composing. Once compositionEnd is called, then
     * it should be completed.
     * See https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent for more information on composition.
     * @param newValue - new input value
     * @param oldValue - old input value
     * @param isComposing - if true then the text is actively being composed and it has not completed.
     * @param isComposed - if the text is a composed text value.
     */
    private _tryEnableAutofill;
    /**
     * Updates the current input value as well as getting a new display value.
     * @param newValue - The new value from the input
     */
    private _updateValue;
    private _getDisplayValue;
    private _getControlledValue;
}

export { AutoScroll }

/**
 * {@docCategory Button}
 */
export declare class BaseButton extends React_2.Component<IBaseButtonProps, IBaseButtonState> implements IButton {
    private get _isSplitButton();
    static defaultProps: Partial<IBaseButtonProps>;
    static contextType: React_2.Context<IFocusRectsContext | undefined>;
    context: IFocusRectsContext;
    private _async;
    private _events;
    private _buttonElement;
    private _splitButtonContainer;
    private _mergedRef;
    private _labelId;
    private _descriptionId;
    private _ariaDescriptionId;
    private _classNames;
    private _processingTouch;
    private _lastTouchTimeoutId;
    private _renderedVisibleMenu;
    private _menuShouldFocusOnContainer;
    private _menuShouldFocusOnMount;
    private _getMemoizedMenuButtonKeytipProps;
    constructor(props: IBaseButtonProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IBaseButtonProps, prevState: IBaseButtonState): void;
    componentWillUnmount(): void;
    focus(): void;
    dismissMenu(): void;
    openMenu(shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean): void;
    private _onRenderContent;
    /**
     * Method to help determine if the menu's component tree should
     * be rendered. It takes into account whether the menu is expanded,
     * whether it is a persisted menu and whether it has been shown to the user.
     */
    private _shouldRenderMenu;
    private _onRenderIcon;
    private _onRenderTextContents;
    private _onRenderText;
    private _hasText;
    private _onRenderChildren;
    private _onRenderDescription;
    private _onRenderAriaDescription;
    private _onRenderMenuIcon;
    private _getMenuProps;
    private _onRenderMenu;
    private _onDismissMenu;
    private _dismissMenu;
    private _openMenu;
    private _onToggleMenu;
    private _onRenderSplitButtonContent;
    private _onSplitContainerFocusCapture;
    private _onSplitButtonPrimaryClick;
    private _onRenderSplitButtonDivider;
    private _onRenderSplitButtonMenuButton;
    private _onKeyDown;
    private _onKeyUp;
    private _onKeyPress;
    private _onMouseUp;
    private _onMouseDown;
    private _onClick;
    private _onSplitButtonContainerKeyDown;
    private _onMenuKeyDown;
    private _onTouchStart;
    private _onPointerDown;
    private _handleTouchAndPointerEvent;
    /**
     * Returns if the user hits a valid keyboard key to open the menu
     * @param ev - the keyboard event
     * @returns True if user clicks on custom trigger key if enabled or alt + down arrow if not. False otherwise.
     */
    private _isValidMenuOpenKey;
    private _onMenuClick;
}

export { BaseComponent }

export { baseElementEvents }

export { baseElementProperties }

/**
 * {@docCategory ExtendedPeoplePicker}
 */
export declare class BaseExtendedPeoplePicker extends BaseExtendedPicker<IPersonaProps, IExtendedPeoplePickerProps> {
}

export declare class BaseExtendedPicker<T, P extends IBaseExtendedPickerProps<T>> extends React_2.Component<P, IBaseExtendedPickerState<T>> implements IBaseExtendedPicker<T> {
    floatingPicker: React_2.RefObject<BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>>;
    selectedItemsList: React_2.RefObject<BaseSelectedItemsList<T, IBaseSelectedItemsListProps<T>>>;
    protected root: React_2.RefObject<HTMLDivElement>;
    protected input: React_2.RefObject<Autofill>;
    protected selection: Selection_2;
    constructor(basePickerProps: P);
    get items(): any;
    componentDidMount(): void;
    focus(): void;
    clearInput(): void;
    get inputElement(): HTMLInputElement | null;
    get highlightedItems(): T[];
    render(): JSX.Element;
    protected get floatingPickerProps(): IBaseFloatingPickerProps<T>;
    protected get selectedItemsListProps(): IBaseSelectedItemsListProps<T>;
    protected onSelectionChange: () => void;
    protected canAddItems(): boolean;
    protected renderFloatingPicker(): JSX.Element;
    protected renderSelectedItemsList(): JSX.Element;
    protected onInputChange: (value: string, composing?: boolean) => void;
    protected onInputFocus: (ev: React_2.FocusEvent<HTMLInputElement | Autofill>) => void;
    protected onInputClick: (ev: React_2.MouseEvent<HTMLInputElement | Autofill>) => void;
    protected onBackspace: (ev: React_2.KeyboardEvent<HTMLElement>) => void;
    protected onCopy: (ev: React_2.ClipboardEvent<HTMLElement>) => void;
    protected onPaste: (ev: React_2.ClipboardEvent<Autofill | HTMLInputElement>) => void;
    protected _onSuggestionSelected: (item: T) => void;
    protected _onSelectedItemsChanged: () => void;
    /**
     * The floating picker is the source of truth for if the menu has been opened or not.
     *
     * Because this isn't tracked inside the state of this component, we need to
     * force an update here to keep the rendered output that depends on the picker being open
     * in sync with the state
     *
     * Called when the suggestions is shown or closed
     */
    private _onSuggestionsShownOrHidden;
    private _addProcessedItem;
}

/**
 * {@docCategory FloatingPeoplePicker}
 */
export declare class BaseFloatingPeoplePicker extends BaseFloatingPicker<IPersonaProps, IPeopleFloatingPickerProps> {
}

export declare class BaseFloatingPicker<T, P extends IBaseFloatingPickerProps<T>> extends React_2.Component<P, IBaseFloatingPickerState> implements IBaseFloatingPicker {
    protected selection: Selection;
    protected root: React_2.RefObject<HTMLDivElement>;
    protected suggestionStore: SuggestionsStore<T>;
    protected suggestionsControl: React_2.RefObject<SuggestionsControl<T>>;
    protected SuggestionsControlOfProperType: new (props: ISuggestionsControlProps<T>) => SuggestionsControl<T>;
    protected currentPromise: PromiseLike<T[]>;
    protected isComponentMounted: boolean;
    private _async;
    constructor(basePickerProps: P);
    get inputText(): string;
    get suggestions(): any[];
    forceResolveSuggestion(): void;
    get currentSelectedSuggestionIndex(): number;
    get isSuggestionsShown(): boolean;
    onQueryStringChanged: (queryString: string) => void;
    hidePicker: () => void;
    showPicker: (updateValue?: boolean) => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    completeSuggestion: () => void;
    updateSuggestions(suggestions: T[], forceUpdate?: boolean): void;
    render(): JSX.Element;
    protected renderSuggestions(): JSX.Element | null;
    protected onSelectionChange(): void;
    protected updateValue(updatedValue: string): void;
    protected updateSuggestionWithZeroState(): void;
    protected updateSuggestionsList(suggestions: T[] | PromiseLike<T[]>): void;
    protected onChange(item: T): void;
    protected onSuggestionClick: (ev: React_2.MouseEvent<HTMLElement>, item: T, index: number) => void;
    protected onSuggestionRemove: (ev: React_2.MouseEvent<HTMLElement>, item: T, index: number) => void;
    protected onKeyDown: (ev: MouseEvent) => void;
    private _updateActiveDescendant;
    private _onResolveSuggestions;
    private _onValidateInput;
    private _updateSuggestionsVisible;
    private _bindToInputElement;
    private _unbindFromInputElement;
}

/**
 * {@docCategory PeoplePicker}
 */
export declare class BasePeoplePicker extends BasePicker<IPersonaProps, IPeoplePickerProps> {
}

/**
 * {@docCategory SelectedPeopleList}
 */
export declare class BasePeopleSelectedItemsList extends BaseSelectedItemsList<IExtendedPersonaProps, ISelectedPeopleProps> {
}

/**
 * {@docCategory Pickers}
 */
export declare class BasePicker<T, P extends IBasePickerProps<T>> extends React_2.Component<P, IBasePickerState<T>> implements IBasePicker<T> {
    protected root: React_2.RefObject<HTMLDivElement>;
    protected input: React_2.RefObject<IAutofill>;
    protected suggestionElement: React_2.RefObject<ISuggestions<T>>;
    protected selection: Selection_2;
    protected suggestionStore: SuggestionsController<T>;
    /**
     * @deprecated this is no longer necessary as typescript now supports generic elements
     */
    protected SuggestionOfProperType: new (props: ISuggestionsProps<T>) => Suggestions<T>;
    protected currentPromise: PromiseLike<any> | undefined;
    protected _ariaMap: IPickerAriaIds;
    private _styledSuggestions;
    private _id;
    private _async;
    static getDerivedStateFromProps(newProps: IBasePickerProps<any>): {
        items: any[];
    } | null;
    constructor(basePickerProps: P);
    get items(): T[];
    componentDidMount(): void;
    componentDidUpdate(oldProps: P, oldState: IBasePickerState<T>): void;
    componentWillUnmount(): void;
    focus(): void;
    focusInput(): void;
    dismissSuggestions: (ev?: any) => void;
    completeSuggestion(forceComplete?: boolean): void;
    refocusSuggestions: (keyCode: KeyCodes) => void;
    render(): JSX.Element;
    protected canAddItems(): boolean;
    protected renderSuggestions(): JSX.Element | null;
    protected renderItems(): JSX.Element[];
    protected resetFocus(index?: number): void;
    protected onSuggestionSelect(): void;
    protected onSelectionChange(): void;
    protected updateSuggestions(suggestions: any[]): void;
    /**
     * Only to be called when there is nothing in the input. Checks to see if the consumer has
     * provided a function to resolve suggestions
     */
    protected onEmptyInputFocus(): void;
    protected updateValue(updatedValue: string): void;
    protected updateSuggestionsList(suggestions: T[] | PromiseLike<T[]>, updatedValue?: string): void;
    protected resolveNewValue(updatedValue: string, suggestions: T[]): void;
    protected onChange(items?: T[]): void;
    protected onInputChange: (value: string) => void;
    protected onSuggestionClick: (ev: React_2.MouseEvent<HTMLElement>, item: any, index: number) => void;
    protected onSuggestionRemove: (ev: React_2.MouseEvent<HTMLElement>, item: T, index: number) => void;
    protected onInputFocus: (ev: React_2.FocusEvent<HTMLInputElement | Autofill>) => void;
    protected onInputBlur: (ev: React_2.FocusEvent<HTMLInputElement | Autofill>) => void;
    protected onBlur: (ev: React_2.FocusEvent<HTMLElement | Autofill>) => void;
    /**
     * Resets focus to last element in wrapper div if clicking back into Picker that has hit item limit
     */
    protected onWrapperClick: (ev: React_2.MouseEvent<HTMLInputElement>) => void;
    /**
     * Reveals suggestions any time the user clicks on the input element
     * without shifting focus.
     */
    protected onClick: (ev: React_2.MouseEvent<HTMLInputElement>) => void;
    protected onFocus: () => void;
    protected onKeyDown: (ev: React_2.KeyboardEvent<HTMLElement>) => void;
    protected onItemChange: (changedItem: T, index: number) => void;
    protected onGetMoreResults: () => void;
    protected completeSelection: (item: T) => void;
    protected addItemByIndex: (index: number) => void;
    protected addItem: (item: T) => void;
    protected removeItem: (item: T) => void;
    protected removeItems: (itemsToRemove: any[]) => void;
    protected onBackspace(ev: React_2.KeyboardEvent<HTMLElement>): void;
    /**
     * @deprecated this is no longer necessary as focuszone has been removed
     */
    protected _shouldFocusZoneEnterInnerZone: (ev: React_2.KeyboardEvent<HTMLElement>) => boolean;
    protected getActiveDescendant(): string | undefined;
    /** @deprecated use renderCustomAlert instead */
    protected getSuggestionsAlert(suggestionAlertClassName?: string): JSX.Element | undefined;
    protected renderCustomAlert(alertClassName?: string): JSX.Element;
    /** If suggestions are still loading after a predefined amount of time, set state to show user alert */
    private _startLoadTimer;
    /**
     * Takes in the current updated value and either resolves it with the new suggestions
     * or if updated value is undefined then it clears out currently suggested items
     */
    private _updateAndResolveValue;
    /**
     * Controls what happens whenever there is an action that impacts the selected items.
     * If `selectedItems` is provided, this will act as a controlled component and it will not update its own state.
     */
    private _updateSelectedItems;
    private _onSelectedItemsUpdated;
    /**
     * Suggestions are normally shown after the user updates text and the text
     * is non-empty, but also when the user clicks on the input element.
     * @returns True if suggestions should be shown.
     */
    private _getShowSuggestions;
    private _onResolveSuggestions;
    private _completeGenericSuggestion;
    private _getTextFromItem;
    /**
     * This should be called when the user does something other than use text entry to trigger suggestions.
     *
     */
    private _userTriggeredSuggestions;
}

export declare class BasePickerListBelow<T, P extends IBasePickerProps<T>> extends BasePicker<T, P> {
    render(): JSX.Element;
    protected onBackspace(ev: React_2.KeyboardEvent<HTMLElement>): void;
}

export declare class BaseSelectedItemsList<T, P extends IBaseSelectedItemsListProps<T>> extends React_2.Component<P, IBaseSelectedItemsListState<T>> implements IBaseSelectedItemsList<T> {
    protected root: HTMLElement;
    private _defaultSelection;
    static getDerivedStateFromProps(newProps: IBaseSelectedItemsListProps<any>): {
        items: any[];
    } | null;
    constructor(basePickerProps: P);
    get items(): T[];
    addItems: (items: T[]) => void;
    removeItemAt: (index: number) => void;
    removeItem: (item: T) => void;
    replaceItem: (itemToReplace: T, itemsToReplaceWith: T[]) => void;
    removeItems: (itemsToRemove: any[]) => void;
    removeSelectedItems(): void;
    /**
     * Controls what happens whenever there is an action that impacts the selected items.
     * If selectedItems is provided, this will act as a controlled component and will not update its own state.
     */
    updateItems(items: T[], focusIndex?: number): void;
    onCopy: (ev: React_2.ClipboardEvent<HTMLElement>) => void;
    hasSelectedItems(): boolean;
    componentDidUpdate(oldProps: P, oldState: IBaseSelectedItemsListState<IObjectWithKey>): void;
    unselectAll(): void;
    highlightedItems(): T[];
    componentDidMount(): void;
    protected get selection(): Selection_2;
    render(): any;
    protected renderItems: () => JSX.Element[];
    protected onSelectionChanged: () => void;
    protected onChange(items?: T[]): void;
    protected onItemChange: (changedItem: T, index: number) => void;
    protected copyItems(items: T[]): void;
    private _onSelectedItemsUpdated;
    private _canRemoveItem;
}

export declare enum BaseSlots {
    primaryColor = 0,
    backgroundColor = 1,
    foregroundColor = 2
}

export declare const Breadcrumb: React_2.FunctionComponent<IBreadcrumbProps>;

/**
 * {@docCategory Breadcrumb}
 */
export declare class BreadcrumbBase extends React_2.Component<IBreadcrumbProps, any> {
    static defaultProps: IBreadcrumbProps;
    private _classNames;
    private _focusZone;
    constructor(props: IBreadcrumbProps);
    /**
     * Sets focus to the first breadcrumb link.
     */
    focus(): void;
    render(): JSX.Element;
    /**
     * Remove the first rendered item past the overlow point and put it and the end the overflow set.
     */
    private _onReduceData;
    /**
     * Remove the last item of the overflow set and insert the item as the start of the rendered set past the overflow
     * point.
     */
    private _onGrowData;
    private _onRenderBreadcrumb;
    private _onRenderItem;
    private _onBreadcrumbClicked;
    /**
     * Validate incoming props
     * @param props - Props to validate
     */
    private _validateProps;
}

export { buildClassMap }

export declare function buildColumns(items: any[], canResizeColumns?: boolean, onColumnClick?: (ev: React_2.MouseEvent<HTMLElement>, column: IColumn) => void, sortedColumnKey?: string, isSortedDescending?: boolean, groupedColumnKey?: string, isMultiline?: boolean, columnActionsMode?: ColumnActionsMode): IColumn[];

/**
 * Builds a map of ID to IKeytipProps
 *
 * @param config - IKeytipConfig object
 * @returns Config map
 */
export declare function buildKeytipConfigMap(config: IKeytipConfig): IKeytipConfigMap;

/**
 * This class is deprecated. Use the individual *Button components instead.
 * @deprecated Use the individual *Button components instead.
 * {@docCategory Button}
 */
export declare class Button extends React_2.Component<IButtonProps, {}> {
    constructor(props: IButtonProps);
    render(): JSX.Element;
}

export declare const ButtonGlobalClassNames: {
    msButton: string;
    msButtonHasMenu: string;
    msButtonIcon: string;
    msButtonMenuIcon: string;
    msButtonLabel: string;
    msButtonDescription: string;
    msButtonScreenReaderText: string;
    msButtonFlexContainer: string;
    msButtonTextContainer: string;
};

export declare const ButtonGrid: React_2.FunctionComponent<IButtonGridProps>;

export declare const ButtonGridCell: <T, P extends IButtonGridCellProps<T>>(props: IButtonGridCellProps<T>) => JSX.Element;

export { buttonProperties }

/**
 * {@docCategory Button}
 */
export declare enum ButtonType {
    normal = 0,
    primary = 1,
    hero = 2,
    compound = 3,
    command = 4,
    icon = 5,
    default = 6
}

export { calculatePrecision }

export declare const Calendar: React_2.FunctionComponent<ICalendarProps>;

export declare const Callout: React_2.FunctionComponent<ICalloutProps>;

export declare const CalloutContent: React_2.FunctionComponent<ICalloutProps>;

export declare const CalloutContentBase: React_2.FunctionComponent<ICalloutProps>;

/**
 * Returns true if a list of menu items can contain a checkbox
 */
export declare function canAnyMenuItemsCheck(items: IContextualMenuItem[]): boolean;

export { canUseDOM }

export declare const Check: React_2.FunctionComponent<ICheckProps>;

export declare const CHECK_CELL_WIDTH = 48;

export declare const CheckBase: React_2.FunctionComponent<ICheckProps>;

export declare const Checkbox: React_2.FunctionComponent<ICheckboxProps>;

export declare const CheckboxBase: React_2.FunctionComponent<ICheckboxProps>;

/**
 * {@docCategory DetailsList}
 */
export declare enum CheckboxVisibility {
    /** Visible on hover. */
    onHover = 0,
    /** Visible always. */
    always = 1,
    /** Hide checkboxes. */
    hidden = 2
}

export declare const ChoiceGroup: React_2.FunctionComponent<IChoiceGroupProps>;

export declare const ChoiceGroupBase: React_2.FunctionComponent<IChoiceGroupProps>;

export declare const ChoiceGroupOption: React_2.FunctionComponent<IChoiceGroupOptionProps>;

/** Clamp a value to ensure it falls within a given range. */
export declare function clamp(value: number, max: number, min?: number): number;

export { classNamesFunction }

/**
 * This function can be optionally called to clean up the default layer host as needed.
 */
export declare function cleanupDefaultLayerHost(doc: Document): void;

export declare const Coachmark: React_2.FunctionComponent<ICoachmarkProps>;

export declare const COACHMARK_ATTRIBUTE_NAME = "data-coachmarkid";

export declare const CoachmarkBase: React_2.FunctionComponent<ICoachmarkProps>;

export { colGroupProperties }

/**
 * {@docCategory GroupedList}
 */
export declare enum CollapseAllVisibility {
    hidden = 0,
    visible = 1
}

export { ColorClassNames }

declare type ColorComponent = keyof Pick<IColor, 'r' | 'g' | 'b' | 'a' | 't' | 'hex'>;

export declare const ColorPicker: React_2.FunctionComponent<IColorPickerProps>;

/**
 * {@docCategory ColorPicker}
 */
export declare class ColorPickerBase extends React_2.Component<IColorPickerProps, IColorPickerState> implements IColorPicker {
    static defaultProps: Partial<IColorPickerProps>;
    private _textChangeHandlers;
    /**
     * Strings displayed in the UI as text field labels (these are in a separate object for convenient
     * indexing by short color component name).
     */
    private _textLabels;
    /** Strings besides red/green/blue/alpha/hex, with defaults for all values except the deprecated `hue` */
    private _strings;
    constructor(props: IColorPickerProps);
    get color(): IColor;
    componentDidUpdate(prevProps: Readonly<IColorPickerProps>, prevState: Readonly<IColorPickerState>): void;
    render(): JSX.Element;
    private _getDisplayValue;
    private _getTooltipValue;
    private _onSVChanged;
    private _onHChanged;
    /** Callback for when the alpha/transparency slider changes */
    private _onATChanged;
    private _onTextChange;
    private _onBlur;
    /**
     * Update the displayed color and call change handlers if appropriate.
     * @param ev - Event if call was triggered by an event (undefined if triggered by props change)
     * @param newColor - Updated color
     */
    private _updateColor;
}

export declare const ColorPickerGridCell: React_2.FunctionComponent<IColorPickerGridCellProps>;

export declare const ColorPickerGridCellBase: React_2.FunctionComponent<IColorPickerGridCellProps>;

export { colProperties }

/**
 * Enum to describe how a particular column header behaves.
 * This is used to to specify the property `IColumn.columnActionsMode`.
 * If `IColumn.columnActionsMode` is undefined, it's equivalent to `ColumnActionsMode.clickable`.
 * {@docCategory DetailsList}
 */
export declare enum ColumnActionsMode {
    /** Renders the column header as disabled. */
    disabled = 0,
    /** Renders the column header as clickable. Default value. */
    clickable = 1,
    /** Renders the column header as clickable and displays the dropdown chevron. */
    hasDropdown = 2
}

/**
 * Enum to describe where the column has been dropped, after starting the drag
 * {@docCategory DetailsList}
 */
export declare enum ColumnDragEndLocation {
    /** Drag ended outside of current list */
    outside = 0,
    /** Drag ended within current list */
    surface = 1,
    /** Drag ended on header */
    header = 2
}

export declare const ComboBox: React_2.FunctionComponent<IComboBoxProps>;

export declare const CommandBar: React_2.FunctionComponent<ICommandBarProps>;

export declare class CommandBarBase extends React_2.Component<ICommandBarProps, {}> implements ICommandBar {
    static defaultProps: ICommandBarProps;
    private _overflowSet;
    private _resizeGroup;
    private _classNames;
    constructor(props: ICommandBarProps);
    render(): JSX.Element;
    focus(): void;
    remeasure(): void;
    private _onRenderData;
    private _onRenderItem;
    private _commandButton;
    private _onButtonClick;
    private _onRenderOverflowButton;
    private _computeCacheKey;
    private _onReduceData;
    private _onGrowData;
}

/**
 * {@docCategory Button}
 */
export declare class CommandBarButton extends React_2.Component<IButtonProps, {}> {
    render(): JSX.Element;
}

/**
 * {@docCategory Button}
 */
export declare const CommandButton: typeof ActionButton;

export { CommunicationColors }

export declare const CompactPeoplePicker: React_2.FunctionComponent<IPeoplePickerProps>;

/**
 * Compact layout. It uses personas without secondary text when displaying search results.
 * {@docCategory PeoplePicker}
 */
export declare class CompactPeoplePickerBase extends BasePeoplePicker {
    /** Default props for CompactPeoplePicker. */
    static defaultProps: {
        onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
        onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps) => JSX.Element;
        createGenericItem: typeof createGenericItem;
    };
}

export { compareDatePart }

export { compareDates }

export { ComponentsStyles }

export { ComponentStyles }

export { composeComponentAs }

export { composeRenderFunction }

/**
 * {@docCategory Button}
 */
export declare class CompoundButton extends React_2.Component<IButtonProps, {}> {
    render(): JSX.Element;
}

export { concatStyleSets }

export { concatStyleSetsWithProps }

/**
 * {@docCategory DetailsList}
 */
export declare enum ConstrainMode {
    /** Lets the content grow which allows the page to manage scrolling. */
    unconstrained = 0,
    /** Constrains the list to the given layout space. */
    horizontalConstrained = 1
}

/**
 * Constructs a keytip from an IKeytipConfigItem and puts it in the configMap
 *
 * @param configMap - IKeytipConfigMap to store the keytip in
 * @param parentSequence - string of the parent keytip
 * @param keytip - IKeytipConfigItem data
 */
export declare function constructKeytip(configMap: IKeytipConfigMap, parentSequence: string[], keytip: IKeytipConfigItem): void;

/**
 * ContextualMenu description
 */
export declare const ContextualMenu: React_2.FunctionComponent<IContextualMenuProps>;

export declare const ContextualMenuBase: React_2.FunctionComponent<IContextualMenuProps>;

/**
 * ContextualMenuItem description
 */
export declare const ContextualMenuItem: React_2.FunctionComponent<IContextualMenuItemProps>;

export declare class ContextualMenuItemBase extends React_2.Component<IContextualMenuItemProps, {}> {
    constructor(props: IContextualMenuItemProps);
    render(): JSX.Element;
    openSubMenu: () => void;
    dismissSubMenu: () => void;
    dismissMenu: (dismissAll?: boolean) => void;
    private _renderLayout;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare enum ContextualMenuItemType {
    Normal = 0,
    Divider = 1,
    Header = 2,
    Section = 3
}

/**
 * Corrects a hex color to have length 3 or 6. Defaults to white if too short.
 * Does NOT check anything besides the length (such as valid characters) and does NOT handle
 * hex values starting with # sign.
 */
export declare function correctHex(hex: string): string;

/** Corrects an HSV color to fall within the valid range. */
export declare function correctHSV(color: IHSV): IHSV;

/** Corrects an RGB color to fall within the valid range.  */
export declare function correctRGB(color: IRGB): IRGB;

export { createArray }

/**
 * When no default layer host is provided, this function is executed to create the default host.
 */
export declare function createDefaultLayerHost(doc: Document): Node | null;

export { createFontStyles }

/**
 * {@docCategory PeoplePicker}
 */
export declare function createGenericItem(name: string, currentValidationState: ValidationState): IGenericItem & {
    key: React_2.Key;
};

export declare function createItem(name: string, isValid: boolean): ISuggestionModel<IPersonaProps>;

export { createMemoizer }

export { createMergedRef }

export { createTheme }

export { css }

/**
 * Converts a valid CSS color string to an RGB color.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 * Alpha in returned color defaults to 100.
 * Four and eight digit hex values (with alpha) are supported if the current browser supports them.
 */
export declare function cssColor(color?: string): IRGB | undefined;

export { customizable }

export { Customizations }

export { Customizer }

export { CustomizerContext }

export { DATA_IS_SCROLLABLE_ATTRIBUTE }

export { DATA_PORTAL_ATTRIBUTE }

export declare const DATAKTP_ARIA_TARGET = "data-ktp-aria-target";

export declare const DATAKTP_EXECUTE_TARGET = "data-ktp-execute-target";

export declare const DATAKTP_TARGET = "data-ktp-target";

export declare const DatePicker: React_2.FunctionComponent<IDatePickerProps>;

export declare const DatePickerBase: React_2.FunctionComponent<IDatePickerProps>;

export { DateRangeType }

export { DayOfWeek }

export { DAYS_IN_WEEK }

export declare const DEFAULT_CELL_STYLE_PROPS: ICellStyleProps;

export declare const DEFAULT_MASK_CHAR = "_";

export declare const DEFAULT_ROW_HEIGHTS: {
    rowHeight: number;
    compactRowHeight: number;
};

/**
 * {@docCategory Button}
 */
export declare class DefaultButton extends React_2.Component<IButtonProps, {}> {
    render(): JSX.Element;
}

export declare const defaultCalendarNavigationIcons: ICalendarNavigationIcons;

export declare const defaultCalendarStrings: ICalendarStrings;

export declare const defaultDatePickerStrings: IDatePickerStrings;

/**
 * @deprecated Use `defaultCalendarStrings`
 */
export declare const defaultDayPickerStrings: ICalendarStrings;

export { DefaultEffects }

export { DefaultFontStyles }

export { DefaultPalette }

export { DefaultSpacing }

export declare const defaultWeeklyDayPickerNavigationIcons: IWeeklyDayPickerNavigationIcons;

export declare const defaultWeeklyDayPickerStrings: IWeeklyDayPickerStrings;

export { DelayedRender }

export { Depths }

export declare const DetailsColumn: React_2.FunctionComponent<IDetailsColumnProps>;

/**
 * Component for rendering columns in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */
export declare class DetailsColumnBase extends React_2.Component<IDetailsColumnProps> {
    private _async;
    private _events;
    private _root;
    private _dragDropSubscription?;
    private _classNames;
    constructor(props: IDetailsColumnProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    private _onRenderFilterIcon;
    private _onRenderColumnHeaderTooltip;
    private _onColumnClick;
    private _getColumnDragDropOptions;
    private _hasAccessibleDescription;
    private _renderAccessibleDescription;
    private _onDragStart;
    private _onDragEnd;
    private _updateHeaderDragInfo;
    private _onColumnContextMenu;
    private _onRootMouseDown;
    private _addDragDropHandling;
}

export declare const DetailsHeader: React_2.FunctionComponent<IDetailsHeaderBaseProps>;

export declare class DetailsHeaderBase extends React_2.Component<IDetailsHeaderBaseProps, IDetailsHeaderState> implements IDetailsHeader {
    static defaultProps: {
        selectAllVisibility: SelectAllVisibility;
        collapseAllVisibility: CollapseAllVisibility;
        useFastIcons: boolean;
    };
    private _classNames;
    private _rootElement;
    private _events;
    private _rootComponent;
    private _id;
    private _draggedColumnIndex;
    private _dropHintDetails;
    private _dragDropHelper;
    private _currentDropHintIndex;
    private _subscriptionObject?;
    private _onDropIndexInfo;
    constructor(props: IDetailsHeaderBaseProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IDetailsHeaderBaseProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    /** Set focus to the active thing in the focus area. */
    focus(): boolean;
    /**
     * Gets column reorder props from this.props. If the calling code is part of setting up or
     * handling drag/drop events, it's safe to assume that this method's return value is defined
     * (because drag/drop handling will only be set up if reorder props are given).
     */
    private _getColumnReorderProps;
    private _getHeaderDragDropOptions;
    private _updateDroppingState;
    private _isValidCurrentDropHintIndex;
    private _onDragOver;
    private _onDrop;
    private _computeColumnIndexOffset;
    /**
     * @returns whether or not the "Select All" checkbox column is hidden.
     */
    private _isCheckboxColumnHidden;
    private _updateDragInfo;
    private _resetDropHints;
    private _updateDropHintElement;
    private _getDropHintPositions;
    /**
     * Based on the given cursor position, finds the nearest drop hint and updates the state to make it visible
     */
    private _computeDropHintToBeShown;
    private _isEventOnHeader;
    private _renderColumnSizer;
    private _renderColumnDivider;
    private _renderDropHint;
    private _onRenderColumnHeaderTooltip;
    /**
     * double click on the column sizer will auto ajust column width
     * to fit the longest content among current rendered rows.
     *
     * @param columnIndex - index of the column user double clicked
     * @param ev - mouse double click event
     */
    private _onSizerDoubleClick;
    /**
     * Called when the select all toggle is clicked.
     */
    private _onSelectAllClicked;
    private _onRootMouseDown;
    private _onRootMouseMove;
    private _onRootKeyDown;
    /**
     * mouse move event handler in the header
     * it will set isSizing state to true when user clicked on the sizer and move the mouse.
     *
     * @param ev - mouse move event
     */
    private _onSizerMouseMove;
    private _onSizerBlur;
    /**
     * mouse up event handler in the header
     * clear the resize related state.
     * This is to ensure we can catch double click event
     *
     * @param ev - mouse up event
     */
    private _onSizerMouseUp;
    private _onSelectionChanged;
    private _onToggleCollapseAll;
}

export declare const DetailsList: React_2.FunctionComponent<IDetailsListProps>;

export declare class DetailsListBase extends React_2.Component<IDetailsListProps, IDetailsListState> implements IDetailsList {
    static defaultProps: {
        layoutMode: DetailsListLayoutMode;
        selectionMode: SelectionMode_2;
        constrainMode: ConstrainMode;
        checkboxVisibility: CheckboxVisibility;
        isHeaderVisible: boolean;
        compact: boolean;
        useFastIcons: boolean;
    };
    private _async;
    private _root;
    private _header;
    private _groupedList;
    private _list;
    private _focusZone;
    private _selectionZone;
    private _selection;
    private _activeRows;
    private _dragDropHelper;
    private _initialFocusedIndex;
    private _columnOverrides;
    static getDerivedStateFromProps(nextProps: IDetailsListProps, previousState: IDetailsListState): IDetailsListState;
    constructor(props: IDetailsListProps);
    scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
    focusIndex(index: number, forceIntoFirstElement?: boolean, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
    getStartItemIndexInView(): number;
    updateColumn(column: IColumn, options: {
        width?: number;
        newColumnIndex?: number;
    }): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: IDetailsListProps, prevState: IDetailsListState): void;
    render(): JSX.Element;
    forceUpdate(): void;
    protected _onRenderRow: (props: IDetailsRowProps, defaultRender?: IRenderFunction<IDetailsRowProps>) => JSX.Element;
    private _getDerivedStateFromProps;
    private _onGroupExpandStateChanged;
    private _onColumnIsSizingChanged;
    private _getGroupNestingDepth;
    private _onRowDidMount;
    private _setFocusToRowIfPending;
    private _setFocusToRow;
    private _onRowWillUnmount;
    private _onToggleCollapse;
    private _forceListUpdates;
    private _notifyColumnsResized;
    private _adjustColumns;
    /** Returns adjusted columns, given the viewport size and layout mode. */
    private _getAdjustedColumns;
    /** Builds a set of columns based on the given columns mixed with the current overrides. */
    private _getFixedColumns;
    /** Builds a set of columns to fix within the viewport width. */
    private _getJustifiedColumns;
    private _onColumnResized;
    private _rememberCalculatedWidth;
    private _getColumnOverride;
    /**
     * Callback function when double clicked on the details header column resizer
     * which will measure the column cells of all the active rows and resize the
     * column to the max cell width.
     *
     * @param column - double clicked column definition
     * @param columnIndex - double clicked column index
     * TODO: min width 100 should be changed to const value and should be consistent with the
     * value used on _onSizerMove method in DetailsHeader
     */
    private _onColumnAutoResized;
    /**
     * Call back function when an element in FocusZone becomes active. It will translate it into item
     * and call onActiveItemChanged callback if specified.
     *
     * @param row - element that became active in Focus Zone
     * @param focus - event from Focus Zone
     */
    private _onActiveRowChanged;
    private _onBlur;
    private _getItemKey;
}

/**
 * {@docCategory DetailsList}
 */
export declare enum DetailsListLayoutMode {
    /**
     * Lets the user resize columns and makes not attempt to fit them.
     */
    fixedColumns = 0,
    /**
     * Manages which columns are visible, tries to size them according to their min/max rules and drops
     * off columns that can't fit and have isCollapsible set.
     */
    justified = 1
}

export declare const DetailsRow: React_2.FunctionComponent<IDetailsRowBaseProps>;

export declare class DetailsRowBase extends React_2.Component<IDetailsRowBaseProps, IDetailsRowState> {
    private _events;
    private _root;
    private _cellMeasurer;
    private _focusZone;
    private _droppingClassNames;
    /** Whether this.props.onDidMount has been called */
    private _onDidMountCalled;
    private _dragDropSubscription?;
    private _classNames;
    private _rowClassNames;
    private _ariaRowDescriptionId;
    static getDerivedStateFromProps(nextProps: IDetailsRowBaseProps, previousState: IDetailsRowState): IDetailsRowState;
    constructor(props: IDetailsRowBaseProps);
    componentDidMount(): void;
    componentDidUpdate(previousProps: IDetailsRowBaseProps): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: IDetailsRowBaseProps, nextState: IDetailsRowState): boolean;
    render(): JSX.Element;
    /**
     * measure cell at index. and call the call back with the measured cell width when finish measure
     *
     * @param index - The cell index
     * @param onMeasureDone - The call back function when finish measure
     */
    measureCell(index: number, onMeasureDone: (width: number) => void): void;
    focus(forceIntoFirstElement?: boolean): boolean;
    protected _onRenderCheck(props: IDetailsRowCheckProps): JSX.Element;
    private _onSelectionChanged;
    private _getRowDragDropOptions;
    /**
     * update isDropping state based on the input value, which is used to change style during drag and drop
     *
     * when change to true, that means drag enter. we will add default dropping class name
     * or the custom dropping class name (return result from onDragEnter) to the root elemet.
     *
     * when change to false, that means drag leave. we will remove the dropping class name from root element.
     *
     * @param newValue - New isDropping state value
     * @param event - The event trigger dropping state change which can be dragenter, dragleave etc
     */
    private _updateDroppingState;
}

export declare const DetailsRowCheck: React_2.FunctionComponent<IDetailsRowCheckProps>;

/**
 * Component for rendering a row's cells in a `DetailsList`.
 *
 * {@docCategory DetailsList}
 */
export declare const DetailsRowFields: React_2.FunctionComponent<IDetailsRowFieldsProps>;

export declare const DetailsRowGlobalClassNames: {
    root: string;
    compact: string;
    cell: string;
    cellAnimation: string;
    cellCheck: string;
    check: string;
    cellMeasurer: string;
    listCellFirstChild: string;
    isContentUnselectable: string;
    isSelected: string;
    isCheckVisible: string;
    isRowHeader: string;
    fields: string;
};

export declare const Dialog: React_2.FunctionComponent<IDialogProps>;

export declare class DialogBase extends React_2.Component<IDialogProps, {}> {
    static defaultProps: IDialogProps;
    private _id;
    private _defaultTitleTextId;
    private _defaultSubTextId;
    constructor(props: IDialogProps);
    render(): JSX.Element;
    private _getSubTextId;
    private _getTitleTextId;
}

export declare const DialogContent: React_2.FunctionComponent<IDialogContentProps>;

export declare class DialogContentBase extends React_2.Component<IDialogContentProps, {}> {
    static defaultProps: IDialogContentProps;
    constructor(props: IDialogContentProps);
    render(): JSX.Element;
    private _groupChildren;
}

export declare const DialogFooter: React_2.FunctionComponent<IDialogFooterProps>;

export declare class DialogFooterBase extends React_2.Component<IDialogFooterProps, {}> {
    private _classNames;
    constructor(props: IDialogFooterProps);
    render(): JSX.Element;
    private _renderChildrenAsActions;
}

/**
 * {@docCategory Dialog}
 */
export declare enum DialogType {
    /** Standard dialog */
    normal = 0,
    /** Dialog with large header banner */
    largeHeader = 1,
    /** Dialog with an 'x' close button in the upper-right corner */
    close = 2
}

export declare const DirectionalHint: {
    /**
     * Appear above the target element, with the left edges of the callout and target aligning.
     */
    topLeftEdge: 0;
    /**
     * Appear above the target element, with the centers of the callout and target aligning.
     */
    topCenter: 1;
    /**
     * Appear above the target element, with the right edges of the callout and target aligning.
     */
    topRightEdge: 2;
    /**
     * Appear above the target element, aligning with the target element such that the callout tends toward
     * the center of the screen.
     */
    topAutoEdge: 3;
    /**
     * Appear below the target element, with the left edges of the callout and target aligning.
     */
    bottomLeftEdge: 4;
    /**
     * Appear below the target element, with the centers of the callout and target aligning.
     */
    bottomCenter: 5;
    /**
     * Appear below the target element, with the right edges of the callout and target aligning.
     */
    bottomRightEdge: 6;
    /**
     * Appear below the target element, aligning with the target element such that the callout tends toward
     * the center of the screen.
     */
    bottomAutoEdge: 7;
    /**
     * Appear to the left of the target element, with the top edges of the callout and target aligning.
     */
    leftTopEdge: 8;
    /**
     * Appear to the left of the target element, with the centers of the callout and target aligning.
     */
    leftCenter: 9;
    /**
     * Appear to the left of the target element, with the bottom edges of the callout and target aligning.
     */
    leftBottomEdge: 10;
    /**
     * Appear to the right of the target element, with the top edges of the callout and target aligning.
     */
    rightTopEdge: 11;
    /**
     * Appear to the right of the target element, with the centers of the callout and target aligning.
     */
    rightCenter: 12;
    /**
     * Appear to the right of the target element, with the bottom edges of the callout and target aligning.
     */
    rightBottomEdge: 13;
};

export declare type DirectionalHint = (typeof DirectionalHint)[keyof typeof DirectionalHint];

export { disableBodyScroll }

export { divProperties }

export declare const DocumentCard: React_2.FunctionComponent<IDocumentCardProps>;

export declare const DocumentCardActions: React_2.FunctionComponent<IDocumentCardActionsProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardActionsBase extends React_2.Component<IDocumentCardActionsProps, any> {
    private _classNames;
    constructor(props: IDocumentCardActionsProps);
    render(): JSX.Element;
}

export declare const DocumentCardActivity: React_2.FunctionComponent<IDocumentCardActivityProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardActivityBase extends React_2.Component<IDocumentCardActivityProps, any> {
    private _classNames;
    constructor(props: IDocumentCardActivityProps);
    render(): JSX.Element | null;
    private _renderAvatars;
    private _renderAvatar;
    private _getNameString;
}

export declare const DocumentCardDetails: React_2.FunctionComponent<IDocumentCardDetailsProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardDetailsBase extends React_2.Component<IDocumentCardDetailsProps, any> {
    private _classNames;
    constructor(props: IDocumentCardDetailsProps);
    render(): JSX.Element;
}

export declare const DocumentCardImage: React_2.FunctionComponent<IDocumentCardImageProps>;

export declare const DocumentCardLocation: React_2.FunctionComponent<IDocumentCardLocationProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardLocationBase extends React_2.Component<IDocumentCardLocationProps, any> {
    private _classNames;
    constructor(props: IDocumentCardLocationProps);
    render(): JSX.Element;
}

export declare const DocumentCardLogo: React_2.FunctionComponent<IDocumentCardLogoProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardLogoBase extends React_2.Component<IDocumentCardLogoProps, any> {
    private _classNames;
    constructor(props: IDocumentCardLogoProps);
    render(): JSX.Element;
}

export declare const DocumentCardPreview: React_2.FunctionComponent<IDocumentCardPreviewProps>;

export declare const DocumentCardStatus: React_2.FunctionComponent<IDocumentCardStatusProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardStatusBase extends React_2.Component<IDocumentCardStatusProps, any> {
    private _classNames;
    constructor(props: IDocumentCardStatusProps);
    render(): JSX.Element;
}

export declare const DocumentCardTitle: React_2.FunctionComponent<IDocumentCardTitleProps>;

/**
 * {@docCategory DocumentCard}
 */
declare class DocumentCardTitleBase extends React_2.Component<IDocumentCardTitleProps, IDocumentCardTitleState> {
    private _titleElement;
    private _classNames;
    private _async;
    private _events;
    private _clientWidth;
    private _timerId;
    constructor(props: IDocumentCardTitleProps);
    componentDidUpdate(prevProps: IDocumentCardTitleProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    /**
     * In measuring, it will render a same style text with whiteSpace: 'nowrap', to get overflow rate.
     * So that the logic can predict truncated text well.
     */
    private get _needMeasurement();
    private _truncateTitle;
    private _truncateWhenInAnimation;
    private _shrinkTitle;
    private _updateTruncation;
}

/**
 * {@docCategory DocumentCard}
 */
export declare enum DocumentCardType {
    /**
     * Standard DocumentCard.
     */
    normal = 0,
    /**
     * Compact layout. Displays the preview beside the details, rather than above.
     */
    compact = 1
}

export { doesElementContainFocus }

export declare class DragDropHelper implements IDragDropHelper {
    private _dragEnterCounts;
    private _isDragging;
    private _dragData;
    private _selection;
    private _activeTargets;
    private _events;
    private _lastId;
    private _initialized;
    constructor(params: IDragDropHelperParams);
    dispose(): void;
    subscribe(root: HTMLElement, events: EventGroup, dragDropOptions: IDragDropOptions): {
        key: string;
        dispose(): void;
    };
    unsubscribe(root: HTMLElement, key: string): void;
    private _onDragEnd;
    /**
     * clear drag data when mouse up on body
     */
    private _onMouseUp;
    /**
     * clear drag data when mouse up outside of the document
     */
    private _onDocumentMouseUp;
    /**
     * when mouse move over a new drop target while dragging some items,
     * fire dragleave on the old target and fire dragenter to the new target
     * The target will handle style change on dragenter and dragleave events.
     */
    private _onMouseMove;
    /**
     * when mouse leave a target while dragging some items, fire dragleave to the target
     */
    private _onMouseLeave;
    /**
     * when mouse down on a draggable item, we start to track dragdata.
     */
    private _onMouseDown;
    /**
     * determine whether the child target is a descendant of the parent
     */
    private _isChild;
    private _isDraggable;
    private _isDroppable;
}

export declare const Dropdown: React_2.FunctionComponent<IDropdownProps>;

export declare const DropdownBase: React_2.FunctionComponent<IDropdownProps>;

export { EdgeChromiumHighContrastSelector }

export { elementContains }

export { elementContainsAttribute }

/**
 * {@docCategory Button}
 */
export declare enum ElementType {
    /** `button` element. */
    button = 0,
    /** `a` element. */
    anchor = 1
}

export { enableBodyScroll }

export { EventGroup }

export declare const ExpandingCard: React_2.FunctionComponent<IExpandingCardProps>;

export declare class ExpandingCardBase extends React_2.Component<IExpandingCardProps, IExpandingCardState> {
    static defaultProps: {
        compactCardHeight: number;
        expandedCardHeight: number;
        directionalHintFixed: boolean;
    };
    private _classNames;
    private _expandedElem;
    private _async;
    constructor(props: IExpandingCardProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _onKeyDown;
    private _onRenderCompactCard;
    private _onRenderExpandedCard;
    private _checkNeedsScroll;
}

/**
 * {@docCategory HoverCard}
 */
export declare enum ExpandingCardMode {
    /**
     * To have top compact card only
     */
    compact = 0,
    /**
     * To have both top compact and bottom expanded card
     */
    expanded = 1
}

export { extendComponent }

/**
 * {@docCategory ExtendedPeoplePicker}
 */
export declare class ExtendedPeoplePicker extends BaseExtendedPeoplePicker {
}

export declare class ExtendedSelectedItem extends React_2.Component<ISelectedPeopleItemProps, IPeoplePickerItemState> {
    protected persona: React_2.RefObject<HTMLDivElement>;
    constructor(props: ISelectedPeopleItemProps);
    render(): JSX.Element;
    private _onClickIconButton;
}

/**
 * @deprecated This component is deprecated as of `@fluentui/react` version 8. Use `ThemeProvider` instead.
 */
export declare const Fabric: React_2.FunctionComponent<IFabricProps>;

export declare const FabricBase: React_2.FunctionComponent<IFabricProps>;

export { FabricPerformance }

export declare enum FabricSlots {
    themePrimary = 0,
    themeLighterAlt = 1,
    themeLighter = 2,
    themeLight = 3,
    themeTertiary = 4,
    themeSecondary = 5,
    themeDarkAlt = 6,
    themeDark = 7,
    themeDarker = 8,
    neutralLighterAlt = 9,
    neutralLighter = 10,
    neutralLight = 11,
    neutralQuaternaryAlt = 12,
    neutralQuaternary = 13,
    neutralTertiaryAlt = 14,
    neutralTertiary = 15,
    neutralSecondaryAlt = 16,
    neutralSecondary = 17,
    neutralPrimaryAlt = 18,
    neutralPrimary = 19,
    neutralDark = 20,
    black = 21,
    white = 22
}

/**
 * The Facepile shows a list of faces or initials in a horizontal lockup. Each circle represents a person.
 */
export declare const Facepile: React_2.FunctionComponent<IFacepileProps>;

/**
 * FacePile with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/microsoft/fluentui/wiki/Component-Styling)
 */
export declare class FacepileBase extends React_2.Component<IFacepileProps, {}> {
    static defaultProps: IFacepileProps;
    private _ariaDescriptionId;
    private _classNames;
    constructor(props: IFacepileProps);
    render(): JSX.Element;
    protected onRenderAriaDescription(): "" | JSX.Element | undefined;
    private _onRenderVisiblePersonas;
    private _getPersonaControl;
    private _getPersonaCoinControl;
    private _getElementWithOnClickEvent;
    private _getElementWithoutOnClickEvent;
    private _getElementProps;
    private _getOverflowElement;
    private _getDescriptiveOverflowElement;
    private _getIconElement;
    private _getAddNewElement;
    private _onPersonaClick;
    private _onPersonaMouseMove;
    private _onPersonaMouseOut;
    private _renderInitials;
    private _renderInitialsNotPictured;
}

export { filteredAssign }

export { find }

export { findElementRecursive }

export { findIndex }

export { findScrollableParent }

export { FirstWeekOfYear }

export { fitContentToBounds }

export { FitMode }

export { flatten }

export declare class FloatingPeoplePicker extends BaseFloatingPeoplePicker {
    static defaultProps: any;
}

export { FluentTheme }

export { focusAsync }

export { focusClear }

export { focusFirstChild }

export { FocusRects }

export { FocusRectsContext }

export { FocusRectsProvider }

/**
 * A special Callout that uses FocusTrapZone to trap focus
 * @param props - Props for the component
 */
export declare const FocusTrapCallout: React_2.FunctionComponent<IFocusTrapCalloutProps>;

export declare const FocusTrapZone: React_2.FunctionComponent<IFocusTrapZoneProps> & {
    /**
     * Stack of active FocusTrapZone identifiers, exposed for testing purposes only.
     * (This is always set, just marked as optional to avoid a cast in the component definition.)
     * @internal
     */
    focusStack?: string[];
};

export { FocusZone }

export { FocusZoneDirection }

export { FocusZoneTabbableElements }

export { FontClassNames }

export { fontFace }

/**
 * Fast icon component which only supports font glyphs (not images) and can't be targeted by customizations.
 * To style the icon, use `className` or reference `ms-Icon` in CSS.
 * {@docCategory Icon}
 */
export declare const FontIcon: React_2.FunctionComponent<IFontIconProps>;

export { FontSizes }

export { FontWeights }

export { format }

export { formProperties }

export declare const getActivityItemClassNames: (styles: IActivityItemStyles, className: string, activityPersonas: Array<IPersonaProps>, isCompact: boolean) => IActivityItemClassNames;

export declare const getActivityItemStyles: (theme?: ITheme, customStyles?: IActivityItemStyles, animateBeaconSignal?: IActivityItemProps['animateBeaconSignal'], beaconColorOne?: IActivityItemProps['beaconColorOne'], beaconColorTwo?: IActivityItemProps['beaconColorTwo'], isCompact?: IActivityItemProps['isCompact']) => IActivityItemStyles;

export declare function getAllSelectedOptions(options: ISelectableOption[], selectedIndices: number[]): ISelectableOption[];

/**
 * Gets the aria-describedby value to put on the component with this keytip.
 *
 * @param keySequences - KeySequences of the keytip.
 * @returns The aria-describedby value to set on the component with this keytip.
 */
export declare function getAriaDescribedBy(keySequences: string[]): string;

export declare function getBackgroundShade(color: IColor, shade: Shade, isInverted?: boolean): IColor | null;

export declare function getBasePickerStyles(props: IBasePickerStyleProps): IBasePickerStyles;

export declare function getBoundsFromTargetWindow(target: Element | MouseEvent | Point | Rectangle | null, targetWindow: IWindowWithSegments): IRectangle;

export declare const getCellStyles: (props: {
    theme: ITheme;
    cellStyleProps?: ICellStyleProps | undefined;
}) => IStyle;

export { getChildren }

/**
 * Converts an HSV color (and optional alpha value) to a color object.
 * If `a` is not given, a default of 100 is used.
 * Hex in the returned value will *not* be prefixed with #.
 * If `a` is unspecified or 100, the result's `str` property will contain a hex value
 * (*not* prefixed with #)
 */
export declare function getColorFromHSV(hsv: IHSV, a?: number): IColor;

/** Converts an RGBA color to a color object (alpha defaults to 100). */
export declare function getColorFromRGBA(rgba: IRGB): IColor;

/**
 * Converts a CSS color string to a color object.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 *
 * `inputColor` will be used unmodified as the `str` property of the returned object.
 * Alpha defaults to 100 if not specified in `inputColor`.
 * Returns undefined if the color string is invalid/not recognized.
 */
export declare function getColorFromString(inputColor: string): IColor | undefined;

export declare const getCommandBarStyles: (props: ICommandBarStyleProps) => ICommandBarStyles;

export declare const getCommandButtonStyles: (customStyles: IButtonStyles | undefined) => IButtonStyles;

/**
 * @deprecated Will be removed in \>= 7.0.
 * This is a package-internal method that has been depended on.
 * It is being kept in this form for backwards compatibility.
 * @internal
 */
export declare const getContextualMenuItemClassNames: (theme: ITheme, disabled: boolean, expanded: boolean, checked: boolean, isAnchorLink: boolean, knownIcon: boolean, itemClassName?: string, dividerClassName?: string, iconClassName?: string, subMenuClassName?: string, primaryDisabled?: boolean, className?: string) => IContextualMenuItemStyles;

/**
 * Wrapper function for generating ContextualMenuItem classNames which adheres to
 * the getStyles API, but invokes memoized className generator function with
 * primitive values.
 *
 * @param props - the ContextualMenuItem style props used to generate its styles.
 */
export declare const getContextualMenuItemStyles: (props: IContextualMenuItemStyleProps) => IContextualMenuItemStyles;

export declare function getContrastRatio(color1: IColor, color2: IColor): number;

export { getDatePartHashValue }

export { getDateRangeArray }

export declare const getDetailsColumnStyles: (props: IDetailsColumnStyleProps) => IDetailsColumnStyles;

export declare const getDetailsHeaderStyles: (props: IDetailsHeaderStyleProps) => IDetailsHeaderStyles;

export declare const getDetailsListStyles: (props: IDetailsListStyleProps) => IDetailsListStyles;

export declare const getDetailsRowCheckStyles: (props: IDetailsRowCheckStyleProps) => IDetailsRowCheckStyles;

export declare const getDetailsRowStyles: (props: IDetailsRowStyleProps) => IDetailsRowStyles;

export { getDistanceBetweenPoints }

export { getDocument }

export { getEdgeChromiumNoHighContrastAdjustSelector }

export { getElementIndexPath }

export { getEndDateOfWeek }

export { getFadedOverflowStyle }

export { getFirstFocusable }

export { getFirstTabbable }

export { getFirstVisibleElementFromSelector }

export { getFocusableByIndexPath }

export { getFocusOutlineStyle }

export { getFocusStyle }

/**
 * Memoized helper for rendering a FontIcon.
 * @param iconName - The name of the icon to use from the icon font.
 * @param className - Class name for styling the icon.
 * @param ariaLabel - Label for the icon for the benefit of screen readers.
 * {@docCategory Icon}
 */
export declare const getFontIcon: (iconName: string, className?: string, ariaLabel?: string) => React_2.ReactElement<any, any> | null;

/**
 * Converts a color hue to an HTML color string (with # prefix).
 * This implementation ignores all components of `color` except hue.
 */
export declare function getFullColorString(color: IColor): string;

export { getGlobalClassNames }

/**
 * Takes an array of groups and returns a count of the groups and all descendant groups.
 * @param groups - The array of groups to count.
 */
export declare const GetGroupCount: (groups: IGroup[] | undefined) => number;

export { getHighContrastNoAdjustStyle }

export { getIcon }

export { getIconClassName }

export declare const getIconContent: (iconName?: string) => IIconContent | null;

export { getId }

export declare function getInitialResponsiveMode(): ResponsiveMode;

export { getInitials }

export { getInputFocusStyle }

export { getLanguage }

export { getLastFocusable }

export { getLastTabbable }

/**
 * Gets the number of layers currently registered with a host id.
 * @param hostId - Id of the layer host.
 * @returns The number of layers currently registered with the host.
 */
export declare function getLayerCount(hostId: string): number;

/**
 * Gets the Layer Host instance associated with a hostId, if applicable.
 * @param hostId - Id of the layer host
 * @returns A component ref for the associated layer host.
 */
export declare function getLayerHost(hostId: string): ILayerHost | undefined;

/**
 * Get the default target selector when determining a host
 */
export declare function getLayerHostSelector(): string | undefined;

export declare const getLayerStyles: (props: ILayerStyleProps) => ILayerStyles;

/**
 * Gets the maximum height that a rectangle can have in order to fit below or above a target.
 * If the directional hint specifies a left or right edge (i.e. leftCenter) it will limit the height to the topBorder
 * of the target given.
 * If no bounds are provided then the window is treated as the bounds.
 */
export declare function getMaxHeight(target: Element | MouseEvent | Point | Rectangle, targetEdge: DirectionalHint, gapSpace?: number, bounds?: IRectangle, coverTarget?: boolean): number;

/**
 * Returns a simple object is able to store measurements with a given key.
 */
export declare const getMeasurementCache: () => {
    /**
     * Checks if the provided data has a cacheKey. If it has a cacheKey and there is a
     * corresponding entry in the measurementsCache, then it will return that value.
     * Returns undefined otherwise.
     */
    getCachedMeasurement: (data: any) => number | undefined;
    /**
     * Should be called whenever there is a new measurement associated with a given data object.
     * If the data has a cacheKey, store that measurement in the measurementsCache.
     */
    addMeasurementToCache: (data: any, measurement: number) => void;
};

export declare const getMenuItemStyles: (theme: ITheme) => IMenuItemStyles;

export { getMonthEnd }

export { getMonthStart }

export { getNativeElementProps }

export { getNativeProps }

export { getNextElement }

/**
 * Returns a function that is able to compute the next state for the ResizeGroup given the current
 * state and any measurement updates.
 */
export declare const getNextResizeGroupStateProvider: (measurementCache?: {
    /**
     * Checks if the provided data has a cacheKey. If it has a cacheKey and there is a
     * corresponding entry in the measurementsCache, then it will return that value.
     * Returns undefined otherwise.
     */
    getCachedMeasurement: (data: any) => number | undefined;
    /**
     * Should be called whenever there is a new measurement associated with a given data object.
     * If the data has a cacheKey, store that measurement in the measurementsCache.
     */
    addMeasurementToCache: (data: any, measurement: number) => void;
}) => {
    getNextState: (props: IResizeGroupProps, currentState: IResizeGroupState, getElementToMeasureDimension: () => number, newContainerDimension?: number) => IResizeGroupState | undefined;
    shouldRenderDataForMeasurement: (dataToMeasure: any | undefined) => boolean;
    getInitialResizeGroupState: (data: any) => IResizeGroupState;
};

/**
 * Returns the opposite edge of the given RectangleEdge.
 */
export declare function getOppositeEdge(edge: RectangleEdge): RectangleEdge;

export { getParent }

export declare function getPeoplePickerItemStyles(props: IPeoplePickerItemSelectedStyleProps): IPeoplePickerItemSelectedStyles;

export declare function getPeoplePickerItemSuggestionStyles(props: IPeoplePickerItemSuggestionStyleProps): IPeoplePickerItemSuggestionStyles;

/**
 * Gets the hex color string (prefixed with #) for the given persona props.
 * This is the logic used internally by the Persona control.
 * @param props - Current persona props
 * @returns Hex color string prefixed with #
 */
export declare function getPersonaInitialsColor(props: Pick<IPersonaProps, 'primaryText' | 'text' | 'initialsColor'>): string;

export { getPlaceholderStyles }

export { getPreviousElement }

export { getPropsWithDefaults }

export { getRect }

export { getResourceUrl }

/**
 * Hook to get the current responsive mode (window size category).
 * @param currentWindow - Use this window when determining the responsive mode.
 */
export declare function getResponsiveMode(currentWindow: Window | undefined): ResponsiveMode;

export { getRTL }

export { getRTLSafeKeyCode }

export { getScreenSelector }

export { getScrollbarWidth }

/**
 * Given a color and a shade specification, generates the requested shade of the color.
 * Logic:
 * if white
 *  darken via tables defined above
 * if black
 *  lighten
 * if light
 *  strongen
 * if dark
 *  soften
 * else default
 *  soften or strongen depending on shade#
 * @param color - The base color whose shade is to be computed
 * @param shade - The shade of the base color to compute
 * @param isInverted - Default false. Whether the given theme is inverted (reverse strongen/soften logic)
 */
export declare function getShade(color: IColor, shade: Shade, isInverted?: boolean): IColor | null;

export declare const getShimmeredDetailsListStyles: (props: IShimmeredDetailsListStyleProps) => IShimmeredDetailsListStyles;

export declare const getSplitButtonClassNames: (styles: IButtonStyles, disabled: boolean, expanded: boolean, checked: boolean, primaryDisabled?: boolean) => ISplitButtonClassNames;

export { getStartDateOfWeek }

export declare function getSubmenuItems(item: IContextualMenuItem, options?: {
    target?: Target;
}): IContextualMenuItem[] | undefined;

export declare function getSuggestionsItemStyles(props: ISuggestionsItemStyleProps): ISuggestionsItemStyles;

export declare function getSuggestionsStyles(props: ISuggestionsStyleProps): ISuggestionsStyles;

export declare function getTagItemStyles(props: ITagItemStyleProps): ITagItemStyles;

export declare function getTagItemSuggestionStyles(props: ITagItemSuggestionStyleProps): ITagItemSuggestionStyles;

export declare function getTextFieldStyles(props: ITextFieldStyleProps): ITextFieldStyles;

export { getTheme }

export { getThemedContext }

export { getVirtualParent }

export { getWeekNumber }

export { getWeekNumbersInMonth }

export { getWindow }

export { getYearEnd }

export { getYearStart }

export { GlobalClassNames }

export { GlobalSettings }

export declare const GroupedList: React_2.FunctionComponent<IGroupedListProps>;

export declare class GroupedListBase extends React_2.Component<IGroupedListProps, IGroupedListState> implements IGroupedList {
    static defaultProps: {
        selectionMode: SelectionMode_2;
        isHeaderVisible: boolean;
        groupProps: {};
        compact: boolean;
    };
    private _classNames;
    private _list;
    private _isSomeGroupExpanded;
    static getDerivedStateFromProps(nextProps: IGroupedListProps, previousState: IGroupedListState): IGroupedListState;
    constructor(props: IGroupedListProps);
    scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
    getStartItemIndexInView(): number;
    componentDidMount(): void;
    render(): JSX.Element;
    forceUpdate(): void;
    toggleCollapseAll(allCollapsed: boolean): void;
    private _setGroupsCollapsedState;
    private _renderGroup;
    private _returnOne;
    private _getDefaultGroupItemLimit;
    private _getGroupItemLimit;
    private _getGroupHeight;
    private _getPageHeight;
    private _getGroupKey;
    private _getGroupNestingDepth;
    private _onToggleCollapse;
    private _onToggleSelectGroup;
    private _isInnerZoneKeystroke;
    private _forceListUpdates;
    private _onToggleSummarize;
    private _getPageSpecification;
    private _computeIsSomeGroupExpanded;
    private _updateIsSomeGroupExpanded;
}

export declare class GroupedListSection extends React_2.Component<IGroupedListSectionProps, IGroupedListSectionState> {
    private _root;
    private _list;
    private _subGroupRefs;
    private _id;
    private _events;
    private _dragDropSubscription?;
    private _droppingClassName;
    constructor(props: IGroupedListSectionProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(previousProps: IGroupedListSectionProps): void;
    render(): JSX.Element;
    forceUpdate(): void;
    forceListUpdate(): void;
    private _onRenderGroupHeader;
    private _onRenderGroupShowAll;
    private _onRenderGroupFooter;
    private _onSelectionChange;
    private _onRenderGroupCell;
    private _onRenderGroup;
    private _renderSubGroup;
    private _returnOne;
    private _getGroupKey;
    /**
     * collect all the data we need to enable drag/drop for a group
     */
    private _getGroupDragDropOptions;
    /**
     * update groupIsDropping state based on the input value, which is used to change style during drag and drop
     *
     * @param newValue - new isDropping state value
     * @param event - the event trigger dropping state change which can be dragenter, dragleave etc
     */
    private _updateDroppingState;
    /**
     * get the correct css class to reflect the dropping state for a given group
     *
     * If the group is the current drop target, return the default dropping class name
     * Otherwise, return '';
     *
     */
    private _getDroppingClassName;
}

/**
 * NOTE: GroupedListV2 is "unstable" and meant for preview use. It passes
 * the same test suite as GroupedList but it is an entirely new implementation
 * so it may have bugs and implementation details may change without notice.
 *
 * GroupedListV2 is an API-compatible replacement for GroupedList with a new implementation
 * that addresses issues GroupedList has with virtualizing nested lists under certain
 * conditions.
 */
export declare const GroupedListV2_unstable: React_2.FunctionComponent<IGroupedListV2Props>;

export declare const GroupFooter: React_2.FunctionComponent<IGroupFooterProps>;

export declare const GroupHeader: React_2.FunctionComponent<IGroupHeaderProps>;

export declare const GroupShowAll: React_2.FunctionComponent<IGroupShowAllProps>;

export declare const GroupSpacer: React_2.FunctionComponent<IGroupSpacerProps>;

export { hasHorizontalOverflow }

export { hasOverflow }

export { hasVerticalOverflow }

export declare const HEADER_HEIGHT = 42;

/** Regular expression matching only valid hexadecimal chars */
export declare const HEX_REGEX: RegExp;

export { hiddenContentStyle }

export { HighContrastSelector }

export { HighContrastSelectorBlack }

export { HighContrastSelectorWhite }

export { hoistMethods }

export { hoistStatics }

export declare const HoverCard: React_2.FunctionComponent<IHoverCardProps>;

export declare class HoverCardBase extends React_2.Component<IHoverCardProps, IHoverCardState> implements IHoverCard {
    static defaultProps: {
        cardOpenDelay: number;
        cardDismissDelay: number;
        expandedCardOpenDelay: number;
        instantOpenOnClick: boolean;
        setInitialFocus: boolean;
        openHotKey: number;
        type: HoverCardType;
    };
    private _hoverCard;
    private _dismissTimerId;
    private _openTimerId;
    private _currentMouseTarget;
    private _nativeDismissEvent;
    private _childDismissEvent;
    private _classNames;
    private _async;
    private _events;
    constructor(props: IHoverCardProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: IHoverCardProps, prevState: IHoverCardState): void;
    dismiss: (withTimeOut?: boolean) => void;
    render(): JSX.Element;
    private _getTargetElement;
    private _shouldBlockHoverCard;
    private _cardOpen;
    private _executeCardOpen;
    /**
     * Hide HoverCard
     * How we dismiss the card depends on where the callback is coming from.
     * This is provided by the `isNativeEvent` argument.
     *  true: Event is coming from event listeners set up in componentDidMount.
     *  false: Event is coming from the `onLeave` prop from the HoverCard component.
     */
    private _cardDismiss;
    private _setDismissedState;
    private _instantOpenAsExpanded;
    private _setEventListeners;
}

/**
 * {@docCategory HoverCard}
 */
export declare enum HoverCardType {
    /**
     * Plain card consisting of one part responsive to the size of content.
     */
    plain = "PlainCard",
    /**
     * File card consisting of two parts: compact and expanded. Has some default sizes if not specified.
     */
    expanding = "ExpandingCard"
}

/** Converts HSL components to an HSV color. */
export declare function hsl2hsv(h: number, s: number, l: number): IHSV;

/** Converts HSL components to an RGB color. Does not set the alpha value. */
export declare function hsl2rgb(h: number, s: number, l: number): IRGB;

/** Converts HSV components to a hex color string (without # prefix). */
export declare function hsv2hex(h: number, s: number, v: number): string;

/** Converts HSV components to an HSL color. */
export declare function hsv2hsl(h: number, s: number, v: number): IHSL;

/** Converts HSV components to an RGB color. Does not set the alpha value. */
export declare function hsv2rgb(h: number, s: number, v: number): IRGB;

export { htmlElementProperties }

/**
 * {@docCategory IAccessiblePopupProps}
 */
export declare interface IAccessiblePopupProps {
    /**
     * Sets the element to focus on when exiting the control's FocusTrapZone.
     * @defaultvalue The `element.target` that triggered the control opening.
     */
    elementToFocusOnDismiss?: HTMLElement;
    /**
     * If false (the default), the control's FocusTrapZone will restore focus to the element which activated it
     * once the trap zone is unmounted or disabled. Set to true to disable this behavior.
     * @defaultvalue false
     */
    disableRestoreFocus?: boolean;
    /**
     * @deprecated Use `disableRestoreFocus` (it has the same behavior and a clearer name).
     */
    ignoreExternalFocusing?: boolean;
    /**
     * Whether control should force focus inside its focus trap zone.
     * @defaultvalue true
     */
    forceFocusInsideTrap?: boolean;
    /**
     * Class name (not actual selector) for first focusable item. Do not append a dot.
     */
    firstFocusableSelector?: string | (() => string);
    /**
     * Aria label on close button.
     */
    closeButtonAriaLabel?: string;
    /**
     * Whether this control will allow clicks outside its FocusTrapZone.
     * @defaultvalue false
     */
    isClickableOutsideFocusTrap?: boolean;
}

export declare interface IActivityItemClassNames {
    root?: string;
    activityContent?: string;
    activityText?: string;
    personaContainer?: string;
    activityPersona?: string;
    activityTypeIcon?: string;
    commentText?: string;
    timeStamp?: string;
    pulsingBeacon?: string;
}

/**
 * {@docCategory ActivityItem}
 */
export declare interface IActivityItemProps extends React_2.AllHTMLAttributes<HTMLElement> {
    /**
     * An element describing the activity that took place. If no `activityDescription`, `activityDescriptionText`, or
     * `onRenderActivityDescription` are included, no description of the activity is shown.
     */
    activityDescription?: React_2.ReactNode[] | React_2.ReactNode;
    /**
     * Text describing the activity that occurred and naming the people involved in it.
     * @deprecated Use `activityDescription` instead.
     */
    activityDescriptionText?: string;
    /**
     * An element containing an icon shown next to the activity item.
     */
    activityIcon?: React_2.ReactNode;
    /**
     * If `activityIcon` is not set, the personas in this array will be used as the icon for the this activity item.
     */
    activityPersonas?: IPersonaSharedProps[];
    /**
     * An element containing the text of comments or \@mention messages.
     * If no `comments`, `commentText`, or `onRenderComments` are included, no comments are shown.
     */
    comments?: React_2.ReactNode[] | React_2.ReactNode;
    /**
     * Text of comments or \@mention messages.
     * @deprecated Use `comments` instead.
     */
    commentText?: string;
    /**
     * Indicated if the compact styling should be used.
     */
    isCompact?: boolean;
    /**
     * A renderer for the description of the current activity.
     */
    onRenderActivityDescription?: IRenderFunction<IActivityItemProps>;
    /**
     * A renderer that adds the text of a comment below the activity description.
     */
    onRenderComments?: IRenderFunction<IActivityItemProps>;
    /**
     * A renderer to create the icon next to the activity item.
     */
    onRenderIcon?: IRenderFunction<IActivityItemProps>;
    /**
     * Custom renderer for a time stamp. If not included, `timeStamp` is shown as plain text below the activity.
     */
    onRenderTimeStamp?: IRenderFunction<IActivityItemProps>;
    /**
     * Optional styling for the elements within the activity item.
     */
    styles?: IActivityItemStyles;
    /**
     * Element shown as a timestamp on this activity. If not included, no timestamp is shown.
     */
    timeStamp?: string | React_2.ReactNode[] | React_2.ReactNode;
    /**
     * Beacon color one
     */
    beaconColorOne?: string;
    /**
     * Beacon color two
     */
    beaconColorTwo?: string;
    /**
     * Enables/disables the beacon that radiates from the center of the center of the activity icon.
     * Signals an activity has started.
     * @defaultvalue false
     */
    animateBeaconSignal?: boolean;
}

/**
 * {@docCategory ActivityItem}
 */
export declare interface IActivityItemStyles {
    /**
     * Styles applied to the root activity item container.
     */
    root?: IStyle;
    /**
     * Styles applied to the root activity item container.
     */
    pulsingBeacon?: IStyle;
    /**
     * Styles applied to the main container of the activity's description.
     */
    activityContent?: IStyle;
    /**
     * Styles applied to the persona of the user that did this activity.
     */
    activityPersona?: IStyle;
    /**
     * Styles applied to the activity's description.
     */
    activityText?: IStyle;
    /**
     * Styles applied to the icon indicating the type of the activity. Only shown when personas are unavailable.
     */
    activityTypeIcon?: IStyle;
    /**
     * Styles applied to the text of comments.
     */
    commentText?: IStyle;
    /**
     * Styles applied to personas when two users are involved in a single activity.
     */
    doublePersona?: IStyle;
    /**
     * Styles applied to root in the compact variant.
     */
    isCompactRoot?: IStyle;
    /**
     * Styles applied to personas and icons in the compact variant.
     */
    isCompactIcon?: IStyle;
    /**
     * Styles applied to main text container in the compact variant.
     */
    isCompactContent?: IStyle;
    /**
     * Styles applied to personas in the compact variant.
     */
    isCompactPersona?: IStyle;
    /**
     * Styles applied to a wrapper around personas in the compact variant.
     */
    isCompactPersonaContainer?: IStyle;
    /**
     * Styles applied to the container of the persona image or activity type icon.
     */
    personaContainer?: IStyle;
    /**
     * Styles applied to the timestamp at the end of each activity item.
     */
    timeStamp?: IStyle;
    /**
     * Styles applied to the timestamp in compact mode.
     * This can occur if a host overrides the render behavior to force the timestamp to render.
     */
    isCompactTimeStamp?: IStyle;
}

export { IAnimationStyles }

export { IAnimationVariables }

/**
 * {@docCategory Announced}
 */
export declare interface IAnnouncedProps extends IReactProps<AnnouncedBase>, React_2.HTMLAttributes<HTMLDivElement> {
    /**
     * The status message the screen reader should announce.
     */
    message?: string;
    /**
     * Priority with which the screen reader should treat updates to this region.
     * @default 'polite'
     */
    'aria-live'?: 'off' | 'polite' | 'assertive';
    /**
     * Optionally render the root of this component as another component type or primitive.
     * The custom type **must** preserve any children or native props passed in.
     * @default 'div'
     */
    as?: React_2.ElementType;
    /** Call to provide customized styling that will layer on top of the variant rules. */
    styles?: IStyleFunctionOrObject<{}, IAnnouncedStyles>;
}

/**
 * {@docCategory Announced}
 */
export declare type IAnnouncedStyleProps = Pick<IAnnouncedProps, 'className'>;

/**
 * {@docCategory Announced}
 */
export declare interface IAnnouncedStyles {
    /**
     * Style override for the root element.
     */
    root: IStyle;
    /**
     * Style override for the screen reader text.
     */
    screenReaderText: IStyle;
}

export { IAsAsyncOptions }

/**
 * {@docCategory Autofill}
 */
export declare interface IAutofill {
    /**
     * The current index of the cursor in the input area. Returns -1 if the input element
     * is not ready.
     */
    cursorLocation: number | null;
    /**
     * Whether there is a value selected in the input area.
     */
    isValueSelected: boolean;
    /**
     * The current text value that the user has entered.
     */
    value: string;
    /**
     * The current index of where the selection starts. Returns -1 if the input element
     * is not ready.
     */
    selectionStart: number | null;
    /**
     * The current index of where the selection ends. Returns -1 if the input element
     * is not ready.
     */
    selectionEnd: number | null;
    /**
     * The current input element.
     */
    inputElement: HTMLInputElement | null;
    /**
     * Focus the input element.
     */
    focus(): void;
    /**
     * Clear all text in the input. Sets value to `''`.
     */
    clear(): void;
}

/**
 * {@docCategory Autofill}
 */
export declare interface IAutofillProps extends React_2.InputHTMLAttributes<HTMLInputElement | Autofill> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IAutofill>;
    /**
     * The suggested autofill value that will display.
     */
    suggestedDisplayValue?: string;
    /**
     * A callback for when the current input value changes. Called after
     * the state has been changed.
     *
     * @param composing - true if the change event was triggered while the
     * inner input was in the middle of a multi-character composition.
     * (for example, jp-hiragana IME input)
     */
    onInputValueChange?: (newValue?: string, composing?: boolean) => void;
    /**
     * When the user uses left arrow, right arrow, clicks, or deletes text, autofill is disabled
     * since the user has taken control. It is automatically re-enabled when the user enters text and the
     * cursor is at the end of the text in the input box. This prop can be used to override the
     * default list of key presses that will re-enable autofill.
     * @defaultvalue [KeyCodes.down, KeyCodes.up]
     */
    enableAutofillOnKeyPress?: KeyCodes[];
    /**
     * The default value to be visible. This is different from placeholder
     * because it actually sets the current value of the picker.
     * Note: Updates to this prop will not be respected.
     */
    defaultVisibleValue?: string;
    /**
     * Handler for checking and updating the value if needed in `componentWillReceiveProps`.
     * Returns the updated value to set, if needed.
     *
     * @deprecated use standard input `value` prop instead if the autofill should act like a controlled component
     */
    updateValueInWillReceiveProps?: () => string | null;
    /**
     * Handler for checking if the full value of the input should be selected in `componentDidUpdate`.
     * Returns whether the full value of the input should be selected.
     */
    shouldSelectFullInputValueInComponentDidUpdate?: () => boolean;
    /**
     * A callback used to modify the input string. Will entirely override the default behavior if provided.
     * If you just want to be notified of changes, use `onInputValueChange` instead.
     * Called before the state has been updated.
     *
     * @param composing - true if the change event was triggered while the
     * inner input was in the middle of a multi-character composition.
     * (for example, jp-hiragana IME input)
     * @deprecated To control the value, pass in `value` like in any other controlled component.
     * To be notified of changes, use `onInputValueChange`.
     */
    onInputChange?: (value: string, composing: boolean) => string | void;
    /**
     * Should the value of the input be selected? True if we're focused on our input, false otherwise.
     * We need to explicitly not select the text in the autofill if we are no longer focused.
     * In IE11, selecting an input will also focus the input, causing other element's focus to be stolen.
     */
    preventValueSelection?: boolean;
}

export declare interface IAutofillState {
    inputValue: string;
    isComposing: boolean;
}

/**
 * {@docCategory Button}
 */
export declare interface IBaseButtonProps extends IButtonProps {
    baseClassName?: string;
    variantClassName?: string;
}

/**
 * {@docCategory Button}
 */
export declare interface IBaseButtonState {
    menuHidden: boolean;
}

/**
 * Interface containing props common for all types of cards.
 */
declare interface IBaseCardProps<TComponent, TStyles, TStyleProps> extends React_2.HTMLAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the TComponent interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<TComponent>;
    /**
     * Additional CSS class(es) to apply to the Card content wrapper div.
     */
    className?: string;
    /**
     * How the element should be positioned
     * @defaultvalue DirectionalHint.bottomLeftEdge
     */
    directionalHint?: DirectionalHint;
    /**
     * Make callout content show on the set side
     * @defaultvalue true
     */
    directionalHintFixed?: boolean;
    /**
     * Focus on first element by default on card or not
     */
    firstFocus?: boolean;
    /**
     * The gap between the card and the target
     * @defaultvalue 0
     */
    gapSpace?: number;
    /**
     * Callback upon focus or mouse enter event
     */
    onEnter?: (ev?: any) => void;
    /**
     * Callback upon blur or mouse leave event
     */
    onLeave?: (ev?: any) => void;
    /**
     *  Item to be returned with onRender functions
     */
    renderData?: any;
    /**
     * Custom styles for this component
     */
    styles?: IStyleFunctionOrObject<TStyleProps, {
        [P in keyof TStyles]: IStyle;
    }>;
    /**
     * Element to anchor the card to.
     */
    targetElement?: HTMLElement;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Trap focus or not
     */
    trapFocus?: boolean;
    /**
     * Custom overriding props to Callout
     */
    calloutProps?: ICalloutProps;
}

/**
 * Interface containing styleProps common for all types of cards.
 */
declare interface IBaseCardStyleProps {
    /**
     * ClassName to inject into wrapper div of the content.
     */
    className?: string;
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
}

/**
 * Interface containing style sections common for all types of cards.
 */
declare interface IBaseCardStyles {
    /**
     * Style for the root element in the default enabled, non-toggled state.
     */
    root?: IStyle;
}

export declare interface IBaseExtendedPicker<T> {
    /** Forces the picker to resolve */
    forceResolve?: () => void;
    /** Gets the current value of the input. */
    items: T[] | undefined;
    /** Sets focus to the input. */
    focus: () => void;
}

export declare interface IBaseExtendedPickerProps<T> {
    /**
     * Ref of the component
     */
    componentRef?: IRefObject<IBaseExtendedPicker<T>>;
    /**
     * Header/title element for the picker
     */
    headerComponent?: JSX.Element;
    /**
     * Initial items that have already been selected and should appear in the people picker.
     */
    defaultSelectedItems?: T[];
    /**
     * A callback for when the selected list of items changes.
     */
    onChange?: (items?: T[]) => void;
    /**
     * A callback for when text is pasted into the input
     */
    onPaste?: (pastedText: string) => T[];
    /**
     * A callback for when the user put focus on the picker
     */
    onFocus?: React_2.FocusEventHandler<HTMLInputElement | Autofill>;
    /**
     * A callback for when the user moves the focus away from the picker
     */
    onBlur?: React_2.FocusEventHandler<HTMLInputElement | Autofill>;
    /**
     * ClassName for the picker.
     */
    className?: string;
    /**
     * Function that specifies how the floating picker will appear.
     */
    onRenderFloatingPicker: React_2.ComponentType<IBaseFloatingPickerProps<T>>;
    /**
     * Function that specifies how the floating picker will appear.
     */
    onRenderSelectedItems: React_2.ComponentType<IBaseSelectedItemsListProps<T>>;
    /**
     * Floating picker properties
     */
    floatingPickerProps: IBaseFloatingPickerProps<T>;
    /**
     * Selected items list properties
     */
    selectedItemsListProps: IBaseSelectedItemsListProps<T>;
    /**
     * Autofill input native props
     * @defaultvalue undefined
     */
    inputProps?: IInputProps;
    /**
     * Flag for disabling the picker.
     * @defaultvalue false
     */
    disabled?: boolean;
    /**
     * Restrict the amount of selectable items.
     * @defaultvalue undefined
     */
    itemLimit?: number;
    /**
     * A callback to process a selection after the user selects a suggestion from the picker.
     * The returned item will be added to the selected items list
     */
    onItemSelected?: (selectedItem?: T) => T | PromiseLike<T>;
    /**
     * A callback on when an item was added to the selected item list
     */
    onItemAdded?: (addedItem: T) => void;
    /**
     * A callback on when an item or items were removed from the selected item list
     */
    onItemsRemoved?: (removedItems: T[]) => void;
    /**
     * If using as a controlled component use selectedItems here instead of the SelectedItemsList
     */
    selectedItems?: T[];
    /**
     * If using as a controlled component use suggestionItems here instead of FloatingPicker
     */
    suggestionItems?: T[];
    /**
     * Focus zone props
     */
    focusZoneProps?: IFocusZoneProps;
    /**
     * Current rendered query string that correlates to the rendered result
     **/
    currentRenderedQueryString?: string;
}

export declare interface IBaseExtendedPickerState<T> {
    queryString: string | null;
}

export declare interface IBaseFloatingPicker {
    /** Whether the suggestions are shown */
    isSuggestionsShown: boolean;
    /** On queryString changed */
    onQueryStringChanged: (input: string) => void;
    /** Hides the picker */
    hidePicker: () => void;
    /** Shows the picker
     * @param updateValue - Optional param to indicate whether to update the query string
     */
    showPicker: (updateValue?: boolean) => void;
    /** Gets the suggestions */
    suggestions: any[];
    /** Gets the input text */
    inputText: string;
}

export declare interface IBaseFloatingPickerProps<T> extends React_2.ClassAttributes<any> {
    componentRef?: IRefObject<IBaseFloatingPicker>;
    /**
     * The suggestions store
     */
    suggestionsStore: SuggestionsStore<T>;
    /**
     * The suggestions to show on zero query, return null if using as a controlled component
     */
    onZeroQuerySuggestion?: (selectedItems?: T[]) => T[] | PromiseLike<T[]> | null;
    /**
     * The input element to listen on events
     */
    inputElement?: HTMLInputElement | null;
    /**
     * Function that specifies how an individual suggestion item will appear.
     */
    onRenderSuggestionsItem?: (props: T, itemProps: ISuggestionItemProps<T>) => JSX.Element;
    /**
     * A callback for what should happen when a person types text into the input.
     * Returns the already selected items so the resolver can filter them out.
     * If used in conjunction with resolveDelay this will only kick off after the delay throttle.
     * Return null if using as a controlled component
     */
    onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]> | null;
    /**
     * A callback for when the input has been changed
     */
    onInputChanged?: (filter: string) => void;
    /**
     * The delay time in ms before resolving suggestions, which is kicked off when input has been changed.
     * e.g. If a second input change happens within the resolveDelay time, the timer will start over.
     * Only until after the timer completes will onResolveSuggestions be called.
     */
    resolveDelay?: number;
    /**
     * A callback for when a suggestion is clicked
     */
    onChange?: (item: T) => void;
    /**
     * ClassName for the picker.
     */
    className?: string;
    /**
     * The properties that will get passed to the Suggestions component.
     */
    pickerSuggestionsProps?: IBaseFloatingPickerSuggestionProps;
    /**
     * The properties that will get passed to the Callout component.
     */
    pickerCalloutProps?: ICalloutProps;
    /**
     * A callback for when an item is removed from the suggestion list
     */
    onRemoveSuggestion?: (item: T) => void;
    /**
     * A function used to validate if raw text entered into the well can be added
     */
    onValidateInput?: (input: string) => boolean;
    /**
     * The text to display while searching for more results in a limited suggestions list
     */
    searchingText?: ((props: {
        input: string;
    }) => string) | string;
    /**
     * Function that specifies how arbitrary text entered into the well is handled.
     */
    createGenericItem?: (input: string, isValid: boolean) => ISuggestionModel<T>;
    /**
     * The callback that should be called to see if the force resolve command should be shown
     */
    showForceResolve?: () => boolean;
    /**
     * The items that the base picker should currently display as selected.
     * If this is provided then the picker will act as a controlled component.
     */
    selectedItems?: T[];
    /**
     * A callback to get text from an item. Used to autofill text in the pickers.
     */
    getTextFromItem?: (item: T, currentValue?: string) => string;
    /**
     * Width for the suggestions callout
     */
    calloutWidth?: number;
    /**
     * The callback that should be called when the suggestions are shown
     */
    onSuggestionsShown?: () => void;
    /**
     * The callback that should be called when the suggestions are hidden
     */
    onSuggestionsHidden?: () => void;
    /**
     * If using as a controlled component, the items to show in the suggestion list
     */
    suggestionItems?: T[];
}

export declare interface IBaseFloatingPickerState {
    queryString: string;
    suggestionsVisible?: boolean;
    didBind: boolean;
}

/**
 * Props which are passed on to the inner Suggestions component
 */
export declare type IBaseFloatingPickerSuggestionProps = Pick<ISuggestionsControlProps<any>, 'shouldSelectFirstItem' | 'headerItemsProps' | 'footerItemsProps' | 'showRemoveButtons'>;

/**
 * BasePicker component.
 * {@docCategory Pickers}
 */
export declare interface IBasePicker<T> {
    /** Gets the current value of the input. */
    items: T[] | undefined;
    /** Sets focus to the focus zone. */
    focus: () => void;
    /** Set focus to the input */
    focusInput: () => void;
    /**
     * When called, will take the currently selected suggestion and complete it.
     * If called with forceComplete true, it will attempt to force the current suggestion
     * to complete, must provide both createGenericSuggestion, so the text can be turned into
     * an object in the right shape, and onValidateInput, so the object knows if it's correct or not.
     */
    completeSuggestion: (forceComplete?: boolean) => void;
}

/**
 * Type T is the type of the item that is displayed
 * and searched for by the picker. For example, if the picker is
 * displaying persona's then type T could either be of Persona or IPersona props
 * {@docCategory Pickers}
 */
export declare interface IBasePickerProps<T> extends IReactProps<any> {
    /**
     * Optional callback to access the IBasePicker interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IBasePicker<T>>;
    /**
     * Function that specifies how the selected item will appear.
     */
    onRenderItem?: (props: IPickerItemProps<T>) => JSX.Element;
    /**
     * Function that specifies how an individual suggestion item will appear.
     */
    onRenderSuggestionsItem?: (props: T, itemProps: ISuggestionItemProps<T>) => JSX.Element;
    /**
     * A callback for what should happen when a person types text into the input.
     * Returns the already selected items so the resolver can filter them out.
     * If used in conjunction with resolveDelay this will only kick off after the delay throttle.
     */
    onResolveSuggestions: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
    /**
     * The delay time in ms before resolving suggestions, which is kicked off when input has been changed.
     * e.g. If a second input change happens within the resolveDelay time, the timer will start over.
     * Only until after the timer completes will onResolveSuggestions be called.
     */
    resolveDelay?: number;
    /**
     * A callback for what should happen when a user clicks within the input area.
     * @deprecated Please use `onEmptyResolveSuggestions` instead, as the suggestions aren't about
     * setting focus as they are about resolving suggestions when there is no input.
     */
    onEmptyInputFocus?: (selectedItems?: T[]) => T[] | PromiseLike<T[]>;
    /**
     * A callback for what should happen when suggestions are shown without
     * input provided.
     * Returns the already selected items so the resolver can filter them out.
     * If used in conjunction with resolveDelay this will only kick off after the delay throttle.
     */
    onEmptyResolveSuggestions?: (selectedItems?: T[]) => T[] | PromiseLike<T[]>;
    /**
     * Initial items that have already been selected and should appear in the people picker.
     */
    defaultSelectedItems?: T[];
    /**
     * A callback for when the selected list of items changes.
     */
    onChange?: (items?: T[]) => void;
    /**
     * A callback for when the user put focus on the picker
     * @deprecated Use `inputProps.onFocus` instead
     */
    onFocus?: React_2.FocusEventHandler<HTMLInputElement | Autofill>;
    /**
     * A callback for when the user moves the focus away from the picker
     */
    onBlur?: React_2.FocusEventHandler<HTMLInputElement | Autofill>;
    /**
     * A callback to get text from an item. Used to autofill text in the pickers.
     */
    getTextFromItem?: (item: T, currentValue?: string) => string;
    /**
     * A callback that gets the rest of the results when a user clicks get more results.
     */
    onGetMoreResults?: (filter: string, selectedItems?: T[]) => T[] | PromiseLike<T[]>;
    /**
     * ClassName for the picker.
     */
    className?: string;
    /**
     * The properties that will get passed to the Suggestions component.
     */
    pickerSuggestionsProps?: IBasePickerSuggestionsProps;
    /**
     * The properties that will get passed to the Callout component.
     */
    pickerCalloutProps?: ICalloutProps;
    /**
     * AutoFill input native props
     * @defaultvalue undefined
     */
    inputProps?: IInputProps;
    /**
     * A callback for when an item is removed from the suggestion list
     */
    onRemoveSuggestion?: (item: T) => void;
    /**
     * A function used to validate if raw text entered into the well can be added into the selected items list
     */
    onValidateInput?: (input: string) => ValidationState;
    /**
     * The text to display while searching for more results in a limited suggestions list
     */
    searchingText?: ((props: {
        input: string;
    }) => string) | string;
    /**
     * Flag for disabling the picker.
     * @defaultvalue false
     */
    disabled?: boolean;
    /**
     * Restrict the amount of selectable items.
     * @defaultvalue undefined
     */
    itemLimit?: number;
    /**
     * Function that specifies how arbitrary text entered into the well is handled.
     */
    createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T> | T;
    /**
     * Aria label for the "X" button in the selected item component.
     * @defaultvalue ''
     */
    removeButtonAriaLabel?: string;
    /**
     * The text that will be announced when a suggestion is removed. A default value is only provided for English.
     * @default 'removed \{0\}'
     */
    suggestionRemovedText?: string;
    /**
     * Optional aria-label that will be placed on the element that has the role "combobox"
     * attached. Additionally aria-labelled by will get added to the supporting input element contained
     * with in the combobox container
     */
    ['aria-label']?: string;
    /**
     * A callback to process a selection after the user selects something from the picker. If the callback returns null,
     * the item will not be added to the picker.
     */
    onItemSelected?: (selectedItem?: T) => T | PromiseLike<T> | null;
    /**
     * The items that the base picker should currently display as selected.
     * If this is provided then the picker will act as a controlled component.
     */
    selectedItems?: T[];
    /**
     * Aria label for the displayed selection. A good value would be something like "Selected Contacts".
     * @defaultvalue ''
     */
    selectionAriaLabel?: string;
    /**
     * Override the role used for the element containing selected items.
     * Update this if onRenderItem does not return elements with role="listitem".
     * A good alternative would be 'group'.
     * @defaultvalue 'list'
     */
    selectionRole?: string;
    /**
     * A callback used to modify the input string.
     */
    onInputChange?: (input: string) => string;
    /**
     * A callback to override the default behavior of adding the selected suggestion on dismiss. If it returns true or
     * nothing, the selected item will be added on dismiss. If false, the selected item will not be added on dismiss.
     *
     */
    onDismiss?: (ev?: any, selectedItem?: T) => boolean | void;
    /**
     * Adds an additional alert for the currently selected suggestion. This prop should be set to true for IE11 and below,
     * as it enables proper screen reader behavior for each suggestion (since aria-activedescendant does not work
     * with IE11). It should not be set for modern browsers (Edge, Chrome).
     * @defaultvalue false
     */
    enableSelectedSuggestionAlert?: boolean;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles>;
    /**
     * Theme provided by styled() function.
     */
    theme?: ITheme;
    /**
     *  Props for the icon used in the item's remove button.
     *  @defaultvalue `{ iconName:'Cancel' }`
     */
    removeButtonIconProps?: IIconProps;
}

export declare interface IBasePickerState<T> {
    items?: any;
    suggestedDisplayValue?: string;
    moreSuggestionsAvailable?: boolean;
    isFocused?: boolean;
    isSearching?: boolean;
    isMostRecentlyUsedVisible?: boolean;
    suggestionsVisible?: boolean;
    suggestionsLoading?: boolean;
    suggestionsExtendedLoading?: boolean;
    isResultsFooterVisible?: boolean;
    selectedIndices?: number[];
    selectionRemoved?: T;
}

/**
 * The props needed to construct styles.
 * {@docCategory Pickers}
 */
export declare type IBasePickerStyleProps = Pick<IBasePickerProps<any>, 'theme' | 'className' | 'disabled'> & {
    /** Whether text style area is focused */
    isFocused?: boolean;
    /** Optional pickerInput className */
    inputClassName?: string;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Pickers}
 */
export declare interface IBasePickerStyles {
    /** Root element of any picker extending from BasePicker (wraps all the elements). */
    root: IStyle;
    /**
     * Refers to the elements already selected (picked) wrapped by `itemsWrapper` along with the input to type
     * a new selection.
     */
    text: IStyle;
    /** Refers to the items already selected (picked). */
    itemsWrapper: IStyle;
    /** Refers to the input were to type new selections (picks). */
    input: IStyle;
    /** Refers to helper element used for accessibility tools (hidden from view on screen). */
    screenReaderText: IStyle;
}

/**
 * Subset of picker options that may be legally passed through a picker to its
 * internal Suggestions component.
 * {@docCategory Pickers}
 */
export declare interface IBasePickerSuggestionsProps<T = any> extends Pick<ISuggestionsProps<T>, 'onRenderNoResultFound' | 'suggestionsHeaderText' | 'mostRecentlyUsedHeaderText' | 'noResultsFoundText' | 'className' | 'suggestionsClassName' | 'suggestionsItemClassName' | 'searchForMoreIcon' | 'searchForMoreText' | 'forceResolveText' | 'loadingText' | 'searchingText' | 'resultsFooterFull' | 'resultsFooter' | 'resultsMaximumNumber' | 'showRemoveButtons' | 'suggestionsAvailableAlertText' | 'suggestionsContainerAriaLabel' | 'showForceResolve' | 'removeButtonIconProps'> {
}

export { IBaseProps }

export declare interface IBaseSelectedItemsList<T> {
    /** Gets the current value of the input. */
    items: T[] | undefined;
    addItems: (items: T[]) => void;
}

export declare interface IBaseSelectedItemsListProps<T> extends React_2.ClassAttributes<any> {
    componentRef?: IRefObject<IBaseSelectedItemsList<T>>;
    /**
     * The selection
     */
    selection?: Selection_2;
    /**
     * A callback for when items are copied
     */
    onCopyItems?: (items: T[]) => string;
    /**
     * Function that specifies how the selected item will appear.
     */
    onRenderItem?: (props: ISelectedItemProps<T>) => JSX.Element;
    /**
     * Initial items that have already been selected and should appear in the people picker.
     */
    defaultSelectedItems?: T[];
    /**
     * A callback for when the selected list of items changes.
     */
    onChange?: (items?: T[]) => void;
    /**
     * Function that specifies how arbitrary text entered into the well is handled.
     */
    createGenericItem?: (input: string, ValidationState: ValidationState) => ISuggestionModel<T>;
    /**
     * A callback to process a selection after the user selects something from the picker.
     */
    onItemSelected?: (selectedItem?: T | T[]) => T | PromiseLike<T> | T[] | PromiseLike<T[]>;
    /**
     * The items that the base picker should currently display as selected.
     * If this is provided then the picker will act as a controlled component.
     */
    selectedItems?: T[];
    /**
     * Aria label for the 'X' button in the selected item component.
     * @defaultvalue ''
     */
    removeButtonAriaLabel?: string;
    /**
     * A callback when an item is deleted
     * @deprecated Use `onItemsDeleted` instead.
     */
    onItemDeleted?: (deletedItem: T) => void;
    /**
     * A callback when and item or items are deleted
     */
    onItemsDeleted?: (deletedItems: T[]) => void;
    /**
     * A callback on whether this item can be deleted
     */
    canRemoveItem?: (item: T) => boolean;
}

export declare interface IBaseSelectedItemsListState<T> {
    items: T[];
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumb {
    /**
     * Sets focus to the first breadcrumb link.
     */
    focus(): void;
}

/** @deprecated Use IBreadcrumbData */
export declare type IBreadCrumbData = IBreadcrumbData;

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbData {
    props: IBreadcrumbProps;
    renderedItems: IBreadcrumbItem[];
    renderedOverflowItems: IBreadcrumbItem[];
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbItem extends React_2.AllHTMLAttributes<HTMLElement> {
    /**
     * Text to display in the breadcrumb item.
     */
    text: string;
    /**
     * Arbitrary unique string associated with the breadcrumb item.
     */
    key: string;
    /**
     * Callback for when the breadcrumb item is selected.
     */
    onClick?: (ev?: React_2.MouseEvent<HTMLElement>, item?: IBreadcrumbItem) => void;
    /**
     * URL to navigate to when this breadcrumb item is clicked.
     * If provided, the breadcrumb will be rendered as a link.
     */
    href?: string;
    /**
     * Whether this is the breadcrumb item the user is currently navigated to.
     * If true, `aria-current="page"` will be applied to this breadcrumb item.
     */
    isCurrentItem?: boolean;
    /**
     * A function to render the outer content of the crumb (the link).
     */
    onRender?: IRenderFunction<IBreadcrumbItem>;
    /**
     * A function to render the inner content of the crumb (the text inside the link).
     */
    onRenderContent?: IRenderFunction<IBreadcrumbItem>;
    /**
     * Optional prop to render the item as a heading of your choice.
     *
     * You can also use this to force items to render as links instead of buttons (by default,
     * any item with a `href` renders as a link, and any item without a `href` renders as a button).
     * This is not generally recommended because it may prevent activating the link using the keyboard.
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'a';
    /**
     * Optional role for the breadcrumb item (which renders as a button by default)
     */
    role?: string;
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbProps extends React_2.HTMLAttributes<HTMLElement> {
    /**
     * Optional callback to access the `IBreadcrumb` interface. Use this instead of `ref` for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IBreadcrumb>;
    /**
     * Collection of breadcrumbs to render
     */
    items: IBreadcrumbItem[];
    /**
     * Optional class for the root breadcrumb element.
     */
    className?: string;
    /**
     * Render a custom divider in place of the default chevron `>`
     */
    dividerAs?: IComponentAs<IDividerAsProps>;
    /**
     * Render a custom overflow icon in place of the default icon `...`
     */
    onRenderOverflowIcon?: IRenderFunction<IButtonProps>;
    /**
     * Custom component for the overflow button.
     */
    overflowButtonAs?: IComponentAs<IButtonProps>;
    /**
     * The maximum number of breadcrumbs to display before coalescing.
     * If not specified, all breadcrumbs will be rendered.
     */
    maxDisplayedItems?: number;
    /** Custom render function to render each crumb. Default renders as a link. */
    onRenderItem?: IRenderFunction<IBreadcrumbItem>;
    /**
     * Custom render function to render the content within a crumb. Default renders the text.
     */
    onRenderItemContent?: IRenderFunction<IBreadcrumbItem>;
    /**
     * Method that determines how to reduce the length of the breadcrumb.
     * Return undefined to never reduce breadcrumb length.
     */
    onReduceData?: (data: IBreadcrumbData) => IBreadcrumbData | undefined;
    /**
     * Method that determines how to group the length of the breadcrumb.
     * Return undefined to never increase breadcrumb length.
     */
    onGrowData?: (data: IBreadcrumbData) => IBreadcrumbData | undefined;
    /**
     * Aria label for the root element of the breadcrumb (which is a navigation landmark).
     */
    ariaLabel?: string;
    /**
     * Aria label for the overflow button.
     */
    overflowAriaLabel?: string;
    /**
     * Optional index where overflow items will be collapsed.
     * @default 0
     */
    overflowIndex?: number;
    styles?: IStyleFunctionOrObject<IBreadcrumbStyleProps, IBreadcrumbStyles>;
    theme?: ITheme;
    /**
     * Extra props for the root FocusZone.
     */
    focusZoneProps?: IFocusZoneProps;
    /**
     * Extra props for the TooltipHost which wraps each breadcrumb item.
     */
    tooltipHostProps?: ITooltipHostProps;
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbStyleProps {
    className?: string;
    theme: ITheme;
}

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IBreadcrumbStyles {
    root: IStyle;
    list: IStyle;
    listItem: IStyle;
    chevron: IStyle;
    overflow: IStyle;
    overflowButton: IStyle;
    itemLink: IStyle;
    item: IStyle;
}

/**
 * {@docCategory Button}
 */
export declare interface IButton {
    /**
     * Sets focus to the button.
     */
    focus: () => void;
    /**
     * If there is a menu associated with this button and it is visible, this will dismiss the menu
     */
    dismissMenu: () => void;
    /**
     * If there is a menu associated with this button and it is visible, this will open the menu.
     * Params are optional overrides to the ones defined in `menuProps` to apply to just this instance of
     * opening the menu.
     *
     * @param shouldFocusOnContainer - override to the ContextualMenu `shouldFocusOnContainer` prop.
     * BaseButton implementation defaults to `undefined`.
     * Avoid using `shouldFocusOnContainer` as it breaks the default focus behaviour when using
     * assistive technologies.
     * @param shouldFocusOnMount - override to the ContextualMenu `shouldFocusOnMount` prop.
     * BaseButton implementation defaults to `true`.
     */
    openMenu: (shouldFocusOnContainer?: boolean, shouldFocusOnMount?: boolean) => void;
}

export declare interface IButtonClassNames {
    root?: string;
    flexContainer?: string;
    textContainer?: string;
    icon?: string;
    label?: string;
    menuIcon?: string;
    description?: string;
    screenReaderText?: string;
}

export declare interface IButtonGrid {
}

export declare interface IButtonGridCellProps<T> {
    /**
     * The option that will be made available to the user
     */
    item: T;
    /**
     * Arbitrary unique string associated with this option
     */
    id: string;
    /**
     * If the this option should be disabled
     */
    disabled?: boolean;
    /**
     * If the cell is currently selected
     */
    selected?: boolean;
    onClick?: (item: T, event?: React_2.MouseEvent<HTMLButtonElement>) => void;
    /**
     * The render callback to handle rendering the item
     */
    onRenderItem: (item: T) => JSX.Element;
    onHover?: (item?: T, event?: React_2.MouseEvent<HTMLButtonElement>) => void;
    onFocus?: (item: T, event?: React_2.FocusEvent<HTMLButtonElement>) => void;
    /**
     * The accessible role for this option
     */
    role?: string;
    /**
     * className(s) to apply
     */
    className?: string;
    /**
     * CSS classes to apply when the cell is disabled
     */
    cellDisabledStyle?: string[];
    /**
     * CSS classes to apply when the cell is selected
     */
    cellIsSelectedStyle?: string[];
    /**
     * Index for this option
     */
    index?: number;
    /**
     * The label for this item.
     */
    label?: string;
    /**
     * Method to provide the classnames to style a button.
     * The default value for this prop is `getClassnames` defined in `BaseButton.classNames`.
     */
    getClassNames?: (theme: ITheme, className: string, variantClassName: string, iconClassName: string | undefined, menuIconClassName: string | undefined, disabled: boolean, checked: boolean, expanded: boolean, isSplit: boolean | undefined) => IButtonClassNames;
    onMouseEnter?: (ev: React_2.MouseEvent<HTMLButtonElement>) => boolean;
    onMouseMove?: (ev: React_2.MouseEvent<HTMLButtonElement>) => boolean;
    onMouseLeave?: (ev: React_2.MouseEvent<HTMLButtonElement>) => void;
    onWheel?: (ev: React_2.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown?: (ev: React_2.KeyboardEvent<HTMLButtonElement>) => void;
}

export declare interface IButtonGridProps extends React_2.TableHTMLAttributes<HTMLTableElement>, React_2.RefAttributes<HTMLElement> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IButtonGrid>;
    /**
     * Items to display in a ButtonGrid with the specified number of columns
     */
    items: any[];
    /**
     * The number of columns
     */
    columnCount: number;
    /**
     * Custom renderer for the individual items
     */
    onRenderItem: (item: any, index: number) => JSX.Element;
    /**
     * Whether focus should cycle back to the beginning once the user navigates past the end (and vice versa).
     * Only relevant if `doNotContainWithinFocusZone` is not true.
     */
    shouldFocusCircularNavigate?: boolean;
    /**
     * If false (the default), the ButtonGrid is contained inside a FocusZone.
     * If true, a FocusZone is not used.
     * @default false
     */
    doNotContainWithinFocusZone?: boolean;
    /**
     * Class name for the FocusZone container for the ButtonGrid.
     * @deprecated Use `styles.focusedContainer` to define styling for the focus zone container
     */
    containerClassName?: string;
    /**
     * Handler for when focus leaves the ButtonGrid.
     */
    onBlur?: () => void;
    /**
     * If true, uses radiogroup semantics for the ButtonGrid.
     * This should be set to true for single-row grids, for two reasons:
     *   1. Radios are a more simple and understandable control,
     *      and a better fit for a single-dimensional selection control
     *   2. Multiple browsers use heuristics to strip table and grid roles from single-row tables with no column headers.
     */
    isSemanticRadio?: boolean;
    /**
     * Position this ButtonGrid is in the parent set (index in a parent menu, for example)
     */
    ariaPosInSet?: number;
    /**
     * @deprecated Use `ariaPosInSet`
     */
    positionInSet?: number;
    /**
     * Size of the parent set (size of parent menu, for example)
     */
    ariaSetSize?: number;
    /**
     * @deprecated Use `ariaSetSize`
     */
    setSize?: number;
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme;
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IButtonGridStyleProps, IButtonGridStyles>;
}

/**
 * Properties required to build the styles for the ButtonGrid component.
 */
export declare interface IButtonGridStyleProps {
    /**
     * Theme to apply to the ButtonGrid
     */
    theme: ITheme;
}

/**
 * Styles for the ButtonGrid Component.
 */
export declare interface IButtonGridStyles {
    /**
     * Style for the table container of a ButtonGrid.
     */
    root: IStyle;
    /**
     * Style for the table cells of the ButtonGrid.
     */
    tableCell: IStyle;
    /**
     * Style for the FocusZone container for the ButtonGrid.
     */
    focusedContainer?: IStyle;
}

/**
 * {@docCategory Button}
 */
export declare interface IButtonProps extends React_2.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement> {
    /**
     * Optional callback to access the `IButton` interface. Use this instead of `ref` for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IButton>;
    /**
     * Optional callback to access the root DOM element.
     * @deprecated Temporary solution which will be replaced with ref in the V8 release.
     */
    elementRef?: React_2.Ref<HTMLElement>;
    /**
     * If provided, this component will be rendered as an anchor.
     * @defaultvalue ElementType.anchor
     */
    href?: string;
    /**
     * Changes the visual presentation of the button to be emphasized.
     * @defaultvalue false
     */
    primary?: boolean;
    /**
     * Unique ID to identify the item. Typically a duplicate of key value.
     */
    uniqueId?: string | number;
    /**
     * Whether the button is disabled
     */
    disabled?: boolean;
    /**
     * Whether the button can have focus in disabled mode
     */
    allowDisabledFocus?: boolean;
    /**
     * If set to true and this is a split button (`split` is true), the split button's primary action is disabled.
     */
    primaryDisabled?: boolean;
    /**
     * Custom styling for individual elements within the button DOM.
     */
    styles?: IButtonStyles;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Whether the button is checked. Should be used with the `toggle` attribute when creating a standalone on/off button.
     */
    checked?: boolean;
    /**
     * Whether button is a toggle button with distinct on and off states. This should be true for buttons that permanently
     * change state when a press event finishes, such as a volume mute button.
     */
    toggle?: boolean;
    /**
     * If provided, additional class name to provide on the root element.
     */
    className?: string;
    /**
     * The aria label of the button for the benefit of screen readers.
     */
    ariaLabel?: string;
    /**
     * Detailed description of the button for the benefit of screen readers.
     *
     * Besides the compound button, other button types will need more information provided to screen reader.
     */
    ariaDescription?: string;
    /**
     * If true, add an `aria-hidden` attribute instructing screen readers to ignore the element.
     */
    ariaHidden?: boolean;
    /**
     * Text to render button label. If text is supplied, it will override any string in button children.
     * Other children components will be passed through after the text.
     */
    text?: string;
    /**
     * The props for the icon shown in the button.
     */
    iconProps?: IIconProps;
    /**
     * Props for button menu. Providing this will default to showing the menu icon. See `menuIconProps` for overriding
     * how the default icon looks. Providing this in addition to `onClick` and setting the `split` property to `true`
     * will render a SplitButton.
     */
    menuProps?: IContextualMenuProps;
    /**
     * Callback that runs after Button's contextual menu was closed (removed from the DOM)
     */
    onAfterMenuDismiss?: () => void;
    /**
     * If set to true, and if `menuProps` and `onClick` are provided, the button will render as a SplitButton.
     * @default false
     */
    split?: boolean;
    /**
     * The props for the icon shown when providing a menu dropdown.
     */
    menuIconProps?: IIconProps;
    /**
     * Accessible label for the dropdown chevron button if this button is split.
     */
    splitButtonAriaLabel?: string;
    /**
     * Optional callback when menu is clicked.
     */
    onMenuClick?: (ev?: React_2.MouseEvent<HTMLElement> | React_2.KeyboardEvent<HTMLElement>, button?: IButtonProps) => void;
    /**
     * Custom render function for the icon
     */
    onRenderIcon?: IRenderFunction<IButtonProps>;
    /**
     * Custom render function for the label text.
     */
    onRenderText?: IRenderFunction<IButtonProps>;
    /**
     * Custom render function for the description text.
     */
    onRenderDescription?: IRenderFunction<IButtonProps>;
    /**
     * Custom render function for the aria description element.
     */
    onRenderAriaDescription?: IRenderFunction<IButtonProps>;
    /**
     * Custom render function for rendering the button children.
     */
    onRenderChildren?: IRenderFunction<IButtonProps>;
    /**
     * Custom render function for button menu icon
     */
    onRenderMenuIcon?: IRenderFunction<IButtonProps>;
    /**
     * @deprecated Deprecated at v6.3.2, to be removed at \>= v7.0.0.
     * Use `menuAs` instead.
     */
    onRenderMenu?: IRenderFunction<IContextualMenuProps>;
    /**
     * Render a custom menu in place of the normal one.
     */
    menuAs?: IComponentAs<IContextualMenuProps>;
    /**
     * Description of the action this button takes.
     * Only used for compound buttons.
     */
    secondaryText?: string;
    /**
     * @defaultvalue ButtonType.default
     * @deprecated Deprecated at v1.2.3, to be removed at \>= v2.0.0.
     * Use specific button component instead.
     */
    buttonType?: ButtonType;
    /**
     * @deprecated Deprecated at v0.56.2, to be removed at \>= v1.0.0.
     * Use native props on the Button itself instead.
     * They will be mixed into the button/anchor element rendered by the component.
     */
    rootProps?: React_2.ButtonHTMLAttributes<HTMLButtonElement> | React_2.AnchorHTMLAttributes<HTMLAnchorElement>;
    /**
     * @deprecated No longer used. Use `checked` if setting state.
     */
    toggled?: boolean;
    /**
     * Any custom data the developer wishes to associate with the button.
     */
    data?: any;
    /**
     * Method to provide the classnames to style a button.
     * The default value for this prop is the `getClassnames` func defined in `BaseButton.classnames.ts`.
     * @defaultvalue getBaseButtonClassNames
     */
    getClassNames?: (theme: ITheme, className: string, variantClassName: string, iconClassName: string | undefined, menuIconClassName: string | undefined, disabled: boolean, checked: boolean, expanded: boolean, hasMenu: boolean, isSplit: boolean | undefined, allowDisabledFocus: boolean) => IButtonClassNames;
    /**
     * Method to provide the classnames to style a button.
     * The default value for this prop is the `getClassnames` func defined in `BaseButton.classnames.ts`.
     * @defaultvalue getBaseSplitButtonClassNames
     */
    getSplitButtonClassNames?: (disabled: boolean, expanded: boolean, checked: boolean, allowDisabledFocus: boolean) => ISplitButtonClassNames;
    /**
     * Provides a custom KeyCode that can be used to open the button menu.
     * A value of `null` can be provided to disable opening the button menu with a key press.
     * @default KeyCodes.down
     */
    menuTriggerKeyCode?: KeyCodes | null;
    /**
     * Optional keytip for this button
     */
    keytipProps?: IKeytipProps;
    /**
     * Menu will not be created or destroyed when opened or closed, instead it
     * will be hidden. This will improve perf of the menu opening but could potentially
     * impact overall perf by having more elements in the dom. Should only be used
     * when menu perf is important.
     *
     * Note: This may increase the amount of time it takes for the button itself to mount.
     */
    persistMenu?: boolean;
    /**
     * If true, the persisted menu is rendered hidden when the button initially mounts.
     * Non-persisted menus will not be in the component tree unless they are being shown.
     *
     * Note: This increases the time the button will take to mount, but
     * can improve perceived menu open perf. when the user opens the menu.
     *
     * @defaultvalue `undefined`, equivalent to false
     *
     * @deprecated There is known bug in Edge when this prop is true where scrollbars
     * overlap with the content when a menu is first rendered hidden.
     * Please do not start using this. If you are already using this,
     * please make sure that you are doing so only in non-Edge browsers.
     * See: https://github.com/microsoft/fluentui/issues/9034
     */
    renderPersistedMenuHiddenOnMount?: boolean;
    /**
     * Experimental prop that get passed into the menuButton that's rendered as part of
     * split button. Anything passed in will likely need to have accompanying
     * style changes.
     */
    splitButtonMenuProps?: IButtonProps;
    /**
     * Style for the description text if applicable (for compound buttons).
     * @deprecated Use `secondaryText` instead.
     */
    description?: string;
    /**
     * yet unknown docs
     */
    defaultRender?: any;
    /**
     * Optional props to be applied only to the primary action button of SplitButton and not to the
     * overall SplitButton container
     */
    primaryActionButtonProps?: IButtonProps;
}

/**
 * {@docCategory Button}
 */
export declare interface IButtonStyles {
    /**
     * Style for the root element in the default enabled, non-toggled state.
     */
    root?: IStyle;
    /**
     * Style override for the root element in a checked state, layered on top of the root style.
     */
    rootChecked?: IStyle;
    /**
     * Style override for the root element in a disabled state, layered on top of the root style.
     */
    rootDisabled?: IStyle;
    /**
     * Style override applied to the root on hover in the default, enabled, non-toggled state.
     */
    rootHovered?: IStyle;
    /**
     * Style override applied to the root on focus in the default, enabled, non-toggled state.
     */
    rootFocused?: IStyle;
    /**
     * Style override applied to the root on pressed in the default, enabled, non-toggled state.
     */
    rootPressed?: IStyle;
    /**
     * Style override applied to the root on when menu is expanded in the default, enabled, non-toggled state.
     */
    rootExpanded?: IStyle;
    /**
     * Style override applied to the root on hover in a checked, enabled state
     */
    rootCheckedHovered?: IStyle;
    /**
     * Style override applied to the root on pressed in a checked, enabled state
     */
    rootCheckedPressed?: IStyle;
    /**
     * Style override applied to the root on hover in a checked, disabled state
     */
    rootCheckedDisabled?: IStyle;
    /**
     * Style override applied to the root on hover in a expanded state on hover
     */
    rootExpandedHovered?: IStyle;
    /**
     * Style override for the root element when it has a menu button, layered on top of the root style.
     */
    rootHasMenu?: IStyle;
    /**
     * Style for the flexbox container within the root element.
     */
    flexContainer?: IStyle;
    /**
     * Style for the text container within the flexbox container element (and contains the text and description).
     */
    textContainer?: IStyle;
    /**
     * Style for the icon on the near side of the label.
     */
    icon?: IStyle;
    /**
     * Style for the icon on the near side of the label on hover.
     */
    iconHovered?: IStyle;
    /**
     * Style for the icon on the near side of the label when pressed.
     */
    iconPressed?: IStyle;
    /**
     * Style for the icon on the near side of the label when expanded.
     */
    iconExpanded?: IStyle;
    /**
     * Style for the icon on the near side of the label when expanded and hovered.
     */
    iconExpandedHovered?: IStyle;
    /**
     * Style override for the icon when the button is disabled.
     */
    iconDisabled?: IStyle;
    /**
     * Style override for the icon when the button is checked.
     */
    iconChecked?: IStyle;
    /**
     * Style for the text content of the button.
     */
    label?: IStyle;
    /**
     * Style override for the text content when the button is hovered.
     */
    labelHovered?: IStyle;
    /**
     * Style override for the text content when the button is disabled.
     */
    labelDisabled?: IStyle;
    /**
     * Style override for the text content when the button is checked.
     */
    labelChecked?: IStyle;
    /**
     * Style for the menu chevron.
     */
    menuIcon?: IStyle;
    /**
     * Style for the menu chevron on hover.
     */
    menuIconHovered?: IStyle;
    /**
     * Style for the menu chevron when pressed.
     */
    menuIconPressed?: IStyle;
    /**
     * Style for the menu chevron when expanded.
     */
    menuIconExpanded?: IStyle;
    /**
     * Style for the menu chevron when expanded and hovered.
     */
    menuIconExpandedHovered?: IStyle;
    /**
     * Style override for the menu chevron when the button is disabled.
     */
    menuIconDisabled?: IStyle;
    /**
     * Style override for the menu chevron when the button is checked.
     */
    menuIconChecked?: IStyle;
    /**
     * Style for the description text if applicable (for compound buttons).
     */
    description?: IStyle;
    /**
     * Style for the description text if applicable (for compound buttons).
     */
    secondaryText?: IStyle;
    /**
     * Style override for the description text when the button is hovered.
     */
    descriptionHovered?: IStyle;
    /**
     * Style for the description text when the button is pressed.
     */
    descriptionPressed?: IStyle;
    /**
     * Style override for the description text when the button is disabled.
     */
    descriptionDisabled?: IStyle;
    /**
     * Style override for the description text when the button is checked.
     */
    descriptionChecked?: IStyle;
    /**
     * Style override for the screen reader text.
     */
    screenReaderText?: IStyle;
    /**
     * Style override for the container div around a SplitButton element
     */
    splitButtonContainer?: IStyle;
    /**
     * Style for container div around a SplitButton element when the button is hovered.
     */
    splitButtonContainerHovered?: IStyle;
    /**
     * Style for container div around a SplitButton element when the button is focused.
     */
    splitButtonContainerFocused?: IStyle;
    /**
     * Style for container div around a SplitButton element when the button is checked.
     */
    splitButtonContainerChecked?: IStyle;
    /**
     * Style for container div around a SplitButton element when the button is checked and hovered.
     */
    splitButtonContainerCheckedHovered?: IStyle;
    /**
     * Style override for the container div around a SplitButton element in a disabled state
     */
    splitButtonContainerDisabled?: IStyle;
    /**
     * Style override for the divider element that appears between the button and menu button
     * for a split button.
     */
    splitButtonDivider?: IStyle;
    /**
     * Style override for the divider element that appears between the button and menu button
     * for a split button in a disabled state.
     */
    splitButtonDividerDisabled?: IStyle;
    /**
     * Style override for the SplitButton menu button
     */
    splitButtonMenuButton?: IStyle;
    /**
     * Style override for the SplitButton menu button element in a disabled state.
     */
    splitButtonMenuButtonDisabled?: IStyle;
    /**
     * Style override for the SplitButton menu button element in a checked state
     */
    splitButtonMenuButtonChecked?: IStyle;
    /**
     * Style override for the SplitButton menu button element in an expanded state
     */
    splitButtonMenuButtonExpanded?: IStyle;
    /**
     * Style override for the SplitButton menu icon element
     */
    splitButtonMenuIcon?: IStyle;
    /**
     * Style override for the SplitButton menu icon element in a disabled state
     */
    splitButtonMenuIconDisabled?: IStyle;
    /**
     * Style override for the SplitButton FlexContainer.
     */
    splitButtonFlexContainer?: IStyle;
    /**
     * Style override for the SplitButton when only primaryButton is in a disabled state
     */
    splitButtonMenuFocused?: IStyle;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendar {
    /** Sets focus to the selected date. */
    focus: () => void;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarDay {
    focus(): void;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarDayGrid {
    focus(): void;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarDayGridProps extends IDayGridOptions, IBaseProps<ICalendarDayGrid> {
    /**
     * Optional callback to access the ICalendarDayGrid interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ICalendarDayGrid>;
    /**
     * Customized styles for the component.
     */
    styles?: IStyleFunctionOrObject<ICalendarDayGridStyleProps, ICalendarDayGridStyles>;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Additional CSS class(es) to apply to the CalendarDayGrid.
     */
    className?: string;
    /**
     * Localized strings to use in the CalendarDayGrid
     */
    strings: ICalendarStrings;
    /**
     * The currently selected date
     */
    selectedDate: Date;
    /**
     * The currently navigated date
     */
    navigatedDate: Date;
    /**
     * Callback issued when a date is selected
     * @param date - The date the user selected
     * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set
     * for the component.
     */
    onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;
    /**
     * Callback issued when a date in the calendar is navigated
     * @param date - The date that is navigated to
     * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
     */
    onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
    /**
     * Callback issued when calendar day is closed
     */
    onDismiss?: () => void;
    /**
     * The first day of the week for your locale.
     * @defaultvalue DayOfWeek.Sunday
     */
    firstDayOfWeek: DayOfWeek;
    /**
     * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
     * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
     * @defaultvalue FirstWeekOfYear.FirstDay
     */
    firstWeekOfYear: FirstWeekOfYear;
    /**
     * The date range type indicating how  many days should be selected as the user
     * selects days
     * @defaultValue DateRangeType.Day
     */
    dateRangeType: DateRangeType;
    /**
     * The number of days to select while dateRangeType === DateRangeType.Day. Used in order to have multi-day
     * views.
     * @defaultValue 1
     */
    daysToSelectInDayView?: number;
    /**
     * Value of today. If unspecified, current time in client machine will be used.
     */
    today?: Date;
    /**
     * Whether the calendar should show the week number (weeks 1 to 53) before each week row
     * @defaultvalue false
     */
    showWeekNumbers?: boolean;
    /**
     * Apply additional formatting to dates, for example localized date formatting.
     */
    dateTimeFormatter: IDateFormatting;
    /**
     * Ref callback for individual days. Allows for customization of the styling, properties, or listeners of the
     * specific day.
     */
    customDayCellRef?: (element: HTMLElement, date: Date, classNames: IProcessedStyleSet<ICalendarDayGridStyles>) => void;
    /**
     * How many weeks to show by default. If not provided, will show enough weeks to display the current
     * month, between 4 and 6 depending
     * @defaultvalue undefined
     */
    weeksToShow?: number;
    /**
     * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
     */
    minDate?: Date;
    /**
     * If set the Calendar will not allow navigation to or selection of a date later than this value.
     */
    maxDate?: Date;
    /**
     * If set the Calendar will not allow selection of dates in this array.
     */
    restrictedDates?: Date[];
    /**
     * The days that are selectable when `dateRangeType` is WorkWeek.
     * If `dateRangeType` is not WorkWeek this property does nothing.
     * @defaultvalue [Monday,Tuesday,Wednesday,Thursday,Friday]
     */
    workWeekDays?: DayOfWeek[];
    /**
     * Whether the close button should be shown or not
     * @defaultvalue false
     */
    showCloseButton?: boolean;
    /**
     * Allows all dates and buttons to be focused, including disabled ones
     * @defaultvalue false
     */
    allFocusable?: boolean;
    /**
     * The ID of the control that labels this one
     */
    labelledBy?: string;
    /**
     * Whether to show days outside the selected month with lighter styles
     * @defaultvalue true
     */
    lightenDaysOutsideNavigatedMonth?: boolean;
    /**
     * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
     */
    animationDirection?: AnimationDirection;
    /**
     * Optional callback function to mark specific days with a small symbol. Fires when the date range changes,
     * gives the starting and ending displayed dates and expects the list of which days in between should be
     * marked.
     */
    getMarkedDays?: (startingDate: Date, endingDate: Date) => Date[];
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarDayGridStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * The date range type
     */
    dateRangeType?: DateRangeType;
    /**
     * Whether week numbers are being shown
     */
    showWeekNumbers?: boolean;
    /**
     * Whether to show days outside the selected month with lighter styles
     */
    lightenDaysOutsideNavigatedMonth?: boolean;
    /**
     * Whether grid entering animation should be forwards or backwards
     */
    animateBackwards?: boolean;
    /**
     * The cardinal directions for animation to occur during transitions, either horizontal or vertical
     */
    animationDirection?: AnimationDirection;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarDayGridStyles {
    /**
     * The style for the root div
     */
    wrapper?: IStyle;
    /**
     * The style for the table containing the grid
     */
    table?: IStyle;
    /**
     * The style to apply to the grid cells for days
     */
    dayCell?: IStyle;
    /**
     * The style to apply to grid cells for days in the selected range
     */
    daySelected?: IStyle;
    /**
     * The style to apply to row around weeks
     */
    weekRow?: IStyle;
    /**
     * The style to apply to the column headers above the weeks
     */
    weekDayLabelCell?: IStyle;
    /**
     * The style to apply to grid cells for week numbers
     */
    weekNumberCell?: IStyle;
    /**
     * The style to apply to individual days that are outside the min/max date range
     */
    dayOutsideBounds?: IStyle;
    /**
     * The style to apply to individual days that are outside the current month
     */
    dayOutsideNavigatedMonth?: IStyle;
    /**
     * The style to apply to the button element within the day cells
     */
    dayButton?: IStyle;
    /**
     * The style to apply to the individual button element that matches the "today" parameter
     */
    dayIsToday?: IStyle;
    /**
     * The style applied to the first placeholder week used during transitions
     */
    firstTransitionWeek?: IStyle;
    /**
     * The style applied to the last placeholder week used during transitions
     */
    lastTransitionWeek?: IStyle;
    /**
     * The style applied to the marker on days to mark as important
     */
    dayMarker?: IStyle;
    /**
     * The styles to apply to days for rounded corners. Can apply multiple to round multiple corners
     */
    topRightCornerDate?: IStyle;
    topLeftCornerDate?: IStyle;
    bottomRightCornerDate?: IStyle;
    bottomLeftCornerDate?: IStyle;
    /**
     * The styles to apply to days for focus borders. Can apply multiple if there are multiple focused days
     * around the current focused date
     */
    datesAbove?: IStyle;
    datesBelow?: IStyle;
    datesLeft?: IStyle;
    datesRight?: IStyle;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarDayProps extends IBaseProps<ICalendarDay>, ICalendarDayGridProps {
    /**
     * Optional callback to access the ICalendarDay interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ICalendarDay>;
    /**
     * Customized styles for the calendar day component
     */
    styles?: IStyleFunctionOrObject<ICalendarDayStyleProps, ICalendarDayStyles>;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Additional CSS class(es) to apply to the CalendarDay.
     */
    className?: string;
    /**
     * Localized strings to use in the Calendar
     */
    strings: ICalendarStrings;
    /**
     * The currently navigated date
     */
    navigatedDate: Date;
    /**
     * Callback issued when a date in the calendar is navigated
     * @param date - The date that is navigated to
     * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
     */
    onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
    /**
     * Callback issued when calendar day is closed
     */
    onDismiss?: () => void;
    /**
     * Custom navigation icons.
     */
    navigationIcons: ICalendarNavigationIcons;
    /**
     * Callback function when the header is selected
     */
    onHeaderSelect?: () => void;
    /**
     * Whether the calendar should show the week number (weeks 1 to 53) before each week row
     * @defaultvalue false
     */
    showWeekNumbers?: boolean;
    /**
     * Apply additional formatting to dates, for example localized date formatting.
     */
    dateTimeFormatter: IDateFormatting;
    /**
     * Whether the calendar should show 6 weeks by default.
     * @defaultvalue false
     */
    showSixWeeksByDefault?: boolean;
    /**
     * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
     */
    minDate?: Date;
    /**
     * If set the Calendar will not allow navigation to or selection of a date later than this value.
     */
    maxDate?: Date;
    /**
     * If set the Calendar will not allow selection of dates in this array.
     */
    restrictedDates?: Date[];
    /**
     * Whether the close button should be shown or not
     * @defaultvalue false
     */
    showCloseButton?: boolean;
    /**
     * Allows all dates and buttons to be focused, including disabled ones
     * @defaultvalue false
     */
    allFocusable?: boolean;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarDayStyleProps extends ICalendarDayGridStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * Whether the header is clickable
     */
    headerIsClickable?: boolean;
    /**
     * Whether week numbers are being shown
     */
    showWeekNumbers?: boolean;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarDayStyles extends Partial<ICalendarDayGridStyles> {
    /**
     * Style for the root element.
     */
    root: IStyle;
    /**
     * The style for the header button and forward/back navigation button container
     */
    header: IStyle;
    /**
     * The style for the title text inside the header
     */
    monthAndYear: IStyle;
    /**
     * The style for the wrapper around forward/back/close buttons
     */
    monthComponents: IStyle;
    /**
     * The style for the forward/back/close buttons
     */
    headerIconButton: IStyle;
    /**
     * The style to apply for disabled elements
     */
    disabledStyle: IStyle;
}

/**
 * @deprecated Use `IDateFormatting`
 */
export declare type ICalendarFormatDateCallbacks = IDateFormatting;

/**
 * @deprecated Use `ICalendarNavigationIcons`
 */
export declare type ICalendarIconStrings = ICalendarNavigationIcons;

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarMonth {
    focus(): void;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarMonthProps extends IBaseProps<ICalendarMonth> {
    /**
     * Optional callback to access the ICalendarMonth interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ICalendarMonth>;
    /**
     * Customized styles for the calendar month component
     */
    styles?: IStyleFunctionOrObject<ICalendarMonthStyleProps, ICalendarMonthStyles>;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Localized strings to use in the Calendar
     */
    strings: ICalendarStrings;
    /**
     * The currently selected date
     */
    selectedDate: Date;
    /**
     * The currently navigated date
     */
    navigatedDate: Date;
    /**
     * Callback issued when a month is selected
     * @param date - The date the user selected
     * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set
     * for the component.
     */
    onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;
    /**
     * Callback issued when the year is navigated
     * @param date - The date that is navigated to
     * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
     */
    onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
    /**
     * Custom navigation icons.
     */
    navigationIcons?: ICalendarNavigationIcons;
    /**
     * Value of today. If unspecified, current time in client machine will be used.
     */
    today?: Date;
    /**
     * Callback function when the header is selected
     */
    onHeaderSelect?: () => void;
    /**
     * Apply additional formatting to dates, for example localized date formatting.
     */
    dateTimeFormatter?: IDateFormatting;
    /**
     * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
     */
    minDate?: Date;
    /**
     * If set the Calendar will not allow navigation to or selection of a date later than this value.
     */
    maxDate?: Date;
    /**
     * Whether the month picker should highlight the current month
     * @defaultvalue false
     */
    highlightCurrentMonth?: boolean;
    /**
     * Whether the month picker should highlight the selected month
     * @defaultvalue false
     */
    highlightSelectedMonth?: boolean;
    /**
     * Allows all dates and buttons to be focused, including disabled ones
     * @defaultvalue false
     */
    allFocusable?: boolean;
    /**
     * Additional CSS class(es) to apply to the CalendarMonth.
     */
    className?: string;
    /**
     * Whether the year picker is hidden
     * @defaultvalue false
     */
    yearPickerHidden?: boolean;
    /**
     * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
     */
    animationDirection?: AnimationDirection;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarMonthStyleProps extends ICalendarPickerStyleProps {
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarMonthStyles extends ICalendarPickerStyles {
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarNavigationIcons {
    /**
     * FabricMDL2Icons name for the left navigation icon.  Previous default: ChevronLeft.
     * @defaultvalue  'Up'
     */
    leftNavigation?: string;
    /**
     * FabricMDL2Icons name for the right navigation icon.  Previous default: ChevronRight.
     * @defaultvalue  'Down'
     */
    rightNavigation?: string;
    /**
     * Close icon
     * @defaultvalue  'CalculatorMultiply'
     */
    closeIcon?: string;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarPickerStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * Whether the header can be clicked
     */
    hasHeaderClickCallback?: boolean;
    /**
     * Whether the picker should highlight the current item
     */
    highlightCurrent?: boolean;
    /**
     * Whether the picker should highlight the selected item
     */
    highlightSelected?: boolean;
    /**
     * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
     */
    animationDirection?: AnimationDirection;
    /**
     * Whether grid entering animation should be forwards or backwards
     */
    animateBackwards?: boolean;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarPickerStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    headerContainer: IStyle;
    currentItemButton: IStyle;
    navigationButtonsContainer: IStyle;
    navigationButton: IStyle;
    gridContainer: IStyle;
    buttonRow: IStyle;
    itemButton: IStyle;
    current: IStyle;
    selected: IStyle;
    disabled: IStyle;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarProps extends IBaseProps<ICalendar>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the ICalendar interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ICalendar>;
    /**
     * Customized styles for the calendar component
     */
    styles?: IStyleFunctionOrObject<ICalendarStyleProps, ICalendarStyles>;
    /**
     * Customized props for the calendar day
     */
    calendarDayProps?: Partial<ICalendarDayProps>;
    /**
     * Customized props for the calendar month
     */
    calendarMonthProps?: Partial<ICalendarMonthProps>;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Optional class name to add to the root element.
     */
    className?: string;
    /**
     * Callback for when a date is selected
     * @param date - The date the user selected
     * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set
     * for the component.
     */
    onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;
    /**
     * Callback for when calendar is closed
     */
    onDismiss?: () => void;
    /**
     * ID for the calendar
     */
    id?: string;
    /**
     * Default value of the Calendar, if any
     */
    value?: Date;
    /**
     * Value of today. If unspecified, current time in client machine will be used.
     */
    today?: Date;
    /**
     * The date range type indicating how  many days should be selected as the user
     * selects days
     * @defaultValue DateRangeType.Day
     */
    dateRangeType?: DateRangeType;
    /**
     * The first day of the week for your locale.
     * @defaultvalue DayOfWeek.Sunday
     */
    firstDayOfWeek?: DayOfWeek;
    /**
     * Defines when the first week of the year should start.
     * @defaultvalue FirstWeekOfYear.FirstDay
     */
    firstWeekOfYear?: FirstWeekOfYear;
    /**
     * Whether the month picker is shown beside the day picker or hidden.
     * @defaultvalue true
     */
    isMonthPickerVisible?: boolean;
    /**
     * Whether the day picker is shown beside the month picker or hidden.
     * @defaultvalue true
     */
    isDayPickerVisible?: boolean;
    /**
     * Show month picker on top of date picker when visible.
     * @defaultvalue false
     */
    showMonthPickerAsOverlay?: boolean;
    /**
     * Whether the "Go to today" link should be shown or not
     */
    showGoToToday?: boolean;
    /**
     * Whether the calendar should show the week number (weeks 1 to 53) before each week row
     * @defaultvalue false
     */
    showWeekNumbers?: boolean;
    /**
     * Localized strings to use in the Calendar
     */
    strings?: ICalendarStrings;
    /**
     * Custom navigation icons.
     */
    navigationIcons?: ICalendarNavigationIcons;
    /**
     * Apply additional formatting to dates, for example localized date formatting.
     */
    dateTimeFormatter?: IDateFormatting;
    /**
     * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
     */
    minDate?: Date;
    /**
     * If set the Calendar will not allow navigation to or selection of a date later than this value.
     */
    maxDate?: Date;
    /**
     * If set the Calendar will not allow selection of dates in this array.
     */
    restrictedDates?: Date[];
    /**
     * Whether the calendar should show 6 weeks by default.
     * @defaultvalue false
     */
    showSixWeeksByDefault?: boolean;
    /**
     * The days that are selectable when `dateRangeType` is `WorkWeek`.
     * If `dateRangeType` is not `WorkWeek` this property does nothing.
     * @defaultvalue [Monday,Tuesday,Wednesday,Thursday,Friday]
     */
    workWeekDays?: DayOfWeek[];
    /**
     * Whether the month picker should highlight the current month
     * @defaultvalue false
     */
    highlightCurrentMonth?: boolean;
    /**
     * Whether the month picker should highlight the selected month
     * @defaultvalue false
     */
    highlightSelectedMonth?: boolean;
    /**
     * Whether the close button should be shown or not
     * @defaultvalue false
     */
    showCloseButton?: boolean;
    /**
     * Allows all dates and buttons to be focused, including disabled ones
     * @defaultvalue false
     */
    allFocusable?: boolean;
}

export { ICalendarStrings }

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarStyleProps {
    /**
     * Theme provided by higher-order component.
     */
    theme: ITheme;
    /**
     * Custom CSS class for the calendar.
     */
    className?: string;
    /**
     * Whether the month picker is visible
     */
    isMonthPickerVisible?: boolean;
    /**
     * Whether the day picker is visible
     */
    isDayPickerVisible?: boolean;
    /**
     * Whether only month picker is shown
     */
    monthPickerOnly?: boolean;
    /**
     * Whether the month picker is overlaid on the day picker
     */
    showMonthPickerAsOverlay?: boolean;
    /**
     * @deprecated Use `overlaidWithButton`
     */
    overlayedWithButton?: boolean;
    /**
     * Whether the month and day picker are overlaid and the 'go to today' button is shown
     */
    overlaidWithButton?: boolean;
    /**
     * Whether the go to today button is shown
     */
    showGoToToday?: boolean;
    /**
     * Whether the week numbers are shown
     */
    showWeekNumbers?: boolean;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    divider: IStyle;
    goTodayButton: IStyle;
    monthPickerWrapper: IStyle;
    liveRegion: IStyle;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarYear {
    focus(): void;
}

export declare interface ICalendarYearHeaderProps extends ICalendarYearProps, ICalendarYearRange {
    /**
     * Callback action when the 'previous' navigation button is selected
     */
    onSelectPrev?: () => void;
    /**
     * Callback action when the 'next' navigation button is selected
     */
    onSelectNext?: () => void;
    /**
     * Whether title entering animation should be forwards or backwards
     */
    animateBackwards?: boolean;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarYearProps extends IBaseProps<ICalendarYear> {
    /**
     * Optional callback to access the ICalendarYear interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ICalendarYear>;
    /**
     * Customized styles for the calendar month component
     */
    styles?: IStyleFunctionOrObject<ICalendarYearStyleProps, ICalendarYearStyles>;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Localized strings to use in the Calendar
     */
    strings?: ICalendarYearStrings;
    /**
     * The currently selected year
     */
    selectedYear?: number;
    /**
     * The currently navigated year
     */
    navigatedYear?: number;
    /**
     * Callback action when a year is selected
     * @param year - The year the user selected
     */
    onSelectYear?: (year: number) => void;
    /**
     * Custom navigation icons.
     */
    navigationIcons?: ICalendarNavigationIcons;
    /**
     * Callback action when the header is selected
     */
    onHeaderSelect?: (focus: boolean) => void;
    /**
     * If set the Calendar will not allow navigation to or selection of a year earlier than this value.
     */
    minYear?: number;
    /**
     * If set the Calendar will not allow navigation to or selection of a year later than this value.
     */
    maxYear?: number;
    /**
     * Whether the year picker should highlight the current year
     * @defaultvalue false
     */
    highlightCurrentYear?: boolean;
    /**
     * Whether the year picker should highlight the selected year
     * @defaultvalue false
     */
    highlightSelectedYear?: boolean;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * Custom renderer for the title
     */
    onRenderTitle?: (props: ICalendarYearHeaderProps) => React_2.ReactNode;
    /**
     * Custom renderer for the year
     */
    onRenderYear?: (year: number) => React_2.ReactNode;
    /**
     * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
     */
    animationDirection?: AnimationDirection;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarYearRange {
    fromYear: number;
    toYear: number;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarYearRangeToString {
    (range: ICalendarYearRange): string;
}

/**
 * {@docCategory Calendar}
 */
export declare interface ICalendarYearStrings {
    rangeAriaLabel?: string | ICalendarYearRangeToString;
    prevRangeAriaLabel?: string | ICalendarYearRangeToString;
    nextRangeAriaLabel?: string | ICalendarYearRangeToString;
    headerAriaLabelFormatString?: string;
}

export declare interface ICalendarYearStyleProps extends ICalendarPickerStyleProps {
}

export declare interface ICalendarYearStyles extends ICalendarPickerStyles {
}

export declare interface ICalloutBeakPositionedInfo extends IPositionedData {
    closestEdge: RectangleEdge;
    hideBeak?: boolean;
}

/**
 * {@docCategory Callout}
 */
export declare interface ICalloutContentStyleProps {
    /**
     * Theme to apply to the callout content.
     */
    theme: ITheme;
    /**
     * Width for callout including borders.
     */
    calloutWidth?: number;
    /**
     * CSS class to apply to the callout.
     */
    className?: string;
    /**
     * Callout positioning data
     */
    positions?: ICalloutPositionedInfo;
    /**
     * Whether or not to clip content of the callout, if it overflows vertically.
     */
    overflowYHidden?: boolean;
    /**
     * Background color for the beak and callout.
     */
    backgroundColor?: string;
    /**
     * Width of Callout beak
     */
    beakWidth?: number;
    /**
     * Max width for callout including borders.
     */
    calloutMaxWidth?: number;
    /**
     * Min width for callout including borders.
     */
    calloutMinWidth?: number;
    /**
     * If true, a z-index should be set on the root element (since the Callout will not be rendered on a new layer).
     */
    doNotLayer?: boolean;
}

/**
 * {@docCategory Callout}
 */
export declare interface ICalloutContentStyles {
    /**
     * Style for wrapper of Callout component.
     */
    container: IStyle;
    /**
     * Style for callout container root element.
     */
    root: IStyle;
    /**
     * Style for callout beak.
     */
    beak: IStyle;
    /**
     * Style for callout beak curtain.
     */
    beakCurtain: IStyle;
    /**
     * Style for content component of the callout.
     */
    calloutMain: IStyle;
}

export declare interface ICalloutPositionedInfo extends IPositionedData {
    beakPosition: ICalloutBeakPositionedInfo;
}

export declare interface ICalloutPositionProps extends IPositionProps {
    /**
     * The width of the beak.
     */
    beakWidth?: number;
    /**
     * Whether or not the beak is visible
     */
    isBeakVisible?: boolean;
}

/**
 * {@docCategory Callout}
 */
export declare interface ICalloutProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * The target that the Callout should try to position itself based on.
     * It can be an element, a query selector string of a valid element,
     * or a `MouseEvent`. If a `MouseEvent` is given, the origin point of the event will be used.
     */
    target?: Target;
    /**
     * How the element should be positioned
     * @defaultvalue DirectionalHint.BottomAutoEdge
     */
    directionalHint?: DirectionalHint;
    /**
     * How the element should be positioned in RTL layouts.
     * If not specified, a mirror of the `directionalHint` alignment edge will be used instead.
     * This means that `DirectionalHint.BottomLeft` will change to `DirectionalHint.BottomRight` but
     * `DirectionalHint.LeftAuto` will not change.
     */
    directionalHintForRTL?: DirectionalHint;
    /**
     * The gap between the Callout and the target, specified as number of pixels
     * @defaultvalue 0
     */
    gapSpace?: number;
    /**
     * The width of the beak.
     * @defaultvalue 16
     */
    beakWidth?: number;
    /**
     * Custom width for callout including borders. If value is 0, no width is applied.
     * @defaultvalue 0
     */
    calloutWidth?: number;
    /**
     * Maximum width for callout including borders. If value is 0, no width is applied.
     * @defaultvalue 0
     */
    calloutMaxWidth?: number;
    /**
     * Minimum width for callout including borders. If value is 0, no width is applied.
     * @defaultvalue 0
     */
    calloutMinWidth?: number;
    /**
     * The background color of the Callout in hex format ie. #ffffff.
     * @defaultvalue $ms-color-white
     */
    backgroundColor?: string;
    /**
     * The bounding rectangle the callout can appear in (or callback that returns a rectangle).
     */
    bounds?: IRectangle | ((target?: Target, targetWindow?: Window) => IRectangle | undefined);
    /**
     * The minimum distance the callout will be away from the edge of the screen.
     *  @defaultvalue 8
     */
    minPagePadding?: number;
    /**
     * Whether the beak is visible.
     * @defaultvalue true
     */
    isBeakVisible?: boolean;
    /**
     * If true then the callout will not dismiss on scroll
     * @defaultvalue false
     * @deprecated use preventDismissOnEvent callback instead
     */
    preventDismissOnScroll?: boolean;
    /**
     * If true then the callout will not dismiss on resize
     * @defaultvalue false
     * @deprecated use preventDismissOnEvent callback instead
     */
    preventDismissOnResize?: boolean;
    /**
     * If true then the callout will not dismiss when it loses focus
     * @defaultvalue false
     * @deprecated use preventDismissOnEvent callback instead
     */
    preventDismissOnLostFocus?: boolean;
    /**
     * If true then the callout will dismiss when the target element is clicked
     * @defaultvalue false
     */
    dismissOnTargetClick?: boolean;
    /**
     * If defined, then takes priority over `preventDismissOnLostFocus`, `preventDismissOnResize`,
     * and `preventDismissOnScroll`.
     * If it returns true, the callout will not dismiss for this event.
     * If not defined or returns false, the callout can dismiss for this event.
     */
    preventDismissOnEvent?: (ev: Event | React_2.FocusEvent | React_2.KeyboardEvent | React_2.MouseEvent) => boolean;
    /**
     * If true, callout will dismiss when the window gets focus.
     * @defaultvalue false
     */
    shouldDismissOnWindowFocus?: boolean;
    /**
     * If true, the callout element will be positioned to cover the target.
     * If false, it will position next to the target.
     * @defaultvalue false
     */
    coverTarget?: boolean;
    /**
     * If true the positioning logic will prefer to flip edges rather than to nudge the rectangle to fit within bounds,
     * thus making sure the element aligns perfectly with target's alignment edge.
     */
    alignTargetEdge?: boolean;
    /**
     * Aria role assigned to the callout (e.g. `dialog`, `alertdialog`).
     */
    role?: string;
    /**
     * Accessible label text for callout.
     */
    ariaLabel?: string;
    /**
     * ID of the element which contains label text for the callout.
     */
    ariaLabelledBy?: string;
    /**
     * ID of the element which contains the description for the callout.
     */
    ariaDescribedBy?: string;
    /**
     * CSS class to apply to the callout.
     * @defaultvalue null
     */
    className?: string;
    /**
     * CSS style to apply to the callout.
     *
     * If you set `overflowY` in this object, it provides a performance optimization by preventing
     * Popup (underlying component of Callout) from calculating whether it needs a scroll bar.
     */
    style?: React_2.CSSProperties;
    /**
     * Optional callback when the layer content has mounted.
     */
    onLayerMounted?: () => void;
    /**
     * Optional props to pass to the Layer component hosting the callout.
     */
    layerProps?: ILayerProps;
    /**
     * Optional props to pass the Popup component that the callout uses.
     */
    popupProps?: IPopupProps;
    /**
     * Optional callback that is called once the callout has been correctly positioned.
     * @param positions - Gives the user information about how the callout is positioned such as the
     * final edge of the target that it positioned against, the beak position, and the beak's relationship to the
     * edges of the callout.
     */
    onPositioned?: (positions?: ICalloutPositionedInfo) => void;
    /**
     * Callback when the Callout tries to close.
     */
    onDismiss?: (ev?: Event | React_2.MouseEvent<HTMLElement> | React_2.KeyboardEvent<HTMLElement>) => void;
    /**
     * If true, do not render on a new layer. If false, render on a new layer.
     */
    doNotLayer?: boolean;
    /**
     * If true the position will not change sides in an attempt to fit the callout within bounds.
     * It will still attempt to align it to whatever bounds are given.
     * @defaultvalue false
     */
    directionalHintFixed?: boolean;
    /**
     * Specify the final height of the content.
     * To be used when expanding the content dynamically so that callout can adjust its position.
     */
    finalHeight?: number;
    /**
     * Manually set `overflowYHidden` style prop to true on `calloutMain` element.
     * A variety of callout load animations will need this to hide the scollbar that can appear.
     */
    hideOverflow?: boolean;
    /**
     * If true, then the callout will attempt to focus the first focusable element that it contains.
     * If it doesn't find a focusable element, no focus will be set.
     */
    setInitialFocus?: boolean;
    /**
     * Set max height of callout.
     * When not set, the callout will expand with contents up to the bottom of the screen.
     */
    calloutMaxHeight?: number;
    /**
     * Callback when the Callout body is scrolled.
     */
    onScroll?: () => void;
    /**
     * Optional theme for component
     */
    theme?: ITheme;
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles>;
    /**
     * If specified, renders the Callout in a hidden state.
     * Use this flag, rather than rendering a callout conditionally based on visibility,
     * to improve rendering performance when it becomes visible.
     * Note: When callout is hidden its content will not be rendered. It will only render
     * once the callout is visible.
     */
    hidden?: boolean;
    /**
     * If true, the component will be updated even when `hidden` is true.
     * Note that this would consume resources to update even though nothing is being shown to the user.
     * This might be helpful though if your updates are small and you want the
     * callout to be revealed quickly to the user when `hidden` is set to false.
     */
    shouldUpdateWhenHidden?: boolean;
    /**
     * If specified, determines whether the underlying {@link Popup} component should try to restore
     * focus when it is dismissed.  When set to false, the Popup won't try to restore focus to
     * the last focused element.
     * @defaultvalue true
     * @deprecated use `onRestoreFocus` instead
     */
    shouldRestoreFocus?: boolean;
    /**
     * Called when the component is unmounting, and focus needs to be restored. If this is provided,
     * focus will not be restored automatically, and you'll need to call `params.originalElement.focus()`.
     */
    onRestoreFocus?: (params: IPopupRestoreFocusParams) => void;
}

export { ICancelable }

/**
 * {@docCategory DetailsList}
 */
export declare interface ICellStyleProps {
    cellLeftPadding: number;
    cellRightPadding: number;
    cellExtraRightPadding: number;
}

export { IChangeDescription }

export { IChangeEventCallback }

/**
 * Checkbox class interface.
 * {@docCategory Checkbox}
 */
export declare interface ICheckbox {
    /** Gets the current indeterminate state. */
    indeterminate: boolean;
    /** Gets the current checked state. */
    checked: boolean;
    /** Sets focus to the checkbox. */
    focus: () => void;
}

/**
 * Checkbox properties.
 * {@docCategory Checkbox}
 */
export declare interface ICheckboxProps extends React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the `ICheckbox` interface. Use this instead of `ref` for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ICheckbox>;
    /**
     * Class name to provide on the root element, in addition to the `ms-Checkbox` class.
     */
    className?: string;
    /**
     * Checked state. Mutually exclusive with `defaultChecked`. Use this if you control the checked state at a higher
     * level and plan to pass in the correct value based on handling `onChange` events and re-rendering.
     */
    checked?: boolean;
    /**
     * Default checked state. Mutually exclusive with `checked`. Use this if you want an uncontrolled component,
     * meaning the Checkbox instance maintains its own state.
     */
    defaultChecked?: boolean;
    /**
     * Label to display next to the checkbox.
     */
    label?: string;
    /**
     * Disabled state of the checkbox.
     */
    disabled?: boolean;
    /**
     * Required state of the checkbox.
     */
    required?: boolean;
    /**
     * Callback that is called when the checked value has changed.
     */
    onChange?: (ev?: React_2.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => void;
    /**
     * Title text applied to the root element and the hidden checkbox input.
     * (Use `label` instead for the visible label.)
     */
    title?: string;
    /**
     * ID for the checkbox input.
     */
    id?: string;
    /**
     * Name for the checkbox input. This is intended for use with forms and NOT displayed in the UI.
     */
    name?: string;
    /**
     * Optional props that will be applied to the input element, *before* other props are applied.
     * Note that if you provide, for example, `disabled` as well as `inputProps.disabled`, the
     * top-level prop (`disabled` in this case) will take precedence.
     *
     * Including `data-*` props in `inputProps` is supported but currently requires casting since
     * TS 3.7 doesn't provide a way to allow all keys with a certain prefix.
     */
    inputProps?: React_2.ButtonHTMLAttributes<HTMLElement | HTMLButtonElement>;
    /**
     * Determines whether the checkbox should be shown before the label (`start`) or after (`end`).
     * @defaultvalue 'start'
     */
    boxSide?: 'start' | 'end';
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Accessible label for the checkbox.
     */
    ariaLabel?: string;
    /**
     * ID for element that contains label information for the checkbox.
     */
    ariaLabelledBy?: string;
    /**
     * ID for element that provides extended information for the checkbox.
     */
    ariaDescribedBy?: string;
    /**
     * The position in the parent set (if in a set) for `aria-posinset`.
     */
    ariaPositionInSet?: number;
    /**
     * The total size of the parent set (if in a set) for `aria-setsize`.
     */
    ariaSetSize?: number;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>;
    /**
     * Custom render function for the label.
     */
    onRenderLabel?: IRenderFunction<ICheckboxProps>;
    /**
     * Custom icon props for the check mark rendered by the checkbox
     */
    checkmarkIconProps?: IIconProps;
    /**
     * Optional controlled indeterminate visual state for checkbox. Setting indeterminate state takes visual precedence
     * over `checked` or `defaultChecked` props given but does not affect checked state.
     *
     * This should not be a toggleable state. On load, the checkbox will receive indeterminate visual state.
     * After the first user click, your supplied `onChange` callback should remove the indeterminate state
     * (without modifying the checked state), exposing the true state of the checkbox.
     */
    indeterminate?: boolean;
    /**
     * Optional uncontrolled indeterminate visual state for checkbox. Setting indeterminate state takes visual precedence
     * over `checked` or `defaultChecked` props given but does not affect checked state.
     *
     * This should not be a toggleable state. On load, the checkbox will receive indeterminate visual state.
     * After the user's first click, it will be removed, exposing the true state of the checkbox.
     */
    defaultIndeterminate?: boolean;
}

/**
 * {@docCategory Checkbox}
 */
export declare interface ICheckboxStyleProps {
    theme: ITheme;
    className?: string;
    disabled?: boolean;
    checked?: boolean;
    reversed?: boolean;
    indeterminate?: boolean;
    isUsingCustomLabelRender: boolean;
}

/**
 * {@docCategory Checkbox}
 */
export declare interface ICheckboxStyles {
    /**
     * Style for the root element (a button) of the checkbox component in the default enabled/unchecked state.
     */
    root?: IStyle;
    /**
     * INTERNAL: This is mostly an internal implementation detail which you should avoid styling.
     * This refers to the `<input type="checkbox">` element that is typically hidden and not rendered on screen.
     */
    input?: IStyle;
    /**
     * Style for the label part (contains the customized checkbox + text) when enabled.
     */
    label?: IStyle;
    /**
     * Style for checkbox in its default unchecked/enabled state.
     */
    checkbox?: IStyle;
    /**
     * Style for the checkmark in the default enabled/unchecked state.
     */
    checkmark?: IStyle;
    /**
     * Style for text appearing with the checkbox in its default enabled state.
     */
    text?: IStyle;
}

/**
 * {@docCategory Check}
 */
export declare interface ICheckProps extends React_2.RefAttributes<HTMLDivElement> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<ICheckProps>;
    /**
     * Whether the component is currently checked.
     * @defaultvalue false
     */
    checked?: boolean;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<ICheckStyleProps, ICheckStyles>;
    /**
     * @deprecated Not used
     */
    alwaysShowCheck?: boolean;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the Check
     */
    className?: string;
    /**
     * Whether to use fast icon components. The icons can't be targeted by customization but are
     * still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docCategory Check}
 */
export declare type ICheckStyleProps = Required<Pick<ICheckProps, 'theme'>> & Pick<ICheckProps, 'className' | 'checked'> & {
    /**
     * Custom height/width for the checkbox.
     * @defaultvalue '18px'
     */
    height?: string;
    /**
     * Custom height/width for the checkbox.
     * @defaultvalue '18px'
     * @deprecated Use `height`
     */
    checkBoxHeight?: string;
};

/**
 * {@docCategory Check}
 */
export declare interface ICheckStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    /**
     * The 'check' icon styles.
     */
    check: IStyle;
    /**
     * The 'circle' icon styles.
     */
    circle: IStyle;
    /**
     * Check host style
     * @deprecated Not used directly within the component. Instead, use `CheckGlobalClassNames.checkHost` from
     * `Check.styles.ts` to get the static class name to apply to the parent element of the Check.
     */
    checkHost: IStyle;
}

/**
 * {@docCategory ChoiceGroup}
 */
export declare interface IChoiceGroup {
    /**
     * Gets the current checked option.
     */
    checkedOption: IChoiceGroupOption | undefined;
    /**
     * Sets focus to the checked option or the first enabled option in the ChoiceGroup.
     */
    focus: () => void;
}

/**
 * {@docCategory ChoiceGroup}
 */
export declare interface IChoiceGroupOption extends Omit<React_2.InputHTMLAttributes<HTMLElement | HTMLInputElement>, 'checked'> {
    /**
     * A required key to uniquely identify the option.
     */
    key: string;
    /**
     * The text string for the option.
     */
    text: string;
    /**
     * Used to customize option rendering.
     */
    onRenderField?: IRenderFunction<IChoiceGroupOption & IChoiceGroupOptionProps>;
    /**
     * Used to customize label rendering.
     */
    onRenderLabel?: IRenderFunction<IChoiceGroupOption & IChoiceGroupOptionProps>;
    /**
     * Props for an icon to display with this option.
     */
    iconProps?: IIconProps;
    /**
     * Image to display with this option.
     */
    imageSrc?: string;
    /**
     * Alt text if the option is an image.
     * @default `''` (empty string)
     */
    imageAlt?: string;
    /**
     * The src of image for choice field which is selected.
     */
    selectedImageSrc?: string;
    /**
     * The width and height of the image in px for choice field.
     * @defaultvalue `{ width: 32, height: 32 }`
     */
    imageSize?: {
        width: number;
        height: number;
    };
    /**
     * Whether or not the option is disabled.
     */
    disabled?: boolean;
    /**
     * ID used on the option's input element.
     */
    id?: string;
    /**
     * ID used on the option's label.
     */
    labelId?: string;
    /**
     * Aria label of the option for the benefit of screen reader users.
     */
    ariaLabel?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>;
}

/**
 * {@docCategory ChoiceGroup}
 */
export declare interface IChoiceGroupOptionProps extends Omit<IChoiceGroupOption, 'key'> {
    /**
     * @deprecated Not used.
     */
    componentRef?: IRefObject<IChoiceGroupOption>;
    /**
     * Unique key for the option, set based on `IChoiceGroupOption.key`.
     */
    itemKey: string;
    /**
     * The option key. This will always be provided for callbacks (copied from `itemKey`) but is
     * optional when manually creating ChoiceGroupOptions.
     */
    key?: string;
    /**
     * Whether or not the option is checked. Set by `ChoiceGroup` based on `selectedKey` or
     * `defaultSelectedKey` from `IChoiceGroupProps`.
     */
    checked?: boolean;
    /**
     * Callback for the ChoiceGroup creating the option to be notified when the choice has been changed.
     */
    onChange?: (evt?: React_2.FormEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption & IChoiceGroupOptionProps) => void;
    /**
     * Callback for the ChoiceGroup creating the option to be notified when the choice has received focus.
     */
    onFocus?: (ev?: React_2.FocusEvent<HTMLElement | HTMLInputElement>, props?: IChoiceGroupOption & IChoiceGroupOptionProps) => void | undefined;
    /**
     * Callback for the ChoiceGroup creating the option to be notified when the choice has lost focus.
     */
    onBlur?: (ev?: React_2.FocusEvent<HTMLElement>, props?: IChoiceGroupOption & IChoiceGroupOptionProps) => void;
    /**
     * Indicates if the ChoiceGroupOption should appear focused, visually
     */
    focused?: boolean;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * If true, an option must be selected in the ChoiceGroup.
     */
    required?: boolean;
    /**
     * This value is used to group each ChoiceGroupOption into the same logical ChoiceGroup
     */
    name?: string;
}

/**
 * Defines props needed to construct styles.
 * {@docCategory ChoiceGroup}
 */
export declare interface IChoiceGroupOptionStyleProps {
    /** Theme provided by High-Order Component. */
    theme: ITheme;
    /** Whether the option has an icon. */
    hasIcon?: boolean;
    /** Whether the option icon is an image. */
    hasImage?: boolean;
    /** Whether the option is checked or not. */
    checked?: boolean;
    /** Whether the option is disabled or not. */
    disabled?: boolean;
    /** Whether the image width or height are higher than `71`. */
    imageIsLarge?: boolean;
    /**
     * Image sizes used when `hasImage` or `hasIcon` style props are enabled.
     * @defaultvalue `{ height: 32, width: 32 }`
     */
    imageSize?: {
        height: number;
        width: number;
    };
    /** Whether the option is in focus or not. */
    focused?: boolean;
}

/**
 * {@docCategory ChoiceGroup}
 */
export declare interface IChoiceGroupOptionStyles {
    root?: IStyle;
    choiceFieldWrapper?: IStyle;
    input?: IStyle;
    field?: IStyle;
    innerField?: IStyle;
    imageWrapper?: IStyle;
    selectedImageWrapper?: IStyle;
    iconWrapper?: IStyle;
    labelWrapper?: IStyle;
}

/**
 * {@docCategory ChoiceGroup}
 */
export declare interface IChoiceGroupProps extends React_2.InputHTMLAttributes<HTMLElement | HTMLInputElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the `IChoiceGroup` interface. Use this instead of `ref` for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IChoiceGroup>;
    /**
     * The options for the choice group.
     */
    options?: IChoiceGroupOption[];
    /**
     * The key of the option that will be initially checked.
     */
    defaultSelectedKey?: string | number;
    /**
     * The key of the selected option. If you provide this, you must maintain selection
     * state by observing onChange events and passing a new value in when changed.
     */
    selectedKey?: string | number | null;
    /**
     * A callback for receiving a notification when the choice has been changed.
     */
    onChange?: (ev?: React_2.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => void;
    /**
     * Descriptive label for the choice group.
     */
    label?: string;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IChoiceGroupStyleProps, IChoiceGroupStyles>;
    /**
     * ID of an element to use as the aria label for this ChoiceGroup.
     */
    ariaLabelledBy?: string;
}

/**
 * {@docCategory ChoiceGroup}
 */
export declare interface IChoiceGroupStyleProps {
    theme: ITheme;
    className?: string;
    optionsContainIconOrImage?: boolean;
}

/**
 * {@docCategory ChoiceGroup}
 */
export declare interface IChoiceGroupStyles {
    root?: IStyle;
    label?: IStyle;
    flexContainer?: IStyle;
}

/**
 * Circle element interface
 * {@docCategory Shimmer}
 */
export declare interface ICircle extends IShimmerElement {
    /**
     * Sets the height of the shimmer circle in pixels.
     * Minimum supported 10px.
     * @defaultvalue 24px
     */
    height?: number;
}

export { IClassNames }

export { IClassNamesFunctionOptions }

/**
 * {@docCategory Coachmark}
 */
export declare interface ICoachmark {
    /**
     * Forces the Coachmark to dismiss
     */
    dismiss?: (ev?: Event | React_2.MouseEvent<HTMLElement> | React_2.KeyboardEvent<HTMLElement>) => void;
}

/**
 * Coachmark component props
 * {@docCategory Coachmark}
 */
export declare interface ICoachmarkProps extends React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the `ICoachmark` interface. Use this instead of `ref` for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ICoachmark>;
    /**
     * If provided, additional class name to provide on the root element.
     */
    className?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<ICoachmarkStyleProps, ICoachmarkStyles>;
    /**
     * The target that the Coachmark should try to position itself based on.
     */
    target: Target;
    /**
     * Props to pass to the PositioningContainer component. Specify the `directionalHint` to indicate
     * on which edge the Coachmark/TeachingBubble should be positioned.
     * @defaultvalue `{ directionalHint: DirectionalHint.bottomAutoEdge }`
     */
    positioningContainerProps?: IPositioningContainerProps;
    /**
     * Whether or not to force the Coachmark/TeachingBubble content to fit within the window bounds.
     * @defaultvalue true
     */
    isPositionForced?: boolean;
    /**
     * The starting collapsed state for the Coachmark.
     * @defaultvalue true
     * @deprecated Use `isCollapsed` instead.
     */
    collapsed?: boolean;
    /**
     * The starting collapsed state for the Coachmark.
     * @defaultvalue true
     */
    isCollapsed?: boolean;
    /**
     * The distance in pixels the mouse is located before opening up the Coachmark.
     * @defaultvalue 10
     */
    mouseProximityOffset?: number;
    /**
     * Callback when the opening animation begins.
     */
    onAnimationOpenStart?: () => void;
    /**
     * Callback when the opening animation completes.
     */
    onAnimationOpenEnd?: () => void;
    /**
     * @deprecated No longer used.
     */
    beakWidth?: number;
    /**
     * @deprecated No longer used.
     */
    beakHeight?: number;
    /**
     * Delay before allowing mouse movements to open the Coachmark.
     * @defaultvalue 3600
     */
    delayBeforeMouseOpen?: number;
    /**
     * Delay in milliseconds before Coachmark animation appears.
     * @defaultvalue 0
     */
    delayBeforeCoachmarkAnimation?: number;
    /**
     * Callback to run when the mouse moves.
     */
    onMouseMove?: (e: MouseEvent) => void;
    /**
     * @deprecated No longer used.
     */
    width?: number;
    /**
     * @deprecated No longer used.
     */
    height?: number;
    /**
     * Color of the Coachmark/TeachingBubble.
     */
    color?: string;
    /**
     * Beacon color one.
     */
    beaconColorOne?: string;
    /**
     * Beacon color two.
     */
    beaconColorTwo?: string;
    /**
     * Text for screen reader to announce when Coachmark is displayed
     */
    ariaAlertText?: string;
    /**
     * @deprecated Not used. Coachmark uses `focusFirstChild` utility instead to focus on TeachingBubbleContent.
     */
    teachingBubbleRef?: ITeachingBubble;
    /**
     * ID used for the internal element which contains label text for the Coachmark
     * (don't render an element with this ID yourself).
     */
    ariaLabelledBy?: string;
    /**
     * ID used for the internal element which contains description text for the Coachmark
     * (don't render an element with this ID yourself).
     */
    ariaDescribedBy?: string;
    /**
     * Defines the text content for the `ariaLabelledBy` element.
     * Not used unless `ariaLabelledBy` is also provided.
     */
    ariaLabelledByText?: string;
    /**
     * Defines the text content for the `ariaDescribedBy` element
     * Not used unless `ariaDescribedBy` is also provided.
     */
    ariaDescribedByText?: string;
    /**
     * If true then the Coachmark will not dismiss when it loses focus
     * @defaultvalue false
     */
    preventDismissOnLostFocus?: boolean;
    /**
     * If true then the Coachmark beak (arrow pointing towards target) will always be visible as long as
     * Coachmark is visible
     * @defaultvalue false
     */
    persistentBeak?: boolean;
    /**
     * If true then focus will not be set to the Coachmark when it mounts. Useful in cases where focus on coachmark
     * is causing other components in page to dismiss upon losing focus.
     * @defaultvalue false
     */
    preventFocusOnMount?: boolean;
    /**
     * Callback when the Coachmark tries to close.
     */
    onDismiss?: (ev?: Event | React_2.MouseEvent<HTMLElement> | React_2.KeyboardEvent<HTMLElement>) => void;
    /**
     * Theme provided by higher order component.
     */
    theme?: ITheme;
    /**
     * Child nodes to render inside the Coachmark dialog
     */
    children?: React_2.ReactNode;
}

/**
 * The props needed to construct styles.
 * {@docCategory Coachmark}
 */
export declare interface ICoachmarkStyleProps {
    /**
     * ClassName to provide on the root style area.
     */
    className?: string;
    /**
     * Current theme.
     */
    theme?: ITheme;
    /**
     * Is the Coachmark collapsed.
     * @deprecated Use `isCollapsed` instead.
     */
    collapsed?: boolean;
    /**
     * Is the Coachmark collapsed
     */
    isCollapsed: boolean;
    /**
     * Is the component taking measurements
     */
    isMeasuring: boolean;
    /**
     * The height measured before the component has been mounted in pixels
     */
    entityHostHeight?: string;
    /**
     * The width measured in pixels
     */
    entityHostWidth?: string;
    /**
     * Width of the coachmark
     */
    width?: string;
    /**
     * Height of the coachmark
     */
    height?: string;
    /**
     * Color
     */
    color?: string;
    /**
     * Beacon color one
     */
    beaconColorOne?: string;
    /**
     * Beacon color two
     */
    beaconColorTwo?: string;
    /**
     * Transform origin for teaching bubble content
     */
    transformOrigin?: string;
    /**
     * Delay time for the animation to start
     */
    delayBeforeCoachmarkAnimation?: string;
}

/**
 * Represents the stylable areas of the control.
 * {@docCategory Coachmark}
 */
export declare interface ICoachmarkStyles {
    /**
     * Style for the root element in the default enabled/unchecked state.
     */
    root?: IStyle;
    /**
     * The pulsing beacon that animates when the Coachmark is collapsed.
     */
    pulsingBeacon?: IStyle;
    /**
     * The layer, or div, that the translate animation will be applied to.
     */
    translateAnimationContainer?: IStyle;
    /**
     * The layer the Scale animation will be applied to.
     */
    scaleAnimationLayer?: IStyle;
    /**
     * The layer the Rotate animation will be applied to.
     */
    rotateAnimationLayer?: IStyle;
    /**
     * The layer that content/components/elements will be hosted in.
     */
    entityHost?: IStyle;
    /**
     * The inner layer that components will be hosted in
     * (primary purpose is scaling the layer down while the Coachmark collapses)
     */
    entityInnerHost: IStyle;
    /**
     * The layer that directly contains the TeachingBubbleContent
     */
    childrenContainer: IStyle;
    /**
     * The styles applied when the Coachmark has collapsed.
     */
    collapsed?: IStyle;
    /**
     * The styles applied to the ARIA attribute container
     */
    ariaContainer?: IStyle;
}

/**
 * @deprecated No longer used.
 * {@docCategory Coachmark}
 */
export declare type ICoachmarkTypes = ICoachmarkProps;

export declare interface IColor extends IRGB, IHSV {
    /** Hex string for the color (excluding alpha component), *not* prefixed with #. */
    hex: string;
    /** CSS color string. If a hex value, it must be prefixed with #. */
    str: string;
    /** Transparency value, range 0 (opaque) to 100 (transparent). Usually assumed to be 0 if not specified. */
    t?: number;
}

/**
 * {@docCategory SwatchColorPicker}
 */
export declare interface IColorCellProps {
    /**
     * Arbitrary unique string associated with this option
     */
    id: string;
    /**
     * Tooltip and aria label for this item
     */
    label?: string;
    /**
     * The CSS-compatible string to describe the color
     */
    color: string;
    /**
     * Index for this option
     */
    index?: number;
    /**
     * Determines if this individual cell is disabled
     */
    disabled?: boolean;
}

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorPicker {
    /** The currently selected color. */
    color: IColor;
}

/**
 * {@docCategory SwatchColorPicker}
 */
export declare interface IColorPickerGridCellProps {
    /**
     * Item to render
     */
    item: IColorCellProps;
    /**
     * Used as a PREFIX for the cell's ID (the cell will not have this literal string as its ID).
     * @deprecated Deprecated due to misleading name. Use `idPrefix` instead.
     */
    id?: string;
    /**
     * Prefix for this cell's ID. Will be required in a future version once `id` is removed.
     */
    idPrefix?: string;
    /**
     * If true, uses radio semantics for the color cell.
     * This should be set to true for cells within a single-row colorpicker.
     * @defaultvalue false
     */
    isRadio?: boolean;
    /**
     * Tooltip and aria label for this item
     */
    label?: string;
    /**
     * The CSS-compatible string to describe the color
     */
    color: string;
    /**
     * Index for this option
     */
    index?: number;
    /**
     * The theme object to use for styling.
     */
    theme?: ITheme;
    /**
     * True if this cell should be rendered as a circle, false if it should be a square.
     * @default `true` (render as circle)
     */
    circle?: boolean;
    /**
     * Whether this cell should be disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether this cell is currently selected
     */
    selected: boolean;
    /**
     * Height of the cell, in pixels
     * @defaultvalue 20
     */
    height?: number;
    /**
     * Width of the cell, in pixels
     * @defaultvalue 20
     */
    width?: number;
    /**
     * Width of the border that indicates a selected/hovered cell, in pixels.
     * @defaultvalue 2 if `cellWidth` is less than 24; otherwise 4
     */
    borderWidth?: number;
    /**
     * Handler for when a color cell is clicked.
     */
    onClick?: (item: IColorCellProps, event?: React_2.MouseEvent<HTMLButtonElement>) => void;
    onHover?: (item?: IColorCellProps, event?: React_2.MouseEvent<HTMLButtonElement>) => void;
    onFocus?: (item: IColorCellProps, event?: React_2.FormEvent<HTMLButtonElement>) => void;
    /**
     * Custom styles for the component.
     */
    styles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;
    /**
     * Mouse enter handler. Returns true if the event should be processed, false otherwise.
     */
    onMouseEnter?: (ev: React_2.MouseEvent<HTMLButtonElement>) => boolean;
    /**
     * Mouse move handler. Returns true if the event should be processed, false otherwise.
     */
    onMouseMove?: (ev: React_2.MouseEvent<HTMLButtonElement>) => boolean;
    onMouseLeave?: (ev: React_2.MouseEvent<HTMLButtonElement>) => void;
    onWheel?: (ev: React_2.MouseEvent<HTMLButtonElement>) => void;
    onKeyDown?: (ev: React_2.KeyboardEvent<HTMLButtonElement>) => void;
    /**
     * Custom render function for rendering internal content of the color cell.
     */
    onRenderColorCellContent?: IRenderFunction<IColorCellProps>;
}

/**
 * {@docCategory SwatchColorPicker}
 */
export declare interface IColorPickerGridCellStyleProps {
    /**
     * Theme to apply to the cell.
     */
    theme: ITheme;
    /**
     * Whether the component is disabled or not.
     */
    disabled?: boolean;
    /**
     * Whether the cell is currently selected or not.
     */
    selected?: boolean;
    /**
     * Whether the svg color element should be rendered as a circle or not.
     */
    circle?: boolean;
    /**
     * Whether the color being rendered is white or not. If it is white we show a border around it.
     */
    isWhite?: boolean;
    /**
     * The height of this cell, in pixels.
     */
    height?: number;
    /**
     * The width of this cell, in pixels.
     */
    width?: number;
    /**
     * The width of the border indicating a hovered or selected cell, in pixels.
     */
    borderWidth?: number;
}

/**
 * {@docCategory SwatchColorPicker}
 */
export declare interface IColorPickerGridCellStyles {
    /**
     * Style to apply to a colorCell in the color picker.
     */
    colorCell: IStyle;
    /**
     * Style to apply to the svg element that renders the color.
     */
    svg: IStyle;
}

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorPickerProps {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IColorPicker>;
    /**
     * Object or CSS-compatible string to describe the color.
     */
    color: IColor | string;
    /**
     * Labels for elements within the ColorPicker. Defaults are provided in English only.
     */
    strings?: IColorPickerStrings;
    /**
     * Callback for when the user changes the color.
     * (Not called when the color is changed via props.)
     */
    onChange?: (ev: React_2.SyntheticEvent<HTMLElement>, color: IColor) => void;
    /**
     * `alpha` (the default) means display a slider and text field for editing alpha values.
     * `transparency` also displays a slider and text field but for editing transparency values.
     * `none` hides these controls.
     *
     * Alpha represents the opacity of the color, whereas transparency represents the transparentness
     * of the color: i.e. a 30% transparent color has 70% opaqueness.
     *
     * @defaultvalue 'alpha'
     */
    alphaType?: 'alpha' | 'transparency' | 'none';
    /**
     * Whether to hide the alpha (or transparency) slider and text field.
     * @deprecated Use `alphaType: 'none'`
     */
    alphaSliderHidden?: boolean;
    /**
     * Label for the hex text field.
     * @defaultvalue Hex
     * @deprecated Use `strings`
     */
    hexLabel?: string;
    /**
     * Label for the red text field.
     * @defaultvalue Red
     * @deprecated Use `strings`
     */
    redLabel?: string;
    /**
     * Label for the green text field.
     * @defaultvalue Green
     * @deprecated Use `strings`
     */
    greenLabel?: string;
    /**
     * Label for the blue text field.
     * @defaultvalue Blue
     * @deprecated Use `strings`
     */
    blueLabel?: string;
    /**
     * Label for the alpha text field.
     * @defaultvalue Alpha
     * @deprecated Use `strings`
     */
    alphaLabel?: string;
    /**
     * Additional CSS class(es) to apply to the ColorPicker.
     */
    className?: string;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IColorPickerStyleProps, IColorPickerStyles>;
    /**
     * Whether to show color preview box.
     * @defaultvalue false
     */
    showPreview?: boolean;
    /**
     * Optional props to pass through to the error message tooltips
     */
    tooltipProps?: ITooltipHostProps;
}

export declare interface IColorPickerState {
    /** Most recently selected color */
    color: IColor;
    /** Color component currently being edited via a text field (if intermediate value is invalid) */
    editingColor?: {
        /** Which color component is being edited */
        component: ColorComponent;
        /** Currently entered value, which is not valid */
        value: string;
    };
}

export declare interface IColorPickerStrings {
    /**
     * Accessible label for the root of the color picker region.
     * The string should contain a placeholder `{0}` for the currently selected color.
     * @defaultvalue `'Color picker, {0} selected.'`
     */
    rootAriaLabelFormat?: string;
    /**
     * Label for the hex text field.
     * @defaultvalue Hex
     */
    hex?: string;
    /**
     * Label for the red text field.
     * @defaultvalue Red
     */
    red?: string;
    /**
     * Label for the green text field.
     * @defaultvalue Green
     */
    green?: string;
    /**
     * Label for the blue text field.
     * @defaultvalue Blue
     */
    blue?: string;
    /**
     * Label for the alpha text field.
     * Also used as the aria label for the alpha slider if `alphaAriaLabel` is not provided.
     * @defaultvalue Alpha
     */
    alpha?: string;
    /**
     * Label for the transparency text field.
     * @defaultvalue Transparency
     */
    transparency?: string;
    /**
     * Customized aria-label for the alpha slider.
     * This overrides the visible text label, and should be used with extreme care (and very rarely).
     */
    alphaAriaLabel?: string;
    /**
     * Customized aria-label for the transparency slider.
     * This overrides the visible text label, and should be used with extreme care (and very rarely).
     */
    transparencyAriaLabel?: string;
    /**
     * Aria label for the hue slider.
     * @defaultvalue Hue
     */
    hueAriaLabel?: string;
    /**
     * Aria label for the hue slider.
     * @deprecated Use `hueAriaLabel`
     */
    hue?: string;
    /**
     * Aria label for the color rectangle, which adjusts saturation and value (brightness).
     * @defaultvalue 'Saturation and brightness'
     */
    svAriaLabel?: string;
    /**
     * Format string for the current values of the color rectangle.
     * The string must include descriptions and two placeholders for the current values:
     * `{0}` for saturation and `{1}` for value/brightness.
     * @defaultvalue `'Saturation {0} brightness {1}'`
     */
    svAriaValueFormat?: string;
    /**
     * Detailed description for how to use the color rectangle. Moving the thumb horizontally adjusts
     * saturation and moving it vertically adjusts value (essentially, brightness).
     * @defaultvalue 'Use left and right arrow keys to set saturation. Use up and down arrow keys to set brightness.'
     */
    svAriaDescription?: string;
    /**
     * Error message for invalid hex input
     * @defaultvalue 'Hex values must be between 3 and 6 characters long'
     */
    hexError?: string;
    /**
     * Error message for invalid alpha input
     * @defaultvalue 'Alpha must be between 0 and 100'
     */
    alphaError?: string;
    /**
     * Error message for invalid transparency input
     * @defaultvalue 'Transparency must be between 0 and 100'
     */
    transparencyError?: string;
    /**
     * Error message for invalid red input
     * @defaultvalue 'Red must be between 0 and 255'
     */
    redError?: string;
    /**
     * Error message for invalid green input
     * @defaultvalue 'Green must be between 0 and 255'
     */
    greenError?: string;
    /**
     * Error message for invalid blue input
     * @defaultvalue 'Blue must be between 0 and 255'
     */
    blueError?: string;
}

/**
 * {@docCategory ColorPicker}
 */
export declare type IColorPickerStyleProps = Required<Pick<IColorPickerProps, 'theme'>> & Pick<IColorPickerProps, 'className' | 'alphaType'>;

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorPickerStyles {
    /**
     * Style set for the root element.
     */
    root?: IStyle;
    /**
     * Style set for the panel element that contains the color rectangle, color sliders and inputs .
     */
    panel?: IStyle;
    /**
     * Style set for the panel element that contains the color rectangle
     */
    colorRectangle?: IStyle;
    /**
     * Style set for the table element that contains the color sliders and inputs.
     */
    table?: IStyle;
    /**
     * Style set for the table header that contains the labels.
     */
    tableHeader?: IStyle;
    /**
     * Style set for the table cell that contains the hex label.
     */
    tableHexCell?: IStyle;
    /**
     * Style set for the table cell that contains the alpha or transparency label.
     */
    tableAlphaCell?: IStyle;
    /**
     * Style set for each text field input.
     */
    input?: IStyle;
    /**
     * Color Square
     */
    colorSquare?: IStyle;
    /**
     * flexContainer
     */
    flexContainer?: IStyle;
    /**
     * flexSlider
     */
    flexSlider?: IStyle;
    /**
     * flexPreviewBox
     */
    flexPreviewBox?: IStyle;
}

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorRectangle {
    /** Currently selected color. */
    color: IColor;
}

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorRectangleProps {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IColorRectangle>;
    /**
     * Current color of the rectangle.
     */
    color: IColor;
    /**
     * Label of the ColorRectangle for the benefit of screen reader users.
     * @defaultvalue 'Saturation and brightness'
     */
    ariaLabel?: string;
    /**
     * Format string for the color rectangle's current value as read by screen readers.
     * The string must include descriptions and two placeholders for the current values:
     * `{0}` for saturation and `{1}` for value/brightness.
     * @defaultvalue `'Saturation {0} brightness {1}'`
     */
    ariaValueFormat?: string;
    /**
     * Detailed description for how to use the color rectangle. Moving the thumb horizontally adjusts
     * saturation and moving it vertically adjusts value (essentially, brightness).
     * @defaultvalue 'Use left and right arrow keys to set saturation. Use up and down arrow keys to set brightness.'
     */
    ariaDescription?: string;
    /**
     * Minimum width and height.
     */
    minSize?: number;
    /**
     * Additional CSS class(es) to apply to the ColorRectangle.
     */
    className?: string;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IColorRectangleStyleProps, IColorRectangleStyles>;
    /**
     * Callback for when the color changes.
     */
    onChange?: (ev: React_2.MouseEvent | React_2.KeyboardEvent, color: IColor) => void;
}

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorRectangleStyleProps {
    /**
     * Theme (provided through customization).
     */
    theme: ITheme;
    /**
     * Additional CSS class(es) to apply to the ColorRectangle.
     */
    className?: string;
    /**
     * Minimum width and height.
     */
    minSize?: number;
}

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorRectangleStyles {
    /**
     * Style set for the root element.
     */
    root?: IStyle;
    /**
     * Style set for the light-colored rectangle.
     */
    light?: IStyle;
    /**
     * Style set for the dark-colored rectangle.
     */
    dark?: IStyle;
    /**
     * Style set for the draggable thumb element.
     */
    thumb?: IStyle;
    /**
     * Style for a hidden detailed description for screen reader users.
     */
    description?: IStyle;
}

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorSlider {
    /** Current value of the slider. */
    value: number;
}

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorSliderProps {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IColorSlider>;
    /**
     * Minimum value of the slider.
     * @deprecated Will always be 0
     */
    minValue?: number;
    /**
     * Maximum value of the slider.
     * @deprecated Will be 100 for alpha or transparency sliders, or 359 for hue sliders.
     */
    maxValue?: number;
    /**
     * Current value of the slider.
     */
    value?: number;
    /**
     * Label of the ColorSlider for the benefit of screen reader users.
     */
    ariaLabel?: string;
    /**
     * Type of slider to display.
     * @defaultvalue 'hue'
     */
    type?: 'hue' | 'alpha' | 'transparency';
    /**
     * If true, the slider represents an alpha slider and will display a gray checkered pattern
     * in the background. Otherwise, the slider represents a hue slider.
     * @defaultvalue false
     * @deprecated Use `type`
     */
    isAlpha?: boolean;
    /**
     * Hex color to use when rendering an alpha or transparency slider's overlay, *without* the `#`.
     */
    overlayColor?: string;
    /**
     * CSS-compatible string for the color of the thumb element.
     * @deprecated Not used. Use `styles.sliderThumb` instead.
     */
    thumbColor?: string;
    /**
     * Custom style for the overlay element.
     * @deprecated Use `overlayColor` instead
     */
    overlayStyle?: React_2.CSSProperties;
    /**
     * Callback issued when the value changes.
     */
    onChange?: (event: React_2.MouseEvent | React_2.KeyboardEvent, newValue?: number) => void;
    /**
     * Additional CSS class(es) to apply to the ColorSlider.
     */
    className?: string;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IColorSliderStyleProps, IColorSliderStyles>;
}

/**
 * {@docCategory ColorPicker}
 */
export declare type IColorSliderStyleProps = Required<Pick<IColorSliderProps, 'theme'>> & Pick<IColorSliderProps, 'className' | 'type'> & {
    /**
     * @deprecated Use `type`
     */
    isAlpha?: boolean;
};

/**
 * {@docCategory ColorPicker}
 */
export declare interface IColorSliderStyles {
    /**
     * Style set for the root element.
     */
    root?: IStyle;
    /**
     * Style set for the draggable thumb element.
     */
    sliderThumb?: IStyle;
    /**
     * Style set for the overlay element.
     */
    sliderOverlay?: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumn {
    /** A unique key for identifying the column. */
    key: string;
    /** Name to render on the column header. */
    name: string;
    /**
     * The field to pull the text value from for the column.
     * Can be unset if a custom `onRender` method is provided.
     */
    fieldName?: string;
    /**
     * If specified, the width of the column is a portion of the available space equal to this value divided by the sum
     * of all proportional column widths in the list. For example, if there is a list with two proportional columns that
     * have widths of 1 and 3, they will respectively occupy (1/4) = 25% and (3/4) = 75% of the remaining space. Note that
     * this relies on viewport measures and will not work well with skipViewportMeasures.
     */
    flexGrow?: number;
    /** Class name to apply to the column cell within each row. */
    className?: string;
    /** Custom overrides to the themed or default styles. */
    styles?: IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>;
    /** Minimum width for the column. */
    minWidth: number;
    /**
     * If specified, the width of the column is a portion of the available space equal to this value divided by the sum
     * of all proportional column widths in the list. For example, if there is a list with two proportional columns that
     * have widths of 1 and 3, they will respectively occupy (1/4) = 25% and (2/4) = 75% of the remaining space. Note that
     * this relies on viewport measures and will not work well with skipViewportMeasures.
     */
    targetWidthProportion?: number;
    /**
     * Accessible label for the column. The column name will still be used as the primary label,
     * but this text (if specified) will be used as the column description.
     * WARNING: grid column descriptions are often ignored by screen readers, so any necessary information
     * should go directly in the column content
     */
    ariaLabel?: string;
    /** Whether the column is a header for the given row. There should be only one column with this set to true. */
    isRowHeader?: boolean;
    /** Maximum width for the column, if stretching is allowed in justified scenarios. */
    maxWidth?: number;
    /**
     * Defines how the column's header should render.
     * @defaultvalue ColumnActionsMode.clickable
     */
    columnActionsMode?: ColumnActionsMode;
    /** Custom icon to use in the column header. */
    iconName?: string;
    /**
     * Whether only the icon should be displayed in the column header.
     * If true, the column name and dropdown chevron will not be displayed.
     */
    isIconOnly?: boolean;
    /** Class name for the icon within the header. */
    iconClassName?: string;
    /**
     * If true, allow the column to be collapsed when rendered in justified layout.
     * @deprecated Use `isCollapsible`
     */
    isCollapsable?: boolean;
    /** If true, allow the column to be collapsed when rendered in justified layout. */
    isCollapsible?: boolean;
    /** If true, column header will render an icon indicating column is sortable while unsorted */
    showSortIconWhenUnsorted?: boolean;
    /** Determines if the column is currently sorted. Renders a sort arrow in the column header. */
    isSorted?: boolean;
    /** Determines if the sort arrow is pointed down (descending) or up. */
    isSortedDescending?: boolean;
    /** Determines if the column can be resized. */
    isResizable?: boolean;
    /** Determines if the column can render multi-line text. */
    isMultiline?: boolean;
    /** Custom renderer for cell content, instead of the default text rendering. */
    onRender?: (item?: any, index?: number, column?: IColumn) => any;
    /** Custom override for the parent list's `getCellValueKey`. */
    getValueKey?: (item?: any, index?: number, column?: IColumn) => string;
    onRenderField?: IRenderFunction<IDetailsColumnFieldProps>;
    /** Custom renderer for column header divider. */
    onRenderDivider?: IRenderFunction<IDetailsColumnProps>;
    /** Custom renderer for filter icon. */
    onRenderFilterIcon?: IRenderFunction<IDetailsColumnFilterIconProps>;
    /** Custom renderer for column header content, instead of the default text rendering. */
    onRenderHeader?: IRenderFunction<IDetailsColumnProps>;
    /** Whether the list is filtered by this column. If true, shows a filter icon next to this column's name. */
    isFiltered?: boolean;
    /** Callback for when the user clicks on the column header. */
    onColumnClick?: (ev: React_2.MouseEvent<HTMLElement>, column: IColumn) => void;
    /** Callback for when the user opens the column header context menu. */
    onColumnContextMenu?: (column?: IColumn, ev?: React_2.MouseEvent<HTMLElement>) => void;
    /**
     * Callback for when the column is resized (`width` is the current width).
     *
     * Prefer this over `DetailsList`'s `onColumnResize` if you require the `IColumn` to report its width
     * after every resize event. Consider debouncing the callback if resize events occur frequently.
     */
    onColumnResize?: (width?: number) => void;
    /** Whether the list is grouped by this column. If true, shows a grouped icon next to this column's name. */
    isGrouped?: boolean;
    /** Arbitrary data passthrough which can be used by the caller. */
    data?: any;
    /** Internal only value. */
    calculatedWidth?: number;
    /**
     * Internal only value.
     * Remembers the actual width of the column in any case.
     * `calculatedWidth` is only saved when it's defined by user, not for justified calculations.
     */
    currentWidth?: number;
    /** Class name to apply to the column header cell. */
    headerClassName?: string;
    /** If true, add additional LTR padding-right to column and cells. */
    isPadded?: boolean;
    /**
     * Accessible label for indicating that the list is sorted by this column in ascending order.
     * This will be read after the main column header label.
     */
    sortAscendingAriaLabel?: string;
    /**
     * Accessible label for indicating that the list is sorted by this column in descending order.
     * This will be read after the main column header label.
     */
    sortDescendingAriaLabel?: string;
    /**
     * Accessible label for indicating that the list could be sorted by this column but isn't currently.
     * This will be read after the main column header label.
     */
    sortableAriaLabel?: string;
    /** Accessible label for the status of this column when grouped. */
    groupAriaLabel?: string;
    /** Accessible label for the status of this column when filtered. */
    filterAriaLabel?: string;
    /** Whether a dropdown menu is open so that the appropriate ARIA attributes are rendered. */
    isMenuOpen?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumnDragDropDetails {
    /**
     * Specifies the source column index
     * @defaultvalue -1
     */
    draggedIndex: number;
    /**
     * Specifies the target column index
     * @defaultvalue -1
     */
    targetIndex: number;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumnReorderHeaderProps extends IColumnReorderOptions {
    /** Callback to notify the column dragEnd event to List
     * Need this to check whether the dragEnd has happened on
     * corresponding list or outside of the list
     */
    onColumnDragEnd?: (props: {
        dropLocation?: ColumnDragEndLocation;
    }, event: MouseEvent) => void;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumnReorderOptions {
    /**
     * Specifies the number fixed columns from left
     * @defaultvalue 0
     */
    frozenColumnCountFromStart?: number;
    /**
     * Specifies the number fixed columns from right
     * @defaultvalue 0
     */
    frozenColumnCountFromEnd?: number;
    /**
     * Callback to handle when dragging on this column's DetailsHeader has started.
     */
    onColumnDragStart?: (dragStarted: boolean) => void;
    /**
     * Callback to handle column reordering.
     * `draggedIndex` is the source column index, which should be placed at `targetIndex`.
     * @deprecated Use `onColumnDrop` instead.
     */
    handleColumnReorder?: (draggedIndex: number, targetIndex: number) => void;
    /**
     * Callback to handle column reordering.
     * `draggedIndex` is the source column index, which should be placed at `targetIndex`.
     */
    onColumnDrop?: (dragDropDetails: IColumnDragDropDetails) => void;
    /**
     * Callback to handle when dragging on this column's DetailsHeader has finished.
     */
    onDragEnd?: (columnDropLocationDetails: ColumnDragEndLocation) => void;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IColumnResizeDetails {
    columnIndex: number;
    originX?: number;
    columnMinWidth: number;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBox {
    /**
     * All selected options.
     */
    readonly selectedOptions: IComboBoxOption[];
    /**
     * If there is a menu open, this will dismiss it.
     */
    dismissMenu: () => void;
    /**
     * Sets focus to the input in the ComboBox.
     * @param shouldOpenOnFocus - Whether to open the menu when the input gets focus
     * @param useFocusAsync - Whether to focus the input asynchronously
     */
    focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): void;
}

export declare interface IComboBoxClassNames {
    container: string;
    label: string;
    root: string;
    input: string;
    errorMessage: string;
    callout: string;
    optionsContainer: string;
    header: string;
    divider: string;
    optionsContainerWrapper: string;
    screenReaderText: string;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBoxOption extends ISelectableOption {
    /**
     * Specific styles for each ComboBox option. To give common styles to all options, use
     * `IComboBoxProps.comboBoxOptionStyles` instead.
     */
    styles?: Partial<IComboBoxOptionStyles>;
    /**
     * Whether to use the `ariaLabel` prop instead of the `text` prop to set the preview text as well
     * as the `aria-label`. This is for scenarios where the `text` prop is used for embedded data.
     */
    useAriaLabelAsText?: boolean;
}

export declare interface IComboBoxOptionClassNames {
    optionText: string;
    root: string;
    optionTextWrapper: string;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBoxOptionStyles extends IButtonStyles {
    /**
     * Styles for the text inside the ComboBox option. This should be used instead of the description
     * in IButtonStyles because we custom render the text in the ComboBox options.
     */
    optionText: IStyle;
    /**
     * Styles for the ComboBox option text's wrapper.
     */
    optionTextWrapper: IStyle;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBoxProps extends ISelectableDroppableTextProps<IComboBox, IComboBox>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional ref to access the `IComboBox` interface. Use this instead of `ref` for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IComboBox>;
    /**
     * Collection of options for this ComboBox.
     */
    options: IComboBoxOption[];
    /**
     * Called when a ComboBox item is clicked.
     */
    onItemClick?: (event: React_2.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => void;
    /**
     * Called when either:
     * 1) The selected option changes.
     * 2) A manually edited value is submitted. In this case there may not be a matched option if `allowFreeform`
     *    is also true (and hence only `value` would be provided; the other parameters would be unspecified).
     *
     * The value passed to the callback (4th paramenter) reflects the changed option's text, or the user-typed input when
     * freeform is allowed.
     */
    onChange?: (event: React_2.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => void;
    /**
     * Called when the user changes the pending value in ComboBox, either by typing in the
     * input or hovering over options. When typing, the behavior varies depending on `autoComplete`
     * and `allowFreeform` settings.
     *
     * In all cases, when the pending value is reset, all parameters will be undefined.
     *
     * When hovering options: `option` and `index` will be provided, and `value` will be undefined.
     *
     * Typing with `allowFreeform` on: If there's an option matching the input (an exact match if
     * `autoComplete` is off, or a prefix match otherwise), `option` and `index` are provided and
     * `value` is undefined. Otherwise only `value` is provided.
     *
     * Typing with `allowFreeform` off (or unspecified): If `autoComplete` is on (or unspecified),
     * and the user types text matching the start of an option within a timeout, `option` and `index`
     * are provided and `value` is undefined. If `autoComplete` is off, typing does nothing.
     *
     * If you simply want to be notified of raw text input, use the prop `onInputValueChange`.
     */
    onPendingValueChanged?: (option?: IComboBoxOption, index?: number, value?: string) => void;
    /**
     * Called when the user types in to the input of the combo box
     *
     * Ideal if you want to be notified of raw text input
     */
    onInputValueChange?: (text: string) => void;
    /**
     * Called when the ComboBox menu is launched.
     */
    onMenuOpen?: () => void;
    /**
     * Called when the ComboBox menu is dismissed.
     */
    onMenuDismissed?: () => void;
    /**
     * Called before the menu gets dismissed.
     */
    onMenuDismiss?: () => void;
    /**
     * Called when the options should be resolved, if they have been updated or
     * if they need to be passed in the first time.
     */
    onResolveOptions?: (options: IComboBoxOption[]) => IComboBoxOption[] | PromiseLike<IComboBoxOption[]>;
    /**
     * Called when the ComboBox requests the list to scroll to a specific element.
     */
    onScrollToItem?: (itemIndex: number) => void;
    /**
     * Whether the ComboBox allows freeform user input, rather than restricting to the provided options.
     */
    allowFreeform?: boolean;
    /**
     * When true, the Combobox will allow the user to type freely while the Combobox is focused.
     * On Blur, the value will be set to the matching option, or the previous selection if there is no match.
     * @defaultvalue false
     */
    allowFreeInput?: boolean;
    /**
     * Whether the ComboBox auto completes. As the user is entering text, potential matches will be
     * suggested from the list of options. If the ComboBox is expanded, this will also scroll to the
     * suggested option and give it a selected style.
     *
     * @defaultvalue "on"
     */
    autoComplete?: 'on' | 'off';
    /**
     * Value to show in the input. Does not have to map to an option.
     */
    text?: string;
    /**
     * When multiple items are selected, this will be used to separate values in the ComboBox input.
     *
     * @defaultvalue ", "
     */
    multiSelectDelimiter?: string;
    /**
     * The IconProps to use for the caret down (expand) button of the ComboBox.
     */
    buttonIconProps?: IIconProps;
    /**
     * Props to pass through to the Autofill component (the input field) inside the ComboBox.
     * WARNING: These props (except the callbacks) may override ComboBox's defaults and cause issues.
     */
    autofill?: IAutofillProps;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Custom styles for this component.
     */
    styles?: Partial<IComboBoxStyles>;
    /**
     * Custom function for providing the classNames for the ComboBox. Can be used to provide
     * all styles for the component instead of applying them on top of the default styles.
     */
    getClassNames?: (theme: ITheme, isOpen: boolean, disabled: boolean, required: boolean, focused: boolean, allowFreeForm: boolean, hasErrorMessage: boolean, className?: string) => IComboBoxClassNames;
    /**
     * Styles for the caret down (expand) button.
     */
    caretDownButtonStyles?: Partial<IButtonStyles>;
    /**
     * Default styles that should be applied to ComboBox options.
     */
    comboBoxOptionStyles?: Partial<IComboBoxOptionStyles>;
    /**
     * If the options list is scrollable, whether to position the selected option at the top of the
     * callout when it is opened (unless it has reached the end of the scrollbar).
     * @defaultvalue false;
     */
    scrollSelectedToTop?: boolean;
    /**
     * Add additional content above the option list in the callout. Content should not include interactive items.
     */
    onRenderUpperContent?: IRenderFunction<IComboBoxProps>;
    /**
     * Add additional content below the option list in the callout. Content should not include interactive items.
     */
    onRenderLowerContent?: IRenderFunction<IComboBoxProps>;
    /**
     * Custom width for options list dropdown. Mutually exclusive with `useComboBoxAsMenuWidth`.
     */
    dropdownWidth?: number;
    /**
     * Whether to use the ComboBox field width as the menu's width.
     * Mutually exclusive with `dropdownWidth`.
     */
    useComboBoxAsMenuWidth?: boolean;
    /**
     * Custom max width for the options list dropdown.
     */
    dropdownMaxWidth?: number;
    /**
     * Whether to hide the ComboBox's caret (expand) button element from screen readers. This is false
     * (exposed to AT) by default because Android Talkback cannot otherwise expand the combobox.
     * @defaultvalue false
     */
    isButtonAriaHidden?: boolean;
    /**
     * Optional ID of an element providing a description of the ComboBox for screen reader users.
     */
    ariaDescribedBy?: string;
    /**
     * Whether to show/hide the menu when it's opened/closed (rather than creating/destroying it).
     * This will improve perf of the menu opening but could potentially have a negative impact on
     * overall perf by increasing initial render time (since the ComboBox will render the menu hidden
     * on mount) and keeping more elements in the DOM. Should only be used when perf to open/close
     * the menu is important.
     *
     * Note: This may increase the amount of time it takes for the ComboBox itself to mount.
     */
    persistMenu?: boolean;
    /**
     * Whether the options list callout should restore focus after being dismissed. Set to false to
     * prevent the menu from trying to re-focus the element that had focus before the menu was opened.
     * @defaultvalue true;
     */
    shouldRestoreFocus?: boolean;
    /**
     * Additional props for the caret down (expand) button.
     */
    iconButtonProps?: IButtonProps;
    /**
     * Custom render function for the label text.
     */
    onRenderLabel?: IRenderFunction<IOnRenderComboBoxLabelProps>;
}

export declare interface IComboBoxState {
    /** The open state */
    isOpen?: boolean;
    /** The focused state of the combo box */
    focusState?: 'none' | 'focused' | 'focusing';
    /**
     * When taking input, this will store the index that the options input matches
     * (-1 if no input or match)
     */
    currentPendingValueValidIndex: number;
    /**
     * Stores the hovered over value in the dropdown
     * (used for styling the options without updating the input)
     */
    currentPendingValueValidIndexOnHover: number;
    /** When taking input, this will store the actual text that is being entered */
    currentPendingValue?: string;
    /**
     * The id of the current focused combo item, otherwise the id of the currently selected element,
     * null otherwise
     */
    ariaActiveDescendantValue?: string;
}

/**
 * {@docCategory ComboBox}
 */
export declare interface IComboBoxStyles {
    /**
     * Style for the container which has the ComboBox and the label.
     * (In most other components this would be called `root`.)
     */
    container: IStyle;
    /**
     * Style for the label element of the ComboBox.
     */
    label: IStyle;
    /**
     * Style for the label element of the ComboBox in the disabled state.
     */
    labelDisabled: IStyle;
    /**
     * Base styles for the wrapper element containing the input field and caret button, applied to
     * all state variants.
     *
     * Unlike in most components, this is NOT the actual root element which also contains the label
     * as well as the field; for that, use `container`.
     */
    root: IStyle;
    /**
     * Styles for the wrapper element containing the input field and caret button, applied when
     * the ComboBox has an error message.
     */
    rootError: IStyle;
    /**
     * Styles for the wrapper element containing the input field and caret button, applied when
     * `IComboBoxProps.allowFreeform` is false.
     */
    rootDisallowFreeForm: IStyle;
    /**
     * Styles for the wrapper element containing the input field and caret button, applied any time
     * the ComboBox is hovered (unless it's disabled).
     */
    rootHovered: IStyle;
    /**
     * Styles for the wrapper element containing the input field and caret button, applied any time
     * the ComboBox is active (unless it's disabled).
     */
    rootPressed: IStyle;
    /**
     * Styles for the wrapper element containing the input field and caret button, applied any time
     * the ComboBox is focused (unless it's disabled).
     */
    rootFocused: IStyle;
    /**
     * Styles for the wrapper element containing the input field and caret button, applied when the
     * ComboBox is disabled. These override all the other styles.
     *
     * NOTE: Hover/focused/active styles are not applied for disabled ComboBoxes.
     */
    rootDisabled: IStyle;
    /**
     * Base styles for the input element which contains the currently selected option.
     */
    input: IStyle;
    /**
     * Style override for the input element when ComboBox is disabled.
     */
    inputDisabled: IStyle;
    /**
     * Styles for the error message text of the ComboBox.
     */
    errorMessage: IStyle;
    /**
     * Styles for the callout.
     */
    callout: IStyle;
    /**
     * Styles for the options list container element.
     */
    optionsContainerWrapper: IStyle;
    /**
     * Styles for the container of all the ComboBox options.
     * Includes the headers and dividers.
     */
    optionsContainer: IStyle;
    /**
     * Styles for a header in the options.
     */
    header: IStyle;
    /**
     * Styles for a divider in the options.
     */
    divider: IStyle;
    /**
     * Styles for hidden screen reader text.
     */
    screenReaderText: IStyle;
}

/**
 * {@docCategory CommandBar}
 */
export declare interface ICommandBar {
    /**
     * Sets focus to the active command in the list.
     */
    focus(): void;
    /**
     * Remeasures the available space.
     */
    remeasure(): void;
}

export declare interface ICommandBarData {
    /**
     * Items being rendered in the primary region
     */
    primaryItems: ICommandBarItemProps[];
    /**
     * Items being rendered in the overflow
     */
    overflowItems: ICommandBarItemProps[];
    /**
     * Items being rendered on the far side
     */
    farItems: ICommandBarItemProps[] | undefined;
    /**
     * Length of original overflowItems to ensure that they are not moved into primary region on resize
     */
    minimumOverflowItems: number;
    /**
     * Unique string used to cache the width of the command bar
     */
    cacheKey: string;
}

/**
 * ICommandBarItemProps extends IContextualMenuItem and adds a few CommandBar-specific props.
 * {@docCategory CommandBar}
 */
export declare interface ICommandBarItemProps extends IContextualMenuItem {
    /**
     * Show only an icon for this item, not text.
     * Does not apply if item is in the overflow.
     * @defaultvalue false
     */
    iconOnly?: boolean;
    /**
     * Props for the tooltip when in `iconOnly` mode.
     */
    tooltipHostProps?: ITooltipHostProps;
    /**
     * Custom styles for individual button
     */
    buttonStyles?: IButtonStyles;
    /**
     * A custom cache key to be used for this item. If `cacheKey` is changed, the cache will invalidate.
     * Defaults to `key` value.
     */
    cacheKey?: string;
    /**
     * Context under which the item is being rendered.
     * This value is mutated by the CommandBar and is useful for adjusting the `onRender` function.
     */
    renderedInOverflow?: boolean;
    /**
     * Method to override the render of the individual command bar button.
     * Not used when item is rendered in overflow.
     * @defaultvalue CommandBarButton
     */
    commandBarButtonAs?: IComponentAs<ICommandBarItemProps>;
}

/**
 * {@docCategory CommandBar}
 */
export declare interface ICommandBarProps extends React_2.HTMLAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the ICommandBar interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ICommandBar>;
    /**
     * Items to render. ICommandBarItemProps extends IContextualMenuItem.
     */
    items: ICommandBarItemProps[];
    /**
     * Items to render on the right side (or left, in RTL). ICommandBarItemProps extends IContextualMenuItem.
     */
    farItems?: ICommandBarItemProps[];
    /**
     * Default items to have in the overflow menu. ICommandBarItemProps extends IContextualMenuItem.
     */
    overflowItems?: ICommandBarItemProps[];
    /**
     * Props to be passed to overflow button.
     * If `menuProps` are passed through this prop, any items provided will be prepended to any
     * computed overflow items.
     */
    overflowButtonProps?: IButtonProps;
    /**
     * Custom component for the ResizeGroup.
     */
    resizeGroupAs?: IComponentAs<IResizeGroupProps>;
    /**
     * Custom component for the overflow button.
     */
    overflowButtonAs?: IComponentAs<IButtonProps>;
    /**
     * Custom component for the near and far item buttons. Not used for overflow menu items.
     */
    buttonAs?: IComponentAs<IButtonProps>;
    /**
     * When true, items will be 'shifted' off the front of the array when reduced, and unshifted during grow.
     */
    shiftOnReduce?: boolean;
    /**
     * Custom function to reduce data if items do not fit in a given space.
     * Return `undefined` if no more steps can be taken to avoid an infinite loop.
     */
    onReduceData?: (data: ICommandBarData) => ICommandBarData | undefined;
    /**
     * Custom function to grow data if items are too small for the given space.
     * Return `undefined` if no more steps can be taken to avoid an infinite loop.
     */
    onGrowData?: (data: ICommandBarData) => ICommandBarData | undefined;
    /**
     * Callback invoked when data has been reduced.
     */
    onDataReduced?: (movedItem: ICommandBarItemProps) => void;
    /**
     * Callback invoked when data has been grown.
     */
    onDataGrown?: (movedItem: ICommandBarItemProps) => void;
    /**
     * Function to be called every time data is rendered. It provides the data that was actually rendered.
     * A use case would be adding telemetry when a particular control is shown in an overflow or dropped
     * as a result of `onReduceData`, or to count the number of renders that an implementation of
     * `onReduceData` triggers.
     */
    dataDidRender?: (renderedData: any) => void;
    /**
     * Additional css class to apply to the command bar
     */
    className?: string;
    /**
     * Accessibility text to be read by the screen reader when the user's
     * focus enters the command bar. The screen reader will read this text
     * after reading information about the first focusable item in the command bar.
     */
    ariaLabel?: string;
    /**
     * When using farItems, primaryGroupAriaLabel and farItemsGroupAriaLabel function as
     * labels for each group that are exposed to screen reader users.
     * This helps clarify when a screen reader user is entering or leaving each group.
     */
    primaryGroupAriaLabel?: string;
    /**
     * When using farItems, primaryGroupAriaLabel and farItemsGroupAriaLabel function as
     * labels for each group that are exposed to screen reader users.
     * This helps clarify when a screen reader user is entering or leaving each group.
     */
    farItemsGroupAriaLabel?: string;
    /**
     * Customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ICommandBarStyleProps, ICommandBarStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
}

/**
 * {@docCategory CommandBar}
 */
export declare interface ICommandBarStyleProps {
    theme: ITheme;
    className?: string;
}

/**
 * {@docCategory CommandBar}
 */
export declare interface ICommandBarStyles {
    root?: IStyle;
    primarySet?: IStyle;
    secondarySet?: IStyle;
}

export { IComponentAs }

export { IComponentAsProps }

/**
 * Legacy Icon component which can be targeted by customization. It's recommended to use `FontIcon`
 * or `ImageIcon` instead, especially in scenarios where rendering performance is important.
 * {@docCategory Icon}
 */
export declare const Icon: React_2.FunctionComponent<IIconProps>;

export declare class IconBase extends React_2.Component<IIconProps, IIconState> {
    constructor(props: IIconProps);
    render(): JSX.Element;
    private _onImageLoadingStateChange;
}

/**
 * {@docCategory Button}
 */
export declare class IconButton extends React_2.Component<IButtonProps, {}> {
    render(): JSX.Element;
}

export { IconFontSizes }

export { IconNames }

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenu {
}

/**
 * @deprecated Deprecated in favor of mergeStyles API.
 */
export declare interface IContextualMenuClassNames {
    container?: string;
    root?: string;
    list?: string;
    header?: string;
    title?: string;
    subComponentStyles?: IContextualMenuSubComponentStyles;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuItem {
    /**
     * Optional callback to access the IContextualMenuRenderItem interface.
     * This will get passed down to ContextualMenuItem.
     */
    componentRef?: IRefObject<IContextualMenuRenderItem>;
    /**
     * Unique id to identify the item
     */
    key: string;
    /**
     * Text of the menu item.
     * If a standard hyphen (-) is passed in, then the item will be rendered as a divider.
     * If a dash must appear as text, use an emdash (—), figuredash (‒), or minus symbol (−) instead.
     */
    text?: string;
    /**
     * Secondary description for the menu item to display
     */
    secondaryText?: string;
    itemType?: ContextualMenuItemType;
    /**
     * Props for an icon to display next to the item.
     */
    iconProps?: IIconProps;
    /**
     * Custom render function for the menu item icon.
     * iconProps must be present on at least one item for onRenderIcon to be called.
     */
    onRenderIcon?: IRenderFunction<IContextualMenuItemProps>;
    /**
     * Props for the Icon used for the chevron.
     */
    submenuIconProps?: IIconProps;
    /**
     * Whether the menu item is disabled
     * @defaultvalue false
     */
    disabled?: boolean;
    /**
     * If the menu item is a split button, this prop disables purely the primary action of the button.
     * @defaultvalue false
     */
    primaryDisabled?: boolean;
    /**
     * @deprecated Not used
     */
    shortCut?: string;
    /**
     * Whether or not this menu item can be checked
     * @defaultvalue false
     */
    canCheck?: boolean;
    /**
     * Whether or not this menu item is currently checked.
     * @defaultvalue false
     */
    checked?: boolean;
    /**
     * Whether or not this menu item is a splitButton.
     * @defaultvalue false
     */
    split?: boolean;
    /**
     * Any custom data the developer wishes to associate with the menu item.
     */
    data?: any;
    /**
     * Callback for when the menu item is invoked. If `ev.preventDefault()` is called in `onClick`,
     * the click will not close the menu.
     *
     * Only for ContextualMenu items, returning true will dismiss the menu even if `ev.preventDefault()`
     * was called (does not apply for button or CommandBar sub-menu items).
     */
    onClick?: (ev?: React_2.MouseEvent<HTMLElement> | React_2.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean | void;
    /**
     * Navigate to this URL when the menu item is clicked.
     */
    href?: string;
    /**
     * Target window when using `href`.
     */
    target?: string;
    /**
     * Link relation setting when using `href`.
     * If `target` is `_blank`, `rel` is defaulted to a value to prevent clickjacking.
     */
    rel?: string;
    /**
     * Properties to apply to a submenu to this item.
     *
     * The ContextualMenu will provide default values for `target`, `onDismiss`, `isSubMenu`,
     * `id`, `shouldFocusOnMount`, `directionalHint`, `className`, and `gapSpace`, all of which
     * can be overridden.
     */
    subMenuProps?: IContextualMenuProps;
    /**
     * Method to provide the classnames to style the individual items inside a menu.
     * @deprecated Use `styles` prop of `IContextualMenuItemProps` to leverage mergeStyles API.
     */
    getItemClassNames?: (theme: ITheme, disabled: boolean, expanded: boolean, checked: boolean, isAnchorLink: boolean, knownIcon: boolean, itemClassName?: string, dividerClassName?: string, iconClassName?: string, subMenuClassName?: string, primaryDisabled?: boolean) => IMenuItemClassNames;
    /**
     * Optional IContextualMenuItemProps overrides to customize behaviors such as item styling via `styles`.
     */
    itemProps?: Partial<IContextualMenuItemProps>;
    /**
     * Method to provide the classnames to style the Vertical Divider of a split button inside a menu.
     * Default value is the `getSplitButtonVerticalDividerClassNames` func defined in `ContextualMenu.classnames.ts`.
     * @defaultvalue getSplitButtonVerticalDividerClassNames
     */
    getSplitButtonVerticalDividerClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
    /**
     * Properties to apply to render this item as a section.
     * This prop is mutually exclusive with `subMenuProps`.
     */
    sectionProps?: IContextualMenuSection;
    /**
     * Additional CSS class to apply to the menu item.
     */
    className?: string;
    /**
     * Additional styles to apply to the menu item
     * @deprecated Use `styles` instead to leverage mergeStyles API.
     */
    style?: React_2.CSSProperties;
    /**
     * Custom accessible label for the element.
     * If no override is specified, the `aria-label` attribute will contain the item name.
     */
    ariaLabel?: string;
    /**
     * Title (tooltip) text displayed when hovering over an item.
     */
    title?: string;
    /**
     * Method to custom render this menu item.
     * For keyboard accessibility, the top-level rendered item should be a focusable element
     * (like an anchor or a button) or have the `data-is-focusable` property set to true.
     *
     * @param item - Item to render. Will typically be of type `IContextualMenuItem`.
     * (When rendering a command bar item, will be `ICommandBarItemProps`.)
     * @param dismissMenu - Function to dismiss the menu. Can be used to ensure that a custom menu
     * item click dismisses the menu. (Will be undefined if rendering a command bar item.)
     */
    onRender?: (item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void) => React_2.ReactNode;
    /**
     * Method to customize sub-components rendering of this menu item.
     *
     * @param props - Props used to pass into render functions
     * @param defaultRenders - Default render functions that renders default sub-components
     */
    onRenderContent?: (props: IContextualMenuItemProps, defaultRenders: IContextualMenuItemRenderFunctions) => React_2.ReactNode;
    /**
     * A function to be executed on mouse down. This is executed before an `onClick` event and can
     * be used to interrupt native on click events as well. The click event should still handle
     * the commands. This should only be used in special cases when react and non-react are mixed.
     */
    onMouseDown?: (item: IContextualMenuItem, event: React_2.MouseEvent<HTMLElement>) => void;
    /**
     * Optional override for the menu button's role.
     * @default `menuitem` or `menuitemcheckbox`
     */
    role?: string;
    /**
     * When rendering a custom menu component that is passed in, the component might also be a list of
     * elements. We want to keep track of the correct index our menu is using based off of
     * the length of the custom list. It is up to the user to increment the count for their list.
     */
    customOnRenderListLength?: number;
    /**
     * Keytip for this contextual menu item
     */
    keytipProps?: IKeytipProps;
    /**
     * @deprecated Use subMenuProps.items instead.
     */
    items?: IContextualMenuItem[];
    /**
     * Any additional properties to use when custom rendering menu items.
     */
    [propertyName: string]: any;
    /**
     * Detailed description of the menu item for the benefit of screen readers.
     */
    ariaDescription?: string;
    /**
     * ID of the element that contains additional detailed descriptive information for screen readers
     */
    ariaDescribedBy?: string;
    /**
     * @deprecated No longer used. All contextual menu items are now focusable when disabled.
     */
    inactive?: boolean;
    /**
     * Text of the menu item.
     * @deprecated Use `text` instead.
     */
    name?: string;
    /**
     * Flag which indicates that, when the item is clicked, the 'target' for the click event should be
     * overridden to reflect the launch target from the root menu.
     * This avoids a situation where the 'target' of the event may wind up detached from the DOM
     * when the menu is dismissed in response to the click.
     */
    preferMenuTargetAsEventTarget?: boolean;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuItemProps extends React_2.HTMLAttributes<IContextualMenuItemProps> {
    /**
     * Optional callback to access the IContextualMenuRenderItem interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IContextualMenuRenderItem>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IContextualMenuItemStyleProps, IContextualMenuItemStyles>;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the ContextualMenuItem
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * The item to display
     */
    item: IContextualMenuItem;
    /**
     * Classnames for different aspects of a menu item
     */
    classNames: IMenuItemClassNames;
    /**
     * Index of the item
     */
    index: number;
    /**
     * If this item has icons
     */
    hasIcons: boolean | undefined;
    /**
     * Click handler for the checkmark
     */
    onCheckmarkClick?: (item: IContextualMenuItem, ev: React_2.MouseEvent<HTMLElement>) => void;
    /**
     * This prop will get set by ContextualMenu and can be called to open this item's subMenu, if present.
     */
    openSubMenu?: (item: any, target: HTMLElement) => void;
    /**
     * This prop will get set by ContextualMenu and can be called to close this item's subMenu, if present.
     */
    dismissSubMenu?: () => void;
    /**
     * This prop will get set by ContextualMenu and can be called to close the menu this item belongs to.
     * If dismissAll is true, all menus will be closed.
     */
    dismissMenu?: (ev?: any, dismissAll?: boolean) => void;
    /**
     * This prop will get set by the wrapping component and will return the element that wraps this ContextualMenuItem.
     * Used for openSubMenu.
     */
    getSubmenuTarget?: () => HTMLElement | undefined;
}

export declare interface IContextualMenuItemRenderFunctions {
    /**
     * Rendering function for check mark icon
     */
    renderCheckMarkIcon: (props: IContextualMenuItemProps, customClassNames?: string[]) => React_2.ReactNode;
    /**
     * Rendering function for item icon
     */
    renderItemIcon: (props: IContextualMenuItemProps, customClassNames?: string[]) => React_2.ReactNode;
    /**
     * Rendering function for item label
     */
    renderItemName: (props: IContextualMenuItemProps, customClassNames?: string[]) => React_2.ReactNode;
    /**
     * Rendering function for secondary text label
     */
    renderSecondaryText: (props: IContextualMenuItemProps, customClassNames?: string[]) => React_2.ReactNode;
    /**
     * Rendering function for submenu icon
     */
    renderSubMenuIcon: (props: IContextualMenuItemProps, customClassNames?: string[]) => React_2.ReactNode;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuItemRenderProps extends IContextualMenuItem {
    index: number;
    focusableElementIndex: number;
    totalItemCount: number;
    hasCheckmarks: boolean;
    hasIcons: boolean;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuItemStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * Whether or not the menu item is disabled.
     */
    disabled: boolean;
    /**
     * Whether or not the menu item is expanded.
     */
    expanded: boolean;
    /**
     * Whether or not the menu item is checked.
     */
    checked: boolean;
    /**
     * Indicates if a menu item is an anchor link.
     */
    isAnchorLink: boolean;
    /**
     * Indicates if the icon used is of the known set of icons.
     */
    knownIcon: boolean;
    /**
     * The optional class name to apply to the item element.
     */
    itemClassName?: string;
    /**
     * The optional class name to apply to the divider element.
     */
    dividerClassName?: string;
    /**
     * The optional class name to apply to the icon element.
     */
    iconClassName?: string;
    /**
     * The optional class name to apply to the sub-menu if present.
     */
    subMenuClassName?: string;
    /**
     * Whether or not the primary section of a split menu item is disabled.
     */
    primaryDisabled?: boolean;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuItemStyles extends IButtonStyles {
    /**
     * Style for the root element.
     */
    root?: IStyle;
    /**
     * Styles for a menu item that is an anchor link.
     */
    item?: IStyle;
    /**
     * Styles for a divider item of a ContextualMenu.
     */
    divider?: IStyle;
    /**
     * Styles for the content inside the button/link of the menuItem.
     */
    linkContent?: IStyle;
    /**
     * Styles for a menu item that is an anchor link.
     */
    anchorLink?: IStyle;
    /**
     * Styles for the icon element of a menu item.
     */
    icon?: IStyle;
    /**
     * Default icon color style for known icons.
     */
    iconColor?: IStyle;
    /**
     * Default style for checkmark icons.
     */
    checkmarkIcon?: IStyle;
    /**
     * Styles for the submenu icon of a menu item.
     */
    subMenuIcon?: IStyle;
    /**
     * Styles for the label of a menu item.
     */
    label?: IStyle;
    /**
     * Styles for the secondary text of a menu item.
     */
    secondaryText?: IStyle;
    /**
     * Styles for the container of a split menu item.
     */
    splitContainer?: IStyle;
    /**
     * Styles for the primary portion of a split menu item.
     */
    splitPrimary?: IStyle;
    /**
     * Styles for the menu portion of a split menu item.
     */
    splitMenu?: IStyle;
    /**
     * Styles for a menu item that is a link.
     */
    linkContentMenu?: IStyle;
    /**
     * Styles for hidden screen reader text.
     */
    screenReaderText?: IStyle;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuListProps {
    items: IContextualMenuItem[];
    totalItemCount: number;
    hasCheckmarks: boolean;
    hasIcons: boolean;
    defaultMenuItemRenderer: (item: IContextualMenuItemRenderProps) => React_2.ReactNode;
    ariaLabel?: string;
    labelElementId?: string;
    role?: string;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuProps extends IBaseProps<IContextualMenu>, React_2.RefAttributes<HTMLDivElement>, IWithResponsiveModeState {
    /**
     * Optional callback to access the IContextualMenu interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     * @deprecated ContextualMenu has no imperative methods, so componentRef no longer returns a ref
     */
    componentRef?: IRefObject<IContextualMenu>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IContextualMenuStyleProps, IContextualMenuStyles>;
    /**
     * Theme provided by higher-order component.
     */
    theme?: ITheme;
    /**
     * Additional CSS class to apply to the ContextualMenu.
     */
    className?: string;
    /**
     * The target that the ContextualMenu should try to position itself based on.
     * It can be either an element, a query selector string resolving to a valid element,
     * or a MouseEvent. If a MouseEvent is given, the origin point of the event will be used.
     */
    target?: Target;
    /**
     * How the menu should be positioned
     * @defaultvalue DirectionalHint.bottomAutoEdge
     */
    directionalHint?: DirectionalHint;
    /**
     * How the menu should be positioned in RTL layouts.
     * If not specified, a mirror of `directionalHint` will be used.
     */
    directionalHintForRTL?: DirectionalHint;
    /**
     * The gap between the ContextualMenu and the target
     * @defaultvalue 0
     */
    gapSpace?: number;
    /**
     * The width of the beak.
     * @defaultvalue 16
     */
    beakWidth?: number;
    /**
     * If true the context menu will render as the same width as the target element
     * @defaultvalue false
     */
    useTargetWidth?: boolean;
    /**
     * If true the context menu will have a minimum width equal to the width of the target element
     * @defaultvalue false
     */
    useTargetAsMinWidth?: boolean;
    /**
     * The bounding rectangle (or callback that returns a rectangle) which the contextual menu can appear in.
     */
    bounds?: IRectangle | ((target?: Target, targetWindow?: Window) => IRectangle | undefined);
    /**
     * If true then the beak is visible. If false it will not be shown.
     */
    isBeakVisible?: boolean;
    /**
     * If true, the menu will be positioned to cover the target.
     * If false, it will be positioned next to the target.
     * @defaultvalue false
     */
    coverTarget?: boolean;
    /**
     * If true the positioning logic will prefer to flip edges rather than to nudge the rectangle to fit within bounds,
     * thus making sure the element aligns perfectly with target's alignment edge
     */
    alignTargetEdge?: boolean;
    /**
     * Menu items to display.
     */
    items: IContextualMenuItem[];
    /**
     * Used as `aria-labelledby` for the menu element inside the callout.
     */
    labelElementId?: string;
    /**
     * Whether to focus on the menu when mounted.
     * @defaultvalue true
     */
    shouldFocusOnMount?: boolean;
    /**
     * Whether to focus on the contextual menu container (as opposed to the first menu item).
     *
     * Avoid using as it breaks the default focus behaviour when using assistive technologies.
     */
    shouldFocusOnContainer?: boolean;
    /**
     * Callback when the ContextualMenu tries to close. If `dismissAll` is true then all
     * submenus will be dismissed.
     */
    onDismiss?: (ev?: Event | React_2.MouseEvent | React_2.KeyboardEvent, dismissAll?: boolean) => void;
    /**
     * Click handler which is invoked if `onClick` is not passed for individual contextual
     * menu item.
     * Returning true will dismiss the menu even if `ev.preventDefault()` was called.
     */
    onItemClick?: (ev?: React_2.MouseEvent<HTMLElement> | React_2.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => boolean | void;
    /**
     * Whether this menu is a submenu of another menu.
     */
    isSubMenu?: boolean;
    /**
     * ID for the ContextualMenu's root element (inside the callout).
     * Should be used for `aria-owns` and other such uses, rather than direct reference for programmatic purposes.
     */
    id?: string;
    /**
     * Accessible label for the ContextualMenu's root element (inside the callout).
     */
    ariaLabel?: string;
    /**
     * If true do not render on a new layer. If false render on a new layer.
     * @defaultvalue false
     */
    doNotLayer?: boolean;
    /**
     * If true the position will not change sides in an attempt to fit the ContextualMenu within bounds.
     * It will still attempt to align it to whatever bounds are given.
     * @defaultvalue false
     */
    directionalHintFixed?: boolean;
    /**
     * Callback for when the menu has been opened.
     */
    onMenuOpened?: (contextualMenu?: IContextualMenuProps) => void;
    /**
     * Callback for when the menu is being closed (removing from the DOM).
     */
    onMenuDismissed?: (contextualMenu?: IContextualMenuProps) => void;
    /**
     * Additional custom props for the Callout.
     */
    calloutProps?: ICalloutProps;
    /**
     * Title to be displayed at the top of the menu, above the items.
     */
    title?: string;
    /**
     * Method to provide the classnames to style the contextual menu.
     * @deprecated Use `styles` instead to leverage mergeStyles API.
     */
    getMenuClassNames?: (theme: ITheme, className?: string) => IContextualMenuClassNames;
    /** Custom render function for a submenu. */
    onRenderSubMenu?: IRenderFunction<IContextualMenuProps>;
    /**
     * Method to override the render of the list of menu items.
     */
    onRenderMenuList?: IRenderFunction<IContextualMenuListProps>;
    /**
     * Method to wrap menu items. Gives the ability to wrap a custom
     * tooltip to each menu item button.
     */
    onRenderContextualMenuItem?: IRenderFunction<IContextualMenuItem>;
    /**
     * Delay (in milliseconds) to wait before expanding / dismissing a submenu on mouseEnter or mouseLeave
     */
    subMenuHoverDelay?: number;
    /**
     * Custom component to use for rendering individual menu items.
     * @defaultvalue ContextualMenuItem
     */
    contextualMenuItemAs?: React_2.ComponentClass<IContextualMenuItemProps> | React_2.FunctionComponent<IContextualMenuItemProps>;
    /**
     * Props to pass down to the FocusZone.
     * NOTE: the default FocusZoneDirection will be used unless a direction
     * is specified in the focusZoneProps (even if other focusZoneProps are defined)
     * @defaultvalue \{ direction: FocusZoneDirection.vertical \}
     */
    focusZoneProps?: IFocusZoneProps;
    /**
     * Custom component to use for rendering the focus zone (the root).
     * @defaultValue FocusZone
     */
    focusZoneAs?: React_2.ComponentClass<IFocusZoneProps> | React_2.FunctionComponent<IFocusZoneProps>;
    /**
     * If true, renders the ContextualMenu in a hidden state.
     * Use this flag, rather than rendering a ContextualMenu conditionally based on visibility,
     * to improve rendering performance when it becomes visible.
     * Note: When ContextualMenu is hidden its content will not be rendered. It will only render
     * once the ContextualMenu is visible.
     */
    hidden?: boolean;
    /**
     * If true, the menu will be updated even when `hidden=true`. Note that this will consume
     * resources to update even when nothing is being shown to the user. This might be helpful if
     * your updates are small and you want the menu to display quickly when `hidden` is set to false.
     */
    shouldUpdateWhenHidden?: boolean;
    /**
     * If true, the contextual menu will not be updated until focus enters the menu via other means.
     * This will only result in different behavior when `shouldFocusOnMount = false`.
     */
    delayUpdateFocusOnHover?: boolean;
    /**
     * Called when the component is unmounting, and focus needs to be restored. If this is provided,
     * focus will not be restored automatically, and you'll need to call `params.originalElement.focus()`.
     */
    onRestoreFocus?: (params: IPopupRestoreFocusParams) => void;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuRenderItem {
    /**
     * Function to open this item's subMenu, if present.
     */
    openSubMenu: () => void;
    /**
     * Function to close this item's subMenu, if present.
     */
    dismissSubMenu: () => void;
    /**
     * Dismiss the menu this item belongs to.
     */
    dismissMenu: (dismissAll?: boolean) => void;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuSection extends React_2.ClassAttributes<any> {
    /**
     * The items to include inside the section.
     */
    items: IContextualMenuItem[];
    /**
     * The optional section title.
     */
    title?: string | IContextualMenuItem;
    /**
     * If set to true, the section will display a divider at the top of the section.
     */
    topDivider?: boolean;
    /**
     * If set to true, the section will display a divider at the bottom of the section.
     */
    bottomDivider?: boolean;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuStyleProps {
    theme: ITheme;
    className?: string;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuStyles {
    /**
     * Style override for the contextual menu title.
     */
    title: IStyle;
    /**
     * Style for the container which parents all menu items.
     */
    container: IStyle;
    /**
     * Base styles for the root element of all ContextualMenus.
     */
    root: IStyle;
    /**
     * Styles for the header item of a ContextualMenu
     */
    header: IStyle;
    /**
     * Styles for the list that contains all menuItems.
     */
    list: IStyle;
    /**
     * SubComponent styles.
     */
    subComponentStyles: IContextualMenuSubComponentStyles;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IContextualMenuSubComponentStyles {
    /** Styles for the callout that hosts the ContextualMenu options. */
    callout: IStyleFunctionOrObject<ICalloutContentStyleProps, any>;
    /** Styles for each menu item. */
    menuItem: IStyleFunctionOrObject<IContextualMenuItemStyleProps, any>;
}

/**
 * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
 * {@docCategory Icon}
 */
export declare enum IconType {
    /**
     * Render using the fabric icon font.
     * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
     */
    default = 0,
    /**
     * Render using an image, where imageProps would be used.
     * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
     */
    image = 1,
    /**
     * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
     */
    Default = 100000,
    /**
     * @deprecated Icon type is inferred based on presence of `IIconProps.imageProps`
     */
    Image = 100001
}

export { ICSPSettings }

export { ICssInput }

declare interface ICursorLocation {
    start: number;
    end: number;
    dir: 'forward' | 'backward' | 'none' | undefined;
}

export { ICustomizableProps }

export { ICustomizations }

export { ICustomizerContext }

export { ICustomizerProps }

export { IDateFormatting }

/**
 * {@docCategory DatePicker}
 */
export declare interface IDatePicker {
    /** Sets focus to the text field */
    focus(): void;
    /** Reset the state of the picker to the default */
    reset(): void;
    /** Open the datepicker callout */
    showDatePickerPopup(): void;
}

/**
 * {@docCategory DatePicker}
 */
export declare interface IDatePickerProps extends IBaseProps<IDatePicker>, React_2.HTMLAttributes<HTMLElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IDatePicker interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IDatePicker>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IDatePickerStyleProps, IDatePickerStyles>;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Pass callout props to callout component
     */
    calloutProps?: ICalloutProps;
    /**
     * Pass calendar props to calendar component
     */
    calendarProps?: ICalendarProps;
    /**
     * Pass textField props to textField component.
     * Prop name is "textField" for compatibility with upcoming slots work.
     */
    textField?: ITextFieldProps;
    /**
     * Custom Calendar to be used for date picking
     */
    calendarAs?: IComponentAs<ICalendarProps>;
    /**
     * Callback issued when a date is selected
     */
    onSelectDate?: (date: Date | null | undefined) => void;
    /**
     * Label for the DatePicker
     */
    label?: string;
    /**
     * Whether the DatePicker is a required field or not
     * @defaultvalue false
     */
    isRequired?: boolean;
    /**
     * Disabled state of the DatePicker.
     * @defaultvalue false
     */
    disabled?: boolean;
    /**
     * Aria Label for TextField of the DatePicker for screen reader users.
     */
    ariaLabel?: string;
    /**
     * Whether or not the Textfield of the DatePicker is underlined.
     * @defaultvalue false
     */
    underlined?: boolean;
    /**
     * Aria label for date picker popup for screen reader users.
     * @defaultvalue Calendar
     */
    pickerAriaLabel?: string;
    /**
     * Whether the month picker is shown beside the day picker or hidden.
     * @defaultvalue true
     */
    isMonthPickerVisible?: boolean;
    /**
     * Show month picker on top of date picker when visible.
     * @defaultvalue false
     */
    showMonthPickerAsOverlay?: boolean;
    /**
     * Whether the DatePicker allows input a date string directly or not
     * @defaultvalue false
     */
    allowTextInput?: boolean;
    /**
     * Whether the DatePicker should open automatically when the control is focused
     * WARNING: setting this to false creates an accessibility violation and is not recommended
     * @defaultvalue true
     */
    disableAutoFocus?: boolean;
    /**
     * Whether the DatePicker should open when the input is clicked
     * @defaultvalue true
     */
    openOnClick?: boolean;
    /**
     * Placeholder text for the DatePicker
     */
    placeholder?: string;
    /**
     * Value of today. If unspecified, current time in client machine will be used.
     */
    today?: Date;
    /**
     * Default value of the DatePicker, if any
     */
    value?: Date;
    /**
     * Optional method to format the chosen date to a string to display in the DatePicker
     * @defaultvalue date.toString()
     */
    formatDate?: (date?: Date) => string;
    /**
     * Optional method to parse the text input value to date, it is only useful when allowTextInput is set to true
     * @defaultvalue new Date(Date.parse(dateStr))
     */
    parseDateFromString?: (dateStr: string) => Date | null;
    /**
     * The first day of the week for your locale.
     * @defaultvalue DayOfWeek.Sunday
     */
    firstDayOfWeek?: DayOfWeek;
    /**
     * Localized strings to use in the DatePicker
     */
    strings?: IDatePickerStrings;
    /**
     * Whether the month picker should highlight the current month
     * @defaultvalue false
     */
    highlightCurrentMonth?: boolean;
    /**
     * Whether the month picker should highlight the selected month
     * @defaultvalue false
     */
    highlightSelectedMonth?: boolean;
    /**
     * Whether the calendar should show the week number (weeks 1 to 53) before each week row
     * @defaultvalue false
     */
    showWeekNumbers?: boolean;
    /**
     * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
     * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
     * @defaultvalue FirstWeekOfYear.FirstFullWeek
     */
    firstWeekOfYear?: FirstWeekOfYear;
    /**
     * Whether the "Go to today" link should be shown or not
     */
    showGoToToday?: boolean;
    /**
     * Determines if the DatePicker has a border.
     * @defaultvalue false
     */
    borderless?: boolean;
    /**
     * Optional CSS class for the DatePicker root element.
     */
    className?: string;
    /**
     * Apply additional formatting to dates, for example localized date formatting.
     */
    dateTimeFormatter?: IDateFormatting;
    /**
     * The minimum allowable date.
     */
    minDate?: Date;
    /**
     * The maximum allowable date.
     */
    maxDate?: Date;
    /**
     * The initially highlighted date.
     */
    initialPickerDate?: Date;
    /**
     * Allows all elements to be focused, including disabled ones
     * @defaultvalue false
     */
    allFocusable?: boolean;
    /**
     * Callback that runs after DatePicker's menu (Calendar) is closed
     */
    onAfterMenuDismiss?: () => void;
    /**
     * Whether the CalendarDay close button should be shown or not.
     */
    showCloseButton?: boolean;
    /**
     * The tabIndex of the TextField
     */
    tabIndex?: number;
}

/**
 * {@docCategory DatePicker}
 */
export declare interface IDatePickerStrings extends ICalendarStrings {
    /**
     * Error message to render for TextField if isRequired validation fails.
     */
    isRequiredErrorMessage?: string;
    /**
     * Error message to render for TextField if input date string parsing fails.
     */
    invalidInputErrorMessage?: string;
    /**
     * Error message to render for TextField if date boundary (minDate, maxDate) validation fails.
     */
    isOutOfBoundsErrorMessage?: string;
    /**
     * Status message to render for TextField the input date parsing fails,
     * and the typed value is cleared and reset to the previous value.
     *  e.g. "Invalid entry `{0}`, date reset to `{1}`"
     */
    isResetStatusMessage?: string;
}

/**
 * {@docCategory DatePicker}
 */
export declare interface IDatePickerStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    disabled?: boolean;
    underlined?: boolean;
    label?: boolean;
    isDatePickerShown?: boolean;
}

/**
 * {@docCategory DatePicker}
 */
export declare interface IDatePickerStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    textField: IStyle;
    callout: IStyle;
    icon: IStyle;
    statusMessage?: IStyle;
    wrapper?: IStyle;
    readOnlyTextField?: IStyle;
    readOnlyPlaceholder?: IStyle;
}

export { IDeclaredEventsByName }

export { IDelayedRenderProps }

export { IDelayedRenderState }

export declare interface IDetailsCheckboxProps {
    checked: boolean;
    theme?: ITheme;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsColumnFieldProps {
    /**
     * Item data to render.
     */
    item: any;
    /**
     * Index of the item in its list.
     */
    itemIndex: number;
    /**
     * Whether or not the row is selected.
     */
    isSelected?: boolean;
    /**
     * Column schema information.
     */
    column: IColumn;
    /**
     * Key representing the cell value, for change-detection.
     */
    cellValueKey?: string;
    /**
     * Class name to apply to the cell root element.
     */
    className?: string;
    /**
     * Original content render function for the cell
     */
    onRender: (item?: any, index?: any, column?: IColumn) => React_2.ReactNode;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsColumnFilterIconProps extends IIconProps {
    columnProps?: IDetailsColumnProps;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsColumnProps extends React_2.ClassAttributes<DetailsColumnBase> {
    /**
     * The theme object to respect during render.
     */
    theme?: ITheme;
    /**
     * The component styles to respect during render.
     */
    styles?: IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>;
    /**
     * A reference to the component instance.
     */
    componentRef?: () => void;
    /**
     * The column definition for the component instance.
     */
    column: IColumn;
    /**
     * The column index for the component instance.
     */
    columnIndex: number;
    /**
     * Parent ID used for accessibility label(s).
     */
    parentId?: string;
    /**
     * Render function for providing a column header tooltip.
     */
    onRenderColumnHeaderTooltip?: IRenderFunction<IDetailsColumnRenderTooltipProps>;
    /**
     * Callback fired when click event occurs.
     */
    onColumnClick?: (ev: React_2.MouseEvent<HTMLElement>, column: IColumn) => void;
    /**
     * Callback fired on contextual menu event to provide contextual menu UI.
     */
    onColumnContextMenu?: (column: IColumn, ev: React_2.MouseEvent<HTMLElement>) => void;
    /**
     * The drag and drop helper for the component instance.
     */
    dragDropHelper?: IDragDropHelper | null;
    /**
     * Whether or not the column can be re-ordered via drag and drop.
     */
    isDraggable?: boolean;
    /**
     * @deprecated use `updateDragInfo`
     */
    setDraggedItemIndex?: (itemIndex: number) => void;
    /**
     * Callback on drag and drop event.
     */
    updateDragInfo?: (props: {
        itemIndex: number;
    }, event?: MouseEvent) => void;
    /**
     * Whether or not the column has been dropped via drag and drop.
     */
    isDropped?: boolean;
    /**
     * Custom styles for cell rendering.
     */
    cellStyleProps?: ICellStyleProps;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docgategory DetailsList}
 */
export declare interface IDetailsColumnRenderTooltipProps extends ITooltipHostProps {
    /**
     * Information about the column for which the tooltip is being rendered.
     * Use this to format status information about the column, such as its filter or sort state.
     */
    column?: IColumn;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsColumnStyleProps = Required<Pick<IDetailsColumnProps, 'theme' | 'cellStyleProps'>> & {
    /**
     * Classname to provide for header region.
     */
    headerClassName?: string;
    /**
     * Whether or not the column is actionable.
     */
    isActionable?: boolean;
    /**
     * Whether or not the column contains contents.
     */
    isEmpty?: boolean;
    /**
     * Whether or not the column has a visible icon.
     */
    isIconVisible?: boolean;
    /**
     * Whether or not the column is padded.
     */
    isPadded?: boolean;
    /**
     * Whether or not the column has icon only content/
     */
    isIconOnly?: boolean;
    /**
     * Classname to provide for the header's icon region.
     */
    iconClassName?: string;
    /**
     * CSS transition duration on drag event.
     */
    transitionDurationDrag?: number;
    /**
     * CSS transition duration on drop event.
     */
    transitionDurationDrop?: number;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsColumnStyles {
    /**
     * Styleable root region.
     */
    root: IStyle;
    /**
     * Styleable resize glyph region.
     */
    gripperBarVerticalStyle: IStyle;
    /**
     * Styleable cell tooltip region.
     */
    cellTooltip: IStyle;
    /**
     * Styleable cell title region.
     */
    cellTitle: IStyle;
    /**
     * Styleable cell name region.
     */
    cellName: IStyle;
    /**
     * Styleable icon region.
     */
    iconClassName: IStyle;
    /**
     * Styleable margin by icon region.
     */
    nearIcon: IStyle;
    /**
     * Styleable label region.
     */
    accessibleLabel: IStyle;
    /**
     * Styleable column sort icon region.
     */
    sortIcon: IStyle;
    /**
     * Styleable filter glyph.
     */
    filterChevron: IStyle;
    /**
     * Styleable border region after drag & drop.
     */
    borderAfterDropping: IStyle;
    /**
     * Transparent no border region after drag & drop to avoid content shift.
     */
    noBorderAfterDropping: IStyle;
    /**
     * Styleable border while drag & drop occurs.
     */
    borderWhileDragging: IStyle;
    /**
     * Transparent no border region while drag & drop occurs to avoid content shift.
     */
    noBorderWhileDragging: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsFooterBaseProps extends IDetailsItemProps {
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsFooterProps extends IDetailsFooterBaseProps {
    /**
     * Column metadata
     */
    columns: IColumn[];
    /**
     * Selection from utilities
     */
    selection: ISelection;
    /**
     * Selection mode
     */
    selectionMode: SelectionMode_2;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsGroupDividerProps extends IGroupDividerProps, IDetailsItemProps {
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsGroupRenderProps extends IGroupRenderProps {
    onRenderFooter?: IRenderFunction<IDetailsGroupDividerProps>;
    onRenderHeader?: IRenderFunction<IDetailsGroupDividerProps>;
    groupedListAs?: IComponentAs<IGroupedListProps>;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeader {
    /** sets focus into the header */
    focus: () => boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeaderBaseProps extends React_2.ClassAttributes<DetailsHeaderBase>, IDetailsItemProps {
    /** Theme from the Higher Order Component */
    theme?: ITheme;
    /** Call to provide customized styling that will layer on top of the variant rules. */
    styles?: IStyleFunctionOrObject<IDetailsHeaderStyleProps, IDetailsHeaderStyles>;
    /** Ref to the component itself */
    componentRef?: IRefObject<IDetailsHeader>;
    /** Layout mode - fixedColumns or justified */
    layoutMode: DetailsListLayoutMode;
    /** Callback for when column sizing has changed */
    onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
    /** Callback for when column is resized */
    onColumnResized?: (column: IColumn, newWidth: number, columnIndex: number) => void;
    /** Callback for when column is automatically resized */
    onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;
    /** Callback for when the column is clicked */
    onColumnClick?: (ev: React_2.MouseEvent<HTMLElement>, column: IColumn) => void;
    /** Callback for when the column needs to show a context menu */
    onColumnContextMenu?: (column: IColumn, ev: React_2.MouseEvent<HTMLElement>) => void;
    /** Callback to render a tooltip for the column header */
    onRenderColumnHeaderTooltip?: IRenderFunction<IDetailsColumnRenderTooltipProps>;
    /** Whether to collapse for all visibility */
    collapseAllVisibility?: CollapseAllVisibility;
    /** Whether or not all is collapsed */
    isAllCollapsed?: boolean;
    /** Callback for when collapse all is toggled */
    onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
    /** ariaLabel for the entire header */
    ariaLabel?: string;
    /** ariaLabel for expand/collapse group button */
    ariaLabelForToggleAllGroupsButton?: string;
    /** ariaLabel for the header checkbox that selects or deselects everything */
    ariaLabelForSelectAllCheckbox?: string;
    /** ariaLabel for the selection column */
    ariaLabelForSelectionColumn?: string;
    /** Select all button visibility */
    selectAllVisibility?: SelectAllVisibility;
    /** Column reordering options */
    columnReorderOptions?: IColumnReorderOptions;
    /** Column reordering options */
    columnReorderProps?: IColumnReorderHeaderProps;
    /** Minimum pixels to be moved before dragging is registered */
    minimumPixelsForDrag?: number;
    /** Overriding class name */
    className?: string;
    /** If provided, can be used to render a custom checkbox */
    onRenderDetailsCheckbox?: IRenderFunction<IDetailsCheckboxProps>;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeaderProps extends IDetailsHeaderBaseProps {
    /**
     * Column metadata
     */
    columns: IColumn[];
    /**
     * Selection from utilities
     */
    selection: ISelection;
    /**
     * Selection mode
     */
    selectionMode: SelectionMode_2;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeaderState {
    columnResizeDetails?: IColumnResizeDetails;
    isAllSelected?: boolean;
    isSizing?: boolean;
    isAllCollapsed?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsHeaderStyleProps = Required<Pick<IDetailsHeaderProps, 'theme'>> & Pick<IDetailsHeaderProps, 'className'> & {
    /** Whether to hide select all checkbox */
    isSelectAllHidden?: boolean;
    /** Whether the "select all" checkbox is checked */
    isAllSelected?: boolean;
    /** Is column being resized */
    isResizingColumn?: boolean;
    /** Are all columns collapsed */
    isAllCollapsed?: boolean;
    /** Whether the header is sizing */
    isSizing?: boolean;
    /** Whether checkbox is hidden  */
    isCheckboxHidden?: boolean;
    cellStyleProps?: ICellStyleProps;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsHeaderStyles {
    root: IStyle;
    check: IStyle;
    /**
     * @deprecated Not used
     */
    cellWrapperPadded: IStyle;
    cellIsCheck: IStyle;
    /**
     * @deprecated Not used
     */
    cellIsActionable: IStyle;
    /**
     * @deprecated Not used
     */
    cellIsEmpty: IStyle;
    cellSizer: IStyle;
    cellSizerStart: IStyle;
    cellSizerEnd: IStyle;
    cellIsResizing: IStyle;
    cellIsGroupExpander: IStyle;
    collapseButton: IStyle;
    checkTooltip: IStyle;
    sizingOverlay: IStyle;
    dropHintCircleStyle: IStyle;
    dropHintCaretStyle: IStyle;
    dropHintLineStyle: IStyle;
    dropHintStyle: IStyle;
    accessibleLabel: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsItemProps {
    /**
     * Column metadata
     */
    columns?: IColumn[];
    /**
     * Nesting depth of a grouping
     */
    groupNestingDepth?: number;
    /**
     * How much to indent
     */
    indentWidth?: number | undefined;
    /**
     * Selection from utilities
     */
    selection?: ISelection | undefined;
    /**
     * Selection mode
     */
    selectionMode?: SelectionMode_2 | undefined;
    /**
     * Viewport of the virtualized list
     *
     * @deprecated Use `rowWidth` instead
     */
    viewport?: IViewport | undefined;
    /**
     * Checkbox visibility
     */
    checkboxVisibility?: CheckboxVisibility | undefined;
    /**
     * Rules for rendering column cells.
     */
    cellStyleProps?: ICellStyleProps;
    /**
     * Minimum width of the row.
     *
     * @defaultvalue 0
     */
    rowWidth?: number;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsList extends IList {
    /**
     * Ensures that the list content is updated. Call this in cases where the list prop updates don't change, but the list
     * still needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change,
     * you can call this to force a re-evaluation. Be aware that this can be an expensive operation and should be
     * done sparingly.
     */
    forceUpdate: () => void;
    /**
     * Scroll to and focus the item at the given index. focusIndex will call scrollToIndex on the specified index.
     *
     * @param index - Index of item to scroll to
     * @param forceIntoFirstElement - If true, focus will be set to the first focusable child element of the item rather
     *  than the item itself.
     * @param measureItem - Optional callback to measure the height of an individual item
     * @param scrollToMode - Optional setting to determine where in the window the item should be scrolled to
     * when focused.
     */
    focusIndex: (index: number, forceIntoFirstElement?: boolean, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) => void;
    /**
     * Get the start index of the page that is currently in view
     */
    getStartItemIndexInView: () => number;
    /**
     * Use to programatically resize and/or reorder columns in the DetailsList.
     * @param column - column to resize/reorder.
     * @param options - includes width which is desired width in pixels the column should be resized
     * to and newColumnIndex which is desired index position where the column should be moved to.
     */
    updateColumn: (column: IColumn, options: {
        width?: number;
        newColumnIndex?: number;
    }) => void;
}

export declare interface IDetailsListCheckboxProps extends IDetailsCheckboxProps {
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsListProps extends IBaseProps<IDetailsList>, IWithViewportProps {
    /** Theme provided by a higher-order component. */
    theme?: ITheme;
    /** Custom overrides to the themed or default styles. */
    styles?: IStyleFunctionOrObject<IDetailsListStyleProps, IDetailsListStyles>;
    /**
     * Callback to access the IDetailsList interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IDetailsList>;
    /** A key that uniquely identifies the given items. If provided, the selection will be reset when the key changes. */
    setKey?: string;
    /** The items to render. */
    items: any[];
    /** Set this to true to indicate that the items being displayed are placeholder data. */
    isPlaceholderData?: boolean;
    /** Properties to pass through to the List components being rendered. */
    listProps?: IListProps;
    /** Default index to set focus to once the items have rendered and the index exists. */
    initialFocusedIndex?: number;
    /** Class name to add to the root element. */
    className?: string;
    /** Grouping instructions. */
    groups?: IGroup[];
    /** Override properties to render groups. */
    groupProps?: IDetailsGroupRenderProps;
    /** Override for the indent width used for group nesting. */
    indentWidth?: number;
    /** Selection model to track selection state.  */
    selection?: ISelection;
    /** Controls how/if the details list manages selection. Options include none, single, multiple */
    selectionMode?: SelectionMode_2;
    /**
     * By default, selection is cleared when clicking on an empty (non-focusable) section of the screen.
     * Setting this value to true overrides that behavior and maintains selection.
     * @defaultvalue false
     **/
    selectionPreservedOnEmptyClick?: boolean;
    /**
     * Additional props to pass through to the SelectionZone created by default.
     */
    selectionZoneProps?: Partial<ISelectionZoneProps>;
    /** Controls how the columns are adjusted. */
    layoutMode?: DetailsListLayoutMode;
    /**
     * Controls the visibility of selection check box.
     * @defaultvalue CheckboxVisibility.onHover
     */
    checkboxVisibility?: CheckboxVisibility;
    /**
     * Controls the visibility of the header.
     * @defaultvalue true
     */
    isHeaderVisible?: boolean;
    /** Column definitions. If none are provided, default columns will be created based on the items' properties. */
    columns?: IColumn[];
    /** Controls how the list constrains overflow. */
    constrainMode?: ConstrainMode;
    /** Event names and corresponding callbacks that will be registered to rendered row elements. */
    rowElementEventMap?: {
        eventName: string;
        callback: (context: IDragDropContext, event?: any) => void;
    }[];
    /** Callback for when the list has been updated. Useful for telemetry tracking externally. */
    onDidUpdate?: (detailsList?: DetailsListBase) => void;
    /**
     * Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page.
     */
    onRowDidMount?: (item?: any, index?: number) => void;
    /**
     * Callback for when a given row has been unmounted.
     * Useful for identifying when a row has been removed from the page.
     */
    onRowWillUnmount?: (item?: any, index?: number) => void;
    /** Callback for when the user clicks on the column header. */
    onColumnHeaderClick?: (ev?: React_2.MouseEvent<HTMLElement>, column?: IColumn) => void;
    /** Callback for when the user asks for a contextual menu (usually via right click) from a column header. */
    onColumnHeaderContextMenu?: (column?: IColumn, ev?: React_2.MouseEvent<HTMLElement>) => void;
    /** Callback fired on column resize */
    onColumnResize?: (column?: IColumn, newWidth?: number, columnIndex?: number) => void;
    /** Callback for when a given row has been invoked (by pressing enter while it is selected.) */
    onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;
    /**
     * Callback for when the context menu of an item has been accessed.
     * If undefined or false is returned, `ev.preventDefault()` will be called.
     */
    onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;
    /**
     * Callback to override the default row rendering.
     */
    onRenderRow?: IRenderFunction<IDetailsRowProps>;
    /**
     * If provided, will be the "default" item column renderer method.
     * This affects cells within the rows, not the rows themselves.
     * If a column definition provides its own `onRender` method, that will be used instead of this.
     */
    onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => React_2.ReactNode;
    /**
     * Render function which is composed around rendering every cell.
     */
    onRenderField?: IRenderFunction<IDetailsColumnFieldProps>;
    /**
     * If provided, will be the "default" item column cell value return.
     * A column's `getValueKey` can override `getCellValueKey`.
     */
    getCellValueKey?: (item?: any, index?: number, column?: IColumn) => string;
    /** Map of callback functions related to row drag and drop functionality. */
    dragDropEvents?: IDragDropEvents;
    /** Callback for what to render when the item is missing. */
    onRenderMissingItem?: (index?: number, rowProps?: IDetailsRowProps) => React_2.ReactNode;
    /** An override to render the details header. */
    onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>;
    /** An override to render the details footer. */
    onRenderDetailsFooter?: IRenderFunction<IDetailsFooterProps>;
    /**  If provided, can be used to render a custom checkbox. */
    onRenderCheckbox?: IRenderFunction<IDetailsListCheckboxProps>;
    /** Viewport info, provided by the `withViewport` decorator. */
    viewport?: IViewport;
    /**
     * Callback for when an item in the list becomes active by clicking anywhere inside the row or navigating to it
     * with the keyboard.
     */
    onActiveItemChanged?: (item?: any, index?: number, ev?: React_2.FocusEvent<HTMLElement>) => void;
    /** Accessible label for the list header. */
    ariaLabelForListHeader?: string;
    /** Accessible label for the select all checkbox. */
    ariaLabelForSelectAllCheckbox?: string;
    /** Accessible label for the name of the selection column. */
    ariaLabelForSelectionColumn?: string;
    /** Callback to get the aria-label string for a given item. */
    getRowAriaLabel?: (item: any) => string;
    /** Callback to get the aria-describedby IDs (space-separated strings) of elements that describe the item. */
    getRowAriaDescribedBy?: (item: any) => string;
    /**
     * Callback to get the item key, to be used in the selection and on render.
     * Must be provided if sorting or filtering is enabled.
     */
    getKey?: (item: any, index?: number) => string;
    /**
     * Accessible label describing or summarizing the list.
     * @deprecated use `ariaLabelForGrid`
     */
    ariaLabel?: string;
    /** Accessible label for the row check button, e.g. "select row". */
    checkButtonAriaLabel?: string;
    /** Accessible label for the group header check button, e.g. "select section". */
    checkButtonGroupAriaLabel?: string;
    /** Accessible label for the grid within the list. */
    ariaLabelForGrid?: string;
    /** An optional margin for proportional columns, to e.g. account for scrollbars when laying out width. */
    flexMargin?: number;
    /**
     * Whether the role `application` should be applied to the list.
     * @defaultvalue false
     * @deprecated using the application role in this case is an antipattern, and heavily discouraged.
     */
    shouldApplyApplicationRole?: boolean;
    /**
     * The minimum mouse move distance to interpret the action as drag event.
     * @defaultvalue 5
     */
    minimumPixelsForDrag?: number;
    /**
     * Whether to render in compact mode.
     * @defaultvalue false
     */
    compact?: boolean;
    /**
     * Whether to enable render page caching. This is an experimental performance optimization that is off by default.
     * @defaultvalue false
     */
    usePageCache?: boolean;
    /**
     * Callback to determine whether the list should be rendered in full, or virtualized.
     *
     * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
     * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance
     * for smaller lists.
     *
     * The default implementation will virtualize when this callback is not provided.
     */
    onShouldVirtualize?: (props: IListProps) => boolean;
    /** Class name to add to the cell of a checkbox. */
    checkboxCellClassName?: string;
    /** Whether the selection zone should enter modal state on touch. */
    enterModalSelectionOnTouch?: boolean;
    /** Options for column reordering using drag and drop. */
    columnReorderOptions?: IColumnReorderOptions;
    /** Callback to override default group height calculation used by list virtualization. */
    getGroupHeight?: IGroupedListProps['getGroupHeight'];
    /**
     * Whether to re-render a row only when props changed. Might cause regression when depending on external updates.
     * @defaultvalue false
     */
    useReducedRowRenderer?: boolean;
    /**
     * Props impacting the render style of cells. Since these have an impact on calculated column widths, they are
     * handled separately from normal theme styling, but they are passed to the styling system.
     */
    cellStyleProps?: ICellStyleProps;
    /** Whether to disable the built-in SelectionZone, so the host component can provide its own. */
    disableSelectionZone?: boolean;
    /**
     * Determines if an item is selected on focus.
     *
     * @defaultvalue true
     */
    isSelectedOnFocus?: boolean;
    /** Whether to animate updates */
    enableUpdateAnimations?: boolean;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
    /** Role for the list. */
    role?: string;
    /**
     * Properties to pass through to the FocusZone.
     */
    focusZoneProps?: IFocusZoneProps;
}

export declare interface IDetailsListState {
    focusedItemIndex: number;
    lastWidth?: number;
    lastSelectionMode?: SelectionMode_2;
    adjustedColumns: IColumn[];
    isCollapsed?: boolean;
    isSizing?: boolean;
    isSomeGroupExpanded?: boolean;
    /**
     * A unique object used to force-update the List when it changes.
     */
    version: {};
    getDerivedStateFromProps(nextProps: IDetailsListProps, previousState: IDetailsListState): IDetailsListState;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsListStyleProps = Required<Pick<IDetailsListProps, 'theme'>> & Pick<IDetailsListProps, 'className'> & {
    /** Whether the list is horizontally constrained */
    isHorizontalConstrained?: boolean;
    /** Whether the list is in compact mode */
    compact?: boolean;
    /** Whether the list is fixed in size */
    isFixed?: boolean;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsListStyles {
    root: IStyle;
    focusZone: IStyle;
    headerWrapper: IStyle;
    contentWrapper: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRow {
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowBaseProps extends Pick<IDetailsListProps, 'onRenderItemColumn' | 'getCellValueKey' | 'onRenderField'>, IBaseProps<IDetailsRow>, IDetailsItemProps {
    /**
     * Theme provided by styled() function
     */
    theme?: ITheme;
    /**
     * Overriding styles to this row
     */
    styles?: IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles>;
    /**
     * Ref of the component
     */
    componentRef?: IRefObject<IDetailsRow>;
    /**
     * Data source for this component
     */
    item: any;
    /**
     * Index of the collection of items of the DetailsList
     */
    itemIndex: number;
    /**
     * Offset used to calculate the aria-rowindex value based on itemIndex
     * @defaultvalue 2
     */
    flatIndexOffset?: number;
    /**
     * Whether to render in compact mode
     */
    compact?: boolean;
    /**
     * A list of events to register
     */
    eventsToRegister?: {
        eventName: string;
        callback: (item?: any, index?: number, event?: any) => void;
    }[];
    /**
     * Callback for did mount for parent
     */
    onDidMount?: (row?: DetailsRowBase) => void;
    /**
     * Callback for will mount for parent
     */
    onWillUnmount?: (row?: DetailsRowBase) => void;
    /**
     * Callback for rendering a checkbox
     */
    onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;
    /**
     * If provided, can be used to render a custom checkbox
     */
    onRenderDetailsCheckbox?: IRenderFunction<IDetailsCheckboxProps>;
    /**
     * Handling drag and drop events
     */
    dragDropEvents?: IDragDropEvents;
    /**
     * Helper for the drag and drop
     */
    dragDropHelper?: IDragDropHelper;
    /**
     * Collapse all visibility
     */
    collapseAllVisibility?: CollapseAllVisibility;
    /**
     * Callback for getting the row aria label
     */
    getRowAriaLabel?: (item: any) => string;
    /**
     * Callback for getting the row aria description
     */
    getRowAriaDescription?: (item: any) => string;
    /**
     * Callback for getting the row aria-describedby
     */
    getRowAriaDescribedBy?: (item: any) => string;
    /**
     * Check button's aria label
     */
    checkButtonAriaLabel?: string;
    /**
     * Class name for the checkbox cell
     */
    checkboxCellClassName?: string;
    /**
     * DOM element into which to render row field
     */
    rowFieldsAs?: IComponentAs<IDetailsRowFieldsProps>;
    /**
     * Overriding class name
     */
    className?: string;
    /** Whether to animate updates */
    enableUpdateAnimations?: boolean;
    /**
     * Rerender DetailsRow only when props changed. Might cause regression when depending on external updates.
     * @defaultvalue false
     */
    useReducedRowRenderer?: boolean;
    /**
     * Optional pre-rendered content per column. Preferred over onRender or onRenderItemColumn if provided.
     */
    cellsByColumn?: {
        [columnKey: string]: React_2.ReactNode;
    };
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
    /** Role for the row. */
    role?: string;
    /**
     * Whether the row is rendered within a grid.
     * In DetailsList this should be true, and in GroupedList this should be false.
     */
    isGridRow?: boolean;
    /**
     * Id for row
     */
    id?: string;
    /**
     * Group row item belongs to.
     * When using GroupedList, this needs to be passed in order to calculate
     * the correct aria-posinset and aria-setsize values.
     */
    group?: IGroup;
    /**
     * Properties to pass to the rows' FocusZone.
     */
    focusZoneProps?: IFocusZoneProps;
    /** whether or not row should be rendered in disabled state */
    disabled?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowCheckProps extends React_2.HTMLAttributes<HTMLElement> {
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Style override
     */
    styles?: IStyleFunctionOrObject<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>;
    /**
     * Is the check part of the header in a DetailsList
     */
    isHeader?: boolean;
    /**
     * Whether or not this check is selected
     */
    selected?: boolean;
    /**
     * Is any selected - also true for isSelectionModal
     */
    anySelected?: boolean;
    /**
     * Can this checkbox be selectable
     */
    canSelect: boolean;
    /**
     * Selection mode
     */
    selectionMode?: SelectionMode_2;
    /**
     * Is this in compact mode?
     */
    compact?: boolean;
    /**
     * Optional className to attach to the slider root element.
     */
    className?: string;
    /**
     * The classname to be passed down to Check component
     */
    checkClassName?: string;
    /**
     * Whether or not this checkbox is visible
     */
    isVisible?: boolean;
    /**
     * If provided, can be used to render a custom checkbox
     */
    onRenderDetailsCheckbox?: IRenderFunction<IDetailsCheckboxProps>;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsRowCheckStyleProps = Required<Pick<IDetailsRowCheckProps, 'theme'>> & Pick<IDetailsRowCheckProps, 'compact' | 'isHeader' | 'selected' | 'anySelected' | 'canSelect' | 'className'> & {
    /** Is checkbox visible */
    isVisible?: boolean;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowCheckStyles {
    root: IStyle;
    /** @deprecated Use `root` (they're applied to the same element) */
    check: IStyle;
    isDisabled: IStyle;
}

/**
 * Props interface for the DetailsRowFields component.
 *
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowFieldsProps extends IOverrideColumnRenderProps {
    /**
     * Data source for this component
     */
    item: any;
    /**
     * The item index of the collection for the DetailsList
     */
    itemIndex: number;
    /**
     * Index to start for the column
     */
    columnStartIndex: number;
    /**
     * Columns metadata
     */
    columns: IColumn[];
    /**
     * whether to render as a compact field
     */
    compact?: boolean;
    /**
     * Subset of classnames currently generated in DetailsRow that are used within DetailsRowFields.
     */
    rowClassNames: {
        [k in keyof Pick<IDetailsRowStyles, 'isMultiline' | 'isRowHeader' | 'cell' | 'cellAnimation' | 'cellPadded' | 'cellUnpadded' | 'fields'>]: string;
    };
    /**
     * Whether or not the details row is in a selected state.
     */
    isSelected?: boolean;
    /**
     * Id for the current row's row-header
     */
    rowHeaderId?: string;
    /**
     * Style properties to customize cell render output.
     */
    cellStyleProps?: ICellStyleProps;
    enableUpdateAnimations?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowProps extends IDetailsRowBaseProps {
    /**
     * Column metadata
     */
    columns: IColumn[];
    /**
     * Selection from utilities
     */
    selection: ISelection;
    /**
     * Selection mode
     */
    selectionMode: SelectionMode_2;
}

export declare interface IDetailsRowSelectionState {
    isSelected: boolean;
    isSelectionModal: boolean;
}

export declare interface IDetailsRowState {
    selectionState: IDetailsRowSelectionState;
    columnMeasureInfo?: {
        index: number;
        column: IColumn;
        onMeasureDone: (measuredWidth: number) => void;
    };
    isDropping?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export declare type IDetailsRowStyleProps = Required<Pick<IDetailsRowProps, 'theme'>> & Pick<IDetailsRowProps, 'disabled'> & {
    /** Whether the row is selected  */
    isSelected?: boolean;
    /** Whether there are any rows in the list selected */
    anySelected?: boolean;
    /** Whether this row can be selected */
    canSelect?: boolean;
    /** Class name of when this becomes a drop target. */
    droppingClassName?: string;
    /** Is the checkbox visible */
    isCheckVisible?: boolean;
    /** Is this a row header */
    isRowHeader?: boolean;
    /** A class name from the checkbox cell, so proper styling can be targeted */
    checkboxCellClassName?: string;
    /** CSS class name for the component */
    className?: string;
    /** Is list in compact mode */
    compact?: boolean;
    cellStyleProps?: ICellStyleProps;
    /** Whether to animate updates */
    enableUpdateAnimations?: boolean;
};

/**
 * {@docCategory DetailsList}
 */
export declare interface IDetailsRowStyles {
    root: IStyle;
    cell: IStyle;
    cellAnimation: IStyle;
    cellUnpadded: IStyle;
    cellPadded: IStyle;
    checkCell: IStyle;
    isRowHeader: IStyle;
    isMultiline: IStyle;
    fields: IStyle;
    cellMeasurer: IStyle;
    /**
     * @deprecated Node removed, do not use
     */
    checkCover?: IStyle;
    check: IStyle;
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialog {
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogContent {
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogContentProps extends React_2.ClassAttributes<DialogContentBase> {
    children?: React_2.ReactNode;
    /**
     * Optional callback to access the IDialogContent interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IDialogContent>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDialogContentStyleProps, IDialogContentStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Is inside a multiline wrapper
     */
    isMultiline?: boolean;
    /**
     * Show an 'x' close button in the upper-right corner
     */
    showCloseButton?: boolean;
    /**
     * Other top buttons that will show up next to the close button
     */
    topButtonsProps?: IButtonProps[];
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * Callback for when the Dialog is dismissed from the close button or light dismiss, before the animation completes.
     */
    onDismiss?: (ev?: React_2.MouseEvent<HTMLButtonElement>) => any;
    /**
     * The Id for subText container
     */
    subTextId?: string;
    /**
     * The subtext to display in the dialog
     */
    subText?: string;
    /**
     * The Id for title container
     *
     * @deprecated use the `id` attribute in `titleProps` instead.
     */
    titleId?: string;
    /**
     * The title text to display at the top of the dialog.
     */
    title?: string | JSX.Element;
    /**
     * The props for title container.
     */
    titleProps?: React_2.HTMLAttributes<HTMLDivElement>;
    /**
     * Responsive mode passed in from decorator.
     */
    responsiveMode?: ResponsiveMode;
    /**
     * Label to be passed to to aria-label of close button
     * @defaultvalue Close
     */
    closeButtonAriaLabel?: string;
    /**
     * The type of Dialog to display.
     * @defaultvalue DialogType.normal
     */
    type?: DialogType;
    /**
     * The classname for when the header is draggable
     */
    draggableHeaderClassName?: string;
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogContentStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    isLargeHeader?: boolean;
    isClose?: boolean;
    hidden?: boolean;
    /**
     * Is inside a multiline wrapper
     */
    isMultiline?: boolean;
    /**
     * The classname for when the header is draggable
     */
    draggableHeaderClassName?: string;
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogContentStyles {
    /**
     * Style for the content element.
     */
    content: IStyle;
    subText: IStyle;
    header: IStyle;
    button: IStyle;
    inner: IStyle;
    innerContent: IStyle;
    title: IStyle;
    topButton: IStyle;
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogFooter {
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogFooterProps extends IReactProps<DialogFooterBase> {
    children?: React_2.ReactNode;
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDialogFooter>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDialogFooterStyleProps, IDialogFooterStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogFooterStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogFooterStyles {
    /**
     * Style for the actions element.
     */
    actions: IStyle;
    actionsRight: IStyle;
    action: IStyle;
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogProps extends React_2.ClassAttributes<DialogBase>, IWithResponsiveModeState, IAccessiblePopupProps {
    children?: React_2.ReactNode;
    /**
     * @deprecated Unused, returns no value
     */
    componentRef?: IRefObject<IDialog>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDialogStyleProps, IDialogStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Props to be passed through to Dialog Content
     */
    dialogContentProps?: IDialogContentProps;
    /**
     * A callback function for when the Dialog is dismissed from the close button or light dismiss.
     * Can also be specified separately in content and modal.
     */
    onDismiss?: (ev?: React_2.MouseEvent<HTMLButtonElement>) => any;
    /**
     * Whether the dialog is hidden.
     * @defaultvalue true
     */
    hidden?: boolean;
    /**
     * Props to be passed through to Modal
     */
    modalProps?: IModalProps;
    /**
     * Whether the dialog is displayed.
     * @defaultvalue false
     * @deprecated Use `hidden` instead
     */
    isOpen?: boolean;
    /**
     * Whether the overlay is dark themed.
     * @defaultvalue true
     * @deprecated Pass through via `modalProps` instead
     */
    isDarkOverlay?: boolean;
    /**
     * A callback function which is called after the Dialog is dismissed and the animation is complete.
     * @deprecated Pass through via `modalProps` instead
     */
    onDismissed?: () => any;
    /**
     * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
     * @defaultvalue false
     * @deprecated Pass through via `modalProps` instead
     */
    isBlocking?: boolean;
    /**
     * Optional class name to be added to the root class
     * @deprecated Pass through via `modalProps.className` instead
     */
    className?: string;
    /**
     * Optional override for container class
     * @deprecated Pass through via `modalProps.className` instead
     */
    containerClassName?: string;
    /**
     * A callback function for when the Dialog content is mounted on the overlay layer
     * @deprecated Pass through via `modalProps.layerProps` instead
     */
    onLayerDidMount?: () => void;
    /**
     * Deprecated at 0.81.2.
     * @deprecated Use `onLayerDidMount` instead.
     */
    onLayerMounted?: () => void;
    /**
     * The type of Dialog to display.
     * @defaultvalue DialogType.normal
     * @deprecated Pass through via `dialogContentProps` instead.
     */
    type?: DialogType;
    /**
     * The title text to display at the top of the dialog.
     * @deprecated Pass through via `dialogContentProps` instead.
     */
    title?: string | JSX.Element;
    /**
     * The subtext to display in the dialog.
     * @deprecated Pass through via `dialogContentProps` instead.
     */
    subText?: string;
    /**
     * Optional override content class
     * @deprecated Pass through via `dialogContentProps` instead as `className`.
     */
    contentClassName?: string;
    /**
     * Other top buttons that will show up next to the close button
     * @deprecated Pass through via `dialogContentProps` instead.
     */
    topButtonsProps?: IButtonProps[];
    /**
     * Optional id for aria-LabelledBy
     * @deprecated Pass through via `modalProps.titleAriaId` instead.
     */
    ariaLabelledById?: string;
    /**
     * Optional id for aria-DescribedBy
     * @deprecated Pass through via `modalProps.subtitleAriaId` instead.
     */
    ariaDescribedById?: string;
    /**
     * Sets the minimum width of the dialog. It limits the width property to be not
     * smaller than the value specified in min-width.
     */
    minWidth?: ICSSRule | ICSSPixelUnitRule;
    /**
     * Sets the maximum width for the dialog. It limits the width property to be larger
     * than the value specified in max-width.
     */
    maxWidth?: ICSSRule | ICSSPixelUnitRule;
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * Optional override for container class
     * @deprecated Pass through via `modalProps.className` instead.
     */
    containerClassName?: string;
    /**
     * Optional override content class
     * @deprecated Pass through via `dialogContentProps` instead as `className`.
     */
    contentClassName?: string;
    /**
     * Whether the dialog is hidden.
     * @defaultvalue false
     */
    hidden?: boolean;
    /**
     * Default min-width for the dialog box.
     * @defaultvalue '288px'
     */
    dialogDefaultMinWidth?: string | ICSSRule | ICSSPixelUnitRule;
    /**
     * Default max-width for the dialog box.
     * @defaultvalue '340px'
     */
    dialogDefaultMaxWidth?: string | ICSSRule | ICSSPixelUnitRule;
}

/**
 * {@docCategory Dialog}
 */
export declare interface IDialogStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    main: IStyle;
}

export { IDictionary }

export { IDisposable }

/**
 * {@docCategory Breadcrumb}
 */
export declare interface IDividerAsProps extends IIconProps {
    /**
     * Breadcrumb item to left of the divider to be passed for custom rendering.
     * For overflowed items, it will be last item in the list.
     */
    item?: IBreadcrumbItem;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCard {
    /**
     * Sets focus to the DocumentCard.
     */
    focus: () => void;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActions {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActionsProps extends React_2.ClassAttributes<DocumentCardActionsBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardActions>;
    /**
     * The actions available for this document.
     */
    actions: IButtonProps[];
    /**
     * The number of views this document has received.
     */
    views?: Number;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardActionsStyleProps, IDocumentCardActionsStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActionsStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActionsStyles {
    root: IStyle;
    action: IStyle;
    views: IStyle;
    viewsIcon: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivity {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivityPerson {
    /**
     * The name of the person.
     */
    name: string;
    /**
     * Path to the profile photo of the person.
     */
    profileImageSrc: string;
    /**
     * The user's initials to display in the profile photo area when there is no image.
     */
    initials?: string;
    /**
     * Whether initials are calculated for phone numbers and number sequences.
     * Example: Set property to true to get initials for project names consisting of numbers only.
     * @defaultvalue false
     */
    allowPhoneInitials?: boolean;
    /**
     * The background color when the user's initials are displayed.
     * @defaultvalue PersonaInitialsColor.blue
     */
    initialsColor?: PersonaInitialsColor;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivityProps extends React_2.ClassAttributes<DocumentCardActivityBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardActivity>;
    /**
     * Describes the activity that has taken place, such as "Created Feb 23, 2016".
     */
    activity: string;
    /**
     * One or more people who are involved in this activity.
     */
    people: IDocumentCardActivityPerson[];
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardActivityStyleProps, IDocumentCardActivityStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivityStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * Indicates if multiple people are being shown.
     */
    multiplePeople?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardActivityStyles {
    root: IStyle;
    avatars: IStyle;
    avatar: IStyle;
    details: IStyle;
    name: IStyle;
    activity: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardContext {
    role?: string;
    tabIndex?: number;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardDetails {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardDetailsProps extends IReactProps<DocumentCardDetailsBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardDetails>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardDetailsStyleProps, IDocumentCardDetailsStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardDetailsStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardDetailsStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardImage {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardImageProps extends IBaseProps<{}> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardImage>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardImageStyleProps, IDocumentCardImageStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * Path to the preview image.
     */
    imageSrc?: string;
    /**
     * The props for the icon associated with this document type.
     */
    iconProps?: IIconProps;
    /**
     * If provided, forces the preview image to be this width.
     */
    width?: number;
    /**
     * If provided, forces the preview image to be this height.
     */
    height?: number;
    /**
     * Used to determine how to size the image to fit the dimensions of the component.
     * If both dimensions are provided, then the image is fit using ImageFit.scale, otherwise ImageFit.none is used.
     */
    imageFit?: ImageFit;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardImageStyleProps extends IDocumentCardImageProps {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardImageStyles {
    root: IStyle;
    cornerIcon: IStyle;
    centeredIcon: IStyle;
    centeredIconWrapper: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLocation {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLocationProps extends React_2.ClassAttributes<DocumentCardLocationBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardLocation>;
    /**
     * Text for the location of the document.
     */
    location: string;
    /**
     * URL to navigate to for this location.
     */
    locationHref?: string;
    /**
     * Function to call when the location is clicked.
     */
    onClick?: (ev?: React_2.MouseEvent<HTMLElement>) => void;
    /**
     * Aria label for the link to the document location.
     */
    ariaLabel?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardLocationStyleProps, IDocumentCardLocationStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLocationStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLocationStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLogo {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLogoProps extends React_2.ClassAttributes<DocumentCardLogoBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardLogo>;
    /**
     * Describes DocumentCard Logo badge.
     */
    logoIcon: string;
    /**
     * Describe Logo name, optional.
     */
    logoName?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardLogoStyleProps, IDocumentCardLogoStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLogoStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardLogoStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreview {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreviewImage {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<{}>;
    /**
     * File name for the document this preview represents.
     */
    name?: string;
    /**
     * URL to view the file.
     * @deprecated Use `href` inside of `linkProps` instead.
     */
    url?: string;
    /**
     * Props to pass to Link component
     */
    linkProps?: ILinkProps;
    /**
     * Path to the preview image.
     */
    previewImageSrc?: string;
    /**
     * @deprecated To be removed at \>= v2.0.0.
     */
    errorImageSrc?: string;
    /**
     * Path to the icon associated with this document type.
     *
     */
    iconSrc?: string;
    /**
     * If provided, forces the preview image to be this width.
     */
    width?: number;
    /**
     * If provided, forces the preview image to be this height.
     */
    height?: number;
    /**
     * Used to determine how to size the image to fit the dimensions of the component.
     * If both dimensions are provided, then the image is fit using ImageFit.scale, otherwise ImageFit.none is used.
     */
    imageFit?: ImageFit;
    /**
     * Hex color value of the line below the preview, which should correspond to the document type.
     *
     * @deprecated To be removed at \>= v5.0.0.
     */
    accentColor?: string;
    /**
     * The props for the preview icon.
     * If provided, icon will be rendered instead of image.
     */
    previewIconProps?: IIconProps;
    /**
     * The props for the preview icon container classname.
     * If provided, icon container classname will be used..
     */
    previewIconContainerClass?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreviewProps extends IBaseProps<{}> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardPreview>;
    /**
     * One or more preview images to display.
     */
    previewImages: IDocumentCardPreviewImage[];
    /**
     * The function return string that will describe the number of overflow documents.
     * such as  (overflowCount: number) =\> `+${ overflowCount } more`,
     */
    getOverflowDocumentCountText?: (overflowCount: number) => string;
    /**
     * Maximum number of document previews to display
     * @default 3
     */
    maxDisplayCount?: number;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardPreviewStyleProps, IDocumentCardPreviewStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreviewStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * Is it a list of files rather than a preview image?
     */
    isFileList?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardPreviewStyles {
    root: IStyle;
    previewIcon: IStyle;
    icon: IStyle;
    fileList: IStyle;
    fileListIcon: IStyle;
    fileListLink: IStyle;
    fileListOverflowText: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardProps extends IBaseProps<IDocumentCard>, React_2.HTMLAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IDocumentCard interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IDocumentCard>;
    /**
     * The type of DocumentCard to display.
     * @defaultvalue DocumentCardType.normal
     */
    type?: DocumentCardType;
    /**
     * Function to call when the card is clicked or keyboard Enter/Space is pushed.
     */
    onClick?: (ev?: React_2.SyntheticEvent<HTMLElement>) => void;
    /**
     * A URL to navigate to when the card is clicked. If a function has also been provided,
     * it will be used instead of the URL.
     */
    onClickHref?: string;
    /**
     * A target browser context for opening the link. If not specified, will open in the same tab/window.
     */
    onClickTarget?: string;
    /**
     * Aria role assigned to the documentCard (Eg. button, link).
     * Use this to override the default assignment.
     * @defaultvalue When `onClick` is provided, default role will be 'button'.
     * When `onClickHref` is provided, default role will be 'link'.
     */
    role?: string;
    /**
     * Hex color value of the line below the card, which should correspond to the document type.
     * This should only be supplied when using the 'compact' card layout.
     *
     * @deprecated To be removed at \>= v5.0.0.
     */
    accentColor?: string;
    /**
     * Child components to render within the card.
     */
    children?: React_2.ReactNode;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardStyleProps, IDocumentCardStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStatus {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStatusProps extends IReactProps<DocumentCardStatusBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardStatus>;
    /**
     * Describes DocumentCard status icon.
     */
    statusIcon?: string;
    /**
     * Describe status information. Required field.
     */
    status: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardStatusStyleProps, IDocumentCardStatusStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStatusStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStatusStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * True when the card has a click action.
     */
    actionable?: boolean;
    /**
     * Compact variant of the card.
     */
    compact?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardStyles {
    root: IStyle;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardTitle {
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardTitleProps extends React_2.ClassAttributes<DocumentCardTitleBase> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IDocumentCardTitle>;
    /**
     * Title text.
     * If the card represents more than one document, this should be the title of one document and a "+X" string.
     * For example, a collection of four documents would have a string of "Document.docx +3".
     */
    title: string;
    /**
     * Whether we truncate the title to fit within the box. May have a performance impact.
     * @defaultvalue true
     */
    shouldTruncate?: boolean;
    /**
     * Whether show as title as secondary title style such as smaller font and lighter color.
     * @defaultvalue false
     */
    showAsSecondaryTitle?: boolean;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IDocumentCardTitleStyleProps, IDocumentCardTitleStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
}

declare interface IDocumentCardTitleState {
    truncatedTitleFirstPiece?: string;
    truncatedTitleSecondPiece?: string;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardTitleStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Optional override class name
     */
    className?: string;
    /**
     * Is this a secondary title?
     */
    showAsSecondaryTitle?: boolean;
}

/**
 * {@docCategory DocumentCard}
 */
export declare interface IDocumentCardTitleStyles {
    root: IStyle;
}

/**
 * Drag & drop event contextual information.
 *
 * {@docCategory IDragDropHelper}
 */
export declare interface IDragDropContext {
    /**
     * Data associated with drag & drop action.
     */
    data: any;
    /**
     * Index of drag & drop action.
     */
    index: number;
    /**
     * Whether or not drag & drop region is indivual or group of content.
     */
    isGroup?: boolean;
}

/**
 * {@docCategory IDragDropHelper}
 */
export declare interface IDragDropEvent {
    /**
     * Whether or not the drag & drop event was handled.
     */
    isHandled?: boolean;
}

/**
 * Drag & drop event callback interface.
 *
 * {@docCategory IDragDropHelper}
 */
export declare interface IDragDropEvents {
    /**
     * Whether or not drop action is allowed.
     */
    canDrop?: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => boolean;
    /**
     * Whether or not drag action is allowed.
     */
    canDrag?: (item?: any) => boolean;
    /**
     * On drag enter region event callback.
     * Returned string is the css classes that will be added to the entering element.
     */
    onDragEnter?: (item?: any, event?: DragEvent) => string;
    /**
     * On drag leave region event callback.
     */
    onDragLeave?: (item?: any, event?: DragEvent) => void;
    /**
     * On drop event callback.
     */
    onDrop?: (item?: any, event?: DragEvent) => void;
    /**
     * On drag start event callback.
     */
    onDragStart?: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => void;
    /**
     * On drag end event callback.
     */
    onDragEnd?: (item?: any, event?: DragEvent) => void;
    /**
     * On drag over event callback.
     */
    onDragOver?: (item?: any, event?: DragEvent) => void;
    /**
     * Whether the whole group is draggable. This applies after canDrag returns true for the group.
     */
    canDragGroups?: boolean;
}

/**
 * Helper for subscribing and unsubscribing to
 * drag and drop events on an HTMLElement.
 *
 * {@docCategory IDragDropHelper}
 */
export declare interface IDragDropHelper {
    /**
     * Subscribe to events on a DOM node with drag and drop configuration.
     */
    subscribe: (root: HTMLElement, events: EventGroup, options: IDragDropOptions) => {
        key: string;
        dispose: () => void;
    };
    /**
     * Unsubscribe to events registered on a DOM node with key.
     */
    unsubscribe: (root: HTMLElement, key: string) => void;
    /**
     * Dispose of listeners bound to instance of helper.
     */
    dispose: () => void;
}

export declare interface IDragDropHelperParams {
    selection: ISelection;
    minimumPixelsForDrag?: number;
}

/**
 * The drag and drop event listener configuration.
 *
 * {@docCategory IDragDropHelper}
 */
export declare interface IDragDropOptions {
    /**
     * Unique key to associate with instance.
     */
    key?: string;
    /**
     * Map of event name to callback function to subscribe to.
     */
    eventMap?: {
        eventName: string;
        callback: (context: IDragDropContext, event?: any) => void;
    }[];
    /**
     * Selection index on drag and drop event.
     */
    selectionIndex: number;
    /**
     * Context associated with drag and drop event.
     */
    context: IDragDropContext;
    /**
     * Callback on drop state update.
     */
    updateDropState: (isDropping: boolean, event: DragEvent) => void;
    /**
     * Whether or not drop action is allowed.
     */
    canDrop?: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => boolean;
    /**
     * Whether or not drag action is allowed.
     */
    canDrag?: (item?: any) => boolean;
    /**
     * On drag start event callback.
     */
    onDragStart?: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => void;
    /**
     * On drop event callback.
     */
    onDrop?: (item?: any, event?: DragEvent) => void;
    /**
     * On drag end event callback.
     */
    onDragEnd?: (item?: any, event?: DragEvent) => void;
    /**
     * On drag over element(s) event callback.
     */
    onDragOver?: (item?: any, event?: DragEvent) => void;
}

export declare interface IDragDropTarget {
    root: HTMLElement;
    options: IDragDropOptions;
    key: string;
}

export declare interface IDragOptions {
    /**
     * Optional selector for the element where the drag can be initiated. If not supplied when
     * isDraggable is true dragging can be initiated by the whole contents of the modal
     */
    dragHandleSelector?: string;
    /**
     * IconProps for the icon used to indicate that the dialog is in keyboard move mode
     */
    keyboardMoveIconProps?: IIconProps;
    /**
     * The text to use for the modal move menu item
     */
    moveMenuItemText: string;
    /**
     * The text to use for the modal close menu item
     */
    closeMenuItemText: string;
    /**
     * The Draggable Control Menu so that the draggable zone can be moved via the keyboard
     */
    menu: React_2.FunctionComponent<IContextualMenuProps>;
    /**
     * Whether the draggable content should be prevented from going off-screen
     */
    keepInBounds?: boolean;
}

/**
 * {@docCategory Dropdown}
 */
export declare interface IDropdown {
    /**
     * All selected options
     */
    readonly selectedOptions: IDropdownOption[];
    /**
     * An imperative handle to dismiss the popup if it is open
     */
    dismissMenu: () => void;
    focus: (shouldOpenOnFocus?: boolean) => void;
}

/**
 * {@docCategory Dropdown}
 */
export declare interface IDropdownOption<T = any> extends ISelectableOption<T> {
    /**
     * @deprecated Use `selected` instead. Deprecated at v.65.1.
     */
    isSelected?: boolean;
}

/**
 * {@docCategory Dropdown}
 */
export declare interface IDropdownProps extends ISelectableDroppableTextProps<IDropdown, HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Input placeholder text. Displayed until option is selected.
     * @deprecated Use `placeholder`
     */
    placeHolder?: string;
    /**
     * Options for the dropdown. If using `defaultSelectedKey` or `defaultSelectedKeys`, options must be
     * pure for correct behavior.
     */
    options: IDropdownOption[];
    /**
     * Callback issued when the selected option changes.
     */
    onChange?: (event: React_2.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => void;
    /**
     * @deprecated Use `onChange` instead.
     */
    onChanged?: (option: IDropdownOption, index?: number) => void;
    /**
     * Custom render function for the label.
     */
    onRenderLabel?: IRenderFunction<IDropdownProps>;
    /**
     * Optional custom renderer for placeholder text
     */
    onRenderPlaceholder?: IRenderFunction<IDropdownProps>;
    /**
     * Optional custom renderer for placeholder text
     * @deprecated Use `onRenderPlaceholder`
     */
    onRenderPlaceHolder?: IRenderFunction<IDropdownProps>;
    /**
     * Optional custom renderer for selected option displayed in input
     */
    onRenderTitle?: IRenderFunction<IDropdownOption[]>;
    /**
     * Optional custom renderer for chevron icon
     */
    onRenderCaretDown?: IRenderFunction<IDropdownProps>;
    /**
     * Custom width for dropdown. If value is 0, width of the input field is used.
     * If value is 'auto', width of the input field is used by default, and it can grow wider to fit the content.
     * @defaultvalue 0
     */
    dropdownWidth?: number | 'auto';
    /**
     * Pass in ResponsiveMode to manually overwrite the way the Dropdown renders.
     * ResponsiveMode.large would, for instance, disable the behavior where Dropdown options
     * get rendered into a Panel while ResponsiveMode.small would result in the Dropdown
     * options always getting rendered in a Panel.
     */
    responsiveMode?: ResponsiveMode;
    /**
     * Keys that will be initially used to set selected items. This prop is used for `multiSelect`
     * scenarios. In other cases, `defaultSelectedKey` should be used.
     */
    defaultSelectedKeys?: string[] | number[];
    /**
     * Keys of the selected items. If you provide this, you must maintain selection
     * state by observing onChange events and passing a new value in when changed.
     * Passing null in will clear the selection.
     * Mutually exclusive with `defaultSelectedKeys`.
     */
    selectedKeys?: string[] | number[] | null;
    /**
     * When multiple items are selected, this still will be used to separate values in
     * the dropdown title.
     *
     * @defaultvalue ", "
     */
    multiSelectDelimiter?: string;
    /**
     * Optional preference to have onChanged still be called when an already selected item is
     * clicked in single select mode.  Default to false
     */
    notifyOnReselect?: boolean;
    /**
     * @deprecated Use `disabled` instead. Deprecated at v0.52.0.
     */
    isDisabled?: boolean;
    /**
     * Theme provided by higher order component.
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IDropdownStyleProps, IDropdownStyles>;
}

/**
 * The props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory Dropdown}
 */
export declare type IDropdownStyleProps = Pick<IDropdownProps, 'theme' | 'className' | 'disabled' | 'required'> & {
    /**
     * Whether the dropdown is in an error state.
     */
    hasError: boolean;
    /**
     * Specifies if the dropdown has label content.
     */
    hasLabel: boolean;
    /**
     * Whether the dropdown is in an opened state.
     */
    isOpen: boolean;
    /**
     * Whether the dropdown is presently rendering a placeholder.
     */
    isRenderingPlaceholder: boolean;
    /**
     * Optional custom className for the panel that displays in small viewports, hosting the Dropdown options.
     * This is primarily provided for backwards compatibility.
     */
    panelClassName?: string;
    /**
     * Optional custom className for the callout that displays in larger viewports, hosting the Dropdown options.
     * This is primarily provided for backwards compatibility.
     */
    calloutClassName?: string;
    /**
     * Prop to notify on what edge the dropdown callout was positioned respective to the title.
     */
    calloutRenderEdge?: RectangleEdge;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Dropdown}
 */
export declare interface IDropdownStyles {
    /** Root element of the Dropdown (includes Label and the actual Dropdown). */
    root: IStyle;
    /** Refers to the label associated with the dropdown. This is enclosed by the root. */
    label: IStyle;
    /** Refers to the actual Dropdown element. */
    dropdown: IStyle;
    /** Refers to the primary title of the Dropdown (rendering the selected options/placeholder/etc.). */
    title: IStyle;
    /** Refers to the wrapping container around the downward pointing caret users click on to expand the Dropdown. */
    caretDownWrapper: IStyle;
    /** Refers to the downward pointing caret icon users click on to expand the Dropdown. */
    caretDown: IStyle;
    /** Refers to the error message being rendered under the Dropdown (if any). */
    errorMessage: IStyle;
    /** Refers to the element that wraps `dropdownItems`. */
    dropdownItemsWrapper: IStyle;
    /** Refers to the FocusZone wrapping the individual dropdown items. */
    dropdownItems: IStyle;
    /** Refers to the individual dropdown item. */
    dropdownItem: IStyle;
    /** Style for a dropdown item when it is being selected. */
    dropdownItemSelected: IStyle;
    /** Style for a dropdown item when it is disabled. */
    dropdownItemDisabled: IStyle;
    /** Style for a dropdown item when it is both selected and disabled. */
    dropdownItemSelectedAndDisabled: IStyle;
    /** Style for a dropdown item when it is hidden */
    dropdownItemHidden: IStyle;
    /**
     * Refers to the text element that renders the actual dropdown item/option text. This would be wrapped by the element
     * referred to by `dropdownItem`.
     */
    dropdownOptionText: IStyle;
    /** Refers to the dropdown separator. */
    dropdownDivider: IStyle;
    /** Style for dropdown separator when hidden. */
    dropdownDividerHidden: IStyle;
    /** Refers to the individual dropdown items that are being rendered as a header. */
    dropdownItemHeader: IStyle;
    /** Style for dropdown header when hidden. */
    dropdownItemHeaderHidden: IStyle;
    /**
     * Refers to the panel that hosts the Dropdown options in small viewports.
     * @deprecated Use `subComponentStyles.panel` instead.
     */
    panel: IStyle;
    /** Refers to the callout that hosts Dropdown options in larger viewports. */
    callout: IStyle;
    /** Subcomponent styles. */
    subComponentStyles: IDropdownSubComponentStyles;
}

/**
 * {@docCategory Dropdown}
 */
export declare interface IDropdownSubComponentStyles {
    /** Refers to the panel that hosts the Dropdown options in small viewports. */
    panel: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>;
    /** Refers to the primary label for the Dropdown. */
    label: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>;
    /** Refers to the individual dropdown item when the multiSelect prop is true. */
    multiSelectItem: IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>;
}

/**
 * {@docCategory DetailsList}
 */
export declare interface IDropHintDetails {
    originX: number;
    startX: number;
    endX: number;
    dropHintElementRef: HTMLElement;
}

export declare interface IEditingSelectedPeopleItemProps extends ISelectedPeopleItemProps {
    onEditingComplete: (oldItem: any, newItem: any) => void;
    onRenderFloatingPicker?: React_2.ComponentType<IBaseFloatingPickerProps<IPersonaProps>>;
    floatingPickerProps?: IBaseFloatingPickerProps<IPersonaProps>;
    getEditingItemText?: (item: IExtendedPersonaProps) => string;
}

export declare interface IEditingSelectedPeopleItemStyles {
    root: IStyle;
    input: IStyle;
}

export declare interface IEditingSelectedPeopleItemStylesProps {
}

export { IEffects }

/**
 * Do not call methods from this directly, use either positionCallout or positionElement or make another function that
 * utilizes them.
 * START Private functions and interfaces
 */
export declare interface IElementPosition {
    elementRectangle: Rectangle;
    targetEdge: RectangleEdge;
    alignmentEdge: RectangleEdge | undefined;
    forcedInBounds?: boolean;
}

export declare interface IElementPositionInfo extends IElementPosition {
    targetRectangle: Rectangle;
}

/**
 * An interface for the cached dimensions of entity inner host.
 */
export declare interface IEntityRect {
    width?: number;
    height?: number;
}

export { IEventRecord }

export { IEventRecordList }

export { IEventRecordsByName }

/**
 * {@docCategory HoverCard}
 */
export declare interface IExpandingCard {
}

/**
 * ExpandingCard component props.
 * {@docCategory HoverCard}
 */
export declare interface IExpandingCardProps extends IBaseCardProps<IExpandingCard, IExpandingCardStyles, IExpandingCardStyleProps> {
    /**
     * Height of compact card
     * @defaultvalue 156
     */
    compactCardHeight?: number;
    /**
     * Height of expanded card
     * @defaultvalue 384
     */
    expandedCardHeight?: number;
    /**
     * Use to open the card in expanded format and not wait for the delay
     * @defaultvalue ExpandingCardMode.compact
     */
    mode?: ExpandingCardMode;
    /**
     *  Render function to populate compact content area
     */
    onRenderCompactCard?: IRenderFunction<any>;
    /**
     *  Render function to populate expanded content area
     */
    onRenderExpandedCard?: IRenderFunction<any>;
}

export declare interface IExpandingCardState {
    firstFrameRendered: boolean;
    needsScroll: boolean;
}

/**
 * {@docCategory HoverCard}
 */
export declare interface IExpandingCardStyleProps extends IBaseCardStyleProps {
    /**
     * Height of the compact section of the card.
     */
    compactCardHeight?: number;
    /**
     * Boolean flag that expanded card is in Expanded.mode === expanded && first frame was rendered.
     */
    expandedCardFirstFrameRendered?: boolean;
    /**
     * Height of the expanded section of the card.
     */
    expandedCardHeight?: number;
    /**
     * Whether the content of the expanded card overflows vertically.
     */
    needsScroll?: boolean;
}

/**
 * {@docCategory HoverCard}
 */
export declare interface IExpandingCardStyles extends IBaseCardStyles {
    /**
     * Style for the main card element.
     */
    compactCard?: IStyle;
    /**
     * Base Style for the expanded card content.
     */
    expandedCard?: IStyle;
    /**
     * Style for the expanded card scroll content.
     */
    expandedCardScroll?: IStyle;
}

/**
 * {@docCategory ExtendedPeoplePicker}
 */
export declare interface IExtendedPeoplePickerProps extends IBaseExtendedPickerProps<IPersonaProps> {
}

/**
 * {@docCategory SelectedPeopleList}
 */
export declare interface IExtendedPersonaProps extends IPersonaProps {
    key?: React_2.Key;
    isValid: boolean;
    blockRecipientRemoval?: boolean;
    shouldBlockSelection?: boolean;
    canExpand?: boolean;
    isEditing?: boolean;
}

export declare interface IFabricProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    componentRef?: IRefObject<{}>;
    /**
     * Overrides the root element type, defaults to `div`.
     */
    as?: React_2.ElementType;
    /**
     * Injected by the `styled` HOC wrapper.
     */
    theme?: ITheme;
    /**
     * Overrides the styles for the component.
     */
    styles?: IStyleFunctionOrObject<IFabricStyleProps, IFabricStyles>;
    /**
     * Applies the current body background specified in the theme to the root element.
     */
    applyTheme?: boolean;
    /**
     * Applies the current body background specified in the theme to the body element.
     */
    applyThemeToBody?: boolean;
    /**
     * Specifies the direction of the content. Will inject a `dir` attribute, and also ensure that the `rtl` flag of the
     * contextual theme object is set correctly so that css registered with merge-styles can be auto flipped correctly.
     */
    dir?: 'rtl' | 'ltr' | 'auto';
    /**
     * By default, the Fabric component has children selectors for button, input and textarea elements that apply the
     * style `fontFamily: 'inherit'`. This is done so the font family is consistent across all of these elements under a
     * Fabric component. However, this is expensive in style recalculation scenarios and it is not the responsibility of
     * the Fabric component to ensure that non-Fluent elements within it have these styles.
     * Setting this prop to true prevents the Fabric component from applying these children selectors. As long as only
     * v8 Fluent components are being used within it, no changes should be apparent since all Fluent components already
     * set the font family in their styles.
     * @defaultvalue false
     */
    preventBlanketFontInheritance?: boolean;
}

export declare interface IFabricStyleProps extends IFabricProps {
    theme: ITheme;
}

export declare interface IFabricStyles {
    root: IStyle;
    bodyThemed: IStyle;
}

/**
 * {@docCategory Facepile}
 */
export declare interface IFacepile {
}

/**
 * {@docCategory Facepile}
 */
export declare interface IFacepilePersona extends React_2.ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement> {
    /**
     * Name of the person.
     */
    personaName?: string;
    /**
     * Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.
     */
    imageUrl?: string;
    /**
     * The user's initials to display in the image area when there is no image.
     * @defaultvalue Derived from `personaName`
     */
    imageInitials?: string;
    /**
     * Whether initials are calculated for phone numbers and number sequences.
     * Example: Set property to true to get initials for project names consisting of numbers only.
     * @defaultvalue false
     */
    allowPhoneInitials?: boolean;
    /**
     * The background color when the user's initials are displayed.
     * @defaultvalue Derived from `personaName`
     */
    initialsColor?: PersonaInitialsColor;
    /**
     * If provided, persona will be rendered with cursor:pointer and the handler will be
     * called on click.
     */
    onClick?: (ev?: React_2.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;
    /**
     * If provided, the handler will be called on mouse move.
     */
    onMouseMove?: (ev?: React_2.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;
    /**
     * If provided, the handler will be called when mouse moves out of the component.
     */
    onMouseOut?: (ev?: React_2.MouseEvent<HTMLElement>, persona?: IFacepilePersona) => void;
    /**
     * Extra data - not used directly but can be handy for passing additional data to custom event
     * handlers.
     */
    data?: any;
    /**
     * Optional keytip for this button that is only added when 'onClick' is defined for the persona
     */
    keytipProps?: IKeytipProps;
}

/**
 * {@docCategory Facepile}
 */
export declare interface IFacepileProps extends React_2.ClassAttributes<FacepileBase> {
    /**
     * Optional callback to access the IFacepile interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IFacepile>;
    /**
     * Whether the default tooltip (the persona name) is shown using the `title` prop.
     * Set this to false if you'd like to display a custom tooltip, for example using a custom renderer and TooltipHost
     * @defaultvalue true
     */
    showTooltip?: boolean;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IFacepileStyleProps, IFacepileStyles>;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the Facepile
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * Array of IPersonaProps that define each Persona.
     */
    personas: IFacepilePersona[];
    /**
     * Personas to place in the overflow
     */
    overflowPersonas?: IFacepilePersona[];
    /** Maximum number of personas to show */
    maxDisplayablePersonas?: number;
    /** Size to display the personas */
    personaSize?: PersonaSize;
    /** ARIA label for persona list */
    ariaDescription?: string;
    /**
     * Defines the aria label that the screen readers use when focus goes on a list of personas.
     */
    ariaLabel?: string;
    /** Show add person button */
    showAddButton?: boolean;
    /** Button properties for the add face button */
    addButtonProps?: IButtonProps;
    /**
     * Deprecated at v0.70, use `overflowButtonProps` instead.
     * @deprecated Use `overflowButtonProps` instead.
     */
    chevronButtonProps?: IButtonProps;
    /** Properties for the overflow icon */
    overflowButtonProps?: IButtonProps;
    /** Type of overflow icon to use */
    overflowButtonType?: OverflowButtonType;
    /** Optional custom renderer for the persona, gets called when there is one persona in personas array*/
    onRenderPersona?: IRenderFunction<IFacepilePersona>;
    /** Optional custom renderer for the persona coins, gets called when there are multiple persona in personas array*/
    onRenderPersonaCoin?: IRenderFunction<IFacepilePersona>;
    /** Optional custom renderer for the FacepileButton that renders each clickable Persona */
    onRenderPersonaWrapper?: IRenderFunction<IFacepilePersona>;
    /** Method to access properties on the underlying Persona control */
    getPersonaProps?: (persona: IFacepilePersona) => IPersonaSharedProps;
}

/**
 * {@docCategory Facepile}
 */
export declare interface IFacepileStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * Pixel value for spacing around button. Number value set in pixels
     */
    spacingAroundItemButton?: number;
}

/**
 * {@docCategory Facepile}
 */
export declare interface IFacepileStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    addButton: IStyle;
    descriptiveOverflowButton: IStyle;
    itemContainer: IStyle;
    itemButton: IStyle;
    members: IStyle;
    member: IStyle;
    overflowButton: IStyle;
    overflowInitialsIcon: IStyle;
    screenReaderOnly: IStyle;
}

export { IFitContentToBoundsOptions }

export { IFocusRectsContext }

/**
 * {@docCategory Callout}
 */
export declare interface IFocusTrapCalloutProps extends ICalloutProps {
    /**
     * Optional props to be passed on to FocusTrapZone
     */
    focusTrapProps?: IFocusTrapZoneProps;
}

/**
 * {@docCategory FocusTrapZone}
 */
export declare interface IFocusTrapZone {
    /**
     * Sets focus to a descendant in the Trap Zone.
     * See firstFocusableSelector and focusPreviouslyFocusedInnerElement for details.
     */
    focus: () => void;
}

/**
 * {@docCategory FocusTrapZone}
 */
export declare interface IFocusTrapZoneProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IFocusTrapZone interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IFocusTrapZone>;
    /**
     * Whether to disable the FocusTrapZone's focus trapping behavior.
     * @defaultvalue false
     */
    disabled?: boolean;
    /**
     * Sets the element to focus on when exiting the FocusTrapZone.
     * @defaultvalue The `element.target` that triggered the FTZ.
     */
    elementToFocusOnDismiss?: HTMLElement;
    /**
     * Sets the aria-labelledby attribute.
     */
    ariaLabelledBy?: string;
    /**
     * Whether clicks are allowed outside this FocusTrapZone.
     * @defaultvalue false
     */
    isClickableOutsideFocusTrap?: boolean;
    /**
     * If false (the default), the trap zone will restore focus to the element which activated it
     * once the trap zone is unmounted or disabled. Set to true to disable this behavior.
     * @defaultvalue false
     */
    disableRestoreFocus?: boolean;
    /**
     * @deprecated Use `disableRestoreFocus` (it has the same behavior and a clearer name).
     */
    ignoreExternalFocusing?: boolean;
    /**
     * Whether the focus trap zone should force focus to stay inside of it.
     * @defaultvalue true
     */
    forceFocusInsideTrap?: boolean;
    /**
     * Class name (not actual selector) for first focusable item. Do not append a dot.
     * Only applies if `focusPreviouslyFocusedInnerElement` is false.
     * @deprecated Use `firstFocusableTarget`, since it is more generic. `firstFocusableTarget` takes precedence if
     * supplied.
     */
    firstFocusableSelector?: string | (() => string);
    /**
     * Either a full query selector for the first focusable element, or a function to select the focusable element
     * within the area directly.
     */
    firstFocusableTarget?: string | ((element: HTMLElement) => HTMLElement | null);
    /**
     * Do not put focus onto the first element inside the focus trap zone.
     * @defaultvalue false
     */
    disableFirstFocus?: boolean;
    /**
     * Specifies which descendant element to focus when `focus()` is called.
     * If false, use the first focusable descendant, filtered by the `firstFocusableSelector` property if present.
     * If true, use the element that was focused when the trap zone last had a focused descendant
     * (or fall back to the first focusable descendant if the trap zone has never been focused).
     * @defaultvalue false
     */
    focusPreviouslyFocusedInnerElement?: boolean;
    /**
     * Puts aria-hidden=true on all non-ancestors of the current element, for screen readers.
     * In future versions of the library, this will be the default behavior.
     */
    enableAriaHiddenSiblings?: boolean;
}

export { IFocusZone }

export { IFocusZoneProps }

export { IFontFace }

/**
 * Props for a basic icon component which only supports font glyphs and can't be targeted by customizations.
 * {@docCategory Icon}
 */
export declare interface IFontIconProps extends React_2.HTMLAttributes<HTMLElement> {
    /**
     * The name of the icon to use from the icon font.
     * If string is empty, a placeholder icon will be rendered the same width as an icon.
     */
    iconName?: string;
    /**
     * Custom class to style the icon.
     */
    className?: string;
}

export { IFontStyles }

export { IFontWeight }

export { iframeProperties }

/**
 * Gap element interface
 * {@docCategory Shimmer}
 */
export declare interface IGap extends IShimmerElement {
    /**
     * Sets the height of the shimmer gap in pixels.
     * @defaultvalue 16px
     */
    height?: number;
    /**
     * Gap width value.
     * @defaultvalue 10px
     */
    width?: number | string;
}

/**
 * {@docCategory PeoplePicker}
 */
export declare interface IGenericItem {
    primaryText: string;
    imageInitials: string;
    ValidationState: ValidationState;
}

export { IGetFocusStylesOptions }

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroup {
    /**
     * Unique identifier for the group.
     */
    key: string;
    /**
     * Display name for the group, rendered on the header.
     */
    name: string;
    /**
     * Start index for the group within the given items.
     */
    startIndex: number;
    /**
     * How many items should be rendered within the group.
     */
    count: number;
    /**
     * Nested groups, if any.
     */
    children?: IGroup[];
    /**
     * Number indicating the level of nested groups.
     */
    level?: number;
    /**
     * @deprecated At 1.0.0, selection state wil be controlled by the selection store only.
     */
    isSelected?: boolean;
    /**
     * If all the items in the group are collapsed.
     */
    isCollapsed?: boolean;
    /**
     * If the items within the group are summarized or showing all.
     */
    isShowingAll?: boolean;
    /**
     * If drag/drop is enabled for the group header.
     */
    isDropEnabled?: boolean;
    /**
     * Arbitrary data required to be preserved by the caller.
     */
    data?: any;
    /**
     * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
     * If none is specified, the arai-label attribute will contain the group name
     */
    ariaLabel?: string;
    /**
     * Optional flag to indicate the group has more data to load than the current group count indicated.
     * This can be used to indicate that a plus should be rendered next to the group count in the header.
     */
    hasMoreData?: boolean;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupDividerProps {
    componentRef?: IRefObject<{}>;
    /** Boolean value to indicate if the component should render in compact mode. Set to false by default */
    compact?: boolean;
    /** Callback to determine if a group has missing items and needs to load them from the server. */
    isGroupLoading?: (group: IGroup) => boolean;
    /** Text shown on group headers to indicate the group is being loaded. */
    loadingText?: string;
    /** The group to be rendered by the header. */
    group?: IGroup;
    /** The index of the group. */
    groupIndex?: number;
    /** The indent level of the group. */
    groupLevel?: number;
    /** Defines the number of columns a group header needs to span in the case of a grid or treegrid */
    ariaColSpan?: number;
    /** Defines an element's nesting depth in the current set of treeitems */
    ariaLevel?: number;
    /** Defines the number of items in the current set of treeitems */
    ariaSetSize?: number;
    /** Defines an element's number or position in the current set of treeitems */
    ariaPosInSet?: number;
    /** Defines the number of items in the current set of grid items */
    ariaRowCount?: number;
    /** Defines an element's number or position in the current set of grid items */
    ariaRowIndex?: number;
    /**
     * Width corresponding to a single level.
     * This is multiplied by the groupLevel to get the full spacer width for the group.
     */
    indentWidth?: number;
    /** If all items in the group are selected. */
    selected?: boolean;
    /**
     * @deprecated Use `selected` instead. Deprecated at v.65.1.
     */
    isSelected?: boolean;
    /** A reference to the viewport in which the header is rendered. */
    viewport?: IViewport;
    /** The selection mode of the list the group lives within. */
    selectionMode?: SelectionMode_2;
    /** Text to display for the group footer. */
    footerText?: string;
    /** Text to display for the group "Show All" link. */
    showAllLinkText?: string;
    /** Callback for when the group "Show All" link is clicked */
    onToggleSummarize?: (group: IGroup) => void;
    /** Callback for when the group header is clicked. */
    onGroupHeaderClick?: (group: IGroup) => void;
    /** Callback for when the "keyup" event is fired on the group header. */
    onGroupHeaderKeyUp?: (ev: React_2.KeyboardEvent<HTMLElement>, group?: IGroup) => void;
    /** Callback for when the group is expanded or collapsed. */
    onToggleCollapse?: (group: IGroup) => void;
    /** Callback for when the group is selected. */
    onToggleSelectGroup?: (group: IGroup) => void;
    /** Determines if the group selection check box is shown for collapsed groups. */
    isCollapsedGroupSelectVisible?: boolean;
    /** Override which allows the caller to provider a custom renderer for the GroupHeader title. */
    onRenderTitle?: IRenderFunction<IGroupHeaderProps>;
    /** Override which allows the caller to provide a custom renderer for just the name. */
    onRenderName?: IRenderFunction<IGroupHeaderProps>;
    /** Props for expand/collapse button
     * @deprecated Use {@link IGroupHeaderProps.expandButtonProps} instead.
     */
    expandButtonProps?: React_2.HTMLAttributes<HTMLButtonElement>;
    /** Stores parent group's children. */
    groups?: IGroup[];
    /** Custom className */
    className?: string;
    /** Theme provided by the Higher Order Component */
    theme?: ITheme;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupedList extends IList {
    /**
     * Ensures that the list content is updated. Call this in cases where the list props don't change, but the list still
     * needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change, you can
     * call this to force a re-evaluation. Be aware that this can be an expensive operation and should be done sparingly.
     */
    forceUpdate: () => void;
    /**
     * Toggles the collapsed state of all the groups in the list.
     */
    toggleCollapseAll: (allCollapsed: boolean) => void;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupedListProps extends React_2.ClassAttributes<GroupedListBase> {
    /**
     * Theme that is passed in from Higher Order Component
     */
    theme?: ITheme;
    /**
     * Style function to be passed in to override the themed or default styles
     */
    styles?: IStyleFunctionOrObject<IGroupedListStyleProps, IGroupedListStyles>;
    /**
     * Optional callback to access the IGroupedList interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IGroupedList>;
    /** Optional class name to add to the root element. */
    className?: string;
    /** Boolean value to indicate if the component should render in compact mode. Set to false by default */
    compact?: boolean;
    /** Map of callback functions related to drag and drop functionality. */
    dragDropEvents?: IDragDropEvents;
    /** helper to manage drag/drop across item and groups */
    dragDropHelper?: IDragDropHelper;
    /** Event names and corresponding callbacks that will be registered to groups and rendered elements */
    eventsToRegister?: {
        eventName: string;
        callback: (context: IDragDropContext, event?: any) => void;
    }[];
    /** Optional override properties to render groups. */
    groupProps?: IGroupRenderProps;
    /** Optional grouping instructions. */
    groups?: IGroup[];
    /** List of items to render. */
    items: any[];
    /** Optional properties to pass through to the FocusZone. */
    focusZoneProps?: IFocusZoneProps;
    /** Optional properties to pass through to the list components being rendered. */
    listProps?: IListProps;
    /** Optional properties to pass through to the root list component being rendered. */
    rootListProps?: IListProps;
    /** Rendering callback to render the group items. */
    onRenderCell: (nestingDepth?: number, item?: any, index?: number) => React_2.ReactNode;
    /** Override the default role for GroupedList.  */
    role?: string;
    /** Optional selection model to track selection state.  */
    selection?: ISelection;
    /** Controls how/if the list manages selection. */
    selectionMode?: SelectionMode_2;
    /** Optional Viewport, provided by the parent component. */
    viewport?: IViewport;
    /** Optional callback when the group expand state changes between all collapsed and at least one group is expanded. */
    onGroupExpandStateChanged?: (isSomeGroupExpanded: boolean) => void;
    /**
     * boolean to control if pages containing unchanged items should be cached, this is a perf optimization
     * The same property in List.Props
     */
    usePageCache?: boolean;
    /**
     * Optional callback to determine whether the list should be rendered in full, or virtualized.
     * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
     * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for
     * smaller lists.
     * The default implementation will virtualize when this callback is not provided.
     */
    onShouldVirtualize?: (props: IListProps) => boolean;
    /**
     * Optional function to override default group height calculation used by list virtualization.
     */
    getGroupHeight?: (group: IGroup, groupIndex: number) => number;
}

export declare interface IGroupedListSectionProps extends React_2.ClassAttributes<GroupedListSection> {
    /** GroupedList resolved class names */
    groupedListClassNames?: IProcessedStyleSet<IGroupedListStyles>;
    /**
     * Gets the component ref.
     */
    componentRef?: () => void;
    /** Whether to render in compact mode */
    compact?: boolean;
    /** Map of callback functions related to drag and drop functionality. */
    dragDropEvents?: IDragDropEvents;
    /** helper to manage drag/drop across item rows and groups */
    dragDropHelper?: IDragDropHelper;
    /** Event names and corresponding callbacks that will be registered to the group and the rendered elements */
    eventsToRegister?: {
        eventName: string;
        callback: (context: IDragDropContext, event?: any) => void;
    }[];
    /** Information to pass in to the group footer. */
    footerProps?: IGroupFooterProps;
    /** Grouping item limit. */
    getGroupItemLimit?: (group: IGroup) => number;
    /** Optional grouping instructions. */
    groupIndex?: number;
    /** Optional group nesting level. */
    groupNestingDepth?: number;
    /** Optional grouping instructions. */
    group?: IGroup;
    /** Optional override properties to render groups. */
    groupProps?: IGroupRenderProps;
    /** Information to pass in to the group header. */
    headerProps?: IGroupHeaderProps;
    /** List of items to render. */
    items: any[];
    /** Optional list props to pass to list renderer.  */
    listProps?: IListProps;
    /** Rendering callback to render the group items. */
    onRenderCell: (nestingDepth?: number, item?: any, index?: number) => React_2.ReactNode;
    /** Optional selection model to track selection state.  */
    selection?: ISelection;
    /** Controls how/if the details list manages selection. */
    selectionMode?: SelectionMode_2;
    /** Information to pass in to the group Show All footer. */
    showAllProps?: IGroupShowAllProps;
    /** Optional Viewport, provided by the parent component. */
    viewport?: IViewport;
    /** Override for rendering the group header. */
    onRenderGroupHeader?: IRenderFunction<IGroupHeaderProps>;
    /** Override for rendering the group Show All link. */
    onRenderGroupShowAll?: IRenderFunction<IGroupShowAllProps>;
    /** Override for rendering the group footer. */
    onRenderGroupFooter?: IRenderFunction<IGroupFooterProps>;
    /**
     * Optional callback to determine whether the list should be rendered in full, or virtualized.
     * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
     * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for
     * smaller lists.
     * The default implementation will virtualize when this callback is not provided.
     */
    onShouldVirtualize?: (props: IListProps) => boolean;
    /** Stores parent group's children. */
    groups?: IGroup[];
}

export declare interface IGroupedListSectionState {
    isDropping?: boolean;
    isSelected?: boolean;
}

export declare interface IGroupedListState {
    selectionMode?: IGroupedListProps['selectionMode'];
    compact?: IGroupedListProps['compact'];
    groups?: IGroup[];
    items?: IGroupedListProps['items'];
    listProps?: IGroupedListProps['listProps'];
    version: {};
}

/**
 * {@docCategory GroupedList}
 */
export declare type IGroupedListStyleProps = Required<Pick<IGroupedListProps, 'theme'>> & Pick<IGroupedListProps, 'className'> & {
    /** whether or not the group is collapsed */
    isCollapsed?: boolean;
    /** Whether the group is in compact mode or not */
    compact?: boolean;
};

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupedListStyles {
    root: IStyle;
    group: IStyle;
    groupIsDropping: IStyle;
}

export declare interface IGroupedListV2Props extends IGroupedListProps {
    /** Ref to the underlying List control */
    listRef?: React_2.Ref<List>;
    /**
     * For perf reasons, GroupedList avoids re-rendering unless certain props have changed.
     * Use this prop if you need to force it to re-render in other cases. You can pass any type of
     * value as long as it only changes (`===` comparison) when a re-render should happen.
     */
    version?: {};
    /**
     * For perf reasons, GroupedList avoids re-rendering unless certain props have changed.
     * Use this prop if you need to force it to re-render when a group has expanded or collapsed.
     * You can pass any type of value as long as it only changes (`===` comparison)
     * when a re-render should happen.
     */
    groupExpandedVersion?: {};
    /** Rendering callback to render the group items. */
    onRenderCell: (nestingDepth?: number, item?: any, index?: number, group?: IGroup) => React_2.ReactNode;
}

export declare interface IGroupedListV2State {
    selectionMode?: IGroupedListV2Props['selectionMode'];
    compact?: IGroupedListV2Props['compact'];
    groups?: IGroup[];
    items?: IGroupedListV2Props['items'];
    listProps?: IGroupedListV2Props['listProps'];
    version: {};
    groupExpandedVersion: {};
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupFooterProps extends IGroupDividerProps {
    /**
     * Style function to be passed in to override the themed or default styles
     */
    styles?: IStyleFunctionOrObject<IGroupFooterStyleProps, IGroupFooterStyles>;
}

/**
 * {@docCategory GroupedList}
 */
export declare type IGroupFooterStyleProps = Required<Pick<IGroupFooterProps, 'theme'>> & Pick<IGroupFooterProps, 'selected' | 'className'> & {
    /** Whether the footer is collapsed */
    isCollapsed?: boolean;
};

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupFooterStyles {
    root: IStyle;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupHeaderCheckboxProps {
    checked: boolean;
    theme?: ITheme;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupHeaderProps extends IGroupDividerProps {
    /** Style function to be passed in to override the themed or default styles */
    styles?: IStyleFunctionOrObject<IGroupHeaderStyleProps, IGroupHeaderStyles>;
    /** GroupedList id for aria-controls */
    groupedListId?: string;
    /** Native props for the GroupHeader expand and collapse button */
    expandButtonProps?: React_2.HTMLAttributes<HTMLButtonElement>;
    /** Defines the name of a custom icon to be used for group headers. If not set, the default icon will be used */
    expandButtonIcon?: string;
    /** Native props for the GroupHeader select all button */
    selectAllButtonProps?: React_2.HTMLAttributes<HTMLButtonElement>;
    /**
     * If provided, can be used to render a custom checkbox
     */
    onRenderGroupHeaderCheckbox?: IRenderFunction<IGroupHeaderCheckboxProps>;
    /**
     * Whether to use fast icon and check components. The icons can't be targeted by customization
     * but are still customizable via class names.
     * @defaultvalue true
     */
    useFastIcons?: boolean;
}

/**
 * {@docCategory GroupedList}
 */
export declare type IGroupHeaderStyleProps = Required<Pick<IGroupHeaderProps, 'theme'>> & Pick<IGroupHeaderProps, 'selected' | 'className'> & {
    /** Is Header collapsed */
    isCollapsed?: boolean;
    /** Whether the group header is in compact mode or not */
    compact?: boolean;
};

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupHeaderStyles {
    root: IStyle;
    groupHeaderContainer: IStyle;
    headerCount: IStyle;
    check: IStyle;
    dropIcon: IStyle;
    expand: IStyle;
    expandIsCollapsed: IStyle;
    title: IStyle;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupRenderProps {
    /** Boolean indicating if all groups are in collapsed state. */
    isAllGroupsCollapsed?: boolean;
    /** Grouping item limit. */
    getGroupItemLimit?: (group: IGroup) => number;
    /** Callback for when all groups are expanded or collapsed. */
    onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
    /** Information to pass in to the group header. */
    headerProps?: IGroupHeaderProps;
    /** Information to pass in to the group Show all footer. */
    showAllProps?: IGroupShowAllProps;
    /** Information to pass in to the group footer. */
    footerProps?: IGroupFooterProps;
    /**
     * Override which allows the caller to provide a custom header.
     */
    onRenderHeader?: IRenderFunction<IGroupHeaderProps>;
    /**
     * Override which allows the caller to provide a custom Show All link.
     */
    onRenderShowAll?: IRenderFunction<IGroupShowAllProps>;
    /**
     * Override which allows the caller to provide a custom footer.
     */
    onRenderFooter?: IRenderFunction<IGroupFooterProps>;
    /**
     * Flag to indicate whether to ignore the collapsing icon on header.
     * @defaultvalue CollapseAllVisibility.visible
     */
    collapseAllVisibility?: CollapseAllVisibility;
    /**
     * Boolean indicating if empty groups are shown
     * @defaultvalue false
     */
    showEmptyGroups?: boolean;
    /**
     * Override which allows the caller to provide a custom aria role
     */
    role?: string;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupShowAllProps extends IGroupDividerProps {
    /**
     * Style function to be passed in to override the themed or default styles
     */
    styles?: IStyleFunctionOrObject<IGroupShowAllStyleProps, IGroupShowAllStyles>;
    /**
     * The Show All link text.
     * @defaultvalue 'Show All'
     */
    showAllLinkText?: string;
}

/**
 * {@docCategory GroupedList}
 */
export declare type IGroupShowAllStyleProps = Required<Pick<IGroupShowAllProps, 'theme'>>;

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupShowAllStyles {
    root: IStyle;
}

/**
 * {@docCategory GroupedList}
 */
export declare interface IGroupSpacerProps {
    /**
     * @deprecated Unused. Will be removed in \>= 7.0
     */
    theme?: ITheme;
    /**
     * @deprecated Unused. Will be removed in \>= 7.0
     */
    styles?: IStyleFunctionOrObject<IGroupSpacerStyleProps, IGroupSpacerStyles>;
    /** Count of spacer(s) */
    count: number;
    /** How much to indent */
    indentWidth?: number;
    /** Override the default role (presentation) */
    role?: string;
}

/**
 * {@docCategory GroupedList}
 * @deprecated Unused. Use `IGroupSpacerProps.indentWidth`. Will be removed in \>= 7.0.
 */
export declare type IGroupSpacerStyleProps = Required<Pick<IGroupSpacerProps, 'theme'>> & {
    width?: number;
};

/**
 * {@docCategory GroupedList}
 * @deprecated Unused. Will be removed in \>= 7.0.
 */
export declare interface IGroupSpacerStyles {
    root: IStyle;
}

/**
 * {@docCategory HoverCard}
 */
export declare interface IHoverCard {
    /**
     * Public `dismiss` method to be used through `componentRef` of the HoverCard.
     * Boolean argument controls if the dismiss happens with a timeout delay.
     */
    dismiss: (withTimeOut?: boolean) => void;
}

/**
 * HoverCard component props.
 * {@docCategory HoverCard}
 */
export declare interface IHoverCardProps extends React_2.HTMLAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IHoverCardHost interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IHoverCard>;
    /**
     * Additional CSS class(es) to apply to the HoverCard root element.
     */
    className?: string;
    /**
     * Length of card dismiss delay. A min number is necessary for pointer to hop between target and card
     * @defaultvalue 100
     */
    cardDismissDelay?: number;
    /**
     * Length of compact card delay
     * @defaultvalue 500
     */
    cardOpenDelay?: number;
    /**
     * Time in ms when expanded card should open after compact card
     * @defaultvalue 1500
     */
    expandedCardOpenDelay?: number;
    /**
     * Additional ExpandingCard props to pass through HoverCard like renderers, target. gapSpace etc.
     * Used along with 'type' prop set to HoverCardType.expanding.
     * Reference detail properties in ICardProps and IExpandingCardProps.
     */
    expandingCardProps?: IExpandingCardProps;
    /**
     * Enables instant open of the full card upon click
     * @defaultvalue false
     */
    instantOpenOnClick?: boolean;
    /**
     * Callback when card becomes visible
     */
    onCardVisible?: () => void;
    /**
     * Callback when card hides
     */
    onCardHide?: () => void;
    /**
     * HotKey used for opening the HoverCard when tabbed to target.
     * @defaultvalue 'KeyCodes.c'
     */
    openHotKey?: KeyCodes;
    /**
     * Additional PlainCard props to pass through HoverCard like renderers, target, gapSpace etc.
     * Used along with 'type' prop set to HoverCardType.plain.
     * See for more details ICardProps and IPlainCardProps interfaces.
     */
    plainCardProps?: IPlainCardProps;
    /**
     * Whether or not to mark the container as described by the hover card.
     * If not specified, the caller should mark as element as described by the hover card id.
     */
    setAriaDescribedBy?: boolean;
    /**
     * Callback when visible card is expanded.
     */
    onCardExpand?: () => void;
    /**
     * Set to true to set focus on the first focusable element in the card. Works in pair with the 'trapFocus' prop.
     * @defaultvalue false
     */
    setInitialFocus?: boolean;
    /**
     * Should block hover card or not
     */
    shouldBlockHoverCard?: () => void;
    /**
     * If true disables Card dismiss upon mouse leave, so that card sticks around.
     * @defaultvalue false
     */
    sticky?: boolean;
    /**
     * Custom styles for this component
     */
    styles?: IStyleFunctionOrObject<IHoverCardStyleProps, IHoverCardStyles>;
    /**
     * Optional target element to tag hover card on. If not provided and using HoverCard as a wrapper, don't set the
     * 'data-is-focusable=true' attribute to the root of the wrapped child.
     * If no target is given, HoverCard will use its root as a target and become the focusable element with a
     * focus listener attached to it.
     */
    target?: HTMLElement | string | null;
    /**
     * This prop is to separate the target to anchor hover card from the target to attach event listener.
     * If set, this prop separates the target to anchor the hover card from the target to attach the event listener.
     * When no `eventListenerTarget` given, HoverCard will use `target` prop or its root to set event listener.
     */
    eventListenerTarget?: HTMLElement | string | null;
    /**
     * Theme provided by higher order component.
     */
    theme?: ITheme;
    /**
     * Set to true if you want to render the content of the HoverCard in a FocusTrapZone for accessibility reasons.
     * Optionally 'setInitialFocus' prop can be set to true to move focus inside the FocusTrapZone.
     */
    trapFocus?: boolean;
    /**
     * Type of the hover card to render.
     * @defaultvalue HoverCardType.expanding
     */
    type?: HoverCardType;
}

export declare interface IHoverCardState {
    isHoverCardVisible?: boolean;
    mode?: ExpandingCardMode;
    openMode?: OpenCardMode;
}

/**
 * {@docCategory HoverCard}
 */
export declare interface IHoverCardStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Optional className(s) for the host div of HoverCard.
     */
    className?: string;
}

/**
 * {@docCategory HoverCard}
 */
export declare interface IHoverCardStyles {
    /**
     * Style for the host element in the default enabled, non-toggled state.
     */
    host?: IStyle;
}

export declare interface IHSL {
    /** Hue, range 0-359. */
    h: number;
    /** Saturation, range 0-100. */
    s: number;
    /** Lightness, range 0-100. */
    l: number;
}

export declare interface IHSV {
    /** Hue, range 0-359. */
    h: number;
    /** Saturation, range 0-100. */
    s: number;
    /** Value, range 0-100. */
    v: number;
}

export declare interface IIconContent {
    children?: string | JSX.Element;
    iconClassName?: string;
    fontFamily?: string;
    mergeImageProps?: boolean;
}

export { IIconOptions }

/**
 * {@docCategory Icon}
 */
export declare interface IIconProps extends IBaseProps, React_2.HTMLAttributes<HTMLElement> {
    /**
     * The name of the icon to use from the icon font.
     * If string is empty, a placeholder icon will be rendered the same width as an icon.
     */
    iconName?: string;
    /**
     * The aria label of the icon for the benefit of screen readers.
     * @deprecated Use the native prop `aria-label`
     */
    ariaLabel?: string;
    /**
     * The type of icon to render (image or icon font).
     * @deprecated Inferred based on the presence of `imageProps`
     */
    iconType?: IconType;
    /**
     * If rendering an image icon, these props will be passed to the Image component.
     */
    imageProps?: IImageProps;
    /**
     * If rendering an image icon, this component will be rendered in the event that loading the image fails.
     */
    imageErrorAs?: React_2.ComponentType<IImageProps>;
    /**
     * Gets the styles for an Icon.
     */
    styles?: IStyleFunctionOrObject<IIconStyleProps, IIconStyles>;
    theme?: ITheme;
}

export { IIconRecord }

export declare interface IIconState {
    imageLoadError: boolean;
}

/**
 * {@docCategory Icon}
 */
export declare interface IIconStyleProps {
    className?: string;
    iconClassName?: string;
    isPlaceholder: boolean;
    isImage: boolean;
    styles?: Partial<IIconStyles>;
    theme?: ITheme;
}

/**
 * {@docCategory Icon}
 */
export declare interface IIconStyles {
    root?: IStyle;
    /**
     * @deprecated Use `root`.
     */
    imageContainer?: IStyle;
}

export { IIconSubset }

export { IIconSubsetRecord }

/**
 * {@docCategory Image}
 */
export declare interface IImage {
}

/**
 * Props for a basic image icon component which doesn't directly provide image load error handling
 * and can't be targeted by customizations.
 * {@docCategory Icon}
 */
export declare interface IImageIconProps extends React_2.HTMLAttributes<HTMLElement> {
    /**
     * Props passed to the Image component.
     */
    imageProps: IImageProps;
    /**
     * Custom class to style the icon.
     */
    className?: string;
}

/**
 * {@docCategory Image}
 */
export declare interface IImageProps extends React_2.ImgHTMLAttributes<HTMLImageElement>, React_2.RefAttributes<HTMLImageElement> {
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IImageStyleProps, IImageStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the Component
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * If true, fades the image in when loaded.
     * @defaultvalue true
     */
    shouldFadeIn?: boolean;
    /**
     * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
     * it is successfully loaded. This disables shouldFadeIn.
     * @defaultvalue false;
     */
    shouldStartVisible?: boolean;
    /**
     * Used to determine how the image is scaled and cropped to fit the frame.
     *
     * @defaultvalue If both dimensions are provided, then the image is fit using `ImageFit.scale`.
     * Otherwise, the image won't be scaled or cropped.
     */
    imageFit?: ImageFit;
    /**
     * @deprecated Not used. Use `onLoadingStateChange` and re-render the Image with a different src.
     */
    errorSrc?: string;
    /**
     * If true, the image frame will expand to fill its parent container.
     */
    maximizeFrame?: boolean;
    /**
     * Optional callback method for when the image load state has changed.
     * The 'loadState' parameter indicates the current state of the Image.
     */
    onLoadingStateChange?: (loadState: ImageLoadState) => void;
    /**
     * Specifies the cover style to be used for this image. If not
     * specified, this will be dynamically calculated based on the
     * aspect ratio for the image.
     */
    coverStyle?: ImageCoverStyle;
    /**
     * Allows for browser-level image lazy-loading.
     */
    loading?: 'lazy' | 'eager';
}

export declare interface IImageState {
    loadState?: ImageLoadState;
}

/**
 * {@docCategory Image}
 */
export declare interface IImageStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * If true, the image frame will expand to fill its parent container.
     */
    maximizeFrame?: boolean;
    /**
     * If true, the image is loaded
     */
    isLoaded?: boolean;
    /**
     * If true, fades the image in when loaded.
     * @defaultvalue true
     */
    shouldFadeIn?: boolean;
    /**
     * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
     * it is successfully loaded. This disables shouldFadeIn.
     * @defaultvalue false;
     */
    shouldStartVisible?: boolean;
    /**
     * If true the image is coverStyle landscape instead of portrait
     */
    isLandscape?: boolean;
    /**
     * ImageFit booleans for center, cover, contain, centerContain, centerCover, none
     */
    isCenter?: boolean;
    isContain?: boolean;
    isCover?: boolean;
    isCenterContain?: boolean;
    isCenterCover?: boolean;
    isNone?: boolean;
    /**
     * if true image load is in error
     */
    isError?: boolean;
    /**
     * if true, imageFit is undefined
     */
    isNotImageFit?: boolean;
    /**
     * Image width value
     */
    width?: number | string;
    /**
     * Image height value
     */
    height?: number | string;
}

/**
 * {@docCategory Image}
 */
export declare interface IImageStyles {
    /**
     * Style set for the root div element.
     */
    root: IStyle;
    /**
     * Style set for the img element.
     */
    image: IStyle;
}

/**
 * Pickers' input props interface
 * {@docCategory Pickers}
 */
export declare interface IInputProps extends React_2.InputHTMLAttributes<HTMLInputElement> {
    /**
     * Screen reader label to apply to an input element.
     */
    'aria-label'?: string;
    /**
     * The default value to be visible when the autofill first created.
     * This is different than placeholder text because the placeholder text will disappear and re-appear. This
     * text persists until deleted or changed.
     */
    defaultVisibleValue?: string;
}

export declare interface IKeytipConfig {
    keytips: IKeytipConfigItem[];
}

export declare interface IKeytipConfigItem {
    /**
     * Key Sequence for this keytip only
     * If sequence is not defined it will be derived from the content string
     */
    sequence?: string;
    /**
     * Content for the keytip
     */
    content: string;
    /**
     * Identifier for the keytip, to be used to access in the configMap
     */
    id: string;
    /**
     * Optional props in IKeytipProps
     */
    optionalProps?: Partial<IKeytipProps>;
    /**
     * Children keytips of this keytip
     */
    children?: IKeytipConfigItem[];
}

export declare interface IKeytipConfigMap {
    [id: string]: IKeytipProps;
}

export declare interface IKeytipDataProps {
    /**
     * IKeytipProps to create from this KeytipData
     * If no keytipProps are defined, a keytip won't be registered
     */
    keytipProps?: IKeytipProps;
    /**
     * String to add to the aria-describedby generated by this KeytipData
     * It will prepend this string to the generated aria-describedby property
     */
    ariaDescribedBy?: string;
    /**
     * T/F if this keytip should be disabled upon creation
     */
    disabled?: boolean;
}

/**
 * {@docCategory Keytips}
 */
export declare interface IKeytipLayer {
}

/**
 * {@docCategory Keytips}
 */
export declare interface IKeytipLayerProps extends React_2.ClassAttributes<IKeytipLayer> {
    /**
     * Optional callback to access the KeytipLayer component. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IKeytipLayer>;
    /**
     * String to put inside the layer to be used for the aria-describedby for the component with the keytip
     * Should be one of the starting sequences
     */
    content: string;
    /**
     * List of key sequences that will start keytips mode
     */
    keytipStartSequences?: IKeytipTransitionKey[];
    /**
     * List of key sequences that execute the return functionality in keytips
     * (going back to the previous level of keytips)
     */
    keytipReturnSequences?: IKeytipTransitionKey[];
    /**
     * List of key sequences that will exit keytips mode
     */
    keytipExitSequences?: IKeytipTransitionKey[];
    /**
     * Callback function triggered when keytip mode is exited.
     * ev is the Mouse or Keyboard Event that triggered the exit, if any.
     */
    onExitKeytipMode?: (ev?: React_2.KeyboardEvent<HTMLElement> | React_2.MouseEvent<HTMLElement>) => void;
    /**
     * Callback function triggered when keytip mode is entered
     * @param transitionKey - The key sequence that triggered keytip mode, if any.
     */
    onEnterKeytipMode?: (transitionKey?: IKeytipTransitionKey) => void;
    /**
     * (Optional) Call to provide customized styling.
     */
    styles?: IStyleFunctionOrObject<IKeytipLayerStyleProps, IKeytipLayerStyles>;
}

export declare interface IKeytipLayerState {
    inKeytipMode: boolean;
    keytips: IKeytipProps[];
    visibleKeytips: IKeytipProps[];
}

/**
 * {@docCategory Keytips}
 */
export declare interface IKeytipLayerStyleProps {
}

/**
 * {@docCategory Keytips}
 */
export declare interface IKeytipLayerStyles {
    innerContent: IStyle;
}

/**
 * {@docCategory Keytips}
 */
export declare interface IKeytipProps {
    /**
     * Content to put inside the keytip
     */
    content: string;
    /**
     * Theme for the component
     */
    theme?: ITheme;
    /**
     * T/F if the corresponding control for this keytip is disabled
     */
    disabled?: boolean;
    /**
     * T/F if the keytip is visible
     */
    visible?: boolean;
    /**
     * Function to call when this keytip is activated.
     * 'executeTarget' is the DOM element marked with 'data-ktp-execute-target'.
     * 'target' is the DOM element marked with 'data-ktp-target'.
     */
    onExecute?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
    /**
     * Function to call when the keytip is the currentKeytip and a return sequence is pressed.
     * 'executeTarget' is the DOM element marked with 'data-ktp-execute-target'.
     * 'target' is the DOM element marked with 'data-ktp-target'.
     */
    onReturn?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
    /**
     * Array of KeySequences which is the full key sequence to trigger this keytip
     * Should not include initial 'start' key sequence
     */
    keySequences: string[];
    /**
     * Full KeySequence of the overflow set button, will be set automatically if this keytip is inside an overflow
     */
    overflowSetSequence?: string[];
    /**
     * ICalloutProps to pass to the callout element
     */
    calloutProps?: ICalloutProps;
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IKeytipStyleProps, IKeytipStyles>;
    /**
     * Offset x and y for the keytip, added from the top-left corner
     * By default the keytip will be anchored to the bottom-center of the element
     */
    offset?: Point;
    /**
     * Whether or not this keytip will have children keytips that are dynamically created (DOM is generated on
     * keytip activation). Common cases are a Pivot or Modal.
     */
    hasDynamicChildren?: boolean;
    /**
     * Whether or not this keytip belongs to a component that has a menu
     * Keytip mode will stay on when a menu is opened, even if the items in that menu have no keytips
     */
    hasMenu?: boolean;
    /**
     * Whether or not this keytip belongs to a component that is in an overflow menu
     * and also has a menu
     */
    hasOverflowSubMenu?: boolean;
}

/**
 * Props to style Keytip component
 * {@docCategory Keytips}
 */
export declare interface IKeytipStyleProps {
    /**
     * The theme for the keytip.
     */
    theme: ITheme;
    /**
     * Whether the keytip is disabled or not.
     */
    disabled?: boolean;
    /**
     * T/F if the keytip is visible
     */
    visible?: boolean;
}

/**
 * {@docCategory Keytips}
 */
export declare interface IKeytipStyles {
    /**
     * Style for the div container surrounding the keytip content.
     */
    container: IStyle;
    /**
     * Style for the keytip content element.
     */
    root: IStyle;
}

export declare interface IKeytipTransitionKey {
    key: string;
    modifierKeys?: KeytipTransitionModifier[];
}

declare interface IKeytipTreeNode {
    /**
     * ID of the <Keytip> DOM element. Needed to locate the correct keytip in the KeytipLayer's 'keytip' state array
     */
    id: string;
    /**
     * KeySequence that invokes this KeytipTreeNode's onExecute function
     */
    keySequences: string[];
    /**
     * Overflow set sequence for this keytip
     */
    overflowSetSequence?: string[];
    /**
     * Control's execute function for when keytip is invoked, passed from the component to the Manager in the IKeytipProps
     */
    onExecute?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
    /**
     * Function to execute when we return to this keytip
     */
    onReturn?: (executeTarget: HTMLElement | null, target: HTMLElement | null) => void;
    /**
     * List of keytip IDs that should become visible when this keytip is pressed, can be empty
     */
    children: string[];
    /**
     * Parent keytip ID
     */
    parent: string;
    /**
     * Whether or not this keytip will have children keytips that are dynamically created (DOM is generated on
     * keytip activation). Common cases are keytips in a menu or modal.
     */
    hasDynamicChildren?: boolean;
    /**
     * Whether or not this keytip belongs to a component that has a menu
     * Keytip mode will stay on when a menu is opened, even if the items in that menu have no keytips
     */
    hasMenu?: boolean;
    /**
     * T/F if this keytip's component is currently disabled
     */
    disabled?: boolean;
    /**
     * T/F if this keytip is a persisted keytip
     */
    persisted?: boolean;
    /**
     * Whether or not this keytip belongs to a component that is in an overflow menu
     * and also has a menu
     */
    hasOverflowSubMenu?: boolean;
}

/**
 * {@docCategory Label}
 */
export declare interface ILabel {
}

/**
 * {@docCategory Label}
 */
export declare interface ILabelProps extends React_2.LabelHTMLAttributes<HTMLLabelElement> {
    /**
     * Render the root element as another type.
     */
    as?: IComponentAs<React_2.AllHTMLAttributes<HTMLElement>>;
    /**
     * Optional callback to access the ILabel interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ILabel>;
    /**
     * Whether the associated form field is required or not
     * @defaultvalue false
     */
    required?: boolean;
    /**
     * Renders the label as disabled.
     */
    disabled?: boolean;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Styles for the label.
     */
    styles?: IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>;
}

/**
 * {@docCategory Label}
 */
export declare interface ILabelStyleProps {
    /**
     *
     */
    theme: ITheme;
    className?: string;
    disabled?: boolean;
    required?: boolean;
}

/**
 * {@docCategory Label}
 */
export declare interface ILabelStyles {
    /**
     * Styles for the root element.
     */
    root: IStyle;
}

/**
 * {@docCategory Layer}
 */
export declare interface ILayer {
}

/**
 * Represents a mounted layer host, and provides access to its `hostId` and root element.
 */
export declare interface ILayerHost {
    /**
     * The hostId for this host, to be propagatd to layers using Customizer.
     */
    hostId: string;
    /**
     * An element ref to the layer host's content root.
     * This is the element to which layers will be added.
     */
    rootRef: React_2.MutableRefObject<HTMLDivElement | null>;
    /**
     * Notifies the layer host that layers may have been added or removed within its root element.
     */
    notifyLayersChanged(): void;
}

export declare interface ILayerHostProps extends React_2.HTMLAttributes<HTMLElement> {
    /**
     * Optional callback to access the ILayerHost interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ILayerHost>;
    /**
     * Defines the id for the layer host that Layers can target (using the hostId property.)
     */
    id?: string;
}

/**
 * {@docCategory Layer}
 */
export declare interface ILayerProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the ILayer interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ILayer>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<ILayerStyleProps, ILayerStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the Layer
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * Callback for when the layer is mounted.
     * @deprecated Use `onLayerDidMount`.
     */
    onLayerMounted?: () => void;
    /**
     * Callback for when the layer is mounted.
     */
    onLayerDidMount?: () => void;
    /**
     * Callback for when the layer is unmounted.
     */
    onLayerWillUnmount?: () => void;
    /**
     * The optional id property provided on a LayerHost that this Layer should render within. The LayerHost does
     * not need to be immediately available but once has been rendered, and if missing, we'll avoid trying
     * to render the Layer content until the host is available. If an id is not provided, we will render the Layer
     * content in a fixed position element rendered at the end of the document.
     */
    hostId?: string;
    /**
     * When enabled, Layer allows events to bubble up from Layer content.
     * Traditionally Layer has not had this behavior. This prop preserves backwards compatibility by
     * default while allowing users to opt in to the new event bubbling functionality.
     */
    eventBubblingEnabled?: boolean;
    /**
     * Whether the layer should be added as the first child of the host.
     * If true, the layer will be inserted as the first child of the host
     * By default, the layer will be appended at the end to the host
     */
    insertFirst?: boolean;
    /**
     * Props bag to forward to the Fabric component to allow customization of its behavior.
     */
    fabricProps?: IFabricProps;
}

/**
 * {@docCategory Layer}
 */
export declare interface ILayerStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * Check if Host
     */
    isNotHost?: boolean;
}

/**
 * {@docCategory Layer}
 */
export declare interface ILayerStyles {
    /**
     * Style for the root element when fixed.
     */
    root?: IStyle;
    /**
     * Style for the Fabric component.
     */
    content?: IStyle;
}

/**
 * Line element interface
 * {@docCategory Shimmer}
 */
export declare interface ILine extends IShimmerElement {
    /**
     * Sets the height of the shimmer line in pixels.
     * @defaultvalue 16px
     */
    height?: number;
    /**
     * Line width value.
     * @defaultvalue 100%
     */
    width?: number | string;
}

/**
 * {@docCategory Link}
 */
export declare interface ILink {
    /** Sets focus to the link. */
    focus(): void;
}

/**
 * @deprecated No longer used.
 */
export declare interface ILinkHTMLAttributes<T> extends React_2.HTMLAttributes<T> {
    type?: string;
    download?: any;
    href?: string;
    hrefLang?: string;
    media?: string;
    rel?: string;
    target?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    form?: string;
    formAction?: string;
    formEncType?: string;
    formMethod?: string;
    formNoValidate?: boolean;
    formTarget?: string;
    name?: string;
    value?: string | string[] | number;
    /** Any other props for HTMLElements or a React component passed to `as` */
    [key: string]: any;
}

/**
 * Link component props. All built-in props for `<a>` and `<button>` are supported (including
 * various event handlers) even if not listed below.
 * {@docCategory Link}
 */
export declare interface ILinkProps extends React_2.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement>, Omit<React_2.ButtonHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement>, 'type'>, React_2.RefAttributes<HTMLElement> {
    /**
     * Optional callback to access the ILink interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ILink>;
    /**
     * URL the link points to. If not provided, the link renders as a button (unless that behavior is
     * overridden using `as`).
     */
    href?: string;
    /**
     * Where to open the linked URL. Common values are `_blank` (a new tab or window),
     * `_self` (the current window/context), `_parent`, and `_top`.
     */
    target?: string;
    /**
     * Relationship to the linked URL (can be a space-separated list).
     * Most common values are `noreferrer` and/or `noopener`.
     */
    rel?: string;
    /**
     * Click handler for the link.
     */
    onClick?: (event: React_2.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLElement>) => void;
    /**
     * Whether the link is disabled
     */
    disabled?: boolean;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ILinkStyleProps, ILinkStyles>;
    /**
     * Theme (provided through customization.)
     */
    theme?: ITheme;
    /**
     * A component type or primitive that is rendered as the type of the root element.
     */
    as?: React_2.ElementType;
    /**
     * Built-in HTML attribute with different behavior depending on how the link is rendered.
     * If rendered as `<a>`, hints at the MIME type.
     * If rendered as `<button>`, override the type of button (`button` is the default).
     */
    type?: string;
    /**
     * Whether the link is styled with an underline or not.
     * Should be used when the link is placed alongside other text content.
     */
    underline?: boolean;
    /** Any other props for elements or a React component passed to `as` */
    [key: string]: any;
}

/**
 * {@docCategory Link}
 */
export declare interface ILinkStyleProps {
    className?: string;
    isButton?: boolean;
    isDisabled?: boolean;
    isUnderlined?: boolean;
    theme: ITheme;
}

/**
 * {@docCategory Link}
 */
export declare interface ILinkStyles {
    root: IStyle;
}

/**
 * {@docCategory List}
 */
export declare interface IList {
    /**
     * Force the component to update.
     */
    forceUpdate: () => void;
    /**
     * Get the current height the list and it's pages.
     */
    getTotalListHeight?: () => number;
    /**
     * Scroll to the given index. By default will bring the page the specified item is on into the view. If a callback
     * to measure the height of an individual item is specified, will only scroll to bring the specific item into view.
     *
     * Note: with items of variable height and no passed in `getPageHeight` method, the list might jump after scrolling
     * when windows before/ahead are being rendered, and the estimated height is replaced using actual elements.
     *
     * @param index - Index of item to scroll to
     * @param measureItem - Optional callback to measure the height of an individual item
     * @param scrollToMode - Optional defines the behavior of the scrolling alignment. Defaults to auto.
     *  Note: The scrollToMode requires the measureItem callback is provided to function.
     */
    scrollToIndex: (index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode) => void;
    /**
     * Get the start index of the page that is currently in view
     */
    getStartItemIndexInView: () => number;
}

/**
 * Props passed to the render override for the list root.
 * {@docCategory List}
 */
export declare interface IListOnRenderRootProps<T> {
    /**
     * The ref to be applied to the list root.
     * The `List` uses this element to track scroll position and sizing.
     */
    rootRef: React_2.Ref<HTMLDivElement>;
    /**
     * Props to apply to the list root element.
     */
    divProps: React_2.HTMLAttributes<HTMLDivElement>;
    /**
     * The active pages to be rendered into the list.
     * These will have been rendered using `onRenderPage`.
     */
    pages: IPage<T>[];
    /**
     * The content to be rendered as the list surface element.
     * This will have been rendered using `onRenderSurface`.
     */
    surfaceElement: JSX.Element | null;
}

/**
 * Props passed to the render override for the list surface.
 * {@docCategory List}
 */
export declare interface IListOnRenderSurfaceProps<T> {
    /**
     * A ref to be applied to the surface element.
     * The `List` uses this element to track content size and focus.
     */
    surfaceRef: React_2.Ref<HTMLDivElement>;
    /**
     * Props to apply to the list surface element.
     */
    divProps: React_2.HTMLAttributes<HTMLDivElement>;
    /**
     * The active pages to be rendered into the list.
     * These will have been rendered using `onRenderPage`.
     */
    pages: IPage<T>[];
    /**
     * The content to be rendered representing all active pages.
     */
    pageElements: JSX.Element[];
}

/**
 * {@docCategory List}
 */
export declare interface IListProps<T = any> extends React_2.HTMLAttributes<List<T> | HTMLDivElement> {
    /**
     * Optional callback to access the IList interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IList>;
    /** Optional classname to append to root list. */
    className?: string;
    /** Items to render. */
    items?: T[];
    /**
     * Method to call when trying to render an item.
     * @param item - The data associated with the cell that is being rendered.
     * @param index - The index of the cell being rendered.
     * @param isScrolling - True if the list is being scrolled. May be useful for rendering a placeholder if your cells
     * are complex.
     */
    onRenderCell?: (item?: T, index?: number, isScrolling?: boolean) => React_2.ReactNode;
    /**
     * Method to call when trying to render an item conditionally.
     *
     * When this method returns `null` the cell will be skipped in the render.
     *
     * This prop is mutually exclusive with `onRenderCell` and when `onRenderCellConditional` is set,
     * `onRenderCell` will not be called.
     *
     * @param item - The data associated with the cell that is being rendered.
     * @param index - The index of the cell being rendered.
     * @param isScrolling - True if the list is being scrolled. May be useful for rendering a placeholder if your cells
     * are complex.
     */
    onRenderCellConditional?: (item?: T, index?: number, isScrolling?: boolean) => React_2.ReactNode | null;
    /**
     * Optional callback invoked when List rendering completed.
     * This can be on initial mount or on re-render due to scrolling.
     * This method will be called as a result of changes in List pages (added or removed),
     * and after ALL the changes complete.
     * To track individual page Add / Remove use onPageAdded / onPageRemoved instead.
     * @param pages - The current array of pages in the List.
     */
    onPagesUpdated?: (pages: IPage<T>[]) => void;
    /** Optional callback for monitoring when a page is added. */
    onPageAdded?: (page: IPage<T>) => void;
    /** Optional callback for monitoring when a page is removed. */
    onPageRemoved?: (page: IPage<T>) => void;
    /** Optional callback to get the item key, to be used on render. */
    getKey?: (item: T, index?: number) => string;
    /**
     * Called by the list to get the specification for a page.
     * Use this method to provide an allocation of items per page,
     * as well as an estimated rendered height for the page.
     * The list will use this to optimize virtualization.
     */
    getPageSpecification?: (itemIndex?: number, visibleRect?: IRectangle) => IPageSpecification;
    /**
     * Method called by the list to get how many items to render per page from specified index.
     * In general, use `getPageSpecification` instead.
     */
    getItemCountForPage?: (itemIndex?: number, visibleRect?: IRectangle) => number;
    /**
     * Method called by the list to get the pixel height for a given page. By default, we measure the first
     * page's height and default all other pages to that height when calculating the surface space. It is
     * ideal to be able to adequately predict page heights in order to keep the surface space from jumping
     * in pixels, which has been seen to cause browser performance issues.
     * In general, use `getPageSpecification` instead.
     */
    getPageHeight?: (itemIndex?: number, visibleRect?: IRectangle, itemCount?: number) => number;
    /**
     * Method called by the list to derive the page style object. For spacer pages, the list will derive
     * the height and passed in heights will be ignored.
     */
    getPageStyle?: (page: IPage<T>) => any;
    /**
     * In addition to the visible window, how many windowHeights should we render ahead.
     * @defaultvalue 2
     */
    renderedWindowsAhead?: number;
    /**
     * In addition to the visible window, how many windowHeights should we render behind.
     * @defaultvalue 2
     */
    renderedWindowsBehind?: number;
    /**
     * Index in `items` array to start rendering from.
     * @default 0
     */
    startIndex?: number;
    /**
     * Number of items to render.
     * @default items.length
     */
    renderCount?: number;
    /**
     * Boolean value to enable render page caching. This is an experimental performance optimization
     * that is off by default.
     * @defaultvalue false
     */
    usePageCache?: boolean;
    /**
     * Optional callback to determine whether the list should be rendered in full, or virtualized.
     * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
     * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for
     * smaller lists.
     * The default implementation will virtualize when this callback is not provided.
     */
    onShouldVirtualize?: (props: IListProps<T>) => boolean;
    /**
     * The role to assign to the list root element.
     * Use this to override the default assignment of 'list' to the root and 'listitem' to the cells.
     */
    role?: string;
    /**
     * Called when the List will render a page.
     * Override this to control how cells are rendered within a page.
     */
    onRenderPage?: IRenderFunction<IPageProps<T>>;
    /**
     * Render override for the element at the root of the `List`.
     * Use this to apply some final attributes or structure to the content
     * each time the list is updated with new active pages or items.
     */
    onRenderRoot?: IRenderFunction<IListOnRenderRootProps<T>>;
    /**
     * Render override for the element representing the surface of the `List`.
     * Use this to alter the structure of the rendered content if necessary on each update.
     */
    onRenderSurface?: IRenderFunction<IListOnRenderSurfaceProps<T>>;
    /**
     * For perf reasons, List avoids re-rendering unless certain props have changed.
     * Use this prop if you need to force it to re-render in other cases. You can pass any type of
     * value as long as it only changes (`===` comparison) when a re-render should happen.
     */
    version?: any;
    /**
     * Whether to disable scroll state updates. This causes the isScrolling arg in onRenderCell to always be undefined.
     * This is a performance optimization to let List skip a render cycle by not updating its scrolling state.
     */
    ignoreScrollingState?: boolean;
    /**
     * Whether to render the list earlier than the default.
     * Use this in scenarios where the list is contained in a FocusZone or FocusTrapZone
     * as in a Dialog.
     */
    renderEarly?: boolean;
}

export declare interface IListState<T = any> {
    pages?: IPage<T>[];
    /** The last versionstamp for  */
    measureVersion?: number;
    isScrolling?: boolean;
    getDerivedStateFromProps(nextProps: IListProps<T>, previousState: IListState<T>): IListState<T>;
    pagesVersion?: {};
    hasMounted: boolean;
}

declare const Image_2: React_2.FunctionComponent<IImageProps>;
export { Image_2 as Image }

export declare const ImageBase: React_2.FunctionComponent<IImageProps>;

/**
 * The cover style to be used on the image
 * {@docCategory Image}
 */
export declare enum ImageCoverStyle {
    /**
     * The image will be shown at 100% height of container and the width will be scaled accordingly
     */
    landscape = 0,
    /**
     * The image will be shown at 100% width of container and the height will be scaled accordingly
     */
    portrait = 1
}

/**
 * The possible methods that can be used to fit the image.
 * {@docCategory Image}
 */
export declare enum ImageFit {
    /**
     * The image is not scaled. The image is centered and cropped within the content box.
     */
    center = 0,
    /**
     * The image is scaled to maintain its aspect ratio while being fully contained within the frame. The image will
     * be centered horizontally and vertically within the frame. The space in the top and bottom or in the sides of
     * the frame will be empty depending on the difference in aspect ratio between the image and the frame.
     */
    contain = 1,
    /**
     * The image is scaled to maintain its aspect ratio while filling the frame. Portions of the image will be cropped
     * from the top and bottom, or the sides, depending on the difference in aspect ratio between the image and the frame.
     */
    cover = 2,
    /**
     * Neither the image nor the frame are scaled. If their sizes do not match, the image will either be cropped or the
     * frame will have empty space.
     */
    none = 3,
    /**
     * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
     * behave as ImageFit.center if the image's natural height or width is less than the Image frame's height or width,
     * but if both natural height and width are larger than the frame it will behave as ImageFit.cover.
     */
    centerCover = 4,
    /**
     * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
     * behave as ImageFit.center if the image's natural height and width is less than the Image frame's height and width,
     * but if either natural height or width are larger than the frame it will behave as ImageFit.contain.
     */
    centerContain = 5
}

/**
 * Fast icon component which only supports images (not font glyphs) and can't be targeted by customizations.
 * To style the icon, use `className` or reference `ms-Icon` in CSS.
 * {@docCategory Icon}
 */
export declare const ImageIcon: React_2.FunctionComponent<IImageIconProps>;

/**
 * {@docCategory Image}
 */
export declare enum ImageLoadState {
    /**
     * The image has not yet been loaded, and there is no error yet.
     */
    notLoaded = 0,
    /**
     * The image has been loaded successfully.
     */
    loaded = 1,
    /**
     * An error has been encountered while loading the image.
     */
    error = 2,
    /**
     * @deprecated Not used. Use `onLoadingStateChange` and re-render the Image with a different src.
     */
    errorLoaded = 3
}

export { imageProperties }

/**
 * {@docCategory MarqueeSelection}
 */
export declare interface IMarqueeSelection {
}

/**
 * {@docCategory MarqueeSelection}
 */
export declare interface IMarqueeSelectionProps extends React_2.HTMLAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IMarqueeSelection interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IMarqueeSelection>;
    /**
     * The selection object to interact with when updating selection changes.
     */
    selection: ISelection;
    /**
     * Optional props to mix into the root DIV element.
     */
    rootProps?: React_2.HTMLAttributes<HTMLDivElement>;
    /**
     * Optional callback that is called, when the mouse down event occurs, in order to determine
     * if we should start a marquee selection. If true is returned, we will cancel the mousedown
     * event to prevent upstream mousedown handlers from executing.
     */
    onShouldStartSelection?: (ev: MouseEvent) => boolean;
    /**
     * Optional flag to control the enabled state of marquee selection. This allows you to render
     * it and have events all ready to go, but conditionally disable it. That way transitioning
     * between enabled/disabled generate no difference in the DOM.
     * @defaultvalue true
     */
    isEnabled?: boolean;
    /**
     * Optional flag to restrict the drag rect to the root element, instead of allowing the drag
     * rect to start outside of the root element boundaries.
     * @defaultvalue false
     */
    isDraggingConstrainedToRoot?: boolean;
    /**
     * Additional CSS class(es) to apply to the MarqueeSelection.
     */
    className?: string;
    /**
     * Theme (provided through customization.)
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunction<IMarqueeSelectionStyleProps, IMarqueeSelectionStyles>;
}

/**
 * {@docCategory MarqueeSelection}
 */
export declare interface IMarqueeSelectionStyleProps {
    theme: ITheme;
    className?: string;
}

/**
 * {@docCategory MarqueeSelection}
 */
export declare interface IMarqueeSelectionStyles {
    root?: IStyle;
    dragMask?: IStyle;
    box?: IStyle;
    boxFill?: IStyle;
}

/**
 * {@docCategory TextField}
 */
export declare interface IMaskedTextField extends ITextField {
    /**
     * The value of all filled format characters, or undefined if not all format characters are filled.
     */
    value: string | undefined;
}

/**
 * MaskedTextField component props.
 * {@docCategory TextField}
 */
export declare interface IMaskedTextFieldProps extends ITextFieldProps, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IMaskedTextField interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IMaskedTextField>;
    /**
     * The masking string that defines the mask's behavior.
     * A backslash will escape any character.
     * Special format characters are:
     * '9': [0-9]
     * 'a': [a-zA-Z]
     * '*': [a-zA-Z0-9]
     *
     * @example `Phone Number: (999) 999-9999`
     */
    mask?: string;
    /**
     * The character to show in place of unfilled characters of the mask.
     * @defaultvalue '_'
     */
    maskChar?: string;
    /**
     * An object defining the format characters and corresponding regexp values.
     * Default format characters: \{
     *  '9': /[0-9]/,
     *  'a': /[a-zA-Z]/,
     *  '*': /[a-zA-Z0-9]/
     * \}
     */
    maskFormat?: {
        [key: string]: RegExp;
    };
}

/**
 * @deprecated Deprecated in favor of mergeStyles API.
 */
export declare interface IMenuItemClassNames {
    item?: string;
    divider?: string;
    root?: string;
    linkContent?: string;
    icon?: string;
    checkmarkIcon?: string;
    subMenuIcon?: string;
    label?: string;
    secondaryText?: string;
    splitContainer?: string;
    splitPrimary?: string;
    splitMenu?: string;
    linkContentMenu?: string;
    screenReaderText?: string;
}

/**
 * {@docCategory ContextualMenu}
 */
export declare interface IMenuItemStyles extends IButtonStyles {
    /**
     * Styles for a menu item that is an anchor link.
     */
    item?: IStyle;
    /**
     * Styles for the content inside the button/link of the menuItem.
     */
    linkContent?: IStyle;
    /**
     * Styles for a menu item that is an anchor link.
     */
    anchorLink?: IStyle;
    /**
     * Default icon color style for known icons.
     */
    iconColor?: IStyle;
    /**
     * Default style for checkmark icons.
     */
    checkmarkIcon?: IStyle;
    /**
     * Styles for the submenu icon of a menu item.
     */
    subMenuIcon?: IStyle;
    /**
     * Styles for a divider item of a ContextualMenu.
     */
    divider?: IStyle;
}

/**
 * {@docCategory MessageBar}
 */
export declare interface IMessageBar {
}

/**
 * {@docCategory MessageBar}
 */
export declare interface IMessageBarProps extends React_2.HTMLAttributes<HTMLElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IMessageBar interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IMessageBar>;
    /**
     * The type of MessageBar to render.
     * @defaultvalue MessageBarType.info
     */
    messageBarType?: MessageBarType;
    /**
     * The actions you want to show on the other side.
     */
    actions?: JSX.Element;
    /**
     * A description of the message bar for the benefit of screen readers.
     * @deprecated Use native prop `aria-label` instead.
     */
    ariaLabel?: string;
    /**
     * Whether the message bar has a dismiss button and its callback.
     * If null, we don't show a dismiss button.
     * @defaultvalue null
     */
    onDismiss?: (ev?: React_2.MouseEvent<HTMLElement | BaseButton | Button>) => any;
    /**
     * Determines if the message bar is multi lined.
     * If false, and the text overflows over buttons or to another line, it is clipped.
     * @defaultvalue true
     */
    isMultiline?: boolean;
    /**
     * Aria label on dismiss button if onDismiss is defined.
     */
    dismissButtonAriaLabel?: string;
    /**
     * Determines if the message bar text is truncated.
     * If true, a button will render to toggle between a single line view and multiline view.
     * This prop is for single line message bars with no buttons only in a limited space scenario.
     * @defaultvalue false
     */
    truncated?: boolean;
    /**
     * Aria label on overflow button if truncated is defined.
     * @deprecated Use `expandButtonProps` instead.
     */
    overflowButtonAriaLabel?: string;
    /**
     * Additional CSS class(es) to apply to the MessageBar.
     */
    className?: string;
    /**
     * Theme (provided through customization.)
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IMessageBarStyleProps, IMessageBarStyles>;
    /**
     * Custom icon prop to replace the dismiss icon.
     * If unset, default will be the Fabric Clear icon.
     */
    dismissIconProps?: IIconProps;
    /**
     * Custom icon prop to replace the message bar icon.
     * If unset, default will be the icon set by messageBarType.
     */
    messageBarIconProps?: IIconProps;
    /**
     *  Button props that can be applied to the expand button of the MessageBar.
     */
    expandButtonProps?: IButtonProps;
    /**
     * Custom role to apply to the MessageBar.
     * @defaultvalue `alert` if `messageBarType` is `error`, `blocked`, or `severeWarning`;
     * or `status` otherwise
     */
    role?: 'alert' | 'status' | 'none';
    /**
     * By default, MessageBar delay-renders its content within an internal live region to help ensure
     * it's announced by screen readers. You can disable that behavior by setting this prop to `false`.
     *
     * If you set this prop to `false`, to ensure proper announcement you should either:
     * - If appropriate, ensure that the `role` prop is set to `alert` (this will be done by default
     *   if `messageBarType` is `error`, `blocked`, or `severeWarning`), OR
     * - Set the `role` prop to `none` (to avoid nested `status` regions), wrap the whole MessageBar
     *   in a `<div role="status">` which is always rendered, and ensure that the MessageBar is
     *   rendered either conditionally or with a delay.
     * @default true
     */
    delayedRender?: boolean;
}

/**
 * {@docCategory MessageBar}
 */
export declare interface IMessageBarStyleProps {
    /**
     * Theme (provided through customization).
     */
    theme: ITheme;
    /**
     * Additional CSS class(es).
     */
    className?: string;
    /**
     * Type of the MessageBar.
     */
    messageBarType?: MessageBarType;
    /**
     * Whether the MessageBar contains a dismiss button.
     */
    onDismiss?: boolean;
    /**
     * Whether the text is truncated.
     */
    truncated?: boolean;
    /**
     * Whether the MessageBar is rendered in multi line (as opposed to single line) mode.
     */
    isMultiline?: boolean;
    /**
     * Whether the single line MessageBar is being expanded.
     */
    expandSingleLine?: boolean;
    /**
     * Whether the MessageBar contains any action elements.
     */
    actions?: boolean;
}

/**
 * {@docCategory MessageBar}
 */
export declare interface IMessageBarStyles {
    /**
     * Style set for the root element.
     */
    root?: IStyle;
    /**
     * Style set for the element containing the icon, text, and optional dismiss button.
     */
    content?: IStyle;
    /**
     * Style set for the element containing the icon.
     */
    iconContainer?: IStyle;
    /**
     * Style set for the icon.
     */
    icon?: IStyle;
    /**
     * Style set for the element containing the text.
     */
    text?: IStyle;
    /**
     * Style set for the text.
     */
    innerText?: IStyle;
    /**
     * Style set for the optional dismiss button.
     */
    dismissal?: IStyle;
    /**
     * Style set for the icon used to expand and collapse the MessageBar.
     */
    expand?: IStyle;
    /**
     * Style set for the element containing the dismiss button.
     */
    dismissSingleLine?: IStyle;
    /**
     * Style set for the element containing the expand icon.
     */
    expandSingleLine?: IStyle;
    /**
     * Style set for the optional element containing the action elements.
     */
    actions?: IStyle;
}

export { imgProperties }

/**
 * {@docCategory Modal}
 */
export declare interface IModal {
    /**
     * Sets focus on the first focusable, or configured, child in focus trap zone
     */
    focus: () => void;
}

/**
 * {@docCategory Modal}
 */
export declare interface IModalProps extends React_2.RefAttributes<HTMLDivElement>, IAccessiblePopupProps {
    children?: React_2.ReactNode;
    /**
     * Optional ref to access the `IModal` interface. Use this instead of `ref` for accessing
     * public API of the component.
     */
    componentRef?: IRefObject<IModal>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IModalStyleProps, IModalStyles>;
    /**
     * Theme provided by higher-order component.
     */
    theme?: ITheme;
    /**
     * Whether the dialog is displayed.
     * @default false
     */
    isOpen?: boolean;
    /**
     * Whether the overlay is dark themed.
     * @default true
     */
    isDarkOverlay?: boolean;
    /**
     * A callback function for when the Modal is dismissed light dismiss, before the animation completes.
     */
    onDismiss?: (ev?: React_2.MouseEvent<HTMLButtonElement | HTMLElement>) => any;
    /**
     * A callback function which is called after the Modal is dismissed and the animation is complete.
     */
    onDismissed?: () => any;
    /**
     * The specified responsiveMode value for Modal to use.
     * @default ResponsiveMode.small
     */
    responsiveMode?: ResponsiveMode;
    /**
     * Defines an optional set of props to be passed through to Layer
     */
    layerProps?: ILayerProps;
    /**
     * Defines an optional set of props to be passed through to Overlay
     */
    overlay?: IOverlayProps;
    /**
     * Whether the dialog can be light dismissed by clicking outside the dialog (on the overlay).
     * @default false
     */
    isBlocking?: boolean;
    /**
     * Whether the dialog should be modeless (e.g. not dismiss when focusing/clicking outside of the dialog).
     * if true: isBlocking is ignored, there will be no overlay (isDarkOverlay is ignored),
     * isClickableOutsideFocusTrap is true, and forceFocusInsideTrap is false
     */
    isModeless?: boolean;
    /**
     * Determines the ARIA role of the dialog (alertdialog/dialog)
     * If this is set, it will override the ARIA role determined by isBlocking and isModeless
     *
     * For more information regarding dialogs please see https://w3c.github.io/aria-practices/#alertdialog
     */
    isAlert?: boolean;
    /**
     * Optional class name to be added to the root class
     */
    className?: string;
    /**
     * Optional override for container class
     */
    containerClassName?: string;
    /**
     * Optional override for scrollable content class
     */
    scrollableContentClassName?: string;
    /**
     * A callback function for when the Modal content is mounted on the overlay layer
     * @deprecated Use `layerProps.onLayerDidMount` instead
     */
    onLayerDidMount?: () => void;
    /**
     * ARIA id for the title of the Modal, if any
     */
    titleAriaId?: string;
    /**
     * ARIA id for the subtitle of the Modal, if any
     */
    subtitleAriaId?: string;
    /**
     * Whether the modal should have top offset fixed once opened and expand from the bottom only
     * when the content changes dynamically.
     */
    topOffsetFixed?: boolean;
    /**
     * The options to make the modal draggable
     */
    dragOptions?: IDragOptions;
    /**
     * Allow body scroll on content and overlay on touch devices. Changing after mounting has no effect.
     * @default false
     */
    allowTouchBodyScroll?: boolean;
    /**
     * Puts aria-hidden=true on all non-ancestors of the current modal, for screen readers
     * (unless `isModeless` is true).
     * @default true
     * @deprecated Setting this to `false` is deprecated since it breaks modal behavior for some screen readers.
     * It will not be supported in future versions of the library (except for modeless modals).
     */
    enableAriaHiddenSiblings?: boolean;
    /**
     * Set of props to customize the `FocusTrapZone` inside of the `Modal`.
     * @default `{}`
     */
    focusTrapZoneProps?: IFocusTrapZoneProps;
    /**
     * Props to be passed through to Popup
     */
    popupProps?: IPopupProps;
}

/**
 * {@docCategory Modal}
 */
export declare type IModalStyleProps = Required<Pick<IModalProps, 'theme'>> & Pick<IModalProps, 'className' | 'containerClassName' | 'scrollableContentClassName' | 'topOffsetFixed' | 'isModeless'> & {
    /** Modal open state. */
    isOpen?: boolean;
    /** Modal visible state. */
    isVisible?: boolean;
    /** Modal has been opened state. */
    hasBeenOpened?: boolean;
    /** Positioning of modal on first render */
    modalRectangleTop?: number;
    /** Classname for layer element */
    layerClassName?: string;
    /** Whether this modal is draggable and using the default handler */
    isDefaultDragHandle?: boolean;
    /** The windows inner height */
    windowInnerHeight?: number;
};

/**
 * {@docCategory Modal}
 */
export declare interface IModalStyles {
    root: IStyle;
    main: IStyle;
    scrollableContent: IStyle;
    layer: IStyle;
    keyboardMoveIconContainer: IStyle;
    keyboardMoveIcon: IStyle;
}

/**
 * {@docCategory Nav}
 */
export declare interface INav {
    /**
     * The meta 'key' property of the currently selected NavItem of the Nav. Can return
     * undefined if the currently selected nav item has no populated key property. Be aware
     * that in order for Nav to properly understand which key is selected all NavItems in
     * all groups of the Nav must have populated key properties.
     */
    selectedKey: string | undefined;
    /**
     * Sets focus to the first tabbable item in the zone.
     * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
     * if focus is already in the focus zone.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    focus(forceIntoFirstElement?: boolean): boolean;
}

/**
 * {@docCategory Nav}
 */
export declare interface INavButtonProps extends IButtonProps {
    /**
     * (Optional) Link to be rendered.
     */
    link?: INavLink;
}

/**
 * {@docCategory Nav}
 */
export declare interface INavLink {
    /**
     * Text to render for this link
     */
    name: string;
    /**
     * URL to navigate to for this link
     */
    url: string;
    /**
     * Unique, stable key for the link, used when rendering the list of links and for tracking
     * the currently selected link.
     */
    key?: string;
    /**
     * Child links to this link, if any
     */
    links?: INavLink[];
    /**
     * Callback invoked when this link is clicked. Providing this callback will cause the link
     * to render as a button (rather than an anchor) unless forceAnchor is set to true.
     */
    onClick?: (ev?: React_2.MouseEvent<HTMLElement>, item?: INavLink) => void;
    /**
     * Name of an icon to render next to the link button.
     */
    icon?: string;
    /**
     * @deprecated Use `iconProps.className` instead.
     */
    iconClassName?: string;
    /**
     * Props for an icon to render next to the link button.
     */
    iconProps?: IIconProps;
    /**
     * The name to use for functional automation tests
     */
    automationId?: string;
    /**
     * Whether or not the link is in an expanded state
     */
    isExpanded?: boolean;
    /**
     * Aria-current token for active nav links. Must be a valid token value, and defaults to 'page'.
     */
    ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true';
    /**
     * Aria label for nav link. Ignored if `collapseAriaLabel` or `expandAriaLabel` is provided.
     */
    ariaLabel?: string;
    /**
     * Text for title tooltip and ARIA description.
     */
    title?: string;
    /**
     * Link <a> target.
     */
    target?: string;
    /**
     * Whether or not the link is disabled.
     */
    disabled?: boolean;
    /**
     * (Optional) By default, any link with onClick defined will render as a button.
     * Set this property to true to override that behavior. (Links without onClick defined
     * will render as anchors by default.)
     */
    forceAnchor?: boolean;
    /**
     * ARIA label when group is collapsed and can be expanded.
     */
    expandAriaLabel?: string;
    /**
     * ARIA label when group is collapsed and can be expanded.
     */
    collapseAriaLabel?: string;
    /**
     * (Optional) Any additional properties to apply to the rendered links.
     */
    [propertyName: string]: any;
}

/**
 * {@docCategory Nav}
 */
export declare interface INavLinkGroup {
    /**
     * Text to render as the header of a group
     */
    name?: string;
    /**
     * Links to render within this group
     */
    links: INavLink[];
    /**
     * The name to use for functional automation tests
     */
    automationId?: string;
    /**
     * If true, the group should render collapsed by default
     */
    collapseByDefault?: boolean;
    /**
     * Callback invoked when a group header is clicked
     */
    onHeaderClick?: (ev?: React_2.MouseEvent<HTMLElement>, isCollapsing?: boolean) => void;
    /**
     * ARIA label when group is collapsed and can be expanded.
     */
    expandAriaLabel?: string;
    /**
     * ARIA label when group is collapsed and can be expanded.
     * WARNING: using separate labels for expanded and collapsed state is not recommended.
     *
     * @deprecated Use `expandAriaLabel` on its own instead.
     */
    collapseAriaLabel?: string;
    /**
     * (Optional) Any additional properties to apply to a group.
     */
    groupData?: any;
    /**
     * Provides consumer control to update the collapsed/expanded state of the group.
     */
    isExpanded?: boolean;
}

/**
 * {@docCategory Nav}
 */
export declare interface INavProps {
    /**
     * Optional callback to access the INav interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<INav>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<INavStyleProps, INavStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the Nav
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * A collection of link groups to display in the navigation bar
     */
    groups: INavLinkGroup[] | null;
    /**
     * Used to customize how content inside the group header is rendered
     */
    onRenderGroupHeader?: IRenderFunction<IRenderGroupHeaderProps>;
    /**
     * Render a custom link in place of the normal one.
     * This replaces the entire button rather than simply button content
     */
    linkAs?: IComponentAs<INavButtonProps>;
    /**
     * Used to customize how content inside the link tag is rendered
     */
    onRenderLink?: IRenderFunction<INavLink>;
    /**
     * Function callback invoked when a link in the navigation is clicked
     */
    onLinkClick?: (ev?: React_2.MouseEvent<HTMLElement>, item?: INavLink) => void;
    /**
     * Function callback invoked when the chevron on a link is clicked
     */
    onLinkExpandClick?: (ev?: React_2.MouseEvent<HTMLElement>, item?: INavLink) => void;
    /**
     * Indicates whether the navigation component renders on top of other content in the UI
     */
    isOnTop?: boolean;
    /**
     * (Optional) The key of the nav item initially selected.
     */
    initialSelectedKey?: string;
    /**
     * (Optional) Override the role of the `<nav>` element.
     * This is only recommended if you're nesting `Nav` inside a parent navigation region.
     */
    role?: string;
    /**
     * (Optional) The key of the nav item selected by caller.
     */
    selectedKey?: string;
    /**
     * (Optional) The nav container aria label.
     */
    ariaLabel?: string;
    /**
     * (Optional) The nav container aria label. The link name is prepended to this label.
     * If not provided, the aria label will default to the link name.
     *
     * @deprecated Use `expandAriaLabel` and `collapseAriaLabel` on groups instead
     */
    expandButtonAriaLabel?: string;
    /**
     * (Deprecated) Use ariaCurrent on links instead
     * @deprecated Use ariaCurrent on links instead
     */
    selectedAriaLabel?: string;
    /**
     * (Optional) Used to define the props of the FocusZone wrapper.
     */
    focusZoneProps?: IFocusZoneProps;
}

export declare interface INavState {
    isGroupCollapsed: {
        [key: string]: boolean;
    };
    isLinkExpandStateChanged?: boolean;
    selectedKey?: string;
}

/**
 * {@docCategory Nav}
 */
export declare interface INavStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * is element on top boolean
     */
    isOnTop?: boolean;
    /**
     * is element a link boolean
     */
    isLink?: boolean;
    /**
     * is element disabled
     */
    isDisabled?: boolean;
    /**
     * is element a group boolean
     */
    isGroup?: boolean;
    /**
     * is element expanded boolean
     */
    isExpanded?: boolean;
    /**
     * is element selected boolean
     */
    isSelected?: boolean;
    /**
     * is button
     */
    isButtonEntry?: boolean;
    /**
     * Nav height value
     */
    navHeight?: number;
    /**
     * left padding value
     */
    leftPadding?: number;
    /**
     * left padding when expanded value
     */
    leftPaddingExpanded?: number;
    /**
     * right padding value
     */
    rightPadding?: number;
    /**
     * position value
     */
    position?: number;
    /**
     * Inherited from INavProps
     * A collection of link groups to display in the navigation bar
     */
    groups: INavLinkGroup[] | null;
}

/**
 * {@docCategory Nav}
 */
export declare interface INavStyles {
    /**
     * Style set for the root element.
     */
    root: IStyle;
    /**
     * Style set for the link text container div element.
     */
    linkText: IStyle;
    /**
     * Style set for the link element extending the
     * root style set for ActionButton component.
     */
    link: IStyle;
    /**
     * Style set for the composite link container div element
     */
    compositeLink: IStyle;
    /**
     * Style set for the chevron button inside the composite
     * link and group elements.
     */
    chevronButton: IStyle;
    /**
     * Style set for the chevron icon inside the composite
     * link and group elements.
     */
    chevronIcon: IStyle;
    /**
     * Style set for the nav links ul element.
     */
    navItems: IStyle;
    /**
     * Style set for the nav links li element.
     */
    navItem: IStyle;
    /**
     * Style set for the group root div.
     */
    group: IStyle;
    /**
     * Style set for the group content div inside group.
     */
    groupContent: IStyle;
}

export { initializeComponentRef }

export { initializeFocusRects }

export { initializeIcons }

/**
 * Initializes the responsive mode to the current window size. This can be used to avoid
 * a re-render during first component mount since the window would otherwise not be measured
 * until after mounting.
 *
 * This WILL NOT trigger any updates to components that have already consumed the responsive mode!
 */
export declare function initializeResponsiveMode(element?: HTMLElement): void;

export { InjectionMode }

export { inputProperties }

export { IObjectWithKey }

/**
 * {@docCategory ComboBox}
 */
export declare interface IOnRenderComboBoxLabelProps {
    /**
     * Props to render the ComboBox.
     */
    props: IComboBoxProps;
    /**
     * Accessible text for label when ComboBox is multiselected.
     */
    multiselectAccessibleText?: string;
}

/**
 * {@docCategory OverflowSet}
 */
export declare interface IOverflowSet {
    /**
     * Sets focus to the first tabbable item in the zone.
     * @param forceIntoFirstElement - If true, focus will be forced into the first element, even if
     * @param bypassHiddenElements - If true, focus will be not be set on hidden elements.
     * focus is already in the focus zone.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    focus(forceIntoFirstElement?: boolean, bypassHiddenElements?: boolean): boolean;
    /**
     * Sets focus to a specific child element within the zone. This can be used in conjunction with
     * shouldReceiveFocus to created delayed focus scenarios (like animate the scroll position to the correct
     * location and then focus.)
     * @param childElement - The child element within the zone to focus.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    focusElement(childElement?: HTMLElement): boolean;
}

/**
 * {@docCategory OverflowSet}
 */
export declare interface IOverflowSetItemProps {
    /**
     * Unique id to identify the item.
     */
    key: string;
    /**
     * Optional keytip for the overflowSetItem.
     */
    keytipProps?: IKeytipProps;
    /**
     * Any additional properties to use when custom rendering menu items.
     */
    [propertyName: string]: any;
}

/**
 * {@docCategory OverflowSet}
 */
export declare interface IOverflowSetProps extends React_2.RefAttributes<HTMLElement> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IOverflowSet>;
    /**
     * Class name
     */
    className?: string;
    /**
     * An array of items to be rendered by your onRenderItem function in the primary content area
     */
    items?: IOverflowSetItemProps[];
    /**
     * Change item layout direction to vertical/stacked.
     * If role is set to `menubar`, `vertical={true}` will also add proper `aria-orientation`.
     * @defaultvalue false
     */
    vertical?: boolean;
    /**
     * Controls wether or not the overflow button is placed at the start or end of the items.
     * This gives a reversed visual behavior but maintains correct keyboard navigation.
     * @defaultValue 'end'
     */
    overflowSide?: 'start' | 'end';
    /**
     * An array of items to be passed to overflow contextual menu
     */
    overflowItems?: IOverflowSetItemProps[];
    /**
     * Method to call when trying to render an item.
     */
    onRenderItem: (item: IOverflowSetItemProps) => any;
    /**
     * Rendering method for overflow button and contextual menu. The argument to the function is
     * the overflowItems passed in as props to this function.
     */
    onRenderOverflowButton: IRenderFunction<any[]>;
    /**
     * The role for the OverflowSet.
     * @defaultvalue 'group'
     */
    role?: string;
    /**
     * Optional full keytip sequence for the overflow button, if it will have a keytip.
     */
    keytipSequences?: string[];
    /**
     * Function that will take in an IOverflowSetItemProps and return the subMenu for that item.
     * If not provided, will use 'item.subMenuProps.items' by default.
     * Alternatively accepts a boolean, return True if the item has a menu and False if not
     * This is only used if your overflow set has keytips.
     */
    itemSubMenuProvider?: (item: IOverflowSetItemProps) => any[] | boolean | undefined;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IOverflowSetProps, IOverflowSetStyles>;
}

/**
 * The props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory OverflowSet}
 */
export declare type IOverflowSetStyleProps = Pick<IOverflowSetProps, 'vertical' | 'className'>;

/**
 * {@docCategory OverflowSet}
 */
export declare interface IOverflowSetStyles {
    /** The style that is layered onto the root element of OverflowSet. */
    root?: IStyle;
    /** The style that is layered onto each individual item in the overflow set. */
    item?: IStyle;
    /** The style that is layered onto the overflow button for the overflow set. */
    overflowButton?: IStyle;
}

/**
 * {@docCategory Overlay}
 */
export declare interface IOverlay {
}

/**
 * {@docCategory Overlay}
 */
export declare interface IOverlayProps extends React_2.HTMLAttributes<HTMLElement> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<IOverlay>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IOverlayStyleProps, IOverlayStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the Overlay
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * Whether to use the dark-themed overlay.
     * @defaultvalue false
     */
    isDarkThemed?: boolean;
    /**
     * Allow body scroll on touch devices. Changing after mounting has no effect.
     * @defaultvalue false
     */
    allowTouchBodyScroll?: boolean;
}

/**
 * {@docCategory Overlay}
 */
export declare interface IOverlayStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * Is overlay visible
     */
    isNone?: boolean;
    /**
     * Is overlay dark themed
     */
    isDark?: boolean;
}

/**
 * {@docCategory Overlay}
 */
export declare interface IOverlayStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
}

/**
 * Extended column render props.
 *
 * {@docCategory DetailsList}
 */
export declare type IOverrideColumnRenderProps = Pick<IDetailsListProps, 'onRenderItemColumn' | 'getCellValueKey' | 'onRenderField'> & Pick<IDetailsRowProps, 'cellsByColumn'>;

/**
 * {@docCategory List}
 */
export declare interface IPage<T = any> {
    key: string;
    items: T[] | undefined;
    startIndex: number;
    itemCount: number;
    style: React_2.CSSProperties;
    top: number;
    height: number;
    data?: any;
    isSpacer?: boolean;
    isVisible?: boolean;
}

/**
 * {@docCategory List}
 */
export declare interface IPageProps<T = any> extends React_2.HTMLAttributes<HTMLDivElement>, React_2.ClassAttributes<HTMLDivElement> {
    /**
     * The role being assigned to the rendered page element by the list.
     */
    role?: string;
    /**
     * The allocation data for the page.
     */
    page: IPage<T>;
}

/**
 * {@docCategory List}
 */
export declare interface IPageSpecification {
    /**
     * The number of items to allocate to the page.
     */
    itemCount?: number;
    /**
     * The estimated pixel height of the page.
     */
    height?: number;
    /**
     * Data to pass through to the page when rendering.
     */
    data?: any;
    /**
     * The key to use when creating the page.
     */
    key?: string;
}

export { IPalette }

/**
 * {@docCategory Panel}
 */
export declare interface IPanel {
    /**
     * Forces the panel to open.
     */
    open: () => void;
    /**
     * Forces the panel to dismiss.
     */
    dismiss: (ev?: React_2.KeyboardEvent<HTMLElement> | KeyboardEvent) => void;
}

/**
 * Renderer function which takes an additional parameter, the ID to use for the element containing
 * the panel's title. This allows the `aria-labelledby` for the panel popup to work correctly.
 * Note that if `headerTextId` is provided, it **must** be used on an element, or screen readers
 * will be confused by the reference to a nonexistent ID.
 * {@docCategory Panel}
 */
export declare interface IPanelHeaderRenderer extends IRenderFunction<IPanelProps> {
    /**
     * @param props - Props given to the panel
     * @param defaultRender - Default header renderer. If using this renderer in code that does not
     * assign `headerTextId` to an element elsewhere, it **must** be passed to this function.
     * @param headerTextId - If provided, this **must** be used as the ID of an element containing the
     * panel's title, because the panel popup uses this ID as its aria-labelledby.
     */
    (props?: IPanelProps, defaultRender?: IPanelHeaderRenderer, headerTextId?: string | undefined): JSX.Element | null;
}

/**
 * {@docCategory Panel}
 */
export declare interface IPanelProps extends React_2.HTMLAttributes<PanelBase> {
    /**
     * Optional callback to access the IPanel interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IPanel>;
    /**
     * Whether the panel is displayed.
     * If true, will cause panel to stay open even if dismissed.
     * If false, will cause panel to stay hidden.
     * If undefined, will allow the panel to control its own visibility through open/dismiss methods.
     * @defaultvalue undefined
     */
    isOpen?: boolean;
    /**
     * Has the close button visible.
     * @defaultvalue true
     */
    hasCloseButton?: boolean;
    /**
     * Whether the panel can be light dismissed.
     * @defaultvalue false
     */
    isLightDismiss?: boolean;
    /**
     * Whether the panel is hidden on dismiss, instead of destroyed in the DOM.
     * Protects the contents from being destroyed when the panel is dismissed.
     * @defaultvalue false
     */
    isHiddenOnDismiss?: boolean;
    /**
     * Whether the panel uses a modal overlay or not
     * @defaultvalue true
     */
    isBlocking?: boolean;
    /**
     * Determines if content should stretch to fill available space putting footer at the bottom of the page
     * @defaultvalue false
     */
    isFooterAtBottom?: boolean;
    /**
     * Header text for the Panel.
     * @defaultvalue ""
     */
    headerText?: string;
    /**
     * The props for header text container.
     */
    headerTextProps?: React_2.HTMLAttributes<HTMLDivElement>;
    /**
     * A callback function for when the Panel is opened, before the animation completes.
     */
    onOpen?: () => void;
    /**
     * A callback function for when the Panel is opened, after the animation completes.
     */
    onOpened?: () => void;
    /**
     * A callback function for when the panel is closed, before the animation completes.
     * If the panel should NOT be dismissed based on some keyboard event, then simply call ev.preventDefault() on it
     */
    onDismiss?: (ev?: React_2.SyntheticEvent<HTMLElement> | KeyboardEvent) => void;
    /**
     * A callback function which is called **after** the Panel is dismissed and the animation is complete.
     * (If you need to update the Panel's `isOpen` prop in response to a dismiss event, use `onDismiss` instead.)
     */
    onDismissed?: () => void;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the Panel
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * Type of the panel.
     * @defaultvalue PanelType.smallFixedFar
     */
    type?: PanelType;
    /**
     * Custom panel width, used only when `type` is set to `PanelType.custom`.
     */
    customWidth?: string;
    /**
     * Aria label on close button
     */
    closeButtonAriaLabel?: string;
    /**
     * Optional parameter to provider the class name for header text
     */
    headerClassName?: string;
    /**
     * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
     * @defaultvalue The `element.target` that triggered the Panel.
     */
    elementToFocusOnDismiss?: HTMLElement;
    /**
     * Indicates if this Panel will ignore keeping track of HTMLElement that activated the Zone.
     * @defaultvalue false
     * @deprecated Use `focusTrapZoneProps`.
     */
    ignoreExternalFocusing?: boolean;
    /**
     * Indicates whether Panel should force focus inside the focus trap zone.
     * If not explicitly specified, behavior aligns with FocusTrapZone's default behavior.
     * @deprecated Use `focusTrapZoneProps`.
     */
    forceFocusInsideTrap?: boolean;
    /**
     * Indicates the selector for first focusable item.
     * @deprecated Use `focusTrapZoneProps`.
     */
    firstFocusableSelector?: string;
    /**
     * Optional props to pass to the FocusTrapZone component to manage focus in the panel.
     */
    focusTrapZoneProps?: IFocusTrapZoneProps;
    /**
     * Optional props to pass to the Layer component hosting the panel.
     */
    layerProps?: ILayerProps;
    /**
     * Optional props to pass to the Overlay component that the panel uses.
     */
    overlayProps?: IOverlayProps;
    /**
     * Optional props to pass the Popup component that the panel uses.
     */
    popupProps?: IPopupProps;
    /**
     * Optional custom function to handle clicks outside the panel in lightdismiss mode
     */
    onLightDismissClick?: () => void;
    /**
     * Optional custom function to handle clicks outside this component
     */
    onOuterClick?: (ev?: React_2.MouseEvent<HTMLDivElement>) => void;
    /**
     * Optional custom renderer navigation region. Replaces the region that contains the close button.
     */
    onRenderNavigation?: IRenderFunction<IPanelProps>;
    /**
     * Optional custom renderer for content in the navigation region. Replaces current close button.
     */
    onRenderNavigationContent?: IRenderFunction<IPanelProps>;
    /**
     * Optional custom renderer for header region. Replaces current title
     */
    onRenderHeader?: IPanelHeaderRenderer;
    /**
     * Optional custom renderer for body region. Replaces any children passed into the component.
     */
    onRenderBody?: IRenderFunction<IPanelProps>;
    /**
     * Optional custom renderer for footer region. Replaces sticky footer.
     */
    onRenderFooter?: IRenderFunction<IPanelProps>;
    /**
     * Custom renderer for content in the sticky footer
     */
    onRenderFooterContent?: IRenderFunction<IPanelProps>;
    /**
     * @deprecated Not used.
     */
    componentId?: string;
    /**
     * Allow body scroll on content and overlay on touch devices. Changing after mounting has no effect.
     * @defaultvalue false
     */
    allowTouchBodyScroll?: boolean;
}

declare interface IPanelState {
    isFooterSticky?: boolean;
    id?: string;
    visibility: PanelVisibilityState;
}

/**
 * {@docCategory Panel}
 */
export declare interface IPanelStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    /**
     * Is Panel open
     */
    isOpen?: boolean;
    /**
     * Is animation currently running
     */
    isAnimating?: boolean;
    /**
     * Is panel on right side
     */
    isOnRightSide?: boolean;
    /**
     * Is panel hidden on dismiss
     */
    isHiddenOnDismiss?: boolean;
    /**
     * Classname for FocusTrapZone element
     */
    focusTrapZoneClassName?: string;
    /**
     * Determines if content should stretch to fill available space putting footer at the bottom of the page
     */
    isFooterAtBottom?: boolean;
    /**
     * Based on state value setting footer to sticky or not
     */
    isFooterSticky?: boolean;
    /**
     * Panel has close button
     */
    hasCloseButton?: boolean;
    /**
     * Type of the panel.
     */
    type?: PanelType;
    /**
     * Optional parameter to provider the class name for header text
     */
    headerClassName?: string;
    /**
     * Determines where the header is rendered based on whether the user
     * has passed in a custom onRenderNavigation or onRenderNavigationContent render callback
     */
    hasCustomNavigation?: boolean;
}

/**
 * {@docCategory Panel}
 */
export declare interface IPanelStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    /**
     * Style for the overlay element.
     */
    overlay: IStyle;
    /**
     * Style for the hidden element.
     */
    hiddenPanel: IStyle;
    /**
     * Style for the main section element.
     */
    main: IStyle;
    /**
     * Style for the navigation container element.
     */
    commands: IStyle;
    /**
     * Style for the Body and Footer container element.
     */
    contentInner: IStyle;
    /**
     * Style for the scrollable content area container element.
     */
    scrollableContent: IStyle;
    /**
     * Style for the close button container element.
     */
    navigation: IStyle;
    /**
     * Style for the close button IconButton element.
     * @deprecated Use `subComponentStyles.closeButton` instead.
     */
    closeButton?: IStyle;
    /**
     * Style for the header container div element.
     */
    header: IStyle;
    /**
     * Style for the header text div element.
     */
    headerText: IStyle;
    /**
     * Style for the body div element.
     */
    content: IStyle;
    /**
     * Style for the footer div element.
     */
    footer: IStyle;
    /**
     * Style for the inner footer div element.
     */
    footerInner: IStyle;
    /**
     * Styling for subcomponents.
     */
    subComponentStyles: IPanelSubComponentStyles;
}

export declare interface IPanelSubComponentStyles {
    /**
     * Styling for close button child component.
     */
    closeButton: Partial<IButtonStyles>;
}

export { IPartialTheme }

/**
 * {@docCategory FloatingPeoplePicker}
 */
export declare interface IPeopleFloatingPickerProps extends IBaseFloatingPickerProps<IPersonaProps> {
}

/**
 * {@docCategory ExtendedPeoplePicker}
 */
export declare interface IPeoplePickerItemProps extends IPickerItemProps<IExtendedPersonaProps> {
}

/**
 * PeoplePickerItemSelected props interface. Refers to the PeoplePicker items that have been picked already.
 * {@docCategory PeoplePicker}
 */
export declare interface IPeoplePickerItemSelectedProps extends IPickerItemProps<IPersonaProps & {
    ValidationState: ValidationState;
}>, IPeoplePickerItemSharedProps {
    /** Call to provide customized styling that will layer on top of the variant rules. */
    styles?: IStyleFunctionOrObject<IPeoplePickerItemSelectedStyleProps, IPeoplePickerItemSelectedStyles>;
}

/**
 * Props needed to construct PeoplePickerItemSelected styles.
 * {@docCategory PeoplePicker}
 */
export declare type IPeoplePickerItemSelectedStyleProps = Required<Pick<IPeoplePickerItemSelectedProps, 'theme'>> & Pick<IPeoplePickerItemSelectedProps, 'className' | 'selected' | 'disabled'> & {
    /** Whether it's invalid. */
    invalid?: boolean;
};

/**
 * Represents the stylable areas of the PeoplePickerItemSelected.
 * {@docCategory PeoplePicker}
 */
export declare interface IPeoplePickerItemSelectedStyles {
    /** Root element of picked PeoplePicker item */
    root: IStyle;
    /** Refers to the element holding the content (Persona) of the PeoplePicker item already picked. */
    itemContent: IStyle;
    /** Refers to the remove action button on a picked PeoplePicker item. */
    removeButton: IStyle;
    /** SubComponent (Persona, PersonaCoin) styles. */
    subComponentStyles: IPeoplePickerItemSelectedSubComponentStyles;
}

/**
 * Styles interface of the SubComponents rendered within PeoplePickerItemSelected.
 * {@docCategory PeoplePicker}
 */
export declare interface IPeoplePickerItemSelectedSubComponentStyles {
    /** Refers to the Persona rendered within the PeoplePickerItemSelected */
    persona: IStyleFunctionOrObject<IPersonaStyleProps, any>;
    /** Refers to the PersonaCoin in the Persona rendered within the PeoplePickerItemSelected */
    personaCoin?: IStyleFunctionOrObject<IPersonaCoinStyleProps, any>;
}

/**
 * Common props in between IPeoplePickerItemSelectedProps, IPeoplePickerItemWithMenuProps and
 * IPeoplePickerItemSuggestionProps.
 * {@docCategory PeoplePicker}
 */
export declare interface IPeoplePickerItemSharedProps {
    /** Additional CSS class(es) to apply to the PeoplePickerItem root element. */
    className?: string;
    /** Theme provided by High-Order Component. */
    theme?: ITheme;
}

export declare interface IPeoplePickerItemState {
    contextualMenuVisible: boolean;
}

/**
 * PeoplePickerItemSuggestion props interface. Refers to the PeoplePicker items that are suggested for picking.
 * {@docCategory PeoplePicker}
 */
export declare interface IPeoplePickerItemSuggestionProps extends IPeoplePickerItemSharedProps {
    /** Persona props for each suggested for picking PeoplePicker item. */
    personaProps?: IPersonaProps;
    /** Call to provide customized styling that will layer on top of the variant rules. */
    styles?: IStyleFunctionOrObject<IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles>;
    /** General common props for all PeoplePicker items suggestions. */
    suggestionsProps?: IBasePickerSuggestionsProps;
    /**
     * Flag that controls whether each suggested PeoplePicker item (Persona) is rendered with or without secondary text
     * for compact look.
     * @defaultvalue false
     */
    compact?: boolean;
}

/**
 * Props needed to construct PeoplePickerItemSuggestion styles.
 * {@docCategory PeoplePicker}
 */
export declare type IPeoplePickerItemSuggestionStyleProps = Required<Pick<IPeoplePickerItemSuggestionProps, 'theme'>> & Pick<IPeoplePickerItemSuggestionProps, 'className'> & {};

/**
 * Represents the stylable areas of the PeoplePickerItemSuggestion.
 * {@docCategory PeoplePicker}
 */
export declare interface IPeoplePickerItemSuggestionStyles {
    /** Root container element of a suggested PeoplePicker item. */
    root: IStyle;
    /** Refers to the element wrapping the Persona of the suggested PeoplePicker item. */
    personaWrapper: IStyle;
    /** SubComponent (Persona, PersonaCoin) styles. */
    subComponentStyles: IPeoplePickerItemSelectedSubComponentStyles;
}

/**
 * PeoplePickerItemWithMenu props interface.
 * @deprecated Do not use. Will be removed in \>= 7.0
 */
export declare interface IPeoplePickerItemWithMenuProps extends IPickerItemProps<IPersonaWithMenu> {
}

/**
 * PeoplePicker props interface which renders Personas as items.
 * {@docCategory PeoplePicker}
 * */
export declare interface IPeoplePickerProps extends IBasePickerProps<IPersonaProps> {
}

export { IPerfData }

export { IPerfMeasurement }

export { IPerfSummary }

/**
 * {@docCategory Persona}
 */
export declare interface IPersona {
}

/**
 * {@docCategory Persona}
 */
export declare interface IPersonaCoinProps extends IPersonaSharedProps {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<{}>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IPersonaCoinStyleProps, IPersonaCoinStyles>;
    /**
     * Additional css class to apply to the PersonaCoin
     * @defaultvalue undefined
     */
    className?: string;
}

/**
 * {@docCategory Persona}
 */
export declare interface IPersonaCoinStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Custom class name.
     */
    className?: string;
    /**
     * Decides the size of the control.
     * @defaultvalue PersonaSize.size48
     */
    size?: PersonaSize;
    /**
     * Optional custom persona coin size in pixel.
     */
    coinSize?: number;
    /**
     * Decides whether to display coin for unknown persona
     */
    showUnknownPersonaCoin?: boolean;
}

/**
 * {@docCategory Persona}
 */
export declare interface IPersonaCoinStyles {
    coin: IStyle;
    imageArea: IStyle;
    image: IStyle;
    initials: IStyle;
    size10WithoutPresenceIcon: IStyle;
}

/**
 * {@docCategory Persona}
 */
export declare interface IPersonaPresenceProps extends IPersonaSharedProps {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<{}>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IPersonaPresenceStyleProps, IPersonaPresenceStyles>;
}

/**
 * {@docCategory Persona}
 */
export declare type IPersonaPresenceStyleProps = Required<Pick<IPersonaSharedProps, 'theme'>> & Pick<IPersonaSharedProps, 'presence' | 'isOutOfOffice' | 'size' | 'presenceColors'> & Pick<IPersonaProps, 'className'>;

/**
 * {@docCategory Persona}
 */
export declare interface IPersonaPresenceStyles {
    presence: IStyle;
    presenceIcon: IStyle;
}

/**
 * {@docCategory Persona}
 */
export declare interface IPersonaProps extends IPersonaSharedProps {
    /**
     * Optional callback to access the IPersona interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IPersona>;
    /**
     * Additional CSS class(es) to apply to the Persona
     */
    className?: string;
    /**
     * Call to provide customized styling that will layer on top of variant rules
     */
    styles?: IStyleFunctionOrObject<IPersonaStyleProps, IPersonaStyles>;
    /**
     * Optional custom renderer for the primary text.
     */
    onRenderPrimaryText?: IRenderFunction<IPersonaProps>;
    /**
     * Optional custom renderer for the secondary text.
     */
    onRenderSecondaryText?: IRenderFunction<IPersonaProps>;
    /**
     * Optional custom renderer for the tertiary text.
     */
    onRenderTertiaryText?: IRenderFunction<IPersonaProps>;
    /**
     * Optional custom renderer for the optional text.
     */
    onRenderOptionalText?: IRenderFunction<IPersonaProps>;
}

/**
 * {@docCategory Persona}
 */
export declare interface IPersonaSharedProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Primary text to display, usually the name of the person.
     */
    text?: string;
    /**
     * Decides the size of the control.
     * @defaultvalue PersonaSize.size48
     */
    size?: PersonaSize;
    /**
     * Optional custom renderer for the coin
     * @deprecated Use `onRenderPersonaCoin` for custom rendering instead
     */
    onRenderCoin?: IRenderFunction<IPersonaSharedProps>;
    /**
     * Optional custom renderer for the coin
     */
    onRenderPersonaCoin?: IRenderFunction<IPersonaSharedProps>;
    /**
     * If true, adds the css class 'is-fadeIn' to the image.
     */
    imageShouldFadeIn?: boolean;
    /**
     * If true, the image starts as visible and is hidden on error. Otherwise, the image is hidden until
     * it is successfully loaded. This disables imageShouldFadeIn.
     * @defaultvalue false
     */
    imageShouldStartVisible?: boolean;
    /**
     * Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.
     */
    imageUrl?: string;
    /**
     * Alt text for the image to use.
     * @default `''` (empty string)
     */
    imageAlt?: string;
    /**
     * The user's initials to display in the image area when there is no image.
     * @defaultvalue Derived from `text`
     */
    imageInitials?: string;
    /**
     * Whether initials are calculated for phone numbers and number sequences.
     * Example: Set property to true to get initials for project names consisting of numbers only.
     * @defaultvalue false
     */
    allowPhoneInitials?: boolean;
    /**
     * Optional custom renderer for the initials
     */
    onRenderInitials?: IRenderFunction<IPersonaSharedProps>;
    /**
     * Optional callback for when loading state of the photo changes
     */
    onPhotoLoadingStateChange?: (newImageLoadState: ImageLoadState) => void;
    /**
     * The background color when the user's initials are displayed.
     * @defaultvalue Derived from `text`
     */
    initialsColor?: PersonaInitialsColor | string;
    /**
     * The text color when the user's initials are displayed
     */
    initialsTextColor?: string;
    /** The colors to be used for the presence-icon and it's background */
    presenceColors?: {
        available: string;
        away: string;
        busy: string;
        dnd: string;
        offline: string;
        oof: string;
        background: string;
    };
    /**
     * Presence of the person to display - will not display presence if undefined.
     * @defaultvalue PersonaPresence.none
     */
    presence?: PersonaPresence;
    /**
     * Presence title to be shown as a tooltip on hover over the presence icon.
     */
    presenceTitle?: string;
    /**
     * This flag can be used to signal the persona is out of office.
     * This will change the way the presence icon looks for statuses that support dual-presence.
     */
    isOutOfOffice?: boolean;
    /**
     * Secondary text to display, usually the role of the user.
     */
    secondaryText?: string;
    /**
     * Controls whether clipped overflow text should render in a tooltip
     * @defaultvalue true
     */
    showOverflowTooltip?: boolean;
    /**
     * Tertiary text to display, usually the status of the user.
     * The tertiary text will only be shown when using size72 or size100.
     */
    tertiaryText?: string;
    /**
     * Optional text to display, usually a custom message set. The optional text will only be shown when using size100.
     */
    optionalText?: string;
    /**
     * Whether to not render persona details, and just render the persona image/initials.
     */
    hidePersonaDetails?: boolean;
    showSecondaryText?: boolean;
    /**
     * If true, show the special coin for unknown persona.
     * It has '?' in place of initials, with static font and background colors
     */
    showUnknownPersonaCoin?: boolean;
    /**
     * If true renders the initials while the image is loading.
     * This only applies when an imageUrl is provided.
     * @defaultvalue false
     */
    showInitialsUntilImageLoads?: boolean;
    /**
     * Optional custom persona coin size in pixel.
     */
    coinSize?: number;
    /**
     * Optional HTML element props for Persona coin.
     */
    coinProps?: IPersonaCoinProps;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Primary text to display, usually the name of the person.
     * @deprecated Use `text` instead.
     */
    primaryText?: string;
}

/**
 * {@docCategory Persona}
 */
export declare interface IPersonaStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Custom class name.
     */
    className?: string;
    /**
     * Optional custom persona coin size in pixel.
     */
    coinSize?: number;
    /**
     * Decides the size of the control.
     * @defaultvalue PersonaSize.size48
     */
    size?: PersonaSize;
    /**
     * Presence of the person to display - will not display presence if undefined.
     * @defaultvalue PersonaPresence.none
     */
    presence?: PersonaPresence;
    showSecondaryText?: boolean;
}

/**
 * {@docCategory Persona}
 */
export declare interface IPersonaStyles {
    root: IStyle;
    details: IStyle;
    primaryText: IStyle;
    secondaryText: IStyle;
    tertiaryText: IStyle;
    optionalText: IStyle;
    textContent: IStyle;
}

/**
 * Extended interface from IPersonaProps to add `menuItems` property PeoplePickerItemWithMenu items.
 * @deprecated Do not use. Will be removed in \>= 7.0
 */
export declare interface IPersonaWithMenu extends IPersonaProps {
    /** Additional menuItems to be rendered in a contextualMenu for each Persona. */
    menuItems?: IContextualMenuItem[];
}

/**
 * Aria id's for internal picker components
 * {@docCategory Pickers}
 */
export declare type IPickerAriaIds = {
    /**
     * Aria id for selected suggestion alert component
     */
    selectedSuggestionAlert: string;
    /**
     * Aria id for selected items container component
     */
    selectedItems: string;
    /**
     * Aria id for suggestions list component
     */
    suggestionList: string;
    /**
     * Aria id for element with role=combobox
     */
    combobox: string;
};

/**
 * PickerItem component.
 * {@docCategory Pickers}
 */
export declare interface IPickerItem {
}

/**
 * PickerItem props common for any type of items.
 * {@docCategory Pickers}
 */
export declare interface IPickerItemProps<T> extends React_2.AllHTMLAttributes<HTMLElement> {
    /**
     * Optional callback to access the IPickerItem interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IPickerItem>;
    /** The item of Type T (Persona, Tag, or any other custom item provided). */
    item: T;
    /** Index number of the item in the array of picked items. */
    index: number;
    /** Whether the picked item is selected or not. */
    selected?: boolean;
    /** Callback issued when the item is removed from the array of picked items. */
    onRemoveItem?: () => void;
    /**
     * Internal Use only, gives a callback to the renderer to call when an item has changed.
     * This allows the base picker to keep track of changes in the items.
     */
    onItemChange?: (item: T, index: number) => void;
    /** Unique key for each picked item. */
    key?: string | number;
    /** Aria-label for the picked item remove button. */
    removeButtonAriaLabel?: string;
    /**
     *  Props for the icon used in the remove button.
     *  @defaultvalue `{ iconName:'Cancel' }`
     */
    removeButtonIconProps?: IIconProps;
}

/**
 * {@docCategory Pivot}
 */
export declare interface IPivot {
    /**
     * Sets focus to the first pivot tab.
     */
    focus(): void;
}

/**
 * {@docCategory Pivot}
 */
export declare interface IPivotItemProps extends React_2.HTMLAttributes<HTMLDivElement> {
    children?: React_2.ReactNode;
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<{}>;
    /**
     * The text displayed of each pivot link.
     * @deprecated Use `headerText` instead.
     */
    linkText?: string;
    /**
     * The text displayed of each pivot link.
     */
    headerText?: string;
    /**
     * Props for the header command button. This provides a way to pass in native props, such as data-* and aria-*,
     * for each pivot header/link element.
     */
    headerButtonProps?: IButtonProps | {
        [key: string]: string | number | boolean;
    };
    /**
     * An required key to uniquely identify a pivot item.
     *
     * Note: The 'key' from react props cannot be used inside component.
     */
    itemKey?: string;
    /**
     * The aria label of each pivot link which will read by screen reader instead of linkText.
     *
     * Note that unless you have compelling requirements you should not override aria-label.
     */
    ariaLabel?: string;
    /**
     * Defines an optional item count displayed in parentheses just after the `linkText`.
     *
     * Examples: completed (4), Unread (99+)
     */
    itemCount?: number | string;
    /**
     * An optional icon to show next to the pivot link.
     */
    itemIcon?: string;
    /**
     * Optional custom renderer for the pivot item link
     */
    onRenderItemLink?: IRenderFunction<IPivotItemProps>;
    /**
     * Optional keytip for this PivotItem
     */
    keytipProps?: IKeytipProps;
    /**
     * Defines whether to always render the pivot item (regardless of whether it is selected or not).
     * Useful if you're rendering content that is expensive to mount.
     *
     * @defaultvalue false
     */
    alwaysRender?: boolean;
}

/**
 * {@docCategory Pivot}
 */
export declare interface IPivotProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IPivot interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: React_2.RefObject<IPivot>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles>;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the Pivot
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * Default selected key for the pivot. Only provide this if the pivot is an uncontrolled component;
     * otherwise, use the `selectedKey` property.
     */
    defaultSelectedKey?: string;
    /**
     * Key of the selected pivot item. Updating this will override the Pivot's selected item state.
     * Only provide this if the pivot is a controlled component where you are maintaining the
     * current state; otherwise, use `defaultSelectedKey`.
     */
    selectedKey?: string | null;
    /**
     * Callback for when the selected pivot item is changed.
     */
    onLinkClick?: (item?: PivotItem, ev?: React_2.MouseEvent<HTMLElement>) => void;
    /**
     * Link size (normal, large)
     */
    linkSize?: PivotLinkSizeType;
    /**
     * Link format (links, tabs)
     */
    linkFormat?: PivotLinkFormatType;
    /**
     * Aria label for the overflow button, used if `overflowBehavior` is "menu".
     */
    overflowAriaLabel?: string;
    /**
     * Overflow behavior when there is not enough room to display all of the links/tabs
     * * none: Pivot links will overflow the container and may not be visible
     * * menu: Display an overflow menu that contains the tabs that don't fit
     *
     * @default none
     */
    overflowBehavior?: 'none' | 'menu';
    /**
     * Custom component for the overflow button.
     */
    overflowButtonAs?: IComponentAs<IButtonProps>;
    /**
     * Whether to skip rendering the tabpanel with the content of the selected tab.
     * Use this prop if you plan to separately render the tab content
     * and don't want to leave an empty tabpanel in the page that may confuse Screen Readers.
     */
    headersOnly?: boolean;
    /**
     * Callback to customize how IDs are generated for each tab header.
     * Useful if you're rendering content outside and need to connect aria-labelledby.
     */
    getTabId?: (itemKey: string, index: number) => string;
    /**
     * Props passed to the `FocusZone` component used as the root of `Pivot`.
     */
    focusZoneProps?: IFocusZoneProps;
}

/**
 * {@docCategory Pivot}
 */
export declare type IPivotStyleProps = Required<Pick<IPivotProps, 'theme'>> & Pick<IPivotProps, 'className'> & {
    linkSize?: PivotLinkSizeType;
    linkFormat?: PivotLinkFormatType;
};

/**
 * {@docCategory Pivot}
 */
export declare interface IPivotStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    link: IStyle;
    linkIsSelected: IStyle;
    linkContent: IStyle;
    text: IStyle;
    count: IStyle;
    icon: IStyle;
    linkInMenu: IStyle;
    overflowMenuButton: IStyle;
    itemContainer?: IStyle;
}

/**
 * {@docCategory HoverCard}
 */
export declare interface IPlainCard {
}

/**
 * PlainCard component props.
 * {@docCategory HoverCard}
 */
export declare interface IPlainCardProps extends IBaseCardProps<IPlainCard, IPlainCardStyles, IPlainCardStyleProps> {
    /**
     *  Render function to populate compact content area
     */
    onRenderPlainCard?: IRenderFunction<any>;
}

/**
 * {@docCategory HoverCard}
 */
export declare interface IPlainCardStyleProps extends IBaseCardStyleProps {
}

/**
 * {@docCategory HoverCard}
 */
export declare interface IPlainCardStyles extends IBaseCardStyles {
}

export { IPoint }

/**
 * {@docCategory Popup}
 */
export declare interface IPopupProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Aria role for popup
     */
    role?: string;
    /**
     * Accessible label text for the popup.
     */
    ariaLabel?: string;
    /**
     *  Defines the element id referencing the element containing label text for popup.
     */
    ariaLabelledBy?: string;
    /**
     * Defines the element id referencing the element containing the description for the popup.
     */
    ariaDescribedBy?: string;
    /**
     * A callback function for when the popup is dismissed from the close button or light dismiss. If provided, will
     * handle escape key press and call this. The event will be stopped/canceled.
     */
    onDismiss?: (ev?: React_2.MouseEvent<HTMLElement> | React_2.KeyboardEvent<HTMLElement> | KeyboardEvent) => any;
    /**
     *  Optional class name for the root popup div.
     */
    className?: string;
    /**
     * If true, when this component is unmounted, focus will be restored to the element that had focus when the component
     * first mounted.
     * @defaultvalue true
     * @deprecated use restoreFocus callback instead
     */
    shouldRestoreFocus?: boolean;
    /**
     * Called when the component is unmounting, and focus needs to be restored. If this is provided,
     * focus will not be restored automatically, and you'll need to call `params.originalElement.focus()`.
     */
    onRestoreFocus?: (params: IPopupRestoreFocusParams) => void;
    /**
     * Puts aria-hidden=true on all non-ancestors of the current popup, for screen readers.
     * @defaultvalue true
     * @deprecated Setting this to `false` is deprecated since it breaks modal behavior for some screen readers.
     * It will not be supported in future versions of the library.
     */
    enableAriaHiddenSiblings?: boolean;
}

/**
 * Parameters passed to `onRestoreFocus` callback of `Popup` and related components.
 * {@docCategory Popup}
 */
export declare interface IPopupRestoreFocusParams {
    /** Element the underlying Popup believes focus should go to */
    originalElement?: HTMLElement | Window | null;
    /** Whether the popup currently contains focus */
    containsFocus: boolean;
    /** Whether the document the popup belongs to contains focus (or false if unknown) */
    documentContainsFocus: boolean;
}

/**
 * Gives the position of some element on the page. Only a pair of vertical and horizontal edges need to be
 * given. So top/left or bottom/left is sufficient.
 * The number given is the distance in pixels from whatever host was given..
 * So bottom: 100 would be 100px up from the bottom of the host while top: 100px from the top.
 */
export declare interface IPosition {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    [key: string]: number | undefined;
}

export declare interface IPositionDirectionalHintData {
    targetEdge: RectangleEdge;
    alignmentEdge?: RectangleEdge;
    isAuto?: boolean;
    alignTargetEdge?: boolean;
}

export declare interface IPositionedData {
    /**
     * The new position of the element.
     */
    elementPosition: IPosition;
    /**
     * The finalized target edge that element is aligning to. For instance RectangleEdge.bottom would mean
     * that the bottom edge of the target is being aligned to by the RectangleEdge.top of the element
     * that is being positioned.
     */
    targetEdge: RectangleEdge;
    /**
     * The finalized alignment edge that the element is aligning too. For instance, RectangleEdge.left means
     * that the left edge of the target should be in line with the left edge of the element being positioned.
     */
    alignmentEdge?: RectangleEdge;
}

/**
 * {@docCategory Coachmark}
 */
export declare interface IPositioningContainer {
}

/**
 * {@docCategory Coachmark}
 */
export declare interface IPositioningContainerProps extends IBaseProps<IPositioningContainer>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * All props for your component are to be defined here.
     */
    componentRef?: IRefObject<IPositioningContainer>;
    /**
     * The target that the positioningContainer should try to position itself based on.
     * It can be either an HTMLElement a querySelector string of a valid HTMLElement
     * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
     */
    target?: Target;
    /**
     * How the element should be positioned
     * @defaultvalue DirectionalHint.BottomAutoEdge
     */
    directionalHint?: DirectionalHint;
    /**
     * How the element should be positioned in RTL layouts.
     * If not specified, a mirror of `directionalHint` will be used instead
     */
    directionalHintForRTL?: DirectionalHint;
    /**
     * The gap between the positioningContainer and the target
     * @defaultvalue 0
     */
    offsetFromTarget?: number;
    /**
     * Custom width for positioningContainer including borders. If value is 0, no width is applied.
     * @defaultvalue 0
     */
    positioningContainerWidth?: number;
    /**
     * The background color of the positioningContainer in hex format ie. #ffffff.
     * @defaultvalue $ms-color-white
     */
    backgroundColor?: string;
    /**
     * The bounding rectangle for which the contextual menu can appear in.
     */
    bounds?: IRectangle;
    /**
     * The minimum distance the positioningContainer will be away from the edge of the screen.
     *  @defaultvalue 8
     */
    minPagePadding?: number;
    /**
     * If true use a point rather than rectangle to position the positioningContainer.
     * For example it can be used to position based on a click.
     * @deprecated Do not use.
     */
    useTargetPoint?: boolean;
    /**
     * Point used to position the positioningContainer.
     * Deprecated, use `target` instead.
     * @deprecated Use `target` instead.
     */
    targetPoint?: Point;
    /**
     * If true then the onClose will not not dismiss on scroll
     * @defaultvalue false
     */
    preventDismissOnScroll?: boolean;
    /**
     * If true the position returned will have the menu element cover the target.
     * If false then it will position next to the target;
     * @defaultvalue false
     */
    coverTarget?: boolean;
    /**
     * Aria role assigned to the positioningContainer (Eg. dialog, alertdialog).
     */
    role?: string;
    /**
     * Accessible label text for positioningContainer.
     */
    ariaLabel?: string;
    /**
     *  Defines the element id referencing the element containing label text for positioningContainer.
     */
    ariaLabelledBy?: string;
    /**
     * Defines the element id referencing the element containing the description for the positioningContainer.
     */
    ariaDescribedBy?: string;
    /**
     * CSS class to apply to the positioningContainer.
     * @defaultvalue null
     */
    className?: string;
    /**
     * Defines an optional set of props to be passed through to Layer
     */
    layerProps?: ILayerProps;
    /**
     * Optional callback when the layer content has mounted.
     */
    onLayerMounted?: () => void;
    /**
     * Optional callback that is called once the positioningContainer has been correctly positioned.
     * @param positions - gives the user information about how the container is positioned such
     * as the element position, the target edge, and the alignment edge of the container.
     */
    onPositioned?: (positions?: IPositionedData) => void;
    /**
     * Callback when the positioningContainer tries to close.
     */
    onDismiss?: (ev?: any) => void;
    /**
     * If true do not render on a new layer. If false render on a new layer.
     */
    doNotLayer?: boolean;
    /**
     * If true the position will not change sides in an attempt to fit the positioningContainer within bounds.
     * It will still attempt to align it to whatever bounds are given.
     * @defaultvalue false
     */
    directionalHintFixed?: boolean;
    /**
     * Specify the final height of the content.
     * To be used when expanding the content dynamically so that positioningContainer can adjust its position.
     */
    finalHeight?: number;
    /**
     * If true then the positioningContainer will attempt to focus the first focusable element that it contains.
     * If it doesn't find an element, no focus will be set and the method will return false.
     * This means that it's the contents responsibility to either set focus or have
     * focusable items.
     * @returns True if focus was set, false if it was not.
     */
    setInitialFocus?: boolean;
    /**
     * Set max height of positioningContainer
     * When not set the positioningContainer will expand with contents up to the bottom of the screen
     */
    positioningContainerMaxHeight?: number;
    /**
     * Child nodes to render
     */
    children?: ReactNode;
}

/**
 * @deprecated Use `IPositioningContainerProps`
 * {@docCategory Coachmark}
 */
export declare type IPositioningContainerTypes = IPositioningContainerProps;

export declare interface IPositionProps {
    target?: Element | MouseEvent | Point;
    /** how the element should be positioned */
    directionalHint?: DirectionalHint;
    /**
     * How the element should be positioned in RTL layouts.
     * If not specified, a mirror of `directionalHint` will be used instead
     */
    directionalHintForRTL?: DirectionalHint;
    /** The gap between the callout and the target */
    gapSpace?: number;
    /**
     * The bounding rectangle for which  the contextual menu can appear in.
     */
    bounds?: IRectangle;
    /**
     * If true the position returned will have the menu element cover the target.
     * If false then it will position next to the target;
     */
    coverTarget?: boolean;
    /**
     * If true the position will not change edges in an attempt to fit the rectangle within bounds.
     * It will still attempt to align it to whatever bounds are given.
     * @defaultvalue false
     */
    directionalHintFixed?: boolean;
    /**
     * If true the positioning logic will prefer flipping edges over nudging the rectangle to fit within bounds,
     * thus making sure the element align perfectly with target.
     */
    alignTargetEdge?: boolean;
}

export { IProcessedStyleSet }

/**
 * {@docCategory ProgressIndicator}
 */
export declare interface IProgressIndicatorProps extends React_2.ClassAttributes<ProgressIndicatorBase> {
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IProgressIndicatorStyleProps, IProgressIndicatorStyles>;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the ProgressIndicator
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * Label to display above the control. May be a string or React virtual elements.
     */
    label?: React_2.ReactNode;
    /**
     * Add screen-reader-only label text to the progressbar.
     * Prefer `label`, and use this only when other text or visual context provides a visible label
     */
    ariaLabel?: string;
    /**
     * Text describing or supplementing the operation. May be a string or React virtual elements.
     */
    description?: React_2.ReactNode;
    /**
     * Percentage of the operation's completeness, numerically between 0 and 1. If this is not set,
     * the indeterminate progress animation will be shown instead.
     */
    percentComplete?: number;
    /**
     * Whether or not to hide the progress state.
     */
    progressHidden?: boolean;
    /**
     * A render override for the progress track.
     */
    onRenderProgress?: IRenderFunction<IProgressIndicatorProps>;
    /**
     * Text alternative of the progress status, used by screen readers for reading the value of the progress.
     */
    ariaValueText?: string;
    /**
     * @deprecated Use `label` instead. Deprecated at v0.43.0, to be removed at \>= v0.53.0.
     */
    title?: string;
    /**
     * Height of the ProgressIndicator
     * @defaultvalue 2
     */
    barHeight?: number;
}

/**
 * {@docCategory ProgressIndicator}
 */
export declare interface IProgressIndicatorStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    indeterminate?: boolean;
    barHeight?: number;
}

/**
 * {@docCategory ProgressIndicator}
 */
export declare interface IProgressIndicatorStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    itemName: IStyle;
    itemDescription: IStyle;
    itemProgress: IStyle;
    progressTrack: IStyle;
    progressBar: IStyle;
}

export { IPropsWithStyles }

/**
 * {@docCategory Rating}
 */
export declare interface IRating {
    /** Current displayed rating value. Will be `min` if the user has not yet set a rating. */
    rating: number;
}

/**
 * Rating component props.
 * {@docCategory Rating}
 */
export declare interface IRatingProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IRating interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IRating>;
    /**
     * Current rating. Must be a number between `min` and `max`. Only provide this if the Rating
     * is a controlled component where you are maintaining its current state; otherwise, use the
     * `defaultRating` property.
     */
    rating?: number;
    /**
     * Default rating. Must be a number between `min` and `max`. Only provide this if the Rating
     * is an uncontrolled component; otherwise, use the `rating` property.
     */
    defaultRating?: number;
    /**
     * Minimum rating. Must be \>= 0.
     * @defaultvalue 0 if `allowZeroStars` is true, 1 otherwise
     * @deprecated Use `allowZeroStars` instead.
     */
    min?: number;
    /**
     * Maximum rating. Must be \>= `min`.
     * @defaultvalue 5
     */
    max?: number;
    /**
     * Allow the initial rating value (or updated values passed in through `rating`) to be 0.
     * Note that a value of 0 still won't be selectable by mouse or keyboard.
     */
    allowZeroStars?: boolean;
    /**
     * Whether the control should be disabled.
     */
    disabled?: boolean;
    /**
     * Custom icon name for selected rating elements.
     * @defaultvalue FavoriteStarFill
     */
    icon?: string;
    /**
     * Custom icon name for unselected rating elements.
     * @defaultvalue FavoriteStar
     */
    unselectedIcon?: string;
    /**
     * Optional custom renderer for the star component.
     */
    onRenderStar?: IRenderFunction<IRatingStarProps>;
    /**
     * Size of rating
     * @defaultvalue Small
     */
    size?: RatingSize;
    /**
     * Callback for when the rating changes.
     */
    onChange?: (event: React_2.FormEvent<HTMLElement>, rating?: number) => void;
    /**
     * Optional label format for each individual rating star (not the rating control as a whole)
     * that will be read by screen readers. Placeholder `{0}` is the current rating and placeholder
     * `{1}` is the max: for example, `"Select {0} of {1} stars"`.
     *
     * (To set the label for the control as a whole, use `getAriaLabel` or `aria-label`.)
     *
     * @defaultvalue ''
     */
    ariaLabelFormat?: string;
    /**
     * Optional flag to mark rating control as readOnly
     */
    readOnly?: boolean;
    /**
     * Optional callback to set the aria-label for rating control in readOnly mode.
     * Also used as a fallback aria-label if ariaLabel prop is not provided.
     */
    getAriaLabel?: (rating: number, max: number) => string;
    /**
     * Optional aria-label for rating control.
     * If rating control is readOnly, it is recommended to provide a getAriaLabel prop instead
     * since otherwise the current rating value will not be read.
     */
    ariaLabel?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IRatingStyleProps, IRatingStyles>;
    /**
     * Theme (provided through customization.)
     */
    theme?: ITheme;
}

export declare interface IRatingStarProps {
    fillPercentage: number;
    disabled?: boolean;
    classNames: IProcessedStyleSet<IRatingStyles>;
    icon: string;
    starNum?: number;
    unselectedIcon?: string;
}

/**
 * {@docCategory Rating}
 */
export declare interface IRatingStyleProps {
    disabled?: boolean;
    readOnly?: boolean;
    theme: ITheme;
}

/**
 * {@docCategory Rating}
 */
export declare interface IRatingStyles {
    root: IStyle;
    ratingStar: IStyle;
    ratingStarBack: IStyle;
    ratingStarFront: IStyle;
    ratingButton: IStyle;
    ratingStarIsSmall: IStyle;
    ratingStarIsLarge: IStyle;
    rootIsSmall: IStyle;
    rootIsLarge: IStyle;
    labelText: IStyle;
    ratingFocusZone: IStyle;
}

export { IRawStyle }

export { IRectangle }

export { IRefObject }

export declare interface IRelativePositions {
    calloutPosition: IPosition;
    beakPosition: {
        position: IPosition | undefined;
        display: 'block';
    };
    directionalClassName: string;
    submenuDirection: DirectionalHint;
}

export { IRenderComponent }

export { IRenderFunction }

/**
 * {@doccategory Nav}
 */
export declare interface IRenderGroupHeaderProps extends INavLinkGroup {
    /**
     * Whether or not the group is presently expanded.
     */
    isExpanded?: boolean;
}

/**
 * {@docCategory ResizeGroup}
 */
export declare interface IResizeGroup {
    /**
     * Remeasures the available space.
     */
    remeasure(): void;
}

/**
 * {@docCategory ResizeGroup}
 */
export declare interface IResizeGroupProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the IResizeGroup interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IResizeGroup>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     * @deprecated Removed to reduce bundle size.  Please use `className` and add css rules to `className` instead.
     */
    styles?: IStyleFunctionOrObject<IResizeGroupStyleProps, IResizeGroupStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the Component
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * Direction of this resize group, vertical or horizontal
     * @defaultvalue ResizeGroupDirection.horizontal
     */
    direction?: ResizeGroupDirection;
    /**
     * Initial data to be passed to the `onRenderData` function. When there is no `onGrowData` provided, this data should
     * represent what should be passed to the render function when the parent container of the ResizeGroup is at its
     * maximum supported width. A `cacheKey` property may optionally be included as part of the data. Two data objects
     * with the same `cacheKey` will be assumed to take up the same width and will prevent measurements.
     * The type of `cacheKey` is a string.
     */
    data: any;
    /**
     * Function to render the data. Called when rendering the contents to the screen and when
     * rendering in a hidden div to measure the size of the contents.
     */
    onRenderData: (data: any) => JSX.Element;
    /**
     * Function to be performed on the data in order to reduce its width and make it fit into the given space.
     * If there are no more scaling steps to apply, it should return undefined to prevent
     * an infinite render loop.
     */
    onReduceData: (prevData: any) => any;
    /**
     * Function to be performed on the data in order to increase its width. It is called in scenarios where the
     * container has more room than the previous render and we may be able to fit more content. If there are no more
     * scaling operations to perform on teh data, it should return undefined to prevent an infinite render loop.
     */
    onGrowData?: (prevData: any) => any;
    /**
     * Function to be called every time data is rendered. It provides the data that was actually rendered.
     * A use case would be adding telemetry when a particular control is shown in an overflow well or
     * dropped as a result of onReduceData or to count the number of renders that an implementation of
     * onReduceData triggers.
     */
    dataDidRender?: (renderedData: any) => void;
}

export declare interface IResizeGroupState {
    /**
     * Final data used to render proper sized component
     */
    renderedData?: any;
    /**
     * Data to render in a hidden div for measurement
     */
    dataToMeasure?: any;
    /**
     * Set to true when the content container might have new dimensions and should
     * be remeasured.
     */
    measureContainer?: boolean;
    /**
     * Are we resizing to accommodate having more or less available space?
     * The 'grow' direction is when the container may have more room than the last render,
     * such as when a window resize occurs. This means we will try to fit more content in the window.
     * The 'shrink' direction is when the contents don't fit in the container and we need
     * to find a transformation of the data that makes everything fit.
     */
    resizeDirection?: 'grow' | 'shrink';
}

/**
 * {@docCategory ResizeGroup}
 */
export declare interface IResizeGroupStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
}

/**
 * {@docCategory ResizeGroup}
 */
export declare interface IResizeGroupStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
}

/** RGB color with optional alpha value. */
export declare interface IRGB {
    /** Red, range 0-255. */
    r: number;
    /** Green, range 0-255. */
    g: number;
    /** Blue, range 0-255. */
    b: number;
    /** Alpha, range 0 (transparent)-100. Usually assumed to be 100 if not specified. */
    a?: number;
}

export { IScheme }

export { ISchemeNames }

export { isControlled }

/**
 * {@docCategory ScrollablePane}
 */
export declare interface IScrollablePane {
    /** Triggers a layout update for the pane. */
    forceLayoutUpdate(): void;
    /** Gets the current scroll position of the scrollable pane */
    getScrollPosition(): number;
}

export declare interface IScrollablePaneContext {
    scrollablePane?: {
        subscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
        unsubscribe: (handler: (container: HTMLElement, stickyContainer: HTMLElement) => void) => void;
        addSticky: (sticky: Sticky) => void;
        removeSticky: (sticky: Sticky) => void;
        updateStickyRefHeights: () => void;
        sortSticky: (sticky: Sticky, sortAgain?: boolean) => void;
        notifySubscribers: (sort?: boolean) => void;
        syncScrollSticky: (sticky: Sticky) => void;
    };
}

/**
 * {@docCategory ScrollablePane}
 */
export declare interface IScrollablePaneProps extends React_2.HTMLAttributes<HTMLElement | ScrollablePaneBase> {
    /**
     * Optional callback to access the IScrollablePane interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IScrollablePane>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules
     */
    styles?: IStyleFunctionOrObject<IScrollablePaneStyleProps, IScrollablePaneStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Additional css class to apply to the ScrollablePane
     * @defaultvalue undefined
     */
    className?: string;
    /**
     * Sets the initial scroll position of the ScrollablePane
     */
    initialScrollPosition?: number;
    scrollbarVisibility?: ScrollbarVisibility;
    /**
     * Makes the scrollable container focusable, to aid with keyboard-only scrolling
     * Should only be set to true if the scrollable region will not contain any other focusable items
     * @defaultvalue false
     */
    scrollContainerFocus?: boolean;
    /**
     * If scrollContainerFocus is set to true, use this to give the container an accessible name
     */
    scrollContainerAriaLabel?: string;
}

export declare interface IScrollablePaneState {
    stickyTopHeight: number;
    stickyBottomHeight: number;
    scrollbarWidth: number;
    scrollbarHeight: number;
}

/**
 * {@docCategory ScrollablePane}
 */
export declare interface IScrollablePaneStyleProps {
    /**
     * Accept theme prop.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
    scrollbarVisibility?: IScrollablePaneProps['scrollbarVisibility'];
}

/**
 * {@docCategory ScrollablePane}
 */
export declare interface IScrollablePaneStyles {
    /**
     * Style set for the root element.
     */
    root: IStyle;
    /**
     * Style set for the stickyAbove element.
     */
    stickyAbove: IStyle;
    /**
     * Style set for the stickyBelow element.
     */
    stickyBelow: IStyle;
    /**
     * Style set for the stickyBelowItems element.
     */
    stickyBelowItems: IStyle;
    /**
     * Style set for the contentContainer element.
     */
    contentContainer: IStyle;
}

export declare function isDark(color: IColor): boolean;

export { isDirectionalKeyCode }

/**
 * {@docCategory SearchBox}
 */
export declare interface ISearchBox {
    /**
     * Sets focus inside the search input box.
     */
    focus(): void;
    /**
     * Blurs focus from the search input box.
     */
    blur(): void;
    /**
     * Returns whether or not the SearchBox has focus
     */
    hasFocus(): boolean;
}

/**
 * {@docCategory SearchBox}
 */
export declare interface ISearchBoxProps extends React_2.InputHTMLAttributes<HTMLInputElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the ISearchBox interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: React_2.Ref<ISearchBox>;
    /**
     * Placeholder for the search box.
     */
    placeholder?: string;
    /**
     * @deprecated Use `placeholder` instead.
     */
    labelText?: string;
    /**
     * Callback function for when the typed input for the SearchBox has changed.
     */
    onChange?: (event?: React_2.ChangeEvent<HTMLInputElement>, newValue?: string) => void;
    /**
     * Callback executed when the user presses enter in the search box.
     */
    onSearch?: (newValue: any) => void;
    /**
     * Callback executed when the user clears the search box by either clicking 'X' or hitting escape.
     */
    onClear?: (ev?: any) => void;
    /**
     * Callback executed when the user presses escape in the search box.
     */
    onEscape?: (ev?: any) => void;
    /**
     * @deprecated Use `onChange` instead. Deprecated at v0.52.2.
     */
    onChanged?: (newValue: any) => void;
    /**
     * The value of the text in the SearchBox.
     */
    value?: string;
    /**
     * The default value of the text in the SearchBox, in the case of an uncontrolled component.
     */
    defaultValue?: string;
    /**
     * CSS class to apply to the SearchBox.
     */
    className?: string;
    /**
     * The aria label of the SearchBox for the benefit of screen readers.
     */
    ariaLabel?: string;
    /**
     * The props for the clear button.
     */
    clearButtonProps?: IButtonProps;
    /**
     * The props for the icon.
     */
    iconProps?: Pick<IIconProps, Exclude<keyof IIconProps, 'className'>>;
    /**
     * Whether or not the SearchBox is underlined.
     * @defaultvalue false
     */
    underlined?: boolean;
    /**
     * The role assigned to the root DIV element of the SearchBox, useful for defining a landmark role, such as "search".
     */
    role?: string;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ISearchBoxStyleProps, ISearchBoxStyles>;
    /**
     * Whether or not to animate the SearchBox icon on focus.
     * @defaultvalue false
     */
    disableAnimation?: boolean;
    /**
     * Whether or not to make the icon be always visible (it hides by default when the search box is focused).
     * @defaultvalue false
     */
    showIcon?: boolean;
}

/**
 * {@docCategory SearchBox}
 */
export declare interface ISearchBoxStyleProps {
    theme: ITheme;
    className?: string;
    disabled?: boolean;
    hasFocus?: boolean;
    underlined?: boolean;
    hasInput?: boolean;
    disableAnimation?: boolean;
    showIcon?: boolean;
}

/**
 * {@docCategory SearchBox}
 */
export declare interface ISearchBoxStyles {
    root?: IStyle;
    iconContainer?: IStyle;
    icon?: IStyle;
    field?: IStyle;
    clearButton?: IStyle;
}

/**
 * - `TComponent` - Component used for reference properties, such as `componentRef`.
 * - `TListenerElement` - Listener element associated with HTML event callbacks. Optional. If not provided,
 *   `TComponent` is assumed.
 * {@docCategory ISelectableDroppableTextProps}
 */
export declare interface ISelectableDroppableTextProps<TComponent, TListenerElement> extends React_2.HTMLAttributes<TListenerElement> {
    /**
     * Optional callback to access the component interface (usually `IDropdown` or `IComboBox`).
     * Use this instead of `ref` for accessing the public methods and properties of the component.
     */
    componentRef?: IRefObject<TComponent>;
    /**
     * Descriptive label for the field
     */
    label?: string;
    /**
     * Aria Label for the field for screen reader users.
     */
    ariaLabel?: string;
    /**
     * ID of the field
     */
    id?: string;
    /**
     * Additional class name for the root element.
     */
    className?: string;
    /**
     * The key(s) that will be initially used to set a selected item.
     *
     * Mutually exclusive with `selectedKey`.
     * For Dropdown (but not ComboBox) in multi-select mode, use `defaultSelectedKeys` instead.
     */
    defaultSelectedKey?: string | number | string[] | number[] | null;
    /**
     * The key(s) of the selected item. If you provide this, you must maintain selection
     * state by observing onChange events and passing a new value in when changed.
     * Note that passing in `null` will cause selection to be reset.
     *
     * Mutually exclusive with `defaultSelectedKey`.
     * For Dropdown (but not ComboBox) in multi-select mode, use `selectedKeys` instead.
     */
    selectedKey?: string | number | string[] | number[] | null;
    /**
     * Whether multi-choice selections are allowed or not.
     * @defaultvalue false
     */
    multiSelect?: boolean;
    /**
     * Collection of options for this field
     */
    options?: any;
    /**
     * Optional custom renderer for the option list container
     */
    onRenderContainer?: IRenderFunction<ISelectableDroppableTextProps<TComponent, TListenerElement>>;
    /**
     * Optional custom renderer for the option list
     */
    onRenderList?: IRenderFunction<ISelectableDroppableTextProps<TComponent, TListenerElement>>;
    /**
     * Optional custom renderer for all items, including headers and dividers as well as normal options.
     */
    onRenderItem?: IRenderFunction<ISelectableOption>;
    /**
     * Optional custom renderer for normal and header options only.
     * Use `onRenderItem` to control rendering for separators as well.
     */
    onRenderOption?: IRenderFunction<ISelectableOption>;
    /**
     * Callback for when the options list callout is dismissed
     */
    onDismiss?: () => void;
    /**
     * Whether or not the field is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the field is required.
     */
    required?: boolean;
    /**
     * Custom properties for the Callout used to render the option list.
     */
    calloutProps?: ICalloutProps;
    /**
     * Custom properties for the Panel used to render the option list on small devices.
     */
    panelProps?: IPanelProps;
    /**
     * Error message for the field.
     */
    errorMessage?: string;
    /**
     * Input placeholder text. Displayed until option is selected.
     */
    placeholder?: string;
    /**
     * Whether or not the ComboBox/Dropdown should expand on keyboard focus.
     * @defaultvalue false
     */
    openOnKeyboardFocus?: boolean;
}

export declare interface ISelectableOption<T = any> {
    /**
     * Arbitrary string associated with this option.
     */
    key: string | number;
    /**
     * ID attribute associated with this option
     */
    id?: string;
    /**
     * Text to render for this option
     */
    text: string;
    /**
     * Title attribute (built in tooltip) for a given option.
     */
    title?: string;
    /**
     * Text to render for this option
     * Note: the SelectAll itemType is only supported on one option in multiselect components
     */
    itemType?: SelectableOptionMenuItemType;
    /**
     * Index for this option
     */
    index?: number;
    /**
     * The aria label for the dropdown option. If not present, the `text` will be used.
     */
    ariaLabel?: string;
    /** If option is selected. */
    selected?: boolean;
    /**
     * Whether the option is disabled
     * @defaultvalue false
     */
    disabled?: boolean;
    /**
     * Defines whether the option is hidden or not.
     * @defaultvalue false
     */
    hidden?: boolean;
    /**
     * Data available to custom onRender functions.
     */
    data?: T;
}

export declare interface ISelectedItemProps<T> extends IPickerItemProps<T> {
    onCopyItem: (item: T) => void;
}

/**
 * {@docCategory SelectedPeopleList}
 */
export declare interface ISelectedPeopleItemProps extends ISelectedItemProps<IExtendedPersonaProps> {
    onExpandItem?: () => void;
    renderPersonaCoin?: IRenderFunction<IPersonaProps>;
    renderPrimaryText?: IRenderFunction<IPersonaProps>;
}

/**
 * {@docCategory SelectedPeopleList}
 */
export declare interface ISelectedPeopleProps extends IBaseSelectedItemsListProps<IExtendedPersonaProps> {
    onExpandGroup?: (item: IExtendedPersonaProps) => void;
    removeMenuItemText?: string;
    copyMenuItemText?: string;
    editMenuItemText?: string;
    getEditingItemText?: (item: IExtendedPersonaProps) => string;
    onRenderFloatingPicker?: React_2.ComponentType<IBaseFloatingPickerProps<IPersonaProps>>;
    floatingPickerProps?: IBaseFloatingPickerProps<IPersonaProps>;
}

export { ISelection }

export { ISelectionOptions }

export { ISelectionOptionsWithRequiredGetKey }

/**
 * {@docCategory Selection}
 */
export declare interface ISelectionZone {
    /**
     * Method to ignore subsequent focus.
     */
    ignoreNextFocus: () => void;
}

/**
 * {@docCategory Selection}
 */
export declare interface ISelectionZoneProps extends React_2.ClassAttributes<SelectionZone> {
    children?: React_2.ReactNode;
    /**
     * Reference to the component interface.
     */
    componentRef?: () => void;
    /**
     * Required {@link ISelection} instance bound to the {@link SelectionZone}.
     */
    selection: ISelection;
    /**
     * @deprecated No longer in use, focus is now managed by {@link FocusZone}.
     */
    layout?: {};
    /**
     * The mode of Selection, where the value is one of
     * 'none', 'single', or 'multiple'.
     *
     * @defaultvalue {@link SelectionMode.multiple}
     */
    selectionMode?: SelectionMode_2;
    /**
     * If true, selection is preserved on outer click.
     */
    selectionPreservedOnEmptyClick?: boolean;
    /**
     * If true, disables automatic selection on input elements.
     */
    disableAutoSelectOnInputElements?: boolean;
    /**
     * If true, modal selection is enabled on touch event.
     */
    enterModalOnTouch?: boolean;
    /**
     * Determines whether elements with the attribute `data-selection-touch-invoke` should be used as invocation targets
     * for an item if the user is using touch.
     *
     * @defaultvalue false
     */
    enableTouchInvocationTarget?: boolean;
    /**
     * Determines if an item is selected on focus.
     *
     * @defaultvalue true
     */
    isSelectedOnFocus?: boolean;
    /**
     * Determines if elements within the selection zone that DO NOT have the 'data-selection-toggle' or
     * 'data-selection-all-toggle' attribute are clickable and can alter the selection.
     *
     * @defaultvalue true
     */
    selectionClearedOnSurfaceClick?: boolean;
    /**
     * Determines if pressing the Escape clears the selection.
     *
     * @defaultvalue true
     */
    selectionClearedOnEscapePress?: boolean;
    /**
     * Allows the default toggle behavior to be overridden.
     * When set to `true` users do not have press a modifier key (e.g., ctrl or meta)
     * to toggle values.
     *
     * @default false
     */
    toggleWithoutModifierPressed?: boolean;
    /**
     * Optional callback for when an item is
     * invoked via ENTER or double-click.
     */
    onItemInvoked?: (item?: IObjectWithKey, index?: number, ev?: Event) => void;
    /**
     * Optional callback for when an
     * item's contextual menu action occurs.
     */
    onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;
    /**
     * Additional CSS class(es) to apply to the SelectionZone.
     */
    className?: string;
}

/**
 * {@docCategory Selection}
 */
export declare interface ISelectionZoneState {
    isModal: boolean | undefined;
}

export { isElementFocusSubZone }

export { isElementFocusZone }

export { isElementTabbable }

export { isElementVisible }

export { isElementVisibleAndNotHidden }

export { ISemanticColors }

export { ISemanticTextColors }

/**
 * {@docCategory Separator}
 */
export declare interface ISeparator {
}

/**
 * {@docCategory Separator}
 */
export declare interface ISeparatorProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Theme (provided through customization.)
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ISeparatorStyleProps, ISeparatorStyles>;
    /**
     * Whether the element is a vertical separator.
     */
    vertical?: boolean;
    /**
     * Where the content should be aligned in the separator.
     * @defaultValue 'center'
     */
    alignContent?: 'start' | 'center' | 'end';
}

/**
 * {@docCategory Separator}
 */
export declare type ISeparatorStyleProps = Required<Pick<ISeparatorProps, 'theme'>> & Pick<ISeparatorProps, 'className' | 'alignContent' | 'vertical'>;

/**
 * {@docCategory Separator}
 */
export declare interface ISeparatorStyles {
    /**
     * Style for the root element
     */
    root: IStyle;
    /**
     * Style for the content
     */
    content: IStyle;
}

export { ISerializableObject }

export { ISettings }

export { ISettingsFunction }

export { ISettingsMap }

export { IsFocusVisibleClassName }

/**
 * {@docCategory Shimmer}
 */
export declare interface IShimmerCircle {
}

/**
 * ShimmerCircle component props.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerCircleProps extends React_2.AllHTMLAttributes<HTMLElement> {
    /**
     * Optional callback to access the IShimmerCircle interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IShimmerCircle>;
    /**
     * Sets the height of the circle.
     * @defaultvalue 24px
     */
    height?: number;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IShimmerCircleStyleProps, IShimmerCircleStyles>;
    /**
     * Use to set custom styling of the shimmerCircle borders.
     * @deprecated Use `styles.root` instead.
     */
    borderStyle?: IRawStyle;
}

/**
 * Props needed to construct styles.
 * {@docCategory Shimmer}
 */
export declare type IShimmerCircleStyleProps = {
    /**
     * Theme values passed to the component.
     */
    theme: ITheme;
    /**
     * Needed to provide a height to the root of the control.
     */
    height?: number;
    /**
     * Styles to override borderStyles with custom ones.
     * @deprecated Deprecated in favor of mergeStyles API.
     */
    borderStyle?: IRawStyle;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerCircleStyles {
    /**
     * Root of the ShimmerCircle component.
     */
    root?: IStyle;
    /**
     * Style for the circle SVG of the ShimmerCircle component.
     */
    svg?: IStyle;
}

/**
 * Interface describing the possible color customizations of Shimmer.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerColors {
    /**
     * Defines the main background color which is the color you see when the wave is not animating.
     * @defaultvalue theme.palette.neutralLight
     */
    shimmer?: string;
    /**
     * Defines the tip color of the shimmer wave which gradually gets from and to `shimmer` color.
     * @defaultvalue theme.palette.neutralLighter
     */
    shimmerWave?: string;
    /**
     * Defines the background color of the space in between and around shimmer elements (borders, gaps and
     * rounded corners).
     * @defaultvalue theme.palette.white
     */
    background?: string;
}

/**
 * ShimmeredDetailsList props interface
 * {@docCategory DetailsList}
 */
export declare interface IShimmeredDetailsListProps extends Omit<IDetailsListProps, 'styles'> {
    /**
     * DetailsList styles to pass through.
     */
    detailsListStyles?: IDetailsListProps['styles'];
    /**
     * Boolean flag to control when to render placeholders vs real items.
     * It's up to the consumer app to know when fetching of the data is done to toggle this prop.
     */
    enableShimmer?: boolean;
    /**
     * Aria label for shimmer. Set on grid while shimmer is enabled.
     */
    ariaLabelForShimmer?: string;
    /**
     * Determines whether to remove a fading out to bottom overlay over the shimmering items
     * used to further emphasize the unknown number of items that will be fetched.
     */
    removeFadingOverlay?: boolean;
    /**
     * Custom placeholder renderer to be used when in need to override the default placeholder of a DetailsRow.
     * `rowProps` argument is passed to leverage the calculated column measurements done by DetailsList
     * or you can use the optional arguments of item `index` and `defaultRender` to execute additional
     * logic before rendering the default placeholder.
     */
    onRenderCustomPlaceholder?: (rowProps: IDetailsRowProps, index?: number, defaultRender?: (props: IDetailsRowProps) => React_2.ReactNode) => React_2.ReactNode;
    /**
     * Custom styles to override the styles specific to the ShimmeredDetailsList root area.
     * @deprecated Use `styles` prop instead. Any value provided will be ignored.
     */
    shimmerOverlayStyles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;
    /**
     * Custom styles to override the styles specific to the ShimmeredDetailsList root area.
     */
    styles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;
    /**
     * Number of shimmer placeholder lines to render.
     * @defaultvalue 10
     */
    shimmerLines?: number;
}

/**
 * Defines props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory DetailsList}
 */
export declare type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>>;

/**
 * Represents the stylable areas of the control.
 * {@docCategory DetailsList}
 */
export declare interface IShimmeredDetailsListStyles {
    /**
     * Represents styles passed to the `List` component for creating a fade-out to the bottom overlay.
     */
    root: IStyle;
}

/**
 * Shimmer Elements Interface representing all common properties between Gap, Circle and Line.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerElement {
    /**
     * Represents the possible type of the shimmer elements: Gap, Circle, Line.
     * Required for every element you intend to use.
     */
    type: ShimmerElementType;
    /**
     * Sets the height of the element (ICircle, ILine, IGap) in pixels.
     * Read more details for each specific element.
     */
    height?: number;
    /**
     * Sets the width value of the element (ILine, IGap) in pixels.
     * Read more details for each specific element.
     */
    width?: number | string;
    /**
     * Sets vertical alignment of the element (ICircle, ILine).
     * @defaultvalue center
     */
    verticalAlign?: 'top' | 'center' | 'bottom';
}

/**
 * {@docCategory Shimmer}
 */
export declare interface IShimmerElementsGroup {
}

/**
 * ShimmerElementsGroup component props.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerElementsGroupProps extends React_2.AllHTMLAttributes<HTMLElement> {
    /**
     * Optional callback to access the IShimmerElementsGroup interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IShimmerElementsGroup>;
    /**
     * Optional maximum row height of the shimmerElements container.
     */
    rowHeight?: number;
    /**
     * Elements to render in one group of the Shimmer.
     */
    shimmerElements?: IShimmerElement[];
    /**
     * Optional boolean for enabling flexWrap of the container containing the shimmerElements.
     * @defaultvalue false
     */
    flexWrap?: boolean;
    /**
     * Optional width for ShimmerElements container.
     */
    width?: string;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Defines the background color of the space in between and around shimmer elements.
     * @defaultvalue theme.palette.white
     */
    backgroundColor?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IShimmerElementsGroupStyleProps, IShimmerElementsGroupStyles>;
}

/**
 * Props needed to construct styles.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerElementsGroupStyleProps {
    /**
     * Boolean flag to notify whether the root element needs to flex wrap.
     */
    flexWrap?: boolean;
    /** Theme provided by High-Order Component. */
    theme: ITheme;
}

/**
 * Represents the stylable areas of the control.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerElementsGroupStyles {
    /**
     * Represents the wrapper root element holding all elements inside.
     */
    root?: IStyle;
}

/**
 * {@docCategory Shimmer}
 */
export declare interface IShimmerGap {
}

/**
 * ShimmerGap component props.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerGapProps extends React_2.AllHTMLAttributes<HTMLElement> {
    /**
     * Optional callback to access the IShimmerGap interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IShimmerGap>;
    /**
     * Sets the height of the gap.
     * @defaultvalue 16px
     */
    height?: number;
    /**
     * Sets width value of the gap.
     * @defaultvalue 10px
     */
    width?: number | string;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IShimmerGapStyleProps, IShimmerGapStyles>;
    /**
     * Use to set custom styling of the shimmerGap borders.
     * @deprecated Use `styles.root` instead.
     */
    borderStyle?: IRawStyle;
}

/**
 * Props needed to construct styles.
 * {@docCategory Shimmer}
 */
export declare type IShimmerGapStyleProps = {
    /**
     * Theme values passed to the component.
     */
    theme: ITheme;
    /**
     * Needed to provide a height to the root of the control.
     */
    height?: number;
    /**
     * Styles to override borderStyles with custom ones.
     * @deprecated Use `styles.root` instead.
     */
    borderStyle?: IRawStyle;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerGapStyles {
    /**
     * Root of the ShimmerGap component.
     */
    root?: IStyle;
}

/**
 * {@docCategory Shimmer}
 */
export declare interface IShimmerLine {
}

/**
 * ShimmerLine component props.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerLineProps extends React_2.AllHTMLAttributes<HTMLElement> {
    /**
     * Optional callback to access the IShimmerLine interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IShimmerLine>;
    /**
     * Sets the height of the rectangle.
     * @defaultvalue 16px
     */
    height?: number;
    /**
     * Sets width value of the line.
     * @defaultvalue 100%
     */
    width?: number | string;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IShimmerLineStyleProps, IShimmerLineStyles>;
    /**
     * Use to set custom styling of the shimmerLine borders.
     * @deprecated Use `styles.root` instead.
     */
    borderStyle?: IRawStyle;
}

/**
 * Props needed to construct styles.
 * {@docCategory Shimmer}
 */
export declare type IShimmerLineStyleProps = {
    /**
     * Theme values passed to the component.
     */
    theme: ITheme;
    /**
     * Needed to provide a height to the root of the control.
     */
    height?: number;
    /**
     * Styles to override borderStyles with custom ones.
     * @deprecated Use `styles.root` instead.
     */
    borderStyle?: IRawStyle;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerLineStyles {
    /**
     * Root of the ShimmerLine component.
     */
    root?: IStyle;
    /**
     * Top-left corner SVG of the ShimmerLine component.
     */
    topLeftCorner?: IStyle;
    /**
     * Top-right corner SVG of the ShimmerLine component.
     */
    topRightCorner?: IStyle;
    /**
     * Bottom-right corner SVG of the ShimmerLine component.
     */
    bottomRightCorner?: IStyle;
    /**
     * Bottom-left corner SVG of the ShimmerLine component.
     */
    bottomLeftCorner?: IStyle;
}

/**
 * Shimmer component props.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerProps extends React_2.AllHTMLAttributes<HTMLElement>, React_2.RefAttributes<HTMLElement> {
    /**
     * Sets the width value of the shimmer wave wrapper.
     * @defaultvalue 100%
     */
    width?: number | string;
    /**
     * Controls when the shimmer is swapped with actual data through an animated transition.
     * @defaultvalue false
     */
    isDataLoaded?: boolean;
    /**
     * Elements to render in one line of the Shimmer.
     */
    shimmerElements?: IShimmerElement[];
    /**
     * Custom elements when necessary to build complex placeholder skeletons.
     */
    customElementsGroup?: React_2.ReactNode;
    /**
     * Localized string of the status label for screen reader
     */
    ariaLabel?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<IShimmerStyleProps, IShimmerStyles>;
    /**
     * Additional CSS class(es) to apply to the Shimmer container.
     */
    className?: string;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Defines an object with possible colors to pass for Shimmer customization used on different backgrounds.
     */
    shimmerColors?: IShimmerColors;
    /**
     * Only use if `customElementsGroup` has a single parent `div`. If a custom element is not provided, defaults to true.
     */
    improveCSSPerformance?: boolean;
}

/**
 * Defines props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerStyleProps {
    /** Boolean flag to trigger fadeIn/fadeOut transition animation when content is loaded. */
    isDataLoaded?: boolean;
    /** Optional CSS class name for the component attached to the root stylable area. */
    className?: string;
    /** Theme provided by High-Order Component. */
    theme: ITheme;
    /** Interval in milliseconds for the adeIn/fadeOut transition animation. */
    transitionAnimationInterval?: number;
    /** Color to be used as the main background color of Shimmer when not animating. */
    shimmerColor?: string;
    /** Tip color of the shimmer wave which gradually gets from and to `shimmerColor`. */
    shimmerWaveColor?: string;
    /** Boolean flag to apply a more efficient CSS selector */
    improveCSSPerformance?: boolean;
}

/**
 * Represents the stylable areas of the control.
 * {@docCategory Shimmer}
 */
export declare interface IShimmerStyles {
    /** Refers to the root wrapper element. */
    root?: IStyle;
    /** Refers to wrapper element of the shimmer only. */
    shimmerWrapper?: IStyle;
    /** Refers to gradient element of the shimmer animation only. */
    shimmerGradient?: IStyle;
    /** Refers to wrapper element of the children only. */
    dataWrapper?: IStyle;
    /** Styles for the hidden helper element to aid with screen readers. */
    screenReaderText?: IStyle;
}

export { isIE11 }

export { isInDateRangeArray }

export { isIOS }

export { ISize }

/**
 * {@docCategory Slider}
 */
export declare interface ISlider {
    value: number | undefined;
    focus: () => void;
    range?: [number, number];
}

/**
 * {@docCategory Slider}
 */
export declare interface ISliderProps extends Omit<React_2.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional callback to access the ISlider interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ISlider>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ISliderStyleProps, ISliderStyles>;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Description label of the Slider
     */
    label?: string;
    /**
     * The initial value of the Slider. Use this if you intend for the Slider to be an uncontrolled component.
     * This value is mutually exclusive to value. Use one or the other.
     */
    defaultValue?: number;
    /**
     * The initial value of the Slider. Use this if you intend to pass in a new value as a result of onChange events.
     * This value is mutually exclusive to defaultValue. Use one or the other.
     */
    value?: number;
    /**
     * The initial lower value of the Slider is ranged is true. Use this if you intend for the Slider to be an
     * uncontrolled component. This value is mutually exclusive to lowerValue. Use one or the other.
     */
    defaultLowerValue?: number;
    /**
     * The initial lower value of the Slider is ranged is true. Use this if you intend to pass in a new value as a
     * result of onChange events. This value is mutually exclusive to defaultLowerValue. Use one or the other.
     */
    lowerValue?: number;
    /**
     * The min value of the Slider
     * @defaultvalue 0
     */
    min?: number;
    /**
     * The max value of the Slider
     * @defaultvalue 10
     */
    max?: number;
    /**
     * The difference between the two adjacent values of the Slider
     * @defaultvalue 1
     */
    step?: number;
    /**
     * Whether to show the value on the right of the Slider.
     * @defaultvalue true
     */
    showValue?: boolean;
    /**
     * Callback when the value has been changed. This will be called on every individual step;
     * to only be notified after changes have stopped, use `onChanged` instead.
     * If `ranged` is true, `value` is the upper value, and `range` contains the lower and upper bounds of the range.
     */
    onChange?: (value: number, range?: [number, number], event?: React_2.MouseEvent | React_2.TouchEvent | MouseEvent | TouchEvent | React_2.KeyboardEvent) => void;
    /**
     * Callback on mouse up, touch end, or after key presses have stopped.
     * To be notified on every individual step, use `onChange` instead.
     * @param event - Type is `React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent | React.KeyboardEvent`
     * (may be corrected in a future major version)
     */
    onChanged?: (event: any, value: number, range?: [number, number]) => void;
    /**
     * A description of the Slider for the benefit of screen readers.
     */
    ariaLabel?: string;
    /**
     * If `ranged` is true, display two thumbs that allow the lower and upper bounds of a range to be selected.
     * The lower bound is defined by `lowerValue`, and the upper bound is defined by `value`.
     */
    ranged?: boolean;
    /**
     * A text description of the Slider number value for the benefit of screen readers.
     * This should be used when the Slider number value is not accurately represented by a number.
     */
    ariaValueText?: (value: number) => string;
    /**
     * Whether to render the slider vertically.
     * @default `false` (render horizontally)
     */
    vertical?: boolean;
    /**
     * Whether to render the Slider as disabled.
     * @defaultvalue false
     */
    disabled?: boolean;
    /**
     * Whether to decide that thumb will snap to closest value while moving the slider
     * @defaultvalue false
     */
    snapToStep?: boolean;
    /**
     * Class name to attach to the slider root element.
     */
    className?: string;
    /**
     * Additional props for the actual `role="slider"` (slider box) element.
     * (Note that this element is not actually a button in the current implementation.)
     */
    buttonProps?: React_2.HTMLAttributes<HTMLButtonElement>;
    /**
     * Custom formatter for the slider value.
     */
    valueFormat?: (value: number) => string;
    /**
     * Whether to attach the origin of slider to zero. Helpful when the range include negatives.
     * @defaultvalue false
     */
    originFromZero?: boolean;
}

/**
 * {@docCategory Slider}
 */
export declare type ISliderStyleProps = Required<Pick<ISliderProps, 'theme'>> & Pick<ISliderProps, 'className' | 'disabled' | 'vertical' | 'ranged'> & {
    showTransitions?: boolean;
    showValue?: boolean;
    titleLabelClassName?: string;
};

/**
 * {@docCategory Slider}
 */
export declare interface ISliderStyles {
    /**
     * Style set for the root element.
     */
    root: IStyle;
    /**
     * Style set for the title label above the slider.
     */
    titleLabel: IStyle;
    /**
     * Style set for the container of the slider.
     */
    container: IStyle;
    /**
     * Style set for the actual box containting interactive elements of the slider.
     */
    slideBox: IStyle;
    /**
     * Style set for element that contains all the lines.
     */
    line: IStyle;
    /**
     * Style set for thumb of the slider.
     */
    thumb: IStyle;
    /**
     * Style set for both active and inactive sections of the line.
     */
    lineContainer: IStyle;
    /**
     * Style set for active portion of the line.
     */
    activeSection: IStyle;
    /**
     * Style set for inactive portion of the line.
     */
    inactiveSection: IStyle;
    /**
     * Style set for value label on right/below of the slider.
     */
    valueLabel: IStyle;
    /**
     * Style set for tick on 0 on number line. This element only shows up when originFromZero prop is true.
     */
    zeroTick: IStyle;
}

export { isMac }

export { ISpacing }

/**
 * {@docCategory SpinButton}
 */
export declare interface ISpinButton {
    /**
     * Current committed/validated value of the control. Note that this does *not* update on every
     * keystroke while the user is editing text in the input field.
     * "committed" the edit yet by focusing away (blurring) or pressing enter,
     */
    value?: string;
    /**
     * Sets focus to the control.
     */
    focus: () => void;
}

/**
 * {@docCategory SpinButton}
 */
export declare interface ISpinButtonProps extends React_2.HTMLAttributes<HTMLDivElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<ISpinButton>;
    /**
     * Initial value of the control (assumed to be valid). Updates to this prop will not be respected.
     *
     * Use this if you intend for the SpinButton to be an uncontrolled component which maintains its
     * own value. For a controlled component, use `value` instead. (Mutually exclusive with `value`.)
     * @defaultvalue 0
     */
    defaultValue?: string;
    /**
     * Current value of the control (assumed to be valid).
     *
     * Only provide this if the SpinButton is a controlled component where you are maintaining its
     * current state and passing updates based on change events; otherwise, use the `defaultValue`
     * property. (Mutually exclusive with `defaultValue`.)
     */
    value?: string;
    /**
     * Min value of the control. If not provided, the control has no minimum value.
     */
    min?: number;
    /**
     * Max value of the control. If not provided, the control has no maximum value.
     */
    max?: number;
    /**
     * Difference between two adjacent values of the control.
     * This value is used to calculate the precision of the input if no `precision` is given.
     * The precision calculated this way will always be \>= 0.
     * @defaultvalue 1
     */
    step?: number;
    /**
     * A description of the control for the benefit of screen reader users.
     */
    ariaLabel?: string;
    /**
     * ID of a label which describes the control, if not using the default label.
     */
    ariaDescribedBy?: string;
    /**
     * A more descriptive title for the control, visible on its tooltip.
     */
    title?: string;
    /**
     * Whether or not the control is disabled.
     */
    disabled?: boolean;
    /**
     * Custom className for the control.
     */
    className?: string;
    /**
     * Descriptive label for the control.
     */
    label?: string;
    /**
     * Where to position the control's label.
     * @defaultvalue Left
     */
    labelPosition?: Position;
    /**
     * Props for an icon to display alongside the control's label.
     */
    iconProps?: IIconProps;
    /**
     * Callback for when the committed/validated value changes. This is called *after* `onIncrement`,
     * `onDecrement`, or `onValidate`, on the following events:
     * - User presses the up/down buttons (on single press or every spin)
     * - User presses the up/down arrow keys (on single press or every spin)
     * - User *commits* edits to the input text by focusing away (blurring) or pressing enter.
     *   Note that this is NOT called for every key press while the user is editing.
     */
    onChange?: (event: React_2.SyntheticEvent<HTMLElement>, newValue?: string) => void;
    /**
     * Callback for when the entered value should be validated.
     * @param value - The entered value to validate
     * @param event - The event that triggered this validate, if any (for accessibility)
     * @returns If a string is returned, it will be used as the new value
     */
    onValidate?: (value: string, event?: React_2.SyntheticEvent<HTMLElement>) => string | void;
    /**
     * Callback for when the increment button or up arrow key is pressed.
     * @param value - The current value to be incremented
     * @param event - The event that triggered this increment
     * @returns If a string is returned, it will be used as the new value
     */
    onIncrement?: (value: string, event?: React_2.MouseEvent<HTMLElement> | React_2.KeyboardEvent<HTMLElement>) => string | void;
    /**
     * Callback for when the decrement button or down arrow key is pressed.
     * @param value - The current value to be decremented
     * @param event - The event that triggered this decrement
     * @returns If a string is returned, it will be used as the new value
     */
    onDecrement?: (value: string, event?: React_2.MouseEvent<HTMLElement> | React_2.KeyboardEvent<HTMLElement>) => string | void;
    /**
     * Callback for when the user focuses the control.
     */
    onFocus?: React_2.FocusEventHandler<HTMLInputElement>;
    /**
     * Callback for when the control loses focus.
     */
    onBlur?: React_2.FocusEventHandler<HTMLInputElement>;
    /**
     * Custom props for the increment button.
     */
    incrementButtonIcon?: IIconProps;
    /**
     * Custom props for the decrement button.
     */
    decrementButtonIcon?: IIconProps;
    /**
     * Custom styling for individual elements within the control.
     */
    styles?: IStyleFunctionOrObject<ISpinButtonStyleProps, ISpinButtonStyles>;
    /**
     * Custom styles for the up arrow button.
     *
     * Note: The buttons are in a checked state when arrow keys are used to increment/decrement
     * the SpinButton. Use `rootChecked` instead of `rootPressed` for styling when that is the case.
     */
    upArrowButtonStyles?: Partial<IButtonStyles>;
    /**
     * Custom styles for the down arrow button.
     *
     * Note: The buttons are in a checked state when arrow keys are used to increment/decrement
     * the SpinButton. Use `rootChecked` instead of `rootPressed` for styling when that is the case.
     */
    downArrowButtonStyles?: Partial<IButtonStyles>;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Accessible label text for the increment button (for screen reader users).
     */
    incrementButtonAriaLabel?: string;
    /**
     * Accessible label text for the decrement button (for screen reader users).
     */
    decrementButtonAriaLabel?: string;
    /**
     * How many decimal places the value should be rounded to.
     *
     * The default is calculated based on the precision of `step`: i.e. if step = 1, precision = 0.
     * step = 0.0089, precision = 4. step = 300, precision = 2. step = 23.00, precision = 2.
     */
    precision?: number;
    /**
     * The position in the parent set (if in a set).
     */
    ariaPositionInSet?: number;
    /**
     * The total size of the parent set (if in a set).
     */
    ariaSetSize?: number;
    /**
     * Sets the control's aria-valuenow. This is the numeric form of `value`.
     * Providing this only makes sense when using as a controlled component.
     */
    ariaValueNow?: number;
    ariaValueText?: string;
    /**
     * Keytip for the control.
     */
    keytipProps?: IKeytipProps;
    /**
     * Additional props for the input field.
     */
    inputProps?: React_2.InputHTMLAttributes<HTMLElement | HTMLInputElement>;
    /**
     * Additional props for the up and down arrow buttons.
     */
    iconButtonProps?: IButtonProps;
}

/**
 * {@docCategory SpinButton}
 */
export declare interface ISpinButtonStyleProps {
    theme: ITheme;
    className: string | undefined;
    disabled: boolean;
    isFocused: boolean;
    keyboardSpinDirection: KeyboardSpinDirection;
    labelPosition: Position;
}

/**
 * {@docCategory SpinButton}
 */
export declare interface ISpinButtonStyles {
    /**
     * Styles for the root of the component.
     */
    root: IStyle;
    /**
     * Style for the label wrapper element, which contains the icon and label.
     */
    labelWrapper: IStyle;
    /**
     * Style for the icon.
     */
    icon: IStyle;
    /**
     * Style for the label text.
     */
    label: IStyle;
    /**
     * Style for the wrapper element of the input field and arrow buttons.
     */
    spinButtonWrapper: IStyle;
    /**
     * Styles for the input.
     */
    input: IStyle;
    /**
     * Styles for the arrowButtonsContainer
     */
    arrowButtonsContainer: IStyle;
}

/**
 * {@docCategory Spinner}
 */
export declare interface ISpinner {
}

/**
 * Spinner component props.
 * {@docCategory Spinner}
 */
export declare interface ISpinnerProps extends React_2.HTMLAttributes<HTMLElement> {
    /**
     * Optional callback to access the ISpinner interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ISpinner>;
    /**
     * @deprecated Use `size` instead. Will be removed at \>= 2.0.0.
     */
    type?: SpinnerType;
    /**
     * The size of Spinner to render.
     * @defaultvalue SpinnerType.medium
     */
    size?: SpinnerSize;
    /**
     * The label to show next to the Spinner. Label updates will be announced to the screen readers.
     * Use ariaLive to control politeness level.
     */
    label?: string;
    /**
     * Additional CSS class(es) to apply to the Spinner.
     */
    className?: string;
    /**
     * Politeness setting for label update announcement.
     * @defaultvalue polite
     */
    ariaLive?: 'assertive' | 'polite' | 'off';
    /**
     * Alternative status label for screen reader
     */
    ariaLabel?: string;
    /**
     * Theme (provided through customization.)
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles>;
    /**
     * The position of the label in regards of the spinner animation.
     * @defaultvalue SpinnerLabelPosition.bottom
     */
    labelPosition?: SpinnerLabelPosition;
}

/**
 * The props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory Spinner}
 */
export declare interface ISpinnerStyleProps {
    /** Theme provided by High-Order Component. */
    theme: ITheme;
    /** Size of the spinner animation. */
    size?: SpinnerSize;
    /** CSS class name for the component attached to the root stylable area. */
    className?: string;
    /** Position of the label in regards to the spinner animation. */
    labelPosition?: SpinnerLabelPosition;
}

/**
 * Represents the stylable areas of the control.
 * {@docCategory Spinner}
 */
export declare interface ISpinnerStyles {
    /** Styles for the root element. Refers to the wrapper containing both the circle and the label. */
    root?: IStyle;
    /** Styles for the spinner circle animation. */
    circle?: IStyle;
    /** Styles for the label accompanying the circle. */
    label?: IStyle;
    /** Styles for the hidden helper element to aid with screen readers. */
    screenReaderText?: IStyle;
}

export declare interface ISplitButtonClassNames {
    root?: string;
    icon?: string;
    splitButtonContainer?: string;
    flexContainer?: string;
    divider?: string;
}

export declare function isRelativeUrl(url: string): boolean;

/**
 * {@docCategory Stack}
 */
export declare type IStackComponent = IComponent<IStackProps, IStackTokens, IStackStyles>;

/**
 * {@docCategory Stack}
 */
export declare type IStackItemComponent = IComponent<IStackItemProps, IStackItemTokens, IStackItemStyles>;

/**
 * {@docCategory Stack}
 */
export declare interface IStackItemProps extends IStackItemSlots, IStyleableComponentProps<IStackItemProps, IStackItemTokens, IStackItemStyles>, React_2.HTMLAttributes<HTMLElement> {
    children?: React_2.ReactNode;
    /**
     * Defines a CSS class name used to style the StackItem.
     */
    className?: string;
    /**
     * Defines how much to grow the StackItem in proportion to its siblings.
     */
    grow?: boolean | number | 'inherit' | 'initial' | 'unset';
    /**
     * Defines at what ratio should the StackItem shrink to fit the available space.
     */
    shrink?: boolean | number | 'inherit' | 'initial' | 'unset';
    /**
     * Defines whether the StackItem should be prevented from shrinking.
     * This can be used to prevent a StackItem from shrinking when it is inside of a Stack that has shrinking items.
     * @defaultvalue false
     */
    disableShrink?: boolean;
    /**
     * Defines how to align the StackItem along the x-axis (for vertical Stacks) or the y-axis (for horizontal Stacks).
     */
    align?: 'auto' | 'stretch' | 'baseline' | 'start' | 'center' | 'end';
    /**
     * Defines whether the StackItem should take up 100% of the height of its parent.
     * @defaultvalue true
     */
    verticalFill?: boolean;
    /**
     * Defines the initial main size of the StackItem, setting the size of the content box unless otherwise set with
     * box-sizing.
     * @defaultvalue auto
     */
    basis?: React_2.CSSProperties['flexBasis'];
    /**
     * Defines order of the StackItem.
     * @defaultvalue 0
     */
    order?: number | string;
}

/**
 * {@docCategory Stack}
 */
export declare type IStackItemSlot = ISlotProp<IStackItemProps>;

/**
 * {@docCategory Stack}
 */
export declare interface IStackItemSlots {
    root?: IHTMLSlot;
}

/**
 * {@docCategory Stack}
 */
export declare type IStackItemStyles = IComponentStyles<IStackItemSlots>;

/**
 * {@docCategory Stack}
 */
export declare type IStackItemStylesReturnType = ReturnType<Extract<IStackItemComponent['styles'], Function>>;

/**
 * {@docCategory Stack}
 */
export declare type IStackItemTokenReturnType = ReturnType<Extract<IStackItemComponent['tokens'], Function>>;

/**
 * {@docCategory Stack}
 */
export declare interface IStackItemTokens {
    /**
     * Defines the margin to be applied to the StackItem relative to its container.
     */
    margin?: number | string;
    /**
     * Defines the padding to be applied to the StackItem contents relative to its border.
     */
    padding?: number | string;
}

/**
 * {@docCategory Stack}
 */
export declare interface IStackProps extends ISlottableProps<IStackSlots>, IStyleableComponentProps<IStackProps, IStackTokens, IStackStyles>, React_2.HTMLAttributes<HTMLElement> {
    /**
     * Defines how to render the Stack.
     */
    as?: React_2.ElementType<React_2.HTMLAttributes<HTMLElement>>;
    /**
     * Defines whether to render Stack children horizontally.
     * @defaultvalue false
     */
    horizontal?: boolean;
    /**
     * Defines whether to render Stack children in the opposite direction (bottom-to-top if it's a vertical Stack and
     * right-to-left if it's a horizontal Stack).
     * @defaultvalue false
     */
    reversed?: boolean;
    /**
     * Defines how to align Stack children horizontally (along the x-axis).
     */
    horizontalAlign?: Alignment;
    /**
     * Defines how to align Stack children vertically (along the y-axis).
     */
    verticalAlign?: Alignment;
    /**
     * Defines whether the Stack should take up 100% of the height of its parent.
     * This property is required to be set to true when using the `grow` flag on children in vertical oriented Stacks.
     * Stacks are rendered as block elements and grow horizontally to the container already.
     * @defaultvalue false
     */
    verticalFill?: boolean;
    /**
     * Defines whether Stack children should not shrink to fit the available space.
     * @defaultvalue false
     */
    disableShrink?: boolean;
    /**
     * Defines how much to grow the Stack in proportion to its siblings.
     */
    grow?: boolean | number | 'inherit' | 'initial' | 'unset';
    /**
     * Defines the spacing between Stack children.
     * The property is specified as a value for 'row gap', followed optionally by a value for 'column gap'.
     * If 'column gap' is omitted, it's set to the same value as 'row gap'.
     * @deprecated Use `tokens.childrenGap` instead.
     */
    gap?: number | string;
    /**
     * Defines the maximum width that the Stack can take.
     * @deprecated Use `tokens.maxWidth` instead.
     */
    maxWidth?: number | string;
    /**
     * Defines the maximum height that the Stack can take.
     * @deprecated Use `tokens.maxHeight` instead.
     */
    maxHeight?: number | string;
    /**
     * Defines the inner padding of the Stack.
     * @deprecated Use `tokens.padding` instead.
     */
    padding?: number | string;
    /**
     * Defines whether Stack children should wrap onto multiple rows or columns when they are about to overflow
     * the size of the Stack.
     * @defaultvalue false
     */
    wrap?: boolean;
    /**
     * Defines if scoped style selectors are enabled for the Stack component, which greatly helps in style recalculation
     * performance, but requires children of the Stack to be able to accept a className prop (excluding Fragments).
     * @defaultvalue false
     */
    enableScopedSelectors?: boolean;
}

/**
 * {@docCategory Stack}
 */
export declare type IStackSlot = ISlotProp<IStackProps>;

/**
 * {@docCategory Stack}
 */
export declare interface IStackSlots {
    /**
     * Defines root slot of the component.
     */
    root?: IHTMLSlot;
    /**
     * Defines a slot that is placed inside the root slot in order to achieve wrapping. Only used when the wrap
     * property is set to true.
     */
    inner?: IHTMLSlot;
}

/**
 * {@docCategory Stack}
 */
export declare type IStackStyles = IComponentStyles<IStackSlots>;

/**
 * {@docCategory Stack}
 */
export declare type IStackStylesReturnType = ReturnType<Extract<IStackComponent['styles'], Function>>;

/**
 * {@docCategory Stack}
 */
export declare type IStackTokenReturnType = ReturnType<Extract<IStackComponent['tokens'], Function>>;

/**
 * {@docCategory Stack}
 */
export declare interface IStackTokens {
    /**
     * Defines the spacing between Stack children.
     * The property is specified as a value for 'row gap', followed optionally by a value for 'column gap'.
     * If 'column gap' is omitted, it's set to the same value as 'row gap'.
     */
    childrenGap?: number | string;
    /**
     * Defines a maximum height for the Stack.
     */
    maxHeight?: number | string;
    /**
     * Defines a maximum width for the Stack.
     */
    maxWidth?: number | string;
    /**
     * Defines the padding to be applied to the Stack contents relative to its border.
     */
    padding?: number | string;
}

export declare interface IStickyProps extends IReactProps<Sticky> {
    /**
     * Gets ref to component interface.
     */
    componentRef?: IRefObject<IStickyProps>;
    /**
     * Class name to apply to the sticky element if component is sticky.
     */
    stickyClassName?: string;
    /**
     * color to apply as 'background-color' style for sticky element.
     */
    stickyBackgroundColor?: string;
    /**
     * Region to render sticky component in.
     * @defaultvalue Both
     */
    stickyPosition?: StickyPositionType;
    /**
     * If true, then match scrolling position of placeholder element in Sticky.
     * @defaultvalue true
     */
    isScrollSynced?: boolean;
}

export declare interface IStickyState {
    isStickyTop: boolean;
    isStickyBottom: boolean;
    distanceFromTop?: number;
}

export { IStyle }

export { IStyleFunction }

export { IStyleFunctionOrObject }

export { IStyleSet }

export { IStyleSheetConfig }

/**
 * Suggestion item props. Refers to the each individual suggested items rendered within Suggestions callout.
 * Type T is the type of the item that is displayed.
 * {@docCategory Pickers}
 */
export declare interface ISuggestionItemProps<T> {
    /**
     * Optional callback to access the ISuggestionItem interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ISuggestionsItem>;
    /** Individual suggestion object containing its properties. */
    suggestionModel: ISuggestionModel<T>;
    /** Optional renderer to override the default one for each type of picker. */
    RenderSuggestion: (item: T, suggestionItemProps: ISuggestionItemProps<T>) => JSX.Element;
    /** Callback for when the user clicks on the suggestion. */
    onClick: (ev: React_2.MouseEvent<HTMLButtonElement>) => void;
    /** Callback for when the item is removed from the array of suggested items. */
    onRemoveItem: (ev: React_2.MouseEvent<HTMLButtonElement>) => void;
    /** Optional className for the root element of the suggestion item. */
    className?: string;
    /** Unique id of the suggested item. */
    id?: string;
    /** Whether the remove button should be rendered or not. */
    showRemoveButton?: boolean;
    /** An override for the 'selected' property of the SuggestionModel. */
    isSelectedOverride?: boolean;
    /**
     * The ARIA label for the button to remove the suggestion from the list.
     */
    removeButtonAriaLabel?: string;
    /** Call to provide customized styling that will layer on top of the variant rules. */
    styles?: IStyleFunctionOrObject<ISuggestionsItemStyleProps, ISuggestionsItemStyles>;
    /** Theme provided by High-Order Component. */
    theme?: ITheme;
    /**
     *  Props for the icon used in the item's remove button.
     *  @defaultvalue `{ iconName:'Cancel' }`
     */
    removeButtonIconProps?: IIconProps;
}

/**
 * SuggestionModel interface.
 * Type T is the type of the item that is suggested (Persona, Tag or any other custom picker).
 * {@docCategory Pickers}
 */
export declare interface ISuggestionModel<T> {
    /** The suggested item of the type T */
    item: T;
    /** Whether the suggested item is selected or not. */
    selected: boolean;
    /** Aria-label string for each suggested item. */
    ariaLabel?: string;
}

/**
 * Suggestions component.
 * {@docCategory Pickers}
 */
export declare interface ISuggestions<T> {
    /** Execute the action selected. Can be SearchMore or ForceResolve actions. */
    executeSelectedAction: () => void;
    /** Focus on the ForceResolve action above the suggestions. If not available then focus on SearchMore action. */
    focusAboveSuggestions: () => void;
    /** Focus on the SearchMore action below the suggestions. If not available then focus on ForceResolve action. */
    focusBelowSuggestions: () => void;
    /** Focus the SearchMore action button. */
    focusSearchForMoreButton: () => void;
    /** Whether it has any suggested actions like ForceResolve or SearchMore. */
    hasSuggestedAction: () => boolean;
    /** Whether any of the suggested actions (ForceResolve or SearchMore) is selected. */
    hasSuggestedActionSelected: () => boolean;
    /** Returns true if the event was handled, false otherwise. */
    tryHandleKeyDown: (keyCode: number, currentSuggestionIndex: number) => boolean;
}

export declare interface ISuggestionsControlProps<T> extends React_2.ClassAttributes<any>, ISuggestionsCoreProps<T> {
    /**
     * An ARIA label for the container that is the parent of the suggestions header items.
     */
    suggestionsHeaderContainerAriaLabel?: string;
    /**
     * An ARIA label for the container that is the parent of the suggestions footer items.
     */
    suggestionsFooterContainerAriaLabel?: string;
    /**
     * The header items props
     */
    headerItemsProps?: ISuggestionsHeaderFooterProps[];
    /**
     * The footer items props
     */
    footerItemsProps?: ISuggestionsHeaderFooterProps[];
    /**
     * Whether or not the first selectable item in the suggestions list should be selected
     */
    shouldSelectFirstItem?: () => boolean;
    /**
     * The CSS classname of the suggestions list.
     */
    className?: string;
    /**
     * Completes the suggestion
     */
    completeSuggestion: () => void;
}

export declare interface ISuggestionsControlState<T> {
    selectedHeaderIndex: number;
    selectedFooterIndex: number;
    suggestions: ISuggestionModel<T>[];
}

export declare interface ISuggestionsCoreProps<T> extends React_2.ClassAttributes<any> {
    /**
     * Gets the component ref.
     */
    componentRef?: IRefObject<{}>;
    /**
     * How the suggestion should look in the suggestion list.
     */
    onRenderSuggestion?: (props: T, suggestionItemProps: ISuggestionItemProps<T>) => JSX.Element;
    /**
     * What should occur when a suggestion is clicked
     */
    onSuggestionClick: (ev?: React_2.MouseEvent<HTMLElement>, item?: any, index?: number) => void;
    /**
     * The list of Suggestions that will be displayed
     */
    suggestions: ISuggestionModel<T>[];
    /**
     * Function to fire when one of the optional remove buttons on a suggestion is clicked.
     */
    onSuggestionRemove?: (ev?: React_2.MouseEvent<HTMLElement>, item?: IPersonaProps, index?: number) => void;
    /**
     * Screen reader message to read when there are suggestions available.
     */
    suggestionsAvailableAlertText?: string;
    /**
     * An ARIA label for the container that is the parent of the suggestions.
     */
    suggestionsContainerAriaLabel?: string;
    /**
     * the classname of the suggestion item.
     */
    suggestionsItemClassName?: string;
    /**
     * Maximum number of suggestions to show in the full suggestion list.
     */
    resultsMaximumNumber?: number;
    /**
     * Indicates whether to show a button with each suggestion to remove that suggestion.
     */
    showRemoveButtons?: boolean;
    /**
     * Indicates whether to loop around to the top or bottom of the suggestions
     * on calling nextSuggestion and previousSuggestion, respectively
     */
    shouldLoopSelection: boolean;
}

export declare interface ISuggestionsHeaderFooterItemProps {
    componentRef?: IRefObject<{}>;
    renderItem: () => JSX.Element;
    onExecute?: () => void;
    isSelected: boolean;
    id: string;
    className: string | undefined;
}

export declare interface ISuggestionsHeaderFooterProps {
    renderItem: () => JSX.Element;
    onExecute?: () => void;
    className?: string;
    ariaLabel?: string;
    shouldShow: () => boolean;
}

/**
 * SuggestionItem component.
 * {@docCategory Pickers}
 */
export declare interface ISuggestionsItem {
}

/**
 * The props needed to construct SuggestionItem styles.
 * {@docCategory Pickers}
 */
export declare type ISuggestionsItemStyleProps = Required<Pick<ISuggestionItemProps<any>, 'theme'>> & Pick<ISuggestionItemProps<any>, 'className'> & {
    /** Whether the suggestion item is selected or not. */
    suggested?: boolean;
};

/**
 * Represents the stylable areas of the SuggestionItem.
 * {@docCategory Pickers}
 */
export declare interface ISuggestionsItemStyles {
    /** Root element of the suggested item. */
    root: IStyle;
    /** Refers to the CommandButton holding the content of the suggested item. */
    itemButton: IStyle;
    /** Refers to the remove button in case it's rendered. */
    closeButton: IStyle;
}

/**
 * Suggestions props interface. Refers to the entire container holding all the suggestions.
 * Type T is the type of the items that are displayed.
 * {@docCategory Pickers}
 */
export declare interface ISuggestionsProps<T> extends IReactProps<any> {
    /**
     * Optional callback to access the ISuggestions interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ISuggestions<T>>;
    /**
     * How the suggestion should look in the suggestion list.
     */
    onRenderSuggestion: (props: T, suggestionItemProps: ISuggestionItemProps<T>) => JSX.Element;
    /**
     * What should occur when a suggestion is clicked
     */
    onSuggestionClick: (ev?: React_2.MouseEvent<HTMLElement>, item?: any, index?: number) => void;
    /**
     * The list of Suggestions that will be displayed
     */
    suggestions: ISuggestionModel<T>[];
    /**
     * How the "no result found" should look in the suggestion list.
     */
    onRenderNoResultFound?: IRenderFunction<void>;
    /**
     * The text that appears at the top of the suggestions list.
     */
    suggestionsHeaderText?: string;
    /**
     * The text that should appear at the top of the most recently used box.
     */
    mostRecentlyUsedHeaderText?: string;
    /**
     * The icon that appears indicating to the user that they can search for more results.
     */
    searchForMoreIcon?: IIconProps;
    /**
     * The text that appears indicating to the user that they can search for more results.
     */
    searchForMoreText?: string;
    /**
     * The callback that should be called when the user attempts to get more results
     */
    onGetMoreResults?: () => void;
    /**
     * The text that appears indicating to the use to force resolve the input
     */
    forceResolveText?: string;
    /**
     * The callback that should be called to see if the force resolve command should be shown
     */
    showForceResolve?: () => boolean;
    /**
     * The callback that should be called when the user attempts to use the input text as as item
     */
    createGenericItem?: () => void;
    /**
     * The CSS className of the suggestions root.
     */
    className?: string;
    /**
     * The CSS className of the suggestions list
     */
    suggestionsClassName?: string;
    /**
     * The text that should appear if there is a search error.
     *
     * @deprecated Use noResultsFoundText instead.
     */
    searchErrorText?: string;
    /**
     * The text that should appear if no results are found when searching.
     */
    noResultsFoundText?: string;
    /**
     * The className of the suggestion item.
     */
    suggestionsItemClassName?: string;
    /**
     * Used to indicate whether or not the user can request more suggestions.
     * Dictates whether or not the searchForMore button is displayed.
     */
    moreSuggestionsAvailable?: boolean;
    /**
     * Used to indicate whether or not the suggestions are loading.
     */
    isLoading?: boolean;
    /**
     * Used to indicate whether or not the suggestions are taking an extended amount of time to load.
     */
    isExtendedLoading?: boolean;
    /**
     * Used to indicate whether or not the component is searching for more results.
     */
    isSearching?: boolean;
    /**
     * The text to display while the results are loading.
     */
    loadingText?: string;
    /**
     * The text to display while searching for more results in a limited suggestions list.
     */
    searchingText?: string;
    /**
     * Indicates if a short list of recent suggestions should be shown.
     */
    isMostRecentlyUsedVisible?: boolean;
    /**
     * Function to fire when one of the optional remove buttons on a suggestion is clicked.
     *
     * TODO (adjective-object) remove IPersonaprops before the next major version bump
     */
    onSuggestionRemove?: (ev?: React_2.MouseEvent<HTMLElement>, item?: T | IPersonaProps, index?: number) => void;
    /**
     * Indicates if the text in resultsFooter or resultsFooterFull should be shown at the end of the suggestion list.
     * @defaultvalue true
     */
    isResultsFooterVisible?: boolean;
    /**
     * Maximum number of suggestions to show in the full suggestion list.
     */
    resultsMaximumNumber?: number;
    /**
     * A renderer that adds an element at the end of the suggestions list it has more items than resultsMaximumNumber.
     * This should not include interactive elements as the footer is not focusable.
     */
    resultsFooterFull?: (props: ISuggestionsProps<T>) => JSX.Element;
    /**
     * A renderer that adds an element at the end of the suggestions list it has fewer items than resultsMaximumNumber.
     * This should not include interactive elements as the footer is not focusable.
     */
    resultsFooter?: (props: ISuggestionsProps<T>) => JSX.Element;
    /**
     * Indicates whether to show a button with each suggestion to remove that suggestion.
     */
    showRemoveButtons?: boolean;
    /**
     * Screen reader message to read when there are suggestions available.
     */
    suggestionsAvailableAlertText?: string;
    /**
     * A function that resets focus to the expected item in the suggestion list
     */
    refocusSuggestions?: (keyCode: KeyCodes) => void;
    /**
     * An ARIA label for the container that is the parent of the suggestions.
     */
    suggestionsContainerAriaLabel?: string;
    /**
     * An ARIA label to use for the buttons to remove individual suggestions.
     */
    removeSuggestionAriaLabel?: string;
    /**
     * The string that will be used as the suggestionsListId.
     * Will be used by the BasePicker to keep track of the list for aria.
     */
    suggestionsListId?: string;
    /** Call to provide customized styling that will layer on top of the variant rules. */
    styles?: IStyleFunctionOrObject<any, any>;
    /** Theme provided by High-Order Component. */
    theme?: ITheme;
    /**
     *  Props for the icon used in the item's remove button.
     *  @defaultvalue `{ iconName:'Cancel' }`
     */
    removeButtonIconProps?: IIconProps;
}

export declare interface ISuggestionsState {
    selectedActionType: SuggestionActionType;
}

/**
 * The props needed to construct Suggestions styles.
 * {@docCategory Pickers}
 */
export declare type ISuggestionsStyleProps = Required<Pick<ISuggestionsProps<any>, 'theme'>> & Pick<ISuggestionsProps<any>, 'className' | 'suggestionsClassName'> & {
    /** Whether the forceResolve actionButton is selected. */
    forceResolveButtonSelected?: boolean;
    /** Whether the searchForMore actionButton is selected. */
    searchForMoreButtonSelected?: boolean;
};

/**
 * Represents the stylable areas of the Suggestions.
 * {@docCategory Pickers}
 */
export declare interface ISuggestionsStyles {
    /** Root element of the suggestions outer wrapper. */
    root: IStyle;
    /** Refers to the suggestions container. */
    suggestionsContainer: IStyle;
    /** Refers to the title rendered for suggestions container header and/or footer (if provided). */
    title: IStyle;
    /** Refers to the 'Force resolve' actionButton. */
    forceResolveButton: IStyle;
    /** Refers to the 'Search for more' actionButton. */
    searchForMoreButton: IStyle;
    /** Refers to the text rendered when no suggestions are found. */
    noSuggestions: IStyle;
    /** Refers to the text displaying if more suggestions available. */
    suggestionsAvailable: IStyle;
    /** SubComponents (Spinner) styles. */
    subComponentStyles: ISuggestionsSubComponentStyles;
}

/**
 * Styles interface of the SubComponents rendered within PeoplePickerItemSelected.
 * {@docCategory Pickers}
 */
export declare interface ISuggestionsSubComponentStyles {
    /** Refers to the Spinner rendered within the Suggestions when searching or loading suggestions. */
    spinner: IStyleFunctionOrObject<ISpinnerStyleProps, any>;
}

/**
 * Returns true if the argument is a valid Shade value
 * @param shade - The Shade value to validate.
 */
export declare function isValidShade(shade?: Shade): boolean;

export { isVirtualElement }

/**
 * {@docCategory SwatchColorPicker}
 */
export declare interface ISwatchColorPickerProps extends React_2.RefAttributes<HTMLElement> {
    /**
     * Number of columns for the swatch color picker
     */
    columnCount: number;
    /**
     * ID for the swatch color picker's root element. Also used as a prefix for the IDs of color cells.
     */
    id?: string;
    /**
     * Additional class name to provide on the root element
     */
    className?: string;
    /**
     * The shape of the color cells.
     * @default 'circle'
     */
    cellShape?: 'circle' | 'square';
    /**
     * ID of the current selected color swatch. Only provide this if the SwatchColorPicker is a
     * controlled component where you are maintaining its current state; otherwise, use the
     * `defaultSelectedId` property.
     */
    selectedId?: string;
    /**
     * The color cells that will be made available to the user.
     *
     * Note: When the reference to this prop changes, regardless of how many color cells change,
     * all of the color cells will be re-rendered (potentially bad perf) because we memoize
     * based on this prop's reference.
     */
    colorCells: IColorCellProps[];
    /**
     * @deprecated No longer used. Provide `selectedId` if controlled or `defaultSelectedId` if uncontrolled.
     */
    isControlled?: boolean;
    /**
     * ID of the default selected color swatch. Only provide this if the SwatchColorPicker is an
     * uncontrolled component; otherwise, use the `selectedId` property.
     */
    defaultSelectedId?: string | undefined;
    /**
     * @deprecated Use `onChange`
     */
    onColorChanged?: (id?: string, color?: string) => void;
    /**
     * Callback for when the user changes the color.
     * If `id` and `color` are unspecified, there is no selected cell.
     * (e.g. the user executed the currently selected cell to unselect it)
     */
    onChange?: (event: React_2.FormEvent<HTMLElement>, id: string | undefined, color: string | undefined) => void;
    /**
     * Callback for when the user hovers over a color cell.
     * If `id` and `color` are unspecified, cells are no longer being hovered.
     */
    onCellHovered?: (id?: string, color?: string, event?: React_2.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Callback for when the user focuses a color cell.
     * If `id` and `color` are unspecified, cells are no longer being focused.
     */
    onCellFocused?: (id?: string, color?: string, event?: React_2.FormEvent<HTMLButtonElement>) => void;
    /**
     * Custom render function for the color cell.
     * This can replace the entire button element, including the default focus and hover states.
     */
    onRenderColorCell?: IRenderFunction<IColorCellProps>;
    /**
     * Custom render function for inner content of the color cell.
     * This will retain the cell's default button behavior and overrides just the inner content.
     */
    onRenderColorCellContent?: IRenderFunction<IColorCellProps>;
    /**
     * Whether the control is disabled.
     */
    disabled?: boolean;
    /**
     * Position this grid is in the parent set (index in a parent menu, for example)
     */
    ariaPosInSet?: number;
    /**
     * Size of the parent set (size of parent menu, for example)
     */
    ariaSetSize?: number;
    /**
     * Whether focus should cycle back to the beginning once the user navigates past the end (and vice versa).
     * Only relevant if `doNotContainWithinFocusZone` is not true.
     * @defaultvalue true
     */
    shouldFocusCircularNavigate?: boolean;
    /**
     * If false (the default), the grid is contained inside a FocusZone.
     * If true, a FocusZone is not used.
     * @default false
     */
    doNotContainWithinFocusZone?: boolean;
    /**
     * The distance between cells, in pixels
     * @defaultvalue 10
     */
    cellMargin?: number;
    /**
     * Height of an individual cell, in pixels
     * @defaultvalue 20
     */
    cellHeight?: number;
    /**
     * Width of an individual cell, in pixels
     * @defaultvalue 20
     */
    cellWidth?: number;
    /**
     * Width of the border indicating a hovered/selected cell, in pixels
     * @defaultvalue If `cellWidth` is less than 24px, then default value is 2px. Otherwise it defaults to 4px.
     */
    cellBorderWidth?: number;
    /**
     * Theme to apply to the component.
     */
    theme?: ITheme;
    /**
     * Styles for the component.
     */
    styles?: IStyleFunctionOrObject<ISwatchColorPickerStyleProps, ISwatchColorPickerStyles>;
    /**
     * Styles for the grid cells.
     */
    getColorGridCellStyles?: IStyleFunctionOrObject<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>;
    /**
     * Whether to update focus when a cell is hovered.
     * @defaultvalue false
     */
    focusOnHover?: boolean;
    /**
     * Selector to focus on mouse leave. Should only be used in conjunction with `focusOnHover`.
     */
    mouseLeaveParentSelector?: string | undefined;
}

/**
 * Properties required to build the styles for the color picker component.
 * {@docCategory SwatchColorPicker}
 */
export declare interface ISwatchColorPickerStyleProps {
    /**
     * Theme to apply to the container
     */
    theme: ITheme;
    /**
     * Custom className to apply to the container.
     */
    className?: string;
    /**
     * The distance between cells
     */
    cellMargin?: number;
}

/**
 * Styles for the SwatchColorPicker.
 * {@docCategory SwatchColorPicker}
 */
export declare interface ISwatchColorPickerStyles {
    /**
     * Style applied to the container grid.
     */
    root: IStyle;
    /**
     * Style for the table cells of the grid.
     */
    tableCell: IStyle;
    /**
     * Style for the FocusZone container for the grid.
     */
    focusedContainer?: IStyle;
}

/**
 * TagPickerItem item interface.
 * {@docCategory TagPicker}
 */
export declare interface ITag {
    /** Name of the item. */
    name: string;
    /** Unique key for the item. */
    key: string | number;
}

/**
 * TagItem component props
 * {@docCategory TagPicker}
 */
export declare interface ITagItemProps extends IPickerItemProps<ITag> {
    /** Additional CSS class(es) to apply to the TagItem root element. */
    className?: string;
    /**
     * Enable or not focus on TagItem when TagPicker is disabled.
     * @defaultvalue false
     */
    enableTagFocusInDisabledPicker?: boolean;
    /**
     * The title (and aria-label) attribute used by the TagItem text element.
     * @defaultvalue children if of type string or item.name
     */
    title?: string;
    /** Call to provide customized styling that will layer on top of the variant rules. */
    styles?: IStyleFunctionOrObject<ITagItemStyleProps, ITagItemStyles>;
    /** Theme provided by High-Order Component. */
    theme?: ITheme;
}

/**
 * The props needed to construct TagItem styles.
 * {@docCategory TagPicker}
 */
export declare type ITagItemStyleProps = Required<Pick<ITagItemProps, 'theme'>> & Pick<ITagItemProps, 'className' | 'selected' | 'disabled'> & {};

/**
 * Represents the stylable areas of the TagItem.
 * {@docCategory TagPicker}
 */
export declare interface ITagItemStyles {
    /** Root element of picked TagItem */
    root: IStyle;
    /** Refers to the text element of the TagItem already picked. */
    text: IStyle;
    /** Refers to the cancel action button on a picked TagItem. */
    close: IStyle;
}

/**
 * TagItemSuggestion component props
 * {@docCategory TagPicker}
 */
export declare interface ITagItemSuggestionProps extends React_2.AllHTMLAttributes<HTMLElement> {
    /** Additional CSS class(es) to apply to the TagItemSuggestion div element */
    className?: string;
    /** Call to provide customized styling that will layer on top of the variant rules. */
    styles?: IStyleFunctionOrObject<ITagItemSuggestionStyleProps, ITagItemSuggestionStyles>;
    /** Theme provided by High-Order Component. */
    theme?: ITheme;
}

/**
 * The props needed to construct TagItemSuggestion styles.
 * {@docCategory TagPicker}
 */
export declare type ITagItemSuggestionStyleProps = Required<Pick<ITagItemSuggestionProps, 'theme'>> & Pick<ITagItemSuggestionProps, 'className'> & {};

/**
 * Represents the stylable areas of the TagItemSuggestion
 * {@docCategory TagPicker}
 */
export declare interface ITagItemSuggestionStyles {
    /** Refers to the text element of the TagItemSuggestion */
    suggestionTextOverflow?: IStyle;
}

/**
 * TagPicker component props
 * {@docCategory TagPicker}
 */
export declare interface ITagPickerProps extends IBasePickerProps<ITag> {
}

/**
 * {@docCategory TeachingBubble}
 */
export declare interface ITeachingBubble {
    /** Sets focus to the TeachingBubble root element */
    focus(): void;
}

/**
 * TeachingBubble component props.
 * {@docCategory TeachingBubble}
 */
export declare interface ITeachingBubbleProps extends React_2.RefAttributes<HTMLDivElement>, IAccessiblePopupProps {
    children?: React_2.ReactNode;
    /**
     * Optional callback to access the ITeachingBubble interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ITeachingBubble>;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ITeachingBubbleStyleProps, ITeachingBubbleStyles>;
    /**
     * Theme provided by High-Order Component.
     */
    theme?: ITheme;
    /**
     * Properties to pass through for Callout, reference detail properties in ICalloutProps
     */
    calloutProps?: ICalloutProps;
    /**
     * Properties to pass through for FocusTrapZone, reference detail properties in IFocusTrapZoneProps
     */
    focusTrapZoneProps?: IFocusTrapZoneProps;
    /**
     * A headline for the Teaching Bubble.
     */
    headline?: string;
    /**
     * A variation with smaller bold headline and no margins.
     */
    hasCondensedHeadline?: boolean;
    /**
     * @deprecated Use `hasCloseButton`.
     */
    hasCloseIcon?: boolean;
    /**
     * Whether the TeachingBubble renders close button in the top right corner.
     */
    hasCloseButton?: boolean;
    /**
     * An Image for the TeachingBubble.
     */
    illustrationImage?: IImageProps;
    /**
     * The Primary interaction button
     */
    primaryButtonProps?: IButtonProps;
    /**
     * The Secondary interaction button
     */
    secondaryButtonProps?: IButtonProps;
    /**
     * Text that will be rendered in the footer of the TeachingBubble.
     * May be rendered alongside primary and secondary buttons.
     */
    footerContent?: string | JSX.Element;
    /**
     * Element to anchor the TeachingBubble to.
     * @deprecated Use `target` instead
     */
    targetElement?: HTMLElement;
    /**
     * Element, MouseEvent, Point, or querySelector string that the TeachingBubble
     * should anchor to.
     */
    target?: Target;
    /**
     * Callback when the TeachingBubble tries to close.
     */
    onDismiss?: (ev?: any) => void;
    /**
     * Whether or not the TeachingBubble is wide, with image on the left side.
     */
    isWide?: boolean;
    /**
     * A variation with smaller bold headline and margins to the body.
     * (`hasCondensedHeadline` takes precedence if it is also set to true.)
     */
    hasSmallHeadline?: boolean;
    /**
     *  Defines the element id referencing the element containing label text for TeachingBubble.
     */
    ariaLabelledBy?: string;
    /**
     * Defines the element id referencing the element containing the description for the TeachingBubble.
     */
    ariaDescribedBy?: string;
}

/**
 * {@docCategory TeachingBubble}
 */
export declare type ITeachingBubbleStyleProps = Required<Pick<ITeachingBubbleProps, 'theme'>> & Pick<ITeachingBubbleProps, 'hasCondensedHeadline' | 'hasSmallHeadline' | 'isWide'> & {
    /** Style props for callout. */
    calloutProps?: ICalloutContentStyleProps;
    /** Class name for primary button. */
    primaryButtonClassName?: string;
    /** Class name for secondary button. */
    secondaryButtonClassName?: string;
    /** If the close button is visible. */
    hasCloseButton?: boolean;
    /** If a headline has been specified. */
    hasHeadline?: boolean;
};

/**
 * {@docCategory TeachingBubble}
 */
export declare interface ITeachingBubbleStyles {
    root: IStyle;
    body: IStyle;
    bodyContent: IStyle;
    closeButton: IStyle;
    content: IStyle;
    footer: IStyle;
    header: IStyle;
    headline: IStyle;
    imageContent: IStyle;
    primaryButton: IStyle;
    secondaryButton: IStyle;
    subText: IStyle;
    subComponentStyles?: ITeachingBubbleSubComponentStyles;
}

/**
 * {@docCategory TeachingBubble}
 */
export declare interface ITeachingBubbleSubComponentStyles {
    /** Refers to the callout that hosts the TeachingBubble. */
    callout: IStyleFunctionOrObject<any, any>;
}

/**
 * {@docCategory Text}
 */
export declare type ITextComponent = IComponent<ITextProps, ITextTokens, ITextStyles>;

/**
 * {@docCategory TextField}
 */
export declare interface ITextField {
    /** Gets the current value of the input. */
    value: string | undefined;
    /** Sets focus to the input. */
    focus: () => void;
    /** Blurs the input */
    blur: () => void;
    /** Select the value of the text field. */
    select: () => void;
    /** Sets the selection start of the text field to a specified value. */
    setSelectionStart: (value: number) => void;
    /** Sets the selection end of the text field to a specified value. */
    setSelectionEnd: (value: number) => void;
    /**
     * Sets the start and end positions of a selection in a text field.
     * Call with start and end set to the same value to set the cursor position.
     * @param start - Index of the start of the selection.
     * @param end - Index of the end of the selection.
     */
    setSelectionRange: (start: number, end: number) => void;
    /** Gets the selection start of the text field. Returns -1 if there is no selection. */
    selectionStart: number | null;
    /** Gets the selection end of the text field. Returns -1 if there is no selection. */
    selectionEnd: number | null;
}

/**
 * TextField component props.
 * {@docCategory TextField}
 */
export declare interface ITextFieldProps extends React_2.AllHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    /**
     * Optional callback to access the ITextField component. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ITextField>;
    /**
     * Optional callback to access the root DOM element.
     * @deprecated Temporary solution which will be replaced with ref once TextField is converted to a function component.
     */
    elementRef?: React_2.Ref<HTMLDivElement>;
    /**
     * Whether or not the text field is a multiline text field.
     * @defaultvalue false
     */
    multiline?: boolean;
    /**
     * For multiline text fields, whether or not the field is resizable.
     * @defaultvalue true
     */
    resizable?: boolean;
    /**
     * For multiline text fields, whether or not to auto adjust text field height.
     * @defaultvalue false
     */
    autoAdjustHeight?: boolean;
    /**
     * Whether or not the text field is underlined.
     * @defaultvalue false
     */
    underlined?: boolean;
    /**
     * Whether or not the text field is borderless.
     * @defaultvalue false
     */
    borderless?: boolean;
    /**
     * Label displayed above the text field (and read by screen readers).
     */
    label?: string;
    /**
     * Custom renderer for the label.
     * If you don't call defaultRender, ensure that you give your custom-rendered label an id and that
     * you set the textfield's aria-labelledby prop to that id.
     */
    onRenderLabel?: IRenderFunction<ITextFieldProps>;
    /**
     * Description displayed below the text field to provide additional details about what text to enter.
     */
    description?: string;
    /**
     * Custom renderer for the description.
     */
    onRenderDescription?: IRenderFunction<ITextFieldProps>;
    /**
     * Custom renderer for the actual single-line input field (not used if `multiline` is true).
     * This receives the processed props which would usually be passed to the `<input>` element
     * and allows manually modifying them or rendering as a different element. (Use with care,
     * since changes here could easily break the component.)
     */
    onRenderInput?: IRenderFunction<React_2.InputHTMLAttributes<HTMLInputElement> & React_2.RefAttributes<HTMLInputElement>>;
    /**
     * Prefix displayed before the text field contents. This is not included in the value.
     * Ensure a descriptive label is present to assist screen readers, as the value does not include the prefix.
     */
    prefix?: string;
    /**
     * Suffix displayed after the text field contents. This is not included in the value.
     * Ensure a descriptive label is present to assist screen readers, as the value does not include the suffix.
     */
    suffix?: string;
    /**
     * Custom render function for prefix.
     */
    onRenderPrefix?: IRenderFunction<ITextFieldProps>;
    /**
     * Custom render function for suffix.
     */
    onRenderSuffix?: IRenderFunction<ITextFieldProps>;
    /**
     * Props for an optional icon, displayed in the far right end of the text field.
     */
    iconProps?: IIconProps;
    /**
     * Default value of the text field. Only provide this if the text field is an uncontrolled component;
     * otherwise, use the `value` property.
     */
    defaultValue?: string;
    /**
     * Current value of the text field. Only provide this if the text field is a controlled component where you
     * are maintaining its current state; otherwise, use the `defaultValue` property.
     */
    value?: string;
    /**
     * Disabled state of the text field.
     * @defaultvalue false
     */
    disabled?: boolean;
    /**
     * If true, the text field is readonly.
     * @defaultvalue false
     */
    readOnly?: boolean;
    /**
     * If true, the text field is invalid. Will be auto-determined by errorMessage unless set.
     * @defaultvalue false
     */
    invalid?: boolean;
    /**
     * Static error message displayed below the text field. Use `onGetErrorMessage` to dynamically
     * change the error message displayed (if any) based on the current value. `errorMessage` and
     * `onGetErrorMessage` are mutually exclusive (`errorMessage` takes precedence).
     */
    errorMessage?: string | JSX.Element;
    /**
     * Callback for when the input value changes.
     * This is called on both `input` and `change` events.
     * (In a later version, this will probably only be called for the `change` event.)
     */
    onChange?: (event: React_2.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
    /**
     * Function called after validation completes.
     */
    onNotifyValidationResult?: (errorMessage: string | JSX.Element, value: string | undefined) => void;
    /**
     * Function used to determine whether the input value is valid and get an error message if not.
     * Mutually exclusive with the static string `errorMessage` (it will take precedence over this).
     *
     * When it returns `string | JSX.Element`:
     * - If valid, it returns empty string.
     * - If invalid, it returns the error message and the text field will
     *   show a red border and show an error message below the text field.
     *
     * When it returns `Promise<string | JSX.Element>`:
     * - The resolved value is displayed as the error message.
     * - If rejected, the value is thrown away.
     */
    onGetErrorMessage?: (value: string) => string | JSX.Element | PromiseLike<string | JSX.Element> | undefined;
    /**
     * Text field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
     * Updates to this prop will not be respected.
     * @defaultvalue 200
     */
    deferredValidationTime?: number;
    /**
     * Optional class name that is added to the container of the component.
     */
    className?: string;
    /**
     * Optional class name that is added specifically to the input/textarea element.
     */
    inputClassName?: string;
    /**
     * Aria label for the text field.
     */
    ariaLabel?: string;
    /**
     * Run validation when focus moves into the input, and **do not** validate on change.
     *
     * (Unless this prop and/or `validateOnFocusOut` is set to true, validation will run on every change.)
     * @defaultvalue false
     */
    validateOnFocusIn?: boolean;
    /**
     * Run validation when focus moves out of the input, and **do not** validate on change.
     *
     * (Unless this prop and/or `validateOnFocusIn` is set to true, validation will run on every change.)
     * @defaultvalue false
     */
    validateOnFocusOut?: boolean;
    /**
     * Whether validation should run when the input is initially rendered.
     * @defaultvalue true
     */
    validateOnLoad?: boolean;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ITextFieldStyleProps, ITextFieldStyles>;
    /**
     * Whether the input field should have autocomplete enabled.
     * This tells the browser to display options based on earlier typed values.
     * Common values are 'on' and 'off' but for all possible values see the following links:
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#Values
     * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
     */
    autoComplete?: string;
    /**
     * Whether to show the reveal password button for input type `'password'`. This will be ignored
     * if the `type` prop is not set to `'password'`, or if the browser is known to have a built-in
     * reveal button for password inputs (Edge, IE).
     */
    canRevealPassword?: boolean;
    /**
     * If `canRevealPassword` is true, aria label for the reveal password button (example: "Show
     * password"). Note that this will NOT be used in browsers known to have a built-in reveal
     * password button for password inputs (Edge, IE).
     */
    revealPasswordAriaLabel?: string;
}

/** @internal */
export declare interface ITextFieldSnapshot {
    /**
     * If set, the text field is changing between single- and multi-line, so we'll need to reset
     * selection/cursor after the change completes.
     */
    selection?: [number | null, number | null];
}

/** @internal */
export declare interface ITextFieldState {
    /** The currently displayed value if uncontrolled. */
    uncontrolledValue: string | undefined;
    /** Is true when the control has focus. */
    isFocused?: boolean;
    /**
     * Dynamic error message returned by `onGetErrorMessage`.
     * Use `this._errorMessage` to get the actual current error message.
     */
    errorMessage: string | JSX.Element;
    /**
     * Whether this field has `type='password'` and `canRevealPassword=true`, and the password is
     * currently being revealed.
     */
    isRevealingPassword?: boolean;
}

/**
 * {@docCategory TextField}
 */
export declare type ITextFieldStyleProps = Required<Pick<ITextFieldProps, 'theme'>> & Pick<ITextFieldProps, 'className' | 'disabled' | 'inputClassName' | 'required' | 'multiline' | 'borderless' | 'resizable' | 'underlined' | 'autoAdjustHeight'> & {
    /** Element has an error message. */
    hasErrorMessage?: boolean;
    /** Element has an icon. */
    hasIcon?: boolean;
    /** Element has a label. */
    hasLabel?: boolean;
    /** Element has focus. */
    focused?: boolean;
    /** Element has a peek button for passwords */
    hasRevealButton?: boolean;
};

/**
 * {@docCategory TextField}
 */
export declare interface ITextFieldStyles {
    /**
     * Style for root element.
     */
    root: IStyle;
    /**
     * Style for field group encompassing entry area (prefix, field, icon and suffix).
     */
    fieldGroup: IStyle;
    /**
     * Style for prefix element.
     */
    prefix: IStyle;
    /**
     * Style for suffix element.
     */
    suffix: IStyle;
    /**
     * Style for main field entry element.
     */
    field: IStyle;
    /**
     * Style for icon prop element.
     */
    icon: IStyle;
    /**
     * Style for description element.
     */
    description: IStyle;
    /**
     * Style for TextField wrapper element.
     * Mainly useful for overriding border styles for underlined fields.
     */
    wrapper: IStyle;
    /**
     * Style for error message element.
     */
    errorMessage: IStyle;
    /**
     * Styling for subcomponents.
     */
    subComponentStyles: ITextFieldSubComponentStyles;
    /**
     * Styling for reveal password button
     */
    revealButton: IStyle;
    /**
     * Styling for reveal password span
     */
    revealSpan: IStyle;
    /**
     * Styling for reveal password icon
     */
    revealIcon: IStyle;
}

/**
 * {@docCategory TextField}
 */
export declare interface ITextFieldSubComponentStyles {
    /**
     * Styling for Label child component.
     */
    label: IStyleFunctionOrObject<any, any>;
}

/**
 * Inputs to the component
 * {@docCategory Text}
 */
export declare interface ITextProps extends ISlottableProps<ITextSlots>, IStyleableComponentProps<ITextProps, ITextTokens, ITextStyles>, React_2.HTMLAttributes<HTMLElement> {
    /**
     * Optionally render the component as another component type or primitive.
     */
    as?: React_2.ElementType<React_2.HTMLAttributes<HTMLElement>>;
    /**
     * Optional font type for Text.
     */
    variant?: keyof IFontStyles;
    /**
     * Whether the text is displayed as a block element.
     *
     * Note that in order for ellipsis on overflow to work properly,
     * `block` and `nowrap` should be set to true.
     */
    block?: boolean;
    /**
     * Whether the text is not wrapped.
     *
     * Note that in order for ellipsis on overflow to work properly,
     * `block` and `nowrap` should be set to true.
     */
    nowrap?: boolean;
}

/**
 * {@docCategory Text}
 */
export declare type ITextSlot = ISlotProp<ITextProps, string>;

/**
 * {@docCategory Text}
 */
export declare interface ITextSlots {
    root?: IHTMLSlot;
}

/**
 * {@docCategory Text}
 */
export declare type ITextStyles = IComponentStyles<ITextSlots>;

/**
 * {@docCategory Text}
 */
export declare type ITextStylesReturnType = ReturnType<Extract<ITextComponent['styles'], Function>>;

/**
 * {@docCategory Text}
 */
export declare type ITextTokenReturnType = ReturnType<Extract<ITextComponent['tokens'], Function>>;

/**
 * {@docCategory Text}
 */
export declare interface ITextTokens {
}

export { ITheme }

export declare interface IThemeRules {
    [key: string]: IThemeSlotRule;
}

export declare interface IThemeSlotRule {
    /** The name of this theme slot. */
    name: string;
    /** The actual color this theme slot is if it is a color. */
    color?: IColor;
    /** The value of this slot if it is NOT a color. Must be falsey if not a color. */
    value?: string;
    /** The theme slot this slot is based on. */
    inherits?: IThemeSlotRule;
    /** If set, this slot is the specified shade of the slot it inherits from. */
    asShade?: Shade;
    /**
     * Whether this slot is a background shade, which uses different logic for generating its inheriting-as-shade value.
     */
    isBackgroundShade?: boolean;
    /** Whether this slot has been manually overridden (else, it was automatically generated based on inheritance). */
    isCustomized?: boolean;
    /**
     * A collection of rules that inherit from this one. It is the responsibility of the inheriting rule to add
     * itself to its parent's dependentRules collection.
     */
    dependentRules: IThemeSlotRule[];
}

/**
 * {@docCategory TimePicker}
 */
export declare interface ITimePickerProps extends Omit<IComboBoxProps, 'options' | 'selectedKey' | 'defaultSelectedKey' | 'multiSelect' | 'text' | 'defaultValue' | 'onChange'> {
    /**
     * Label of the component.
     */
    label?: string;
    /**
     * Time increments, in minutes, of the options in the dropdown.
     */
    increments?: number;
    /**
     * If true, show seconds in the dropdown options and consider seconds for
     * default validation purposes.
     */
    showSeconds?: boolean;
    /**
     * If true, use 12-hour time format. Otherwise, use 24-hour format.
     */
    useHour12?: boolean;
    /**
     * If true, the TimePicker allows freeform user input, rather than restricting
     * to the default increments.
     *
     * The input will still be restricted to valid time values.
     */
    allowFreeform?: boolean;
    /**
     * Custom time range to for time options.
     */
    timeRange?: ITimeRange;
    /**
     * Localized strings to use in the TimePicker.
     */
    strings?: ITimePickerStrings;
    /**
     * The uncontrolled default selected time.
     * Mutually exclusive with `value`.
     */
    defaultValue?: Date;
    /**
     * A Date representing the selected time. If you provide this, you must maintain selection
     * state by observing onChange events and passing a new value in when changed.
     * Mutually exclusive with `defaultValue`.
     */
    value?: Date;
    /**
     * The date in which all dropdown options are based off of.
     */
    dateAnchor?: Date;
    /**
     * A callback for receiving a notification when the time has been changed.
     */
    onChange?: (event: React_2.FormEvent<IComboBox>, time: Date) => void;
    /**
     * Callback to localize the date strings displayed for dropdown options.
     */
    onFormatDate?: (date: Date) => string;
    /**
     * Callback to use custom user-input validation.
     */
    onValidateUserInput?: (userInput: string) => string;
    /**
     * Callback to get validation result.
     */
    onValidationResult?: (event: React_2.FormEvent<IComboBox>, data: TimePickerValidationResultData) => void;
}

/**
 * {@docCategory TimePicker}
 * Localized strings to use in the TimePicker
 */
export declare interface ITimePickerStrings {
    /** Error message to render below the field if input parsing fails. */
    invalidInputErrorMessage: string;
    /** Error message to render if the user input date is out of bounds. */
    timeOutOfBoundsErrorMessage?: string;
}

/**
 * {@docCategory TimePicker}
 * Range of start and end hours to be shown in the TimePicker.
 */
export declare interface ITimeRange {
    /** Start hour (inclusive) for the time range, 0-23 */
    start: number;
    /** End hour (exclusive) for the time range, 0-23 */
    end: number;
}

/**
 * {@docCategory Toggle}
 */
export declare interface IToggle {
    focus: () => void;
}

/**
 * Toggle component props.
 * {@docCategory Toggle}
 */
export declare interface IToggleProps extends React_2.HTMLAttributes<HTMLElement>, React_2.RefAttributes<HTMLElement> {
    /**
     * Render the root element as another type.
     */
    as?: IComponentAs<React_2.HTMLAttributes<HTMLElement>>;
    /**
     * Optional callback to access the IToggle interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IToggle>;
    /**
     * A label for the toggle.
     */
    label?: string | JSX.Element;
    /**
     * Text to display when toggle is ON.
     * Caution: when not providing on/off text user may get confused in differentiating the on/off states of the toggle.
     */
    onText?: string;
    /**
     * Text to display when toggle is OFF.
     * Caution: when not providing on/off text user may get confused in differentiating the on/off states of the toggle.
     */
    offText?: string;
    /**
     * Text for screen-reader to announce as the name of the toggle.
     */
    ariaLabel?: string;
    /**
     * @deprecated Use `ariaLabel` for name, and let the metadata convey state
     */
    onAriaLabel?: string;
    /**
     * @deprecated Use `ariaLabel` for name, and let the metadata convey state
     */
    offAriaLabel?: string;
    /**
     * Checked state of the toggle. If you are maintaining state yourself, use this property.
     * Otherwise use `defaultChecked`.
     */
    checked?: boolean;
    /**
     * Initial state of the toggle. If you want the toggle to maintain its own state, use this.
     * Otherwise use `checked`.
     */
    defaultChecked?: boolean;
    /**
     * Optional disabled flag.
     */
    disabled?: boolean;
    /**
     * Whether the label (not the onText/offText) should be positioned inline with the toggle control.
     * Left (right in RTL) side when on/off text provided VS right (left in RTL) side when no on/off text.
     * Caution: when not providing on/off text user may get confused in differentiating the on/off states of the toggle.
     */
    inlineLabel?: boolean;
    /**
     * Callback issued when the value changes.
     */
    onChange?: (event: React_2.MouseEvent<HTMLElement>, checked?: boolean) => void;
    /**
     * @deprecated Use `onChange` instead.
     */
    onChanged?: (checked: boolean) => void;
    /**
     * Theme provided by HOC.
     */
    theme?: ITheme;
    /**
     * Optional styles for the component.
     */
    styles?: IStyleFunctionOrObject<IToggleStyleProps, IToggleStyles>;
    /**
     * Whether to use the 'switch' role (ARIA 1.1) or the 'checkbox' role (ARIA 1.0).
     * @default 'switch'
     */
    role?: 'checkbox' | 'switch' | 'menuitemcheckbox';
}

/**
 * Properties required to build the styles for the Toggle component.
 * {@docCategory Toggle}
 */
export declare interface IToggleStyleProps {
    /**
     * Theme values.
     */
    theme: ITheme;
    /**
     * Root element class name.
     */
    className?: string;
    /**
     * Component is disabled.
     */
    disabled?: boolean;
    /**
     * Component is checked.
     */
    checked?: boolean;
    /**
     * Whether label should be positioned inline with the toggle.
     */
    inlineLabel?: boolean;
    /**
     * Whether the user did not specify a on/off text. Influencing only when inlineLabel is used.
     */
    onOffMissing?: boolean;
}

/**
 * Styles for the Toggle component.
 * {@docCategory Toggle}
 */
export declare interface IToggleStyles {
    /** Root element. */
    root: IStyle;
    /**
     * Label element above the toggle.
     */
    label: IStyle;
    /**
     * Container for the toggle pill and the text next to it.
     */
    container: IStyle;
    /**
     * Pill, rendered as a button.
     */
    pill: IStyle;
    /**
     * Thumb inside of the pill.
     */
    thumb: IStyle;
    /**
     * Text next to the pill.
     */
    text: IStyle;
}

/**
 * {@docCategory Tooltip}
 */
export declare interface ITooltip {
}

/**
 * {@docCategory Tooltip}
 */
export declare interface ITooltipHost {
    /**
     * Shows the tooltip.
     */
    show: () => void;
    /**
     * Dismisses the tooltip.
     */
    dismiss: () => void;
}

/**
 * TooltipHost props. Note that native props (such as `id`, `className`, and `aria-` props) are
 * passed through to the Tooltip itself, rather than being used on the host element.
 * {@docCategory Tooltip}
 */
export declare interface ITooltipHostProps extends Omit<React_2.HTMLAttributes<HTMLDivElement | TooltipHostBase>, 'content'> {
    /**
     * Optional callback to access the ITooltipHost interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ITooltipHost>;
    /**
     * Additional properties to pass through for Callout.
     */
    calloutProps?: ICalloutProps;
    /**
     * Number of milliseconds to delay closing the tooltip, so that the user has time to hover over
     * the tooltip and interact with it. Hovering over the tooltip will count as hovering over the
     * host, so that the tooltip will stay open if the user is actively interacting with it.
     */
    closeDelay?: number;
    /**
     * Content to display in the Tooltip.
     */
    content?: string | JSX.Element | JSX.Element[];
    /**
     * Length of delay before showing the tooltip on hover.
     * @defaultvalue TooltipDelay.medium
     */
    delay?: TooltipDelay;
    /**
     * How the tooltip should be anchored to its `targetElement`.
     * @defaultvalue DirectionalHint.topCenter
     */
    directionalHint?: DirectionalHint;
    /**
     * How the element should be positioned in RTL layouts.
     * If not specified, a mirror of `directionalHint` will be used.
     */
    directionalHintForRTL?: DirectionalHint;
    /**
     * Class name to apply to tooltip host.
     */
    hostClassName?: string;
    /**
     * Class name to apply to the *tooltip itself*, not the host.
     * To apply a class to the host, use `hostClassName` or `styles.root`.
     */
    className?: string;
    /**
     * If this is unset (the default), the tooltip is always shown even if there's no overflow.
     *
     * If set, only show the tooltip if the specified element (`Self` or `Parent`) has overflow.
     * When set to `Parent`, the parent element is also used as the tooltip's target element.
     *
     * Note that even with `Self` mode, the TooltipHost *does not* check whether any children have overflow.
     */
    overflowMode?: TooltipOverflowMode;
    /**
     * Whether or not to mark the TooltipHost root element as described by the tooltip.
     * Since this applies aria-describedby to a generic <div>, the description will not be
     * read by screen readers. Instead, the caller should pass an `id` to the TooltipHost
     * (to be passed through to the Tooltip) and mark the appropriate element as `aria-describedby`
     * with the `id`.
     * @defaultvalue true
     * @deprecated use aria-describedby on the appropriate element instead
     */
    setAriaDescribedBy?: boolean;
    /**
     * Additional properties to pass through for Tooltip.
     */
    tooltipProps?: ITooltipProps;
    /**
     * Optional ID to pass through to the tooltip (not used on the host itself).
     * Auto-generated if not provided.
     */
    id?: string;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ITooltipHostStyleProps, ITooltipHostStyles>;
    /**
     * Theme provided by higher-order component.
     */
    theme?: ITheme;
    /**
     * Notifies when tooltip becomes visible or hidden, whatever the trigger was.
     */
    onTooltipToggle?(isTooltipVisible: boolean): void;
}

export declare interface ITooltipHostState {
    /** @deprecated No longer used internally */
    isAriaPlaceholderRendered: boolean;
    isTooltipVisible: boolean;
}

/**
 * {@docCategory Tooltip}
 */
export declare interface ITooltipHostStyleProps {
    theme: ITheme;
    className?: string;
}

/**
 * {@docCategory Tooltip}
 */
export declare interface ITooltipHostStyles {
    /**
     * Style for the host wrapper element.
     */
    root: IStyle;
}

/**
 * {@docCategory Tooltip}
 */
export declare interface ITooltipProps extends Omit<React_2.HTMLAttributes<HTMLDivElement | TooltipBase>, 'content'> {
    /**
     * Optional callback to access the ITooltip interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<ITooltip>;
    /**
     * Properties to pass through for Callout.
     * @defaultvalue `{ isBeakVisible: true, beakWidth: 16, gapSpace: 0, setInitialFocus: true, doNotLayer: false }`
     */
    calloutProps?: ICalloutProps;
    /**
     * Content to be passed to the tooltip
     */
    content?: string | JSX.Element | JSX.Element[];
    /**
     * Render function to populate tooltip content.
     */
    onRenderContent?: IRenderFunction<ITooltipProps>;
    /**
     * Length of delay. Set to `TooltipDelay.zero` if you do not want a delay.
     * @defaultvalue TooltipDelay.medium
     */
    delay?: TooltipDelay;
    /**
     * Max width of tooltip
     * @defaultvalue 364px
     */
    maxWidth?: string | null;
    /**
     * Element to anchor the Tooltip to.
     */
    targetElement?: HTMLElement;
    /**
     * How the tooltip should be anchored to its `targetElement`.
     * @defaultvalue DirectionalHint.topCenter
     */
    directionalHint?: DirectionalHint;
    /**
     * How the element should be positioned in RTL layouts.
     * If not specified, a mirror of `directionalHint` will be used instead
     */
    directionalHintForRTL?: DirectionalHint;
    /**
     * Theme provided by higher-order component.
     */
    theme?: ITheme;
    /**
     * Call to provide customized styling that will layer on top of the variant rules.
     */
    styles?: IStyleFunctionOrObject<ITooltipStyleProps, ITooltipStyles>;
}

/**
 * {@docCategory Tooltip}
 */
export declare interface ITooltipStyleProps {
    theme: ITheme;
    className?: string;
    /**
     * Delay before tooltip appears.
     * @deprecated Delay logic moved to TooltipHost vs relying on animation delay.
     */
    delay?: TooltipDelay;
    /**
     * Maximum width of tooltip.
     */
    maxWidth?: string;
    /**
     * The gap between the Callout and the target
     * @defaultvalue 0
     */
    gapSpace?: number;
    /**
     * The width of the Callout's beak
     * @defaultvalue 16
     */
    beakWidth?: number;
}

/**
 * {@docCategory Tooltip}
 */
export declare interface ITooltipStyles {
    /**
     * Style for the root element.
     */
    root: IStyle;
    /**
     * Style for the content element.
     */
    content: IStyle;
    /**
     * Style for the subtext element.
     */
    subText: IStyle;
}

export declare interface IUniqueKeytip {
    uniqueID: string;
    keytip: IKeytipProps;
}

/**
 * Deprecated class names, previously used to provide customizations.
 * {@docCategory VerticalDivider}
 * @deprecated Use IVerticalDividerStyles instead.
 */
export declare interface IVerticalDividerClassNames {
    /**
     * Styling for the div that wraps the actual divider
     */
    wrapper: string;
    /**
     * Styling for the divider.
     */
    divider: string;
}

/**
 * {@docCategory VerticalDivider}
 * Props for the Vertical Divider
 */
export declare interface IVerticalDividerProps extends React_2.HTMLAttributes<HTMLElement>, React_2.RefAttributes<HTMLDivElement> {
    /**
     * Optional function to generate the class names for the divider for custom styling
     * @deprecated Use `styles` instead.
     */
    getClassNames?: (theme: ITheme) => IVerticalDividerClassNames;
    /**
     * The theme that should be used to render the vertical divider.
     */
    theme?: ITheme;
    /**
     * Optional override stylings that will get merged with the dividers styles.
     */
    styles?: IStyleFunctionOrObject<IVerticalDividerPropsStyles, IVerticalDividerStyles>;
    /**
     * className that will be placed on the divider wrapper div
     */
    className?: string;
}

/**
 * {@docCategory VerticalDivider}
 * Props that will get passed to the styling function to style the Vertical Divider
 */
export declare type IVerticalDividerPropsStyles = Pick<IVerticalDividerProps, 'theme' | 'getClassNames' | 'className'>;

/**
 * {@docCategory VerticalDivider}
 * Style interface that defines the different areas that styles can be customized on the Vertical Divider
 */
export declare interface IVerticalDividerStyles {
    /**
     * Styling for the div that wraps the actual divider
     */
    wrapper: IStyle;
    /**
     * Styling for the divider.
     */
    divider: IStyle;
}

/**
 * Viewport rectangle dimensions.
 *
 * {@docCategory DetailsList}
 */
export declare interface IViewport {
    /**
     * Width in pixels.
     */
    width: number;
    /**
     * Height in pixels.
     */
    height: number;
}

export { IVirtualElement }

export { IWarnControlledUsageParams }

/**
 * {@docCategory WeeklyDayPicker}
 */
export declare interface IWeeklyDayPicker {
    focus(): void;
}

/**
 * {@docCategory WeeklyDayPicker}
 */
export declare type IWeeklyDayPickerNavigationIcons = Pick<ICalendarNavigationIcons, 'leftNavigation' | 'rightNavigation'>;

/**
 * {@docCategory WeeklyDayPicker}
 */
export declare interface IWeeklyDayPickerProps extends IBaseProps<IWeeklyDayPicker>, Partial<ICalendarDayGridProps> {
    /**
     * Optional callback to access the IWeeklyDayPicker interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    componentRef?: IRefObject<IWeeklyDayPicker>;
    /**
     * Customized styles for the component.
     */
    styles?: IStyleFunctionOrObject<IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles>;
    /**
     * Theme (provided through customization).
     */
    theme?: ITheme;
    /**
     * Additional CSS class(es) to apply to the WeeklyDayPicker.
     */
    className?: string;
    /**
     * Localized strings to use in the WeeklyDayPicker
     */
    strings: IWeeklyDayPickerStrings;
    /**
     * Customize navigation icons.
     */
    navigationIcons?: IWeeklyDayPickerNavigationIcons;
    /**
     * The initially selected date.
     * @default Today's date (`new Date()`)
     */
    initialDate?: Date;
    /**
     * Callback issued when a date is selected
     * @param date - The date the user selected
     */
    onSelectDate?: (date: Date) => void;
    /**
     * Callback issued when a date in the calendar is navigated
     * @param date - The date that is navigated to
     */
    onNavigateDate?: (date: Date) => void;
    /**
     * The first day of the week for your locale.
     * @defaultvalue DayOfWeek.Sunday
     */
    firstDayOfWeek?: DayOfWeek;
    /**
     * Value of today. If unspecified, current time in client machine will be used.
     */
    today?: Date;
    /**
     * Apply additional formatting to dates, for example localized date formatting.
     */
    dateTimeFormatter?: IDateFormatting;
    /**
     * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
     */
    minDate?: Date;
    /**
     * If set the Calendar will not allow navigation to or selection of a date later than this value.
     */
    maxDate?: Date;
    /**
     * If set the Calendar will not allow selection of dates in this array.
     */
    restrictedDates?: Date[];
    /**
     * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
     */
    animationDirection?: AnimationDirection;
    /**
     * Whether to show as a month picker. If false, shows only one week
     * @defaultvalue false
     */
    showFullMonth?: boolean;
    /**
     * How many weeks to show if showFullMonth=true. If not provided, will show enough weeks to display the current
     * month, between 4 and 6 depending
     * @defaultvalue undefined
     */
    weeksToShow?: number;
}

/**
 * {@docCategory WeeklyDayPicker}
 */
export declare interface IWeeklyDayPickerStrings extends ICalendarStrings {
    /**
     * Aria-label for the "previous week" button in picker.
     */
    prevWeekAriaLabel?: string;
    /**
     * Aria-label for the "next week" button in picker.
     */
    nextWeekAriaLabel?: string;
}

/**
 * {@docCategory WeeklyDayPicker}
 */
export declare interface IWeeklyDayPickerStyleProps extends ICalendarDayGridStyleProps {
    /**
     * Theme provided by High-Order Component.
     */
    theme: ITheme;
    /**
     * Accept custom classNames
     */
    className?: string;
}

/**
 * {@docCategory WeeklyDayPicker}
 */
export declare interface IWeeklyDayPickerStyles extends Partial<ICalendarDayGridStyles> {
    /**
     * Style for the root element.
     */
    root: IStyle;
    /**
     * Style for navigation icon button.
     */
    navigationIconButton: IStyle;
    /**
     * Style for disabled element
     */
    disabledStyle: IStyle;
}

/**
 * Window with typings for experimental features regarding Dual Screen devices.
 */
export declare interface IWindowWithSegments extends Window {
    getWindowSegments?: () => DOMRect[];
}

/**
 * @deprecated Decorator usage is deprecated. Either call `getResponsiveMode` manually, or
 * use the `useResponsiveMode` hook within a function component.
 */
export declare interface IWithResponsiveModeState {
    responsiveMode?: ResponsiveMode;
}

/**
 * Props interface for the withViewport component.
 *
 * {@docCategory DetailsList}
 */
export declare interface IWithViewportProps {
    /**
     * Whether or not `withViewport` should disable its viewport measurements, effectively making this decorator
     * pass-through with no impact on the rendered component.
     *
     * Since `withViewport` measures the `viewport` on mount, after each React update, and in response to events,
     * it may cause a component which does not currently need this information due to its configuration to re-render
     * too often. `skipViewportMeasures` may be toggled on and off based on current state, and will suspend and resume
     * measurement as-needed.
     *
     * For example, when this wraps `DetailsList`, set `skipViewportMeasures` to `true` when the `layoutMode` is
     * `fixedColumns`, since the `DetailsList` does not use the viewport size in any calculations.
     *
     * In addition, consider setting `skipViewportMeasures` to `true` when running within a React test renderer, to avoid
     * direct DOM dependencies.
     */
    skipViewportMeasures?: boolean;
    /**
     * Whether or not to explicitly disable usage of the `ResizeObserver` in favor of a `'resize'` event on `window`,
     * even if the browser supports `ResizeObserver`. This may be necessary if use of `ResizeObserver` results in too
     * many re-renders of the wrapped component due to the frequency at which events are fired.
     *
     * This has no impact if `skipViewportMeasures` is `true`, as no viewport measurement strategy is used.
     */
    disableResizeObserver?: boolean;
    /**
     * Whether or not `withViewport` will delay before first measuring the viewport size.
     * Setting this will delay measurement by the same amount as the debounce for resizing the window.
     * This is useful for giving the child of the viewport time to render before measuring.
     *
     * This is an opt-in setting as existing systems have a dependency on immediate measurement for performance.
     * @default false
     */
    delayFirstMeasure?: boolean;
}

export declare interface IWithViewportState {
    viewport?: IViewport;
}

/**
 * {@docCategory SpinButton}
 */
export declare enum KeyboardSpinDirection {
    down = -1,
    notSpinning = 0,
    up = 1
}

export { KeyCodes }

export { keyframes }

/**
 * A callout corresponding to another Fabric component to describe a key sequence that will activate that component
 */
export declare class Keytip extends React_2.Component<IKeytipProps, {}> {
    render(): JSX.Element;
}

/**
 * A small element to help the target component correctly read out its aria-describedby for its Keytip
 * {@docCategory Keytips}
 */
export declare const KeytipData: React_2.FunctionComponent<IKeytipDataProps & IRenderComponent<{}>>;

export declare type KeytipDataOptions = IKeytipDataProps;

export declare namespace KeytipEvents {
    const KEYTIP_ADDED = "keytipAdded";
    const KEYTIP_REMOVED = "keytipRemoved";
    const KEYTIP_UPDATED = "keytipUpdated";
    const PERSISTED_KEYTIP_ADDED = "persistedKeytipAdded";
    const PERSISTED_KEYTIP_REMOVED = "persistedKeytipRemoved";
    const PERSISTED_KEYTIP_EXECUTE = "persistedKeytipExecute";
    const ENTER_KEYTIP_MODE = "enterKeytipMode";
    const EXIT_KEYTIP_MODE = "exitKeytipMode";
}

export declare const KeytipLayer: React_2.FunctionComponent<IKeytipLayerProps>;

/**
 * A layer that holds all keytip items
 * {@docCategory Keytips}
 */
export declare class KeytipLayerBase extends React_2.Component<IKeytipLayerProps, IKeytipLayerState> {
    static defaultProps: IKeytipLayerProps;
    private _events;
    private _async;
    private _keytipTree;
    private _keytipManager;
    private _classNames;
    private _currentSequence;
    private _newCurrentKeytipSequences?;
    private _delayedKeytipQueue;
    private _delayedQueueTimeout;
    private _keyHandled;
    constructor(props: IKeytipLayerProps, context: any);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getCurrentSequence(): string;
    getKeytipTree(): KeytipTree;
    /**
     * Processes an IKeytipTransitionKey entered by the user
     *
     * @param transitionKey - IKeytipTransitionKey received by the layer to process
     */
    processTransitionInput(transitionKey: IKeytipTransitionKey, ev?: React_2.KeyboardEvent<HTMLElement>): void;
    /**
     * Processes inputs from the document listener and traverse the keytip tree
     *
     * @param key - Key pressed by the user
     */
    processInput(key: string, ev?: React_2.KeyboardEvent<HTMLElement>): void;
    /**
     * Show the given keytips and hide all others
     *
     * @param ids - Keytip IDs to show
     */
    showKeytips(ids: string[]): void;
    /**
     * Enters keytip mode for this layer
     */
    private _enterKeytipMode;
    private _buildTree;
    /**
     * Exits keytip mode for this layer
     */
    private _exitKeytipMode;
    /**
     * Sets the keytips state property
     *
     * @param keytipProps - Keytips to set in this layer
     */
    private _setKeytips;
    /**
     * Callback function to use for persisted keytips
     *
     * @param overflowButtonSequences - The overflow button sequence to execute
     * @param keytipSequences - The keytip that should become the 'currentKeytip' when it is registered
     */
    private _persistedKeytipExecute;
    private _getVisibleKeytips;
    private _onDismiss;
    private _onKeyDown;
    /**
     * Gets the ModifierKeyCodes based on the keyboard event
     *
     * @param ev - React.KeyboardEvent
     * @returns List of ModifierKeyCodes that were pressed
     */
    private _getModifierKey;
    private _onKeyPress;
    private _onKeytipAdded;
    private _onKeytipUpdated;
    /**
     * Helper function to do checks related to persisted/overflow keytips
     * Done on keytip added and keytip updated
     *
     * @param keytipProps - Keytip props
     */
    private _persistedKeytipChecks;
    private _onKeytipRemoved;
    private _onPersistedKeytipAdded;
    private _onPersistedKeytipRemoved;
    private _onPersistedKeytipExecute;
    /**
     * Trigger a keytip immediately and set it as the current keytip
     *
     * @param keytipProps - Keytip to trigger immediately
     */
    private _triggerKeytipImmediately;
    private _addKeytipToQueue;
    private _removeKeytipFromQueue;
    private _getKtpExecuteTarget;
    private _getKtpTarget;
    /**
     * Returns T/F if the keytipProps keySequences match the currentKeytip, and the currentKeytip is in an overflow well
     * This will make 'keytipProps' the new currentKeytip
     *
     * @param keytipProps - Keytip props to check
     * @returns - T/F if this keytip should become the currentKeytip
     */
    private _isCurrentKeytipAnAlias;
    /**
     * Sets if we are in keytip mode.
     * Note, this sets both the state for the layer as well as
     * the value that the manager will expose externally.
     * @param inKeytipMode - Boolean so set whether we are in keytip mode or not
     */
    private _setInKeytipMode;
    /**
     * Emits a warning if duplicate keytips are found for the children of the current keytip
     */
    private _warnIfDuplicateKeytips;
    /**
     * Returns duplicates among keytip IDs.
     * If the returned array is empty, no duplicates were found.
     *
     * @param keytipIds - Array of keytip IDs to find duplicates for
     * @returns - Array of duplicates that were found. Each duplicate will only be added once to this array.
     */
    private _getDuplicateIds;
}

/**
 * This class is responsible for handling registering, updating, and unregistering of keytips
 */
export declare class KeytipManager {
    private static _instance;
    keytips: {
        [key: string]: IUniqueKeytip;
    };
    persistedKeytips: {
        [key: string]: IUniqueKeytip;
    };
    sequenceMapping: {
        [key: string]: IKeytipProps;
    };
    inKeytipMode: boolean;
    shouldEnterKeytipMode: boolean;
    delayUpdatingKeytipChange: boolean;
    /**
     * Static function to get singleton KeytipManager instance
     *
     * @returns Singleton KeytipManager instance
     */
    static getInstance(): KeytipManager;
    /**
     * Initialization code to set set parameters to define
     * how the KeytipManager handles keytip data.
     *
     * @param delayUpdatingKeytipChange - T/F if we should delay notifiying keytip subscribers
     * of keytip changes
     */
    init(delayUpdatingKeytipChange: boolean): void;
    /**
     * Registers a keytip
     *
     * @param keytipProps - Keytip to register
     * @param persisted - T/F if this keytip should be persisted, default is false
     * @returns Unique ID for this keytip
     */
    register(keytipProps: IKeytipProps, persisted?: boolean): string;
    /**
     * Update a keytip
     *
     * @param keytipProps - Keytip to update
     * @param uniqueID - Unique ID of this keytip
     */
    update(keytipProps: IKeytipProps, uniqueID: string): void;
    /**
     * Unregisters a keytip
     *
     * @param keytipToRemove - IKeytipProps of the keytip to remove
     * @param uniqueID - Unique ID of this keytip
     * @param persisted - T/F if this keytip should be persisted, default is false
     */
    unregister(keytipToRemove: IKeytipProps, uniqueID: string, persisted?: boolean): void;
    /**
     * Manual call to enter keytip mode
     */
    enterKeytipMode(): void;
    /**
     * Manual call to exit keytip mode
     */
    exitKeytipMode(): void;
    /**
     * Gets all IKeytipProps from this.keytips
     *
     * @returns All keytips stored in the manager
     */
    getKeytips(): IKeytipProps[];
    /**
     * Adds the overflowSetSequence to the keytipProps if its parent keytip also has it
     *
     * @param keytipProps - Keytip props to add overflowSetSequence to if necessary
     * @returns - Modified keytip props, if needed to be modified
     */
    addParentOverflow(keytipProps: IKeytipProps): IKeytipProps;
    /**
     * Public function to bind for overflow items that have a submenu
     */
    menuExecute(overflowButtonSequences: string[], keytipSequences: string[]): void;
    /**
     * Creates an IUniqueKeytip object
     *
     * @param keytipProps - IKeytipProps
     * @param uniqueID - Unique ID, will default to the next unique ID if not passed
     * @returns IUniqueKeytip object
     */
    private _getUniqueKtp;
}

export declare type KeytipTransitionModifier = typeof KeyCodes.shift | typeof KeyCodes.ctrl | typeof KeyCodes.alt | typeof KeyCodes.leftWindow;

/**
 * This class is responsible for handling the parent/child relationships between keytips
 */
declare class KeytipTree {
    currentKeytip?: IKeytipTreeNode;
    root: IKeytipTreeNode;
    nodeMap: {
        [nodeId: string]: IKeytipTreeNode;
    };
    /**
     * KeytipTree constructor
     */
    constructor();
    /**
     * Add a keytip node to this KeytipTree
     *
     * @param keytipProps - Keytip to add to the Tree
     * @param uniqueID - Unique ID for this keytip
     * @param persisted - T/F if this keytip should be marked as persisted
     */
    addNode(keytipProps: IKeytipProps, uniqueID: string, persisted?: boolean): void;
    /**
     * Updates a node in the tree
     *
     * @param keytipProps - Keytip props to update
     * @param uniqueID - Unique ID for this keytip
     */
    updateNode(keytipProps: IKeytipProps, uniqueID: string): void;
    /**
     * Removes a node from the KeytipTree
     *
     * @param sequence - full string of the node to remove
     */
    removeNode(keytipProps: IKeytipProps, uniqueID: string): void;
    /**
     * Searches the currentKeytip's children to exactly match a sequence. Will not match disabled nodes but
     * will match persisted nodes
     *
     * @param keySequence - string to match
     * @param currentKeytip - The keytip whose children will try to match
     * @returns The node that exactly matched the keySequence, or undefined if none matched
     */
    getExactMatchedNode(keySequence: string, currentKeytip: IKeytipTreeNode): IKeytipTreeNode | undefined;
    /**
     * Searches the currentKeytip's children to find nodes that start with the given sequence. Will not match
     * disabled nodes but will match persisted nodes
     *
     * @param keySequence - string to partially match
     * @param currentKeytip - The keytip whose children will try to partially match
     * @returns List of tree nodes that partially match the given sequence
     */
    getPartiallyMatchedNodes(keySequence: string, currentKeytip: IKeytipTreeNode): IKeytipTreeNode[];
    /**
     * Get the non-persisted children of the give node
     * If no node is given, will use the 'currentKeytip'
     *
     * @param node - Node to get the children for
     * @returns List of node IDs that are the children of the node
     */
    getChildren(node?: IKeytipTreeNode): string[];
    /**
     * Gets all nodes from their IDs
     *
     * @param ids - List of keytip IDs
     * @returns Array of nodes that match the given IDs, can be empty
     */
    getNodes(ids: string[]): IKeytipTreeNode[];
    /**
     * Gets a single node from its ID
     *
     * @param id - ID of the node to get
     * @returns Node with the given ID, if found
     */
    getNode(id: string): IKeytipTreeNode | undefined;
    /**
     * Tests if the currentKeytip in this.keytipTree is the parent of 'keytipProps'
     *
     * @param keytipProps - Keytip to test the parent for
     * @returns T/F if the currentKeytip is this keytipProps' parent
     */
    isCurrentKeytipParent(keytipProps: IKeytipProps): boolean;
    private _getParentID;
    private _getFullSequence;
    private _getNodeSequence;
    private _createNode;
    private _removeChildFromParents;
}

export declare const KTP_ARIA_SEPARATOR = ", ";

export declare const KTP_FULL_PREFIX: string;

export declare const KTP_LAYER_ID = "ktp-layer-id";

export declare const KTP_PREFIX = "ktp";

export declare const KTP_SEPARATOR = "-";

/**
 * Constructs the data-ktp-execute-target attribute selector from a keytip ID.
 *
 * @param keytipId - ID of the Keytip.
 * @returns String selector to use to query for the keytip execute target.
 */
export declare function ktpTargetFromId(keytipId: string): string;

/**
 * Constructs the data-ktp-target attribute selector from a full key sequence.
 *
 * @param keySequences - Full string[] for a Keytip.
 * @returns String selector to use to query for the keytip target.
 */
export declare function ktpTargetFromSequences(keySequences: string[]): string;

export declare const Label: React_2.FunctionComponent<ILabelProps>;

export declare class LabelBase extends React_2.Component<ILabelProps, {}> {
    render(): JSX.Element;
}

export { labelProperties }

export declare const Layer: React_2.FunctionComponent<ILayerProps>;

export declare const LayerBase: React_2.FunctionComponent<ILayerProps>;

export declare const LayerHost: React_2.FunctionComponent<ILayerHostProps>;

export declare const Link: React_2.FunctionComponent<ILinkProps>;

export declare const LinkBase: React_2.FunctionComponent<ILinkProps>;

export { liProperties }

/**
 * The List renders virtualized pages of items. Each page's item count is determined by the getItemCountForPage callback
 * if provided by the caller, or 10 as default. Each page's height is determined by the getPageHeight callback if
 * provided by the caller, or by cached measurements if available, or by a running average, or a default fallback.
 *
 * The algorithm for rendering pages works like this:
 *
 * 1. Predict visible pages based on "current measure data" (page heights, surface position, visible window)
 * 2. If changes are necessary, apply changes (add/remove pages)
 * 3. For pages that are added, measure the page heights if we need to using getBoundingClientRect
 * 4. If measurements don't match predictions, update measure data and goto step 1 asynchronously
 *
 * Measuring too frequently can pull performance down significantly. To compensate, we cache measured values so that
 * we can avoid re-measuring during operations that should not alter heights, like scrolling.
 *
 * To optimize glass rendering performance, onShouldVirtualize can be set. When onShouldVirtualize return false,
 * List will run in fast mode (not virtualized) to render all items without any measurements to improve page load time.
 * And we start doing measurements and rendering in virtualized mode when items grows larger than this threshold.
 *
 * However, certain operations can make measure data stale. For example, resizing the list, or passing in new props,
 * or forcing an update change cause pages to shrink/grow. When these operations occur, we increment a measureVersion
 * number, which we associate with cached measurements and use to determine if a remeasure should occur.
 */
export declare class List<T = any> extends React_2.Component<IListProps<T>, IListState<T>> implements IList {
    static defaultProps: {
        startIndex: number;
        onRenderCell: (item: any, index: number, containsFocus: boolean) => JSX.Element;
        onRenderCellConditional: undefined;
        renderedWindowsAhead: number;
        renderedWindowsBehind: number;
    };
    private _root;
    private _surface;
    private _pageRefs;
    private _async;
    private _events;
    private _estimatedPageHeight;
    private _totalEstimates;
    private _cachedPageHeights;
    private _focusedIndex;
    private _scrollElement?;
    private _hasCompletedFirstRender;
    private _surfaceRect;
    private _requiredRect;
    private _allowedRect;
    private _visibleRect;
    private _materializedRect;
    private _requiredWindowsAhead;
    private _requiredWindowsBehind;
    private _measureVersion;
    private _scrollHeight?;
    private _scrollTop;
    private _pageCache;
    static getDerivedStateFromProps<U = any>(nextProps: IListProps<U>, previousState: IListState<U>): IListState<U>;
    constructor(props: IListProps<T>);
    get pageRefs(): Readonly<Record<string, unknown>>;
    /**
     * Scroll to the given index. By default will bring the page the specified item is on into the view. If a callback
     * to measure the height of an individual item is specified, will only scroll to bring the specific item into view.
     *
     * Note: with items of variable height and no passed in `getPageHeight` method, the list might jump after scrolling
     * when windows before/ahead are being rendered, and the estimated height is replaced using actual elements.
     *
     * @param index - Index of item to scroll to
     * @param measureItem - Optional callback to measure the height of an individual item
     * @param scrollToMode - Optional defines where in the window the item should be positioned to when scrolling
     */
    scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void;
    getStartItemIndexInView(measureItem?: (itemIndex: number) => number): number;
    componentDidMount(): void;
    componentDidUpdate(previousProps: IListProps, previousState: IListState<T>): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(newProps: IListProps<T>, newState: IListState<T>): boolean;
    forceUpdate(): void;
    /**
     * Get the current height the list and it's pages.
     */
    getTotalListHeight(): number;
    render(): JSX.Element | null;
    private _getDerivedStateFromProps;
    private _shouldVirtualize;
    /**
     * when props.items change or forceUpdate called, throw away cached pages
     */
    private _invalidatePageCache;
    private _renderPage;
    private _onRenderRoot;
    private _onRenderSurface;
    /** Generate the style object for the page. */
    private _getPageStyle;
    private _onRenderPage;
    /** Track the last item index focused so that we ensure we keep it rendered. */
    private _onFocus;
    /**
     * Called synchronously to reset the required render range to 0 on scrolling. After async scroll has executed,
     * we will call onAsyncIdle which will reset it back to it's correct value.
     */
    private _onScroll;
    private _resetRequiredWindows;
    /**
     * Debounced method to asynchronously update the visible region on a scroll event.
     */
    private _onAsyncScroll;
    /**
     * This is an async debounced method that will try and increment the windows we render. If we can increment
     * either, we increase the amount we render and re-evaluate.
     */
    private _onAsyncIdle;
    /**
     * Function to call when the list is done scrolling.
     * This function is debounced.
     */
    private _onScrollingDone;
    private _onAsyncResize;
    private _updatePages;
    /**
     * Notify consumers that the rendered pages have changed
     * @param oldPages - The old pages
     * @param newPages - The new pages
     * @param props - The props to use
     */
    private _notifyPageChanges;
    private _updatePageMeasurements;
    /**
     * Given a page, measure its dimensions, update cache.
     * @returns True if the height has changed.
     */
    private _measurePage;
    /** Called when a page has been added to the DOM. */
    private _onPageAdded;
    /** Called when a page has been removed from the DOM. */
    private _onPageRemoved;
    /** Build up the pages that should be rendered. */
    private _buildPages;
    private _getPageSpecification;
    /**
     * Get the pixel height of a give page. Will use the props getPageHeight first, and if not provided, fallback to
     * cached height, or estimated page height, or default page height.
     */
    private _getPageHeight;
    private _getItemCountForPage;
    private _createPage;
    private _getRenderCount;
    /** Calculate the visible rect within the list where top: 0 and left: 0 is the top/left of the list. */
    private _updateRenderRects;
}

export declare const ListPeoplePicker: React_2.FunctionComponent<IPeoplePickerProps>;

/**
 * MemberList layout. The selected people show up below the search box.
 * {@docCategory PeoplePicker}
 */
export declare class ListPeoplePickerBase extends MemberListPeoplePicker {
    /** Default props for ListPeoplePicker. */
    static defaultProps: {
        onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
        onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps) => JSX.Element;
        createGenericItem: typeof createGenericItem;
    };
}

export { loadTheme }

export { LocalizedFontFamilies }

export { LocalizedFontNames }

/**
 * Registers a css object, optionally as a function of the theme.
 *
 * @param styleOrFunction - Either a css javascript object, or a function which takes in `ITheme`
 * and returns a css javascript object.
 *
 * @deprecated Use `mergeStyles` instead for v8 related code. We will be using a new implementation of `makeStyles` in
 * future versions of the library.
 */
export declare function makeStyles<TStyleSet extends {
    [key in keyof TStyleSet]: IStyle;
} = {
    [key: string]: IStyle;
}>(styleOrFunction: TStyleSet | ((theme: Theme) => TStyleSet)): (options?: UseStylesOptions) => StylesClassMapping<TStyleSet>;

export { mapEnumByName }

export declare const MarqueeSelection: React_2.FunctionComponent<IMarqueeSelectionProps>;

export declare const MaskedTextField: React_2.FunctionComponent<IMaskedTextFieldProps>;

export declare const MAX_COLOR_ALPHA = 100;

export declare const MAX_COLOR_HUE = 359;

export declare const MAX_COLOR_RGB = 255;

/** @deprecated Use MAX_COLOR_RGB (255) or MAX_COLOR_ALPHA (100) */
export declare const MAX_COLOR_RGBA = 255;

export declare const MAX_COLOR_SATURATION = 100;

export declare const MAX_COLOR_VALUE = 100;

/** Maximum length for a hexadecimal color string (not including the #) */
export declare const MAX_HEX_LENGTH = 6;

/** Maximum length for a string of an RGBA color component */
export declare const MAX_RGBA_LENGTH = 3;

export declare const MeasuredContext: React_2.Context<{
    isMeasured: boolean;
}>;

/**
 * {@docCategory PeoplePicker}
 */
export declare class MemberListPeoplePicker extends BasePickerListBelow<IPersonaProps, IPeoplePickerProps> {
}

export { memoize }

export { memoizeFunction }

export { merge }

export { mergeAriaAttributeValues }

export { mergeCustomizations }

/**
 * Merges an overflow sequence with a key sequence.
 *
 * @param keySequences - Full sequence for one keytip.
 * @param overflowKeySequences - Full overflow keytip sequence.
 * @returns Sequence that will be used by the keytip when in the overflow.
 */
export declare function mergeOverflows(keySequences: string[], overflowKeySequences: string[]): string[];

export { mergeScopedSettings }

export { mergeSettings }

export { mergeStyles }

export { mergeStyleSets }

export { mergeThemes }

export declare const MessageBar: React_2.FunctionComponent<IMessageBarProps>;

export declare const MessageBarBase: React_2.FunctionComponent<IMessageBarProps>;

/**
 * {@docCategory MessageBar}
 */
export declare class MessageBarButton extends React_2.Component<IButtonProps, {}> {
    render(): JSX.Element;
}

/**
 * {@docCategory MessageBar}
 */
export declare enum MessageBarType {
    /** Info styled MessageBar */
    info = 0,
    /** Error styled MessageBar */
    error = 1,
    /** Blocked styled MessageBar */
    blocked = 2,
    /** SevereWarning styled MessageBar */
    severeWarning = 3,
    /** Success styled MessageBar */
    success = 4,
    /** Warning styled MessageBar */
    warning = 5
}

/** Minimum length for a hexadecimal color string (not including the #) */
export declare const MIN_HEX_LENGTH = 3;

/** Minimum length for a string of an RGBA color component */
export declare const MIN_RGBA_LENGTH = 1;

export declare const Modal: React_2.FunctionComponent<IModalProps>;

export declare const ModalBase: React_2.FunctionComponent<IModalProps>;

export { modalize }

export { MonthOfYear }

export { MotionAnimations }

export { MotionDurations }

export { MotionTimings }

export declare const Nav: React_2.FunctionComponent<INavProps>;

export declare class NavBase extends React_2.Component<INavProps, INavState> implements INav {
    static defaultProps: INavProps;
    private _focusZone;
    constructor(props: INavProps);
    render(): JSX.Element | null;
    get selectedKey(): string | undefined;
    /**
     * Sets focus to the first tabbable item in the zone.
     * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
     * if focus is already in the focus zone.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    focus(forceIntoFirstElement?: boolean): boolean;
    private _onRenderLink;
    private _renderNavLink;
    private _renderCompositeLink;
    private _renderLink;
    private _renderLinks;
    private _renderGroup;
    private _renderGroupHeader;
    private _onGroupHeaderClicked;
    private _onLinkExpandClicked;
    private _preventBounce;
    private _onNavAnchorLinkClicked;
    private _onNavButtonLinkClicked;
    private _isLinkSelected;
    private _isGroupExpanded;
    private _toggleCollapsed;
}

export { NeutralColors }

export { normalize }

export declare const NormalPeoplePicker: React_2.FunctionComponent<IPeoplePickerProps>;

/**
 * Standard People Picker.
 * {@docCategory PeoplePicker}
 */
export declare class NormalPeoplePickerBase extends BasePeoplePicker {
    /** Default props for NormalPeoplePicker. */
    static defaultProps: {
        onRenderItem: (props: IPeoplePickerItemSelectedProps) => JSX.Element;
        onRenderSuggestionsItem: (personaProps: IPersonaProps, suggestionsProps?: IBasePickerSuggestionsProps) => JSX.Element;
        createGenericItem: typeof createGenericItem;
    };
}

/**
 * Used for notifying applicable Layers that a host is available/unavailable and to re-evaluate Layers that
 * care about the specific host.
 */
export declare function notifyHostChanged(id: string): void;

export { noWrap }

export { nullRender }

export { olProperties }

export { omit }

export { Omit_2 as Omit }

export { on }

/**
 * {@docCategory HoverCard}
 */
export declare enum OpenCardMode {
    /**
     * Open card by hover
     */
    hover = 0,
    /**
     * Open card by hot key
     */
    hotKey = 1
}

export { optionProperties }

/**
 * {@docCategory Facepile}
 */
export declare enum OverflowButtonType {
    /** No overflow */
    none = 0,
    /** +1 overflow icon */
    descriptive = 1,
    /** More overflow icon */
    more = 2,
    /** Chevron overflow icon */
    downArrow = 3
}

export declare const OverflowSet: React_2.FunctionComponent<IOverflowSetProps>;

export declare const OverflowSetBase: React_2.FunctionComponent<IOverflowSetProps>;

export declare const Overlay: React_2.FunctionComponent<IOverlayProps>;

export declare class OverlayBase extends React_2.Component<IOverlayProps, {}> {
    private _allowTouchBodyScroll;
    constructor(props: IOverlayProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

/**
 * Panel description
 */
export declare const Panel: React_2.FunctionComponent<IPanelProps>;

export declare class PanelBase extends React_2.Component<IPanelProps, IPanelState> implements IPanel {
    static defaultProps: IPanelProps;
    private _async;
    private _events;
    private _panel;
    private _classNames;
    private _scrollableContent;
    private _animationCallback;
    private _hasCustomNavigation;
    private _headerTextId;
    private _allowTouchBodyScroll;
    static getDerivedStateFromProps(nextProps: Readonly<IPanelProps>, prevState: Readonly<IPanelState>): Partial<IPanelState> | null;
    constructor(props: IPanelProps);
    componentDidMount(): void;
    componentDidUpdate(previousProps: IPanelProps, previousState: IPanelState): void;
    componentWillUnmount(): void;
    render(): JSX.Element | null;
    open(): void;
    close(): void;
    dismiss: (ev?: React_2.SyntheticEvent<HTMLElement> | KeyboardEvent) => void;
    /** isActive is true when panel is open or opening. */
    get isActive(): boolean;
    private _allowScrollOnPanel;
    private _shouldListenForOuterClick;
    private _onRenderNavigation;
    private _onRenderNavigationContent;
    private _onRenderHeader;
    private _onRenderBody;
    private _onRenderFooter;
    private _updateFooterPosition;
    private _dismissOnOuterClick;
    private _animateTo;
    private _clearExistingAnimationTimer;
    private _onPanelClick;
    private _onTransitionComplete;
}

/**
 * {@docCategory Panel}
 */
export declare enum PanelType {
    /**
     * Renders the Panel with a `fluid` (full screen) width.
     * Recommended for use on small screen breakpoints.
     * - Small (320-479): full screen width, 16px left/right padding
     * - Medium (480-639): full screen width, 16px left/right padding
     * - Large (640-1023): full screen width, 32px left/right padding
     * - XLarge (1024-1365): full screen width, 32px left/right padding
     * - XXLarge (1366-up): full screen width, 40px left/right padding
     */
    smallFluid = 0,
    /**
     * Renders the Panel in fixed-width `small` size, anchored to the far side (right in LTR mode).
     * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
     * - Medium (480-639): 340px width, 16px left/right padding
     * - Large (640-1023): 340px width, 32px left/right padding
     * - XLarge (1024-1365): 340px width, 32px left/right padding
     * - XXLarge (1366-up): 340px width, 40px left/right padding
     */
    smallFixedFar = 1,
    /**
     * Renders the Panel in fixed-width `small` size, anchored to the near side (left in LTR mode).
     * - Small (320-479): 272px width, 16px left/right padding
     * - Medium (480-639): 272px width, 16px left/right padding
     * - Large (640-1023): 272px width, 32px left/right padding
     * - XLarge (1024-1365): 272px width, 32px left/right padding
     * - XXLarge (1366-up): 272px width, 40px left/right padding
     */
    smallFixedNear = 2,
    /**
     * Renders the Panel in `medium` size, anchored to the far side (right in LTR mode).
     * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
     * - Medium (480-639): adapts to `PanelType.smallFixedFar` at this breakpoint
     * - Large (640-1023): 592px width, 32px left/right padding
     * - XLarge (1024-1365): 644px width, 32px left/right padding
     * - XXLarge (1366-up): 644px width, 40px left/right padding
     */
    medium = 3,
    /**
     * Renders the Panel in `large` size, anchored to the far side (right in LTR mode).
     * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
     * - Medium (480-639):  adapts to `PanelType.smallFixedFar` at this breakpoint
     * - Large (640-1023): adapts to `PanelType.medium` at this breakpoint
     * - XLarge (1024-1365): 48px fixed left margin, fluid width, 32px left/right padding
     * - XXLarge (1366-up): 428px fixed left margin, fluid width, 40px left/right padding
     */
    large = 4,
    /**
     * Renders the Panel in `large` size, anchored to the far side (right in LTR mode), with a fixed width at
     * XX-Large breakpoint.
     * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
     * - Medium (480-639): adapts to `PanelType.smallFixedFar` at this breakpoint
     * - Large (640-1023): adapts to `PanelType.medium` at this breakpoint
     * - XLarge (1024-1365): 48px fixed left margin, fluid width, 32px left/right padding
     * - XXLarge (1366-up): 940px width, 40px left/right padding
     */
    largeFixed = 5,
    /**
     * Renders the Panel in `extra large` size, anchored to the far side (right in LTR mode).
     * - Small (320-479): adapts to `PanelType.smallFluid` at this breakpoint
     * - Medium (480-639): adapts to `PanelType.smallFixedFar` at this breakpoint
     * - Large (640-1023): adapts to `PanelType.medium` at this breakpoint
     * - XLarge (1024-1365): adapts to `PanelType.large` at this breakpoint
     * - XXLarge (1366-1919): 176px fixed left margin, fluid width, 40px left/right padding
     * - XXXLarge (1920-up): 176px fixed left margin, fluid width, 40px left/right padding
     */
    extraLarge = 6,
    /**
     * Renders the Panel in `custom` size using `customWidth`, anchored to the far side (right in LTR mode).
     * - Has a fixed width provided by the `customWidth` prop
     * - When screen width reaches the `customWidth` value it will behave like a fluid width Panel
     * taking up 100% of the viewport width
     */
    custom = 7,
    /**
     * Renders the Panel in `custom` size using `customWidth`, anchored to the near side (left in LTR mode).
     * - Has a fixed width provided by the `customWidth` prop
     * - When screen width reaches the `customWidth` value it will behave like a fluid width Panel
     * taking up 100% of the viewport width
     */
    customNear = 8
}

declare enum PanelVisibilityState {
    closed = 0,
    animatingOpen = 1,
    open = 2,
    animatingClosed = 3
}

export { PartialTheme }

export declare const PeoplePickerItem: React_2.FunctionComponent<IPeoplePickerItemSelectedProps>;

export declare const PeoplePickerItemBase: (props: IPeoplePickerItemSelectedProps) => JSX.Element;

export declare const PeoplePickerItemSuggestion: React_2.FunctionComponent<IPeoplePickerItemSuggestionProps>;

export declare const PeoplePickerItemSuggestionBase: (props: IPeoplePickerItemSuggestionProps) => JSX.Element;

/**
 * Personas are used for rendering an individual's avatar, presence and details.
 * They are used within the PeoplePicker components.
 */
export declare const Persona: React_2.FunctionComponent<IPersonaProps>;

/**
 * Persona with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/microsoft/fluentui/wiki/Styling)
 */
export declare const PersonaBase: React_2.FunctionComponent<IPersonaProps>;

/**
 * PersonaCoin is used to render an individual's avatar and presence.
 */
export declare const PersonaCoin: React_2.FunctionComponent<IPersonaCoinProps>;

/**
 * PersonaCoin with no default styles.
 * [Use the `getStyles` API to add your own styles.](https://github.com/microsoft/fluentui/wiki/Styling)
 */
export declare const PersonaCoinBase: React_2.FunctionComponent<IPersonaCoinProps>;

/**
 * {@docCategory Persona}
 */
export declare enum PersonaInitialsColor {
    lightBlue = 0,
    blue = 1,
    darkBlue = 2,
    teal = 3,
    lightGreen = 4,
    green = 5,
    darkGreen = 6,
    lightPink = 7,
    pink = 8,
    magenta = 9,
    purple = 10,
    /**
     * @deprecated `black` is a color that can result in offensive persona coins with some initials combinations,
     * so it can only be set with overrides. Will be removed in a future major release.
     */
    black = 11,
    orange = 12,
    /**
     * @deprecated `red` is a color that often has a special meaning, so it is considered a reserved color and
     * can only be set with overrides. Will be removed in a future major release.
     */
    red = 13,
    darkRed = 14,
    /**
     * Transparent is not intended to be used with typical initials due to accessibility issues.
     * Its primary use is for overflow buttons, so it is considered a reserved color and can only be set with overrides.
     */
    transparent = 15,
    violet = 16,
    lightRed = 17,
    gold = 18,
    burgundy = 19,
    warmGray = 20,
    coolGray = 21,
    /**
     * `gray` is a color that can result in offensive persona coins with some initials combinations,
     * so it can only be set with overrides.
     */
    gray = 22,
    cyan = 23,
    rust = 24
}

/**
 * {@docCategory Persona}
 */
export declare enum PersonaPresence {
    none = 0,
    offline = 1,
    online = 2,
    away = 3,
    dnd = 4,
    blocked = 5,
    busy = 6
}

export declare namespace personaPresenceSize {
    const size6 = "6px";
    const size8 = "8px";
    const size12 = "12px";
    const size16 = "16px";
    const size20 = "20px";
    const size28 = "28px";
    const size32 = "32px";
    /**
     * @deprecated This is now unused
     */
    const border = "2px";
}

/**
 * {@docCategory Persona}
 */
export declare enum PersonaSize {
    /**
     * Deprecated in favor of standardized numeric sizing.
     * @deprecated Use `size8` instead.
     */
    tiny = 0,
    /**
     * Deprecated in favor of standardized numeric sizing.
     * @deprecated Use `size24` instead.
     */
    extraExtraSmall = 1,
    /**
     * Deprecated in favor of standardized numeric sizing.
     * @deprecated Use `size32` instead.
     */
    extraSmall = 2,
    /**
     * Deprecated in favor of standardized numeric sizing.
     * @deprecated Use `size40` instead.
     */
    small = 3,
    /**
     * Deprecated in favor of standardized numeric sizing.
     * @deprecated Use `size48` instead.
     */
    regular = 4,
    /**
     * Deprecated in favor of standardized numeric sizing.
     * @deprecated Use `size72` instead.
     */
    large = 5,
    /**
     * Deprecated in favor of standardized numeric sizing.
     * @deprecated Use `size100` instead.
     */
    extraLarge = 6,
    /**
     * No `PersonaCoin` is rendered.
     */
    size8 = 17,
    /**
     * No `PersonaCoin` is rendered. Deprecated to align with design specifications.
     * @deprecated Use `size8` instead.
     */
    size10 = 9,
    /**
     * Renders a 16px `PersonaCoin`.
     * @deprecated Deprecated due to not being in the design specification.
     */
    size16 = 8,
    /**
     * Renders a 24px `PersonaCoin`.
     */
    size24 = 10,
    /**
     * Renders a 28px `PersonaCoin`.
     * @deprecated Deprecated due to not being in the design specification.
     */
    size28 = 7,
    /**
     * Renders a 32px `PersonaCoin`.
     */
    size32 = 11,
    /**
     * Renders a 40px `PersonaCoin`.
     */
    size40 = 12,
    /**
     * Renders a 48px `PersonaCoin`.
     */
    size48 = 13,
    /**
     * Renders a 56px `PersonaCoin`.
     */
    size56 = 16,
    /**
     * Renders a 72px `PersonaCoin`.
     */
    size72 = 14,
    /**
     * Renders a 100px `PersonaCoin`.
     */
    size100 = 15,
    /**
     * Renders a 120px `PersonaCoin`.
     */
    size120 = 18
}

export declare namespace personaSize {
    const size8 = "20px";
    const size10 = "20px";
    const size16 = "16px";
    const size24 = "24px";
    const size28 = "28px";
    const size32 = "32px";
    const size40 = "40px";
    const size48 = "48px";
    const size56 = "56px";
    const size72 = "72px";
    const size100 = "100px";
    const size120 = "120px";
}

/**
 * The Pivot control and related tabs pattern are used for navigating frequently accessed,
 * distinct content categories. Pivots allow for navigation between two or more content
 * views and relies on text headers to articulate the different sections of content.
 */
export declare const Pivot: React_2.FunctionComponent<IPivotProps>;

export declare const PivotBase: React_2.FunctionComponent<IPivotProps>;

export declare class PivotItem extends React_2.Component<IPivotItemProps, {}> {
    constructor(props: IPivotItemProps);
    render(): JSX.Element;
}

/**
 * {@docCategory Pivot}
 * @deprecated Use strings 'links' or 'tabs' instead of this enum
 */
export declare const enum PivotLinkFormat {
    /**
     * Display Pivot Links as links
     */
    links = "links",
    /**
     * Display Pivot Links as Tabs
     */
    tabs = "tabs"
}

/**
 * {@docCategory Pivot}
 * Display mode for the pivot links/tabs
 */
export declare type PivotLinkFormatType = 'links' | 'tabs';

/**
 * {@docCategory Pivot}
 * @deprecated Use strings 'normal' or 'large' instead of this enum
 */
export declare const enum PivotLinkSize {
    /**
     * Display Link using normal font size
     */
    normal = "normal",
    /**
     * Display links using large font size
     */
    large = "large"
}

/**
 * {@docCategory Pivot}
 * Size of the pivot links/tabs
 */
export declare type PivotLinkSizeType = 'normal' | 'large';

export declare const PlainCard: React_2.FunctionComponent<IPlainCardProps>;

export declare class PlainCardBase extends React_2.Component<IPlainCardProps, {}> {
    private _classNames;
    constructor(props: IPlainCardProps);
    render(): JSX.Element;
    private _onKeyDown;
}

export { Point }

/**
 * This adds accessibility to Dialog and Panel controls
 */
export declare const Popup: React_2.FunctionComponent<IPopupProps>;

export { portalContainsElement }

export declare enum Position {
    top = 0,
    bottom = 1,
    start = 2,
    end = 3
}

export declare function positionCallout(props: IPositionProps, hostElement: HTMLElement, elementToPosition: HTMLElement, previousPositions?: ICalloutPositionedInfo): ICalloutPositionedInfo;

export declare function positionCard(props: IPositionProps, hostElement: HTMLElement, elementToPosition: HTMLElement, previousPositions?: ICalloutPositionedInfo): ICalloutPositionedInfo;

/**
 * Used to position an element relative to the given positioning props.
 * If positioning has been completed before, previousPositions can be passed to ensure that the positioning element
 * repositions based on its previous targets rather than starting with directionalhint.
 */
export declare function positionElement(props: IPositionProps, hostElement: HTMLElement, elementToPosition: HTMLElement, previousPositions?: IPositionedData): IPositionedData;

export declare const PositioningContainer: React_2.FunctionComponent<IPositioningContainerProps>;

export { precisionRound }

export declare const presenceBoolean: (presence: PersonaPresence) => {
    isAvailable: boolean;
    isAway: boolean;
    isBlocked: boolean;
    isBusy: boolean;
    isDoNotDisturb: boolean;
    isOffline: boolean;
};

/**
 * {@docCategory Button}
 */
export declare class PrimaryButton extends React_2.Component<IButtonProps, {}> {
    render(): JSX.Element;
}

/**
 * ProgressIndicator description
 */
export declare const ProgressIndicator: React_2.FunctionComponent<IProgressIndicatorProps>;

/**
 * ProgressIndicator with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/microsoft/fluentui/wiki/Styling)
 */
export declare class ProgressIndicatorBase extends React_2.Component<IProgressIndicatorProps, {}> {
    static defaultProps: {
        label: string;
        description: string;
        width: number;
    };
    private _labelId;
    private _descriptionId;
    constructor(props: IProgressIndicatorProps);
    render(): JSX.Element;
    private _onRenderProgress;
}

export { PulsingBeaconAnimationStyles }

export { raiseClick }

export declare const Rating: React_2.FunctionComponent<IRatingProps>;

export declare const RatingBase: React_2.FunctionComponent<IRatingProps>;

/**
 * {@docCategory Rating}
 */
export declare enum RatingSize {
    Small = 0,
    Large = 1
}

export { Rectangle }

export declare enum RectangleEdge {
    top = 1,
    bottom = -1,
    left = 2,
    right = -2
}

export { RefObject }

export { registerDefaultFontFaces }

export { registerIconAlias }

export { registerIcons }

/**
 * Register a layer for a given host id
 * @param hostId - Id of the layer host
 * @param layer - Layer instance
 */
export declare function registerLayer(hostId: string, callback: () => void): void;

/**
 * Registers a Layer Host with an associated hostId.
 * @param hostId - Id of the layer host
 * @param layerHost - layer host instance
 */
export declare function registerLayerHost(hostId: string, layerHost: ILayerHost): void;

export { registerOnThemeChangeCallback }

export { removeDirectionalKeyCode }

export { removeIndex }

export { removeOnThemeChangeCallback }

export { replaceElement }

export { resetControlledWarnings }

export { resetIds }

export { resetMemoizations }

export declare const ResizeGroup: React_2.FunctionComponent<IResizeGroupProps>;

export declare const ResizeGroupBase: React_2.FunctionComponent<IResizeGroupProps>;

/**
 * {@docCategory ResizeGroup}
 */
export declare enum ResizeGroupDirection {
    horizontal = 0,
    vertical = 1
}

export declare enum ResponsiveMode {
    /** Width \<= 479px */
    small = 0,
    /** Width \> 479px and \<= 639px */
    medium = 1,
    /** Width \> 639px and \<= 1023px */
    large = 2,
    /** Width \> 1023px and \<= 1365px */
    xLarge = 3,
    /** Width \> 1365px and \<= 1919px */
    xxLarge = 4,
    /** Width \> 1919px */
    xxxLarge = 5,
    unknown = 999
}

/** Converts RGB components to a hex color string (without # prefix). */
export declare function rgb2hex(r: number, g: number, b: number): string;

/** Converts RGB components to an HSV color. */
export declare function rgb2hsv(r: number, g: number, b: number): IHSV;

/** Regular expression matching only numbers */
export declare const RGBA_REGEX: RegExp;

export { safeRequestAnimationFrame }

export { safeSetTimeout }

export { ScreenWidthMaxLarge }

export { ScreenWidthMaxMedium }

export { ScreenWidthMaxSmall }

export { ScreenWidthMaxXLarge }

export { ScreenWidthMaxXXLarge }

export { ScreenWidthMinLarge }

export { ScreenWidthMinMedium }

export { ScreenWidthMinSmall }

export { ScreenWidthMinUhfMobile }

export { ScreenWidthMinXLarge }

export { ScreenWidthMinXXLarge }

export { ScreenWidthMinXXXLarge }

export declare const ScrollablePane: React_2.FunctionComponent<IScrollablePaneProps>;

export declare class ScrollablePaneBase extends React_2.Component<IScrollablePaneProps, IScrollablePaneState> implements IScrollablePane {
    private _root;
    private _stickyAboveRef;
    private _stickyBelowRef;
    private _contentContainer;
    private _subscribers;
    private _stickies;
    private _mutationObserver;
    private _notifyThrottled;
    private _async;
    private _events;
    constructor(props: IScrollablePaneProps);
    get root(): HTMLDivElement | null;
    get stickyAbove(): HTMLDivElement | null;
    get stickyBelow(): HTMLDivElement | null;
    get contentContainer(): HTMLDivElement | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: IScrollablePaneProps, nextState: IScrollablePaneState): boolean;
    componentDidUpdate(prevProps: IScrollablePaneProps, prevState: IScrollablePaneState): void;
    render(): JSX.Element;
    setStickiesDistanceFromTop(): void;
    forceLayoutUpdate(): void;
    subscribe: (handler: Function) => void;
    unsubscribe: (handler: Function) => void;
    addSticky: (sticky: Sticky) => void;
    removeSticky: (sticky: Sticky) => void;
    sortSticky: (sticky: Sticky, sortAgain?: boolean) => void;
    updateStickyRefHeights: () => void;
    notifySubscribers: () => void;
    getScrollPosition: () => number;
    syncScrollSticky: (sticky: Sticky) => void;
    private _getScrollablePaneContext;
    private _checkStickyStatus;
    private _addToStickyContainer;
    private _removeStickyFromContainers;
    private _onWindowResize;
    private _getStickyContainerStyle;
    private _getScrollbarWidth;
    private _getScrollbarHeight;
    private _onScroll;
}

export declare const ScrollablePaneContext: React_2.Context<IScrollablePaneContext>;

/**
 * {@docCategory ScrollablePane}
 */
export declare const ScrollbarVisibility: {
    auto: "auto";
    always: "always";
};

/**
 * {@docCategory ScrollablePane}
 */
export declare type ScrollbarVisibility = (typeof ScrollbarVisibility)[keyof typeof ScrollbarVisibility];

/**
 * {@docCategory List}
 */
export declare const ScrollToMode: {
    /**
     * Does not make any consideration to where in the viewport the item should align to.
     */
    auto: 0;
    /**
     * Attempts to scroll the list so the top of the desired item is aligned with the top of the viewport.
     */
    top: 1;
    /**
     * Attempts to scroll the list so the bottom of the desired item is aligned with the bottom of the viewport.
     */
    bottom: 2;
    /**
     * Attempts to scroll the list so the desired item is in the exact center of the viewport.
     */
    center: 3;
};

/**
 * {@docCategory List}
 */
export declare type ScrollToMode = (typeof ScrollToMode)[keyof typeof ScrollToMode];

export declare const SearchBox: React_2.FunctionComponent<ISearchBoxProps>;

export declare const SearchBoxBase: React_2.FunctionComponent<ISearchBoxProps>;

declare enum SelectableOptionMenuItemType {
    Normal = 0,
    Divider = 1,
    Header = 2,
    SelectAll = 3
}
export { SelectableOptionMenuItemType as DropdownMenuItemType }
export { SelectableOptionMenuItemType }

/**
 * {@docCategory DetailsList}
 */
export declare enum SelectAllVisibility {
    none = 0,
    hidden = 1,
    visible = 2
}

/**
 * Standard People Picker.
 */
export declare class SelectedPeopleList extends BasePeopleSelectedItemsList {
    static defaultProps: any;
    protected renderItems: () => JSX.Element[];
    private _renderItem;
    private _beginEditing;
    private _completeEditing;
    private _createMenuItems;
}

export { Selection_2 as Selection }

export { SELECTION_CHANGE }

export { SelectionDirection }

export { SelectionMode_2 as SelectionMode }

/**
 * {@docCategory Selection}
 */
export declare class SelectionZone extends React_2.Component<ISelectionZoneProps, ISelectionZoneState> {
    static defaultProps: {
        isSelectedOnFocus: boolean;
        toggleWithoutModifierPressed: boolean;
        selectionMode: SelectionMode_2;
        selectionClearedOnEscapePress: boolean;
    };
    private _async;
    private _events;
    private _root;
    private _isCtrlPressed;
    private _isShiftPressed;
    private _isMetaPressed;
    private _isTabPressed;
    private _shouldHandleFocus;
    private _shouldHandleFocusTimeoutId;
    private _isTouch;
    private _isTouchTimeoutId;
    static getDerivedStateFromProps(nextProps: ISelectionZoneProps, prevState: ISelectionZoneState): ISelectionZoneState;
    constructor(props: ISelectionZoneProps);
    componentDidMount(): void;
    render(): JSX.Element;
    componentDidUpdate(previousProps: ISelectionZoneProps): void;
    componentWillUnmount(): void;
    /**
     * In some cases, the consuming scenario requires to set focus on a row without having SelectionZone
     * react to the event. Note that focus events in IE \<= 11 will occur asynchronously after .focus() has
     * been called on an element, so we need a flag to store the idea that we will bypass the "next"
     * focus event that occurs. This method does that.
     */
    ignoreNextFocus: () => void;
    private _onSelectionChange;
    private _onMouseDownCapture;
    /**
     * When we focus an item, for single/multi select scenarios, we should try to select it immediately
     * as long as the focus did not originate from a mouse down/touch event. For those cases, we handle them
     * specially.
     */
    private _onFocus;
    private _onMouseDown;
    private _onTouchStartCapture;
    private _onClick;
    private _onContextMenu;
    private _isSelectionDisabled;
    /**
     * In multi selection, if you double click within an item's root (but not within the invoke element or
     * input elements), we should execute the invoke handler.
     */
    private _onDoubleClick;
    private _onKeyDownCapture;
    private _onKeyDown;
    private _onToggleAllClick;
    private _onToggleClick;
    private _onInvokeClick;
    private _onItemSurfaceClick;
    private _onInvokeMouseDown;
    /**
     * To avoid high startup cost of traversing the DOM on component mount,
     * defer finding the scrollable parent until a click interaction.
     *
     * The styles will probably already calculated since we're running in a click handler,
     * so this is less likely to cause layout thrashing then doing it in mount.
     */
    private _findScrollParentAndTryClearOnEmptyClick;
    private _tryClearOnEmptyClick;
    private _clearAndSelectIndex;
    /**
     * We need to track the modifier key states so that when focus events occur, which do not contain
     * modifier states in the Event object, we know how to behave.
     */
    private _updateModifiers;
    private _findItemRoot;
    private _getItemIndex;
    private _getItemSpan;
    private _shouldAutoSelect;
    private _hasAttribute;
    private _isInputElement;
    private _isNonHandledClick;
    private _handleNextFocus;
    private _setIsTouch;
    private _getSelectionMode;
}

export { selectProperties }

export declare enum SemanticColorSlots {
    bodyBackground = 0,
    bodyText = 1,
    disabledBackground = 2,
    disabledText = 3
}

export declare const Separator: React_2.FunctionComponent<ISeparatorProps>;

export declare const SeparatorBase: React_2.FunctionComponent<ISeparatorProps>;

/**
 * Converts a whole set of KeySequences into one keytip ID, which will be the ID for the last keytip sequence specified
 * keySequences should not include the initial keytip 'start' sequence.
 *
 * @param keySequences - Full path of IKeySequences for one keytip.
 * @returns String to use for the keytip ID.
 */
export declare function sequencesToID(keySequences: string[]): string;

export { setBaseUrl }

export { setFocusVisibility }

export { setIconOptions }

export { setLanguage }

/**
 * Sets the default target selector to use when determining the host in which
 * Layered content will be injected into. If not provided, an element will be
 * created at the end of the document body.
 *
 * Passing in a falsy value will clear the default target and reset back to
 * using a created element at the end of document body.
 */
export declare function setLayerHostSelector(selector?: string): void;

export { setMemoizeWeakMap }

export { setMonth }

export { setPortalAttribute }

/**
 * Allows a server rendered scenario to provide a **default** responsive mode.
 * This WILL NOT trigger any updates to components that have already consumed the responsive mode!
 */
export declare function setResponsiveMode(responsiveMode: ResponsiveMode | undefined): void;

export { setRTL }

export { setSSR }

export { Settings }

export { SettingsFunction }

export { setVirtualParent }

export { setWarningCallback }

/** Shades of a given color, from softest to strongest. */
export declare enum Shade {
    Unshaded = 0,
    Shade1 = 1,
    Shade2 = 2,
    Shade3 = 3,
    Shade4 = 4,
    Shade5 = 5,
    Shade6 = 6,
    Shade7 = 7,
    Shade8 = 8
}

export { shallowCompare }

export { SharedColors }

export declare const Shimmer: React_2.FunctionComponent<IShimmerProps>;

/**
 * {@docCategory Shimmer}
 */
export declare const ShimmerBase: React_2.FunctionComponent<IShimmerProps>;

export declare const ShimmerCircle: React_2.FunctionComponent<IShimmerCircleProps>;

export declare const ShimmerCircleBase: React_2.FunctionComponent<IShimmerCircleProps>;

export declare const ShimmeredDetailsList: React_2.FunctionComponent<IShimmeredDetailsListProps>;

export declare class ShimmeredDetailsListBase extends React_2.Component<IShimmeredDetailsListProps, {}> {
    private _shimmerItems;
    private _classNames;
    constructor(props: IShimmeredDetailsListProps);
    render(): JSX.Element;
    private _onRenderShimmerPlaceholder;
    private _renderDefaultShimmerPlaceholder;
}

/**
 * Describes the default heights for shimmer elements when omitted in implementation.
 * {@docCategory Shimmer}
 */
export declare enum ShimmerElementsDefaultHeights {
    /**
     * Default height of the line element when not provided by user: 16px
     */
    line = 16,
    /**
     * Default height of the gap element when not provided by user: 16px
     */
    gap = 16,
    /**
     * Default height of the circle element when not provided by user: 24px
     */
    circle = 24
}

export declare const ShimmerElementsGroup: React_2.FunctionComponent<IShimmerElementsGroupProps>;

/**
 * {@docCategory Shimmer}
 */
export declare const ShimmerElementsGroupBase: React_2.FunctionComponent<IShimmerElementsGroupProps>;

/**
 * Describes the possible types for shimmer elements used.
 * {@docCategory Shimmer}
 */
export declare enum ShimmerElementType {
    /**
     * Line element type
     */
    line = 1,
    /**
     * Circle element type
     */
    circle = 2,
    /**
     * Gap element type
     */
    gap = 3
}

export declare const ShimmerGap: React_2.FunctionComponent<IShimmerGapProps>;

/**
 * {@docCategory Shimmer}
 */
export declare const ShimmerGapBase: React_2.FunctionComponent<IShimmerGapProps>;

export declare const ShimmerLine: React_2.FunctionComponent<IShimmerLineProps>;

/**
 * {@docCategory Shimmer}
 */
export declare const ShimmerLineBase: React_2.FunctionComponent<IShimmerLineProps>;

export { shouldWrapFocus }

export declare const sizeBoolean: (size: PersonaSize) => {
    isSize8: boolean;
    isSize10: boolean;
    isSize16: boolean;
    isSize24: boolean;
    isSize28: boolean;
    isSize32: boolean;
    isSize40: boolean;
    isSize48: boolean;
    isSize56: boolean;
    isSize72: boolean;
    isSize100: boolean;
    isSize120: boolean;
};

export declare const sizeToPixels: {
    [key: number]: number;
};

export declare const Slider: React_2.FunctionComponent<ISliderProps>;

export declare const SliderBase: React_2.FunctionComponent<ISliderProps>;

/**
 * The SpinButton control and related tabs pattern are used for navigating frequently accessed,
 * distinct content categories. SpinButtons allow for navigation between two or more content
 * views and relies on text headers to articulate the different sections of content.
 */
export declare const SpinButton: React_2.FunctionComponent<ISpinButtonProps>;

export declare const Spinner: React_2.FunctionComponent<ISpinnerProps>;

export declare class SpinnerBase extends React_2.Component<ISpinnerProps, any> {
    static defaultProps: ISpinnerProps;
    render(): JSX.Element;
}

/**
 * Possible locations of the label in regards to the spinner
 * {@docCategory Spinner}
 */
export declare type SpinnerLabelPosition = 'top' | 'right' | 'bottom' | 'left';

/**
 * Possible variations of the spinner circle size.
 * {@docCategory Spinner}
 */
export declare enum SpinnerSize {
    /**
     * 12px Spinner diameter
     */
    xSmall = 0,
    /**
     * 16px Spinner diameter
     */
    small = 1,
    /**
     * 20px Spinner diameter
     */
    medium = 2,
    /**
     * 28px Spinner diameter
     */
    large = 3
}

/**
 * @deprecated Use `SpinnerSize` instead. Will be removed at \>= 2.0.0.
 * {@docCategory Spinner}
 */
export declare enum SpinnerType {
    /**
     * @deprecated Use `SpinnerSize.medium` instead. Will be removed at \>= 2.0.0.
     */
    normal = 0,
    /**
     * @deprecated Use `SpinnerSize.large` instead. Will be removed at \>= 2.0.0.
     */
    large = 1
}

export declare const Stack: React_2.FunctionComponent<IStackProps> & {
    Item: React_2.FunctionComponent<IStackItemProps>;
};

export declare const StackItem: React_2.FunctionComponent<IStackItemProps>;

export declare class Sticky extends React_2.Component<IStickyProps, IStickyState> {
    static defaultProps: IStickyProps;
    static contextType: React_2.Context<IScrollablePaneContext>;
    private _root;
    private _stickyContentTop;
    private _stickyContentBottom;
    private _nonStickyContent;
    private _placeHolder;
    private _activeElement;
    constructor(props: IStickyProps);
    get root(): HTMLDivElement | null;
    get placeholder(): HTMLDivElement | null;
    get stickyContentTop(): HTMLDivElement | null;
    get stickyContentBottom(): HTMLDivElement | null;
    get nonStickyContent(): HTMLDivElement | null;
    get canStickyTop(): boolean;
    get canStickyBottom(): boolean;
    syncScroll: (container: HTMLElement) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: IStickyProps, prevState: IStickyState): void;
    shouldComponentUpdate(nextProps: IStickyProps, nextState: IStickyState): boolean;
    render(): JSX.Element;
    addSticky(stickyContent: HTMLDivElement): void;
    resetSticky(): void;
    setDistanceFromTop(container: HTMLDivElement): void;
    private _getContext;
    private _getContentStyles;
    private _getStickyPlaceholderHeight;
    private _getNonStickyPlaceholderHeightAndWidth;
    private _onScrollEvent;
    private _getStickyDistanceFromTop;
    private _getStickyDistanceFromTopForFooter;
    private _getNonStickyDistanceFromTop;
    private _getBackground;
}

export declare enum StickyPositionType {
    Both = 0,
    Header = 1,
    Footer = 2
}

export { styled }

export { StyleFunction }

export declare type StylesClassMapping<TStyleSet extends {
    [key in keyof TStyleSet]: IStyle;
}> = {
    [key in keyof TStyleSet]: string;
};

export { Stylesheet }

/**
 * Enum to help identify which suggestions action button is selected.
 * {@docCategory Pickers}
 */
export declare enum SuggestionActionType {
    /** None of the actions is selected. */
    none = 0,
    /** ForceResolve action is selected. */
    forceResolve = 1,
    /** SearchMore action is selected. */
    searchMore = 2
}

export declare enum SuggestionItemType {
    header = 0,
    suggestion = 1,
    footer = 2
}

/**
 * {@docCategory Pickers}
 */
export declare class Suggestions<T> extends React_2.Component<ISuggestionsProps<T>, ISuggestionsState> {
    protected _forceResolveButton: React_2.RefObject<IButton>;
    protected _searchForMoreButton: React_2.RefObject<IButton>;
    protected _selectedElement: React_2.RefObject<HTMLDivElement>;
    protected _scrollContainer: React_2.RefObject<HTMLDivElement>;
    private activeSelectedElement;
    private _classNames;
    constructor(suggestionsProps: ISuggestionsProps<T>);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    /**
     * Returns true if the event was handled, false otherwise
     */
    tryHandleKeyDown: (keyCode: number, currentSuggestionIndex: number) => boolean;
    hasSuggestedAction(): boolean;
    hasSuggestedActionSelected(): boolean;
    executeSelectedAction(): void;
    focusAboveSuggestions(): void;
    focusBelowSuggestions(): void;
    focusSearchForMoreButton(): void;
    scrollSelected(): void;
    private _getAlertText;
    private _renderSuggestions;
    private _getMoreResults;
    private _forceResolve;
    private _shouldShowForceResolve;
    private _onClickTypedSuggestionsItem;
    private _refocusOnSuggestions;
    private _onRemoveTypedSuggestionsItem;
}

/**
 * Class when used with SuggestionsStore, renders a suggestions control with customizable headers and footers
 */
export declare class SuggestionsControl<T> extends React_2.Component<ISuggestionsControlProps<T>, ISuggestionsControlState<T>> {
    protected _forceResolveButton: IButton;
    protected _searchForMoreButton: IButton;
    protected _selectedElement: React_2.RefObject<HTMLDivElement>;
    protected _suggestions: React_2.RefObject<SuggestionsCore<T>>;
    private SuggestionsOfProperType;
    constructor(suggestionsProps: ISuggestionsControlProps<T>);
    componentDidMount(): void;
    componentDidUpdate(oldProps: ISuggestionsControlProps<T>): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    get currentSuggestion(): ISuggestionModel<T> | undefined;
    get currentSuggestionIndex(): number;
    get selectedElement(): HTMLDivElement | undefined;
    hasSuggestionSelected(): boolean;
    hasSelection(): boolean;
    executeSelectedAction(): void;
    removeSuggestion(index?: number): void;
    /**
     * Handles the key down, returns true, if the event was handled, false otherwise
     * @param keyCode - The keyCode to handle
     */
    handleKeyDown(keyCode: number): boolean;
    scrollSelected(): void;
    protected renderHeaderItems(): JSX.Element | null;
    protected renderFooterItems(): JSX.Element | null;
    protected _renderSuggestions(): JSX.Element;
    /**
     * Selects the next selectable item
     */
    protected selectNextItem(itemType: SuggestionItemType, originalItemType?: SuggestionItemType): void;
    /**
     * Selects the previous selectable item
     */
    protected selectPreviousItem(itemType: SuggestionItemType, originalItemType?: SuggestionItemType): void;
    /**
     * Resets the selected state and selects the first selectable item
     */
    protected resetSelectedItem(): void;
    /**
     * Selects the first item
     */
    protected selectFirstItem(): void;
    /**
     * Selects the last item
     */
    protected selectLastItem(): void;
    /**
     * Selects the next item in the suggestion item type group, given the current index
     * If none is able to be selected, returns false, otherwise returns true
     * @param itemType - The suggestion item type
     * @param currentIndex - The current index, default is -1
     */
    private _selectNextItemOfItemType;
    /**
     * Selects the previous item in the suggestion item type group, given the current index
     * If none is able to be selected, returns false, otherwise returns true
     * @param itemType - The suggestion item type
     * @param currentIndex - The current index. If none is provided, the default is the items length of specified type
     */
    private _selectPreviousItemOfItemType;
    private _getCurrentIndexForType;
    private _getNextItemSectionType;
    private _getPreviousItemSectionType;
}

/**
 * {@docCategory Pickers}
 */
export declare class SuggestionsController<T> {
    currentIndex: number;
    currentSuggestion: ISuggestionModel<T> | undefined;
    suggestions: ISuggestionModel<T>[];
    constructor();
    updateSuggestions(newSuggestions: T[], selectedIndex?: number, maxCount?: number): void;
    /**
     * Increments the suggestion index and gets the next suggestion in the list.
     */
    nextSuggestion(): boolean;
    /**
     * Decrements the suggestion index and gets the previous suggestion in the list.
     */
    previousSuggestion(): boolean;
    getSuggestions(): ISuggestionModel<T>[];
    getCurrentItem(): ISuggestionModel<T>;
    getSuggestionAtIndex(index: number): ISuggestionModel<T>;
    hasSelectedSuggestion(): boolean;
    removeSuggestion(index: number): void;
    createGenericSuggestion(itemToConvert: ISuggestionModel<T> | T): void;
    convertSuggestionsToSuggestionItems(suggestions: Array<ISuggestionModel<T> | T>): ISuggestionModel<T>[];
    deselectAllSuggestions(): void;
    setSelectedSuggestion(index: number): void;
    private _isSuggestionModel;
    private _ensureSuggestionModel;
}

/**
 * Class when used with SuggestionsStore, renders a basic suggestions control
 */
export declare class SuggestionsCore<T> extends React_2.Component<ISuggestionsCoreProps<T>, {}> {
    currentIndex: number;
    currentSuggestion: ISuggestionModel<T> | undefined;
    protected _selectedElement: React_2.RefObject<HTMLDivElement>;
    private SuggestionsItemOfProperType;
    constructor(suggestionsProps: ISuggestionsCoreProps<T>);
    /**
     * Increments the selected suggestion index
     */
    nextSuggestion(): boolean;
    /**
     * Decrements the selected suggestion index
     */
    previousSuggestion(): boolean;
    get selectedElement(): HTMLDivElement | undefined;
    getCurrentItem(): ISuggestionModel<T>;
    getSuggestionAtIndex(index: number): ISuggestionModel<T>;
    hasSuggestionSelected(): boolean;
    removeSuggestion(index: number): void;
    deselectAllSuggestions(): void;
    setSelectedSuggestion(index: number): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    scrollSelected(): void;
    private _onClickTypedSuggestionsItem;
    private _onRemoveTypedSuggestionsItem;
}

export declare class SuggestionsHeaderFooterItem extends React_2.Component<ISuggestionsHeaderFooterItemProps, {}> {
    constructor(props: ISuggestionsHeaderFooterItemProps);
    render(): JSX.Element;
}

/**
 * {@docCategory Pickers}
 */
export declare class SuggestionsItem<T> extends React_2.Component<ISuggestionItemProps<T>, {}> {
    constructor(props: ISuggestionItemProps<T>);
    render(): JSX.Element;
}

export declare class SuggestionsStore<T> {
    suggestions: ISuggestionModel<T>[];
    private getAriaLabel?;
    constructor(options?: SuggestionsStoreOptions<T>);
    updateSuggestions(newSuggestions: T[]): void;
    getSuggestions(): ISuggestionModel<T>[];
    getSuggestionAtIndex(index: number): ISuggestionModel<T>;
    removeSuggestion(index: number): void;
    convertSuggestionsToSuggestionItems(suggestions: Array<ISuggestionModel<T> | T>): ISuggestionModel<T>[];
    private _isSuggestionModel;
    private _ensureSuggestionModel;
}

export declare type SuggestionsStoreOptions<T> = {
    getAriaLabel?: (item: T) => string;
};

export declare const SwatchColorPicker: React_2.FunctionComponent<ISwatchColorPickerProps>;

export declare const SwatchColorPickerBase: React_2.FunctionComponent<ISwatchColorPickerProps>;

export { tableProperties }

export declare const TagItem: React_2.FunctionComponent<ITagItemProps>;

/**
 * {@docCategory TagPicker}
 */
export declare const TagItemBase: (props: ITagItemProps) => JSX.Element;

export declare const TagItemSuggestion: React_2.FunctionComponent<ITagItemSuggestionProps>;

/**
 * {@docCategory TagPicker}
 */
export declare const TagItemSuggestionBase: (props: ITagItemSuggestionProps) => JSX.Element;

export declare const TagPicker: React_2.FunctionComponent<ITagPickerProps>;

/**
 * {@docCategory TagPicker}
 */
export declare class TagPickerBase extends BasePicker<ITag, ITagPickerProps> {
    static defaultProps: {
        onRenderItem: (props: ITagItemProps) => JSX.Element;
        onRenderSuggestionsItem: (props: ITag) => JSX.Element;
    };
}

export { Target }

export { tdProperties }

export declare const TeachingBubble: React_2.FunctionComponent<ITeachingBubbleProps>;

export declare const TeachingBubbleBase: React_2.FunctionComponent<ITeachingBubbleProps>;

export declare const TeachingBubbleContent: React_2.FunctionComponent<ITeachingBubbleProps>;

export declare const TeachingBubbleContentBase: React_2.FunctionComponent<ITeachingBubbleProps>;

declare const Text_2: React_2.FunctionComponent<ITextProps>;
export { Text_2 as Text }

export { textAreaProperties }

export declare const TextField: React_2.FunctionComponent<ITextFieldProps>;

export declare class TextFieldBase extends React_2.Component<ITextFieldProps, ITextFieldState, ITextFieldSnapshot> implements ITextField {
    static defaultProps: ITextFieldProps;
    /** Fallback ID if none is provided in props. Access proper value via `this._id`. */
    private _fallbackId;
    private _descriptionId;
    private _labelId;
    private _prefixId;
    private _suffixId;
    private _delayedValidate;
    private _lastValidation;
    private _latestValidateValue;
    private _hasWarnedNullValue;
    private _textElement;
    private _classNames;
    private _async;
    /** Most recent value from a change or input event, to help avoid processing events twice */
    private _lastChangeValue;
    constructor(props: ITextFieldProps);
    /**
     * Gets the current value of the text field.
     */
    get value(): string | undefined;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getSnapshotBeforeUpdate(prevProps: ITextFieldProps, prevState: ITextFieldState): ITextFieldSnapshot | null;
    componentDidUpdate(prevProps: ITextFieldProps, prevState: ITextFieldState, snapshot: ITextFieldSnapshot): void;
    render(): JSX.Element;
    /**
     * Sets focus on the text field
     */
    focus(): void;
    /**
     * Blurs the text field.
     */
    blur(): void;
    /**
     * Selects the text field
     */
    select(): void;
    /**
     * Sets the selection start of the text field to a specified value
     */
    setSelectionStart(value: number): void;
    /**
     * Sets the selection end of the text field to a specified value
     */
    setSelectionEnd(value: number): void;
    /**
     * Gets the selection start of the text field
     */
    get selectionStart(): number | null;
    /**
     * Gets the selection end of the text field
     */
    get selectionEnd(): number | null;
    /**
     * Sets the start and end positions of a selection in a text field.
     * @param start - Index of the start of the selection.
     * @param end - Index of the end of the selection.
     */
    setSelectionRange(start: number, end: number): void;
    private _warnControlledUsage;
    /** Returns `props.id` if available, or a fallback if not. */
    private get _id();
    private get _isControlled();
    private _onFocus;
    private _onBlur;
    private _onRenderLabel;
    private _onRenderDescription;
    private _onRenderPrefix;
    private _onRenderSuffix;
    /**
     * Current error message from either `props.errorMessage` or the result of `props.onGetErrorMessage`.
     *
     * - If there is no validation error or we have not validated the input value, errorMessage is an empty string.
     * - If we have done the validation and there is validation error, errorMessage is the validation error message.
     */
    private get _errorMessage();
    /**
     * Renders error message based on the type of the message.
     *
     * - If error message is string, it will render using the built in styles.
     * - If error message is an element, user has full control over how it's rendered.
     */
    private _renderErrorMessage;
    /**
     * If a custom description render function is supplied then treat description as always available.
     * Otherwise defer to the presence of description or error message text.
     */
    private get _isDescriptionAvailable();
    private _renderTextArea;
    private _renderInput;
    private _onRevealButtonClick;
    private _onInputChange;
    private _validate;
    private _notifyAfterValidate;
    private _adjustInputHeight;
}

export declare const TextStyles: ITextComponent['styles'];

export declare const TextView: ITextComponent['view'];

export { Theme }

export declare const ThemeContext: React_2.Context<Theme | undefined>;

export declare class ThemeGenerator {
    /**
     * Sets an IThemeSlotRule to the given color and cascades it to the rest of the theme, updating other IThemeSlotRules
     * in the theme that inherit from that color.
     * @param isInverted - whether it's a dark theme or not, which affects the algorithm used to generate shades
     * @param isCustomization - should be true only if it's a user action, and indicates overwriting the slot's
     * inheritance (if any)
     * @param overwriteCustomColor - A slot could have a generated color based on its inheritance rules (isCustomized
     * is false), or a custom color based on user input (isCustomized is true). This bool tells us whether to override
     * existing customized colors.
     */
    static setSlot(rule: IThemeSlotRule, color: string | IColor, isInverted?: boolean, isCustomization?: boolean, overwriteCustomColor?: boolean): void;
    /**
     * Sets the color of each slot based on its rule. Slots that don't inherit must have a color already.
     * If this completes without error, then the theme is ready to use. (All slots will have a color.)
     * setSlot() can be called before this, but this must be called before getThemeAs*().
     * Does not override colors of rules where isCustomized is true (i.e. doesn't override existing customizations).
     */
    static insureSlots(slotRules: IThemeRules, isInverted: boolean): void;
    /**
     * Gets the JSON-formatted blob that describes the theme, usable with the REST request endpoints:
     * ```
     * { [theme slot name as string] : [color as string],
     *  "tokenName": "#f00f00",
     *  "tokenName2": "#ba2ba2",
     *   ... }
     * ```
     */
    static getThemeAsJson(slotRules: IThemeRules): any;
    /**
     * Gets code-formatted load theme blob that can be copy and pasted.
     * Only used for the old theme designer, where loadTheme usage is acceptable,
     * unlike in the new theme designer.
     */
    static getThemeAsCode(slotRules: IThemeRules): any;
    /**
     * Gets code-formatted load theme blob, specifically for the new theme designer,
     * aka.ms/themedesigner. Shouldn't use loadTheme like the old theme designer since it's deprecated.
     * We want to use the theme object from createTheme and use the Customizations.applySettings API instead.
     */
    static getThemeAsCodeWithCreateTheme(slotRules: IThemeRules): any;
    /**
     * Gets the theme as a list of SASS variables that can be used in code
     * ```
     * $tokenName: "[theme:tokenName, default:#f00f00]";
     * $tokenName2: "[theme:tokenName2, default:#ba2ba2]";
     * ...
     * ```
     */
    static getThemeAsSass(slotRules: IThemeRules): any;
    /**
     * Gets the theme formatted for PowerShell scripts
     * ```
     * @{
     * "tokenName" = "#f00f00";
     * "tokenName2" = "#ba2ba2";
     * ...
     * }
     * ```
     */
    static getThemeForPowerShell(slotRules: IThemeRules): any;
    /**
     * Sets the given slot's color to the appropriate color, shading it if necessary.
     * Then, iterates through all other rules (that are this rule's dependents) to update them accordingly.
     * @param isCustomization - If true, it's a user-provided color, which should be to that raw color.
     * If false, the rule it's inheriting from changed, so updated using asShade.
     */
    private static _setSlot;
    /**
     * Makes the rest of the code that's used for the load theme blob in the exported codepens of
     * both the older sharepoint-specific theme designer and the new theme designer. Takes in
     * theme rules and converts them to format fitting a list of palette colors and their values.
     * Resulting output looks like:
     * ```
     * const _theme = createTheme({
     *  palette: {
     *    themePrimary: '#0078d4',
     *    themeLighterAlt: '#f3f9fd',
     *    ...
     *  }});
     * ```
     * The first line is loadTheme instead of createTheme for the old sharepoint theme designer.
     */
    private static _makeRemainingCode;
}

/**
 * ThemeProvider, used for providing css variables and registering stylesheets.
 */
export declare const ThemeProvider: React_2.FunctionComponent<ThemeProviderProps>;

/**
 * {@docCategory ThemeProvider}
 * Props for the ThemeProvider component.
 */
export declare interface ThemeProviderProps extends React_2.HTMLAttributes<HTMLDivElement> {
    /**
     * A component that should be used as the root element of the ThemeProvider component.
     */
    as?: React_2.ElementType;
    /**
     * Optional ref to the root element.
     */
    ref?: React_2.Ref<HTMLElement>;
    /**
     * Defines the theme provided by the user.
     */
    theme?: PartialTheme | Theme;
    /**
     * Defines where body-related theme is applied to.
     * Setting to 'element' will apply body styles to the root element of ThemeProvider.
     * Setting to 'body' will apply body styles to document body.
     * Setting to 'none' will not apply body styles to either element or body.
     *
     * @defaultvalue 'element'
     */
    applyTo?: 'element' | 'body' | 'none';
}

export declare function themeRulesStandardCreator(): IThemeRules;

export { ThemeSettingName }

export { thProperties }

export { TimeConstants }

/**
 * {@docCategory TimePicker}
 */
export declare const TimePicker: React_2.FunctionComponent<ITimePickerProps>;

/**
 * {@docCategory TimePicker}
 * A type used to represent the TimePicker validation result.
 */
export declare type TimePickerValidationResultData = {
    errorMessage?: string;
};

export declare const Toggle: React_2.FunctionComponent<IToggleProps>;

export declare const ToggleBase: React_2.FunctionComponent<IToggleProps>;

export { toMatrix }

export declare const Tooltip: React_2.FunctionComponent<ITooltipProps>;

export declare class TooltipBase extends React_2.Component<ITooltipProps, any> {
    static defaultProps: Partial<ITooltipProps>;
    private _classNames;
    render(): JSX.Element;
    private _onRenderContent;
}

/**
 * {@docCategory Tooltip}
 */
export declare enum TooltipDelay {
    zero = 0,
    /** 300 ms delay before showing the tooltip */
    medium = 1,
    /** 500 ms delay before showing the tooltip */
    long = 2
}

export declare const TooltipHost: React_2.FunctionComponent<ITooltipHostProps>;

export declare class TooltipHostBase extends React_2.Component<ITooltipHostProps, ITooltipHostState> implements ITooltipHost {
    static defaultProps: {
        delay: TooltipDelay;
    };
    private static _currentVisibleTooltip;
    private _tooltipHost;
    private _classNames;
    private _async;
    private _dismissTimerId;
    private _openTimerId;
    private _defaultTooltipId;
    private _ignoreNextFocusEvent;
    constructor(props: ITooltipHostProps);
    render(): JSX.Element;
    componentWillUnmount(): void;
    show: () => void;
    dismiss: () => void;
    private _getTargetElement;
    private _onTooltipFocus;
    private _onTooltipContentFocus;
    private _onTooltipBlur;
    private _onTooltipMouseEnter;
    private _onTooltipMouseLeave;
    private _onTooltipKeyDown;
    private _clearDismissTimer;
    private _clearOpenTimer;
    private _hideTooltip;
    private _toggleTooltip;
    private _getDelayTime;
}

/**
 * {@docCategory Tooltip}
 */
export declare enum TooltipOverflowMode {
    /** Only show tooltip if parent DOM element is overflowing */
    Parent = 0,
    /**
     * Only show tooltip if tooltip host's content is overflowing.
     * Note that this does not check the children for overflow, only the TooltipHost root.
     */
    Self = 1
}

/**
 * Tests for equality between two IKeytipTransitionKeys.
 *
 * @param key1 - First IKeytipTransitionKey.
 * @param key2 - Second IKeytipTransitionKey.
 * @returns T/F if the transition keys are equal.
 */
export declare function transitionKeysAreEqual(key1: IKeytipTransitionKey, key2: IKeytipTransitionKey): boolean;

/**
 * Tests if 'key' is present in 'keys'.
 *
 * @param keys - Array of IKeytipTransitionKey.
 * @param key - IKeytipTransitionKey to find in 'keys'.
 * @returns T/F if 'keys' contains 'key'.
 */
export declare function transitionKeysContain(keys: IKeytipTransitionKey[], key: IKeytipTransitionKey): boolean;

export { trProperties }

export { unhoistMethods }

export { unregisterIcons }

/**
 * Unregister a layer for a given host id
 * @param hostId - Id of the layer host
 * @param layer - Layer instance
 */
export declare function unregisterLayer(hostId: string, callback: () => void): void;

/**
 * Unregisters a Layer Host from the associated hostId.
 * @param hostId - Id of the layer host
 * @param layerHost - layer host instance
 */
export declare function unregisterLayerHost(hostId: string, layerHost: ILayerHost): void;

/**
 * Gets a color with the given alpha value and the same other components as `color`.
 * Does not modify the original color.
 */
export declare function updateA(color: IColor, a: number): IColor;

/**
 * Gets a color with the same saturation and value as `color` and the other components updated
 * to match the given hue.
 *
 * Does not modify the original `color` and does not supply a default alpha value.
 */
export declare function updateH(color: IColor, h: number): IColor;

/**
 * Gets a color with a single RGBA component updated to a new value.
 * Does not modify the original `color`. Alpha defaults to 100 if not set.
 */
export declare function updateRGB(color: IColor, component: keyof IRGB, value: number): IColor;

/**
 * Gets a color with the same hue as `color` and other components updated to match the given
 * saturation and value.
 *
 * Does not modify the original `color` and does not supply a default alpha value.
 */
export declare function updateSV(color: IColor, s: number, v: number): IColor;

/**
 * Gets a color with the given transparency value and the same other components as `color`.
 * Does not modify the original color.
 */
export declare function updateT(color: IColor, t: number): IColor;

export { useCustomizationSettings }

export { useDocument }

export { useFocusRects }

export declare function useHeightOffset({ finalHeight }: IPositioningContainerProps, contentHost: React_2.RefObject<HTMLDivElement | null>): number;

/**
 * Hook that creates a ref which is used for passing to Keytip target element.
 * The ref will handle setting the attributes needed for Keytip to work.
 */
export declare function useKeytipRef<TElement extends HTMLElement = HTMLElement>(options: KeytipDataOptions): React_2.Ref<TElement>;

/**
 * Hook to get the current responsive mode (window size category).
 * @param elementRef - Use this element's parent window when determining the responsive mode.
 * @param overrideResponsiveMode - Override the responsive mode. If this param is present, it's always returned.
 */
export declare const useResponsiveMode: (elementRef: React_2.RefObject<HTMLElement | null>, overrideResponsiveMode?: ResponsiveMode) => ResponsiveMode;

/**
 * Options that can be provided to the hook generated by `makeStyles`.
 * @deprecated Only used in deprecated `makeStyles` implementation below.
 */
export declare type UseStylesOptions = {
    theme?: Theme;
};

/**
 * React hook for programmatically accessing the theme.
 */
export declare const useTheme: () => Theme;

export { useWindow }

/**
 * Validation state of the user's input.
 * {@docCategory Pickers}
 */
export declare enum ValidationState {
    /** User input is valid. */
    valid = 0,
    /** User input could be valid or invalid, its state is not known yet. */
    warning = 1,
    /** User input is invalid. */
    invalid = 2
}

export { values }

export declare const VerticalDivider: React_2.FunctionComponent<IVerticalDividerProps>;

export { videoProperties }

export declare class VirtualizedComboBox extends React_2.Component<IComboBoxProps, {}> implements IComboBox {
    /** The combo box element */
    private _comboBox;
    /** The virtualized list element */
    private _list;
    constructor(props: IComboBoxProps);
    /**
     * All selected options
     */
    get selectedOptions(): IComboBoxOption[];
    dismissMenu(): void;
    focus(shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): boolean;
    render(): JSX.Element;
    protected _onRenderList: (props: IComboBoxProps) => JSX.Element;
    protected _onScrollToItem: (itemIndex: number) => void;
}

export { warn }

export { warnConditionallyRequiredProps }

export { warnControlledUsage }

export { warnDeprecations }

export { warnMutuallyExclusive }

export declare const WeeklyDayPicker: React_2.FunctionComponent<IWeeklyDayPickerProps>;

export { WindowContext }

export { WindowProvider }

export { WindowProviderProps }

/**
 * @deprecated Decorator usage is deprecated. Either call `getResponsiveMode` manually, or
 * use the `useResponsiveMode` hook within a function component.
 */
export declare function withResponsiveMode<TProps extends {
    responsiveMode?: ResponsiveMode;
}, TState>(ComposedComponent: new (props: TProps, ...args: any[]) => React_2.Component<TProps, TState>): any;

/**
 * A decorator to update decorated component on viewport or window resize events.
 *
 * @param ComposedComponent - decorated React component reference.
 */
export declare function withViewport<TProps extends {
    viewport?: IViewport;
}, TState>(ComposedComponent: new (props: TProps, ...args: any[]) => React_2.Component<TProps, TState>): any;

export { ZIndexes }

export { }
