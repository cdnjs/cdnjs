import * as React from 'react';

interface ListBoxHeaderProps {
    filter?: string;
    disabled?: boolean;
    onFilter?(e: {originalEvent: Event, value: any}): void;
}

export class ListBoxHeader extends React.Component<ListBoxHeaderProps,any> {}