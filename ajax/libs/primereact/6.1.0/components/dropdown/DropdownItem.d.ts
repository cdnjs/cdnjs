import * as React from 'react';

interface DropdownItemProps {
    option?: object;
    selected?: boolean;
    template?(option:any): JSX.Element | undefined;
    onClick?(e: {originalEvent: Event, option: object}): void;
}

export class DropdownItem extends React.Component<DropdownItemProps,any> {}
