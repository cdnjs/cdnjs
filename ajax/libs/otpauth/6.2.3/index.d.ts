export declare class HOTP {
	constructor(config?: {
		issuer?: string,
		label?: string,
		secret?: Secret | string,
		algorithm?: string,
		digits?: number,
		counter?: number
	});

	issuer: string;
	label: string;
	secret: Secret;
	algorithm: string;
	digits: number;
	counter: number;

	static generate(config: {
		secret: Secret,
		algorithm?: string,
		digits?: number,
		counter?: number
	}): string;

	generate(config?: {
		counter?: number
	}): string;

	static validate(config: {
		token: string,
		secret: Secret,
		algorithm?: string,
		digits: number,
		counter?: number,
		window?: number
	}): number | null;

	validate(config: {
		token: string,
		counter?: number,
		window?: number
	}): number | null;

	toString(): string;
}

export declare class TOTP {
	constructor(config?: {
		issuer?: string,
		label?: string,
		secret?: Secret | string,
		algorithm?: string,
		digits?: number,
		period?: number
	});

	issuer: string;
	label: string;
	secret: Secret;
	algorithm: string;
	digits: number;
	period: number;

	static generate(config: {
		secret: Secret,
		algorithm?: string,
		digits?: number,
		period?: number,
		timestamp?: number
	}): string;

	generate(config?: {
		timestamp?: number
	}): string;

	static validate(config: {
		token: string,
		secret: Secret,
		algorithm?: string,
		digits: number,
		period?: number,
		timestamp?: number,
		window?: number
	}): number | null;

	validate(config: {
		token: string,
		timestamp?: number,
		window?: number
	}): number | null;

	toString(): string;
}

export declare class Secret {
	constructor(config?: {
		buffer?: ArrayBuffer,
		size?: number
	});

	buffer: ArrayBuffer;
	raw: string;
	b32: string;
	hex: string;

	static fromRaw(str: string): Secret;

	static fromB32(str: string): Secret;

	static fromHex(str: string): Secret;
}

export declare class URI {
	static parse(uri: string): HOTP | TOTP;

	static stringify(otp: HOTP | TOTP): string;
}

export declare const Utils: {
	uint: {
		fromBuf(buf: ArrayBuffer): number,
		toBuf(num: number): ArrayBuffer
	},
	raw: {
		fromBuf(buf: ArrayBuffer): string,
		toBuf(str: string): ArrayBuffer
	},
	b32: {
		alphabet: string,
		fromBuf(buf: ArrayBuffer): string,
		toBuf(str: string): ArrayBuffer
	},
	hex: {
		fromBuf(buf: ArrayBuffer): string,
		toBuf(str: string): ArrayBuffer
	},
	pad(num: number | string, digits: number): string
};

export declare const version: string;
