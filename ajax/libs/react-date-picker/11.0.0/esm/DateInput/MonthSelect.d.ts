/// <reference types="react" />
type MonthSelectProps = {
    ariaLabel?: string;
    autoFocus?: boolean;
    className: string;
    disabled?: boolean;
    inputRef?: React.RefObject<HTMLSelectElement | null>;
    locale?: string;
    maxDate?: Date;
    minDate?: Date;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement> & {
        target: HTMLSelectElement;
    }) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLSelectElement> & {
        target: HTMLSelectElement;
    }) => void;
    placeholder?: string;
    required?: boolean;
    short?: boolean;
    value?: string | null;
    year?: string | null;
};
export default function MonthSelect({ ariaLabel, autoFocus, className, disabled, inputRef, locale, maxDate, minDate, onChange, onKeyDown, placeholder, required, short, value, year, }: MonthSelectProps): JSX.Element;
export {};
