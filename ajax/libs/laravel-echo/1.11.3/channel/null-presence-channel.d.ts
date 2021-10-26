import { NullChannel } from './null-channel';
import { PresenceChannel } from './presence-channel';
/**
 * This class represents a null presence channel.
 */
export declare class NullPresenceChannel extends NullChannel implements PresenceChannel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: Function): NullPresenceChannel;
    /**
     * Listen for someone joining the channel.
     */
    joining(callback: Function): NullPresenceChannel;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: Function): NullPresenceChannel;
    /**
     * Trigger client event on the channel.
     */
    whisper(eventName: string, data: any): NullPresenceChannel;
}
