export declare const Input: (<Option, IsMulti extends boolean, Group extends import("..").GroupBase<Option>>(props: import("..").InputProps<Option, IsMulti, Group>) => import("@emotion/react").jsx.JSX.Element) | undefined;
export declare const MultiValue: (<Option, IsMulti extends boolean, Group extends import("..").GroupBase<Option>>(props: import("..").MultiValueProps<Option, IsMulti, Group>) => import("@emotion/react").jsx.JSX.Element) | undefined;
export declare const Placeholder: (<Option, IsMulti extends boolean, Group extends import("..").GroupBase<Option>>(props: import("..").PlaceholderProps<Option, IsMulti, Group>) => import("@emotion/react").jsx.JSX.Element) | undefined;
export declare const SingleValue: (<Option, IsMulti extends boolean, Group extends import("..").GroupBase<Option>>(props: import("..").SingleValueProps<Option, IsMulti, Group>) => import("@emotion/react").jsx.JSX.Element) | undefined;
export declare const ValueContainer: (<Option, IsMulti extends boolean, Group extends import("..").GroupBase<Option>>(props: import("..").ValueContainerProps<Option, IsMulti, Group>) => import("@emotion/react").jsx.JSX.Element) | undefined;
declare const _default: (externalComponents?: Partial<{
    ClearIndicator: <Option, IsMulti extends boolean, Group extends import("..").GroupBase<Option>>(props: import("..").ClearIndicatorProps<Option, IsMulti, Group>) => import("@emotion/react").jsx.JSX.Element;
    Control: <Option_1, IsMulti_1 extends boolean, Group_1 extends import("..").GroupBase<Option_1>>(props: import("..").ControlProps<Option_1, IsMulti_1, Group_1>) => import("@emotion/react").jsx.JSX.Element;
    DropdownIndicator: <Option_2, IsMulti_2 extends boolean, Group_2 extends import("..").GroupBase<Option_2>>(props: import("..").DropdownIndicatorProps<Option_2, IsMulti_2, Group_2>) => import("@emotion/react").jsx.JSX.Element;
    DownChevron: (props: import("../components/indicators").DownChevronProps) => import("@emotion/react").jsx.JSX.Element;
    CrossIcon: (props: import("../components/indicators").CrossIconProps) => import("@emotion/react").jsx.JSX.Element;
    Group: <Option_3, IsMulti_3 extends boolean, Group_3 extends import("..").GroupBase<Option_3>>(props: import("..").GroupProps<Option_3, IsMulti_3, Group_3>) => import("@emotion/react").jsx.JSX.Element;
    GroupHeading: <Option_4, IsMulti_4 extends boolean, Group_4 extends import("..").GroupBase<Option_4>>(props: import("..").GroupHeadingProps<Option_4, IsMulti_4, Group_4>) => import("@emotion/react").jsx.JSX.Element;
    IndicatorsContainer: <Option_5, IsMulti_5 extends boolean, Group_5 extends import("..").GroupBase<Option_5>>(props: import("..").IndicatorsContainerProps<Option_5, IsMulti_5, Group_5>) => import("@emotion/react").jsx.JSX.Element;
    IndicatorSeparator: <Option_6, IsMulti_6 extends boolean, Group_6 extends import("..").GroupBase<Option_6>>(props: import("..").IndicatorSeparatorProps<Option_6, IsMulti_6, Group_6>) => import("@emotion/react").jsx.JSX.Element;
    Input: <Option_7, IsMulti_7 extends boolean, Group_7 extends import("..").GroupBase<Option_7>>(props: import("..").InputProps<Option_7, IsMulti_7, Group_7>) => import("@emotion/react").jsx.JSX.Element;
    LoadingIndicator: {
        <Option_8, IsMulti_8 extends boolean, Group_8 extends import("..").GroupBase<Option_8>>(props: import("..").LoadingIndicatorProps<Option_8, IsMulti_8, Group_8>): import("@emotion/react").jsx.JSX.Element;
        defaultProps: {
            size: number;
        };
    };
    Menu: <Option_9, IsMulti_9 extends boolean, Group_9 extends import("..").GroupBase<Option_9>>(props: import("..").MenuProps<Option_9, IsMulti_9, Group_9>) => import("@emotion/react").jsx.JSX.Element;
    MenuList: <Option_10, IsMulti_10 extends boolean, Group_10 extends import("..").GroupBase<Option_10>>(props: import("..").MenuListProps<Option_10, IsMulti_10, Group_10>) => import("@emotion/react").jsx.JSX.Element;
    MenuPortal: typeof import("../components/Menu").MenuPortal;
    LoadingMessage: {
        <Option_11, IsMulti_11 extends boolean, Group_11 extends import("..").GroupBase<Option_11>>(props: import("..").NoticeProps<Option_11, IsMulti_11, Group_11>): import("@emotion/react").jsx.JSX.Element;
        defaultProps: {
            children: string;
        };
    };
    NoOptionsMessage: {
        <Option_12, IsMulti_12 extends boolean, Group_12 extends import("..").GroupBase<Option_12>>(props: import("..").NoticeProps<Option_12, IsMulti_12, Group_12>): import("@emotion/react").jsx.JSX.Element;
        defaultProps: {
            children: string;
        };
    };
    MultiValue: <Option_13, IsMulti_13 extends boolean, Group_13 extends import("..").GroupBase<Option_13>>(props: import("..").MultiValueProps<Option_13, IsMulti_13, Group_13>) => import("@emotion/react").jsx.JSX.Element;
    MultiValueContainer: <Option_14, IsMulti_14 extends boolean, Group_14 extends import("..").GroupBase<Option_14>>({ children, innerProps, }: import("..").MultiValueGenericProps<Option_14, IsMulti_14, Group_14>) => import("@emotion/react").jsx.JSX.Element;
    MultiValueLabel: <Option_14, IsMulti_14 extends boolean, Group_14 extends import("..").GroupBase<Option_14>>({ children, innerProps, }: import("..").MultiValueGenericProps<Option_14, IsMulti_14, Group_14>) => import("@emotion/react").jsx.JSX.Element;
    MultiValueRemove: typeof import("../components/MultiValue").MultiValueRemove;
    Option: <Option_15, IsMulti_15 extends boolean, Group_15 extends import("..").GroupBase<Option_15>>(props: import("..").OptionProps<Option_15, IsMulti_15, Group_15>) => import("@emotion/react").jsx.JSX.Element;
    Placeholder: <Option_16, IsMulti_16 extends boolean, Group_16 extends import("..").GroupBase<Option_16>>(props: import("..").PlaceholderProps<Option_16, IsMulti_16, Group_16>) => import("@emotion/react").jsx.JSX.Element;
    SelectContainer: <Option_17, IsMulti_17 extends boolean, Group_17 extends import("..").GroupBase<Option_17>>(props: import("..").ContainerProps<Option_17, IsMulti_17, Group_17>) => import("@emotion/react").jsx.JSX.Element;
    SingleValue: <Option_18, IsMulti_18 extends boolean, Group_18 extends import("..").GroupBase<Option_18>>(props: import("..").SingleValueProps<Option_18, IsMulti_18, Group_18>) => import("@emotion/react").jsx.JSX.Element;
    ValueContainer: <Option_19, IsMulti_19 extends boolean, Group_19 extends import("..").GroupBase<Option_19>>(props: import("..").ValueContainerProps<Option_19, IsMulti_19, Group_19>) => import("@emotion/react").jsx.JSX.Element;
}>) => Partial<{
    ClearIndicator: <Option, IsMulti extends boolean, Group extends import("..").GroupBase<Option>>(props: import("..").ClearIndicatorProps<Option, IsMulti, Group>) => import("@emotion/react").jsx.JSX.Element;
    Control: <Option_1, IsMulti_1 extends boolean, Group_1 extends import("..").GroupBase<Option_1>>(props: import("..").ControlProps<Option_1, IsMulti_1, Group_1>) => import("@emotion/react").jsx.JSX.Element;
    DropdownIndicator: <Option_2, IsMulti_2 extends boolean, Group_2 extends import("..").GroupBase<Option_2>>(props: import("..").DropdownIndicatorProps<Option_2, IsMulti_2, Group_2>) => import("@emotion/react").jsx.JSX.Element;
    DownChevron: (props: import("../components/indicators").DownChevronProps) => import("@emotion/react").jsx.JSX.Element;
    CrossIcon: (props: import("../components/indicators").CrossIconProps) => import("@emotion/react").jsx.JSX.Element;
    Group: <Option_3, IsMulti_3 extends boolean, Group_3 extends import("..").GroupBase<Option_3>>(props: import("..").GroupProps<Option_3, IsMulti_3, Group_3>) => import("@emotion/react").jsx.JSX.Element;
    GroupHeading: <Option_4, IsMulti_4 extends boolean, Group_4 extends import("..").GroupBase<Option_4>>(props: import("..").GroupHeadingProps<Option_4, IsMulti_4, Group_4>) => import("@emotion/react").jsx.JSX.Element;
    IndicatorsContainer: <Option_5, IsMulti_5 extends boolean, Group_5 extends import("..").GroupBase<Option_5>>(props: import("..").IndicatorsContainerProps<Option_5, IsMulti_5, Group_5>) => import("@emotion/react").jsx.JSX.Element;
    IndicatorSeparator: <Option_6, IsMulti_6 extends boolean, Group_6 extends import("..").GroupBase<Option_6>>(props: import("..").IndicatorSeparatorProps<Option_6, IsMulti_6, Group_6>) => import("@emotion/react").jsx.JSX.Element;
    Input: <Option_7, IsMulti_7 extends boolean, Group_7 extends import("..").GroupBase<Option_7>>(props: import("..").InputProps<Option_7, IsMulti_7, Group_7>) => import("@emotion/react").jsx.JSX.Element;
    LoadingIndicator: {
        <Option_8, IsMulti_8 extends boolean, Group_8 extends import("..").GroupBase<Option_8>>(props: import("..").LoadingIndicatorProps<Option_8, IsMulti_8, Group_8>): import("@emotion/react").jsx.JSX.Element;
        defaultProps: {
            size: number;
        };
    };
    Menu: <Option_9, IsMulti_9 extends boolean, Group_9 extends import("..").GroupBase<Option_9>>(props: import("..").MenuProps<Option_9, IsMulti_9, Group_9>) => import("@emotion/react").jsx.JSX.Element;
    MenuList: <Option_10, IsMulti_10 extends boolean, Group_10 extends import("..").GroupBase<Option_10>>(props: import("..").MenuListProps<Option_10, IsMulti_10, Group_10>) => import("@emotion/react").jsx.JSX.Element;
    MenuPortal: typeof import("../components/Menu").MenuPortal;
    LoadingMessage: {
        <Option_11, IsMulti_11 extends boolean, Group_11 extends import("..").GroupBase<Option_11>>(props: import("..").NoticeProps<Option_11, IsMulti_11, Group_11>): import("@emotion/react").jsx.JSX.Element;
        defaultProps: {
            children: string;
        };
    };
    NoOptionsMessage: {
        <Option_12, IsMulti_12 extends boolean, Group_12 extends import("..").GroupBase<Option_12>>(props: import("..").NoticeProps<Option_12, IsMulti_12, Group_12>): import("@emotion/react").jsx.JSX.Element;
        defaultProps: {
            children: string;
        };
    };
    MultiValue: <Option_13, IsMulti_13 extends boolean, Group_13 extends import("..").GroupBase<Option_13>>(props: import("..").MultiValueProps<Option_13, IsMulti_13, Group_13>) => import("@emotion/react").jsx.JSX.Element;
    MultiValueContainer: <Option_14, IsMulti_14 extends boolean, Group_14 extends import("..").GroupBase<Option_14>>({ children, innerProps, }: import("..").MultiValueGenericProps<Option_14, IsMulti_14, Group_14>) => import("@emotion/react").jsx.JSX.Element;
    MultiValueLabel: <Option_14, IsMulti_14 extends boolean, Group_14 extends import("..").GroupBase<Option_14>>({ children, innerProps, }: import("..").MultiValueGenericProps<Option_14, IsMulti_14, Group_14>) => import("@emotion/react").jsx.JSX.Element;
    MultiValueRemove: typeof import("../components/MultiValue").MultiValueRemove;
    Option: <Option_15, IsMulti_15 extends boolean, Group_15 extends import("..").GroupBase<Option_15>>(props: import("..").OptionProps<Option_15, IsMulti_15, Group_15>) => import("@emotion/react").jsx.JSX.Element;
    Placeholder: <Option_16, IsMulti_16 extends boolean, Group_16 extends import("..").GroupBase<Option_16>>(props: import("..").PlaceholderProps<Option_16, IsMulti_16, Group_16>) => import("@emotion/react").jsx.JSX.Element;
    SelectContainer: <Option_17, IsMulti_17 extends boolean, Group_17 extends import("..").GroupBase<Option_17>>(props: import("..").ContainerProps<Option_17, IsMulti_17, Group_17>) => import("@emotion/react").jsx.JSX.Element;
    SingleValue: <Option_18, IsMulti_18 extends boolean, Group_18 extends import("..").GroupBase<Option_18>>(props: import("..").SingleValueProps<Option_18, IsMulti_18, Group_18>) => import("@emotion/react").jsx.JSX.Element;
    ValueContainer: <Option_19, IsMulti_19 extends boolean, Group_19 extends import("..").GroupBase<Option_19>>(props: import("..").ValueContainerProps<Option_19, IsMulti_19, Group_19>) => import("@emotion/react").jsx.JSX.Element;
}>;
export default _default;
