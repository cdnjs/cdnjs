import { Container } from "./Container";
export declare class Drawer {
    private readonly container;
    constructor(container: Container);
    draw(timestamp: DOMHighResTimeStamp): void;
}
