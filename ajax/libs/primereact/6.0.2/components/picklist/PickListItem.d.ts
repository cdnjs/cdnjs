import * as React from 'react';

interface PickListItemProps {
    value?: any;
    className?: string;
    selected?: boolean;
    template?(item: any): JSX.Element | undefined;
    onClick?(e: {originalEvent: Event, value: any}): void;
}

export class PickListItem extends React.Component<PickListItemProps,any> {}
