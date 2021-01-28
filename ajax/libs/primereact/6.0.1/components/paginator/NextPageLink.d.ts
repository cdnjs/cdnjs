import * as React from 'react';

interface NextPageLinkProps {
    disabled?: boolean;
    onClick?(): void;
}

export class NextPageLink extends React.Component<NextPageLinkProps,any> {}