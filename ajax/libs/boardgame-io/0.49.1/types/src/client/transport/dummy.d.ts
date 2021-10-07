import { Transport } from './transport';
import type { TransportOpts } from './transport';
/**
 * This class doesn’t do anything, but simplifies the client class by providing
 * dummy functions to call, so we don’t need to mock them in the client.
 */
declare class DummyImpl extends Transport {
    connect(): void;
    disconnect(): void;
    sendAction(): void;
    sendChatMessage(): void;
    requestSync(): void;
    updateCredentials(): void;
    updateMatchID(): void;
    updatePlayerID(): void;
}
export declare const DummyTransport: (opts: TransportOpts) => DummyImpl;
export {};
