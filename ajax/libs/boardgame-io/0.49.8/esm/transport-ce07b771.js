/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
class Transport {
    constructor({ transportDataCallback, gameName, playerID, matchID, credentials, numPlayers, }) {
        /** Callback to let the client know when the connection status has changed. */
        this.connectionStatusCallback = () => { };
        this.isConnected = false;
        this.transportDataCallback = transportDataCallback;
        this.gameName = gameName || 'default';
        this.playerID = playerID || null;
        this.matchID = matchID || 'default';
        this.credentials = credentials;
        this.numPlayers = numPlayers || 2;
    }
    /** Subscribe to connection state changes. */
    subscribeToConnectionStatus(fn) {
        this.connectionStatusCallback = fn;
    }
    /** Transport implementations should call this when they connect/disconnect. */
    setConnectionStatus(isConnected) {
        this.isConnected = isConnected;
        this.connectionStatusCallback();
    }
    /** Transport implementations should call this when they receive data from a master. */
    notifyClient(data) {
        this.transportDataCallback(data);
    }
}

export { Transport as T };
