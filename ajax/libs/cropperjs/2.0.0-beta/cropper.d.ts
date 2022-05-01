import { CropperCanvas } from '@cropper/elements';
import { CropperImage } from '@cropper/elements';
import { CropperSelection } from '@cropper/elements';

declare class Cropper {
    static version: string;
    element: HTMLImageElement | HTMLCanvasElement;
    options: CropperOptions;
    container: Element;
    constructor(element: HTMLImageElement | HTMLCanvasElement | string, options?: CropperOptions);
    getCropperCanvas(): CropperCanvas | null;
    getCropperImage(): CropperImage | null;
    getCropperSelection(): CropperSelection | null;
    getCropperSelections(): NodeListOf<CropperSelection> | null;
}
export default Cropper;

export declare interface CropperOptions {
    container?: Element | string;
    template?: string;
}


export * from "@cropper/elements";
export * from "@cropper/utils";

export { }
