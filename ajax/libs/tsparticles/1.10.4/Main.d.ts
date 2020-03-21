import { Container } from "./Classes/Container";
import { IParticlesJs } from "./Interfaces/IParticlesJs";
import { IOptions } from "./Interfaces/Options/IOptions";
import { RecursivePartial } from "./Types/RecursivePartial";
declare global {
    interface Window {
        particlesJS: IParticlesJs;
        tsParticles: Main;
        pJSDom: () => Container[];
    }
}
/**
 * Main class for creating the singleton on window.
 * It's a proxy to the static [[Loader]] class
 */
declare class Main {
    /**
     * Loads an options object from the provided array to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options array to get the item from
     * @param index if provided gets the corresponding item from the array
     */
    loadFromArray(tagId: string, params: RecursivePartial<IOptions>[], index?: number): Container | undefined;
    /**
     * Loads the provided options to create a [[Container]] object.
     * @param tagId the particles container element id
     * @param params the options object to initialize the [[Container]]
     */
    load(tagId: string, params: RecursivePartial<IOptions>): Container | undefined;
    /**
     * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
     * This method is async, so if you need a callback refer to JavaScript function `fetch`
     * @param tagId the particles container element id
     * @param pathConfigJson the json path to use in the GET request
     */
    loadJSON(tagId: string, pathConfigJson: string): Promise<Container | undefined>;
    /**
     * Adds an additional click handler to all the loaded [[Container]] objects.
     * @param callback the function called after the click event is fired
     */
    setOnClickHandler(callback: EventListenerOrEventListenerObject): void;
    /**
     * All the [[Container]] objects loaded
     */
    dom(): Container[];
    /**
     * Retrieves a [[Container]] from all the objects loaded
     * @param index the object index
     */
    domItem(index: number): Container;
}
export {};
