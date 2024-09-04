/**
 * Copyright (c) 2017-2024 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * From CIFTools.js
 * @author David Sehnal <david.sehnal@gmail.com>
 */
import { EncodedData } from './encoding';
/**
 * Fixed point, delta, RLE, integer packing adopted from https://github.com/rcsb/mmtf-javascript/
 * by Alexander Rose <alexander.rose@weirdbyte.de>, MIT License, Copyright (c) 2016
 */
export declare function decode(data: EncodedData): any[];
