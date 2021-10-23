import { ResolvedLayoutConfig } from '../config/resolved-config';
import { PopoutBlockedError } from '../errors/external-error';
import { UnexpectedNullError, UnexpectedUndefinedError } from '../errors/internal-error';
import { EventEmitter } from '../utils/event-emitter';
import { deepExtend, getUniqueId } from '../utils/utils';
/**
 * Pops a content item out into a new browser window.
 * This is achieved by
 *
 *    - Creating a new configuration with the content item as root element
 *    - Serializing and minifying the configuration
 *    - Opening the current window's URL with the configuration as a GET parameter
 *    - GoldenLayout when opened in the new window will look for the GET parameter
 *      and use it instead of the provided configuration
 * @public
 */
export class BrowserPopout extends EventEmitter {
    /**
     * @param _config - GoldenLayout item config
     * @param _initialWindowSize - A map with width, height, top and left
     * @internal
     */
    constructor(
    /** @internal */
    _config, 
    /** @internal */
    _initialWindowSize, 
    /** @internal */
    _layoutManager) {
        super();
        this._config = _config;
        this._initialWindowSize = _initialWindowSize;
        this._layoutManager = _layoutManager;
        this._isInitialised = false;
        this._popoutWindow = null;
        this.createWindow();
    }
    toConfig() {
        var _a, _b;
        if (this._isInitialised === false) {
            throw new Error('Can\'t create config, layout not yet initialised');
        }
        const glInstance = this.getGlInstance();
        const glInstanceConfig = glInstance.saveLayout();
        let left;
        let top;
        if (this._popoutWindow === null) {
            left = null;
            top = null;
        }
        else {
            left = (_a = this._popoutWindow.screenX) !== null && _a !== void 0 ? _a : this._popoutWindow.screenLeft;
            top = (_b = this._popoutWindow.screenY) !== null && _b !== void 0 ? _b : this._popoutWindow.screenTop;
        }
        const window = {
            width: this.getGlInstance().width,
            height: this.getGlInstance().height,
            left,
            top,
        };
        const config = {
            root: glInstanceConfig.root,
            openPopouts: glInstanceConfig.openPopouts,
            settings: glInstanceConfig.settings,
            dimensions: glInstanceConfig.dimensions,
            header: glInstanceConfig.header,
            window,
            parentId: this._config.parentId,
            indexInParent: this._config.indexInParent,
            resolved: true,
        };
        return config;
    }
    getGlInstance() {
        if (this._popoutWindow === null) {
            throw new UnexpectedNullError('BPGGI24693');
        }
        return this._popoutWindow.__glInstance;
    }
    /**
     * Retrieves the native BrowserWindow backing this popout.
     * Might throw an UnexpectedNullError exception when the window is not initialized yet.
     * @public
     */
    getWindow() {
        if (this._popoutWindow === null) {
            throw new UnexpectedNullError('BPGW087215');
        }
        return this._popoutWindow;
    }
    close() {
        if (this.getGlInstance()) {
            this.getGlInstance().closeWindow();
        }
        else {
            try {
                this.getWindow().close();
            }
            catch (e) {
                //
            }
        }
    }
    /**
     * Returns the popped out item to its original position. If the original
     * parent isn't available anymore it falls back to the layout's topmost element
     */
    popIn() {
        let parentItem;
        let index = this._config.indexInParent;
        if (!this._config.parentId) {
            return;
        }
        /*
        * The deepExtend call seems a bit pointless, but it's crucial to
        * copy the config returned by this.getGlInstance().toConfig()
        * onto a new object. Internet Explorer keeps the references
        * to objects on the child window, resulting in the following error
        * once the child window is closed:
        *
        * The callee (server [not server application]) is not available and disappeared
        */
        const glInstanceLayoutConfig = this.getGlInstance().saveLayout();
        const copiedGlInstanceLayoutConfig = deepExtend({}, glInstanceLayoutConfig);
        const copiedRoot = copiedGlInstanceLayoutConfig.root;
        if (copiedRoot === undefined) {
            throw new UnexpectedUndefinedError('BPPIR19998');
        }
        const groundItem = this._layoutManager.groundItem;
        if (groundItem === undefined) {
            throw new UnexpectedUndefinedError('BPPIG34972');
        }
        parentItem = groundItem.getItemsByPopInParentId(this._config.parentId)[0];
        /*
        * Fallback if parentItem is not available. Either add it to the topmost
        * item or make it the topmost item if the layout is empty
        */
        if (!parentItem) {
            if (groundItem.contentItems.length > 0) {
                parentItem = groundItem.contentItems[0];
            }
            else {
                parentItem = groundItem;
            }
            index = 0;
        }
        const newContentItem = this._layoutManager.createAndInitContentItem(copiedRoot, parentItem);
        parentItem.addChild(newContentItem, index);
        if (this._layoutManager.layoutConfig.settings.popInOnClose) {
            this._onClose();
        }
        else {
            this.close();
        }
    }
    /**
     * Creates the URL and window parameter
     * and opens a new window
     * @internal
     */
    createWindow() {
        const url = this.createUrl();
        /**
         * Bogus title to prevent re-usage of existing window with the
         * same title. The actual title will be set by the new window's
         * GoldenLayout instance if it detects that it is in subWindowMode
         */
        const target = Math.floor(Math.random() * 1000000).toString(36);
        /**
         * The options as used in the window.open string
         */
        const features = this.serializeWindowFeatures({
            width: this._initialWindowSize.width,
            height: this._initialWindowSize.height,
            innerWidth: this._initialWindowSize.width,
            innerHeight: this._initialWindowSize.height,
            menubar: 'no',
            toolbar: 'no',
            location: 'no',
            personalbar: 'no',
            resizable: 'yes',
            scrollbars: 'no',
            status: 'no'
        });
        this._popoutWindow = globalThis.open(url, target, features);
        if (!this._popoutWindow) {
            if (this._layoutManager.layoutConfig.settings.blockedPopoutsThrowError === true) {
                const error = new PopoutBlockedError('Popout blocked');
                throw error;
            }
            else {
                return;
            }
        }
        this._popoutWindow.addEventListener('load', () => this.positionWindow(), { passive: true });
        this._popoutWindow.addEventListener('beforeunload', () => {
            if (this._layoutManager.layoutConfig.settings.popInOnClose) {
                this.popIn();
            }
            else {
                this._onClose();
            }
        }, { passive: true });
        /**
         * Polling the childwindow to find out if GoldenLayout has been initialised
         * doesn't seem optimal, but the alternatives - adding a callback to the parent
         * window or raising an event on the window object - both would introduce knowledge
         * about the parent to the child window which we'd rather avoid
         */
        this._checkReadyInterval = setInterval(() => this.checkReady(), 10);
    }
    /** @internal */
    checkReady() {
        if (this._popoutWindow === null) {
            throw new UnexpectedNullError('BPCR01844');
        }
        else {
            if (this._popoutWindow.__glInstance && this._popoutWindow.__glInstance.isInitialised) {
                this.onInitialised();
                if (this._checkReadyInterval !== undefined) {
                    clearInterval(this._checkReadyInterval);
                    this._checkReadyInterval = undefined;
                }
            }
        }
    }
    /**
     * Serialises a map of key:values to a window options string
     *
     * @param windowOptions -
     *
     * @returns serialised window options
     * @internal
     */
    serializeWindowFeatures(windowOptions) {
        const windowOptionsString = [];
        for (const key in windowOptions) {
            windowOptionsString.push(key + '=' + windowOptions[key].toString());
        }
        return windowOptionsString.join(',');
    }
    /**
     * Creates the URL for the new window, including the
     * config GET parameter
     *
     * @returns URL
     * @internal
     */
    createUrl() {
        const storageKey = 'gl-window-config-' + getUniqueId();
        const config = ResolvedLayoutConfig.minifyConfig(this._config);
        try {
            localStorage.setItem(storageKey, JSON.stringify(config));
        }
        catch (e) {
            throw new Error('Error while writing to localStorage ' + e.toString());
        }
        const url = new URL(location.href);
        url.searchParams.set('gl-window', storageKey);
        return url.toString();
    }
    /**
     * Move the newly created window roughly to
     * where the component used to be.
     * @internal
     */
    positionWindow() {
        if (this._popoutWindow === null) {
            throw new Error('BrowserPopout.positionWindow: null popoutWindow');
        }
        else {
            this._popoutWindow.moveTo(this._initialWindowSize.left, this._initialWindowSize.top);
            this._popoutWindow.focus();
        }
    }
    /**
     * Callback when the new window is opened and the GoldenLayout instance
     * within it is initialised
     * @internal
     */
    onInitialised() {
        this._isInitialised = true;
        this.getGlInstance().on('popIn', () => this.popIn());
        this.emit('initialised');
    }
    /**
     * Invoked 50ms after the window unload event
     * @internal
     */
    _onClose() {
        setTimeout(() => this.emit('closed'), 50);
    }
}
//# sourceMappingURL=browser-popout.js.map