interface Options {
    readonly isEnabled: boolean;
    readonly accountForScrollbars?: boolean;
}
export default function useScrollLock({ isEnabled, accountForScrollbars, }: Options): (element: HTMLElement | null) => void;
export {};
