import * as React from 'react';

interface DeferredContentProps {
    onLoad?(event: Event): void;
}

export class DeferredContent extends React.Component<DeferredContentProps,any> {}