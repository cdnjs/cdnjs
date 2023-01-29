declare module "docsearch" {
    import type { DocSearchProps as DocSearchComponentProps } from '@docsearch/react';
    interface DocSearchProps extends DocSearchComponentProps {
        container: HTMLElement | string;
        environment?: typeof window;
    }
    export function docsearch(props: DocSearchProps): void;
}
declare module "index" {
    export { docsearch as default } from "docsearch";
}
