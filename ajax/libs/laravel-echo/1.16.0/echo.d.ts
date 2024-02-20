import { Channel, PresenceChannel } from './channel';
import { Connector } from './connector';
/**
 * This class is the primary API for interacting with broadcasting.
 */
export default class Echo {
    /**
     * The broadcasting connector.
     */
    connector: any;
    /**
     * The Echo options.
     */
    options: any;
    /**
     * Create a new class instance.
     */
    constructor(options: any);
    /**
     * Get a channel instance by name.
     */
    channel(channel: string): Channel;
    /**
     * Create a new connection.
     */
    connect(): void;
    /**
     * Disconnect from the Echo server.
     */
    disconnect(): void;
    /**
     * Get a presence channel instance by name.
     */
    join(channel: string): PresenceChannel;
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(channel: string): void;
    /**
     * Leave the given channel.
     */
    leaveChannel(channel: string): void;
    /**
     * Leave all channels.
     */
    leaveAllChannels(): void;
    /**
     * Listen for an event on a channel instance.
     */
    listen(channel: string, event: string, callback: Function): Channel;
    /**
     * Get a private channel instance by name.
     */
    private(channel: string): Channel;
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivate(channel: string): Channel;
    /**
     * Get the Socket ID for the connection.
     */
    socketId(): string;
    /**
     * Register 3rd party request interceptiors. These are used to automatically
     * send a connections socket id to a Laravel app with a X-Socket-Id header.
     */
    registerInterceptors(): void;
    /**
     * Register a Vue HTTP interceptor to add the X-Socket-ID header.
     */
    registerVueRequestInterceptor(): void;
    /**
     * Register an Axios HTTP interceptor to add the X-Socket-ID header.
     */
    registerAxiosRequestInterceptor(): void;
    /**
     * Register jQuery AjaxPrefilter to add the X-Socket-ID header.
     */
    registerjQueryAjaxSetup(): void;
    /**
     * Register the Turbo Request interceptor to add the X-Socket-ID header.
     */
    registerTurboRequestInterceptor(): void;
}
/**
 * Export channel classes for TypeScript.
 */
export { Connector, Channel, PresenceChannel };
export { EventFormatter } from './util';
