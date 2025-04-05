import { Channel, NullChannel, NullEncryptedPrivateChannel, NullPresenceChannel, NullPrivateChannel, PresenceChannel, PusherChannel, PusherEncryptedPrivateChannel, PusherPresenceChannel, PusherPrivateChannel, SocketIoChannel, SocketIoPresenceChannel, SocketIoPrivateChannel } from './channel';
import { Connector, PusherConnector, SocketIoConnector, NullConnector } from './connector';
/**
 * This class is the primary API for interacting with broadcasting.
 */
export default class Echo<T extends keyof Broadcaster> {
    /**
     * The broadcasting connector.
     */
    connector: Broadcaster[T]['connector'];
    /**
     * The Echo options.
     */
    options: EchoOptions<T>;
    /**
     * Create a new class instance.
     */
    constructor(options: EchoOptions<T>);
    /**
     * Get a channel instance by name.
     */
    channel(channel: string): Broadcaster[T]['public'];
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
    join(channel: string): Broadcaster[T]['presence'];
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
    listen(channel: string, event: string, callback: Function): Broadcaster[T]['public'];
    /**
     * Get a private channel instance by name.
     */
    private(channel: string): Broadcaster[T]['private'];
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivate(channel: string): Broadcaster[T]['encrypted'];
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
/**
 * Specifies the broadcaster
 */
declare type Broadcaster = {
    reverb: {
        connector: PusherConnector;
        public: PusherChannel;
        private: PusherPrivateChannel;
        encrypted: PusherEncryptedPrivateChannel;
        presence: PusherPresenceChannel;
    };
    pusher: {
        connector: PusherConnector;
        public: PusherChannel;
        private: PusherPrivateChannel;
        encrypted: PusherEncryptedPrivateChannel;
        presence: PusherPresenceChannel;
    };
    'socket.io': {
        connector: SocketIoConnector;
        public: SocketIoChannel;
        private: SocketIoPrivateChannel;
        encrypted: never;
        presence: SocketIoPresenceChannel;
    };
    null: {
        connector: NullConnector;
        public: NullChannel;
        private: NullPrivateChannel;
        encrypted: NullEncryptedPrivateChannel;
        presence: NullPresenceChannel;
    };
    function: {
        connector: any;
        public: any;
        private: any;
        encrypted: any;
        presence: any;
    };
};
declare type Constructor<T = {}> = new (...args: any[]) => T;
declare type EchoOptions<T extends keyof Broadcaster> = {
    /**
     * The broadcast connector.
     */
    broadcaster: T extends 'function' ? Constructor<InstanceType<Broadcaster[T]['connector']>> : T;
    [key: string]: any;
};
