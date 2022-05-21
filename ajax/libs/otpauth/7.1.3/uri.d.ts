/**
 * HOTP/TOTP object/string conversion.
 * {@link https://github.com/google/google-authenticator/wiki/Key-Uri-Format|Key URI Format}
 */
export class URI {
    /**
     * Parses a Google Authenticator key URI and returns an HOTP/TOTP object.
     * @param {string} uri Google Authenticator Key URI.
     * @returns {HOTP|TOTP} HOTP/TOTP object.
     */
    static parse(uri: string): HOTP | TOTP;
    /**
     * Converts an HOTP/TOTP object to a Google Authenticator key URI.
     * @param {HOTP|TOTP} otp HOTP/TOTP object.
     * @returns {string} Google Authenticator Key URI.
     */
    static stringify(otp: HOTP | TOTP): string;
}
import { HOTP } from "./hotp.js";
import { TOTP } from "./totp.js";
