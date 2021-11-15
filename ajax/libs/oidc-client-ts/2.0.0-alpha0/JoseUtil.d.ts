export declare class JoseUtil {
    static parseJwt(jwt: any): {
        header: {
            alg: string;
            typ: string;
        };
        payload: object | undefined;
    } | null;
    static validateJwt(jwt: any, key: any, issuer: string, audience: string, clockSkew: number, now?: number, timeInsensitive?: boolean): Promise<any>;
    static validateJwtAttributes(jwt: any, issuer: string, audience: string, clockSkew: number, now?: number, timeInsensitive?: boolean): Promise<any>;
    static _validateJwt(jwt: any, key: string, issuer: string, audience: string, clockSkew: number, now?: number, timeInsensitive?: boolean): Promise<any>;
    static hashString(value: any, alg: string): string;
    static hexToBase64Url(value: string): string;
}
