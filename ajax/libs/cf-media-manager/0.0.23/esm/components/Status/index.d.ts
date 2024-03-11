interface FileStatusProps {
    status: "loading" | "done" | "error" | "none";
}
export declare function FileStatus({ status }: FileStatusProps): import("preact").JSX.Element | null;
export {};
