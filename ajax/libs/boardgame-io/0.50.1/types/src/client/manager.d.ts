import type { _ClientImpl } from './client';
declare type SubscriptionState = {
    client: _ClientImpl;
    debuggableClients: _ClientImpl[];
};
declare type SubscribeCallback = (arg: SubscriptionState) => void;
declare type UnsubscribeCallback = () => void;
/**
 * Class to manage boardgame.io clients and limit debug panel rendering.
 */
export declare class ClientManager {
    private debugPanel;
    private currentClient;
    private clients;
    private subscribers;
    constructor();
    /**
     * Register a client with the client manager.
     */
    register(client: _ClientImpl): void;
    /**
     * Unregister a client from the client manager.
     */
    unregister(client: _ClientImpl): void;
    /**
     * Subscribe to the client manager state.
     * Calls the passed callback each time the current client changes or a client
     * registers/unregisters.
     * Returns a function to unsubscribe from the state updates.
     */
    subscribe(callback: SubscribeCallback): UnsubscribeCallback;
    /**
     * Switch to a client with a matching playerID.
     */
    switchPlayerID(playerID: string): void;
    /**
     * Set the passed client as the active client for debugging.
     */
    switchToClient(client: _ClientImpl): void;
    /**
     * Notify all subscribers of changes to the client manager state.
     */
    private notifySubscribers;
    /**
     * Get the client manager state.
     */
    private getState;
    /**
     * Get an array of the registered clients that haven’t disabled the debug panel.
     */
    private getDebuggableClients;
    /**
     * Mount the debug panel using the passed client.
     */
    private mountDebug;
    /**
     * Unmount the debug panel.
     */
    private unmountDebug;
}
export {};
