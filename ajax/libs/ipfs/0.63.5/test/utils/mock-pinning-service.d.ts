export class PinningService {
    /**
     * @param {object} options
     * @param {number} [options.port]
     * @param {string|null} [options.token]
     * @returns {Promise<PinningService>}
     */
    static start({ port, token }?: {
        port?: number | undefined;
        token?: string | null | undefined;
    }): Promise<PinningService>;
    /**
     * @param {PinningService} service
     * @returns {Promise<void>}
     */
    static stop(service: PinningService): Promise<void>;
    /**
     * @param {object} config
     * @param {any} config.server
     * @param {string} config.host
     * @param {number} config.port
     * @param {any} config.token
     */
    constructor({ server, host, port, token }: {
        server: any;
        host: string;
        port: number;
        token: any;
    });
    server: any;
    host: string;
    port: number;
    token: any;
    get endpoint(): string;
}
//# sourceMappingURL=mock-pinning-service.d.ts.map