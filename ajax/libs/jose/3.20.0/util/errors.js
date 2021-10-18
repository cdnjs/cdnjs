export class JOSEError extends Error {
    constructor(message) {
        var _a;
        super(message);
        this.code = JOSEError.code;
        this.name = this.constructor.name;
        (_a = Error.captureStackTrace) === null || _a === void 0 ? void 0 : _a.call(Error, this, this.constructor);
    }
}
JOSEError.code = 'ERR_JOSE_GENERIC';
export class JWTClaimValidationFailed extends JOSEError {
    constructor(message, claim = 'unspecified', reason = 'unspecified') {
        super(message);
        this.code = JWTClaimValidationFailed.code;
        this.claim = claim;
        this.reason = reason;
    }
}
JWTClaimValidationFailed.code = 'ERR_JWT_CLAIM_VALIDATION_FAILED';
export class JOSEAlgNotAllowed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JOSEAlgNotAllowed.code;
    }
}
JOSEAlgNotAllowed.code = 'ERR_JOSE_ALG_NOT_ALLOWED';
export class JOSENotSupported extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JOSENotSupported.code;
    }
}
JOSENotSupported.code = 'ERR_JOSE_NOT_SUPPORTED';
export class JWEDecryptionFailed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWEDecryptionFailed.code;
        this.message = 'decryption operation failed';
    }
}
JWEDecryptionFailed.code = 'ERR_JWE_DECRYPTION_FAILED';
export class JWEInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWEInvalid.code;
    }
}
JWEInvalid.code = 'ERR_JWE_INVALID';
export class JWSInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWSInvalid.code;
    }
}
JWSInvalid.code = 'ERR_JWS_INVALID';
export class JWTInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWTInvalid.code;
    }
}
JWTInvalid.code = 'ERR_JWT_INVALID';
export class JWKInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWKInvalid.code;
    }
}
JWKInvalid.code = 'ERR_JWK_INVALID';
export class JWKSInvalid extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWKSInvalid.code;
    }
}
JWKSInvalid.code = 'ERR_JWKS_INVALID';
export class JWKSNoMatchingKey extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWKSNoMatchingKey.code;
        this.message = 'no applicable key found in the JSON Web Key Set';
    }
}
JWKSNoMatchingKey.code = 'ERR_JWKS_NO_MATCHING_KEY';
export class JWKSMultipleMatchingKeys extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWKSMultipleMatchingKeys.code;
        this.message = 'multiple matching keys found in the JSON Web Key Set';
    }
}
JWKSMultipleMatchingKeys.code = 'ERR_JWKS_MULTIPLE_MATCHING_KEYS';
export class JWKSTimeout extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWKSTimeout.code;
        this.message = 'request timed out';
    }
}
JWKSTimeout.code = 'ERR_JWKS_TIMEOUT';
export class JWSSignatureVerificationFailed extends JOSEError {
    constructor() {
        super(...arguments);
        this.code = JWSSignatureVerificationFailed.code;
        this.message = 'signature verification failed';
    }
}
JWSSignatureVerificationFailed.code = 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED';
export class JWTExpired extends JWTClaimValidationFailed {
    constructor() {
        super(...arguments);
        this.code = JWTExpired.code;
    }
}
JWTExpired.code = 'ERR_JWT_EXPIRED';
