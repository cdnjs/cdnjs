import { Connector } from './connector';
import { NullChannel, NullPrivateChannel, NullPresenceChannel, NullEncryptedPrivateChannel } from '../channel';
/**
 * This class creates a null connector.
 */
export declare class NullConnector extends Connector<'null', NullChannel, NullPrivateChannel, NullPresenceChannel> {
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
