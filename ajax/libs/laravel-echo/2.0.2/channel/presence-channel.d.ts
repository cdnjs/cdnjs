import type { Channel } from './channel';
/**
 * This interface represents a presence channel.
 */
export interface PresenceChannel extends Channel {
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
