import { Channel } from './channel';
/**
 * This interface represents a presence channel.
 */
export interface PresenceChannel extends Channel {
    /**
     * Register a callback to be called anytime the member list changes.
     */
    here(callback: Function): PresenceChannel;
    /**
     * Listen for someone joining the channel.
     */
    joining(callback: Function): PresenceChannel;
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: any): PresenceChannel;
    /**
     * Listen for someone leaving the channel.
     */
    leaving(callback: Function): PresenceChannel;
}
