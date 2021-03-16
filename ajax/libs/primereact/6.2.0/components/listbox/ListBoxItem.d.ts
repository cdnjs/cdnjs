import * as React from 'react';

interface ListBoxItemProps {
    option?: any;
    selected?: boolean;
    onClick?(e: {originalEvent: Event, option: any}): void;
    onTouchEnd?(e: {originalEvent: Event, option: any}): void;
    template?: any;
}

export class ListBoxItem extends React.Component<ListBoxItemProps,any> {}
