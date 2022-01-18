import type { Server, PlayerID } from '../types';
/**
 * Verifies that a match has metadata and is using credentials.
 */
export declare const doesMatchRequireAuthentication: (matchData?: Server.MatchData) => boolean;
/**
 * The default `authenticateCredentials` method.
 * Verifies that the provided credentials match the player’s metadata.
 */
export declare const areCredentialsAuthentic: Server.AuthenticateCredentials;
/**
 * Extracts a player’s metadata from the match data object.
 */
export declare const extractPlayerMetadata: (matchData: Server.MatchData, playerID: PlayerID) => Server.PlayerMetadata;
/**
 * Class that provides authentication methods to the lobby server & transport.
 */
export declare class Auth {
    private readonly shouldAuthenticate;
    private readonly authenticate;
    /**
     * Generate credentials string from the Koa context.
     */
    readonly generateCredentials: Server.GenerateCredentials;
    constructor(opts?: {
        authenticateCredentials?: Server.AuthenticateCredentials;
        generateCredentials?: Server.GenerateCredentials;
    });
    /**
     * Resolves to true if the provided credentials are valid for the given
     * metadata and player IDs, or if the match does not require authentication.
     */
    authenticateCredentials({ playerID, credentials, metadata, }: {
        playerID: string;
        credentials: string | undefined;
        metadata: Server.MatchData;
    }): boolean | Promise<boolean>;
}
