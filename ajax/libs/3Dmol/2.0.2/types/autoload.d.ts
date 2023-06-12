export declare var autoinit: boolean;
export declare var processing_autoinit: boolean;
/**
 * Contains a dictionary of embedded viewers created from HTML elements
 * with a the viewer_3Dmoljs css class indexed by their id (or numerically
 * if they do not have an id).
*/
export declare var viewers: any;
export declare function autoload(viewer?: any, callback?: any): void;
