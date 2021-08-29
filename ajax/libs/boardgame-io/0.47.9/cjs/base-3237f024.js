'use strict';

var Type;
(function (Type) {
    Type[Type["SYNC"] = 0] = "SYNC";
    Type[Type["ASYNC"] = 1] = "ASYNC";
})(Type || (Type = {}));
/**
 * Type guard that checks if a storage implementation is synchronous.
 */
function isSynchronous(storageAPI) {
    return storageAPI.type() === Type.SYNC;
}
class Async {
    /* istanbul ignore next */
    type() {
        /* istanbul ignore next */
        return Type.ASYNC;
    }
    /**
     * Create a new match.
     *
     * This might just need to call setState and setMetadata in
     * most implementations.
     *
     * However, it exists as a separate call so that the
     * implementation can provision things differently when
     * a match is created.  For example, it might stow away the
     * initial match state in a separate field for easier retrieval.
     */
    /* istanbul ignore next */
    async createMatch(matchID, opts) {
        if (this.createGame) {
            console.warn('The database connector does not implement a createMatch method.', '\nUsing the deprecated createGame method instead.');
            return this.createGame(matchID, opts);
        }
        else {
            console.error('The database connector does not implement a createMatch method.');
        }
    }
    /**
     * Return all matches.
     */
    /* istanbul ignore next */
    async listMatches(opts) {
        if (this.listGames) {
            console.warn('The database connector does not implement a listMatches method.', '\nUsing the deprecated listGames method instead.');
            return this.listGames(opts);
        }
        else {
            console.error('The database connector does not implement a listMatches method.');
        }
    }
}
class Sync {
    type() {
        return Type.SYNC;
    }
    /**
     * Connect.
     */
    connect() {
        return;
    }
    /**
     * Create a new match.
     *
     * This might just need to call setState and setMetadata in
     * most implementations.
     *
     * However, it exists as a separate call so that the
     * implementation can provision things differently when
     * a match is created.  For example, it might stow away the
     * initial match state in a separate field for easier retrieval.
     */
    /* istanbul ignore next */
    createMatch(matchID, opts) {
        if (this.createGame) {
            console.warn('The database connector does not implement a createMatch method.', '\nUsing the deprecated createGame method instead.');
            return this.createGame(matchID, opts);
        }
        else {
            console.error('The database connector does not implement a createMatch method.');
        }
    }
    /**
     * Return all matches.
     */
    /* istanbul ignore next */
    listMatches(opts) {
        if (this.listGames) {
            console.warn('The database connector does not implement a listMatches method.', '\nUsing the deprecated listGames method instead.');
            return this.listGames(opts);
        }
        else {
            console.error('The database connector does not implement a listMatches method.');
        }
    }
}

exports.Async = Async;
exports.Sync = Sync;
exports.isSynchronous = isSynchronous;
