/*!
 * @license MIT
 * Copyright (c) 2017 - 2018 Bernhard Grünewaldt
 * https://github.com/codeclou/bilderrahmen
 */
export declare class Bilderrahmen {
    store: any;
    constructor(options: any);
    __stopDefaultEvent(evt: any): void;
    _setCurrentOpenImage(galleryId: any, index: any): void;
    _getCurrentOpenImage(): any;
    _clearCurrentOpenImage(): void;
    _isCurrentOpenImage(): boolean;
    _getGallery(galleryId: any): any;
    _getImage(galleryId: any, index: any): any;
    _isImage(galleryId: any, index: any): boolean;
    _renderNextOrPreviousButton(galleryId: any, index: any, direction: any): HTMLDivElement;
    _generateId(galleryId: any, index: any): string;
    closeIfOpen(): void;
    open(galleryId: any, index: any): void;
    create(galleryId: any, index: any): boolean;
    init(): void;
}
