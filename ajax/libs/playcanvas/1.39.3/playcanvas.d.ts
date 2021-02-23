/**
 * Create a new animation node.
 */
export class Node {
}

/**
 * An animation is a sequence of keyframe arrays which map to the nodes of a skeletal hierarchy.
It controls how the nodes of the hierarchy are transformed over time.
 * @property name - Human-readable name of the animation.
 * @property duration - Duration of the animation in seconds.
 */
export class Animation {
    /**
     * Gets a {@link Node} by name.
     * @param name - The name of the {@link Node}.
     * @returns The {@link Node} with the specified name.
     */
    getNode(name: string): Node;
    /**
     * A read-only property to get array of animation nodes.
     */
    readonly nodes: Node[];
    /**
     * Adds a node to the internal nodes array.
     * @param node - The node to add.
     */
    addNode(node: Node): void;
    /**
     * Human-readable name of the animation.
    */
    name: string;
    /**
     * Duration of the animation in seconds.
    */
    duration: number;
}

/**
 * Represents a skeleton used to play animations.
 * @property looping - Determines whether skeleton is looping its animation.
 * @param graph - The root {@link GraphNode} of the skeleton.
 */
export class Skeleton {
    constructor(graph: GraphNode);
    /**
     * Animation currently assigned to skeleton.
     */
    animation: Animation;
    /**
     * Current time of currently active animation in seconds.
    This value is between zero and the duration of the animation.
     */
    currentTime: number;
    /**
     * Read-only property that returns number of nodes of a skeleton.
     */
    readonly numNodes: number;
    /**
     * Progresses The animation assigned to The specified skeleton by The
    supplied time delta. If the delta takes the animation passed its end point, if
    the skeleton is set to loop, the animation will continue from the beginning.
    Otherwise, the animation's current time will remain at its duration (i.e. the
    end).
     * @param delta - The time in seconds to progress the skeleton's animation.
     */
    addTime(delta: number): void;
    /**
     * Blends two skeletons together.
     * @param skel1 - Skeleton holding the first pose to be blended.
     * @param skel2 - Skeleton holding the second pose to be blended.
     * @param alpha - The value controlling the interpolation in relation to the two input
    skeletons. The value is in the range 0 to 1, 0 generating skel1, 1 generating skel2 and anything
    in between generating a spherical interpolation between the two.
     */
    blend(skel1: Skeleton, skel2: Skeleton, alpha: number): void;
    /**
     * Links a skeleton to a node hierarchy. The nodes animated skeleton are
    then subsequently used to drive the local transformation matrices of the node
    hierarchy.
     * @param graph - The root node of the graph that the skeleton is to drive.
     */
    setGraph(graph: GraphNode): void;
    /**
     * Synchronizes the currently linked node hierarchy with the current state of the
    skeleton. Internally, this function converts the interpolated keyframe at each node in the
    skeleton into the local transformation matrix at each corresponding node in the linked node
    hierarchy.
     */
    updateGraph(): void;
    /**
     * Determines whether skeleton is looping its animation.
    */
    looping: boolean;
}

/**
 * An object that manages the case where an object holds a reference to an asset and needs to be notified when
changes occur in the asset. e.g. notifications include load, add and remove events.
 * @example
 * var reference = new pc.AssetReference('textureAsset', this, this.app.assets, {
    load: this.onTextureAssetLoad,
    add: this.onTextureAssetAdd,
    remove: this.onTextureAssetRemove
}, this);
reference.id = this.textureAsset.id;
 * @property id - Get or set the asset id which this references. One of either id or url must be set to initialize an asset reference.
 * @property url - Get or set the asset url which this references. One of either id or url must be called to initialize an asset reference.
 * @param propertyName - The name of the property that the asset is stored under, passed into callbacks to enable updating.
 * @param parent - The parent object that contains the asset reference, passed into callbacks to enable updating. Currently an asset, but could be component or other.
 * @param registry - The asset registry that stores all assets.
 * @param callbacks - A set of functions called when the asset state changes: load, add, remove.
 * @param [callbacks.load] - The function called when the asset loads load(propertyName, parent, asset).
 * @param [callbacks.add] - The function called when the asset is added to the registry add(propertyName, parent, asset).
 * @param [callbacks.remove] - The function called when the asset is remove from the registry remove(propertyName, parent, asset).
 * @param [callbacks.unload] - The function called when the asset is unloaded unload(propertyName, parent, asset).
 * @param [scope] - The scope to call the callbacks in
 */
export class AssetReference {
    constructor(propertyName: string, parent: Asset | any, registry: AssetRegistry, callbacks: {
        load?: any;
        add?: any;
        remove?: any;
        unload?: any;
    }, scope?: any);
    /**
     * Get or set the asset id which this references. One of either id or url must be set to initialize an asset reference.
    */
    id: number;
    /**
     * Get or set the asset url which this references. One of either id or url must be called to initialize an asset reference.
    */
    url: string;
}

/**
 * Create an instance of an AssetRegistry.
Note: PlayCanvas scripts are provided with an AssetRegistry instance as 'app.assets'.
 * @property prefix - A URL prefix that will be added to all asset loading requests.
 * @param loader - The ResourceLoader used to load the asset files.
 */
export class AssetRegistry extends EventHandler {
    constructor(loader: ResourceLoader);
    /**
     * Create a filtered list of assets from the registry.
     * @param filters - Properties to filter on, currently supports: 'preload: true|false'.
     * @returns The filtered list of assets.
     */
    list(filters: any): Asset[];
    /**
     * Add an asset to the registry.
     * @example
     * var asset = new pc.Asset("My Asset", "texture", {
        url: "../path/to/image.jpg"
    });
    app.assets.add(asset);
     * @param asset - The asset to add.
     */
    add(asset: Asset): void;
    /**
     * Remove an asset from the registry.
     * @example
     * var asset = app.assets.get(100);
    app.assets.remove(asset);
     * @param asset - The asset to remove.
     * @returns True if the asset was successfully removed and false otherwise.
     */
    remove(asset: Asset): boolean;
    /**
     * Retrieve an asset from the registry by its id field.
     * @example
     * var asset = app.assets.get(100);
     * @param id - The id of the asset to get.
     * @returns The asset.
     */
    get(id: number): Asset;
    /**
     * Retrieve an asset from the registry by it's file's URL field.
     * @example
     * var asset = app.assets.getByUrl("../path/to/image.jpg");
     * @param url - The url of the asset to get.
     * @returns The asset.
     */
    getByUrl(url: string): Asset;
    /**
     * Load the asset's file from a remote source. Listen for "load" events on the asset to find out when it is loaded.
     * @example
     * // load some assets
    var assetsToLoad = [
        app.assets.find("My Asset"),
        app.assets.find("Another Asset")
    ];
    var count = 0;
    assetsToLoad.forEach(function (assetToLoad) {
        assetToLoad.ready(function (asset) {
            count++;
            if (count === assetsToLoad.length) {
                // done
            }
        });
        app.assets.load(assetToLoad);
    });
     * @param asset - The asset to load.
     */
    load(asset: Asset): void;
    /**
     * Use this to load and create an asset if you don't have assets created. Usually you would only use this
    if you are not integrated with the PlayCanvas Editor.
     * @example
     * app.assets.loadFromUrl("../path/to/texture.jpg", "texture", function (err, asset) {
        var texture = asset.resource;
    });
     * @param url - The url to load.
     * @param type - The type of asset to load.
     * @param callback - Function called when asset is loaded, passed (err, asset), where err is null if no errors were encountered.
     */
    loadFromUrl(url: string, type: string, callback: callbacks.LoadAsset): void;
    /**
     * Use this to load and create an asset when both the URL and filename are required. For example, use this function when loading
    BLOB assets, where the URL does not adequately identify the file.
     * @example
     * var file = magicallyAttainAFile();
    app.assets.loadFromUrlAndFilename(URL.createObjectURL(file), "texture.png", "texture", function (err, asset) {
        var texture = asset.resource;
    });
     * @param url - The url to load.
     * @param filename - The filename of the asset to load.
     * @param type - The type of asset to load.
     * @param callback - Function called when asset is loaded, passed (err, asset), where err is null if no errors were encountered.
     */
    loadFromUrlAndFilename(url: string, filename: string, type: string, callback: callbacks.LoadAsset): void;
    /**
     * Return all Assets with the specified name and type found in the registry.
     * @example
     * var assets = app.assets.findAll("myTextureAsset", "texture");
    console.log("Found " + assets.length + " assets called " + name);
     * @param name - The name of the Assets to find.
     * @param [type] - The type of the Assets to find.
     * @returns A list of all Assets found.
     */
    findAll(name: string, type?: string): Asset[];
    /**
     * Return all Assets that satisfy the search query.
    Query can be simply a string, or comma separated strings,
    to have inclusive results of assets that match at least one query.
    A query that consists of an array of tags can be used to match assets that have each tag of array.
     * @example
     * var assets = app.assets.findByTag("level-1");
    // returns all assets that tagged by `level-1`
     * @example
     * var assets = app.assets.findByTag("level-1", "level-2");
    // returns all assets that tagged by `level-1` OR `level-2`
     * @example
     * var assets = app.assets.findByTag(["level-1", "monster"]);
    // returns all assets that tagged by `level-1` AND `monster`
     * @example
     * var assets = app.assets.findByTag(["level-1", "monster"], ["level-2", "monster"]);
    // returns all assets that tagged by (`level-1` AND `monster`) OR (`level-2` AND `monster`)
     * @param query - Name of a tag or array of tags.
     * @returns A list of all Assets matched query.
     */
    findByTag(...query: any[]): Asset[];
    /**
     * Return all Assets that satisfy filter callback.
     * @example
     * var assets = app.assets.filter(function (asset) {
        return asset.name.indexOf('monster') !== -1;
    });
    console.log("Found " + assets.length + " assets, where names contains 'monster'");
     * @param callback - The callback function that is used to filter assets, return `true` to include asset to result list.
     * @returns A list of all Assets found.
     */
    filter(callback: callbacks.FilterAsset): Asset[];
    /**
     * Return the first Asset with the specified name and type found in the registry.
     * @example
     * var asset = app.assets.find("myTextureAsset", "texture");
     * @param name - The name of the Asset to find.
     * @param [type] - The type of the Asset to find.
     * @returns A single Asset or null if no Asset is found.
     */
    find(name: string, type?: string): Asset;
    /**
     * A URL prefix that will be added to all asset loading requests.
    */
    prefix: string;
}

/**
 * Create a new Asset record. Generally, Assets are created in the loading process and you won't need to create them by hand.
 * @example
 * var file = {
    filename: "filename.txt",
    url: "/example/filename.txt"
};
 * @example
 * var asset = new pc.Asset("a texture", "texture", {
    url: "http://example.com/my/assets/here/texture.png"
});
 * @property name - The name of the asset
 * @property id - The asset id
 * @property type - The type of the asset. One of ["animation", "audio", "binary", "cubemap", "css", "font", "json", "html", "material", "model", "script", "shader", "text", "texture"]
 * @property tags - Interface for tagging. Allows to find assets by tags using {@link AssetRegistry#findByTag} method.
 * @property file - The file details or null if no file
 * @property [file.url] - The URL of the resource file that contains the asset data
 * @property [file.filename] - The filename of the resource file or null if no filename was set (e.g from using {@link AssetRegistry#loadFromUrl})
 * @property [file.size] - The size of the resource file or null if no size was set (e.g from using {@link AssetRegistry#loadFromUrl})
 * @property [file.hash] - The MD5 hash of the resource file data and the Asset data field or null if hash was set (e.g from using {@link AssetRegistry#loadFromUrl})
 * @property [file.contents] - Optional file contents. This is faster than wrapping the data
in a (base64 encoded) blob. Currently only used by container assets.
 * @property [data] - Optional JSON data that contains either the complete resource data. (e.g. in the case of a material) or additional data (e.g. in the case of a model it contains mappings from mesh to material)
 * @property [options] - Optional JSON data that contains the asset handler options.
 * @property resource - A reference to the resource when the asset is loaded. e.g. a {@link Texture} or a {@link Model}
 * @property resources - A reference to the resources of the asset when it's loaded. An asset can hold more runtime resources than one e.g. cubemaps
 * @property preload - If true the asset will be loaded during the preload phase of application set up.
 * @property loaded - True if the resource is loaded. e.g. if asset.resource is not null
 * @property loading - True if the resource is currently being loaded
 * @property registry - The asset registry that this Asset belongs to
 * @param name - A non-unique but human-readable name which can be later used to retrieve the asset.
 * @param type - Type of asset. One of ["animation", "audio", "binary", "cubemap", "css", "font", "json", "html", "material", "model", "script", "shader", "text", "texture"]
 * @param [file] - Details about the file the asset is made from. At the least must contain the 'url' field. For assets that don't contain file data use null.
 * @param [data] - JSON object with additional data about the asset. (e.g. for texture and model assets) or contains the asset data itself (e.g. in the case of materials)
 * @param [options] - The asset handler options. For container options see {@link ContainerHandler}
 * @param [options.crossOrigin] - For use with texture resources. For browser-supported image formats only, enable cross origin.
 */
export class Asset extends EventHandler {
    constructor(name: string, type: string, file?: any, data?: any, options?: {
        crossOrigin?: boolean;
    });
    /**
     * Return the URL required to fetch the file for this asset.
     * @example
     * var assets = app.assets.find("My Image", "texture");
    var img = "&lt;img src='" + assets[0].getFileUrl() + "'&gt;";
     * @returns The URL.
     */
    getFileUrl(): string;
    /**
     * Take a callback which is called as soon as the asset is loaded. If the asset is already loaded the callback is called straight away.
     * @example
     * var asset = app.assets.find("My Asset");
    asset.ready(function (asset) {
      // asset loaded
    });
    app.assets.load(asset);
     * @param callback - The function called when the asset is ready. Passed the (asset) arguments.
     * @param [scope] - Scope object to use when calling the callback.
     */
    ready(callback: callbacks.AssetReady, scope?: any): void;
    /**
     * Destroys the associated resource and marks asset as unloaded.
     * @example
     * var asset = app.assets.find("My Asset");
    asset.unload();
    // asset.resource is null
     */
    unload(): void;
    /**
     * The name of the asset
    */
    name: string;
    /**
     * The asset id
    */
    id: number;
    /**
     * The type of the asset. One of ["animation", "audio", "binary", "cubemap", "css", "font", "json", "html", "material", "model", "script", "shader", "text", "texture"]
    */
    type: string;
    /**
     * Interface for tagging. Allows to find assets by tags using {@link AssetRegistry#findByTag} method.
    */
    tags: Tags;
    /**
     * The file details or null if no file
    */
    file: {
        url?: string;
        filename?: string;
        size?: number;
        hash?: string;
        contents?: ArrayBuffer;
    };
    /**
     * Optional JSON data that contains either the complete resource data. (e.g. in the case of a material) or additional data (e.g. in the case of a model it contains mappings from mesh to material)
    */
    data?: any;
    /**
     * Optional JSON data that contains the asset handler options.
    */
    options?: any;
    /**
     * A reference to the resource when the asset is loaded. e.g. a {@link Texture} or a {@link Model}
    */
    resource: any;
    /**
     * A reference to the resources of the asset when it's loaded. An asset can hold more runtime resources than one e.g. cubemaps
    */
    resources: any[];
    /**
     * If true the asset will be loaded during the preload phase of application set up.
    */
    preload: boolean;
    /**
     * True if the resource is loaded. e.g. if asset.resource is not null
    */
    loaded: boolean;
    /**
     * True if the resource is currently being loaded
    */
    loading: boolean;
    /**
     * The asset registry that this Asset belongs to
    */
    registry: AssetRegistry;
}

/**
 * Asset type name for animation.
 */
export const ASSET_ANIMATION: string;

/**
 * Asset type name for audio.
 */
export const ASSET_AUDIO: string;

/**
 * Asset type name for image.
 */
export const ASSET_IMAGE: string;

/**
 * Asset type name for json.
 */
export const ASSET_JSON: string;

/**
 * Asset type name for model.
 */
export const ASSET_MODEL: string;

/**
 * Asset type name for material.
 */
export const ASSET_MATERIAL: string;

/**
 * Asset type name for text.
 */
export const ASSET_TEXT: string;

/**
 * Asset type name for texture.
 */
export const ASSET_TEXTURE: string;

/**
 * Asset type name for cubemap.
 */
export const ASSET_CUBEMAP: string;

/**
 * Asset type name for shader.
 */
export const ASSET_SHADER: string;

/**
 * Asset type name for CSS.
 */
export const ASSET_CSS: string;

/**
 * Asset type name for HTML.
 */
export const ASSET_HTML: string;

/**
 * Asset type name for script.
 */
export const ASSET_SCRIPT: string;

/**
 * Asset type name for a container.
 */
export const ASSET_CONTAINER: string;

/**
 * Linear distance model.
 */
export const DISTANCE_LINEAR: string;

/**
 * Inverse distance model.
 */
export const DISTANCE_INVERSE: string;

/**
 * Exponential distance model.
 */
export const DISTANCE_EXPONENTIAL: string;

/**
 * Namespace for callback definitions.
 */
export namespace callbacks {
    /**
     * Callback used by {@link EventHandler} functions. Note the callback is limited to 8 arguments.
     * @param [arg1] - First argument that is passed from caller.
     * @param [arg2] - Second argument that is passed from caller.
     * @param [arg3] - Third argument that is passed from caller.
     * @param [arg4] - Fourth argument that is passed from caller.
     * @param [arg5] - Fifth argument that is passed from caller.
     * @param [arg6] - Sixth argument that is passed from caller.
     * @param [arg7] - Seventh argument that is passed from caller.
     * @param [arg8] - Eighth argument that is passed from caller.
     */
    type HandleEvent = (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, arg6?: any, arg7?: any, arg8?: any) => void;
    /**
     * Callback used by {@link AssetRegistry#loadFromUrl} and called when an asset is loaded (or an error occurs).
     * @param err - The error message is null if no errors were encountered.
     * @param [asset] - The loaded asset if no errors were encountered.
     */
    type LoadAsset = (err: string | null, asset?: Asset) => void;
    /**
     * Callback used by {@link AssetRegistry#filter} to filter assets.
     * @param asset - The current asset to filter.
     */
    type FilterAsset = (asset: Asset) => boolean;
    /**
     * Callback used by {@link Asset#ready} and called when an asset is ready.
     * @param asset - The ready asset.
     */
    type AssetReady = (asset: Asset) => void;
    /**
     * Callback used by {@link Application#configure} when configuration file is loaded and parsed (or an error occurs).
     * @param err - The error message in the case where the loading or parsing fails.
     */
    type ConfigureApp = (err: string | null) => void;
    /**
     * Callback used by {@link Application#preload} when all assets (marked as 'preload') are loaded.
     */
    type PreloadApp = () => void;
    /**
     * Callback used by {@link SceneRegistry#loadSceneHierarchy}.
     * @param err - The error message in the case where the loading or parsing fails.
     * @param [entity] - The loaded root entity if no errors were encountered.
     */
    type LoadHierarchy = (err: string | null, entity?: Entity) => void;
    /**
     * Callback used by {@link SceneRegistry#loadSceneSettings}.
     * @param err - The error message in the case where the loading or parsing fails.
     */
    type LoadSettings = (err: string | null) => void;
    /**
     * Callback used by {@link SceneRegistry#loadScene}.
     * @param err - The error message in the case where the loading or parsing fails.
     * @param [entity] - The loaded root entity if no errors were encountered.
     */
    type LoadScene = (err: string | null, entity?: Entity) => void;
    /**
     * Callback used by {@link CameraComponent#calculateTransform} and {@link CameraComponent#calculateProjection}.
     * @param transformMatrix - Output of the function.
     * @param view - Type of view. Can be {@link VIEW_CENTER}, {@link VIEW_LEFT} or {@link VIEW_RIGHT}. Left and right are only used in stereo rendering.
     */
    type CalculateMatrix = (transformMatrix: Mat4, view: number) => void;
    /**
     * Callback used by {@link Layer} to calculate the "sort distance" for a {@link MeshInstance}, which determines its place in the render order.
     * @param meshInstance - The mesh instance.
     * @param cameraPosition - The position of the camera.
     * @param cameraForward - The forward vector of the camera.
     */
    type CalculateSortDistance = (meshInstance: MeshInstance, cameraPosition: Vec3, cameraForward: Vec3) => void;
    /**
     * Callback used by {@link CameraComponent#enterVr} and {@link CameraComponent#exitVr}.
     * @param err - On success it is null on failure it is the error message.
     */
    type VrCamera = (err: string | null) => void;
    /**
     * Callback used by {@link script.createLoadingScreen}.
     * @param app - The application.
     */
    type CreateScreen = (app: Application) => void;
    /**
     * Callback used by {@link Mouse#enablePointerLock} and {@link Application#disablePointerLock}.
     */
    type LockMouse = () => void;
    /**
     * Callback used by {@link Http#get}, {@link Http#post}, {@link Http#put}, {@link Http#del}, and {@link Http#request}.
     * @param err - The error code, message, or exception in the case where the request fails.
     * @param [response] - The response data if no errors were encountered. (format depends on response type: text, Object, ArrayBuffer, XML).
     */
    type HttpResponse = (err: number | string | Error | null, response?: any) => void;
    /**
     * Callback used by {@link ResourceHandler#load} when a resource is loaded (or an error occurs).
     * @param err - The error message in the case where the load fails.
     * @param [response] - The raw data that has been successfully loaded.
     */
    type ResourceHandler = (err: string | null, response?: any) => void;
    /**
     * Callback used by {@link ResourceLoader#load} when a resource is loaded (or an error occurs).
     * @param err - The error message in the case where the load fails.
     * @param [resource] - The resource that has been successfully loaded.
     */
    type ResourceLoader = (err: string | null, resource?: any) => void;
    /**
     * Callback used by {@link ModelHandler#addParser} to decide on which parser to use.
     * @param url - The resource url.
     * @param data - The raw model data.
     */
    type AddParser = (url: string, data: any) => boolean;
    /**
     * Callback used by {@link GraphNode#find} and {@link GraphNode#findOne} to search through a graph node and all of its descendants.
     * @param node - The current graph node.
     */
    type FindNode = (node: GraphNode) => boolean;
    /**
     * Callback used by {@link GraphNode#forEach} to iterate through a graph node and all of its descendants.
     * @param node - The current graph node.
     */
    type ForEach = (node: GraphNode) => void;
    /**
     * Callback used by {@link StandardMaterial#onUpdateShader}.
     * @param options - An object with shader generator settings (based on current material and scene properties), that you can change and then return.
    Properties of the object passed into this function are documented in {@link StandardMaterial#onUpdateShader}.
     */
    type UpdateShader = (options: any) => any;
    /**
     * Callback used by {@link XrManager#endXr} and {@link XrManager#startXr}.
     * @param err - The Error object or null if operation was successfull.
     */
    type XrError = (err: Error | null) => void;
    /**
     * Callback used by {@link XrHitTest#start} and {@link XrHitTest#startForInputSource}.
     * @param err - The Error object if failed to create hit test source or null.
     * @param hitTestSource - object that provides access to hit results against real world geometry.
     */
    type XrHitTestStart = (err: Error | null, hitTestSource: XrHitTestSource | null) => void;
}

/**
 * Root namespace for the PlayCanvas Engine.
 */
export namespace pc { }

/**
 * Create a new event handler.
 * @example
 * var obj = new EventHandlerSubclass();

// subscribe to an event
obj.on('hello', function (str) {
    console.log('event hello is fired', str);
});

// fire event
obj.fire('hello', 'world');
 */
export class EventHandler {
    /**
     * Attach an event handler to an event.
     * @example
     * obj.on('test', function (a, b) {
        console.log(a + b);
    });
    obj.fire('test', 1, 2); // prints 3 to the console
     * @param name - Name of the event to bind the callback to.
     * @param callback - Function that is called when event is fired. Note the callback is limited to 8 arguments.
     * @param [scope] - Object to use as 'this' when the event is fired, defaults to current this.
     * @returns Self for chaining.
     */
    on(name: string, callback: callbacks.HandleEvent, scope?: any): EventHandler;
    /**
     * Detach an event handler from an event. If callback is not provided then all callbacks are unbound from the event,
    if scope is not provided then all events with the callback will be unbound.
     * @example
     * var handler = function () {
    };
    obj.on('test', handler);
    
    obj.off(); // Removes all events
    obj.off('test'); // Removes all events called 'test'
    obj.off('test', handler); // Removes all handler functions, called 'test'
    obj.off('test', handler, this); // Removes all hander functions, called 'test' with scope this
     * @param [name] - Name of the event to unbind.
     * @param [callback] - Function to be unbound.
     * @param [scope] - Scope that was used as the this when the event is fired.
     * @returns Self for chaining.
     */
    off(name?: string, callback?: callbacks.HandleEvent, scope?: any): EventHandler;
    /**
     * Fire an event, all additional arguments are passed on to the event listener.
     * @example
     * obj.fire('test', 'This is the message');
     * @param name - Name of event to fire.
     * @param [arg1] - First argument that is passed to the event handler.
     * @param [arg2] - Second argument that is passed to the event handler.
     * @param [arg3] - Third argument that is passed to the event handler.
     * @param [arg4] - Fourth argument that is passed to the event handler.
     * @param [arg5] - Fifth argument that is passed to the event handler.
     * @param [arg6] - Sixth argument that is passed to the event handler.
     * @param [arg7] - Seventh argument that is passed to the event handler.
     * @param [arg8] - Eighth argument that is passed to the event handler.
     * @returns Self for chaining.
     */
    fire(name: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any, arg6?: any, arg7?: any, arg8?: any): EventHandler;
    /**
     * Attach an event handler to an event. This handler will be removed after being fired once.
     * @example
     * obj.once('test', function (a, b) {
        console.log(a + b);
    });
    obj.fire('test', 1, 2); // prints 3 to the console
    obj.fire('test', 1, 2); // not going to get handled
     * @param name - Name of the event to bind the callback to.
     * @param callback - Function that is called when event is fired. Note the callback is limited to 8 arguments.
     * @param [scope] - Object to use as 'this' when the event is fired, defaults to current this.
     * @returns Self for chaining.
     */
    once(name: string, callback: callbacks.HandleEvent, scope?: any): EventHandler;
    /**
     * Test if there are any handlers bound to an event name.
     * @example
     * obj.on('test', function () { }); // bind an event to 'test'
    obj.hasEvent('test'); // returns true
    obj.hasEvent('hello'); // returns false
     * @param name - The name of the event to test.
     * @returns True if the object has handlers bound to the specified event name.
     */
    hasEvent(name: string): boolean;
}

/**
 * Basically a very large random number (128-bit) which means the probability of creating two that clash is vanishingly small.
GUIDs are used as the unique identifiers for Entities.
 */
export namespace guid {
    /**
     * Create an RFC4122 version 4 compliant GUID.
     * @returns A new GUID.
     */
    function create(): string;
}

/**
 * File path API.
 */
export namespace path {
    /**
     * The character that separates path segments.
     */
    const delimiter: string;
    /**
     * Join two or more sections of file path together, inserting a
    delimiter if needed.
     * @example
     * var path = pc.path.join('foo', 'bar');
    console.log(path); // Prints 'foo/bar'
     * @example
     * var path = pc.path.join('alpha', 'beta', 'gamma');
    console.log(path); // Prints 'alpha/beta/gamma'
     * @param section - Section of path to join. 2 or more can be
    provided as parameters.
     * @returns The joined file path.
     */
    function join(...section: string[]): string;
    /**
     * Normalize the path by removing '.' and '..' instances.
     * @param pathname - The path to normalize.
     * @returns The normalized path.
     */
    function normalize(pathname: string): string;
    /**
     * Split the pathname path into a pair [head, tail] where tail is the final part of the path
    after the last delimiter and head is everything leading up to that. tail will never contain a slash.
     * @param pathname - The path to split.
     * @returns The split path which is an array of two strings, the path and the filename.
     */
    function split(pathname: string): string[];
    /**
     * Return the basename of the path. That is the second element of the pair returned by
    passing path into {@link path.split}.
     * @example
     * pc.path.getBasename("/path/to/file.txt"); // returns "path.txt"
    pc.path.getBasename("/path/to/dir"); // returns "dir"
     * @param pathname - The path to process.
     * @returns The basename.
     */
    function getBasename(pathname: string): string;
    /**
     * Get the directory name from the path. This is everything up to the final instance of {@link path.delimiter}.
     * @param pathname - The path to get the directory from.
     * @returns The directory part of the path.
     */
    function getDirectory(pathname: string): string;
    /**
     * Return the extension of the path. Pop the last value of a list after path is split by question mark and comma.
     * @example
     * pc.path.getExtension("/path/to/file.txt"); // returns ".txt"
    pc.path.getExtension("/path/to/file.jpg"); // returns ".jpg"
    pc.path.getExtension("/path/to/file.txt?function=getExtension"); // returns ".txt"
     * @param pathname - The path to process.
     * @returns The extension.
     */
    function getExtension(pathname: string): string;
    /**
     * Check if a string s is relative path.
     * @example
     * pc.path.isRelativePath("file.txt"); // returns true
    pc.path.isRelativePath("path/to/file.txt"); // returns true
    pc.path.isRelativePath("./path/to/file.txt"); // returns true
    pc.path.isRelativePath("../path/to/file.jpg"); // returns true
    pc.path.isRelativePath("/path/to/file.jpg"); // returns false
    pc.path.isRelativePath("http://path/to/file.jpg"); // returns false
     * @param pathname - The path to process.
     * @returns True if s doesn't start with slash and doesn't include colon and double slash.
     */
    function isRelativePath(pathname: string): boolean;
    /**
     * Return the path without file name. If path is relative path, start with period.
     * @example
     * pc.path.extractPath("path/to/file.txt");    // returns "./path/to"
    pc.path.extractPath("./path/to/file.txt");  // returns "./path/to"
    pc.path.extractPath("../path/to/file.txt"); // returns "../path/to"
    pc.path.extractPath("/path/to/file.txt");   // returns "/path/to"
     * @param pathname - The full path to process.
     * @returns The path without a last element from list split by slash.
     */
    function extractPath(pathname: string): string;
}

/**
 * Global namespace that stores flags regarding platform environment and features support.
 * @example
 * if (pc.platform.touch) {
    // touch is supported
}
 */
export namespace platform {
    /**
     * Is it a desktop or laptop device.
     */
    const desktop: boolean;
    /**
     * Is it a mobile or tablet device.
     */
    const mobile: boolean;
    /**
     * If it is iOS.
     */
    const ios: boolean;
    /**
     * If it is Android.
     */
    const android: boolean;
    /**
     * If it is Windows.
     */
    const windows: boolean;
    /**
     * If it is Xbox.
     */
    const xbox: boolean;
    /**
     * If platform supports gamepads.
     */
    const gamepads: boolean;
    /**
     * If platform supports touch input.
     */
    const touch: boolean;
    /**
     * If the platform supports Web Workers.
     */
    const workers: boolean;
}

/**
 * Extended String API.
 */
export namespace string {
    /**
     * All lowercase letters.
     */
    const ASCII_LOWERCASE: string;
    /**
     * All uppercase letters.
     */
    const ASCII_UPPERCASE: string;
    /**
     * All ASCII letters.
     */
    const ASCII_LETTERS: string;
    /**
     * Return a string with {n} replaced with the n-th argument.
     * @example
     * var s = pc.string.format("Hello {0}", "world");
    console.log(s); // Prints "Hello world"
     * @param s - The string to format.
     * @param [arguments] - All other arguments are substituted into the string.
     * @returns The formatted string.
     */
    function format(s: string, arguments?: any): string;
    /**
     * Convert a string value to a boolean. In non-strict mode (the default), 'true' is converted to true, all other values
    are converted to false. In strict mode, 'true' is converted to true, 'false' is converted to false, all other values will throw
    an Exception.
     * @param s - The string to convert.
     * @param [strict] - In strict mode an Exception is thrown if s is not an accepted string value. Defaults to false.
     * @returns The converted value.
     */
    function toBool(s: string, strict?: boolean): boolean;
    /**
     * Get the code point number for a character in a string. Polyfill for
    [`codePointAt`]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt}.
     * @param string - The string to get the code point from.
     * @param [i] - The index in the string.
     * @returns The code point value for the character in the string.
     */
    function getCodePoint(string: string, i?: number): number;
    /**
     * Gets an array of all code points in a string.
     * @param string - The string to get code points from.
     * @returns The code points in the string.
     */
    function getCodePoints(string: string): number[];
    /**
     * Gets an array of all grapheme clusters (visible symbols) in a string. This is needed because
    some symbols (such as emoji or accented characters) are actually made up of multiple character codes. See
    {@link https://mathiasbynens.be/notes/javascript-unicode here} for more info.
     * @param string - The string to break into symbols.
     * @returns The symbols in the string.
     */
    function getSymbols(string: string): string[];
    /**
     * Get the string for a given code point or set of code points. Polyfill for
    [`fromCodePoint`]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint}.
     * @param args - The code points to convert to a string.
     * @returns The converted string.
     */
    function fromCodePoint(...args: number[]): string;
}

/**
 * Create an instance of a Tags.
 * @param [parent] - Parent object who tags belong to.
Note: Tags are automatically available on {@link Entity} and {@link Asset} as `tags` field.
 */
export class Tags extends EventHandler {
    constructor(parent?: any);
    /**
     * Add a tag, duplicates are ignored. Can be array or comma separated arguments for multiple tags.
     * @example
     * tags.add('level-1');
     * @example
     * tags.add('ui', 'settings');
     * @example
     * tags.add(['level-2', 'mob']);
     * @param name - Name of a tag, or array of tags.
     * @returns True if any tag were added.
     */
    add(...name: any[]): boolean;
    /**
     * Remove tag.
     * @example
     * tags.remove('level-1');
     * @example
     * tags.remove('ui', 'settings');
     * @example
     * tags.remove(['level-2', 'mob']);
     * @param name - Name of a tag or array of tags.
     * @returns True if any tag were removed.
     */
    remove(...name: any[]): boolean;
    /**
     * Remove all tags.
     * @example
     * tags.clear();
     */
    clear(): void;
    /**
     * Check if tags satisfy filters.
    Filters can be provided by simple name of tag, as well as by array of tags.
    When an array is provided it will check if tags contain each tag within the array.
    If any of comma separated argument is satisfied, then it will return true.
    Any number of combinations are valid, and order is irrelevant.
     * @example
     * tags.has('player'); // player
     * @example
     * tags.has('mob', 'player'); // player OR mob
     * @example
     * tags.has(['level-1', 'mob']); // monster AND level-1
     * @example
     * tags.has(['ui', 'settings'], ['ui', 'levels']); // (ui AND settings) OR (ui AND levels)
     * @param query - Name of a tag or array of tags.
     * @returns True if filters are satisfied.
     */
    has(...query: any[]): boolean;
    /**
     * Returns immutable array of tags.
     * @returns Copy of tags array.
     */
    list(): string[];
    /**
     * Number of tags in set.
     */
    readonly size: number;
}

/**
 * Represents the resource of a font asset.
 * @property intensity - The font intensity.
 * @property textures - The font textures.
 * @param textures - The font textures.
 * @param data - The font data.
 */
export class Font {
    constructor(textures: Texture[], data: any);
    /**
     * The font intensity.
    */
    intensity: number;
    /**
     * The font textures.
    */
    textures: Texture[];
}

/**
 * Create a new Application.
 * @example
 * // Engine-only example: create the application manually
var app = new pc.Application(canvas, options);

// Start the application's main loop
app.start();
 * @param canvas - The canvas element.
 * @param [options.elementInput] - Input handler for {@link ElementComponent}s.
 * @param [options.keyboard] - Keyboard handler for input.
 * @param [options.mouse] - Mouse handler for input.
 * @param [options.touch] - TouchDevice handler for input.
 * @param [options.gamepads] - Gamepad handler for input.
 * @param [options.scriptPrefix] - Prefix to apply to script urls before loading.
 * @param [options.assetPrefix] - Prefix to apply to asset urls before loading.
 * @param [options.graphicsDeviceOptions] - Options object that is passed into the {@link GraphicsDevice} constructor.
 * @param [options.scriptsOrder] - Scripts in order of loading first.
 */
export class Application extends EventHandler {
    constructor(canvas: Element, options: {
        elementInput?: ElementInput;
        keyboard?: Keyboard;
        mouse?: Mouse;
        touch?: TouchDevice;
        gamepads?: GamePads;
        scriptPrefix?: string;
        assetPrefix?: string;
        graphicsDeviceOptions?: any;
        scriptsOrder?: string[];
    });
    /**
     * The scene managed by the application.
     * @example
     * // Set the tone mapping property of the application's scene
    this.app.scene.toneMapping = pc.TONEMAP_FILMIC;
     */
    scene: Scene;
    /**
     * Scales the global time delta. Defaults to 1.
     * @example
     * // Set the app to run at half speed
    this.app.timeScale = 0.5;
     */
    timeScale: number;
    /**
     * Clamps per-frame delta time to an upper bound. Useful since returning from a tab
    deactivation can generate huge values for dt, which can adversely affect game state. Defaults
    to 0.1 (seconds).
     * @example
     * // Don't clamp inter-frame times of 200ms or less
    this.app.maxDeltaTime = 0.2;
     */
    maxDeltaTime: number;
    /**
     * The scene registry managed by the application.
     * @example
     * // Search the scene registry for a item with the name 'racetrack1'
    var sceneItem = this.app.scenes.find('racetrack1');
    
    // Load the scene using the item's url
    this.app.scenes.loadScene(sceneItem.url);
     */
    scenes: SceneRegistry;
    /**
     * The asset registry managed by the application.
     * @example
     * // Search the asset registry for all assets with the tag 'vehicle'
    var vehicleAssets = this.app.assets.findByTag('vehicle');
     */
    assets: AssetRegistry;
    /**
     * The graphics device used by the application.
     */
    graphicsDevice: GraphicsDevice;
    /**
     * The application's component system registry. The Application
    constructor adds the following component systems to its component system registry:
    
    * animation ({@link AnimationComponentSystem})
    * audiolistener ({@link AudioListenerComponentSystem})
    * button ({@link ButtonComponentSystem})
    * camera ({@link CameraComponentSystem})
    * collision ({@link CollisionComponentSystem})
    * element ({@link ElementComponentSystem})
    * layoutchild ({@link LayoutChildComponentSystem})
    * layoutgroup ({@link LayoutGroupComponentSystem})
    * light ({@link LightComponentSystem})
    * model ({@link ModelComponentSystem})
    * particlesystem ({@link ParticleSystemComponentSystem})
    * rigidbody ({@link RigidBodyComponentSystem})
    * screen ({@link ScreenComponentSystem})
    * script ({@link ScriptComponentSystem})
    * scrollbar ({@link ScrollbarComponentSystem})
    * scrollview ({@link ScrollViewComponentSystem})
    * sound ({@link SoundComponentSystem})
    * sprite ({@link SpriteComponentSystem})
     * @example
     * // Set global gravity to zero
    this.app.systems.rigidbody.gravity.set(0, 0, 0);
     * @example
     * // Set the global sound volume to 50%
    this.app.systems.sound.volume = 0.5;
     */
    systems: ComponentSystemRegistry;
    /**
     * The XR Manager that provides ability to start VR/AR sessions.
     * @example
     * // check if VR is available
    if (app.xr.isAvailable(pc.XRTYPE_VR)) {
        // VR is available
    }
     */
    xr: XrManager;
    /**
     * The run-time lightmapper.
     */
    lightmapper: Lightmapper;
    /**
     * The resource loader.
     */
    loader: ResourceLoader;
    /**
     * The root entity of the application.
     * @example
     * // Return the first entity called 'Camera' in a depth-first search of the scene hierarchy
    var camera = this.app.root.findByName('Camera');
     */
    root: Entity;
    /**
     * The keyboard device.
     */
    keyboard: Keyboard;
    /**
     * The mouse device.
     */
    mouse: Mouse;
    /**
     * Used to get touch events input.
     */
    touch: TouchDevice;
    /**
     * Used to access GamePad input.
     */
    gamepads: GamePads;
    /**
     * Used to handle input for {@link ElementComponent}s.
     */
    elementInput: ElementInput;
    /**
     * The application's script registry.
     */
    scripts: ScriptRegistry;
    /**
     * The application's batch manager. The batch manager is used to
    merge mesh instances in the scene, which reduces the overall number of draw
    calls, thereby boosting performance.
     */
    batcher: BatchManager;
    /**
     * When true, the application's render function is called every frame.
    Setting autoRender to false is useful to applications where the rendered image
    may often be unchanged over time. This can heavily reduce the application's
    load on the CPU and GPU. Defaults to true.
     * @example
     * // Disable rendering every frame and only render on a keydown event
    this.app.autoRender = false;
    this.app.keyboard.on('keydown', function (event) {
        this.app.renderNextFrame = true;
    }, this);
     */
    autoRender: boolean;
    /**
     * Set to true to render the scene on the next iteration of the main loop.
    This only has an effect if {@link Application#autoRender} is set to false. The
    value of renderNextFrame is set back to false again as soon as the scene has been
    rendered.
     * @example
     * // Render the scene only while space key is pressed
    if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
        this.app.renderNextFrame = true;
    }
     */
    renderNextFrame: boolean;
    /**
     * Handles localization.
     */
    i18n: I18n;
    /**
     * Get the current application. In the case where there are multiple running
    applications, the function can get an application based on a supplied canvas id. This
    function is particularly useful when the current Application is not readily available.
    For example, in the JavaScript console of the browser's developer tools.
     * @example
     * var app = pc.Application.getApplication();
     * @param [id] - If defined, the returned application should use the canvas which has this id. Otherwise current application will be returned.
     * @returns The running application, if any.
     */
    static getApplication(id?: string): Application | undefined;
    /**
     * The current fill mode of the canvas. Can be:
    
    * {@link FILLMODE_NONE}: the canvas will always match the size provided.
    * {@link FILLMODE_FILL_WINDOW}: the canvas will simply fill the window, changing aspect ratio.
    * {@link FILLMODE_KEEP_ASPECT}: the canvas will grow to fill the window as best it can while maintaining the aspect ratio.
     */
    readonly fillMode: string;
    /**
     * The current resolution mode of the canvas, Can be:
    
    * {@link RESOLUTION_AUTO}: if width and height are not provided, canvas will be resized to match canvas client size.
    * {@link RESOLUTION_FIXED}: resolution of canvas will be fixed.
     */
    readonly resolutionMode: string;
    /**
     * Load the application configuration file and apply application properties and fill the asset registry.
     * @param url - The URL of the configuration file to load.
     * @param callback - The Function called when the configuration file is loaded and parsed (or an error occurs).
     */
    configure(url: string, callback: callbacks.ConfigureApp): void;
    /**
     * Load all assets in the asset registry that are marked as 'preload'.
     * @param callback - Function called when all assets are loaded.
     */
    preload(callback: callbacks.PreloadApp): void;
    /**
     * Start the application. This function does the following:
    1. Fires an event on the application named 'start'
    2. Calls initialize for all components on entities in the hierarchy
    3. Fires an event on the application named 'initialize'
    4. Calls postInitialize for all components on entities in the hierarchy
    5. Fires an event on the application named 'postinitialize'
    6. Starts executing the main loop of the application
    This function is called internally by PlayCanvas applications made in the Editor
    but you will need to call start yourself if you are using the engine stand-alone.
     * @example
     * app.start();
     */
    start(): void;
    /**
     * Update the application. This function will call the update
    functions and then the postUpdate functions of all enabled components. It
    will then update the current state of all connected input devices.
    This function is called internally in the application's main loop and
    does not need to be called explicitly.
     * @param dt - The time delta since the last frame.
     */
    update(dt: number): void;
    /**
     * Render the application's scene. More specifically, the scene's
    {@link LayerComposition} is rendered by the application's {@link ForwardRenderer}.
    This function is called internally in the application's main loop and
    does not need to be called explicitly.
     */
    render(): void;
    /**
     * Controls how the canvas fills the window and resizes when the window changes.
     * @param mode - The mode to use when setting the size of the canvas. Can be:
    
    * {@link FILLMODE_NONE}: the canvas will always match the size provided.
    * {@link FILLMODE_FILL_WINDOW}: the canvas will simply fill the window, changing aspect ratio.
    * {@link FILLMODE_KEEP_ASPECT}: the canvas will grow to fill the window as best it can while maintaining the aspect ratio.
     * @param [width] - The width of the canvas (only used when mode is {@link FILLMODE_NONE}).
     * @param [height] - The height of the canvas (only used when mode is {@link FILLMODE_NONE}).
     */
    setCanvasFillMode(mode: string, width?: number, height?: number): void;
    /**
     * Change the resolution of the canvas, and set the way it behaves when the window is resized.
     * @param mode - The mode to use when setting the resolution. Can be:
    
    * {@link RESOLUTION_AUTO}: if width and height are not provided, canvas will be resized to match canvas client size.
    * {@link RESOLUTION_FIXED}: resolution of canvas will be fixed.
     * @param [width] - The horizontal resolution, optional in AUTO mode, if not provided canvas clientWidth is used.
     * @param [height] - The vertical resolution, optional in AUTO mode, if not provided canvas clientHeight is used.
     */
    setCanvasResolution(mode: string, width?: number, height?: number): void;
    /**
     * Queries the visibility of the window or tab in which the application is running.
     * @returns True if the application is not visible and false otherwise.
     */
    isHidden(): boolean;
    /**
     * Resize the application's canvas element in line with the current fill mode.
    In {@link FILLMODE_KEEP_ASPECT} mode, the canvas will grow to fill the window as best it can while maintaining the aspect ratio.
    In {@link FILLMODE_FILL_WINDOW} mode, the canvas will simply fill the window, changing aspect ratio.
    In {@link FILLMODE_NONE} mode, the canvas will always match the size provided.
     * @param [width] - The width of the canvas. Only used if current fill mode is {@link FILLMODE_NONE}.
     * @param [height] - The height of the canvas. Only used if current fill mode is {@link FILLMODE_NONE}.
     * @returns A object containing the values calculated to use as width and height.
     */
    resizeCanvas(width?: number, height?: number): any;
    /**
     * Apply scene settings to the current scene. Useful when your scene settings are parsed or generated from a non-URL source.
     * @example
     * var settings = {
        physics: {
            gravity: [0, -9.8, 0]
        },
        render: {
            fog_end: 1000,
            tonemapping: 0,
            skybox: null,
            fog_density: 0.01,
            gamma_correction: 1,
            exposure: 1,
            fog_start: 1,
            global_ambient: [0, 0, 0],
            skyboxIntensity: 1,
            skyboxRotation: [0, 0, 0],
            fog_color: [0, 0, 0],
            lightmapMode: 1,
            fog: 'none',
            lightmapMaxResolution: 2048,
            skyboxMip: 2,
            lightmapSizeMultiplier: 16
        }
    };
    app.applySceneSettings(settings);
     * @param settings - The scene settings to be applied.
     * @param settings.physics - The physics settings to be applied.
     * @param settings.physics.gravity - The world space vector representing global gravity in the physics simulation. Must be a fixed size array with three number elements, corresponding to each axis [ X, Y, Z ].
     * @param settings.render - The rendering settings to be applied.
     * @param settings.render.global_ambient - The color of the scene's ambient light. Must be a fixed size array with three number elements, corresponding to each color channel [ R, G, B ].
     * @param settings.render.fog - The type of fog used by the scene. Can be:
    
    * {@link FOG_NONE}
    * {@link FOG_LINEAR}
    * {@link FOG_EXP}
    * {@link FOG_EXP2}
     * @param settings.render.fog_color - The color of the fog (if enabled). Must be a fixed size array with three number elements, corresponding to each color channel [ R, G, B ].
     * @param settings.render.fog_density - The density of the fog (if enabled). This property is only valid if the fog property is set to {@link FOG_EXP} or {@link FOG_EXP2}.
     * @param settings.render.fog_start - The distance from the viewpoint where linear fog begins. This property is only valid if the fog property is set to {@link FOG_LINEAR}.
     * @param settings.render.fog_end - The distance from the viewpoint where linear fog reaches its maximum. This property is only valid if the fog property is set to {@link FOG_LINEAR}.
     * @param settings.render.gamma_correction - The gamma correction to apply when rendering the scene. Can be:
    
    * {@link GAMMA_NONE}
    * {@link GAMMA_SRGB}
     * @param settings.render.tonemapping - The tonemapping transform to apply when writing fragments to the
    frame buffer. Can be:
    
    * {@link TONEMAP_LINEAR}
    * {@link TONEMAP_FILMIC}
    * {@link TONEMAP_HEJL}
    * {@link TONEMAP_ACES}
     * @param settings.render.exposure - The exposure value tweaks the overall brightness of the scene.
     * @param [settings.render.skybox] - The asset ID of the cube map texture to be used as the scene's skybox. Defaults to null.
     * @param settings.render.skyboxIntensity - Multiplier for skybox intensity.
     * @param settings.render.skyboxMip - The mip level of the skybox to be displayed. Only valid for prefiltered cubemap skyboxes.
     * @param settings.render.skyboxRotation - Rotation of skybox.
     * @param settings.render.lightmapSizeMultiplier - The lightmap resolution multiplier.
     * @param settings.render.lightmapMaxResolution - The maximum lightmap resolution.
     * @param settings.render.lightmapMode - The lightmap baking mode. Can be:
    
    * {@link BAKE_COLOR}: single color lightmap
    * {@link BAKE_COLORDIR}: single color lightmap + dominant light direction (used for bump/specular)
    
    Only lights with bakeDir=true will be used for generating the dominant light direction. Defaults to.
     */
    applySceneSettings(settings: {
        physics: {
            gravity: number[];
        };
        render: {
            global_ambient: number[];
            fog: string;
            fog_color: number[];
            fog_density: number;
            fog_start: number;
            fog_end: number;
            gamma_correction: number;
            tonemapping: number;
            exposure: number;
            skybox?: number | null;
            skyboxIntensity: number;
            skyboxMip: number;
            skyboxRotation: number[];
            lightmapSizeMultiplier: number;
            lightmapMaxResolution: number;
            lightmapMode: number;
        };
    }): void;
    /**
     * Sets the skybox asset to current scene, and subscribes to asset load/change events.
     * @param asset - Asset of type `skybox` to be set to, or null to remove skybox.
     */
    setSkybox(asset: Asset): void;
    /**
     * Renders a line. Line start and end coordinates are specified in
    world-space. If a single color is supplied, the line will be flat-shaded with
    that color. If two colors are supplied, the line will be smooth shaded between
    those colors. It is also possible to control which scene layer the line is
    rendered into. By default, lines are rendered into the immediate layer
    {@link LAYERID_IMMEDIATE}.
     * @example
     * // Render a 1-unit long white line
    var start = new pc.Vec3(0, 0, 0);
    var end = new pc.Vec3(1, 0, 0);
    var color = new pc.Color(1, 1, 1);
    app.renderLine(start, end, color);
     * @example
     * // Render a 1-unit long line that is smooth-shaded from white to red
    var start = new pc.Vec3(0, 0, 0);
    var end = new pc.Vec3(1, 0, 0);
    var startColor = new pc.Color(1, 1, 1);
    var endColor = new pc.Color(1, 0, 0);
    app.renderLine(start, end, startColor, endColor);
     * @example
     * // Render a 1-unit long white line into the world layer
    var start = new pc.Vec3(0, 0, 0);
    var end = new pc.Vec3(1, 0, 0);
    var color = new pc.Color(1, 1, 1);
    var worldLayer = app.scene.layers.getLayerById(pc.LAYERID_WORLD);
    app.renderLine(start, end, color, {
        layer: worldLayer
    });
     * @example
     * // Render a 1-unit long line that is smooth-shaded from white to red into the world layer
    var start = new pc.Vec3(0, 0, 0);
    var end = new pc.Vec3(1, 0, 0);
    var startColor = new pc.Color(1, 1, 1);
    var endColor = new pc.Color(1, 0, 0);
    var worldLayer = app.scene.layers.getLayerById(pc.LAYERID_WORLD);
    app.renderLine(start, end, color, {
        layer: worldLayer
    });
     * @param start - The start world-space coordinate of the line.
     * @param end - The end world-space coordinate of the line.
     * @param color - The start color of the line.
     * @param [endColor] - The end color of the line.
     * @param [options] - Options to set rendering properties.
     * @param [options.layer] - The layer to render the line into. Defaults
    to {@link LAYERID_IMMEDIATE}.
     */
    renderLine(start: Vec3, end: Vec3, color: Color, endColor?: Color, options?: {
        layer?: Layer;
    }): void;
    /**
     * Renders an arbitrary number of discrete line segments. The lines
    are not connected by each subsequent point in the array. Instead, they are
    individual segments specified by two points. Therefore, the lengths of the
    supplied position and color arrays must be the same and also must be a multiple
    of 2. The colors of the ends of each line segment will be interpolated along
    the length of each line.
     * @example
     * // Render 2 discrete line segments
    var points = [
        // Line 1
        new pc.Vec3(0, 0, 0),
        new pc.Vec3(1, 0, 0),
        // Line 2
        new pc.Vec3(1, 1, 0),
        new pc.Vec3(1, 1, 1)
    ];
    var colors = [
        // Line 1
        pc.Color.RED,
        pc.Color.YELLOW,
        // Line 2
        pc.Color.CYAN,
        pc.Color.BLUE
    ];
    app.renderLines(points, colors);
     * @param position - An array of points to draw lines between. The
    length of the array must be a multiple of 2.
     * @param color - An array of colors to color the lines. This
    must be the same length as the position array. The length of the array must
    also be a multiple of 2.
     * @param [options] - Options to set rendering properties.
     * @param [options.layer] - The layer to render the lines into.
     */
    renderLines(position: Vec3[], color: Color[], options?: {
        layer?: Layer;
    }): void;
    /**
     * Destroys application and removes all event listeners.
     * @example
     * this.app.destroy();
     */
    destroy(): void;
}

/**
 * Create a new AnimationComponent.
 * @property speed - Speed multiplier for animation play back speed. 1.0 is playback at normal speed, 0.0 pauses the animation.
 * @property loop - If true the animation will restart from the beginning when it reaches the end.
 * @property activate - If true the first animation asset will begin playing when the scene is loaded.
 * @property assets - The array of animation assets - can also be an array of asset ids.
 * @property currentTime - Get or Set the current time position (in seconds) of the animation.
 * @property duration - Get the duration in seconds of the current animation. [read only]
 * @property skeleton - Get the skeleton for the current model; unless model is from glTF/glb, then skeleton is null. [read only]
 * @property animations - Get or Set dictionary of animations by name.
 * @param system - The {@link ComponentSystem} that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class AnimationComponent extends Component {
    constructor(system: AnimationComponentSystem, entity: Entity);
    /**
     * Start playing an animation.
     * @param name - The name of the animation asset to begin playing.
     * @param [blendTime] - The time in seconds to blend from the current
    animation state to the start of the animation being set.
     */
    play(name: string, blendTime?: number): void;
    /**
     * Return an animation.
     * @param name - The name of the animation asset.
     * @returns An Animation.
     */
    getAnimation(name: string): Animation;
    /**
     * Speed multiplier for animation play back speed. 1.0 is playback at normal speed, 0.0 pauses the animation.
    */
    speed: number;
    /**
     * If true the animation will restart from the beginning when it reaches the end.
    */
    loop: boolean;
    /**
     * If true the first animation asset will begin playing when the scene is loaded.
    */
    activate: boolean;
    /**
     * The array of animation assets - can also be an array of asset ids.
    */
    assets: Asset[] | number[];
    /**
     * Get or Set the current time position (in seconds) of the animation.
    */
    currentTime: number;
    /**
     * Get the duration in seconds of the current animation. [read only]
    */
    duration: number;
    /**
     * Get the skeleton for the current model; unless model is from glTF/glb, then skeleton is null. [read only]
    */
    skeleton: Skeleton | null;
    /**
     * Get or Set dictionary of animations by name.
    */
    animations: {
        [key: string]: Animation;
    };
}

/**
 * Create an AnimationComponentSystem.
 * @param app - The application managing this system.
 */
export class AnimationComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create new AudioListenerComponent.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class AudioListenerComponent extends Component {
    constructor(system: AudioListenerComponentSystem, entity: Entity);
}

/**
 * Create a new AudioListenerComponentSystem.
 * @param app - The application managing this system.
 * @param manager - A sound manager instance.
 */
export class AudioListenerComponentSystem extends ComponentSystem {
    constructor(app: Application, manager: SoundManager);
}

/**
 * Create a new ButtonComponent.
 * @property active - If set to false, the button will be visible but will not respond to hover or touch interactions.
 * @property imageEntity - A reference to the entity to be used as the button background. The entity must have an ImageElement component.
 * @property hitPadding - Padding to be used in hit-test calculations. Can be used to expand the bounding box so that the button is easier to tap.
 * @property transitionMode - Controls how the button responds when the user hovers over it/presses it.
 * @property hoverTint - Color to be used on the button image when the user hovers over it.
 * @property pressedTint - Color to be used on the button image when the user presses it.
 * @property inactiveTint - Color to be used on the button image when the button is not interactive.
 * @property fadeDuration - Duration to be used when fading between tints, in milliseconds.
 * @property hoverSpriteAsset - Sprite to be used as the button image when the user hovers over it.
 * @property hoverSpriteFrame - Frame to be used from the hover sprite.
 * @property pressedSpriteAsset - Sprite to be used as the button image when the user presses it.
 * @property pressedSpriteFrame - Frame to be used from the pressed sprite.
 * @property inactiveSpriteAsset - Sprite to be used as the button image when the button is not interactive.
 * @property inactiveSpriteFrame - Frame to be used from the inactive sprite.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class ButtonComponent extends Component {
    constructor(system: ButtonComponentSystem, entity: Entity);
    /**
     * If set to false, the button will be visible but will not respond to hover or touch interactions.
    */
    active: boolean;
    /**
     * A reference to the entity to be used as the button background. The entity must have an ImageElement component.
    */
    imageEntity: Entity;
    /**
     * Padding to be used in hit-test calculations. Can be used to expand the bounding box so that the button is easier to tap.
    */
    hitPadding: Vec4;
    /**
     * Controls how the button responds when the user hovers over it/presses it.
    */
    transitionMode: number;
    /**
     * Color to be used on the button image when the user hovers over it.
    */
    hoverTint: Color;
    /**
     * Color to be used on the button image when the user presses it.
    */
    pressedTint: Color;
    /**
     * Color to be used on the button image when the button is not interactive.
    */
    inactiveTint: Color;
    /**
     * Duration to be used when fading between tints, in milliseconds.
    */
    fadeDuration: number;
    /**
     * Sprite to be used as the button image when the user hovers over it.
    */
    hoverSpriteAsset: Asset;
    /**
     * Frame to be used from the hover sprite.
    */
    hoverSpriteFrame: number;
    /**
     * Sprite to be used as the button image when the user presses it.
    */
    pressedSpriteAsset: Asset;
    /**
     * Frame to be used from the pressed sprite.
    */
    pressedSpriteFrame: number;
    /**
     * Sprite to be used as the button image when the button is not interactive.
    */
    inactiveSpriteAsset: Asset;
    /**
     * Frame to be used from the inactive sprite.
    */
    inactiveSpriteFrame: number;
}

/**
 * Specifies different color tints for the hover, pressed and inactive states.
 */
export const BUTTON_TRANSITION_MODE_TINT: number;

/**
 * Specifies different sprites for the hover, pressed and inactive states.
 */
export const BUTTON_TRANSITION_MODE_SPRITE_CHANGE: number;

/**
 * Create a new ButtonComponentSystem.
 * @param app - The application.
 */
export class ButtonComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create a new Camera Component.
 * @example
 * // Add a pc.CameraComponent to an entity
var entity = new pc.Entity();
entity.addComponent('camera', {
    nearClip: 1,
    farClip: 100,
    fov: 55
});
 * @example
 * // Get the pc.CameraComponent on an entity
var cameraComponent = entity.camera;
 * @example
 * // Update a property on a camera component
entity.camera.nearClip = 2;
 * @property projection - The type of projection used to render the camera.
Can be:

* {@link PROJECTION_PERSPECTIVE}: A perspective projection. The camera frustum
resembles a truncated pyramid.
* {@link PROJECTION_ORTHOGRAPHIC}: An orthographic projection. The camera
frustum is a cuboid.

Defaults to {@link PROJECTION_PERSPECTIVE}.
 * @property aspectRatio - The aspect ratio (width divided by height) of the
camera. If aspectRatioMode is {@link ASPECT_AUTO}, then this value will be automatically
calculated every frame, and you can only read it. If it's ASPECT_MANUAL, you can set
the value.
 * @property aspectRatioMode - The aspect ratio mode of the camera. Can be:

* {@link ASPECT_AUTO}: aspect ratio will be calculated from the current render
target's width divided by height.
* {@link ASPECT_MANUAL}: use the aspectRatio value.

Defaults to {@link ASPECT_AUTO}.
 * @property clearColor - The color used to clear the canvas to before the
camera starts to render. Defaults to [0.75, 0.75, 0.75, 1].
 * @property clearColorBuffer - If true the camera will clear the color buffer
to the color set in clearColor. Defaults to true.
 * @property clearDepthBuffer - If true the camera will clear the depth buffer.
Defaults to true.
 * @property clearStencilBuffer - If true the camera will clear the stencil
buffer. Defaults to true.
 * @property farClip - The distance from the camera after which no rendering
will take place. Defaults to 1000.
 * @property fov - The field of view of the camera in degrees. Usually this is
the Y-axis field of view, see {@link CameraComponent#horizontalFov}. Used for
{@link PROJECTION_PERSPECTIVE} cameras only. Defaults to 45.
 * @property horizontalFov - Set which axis to use for the Field of View
calculation. Defaults to false.
 * @property nearClip - The distance from the camera before which no rendering
will take place. Defaults to 0.1.
 * @property orthoHeight - The half-height of the orthographic view window (in
the Y-axis). Used for {@link PROJECTION_ORTHOGRAPHIC} cameras only. Defaults to 10.
 * @property priority - Controls the order in which cameras are rendered. Cameras
with smaller values for priority are rendered first. Defaults to 0.
 * @property renderTarget - Render target to which rendering of the cameras
is performed. If not set, it will render simply to the screen.
 * @property rect - Controls where on the screen the camera will be rendered in
normalized screen coordinates. Defaults to [0, 0, 1, 1].
 * @property scissorRect - Clips all pixels which are not in the rectangle.
The order of the values is [x, y, width, height]. Defaults to [0, 0, 1, 1].
 * @property postEffects - The post effects queue for this camera.
Use this to add or remove post effects from the camera.
 * @property frustumCulling - Controls the culling of mesh instances against
the camera frustum, i.e. if objects outside of camera should be omitted from rendering.
If false, all mesh instances in the scene are rendered by the camera, regardless of
visibility. Defaults to false.
 * @property calculateTransform - Custom function you can
provide to calculate the camera transformation matrix manually. Can be used for complex
effects like reflections. Function is called using component's scope.
Arguments:
* {@link Mat4} transformMatrix: output of the function.
* {number} view: Type of view. Can be {@link VIEW_CENTER}, {@link VIEW_LEFT} or {@link VIEW_RIGHT}.
Left and right are only used in stereo rendering.
 * @property calculateProjection - Custom function you can
provide to calculate the camera projection matrix manually. Can be used for complex
effects like doing oblique projection. Function is called using component's scope.
Arguments:
* {{@link Mat4}} transformMatrix: output of the function
* {number} view: Type of view. Can be {@link VIEW_CENTER}, {@link VIEW_LEFT} or {@link VIEW_RIGHT}.
Left and right are only used in stereo rendering.
 * @property cullFaces - If true the camera will take material.cull into account.
Otherwise both front and back faces will be rendered. Defaults to true.
 * @property flipFaces - If true the camera will invert front and back faces.
Can be useful for reflection rendering. Defaults to false.
 * @property layers - An array of layer IDs ({@link Layer#id}) to which this
camera should belong. Don't push/pop/splice or modify this array, if you want to
change it, set a new one instead. Defaults to [LAYERID_WORLD, LAYERID_DEPTH,
LAYERID_SKYBOX, LAYERID_UI, LAYERID_IMMEDIATE].
 * @property disablePostEffectsLayer - Layer ID of a layer on which the postprocessing of the camera stops being applied to.
Defaults to LAYERID_UI, which causes post processing to not be applied to UI layer and
any following layers for the camera. Set to undefined for post-processing to be applied to all layers of the camera.
 * @param system - The ComponentSystem that created this
Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class CameraComponent extends Component {
    constructor(system: CameraComponentSystem, entity: Entity);
    /**
     * Queries the camera's frustum shape.
     */
    readonly frustum: Frustum;
    /**
     * Queries the camera's projection matrix.
     */
    readonly projectionMatrix: Mat4;
    /**
     * Queries the camera's view matrix.
     */
    readonly viewMatrix: Mat4;
    /**
     * Convert a point from 2D screen space to 3D world space.
     * @example
     * // Get the start and end points of a 3D ray fired from a screen click position
    var start = entity.camera.screenToWorld(clickX, clickY, entity.camera.nearClip);
    var end = entity.camera.screenToWorld(clickX, clickY, entity.camera.farClip);
    
    // Use the ray coordinates to perform a raycast
    app.systems.rigidbody.raycastFirst(start, end, function (result) {
        console.log("Entity " + result.entity.name + " was selected");
    });
     * @param screenx - X coordinate on PlayCanvas' canvas element.
     * @param screeny - Y coordinate on PlayCanvas' canvas element.
     * @param cameraz - The distance from the camera in world space to create
    the new point.
     * @param [worldCoord] - 3D vector to receive world coordinate result.
     * @returns The world space coordinate.
     */
    screenToWorld(screenx: number, screeny: number, cameraz: number, worldCoord?: Vec3): Vec3;
    /**
     * Convert a point from 3D world space to 2D screen space.
     * @param worldCoord - The world space coordinate.
     * @param [screenCoord] - 3D vector to receive screen coordinate result.
     * @returns The screen space coordinate.
     */
    worldToScreen(worldCoord: Vec3, screenCoord?: Vec3): Vec3;
    /**
     * Calculates aspect ratio value for a given render target.
     * @param [rt] - Optional render target. If unspecified, the
    backbuffer is assumed.
     * @returns The aspect ratio of the render target (or backbuffer).
     */
    calculateAspectRatio(rt?: RenderTarget): number;
    /**
     * Attempt to start XR session with this camera
     * @example
     * // On an entity with a camera component
    this.entity.camera.startXr(pc.XRTYPE_VR, pc.XRSPACE_LOCAL, {
        callback: function (err) {
            if (err) {
                // failed to start XR session
            } else {
                // in XR
            }
        }
    });
     * @param type - The type of session. Can be one of the following:
    
    * {@link XRTYPE_INLINE}: Inline - always available type of session. It has
    limited feature availability and is rendered into HTML element.
    * {@link XRTYPE_VR}: Immersive VR - session that provides exclusive access
    to the VR device with the best available tracking features.
    * {@link XRTYPE_AR}: Immersive AR - session that provides exclusive access
    to the VR/AR device that is intended to be blended with the real-world environment.
     * @param spaceType - reference space type. Can be one of the following:
    
    * {@link XRSPACE_VIEWER}: Viewer - always supported space with some basic
    tracking capabilities.
    * {@link XRSPACE_LOCAL}: Local - represents a tracking space with a native
    origin near the viewer at the time of creation. It is meant for seated or basic
    local XR sessions.
    * {@link XRSPACE_LOCALFLOOR}: Local Floor - represents a tracking space with
    a native origin at the floor in a safe position for the user to stand. The y-axis
    equals 0 at floor level. Floor level value might be estimated by the underlying
    platform. It is meant for seated or basic local XR sessions.
    * {@link XRSPACE_BOUNDEDFLOOR}: Bounded Floor - represents a tracking space
    with its native origin at the floor, where the user is expected to move within a
    pre-established boundary.
    * {@link XRSPACE_UNBOUNDED}: Unbounded - represents a tracking space where the
    user is expected to move freely around their environment, potentially long
    distances from their starting point.
     * @param [options] - object with options for XR session initialization.
     * @param [options.optionalFeatures] - Optional features for XRSession start. It is used for getting access to additional WebXR spec extensions.
     * @param [options.callback] - Optional callback function called once
    the session is started. The callback has one argument Error - it is null if the XR
    session started successfully.
     */
    startXr(type: string, spaceType: string, options?: {
        optionalFeatures?: string[];
        callback?: callbacks.XrError;
    }): void;
    /**
     * Attempt to end XR session of this camera
     * @example
     * // On an entity with a camera component
    this.entity.camera.endXr(function (err) {
        // not anymore in XR
    });
     * @param [callback] - Optional callback function called once
    session is ended. The callback has one argument Error - it is null if successfully
    ended XR session.
     */
    endXr(callback?: callbacks.XrError): void;
    /**
     * The type of projection used to render the camera.
     * Can be:
     * * {@link PROJECTION_PERSPECTIVE}: A perspective projection. The camera frustum
     * resembles a truncated pyramid.
     * * {@link PROJECTION_ORTHOGRAPHIC}: An orthographic projection. The camera
     * frustum is a cuboid.
     * Defaults to {@link PROJECTION_PERSPECTIVE}.
    */
    projection: number;
    /**
     * The aspect ratio (width divided by height) of the
     * camera. If aspectRatioMode is {@link ASPECT_AUTO}, then this value will be automatically
     * calculated every frame, and you can only read it. If it's ASPECT_MANUAL, you can set
     * the value.
    */
    aspectRatio: number;
    /**
     * The aspect ratio mode of the camera. Can be:
     * * {@link ASPECT_AUTO}: aspect ratio will be calculated from the current render
     * target's width divided by height.
     * * {@link ASPECT_MANUAL}: use the aspectRatio value.
     * Defaults to {@link ASPECT_AUTO}.
    */
    aspectRatioMode: number;
    /**
     * The color used to clear the canvas to before the
     * camera starts to render. Defaults to [0.75, 0.75, 0.75, 1].
    */
    clearColor: Color;
    /**
     * If true the camera will clear the color buffer
     * to the color set in clearColor. Defaults to true.
    */
    clearColorBuffer: boolean;
    /**
     * If true the camera will clear the depth buffer.
     * Defaults to true.
    */
    clearDepthBuffer: boolean;
    /**
     * If true the camera will clear the stencil
     * buffer. Defaults to true.
    */
    clearStencilBuffer: boolean;
    /**
     * The distance from the camera after which no rendering
     * will take place. Defaults to 1000.
    */
    farClip: number;
    /**
     * The field of view of the camera in degrees. Usually this is
     * the Y-axis field of view, see {@link CameraComponent#horizontalFov}. Used for
     * {@link PROJECTION_PERSPECTIVE} cameras only. Defaults to 45.
    */
    fov: number;
    /**
     * Set which axis to use for the Field of View
     * calculation. Defaults to false.
    */
    horizontalFov: boolean;
    /**
     * The distance from the camera before which no rendering
     * will take place. Defaults to 0.1.
    */
    nearClip: number;
    /**
     * The half-height of the orthographic view window (in
     * the Y-axis). Used for {@link PROJECTION_ORTHOGRAPHIC} cameras only. Defaults to 10.
    */
    orthoHeight: number;
    /**
     * Controls the order in which cameras are rendered. Cameras
     * with smaller values for priority are rendered first. Defaults to 0.
    */
    priority: number;
    /**
     * Render target to which rendering of the cameras
     * is performed. If not set, it will render simply to the screen.
    */
    renderTarget: RenderTarget;
    /**
     * Controls where on the screen the camera will be rendered in
     * normalized screen coordinates. Defaults to [0, 0, 1, 1].
    */
    rect: Vec4;
    /**
     * Clips all pixels which are not in the rectangle.
     * The order of the values is [x, y, width, height]. Defaults to [0, 0, 1, 1].
    */
    scissorRect: Vec4;
    /**
     * The post effects queue for this camera.
     * Use this to add or remove post effects from the camera.
    */
    postEffects: PostEffectQueue;
    /**
     * Controls the culling of mesh instances against
     * the camera frustum, i.e. if objects outside of camera should be omitted from rendering.
     * If false, all mesh instances in the scene are rendered by the camera, regardless of
     * visibility. Defaults to false.
    */
    frustumCulling: boolean;
    /**
     * Custom function you can
     * provide to calculate the camera transformation matrix manually. Can be used for complex
     * effects like reflections. Function is called using component's scope.
     * Arguments:
     * * {@link Mat4} transformMatrix: output of the function.
     * * {number} view: Type of view. Can be {@link VIEW_CENTER}, {@link VIEW_LEFT} or {@link VIEW_RIGHT}.
     * Left and right are only used in stereo rendering.
    */
    calculateTransform: callbacks.CalculateMatrix;
    /**
     * Custom function you can
     * provide to calculate the camera projection matrix manually. Can be used for complex
     * effects like doing oblique projection. Function is called using component's scope.
     * Arguments:
     * * {{@link Mat4}} transformMatrix: output of the function
     * * {number} view: Type of view. Can be {@link VIEW_CENTER}, {@link VIEW_LEFT} or {@link VIEW_RIGHT}.
     * Left and right are only used in stereo rendering.
    */
    calculateProjection: callbacks.CalculateMatrix;
    /**
     * If true the camera will take material.cull into account.
     * Otherwise both front and back faces will be rendered. Defaults to true.
    */
    cullFaces: boolean;
    /**
     * If true the camera will invert front and back faces.
     * Can be useful for reflection rendering. Defaults to false.
    */
    flipFaces: boolean;
    /**
     * An array of layer IDs ({@link Layer#id}) to which this
     * camera should belong. Don't push/pop/splice or modify this array, if you want to
     * change it, set a new one instead. Defaults to [LAYERID_WORLD, LAYERID_DEPTH,
     * LAYERID_SKYBOX, LAYERID_UI, LAYERID_IMMEDIATE].
    */
    layers: number[];
    /**
     * Layer ID of a layer on which the postprocessing of the camera stops being applied to.
     * Defaults to LAYERID_UI, which causes post processing to not be applied to UI layer and
     * any following layers for the camera. Set to undefined for post-processing to be applied to all layers of the camera.
    */
    disablePostEffectsLayer: number;
}

/**
 * Create a new PostEffectQueue.
 * @param app - The application.
 * @param camera - The camera component.
 */
export class PostEffectQueue {
    constructor(app: Application, camera: CameraComponent);
    /**
     * Adds a post effect to the queue. If the queue is disabled adding a post effect will
    automatically enable the queue.
     * @param effect - The post effect to add to the queue.
     */
    addEffect(effect: PostEffect): void;
    /**
     * Removes a post effect from the queue. If the queue becomes empty it will be disabled automatically.
     * @param effect - The post effect to remove.
     */
    removeEffect(effect: PostEffect): void;
    /**
     * Removes all the effects from the queue and disables it.
     */
    destroy(): void;
    /**
     * Enables the queue and all of its effects. If there are no effects then the queue will not be enabled.
     */
    enable(): void;
    /**
     * Disables the queue and all of its effects.
     */
    disable(): void;
}

/**
 * Create a new CameraComponentSystem.
 * @property cameras - Holds all the active camera components.
 * @param app - The Application.
 */
export class CameraComponentSystem extends ComponentSystem {
    constructor(app: Application);
    /**
     * Holds all the active camera components.
    */
    cameras: CameraComponent[];
}

/**
 * Create a new CollisionComponent.
 * @property type - The type of the collision volume. Can be:

* "box": A box-shaped collision volume.
* "capsule": A capsule-shaped collision volume.
* "compound": A compound shape. Any descendant entities with a collision component
of type box, capsule, cone, cylinder or sphere will be combined into a single, rigid
shape.
* "cone": A cone-shaped collision volume.
* "cylinder": A cylinder-shaped collision volume.
* "mesh": A collision volume that uses a model asset as its shape.
* "sphere": A sphere-shaped collision volume.

Defaults to "box".
 * @property halfExtents - The half-extents of the box-shaped collision volume in the
x, y and z axes. Defaults to [0.5, 0.5, 0.5].
 * @property radius - The radius of the sphere, capsule, cylinder or cone-shaped collision
volumes. Defaults to 0.5.
 * @property axis - The local space axis with which the capsule, cylinder or cone-shaped
collision volume's length is aligned. 0 for X, 1 for Y and 2 for Z. Defaults to 1 (Y-axis).
 * @property height - The total height of the capsule, cylinder or cone-shaped collision
volume from tip to tip. Defaults to 2.
 * @property asset - The asset for the model of the mesh collision volume - can also be
an asset id. Defaults to null.
 * @property model - The model that is added to the scene graph for the mesh collision
volume.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class CollisionComponent extends Component {
    constructor(system: CollisionComponentSystem, entity: Entity);
    /**
     * The type of the collision volume. Can be:
     * * "box": A box-shaped collision volume.
     * * "capsule": A capsule-shaped collision volume.
     * * "compound": A compound shape. Any descendant entities with a collision component
     * of type box, capsule, cone, cylinder or sphere will be combined into a single, rigid
     * shape.
     * * "cone": A cone-shaped collision volume.
     * * "cylinder": A cylinder-shaped collision volume.
     * * "mesh": A collision volume that uses a model asset as its shape.
     * * "sphere": A sphere-shaped collision volume.
     * Defaults to "box".
    */
    type: string;
    /**
     * The half-extents of the box-shaped collision volume in the
     * x, y and z axes. Defaults to [0.5, 0.5, 0.5].
    */
    halfExtents: Vec3;
    /**
     * The radius of the sphere, capsule, cylinder or cone-shaped collision
     * volumes. Defaults to 0.5.
    */
    radius: number;
    /**
     * The local space axis with which the capsule, cylinder or cone-shaped
     * collision volume's length is aligned. 0 for X, 1 for Y and 2 for Z. Defaults to 1 (Y-axis).
    */
    axis: number;
    /**
     * The total height of the capsule, cylinder or cone-shaped collision
     * volume from tip to tip. Defaults to 2.
    */
    height: number;
    /**
     * The asset for the model of the mesh collision volume - can also be
     * an asset id. Defaults to null.
    */
    asset: Asset;
    /**
     * The model that is added to the scene graph for the mesh collision
     * volume.
    */
    model: Model;
}

/**
 * Creates a new CollisionComponentSystem.
 * @param app - The running {@link Application}.
 */
export class CollisionComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Base constructor for a Component.
 * @property system - The ComponentSystem used to create this Component.
 * @property entity - The Entity that this Component is attached to.
 * @property enabled - Enables or disables the component.
 * @param system - The ComponentSystem used to create this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class Component extends EventHandler {
    constructor(system: ComponentSystem, entity: Entity);
    /**
     * The ComponentSystem used to create this Component.
    */
    system: ComponentSystem;
    /**
     * The Entity that this Component is attached to.
    */
    entity: Entity;
    /**
     * Enables or disables the component.
    */
    enabled: boolean;
}

/**
 * ElementComponents are used to construct user interfaces. An ElementComponent's [type](#type)
property can be configured in 3 main ways: as a text element, as an image element or as a group element.
If the ElementComponent has a {@link ScreenComponent} ancestor in the hierarchy, it will be transformed
with respect to the coordinate system of the screen. If there is no {@link ScreenComponent} ancestor,
the ElementComponent will be transformed like any other entity.

You should never need to use the ElementComponent constructor. To add an ElementComponent to a {@link Entity},
use {@link Entity#addComponent}:

~~~javascript
// Add an element component to an entity with the default options
let entity = pc.Entity();
entity.addComponent("element"); // This defaults to a 'group' element
~~~

To create a simple text-based element:

~~~javascript
entity.addComponent("element", {
    anchor: new pc.Vec4(0.5, 0.5, 0.5, 0.5), // centered anchor
    fontAsset: fontAsset,
    fontSize: 128,
    pivot: new pc.Vec2(0.5, 0.5),            // centered pivot
    text: "Hello World!",
    type: pc.ELEMENTTYPE_TEXT
});
~~~

Once the ElementComponent is added to the entity, you can set and get any of its properties:

~~~javascript
entity.element.color = pc.Color.RED; // Set the element's color to red

console.log(entity.element.color);   // Get the element's color and print it
~~~

Relevant 'Engine-only' examples:
* [Basic text rendering](http://playcanvas.github.io/#user-interface/text-basic.html)
* [Rendering text outlines](http://playcanvas.github.io/#user-interface/text-outline.html)
* [Adding drop shadows to text](http://playcanvas.github.io/#user-interface/text-drop-shadow.html)
* [Coloring text with markup](http://playcanvas.github.io/#user-interface/text-markup.html)
* [Wrapping text](http://playcanvas.github.io/#user-interface/text-wrap.html)
* [Typewriter text](http://playcanvas.github.io/#user-interface/text-typewriter.html)
 * @property type - The type of the ElementComponent. Can be:

* {@link ELEMENTTYPE_GROUP}: The component can be used as a layout mechanism to create groups of ElementComponents e.g. panels.
* {@link ELEMENTTYPE_IMAGE}: The component will render an image
* {@link ELEMENTTYPE_TEXT}: The component will render text
 * @property screen - The Entity with a {@link ScreenComponent} that this component belongs to. This is automatically set when the component is a child of a ScreenComponent.
 * @property drawOrder - The draw order of the component. A higher value means that the component will be rendered on top of other components.
 * @property anchor - Specifies where the left, bottom, right and top edges of the component are anchored relative to its parent. Each value
ranges from 0 to 1. E.g. a value of [0,0,0,0] means that the element will be anchored to the bottom left of its parent. A value of [1, 1, 1, 1] means
it will be anchored to the top right. A split anchor is when the left-right or top-bottom pairs of the anchor are not equal. In that case the component will be resized to cover that entire area. E.g. a value of [0,0,1,1] will make the component resize exactly as its parent.
 * @property pivot - The position of the pivot of the component relative to its anchor. Each value ranges from 0 to 1 where [0,0] is the bottom left and [1,1] is the top right.
 * @property margin - The distance from the left, bottom, right and top edges of the anchor. For example if we are using a split anchor like [0,0,1,1] and the margin is [0,0,0,0] then the component will be the same width and height as its parent.
 * @property left - The distance from the left edge of the anchor. Can be used in combination with a split anchor to make the component's left edge always be 'left' units away from the left.
 * @property right - The distance from the right edge of the anchor. Can be used in combination with a split anchor to make the component's right edge always be 'right' units away from the right.
 * @property bottom - The distance from the bottom edge of the anchor. Can be used in combination with a split anchor to make the component's top edge always be 'top' units away from the top.
 * @property top - The distance from the top edge of the anchor. Can be used in combination with a split anchor to make the component's bottom edge always be 'bottom' units away from the bottom.
 * @property width - The width of the element as set in the editor. Note that in some cases this may not reflect the true width at which the element is rendered, such as when the element is under the control of a {@link LayoutGroupComponent}. See `calculatedWidth` in order to ensure you are reading the true width at which the element will be rendered.
 * @property height - The height of the element as set in the editor. Note that in some cases this may not reflect the true height at which the element is rendered, such as when the element is under the control of a {@link LayoutGroupComponent}. See `calculatedHeight` in order to ensure you are reading the true height at which the element will be rendered.
 * @property calculatedWidth - The width at which the element will be rendered. In most cases this will be the same as `width`. However, in some cases the engine may calculate a different width for the element, such as when the element is under the control of a {@link LayoutGroupComponent}. In these scenarios, `calculatedWidth` may be smaller or larger than the width that was set in the editor.
 * @property calculatedHeight - The height at which the element will be rendered. In most cases this will be the same as `height`. However, in some cases the engine may calculate a different height for the element, such as when the element is under the control of a {@link LayoutGroupComponent}. In these scenarios, `calculatedHeight` may be smaller or larger than the height that was set in the editor.
 * @property screenCorners - An array of 4 {@link Vec3}s that represent the bottom left, bottom right, top right and top left corners of the component relative to its parent {@link ScreenComponent}.
 * @property worldCorners - An array of 4 {@link Vec3}s that represent the bottom left, bottom right, top right and top left corners of the component in world space. Only works for 3D ElementComponents.
 * @property canvasCorners - An array of 4 {@link Vec2}s that represent the bottom left, bottom right, top right and top left corners of the component in canvas pixels. Only works for screen space ElementComponents.
 * @property useInput - If true then the component will receive Mouse or Touch input events.
 * @property color - The color of the image for {@link ELEMENTTYPE_IMAGE} types or the color of the text for {@link ELEMENTTYPE_TEXT} types.
 * @property opacity - The opacity of the image for {@link ELEMENTTYPE_IMAGE} types or the text for {@link ELEMENTTYPE_TEXT} types.
 * @property outlineColor - The text outline effect color and opacity. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property outlineThickness - The width of the text outline effect. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property shadowColor - The text shadow effect color and opacity. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property shadowOffset - The text shadow effect shift amount from original text. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property textWidth - The width of the text rendered by the component. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property textHeight - The height of the text rendered by the component. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property autoWidth - Automatically set the width of the component to be the same as the textWidth. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property autoHeight - Automatically set the height of the component to be the same as the textHeight. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property fontAsset - The id of the font asset used for rendering the text. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property font - The font used for rendering the text. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property fontSize - The size of the font. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property autoFitWidth - When true the font size and line height will scale so that the text fits inside the width of the Element. The font size will be scaled between minFontSize and maxFontSize. The value of autoFitWidth will be ignored if autoWidth is true.
 * @property autoFitHeight - When true the font size and line height will scale so that the text fits inside the height of the Element. The font size will be scaled between minFontSize and maxFontSize. The value of autoFitHeight will be ignored if autoHeight is true.
 * @property minFontSize - The minimum size that the font can scale to when autoFitWidth or autoFitHeight are true.
 * @property maxFontSize - The maximum size that the font can scale to when autoFitWidth or autoFitHeight are true.
 * @property spacing - The spacing between the letters of the text. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property lineHeight - The height of each line of text. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property wrapLines - Whether to automatically wrap lines based on the element width. Only works for {@link ELEMENTTYPE_TEXT} types, and when autoWidth is set to false.
 * @property maxLines - The maximum number of lines that the Element can wrap to. Any leftover text will be appended to the last line. Set this to null to allow unlimited lines.
 * @property alignment - The horizontal and vertical alignment of the text. Values range from 0 to 1 where [0,0] is the bottom left and [1,1] is the top right.  Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property text - The text to render. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property key - The localization key to use to get the localized text from {@link Application#i18n}. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property textureAsset - The id of the texture asset to render. Only works for {@link ELEMENTTYPE_IMAGE} types.
 * @property texture - The texture to render. Only works for {@link ELEMENTTYPE_IMAGE} types.
 * @property spriteAsset - The id of the sprite asset to render. Only works for {@link ELEMENTTYPE_IMAGE} types which can render either a texture or a sprite.
 * @property sprite - The sprite to render. Only works for {@link ELEMENTTYPE_IMAGE} types which can render either a texture or a sprite.
 * @property spriteFrame - The frame of the sprite to render. Only works for {@link ELEMENTTYPE_IMAGE} types who have a sprite assigned.
 * @property pixelsPerUnit - The number of pixels that map to one PlayCanvas unit. Only works for {@link ELEMENTTYPE_IMAGE} types who have a sliced sprite assigned.
 * @property materialAsset - The id of the material asset to use when rendering an image. Only works for {@link ELEMENTTYPE_IMAGE} types.
 * @property material - The material to use when rendering an image. Only works for {@link ELEMENTTYPE_IMAGE} types.
 * @property rect - Specifies which region of the texture to use in order to render an image. Values range from 0 to 1 and indicate u, v, width, height. Only works for {@link ELEMENTTYPE_IMAGE} types.
 * @property rtlReorder - Reorder the text for RTL languages using a function registered by `app.systems.element.registerUnicodeConverter`.
 * @property unicodeConverter - Convert unicode characters using a function registered by `app.systems.element.registerUnicodeConverter`.
 * @property batchGroupId - Assign element to a specific batch group (see {@link BatchGroup}). Default value is -1 (no group).
 * @property layers - An array of layer IDs ({@link Layer#id}) to which this element should belong.
Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
 * @property enableMarkup - Flag for enabling markup processing. Only works for {@link ELEMENTTYPE_TEXT} types. The only supported tag is `[color]` with a hex color value. E.g `[color="#ff0000"]red text[/color]`
 * @property rangeStart - Index of the first character to render. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property rangeEnd - Index of the last character to render. Only works for {@link ELEMENTTYPE_TEXT} types.
 * @property mask - Switch Image Element into a mask. Masks do not render into the scene, but instead limit child elements to only be rendered where this element is rendered.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class ElementComponent extends Component {
    constructor(system: ElementComponentSystem, entity: Entity);
    /**
     * The type of the ElementComponent. Can be:
     * * {@link ELEMENTTYPE_GROUP}: The component can be used as a layout mechanism to create groups of ElementComponents e.g. panels.
     * * {@link ELEMENTTYPE_IMAGE}: The component will render an image
     * * {@link ELEMENTTYPE_TEXT}: The component will render text
    */
    type: string;
    /**
     * The Entity with a {@link ScreenComponent} that this component belongs to. This is automatically set when the component is a child of a ScreenComponent.
    */
    screen: Entity;
    /**
     * The draw order of the component. A higher value means that the component will be rendered on top of other components.
    */
    drawOrder: number;
    /**
     * Specifies where the left, bottom, right and top edges of the component are anchored relative to its parent. Each value
     * ranges from 0 to 1. E.g. a value of [0,0,0,0] means that the element will be anchored to the bottom left of its parent. A value of [1, 1, 1, 1] means
     * it will be anchored to the top right. A split anchor is when the left-right or top-bottom pairs of the anchor are not equal. In that case the component will be resized to cover that entire area. E.g. a value of [0,0,1,1] will make the component resize exactly as its parent.
    */
    anchor: Vec4;
    /**
     * The position of the pivot of the component relative to its anchor. Each value ranges from 0 to 1 where [0,0] is the bottom left and [1,1] is the top right.
    */
    pivot: Vec2;
    /**
     * The distance from the left, bottom, right and top edges of the anchor. For example if we are using a split anchor like [0,0,1,1] and the margin is [0,0,0,0] then the component will be the same width and height as its parent.
    */
    margin: Vec4;
    /**
     * The distance from the left edge of the anchor. Can be used in combination with a split anchor to make the component's left edge always be 'left' units away from the left.
    */
    left: number;
    /**
     * The distance from the right edge of the anchor. Can be used in combination with a split anchor to make the component's right edge always be 'right' units away from the right.
    */
    right: number;
    /**
     * The distance from the bottom edge of the anchor. Can be used in combination with a split anchor to make the component's top edge always be 'top' units away from the top.
    */
    bottom: number;
    /**
     * The distance from the top edge of the anchor. Can be used in combination with a split anchor to make the component's bottom edge always be 'bottom' units away from the bottom.
    */
    top: number;
    /**
     * The width of the element as set in the editor. Note that in some cases this may not reflect the true width at which the element is rendered, such as when the element is under the control of a {@link LayoutGroupComponent}. See `calculatedWidth` in order to ensure you are reading the true width at which the element will be rendered.
    */
    width: number;
    /**
     * The height of the element as set in the editor. Note that in some cases this may not reflect the true height at which the element is rendered, such as when the element is under the control of a {@link LayoutGroupComponent}. See `calculatedHeight` in order to ensure you are reading the true height at which the element will be rendered.
    */
    height: number;
    /**
     * The width at which the element will be rendered. In most cases this will be the same as `width`. However, in some cases the engine may calculate a different width for the element, such as when the element is under the control of a {@link LayoutGroupComponent}. In these scenarios, `calculatedWidth` may be smaller or larger than the width that was set in the editor.
    */
    calculatedWidth: number;
    /**
     * The height at which the element will be rendered. In most cases this will be the same as `height`. However, in some cases the engine may calculate a different height for the element, such as when the element is under the control of a {@link LayoutGroupComponent}. In these scenarios, `calculatedHeight` may be smaller or larger than the height that was set in the editor.
    */
    calculatedHeight: number;
    /**
     * An array of 4 {@link Vec3}s that represent the bottom left, bottom right, top right and top left corners of the component relative to its parent {@link ScreenComponent}.
    */
    screenCorners: Vec3[];
    /**
     * An array of 4 {@link Vec3}s that represent the bottom left, bottom right, top right and top left corners of the component in world space. Only works for 3D ElementComponents.
    */
    worldCorners: Vec3[];
    /**
     * An array of 4 {@link Vec2}s that represent the bottom left, bottom right, top right and top left corners of the component in canvas pixels. Only works for screen space ElementComponents.
    */
    canvasCorners: Vec2[];
    /**
     * If true then the component will receive Mouse or Touch input events.
    */
    useInput: boolean;
    /**
     * The color of the image for {@link ELEMENTTYPE_IMAGE} types or the color of the text for {@link ELEMENTTYPE_TEXT} types.
    */
    color: Color;
    /**
     * The opacity of the image for {@link ELEMENTTYPE_IMAGE} types or the text for {@link ELEMENTTYPE_TEXT} types.
    */
    opacity: number;
    /**
     * The text outline effect color and opacity. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    outlineColor: Color;
    /**
     * The width of the text outline effect. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    outlineThickness: number;
    /**
     * The text shadow effect color and opacity. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    shadowColor: Color;
    /**
     * The text shadow effect shift amount from original text. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    shadowOffset: Vec2;
    /**
     * The width of the text rendered by the component. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    textWidth: number;
    /**
     * The height of the text rendered by the component. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    textHeight: number;
    /**
     * Automatically set the width of the component to be the same as the textWidth. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    autoWidth: boolean;
    /**
     * Automatically set the height of the component to be the same as the textHeight. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    autoHeight: boolean;
    /**
     * The id of the font asset used for rendering the text. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    fontAsset: number;
    /**
     * The font used for rendering the text. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    font: Font;
    /**
     * The size of the font. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    fontSize: number;
    /**
     * When true the font size and line height will scale so that the text fits inside the width of the Element. The font size will be scaled between minFontSize and maxFontSize. The value of autoFitWidth will be ignored if autoWidth is true.
    */
    autoFitWidth: boolean;
    /**
     * When true the font size and line height will scale so that the text fits inside the height of the Element. The font size will be scaled between minFontSize and maxFontSize. The value of autoFitHeight will be ignored if autoHeight is true.
    */
    autoFitHeight: boolean;
    /**
     * The minimum size that the font can scale to when autoFitWidth or autoFitHeight are true.
    */
    minFontSize: number;
    /**
     * The maximum size that the font can scale to when autoFitWidth or autoFitHeight are true.
    */
    maxFontSize: number;
    /**
     * The spacing between the letters of the text. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    spacing: number;
    /**
     * The height of each line of text. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    lineHeight: number;
    /**
     * Whether to automatically wrap lines based on the element width. Only works for {@link ELEMENTTYPE_TEXT} types, and when autoWidth is set to false.
    */
    wrapLines: boolean;
    /**
     * The maximum number of lines that the Element can wrap to. Any leftover text will be appended to the last line. Set this to null to allow unlimited lines.
    */
    maxLines: number;
    /**
     * The horizontal and vertical alignment of the text. Values range from 0 to 1 where [0,0] is the bottom left and [1,1] is the top right.  Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    alignment: Vec2;
    /**
     * The text to render. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    text: string;
    /**
     * The localization key to use to get the localized text from {@link Application#i18n}. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    key: string;
    /**
     * The id of the texture asset to render. Only works for {@link ELEMENTTYPE_IMAGE} types.
    */
    textureAsset: number;
    /**
     * The texture to render. Only works for {@link ELEMENTTYPE_IMAGE} types.
    */
    texture: Texture;
    /**
     * The id of the sprite asset to render. Only works for {@link ELEMENTTYPE_IMAGE} types which can render either a texture or a sprite.
    */
    spriteAsset: number;
    /**
     * The sprite to render. Only works for {@link ELEMENTTYPE_IMAGE} types which can render either a texture or a sprite.
    */
    sprite: Sprite;
    /**
     * The frame of the sprite to render. Only works for {@link ELEMENTTYPE_IMAGE} types who have a sprite assigned.
    */
    spriteFrame: number;
    /**
     * The number of pixels that map to one PlayCanvas unit. Only works for {@link ELEMENTTYPE_IMAGE} types who have a sliced sprite assigned.
    */
    pixelsPerUnit: number;
    /**
     * The id of the material asset to use when rendering an image. Only works for {@link ELEMENTTYPE_IMAGE} types.
    */
    materialAsset: number;
    /**
     * The material to use when rendering an image. Only works for {@link ELEMENTTYPE_IMAGE} types.
    */
    material: Material;
    /**
     * Specifies which region of the texture to use in order to render an image. Values range from 0 to 1 and indicate u, v, width, height. Only works for {@link ELEMENTTYPE_IMAGE} types.
    */
    rect: Vec4;
    /**
     * Reorder the text for RTL languages using a function registered by `app.systems.element.registerUnicodeConverter`.
    */
    rtlReorder: boolean;
    /**
     * Convert unicode characters using a function registered by `app.systems.element.registerUnicodeConverter`.
    */
    unicodeConverter: boolean;
    /**
     * Assign element to a specific batch group (see {@link BatchGroup}). Default value is -1 (no group).
    */
    batchGroupId: number;
    /**
     * An array of layer IDs ({@link Layer#id}) to which this element should belong.
     * Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
    */
    layers: number[];
    /**
     * Flag for enabling markup processing. Only works for {@link ELEMENTTYPE_TEXT} types. The only supported tag is `[color]` with a hex color value. E.g `[color="#ff0000"]red text[/color]`
    */
    enableMarkup: boolean;
    /**
     * Index of the first character to render. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    rangeStart: number;
    /**
     * Index of the last character to render. Only works for {@link ELEMENTTYPE_TEXT} types.
    */
    rangeEnd: number;
    /**
     * Switch Image Element into a mask. Masks do not render into the scene, but instead limit child elements to only be rendered where this element is rendered.
    */
    mask: boolean;
}

/**
 * A {@link ElementComponent} that contains child {@link ElementComponent}s.
 */
export const ELEMENTTYPE_GROUP: string;

/**
 * A {@link ElementComponent} that displays an image.
 */
export const ELEMENTTYPE_IMAGE: string;

/**
 * A {@link ElementComponent} that displays text.
 */
export const ELEMENTTYPE_TEXT: string;

/**
 * Create a new ElementDragHelper.
 * @param element - The Element that should become draggable.
 * @param [axis] - Optional axis to constrain to, either 'x', 'y' or null.
 */
export class ElementDragHelper extends EventHandler {
    constructor(element: ElementComponent, axis?: string);
}

/**
 * Manages creation of {@link ElementComponent}s.
 * @param app - The application.
 */
export class ElementComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create a new LayoutChildComponent.
 * @property minWidth - The minimum width the element should be rendered at.
 * @property minHeight - The minimum height the element should be rendered at.
 * @property maxWidth - The maximum width the element should be rendered at.
 * @property maxHeight - The maximum height the element should be rendered at.
 * @property fitWidthProportion - The amount of additional horizontal space that the element should take up, if necessary to satisfy a Stretch/Shrink fitting calculation. This is specified as a proportion, taking into account the proportion values of other siblings.
 * @property fitHeightProportion - The amount of additional vertical space that the element should take up, if necessary to satisfy a Stretch/Shrink fitting calculation. This is specified as a proportion, taking into account the proportion values of other siblings.
 * @property excludeFromLayout - If set to true, the child will be excluded from all layout calculations.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class LayoutChildComponent extends Component {
    constructor(system: LayoutChildComponentSystem, entity: Entity);
    /**
     * The minimum width the element should be rendered at.
    */
    minWidth: number;
    /**
     * The minimum height the element should be rendered at.
    */
    minHeight: number;
    /**
     * The maximum width the element should be rendered at.
    */
    maxWidth: number;
    /**
     * The maximum height the element should be rendered at.
    */
    maxHeight: number;
    /**
     * The amount of additional horizontal space that the element should take up, if necessary to satisfy a Stretch/Shrink fitting calculation. This is specified as a proportion, taking into account the proportion values of other siblings.
    */
    fitWidthProportion: number;
    /**
     * The amount of additional vertical space that the element should take up, if necessary to satisfy a Stretch/Shrink fitting calculation. This is specified as a proportion, taking into account the proportion values of other siblings.
    */
    fitHeightProportion: number;
    /**
     * If set to true, the child will be excluded from all layout calculations.
    */
    excludeFromLayout: number;
}

/**
 * Create a new LayoutChildComponentSystem.
 * @param app - The application.
 */
export class LayoutChildComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create a new LayoutGroupComponent.
 * @property orientation - Whether the layout should run horizontally or
vertically. Can be:

* {@link ORIENTATION_HORIZONTAL}
* {@link ORIENTATION_VERTICAL}

Defaults to {@link ORIENTATION_HORIZONTAL}.
 * @property reverseX - Reverses the order of children along the x axis.
Defaults to false.
 * @property reverseY - Reverses the order of children along the y axis.
Defaults to true.
 * @property alignment - Specifies the horizontal and vertical alignment of
child elements. Values range from 0 to 1 where [0, 0] is the bottom left and
[1, 1] is the top right. Defaults to [0, 1].
 * @property padding - Padding to be applied inside the container before
positioning any children. Specified as left, bottom, right and top values.
Defaults to [0, 0, 0, 0] (no padding).
 * @property spacing - Spacing to be applied between each child element.
Defaults to [0, 0] (no spacing).
 * @property widthFitting - Fitting logic to be applied when positioning and
scaling child elements. Can be:

* {@link FITTING_NONE}: Child elements will be rendered at their natural size.
* {@link FITTING_STRETCH}: When the natural size of all child elements does not
fill the width of the container, children will be stretched to fit. The rules for how
each child will be stretched are outlined below:
  1. Sum the {@link LayoutChildComponent#fitWidthProportion} values of each child
and normalize so that all values sum to 1.
  2. Apply the natural width of each child.
  3. If there is space remaining in the container, distribute it to each child based
on the normalized {@link LayoutChildComponent#fitWidthProportion} values, but do
not exceed the {@link LayoutChildComponent#maxWidth} of each child.
* {@link FITTING_SHRINK}: When the natural size of all child elements overflows the
width of the container, children will be shrunk to fit. The rules for how each child
will be stretched are outlined below:
  1. Sum the {@link LayoutChildComponent#fitWidthProportion} values of each child
and normalize so that all values sum to 1.
  2. Apply the natural width of each child.
  3. If the new total width of all children exceeds the available space of the
container, reduce each child's width proportionally based on the normalized {@link
LayoutChildComponent#fitWidthProportion} values, but do not exceed the {@link
LayoutChildComponent#minWidth} of each child.
* {@link FITTING_BOTH}: Applies both STRETCH and SHRINK logic as necessary.

Defaults to {@link FITTING_NONE}.
 * @property heightFitting - Identical to {@link LayoutGroupComponent#widthFitting}
but for the Y axis. Defaults to {@link FITTING_NONE}.
 * @property wrap - Whether or not to wrap children onto a new row/column when the
size of the container is exceeded. Defaults to false, which means that children will be
be rendered in a single row (horizontal orientation) or column (vertical orientation).
Note that setting wrap to true makes it impossible for the {@link FITTING_BOTH}
fitting mode to operate in any logical manner. For this reason, when wrap is true, a
{@link LayoutGroupComponent#widthFitting} or {@link LayoutGroupComponent#heightFitting}
mode of {@link FITTING_BOTH} will be coerced to {@link FITTING_STRETCH}.
 * @param system - The ComponentSystem that created
this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class LayoutGroupComponent extends Component {
    constructor(system: LayoutGroupComponentSystem, entity: Entity);
    /**
     * Whether the layout should run horizontally or
     * vertically. Can be:
     * * {@link ORIENTATION_HORIZONTAL}
     * * {@link ORIENTATION_VERTICAL}
     * Defaults to {@link ORIENTATION_HORIZONTAL}.
    */
    orientation: number;
    /**
     * Reverses the order of children along the x axis.
     * Defaults to false.
    */
    reverseX: boolean;
    /**
     * Reverses the order of children along the y axis.
     * Defaults to true.
    */
    reverseY: boolean;
    /**
     * Specifies the horizontal and vertical alignment of
     * child elements. Values range from 0 to 1 where [0, 0] is the bottom left and
     * [1, 1] is the top right. Defaults to [0, 1].
    */
    alignment: Vec2;
    /**
     * Padding to be applied inside the container before
     * positioning any children. Specified as left, bottom, right and top values.
     * Defaults to [0, 0, 0, 0] (no padding).
    */
    padding: Vec4;
    /**
     * Spacing to be applied between each child element.
     * Defaults to [0, 0] (no spacing).
    */
    spacing: Vec2;
    /**
     * Fitting logic to be applied when positioning and
     * scaling child elements. Can be:
     * * {@link FITTING_NONE}: Child elements will be rendered at their natural size.
     * * {@link FITTING_STRETCH}: When the natural size of all child elements does not
     * fill the width of the container, children will be stretched to fit. The rules for how
     * each child will be stretched are outlined below:
     * 1. Sum the {@link LayoutChildComponent#fitWidthProportion} values of each child
     * and normalize so that all values sum to 1.
     * 2. Apply the natural width of each child.
     * 3. If there is space remaining in the container, distribute it to each child based
     * on the normalized {@link LayoutChildComponent#fitWidthProportion} values, but do
     * not exceed the {@link LayoutChildComponent#maxWidth} of each child.
     * * {@link FITTING_SHRINK}: When the natural size of all child elements overflows the
     * width of the container, children will be shrunk to fit. The rules for how each child
     * will be stretched are outlined below:
     * 1. Sum the {@link LayoutChildComponent#fitWidthProportion} values of each child
     * and normalize so that all values sum to 1.
     * 2. Apply the natural width of each child.
     * 3. If the new total width of all children exceeds the available space of the
     * container, reduce each child's width proportionally based on the normalized {@link
     * LayoutChildComponent#fitWidthProportion} values, but do not exceed the {@link
     * LayoutChildComponent#minWidth} of each child.
     * * {@link FITTING_BOTH}: Applies both STRETCH and SHRINK logic as necessary.
     * Defaults to {@link FITTING_NONE}.
    */
    widthFitting: number;
    /**
     * Identical to {@link LayoutGroupComponent#widthFitting}
     * but for the Y axis. Defaults to {@link FITTING_NONE}.
    */
    heightFitting: number;
    /**
     * Whether or not to wrap children onto a new row/column when the
     * size of the container is exceeded. Defaults to false, which means that children will be
     * be rendered in a single row (horizontal orientation) or column (vertical orientation).
     * Note that setting wrap to true makes it impossible for the {@link FITTING_BOTH}
     * fitting mode to operate in any logical manner. For this reason, when wrap is true, a
     * {@link LayoutGroupComponent#widthFitting} or {@link LayoutGroupComponent#heightFitting}
     * mode of {@link FITTING_BOTH} will be coerced to {@link FITTING_STRETCH}.
    */
    wrap: boolean;
}

/**
 * Disable all fitting logic.
 */
export const FITTING_NONE: number;

/**
 * Stretch child elements to fit the parent container.
 */
export const FITTING_STRETCH: number;

/**
 * Shrink child elements to fit the parent container.
 */
export const FITTING_SHRINK: number;

/**
 * Apply both STRETCH and SHRINK fitting logic where applicable.
 */
export const FITTING_BOTH: number;

/**
 * Create a new LayoutGroupComponentSystem.
 * @param app - The application.
 */
export class LayoutGroupComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Creates a new Light Component.
 * @example
 * // Add a pc.LightComponent to an entity
var entity = new pc.Entity();
entity.addComponent('light', {
    type: "point",
    color: new pc.Color(1, 0, 0),
    range: 10
});
 * @example
 * // Get the pc.LightComponent on an entity
var lightComponent = entity.light;
 * @example
 * // Update a property on a light component
entity.light.range = 20;
 * @property type - The type of light. Can be:
* "directional": A light that is infinitely far away and lights the entire scene from one direction.
* "point": A light that illuminates in all directions from a point.
* "spot": A light that illuminates in all directions from a point and is bounded by a cone.
Defaults to "directional".
 * @property color - The Color of the light. The alpha component of the color is
ignored. Defaults to white (1, 1, 1).
 * @property intensity - The brightness of the light. Defaults to 1.
 * @property castShadows - If enabled the light will cast shadows. Defaults to false.
 * @property shadowDistance - The distance from the viewpoint beyond which shadows
are no longer rendered. Affects directional lights only. Defaults to 40.
 * @property shadowResolution - The size of the texture used for the shadow map.
Valid sizes are 64, 128, 256, 512, 1024, 2048. Defaults to 1024.
 * @property shadowBias - The depth bias for tuning the appearance of the shadow
mapping generated by this light. Defaults to 0.05.
 * @property normalOffsetBias - Normal offset depth bias. Defaults to 0.
 * @property range - The range of the light. Affects point and spot lights only.
Defaults to 10.
 * @property innerConeAngle - The angle at which the spotlight cone starts
to fade off. The angle is specified in degrees. Affects spot lights only. Defaults
to 40.
 * @property outerConeAngle - The angle at which the spotlight cone has faded
to nothing. The angle is specified in degrees. Affects spot lights only. Defaults
to 45.
 * @property falloffMode - Controls the rate at which a light attenuates from
its position. Can be:
* {@link LIGHTFALLOFF_LINEAR}: Linear.
* {@link LIGHTFALLOFF_INVERSESQUARED}: Inverse squared.
Affects point and spot lights only. Defaults to {@link LIGHTFALLOFF_LINEAR}.
 * @property mask - Defines a mask to determine which {@link MeshInstance}s are
lit by this light. Defaults to 1.
 * @property affectDynamic - If enabled the light will affect non-lightmapped objects
 * @property affectLightmapped - If enabled the light will affect lightmapped objects
 * @property bake - If enabled the light will be rendered into lightmaps
 * @property bakeDir - If enabled and bake=true, the light's direction will contribute to directional lightmaps.
Be aware, that directional lightmap is an approximation and can only hold single direction per pixel.
Intersecting multiple lights with bakeDir=true may lead to incorrect look of specular/bump-mapping in the area of intersection.
The error is not always visible though, and highly scene-dependent.
 * @property shadowUpdateMode - Tells the renderer how often shadows must be updated for this light. Options:
* {@link SHADOWUPDATE_NONE}: Don't render shadows.
* {@link SHADOWUPDATE_THISFRAME}: Render shadows only once (then automatically switches to {@link SHADOWUPDATE_NONE}.
* {@link SHADOWUPDATE_REALTIME}: Render shadows every frame (default).
 * @property shadowType - Type of shadows being rendered by this light. Options:
* {@link SHADOW_PCF3}: Render depth (color-packed on WebGL 1.0), can be used for PCF 3x3 sampling.
* {@link SHADOW_VSM8}: Render packed variance shadow map. All shadow receivers must also cast shadows for this mode to work correctly.
* {@link SHADOW_VSM16}: Render 16-bit exponential variance shadow map. Requires OES_texture_half_float extension. Falls back to {@link SHADOW_VSM8}, if not supported.
* {@link SHADOW_VSM32}: Render 32-bit exponential variance shadow map. Requires OES_texture_float extension. Falls back to {@link SHADOW_VSM16}, if not supported.
* {@link SHADOW_PCF5}: Render depth buffer only, can be used for hardware-accelerated PCF 5x5 sampling. Requires WebGL2. Falls back to {@link SHADOW_PCF3} on WebGL 1.0.
 * @property vsmBlurMode - Blurring mode for variance shadow maps:
* {@link BLUR_BOX}: Box filter.
* {@link BLUR_GAUSSIAN}: Gaussian filter. May look smoother than box, but requires more samples.
 * @property vsmBlurSize - Number of samples used for blurring a variance shadow map. Only uneven numbers work, even are incremented. Minimum value is 1, maximum is 25.
 * @property cookieAsset - Asset that has texture that will be assigned to cookie internally once asset resource is available.
 * @property cookie - Projection texture. Must be 2D for spot and cubemap for point (ignored if incorrect type is used).
 * @property cookieIntensity - Projection texture intensity (default is 1).
 * @property cookieFalloff - Toggle normal spotlight falloff when projection texture is used. When set to false, spotlight will work like a pure texture projector (only fading with distance). Default is false.
 * @property cookieChannel - Color channels of the projection texture to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property cookieAngle - Angle for spotlight cookie rotation.
 * @property cookieScale - Spotlight cookie scale.
 * @property cookieOffset - Spotlight cookie position offset.
 * @property isStatic - Mark light as non-movable (optimization)
 * @property layers - An array of layer IDs ({@link Layer#id}) to which this light should belong.
Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class LightComponent extends Component {
    constructor(system: LightComponentSystem, entity: Entity);
    /**
     * The type of light. Can be:
     * * "directional": A light that is infinitely far away and lights the entire scene from one direction.
     * * "point": A light that illuminates in all directions from a point.
     * * "spot": A light that illuminates in all directions from a point and is bounded by a cone.
     * Defaults to "directional".
    */
    type: string;
    /**
     * The Color of the light. The alpha component of the color is
     * ignored. Defaults to white (1, 1, 1).
    */
    color: Color;
    /**
     * The brightness of the light. Defaults to 1.
    */
    intensity: number;
    /**
     * If enabled the light will cast shadows. Defaults to false.
    */
    castShadows: boolean;
    /**
     * The distance from the viewpoint beyond which shadows
     * are no longer rendered. Affects directional lights only. Defaults to 40.
    */
    shadowDistance: number;
    /**
     * The size of the texture used for the shadow map.
     * Valid sizes are 64, 128, 256, 512, 1024, 2048. Defaults to 1024.
    */
    shadowResolution: number;
    /**
     * The depth bias for tuning the appearance of the shadow
     * mapping generated by this light. Defaults to 0.05.
    */
    shadowBias: number;
    /**
     * Normal offset depth bias. Defaults to 0.
    */
    normalOffsetBias: number;
    /**
     * The range of the light. Affects point and spot lights only.
     * Defaults to 10.
    */
    range: number;
    /**
     * The angle at which the spotlight cone starts
     * to fade off. The angle is specified in degrees. Affects spot lights only. Defaults
     * to 40.
    */
    innerConeAngle: number;
    /**
     * The angle at which the spotlight cone has faded
     * to nothing. The angle is specified in degrees. Affects spot lights only. Defaults
     * to 45.
    */
    outerConeAngle: number;
    /**
     * Controls the rate at which a light attenuates from
     * its position. Can be:
     * * {@link LIGHTFALLOFF_LINEAR}: Linear.
     * * {@link LIGHTFALLOFF_INVERSESQUARED}: Inverse squared.
     * Affects point and spot lights only. Defaults to {@link LIGHTFALLOFF_LINEAR}.
    */
    falloffMode: number;
    /**
     * Defines a mask to determine which {@link MeshInstance}s are
     * lit by this light. Defaults to 1.
    */
    mask: number;
    /**
     * If enabled the light will affect non-lightmapped objects
    */
    affectDynamic: boolean;
    /**
     * If enabled the light will affect lightmapped objects
    */
    affectLightmapped: boolean;
    /**
     * If enabled the light will be rendered into lightmaps
    */
    bake: boolean;
    /**
     * If enabled and bake=true, the light's direction will contribute to directional lightmaps.
     * Be aware, that directional lightmap is an approximation and can only hold single direction per pixel.
     * Intersecting multiple lights with bakeDir=true may lead to incorrect look of specular/bump-mapping in the area of intersection.
     * The error is not always visible though, and highly scene-dependent.
    */
    bakeDir: boolean;
    /**
     * Tells the renderer how often shadows must be updated for this light. Options:
     * * {@link SHADOWUPDATE_NONE}: Don't render shadows.
     * * {@link SHADOWUPDATE_THISFRAME}: Render shadows only once (then automatically switches to {@link SHADOWUPDATE_NONE}.
     * * {@link SHADOWUPDATE_REALTIME}: Render shadows every frame (default).
    */
    shadowUpdateMode: number;
    /**
     * Type of shadows being rendered by this light. Options:
     * * {@link SHADOW_PCF3}: Render depth (color-packed on WebGL 1.0), can be used for PCF 3x3 sampling.
     * * {@link SHADOW_VSM8}: Render packed variance shadow map. All shadow receivers must also cast shadows for this mode to work correctly.
     * * {@link SHADOW_VSM16}: Render 16-bit exponential variance shadow map. Requires OES_texture_half_float extension. Falls back to {@link SHADOW_VSM8}, if not supported.
     * * {@link SHADOW_VSM32}: Render 32-bit exponential variance shadow map. Requires OES_texture_float extension. Falls back to {@link SHADOW_VSM16}, if not supported.
     * * {@link SHADOW_PCF5}: Render depth buffer only, can be used for hardware-accelerated PCF 5x5 sampling. Requires WebGL2. Falls back to {@link SHADOW_PCF3} on WebGL 1.0.
    */
    shadowType: number;
    /**
     * Blurring mode for variance shadow maps:
     * * {@link BLUR_BOX}: Box filter.
     * * {@link BLUR_GAUSSIAN}: Gaussian filter. May look smoother than box, but requires more samples.
    */
    vsmBlurMode: number;
    /**
     * Number of samples used for blurring a variance shadow map. Only uneven numbers work, even are incremented. Minimum value is 1, maximum is 25.
    */
    vsmBlurSize: number;
    /**
     * Asset that has texture that will be assigned to cookie internally once asset resource is available.
    */
    cookieAsset: number;
    /**
     * Projection texture. Must be 2D for spot and cubemap for point (ignored if incorrect type is used).
    */
    cookie: Texture;
    /**
     * Projection texture intensity (default is 1).
    */
    cookieIntensity: number;
    /**
     * Toggle normal spotlight falloff when projection texture is used. When set to false, spotlight will work like a pure texture projector (only fading with distance). Default is false.
    */
    cookieFalloff: boolean;
    /**
     * Color channels of the projection texture to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    cookieChannel: string;
    /**
     * Angle for spotlight cookie rotation.
    */
    cookieAngle: number;
    /**
     * Spotlight cookie scale.
    */
    cookieScale: Vec2;
    /**
     * Spotlight cookie position offset.
    */
    cookieOffset: Vec2;
    /**
     * Mark light as non-movable (optimization)
    */
    isStatic: boolean;
    /**
     * An array of layer IDs ({@link Layer#id}) to which this light should belong.
     * Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
    */
    layers: number[];
}

/**
 * Create a new LightComponentSystem.
 * @param app - The application.
 */
export class LightComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create a new ModelComponent.
 * @property type - The type of the model. Can be one of the following:
* "asset": The component will render a model asset
* "box": The component will render a box (1 unit in each dimension)
* "capsule": The component will render a capsule (radius 0.5, height 2)
* "cone": The component will render a cone (radius 0.5, height 1)
* "cylinder": The component will render a cylinder (radius 0.5, height 1)
* "plane": The component will render a plane (1 unit in each dimension)
* "sphere": The component will render a sphere (radius 0.5)
 * @property asset - The asset for the model (only applies to models of type 'asset') - can also be an asset id.
 * @property castShadows - If true, this model will cast shadows for lights that have shadow casting enabled.
 * @property receiveShadows - If true, shadows will be cast on this model.
 * @property material - The material {@link Material} that will be used to render the model (not used on models of type 'asset').
 * @property materialAsset - The material {@link Asset} that will be used to render the model (not used on models of type 'asset').
 * @property model - The model that is added to the scene graph. It can be not set or loaded, so will return null.
 * @property mapping - A dictionary that holds material overrides for each mesh instance. Only applies to model
components of type 'asset'. The mapping contains pairs of mesh instance index - material asset id.
 * @property castShadowsLightmap - If true, this model will cast shadows when rendering lightmaps.
 * @property lightmapped - If true, this model will be lightmapped after using lightmapper.bake().
 * @property lightmapSizeMultiplier - Lightmap resolution multiplier.
 * @property isStatic - Mark model as non-movable (optimization).
 * @property aabb - If set, the bounding box is used as a bounding box for visibility culling of attached mesh instances. This is an optimization,
allowing oversized bounding box to be specified for skinned characters in order to avoid per frame bounding box computations based on bone positions.
 * @property meshInstances - An array of meshInstances contained in the component's model. If model is not set or loaded for component it will return null.
 * @property batchGroupId - Assign model to a specific batch group (see {@link BatchGroup}). Default value is -1 (no group).
 * @property layers - An array of layer IDs ({@link Layer#id}) to which this model should belong.
Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class ModelComponent extends Component {
    constructor(system: ModelComponentSystem, entity: Entity);
    /**
     * Stop rendering model without removing it from the scene hierarchy.
    This method sets the {@link MeshInstance#visible} property of every MeshInstance in the model to false
    Note, this does not remove the model or mesh instances from the scene hierarchy or draw call list.
    So the model component still incurs some CPU overhead.
     * @example
     * this.timer = 0;
    this.visible = true;
    // ...
    // blink model every 0.1 seconds
    this.timer += dt;
    if (this.timer > 0.1) {
        if (!this.visible) {
            this.entity.model.show();
            this.visible = true;
        } else {
            this.entity.model.hide();
            this.visible = false;
        }
        this.timer = 0;
    }
     */
    hide(): void;
    /**
     * Enable rendering of the model if hidden using {@link ModelComponent#hide}.
    This method sets all the {@link MeshInstance#visible} property on all mesh instances to true.
     */
    show(): void;
    /**
     * The type of the model. Can be one of the following:
     * * "asset": The component will render a model asset
     * * "box": The component will render a box (1 unit in each dimension)
     * * "capsule": The component will render a capsule (radius 0.5, height 2)
     * * "cone": The component will render a cone (radius 0.5, height 1)
     * * "cylinder": The component will render a cylinder (radius 0.5, height 1)
     * * "plane": The component will render a plane (1 unit in each dimension)
     * * "sphere": The component will render a sphere (radius 0.5)
    */
    type: string;
    /**
     * The asset for the model (only applies to models of type 'asset') - can also be an asset id.
    */
    asset: Asset | number;
    /**
     * If true, this model will cast shadows for lights that have shadow casting enabled.
    */
    castShadows: boolean;
    /**
     * If true, shadows will be cast on this model.
    */
    receiveShadows: boolean;
    /**
     * The material {@link Material} that will be used to render the model (not used on models of type 'asset').
    */
    material: Material;
    /**
     * The material {@link Asset} that will be used to render the model (not used on models of type 'asset').
    */
    materialAsset: Asset | number;
    /**
     * The model that is added to the scene graph. It can be not set or loaded, so will return null.
    */
    model: Model;
    /**
     * A dictionary that holds material overrides for each mesh instance. Only applies to model
     * components of type 'asset'. The mapping contains pairs of mesh instance index - material asset id.
    */
    mapping: any;
    /**
     * If true, this model will cast shadows when rendering lightmaps.
    */
    castShadowsLightmap: boolean;
    /**
     * If true, this model will be lightmapped after using lightmapper.bake().
    */
    lightmapped: boolean;
    /**
     * Lightmap resolution multiplier.
    */
    lightmapSizeMultiplier: number;
    /**
     * Mark model as non-movable (optimization).
    */
    isStatic: boolean;
    /**
     * If set, the bounding box is used as a bounding box for visibility culling of attached mesh instances. This is an optimization,
     * allowing oversized bounding box to be specified for skinned characters in order to avoid per frame bounding box computations based on bone positions.
    */
    aabb: BoundingBox;
    /**
     * An array of meshInstances contained in the component's model. If model is not set or loaded for component it will return null.
    */
    meshInstances: MeshInstance[];
    /**
     * Assign model to a specific batch group (see {@link BatchGroup}). Default value is -1 (no group).
    */
    batchGroupId: number;
    /**
     * An array of layer IDs ({@link Layer#id}) to which this model should belong.
     * Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
    */
    layers: number[];
}

/**
 * Create a new ModelComponentSystem.
 * @param app - The Application.
 */
export class ModelComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create a new ParticleSystemComponent.
 * @property autoPlay - Controls whether the particle system plays automatically on creation. If set to false, it is necessary to call {@link ParticleSystemComponent#play} for the particle system to play. Defaults to true.
 * @property loop - Enables or disables respawning of particles.
 * @property preWarm - If enabled, the particle system will be initialized as though it had already completed a full cycle. This only works with looping particle systems.
 * @property lighting - If enabled, particles will be lit by ambient and directional lights.
 * @property halfLambert - Enabling Half Lambert lighting avoids particles looking too flat in shadowed areas. It is a completely non-physical lighting model but can give more pleasing visual results.
 * @property alignToMotion - Orient particles in their direction of motion.
 * @property depthWrite - If enabled, the particles will write to the depth buffer. If disabled, the depth buffer is left unchanged and particles will be guaranteed to overwrite one another in the order in which they are rendered.
 * @property noFog - Disable fogging.
 * @property localSpace - Binds particles to emitter transformation rather then world space.
 * @property screenSpace - Renders particles in 2D screen space. This needs to be set when particle system is part of hierarchy with {@link ScreenComponent} as its ancestor, and allows particle system to integrate with the rendering of {@link ElementComponent}s. Note that an entity with ParticleSystem component cannot be parented directly to {@link ScreenComponent}, but has to be a child of a {@link ElementComponent}, for example {@link LayoutGroupComponent}.
 * @property numParticles - Maximum number of simulated particles.
 * @property rate - Minimal interval in seconds between particle births.
 * @property rate2 - Maximal interval in seconds between particle births.
 * @property startAngle - Minimal initial Euler angle of a particle.
 * @property startAngle2 - Maximal initial Euler angle of a particle.
 * @property lifetime - The length of time in seconds between a particle's birth and its death.
 * @property stretch - A value in world units that controls the amount by which particles are stretched based on their velocity. Particles are stretched from their center towards their previous position.
 * @property intensity - Color multiplier.
 * @property animLoop - Controls whether the sprite sheet animation plays once or loops continuously.
 * @property animTilesX - Number of horizontal tiles in the sprite sheet.
 * @property animTilesY - Number of vertical tiles in the sprite sheet.
 * @property animNumAnimations - Number of sprite sheet animations contained within the current sprite sheet. The number of animations multiplied by number of frames should be a value less than animTilesX multiplied by animTilesY.
 * @property animNumFrames - Number of sprite sheet frames in the current sprite sheet animation. The number of animations multiplied by number of frames should be a value less than animTilesX multiplied by animTilesY.
 * @property animStartFrame - The sprite sheet frame that the animation should begin playing from. Indexed from the start of the current animation.
 * @property animIndex - When animNumAnimations is greater than 1, the sprite sheet animation index determines which animation the particle system should play.
 * @property randomizeAnimIndex - Each particle emitted by the system will play a random animation from the sprite sheet, up to animNumAnimations.
 * @property animSpeed - Sprite sheet animation speed. 1 = particle lifetime, 2 = twice during lifetime etc...
 * @property depthSoftening - Controls fading of particles near their intersections with scene geometry. This effect, when it's non-zero, requires scene depth map to be rendered. Multiple depth-dependent effects can share the same map, but if you only use it for particles, bear in mind that it can double engine draw calls.
 * @property initialVelocity - Defines magnitude of the initial emitter velocity. Direction is given by emitter shape.
 * @property emitterExtents - (Only for EMITTERSHAPE_BOX) The extents of a local space bounding box within which particles are spawned at random positions.
 * @property emitterExtentsInner - (Only for EMITTERSHAPE_BOX) The exception of extents of a local space bounding box within which particles are not spawned. Aligned to the center of EmitterExtents.
 * @property emitterRadius - (Only for EMITTERSHAPE_SPHERE) The radius within which particles are spawned at random positions.
 * @property emitterRadiusInner - (Only for EMITTERSHAPE_SPHERE) The inner radius within which particles are not spawned.
 * @property wrapBounds - The half extents of a world space box volume centered on the owner entity's position. If a particle crosses the boundary of one side of the volume, it teleports to the opposite side.
 * @property colorMapAsset - The {@link Asset} used to set the colorMap.
 * @property normalMapAsset - The {@link Asset} used to set the normalMap.
 * @property meshAsset - The {@link Asset} used to set the mesh.
 * @property colorMap - The color map texture to apply to all particles in the system. If no texture is assigned, a default spot texture is used.
 * @property normalMap - The normal map texture to apply to all particles in the system. If no texture is assigned, an approximate spherical normal is calculated for each vertex.
 * @property emitterShape - Shape of the emitter. Defines the bounds inside which particles are spawned. Also affects the direction of initial velocity.

* {@link EMITTERSHAPE_BOX}: Box shape parameterized by emitterExtents. Initial velocity is directed towards local Z axis.
* {@link EMITTERSHAPE_SPHERE}: Sphere shape parameterized by emitterRadius. Initial velocity is directed outwards from the center.
 * @property sort - Sorting mode. Forces CPU simulation, so be careful.

* {@link PARTICLESORT_NONE}: No sorting, particles are drawn in arbitrary order. Can be simulated on GPU.
* {@link PARTICLESORT_DISTANCE}: Sorting based on distance to the camera. CPU only.
* {@link PARTICLESORT_NEWER_FIRST}: Newer particles are drawn first. CPU only.
* {@link PARTICLESORT_OLDER_FIRST}: Older particles are drawn first. CPU only.
 * @property mesh - Triangular mesh to be used as a particle. Only first vertex/index buffer is used. Vertex buffer must contain local position at first 3 floats of each vertex.
 * @property blend - Controls how particles are blended when being written to the currently active render target.
Can be:

* {@link BLEND_SUBTRACTIVE}: Subtract the color of the source fragment from the destination fragment and write the result to the frame buffer.
* {@link BLEND_ADDITIVE}: Add the color of the source fragment to the destination fragment and write the result to the frame buffer.
* {@link BLEND_NORMAL}: Enable simple translucency for materials such as glass. This is equivalent to enabling a source blend mode of {@link BLENDMODE_SRC_ALPHA} and a destination blend mode of {@link BLENDMODE_ONE_MINUS_SRC_ALPHA}.
* {@link BLEND_NONE}: Disable blending.
* {@link BLEND_PREMULTIPLIED}: Similar to {@link BLEND_NORMAL} expect the source fragment is assumed to have already been multiplied by the source alpha value.
* {@link BLEND_MULTIPLICATIVE}: Multiply the color of the source fragment by the color of the destination fragment and write the result to the frame buffer.
* {@link BLEND_ADDITIVEALPHA}: Same as {@link BLEND_ADDITIVE} except the source RGB is multiplied by the source alpha.
 * @property orientation - Sorting mode. Forces CPU simulation, so be careful.

* {@link PARTICLEORIENTATION_SCREEN}: Particles are facing camera.
* {@link PARTICLEORIENTATION_WORLD}: User defines world space normal (particleNormal) to set planes orientation.
* {@link PARTICLEORIENTATION_EMITTER}: Similar to previous, but the normal is affected by emitter(entity) transformation.
 * @property particleNormal - (Only for PARTICLEORIENTATION_WORLD and PARTICLEORIENTATION_EMITTER) The exception of extents of a local space bounding box within which particles are not spawned. Aligned to the center of EmitterExtents.
 * @property localVelocityGraph - Velocity relative to emitter over lifetime.
 * @property localVelocityGraph2 - If not null, particles pick random values between localVelocityGraph and localVelocityGraph2.
 * @property velocityGraph - World-space velocity over lifetime.
 * @property velocityGraph2 - If not null, particles pick random values between velocityGraph and velocityGraph2.
 * @property colorGraph - Color over lifetime.
 * @property rotationSpeedGraph - Rotation speed over lifetime.
 * @property rotationSpeedGraph2 - If not null, particles pick random values between rotationSpeedGraph and rotationSpeedGraph2.
 * @property radialSpeedGraph - Radial speed over lifetime, velocity vector points from emitter origin to particle pos.
 * @property radialSpeedGraph2 - If not null, particles pick random values between radialSpeedGraph and radialSpeedGraph2.
 * @property scaleGraph - Scale over lifetime.
 * @property scaleGraph2 - If not null, particles pick random values between scaleGraph and scaleGraph2.
 * @property alphaGraph - Alpha over lifetime.
 * @property alphaGraph2 - If not null, particles pick random values between alphaGraph and alphaGraph2.
 * @property layers - An array of layer IDs ({@link Layer#id}) to which this particle system should belong.
Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity this Component is attached to.
 */
export class ParticleSystemComponent extends Component {
    constructor(system: ParticleSystemComponentSystem, entity: Entity);
    /**
     * Resets particle state, doesn't affect playing.
     */
    reset(): void;
    /**
     * Disables the emission of new particles, lets existing to finish their simulation.
     */
    stop(): void;
    /**
     * Freezes the simulation.
     */
    pause(): void;
    /**
     * Unfreezes the simulation.
     */
    unpause(): void;
    /**
     * Enables/unfreezes the simulation.
     */
    play(): void;
    /**
     * Checks if simulation is in progress.
     * @returns True if the particle system is currently playing and false otherwise.
     */
    isPlaying(): boolean;
    /**
     * Controls whether the particle system plays automatically on creation. If set to false, it is necessary to call {@link ParticleSystemComponent#play} for the particle system to play. Defaults to true.
    */
    autoPlay: boolean;
    /**
     * Enables or disables respawning of particles.
    */
    loop: boolean;
    /**
     * If enabled, the particle system will be initialized as though it had already completed a full cycle. This only works with looping particle systems.
    */
    preWarm: boolean;
    /**
     * If enabled, particles will be lit by ambient and directional lights.
    */
    lighting: boolean;
    /**
     * Enabling Half Lambert lighting avoids particles looking too flat in shadowed areas. It is a completely non-physical lighting model but can give more pleasing visual results.
    */
    halfLambert: boolean;
    /**
     * Orient particles in their direction of motion.
    */
    alignToMotion: boolean;
    /**
     * If enabled, the particles will write to the depth buffer. If disabled, the depth buffer is left unchanged and particles will be guaranteed to overwrite one another in the order in which they are rendered.
    */
    depthWrite: boolean;
    /**
     * Disable fogging.
    */
    noFog: boolean;
    /**
     * Binds particles to emitter transformation rather then world space.
    */
    localSpace: boolean;
    /**
     * Renders particles in 2D screen space. This needs to be set when particle system is part of hierarchy with {@link ScreenComponent} as its ancestor, and allows particle system to integrate with the rendering of {@link ElementComponent}s. Note that an entity with ParticleSystem component cannot be parented directly to {@link ScreenComponent}, but has to be a child of a {@link ElementComponent}, for example {@link LayoutGroupComponent}.
    */
    screenSpace: boolean;
    /**
     * Maximum number of simulated particles.
    */
    numParticles: number;
    /**
     * Minimal interval in seconds between particle births.
    */
    rate: number;
    /**
     * Maximal interval in seconds between particle births.
    */
    rate2: number;
    /**
     * Minimal initial Euler angle of a particle.
    */
    startAngle: number;
    /**
     * Maximal initial Euler angle of a particle.
    */
    startAngle2: number;
    /**
     * The length of time in seconds between a particle's birth and its death.
    */
    lifetime: number;
    /**
     * A value in world units that controls the amount by which particles are stretched based on their velocity. Particles are stretched from their center towards their previous position.
    */
    stretch: number;
    /**
     * Color multiplier.
    */
    intensity: number;
    /**
     * Controls whether the sprite sheet animation plays once or loops continuously.
    */
    animLoop: boolean;
    /**
     * Number of horizontal tiles in the sprite sheet.
    */
    animTilesX: number;
    /**
     * Number of vertical tiles in the sprite sheet.
    */
    animTilesY: number;
    /**
     * Number of sprite sheet animations contained within the current sprite sheet. The number of animations multiplied by number of frames should be a value less than animTilesX multiplied by animTilesY.
    */
    animNumAnimations: number;
    /**
     * Number of sprite sheet frames in the current sprite sheet animation. The number of animations multiplied by number of frames should be a value less than animTilesX multiplied by animTilesY.
    */
    animNumFrames: number;
    /**
     * The sprite sheet frame that the animation should begin playing from. Indexed from the start of the current animation.
    */
    animStartFrame: number;
    /**
     * When animNumAnimations is greater than 1, the sprite sheet animation index determines which animation the particle system should play.
    */
    animIndex: number;
    /**
     * Each particle emitted by the system will play a random animation from the sprite sheet, up to animNumAnimations.
    */
    randomizeAnimIndex: number;
    /**
     * Sprite sheet animation speed. 1 = particle lifetime, 2 = twice during lifetime etc...
    */
    animSpeed: number;
    /**
     * Controls fading of particles near their intersections with scene geometry. This effect, when it's non-zero, requires scene depth map to be rendered. Multiple depth-dependent effects can share the same map, but if you only use it for particles, bear in mind that it can double engine draw calls.
    */
    depthSoftening: number;
    /**
     * Defines magnitude of the initial emitter velocity. Direction is given by emitter shape.
    */
    initialVelocity: number;
    /**
     * (Only for EMITTERSHAPE_BOX) The extents of a local space bounding box within which particles are spawned at random positions.
    */
    emitterExtents: Vec3;
    /**
     * (Only for EMITTERSHAPE_BOX) The exception of extents of a local space bounding box within which particles are not spawned. Aligned to the center of EmitterExtents.
    */
    emitterExtentsInner: Vec3;
    /**
     * (Only for EMITTERSHAPE_SPHERE) The radius within which particles are spawned at random positions.
    */
    emitterRadius: number;
    /**
     * (Only for EMITTERSHAPE_SPHERE) The inner radius within which particles are not spawned.
    */
    emitterRadiusInner: number;
    /**
     * The half extents of a world space box volume centered on the owner entity's position. If a particle crosses the boundary of one side of the volume, it teleports to the opposite side.
    */
    wrapBounds: Vec3;
    /**
     * The {@link Asset} used to set the colorMap.
    */
    colorMapAsset: Asset;
    /**
     * The {@link Asset} used to set the normalMap.
    */
    normalMapAsset: Asset;
    /**
     * The {@link Asset} used to set the mesh.
    */
    meshAsset: Asset;
    /**
     * The color map texture to apply to all particles in the system. If no texture is assigned, a default spot texture is used.
    */
    colorMap: Texture;
    /**
     * The normal map texture to apply to all particles in the system. If no texture is assigned, an approximate spherical normal is calculated for each vertex.
    */
    normalMap: Texture;
    /**
     * Shape of the emitter. Defines the bounds inside which particles are spawned. Also affects the direction of initial velocity.
     * * {@link EMITTERSHAPE_BOX}: Box shape parameterized by emitterExtents. Initial velocity is directed towards local Z axis.
     * * {@link EMITTERSHAPE_SPHERE}: Sphere shape parameterized by emitterRadius. Initial velocity is directed outwards from the center.
    */
    emitterShape: number;
    /**
     * Sorting mode. Forces CPU simulation, so be careful.
     * * {@link PARTICLESORT_NONE}: No sorting, particles are drawn in arbitrary order. Can be simulated on GPU.
     * * {@link PARTICLESORT_DISTANCE}: Sorting based on distance to the camera. CPU only.
     * * {@link PARTICLESORT_NEWER_FIRST}: Newer particles are drawn first. CPU only.
     * * {@link PARTICLESORT_OLDER_FIRST}: Older particles are drawn first. CPU only.
    */
    sort: number;
    /**
     * Triangular mesh to be used as a particle. Only first vertex/index buffer is used. Vertex buffer must contain local position at first 3 floats of each vertex.
    */
    mesh: Mesh;
    /**
     * Controls how particles are blended when being written to the currently active render target.
     * Can be:
     * * {@link BLEND_SUBTRACTIVE}: Subtract the color of the source fragment from the destination fragment and write the result to the frame buffer.
     * * {@link BLEND_ADDITIVE}: Add the color of the source fragment to the destination fragment and write the result to the frame buffer.
     * * {@link BLEND_NORMAL}: Enable simple translucency for materials such as glass. This is equivalent to enabling a source blend mode of {@link BLENDMODE_SRC_ALPHA} and a destination blend mode of {@link BLENDMODE_ONE_MINUS_SRC_ALPHA}.
     * * {@link BLEND_NONE}: Disable blending.
     * * {@link BLEND_PREMULTIPLIED}: Similar to {@link BLEND_NORMAL} expect the source fragment is assumed to have already been multiplied by the source alpha value.
     * * {@link BLEND_MULTIPLICATIVE}: Multiply the color of the source fragment by the color of the destination fragment and write the result to the frame buffer.
     * * {@link BLEND_ADDITIVEALPHA}: Same as {@link BLEND_ADDITIVE} except the source RGB is multiplied by the source alpha.
    */
    blend: number;
    /**
     * Sorting mode. Forces CPU simulation, so be careful.
     * * {@link PARTICLEORIENTATION_SCREEN}: Particles are facing camera.
     * * {@link PARTICLEORIENTATION_WORLD}: User defines world space normal (particleNormal) to set planes orientation.
     * * {@link PARTICLEORIENTATION_EMITTER}: Similar to previous, but the normal is affected by emitter(entity) transformation.
    */
    orientation: number;
    /**
     * (Only for PARTICLEORIENTATION_WORLD and PARTICLEORIENTATION_EMITTER) The exception of extents of a local space bounding box within which particles are not spawned. Aligned to the center of EmitterExtents.
    */
    particleNormal: Vec3;
    /**
     * Velocity relative to emitter over lifetime.
    */
    localVelocityGraph: CurveSet;
    /**
     * If not null, particles pick random values between localVelocityGraph and localVelocityGraph2.
    */
    localVelocityGraph2: CurveSet;
    /**
     * World-space velocity over lifetime.
    */
    velocityGraph: CurveSet;
    /**
     * If not null, particles pick random values between velocityGraph and velocityGraph2.
    */
    velocityGraph2: CurveSet;
    /**
     * Color over lifetime.
    */
    colorGraph: CurveSet;
    /**
     * Rotation speed over lifetime.
    */
    rotationSpeedGraph: Curve;
    /**
     * If not null, particles pick random values between rotationSpeedGraph and rotationSpeedGraph2.
    */
    rotationSpeedGraph2: Curve;
    /**
     * Radial speed over lifetime, velocity vector points from emitter origin to particle pos.
    */
    radialSpeedGraph: Curve;
    /**
     * If not null, particles pick random values between radialSpeedGraph and radialSpeedGraph2.
    */
    radialSpeedGraph2: Curve;
    /**
     * Scale over lifetime.
    */
    scaleGraph: Curve;
    /**
     * If not null, particles pick random values between scaleGraph and scaleGraph2.
    */
    scaleGraph2: Curve;
    /**
     * Alpha over lifetime.
    */
    alphaGraph: Curve;
    /**
     * If not null, particles pick random values between alphaGraph and alphaGraph2.
    */
    alphaGraph2: Curve;
    /**
     * An array of layer IDs ({@link Layer#id}) to which this particle system should belong.
     * Don't push/pop/splice or modify this array, if you want to change it - set a new one instead.
    */
    layers: number[];
}

/**
 * Create a new ParticleSystemComponentSystem.
 * @param app - The Application.
 */
export class ParticleSystemComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create a new ComponentSystemRegistry.
 */
export class ComponentSystemRegistry {
}

/**
 * Create a new RigidBodyComponent.
 * @property mass - The mass of the body. This is only relevant for {@link BODYTYPE_DYNAMIC}
bodies, other types have infinite mass. Defaults to 1.
 * @property linearVelocity - Defines the speed of the body in a given direction.
 * @property angularVelocity - Defines the rotational speed of the body around each world axis.
 * @property linearDamping - Controls the rate at which a body loses linear velocity over time.
Defaults to 0.
 * @property angularDamping - Controls the rate at which a body loses angular velocity over time.
Defaults to 0.
 * @property linearFactor - Scaling factor for linear movement of the body in each axis. Only
valid for rigid bodies of type {@link BODYTYPE_DYNAMIC}. Defaults to 1 in all axes.
 * @property angularFactor - Scaling factor for angular movement of the body in each axis. Only
valid for rigid bodies of type {@link BODYTYPE_DYNAMIC}. Defaults to 1 in all axes.
 * @property friction - The friction value used when contacts occur between two bodies. A higher
value indicates more friction. Should be set in the range 0 to 1. Defaults to 0.5.
 * @property rollingFriction - Sets a torsional friction orthogonal to the contact point. Defaults
to 0.
 * @property restitution - Influences the amount of energy lost when two rigid bodies collide. The
calculation multiplies the restitution values for both colliding bodies. A multiplied value of 0 means
that all energy is lost in the collision while a value of 1 means that no energy is lost. Should be
set in the range 0 to 1. Defaults to 0.
 * @property group - The collision group this body belongs to. Combine the group and the mask to
prevent bodies colliding with each other. Defaults to 1.
 * @property mask - The collision mask sets which groups this body collides with. It is a bitfield
of 16 bits, the first 8 bits are reserved for engine use. Defaults to 65535.
 * @property type - The rigid body type determines how the body is simulated. Can be:

* {@link BODYTYPE_STATIC}: infinite mass and cannot move.
* {@link BODYTYPE_DYNAMIC}: simulated according to applied forces.
* {@link BODYTYPE_KINEMATIC}: infinite mass and does not respond to forces but can still be moved
by setting their velocity or position.

Defaults to {@link BODYTYPE_STATIC}.
 * @param system - The ComponentSystem that created this component.
 * @param entity - The entity this component is attached to.
 */
export class RigidBodyComponent extends Component {
    constructor(system: RigidBodyComponentSystem, entity: Entity);
    /**
     * Returns true if the rigid body is currently actively being simulated. I.e. Not 'sleeping'.
     * @returns True if the body is active.
     */
    isActive(): boolean;
    /**
     * Forcibly activate the rigid body simulation. Only affects rigid bodies of
    type {@link BODYTYPE_DYNAMIC}.
     */
    activate(): void;
    /**
     * Apply an force to the body at a point. By default, the force is applied at the origin of the
    body. However, the force can be applied at an offset this point by specifying a world space vector from
    the body's origin to the point of application. This function has two valid signatures. You can either
    specify the force (and optional relative point) via 3D-vector or numbers.
     * @example
     * // Apply an approximation of gravity at the body's center
    this.entity.rigidbody.applyForce(0, -10, 0);
     * @example
     * // Apply an approximation of gravity at 1 unit down the world Z from the center of the body
    this.entity.rigidbody.applyForce(0, -10, 0, 0, 0, 1);
     * @example
     * // Apply a force at the body's center
    // Calculate a force vector pointing in the world space direction of the entity
    var force = this.entity.forward.clone().scale(100);
    
    // Apply the force
    this.entity.rigidbody.applyForce(force);
     * @example
     * // Apply a force at some relative offset from the body's center
    // Calculate a force vector pointing in the world space direction of the entity
    var force = this.entity.forward.clone().scale(100);
    
    // Calculate the world space relative offset
    var relativePos = new pc.Vec3();
    var childEntity = this.entity.findByName('Engine');
    relativePos.sub2(childEntity.getPosition(), this.entity.getPosition());
    
    // Apply the force
    this.entity.rigidbody.applyForce(force, relativePos);
     * @param x - A 3-dimensional vector representing the force in world-space or
    the x-component of the force in world-space.
     * @param [y] - An optional 3-dimensional vector representing the relative point at
    which to apply the impulse in world-space or the y-component of the force in world-space.
     * @param [z] - The z-component of the force in world-space.
     * @param [px] - The x-component of a world-space offset from the body's position where the force is applied.
     * @param [py] - The y-component of a world-space offset from the body's position where the force is applied.
     * @param [pz] - The z-component of a world-space offset from the body's position where the force is applied.
     */
    applyForce(x: Vec3 | number, y?: Vec3 | number, z?: number, px?: number, py?: number, pz?: number): void;
    /**
     * Apply torque (rotational force) to the body. This function has two valid signatures.
    You can either specify the torque force with a 3D-vector or with 3 numbers.
     * @example
     * // Apply via vector
    var torque = new pc.Vec3(0, 10, 0);
    entity.rigidbody.applyTorque(torque);
     * @example
     * // Apply via numbers
    entity.rigidbody.applyTorque(0, 10, 0);
     * @param x - A 3-dimensional vector representing the torque force in world-space or
    the x-component of the torque force in world-space.
     * @param [y] - The y-component of the torque force in world-space.
     * @param [z] - The z-component of the torque force in world-space.
     */
    applyTorque(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Apply an impulse (instantaneous change of velocity) to the body at a point.
    This function has two valid signatures. You can either specify the impulse (and optional relative
    point) via 3D-vector or numbers.
     * @example
     * // Apply an impulse along the world-space positive y-axis at the entity's position.
    var impulse = new pc.Vec3(0, 10, 0);
    entity.rigidbody.applyImpulse(impulse);
     * @example
     * // Apply an impulse along the world-space positive y-axis at 1 unit down the positive
    // z-axis of the entity's local-space.
    var impulse = new pc.Vec3(0, 10, 0);
    var relativePoint = new pc.Vec3(0, 0, 1);
    entity.rigidbody.applyImpulse(impulse, relativePoint);
     * @example
     * // Apply an impulse along the world-space positive y-axis at the entity's position.
    entity.rigidbody.applyImpulse(0, 10, 0);
     * @example
     * // Apply an impulse along the world-space positive y-axis at 1 unit down the positive
    // z-axis of the entity's local-space.
    entity.rigidbody.applyImpulse(0, 10, 0, 0, 0, 1);
     * @param x - A 3-dimensional vector representing the impulse in world-space or
    the x-component of the impulse in world-space.
     * @param [y] - An optional 3-dimensional vector representing the relative point at
    which to apply the impulse in the local-space of the entity or the y-component of the impulse to
    apply in world-space.
     * @param [z] - The z-component of the impulse to apply in world-space.
     * @param [px = 0] - The x-component of the point at which to apply the impulse in the local-space of the entity.
     * @param [py = 0] - The y-component of the point at which to apply the impulse in the local-space of the entity.
     * @param [pz = 0] - The z-component of the point at which to apply the impulse in the local-space of the entity.
     */
    applyImpulse(x: Vec3 | number, y?: Vec3 | number, z?: number, px?: number, py?: number, pz?: number): void;
    /**
     * Apply a torque impulse (rotational force applied instantaneously) to the body.
    This function has two valid signatures. You can either specify the torque force with a 3D-vector
    or with 3 numbers.
     * @example
     * // Apply via vector
    var torque = new pc.Vec3(0, 10, 0);
    entity.rigidbody.applyTorqueImpulse(torque);
     * @example
     * // Apply via numbers
    entity.rigidbody.applyTorqueImpulse(0, 10, 0);
     * @param x - A 3-dimensional vector representing the torque impulse in world-space or
    the x-component of the torque impulse in world-space.
     * @param [y] - The y-component of the torque impulse in world-space.
     * @param [z] - The z-component of the torque impulse in world-space.
     */
    applyTorqueImpulse(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Returns true if the rigid body is of type {@link BODYTYPE_STATIC}.
     * @returns True if static.
     */
    isStatic(): boolean;
    /**
     * Returns true if the rigid body is of type {@link BODYTYPE_STATIC} or {@link BODYTYPE_KINEMATIC}.
     * @returns True if static or kinematic.
     */
    isStaticOrKinematic(): boolean;
    /**
     * Returns true if the rigid body is of type {@link BODYTYPE_KINEMATIC}.
     * @returns True if kinematic.
     */
    isKinematic(): boolean;
    /**
     * Teleport an entity to a new world-space position, optionally setting orientation. This function
    should only be called for rigid bodies that are dynamic. This function has three valid signatures.
    The first takes a 3-dimensional vector for the position and an optional 3-dimensional vector for Euler rotation.
    The second takes a 3-dimensional vector for the position and an optional quaternion for rotation.
    The third takes 3 numbers for the position and an optional 3 numbers for Euler rotation.
     * @example
     * // Teleport the entity to the origin
    entity.rigidbody.teleport(pc.Vec3.ZERO);
     * @example
     * // Teleport the entity to the origin
    entity.rigidbody.teleport(0, 0, 0);
     * @example
     * // Teleport the entity to world-space coordinate [1, 2, 3] and reset orientation
    var position = new pc.Vec3(1, 2, 3);
    entity.rigidbody.teleport(position, pc.Vec3.ZERO);
     * @example
     * // Teleport the entity to world-space coordinate [1, 2, 3] and reset orientation
    entity.rigidbody.teleport(1, 2, 3, 0, 0, 0);
     * @param x - A 3-dimensional vector holding the new position or the new position x-coordinate.
     * @param y - A 3-dimensional vector or quaternion holding the new rotation or the new
    position y-coordinate.
     * @param [z] - The new position z-coordinate.
     * @param [rx] - The new Euler x-angle value.
     * @param [ry] - The new Euler y-angle value.
     * @param [rz] - The new Euler z-angle value.
     */
    teleport(x: Vec3 | number, y: Vec3 | Quat | number, z?: number, rx?: number, ry?: number, rz?: number): void;
    /**
     * The mass of the body. This is only relevant for {@link BODYTYPE_DYNAMIC}
     * bodies, other types have infinite mass. Defaults to 1.
    */
    mass: number;
    /**
     * Defines the speed of the body in a given direction.
    */
    linearVelocity: Vec3;
    /**
     * Defines the rotational speed of the body around each world axis.
    */
    angularVelocity: Vec3;
    /**
     * Controls the rate at which a body loses linear velocity over time.
     * Defaults to 0.
    */
    linearDamping: number;
    /**
     * Controls the rate at which a body loses angular velocity over time.
     * Defaults to 0.
    */
    angularDamping: number;
    /**
     * Scaling factor for linear movement of the body in each axis. Only
     * valid for rigid bodies of type {@link BODYTYPE_DYNAMIC}. Defaults to 1 in all axes.
    */
    linearFactor: Vec3;
    /**
     * Scaling factor for angular movement of the body in each axis. Only
     * valid for rigid bodies of type {@link BODYTYPE_DYNAMIC}. Defaults to 1 in all axes.
    */
    angularFactor: Vec3;
    /**
     * The friction value used when contacts occur between two bodies. A higher
     * value indicates more friction. Should be set in the range 0 to 1. Defaults to 0.5.
    */
    friction: number;
    /**
     * Sets a torsional friction orthogonal to the contact point. Defaults
     * to 0.
    */
    rollingFriction: number;
    /**
     * Influences the amount of energy lost when two rigid bodies collide. The
     * calculation multiplies the restitution values for both colliding bodies. A multiplied value of 0 means
     * that all energy is lost in the collision while a value of 1 means that no energy is lost. Should be
     * set in the range 0 to 1. Defaults to 0.
    */
    restitution: number;
    /**
     * The collision group this body belongs to. Combine the group and the mask to
     * prevent bodies colliding with each other. Defaults to 1.
    */
    group: number;
    /**
     * The collision mask sets which groups this body collides with. It is a bitfield
     * of 16 bits, the first 8 bits are reserved for engine use. Defaults to 65535.
    */
    mask: number;
    /**
     * The rigid body type determines how the body is simulated. Can be:
     * * {@link BODYTYPE_STATIC}: infinite mass and cannot move.
     * * {@link BODYTYPE_DYNAMIC}: simulated according to applied forces.
     * * {@link BODYTYPE_KINEMATIC}: infinite mass and does not respond to forces but can still be moved
     * by setting their velocity or position.
     * Defaults to {@link BODYTYPE_STATIC}.
    */
    type: string;
}

/**
 * Rigid body has infinite mass and cannot move.
 */
export const BODYTYPE_STATIC: string;

/**
 * Rigid body is simulated according to applied forces.
 */
export const BODYTYPE_DYNAMIC: string;

/**
 * Rigid body has infinite mass and does not respond to forces but can still be moved by setting their velocity or position.
 */
export const BODYTYPE_KINEMATIC: string;

/**
 * Create a new RaycastResult.
 * @property entity - The entity that was hit.
 * @property point - The point at which the ray hit the entity in world space.
 * @property normal - The normal vector of the surface where the ray hit in world space.
 * @param entity - The entity that was hit.
 * @param point - The point at which the ray hit the entity in world space.
 * @param normal - The normal vector of the surface where the ray hit in world space.
 */
export class RaycastResult {
    constructor(entity: Entity, point: Vec3, normal: Vec3);
    /**
     * The entity that was hit.
    */
    entity: Entity;
    /**
     * The point at which the ray hit the entity in world space.
    */
    point: Vec3;
    /**
     * The normal vector of the surface where the ray hit in world space.
    */
    normal: Vec3;
}

/**
 * Create a new SingleContactResult.
 * @property a - The first entity involved in the contact.
 * @property b - The second entity involved in the contact.
 * @property localPointA - The point on Entity A where the contact occurred, relative to A.
 * @property localPointB - The point on Entity B where the contact occurred, relative to B.
 * @property pointA - The point on Entity A where the contact occurred, in world space.
 * @property pointB - The point on Entity B where the contact occurred, in world space.
 * @property normal - The normal vector of the contact on Entity B, in world space.
 * @param a - The first entity involved in the contact.
 * @param b - The second entity involved in the contact.
 * @param contactPoint - The contact point between the two entities.
 */
export class SingleContactResult {
    constructor(a: Entity, b: Entity, contactPoint: ContactPoint);
    /**
     * The first entity involved in the contact.
    */
    a: Entity;
    /**
     * The second entity involved in the contact.
    */
    b: Entity;
    /**
     * The point on Entity A where the contact occurred, relative to A.
    */
    localPointA: Vec3;
    /**
     * The point on Entity B where the contact occurred, relative to B.
    */
    localPointB: Vec3;
    /**
     * The point on Entity A where the contact occurred, in world space.
    */
    pointA: Vec3;
    /**
     * The point on Entity B where the contact occurred, in world space.
    */
    pointB: Vec3;
    /**
     * The normal vector of the contact on Entity B, in world space.
    */
    normal: Vec3;
}

/**
 * Create a new ContactPoint.
 * @property localPoint - The point on the entity where the contact occurred, relative to the entity.
 * @property localPointOther - The point on the other entity where the contact occurred, relative to the other entity.
 * @property point - The point on the entity where the contact occurred, in world space.
 * @property pointOther - The point on the other entity where the contact occurred, in world space.
 * @property normal - The normal vector of the contact on the other entity, in world space.
 * @param localPoint - The point on the entity where the contact occurred, relative to the entity.
 * @param localPointOther - The point on the other entity where the contact occurred, relative to the other entity.
 * @param point - The point on the entity where the contact occurred, in world space.
 * @param pointOther - The point on the other entity where the contact occurred, in world space.
 * @param normal - The normal vector of the contact on the other entity, in world space.
 */
export class ContactPoint {
    constructor(localPoint: Vec3, localPointOther: Vec3, point: Vec3, pointOther: Vec3, normal: Vec3);
    /**
     * The point on the entity where the contact occurred, relative to the entity.
    */
    localPoint: Vec3;
    /**
     * The point on the other entity where the contact occurred, relative to the other entity.
    */
    localPointOther: Vec3;
    /**
     * The point on the entity where the contact occurred, in world space.
    */
    point: Vec3;
    /**
     * The point on the other entity where the contact occurred, in world space.
    */
    pointOther: Vec3;
    /**
     * The normal vector of the contact on the other entity, in world space.
    */
    normal: Vec3;
}

/**
 * Create a new ContactResult.
 * @property other - The entity that was involved in the contact with this entity.
 * @property contacts - An array of ContactPoints with the other entity.
 * @param other - The entity that was involved in the contact with this entity.
 * @param contacts - An array of ContactPoints with the other entity.
 */
export class ContactResult {
    constructor(other: Entity, contacts: ContactPoint[]);
    /**
     * The entity that was involved in the contact with this entity.
    */
    other: Entity;
    /**
     * An array of ContactPoints with the other entity.
    */
    contacts: ContactPoint[];
}

/**
 * Create a new RigidBodyComponentSystem.
 * @property gravity - The world space vector representing global gravity in the physics simulation.
Defaults to [0, -9.81, 0] which is an approximation of the gravitational force on Earth.
 * @param app - The Application.
 */
export class RigidBodyComponentSystem extends ComponentSystem {
    constructor(app: Application);
    /**
     * Raycast the world and return the first entity the ray hits. Fire a ray into the world from start to end,
    if the ray hits an entity with a collision component, it returns a {@link RaycastResult}, otherwise returns null.
     * @param start - The world space point where the ray starts.
     * @param end - The world space point where the ray ends.
     * @returns The result of the raycasting or null if there was no hit.
     */
    raycastFirst(start: Vec3, end: Vec3): RaycastResult;
    /**
     * Raycast the world and return all entities the ray hits. It returns an array
    of {@link RaycastResult}, one for each hit. If no hits are detected, the returned
    array will be of length 0.
     * @param start - The world space point where the ray starts.
     * @param end - The world space point where the ray ends.
     * @returns An array of raycast hit results (0 length if there were no hits).
     */
    raycastAll(start: Vec3, end: Vec3): RaycastResult[];
    /**
     * The world space vector representing global gravity in the physics simulation.
     * Defaults to [0, -9.81, 0] which is an approximation of the gravitational force on Earth.
    */
    gravity: Vec3;
}

/**
 * Create a new ScreenComponent.
 * @property screenSpace - If true then the ScreenComponent will render its child {@link ElementComponent}s in screen space instead of world space. Enable this to create 2D user interfaces.
 * @property cull - If true then elements inside this screen will be not be rendered when outside of the screen (only valid when screenSpace is true).
 * @property scaleMode - Can either be {@link SCALEMODE_NONE} or {@link SCALEMODE_BLEND}. See the description of referenceResolution for more information.
 * @property scaleBlend - A value between 0 and 1 that is used when scaleMode is equal to {@link SCALEMODE_BLEND}. Scales the ScreenComponent with width as a reference (when value is 0), the height as a reference (when value is 1) or anything in between.
 * @property resolution - The width and height of the ScreenComponent. When screenSpace is true the resolution will always be equal to {@link GraphicsDevice#width} x {@link GraphicsDevice#height}.
 * @property referenceResolution - The resolution that the ScreenComponent is designed for. This is only taken into account when screenSpace is true and scaleMode is {@link SCALEMODE_BLEND}. If the actual resolution is different then the ScreenComponent will be scaled according to the scaleBlend value.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class ScreenComponent extends Component {
    constructor(system: ScreenComponentSystem, entity: Entity);
    /**
     * Set the drawOrder of each child {@link ElementComponent}
    so that ElementComponents which are last in the hierarchy are rendered on top.
    Draw Order sync is queued and will be updated by the next update loop.
     */
    syncDrawOrder(): void;
    /**
     * If true then the ScreenComponent will render its child {@link ElementComponent}s in screen space instead of world space. Enable this to create 2D user interfaces.
    */
    screenSpace: boolean;
    /**
     * If true then elements inside this screen will be not be rendered when outside of the screen (only valid when screenSpace is true).
    */
    cull: boolean;
    /**
     * Can either be {@link SCALEMODE_NONE} or {@link SCALEMODE_BLEND}. See the description of referenceResolution for more information.
    */
    scaleMode: string;
    /**
     * A value between 0 and 1 that is used when scaleMode is equal to {@link SCALEMODE_BLEND}. Scales the ScreenComponent with width as a reference (when value is 0), the height as a reference (when value is 1) or anything in between.
    */
    scaleBlend: number;
    /**
     * The width and height of the ScreenComponent. When screenSpace is true the resolution will always be equal to {@link GraphicsDevice#width} x {@link GraphicsDevice#height}.
    */
    resolution: Vec2;
    /**
     * The resolution that the ScreenComponent is designed for. This is only taken into account when screenSpace is true and scaleMode is {@link SCALEMODE_BLEND}. If the actual resolution is different then the ScreenComponent will be scaled according to the scaleBlend value.
    */
    referenceResolution: Vec2;
}

/**
 * Always use the application's resolution as the resolution for the {@link ScreenComponent}.
 */
export const SCALEMODE_NONE: string;

/**
 * Scale the {@link ScreenComponent} when the application's resolution is different than the ScreenComponent's referenceResolution.
 */
export const SCALEMODE_BLEND: string;

/**
 * Create a new ScreenComponentSystem.
 * @param app - The application.
 */
export class ScreenComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * The ScriptComponent allows you to extend the functionality of an Entity by attaching your own Script Types defined in JavaScript files
to be executed with access to the Entity. For more details on scripting see <a href="//developer.playcanvas.com/user-manual/scripting/">Scripting</a>.
 * @property scripts - An array of all script instances attached to an entity. This Array shall not be modified by developer.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class ScriptComponent extends Component {
    constructor(system: ScriptComponentSystem, entity: Entity);
    /**
     * Detect if script is attached to an entity.
     * @example
     * if (entity.script.has('playerController')) {
        // entity has script
    }
     * @param nameOrType - The name or type of {@link ScriptType}.
     * @returns If script is attached to an entity.
     */
    has(nameOrType: string | typeof ScriptType): boolean;
    /**
     * Get a script instance (if attached).
     * @example
     * var controller = entity.script.get('playerController');
     * @param nameOrType - The name or type of {@link ScriptType}.
     * @returns If script is attached, the instance is returned. Otherwise null is returned.
     */
    get(nameOrType: string | typeof ScriptType): ScriptType | null;
    /**
     * Create a script instance and attach to an entity script component.
     * @example
     * entity.script.create('playerController', {
        attributes: {
            speed: 4
        }
    });
     * @param nameOrType - The name or type of {@link ScriptType}.
     * @param [args] - Object with arguments for a script.
     * @param [args.enabled] - If script instance is enabled after creation. Defaults to true.
     * @param [args.attributes] - Object with values for attributes (if any), where key is name of an attribute.
     * @param [args.preloading] - If script instance is created during preload. If true, script and attributes must be initialized manually. Defaults to false.
     * @param [args.ind] - The index where to insert the script instance at. Defaults to -1, which means append it at the end.
     * @returns Returns an instance of a {@link ScriptType} if successfully attached to an entity,
    or null if it failed because a script with a same name has already been added
    or if the {@link ScriptType} cannot be found by name in the {@link ScriptRegistry}.
     */
    create(nameOrType: string | typeof ScriptType, args?: {
        enabled?: boolean;
        attributes?: any;
        preloading?: boolean;
        ind?: number;
    }): ScriptType;
    /**
     * Destroy the script instance that is attached to an entity.
     * @example
     * entity.script.destroy('playerController');
     * @param nameOrType - The name or type of {@link ScriptType}.
     * @returns If it was successfully destroyed.
     */
    destroy(nameOrType: string | typeof ScriptType): boolean;
    /**
     * Move script instance to different position to alter update order of scripts within entity.
     * @example
     * entity.script.move('playerController', 0);
     * @param nameOrType - The name or type of {@link ScriptType}.
     * @param ind - New position index.
     * @returns If it was successfully moved.
     */
    move(nameOrType: string | typeof ScriptType, ind: number): boolean;
    /**
     * An array of all script instances attached to an entity. This Array shall not be modified by developer.
    */
    scripts: ScriptType[];
}

/**
 * Create a new ScriptComponentSystem.
 * @param app - The application.
 */
export class ScriptComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create a new ScrollViewComponent.
 * @property horizontal - Whether to enable horizontal scrolling.
 * @property vertical - Whether to enable vertical scrolling.
 * @property scrollMode - Specifies how the scroll view should behave when the user scrolls past the end of the content. Modes are defined as follows:

* {@link SCROLL_MODE_CLAMP}: Content does not scroll any further than its bounds.
* {@link SCROLL_MODE_BOUNCE}: Content scrolls past its bounds and then gently bounces back.
* {@link SCROLL_MODE_INFINITE}: Content can scroll forever.
 * @property bounceAmount - Controls how far the content should move before bouncing back.
 * @property friction - Controls how freely the content should move if thrown, i.e. By flicking on a phone or by flinging the scroll wheel on a mouse. A value of 1 means that content will stop immediately; 0 means that content will continue moving forever (or until the bounds of the content are reached, depending on the scrollMode).
 * @property horizontalScrollbarVisibility - Controls whether the horizontal scrollbar should be visible all the time, or only visible when the content exceeds the size of the viewport.
 * @property verticalScrollbarVisibility - Controls whether the vertical scrollbar should be visible all the time, or only visible when the content exceeds the size of the viewport.
 * @property viewportEntity - The entity to be used as the masked viewport area, within which the content will scroll. This entity must have an ElementGroup component.
 * @property contentEntity - The entity which contains the scrolling content itself. This entity must have an Element component.
 * @property horizontalScrollbarEntity - The entity to be used as the vertical scrollbar. This entity must have a Scrollbar component.
 * @property verticalScrollbarEntity - The entity to be used as the vertical scrollbar. This entity must have a Scrollbar component.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class ScrollViewComponent extends Component {
    constructor(system: ScrollViewComponentSystem, entity: Entity);
    /**
     * Whether to enable horizontal scrolling.
    */
    horizontal: boolean;
    /**
     * Whether to enable vertical scrolling.
    */
    vertical: boolean;
    /**
     * Specifies how the scroll view should behave when the user scrolls past the end of the content. Modes are defined as follows:
     * * {@link SCROLL_MODE_CLAMP}: Content does not scroll any further than its bounds.
     * * {@link SCROLL_MODE_BOUNCE}: Content scrolls past its bounds and then gently bounces back.
     * * {@link SCROLL_MODE_INFINITE}: Content can scroll forever.
    */
    scrollMode: number;
    /**
     * Controls how far the content should move before bouncing back.
    */
    bounceAmount: number;
    /**
     * Controls how freely the content should move if thrown, i.e. By flicking on a phone or by flinging the scroll wheel on a mouse. A value of 1 means that content will stop immediately; 0 means that content will continue moving forever (or until the bounds of the content are reached, depending on the scrollMode).
    */
    friction: number;
    /**
     * Controls whether the horizontal scrollbar should be visible all the time, or only visible when the content exceeds the size of the viewport.
    */
    horizontalScrollbarVisibility: number;
    /**
     * Controls whether the vertical scrollbar should be visible all the time, or only visible when the content exceeds the size of the viewport.
    */
    verticalScrollbarVisibility: number;
    /**
     * The entity to be used as the masked viewport area, within which the content will scroll. This entity must have an ElementGroup component.
    */
    viewportEntity: Entity;
    /**
     * The entity which contains the scrolling content itself. This entity must have an Element component.
    */
    contentEntity: Entity;
    /**
     * The entity to be used as the vertical scrollbar. This entity must have a Scrollbar component.
    */
    horizontalScrollbarEntity: Entity;
    /**
     * The entity to be used as the vertical scrollbar. This entity must have a Scrollbar component.
    */
    verticalScrollbarEntity: Entity;
}

/**
 * Content does not scroll any further than its bounds.
 */
export const SCROLL_MODE_CLAMP: number;

/**
 * Content scrolls past its bounds and then gently bounces back.
 */
export const SCROLL_MODE_BOUNCE: number;

/**
 * Content can scroll forever.
 */
export const SCROLL_MODE_INFINITE: number;

/**
 * The scrollbar will be visible all the time.
 */
export const SCROLLBAR_VISIBILITY_SHOW_ALWAYS: number;

/**
 * The scrollbar will be visible only when content exceeds the size of the viewport.
 */
export const SCROLLBAR_VISIBILITY_SHOW_WHEN_REQUIRED: number;

/**
 * Create a new ScrollViewComponentSystem.
 * @param app - The application.
 */
export class ScrollViewComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create a new ScrollbarComponent.
 * @property orientation - Whether the scrollbar moves horizontally or vertically. Can be:

* {@link ORIENTATION_HORIZONTAL}: The scrollbar animates in the horizontal axis.
* {@link ORIENTATION_VERTICAL}: The scrollbar animates in the vertical axis.

Defaults to {@link ORIENTATION_HORIZONTAL}.
 * @property value - The current position value of the scrollbar, in the range 0 to 1. Defaults to 0.
 * @property handleSize - The size of the handle relative to the size of the track, in the range
0 to 1. For a vertical scrollbar, a value of 1 means that the handle will take up the full height of
the track.
 * @property handleEntity - The entity to be used as the scrollbar handle. This entity must
have a Scrollbar component.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class ScrollbarComponent extends Component {
    constructor(system: ScrollbarComponentSystem, entity: Entity);
    /**
     * Whether the scrollbar moves horizontally or vertically. Can be:
     * * {@link ORIENTATION_HORIZONTAL}: The scrollbar animates in the horizontal axis.
     * * {@link ORIENTATION_VERTICAL}: The scrollbar animates in the vertical axis.
     * Defaults to {@link ORIENTATION_HORIZONTAL}.
    */
    orientation: number;
    /**
     * The current position value of the scrollbar, in the range 0 to 1. Defaults to 0.
    */
    value: number;
    /**
     * The size of the handle relative to the size of the track, in the range
     * 0 to 1. For a vertical scrollbar, a value of 1 means that the handle will take up the full height of
     * the track.
    */
    handleSize: number;
    /**
     * The entity to be used as the scrollbar handle. This entity must
     * have a Scrollbar component.
    */
    handleEntity: Entity;
}

/**
 * Create a new ScrollbarComponentSystem.
 * @param app - The application.
 */
export class ScrollbarComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Create a new Sound Component.
 * @property volume - The volume modifier to play the audio with. In range 0-1.
Defaults to 1.
 * @property pitch - The pitch modifier to play the audio with. Must be larger
than 0.01. Defaults to 1.
 * @property positional - If true the audio will play back at the location
of the Entity in space, so the audio will be affected by the position of the
{@link AudioListenerComponent}. Defaults to true.
 * @property distanceModel - Determines which algorithm to use to reduce the
volume of the sound as it moves away from the listener. Can be:

* {@link DISTANCE_LINEAR}
* {@link DISTANCE_INVERSE}
* {@link DISTANCE_EXPONENTIAL}

Defaults to {@link DISTANCE_LINEAR}.
 * @property refDistance - The reference distance for reducing volume as the
sound source moves further from the listener. Defaults to 1.
 * @property maxDistance - The maximum distance from the listener at which audio
falloff stops. Note the volume of the audio is not 0 after this distance, but just
doesn't fall off anymore. Defaults to 10000.
 * @property rollOffFactor - The factor used in the falloff equation. Defaults to 1.
 * @property slots - A dictionary that contains the {@link SoundSlot}s managed
by this SoundComponent.
 * @param system - The ComponentSystem that created this
component.
 * @param entity - The entity that the Component is attached to.
 */
export class SoundComponent extends Component {
    constructor(system: SoundComponentSystem, entity: Entity);
    /**
     * Creates a new {@link SoundSlot} with the specified name.
     * @example
     * // get an asset by id
    var asset = app.assets.get(10);
    // add a slot
    this.entity.sound.addSlot('beep', {
        asset: asset
    });
    // play
    this.entity.sound.play('beep');
     * @param name - The name of the slot.
     * @param [options] - Settings for the slot.
     * @param [options.volume = 1] - The playback volume, between 0 and 1.
     * @param [options.pitch = 1] - The relative pitch, default of 1, plays at normal pitch.
     * @param [options.loop = false] - If true the sound will restart when it reaches the end.
     * @param [options.startTime = 0] - The start time from which the sound will start playing.
     * @param [options.duration = null] - The duration of the sound that the slot will play starting from startTime.
     * @param [options.overlap = false] - If true then sounds played from slot will be played independently of each other. Otherwise the slot will first stop the current sound before starting the new one.
     * @param [options.autoPlay = false] - If true the slot will start playing as soon as its audio asset is loaded.
     * @param [options.asset = null] - The asset id of the audio asset that is going to be played by this slot.
     * @returns The new slot.
     */
    addSlot(name: string, options?: {
        volume?: number;
        pitch?: number;
        loop?: boolean;
        startTime?: number;
        duration?: number;
        overlap?: boolean;
        autoPlay?: boolean;
        asset?: number;
    }): SoundSlot;
    /**
     * Removes the {@link SoundSlot} with the specified name.
     * @example
     * // remove a slot called 'beep'
    this.entity.sound.removeSlot('beep');
     * @param name - The name of the slot.
     */
    removeSlot(name: string): void;
    /**
     * Returns the slot with the specified name.
     * @example
     * // get a slot and set its volume
    this.entity.sound.slot('beep').volume = 0.5;
     * @param name - The name of the slot.
     * @returns The slot.
     */
    slot(name: string): SoundSlot;
    /**
     * Begins playing the sound slot with the specified name. The slot will restart playing if it is already playing unless the overlap field is true in which case a new sound will be created and played.
     * @example
     * // get asset by id
    var asset = app.assets.get(10);
    // create a slot and play it
    this.entity.sound.addSlot('beep', {
        asset: asset
    });
    this.entity.sound.play('beep');
     * @param name - The name of the {@link SoundSlot} to play.
     * @returns The sound instance that will be played.
     */
    play(name: string): SoundInstance;
    /**
     * Pauses playback of the slot with the specified name. If the name is undefined then all slots currently played will be paused. The slots can be resumed by calling {@link SoundComponent#resume}.
     * @example
     * // pause all sounds
    this.entity.sound.pause();
    // pause a specific sound
    this.entity.sound.pause('beep');
     * @param [name] - The name of the slot to pause. Leave undefined to pause everything.
     */
    pause(name?: string): void;
    /**
     * Resumes playback of the sound slot with the specified name if it's paused. If no
    name is specified all slots will be resumed.
     * @example
     * // resume all sounds
    this.entity.sound.resume();
    // resume a specific sound
    this.entity.sound.resume('beep');
     * @param [name] - The name of the slot to resume. Leave undefined to resume everything.
     */
    resume(name?: string): void;
    /**
     * Stops playback of the sound slot with the specified name if it's paused. If no
    name is specified all slots will be stopped.
     * @example
     * // stop all sounds
    this.entity.sound.stop();
    // stop a specific sound
    this.entity.sound.stop('beep');
     * @param [name] - The name of the slot to stop. Leave undefined to stop everything.
     */
    stop(name?: string): void;
    /**
     * The volume modifier to play the audio with. In range 0-1.
     * Defaults to 1.
    */
    volume: number;
    /**
     * The pitch modifier to play the audio with. Must be larger
     * than 0.01. Defaults to 1.
    */
    pitch: number;
    /**
     * If true the audio will play back at the location
     * of the Entity in space, so the audio will be affected by the position of the
     * {@link AudioListenerComponent}. Defaults to true.
    */
    positional: boolean;
    /**
     * Determines which algorithm to use to reduce the
     * volume of the sound as it moves away from the listener. Can be:
     * * {@link DISTANCE_LINEAR}
     * * {@link DISTANCE_INVERSE}
     * * {@link DISTANCE_EXPONENTIAL}
     * Defaults to {@link DISTANCE_LINEAR}.
    */
    distanceModel: string;
    /**
     * The reference distance for reducing volume as the
     * sound source moves further from the listener. Defaults to 1.
    */
    refDistance: number;
    /**
     * The maximum distance from the listener at which audio
     * falloff stops. Note the volume of the audio is not 0 after this distance, but just
     * doesn't fall off anymore. Defaults to 10000.
    */
    maxDistance: number;
    /**
     * The factor used in the falloff equation. Defaults to 1.
    */
    rollOffFactor: number;
    /**
     * A dictionary that contains the {@link SoundSlot}s managed
     * by this SoundComponent.
    */
    slots: any;
}

/**
 * Create a new SoundSlot.
 * @property name - The name of the slot.
 * @property asset - The asset id.
 * @property autoPlay - If true the slot will begin playing as soon as it is loaded.
 * @property volume - The volume modifier to play the sound with. In range 0-1.
 * @property pitch - The pitch modifier to play the sound with. Must be larger than 0.01.
 * @property startTime - The start time from which the sound will start playing.
 * @property duration - The duration of the sound that the slot will play starting from startTime.
 * @property loop - If true the slot will restart when it finishes playing.
 * @property overlap - If true then sounds played from slot will be played independently of each other. Otherwise the slot will first stop the current sound before starting the new one.
 * @property isLoaded - Returns true if the asset of the slot is loaded.
 * @property isPlaying - Returns true if the slot is currently playing.
 * @property isPaused - Returns true if the slot is currently paused.
 * @property isStopped - Returns true if the slot is currently stopped.
 * @property instances - An array that contains all the {@link SoundInstance}s currently being played by the slot.
 * @param component - The Component that created this slot.
 * @param name - The name of the slot.
 * @param options - Settings for the slot.
 * @param [options.volume = 1] - The playback volume, between 0 and 1.
 * @param [options.pitch = 1] - The relative pitch, default of 1, plays at normal pitch.
 * @param [options.loop = false] - If true the sound will restart when it reaches the end.
 * @param [options.startTime = 0] - The start time from which the sound will start playing.
 * @param [options.duration = null] - The duration of the sound that the slot will play starting from startTime.
 * @param [options.overlap = false] - If true then sounds played from slot will be played independently of each other. Otherwise the slot will first stop the current sound before starting the new one.
 * @param [options.autoPlay = false] - If true the slot will start playing as soon as its audio asset is loaded.
 * @param [options.asset = null] - The asset id of the audio asset that is going to be played by this slot.
 */
export class SoundSlot extends EventHandler {
    constructor(component: SoundComponent, name: string, options: {
        volume?: number;
        pitch?: number;
        loop?: boolean;
        startTime?: number;
        duration?: number;
        overlap?: boolean;
        autoPlay?: boolean;
        asset?: number;
    });
    /**
     * Plays a sound. If {@link SoundSlot#overlap} is true the new sound
    instance will be played independently of any other instances already playing.
    Otherwise existing sound instances will stop before playing the new sound.
     * @returns The new sound instance.
     */
    play(): SoundInstance;
    /**
     * Pauses all sound instances. To continue playback call {@link SoundSlot#resume}.
     * @returns True if the sound instances paused successfully, false otherwise.
     */
    pause(): boolean;
    /**
     * Resumes playback of all paused sound instances.
     * @returns True if any instances were resumed.
     */
    resume(): boolean;
    /**
     * Stops playback of all sound instances.
     * @returns True if any instances were stopped.
     */
    stop(): boolean;
    /**
     * Loads the asset assigned to this slot.
     */
    load(): void;
    /**
     * Connect external Web Audio API nodes. Any sound played by this slot will
    automatically attach the specified nodes to the source that plays the sound. You need to pass
    the first node of the node graph that you created externally and the last node of that graph. The first
    node will be connected to the audio source and the last node will be connected to the destination of the AudioContext (e.g. speakers).
     * @example
     * var context = app.systems.sound.context;
    var analyzer = context.createAnalyzer();
    var distortion = context.createWaveShaper();
    var filter = context.createBiquadFilter();
    analyzer.connect(distortion);
    distortion.connect(filter);
    slot.setExternalNodes(analyzer, filter);
     * @param firstNode - The first node that will be connected to the audio source of sound instances.
     * @param [lastNode] - The last node that will be connected to the destination of the AudioContext.
    If unspecified then the firstNode will be connected to the destination instead.
     */
    setExternalNodes(firstNode: AudioNode, lastNode?: AudioNode): void;
    /**
     * Clears any external nodes set by {@link SoundSlot#setExternalNodes}.
     */
    clearExternalNodes(): void;
    /**
     * Gets an array that contains the two external nodes set by {@link SoundSlot#setExternalNodes}.
     * @returns An array of 2 elements that contains the first and last nodes set by {@link SoundSlot#setExternalNodes}.
     */
    getExternalNodes(): AudioNode[];
    /**
     * The name of the slot.
    */
    name: string;
    /**
     * The asset id.
    */
    asset: number | null;
    /**
     * If true the slot will begin playing as soon as it is loaded.
    */
    autoPlay: boolean;
    /**
     * The volume modifier to play the sound with. In range 0-1.
    */
    volume: number;
    /**
     * The pitch modifier to play the sound with. Must be larger than 0.01.
    */
    pitch: number;
    /**
     * The start time from which the sound will start playing.
    */
    startTime: number;
    /**
     * The duration of the sound that the slot will play starting from startTime.
    */
    duration: number;
    /**
     * If true the slot will restart when it finishes playing.
    */
    loop: boolean;
    /**
     * If true then sounds played from slot will be played independently of each other. Otherwise the slot will first stop the current sound before starting the new one.
    */
    overlap: boolean;
    /**
     * Returns true if the asset of the slot is loaded.
    */
    isLoaded: boolean;
    /**
     * Returns true if the slot is currently playing.
    */
    isPlaying: boolean;
    /**
     * Returns true if the slot is currently paused.
    */
    isPaused: boolean;
    /**
     * Returns true if the slot is currently stopped.
    */
    isStopped: boolean;
    /**
     * An array that contains all the {@link SoundInstance}s currently being played by the slot.
    */
    instances: SoundInstance[];
}

/**
 * Create a SoundComponentSystem.
 * @property volume - Sets / gets the volume for the entire Sound system. All sounds will have their volume
multiplied by this value. Valid between [0, 1].
 * @property context - Gets the AudioContext currently used by the sound manager. Requires Web Audio API support.
 * @property manager - Gets / sets the sound manager.
 * @param app - The Application.
 * @param manager - The sound manager.
 */
export class SoundComponentSystem extends ComponentSystem {
    constructor(app: Application, manager: SoundManager);
    /**
     * Sets / gets the volume for the entire Sound system. All sounds will have their volume
     * multiplied by this value. Valid between [0, 1].
    */
    volume: number;
    /**
     * Gets the AudioContext currently used by the sound manager. Requires Web Audio API support.
    */
    context: AudioContext;
    /**
     * Gets / sets the sound manager.
    */
    manager: SoundManager;
}

/**
 * Enables an Entity to render a simple static sprite or sprite animations.
 * @property type - The type of the SpriteComponent. Can be:

* {@link SPRITETYPE_SIMPLE}: The component renders a single frame from a sprite asset.
* {@link SPRITETYPE_ANIMATED}: The component can play sprite animation clips.
 * @property frame - The frame counter of the sprite. Specifies which frame from the current sprite asset to render.
 * @property spriteAsset - The id of the sprite asset to render. Only works for {@link SPRITETYPE_SIMPLE} types.
 * @property sprite - The current sprite.
 * @property width - The width of the sprite when rendering using 9-Slicing. The width and height are only used when the render mode of the sprite asset is Sliced or Tiled.
 * @property height - The height of the sprite when rendering using 9-Slicing. The width and height are only used when the render mode of the sprite asset is Sliced or Tiled.
 * @property color - The color tint of the sprite.
 * @property opacity - The opacity of the sprite.
 * @property flipX - Flip the X axis when rendering a sprite.
 * @property flipY - Flip the Y axis when rendering a sprite.
 * @property clips - A dictionary that contains {@link SpriteAnimationClip}s.
 * @property currentClip - The current clip being played.
 * @property speed - A global speed modifier used when playing sprite animation clips.
 * @property batchGroupId - Assign sprite to a specific batch group (see {@link BatchGroup}). Default value is -1 (no group).
 * @property autoPlayClip - The name of the clip to play automatically when the component is enabled and the clip exists.
 * @property layers - An array of layer IDs ({@link Layer#id}) to which this sprite should belong.
 * @property drawOrder - The draw order of the component. A higher value means that the component will be rendered on top of other components in the same layer. This is not used unless the layer's sort order is set to {@link SORTMODE_MANUAL}.
 * @param system - The ComponentSystem that created this Component.
 * @param entity - The Entity that this Component is attached to.
 */
export class SpriteComponent extends Component {
    constructor(system: SpriteComponentSystem, entity: Entity);
    /**
     * Creates and adds a new {@link SpriteAnimationClip} to the component's clips.
     * @param data - Data for the new animation clip.
     * @param [data.name] - The name of the new animation clip.
     * @param [data.fps] - Frames per second for the animation clip.
     * @param [data.loop] - Whether to loop the animation clip.
     * @param [data.spriteAsset] - The id of the sprite asset that this clip will play.
     * @returns The new clip that was added.
     */
    addClip(data: {
        name?: string;
        fps?: number;
        loop?: any;
        spriteAsset?: number;
    }): SpriteAnimationClip;
    /**
     * Removes a clip by name.
     * @param name - The name of the animation clip to remove.
     */
    removeClip(name: string): void;
    /**
     * Get an animation clip by name.
     * @param name - The name of the clip.
     * @returns The clip.
     */
    clip(name: string): SpriteAnimationClip;
    /**
     * Plays a sprite animation clip by name. If the animation clip is already playing then this will do nothing.
     * @param name - The name of the clip to play.
     * @returns The clip that started playing.
     */
    play(name: string): SpriteAnimationClip;
    /**
     * Pauses the current animation clip.
     */
    pause(): void;
    /**
     * Resumes the current paused animation clip.
     */
    resume(): void;
    /**
     * Stops the current animation clip and resets it to the first frame.
     */
    stop(): void;
    /**
     * The type of the SpriteComponent. Can be:
     * * {@link SPRITETYPE_SIMPLE}: The component renders a single frame from a sprite asset.
     * * {@link SPRITETYPE_ANIMATED}: The component can play sprite animation clips.
    */
    type: string;
    /**
     * The frame counter of the sprite. Specifies which frame from the current sprite asset to render.
    */
    frame: number;
    /**
     * The id of the sprite asset to render. Only works for {@link SPRITETYPE_SIMPLE} types.
    */
    spriteAsset: number;
    /**
     * The current sprite.
    */
    sprite: Sprite;
    /**
     * The width of the sprite when rendering using 9-Slicing. The width and height are only used when the render mode of the sprite asset is Sliced or Tiled.
    */
    width: number;
    /**
     * The height of the sprite when rendering using 9-Slicing. The width and height are only used when the render mode of the sprite asset is Sliced or Tiled.
    */
    height: number;
    /**
     * The color tint of the sprite.
    */
    color: Color;
    /**
     * The opacity of the sprite.
    */
    opacity: number;
    /**
     * Flip the X axis when rendering a sprite.
    */
    flipX: boolean;
    /**
     * Flip the Y axis when rendering a sprite.
    */
    flipY: boolean;
    /**
     * A dictionary that contains {@link SpriteAnimationClip}s.
    */
    clips: any;
    /**
     * The current clip being played.
    */
    currentClip: SpriteAnimationClip;
    /**
     * A global speed modifier used when playing sprite animation clips.
    */
    speed: number;
    /**
     * Assign sprite to a specific batch group (see {@link BatchGroup}). Default value is -1 (no group).
    */
    batchGroupId: number;
    /**
     * The name of the clip to play automatically when the component is enabled and the clip exists.
    */
    autoPlayClip: string;
    /**
     * An array of layer IDs ({@link Layer#id}) to which this sprite should belong.
    */
    layers: number[];
    /**
     * The draw order of the component. A higher value means that the component will be rendered on top of other components in the same layer. This is not used unless the layer's sort order is set to {@link SORTMODE_MANUAL}.
    */
    drawOrder: number;
}

/**
 * A {@link SpriteComponent} that displays a single frame from a sprite asset.
 */
export const SPRITETYPE_SIMPLE: string;

/**
 * A {@link SpriteComponent} that renders sprite animations.
 */
export const SPRITETYPE_ANIMATED: string;

/**
 * Handles playing of sprite animations and loading of relevant sprite assets.
 * @property spriteAsset - The id of the sprite asset used to play the animation.
 * @property sprite - The current sprite used to play the animation.
 * @property frame - The index of the frame of the {@link Sprite} currently being rendered.
 * @property time - The current time of the animation in seconds.
 * @property duration - The total duration of the animation in seconds.
 * @property isPlaying - Whether the animation is currently playing.
 * @property isPaused - Whether the animation is currently paused.
 * @param component - The sprite component managing this clip.
 * @param data - Data for the new animation clip.
 * @param [data.fps] - Frames per second for the animation clip.
 * @param [data.loop] - Whether to loop the animation clip.
 * @param [data.name] - The name of the new animation clip.
 * @param [data.spriteAsset] - The id of the sprite asset that this clip will play.
 */
export class SpriteAnimationClip extends EventHandler {
    constructor(component: SpriteComponent, data: {
        fps?: number;
        loop?: any;
        name?: string;
        spriteAsset?: number;
    });
    /**
     * Plays the animation. If it's already playing then this does nothing.
     */
    play(): void;
    /**
     * Pauses the animation.
     */
    pause(): void;
    /**
     * Resumes the paused animation.
     */
    resume(): void;
    /**
     * Stops the animation and resets the animation to the first frame.
     */
    stop(): void;
    /**
     * The id of the sprite asset used to play the animation.
    */
    spriteAsset: number;
    /**
     * The current sprite used to play the animation.
    */
    sprite: Sprite;
    /**
     * The index of the frame of the {@link Sprite} currently being rendered.
    */
    frame: number;
    /**
     * The current time of the animation in seconds.
    */
    time: number;
    /**
     * The total duration of the animation in seconds.
    */
    duration: number;
    /**
     * Whether the animation is currently playing.
    */
    isPlaying: boolean;
    /**
     * Whether the animation is currently paused.
    */
    isPaused: boolean;
}

/**
 * Manages creation of {@link SpriteComponent}s.
 * @param app - The application.
 */
export class SpriteComponentSystem extends ComponentSystem {
    constructor(app: Application);
}

/**
 * Component Systems contain the logic and functionality to update all Components of a particular type.
 * @param app - The application managing this system.
 */
export class ComponentSystem extends EventHandler {
    constructor(app: Application);
}

/**
 * When resizing the window the size of the canvas will not change.
 */
export const FILLMODE_NONE: string;

/**
 * When resizing the window the size of the canvas will change to fill the window exactly.
 */
export const FILLMODE_FILL_WINDOW: string;

/**
 * When resizing the window the size of the canvas will change to fill the window as best it can, while maintaining the same aspect ratio.
 */
export const FILLMODE_KEEP_ASPECT: string;

/**
 * When the canvas is resized the resolution of the canvas will change to match the size of the canvas.
 */
export const RESOLUTION_AUTO: string;

/**
 * When the canvas is resized the resolution of the canvas will remain at the same value and the output will just be scaled to fit the canvas.
 */
export const RESOLUTION_FIXED: string;

/**
 * The Entity is the core primitive of a PlayCanvas game. Generally speaking an object in your game will consist of an {@link Entity},
and a set of {@link Component}s which are managed by their respective {@link ComponentSystem}s. One of those components maybe a
{@link ScriptComponent} which allows you to write custom code to attach to your Entity.
<p>
The Entity uniquely identifies the object and also provides a transform for position and orientation
which it inherits from {@link GraphNode} so can be added into the scene graph.
The Component and ComponentSystem provide the logic to give an Entity a specific type of behavior. e.g. the ability to
render a model or play a sound. Components are specific to an instance of an Entity and are attached (e.g. `this.entity.model`)
ComponentSystems allow access to all Entities and Components and are attached to the {@link Application}.
 * @example
 * var entity = new pc.Entity();

// Add a Component to the Entity
entity.addComponent("camera", {
    fov: 45,
    nearClip: 1,
    farClip: 10000
});

// Add the Entity into the scene graph
app.root.addChild(entity);

// Move the entity
entity.translate(10, 0, 0);

// Or translate it by setting it's position directly
var p = entity.getPosition();
entity.setPosition(p.x + 10, p.y, p.z);

// Change the entity's rotation in local space
var e = entity.getLocalEulerAngles();
entity.setLocalEulerAngles(e.x, e.y + 90, e.z);

// Or use rotateLocal
entity.rotateLocal(0, 90, 0);
 * @property [animation] - Gets the {@link AnimationComponent} attached to this entity. [read only]
 * @property [audiolistener] - Gets the {@link AudioListenerComponent} attached to this entity. [read only]
 * @property [button] - Gets the {@link ButtonComponent} attached to this entity. [read only]
 * @property [camera] - Gets the {@link CameraComponent} attached to this entity. [read only]
 * @property [collision] - Gets the {@link CollisionComponent} attached to this entity. [read only]
 * @property [element] - Gets the {@link ElementComponent} attached to this entity. [read only]
 * @property [layoutchild] - Gets the {@link LayoutChildComponent} attached to this entity. [read only]
 * @property [layoutgroup] - Gets the {@link LayoutGroupComponent} attached to this entity. [read only]
 * @property [light] - Gets the {@link LightComponent} attached to this entity. [read only]
 * @property [model] - Gets the {@link ModelComponent} attached to this entity. [read only]
 * @property [particlesystem] - Gets the {@link ParticleSystemComponent} attached to this entity. [read only]
 * @property [rigidbody] - Gets the {@link RigidBodyComponent} attached to this entity. [read only]
 * @property [screen] - Gets the {@link ScreenComponent} attached to this entity. [read only]
 * @property [script] - Gets the {@link ScriptComponent} attached to this entity. [read only]
 * @property [scrollview] - Gets the {@link ScrollViewComponent} attached to this entity. [read only]
 * @property [sound] - Gets the {@link SoundComponent} attached to this entity. [read only]
 * @property [sprite] - Gets the {@link SpriteComponent} attached to this entity. [read only]
 * @param [name] - The non-unique name of the entity, default is "Untitled".
 * @param [app] - The application the entity belongs to, default is the current application.
 */
export class Entity extends GraphNode {
    constructor(name?: string, app?: Application);
    /**
     * Create a new component and add it to the entity.
    Use this to add functionality to the entity like rendering a model, playing sounds and so on.
     * @example
     * var entity = new pc.Entity();
    
    // Add a light component with default properties
    entity.addComponent("light");
    
    // Add a camera component with some specified properties
    entity.addComponent("camera", {
        fov: 45,
        clearColor: new pc.Color(1, 0, 0)
    });
     * @param type - The name of the component to add. Valid strings are:
    
    * "animation" - see {@link AnimationComponent}
    * "audiolistener" - see {@link AudioListenerComponent}
    * "button" - see {@link ButtonComponent}
    * "camera" - see {@link CameraComponent}
    * "collision" - see {@link CollisionComponent}
    * "element" - see {@link ElementComponent}
    * "layoutchild" - see {@link LayoutChildComponent}
    * "layoutgroup" - see {@link LayoutGroupComponent}
    * "light" - see {@link LightComponent}
    * "model" - see {@link ModelComponent}
    * "particlesystem" - see {@link ParticleSystemComponent}
    * "rigidbody" - see {@link RigidBodyComponent}
    * "screen" - see {@link ScreenComponent}
    * "script" - see {@link ScriptComponent}
    * "scrollbar" - see {@link ScrollbarComponent}
    * "scrollview" - see {@link ScrollViewComponent}
    * "sound" - see {@link SoundComponent}
    * "sprite" - see {@link SpriteComponent}
     * @param [data] - The initialization data for the specific component type. Refer to each
    specific component's API reference page for details on valid values for this parameter.
     * @returns The new Component that was attached to the entity or null if there
    was an error.
     */
    addComponent(type: string, data?: any): Component;
    /**
     * Remove a component from the Entity.
     * @example
     * var entity = new pc.Entity();
    entity.addComponent("light"); // add new light component
    
    entity.removeComponent("light"); // remove light component
     * @param type - The name of the Component type.
     */
    removeComponent(type: string): void;
    /**
     * Search the entity and all of its descendants for the first component of specified type.
     * @example
     * // Get the first found light component in the hierarchy tree that starts with this entity
    var light = entity.findComponent("light");
     * @param type - The name of the component type to retrieve.
     * @returns A component of specified type, if the entity or any of its descendants has
    one. Returns undefined otherwise.
     */
    findComponent(type: string): Component;
    /**
     * Search the entity and all of its descendants for all components of specified type.
     * @example
     * // Get all light components in the hierarchy tree that starts with this entity
    var lights = entity.findComponents("light");
     * @param type - The name of the component type to retrieve.
     * @returns All components of specified type in the entity or any of its descendants.
    Returns empty array if none found.
     */
    findComponents(type: string): Component[];
    /**
     * Find a descendant of this Entity with the GUID.
     * @param guid - The GUID to search for.
     * @returns The Entity with the GUID or null.
     */
    findByGuid(guid: string): Entity;
    /**
     * Remove all components from the Entity and detach it from the Entity hierarchy. Then recursively destroy all ancestor Entities.
     * @example
     * var firstChild = this.entity.children[0];
    firstChild.destroy(); // delete child, all components and remove from hierarchy
     */
    destroy(): void;
    /**
     * Create a deep copy of the Entity. Duplicate the full Entity hierarchy, with all Components and all descendants.
    Note, this Entity is not in the hierarchy and must be added manually.
     * @example
     * var e = this.entity.clone();
    
    // Add clone as a sibling to the original
    this.entity.parent.addChild(e);
     * @returns A new Entity which is a deep copy of the original.
     */
    clone(): Entity;
    /**
     * Gets the {@link AnimationComponent} attached to this entity. [read only]
    */
    animation?: AnimationComponent;
    /**
     * Gets the {@link AudioListenerComponent} attached to this entity. [read only]
    */
    audiolistener?: AudioListenerComponent;
    /**
     * Gets the {@link ButtonComponent} attached to this entity. [read only]
    */
    button?: ButtonComponent;
    /**
     * Gets the {@link CameraComponent} attached to this entity. [read only]
    */
    camera?: CameraComponent;
    /**
     * Gets the {@link CollisionComponent} attached to this entity. [read only]
    */
    collision?: CollisionComponent;
    /**
     * Gets the {@link ElementComponent} attached to this entity. [read only]
    */
    element?: ElementComponent;
    /**
     * Gets the {@link LayoutChildComponent} attached to this entity. [read only]
    */
    layoutchild?: LayoutChildComponent;
    /**
     * Gets the {@link LayoutGroupComponent} attached to this entity. [read only]
    */
    layoutgroup?: LayoutGroupComponent;
    /**
     * Gets the {@link LightComponent} attached to this entity. [read only]
    */
    light?: LightComponent;
    /**
     * Gets the {@link ModelComponent} attached to this entity. [read only]
    */
    model?: ModelComponent;
    /**
     * Gets the {@link ParticleSystemComponent} attached to this entity. [read only]
    */
    particlesystem?: ParticleSystemComponent;
    /**
     * Gets the {@link RigidBodyComponent} attached to this entity. [read only]
    */
    rigidbody?: RigidBodyComponent;
    /**
     * Gets the {@link ScreenComponent} attached to this entity. [read only]
    */
    screen?: ScreenComponent;
    /**
     * Gets the {@link ScriptComponent} attached to this entity. [read only]
    */
    script?: ScriptComponent;
    /**
     * Gets the {@link ScrollViewComponent} attached to this entity. [read only]
    */
    scrollview?: ScrollViewComponent;
    /**
     * Gets the {@link SoundComponent} attached to this entity. [read only]
    */
    sound?: SoundComponent;
    /**
     * Gets the {@link SpriteComponent} attached to this entity. [read only]
    */
    sprite?: SpriteComponent;
}

/**
 * Item to be stored in the {@link SceneRegistry}.
 * @property name - The name of the scene.
 * @property url - The url of the scene file.
 * @param name - The name of the scene.
 * @param url - The url of the scene file.
 */
export class SceneRegistryItem {
    constructor(name: string, url: string);
    /**
     * The name of the scene.
    */
    name: string;
    /**
     * The url of the scene file.
    */
    url: string;
}

/**
 * Container for storing the name and url for scene files.
 * @param app - The application.
 */
export class SceneRegistry {
    constructor(app: Application);
    /**
     * Return the list of scene.
     * @returns All items in the registry.
     */
    list(): SceneRegistryItem[];
    /**
     * Add a new item to the scene registry.
     * @param name - The name of the scene.
     * @param url - The url of the scene file.
     * @returns Returns true if the scene was successfully added to the registry, false otherwise.
     */
    add(name: string, url: string): boolean;
    /**
     * Find a Scene by name and return the {@link SceneRegistryItem}.
     * @param name - The name of the scene.
     * @returns The stored data about a scene.
     */
    find(name: string): SceneRegistryItem;
    /**
     * Find a scene by the URL and return the {@link SceneRegistryItem}.
     * @param url - The URL to search by.
     * @returns The stored data about a scene.
     */
    findByUrl(url: string): SceneRegistryItem;
    /**
     * Remove an item from the scene registry.
     * @param name - The name of the scene.
     */
    remove(name: string): void;
    /**
     * Load a scene file, create and initialize the Entity hierarchy
    and add the hierarchy to the application root Entity.
     * @example
     * var url = app.scenes.getSceneUrl("Scene Name");
    app.scenes.loadSceneHierarchy(url, function (err, entity) {
        if (!err) {
            var e = app.root.find("My New Entity");
        } else {
            // error
        }
    });
     * @param url - The URL of the scene file. Usually this will be "scene_id.json".
     * @param callback - The function to call after loading,
    passed (err, entity) where err is null if no errors occurred.
     */
    loadSceneHierarchy(url: string, callback: callbacks.LoadHierarchy): void;
    /**
     * Load a scene file and apply the scene settings to the current scene.
     * @example
     * var url = app.getSceneUrl("Scene Name");
    app.loadSceneSettings(url, function (err) {
        if (!err) {
          // success
        } else {
          // error
        }
    });
     * @param url - The URL of the scene file. This can be looked up using app.getSceneUrl.
     * @param callback - The function called after the settings
    are applied. Passed (err) where err is null if no error occurred.
     */
    loadSceneSettings(url: string, callback: callbacks.LoadSettings): void;
    /**
     * Load the scene hierarchy and scene settings. This is an internal method used
    by the {@link Application}.
     * @param url - The URL of the scene file.
     * @param callback - The function called after the settings are
    applied. Passed (err, scene) where err is null if no error occurred and scene is the
    {@link Scene}.
     */
    loadScene(url: string, callback: callbacks.LoadScene): void;
}

/**
 * The script namespace holds the createLoadingScreen function that
is used to override the default PlayCanvas loading screen.
 */
export namespace script {
    /**
     * Handles the creation of the loading screen of the application. A script can subscribe to
    the events of a {@link Application} to show a loading screen, progress bar etc. In order for this to work
    you need to set the project's loading screen script to the script that calls this method.
     * @example
     * pc.script.createLoadingScreen(function (app) {
        var showSplashScreen = function () {};
        var hideSplashScreen = function () {};
        var showProgress = function (progress) {};
        app.on("preload:start", showSplashScreen);
        app.on("preload:progress", showProgress);
        app.on("start", hideSplashScreen);
    });
     * @param callback - A function which can set up and tear down a customised loading screen.
     */
    function createLoadingScreen(callback: callbacks.CreateScreen): void;
}

/**
 * Ignores the integer part of texture coordinates, using only the fractional part.
 */
export const ADDRESS_REPEAT: number;

/**
 * Clamps texture coordinate to the range 0 to 1.
 */
export const ADDRESS_CLAMP_TO_EDGE: number;

/**
 * Texture coordinate to be set to the fractional part if the integer part is even. If the integer part is odd,
then the texture coordinate is set to 1 minus the fractional part.
 */
export const ADDRESS_MIRRORED_REPEAT: number;

/**
 * Multiply all fragment components by zero.
 */
export const BLENDMODE_ZERO: number;

/**
 * Multiply all fragment components by one.
 */
export const BLENDMODE_ONE: number;

/**
 * Multiply all fragment components by the components of the source fragment.
 */
export const BLENDMODE_SRC_COLOR: number;

/**
 * Multiply all fragment components by one minus the components of the source fragment.
 */
export const BLENDMODE_ONE_MINUS_SRC_COLOR: number;

/**
 * Multiply all fragment components by the components of the destination fragment.
 */
export const BLENDMODE_DST_COLOR: number;

/**
 * Multiply all fragment components by one minus the components of the destination fragment.
 */
export const BLENDMODE_ONE_MINUS_DST_COLOR: number;

/**
 * Multiply all fragment components by the alpha value of the source fragment.
 */
export const BLENDMODE_SRC_ALPHA: number;

/**
 * Multiply all fragment components by the alpha value of the source fragment.
 */
export const BLENDMODE_SRC_ALPHA_SATURATE: number;

/**
 * Multiply all fragment components by one minus the alpha value of the source fragment.
 */
export const BLENDMODE_ONE_MINUS_SRC_ALPHA: number;

/**
 * Multiply all fragment components by the alpha value of the destination fragment.
 */
export const BLENDMODE_DST_ALPHA: number;

/**
 * Multiply all fragment components by one minus the alpha value of the destination fragment.
 */
export const BLENDMODE_ONE_MINUS_DST_ALPHA: number;

/**
 * Add the results of the source and destination fragment multiplies.
 */
export const BLENDEQUATION_ADD: number;

/**
 * Subtract the results of the source and destination fragment multiplies.
 */
export const BLENDEQUATION_SUBTRACT: number;

/**
 * Reverse and subtract the results of the source and destination fragment multiplies.
 */
export const BLENDEQUATION_REVERSE_SUBTRACT: number;

/**
 * Use the smallest value. Check app.graphicsDevice.extBlendMinmax for support.
 */
export const BLENDEQUATION_MIN: number;

/**
 * Use the largest value. Check app.graphicsDevice.extBlendMinmax for support.
 */
export const BLENDEQUATION_MAX: number;

/**
 * The data store contents will be modified once and used many times.
 */
export const BUFFER_STATIC: number;

/**
 * The data store contents will be modified repeatedly and used many times.
 */
export const BUFFER_DYNAMIC: number;

/**
 * The data store contents will be modified once and used at most a few times.
 */
export const BUFFER_STREAM: number;

/**
 * The data store contents will be modified repeatedly on the GPU and used many times. Optimal for transform feedback usage (WebGL2 only).
 */
export const BUFFER_GPUDYNAMIC: number;

/**
 * Clear the color buffer.
 */
export const CLEARFLAG_COLOR: number;

/**
 * Clear the depth buffer.
 */
export const CLEARFLAG_DEPTH: number;

/**
 * Clear the stencil buffer.
 */
export const CLEARFLAG_STENCIL: number;

/**
 * The positive X face of a cubemap.
 */
export const CUBEFACE_POSX: number;

/**
 * The negative X face of a cubemap.
 */
export const CUBEFACE_NEGX: number;

/**
 * The positive Y face of a cubemap.
 */
export const CUBEFACE_POSY: number;

/**
 * The negative Y face of a cubemap.
 */
export const CUBEFACE_NEGY: number;

/**
 * The positive Z face of a cubemap.
 */
export const CUBEFACE_POSZ: number;

/**
 * The negative Z face of a cubemap.
 */
export const CUBEFACE_NEGZ: number;

/**
 * No triangles are culled.
 */
export const CULLFACE_NONE: number;

/**
 * Triangles facing away from the view direction are culled.
 */
export const CULLFACE_BACK: number;

/**
 * Triangles facing the view direction are culled.
 */
export const CULLFACE_FRONT: number;

/**
 * Triangles are culled regardless of their orientation with respect to the view
direction. Note that point or line primitives are unaffected by this render state.
 */
export const CULLFACE_FRONTANDBACK: number;

/**
 * Point sample filtering.
 */
export const FILTER_NEAREST: number;

/**
 * Bilinear filtering.
 */
export const FILTER_LINEAR: number;

/**
 * Use the nearest neighbor in the nearest mipmap level.
 */
export const FILTER_NEAREST_MIPMAP_NEAREST: number;

/**
 * Linearly interpolate in the nearest mipmap level.
 */
export const FILTER_NEAREST_MIPMAP_LINEAR: number;

/**
 * Use the nearest neighbor after linearly interpolating between mipmap levels.
 */
export const FILTER_LINEAR_MIPMAP_NEAREST: number;

/**
 * Linearly interpolate both the mipmap levels and between texels.
 */
export const FILTER_LINEAR_MIPMAP_LINEAR: number;

/**
 * Never pass.
 */
export const FUNC_NEVER: number;

/**
 * Pass if (ref & mask) < (stencil & mask).
 */
export const FUNC_LESS: number;

/**
 * Pass if (ref & mask) == (stencil & mask).
 */
export const FUNC_EQUAL: number;

/**
 * Pass if (ref & mask) <= (stencil & mask).
 */
export const FUNC_LESSEQUAL: number;

/**
 * Pass if (ref & mask) > (stencil & mask).
 */
export const FUNC_GREATER: number;

/**
 * Pass if (ref & mask) != (stencil & mask).
 */
export const FUNC_NOTEQUAL: number;

/**
 * Pass if (ref & mask) >= (stencil & mask).
 */
export const FUNC_GREATEREQUAL: number;

/**
 * Always pass.
 */
export const FUNC_ALWAYS: number;

/**
 * 8-bit unsigned vertex indices (0 to 255).
 */
export const INDEXFORMAT_UINT8: number;

/**
 * 16-bit unsigned vertex indices (0 to 65,535).
 */
export const INDEXFORMAT_UINT16: number;

/**
 * 32-bit unsigned vertex indices (0 to 4,294,967,295).
 */
export const INDEXFORMAT_UINT32: number;

/**
 * 8-bit alpha.
 */
export const PIXELFORMAT_A8: number;

/**
 * 8-bit luminance.
 */
export const PIXELFORMAT_L8: number;

/**
 * 8-bit luminance with 8-bit alpha.
 */
export const PIXELFORMAT_L8_A8: number;

/**
 * 16-bit RGB (5-bits for red channel, 6 for green and 5 for blue).
 */
export const PIXELFORMAT_R5_G6_B5: number;

/**
 * 16-bit RGBA (5-bits for red channel, 5 for green, 5 for blue with 1-bit alpha).
 */
export const PIXELFORMAT_R5_G5_B5_A1: number;

/**
 * 16-bit RGBA (4-bits for red channel, 4 for green, 4 for blue with 4-bit alpha).
 */
export const PIXELFORMAT_R4_G4_B4_A4: number;

/**
 * 24-bit RGB (8-bits for red channel, 8 for green and 8 for blue).
 */
export const PIXELFORMAT_R8_G8_B8: number;

/**
 * 32-bit RGBA (8-bits for red channel, 8 for green, 8 for blue with 8-bit alpha).
 */
export const PIXELFORMAT_R8_G8_B8_A8: number;

/**
 * Block compressed format storing 16 input pixels in 64 bits of output, consisting of two 16-bit RGB 5:6:5 color values and a 4x4 two bit lookup table.
 */
export const PIXELFORMAT_DXT1: number;

/**
 * Block compressed format storing 16 input pixels (corresponding to a 4x4 pixel block) into 128 bits of output, consisting of 64 bits of alpha channel data (4 bits for each pixel) followed by 64 bits of color data; encoded the same way as DXT1.
 */
export const PIXELFORMAT_DXT3: number;

/**
 * Block compressed format storing 16 input pixels into 128 bits of output, consisting of 64 bits of alpha channel data (two 8 bit alpha values and a 4x4 3 bit lookup table) followed by 64 bits of color data (encoded the same way as DXT1).
 */
export const PIXELFORMAT_DXT5: number;

/**
 * 16-bit floating point RGB (16-bit float for each red, green and blue channels).
 */
export const PIXELFORMAT_RGB16F: number;

/**
 * 16-bit floating point RGBA (16-bit float for each red, green, blue and alpha channels).
 */
export const PIXELFORMAT_RGBA16F: number;

/**
 * 32-bit floating point RGB (32-bit float for each red, green and blue channels).
 */
export const PIXELFORMAT_RGB32F: number;

/**
 * 32-bit floating point RGBA (32-bit float for each red, green, blue and alpha channels).
 */
export const PIXELFORMAT_RGBA32F: number;

/**
 * 32-bit floating point single channel format (WebGL2 only).
 */
export const PIXELFORMAT_R32F: number;

/**
 * A readable depth buffer format.
 */
export const PIXELFORMAT_DEPTH: number;

/**
 * A readable depth/stencil buffer format (WebGL2 only).
 */
export const PIXELFORMAT_DEPTHSTENCIL: number;

/**
 * A floating-point color-only format with 11 bits for red and green channels and 10 bits for the blue channel (WebGL2 only).
 */
export const PIXELFORMAT_111110F: number;

/**
 * Color-only sRGB format (WebGL2 only).
 */
export const PIXELFORMAT_SRGB: number;

/**
 * Color sRGB format with additional alpha channel (WebGL2 only).
 */
export const PIXELFORMAT_SRGBA: number;

/**
 * ETC1 compressed format.
 */
export const PIXELFORMAT_ETC1: number;

/**
 * ETC2 (RGB) compressed format.
 */
export const PIXELFORMAT_ETC2_RGB: number;

/**
 * ETC2 (RGBA) compressed format.
 */
export const PIXELFORMAT_ETC2_RGBA: number;

/**
 * PVRTC (2BPP RGB) compressed format.
 */
export const PIXELFORMAT_PVRTC_2BPP_RGB_1: number;

/**
 * PVRTC (2BPP RGBA) compressed format.
 */
export const PIXELFORMAT_PVRTC_2BPP_RGBA_1: number;

/**
 * PVRTC (4BPP RGB) compressed format.
 */
export const PIXELFORMAT_PVRTC_4BPP_RGB_1: number;

/**
 * PVRTC (4BPP RGBA) compressed format.
 */
export const PIXELFORMAT_PVRTC_4BPP_RGBA_1: number;

/**
 * ATC compressed format with alpha channel in blocks of 4x4.
 */
export const PIXELFORMAT_ASTC_4x4: number;

/**
 * ATC compressed format with no alpha channel.
 */
export const PIXELFORMAT_ATC_RGB: number;

/**
 * ATC compressed format with alpha channel.
 */
export const PIXELFORMAT_ATC_RGBA: number;

/**
 * List of distinct points.
 */
export const PRIMITIVE_POINTS: number;

/**
 * Discrete list of line segments.
 */
export const PRIMITIVE_LINES: number;

/**
 * List of points that are linked sequentially by line segments, with a closing line segment between the last and first points.
 */
export const PRIMITIVE_LINELOOP: number;

/**
 * List of points that are linked sequentially by line segments.
 */
export const PRIMITIVE_LINESTRIP: number;

/**
 * Discrete list of triangles.
 */
export const PRIMITIVE_TRIANGLES: number;

/**
 * Connected strip of triangles where a specified vertex forms a triangle using the previous two.
 */
export const PRIMITIVE_TRISTRIP: number;

/**
 * Connected fan of triangles where the first vertex forms triangles with the following pairs of vertices.
 */
export const PRIMITIVE_TRIFAN: number;

/**
 * Vertex attribute to be treated as a position.
 */
export const SEMANTIC_POSITION: string;

/**
 * Vertex attribute to be treated as a normal.
 */
export const SEMANTIC_NORMAL: string;

/**
 * Vertex attribute to be treated as a tangent.
 */
export const SEMANTIC_TANGENT: string;

/**
 * Vertex attribute to be treated as skin blend weights.
 */
export const SEMANTIC_BLENDWEIGHT: string;

/**
 * Vertex attribute to be treated as skin blend indices.
 */
export const SEMANTIC_BLENDINDICES: string;

/**
 * Vertex attribute to be treated as a color.
 */
export const SEMANTIC_COLOR: string;

/**
 * Vertex attribute to be treated as a texture coordinate (set 0).
 */
export const SEMANTIC_TEXCOORD0: string;

/**
 * Vertex attribute to be treated as a texture coordinate (set 1).
 */
export const SEMANTIC_TEXCOORD1: string;

/**
 * Vertex attribute to be treated as a texture coordinate (set 2).
 */
export const SEMANTIC_TEXCOORD2: string;

/**
 * Vertex attribute to be treated as a texture coordinate (set 3).
 */
export const SEMANTIC_TEXCOORD3: string;

/**
 * Vertex attribute to be treated as a texture coordinate (set 4).
 */
export const SEMANTIC_TEXCOORD4: string;

/**
 * Vertex attribute to be treated as a texture coordinate (set 5).
 */
export const SEMANTIC_TEXCOORD5: string;

/**
 * Vertex attribute to be treated as a texture coordinate (set 6).
 */
export const SEMANTIC_TEXCOORD6: string;

/**
 * Vertex attribute to be treated as a texture coordinate (set 7).
 */
export const SEMANTIC_TEXCOORD7: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR0: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR1: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR2: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR3: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR4: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR5: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR6: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR7: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR8: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR9: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR10: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR11: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR12: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR13: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR14: string;

/**
 * Vertex attribute with a user defined semantic.
 */
export const SEMANTIC_ATTR15: string;

/**
 * Don't change the stencil buffer value.
 */
export const STENCILOP_KEEP: number;

/**
 * Set value to zero.
 */
export const STENCILOP_ZERO: number;

/**
 * Replace value with the reference value (see {@link GraphicsDevice#setStencilFunc}).
 */
export const STENCILOP_REPLACE: number;

/**
 * Increment the value.
 */
export const STENCILOP_INCREMENT: number;

/**
 * Increment the value but wrap it to zero when it's larger than a maximum representable value.
 */
export const STENCILOP_INCREMENTWRAP: number;

/**
 * Decrement the value.
 */
export const STENCILOP_DECREMENT: number;

/**
 * Decrement the value but wrap it to a maximum representable value if the current value is 0.
 */
export const STENCILOP_DECREMENTWRAP: number;

/**
 * Invert the value bitwise.
 */
export const STENCILOP_INVERT: number;

/**
 * Read only. Any changes to the locked mip level's pixels will not update the texture.
 */
export const TEXTURELOCK_READ: number;

/**
 * Write only. The contents of the specified mip level will be entirely replaced.
 */
export const TEXTURELOCK_WRITE: number;

/**
 * Texture is a default type.
 */
export const TEXTURETYPE_DEFAULT: string;

/**
 * Texture stores high dynamic range data in RGBM format
 */
export const TEXTURETYPE_RGBM: string;

/**
 * Texture stores high dynamic range data in RGBE format
 */
export const TEXTURETYPE_RGBE: string;

/**
 * Texture stores normalmap data swizzled in GGGR format. This is used for tangent space normal
maps. The R component is stored in alpha and G is stored in RGB. This packing can result in higher quality
when the texture data is compressed.
 */
export const TEXTURETYPE_SWIZZLEGGGR: string;

/**
 * Texture data is not stored a specific projection format.
 */
export const TEXTUREPROJECTION_NONE: number;

/**
 * Texture data is stored in cubemap projection format.
 */
export const TEXTUREPROJECTION_CUBE: number;

/**
 * Texture data is stored in equirectangular projection format.
 */
export const TEXTUREPROJECTION_EQUIRECT: number;

/**
 * Texture data is stored in octahedral projection format.
 */
export const TEXTUREPROJECTION_OCTAHEDRAL: number;

/**
 * Signed byte vertex element type.
 */
export const TYPE_INT8: number;

/**
 * Unsigned byte vertex element type.
 */
export const TYPE_UINT8: number;

/**
 * Signed short vertex element type.
 */
export const TYPE_INT16: number;

/**
 * Unsigned short vertex element type.
 */
export const TYPE_UINT16: number;

/**
 * Signed integer vertex element type.
 */
export const TYPE_INT32: number;

/**
 * Unsigned integer vertex element type.
 */
export const TYPE_UINT32: number;

/**
 * Floating point vertex element type.
 */
export const TYPE_FLOAT32: number;

/**
 * Creates a new graphics device.
 * @property canvas - The canvas DOM element that provides the underlying WebGL context used by the graphics device.
 * @property textureFloatRenderable - Determines if 32-bit floating-point textures can be used as frame buffer. [read only].
 * @property textureHalfFloatRenderable - Determines if 16-bit floating-point textures can be used as frame buffer. [read only].
 * @property scope - The scope namespace for shader attributes and variables. [read only].
 * @param canvas - The canvas to which the graphics device will render.
 * @param [options] - Options passed when creating the WebGL context. More info {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext here}.
 */
export class GraphicsDevice extends EventHandler {
    constructor(canvas: HTMLCanvasElement, options?: any);
    /**
     * The highest shader precision supported by this graphics device. Can be 'hiphp', 'mediump' or 'lowp'.
     */
    readonly precision: string;
    /**
     * The maximum supported dimension of a cube map.
     */
    readonly maxCubeMapSize: number;
    /**
     * The maximum supported dimension of a texture.
     */
    readonly maxTextureSize: number;
    /**
     * The maximum supported dimension of a 3D texture (any axis).
     */
    readonly maxVolumeSize: number;
    /**
     * The maximum supported texture anisotropy setting.
     */
    readonly maxAnisotropy: number;
    /**
     * True if hardware instancing is supported.
     */
    readonly supportsInstancing: boolean;
    /**
     * Set the active rectangle for rendering on the specified device.
     * @param x - The pixel space x-coordinate of the bottom left corner of the viewport.
     * @param y - The pixel space y-coordinate of the bottom left corner of the viewport.
     * @param w - The width of the viewport in pixels.
     * @param h - The height of the viewport in pixels.
     */
    setViewport(x: number, y: number, w: number, h: number): void;
    /**
     * Set the active scissor rectangle on the specified device.
     * @param x - The pixel space x-coordinate of the bottom left corner of the scissor rectangle.
     * @param y - The pixel space y-coordinate of the bottom left corner of the scissor rectangle.
     * @param w - The width of the scissor rectangle in pixels.
     * @param h - The height of the scissor rectangle in pixels.
     */
    setScissor(x: number, y: number, w: number, h: number): void;
    /**
     * Copies source render target into destination render target. Mostly used by post-effects.
     * @param source - The source render target.
     * @param [dest] - The destination render target. Defaults to frame buffer.
     * @param [color] - If true will copy the color buffer. Defaults to false.
     * @param [depth] - If true will copy the depth buffer. Defaults to false.
     * @returns True if the copy was successful, false otherwise.
     */
    copyRenderTarget(source: RenderTarget, dest?: RenderTarget, color?: boolean, depth?: boolean): boolean;
    /**
     * Marks the beginning of a block of rendering. Internally, this function
    binds the render target currently set on the device. This function should be matched
    with a call to {@link GraphicsDevice#updateEnd}. Calls to {@link GraphicsDevice#updateBegin}
    and {@link GraphicsDevice#updateEnd} must not be nested.
     */
    updateBegin(): void;
    /**
     * Marks the end of a block of rendering. This function should be called
    after a matching call to {@link GraphicsDevice#updateBegin}. Calls to {@link GraphicsDevice#updateBegin}
    and {@link GraphicsDevice#updateEnd} must not be nested.
     */
    updateEnd(): void;
    /**
     * Submits a graphical primitive to the hardware for immediate rendering.
     * @example
     * // Render a single, unindexed triangle
    device.draw({
        type: pc.PRIMITIVE_TRIANGLES,
        base: 0,
        count: 3,
        indexed: false
    });
     * @param primitive - Primitive object describing how to submit current vertex/index buffers defined as follows:
     * @param primitive.type - The type of primitive to render. Can be:
    * {@link PRIMITIVE_POINTS}
    * {@link PRIMITIVE_LINES}
    * {@link PRIMITIVE_LINELOOP}
    * {@link PRIMITIVE_LINESTRIP}
    * {@link PRIMITIVE_TRIANGLES}
    * {@link PRIMITIVE_TRISTRIP}
    * {@link PRIMITIVE_TRIFAN}
     * @param primitive.base - The offset of the first index or vertex to dispatch in the draw call.
     * @param primitive.count - The number of indices or vertices to dispatch in the draw call.
     * @param [primitive.indexed] - True to interpret the primitive as indexed, thereby using the currently set index buffer and false otherwise.
     * @param [numInstances = 1] - The number of instances to render when using ANGLE_instanced_arrays. Defaults to 1.
     * @param [keepBuffers] - Optionally keep the current set of vertex / index buffers / VAO. This is used when rendering of
    multiple views, for example under WebXR.
     */
    draw(primitive: {
        type: number;
        base: number;
        count: number;
        indexed?: boolean;
    }, numInstances?: number, keepBuffers?: boolean): void;
    /**
     * Clears the frame buffer of the currently set render target.
     * @example
     * // Clear color buffer to black and depth buffer to 1.0
    device.clear();
    
    // Clear just the color buffer to red
    device.clear({
        color: [1, 0, 0, 1],
        flags: pc.CLEARFLAG_COLOR
    });
    
    // Clear color buffer to yellow and depth to 1.0
    device.clear({
        color: [1, 1, 0, 1],
        depth: 1,
        flags: pc.CLEARFLAG_COLOR | pc.CLEARFLAG_DEPTH
    });
     * @param options - Optional options object that controls the behavior of the clear operation defined as follows:
     * @param options.color - The color to clear the color buffer to in the range 0.0 to 1.0 for each component.
     * @param options.depth - The depth value to clear the depth buffer to in the range 0.0 to 1.0.
     * @param options.flags - The buffers to clear (the types being color, depth and stencil). Can be any bitwise
    combination of:
    * {@link CLEARFLAG_COLOR}
    * {@link CLEARFLAG_DEPTH}
    * {@link CLEARFLAG_STENCIL}
     * @param options.stencil - The stencil value to clear the stencil buffer to. Defaults to 0.
     */
    clear(options: {
        color: number[];
        depth: number;
        flags: number;
        stencil: number;
    }): void;
    /**
     * Sets the specified render target on the device. If null
    is passed as a parameter, the back buffer becomes the current target
    for all rendering operations.
     * @example
     * // Set a render target to receive all rendering output
    device.setRenderTarget(renderTarget);
    
    // Set the back buffer to receive all rendering output
    device.setRenderTarget(null);
     * @param renderTarget - The render target to activate.
     */
    setRenderTarget(renderTarget: RenderTarget): void;
    /**
     * Queries the currently set render target on the device.
     * @example
     * // Get the current render target
    var renderTarget = device.getRenderTarget();
     * @returns The current render target.
     */
    getRenderTarget(): RenderTarget;
    /**
     * Queries whether depth testing is enabled.
     * @example
     * var depthTest = device.getDepthTest();
    console.log('Depth testing is ' + depthTest ? 'enabled' : 'disabled');
     * @returns True if depth testing is enabled and false otherwise.
     */
    getDepthTest(): boolean;
    /**
     * Enables or disables depth testing of fragments. Once this state
    is set, it persists until it is changed. By default, depth testing is enabled.
     * @example
     * device.setDepthTest(true);
     * @param depthTest - True to enable depth testing and false otherwise.
     */
    setDepthTest(depthTest: boolean): void;
    /**
     * Configures the depth test.
     * @param func - A function to compare a new depth value with an existing z-buffer value and decide if to write a pixel. Can be:
    * {@link FUNC_NEVER}: don't draw
    * {@link FUNC_LESS}: draw if new depth < depth buffer
    * {@link FUNC_EQUAL}: draw if new depth == depth buffer
    * {@link FUNC_LESSEQUAL}: draw if new depth <= depth buffer
    * {@link FUNC_GREATER}: draw if new depth > depth buffer
    * {@link FUNC_NOTEQUAL}: draw if new depth != depth buffer
    * {@link FUNC_GREATEREQUAL}: draw if new depth >= depth buffer
    * {@link FUNC_ALWAYS}: always draw
     */
    setDepthFunc(func: number): void;
    /**
     * Queries whether writes to the depth buffer are enabled.
     * @example
     * var depthWrite = device.getDepthWrite();
    console.log('Depth writing is ' + depthWrite ? 'enabled' : 'disabled');
     * @returns True if depth writing is enabled and false otherwise.
     */
    getDepthWrite(): boolean;
    /**
     * Enables or disables writes to the depth buffer. Once this state
    is set, it persists until it is changed. By default, depth writes are enabled.
     * @example
     * device.setDepthWrite(true);
     * @param writeDepth - True to enable depth writing and false otherwise.
     */
    setDepthWrite(writeDepth: boolean): void;
    /**
     * Enables or disables writes to the color buffer. Once this state
    is set, it persists until it is changed. By default, color writes are enabled
    for all color channels.
     * @example
     * // Just write alpha into the frame buffer
    device.setColorWrite(false, false, false, true);
     * @param writeRed - True to enable writing of the red channel and false otherwise.
     * @param writeGreen - True to enable writing of the green channel and false otherwise.
     * @param writeBlue - True to enable writing of the blue channel and false otherwise.
     * @param writeAlpha - True to enable writing of the alpha channel and false otherwise.
     */
    setColorWrite(writeRed: boolean, writeGreen: boolean, writeBlue: boolean, writeAlpha: boolean): void;
    /**
     * Queries whether blending is enabled.
     * @returns True if blending is enabled and false otherwise.
     */
    getBlending(): boolean;
    /**
     * Enables or disables blending.
     * @param blending - True to enable blending and false to disable it.
     */
    setBlending(blending: boolean): void;
    /**
     * Enables or disables stencil test.
     * @param enable - True to enable stencil test and false to disable it.
     */
    setStencilTest(enable: boolean): void;
    /**
     * Configures stencil test for both front and back faces.
     * @param func - A comparison function that decides if the pixel should be written, based on the current stencil buffer value,
    reference value, and mask value. Can be:
    * {@link FUNC_NEVER}: never pass
    * {@link FUNC_LESS}: pass if (ref & mask) < (stencil & mask)
    * {@link FUNC_EQUAL}: pass if (ref & mask) == (stencil & mask)
    * {@link FUNC_LESSEQUAL}: pass if (ref & mask) <= (stencil & mask)
    * {@link FUNC_GREATER}: pass if (ref & mask) > (stencil & mask)
    * {@link FUNC_NOTEQUAL}: pass if (ref & mask) != (stencil & mask)
    * {@link FUNC_GREATEREQUAL}: pass if (ref & mask) >= (stencil & mask)
    * {@link FUNC_ALWAYS}: always pass
     * @param ref - Reference value used in comparison.
     * @param mask - Mask applied to stencil buffer value and reference value before comparison.
     */
    setStencilFunc(func: number, ref: number, mask: number): void;
    /**
     * Configures stencil test for front faces.
     * @param func - A comparison function that decides if the pixel should be written,
    based on the current stencil buffer value, reference value, and mask value. Can be:
    * {@link FUNC_NEVER}: never pass
    * {@link FUNC_LESS}: pass if (ref & mask) < (stencil & mask)
    * {@link FUNC_EQUAL}: pass if (ref & mask) == (stencil & mask)
    * {@link FUNC_LESSEQUAL}: pass if (ref & mask) <= (stencil & mask)
    * {@link FUNC_GREATER}: pass if (ref & mask) > (stencil & mask)
    * {@link FUNC_NOTEQUAL}: pass if (ref & mask) != (stencil & mask)
    * {@link FUNC_GREATEREQUAL}: pass if (ref & mask) >= (stencil & mask)
    * {@link FUNC_ALWAYS}: always pass
     * @param ref - Reference value used in comparison.
     * @param mask - Mask applied to stencil buffer value and reference value before comparison.
     */
    setStencilFuncFront(func: number, ref: number, mask: number): void;
    /**
     * Configures stencil test for back faces.
     * @param func - A comparison function that decides if the pixel should be written,
    based on the current stencil buffer value, reference value, and mask value. Can be:
    * {@link FUNC_NEVER}: never pass
    * {@link FUNC_LESS}: pass if (ref & mask) < (stencil & mask)
    * {@link FUNC_EQUAL}: pass if (ref & mask) == (stencil & mask)
    * {@link FUNC_LESSEQUAL}: pass if (ref & mask) <= (stencil & mask)
    * {@link FUNC_GREATER}: pass if (ref & mask) > (stencil & mask)
    * {@link FUNC_NOTEQUAL}: pass if (ref & mask) != (stencil & mask)
    * {@link FUNC_GREATEREQUAL}: pass if (ref & mask) >= (stencil & mask)
    * {@link FUNC_ALWAYS}: always pass
     * @param ref - Reference value used in comparison.
     * @param mask - Mask applied to stencil buffer value and reference value before comparison.
     */
    setStencilFuncBack(func: number, ref: number, mask: number): void;
    /**
     * Configures how stencil buffer values should be modified based on the result
    of depth/stencil tests. Works for both front and back faces.
     * @param fail - Action to take if stencil test is failed.
     * @param zfail - Action to take if depth test is failed.
     * @param zpass - Action to take if both depth and stencil test are passed
    All arguments can be:
    * {@link STENCILOP_KEEP}: don't change the stencil buffer value
    * {@link STENCILOP_ZERO}: set value to zero
    * {@link STENCILOP_REPLACE}: replace value with the reference value (see {@link GraphicsDevice#setStencilFunc})
    * {@link STENCILOP_INCREMENT}: increment the value
    * {@link STENCILOP_INCREMENTWRAP}: increment the value, but wrap it to zero when it's larger than a maximum representable value
    * {@link STENCILOP_DECREMENT}: decrement the value
    * {@link STENCILOP_DECREMENTWRAP}: decrement the value, but wrap it to a maximum representable value, if the current value is 0
    * {@link STENCILOP_INVERT}: invert the value bitwise
     * @param writeMask - A bit mask applied to the reference value, when written.
     */
    setStencilOperation(fail: number, zfail: number, zpass: number, writeMask: number): void;
    /**
     * Configures how stencil buffer values should be modified based on the result
    of depth/stencil tests. Works for front faces.
     * @param fail - Action to take if stencil test is failed.
     * @param zfail - Action to take if depth test is failed.
     * @param zpass - Action to take if both depth and stencil test are passed
    All arguments can be:
    * {@link STENCILOP_KEEP}: don't change the stencil buffer value
    * {@link STENCILOP_ZERO}: set value to zero
    * {@link STENCILOP_REPLACE}: replace value with the reference value (see {@link GraphicsDevice#setStencilFunc})
    * {@link STENCILOP_INCREMENT}: increment the value
    * {@link STENCILOP_INCREMENTWRAP}: increment the value, but wrap it to zero when it's larger than a maximum representable value
    * {@link STENCILOP_DECREMENT}: decrement the value
    * {@link STENCILOP_DECREMENTWRAP}: decrement the value, but wrap it to a maximum representable value, if the current value is 0
    * {@link STENCILOP_INVERT}: invert the value bitwise
     * @param writeMask - A bit mask applied to the reference value, when written.
     */
    setStencilOperationFront(fail: number, zfail: number, zpass: number, writeMask: number): void;
    /**
     * Configures how stencil buffer values should be modified based on the result
    of depth/stencil tests. Works for back faces.
     * @param fail - Action to take if stencil test is failed.
     * @param zfail - Action to take if depth test is failed.
     * @param zpass - Action to take if both depth and stencil test are passed
    All arguments can be:
    * {@link STENCILOP_KEEP}: don't change the stencil buffer value
    * {@link STENCILOP_ZERO}: set value to zero
    * {@link STENCILOP_REPLACE}: replace value with the reference value (see {@link GraphicsDevice#setStencilFunc})
    * {@link STENCILOP_INCREMENT}: increment the value
    * {@link STENCILOP_INCREMENTWRAP}: increment the value, but wrap it to zero when it's larger than a maximum representable value
    * {@link STENCILOP_DECREMENT}: decrement the value
    * {@link STENCILOP_DECREMENTWRAP}: decrement the value, but wrap it to a maximum representable value, if the current value is 0
    * {@link STENCILOP_INVERT}: invert the value bitwise
     * @param writeMask - A bit mask applied to the reference value, when written.
     */
    setStencilOperationBack(fail: number, zfail: number, zpass: number, writeMask: number): void;
    /**
     * Configures blending operations. Both source and destination
    blend modes can take the following values:
    * {@link BLENDMODE_ZERO}
    * {@link BLENDMODE_ONE}
    * {@link BLENDMODE_SRC_COLOR}
    * {@link BLENDMODE_ONE_MINUS_SRC_COLOR}
    * {@link BLENDMODE_DST_COLOR}
    * {@link BLENDMODE_ONE_MINUS_DST_COLOR}
    * {@link BLENDMODE_SRC_ALPHA}
    * {@link BLENDMODE_SRC_ALPHA_SATURATE}
    * {@link BLENDMODE_ONE_MINUS_SRC_ALPHA}
    * {@link BLENDMODE_DST_ALPHA}
    * {@link BLENDMODE_ONE_MINUS_DST_ALPHA}
     * @param blendSrc - The source blend function.
     * @param blendDst - The destination blend function.
     */
    setBlendFunction(blendSrc: number, blendDst: number): void;
    /**
     * Configures blending operations. Both source and destination
    blend modes can take the following values:
    * {@link BLENDMODE_ZERO}
    * {@link BLENDMODE_ONE}
    * {@link BLENDMODE_SRC_COLOR}
    * {@link BLENDMODE_ONE_MINUS_SRC_COLOR}
    * {@link BLENDMODE_DST_COLOR}
    * {@link BLENDMODE_ONE_MINUS_DST_COLOR}
    * {@link BLENDMODE_SRC_ALPHA}
    * {@link BLENDMODE_SRC_ALPHA_SATURATE}
    * {@link BLENDMODE_ONE_MINUS_SRC_ALPHA}
    * {@link BLENDMODE_DST_ALPHA}
    * {@link BLENDMODE_ONE_MINUS_DST_ALPHA}
     * @param blendSrc - The source blend function.
     * @param blendDst - The destination blend function.
     * @param blendSrcAlpha - The separate source blend function for the alpha channel.
     * @param blendDstAlpha - The separate destination blend function for the alpha channel.
     */
    setBlendFunctionSeparate(blendSrc: number, blendDst: number, blendSrcAlpha: number, blendDstAlpha: number): void;
    /**
     * Configures the blending equation. The default blend equation is
    {@link BLENDEQUATION_ADD}.
     * @param blendEquation - The blend equation. Can be:
    * {@link BLENDEQUATION_ADD}
    * {@link BLENDEQUATION_SUBTRACT}
    * {@link BLENDEQUATION_REVERSE_SUBTRACT}
    * {@link BLENDEQUATION_MIN}
    * {@link BLENDEQUATION_MAX}
    
    Note that MIN and MAX modes require either EXT_blend_minmax or WebGL2 to work (check device.extBlendMinmax).
     */
    setBlendEquation(blendEquation: number): void;
    /**
     * Configures the blending equation. The default blend equation is
    {@link BLENDEQUATION_ADD}.
     * @param blendEquation - The blend equation. Can be:
    * {@link BLENDEQUATION_ADD}
    * {@link BLENDEQUATION_SUBTRACT}
    * {@link BLENDEQUATION_REVERSE_SUBTRACT}
    * {@link BLENDEQUATION_MIN}
    * {@link BLENDEQUATION_MAX}
    
    Note that MIN and MAX modes require either EXT_blend_minmax or WebGL2 to work (check device.extBlendMinmax).
     * @param blendAlphaEquation - A separate blend equation for the alpha channel. Accepts same values as blendEquation.
     */
    setBlendEquationSeparate(blendEquation: number, blendAlphaEquation: number): void;
    /**
     * Controls how triangles are culled based on their face direction.
    The default cull mode is {@link CULLFACE_BACK}.
     * @param cullMode - The cull mode to set. Can be:
    * {@link CULLFACE_NONE}
    * {@link CULLFACE_BACK}
    * {@link CULLFACE_FRONT}
    * {@link CULLFACE_FRONTANDBACK}
     */
    setCullMode(cullMode: number): void;
    /**
     * Sets the current index buffer on the graphics device. On subsequent
    calls to {@link GraphicsDevice#draw}, the specified index buffer will be used to provide
    index data for any indexed primitives.
     * @param indexBuffer - The index buffer to assign to the device.
     */
    setIndexBuffer(indexBuffer: IndexBuffer): void;
    /**
     * Sets the current vertex buffer on the graphics device. On subsequent calls to
    {@link GraphicsDevice#draw}, the specified vertex buffer(s) will be used to provide vertex data for any primitives.
     * @param vertexBuffer - The vertex buffer to assign to the device.
     */
    setVertexBuffer(vertexBuffer: VertexBuffer): void;
    /**
     * Sets the active shader to be used during subsequent draw calls.
     * @param shader - The shader to set to assign to the device.
     * @returns True if the shader was successfully set, false otherwise.
     */
    setShader(shader: Shader): boolean;
    /**
     * Sets the width and height of the canvas, then fires the 'resizecanvas' event.
    Note that the specified width and height values will be multiplied by the value of
    {@link GraphicsDevice#maxPixelRatio} to give the final resultant width and height for
    the canvas.
     * @param width - The new width of the canvas.
     * @param height - The new height of the canvas.
     */
    resizeCanvas(width: number, height: number): void;
    /**
     * Frees memory from all shaders ever allocated with this device.
     */
    clearShaderCache(): void;
    /**
     * Frees memory from all vertex array objects ever allocated with this device.
     */
    clearVertexArrayObjectCache(): void;
    /**
     * Width of the back buffer in pixels.
     */
    readonly width: number;
    /**
     * Height of the back buffer in pixels.
     */
    readonly height: number;
    /**
     * Fullscreen mode.
     */
    fullscreen: boolean;
    /**
     * Maximum pixel ratio.
     */
    maxPixelRatio: number;
    /**
     * Check if high precision floating-point textures are supported.
     */
    readonly textureFloatHighPrecision: boolean;
    /**
     * Check if texture with half float format can be updated with data.
     */
    readonly textureHalfFloatUpdatable: boolean;
    /**
     * The canvas DOM element that provides the underlying WebGL context used by the graphics device.
    */
    canvas: HTMLCanvasElement;
    /**
     * Determines if 32-bit floating-point textures can be used as frame buffer. [read only].
    */
    textureFloatRenderable: boolean;
    /**
     * Determines if 16-bit floating-point textures can be used as frame buffer. [read only].
    */
    textureHalfFloatRenderable: boolean;
    /**
     * The scope namespace for shader attributes and variables. [read only].
    */
    scope: ScopeSpace;
}

/**
 * Creates a new index buffer.
 * @example
 * // Create an index buffer holding 3 16-bit indices. The buffer is marked as
// static, hinting that the buffer will never be modified.
var indices = new UInt16Array([0, 1, 2]);
var indexBuffer = new pc.IndexBuffer(graphicsDevice,
                                     pc.INDEXFORMAT_UINT16,
                                     3,
                                     pc.BUFFER_STATIC,
                                     indices);
 * @param graphicsDevice - The graphics device used to
manage this index buffer.
 * @param format - The type of each index to be stored in the index
buffer. Can be:

* {@link INDEXFORMAT_UINT8}
* {@link INDEXFORMAT_UINT16}
* {@link INDEXFORMAT_UINT32}
 * @param numIndices - The number of indices to be stored in the index
buffer.
 * @param [usage] - The usage type of the vertex buffer. Can be:

* {@link BUFFER_DYNAMIC}
* {@link BUFFER_STATIC}
* {@link BUFFER_STREAM}

Defaults to {@link BUFFER_STATIC}.
 * @param [initialData] - Initial data. If left unspecified, the
index buffer will be initialized to zeros.
 */
export class IndexBuffer {
    constructor(graphicsDevice: GraphicsDevice, format: number, numIndices: number, usage?: number, initialData?: ArrayBuffer);
    /**
     * Frees resources associated with this index buffer.
     */
    destroy(): void;
    /**
     * Returns the data format of the specified index buffer.
     * @returns The data format of the specified index buffer. Can be:
    
    * {@link INDEXFORMAT_UINT8}
    * {@link INDEXFORMAT_UINT16}
    * {@link INDEXFORMAT_UINT32}
     */
    getFormat(): number;
    /**
     * Returns the number of indices stored in the specified index buffer.
     * @returns The number of indices stored in the specified index buffer.
     */
    getNumIndices(): number;
    /**
     * Gives access to the block of memory that stores the buffer's indices.
     * @returns A contiguous block of memory where index data can be written to.
     */
    lock(): ArrayBuffer;
    /**
     * Signals that the block of memory returned by a call to the lock function is
    ready to be given to the graphics hardware. Only unlocked index buffers can be set on the
    currently active device.
     */
    unlock(): void;
}

/**
 * Creates new PostEffect.
 * @property device - The graphics device of the application. [read only].
 * @property vertexBuffer - The vertex buffer for the fullscreen quad. Used when calling {@link drawFullscreenQuad}. [read only].
 * @property shader - The shader definition for the fullscreen quad. Needs to be set by the custom post effect (default is null). Used when calling {@link drawFullscreenQuad}.
 * @property needsDepthBuffer - The property that should to be set to `true` (by the custom post effect) if a depth map is necessary (default is false).
 * @param graphicsDevice - The graphics device of the application.
 */
export class PostEffect {
    constructor(graphicsDevice: GraphicsDevice);
    /**
     * Render the post effect using the specified inputTarget
    to the specified outputTarget.
     * @param inputTarget - The input render target.
     * @param outputTarget - The output render target. If null then this will be the screen.
     * @param rect - (Optional) The rect of the current camera. If not specified then it will default to [0,0,1,1].
     */
    render(inputTarget: RenderTarget, outputTarget: RenderTarget, rect: Vec4): void;
    /**
     * The graphics device of the application. [read only].
    */
    device: GraphicsDevice;
    /**
     * The vertex buffer for the fullscreen quad. Used when calling {@link drawFullscreenQuad}. [read only].
    */
    vertexBuffer: VertexBuffer;
    /**
     * The shader definition for the fullscreen quad. Needs to be set by the custom post effect (default is null). Used when calling {@link drawFullscreenQuad}.
    */
    shader: Shader | null;
    /**
     * The property that should to be set to `true` (by the custom post effect) if a depth map is necessary (default is false).
    */
    needsDepthBuffer: boolean;
}

/**
 * Draw a screen-space rectangle in a render target. Primarily meant to be used in custom post effects based on {@link PostEffect}.
 * @param device - The graphics device of the application.
 * @param target - The output render target.
 * @param vertexBuffer - The vertex buffer for the rectangle mesh. When calling from a custom post effect, pass the field {@link PostEffect#vertexBuffer}.
 * @param shader - The shader to be used for drawing the rectangle. When calling from a custom post effect, pass the field {@link PostEffect#shader}.
 * @param [rect] - The normalized screen-space position (rect.x, rect.y) and size (rect.z, rect.w) of the rectangle. Default is [0, 0, 1, 1].
 */
export function drawFullscreenQuad(device: GraphicsDevice, target: RenderTarget, vertexBuffer: VertexBuffer, shader: Shader, rect?: Vec4): void;

/**
 * Prefilter a cubemap for use by a {@link StandardMaterial} as an environment map. Should only be used for cubemaps that can't be prefiltered ahead of time (in the editor).
 * @param options - The options for how the cubemap is prefiltered.
 */
export function prefilterCubemap(options: any): void;

/**
 * Object containing all default shader chunks used by shader generators.
 */
export const shaderChunks: any;

/**
 * Creates a new render target. A color buffer or a depth buffer must be set.
 * @example
 * // Create a 512x512x24-bit render target with a depth buffer
var colorBuffer = new pc.Texture(graphicsDevice, {
    width: 512,
    height: 512,
    format: pc.PIXELFORMAT_R8_G8_B8
});
var renderTarget = new pc.RenderTarget({
    colorBuffer: colorBuffer,
    depth: true
});

// Set the render target on a layer
layer.renderTarget = renderTarget;
 * @param options - Object for passing optional arguments.
 * @param [options.colorBuffer] - The texture that this render target will treat as a rendering surface.
 * @param [options.depth] - If set to true, depth buffer will be created. Defaults to true. Ignored if depthBuffer is defined.
 * @param [options.stencil] - If set to true, depth buffer will include stencil. Defaults to false. Ignored if depthBuffer is defined or depth is false.
 * @param [options.depthBuffer] - The texture that this render target will treat as a depth/stencil surface (WebGL2 only). If set, the 'depth' and 'stencil' properties are ignored.
Texture must have {@link PIXELFORMAT_DEPTH} or PIXELFORMAT_DEPTHSTENCIL format.
 * @param [options.samples] - Number of hardware anti-aliasing samples (WebGL2 only). Default is 1.
 * @param [options.autoResolve] - If samples > 1, enables or disables automatic MSAA resolve after rendering to this RT (see {@link RenderTarget#resolve}). Defaults to true;
Defaults to true.
 * @param [options.face] - If the colorBuffer parameter is a cubemap, use this option to specify the
face of the cubemap to render to. Can be:
 * @param [options.name] - The name of the render target.

* {@link CUBEFACE_POSX}
* {@link CUBEFACE_NEGX}
* {@link CUBEFACE_POSY}
* {@link CUBEFACE_NEGY}
* {@link CUBEFACE_POSZ}
* {@link CUBEFACE_NEGZ}

Defaults to {@link CUBEFACE_POSX}.
 */
export class RenderTarget {
    constructor(options: {
        colorBuffer?: Texture;
        depth?: boolean;
        stencil?: boolean;
        depthBuffer?: Texture;
        samples?: number;
        autoResolve?: boolean;
        face?: number;
        name?: string;
    });
    /**
     * Frees resources associated with this render target.
     */
    destroy(): void;
    /**
     * If samples > 1, resolves the anti-aliased render target (WebGL2 only).
    When you're rendering to an anti-aliased render target, pixels aren't written directly to the readable texture.
    Instead, they're first written to a MSAA buffer, where each sample for each pixel is stored independently.
    In order to read the results, you first need to 'resolve' the buffer - to average all samples and create a simple texture with one color per pixel.
    This function performs this averaging and updates the colorBuffer and the depthBuffer.
    If autoResolve is set to true, the resolve will happen after every rendering to this render target, otherwise you can do it manually,
    during the app update or inside a {@link Command}.
     * @param [color] - Resolve color buffer. Defaults to true.
     * @param [depth] - Resolve depth buffer. Defaults to true if the render target has a depth buffer.
     */
    resolve(color?: boolean, depth?: boolean): void;
    /**
     * Copies color and/or depth contents of source render target to this one. Formats, sizes and anti-aliasing samples must match.
    Depth buffer can only be copied on WebGL 2.0.
     * @param source - Source render target to copy from.
     * @param [color] - If true will copy the color buffer. Defaults to false.
     * @param [depth] - If true will copy the depth buffer. Defaults to false.
     * @returns True if the copy was successful, false otherwise.
     */
    copy(source: RenderTarget, color?: boolean, depth?: boolean): boolean;
    /**
     * Color buffer set up on the render target.
     */
    readonly colorBuffer: Texture;
    /**
     * Depth buffer set up on the render target. Only available, if depthBuffer was set in constructor.
    Not available, if depth property was used instead.
     */
    readonly depthBuffer: Texture;
    /**
     * If the render target is bound to a cubemap, this property
    specifies which face of the cubemap is rendered to. Can be:
    
    * {@link CUBEFACE_POSX}
    * {@link CUBEFACE_NEGX}
    * {@link CUBEFACE_POSY}
    * {@link CUBEFACE_NEGY}
    * {@link CUBEFACE_POSZ}
    * {@link CUBEFACE_NEGZ}
     */
    readonly face: number;
    /**
     * Width of the render target in pixels.
     */
    readonly width: number;
    /**
     * Height of the render target in pixels.
     */
    readonly height: number;
}

/**
 * This function reprojects textures between cubemap, equirectangular and octahedral formats. The
function can read and write textures with pixel data in RGBE, RGBM, linear and sRGB formats. When
specularPower is specified it will perform a phong-weighted convolution of the source (for generating
a gloss maps).
 * @param device - The graphics device
 * @param source - The source texture
 * @param target - The target texture
 * @param [specularPower] - optional specular power. When specular power is specified,
the source is convolved by a phong-weighted kernel raised to the specified power. Otherwise
the function performs a standard resample.
 * @param [numSamples] - optional number of samples (default is 1024).
 */
export function reprojectTexture(device: GraphicsDevice, source: Texture, target: Texture, specularPower?: number, numSamples?: number): void;

/**
 * The scope for a variable.
 * @property name - The variable name.
 * @param name - The variable name.
 */
export class ScopeId {
    constructor(name: string);
    /**
     * Set variable value.
     * @param value - The value.
     */
    setValue(value: any): void;
    /**
     * Get variable value.
     * @returns The value.
     */
    getValue(): any;
    /**
     * The variable name.
    */
    name: string;
}

/**
 * The scope for variables.
 * @property name - The scope name.
 * @param name - The scope name.
 */
export class ScopeSpace {
    constructor(name: string);
    /**
     * Get (or create, if it doesn't already exist) a variable in the scope.
     * @param name - The variable name.
     * @returns The variable instance.
     */
    resolve(name: string): ScopeId;
    /**
     * The scope name.
    */
    name: string;
}

/**
 * Creates a new shader object.
 * @example
 * // Create a shader that renders primitives with a solid red color
var shaderDefinition = {
    attributes: {
        aPosition: pc.SEMANTIC_POSITION
    },
    vshader: [
        "attribute vec3 aPosition;",
        "",
        "void main(void)",
        "{",
        "    gl_Position = vec4(aPosition, 1.0);",
        "}"
    ].join("\n"),
    fshader: [
        "precision " + graphicsDevice.precision + " float;",
        "",
        "void main(void)",
        "{",
        "    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);",
        "}"
    ].join("\n")
};

var shader = new pc.Shader(graphicsDevice, shaderDefinition);
 * @param graphicsDevice - The graphics device used to manage this shader.
 * @param definition - The shader definition from which to build the shader.
 * @param definition.attributes - Object detailing the mapping of vertex shader attribute names
to semantics SEMANTIC_*. This enables the engine to match vertex buffer data as inputs to the
shader.
 * @param definition.vshader - Vertex shader source (GLSL code).
 * @param definition.fshader - Fragment shader source (GLSL code).
 * @param [definition.useTransformFeedback] - Specifies that this shader outputs post-VS data to a buffer.
 */
export class Shader {
    constructor(graphicsDevice: GraphicsDevice, definition: {
        attributes: any;
        vshader: string;
        fshader: string;
        useTransformFeedback?: boolean;
    });
    /**
     * Frees resources associated with this shader.
     */
    destroy(): void;
}

/**
 * Draws a screen-space quad using a specific shader. Mostly used by post-effects.
 * @param device - The graphics device used to draw the quad.
 * @param target - The destination render target. If undefined, target is the frame buffer.
 * @param shader - The shader used for rendering the quad. Vertex shader should contain `attribute vec2 vertex_position`.
 * @param [rect] - The viewport rectangle of the quad, in pixels. Defaults to fullscreen (`0, 0, target.width, target.height`).
 * @param [scissorRect] - The scissor rectangle of the quad, in pixels. Defaults to fullscreen (`0, 0, target.width, target.height`).
 * @param [useBlend] - True to enable blending. Defaults to false, disabling blending.
 */
export function drawQuadWithShader(device: GraphicsDevice, target: RenderTarget | undefined, shader: Shader, rect?: Vec4, scissorRect?: Vec4, useBlend?: boolean): void;

/**
 * Draws a texture in screen-space. Mostly used by post-effects.
 * @param device - The graphics device used to draw the texture.
 * @param texture - The source texture to be drawn. Accessible as `uniform sampler2D source` in shader.
 * @param [target] - The destination render target. Defaults to the frame buffer.
 * @param [shader] - The shader used for rendering the texture. Defaults to {@link GraphicsDevice#getCopyShader}.
 * @param [rect] - The viewport rectangle to use for the texture, in pixels. Defaults to fullscreen (`0, 0, target.width, target.height`).
 * @param [scissorRect] - The scissor rectangle to use for the texture, in pixels. Defaults to fullscreen (`0, 0, target.width, target.height`).
 * @param [useBlend] - True to enable blending. Defaults to false, disabling blending.
 */
export function drawTexture(device: GraphicsDevice, texture: Texture, target?: RenderTarget, shader?: Shader, rect?: Vec4, scissorRect?: Vec4, useBlend?: boolean): void;

/**
 * Creates a new texture.
 * @example
 * // Create a 8x8x24-bit texture
var texture = new pc.Texture(graphicsDevice, {
    width: 8,
    height: 8,
    format: pc.PIXELFORMAT_R8_G8_B8
});

// Fill the texture with a gradient
var pixels = texture.lock();
var count = 0;
for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
        pixels[count++] = i * 32;
        pixels[count++] = j * 32;
        pixels[count++] = 255;
    }
}
texture.unlock();
 * @property name - The name of the texture. Defaults to null.
 * @param graphicsDevice - The graphics device used to manage this texture.
 * @param [options] - Object for passing optional arguments.
 * @param [options.name] - The name of the texture.
 * @param [options.width] - The width of the texture in pixels. Defaults to 4.
 * @param [options.height] - The height of the texture in pixels. Defaults to 4.
 * @param [options.depth] - The number of depth slices in a 3D texture (WebGL2 only). Defaults to 1 (single 2D image).
 * @param [options.format] - The pixel format of the texture. Can be:
* {@link PIXELFORMAT_A8}
* {@link PIXELFORMAT_L8}
* {@link PIXELFORMAT_L8_A8}
* {@link PIXELFORMAT_R5_G6_B5}
* {@link PIXELFORMAT_R5_G5_B5_A1}
* {@link PIXELFORMAT_R4_G4_B4_A4}
* {@link PIXELFORMAT_R8_G8_B8}
* {@link PIXELFORMAT_R8_G8_B8_A8}
* {@link PIXELFORMAT_DXT1}
* {@link PIXELFORMAT_DXT3}
* {@link PIXELFORMAT_DXT5}
* {@link PIXELFORMAT_RGB16F}
* {@link PIXELFORMAT_RGBA16F}
* {@link PIXELFORMAT_RGB32F}
* {@link PIXELFORMAT_RGBA32F}
* {@link PIXELFORMAT_ETC1}
* {@link PIXELFORMAT_PVRTC_2BPP_RGB_1}
* {@link PIXELFORMAT_PVRTC_2BPP_RGBA_1}
* {@link PIXELFORMAT_PVRTC_4BPP_RGB_1}
* {@link PIXELFORMAT_PVRTC_4BPP_RGBA_1}
* {@link PIXELFORMAT_111110F}
* {@link PIXELFORMAT_ASTC_4x4}>/li>
* {@link PIXELFORMAT_ATC_RGB}
* {@link PIXELFORMAT_ATC_RGBA}
Defaults to {@link PIXELFORMAT_R8_G8_B8_A8}.
 * @param [options.projection] - The projection type of the texture, used when the texture represents an environment. Can be:
* {@link TEXTUREPROJECTION_NONE}
* {@link TEXTUREPROJECTION_CUBE}
* {@link TEXTUREPROJECTION_EQUIRECT}
* {@link TEXTUREPROJECTION_OCTAHEDRAL}
Defaults to {@link TEXTUREPROJECTION_CUBE} if options.cubemap is specified, otherwise {@link TEXTUREPROJECTION_NONE}.
 * @param [options.minFilter] - The minification filter type to use. Defaults to {@link FILTER_LINEAR_MIPMAP_LINEAR}
 * @param [options.magFilter] - The magnification filter type to use. Defaults to {@link FILTER_LINEAR}
 * @param [options.anisotropy] - The level of anisotropic filtering to use. Defaults to 1
 * @param [options.addressU] - The repeat mode to use in the U direction. Defaults to {@link ADDRESS_REPEAT}
 * @param [options.addressV] - The repeat mode to use in the V direction. Defaults to {@link ADDRESS_REPEAT}
 * @param [options.addressW] - The repeat mode to use in the W direction. Defaults to {@link ADDRESS_REPEAT}
 * @param [options.mipmaps] - When enabled try to generate or use mipmaps for this texture. Default is true
 * @param [options.cubemap] - Specifies whether the texture is to be a cubemap. Defaults to false.
 * @param [options.volume] - Specifies whether the texture is to be a 3D volume (WebGL2 only). Defaults to false.
 * @param [options.type] - Specifies the image type, see {@link TEXTURETYPE_DEFAULT}
 * @param [options.fixCubemapSeams] - Specifies whether this cubemap texture requires special
seam fixing shader code to look right. Defaults to false.
 * @param [options.flipY] - Specifies whether the texture should be flipped in the Y-direction. Only affects textures
with a source that is an image, canvas or video element. Does not affect cubemaps, compressed textures or textures set from raw
pixel data. Defaults to true.
 * @param [options.premultiplyAlpha] - If true, the alpha channel of the texture (if present) is multiplied into the color
channels. Defaults to false.
 * @param [options.compareOnRead] - When enabled, and if texture format is {@link PIXELFORMAT_DEPTH} or {@link PIXELFORMAT_DEPTHSTENCIL},
hardware PCF is enabled for this texture, and you can get filtered results of comparison using texture() in your shader (WebGL2 only).
Defaults to false.
 * @param [options.compareFunc] - Comparison function when compareOnRead is enabled (WebGL2 only). Defaults to {@link FUNC_LESS}.
Possible values:
* {@link FUNC_LESS}
* {@link FUNC_LESSEQUAL}
* {@link FUNC_GREATER}
* {@link FUNC_GREATEREQUAL}
* {@link FUNC_EQUAL}
* {@link FUNC_NOTEQUAL}
 */
export class Texture {
    constructor(graphicsDevice: GraphicsDevice, options?: {
        name?: string;
        width?: number;
        height?: number;
        depth?: number;
        format?: number;
        projection?: string;
        minFilter?: number;
        magFilter?: number;
        anisotropy?: number;
        addressU?: number;
        addressV?: number;
        addressW?: number;
        mipmaps?: boolean;
        cubemap?: boolean;
        volume?: boolean;
        type?: string;
        fixCubemapSeams?: boolean;
        flipY?: boolean;
        premultiplyAlpha?: boolean;
        compareOnRead?: boolean;
        compareFunc?: number;
    });
    /**
     * The minification filter to be applied to the texture. Can be:
    * {@link FILTER_NEAREST}
    * {@link FILTER_LINEAR}
    * {@link FILTER_NEAREST_MIPMAP_NEAREST}
    * {@link FILTER_NEAREST_MIPMAP_LINEAR}
    * {@link FILTER_LINEAR_MIPMAP_NEAREST}
    * {@link FILTER_LINEAR_MIPMAP_LINEAR}
     */
    minFilter: number;
    /**
     * The magnification filter to be applied to the texture. Can be:
    * {@link FILTER_NEAREST}
    * {@link FILTER_LINEAR}
     */
    magFilter: number;
    /**
     * The addressing mode to be applied to the texture horizontally. Can be:
    * {@link ADDRESS_REPEAT}
    * {@link ADDRESS_CLAMP_TO_EDGE}
    * {@link ADDRESS_MIRRORED_REPEAT}
     */
    addressU: number;
    /**
     * The addressing mode to be applied to the texture vertically. Can be:
    * {@link ADDRESS_REPEAT}
    * {@link ADDRESS_CLAMP_TO_EDGE}
    * {@link ADDRESS_MIRRORED_REPEAT}
     */
    addressV: number;
    /**
     * The addressing mode to be applied to the 3D texture depth (WebGL2 only). Can be:
    * {@link ADDRESS_REPEAT}
    * {@link ADDRESS_CLAMP_TO_EDGE}
    * {@link ADDRESS_MIRRORED_REPEAT}
     */
    addressW: number;
    /**
     * When enabled, and if texture format is {@link PIXELFORMAT_DEPTH} or {@link PIXELFORMAT_DEPTHSTENCIL},
    hardware PCF is enabled for this texture, and you can get filtered results of comparison using texture() in your shader (WebGL2 only).
     */
    compareOnRead: boolean;
    /**
     * Comparison function when compareOnRead is enabled (WebGL2 only).
    Possible values:
    * {@link FUNC_LESS}
    * {@link FUNC_LESSEQUAL}
    * {@link FUNC_GREATER}
    * {@link FUNC_GREATEREQUAL}
    * {@link FUNC_EQUAL}
    * {@link FUNC_NOTEQUAL}
     */
    compareFunc: number;
    /**
     * Integer value specifying the level of anisotropic to apply to the texture
    ranging from 1 (no anisotropic filtering) to the {@link GraphicsDevice} property maxAnisotropy.
     */
    anisotropy: number;
    /**
     * Defines if texture should generate/upload mipmaps if possible.
     */
    mipmaps: boolean;
    /**
     * The width of the texture in pixels.
     */
    readonly width: number;
    /**
     * The height of the texture in pixels.
     */
    readonly height: number;
    /**
     * The number of depth slices in a 3D texture (WebGL2 only).
     */
    readonly depth: number;
    /**
     * The pixel format of the texture. Can be:
    * {@link PIXELFORMAT_A8}
    * {@link PIXELFORMAT_L8}
    * {@link PIXELFORMAT_L8_A8}
    * {@link PIXELFORMAT_R5_G6_B5}
    * {@link PIXELFORMAT_R5_G5_B5_A1}
    * {@link PIXELFORMAT_R4_G4_B4_A4}
    * {@link PIXELFORMAT_R8_G8_B8}
    * {@link PIXELFORMAT_R8_G8_B8_A8}
    * {@link PIXELFORMAT_DXT1}
    * {@link PIXELFORMAT_DXT3}
    * {@link PIXELFORMAT_DXT5}
    * {@link PIXELFORMAT_RGB16F}
    * {@link PIXELFORMAT_RGBA16F}
    * {@link PIXELFORMAT_RGB32F}
    * {@link PIXELFORMAT_RGBA32F}
    * {@link PIXELFORMAT_ETC1}
    * {@link PIXELFORMAT_PVRTC_2BPP_RGB_1}
    * {@link PIXELFORMAT_PVRTC_2BPP_RGBA_1}
    * {@link PIXELFORMAT_PVRTC_4BPP_RGB_1}
    * {@link PIXELFORMAT_PVRTC_4BPP_RGBA_1}
    * {@link PIXELFORMAT_111110F}
    * {@link PIXELFORMAT_ASTC_4x4}>/li>
    * {@link PIXELFORMAT_ATC_RGB}
    * {@link PIXELFORMAT_ATC_RGBA}
     */
    readonly format: number;
    /**
     * Returns true if this texture is a cube map and false otherwise.
     */
    readonly cubemap: boolean;
    /**
     * Returns true if this texture is a 3D volume and false otherwise.
     */
    readonly volume: boolean;
    /**
     * Specifies whether the texture should be flipped in the Y-direction. Only affects textures
    with a source that is an image, canvas or video element. Does not affect cubemaps, compressed textures
    or textures set from raw pixel data. Defaults to true.
     */
    flipY: boolean;
    /**
     * Returns true if all dimensions of the texture are power of two, and false otherwise.
     */
    readonly pot: boolean;
    /**
     * Forcibly free up the underlying WebGL resource owned by the texture.
     */
    destroy(): void;
    /**
     * Locks a miplevel of the texture, returning a typed array to be filled with pixel data.
     * @param [options] - Optional options object. Valid properties are as follows:
     * @param [options.level] - The mip level to lock with 0 being the top level. Defaults to 0.
     * @param [options.face] - If the texture is a cubemap, this is the index of the face to lock.
     * @param [options.mode] - The lock mode. Can be:
    * {@link TEXTURELOCK_READ}
    * {@link TEXTURELOCK_WRITE}
    Defaults to {@link TEXTURELOCK_WRITE}.
     * @returns A typed array containing the pixel data of the locked mip level.
     */
    lock(options?: {
        level?: number;
        face?: number;
        mode?: number;
    }): Uint8Array | Uint16Array | Float32Array;
    /**
     * Set the pixel data of the texture from a canvas, image, video DOM element. If the
    texture is a cubemap, the supplied source must be an array of 6 canvases, images or videos.
     * @param source - A canvas, image or video element,
    or an array of 6 canvas, image or video elements.
     * @param [mipLevel] - A non-negative integer specifying the image level of detail. Defaults to 0, which represents the base image source.
    A level value of N, that is greater than 0, represents the image source for the Nth mipmap reduction level.
     */
    setSource(source: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | HTMLCanvasElement[] | HTMLImageElement[] | HTMLVideoElement[], mipLevel?: number): void;
    /**
     * Get the pixel data of the texture. If this is a cubemap then an array of 6 images will be returned otherwise
    a single image.
     * @param [mipLevel] - A non-negative integer specifying the image level of detail. Defaults to 0, which represents the base image source.
    A level value of N, that is greater than 0, represents the image source for the Nth mipmap reduction level.
     * @returns The source image of this texture. Can be null if source not assigned for specific image level.
     */
    getSource(mipLevel?: number): HTMLImageElement;
    /**
     * Unlocks the currently locked mip level and uploads it to VRAM.
     */
    unlock(): void;
    /**
     * Forces a reupload of the textures pixel data to graphics memory. Ordinarily, this function
    is called by internally by {@link Texture#setSource} and {@link Texture#unlock}. However, it still needs to
    be called explicitly in the case where an HTMLVideoElement is set as the source of the texture.  Normally,
    this is done once every frame before video textured geometry is rendered.
     */
    upload(): void;
    /**
     * The name of the texture. Defaults to null.
    */
    name: string;
}

/**
 * This object allows you to configure and use the transform feedback feature (WebGL2
only). How to use:

1. First, check that you're on WebGL2, by looking at the `app.graphicsDevice.webgl2`` value.
2. Define the outputs in your vertex shader. The syntax is `out vec3 out_vertex_position`,
note that there must be out_ in the name. You can then simply assign values to these outputs
in VS. The order and size of shader outputs must match the output buffer layout.
3. Create the shader using `TransformFeedback.createShader(device, vsCode, yourShaderName)`.
4. Create/acquire the input vertex buffer. Can be any VertexBuffer, either manually created,
or from a Mesh.
5. Create the TransformFeedback object: `var tf = new TransformFeedback(inputBuffer)`.
This object will internally create an output buffer.
6. Run the shader: `tf.process(shader)`. Shader will take the input buffer, process it and
write to the output buffer, then the input/output buffers will be automatically swapped, so
you'll immediately see the result.
 * @example
 * // *** shader asset ***
attribute vec3 vertex_position;
attribute vec3 vertex_normal;
attribute vec2 vertex_texCoord0;
out vec3 out_vertex_position;
out vec3 out_vertex_normal;
out vec2 out_vertex_texCoord0;
void main(void) {
    // read position and normal, write new position (push away)
    out_vertex_position = vertex_position + vertex_normal * 0.01;
    // pass other attributes unchanged
    out_vertex_normal = vertex_normal;
    out_vertex_texCoord0 = vertex_texCoord0;
}
 * @example
 * // *** script asset ***
var TransformExample = pc.createScript('transformExample');

// attribute that references shader asset and material
TransformExample.attributes.add('shaderCode', { type: 'asset', assetType: 'shader' });
TransformExample.attributes.add('material', { type: 'asset', assetType: 'material' });

TransformExample.prototype.initialize = function() {
    var device = this.app.graphicsDevice;
    var mesh = pc.createTorus(device, { tubeRadius: 0.01, ringRadius: 3 });
    var node = new pc.GraphNode();
    var meshInstance = new pc.MeshInstance(mesh, this.material.resource, node);
    var model = new pc.Model();
    model.graph = node;
    model.meshInstances = [ meshInstance ];
    this.app.scene.addModel(model);

    // if webgl2 is not supported, TF is not available
    if (!device.webgl2) return;
    var inputBuffer = mesh.vertexBuffer;
    this.tf = new pc.TransformFeedback(inputBuffer);
    this.shader = pc.TransformFeedback.createShader(device, this.shaderCode.resource, "tfMoveUp");
};

TransformExample.prototype.update = function(dt) {
    if (!this.app.graphicsDevice.webgl2) return;
    this.tf.process(this.shader);
};
 * @param inputBuffer - The input vertex buffer.
 * @param [usage] - The optional usage type of the output vertex buffer. Can be:

* {@link BUFFER_STATIC}
* {@link BUFFER_DYNAMIC}
* {@link BUFFER_STREAM}
* {@link BUFFER_GPUDYNAMIC}

Defaults to {@link BUFFER_GPUDYNAMIC} (which is recommended for continuous update).
 */
export class TransformFeedback {
    constructor(inputBuffer: VertexBuffer, usage?: number);
    /**
     * Creates a transform feedback ready vertex shader from code.
     * @param graphicsDevice - The graphics device used by the renderer.
     * @param vsCode - Vertex shader code. Should contain output variables starting with "out_".
     * @param name - Unique name for caching the shader.
     * @returns A shader to use in the process() function.
     */
    static createShader(graphicsDevice: GraphicsDevice, vsCode: string, name: string): Shader;
    /**
     * Destroys the transform feedback helper object.
     */
    destroy(): void;
    /**
     * Runs the specified shader on the input buffer, writes results into the new buffer, then optionally swaps input/output.
     * @param shader - A vertex shader to run. Should be created with {@link TransformFeedback.createShader}.
     * @param [swap] - Swap input/output buffer data. Useful for continuous buffer processing. Default is true.
     */
    process(shader: Shader, swap?: boolean): void;
    /**
     * The current input buffer.
     */
    readonly inputBuffer: VertexBuffer;
    /**
     * The current output buffer.
     */
    readonly outputBuffer: VertexBuffer;
}

/**
 * Creates a new vertex buffer object.
 * @param graphicsDevice - The graphics device used to manage this vertex buffer.
 * @param format - The vertex format of this vertex buffer.
 * @param numVertices - The number of vertices that this vertex buffer will hold.
 * @param [usage] - The usage type of the vertex buffer (see BUFFER_*).
 * @param [initialData] - Initial data.
 */
export class VertexBuffer {
    constructor(graphicsDevice: GraphicsDevice, format: VertexFormat, numVertices: number, usage?: number, initialData?: ArrayBuffer);
    /**
     * Frees resources associated with this vertex buffer.
     */
    destroy(): void;
    /**
     * Returns the data format of the specified vertex buffer.
     * @returns The data format of the specified vertex buffer.
     */
    getFormat(): VertexFormat;
    /**
     * Returns the usage type of the specified vertex buffer. This indicates
    whether the buffer can be modified once and used many times {@link BUFFER_STATIC},
    modified repeatedly and used many times {@link BUFFER_DYNAMIC} or modified once
    and used at most a few times {@link BUFFER_STREAM}.
     * @returns The usage type of the vertex buffer (see BUFFER_*).
     */
    getUsage(): number;
    /**
     * Returns the number of vertices stored in the specified vertex buffer.
     * @returns The number of vertices stored in the vertex buffer.
     */
    getNumVertices(): number;
    /**
     * Returns a mapped memory block representing the content of the vertex buffer.
     * @returns An array containing the byte data stored in the vertex buffer.
     */
    lock(): ArrayBuffer;
    /**
     * Notifies the graphics engine that the client side copy of the vertex buffer's
    memory can be returned to the control of the graphics driver.
     */
    unlock(): void;
    /**
     * Copies data into vertex buffer's memory.
     * @param [data] - Source data to copy.
     * @returns True if function finished successfuly, false otherwise.
     */
    setData(data?: ArrayBuffer): boolean;
}

/**
 * Returns a new VertexFormat object.
 * @example
 * // Specify 3-component positions (x, y, z)
var vertexFormat = new pc.VertexFormat(graphicsDevice, [
    { semantic: pc.SEMANTIC_POSITION, components: 3, type: pc.TYPE_FLOAT32 }
]);
 * @example
 * // Specify 2-component positions (x, y), a texture coordinate (u, v) and a vertex color (r, g, b, a)
var vertexFormat = new pc.VertexFormat(graphicsDevice, [
    { semantic: pc.SEMANTIC_POSITION, components: 2, type: pc.TYPE_FLOAT32 },
    { semantic: pc.SEMANTIC_TEXCOORD0, components: 2, type: pc.TYPE_FLOAT32 },
    { semantic: pc.SEMANTIC_COLOR, components: 4, type: pc.TYPE_UINT8, normalize: true }
]);
 * @property elements - The vertex attribute elements.
 * @property elements[].name - The meaning of the vertex element. This is used to link
the vertex data to a shader input. Can be:

* {@link SEMANTIC_POSITION}
* {@link SEMANTIC_NORMAL}
* {@link SEMANTIC_TANGENT}
* {@link SEMANTIC_BLENDWEIGHT}
* {@link SEMANTIC_BLENDINDICES}
* {@link SEMANTIC_COLOR}
* {@link SEMANTIC_TEXCOORD0}
* {@link SEMANTIC_TEXCOORD1}
* {@link SEMANTIC_TEXCOORD2}
* {@link SEMANTIC_TEXCOORD3}
* {@link SEMANTIC_TEXCOORD4}
* {@link SEMANTIC_TEXCOORD5}
* {@link SEMANTIC_TEXCOORD6}
* {@link SEMANTIC_TEXCOORD7}

If vertex data has a meaning other that one of those listed above, use the user-defined
semantics: {@link SEMANTIC_ATTR0} to {@link SEMANTIC_ATTR15}.
 * @property elements[].numComponents - The number of components of the vertex attribute.
Can be 1, 2, 3 or 4.
 * @property elements[].dataType - The data type of the attribute. Can be:

* {@link TYPE_INT8}
* {@link TYPE_UINT8}
* {@link TYPE_INT16}
* {@link TYPE_UINT16}
* {@link TYPE_INT32}
* {@link TYPE_UINT32}
* {@link TYPE_FLOAT32}
 * @property elements[].normalize - If true, vertex attribute data will be mapped from a
0 to 255 range down to 0 to 1 when fed to a shader. If false, vertex attribute data is left
unchanged. If this property is unspecified, false is assumed.
 * @property elements[].offset - The number of initial bytes at the start of a vertex that are not relevant to this attribute.
 * @property elements[].stride - The number of total bytes that are between the start of one vertex, and the start of the next.
 * @property elements[].size - The size of the attribute in bytes.
 * @param graphicsDevice - The graphics device used to manage this vertex format.
 * @param description - An array of vertex attribute descriptions.
 * @param description[].semantic - The meaning of the vertex element. This is used to link
the vertex data to a shader input. Can be:

* {@link SEMANTIC_POSITION}
* {@link SEMANTIC_NORMAL}
* {@link SEMANTIC_TANGENT}
* {@link SEMANTIC_BLENDWEIGHT}
* {@link SEMANTIC_BLENDINDICES}
* {@link SEMANTIC_COLOR}
* {@link SEMANTIC_TEXCOORD0}
* {@link SEMANTIC_TEXCOORD1}
* {@link SEMANTIC_TEXCOORD2}
* {@link SEMANTIC_TEXCOORD3}
* {@link SEMANTIC_TEXCOORD4}
* {@link SEMANTIC_TEXCOORD5}
* {@link SEMANTIC_TEXCOORD6}
* {@link SEMANTIC_TEXCOORD7}

If vertex data has a meaning other that one of those listed above, use the user-defined
semantics: {@link SEMANTIC_ATTR0} to {@link SEMANTIC_ATTR15}.
 * @param description[].components - The number of components of the vertex attribute.
Can be 1, 2, 3 or 4.
 * @param description[].type - The data type of the attribute. Can be:

* {@link TYPE_INT8}
* {@link TYPE_UINT8}
* {@link TYPE_INT16}
* {@link TYPE_UINT16}
* {@link TYPE_INT32}
* {@link TYPE_UINT32}
* {@link TYPE_FLOAT32}
 * @param [description[].normalize] - If true, vertex attribute data will be mapped from a
0 to 255 range down to 0 to 1 when fed to a shader. If false, vertex attribute data is left
unchanged. If this property is unspecified, false is assumed.
 * @param [vertexCount] - When specified, vertex format will be set up for non-interleaved format with a specified
number of vertices. (example: PPPPNNNNCCCC), where arrays of individual attributes will be stored one right after the other (subject to alignment requirements).
Note that in this case, the format depends on the number of vertices, and needs to change when the number of vertices changes.
When not specified, vertex format will be interleaved. (example: PNCPNCPNCPNC)
 */
export class VertexFormat {
    constructor(graphicsDevice: GraphicsDevice, description: {
        semantic: string;
        components: number;
        type: number;
        normalize?: boolean;
    }[], vertexCount?: number);
    /**
     * Returns {@link VertexFormat} used to store matrices of type {@link Mat4} for hardware instancing.
     */
    static readonly defaultInstancingFormat: VertexFormat;
    /**
     * Applies any changes made to the VertexFormat's properties.
     */
    update(): void;
    /**
     * The vertex attribute elements.
    */
    elements: {
        name: string;
        numComponents: number;
        dataType: number;
        normalize: boolean;
        offset: number;
        stride: number;
        size: number;
    }[];
}

/**
 * Returns a new VertexIteratorAccessor object.
 * @param buffer - The vertex buffer containing the attribute to be accessed.
 * @param vertexElement - The vertex attribute to be accessed.
 * @param vertexElement.name - The meaning of the vertex element. This is used to link
the vertex data to a shader input. Can be:

* {@link SEMANTIC_POSITION}
* {@link SEMANTIC_NORMAL}
* {@link SEMANTIC_TANGENT}
* {@link SEMANTIC_BLENDWEIGHT}
* {@link SEMANTIC_BLENDINDICES}
* {@link SEMANTIC_COLOR}
* {@link SEMANTIC_TEXCOORD0}
* {@link SEMANTIC_TEXCOORD1}
* {@link SEMANTIC_TEXCOORD2}
* {@link SEMANTIC_TEXCOORD3}
* {@link SEMANTIC_TEXCOORD4}
* {@link SEMANTIC_TEXCOORD5}
* {@link SEMANTIC_TEXCOORD6}
* {@link SEMANTIC_TEXCOORD7}

If vertex data has a meaning other that one of those listed above, use the user-defined
semantics: {@link SEMANTIC_ATTR0} to {@link SEMANTIC_ATTR15}.
 * @param vertexElement.numComponents - The number of components of the vertex attribute.
Can be 1, 2, 3 or 4.
 * @param vertexElement.dataType - The data type of the attribute. Can be:

* {@link TYPE_INT8}
* {@link TYPE_UINT8}
* {@link TYPE_INT16}
* {@link TYPE_UINT16}
* {@link TYPE_INT32}
* {@link TYPE_UINT32}
* {@link TYPE_FLOAT32}
 * @param vertexElement.normalize - If true, vertex attribute data will be mapped from a
0 to 255 range down to 0 to 1 when fed to a shader. If false, vertex attribute data is left
unchanged. If this property is unspecified, false is assumed.
 * @param vertexElement.offset - The number of initial bytes at the start of a vertex that are not relevant to this attribute.
 * @param vertexElement.stride - The number of total bytes that are between the start of one vertex, and the start of the next.
 * @param vertexElement.scopeId - The shader input variable corresponding to the attribute.
 * @param vertexElement.size - The size of the attribute in bytes.
 * @param vertexFormat - A vertex format that defines the layout of vertex data inside the buffer.
 */
export class VertexIteratorAccessor {
    constructor(buffer: ArrayBuffer, vertexElement: {
        name: string;
        numComponents: number;
        dataType: number;
        normalize: boolean;
        offset: number;
        stride: number;
        scopeId: ScopeId;
        size: number;
    }, vertexFormat: VertexFormat);
    /**
     * Get a attribute component at the iterator's current index.
     * @param offset - The component offset. Should be either 0, 1, 2, or 3.
     * @returns The value of a attribute component.
     */
    get(offset: number): number;
    /**
     * Set all the attribute components at the iterator's current index.
     * @param a - The first component value.
     * @param [b] - The second component value (if applicable).
     * @param [c] - The third component value (if applicable).
     * @param [d] - The fourth component value (if applicable).
     */
    set(a: number, b?: number, c?: number, d?: number): void;
    /**
     * Read attribute components to an output array.
     * @param offset - The component offset at which to read data from the buffer. Will be used instead of the iterator's current index.
     * @param outputArray - The output array to write data into.
     * @param outputIndex - The output index at which to write into the output array.
     */
    getToArray(offset: number, outputArray: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array, outputIndex: number): void;
    /**
     * Write attribute components from an input array.
     * @param index - The starting index at which to write data into the buffer. Will be used instead of the iterator's current index.
     * @param inputArray - The input array to read data from.
     * @param inputIndex - The input index at which to read from the input array.
     */
    setFromArray(index: number, inputArray: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array, inputIndex: number): void;
}

/**
 * Returns a new VertexIterator object.
 * @property element - The vertex buffer elements.
 * @param vertexBuffer - The vertex buffer to be iterated.
 */
export class VertexIterator {
    constructor(vertexBuffer: VertexBuffer);
    /**
     * Moves the vertex iterator on to the next vertex.
     * @example
     * var iterator = new pc.VertexIterator(vertexBuffer);
    iterator.element[pc.SEMANTIC_POSTIION].set(-0.9, -0.9, 0.0);
    iterator.element[pc.SEMANTIC_COLOR].set(255, 0, 0, 255);
    iterator.next();
    iterator.element[pc.SEMANTIC_POSTIION].set(0.9, -0.9, 0.0);
    iterator.element[pc.SEMANTIC_COLOR].set(0, 255, 0, 255);
    iterator.next();
    iterator.element[pc.SEMANTIC_POSTIION].set(0.0, 0.9, 0.0);
    iterator.element[pc.SEMANTIC_COLOR].set(0, 0, 255, 255);
    iterator.end();
     * @param [count] - Optional number of steps to move on when calling next. Defaults to 1.
     */
    next(count?: number): void;
    /**
     * Notifies the vertex buffer being iterated that writes are complete. Internally
    the vertex buffer is unlocked and vertex data is uploaded to video memory.
     * @example
     * var iterator = new pc.VertexIterator(vertexBuffer);
    iterator.element[pc.SEMANTIC_POSTIION].set(-0.9, -0.9, 0.0);
    iterator.element[pc.SEMANTIC_COLOR].set(255, 0, 0, 255);
    iterator.next();
    iterator.element[pc.SEMANTIC_POSTIION].set(0.9, -0.9, 0.0);
    iterator.element[pc.SEMANTIC_COLOR].set(0, 255, 0, 255);
    iterator.next();
    iterator.element[pc.SEMANTIC_POSTIION].set(0.0, 0.9, 0.0);
    iterator.element[pc.SEMANTIC_COLOR].set(0, 0, 255, 255);
    iterator.end();
     */
    end(): void;
    /**
     * The vertex buffer elements.
    */
    element: {
        [key: string]: VertexIteratorAccessor;
    };
}

/**
 * Handles localization. Responsible for loading localization assets
and returning translations for a certain key. Can also handle plural forms. To override
its default behavior define a different implementation for {@link I18n#getText} and {@link I18n#getPluralText}.
 * @property locale - The current locale for example "en-US". Changing the locale will raise an event which will cause localized Text Elements to
change language to the new locale.
 * @property assets - An array of asset ids or assets that contain localization data in the expected format. I18n will automatically load
translations from these assets as the assets are loaded and it will also automatically unload translations if the assets get removed or unloaded at runtime.
 * @param app - The application.
 */
export class I18n extends EventHandler {
    constructor(app: Application);
    /**
     * Returns the first available locale based on the desired locale specified. First
    tries to find the desired locale and then tries to find an alternative locale based on the language.
     * @param desiredLocale - The desired locale e.g. En-US.
     * @param availableLocales - A dictionary where each key is an available locale.
     * @returns The locale found or if no locale is available returns the default en-US locale.
     */
    findAvailableLocale(desiredLocale: string, availableLocales: any): string;
    /**
     * Returns the translation for the specified key and locale. If the locale is not specified
    it will use the current locale.
     * @example
     * var localized = this.app.i18n.getText('localization-key');
    var localizedFrench = this.app.i18n.getText('localization-key', 'fr-FR');
     * @param key - The localization key.
     * @param [locale] - The desired locale.
     * @returns The translated text. If no translations are found at all for the locale then it will return
    the en-US translation. If no translation exists for that key then it will return the localization key.
     */
    getText(key: string, locale?: string): string;
    /**
     * Returns the pluralized translation for the specified key, number n and locale. If the locale is not specified
    it will use the current locale.
     * @example
     * // manually replace {number} in the resulting translation with our number
    var localized = this.app.i18n.getPluralText('{number} apples', number).replace("{number}", number);
     * @param key - The localization key.
     * @param n - The number used to determine which plural form to use. E.g. For the phrase "5 Apples" n equals 5.
     * @param [locale] - The desired locale.
     * @returns The translated text. If no translations are found at all for the locale then it will return
    the en-US translation. If no translation exists for that key then it will return the localization key.
     */
    getPluralText(key: string, n: number, locale?: string): string;
    /**
     * Adds localization data. If the locale and key for a translation already exists it will be overwritten.
     * @example
     * this.app.i18n.addData({
        header: {
            version: 1
        },
        data: [{
            info: {
                locale: 'en-US'
            },
            messages: {
                "key": "translation",
                // The number of plural forms depends on the locale. See the manual for more information.
                "plural_key": ["one item", "more than one items"]
            }
        }, {
            info: {
                locale: 'fr-FR'
            },
            messages: {
                // ...
            }
        }]
    });
     * @param data - The localization data. See example for the expected format of the data.
     */
    addData(data: any): void;
    /**
     * Removes localization data.
     * @param data - The localization data. The data is expected to be in the same format as {@link I18n#addData}.
     */
    removeData(data: any): void;
    /**
     * Frees up memory.
     */
    destroy(): void;
    /**
     * The current locale for example "en-US". Changing the locale will raise an event which will cause localized Text Elements to
     * change language to the new locale.
    */
    locale: string;
    /**
     * An array of asset ids or assets that contain localization data in the expected format. I18n will automatically load
     * translations from these assets as the assets are loaded and it will also automatically unload translations if the assets get removed or unloaded at runtime.
    */
    assets: number[] | Asset[];
}

/**
 * Name of event fired when a key is pressed.
 */
export const EVENT_KEYDOWN: string;

/**
 * Name of event fired when a key is released.
 */
export const EVENT_KEYUP: string;

/**
 * Name of event fired when a mouse button is pressed.
 */
export const EVENT_MOUSEDOWN: string;

/**
 * Name of event fired when the mouse is moved.
 */
export const EVENT_MOUSEMOVE: string;

/**
 * Name of event fired when a mouse button is released.
 */
export const EVENT_MOUSEUP: string;

/**
 * Name of event fired when the mouse wheel is rotated.
 */
export const EVENT_MOUSEWHEEL: string;

/**
 * Name of event fired when a new touch occurs. For example, a finger is placed on the device.
 */
export const EVENT_TOUCHSTART: string;

/**
 * Name of event fired when touch ends. For example, a finger is lifted off the device.
 */
export const EVENT_TOUCHEND: string;

/**
 * Name of event fired when a touch moves.
 */
export const EVENT_TOUCHMOVE: string;

/**
 * Name of event fired when a touch point is interrupted in some way.
The exact reasons for canceling a touch can vary from device to device.
For example, a modal alert pops up during the interaction; the touch point leaves the document area,
or there are more touch points than the device supports, in which case the earliest touch point is canceled.
 */
export const EVENT_TOUCHCANCEL: string;

/**
 * Name of event fired when a new xr select occurs. For example, primary trigger was pressed.
 */
export const EVENT_SELECT: string;

/**
 * Name of event fired when a new xr select starts. For example, primary trigger is now pressed.
 */
export const EVENT_SELECTSTART: string;

/**
 * Name of event fired when xr select ends. For example, a primary trigger is now released.
 */
export const EVENT_SELECTEND: string;

export const KEY_BACKSPACE: number;

export const KEY_TAB: number;

export const KEY_RETURN: number;

export const KEY_ENTER: number;

export const KEY_SHIFT: number;

export const KEY_CONTROL: number;

export const KEY_ALT: number;

export const KEY_PAUSE: number;

export const KEY_CAPS_LOCK: number;

export const KEY_ESCAPE: number;

export const KEY_SPACE: number;

export const KEY_PAGE_UP: number;

export const KEY_PAGE_DOWN: number;

export const KEY_END: number;

export const KEY_HOME: number;

export const KEY_LEFT: number;

export const KEY_UP: number;

export const KEY_RIGHT: number;

export const KEY_DOWN: number;

export const KEY_PRINT_SCREEN: number;

export const KEY_INSERT: number;

export const KEY_DELETE: number;

export const KEY_0: number;

export const KEY_1: number;

export const KEY_2: number;

export const KEY_3: number;

export const KEY_4: number;

export const KEY_5: number;

export const KEY_6: number;

export const KEY_7: number;

export const KEY_8: number;

export const KEY_9: number;

export const KEY_SEMICOLON: number;

export const KEY_EQUAL: number;

export const KEY_A: number;

export const KEY_B: number;

export const KEY_C: number;

export const KEY_D: number;

export const KEY_E: number;

export const KEY_F: number;

export const KEY_G: number;

export const KEY_H: number;

export const KEY_I: number;

export const KEY_J: number;

export const KEY_K: number;

export const KEY_L: number;

export const KEY_M: number;

export const KEY_N: number;

export const KEY_O: number;

export const KEY_P: number;

export const KEY_Q: number;

export const KEY_R: number;

export const KEY_S: number;

export const KEY_T: number;

export const KEY_U: number;

export const KEY_V: number;

export const KEY_W: number;

export const KEY_X: number;

export const KEY_Y: number;

export const KEY_Z: number;

export const KEY_WINDOWS: number;

export const KEY_CONTEXT_MENU: number;

export const KEY_NUMPAD_0: number;

export const KEY_NUMPAD_1: number;

export const KEY_NUMPAD_2: number;

export const KEY_NUMPAD_3: number;

export const KEY_NUMPAD_4: number;

export const KEY_NUMPAD_5: number;

export const KEY_NUMPAD_6: number;

export const KEY_NUMPAD_7: number;

export const KEY_NUMPAD_8: number;

export const KEY_NUMPAD_9: number;

export const KEY_MULTIPLY: number;

export const KEY_ADD: number;

export const KEY_SEPARATOR: number;

export const KEY_SUBTRACT: number;

export const KEY_DECIMAL: number;

export const KEY_DIVIDE: number;

export const KEY_F1: number;

export const KEY_F2: number;

export const KEY_F3: number;

export const KEY_F4: number;

export const KEY_F5: number;

export const KEY_F6: number;

export const KEY_F7: number;

export const KEY_F8: number;

export const KEY_F9: number;

export const KEY_F10: number;

export const KEY_F11: number;

export const KEY_F12: number;

export const KEY_COMMA: number;

export const KEY_PERIOD: number;

export const KEY_SLASH: number;

export const KEY_OPEN_BRACKET: number;

export const KEY_BACK_SLASH: number;

export const KEY_CLOSE_BRACKET: number;

export const KEY_META: number;

/**
 * No mouse buttons pressed.
 */
export const MOUSEBUTTON_NONE: number;

/**
 * The left mouse button.
 */
export const MOUSEBUTTON_LEFT: number;

/**
 * The middle mouse button.
 */
export const MOUSEBUTTON_MIDDLE: number;

/**
 * The right mouse button.
 */
export const MOUSEBUTTON_RIGHT: number;

/**
 * Index for pad 1.
 */
export const PAD_1: number;

/**
 * Index for pad 2.
 */
export const PAD_2: number;

/**
 * Index for pad 3.
 */
export const PAD_3: number;

/**
 * Index for pad 4.
 */
export const PAD_4: number;

/**
 * The first face button, from bottom going clockwise.
 */
export const PAD_FACE_1: number;

/**
 * The second face button, from bottom going clockwise.
 */
export const PAD_FACE_2: number;

/**
 * The third face button, from bottom going clockwise.
 */
export const PAD_FACE_3: number;

/**
 * The fourth face button, from bottom going clockwise.
 */
export const PAD_FACE_4: number;

/**
 * The first shoulder button on the left.
 */
export const PAD_L_SHOULDER_1: number;

/**
 * The first shoulder button on the right.
 */
export const PAD_R_SHOULDER_1: number;

/**
 * The second shoulder button on the left.
 */
export const PAD_L_SHOULDER_2: number;

/**
 * The second shoulder button on the right.
 */
export const PAD_R_SHOULDER_2: number;

/**
 * The select button.
 */
export const PAD_SELECT: number;

/**
 * The start button.
 */
export const PAD_START: number;

/**
 * The button when depressing the left analogue stick.
 */
export const PAD_L_STICK_BUTTON: number;

/**
 * The button when depressing the right analogue stick.
 */
export const PAD_R_STICK_BUTTON: number;

/**
 * Direction pad up.
 */
export const PAD_UP: number;

/**
 * Direction pad down.
 */
export const PAD_DOWN: number;

/**
 * Direction pad left.
 */
export const PAD_LEFT: number;

/**
 * Direction pad right.
 */
export const PAD_RIGHT: number;

/**
 * Vendor specific button.
 */
export const PAD_VENDOR: number;

/**
 * Horizontal axis on the left analogue stick.
 */
export const PAD_L_STICK_X: number;

/**
 * Vertical axis on the left analogue stick.
 */
export const PAD_L_STICK_Y: number;

/**
 * Horizontal axis on the right analogue stick.
 */
export const PAD_R_STICK_X: number;

/**
 * Vertical axis on the right analogue stick.
 */
export const PAD_R_STICK_Y: number;

/**
 * Create a new instance of a Controller.
 * @example
 * var c = new pc.Controller(document);

// Register the "fire" action and assign it to both the Enter key and the Spacebar.
c.registerKeys("fire", [pc.KEY_ENTER, pc.KEY_SPACE]);
 * @param [element] - Element to attach Controller to.
 * @param [options] - Optional arguments.
 * @param [options.keyboard] - A Keyboard object to use.
 * @param [options.mouse] - A Mouse object to use.
 * @param [options.gamepads] - A Gamepads object to use.
 */
export class Controller {
    constructor(element?: Element, options?: {
        keyboard?: Keyboard;
        mouse?: Mouse;
        gamepads?: GamePads;
    });
    /**
     * Attach Controller to a Element, this is required before you can monitor for key/mouse inputs.
     * @param element - The element to attach mouse and keyboard event handler too.
     */
    attach(element: Element): void;
    /**
     * Detach Controller from an Element, this should be done before the Controller is destroyed.
     */
    detach(): void;
    /**
     * Disable the context menu usually activated with the right mouse button.
     */
    disableContextMenu(): void;
    /**
     * Enable the context menu usually activated with the right mouse button. This is enabled by default.
     */
    enableContextMenu(): void;
    /**
     * Update the Keyboard and Mouse handlers.
     * @param dt - The time since the last frame.
     */
    update(dt: any): void;
    /**
     * Create or update a action which is enabled when the supplied keys are pressed.
     * @param action - The name of the action.
     * @param keys - A list of keycodes.
     */
    registerKeys(action: string, keys: number[]): void;
    /**
     * Create or update an action which is enabled when the supplied mouse button is pressed.
     * @param action - The name of the action.
     * @param button - The mouse button.
     */
    registerMouse(action: string, button: number): void;
    /**
     * Create or update an action which is enabled when the gamepad button is pressed.
     * @param action - The name of the action.
     * @param pad - The index of the pad to register (use {@link PAD_1}, etc).
     * @param button - The pad button.
     */
    registerPadButton(action: string, pad: number, button: number): void;
    /**
     * @param [options] - Optional options object.
     * @param [options.pad] - The index of the game pad to register for (use {@link PAD_1}, etc).
     */
    registerAxis(options?: {
        pad?: any;
    }): void;
    /**
     * Returns true if the current action is enabled.
     * @param actionName - The name of the action.
     * @returns True if the action is enabled.
     */
    isPressed(actionName: string): boolean;
    /**
     * Returns true if the action was enabled this since the last update.
     * @param actionName - The name of the action.
     * @returns True if the action was enabled this since the last update.
     */
    wasPressed(actionName: string): boolean;
}

/**
 * Create an instance of an ElementInputEvent.
 * @property event - The MouseEvent or TouchEvent that was originally raised.
 * @property element - The ElementComponent that this event was originally raised on.
 * @property camera - The CameraComponent that this event was originally raised via.
 * @param event - The MouseEvent or TouchEvent that was originally raised.
 * @param element - The ElementComponent that this event was originally raised on.
 * @param camera - The CameraComponent that this event was originally raised via.
 */
export class ElementInputEvent {
    constructor(event: MouseEvent | TouchEvent, element: ElementComponent, camera: CameraComponent);
    /**
     * Stop propagation of the event to parent {@link ElementComponent}s. This also stops propagation of the event to other event listeners of the original DOM Event.
     */
    stopPropagation(): void;
    /**
     * The MouseEvent or TouchEvent that was originally raised.
    */
    event: MouseEvent | TouchEvent;
    /**
     * The ElementComponent that this event was originally raised on.
    */
    element: ElementComponent;
    /**
     * The CameraComponent that this event was originally raised via.
    */
    camera: CameraComponent;
}

/**
 * Create an instance of an ElementMouseEvent.
 * @property ctrlKey - Whether the ctrl key was pressed.
 * @property altKey - Whether the alt key was pressed.
 * @property shiftKey - Whether the shift key was pressed.
 * @property metaKey - Whether the meta key was pressed.
 * @property button - The mouse button.
 * @property dx - The amount of horizontal movement of the cursor.
 * @property dy - The amount of vertical movement of the cursor.
 * @property wheelDelta - The amount of the wheel movement.
 * @param event - The MouseEvent that was originally raised.
 * @param element - The ElementComponent that this event was originally raised on.
 * @param camera - The CameraComponent that this event was originally raised via.
 * @param x - The x coordinate.
 * @param y - The y coordinate.
 * @param lastX - The last x coordinate.
 * @param lastY - The last y coordinate.
 */
export class ElementMouseEvent extends ElementInputEvent {
    constructor(event: MouseEvent, element: ElementComponent, camera: CameraComponent, x: number, y: number, lastX: number, lastY: number);
    /**
     * Whether the ctrl key was pressed.
    */
    ctrlKey: boolean;
    /**
     * Whether the alt key was pressed.
    */
    altKey: boolean;
    /**
     * Whether the shift key was pressed.
    */
    shiftKey: boolean;
    /**
     * Whether the meta key was pressed.
    */
    metaKey: boolean;
    /**
     * The mouse button.
    */
    button: number;
    /**
     * The amount of horizontal movement of the cursor.
    */
    dx: number;
    /**
     * The amount of vertical movement of the cursor.
    */
    dy: number;
    /**
     * The amount of the wheel movement.
    */
    wheelDelta: number;
}

/**
 * Create an instance of an ElementTouchEvent.
 * @property touches - The Touch objects representing all current points of contact with the surface, regardless of target or changed status.
 * @property changedTouches - The Touch objects representing individual points of contact whose states changed between the previous touch event and this one.
 * @property touch - The touch object that triggered the event.
 * @param event - The TouchEvent that was originally raised.
 * @param element - The ElementComponent that this event was originally raised on.
 * @param camera - The CameraComponent that this event was originally raised via.
 * @param x - The x coordinate of the touch that triggered the event.
 * @param y - The y coordinate of the touch that triggered the event.
 * @param touch - The touch object that triggered the event.
 */
export class ElementTouchEvent extends ElementInputEvent {
    constructor(event: TouchEvent, element: ElementComponent, camera: CameraComponent, x: number, y: number, touch: Touch);
    /**
     * The Touch objects representing all current points of contact with the surface, regardless of target or changed status.
    */
    touches: Touch[];
    /**
     * The Touch objects representing individual points of contact whose states changed between the previous touch event and this one.
    */
    changedTouches: Touch[];
    /**
     * The touch object that triggered the event.
    */
    touch: Touch;
}

/**
 * Create an instance of a ElementSelectEvent.
 * @property inputSource - The XR input source that this event was originally raised from.
 * @param event - The XRInputSourceEvent that was originally raised.
 * @param element - The ElementComponent that this event was originally raised on.
 * @param camera - The CameraComponent that this event was originally raised via.
 * @param inputSource - The XR input source that this event was originally raised from.
 */
export class ElementSelectEvent extends ElementInputEvent {
    constructor(event: any, element: ElementComponent, camera: CameraComponent, inputSource: XrInputSource);
    /**
     * The XR input source that this event was originally raised from.
    */
    inputSource: XrInputSource;
}

/**
 * Create a new ElementInput instance.
 * @param domElement - The DOM element.
 * @param [options] - Optional arguments.
 * @param [options.useMouse] - Whether to allow mouse input. Defaults to true.
 * @param [options.useTouch] - Whether to allow touch input. Defaults to true.
 * @param [options.useXr] - Whether to allow XR input sources. Defaults to true.
 */
export class ElementInput {
    constructor(domElement: Element, options?: {
        useMouse?: boolean;
        useTouch?: boolean;
        useXr?: boolean;
    });
    /**
     * Attach mouse and touch events to a DOM element.
     * @param domElement - The DOM element.
     */
    attach(domElement: Element): void;
    /**
     * Remove mouse and touch events from the DOM element that it is attached to.
     */
    detach(): void;
    /**
     * Add a {@link ElementComponent} to the internal list of ElementComponents that are being checked for input.
     * @param element - The ElementComponent.
     */
    addElement(element: ElementComponent): void;
    /**
     * Remove a {@link ElementComponent} from the internal list of ElementComponents that are being checked for input.
     * @param element - The ElementComponent.
     */
    removeElement(element: ElementComponent): void;
}

/**
 * Input handler for accessing GamePad input.
 */
export class GamePads {
    /**
     * Update the current and previous state of the gamepads. This must be called every frame for wasPressed()
    to work.
     */
    update(): void;
    /**
     * Poll for the latest data from the gamepad API.
     * @example
     * var gamepads = new pc.GamePads();
    var pads = gamepads.poll();
     * @param [pads] - An optional array used to receive the gamepads mapping. This array will be
    returned by this function.
     * @returns An array of gamepads and mappings for the model of gamepad that is attached.
     */
    poll(pads?: object[]): object[];
    /**
     * Returns true if the button on the pad requested is pressed.
     * @param index - The index of the pad to check, use constants {@link PAD_1}, {@link PAD_2}, etc.
     * @param button - The button to test, use constants {@link PAD_FACE_1}, etc.
     * @returns True if the button is pressed.
     */
    isPressed(index: number, button: number): boolean;
    /**
     * Returns true if the button was pressed since the last frame.
     * @param index - The index of the pad to check, use constants {@link PAD_1}, {@link PAD_2}, etc.
     * @param button - The button to test, use constants {@link PAD_FACE_1}, etc.
     * @returns True if the button was pressed since the last frame.
     */
    wasPressed(index: number, button: number): boolean;
    /**
     * Get the value of one of the analogue axes of the pad.
     * @param index - The index of the pad to check, use constants {@link PAD_1}, {@link PAD_2}, etc.
     * @param axes - The axes to get the value of, use constants {@link PAD_L_STICK_X}, etc.
     * @returns The value of the axis between -1 and 1.
     */
    getAxis(index: number, axes: number): number;
}

/**
 * Create a new KeyboardEvent.
 * @example
 * var onKeyDown = function (e) {
    if (e.key === pc.KEY_SPACE) {
        // space key pressed
    }
    e.event.preventDefault(); // Use original browser event to prevent browser action.
};
app.keyboard.on("keydown", onKeyDown, this);
 * @property key - The keyCode of the key that has changed. See the KEY_* constants.
 * @property element - The element that fired the keyboard event.
 * @property event - The original browser event which was fired.
 * @param keyboard - The keyboard object which is firing the event.
 * @param event - The original browser event that was fired.
 */
export class KeyboardEvent {
    constructor(keyboard: Keyboard, event: KeyboardEvent);
    /**
     * The keyCode of the key that has changed. See the KEY_* constants.
    */
    key: number;
    /**
     * The element that fired the keyboard event.
    */
    element: Element;
    /**
     * The original browser event which was fired.
    */
    event: KeyboardEvent;
}

/**
 * Create a new Keyboard object.
 * @example
 * var keyboard = new pc.Keyboard(window); // attach keyboard listeners to the window
 * @param [element] - Element to attach Keyboard to. Note that elements like &lt;div&gt; can't
accept focus by default. To use keyboard events on an element like this it must have a value of 'tabindex' e.g. tabindex="0". For more details: <a href="http://www.w3.org/WAI/GL/WCAG20/WD-WCAG20-TECHS/SCR29.html">http://www.w3.org/WAI/GL/WCAG20/WD-WCAG20-TECHS/SCR29.html</a>.
 * @param [options] - Optional options object.
 * @param [options.preventDefault] - Call preventDefault() in key event handlers. This stops the default action of the event occurring. e.g. Ctrl+T will not open a new browser tab
 * @param [options.stopPropagation] - Call stopPropagation() in key event handlers. This stops the event bubbling up the DOM so no parent handlers will be notified of the event
 */
export class Keyboard extends EventHandler {
    constructor(element?: Element | Window, options?: {
        preventDefault?: boolean;
        stopPropagation?: boolean;
    });
    /**
     * Attach the keyboard event handlers to an Element.
     * @param element - The element to listen for keyboard events on.
     */
    attach(element: Element): void;
    /**
     * Detach the keyboard event handlers from the element it is attached to.
     */
    detach(): void;
    /**
     * Return true if the key is currently down.
     * @param key - The keyCode of the key to test. See the KEY_* constants.
     * @returns True if the key was pressed, false if not.
     */
    isPressed(key: number): boolean;
    /**
     * Returns true if the key was pressed since the last update.
     * @param key - The keyCode of the key to test. See the KEY_* constants.
     * @returns True if the key was pressed.
     */
    wasPressed(key: number): boolean;
    /**
     * Returns true if the key was released since the last update.
     * @param key - The keyCode of the key to test. See the KEY_* constants.
     * @returns True if the key was pressed.
     */
    wasReleased(key: number): boolean;
}

/**
 * Create an new MouseEvent.
 * @property x - The x co-ordinate of the mouse pointer relative to the element {@link Mouse} is attached to.
 * @property y - The y co-ordinate of the mouse pointer relative to the element {@link Mouse} is attached to.
 * @property dx - The change in x co-ordinate since the last mouse event.
 * @property dy - The change in y co-ordinate since the last mouse event.
 * @property button - The mouse button associated with this event. Can be:

* {@link MOUSEBUTTON_LEFT}
* {@link MOUSEBUTTON_MIDDLE}
* {@link MOUSEBUTTON_RIGHT}
 * @property wheelDelta - A value representing the amount the mouse wheel has moved, only
valid for {@link mousewheel} events.
 * @property element - The element that the mouse was fired from.
 * @property ctrlKey - True if the ctrl key was pressed when this event was fired.
 * @property shiftKey - True if the shift key was pressed when this event was fired.
 * @property altKey - True if the alt key was pressed when this event was fired.
 * @property metaKey - True if the meta key was pressed when this event was fired.
 * @property event - The original browser event.
 * @param mouse - The Mouse device that is firing this event.
 * @param event - The original browser event that fired.
 */
export class MouseEvent {
    constructor(mouse: Mouse, event: globalThis.MouseEvent);
    /**
     * The x co-ordinate of the mouse pointer relative to the element {@link Mouse} is attached to.
    */
    x: number;
    /**
     * The y co-ordinate of the mouse pointer relative to the element {@link Mouse} is attached to.
    */
    y: number;
    /**
     * The change in x co-ordinate since the last mouse event.
    */
    dx: number;
    /**
     * The change in y co-ordinate since the last mouse event.
    */
    dy: number;
    /**
     * The mouse button associated with this event. Can be:
     * * {@link MOUSEBUTTON_LEFT}
     * * {@link MOUSEBUTTON_MIDDLE}
     * * {@link MOUSEBUTTON_RIGHT}
    */
    button: number;
    /**
     * A value representing the amount the mouse wheel has moved, only
     * valid for {@link mousewheel} events.
    */
    wheelDelta: number;
    /**
     * The element that the mouse was fired from.
    */
    element: Element;
    /**
     * True if the ctrl key was pressed when this event was fired.
    */
    ctrlKey: boolean;
    /**
     * True if the shift key was pressed when this event was fired.
    */
    shiftKey: boolean;
    /**
     * True if the alt key was pressed when this event was fired.
    */
    altKey: boolean;
    /**
     * True if the meta key was pressed when this event was fired.
    */
    metaKey: boolean;
    /**
     * The original browser event.
    */
    event: globalThis.MouseEvent;
}

/**
 * Create a new Mouse device.
 * @param [element] - The Element that the mouse events are attached to.
 */
export class Mouse extends EventHandler {
    constructor(element?: Element);
    /**
     * Check if the mouse pointer has been locked, using {@link Mouse#enabledPointerLock}.
     * @returns True if locked.
     */
    static isPointerLocked(): boolean;
    /**
     * Attach mouse events to an Element.
     * @param element - The DOM element to attach the mouse to.
     */
    attach(element: Element): void;
    /**
     * Remove mouse events from the element that it is attached to.
     */
    detach(): void;
    /**
     * Disable the context menu usually activated with right-click.
     */
    disableContextMenu(): void;
    /**
     * Enable the context menu usually activated with right-click. This option is active by default.
     */
    enableContextMenu(): void;
    /**
     * Request that the browser hides the mouse cursor and locks the mouse to the element.
    Allowing raw access to mouse movement input without risking the mouse exiting the element.
    Notes:
    
    * In some browsers this will only work when the browser is running in fullscreen mode. See {@link Application#enableFullscreen}
    * Enabling pointer lock can only be initiated by a user action e.g. in the event handler for a mouse or keyboard input.
     * @param [success] - Function called if the request for mouse lock is successful.
     * @param [error] - Function called if the request for mouse lock is unsuccessful.
     */
    enablePointerLock(success?: callbacks.LockMouse, error?: callbacks.LockMouse): void;
    /**
     * Return control of the mouse cursor to the user.
     * @param [success] - Function called when the mouse lock is disabled.
     */
    disablePointerLock(success?: callbacks.LockMouse): void;
    /**
     * Update method, should be called once per frame.
     */
    update(): void;
    /**
     * Returns true if the mouse button is currently pressed.
     * @param button - The mouse button to test. Can be:
    
    * {@link MOUSEBUTTON_LEFT}
    * {@link MOUSEBUTTON_MIDDLE}
    * {@link MOUSEBUTTON_RIGHT}
     * @returns True if the mouse button is current pressed.
     */
    isPressed(button: number): boolean;
    /**
     * Returns true if the mouse button was pressed this frame (since the last call to update).
     * @param button - The mouse button to test. Can be:
    
    * {@link MOUSEBUTTON_LEFT}
    * {@link MOUSEBUTTON_MIDDLE}
    * {@link MOUSEBUTTON_RIGHT}
     * @returns True if the mouse button was pressed since the last update.
     */
    wasPressed(button: number): boolean;
    /**
     * Returns true if the mouse button was released this frame (since the last call to update).
     * @param button - The mouse button to test. Can be:
    
    * {@link MOUSEBUTTON_LEFT}
    * {@link MOUSEBUTTON_MIDDLE}
    * {@link MOUSEBUTTON_RIGHT}
     * @returns True if the mouse button was released since the last update.
     */
    wasReleased(button: number): boolean;
}

/**
 * Create a new touch device and attach it to an element.
 * @param element - The element to attach listen for events on.
 */
export class TouchDevice extends EventHandler {
    constructor(element: Element);
    /**
     * Attach a device to an element in the DOM.
    If the device is already attached to an element this method will detach it first.
     * @param element - The element to attach to.
     */
    attach(element: Element): void;
    /**
     * Detach a device from the element it is attached to.
     */
    detach(): void;
}

/**
 * Similar to {@link getTargetCoords} for the MouseEvents.
This function takes a browser Touch object and returns the co-ordinates of the
touch relative to the target element.
 * @param touch - The browser Touch object.
 * @returns The co-ordinates of the touch relative to the touch.target element. In the format {x, y}.
 */
export function getTouchTargetCoords(touch: Touch): any;

/**
 * Create a new Touch object from the browser Touch.
 * @property id - The identifier of the touch.
 * @property x - The x co-ordinate relative to the element that the TouchDevice is attached to.
 * @property y - The y co-ordinate relative to the element that the TouchDevice is attached to.
 * @property target - The target element of the touch event.
 * @property touch - The original browser Touch object.
 * @param touch - The browser Touch object.
 */
export class Touch {
    constructor(touch: Touch);
    /**
     * The identifier of the touch.
    */
    id: number;
    /**
     * The x co-ordinate relative to the element that the TouchDevice is attached to.
    */
    x: number;
    /**
     * The y co-ordinate relative to the element that the TouchDevice is attached to.
    */
    y: number;
    /**
     * The target element of the touch event.
    */
    target: Element;
    /**
     * The original browser Touch object.
    */
    touch: Touch;
}

/**
 * Create a new TouchEvent from an existing browser event.
 * @property element - The target Element that the event was fired from.
 * @property touches - A list of all touches currently in contact with the device.
 * @property changedTouches - A list of touches that have changed since the last event.
 * @property event - The original browser TouchEvent.
 * @param device - The source device of the touch events.
 * @param event - The original browser TouchEvent.
 */
export class TouchEvent {
    constructor(device: TouchDevice, event: TouchEvent);
    /**
     * Get an event from one of the touch lists by the id. It is useful to access
    touches by their id so that you can be sure you are referencing the same touch.
     * @param id - The identifier of the touch.
     * @param list - An array of touches to search.
     * @returns The {@link Touch} object or null.
     */
    getTouchById(id: number, list: Touch[]): Touch;
    /**
     * The target Element that the event was fired from.
    */
    element: Element;
    /**
     * A list of all touches currently in contact with the device.
    */
    touches: Touch[];
    /**
     * A list of touches that have changed since the last event.
    */
    changedTouches: Touch[];
    /**
     * The original browser TouchEvent.
    */
    event: TouchEvent;
}

/**
 * Create a new Color object.
 * @property r - The red component of the color.
 * @property g - The green component of the color.
 * @property b - The blue component of the color.
 * @property a - The alpha component of the color.
 * @param [r] - The value of the red component (0-1). If r is an array of length 3 or 4, the array will be used to populate all components.
 * @param [g] - The value of the green component (0-1).
 * @param [b] - The value of the blue component (0-1).
 * @param [a] - The value of the alpha component (0-1).
 */
export class Color {
    constructor(r?: number | number[], g?: number, b?: number, a?: number);
    /**
     * Returns a clone of the specified color.
     * @returns A duplicate color object.
     */
    clone(): Color;
    /**
     * Copies the contents of a source color to a destination color.
     * @example
     * var src = new pc.Color(1, 0, 0, 1);
    var dst = new pc.Color();
    
    dst.copy(src);
    
    console.log("The two colors are " + (dst.equals(src) ? "equal" : "different"));
     * @param rhs - A color to copy to the specified color.
     * @returns Self for chaining.
     */
    copy(rhs: Color): Color;
    /**
     * Reports whether two colors are equal.
     * @example
     * var a = new pc.Color(1, 0, 0, 1);
    var b = new pc.Color(1, 1, 0, 1);
    console.log("The two colors are " + (a.equals(b) ? "equal" : "different"));
     * @param rhs - The color to compare to the specified color.
     * @returns True if the colors are equal and false otherwise.
     */
    equals(rhs: Color): boolean;
    /**
     * Assign values to the color components, including alpha.
     * @param r - The value for red (0-1).
     * @param g - The value for blue (0-1).
     * @param b - The value for green (0-1).
     * @param [a] - The value for the alpha (0-1), defaults to 1.
     * @returns Self for chaining.
     */
    set(r: number, g: number, b: number, a?: number): Color;
    /**
     * Returns the result of a linear interpolation between two specified colors.
     * @example
     * var a = new pc.Color(0, 0, 0);
    var b = new pc.Color(1, 1, 0.5);
    var r = new pc.Color();
    
    r.lerp(a, b, 0);   // r is equal to a
    r.lerp(a, b, 0.5); // r is 0.5, 0.5, 0.25
    r.lerp(a, b, 1);   // r is equal to b
     * @param lhs - The color to interpolate from.
     * @param rhs - The color to interpolate to.
     * @param alpha - The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
    will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
    a ray extrapolated from this line.
     * @returns Self for chaining.
     */
    lerp(lhs: Color, rhs: Color, alpha: number): Color;
    /**
     * Set the values of the color from a string representation '#11223344' or '#112233'.
     * @param hex - A string representation in the format '#RRGGBBAA' or '#RRGGBB'. Where RR, GG, BB, AA are red, green, blue and alpha values.
    This is the same format used in HTML/CSS.
     * @returns Self for chaining.
     */
    fromString(hex: string): Color;
    /**
     * Converts the color to string form. The format is '#RRGGBBAA', where
    RR, GG, BB, AA are the red, green, blue and alpha values. When the alpha value is not
    included (the default), this is the same format as used in HTML/CSS.
     * @example
     * var c = new pc.Color(1, 1, 1);
    // Should output '#ffffffff'
    console.log(c.toString());
     * @param alpha - If true, the output string will include the alpha value.
     * @returns The color in string form.
     */
    toString(alpha: boolean): string;
    /**
     * A constant color set to black [0, 0, 0, 1].
     */
    static readonly BLACK: Color;
    /**
     * A constant color set to blue [0, 0, 1, 1].
     */
    static readonly BLUE: Color;
    /**
     * A constant color set to cyan [0, 1, 1, 1].
     */
    static readonly CYAN: Color;
    /**
     * A constant color set to gray [0.5, 0.5, 0.5, 1].
     */
    static readonly GRAY: Color;
    /**
     * A constant color set to green [0, 1, 0, 1].
     */
    static readonly GREEN: Color;
    /**
     * A constant color set to magenta [1, 0, 1, 1].
     */
    static readonly MAGENTA: Color;
    /**
     * A constant color set to red [1, 0, 0, 1].
     */
    static readonly RED: Color;
    /**
     * A constant color set to white [1, 1, 1, 1].
     */
    static readonly WHITE: Color;
    /**
     * A constant color set to yellow [1, 1, 0, 1].
     */
    static readonly YELLOW: Color;
    /**
     * The red component of the color.
    */
    r: number;
    /**
     * The green component of the color.
    */
    g: number;
    /**
     * The blue component of the color.
    */
    b: number;
    /**
     * The alpha component of the color.
    */
    a: number;
}

/**
 * A linear interpolation scheme.
 */
export const CURVE_LINEAR: number;

/**
 * A smooth step interpolation scheme.
 */
export const CURVE_SMOOTHSTEP: number;

/**
 * A Catmull-Rom spline interpolation scheme. This interpolation scheme is deprecated. Use CURVE_SPLINE instead.
 */
export const CURVE_CATMULL: number;

/**
 * A cardinal spline interpolation scheme. This interpolation scheme is deprecated. Use CURVE_SPLINE instead.
 */
export const CURVE_CARDINAL: number;

/**
 * Cardinal spline interpolation scheme. For Catmull-Rom, specify curve tension 0.5.
 */
export const CURVE_SPLINE: number;

/**
 * A stepped interpolator, free from the shackles of blending.
 */
export const CURVE_STEP: number;

/**
 * Creates a new curve set.
 * @example
 * var curveSet = new pc.CurveSet([
    [
        [0, 0],
        [0.33, 2],
        [0.66, 2.6],
        [1, 3]
    ],
    [
        [0, 34],
        [0.33, 35],
        [0.66, 36],
        [1, 37]
    ]
]);
 * @param [curveKeys] - An array of arrays of keys (pairs of numbers with
the time first and value second).
 */
export class CurveSet {
    constructor(curveKeys?: number[][]);
    /**
     * Return a specific curve in the curve set.
     * @param index - The index of the curve to return.
     * @returns The curve at the specified index.
     */
    get(index: number): Curve;
    /**
     * Returns the interpolated value of all curves in the curve
    set at the specified time.
     * @param time - The time at which to calculate the value.
     * @param [result] - The interpolated curve values at the specified time.
    If this parameter is not supplied, the function allocates a new array internally
    to return the result.
     * @returns The interpolated curve values at the specified time.
     */
    value(time: number, result?: number[]): number[];
    /**
     * Returns a clone of the specified curve set object.
     * @returns A clone of the specified curve set.
     */
    clone(): CurveSet;
    /**
     * The number of curves in the curve set.
     */
    readonly length: number;
    /**
     * The interpolation scheme applied to all curves in the curve set. Can be:
    
    * {@link CURVE_LINEAR}
    * {@link CURVE_SMOOTHSTEP}
    * {@link CURVE_SPLINE}
    * {@link CURVE_STEP}
    
    Defaults to {@link CURVE_SMOOTHSTEP}.
     */
    type: number;
}

/**
 * Creates a new curve.
 * @example
 * var curve = new pc.Curve([
    [0, 0],
    [0.33, 2],
    [0.66, 2.6],
    [1, 3]
]);
 * @property length - The number of keys in the curve. [read only].
 * @property type - The curve interpolation scheme. Can be:

* {@link CURVE_LINEAR}
* {@link CURVE_SMOOTHSTEP}
* {@link CURVE_SPLINE}
* {@link CURVE_STEP}

Defaults to {@link CURVE_SMOOTHSTEP}.
 * @property tension - Controls how {@link CURVE_SPLINE} tangents are calculated.
Valid range is between 0 and 1 where 0 results in a non-smooth curve (equivalent to linear
interpolation) and 1 results in a very smooth curve. Use 0.5 for a Catmull-rom spline.
 * @param [data] - An array of keys (pairs of numbers with the time first and
value second).
 */
export class Curve {
    constructor(data?: number[]);
    /**
     * Add a new key to the curve.
     * @param time - Time to add new key.
     * @param value - Value of new key.
     * @returns [time, value] pair.
     */
    add(time: number, value: number): number[];
    /**
     * Return a specific key.
     * @param index - The index of the key to return.
     * @returns The key at the specified index.
     */
    get(index: number): number[];
    /**
     * Sort keys by time.
     */
    sort(): void;
    /**
     * Returns the interpolated value of the curve at specified time.
     * @param time - The time at which to calculate the value.
     * @returns The interpolated value.
     */
    value(time: number): number;
    /**
     * Returns a clone of the specified curve object.
     * @returns A clone of the specified curve.
     */
    clone(): Curve;
    /**
     * The number of keys in the curve. [read only].
    */
    length: number;
    /**
     * The curve interpolation scheme. Can be:
     * * {@link CURVE_LINEAR}
     * * {@link CURVE_SMOOTHSTEP}
     * * {@link CURVE_SPLINE}
     * * {@link CURVE_STEP}
     * Defaults to {@link CURVE_SMOOTHSTEP}.
    */
    type: number;
    /**
     * Controls how {@link CURVE_SPLINE} tangents are calculated.
     * Valid range is between 0 and 1 where 0 results in a non-smooth curve (equivalent to linear
     * interpolation) and 1 results in a very smooth curve. Use 0.5 for a Catmull-rom spline.
    */
    tension: number;
}

/**
 * Creates a new identity Mat3 object.
 * @property data - Matrix elements in the form of a flat array.
 */
export class Mat3 {
    /**
     * Creates a duplicate of the specified matrix.
     * @example
     * var src = new pc.Mat3().translate(10, 20, 30);
    var dst = src.clone();
    console.log("The two matrices are " + (src.equals(dst) ? "equal" : "different"));
     * @returns A duplicate matrix.
     */
    clone(): Mat3;
    /**
     * Copies the contents of a source 3x3 matrix to a destination 3x3 matrix.
     * @example
     * var src = new pc.Mat3().translate(10, 20, 30);
    var dst = new pc.Mat3();
    dst.copy(src);
    console.log("The two matrices are " + (src.equals(dst) ? "equal" : "different"));
     * @param rhs - A 3x3 matrix to be copied.
     * @returns Self for chaining.
     */
    copy(rhs: Mat3): Mat3;
    /**
     * Copies the contents of a source array[9] to a destination 3x3 matrix.
     * @example
     * var dst = new pc.Mat3();
    dst.set([0, 1, 2, 3, 4, 5, 6, 7, 8]);
     * @param src - An array[9] to be copied.
     * @returns Self for chaining.
     */
    set(src: number[]): Mat3;
    /**
     * Reports whether two matrices are equal.
     * @example
     * var a = new pc.Mat3().translate(10, 20, 30);
    var b = new pc.Mat3();
    console.log("The two matrices are " + (a.equals(b) ? "equal" : "different"));
     * @param rhs - The other matrix.
     * @returns True if the matrices are equal and false otherwise.
     */
    equals(rhs: Mat3): boolean;
    /**
     * Reports whether the specified matrix is the identity matrix.
     * @example
     * var m = new pc.Mat3();
    console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
     * @returns True if the matrix is identity and false otherwise.
     */
    isIdentity(): boolean;
    /**
     * Sets the matrix to the identity matrix.
     * @example
     * m.setIdentity();
    console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
     * @returns Self for chaining.
     */
    setIdentity(): Mat3;
    /**
     * Converts the matrix to string form.
     * @example
     * var m = new pc.Mat3();
    // Should output '[1, 0, 0, 0, 1, 0, 0, 0, 1]'
    console.log(m.toString());
     * @returns The matrix in string form.
     */
    toString(): string;
    /**
     * Generates the transpose of the specified 3x3 matrix.
     * @example
     * var m = new pc.Mat3();
    
    // Transpose in place
    m.transpose();
     * @returns Self for chaining.
     */
    transpose(): Mat3;
    /**
     * Converts the specified 4x4 matrix to a Mat3.
     * @param m - The 4x4 matrix to convert.
     * @returns Self for chaining.
     */
    setFromMat4(m: Mat4): Mat3;
    /**
     * Transforms a 3-dimensional vector by a 3x3 matrix.
     * @param vec - The 3-dimensional vector to be transformed.
     * @param [res] - An optional 3-dimensional vector to receive the result of the transformation.
     * @returns The input vector v transformed by the current instance.
     */
    transformVector(vec: Vec3, res?: Vec3): Vec3;
    /**
     * A constant matrix set to the identity.
     */
    static readonly IDENTITY: Mat3;
    /**
     * A constant matrix with all elements set to 0.
     */
    static readonly ZERO: Mat3;
    /**
     * Matrix elements in the form of a flat array.
    */
    data: Float32Array;
}

/**
 * Creates a new identity Mat4 object.
 * @property data - Matrix elements in the form of a flat array.
 */
export class Mat4 {
    /**
     * Adds the specified 4x4 matrices together and stores the result in
    the current instance.
     * @example
     * var m = new pc.Mat4();
    
    m.add2(pc.Mat4.IDENTITY, pc.Mat4.ONE);
    
    console.log("The result of the addition is: " + m.toString());
     * @param lhs - The 4x4 matrix used as the first operand of the addition.
     * @param rhs - The 4x4 matrix used as the second operand of the addition.
     * @returns Self for chaining.
     */
    add2(lhs: Mat4, rhs: Mat4): Mat4;
    /**
     * Adds the specified 4x4 matrix to the current instance.
     * @example
     * var m = new pc.Mat4();
    
    m.add(pc.Mat4.ONE);
    
    console.log("The result of the addition is: " + m.toString());
     * @param rhs - The 4x4 matrix used as the second operand of the addition.
     * @returns Self for chaining.
     */
    add(rhs: Mat4): Mat4;
    /**
     * Creates a duplicate of the specified matrix.
     * @example
     * var src = new pc.Mat4().setFromEulerAngles(10, 20, 30);
    var dst = src.clone();
    console.log("The two matrices are " + (src.equals(dst) ? "equal" : "different"));
     * @returns A duplicate matrix.
     */
    clone(): Mat4;
    /**
     * Copies the contents of a source 4x4 matrix to a destination 4x4 matrix.
     * @example
     * var src = new pc.Mat4().setFromEulerAngles(10, 20, 30);
    var dst = new pc.Mat4();
    dst.copy(src);
    console.log("The two matrices are " + (src.equals(dst) ? "equal" : "different"));
     * @param rhs - A 4x4 matrix to be copied.
     * @returns Self for chaining.
     */
    copy(rhs: Mat4): Mat4;
    /**
     * Reports whether two matrices are equal.
     * @example
     * var a = new pc.Mat4().setFromEulerAngles(10, 20, 30);
    var b = new pc.Mat4();
    console.log("The two matrices are " + (a.equals(b) ? "equal" : "different"));
     * @param rhs - The other matrix.
     * @returns True if the matrices are equal and false otherwise.
     */
    equals(rhs: Mat4): boolean;
    /**
     * Reports whether the specified matrix is the identity matrix.
     * @example
     * var m = new pc.Mat4();
    console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
     * @returns True if the matrix is identity and false otherwise.
     */
    isIdentity(): boolean;
    /**
     * Multiplies the specified 4x4 matrices together and stores the result in
    the current instance.
     * @example
     * var a = new pc.Mat4().setFromEulerAngles(10, 20, 30);
    var b = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 180);
    var r = new pc.Mat4();
    
    // r = a * b
    r.mul2(a, b);
    
    console.log("The result of the multiplication is: " + r.toString());
     * @param lhs - The 4x4 matrix used as the first multiplicand of the operation.
     * @param rhs - The 4x4 matrix used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul2(lhs: Mat4, rhs: Mat4): Mat4;
    /**
     * Multiplies the specified 4x4 matrices together and stores the result in
    the current instance. This function assumes the matrices are affine transformation matrices, where the upper left 3x3 elements
    are a rotation matrix, and the bottom left 3 elements are translation. The rightmost column is assumed to be [0, 0, 0, 1]. The parameters
    are not verified to be in the expected format. This function is faster than general {@link Mat4#mul2}.
     * @param lhs - The affine transformation 4x4 matrix used as the first multiplicand of the operation.
     * @param rhs - The affine transformation 4x4 matrix used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mulAffine2(lhs: Mat4, rhs: Mat4): Mat4;
    /**
     * Multiplies the current instance by the specified 4x4 matrix.
     * @example
     * var a = new pc.Mat4().setFromEulerAngles(10, 20, 30);
    var b = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 180);
    
    // a = a * b
    a.mul(b);
    
    console.log("The result of the multiplication is: " + a.toString());
     * @param rhs - The 4x4 matrix used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul(rhs: Mat4): Mat4;
    /**
     * Transforms a 3-dimensional point by a 4x4 matrix.
     * @example
     * // Create a 3-dimensional point
    var v = new pc.Vec3(1, 2, 3);
    
    // Create a 4x4 rotation matrix
    var m = new pc.Mat4().setFromEulerAngles(10, 20, 30);
    
    var tv = m.transformPoint(v);
     * @param vec - The 3-dimensional point to be transformed.
     * @param [res] - An optional 3-dimensional point to receive the result of the transformation.
     * @returns The input point v transformed by the current instance.
     */
    transformPoint(vec: Vec3, res?: Vec3): Vec3;
    /**
     * Transforms a 3-dimensional vector by a 4x4 matrix.
     * @example
     * // Create a 3-dimensional vector
    var v = new pc.Vec3(1, 2, 3);
    
    // Create a 4x4 rotation matrix
    var m = new pc.Mat4().setFromEulerAngles(10, 20, 30);
    
    var tv = m.transformVector(v);
     * @param vec - The 3-dimensional vector to be transformed.
     * @param [res] - An optional 3-dimensional vector to receive the result of the transformation.
     * @returns The input vector v transformed by the current instance.
     */
    transformVector(vec: Vec3, res?: Vec3): Vec3;
    /**
     * Transforms a 4-dimensional vector by a 4x4 matrix.
     * @example
     * // Create an input 4-dimensional vector
    var v = new pc.Vec4(1, 2, 3, 4);
    
    // Create an output 4-dimensional vector
    var result = new pc.Vec4();
    
    // Create a 4x4 rotation matrix
    var m = new pc.Mat4().setFromEulerAngles(10, 20, 30);
    
    m.transformVec4(v, result);
     * @param vec - The 4-dimensional vector to be transformed.
     * @param [res] - An optional 4-dimensional vector to receive the result of the transformation.
     * @returns The input vector v transformed by the current instance.
     */
    transformVec4(vec: Vec4, res?: Vec4): Vec4;
    /**
     * Sets the specified matrix to a viewing matrix derived from an eye point, a target point
    and an up vector. The matrix maps the target point to the negative z-axis and the eye point to the
    origin, so that when you use a typical projection matrix, the center of the scene maps to the center
    of the viewport. Similarly, the direction described by the up vector projected onto the viewing plane
    is mapped to the positive y-axis so that it points upward in the viewport. The up vector must not be
    parallel to the line of sight from the eye to the reference point.
     * @example
     * var position = new pc.Vec3(10, 10, 10);
    var target = new pc.Vec3(0, 0, 0);
    var up = new pc.Vec3(0, 1, 0);
    var m = new pc.Mat4().setLookAt(position, target, up);
     * @param position - 3-d vector holding view position.
     * @param target - 3-d vector holding reference point.
     * @param up - 3-d vector holding the up direction.
     * @returns Self for chaining.
     */
    setLookAt(position: Vec3, target: Vec3, up: Vec3): Mat4;
    /**
     * Sets the specified matrix to a perspective projection matrix. The function's
    parameters define the shape of a frustum.
     * @example
     * // Create a 4x4 perspective projection matrix
    var persp = pc.Mat4().setPerspective(45, 16 / 9, 1, 1000);
     * @param fov - The frustum's field of view in degrees. The fovIsHorizontal parameter
    controls whether this is a vertical or horizontal field of view. By default, it's a vertical
    field of view.
     * @param aspect - The aspect ratio of the frustum's projection plane (width / height).
     * @param znear - The near clip plane in eye coordinates.
     * @param zfar - The far clip plane in eye coordinates.
     * @param [fovIsHorizontal = false] - Set to true to treat the fov as horizontal (x-axis)
    and false for vertical (y-axis). Defaults to false.
     * @returns Self for chaining.
     */
    setPerspective(fov: number, aspect: number, znear: number, zfar: number, fovIsHorizontal?: boolean): Mat4;
    /**
     * Sets the specified matrix to an orthographic projection matrix. The function's parameters
    define the shape of a cuboid-shaped frustum.
     * @example
     * // Create a 4x4 orthographic projection matrix
    var ortho = pc.Mat4().ortho(-2, 2, -2, 2, 1, 1000);
     * @param left - The x-coordinate for the left edge of the camera's projection plane in eye space.
     * @param right - The x-coordinate for the right edge of the camera's projection plane in eye space.
     * @param bottom - The y-coordinate for the bottom edge of the camera's projection plane in eye space.
     * @param top - The y-coordinate for the top edge of the camera's projection plane in eye space.
     * @param near - The near clip plane in eye coordinates.
     * @param far - The far clip plane in eye coordinates.
     * @returns Self for chaining.
     */
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number): Mat4;
    /**
     * Sets the specified matrix to a rotation matrix equivalent to a rotation around
    an axis. The axis must be normalized (unit length) and the angle must be specified in degrees.
     * @example
     * // Create a 4x4 rotation matrix
    var rm = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 90);
     * @param axis - The normalized axis vector around which to rotate.
     * @param angle - The angle of rotation in degrees.
     * @returns Self for chaining.
     */
    setFromAxisAngle(axis: Vec3, angle: number): Mat4;
    /**
     * Sets the specified matrix to its inverse.
     * @example
     * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
    var rot = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 180);
    
    // Invert in place
    rot.invert();
     * @returns Self for chaining.
     */
    invert(): Mat4;
    /**
     * Sets matrix data from an array.
     * @param src - Source array. Must have 16 values.
     * @returns Self for chaining.
     */
    set(src: number[]): Mat4;
    /**
     * Sets the specified matrix to the identity matrix.
     * @example
     * m.setIdentity();
    console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
     * @returns Self for chaining.
     */
    setIdentity(): Mat4;
    /**
     * Sets the specified matrix to the concatenation of a translation, a
    quaternion rotation and a scale.
     * @example
     * var t = new pc.Vec3(10, 20, 30);
    var r = new pc.Quat();
    var s = new pc.Vec3(2, 2, 2);
    
    var m = new pc.Mat4();
    m.setTRS(t, r, s);
     * @param t - A 3-d vector translation.
     * @param r - A quaternion rotation.
     * @param s - A 3-d vector scale.
     * @returns Self for chaining.
     */
    setTRS(t: Vec3, r: Quat, s: Vec3): Mat4;
    /**
     * Sets the specified matrix to its transpose.
     * @example
     * var m = new pc.Mat4();
    
    // Transpose in place
    m.transpose();
     * @returns Self for chaining.
     */
    transpose(): Mat4;
    /**
     * Extracts the translational component from the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
    var m = new pc.Mat4();
    
    // Query the z-axis component
    var t = new pc.Vec3();
    m.getTranslation(t);
     * @param [t] - The vector to receive the translation of the matrix.
     * @returns The translation of the specified 4x4 matrix.
     */
    getTranslation(t?: Vec3): Vec3;
    /**
     * Extracts the x-axis from the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
    var m = new pc.Mat4();
    
    // Query the z-axis component
    var x = new pc.Vec3();
    m.getX(x);
     * @param [x] - The vector to receive the x axis of the matrix.
     * @returns The x-axis of the specified 4x4 matrix.
     */
    getX(x?: Vec3): Vec3;
    /**
     * Extracts the y-axis from the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
    var m = new pc.Mat4();
    
    // Query the z-axis component
    var y = new pc.Vec3();
    m.getY(y);
     * @param [y] - The vector to receive the y axis of the matrix.
     * @returns The y-axis of the specified 4x4 matrix.
     */
    getY(y?: Vec3): Vec3;
    /**
     * Extracts the z-axis from the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
    var m = new pc.Mat4();
    
    // Query the z-axis component
    var z = new pc.Vec3();
    m.getZ(z);
     * @param [z] - The vector to receive the z axis of the matrix.
     * @returns The z-axis of the specified 4x4 matrix.
     */
    getZ(z?: Vec3): Vec3;
    /**
     * Extracts the scale component from the specified 4x4 matrix.
     * @example
     * // Create a 4x4 scale matrix
    var m = new pc.Mat4().scale(2, 3, 4);
    
    // Query the scale component
    var scale = m.getScale();
     * @param [scale] - Vector to receive the scale.
     * @returns The scale in X, Y and Z of the specified 4x4 matrix.
     */
    getScale(scale?: Vec3): Vec3;
    /**
     * Sets the specified matrix to a rotation matrix defined by
    Euler angles. The Euler angles are specified in XYZ order and in degrees.
     * @example
     * var m = new pc.Mat4();
    m.setFromEulerAngles(45, 90, 180);
     * @param ex - Angle to rotate around X axis in degrees.
     * @param ey - Angle to rotate around Y axis in degrees.
     * @param ez - Angle to rotate around Z axis in degrees.
     * @returns Self for chaining.
     */
    setFromEulerAngles(ex: number, ey: number, ez: number): Mat4;
    /**
     * Extracts the Euler angles equivalent to the rotational portion
    of the specified matrix. The returned Euler angles are in XYZ order an in degrees.
     * @example
     * // Create a 4x4 rotation matrix of 45 degrees around the y-axis
    var m = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 45);
    
    var eulers = m.getEulerAngles();
     * @param [eulers] - A 3-d vector to receive the Euler angles.
     * @returns A 3-d vector containing the Euler angles.
     */
    getEulerAngles(eulers?: Vec3): Vec3;
    /**
     * Converts the specified matrix to string form.
     * @example
     * var m = new pc.Mat4();
    // Should output '[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]'
    console.log(m.toString());
     * @returns The matrix in string form.
     */
    toString(): string;
    /**
     * A constant matrix set to the identity.
     */
    static readonly IDENTITY: Mat4;
    /**
     * A constant matrix with all elements set to 0.
     */
    static readonly ZERO: Mat4;
    /**
     * Matrix elements in the form of a flat array.
    */
    data: Float32Array;
}

/**
 * Math API.
 */
export namespace math {
    /**
     * Conversion factor between degrees and radians.
     * @example
     * // Convert 180 degrees to pi radians
    var rad = 180 * pc.math.DEG_TO_RAD;
     */
    const DEG_TO_RAD: number;
    /**
     * Conversion factor between degrees and radians.
     * @example
     * // Convert pi radians to 180 degrees
    var deg = Math.PI * pc.math.RAD_TO_DEG;
     */
    const RAD_TO_DEG: number;
    /**
     * Clamp a number between min and max inclusive.
     * @param value - Number to clamp.
     * @param min - Min value.
     * @param max - Max value.
     * @returns The clamped value.
     */
    function clamp(value: number, min: number, max: number): number;
    /**
     * Convert an 24 bit integer into an array of 3 bytes.
     * @example
     * // Set bytes to [0x11, 0x22, 0x33]
    var bytes = pc.math.intToBytes24(0x112233);
     * @param i - Number holding an integer value.
     * @returns An array of 3 bytes.
     */
    function intToBytes24(i: number): number[];
    /**
     * Convert an 32 bit integer into an array of 4 bytes.
     * @example
     * // Set bytes to [0x11, 0x22, 0x33, 0x44]
    var bytes = pc.math.intToBytes32(0x11223344);
     * @param i - Number holding an integer value.
     * @returns An array of 4 bytes.
     */
    function intToBytes32(i: number): number[];
    /**
     * Convert 3 8 bit Numbers into a single unsigned 24 bit Number.
     * @example
     * // Set result1 to 0x112233 from an array of 3 values
    var result1 = pc.math.bytesToInt24([0x11, 0x22, 0x33]);
    
    // Set result2 to 0x112233 from 3 discrete values
    var result2 = pc.math.bytesToInt24(0x11, 0x22, 0x33);
     * @param r - A single byte (0-255).
     * @param g - A single byte (0-255).
     * @param b - A single byte (0-255).
     * @returns A single unsigned 24 bit Number.
     */
    function bytesToInt24(r: number, g: number, b: number): number;
    /**
     * Convert 4 1-byte Numbers into a single unsigned 32bit Number.
     * @example
     * // Set result1 to 0x11223344 from an array of 4 values
    var result1 = pc.math.bytesToInt32([0x11, 0x22, 0x33, 0x44]);
    
    // Set result2 to 0x11223344 from 4 discrete values
    var result2 = pc.math.bytesToInt32(0x11, 0x22, 0x33, 0x44);
     * @param r - A single byte (0-255).
     * @param g - A single byte (0-255).
     * @param b - A single byte (0-255).
     * @param a - A single byte (0-255).
     * @returns A single unsigned 32bit Number.
     */
    function bytesToInt32(r: number, g: number, b: number, a: number): number;
    /**
     * Calculates the linear interpolation of two numbers.
     * @param a - Number to linearly interpolate from.
     * @param b - Number to linearly interpolate to.
     * @param alpha - The value controlling the result of interpolation. When alpha is 0,
    a is returned. When alpha is 1, b is returned. Between 0 and 1, a linear interpolation between
    a and b is returned. alpha is clamped between 0 and 1.
     * @returns The linear interpolation of two numbers.
     */
    function lerp(a: number, b: number, alpha: number): number;
    /**
     * Calculates the linear interpolation of two angles ensuring that interpolation
    is correctly performed across the 360 to 0 degree boundary. Angles are supplied in degrees.
     * @param a - Angle (in degrees) to linearly interpolate from.
     * @param b - Angle (in degrees) to linearly interpolate to.
     * @param alpha - The value controlling the result of interpolation. When alpha is 0,
    a is returned. When alpha is 1, b is returned. Between 0 and 1, a linear interpolation between
    a and b is returned. alpha is clamped between 0 and 1.
     * @returns The linear interpolation of two angles.
     */
    function lerpAngle(a: number, b: number, alpha: number): number;
    /**
     * Returns true if argument is a power-of-two and false otherwise.
     * @param x - Number to check for power-of-two property.
     * @returns True if power-of-two and false otherwise.
     */
    function powerOfTwo(x: number): boolean;
    /**
     * Returns the next power of 2 for the specified value.
     * @param val - The value for which to calculate the next power of 2.
     * @returns The next power of 2.
     */
    function nextPowerOfTwo(val: number): number;
    /**
     * Return a pseudo-random number between min and max.
    The number generated is in the range [min, max), that is inclusive of the minimum but exclusive of the maximum.
     * @param min - Lower bound for range.
     * @param max - Upper bound for range.
     * @returns Pseudo-random number between the supplied range.
     */
    function random(min: number, max: number): number;
    /**
     * The function interpolates smoothly between two input values based on
    a third one that should be between the first two. The returned value is clamped
    between 0 and 1.
    <br/>The slope (i.e. derivative) of the smoothstep function starts at 0 and ends at 0.
    This makes it easy to create a sequence of transitions using smoothstep to interpolate
    each segment rather than using a more sophisticated or expensive interpolation technique.
    <br/>See http://en.wikipedia.org/wiki/Smoothstep for more details.
     * @param min - The lower bound of the interpolation range.
     * @param max - The upper bound of the interpolation range.
     * @param x - The value to interpolate.
     * @returns The smoothly interpolated value clamped between zero and one.
     */
    function smoothstep(min: number, max: number, x: number): number;
    /**
     * An improved version of the {@link math.smoothstep} function which has zero
    1st and 2nd order derivatives at t=0 and t=1.
    <br/>See http://en.wikipedia.org/wiki/Smoothstep for more details.
     * @param min - The lower bound of the interpolation range.
     * @param max - The upper bound of the interpolation range.
     * @param x - The value to interpolate.
     * @returns The smoothly interpolated value clamped between zero and one.
     */
    function smootherstep(min: number, max: number, x: number): number;
    /**
     * Rounds a number up to nearest multiple.
     * @param numToRound - The number to round up.
     * @param multiple - The multiple to round up to.
     * @returns A number rounded up to nearest multiple.
     */
    function roundUp(numToRound: number, multiple: number): number;
    /**
     * Converts float number to half float representation.
     * @param val - The float number.
     * @returns A 16 bit number representing half float representation as used by GPU.
     */
    function float2Half(val: number): number;
}

/**
 * Create a new Quat object.
 * @param [x] - The quaternion's x component. Default value 0. If x is an array of length 4, the array will be used to populate all components.
 * @param [y] - The quaternion's y component. Default value 0.
 * @param [z] - The quaternion's z component. Default value 0.
 * @param [w] - The quaternion's w component. Default value 1.
 */
export class Quat {
    constructor(x?: number | number[], y?: number, z?: number, w?: number);
    /**
     * The x component of the quaternion.
     * @example
     * var quat = new pc.Quat();
    
    // Get x
    var x = quat.x;
    
    // Set x
    quat.x = 0;
     */
    x: number;
    /**
     * The y component of the quaternion.
     * @example
     * var quat = new pc.Quat();
    
    // Get y
    var y = quat.y;
    
    // Set y
    quat.y = 0;
     */
    y: number;
    /**
     * The z component of the quaternion.
     * @example
     * var quat = new pc.Quat();
    
    // Get z
    var z = quat.z;
    
    // Set z
    quat.z = 0;
     */
    z: number;
    /**
     * The w component of the quaternion.
     * @example
     * var quat = new pc.Quat();
    
    // Get w
    var w = quat.w;
    
    // Set w
    quat.w = 0;
     */
    w: number;
    /**
     * Returns an identical copy of the specified quaternion.
     * @example
     * var q = new pc.Quat(-0.11, -0.15, -0.46, 0.87);
    var qclone = q.clone();
    
    console.log("The result of the cloning is: " + q.toString());
     * @returns A quaternion containing the result of the cloning.
     */
    clone(): Quat;
    /**
     * Copies the contents of a source quaternion to a destination quaternion.
     * @example
     * var src = new pc.Quat();
    var dst = new pc.Quat();
    dst.copy(src, src);
    console.log("The two quaternions are " + (src.equals(dst) ? "equal" : "different"));
     * @param rhs - The quaternion to be copied.
     * @returns Self for chaining.
     */
    copy(rhs: Quat): Quat;
    /**
     * Reports whether two quaternions are equal.
     * @example
     * var a = new pc.Quat();
    var b = new pc.Quat();
    console.log("The two quaternions are " + (a.equals(b) ? "equal" : "different"));
     * @param rhs - The quaternion to be compared against.
     * @returns True if the quaternions are equal and false otherwise.
     */
    equals(rhs: Quat): boolean;
    /**
     * Gets the rotation axis and angle for a given
     quaternion. If a quaternion is created with
     setFromAxisAngle, this method will return the same
     values as provided in the original parameter list
     OR functionally equivalent values.
     * @example
     * var q = new pc.Quat();
    q.setFromAxisAngle(new pc.Vec3(0, 1, 0), 90);
    var v = new pc.Vec3();
    var angle = q.getAxisAngle(v);
    // Should output 90
    console.log(angle);
    // Should output [0, 1, 0]
    console.log(v.toString());
     * @param axis - The 3-dimensional vector to receive the axis of rotation.
     * @returns Angle, in degrees, of the rotation.
     */
    getAxisAngle(axis: Vec3): number;
    /**
     * Converts the supplied quaternion to Euler angles.
     * @param [eulers] - The 3-dimensional vector to receive the Euler angles.
     * @returns The 3-dimensional vector holding the Euler angles that
    correspond to the supplied quaternion.
     */
    getEulerAngles(eulers?: Vec3): Vec3;
    /**
     * Generates the inverse of the specified quaternion.
     * @example
     * // Create a quaternion rotated 180 degrees around the y-axis
    var rot = new pc.Quat().setFromEulerAngles(0, 180, 0);
    
    // Invert in place
    rot.invert();
     * @returns Self for chaining.
     */
    invert(): Quat;
    /**
     * Returns the magnitude of the specified quaternion.
     * @example
     * var q = new pc.Quat(0, 0, 0, 5);
    var len = q.length();
    // Should output 5
    console.log("The length of the quaternion is: " + len);
     * @returns The magnitude of the specified quaternion.
     */
    length(): number;
    /**
     * Returns the magnitude squared of the specified quaternion.
     * @example
     * var q = new pc.Quat(3, 4, 0);
    var lenSq = q.lengthSq();
    // Should output 25
    console.log("The length squared of the quaternion is: " + lenSq);
     * @returns The magnitude of the specified quaternion.
     */
    lengthSq(): number;
    /**
     * Returns the result of multiplying the specified quaternions together.
     * @example
     * var a = new pc.Quat().setFromEulerAngles(0, 30, 0);
    var b = new pc.Quat().setFromEulerAngles(0, 60, 0);
    
    // a becomes a 90 degree rotation around the Y axis
    // In other words, a = a * b
    a.mul(b);
    
    console.log("The result of the multiplication is: " + a.toString());
     * @param rhs - The quaternion used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul(rhs: Quat): Quat;
    /**
     * Returns the result of multiplying the specified quaternions together.
     * @example
     * var a = new pc.Quat().setFromEulerAngles(0, 30, 0);
    var b = new pc.Quat().setFromEulerAngles(0, 60, 0);
    var r = new pc.Quat();
    
    // r is set to a 90 degree rotation around the Y axis
    // In other words, r = a * b
    r.mul2(a, b);
    
    console.log("The result of the multiplication is: " + r.toString());
     * @param lhs - The quaternion used as the first multiplicand of the operation.
     * @param rhs - The quaternion used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul2(lhs: Quat, rhs: Quat): Quat;
    /**
     * Returns the specified quaternion converted in place to a unit quaternion.
     * @example
     * var v = new pc.Quat(0, 0, 0, 5);
    
    v.normalize();
    
    // Should output 0, 0, 0, 1
    console.log("The result of the vector normalization is: " + v.toString());
     * @returns The result of the normalization.
     */
    normalize(): Quat;
    /**
     * Sets the specified quaternion to the supplied numerical values.
     * @example
     * var q = new pc.Quat();
    q.set(1, 0, 0, 0);
    
    // Should output 1, 0, 0, 0
    console.log("The result of the vector set is: " + q.toString());
     * @param x - The x component of the quaternion.
     * @param y - The y component of the quaternion.
     * @param z - The z component of the quaternion.
     * @param w - The w component of the quaternion.
     * @returns Self for chaining.
     */
    set(x: number, y: number, z: number, w: number): Quat;
    /**
     * Sets a quaternion from an angular rotation around an axis.
     * @example
     * var q = new pc.Quat();
    q.setFromAxisAngle(pc.Vec3.UP, 90);
     * @param axis - World space axis around which to rotate.
     * @param angle - Angle to rotate around the given axis in degrees.
     * @returns Self for chaining.
     */
    setFromAxisAngle(axis: Vec3, angle: number): Quat;
    /**
     * Sets a quaternion from Euler angles specified in XYZ order.
     * @example
     * var q = new pc.Quat();
    q.setFromEulerAngles(45, 90, 180);
     * @param ex - Angle to rotate around X axis in degrees.
     * @param ey - Angle to rotate around Y axis in degrees.
     * @param ez - Angle to rotate around Z axis in degrees.
     * @returns Self for chaining.
     */
    setFromEulerAngles(ex: number, ey: number, ez: number): Quat;
    /**
     * Converts the specified 4x4 matrix to a quaternion. Note that since
    a quaternion is purely a representation for orientation, only the translational part
    of the matrix is lost.
     * @example
     * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
    var rot = new pc.Mat4().setFromAxisAngle(pc.Vec3.UP, 180);
    
    // Convert to a quaternion
    var q = new pc.Quat().setFromMat4(rot);
     * @param m - The 4x4 matrix to convert.
     * @returns Self for chaining.
     */
    setFromMat4(m: Mat4): Quat;
    /**
     * Performs a spherical interpolation between two quaternions. The result of
    the interpolation is written to the quaternion calling the function.
     * @example
     * var q1 = new pc.Quat(-0.11, -0.15, -0.46, 0.87);
    var q2 = new pc.Quat(-0.21, -0.21, -0.67, 0.68);
    
    var result;
    result = new pc.Quat().slerp(q1, q2, 0);   // Return q1
    result = new pc.Quat().slerp(q1, q2, 0.5); // Return the midpoint interpolant
    result = new pc.Quat().slerp(q1, q2, 1);   // Return q2
     * @param lhs - The quaternion to interpolate from.
     * @param rhs - The quaternion to interpolate to.
     * @param alpha - The value controlling the interpolation in relation to the two input
    quaternions. The value is in the range 0 to 1, 0 generating q1, 1 generating q2 and anything
    in between generating a spherical interpolation between the two.
     * @returns Self for chaining.
     */
    slerp(lhs: Quat, rhs: Quat, alpha: number): Quat;
    /**
     * Transforms a 3-dimensional vector by the specified quaternion.
     * @example
     * // Create a 3-dimensional vector
    var v = new pc.Vec3(1, 2, 3);
    
    // Create a 4x4 rotation matrix
    var q = new pc.Quat().setFromEulerAngles(10, 20, 30);
    
    var tv = q.transformVector(v);
     * @param vec - The 3-dimensional vector to be transformed.
     * @param [res] - An optional 3-dimensional vector to receive the result of the transformation.
     * @returns The input vector v transformed by the current instance.
     */
    transformVector(vec: Vec3, res?: Vec3): Vec3;
    /**
     * Converts the quaternion to string form.
     * @example
     * var v = new pc.Quat(0, 0, 0, 1);
    // Should output '[0, 0, 0, 1]'
    console.log(v.toString());
     * @returns The quaternion in string form.
     */
    toString(): string;
    /**
     * A constant quaternion set to [0, 0, 0, 1] (the identity).
     */
    static readonly IDENTITY: Quat;
    /**
     * A constant quaternion set to [0, 0, 0, 0].
     */
    static readonly ZERO: Quat;
}

/**
 * Creates a new Vec2 object.
 * @example
 * var v = new pc.Vec2(1, 2);
 * @param [x] - The x value. If x is an array of length 2, the array will be used to populate all components.
 * @param [y] - The y value.
 */
export class Vec2 {
    constructor(x?: number | number[], y?: number);
    /**
     * The first element of the vector.
     * @example
     * var vec = new pc.Vec2(10, 20);
    
    // Get x
    var x = vec.x;
    
    // Set x
    vec.x = 0;
     */
    x: number;
    /**
     * The second element of the vector.
     * @example
     * var vec = new pc.Vec2(10, 20);
    
    // Get y
    var y = vec.y;
    
    // Set y
    vec.y = 0;
     */
    y: number;
    /**
     * Adds a 2-dimensional vector to another in place.
     * @example
     * var a = new pc.Vec2(10, 10);
    var b = new pc.Vec2(20, 20);
    
    a.add(b);
    
    // Should output [30, 30]
    console.log("The result of the addition is: " + a.toString());
     * @param rhs - The vector to add to the specified vector.
     * @returns Self for chaining.
     */
    add(rhs: Vec2): Vec2;
    /**
     * Adds two 2-dimensional vectors together and returns the result.
     * @example
     * var a = new pc.Vec2(10, 10);
    var b = new pc.Vec2(20, 20);
    var r = new pc.Vec2();
    
    r.add2(a, b);
    // Should output [30, 30]
    
    console.log("The result of the addition is: " + r.toString());
     * @param lhs - The first vector operand for the addition.
     * @param rhs - The second vector operand for the addition.
     * @returns Self for chaining.
     */
    add2(lhs: Vec2, rhs: Vec2): Vec2;
    /**
     * Returns an identical copy of the specified 2-dimensional vector.
     * @example
     * var v = new pc.Vec2(10, 20);
    var vclone = v.clone();
    console.log("The result of the cloning is: " + vclone.toString());
     * @returns A 2-dimensional vector containing the result of the cloning.
     */
    clone(): Vec2;
    /**
     * Copied the contents of a source 2-dimensional vector to a destination 2-dimensional vector.
     * @example
     * var src = new pc.Vec2(10, 20);
    var dst = new pc.Vec2();
    
    dst.copy(src);
    
    console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
     * @param rhs - A vector to copy to the specified vector.
     * @returns Self for chaining.
     */
    copy(rhs: Vec2): Vec2;
    /**
     * Returns the result of a cross product operation performed on the two specified 2-dimensional vectors.
     * @example
     * var right = new pc.Vec2(1, 0);
    var up = new pc.Vec2(0, 1);
    var crossProduct = right.cross(up);
    
    // Should print 1
    console.log("The result of the cross product is: " + crossProduct);
     * @param rhs - The second 2-dimensional vector operand of the cross product.
     * @returns The cross product of the two vectors.
     */
    cross(rhs: Vec2): number;
    /**
     * Returns the distance between the two specified 2-dimensional vectors.
     * @example
     * var v1 = new pc.Vec2(5, 10);
    var v2 = new pc.Vec2(10, 20);
    var d = v1.distance(v2);
    console.log("The between v1 and v2 is: " + d);
     * @param rhs - The second 2-dimensional vector to test.
     * @returns The distance between the two vectors.
     */
    distance(rhs: Vec2): number;
    /**
     * Returns the result of a dot product operation performed on the two specified 2-dimensional vectors.
     * @example
     * var v1 = new pc.Vec2(5, 10);
    var v2 = new pc.Vec2(10, 20);
    var v1dotv2 = v1.dot(v2);
    console.log("The result of the dot product is: " + v1dotv2);
     * @param rhs - The second 2-dimensional vector operand of the dot product.
     * @returns The result of the dot product operation.
     */
    dot(rhs: Vec2): number;
    /**
     * Reports whether two vectors are equal.
     * @example
     * var a = new pc.Vec2(1, 2);
    var b = new pc.Vec2(4, 5);
    console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
     * @param rhs - The vector to compare to the specified vector.
     * @returns True if the vectors are equal and false otherwise.
     */
    equals(rhs: Vec2): boolean;
    /**
     * Returns the magnitude of the specified 2-dimensional vector.
     * @example
     * var vec = new pc.Vec2(3, 4);
    var len = vec.length();
    // Should output 5
    console.log("The length of the vector is: " + len);
     * @returns The magnitude of the specified 2-dimensional vector.
     */
    length(): number;
    /**
     * Returns the magnitude squared of the specified 2-dimensional vector.
     * @example
     * var vec = new pc.Vec2(3, 4);
    var len = vec.lengthSq();
    // Should output 25
    console.log("The length squared of the vector is: " + len);
     * @returns The magnitude of the specified 2-dimensional vector.
     */
    lengthSq(): number;
    /**
     * Returns the result of a linear interpolation between two specified 2-dimensional vectors.
     * @example
     * var a = new pc.Vec2(0, 0);
    var b = new pc.Vec2(10, 10);
    var r = new pc.Vec2();
    
    r.lerp(a, b, 0);   // r is equal to a
    r.lerp(a, b, 0.5); // r is 5, 5
    r.lerp(a, b, 1);   // r is equal to b
     * @param lhs - The 2-dimensional to interpolate from.
     * @param rhs - The 2-dimensional to interpolate to.
     * @param alpha - The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
    will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
    a ray extrapolated from this line.
     * @returns Self for chaining.
     */
    lerp(lhs: Vec2, rhs: Vec2, alpha: number): Vec2;
    /**
     * Multiplies a 2-dimensional vector to another in place.
     * @example
     * var a = new pc.Vec2(2, 3);
    var b = new pc.Vec2(4, 5);
    
    a.mul(b);
    
    // Should output 8, 15
    console.log("The result of the multiplication is: " + a.toString());
     * @param rhs - The 2-dimensional vector used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul(rhs: Vec2): Vec2;
    /**
     * Returns the result of multiplying the specified 2-dimensional vectors together.
     * @example
     * var a = new pc.Vec2(2, 3);
    var b = new pc.Vec2(4, 5);
    var r = new pc.Vec2();
    
    r.mul2(a, b);
    
    // Should output 8, 15
    console.log("The result of the multiplication is: " + r.toString());
     * @param lhs - The 2-dimensional vector used as the first multiplicand of the operation.
     * @param rhs - The 2-dimensional vector used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul2(lhs: Vec2, rhs: Vec2): Vec2;
    /**
     * Returns this 2-dimensional vector converted to a unit vector in place.
    If the vector has a length of zero, the vector's elements will be set to zero.
     * @example
     * var v = new pc.Vec2(25, 0);
    
    v.normalize();
    
    // Should output 1, 0
    console.log("The result of the vector normalization is: " + v.toString());
     * @returns Self for chaining.
     */
    normalize(): Vec2;
    /**
     * Scales each component of the specified 2-dimensional vector by the supplied
    scalar value.
     * @example
     * var v = new pc.Vec2(2, 4);
    
    // Multiply by 2
    v.scale(2);
    
    // Negate
    v.scale(-1);
    
    // Divide by 2
    v.scale(0.5);
     * @param scalar - The value by which each vector component is multiplied.
     * @returns Self for chaining.
     */
    scale(scalar: number): Vec2;
    /**
     * Sets the specified 2-dimensional vector to the supplied numerical values.
     * @example
     * var v = new pc.Vec2();
    v.set(5, 10);
    
    // Should output 5, 10
    console.log("The result of the vector set is: " + v.toString());
     * @param x - The value to set on the first component of the vector.
     * @param y - The value to set on the second component of the vector.
     * @returns Self for chaining.
     */
    set(x: number, y: number): Vec2;
    /**
     * Subtracts a 2-dimensional vector from another in place.
     * @example
     * var a = new pc.Vec2(10, 10);
    var b = new pc.Vec2(20, 20);
    
    a.sub(b);
    
    // Should output [-10, -10]
    console.log("The result of the subtraction is: " + a.toString());
     * @param rhs - The vector to add to the specified vector.
     * @returns Self for chaining.
     */
    sub(rhs: Vec2): Vec2;
    /**
     * Subtracts two 2-dimensional vectors from one another and returns the result.
     * @example
     * var a = new pc.Vec2(10, 10);
    var b = new pc.Vec2(20, 20);
    var r = new pc.Vec2();
    
    r.sub2(a, b);
    
    // Should output [-10, -10]
    console.log("The result of the subtraction is: " + r.toString());
     * @param lhs - The first vector operand for the addition.
     * @param rhs - The second vector operand for the addition.
     * @returns Self for chaining.
     */
    sub2(lhs: Vec2, rhs: Vec2): Vec2;
    /**
     * Converts the vector to string form.
     * @example
     * var v = new pc.Vec2(20, 10);
    // Should output '[20, 10]'
    console.log(v.toString());
     * @returns The vector in string form.
     */
    toString(): string;
    /**
     * A constant vector set to [0, 0].
     */
    static readonly ZERO: Vec2;
    /**
     * A constant vector set to [1, 1].
     */
    static readonly ONE: Vec2;
    /**
     * A constant vector set to [0, 1].
     */
    static readonly UP: Vec2;
    /**
     * A constant vector set to [0, -1].
     */
    static readonly DOWN: Vec2;
    /**
     * A constant vector set to [1, 0].
     */
    static readonly RIGHT: Vec2;
    /**
     * A constant vector set to [-1, 0].
     */
    static readonly LEFT: Vec2;
}

/**
 * Creates a new Vec3 object.
 * @example
 * var v = new pc.Vec3(1, 2, 3);
 * @param [x] - The x value. If x is an array of length 3, the array will be used to populate all components.
 * @param [y] - The y value.
 * @param [z] - The z value.
 */
export class Vec3 {
    constructor(x?: number | number[], y?: number, z?: number);
    /**
     * The first component of the vector.
     * @example
     * var vec = new pc.Vec3(10, 20, 30);
    
    // Get x
    var x = vec.x;
    
    // Set x
    vec.x = 0;
     */
    x: number;
    /**
     * The second component of the vector.
     * @example
     * var vec = new pc.Vec3(10, 20, 30);
    
    // Get y
    var y = vec.y;
    
    // Set y
    vec.y = 0;
     */
    y: number;
    /**
     * The third component of the vector.
     * @example
     * var vec = new pc.Vec3(10, 20, 30);
    
    // Get z
    var z = vec.z;
    
    // Set z
    vec.z = 0;
     */
    z: number;
    /**
     * Adds a 3-dimensional vector to another in place.
     * @example
     * var a = new pc.Vec3(10, 10, 10);
    var b = new pc.Vec3(20, 20, 20);
    
    a.add(b);
    
    // Should output [30, 30, 30]
    console.log("The result of the addition is: " + a.toString());
     * @param rhs - The vector to add to the specified vector.
     * @returns Self for chaining.
     */
    add(rhs: Vec3): Vec3;
    /**
     * Adds two 3-dimensional vectors together and returns the result.
     * @example
     * var a = new pc.Vec3(10, 10, 10);
    var b = new pc.Vec3(20, 20, 20);
    var r = new pc.Vec3();
    
    r.add2(a, b);
    // Should output [30, 30, 30]
    
    console.log("The result of the addition is: " + r.toString());
     * @param lhs - The first vector operand for the addition.
     * @param rhs - The second vector operand for the addition.
     * @returns Self for chaining.
     */
    add2(lhs: Vec3, rhs: Vec3): Vec3;
    /**
     * Returns an identical copy of the specified 3-dimensional vector.
     * @example
     * var v = new pc.Vec3(10, 20, 30);
    var vclone = v.clone();
    console.log("The result of the cloning is: " + vclone.toString());
     * @returns A 3-dimensional vector containing the result of the cloning.
     */
    clone(): Vec3;
    /**
     * Copied the contents of a source 3-dimensional vector to a destination 3-dimensional vector.
     * @example
     * var src = new pc.Vec3(10, 20, 30);
    var dst = new pc.Vec3();
    
    dst.copy(src);
    
    console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
     * @param rhs - A vector to copy to the specified vector.
     * @returns Self for chaining.
     */
    copy(rhs: Vec3): Vec3;
    /**
     * Returns the result of a cross product operation performed on the two specified 3-dimensional vectors.
     * @example
     * var back = new pc.Vec3().cross(pc.Vec3.RIGHT, pc.Vec3.UP);
    
    // Should print the Z axis (i.e. [0, 0, 1])
    console.log("The result of the cross product is: " + back.toString());
     * @param lhs - The first 3-dimensional vector operand of the cross product.
     * @param rhs - The second 3-dimensional vector operand of the cross product.
     * @returns Self for chaining.
     */
    cross(lhs: Vec3, rhs: Vec3): Vec3;
    /**
     * Returns the distance between the two specified 3-dimensional vectors.
     * @example
     * var v1 = new pc.Vec3(5, 10, 20);
    var v2 = new pc.Vec3(10, 20, 40);
    var d = v1.distance(v2);
    console.log("The between v1 and v2 is: " + d);
     * @param rhs - The second 3-dimensional vector to test.
     * @returns The distance between the two vectors.
     */
    distance(rhs: Vec3): number;
    /**
     * Returns the result of a dot product operation performed on the two specified 3-dimensional vectors.
     * @example
     * var v1 = new pc.Vec3(5, 10, 20);
    var v2 = new pc.Vec3(10, 20, 40);
    var v1dotv2 = v1.dot(v2);
    console.log("The result of the dot product is: " + v1dotv2);
     * @param rhs - The second 3-dimensional vector operand of the dot product.
     * @returns The result of the dot product operation.
     */
    dot(rhs: Vec3): number;
    /**
     * Reports whether two vectors are equal.
     * @example
     * var a = new pc.Vec3(1, 2, 3);
    var b = new pc.Vec3(4, 5, 6);
    console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
     * @param rhs - The vector to compare to the specified vector.
     * @returns True if the vectors are equal and false otherwise.
     */
    equals(rhs: Vec3): boolean;
    /**
     * Returns the magnitude of the specified 3-dimensional vector.
     * @example
     * var vec = new pc.Vec3(3, 4, 0);
    var len = vec.length();
    // Should output 5
    console.log("The length of the vector is: " + len);
     * @returns The magnitude of the specified 3-dimensional vector.
     */
    length(): number;
    /**
     * Returns the magnitude squared of the specified 3-dimensional vector.
     * @example
     * var vec = new pc.Vec3(3, 4, 0);
    var len = vec.lengthSq();
    // Should output 25
    console.log("The length squared of the vector is: " + len);
     * @returns The magnitude of the specified 3-dimensional vector.
     */
    lengthSq(): number;
    /**
     * Returns the result of a linear interpolation between two specified 3-dimensional vectors.
     * @example
     * var a = new pc.Vec3(0, 0, 0);
    var b = new pc.Vec3(10, 10, 10);
    var r = new pc.Vec3();
    
    r.lerp(a, b, 0);   // r is equal to a
    r.lerp(a, b, 0.5); // r is 5, 5, 5
    r.lerp(a, b, 1);   // r is equal to b
     * @param lhs - The 3-dimensional to interpolate from.
     * @param rhs - The 3-dimensional to interpolate to.
     * @param alpha - The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
    will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
    a ray extrapolated from this line.
     * @returns Self for chaining.
     */
    lerp(lhs: Vec3, rhs: Vec3, alpha: number): Vec3;
    /**
     * Multiplies a 3-dimensional vector to another in place.
     * @example
     * var a = new pc.Vec3(2, 3, 4);
    var b = new pc.Vec3(4, 5, 6);
    
    a.mul(b);
    
    // Should output 8, 15, 24
    console.log("The result of the multiplication is: " + a.toString());
     * @param rhs - The 3-dimensional vector used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul(rhs: Vec3): Vec3;
    /**
     * Returns the result of multiplying the specified 3-dimensional vectors together.
     * @example
     * var a = new pc.Vec3(2, 3, 4);
    var b = new pc.Vec3(4, 5, 6);
    var r = new pc.Vec3();
    
    r.mul2(a, b);
    
    // Should output 8, 15, 24
    console.log("The result of the multiplication is: " + r.toString());
     * @param lhs - The 3-dimensional vector used as the first multiplicand of the operation.
     * @param rhs - The 3-dimensional vector used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul2(lhs: Vec3, rhs: Vec3): Vec3;
    /**
     * Returns this 3-dimensional vector converted to a unit vector in place.
    If the vector has a length of zero, the vector's elements will be set to zero.
     * @example
     * var v = new pc.Vec3(25, 0, 0);
    
    v.normalize();
    
    // Should output 1, 0, 0
    console.log("The result of the vector normalization is: " + v.toString());
     * @returns Self for chaining.
     */
    normalize(): Vec3;
    /**
     * Projects this 3-dimensional vector onto the specified vector.
     * @example
     * var v = new pc.Vec3(5, 5, 5);
    var normal = new pc.Vec3(1, 0, 0);
    
    v.project(normal);
    
    // Should output 5, 0, 0
    console.log("The result of the vector projection is: " + v.toString());
     * @param rhs - The vector onto which the original vector will be projected on.
     * @returns Self for chaining.
     */
    project(rhs: Vec3): Vec3;
    /**
     * Scales each dimension of the specified 3-dimensional vector by the supplied
    scalar value.
     * @example
     * var v = new pc.Vec3(2, 4, 8);
    
    // Multiply by 2
    v.scale(2);
    
    // Negate
    v.scale(-1);
    
    // Divide by 2
    v.scale(0.5);
     * @param scalar - The value by which each vector component is multiplied.
     * @returns Self for chaining.
     */
    scale(scalar: number): Vec3;
    /**
     * Sets the specified 3-dimensional vector to the supplied numerical values.
     * @example
     * var v = new pc.Vec3();
    v.set(5, 10, 20);
    
    // Should output 5, 10, 20
    console.log("The result of the vector set is: " + v.toString());
     * @param x - The value to set on the first component of the vector.
     * @param y - The value to set on the second component of the vector.
     * @param z - The value to set on the third component of the vector.
     * @returns Self for chaining.
     */
    set(x: number, y: number, z: number): Vec3;
    /**
     * Subtracts a 3-dimensional vector from another in place.
     * @example
     * var a = new pc.Vec3(10, 10, 10);
    var b = new pc.Vec3(20, 20, 20);
    
    a.sub(b);
    
    // Should output [-10, -10, -10]
    console.log("The result of the subtraction is: " + a.toString());
     * @param rhs - The vector to add to the specified vector.
     * @returns Self for chaining.
     */
    sub(rhs: Vec3): Vec3;
    /**
     * Subtracts two 3-dimensional vectors from one another and returns the result.
     * @example
     * var a = new pc.Vec3(10, 10, 10);
    var b = new pc.Vec3(20, 20, 20);
    var r = new pc.Vec3();
    
    r.sub2(a, b);
    
    // Should output [-10, -10, -10]
    console.log("The result of the subtraction is: " + r.toString());
     * @param lhs - The first vector operand for the addition.
     * @param rhs - The second vector operand for the addition.
     * @returns Self for chaining.
     */
    sub2(lhs: Vec3, rhs: Vec3): Vec3;
    /**
     * Converts the vector to string form.
     * @example
     * var v = new pc.Vec3(20, 10, 5);
    // Should output '[20, 10, 5]'
    console.log(v.toString());
     * @returns The vector in string form.
     */
    toString(): string;
    /**
     * A constant vector set to [0, 0, 0].
     */
    static readonly ZERO: Vec3;
    /**
     * A constant vector set to [1, 1, 1].
     */
    static readonly ONE: Vec3;
    /**
     * A constant vector set to [0, 1, 0].
     */
    static readonly UP: Vec3;
    /**
     * A constant vector set to [0, -1, 0].
     */
    static readonly DOWN: Vec3;
    /**
     * A constant vector set to [1, 0, 0].
     */
    static readonly RIGHT: Vec3;
    /**
     * A constant vector set to [-1, 0, 0].
     */
    static readonly LEFT: Vec3;
    /**
     * A constant vector set to [0, 0, -1].
     */
    static readonly FORWARD: Vec3;
    /**
     * A constant vector set to [0, 0, 1].
     */
    static readonly BACK: Vec3;
}

/**
 * Creates a new Vec4 object.
 * @example
 * var v = new pc.Vec4(1, 2, 3, 4);
 * @param [x] - The x value. If x is an array of length 4, the array will be used to populate all components.
 * @param [y] - The y value.
 * @param [z] - The z value.
 * @param [w] - The w value.
 */
export class Vec4 {
    constructor(x?: number | number[], y?: number, z?: number, w?: number);
    /**
     * The first component of the vector.
     * @example
     * var vec = new pc.Vec4(10, 20, 30, 40);
    
    // Get x
    var x = vec.x;
    
    // Set x
    vec.x = 0;
     */
    x: number;
    /**
     * The second component of the vector.
     * @example
     * var vec = new pc.Vec4(10, 20, 30, 40);
    
    // Get y
    var y = vec.y;
    
    // Set y
    vec.y = 0;
     */
    y: number;
    /**
     * The third component of the vector.
     * @example
     * var vec = new pc.Vec4(10, 20, 30, 40);
    
    // Get z
    var z = vec.z;
    
    // Set z
    vec.z = 0;
     */
    z: number;
    /**
     * The fourth component of the vector.
     * @example
     * var vec = new pc.Vec4(10, 20, 30, 40);
    
    // Get w
    var w = vec.w;
    
    // Set w
    vec.w = 0;
     */
    w: number;
    /**
     * Adds a 4-dimensional vector to another in place.
     * @example
     * var a = new pc.Vec4(10, 10, 10, 10);
    var b = new pc.Vec4(20, 20, 20, 20);
    
    a.add(b);
    
    // Should output [30, 30, 30]
    console.log("The result of the addition is: " + a.toString());
     * @param rhs - The vector to add to the specified vector.
     * @returns Self for chaining.
     */
    add(rhs: Vec4): Vec4;
    /**
     * Adds two 4-dimensional vectors together and returns the result.
     * @example
     * var a = new pc.Vec4(10, 10, 10, 10);
    var b = new pc.Vec4(20, 20, 20, 20);
    var r = new pc.Vec4();
    
    r.add2(a, b);
    // Should output [30, 30, 30]
    
    console.log("The result of the addition is: " + r.toString());
     * @param lhs - The first vector operand for the addition.
     * @param rhs - The second vector operand for the addition.
     * @returns Self for chaining.
     */
    add2(lhs: Vec4, rhs: Vec4): Vec4;
    /**
     * Returns an identical copy of the specified 4-dimensional vector.
     * @example
     * var v = new pc.Vec4(10, 20, 30, 40);
    var vclone = v.clone();
    console.log("The result of the cloning is: " + vclone.toString());
     * @returns A 4-dimensional vector containing the result of the cloning.
     */
    clone(): Vec4;
    /**
     * Copied the contents of a source 4-dimensional vector to a destination 4-dimensional vector.
     * @example
     * var src = new pc.Vec4(10, 20, 30, 40);
    var dst = new pc.Vec4();
    
    dst.copy(src);
    
    console.log("The two vectors are " + (dst.equals(src) ? "equal" : "different"));
     * @param rhs - A vector to copy to the specified vector.
     * @returns Self for chaining.
     */
    copy(rhs: Vec4): Vec4;
    /**
     * Returns the result of a dot product operation performed on the two specified 4-dimensional vectors.
     * @example
     * var v1 = new pc.Vec4(5, 10, 20, 40);
    var v2 = new pc.Vec4(10, 20, 40, 80);
    var v1dotv2 = v1.dot(v2);
    console.log("The result of the dot product is: " + v1dotv2);
     * @param rhs - The second 4-dimensional vector operand of the dot product.
     * @returns The result of the dot product operation.
     */
    dot(rhs: Vec4): number;
    /**
     * Reports whether two vectors are equal.
     * @example
     * var a = new pc.Vec4(1, 2, 3, 4);
    var b = new pc.Vec4(5, 6, 7, 8);
    console.log("The two vectors are " + (a.equals(b) ? "equal" : "different"));
     * @param rhs - The vector to compare to the specified vector.
     * @returns True if the vectors are equal and false otherwise.
     */
    equals(rhs: Vec4): boolean;
    /**
     * Returns the magnitude of the specified 4-dimensional vector.
     * @example
     * var vec = new pc.Vec4(3, 4, 0, 0);
    var len = vec.length();
    // Should output 5
    console.log("The length of the vector is: " + len);
     * @returns The magnitude of the specified 4-dimensional vector.
     */
    length(): number;
    /**
     * Returns the magnitude squared of the specified 4-dimensional vector.
     * @example
     * var vec = new pc.Vec4(3, 4, 0);
    var len = vec.lengthSq();
    // Should output 25
    console.log("The length squared of the vector is: " + len);
     * @returns The magnitude of the specified 4-dimensional vector.
     */
    lengthSq(): number;
    /**
     * Returns the result of a linear interpolation between two specified 4-dimensional vectors.
     * @example
     * var a = new pc.Vec4(0, 0, 0, 0);
    var b = new pc.Vec4(10, 10, 10, 10);
    var r = new pc.Vec4();
    
    r.lerp(a, b, 0);   // r is equal to a
    r.lerp(a, b, 0.5); // r is 5, 5, 5, 5
    r.lerp(a, b, 1);   // r is equal to b
     * @param lhs - The 4-dimensional to interpolate from.
     * @param rhs - The 4-dimensional to interpolate to.
     * @param alpha - The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
    will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
    a ray extrapolated from this line.
     * @returns Self for chaining.
     */
    lerp(lhs: Vec4, rhs: Vec4, alpha: number): Vec4;
    /**
     * Multiplies a 4-dimensional vector to another in place.
     * @example
     * var a = new pc.Vec4(2, 3, 4, 5);
    var b = new pc.Vec4(4, 5, 6, 7);
    
    a.mul(b);
    
    // Should output 8, 15, 24, 35
    console.log("The result of the multiplication is: " + a.toString());
     * @param rhs - The 4-dimensional vector used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul(rhs: Vec4): Vec4;
    /**
     * Returns the result of multiplying the specified 4-dimensional vectors together.
     * @example
     * var a = new pc.Vec4(2, 3, 4, 5);
    var b = new pc.Vec4(4, 5, 6, 7);
    var r = new pc.Vec4();
    
    r.mul2(a, b);
    
    // Should output 8, 15, 24, 35
    console.log("The result of the multiplication is: " + r.toString());
     * @param lhs - The 4-dimensional vector used as the first multiplicand of the operation.
     * @param rhs - The 4-dimensional vector used as the second multiplicand of the operation.
     * @returns Self for chaining.
     */
    mul2(lhs: Vec4, rhs: Vec4): Vec4;
    /**
     * Returns this 4-dimensional vector converted to a unit vector in place.
    If the vector has a length of zero, the vector's elements will be set to zero.
     * @example
     * var v = new pc.Vec4(25, 0, 0, 0);
    
    v.normalize();
    
    // Should output 1, 0, 0, 0
    console.log("The result of the vector normalization is: " + v.toString());
     * @returns Self for chaining.
     */
    normalize(): Vec4;
    /**
     * Scales each dimension of the specified 4-dimensional vector by the supplied
    scalar value.
     * @example
     * var v = new pc.Vec4(2, 4, 8, 16);
    
    // Multiply by 2
    v.scale(2);
    
    // Negate
    v.scale(-1);
    
    // Divide by 2
    v.scale(0.5);
     * @param scalar - The value by which each vector component is multiplied.
     * @returns Self for chaining.
     */
    scale(scalar: number): Vec4;
    /**
     * Sets the specified 4-dimensional vector to the supplied numerical values.
     * @example
     * var v = new pc.Vec4();
    v.set(5, 10, 20, 40);
    
    // Should output 5, 10, 20, 40
    console.log("The result of the vector set is: " + v.toString());
     * @param x - The value to set on the first component of the vector.
     * @param y - The value to set on the second component of the vector.
     * @param z - The value to set on the third component of the vector.
     * @param w - The value to set on the fourth component of the vector.
     * @returns Self for chaining.
     */
    set(x: number, y: number, z: number, w: number): Vec4;
    /**
     * Subtracts a 4-dimensional vector from another in place.
     * @example
     * var a = new pc.Vec4(10, 10, 10, 10);
    var b = new pc.Vec4(20, 20, 20, 20);
    
    a.sub(b);
    
    // Should output [-10, -10, -10, -10]
    console.log("The result of the subtraction is: " + a.toString());
     * @param rhs - The vector to add to the specified vector.
     * @returns Self for chaining.
     */
    sub(rhs: Vec4): Vec4;
    /**
     * Subtracts two 4-dimensional vectors from one another and returns the result.
     * @example
     * var a = new pc.Vec4(10, 10, 10, 10);
    var b = new pc.Vec4(20, 20, 20, 20);
    var r = new pc.Vec4();
    
    r.sub2(a, b);
    
    // Should output [-10, -10, -10, -10]
    console.log("The result of the subtraction is: " + r.toString());
     * @param lhs - The first vector operand for the subtraction.
     * @param rhs - The second vector operand for the subtraction.
     * @returns Self for chaining.
     */
    sub2(lhs: Vec4, rhs: Vec4): Vec4;
    /**
     * Converts the vector to string form.
     * @example
     * var v = new pc.Vec4(20, 10, 5, 0);
    // Should output '[20, 10, 5, 0]'
    console.log(v.toString());
     * @returns The vector in string form.
     */
    toString(): string;
    /**
     * A constant vector set to [0, 0, 0, 0].
     */
    static readonly ZERO: Vec4;
    /**
     * A constant vector set to [1, 1, 1, 1].
     */
    static readonly ONE: Vec4;
}

/**
 * Create a new Http instance. By default, a PlayCanvas application creates an instance of this
object at `http`.
 */
export class Http {
    /**
     * Perform an HTTP GET request to the given url.
     * @example
     * pc.http.get("http://example.com/", function (err, response) {
        console.log(response);
    });
     * @param url - The URL to make the request to.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    get(url: string, callback: callbacks.HttpResponse): XMLHttpRequest;
    /**
     * Perform an HTTP GET request to the given url with addtional options such as headers, retries, credentials, etc.
     * @example
     * pc.http.get("http://example.com/", { "retry": true, "maxRetries": 5 }, function (err, response) {
        console.log(response);
    });
     * @param url - The URL to make the request to.
     * @param options - Additional options.
     * @param [options.headers] - HTTP headers to add to the request.
     * @param [options.async] - Make the request asynchronously. Defaults to true.
     * @param [options.cache] - If false, then add a timestamp to the request to prevent caching.
     * @param [options.withCredentials] - Send cookies with this request. Defaults to false.
     * @param [options.responseType] - Override the response type.
     * @param [options.postdata] - Data to send in the body of the request.
    Some content types are handled automatically. If postdata is an XML Document, it is handled. If
    the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
    Otherwise, by default, the data is sent as form-urlencoded.
     * @param [options.retry] - If true then if the request fails it will be retried with an exponential backoff.
     * @param [options.maxRetries] - If options.retry is true this specifies the maximum number of retries. Defaults to 5.
     * @param [options.maxRetryDelay] - If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    get(url: string, options: {
        headers?: any;
        async?: boolean;
        cache?: any;
        withCredentials?: boolean;
        responseType?: string;
        postdata?: Document | any;
        retry?: boolean;
        maxRetries?: number;
        maxRetryDelay?: number;
    }, callback: callbacks.HttpResponse): XMLHttpRequest;
    /**
     * Perform an HTTP POST request to the given url.
     * @example
     * pc.http.post("http://example.com/", { "name": "Alix" }, function (err, response) {
        console.log(response);
    });
     * @param url - The URL to make the request to.
     * @param data - Data to send in the body of the request.
    Some content types are handled automatically. If postdata is an XML Document, it is handled. If
    the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
    Otherwise, by default, the data is sent as form-urlencoded.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    post(url: string, data: any, callback: callbacks.HttpResponse): XMLHttpRequest;
    /**
     * Perform an HTTP POST request to the given url with addtional options such as headers, retries, credentials, etc.
     * @example
     * pc.http.post("http://example.com/", { "name": "Alix" }, { "retry": true, "maxRetries": 5 }, function (err, response) {
        console.log(response);
    });
     * @param url - The URL to make the request to.
     * @param data - Data to send in the body of the request.
    Some content types are handled automatically. If postdata is an XML Document, it is handled. If
    the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
    Otherwise, by default, the data is sent as form-urlencoded.
     * @param options - Additional options.
     * @param [options.headers] - HTTP headers to add to the request.
     * @param [options.async] - Make the request asynchronously. Defaults to true.
     * @param [options.cache] - If false, then add a timestamp to the request to prevent caching.
     * @param [options.withCredentials] - Send cookies with this request. Defaults to false.
     * @param [options.responseType] - Override the response type.
     * @param [options.retry] - If true then if the request fails it will be retried with an exponential backoff.
     * @param [options.maxRetries] - If options.retry is true this specifies the maximum number of retries. Defaults to 5.
     * @param [options.maxRetryDelay] - If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    post(url: string, data: any, options: {
        headers?: any;
        async?: boolean;
        cache?: any;
        withCredentials?: boolean;
        responseType?: string;
        retry?: boolean;
        maxRetries?: number;
        maxRetryDelay?: number;
    }, callback: callbacks.HttpResponse): XMLHttpRequest;
    /**
     * Perform an HTTP PUT request to the given url.
     * @example
     * pc.http.put("http://example.com/", { "name": "Alix" }, function (err, response) {
        console.log(response);
    });
     * @param url - The URL to make the request to.
     * @param data - Data to send in the body of the request.
    Some content types are handled automatically. If postdata is an XML Document, it is handled. If
    the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
    Otherwise, by default, the data is sent as form-urlencoded.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    put(url: string, data: Document | any, callback: callbacks.HttpResponse): XMLHttpRequest;
    /**
     * Perform an HTTP PUT request to the given url with addtional options such as headers, retries, credentials, etc.
     * @example
     * pc.http.put("http://example.com/", { "name": "Alix" }, { "retry": true, "maxRetries": 5 }, function (err, response) {
        console.log(response);
    });
     * @param url - The URL to make the request to.
     * @param data - Data to send in the body of the request.
    Some content types are handled automatically. If postdata is an XML Document, it is handled. If
    the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
    Otherwise, by default, the data is sent as form-urlencoded.
     * @param options - Additional options.
     * @param [options.headers] - HTTP headers to add to the request.
     * @param [options.async] - Make the request asynchronously. Defaults to true.
     * @param [options.cache] - If false, then add a timestamp to the request to prevent caching.
     * @param [options.withCredentials] - Send cookies with this request. Defaults to false.
     * @param [options.responseType] - Override the response type.
     * @param [options.retry] - If true then if the request fails it will be retried with an exponential backoff.
     * @param [options.maxRetries] - If options.retry is true this specifies the maximum number of retries. Defaults to 5.
     * @param [options.maxRetryDelay] - If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    put(url: string, data: Document | any, options: {
        headers?: any;
        async?: boolean;
        cache?: any;
        withCredentials?: boolean;
        responseType?: string;
        retry?: boolean;
        maxRetries?: number;
        maxRetryDelay?: number;
    }, callback: callbacks.HttpResponse): XMLHttpRequest;
    /**
     * Perform an HTTP DELETE request to the given url.
     * @example
     * pc.http.del("http://example.com/", function (err, response) {
        console.log(response);
    });
     * @param url - The URL to make the request to.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    del(url: any, callback: callbacks.HttpResponse): XMLHttpRequest;
    /**
     * Perform an HTTP DELETE request to the given url with addtional options such as headers, retries, credentials, etc.
     * @example
     * pc.http.del("http://example.com/", { "retry": true, "maxRetries": 5 }, function (err, response) {
        console.log(response);
    });
     * @param url - The URL to make the request to.
     * @param options - Additional options.
     * @param [options.headers] - HTTP headers to add to the request.
     * @param [options.async] - Make the request asynchronously. Defaults to true.
     * @param [options.cache] - If false, then add a timestamp to the request to prevent caching.
     * @param [options.withCredentials] - Send cookies with this request. Defaults to false.
     * @param [options.responseType] - Override the response type.
     * @param [options.postdata] - Data to send in the body of the request.
    Some content types are handled automatically. If postdata is an XML Document, it is handled. If
    the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
    Otherwise, by default, the data is sent as form-urlencoded.
     * @param [options.retry] - If true then if the request fails it will be retried with an exponential backoff.
     * @param [options.maxRetries] - If options.retry is true this specifies the maximum number of retries. Defaults to 5.
     * @param [options.maxRetryDelay] - If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    del(url: any, options: {
        headers?: any;
        async?: boolean;
        cache?: any;
        withCredentials?: boolean;
        responseType?: string;
        postdata?: Document | any;
        retry?: boolean;
        maxRetries?: number;
        maxRetryDelay?: number;
    }, callback: callbacks.HttpResponse): XMLHttpRequest;
    /**
     * Make a general purpose HTTP request.
     * @example
     * pc.http.request("get", "http://example.com/", function (err, response) {
        console.log(response);
    });
     * @param method - The HTTP method "GET", "POST", "PUT", "DELETE".
     * @param url - The url to make the request to.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    request(method: string, url: string, callback: callbacks.HttpResponse): XMLHttpRequest;
    /**
     * Make a general purpose HTTP request with addtional options such as headers, retries, credentials, etc.
     * @example
     * pc.http.request("get", "http://example.com/", { "retry": true, "maxRetries": 5 }, function (err, response) {
        console.log(response);
    });
     * @param method - The HTTP method "GET", "POST", "PUT", "DELETE".
     * @param url - The url to make the request to.
     * @param options - Additional options.
     * @param [options.headers] - HTTP headers to add to the request.
     * @param [options.async] - Make the request asynchronously. Defaults to true.
     * @param [options.cache] - If false, then add a timestamp to the request to prevent caching.
     * @param [options.withCredentials] - Send cookies with this request. Defaults to false.
     * @param [options.retry] - If true then if the request fails it will be retried with an exponential backoff.
     * @param [options.maxRetries] - If options.retry is true this specifies the maximum number of retries. Defaults to 5.
     * @param [options.maxRetryDelay] - If options.retry is true this specifies the maximum amount of time to wait between retries in milliseconds. Defaults to 5000.
     * @param [options.responseType] - Override the response type.
     * @param [options.postdata] - Data to send in the body of the request.
    Some content types are handled automatically. If postdata is an XML Document, it is handled. If
    the Content-Type header is set to 'application/json' then the postdata is JSON stringified.
    Otherwise, by default, the data is sent as form-urlencoded.
     * @param callback - The callback used when the response has returned. Passed (err, data)
    where data is the response (format depends on response type: text, Object, ArrayBuffer, XML) and
    err is the error code.
     * @returns The request object.
     */
    request(method: string, url: string, options: {
        headers?: any;
        async?: boolean;
        cache?: any;
        withCredentials?: boolean;
        retry?: boolean;
        maxRetries?: number;
        maxRetryDelay?: number;
        responseType?: string;
        postdata?: Document | any;
    }, callback: callbacks.HttpResponse): XMLHttpRequest;
}

export interface AnimationHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading {@link Animation} resources.
 */
export class AnimationHandler implements ResourceHandler {
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

export interface AudioHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading {@link Sound} resources.
 * @param manager - The sound manager.
 */
export class AudioHandler implements ResourceHandler {
    constructor(manager: SoundManager);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

/**
 * Container for a list of animations, textures, materials and a model.
 * @property animations - Array of assets of animations in the GLB container.
 * @property textures - Array of assets of textures in the GLB container.
 * @property materials - Array of assets of materials in the GLB container.
 * @param data - The loaded GLB data.
 */
export class ContainerResource {
    constructor(data: any);
    /**
     * Array of assets of animations in the GLB container.
    */
    animations: Asset[];
    /**
     * Array of assets of textures in the GLB container.
    */
    textures: Asset[];
    /**
     * Array of assets of materials in the GLB container.
    */
    materials: Asset[];
}

export interface ContainerHandler extends ResourceHandler {
}

/**
 * Loads files that contain multiple resources. For example glTF files can contain
textures, models and animations.
The asset options object can be used to pass load time callbacks for handling the various resources
at different stages of loading. The table below lists the resource types and the corresponding
supported process functions.
```
|---------------------------------------------------------------------|
|  resource   |  preprocess |   process   |processAsync | postprocess |
|-------------+-------------+-------------+-------------+-------------|
| global      |      x      |             |             |      x      |
| node        |      x      |      x      |             |      x      |
| animation   |      x      |             |             |      x      |
| material    |      x      |      x      |             |      x      |
| image       |      x      |             |      x      |      x      |
| texture     |      x      |             |      x      |      x      |
| buffer      |      x      |             |      x      |      x      |
| bufferView  |      x      |             |      x      |      x      |
|---------------------------------------------------------------------|
```
For example, to receive a texture preprocess callback:
```javascript
var containerAsset = new pc.Asset(filename, 'container', { url: url, filename: filename }, null, {
    texture: {
        preprocess(gltfTexture) { console.log("texture preprocess"); }
    },
});
```
 * @param device - The graphics device that will be rendering.
 * @param defaultMaterial - The shared default material that is used in any place that a material is not specified.
 */
export class ContainerHandler implements ResourceHandler {
    constructor(device: GraphicsDevice, defaultMaterial: StandardMaterial);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

/**
 * Creates a &lt;style&gt; DOM element from a string that contains CSS.
 * @example
 * var css = 'body {height: 100;}';
var style = pc.createStyle(css);
document.head.appendChild(style);
 * @param cssString - A string that contains valid CSS.
 * @returns The style DOM element.
 */
export function createStyle(cssString: string): Element;

export interface CubemapHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading cubemap {@link Texture} resources.
 * @param device - The graphics device.
 * @param assets - The asset registry.
 * @param loader - The resource loader.
 */
export class CubemapHandler implements ResourceHandler {
    constructor(device: GraphicsDevice, assets: AssetRegistry, loader: ResourceLoader);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

export interface FontHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading {@link Font} resources.
 * @param loader - The resource loader.
 */
export class FontHandler implements ResourceHandler {
    constructor(loader: ResourceLoader);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

/**
 * Interface for ResourceHandlers used by {@link ResourceLoader}.
 */
export interface ResourceHandler {
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
    /**
     * Optional function to perform any operations on a resource, that requires a dependency on its asset data
    or any other asset data.
     * @param asset - The asset to patch.
     * @param assets - The asset registry.
     */
    patch?(asset: Asset, assets: AssetRegistry): void;
}

/**
 * Load resource data, potentially from remote sources. Caches resource on load to prevent
multiple requests. Add ResourceHandlers to handle different types of resources.
 * @param app - The application.
 */
export class ResourceLoader {
    constructor(app: Application);
    /**
     * Add a {@link ResourceHandler} for a resource type. Handler should support atleast load() and open().
    Handlers can optionally support patch(asset, assets) to handle dependencies on other assets.
     * @example
     * var loader = new ResourceLoader();
    loader.addHandler("json", new pc.JsonHandler());
     * @param type - The name of the resource type that the handler will be registered with. Can be:
    
    * {@link ASSET_ANIMATION}
    * {@link ASSET_AUDIO}
    * {@link ASSET_IMAGE}
    * {@link ASSET_JSON}
    * {@link ASSET_MODEL}
    * {@link ASSET_MATERIAL}
    * {@link ASSET_TEXT}
    * {@link ASSET_TEXTURE}
    * {@link ASSET_CUBEMAP}
    * {@link ASSET_SHADER}
    * {@link ASSET_CSS}
    * {@link ASSET_HTML}
    * {@link ASSET_SCRIPT}
    * {@link ASSET_CONTAINER}
     * @param handler - An instance of a resource handler supporting atleast load() and open().
     */
    addHandler(type: string, handler: ResourceHandler): void;
    /**
     * Remove a {@link ResourceHandler} for a resource type.
     * @param type - The name of the type that the handler will be removed.
     */
    removeHandler(type: string): void;
    /**
     * Get a {@link ResourceHandler} for a resource type.
     * @param type - The name of the resource type that the handler is registered with.
     * @returns The registered handler.
     */
    getHandler(type: string): ResourceHandler;
    /**
     * Make a request for a resource from a remote URL. Parse the returned data using the
    handler for the specified type. When loaded and parsed, use the callback to return an instance of
    the resource.
     * @example
     * app.loader.load("../path/to/texture.png", "texture", function (err, texture) {
        // use texture here
    });
     * @param url - The URL of the resource to load.
     * @param type - The type of resource expected.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed into handler
    Passed (err, resource) where err is null if there are no errors.
     */
    load(url: string, type: string, callback: callbacks.ResourceLoader, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param type - The type of resource.
     * @param data - The raw resource data.
     * @returns The parsed resource data.
     */
    open(type: string, data: any): any;
    /**
     * Perform any operations on a resource, that requires a dependency on its asset data
    or any other asset data.
     * @param asset - The asset to patch.
     * @param assets - The asset registry.
     */
    patch(asset: Asset, assets: AssetRegistry): void;
    /**
     * Remove resource from cache.
     * @param url - The URL of the resource.
     * @param type - The type of resource.
     */
    clearCache(url: string, type: string): void;
    /**
     * Check cache for resource from a URL. If present, return the cached value.
     * @param url - The URL of the resource to get from the cache.
     * @param type - The type of the resource.
     * @returns The resource loaded from the cache.
     */
    getFromCache(url: string, type: string): any;
    /**
     * Destroys the resource loader.
     */
    destroy(): void;
}

export interface MaterialHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading {@link Material} resources.
 * @param app - The running {@link Application}.
 */
export class MaterialHandler implements ResourceHandler {
    constructor(app: Application);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

export interface ModelHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading {@link Model} resources.
 * @param device - The graphics device that will be rendering.
 * @param defaultMaterial - The shared default material that is used in any place that a material is not specified.
 */
export class ModelHandler implements ResourceHandler {
    constructor(device: GraphicsDevice, defaultMaterial: StandardMaterial);
    /**
     * Add a parser that converts raw data into a {@link Model}
    Default parser is for JSON models.
     * @param parser - See JsonModelParser for example.
     * @param decider - Function that decides on which parser to use.
    Function should take (url, data) arguments and return true if this parser should be used to parse the data into a {@link Model}.
    The first parser to return true is used.
     */
    addParser(parser: any, decider: callbacks.AddParser): void;
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

export interface BasisParser extends TextureParser {
}

/**
 * Parser for basis files.
 */
export class BasisParser implements TextureParser {
    /**
     * Load the texture from the remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - The URL of the resource to load.
     * @param url.load - The URL to use for loading the resource
     * @param url.original - The original URL useful for identifying the resource type
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load: string;
        original: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param asset - Optional asset which is passed in by ResourceLoader.
     * @param device - The graphics device
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset: Asset | null, device: GraphicsDevice): Texture;
}

export interface DdsParser extends TextureParser {
}

/**
 * Texture parser for dds files.
 */
export class DdsParser implements TextureParser {
    /**
     * Load the texture from the remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - The URL of the resource to load.
     * @param url.load - The URL to use for loading the resource
     * @param url.original - The original URL useful for identifying the resource type
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load: string;
        original: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param asset - Optional asset which is passed in by ResourceLoader.
     * @param device - The graphics device
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset: Asset | null, device: GraphicsDevice): Texture;
}

export interface ImgParser extends TextureParser {
}

/**
 * Parser for browser-supported image formats.
 */
export class ImgParser implements TextureParser {
    /**
     * Load the texture from the remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - The URL of the resource to load.
     * @param url.load - The URL to use for loading the resource
     * @param url.original - The original URL useful for identifying the resource type
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load: string;
        original: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param asset - Optional asset which is passed in by ResourceLoader.
     * @param device - The graphics device
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset: Asset | null, device: GraphicsDevice): Texture;
}

export interface KtxParser extends TextureParser {
}

/**
 * Texture parser for ktx files.
 */
export class KtxParser implements TextureParser {
    /**
     * Load the texture from the remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - The URL of the resource to load.
     * @param url.load - The URL to use for loading the resource
     * @param url.original - The original URL useful for identifying the resource type
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load: string;
        original: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param asset - Optional asset which is passed in by ResourceLoader.
     * @param device - The graphics device
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset: Asset | null, device: GraphicsDevice): Texture;
}

export interface LegacyDdsParser extends TextureParser {
}

/**
 * Legacy texture parser for dds files.
 */
export class LegacyDdsParser implements TextureParser {
    /**
     * Load the texture from the remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - The URL of the resource to load.
     * @param url.load - The URL to use for loading the resource
     * @param url.original - The original URL useful for identifying the resource type
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load: string;
        original: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param asset - Optional asset which is passed in by ResourceLoader.
     * @param device - The graphics device
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset: Asset | null, device: GraphicsDevice): Texture;
}

export interface RenderHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading {@link Render} resources.
 * @param device - The graphics device that will be rendering.
 * @param defaultMaterial - The shared default material that is used in any place that a material is not specified.
 */
export class RenderHandler implements ResourceHandler {
    constructor(device: GraphicsDevice, defaultMaterial: StandardMaterial);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

export interface SceneHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading {@link Scene} resources.
 * @param app - The running {@link Application}.
 */
export class SceneHandler implements ResourceHandler {
    constructor(app: Application);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

export interface ScriptHandler extends ResourceHandler {
}

/**
 * Resource handler for loading JavaScript files dynamically
Two types of JavaScript files can be loaded, PlayCanvas scripts which contain calls to {@link createScript},
or regular JavaScript files, such as third-party libraries.
 * @param app - The running {@link Application}.
 */
export class ScriptHandler implements ResourceHandler {
    constructor(app: Application);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

export interface SpriteHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading {@link Sprite} resources.
 * @param assets - The asset registry.
 * @param device - The graphics device.
 */
export class SpriteHandler implements ResourceHandler {
    constructor(assets: AssetRegistry, device: GraphicsDevice);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

export interface TextureAtlasHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading {@link TextureAtlas} resources.
 * @param loader - The resource loader.
 */
export class TextureAtlasHandler implements ResourceHandler {
    constructor(loader: ResourceLoader);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

/**
 * Interface to a texture parser. Implementations of this interface handle the loading
and opening of texture assets.
 */
export interface TextureParser {
    /**
     * Load the texture from the remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - The URL of the resource to load.
     * @param url.load - The URL to use for loading the resource
     * @param url.original - The original URL useful for identifying the resource type
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load: string;
        original: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param asset - Optional asset which is passed in by ResourceLoader.
     * @param device - The graphics device
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset: Asset | null, device: GraphicsDevice): Texture;
}

export interface TextureHandler extends ResourceHandler {
}

/**
 * Resource handler used for loading 2D and 3D {@link Texture} resources.
 * @param device - The graphics device.
 * @param assets - The asset registry.
 * @param loader - The resource loader.
 */
export class TextureHandler implements ResourceHandler {
    constructor(device: GraphicsDevice, assets: AssetRegistry, loader: ResourceLoader);
    /**
     * Load a resource from a remote URL. When loaded (or failed),
    use the callback to return an the raw resource data (or error).
     * @param url - Either the URL of the resource to load or a structure containing the
    load and original URL.
     * @param [url.load] - The URL to be used for loading the resource.
     * @param [url.original] - The original URL to be used for identifying the resource
    format. This is necessary when loading, for example from blob.
     * @param callback - The callback used when the resource is loaded or an error occurs.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     */
    load(url: {
        load?: string;
        original?: string;
    }, callback: callbacks.ResourceHandler, asset?: Asset): void;
    /**
     * Convert raw resource data into a resource instance. E.g. Take 3D model format JSON and return a {@link Model}.
     * @param url - The URL of the resource to open.
     * @param data - The raw resource data passed by callback from {@link ResourceHandler#load}.
     * @param [asset] - Optional asset that is passed by ResourceLoader.
     * @returns The parsed resource data.
     */
    open(url: string, data: any, asset?: Asset): any;
}

/**
 * Holds mesh batching settings and a unique id. Created via {@link BatchManager#addGroup}.
 * @property dynamic - Whether objects within this batch group should support transforming at runtime.
 * @property maxAabbSize - Maximum size of any dimension of a bounding box around batched objects.
{@link BatchManager#prepare} will split objects into local groups based on this size.
 * @property id - Unique id. Can be assigned to model and element components.
 * @property name - Name of the group.
 * @property [layers] - Layer ID array. Default is [{@link LAYERID_WORLD}]. The whole batch group will belong
to these layers. Layers of source models will be ignored.
 * @param id - Unique id. Can be assigned to model and element components.
 * @param name - The name of the group.
 * @param dynamic - Whether objects within this batch group should support transforming at runtime.
 * @param maxAabbSize - Maximum size of any dimension of a bounding box around batched objects.
{@link BatchManager#prepare} will split objects into local groups based on this size.
 * @param [layers] - Layer ID array. Default is [{@link LAYERID_WORLD}]. The whole batch group will belong
to these layers. Layers of source models will be ignored.
 */
export class BatchGroup {
    constructor(id: number, name: string, dynamic: boolean, maxAabbSize: number, layers?: number[]);
    /**
     * Whether objects within this batch group should support transforming at runtime.
    */
    dynamic: boolean;
    /**
     * Maximum size of any dimension of a bounding box around batched objects.
     * {@link BatchManager#prepare} will split objects into local groups based on this size.
    */
    maxAabbSize: number;
    /**
     * Unique id. Can be assigned to model and element components.
    */
    id: number;
    /**
     * Name of the group.
    */
    name: string;
    /**
     * Layer ID array. Default is [{@link LAYERID_WORLD}]. The whole batch group will belong
     * to these layers. Layers of source models will be ignored.
    */
    layers?: number[];
}

/**
 * Glues many mesh instances into a single one for better performance.
 * @param device - The graphics device used by the batch manager.
 * @param root - The entity under which batched models are added.
 * @param scene - The scene that the batch manager affects.
 */
export class BatchManager {
    constructor(device: GraphicsDevice, root: Entity, scene: Scene);
    /**
     * Adds new global batch group.
     * @param name - Custom name.
     * @param dynamic - Is this batch group dynamic? Will these objects move/rotate/scale after being batched?
     * @param maxAabbSize - Maximum size of any dimension of a bounding box around batched objects.
    {@link BatchManager#prepare} will split objects into local groups based on this size.
     * @param [id] - Optional custom unique id for the group (will be generated automatically otherwise).
     * @param [layers] - Optional layer ID array. Default is [{@link LAYERID_WORLD}]. The whole batch group will
    belong to these layers. Layers of source models will be ignored.
     * @returns Group object.
     */
    addGroup(name: string, dynamic: boolean, maxAabbSize: number, id?: number, layers?: number[]): BatchGroup;
    /**
     * Remove global batch group by id.
    Note, this traverses the entire scene graph and clears the batch group id from all components.
     * @param id - Batch Group ID.
     */
    removeGroup(id: number): void;
    /**
     * Mark a specific batch group as dirty. Dirty groups are re-batched before the next frame is rendered.
    Note, re-batching a group is a potentially expensive operation.
     * @param id - Batch Group ID to mark as dirty.
     */
    markGroupDirty(id: number): void;
    /**
     * Retrieves a {@link BatchGroup} object with a corresponding name, if it exists, or null otherwise.
     * @param name - Name.
     * @returns Group object.
     */
    getGroupByName(name: string): BatchGroup;
    /**
     * Destroys all batches and creates new based on scene models. Hides original models. Called by engine automatically on app start, and if batchGroupIds on models are changed.
     * @param [groupIds] - Optional array of batch group IDs to update. Otherwise all groups are updated.
     */
    generate(groupIds?: number[]): void;
    /**
     * Takes a list of mesh instances to be batched and sorts them into lists one for each draw call.
    The input list will be split, if:
    
    * Mesh instances use different materials.
    * Mesh instances have different parameters (e.g. lightmaps or static lights).
    * Mesh instances have different shader defines (shadow receiving, being aligned to screen space, etc).
    * Too many vertices for a single batch (65535 is maximum).
    * Too many instances for a single batch (hardware-dependent, expect 128 on low-end and 1024 on high-end).
    * Bounding box of a batch is larger than maxAabbSize in any dimension.
     * @param meshInstances - Input list of mesh instances
     * @param dynamic - Are we preparing for a dynamic batch? Instance count will matter then (otherwise not).
     * @param maxAabbSize - Maximum size of any dimension of a bounding box around batched objects.
     * @param translucent - Are we batching UI elements or sprites
    This is useful to keep a balance between the number of draw calls and the number of drawn triangles, because smaller batches can be hidden when not visible in camera.
     * @returns An array of arrays of mesh instances, each valid to pass to {@link BatchManager#create}.
     */
    prepare(meshInstances: MeshInstance[], dynamic: boolean, maxAabbSize: number, translucent: boolean): MeshInstance[][];
    /**
     * Takes a mesh instance list that has been prepared by {@link BatchManager#prepare}, and returns a {@link Batch} object. This method assumes that all mesh instances provided can be rendered in a single draw call.
     * @param meshInstances - Input list of mesh instances.
     * @param dynamic - Is it a static or dynamic batch? Will objects be transformed after batching?
     * @param [batchGroupId] - Link this batch to a specific batch group. This is done automatically with default batches.
     * @returns The resulting batch object.
     */
    create(meshInstances: MeshInstance[], dynamic: boolean, batchGroupId?: number): Batch;
    /**
     * Clones a batch. This method doesn't rebuild batch geometry, but only creates a new model and batch objects, linked to different source mesh instances.
     * @param batch - A batch object.
     * @param clonedMeshInstances - New mesh instances.
     * @returns New batch object.
     */
    clone(batch: Batch, clonedMeshInstances: MeshInstance[]): Batch;
}

/**
 * Holds information about batched mesh instances. Created in {@link BatchManager#create}.
 * @property origMeshInstances - An array of original mesh instances, from which this batch was generated.
 * @property meshInstance - A single combined mesh instance, the result of batching.
 * @property model - A handy model object.
 * @property dynamic - Whether this batch is dynamic (supports transforming mesh instances at runtime).
 * @property [batchGroupId] - Link this batch to a specific batch group. This is done automatically with default batches.
 * @param meshInstances - The mesh instances to be batched.
 * @param dynamic - Whether this batch is dynamic (supports transforming mesh instances at runtime).
 * @param batchGroupId - Link this batch to a specific batch group. This is done automatically with default batches.
 */
export class Batch {
    constructor(meshInstances: MeshInstance[], dynamic: boolean, batchGroupId: number);
    /**
     * An array of original mesh instances, from which this batch was generated.
    */
    origMeshInstances: MeshInstance[];
    /**
     * A single combined mesh instance, the result of batching.
    */
    meshInstance: MeshInstance;
    /**
     * A handy model object.
    */
    model: Model;
    /**
     * Whether this batch is dynamic (supports transforming mesh instances at runtime).
    */
    dynamic: boolean;
    /**
     * Link this batch to a specific batch group. This is done automatically with default batches.
    */
    batchGroupId?: number;
}

/**
 * Subtract the color of the source fragment from the destination fragment
and write the result to the frame buffer.
 */
export const BLEND_SUBTRACTIVE: number;

/**
 * Add the color of the source fragment to the destination fragment
and write the result to the frame buffer.
 */
export const BLEND_ADDITIVE: number;

/**
 * Enable simple translucency for materials such as glass. This is
equivalent to enabling a source blend mode of {@link BLENDMODE_SRC_ALPHA} and a destination
blend mode of {@link BLENDMODE_ONE_MINUS_SRC_ALPHA}.
 */
export const BLEND_NORMAL: number;

/**
 * Disable blending.
 */
export const BLEND_NONE: number;

/**
 * Similar to {@link BLEND_NORMAL} expect the source fragment is assumed to have
already been multiplied by the source alpha value.
 */
export const BLEND_PREMULTIPLIED: number;

/**
 * Multiply the color of the source fragment by the color of the destination
fragment and write the result to the frame buffer.
 */
export const BLEND_MULTIPLICATIVE: number;

/**
 * Same as {@link BLEND_ADDITIVE} except the source RGB is multiplied by the source alpha.
 */
export const BLEND_ADDITIVEALPHA: number;

/**
 * Multiplies colors and doubles the result.
 */
export const BLEND_MULTIPLICATIVE2X: number;

/**
 * Softer version of additive.
 */
export const BLEND_SCREEN: number;

/**
 * Minimum color. Check app.graphicsDevice.extBlendMinmax for support.
 */
export const BLEND_MIN: number;

/**
 * Maximum color. Check app.graphicsDevice.extBlendMinmax for support.
 */
export const BLEND_MAX: number;

/**
 * No fog is applied to the scene.
 */
export const FOG_NONE: string;

/**
 * Fog rises linearly from zero to 1 between a start and end depth.
 */
export const FOG_LINEAR: string;

/**
 * Fog rises according to an exponential curve controlled by a density value.
 */
export const FOG_EXP: string;

/**
 * Fog rises according to an exponential curve controlled by a density value.
 */
export const FOG_EXP2: string;

/**
 * No Fresnel.
 */
export const FRESNEL_NONE: number;

/**
 * Schlick's approximation of Fresnel.
 */
export const FRESNEL_SCHLICK: number;

/**
 * The world layer.
 */
export const LAYERID_WORLD: number;

/**
 * The depth layer.
 */
export const LAYERID_DEPTH: number;

/**
 * The skybox layer.
 */
export const LAYERID_SKYBOX: number;

/**
 * The immediate layer.
 */
export const LAYERID_IMMEDIATE: number;

/**
 * The UI layer.
 */
export const LAYERID_UI: number;

/**
 * Directional (global) light source.
 */
export const LIGHTTYPE_DIRECTIONAL: number;

/**
 * Point (local) light source.
 */
export const LIGHTTYPE_POINT: number;

/**
 * Spot (local) light source.
 */
export const LIGHTTYPE_SPOT: number;

/**
 * Linear distance falloff model for light attenuation.
 */
export const LIGHTFALLOFF_LINEAR: number;

/**
 * Inverse squared distance falloff model for light attenuation.
 */
export const LIGHTFALLOFF_INVERSESQUARED: number;

/**
 * Render depth (color-packed on WebGL 1.0), can be used for PCF 3x3 sampling.
 */
export const SHADOW_PCF3: number;

/**
 * Render packed variance shadow map. All shadow receivers must also cast shadows for this mode to work correctly.
 */
export const SHADOW_VSM8: number;

/**
 * Render 16-bit exponential variance shadow map. Requires OES_texture_half_float extension. Falls back to {@link SHADOW_VSM8}, if not supported.
 */
export const SHADOW_VSM16: number;

/**
 * Render 32-bit exponential variance shadow map. Requires OES_texture_float extension. Falls back to {@link SHADOW_VSM16}, if not supported.
 */
export const SHADOW_VSM32: number;

/**
 * Render depth buffer only, can be used for hardware-accelerated PCF 5x5 sampling. Requires WebGL2. Falls back to {@link SHADOW_PCF3} on WebGL 1.0.
 */
export const SHADOW_PCF5: number;

/**
 * Box filter.
 */
export const BLUR_BOX: number;

/**
 * Gaussian filter. May look smoother than box, but requires more samples.
 */
export const BLUR_GAUSSIAN: number;

/**
 * No sorting, particles are drawn in arbitrary order. Can be simulated on GPU.
 */
export const PARTICLESORT_NONE: number;

/**
 * Sorting based on distance to the camera. CPU only.
 */
export const PARTICLESORT_DISTANCE: number;

/**
 * Newer particles are drawn first. CPU only.
 */
export const PARTICLESORT_NEWER_FIRST: number;

/**
 * Older particles are drawn first. CPU only.
 */
export const PARTICLESORT_OLDER_FIRST: number;

/**
 * Box shape parameterized by emitterExtents. Initial velocity is directed towards local Z axis.
 */
export const EMITTERSHAPE_BOX: number;

/**
 * Sphere shape parameterized by emitterRadius. Initial velocity is directed outwards from the center.
 */
export const EMITTERSHAPE_SPHERE: number;

/**
 * Particles are facing camera.
 */
export const PARTICLEORIENTATION_SCREEN: number;

/**
 * User defines world space normal (particleNormal) to set planes orientation.
 */
export const PARTICLEORIENTATION_WORLD: number;

/**
 * Similar to previous, but the normal is affected by emitter(entity) transformation.
 */
export const PARTICLEORIENTATION_EMITTER: number;

/**
 * A perspective camera projection where the frustum shape is essentially pyramidal.
 */
export const PROJECTION_PERSPECTIVE: number;

/**
 * An orthographic camera projection where the frustum shape is essentially a cuboid.
 */
export const PROJECTION_ORTHOGRAPHIC: number;

/**
 * Render mesh instance as solid geometry.
 */
export const RENDERSTYLE_SOLID: number;

/**
 * Render mesh instance as wireframe.
 */
export const RENDERSTYLE_WIREFRAME: number;

/**
 * Render mesh instance as points.
 */
export const RENDERSTYLE_POINTS: number;

/**
 * The cube map is treated as if it is infinitely far away.
 */
export const CUBEPROJ_NONE: number;

/**
 * The cube map is box-projected based on a world space axis-aligned bounding box.
 */
export const CUBEPROJ_BOX: number;

/**
 * Phong without energy conservation. You should only use it as a backwards compatibility with older projects.
 */
export const SPECULAR_PHONG: number;

/**
 * Energy-conserving Blinn-Phong.
 */
export const SPECULAR_BLINN: number;

/**
 * Multiply together the primary and secondary colors.
 */
export const DETAILMODE_MUL: string;

/**
 * Add together the primary and secondary colors.
 */
export const DETAILMODE_ADD: string;

/**
 * Softer version of {@link DETAILMODE_ADD}.
 */
export const DETAILMODE_SCREEN: string;

/**
 * Multiplies or screens the colors, depending on the primary color.
 */
export const DETAILMODE_OVERLAY: string;

/**
 * Select whichever of the primary and secondary colors is darker, component-wise.
 */
export const DETAILMODE_MIN: string;

/**
 * Select whichever of the primary and secondary colors is lighter, component-wise.
 */
export const DETAILMODE_MAX: string;

/**
 * No gamma correction.
 */
export const GAMMA_NONE: number;

/**
 * Apply sRGB gamma correction.
 */
export const GAMMA_SRGB: number;

/**
 * Apply sRGB (fast) gamma correction.
 */
export const GAMMA_SRGBFAST: number;

/**
 * Apply sRGB (HDR) gamma correction.
 */
export const GAMMA_SRGBHDR: number;

/**
 * Linear tonemapping.
 */
export const TONEMAP_LINEAR: number;

/**
 * Filmic tonemapping curve.
 */
export const TONEMAP_FILMIC: number;

/**
 * Hejl filmic tonemapping curve.
 */
export const TONEMAP_HEJL: number;

/**
 * ACES filmic tonemapping curve.
 */
export const TONEMAP_ACES: number;

/**
 * ACES v2 filmic tonemapping curve.
 */
export const TONEMAP_ACES2: number;

/**
 * No specular occlusion.
 */
export const SPECOCC_NONE: number;

/**
 * Use AO directly to occlude specular.
 */
export const SPECOCC_AO: number;

/**
 * Modify AO based on material glossiness/view angle to occlude specular.
 */
export const SPECOCC_GLOSSDEPENDENT: number;

/**
 * The shadow map is not to be updated.
 */
export const SHADOWUPDATE_NONE: number;

/**
 * The shadow map is regenerated this frame and not on subsequent frames.
 */
export const SHADOWUPDATE_THISFRAME: number;

/**
 * The shadow map is regenerated every frame.
 */
export const SHADOWUPDATE_REALTIME: number;

/**
 * Render shaded materials with gamma correction and tonemapping.
 */
export const SHADER_FORWARD: number;

/**
 * Render shaded materials without gamma correction and tonemapping.
 */
export const SHADER_FORWARDHDR: number;

/**
 * Render RGBA-encoded depth value.
 */
export const SHADER_DEPTH: number;

/**
 * This mode renders a sprite as a simple quad.
 */
export const SPRITE_RENDERMODE_SIMPLE: number;

/**
 * This mode renders a sprite using 9-slicing in 'sliced' mode. Sliced mode stretches the
top and bottom regions of the sprite horizontally, the left and right regions vertically and the middle region
both horizontally and vertically.
 */
export const SPRITE_RENDERMODE_SLICED: number;

/**
 * This mode renders a sprite using 9-slicing in 'tiled' mode. Tiled mode tiles the
top and bottom regions of the sprite horizontally, the left and right regions vertically and the middle region
both horizontally and vertically.
 */
export const SPRITE_RENDERMODE_TILED: number;

/**
 * Single color lightmap.
 */
export const BAKE_COLOR: number;

/**
 * Single color lightmap + dominant light direction (used for bump/specular).
 */
export const BAKE_COLORDIR: number;

/**
 * Center of view.
 */
export const VIEW_CENTER: number;

/**
 * Left of view. Only used in stereo rendering.
 */
export const VIEW_LEFT: number;

/**
 * Right of view. Only used in stereo rendering.
 */
export const VIEW_RIGHT: number;

/**
 * No sorting is applied. Mesh instances are rendered in the same order they were added to a layer.
 */
export const SORTMODE_NONE: number;

/**
 * Mesh instances are sorted based on {@link MeshInstance#drawOrder}.
 */
export const SORTMODE_MANUAL: number;

/**
 * Mesh instances are sorted to minimize switching between materials and meshes to improve rendering performance.
 */
export const SORTMODE_MATERIALMESH: number;

/**
 * Mesh instances are sorted back to front. This is the way to properly render many semi-transparent objects on different depth, one is blended on top of another.
 */
export const SORTMODE_BACK2FRONT: number;

/**
 * Mesh instances are sorted front to back. Depending on GPU and the scene, this option may give better performance than {@link SORTMODE_MATERIALMESH} due to reduced overdraw.
 */
export const SORTMODE_FRONT2BACK: number;

/**
 * Automatically set aspect ratio to current render target's width divided by height.
 */
export const ASPECT_AUTO: number;

/**
 * Use the manual aspect ratio value.
 */
export const ASPECT_MANUAL: number;

/**
 * Horizontal orientation.
 */
export const ORIENTATION_HORIZONTAL: number;

/**
 * Vertical orientation.
 */
export const ORIENTATION_VERTICAL: number;

/**
 * Creates a new forward renderer object.
 * @param graphicsDevice - The graphics device used by the renderer.
 */
export class ForwardRenderer {
    constructor(graphicsDevice: GraphicsDevice);
}

/**
 * A hierarchical scene node.
 * @property name - The non-unique name of a graph node.
 * @property tags - Interface for tagging graph nodes. Tag based searches can be performed using the {@link GraphNode#findByTag} function.
 * @param [name] - The non-unique name of the graph node, default is "Untitled".
 */
export class GraphNode extends EventHandler {
    constructor(name?: string);
    /**
     * The normalized local space X-axis vector of the graph node in world space.
     */
    readonly right: Vec3;
    /**
     * The normalized local space Y-axis vector of the graph node in world space.
     */
    readonly up: Vec3;
    /**
     * The normalized local space negative Z-axis vector of the graph node in world space.
     */
    readonly forward: Vec3;
    /**
     * Enable or disable a GraphNode. If one of the GraphNode's parents is disabled
    there will be no other side effects. If all the parents are enabled then
    the new value will activate / deactivate all the enabled children of the GraphNode.
     */
    enabled: boolean;
    /**
     * A read-only property to get a parent graph node.
     */
    readonly parent: GraphNode;
    /**
     * A read-only property to get the path of the graph node relative to
    the root of the hierarchy.
     */
    readonly path: string;
    /**
     * A read-only property to get highest graph node from current node.
     */
    readonly root: GraphNode;
    /**
     * A read-only property to get the children of this graph node.
     */
    readonly children: GraphNode[];
    /**
     * A read-only property to get the depth of this child within the graph. Note that for performance reasons this is only recalculated when a node is added to a new parent, i.e. It is not recalculated when a node is simply removed from the graph.
     */
    readonly graphDepth: number;
    /**
     * Search the graph node and all of its descendants for the nodes that satisfy some search criteria.
     * @example
     * // Finds all nodes that have a model component and have `door` in their lower-cased name
    var doors = house.find(function (node) {
        return node.model && node.name.toLowerCase().indexOf('door') !== -1;
    });
     * @example
     * // Finds all nodes that have the name property set to 'Test'
    var entities = parent.find('name', 'Test');
     * @param attr - This can either be a function or a string. If it's a function, it is executed
    for each descendant node to test if node satisfies the search logic. Returning true from the function will
    include the node into the results. If it's a string then it represents the name of a field or a method of the
    node. If this is the name of a field then the value passed as the second argument will be checked for equality.
    If this is the name of a function then the return value of the function will be checked for equality against
    the valued passed as the second argument to this function.
     * @param [value] - If the first argument (attr) is a property name then this value will be checked against
    the value of the property.
     * @returns The array of graph nodes that match the search criteria.
     */
    find(attr: callbacks.FindNode | string, value?: any): GraphNode[];
    /**
     * Search the graph node and all of its descendants for the first node that satisfies some search criteria.
     * @example
     * // Find the first node that is called `head` and has a model component
    var head = player.findOne(function (node) {
        return node.model && node.name === 'head';
    });
     * @example
     * // Finds the first node that has the name property set to 'Test'
    var node = parent.findOne('name', 'Test');
     * @param attr - This can either be a function or a string. If it's a function, it is executed
    for each descendant node to test if node satisfies the search logic. Returning true from the function will
    result in that node being returned from findOne. If it's a string then it represents the name of a field or a method of the
    node. If this is the name of a field then the value passed as the second argument will be checked for equality.
    If this is the name of a function then the return value of the function will be checked for equality against
    the valued passed as the second argument to this function.
     * @param [value] - If the first argument (attr) is a property name then this value will be checked against
    the value of the property.
     * @returns A graph node that match the search criteria.
     */
    findOne(attr: callbacks.FindNode | string, value?: any): GraphNode;
    /**
     * Return all graph nodes that satisfy the search query.
    Query can be simply a string, or comma separated strings,
    to have inclusive results of assets that match at least one query.
    A query that consists of an array of tags can be used to match graph nodes that have each tag of array.
     * @example
     * // Return all graph nodes that tagged by `animal`
    var animals = node.findByTag("animal");
     * @example
     * // Return all graph nodes that tagged by `bird` OR `mammal`
    var birdsAndMammals = node.findByTag("bird", "mammal");
     * @example
     * // Return all assets that tagged by `carnivore` AND `mammal`
    var meatEatingMammals = node.findByTag(["carnivore", "mammal"]);
     * @example
     * // Return all assets that tagged by (`carnivore` AND `mammal`) OR (`carnivore` AND `reptile`)
    var meatEatingMammalsAndReptiles = node.findByTag(["carnivore", "mammal"], ["carnivore", "reptile"]);
     * @param query - Name of a tag or array of tags.
     * @returns A list of all graph nodes that match the query.
     */
    findByTag(query: string | string[]): GraphNode[];
    /**
     * Get the first node found in the graph with the name. The search
    is depth first.
     * @param name - The name of the graph.
     * @returns The first node to be found matching the supplied name.
     */
    findByName(name: string): GraphNode;
    /**
     * Get the first node found in the graph by its full path in the graph.
    The full path has this form 'parent/child/sub-child'. The search is depth first.
     * @example
     * var path = this.entity.findByPath('child/another_child');
     * @param path - The full path of the {@link GraphNode} as either a string or array of {@link GraphNode} names
     * @returns The first node to be found matching the supplied path.
     */
    findByPath(path: string | any[]): GraphNode;
    /**
     * Executes a provided function once on this graph node and all of its descendants.
     * @example
     * // Log the path and name of each node in descendant tree starting with "parent"
    parent.forEach(function (node) {
        console.log(node.path + "/" + node.name);
    });
     * @param callback - The function to execute on the graph node and each descendant.
     * @param [thisArg] - Optional value to use as this when executing callback function.
     */
    forEach(callback: callbacks.ForEach, thisArg?: any): void;
    /**
     * Check if node is descendant of another node.
     * @example
     * if (roof.isDescendantOf(house)) {
        // roof is descendant of house entity
    }
     * @param node - Potential ancestor of node.
     * @returns If node is descendant of another node.
     */
    isDescendantOf(node: GraphNode): boolean;
    /**
     * Check if node is ancestor for another node.
     * @example
     * if (body.isAncestorOf(foot)) {
        // foot is within body's hierarchy
    }
     * @param node - Potential descendant of node.
     * @returns If node is ancestor for another node.
     */
    isAncestorOf(node: GraphNode): boolean;
    /**
     * Get the world space rotation for the specified GraphNode in Euler angle
    form. The order of the returned Euler angles is XYZ. The value returned by this function
    should be considered read-only. In order to set the world-space rotation of the graph
    node, use {@link GraphNode#setEulerAngles}.
     * @example
     * var angles = this.entity.getEulerAngles(); // [0,0,0]
    angles[1] = 180; // rotate the entity around Y by 180 degrees
    this.entity.setEulerAngles(angles);
     * @returns The world space rotation of the graph node in Euler angle form.
     */
    getEulerAngles(): Vec3;
    /**
     * Get the rotation in local space for the specified GraphNode. The rotation
    is returned as euler angles in a 3-dimensional vector where the order is XYZ. The
    returned vector should be considered read-only. To update the local rotation, use
    {@link GraphNode#setLocalEulerAngles}.
     * @example
     * var angles = this.entity.getLocalEulerAngles();
    angles[1] = 180;
    this.entity.setLocalEulerAngles(angles);
     * @returns The local space rotation of the graph node as euler angles in XYZ order.
     */
    getLocalEulerAngles(): Vec3;
    /**
     * Get the position in local space for the specified GraphNode. The position
    is returned as a 3-dimensional vector. The returned vector should be considered read-only.
    To update the local position, use {@link GraphNode#setLocalPosition}.
     * @example
     * var position = this.entity.getLocalPosition();
    position[0] += 1; // move the entity 1 unit along x.
    this.entity.setLocalPosition(position);
     * @returns The local space position of the graph node.
     */
    getLocalPosition(): Vec3;
    /**
     * Get the rotation in local space for the specified GraphNode. The rotation
    is returned as a quaternion. The returned quaternion should be considered read-only.
    To update the local rotation, use {@link GraphNode#setLocalRotation}.
     * @example
     * var rotation = this.entity.getLocalRotation();
     * @returns The local space rotation of the graph node as a quaternion.
     */
    getLocalRotation(): Quat;
    /**
     * Get the scale in local space for the specified GraphNode. The scale
    is returned as a 3-dimensional vector. The returned vector should be considered read-only.
    To update the local scale, use {@link GraphNode#setLocalScale}.
     * @example
     * var scale = this.entity.getLocalScale();
    scale.x = 100;
    this.entity.setLocalScale(scale);
     * @returns The local space scale of the graph node.
     */
    getLocalScale(): Vec3;
    /**
     * Get the local transform matrix for this graph node. This matrix
    is the transform relative to the node's parent's world transformation matrix.
     * @example
     * var transform = this.entity.getLocalTransform();
     * @returns The node's local transformation matrix.
     */
    getLocalTransform(): Mat4;
    /**
     * Get the world space position for the specified GraphNode. The
    value returned by this function should be considered read-only. In order to set
    the world-space position of the graph node, use {@link GraphNode#setPosition}.
     * @example
     * var position = this.entity.getPosition();
    position.x = 10;
    this.entity.setPosition(position);
     * @returns The world space position of the graph node.
     */
    getPosition(): Vec3;
    /**
     * Get the world space rotation for the specified GraphNode in quaternion
    form. The value returned by this function should be considered read-only. In order
    to set the world-space rotation of the graph node, use {@link GraphNode#setRotation}.
     * @example
     * var rotation = this.entity.getRotation();
     * @returns The world space rotation of the graph node as a quaternion.
     */
    getRotation(): Quat;
    /**
     * Get the world transformation matrix for this graph node.
     * @example
     * var transform = this.entity.getWorldTransform();
     * @returns The node's world transformation matrix.
     */
    getWorldTransform(): Mat4;
    /**
     * Remove graph node from current parent and add as child to new parent.
     * @param parent - New parent to attach graph node to.
     * @param [index] - The child index where the child node should be placed.
     */
    reparent(parent: GraphNode, index?: number): void;
    /**
     * Sets the local-space rotation of the specified graph node using euler angles.
    Eulers are interpreted in XYZ order. Eulers must be specified in degrees. This function
    has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
    local-space euler rotation.
     * @example
     * // Set rotation of 90 degrees around y-axis via 3 numbers
    this.entity.setLocalEulerAngles(0, 90, 0);
     * @example
     * // Set rotation of 90 degrees around y-axis via a vector
    var angles = new pc.Vec3(0, 90, 0);
    this.entity.setLocalEulerAngles(angles);
     * @param x - 3-dimensional vector holding eulers or rotation around local-space
    x-axis in degrees.
     * @param [y] - Rotation around local-space y-axis in degrees.
     * @param [z] - Rotation around local-space z-axis in degrees.
     */
    setLocalEulerAngles(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Sets the local-space position of the specified graph node. This function
    has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
    local-space position.
     * @example
     * // Set via 3 numbers
    this.entity.setLocalPosition(0, 10, 0);
     * @example
     * // Set via vector
    var pos = new pc.Vec3(0, 10, 0);
    this.entity.setLocalPosition(pos);
     * @param x - 3-dimensional vector holding local-space position or
    x-coordinate of local-space position.
     * @param [y] - Y-coordinate of local-space position.
     * @param [z] - Z-coordinate of local-space position.
     */
    setLocalPosition(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Sets the local-space rotation of the specified graph node. This function
    has two valid signatures: you can either pass a quaternion or 3 numbers to specify the
    local-space rotation.
     * @example
     * // Set via 4 numbers
    this.entity.setLocalRotation(0, 0, 0, 1);
     * @example
     * // Set via quaternion
    var q = pc.Quat();
    this.entity.setLocalRotation(q);
     * @param x - Quaternion holding local-space rotation or x-component of
    local-space quaternion rotation.
     * @param [y] - Y-component of local-space quaternion rotation.
     * @param [z] - Z-component of local-space quaternion rotation.
     * @param [w] - W-component of local-space quaternion rotation.
     */
    setLocalRotation(x: Quat | number, y?: number, z?: number, w?: number): void;
    /**
     * Sets the local-space scale factor of the specified graph node. This function
    has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
    local-space scale.
     * @example
     * // Set via 3 numbers
    this.entity.setLocalScale(10, 10, 10);
     * @example
     * // Set via vector
    var scale = new pc.Vec3(10, 10, 10);
    this.entity.setLocalScale(scale);
     * @param x - 3-dimensional vector holding local-space scale or x-coordinate
    of local-space scale.
     * @param [y] - Y-coordinate of local-space scale.
     * @param [z] - Z-coordinate of local-space scale.
     */
    setLocalScale(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Sets the world-space position of the specified graph node. This function
    has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
    world-space position.
     * @example
     * // Set via 3 numbers
    this.entity.setPosition(0, 10, 0);
     * @example
     * // Set via vector
    var position = new pc.Vec3(0, 10, 0);
    this.entity.setPosition(position);
     * @param x - 3-dimensional vector holding world-space position or
    x-coordinate of world-space position.
     * @param [y] - Y-coordinate of world-space position.
     * @param [z] - Z-coordinate of world-space position.
     */
    setPosition(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Sets the world-space rotation of the specified graph node. This function
    has two valid signatures: you can either pass a quaternion or 3 numbers to specify the
    world-space rotation.
     * @example
     * // Set via 4 numbers
    this.entity.setRotation(0, 0, 0, 1);
     * @example
     * // Set via quaternion
    var q = pc.Quat();
    this.entity.setRotation(q);
     * @param x - Quaternion holding world-space rotation or x-component of
    world-space quaternion rotation.
     * @param [y] - Y-component of world-space quaternion rotation.
     * @param [z] - Z-component of world-space quaternion rotation.
     * @param [w] - W-component of world-space quaternion rotation.
     */
    setRotation(x: Quat | number, y?: number, z?: number, w?: number): void;
    /**
     * Sets the world-space rotation of the specified graph node using euler angles.
    Eulers are interpreted in XYZ order. Eulers must be specified in degrees. This function
    has two valid signatures: you can either pass a 3D vector or 3 numbers to specify the
    world-space euler rotation.
     * @example
     * // Set rotation of 90 degrees around world-space y-axis via 3 numbers
    this.entity.setEulerAngles(0, 90, 0);
     * @example
     * // Set rotation of 90 degrees around world-space y-axis via a vector
    var angles = new pc.Vec3(0, 90, 0);
    this.entity.setEulerAngles(angles);
     * @param x - 3-dimensional vector holding eulers or rotation around world-space
    x-axis in degrees.
     * @param [y] - Rotation around world-space y-axis in degrees.
     * @param [z] - Rotation around world-space z-axis in degrees.
     */
    setEulerAngles(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Add a new child to the child list and update the parent value of the child node.
     * @example
     * var e = new pc.Entity(app);
    this.entity.addChild(e);
     * @param node - The new child to add.
     */
    addChild(node: GraphNode): void;
    /**
     * Insert a new child to the child list at the specified index and update the parent value of the child node.
     * @example
     * var e = new pc.Entity(app);
    this.entity.insertChild(e, 1);
     * @param node - The new child to insert.
     * @param index - The index in the child list of the parent where the new node will be inserted.
     */
    insertChild(node: GraphNode, index: number): void;
    /**
     * Remove the node from the child list and update the parent value of the child.
     * @example
     * var child = this.entity.children[0];
    this.entity.removeChild(child);
     * @param child - The node to remove.
     */
    removeChild(child: GraphNode): void;
    /**
     * Reorients the graph node so that the negative z-axis points towards the target.
    This function has two valid signatures. Either pass 3D vectors for the look at coordinate and up
    vector, or pass numbers to represent the vectors.
     * @example
     * // Look at another entity, using the (default) positive y-axis for up
    var position = otherEntity.getPosition();
    this.entity.lookAt(position);
     * @example
     * // Look at another entity, using the negative world y-axis for up
    var position = otherEntity.getPosition();
    this.entity.lookAt(position, pc.Vec3.DOWN);
     * @example
     * // Look at the world space origin, using the (default) positive y-axis for up
    this.entity.lookAt(0, 0, 0);
     * @example
     * // Look at world-space coordinate [10, 10, 10], using the negative world y-axis for up
    this.entity.lookAt(10, 10, 10, 0, -1, 0);
     * @param x - If passing a 3D vector, this is the world-space coordinate to look at.
    Otherwise, it is the x-component of the world-space coordinate to look at.
     * @param [y] - If passing a 3D vector, this is the world-space up vector for look at
    transform. Otherwise, it is the y-component of the world-space coordinate to look at.
     * @param [z] - Z-component of the world-space coordinate to look at.
     * @param [ux = 0] - X-component of the up vector for the look at transform.
     * @param [uy = 1] - Y-component of the up vector for the look at transform.
     * @param [uz = 0] - Z-component of the up vector for the look at transform.
     */
    lookAt(x: Vec3 | number, y?: Vec3 | number, z?: number, ux?: number, uy?: number, uz?: number): void;
    /**
     * Translates the graph node in world-space by the specified translation vector.
    This function has two valid signatures: you can either pass a 3D vector or 3 numbers to
    specify the world-space translation.
     * @example
     * // Translate via 3 numbers
    this.entity.translate(10, 0, 0);
     * @example
     * // Translate via vector
    var t = new pc.Vec3(10, 0, 0);
    this.entity.translate(t);
     * @param x - 3-dimensional vector holding world-space translation or
    x-coordinate of world-space translation.
     * @param [y] - Y-coordinate of world-space translation.
     * @param [z] - Z-coordinate of world-space translation.
     */
    translate(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Translates the graph node in local-space by the specified translation vector.
    This function has two valid signatures: you can either pass a 3D vector or 3 numbers to
    specify the local-space translation.
     * @example
     * // Translate via 3 numbers
    this.entity.translateLocal(10, 0, 0);
     * @example
     * // Translate via vector
    var t = new pc.Vec3(10, 0, 0);
    this.entity.translateLocal(t);
     * @param x - 3-dimensional vector holding local-space translation or
    x-coordinate of local-space translation.
     * @param [y] - Y-coordinate of local-space translation.
     * @param [z] - Z-coordinate of local-space translation.
     */
    translateLocal(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Rotates the graph node in world-space by the specified Euler angles.
    Eulers are specified in degrees in XYZ order. This function has two valid signatures:
    you can either pass a 3D vector or 3 numbers to specify the world-space rotation.
     * @example
     * // Rotate via 3 numbers
    this.entity.rotate(0, 90, 0);
     * @example
     * // Rotate via vector
    var r = new pc.Vec3(0, 90, 0);
    this.entity.rotate(r);
     * @param x - 3-dimensional vector holding world-space rotation or
    rotation around world-space x-axis in degrees.
     * @param [y] - Rotation around world-space y-axis in degrees.
     * @param [z] - Rotation around world-space z-axis in degrees.
     */
    rotate(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * Rotates the graph node in local-space by the specified Euler angles.
    Eulers are specified in degrees in XYZ order. This function has two valid signatures:
    you can either pass a 3D vector or 3 numbers to specify the local-space rotation.
     * @example
     * // Rotate via 3 numbers
    this.entity.rotateLocal(0, 90, 0);
     * @example
     * // Rotate via vector
    var r = new pc.Vec3(0, 90, 0);
    this.entity.rotateLocal(r);
     * @param x - 3-dimensional vector holding local-space rotation or
    rotation around local-space x-axis in degrees.
     * @param [y] - Rotation around local-space y-axis in degrees.
     * @param [z] - Rotation around local-space z-axis in degrees.
     */
    rotateLocal(x: Vec3 | number, y?: number, z?: number): void;
    /**
     * The non-unique name of a graph node.
    */
    name: string;
    /**
     * Interface for tagging graph nodes. Tag based searches can be performed using the {@link GraphNode#findByTag} function.
    */
    tags: Tags;
}

/**
 * Create a new layer composition.
 * @property layerList - A read-only array of {@link Layer} sorted in the order they will be rendered.
 * @property subLayerList - A read-only array of boolean values, matching {@link Layer#layerList}.
True means only semi-transparent objects are rendered, and false means opaque.
 * @property subLayerEnabled - A read-only array of boolean values, matching {@link Layer#layerList}.
True means the layer is rendered, false means it's skipped.
 * @property cameras - A read-only array of {@link CameraComponent} that can be used during rendering. e.g. Inside
{@link Layer#onPreCull}, {@link Layer#onPostCull}, {@link Layer#onPreRender}, {@link Layer#onPostRender}.
 * @param [name] - Optional non-unique name of the layer composition. Defaults to "Untitled" if not specified.
 */
export class LayerComposition extends EventHandler {
    constructor(name?: string);
    /**
     * Adds a layer (both opaque and semi-transparent parts) to the end of the {@link Layer#layerList}.
     * @param layer - A {@link Layer} to add.
     */
    push(layer: Layer): void;
    /**
     * Inserts a layer (both opaque and semi-transparent parts) at the chosen index in the {@link Layer#layerList}.
     * @param layer - A {@link Layer} to add.
     * @param index - Insertion position.
     */
    insert(layer: Layer, index: number): void;
    /**
     * Removes a layer (both opaque and semi-transparent parts) from {@link Layer#layerList}.
     * @param layer - A {@link Layer} to remove.
     */
    remove(layer: Layer): void;
    /**
     * Adds part of the layer with opaque (non semi-transparent) objects to the end of the {@link Layer#layerList}.
     * @param layer - A {@link Layer} to add.
     */
    pushOpaque(layer: Layer): void;
    /**
     * Inserts an opaque part of the layer (non semi-transparent mesh instances) at the chosen index in the {@link Layer#layerList}.
     * @param layer - A {@link Layer} to add.
     * @param index - Insertion position.
     */
    insertOpaque(layer: Layer, index: number): void;
    /**
     * Removes an opaque part of the layer (non semi-transparent mesh instances) from {@link Layer#layerList}.
     * @param layer - A {@link Layer} to remove.
     */
    removeOpaque(layer: Layer): void;
    /**
     * Adds part of the layer with semi-transparent objects to the end of the {@link Layer#layerList}.
     * @param layer - A {@link Layer} to add.
     */
    pushTransparent(layer: Layer): void;
    /**
     * Inserts a semi-transparent part of the layer at the chosen index in the {@link Layer#layerList}.
     * @param layer - A {@link Layer} to add.
     * @param index - Insertion position.
     */
    insertTransparent(layer: Layer, index: number): void;
    /**
     * Removes a transparent part of the layer from {@link Layer#layerList}.
     * @param layer - A {@link Layer} to remove.
     */
    removeTransparent(layer: Layer): void;
    /**
     * Gets index of the opaque part of the supplied layer in the {@link Layer#layerList}.
     * @param layer - A {@link Layer} to find index of.
     * @returns The index of the opaque part of the specified layer.
     */
    getOpaqueIndex(layer: Layer): number;
    /**
     * Gets index of the semi-transparent part of the supplied layer in the {@link Layer#layerList}.
     * @param layer - A {@link Layer} to find index of.
     * @returns The index of the semi-transparent part of the specified layer.
     */
    getTransparentIndex(layer: Layer): number;
    /**
     * Finds a layer inside this composition by its ID. Null is returned, if nothing is found.
     * @param id - An ID of the layer to find.
     * @returns The layer corresponding to the specified ID. Returns null if layer is not found.
     */
    getLayerById(id: number): Layer;
    /**
     * Finds a layer inside this composition by its name. Null is returned, if nothing is found.
     * @param name - The name of the layer to find.
     * @returns The layer corresponding to the specified name. Returns null if layer is not found.
     */
    getLayerByName(name: string): Layer;
    /**
     * A read-only array of {@link Layer} sorted in the order they will be rendered.
    */
    layerList: Layer[];
    /**
     * A read-only array of boolean values, matching {@link Layer#layerList}.
     * True means only semi-transparent objects are rendered, and false means opaque.
    */
    subLayerList: boolean[];
    /**
     * A read-only array of boolean values, matching {@link Layer#layerList}.
     * True means the layer is rendered, false means it's skipped.
    */
    subLayerEnabled: boolean[];
    /**
     * A read-only array of {@link CameraComponent} that can be used during rendering. e.g. Inside
     * {@link Layer#onPreCull}, {@link Layer#onPostCull}, {@link Layer#onPreRender}, {@link Layer#onPostRender}.
    */
    cameras: CameraComponent[];
}

/**
 * Create a new layer.
 * @property enabled - Enable the layer. Disabled layers are skipped. Defaults to true.
 * @property name - Name of the layer. Can be used in {@link LayerComposition#getLayerByName}.
 * @property opaqueSortMode - Defines the method used for sorting opaque (that is, not semi-transparent) mesh instances before rendering.
Possible values are:

* {@link SORTMODE_NONE}
* {@link SORTMODE_MANUAL}
* {@link SORTMODE_MATERIALMESH}
* {@link SORTMODE_BACK2FRONT}
* {@link SORTMODE_FRONT2BACK}

Defaults to {@link SORTMODE_MATERIALMESH}.
 * @property transparentSortMode - Defines the method used for sorting semi-transparent mesh instances before rendering.
Possible values are:

* {@link SORTMODE_NONE}
* {@link SORTMODE_MANUAL}
* {@link SORTMODE_MATERIALMESH}
* {@link SORTMODE_BACK2FRONT}
* {@link SORTMODE_FRONT2BACK}

Defaults to {@link SORTMODE_BACK2FRONT}.
 * @property shaderPass - A type of shader to use during rendering. Possible values are:

* {@link SHADER_FORWARD}
* {@link SHADER_FORWARDHDR}
* {@link SHADER_DEPTH}
* Your own custom value. Should be in 19 - 31 range. Use {@link StandardMaterial#onUpdateShader} to apply shader modifications based on this value.

Defaults to {@link SHADER_FORWARD}.
 * @property passThrough - Tells that this layer is simple and needs to just render a bunch of mesh instances without lighting, skinning and morphing (faster).
 * @property clearColorBuffer - If true, the camera will clear the color buffer when it renders this layer.
 * @property clearDepthBuffer - If true, the camera will clear the depth buffer when it renders this layer.
 * @property clearStencilBuffer - If true, the camera will clear the stencil buffer when it renders this layer.
 * @property layerReference - Make this layer render the same mesh instances that another layer does instead of having its own mesh instance list.
Both layers must share cameras. Frustum culling is only performed for one layer. Useful for rendering multiple passes using different shaders.
 * @property cullingMask - Visibility mask that interacts with {@link MeshInstance#mask}.
 * @property onEnable - Custom function that is called after the layer has been enabled.
This happens when:

* The layer is created with {@link Layer#enabled} set to true (which is the default value).
* {@link Layer#enabled} was changed from false to true
* {@link Layer#incrementCounter} was called and incremented the counter above zero.

Useful for allocating resources this layer will use (e.g. creating render targets).
 * @property onDisable - Custom function that is called after the layer has been disabled.
This happens when:

* {@link Layer#enabled} was changed from true to false
* {@link Layer#decrementCounter} was called and set the counter to zero.
 * @property onPreCull - Custom function that is called before visibility culling is performed for this layer.
Useful, for example, if you want to modify camera projection while still using the same camera and make frustum culling work correctly with it
(see {@link CameraComponent#calculateTransform} and {@link CameraComponent#calculateProjection}).
This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
 * @property onPostCull - Custom function that is called after visibility culling is performed for this layer.
Useful for reverting changes done in {@link Layer#onPreCull} and determining final mesh instance visibility (see {@link MeshInstance#visibleThisFrame}).
This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
 * @property onPreRender - Custom function that is called before this layer is rendered.
Useful, for example, for reacting on screen size changes.
This function is called before the first occurrence of this layer in {@link LayerComposition}.
It will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
 * @property onPreRenderOpaque - Custom function that is called before opaque mesh instances (not semi-transparent) in this layer are rendered.
This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
 * @property onPreRenderTransparent - Custom function that is called before semi-transparent mesh instances in this layer are rendered.
This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
 * @property onPostRender - Custom function that is called after this layer is rendered.
Useful to revert changes made in {@link Layer#onPreRender} or performing some processing on {@link Layer#renderTarget}.
This function is called after the last occurrence of this layer in {@link LayerComposition}.
It will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
 * @property onPostRenderOpaque - Custom function that is called after opaque mesh instances (not semi-transparent) in this layer are rendered.
This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
 * @property onPostRenderTransparent - Custom function that is called after semi-transparent mesh instances in this layer are rendered.
This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
 * @property onDrawCall - Custom function that is called before every mesh instance in this layer is rendered.
It is not recommended to set this function when rendering many objects every frame due to performance reasons.
 * @property id - A unique ID of the layer.
Layer IDs are stored inside {@link ModelComponent#layers}, {@link CameraComponent#layers}, {@link LightComponent#layers} and {@link ElementComponent#layers} instead of names.
Can be used in {@link LayerComposition#getLayerById}.
 * @param options - Object for passing optional arguments. These arguments are the same as properties of the Layer.
 */
export class Layer {
    constructor(options: any);
    /**
     * Adds an array of mesh instances to this layer.
     * @param meshInstances - Array of {@link MeshInstance}.
     * @param [skipShadowCasters] - Set it to true if you don't want these mesh instances to cast shadows in this layer.
     */
    addMeshInstances(meshInstances: MeshInstance[], skipShadowCasters?: boolean): void;
    /**
     * Removes multiple mesh instances from this layer.
     * @param meshInstances - Array of {@link MeshInstance}. If they were added to this layer, they will be removed.
     * @param [skipShadowCasters] - Set it to true if you want to still cast shadows from removed mesh instances or if they never did cast shadows before.
     */
    removeMeshInstances(meshInstances: MeshInstance[], skipShadowCasters?: boolean): void;
    /**
     * Removes all mesh instances from this layer.
     * @param [skipShadowCasters] - Set it to true if you want to still cast shadows from removed mesh instances or if they never did cast shadows before.
     */
    clearMeshInstances(skipShadowCasters?: boolean): void;
    /**
     * Adds a light to this layer.
     * @param light - A {@link LightComponent}.
     */
    addLight(light: LightComponent): void;
    /**
     * Removes a light from this layer.
     * @param light - A {@link LightComponent}.
     */
    removeLight(light: LightComponent): void;
    /**
     * Removes all lights from this layer.
     */
    clearLights(): void;
    /**
     * Adds an array of mesh instances to this layer, but only as shadow casters (they will not be rendered anywhere, but only cast shadows on other objects).
     * @param meshInstances - Array of {@link MeshInstance}.
     */
    addShadowCasters(meshInstances: MeshInstance[]): void;
    /**
     * Removes multiple mesh instances from the shadow casters list of this layer, meaning they will stop casting shadows.
     * @param meshInstances - Array of {@link MeshInstance}. If they were added to this layer, they will be removed.
     */
    removeShadowCasters(meshInstances: MeshInstance[]): void;
    /**
     * Adds a camera to this layer.
     * @param camera - A {@link CameraComponent}.
     */
    addCamera(camera: CameraComponent): void;
    /**
     * Removes a camera from this layer.
     * @param camera - A {@link CameraComponent}.
     */
    removeCamera(camera: CameraComponent): void;
    /**
     * Removes all cameras from this layer.
     */
    clearCameras(): void;
    /**
     * Enable the layer. Disabled layers are skipped. Defaults to true.
    */
    enabled: boolean;
    /**
     * Name of the layer. Can be used in {@link LayerComposition#getLayerByName}.
    */
    name: string;
    /**
     * Defines the method used for sorting opaque (that is, not semi-transparent) mesh instances before rendering.
     * Possible values are:
     * * {@link SORTMODE_NONE}
     * * {@link SORTMODE_MANUAL}
     * * {@link SORTMODE_MATERIALMESH}
     * * {@link SORTMODE_BACK2FRONT}
     * * {@link SORTMODE_FRONT2BACK}
     * Defaults to {@link SORTMODE_MATERIALMESH}.
    */
    opaqueSortMode: number;
    /**
     * Defines the method used for sorting semi-transparent mesh instances before rendering.
     * Possible values are:
     * * {@link SORTMODE_NONE}
     * * {@link SORTMODE_MANUAL}
     * * {@link SORTMODE_MATERIALMESH}
     * * {@link SORTMODE_BACK2FRONT}
     * * {@link SORTMODE_FRONT2BACK}
     * Defaults to {@link SORTMODE_BACK2FRONT}.
    */
    transparentSortMode: number;
    /**
     * A type of shader to use during rendering. Possible values are:
     * * {@link SHADER_FORWARD}
     * * {@link SHADER_FORWARDHDR}
     * * {@link SHADER_DEPTH}
     * * Your own custom value. Should be in 19 - 31 range. Use {@link StandardMaterial#onUpdateShader} to apply shader modifications based on this value.
     * Defaults to {@link SHADER_FORWARD}.
    */
    shaderPass: number;
    /**
     * Tells that this layer is simple and needs to just render a bunch of mesh instances without lighting, skinning and morphing (faster).
    */
    passThrough: boolean;
    /**
     * If true, the camera will clear the color buffer when it renders this layer.
    */
    clearColorBuffer: boolean;
    /**
     * If true, the camera will clear the depth buffer when it renders this layer.
    */
    clearDepthBuffer: boolean;
    /**
     * If true, the camera will clear the stencil buffer when it renders this layer.
    */
    clearStencilBuffer: boolean;
    /**
     * Make this layer render the same mesh instances that another layer does instead of having its own mesh instance list.
     * Both layers must share cameras. Frustum culling is only performed for one layer. Useful for rendering multiple passes using different shaders.
    */
    layerReference: Layer;
    /**
     * Visibility mask that interacts with {@link MeshInstance#mask}.
    */
    cullingMask: (...params: any[]) => any;
    /**
     * Custom function that is called after the layer has been enabled.
     * This happens when:
     * * The layer is created with {@link Layer#enabled} set to true (which is the default value).
     * * {@link Layer#enabled} was changed from false to true
     * * {@link Layer#incrementCounter} was called and incremented the counter above zero.
     * Useful for allocating resources this layer will use (e.g. creating render targets).
    */
    onEnable: (...params: any[]) => any;
    /**
     * Custom function that is called after the layer has been disabled.
     * This happens when:
     * * {@link Layer#enabled} was changed from true to false
     * * {@link Layer#decrementCounter} was called and set the counter to zero.
    */
    onDisable: (...params: any[]) => any;
    /**
     * Custom function that is called before visibility culling is performed for this layer.
     * Useful, for example, if you want to modify camera projection while still using the same camera and make frustum culling work correctly with it
     * (see {@link CameraComponent#calculateTransform} and {@link CameraComponent#calculateProjection}).
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
    */
    onPreCull: (...params: any[]) => any;
    /**
     * Custom function that is called after visibility culling is performed for this layer.
     * Useful for reverting changes done in {@link Layer#onPreCull} and determining final mesh instance visibility (see {@link MeshInstance#visibleThisFrame}).
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
    */
    onPostCull: (...params: any[]) => any;
    /**
     * Custom function that is called before this layer is rendered.
     * Useful, for example, for reacting on screen size changes.
     * This function is called before the first occurrence of this layer in {@link LayerComposition}.
     * It will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
    */
    onPreRender: (...params: any[]) => any;
    /**
     * Custom function that is called before opaque mesh instances (not semi-transparent) in this layer are rendered.
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
    */
    onPreRenderOpaque: (...params: any[]) => any;
    /**
     * Custom function that is called before semi-transparent mesh instances in this layer are rendered.
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
    */
    onPreRenderTransparent: (...params: any[]) => any;
    /**
     * Custom function that is called after this layer is rendered.
     * Useful to revert changes made in {@link Layer#onPreRender} or performing some processing on {@link Layer#renderTarget}.
     * This function is called after the last occurrence of this layer in {@link LayerComposition}.
     * It will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
    */
    onPostRender: (...params: any[]) => any;
    /**
     * Custom function that is called after opaque mesh instances (not semi-transparent) in this layer are rendered.
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
    */
    onPostRenderOpaque: (...params: any[]) => any;
    /**
     * Custom function that is called after semi-transparent mesh instances in this layer are rendered.
     * This function will receive camera index as the only argument. You can get the actual camera being used by looking up {@link LayerComposition#cameras} with this index.
    */
    onPostRenderTransparent: (...params: any[]) => any;
    /**
     * Custom function that is called before every mesh instance in this layer is rendered.
     * It is not recommended to set this function when rendering many objects every frame due to performance reasons.
    */
    onDrawCall: (...params: any[]) => any;
    /**
     * A unique ID of the layer.
     * Layer IDs are stored inside {@link ModelComponent#layers}, {@link CameraComponent#layers}, {@link LightComponent#layers} and {@link ElementComponent#layers} instead of names.
     * Can be used in {@link LayerComposition#getLayerById}.
    */
    id: number;
}

/**
 * The lightmapper is used to bake scene lights into textures.
 * @param device - The grahpics device used by the lightmapper.
 * @param root - The root entity of the scene.
 * @param scene - The scene to lightmap.
 * @param renderer - The renderer.
 * @param assets - Registry of assets to lightmap.
 */
export class Lightmapper {
    constructor(device: GraphicsDevice, root: Entity, scene: Scene, renderer: ForwardRenderer, assets: AssetRegistry);
    /**
     * Generates and applies the lightmaps.
     * @param nodes - An array of entities (with model or render components) to render
    lightmaps for. If not supplied, the entire scene will be baked.
     * @param [mode] - Baking mode. Can be:
    
    * {@link BAKE_COLOR}: single color lightmap
    * {@link BAKE_COLORDIR}: single color lightmap + dominant light direction (used for bump/specular)
    
    Only lights with bakeDir=true will be used for generating the dominant light direction. Defaults to
    {@link BAKE_COLORDIR}.
     */
    bake(nodes: Entity[] | null, mode?: number): void;
}

/**
 * A Basic material is for rendering unlit geometry, either using a constant color or a
color map modulated with a color.
 * @example
 * // Create a new Basic material
var material = new pc.BasicMaterial();

// Set the material to have a texture map that is multiplied by a red color
material.color.set(1, 0, 0);
material.colorMap = diffuseMap;

// Notify the material that it has been modified
material.update();
 * @property color - The flat color of the material (RGBA, where each component is 0 to 1).
 * @property colorMap - The color map of the material (default is null). If specified, the color map is
modulated by the color property.
 */
export class BasicMaterial extends Material {
    /**
     * Duplicates a Basic material. All properties are duplicated except textures
    where only the references are copied.
     * @returns A cloned Basic material.
     */
    clone(): BasicMaterial;
    /**
     * The flat color of the material (RGBA, where each component is 0 to 1).
    */
    color: Color;
    /**
     * The color map of the material (default is null). If specified, the color map is
     * modulated by the color property.
    */
    colorMap: Texture | null;
}

/**
 * Create a new Material instance.
 * @property alphaTest - The alpha test reference value to control which fragments are written to the currently
active render target based on alpha value. All fragments with an alpha value of less than the alphaTest reference value
will be discarded. alphaTest defaults to 0 (all fragments pass).
 * @property alphaToCoverage - Enables or disables alpha to coverage (WebGL2 only). When enabled, and if hardware anti-aliasing is on,
limited order-independent transparency can be achieved. Quality depends on the number of MSAA samples of the current render target.
It can nicely soften edges of otherwise sharp alpha cutouts, but isn't recommended for large area semi-transparent surfaces.
Note, that you don't need to enable blending to make alpha to coverage work. It will work without it, just like alphaTest.
 * @property alphaWrite - If true, the alpha component of fragments generated by the shader of this material is written to
the color buffer of the currently active render target. If false, the alpha component will not be written. Defaults to true.
 * @property blendType - Controls how primitives are blended when being written to the currently active render target.
Can be:

* {@link BLEND_SUBTRACTIVE}: Subtract the color of the source fragment from the destination fragment and write the result to the frame buffer.
* {@link BLEND_ADDITIVE}: Add the color of the source fragment to the destination fragment and write the result to the frame buffer.
* {@link BLEND_NORMAL}: Enable simple translucency for materials such as glass. This is equivalent to enabling a source blend mode of {@link BLENDMODE_SRC_ALPHA} and a destination blend mode of {@link BLENDMODE_ONE_MINUS_SRC_ALPHA}.
* {@link BLEND_NONE}: Disable blending.
* {@link BLEND_PREMULTIPLIED}: Similar to {@link BLEND_NORMAL} expect the source fragment is assumed to have already been multiplied by the source alpha value.
* {@link BLEND_MULTIPLICATIVE}: Multiply the color of the source fragment by the color of the destination fragment and write the result to the frame buffer.
* {@link BLEND_ADDITIVEALPHA}: Same as {@link BLEND_ADDITIVE} except the source RGB is multiplied by the source alpha.

Defaults to {@link BLEND_NONE}.
 * @property blueWrite - If true, the blue component of fragments generated by the shader of this material is written to
the color buffer of the currently active render target. If false, the blue component will not be written. Defaults to true.
 * @property cull - Controls how triangles are culled based on their face direction with respect to the viewpoint.
Can be:

* {@link CULLFACE_NONE}: Do not cull triangles based on face direction.
* {@link CULLFACE_BACK}: Cull the back faces of triangles (do not render triangles facing away from the view point).
* {@link CULLFACE_FRONT}: Cull the front faces of triangles (do not render triangles facing towards the view point).
* {@link CULLFACE_FRONTANDBACK}: Cull both front and back faces (triangles will not be rendered).

Defaults to {@link CULLFACE_BACK}.
 * @property depthTest - If true, fragments generated by the shader of this material are only written to the
current render target if they pass the depth test. If false, fragments generated by the shader of this material are
written to the current render target regardless of what is in the depth buffer. Defaults to true.
 * @property depthWrite - If true, fragments generated by the shader of this material write a depth value to
the depth buffer of the currently active render target. If false, no depth value is written. Defaults to true.
 * @property greenWrite - If true, the green component of fragments generated by the shader of this material is written to
the color buffer of the currently active render target. If false, the green component will not be written. Defaults to true.
 * @property name - The name of the material.
 * @property redWrite - If true, the red component of fragments generated by the shader of this material is written to
the color buffer of the currently active render target. If false, the red component will not be written. Defaults to true.
 * @property shader - The shader used by this material to render mesh instances (default is null).
 * @property stencilFront - Stencil parameters for front faces (default is null).
 * @property stencilBack - Stencil parameters for back faces (default is null).
 * @property depthBias - Offsets the output depth buffer value. Useful for decals to prevent z-fighting.
 * @property slopeDepthBias - Same as {@link Material#depthBias}, but also depends on the slope of the triangle relative to the camera.
 */
export class Material {
    /**
     * Applies any changes made to the material's properties.
     */
    update(): void;
    /**
     * Retrieves the specified shader parameter from a material.
     * @param name - The name of the parameter to query.
     * @returns The named parameter.
     */
    getParameter(name: string): any;
    /**
     * Sets a shader parameter on a material.
     * @param name - The name of the parameter to set.
     * @param data - The value for the specified parameter.
     */
    setParameter(name: string, data: number | number[] | Texture): void;
    /**
     * Deletes a shader parameter on a material.
     * @param name - The name of the parameter to delete.
     */
    deleteParameter(name: string): void;
    /**
     * Removes this material from the scene and possibly frees up memory from its shaders (if there are no other materials using it).
     */
    destroy(): void;
    /**
     * The alpha test reference value to control which fragments are written to the currently
     * active render target based on alpha value. All fragments with an alpha value of less than the alphaTest reference value
     * will be discarded. alphaTest defaults to 0 (all fragments pass).
    */
    alphaTest: number;
    /**
     * Enables or disables alpha to coverage (WebGL2 only). When enabled, and if hardware anti-aliasing is on,
     * limited order-independent transparency can be achieved. Quality depends on the number of MSAA samples of the current render target.
     * It can nicely soften edges of otherwise sharp alpha cutouts, but isn't recommended for large area semi-transparent surfaces.
     * Note, that you don't need to enable blending to make alpha to coverage work. It will work without it, just like alphaTest.
    */
    alphaToCoverage: boolean;
    /**
     * If true, the alpha component of fragments generated by the shader of this material is written to
     * the color buffer of the currently active render target. If false, the alpha component will not be written. Defaults to true.
    */
    alphaWrite: boolean;
    /**
     * Controls how primitives are blended when being written to the currently active render target.
     * Can be:
     * * {@link BLEND_SUBTRACTIVE}: Subtract the color of the source fragment from the destination fragment and write the result to the frame buffer.
     * * {@link BLEND_ADDITIVE}: Add the color of the source fragment to the destination fragment and write the result to the frame buffer.
     * * {@link BLEND_NORMAL}: Enable simple translucency for materials such as glass. This is equivalent to enabling a source blend mode of {@link BLENDMODE_SRC_ALPHA} and a destination blend mode of {@link BLENDMODE_ONE_MINUS_SRC_ALPHA}.
     * * {@link BLEND_NONE}: Disable blending.
     * * {@link BLEND_PREMULTIPLIED}: Similar to {@link BLEND_NORMAL} expect the source fragment is assumed to have already been multiplied by the source alpha value.
     * * {@link BLEND_MULTIPLICATIVE}: Multiply the color of the source fragment by the color of the destination fragment and write the result to the frame buffer.
     * * {@link BLEND_ADDITIVEALPHA}: Same as {@link BLEND_ADDITIVE} except the source RGB is multiplied by the source alpha.
     * Defaults to {@link BLEND_NONE}.
    */
    blendType: number;
    /**
     * If true, the blue component of fragments generated by the shader of this material is written to
     * the color buffer of the currently active render target. If false, the blue component will not be written. Defaults to true.
    */
    blueWrite: boolean;
    /**
     * Controls how triangles are culled based on their face direction with respect to the viewpoint.
     * Can be:
     * * {@link CULLFACE_NONE}: Do not cull triangles based on face direction.
     * * {@link CULLFACE_BACK}: Cull the back faces of triangles (do not render triangles facing away from the view point).
     * * {@link CULLFACE_FRONT}: Cull the front faces of triangles (do not render triangles facing towards the view point).
     * * {@link CULLFACE_FRONTANDBACK}: Cull both front and back faces (triangles will not be rendered).
     * Defaults to {@link CULLFACE_BACK}.
    */
    cull: number;
    /**
     * If true, fragments generated by the shader of this material are only written to the
     * current render target if they pass the depth test. If false, fragments generated by the shader of this material are
     * written to the current render target regardless of what is in the depth buffer. Defaults to true.
    */
    depthTest: boolean;
    /**
     * If true, fragments generated by the shader of this material write a depth value to
     * the depth buffer of the currently active render target. If false, no depth value is written. Defaults to true.
    */
    depthWrite: boolean;
    /**
     * If true, the green component of fragments generated by the shader of this material is written to
     * the color buffer of the currently active render target. If false, the green component will not be written. Defaults to true.
    */
    greenWrite: boolean;
    /**
     * The name of the material.
    */
    name: string;
    /**
     * If true, the red component of fragments generated by the shader of this material is written to
     * the color buffer of the currently active render target. If false, the red component will not be written. Defaults to true.
    */
    redWrite: boolean;
    /**
     * The shader used by this material to render mesh instances (default is null).
    */
    shader: Shader | null;
    /**
     * Stencil parameters for front faces (default is null).
    */
    stencilFront: StencilParameters | null;
    /**
     * Stencil parameters for back faces (default is null).
    */
    stencilBack: StencilParameters | null;
    /**
     * Offsets the output depth buffer value. Useful for decals to prevent z-fighting.
    */
    depthBias: number;
    /**
     * Same as {@link Material#depthBias}, but also depends on the slope of the triangle relative to the camera.
    */
    slopeDepthBias: number;
}

/**
 * A Standard material is the main, general purpose material that is most often used for rendering.
It can approximate a wide variety of surface types and can simulate dynamic reflected light.
Most maps can use 3 types of input values in any combination: constant (color or number), mesh vertex colors and a texture. All enabled inputs are multiplied together.
 * @example
 * // Create a new Standard material
var material = new pc.StandardMaterial();

// Update the material's diffuse and specular properties
material.diffuse.set(1, 0, 0);
material.specular.set(1, 1, 1);

// Notify the material that it has been modified
material.update();
 * @example
 * // Create a new Standard material
var material = new pc.StandardMaterial();

// Assign a texture to the diffuse slot
material.diffuseMap = texture;

// Use the alpha channel of the texture for alpha testing with a reference value of 0.5
material.opacityMap = texture;
material.alphaTest = 0.5;

// Notify the material that it has been modified
material.update();
 * @property ambient - The ambient color of the material. This color value is 3-component (RGB),
where each component is between 0 and 1.
 * @property diffuse - The diffuse color of the material. This color value is 3-component (RGB),
where each component is between 0 and 1.
Defines basic surface color (aka albedo).
 * @property diffuseTint - Multiply main (primary) diffuse map and/or diffuse vertex color by the constant diffuse value.
 * @property diffuseMap - The main (primary) diffuse map of the material (default is null).
 * @property diffuseMapUv - Main (primary) diffuse map UV channel.
 * @property diffuseMapTiling - Controls the 2D tiling of the main (primary) diffuse map.
 * @property diffuseMapOffset - Controls the 2D offset of the main (primary) diffuse map. Each component is between 0 and 1.
 * @property diffuseMapChannel - Color channels of the main (primary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property diffuseVertexColor - Use mesh vertex colors for diffuse. If diffuseMap or are diffuseTint are set, they'll be multiplied by vertex colors.
 * @property diffuseVertexColorChannel - Vertex color channels to use for diffuse. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property diffuseDetailMap - The detail (secondary) diffuse map of the material (default is null). Will only be used if main (primary) diffuse map is non-null.
 * @property diffuseDetailMapUv - Detail (secondary) diffuse map UV channel.
 * @property diffuseDetailMapTiling - Controls the 2D tiling of the detail (secondary) diffuse map.
 * @property diffuseDetailMapOffset - Controls the 2D offset of the detail (secondary) diffuse map. Each component is between 0 and 1.
 * @property diffuseDetailMapChannel - Color channels of the detail (secondary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property diffuseDetailMode - Determines how the main (primary) and detail (secondary) diffuse maps are blended together. Can be:
* {@link DETAILMODE_MUL}: Multiply together the primary and secondary colors.
* {@link DETAILMODE_ADD}: Add together the primary and secondary colors.
* {@link DETAILMODE_SCREEN}: Softer version of {@link DETAILMODE_ADD}.
* {@link DETAILMODE_OVERLAY}: Multiplies or screens the colors, depending on the primary color.
* {@link DETAILMODE_MIN}: Select whichever of the primary and secondary colors is darker, component-wise.
* {@link DETAILMODE_MAX}: Select whichever of the primary and secondary colors is lighter, component-wise.
Defaults to {@link DETAILMODE_MUL}.
 * @property specular - The specular color of the material. This color value is 3-component (RGB),
where each component is between 0 and 1.
Defines surface reflection/specular color. Affects specular intensity and tint.
 * @property specularTint - Multiply specular map and/or specular vertex color by the constant specular value.
 * @property specularMap - The specular map of the material (default is null).
 * @property specularMapUv - Specular map UV channel.
 * @property specularMapTiling - Controls the 2D tiling of the specular map.
 * @property specularMapOffset - Controls the 2D offset of the specular map. Each component is between 0 and 1.
 * @property specularMapChannel - Color channels of the specular map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property specularVertexColor - Use mesh vertex colors for specular. If specularMap or are specularTint are set, they'll be multiplied by vertex colors.
 * @property specularVertexColorChannel - Vertex color channels to use for specular. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property enableGGXSpecular - Enables GGX specular. Also enables {@link StandardMaterial#anisotropy}  parameter to set material anisotropy.
 * @property anisotropy - Defines amount of anisotropy. Requires {@link StandardMaterial#enableGGXSpecular} is set to true.
* When anisotropy == 0, specular is isotropic.
* When anisotropy < 0, anistropy direction aligns with the tangent, and specular anisotropy increases as the anisotropy value decreases to minimum of -1.
* When anisotropy > 0, anistropy direction aligns with the bi-normal, and specular anisotropy increases as anisotropy value increases to maximum of 1.
 * @property clearCoat - Defines intensity of clear coat layer from 0 to 1. Clear coat layer is disabled when clearCoat == 0. Default value is 0 (disabled).
 * @property clearCoatMap - Monochrome clear coat intensity map (default is null). If specified, will be multiplied by normalized 'clearCoat' value and/or vertex colors.
 * @property clearCoatMapUv - Clear coat intensity map UV channel.
 * @property clearCoatMapTiling - Controls the 2D tiling of the clear coat intensity map.
 * @property clearCoatMapOffset - Controls the 2D offset of the clear coat intensity map. Each component is between 0 and 1.
 * @property clearCoatMapChannel - Color channel of the clear coat intensity map to use. Can be "r", "g", "b" or "a".
 * @property clearCoatVertexColor - Use mesh vertex colors for clear coat intensity. If clearCoatMap is set, it'll be multiplied by vertex colors.
 * @property clearCoatVertexColorChannel - Vertex color channel to use for clear coat intensity. Can be "r", "g", "b" or "a".
 * @property clearCoatGlossiness - Defines the clear coat glossiness of the clear coat layer from 0 (rough) to 1 (mirror).
 * @property clearCoatGlossMap - Monochrome clear coat glossiness map (default is null). If specified, will be multiplied by normalized 'clearCoatGlossiness' value and/or vertex colors.
 * @property clearCoatGlossMapUv - Clear coat gloss map UV channel.
 * @property clearCoatGlossMapTiling - Controls the 2D tiling of the clear coat gloss map.
 * @property clearCoatGlossMapOffset - Controls the 2D offset of the clear coat gloss map. Each component is between 0 and 1.
 * @property clearCoatGlossMapChannel - Color channel of the clear coat gloss map to use. Can be "r", "g", "b" or "a".
 * @property clearCoatGlossVertexColor - Use mesh vertex colors for clear coat glossiness. If clearCoatGlossMap is set, it'll be multiplied by vertex colors.
 * @property clearCoatGlossVertexColorChannel - Vertex color channel to use for clear coat glossiness. Can be "r", "g", "b" or "a".
 * @property clearCoatNormalMap - The clear coat normal map of the material (default is null). The texture must contains normalized, tangent space normals.
 * @property clearCoatNormalMapUv - Clear coat normal map UV channel.
 * @property clearCoatNormalMapTiling - Controls the 2D tiling of the main clear coat normal map.
 * @property clearCoatNormalMapOffset - Controls the 2D offset of the main clear coat normal map. Each component is between 0 and 1.
 * @property clearCoatBumpiness - The bumpiness of the clear coat layer. This value scales the assigned main clear coat normal map.
It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect.
 * @property useMetalness - Use metalness properties instead of specular.
When enabled, diffuse colors also affect specular instead of the dedicated specular map.
This can be used as alternative to specular color to save space.
With metaless == 0, the pixel is assumed to be dielectric, and diffuse color is used as normal.
With metaless == 1, the pixel is fully metallic, and diffuse color is used as specular color instead.
 * @property metalness - Defines how much the surface is metallic. From 0 (dielectric) to 1 (metal).
 * @property metalnessMap - Monochrome metalness map (default is null).
 * @property metalnessMapUv - Metalness map UV channel.
 * @property metalnessMapTiling - Controls the 2D tiling of the metalness map.
 * @property metalnessMapOffset - Controls the 2D offset of the metalness map. Each component is between 0 and 1.
 * @property metalnessMapChannel - Color channel of the metalness map to use. Can be "r", "g", "b" or "a".
 * @property metalnessVertexColor - Use mesh vertex colors for metalness. If metalnessMap is set, it'll be multiplied by vertex colors.
 * @property metalnessVertexColorChannel - Vertex color channel to use for metalness. Can be "r", "g", "b" or "a".
 * @property shininess - Defines glossiness of the material from 0 (rough) to 100 (shiny mirror).
A higher shininess value results in a more focused specular highlight.
Glossiness map/vertex colors are always multiplied by this value (normalized to 0 - 1 range), or it is used directly as constant output.
 * @property glossMap - Glossiness map (default is null). If specified, will be multiplied by normalized 'shininess' value and/or vertex colors.
 * @property glossMapUv - Gloss map UV channel.
 * @property glossMapChannel - Color channel of the gloss map to use. Can be "r", "g", "b" or "a".
 * @property glossMapTiling - Controls the 2D tiling of the gloss map.
 * @property glossMapOffset - Controls the 2D offset of the gloss map. Each component is between 0 and 1.
 * @property glossVertexColor - Use mesh vertex colors for glossiness. If glossMap is set, it'll be multiplied by vertex colors.
 * @property glossVertexColorChannel - Vertex color channel to use for glossiness. Can be "r", "g", "b" or "a".
 * @property refraction - Defines the visibility of refraction. Material can refract the same cube map as used for reflections.
 * @property refractionIndex - Defines the index of refraction, i.e. The amount of distortion.
The value is calculated as (outerIor / surfaceIor), where inputs are measured indices of refraction, the one around the object and the one of it's own surface.
In most situations outer medium is air, so outerIor will be approximately 1. Then you only need to do (1.0 / surfaceIor).
 * @property emissive - The emissive color of the material. This color value is 3-component (RGB),
where each component is between 0 and 1.
 * @property emissiveTint - Multiply emissive map and/or emissive vertex color by the constant emissive value.
 * @property emissiveMap - The emissive map of the material (default is null). Can be HDR.
 * @property emissiveIntensity - Emissive color multiplier.
 * @property emissiveMapUv - Emissive map UV channel.
 * @property emissiveMapTiling - Controls the 2D tiling of the emissive map.
 * @property emissiveMapOffset - Controls the 2D offset of the emissive map. Each component is between 0 and 1.
 * @property emissiveMapChannel - Color channels of the emissive map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property emissiveVertexColor - Use mesh vertex colors for emission. If emissiveMap or emissiveTint are set, they'll be multiplied by vertex colors.
 * @property emissiveVertexColorChannel - Vertex color channels to use for emission. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property opacity - The opacity of the material. This value can be between 0 and 1, where 0 is fully
transparent and 1 is fully opaque. If you want the material to be semi-transparent you also need to
set the {@link Material#blendType} to {@link BLEND_NORMAL}, {@link BLEND_ADDITIVE} or any other mode.
Also note that for most semi-transparent objects you want {@link Material#depthWrite} to be false, otherwise they can fully occlude objects behind them.
 * @property opacityMap - The opacity map of the material (default is null).
 * @property opacityMapUv - Opacity map UV channel.
 * @property opacityMapChannel - Color channel of the opacity map to use. Can be "r", "g", "b" or "a".
 * @property opacityMapTiling - Controls the 2D tiling of the opacity map.
 * @property opacityMapOffset - Controls the 2D offset of the opacity map. Each component is between 0 and 1.
 * @property opacityVertexColor - Use mesh vertex colors for opacity. If opacityMap is set, it'll be multiplied by vertex colors.
 * @property opacityVertexColorChannel - Vertex color channels to use for opacity. Can be "r", "g", "b" or "a".
 * @property opacityFadesSpecular - used to specify whether specular and reflections are faded out using {@link StandardMaterial#opacity}. Default is true. When set to false use {@link Material#alphaFade} to fade out materials.
 * @property alphaFade - used to fade out materials when {@link StandardMaterial#opacityFadesSpecular} is set to false.
 * @property normalMap - The main (primary) normal map of the material (default is null).
The texture must contains normalized, tangent space normals.
 * @property normalMapUv - Main (primary) normal map UV channel.
 * @property normalMapTiling - Controls the 2D tiling of the main (primary) normal map.
 * @property normalMapOffset - Controls the 2D offset of the main (primary) normal map. Each component is between 0 and 1.
 * @property bumpiness - The bumpiness of the material. This value scales the assigned main (primary) normal map.
It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect.
 * @property normalDetailMap - The detail (secondary) normal map of the material (default is null). Will only be used if main (primary) normal map is non-null.
 * @property normalDetailMapUv - Detail (secondary) normal map UV channel.
 * @property normalDetailMapTiling - Controls the 2D tiling of the detail (secondary) normal map.
 * @property normalDetailMapOffset - Controls the 2D offset of the detail (secondary) normal map. Each component is between 0 and 1.
 * @property normalDetailMapBumpiness - The bumpiness of the material. This value scales the assigned detail (secondary) normal map.
It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect.
 * @property heightMap - The height map of the material (default is null). Used for a view-dependent parallax effect.
The texture must represent the height of the surface where darker pixels are lower and lighter pixels are higher.
It is recommended to use it together with a normal map.
 * @property heightMapUv - Height map UV channel.
 * @property heightMapChannel - Color channel of the height map to use. Can be "r", "g", "b" or "a".
 * @property heightMapTiling - Controls the 2D tiling of the height map.
 * @property heightMapOffset - Controls the 2D offset of the height map. Each component is between 0 and 1.
 * @property heightMapFactor - Height map multiplier. Affects the strength of the parallax effect.
 * @property sphereMap - The spherical environment map of the material (default is null). Affects reflections.
 * @property cubeMap - The cubic environment map of the material (default is null). Overrides sphereMap. Affects reflections. If cubemap is prefiltered, will also affect ambient color.
 * @property cubeMapProjection - The type of projection applied to the cubeMap property:
* {@link CUBEPROJ_NONE}: The cube map is treated as if it is infinitely far away.
* {@link CUBEPROJ_BOX}: Box-projection based on a world space axis-aligned bounding box.
Defaults to {@link CUBEPROJ_NONE}.
 * @property cubeMapProjectionBox - The world space axis-aligned bounding box defining the
box-projection used for the cubeMap property. Only used when cubeMapProjection is set to {@link CUBEPROJ_BOX}.
 * @property reflectivity - Environment map intensity.
 * @property lightMap - A custom lightmap of the material (default is null). Lightmaps are textures that contain pre-rendered lighting. Can be HDR.
 * @property lightMapUv - Lightmap UV channel
 * @property lightMapChannel - Color channels of the lightmap to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property lightMapTiling - Controls the 2D tiling of the lightmap.
 * @property lightMapOffset - Controls the 2D offset of the lightmap. Each component is between 0 and 1.
 * @property lightVertexColor - Use baked vertex lighting. If lightMap is set, it'll be multiplied by vertex colors.
 * @property lightVertexColorChannel - Vertex color channels to use for baked lighting. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
 * @property ambientTint - Enables scene ambient multiplication by material ambient color.
 * @property aoMap - Baked ambient occlusion (AO) map (default is null). Modulates ambient color.
 * @property aoMapUv - AO map UV channel
 * @property aoMapChannel - Color channel of the AO map to use. Can be "r", "g", "b" or "a".
 * @property aoMapTiling - Controls the 2D tiling of the AO map.
 * @property aoMapOffset - Controls the 2D offset of the AO map. Each component is between 0 and 1.
 * @property aoVertexColor - Use mesh vertex colors for AO. If aoMap is set, it'll be multiplied by vertex colors.
 * @property aoVertexColorChannel - Vertex color channels to use for AO. Can be "r", "g", "b" or "a".
 * @property occludeSpecular - Uses ambient occlusion to darken specular/reflection. It's a hack, because real specular occlusion is view-dependent. However, it can be better than nothing.
* {@link SPECOCC_NONE}: No specular occlusion
* {@link SPECOCC_AO}: Use AO directly to occlude specular.
* {@link SPECOCC_GLOSSDEPENDENT}: Modify AO based on material glossiness/view angle to occlude specular.
 * @property occludeSpecularIntensity - Controls visibility of specular occlusion.
 * @property occludeDirect - Tells if AO should darken directional lighting.
 * @property specularAntialias - Enables Toksvig AA for mipmapped normal maps with specular.
 * @property conserveEnergy - Defines how diffuse and specular components are combined when Fresnel is on.
It is recommended that you leave this option enabled, although you may want to disable it in case when all reflection comes only from a few light sources, and you don't use an environment map, therefore having mostly black reflection.
 * @property shadingModel - Defines the shading model.
* {@link SPECULAR_PHONG}: Phong without energy conservation. You should only use it as a backwards compatibility with older projects.
* {@link SPECULAR_BLINN}: Energy-conserving Blinn-Phong.
 * @property fresnelModel - Defines the formula used for Fresnel effect.
As a side-effect, enabling any Fresnel model changes the way diffuse and reflection components are combined.
When Fresnel is off, legacy non energy-conserving combining is used. When it is on, combining behavior is defined by conserveEnergy parameter.
* {@link FRESNEL_NONE}: No Fresnel.
* {@link FRESNEL_SCHLICK}: Schlick's approximation of Fresnel (recommended). Parameterized by specular color.
 * @property useFog - Apply fogging (as configured in scene settings)
 * @property useLighting - Apply lighting
 * @property useSkybox - Apply scene skybox as prefiltered environment map
 * @property useGammaTonemap - Apply gamma correction and tonemapping (as configured in scene settings)
 * @property pixelSnap - Align vertices to pixel co-ordinates when rendering. Useful for pixel perfect 2D graphics
 * @property twoSidedLighting - Calculate proper normals (and therefore lighting) on backfaces
 * @property chunks - Object containing custom shader chunks that will replace default ones.
 * @property onUpdateShader - A custom function that will be called after all shader generator properties are collected and before shader code is generated.
This function will receive an object with shader generator settings (based on current material and scene properties), that you can change and then return.
Returned value will be used instead. This is mostly useful when rendering the same set of objects, but with different shader variations based on the same material.
For example, you may wish to render a depth or normal pass using textures assigned to the material, a reflection pass with simpler shaders and so on.
Properties of the object passed into this function are:
* pass: value of {@link Layer#shaderPass} of the Layer being rendered.
* chunks: Object containing custom shader chunks that will replace default ones.
* customFragmentShader: Completely replace fragment shader with this code.
* forceUv1: if UV1 (second set of texture coordinates) is required in the shader. Will be declared as "vUv1" and passed to the fragment shader.
* fog: the type of fog being applied in the shader. See {@link Scene#fog} for the list of possible values.
* gamma: the type of gamma correction being applied in the shader. See {@link Scene#gammaCorrection} for the list of possible values.
* toneMap: the type of tone mapping being applied in the shader. See {@link Scene#toneMapping} for the list of possible values.
* ambientTint: the value of {@link StandardMaterial#ambientTint}.
* specularAntialias: the value of {@link StandardMaterial#specularAntialias}.
* conserveEnergy: the value of {@link StandardMaterial#conserveEnergy}.
* occludeSpecular: the value of {@link StandardMaterial#occludeSpecular}.
* occludeDirect: the value of {@link StandardMaterial#occludeDirect}.
* shadingModel: the value of {@link StandardMaterial#shadingModel}.
* fresnelModel: the value of {@link StandardMaterial#fresnelModel}.
* cubeMapProjection: the value of {@link StandardMaterial#cubeMapProjection}.
* useMetalness: the value of {@link StandardMaterial#useMetalness}.
* blendType: the value of {@link Material#blendType}.
* twoSidedLighting: the value of {@link Material#twoSidedLighting}.
* diffuseTint: defines if {@link StandardMaterial#diffuse} constant should affect diffuse color.
* specularTint: defines if {@link StandardMaterial#specular} constant should affect specular color.
* metalnessTint: defines if {@link StandardMaterial#metalness} constant should affect metalness value.
* glossTint: defines if {@link StandardMaterial#shininess} constant should affect glossiness value.
* emissiveTint: defines if {@link StandardMaterial#emissive} constant should affect emission value.
* opacityTint: defines if {@link StandardMaterial#opacity} constant should affect opacity value.
* occludeSpecularFloat: defines if {@link StandardMaterial#occludeSpecularIntensity} constant should affect specular occlusion.
* alphaTest: enable alpha testing. See {@link Material#alphaTest}.
* alphaToCoverage: enable alpha to coverage. See {@link Material#alphaToCoverage}.
* opacityFadesSpecular: enable specular fade. See {@link Material#opacityFadesSpecular}.
* alphaFade: fade value. See {@link Material#alphaFade}.
* sphereMap: if {@link StandardMaterial#sphereMap} is used.
* cubeMap: if {@link StandardMaterial#cubeMap} is used.
* dpAtlas: if dual-paraboloid reflection is used. Dual paraboloid reflections replace prefiltered cubemaps on certain platform (mostly Android) for performance reasons.
* ambientSH: if ambient spherical harmonics are used. Ambient SH replace prefiltered cubemap ambient on certain platform (mostly Android) for performance reasons.
* useSpecular: if any specular or reflections are needed at all.
* rgbmAmbient: if ambient cubemap or spherical harmonics are RGBM-encoded.
* hdrAmbient: if ambient cubemap or spherical harmonics are plain float HDR data.
* rgbmReflection: if reflection cubemap or dual paraboloid are RGBM-encoded.
* hdrReflection: if reflection cubemap or dual paraboloid are plain float HDR data.
* fixSeams: if cubemaps require seam fixing (see {@link Texture#options.fixCubemapSeams}).
* prefilteredCubemap: if prefiltered cubemaps are used.
* emissiveFormat: how emissiveMap must be sampled. This value is based on {@link Texture#options.rgbm} and {@link Texture#options.format}. Possible values are:
  * 0: sRGB texture
  * 1: RGBM-encoded HDR texture
  * 2: Simple read (no conversion from sRGB)
* lightMapFormat: how lightMap must be sampled. This value is based on {@link Texture#options.rgbm} and {@link Texture#options.format}. Possible values are:
  * 0: sRGB texture
  * 1: RGBM-encoded HDR texture
  * 2: Simple read (no conversion from sRGB)
* useRgbm: if decodeRGBM() function is needed in the shader at all.
* packedNormal: if normal map contains X in RGB, Y in Alpha, and Z must be reconstructed.
* forceFragmentPrecision: Override fragment shader numeric precision. Can be "lowp", "mediump", "highp" or null to use default.
* fastTbn: Use slightly cheaper normal mapping code (skip tangent space normalization). Can look buggy sometimes.
* refraction: if refraction is used.
* skyboxIntensity: if reflected skybox intensity should be modulated.
* useCubeMapRotation: if cube map rotation is enabled.
* useRightHandedCubeMap: if the cube map uses a right-handed coordinate system. The convention for pre-generated cubemaps is left-handed.
* useTexCubeLod: if textureCubeLodEXT function should be used to read prefiltered cubemaps. Usually true of iOS, false on other devices due to quality/performance balance.
* useInstancing: if hardware instancing compatible shader should be generated. Transform is read from per-instance {@link VertexBuffer} instead of shader's uniforms.
* useMorphPosition: if morphing code should be generated to morph positions.
* useMorphNormal: if morphing code should be generated to morph normals.
 */
export class StandardMaterial extends Material {
    /**
     * Duplicates a Standard material. All properties are duplicated except textures
    where only the references are copied.
     * @returns A cloned Standard material.
     */
    clone(): StandardMaterial;
    /**
     * The ambient color of the material. This color value is 3-component (RGB),
     * where each component is between 0 and 1.
    */
    ambient: Color;
    /**
     * The diffuse color of the material. This color value is 3-component (RGB),
     * where each component is between 0 and 1.
     * Defines basic surface color (aka albedo).
    */
    diffuse: Color;
    /**
     * Multiply main (primary) diffuse map and/or diffuse vertex color by the constant diffuse value.
    */
    diffuseTint: boolean;
    /**
     * The main (primary) diffuse map of the material (default is null).
    */
    diffuseMap: Texture | null;
    /**
     * Main (primary) diffuse map UV channel.
    */
    diffuseMapUv: number;
    /**
     * Controls the 2D tiling of the main (primary) diffuse map.
    */
    diffuseMapTiling: Vec2;
    /**
     * Controls the 2D offset of the main (primary) diffuse map. Each component is between 0 and 1.
    */
    diffuseMapOffset: Vec2;
    /**
     * Color channels of the main (primary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    diffuseMapChannel: string;
    /**
     * Use mesh vertex colors for diffuse. If diffuseMap or are diffuseTint are set, they'll be multiplied by vertex colors.
    */
    diffuseVertexColor: boolean;
    /**
     * Vertex color channels to use for diffuse. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    diffuseVertexColorChannel: string;
    /**
     * The detail (secondary) diffuse map of the material (default is null). Will only be used if main (primary) diffuse map is non-null.
    */
    diffuseDetailMap: Texture | null;
    /**
     * Detail (secondary) diffuse map UV channel.
    */
    diffuseDetailMapUv: number;
    /**
     * Controls the 2D tiling of the detail (secondary) diffuse map.
    */
    diffuseDetailMapTiling: Vec2;
    /**
     * Controls the 2D offset of the detail (secondary) diffuse map. Each component is between 0 and 1.
    */
    diffuseDetailMapOffset: Vec2;
    /**
     * Color channels of the detail (secondary) diffuse map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    diffuseDetailMapChannel: string;
    /**
     * Determines how the main (primary) and detail (secondary) diffuse maps are blended together. Can be:
     * * {@link DETAILMODE_MUL}: Multiply together the primary and secondary colors.
     * * {@link DETAILMODE_ADD}: Add together the primary and secondary colors.
     * * {@link DETAILMODE_SCREEN}: Softer version of {@link DETAILMODE_ADD}.
     * * {@link DETAILMODE_OVERLAY}: Multiplies or screens the colors, depending on the primary color.
     * * {@link DETAILMODE_MIN}: Select whichever of the primary and secondary colors is darker, component-wise.
     * * {@link DETAILMODE_MAX}: Select whichever of the primary and secondary colors is lighter, component-wise.
     * Defaults to {@link DETAILMODE_MUL}.
    */
    diffuseDetailMode: string;
    /**
     * The specular color of the material. This color value is 3-component (RGB),
     * where each component is between 0 and 1.
     * Defines surface reflection/specular color. Affects specular intensity and tint.
    */
    specular: Color;
    /**
     * Multiply specular map and/or specular vertex color by the constant specular value.
    */
    specularTint: boolean;
    /**
     * The specular map of the material (default is null).
    */
    specularMap: Texture | null;
    /**
     * Specular map UV channel.
    */
    specularMapUv: number;
    /**
     * Controls the 2D tiling of the specular map.
    */
    specularMapTiling: Vec2;
    /**
     * Controls the 2D offset of the specular map. Each component is between 0 and 1.
    */
    specularMapOffset: Vec2;
    /**
     * Color channels of the specular map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    specularMapChannel: string;
    /**
     * Use mesh vertex colors for specular. If specularMap or are specularTint are set, they'll be multiplied by vertex colors.
    */
    specularVertexColor: boolean;
    /**
     * Vertex color channels to use for specular. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    specularVertexColorChannel: string;
    /**
     * Enables GGX specular. Also enables {@link StandardMaterial#anisotropy}  parameter to set material anisotropy.
    */
    enableGGXSpecular: boolean;
    /**
     * Defines amount of anisotropy. Requires {@link StandardMaterial#enableGGXSpecular} is set to true.
     * * When anisotropy == 0, specular is isotropic.
     * * When anisotropy < 0, anistropy direction aligns with the tangent, and specular anisotropy increases as the anisotropy value decreases to minimum of -1.
     * * When anisotropy > 0, anistropy direction aligns with the bi-normal, and specular anisotropy increases as anisotropy value increases to maximum of 1.
    */
    anisotropy: number;
    /**
     * Defines intensity of clear coat layer from 0 to 1. Clear coat layer is disabled when clearCoat == 0. Default value is 0 (disabled).
    */
    clearCoat: number;
    /**
     * Monochrome clear coat intensity map (default is null). If specified, will be multiplied by normalized 'clearCoat' value and/or vertex colors.
    */
    clearCoatMap: Texture | null;
    /**
     * Clear coat intensity map UV channel.
    */
    clearCoatMapUv: number;
    /**
     * Controls the 2D tiling of the clear coat intensity map.
    */
    clearCoatMapTiling: Vec2;
    /**
     * Controls the 2D offset of the clear coat intensity map. Each component is between 0 and 1.
    */
    clearCoatMapOffset: Vec2;
    /**
     * Color channel of the clear coat intensity map to use. Can be "r", "g", "b" or "a".
    */
    clearCoatMapChannel: string;
    /**
     * Use mesh vertex colors for clear coat intensity. If clearCoatMap is set, it'll be multiplied by vertex colors.
    */
    clearCoatVertexColor: boolean;
    /**
     * Vertex color channel to use for clear coat intensity. Can be "r", "g", "b" or "a".
    */
    clearCoatVertexColorChannel: string;
    /**
     * Defines the clear coat glossiness of the clear coat layer from 0 (rough) to 1 (mirror).
    */
    clearCoatGlossiness: number;
    /**
     * Monochrome clear coat glossiness map (default is null). If specified, will be multiplied by normalized 'clearCoatGlossiness' value and/or vertex colors.
    */
    clearCoatGlossMap: Texture | null;
    /**
     * Clear coat gloss map UV channel.
    */
    clearCoatGlossMapUv: number;
    /**
     * Controls the 2D tiling of the clear coat gloss map.
    */
    clearCoatGlossMapTiling: Vec2;
    /**
     * Controls the 2D offset of the clear coat gloss map. Each component is between 0 and 1.
    */
    clearCoatGlossMapOffset: Vec2;
    /**
     * Color channel of the clear coat gloss map to use. Can be "r", "g", "b" or "a".
    */
    clearCoatGlossMapChannel: string;
    /**
     * Use mesh vertex colors for clear coat glossiness. If clearCoatGlossMap is set, it'll be multiplied by vertex colors.
    */
    clearCoatGlossVertexColor: boolean;
    /**
     * Vertex color channel to use for clear coat glossiness. Can be "r", "g", "b" or "a".
    */
    clearCoatGlossVertexColorChannel: string;
    /**
     * The clear coat normal map of the material (default is null). The texture must contains normalized, tangent space normals.
    */
    clearCoatNormalMap: Texture | null;
    /**
     * Clear coat normal map UV channel.
    */
    clearCoatNormalMapUv: number;
    /**
     * Controls the 2D tiling of the main clear coat normal map.
    */
    clearCoatNormalMapTiling: Vec2;
    /**
     * Controls the 2D offset of the main clear coat normal map. Each component is between 0 and 1.
    */
    clearCoatNormalMapOffset: Vec2;
    /**
     * The bumpiness of the clear coat layer. This value scales the assigned main clear coat normal map.
     * It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect.
    */
    clearCoatBumpiness: number;
    /**
     * Use metalness properties instead of specular.
     * When enabled, diffuse colors also affect specular instead of the dedicated specular map.
     * This can be used as alternative to specular color to save space.
     * With metaless == 0, the pixel is assumed to be dielectric, and diffuse color is used as normal.
     * With metaless == 1, the pixel is fully metallic, and diffuse color is used as specular color instead.
    */
    useMetalness: boolean;
    /**
     * Defines how much the surface is metallic. From 0 (dielectric) to 1 (metal).
    */
    metalness: number;
    /**
     * Monochrome metalness map (default is null).
    */
    metalnessMap: Texture | null;
    /**
     * Metalness map UV channel.
    */
    metalnessMapUv: number;
    /**
     * Controls the 2D tiling of the metalness map.
    */
    metalnessMapTiling: Vec2;
    /**
     * Controls the 2D offset of the metalness map. Each component is between 0 and 1.
    */
    metalnessMapOffset: Vec2;
    /**
     * Color channel of the metalness map to use. Can be "r", "g", "b" or "a".
    */
    metalnessMapChannel: string;
    /**
     * Use mesh vertex colors for metalness. If metalnessMap is set, it'll be multiplied by vertex colors.
    */
    metalnessVertexColor: boolean;
    /**
     * Vertex color channel to use for metalness. Can be "r", "g", "b" or "a".
    */
    metalnessVertexColorChannel: string;
    /**
     * Defines glossiness of the material from 0 (rough) to 100 (shiny mirror).
     * A higher shininess value results in a more focused specular highlight.
     * Glossiness map/vertex colors are always multiplied by this value (normalized to 0 - 1 range), or it is used directly as constant output.
    */
    shininess: number;
    /**
     * Glossiness map (default is null). If specified, will be multiplied by normalized 'shininess' value and/or vertex colors.
    */
    glossMap: Texture | null;
    /**
     * Gloss map UV channel.
    */
    glossMapUv: number;
    /**
     * Color channel of the gloss map to use. Can be "r", "g", "b" or "a".
    */
    glossMapChannel: string;
    /**
     * Controls the 2D tiling of the gloss map.
    */
    glossMapTiling: Vec2;
    /**
     * Controls the 2D offset of the gloss map. Each component is between 0 and 1.
    */
    glossMapOffset: Vec2;
    /**
     * Use mesh vertex colors for glossiness. If glossMap is set, it'll be multiplied by vertex colors.
    */
    glossVertexColor: boolean;
    /**
     * Vertex color channel to use for glossiness. Can be "r", "g", "b" or "a".
    */
    glossVertexColorChannel: string;
    /**
     * Defines the visibility of refraction. Material can refract the same cube map as used for reflections.
    */
    refraction: number;
    /**
     * Defines the index of refraction, i.e. The amount of distortion.
     * The value is calculated as (outerIor / surfaceIor), where inputs are measured indices of refraction, the one around the object and the one of it's own surface.
     * In most situations outer medium is air, so outerIor will be approximately 1. Then you only need to do (1.0 / surfaceIor).
    */
    refractionIndex: number;
    /**
     * The emissive color of the material. This color value is 3-component (RGB),
     * where each component is between 0 and 1.
    */
    emissive: Color;
    /**
     * Multiply emissive map and/or emissive vertex color by the constant emissive value.
    */
    emissiveTint: boolean;
    /**
     * The emissive map of the material (default is null). Can be HDR.
    */
    emissiveMap: Texture | null;
    /**
     * Emissive color multiplier.
    */
    emissiveIntensity: number;
    /**
     * Emissive map UV channel.
    */
    emissiveMapUv: number;
    /**
     * Controls the 2D tiling of the emissive map.
    */
    emissiveMapTiling: Vec2;
    /**
     * Controls the 2D offset of the emissive map. Each component is between 0 and 1.
    */
    emissiveMapOffset: Vec2;
    /**
     * Color channels of the emissive map to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    emissiveMapChannel: string;
    /**
     * Use mesh vertex colors for emission. If emissiveMap or emissiveTint are set, they'll be multiplied by vertex colors.
    */
    emissiveVertexColor: boolean;
    /**
     * Vertex color channels to use for emission. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    emissiveVertexColorChannel: string;
    /**
     * The opacity of the material. This value can be between 0 and 1, where 0 is fully
     * transparent and 1 is fully opaque. If you want the material to be semi-transparent you also need to
     * set the {@link Material#blendType} to {@link BLEND_NORMAL}, {@link BLEND_ADDITIVE} or any other mode.
     * Also note that for most semi-transparent objects you want {@link Material#depthWrite} to be false, otherwise they can fully occlude objects behind them.
    */
    opacity: number;
    /**
     * The opacity map of the material (default is null).
    */
    opacityMap: Texture | null;
    /**
     * Opacity map UV channel.
    */
    opacityMapUv: number;
    /**
     * Color channel of the opacity map to use. Can be "r", "g", "b" or "a".
    */
    opacityMapChannel: string;
    /**
     * Controls the 2D tiling of the opacity map.
    */
    opacityMapTiling: Vec2;
    /**
     * Controls the 2D offset of the opacity map. Each component is between 0 and 1.
    */
    opacityMapOffset: Vec2;
    /**
     * Use mesh vertex colors for opacity. If opacityMap is set, it'll be multiplied by vertex colors.
    */
    opacityVertexColor: boolean;
    /**
     * Vertex color channels to use for opacity. Can be "r", "g", "b" or "a".
    */
    opacityVertexColorChannel: string;
    /**
     * used to specify whether specular and reflections are faded out using {@link StandardMaterial#opacity}. Default is true. When set to false use {@link Material#alphaFade} to fade out materials.
    */
    opacityFadesSpecular: boolean;
    /**
     * used to fade out materials when {@link StandardMaterial#opacityFadesSpecular} is set to false.
    */
    alphaFade: number;
    /**
     * The main (primary) normal map of the material (default is null).
     * The texture must contains normalized, tangent space normals.
    */
    normalMap: Texture | null;
    /**
     * Main (primary) normal map UV channel.
    */
    normalMapUv: number;
    /**
     * Controls the 2D tiling of the main (primary) normal map.
    */
    normalMapTiling: Vec2;
    /**
     * Controls the 2D offset of the main (primary) normal map. Each component is between 0 and 1.
    */
    normalMapOffset: Vec2;
    /**
     * The bumpiness of the material. This value scales the assigned main (primary) normal map.
     * It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect.
    */
    bumpiness: number;
    /**
     * The detail (secondary) normal map of the material (default is null). Will only be used if main (primary) normal map is non-null.
    */
    normalDetailMap: Texture | null;
    /**
     * Detail (secondary) normal map UV channel.
    */
    normalDetailMapUv: number;
    /**
     * Controls the 2D tiling of the detail (secondary) normal map.
    */
    normalDetailMapTiling: Vec2;
    /**
     * Controls the 2D offset of the detail (secondary) normal map. Each component is between 0 and 1.
    */
    normalDetailMapOffset: Vec2;
    /**
     * The bumpiness of the material. This value scales the assigned detail (secondary) normal map.
     * It should be normally between 0 (no bump mapping) and 1 (full bump mapping), but can be set to e.g. 2 to give even more pronounced bump effect.
    */
    normalDetailMapBumpiness: number;
    /**
     * The height map of the material (default is null). Used for a view-dependent parallax effect.
     * The texture must represent the height of the surface where darker pixels are lower and lighter pixels are higher.
     * It is recommended to use it together with a normal map.
    */
    heightMap: Texture | null;
    /**
     * Height map UV channel.
    */
    heightMapUv: number;
    /**
     * Color channel of the height map to use. Can be "r", "g", "b" or "a".
    */
    heightMapChannel: string;
    /**
     * Controls the 2D tiling of the height map.
    */
    heightMapTiling: Vec2;
    /**
     * Controls the 2D offset of the height map. Each component is between 0 and 1.
    */
    heightMapOffset: Vec2;
    /**
     * Height map multiplier. Affects the strength of the parallax effect.
    */
    heightMapFactor: number;
    /**
     * The spherical environment map of the material (default is null). Affects reflections.
    */
    sphereMap: Texture | null;
    /**
     * The cubic environment map of the material (default is null). Overrides sphereMap. Affects reflections. If cubemap is prefiltered, will also affect ambient color.
    */
    cubeMap: Texture | null;
    /**
     * The type of projection applied to the cubeMap property:
     * * {@link CUBEPROJ_NONE}: The cube map is treated as if it is infinitely far away.
     * * {@link CUBEPROJ_BOX}: Box-projection based on a world space axis-aligned bounding box.
     * Defaults to {@link CUBEPROJ_NONE}.
    */
    cubeMapProjection: number;
    /**
     * The world space axis-aligned bounding box defining the
     * box-projection used for the cubeMap property. Only used when cubeMapProjection is set to {@link CUBEPROJ_BOX}.
    */
    cubeMapProjectionBox: BoundingBox;
    /**
     * Environment map intensity.
    */
    reflectivity: number;
    /**
     * A custom lightmap of the material (default is null). Lightmaps are textures that contain pre-rendered lighting. Can be HDR.
    */
    lightMap: Texture | null;
    /**
     * Lightmap UV channel
    */
    lightMapUv: number;
    /**
     * Color channels of the lightmap to use. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    lightMapChannel: string;
    /**
     * Controls the 2D tiling of the lightmap.
    */
    lightMapTiling: Vec2;
    /**
     * Controls the 2D offset of the lightmap. Each component is between 0 and 1.
    */
    lightMapOffset: Vec2;
    /**
     * Use baked vertex lighting. If lightMap is set, it'll be multiplied by vertex colors.
    */
    lightVertexColor: boolean;
    /**
     * Vertex color channels to use for baked lighting. Can be "r", "g", "b", "a", "rgb" or any swizzled combination.
    */
    lightVertexColorChannel: string;
    /**
     * Enables scene ambient multiplication by material ambient color.
    */
    ambientTint: boolean;
    /**
     * Baked ambient occlusion (AO) map (default is null). Modulates ambient color.
    */
    aoMap: Texture | null;
    /**
     * AO map UV channel
    */
    aoMapUv: number;
    /**
     * Color channel of the AO map to use. Can be "r", "g", "b" or "a".
    */
    aoMapChannel: string;
    /**
     * Controls the 2D tiling of the AO map.
    */
    aoMapTiling: Vec2;
    /**
     * Controls the 2D offset of the AO map. Each component is between 0 and 1.
    */
    aoMapOffset: Vec2;
    /**
     * Use mesh vertex colors for AO. If aoMap is set, it'll be multiplied by vertex colors.
    */
    aoVertexColor: boolean;
    /**
     * Vertex color channels to use for AO. Can be "r", "g", "b" or "a".
    */
    aoVertexColorChannel: string;
    /**
     * Uses ambient occlusion to darken specular/reflection. It's a hack, because real specular occlusion is view-dependent. However, it can be better than nothing.
     * * {@link SPECOCC_NONE}: No specular occlusion
     * * {@link SPECOCC_AO}: Use AO directly to occlude specular.
     * * {@link SPECOCC_GLOSSDEPENDENT}: Modify AO based on material glossiness/view angle to occlude specular.
    */
    occludeSpecular: number;
    /**
     * Controls visibility of specular occlusion.
    */
    occludeSpecularIntensity: number;
    /**
     * Tells if AO should darken directional lighting.
    */
    occludeDirect: number;
    /**
     * Enables Toksvig AA for mipmapped normal maps with specular.
    */
    specularAntialias: boolean;
    /**
     * Defines how diffuse and specular components are combined when Fresnel is on.
     * It is recommended that you leave this option enabled, although you may want to disable it in case when all reflection comes only from a few light sources, and you don't use an environment map, therefore having mostly black reflection.
    */
    conserveEnergy: boolean;
    /**
     * Defines the shading model.
     * * {@link SPECULAR_PHONG}: Phong without energy conservation. You should only use it as a backwards compatibility with older projects.
     * * {@link SPECULAR_BLINN}: Energy-conserving Blinn-Phong.
    */
    shadingModel: number;
    /**
     * Defines the formula used for Fresnel effect.
     * As a side-effect, enabling any Fresnel model changes the way diffuse and reflection components are combined.
     * When Fresnel is off, legacy non energy-conserving combining is used. When it is on, combining behavior is defined by conserveEnergy parameter.
     * * {@link FRESNEL_NONE}: No Fresnel.
     * * {@link FRESNEL_SCHLICK}: Schlick's approximation of Fresnel (recommended). Parameterized by specular color.
    */
    fresnelModel: number;
    /**
     * Apply fogging (as configured in scene settings)
    */
    useFog: boolean;
    /**
     * Apply lighting
    */
    useLighting: boolean;
    /**
     * Apply scene skybox as prefiltered environment map
    */
    useSkybox: boolean;
    /**
     * Apply gamma correction and tonemapping (as configured in scene settings)
    */
    useGammaTonemap: boolean;
    /**
     * Align vertices to pixel co-ordinates when rendering. Useful for pixel perfect 2D graphics
    */
    pixelSnap: boolean;
    /**
     * Calculate proper normals (and therefore lighting) on backfaces
    */
    twoSidedLighting: boolean;
    /**
     * Object containing custom shader chunks that will replace default ones.
    */
    chunks: any;
    /**
     * A custom function that will be called after all shader generator properties are collected and before shader code is generated.
     * This function will receive an object with shader generator settings (based on current material and scene properties), that you can change and then return.
     * Returned value will be used instead. This is mostly useful when rendering the same set of objects, but with different shader variations based on the same material.
     * For example, you may wish to render a depth or normal pass using textures assigned to the material, a reflection pass with simpler shaders and so on.
     * Properties of the object passed into this function are:
     * * pass: value of {@link Layer#shaderPass} of the Layer being rendered.
     * * chunks: Object containing custom shader chunks that will replace default ones.
     * * customFragmentShader: Completely replace fragment shader with this code.
     * * forceUv1: if UV1 (second set of texture coordinates) is required in the shader. Will be declared as "vUv1" and passed to the fragment shader.
     * * fog: the type of fog being applied in the shader. See {@link Scene#fog} for the list of possible values.
     * * gamma: the type of gamma correction being applied in the shader. See {@link Scene#gammaCorrection} for the list of possible values.
     * * toneMap: the type of tone mapping being applied in the shader. See {@link Scene#toneMapping} for the list of possible values.
     * * ambientTint: the value of {@link StandardMaterial#ambientTint}.
     * * specularAntialias: the value of {@link StandardMaterial#specularAntialias}.
     * * conserveEnergy: the value of {@link StandardMaterial#conserveEnergy}.
     * * occludeSpecular: the value of {@link StandardMaterial#occludeSpecular}.
     * * occludeDirect: the value of {@link StandardMaterial#occludeDirect}.
     * * shadingModel: the value of {@link StandardMaterial#shadingModel}.
     * * fresnelModel: the value of {@link StandardMaterial#fresnelModel}.
     * * cubeMapProjection: the value of {@link StandardMaterial#cubeMapProjection}.
     * * useMetalness: the value of {@link StandardMaterial#useMetalness}.
     * * blendType: the value of {@link Material#blendType}.
     * * twoSidedLighting: the value of {@link Material#twoSidedLighting}.
     * * diffuseTint: defines if {@link StandardMaterial#diffuse} constant should affect diffuse color.
     * * specularTint: defines if {@link StandardMaterial#specular} constant should affect specular color.
     * * metalnessTint: defines if {@link StandardMaterial#metalness} constant should affect metalness value.
     * * glossTint: defines if {@link StandardMaterial#shininess} constant should affect glossiness value.
     * * emissiveTint: defines if {@link StandardMaterial#emissive} constant should affect emission value.
     * * opacityTint: defines if {@link StandardMaterial#opacity} constant should affect opacity value.
     * * occludeSpecularFloat: defines if {@link StandardMaterial#occludeSpecularIntensity} constant should affect specular occlusion.
     * * alphaTest: enable alpha testing. See {@link Material#alphaTest}.
     * * alphaToCoverage: enable alpha to coverage. See {@link Material#alphaToCoverage}.
     * * opacityFadesSpecular: enable specular fade. See {@link Material#opacityFadesSpecular}.
     * * alphaFade: fade value. See {@link Material#alphaFade}.
     * * sphereMap: if {@link StandardMaterial#sphereMap} is used.
     * * cubeMap: if {@link StandardMaterial#cubeMap} is used.
     * * dpAtlas: if dual-paraboloid reflection is used. Dual paraboloid reflections replace prefiltered cubemaps on certain platform (mostly Android) for performance reasons.
     * * ambientSH: if ambient spherical harmonics are used. Ambient SH replace prefiltered cubemap ambient on certain platform (mostly Android) for performance reasons.
     * * useSpecular: if any specular or reflections are needed at all.
     * * rgbmAmbient: if ambient cubemap or spherical harmonics are RGBM-encoded.
     * * hdrAmbient: if ambient cubemap or spherical harmonics are plain float HDR data.
     * * rgbmReflection: if reflection cubemap or dual paraboloid are RGBM-encoded.
     * * hdrReflection: if reflection cubemap or dual paraboloid are plain float HDR data.
     * * fixSeams: if cubemaps require seam fixing (see {@link Texture#options.fixCubemapSeams}).
     * * prefilteredCubemap: if prefiltered cubemaps are used.
     * * emissiveFormat: how emissiveMap must be sampled. This value is based on {@link Texture#options.rgbm} and {@link Texture#options.format}. Possible values are:
     * * 0: sRGB texture
     * * 1: RGBM-encoded HDR texture
     * * 2: Simple read (no conversion from sRGB)
     * * lightMapFormat: how lightMap must be sampled. This value is based on {@link Texture#options.rgbm} and {@link Texture#options.format}. Possible values are:
     * * 0: sRGB texture
     * * 1: RGBM-encoded HDR texture
     * * 2: Simple read (no conversion from sRGB)
     * * useRgbm: if decodeRGBM() function is needed in the shader at all.
     * * packedNormal: if normal map contains X in RGB, Y in Alpha, and Z must be reconstructed.
     * * forceFragmentPrecision: Override fragment shader numeric precision. Can be "lowp", "mediump", "highp" or null to use default.
     * * fastTbn: Use slightly cheaper normal mapping code (skip tangent space normalization). Can look buggy sometimes.
     * * refraction: if refraction is used.
     * * skyboxIntensity: if reflected skybox intensity should be modulated.
     * * useCubeMapRotation: if cube map rotation is enabled.
     * * useRightHandedCubeMap: if the cube map uses a right-handed coordinate system. The convention for pre-generated cubemaps is left-handed.
     * * useTexCubeLod: if textureCubeLodEXT function should be used to read prefiltered cubemaps. Usually true of iOS, false on other devices due to quality/performance balance.
     * * useInstancing: if hardware instancing compatible shader should be generated. Transform is read from per-instance {@link VertexBuffer} instead of shader's uniforms.
     * * useMorphPosition: if morphing code should be generated to morph positions.
     * * useMorphNormal: if morphing code should be generated to morph normals.
    */
    onUpdateShader: callbacks.UpdateShader;
}

/**
 * Create a new mesh instance.
 * @example
 * // Create a mesh instance pointing to a 1x1x1 'cube' mesh
var mesh = pc.createBox(graphicsDevice);
var material = new pc.StandardMaterial();
var node = new pc.GraphNode();
var meshInstance = new pc.MeshInstance(mesh, material, node);
 * @example
 * // A script you can attach on an entity to test if it is visible on a Layer
var MeshVisScript = pc.createScript('meshVisScript');
MeshVisScript.prototype.initialize = function () {
    var _this = this;
    this.app.scene.layers.getLayerByName("World").onPostCull = function (cameraIndex) {
        var meshInstance = _this.entity.model.model.meshInstances[0];
        console.log("visible: " + meshInstance.visibleThisFrame);
    };
};
 * @property aabb - The world space axis-aligned bounding box for this mesh instance.
 * @property visible - Enable rendering for this mesh instance. Use visible property to enable/disable rendering without overhead of removing from scene.
But note that the mesh instance is still in the hierarchy and still in the draw call list.
 * @property node - The graph node defining the transform for this instance.
 * @property mesh - The graphics mesh being instanced.
 * @property material - The material used by this mesh instance.
 * @property renderStyle - The render style of the mesh instance. Can be:

* {@link RENDERSTYLE_SOLID}
* {@link RENDERSTYLE_WIREFRAME}
* {@link RENDERSTYLE_POINTS}

Defaults to {@link RENDERSTYLE_SOLID}.
 * @property cull - Controls whether the mesh instance can be culled by with frustum culling ({@link CameraComponent#frustumCulling}).
 * @property drawOrder - Use this value to affect rendering order of mesh instances.
Only used when mesh instances are added to a {@link Layer} with {@link Layer#opaqueSortMode} or {@link Layer#transparentSortMode} (depending on the material) set to {@link SORTMODE_MANUAL}.
 * @property calculateSortDistance - In some circumstances mesh instances are sorted by a distance calculation to determine their rendering order.
Set this callback to override the default distance calculation, which gives the dot product of the camera forward vector and the vector between the camera position and
the center of the mesh instance's axis-aligned bounding box. This option can be particularly useful for rendering transparent meshes in a better order than default.
 * @property visibleThisFrame - Read this value in {@link Layer#onPostCull} to determine if the object is actually going to be rendered.
 * @param mesh - The graphics mesh being instanced.
 * @param material - The material used to render this instance.
 * @param [node] - The graph node defining the transform for this instance. This parameter is optional when used with {@link RenderComponent} and will use the node the component is attached to.
 */
export class MeshInstance {
    constructor(mesh: Mesh, material: Material, node?: GraphNode);
    /**
     * Mask controlling which {@link LightComponent}s light this mesh instance, which {@link CameraComponent} sees it and in which {@link Layer} it is rendered.
    Defaults to 1.
     */
    mask: number;
    /**
     * Number of instances when using hardware instancing to render the mesh.
     */
    instancingCount: number;
    /**
     * Sets up {@link MeshInstance} to be rendered using Hardware Instancing.
     * @param vertexBuffer - Vertex buffer to hold per-instance vertex data (usually world matrices).
    Pass null to turn off hardware instancing.
     */
    setInstancing(vertexBuffer: VertexBuffer | null): void;
    /**
     * Retrieves the specified shader parameter from a mesh instance.
     * @param name - The name of the parameter to query.
     * @returns The named parameter.
     */
    getParameter(name: string): any;
    /**
     * Sets a shader parameter on a mesh instance. Note that this parameter will take precedence over parameter of the same name
    if set on Material this mesh instance uses for rendering.
     * @param name - The name of the parameter to set.
     * @param data - The value for the specified parameter.
     * @param [passFlags] - Mask describing which passes the material should be included in.
     */
    setParameter(name: string, data: number | number[] | Texture, passFlags?: number): void;
    /**
     * Deletes a shader parameter on a mesh instance.
     * @param name - The name of the parameter to delete.
     */
    deleteParameter(name: string): void;
    /**
     * The world space axis-aligned bounding box for this mesh instance.
    */
    aabb: BoundingBox;
    /**
     * Enable rendering for this mesh instance. Use visible property to enable/disable rendering without overhead of removing from scene.
     * But note that the mesh instance is still in the hierarchy and still in the draw call list.
    */
    visible: boolean;
    /**
     * The graph node defining the transform for this instance.
    */
    node: GraphNode;
    /**
     * The graphics mesh being instanced.
    */
    mesh: Mesh;
    /**
     * The material used by this mesh instance.
    */
    material: Material;
    /**
     * The render style of the mesh instance. Can be:
     * * {@link RENDERSTYLE_SOLID}
     * * {@link RENDERSTYLE_WIREFRAME}
     * * {@link RENDERSTYLE_POINTS}
     * Defaults to {@link RENDERSTYLE_SOLID}.
    */
    renderStyle: number;
    /**
     * Controls whether the mesh instance can be culled by with frustum culling ({@link CameraComponent#frustumCulling}).
    */
    cull: boolean;
    /**
     * Use this value to affect rendering order of mesh instances.
     * Only used when mesh instances are added to a {@link Layer} with {@link Layer#opaqueSortMode} or {@link Layer#transparentSortMode} (depending on the material) set to {@link SORTMODE_MANUAL}.
    */
    drawOrder: number;
    /**
     * In some circumstances mesh instances are sorted by a distance calculation to determine their rendering order.
     * Set this callback to override the default distance calculation, which gives the dot product of the camera forward vector and the vector between the camera position and
     * the center of the mesh instance's axis-aligned bounding box. This option can be particularly useful for rendering transparent meshes in a better order than default.
    */
    calculateSortDistance: callbacks.CalculateSortDistance;
    /**
     * Read this value in {@link Layer#onPostCull} to determine if the object is actually going to be rendered.
    */
    visibleThisFrame: boolean;
}

/**
 * Create a new mesh.
 * @property vertexBuffer - The vertex buffer holding the vertex data of the mesh.
 * @property indexBuffer - An array of index buffers. For unindexed meshes, this array can
be empty. The first index buffer in the array is used by {@link MeshInstance}s with a renderStyle
property set to {@link RENDERSTYLE_SOLID}. The second index buffer in the array is used if renderStyle is
set to {@link RENDERSTYLE_WIREFRAME}.
 * @property primitive - Array of primitive objects defining how vertex (and index) data in the
mesh should be interpreted by the graphics device. For details on the primitive object, see.
 * @property primitive[].type - The type of primitive to render. Can be:

* {@link PRIMITIVE_POINTS}
* {@link PRIMITIVE_LINES}
* {@link PRIMITIVE_LINELOOP}
* {@link PRIMITIVE_LINESTRIP}
* {@link PRIMITIVE_TRIANGLES}
* {@link PRIMITIVE_TRISTRIP}
* {@link PRIMITIVE_TRIFAN}
 * @property primitive[].base - The offset of the first index or vertex to dispatch in the draw call.
 * @property primitive[].count - The number of indices or vertices to dispatch in the draw call.
 * @property [primitive[].indexed] - True to interpret the primitive as indexed, thereby using the currently set index buffer and false otherwise.
{@link GraphicsDevice#draw}. The primitive is ordered based on render style like the indexBuffer property.
 * @property aabb - The axis-aligned bounding box for the object space vertices of this mesh.
 * @property [skin] - The skin data (if any) that drives skinned mesh animations for this mesh.
 * @property [morph] - The morph data (if any) that drives morph target animations for this mesh.
 * @param [graphicsDevice] - The graphics device used to manage this mesh. If it is not provided, a device is obtained
from the {@link Application}.
 */
export class Mesh {
    constructor(graphicsDevice?: GraphicsDevice);
    /**
     * Destroys {@link VertexBuffer} and {@link IndexBuffer} associate with the mesh.
    This is normally called by {@link Model#destroy} and does not need to be called manually.
     */
    destroy(): void;
    /**
     * Clears the mesh of existing vertices and indices and resets the
    {@link VertexFormat} associated with the mesh. This call is typically followed by calls
    to methods such as {@link Mesh#setPositions}, {@link Mesh#setVertexStream} or {@link Mesh#setIndices} and
    finally {@link Mesh#update} to rebuild the mesh, allowing different {@link VertexFormat}.
     * @param [verticesDynamic] - Indicates the {@link VertexBuffer} should be created with {@link BUFFER_DYNAMIC} usage. If not specified, {@link BUFFER_STATIC} is used.
     * @param [indicesDynamic] - Indicates the {@link IndexBuffer} should be created with {@link BUFFER_DYNAMIC} usage. If not specified, {@link BUFFER_STATIC} is used.
     * @param [maxVertices] - {@link VertexBuffer} will be allocated with at least maxVertices, allowing additional vertices to be added to it without the allocation. If
    no value is provided, a size to fit the provided vertices will be allocated.
     * @param [maxIndices] - {@link IndexBuffer} will be allocated with at least maxIndices, allowing additional indices to be added to it without the allocation. If
    no value is provided, a size to fit the provided indices will be allocated.
     */
    clear(verticesDynamic?: boolean, indicesDynamic?: boolean, maxVertices?: number, maxIndices?: number): void;
    /**
     * Sets the vertex data for any supported semantic.
     * @param semantic - The meaning of the vertex element. For supported semantics, see SEMANTIC_* in {@link VertexFormat}.
     * @param data - Vertex data for the specified semantic.
     * @param componentCount - The number of values that form a single Vertex element. For example when setting a 3D position represented by 3 numbers
    per vertex, number 3 should be specified.
     * @param [numVertices] - The number of vertices to be used from data array. If not provided, the whole data array is used. This allows to use only part of the data array.
     * @param [dataType] - The format of data when stored in the {@link VertexBuffer}, see TYPE_* in {@link VertexFormat}. When not specified, {@link TYPE_FLOAT32} is used.
     * @param [dataTypeNormalize] - If true, vertex attribute data will be mapped from a 0 to 255 range down to 0 to 1 when fed to a shader.
    If false, vertex attribute data is left unchanged. If this property is unspecified, false is assumed.
     */
    setVertexStream(semantic: string, data: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array, componentCount: number, numVertices?: number, dataType?: number, dataTypeNormalize?: boolean): void;
    /**
     * Gets the vertex data corresponding to a semantic.
     * @param semantic - The semantic of the vertex element to get. For supported semantics, see SEMANTIC_* in {@link VertexFormat}.
     * @param data - An array to populate with the vertex data.
    When typed array is supplied, enough space needs to be reserved, otherwise only partial data is copied.
     * @returns Returns the number of vertices populated.
     */
    getVertexStream(semantic: string, data: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array): number;
    /**
     * Sets the vertex positions array. Vertices are stored using {@link TYPE_FLOAT32} format.
     * @param positions - Vertex data containing positions.
     * @param [componentCount] - The number of values that form a single position element. Defaults to 3 if not specified, corresponding to x, y and z coordinates.
     * @param [numVertices] - The number of vertices to be used from data array. If not provided, the whole data array is used. This allows to use only part of the data array.
     */
    setPositions(positions: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array, componentCount?: number, numVertices?: number): void;
    /**
     * Sets the vertex normals array. Normals are stored using {@link TYPE_FLOAT32} format.
     * @param normals - Vertex data containing normals.
     * @param [componentCount] - The number of values that form a single normal element. Defaults to 3 if not specified, corresponding to x, y and z direction.
     * @param [numVertices] - The number of vertices to be used from data array. If not provided, the whole data array is used. This allows to use only part of the data array.
     */
    setNormals(normals: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array, componentCount?: number, numVertices?: number): void;
    /**
     * Sets the vertex uv array. Uvs are stored using {@link TYPE_FLOAT32} format.
     * @param channel - The uv channel in [0..7] range.
     * @param uvs - Vertex data containing uv-coordinates.
     * @param [componentCount] - The number of values that form a single uv element. Defaults to 2 if not specified, corresponding to u and v coordinates.
     * @param [numVertices] - The number of vertices to be used from data array. If not provided, the whole data array is used. This allows to use only part of the data array.
     */
    setUvs(channel: number, uvs: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array, componentCount?: number, numVertices?: number): void;
    /**
     * Sets the vertex color array. Colors are stored using {@link TYPE_FLOAT32} format, which is useful for HDR colors.
     * @param colors - Vertex data containing colors.
     * @param [componentCount] - The number of values that form a single color element. Defaults to 4 if not specified, corresponding to r, g, b and a.
     * @param [numVertices] - The number of vertices to be used from data array. If not provided, the whole data array is used. This allows to use only part of the data array.
     */
    setColors(colors: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array, componentCount?: number, numVertices?: number): void;
    /**
     * Sets the vertex color array. Colors are stored using {@link TYPE_UINT8} format, which is useful for LDR colors. Values in the array are expected in
    [0..255] range, and are mapped to [0..1] range in the shader.
     * @param colors - Vertex data containing colors. The array is
    expected to contain 4 components per vertex, corresponding to r, g, b and a.
     * @param [numVertices] - The number of vertices to be used from data array. If not provided, the whole data array is used. This allows to use only part of the data array.
     */
    setColors32(colors: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array, numVertices?: number): void;
    /**
     * Sets the index array. Indices are stored using 16-bit format by default, unless more than 65535 vertices are specified, in which case 32-bit format is used.
     * @param indices - The array of indicies that define primitives (lines, triangles, etc.).
     * @param [numIndices] - The number of indices to be used from data array. If not provided, the whole data array is used. This allows to use only part of the data array.
     */
    setIndices(indices: number[] | Uint8Array | Uint16Array | Uint32Array, numIndices?: number): void;
    /**
     * Gets the vertex positions data.
     * @param positions - An array to populate with the vertex data.
    When typed array is supplied, enough space needs to be reserved, otherwise only partial data is copied.
     * @returns Returns the number of vertices populated.
     */
    getPositions(positions: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array): number;
    /**
     * Gets the vertex normals data.
     * @param normals - An array to populate with the vertex data.
    When typed array is supplied, enough space needs to be reserved, otherwise only partial data is copied.
     * @returns Returns the number of vertices populated.
     */
    getNormals(normals: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array): number;
    /**
     * Gets the vertex uv data.
     * @param channel - The uv channel in [0..7] range.
     * @param uvs - An array to populate with the vertex data.
    When typed array is supplied, enough space needs to be reserved, otherwise only partial data is copied.
     * @returns Returns the number of vertices populated.
     */
    getUvs(channel: number, uvs: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array): number;
    /**
     * Gets the vertex color data.
     * @param colors - An array to populate with the vertex data.
    When typed array is supplied, enough space needs to be reserved, otherwise only partial data is copied.
     * @returns Returns the number of vertices populated.
     */
    getColors(colors: number[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array): number;
    /**
     * Gets the index data.
     * @param indices - An array to populate with the index data.
    When a typed array is supplied, enough space needs to be reserved, otherwise only partial data is copied.
     * @returns Returns the number of indices populated.
     */
    getIndices(indices: number[] | Uint8Array | Uint16Array | Uint32Array): number;
    /**
     * Applies any changes to vertex stream and indices to mesh. This allocates or reallocates {@link vertexBuffer} or {@link IndexBuffer}
    to fit all provided vertices and indices, and fills them with data.
     * @param [primitiveType] - The type of primitive to render. Can be one of PRIMITIVE_* - see primitive[].type section above. Defaults
    to {@link PRIMITIVE_TRIANGLES} if unspecified.
     * @param [updateBoundingBox] - True to update bounding box. Bounding box is updated only if positions were set since last time update
    was called, and componentCount for position was 3, otherwise bounding box is not updated. See {@link Mesh#setPositions}. Defaults to true if unspecified.
    Set this to false to avoid update of the bounding box and use aabb property to set it instead.
     */
    update(primitiveType?: number, updateBoundingBox?: boolean): void;
    /**
     * The vertex buffer holding the vertex data of the mesh.
    */
    vertexBuffer: VertexBuffer;
    /**
     * An array of index buffers. For unindexed meshes, this array can
     * be empty. The first index buffer in the array is used by {@link MeshInstance}s with a renderStyle
     * property set to {@link RENDERSTYLE_SOLID}. The second index buffer in the array is used if renderStyle is
     * set to {@link RENDERSTYLE_WIREFRAME}.
    */
    indexBuffer: IndexBuffer[];
    /**
     * Array of primitive objects defining how vertex (and index) data in the
     * mesh should be interpreted by the graphics device. For details on the primitive object, see.
    */
    primitive: {
        type: number;
        base: number;
        count: number;
        indexed?: boolean;
    }[];
    /**
     * The axis-aligned bounding box for the object space vertices of this mesh.
    */
    aabb: BoundingBox;
    /**
     * The skin data (if any) that drives skinned mesh animations for this mesh.
    */
    skin?: Skin;
    /**
     * The morph data (if any) that drives morph target animations for this mesh.
    */
    morph?: Morph;
}

/**
 * Creates a new model.
 * @example
 * // Create a new model
var model = new pc.Model();
 * @property graph - The root node of the model's graph node hierarchy.
 * @property meshInstances - An array of MeshInstances contained in this model.
 * @property skinInstances - An array of SkinInstances contained in this model.
 * @property morphInstances - An array of MorphInstances contained in this model.
 */
export class Model {
    /**
     * Clones a model. The returned model has a newly created hierarchy
    and mesh instances, but meshes are shared between the clone and the specified
    model.
     * @example
     * var clonedModel = model.clone();
     * @returns A clone of the specified model.
     */
    clone(): Model;
    /**
     * Destroys skinning texture and possibly deletes vertex/index buffers of a model.
    Mesh is reference-counted, so buffers are only deleted if all models with referencing mesh instances were deleted.
    That means all in-scene models + the "base" one (asset.resource) which is created when the model is parsed.
    It is recommended to use asset.unload() instead, which will also remove the model from the scene.
     */
    destroy(): void;
    /**
     * Generates the necessary internal data for a model to be
    renderable as wireframe. Once this function has been called, any mesh
    instance in the model can have its renderStyle property set to
    {@link RENDERSTYLE_WIREFRAME}.
     * @example
     * model.generateWireframe();
    for (var i = 0; i < model.meshInstances.length; i++) {
        model.meshInstances[i].renderStyle = pc.RENDERSTYLE_WIREFRAME;
    }
     */
    generateWireframe(): void;
    /**
     * The root node of the model's graph node hierarchy.
    */
    graph: GraphNode;
    /**
     * An array of MeshInstances contained in this model.
    */
    meshInstances: MeshInstance[];
    /**
     * An array of SkinInstances contained in this model.
    */
    skinInstances: SkinInstance[];
    /**
     * An array of MorphInstances contained in this model.
    */
    morphInstances: MorphInstance[];
}

/**
 * An instance of {@link Morph}. Contains weights to assign to every {@link MorphTarget}, manages selection of active morph targets.
 * @param morph - The {@link Morph} to instance.
 */
export class MorphInstance {
    constructor(morph: Morph);
    /**
     * Frees video memory allocated by this object.
     */
    destroy(): void;
    /**
     * Clones a MorphInstance. The returned clone uses the same {@link Morph} and weights are set to defaults.
     * @returns A clone of the specified MorphInstance.
     */
    clone(): MorphInstance;
    /**
     * Gets current weight of the specified morph target.
     * @param index - An index of morph target.
     * @returns Weight.
     */
    getWeight(index: number): number;
    /**
     * Sets weight of the specified morph target.
     * @param index - An index of morph target.
     * @param weight - Weight.
     */
    setWeight(index: number, weight: number): void;
    /**
     * Selects active morph targets and prepares morph for rendering. Called automatically by renderer.
     */
    update(): void;
}

/**
 * A Morph Target (also known as Blend Shape) contains deformation data to apply to existing mesh.
Multiple morph targets can be blended together on a mesh. This is useful for effects that are hard to achieve with conventional animation and skinning.
 * @param options - Object for passing optional arguments.
 * @param options.deltaPositions - An array of 3-dimensional vertex position offsets.
 * @param options.deltaPositionsType - A format to store position offsets inside {@link VertexBuffer}. Defaults to {@link TYPE_FLOAT32} if not provided.
 * @param [options.deltaNormals] - An array of 3-dimensional vertex normal offsets.
 * @param options.deltaNormalsType - A format to store normal offsets inside {@link VertexBuffer}. Defaults to {@link TYPE_FLOAT32} if not provided.
 * @param [options.name] - Name.
 * @param [options.aabb] - Bounding box. Will be automatically generated, if undefined.
 * @param [options.defaultWeight] - Default blend weight to use for this morph target.
 */
export class MorphTarget {
    constructor(options: {
        deltaPositions: ArrayBuffer;
        deltaPositionsType: number;
        deltaNormals?: ArrayBuffer;
        deltaNormalsType: number;
        name?: string;
        aabb?: BoundingBox;
        defaultWeight?: number;
    });
}

/**
 * Contains a list of {@link MorphTarget}, a combined delta AABB and some associated data.
 * @param targets - A list of morph targets.
 * @param graphicsDevice - The graphics device used to manage this morph target. If it is not provided, a device is obtained
from the {@link Application}.
 */
export class Morph {
    constructor(targets: MorphTarget[], graphicsDevice: GraphicsDevice);
    /**
     * Frees video memory allocated by this object.
     */
    destroy(): void;
    /**
     * Gets the morph target by index.
     * @param index - An index of morph target.
     * @returns A morph target object.
     */
    getTarget(index: number): MorphTarget;
}

/**
 * Create a new instance of a Picker object.
 * @property width - Width of the pick buffer in pixels (read-only).
 * @property height - Height of the pick buffer in pixels (read-only).
 * @property renderTarget - The render target used by the picker internally (read-only).
 * @param app - The application managing this picker instance.
 * @param width - The width of the pick buffer in pixels.
 * @param height - The height of the pick buffer in pixels.
 */
export class Picker {
    constructor(app: Application, width: number, height: number);
    /**
     * Return the list of mesh instances selected by the specified rectangle in the
    previously prepared pick buffer.The rectangle using top-left coordinate system.
     * @example
     * // Get the selection at the point (10,20)
    var selection = picker.getSelection(10, 20);
     * @example
     * // Get all models in rectangle with corners at (10,20) and (20,40)
    var selection = picker.getSelection(10, 20, 10, 20);
     * @param x - The left edge of the rectangle.
     * @param y - The top edge of the rectangle.
     * @param [width] - The width of the rectangle.
     * @param [height] - The height of the rectangle.
     * @returns An array of mesh instances that are in the selection.
     */
    getSelection(x: number, y: number, width?: number, height?: number): MeshInstance[];
    /**
     * Primes the pick buffer with a rendering of the specified models from the point of view
    of the supplied camera. Once the pick buffer has been prepared, {@link Picker#getSelection} can be
    called multiple times on the same picker object. Therefore, if the models or camera do not change
    in any way, {@link Picker#prepare} does not need to be called again.
     * @param camera - The camera component used to render the scene.
     * @param scene - The scene containing the pickable mesh instances.
     * @param [arg] - Layer or RenderTarget from which objects will be picked.
    If not supplied, all layers rendering to backbuffer before this layer will be used.
     */
    prepare(camera: CameraComponent, scene: Scene, arg?: Layer | RenderTarget): void;
    /**
     * Sets the resolution of the pick buffer. The pick buffer resolution does not need
    to match the resolution of the corresponding frame buffer use for general rendering of the
    3D scene. However, the lower the resolution of the pick buffer, the less accurate the selection
    results returned by {@link Picker#getSelection}. On the other hand, smaller pick buffers will
    yield greater performance, so there is a trade off.
     * @param width - The width of the pick buffer in pixels.
     * @param height - The height of the pick buffer in pixels.
     */
    resize(width: number, height: number): void;
    /**
     * Width of the pick buffer in pixels (read-only).
    */
    width: number;
    /**
     * Height of the pick buffer in pixels (read-only).
    */
    height: number;
    /**
     * The render target used by the picker internally (read-only).
    */
    renderTarget: RenderTarget;
}

/**
 * Generates normal information from the specified positions and
triangle indices. See {@link createMesh}.
 * @example
 * var normals = pc.calculateNormals(positions, indices);
var tangents = pc.calculateTangents(positions, normals, uvs, indices);
var mesh = pc.createMesh(positions, normals, tangents, uvs, indices);
 * @param positions - An array of 3-dimensional vertex positions.
 * @param indices - An array of triangle indices.
 * @returns An array of 3-dimensional vertex normals.
 */
export function calculateNormals(positions: number[], indices: number[]): number[];

/**
 * Generates tangent information from the specified positions,
normals, texture coordinates and triangle indices. See {@link createMesh}.
 * @example
 * var tangents = pc.calculateTangents(positions, normals, uvs, indices);
var mesh = pc.createMesh(positions, normals, tangents, uvs, indices);
 * @param positions - An array of 3-dimensional vertex positions.
 * @param normals - An array of 3-dimensional vertex normals.
 * @param uvs - An array of 2-dimensional vertex texture coordinates.
 * @param indices - An array of triangle indices.
 * @returns An array of 3-dimensional vertex tangents.
 */
export function calculateTangents(positions: number[], normals: number[], uvs: number[], indices: number[]): number[];

/**
 * Creates a new mesh object from the supplied vertex information and topology.
 * @example
 * // Create a simple, indexed triangle (with texture coordinates and vertex normals)
var mesh = pc.createMesh(graphicsDevice, [0, 0, 0, 1, 0, 0, 0, 1, 0], {
    normals: [0, 0, 1, 0, 0, 1, 0, 0, 1],
    uvs: [0, 0, 1, 0, 0, 1],
    indices: [0, 1, 2]
});
 * @param device - The graphics device used to manage the mesh.
 * @param positions - An array of 3-dimensional vertex positions.
 * @param [opts] - An object that specifies optional inputs for the function as follows:
 * @param [opts.normals] - An array of 3-dimensional vertex normals.
 * @param [opts.tangents] - An array of 3-dimensional vertex tangents.
 * @param [opts.colors] - An array of 4-dimensional vertex colors where each
component is an integer in the range 0 to 255.
 * @param [opts.uvs] - An array of 2-dimensional vertex texture coordinates.
 * @param [opts.uvs1] - Same as opts.uvs, but for additional UV set
 * @param [opts.blendIndices] - An array of 4-dimensional bone indices where each
component is an integer in the range 0 to 255.
 * @param [opts.blendWeights] - An array of 4-dimensional bone weights where each
component is in the range 0 to 1 and the sum of the weights should equal 1.
 * @param [opts.indices] - An array of triangle indices.
 * @returns A new Mesh constructed from the supplied vertex and triangle data.
 */
export function createMesh(device: GraphicsDevice, positions: number[], opts?: {
    normals?: number[];
    tangents?: number[];
    colors?: number[];
    uvs?: number[];
    uvs1?: number[];
    blendIndices?: number[];
    blendWeights?: number[];
    indices?: number[];
}): Mesh;

/**
 * Creates a procedural torus-shaped mesh.

The size, shape and tesselation properties of the torus can be controlled via function parameters.
By default, the function will create a torus in the XZ-plane with a tube radius of 0.2, a ring radius
of 0.3, 20 segments and 30 sides.

Note that the torus is created with UVs in the range of 0 to 1. Additionally, tangent information
is generated into the vertex buffer of the torus's mesh.
 * @param device - The graphics device used to manage the mesh.
 * @param [opts] - An object that specifies optional inputs for the function as follows:
 * @param [opts.tubeRadius] - The radius of the tube forming the body of the torus (defaults to 0.2).
 * @param [opts.ringRadius] - The radius from the centre of the torus to the centre of the tube (defaults to 0.3).
 * @param [opts.segments] - The number of radial divisions forming cross-sections of the torus ring (defaults to 20).
 * @param [opts.sides] - The number of divisions around the tubular body of the torus ring (defaults to 30).
 * @returns A new torus-shaped mesh.
 */
export function createTorus(device: GraphicsDevice, opts?: {
    tubeRadius?: number;
    ringRadius?: number;
    segments?: number;
    sides?: number;
}): Mesh;

/**
 * Creates a procedural cylinder-shaped mesh.

The size, shape and tesselation properties of the cylinder can be controlled via function parameters.
By default, the function will create a cylinder standing vertically centered on the XZ-plane with a radius
of 0.5, a height of 1.0, 1 height segment and 20 cap segments.

Note that the cylinder is created with UVs in the range of 0 to 1. Additionally, tangent information
is generated into the vertex buffer of the cylinder's mesh.
 * @param device - The graphics device used to manage the mesh.
 * @param [opts] - An object that specifies optional inputs for the function as follows:
 * @param [opts.radius] - The radius of the tube forming the body of the cylinder (defaults to 0.5).
 * @param [opts.height] - The length of the body of the cylinder (defaults to 1.0).
 * @param [opts.heightSegments] - The number of divisions along the length of the cylinder (defaults to 5).
 * @param [opts.capSegments] - The number of divisions around the tubular body of the cylinder (defaults to 20).
 * @returns A new cylinder-shaped mesh.
 */
export function createCylinder(device: GraphicsDevice, opts?: {
    radius?: number;
    height?: number;
    heightSegments?: number;
    capSegments?: number;
}): Mesh;

/**
 * Creates a procedural capsule-shaped mesh.

The size, shape and tesselation properties of the capsule can be controlled via function
parameters. By default, the function will create a capsule standing vertically centered
on the XZ-plane with a radius of 0.25, a height of 1.0, 1 height segment and 10 cap
segments.

Note that the capsule is created with UVs in the range of 0 to 1. Additionally, tangent information
is generated into the vertex buffer of the capsule's mesh.
 * @param device - The graphics device used to manage the mesh.
 * @param [opts] - An object that specifies optional inputs for the function as follows:
 * @param [opts.radius] - The radius of the tube forming the body of the capsule (defaults to 0.3).
 * @param [opts.height] - The length of the body of the capsule from tip to tip (defaults to 1.0).
 * @param [opts.heightSegments] - The number of divisions along the tubular length of the capsule (defaults to 1).
 * @param [opts.sides] - The number of divisions around the tubular body of the capsule (defaults to 20).
 * @returns A new cylinder-shaped mesh.
 */
export function createCapsule(device: GraphicsDevice, opts?: {
    radius?: number;
    height?: number;
    heightSegments?: number;
    sides?: number;
}): Mesh;

/**
 * Creates a procedural cone-shaped mesh.

The size, shape and tesselation properties of the cone can be controlled via function
parameters. By default, the function will create a cone standing vertically centered
on the XZ-plane with a base radius of 0.5, a height of 1.0, 5 height segments and 20
cap segments.

Note that the cone is created with UVs in the range of 0 to 1. Additionally, tangent
information is generated into the vertex buffer of the cone's mesh.
 * @param device - The graphics device used to manage the mesh.
 * @param [opts] - An object that specifies optional inputs for the function as follows:
 * @param [opts.baseRadius] - The base radius of the cone (defaults to 0.5).
 * @param [opts.peakRadius] - The peak radius of the cone (defaults to 0.0).
 * @param [opts.height] - The length of the body of the cone (defaults to 1.0).
 * @param [opts.heightSegments] - The number of divisions along the length of the cone (defaults to 5).
 * @param [opts.capSegments] - The number of divisions around the tubular body of the cone (defaults to 18).
 * @returns A new cone-shaped mesh.
 */
export function createCone(device: GraphicsDevice, opts?: {
    baseRadius?: number;
    peakRadius?: number;
    height?: number;
    heightSegments?: number;
    capSegments?: number;
}): Mesh;

/**
 * Creates a procedural sphere-shaped mesh.

The size and tesselation properties of the sphere can be controlled via function
parameters. By default, the function will create a sphere centered on the object
space origin with a radius of 0.5 and 16 segments in both longitude and latitude.

Note that the sphere is created with UVs in the range of 0 to 1. Additionally, tangent
information is generated into the vertex buffer of the sphere's mesh.
 * @param device - The graphics device used to manage the mesh.
 * @param [opts] - An object that specifies optional inputs for the function as follows:
 * @param [opts.radius] - The radius of the sphere (defaults to 0.5).
 * @param [opts.segments] - The number of divisions along the longitudinal
and latitudinal axes of the sphere (defaults to 16).
 * @returns A new sphere-shaped mesh.
 */
export function createSphere(device: GraphicsDevice, opts?: {
    radius?: number;
    segments?: number;
}): Mesh;

/**
 * Creates a procedural plane-shaped mesh.

The size and tesselation properties of the plane can be controlled via function
parameters. By default, the function will create a plane centered on the object
space origin with a width and length of 1.0 and 5 segments in either axis (50
triangles). The normal vector of the plane is aligned along the positive Y axis.

Note that the plane is created with UVs in the range of 0 to 1. Additionally, tangent
information is generated into the vertex buffer of the plane's mesh.
 * @param device - The graphics device used to manage the mesh.
 * @param [opts] - An object that specifies optional inputs for the function as follows:
 * @param [opts.halfExtents] - The half dimensions of the plane in the X and Z axes (defaults to [0.5, 0.5]).
 * @param [opts.widthSegments] - The number of divisions along the X axis of the plane (defaults to 5).
 * @param [opts.lengthSegments] - The number of divisions along the Z axis of the plane (defaults to 5).
 * @returns A new plane-shaped mesh.
 */
export function createPlane(device: GraphicsDevice, opts?: {
    halfExtents?: Vec2;
    widthSegments?: number;
    lengthSegments?: number;
}): Mesh;

/**
 * Creates a procedural box-shaped mesh.

The size, shape and tesselation properties of the box can be controlled via function parameters. By
default, the function will create a box centered on the object space origin with a width, length and
height of 1.0 unit and 10 segments in either axis (50 triangles per face).

Note that the box is created with UVs in the range of 0 to 1 on each face. Additionally, tangent
information is generated into the vertex buffer of the box's mesh.
 * @param device - The graphics device used to manage the mesh.
 * @param [opts] - An object that specifies optional inputs for the function as follows:
 * @param [opts.halfExtents] - The half dimensions of the box in each axis (defaults to [0.5, 0.5, 0.5]).
 * @param [opts.widthSegments] - The number of divisions along the X axis of the box (defaults to 1).
 * @param [opts.lengthSegments] - The number of divisions along the Z axis of the box (defaults to 1).
 * @param [opts.heightSegments] - The number of divisions along the Y axis of the box (defaults to 1).
 * @returns A new box-shaped mesh.
 */
export function createBox(device: GraphicsDevice, opts?: {
    halfExtents?: Vec3;
    widthSegments?: number;
    lengthSegments?: number;
    heightSegments?: number;
}): Mesh;

/**
 * Creates a new Scene.
 * @property ambientLight - The color of the scene's ambient light. Defaults
to black (0, 0, 0).
 * @property fog - The type of fog used by the scene. Can be:

* {@link FOG_NONE}
* {@link FOG_LINEAR}
* {@link FOG_EXP}
* {@link FOG_EXP2}

Defaults to {@link FOG_NONE}.
 * @property fogColor - The color of the fog (if enabled). Defaults to black
(0, 0, 0).
 * @property fogDensity - The density of the fog (if enabled). This property
is only valid if the fog property is set to {@link FOG_EXP} or {@link FOG_EXP2}. Defaults to 0.
 * @property fogEnd - The distance from the viewpoint where linear fog reaches
its maximum. This property is only valid if the fog property is set to {@link FOG_LINEAR}.
Defaults to 1000.
 * @property fogStart - The distance from the viewpoint where linear fog begins.
This property is only valid if the fog property is set to {@link FOG_LINEAR}. Defaults to 1.
 * @property gammaCorrection - The gamma correction to apply when rendering the
scene. Can be:

* {@link GAMMA_NONE}
* {@link GAMMA_SRGB}

Defaults to {@link GAMMA_NONE}.
 * @property toneMapping - The tonemapping transform to apply when writing
fragments to the frame buffer. Can be:

* {@link TONEMAP_LINEAR}
* {@link TONEMAP_FILMIC}
* {@link TONEMAP_HEJL}
* {@link TONEMAP_ACES}

Defaults to {@link TONEMAP_LINEAR}.
 * @property exposure - The exposure value tweaks the overall brightness of
the scene. Defaults to 1.
 * @property skybox - The base cubemap texture used as the scene's skybox, if mip level is 0. Defaults to null.
 * @property skyboxPrefiltered128 - The prefiltered cubemap texture (size 128x128) used as the scene's skybox, if mip level 1. Defaults to null.
 * @property skyboxPrefiltered64 - The prefiltered cubemap texture (size 64x64) used as the scene's skybox, if mip level 2. Defaults to null.
 * @property skyboxPrefiltered32 - The prefiltered cubemap texture (size 32x32) used as the scene's skybox, if mip level 3. Defaults to null.
 * @property skyboxPrefiltered16 - The prefiltered cubemap texture (size 16x16) used as the scene's skybox, if mip level 4. Defaults to null.
 * @property skyboxPrefiltered8 - The prefiltered cubemap texture (size 8x8) used as the scene's skybox, if mip level 5. Defaults to null.
 * @property skyboxPrefiltered4 - The prefiltered cubemap texture (size 4x4) used as the scene's skybox, if mip level 6. Defaults to null.
 * @property skyboxIntensity - Multiplier for skybox intensity. Defaults to 1.
 * @property skyboxRotation - The rotation of the skybox to be displayed. Defaults to {@link Quat.IDENTITY}.
 * @property skyboxMip - The mip level of the skybox to be displayed. Only valid
for prefiltered cubemap skyboxes. Defaults to 0 (base level).
 * @property lightmapSizeMultiplier - The lightmap resolution multiplier.
Defaults to 1.
 * @property lightmapMaxResolution - The maximum lightmap resolution. Defaults to
2048.
 * @property lightmapMode - The lightmap baking mode. Can be:

* {@link BAKE_COLOR}: single color lightmap
* {@link BAKE_COLORDIR}: single color lightmap + dominant light direction (used for
bump/specular). Only lights with bakeDir=true will be used for generating the dominant
light direction.

Defaults to {@link BAKE_COLORDIR}.
 * @property layers - A {@link LayerComposition} that defines
rendering order of this scene.
 * @property defaultMaterial - The default material used in case no
other material is available.
 * @property root - The root entity of the scene, which is usually the only
child to the Application root entity.
 */
export class Scene extends EventHandler {
    /**
     * Sets the cubemap for the scene skybox.
     * @param [cubemaps] - An array of cubemaps corresponding to the skybox at different mip levels. If undefined, scene will remove skybox.
    Cubemap array should be of size 7, with the first element (index 0) corresponding to the base cubemap (mip level 0) with original resolution.
    Each remaining element (index 1-6) corresponds to a fixed prefiltered resolution (128x128, 64x64, 32x32, 16x16, 8x8, 4x4).
     */
    setSkybox(cubemaps?: Texture[]): void;
    /**
     * The color of the scene's ambient light. Defaults
     * to black (0, 0, 0).
    */
    ambientLight: Color;
    /**
     * The type of fog used by the scene. Can be:
     * * {@link FOG_NONE}
     * * {@link FOG_LINEAR}
     * * {@link FOG_EXP}
     * * {@link FOG_EXP2}
     * Defaults to {@link FOG_NONE}.
    */
    fog: string;
    /**
     * The color of the fog (if enabled). Defaults to black
     * (0, 0, 0).
    */
    fogColor: Color;
    /**
     * The density of the fog (if enabled). This property
     * is only valid if the fog property is set to {@link FOG_EXP} or {@link FOG_EXP2}. Defaults to 0.
    */
    fogDensity: number;
    /**
     * The distance from the viewpoint where linear fog reaches
     * its maximum. This property is only valid if the fog property is set to {@link FOG_LINEAR}.
     * Defaults to 1000.
    */
    fogEnd: number;
    /**
     * The distance from the viewpoint where linear fog begins.
     * This property is only valid if the fog property is set to {@link FOG_LINEAR}. Defaults to 1.
    */
    fogStart: number;
    /**
     * The gamma correction to apply when rendering the
     * scene. Can be:
     * * {@link GAMMA_NONE}
     * * {@link GAMMA_SRGB}
     * Defaults to {@link GAMMA_NONE}.
    */
    gammaCorrection: number;
    /**
     * The tonemapping transform to apply when writing
     * fragments to the frame buffer. Can be:
     * * {@link TONEMAP_LINEAR}
     * * {@link TONEMAP_FILMIC}
     * * {@link TONEMAP_HEJL}
     * * {@link TONEMAP_ACES}
     * Defaults to {@link TONEMAP_LINEAR}.
    */
    toneMapping: number;
    /**
     * The exposure value tweaks the overall brightness of
     * the scene. Defaults to 1.
    */
    exposure: number;
    /**
     * The base cubemap texture used as the scene's skybox, if mip level is 0. Defaults to null.
    */
    skybox: Texture;
    /**
     * The prefiltered cubemap texture (size 128x128) used as the scene's skybox, if mip level 1. Defaults to null.
    */
    skyboxPrefiltered128: Texture;
    /**
     * The prefiltered cubemap texture (size 64x64) used as the scene's skybox, if mip level 2. Defaults to null.
    */
    skyboxPrefiltered64: Texture;
    /**
     * The prefiltered cubemap texture (size 32x32) used as the scene's skybox, if mip level 3. Defaults to null.
    */
    skyboxPrefiltered32: Texture;
    /**
     * The prefiltered cubemap texture (size 16x16) used as the scene's skybox, if mip level 4. Defaults to null.
    */
    skyboxPrefiltered16: Texture;
    /**
     * The prefiltered cubemap texture (size 8x8) used as the scene's skybox, if mip level 5. Defaults to null.
    */
    skyboxPrefiltered8: Texture;
    /**
     * The prefiltered cubemap texture (size 4x4) used as the scene's skybox, if mip level 6. Defaults to null.
    */
    skyboxPrefiltered4: Texture;
    /**
     * Multiplier for skybox intensity. Defaults to 1.
    */
    skyboxIntensity: number;
    /**
     * The rotation of the skybox to be displayed. Defaults to {@link Quat.IDENTITY}.
    */
    skyboxRotation: Quat;
    /**
     * The mip level of the skybox to be displayed. Only valid
     * for prefiltered cubemap skyboxes. Defaults to 0 (base level).
    */
    skyboxMip: number;
    /**
     * The lightmap resolution multiplier.
     * Defaults to 1.
    */
    lightmapSizeMultiplier: number;
    /**
     * The maximum lightmap resolution. Defaults to
     * 2048.
    */
    lightmapMaxResolution: number;
    /**
     * The lightmap baking mode. Can be:
     * * {@link BAKE_COLOR}: single color lightmap
     * * {@link BAKE_COLORDIR}: single color lightmap + dominant light direction (used for
     * bump/specular). Only lights with bakeDir=true will be used for generating the dominant
     * light direction.
     * Defaults to {@link BAKE_COLORDIR}.
    */
    lightmapMode: number;
    /**
     * A {@link LayerComposition} that defines
     * rendering order of this scene.
    */
    layers: LayerComposition;
    /**
     * The default material used in case no
     * other material is available.
    */
    defaultMaterial: StandardMaterial;
    /**
     * The root entity of the scene, which is usually the only
     * child to the Application root entity.
    */
    root: Entity;
}

/**
 * A skin instance is responsible for generating the matrix palette that is used to
skin vertices from object space to world space.
 * @property bones - An array of nodes representing each bone in this skin instance.
 * @param skin - The skin that will provide the inverse bind pose matrices to
generate the final matrix palette.
 */
export class SkinInstance {
    constructor(skin: Skin);
    /**
     * An array of nodes representing each bone in this skin instance.
    */
    bones: GraphNode[];
}

/**
 * A skin contains data about the bones in a hierarchy that drive a skinned mesh animation.
Specifically, the skin stores the bone name and inverse bind matrix and for each bone.
Inverse bind matrices are instrumental in the mathematics of vertex skinning.
 * @param graphicsDevice - The graphics device used to manage this skin.
 * @param ibp - The array of inverse bind matrices.
 * @param boneNames - The array of bone names for the bones referenced by this skin.
 */
export class Skin {
    constructor(graphicsDevice: GraphicsDevice, ibp: Mat4[], boneNames: string[]);
}

/**
 * A Sprite is contains references to one or more frames of a {@link TextureAtlas}.
It can be used by the {@link SpriteComponent} or the {@link ElementComponent} to render a
single frame or a sprite animation.
 * @property pixelsPerUnit - The number of pixels that map to one PlayCanvas unit.
 * @property atlas - The texture atlas.
 * @property renderMode - The rendering mode of the sprite. Can be:

* {@link SPRITE_RENDERMODE_SIMPLE}
* {@link SPRITE_RENDERMODE_SLICED}
* {@link SPRITE_RENDERMODE_TILED}
 * @property frameKeys - The keys of the frames in the sprite atlas that this sprite is using.
 * @property meshes - An array that contains a mesh for each frame.
 * @param device - The graphics device of the application.
 * @param [options] - Options for creating the Sprite.
 * @param [options.pixelsPerUnit] - The number of pixels that map to one PlayCanvas unit.
Defaults to 1.
 * @param [options.renderMode] - The rendering mode of the sprite. Can be:

* {@link SPRITE_RENDERMODE_SIMPLE}
* {@link SPRITE_RENDERMODE_SLICED}
* {@link SPRITE_RENDERMODE_TILED}

Defaults to {@link SPRITE_RENDERMODE_SIMPLE}.
 * @param [options.atlas] - The texture atlas. Defaults to null.
 * @param [options.frameKeys] - The keys of the frames in the sprite atlas that this sprite is
using. Defaults to null.
 */
export class Sprite extends EventHandler {
    constructor(device: GraphicsDevice, options?: {
        pixelsPerUnit?: number;
        renderMode?: number;
        atlas?: TextureAtlas;
        frameKeys?: string[];
    });
    /**
     * Free up the meshes created by the sprite.
     */
    destroy(): void;
    /**
     * The number of pixels that map to one PlayCanvas unit.
    */
    pixelsPerUnit: number;
    /**
     * The texture atlas.
    */
    atlas: TextureAtlas;
    /**
     * The rendering mode of the sprite. Can be:
     * * {@link SPRITE_RENDERMODE_SIMPLE}
     * * {@link SPRITE_RENDERMODE_SLICED}
     * * {@link SPRITE_RENDERMODE_TILED}
    */
    renderMode: number;
    /**
     * The keys of the frames in the sprite atlas that this sprite is using.
    */
    frameKeys: string[];
    /**
     * An array that contains a mesh for each frame.
    */
    meshes: Mesh[];
}

/**
 * Create a new StencilParameters instance.
 * @property func - Sets stencil test function. See {@link GraphicsDevice#setStencilFunc}.
 * @property ref - Sets stencil test reference value. See {@link GraphicsDevice#setStencilFunc}.
 * @property fail - Sets operation to perform if stencil test is failed. See {@link GraphicsDevice#setStencilOperation}.
 * @property zfail - Sets operation to perform if depth test is failed. See {@link GraphicsDevice#setStencilOperation}.
 * @property zpass - Sets operation to perform if both stencil and depth test are passed. See {@link GraphicsDevice#setStencilOperation}.
 * @property readMask - Sets stencil test reading mask. See {@link GraphicsDevice#setStencilFunc}.
 * @property writeMask - Sets stencil test writing mask. See {@link GraphicsDevice#setStencilOperation}.
 * @param options - Options object to configure the stencil parameters.
 */
export class StencilParameters {
    constructor(options: any);
    /**
     * Sets stencil test function. See {@link GraphicsDevice#setStencilFunc}.
    */
    func: number;
    /**
     * Sets stencil test reference value. See {@link GraphicsDevice#setStencilFunc}.
    */
    ref: number;
    /**
     * Sets operation to perform if stencil test is failed. See {@link GraphicsDevice#setStencilOperation}.
    */
    fail: number;
    /**
     * Sets operation to perform if depth test is failed. See {@link GraphicsDevice#setStencilOperation}.
    */
    zfail: number;
    /**
     * Sets operation to perform if both stencil and depth test are passed. See {@link GraphicsDevice#setStencilOperation}.
    */
    zpass: number;
    /**
     * Sets stencil test reading mask. See {@link GraphicsDevice#setStencilFunc}.
    */
    readMask: number;
    /**
     * Sets stencil test writing mask. See {@link GraphicsDevice#setStencilOperation}.
    */
    writeMask: number;
}

/**
 * A pc.TextureAtlas contains a number of frames from a texture. Each frame
defines a region in a texture. The TextureAtlas is referenced by {@link Sprite}s.
 * @example
 * var atlas = new pc.TextureAtlas();
atlas.frames = {
    '0': {
        // rect has u, v, width and height in pixels
        rect: new pc.Vec4(0, 0, 256, 256),
        // pivot has x, y values between 0-1 which define the point
        // within the frame around which rotation and scale is calculated
        pivot: new pc.Vec2(0.5, 0.5),
        // border has left, bottom, right and top in pixels defining regions for 9-slicing
        border: new pc.Vec4(5, 5, 5, 5)
    },
    '1': {
        rect: new pc.Vec4(256, 0, 256, 256),
        pivot: new pc.Vec2(0.5, 0.5),
        border: new pc.Vec4(5, 5, 5, 5)
    }
};
 * @property texture - The texture atlas.
 * @property frames - Contains frames which define portions of the texture atlas.
 */
export class TextureAtlas extends EventHandler {
    /**
     * @example
     * atlas.setFrame('1', {
        rect: new pc.Vec4(0, 0, 128, 128),
        pivot: new pc.Vec2(0.5, 0.5),
        border: new pc.Vec4(5, 5, 5, 5)
    });
     * @param key - The key of the frame.
     * @param data - The properties of the frame.
     * @param data.rect - The u, v, width, height properties of the frame in pixels.
     * @param data.pivot - The pivot of the frame - values are between 0-1.
     * @param data.border - The border of the frame for 9-slicing. Values are ordered
    as follows: left, bottom, right, top border in pixels.
     */
    setFrame(key: string, data: {
        rect: Vec4;
        pivot: Vec2;
        border: Vec4;
    }): void;
    /**
     * @example
     * atlas.removeFrame('1');
     * @param key - The key of the frame.
     */
    removeFrame(key: string): void;
    /**
     * Free up the underlying texture owned by the atlas.
     */
    destroy(): void;
    /**
     * The texture atlas.
    */
    texture: Texture;
    /**
     * Contains frames which define portions of the texture atlas.
    */
    frames: any;
}

/**
 * Container of Script Attribute definitions. Implements an interface to add/remove attributes and store their definition for a {@link ScriptType}.
Note: An instance of ScriptAttributes is created automatically by each {@link ScriptType}.
 * @param scriptType - Script Type that attributes relate to.
 */
export class ScriptAttributes {
    constructor(scriptType: typeof ScriptType);
    /**
     * Add Attribute.
     * @example
     * PlayerController.attributes.add('fullName', {
        type: 'string'
    });
     * @example
     * PlayerController.attributes.add('speed', {
        type: 'number',
        title: 'Speed',
        placeholder: 'km/h',
        default: 22.2
    });
     * @example
     * PlayerController.attributes.add('resolution', {
        type: 'number',
        default: 32,
        enum: [
            { '32x32': 32 },
            { '64x64': 64 },
            { '128x128': 128 }
        ]
    });
     * @example
     * PlayerController.attributes.add('config', {
        type: 'json',
        schema: [{
            name: 'speed',
            type: 'number',
            title: 'Speed',
            placeholder: 'km/h',
            default: 22.2
        }, {
            name: 'resolution',
            type: 'number',
            default: 32,
            enum: [
                { '32x32': 32 },
                { '64x64': 64 },
                { '128x128': 128 }
            ]
        }]
    });
     * @param name - Name of an attribute.
     * @param args - Object with Arguments for an attribute.
     * @param args.type - Type of an attribute value. Can be one of "boolean", "number", "string", "json", "asset", "entity", "rgb", "rgba", "vec2", "vec3", "vec4" or "curve".
     * @param [args.default] - Default attribute value.
     * @param [args.title] - Title for Editor's for field UI.
     * @param [args.description] - Description for Editor's for field UI.
     * @param [args.placeholder] - Placeholder for Editor's for field UI.
    For multi-field types, such as vec2, vec3, and others use array of strings.
     * @param [args.array] - If attribute can hold single or multiple values.
     * @param [args.size] - If attribute is array, maximum number of values can be set.
     * @param [args.min] - Minimum value for type 'number', if max and min defined, slider will be rendered in Editor's UI.
     * @param [args.max] - Maximum value for type 'number', if max and min defined, slider will be rendered in Editor's UI.
     * @param [args.precision] - Level of precision for field type 'number' with floating values.
     * @param [args.step] - Step value for type 'number'. The amount used to increment the value when using the arrow keys in the Editor's UI.
     * @param [args.assetType] - Name of asset type to be used in 'asset' type attribute picker in Editor's UI, defaults to '*' (all).
     * @param [args.curves] - List of names for Curves for field type 'curve'.
     * @param [args.color] - String of color channels for Curves for field type 'curve', can be any combination of `rgba` characters.
    Defining this property will render Gradient in Editor's field UI.
     * @param [args.enum] - List of fixed choices for field, defined as array of objects, where key in object is a title of an option.
     * @param [args.schema] - List of attributes for type 'json'. Each attribute description is an object with the same properties as regular script attributes
    but with an added 'name' field to specify the name of each attribute in the JSON.
     */
    add(name: string, args: {
        type: string;
        default?: any;
        title?: string;
        description?: string;
        placeholder?: string | string[];
        array?: boolean;
        size?: number;
        min?: number;
        max?: number;
        precision?: number;
        step?: number;
        assetType?: string;
        curves?: string[];
        color?: string;
        enum?: object[];
        schema?: object[];
    }): void;
    /**
     * Remove Attribute.
     * @example
     * PlayerController.attributes.remove('fullName');
     * @param name - Name of an attribute.
     * @returns True if removed or false if not defined.
     */
    remove(name: string): boolean;
    /**
     * Detect if Attribute is added.
     * @example
     * if (PlayerController.attributes.has('fullName')) {
        // attribute fullName is defined
    }
     * @param name - Name of an attribute.
     * @returns True if Attribute is defined.
     */
    has(name: string): boolean;
    /**
     * Get object with attribute arguments.
    Note: Changing argument properties will not affect existing Script Instances.
     * @example
     * // changing default value for an attribute 'fullName'
    var attr = PlayerController.attributes.get('fullName');
    if (attr) attr.default = 'Unknown';
     * @param name - Name of an attribute.
     * @returns Arguments with attribute properties.
     */
    get(name: string): any;
}

/**
 * Create an instance of a ScriptRegistry.
Note: PlayCanvas scripts can access the Script Registry from inside the application with {@link Application#scripts} {@link ADDRESS_REPEAT}.
 * @param app - Application to attach registry to.
 */
export class ScriptRegistry extends EventHandler {
    constructor(app: Application);
    /**
     * Add {@link ScriptType} to registry.
    Note: when {@link createScript} is called, it will add the {@link ScriptType} to the registry automatically.
    If a script already exists in registry, and the new script has a `swap` method defined,
    it will perform code hot swapping automatically in async manner.
     * @example
     * var PlayerController = pc.createScript('playerController');
    // playerController Script Type will be added to pc.ScriptRegistry automatically
    console.log(app.scripts.has('playerController')); // outputs true
     * @param script - Script Type that is created using {@link createScript}.
     * @returns True if added for the first time or false if script already exists.
     */
    add(script: typeof ScriptType): boolean;
    /**
     * Remove {@link ScriptType}.
     * @example
     * app.scripts.remove('playerController');
     * @param nameOrType - The name or type of {@link ScriptType}.
     * @returns True if removed or False if already not in registry.
     */
    remove(nameOrType: string | typeof ScriptType): boolean;
    /**
     * Get {@link ScriptType} by name.
     * @example
     * var PlayerController = app.scripts.get('playerController');
     * @param name - Name of a {@link ScriptType}.
     * @returns The Script Type if it exists in the registry or null otherwise.
     */
    get(name: string): typeof ScriptType;
    /**
     * Check if a {@link ScriptType} with the specified name is in the registry.
     * @example
     * if (app.scripts.has('playerController')) {
        // playerController is in pc.ScriptRegistry
    }
     * @param nameOrType - The name or type of {@link ScriptType}.
     * @returns True if {@link ScriptType} is in registry.
     */
    has(nameOrType: string | typeof ScriptType): boolean;
    /**
     * Get list of all {@link ScriptType}s from registry.
     * @example
     * // logs array of all Script Type names available in registry
    console.log(app.scripts.list().map(function (o) {
        return o.name;
    }));
     * @returns list of all {@link ScriptType}s in registry.
     */
    list(): (typeof ScriptType)[];
}

/**
 * Represents the type of a script. It is returned by {@link createScript}.
Also referred to as Script Type.

The type is to be extended using its JavaScript prototype. There is a **list of methods**
that will be executed by the engine on instances of this type, such as:

* initialize
* postInitialize
* update
* postUpdate
* swap

**initialize** and **postInitialize** - are called if defined when script is about to run
for the first time - postInitialize will run after all initialize methods are executed in
the same tick or enabling chain of actions.

**update** and **postUpdate** - methods are called if defined for enabled (running state)
scripts on each tick.

**swap** - This method will be called when a {@link ScriptType} that already exists in
the registry gets redefined. If the new {@link ScriptType} has a `swap` method in its
prototype, then it will be executed to perform hot-reload at runtime.
 * @property app - The {@link Application} that the instance of this type
belongs to.
 * @property entity - The {@link Entity} that the instance of this type belongs to.
 * @property enabled - True if the instance of this type is in running state. False
when script is not running, because the Entity or any of its parents are disabled or the
Script Component is disabled or the Script Instance is disabled. When disabled no update
methods will be called on each tick. initialize and postInitialize methods will run once
when the script instance is in `enabled` state during app tick.
 * @param args - The input arguments object
 * @param args.app - The {@link Application} that is running the script
 * @param args.entity - The {@link Entity} that the script is attached to
 */
export class ScriptType extends EventHandler {
    constructor(args: {
        app: Application;
        entity: Entity;
    });
    /**
     * Name of a Script Type
     */
    static readonly scriptName: string | null;
    /**
     * The interface to define attributes for Script Types. Refer to {@link ScriptAttributes}.
     * @example
     * var PlayerController = pc.createScript('playerController');
    
    PlayerController.attributes.add('speed', {
        type: 'number',
        title: 'Speed',
        placeholder: 'km/h',
        default: 22.2
    });
     */
    static readonly attributes: ScriptAttributes;
    /**
     * Shorthand function to extend Script Type prototype with list of methods.
     * @example
     * var PlayerController = pc.createScript('playerController');
    
    PlayerController.extend({
        initialize: function () {
            // called once on initialize
        },
        update: function (dt) {
            // called each tick
        }
    });
     * @param methods - Object with methods, where key - is name of method, and value - is function.
     */
    static extend(methods: any): void;
    /**
     * Called when script is about to run for the first time.
     */
    initialize?(): void;
    /**
     * Called after all initialize methods are executed in the same tick or enabling chain of actions.
     */
    postInitialize?(): void;
    /**
     * Called for enabled (running state) scripts on each tick.
     * @param dt - The delta time in seconds since the last frame.
     */
    update?(dt: number): void;
    /**
     * Called for enabled (running state) scripts on each tick, after update.
     * @param dt - The delta time in seconds since the last frame.
     */
    postUpdate?(dt: number): void;
    /**
     * Called when a ScriptType that already exists in the registry
    gets redefined. If the new ScriptType has a `swap` method in its prototype,
    then it will be executed to perform hot-reload at runtime.
     * @param old - Old instance of the scriptType to copy data to the new instance.
     */
    swap?(old: ScriptType): void;
    /**
     * The {@link Application} that the instance of this type
     * belongs to.
    */
    app: Application;
    /**
     * The {@link Entity} that the instance of this type belongs to.
    */
    entity: Entity;
    /**
     * True if the instance of this type is in running state. False
     * when script is not running, because the Entity or any of its parents are disabled or the
     * Script Component is disabled or the Script Instance is disabled. When disabled no update
     * methods will be called on each tick. initialize and postInitialize methods will run once
     * when the script instance is in `enabled` state during app tick.
    */
    enabled: boolean;
}

/**
 * Create and register a new {@link ScriptType}.
It returns new class type (constructor function), which is auto-registered to {@link ScriptRegistry} using it's name.
This is the main interface to create Script Types, to define custom logic using JavaScript, that is used to create interaction for entities.
 * @example
 * var Turning = pc.createScript('turn');

// define `speed` attribute that is available in Editor UI
Turning.attributes.add('speed', {
    type: 'number',
    default: 180,
    placeholder: 'deg/s'
});

// runs every tick
Turning.prototype.update = function (dt) {
    this.entity.rotate(0, this.speed * dt, 0);
};
 * @param name - Unique Name of a Script Type.
If a Script Type with the same name has already been registered and the new one has a `swap` method defined in its prototype,
then it will perform hot swapping of existing Script Instances on entities using this new Script Type.
Note: There is a reserved list of names that cannot be used, such as list below as well as some starting from `_` (underscore):
system, entity, create, destroy, swap, move, scripts, onEnable, onDisable, onPostStateChange, has, on, off, fire, once, hasEvent.
 * @param [app] - Optional application handler, to choose which {@link ScriptRegistry} to add a script to.
By default it will use `Application.getApplication()` to get current {@link Application}.
 * @returns A class type (constructor function) that inherits {@link ScriptType},
which the developer is meant to further extend by adding attributes and prototype methods.
 */
export function createScript(name: string, app?: Application): typeof ScriptType;

/**
 * Register a existing class type as a Script Type to {@link ScriptRegistry}.
Useful when defining a ES6 script class that extends {@link ScriptType} (see example).
 * @example
 * // define a ES6 script class
class PlayerController extends pc.ScriptType {

    initialize() {
        // called once on initialize
    }

    update(dt) {
        // called each tick
    }
}

// register the class as a script
pc.registerScript(PlayerController);

// declare script attributes (Must be after pc.registerScript())
PlayerController.attributes.add('attribute1', {type: 'number'});
 * @param script - The existing class type (constructor function) to be registered as a Script Type.
Class must extend {@link ScriptType} (see example). Please note: A class created using {@link createScript} is auto-registered,
and should therefore not be pass into {@link registerScript} (which would result in swapping out all related script instances).
 * @param [name] - Optional unique name of the Script Type. By default it will use the same name as the existing class.
If a Script Type with the same name has already been registered and the new one has a `swap` method defined in its prototype,
then it will perform hot swapping of existing Script Instances on entities using this new Script Type.
Note: There is a reserved list of names that cannot be used, such as list below as well as some starting from `_` (underscore):
system, entity, create, destroy, swap, move, scripts, onEnable, onDisable, onPostStateChange, has, on, off, fire, once, hasEvent.
 * @param [app] - Optional application handler, to choose which {@link ScriptRegistry} to register the script type to.
By default it will use `Application.getApplication()` to get current {@link Application}.
 */
export function registerScript(script: typeof ScriptType, name?: string, app?: Application): void;

/**
 * Create a new axis-aligned bounding box.
 * @property center - Center of box.
 * @property halfExtents - Half the distance across the box in each axis.
 * @param [center] - Center of box. The constructor takes a reference of this parameter.
 * @param [halfExtents] - Half the distance across the box in each axis. The constructor takes a reference of this parameter.
 */
export class BoundingBox {
    constructor(center?: Vec3, halfExtents?: Vec3);
    /**
     * Combines two bounding boxes into one, enclosing both.
     * @param other - Bounding box to add.
     */
    add(other: BoundingBox): void;
    /**
     * Copies the contents of a source AABB.
     * @param src - The AABB to copy from.
     */
    copy(src: BoundingBox): void;
    /**
     * Returns a clone of the AABB
     * @returns A duplicate AABB.
     */
    clone(): BoundingBox;
    /**
     * Test whether two axis-aligned bounding boxes intersect.
     * @param other - Bounding box to test against.
     * @returns True if there is an intersection.
     */
    intersects(other: BoundingBox): boolean;
    /**
     * Test if a ray intersects with the AABB.
     * @param ray - Ray to test against (direction must be normalized).
     * @param [point] - If there is an intersection, the intersection point will be copied into here.
     * @returns True if there is an intersection.
     */
    intersectsRay(ray: Ray, point?: Vec3): boolean;
    /**
     * Sets the minimum and maximum corner of the AABB.
    Using this function is faster than assigning min and max separately.
     * @param min - The minimum corner of the AABB.
     * @param max - The maximum corner of the AABB.
     */
    setMinMax(min: Vec3, max: Vec3): void;
    /**
     * Return the minimum corner of the AABB.
     * @returns Minimum corner.
     */
    getMin(): Vec3;
    /**
     * Return the maximum corner of the AABB.
     * @returns Maximum corner.
     */
    getMax(): Vec3;
    /**
     * Test if a point is inside a AABB.
     * @param point - Point to test.
     * @returns True if the point is inside the AABB and false otherwise.
     */
    containsPoint(point: Vec3): boolean;
    /**
     * Set an AABB to enclose the specified AABB if it were to be
    transformed by the specified 4x4 matrix.
     * @param aabb - Box to transform and enclose.
     * @param m - Transformation matrix to apply to source AABB.
     */
    setFromTransformedAabb(aabb: BoundingBox, m: Mat4): void;
    /**
     * Compute the size of the AABB to encapsulate all specified vertices.
     * @param vertices - The vertices used to compute the new size for the AABB.
     * @param [numVerts] - Number of vertices to use from the beginning of vertices array. All vertices are used if not specified.
     */
    compute(vertices: number[] | Float32Array, numVerts?: number): void;
    /**
     * Test if a Bounding Sphere is overlapping, enveloping, or inside this AABB.
     * @param sphere - Bounding Sphere to test.
     * @returns True if the Bounding Sphere is overlapping, enveloping, or inside the AABB and false otherwise.
     */
    intersectsBoundingSphere(sphere: BoundingSphere): boolean;
    /**
     * Center of box.
    */
    center: Vec3;
    /**
     * Half the distance across the box in each axis.
    */
    halfExtents: Vec3;
}

/**
 * Creates a new bounding sphere.
 * @example
 * // Create a new bounding sphere centered on the origin with a radius of 0.5
var sphere = new pc.BoundingSphere();
 * @param [center] - The world space coordinate marking the center of the sphere. The constructor takes a reference of this parameter.
 * @param [radius] - The radius of the bounding sphere. Defaults to 0.5.
 */
export class BoundingSphere {
    constructor(center?: Vec3, radius?: number);
    /**
     * Test if a ray intersects with the sphere.
     * @param ray - Ray to test against (direction must be normalized).
     * @param [point] - If there is an intersection, the intersection point will be copied into here.
     * @returns True if there is an intersection.
     */
    intersectsRay(ray: Ray, point?: Vec3): boolean;
    /**
     * Test if a Bounding Sphere is overlapping, enveloping, or inside this Bounding Sphere.
     * @param sphere - Bounding Sphere to test.
     * @returns True if the Bounding Sphere is overlapping, enveloping, or inside this Bounding Sphere and false otherwise.
     */
    intersectsBoundingSphere(sphere: BoundingSphere): boolean;
}

/**
 * Creates a new frustum shape.
 * @example
 * var frustum = new pc.Frustum();
 */
export class Frustum {
    /**
     * Updates the frustum shape based on the supplied 4x4 matrix.
     * @example
     * // Create a perspective projection matrix
    var projMat = pc.Mat4();
    projMat.setPerspective(45, 16 / 9, 1, 1000);
    
    // Create a frustum shape that is represented by the matrix
    var frustum = new pc.Frustum();
    frustum.setFromMat4(projMat);
     * @param matrix - The matrix describing the shape of the frustum.
     */
    setFromMat4(matrix: Mat4): void;
    /**
     * Tests whether a point is inside the frustum. Note that points lying in a frustum plane are
    considered to be outside the frustum.
     * @param point - The point to test.
     * @returns True if the point is inside the frustum, false otherwise.
     */
    containsPoint(point: Vec3): boolean;
    /**
     * Tests whether a bounding sphere intersects the frustum. If the sphere is outside the frustum,
    zero is returned. If the sphere intersects the frustum, 1 is returned. If the sphere is completely inside
    the frustum, 2 is returned. Note that a sphere touching a frustum plane from the outside is considered to
    be outside the frustum.
     * @param sphere - The sphere to test.
     * @returns 0 if the bounding sphere is outside the frustum, 1 if it intersects the frustum and 2 if
    it is contained by the frustum.
     */
    containsSphere(sphere: BoundingSphere): number;
}

/**
 * Create a new oriented box.
 * @property [worldTransform] - The world transform of the OBB.
 * @param [worldTransform] - Transform that has the orientation and position of the box. Scale is assumed to be one.
 * @param [halfExtents] - Half the distance across the box in each local axis. The constructor takes a reference of this parameter.
 */
export class OrientedBox {
    constructor(worldTransform?: Mat4, halfExtents?: Vec3);
    /**
     * Test if a ray intersects with the OBB.
     * @param ray - Ray to test against (direction must be normalized).
     * @param [point] - If there is an intersection, the intersection point will be copied into here.
     * @returns True if there is an intersection.
     */
    intersectsRay(ray: Ray, point?: Vec3): boolean;
    /**
     * Test if a point is inside a OBB.
     * @param point - Point to test.
     * @returns True if the point is inside the OBB and false otherwise.
     */
    containsPoint(point: Vec3): boolean;
    /**
     * Test if a Bounding Sphere is overlapping, enveloping, or inside this OBB.
     * @param sphere - Bounding Sphere to test.
     * @returns True if the Bounding Sphere is overlapping, enveloping or inside this OBB and false otherwise.
     */
    intersectsBoundingSphere(sphere: BoundingSphere): boolean;
    /**
     * The world transform of the OBB.
    */
    worldTransform?: Mat4;
}

/**
 * Creates a new infinite ray starting at a given origin and pointing in a given direction.
 * @example
 * // Create a new ray starting at the position of this entity and pointing down
// the entity's negative Z axis
var ray = new pc.Ray(this.entity.getPosition(), this.entity.forward);
 * @property origin - The starting point of the ray.
 * @property direction - The direction of the ray.
 * @param [origin] - The starting point of the ray. The constructor takes a reference of this parameter.
Defaults to the origin (0, 0, 0).
 * @param [direction] - The direction of the ray. The constructor takes a reference of this parameter.
Defaults to a direction down the world negative Z axis (0, 0, -1).
 */
export class Ray {
    constructor(origin?: Vec3, direction?: Vec3);
    /**
     * Sets origin and direction to the supplied vector values.
     * @param origin - The starting point of the ray.
     * @param direction - The direction of the ray.
     * @returns Self for chaining.
     */
    set(origin: Vec3, direction: Vec3): Ray;
    /**
     * The starting point of the ray.
    */
    origin: Vec3;
    /**
     * The direction of the ray.
    */
    direction: Vec3;
}

/**
 * A SoundInstance plays a {@link Sound}.
 * @property volume - The volume modifier to play the sound with. In range 0-1.
 * @property pitch - The pitch modifier to play the sound with. Must be larger than 0.01.
 * @property startTime - The start time from which the sound will start playing.
 * @property currentTime - Gets or sets the current time of the sound that is playing. If the value provided is bigger than the duration of the instance it will wrap from the beginning.
 * @property duration - The duration of the sound that the instance will play starting from startTime.
 * @property loop - If true the instance will restart when it finishes playing.
 * @property isPlaying - Returns true if the instance is currently playing.
 * @property isPaused - Returns true if the instance is currently paused.
 * @property isStopped - Returns true if the instance is currently stopped.
 * @property isSuspended - Returns true if the instance is currently suspended because the window is not focused.
 * @property source - Gets the source that plays the sound resource. If the Web Audio API is not supported the type of source is <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio" target="_blank">Audio</a>. Source is only available after calling play.
 * @property sound - The sound resource that the instance will play.
 * @param manager - The sound manager.
 * @param sound - The sound to play.
 * @param options - Options for the instance.
 * @param [options.volume = 1] - The playback volume, between 0 and 1.
 * @param [options.pitch = 1] - The relative pitch, default of 1, plays at normal pitch.
 * @param [options.loop = false] - Whether the sound should loop when it reaches the end or not.
 * @param [options.startTime = 0] - The time from which the playback will start in seconds. Default is 0 to start at the beginning.
 * @param [options.duration = null] - The total time after the startTime in seconds when playback will stop or restart if loop is true.
 * @param [options.onPlay = null] - Function called when the instance starts playing.
 * @param [options.onPause = null] - Function called when the instance is paused.
 * @param [options.onResume = null] - Function called when the instance is resumed.
 * @param [options.onStop = null] - Function called when the instance is stopped.
 * @param [options.onEnd = null] - Function called when the instance ends.
 */
export class SoundInstance extends EventHandler {
    constructor(manager: SoundManager, sound: Sound, options: {
        volume?: number;
        pitch?: number;
        loop?: boolean;
        startTime?: number;
        duration?: number;
        onPlay?: (...params: any[]) => any;
        onPause?: (...params: any[]) => any;
        onResume?: (...params: any[]) => any;
        onStop?: (...params: any[]) => any;
        onEnd?: (...params: any[]) => any;
    });
    /**
     * Begins playback of sound. If the sound is not loaded this will return false.
    If the sound is already playing this will restart the sound.
     * @returns True if the sound was started.
     */
    play(): boolean;
    /**
     * Pauses playback of sound. Call resume() to resume playback from the same position.
     * @returns Returns true if the sound was paused.
     */
    pause(): boolean;
    /**
     * Resumes playback of the sound. Playback resumes at the point that the audio was paused.
     * @returns Returns true if the sound was resumed.
     */
    resume(): boolean;
    /**
     * Stops playback of sound. Calling play() again will restart playback from the beginning of the sound.
     * @returns Returns true if the sound was stopped.
     */
    stop(): boolean;
    /**
     * Connects external Web Audio API nodes. You need to pass
    the first node of the node graph that you created externally and the last node of that graph. The first
    node will be connected to the audio source and the last node will be connected to the destination of the
    AudioContext (e.g. speakers). Requires Web Audio API support.
     * @example
     * var context = app.systems.sound.context;
    var analyzer = context.createAnalyzer();
    var distortion = context.createWaveShaper();
    var filter = context.createBiquadFilter();
    analyzer.connect(distortion);
    distortion.connect(filter);
    instance.setExternalNodes(analyzer, filter);
     * @param firstNode - The first node that will be connected to the audio source of sound instances.
     * @param [lastNode] - The last node that will be connected to the destination of the AudioContext.
    If unspecified then the firstNode will be connected to the destination instead.
     */
    setExternalNodes(firstNode: AudioNode, lastNode?: AudioNode): void;
    /**
     * Clears any external nodes set by {@link SoundInstance#setExternalNodes}.
     */
    clearExternalNodes(): void;
    /**
     * Gets any external nodes set by {@link SoundInstance#setExternalNodes}.
     * @returns Returns an array that contains the two nodes set by {@link SoundInstance#setExternalNodes}.
     */
    getExternalNodes(): AudioNode[];
    /**
     * The volume modifier to play the sound with. In range 0-1.
    */
    volume: number;
    /**
     * The pitch modifier to play the sound with. Must be larger than 0.01.
    */
    pitch: number;
    /**
     * The start time from which the sound will start playing.
    */
    startTime: number;
    /**
     * Gets or sets the current time of the sound that is playing. If the value provided is bigger than the duration of the instance it will wrap from the beginning.
    */
    currentTime: number;
    /**
     * The duration of the sound that the instance will play starting from startTime.
    */
    duration: number;
    /**
     * If true the instance will restart when it finishes playing.
    */
    loop: boolean;
    /**
     * Returns true if the instance is currently playing.
    */
    isPlaying: boolean;
    /**
     * Returns true if the instance is currently paused.
    */
    isPaused: boolean;
    /**
     * Returns true if the instance is currently stopped.
    */
    isStopped: boolean;
    /**
     * Returns true if the instance is currently suspended because the window is not focused.
    */
    isSuspended: boolean;
    /**
     * Gets the source that plays the sound resource. If the Web Audio API is not supported the type of source is <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio" target="_blank">Audio</a>. Source is only available after calling play.
    */
    source: AudioBufferSourceNode;
    /**
     * The sound resource that the instance will play.
    */
    sound: Sound;
}

/**
 * A SoundInstance3d plays a {@link Sound} in 3D.
 * @property position - The position of the sound in 3D space.
 * @property velocity - The velocity of the sound.
 * @property distanceModel - Determines which algorithm to use to reduce the volume of the audio as it moves away from the listener. Can be:

* {@link DISTANCE_LINEAR}
* {@link DISTANCE_INVERSE}
* {@link DISTANCE_EXPONENTIAL}

Default is {@link DISTANCE_LINEAR}.
 * @property refDistance - The reference distance for reducing volume as the sound source moves further from the listener.
 * @property maxDistance - The maximum distance from the listener at which audio falloff stops. Note the volume of the audio is not 0 after this distance, but just doesn't fall off anymore.
 * @property rollOffFactor - The factor used in the falloff equation.
 * @param manager - The sound manager.
 * @param sound - The sound to play.
 * @param options - Options for the instance.
 * @param [options.volume = 1] - The playback volume, between 0 and 1.
 * @param [options.pitch = 1] - The relative pitch, default of 1, plays at normal pitch.
 * @param [options.loop = false] - Whether the sound should loop when it reaches the end or not.
 * @param [options.startTime = 0] - The time from which the playback will start. Default is 0 to start at the beginning.
 * @param [options.duration = null] - The total time after the startTime when playback will stop or restart if loop is true.
 * @param [options.position = null] - The position of the sound in 3D space.
 * @param [options.velocity = null] - The velocity of the sound.
 * @param [options.distanceModel = DISTANCE_LINEAR] - Determines which algorithm to use to reduce the volume of the audio as it moves away from the listener. Can be:

* {@link DISTANCE_LINEAR}
* {@link DISTANCE_INVERSE}
* {@link DISTANCE_EXPONENTIAL}

Default is {@link DISTANCE_LINEAR}.
 * @param [options.refDistance = 1] - The reference distance for reducing volume as the sound source moves further from the listener.
 * @param [options.maxDistance = 10000] - The maximum distance from the listener at which audio falloff stops. Note the volume of the audio is not 0 after this distance, but just doesn't fall off anymore.
 * @param [options.rollOffFactor = 1] - The factor used in the falloff equation.
 */
export class SoundInstance3d extends SoundInstance {
    constructor(manager: SoundManager, sound: Sound, options: {
        volume?: number;
        pitch?: number;
        loop?: boolean;
        startTime?: number;
        duration?: number;
        position?: Vec3;
        velocity?: Vec3;
        distanceModel?: string;
        refDistance?: number;
        maxDistance?: number;
        rollOffFactor?: number;
    });
    /**
     * The position of the sound in 3D space.
    */
    position: Vec3;
    /**
     * The velocity of the sound.
    */
    velocity: Vec3;
    /**
     * Determines which algorithm to use to reduce the volume of the audio as it moves away from the listener. Can be:
     * * {@link DISTANCE_LINEAR}
     * * {@link DISTANCE_INVERSE}
     * * {@link DISTANCE_EXPONENTIAL}
     * Default is {@link DISTANCE_LINEAR}.
    */
    distanceModel: string;
    /**
     * The reference distance for reducing volume as the sound source moves further from the listener.
    */
    refDistance: number;
    /**
     * The maximum distance from the listener at which audio falloff stops. Note the volume of the audio is not 0 after this distance, but just doesn't fall off anymore.
    */
    maxDistance: number;
    /**
     * The factor used in the falloff equation.
    */
    rollOffFactor: number;
}

/**
 * Creates a new sound manager.
 * @property volume - Global volume for the manager. All {@link SoundInstance}s will scale their volume with this volume. Valid between [0, 1].
 * @param [options] - Options options object.
 * @param [options.forceWebAudioApi] - Always use the Web Audio API even check indicates that it if not available.
 */
export class SoundManager extends EventHandler {
    constructor(options?: {
        forceWebAudioApi?: boolean;
    });
    /**
     * Global volume for the manager. All {@link SoundInstance}s will scale their volume with this volume. Valid between [0, 1].
    */
    volume: number;
}

/**
 * Represents the resource of an audio asset.
 * @property buffer - If the Web Audio API is supported this contains the audio data.
 * @property audio - If the Web Audio API is not supported this contains the audio data.
 * @property duration - Returns the duration of the sound. If the sound is not loaded it returns 0.
 * @param resource - If the Web Audio API is supported, pass an AudioBuffer object, otherwise
an Audio object.
 */
export class Sound {
    constructor(resource: HTMLAudioElement | AudioBuffer);
    /**
     * If the Web Audio API is supported this contains the audio data.
    */
    buffer: AudioBuffer;
    /**
     * If the Web Audio API is not supported this contains the audio data.
    */
    audio: HTMLAudioElement;
    /**
     * Returns the duration of the sound. If the sound is not loaded it returns 0.
    */
    duration: number;
}

/**
 * Inline - always available type of session. It has limited features availability and is rendered
into HTML element.
 */
export const XRTYPE_INLINE: string;

/**
 * Immersive VR - session that provides exclusive access to VR device with best available tracking
features.
 */
export const XRTYPE_VR: string;

/**
 * Immersive AR - session that provides exclusive access to VR/AR device that is intended to be blended
with real-world environment.
 */
export const XRTYPE_AR: string;

/**
 * Viewer - always supported space with some basic tracking capabilities.
 */
export const XRSPACE_VIEWER: string;

/**
 * Local - represents a tracking space with a native origin near the viewer at the time of creation.
The exact position and orientation will be initialized based on the conventions of the underlying platform.
When using this reference space the user is not expected to move beyond their initial position much, if at all,
and tracking is optimized for that purpose. For devices with 6DoF tracking, local reference spaces should
emphasize keeping the origin stable relative to the user’s environment.
 */
export const XRSPACE_LOCAL: string;

/**
 * Local Floor - represents a tracking space with a native origin at the floor in a safe position for
the user to stand. The y axis equals 0 at floor level, with the x and z position and orientation initialized
based on the conventions of the underlying platform. Floor level value might be estimated by the underlying
platform. When using this reference space, the user is not expected to move beyond their initial position much,
if at all, and tracking is optimized for that purpose. For devices with 6DoF tracking, local-floor reference
spaces should emphasize keeping the origin stable relative to the user’s environment.
 */
export const XRSPACE_LOCALFLOOR: string;

/**
 * Bounded Floor - represents a tracking space with its native origin at the floor, where the user
is expected to move within a pre-established boundary. Tracking in a bounded-floor reference space is optimized
for keeping the native origin and bounds geometry stable relative to the user’s environment.
 */
export const XRSPACE_BOUNDEDFLOOR: string;

/**
 * Unbounded - represents a tracking space where the user is expected to move freely around their
environment, potentially even long distances from their starting point. Tracking in an unbounded reference space
is optimized for stability around the user’s current position, and as such the native origin may drift over time.
 */
export const XRSPACE_UNBOUNDED: string;

/**
 * Gaze - indicates the target ray will originate at the viewer and follow the direction it is facing. (This is commonly referred to as a "gaze input" device in the context of head-mounted displays.)
 */
export const XRTARGETRAY_GAZE: string;

/**
 * Screen - indicates that the input source was an interaction with the canvas element associated with an inline session’s output context, such as a mouse click or touch event.
 */
export const XRTARGETRAY_SCREEN: string;

/**
 * Tracked Pointer - indicates that the target ray originates from either a handheld device or other hand-tracking mechanism and represents that the user is using their hands or the held device for pointing.
 */
export const XRTARGETRAY_POINTER: string;

/**
 * None - input source is not meant to be held in hands.
 */
export const XRHAND_NONE: string;

/**
 * Left - indicates that input source is meant to be held in left hand.
 */
export const XRHAND_LEFT: string;

/**
 * Right - indicates that input source is meant to be held in right hand.
 */
export const XRHAND_RIGHT: string;

/**
 * Point - indicates that the hit test results will be computed based on the feature points detected by the underlying Augmented Reality system.
 */
export const XRTRACKABLE_POINT: string;

/**
 * Plane - indicates that the hit test results will be computed based on the planes detected by the underlying Augmented Reality system.
 */
export const XRTRACKABLE_PLANE: string;

/**
 * Mesh - indicates that the hit test results will be computed based on the meshes detected by the underlying Augmented Reality system.
 */
export const XRTRACKABLE_MESH: string;

/**
 * Depth Sensing provides depth information which is reconstructed using the underlying AR system. It provides the ability to query depth values (CPU path) or access a depth texture (GPU path). Depth information can be used (not limited to) for reconstructing real world geometry, virtual object placement, occlusion of virtual objects by real world geometry and more.
 * @example
 * // CPU path
var depthSensing = app.xr.depthSensing;
if (depthSensing.available) {
    // get depth in the middle of the screen, value is in meters
    var depth = depthSensing.getDepth(depthSensing.width / 2, depthSensing.height / 2);
}
 * @example
 * // GPU path, attaching texture to material
material.diffuseMap = depthSensing.texture;
material.setParameter('matrix_depth_uv', depthSensing.uvMatrix.data);
material.update();

// update UV transformation matrix on depth texture resize
depthSensing.on('resize', function () {
    material.setParameter('matrix_depth_uv', depthSensing.uvMatrix.data);
});
 * @example
 * // GLSL shader to unpack depth texture
varying vec2 vUv0;

uniform sampler2D texture_depthSensingMap;
uniform mat4 matrix_depth_uv;

void main(void) {
    // transform UVs using depth matrix
    vec2 texCoord = (matrix_depth_uv * vec4(vUv0.xy, 0.0, 1.0)).xy;

    // get luminance alpha components from depth texture
    vec2 packedDepth = texture2D(texture_depthSensingMap, texCoord).ra;

    // unpack into single value in millimeters
    float depth = dot(packedDepth, vec2(255.0, 256.0 * 255.0)); // mm

    // normalize: 0m to 8m distance
    depth = min(depth / 8000.0, 1.0); // 0..1 = 0m..8m

    // paint scene from black to white based on distance
    gl_FragColor = vec4(depth, depth, depth, 1.0);
}
 * @property supported - True if Depth Sensing is supported.
 * @property width - Width of depth texture or 0 if not available.
 * @property height - Height of depth texture or 0 if not available.
 * @param manager - WebXR Manager.
 */
export class XrDepthSensing extends EventHandler {
    constructor(manager: XrManager);
    /**
     * Get depth value from depth information in meters. X and Y coordinates are in depth texture space, use {@link XrDepthSensing#width} and {@link XrDepthSensing#height}. This is not using a GPU texture and is a CPU path.
     * @example
     * var depth = app.xr.depthSensing.getDepth(x, y);
    if (depth !== null) {
        // depth in meters
    }
     * @param x - x coordinate of pixel in depth texture.
     * @param y - y coordinate of pixel in depth texture.
     * @returns Depth in meters or null if depth information is not available.
     */
    getDepth(x: number, y: number): number | null;
    /**
     * True if depth sensing information is available.
     * @example
     * if (app.xr.depthSensing.available) {
        var depth = app.xr.depthSensing.getDepth(x, y);
    }
     */
    available: boolean;
    /**
     * Texture that contains packed depth information. The format of this texture is {@link PIXELFORMAT_L8_A8}. It is UV transformed based on the underlying AR system which can be normalized using {@link XrDepthSensing#uvMatrix}.
     * @example
     * material.diffuseMap = depthSensing.texture;
     * @example
     * // GLSL shader to unpack depth texture
    varying vec2 vUv0;
    
    uniform sampler2D texture_depthSensingMap;
    uniform mat4 matrix_depth_uv;
    
    void main(void) {
        // transform UVs using depth matrix
        vec2 texCoord = (matrix_depth_uv * vec4(vUv0.xy, 0.0, 1.0)).xy;
    
        // get luminance alpha components from depth texture
        vec2 packedDepth = texture2D(texture_depthSensingMap, texCoord).ra;
    
        // unpack into single value in millimeters
        float depth = dot(packedDepth, vec2(255.0, 256.0 * 255.0)); // mm
    
        // normalize: 0m to 8m distance
        depth = min(depth / 8000.0, 1.0); // 0..1 = 0m..8m
    
        // paint scene from black to white based on distance
        gl_FragColor = vec4(depth, depth, depth, 1.0);
    }
     */
    texture: Texture;
    /**
     * 4x4 matrix that should be used to transform depth texture UVs to normalized UVs in a shader. It is updated when the depth texture is resized. Refer to {@link XrDepthSensing#resize}.
     * @example
     * material.setParameter('matrix_depth_uv', depthSensing.uvMatrix.data);
     */
    uvMatrix: Mat4;
    /**
     * True if Depth Sensing is supported.
    */
    supported: boolean;
    /**
     * Width of depth texture or 0 if not available.
    */
    width: number;
    /**
     * Height of depth texture or 0 if not available.
    */
    height: number;
}

/**
 * DOM Overlay provides the ability to use DOM elements as an overlay in a WebXR AR session. It requires that the root DOM element is provided for session start. That way, input source select events are first tested against DOM Elements and then propagated down to the XR Session. If this propagation is not desirable, use the `beforexrselect` event on a DOM element and the `preventDefault` function to stop propagation.
 * @example
 * app.xr.domOverlay.root = element;
app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR);
 * @example
 * // Disable input source firing `select` event when some descendant element of DOM overlay root is touched/clicked.
// This is useful when the user interacts with UI elements and there should not be `select` events behind UI.
someElement.addEventListener('beforexrselect', function (evt) {
    evt.preventDefault();
});
 * @property supported - True if DOM Overlay is supported.
 * @property available - True if DOM Overlay is available. It can only be available if it is supported, during a valid WebXR session and if a valid root element is provided.
 * @property state - State of the DOM Overlay, which defines how the root DOM element is rendered. Possible options:

* screen: Screen - indicates that the DOM element is covering whole physical screen, matching XR viewports.
* floating: Floating - indicates that the underlying platform renders the DOM element as floating in space, which can move during the WebXR session or allow the application to move the element.
* head-locked: Head Locked - indicates that the DOM element follows the user's head movement consistently, appearing similar to a helmet heads-up display.
 * @param manager - WebXR Manager.
 */
export class XrDomOverlay {
    constructor(manager: XrManager);
    /**
     * The DOM element to be used as the root for DOM Overlay. Can be changed only outside of an active WebXR session.
     * @example
     * app.xr.domOverlay.root = element;
    app.xr.start(camera, pc.XRTYPE_AR, pc.XRSPACE_LOCALFLOOR);
     */
    root: any | null;
    /**
     * True if DOM Overlay is supported.
    */
    supported: boolean;
    /**
     * True if DOM Overlay is available. It can only be available if it is supported, during a valid WebXR session and if a valid root element is provided.
    */
    available: boolean;
    /**
     * State of the DOM Overlay, which defines how the root DOM element is rendered. Possible options:
     * * screen: Screen - indicates that the DOM element is covering whole physical screen, matching XR viewports.
     * * floating: Floating - indicates that the underlying platform renders the DOM element as floating in space, which can move during the WebXR session or allow the application to move the element.
     * * head-locked: Head Locked - indicates that the DOM element follows the user's head movement consistently, appearing similar to a helmet heads-up display.
    */
    state: string | null;
}

/**
 * Represents finger with related joints and index
 * @property index - Index of a finger, numeration is: thumb, index, middle, ring, little
 * @property hand - Hand that finger relates to
 * @property joints - List of joints that relates to this finger, starting from joint closest to wrist all the way to the tip of a finger
 * @property tip - Tip of a finger, or null if not available
 * @param index - Index of a finger
 * @param hand - Hand that finger relates to
 */
export class XrFinger {
    constructor(index: number, hand: XrHand);
    /**
     * Index of a finger, numeration is: thumb, index, middle, ring, little
    */
    index: number;
    /**
     * Hand that finger relates to
    */
    hand: XrHand;
    /**
     * List of joints that relates to this finger, starting from joint closest to wrist all the way to the tip of a finger
    */
    joints: XrJoint[];
    /**
     * Tip of a finger, or null if not available
    */
    tip: XrJoint | null;
}

/**
 * Represents a hand with fingers and joints
 * @property fingers - List of fingers of a hand
 * @property joints - List of joints of hand
 * @property tips - List of joints that are tips of a fingers
 * @property wrist - Wrist of a hand, or null if it is not available by WebXR underlying system
 * @property tracking - True if tracking is available, otherwise tracking might be lost
 * @param inputSource - Input Source that hand is related to
 */
export class XrHand {
    constructor(inputSource: XrInputSource);
    /**
     * Returns joint by XRHand id from list in specs: https://immersive-web.github.io/webxr-hand-input/
     * @param id - id of a joint based on specs ID's in XRHand: https://immersive-web.github.io/webxr-hand-input/
     * @returns Joint or null if not available
     */
    getJointById(id: string): XrJoint | null;
    /**
     * List of fingers of a hand
    */
    fingers: XrFinger[];
    /**
     * List of joints of hand
    */
    joints: XrJoint[];
    /**
     * List of joints that are tips of a fingers
    */
    tips: XrJoint[];
    /**
     * Wrist of a hand, or null if it is not available by WebXR underlying system
    */
    wrist: XrJoint | null;
    /**
     * True if tracking is available, otherwise tracking might be lost
    */
    tracking: boolean;
}

/**
 * Represents XR hit test source, which provides access to hit results of real world geometry from AR session.
 * @example
 * hitTestSource.on('result', function (position, rotation) {
    target.setPosition(position);
});
 * @param manager - WebXR Manager.
 * @param xrHitTestSource - XRHitTestSource object that is created by WebXR API.
 * @param transient - True if XRHitTestSource created for input source profile.
 */
export class XrHitTestSource extends EventHandler {
    constructor(manager: XrManager, xrHitTestSource: any, transient: boolean);
    /**
     * Stop and remove hit test source.
     */
    remove(): void;
}

/**
 * Hit Test provides ability to get position and rotation of ray intersecting point with representation of real world geometry by underlying AR system.
 * @property supported - True if AR Hit Test is supported.
 * @property sources - list of active {@link XrHitTestSource}.
 * @param manager - WebXR Manager.
 */
export class XrHitTest extends EventHandler {
    constructor(manager: XrManager);
    /**
     * Attempts to start hit test with provided reference space.
     * @example
     * app.xr.hitTest.start({
        spaceType: pc.XRSPACE_VIEWER,
        callback: function (err, hitTestSource) {
            if (err) return;
            hitTestSource.on('result', function (position, rotation) {
                // position and rotation of hit test result
                // based on Ray facing forward from the Viewer reference space
            });
        }
    });
     * @example
     * var ray = new pc.Ray(new pc.Vec3(0, 0, 0), new pc.Vec3(0, -1, 0));
    app.xr.hitTest.start({
        spaceType: pc.XRSPACE_LOCAL,
        offsetRay: ray,
        callback: function (err, hitTestSource) {
            // hit test source that will sample real world geometry straight down
            // from the position where AR session started
        }
    });
     * @example
     * app.xr.hitTest.start({
        profile: 'generic-touchscreen',
        callback: function (err, hitTestSource) {
            if (err) return;
            hitTestSource.on('result', function (position, rotation, inputSource) {
                // position and rotation of hit test result
                // that will be created from touch on mobile devices
            });
        }
    });
     * @param [options] - Optional object for passing arguments.
     * @param [options.spaceType] - Reference space type. Defaults to {@link XRSPACE_VIEWER}. Can be one of the following:
    
    * {@link XRSPACE_VIEWER}: Viewer - hit test will be facing relative to viewers space.
    * {@link XRSPACE_LOCAL}: Local - represents a tracking space with a native origin near the viewer at the time of creation.
    * {@link XRSPACE_LOCALFLOOR}: Local Floor - represents a tracking space with a native origin at the floor in a safe position for the user to stand. The y axis equals 0 at floor level. Floor level value might be estimated by the underlying platform.
    * {@link XRSPACE_BOUNDEDFLOOR}: Bounded Floor - represents a tracking space with its native origin at the floor, where the user is expected to move within a pre-established boundary.
    * {@link XRSPACE_UNBOUNDED}: Unbounded - represents a tracking space where the user is expected to move freely around their environment, potentially long distances from their starting point.
     * @param [options.profile] - if hit test source meant to match input source instead of reference space, then name of profile of the {@link XrInputSource} should be provided.
     * @param [options.entityTypes] - Optional list of underlying entity types against which hit tests will be performed. Defaults to [ {@link XRTRACKABLE_PLANE} ]. Can be any combination of the following:
    
    * {@link XRTRACKABLE_POINT}: Point - indicates that the hit test results will be computed based on the feature points detected by the underlying Augmented Reality system.
    * {@link XRTRACKABLE_PLANE}: Plane - indicates that the hit test results will be computed based on the planes detected by the underlying Augmented Reality system.
    * {@link XRTRACKABLE_MESH}: Mesh - indicates that the hit test results will be computed based on the meshes detected by the underlying Augmented Reality system.
     * @param [options.offsetRay] - Optional ray by which hit test ray can be offset.
     * @param [options.callback] - Optional callback function called once hit test source is created or failed.
     */
    start(options?: {
        spaceType?: string;
        profile?: string;
        entityTypes?: string[];
        offsetRay?: Ray;
        callback?: callbacks.XrHitTestStart;
    }): void;
    /**
     * True if AR Hit Test is supported.
    */
    supported: boolean;
    /**
     * list of active {@link XrHitTestSource}.
    */
    sources: XrHitTestSource[];
}

/**
 * Image Tracking provides the ability to track real world images by provided image samples and their estimate sizes.
 * @property supported - True if Image Tracking is supported.
 * @property available - True if Image Tracking is available. This property will be false if no images were provided for the AR session or there was an error processing the provided images.
 * @property images - List of {@link XrTrackedImage} that contain tracking information.
 * @param manager - WebXR Manager.
 */
export class XrImageTracking {
    constructor(manager: XrManager);
    /**
     * Add an image for image tracking. A width can also be provided to help the underlying system estimate the appropriate transformation. Modifying the tracked images list is only possible before an AR session is started.
     * @example
     * // image with width of 20cm (0.2m)
    app.xr.imageTracking.add(bookCoverImg, 0.2);
     * @param image - Image that is matching real world image as close as possible. Resolution of images should be at least 300x300. High resolution does NOT improve tracking performance. Color of image is irrelevant, so greyscale images can be used. Images with too many geometric features or repeating patterns will reduce tracking stability.
     * @param width - Width (in meters) of image in the real world. Providing this value as close to the real value will improve tracking quality.
     * @returns Tracked image object that will contain tracking information.
     */
    add(image: HTMLCanvasElement | HTMLImageElement | SVGImageElement | HTMLVideoElement | Blob | ImageData | ImageBitmap, width: number): XrTrackedImage;
    /**
     * Remove an image from image tracking.
     * @param trackedImage - Tracked image to be removed. Modifying the tracked images list is only possible before an AR session is started.
     */
    remove(trackedImage: XrTrackedImage): void;
    /**
     * True if Image Tracking is supported.
    */
    supported: boolean;
    /**
     * True if Image Tracking is available. This property will be false if no images were provided for the AR session or there was an error processing the provided images.
    */
    available: boolean;
    /**
     * List of {@link XrTrackedImage} that contain tracking information.
    */
    images: XrTrackedImage[];
}

/**
 * Represents XR input source, which is any input mechanism which allows the user to perform targeted actions in the same virtual space as the viewer. Example XR input sources include, but are not limited to, handheld controllers, optically tracked hands, and gaze-based input methods that operate on the viewer's pose.
 * @property id - Unique number associated with instance of input source. Same physical devices when reconnected will not share this ID.
 * @property inputSource - XRInputSource object that is associated with this input source.
 * @property targetRayMode - Type of ray Input Device is based on. Can be one of the following:

* {@link XRTARGETRAY_GAZE}: Gaze - indicates the target ray will originate at the viewer and follow the direction it is facing. (This is commonly referred to as a "gaze input" device in the context of head-mounted displays.)
* {@link XRTARGETRAY_SCREEN}: Screen - indicates that the input source was an interaction with the canvas element associated with an inline session’s output context, such as a mouse click or touch event.
* {@link XRTARGETRAY_POINTER}: Tracked Pointer - indicates that the target ray originates from either a handheld device or other hand-tracking mechanism and represents that the user is using their hands or the held device for pointing.
 * @property handedness - Describes which hand input source is associated with. Can be one of the following:

* {@link XRHAND_NONE}: None - input source is not meant to be held in hands.
* {@link XRHAND_LEFT}: Left - indicates that input source is meant to be held in left hand.
* {@link XRHAND_RIGHT}: Right - indicates that input source is meant to be held in right hand.
 * @property profiles - List of input profile names indicating both the prefered visual representation and behavior of the input source.
 * @property grip - If input source can be held, then it will have node with its world transformation, that can be used to position and rotate virtual joystics based on it.
 * @property hand - If input source is a tracked hand, then it will point to {@link XrHand} otherwise it is null.
 * @property gamepad - If input source has buttons, triggers, thumbstick or touchpad, then this object provides access to its states.
 * @property selecting - True if input source is in active primary action between selectstart and selectend events.
 * @property squeezing - True if input source is in active squeeze action between squeezestart and squeezeend events.
 * @property elementInput - Set to true to allow input source to interact with Element components. Defaults to true.
 * @property elementEntity - If {@link XrInputSource#elementInput} is true, this property will hold entity with Element component at which this input source is hovering, or null if not hovering over any element.
 * @property hitTestSources - list of active {@link XrHitTestSource} created by this input source.
 * @param manager - WebXR Manager.
 * @param xrInputSource - [XRInputSource]{@link https://developer.mozilla.org/en-US/docs/Web/API/XRInputSource} object that is created by WebXR API.
 */
export class XrInputSource extends EventHandler {
    constructor(manager: XrManager, xrInputSource: any);
    /**
     * Get the world space position of input source if it is handheld ({@link XrInputSource#grip} is true). Otherwise it will return null.
     * @returns The world space position of handheld input source.
     */
    getPosition(): Vec3 | null;
    /**
     * Get the local space position of input source if it is handheld ({@link XrInputSource#grip} is true). Local space is relative to parent of the XR camera. Otherwise it will return null.
     * @returns The world space position of handheld input source.
     */
    getLocalPosition(): Vec3 | null;
    /**
     * Get the world space rotation of input source if it is handheld ({@link XrInputSource#grip} is true). Otherwise it will return null.
     * @returns The world space rotation of handheld input source.
     */
    getRotation(): Quat | null;
    /**
     * Get the local space rotation of input source if it is handheld ({@link XrInputSource#grip} is true). Local space is relative to parent of the XR camera. Otherwise it will return null.
     * @returns The world space rotation of handheld input source.
     */
    getLocalRotation(): Vec3 | null;
    /**
     * Get the world space origin of input source ray.
     * @returns The world space origin of input source ray.
     */
    getOrigin(): Vec3;
    /**
     * Get the world space direction of input source ray.
     * @returns The world space direction of input source ray.
     */
    getDirection(): Vec3;
    /**
     * Attempts to start hit test source based on this input source.
     * @example
     * app.xr.input.on('add', function (inputSource) {
        inputSource.hitTestStart({
            callback: function (err, hitTestSource) {
                if (err) return;
                hitTestSource.on('result', function (position, rotation) {
                    // position and rotation of hit test result
                    // that will be created from touch on mobile devices
                });
            }
        });
    });
     * @param [options] - Object for passing optional arguments.
     * @param [options.entityTypes] - Optional list of underlying entity types
    against which hit tests will be performed. Defaults to [ {@link XRTRACKABLE_PLANE} ].
    Can be any combination of the following:
    
    * {@link XRTRACKABLE_POINT}: Point - indicates that the hit test results will be
    computed based on the feature points detected by the underlying Augmented Reality system.
    * {@link XRTRACKABLE_PLANE}: Plane - indicates that the hit test results will be
    computed based on the planes detected by the underlying Augmented Reality system.
    * {@link XRTRACKABLE_MESH}: Mesh - indicates that the hit test results will be
    computed based on the meshes detected by the underlying Augmented Reality system.
     * @param [options.offsetRay] - Optional ray by which hit test ray can be offset.
     * @param [options.callback] - Optional callback function
    called once hit test source is created or failed.
     */
    hitTestStart(options?: {
        entityTypes?: string[];
        offsetRay?: Ray;
        callback?: callbacks.XrHitTestStart;
    }): void;
    /**
     * Unique number associated with instance of input source. Same physical devices when reconnected will not share this ID.
    */
    id: number;
    /**
     * XRInputSource object that is associated with this input source.
    */
    inputSource: any;
    /**
     * Type of ray Input Device is based on. Can be one of the following:
     * * {@link XRTARGETRAY_GAZE}: Gaze - indicates the target ray will originate at the viewer and follow the direction it is facing. (This is commonly referred to as a "gaze input" device in the context of head-mounted displays.)
     * * {@link XRTARGETRAY_SCREEN}: Screen - indicates that the input source was an interaction with the canvas element associated with an inline session’s output context, such as a mouse click or touch event.
     * * {@link XRTARGETRAY_POINTER}: Tracked Pointer - indicates that the target ray originates from either a handheld device or other hand-tracking mechanism and represents that the user is using their hands or the held device for pointing.
    */
    targetRayMode: string;
    /**
     * Describes which hand input source is associated with. Can be one of the following:
     * * {@link XRHAND_NONE}: None - input source is not meant to be held in hands.
     * * {@link XRHAND_LEFT}: Left - indicates that input source is meant to be held in left hand.
     * * {@link XRHAND_RIGHT}: Right - indicates that input source is meant to be held in right hand.
    */
    handedness: string;
    /**
     * List of input profile names indicating both the prefered visual representation and behavior of the input source.
    */
    profiles: string[];
    /**
     * If input source can be held, then it will have node with its world transformation, that can be used to position and rotate virtual joystics based on it.
    */
    grip: boolean;
    /**
     * If input source is a tracked hand, then it will point to {@link XrHand} otherwise it is null.
    */
    hand: XrHand | null;
    /**
     * If input source has buttons, triggers, thumbstick or touchpad, then this object provides access to its states.
    */
    gamepad: Gamepad | null;
    /**
     * True if input source is in active primary action between selectstart and selectend events.
    */
    selecting: boolean;
    /**
     * True if input source is in active squeeze action between squeezestart and squeezeend events.
    */
    squeezing: boolean;
    /**
     * Set to true to allow input source to interact with Element components. Defaults to true.
    */
    elementInput: boolean;
    /**
     * If {@link XrInputSource#elementInput} is true, this property will hold entity with Element component at which this input source is hovering, or null if not hovering over any element.
    */
    elementEntity: Entity;
    /**
     * list of active {@link XrHitTestSource} created by this input source.
    */
    hitTestSources: XrHitTestSource[];
}

/**
 * Provides access to input sources for WebXR.
 * @property inputSources - List of active {@link XrInputSource}.
 * @param manager - WebXR Manager.
 */
export class XrInput extends EventHandler {
    constructor(manager: XrManager);
    /**
     * List of active {@link XrInputSource}.
    */
    inputSources: XrInputSource[];
}

/**
 * Represents joint of a finger
 * @property index - Index of a joint within a finger, starting from 0 (root of a finger) all the way to tip of the finger
 * @property hand - Hand that joint relates to
 * @property finger - Finger that joint relates to
 * @property wrist - True if joint is a wrist
 * @property tip - True if joint is a tip of a finger
 * @property radius - The radius of a joint, which is a distance from joint to the edge of a skin
 * @param index - Index of a joint within a finger
 * @param id - Id of a joint based on WebXR Hand Input Specs
 * @param hand - Hand that joint relates to
 * @param [finger] - Finger that joint is related to, can be null in case of wrist joint
 */
export class XrJoint {
    constructor(index: number, id: string, hand: XrHand, finger?: XrFinger);
    /**
     * Get the world space position of a joint
     * @returns The world space position of a joint
     */
    getPosition(): Vec3;
    /**
     * Get the world space rotation of a joint
     * @returns The world space rotation of a joint
     */
    getRotation(): Quat;
    /**
     * Index of a joint within a finger, starting from 0 (root of a finger) all the way to tip of the finger
    */
    index: number;
    /**
     * Hand that joint relates to
    */
    hand: XrHand;
    /**
     * Finger that joint relates to
    */
    finger: XrFinger | null;
    /**
     * True if joint is a wrist
    */
    wrist: boolean;
    /**
     * True if joint is a tip of a finger
    */
    tip: boolean;
    /**
     * The radius of a joint, which is a distance from joint to the edge of a skin
    */
    radius: number;
}

/**
 * Creates a new XrLightEstimation. Note that this is created internally by the {@link XrManager}.
 * @property supported - True if Light Estimation is supported. This information is available only during an active AR session.
 * @property intensity - Intensity of what is estimated to be the most prominent directional light. Or null if data is not available.
 * @property color - Color of what is estimated to be the most prominent directional light. Or null if data is not available.
 * @property rotation - Rotation of what is estimated to be the most prominent directional light. Or null if data is not available.
 * @param manager - WebXR Manager.
 */
export class XrLightEstimation extends EventHandler {
    constructor(manager: XrManager);
    /**
     * Start estimation of illimunation data.
    Availability of such data will come later and an `available` event will be fired.
    If it failed to start estimation, an `error` event will be fired.
     * @example
     * app.xr.on('start', function () {
        if (app.xr.lightEstimation.supported) {
            app.xr.lightEstimation.start();
        }
    });
     */
    start(): void;
    /**
     * End estimation of illumination data.
     */
    end(): void;
    /**
     * True if estimated light information is available.
     * @example
     * if (app.xr.lightEstimation.available) {
        entity.light.intensity = app.xr.lightEstimation.intensity;
    }
     */
    available: boolean;
    /**
     * True if Light Estimation is supported. This information is available only during an active AR session.
    */
    supported: boolean;
    /**
     * Intensity of what is estimated to be the most prominent directional light. Or null if data is not available.
    */
    intensity: number | null;
    /**
     * Color of what is estimated to be the most prominent directional light. Or null if data is not available.
    */
    color: Color | null;
    /**
     * Rotation of what is estimated to be the most prominent directional light. Or null if data is not available.
    */
    rotation: Quat | null;
}

/**
 * Manage and update XR session and its states.
 * @property supported - True if XR is supported.
 * @property active - True if XR session is running.
 * @property type - Returns type of currently running XR session or null if no session is running. Can be
any of XRTYPE_*.
 * @property spaceType - Returns reference space type of currently running XR session or null if no session
is running. Can be any of XRSPACE_*.
 * @property camera - Active camera for which XR session is running or null.
 * @property input - provides access to Input Sources.
 * @property hitTest - provides ability to hit test representation of real world geometry of underlying AR system.
 * @property session - provides access to XRSession of WebXR
 * @param app - The main application.
 */
export class XrManager extends EventHandler {
    constructor(app: Application);
    /**
     * Attempts to start XR session for provided {@link CameraComponent} and optionally fires callback when session is created or failed to create.
     * @example
     * button.on('click', function () {
        app.xr.start(camera, pc.XRTYPE_VR, pc.XRSPACE_LOCAL);
    });
     * @param camera - it will be used to render XR session and manipulated based on pose tracking
     * @param type - session type. Can be one of the following:
    
    * {@link XRTYPE_INLINE}: Inline - always available type of session. It has limited features availability and is rendered into HTML element.
    * {@link XRTYPE_VR}: Immersive VR - session that provides exclusive access to VR device with best available tracking features.
    * {@link XRTYPE_AR}: Immersive AR - session that provides exclusive access to VR/AR device that is intended to be blended with real-world environment.
     * @param spaceType - reference space type. Can be one of the following:
    
    * {@link XRSPACE_VIEWER}: Viewer - always supported space with some basic tracking capabilities.
    * {@link XRSPACE_LOCAL}: Local - represents a tracking space with a native origin near the viewer at the time of creation. It is meant for seated or basic local XR sessions.
    * {@link XRSPACE_LOCALFLOOR}: Local Floor - represents a tracking space with a native origin at the floor in a safe position for the user to stand. The y axis equals 0 at floor level. Floor level value might be estimated by the underlying platform. It is meant for seated or basic local XR sessions.
    * {@link XRSPACE_BOUNDEDFLOOR}: Bounded Floor - represents a tracking space with its native origin at the floor, where the user is expected to move within a pre-established boundary.
    * {@link XRSPACE_UNBOUNDED}: Unbounded - represents a tracking space where the user is expected to move freely around their environment, potentially long distances from their starting point.
     * @param [options] - object with additional options for XR session initialization.
     * @param [options.optionalFeatures] - Optional features for XRSession start. It is used for getting access to additional WebXR spec extensions.
     * @param [options.callback] - Optional callback function called once session is started. The callback has one argument Error - it is null if successfully started XR session.
     */
    start(camera: CameraComponent, type: string, spaceType: string, options?: {
        optionalFeatures?: string[];
        callback?: callbacks.XrError;
    }): void;
    /**
     * Attempts to end XR session and optionally fires callback when session is ended or failed to end.
     * @example
     * app.keyboard.on('keydown', function (evt) {
        if (evt.key === pc.KEY_ESCAPE && app.xr.active) {
            app.xr.end();
        }
    });
     * @param [callback] - Optional callback function called once session is started. The callback has one argument Error - it is null if successfully started XR session.
     */
    end(callback?: callbacks.XrError): void;
    /**
     * Check if specific type of session is available
     * @example
     * if (app.xr.isAvailable(pc.XRTYPE_VR)) {
        // VR is available
    }
     * @param type - session type. Can be one of the following:
    
    * {@link XRTYPE_INLINE}: Inline - always available type of session. It has limited features availability and is rendered into HTML element.
    * {@link XRTYPE_VR}: Immersive VR - session that provides exclusive access to VR device with best available tracking features.
    * {@link XRTYPE_AR}: Immersive AR - session that provides exclusive access to VR/AR device that is intended to be blended with real-world environment.
     * @returns True if specified session type is available.
     */
    isAvailable(type: string): boolean;
    /**
     * True if XR is supported.
    */
    supported: boolean;
    /**
     * True if XR session is running.
    */
    active: boolean;
    /**
     * Returns type of currently running XR session or null if no session is running. Can be
     * any of XRTYPE_*.
    */
    type: string | null;
    /**
     * Returns reference space type of currently running XR session or null if no session
     * is running. Can be any of XRSPACE_*.
    */
    spaceType: string | null;
    /**
     * Active camera for which XR session is running or null.
    */
    camera: Entity | null;
    /**
     * provides access to Input Sources.
    */
    input: XrInput;
    /**
     * provides ability to hit test representation of real world geometry of underlying AR system.
    */
    hitTest: XrHitTest;
    /**
     * provides access to XRSession of WebXR
    */
    session: any | null;
}

/**
 * The tracked image interface that is created by the Image Tracking system and is provided as a list from {@link XrImageTracking#images}. It contains information about the tracking state as well as the position and rotation of the tracked image.
 * @property image - Image that is used for tracking.
 * @property width - Width that is provided to assist tracking performance. This property can be updated only when the AR session is not running.
 * @property trackable - True if image is trackable. A too small resolution or invalid images can be untrackable by the underlying AR system.
 * @property tracking - True if image is in tracking state and being tracked in real world by the underlying AR system.
 * @property emulated - True if image was recently tracked but currently is not actively tracked due to inability of identifying the image by the underlying AR system. Position and rotation will be based on the previously known transformation assuming the tracked image has not moved.
 * @param image - Image that is matching the real world image as closely as possible. Resolution of images should be at least 300x300. High resolution does NOT improve tracking performance. Color of image is irrelevant, so greyscale images can be used. Images with too many geometric features or repeating patterns will reduce tracking stability.
 * @param width - Width (in meters) of image in real world. Providing this value as close to the real value will improve tracking quality.
 */
export class XrTrackedImage {
    constructor(image: HTMLCanvasElement | HTMLImageElement | SVGImageElement | HTMLVideoElement | Blob | ImageData | ImageBitmap, width: number);
    /**
     * Get the position of the tracked image. The position is the most recent one based on the tracked image state.
     * @example
     * // update entity position to match tracked image position
    entity.setPosition(trackedImage.getPosition());
     * @returns Position in world space.
     */
    getPosition(): Vec3;
    /**
     * Get the rotation of the tracked image. The rotation is the most recent based on the tracked image state.
     * @example
     * // update entity rotation to match tracked image rotation
    entity.setRotation(trackedImage.getRotation());
     * @returns Rotation in world space.
     */
    getRotation(): Quat;
    /**
     * Image that is used for tracking.
    */
    image: HTMLCanvasElement | HTMLImageElement | SVGImageElement | HTMLVideoElement | Blob | ImageData | ImageBitmap;
    /**
     * Width that is provided to assist tracking performance. This property can be updated only when the AR session is not running.
    */
    width: number;
    /**
     * True if image is trackable. A too small resolution or invalid images can be untrackable by the underlying AR system.
    */
    trackable: boolean;
    /**
     * True if image is in tracking state and being tracked in real world by the underlying AR system.
    */
    tracking: boolean;
    /**
     * True if image was recently tracked but currently is not actively tracked due to inability of identifying the image by the underlying AR system. Position and rotation will be based on the previously known transformation assuming the tracked image has not moved.
    */
    emulated: boolean;
}

export as namespace pc;
