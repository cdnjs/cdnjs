import { NullChannel } from './null-channel';
/**
 * This class represents a null private channel.
 */
export declare class NullEncryptedPrivateChannel extends NullChannel {
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(_eventName: string, _data: Record<any, any>): this;
}
