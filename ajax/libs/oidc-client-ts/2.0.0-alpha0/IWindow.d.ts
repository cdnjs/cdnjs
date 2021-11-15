export interface IWindow {
    navigate(params: any): Promise<unknown>;
    close(): void;
}
