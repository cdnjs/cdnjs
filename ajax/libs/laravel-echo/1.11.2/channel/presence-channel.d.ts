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
     * Listen for someone leaving the channel.
     */
    leaving(callback: Function): PresenceChannel;
}
