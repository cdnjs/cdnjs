declare namespace LZUTF8 {
    type Buffer = any;
	type Worker = any;

    namespace stream {
        type Transform = any;
    }
}

export = LZUTF8

declare namespace LZUTF8 {
    const runningInNodeJS: () => boolean;
    const runningInMainNodeJSModule: () => boolean;
    const commonJSAvailable: () => boolean;
    const runningInWebWorker: () => boolean;
    const runningInNodeChildProcess: () => boolean;
    const runningInNullOrigin: () => boolean;
    const webWorkersAvailable: () => boolean;
    const log: (message: any, appendToDocument?: boolean) => void;
    const createErrorMessage: (exception: any, title?: string) => string;
    const printExceptionAndStackTraceToConsole: (exception: any, title?: string) => void;
    const getGlobalObject: () => any;
    const toString: () => string;
}
declare namespace IE10SubarrayBugPatcher {
}
declare namespace LZUTF8 {
    class AsyncCompressor {
        static compressAsync(input: string | Uint8Array | Buffer, options: CompressionOptions, callback: (result: any, error?: Error) => void): void;
        static createCompressionStream(): stream.Transform;
    }
}
declare namespace LZUTF8 {
    class AsyncDecompressor {
        static decompressAsync(input: any, options: DecompressionOptions, callback: (result: any, error?: Error) => void): void;
        static createDecompressionStream(): stream.Transform;
    }
}
declare namespace LZUTF8 {
    namespace WebWorker {
        let globalWorker: Worker;
        let scriptURI: string | undefined;
        const compressAsync: (input: any, options: CompressionOptions, callback: (result?: Uint8Array | Buffer | string, error?: Error) => void) => void;
        const decompressAsync: (input: string | Uint8Array, options: DecompressionOptions, callback: (result?: string | Uint8Array, error?: Error) => void) => void;
        const installWebWorkerIfNeeded: () => void;
        const createGlobalWorkerIfNeeded: () => boolean;
        const terminate: () => void;
    }
}
declare namespace LZUTF8 {
    class ArraySegment<T> {
        readonly container: IndexableCollection<T>;
        readonly startPosition: number;
        readonly length: number;
        constructor(container: IndexableCollection<T>, startPosition: number, length: number);
        get(index: number): T;
        getInReversedOrder(reverseIndex: number): T;
        set(index: number, value: T): void;
    }
    interface ArraySegmentLocator {
        startPosition: number;
        length: number;
    }
    interface IndexableCollection<T> {
        [index: number]: T;
        length: number;
    }
}
declare namespace LZUTF8 {
    namespace ArrayTools {
        const copyElements: (source: IndexableCollection<any>, sourceIndex: number, destination: IndexableCollection<any>, destinationIndex: number, count: number) => void;
        const zeroElements: (collection: IndexableCollection<any>, index: number, count: number) => void;
        const countNonzeroValuesInArray: (array: IndexableCollection<any>) => number;
        const truncateStartingElements: (array: Array<any>, truncatedLength: number) => void;
        const doubleByteArrayCapacity: (array: Uint8Array) => Uint8Array;
        const concatUint8Arrays: (arrays: Uint8Array[]) => Uint8Array;
        const splitByteArray: (byteArray: Uint8Array, maxPartLength: number) => Uint8Array[];
    }
}
declare namespace LZUTF8 {
    namespace BufferTools {
        const convertToUint8ArrayIfNeeded: (input: any) => any;
        const uint8ArrayToBuffer: (arr: Uint8Array) => Buffer;
        const bufferToUint8Array: (buf: Buffer) => Uint8Array;
    }
}
declare namespace LZUTF8 {
    namespace CompressionCommon {
        const getCroppedBuffer: (buffer: Uint8Array, cropStartOffset: number, cropLength: number, additionalCapacity?: number) => Uint8Array;
        const getCroppedAndAppendedByteArray: (bytes: Uint8Array, cropStartOffset: number, cropLength: number, byteArrayToAppend: Uint8Array) => Uint8Array;
        const detectCompressionSourceEncoding: (input: string | Uint8Array | Buffer) => UncompressedEncoding;
        const encodeCompressedBytes: (compressedBytes: Uint8Array, outputEncoding: CompressedEncoding) => Uint8Array | Buffer | string;
        const decodeCompressedBytes: (compressedData: Uint8Array | Buffer | string, inputEncoding: CompressedEncoding) => Uint8Array;
        const encodeDecompressedBytes: (decompressedBytes: Uint8Array, outputEncoding: DecompressedEncoding) => string | Uint8Array | Buffer;
    }
}
declare namespace LZUTF8 {
    namespace EventLoop {
        const enqueueImmediate: (func: Action) => void;
        const initializeScheduler: () => void;
    }
    var enqueueImmediate: (func: Action) => void;
}
declare namespace LZUTF8 {
    interface Action {
        (): void;
    }
}
declare namespace LZUTF8 {
    namespace ObjectTools {
        const override: <T extends V, V>(obj: T, newPropertyValues: V) => T;
        const extend: <T, V>(obj: T, newProperties: V) => T & V;
    }
}
declare namespace LZUTF8 {
    const getRandomIntegerInRange: (low: number, high: number) => number;
    const getRandomUTF16StringOfLength: (length: number) => string;
}
declare namespace LZUTF8 {
    class StringBuilder {
        private outputBufferCapacity;
        private outputBuffer;
        private outputPosition;
        private outputString;
        constructor(outputBufferCapacity?: number);
        appendCharCode(charCode: number): void;
        appendCharCodes(charCodes: number[]): void;
        appendString(str: string): void;
        appendCodePoint(codePoint: number): void;
        getOutputString(): string;
        private flushBufferToOutputString;
    }
}
declare var chrome: any;
declare namespace LZUTF8 {
    class Timer {
        startTime: number;
        constructor();
        restart(): void;
        getElapsedTime(): number;
        getElapsedTimeAndRestart(): number;
        logAndRestart(title: string, logToDocument?: boolean): number;
        static getTimestamp(): number;
        static getMicrosecondTimestamp(): number;
        private static createGlobalTimestampFunction;
        private static timestampFunc;
    }
}
declare namespace LZUTF8 {
    class Compressor {
        MinimumSequenceLength: number;
        MaximumSequenceLength: number;
        MaximumMatchDistance: number;
        PrefixHashTableSize: number;
        inputBuffer: Uint8Array;
        inputBufferStreamOffset: number;
        outputBuffer: Uint8Array;
        outputBufferPosition: number;
        prefixHashTable: CompressorHashTable;
        constructor(useCustomHashTable?: boolean);
        compressBlock(input: string | Uint8Array | Buffer): Uint8Array;
        private compressUtf8Block;
        private findLongestMatch;
        private getBucketIndexForPrefix;
        private outputPointerBytes;
        private outputRawByte;
        private cropAndAddNewBytesToInputBuffer;
        private reusableArraySegmentObject;
    }
}
declare namespace LZUTF8 {
    class CompressorCustomHashTable implements CompressorHashTable {
        bucketLocators: Uint32Array;
        storage: Uint32Array;
        storageIndex: number;
        minimumBucketCapacity: number;
        maximumBucketCapacity: number;
        constructor(bucketCount: number);
        addValueToBucket(bucketIndex: number, valueToAdd: number): void;
        private truncateBucketToNewerElements;
        private compact;
        getArraySegmentForBucketIndex(bucketIndex: number, outputObject?: ArraySegment<number>): ArraySegment<number> | null;
        getUsedBucketCount(): number;
        getTotalElementCount(): number;
    }
}
declare namespace LZUTF8 {
    interface CompressorHashTable {
        addValueToBucket(bucketIndex: number, valueToAdd: number): void;
        getArraySegmentForBucketIndex(bucketIndex: number, outputObject?: ArraySegment<number>): ArraySegment<number> | null;
        getUsedBucketCount(): number;
        getTotalElementCount(): number;
    }
}
declare namespace LZUTF8 {
    class CompressorSimpleHashTable implements CompressorHashTable {
        buckets: Array<number[]>;
        maximumBucketCapacity: number;
        constructor(size: number);
        addValueToBucket(bucketIndex: number, valueToAdd: number): void;
        getArraySegmentForBucketIndex(bucketIndex: number, outputObject?: ArraySegment<number>): ArraySegment<number> | null;
        getUsedBucketCount(): number;
        getTotalElementCount(): number;
    }
}
declare namespace LZUTF8 {
    class Decompressor {
        MaximumMatchDistance: number;
        outputBuffer: Uint8Array;
        outputPosition: number;
        inputBufferRemainder?: Uint8Array;
        outputBufferRemainder?: Uint8Array;
        decompressBlockToString(input: Uint8Array): string;
        decompressBlock(input: Uint8Array): Uint8Array;
        private outputByte;
        private cropOutputBufferToWindowAndInitialize;
        private rollBackIfOutputBufferEndsWithATruncatedMultibyteSequence;
    }
}
declare namespace LZUTF8 {
    namespace Encoding {
        namespace Base64 {
            const encode: (inputBytes: Uint8Array) => string;
            const decode: (base64String: string) => Uint8Array;
            const encodeWithJS: (inputBytes: Uint8Array, addPadding?: boolean) => string;
            const decodeWithJS: (base64String: string, outputBuffer?: Uint8Array) => Uint8Array;
        }
    }
}
declare namespace LZUTF8 {
    namespace Encoding {
        namespace BinaryString {
            const encode: (input: Uint8Array) => string;
            const decode: (input: string) => Uint8Array;
        }
    }
}
declare namespace LZUTF8 {
    namespace Encoding {
        namespace CodePoint {
            const encodeFromString: (str: string, position: number) => number;
            const decodeToString: (codePoint: number) => string;
        }
    }
}
declare namespace LZUTF8 {
    namespace Encoding {
        namespace DecimalString {
            const encode: (binaryBytes: Uint8Array) => string;
        }
    }
}
declare namespace LZUTF8 {
    namespace Encoding {
        namespace StorageBinaryString {
            const encode: (input: Uint8Array) => string;
            const decode: (input: string) => Uint8Array;
        }
    }
}
declare namespace LZUTF8 {
    namespace Encoding {
        namespace UTF8 {
            const encode: (str: string) => Uint8Array;
            const decode: (utf8Bytes: Uint8Array) => string;
            const encodeWithJS: (str: string, outputArray?: Uint8Array) => Uint8Array;
            const decodeWithJS: (utf8Bytes: Uint8Array, startOffset?: number, endOffset?: number) => string;
            const createNativeTextEncoderAndDecoderIfAvailable: () => boolean;
        }
    }
}
declare namespace LZUTF8 {
    type UncompressedEncoding = "String" | "ByteArray";
    type CompressedEncoding = "ByteArray" | "Buffer" | "Base64" | "BinaryString" | "StorageBinaryString";
    type DecompressedEncoding = "String" | "ByteArray" | "Buffer";
    type CompressionOptions = {
        inputEncoding?: UncompressedEncoding;
        outputEncoding?: CompressedEncoding;
        useWebWorker?: boolean;
        blockSize?: number;
    };
    type DecompressionOptions = {
        inputEncoding?: CompressedEncoding;
        outputEncoding?: DecompressedEncoding;
        useWebWorker?: boolean;
        blockSize?: number;
    };
    function compress(input: string | Uint8Array | Buffer, options?: CompressionOptions): Uint8Array | Buffer | string;
    function decompress(input: Uint8Array | Buffer | string, options?: DecompressionOptions): string | Uint8Array | Buffer;
    function compressAsync(input: string | Uint8Array | Buffer, options: CompressionOptions, callback: (result?: Uint8Array | Buffer | string, error?: Error) => void): void;
    function decompressAsync(input: Uint8Array | Buffer | string, options: DecompressionOptions, callback: (result?: string | Uint8Array | Buffer, error?: Error) => void): void;
    function createCompressionStream(): stream.Transform;
    function createDecompressionStream(): stream.Transform;
    function encodeUTF8(str: string): Uint8Array;
    function decodeUTF8(input: Uint8Array): string;
    function encodeBase64(input: Uint8Array): string;
    function decodeBase64(str: string): Uint8Array;
    function encodeBinaryString(input: Uint8Array): string;
    function decodeBinaryString(str: string): Uint8Array;
    function encodeStorageBinaryString(input: Uint8Array): string;
    function decodeStorageBinaryString(str: string): Uint8Array;
}
