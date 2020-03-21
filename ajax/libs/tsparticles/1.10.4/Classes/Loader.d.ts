import { Container } from "./Container";
import { IOptions } from "../Interfaces/Options/IOptions";
import { RecursivePartial } from "../Types/RecursivePartial";
/**
 * Main class for creating the [[Container]] objects
 */
export declare class Loader {
    /**
     * All the [[Container]] objects loaded
     */
    static dom(): Container[];
    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */
    static domItem(index: number): Container;
    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */
    static loadFromArray(tagId: string, params: RecursivePartial<IOptions>[], index?: number): Container | undefined;
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options object to initialize the [[Container]]
     */
    static load(tagId: string, params?: RecursivePartial<IOptions>): Container | undefined;
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param jsonUrl the json path to use in the GET request
     */
    static loadJSON(tagId: string, jsonUrl: string): Promise<Container | undefined>;
    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    static setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
}
