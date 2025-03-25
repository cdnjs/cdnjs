import { NullChannel } from './null-channel';
/**
 * This class represents a null private channel.
 */
export declare class NullEncryptedPrivateChannel extends NullChannel {
    /**
     * Send a whisper event to other clients in the channel.
     */
    whisper(eventName: string, data: any): this;
}
