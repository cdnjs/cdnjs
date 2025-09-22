import { Channel as Channel_2 } from 'pusher-js';
import { default as default_2 } from 'pusher-js';
import { io } from 'socket.io-client';
import { Options } from 'pusher-js';
import { Socket } from 'socket.io-client';

declare type AnyPusherChannel = PusherChannel<BroadcastDriver> | PusherPrivateChannel<BroadcastDriver> | PusherEncryptedPrivateChannel<BroadcastDriver> | PusherPresenceChannel<BroadcastDriver>;

declare type AnySocketIoChannel = SocketIoChannel | SocketIoPrivateChannel | SocketIoPresenceChannel;

export declare type BroadcastDriver = Exclude<keyof Broadcaster, "function">;

/**
 * Specifies the broadcaster
 */
export declare type Broadcaster = {
    reverb: {
        connector: PusherConnector<"reverb">;
        public: PusherChannel<"reverb">;
        private: PusherPrivateChannel<"reverb">;
        encrypted: PusherEncryptedPrivateChannel<"reverb">;
        presence: PusherPresenceChannel<"reverb">;
        options: GenericOptions<"reverb"> & Partial<CustomOmit<PusherOptions<"reverb">, "cluster">>;
    };
    pusher: {
        connector: PusherConnector<"pusher">;
        public: PusherChannel<"pusher">;
        private: PusherPrivateChannel<"pusher">;
        encrypted: PusherEncryptedPrivateChannel<"pusher">;
        presence: PusherPresenceChannel<"pusher">;
        options: GenericOptions<"pusher"> & Partial<PusherOptions<"pusher">>;
    };
    ably: {
        connector: PusherConnector<"pusher">;
        public: PusherChannel<"pusher">;
        private: PusherPrivateChannel<"pusher">;
        encrypted: PusherEncryptedPrivateChannel<"pusher">;
        presence: PusherPresenceChannel<"pusher">;
        options: GenericOptions<"ably"> & Partial<PusherOptions<"ably">>;
    };
    "socket.io": {
        connector: SocketIoConnector;
        public: SocketIoChannel;
        private: SocketIoPrivateChannel;
        encrypted: never;
        presence: SocketIoPresenceChannel;
        options: GenericOptions<"socket.io">;
    };
    null: {
        connector: NullConnector;
        public: NullChannel;
        private: NullPrivateChannel;
        encrypted: NullEncryptedPrivateChannel;
        presence: NullPresenceChannel;
        options: GenericOptions<"null">;
    };
    function: {
        connector: any;
        public: any;
        private: any;
        encrypted: any;
        presence: any;
        options: GenericOptions<"function">;
    };
};

/**
 * This class represents a basic channel.
 */
export declare abstract class Channel {
    /**
     * The Echo options.
     */
    options: EchoOptionsWithDefaults<BroadcastDriver>;
    /**
     * Listen for an event on the channel instance.
     */
    abstract listen(event: string, callback: CallableFunction): this;
    /**
     * Listen for a whisper event on the channel instance.
     */
    listenForWhisper(event: string, callback: CallableFunction): this;
    /**
     * Listen for an event on the channel instance.
     */
    notification(callback: CallableFunction): this;
    /**
     * Stop listening to an event on the channel instance.
     */
    abstract stopListening(event: string, callback?: CallableFunction): this;
    /**
     * Stop listening for a whisper event on the channel instance.
     */
    stopListeningForWhisper(event: string, callback?: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    abstract subscribed(callback: CallableFunction): this;
    /**
     * Register a callback to be called anytime an error occurs.
     */
    abstract error(callback: CallableFunction): this;
}

export declare abstract class Connector<TBroadcastDriver extends BroadcastDriver, TPublic extends Channel, TPrivate extends Channel, TPresence extends PresenceChannel> {
    /**
     * Default connector options.
     */
    static readonly _defaultOptions: {
        readonly auth: {
            readonly headers: {};
        };
        readonly authEndpoint: "/broadcasting/auth";
        readonly userAuthentication: {
            readonly endpoint: "/broadcasting/user-auth";
            readonly headers: {};
        };
        readonly csrfToken: null;
        readonly bearerToken: null;
        readonly host: null;
        readonly key: null;
        readonly namespace: "App.Events";
    };
    /**
     * Connector options.
     */
    options: EchoOptionsWithDefaults<TBroadcastDriver>;
    /**
     * Create a new class instance.
     */
    constructor(options: EchoOptions<TBroadcastDriver>);
    /**
     * Merge the custom options with the defaults.
     */
    protected setOptions(options: EchoOptions<TBroadcastDriver>): void;
    /**
     * Extract the CSRF token from the page.
     */
    protected csrfToken(): null | string;
    /**
     * Create a fresh connection.
     */
    abstract connect(): void;
    /**
     * Get a channel instance by name.
     */
    abstract channel(channel: string): TPublic;
    /**
     * Get a private channel instance by name.
     */
    abstract privateChannel(channel: string): TPrivate;
    /**
     * Get a presence channel instance by name.
     */
    abstract presenceChannel(channel: string): TPresence;
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    abstract leave(channel: string): void;
    /**
     * Leave the given channel.
     */
    abstract leaveChannel(channel: string): void;
    /**
     * Get the socket_id of the connection.
     */
    abstract socketId(): string | undefined;
    /**
     * Disconnect from the Echo server.
     */
    abstract disconnect(): void;
}

declare type Constructor<T = {}> = new (...args: any[]) => T;

declare type CustomOmit<T, K extends PropertyKey> = {
    [P in keyof T as Exclude<P, K>]: T[P];
};

/**
 * This class is the primary API for interacting with broadcasting.
 */
declare class Echo<T extends keyof Broadcaster> {
    /**
     * The broadcasting connector.
     */
    connector: Broadcaster[Exclude<T, "function">]["connector"];
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
    channel(channel: string): Broadcaster[T]["public"];
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
    join(channel: string): Broadcaster[T]["presence"];
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
    listen(channel: string, event: string, callback: CallableFunction): Broadcaster[T]["public"];
    /**
     * Get a private channel instance by name.
     */
    private(channel: string): Broadcaster[T]["private"];
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivate(channel: string): Broadcaster[T]["encrypted"];
    private connectorSupportsEncryptedPrivateChannels;
    /**
     * Get the Socket ID for the connection.
     */
    socketId(): string | undefined;
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
export default Echo;

export declare type EchoOptions<TBroadcaster extends keyof Broadcaster> = Broadcaster[TBroadcaster]["options"];

declare type EchoOptionsWithDefaults<TBroadcaster extends BroadcastDriver> = {
    broadcaster: TBroadcaster;
    auth: {
        headers: Record<string, string>;
    };
    authEndpoint: string;
    userAuthentication: {
        endpoint: string;
        headers: Record<string, string>;
    };
    csrfToken: string | null;
    bearerToken: string | null;
    host: string | null;
    key: string | null;
    namespace: string | false;
    [key: string]: any;
};

/**
 * Event name formatter
 */
export declare class EventFormatter {
    private namespace;
    /**
     * Create a new class instance.
     */
    constructor(namespace: string | boolean | undefined);
    /**
     * Format the given event name.
     */
    format(event: string): string;
    /**
     * Set the event namespace.
     */
    setNamespace(value: string | boolean): void;
}

declare type GenericOptions<TBroadcaster extends keyof Broadcaster> = {
    /**
     * The broadcast connector.
     */
    broadcaster: TBroadcaster extends "function" ? Constructor<InstanceType<Broadcaster[TBroadcaster]["connector"]>> : TBroadcaster;
    auth?: {
        headers: Record<string, string>;
    };
    authEndpoint?: string;
    userAuthentication?: {
        endpoint: string;
        headers: Record<string, string>;
    };
    csrfToken?: string | null;
    bearerToken?: string | null;
    host?: string | null;
    key?: string | null;
    namespace?: string | false;
    withoutInterceptors?: boolean;
    [key: string]: any;
};

/**
 * This class represents a null channel.
 */
declare class NullChannel extends Channel {
    /**
     * Subscribe to a channel.
     */
    subscribe(): void;
    /**
     * Unsubscribe from a channel.
     */
    unsubscribe(): void;
    /**
     * Listen for an event on the channel instance.
     */
    listen(_event: string, _callback: CallableFunction): this;
    /**
     * Listen for all events on the channel instance.
     */
    listenToAll(_callback: CallableFunction): this;
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(_event: string, _callback?: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    subscribed(_callback: CallableFunction): this;
    /**
     * Register a callback to be called anytime an error occurs.
     */
    error(_callback: CallableFunction): this;
    /**
     * Bind a channel to an event.
     */
    on(_event: string, _callback: CallableFunction): this;
}

/**
 * This class creates a null connector.
 */
declare class NullConnector extends Connector<"null", NullChannel, NullPrivateChannel, NullPresenceChannel> {
    /**
     * All of the subscribed channel names.
     */
    channels: any;
    /**
     * Create a fresh connection.
     */
    connect(): void;
    /**
     * Listen for an event on a channel instance.
     */
    listen(_name: string, _event: string, _callback: CallableFunction): NullChannel;
    /**
     * Get a channel instance by name.
     */
    channel(_name: string): NullChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(_name: string): NullPrivateChannel;
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivateChannel(_name: string): NullEncryptedPrivateChannel;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(_name: string): NullPresenceChannel;
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(_name: string): void;
    /**
     * Leave the given channel.
     */
    leaveChannel(_name: string): void;
    /**
     * Get the socket ID for the connection.
     */
    socketId(): string;
    /**
     * Disconnect the connection.
     */
    disconnect(): void;
}

/**
 * This class represents a null private channel.
 */
declare class NullEncryptedPrivateChannel extends NullChannel {
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(_eventName: string, _data: Record<any, any>): this;
}

/**
 * This class represents a null presence channel.
 */
declare class NullPresenceChannel extends NullPrivateChannel implements PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(_callback: CallableFunction): this;
    /**
     * Listen for someone joining the channel.
     */
    joining(_callback: CallableFunction): this;
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(_eventName: string, _data: Record<any, any>): this;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(_callback: CallableFunction): this;
}

/**
 * This class represents a null private channel.
 */
declare class NullPrivateChannel extends NullChannel {
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(_eventName: string, _data: Record<any, any>): this;
}

/**
 * This interface represents a presence channel.
 */
export declare interface PresenceChannel extends Channel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: CallableFunction): this;
    /**
     * Listen for someone joining the channel.
     */
    joining(callback: CallableFunction): this;
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: Record<any, any>): this;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: CallableFunction): this;
}

/**
 * This class represents a Pusher channel.
 */
declare class PusherChannel<TBroadcastDriver extends BroadcastDriver> extends Channel {
    /**
     * The Pusher client instance.
     */
    pusher: default_2;
    /**
     * The name of the channel.
     */
    name: string;
    /**
     * The event formatter.
     */
    eventFormatter: EventFormatter;
    /**
     * The subscription of the channel.
     */
    subscription: Channel_2;
    /**
     * Create a new class instance.
     */
    constructor(pusher: default_2, name: string, options: EchoOptionsWithDefaults<TBroadcastDriver>);
    /**
     * Subscribe to a Pusher channel.
     */
    subscribe(): void;
    /**
     * Unsubscribe from a Pusher channel.
     */
    unsubscribe(): void;
    /**
     * Listen for an event on the channel instance.
     */
    listen(event: string, callback: CallableFunction): this;
    /**
     * Listen for all events on the channel instance.
     */
    listenToAll(callback: CallableFunction): this;
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event: string, callback?: CallableFunction): this;
    /**
     * Stop listening for all events on the channel instance.
     */
    stopListeningToAll(callback?: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    subscribed(callback: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription error occurs.
     */
    error(callback: CallableFunction): this;
    /**
     * Bind a channel to an event.
     */
    on(event: string, callback: CallableFunction): this;
}

/**
 * This class creates a connector to Pusher.
 */
declare class PusherConnector<TBroadcastDriver extends BroadcastDriver> extends Connector<TBroadcastDriver, PusherChannel<TBroadcastDriver>, PusherPrivateChannel<TBroadcastDriver>, PusherPresenceChannel<TBroadcastDriver>> {
    /**
     * The Pusher instance.
     */
    pusher: default_2;
    /**
     * All of the subscribed channel names.
     */
    channels: Record<string, AnyPusherChannel>;
    options: PusherOptions<TBroadcastDriver>;
    /**
     * Create a fresh Pusher connection.
     */
    connect(): void;
    /**
     * Sign in the user via Pusher user authentication (https://pusher.com/docs/channels/using_channels/user-authentication/).
     */
    signin(): void;
    /**
     * Listen for an event on a channel instance.
     */
    listen(name: string, event: string, callback: CallableFunction): AnyPusherChannel;
    /**
     * Get a channel instance by name.
     */
    channel(name: string): AnyPusherChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name: string): PusherPrivateChannel<TBroadcastDriver>;
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivateChannel(name: string): PusherEncryptedPrivateChannel<TBroadcastDriver>;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name: string): PusherPresenceChannel<TBroadcastDriver>;
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(name: string): void;
    /**
     * Leave the given channel.
     */
    leaveChannel(name: string): void;
    /**
     * Get the socket ID for the connection.
     */
    socketId(): string;
    /**
     * Disconnect Pusher connection.
     */
    disconnect(): void;
}

/**
 * This class represents a Pusher private channel.
 */
declare class PusherEncryptedPrivateChannel<TBroadcastDriver extends BroadcastDriver> extends PusherChannel<TBroadcastDriver> {
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: Record<any, any>): this;
}

declare type PusherOptions<TBroadcastDriver extends BroadcastDriver> = EchoOptionsWithDefaults<TBroadcastDriver> & {
    key: string;
    Pusher?: typeof default_2;
} & Options;

/**
 * This class represents a Pusher presence channel.
 */
declare class PusherPresenceChannel<TBroadcastDriver extends BroadcastDriver> extends PusherPrivateChannel<TBroadcastDriver> implements PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: CallableFunction): this;
    /**
     * Listen for someone joining the channel.
     */
    joining(callback: CallableFunction): this;
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: Record<any, any>): this;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: CallableFunction): this;
}

/**
 * This class represents a Pusher private channel.
 */
declare class PusherPrivateChannel<TBroadcastDriver extends BroadcastDriver> extends PusherChannel<TBroadcastDriver> {
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: Record<any, any>): this;
}

/**
 * This class represents a Socket.io channel.
 */
declare class SocketIoChannel extends Channel {
    /**
     * The Socket.io client instance.
     */
    socket: Socket;
    /**
     * The name of the channel.
     */
    name: string;
    /**
     * The event formatter.
     */
    eventFormatter: EventFormatter;
    /**
     * The event callbacks applied to the socket.
     */
    events: Record<string, any>;
    /**
     * User supplied callbacks for events on this channel.
     */
    private listeners;
    /**
     * Create a new class instance.
     */
    constructor(socket: Socket, name: string, options: EchoOptionsWithDefaults<BroadcastDriver>);
    /**
     * Subscribe to a Socket.io channel.
     */
    subscribe(): void;
    /**
     * Unsubscribe from channel and ubind event callbacks.
     */
    unsubscribe(): void;
    /**
     * Listen for an event on the channel instance.
     */
    listen(event: string, callback: CallableFunction): this;
    /**
     * Stop listening for an event on the channel instance.
     */
    stopListening(event: string, callback?: CallableFunction): this;
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
    subscribed(callback: CallableFunction): this;
    /**
     * Register a callback to be called anytime an error occurs.
     */
    error(_callback: CallableFunction): this;
    /**
     * Bind the channel's socket to an event and store the callback.
     */
    on(event: string, callback: CallableFunction): this;
    /**
     * Unbind the channel's socket from all stored event callbacks.
     */
    unbind(): void;
    /**
     * Unbind the listeners for the given event.
     */
    protected unbindEvent(event: string, callback?: CallableFunction): void;
}

/**
 * This class creates a connector to a Socket.io server.
 */
declare class SocketIoConnector extends Connector<"socket.io", SocketIoChannel, SocketIoPrivateChannel, SocketIoPresenceChannel> {
    /**
     * The Socket.io connection instance.
     */
    socket: Socket;
    /**
     * All of the subscribed channel names.
     */
    channels: {
        [name: string]: SocketIoChannel;
    };
    /**
     * Create a fresh Socket.io connection.
     */
    connect(): void;
    /**
     * Get socket.io module from global scope or options.
     */
    getSocketIO(): typeof io;
    /**
     * Listen for an event on a channel instance.
     */
    listen(name: string, event: string, callback: CallableFunction): AnySocketIoChannel;
    /**
     * Get a channel instance by name.
     */
    channel(name: string): AnySocketIoChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name: string): SocketIoPrivateChannel;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name: string): SocketIoPresenceChannel;
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
    leave(name: string): void;
    /**
     * Leave the given channel.
     */
    leaveChannel(name: string): void;
    /**
     * Get the socket ID for the connection.
     */
    socketId(): string | undefined;
    /**
     * Disconnect Socketio connection.
     */
    disconnect(): void;
}

/**
 * This class represents a Socket.io presence channel.
 */
declare class SocketIoPresenceChannel extends SocketIoPrivateChannel implements PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: CallableFunction): this;
    /**
     * Listen for someone joining the channel.
     */
    joining(callback: CallableFunction): this;
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: unknown): this;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: CallableFunction): this;
}

/**
 * This class represents a Socket.io private channel.
 */
declare class SocketIoPrivateChannel extends SocketIoChannel {
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: unknown): this;
}

export { }
