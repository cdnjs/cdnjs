import { NullPrivateChannel } from './null-private-channel';
import type { PresenceChannel } from './presence-channel';
/**
 * This class represents a null presence channel.
 */
export declare class NullPresenceChannel extends NullPrivateChannel implements PresenceChannel {
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
