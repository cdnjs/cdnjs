export interface MenuItem {
    label?: string;
    icon?: string;
    url?: string;
    items?: MenuItem[]|MenuItem[][];
    disabled?: boolean;
    target?: string;
    separator?: boolean;
    style?: any;
    className?: string;
    command?(e: {originalEvent: Event, item: MenuItem}): void;
}
