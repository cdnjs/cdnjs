declare module "xxhash-wasm" {
  type Hash<T> = {
    update(input: string | Uint8Array): Hash<T>;
    digest(): T;
  }

  type Exports = {
    h32(input: string, seed?: number): number;
    h32ToString(input: string, seed?: number): string;
    h32Raw(inputBuffer: Uint8Array, seed?: number): number;
    create32(seed?: number): Hash<number>;
    h64(input: string, seed?: BigInt): BigInt;
    h64ToString(input: string, seed?: BigInt): string;
    h64Raw(inputBuffer: Uint8Array, seed?: BigInt): BigInt;
    create64(seed?: BigInt): Hash<BigInt>;
  };
  export default function xxhash(): Promise<Exports>;
}
