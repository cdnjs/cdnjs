import { ContainerProps, IndicatorsContainerProps, ValueContainerProps } from './components/containers';
import { ControlProps } from './components/Control';
import { GroupHeadingProps, GroupProps } from './components/Group';
import { ClearIndicatorProps, DropdownIndicatorProps, IndicatorSeparatorProps, LoadingIndicatorProps } from './components/indicators';
import { InputProps } from './components/Input';
import { PlaceholderProps } from './components/Placeholder';
import { OptionProps } from './components/Option';
import { NoticeProps, MenuProps, MenuListProps, PortalStyleArgs } from './components/Menu';
import { SingleValueProps } from './components/SingleValue';
import { MultiValueProps } from './components/MultiValue';
import { CSSObjectWithLabel, GroupBase } from './types';
export interface StylesProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    clearIndicator: ClearIndicatorProps<Option, IsMulti, Group>;
    container: ContainerProps<Option, IsMulti, Group>;
    control: ControlProps<Option, IsMulti, Group>;
    dropdownIndicator: DropdownIndicatorProps<Option, IsMulti, Group>;
    group: GroupProps<Option, IsMulti, Group>;
    groupHeading: GroupHeadingProps<Option, IsMulti, Group>;
    indicatorsContainer: IndicatorsContainerProps<Option, IsMulti, Group>;
    indicatorSeparator: IndicatorSeparatorProps<Option, IsMulti, Group>;
    input: InputProps<Option, IsMulti, Group>;
    loadingIndicator: LoadingIndicatorProps<Option, IsMulti, Group>;
    loadingMessage: NoticeProps<Option, IsMulti, Group>;
    menu: MenuProps<Option, IsMulti, Group>;
    menuList: MenuListProps<Option, IsMulti, Group>;
    menuPortal: PortalStyleArgs;
    multiValue: MultiValueProps<Option, IsMulti, Group>;
    multiValueLabel: MultiValueProps<Option, IsMulti, Group>;
    multiValueRemove: MultiValueProps<Option, IsMulti, Group>;
    noOptionsMessage: NoticeProps<Option, IsMulti, Group>;
    option: OptionProps<Option, IsMulti, Group>;
    placeholder: PlaceholderProps<Option, IsMulti, Group>;
    singleValue: SingleValueProps<Option, IsMulti, Group>;
    valueContainer: ValueContainerProps<Option, IsMulti, Group>;
}
export declare const defaultStyles: {
    [K in keyof StylesProps<any, any, any>]: (props: StylesProps<unknown, boolean, GroupBase<unknown>>[K], unstyled: boolean) => CSSObjectWithLabel;
};
export declare type StylesConfig<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> = {
    [K in keyof StylesProps<Option, IsMulti, Group>]?: (base: CSSObjectWithLabel, props: StylesProps<Option, IsMulti, Group>[K]) => CSSObjectWithLabel;
};
export declare type ClassNamesConfig<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> = {
    [K in keyof StylesProps<Option, IsMulti, Group>]?: (props: StylesProps<Option, IsMulti, Group>[K]) => string;
};
export declare function mergeStyles<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(source: StylesConfig<Option, IsMulti, Group>, target?: StylesConfig<Option, IsMulti, Group>): {
    clearIndicator?: ((base: CSSObjectWithLabel, props: ClearIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    container?: ((base: CSSObjectWithLabel, props: ContainerProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    control?: ((base: CSSObjectWithLabel, props: ControlProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    dropdownIndicator?: ((base: CSSObjectWithLabel, props: DropdownIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    group?: ((base: CSSObjectWithLabel, props: GroupProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    groupHeading?: ((base: CSSObjectWithLabel, props: GroupHeadingProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    indicatorsContainer?: ((base: CSSObjectWithLabel, props: IndicatorsContainerProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    indicatorSeparator?: ((base: CSSObjectWithLabel, props: IndicatorSeparatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    input?: ((base: CSSObjectWithLabel, props: InputProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    loadingIndicator?: ((base: CSSObjectWithLabel, props: LoadingIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    loadingMessage?: ((base: CSSObjectWithLabel, props: NoticeProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    menu?: ((base: CSSObjectWithLabel, props: MenuProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    menuList?: ((base: CSSObjectWithLabel, props: MenuListProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    menuPortal?: ((base: CSSObjectWithLabel, props: PortalStyleArgs) => CSSObjectWithLabel) | undefined;
    multiValue?: ((base: CSSObjectWithLabel, props: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    multiValueLabel?: ((base: CSSObjectWithLabel, props: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    multiValueRemove?: ((base: CSSObjectWithLabel, props: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    noOptionsMessage?: ((base: CSSObjectWithLabel, props: NoticeProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    option?: ((base: CSSObjectWithLabel, props: OptionProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    placeholder?: ((base: CSSObjectWithLabel, props: PlaceholderProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    singleValue?: ((base: CSSObjectWithLabel, props: SingleValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
    valueContainer?: ((base: CSSObjectWithLabel, props: ValueContainerProps<Option, IsMulti, Group>) => CSSObjectWithLabel) | undefined;
};
