import * as React from 'react';

interface ColorPickerPanelProps {
    appendTo?: any;
    inline?: boolean;
    disabled?: string;
    onClick?(): void;
}

export class ColorPicker extends React.Component<ColorPickerPanelProps,any> {}