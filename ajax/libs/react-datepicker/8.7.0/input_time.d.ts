import React, { Component } from "react";
interface InputTimeProps {
    onChange?: (date: Date) => void;
    date?: Date;
    timeString?: string;
    timeInputLabel?: string;
    customTimeInput?: React.ReactElement<{
        date?: Date;
        value: string;
        onChange: (time: string) => void;
    }>;
}
interface InputTimeState {
    time?: string;
}
/**
 * `InputTime` is a React component that manages time input.
 *
 * @component
 * @example
 * <InputTime timeString="12:00" />
 *
 * @param props - The properties that define the `InputTime` component.
 * @param props.onChange - Function that is called when the date changes.
 * @param props.date - The initial date value.
 * @param props.timeString - The initial time string value.
 * @param props.timeInputLabel - The label for the time input.
 * @param props.customTimeInput - An optional custom time input element.
 *
 * @returns The `InputTime` component.
 */
export default class InputTime extends Component<InputTimeProps, InputTimeState> {
    inputRef: React.RefObject<HTMLInputElement | null>;
    constructor(props: InputTimeProps);
    static getDerivedStateFromProps(props: InputTimeProps, state: InputTimeState): {
        time: string | undefined;
    } | null;
    onTimeChange: (time: InputTimeState["time"]) => void;
    renderTimeInput: () => React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
