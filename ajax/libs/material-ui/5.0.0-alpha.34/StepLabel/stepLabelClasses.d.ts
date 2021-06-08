export interface StepLabelClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element if `orientation="horizontal"`. */
    horizontal: string;
    /** Styles applied to the root element if `orientation="vertical"`. */
    vertical: string;
    /** Styles applied to the Typography component that wraps `children`. */
    label: string;
    /** Pseudo-class applied to the `Typography` component if `active={true}`. */
    active: string;
    /** Pseudo-class applied to the `Typography` component if `completed={true}`. */
    completed: string;
    /** Pseudo-class applied to the root element and `Typography` component if `error={true}`. */
    error: string;
    /** Pseudo-class applied to the root element and `Typography` component if `disabled={true}`. */
    disabled: string;
    /** Styles applied to the `icon` container element. */
    iconContainer: string;
    /** Pseudo-class applied to the root and icon container and `Typography` if `alternativeLabel={true}`. */
    alternativeLabel: string;
    /** Styles applied to the container element which wraps `Typography` and `optional`. */
    labelContainer: string;
}
export declare type StepLabelClassKey = keyof StepLabelClasses;
export declare function getStepLabelUtilityClass(slot: string): string;
declare const stepLabelClasses: StepLabelClasses;
export default stepLabelClasses;
