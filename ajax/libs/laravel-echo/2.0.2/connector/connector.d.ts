import type { Channel, PresenceChannel } from '../channel';
import type { BroadcastDriver, EchoOptions } from '../echo';
export type EchoOptionsWithDefaults<TBroadcaster extends BroadcastDriver> = {
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
