import { Connector } from './connector';
import { NullChannel, NullPrivateChannel, PresenceChannel } from './../channel';
/**
 * This class creates a null connector.
 */
export declare class NullConnector extends Connector {
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
    listen(name: string, event: string, callback: Function): NullChannel;
    /**
     * Get a channel instance by name.
     */
    channel(name: string): NullChannel;
    /**
     * Get a private channel instance by name.
     */
    privateChannel(name: string): NullPrivateChannel;
    /**
     * Get a private encrypted channel instance by name.
     */
    encryptedPrivateChannel(name: string): NullPrivateChannel;
    /**
     * Get a presence channel instance by name.
     */
    presenceChannel(name: string): PresenceChannel;
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
     * Disconnect the connection.
     */
    disconnect(): void;
}
