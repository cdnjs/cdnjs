var nw = Object.defineProperty;
var Hu = (r) => {
  throw TypeError(r);
};
var sw = (r, t, e) => t in r ? nw(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var D = (r, t, e) => sw(r, typeof t != "symbol" ? t + "" : t, e), _c = (r, t, e) => t.has(r) || Hu("Cannot " + e);
var ht = (r, t, e) => (_c(r, t, "read from private field"), e ? e.call(r) : t.get(r)), Ie = (r, t, e) => t.has(r) ? Hu("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(r) : t.set(r, e), Ut = (r, t, e, n) => (_c(r, t, "write to private field"), n ? n.call(r, e) : t.set(r, e), e), an = (r, t, e) => (_c(r, t, "access private method"), e);
function iw(r, t) {
  for (var e = 0; e < t.length; e++) {
    const n = t[e];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const s in n)
        if (s !== "default" && !(s in r)) {
          const i = Object.getOwnPropertyDescriptor(n, s);
          i && Object.defineProperty(r, s, i.get ? i : {
            enumerable: !0,
            get: () => n[s]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }));
}
let c;
const s_ = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && s_.decode();
let zi = null;
function i_() {
  return (zi === null || zi.byteLength === 0) && (zi = new Uint8Array(c.memory.buffer)), zi;
}
function aw(r, t) {
  return r = r >>> 0, s_.decode(i_().subarray(r, r + t));
}
function w(r, t) {
  if (!(r instanceof t))
    throw new Error(`expected instance of ${t.name}`);
}
function ow(r, t) {
  const e = c.gm_args(r, t);
  return V.__wrap(e);
}
function cw(r, t, e) {
  const n = c.gtf_args(r, t, e);
  return V.__wrap(n);
}
function dw(r, t, e, n) {
  w(n, en);
  var s = n.__destroy_into_raw();
  const i = c.wdcm_args(r, t, e, s);
  return V.__wrap(i);
}
function uw(r, t, e, n) {
  w(n, en);
  var s = n.__destroy_into_raw();
  const i = c.wqcm_args(r, t, e, s);
  return V.__wrap(i);
}
function hw(r, t, e, n) {
  w(n, da);
  var s = n.__destroy_into_raw();
  const i = c.wdop_args(r, t, e, s);
  return V.__wrap(i);
}
function Aw(r, t, e, n) {
  w(n, da);
  var s = n.__destroy_into_raw();
  const i = c.wqop_args(r, t, e, s);
  return V.__wrap(i);
}
function lw(r, t, e, n) {
  w(n, ua);
  var s = n.__destroy_into_raw();
  const i = c.wdml_args(r, t, e, s);
  return V.__wrap(i);
}
function _w(r, t, e, n) {
  w(n, ua);
  var s = n.__destroy_into_raw();
  const i = c.wqml_args(r, t, e, s);
  return V.__wrap(i);
}
function pw(r, t, e, n) {
  w(n, ca);
  var s = n.__destroy_into_raw();
  const i = c.wddv_args(r, t, e, s);
  return V.__wrap(i);
}
function fw(r, t, e, n) {
  w(n, ca);
  var s = n.__destroy_into_raw();
  const i = c.wqdv_args(r, t, e, s);
  return V.__wrap(i);
}
function gw(r, t, e) {
  const n = c.add(r, t, e);
  return V.__wrap(n);
}
function ww(r, t, e) {
  const n = c.and(r, t, e);
  return V.__wrap(n);
}
function mw(r, t, e) {
  const n = c.div(r, t, e);
  return V.__wrap(n);
}
function yw(r, t, e) {
  const n = c.eq(r, t, e);
  return V.__wrap(n);
}
function bw(r, t, e) {
  const n = c.exp(r, t, e);
  return V.__wrap(n);
}
function Iw(r, t, e) {
  const n = c.gt(r, t, e);
  return V.__wrap(n);
}
function Ew(r, t, e) {
  const n = c.lt(r, t, e);
  return V.__wrap(n);
}
function Cw(r, t, e) {
  const n = c.mlog(r, t, e);
  return V.__wrap(n);
}
function Bw(r, t, e) {
  const n = c.mroo(r, t, e);
  return V.__wrap(n);
}
function vw(r, t, e) {
  const n = c.mod_(r, t, e);
  return V.__wrap(n);
}
function ln(r, t) {
  const e = c.move_(r, t);
  return V.__wrap(e);
}
function xw(r, t, e) {
  const n = c.mul(r, t, e);
  return V.__wrap(n);
}
function Rw(r, t) {
  const e = c.not(r, t);
  return V.__wrap(e);
}
function Sw(r, t, e) {
  const n = c.or(r, t, e);
  return V.__wrap(n);
}
function Tw(r, t, e) {
  const n = c.sll(r, t, e);
  return V.__wrap(n);
}
function Nw(r, t, e) {
  const n = c.srl(r, t, e);
  return V.__wrap(n);
}
function Ga(r, t, e) {
  const n = c.sub(r, t, e);
  return V.__wrap(n);
}
function Dw(r, t, e) {
  const n = c.xor(r, t, e);
  return V.__wrap(n);
}
function Fw(r, t, e, n) {
  const s = c.mldv(r, t, e, n);
  return V.__wrap(s);
}
function vd(r) {
  const t = c.ret(r);
  return V.__wrap(t);
}
function Qw(r, t) {
  const e = c.retd(r, t);
  return V.__wrap(e);
}
function Ow(r) {
  const t = c.aloc(r);
  return V.__wrap(t);
}
function Mw(r, t) {
  const e = c.mcl(r, t);
  return V.__wrap(e);
}
function Pw(r, t, e) {
  const n = c.mcp(r, t, e);
  return V.__wrap(n);
}
function Lw(r, t, e, n) {
  const s = c.meq(r, t, e, n);
  return V.__wrap(s);
}
function kw(r, t) {
  const e = c.bhsh(r, t);
  return V.__wrap(e);
}
function Uw(r) {
  const t = c.bhei(r);
  return V.__wrap(t);
}
function Gw(r, t) {
  const e = c.burn(r, t);
  return V.__wrap(e);
}
function Xc(r, t, e, n) {
  const s = c.call(r, t, e, n);
  return V.__wrap(s);
}
function zw(r, t, e, n) {
  const s = c.ccp(r, t, e, n);
  return V.__wrap(s);
}
function Xw(r, t) {
  const e = c.croo(r, t);
  return V.__wrap(e);
}
function Hw(r, t) {
  const e = c.csiz(r, t);
  return V.__wrap(e);
}
function Vw(r) {
  const t = c.cb(r);
  return V.__wrap(t);
}
function Yi(r, t, e, n) {
  const s = c.ldc(r, t, e, n);
  return V.__wrap(s);
}
function Ww(r, t, e, n) {
  const s = c.log(r, t, e, n);
  return V.__wrap(s);
}
function Yw(r, t, e, n) {
  const s = c.logd(r, t, e, n);
  return V.__wrap(s);
}
function jw(r, t) {
  const e = c.mint(r, t);
  return V.__wrap(e);
}
function Zw(r) {
  const t = c.rvrt(r);
  return V.__wrap(t);
}
function Jw(r, t, e) {
  const n = c.scwq(r, t, e);
  return V.__wrap(n);
}
function qw(r, t, e) {
  const n = c.srw(r, t, e);
  return V.__wrap(n);
}
function $w(r, t, e, n) {
  const s = c.srwq(r, t, e, n);
  return V.__wrap(s);
}
function Kw(r, t, e) {
  const n = c.sww(r, t, e);
  return V.__wrap(n);
}
function t0(r, t, e, n) {
  const s = c.swwq(r, t, e, n);
  return V.__wrap(s);
}
function a_(r, t, e) {
  const n = c.tr(r, t, e);
  return V.__wrap(n);
}
function e0(r, t, e, n) {
  const s = c.tro(r, t, e, n);
  return V.__wrap(s);
}
function r0(r, t, e) {
  const n = c.eck1(r, t, e);
  return V.__wrap(n);
}
function n0(r, t, e) {
  const n = c.ecr1(r, t, e);
  return V.__wrap(n);
}
function s0(r, t, e, n) {
  const s = c.ed19(r, t, e, n);
  return V.__wrap(s);
}
function i0(r, t, e) {
  const n = c.k256(r, t, e);
  return V.__wrap(n);
}
function a0(r, t, e) {
  const n = c.s256(r, t, e);
  return V.__wrap(n);
}
function o0(r, t) {
  const e = c.time(r, t);
  return V.__wrap(e);
}
function c0() {
  const r = c.noop();
  return V.__wrap(r);
}
function d0(r) {
  const t = c.flag(r);
  return V.__wrap(t);
}
function u0(r, t, e) {
  const n = c.bal(r, t, e);
  return V.__wrap(n);
}
function za(r) {
  const t = c.jmp(r);
  return V.__wrap(t);
}
function h0(r, t, e) {
  const n = c.jne(r, t, e);
  return V.__wrap(n);
}
function A0(r, t, e, n) {
  const s = c.smo(r, t, e, n);
  return V.__wrap(s);
}
function mr(r, t, e) {
  const n = c.addi(r, t, e);
  return V.__wrap(n);
}
function l0(r, t, e) {
  const n = c.andi(r, t, e);
  return V.__wrap(n);
}
function Xa(r, t, e) {
  const n = c.divi(r, t, e);
  return V.__wrap(n);
}
function _0(r, t, e) {
  const n = c.expi(r, t, e);
  return V.__wrap(n);
}
function p0(r, t, e) {
  const n = c.modi(r, t, e);
  return V.__wrap(n);
}
function f0(r, t, e) {
  const n = c.muli(r, t, e);
  return V.__wrap(n);
}
function g0(r, t, e) {
  const n = c.ori(r, t, e);
  return V.__wrap(n);
}
function w0(r, t, e) {
  const n = c.slli(r, t, e);
  return V.__wrap(n);
}
function m0(r, t, e) {
  const n = c.srli(r, t, e);
  return V.__wrap(n);
}
function o_(r, t, e) {
  const n = c.subi(r, t, e);
  return V.__wrap(n);
}
function y0(r, t, e) {
  const n = c.xori(r, t, e);
  return V.__wrap(n);
}
function b0(r, t, e) {
  const n = c.jnei(r, t, e);
  return V.__wrap(n);
}
function I0(r, t, e) {
  const n = c.lb(r, t, e);
  return V.__wrap(n);
}
function qi(r, t, e) {
  const n = c.lw(r, t, e);
  return V.__wrap(n);
}
function E0(r, t, e) {
  const n = c.sb(r, t, e);
  return V.__wrap(n);
}
function C0(r, t, e) {
  const n = c.sw(r, t, e);
  return V.__wrap(n);
}
function B0(r, t, e) {
  const n = c.mcpi(r, t, e);
  return V.__wrap(n);
}
function c_(r, t, e) {
  const n = c.gtf(r, t, e);
  return V.__wrap(n);
}
function v0(r, t) {
  const e = c.mcli(r, t);
  return V.__wrap(e);
}
function x0(r, t) {
  const e = c.gm(r, t);
  return V.__wrap(e);
}
function qn(r, t) {
  const e = c.movi(r, t);
  return V.__wrap(e);
}
function R0(r, t) {
  const e = c.jnzi(r, t);
  return V.__wrap(e);
}
function S0(r, t) {
  const e = c.jmpf(r, t);
  return V.__wrap(e);
}
function T0(r, t) {
  const e = c.jmpb(r, t);
  return V.__wrap(e);
}
function N0(r, t, e) {
  const n = c.jnzf(r, t, e);
  return V.__wrap(n);
}
function d_(r, t, e) {
  const n = c.jnzb(r, t, e);
  return V.__wrap(n);
}
function D0(r, t, e, n) {
  const s = c.jnef(r, t, e, n);
  return V.__wrap(s);
}
function F0(r, t, e, n) {
  const s = c.jneb(r, t, e, n);
  return V.__wrap(s);
}
function Q0(r) {
  const t = c.ji(r);
  return V.__wrap(t);
}
function O0(r) {
  const t = c.cfei(r);
  return V.__wrap(t);
}
function M0(r) {
  const t = c.cfsi(r);
  return V.__wrap(t);
}
function P0(r) {
  const t = c.cfe(r);
  return V.__wrap(t);
}
function L0(r) {
  const t = c.cfs(r);
  return V.__wrap(t);
}
function k0(r) {
  const t = c.pshl(r);
  return V.__wrap(t);
}
function U0(r) {
  const t = c.pshh(r);
  return V.__wrap(t);
}
function G0(r) {
  const t = c.popl(r);
  return V.__wrap(t);
}
function z0(r) {
  const t = c.poph(r);
  return V.__wrap(t);
}
function X0(r, t, e, n) {
  const s = c.wdcm(r, t, e, n);
  return V.__wrap(s);
}
function H0(r, t, e, n) {
  const s = c.wqcm(r, t, e, n);
  return V.__wrap(s);
}
function V0(r, t, e, n) {
  const s = c.wdop(r, t, e, n);
  return V.__wrap(s);
}
function W0(r, t, e, n) {
  const s = c.wqop(r, t, e, n);
  return V.__wrap(s);
}
function Y0(r, t, e, n) {
  const s = c.wdml(r, t, e, n);
  return V.__wrap(s);
}
function j0(r, t, e, n) {
  const s = c.wqml(r, t, e, n);
  return V.__wrap(s);
}
function Z0(r, t, e, n) {
  const s = c.wddv(r, t, e, n);
  return V.__wrap(s);
}
function J0(r, t, e, n) {
  const s = c.wqdv(r, t, e, n);
  return V.__wrap(s);
}
function q0(r, t, e, n) {
  const s = c.wdmd(r, t, e, n);
  return V.__wrap(s);
}
function $0(r, t, e, n) {
  const s = c.wqmd(r, t, e, n);
  return V.__wrap(s);
}
function K0(r, t, e, n) {
  const s = c.wdam(r, t, e, n);
  return V.__wrap(s);
}
function tm(r, t, e, n) {
  const s = c.wqam(r, t, e, n);
  return V.__wrap(s);
}
function em(r, t, e, n) {
  const s = c.wdmm(r, t, e, n);
  return V.__wrap(s);
}
function rm(r, t, e, n) {
  const s = c.wqmm(r, t, e, n);
  return V.__wrap(s);
}
function nm(r, t, e, n) {
  const s = c.ecal(r, t, e, n);
  return V.__wrap(s);
}
function Ha(r, t) {
  const e = c.bsiz(r, t);
  return V.__wrap(e);
}
function sm(r, t, e, n) {
  const s = c.bldd(r, t, e, n);
  return V.__wrap(s);
}
function im(r, t, e, n) {
  const s = c.ecop(r, t, e, n);
  return V.__wrap(s);
}
function am(r, t, e, n) {
  const s = c.epar(r, t, e, n);
  return V.__wrap(s);
}
let dn = null;
function Vu() {
  return (dn === null || dn.buffer.detached === !0 || dn.buffer.detached === void 0 && dn.buffer !== c.memory.buffer) && (dn = new DataView(c.memory.buffer)), dn;
}
function om(r, t) {
  return r = r >>> 0, i_().subarray(r / 1, r / 1 + t);
}
const cm = Object.freeze({
  /**
   * Equality (`==`)
   */
  EQ: 0,
  0: "EQ",
  /**
   * Inequality (`!=`)
   */
  NE: 1,
  1: "NE",
  /**
   * Less than (`<`)
   */
  LT: 2,
  2: "LT",
  /**
   * Greater than (`>`)
   */
  GT: 3,
  3: "GT",
  /**
   * Less than or equals (`>=`)
   */
  LTE: 4,
  4: "LTE",
  /**
   * Greater than or equals (`>=`)
   */
  GTE: 5,
  5: "GTE",
  /**
   * Number of leading zeroes in lhs (`lzcnt`) (discards rhs)
   */
  LZC: 6,
  6: "LZC"
}), dm = Object.freeze({
  /**
   * r" Get if caller is external.
   */
  IsCallerExternal: 1,
  1: "IsCallerExternal",
  /**
   * r" Get caller's contract ID.
   */
  GetCaller: 2,
  2: "GetCaller",
  /**
   * r" Get index of current predicate.
   */
  GetVerifyingPredicate: 3,
  3: "GetVerifyingPredicate",
  /**
   * r" Get the Chain ID this VM is operating within
   */
  GetChainId: 4,
  4: "GetChainId",
  /**
   * r" Get memory address where the transaction is located
   */
  TxStart: 5,
  5: "TxStart",
  /**
   * r" Get memory address of base asset ID
   */
  BaseAssetId: 6,
  6: "BaseAssetId",
  /**
   * r" Get gas price for block
   */
  GetGasPrice: 7,
  7: "GetGasPrice"
}), u_ = Object.freeze({
  /**
   * r" Set `$rA` to `tx.type`
   */
  Type: 1,
  1: "Type",
  /**
   * r" Set `$rA` to `tx.scriptGasLimit`
   */
  ScriptGasLimit: 2,
  2: "ScriptGasLimit",
  /**
   * r" Set `$rA` to `tx.scriptLength`
   */
  ScriptLength: 3,
  3: "ScriptLength",
  /**
   * r" Set `$rA` to `tx.scriptDataLength`
   */
  ScriptDataLength: 4,
  4: "ScriptDataLength",
  /**
   * r" Set `$rA` to `tx.inputsCount`
   */
  ScriptInputsCount: 5,
  5: "ScriptInputsCount",
  /**
   * r" Set `$rA` to `tx.outputsCount`
   */
  ScriptOutputsCount: 6,
  6: "ScriptOutputsCount",
  /**
   * r" Set `$rA` to `tx.witnessesCount`
   */
  ScriptWitnessesCount: 7,
  7: "ScriptWitnessesCount",
  /**
   * r" Set `$rA` to `Memory address of tx.script`
   */
  Script: 9,
  9: "Script",
  /**
   * r" Set `$rA` to `Memory address of tx.scriptData`
   */
  ScriptData: 10,
  10: "ScriptData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB]`
   */
  ScriptInputAtIndex: 11,
  11: "ScriptInputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of t.outputs[$rB]`
   */
  ScriptOutputAtIndex: 12,
  12: "ScriptOutputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
   */
  ScriptWitnessAtIndex: 13,
  13: "ScriptWitnessAtIndex",
  /**
   * r" Set `$rA` to size of the transaction in memory, in bytes
   */
  TxLength: 14,
  14: "TxLength",
  /**
   * r" Set `$rA` to `tx.bytecodeWitnessIndex`
   */
  CreateBytecodeWitnessIndex: 257,
  257: "CreateBytecodeWitnessIndex",
  /**
   * r" Set `$rA` to `tx.storageSlotsCount`
   */
  CreateStorageSlotsCount: 258,
  258: "CreateStorageSlotsCount",
  /**
   * r" Set `$rA` to `tx.inputsCount`
   */
  CreateInputsCount: 259,
  259: "CreateInputsCount",
  /**
   * r" Set `$rA` to `tx.outputsCount`
   */
  CreateOutputsCount: 260,
  260: "CreateOutputsCount",
  /**
   * r" Set `$rA` to `tx.witnessesCount`
   */
  CreateWitnessesCount: 261,
  261: "CreateWitnessesCount",
  /**
   * r" Set `$rA` to `Memory address of tx.salt`
   */
  CreateSalt: 262,
  262: "CreateSalt",
  /**
   * r" Set `$rA` to `Memory address of tx.storageSlots[$rB]`
   */
  CreateStorageSlotAtIndex: 263,
  263: "CreateStorageSlotAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB]`
   */
  CreateInputAtIndex: 264,
  264: "CreateInputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of t.outputs[$rB]`
   */
  CreateOutputAtIndex: 265,
  265: "CreateOutputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
   */
  CreateWitnessAtIndex: 266,
  266: "CreateWitnessAtIndex",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].type`
   */
  InputType: 512,
  512: "InputType",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
   */
  InputCoinTxId: 513,
  513: "InputCoinTxId",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].outputIndex`
   */
  InputCoinOutputIndex: 514,
  514: "InputCoinOutputIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].owner`
   */
  InputCoinOwner: 515,
  515: "InputCoinOwner",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].amount`
   */
  InputCoinAmount: 516,
  516: "InputCoinAmount",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].asset_id`
   */
  InputCoinAssetId: 517,
  517: "InputCoinAssetId",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].txPointer`
   */
  InputCoinTxPointer: 518,
  518: "InputCoinTxPointer",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
   */
  InputCoinWitnessIndex: 519,
  519: "InputCoinWitnessIndex",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateLength`
   */
  InputCoinPredicateLength: 521,
  521: "InputCoinPredicateLength",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
   */
  InputCoinPredicateDataLength: 522,
  522: "InputCoinPredicateDataLength",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
   */
  InputCoinPredicate: 523,
  523: "InputCoinPredicate",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
   */
  InputCoinPredicateData: 524,
  524: "InputCoinPredicateData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
   */
  InputCoinPredicateGasUsed: 525,
  525: "InputCoinPredicateGasUsed",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].txID`
   */
  InputContractTxId: 544,
  544: "InputContractTxId",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].outputIndex`
   */
  InputContractOutputIndex: 545,
  545: "InputContractOutputIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].contractID`
   */
  InputContractId: 549,
  549: "InputContractId",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].sender`
   */
  InputMessageSender: 576,
  576: "InputMessageSender",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].recipient`
   */
  InputMessageRecipient: 577,
  577: "InputMessageRecipient",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].amount`
   */
  InputMessageAmount: 578,
  578: "InputMessageAmount",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].nonce`
   */
  InputMessageNonce: 579,
  579: "InputMessageNonce",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].witnessIndex`
   */
  InputMessageWitnessIndex: 580,
  580: "InputMessageWitnessIndex",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].dataLength`
   */
  InputMessageDataLength: 581,
  581: "InputMessageDataLength",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateLength`
   */
  InputMessagePredicateLength: 582,
  582: "InputMessagePredicateLength",
  /**
   * r" Set `$rA` to `tx.inputs[$rB].predicateDataLength`
   */
  InputMessagePredicateDataLength: 583,
  583: "InputMessagePredicateDataLength",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].data`
   */
  InputMessageData: 584,
  584: "InputMessageData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicate`
   */
  InputMessagePredicate: 585,
  585: "InputMessagePredicate",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateData`
   */
  InputMessagePredicateData: 586,
  586: "InputMessagePredicateData",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB].predicateGasUsed`
   */
  InputMessagePredicateGasUsed: 587,
  587: "InputMessagePredicateGasUsed",
  /**
   * r" Set `$rA` to `tx.outputs[$rB].type`
   */
  OutputType: 768,
  768: "OutputType",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].to`
   */
  OutputCoinTo: 769,
  769: "OutputCoinTo",
  /**
   * r" Set `$rA` to `tx.outputs[$rB].amount`
   */
  OutputCoinAmount: 770,
  770: "OutputCoinAmount",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].asset_id`
   */
  OutputCoinAssetId: 771,
  771: "OutputCoinAssetId",
  /**
   * r" Set `$rA` to `tx.outputs[$rB].inputIndex`
   */
  OutputContractInputIndex: 772,
  772: "OutputContractInputIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].contractID`
   */
  OutputContractCreatedContractId: 775,
  775: "OutputContractCreatedContractId",
  /**
   * r" Set `$rA` to `Memory address of tx.outputs[$rB].stateRoot`
   */
  OutputContractCreatedStateRoot: 776,
  776: "OutputContractCreatedStateRoot",
  /**
   * r" Set `$rA` to `tx.witnesses[$rB].dataLength`
   */
  WitnessDataLength: 1024,
  1024: "WitnessDataLength",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB].data`
   */
  WitnessData: 1025,
  1025: "WitnessData",
  /**
   * r" Set `$rA` to `tx.policyTypes`
   */
  PolicyTypes: 1280,
  1280: "PolicyTypes",
  /**
   * r" Set `$rA` to `tx.policies[0x00].gasPrice`
   */
  PolicyTip: 1281,
  1281: "PolicyTip",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b11 & tx.policyTypes) - 1].witnessLimit`
   */
  PolicyWitnessLimit: 1282,
  1282: "PolicyWitnessLimit",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b111 & tx.policyTypes) - 1].maturity`
   */
  PolicyMaturity: 1283,
  1283: "PolicyMaturity",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b1111 & tx.policyTypes) - 1].maxFee`
   */
  PolicyMaxFee: 1284,
  1284: "PolicyMaxFee",
  /**
   * r" Set `$rA` to `tx.policies[count_ones(0b11111 & tx.policyTypes) - 1].expiration`
   */
  PolicyExpiration: 1285,
  1285: "PolicyExpiration",
  /**
   * r" Set `$rA` to `Memory address of tx.root`
   */
  UploadRoot: 1536,
  1536: "UploadRoot",
  /**
   * r" Set `$rA` to `tx.witnessIndex`
   */
  UploadWitnessIndex: 1537,
  1537: "UploadWitnessIndex",
  /**
   * r" Set `$rA` to `tx.subsectionIndex`
   */
  UploadSubsectionIndex: 1538,
  1538: "UploadSubsectionIndex",
  /**
   * r" Set `$rA` to `tx.subsectionsNumber`
   */
  UploadSubsectionsCount: 1539,
  1539: "UploadSubsectionsCount",
  /**
   * r" Set `$rA` to `tx.proofSetCount`
   */
  UploadProofSetCount: 1540,
  1540: "UploadProofSetCount",
  /**
   * r" Set `$rA` to `Memory address of tx.proofSet[$rB]`
   */
  UploadProofSetAtIndex: 1541,
  1541: "UploadProofSetAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.id`
   */
  BlobId: 1792,
  1792: "BlobId",
  /**
   * r" Set `$rA` to `tx.witnessIndex`
   */
  BlobWitnessIndex: 1793,
  1793: "BlobWitnessIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.purpose`
   */
  UpgradePurpose: 2048,
  2048: "UpgradePurpose",
  /**
   * r" Set `$rA` to `tx.inputsCount`
   */
  TxInputsCount: 2304,
  2304: "TxInputsCount",
  /**
   * r" Set `$rA` to `tx.outputsCount`
   */
  TxOutputsCount: 2305,
  2305: "TxOutputsCount",
  /**
   * r" Set `$rA` to `tx.witnessesCount`
   */
  TxWitnessesCount: 2306,
  2306: "TxWitnessesCount",
  /**
   * r" Set `$rA` to `Memory address of tx.inputs[$rB]`
   */
  TxInputAtIndex: 2307,
  2307: "TxInputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of t.outputs[$rB]`
   */
  TxOutputAtIndex: 2308,
  2308: "TxOutputAtIndex",
  /**
   * r" Set `$rA` to `Memory address of tx.witnesses[$rB]`
   */
  TxWitnessAtIndex: 2309,
  2309: "TxWitnessAtIndex"
}), um = Object.freeze({
  /**
   * Add
   */
  ADD: 0,
  0: "ADD",
  /**
   * Subtract
   */
  SUB: 1,
  1: "SUB",
  /**
   * Invert bits (discards rhs)
   */
  NOT: 2,
  2: "NOT",
  /**
   * Bitwise or
   */
  OR: 3,
  3: "OR",
  /**
   * Bitwise exclusive or
   */
  XOR: 4,
  4: "XOR",
  /**
   * Bitwise and
   */
  AND: 5,
  5: "AND",
  /**
   * Shift left
   */
  SHL: 6,
  6: "SHL",
  /**
   * Shift right
   */
  SHR: 7,
  7: "SHR"
}), hm = Object.freeze({
  /**
   * r" The byte can't be mapped to any known `PanicReason`.
   */
  UnknownPanicReason: 0,
  0: "UnknownPanicReason",
  /**
   * r" Found `RVRT` instruction.
   */
  Revert: 1,
  1: "Revert",
  /**
   * r" Execution ran out of gas.
   */
  OutOfGas: 2,
  2: "OutOfGas",
  /**
   * r" The transaction validity is violated.
   */
  TransactionValidity: 3,
  3: "TransactionValidity",
  /**
   * r" Attempt to write outside interpreter memory boundaries.
   */
  MemoryOverflow: 4,
  4: "MemoryOverflow",
  /**
   * r" Overflow while executing arithmetic operation.
   * r" These errors are ignored using the WRAPPING flag.
   */
  ArithmeticOverflow: 5,
  5: "ArithmeticOverflow",
  /**
   * r" Designed contract was not found in the storage.
   */
  ContractNotFound: 6,
  6: "ContractNotFound",
  /**
   * r" Memory ownership rules are violated.
   */
  MemoryOwnership: 7,
  7: "MemoryOwnership",
  /**
   * r" The asset ID balance isn't enough for the instruction.
   */
  NotEnoughBalance: 8,
  8: "NotEnoughBalance",
  /**
   * r" The interpreter is expected to be in internal context.
   */
  ExpectedInternalContext: 9,
  9: "ExpectedInternalContext",
  /**
   * r" The queried asset ID was not found in the state.
   */
  AssetIdNotFound: 10,
  10: "AssetIdNotFound",
  /**
   * r" The provided input is not found in the transaction.
   */
  InputNotFound: 11,
  11: "InputNotFound",
  /**
   * r" The provided output is not found in the transaction.
   */
  OutputNotFound: 12,
  12: "OutputNotFound",
  /**
   * r" The provided witness is not found in the transaction.
   */
  WitnessNotFound: 13,
  13: "WitnessNotFound",
  /**
   * r" The transaction maturity is not valid for this request.
   */
  TransactionMaturity: 14,
  14: "TransactionMaturity",
  /**
   * r" The metadata identifier is invalid.
   */
  InvalidMetadataIdentifier: 15,
  15: "InvalidMetadataIdentifier",
  /**
   * r" The call structure is not valid.
   */
  MalformedCallStructure: 16,
  16: "MalformedCallStructure",
  /**
   * r" The provided register does not allow write operations.
   */
  ReservedRegisterNotWritable: 17,
  17: "ReservedRegisterNotWritable",
  /**
   * r" The execution resulted in an erroneous state of the interpreter.
   */
  InvalidFlags: 18,
  18: "InvalidFlags",
  /**
   * r" The provided immediate value is not valid for this instruction.
   */
  InvalidImmediateValue: 19,
  19: "InvalidImmediateValue",
  /**
   * r" The provided transaction input is not of type `Coin`.
   */
  ExpectedCoinInput: 20,
  20: "ExpectedCoinInput",
  /**
   * r" `ECAL` instruction failed.
   */
  EcalError: 21,
  21: "EcalError",
  /**
   * r" Two segments of the interpreter memory should not intersect for write operations.
   */
  MemoryWriteOverlap: 22,
  22: "MemoryWriteOverlap",
  /**
   * r" The requested contract is not listed in the transaction inputs.
   */
  ContractNotInInputs: 23,
  23: "ContractNotInInputs",
  /**
   * r" The internal asset ID balance overflowed with the provided instruction.
   */
  InternalBalanceOverflow: 24,
  24: "InternalBalanceOverflow",
  /**
   * r" The maximum allowed contract size is violated.
   */
  ContractMaxSize: 25,
  25: "ContractMaxSize",
  /**
   * r" This instruction expects the stack area to be unallocated for this call.
   */
  ExpectedUnallocatedStack: 26,
  26: "ExpectedUnallocatedStack",
  /**
   * r" The maximum allowed number of static contracts was reached for this transaction.
   */
  MaxStaticContractsReached: 27,
  27: "MaxStaticContractsReached",
  /**
   * r" The requested transfer amount cannot be zero.
   */
  TransferAmountCannotBeZero: 28,
  28: "TransferAmountCannotBeZero",
  /**
   * r" The provided transaction output should be of type `Variable`.
   */
  ExpectedOutputVariable: 29,
  29: "ExpectedOutputVariable",
  /**
   * r" The expected context of the stack parent is internal.
   */
  ExpectedParentInternalContext: 30,
  30: "ExpectedParentInternalContext",
  /**
   * r" The predicate returned non `1`. The `1` means successful verification
   * r" of the predicate, all other values means unsuccessful.
   */
  PredicateReturnedNonOne: 31,
  31: "PredicateReturnedNonOne",
  /**
   * r" The contract ID is already deployed and can't be overwritten.
   */
  ContractIdAlreadyDeployed: 32,
  32: "ContractIdAlreadyDeployed",
  /**
   * r" The loaded contract mismatch expectations.
   */
  ContractMismatch: 33,
  33: "ContractMismatch",
  /**
   * r" Attempting to send message data longer than `MAX_MESSAGE_DATA_LENGTH`
   */
  MessageDataTooLong: 34,
  34: "MessageDataTooLong",
  /**
   * r" Mathematically invalid arguments where given to an arithmetic instruction.
   * r" For instance, division by zero produces this.
   * r" These errors are ignored using the UNSAFEMATH flag.
   */
  ArithmeticError: 35,
  35: "ArithmeticError",
  /**
   * r" The contract instruction is not allowed in predicates.
   */
  ContractInstructionNotAllowed: 36,
  36: "ContractInstructionNotAllowed",
  /**
   * r" Transfer of zero coins is not allowed.
   */
  TransferZeroCoins: 37,
  37: "TransferZeroCoins",
  /**
   * r" Attempted to execute an invalid instruction
   */
  InvalidInstruction: 38,
  38: "InvalidInstruction",
  /**
   * r" Memory outside $is..$ssp range is not executable
   */
  MemoryNotExecutable: 39,
  39: "MemoryNotExecutable",
  /**
   * r" The policy is not set.
   */
  PolicyIsNotSet: 40,
  40: "PolicyIsNotSet",
  /**
   * r" The policy is not found across policies.
   */
  PolicyNotFound: 41,
  41: "PolicyNotFound",
  /**
   * r" Receipt context is full
   */
  TooManyReceipts: 42,
  42: "TooManyReceipts",
  /**
   * r" Balance of a contract overflowed
   */
  BalanceOverflow: 43,
  43: "BalanceOverflow",
  /**
   * r" Block height value is invalid, typically because it is too large
   */
  InvalidBlockHeight: 44,
  44: "InvalidBlockHeight",
  /**
   * r" Attempt to use sequential memory instructions with too large slot count,
   * r" typically because it cannot fit into usize
   */
  TooManySlots: 45,
  45: "TooManySlots",
  /**
   * r" Caller of this internal context is also expected to be internal,
   * r" i.e. $fp->$fp must be non-zero.
   */
  ExpectedNestedCaller: 46,
  46: "ExpectedNestedCaller",
  /**
   * r" During memory growth, the stack overlapped with the heap
   */
  MemoryGrowthOverlap: 47,
  47: "MemoryGrowthOverlap",
  /**
   * r" Attempting to read or write uninitialized memory.
   * r" Also occurs when boundary crosses from stack to heap.
   */
  UninitalizedMemoryAccess: 48,
  48: "UninitalizedMemoryAccess",
  /**
   * r" Overriding consensus parameters is not allowed.
   */
  OverridingConsensusParameters: 49,
  49: "OverridingConsensusParameters",
  /**
   * r" The storage doesn't know about the hash of the state transition bytecode.
   */
  UnknownStateTransactionBytecodeRoot: 50,
  50: "UnknownStateTransactionBytecodeRoot",
  /**
   * r" Overriding the state transition bytecode is not allowed.
   */
  OverridingStateTransactionBytecode: 51,
  51: "OverridingStateTransactionBytecode",
  /**
   * r" The bytecode is already uploaded and cannot be uploaded again.
   */
  BytecodeAlreadyUploaded: 52,
  52: "BytecodeAlreadyUploaded",
  /**
   * r" The part of the bytecode is not sequentially connected to the previous parts.
   */
  ThePartIsNotSequentiallyConnected: 53,
  53: "ThePartIsNotSequentiallyConnected",
  /**
   * r" The requested blob is not found.
   */
  BlobNotFound: 54,
  54: "BlobNotFound",
  /**
   * r" The blob was already
   */
  BlobIdAlreadyUploaded: 55,
  55: "BlobIdAlreadyUploaded",
  /**
   * r" Active gas costs do not define the cost for this instruction.
   */
  GasCostNotDefined: 56,
  56: "GasCostNotDefined",
  /**
   * r" The curve id is not supported.
   */
  UnsupportedCurveId: 57,
  57: "UnsupportedCurveId",
  /**
   * r" The operation type is not supported.
   */
  UnsupportedOperationType: 58,
  58: "UnsupportedOperationType",
  /**
   * r" Read alt_bn_128 curve point is invalid.
   */
  InvalidEllipticCurvePoint: 59,
  59: "InvalidEllipticCurvePoint",
  /**
   * r" Given input contract does not exist.
   */
  InputContractDoesNotExist: 60,
  60: "InputContractDoesNotExist",
  /**
   * r" Storage slot in Create not found
   */
  StorageSlotsNotFound: 61,
  61: "StorageSlotsNotFound",
  /**
   * r" Proof in Upload not found
   */
  ProofInUploadNotFound: 62,
  62: "ProofInUploadNotFound",
  /**
   * r" Invalid purpose type in Upgrade
   */
  InvalidUpgradePurposeType: 63,
  63: "InvalidUpgradePurposeType",
  /**
   * r" Cannot get gas price in predicate
   */
  CanNotGetGasPriceInPredicate: 64,
  64: "CanNotGetGasPriceInPredicate"
}), Wu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_add_free(r >>> 0, 1));
class Am {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_add_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Wu.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Yu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_addi_free(r >>> 0, 1));
class lm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_addi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Yu.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_aloc_free(r >>> 0, 1));
class _m {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ju.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_aloc_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} bytes
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, ju.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Zu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_and_free(r >>> 0, 1));
class pm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_and_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Zu.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ju = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_andi_free(r >>> 0, 1));
class fm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ju.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_andi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ju.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const qu = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bal_free(r >>> 0, 1));
class gm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qu.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bal_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} asset_id_addr
   * @param {RegId} contract_id_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, qu.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const $u = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bhei_free(r >>> 0, 1));
class wm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $u.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bhei_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, $u.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ku = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bhsh_free(r >>> 0, 1));
class mm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ku.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bhsh_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} heigth
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Ku.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const th = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bldd_free(r >>> 0, 1));
class ym {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, th.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bldd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_ptr
   * @param {RegId} blob_id_ptr
   * @param {RegId} offset
   * @param {RegId} len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, th.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const eh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_bsiz_free(r >>> 0, 1));
class bm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, eh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_bsiz_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} blob_id_ptr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, eh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const rh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_burn_free(r >>> 0, 1));
class Im {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_burn_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} amount
   * @param {RegId} sub_id_addr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, rh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const nh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_call_free(r >>> 0, 1));
class Em {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_call_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} target_struct
   * @param {RegId} fwd_coins
   * @param {RegId} asset_id_addr
   * @param {RegId} fwd_gas
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, nh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const sh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cb_free(r >>> 0, 1));
class Cm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, sh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ih = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ccp_free(r >>> 0, 1));
class Bm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ih.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ccp_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} contract_id_addr
   * @param {RegId} offset
   * @param {RegId} len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, ih.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const ah = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cfe_free(r >>> 0, 1));
class vm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ah.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfe_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} amount
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, ah.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const oh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cfei_free(r >>> 0, 1));
class xm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, oh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfei_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} amount
   */
  constructor(t) {
    w(t, Ne);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, oh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const ch = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cfs_free(r >>> 0, 1));
class Rm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ch.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfs_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} amount
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, ch.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const dh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_cfsi_free(r >>> 0, 1));
class Sm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_cfsi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} amount
   */
  constructor(t) {
    w(t, Ne);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, dh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const uh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_croo_free(r >>> 0, 1));
class Tm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_croo_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} contract_id_addr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, uh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const hh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_csiz_free(r >>> 0, 1));
class Nm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_csiz_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} contract_id_addr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, hh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ah = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_compareargs_free(r >>> 0, 1));
class en {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(en.prototype);
    return e.__wbg_ptr = t, Ah.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ah.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_compareargs_free(t, 0);
  }
  /**
   * Comparison mode
   * @returns {CompareMode}
   */
  get mode() {
    return c.__wbg_get_compareargs_mode(this.__wbg_ptr);
  }
  /**
   * Comparison mode
   * @param {CompareMode} arg0
   */
  set mode(t) {
    c.__wbg_set_compareargs_mode(this.__wbg_ptr, t);
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_rhs() {
    return c.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_rhs(t) {
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
  /**
   * Convert to immediate value.
   * @returns {Imm06}
   */
  to_imm() {
    const t = this.__destroy_into_raw(), e = c.compareargs_to_imm(t);
    return Mt.__wrap(e);
  }
  /**
   * Construct from `Imm06`. Returns `None` if the value has reserved flags set.
   * @param {Imm06} bits
   * @returns {CompareArgs | undefined}
   */
  static from_imm(t) {
    w(t, Mt);
    var e = t.__destroy_into_raw();
    const n = c.compareargs_from_imm(e);
    return n === 0 ? void 0 : en.__wrap(n);
  }
}
const lh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_div_free(r >>> 0, 1));
class Dm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_div_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, lh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const _h = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_divi_free(r >>> 0, 1));
class Fm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _h.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_divi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, _h.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Qm = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_divargs_free(r >>> 0, 1));
class ca {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qm.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_divargs_free(t, 0);
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_rhs() {
    return c.__wbg_get_divargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_rhs(t) {
    c.__wbg_set_divargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const ph = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ecal_free(r >>> 0, 1));
class Om {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, ph.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecal_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} a
   * @param {RegId} b
   * @param {RegId} c
   * @param {RegId} d
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, ph.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const fh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_eck1_free(r >>> 0, 1));
class Mm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_eck1_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} sig_addr
   * @param {RegId} msg_hash_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, fh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const gh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ecop_free(r >>> 0, 1));
class Pm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecop_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} curve_id
   * @param {RegId} operation_type
   * @param {RegId} points_ptr
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, gh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const wh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ecr1_free(r >>> 0, 1));
class Lm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ecr1_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} sig_addr
   * @param {RegId} msg_hash_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, wh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const mh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ed19_free(r >>> 0, 1));
class km {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ed19_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} pub_key_addr
   * @param {RegId} sig_addr
   * @param {RegId} msg_addr
   * @param {RegId} msg_len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, mh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const yh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_epar_free(r >>> 0, 1));
class Um {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_epar_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} success
   * @param {RegId} curve_id
   * @param {RegId} number_elements
   * @param {RegId} points_ptr
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, yh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const bh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_eq_free(r >>> 0, 1));
class Gm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_eq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, bh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ih = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_exp_free(r >>> 0, 1));
class zm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ih.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_exp_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Ih.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Eh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_expi_free(r >>> 0, 1));
class Xm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Eh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_expi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Eh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Ch = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_flag_free(r >>> 0, 1));
class Hm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ch.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_flag_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} value
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Ch.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const pc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_gm_free(r >>> 0, 1));
class Va {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Va.prototype);
    return e.__wbg_ptr = t, pc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gm_free(t, 0);
  }
  /**
   * Construct a `GM` instruction from its arguments.
   * @param {RegId} ra
   * @param {GMArgs} args
   * @returns {GM}
   */
  static from_args(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    const s = c.gm_from_args(n, e);
    return Va.__wrap(s);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {Imm18} selector
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Le);
    var s = e.__destroy_into_raw();
    const i = c.gm_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, pc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Le.__wrap(t);
  }
}
const Bh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_gt_free(r >>> 0, 1));
class Vm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gt_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Bh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const fc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_gtf_free(r >>> 0, 1));
class Wa {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Wa.prototype);
    return e.__wbg_ptr = t, fc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_gtf_free(t, 0);
  }
  /**
   * Construct a `GTF` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {GTFArgs} args
   * @returns {GTF}
   */
  static from_args(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    const a = c.gtf_from_args(s, i, n);
    return Wa.__wrap(a);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} arg
   * @param {Imm12} selector
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.gtf_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, fc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const vh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_imm06_free(r >>> 0, 1));
class Mt {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Mt.prototype);
    return e.__wbg_ptr = t, vh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm06_free(t, 0);
  }
}
const xh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_imm12_free(r >>> 0, 1));
class _t {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(_t.prototype);
    return e.__wbg_ptr = t, xh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm12_free(t, 0);
  }
}
const Rh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_imm18_free(r >>> 0, 1));
class Le {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Le.prototype);
    return e.__wbg_ptr = t, Rh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Rh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm18_free(t, 0);
  }
}
const Sh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_imm24_free(r >>> 0, 1));
class Ne {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Ne.prototype);
    return e.__wbg_ptr = t, Sh.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Sh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_imm24_free(t, 0);
  }
}
const Th = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_instruction_free(r >>> 0, 1));
class V {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(V.prototype);
    return e.__wbg_ptr = t, Th.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Th.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_instruction_free(t, 0);
  }
  /**
   * Convenience method for converting to bytes
   * @returns {Uint8Array}
   */
  to_bytes() {
    try {
      const s = c.__wbindgen_add_to_stack_pointer(-16);
      c.instruction_to_bytes(s, this.__wbg_ptr);
      var t = Vu().getInt32(s + 4 * 0, !0), e = Vu().getInt32(s + 4 * 1, !0), n = om(t, e).slice();
      return c.__wbindgen_export_0(t, e * 1, 1), n;
    } finally {
      c.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * Size of an instruction in bytes
   * @returns {number}
   */
  static size() {
    return c.instruction_size() >>> 0;
  }
}
const Nh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ji_free(r >>> 0, 1));
class Wm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Nh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ji_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} abs_target
   */
  constructor(t) {
    w(t, Ne);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Nh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const Dh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jmp_free(r >>> 0, 1));
class Ym {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Dh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmp_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} abs_target
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, Dh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Fh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jmpb_free(r >>> 0, 1));
class jm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Fh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmpb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dynamic
   * @param {Imm18} fixed
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Le);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Fh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Le.__wrap(t);
  }
}
const Qh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jmpf_free(r >>> 0, 1));
class Zm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Qh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jmpf_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dynamic
   * @param {Imm18} fixed
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Le);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Qh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Le.__wrap(t);
  }
}
const Oh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jne_free(r >>> 0, 1));
class Jm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Oh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jne_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} abs_target
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Oh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Mh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jneb_free(r >>> 0, 1));
class qm {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Mh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jneb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_lhs
   * @param {RegId} cond_rhs
   * @param {RegId} dynamic
   * @param {Imm06} fixed
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Mh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const Ph = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnef_free(r >>> 0, 1));
class $m {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ph.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnef_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_lhs
   * @param {RegId} cond_rhs
   * @param {RegId} dynamic
   * @param {Imm06} fixed
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Ph.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const Lh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnei_free(r >>> 0, 1));
class Km {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Lh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnei_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_lhs
   * @param {RegId} cond_rhs
   * @param {Imm12} abs_target
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Lh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const kh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnzb_free(r >>> 0, 1));
class ty {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_nz
   * @param {RegId} dynamic
   * @param {Imm12} fixed
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, kh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Uh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnzf_free(r >>> 0, 1));
class ey {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Uh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzf_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_nz
   * @param {RegId} dynamic
   * @param {Imm12} fixed
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Uh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Gh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_jnzi_free(r >>> 0, 1));
class ry {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Gh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_jnzi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} cond_nz
   * @param {Imm18} abs_target
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Le);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Gh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Le.__wrap(t);
  }
}
const zh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_k256_free(r >>> 0, 1));
class ny {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_k256_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} src_addr
   * @param {RegId} len
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, zh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Xh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_lb_free(r >>> 0, 1));
class sy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Xh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} addr
   * @param {Imm12} offset
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Xh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Hh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ldc_free(r >>> 0, 1));
class iy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Hh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ldc_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} src_addr
   * @param {RegId} offset
   * @param {RegId} len
   * @param {Imm06} mode
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Hh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const Vh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_log_free(r >>> 0, 1));
class ay {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Vh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_log_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} a
   * @param {RegId} b
   * @param {RegId} c
   * @param {RegId} d
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Vh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Wh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_logd_free(r >>> 0, 1));
class oy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Wh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_logd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} a
   * @param {RegId} b
   * @param {RegId} addr
   * @param {RegId} len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Wh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Yh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_lt_free(r >>> 0, 1));
class cy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Yh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lt_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, Yh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const jh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_lw_free(r >>> 0, 1));
class dy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, jh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_lw_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} addr
   * @param {Imm12} offset
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, jh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Zh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mcl_free(r >>> 0, 1));
class uy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Zh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcl_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} len
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Zh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Jh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mcli_free(r >>> 0, 1));
class hy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Jh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcli_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} addr
   * @param {Imm18} count
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Le);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, Jh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Le.__wrap(t);
  }
}
const qh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mcp_free(r >>> 0, 1));
class Ay {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, qh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcp_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} src_addr
   * @param {RegId} len
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, qh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const $h = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mcpi_free(r >>> 0, 1));
class ly {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, $h.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mcpi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} src_addr
   * @param {Imm12} len
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, $h.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const Kh = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_meq_free(r >>> 0, 1));
class _y {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Kh.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_meq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} result
   * @param {RegId} lhs_addr
   * @param {RegId} rhs_addr
   * @param {RegId} len
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Kh.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const tA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mint_free(r >>> 0, 1));
class py {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, tA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mint_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} amount
   * @param {RegId} sub_id_addr
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, tA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const eA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mldv_free(r >>> 0, 1));
class fy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, eA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mldv_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} divisor
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, eA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const rA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mlog_free(r >>> 0, 1));
class gy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, rA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mlog_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, rA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const nA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mod_free(r >>> 0, 1));
class wy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, nA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mod_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, nA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const sA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_modi_free(r >>> 0, 1));
class my {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, sA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_modi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, sA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const iA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_move_free(r >>> 0, 1));
class yy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, iA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_move_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} src
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, iA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const aA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_movi_free(r >>> 0, 1));
class by {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, aA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_movi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {Imm18} val
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, Le);
    var s = e.__destroy_into_raw();
    const i = c.jmpb_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, aA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 18-bit immediate value.
   * @returns {Imm18}
   */
  imm18() {
    const t = c.gm_imm18(this.__wbg_ptr);
    return Le.__wrap(t);
  }
}
const oA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mroo_free(r >>> 0, 1));
class Iy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, oA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mroo_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, oA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const cA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mul_free(r >>> 0, 1));
class Ey {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, cA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mul_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, cA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const dA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_muli_free(r >>> 0, 1));
class Cy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, dA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_muli_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, dA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const By = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mathargs_free(r >>> 0, 1));
class da {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, By.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mathargs_free(t, 0);
  }
  /**
   * The operation to perform
   * @returns {MathOp}
   */
  get op() {
    return c.__wbg_get_mathargs_op(this.__wbg_ptr);
  }
  /**
   * The operation to perform
   * @param {MathOp} arg0
   */
  set op(t) {
    c.__wbg_set_mathargs_op(this.__wbg_ptr, t);
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_rhs() {
    return c.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_rhs(t) {
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const vy = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_mulargs_free(r >>> 0, 1));
class ua {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vy.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_mulargs_free(t, 0);
  }
  /**
   * Load LHSS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_lhs() {
    return c.__wbg_get_compareargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load LHSS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_lhs(t) {
    c.__wbg_set_compareargs_indirect_rhs(this.__wbg_ptr, t);
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @returns {boolean}
   */
  get indirect_rhs() {
    return c.__wbg_get_mulargs_indirect_rhs(this.__wbg_ptr) !== 0;
  }
  /**
   * Load RHS from register if true, otherwise zero-extend register value
   * @param {boolean} arg0
   */
  set indirect_rhs(t) {
    c.__wbg_set_mulargs_indirect_rhs(this.__wbg_ptr, t);
  }
}
const uA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_noop_free(r >>> 0, 1));
class xy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, uA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_noop_free(t, 0);
  }
  /**
   * Construct the instruction.
   */
  constructor() {
    const t = c.noop_new_typescript();
    return this.__wbg_ptr = t >>> 0, uA.register(this, this.__wbg_ptr, this), this;
  }
}
const hA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_not_free(r >>> 0, 1));
class Ry {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, hA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_not_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} arg
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, hA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const AA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_or_free(r >>> 0, 1));
class Sy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, AA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_or_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, AA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const lA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ori_free(r >>> 0, 1));
class Ty {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, lA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ori_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, lA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const _A = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_poph_free(r >>> 0, 1));
class Ny {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, _A.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_poph_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} bitmask
   */
  constructor(t) {
    w(t, Ne);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, _A.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const pA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_popl_free(r >>> 0, 1));
class Dy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, pA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_popl_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} bitmask
   */
  constructor(t) {
    w(t, Ne);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, pA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const fA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_pshh_free(r >>> 0, 1));
class Fy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, fA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_pshh_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} bitmask
   */
  constructor(t) {
    w(t, Ne);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, fA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const gA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_pshl_free(r >>> 0, 1));
class Qy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_pshl_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {Imm24} bitmask
   */
  constructor(t) {
    w(t, Ne);
    var e = t.__destroy_into_raw();
    const n = c.cfei_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, gA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the 24-bit immediate value.
   * @returns {Imm24}
   */
  imm24() {
    const t = c.cfei_imm24(this.__wbg_ptr);
    return Ne.__wrap(t);
  }
}
const wA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_panicinstruction_free(r >>> 0, 1));
class Oy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_panicinstruction_free(t, 0);
  }
  /**
   * Represents an error described by a reason and an instruction.
   * @param {PanicReason} reason
   * @param {number} instruction
   */
  constructor(t, e) {
    const n = c.panicinstruction_error_typescript(t, e);
    return this.__wbg_ptr = n >>> 0, wA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Underlying panic reason
   * @returns {PanicReason}
   */
  reason() {
    return c.panicinstruction_reason(this.__wbg_ptr);
  }
  /**
   * Underlying instruction
   * @returns {number}
   */
  instruction() {
    return c.panicinstruction_instruction(this.__wbg_ptr) >>> 0;
  }
}
const mA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_ret_free(r >>> 0, 1));
class My {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_ret_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} value
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, mA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const yA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_retd_free(r >>> 0, 1));
class Py {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_retd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} addr
   * @param {RegId} len
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, yA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const bA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_rvrt_free(r >>> 0, 1));
class Ly {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_rvrt_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} value
   */
  constructor(t) {
    w(t, l);
    var e = t.__destroy_into_raw();
    const n = c.aloc_new_typescript(e);
    return this.__wbg_ptr = n >>> 0, bA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.aloc_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const gc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_regid_free(r >>> 0, 1));
class l {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(l.prototype);
    return e.__wbg_ptr = t, gc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, gc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_regid_free(t, 0);
  }
  /**
   * Construct a register ID from the given value.
   *
   * Returns `None` if the value is outside the 6-bit value range.
   * @param {number} u
   * @returns {RegId | undefined}
   */
  static new_checked(t) {
    const e = c.regid_new_checked(t);
    return e === 0 ? void 0 : l.__wrap(e);
  }
  /**
   * Received balance for this context.
   * @returns {RegId}
   */
  static bal() {
    const t = c.regid_bal();
    return l.__wrap(t);
  }
  /**
   * Remaining gas in the context.
   * @returns {RegId}
   */
  static cgas() {
    const t = c.regid_cgas();
    return l.__wrap(t);
  }
  /**
   * Error codes for particular operations.
   * @returns {RegId}
   */
  static err() {
    const t = c.regid_err();
    return l.__wrap(t);
  }
  /**
   * Flags register.
   * @returns {RegId}
   */
  static flag() {
    const t = c.regid_flag();
    return l.__wrap(t);
  }
  /**
   * Frame pointer. Memory address of beginning of current call frame.
   * @returns {RegId}
   */
  static fp() {
    const t = c.regid_fp();
    return l.__wrap(t);
  }
  /**
   * Remaining gas globally.
   * @returns {RegId}
   */
  static ggas() {
    const t = c.regid_ggas();
    return l.__wrap(t);
  }
  /**
   * Heap pointer. Memory address below the current bottom of the heap (points to free
   * memory).
   * @returns {RegId}
   */
  static hp() {
    const t = c.regid_hp();
    return l.__wrap(t);
  }
  /**
   * Instructions start. Pointer to the start of the currently-executing code.
   * @returns {RegId}
   */
  static is() {
    const t = c.regid_is();
    return l.__wrap(t);
  }
  /**
   * Contains overflow/underflow of addition, subtraction, and multiplication.
   * @returns {RegId}
   */
  static of() {
    const t = c.regid_of();
    return l.__wrap(t);
  }
  /**
   * Contains one (1), for convenience.
   * @returns {RegId}
   */
  static one() {
    const t = c.regid_one();
    return l.__wrap(t);
  }
  /**
   * The program counter. Memory address of the current instruction.
   * @returns {RegId}
   */
  static pc() {
    const t = c.regid_pc();
    return l.__wrap(t);
  }
  /**
   * Return value or pointer.
   * @returns {RegId}
   */
  static ret() {
    const t = c.regid_ret();
    return l.__wrap(t);
  }
  /**
   * Return value length in bytes.
   * @returns {RegId}
   */
  static retl() {
    const t = c.regid_retl();
    return l.__wrap(t);
  }
  /**
   * Stack pointer. Memory address on top of current writable stack area (points to
   * free memory).
   * @returns {RegId}
   */
  static sp() {
    const t = c.regid_sp();
    return l.__wrap(t);
  }
  /**
   * Stack start pointer. Memory address of bottom of current writable stack area.
   * @returns {RegId}
   */
  static spp() {
    const t = c.regid_spp();
    return l.__wrap(t);
  }
  /**
   * Smallest writable register.
   * @returns {RegId}
   */
  static writable() {
    const t = c.regid_writable();
    return l.__wrap(t);
  }
  /**
   * Contains zero (0), for convenience.
   * @returns {RegId}
   */
  static zero() {
    const t = c.regid_zero();
    return l.__wrap(t);
  }
  /**
   * Construct a register ID from the given value.
   *
   * The given value will be masked to 6 bits.
   * @param {number} u
   */
  constructor(t) {
    const e = c.regid_new_typescript(t);
    return this.__wbg_ptr = e >>> 0, gc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * A const alternative to the `Into<u8>` implementation.
   * @returns {number}
   */
  to_u8() {
    const t = this.__destroy_into_raw();
    return c.regid_to_u8(t);
  }
}
const IA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_s256_free(r >>> 0, 1));
class ky {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, IA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_s256_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} src_addr
   * @param {RegId} len
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, IA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const EA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sb_free(r >>> 0, 1));
class Uy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, EA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sb_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} addr
   * @param {RegId} value
   * @param {Imm12} offset
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, EA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const CA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_scwq_free(r >>> 0, 1));
class Gy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, CA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_scwq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} key_addr
   * @param {RegId} status
   * @param {RegId} lenq
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, CA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const BA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sll_free(r >>> 0, 1));
class zy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, BA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sll_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, BA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const vA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_slli_free(r >>> 0, 1));
class Xy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, vA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_slli_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, vA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const xA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_smo_free(r >>> 0, 1));
class Hy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, xA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_smo_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} recipient_addr
   * @param {RegId} data_addr
   * @param {RegId} data_len
   * @param {RegId} coins
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, xA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const RA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_srl_free(r >>> 0, 1));
class Vy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, RA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srl_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, RA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const SA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_srli_free(r >>> 0, 1));
class Wy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, SA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srli_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, SA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const TA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_srw_free(r >>> 0, 1));
class Yy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, TA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srw_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} status
   * @param {RegId} key_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, TA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const NA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_srwq_free(r >>> 0, 1));
class jy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, NA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_srwq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst_addr
   * @param {RegId} status
   * @param {RegId} key_addr
   * @param {RegId} lenq
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, NA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const DA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sub_free(r >>> 0, 1));
class Zy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, DA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sub_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, DA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const FA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_subi_free(r >>> 0, 1));
class Jy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, FA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_subi_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, FA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const QA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sw_free(r >>> 0, 1));
class qy {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, QA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sw_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} addr
   * @param {RegId} value
   * @param {Imm12} offset
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, QA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
const OA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_sww_free(r >>> 0, 1));
class $y {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, OA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_sww_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} key_addr
   * @param {RegId} status
   * @param {RegId} value
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, OA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const MA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_swwq_free(r >>> 0, 1));
class Ky {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, MA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_swwq_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} key_addr
   * @param {RegId} status
   * @param {RegId} src_addr
   * @param {RegId} lenq
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, MA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const PA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_time_free(r >>> 0, 1));
class tb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, PA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_time_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} heigth
   */
  constructor(t, e) {
    w(t, l);
    var n = t.__destroy_into_raw();
    w(e, l);
    var s = e.__destroy_into_raw();
    const i = c.bhsh_new_typescript(n, s);
    return this.__wbg_ptr = i >>> 0, PA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const LA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_tr_free(r >>> 0, 1));
class eb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, LA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_tr_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} contract_id_addr
   * @param {RegId} amount
   * @param {RegId} asset_id_addr
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, LA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const kA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_tro_free(r >>> 0, 1));
class rb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, kA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_tro_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} contract_id_addr
   * @param {RegId} output_index
   * @param {RegId} amount
   * @param {RegId} asset_id_addr
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, kA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const UA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdam_free(r >>> 0, 1));
class nb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, UA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdam_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} add_lhs
   * @param {RegId} add_rhs
   * @param {RegId} modulo
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, UA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const wc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdcm_free(r >>> 0, 1));
class Ya {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Ya.prototype);
    return e.__wbg_ptr = t, wc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, wc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdcm_free(t, 0);
  }
  /**
   * Construct a `WDCM` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {CompareArgs} args
   * @returns {WDCM}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, en);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_from_args(i, a, o, d);
    return Ya.__wrap(h);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, wc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const mc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wddv_free(r >>> 0, 1));
class ja {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(ja.prototype);
    return e.__wbg_ptr = t, mc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, mc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wddv_free(t, 0);
  }
  /**
   * Construct a `WDDV` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {DivArgs} args
   * @returns {WDDV}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, ca);
    var d = s.__destroy_into_raw();
    const h = c.wddv_from_args(i, a, o, d);
    return ja.__wrap(h);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, mc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const GA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdmd_free(r >>> 0, 1));
class sb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, GA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdmd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} divisor
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, GA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const yc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdml_free(r >>> 0, 1));
class Za {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Za.prototype);
    return e.__wbg_ptr = t, yc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, yc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdml_free(t, 0);
  }
  /**
   * Construct a `WDML` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {MulArgs} args
   * @returns {WDML}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, ua);
    var d = s.__destroy_into_raw();
    const h = c.wdml_from_args(i, a, o, d);
    return Za.__wrap(h);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, yc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const zA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdmm_free(r >>> 0, 1));
class ib {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, zA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdmm_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} modulo
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, zA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const bc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wdop_free(r >>> 0, 1));
class Ja {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Ja.prototype);
    return e.__wbg_ptr = t, bc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, bc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wdop_free(t, 0);
  }
  /**
   * Construct a `WDOP` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {MathArgs} args
   * @returns {WDOP}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, da);
    var d = s.__destroy_into_raw();
    const h = c.wdop_from_args(i, a, o, d);
    return Ja.__wrap(h);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, bc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const XA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqam_free(r >>> 0, 1));
class ab {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, XA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqam_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} add_lhs
   * @param {RegId} add_rhs
   * @param {RegId} modulo
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, XA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Ic = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqcm_free(r >>> 0, 1));
class qa {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(qa.prototype);
    return e.__wbg_ptr = t, Ic.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ic.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqcm_free(t, 0);
  }
  /**
   * Construct a `WQCM` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {CompareArgs} args
   * @returns {WQCM}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, en);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_from_args(i, a, o, d);
    return qa.__wrap(h);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Ic.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const Ec = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqdv_free(r >>> 0, 1));
class $a {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create($a.prototype);
    return e.__wbg_ptr = t, Ec.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Ec.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqdv_free(t, 0);
  }
  /**
   * Construct a `WQDV` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {DivArgs} args
   * @returns {WQDV}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, ca);
    var d = s.__destroy_into_raw();
    const h = c.wddv_from_args(i, a, o, d);
    return $a.__wrap(h);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Ec.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const HA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqmd_free(r >>> 0, 1));
class ob {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, HA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqmd_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} divisor
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, HA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Cc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqml_free(r >>> 0, 1));
class Ka {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(Ka.prototype);
    return e.__wbg_ptr = t, Cc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Cc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqml_free(t, 0);
  }
  /**
   * Construct a `WQML` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {MulArgs} args
   * @returns {WQML}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, ua);
    var d = s.__destroy_into_raw();
    const h = c.wdml_from_args(i, a, o, d);
    return Ka.__wrap(h);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Cc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const VA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqmm_free(r >>> 0, 1));
class cb {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, VA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqmm_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} mul_lhs
   * @param {RegId} mul_rhs
   * @param {RegId} modulo
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, l);
    var d = s.__destroy_into_raw();
    const h = c.bldd_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, VA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register D.
   * @returns {RegId}
   */
  rd() {
    const t = c.bldd_rd(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const Bc = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_wqop_free(r >>> 0, 1));
class to {
  static __wrap(t) {
    t = t >>> 0;
    const e = Object.create(to.prototype);
    return e.__wbg_ptr = t, Bc.register(e, e.__wbg_ptr, e), e;
  }
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, Bc.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_wqop_free(t, 0);
  }
  /**
   * Construct a `WQOP` instruction from its arguments.
   * @param {RegId} ra
   * @param {RegId} rb
   * @param {RegId} rc
   * @param {MathArgs} args
   * @returns {WQOP}
   */
  static from_args(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, da);
    var d = s.__destroy_into_raw();
    const h = c.wdop_from_args(i, a, o, d);
    return to.__wrap(h);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   * @param {Imm06} flags
   */
  constructor(t, e, n, s) {
    w(t, l);
    var i = t.__destroy_into_raw();
    w(e, l);
    var a = e.__destroy_into_raw();
    w(n, l);
    var o = n.__destroy_into_raw();
    w(s, Mt);
    var d = s.__destroy_into_raw();
    const h = c.wdcm_new_typescript(i, a, o, d);
    return this.__wbg_ptr = h >>> 0, Bc.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 6-bit immediate value.
   * @returns {Imm06}
   */
  imm06() {
    const t = c.jneb_imm06(this.__wbg_ptr);
    return Mt.__wrap(t);
  }
}
const WA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_xor_free(r >>> 0, 1));
class db {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, WA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_xor_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {RegId} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, l);
    var a = n.__destroy_into_raw();
    const o = c.add_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, WA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register C.
   * @returns {RegId}
   */
  rc() {
    const t = c.add_rc(this.__wbg_ptr);
    return l.__wrap(t);
  }
}
const YA = typeof FinalizationRegistry > "u" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((r) => c.__wbg_xori_free(r >>> 0, 1));
class ub {
  __destroy_into_raw() {
    const t = this.__wbg_ptr;
    return this.__wbg_ptr = 0, YA.unregister(this), t;
  }
  free() {
    const t = this.__destroy_into_raw();
    c.__wbg_xori_free(t, 0);
  }
  /**
   * Construct the instruction from its parts.
   * @param {RegId} dst
   * @param {RegId} lhs
   * @param {Imm12} rhs
   */
  constructor(t, e, n) {
    w(t, l);
    var s = t.__destroy_into_raw();
    w(e, l);
    var i = e.__destroy_into_raw();
    w(n, _t);
    var a = n.__destroy_into_raw();
    const o = c.addi_new_typescript(s, i, a);
    return this.__wbg_ptr = o >>> 0, YA.register(this, this.__wbg_ptr, this), this;
  }
  /**
   * Access the ID for register A.
   * @returns {RegId}
   */
  ra() {
    const t = c.add_ra(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the ID for register B.
   * @returns {RegId}
   */
  rb() {
    const t = c.add_rb(this.__wbg_ptr);
    return l.__wrap(t);
  }
  /**
   * Access the 12-bit immediate value.
   * @returns {Imm12}
   */
  imm12() {
    const t = c.addi_imm12(this.__wbg_ptr);
    return _t.__wrap(t);
  }
}
async function hb(r, t) {
  if (typeof Response == "function" && r instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function")
      try {
        return await WebAssembly.instantiateStreaming(r, t);
      } catch (n) {
        if (r.headers.get("Content-Type") != "application/wasm")
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", n);
        else
          throw n;
      }
    const e = await r.arrayBuffer();
    return await WebAssembly.instantiate(e, t);
  } else {
    const e = await WebAssembly.instantiate(r, t);
    return e instanceof WebAssembly.Instance ? { instance: e, module: r } : e;
  }
}
function h_() {
  const r = {};
  return r.wbg = {}, r.wbg.__wbindgen_throw = function(t, e) {
    throw new Error(aw(t, e));
  }, r;
}
function A_(r, t) {
  return c = r.exports, l_.__wbindgen_wasm_module = t, dn = null, zi = null, c;
}
function Ab(r) {
  if (c !== void 0) return c;
  typeof r < "u" && (Object.getPrototypeOf(r) === Object.prototype ? { module: r } = r : console.warn("using deprecated parameters for `initSync()`; pass a single object instead"));
  const t = h_();
  r instanceof WebAssembly.Module || (r = new WebAssembly.Module(r));
  const e = new WebAssembly.Instance(r, t);
  return A_(e, r);
}
async function l_(r) {
  if (c !== void 0) return c;
  typeof r < "u" && (Object.getPrototypeOf(r) === Object.prototype ? { module_or_path: r } = r : console.warn("using deprecated parameters for the initialization function; pass a single object instead"));
  const t = h_(), { instance: e, module: n } = await hb(await r, t);
  return A_(e, n);
}
function lb(r, t, e, n) {
  var s = null, i = typeof process < "u" && process.versions != null && process.versions.node != null;
  if (i)
    s = Buffer.from(e, "base64");
  else {
    var a = globalThis.atob(e), o = a.length;
    s = new Uint8Array(new ArrayBuffer(o));
    for (var d = 0; d < o; d++)
      s[d] = a.charCodeAt(d);
  }
  {
    var h = new WebAssembly.Module(s);
    return h;
  }
}
function _b(r) {
  return lb(1, null, "AGFzbQEAAAABRwxgA39/fwF/YAF/AX9gBH9/f38Bf2ACf38Bf2ACf38AYAABf2ABfwBgBX9/f39/AX9gA39/fwBgAn5/AX9gBH9/f38AYAAAAhgBA3diZxBfX3diaW5kZ2VuX3Rocm93AAQDigKIAgEDCQEEBAQEBAEEAQQEAQMKAQEEAQQBAQEDAQQEAQEEAQEEAgEBBAICAgICAgQEBAMDAwMDAwMDAgEBBAQABAICAwAAAwMDAwMDAwMDAwABAQQEBAEBAQEBAQECAQYBAQEEBgYBAQEEBAICAQUAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAQEDAAEHAgIGBAQAAgAGCAMBAwELAwMDBAEBBAYBBQQFBQUFBQUFBQUFBQUFBQUFBQUEBwcCAgMCBwcAAAgAAwQFAXABCAgFAwEAEQYJAX8BQYCAwAALB8FN3QUGbWVtb3J5AgAWX193YmdfY29tcGFyZWFyZ3NfZnJlZQAUGl9fd2JnX2dldF9jb21wYXJlYXJnc19tb2RlAFAaX193Ymdfc2V0X2NvbXBhcmVhcmdzX21vZGUAPCJfX3diZ19nZXRfY29tcGFyZWFyZ3NfaW5kaXJlY3RfcmhzAFEiX193Ymdfc2V0X2NvbXBhcmVhcmdzX2luZGlyZWN0X3JocwBTEmNvbXBhcmVhcmdzX3RvX2ltbQBfFGNvbXBhcmVhcmdzX2Zyb21faW1tABUVX193YmdfZ2V0X21hdGhhcmdzX29wAFAVX193Ymdfc2V0X21hdGhhcmdzX29wAD0SX193YmdfbXVsYXJnc19mcmVlABYeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAFAeX193Ymdfc2V0X211bGFyZ3NfaW5kaXJlY3RfcmhzAFQSX193YmdfZGl2YXJnc19mcmVlACceX193YmdfZ2V0X2RpdmFyZ3NfaW5kaXJlY3RfcmhzAMABHl9fd2JnX3NldF9kaXZhcmdzX2luZGlyZWN0X3JocwBpG19fd2JnX3BhbmljaW5zdHJ1Y3Rpb25fZnJlZQAcIXBhbmljaW5zdHJ1Y3Rpb25fZXJyb3JfdHlwZXNjcmlwdABCF3BhbmljaW5zdHJ1Y3Rpb25fcmVhc29uAGAccGFuaWNpbnN0cnVjdGlvbl9pbnN0cnVjdGlvbgBhDGdtX2Zyb21fYXJncwDbAQ1ndGZfZnJvbV9hcmdzANQBB2dtX2FyZ3MAjwEIZ3RmX2FyZ3MAbg53ZGNtX2Zyb21fYXJncwBADndkb3BfZnJvbV9hcmdzAEAOd2RtbF9mcm9tX2FyZ3MAQQ53ZGR2X2Zyb21fYXJncwDPAQl3ZGNtX2FyZ3MAKAl3cWNtX2FyZ3MAKQl3ZG9wX2FyZ3MAKgl3cW9wX2FyZ3MAKwl3ZG1sX2FyZ3MALAl3cW1sX2FyZ3MALQl3ZGR2X2FyZ3MAagl3cWR2X2FyZ3MAaxBfX3diZ19pbW0wNl9mcmVlAC4QX193YmdfaW1tMTJfZnJlZQAvEF9fd2JnX2ltbTE4X2ZyZWUAMA5fX3diZ19hZGRfZnJlZQAdD19fd2JnX25vb3BfZnJlZQAJEmFkZF9uZXdfdHlwZXNjcmlwdABDBmFkZF9yYQA6BmFkZF9yYgAXBmFkZF9yYwAeA2FkZADMAQNhbmQAkQEDZGl2AJIBAmVxAJMBA2V4cACUAQJndACVAQJsdACWAQRtbG9nAJcBBG1yb28AmAEEbW9kXwCZAQVtb3ZlXwBFA211bACaAQNub3QARgJvcgCbAQNzbGwAnAEDc3JsAJ0BA3N1YgCeAQN4b3IAnwEEbWxkdgBvA3JldADBAQRyZXRkAEcTYWxvY19uZXdfdHlwZXNjcmlwdABdB2Fsb2NfcmEAJQRhbG9jAMIBA21jbABIA21jcACgAQNtZXEAcBNiaHNoX25ld190eXBlc2NyaXB0ABoEYmhzaAAxBGJoZWkAwwEEYnVybgBJBGNhbGwAcQNjY3AAcgRjcm9vAEoEY3NpegBLAmNiAMQBA2xkYwBzA2xvZwB0BGxvZ2QAdQRtaW50AEwEcnZydADFAQRzY3dxAKEBA3NydwCiAQRzcndxAHYDc3d3AKMBBHN3d3EAdwJ0cgCkAQN0cm8AeARlY2sxAKUBBGVjcjEApgEEZWQxOQB5BGsyNTYApwEEczI1NgCoAQR0aW1lAE0Tbm9vcF9uZXdfdHlwZXNjcmlwdABtBG5vb3AA5wEEZmxhZwDGAQNiYWwAqQEDam1wAMcBA2puZQCqAQNzbW8AehNhZGRpX25ld190eXBlc2NyaXB0AEQKYWRkaV9pbW0xMgAKBGFkZGkAqwEEYW5kaQCsAQRkaXZpAK0BBGV4cGkArgEEbW9kaQCvAQRtdWxpALABA29yaQCxAQRzbGxpALIBBHNybGkAswEEc3ViaQC0AQR4b3JpALUBBGpuZWkAtgECbGIAtwECbHcAuAECc2IAuQECc3cAugEEbWNwaQC7ARJndGZfbmV3X3R5cGVzY3JpcHQA1gEDZ3RmALwBBG1jbGkAMhFnbV9uZXdfdHlwZXNjcmlwdABOCGdtX2ltbTE4AA8CZ20AMwRtb3ZpADQEam56aQA1BGptcGYANhNqbXBiX25ld190eXBlc2NyaXB0ABAEam1wYgA3BGpuemYAvQEEam56YgC+AQRqbmVmAHsKam5lYl9pbW0wNgA7BGpuZWIAfAJqaQBVE2NmZWlfbmV3X3R5cGVzY3JpcHQAJgpjZmVpX2ltbTI0AAwEY2ZlaQBWBGNmc2kAVwNjZmUAyAEDY2ZzAMkBBHBzaGwAWARwc2hoAFkEcG9wbABaBHBvcGgAWxN3ZGNtX25ld190eXBlc2NyaXB0ANABBHdkY20AfQR3cWNtAH4Ed2RvcAB/BHdxb3AAgAEEd2RtbACBAQR3cW1sAIIBBHdkZHYAgwEEd3FkdgCEAQR3ZG1kAIUBBHdxbWQAhgEEd2RhbQCHAQR3cWFtAIgBBHdkbW0AiQEEd3FtbQCKAQRlY2FsAIsBBGJzaXoAOBNibGRkX25ld190eXBlc2NyaXB0ADkHYmxkZF9yZAA7BGJsZGQAjAEEZWNvcACNAQRlcGFyAI4BFl9fd2JnX2luc3RydWN0aW9uX2ZyZWUADhRpbnN0cnVjdGlvbl90b19ieXRlcwAIEGluc3RydWN0aW9uX3NpemUA+gERcmVnaWRfbmV3X2NoZWNrZWQAvwEJcmVnaWRfYmFsAOkBCnJlZ2lkX2NnYXMA6gEJcmVnaWRfZXJyAOsBCnJlZ2lkX2ZsYWcA7AEIcmVnaWRfZnAA7QEKcmVnaWRfZ2dhcwDuAQhyZWdpZF9ocADvAQhyZWdpZF9pcwDwAQhyZWdpZF9vZgDxAQlyZWdpZF9vbmUA8gEIcmVnaWRfcGMA8wEJcmVnaWRfcmV0APQBCnJlZ2lkX3JldGwA9QEIcmVnaWRfc3AA9gEJcmVnaWRfc3BwAPcBDnJlZ2lkX3dyaXRhYmxlAPgBCnJlZ2lkX3plcm8A+QEUcmVnaWRfbmV3X3R5cGVzY3JpcHQA4gELcmVnaWRfdG9fdTgA4wESYW5kX25ld190eXBlc2NyaXB0AEMSZGl2X25ld190eXBlc2NyaXB0AEMRZXFfbmV3X3R5cGVzY3JpcHQAQxJleHBfbmV3X3R5cGVzY3JpcHQAQxFndF9uZXdfdHlwZXNjcmlwdABDEWx0X25ld190eXBlc2NyaXB0AEMTbWxvZ19uZXdfdHlwZXNjcmlwdABDE21yb29fbmV3X3R5cGVzY3JpcHQAQxJtb2RfbmV3X3R5cGVzY3JpcHQAQxJtdWxfbmV3X3R5cGVzY3JpcHQAQxFvcl9uZXdfdHlwZXNjcmlwdABDEnNsbF9uZXdfdHlwZXNjcmlwdABDEnNybF9uZXdfdHlwZXNjcmlwdABDEnN1Yl9uZXdfdHlwZXNjcmlwdABDEnhvcl9uZXdfdHlwZXNjcmlwdABDEm1jcF9uZXdfdHlwZXNjcmlwdABDE3Njd3FfbmV3X3R5cGVzY3JpcHQAQxJzcndfbmV3X3R5cGVzY3JpcHQAQxJzd3dfbmV3X3R5cGVzY3JpcHQAQxF0cl9uZXdfdHlwZXNjcmlwdABDE2VjazFfbmV3X3R5cGVzY3JpcHQAQxNlY3IxX25ld190eXBlc2NyaXB0AEMTazI1Nl9uZXdfdHlwZXNjcmlwdABDE3MyNTZfbmV3X3R5cGVzY3JpcHQAQxJiYWxfbmV3X3R5cGVzY3JpcHQAQxJqbmVfbmV3X3R5cGVzY3JpcHQAQxNhbmRpX25ld190eXBlc2NyaXB0AEQTZGl2aV9uZXdfdHlwZXNjcmlwdABEE2V4cGlfbmV3X3R5cGVzY3JpcHQARBNtb2RpX25ld190eXBlc2NyaXB0AEQTbXVsaV9uZXdfdHlwZXNjcmlwdABEEm9yaV9uZXdfdHlwZXNjcmlwdABEE3NsbGlfbmV3X3R5cGVzY3JpcHQARBNzcmxpX25ld190eXBlc2NyaXB0AEQTc3ViaV9uZXdfdHlwZXNjcmlwdABEE3hvcmlfbmV3X3R5cGVzY3JpcHQARBNqbmVpX25ld190eXBlc2NyaXB0AEQRbGJfbmV3X3R5cGVzY3JpcHQARBFsd19uZXdfdHlwZXNjcmlwdABEEXNiX25ld190eXBlc2NyaXB0AEQRc3dfbmV3X3R5cGVzY3JpcHQARBNtY3BpX25ld190eXBlc2NyaXB0AEQTam56Zl9uZXdfdHlwZXNjcmlwdABEE2puemJfbmV3X3R5cGVzY3JpcHQARBFqaV9uZXdfdHlwZXNjcmlwdAAmE2Nmc2lfbmV3X3R5cGVzY3JpcHQAJhNwc2hsX25ld190eXBlc2NyaXB0ACYTcHNoaF9uZXdfdHlwZXNjcmlwdAAmE3BvcGxfbmV3X3R5cGVzY3JpcHQAJhNwb3BoX25ld190eXBlc2NyaXB0ACYSbm90X25ld190eXBlc2NyaXB0ABoTcmV0ZF9uZXdfdHlwZXNjcmlwdAAaE21vdmVfbmV3X3R5cGVzY3JpcHQAGhJtY2xfbmV3X3R5cGVzY3JpcHQAGhNidXJuX25ld190eXBlc2NyaXB0ABoTY3Jvb19uZXdfdHlwZXNjcmlwdAAaE2NzaXpfbmV3X3R5cGVzY3JpcHQAGhNtaW50X25ld190eXBlc2NyaXB0ABoTdGltZV9uZXdfdHlwZXNjcmlwdAAaE2JzaXpfbmV3X3R5cGVzY3JpcHQAGhJyZXRfbmV3X3R5cGVzY3JpcHQAXRNiaGVpX25ld190eXBlc2NyaXB0AF0RY2JfbmV3X3R5cGVzY3JpcHQAXRNydnJ0X25ld190eXBlc2NyaXB0AF0TZmxhZ19uZXdfdHlwZXNjcmlwdABdEmptcF9uZXdfdHlwZXNjcmlwdABdEmNmZV9uZXdfdHlwZXNjcmlwdABdEmNmc19uZXdfdHlwZXNjcmlwdABdE21sZHZfbmV3X3R5cGVzY3JpcHQAORJtZXFfbmV3X3R5cGVzY3JpcHQAORJjY3BfbmV3X3R5cGVzY3JpcHQAORJsb2dfbmV3X3R5cGVzY3JpcHQAORNsb2dkX25ld190eXBlc2NyaXB0ADkTc3J3cV9uZXdfdHlwZXNjcmlwdAA5E3N3d3FfbmV3X3R5cGVzY3JpcHQAORJ0cm9fbmV3X3R5cGVzY3JpcHQAORNlZDE5X25ld190eXBlc2NyaXB0ADkSc21vX25ld190eXBlc2NyaXB0ADkSbGRjX25ld190eXBlc2NyaXB0ADkTam5lZl9uZXdfdHlwZXNjcmlwdAA5E3dkbWRfbmV3X3R5cGVzY3JpcHQAORN3cW1kX25ld190eXBlc2NyaXB0ADkTd2RhbV9uZXdfdHlwZXNjcmlwdAA5E3dxYW1fbmV3X3R5cGVzY3JpcHQAORN3ZG1tX25ld190eXBlc2NyaXB0ADkTd3FtbV9uZXdfdHlwZXNjcmlwdAA5E2VjYWxfbmV3X3R5cGVzY3JpcHQAORNjYWxsX25ld190eXBlc2NyaXB0ADkTZWNvcF9uZXdfdHlwZXNjcmlwdAA5E2VwYXJfbmV3X3R5cGVzY3JpcHQAOQZyZXRfcmEAJQdiaGVpX3JhACUFY2JfcmEAJQdydnJ0X3JhACUHZmxhZ19yYQAlBmptcF9yYQAlCGppX2ltbTI0AAwKY2ZzaV9pbW0yNAAMBmNmZV9yYQAlBmNmc19yYQAlCnBzaGxfaW1tMjQADApwc2hoX2ltbTI0AAwKcG9wbF9pbW0yNAAMCnBvcGhfaW1tMjQADBNtb3ZpX25ld190eXBlc2NyaXB0ABATbWNsaV9uZXdfdHlwZXNjcmlwdAAQE2puemlfbmV3X3R5cGVzY3JpcHQAEBNqbXBmX25ld190eXBlc2NyaXB0ABATX193YmdfbWF0aGFyZ3NfZnJlZQAUH19fd2JnX3NldF9tYXRoYXJnc19pbmRpcmVjdF9yaHMAUx5fX3diZ19zZXRfbXVsYXJnc19pbmRpcmVjdF9saHMAUx9fX3diZ19nZXRfbWF0aGFyZ3NfaW5kaXJlY3RfcmhzAFEeX193YmdfZ2V0X211bGFyZ3NfaW5kaXJlY3RfbGhzAFEPX193YmdfZXhwaV9mcmVlAB0PX193YmdfYmhlaV9mcmVlAB0PX193Ymdfd2RtbF9mcmVlAB0PX193YmdfcHNobF9mcmVlAB0OX193YmdfbG9nX2ZyZWUAHQ5fX3diZ19jY3BfZnJlZQAdD19fd2JnX2VjazFfZnJlZQAdD19fd2JnX2VjcjFfZnJlZQAdDl9fd2JnX3Ntb19mcmVlAB0OX193Ymdfb3JpX2ZyZWUAHQ5fX3diZ190cm9fZnJlZQAdDl9fd2JnX21lcV9mcmVlAB0OX193YmdfY2ZzX2ZyZWUAHQ5fX3diZ19kaXZfZnJlZQAdDV9fd2JnX2x0X2ZyZWUAHQ9fX3diZ19iaHNoX2ZyZWUAHQ1fX3diZ19zYl9mcmVlAB0PX193Ymdfd2RtZF9mcmVlAB0NX193YmdfdHJfZnJlZQAdDl9fd2JnX3hvcl9mcmVlAB0PX193Ymdfam5lYl9mcmVlAB0PX193Ymdfam5lZl9mcmVlAB0PX193YmdfY3Npel9mcmVlAB0PX193YmdfY3Jvb19mcmVlAB0PX193YmdfZGl2aV9mcmVlAB0NX193YmdfZ21fZnJlZQAdD19fd2JnX21vZGlfZnJlZQAdD19fd2JnX3hvcmlfZnJlZQAdDV9fd2JnX2NiX2ZyZWUAHQ9fX3diZ193ZGNtX2ZyZWUAHQ5fX3diZ19qbXBfZnJlZQAdD19fd2JnX3dxYW1fZnJlZQAdDl9fd2JnX2xkY19mcmVlAB0PX193YmdfZWQxOV9mcmVlAB0NX193Ymdfc3dfZnJlZQAdD19fd2JnX3RpbWVfZnJlZQAdD19fd2JnX2Vjb3BfZnJlZQAdD19fd2JnX3Njd3FfZnJlZQAdD19fd2JnX3dxbW1fZnJlZQAdD19fd2JnX3dkYW1fZnJlZQAdDV9fd2JnX2xiX2ZyZWUAHQ1fX3diZ19qaV9mcmVlAB0PX193YmdfazI1Nl9mcmVlAB0PX193YmdfYW5kaV9mcmVlAB0PX193Ymdfam56aV9mcmVlAB0PX193Ymdfc3J3cV9mcmVlAB0OX193Ymdfbm90X2ZyZWUAHQ5fX3diZ19jZmVfZnJlZQAdD19fd2JnX2xvZ2RfZnJlZQAdDl9fd2JnX3Nyd19mcmVlAB0PX193YmdfcnZydF9mcmVlAB0PX193YmdfcHNoaF9mcmVlAB0OX193Ymdfc3JsX2ZyZWUAHQ5fX3diZ19tdWxfZnJlZQAdD19fd2JnX2ZsYWdfZnJlZQAdD19fd2JnX21jcGlfZnJlZQAdDl9fd2JnX21vZF9mcmVlAB0PX193YmdfbW92aV9mcmVlAB0OX193YmdfcmV0X2ZyZWUAHQ9fX3diZ19tcm9vX2ZyZWUAHQ9fX3diZ193cWR2X2ZyZWUAHQ1fX3diZ19sd19mcmVlAB0PX193Ymdfd3FtZF9mcmVlAB0OX193Ymdfc3d3X2ZyZWUAHQ5fX3diZ19ndGZfZnJlZQAdD19fd2JnX3BvcGhfZnJlZQAdDV9fd2JnX29yX2ZyZWUAHQ9fX3diZ19tb3ZlX2ZyZWUAHQ9fX3diZ193ZGR2X2ZyZWUAHQ9fX3diZ19yZXRkX2ZyZWUAHQ5fX3diZ19iYWxfZnJlZQAdD19fd2JnX2FkZGlfZnJlZQAdDl9fd2JnX2FuZF9mcmVlAB0PX193YmdfbWNsaV9mcmVlAB0PX193Ymdfd3FtbF9mcmVlAB0PX193Ymdfc2xsaV9mcmVlAB0PX193Ymdfd2RvcF9mcmVlAB0OX193Ymdfc2xsX2ZyZWUAHQ9fX3diZ19lY2FsX2ZyZWUAHQ9fX3diZ193cWNtX2ZyZWUAHQ9fX3diZ19zd3dxX2ZyZWUAHQ9fX3diZ19tbGR2X2ZyZWUAHQ1fX3diZ19ndF9mcmVlAB0NX193YmdfZXFfZnJlZQAdDl9fd2JnX2puZV9mcmVlAB0PX193Ymdfam5laV9mcmVlAB0PX193Ymdfam1wZl9mcmVlAB0OX193YmdfZXhwX2ZyZWUAHQ9fX3diZ19zMjU2X2ZyZWUAHQ5fX3diZ19zdWJfZnJlZQAdDl9fd2JnX21jcF9mcmVlAB0PX193YmdfZXBhcl9mcmVlAB0PX193YmdfY2ZlaV9mcmVlAB0PX193YmdfY2ZzaV9mcmVlAB0PX193Ymdfam56Zl9mcmVlAB0PX193YmdfbWludF9mcmVlAB0PX193YmdfYnNpel9mcmVlAB0PX193YmdfYnVybl9mcmVlAB0PX193Ymdfd2RtbV9mcmVlAB0PX193Ymdfam1wYl9mcmVlAB0PX193Ymdfc3JsaV9mcmVlAB0PX193Ymdfc3ViaV9mcmVlAB0PX193Ymdfam56Yl9mcmVlAB0PX193YmdfbXVsaV9mcmVlAB0PX193Ymdfd3FvcF9mcmVlAB0PX193YmdfcG9wbF9mcmVlAB0OX193YmdfbWNsX2ZyZWUAHQ9fX3diZ19jYWxsX2ZyZWUAHQ9fX3diZ19tbG9nX2ZyZWUAHQ9fX3diZ19ibGRkX2ZyZWUAHQ9fX3diZ19hbG9jX2ZyZWUAHRN3cWR2X25ld190eXBlc2NyaXB0ANABE3dxbWxfbmV3X3R5cGVzY3JpcHQA0AETd2RtbF9uZXdfdHlwZXNjcmlwdADQARN3cW9wX25ld190eXBlc2NyaXB0ANABE3dkb3BfbmV3X3R5cGVzY3JpcHQA0AETd3FjbV9uZXdfdHlwZXNjcmlwdADQARN3ZGR2X25ld190eXBlc2NyaXB0ANABDndxY21fZnJvbV9hcmdzAEAKd3Fkdl9pbW0wNgA7CndxbWxfaW1tMDYAOwp3ZG1sX2ltbTA2ADsKd3FvcF9pbW0wNgA7Cndkb3BfaW1tMDYAOwp3cWNtX2ltbTA2ADsKd2Rkdl9pbW0wNgA7CndkY21faW1tMDYAOwpqbmVmX2ltbTA2ADsJbGRjX2ltbTA2ADsOd3Fkdl9mcm9tX2FyZ3MAzwEOd3FtbF9mcm9tX2FyZ3MAQQ53cW9wX2Zyb21fYXJncwBABWdtX3JhADoFZ3RfcmMAHgVndF9yYgAXBWd0X3JhADoFbGJfcmIAFwVsYl9yYQA6BWx0X3JjAB4FbHRfcmIAFwVsdF9yYQA6CGx3X2ltbTEyAAoFbHdfcmIAFwVsd19yYQA6BW9yX3JjAB4Fb3JfcmIAFwVvcl9yYQA6CHNiX2ltbTEyAAoFc2JfcmIAFwVzYl9yYQA6CHN3X2ltbTEyAAoFc3dfcmIAFwVzd19yYQA6BXRyX3JjAB4FdHJfcmIAFwV0cl9yYQA6BWVxX3JjAB4FZXFfcmIAFwVlcV9yYQA6BmFuZF9yYwAeBmFuZF9yYgAXBmFuZF9yYQA6BmJhbF9yYwAeBmJhbF9yYgAXBmJhbF9yYQA6BmNjcF9yYwAeBmNjcF9yYgAXBmNjcF9yYQA6BmRpdl9yYwAeBmRpdl9yYgAXBmRpdl9yYQA6BmV4cF9yYwAeBmV4cF9yYgAXBmV4cF9yYQA6CGxiX2ltbTEyAAoGZ3RmX3JiABcGZ3RmX3JhADoGam5lX3JjAB4Gam5lX3JiABcGam5lX3JhADoGbGRjX3JjAB4GbGRjX3JiABcGbGRjX3JhADoGbG9nX3JkADsGbG9nX3JjAB4GbG9nX3JiABcGbG9nX3JhADoGbWNsX3JiABcGbWNsX3JhADoGbWNwX3JjAB4GbWNwX3JiABcGbWNwX3JhADoGbWVxX3JkADsGbWVxX3JjAB4GbWVxX3JiABcGbWVxX3JhADoGbW9kX3JjAB4GbW9kX3JiABcGbW9kX3JhADoGbXVsX3JjAB4GbXVsX3JiABcGbXVsX3JhADoGbm90X3JiABcGbm90X3JhADoJb3JpX2ltbTEyAAoGb3JpX3JiABcGb3JpX3JhADoGc2xsX3JjAB4Gc2xsX3JiABcGc2xsX3JhADoGc21vX3JkADsGc21vX3JjAB4Gc21vX3JiABcGc21vX3JhADoGc3JsX3JjAB4Gc3JsX3JiABcGc3JsX3JhADoGc3J3X3JjAB4Gc3J3X3JiABcGc3J3X3JhADoGc3ViX3JjAB4Gc3ViX3JiABcGc3ViX3JhADoGc3d3X3JjAB4Gc3d3X3JiABcGc3d3X3JhADoGdHJvX3JkADsGdHJvX3JjAB4GdHJvX3JiABcGdHJvX3JhADoGeG9yX3JjAB4GeG9yX3JiABcGeG9yX3JhADoJZ3RmX2ltbTEyAAoHYWRkaV9yYgAXB2FkZGlfcmEAOgphbmRpX2ltbTEyAAoHYW5kaV9yYgAXB2FuZGlfcmEAOgdiaHNoX3JiABcHYmhzaF9yYQA6BmNjcF9yZAA7B2JsZGRfcmMAHgdibGRkX3JiABcHYmxkZF9yYQA6B2JzaXpfcmIAFwdic2l6X3JhADoHYnVybl9yYgAXB2J1cm5fcmEAOgdjYWxsX3JkADsHY2FsbF9yYwAeB2NhbGxfcmIAFwdjYWxsX3JhADoHY3Jvb19yYgAXB2Nyb29fcmEAOgdjc2l6X3JiABcHY3Npel9yYQA6CmRpdmlfaW1tMTIACgdkaXZpX3JiABcHZGl2aV9yYQA6B2VjYWxfcmQAOwdlY2FsX3JjAB4HZWNhbF9yYgAXB2VjYWxfcmEAOgdlY2sxX3JjAB4HZWNrMV9yYgAXB2VjazFfcmEAOgdlY29wX3JkADsHZWNvcF9yYwAeB2Vjb3BfcmIAFwdlY29wX3JhADoHZWNyMV9yYwAeB2VjcjFfcmIAFwdlY3IxX3JhADoHZWQxOV9yZAA7B2VkMTlfcmMAHgdlZDE5X3JiABcHZWQxOV9yYQA6B2VwYXJfcmQAOwdlcGFyX3JjAB4HZXBhcl9yYgAXB2VwYXJfcmEAOgpleHBpX2ltbTEyAAoHZXhwaV9yYgAXB2V4cGlfcmEAOgpqbXBiX2ltbTE4AA8Ham1wYl9yYQA6CmptcGZfaW1tMTgADwdqbXBmX3JhADoHam5lYl9yYwAeB2puZWJfcmIAFwdqbmViX3JhADoHam5lZl9yYwAeB2puZWZfcmIAFwdqbmVmX3JhADoKam5laV9pbW0xMgAKB2puZWlfcmIAFwdqbmVpX3JhADoKam56Yl9pbW0xMgAKB2puemJfcmIAFwdqbnpiX3JhADoKam56Zl9pbW0xMgAKB2puemZfcmIAFwdqbnpmX3JhADoKam56aV9pbW0xOAAPB2puemlfcmEAOgdrMjU2X3JjAB4HazI1Nl9yYgAXB2syNTZfcmEAOgdsb2dkX3JkADsHbG9nZF9yYwAeB2xvZ2RfcmIAFwdsb2dkX3JhADoKbWNsaV9pbW0xOAAPB21jbGlfcmEAOgptY3BpX2ltbTEyAAoHbWNwaV9yYgAXB21jcGlfcmEAOgdtaW50X3JiABcHbWludF9yYQA6B21sZHZfcmQAOwdtbGR2X3JjAB4HbWxkdl9yYgAXB21sZHZfcmEAOgdtbG9nX3JjAB4HbWxvZ19yYgAXB21sb2dfcmEAOgptb2RpX2ltbTEyAAoHbW9kaV9yYgAXB21vZGlfcmEAOgdtb3ZlX3JiABcHbW92ZV9yYQA6Cm1vdmlfaW1tMTgADwdtb3ZpX3JhADoHbXJvb19yYwAeB21yb29fcmIAFwdtcm9vX3JhADoKbXVsaV9pbW0xMgAKB211bGlfcmIAFwdtdWxpX3JhADoHcmV0ZF9yYgAXB3JldGRfcmEAOgdzMjU2X3JjAB4HczI1Nl9yYgAXB3MyNTZfcmEAOgdzY3dxX3JjAB4Hc2N3cV9yYgAXB3Njd3FfcmEAOgpzbGxpX2ltbTEyAAoHc2xsaV9yYgAXB3NsbGlfcmEAOgpzcmxpX2ltbTEyAAoHc3JsaV9yYgAXB3NybGlfcmEAOgdzcndxX3JkADsHc3J3cV9yYwAeB3Nyd3FfcmIAFwdzcndxX3JhADoKc3ViaV9pbW0xMgAKB3N1YmlfcmIAFwdzdWJpX3JhADoHc3d3cV9yZAA7B3N3d3FfcmMAHgdzd3dxX3JiABcHc3d3cV9yYQA6B3RpbWVfcmIAFwd0aW1lX3JhADoHd2RhbV9yZAA7B3dkYW1fcmMAHgd3ZGFtX3JiABcHd2RhbV9yYQA6B3dkY21fcmMAHgd3ZGNtX3JiABcHd2RjbV9yYQA6B3dkZHZfcmMAHgd3ZGR2X3JiABcHd2Rkdl9yYQA6B3dkbWRfcmQAOwd3ZG1kX3JjAB4Hd2RtZF9yYgAXB3dkbWRfcmEAOgd3ZG1sX3JjAB4Hd2RtbF9yYgAXB3dkbWxfcmEAOgd3ZG1tX3JkADsHd2RtbV9yYwAeB3dkbW1fcmIAFwd3ZG1tX3JhADoHd2RvcF9yYwAeB3dkb3BfcmIAFwd3ZG9wX3JhADoHd3FhbV9yZAA7B3dxYW1fcmMAHgd3cWFtX3JiABcHd3FhbV9yYQA6B3dxY21fcmMAHgd3cWNtX3JiABcHd3FjbV9yYQA6B3dxZHZfcmMAHgd3cWR2X3JiABcHd3Fkdl9yYQA6B3dxbWRfcmQAOwd3cW1kX3JjAB4Hd3FtZF9yYgAXB3dxbWRfcmEAOgd3cW1sX3JjAB4Hd3FtbF9yYgAXB3dxbWxfcmEAOgd3cW1tX3JkADsHd3FtbV9yYwAeB3dxbW1fcmIAFwd3cW1tX3JhADoHd3FvcF9yYwAeB3dxb3BfcmIAFwd3cW9wX3JhADoKeG9yaV9pbW0xMgAKB3hvcmlfcmIAFwd4b3JpX3JhADoTam5lYl9uZXdfdHlwZXNjcmlwdAA5EF9fd2JnX3JlZ2lkX2ZyZWUALhBfX3diZ19pbW0yNF9mcmVlADAfX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcgDcARNfX3diaW5kZ2VuX2V4cG9ydF8wANgBCRMBAEEBCwcC3gHfAeAB6AHkAdEBCvOQAYgC7SICCH8BfgJAAkACQAJAAkACQAJAAkAgAEH1AU8EQCAAQc3/e08NBSAAQQtqIgBBeHEhBUHsj8AAKAIAIghFDQRBACAFayEEAn9BACAFQYACSQ0AGkEfIAVB////B0sNABogBUEGIABBCHZnIgBrdkEBcSAAQQF0a0E+agsiB0ECdEHQjMAAaigCACICRQRAQQAhAAwCC0EAIQAgBUEZIAdBAXZrQQAgB0EfRxt0IQMDQAJAIAIoAgRBeHEiBiAFSQ0AIAYgBWsiBiAETw0AIAIhASAGIgQNAEEAIQQgASEADAQLIAIoAhQiBiAAIAYgAiADQR12QQRxakEQaigCACICRxsgACAGGyEAIANBAXQhAyACDQALDAELQeiPwAAoAgAiAkEQIABBC2pB+ANxIABBC0kbIgVBA3YiAHYiAUEDcQRAAkAgAUF/c0EBcSAAaiIBQQN0IgBB4I3AAGoiAyAAQeiNwABqKAIAIgAoAggiBEcEQCAEIAM2AgwgAyAENgIIDAELQeiPwAAgAkF+IAF3cTYCAAsgACABQQN0IgFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMCAsgBUHwj8AAKAIATQ0DAkACQCABRQRAQeyPwAAoAgAiAEUNBiAAaEECdEHQjMAAaigCACIBKAIEQXhxIAVrIQQgASECA0ACQCABKAIQIgANACABKAIUIgANACACKAIYIQcCQAJAIAIgAigCDCIARgRAIAJBFEEQIAIoAhQiABtqKAIAIgENAUEAIQAMAgsgAigCCCIBIAA2AgwgACABNgIIDAELIAJBFGogAkEQaiAAGyEDA0AgAyEGIAEiAEEUaiAAQRBqIAAoAhQiARshAyAAQRRBECABG2ooAgAiAQ0ACyAGQQA2AgALIAdFDQQgAiACKAIcQQJ0QdCMwABqIgEoAgBHBEAgB0EQQRQgBygCECACRhtqIAA2AgAgAEUNBQwECyABIAA2AgAgAA0DQeyPwABB7I/AACgCAEF+IAIoAhx3cTYCAAwECyAAKAIEQXhxIAVrIgEgBCABIARJIgEbIQQgACACIAEbIQIgACEBDAALAAsCQEECIAB0IgNBACADa3IgASAAdHFoIgBBA3QiAUHgjcAAaiIDIAFB6I3AAGooAgAiASgCCCIERwRAIAQgAzYCDCADIAQ2AggMAQtB6I/AACACQX4gAHdxNgIACyABIAVBA3I2AgQgASAFaiIGIABBA3QiACAFayIEQQFyNgIEIAAgAWogBDYCAEHwj8AAKAIAIgIEQCACQXhxQeCNwABqIQBB+I/AACgCACEDAn9B6I/AACgCACIFQQEgAkEDdnQiAnFFBEBB6I/AACACIAVyNgIAIAAMAQsgACgCCAshAiAAIAM2AgggAiADNgIMIAMgADYCDCADIAI2AggLQfiPwAAgBjYCAEHwj8AAIAQ2AgAgAUEIag8LIAAgBzYCGCACKAIQIgEEQCAAIAE2AhAgASAANgIYCyACKAIUIgFFDQAgACABNgIUIAEgADYCGAsCQAJAIARBEE8EQCACIAVBA3I2AgQgAiAFaiIFIARBAXI2AgQgBCAFaiAENgIAQfCPwAAoAgAiA0UNASADQXhxQeCNwABqIQBB+I/AACgCACEBAn9B6I/AACgCACIGQQEgA0EDdnQiA3FFBEBB6I/AACADIAZyNgIAIAAMAQsgACgCCAshAyAAIAE2AgggAyABNgIMIAEgADYCDCABIAM2AggMAQsgAiAEIAVqIgBBA3I2AgQgACACaiIAIAAoAgRBAXI2AgQMAQtB+I/AACAFNgIAQfCPwAAgBDYCAAsgAkEIag8LIAAgAXJFBEBBACEBQQIgB3QiAEEAIABrciAIcSIARQ0DIABoQQJ0QdCMwABqKAIAIQALIABFDQELA0AgACABIAAoAgRBeHEiAyAFayIGIARJIgcbIQggACgCECICRQRAIAAoAhQhAgsgASAIIAMgBUkiABshASAEIAYgBCAHGyAAGyEEIAIiAA0ACwsgAUUNACAFQfCPwAAoAgAiAE0gBCAAIAVrT3ENACABKAIYIQcCQAJAIAEgASgCDCIARgRAIAFBFEEQIAEoAhQiABtqKAIAIgINAUEAIQAMAgsgASgCCCICIAA2AgwgACACNgIIDAELIAFBFGogAUEQaiAAGyEDA0AgAyEGIAIiAEEUaiAAQRBqIAAoAhQiAhshAyAAQRRBECACG2ooAgAiAg0ACyAGQQA2AgALIAdFDQMgASABKAIcQQJ0QdCMwABqIgIoAgBHBEAgB0EQQRQgBygCECABRhtqIAA2AgAgAEUNBAwDCyACIAA2AgAgAA0CQeyPwABB7I/AACgCAEF+IAEoAhx3cTYCAAwDCwJAAkACQAJAAkAgBUHwj8AAKAIAIgFLBEAgBUH0j8AAKAIAIgBPBEBBACEEIAVBr4AEaiIAQRB2QAAiAUF/RiIDDQcgAUEQdCICRQ0HQYCQwABBACAAQYCAfHEgAxsiBEGAkMAAKAIAaiIANgIAQYSQwABBhJDAACgCACIBIAAgACABSRs2AgACQAJAQfyPwAAoAgAiAwRAQdCNwAAhAANAIAAoAgAiASAAKAIEIgZqIAJGDQIgACgCCCIADQALDAILQYyQwAAoAgAiAEEAIAAgAk0bRQRAQYyQwAAgAjYCAAtBkJDAAEH/HzYCAEHUjcAAIAQ2AgBB0I3AACACNgIAQeyNwABB4I3AADYCAEH0jcAAQeiNwAA2AgBB6I3AAEHgjcAANgIAQfyNwABB8I3AADYCAEHwjcAAQeiNwAA2AgBBhI7AAEH4jcAANgIAQfiNwABB8I3AADYCAEGMjsAAQYCOwAA2AgBBgI7AAEH4jcAANgIAQZSOwABBiI7AADYCAEGIjsAAQYCOwAA2AgBBnI7AAEGQjsAANgIAQZCOwABBiI7AADYCAEGkjsAAQZiOwAA2AgBBmI7AAEGQjsAANgIAQdyNwABBADYCAEGsjsAAQaCOwAA2AgBBoI7AAEGYjsAANgIAQaiOwABBoI7AADYCAEG0jsAAQaiOwAA2AgBBsI7AAEGojsAANgIAQbyOwABBsI7AADYCAEG4jsAAQbCOwAA2AgBBxI7AAEG4jsAANgIAQcCOwABBuI7AADYCAEHMjsAAQcCOwAA2AgBByI7AAEHAjsAANgIAQdSOwABByI7AADYCAEHQjsAAQciOwAA2AgBB3I7AAEHQjsAANgIAQdiOwABB0I7AADYCAEHkjsAAQdiOwAA2AgBB4I7AAEHYjsAANgIAQeyOwABB4I7AADYCAEH0jsAAQeiOwAA2AgBB6I7AAEHgjsAANgIAQfyOwABB8I7AADYCAEHwjsAAQeiOwAA2AgBBhI/AAEH4jsAANgIAQfiOwABB8I7AADYCAEGMj8AAQYCPwAA2AgBBgI/AAEH4jsAANgIAQZSPwABBiI/AADYCAEGIj8AAQYCPwAA2AgBBnI/AAEGQj8AANgIAQZCPwABBiI/AADYCAEGkj8AAQZiPwAA2AgBBmI/AAEGQj8AANgIAQayPwABBoI/AADYCAEGgj8AAQZiPwAA2AgBBtI/AAEGoj8AANgIAQaiPwABBoI/AADYCAEG8j8AAQbCPwAA2AgBBsI/AAEGoj8AANgIAQcSPwABBuI/AADYCAEG4j8AAQbCPwAA2AgBBzI/AAEHAj8AANgIAQcCPwABBuI/AADYCAEHUj8AAQciPwAA2AgBByI/AAEHAj8AANgIAQdyPwABB0I/AADYCAEHQj8AAQciPwAA2AgBB5I/AAEHYj8AANgIAQdiPwABB0I/AADYCAEH8j8AAIAI2AgBB4I/AAEHYj8AANgIAQfSPwAAgBEEoayIANgIAIAIgAEEBcjYCBCAAIAJqQSg2AgRBiJDAAEGAgIABNgIADAgLIAIgA00gASADS3INACAAKAIMRQ0DC0GMkMAAQYyQwAAoAgAiACACIAAgAkkbNgIAIAIgBGohAUHQjcAAIQACQAJAA0AgASAAKAIARwRAIAAoAggiAA0BDAILCyAAKAIMRQ0BC0HQjcAAIQADQAJAIAMgACgCACIBTwRAIAMgASAAKAIEaiIGSQ0BCyAAKAIIIQAMAQsLQfyPwAAgAjYCAEH0j8AAIARBKGsiADYCACACIABBAXI2AgQgACACakEoNgIEQYiQwABBgICAATYCACADIAZBIGtBeHFBCGsiACAAIANBEGpJGyIBQRs2AgRB0I3AACkCACEJIAFBEGpB2I3AACkCADcCACABIAk3AghB1I3AACAENgIAQdCNwAAgAjYCAEHYjcAAIAFBCGo2AgBB3I3AAEEANgIAIAFBHGohAANAIABBBzYCACAAQQRqIgAgBkkNAAsgASADRg0HIAEgASgCBEF+cTYCBCADIAEgA2siAEEBcjYCBCABIAA2AgAgAEGAAk8EQCADIAAQBwwICyAAQXhxQeCNwABqIQECf0Hoj8AAKAIAIgJBASAAQQN2dCIAcUUEQEHoj8AAIAAgAnI2AgAgAQwBCyABKAIICyEAIAEgAzYCCCAAIAM2AgwgAyABNgIMIAMgADYCCAwHCyAAIAI2AgAgACAAKAIEIARqNgIEIAIgBUEDcjYCBCABIAIgBWoiA2shBSABQfyPwAAoAgBGDQMgAUH4j8AAKAIARg0EIAEoAgQiBEEDcUEBRgRAIAEgBEF4cSIAEAYgACAFaiEFIAAgAWoiASgCBCEECyABIARBfnE2AgQgAyAFQQFyNgIEIAMgBWogBTYCACAFQYACTwRAIAMgBRAHDAYLIAVBeHFB4I3AAGohAAJ/QeiPwAAoAgAiAUEBIAVBA3Z0IgRxRQRAQeiPwAAgASAEcjYCACAADAELIAAoAggLIQUgACADNgIIIAUgAzYCDCADIAA2AgwgAyAFNgIIDAULQfSPwAAgACAFayIBNgIAQfyPwABB/I/AACgCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBCAAQQhqIQQMBgtB+I/AACgCACEAAkAgASAFayICQQ9NBEBB+I/AAEEANgIAQfCPwABBADYCACAAIAFBA3I2AgQgACABaiIBIAEoAgRBAXI2AgQMAQtB8I/AACACNgIAQfiPwAAgACAFaiIDNgIAIAMgAkEBcjYCBCAAIAFqIAI2AgAgACAFQQNyNgIECwwICyAAIAQgBmo2AgRB/I/AAEH8j8AAKAIAIgBBD2pBeHEiAUEIayICNgIAQfSPwABB9I/AACgCACAEaiIDIAAgAWtqQQhqIgE2AgAgAiABQQFyNgIEIAAgA2pBKDYCBEGIkMAAQYCAgAE2AgAMAwtB/I/AACADNgIAQfSPwABB9I/AACgCACAFaiIANgIAIAMgAEEBcjYCBAwBC0H4j8AAIAM2AgBB8I/AAEHwj8AAKAIAIAVqIgA2AgAgAyAAQQFyNgIEIAAgA2ogADYCAAsgAkEIag8LQQAhBEH0j8AAKAIAIgAgBU0NAEH0j8AAIAAgBWsiATYCAEH8j8AAQfyPwAAoAgAiACAFaiICNgIAIAIgAUEBcjYCBCAAIAVBA3I2AgQMAwsgBA8LIAAgBzYCGCABKAIQIgIEQCAAIAI2AhAgAiAANgIYCyABKAIUIgJFDQAgACACNgIUIAIgADYCGAsCQCAEQRBPBEAgASAFQQNyNgIEIAEgBWoiAiAEQQFyNgIEIAIgBGogBDYCACAEQYACTwRAIAIgBBAHDAILIARBeHFB4I3AAGohAAJ/QeiPwAAoAgAiA0EBIARBA3Z0IgRxRQRAQeiPwAAgAyAEcjYCACAADAELIAAoAggLIQQgACACNgIIIAQgAjYCDCACIAA2AgwgAiAENgIIDAELIAEgBCAFaiIAQQNyNgIEIAAgAWoiACAAKAIEQQFyNgIECyABQQhqDwsgAEEIagueCgELfyAAKAIEIQggACgCACEGAkACQAJAIAEoAgAiAyABKAIIIgByBEACQCAARQ0AIAYgCGohBAJAIAEoAgwiCUUEQCAGIQIMAQsgBiECA0AgAiIAIARGDQICfyAAQQFqIAAsAAAiAkEATg0AGiAAQQJqIAJBYEkNABogAEEDaiACQXBJDQAaIABBBGoLIgIgAGsgBWohBSAJIAdBAWoiB0cNAAsLIAIgBEYNACACLAAAGgJAAkAgBUUNACAFIAhJBEBBACEAIAUgBmosAABBv39KDQEMAgtBACEAIAUgCEcNAQsgBiEACyAFIAggABshCCAAIAYgABshBgsgA0UNAyABKAIEIQsgCEEQTwRAIAggBiAGQQNqQXxxIgVrIgdqIgpBA3EhCUEAIQNBACEAIAUgBkcEQCAHQXxNBEBBACEEA0AgACAEIAZqIgIsAABBv39KaiACQQFqLAAAQb9/SmogAkECaiwAAEG/f0pqIAJBA2osAABBv39KaiEAIARBBGoiBA0ACwsgBiECA0AgACACLAAAQb9/SmohACACQQFqIQIgB0EBaiIHDQALCwJAIAlFDQAgBSAKQXxxaiICLAAAQb9/SiEDIAlBAUYNACADIAIsAAFBv39KaiEDIAlBAkYNACADIAIsAAJBv39KaiEDCyAKQQJ2IQQgACADaiEDA0AgBSEHIARFDQRBwAEgBCAEQcABTxsiCUEDcSEKIAlBAnQhBUEAIQIgBEEETwRAIAcgBUHwB3FqIQwgByEAA0AgAiAAKAIAIgJBf3NBB3YgAkEGdnJBgYKECHFqIAAoAgQiAkF/c0EHdiACQQZ2ckGBgoQIcWogACgCCCICQX9zQQd2IAJBBnZyQYGChAhxaiAAKAIMIgJBf3NBB3YgAkEGdnJBgYKECHFqIQIgAEEQaiIAIAxHDQALCyAEIAlrIQQgBSAHaiEFIAJBCHZB/4H8B3EgAkH/gfwHcWpBgYAEbEEQdiADaiEDIApFDQALIAcgCUH8AXFBAnRqIgIoAgAiAEF/c0EHdiAAQQZ2ckGBgoQIcSEAIApBAUYNAiAAIAIoAgQiAEF/c0EHdiAAQQZ2ckGBgoQIcWohACAKQQJGDQIgACACKAIIIgBBf3NBB3YgAEEGdnJBgYKECHFqIQAMAgsgCEUEQEEAIQMMAwsgCEEDcSECAkAgCEEESQRAQQAhA0EAIQcMAQtBACEDIAYhACAIQQxxIgchBQNAIAMgACwAAEG/f0pqIABBAWosAABBv39KaiAAQQJqLAAAQb9/SmogAEEDaiwAAEG/f0pqIQMgAEEEaiEAIAVBBGsiBQ0ACwsgAkUNAiAGIAdqIQADQCADIAAsAABBv39KaiEDIABBAWohACACQQFrIgINAAsMAgsMAgsgAEEIdkH/gRxxIABB/4H8B3FqQYGABGxBEHYgA2ohAwsCQCADIAtJBEAgCyADayEEQQAhAAJAAkACQCABLQAgQQFrDgIAAQILIAQhAEEAIQQMAQsgBEEBdiEAIARBAWpBAXYhBAsgAEEBaiEAIAEoAhAhByABKAIYIQIgASgCFCEBA0AgAEEBayIARQ0CIAEgByACKAIQEQMARQ0AC0EBDwsMAQtBASEAIAEgBiAIIAIoAgwRAAAEf0EBBUEAIQACfwNAIAQgACAERg0BGiAAQQFqIQAgASAHIAIoAhARAwBFDQALIABBAWsLIARJCw8LIAEoAhQgBiAIIAEoAhgoAgwRAAALnQYCDX8BfiMAQTBrIgckAEEnIQICQCAAQpDOAFQEQCAAIQ8MAQsDQCAHQQlqIAJqIgZBBGsgAEKQzgCAIg9C8LEDfiAAfKciBEH//wNxQeQAbiIDQQF0QYSHwABqLwAAOwAAIAZBAmsgA0Gcf2wgBGpB//8DcUEBdEGEh8AAai8AADsAACACQQRrIQIgAEL/wdcvViAPIQANAAsLIA+nIgRB4wBLBEAgAkECayICIAdBCWpqIA+nIgNB//8DcUHkAG4iBEGcf2wgA2pB//8DcUEBdEGEh8AAai8AADsAAAsCQCAEQQpPBEAgAkECayICIAdBCWpqIARBAXRBhIfAAGovAAA7AAAMAQsgAkEBayICIAdBCWpqIARBMHI6AAALQScgAmshCEEBIQVBK0GAgMQAIAEoAhwiBEEBcSIMGyEJIARBBHFBAnYhCiAHQQlqIAJqIQsCQCABKAIARQRAIAEoAhQiAyABKAIYIgEgCSAKEFwNASADIAsgCCABKAIMEQAAIQUMAQsgASgCBCINIAggDGoiA00EQCABKAIUIgMgASgCGCIBIAkgChBcDQEgAyALIAggASgCDBEAACEFDAELIARBCHEEQCABKAIQIQQgAUEwNgIQIAEtACAhAyABQQE6ACAgASgCFCIOIAEoAhgiBiAJIAoQXA0BIAIgDWogDGtBJmshAgNAIAJBAWsiAgRAIA5BMCAGKAIQEQMARQ0BDAMLCyAOIAsgCCAGKAIMEQAADQEgASADOgAgIAEgBDYCEEEAIQUMAQsgDSADayEDAkACQAJAIAEtACAiAkEBaw4DAAEAAgsgAyECQQAhAwwBCyADQQF2IQIgA0EBakEBdiEDCyACQQFqIQIgASgCECEEIAEoAhghBiABKAIUIQECQANAIAJBAWsiAkUNASABIAQgBigCEBEDAEUNAAsMAQsgASAGIAkgChBcDQAgASALIAggBigCDBEAAA0AQQAhAgNAIAIgA0YEQEEAIQUMAgsgAkEBaiECIAEgBCAGKAIQEQMARQ0ACyACQQFrIANJIQULIAdBMGokACAFC6gGAQF/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAEGABGsOJgECAwQFBgcIOwkKCwwNOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Dg87OzsQAAtBASEBAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQQFrDg5SAQIDBAUGUQcICQoLDAALAkAgAEHABGsODCcoKSorLC0uLzAxMgALAkAgAEGBAmsOCg0ODxAREhMUFRYACwJAIABBgAZrDgkzNDU2N1FRODkACwJAIABBgAprDgY8PT4/QEEACwJAIABBgAxrDgZCQ0RFRkcACwJAIABBgBJrDgZKS0xNTk8ACwJAIABBgAhrDgI6OwALIABBgA5rDgJHSE8LQQIPC0EDDwtBBA8LQQUPC0EGDwtBBw8LQQkPC0EKDwtBCw8LQQwPC0ENDwtBDg8LQYECDwtBggIPC0GDAg8LQYQCDwtBhQIPC0GGAg8LQYcCDwtBiAIPC0GJAg8LQYoCDwtBgAQPC0GBBA8LQYIEDwtBgwQPC0GEBA8LQYUEDwtBhgQPC0GHBA8LQYkEDwtBigQPC0GLBA8LQYwEDwtBjQQPC0GgBA8LQaEEDwtBpQQPC0HABA8LQcEEDwtBwgQPC0HDBA8LQcQEDwtBxQQPC0HGBA8LQccEDwtByAQPC0HJBA8LQcoEDwtBywQPC0GABg8LQYEGDwtBggYPC0GDBg8LQYQGDwtBhwYPC0GIBg8LQYAIDwtBgQgPC0GACg8LQYEKDwtBggoPC0GDCg8LQYQKDwtBhQoPC0GADA8LQYEMDwtBggwPC0GDDA8LQYQMDwtBhQwPC0GADg8LQYEODwtBgBIPC0GBEg8LQYISDwtBgxIPC0GEEg8LQYUSIQEMAgtBgBAhASAAQYAQRg0BC0HggsAAQRkQ4QEACyABC/gDAQJ/IAAgAWohAgJAAkAgACgCBCIDQQFxDQAgA0ECcUUNASAAKAIAIgMgAWohASAAIANrIgBB+I/AACgCAEYEQCACKAIEQQNxQQNHDQFB8I/AACABNgIAIAIgAigCBEF+cTYCBCAAIAFBAXI2AgQgAiABNgIADAILIAAgAxAGCwJAAkACQCACKAIEIgNBAnFFBEAgAkH8j8AAKAIARg0CIAJB+I/AACgCAEYNAyACIANBeHEiAhAGIAAgASACaiIBQQFyNgIEIAAgAWogATYCACAAQfiPwAAoAgBHDQFB8I/AACABNgIADwsgAiADQX5xNgIEIAAgAUEBcjYCBCAAIAFqIAE2AgALIAFBgAJPBEAgACABEAcPCyABQXhxQeCNwABqIQICf0Hoj8AAKAIAIgNBASABQQN2dCIBcUUEQEHoj8AAIAEgA3I2AgAgAgwBCyACKAIICyEBIAIgADYCCCABIAA2AgwgACACNgIMIAAgATYCCA8LQfyPwAAgADYCAEH0j8AAQfSPwAAoAgAgAWoiATYCACAAIAFBAXI2AgQgAEH4j8AAKAIARw0BQfCPwABBADYCAEH4j8AAQQA2AgAPC0H4j8AAIAA2AgBB8I/AAEHwj8AAKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAAsL8QIBBH8gACgCDCECAkACQCABQYACTwRAIAAoAhghAwJAAkAgACACRgRAIABBFEEQIAAoAhQiAhtqKAIAIgENAUEAIQIMAgsgACgCCCIBIAI2AgwgAiABNgIIDAELIABBFGogAEEQaiACGyEEA0AgBCEFIAEiAkEUaiACQRBqIAIoAhQiARshBCACQRRBECABG2ooAgAiAQ0ACyAFQQA2AgALIANFDQIgACAAKAIcQQJ0QdCMwABqIgEoAgBHBEAgA0EQQRQgAygCECAARhtqIAI2AgAgAkUNAwwCCyABIAI2AgAgAg0BQeyPwABB7I/AACgCAEF+IAAoAhx3cTYCAAwCCyAAKAIIIgAgAkcEQCAAIAI2AgwgAiAANgIIDwtB6I/AAEHoj8AAKAIAQX4gAUEDdndxNgIADwsgAiADNgIYIAAoAhAiAQRAIAIgATYCECABIAI2AhgLIAAoAhQiAEUNACACIAA2AhQgACACNgIYCwu6AgEEf0EfIQIgAEIANwIQIAFB////B00EQCABQQYgAUEIdmciA2t2QQFxIANBAXRrQT5qIQILIAAgAjYCHCACQQJ0QdCMwABqIQRBASACdCIDQeyPwAAoAgBxRQRAIAQgADYCACAAIAQ2AhggACAANgIMIAAgADYCCEHsj8AAQeyPwAAoAgAgA3I2AgAPCwJAAkAgASAEKAIAIgMoAgRBeHFGBEAgAyECDAELIAFBGSACQQF2a0EAIAJBH0cbdCEFA0AgAyAFQR12QQRxakEQaiIEKAIAIgJFDQIgBUEBdCEFIAIhAyACKAIEQXhxIAFHDQALCyACKAIIIgEgADYCDCACIAA2AgggAEEANgIYIAAgAjYCDCAAIAE2AggPCyAEIAA2AgAgACADNgIYIAAgADYCDCAAIAA2AggLlAEBBH8gARDXASABQQhrIgMgAygCAEEBaiICNgIAAkACQCACBEAgASgCACICQX9GDQEgASACQQFqNgIAIAEoAgQoAAAiBMBBAnRBuIPAAGooAgAhBUEBQQQQ2QEiAg0CCwALEN0BAAsgAiAFIARBgH5xcjYAACABIAEoAgBBAWs2AgAgAxBeIABBBDYCBCAAIAI2AgALiwEBAn8gABDXASAAQQhrIgIoAgAhAwJAAkAgAUUEQCADQQFGBEAgAkEANgIAIAJBf0YNAyAAQQRrIgAgACgCAEEBayIANgIAIABFDQIMAwtB+YLAAEE/EOEBAAsgAiADQQFrIgE2AgAgAQ0BIABBBGsiACAAKAIAQQFrIgA2AgAgAA0BCyACQRAQIwsLhAEBA38jAEEQayIBJAAgAUEEaiAAECAgASgCBCIAQQJqLQAAIQIgAC8AACEDIAEoAgggASgCDBDSAUEEQRAQ2QEiAEUEQAALIABBADYCCCAAQoGAgIAQNwIAIAAgAyACQRB0chDmASICQQh2QYAecSACQRh2cjsBDCABQRBqJAAgAEEIagt1AgF/AX4gARDXASABQQhrIgIoAgBBAUYEQCABNQIEIQMgAkEANgIAAkAgAkF/Rg0AIAFBBGsiASABKAIAQQFrIgE2AgAgAQ0AIAJBEBAjCyAAIANCAYM8AAAgACADp0EIdkEBcToAAQ8LQfmCwABBPxDhAQALbAECfyAAENcBIABBCGsiASABKAIAQQFqIgI2AgACQCACBEAgACgCAEF/Rg0BIAAvAAQgAEEGai0AAEEQdHIQ5gEhACABEGMgAEEIdkGA/gNxIABBGHZyIABBgP4DcUEIdHIQZg8LAAsQ3QEAC28BAn8gARDXASABQQhrIgIoAgBBAUYEQCABKAIEIQMgAkEANgIAAkAgAkF/Rg0AIAFBBGsiASABKAIAQQFrIgE2AgAgAQ0AIAJBEBAjCyAAIANBCHY6AAEgACADQQFxOgAADwtB+YLAAEE/EOEBAAtrAQF/IAAQ1wEgAEEIayECAkAgAUUEQCACKAIAQQFHDQEgACgCBCACQQA2AgACQCACQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAkEQECMLEOUBDwsgAhBeDwtB+YLAAEE/EOEBAAthAQF/IwBBEGsiASQAIAFBBGogABAgIAEoAgQiAC8AACAAQQJqLQAAQRB0chDmASEAIAEoAgggASgCDBDSASAAQQh2QYD+A3EgAEEYdnIgAEGABnFBCHRyEGYgAUEQaiQAC2cBAX8gABAfIQIgARAiIQFBBEEQENkBIgBFBEAACyAAQoGAgIAQNwIAIAAgAUEQdEGAgPwHcSACQf8BcUESdCABciIBQYD+A3FBCHQgAUEIdkGA/gNxckEIdnKtQiCGNwIIIABBCGoLewEBfyMAQRBrIgMkAEHMjMAAQcyMwAAoAgAiBEEBajYCAAJAIARBAEgNAAJAQZiQwAAtAABFBEBBlJDAAEGUkMAAKAIAQQFqNgIAQciMwAAoAgBBAE4NAQwCCyADQQhqIAAgAREEAAALQZiQwABBADoAACACRQ0AAAsAC2oBAX8jAEEwayIBJAAgASAAOgAPIABB/wFxQcAATwRAIAFBAjYCFCABQfSAwAA2AhAgAUIBNwIcIAFBAjYCLCABIAFBKGo2AhggASABQQ9qNgIoIAFBEGpBhIHAABA/AAsgAUEwaiQAIAALawEBfyMAQTBrIgEkACABIAA7AQ4gAEH//wNxQYAgTwRAIAFBAjYCFCABQbiBwAA2AhAgAUIBNwIcIAFBAzYCLCABIAFBKGo2AhggASABQQ5qNgIoIAFBEGpByIHAABA/AAsgAUEwaiQAIAALYwECfyMAQRBrIgIkAAJAIAFFBEAgAkEIaiAAEA0MAQsgABDXASAAQQhrIgEgASgCAEEBayIDNgIAIAMNACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQIwsgAkEQaiQAC1sBAn8CQAJAIAAQHyICQRhxDQAgAkEHcSIAQQdGDQBBBEEQENkBIgFFDQEgAUKBgICAEDcCACABIAJBBXZBAXGtQiCGIACtQiiGhDcCCCABQQhqIQELIAEPCwALYwECfyMAQRBrIgIkAAJAIAFFBEAgAkEIaiAAEAsMAQsgABDXASAAQQhrIgEgASgCAEEBayIDNgIAIAMNACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQIwsgAkEQaiQAC14BAX8jAEEQayIBJAAgAUEEaiAAECAgASgCBCIALwAAIABBAmotAABBEHRyEOYBIQAgASgCCCABKAIMENIBIABBCHZBgOADcSAAQYAGcUEIdHJBDHYQZyABQRBqJAALFQAgAEGMgsAAQfyBwABBgIAQEIECCxYAIABB0ILAAEHAgsAAQYCAgAgQgQILXgEBfyAAEB8hAiABEB8hAUEEQRAQ2QEiAEUEQAALIABCgYCAgBA3AgAgACABQf8BcUEMdCACQRJ0ciIBQYDgA3FBCHQgAUEIdkGA/gNxckEIdq1CIIY3AgggAEEIagtcAQJ/IAAQ1wEgAEEIayIBKAIAQQFGBEAgAC0ABCABQQA2AgACQCABQX9GDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQECMLQQFxDwtB+YLAAEE/EOEBAAtgAQF/IAAQ1wEgAEEIayECAkAgAUUEQCACKAIAQQFGBEAgAkEANgIAIAJBf0YNAiAAQQRrIgAgACgCAEEBayIANgIAIAANAiACQRQQIw8LQfmCwABBPxDhAQALIAIQZAsLYAEBfyAAENcBIABBCGshAgJAIAFFBEAgAigCAEEBRgRAIAJBADYCACACQX9GDQIgAEEEayIAIAAoAgBBAWsiADYCACAADQIgAkEQECMPC0H5gsAAQT8Q4QEACyACEGMLC1UBAX8jAEEQayIBJAAgAUEEaiAAECAgASgCBCIALwAAIABBAmotAABBEHRyEOYBIQAgASgCCCABKAIMENIBIABBDnZBPHEgAEEednIQZyABQRBqJAALWQECfyAAENcBIABBCGsiASgCAEEBRgRAIAAtAAQgAUEANgIAAkAgAUF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAjCw8LQfmCwABBPxDhAQALWQECfyABENcBIAFBCGsiAyADKAIAQQFqIgI2AgACQCACBEAgASgCACICQX9GDQEgACADNgIIIAAgATYCBCAAIAFBBGo2AgAgASACQQFqNgIADwsACxDdAQALWQECfyAAENcBIABBCGsiASgCAEEBRgRAIAAvAQQgAUEANgIAAkAgAUF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAjCw8LQfmCwABBPxDhAQALWQECfyAAENcBIABBCGsiASgCAEEBRgRAIAAoAgQgAUEANgIAAkAgAUF/Rg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAjCw8LQfmCwABBPxDhAQALzQYBBH8CQCAAQQRrKAIAIgQiAkF4cSIDQQRBCCACQQNxIgIbIAFqTwRAIAJBACADIAFBJ2pLGw0BIABBCGsiASAEIgNBeHEiAGohAgJAAkAgA0EBcQ0AIANBAnFFDQEgASgCACIDIABqIQAgASADayIBQfiPwAAoAgBGBEAgAigCBEEDcUEDRw0BQfCPwAAgADYCACACIAIoAgRBfnE2AgQgASAAQQFyNgIEIAIgADYCAAwCCyABIAMQBgsCQAJAAkACQAJAIAIoAgQiA0ECcUUEQCACQfyPwAAoAgBGDQIgAkH4j8AAKAIARg0DIAIgA0F4cSICEAYgASAAIAJqIgBBAXI2AgQgACABaiAANgIAIAFB+I/AACgCAEcNAUHwj8AAIAA2AgAMBgsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQIgASAAEAdBACEBQZCQwABBkJDAACgCAEEBayIANgIAIAANBEHYjcAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQZCQwABB/x8gASABQf8fTRs2AgAMBAtB/I/AACABNgIAQfSPwABB9I/AACgCACAAaiIANgIAIAEgAEEBcjYCBEH4j8AAKAIAIAFGBEBB8I/AAEEANgIAQfiPwABBADYCAAsgAEGIkMAAKAIAIgNNDQNB/I/AACgCACICRQ0DQQAhAEH0j8AAKAIAIgRBKUkNAkHQjcAAIQEDQCACIAEoAgAiBU8EQCACIAUgASgCBGpJDQQLIAEoAgghAQwACwALQfiPwAAgATYCAEHwj8AAQfCPwAAoAgAgAGoiADYCACABIABBAXI2AgQgACABaiAANgIADAILIABBeHFB4I3AAGohAgJ/QeiPwAAoAgAiA0EBIABBA3Z0IgBxRQRAQeiPwAAgACADcjYCACACDAELIAIoAggLIQAgAiABNgIIIAAgATYCDCABIAI2AgwgASAANgIIDAELQdiNwAAoAgAiAQRAA0AgAEEBaiEAIAEoAggiAQ0ACwtBkJDAAEH/HyAAIABB/x9NGzYCACADIARPDQBBiJDAAEF/NgIACw8LQfWIwABBpInAABBSAAtBtInAAEHkicAAEFIAC0wAIANB/wFxIAFB/wFxQQx0IABB/wFxQRJ0ciIAIAJB/wFxQQZ0cnIiAUEQdEGAgPwHcSAAQQh2QYD+A3EgAUGA/gNxQQh0ckEIdnILTwECfyAAENcBIABBCGsiASABKAIAQQFqIgI2AgACQCACBEAgACgCAEF/Rg0BIAAvAAQgAEEGai0AAEEQdHIQ2gEgARBjEGcPCwALEN0BAAtVAQF/IAAQIiEAQQRBEBDZASIBRQRAAAsgAUKBgICAEDcCACABIABBEHRBgID8B3EgAEEIdkGA/gNxIABBgP4DcUEIdHJBCHZyrUIghjcCCCABQQhqC04BAX8gAUUEQCAAEBsaDwsgABDXASAAQQhrIgEgASgCAEEBayICNgIAAkAgAg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAjCwsQACAAIAEgAiADQd4AEIICCxAAIAAgASACIANB3wAQggILEAAgACABIAIgA0HgABCCAgsQACAAIAEgAiADQeEAEIICCxAAIAAgASACIANB4gAQgwILEAAgACABIAIgA0HjABCDAgtOAQF/IAFFBEAgABAfGg8LIAAQ1wEgAEEIayIBIAEoAgBBAWsiAjYCAAJAIAINACAAQQRrIgAgACgCAEEBayIANgIAIAANACABQRAQIwsLTgEBfyABRQRAIAAQIRoPCyAAENcBIABBCGsiASABKAIAQQFrIgI2AgACQCACDQAgAEEEayIAIAAoAgBBAWsiADYCACAADQAgAUEQECMLC04BAX8gAUUEQCAAECIaDwsgABDXASAAQQhrIgEgASgCAEEBayICNgIAAkAgAg0AIABBBGsiACAAKAIAQQFrIgA2AgAgAA0AIAFBEBAjCwsPACAAIAFBgICAyAEQhAILDAAgACABQcsAEIUCCwwAIAAgAUHMABCFAgsMACAAIAFBzQAQhQILDAAgACABQc4AEIUCCwwAIAAgAUHPABCFAgsMACAAIAFB0AAQhQILDwAgACABQYCAgOgGEIQCC1MBAX8gABAfIQQgARAfIQEgAhAfIQIgAxAfIQNBBEEQENkBIgBFBEAACyAAQoGAgIAQNwIAIAAgBCABIAIgAxAkrUL///8Hg0IghjcCCCAAQQhqC0UBAX8jAEEQayIBJAAgAUEEaiAAECAgASgCBCIALwAAIABBAmotAABBEHRyENoBIAEoAgggASgCDBDSARBnIAFBEGokAAtLAQF/IwBBEGsiASQAIAFBBGogABAgIAEoAgQiAC8AACAAQQJqLQAAQRB0chDmAUEYdkE/cSABKAIIIAEoAgwQ0gEQZyABQRBqJAALCwAgACABQQcQhgILCwAgACABQQgQhgILPwAgAkEWdEGAgIAGcSABQf8BcUEMdCIBIAJB/AFxQQZ0ckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyC6QCAQN/IwBBIGsiAiQAIAJBEGoiAyAAQRBqKQIANwMAIAJBCGoiBCAAQQhqKQIANwMAIAJBATsBHCACIAE2AhggAiAAKQIANwMAIwBBIGsiACQAIAIoAhghASAAQRBqIAMpAgA3AwAgAEEIaiAEKQIANwMAIAAgAjYCHCAAIAE2AhggACACKQIANwMAQQAhAiMAQRBrIgEkACAAKAIMIQMCQAJAAkACQCAAKAIEDgIAAQILIAMNAUEBIQMMAgsgAw0AIAAoAgAiAygCBCECIAMoAgAhAwwBCyABQYCAgIB4NgIAIAEgADYCDCABQQUgACgCHCIALQAcIAAtAB0QEQALIAEgAjYCBCABIAM2AgAgAUEGIAAoAhwiAC0AHCAALQAdEBEACzgBAX8jAEEQayIEJAAgABAfIAEQHyACEB8gBEEIaiADEA0gBC0ACCAELQAJEM4BEGUgBEEQaiQACzgBAX8jAEEQayIEJAAgABAfIAEQHyACEB8gBEEIaiADEAsgBC0ACCAELQAJEJABEGUgBEEQaiQAC04BAX8CQCAAQcEASQRAQQRBFBDZASICRQ0BIAIgADoAECACIAE2AgwgAkEANgIIIAJCgYCAgBA3AgAgAkEIag8LQeCCwABBGRDhAQALAAtLAQF/IAAQHyEDIAEQHyEBIAIQHyECQQRBEBDZASIARQRAAAsgAEKBgICAEDcCACAAIAMgASACED6tQv///weDQiCGNwIIIABBCGoLSwEBfyAAEB8hAyABEB8hASACECEhAkEEQRAQ2QEiAEUEQAALIABCgYCAgBA3AgAgACADIAEgAhBPrUL///8Hg0IghjcCCCAAQQhqCwsAIAAgAUEKEIcCCwsAIAAgAUEMEIcCCwsAIAAgAUEUEIcCCwsAIAAgAUEWEIcCCwsAIAAgAUEbEIcCCwsAIAAgAUEeEIcCCwsAIAAgAUEfEIcCCwsAIAAgAUEkEIcCCwsAIAAgAUEyEIcCCz4AIAAQHyEAIAEQIiIBQRB0QYCA/AdxIABB/wFxQRJ0IAFyIgBBgP4DcUEIdCAAQQh2QYD+A3FyQQh2chBlCzgAIAJBEHRBgID8B3EgAUH/AXFBDHQiASACckGA/gNxQQh0IAEgAEESdHJBCHZBgP4DcXJBCHZyCzwBAn8jAEEQayIBJAAgABDXASABQQhqIAAQYiABKAIILQABIAEoAgwiAiACKAIAQQFrNgIAIAFBEGokAAs8AQJ/IwBBEGsiASQAIAAQ1wEgAUEIaiAAEGIgASgCCC0AACABKAIMIgIgAigCAEEBazYCACABQRBqJAALQQEBfyMAQSBrIgIkACACQQA2AhAgAkEBNgIEIAJCBDcCCCACQS42AhwgAiAANgIYIAIgAkEYajYCACACIAEQPwALOQEBfyMAQRBrIgIkACAAENcBIAJBCGogABBoIAIoAgwgAigCCCABQQBHOgAAQQA2AgAgAkEQaiQACzkBAX8jAEEQayICJAAgABDXASACQQhqIAAQaCACKAIMIAIoAgggAUEARzoAAUEANgIAIAJBEGokAAsKACAAQdUAEIgCCwoAIABB1gAQiAILCgAgAEHXABCIAgsKACAAQdoAEIgCCwoAIABB2wAQiAILCgAgAEHcABCIAgsKACAAQd0AEIgCCzkAAkACfyACQYCAxABHBEBBASAAIAIgASgCEBEDAA0BGgsgAw0BQQALDwsgACADQQAgASgCDBEAAAs6AQF/IAAQHyEBQQRBEBDZASIARQRAAAsgAEKBgICAEDcCACAAIAFBAnRB/AFxrUIghjcCCCAAQQhqCzsBAX8gACAAKAIAQQFrIgE2AgACQCABDQAgACgCDBDlASAAIAAoAgRBAWsiATYCBCABDQAgAEEQECMLCy8BAX8jAEEQayIBJAAgAUEIaiAAEA0gAS0ACUEgQQAgAS0ACBtyEGcgAUEQaiQACzIBAX8jAEEQayIBJAAgAUEEaiAAECAgASgCBC0ABCABKAIIIAEoAgwQ0wEgAUEQaiQACzIBAX8jAEEQayIBJAAgAUEEaiAAECAgASgCBCgCACABKAIIIAEoAgwQ0wEgAUEQaiQACzEBAX8gASgCACICQX9HBEAgASACQQFqNgIAIAAgATYCBCAAIAFBBGo2AgAPCxDdAQALCQAgAEEQEPsBCwkAIABBFBD7AQszAQF/QQRBEBDZASIBRQRAAAsgAUKBgICAEDcCACABIACtQv///weDQiCGNwIIIAFBCGoLMAEBf0EEQRAQ2QEiAUUEQAALIAEgADYCDCABQQA2AgggAUKBgICAEDcCACABQQhqCzABAX9BBEEQENkBIgFFBEAACyABIAA6AAwgAUEANgIIIAFCgYCAgBA3AgAgAUEIagsoACABKAIARQRAIAFBfzYCACAAIAE2AgQgACABQQRqNgIADwsQ3QEACyQAIAAQ1wEgACgCAARAEN0BAAsgAEEANgIAIAAgAUEARzoABAsoACADEBshAyAAEM0BIAEQzQEgAhDNASADENUBQQh0QeQAchDKARBmCygAIAMQGyEDIAAQzQEgARDNASACEM0BIAMQ1QFBCHRB5QByEMoBEGYLIAAgAEEBayIAQQZNBEAgAEEBag8LQeCCwABBGRDhAQALKQEBf0EEQRAQ2QEiAEUEQAALIABCADcCCCAAQoGAgIAQNwIAIABBCGoLIgAgAhAEIQIgABDNASABEM0BIAIQT0EIdEHKAHIQygEQZgsPACAAIAEgAiADQRIQ/AELDwAgACABIAIgA0EYEPwBCw8AIAAgASACIANBHBD8AQsPACAAIAEgAiADQR0Q/AELDwAgACABIAIgA0EhEP0BCw8AIAAgASACIANBIhD8AQsPACAAIAEgAiADQSMQ/AELDwAgACABIAIgA0EoEPwBCw8AIAAgASACIANBKhD8AQsPACAAIAEgAiADQSwQ/AELDwAgACABIAIgA0EvEPwBCw8AIAAgASACIANBOBD8AQsQACAAIAEgAiADQdMAEP0BCxAAIAAgASACIANB1AAQ/QELEAAgACABIAIgA0HeABD9AQsQACAAIAEgAiADQd8AEP0BCxAAIAAgASACIANB4AAQ/QELEAAgACABIAIgA0HhABD9AQsQACAAIAEgAiADQeIAEP0BCxAAIAAgASACIANB4wAQ/QELEAAgACABIAIgA0HkABD9AQsQACAAIAEgAiADQeUAEP0BCxAAIAAgASACIANB5gAQ/AELEAAgACABIAIgA0HnABD8AQsQACAAIAEgAiADQegAEPwBCxAAIAAgASACIANB6QAQ/AELEAAgACABIAIgA0HqABD8AQsQACAAIAEgAiADQesAEPwBCxAAIAAgASACIANB7AAQ/AELEAAgACABIAIgA0HuABD8AQsQACAAIAEgAiADQe8AEPwBCxAAIAAgASACIANB8AAQ/AELHgAgARBsIQEgABDNASABEMsBQQh0QcwAchDKARBmCxkAIAAgASACQSBBACAEG0EQQQAgAxtyECQLDQAgACABIAJBARD+AQsNACAAIAEgAkECEP4BCw0AIAAgASACQQMQ/gELDQAgACABIAJBBBD+AQsNACAAIAEgAkEFEP4BCw0AIAAgASACQQYQ/gELDQAgACABIAJBBxD+AQsNACAAIAEgAkEIEP4BCw0AIAAgASACQQkQ/gELDQAgACABIAJBCxD+AQsNACAAIAEgAkENEP4BCw0AIAAgASACQQ4Q/gELDQAgACABIAJBDxD+AQsNACAAIAEgAkEQEP4BCw0AIAAgASACQREQ/gELDQAgACABIAJBFxD+AQsNACAAIAEgAkEmEP4BCw0AIAAgASACQScQ/gELDQAgACABIAJBKRD+AQsNACAAIAEgAkErEP4BCw0AIAAgASACQS0Q/gELDQAgACABIAJBLhD+AQsNACAAIAEgAkEwEP4BCw0AIAAgASACQTEQ/gELDQAgACABIAJBNRD+AQsNACAAIAEgAkE3EP4BCw0AIAAgASACQTkQ/wELDQAgACABIAJBOhD/AQsNACAAIAEgAkE7EP8BCw0AIAAgASACQTwQ/wELDQAgACABIAJBPRD/AQsNACAAIAEgAkE+EP8BCw0AIAAgASACQT8Q/wELDgAgACABIAJBwAAQ/wELDgAgACABIAJBwQAQ/wELDgAgACABIAJBwgAQ/wELDgAgACABIAJBwwAQ/wELDgAgACABIAJBxAAQ/wELDgAgACABIAJBxQAQ/wELDgAgACABIAJBxgAQ/wELDgAgACABIAJBxwAQ/wELDgAgACABIAJByAAQ/wELDgAgACABIAJByQAQ/wELDgAgACABIAJBygAQ/wELDgAgACABIAJB0QAQ/wELDgAgACABIAJB0gAQ/wELFwEBfyAAQf8BcUE/TQR/IAAQZwVBAAsLGwAgABDXASAAKAIAQX9GBEAQ3QEACyAALQAECwkAIABBExCAAgsJACAAQRUQgAILCQAgAEEaEIACCwkAIABBIBCAAgsJACAAQSUQgAILCQAgAEE0EIACCwkAIABBNhCAAgsKACAAQdgAEIACCwoAIABB2QAQgAILGwEBf0EBQQQQ2QEiAUUEQAALIAEgADYAACABCxcAIAFBEHRBgID8A3EgAEECdEH8AXFyCxsAIAAQzQEgARDNASACEM0BED5BCHQQygEQZgtsACAAQf8BcUHAAE8EQCMAQTBrIgAkACAAQSI2AgwgAEGAgMAANgIIIABBATYCFCAAQfyGwAA2AhAgAEIBNwIcIAAgAEEIaq1CgICAgBCENwMoIAAgAEEoajYCGCAAQRBqQbiAwAAQPwALIAALFAAgACABIAJBIEEAIAMbIARyECQLFwAgABAfIAEQHyACEB8gAxAbENUBEGULFgAgABAfIAEQHyACEB8gAxAfECQQZQscACAAQQA2AhAgAEIANwIIIABCgICAgMAANwIACxMAIAAgACgCAEEBazYCACABEGMLEwAgACAAKAIAQQFrNgIAIAEQZAsSACAAEB8gARAfIAIQBBBPEGULEQAgACABIAJBIEEAIAMbECQLEgAgABAfIAEQHyACECEQTxBlCxMAIAAEQA8LQcCLwABBGxDhAQALDQAgAQRAIAAgARAjCwuBAwEFf0GZkMAALQAAGgJ/IABBCU8EQAJAQc3/e0EQIAAgAEEQTRsiAGsgAU0NACAAQRAgAUELakF4cSABQQtJGyIEakEMahABIgJFDQAgAkEIayEBAkAgAEEBayIDIAJxRQRAIAEhAAwBCyACQQRrIgUoAgAiBkF4cSACIANqQQAgAGtxQQhrIgIgAEEAIAIgAWtBEE0baiIAIAFrIgJrIQMgBkEDcQRAIAAgAyAAKAIEQQFxckECcjYCBCAAIANqIgMgAygCBEEBcjYCBCAFIAIgBSgCAEEBcXJBAnI2AgAgASACaiIDIAMoAgRBAXI2AgQgASACEAUMAQsgASgCACEBIAAgAzYCBCAAIAEgAmo2AgALAkAgACgCBCIBQQNxRQ0AIAFBeHEiAiAEQRBqTQ0AIAAgBCABQQFxckECcjYCBCAAIARqIgEgAiAEayIEQQNyNgIEIAAgAmoiAiACKAIEQQFyNgIEIAEgBBAFCyAAQQhqIQMLIAMMAQsgARABCwsNACAAEOYBQQp2QT9xCw8AIAAQHyABEGwQywEQZQsLACAAIwBqJAAjAAsOAEHbi8AAQc8AEOEBAAsLACAAMQAAIAEQAwsLACAAMwEAIAEQAwsLACAANQIAIAEQAwsJACAAIAEQAAALCQAgAEE/cRBnCwoAIAAQH0H/AXELDAAgACABKQIANwMACwgAIABBBBAjCwcAIABBCHQLCQBBMxDKARBmCwkAIABBADYCAAsGAEELEGcLBgBBChBnCwYAQQgQZwsGAEEPEGcLBgBBBhBnCwYAQQkQZwsGAEEHEGcLBgBBDBBnCwYAQQIQZwsGAEEBEGcLBgBBAxBnCwYAQQ0QZwsGAEEOEGcLBgBBBRBnCwYAQQQQZwsGAEEQEGcLBgBBABBnCwQAQQQLMwEBfyAAIAAoAgBBAWsiAjYCAAJAIAINACAAIAAoAgRBAWsiAjYCBCACDQAgACABECMLCyMAIAAQzQEgARDNASACEM0BIAMQzQEQJEEIdCAEchDKARBmCyIAIAAQzQEgARDNASACEM0BIAMQEhAkQQh0IARyEMoBEGYLHgAgABDNASABEM0BIAIQzQEQPkEIdCADchDKARBmCx0AIAAQzQEgARDNASACEBMQT0EIdCADchDKARBmCxoAIAAQzQEaIABBCnRBgPgDcSABchDKARBmC18BAX8jAEEwayIEJAAgBCAANgIMIAAgA08EQCAEQQI2AhQgBCACNgIQIARCATcCHCAEQQQ2AiwgBCAEQShqNgIYIAQgBEEMajYCKCAEQRBqIAEQPwALIARBMGokACAAC0wBAn8jAEEQayIFJAAgBUEIaiADEA0gBS0ACSEDIAUtAAghBiAAEM0BIAEQzQEgAhDNASAGIAMQzgFBCHQgBHIQygEQZiAFQRBqJAALTAECfyMAQRBrIgUkACAFQQhqIAMQCyAFLQAJIQMgBS0ACCEGIAAQzQEgARDNASACEM0BIAYgAxCQAUEIdCAEchDKARBmIAVBEGokAAtJACAAEM0BGiABEM0BGiAAQRJ0QYCA8BdxIgAgAUEMdEGA4D9xciIBQYDgA3FBCHQgAUEIdkGA/gNxIAAgAnJBGHZychDKARBmC0kAIAAQzQEaIAEQGCIBQRB0QYCA/AdxIABBEnRBgIDwH3EgAXIiAEGA/gNxQQh0IABBCHZBgP4DcXJBCHZyQQh0IAJyEMoBEGYLSQEBfyMAQRBrIgMkACAAENcBIAEgAk8EQEHggsAAQRkQ4QEACyADQQhqIAAQaCADKAIMIAMoAgggAToAAUEANgIAIANBEGokAAtBACAAEM0BGiABEM0BGiAAQRJ0QYCA8AdxIAFBDHRBgOA/cXIiAEEIdkGA/gNxIABBgOADcUEIdHIgAnIQygEQZgs1ACAAEBkiAEEQdEGAgPwHcSAAQQh2QYD+A3EgAEGA/gNxQQh0ckEIdnJBCHQgAXIQygEQZgsLvQwCAEGAgMAAC6oMQ2hlY2tSZWdJZCB3YXMgZ2l2ZW4gaW52YWxpZCBSZWdJZGZ1ZWwtYXNtL3NyYy9saWIucnMAAAAiABAAEwAAAG4AAAAiAAAAVmFsdWUgYGAgb3V0IG9mIHJhbmdlIGZvciA2LWJpdCBpbW1lZGlhdGUAAABIABAABwAAAE8AEAAiAAAAIgAQABMAAACzAwAAHAAAAGAgb3V0IG9mIHJhbmdlIGZvciAxMi1iaXQgaW1tZWRpYXRlAEgAEAAHAAAAlAAQACMAAAAiABAAEwAAALgDAAAcAAAAYCBvdXQgb2YgcmFuZ2UgZm9yIDE4LWJpdCBpbW1lZGlhdGUASAAQAAcAAADYABAAIwAAACIAEAATAAAAvQMAABwAAABgIG91dCBvZiByYW5nZSBmb3IgMjQtYml0IGltbWVkaWF0ZQBIABAABwAAABwBEAAjAAAAIgAQABMAAADCAwAAHAAAAGludmFsaWQgZW51bSB2YWx1ZSBwYXNzZWRhdHRlbXB0ZWQgdG8gdGFrZSBvd25lcnNoaXAgb2YgUnVzdCB2YWx1ZSB3aGlsZSBpdCB3YXMgYm9ycm93ZWQQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAJAAAACUAAAAmAAAAJwAAACgAAAApAAAAKgAAACsAAAAsAAAALQAAAC4AAAAvAAAAMAAAADEAAAAyAAAAMwAAADQAAAA1AAAANgAAADcAAAA4AAAAOQAAADoAAAA7AAAAPAAAAD0AAAA+AAAAPwAAAEAAAABBAAAAQgAAAEMAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAFsAAABcAAAAXQAAAF4AAABfAAAAYAAAAGEAAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAkAAAAJEAAACSAAAAkwAAAJQAAACVAAAAlgAAAJcAAACYAAAAoAAAAKEAAACiAAAAowAAAKQAAAClAAAApgAAAKcAAACoAAAAqQAAAKoAAACrAAAArAAAAK0AAACwAAAAugAAALsAAAC8AAAAvgAAAAEAAAAAAAAAMDAwMTAyMDMwNDA1MDYwNzA4MDkxMDExMTIxMzE0MTUxNjE3MTgxOTIwMjEyMjIzMjQyNTI2MjcyODI5MzAzMTMyMzMzNDM1MzYzNzM4Mzk0MDQxNDI0MzQ0NDU0NjQ3NDg0OTUwNTE1MjUzNTQ1NTU2NTc1ODU5NjA2MTYyNjM2NDY1NjY2NzY4Njk3MDcxNzI3Mzc0NzU3Njc3Nzg3OTgwODE4MjgzODQ4NTg2ODc4ODg5OTA5MTkyOTM5NDk1OTY5Nzk4OTkvcnVzdC9kZXBzL2RsbWFsbG9jLTAuMi42L3NyYy9kbG1hbGxvYy5yc2Fzc2VydGlvbiBmYWlsZWQ6IHBzaXplID49IHNpemUgKyBtaW5fb3ZlcmhlYWQATAQQACkAAACoBAAACQAAAGFzc2VydGlvbiBmYWlsZWQ6IHBzaXplIDw9IHNpemUgKyBtYXhfb3ZlcmhlYWQAAEwEEAApAAAArgQAAA0AAABMYXp5IGluc3RhbmNlIGhhcyBwcmV2aW91c2x5IGJlZW4gcG9pc29uZWQAAPQEEAAqAAAAL2hvbWUvcnVubmVyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTZmMTdkMjJiYmExNTAwMWYvb25jZV9jZWxsLTEuMjEuMy9zcmMvbGliLnJzAAAAKAUQAF0AAAAIAwAAGQAAAHJlZW50cmFudCBpbml0AACYBRAADgAAACgFEABdAAAAegIAAA0AAABudWxsIHBvaW50ZXIgcGFzc2VkIHRvIHJ1c3RyZWN1cnNpdmUgdXNlIG9mIGFuIG9iamVjdCBkZXRlY3RlZCB3aGljaCB3b3VsZCBsZWFkIHRvIHVuc2FmZSBhbGlhc2luZyBpbiBydXN0AEHEjMAACwEHADwJcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkCBndhbHJ1cwYwLjIzLjMMd2FzbS1iaW5kZ2VuBzAuMi4xMDA=");
}
async function fo() {
  return await l_({ module_or_path: _b() });
}
fo();
const __ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ADD: Am,
  ADDI: lm,
  ALOC: _m,
  AND: pm,
  ANDI: fm,
  BAL: gm,
  BHEI: wm,
  BHSH: mm,
  BLDD: ym,
  BSIZ: bm,
  BURN: Im,
  CALL: Em,
  CB: Cm,
  CCP: Bm,
  CFE: vm,
  CFEI: xm,
  CFS: Rm,
  CFSI: Sm,
  CROO: Tm,
  CSIZ: Nm,
  CompareArgs: en,
  CompareMode: cm,
  DIV: Dm,
  DIVI: Fm,
  DivArgs: ca,
  ECAL: Om,
  ECK1: Mm,
  ECOP: Pm,
  ECR1: Lm,
  ED19: km,
  EPAR: Um,
  EQ: Gm,
  EXP: zm,
  EXPI: Xm,
  FLAG: Hm,
  GM: Va,
  GMArgs: dm,
  GT: Vm,
  GTF: Wa,
  GTFArgs: u_,
  Imm06: Mt,
  Imm12: _t,
  Imm18: Le,
  Imm24: Ne,
  Instruction: V,
  JI: Wm,
  JMP: Ym,
  JMPB: jm,
  JMPF: Zm,
  JNE: Jm,
  JNEB: qm,
  JNEF: $m,
  JNEI: Km,
  JNZB: ty,
  JNZF: ey,
  JNZI: ry,
  K256: ny,
  LB: sy,
  LDC: iy,
  LOG: ay,
  LOGD: oy,
  LT: cy,
  LW: dy,
  MCL: uy,
  MCLI: hy,
  MCP: Ay,
  MCPI: ly,
  MEQ: _y,
  MINT: py,
  MLDV: fy,
  MLOG: gy,
  MOD: wy,
  MODI: my,
  MOVE: yy,
  MOVI: by,
  MROO: Iy,
  MUL: Ey,
  MULI: Cy,
  MathArgs: da,
  MathOp: um,
  MulArgs: ua,
  NOOP: xy,
  NOT: Ry,
  OR: Sy,
  ORI: Ty,
  POPH: Ny,
  POPL: Dy,
  PSHH: Fy,
  PSHL: Qy,
  PanicInstruction: Oy,
  PanicReason: hm,
  RET: My,
  RETD: Py,
  RVRT: Ly,
  RegId: l,
  S256: ky,
  SB: Uy,
  SCWQ: Gy,
  SLL: zy,
  SLLI: Xy,
  SMO: Hy,
  SRL: Vy,
  SRLI: Wy,
  SRW: Yy,
  SRWQ: jy,
  SUB: Zy,
  SUBI: Jy,
  SW: qy,
  SWW: $y,
  SWWQ: Ky,
  TIME: tb,
  TR: eb,
  TRO: rb,
  WDAM: nb,
  WDCM: Ya,
  WDDV: ja,
  WDMD: sb,
  WDML: Za,
  WDMM: ib,
  WDOP: Ja,
  WQAM: ab,
  WQCM: qa,
  WQDV: $a,
  WQMD: ob,
  WQML: Ka,
  WQMM: cb,
  WQOP: to,
  XOR: db,
  XORI: ub,
  add: gw,
  addi: mr,
  aloc: Ow,
  and: ww,
  andi: l0,
  bal: u0,
  bhei: Uw,
  bhsh: kw,
  bldd: sm,
  bsiz: Ha,
  burn: Gw,
  call: Xc,
  cb: Vw,
  ccp: zw,
  cfe: P0,
  cfei: O0,
  cfs: L0,
  cfsi: M0,
  croo: Xw,
  csiz: Hw,
  div: mw,
  divi: Xa,
  ecal: nm,
  eck1: r0,
  ecop: im,
  ecr1: n0,
  ed19: s0,
  epar: am,
  eq: yw,
  exp: bw,
  expi: _0,
  flag: d0,
  gm: x0,
  gm_args: ow,
  gt: Iw,
  gtf: c_,
  gtf_args: cw,
  initSync: Ab,
  initWasm: fo,
  ji: Q0,
  jmp: za,
  jmpb: T0,
  jmpf: S0,
  jne: h0,
  jneb: F0,
  jnef: D0,
  jnei: b0,
  jnzb: d_,
  jnzf: N0,
  jnzi: R0,
  k256: i0,
  lb: I0,
  ldc: Yi,
  log: Ww,
  logd: Yw,
  lt: Ew,
  lw: qi,
  mcl: Mw,
  mcli: v0,
  mcp: Pw,
  mcpi: B0,
  meq: Lw,
  mint: jw,
  mldv: Fw,
  mlog: Cw,
  mod_: vw,
  modi: p0,
  move_: ln,
  movi: qn,
  mroo: Bw,
  mul: xw,
  muli: f0,
  noop: c0,
  not: Rw,
  or: Sw,
  ori: g0,
  poph: z0,
  popl: G0,
  pshh: U0,
  pshl: k0,
  ret: vd,
  retd: Qw,
  rvrt: Zw,
  s256: a0,
  sb: E0,
  scwq: Jw,
  sll: Tw,
  slli: w0,
  smo: A0,
  srl: Nw,
  srli: m0,
  srw: qw,
  srwq: $w,
  sub: Ga,
  subi: o_,
  sw: C0,
  sww: Kw,
  swwq: t0,
  time: o0,
  tr: a_,
  tro: e0,
  wdam: K0,
  wdcm: X0,
  wdcm_args: dw,
  wddv: Z0,
  wddv_args: pw,
  wdmd: q0,
  wdml: Y0,
  wdml_args: lw,
  wdmm: em,
  wdop: V0,
  wdop_args: hw,
  wqam: tm,
  wqcm: H0,
  wqcm_args: uw,
  wqdv: J0,
  wqdv_args: fw,
  wqmd: $0,
  wqml: j0,
  wqml_args: _w,
  wqmm: rm,
  wqop: W0,
  wqop_args: Aw,
  xor: Dw,
  xori: y0
}, Symbol.toStringTag, { value: "Module" }));
function W2(r) {
  return r;
}
var pb = /* @__PURE__ */ ((r) => (r.build = "build", r.deploy = "deploy", r.dev = "dev", r.init = "init", r.versions = "versions", r.node = "node", r))(pb || {}), fb = Object.defineProperty, Sr = (r, t) => fb(r, "name", { value: t, configurable: !0 });
function xd() {
  return {
    FUEL_CORE: "0.43.1",
    FORC: "0.68.1",
    FUELS: "0.101.1"
  };
}
Sr(xd, "getBuiltinVersions");
function Hc(r) {
  const [t, e, n] = r.split(".").map((s) => parseInt(s, 10));
  return { major: t, minor: e, patch: n };
}
Sr(Hc, "parseVersion");
function Xn(r, t) {
  const e = Hc(r), n = Hc(t), s = e.major - n.major, i = e.minor - n.minor, a = e.patch - n.patch;
  return {
    major: s,
    minor: i,
    patch: a,
    fullVersionDiff: s || i || a
  };
}
Sr(Xn, "versionDiffs");
function gb(r, t) {
  const { fullVersionDiff: e } = Xn(r, t);
  return e > 0;
}
Sr(gb, "gt");
function wb(r, t) {
  const { fullVersionDiff: e } = Xn(r, t);
  return e === 0;
}
Sr(wb, "eq");
function mb(r, t) {
  const { fullVersionDiff: e } = Xn(r, t);
  return e >= 0;
}
Sr(mb, "gte");
function p_(r, t) {
  const { major: e } = Xn(r, t);
  return e === 0;
}
Sr(p_, "majorEq");
function f_(r, t) {
  const { minor: e } = Xn(r, t);
  return e === 0;
}
Sr(f_, "minorEq");
function g_(r, t) {
  const { patch: e } = Xn(r, t);
  return e === 0;
}
Sr(g_, "patchEq");
function w_(r) {
  const { FUEL_CORE: t } = xd();
  return /^\d+\.\d+\.\d+\D+/m.test(r) && console.warn(`You're running against an unreleased fuel-core version: ${r}. Things may work as expected, but it's not guaranteed. Please use a released version.      
This unreleased fuel-core build may include features and updates not yet supported by this version of the TS-SDK.`), {
    supportedVersion: t,
    isMajorSupported: p_(r, t),
    isMinorSupported: f_(r, t),
    isPatchSupported: g_(r, t)
  };
}
Sr(w_, "checkFuelCoreVersionCompatibility");
var m_ = xd(), yb = Object.defineProperty, bb = (r, t) => yb(r, "name", { value: t, configurable: !0 }), L = /* @__PURE__ */ ((r) => (r.NO_ABIS_FOUND = "no-abis-found", r.ABI_TYPES_AND_VALUES_MISMATCH = "abi-types-and-values-mismatch", r.ABI_MAIN_METHOD_MISSING = "abi-main-method-missing", r.INVALID_COMPONENT = "invalid-component", r.CONFIGURABLE_NOT_FOUND = "configurable-not-found", r.TYPE_NOT_FOUND = "type-not-found", r.LOG_TYPE_NOT_FOUND = "log-type-not-found", r.TYPE_NOT_SUPPORTED = "type-not-supported", r.INVALID_DECODE_VALUE = "invalid-decode-value", r.JSON_ABI_ERROR = "json-abi-error", r.TYPE_ID_NOT_FOUND = "type-id-not-found", r.BIN_FILE_NOT_FOUND = "bin-file-not-found", r.CODER_NOT_FOUND = "coder-not-found", r.INVALID_DATA = "invalid-data", r.FUNCTION_NOT_FOUND = "function-not-found", r.UNSUPPORTED_ENCODING_VERSION = "unsupported-encoding-version", r.TIMEOUT_EXCEEDED = "timeout-exceeded", r.CONFIG_FILE_NOT_FOUND = "config-file-not-found", r.CONFIG_FILE_ALREADY_EXISTS = "config-file-already-exists", r.WORKSPACE_NOT_DETECTED = "workspace-not-detected", r.INVALID_ADDRESS = "invalid-address", r.INVALID_EVM_ADDRESS = "invalid-evm-address", r.INVALID_B256_ADDRESS = "invalid-b256-address", r.CHAIN_INFO_CACHE_EMPTY = "chain-info-cache-empty", r.NODE_INFO_CACHE_EMPTY = "node-info-cache-empty", r.MISSING_PROVIDER = "missing-provider", r.INVALID_PROVIDER = "invalid-provider", r.CONNECTION_REFUSED = "connection-refused", r.INVALID_URL = "invalid-url", r.UNSUPPORTED_FEATURE = "unsupported-feature", r.INVALID_PUBLIC_KEY = "invalid-public-key", r.WALLET_MANAGER_ERROR = "wallet-manager-error", r.HD_WALLET_ERROR = "hd-wallet-error", r.MISSING_CONNECTOR = "missing-connector", r.PARSE_FAILED = "parse-failed", r.ENCODE_ERROR = "encode-error", r.DECODE_ERROR = "decode-error", r.ENV_DEPENDENCY_MISSING = "env-dependency-missing", r.INVALID_TTL = "invalid-ttl", r.INVALID_INPUT_PARAMETERS = "invalid-input-parameters", r.NOT_IMPLEMENTED = "not-implemented", r.NOT_SUPPORTED = "not-supported", r.CONVERTING_FAILED = "converting-error", r.ELEMENT_NOT_FOUND = "element-not-found", r.MISSING_REQUIRED_PARAMETER = "missing-required-parameter", r.INVALID_REQUEST = "invalid-request", r.INVALID_TRANSFER_AMOUNT = "invalid-transfer-amount", r.INSUFFICIENT_FUNDS_OR_MAX_COINS = "not-enough-funds-or-max-coins-reached", r.INVALID_CREDENTIALS = "invalid-credentials", r.HASHER_LOCKED = "hasher-locked", r.GAS_PRICE_TOO_LOW = "gas-price-too-low", r.GAS_LIMIT_TOO_LOW = "gas-limit-too-low", r.MAX_FEE_TOO_LOW = "max-fee-too-low", r.TRANSACTION_NOT_FOUND = "transaction-not-found", r.TRANSACTION_FAILED = "transaction-failed", r.INVALID_CONFIGURABLE_CONSTANTS = "invalid-configurable-constants", r.INVALID_TRANSACTION_INPUT = "invalid-transaction-input", r.INVALID_TRANSACTION_OUTPUT = "invalid-transaction-output", r.INVALID_TRANSACTION_STATUS = "invalid-transaction-status", r.UNSUPPORTED_TRANSACTION_TYPE = "unsupported-transaction-type", r.TRANSACTION_ERROR = "transaction-error", r.INVALID_POLICY_TYPE = "invalid-policy-type", r.DUPLICATED_POLICY = "duplicated-policy", r.TRANSACTION_SQUEEZED_OUT = "transaction-squeezed-out", r.CONTRACT_SIZE_EXCEEDS_LIMIT = "contract-size-exceeds-limit", r.INVALID_CHUNK_SIZE_MULTIPLIER = "invalid-chunk-size-multiplier", r.MAX_INPUTS_EXCEEDED = "max-inputs-exceeded", r.FUNDS_TOO_LOW = "funds-too-low", r.MAX_OUTPUTS_EXCEEDED = "max-outputs-exceeded", r.ASSET_BURN_DETECTED = "asset-burn-detected", r.CHANGE_OUTPUT_COLLISION = "change-output-collision", r.DUPLICATE_CHANGE_OUTPUT_ACCOUNT = "duplicate-change-output-account", r.INVALID_RECEIPT_TYPE = "invalid-receipt-type", r.INVALID_WORD_LIST = "invalid-word-list", r.INVALID_MNEMONIC = "invalid-mnemonic", r.INVALID_ENTROPY = "invalid-entropy", r.INVALID_SEED = "invalid-seed", r.INVALID_CHECKSUM = "invalid-checksum", r.INVALID_PASSWORD = "invalid-password", r.ACCOUNT_REQUIRED = "account-required", r.UNLOCKED_WALLET_REQUIRED = "unlocked-wallet-required", r.NO_COINS_TO_CONSOLIDATE = "no-coins-to-consolidate", r.COINS_ASSET_ID_MISMATCH = "coins-asset-id-mismatch", r.ASSET_NOT_FOUND = "asset-not-found", r.NUMBER_TOO_BIG = "number-too-big", r.ERROR_BUILDING_BLOCK_EXPLORER_URL = "error-building-block-explorer-url", r.RPC_CONSISTENCY = "rpc-consistency", r.VITEPRESS_PLUGIN_ERROR = "vitepress-plugin-error", r.SCRIPT_REVERTED = "script-reverted", r.SCRIPT_RETURN_INVALID_TYPE = "script-return-invalid-type", r.STREAM_PARSING_ERROR = "stream-parsing-error", r.NODE_LAUNCH_FAILED = "node-launch-failed", r.UNKNOWN = "unknown", r))(L || {}), yr, B = (yr = class extends Error {
  constructor(e, n, s = {}, i = null) {
    super(n);
    D(this, "VERSIONS", m_);
    D(this, "metadata");
    D(this, "rawError");
    D(this, "code");
    this.code = e, this.name = "FuelError", this.metadata = s, this.rawError = i;
  }
  static parse(e) {
    const n = e;
    if (n.code === void 0)
      throw new yr(
        "parse-failed",
        "Failed to parse the error object. The required 'code' property is missing."
      );
    const s = Object.values(L);
    if (!s.includes(n.code))
      throw new yr(
        "parse-failed",
        `Unknown error code: ${n.code}. Accepted codes: ${s.join(", ")}.`
      );
    return new yr(n.code, n.message);
  }
  toObject() {
    const { code: e, name: n, message: s, metadata: i, VERSIONS: a, rawError: o } = this;
    return { code: e, name: n, message: s, metadata: i, VERSIONS: a, rawError: o };
  }
}, bb(yr, "FuelError"), D(yr, "CODES", L), yr), jA = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function y_(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function Ib(r) {
  if (r.__esModule) return r;
  var t = r.default;
  if (typeof t == "function") {
    var e = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    e.prototype = t.prototype;
  } else e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var s = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(e, n, s.get ? s : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), e;
}
var va = { exports: {} };
const Eb = {}, Cb = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Eb
}, Symbol.toStringTag, { value: "Module" })), Bb = /* @__PURE__ */ Ib(Cb);
var vb = va.exports, ZA;
function xb() {
  return ZA || (ZA = 1, function(r) {
    (function(t, e) {
      function n(v, u) {
        if (!v) throw new Error(u || "Assertion failed");
      }
      function s(v, u) {
        v.super_ = u;
        var A = function() {
        };
        A.prototype = u.prototype, v.prototype = new A(), v.prototype.constructor = v;
      }
      function i(v, u, A) {
        if (i.isBN(v))
          return v;
        this.negative = 0, this.words = null, this.length = 0, this.red = null, v !== null && ((u === "le" || u === "be") && (A = u, u = 10), this._init(v || 0, u || 10, A || "be"));
      }
      typeof t == "object" ? t.exports = i : e.BN = i, i.BN = i, i.wordSize = 26;
      var a;
      try {
        typeof window < "u" && typeof window.Buffer < "u" ? a = window.Buffer : a = Bb.Buffer;
      } catch {
      }
      i.isBN = function(u) {
        return u instanceof i ? !0 : u !== null && typeof u == "object" && u.constructor.wordSize === i.wordSize && Array.isArray(u.words);
      }, i.max = function(u, A) {
        return u.cmp(A) > 0 ? u : A;
      }, i.min = function(u, A) {
        return u.cmp(A) < 0 ? u : A;
      }, i.prototype._init = function(u, A, p) {
        if (typeof u == "number")
          return this._initNumber(u, A, p);
        if (typeof u == "object")
          return this._initArray(u, A, p);
        A === "hex" && (A = 16), n(A === (A | 0) && A >= 2 && A <= 36), u = u.toString().replace(/\s+/g, "");
        var m = 0;
        u[0] === "-" && (m++, this.negative = 1), m < u.length && (A === 16 ? this._parseHex(u, m, p) : (this._parseBase(u, A, m), p === "le" && this._initArray(this.toArray(), A, p)));
      }, i.prototype._initNumber = function(u, A, p) {
        u < 0 && (this.negative = 1, u = -u), u < 67108864 ? (this.words = [u & 67108863], this.length = 1) : u < 4503599627370496 ? (this.words = [
          u & 67108863,
          u / 67108864 & 67108863
        ], this.length = 2) : (n(u < 9007199254740992), this.words = [
          u & 67108863,
          u / 67108864 & 67108863,
          1
        ], this.length = 3), p === "le" && this._initArray(this.toArray(), A, p);
      }, i.prototype._initArray = function(u, A, p) {
        if (n(typeof u.length == "number"), u.length <= 0)
          return this.words = [0], this.length = 1, this;
        this.length = Math.ceil(u.length / 3), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var b, S, F = 0;
        if (p === "be")
          for (m = u.length - 1, b = 0; m >= 0; m -= 3)
            S = u[m] | u[m - 1] << 8 | u[m - 2] << 16, this.words[b] |= S << F & 67108863, this.words[b + 1] = S >>> 26 - F & 67108863, F += 24, F >= 26 && (F -= 26, b++);
        else if (p === "le")
          for (m = 0, b = 0; m < u.length; m += 3)
            S = u[m] | u[m + 1] << 8 | u[m + 2] << 16, this.words[b] |= S << F & 67108863, this.words[b + 1] = S >>> 26 - F & 67108863, F += 24, F >= 26 && (F -= 26, b++);
        return this._strip();
      };
      function o(v, u) {
        var A = v.charCodeAt(u);
        if (A >= 48 && A <= 57)
          return A - 48;
        if (A >= 65 && A <= 70)
          return A - 55;
        if (A >= 97 && A <= 102)
          return A - 87;
        n(!1, "Invalid character in " + v);
      }
      function d(v, u, A) {
        var p = o(v, A);
        return A - 1 >= u && (p |= o(v, A - 1) << 4), p;
      }
      i.prototype._parseHex = function(u, A, p) {
        this.length = Math.ceil((u.length - A) / 6), this.words = new Array(this.length);
        for (var m = 0; m < this.length; m++)
          this.words[m] = 0;
        var b = 0, S = 0, F;
        if (p === "be")
          for (m = u.length - 1; m >= A; m -= 2)
            F = d(u, A, m) << b, this.words[S] |= F & 67108863, b >= 18 ? (b -= 18, S += 1, this.words[S] |= F >>> 26) : b += 8;
        else {
          var I = u.length - A;
          for (m = I % 2 === 0 ? A + 1 : A; m < u.length; m += 2)
            F = d(u, A, m) << b, this.words[S] |= F & 67108863, b >= 18 ? (b -= 18, S += 1, this.words[S] |= F >>> 26) : b += 8;
        }
        this._strip();
      };
      function h(v, u, A, p) {
        for (var m = 0, b = 0, S = Math.min(v.length, A), F = u; F < S; F++) {
          var I = v.charCodeAt(F) - 48;
          m *= p, I >= 49 ? b = I - 49 + 10 : I >= 17 ? b = I - 17 + 10 : b = I, n(I >= 0 && b < p, "Invalid character"), m += b;
        }
        return m;
      }
      i.prototype._parseBase = function(u, A, p) {
        this.words = [0], this.length = 1;
        for (var m = 0, b = 1; b <= 67108863; b *= A)
          m++;
        m--, b = b / A | 0;
        for (var S = u.length - p, F = S % m, I = Math.min(S, S - F) + p, _ = 0, C = p; C < I; C += m)
          _ = h(u, C, C + m, A), this.imuln(b), this.words[0] + _ < 67108864 ? this.words[0] += _ : this._iaddn(_);
        if (F !== 0) {
          var tt = 1;
          for (_ = h(u, C, u.length, A), C = 0; C < F; C++)
            tt *= A;
          this.imuln(tt), this.words[0] + _ < 67108864 ? this.words[0] += _ : this._iaddn(_);
        }
        this._strip();
      }, i.prototype.copy = function(u) {
        u.words = new Array(this.length);
        for (var A = 0; A < this.length; A++)
          u.words[A] = this.words[A];
        u.length = this.length, u.negative = this.negative, u.red = this.red;
      };
      function f(v, u) {
        v.words = u.words, v.length = u.length, v.negative = u.negative, v.red = u.red;
      }
      if (i.prototype._move = function(u) {
        f(u, this);
      }, i.prototype.clone = function() {
        var u = new i(null);
        return this.copy(u), u;
      }, i.prototype._expand = function(u) {
        for (; this.length < u; )
          this.words[this.length++] = 0;
        return this;
      }, i.prototype._strip = function() {
        for (; this.length > 1 && this.words[this.length - 1] === 0; )
          this.length--;
        return this._normSign();
      }, i.prototype._normSign = function() {
        return this.length === 1 && this.words[0] === 0 && (this.negative = 0), this;
      }, typeof Symbol < "u" && typeof Symbol.for == "function")
        try {
          i.prototype[Symbol.for("nodejs.util.inspect.custom")] = g;
        } catch {
          i.prototype.inspect = g;
        }
      else
        i.prototype.inspect = g;
      function g() {
        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
      }
      var y = [
        "",
        "0",
        "00",
        "000",
        "0000",
        "00000",
        "000000",
        "0000000",
        "00000000",
        "000000000",
        "0000000000",
        "00000000000",
        "000000000000",
        "0000000000000",
        "00000000000000",
        "000000000000000",
        "0000000000000000",
        "00000000000000000",
        "000000000000000000",
        "0000000000000000000",
        "00000000000000000000",
        "000000000000000000000",
        "0000000000000000000000",
        "00000000000000000000000",
        "000000000000000000000000",
        "0000000000000000000000000"
      ], R = [
        0,
        0,
        25,
        16,
        12,
        11,
        10,
        9,
        8,
        8,
        7,
        7,
        7,
        7,
        6,
        6,
        6,
        6,
        6,
        6,
        6,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5,
        5
      ], Q = [
        0,
        0,
        33554432,
        43046721,
        16777216,
        48828125,
        60466176,
        40353607,
        16777216,
        43046721,
        1e7,
        19487171,
        35831808,
        62748517,
        7529536,
        11390625,
        16777216,
        24137569,
        34012224,
        47045881,
        64e6,
        4084101,
        5153632,
        6436343,
        7962624,
        9765625,
        11881376,
        14348907,
        17210368,
        20511149,
        243e5,
        28629151,
        33554432,
        39135393,
        45435424,
        52521875,
        60466176
      ];
      i.prototype.toString = function(u, A) {
        u = u || 10, A = A | 0 || 1;
        var p;
        if (u === 16 || u === "hex") {
          p = "";
          for (var m = 0, b = 0, S = 0; S < this.length; S++) {
            var F = this.words[S], I = ((F << m | b) & 16777215).toString(16);
            b = F >>> 24 - m & 16777215, m += 2, m >= 26 && (m -= 26, S--), b !== 0 || S !== this.length - 1 ? p = y[6 - I.length] + I + p : p = I + p;
          }
          for (b !== 0 && (p = b.toString(16) + p); p.length % A !== 0; )
            p = "0" + p;
          return this.negative !== 0 && (p = "-" + p), p;
        }
        if (u === (u | 0) && u >= 2 && u <= 36) {
          var _ = R[u], C = Q[u];
          p = "";
          var tt = this.clone();
          for (tt.negative = 0; !tt.isZero(); ) {
            var et = tt.modrn(C).toString(u);
            tt = tt.idivn(C), tt.isZero() ? p = et + p : p = y[_ - et.length] + et + p;
          }
          for (this.isZero() && (p = "0" + p); p.length % A !== 0; )
            p = "0" + p;
          return this.negative !== 0 && (p = "-" + p), p;
        }
        n(!1, "Base should be between 2 and 36");
      }, i.prototype.toNumber = function() {
        var u = this.words[0];
        return this.length === 2 ? u += this.words[1] * 67108864 : this.length === 3 && this.words[2] === 1 ? u += 4503599627370496 + this.words[1] * 67108864 : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), this.negative !== 0 ? -u : u;
      }, i.prototype.toJSON = function() {
        return this.toString(16, 2);
      }, a && (i.prototype.toBuffer = function(u, A) {
        return this.toArrayLike(a, u, A);
      }), i.prototype.toArray = function(u, A) {
        return this.toArrayLike(Array, u, A);
      };
      var x = function(u, A) {
        return u.allocUnsafe ? u.allocUnsafe(A) : new u(A);
      };
      i.prototype.toArrayLike = function(u, A, p) {
        this._strip();
        var m = this.byteLength(), b = p || Math.max(1, m);
        n(m <= b, "byte array longer than desired length"), n(b > 0, "Requested array length <= 0");
        var S = x(u, b), F = A === "le" ? "LE" : "BE";
        return this["_toArrayLike" + F](S, m), S;
      }, i.prototype._toArrayLikeLE = function(u, A) {
        for (var p = 0, m = 0, b = 0, S = 0; b < this.length; b++) {
          var F = this.words[b] << S | m;
          u[p++] = F & 255, p < u.length && (u[p++] = F >> 8 & 255), p < u.length && (u[p++] = F >> 16 & 255), S === 6 ? (p < u.length && (u[p++] = F >> 24 & 255), m = 0, S = 0) : (m = F >>> 24, S += 2);
        }
        if (p < u.length)
          for (u[p++] = m; p < u.length; )
            u[p++] = 0;
      }, i.prototype._toArrayLikeBE = function(u, A) {
        for (var p = u.length - 1, m = 0, b = 0, S = 0; b < this.length; b++) {
          var F = this.words[b] << S | m;
          u[p--] = F & 255, p >= 0 && (u[p--] = F >> 8 & 255), p >= 0 && (u[p--] = F >> 16 & 255), S === 6 ? (p >= 0 && (u[p--] = F >> 24 & 255), m = 0, S = 0) : (m = F >>> 24, S += 2);
        }
        if (p >= 0)
          for (u[p--] = m; p >= 0; )
            u[p--] = 0;
      }, Math.clz32 ? i.prototype._countBits = function(u) {
        return 32 - Math.clz32(u);
      } : i.prototype._countBits = function(u) {
        var A = u, p = 0;
        return A >= 4096 && (p += 13, A >>>= 13), A >= 64 && (p += 7, A >>>= 7), A >= 8 && (p += 4, A >>>= 4), A >= 2 && (p += 2, A >>>= 2), p + A;
      }, i.prototype._zeroBits = function(u) {
        if (u === 0) return 26;
        var A = u, p = 0;
        return A & 8191 || (p += 13, A >>>= 13), A & 127 || (p += 7, A >>>= 7), A & 15 || (p += 4, A >>>= 4), A & 3 || (p += 2, A >>>= 2), A & 1 || p++, p;
      }, i.prototype.bitLength = function() {
        var u = this.words[this.length - 1], A = this._countBits(u);
        return (this.length - 1) * 26 + A;
      };
      function N(v) {
        for (var u = new Array(v.bitLength()), A = 0; A < u.length; A++) {
          var p = A / 26 | 0, m = A % 26;
          u[A] = v.words[p] >>> m & 1;
        }
        return u;
      }
      i.prototype.zeroBits = function() {
        if (this.isZero()) return 0;
        for (var u = 0, A = 0; A < this.length; A++) {
          var p = this._zeroBits(this.words[A]);
          if (u += p, p !== 26) break;
        }
        return u;
      }, i.prototype.byteLength = function() {
        return Math.ceil(this.bitLength() / 8);
      }, i.prototype.toTwos = function(u) {
        return this.negative !== 0 ? this.abs().inotn(u).iaddn(1) : this.clone();
      }, i.prototype.fromTwos = function(u) {
        return this.testn(u - 1) ? this.notn(u).iaddn(1).ineg() : this.clone();
      }, i.prototype.isNeg = function() {
        return this.negative !== 0;
      }, i.prototype.neg = function() {
        return this.clone().ineg();
      }, i.prototype.ineg = function() {
        return this.isZero() || (this.negative ^= 1), this;
      }, i.prototype.iuor = function(u) {
        for (; this.length < u.length; )
          this.words[this.length++] = 0;
        for (var A = 0; A < u.length; A++)
          this.words[A] = this.words[A] | u.words[A];
        return this._strip();
      }, i.prototype.ior = function(u) {
        return n((this.negative | u.negative) === 0), this.iuor(u);
      }, i.prototype.or = function(u) {
        return this.length > u.length ? this.clone().ior(u) : u.clone().ior(this);
      }, i.prototype.uor = function(u) {
        return this.length > u.length ? this.clone().iuor(u) : u.clone().iuor(this);
      }, i.prototype.iuand = function(u) {
        var A;
        this.length > u.length ? A = u : A = this;
        for (var p = 0; p < A.length; p++)
          this.words[p] = this.words[p] & u.words[p];
        return this.length = A.length, this._strip();
      }, i.prototype.iand = function(u) {
        return n((this.negative | u.negative) === 0), this.iuand(u);
      }, i.prototype.and = function(u) {
        return this.length > u.length ? this.clone().iand(u) : u.clone().iand(this);
      }, i.prototype.uand = function(u) {
        return this.length > u.length ? this.clone().iuand(u) : u.clone().iuand(this);
      }, i.prototype.iuxor = function(u) {
        var A, p;
        this.length > u.length ? (A = this, p = u) : (A = u, p = this);
        for (var m = 0; m < p.length; m++)
          this.words[m] = A.words[m] ^ p.words[m];
        if (this !== A)
          for (; m < A.length; m++)
            this.words[m] = A.words[m];
        return this.length = A.length, this._strip();
      }, i.prototype.ixor = function(u) {
        return n((this.negative | u.negative) === 0), this.iuxor(u);
      }, i.prototype.xor = function(u) {
        return this.length > u.length ? this.clone().ixor(u) : u.clone().ixor(this);
      }, i.prototype.uxor = function(u) {
        return this.length > u.length ? this.clone().iuxor(u) : u.clone().iuxor(this);
      }, i.prototype.inotn = function(u) {
        n(typeof u == "number" && u >= 0);
        var A = Math.ceil(u / 26) | 0, p = u % 26;
        this._expand(A), p > 0 && A--;
        for (var m = 0; m < A; m++)
          this.words[m] = ~this.words[m] & 67108863;
        return p > 0 && (this.words[m] = ~this.words[m] & 67108863 >> 26 - p), this._strip();
      }, i.prototype.notn = function(u) {
        return this.clone().inotn(u);
      }, i.prototype.setn = function(u, A) {
        n(typeof u == "number" && u >= 0);
        var p = u / 26 | 0, m = u % 26;
        return this._expand(p + 1), A ? this.words[p] = this.words[p] | 1 << m : this.words[p] = this.words[p] & ~(1 << m), this._strip();
      }, i.prototype.iadd = function(u) {
        var A;
        if (this.negative !== 0 && u.negative === 0)
          return this.negative = 0, A = this.isub(u), this.negative ^= 1, this._normSign();
        if (this.negative === 0 && u.negative !== 0)
          return u.negative = 0, A = this.isub(u), u.negative = 1, A._normSign();
        var p, m;
        this.length > u.length ? (p = this, m = u) : (p = u, m = this);
        for (var b = 0, S = 0; S < m.length; S++)
          A = (p.words[S] | 0) + (m.words[S] | 0) + b, this.words[S] = A & 67108863, b = A >>> 26;
        for (; b !== 0 && S < p.length; S++)
          A = (p.words[S] | 0) + b, this.words[S] = A & 67108863, b = A >>> 26;
        if (this.length = p.length, b !== 0)
          this.words[this.length] = b, this.length++;
        else if (p !== this)
          for (; S < p.length; S++)
            this.words[S] = p.words[S];
        return this;
      }, i.prototype.add = function(u) {
        var A;
        return u.negative !== 0 && this.negative === 0 ? (u.negative = 0, A = this.sub(u), u.negative ^= 1, A) : u.negative === 0 && this.negative !== 0 ? (this.negative = 0, A = u.sub(this), this.negative = 1, A) : this.length > u.length ? this.clone().iadd(u) : u.clone().iadd(this);
      }, i.prototype.isub = function(u) {
        if (u.negative !== 0) {
          u.negative = 0;
          var A = this.iadd(u);
          return u.negative = 1, A._normSign();
        } else if (this.negative !== 0)
          return this.negative = 0, this.iadd(u), this.negative = 1, this._normSign();
        var p = this.cmp(u);
        if (p === 0)
          return this.negative = 0, this.length = 1, this.words[0] = 0, this;
        var m, b;
        p > 0 ? (m = this, b = u) : (m = u, b = this);
        for (var S = 0, F = 0; F < b.length; F++)
          A = (m.words[F] | 0) - (b.words[F] | 0) + S, S = A >> 26, this.words[F] = A & 67108863;
        for (; S !== 0 && F < m.length; F++)
          A = (m.words[F] | 0) + S, S = A >> 26, this.words[F] = A & 67108863;
        if (S === 0 && F < m.length && m !== this)
          for (; F < m.length; F++)
            this.words[F] = m.words[F];
        return this.length = Math.max(this.length, F), m !== this && (this.negative = 1), this._strip();
      }, i.prototype.sub = function(u) {
        return this.clone().isub(u);
      };
      function U(v, u, A) {
        A.negative = u.negative ^ v.negative;
        var p = v.length + u.length | 0;
        A.length = p, p = p - 1 | 0;
        var m = v.words[0] | 0, b = u.words[0] | 0, S = m * b, F = S & 67108863, I = S / 67108864 | 0;
        A.words[0] = F;
        for (var _ = 1; _ < p; _++) {
          for (var C = I >>> 26, tt = I & 67108863, et = Math.min(_, u.length - 1), nt = Math.max(0, _ - v.length + 1); nt <= et; nt++) {
            var Ft = _ - nt | 0;
            m = v.words[Ft] | 0, b = u.words[nt] | 0, S = m * b + tt, C += S / 67108864 | 0, tt = S & 67108863;
          }
          A.words[_] = tt | 0, I = C | 0;
        }
        return I !== 0 ? A.words[_] = I | 0 : A.length--, A._strip();
      }
      var H = function(u, A, p) {
        var m = u.words, b = A.words, S = p.words, F = 0, I, _, C, tt = m[0] | 0, et = tt & 8191, nt = tt >>> 13, Ft = m[1] | 0, ft = Ft & 8191, Et = Ft >>> 13, nr = m[2] | 0, Rt = nr & 8191, Bt = nr >>> 13, Oe = m[3] | 0, Tt = Oe & 8191, Qt = Oe >>> 13, Ru = m[4] | 0, Xt = Ru & 8191, Ht = Ru >>> 13, Su = m[5] | 0, Vt = Su & 8191, Wt = Su >>> 13, Tu = m[6] | 0, Yt = Tu & 8191, jt = Tu >>> 13, Nu = m[7] | 0, Zt = Nu & 8191, Jt = Nu >>> 13, Du = m[8] | 0, qt = Du & 8191, $t = Du >>> 13, Fu = m[9] | 0, Kt = Fu & 8191, te = Fu >>> 13, Qu = b[0] | 0, ee = Qu & 8191, re = Qu >>> 13, Ou = b[1] | 0, ne = Ou & 8191, se = Ou >>> 13, Mu = b[2] | 0, ie = Mu & 8191, ae = Mu >>> 13, Pu = b[3] | 0, oe = Pu & 8191, ce = Pu >>> 13, Lu = b[4] | 0, de = Lu & 8191, ue = Lu >>> 13, ku = b[5] | 0, he = ku & 8191, Ae = ku >>> 13, Uu = b[6] | 0, le = Uu & 8191, _e = Uu >>> 13, Gu = b[7] | 0, pe = Gu & 8191, fe = Gu >>> 13, zu = b[8] | 0, ge = zu & 8191, we = zu >>> 13, Xu = b[9] | 0, me = Xu & 8191, ye = Xu >>> 13;
        p.negative = u.negative ^ A.negative, p.length = 19, I = Math.imul(et, ee), _ = Math.imul(et, re), _ = _ + Math.imul(nt, ee) | 0, C = Math.imul(nt, re);
        var Zo = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (Zo >>> 26) | 0, Zo &= 67108863, I = Math.imul(ft, ee), _ = Math.imul(ft, re), _ = _ + Math.imul(Et, ee) | 0, C = Math.imul(Et, re), I = I + Math.imul(et, ne) | 0, _ = _ + Math.imul(et, se) | 0, _ = _ + Math.imul(nt, ne) | 0, C = C + Math.imul(nt, se) | 0;
        var Jo = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (Jo >>> 26) | 0, Jo &= 67108863, I = Math.imul(Rt, ee), _ = Math.imul(Rt, re), _ = _ + Math.imul(Bt, ee) | 0, C = Math.imul(Bt, re), I = I + Math.imul(ft, ne) | 0, _ = _ + Math.imul(ft, se) | 0, _ = _ + Math.imul(Et, ne) | 0, C = C + Math.imul(Et, se) | 0, I = I + Math.imul(et, ie) | 0, _ = _ + Math.imul(et, ae) | 0, _ = _ + Math.imul(nt, ie) | 0, C = C + Math.imul(nt, ae) | 0;
        var qo = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (qo >>> 26) | 0, qo &= 67108863, I = Math.imul(Tt, ee), _ = Math.imul(Tt, re), _ = _ + Math.imul(Qt, ee) | 0, C = Math.imul(Qt, re), I = I + Math.imul(Rt, ne) | 0, _ = _ + Math.imul(Rt, se) | 0, _ = _ + Math.imul(Bt, ne) | 0, C = C + Math.imul(Bt, se) | 0, I = I + Math.imul(ft, ie) | 0, _ = _ + Math.imul(ft, ae) | 0, _ = _ + Math.imul(Et, ie) | 0, C = C + Math.imul(Et, ae) | 0, I = I + Math.imul(et, oe) | 0, _ = _ + Math.imul(et, ce) | 0, _ = _ + Math.imul(nt, oe) | 0, C = C + Math.imul(nt, ce) | 0;
        var $o = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + ($o >>> 26) | 0, $o &= 67108863, I = Math.imul(Xt, ee), _ = Math.imul(Xt, re), _ = _ + Math.imul(Ht, ee) | 0, C = Math.imul(Ht, re), I = I + Math.imul(Tt, ne) | 0, _ = _ + Math.imul(Tt, se) | 0, _ = _ + Math.imul(Qt, ne) | 0, C = C + Math.imul(Qt, se) | 0, I = I + Math.imul(Rt, ie) | 0, _ = _ + Math.imul(Rt, ae) | 0, _ = _ + Math.imul(Bt, ie) | 0, C = C + Math.imul(Bt, ae) | 0, I = I + Math.imul(ft, oe) | 0, _ = _ + Math.imul(ft, ce) | 0, _ = _ + Math.imul(Et, oe) | 0, C = C + Math.imul(Et, ce) | 0, I = I + Math.imul(et, de) | 0, _ = _ + Math.imul(et, ue) | 0, _ = _ + Math.imul(nt, de) | 0, C = C + Math.imul(nt, ue) | 0;
        var Ko = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (Ko >>> 26) | 0, Ko &= 67108863, I = Math.imul(Vt, ee), _ = Math.imul(Vt, re), _ = _ + Math.imul(Wt, ee) | 0, C = Math.imul(Wt, re), I = I + Math.imul(Xt, ne) | 0, _ = _ + Math.imul(Xt, se) | 0, _ = _ + Math.imul(Ht, ne) | 0, C = C + Math.imul(Ht, se) | 0, I = I + Math.imul(Tt, ie) | 0, _ = _ + Math.imul(Tt, ae) | 0, _ = _ + Math.imul(Qt, ie) | 0, C = C + Math.imul(Qt, ae) | 0, I = I + Math.imul(Rt, oe) | 0, _ = _ + Math.imul(Rt, ce) | 0, _ = _ + Math.imul(Bt, oe) | 0, C = C + Math.imul(Bt, ce) | 0, I = I + Math.imul(ft, de) | 0, _ = _ + Math.imul(ft, ue) | 0, _ = _ + Math.imul(Et, de) | 0, C = C + Math.imul(Et, ue) | 0, I = I + Math.imul(et, he) | 0, _ = _ + Math.imul(et, Ae) | 0, _ = _ + Math.imul(nt, he) | 0, C = C + Math.imul(nt, Ae) | 0;
        var tc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (tc >>> 26) | 0, tc &= 67108863, I = Math.imul(Yt, ee), _ = Math.imul(Yt, re), _ = _ + Math.imul(jt, ee) | 0, C = Math.imul(jt, re), I = I + Math.imul(Vt, ne) | 0, _ = _ + Math.imul(Vt, se) | 0, _ = _ + Math.imul(Wt, ne) | 0, C = C + Math.imul(Wt, se) | 0, I = I + Math.imul(Xt, ie) | 0, _ = _ + Math.imul(Xt, ae) | 0, _ = _ + Math.imul(Ht, ie) | 0, C = C + Math.imul(Ht, ae) | 0, I = I + Math.imul(Tt, oe) | 0, _ = _ + Math.imul(Tt, ce) | 0, _ = _ + Math.imul(Qt, oe) | 0, C = C + Math.imul(Qt, ce) | 0, I = I + Math.imul(Rt, de) | 0, _ = _ + Math.imul(Rt, ue) | 0, _ = _ + Math.imul(Bt, de) | 0, C = C + Math.imul(Bt, ue) | 0, I = I + Math.imul(ft, he) | 0, _ = _ + Math.imul(ft, Ae) | 0, _ = _ + Math.imul(Et, he) | 0, C = C + Math.imul(Et, Ae) | 0, I = I + Math.imul(et, le) | 0, _ = _ + Math.imul(et, _e) | 0, _ = _ + Math.imul(nt, le) | 0, C = C + Math.imul(nt, _e) | 0;
        var ec = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (ec >>> 26) | 0, ec &= 67108863, I = Math.imul(Zt, ee), _ = Math.imul(Zt, re), _ = _ + Math.imul(Jt, ee) | 0, C = Math.imul(Jt, re), I = I + Math.imul(Yt, ne) | 0, _ = _ + Math.imul(Yt, se) | 0, _ = _ + Math.imul(jt, ne) | 0, C = C + Math.imul(jt, se) | 0, I = I + Math.imul(Vt, ie) | 0, _ = _ + Math.imul(Vt, ae) | 0, _ = _ + Math.imul(Wt, ie) | 0, C = C + Math.imul(Wt, ae) | 0, I = I + Math.imul(Xt, oe) | 0, _ = _ + Math.imul(Xt, ce) | 0, _ = _ + Math.imul(Ht, oe) | 0, C = C + Math.imul(Ht, ce) | 0, I = I + Math.imul(Tt, de) | 0, _ = _ + Math.imul(Tt, ue) | 0, _ = _ + Math.imul(Qt, de) | 0, C = C + Math.imul(Qt, ue) | 0, I = I + Math.imul(Rt, he) | 0, _ = _ + Math.imul(Rt, Ae) | 0, _ = _ + Math.imul(Bt, he) | 0, C = C + Math.imul(Bt, Ae) | 0, I = I + Math.imul(ft, le) | 0, _ = _ + Math.imul(ft, _e) | 0, _ = _ + Math.imul(Et, le) | 0, C = C + Math.imul(Et, _e) | 0, I = I + Math.imul(et, pe) | 0, _ = _ + Math.imul(et, fe) | 0, _ = _ + Math.imul(nt, pe) | 0, C = C + Math.imul(nt, fe) | 0;
        var rc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (rc >>> 26) | 0, rc &= 67108863, I = Math.imul(qt, ee), _ = Math.imul(qt, re), _ = _ + Math.imul($t, ee) | 0, C = Math.imul($t, re), I = I + Math.imul(Zt, ne) | 0, _ = _ + Math.imul(Zt, se) | 0, _ = _ + Math.imul(Jt, ne) | 0, C = C + Math.imul(Jt, se) | 0, I = I + Math.imul(Yt, ie) | 0, _ = _ + Math.imul(Yt, ae) | 0, _ = _ + Math.imul(jt, ie) | 0, C = C + Math.imul(jt, ae) | 0, I = I + Math.imul(Vt, oe) | 0, _ = _ + Math.imul(Vt, ce) | 0, _ = _ + Math.imul(Wt, oe) | 0, C = C + Math.imul(Wt, ce) | 0, I = I + Math.imul(Xt, de) | 0, _ = _ + Math.imul(Xt, ue) | 0, _ = _ + Math.imul(Ht, de) | 0, C = C + Math.imul(Ht, ue) | 0, I = I + Math.imul(Tt, he) | 0, _ = _ + Math.imul(Tt, Ae) | 0, _ = _ + Math.imul(Qt, he) | 0, C = C + Math.imul(Qt, Ae) | 0, I = I + Math.imul(Rt, le) | 0, _ = _ + Math.imul(Rt, _e) | 0, _ = _ + Math.imul(Bt, le) | 0, C = C + Math.imul(Bt, _e) | 0, I = I + Math.imul(ft, pe) | 0, _ = _ + Math.imul(ft, fe) | 0, _ = _ + Math.imul(Et, pe) | 0, C = C + Math.imul(Et, fe) | 0, I = I + Math.imul(et, ge) | 0, _ = _ + Math.imul(et, we) | 0, _ = _ + Math.imul(nt, ge) | 0, C = C + Math.imul(nt, we) | 0;
        var nc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (nc >>> 26) | 0, nc &= 67108863, I = Math.imul(Kt, ee), _ = Math.imul(Kt, re), _ = _ + Math.imul(te, ee) | 0, C = Math.imul(te, re), I = I + Math.imul(qt, ne) | 0, _ = _ + Math.imul(qt, se) | 0, _ = _ + Math.imul($t, ne) | 0, C = C + Math.imul($t, se) | 0, I = I + Math.imul(Zt, ie) | 0, _ = _ + Math.imul(Zt, ae) | 0, _ = _ + Math.imul(Jt, ie) | 0, C = C + Math.imul(Jt, ae) | 0, I = I + Math.imul(Yt, oe) | 0, _ = _ + Math.imul(Yt, ce) | 0, _ = _ + Math.imul(jt, oe) | 0, C = C + Math.imul(jt, ce) | 0, I = I + Math.imul(Vt, de) | 0, _ = _ + Math.imul(Vt, ue) | 0, _ = _ + Math.imul(Wt, de) | 0, C = C + Math.imul(Wt, ue) | 0, I = I + Math.imul(Xt, he) | 0, _ = _ + Math.imul(Xt, Ae) | 0, _ = _ + Math.imul(Ht, he) | 0, C = C + Math.imul(Ht, Ae) | 0, I = I + Math.imul(Tt, le) | 0, _ = _ + Math.imul(Tt, _e) | 0, _ = _ + Math.imul(Qt, le) | 0, C = C + Math.imul(Qt, _e) | 0, I = I + Math.imul(Rt, pe) | 0, _ = _ + Math.imul(Rt, fe) | 0, _ = _ + Math.imul(Bt, pe) | 0, C = C + Math.imul(Bt, fe) | 0, I = I + Math.imul(ft, ge) | 0, _ = _ + Math.imul(ft, we) | 0, _ = _ + Math.imul(Et, ge) | 0, C = C + Math.imul(Et, we) | 0, I = I + Math.imul(et, me) | 0, _ = _ + Math.imul(et, ye) | 0, _ = _ + Math.imul(nt, me) | 0, C = C + Math.imul(nt, ye) | 0;
        var sc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (sc >>> 26) | 0, sc &= 67108863, I = Math.imul(Kt, ne), _ = Math.imul(Kt, se), _ = _ + Math.imul(te, ne) | 0, C = Math.imul(te, se), I = I + Math.imul(qt, ie) | 0, _ = _ + Math.imul(qt, ae) | 0, _ = _ + Math.imul($t, ie) | 0, C = C + Math.imul($t, ae) | 0, I = I + Math.imul(Zt, oe) | 0, _ = _ + Math.imul(Zt, ce) | 0, _ = _ + Math.imul(Jt, oe) | 0, C = C + Math.imul(Jt, ce) | 0, I = I + Math.imul(Yt, de) | 0, _ = _ + Math.imul(Yt, ue) | 0, _ = _ + Math.imul(jt, de) | 0, C = C + Math.imul(jt, ue) | 0, I = I + Math.imul(Vt, he) | 0, _ = _ + Math.imul(Vt, Ae) | 0, _ = _ + Math.imul(Wt, he) | 0, C = C + Math.imul(Wt, Ae) | 0, I = I + Math.imul(Xt, le) | 0, _ = _ + Math.imul(Xt, _e) | 0, _ = _ + Math.imul(Ht, le) | 0, C = C + Math.imul(Ht, _e) | 0, I = I + Math.imul(Tt, pe) | 0, _ = _ + Math.imul(Tt, fe) | 0, _ = _ + Math.imul(Qt, pe) | 0, C = C + Math.imul(Qt, fe) | 0, I = I + Math.imul(Rt, ge) | 0, _ = _ + Math.imul(Rt, we) | 0, _ = _ + Math.imul(Bt, ge) | 0, C = C + Math.imul(Bt, we) | 0, I = I + Math.imul(ft, me) | 0, _ = _ + Math.imul(ft, ye) | 0, _ = _ + Math.imul(Et, me) | 0, C = C + Math.imul(Et, ye) | 0;
        var ic = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (ic >>> 26) | 0, ic &= 67108863, I = Math.imul(Kt, ie), _ = Math.imul(Kt, ae), _ = _ + Math.imul(te, ie) | 0, C = Math.imul(te, ae), I = I + Math.imul(qt, oe) | 0, _ = _ + Math.imul(qt, ce) | 0, _ = _ + Math.imul($t, oe) | 0, C = C + Math.imul($t, ce) | 0, I = I + Math.imul(Zt, de) | 0, _ = _ + Math.imul(Zt, ue) | 0, _ = _ + Math.imul(Jt, de) | 0, C = C + Math.imul(Jt, ue) | 0, I = I + Math.imul(Yt, he) | 0, _ = _ + Math.imul(Yt, Ae) | 0, _ = _ + Math.imul(jt, he) | 0, C = C + Math.imul(jt, Ae) | 0, I = I + Math.imul(Vt, le) | 0, _ = _ + Math.imul(Vt, _e) | 0, _ = _ + Math.imul(Wt, le) | 0, C = C + Math.imul(Wt, _e) | 0, I = I + Math.imul(Xt, pe) | 0, _ = _ + Math.imul(Xt, fe) | 0, _ = _ + Math.imul(Ht, pe) | 0, C = C + Math.imul(Ht, fe) | 0, I = I + Math.imul(Tt, ge) | 0, _ = _ + Math.imul(Tt, we) | 0, _ = _ + Math.imul(Qt, ge) | 0, C = C + Math.imul(Qt, we) | 0, I = I + Math.imul(Rt, me) | 0, _ = _ + Math.imul(Rt, ye) | 0, _ = _ + Math.imul(Bt, me) | 0, C = C + Math.imul(Bt, ye) | 0;
        var ac = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (ac >>> 26) | 0, ac &= 67108863, I = Math.imul(Kt, oe), _ = Math.imul(Kt, ce), _ = _ + Math.imul(te, oe) | 0, C = Math.imul(te, ce), I = I + Math.imul(qt, de) | 0, _ = _ + Math.imul(qt, ue) | 0, _ = _ + Math.imul($t, de) | 0, C = C + Math.imul($t, ue) | 0, I = I + Math.imul(Zt, he) | 0, _ = _ + Math.imul(Zt, Ae) | 0, _ = _ + Math.imul(Jt, he) | 0, C = C + Math.imul(Jt, Ae) | 0, I = I + Math.imul(Yt, le) | 0, _ = _ + Math.imul(Yt, _e) | 0, _ = _ + Math.imul(jt, le) | 0, C = C + Math.imul(jt, _e) | 0, I = I + Math.imul(Vt, pe) | 0, _ = _ + Math.imul(Vt, fe) | 0, _ = _ + Math.imul(Wt, pe) | 0, C = C + Math.imul(Wt, fe) | 0, I = I + Math.imul(Xt, ge) | 0, _ = _ + Math.imul(Xt, we) | 0, _ = _ + Math.imul(Ht, ge) | 0, C = C + Math.imul(Ht, we) | 0, I = I + Math.imul(Tt, me) | 0, _ = _ + Math.imul(Tt, ye) | 0, _ = _ + Math.imul(Qt, me) | 0, C = C + Math.imul(Qt, ye) | 0;
        var oc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (oc >>> 26) | 0, oc &= 67108863, I = Math.imul(Kt, de), _ = Math.imul(Kt, ue), _ = _ + Math.imul(te, de) | 0, C = Math.imul(te, ue), I = I + Math.imul(qt, he) | 0, _ = _ + Math.imul(qt, Ae) | 0, _ = _ + Math.imul($t, he) | 0, C = C + Math.imul($t, Ae) | 0, I = I + Math.imul(Zt, le) | 0, _ = _ + Math.imul(Zt, _e) | 0, _ = _ + Math.imul(Jt, le) | 0, C = C + Math.imul(Jt, _e) | 0, I = I + Math.imul(Yt, pe) | 0, _ = _ + Math.imul(Yt, fe) | 0, _ = _ + Math.imul(jt, pe) | 0, C = C + Math.imul(jt, fe) | 0, I = I + Math.imul(Vt, ge) | 0, _ = _ + Math.imul(Vt, we) | 0, _ = _ + Math.imul(Wt, ge) | 0, C = C + Math.imul(Wt, we) | 0, I = I + Math.imul(Xt, me) | 0, _ = _ + Math.imul(Xt, ye) | 0, _ = _ + Math.imul(Ht, me) | 0, C = C + Math.imul(Ht, ye) | 0;
        var cc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (cc >>> 26) | 0, cc &= 67108863, I = Math.imul(Kt, he), _ = Math.imul(Kt, Ae), _ = _ + Math.imul(te, he) | 0, C = Math.imul(te, Ae), I = I + Math.imul(qt, le) | 0, _ = _ + Math.imul(qt, _e) | 0, _ = _ + Math.imul($t, le) | 0, C = C + Math.imul($t, _e) | 0, I = I + Math.imul(Zt, pe) | 0, _ = _ + Math.imul(Zt, fe) | 0, _ = _ + Math.imul(Jt, pe) | 0, C = C + Math.imul(Jt, fe) | 0, I = I + Math.imul(Yt, ge) | 0, _ = _ + Math.imul(Yt, we) | 0, _ = _ + Math.imul(jt, ge) | 0, C = C + Math.imul(jt, we) | 0, I = I + Math.imul(Vt, me) | 0, _ = _ + Math.imul(Vt, ye) | 0, _ = _ + Math.imul(Wt, me) | 0, C = C + Math.imul(Wt, ye) | 0;
        var dc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (dc >>> 26) | 0, dc &= 67108863, I = Math.imul(Kt, le), _ = Math.imul(Kt, _e), _ = _ + Math.imul(te, le) | 0, C = Math.imul(te, _e), I = I + Math.imul(qt, pe) | 0, _ = _ + Math.imul(qt, fe) | 0, _ = _ + Math.imul($t, pe) | 0, C = C + Math.imul($t, fe) | 0, I = I + Math.imul(Zt, ge) | 0, _ = _ + Math.imul(Zt, we) | 0, _ = _ + Math.imul(Jt, ge) | 0, C = C + Math.imul(Jt, we) | 0, I = I + Math.imul(Yt, me) | 0, _ = _ + Math.imul(Yt, ye) | 0, _ = _ + Math.imul(jt, me) | 0, C = C + Math.imul(jt, ye) | 0;
        var uc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (uc >>> 26) | 0, uc &= 67108863, I = Math.imul(Kt, pe), _ = Math.imul(Kt, fe), _ = _ + Math.imul(te, pe) | 0, C = Math.imul(te, fe), I = I + Math.imul(qt, ge) | 0, _ = _ + Math.imul(qt, we) | 0, _ = _ + Math.imul($t, ge) | 0, C = C + Math.imul($t, we) | 0, I = I + Math.imul(Zt, me) | 0, _ = _ + Math.imul(Zt, ye) | 0, _ = _ + Math.imul(Jt, me) | 0, C = C + Math.imul(Jt, ye) | 0;
        var hc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (hc >>> 26) | 0, hc &= 67108863, I = Math.imul(Kt, ge), _ = Math.imul(Kt, we), _ = _ + Math.imul(te, ge) | 0, C = Math.imul(te, we), I = I + Math.imul(qt, me) | 0, _ = _ + Math.imul(qt, ye) | 0, _ = _ + Math.imul($t, me) | 0, C = C + Math.imul($t, ye) | 0;
        var Ac = (F + I | 0) + ((_ & 8191) << 13) | 0;
        F = (C + (_ >>> 13) | 0) + (Ac >>> 26) | 0, Ac &= 67108863, I = Math.imul(Kt, me), _ = Math.imul(Kt, ye), _ = _ + Math.imul(te, me) | 0, C = Math.imul(te, ye);
        var lc = (F + I | 0) + ((_ & 8191) << 13) | 0;
        return F = (C + (_ >>> 13) | 0) + (lc >>> 26) | 0, lc &= 67108863, S[0] = Zo, S[1] = Jo, S[2] = qo, S[3] = $o, S[4] = Ko, S[5] = tc, S[6] = ec, S[7] = rc, S[8] = nc, S[9] = sc, S[10] = ic, S[11] = ac, S[12] = oc, S[13] = cc, S[14] = dc, S[15] = uc, S[16] = hc, S[17] = Ac, S[18] = lc, F !== 0 && (S[19] = F, p.length++), p;
      };
      Math.imul || (H = U);
      function X(v, u, A) {
        A.negative = u.negative ^ v.negative, A.length = v.length + u.length;
        for (var p = 0, m = 0, b = 0; b < A.length - 1; b++) {
          var S = m;
          m = 0;
          for (var F = p & 67108863, I = Math.min(b, u.length - 1), _ = Math.max(0, b - v.length + 1); _ <= I; _++) {
            var C = b - _, tt = v.words[C] | 0, et = u.words[_] | 0, nt = tt * et, Ft = nt & 67108863;
            S = S + (nt / 67108864 | 0) | 0, Ft = Ft + F | 0, F = Ft & 67108863, S = S + (Ft >>> 26) | 0, m += S >>> 26, S &= 67108863;
          }
          A.words[b] = F, p = S, S = m;
        }
        return p !== 0 ? A.words[b] = p : A.length--, A._strip();
      }
      function P(v, u, A) {
        return X(v, u, A);
      }
      i.prototype.mulTo = function(u, A) {
        var p, m = this.length + u.length;
        return this.length === 10 && u.length === 10 ? p = H(this, u, A) : m < 63 ? p = U(this, u, A) : m < 1024 ? p = X(this, u, A) : p = P(this, u, A), p;
      }, i.prototype.mul = function(u) {
        var A = new i(null);
        return A.words = new Array(this.length + u.length), this.mulTo(u, A);
      }, i.prototype.mulf = function(u) {
        var A = new i(null);
        return A.words = new Array(this.length + u.length), P(this, u, A);
      }, i.prototype.imul = function(u) {
        return this.clone().mulTo(u, this);
      }, i.prototype.imuln = function(u) {
        var A = u < 0;
        A && (u = -u), n(typeof u == "number"), n(u < 67108864);
        for (var p = 0, m = 0; m < this.length; m++) {
          var b = (this.words[m] | 0) * u, S = (b & 67108863) + (p & 67108863);
          p >>= 26, p += b / 67108864 | 0, p += S >>> 26, this.words[m] = S & 67108863;
        }
        return p !== 0 && (this.words[m] = p, this.length++), A ? this.ineg() : this;
      }, i.prototype.muln = function(u) {
        return this.clone().imuln(u);
      }, i.prototype.sqr = function() {
        return this.mul(this);
      }, i.prototype.isqr = function() {
        return this.imul(this.clone());
      }, i.prototype.pow = function(u) {
        var A = N(u);
        if (A.length === 0) return new i(1);
        for (var p = this, m = 0; m < A.length && A[m] === 0; m++, p = p.sqr())
          ;
        if (++m < A.length)
          for (var b = p.sqr(); m < A.length; m++, b = b.sqr())
            A[m] !== 0 && (p = p.mul(b));
        return p;
      }, i.prototype.iushln = function(u) {
        n(typeof u == "number" && u >= 0);
        var A = u % 26, p = (u - A) / 26, m = 67108863 >>> 26 - A << 26 - A, b;
        if (A !== 0) {
          var S = 0;
          for (b = 0; b < this.length; b++) {
            var F = this.words[b] & m, I = (this.words[b] | 0) - F << A;
            this.words[b] = I | S, S = F >>> 26 - A;
          }
          S && (this.words[b] = S, this.length++);
        }
        if (p !== 0) {
          for (b = this.length - 1; b >= 0; b--)
            this.words[b + p] = this.words[b];
          for (b = 0; b < p; b++)
            this.words[b] = 0;
          this.length += p;
        }
        return this._strip();
      }, i.prototype.ishln = function(u) {
        return n(this.negative === 0), this.iushln(u);
      }, i.prototype.iushrn = function(u, A, p) {
        n(typeof u == "number" && u >= 0);
        var m;
        A ? m = (A - A % 26) / 26 : m = 0;
        var b = u % 26, S = Math.min((u - b) / 26, this.length), F = 67108863 ^ 67108863 >>> b << b, I = p;
        if (m -= S, m = Math.max(0, m), I) {
          for (var _ = 0; _ < S; _++)
            I.words[_] = this.words[_];
          I.length = S;
        }
        if (S !== 0) if (this.length > S)
          for (this.length -= S, _ = 0; _ < this.length; _++)
            this.words[_] = this.words[_ + S];
        else
          this.words[0] = 0, this.length = 1;
        var C = 0;
        for (_ = this.length - 1; _ >= 0 && (C !== 0 || _ >= m); _--) {
          var tt = this.words[_] | 0;
          this.words[_] = C << 26 - b | tt >>> b, C = tt & F;
        }
        return I && C !== 0 && (I.words[I.length++] = C), this.length === 0 && (this.words[0] = 0, this.length = 1), this._strip();
      }, i.prototype.ishrn = function(u, A, p) {
        return n(this.negative === 0), this.iushrn(u, A, p);
      }, i.prototype.shln = function(u) {
        return this.clone().ishln(u);
      }, i.prototype.ushln = function(u) {
        return this.clone().iushln(u);
      }, i.prototype.shrn = function(u) {
        return this.clone().ishrn(u);
      }, i.prototype.ushrn = function(u) {
        return this.clone().iushrn(u);
      }, i.prototype.testn = function(u) {
        n(typeof u == "number" && u >= 0);
        var A = u % 26, p = (u - A) / 26, m = 1 << A;
        if (this.length <= p) return !1;
        var b = this.words[p];
        return !!(b & m);
      }, i.prototype.imaskn = function(u) {
        n(typeof u == "number" && u >= 0);
        var A = u % 26, p = (u - A) / 26;
        if (n(this.negative === 0, "imaskn works only with positive numbers"), this.length <= p)
          return this;
        if (A !== 0 && p++, this.length = Math.min(p, this.length), A !== 0) {
          var m = 67108863 ^ 67108863 >>> A << A;
          this.words[this.length - 1] &= m;
        }
        return this._strip();
      }, i.prototype.maskn = function(u) {
        return this.clone().imaskn(u);
      }, i.prototype.iaddn = function(u) {
        return n(typeof u == "number"), n(u < 67108864), u < 0 ? this.isubn(-u) : this.negative !== 0 ? this.length === 1 && (this.words[0] | 0) <= u ? (this.words[0] = u - (this.words[0] | 0), this.negative = 0, this) : (this.negative = 0, this.isubn(u), this.negative = 1, this) : this._iaddn(u);
      }, i.prototype._iaddn = function(u) {
        this.words[0] += u;
        for (var A = 0; A < this.length && this.words[A] >= 67108864; A++)
          this.words[A] -= 67108864, A === this.length - 1 ? this.words[A + 1] = 1 : this.words[A + 1]++;
        return this.length = Math.max(this.length, A + 1), this;
      }, i.prototype.isubn = function(u) {
        if (n(typeof u == "number"), n(u < 67108864), u < 0) return this.iaddn(-u);
        if (this.negative !== 0)
          return this.negative = 0, this.iaddn(u), this.negative = 1, this;
        if (this.words[0] -= u, this.length === 1 && this.words[0] < 0)
          this.words[0] = -this.words[0], this.negative = 1;
        else
          for (var A = 0; A < this.length && this.words[A] < 0; A++)
            this.words[A] += 67108864, this.words[A + 1] -= 1;
        return this._strip();
      }, i.prototype.addn = function(u) {
        return this.clone().iaddn(u);
      }, i.prototype.subn = function(u) {
        return this.clone().isubn(u);
      }, i.prototype.iabs = function() {
        return this.negative = 0, this;
      }, i.prototype.abs = function() {
        return this.clone().iabs();
      }, i.prototype._ishlnsubmul = function(u, A, p) {
        var m = u.length + p, b;
        this._expand(m);
        var S, F = 0;
        for (b = 0; b < u.length; b++) {
          S = (this.words[b + p] | 0) + F;
          var I = (u.words[b] | 0) * A;
          S -= I & 67108863, F = (S >> 26) - (I / 67108864 | 0), this.words[b + p] = S & 67108863;
        }
        for (; b < this.length - p; b++)
          S = (this.words[b + p] | 0) + F, F = S >> 26, this.words[b + p] = S & 67108863;
        if (F === 0) return this._strip();
        for (n(F === -1), F = 0, b = 0; b < this.length; b++)
          S = -(this.words[b] | 0) + F, F = S >> 26, this.words[b] = S & 67108863;
        return this.negative = 1, this._strip();
      }, i.prototype._wordDiv = function(u, A) {
        var p = this.length - u.length, m = this.clone(), b = u, S = b.words[b.length - 1] | 0, F = this._countBits(S);
        p = 26 - F, p !== 0 && (b = b.ushln(p), m.iushln(p), S = b.words[b.length - 1] | 0);
        var I = m.length - b.length, _;
        if (A !== "mod") {
          _ = new i(null), _.length = I + 1, _.words = new Array(_.length);
          for (var C = 0; C < _.length; C++)
            _.words[C] = 0;
        }
        var tt = m.clone()._ishlnsubmul(b, 1, I);
        tt.negative === 0 && (m = tt, _ && (_.words[I] = 1));
        for (var et = I - 1; et >= 0; et--) {
          var nt = (m.words[b.length + et] | 0) * 67108864 + (m.words[b.length + et - 1] | 0);
          for (nt = Math.min(nt / S | 0, 67108863), m._ishlnsubmul(b, nt, et); m.negative !== 0; )
            nt--, m.negative = 0, m._ishlnsubmul(b, 1, et), m.isZero() || (m.negative ^= 1);
          _ && (_.words[et] = nt);
        }
        return _ && _._strip(), m._strip(), A !== "div" && p !== 0 && m.iushrn(p), {
          div: _ || null,
          mod: m
        };
      }, i.prototype.divmod = function(u, A, p) {
        if (n(!u.isZero()), this.isZero())
          return {
            div: new i(0),
            mod: new i(0)
          };
        var m, b, S;
        return this.negative !== 0 && u.negative === 0 ? (S = this.neg().divmod(u, A), A !== "mod" && (m = S.div.neg()), A !== "div" && (b = S.mod.neg(), p && b.negative !== 0 && b.iadd(u)), {
          div: m,
          mod: b
        }) : this.negative === 0 && u.negative !== 0 ? (S = this.divmod(u.neg(), A), A !== "mod" && (m = S.div.neg()), {
          div: m,
          mod: S.mod
        }) : this.negative & u.negative ? (S = this.neg().divmod(u.neg(), A), A !== "div" && (b = S.mod.neg(), p && b.negative !== 0 && b.isub(u)), {
          div: S.div,
          mod: b
        }) : u.length > this.length || this.cmp(u) < 0 ? {
          div: new i(0),
          mod: this
        } : u.length === 1 ? A === "div" ? {
          div: this.divn(u.words[0]),
          mod: null
        } : A === "mod" ? {
          div: null,
          mod: new i(this.modrn(u.words[0]))
        } : {
          div: this.divn(u.words[0]),
          mod: new i(this.modrn(u.words[0]))
        } : this._wordDiv(u, A);
      }, i.prototype.div = function(u) {
        return this.divmod(u, "div", !1).div;
      }, i.prototype.mod = function(u) {
        return this.divmod(u, "mod", !1).mod;
      }, i.prototype.umod = function(u) {
        return this.divmod(u, "mod", !0).mod;
      }, i.prototype.divRound = function(u) {
        var A = this.divmod(u);
        if (A.mod.isZero()) return A.div;
        var p = A.div.negative !== 0 ? A.mod.isub(u) : A.mod, m = u.ushrn(1), b = u.andln(1), S = p.cmp(m);
        return S < 0 || b === 1 && S === 0 ? A.div : A.div.negative !== 0 ? A.div.isubn(1) : A.div.iaddn(1);
      }, i.prototype.modrn = function(u) {
        var A = u < 0;
        A && (u = -u), n(u <= 67108863);
        for (var p = (1 << 26) % u, m = 0, b = this.length - 1; b >= 0; b--)
          m = (p * m + (this.words[b] | 0)) % u;
        return A ? -m : m;
      }, i.prototype.modn = function(u) {
        return this.modrn(u);
      }, i.prototype.idivn = function(u) {
        var A = u < 0;
        A && (u = -u), n(u <= 67108863);
        for (var p = 0, m = this.length - 1; m >= 0; m--) {
          var b = (this.words[m] | 0) + p * 67108864;
          this.words[m] = b / u | 0, p = b % u;
        }
        return this._strip(), A ? this.ineg() : this;
      }, i.prototype.divn = function(u) {
        return this.clone().idivn(u);
      }, i.prototype.egcd = function(u) {
        n(u.negative === 0), n(!u.isZero());
        var A = this, p = u.clone();
        A.negative !== 0 ? A = A.umod(u) : A = A.clone();
        for (var m = new i(1), b = new i(0), S = new i(0), F = new i(1), I = 0; A.isEven() && p.isEven(); )
          A.iushrn(1), p.iushrn(1), ++I;
        for (var _ = p.clone(), C = A.clone(); !A.isZero(); ) {
          for (var tt = 0, et = 1; !(A.words[0] & et) && tt < 26; ++tt, et <<= 1) ;
          if (tt > 0)
            for (A.iushrn(tt); tt-- > 0; )
              (m.isOdd() || b.isOdd()) && (m.iadd(_), b.isub(C)), m.iushrn(1), b.iushrn(1);
          for (var nt = 0, Ft = 1; !(p.words[0] & Ft) && nt < 26; ++nt, Ft <<= 1) ;
          if (nt > 0)
            for (p.iushrn(nt); nt-- > 0; )
              (S.isOdd() || F.isOdd()) && (S.iadd(_), F.isub(C)), S.iushrn(1), F.iushrn(1);
          A.cmp(p) >= 0 ? (A.isub(p), m.isub(S), b.isub(F)) : (p.isub(A), S.isub(m), F.isub(b));
        }
        return {
          a: S,
          b: F,
          gcd: p.iushln(I)
        };
      }, i.prototype._invmp = function(u) {
        n(u.negative === 0), n(!u.isZero());
        var A = this, p = u.clone();
        A.negative !== 0 ? A = A.umod(u) : A = A.clone();
        for (var m = new i(1), b = new i(0), S = p.clone(); A.cmpn(1) > 0 && p.cmpn(1) > 0; ) {
          for (var F = 0, I = 1; !(A.words[0] & I) && F < 26; ++F, I <<= 1) ;
          if (F > 0)
            for (A.iushrn(F); F-- > 0; )
              m.isOdd() && m.iadd(S), m.iushrn(1);
          for (var _ = 0, C = 1; !(p.words[0] & C) && _ < 26; ++_, C <<= 1) ;
          if (_ > 0)
            for (p.iushrn(_); _-- > 0; )
              b.isOdd() && b.iadd(S), b.iushrn(1);
          A.cmp(p) >= 0 ? (A.isub(p), m.isub(b)) : (p.isub(A), b.isub(m));
        }
        var tt;
        return A.cmpn(1) === 0 ? tt = m : tt = b, tt.cmpn(0) < 0 && tt.iadd(u), tt;
      }, i.prototype.gcd = function(u) {
        if (this.isZero()) return u.abs();
        if (u.isZero()) return this.abs();
        var A = this.clone(), p = u.clone();
        A.negative = 0, p.negative = 0;
        for (var m = 0; A.isEven() && p.isEven(); m++)
          A.iushrn(1), p.iushrn(1);
        do {
          for (; A.isEven(); )
            A.iushrn(1);
          for (; p.isEven(); )
            p.iushrn(1);
          var b = A.cmp(p);
          if (b < 0) {
            var S = A;
            A = p, p = S;
          } else if (b === 0 || p.cmpn(1) === 0)
            break;
          A.isub(p);
        } while (!0);
        return p.iushln(m);
      }, i.prototype.invm = function(u) {
        return this.egcd(u).a.umod(u);
      }, i.prototype.isEven = function() {
        return (this.words[0] & 1) === 0;
      }, i.prototype.isOdd = function() {
        return (this.words[0] & 1) === 1;
      }, i.prototype.andln = function(u) {
        return this.words[0] & u;
      }, i.prototype.bincn = function(u) {
        n(typeof u == "number");
        var A = u % 26, p = (u - A) / 26, m = 1 << A;
        if (this.length <= p)
          return this._expand(p + 1), this.words[p] |= m, this;
        for (var b = m, S = p; b !== 0 && S < this.length; S++) {
          var F = this.words[S] | 0;
          F += b, b = F >>> 26, F &= 67108863, this.words[S] = F;
        }
        return b !== 0 && (this.words[S] = b, this.length++), this;
      }, i.prototype.isZero = function() {
        return this.length === 1 && this.words[0] === 0;
      }, i.prototype.cmpn = function(u) {
        var A = u < 0;
        if (this.negative !== 0 && !A) return -1;
        if (this.negative === 0 && A) return 1;
        this._strip();
        var p;
        if (this.length > 1)
          p = 1;
        else {
          A && (u = -u), n(u <= 67108863, "Number is too big");
          var m = this.words[0] | 0;
          p = m === u ? 0 : m < u ? -1 : 1;
        }
        return this.negative !== 0 ? -p | 0 : p;
      }, i.prototype.cmp = function(u) {
        if (this.negative !== 0 && u.negative === 0) return -1;
        if (this.negative === 0 && u.negative !== 0) return 1;
        var A = this.ucmp(u);
        return this.negative !== 0 ? -A | 0 : A;
      }, i.prototype.ucmp = function(u) {
        if (this.length > u.length) return 1;
        if (this.length < u.length) return -1;
        for (var A = 0, p = this.length - 1; p >= 0; p--) {
          var m = this.words[p] | 0, b = u.words[p] | 0;
          if (m !== b) {
            m < b ? A = -1 : m > b && (A = 1);
            break;
          }
        }
        return A;
      }, i.prototype.gtn = function(u) {
        return this.cmpn(u) === 1;
      }, i.prototype.gt = function(u) {
        return this.cmp(u) === 1;
      }, i.prototype.gten = function(u) {
        return this.cmpn(u) >= 0;
      }, i.prototype.gte = function(u) {
        return this.cmp(u) >= 0;
      }, i.prototype.ltn = function(u) {
        return this.cmpn(u) === -1;
      }, i.prototype.lt = function(u) {
        return this.cmp(u) === -1;
      }, i.prototype.lten = function(u) {
        return this.cmpn(u) <= 0;
      }, i.prototype.lte = function(u) {
        return this.cmp(u) <= 0;
      }, i.prototype.eqn = function(u) {
        return this.cmpn(u) === 0;
      }, i.prototype.eq = function(u) {
        return this.cmp(u) === 0;
      }, i.red = function(u) {
        return new Z(u);
      }, i.prototype.toRed = function(u) {
        return n(!this.red, "Already a number in reduction context"), n(this.negative === 0, "red works only with positives"), u.convertTo(this)._forceRed(u);
      }, i.prototype.fromRed = function() {
        return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
      }, i.prototype._forceRed = function(u) {
        return this.red = u, this;
      }, i.prototype.forceRed = function(u) {
        return n(!this.red, "Already a number in reduction context"), this._forceRed(u);
      }, i.prototype.redAdd = function(u) {
        return n(this.red, "redAdd works only with red numbers"), this.red.add(this, u);
      }, i.prototype.redIAdd = function(u) {
        return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, u);
      }, i.prototype.redSub = function(u) {
        return n(this.red, "redSub works only with red numbers"), this.red.sub(this, u);
      }, i.prototype.redISub = function(u) {
        return n(this.red, "redISub works only with red numbers"), this.red.isub(this, u);
      }, i.prototype.redShl = function(u) {
        return n(this.red, "redShl works only with red numbers"), this.red.shl(this, u);
      }, i.prototype.redMul = function(u) {
        return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, u), this.red.mul(this, u);
      }, i.prototype.redIMul = function(u) {
        return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, u), this.red.imul(this, u);
      }, i.prototype.redSqr = function() {
        return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
      }, i.prototype.redISqr = function() {
        return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
      }, i.prototype.redSqrt = function() {
        return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
      }, i.prototype.redInvm = function() {
        return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
      }, i.prototype.redNeg = function() {
        return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
      }, i.prototype.redPow = function(u) {
        return n(this.red && !u.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, u);
      };
      var M = {
        k256: null,
        p224: null,
        p192: null,
        p25519: null
      };
      function O(v, u) {
        this.name = v, this.p = new i(u, 16), this.n = this.p.bitLength(), this.k = new i(1).iushln(this.n).isub(this.p), this.tmp = this._tmp();
      }
      O.prototype._tmp = function() {
        var u = new i(null);
        return u.words = new Array(Math.ceil(this.n / 13)), u;
      }, O.prototype.ireduce = function(u) {
        var A = u, p;
        do
          this.split(A, this.tmp), A = this.imulK(A), A = A.iadd(this.tmp), p = A.bitLength();
        while (p > this.n);
        var m = p < this.n ? -1 : A.ucmp(this.p);
        return m === 0 ? (A.words[0] = 0, A.length = 1) : m > 0 ? A.isub(this.p) : A.strip !== void 0 ? A.strip() : A._strip(), A;
      }, O.prototype.split = function(u, A) {
        u.iushrn(this.n, 0, A);
      }, O.prototype.imulK = function(u) {
        return u.imul(this.k);
      };
      function k() {
        O.call(
          this,
          "k256",
          "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
        );
      }
      s(k, O), k.prototype.split = function(u, A) {
        for (var p = 4194303, m = Math.min(u.length, 9), b = 0; b < m; b++)
          A.words[b] = u.words[b];
        if (A.length = m, u.length <= 9) {
          u.words[0] = 0, u.length = 1;
          return;
        }
        var S = u.words[9];
        for (A.words[A.length++] = S & p, b = 10; b < u.length; b++) {
          var F = u.words[b] | 0;
          u.words[b - 10] = (F & p) << 4 | S >>> 22, S = F;
        }
        S >>>= 22, u.words[b - 10] = S, S === 0 && u.length > 10 ? u.length -= 10 : u.length -= 9;
      }, k.prototype.imulK = function(u) {
        u.words[u.length] = 0, u.words[u.length + 1] = 0, u.length += 2;
        for (var A = 0, p = 0; p < u.length; p++) {
          var m = u.words[p] | 0;
          A += m * 977, u.words[p] = A & 67108863, A = m * 64 + (A / 67108864 | 0);
        }
        return u.words[u.length - 1] === 0 && (u.length--, u.words[u.length - 1] === 0 && u.length--), u;
      };
      function G() {
        O.call(
          this,
          "p224",
          "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
        );
      }
      s(G, O);
      function z() {
        O.call(
          this,
          "p192",
          "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
        );
      }
      s(z, O);
      function j() {
        O.call(
          this,
          "25519",
          "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
        );
      }
      s(j, O), j.prototype.imulK = function(u) {
        for (var A = 0, p = 0; p < u.length; p++) {
          var m = (u.words[p] | 0) * 19 + A, b = m & 67108863;
          m >>>= 26, u.words[p] = b, A = m;
        }
        return A !== 0 && (u.words[u.length++] = A), u;
      }, i._prime = function(u) {
        if (M[u]) return M[u];
        var A;
        if (u === "k256")
          A = new k();
        else if (u === "p224")
          A = new G();
        else if (u === "p192")
          A = new z();
        else if (u === "p25519")
          A = new j();
        else
          throw new Error("Unknown prime " + u);
        return M[u] = A, A;
      };
      function Z(v) {
        if (typeof v == "string") {
          var u = i._prime(v);
          this.m = u.p, this.prime = u;
        } else
          n(v.gtn(1), "modulus must be greater than 1"), this.m = v, this.prime = null;
      }
      Z.prototype._verify1 = function(u) {
        n(u.negative === 0, "red works only with positives"), n(u.red, "red works only with red numbers");
      }, Z.prototype._verify2 = function(u, A) {
        n((u.negative | A.negative) === 0, "red works only with positives"), n(
          u.red && u.red === A.red,
          "red works only with red numbers"
        );
      }, Z.prototype.imod = function(u) {
        return this.prime ? this.prime.ireduce(u)._forceRed(this) : (f(u, u.umod(this.m)._forceRed(this)), u);
      }, Z.prototype.neg = function(u) {
        return u.isZero() ? u.clone() : this.m.sub(u)._forceRed(this);
      }, Z.prototype.add = function(u, A) {
        this._verify2(u, A);
        var p = u.add(A);
        return p.cmp(this.m) >= 0 && p.isub(this.m), p._forceRed(this);
      }, Z.prototype.iadd = function(u, A) {
        this._verify2(u, A);
        var p = u.iadd(A);
        return p.cmp(this.m) >= 0 && p.isub(this.m), p;
      }, Z.prototype.sub = function(u, A) {
        this._verify2(u, A);
        var p = u.sub(A);
        return p.cmpn(0) < 0 && p.iadd(this.m), p._forceRed(this);
      }, Z.prototype.isub = function(u, A) {
        this._verify2(u, A);
        var p = u.isub(A);
        return p.cmpn(0) < 0 && p.iadd(this.m), p;
      }, Z.prototype.shl = function(u, A) {
        return this._verify1(u), this.imod(u.ushln(A));
      }, Z.prototype.imul = function(u, A) {
        return this._verify2(u, A), this.imod(u.imul(A));
      }, Z.prototype.mul = function(u, A) {
        return this._verify2(u, A), this.imod(u.mul(A));
      }, Z.prototype.isqr = function(u) {
        return this.imul(u, u.clone());
      }, Z.prototype.sqr = function(u) {
        return this.mul(u, u);
      }, Z.prototype.sqrt = function(u) {
        if (u.isZero()) return u.clone();
        var A = this.m.andln(3);
        if (n(A % 2 === 1), A === 3) {
          var p = this.m.add(new i(1)).iushrn(2);
          return this.pow(u, p);
        }
        for (var m = this.m.subn(1), b = 0; !m.isZero() && m.andln(1) === 0; )
          b++, m.iushrn(1);
        n(!m.isZero());
        var S = new i(1).toRed(this), F = S.redNeg(), I = this.m.subn(1).iushrn(1), _ = this.m.bitLength();
        for (_ = new i(2 * _ * _).toRed(this); this.pow(_, I).cmp(F) !== 0; )
          _.redIAdd(F);
        for (var C = this.pow(_, m), tt = this.pow(u, m.addn(1).iushrn(1)), et = this.pow(u, m), nt = b; et.cmp(S) !== 0; ) {
          for (var Ft = et, ft = 0; Ft.cmp(S) !== 0; ft++)
            Ft = Ft.redSqr();
          n(ft < nt);
          var Et = this.pow(C, new i(1).iushln(nt - ft - 1));
          tt = tt.redMul(Et), C = Et.redSqr(), et = et.redMul(C), nt = ft;
        }
        return tt;
      }, Z.prototype.invm = function(u) {
        var A = u._invmp(this.m);
        return A.negative !== 0 ? (A.negative = 0, this.imod(A).redNeg()) : this.imod(A);
      }, Z.prototype.pow = function(u, A) {
        if (A.isZero()) return new i(1).toRed(this);
        if (A.cmpn(1) === 0) return u.clone();
        var p = 4, m = new Array(1 << p);
        m[0] = new i(1).toRed(this), m[1] = u;
        for (var b = 2; b < m.length; b++)
          m[b] = this.mul(m[b - 1], u);
        var S = m[0], F = 0, I = 0, _ = A.bitLength() % 26;
        for (_ === 0 && (_ = 26), b = A.length - 1; b >= 0; b--) {
          for (var C = A.words[b], tt = _ - 1; tt >= 0; tt--) {
            var et = C >> tt & 1;
            if (S !== m[0] && (S = this.sqr(S)), et === 0 && F === 0) {
              I = 0;
              continue;
            }
            F <<= 1, F |= et, I++, !(I !== p && (b !== 0 || tt !== 0)) && (S = this.mul(S, m[F]), I = 0, F = 0);
          }
          _ = 26;
        }
        return S;
      }, Z.prototype.convertTo = function(u) {
        var A = u.umod(this.m);
        return A === u ? A.clone() : A;
      }, Z.prototype.convertFrom = function(u) {
        var A = u.clone();
        return A.red = null, A;
      }, i.mont = function(u) {
        return new $(u);
      };
      function $(v) {
        Z.call(this, v), this.shift = this.m.bitLength(), this.shift % 26 !== 0 && (this.shift += 26 - this.shift % 26), this.r = new i(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv);
      }
      s($, Z), $.prototype.convertTo = function(u) {
        return this.imod(u.ushln(this.shift));
      }, $.prototype.convertFrom = function(u) {
        var A = this.imod(u.mul(this.rinv));
        return A.red = null, A;
      }, $.prototype.imul = function(u, A) {
        if (u.isZero() || A.isZero())
          return u.words[0] = 0, u.length = 1, u;
        var p = u.imul(A), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), b = p.isub(m).iushrn(this.shift), S = b;
        return b.cmp(this.m) >= 0 ? S = b.isub(this.m) : b.cmpn(0) < 0 && (S = b.iadd(this.m)), S._forceRed(this);
      }, $.prototype.mul = function(u, A) {
        if (u.isZero() || A.isZero()) return new i(0)._forceRed(this);
        var p = u.mul(A), m = p.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m), b = p.isub(m).iushrn(this.shift), S = b;
        return b.cmp(this.m) >= 0 ? S = b.isub(this.m) : b.cmpn(0) < 0 && (S = b.iadd(this.m)), S._forceRed(this);
      }, $.prototype.invm = function(u) {
        var A = this.imod(u._invmp(this.m).mul(this.r2));
        return A._forceRed(this);
      };
    })(r, vb);
  }(va)), va.exports;
}
var Rb = xb();
const ga = /* @__PURE__ */ y_(Rb);
var Sb = Object.defineProperty, Tr = (r, t) => Sb(r, "name", { value: t, configurable: !0 }), b_ = 9, I_ = 3, Vc = 9, Lt, E_ = (Lt = class extends ga {
  constructor(e, n, s) {
    let i = e, a = n;
    if (Lt.isBN(e) ? i = e.toArray() : typeof e == "string" && e.slice(0, 2) === "0x" && (i = e.substring(2), a = n || "hex"), typeof i == "number" && i > Number.MAX_SAFE_INTEGER)
      throw new B(
        L.NUMBER_TOO_BIG,
        `Value ${i} is too large to be represented as a number, use string instead.`
      );
    super(i ?? 0, a, s);
    D(this, "MAX_U64", "0xFFFFFFFFFFFFFFFF");
  }
  // ANCHOR: HELPERS
  // make sure we always include `0x` in hex strings
  toString(e, n) {
    const s = super.toString(e, n);
    return e === 16 || e === "hex" ? `0x${s}` : s;
  }
  toHex(e) {
    const s = (e || 0) * 2;
    if (this.isNeg())
      throw new B(L.CONVERTING_FAILED, "Cannot convert negative value to hex.");
    if (e && this.byteLength() > e)
      throw new B(
        L.CONVERTING_FAILED,
        `Provided value ${this} is too large. It should fit within ${e} bytes.`
      );
    return this.toString(16, s);
  }
  toBytes(e) {
    if (this.isNeg())
      throw new B(L.CONVERTING_FAILED, "Cannot convert negative value to bytes.");
    return Uint8Array.from(this.toArray(void 0, e));
  }
  toJSON() {
    return this.toString(16);
  }
  valueOf() {
    return this.toString();
  }
  format(e) {
    const {
      units: n = Vc,
      precision: s = b_,
      minPrecision: i = I_
    } = e || {};
    if (n === 0)
      return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const a = i > s ? s : i, o = s > i ? s : i, d = this.formatUnits(n), [h, f = ""] = d.split("."), g = h.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (o === 0)
      return g;
    let y = f.replace(/0+$/, "");
    if (y.length > o)
      if (h === "0") {
        const R = y.search(/[1-9]/);
        R >= 0 && R < o ? y = y.slice(0, o) : y = y.slice(0, R + 1);
      } else
        y = y.slice(0, o);
    else
      y = y.slice(0, o);
    return y.length < a && (y = y.padEnd(a, "0")), y === "" && a === 0 ? g : y ? `${g}.${y}` : g;
  }
  formatUnits(e = Vc) {
    const n = this.toString(), s = n.length;
    if (s <= e)
      return `0.${"0".repeat(e - s)}${n}`;
    const i = n.slice(0, s - e), a = n.slice(s - e);
    return `${i}.${a}`;
  }
  // END ANCHOR: HELPERS
  // ANCHOR: OVERRIDES to accept better inputs
  add(e) {
    return this.caller(e, "add");
  }
  pow(e) {
    return this.caller(e, "pow");
  }
  sub(e) {
    return this.caller(e, "sub");
  }
  div(e) {
    return this.caller(e, "div");
  }
  mul(e) {
    return this.caller(e, "mul");
  }
  mod(e) {
    return this.caller(e, "mod");
  }
  divRound(e) {
    return this.caller(e, "divRound");
  }
  lt(e) {
    return this.caller(e, "lt");
  }
  lte(e) {
    return this.caller(e, "lte");
  }
  gt(e) {
    return this.caller(e, "gt");
  }
  gte(e) {
    return this.caller(e, "gte");
  }
  eq(e) {
    return this.caller(e, "eq");
  }
  cmp(e) {
    return this.caller(e, "cmp");
  }
  // END ANCHOR: OVERRIDES to accept better inputs
  // ANCHOR: OVERRIDES to output our BN type
  sqr() {
    return new Lt(super.sqr().toArray());
  }
  neg() {
    return new Lt(super.neg().toArray());
  }
  abs() {
    return new Lt(super.abs().toArray());
  }
  toTwos(e) {
    return new Lt(super.toTwos(e).toArray());
  }
  fromTwos(e) {
    return new Lt(super.fromTwos(e).toArray());
  }
  // END ANCHOR: OVERRIDES to output our BN type
  // ANCHOR: OVERRIDES to avoid losing references
  caller(e, n) {
    const s = super[n](new Lt(e));
    return Lt.isBN(s) ? new Lt(s.toArray()) : s;
  }
  clone() {
    return new Lt(this.toArray());
  }
  mulTo(e, n) {
    const s = new ga(this.toArray()).mulTo(e, n);
    return new Lt(s.toArray());
  }
  egcd(e) {
    const { a: n, b: s, gcd: i } = new ga(this.toArray()).egcd(e);
    return {
      a: new Lt(n.toArray()),
      b: new Lt(s.toArray()),
      gcd: new Lt(i.toArray())
    };
  }
  divmod(e, n, s) {
    const { div: i, mod: a } = new ga(this.toArray()).divmod(new Lt(e), n, s);
    return {
      div: new Lt(i == null ? void 0 : i.toArray()),
      mod: new Lt(a == null ? void 0 : a.toArray())
    };
  }
  maxU64() {
    return this.gte(this.MAX_U64) ? new Lt(this.MAX_U64) : this;
  }
  max(e) {
    return this.gte(e) ? new Lt(e) : this;
  }
  normalizeZeroToOne() {
    return this.isZero() ? new Lt(1) : this;
  }
  // END ANCHOR: OVERRIDES to avoid losing references
}, Tr(Lt, "BN"), Lt), E = /* @__PURE__ */ Tr((r, t, e) => new E_(r, t, e), "bn");
E.parseUnits = (r, t = Vc) => {
  const e = r === "." ? "0." : r, [n = "0", s = "0"] = e.split("."), i = s.length;
  if (t === 0) {
    const d = e.replace(",", "").split(".")[0];
    return E(d);
  }
  if (i > t)
    throw new B(
      L.CONVERTING_FAILED,
      `Decimal can't have more than ${t} digits.`
    );
  const a = Array.from({ length: t }).fill("0");
  a.splice(0, i, s);
  const o = `${n.replaceAll(",", "")}${a.join("")}`;
  return E(o);
};
function Tb(r, t) {
  const { precision: e = b_, minPrecision: n = I_ } = t || {}, [s = "0", i = "0"] = String(r || "0.0").split("."), a = /(\d)(?=(\d{3})+\b)/g, o = s.replace(a, "$1,");
  let d = i.slice(0, e);
  if (n < e) {
    const f = d.match(/.*[1-9]{1}/), g = (f == null ? void 0 : f[0].length) || 0, y = Math.max(n, g);
    d = d.slice(0, y);
  }
  const h = d ? `.${d}` : "";
  return `${o}${h}`;
}
Tr(Tb, "toFixed");
function Pr(r) {
  return E(r).toNumber();
}
Tr(Pr, "toNumber");
function go(r, t) {
  return E(r).toHex(t);
}
Tr(go, "toHex");
function Ir(r, t) {
  return E(r).toBytes(t);
}
Tr(Ir, "toBytes");
function Nb(r, t) {
  return E(r).formatUnits(t);
}
Tr(Nb, "formatUnits");
function Db(r, t) {
  return E(r).format(t);
}
Tr(Db, "format");
function Fb(...r) {
  return r.reduce((t, e) => E(e).gt(t) ? E(e) : t, E(0));
}
Tr(Fb, "max");
function Qb(...r) {
  return E(Math.ceil(r.reduce((t, e) => E(t).mul(e), E(1)).toNumber()));
}
Tr(Qb, "multiply");
var Se = Uint8Array, Ye = Uint16Array, Rd = Int32Array, wo = new Se([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), mo = new Se([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), Wc = new Se([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), C_ = function(r, t) {
  for (var e = new Ye(31), n = 0; n < 31; ++n)
    e[n] = t += 1 << r[n - 1];
  for (var s = new Rd(e[30]), n = 1; n < 30; ++n)
    for (var i = e[n]; i < e[n + 1]; ++i)
      s[i] = i - e[n] << 5 | n;
  return { b: e, r: s };
}, B_ = C_(wo, 2), v_ = B_.b, Yc = B_.r;
v_[28] = 258, Yc[258] = 28;
var x_ = C_(mo, 0), Ob = x_.b, JA = x_.r, jc = new Ye(32768);
for (var kt = 0; kt < 32768; ++kt) {
  var Ur = (kt & 43690) >> 1 | (kt & 21845) << 1;
  Ur = (Ur & 52428) >> 2 | (Ur & 13107) << 2, Ur = (Ur & 61680) >> 4 | (Ur & 3855) << 4, jc[kt] = ((Ur & 65280) >> 8 | (Ur & 255) << 8) >> 1;
}
var Er = function(r, t, e) {
  for (var n = r.length, s = 0, i = new Ye(t); s < n; ++s)
    r[s] && ++i[r[s] - 1];
  var a = new Ye(t);
  for (s = 1; s < t; ++s)
    a[s] = a[s - 1] + i[s - 1] << 1;
  var o;
  if (e) {
    o = new Ye(1 << t);
    var d = 15 - t;
    for (s = 0; s < n; ++s)
      if (r[s])
        for (var h = s << 4 | r[s], f = t - r[s], g = a[r[s] - 1]++ << f, y = g | (1 << f) - 1; g <= y; ++g)
          o[jc[g] >> d] = h;
  } else
    for (o = new Ye(n), s = 0; s < n; ++s)
      r[s] && (o[s] = jc[a[r[s] - 1]++] >> 15 - r[s]);
  return o;
}, rn = new Se(288);
for (var kt = 0; kt < 144; ++kt)
  rn[kt] = 8;
for (var kt = 144; kt < 256; ++kt)
  rn[kt] = 9;
for (var kt = 256; kt < 280; ++kt)
  rn[kt] = 7;
for (var kt = 280; kt < 288; ++kt)
  rn[kt] = 8;
var $i = new Se(32);
for (var kt = 0; kt < 32; ++kt)
  $i[kt] = 5;
var Mb = /* @__PURE__ */ Er(rn, 9, 0), Pb = /* @__PURE__ */ Er(rn, 9, 1), Lb = /* @__PURE__ */ Er($i, 5, 0), kb = /* @__PURE__ */ Er($i, 5, 1), vc = function(r) {
  for (var t = r[0], e = 1; e < r.length; ++e)
    r[e] > t && (t = r[e]);
  return t;
}, sr = function(r, t, e) {
  var n = t / 8 | 0;
  return (r[n] | r[n + 1] << 8) >> (t & 7) & e;
}, xc = function(r, t) {
  var e = t / 8 | 0;
  return (r[e] | r[e + 1] << 8 | r[e + 2] << 16) >> (t & 7);
}, Sd = function(r) {
  return (r + 7) / 8 | 0;
}, R_ = function(r, t, e) {
  return (e == null || e > r.length) && (e = r.length), new Se(r.subarray(t, e));
}, Ub = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], ar = function(r, t, e) {
  var n = new Error(t || Ub[r]);
  if (n.code = r, Error.captureStackTrace && Error.captureStackTrace(n, ar), !e)
    throw n;
  return n;
}, Gb = function(r, t, e, n) {
  var s = r.length, i = 0;
  if (!s || t.f && !t.l)
    return e || new Se(0);
  var a = !e, o = a || t.i != 2, d = t.i;
  a && (e = new Se(s * 3));
  var h = function(Rt) {
    var Bt = e.length;
    if (Rt > Bt) {
      var Oe = new Se(Math.max(Bt * 2, Rt));
      Oe.set(e), e = Oe;
    }
  }, f = t.f || 0, g = t.p || 0, y = t.b || 0, R = t.l, Q = t.d, x = t.m, N = t.n, U = s * 8;
  do {
    if (!R) {
      f = sr(r, g, 1);
      var H = sr(r, g + 1, 3);
      if (g += 3, H)
        if (H == 1)
          R = Pb, Q = kb, x = 9, N = 5;
        else if (H == 2) {
          var O = sr(r, g, 31) + 257, k = sr(r, g + 10, 15) + 4, G = O + sr(r, g + 5, 31) + 1;
          g += 14;
          for (var z = new Se(G), j = new Se(19), Z = 0; Z < k; ++Z)
            j[Wc[Z]] = sr(r, g + Z * 3, 7);
          g += k * 3;
          for (var $ = vc(j), v = (1 << $) - 1, u = Er(j, $, 1), Z = 0; Z < G; ) {
            var A = u[sr(r, g, v)];
            g += A & 15;
            var X = A >> 4;
            if (X < 16)
              z[Z++] = X;
            else {
              var p = 0, m = 0;
              for (X == 16 ? (m = 3 + sr(r, g, 3), g += 2, p = z[Z - 1]) : X == 17 ? (m = 3 + sr(r, g, 7), g += 3) : X == 18 && (m = 11 + sr(r, g, 127), g += 7); m--; )
                z[Z++] = p;
            }
          }
          var b = z.subarray(0, O), S = z.subarray(O);
          x = vc(b), N = vc(S), R = Er(b, x, 1), Q = Er(S, N, 1);
        } else
          ar(1);
      else {
        var X = Sd(g) + 4, P = r[X - 4] | r[X - 3] << 8, M = X + P;
        if (M > s) {
          d && ar(0);
          break;
        }
        o && h(y + P), e.set(r.subarray(X, M), y), t.b = y += P, t.p = g = M * 8, t.f = f;
        continue;
      }
      if (g > U) {
        d && ar(0);
        break;
      }
    }
    o && h(y + 131072);
    for (var F = (1 << x) - 1, I = (1 << N) - 1, _ = g; ; _ = g) {
      var p = R[xc(r, g) & F], C = p >> 4;
      if (g += p & 15, g > U) {
        d && ar(0);
        break;
      }
      if (p || ar(2), C < 256)
        e[y++] = C;
      else if (C == 256) {
        _ = g, R = null;
        break;
      } else {
        var tt = C - 254;
        if (C > 264) {
          var Z = C - 257, et = wo[Z];
          tt = sr(r, g, (1 << et) - 1) + v_[Z], g += et;
        }
        var nt = Q[xc(r, g) & I], Ft = nt >> 4;
        nt || ar(3), g += nt & 15;
        var S = Ob[Ft];
        if (Ft > 3) {
          var et = mo[Ft];
          S += xc(r, g) & (1 << et) - 1, g += et;
        }
        if (g > U) {
          d && ar(0);
          break;
        }
        o && h(y + 131072);
        var ft = y + tt;
        if (y < S) {
          var Et = i - S, nr = Math.min(S, ft);
          for (Et + y < 0 && ar(3); y < nr; ++y)
            e[y] = n[Et + y];
        }
        for (; y < ft; ++y)
          e[y] = e[y - S];
      }
    }
    t.l = R, t.p = _, t.b = y, t.f = f, R && (f = 1, t.m = x, t.d = Q, t.n = N);
  } while (!f);
  return y != e.length && a ? R_(e, 0, y) : e.subarray(0, y);
}, Nr = function(r, t, e) {
  e <<= t & 7;
  var n = t / 8 | 0;
  r[n] |= e, r[n + 1] |= e >> 8;
}, Mi = function(r, t, e) {
  e <<= t & 7;
  var n = t / 8 | 0;
  r[n] |= e, r[n + 1] |= e >> 8, r[n + 2] |= e >> 16;
}, Rc = function(r, t) {
  for (var e = [], n = 0; n < r.length; ++n)
    r[n] && e.push({ s: n, f: r[n] });
  var s = e.length, i = e.slice();
  if (!s)
    return { t: T_, l: 0 };
  if (s == 1) {
    var a = new Se(e[0].s + 1);
    return a[e[0].s] = 1, { t: a, l: 1 };
  }
  e.sort(function(M, O) {
    return M.f - O.f;
  }), e.push({ s: -1, f: 25001 });
  var o = e[0], d = e[1], h = 0, f = 1, g = 2;
  for (e[0] = { s: -1, f: o.f + d.f, l: o, r: d }; f != s - 1; )
    o = e[e[h].f < e[g].f ? h++ : g++], d = e[h != f && e[h].f < e[g].f ? h++ : g++], e[f++] = { s: -1, f: o.f + d.f, l: o, r: d };
  for (var y = i[0].s, n = 1; n < s; ++n)
    i[n].s > y && (y = i[n].s);
  var R = new Ye(y + 1), Q = Zc(e[f - 1], R, 0);
  if (Q > t) {
    var n = 0, x = 0, N = Q - t, U = 1 << N;
    for (i.sort(function(O, k) {
      return R[k.s] - R[O.s] || O.f - k.f;
    }); n < s; ++n) {
      var H = i[n].s;
      if (R[H] > t)
        x += U - (1 << Q - R[H]), R[H] = t;
      else
        break;
    }
    for (x >>= N; x > 0; ) {
      var X = i[n].s;
      R[X] < t ? x -= 1 << t - R[X]++ - 1 : ++n;
    }
    for (; n >= 0 && x; --n) {
      var P = i[n].s;
      R[P] == t && (--R[P], ++x);
    }
    Q = t;
  }
  return { t: new Se(R), l: Q };
}, Zc = function(r, t, e) {
  return r.s == -1 ? Math.max(Zc(r.l, t, e + 1), Zc(r.r, t, e + 1)) : t[r.s] = e;
}, qA = function(r) {
  for (var t = r.length; t && !r[--t]; )
    ;
  for (var e = new Ye(++t), n = 0, s = r[0], i = 1, a = function(d) {
    e[n++] = d;
  }, o = 1; o <= t; ++o)
    if (r[o] == s && o != t)
      ++i;
    else {
      if (!s && i > 2) {
        for (; i > 138; i -= 138)
          a(32754);
        i > 2 && (a(i > 10 ? i - 11 << 5 | 28690 : i - 3 << 5 | 12305), i = 0);
      } else if (i > 3) {
        for (a(s), --i; i > 6; i -= 6)
          a(8304);
        i > 2 && (a(i - 3 << 5 | 8208), i = 0);
      }
      for (; i--; )
        a(s);
      i = 1, s = r[o];
    }
  return { c: e.subarray(0, n), n: t };
}, Pi = function(r, t) {
  for (var e = 0, n = 0; n < t.length; ++n)
    e += r[n] * t[n];
  return e;
}, S_ = function(r, t, e) {
  var n = e.length, s = Sd(t + 2);
  r[s] = n & 255, r[s + 1] = n >> 8, r[s + 2] = r[s] ^ 255, r[s + 3] = r[s + 1] ^ 255;
  for (var i = 0; i < n; ++i)
    r[s + i + 4] = e[i];
  return (s + 4 + n) * 8;
}, $A = function(r, t, e, n, s, i, a, o, d, h, f) {
  Nr(t, f++, e), ++s[256];
  for (var g = Rc(s, 15), y = g.t, R = g.l, Q = Rc(i, 15), x = Q.t, N = Q.l, U = qA(y), H = U.c, X = U.n, P = qA(x), M = P.c, O = P.n, k = new Ye(19), G = 0; G < H.length; ++G)
    ++k[H[G] & 31];
  for (var G = 0; G < M.length; ++G)
    ++k[M[G] & 31];
  for (var z = Rc(k, 7), j = z.t, Z = z.l, $ = 19; $ > 4 && !j[Wc[$ - 1]]; --$)
    ;
  var v = h + 5 << 3, u = Pi(s, rn) + Pi(i, $i) + a, A = Pi(s, y) + Pi(i, x) + a + 14 + 3 * $ + Pi(k, j) + 2 * k[16] + 3 * k[17] + 7 * k[18];
  if (d >= 0 && v <= u && v <= A)
    return S_(t, f, r.subarray(d, d + h));
  var p, m, b, S;
  if (Nr(t, f, 1 + (A < u)), f += 2, A < u) {
    p = Er(y, R, 0), m = y, b = Er(x, N, 0), S = x;
    var F = Er(j, Z, 0);
    Nr(t, f, X - 257), Nr(t, f + 5, O - 1), Nr(t, f + 10, $ - 4), f += 14;
    for (var G = 0; G < $; ++G)
      Nr(t, f + 3 * G, j[Wc[G]]);
    f += 3 * $;
    for (var I = [H, M], _ = 0; _ < 2; ++_)
      for (var C = I[_], G = 0; G < C.length; ++G) {
        var tt = C[G] & 31;
        Nr(t, f, F[tt]), f += j[tt], tt > 15 && (Nr(t, f, C[G] >> 5 & 127), f += C[G] >> 12);
      }
  } else
    p = Mb, m = rn, b = Lb, S = $i;
  for (var G = 0; G < o; ++G) {
    var et = n[G];
    if (et > 255) {
      var tt = et >> 18 & 31;
      Mi(t, f, p[tt + 257]), f += m[tt + 257], tt > 7 && (Nr(t, f, et >> 23 & 31), f += wo[tt]);
      var nt = et & 31;
      Mi(t, f, b[nt]), f += S[nt], nt > 3 && (Mi(t, f, et >> 5 & 8191), f += mo[nt]);
    } else
      Mi(t, f, p[et]), f += m[et];
  }
  return Mi(t, f, p[256]), f + m[256];
}, zb = /* @__PURE__ */ new Rd([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), T_ = /* @__PURE__ */ new Se(0), Xb = function(r, t, e, n, s, i) {
  var a = i.z || r.length, o = new Se(n + a + 5 * (1 + Math.ceil(a / 7e3)) + s), d = o.subarray(n, o.length - s), h = i.l, f = (i.r || 0) & 7;
  if (t) {
    f && (d[0] = i.r >> 3);
    for (var g = zb[t - 1], y = g >> 13, R = g & 8191, Q = (1 << e) - 1, x = i.p || new Ye(32768), N = i.h || new Ye(Q + 1), U = Math.ceil(e / 3), H = 2 * U, X = function(Tt) {
      return (r[Tt] ^ r[Tt + 1] << U ^ r[Tt + 2] << H) & Q;
    }, P = new Rd(25e3), M = new Ye(288), O = new Ye(32), k = 0, G = 0, z = i.i || 0, j = 0, Z = i.w || 0, $ = 0; z + 2 < a; ++z) {
      var v = X(z), u = z & 32767, A = N[v];
      if (x[u] = A, N[v] = u, Z <= z) {
        var p = a - z;
        if ((k > 7e3 || j > 24576) && (p > 423 || !h)) {
          f = $A(r, d, 0, P, M, O, G, j, $, z - $, f), j = k = G = 0, $ = z;
          for (var m = 0; m < 286; ++m)
            M[m] = 0;
          for (var m = 0; m < 30; ++m)
            O[m] = 0;
        }
        var b = 2, S = 0, F = R, I = u - A & 32767;
        if (p > 2 && v == X(z - I))
          for (var _ = Math.min(y, p) - 1, C = Math.min(32767, z), tt = Math.min(258, p); I <= C && --F && u != A; ) {
            if (r[z + b] == r[z + b - I]) {
              for (var et = 0; et < tt && r[z + et] == r[z + et - I]; ++et)
                ;
              if (et > b) {
                if (b = et, S = I, et > _)
                  break;
                for (var nt = Math.min(I, et - 2), Ft = 0, m = 0; m < nt; ++m) {
                  var ft = z - I + m & 32767, Et = x[ft], nr = ft - Et & 32767;
                  nr > Ft && (Ft = nr, A = ft);
                }
              }
            }
            u = A, A = x[u], I += u - A & 32767;
          }
        if (S) {
          P[j++] = 268435456 | Yc[b] << 18 | JA[S];
          var Rt = Yc[b] & 31, Bt = JA[S] & 31;
          G += wo[Rt] + mo[Bt], ++M[257 + Rt], ++O[Bt], Z = z + b, ++k;
        } else
          P[j++] = r[z], ++M[r[z]];
      }
    }
    for (z = Math.max(z, Z); z < a; ++z)
      P[j++] = r[z], ++M[r[z]];
    f = $A(r, d, h, P, M, O, G, j, $, z - $, f), h || (i.r = f & 7 | d[f / 8 | 0] << 3, f -= 7, i.h = N, i.p = x, i.i = z, i.w = Z);
  } else {
    for (var z = i.w || 0; z < a + h; z += 65535) {
      var Oe = z + 65535;
      Oe >= a && (d[f / 8 | 0] = h, Oe = a), f = S_(d, f + 1, r.subarray(z, Oe));
    }
    i.i = a;
  }
  return R_(o, 0, n + Sd(f) + s);
}, Hb = /* @__PURE__ */ function() {
  for (var r = new Int32Array(256), t = 0; t < 256; ++t) {
    for (var e = t, n = 9; --n; )
      e = (e & 1 && -306674912) ^ e >>> 1;
    r[t] = e;
  }
  return r;
}(), Vb = function() {
  var r = -1;
  return {
    p: function(t) {
      for (var e = r, n = 0; n < t.length; ++n)
        e = Hb[e & 255 ^ t[n]] ^ e >>> 8;
      r = e;
    },
    d: function() {
      return ~r;
    }
  };
}, Wb = function(r, t, e, n, s) {
  if (!s && (s = { l: 1 }, t.dictionary)) {
    var i = t.dictionary.subarray(-32768), a = new Se(i.length + r.length);
    a.set(i), a.set(r, i.length), r = a, s.w = i.length;
  }
  return Xb(r, t.level == null ? 6 : t.level, t.mem == null ? s.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(r.length))) * 1.5) : 20 : 12 + t.mem, e, n, s);
}, Jc = function(r, t, e) {
  for (; e; ++t)
    r[t] = e, e >>>= 8;
}, Yb = function(r, t) {
  var e = t.filename;
  if (r[0] = 31, r[1] = 139, r[2] = 8, r[8] = t.level < 2 ? 4 : t.level == 9 ? 2 : 0, r[9] = 3, t.mtime != 0 && Jc(r, 4, Math.floor(new Date(t.mtime || Date.now()) / 1e3)), e) {
    r[3] = 8;
    for (var n = 0; n <= e.length; ++n)
      r[n + 10] = e.charCodeAt(n);
  }
}, jb = function(r) {
  (r[0] != 31 || r[1] != 139 || r[2] != 8) && ar(6, "invalid gzip data");
  var t = r[3], e = 10;
  t & 4 && (e += (r[10] | r[11] << 8) + 2);
  for (var n = (t >> 3 & 1) + (t >> 4 & 1); n > 0; n -= !r[e++])
    ;
  return e + (t & 2);
}, Zb = function(r) {
  var t = r.length;
  return (r[t - 4] | r[t - 3] << 8 | r[t - 2] << 16 | r[t - 1] << 24) >>> 0;
}, Jb = function(r) {
  return 10 + (r.filename ? r.filename.length + 1 : 0);
};
function qb(r, t) {
  t || (t = {});
  var e = Vb(), n = r.length;
  e.p(r);
  var s = Wb(r, t, Jb(t), 8), i = s.length;
  return Yb(s, t), Jc(s, i - 8, e.d()), Jc(s, i - 4, n), s;
}
function $b(r, t) {
  var e = jb(r);
  return e + 8 > r.length && ar(6, "invalid gzip data"), Gb(r.subarray(e, -8), { i: 2 }, new Se(Zb(r)), t);
}
var Kb = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), tI = 0;
try {
  Kb.decode(T_, { stream: !0 }), tI = 1;
} catch {
}
var eI = Object.defineProperty, Pt = (r, t) => eI(r, "name", { value: t, configurable: !0 }), Y2 = /* @__PURE__ */ Pt((r) => r.length ? r[0].toUpperCase() + r.slice(1) : r, "capitalizeString"), N_ = /* @__PURE__ */ Pt((r, t) => {
  const e = [];
  for (let o = 0; o < r.length; o += t) {
    const d = new Uint8Array(t);
    d.set(r.slice(o, o + t)), e.push(d);
  }
  const n = e[e.length - 1], s = r.length % t, i = s + (8 - s % 8) % 8, a = n.slice(0, i);
  return e[e.length - 1] = a, e;
}, "chunkAndPadBytes"), J = /* @__PURE__ */ Pt((r, t, e = !0) => {
  if (r instanceof Uint8Array)
    return e ? new Uint8Array(r) : r;
  if (typeof r == "string" && r.match(/^0x([0-9a-f][0-9a-f])*$/i)) {
    const i = new Uint8Array((r.length - 2) / 2);
    let a = 2;
    for (let o = 0; o < i.length; o++)
      i[o] = parseInt(r.substring(a, a + 2), 16), a += 2;
    return i;
  }
  const s = `invalid data:${t ? ` ${t} -` : ""} ${r}
If you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.`;
  throw new B(L.INVALID_DATA, s);
}, "arrayify"), yo = /* @__PURE__ */ Pt((r) => {
  const t = r.map((s) => s instanceof Uint8Array ? s : Uint8Array.from(s)), e = t.reduce((s, i) => s + i.length, 0), n = new Uint8Array(e);
  return t.reduce((s, i) => (n.set(i, s), s + i.length), 0), n;
}, "concatBytes"), ct = /* @__PURE__ */ Pt((r) => {
  const t = r.map((e) => J(e));
  return yo(t);
}, "concat"), KA = "0123456789abcdef";
function W(r) {
  const t = J(r);
  let e = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    e += KA[(s & 240) >> 4] + KA[s & 15];
  }
  return e;
}
Pt(W, "hexlify");
var j2 = /* @__PURE__ */ Pt((r) => {
  const e = [
    (n) => n.replace(/\s+/g, "-"),
    // spaces to -
    (n) => n.replace(/\./g, "-"),
    // dots to -
    (n) => n.replace(/_/g, "-"),
    // underscore to -
    (n) => n.replace(/-[a-z]/g, (s) => s.slice(-1).toUpperCase()),
    // delete '-' and capitalize the letter after them
    (n) => n.replace(/-/g, ""),
    // delete any '-' left
    (n) => n.replace(/^\d+/, ""),
    // removes leading digits
    (n) => n[0].toUpperCase() + n.slice(1)
    // capitalize first letter
  ].reduce((n, s) => s(n), r);
  if (e === "") {
    const n = `The provided string '${r}' results in an empty output after`.concat(
      " normalization, therefore, it can't normalize string."
    );
    throw new B(L.PARSE_FAILED, n);
  }
  return e;
}, "normalizeString"), rI = 37, D_ = BigInt(2 ** 62) + BigInt(rI), nI = /* @__PURE__ */ Pt((r) => Math.floor(r / 1e3), "msToSeconds"), F_ = /* @__PURE__ */ Pt((r) => r * 1e3, "secondsToMs"), sI = /* @__PURE__ */ Pt((r) => Number(BigInt(r) - D_), "tai64ToUnixSeconds"), iI = /* @__PURE__ */ Pt((r) => String(BigInt(r) + D_), "unixSecondsToTai64"), aI = /* @__PURE__ */ Pt((r) => F_(sI(r)), "tai64ToUnixMilliseconds"), br, Q_ = (br = class extends Date {
  /**
   * Generates a new DateTime instance from a Tai64 timestamp.
   *
   * @param tai64 - Tai64 timestamp
   * @returns a new DateTime instance
   */
  static fromTai64(t) {
    return new br(aI(t));
  }
  /**
   * @param unixMilliseconds - unix milliseconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixMilliseconds(t) {
    return new br(t);
  }
  /**
   * @param unixSeconds - unix seconds timestamp
   * @returns a new DateTime instance
   */
  static fromUnixSeconds(t) {
    return new br(F_(t));
  }
  /**
   * Hide the constructor to prevent direct instantiation.
   */
  constructor(t) {
    super(t);
  }
  /**
   * Returns the Tai64 timestamp.
   *
   * @returns the Tai64 timestamp
   */
  toTai64() {
    return iI(this.toUnixSeconds());
  }
  /**
   * @returns the unix milliseconds timestamp
   */
  toUnixMilliseconds() {
    return this.getTime();
  }
  /**
   * @returns the unix seconds timestamp
   */
  toUnixSeconds() {
    return nI(this.getTime());
  }
}, Pt(br, "DateTime"), D(br, "TAI64_NULL", ""), br);
function Td(r) {
  return new Promise((t) => {
    setTimeout(() => {
      t(!0);
    }, r);
  });
}
Pt(Td, "sleep");
var oI = {
  chain_name: "local_testnet",
  consensus_parameters: {
    V2: {
      tx_params: {
        V1: {
          max_inputs: 255,
          max_outputs: 255,
          max_witnesses: 255,
          max_gas_per_tx: 3e7,
          max_size: 112640,
          max_bytecode_subsections: 256
        }
      },
      predicate_params: {
        V1: {
          max_predicate_length: 24576,
          max_predicate_data_length: 24576,
          max_message_data_length: 102400,
          max_gas_per_predicate: 1e6
        }
      },
      script_params: {
        V1: {
          max_script_length: 102400,
          max_script_data_length: 102400
        }
      },
      contract_params: {
        V1: {
          contract_max_size: 112640,
          max_storage_slots: 1760
        }
      },
      fee_params: {
        V1: {
          gas_price_factor: 115e4,
          gas_per_byte: 63
        }
      },
      chain_id: 0,
      gas_costs: {
        V4: {
          add: 2,
          addi: 2,
          and: 2,
          andi: 2,
          bal: 274,
          bhei: 2,
          bhsh: 2,
          burn: 7566,
          cb: 2,
          cfsi: 2,
          div: 2,
          divi: 2,
          eck1: 1489,
          ecr1: 20513,
          eq: 2,
          exp: 2,
          expi: 2,
          flag: 2,
          gm: 2,
          gt: 2,
          gtf: 3,
          ji: 2,
          jmp: 2,
          jne: 2,
          jnei: 2,
          jnzi: 2,
          jmpf: 2,
          jmpb: 2,
          jnzf: 2,
          jnzb: 2,
          jnef: 2,
          jneb: 2,
          lb: 2,
          log: 80,
          lt: 2,
          lw: 2,
          mint: 6566,
          mlog: 2,
          mod: 2,
          modi: 2,
          move: 2,
          movi: 1,
          mroo: 3,
          mul: 2,
          muli: 2,
          mldv: 3,
          noop: 1,
          not: 2,
          or: 1,
          ori: 2,
          poph: 2,
          popl: 2,
          pshh: 5,
          pshl: 5,
          ret_contract: 43,
          rvrt_contract: 39,
          sb: 2,
          sll: 2,
          slli: 2,
          srl: 2,
          srli: 2,
          srw: 237,
          sub: 2,
          subi: 2,
          sw: 2,
          sww: 5708,
          time: 106,
          tr: 9253,
          tro: 7199,
          wdcm: 2,
          wqcm: 2,
          wdop: 2,
          wqop: 3,
          wdml: 3,
          wqml: 3,
          wddv: 3,
          wqdv: 4,
          wdmd: 6,
          wqmd: 9,
          wdam: 6,
          wqam: 6,
          wdmm: 6,
          wqmm: 6,
          xor: 2,
          xori: 2,
          ecop: 2,
          aloc: {
            LightOperation: {
              base: 2,
              units_per_gas: 35
            }
          },
          bsiz: {
            LightOperation: {
              base: 25,
              units_per_gas: 564
            }
          },
          bldd: {
            LightOperation: {
              base: 33,
              units_per_gas: 130
            }
          },
          cfe: {
            LightOperation: {
              base: 10,
              units_per_gas: 62
            }
          },
          cfei: {
            LightOperation: {
              base: 10,
              units_per_gas: 66
            }
          },
          call: {
            LightOperation: {
              base: 6934,
              units_per_gas: 14
            }
          },
          ccp: {
            LightOperation: {
              base: 21,
              units_per_gas: 155
            }
          },
          croo: {
            LightOperation: {
              base: 69,
              units_per_gas: 4
            }
          },
          csiz: {
            LightOperation: {
              base: 25,
              units_per_gas: 580
            }
          },
          ed19: {
            LightOperation: {
              base: 3232,
              units_per_gas: 7
            }
          },
          k256: {
            LightOperation: {
              base: 21,
              units_per_gas: 6
            }
          },
          ldc: {
            LightOperation: {
              base: 84,
              units_per_gas: 113
            }
          },
          logd: {
            LightOperation: {
              base: 278,
              units_per_gas: 5
            }
          },
          mcl: {
            LightOperation: {
              base: 2,
              units_per_gas: 1282
            }
          },
          mcli: {
            LightOperation: {
              base: 2,
              units_per_gas: 1250
            }
          },
          mcp: {
            LightOperation: {
              base: 3,
              units_per_gas: 385
            }
          },
          mcpi: {
            LightOperation: {
              base: 7,
              units_per_gas: 585
            }
          },
          meq: {
            LightOperation: {
              base: 2,
              units_per_gas: 1234
            }
          },
          retd_contract: {
            LightOperation: {
              base: 227,
              units_per_gas: 5
            }
          },
          s256: {
            LightOperation: {
              base: 25,
              units_per_gas: 5
            }
          },
          scwq: {
            HeavyOperation: {
              base: 5666,
              gas_per_unit: 6628
            }
          },
          smo: {
            LightOperation: {
              base: 14635,
              units_per_gas: 3
            }
          },
          srwq: {
            HeavyOperation: {
              base: 245,
              gas_per_unit: 243
            }
          },
          swwq: {
            HeavyOperation: {
              base: 5661,
              gas_per_unit: 5776
            }
          },
          epar: {
            HeavyOperation: {
              base: 5661,
              gas_per_unit: 5776
            }
          },
          contract_root: {
            LightOperation: {
              base: 24,
              units_per_gas: 3
            }
          },
          state_root: {
            HeavyOperation: {
              base: 189,
              gas_per_unit: 96
            }
          },
          new_storage_per_byte: 63,
          vm_initialization: {
            LightOperation: {
              base: 3127,
              units_per_gas: 61
            }
          }
        }
      },
      base_asset_id: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07",
      block_gas_limit: 3e7,
      block_transaction_size_limit: 260096,
      privileged_address: "0000000000000000000000000000000000000000000000000000000000000000"
    }
  },
  consensus: {
    PoA: {
      signing_key: "0x94ffcc53b892684acefaebc8a3d4a595e528a8cf664eeb3ef36f1020b0809d0d"
    }
  }
}, cI = {
  chain_config: "chainConfig.json",
  table_encoding: {
    Json: {
      filepath: "stateConfig.json"
    }
  }
}, dI = {
  coins: [],
  messages: [],
  contracts: [],
  blobs: [],
  block_height: 0,
  da_block_height: 0
}, Z2 = {
  chainConfig: oI,
  metadata: cI,
  stateConfig: dI
}, J2 = "0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298";
function Fe(r) {
  return r !== void 0;
}
Pt(Fe, "isDefined");
var O_ = E(0), qc = E(58), eo = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz", wa = null;
function M_(r) {
  if (wa == null) {
    wa = {};
    for (let e = 0; e < eo.length; e++)
      wa[eo[e]] = E(e);
  }
  const t = wa[r];
  if (t == null)
    throw new B(L.INVALID_DATA, `invalid base58 value ${r}`);
  return E(t);
}
Pt(M_, "getAlpha");
function Nd(r) {
  const t = J(r);
  let e = E(t), n = "";
  for (; e.gt(O_); )
    n = eo[Number(e.mod(qc))] + n, e = e.div(qc);
  for (let s = 0; s < t.length && !t[s]; s++)
    n = eo[0] + n;
  return n;
}
Pt(Nd, "encodeBase58");
function P_(r) {
  let t = O_;
  for (let e = 0; e < r.length; e++)
    t = t.mul(qc), t = t.add(M_(r[e].toString()));
  return t;
}
Pt(P_, "decodeBase58");
function bo(r, t, e) {
  const n = J(r);
  if (e != null && e > n.length)
    throw new B(L.INVALID_DATA, "cannot slice beyond data bounds");
  return W(n.slice(t ?? 0, e ?? n.length));
}
Pt(bo, "dataSlice");
function Ar(r, t = !0) {
  let e = r;
  t && (e = r.normalize("NFC"));
  const n = [];
  for (let s = 0; s < e.length; s += 1) {
    const i = e.charCodeAt(s);
    if (i < 128)
      n.push(i);
    else if (i < 2048)
      n.push(i >> 6 | 192), n.push(i & 63 | 128);
    else if ((i & 64512) === 55296) {
      s += 1;
      const a = e.charCodeAt(s);
      if (s >= e.length || (a & 64512) !== 56320)
        throw new B(
          L.INVALID_INPUT_PARAMETERS,
          "Invalid UTF-8 in the input string."
        );
      const o = 65536 + ((i & 1023) << 10) + (a & 1023);
      n.push(o >> 18 | 240), n.push(o >> 12 & 63 | 128), n.push(o >> 6 & 63 | 128), n.push(o & 63 | 128);
    } else
      n.push(i >> 12 | 224), n.push(i >> 6 & 63 | 128), n.push(i & 63 | 128);
  }
  return new Uint8Array(n);
}
Pt(Ar, "toUtf8Bytes");
function Vr(r, t, e, n, s) {
  return console.log(`invalid codepoint at offset ${t}; ${r}, bytes: ${e}`), t;
}
Pt(Vr, "onError");
function L_(r) {
  return r.map((t) => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(
    (t >> 10 & 1023) + 55296,
    (t & 1023) + 56320
  ))).join("");
}
Pt(L_, "helper");
function k_(r) {
  const t = J(r, "bytes"), e = [];
  let n = 0;
  for (; n < t.length; ) {
    const s = t[n++];
    if (!(s >> 7)) {
      e.push(s);
      continue;
    }
    let i = null, a = null;
    if ((s & 224) === 192)
      i = 1, a = 127;
    else if ((s & 240) === 224)
      i = 2, a = 2047;
    else if ((s & 248) === 240)
      i = 3, a = 65535;
    else {
      (s & 192) === 128 ? n += Vr("UNEXPECTED_CONTINUE", n - 1, t) : n += Vr("BAD_PREFIX", n - 1, t);
      continue;
    }
    if (n - 1 + i >= t.length) {
      n += Vr("OVERRUN", n - 1, t);
      continue;
    }
    let o = s & (1 << 8 - i - 1) - 1;
    for (let d = 0; d < i; d++) {
      const h = t[n];
      if ((h & 192) !== 128) {
        n += Vr("MISSING_CONTINUE", n, t), o = null;
        break;
      }
      o = o << 6 | h & 63, n++;
    }
    if (o !== null) {
      if (o > 1114111) {
        n += Vr("OUT_OF_RANGE", n - 1 - i, t);
        continue;
      }
      if (o >= 55296 && o <= 57343) {
        n += Vr("UTF16_SURROGATE", n - 1 - i, t);
        continue;
      }
      if (o <= a) {
        n += Vr("OVERLONG", n - 1 - i, t);
        continue;
      }
      e.push(o);
    }
  }
  return e;
}
Pt(k_, "getUtf8CodePoints");
function Io(r) {
  return L_(k_(r));
}
Pt(Io, "toUtf8String");
var q2 = /* @__PURE__ */ Pt((r) => {
  if (!r)
    return "";
  const t = J(r), e = qb(t, { mtime: 0 }), n = String.fromCharCode.apply(
    null,
    new Uint8Array(e)
  );
  return btoa(n);
}, "compressBytecode"), uI = /* @__PURE__ */ Pt((r) => {
  const t = atob(r), e = new Uint8Array(t.length).map(
    (s, i) => t.charCodeAt(i)
  );
  return $b(e);
}, "decompressBytecode");
function Eo(r) {
  throw new Error("Didn't expect to get here");
}
Pt(Eo, "assertUnreachable");
function Ve(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error("positive integer expected, got " + r);
}
function hI(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function ha(r, ...t) {
  if (!hI(r))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + r.length);
}
function U_(r) {
  if (typeof r != "function" || typeof r.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  Ve(r.outputLen), Ve(r.blockLen);
}
function wi(r, t = !0) {
  if (r.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && r.finished)
    throw new Error("Hash#digest() has already been called");
}
function G_(r, t) {
  ha(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error("digestInto() expects output buffer of length at least " + e);
}
const Wn = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function xa(r) {
  return new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4));
}
function Ra(r) {
  return new DataView(r.buffer, r.byteOffset, r.byteLength);
}
function pr(r, t) {
  return r << 32 - t | r >>> t;
}
function It(r, t) {
  return r << t | r >>> 32 - t >>> 0;
}
const ro = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function AI(r) {
  return r << 24 & 4278190080 | r << 8 & 16711680 | r >>> 8 & 65280 | r >>> 24 & 255;
}
function no(r) {
  for (let t = 0; t < r.length; t++)
    r[t] = AI(r[t]);
}
function lI(r) {
  if (typeof r != "string")
    throw new Error("utf8ToBytes expected string, got " + typeof r);
  return new Uint8Array(new TextEncoder().encode(r));
}
function mi(r) {
  return typeof r == "string" && (r = lI(r)), ha(r), r;
}
function _I(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    ha(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, s = 0; n < r.length; n++) {
    const i = r[n];
    e.set(i, s), s += i.length;
  }
  return e;
}
class Dd {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function z_(r, t) {
  if (t !== void 0 && {}.toString.call(t) !== "[object Object]")
    throw new Error("Options should be object or undefined");
  return Object.assign(r, t);
}
function Co(r) {
  const t = (n) => r().update(mi(n)).digest(), e = r();
  return t.outputLen = e.outputLen, t.blockLen = e.blockLen, t.create = () => r(), t;
}
function pI(r = 32) {
  if (Wn && typeof Wn.getRandomValues == "function")
    return Wn.getRandomValues(new Uint8Array(r));
  if (Wn && typeof Wn.randomBytes == "function")
    return Wn.randomBytes(r);
  throw new Error("crypto.getRandomValues must be defined");
}
class X_ extends Dd {
  constructor(t, e) {
    super(), this.finished = !1, this.destroyed = !1, U_(t);
    const n = mi(e);
    if (this.iHash = t.create(), typeof this.iHash.update != "function")
      throw new Error("Expected instance of class which extends utils.Hash");
    this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
    const s = this.blockLen, i = new Uint8Array(s);
    i.set(n.length > s ? t.create().update(n).digest() : n);
    for (let a = 0; a < i.length; a++)
      i[a] ^= 54;
    this.iHash.update(i), this.oHash = t.create();
    for (let a = 0; a < i.length; a++)
      i[a] ^= 106;
    this.oHash.update(i), i.fill(0);
  }
  update(t) {
    return wi(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    wi(this), ha(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const { oHash: e, iHash: n, finished: s, destroyed: i, blockLen: a, outputLen: o } = this;
    return t = t, t.finished = s, t.destroyed = i, t.blockLen = a, t.outputLen = o, t.oHash = e._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t;
  }
  destroy() {
    this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
  }
}
const Bo = (r, t, e) => new X_(r, t).update(e).digest();
Bo.create = (r, t) => new X_(r, t);
function fI(r, t, e, n) {
  U_(r);
  const s = z_({ dkLen: 32, asyncTick: 10 }, n), { c: i, dkLen: a, asyncTick: o } = s;
  if (Ve(i), Ve(a), Ve(o), i < 1)
    throw new Error("PBKDF2: iterations (c) should be >= 1");
  const d = mi(t), h = mi(e), f = new Uint8Array(a), g = Bo.create(r, d), y = g._cloneInto().update(h);
  return { c: i, dkLen: a, asyncTick: o, DK: f, PRF: g, PRFSalt: y };
}
function gI(r, t, e, n, s) {
  return r.destroy(), t.destroy(), n && n.destroy(), s.fill(0), e;
}
function Fd(r, t, e, n) {
  const { c: s, dkLen: i, DK: a, PRF: o, PRFSalt: d } = fI(r, t, e, n);
  let h;
  const f = new Uint8Array(4), g = Ra(f), y = new Uint8Array(o.outputLen);
  for (let R = 1, Q = 0; Q < i; R++, Q += o.outputLen) {
    const x = a.subarray(Q, Q + o.outputLen);
    g.setInt32(0, R, !1), (h = d._cloneInto(h)).update(f).digestInto(y), x.set(y.subarray(0, x.length));
    for (let N = 1; N < s; N++) {
      o._cloneInto(h).update(y).digestInto(y);
      for (let U = 0; U < x.length; U++)
        x[U] ^= y[U];
    }
  }
  return gI(o, d, a, h, y);
}
function wI(r, t, e, n) {
  if (typeof r.setBigUint64 == "function")
    return r.setBigUint64(t, e, n);
  const s = BigInt(32), i = BigInt(4294967295), a = Number(e >> s & i), o = Number(e & i), d = n ? 4 : 0, h = n ? 0 : 4;
  r.setUint32(t + d, a, n), r.setUint32(t + h, o, n);
}
function mI(r, t, e) {
  return r & t ^ ~r & e;
}
function yI(r, t, e) {
  return r & t ^ r & e ^ t & e;
}
class Qd extends Dd {
  constructor(t, e, n, s) {
    super(), this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = s, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = Ra(this.buffer);
  }
  update(t) {
    wi(this);
    const { view: e, buffer: n, blockLen: s } = this;
    t = mi(t);
    const i = t.length;
    for (let a = 0; a < i; ) {
      const o = Math.min(s - this.pos, i - a);
      if (o === s) {
        const d = Ra(t);
        for (; s <= i - a; a += s)
          this.process(d, a);
        continue;
      }
      n.set(t.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === s && (this.process(e, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    wi(this), G_(t, this), this.finished = !0;
    const { buffer: e, view: n, blockLen: s, isLE: i } = this;
    let { pos: a } = this;
    e[a++] = 128, this.buffer.subarray(a).fill(0), this.padOffset > s - a && (this.process(n, 0), a = 0);
    for (let g = a; g < s; g++)
      e[g] = 0;
    wI(n, s - 8, BigInt(this.length * 8), i), this.process(n, 0);
    const o = Ra(t), d = this.outputLen;
    if (d % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const h = d / 4, f = this.get();
    if (h > f.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < h; g++)
      o.setUint32(4 * g, f[g], i);
  }
  digest() {
    const { buffer: t, outputLen: e } = this;
    this.digestInto(t);
    const n = t.slice(0, e);
    return this.destroy(), n;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: e, buffer: n, length: s, finished: i, destroyed: a, pos: o } = this;
    return t.length = s, t.pos = o, t.finished = i, t.destroyed = a, s % e && t.buffer.set(n), t;
  }
}
const bI = /* @__PURE__ */ new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), Gr = /* @__PURE__ */ new Uint32Array([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), zr = /* @__PURE__ */ new Uint32Array(64);
class II extends Qd {
  constructor() {
    super(64, 32, 8, !1), this.A = Gr[0] | 0, this.B = Gr[1] | 0, this.C = Gr[2] | 0, this.D = Gr[3] | 0, this.E = Gr[4] | 0, this.F = Gr[5] | 0, this.G = Gr[6] | 0, this.H = Gr[7] | 0;
  }
  get() {
    const { A: t, B: e, C: n, D: s, E: i, F: a, G: o, H: d } = this;
    return [t, e, n, s, i, a, o, d];
  }
  // prettier-ignore
  set(t, e, n, s, i, a, o, d) {
    this.A = t | 0, this.B = e | 0, this.C = n | 0, this.D = s | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = d | 0;
  }
  process(t, e) {
    for (let g = 0; g < 16; g++, e += 4)
      zr[g] = t.getUint32(e, !1);
    for (let g = 16; g < 64; g++) {
      const y = zr[g - 15], R = zr[g - 2], Q = pr(y, 7) ^ pr(y, 18) ^ y >>> 3, x = pr(R, 17) ^ pr(R, 19) ^ R >>> 10;
      zr[g] = x + zr[g - 7] + Q + zr[g - 16] | 0;
    }
    let { A: n, B: s, C: i, D: a, E: o, F: d, G: h, H: f } = this;
    for (let g = 0; g < 64; g++) {
      const y = pr(o, 6) ^ pr(o, 11) ^ pr(o, 25), R = f + y + mI(o, d, h) + bI[g] + zr[g] | 0, x = (pr(n, 2) ^ pr(n, 13) ^ pr(n, 22)) + yI(n, s, i) | 0;
      f = h, h = d, d = o, o = a + R | 0, a = i, i = s, s = n, n = R + x | 0;
    }
    n = n + this.A | 0, s = s + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, d = d + this.F | 0, h = h + this.G | 0, f = f + this.H | 0, this.set(n, s, i, a, o, d, h, f);
  }
  roundClean() {
    zr.fill(0);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0);
  }
}
const sn = /* @__PURE__ */ Co(() => new II());
function tl(r, t, e, n, s, i) {
  let a = r[t++] ^ e[n++], o = r[t++] ^ e[n++], d = r[t++] ^ e[n++], h = r[t++] ^ e[n++], f = r[t++] ^ e[n++], g = r[t++] ^ e[n++], y = r[t++] ^ e[n++], R = r[t++] ^ e[n++], Q = r[t++] ^ e[n++], x = r[t++] ^ e[n++], N = r[t++] ^ e[n++], U = r[t++] ^ e[n++], H = r[t++] ^ e[n++], X = r[t++] ^ e[n++], P = r[t++] ^ e[n++], M = r[t++] ^ e[n++], O = a, k = o, G = d, z = h, j = f, Z = g, $ = y, v = R, u = Q, A = x, p = N, m = U, b = H, S = X, F = P, I = M;
  for (let _ = 0; _ < 8; _ += 2)
    j ^= It(O + b | 0, 7), u ^= It(j + O | 0, 9), b ^= It(u + j | 0, 13), O ^= It(b + u | 0, 18), A ^= It(Z + k | 0, 7), S ^= It(A + Z | 0, 9), k ^= It(S + A | 0, 13), Z ^= It(k + S | 0, 18), F ^= It(p + $ | 0, 7), G ^= It(F + p | 0, 9), $ ^= It(G + F | 0, 13), p ^= It($ + G | 0, 18), z ^= It(I + m | 0, 7), v ^= It(z + I | 0, 9), m ^= It(v + z | 0, 13), I ^= It(m + v | 0, 18), k ^= It(O + z | 0, 7), G ^= It(k + O | 0, 9), z ^= It(G + k | 0, 13), O ^= It(z + G | 0, 18), $ ^= It(Z + j | 0, 7), v ^= It($ + Z | 0, 9), j ^= It(v + $ | 0, 13), Z ^= It(j + v | 0, 18), m ^= It(p + A | 0, 7), u ^= It(m + p | 0, 9), A ^= It(u + m | 0, 13), p ^= It(A + u | 0, 18), b ^= It(I + F | 0, 7), S ^= It(b + I | 0, 9), F ^= It(S + b | 0, 13), I ^= It(F + S | 0, 18);
  s[i++] = a + O | 0, s[i++] = o + k | 0, s[i++] = d + G | 0, s[i++] = h + z | 0, s[i++] = f + j | 0, s[i++] = g + Z | 0, s[i++] = y + $ | 0, s[i++] = R + v | 0, s[i++] = Q + u | 0, s[i++] = x + A | 0, s[i++] = N + p | 0, s[i++] = U + m | 0, s[i++] = H + b | 0, s[i++] = X + S | 0, s[i++] = P + F | 0, s[i++] = M + I | 0;
}
function Sc(r, t, e, n, s) {
  let i = n + 0, a = n + 16 * s;
  for (let o = 0; o < 16; o++)
    e[a + o] = r[t + (2 * s - 1) * 16 + o];
  for (let o = 0; o < s; o++, i += 16, t += 16)
    tl(e, a, r, t, e, i), o > 0 && (a += 16), tl(e, i, r, t += 16, e, a);
}
function EI(r, t, e) {
  const n = z_({
    dkLen: 32,
    asyncTick: 10,
    maxmem: 1073742848
  }, e), { N: s, r: i, p: a, dkLen: o, asyncTick: d, maxmem: h, onProgress: f } = n;
  if (Ve(s), Ve(i), Ve(a), Ve(o), Ve(d), Ve(h), f !== void 0 && typeof f != "function")
    throw new Error("progressCb should be function");
  const g = 128 * i, y = g / 4;
  if (s <= 1 || s & s - 1 || s > 2 ** 32)
    throw new Error("Scrypt: N must be larger than 1, a power of 2, and less than 2^32");
  if (a < 0 || a > (2 ** 32 - 1) * 32 / g)
    throw new Error("Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)");
  if (o < 0 || o > (2 ** 32 - 1) * 32)
    throw new Error("Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32");
  if (g * (s + a) > h)
    throw new Error("Scrypt: memused is bigger than maxMem. Expected 128 * r * (N + p) > maxmem of " + h);
  const Q = Fd(sn, r, t, { c: 1, dkLen: g * a }), x = xa(Q), N = xa(new Uint8Array(g * s)), U = xa(new Uint8Array(g));
  let H = () => {
  };
  if (f) {
    const X = 2 * s * a, P = Math.max(Math.floor(X / 1e4), 1);
    let M = 0;
    H = () => {
      M++, f && (!(M % P) || M === X) && f(M / X);
    };
  }
  return { N: s, r: i, p: a, dkLen: o, blockSize32: y, V: N, B32: x, B: Q, tmp: U, blockMixCb: H, asyncTick: d };
}
function CI(r, t, e, n, s) {
  const i = Fd(sn, r, e, { c: 1, dkLen: t });
  return e.fill(0), n.fill(0), s.fill(0), i;
}
function BI(r, t, e) {
  const { N: n, r: s, p: i, dkLen: a, blockSize32: o, V: d, B32: h, B: f, tmp: g, blockMixCb: y } = EI(r, t, e);
  ro || no(h);
  for (let R = 0; R < i; R++) {
    const Q = o * R;
    for (let x = 0; x < o; x++)
      d[x] = h[Q + x];
    for (let x = 0, N = 0; x < n - 1; x++)
      Sc(d, N, d, N += o, s), y();
    Sc(d, (n - 1) * o, h, Q, s), y();
    for (let x = 0; x < n; x++) {
      const N = h[Q + o - 16] % n;
      for (let U = 0; U < o; U++)
        g[U] = h[Q + U] ^ d[N * o + U];
      Sc(g, 0, h, Q, s), y();
    }
  }
  return ro || no(h), CI(r, a, f, d, g);
}
const ma = /* @__PURE__ */ BigInt(2 ** 32 - 1), $c = /* @__PURE__ */ BigInt(32);
function H_(r, t = !1) {
  return t ? { h: Number(r & ma), l: Number(r >> $c & ma) } : { h: Number(r >> $c & ma) | 0, l: Number(r & ma) | 0 };
}
function V_(r, t = !1) {
  let e = new Uint32Array(r.length), n = new Uint32Array(r.length);
  for (let s = 0; s < r.length; s++) {
    const { h: i, l: a } = H_(r[s], t);
    [e[s], n[s]] = [i, a];
  }
  return [e, n];
}
const vI = (r, t) => BigInt(r >>> 0) << $c | BigInt(t >>> 0), xI = (r, t, e) => r >>> e, RI = (r, t, e) => r << 32 - e | t >>> e, SI = (r, t, e) => r >>> e | t << 32 - e, TI = (r, t, e) => r << 32 - e | t >>> e, NI = (r, t, e) => r << 64 - e | t >>> e - 32, DI = (r, t, e) => r >>> e - 32 | t << 64 - e, FI = (r, t) => t, QI = (r, t) => r, W_ = (r, t, e) => r << e | t >>> 32 - e, Y_ = (r, t, e) => t << e | r >>> 32 - e, j_ = (r, t, e) => t << e - 32 | r >>> 64 - e, Z_ = (r, t, e) => r << e - 32 | t >>> 64 - e;
function OI(r, t, e, n) {
  const s = (t >>> 0) + (n >>> 0);
  return { h: r + e + (s / 2 ** 32 | 0) | 0, l: s | 0 };
}
const MI = (r, t, e) => (r >>> 0) + (t >>> 0) + (e >>> 0), PI = (r, t, e, n) => t + e + n + (r / 2 ** 32 | 0) | 0, LI = (r, t, e, n) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0), kI = (r, t, e, n, s) => t + e + n + s + (r / 2 ** 32 | 0) | 0, UI = (r, t, e, n, s) => (r >>> 0) + (t >>> 0) + (e >>> 0) + (n >>> 0) + (s >>> 0), GI = (r, t, e, n, s, i) => t + e + n + s + i + (r / 2 ** 32 | 0) | 0, gt = {
  fromBig: H_,
  split: V_,
  toBig: vI,
  shrSH: xI,
  shrSL: RI,
  rotrSH: SI,
  rotrSL: TI,
  rotrBH: NI,
  rotrBL: DI,
  rotr32H: FI,
  rotr32L: QI,
  rotlSH: W_,
  rotlSL: Y_,
  rotlBH: j_,
  rotlBL: Z_,
  add: OI,
  add3L: MI,
  add3H: PI,
  add4L: LI,
  add4H: kI,
  add5H: GI,
  add5L: UI
}, J_ = [], q_ = [], $_ = [], zI = /* @__PURE__ */ BigInt(0), Li = /* @__PURE__ */ BigInt(1), XI = /* @__PURE__ */ BigInt(2), HI = /* @__PURE__ */ BigInt(7), VI = /* @__PURE__ */ BigInt(256), WI = /* @__PURE__ */ BigInt(113);
for (let r = 0, t = Li, e = 1, n = 0; r < 24; r++) {
  [e, n] = [n, (2 * e + 3 * n) % 5], J_.push(2 * (5 * n + e)), q_.push((r + 1) * (r + 2) / 2 % 64);
  let s = zI;
  for (let i = 0; i < 7; i++)
    t = (t << Li ^ (t >> HI) * WI) % VI, t & XI && (s ^= Li << (Li << /* @__PURE__ */ BigInt(i)) - Li);
  $_.push(s);
}
const [YI, jI] = /* @__PURE__ */ V_($_, !0), el = (r, t, e) => e > 32 ? j_(r, t, e) : W_(r, t, e), rl = (r, t, e) => e > 32 ? Z_(r, t, e) : Y_(r, t, e);
function ZI(r, t = 24) {
  const e = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let a = 0; a < 10; a++)
      e[a] = r[a] ^ r[a + 10] ^ r[a + 20] ^ r[a + 30] ^ r[a + 40];
    for (let a = 0; a < 10; a += 2) {
      const o = (a + 8) % 10, d = (a + 2) % 10, h = e[d], f = e[d + 1], g = el(h, f, 1) ^ e[o], y = rl(h, f, 1) ^ e[o + 1];
      for (let R = 0; R < 50; R += 10)
        r[a + R] ^= g, r[a + R + 1] ^= y;
    }
    let s = r[2], i = r[3];
    for (let a = 0; a < 24; a++) {
      const o = q_[a], d = el(s, i, o), h = rl(s, i, o), f = J_[a];
      s = r[f], i = r[f + 1], r[f] = d, r[f + 1] = h;
    }
    for (let a = 0; a < 50; a += 10) {
      for (let o = 0; o < 10; o++)
        e[o] = r[a + o];
      for (let o = 0; o < 10; o++)
        r[a + o] ^= ~e[(o + 2) % 10] & e[(o + 4) % 10];
    }
    r[0] ^= YI[n], r[1] ^= jI[n];
  }
  e.fill(0);
}
class Od extends Dd {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, e, n, s = !1, i = 24) {
    if (super(), this.blockLen = t, this.suffix = e, this.outputLen = n, this.enableXOF = s, this.rounds = i, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, Ve(n), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = xa(this.state);
  }
  keccak() {
    ro || no(this.state32), ZI(this.state32, this.rounds), ro || no(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    wi(this);
    const { blockLen: e, state: n } = this;
    t = mi(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const a = Math.min(e - this.pos, s - i);
      for (let o = 0; o < a; o++)
        n[this.pos++] ^= t[i++];
      this.pos === e && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: e, pos: n, blockLen: s } = this;
    t[n] ^= e, e & 128 && n === s - 1 && this.keccak(), t[s - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    wi(this, !1), ha(t), this.finish();
    const e = this.state, { blockLen: n } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= n && this.keccak();
      const a = Math.min(n - this.posOut, i - s);
      t.set(e.subarray(this.posOut, this.posOut + a), s), this.posOut += a, s += a;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Ve(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (G_(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(t) {
    const { blockLen: e, suffix: n, outputLen: s, rounds: i, enableXOF: a } = this;
    return t || (t = new Od(e, n, s, a, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = s, t.enableXOF = a, t.destroyed = this.destroyed, t;
  }
}
const JI = (r, t, e) => Co(() => new Od(t, r, e)), qI = /* @__PURE__ */ JI(1, 136, 256 / 8), $I = /* @__PURE__ */ new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]), K_ = /* @__PURE__ */ new Uint8Array(new Array(16).fill(0).map((r, t) => t)), KI = /* @__PURE__ */ K_.map((r) => (9 * r + 5) % 16);
let Md = [K_], Pd = [KI];
for (let r = 0; r < 4; r++)
  for (let t of [Md, Pd])
    t.push(t[r].map((e) => $I[e]));
const tp = /* @__PURE__ */ [
  [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8],
  [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7],
  [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9],
  [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6],
  [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]
].map((r) => new Uint8Array(r)), tE = /* @__PURE__ */ Md.map((r, t) => r.map((e) => tp[t][e])), eE = /* @__PURE__ */ Pd.map((r, t) => r.map((e) => tp[t][e])), rE = /* @__PURE__ */ new Uint32Array([
  0,
  1518500249,
  1859775393,
  2400959708,
  2840853838
]), nE = /* @__PURE__ */ new Uint32Array([
  1352829926,
  1548603684,
  1836072691,
  2053994217,
  0
]);
function nl(r, t, e, n) {
  return r === 0 ? t ^ e ^ n : r === 1 ? t & e | ~t & n : r === 2 ? (t | ~e) ^ n : r === 3 ? t & n | e & ~n : t ^ (e | ~n);
}
const ya = /* @__PURE__ */ new Uint32Array(16);
class sE extends Qd {
  constructor() {
    super(64, 20, 8, !0), this.h0 = 1732584193, this.h1 = -271733879, this.h2 = -1732584194, this.h3 = 271733878, this.h4 = -1009589776;
  }
  get() {
    const { h0: t, h1: e, h2: n, h3: s, h4: i } = this;
    return [t, e, n, s, i];
  }
  set(t, e, n, s, i) {
    this.h0 = t | 0, this.h1 = e | 0, this.h2 = n | 0, this.h3 = s | 0, this.h4 = i | 0;
  }
  process(t, e) {
    for (let R = 0; R < 16; R++, e += 4)
      ya[R] = t.getUint32(e, !0);
    let n = this.h0 | 0, s = n, i = this.h1 | 0, a = i, o = this.h2 | 0, d = o, h = this.h3 | 0, f = h, g = this.h4 | 0, y = g;
    for (let R = 0; R < 5; R++) {
      const Q = 4 - R, x = rE[R], N = nE[R], U = Md[R], H = Pd[R], X = tE[R], P = eE[R];
      for (let M = 0; M < 16; M++) {
        const O = It(n + nl(R, i, o, h) + ya[U[M]] + x, X[M]) + g | 0;
        n = g, g = h, h = It(o, 10) | 0, o = i, i = O;
      }
      for (let M = 0; M < 16; M++) {
        const O = It(s + nl(Q, a, d, f) + ya[H[M]] + N, P[M]) + y | 0;
        s = y, y = f, f = It(d, 10) | 0, d = a, a = O;
      }
    }
    this.set(this.h1 + o + f | 0, this.h2 + h + y | 0, this.h3 + g + s | 0, this.h4 + n + a | 0, this.h0 + i + d | 0);
  }
  roundClean() {
    ya.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer.fill(0), this.set(0, 0, 0, 0, 0);
  }
}
const iE = /* @__PURE__ */ Co(() => new sE()), [aE, oE] = gt.split([
  "0x428a2f98d728ae22",
  "0x7137449123ef65cd",
  "0xb5c0fbcfec4d3b2f",
  "0xe9b5dba58189dbbc",
  "0x3956c25bf348b538",
  "0x59f111f1b605d019",
  "0x923f82a4af194f9b",
  "0xab1c5ed5da6d8118",
  "0xd807aa98a3030242",
  "0x12835b0145706fbe",
  "0x243185be4ee4b28c",
  "0x550c7dc3d5ffb4e2",
  "0x72be5d74f27b896f",
  "0x80deb1fe3b1696b1",
  "0x9bdc06a725c71235",
  "0xc19bf174cf692694",
  "0xe49b69c19ef14ad2",
  "0xefbe4786384f25e3",
  "0x0fc19dc68b8cd5b5",
  "0x240ca1cc77ac9c65",
  "0x2de92c6f592b0275",
  "0x4a7484aa6ea6e483",
  "0x5cb0a9dcbd41fbd4",
  "0x76f988da831153b5",
  "0x983e5152ee66dfab",
  "0xa831c66d2db43210",
  "0xb00327c898fb213f",
  "0xbf597fc7beef0ee4",
  "0xc6e00bf33da88fc2",
  "0xd5a79147930aa725",
  "0x06ca6351e003826f",
  "0x142929670a0e6e70",
  "0x27b70a8546d22ffc",
  "0x2e1b21385c26c926",
  "0x4d2c6dfc5ac42aed",
  "0x53380d139d95b3df",
  "0x650a73548baf63de",
  "0x766a0abb3c77b2a8",
  "0x81c2c92e47edaee6",
  "0x92722c851482353b",
  "0xa2bfe8a14cf10364",
  "0xa81a664bbc423001",
  "0xc24b8b70d0f89791",
  "0xc76c51a30654be30",
  "0xd192e819d6ef5218",
  "0xd69906245565a910",
  "0xf40e35855771202a",
  "0x106aa07032bbd1b8",
  "0x19a4c116b8d2d0c8",
  "0x1e376c085141ab53",
  "0x2748774cdf8eeb99",
  "0x34b0bcb5e19b48a8",
  "0x391c0cb3c5c95a63",
  "0x4ed8aa4ae3418acb",
  "0x5b9cca4f7763e373",
  "0x682e6ff3d6b2b8a3",
  "0x748f82ee5defb2fc",
  "0x78a5636f43172f60",
  "0x84c87814a1f0ab72",
  "0x8cc702081a6439ec",
  "0x90befffa23631e28",
  "0xa4506cebde82bde9",
  "0xbef9a3f7b2c67915",
  "0xc67178f2e372532b",
  "0xca273eceea26619c",
  "0xd186b8c721c0c207",
  "0xeada7dd6cde0eb1e",
  "0xf57d4f7fee6ed178",
  "0x06f067aa72176fba",
  "0x0a637dc5a2c898a6",
  "0x113f9804bef90dae",
  "0x1b710b35131c471b",
  "0x28db77f523047d84",
  "0x32caab7b40c72493",
  "0x3c9ebe0a15c9bebc",
  "0x431d67c49c100d4c",
  "0x4cc5d4becb3e42b6",
  "0x597f299cfc657e2a",
  "0x5fcb6fab3ad6faec",
  "0x6c44198c4a475817"
].map((r) => BigInt(r))), Xr = /* @__PURE__ */ new Uint32Array(80), Hr = /* @__PURE__ */ new Uint32Array(80);
class cE extends Qd {
  constructor() {
    super(128, 64, 16, !1), this.Ah = 1779033703, this.Al = -205731576, this.Bh = -1150833019, this.Bl = -2067093701, this.Ch = 1013904242, this.Cl = -23791573, this.Dh = -1521486534, this.Dl = 1595750129, this.Eh = 1359893119, this.El = -1377402159, this.Fh = -1694144372, this.Fl = 725511199, this.Gh = 528734635, this.Gl = -79577749, this.Hh = 1541459225, this.Hl = 327033209;
  }
  // prettier-ignore
  get() {
    const { Ah: t, Al: e, Bh: n, Bl: s, Ch: i, Cl: a, Dh: o, Dl: d, Eh: h, El: f, Fh: g, Fl: y, Gh: R, Gl: Q, Hh: x, Hl: N } = this;
    return [t, e, n, s, i, a, o, d, h, f, g, y, R, Q, x, N];
  }
  // prettier-ignore
  set(t, e, n, s, i, a, o, d, h, f, g, y, R, Q, x, N) {
    this.Ah = t | 0, this.Al = e | 0, this.Bh = n | 0, this.Bl = s | 0, this.Ch = i | 0, this.Cl = a | 0, this.Dh = o | 0, this.Dl = d | 0, this.Eh = h | 0, this.El = f | 0, this.Fh = g | 0, this.Fl = y | 0, this.Gh = R | 0, this.Gl = Q | 0, this.Hh = x | 0, this.Hl = N | 0;
  }
  process(t, e) {
    for (let X = 0; X < 16; X++, e += 4)
      Xr[X] = t.getUint32(e), Hr[X] = t.getUint32(e += 4);
    for (let X = 16; X < 80; X++) {
      const P = Xr[X - 15] | 0, M = Hr[X - 15] | 0, O = gt.rotrSH(P, M, 1) ^ gt.rotrSH(P, M, 8) ^ gt.shrSH(P, M, 7), k = gt.rotrSL(P, M, 1) ^ gt.rotrSL(P, M, 8) ^ gt.shrSL(P, M, 7), G = Xr[X - 2] | 0, z = Hr[X - 2] | 0, j = gt.rotrSH(G, z, 19) ^ gt.rotrBH(G, z, 61) ^ gt.shrSH(G, z, 6), Z = gt.rotrSL(G, z, 19) ^ gt.rotrBL(G, z, 61) ^ gt.shrSL(G, z, 6), $ = gt.add4L(k, Z, Hr[X - 7], Hr[X - 16]), v = gt.add4H($, O, j, Xr[X - 7], Xr[X - 16]);
      Xr[X] = v | 0, Hr[X] = $ | 0;
    }
    let { Ah: n, Al: s, Bh: i, Bl: a, Ch: o, Cl: d, Dh: h, Dl: f, Eh: g, El: y, Fh: R, Fl: Q, Gh: x, Gl: N, Hh: U, Hl: H } = this;
    for (let X = 0; X < 80; X++) {
      const P = gt.rotrSH(g, y, 14) ^ gt.rotrSH(g, y, 18) ^ gt.rotrBH(g, y, 41), M = gt.rotrSL(g, y, 14) ^ gt.rotrSL(g, y, 18) ^ gt.rotrBL(g, y, 41), O = g & R ^ ~g & x, k = y & Q ^ ~y & N, G = gt.add5L(H, M, k, oE[X], Hr[X]), z = gt.add5H(G, U, P, O, aE[X], Xr[X]), j = G | 0, Z = gt.rotrSH(n, s, 28) ^ gt.rotrBH(n, s, 34) ^ gt.rotrBH(n, s, 39), $ = gt.rotrSL(n, s, 28) ^ gt.rotrBL(n, s, 34) ^ gt.rotrBL(n, s, 39), v = n & i ^ n & o ^ i & o, u = s & a ^ s & d ^ a & d;
      U = x | 0, H = N | 0, x = R | 0, N = Q | 0, R = g | 0, Q = y | 0, { h: g, l: y } = gt.add(h | 0, f | 0, z | 0, j | 0), h = o | 0, f = d | 0, o = i | 0, d = a | 0, i = n | 0, a = s | 0;
      const A = gt.add3L(j, $, u);
      n = gt.add3H(A, z, Z, v), s = A | 0;
    }
    ({ h: n, l: s } = gt.add(this.Ah | 0, this.Al | 0, n | 0, s | 0)), { h: i, l: a } = gt.add(this.Bh | 0, this.Bl | 0, i | 0, a | 0), { h: o, l: d } = gt.add(this.Ch | 0, this.Cl | 0, o | 0, d | 0), { h, l: f } = gt.add(this.Dh | 0, this.Dl | 0, h | 0, f | 0), { h: g, l: y } = gt.add(this.Eh | 0, this.El | 0, g | 0, y | 0), { h: R, l: Q } = gt.add(this.Fh | 0, this.Fl | 0, R | 0, Q | 0), { h: x, l: N } = gt.add(this.Gh | 0, this.Gl | 0, x | 0, N | 0), { h: U, l: H } = gt.add(this.Hh | 0, this.Hl | 0, U | 0, H | 0), this.set(n, s, i, a, o, d, h, f, g, y, R, Q, x, N, U, H);
  }
  roundClean() {
    Xr.fill(0), Hr.fill(0);
  }
  destroy() {
    this.buffer.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const ep = /* @__PURE__ */ Co(() => new cE());
var dE = Object.defineProperty, Ge = (r, t) => dE(r, "name", { value: t, configurable: !0 }), uE = /* @__PURE__ */ Ge((r) => {
  const { password: t, salt: e, n, p: s, r: i, dklen: a } = r;
  return BI(t, e, { N: n, r: i, p: s, dkLen: a });
}, "scrypt"), hE = /* @__PURE__ */ Ge((r) => qI(r), "keccak256");
function rp(r) {
  const t = J(r, "data");
  return iE(t);
}
Ge(rp, "ripemd160");
var es = /* @__PURE__ */ Ge((r, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextEncoder().encode(r);
    case "base64": {
      const e = atob(r), n = e.length;
      return new Uint8Array(n).map((i, a) => e.charCodeAt(a));
    }
    case "hex":
    default: {
      const e = r.length / 2;
      return new Uint8Array(e).map((s, i) => {
        const a = i * 2;
        return parseInt(r.substring(a, a + 2), 16);
      });
    }
  }
}, "bufferFromString"), np = /* @__PURE__ */ Ge((r, t, e, n, s) => {
  const i = { sha256: sn, sha512: ep }[s];
  return W(Fd(i, r, t, { c: e, dkLen: n }));
}, "pbkdf2"), { crypto: Aa, btoa: sp } = globalThis;
if (!Aa)
  throw new B(
    L.ENV_DEPENDENCY_MISSING,
    "Could not find 'crypto' in current browser environment."
  );
if (!sp)
  throw new B(
    L.ENV_DEPENDENCY_MISSING,
    "Could not find 'btoa' in current browser environment."
  );
var Kc = /* @__PURE__ */ Ge((r) => Aa.getRandomValues(new Uint8Array(r)), "randomBytes"), Sa = /* @__PURE__ */ Ge((r, t = "base64") => {
  switch (t) {
    case "utf-8":
      return new TextDecoder().decode(r);
    case "base64": {
      const e = String.fromCharCode.apply(null, new Uint8Array(r));
      return sp(e);
    }
    case "hex":
    default: {
      let e = "";
      for (let n = 0; n < r.length; n += 1) {
        const s = r[n].toString(16);
        e += s.length === 1 ? `0${s}` : s;
      }
      return e;
    }
  }
}, "stringFromBuffer"), ip = "AES-CTR", Ld = /* @__PURE__ */ Ge((r, t) => {
  const e = es(String(r).normalize("NFKC"), "utf-8"), n = np(e, t, 1e5, 32, "sha256");
  return J(n);
}, "keyFromPassword"), AE = /* @__PURE__ */ Ge(async (r, t) => {
  const e = Kc(16), n = Kc(32), s = Ld(r, n), i = JSON.stringify(t), a = es(i, "utf-8"), o = {
    name: ip,
    counter: e,
    length: 64
  }, d = await crypto.subtle.importKey("raw", s, o, !1, ["encrypt"]), h = await crypto.subtle.encrypt(o, d, a);
  return {
    data: Sa(new Uint8Array(h)),
    iv: Sa(e),
    salt: Sa(n)
  };
}, "encrypt"), lE = /* @__PURE__ */ Ge(async (r, t) => {
  const e = es(t.iv), n = es(t.salt), s = Ld(r, n), i = es(t.data), a = {
    name: ip,
    counter: e,
    length: 64
  }, o = await crypto.subtle.importKey("raw", s, a, !1, ["decrypt"]), d = await crypto.subtle.decrypt(a, o, i), h = new TextDecoder().decode(d);
  try {
    return JSON.parse(h);
  } catch {
    throw new B(L.INVALID_CREDENTIALS, "Invalid credentials.");
  }
}, "decrypt"), _E = /* @__PURE__ */ Ge(async (r, t, e) => {
  const n = Aa.subtle, s = new Uint8Array(t.subarray(0, 16)), i = e, a = r, o = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await n.encrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    o,
    a
  );
  return new Uint8Array(d);
}, "encryptJsonWalletData"), pE = /* @__PURE__ */ Ge(async (r, t, e) => {
  const n = Aa.subtle, s = new Uint8Array(t.subarray(0, 16)).buffer, i = new Uint8Array(e).buffer, a = new Uint8Array(r).buffer, o = await n.importKey(
    "raw",
    s,
    { name: "AES-CTR", length: 128 },
    !1,
    ["encrypt", "decrypt"]
  ), d = await n.decrypt(
    { name: "AES-CTR", counter: i, length: 128 },
    o,
    a
  );
  return new Uint8Array(d);
}, "decryptJsonWalletData"), fE = /* @__PURE__ */ Ge((r, t, e) => {
  const n = r === "sha256" ? sn : ep, s = Bo.create(n, t).update(e).digest();
  return W(s);
}, "computeHmac"), gE = /* @__PURE__ */ Ge(() => Aa.randomUUID(), "randomUUID"), wE = {
  bufferFromString: es,
  stringFromBuffer: Sa,
  decrypt: lE,
  encrypt: AE,
  keyFromPassword: Ld,
  randomBytes: Kc,
  scrypt: uE,
  keccak256: hE,
  decryptJsonWalletData: pE,
  encryptJsonWalletData: _E,
  computeHmac: fE,
  pbkdf2: np,
  ripemd160: rp,
  randomUUID: gE
}, mE = wE, {
  bufferFromString: _n,
  decrypt: yE,
  encrypt: bE,
  keyFromPassword: $2,
  randomBytes: er,
  stringFromBuffer: Xi,
  scrypt: ap,
  keccak256: op,
  decryptJsonWalletData: IE,
  encryptJsonWalletData: EE,
  pbkdf2: CE,
  computeHmac: cp,
  ripemd160: BE,
  randomUUID: vE
} = mE, xE = Object.defineProperty, vo = (r, t) => xE(r, "name", { value: t, configurable: !0 }), RE = `Fuel Signed Message:
`;
function zt(r) {
  return W(sn(J(r)));
}
vo(zt, "sha256");
function _r(r) {
  return zt(r);
}
vo(_r, "hash");
function dp(r) {
  const t = BigInt(r), e = new ArrayBuffer(8), n = new DataView(e);
  return n.setBigUint64(0, t, !1), new Uint8Array(n.buffer);
}
vo(dp, "uint64ToBytesBE");
function up(r) {
  if (typeof r == "string")
    return zt(Ar(r));
  const { personalSign: t } = r, e = typeof t == "string" ? Ar(t) : t, n = ct([
    Ar(RE),
    Ar(String(e.length)),
    e
  ]);
  return W(zt(n));
}
vo(up, "hashMessage");
var SE = Object.defineProperty, pt = (r, t) => SE(r, "name", { value: t, configurable: !0 }), rs, yt = (rs = class {
  constructor(t, e, n) {
    D(this, "name");
    D(this, "type");
    D(this, "encodedLength");
    this.name = t, this.type = e, this.encodedLength = n;
  }
}, pt(rs, "Coder"), rs), TE = "u8", NE = "u16", DE = "u32", FE = "u64", QE = "u256", OE = "raw untyped ptr", ME = "raw untyped slice", PE = "bool", LE = "b256", kE = "struct std::b512::B512", so = "enum std::option::Option", UE = "struct std::vec::Vec", GE = "struct std::bytes::Bytes", zE = "struct std::string::String", XE = "str", la = "()", hp = /^enum (std::option::)?Option$/m, Ap = /^str\[(?<length>[0-9]+)\]/, td = /^\[(?<item>[\w\s\\[\]]+);\s*(?<length>[0-9]+)\]/, lp = /^struct.+/, _p = /^enum.+$/, HE = /^\((?<items>.*)\)$/, VE = /^generic.+$/, WE = /([^\s]+)$/m, yi = "1", At = 8, kr = 32, io = kr + 2, Ki = kr, ed = kr, YE = kr, jE = At * 4, ZE = At * 2, pp = 2 ** 32 - 1, fp = /* @__PURE__ */ pt(({ maxInputs: r }) => kr + // Tx ID
Ki + // Base asset ID
// Asset ID/Balance coin input pairs
r * (Ki + At) + At, "calculateVmTxMemory"), gp = At + // Identifier
At + // Gas limit
At + // Script size
At + // Script data size
At + // Policies
At + // Inputs size
At + // Outputs size
At + // Witnesses size
kr, K2 = At + // Identifier
jE + // Utxo Length
At + // Output Index
YE + // Owner
At + // Amount
Ki + // Asset id
ZE + // TxPointer
At + // Witnesses index
At + // Predicate size
At + // Predicate data size
At, sl = /* @__PURE__ */ pt((r) => r instanceof Uint8Array, "isUint8Array"), Si = /* @__PURE__ */ pt((r) => {
  const t = Array.isArray(r) ? r : Object.values(r);
  for (const e of t)
    if (e.type === so || "coder" in e && e.coder.type === so || "coders" in e && Si(e.coders))
      return !0;
  return !1;
}, "hasNestedOption"), sa, ns, mt = (ns = class extends yt {
  constructor(e, n) {
    super("array", `[${e.type}; ${n}]`, n * e.encodedLength);
    D(this, "coder");
    D(this, "length");
    Ie(this, sa);
    this.coder = e, this.length = n, Ut(this, sa, Si([e]));
  }
  encode(e) {
    if (!Array.isArray(e))
      throw new B(L.ENCODE_ERROR, "Expected array value.");
    if (this.length !== e.length)
      throw new B(L.ENCODE_ERROR, "Types/values length mismatch.");
    return ct(Array.from(e).map((n) => this.coder.encode(n)));
  }
  decode(e, n) {
    if (!ht(this, sa) && e.length < this.encodedLength || e.length > pp)
      throw new B(L.DECODE_ERROR, "Invalid array data size.");
    let s = n;
    return [Array(this.length).fill(0).map(() => {
      let a;
      return [a, s] = this.coder.decode(e, s), a;
    }), s];
  }
}, sa = new WeakMap(), pt(ns, "ArrayCoder"), ns), ss, ot = (ss = class extends yt {
  constructor() {
    super("b256", "b256", At * 4);
  }
  encode(t) {
    let e;
    try {
      e = J(t);
    } catch {
      throw new B(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (e.length !== this.encodedLength)
      throw new B(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    return e;
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid b256 data size.");
    let n = t.slice(e, e + this.encodedLength);
    if (E(n).isZero() && (n = new Uint8Array(32)), n.length !== this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid b256 byte data size.");
    return [go(n, 32), e + 32];
  }
}, pt(ss, "B256Coder"), ss), is, JE = (is = class extends yt {
  constructor() {
    super("b512", "struct B512", At * 8);
  }
  encode(t) {
    let e;
    try {
      e = J(t);
    } catch {
      throw new B(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    if (e.length !== this.encodedLength)
      throw new B(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    return e;
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid b512 data size.");
    let n = t.slice(e, e + this.encodedLength);
    if (E(n).isZero() && (n = new Uint8Array(64)), n.length !== this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid b512 byte data size.");
    return [go(n, this.encodedLength), e + this.encodedLength];
  }
}, pt(is, "B512Coder"), is), qE = {
  u64: At,
  u256: At * 4
}, as, rt = (as = class extends yt {
  constructor(t) {
    super("bigNumber", t, qE[t]);
  }
  encode(t) {
    let e;
    if (typeof t == "number" && t > Number.MAX_SAFE_INTEGER)
      throw new B(
        L.ENCODE_ERROR,
        `Invalid ${this.type} type - number value is too large. Number can only safely handle up to 53 bits.`
      );
    try {
      e = Ir(t, this.encodedLength);
    } catch {
      throw new B(L.ENCODE_ERROR, `Invalid ${this.type}.`);
    }
    return e;
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, `Invalid ${this.type} data size.`);
    let n = t.slice(e, e + this.encodedLength);
    if (n = n.slice(0, this.encodedLength), n.length !== this.encodedLength)
      throw new B(L.DECODE_ERROR, `Invalid ${this.type} byte data size.`);
    return [E(n), e + this.encodedLength];
  }
}, pt(as, "BigNumberCoder"), as), os, $E = (os = class extends yt {
  constructor(e = {
    padToWordSize: !1
  }) {
    const n = e.padToWordSize ? At : 1;
    super("boolean", "boolean", n);
    D(this, "options");
    this.options = e;
  }
  encode(e) {
    if (!(e === !0 || e === !1))
      throw new B(L.ENCODE_ERROR, "Invalid boolean value.");
    return Ir(e ? 1 : 0, this.encodedLength);
  }
  decode(e, n) {
    if (e.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid boolean data size.");
    const s = E(e.slice(n, n + this.encodedLength));
    if (s.isZero())
      return [!1, n + this.encodedLength];
    if (!s.eq(E(1)))
      throw new B(L.DECODE_ERROR, "Invalid boolean value.");
    return [!0, n + this.encodedLength];
  }
}, pt(os, "BooleanCoder"), os), mn, KE = (mn = class extends yt {
  constructor() {
    super("struct", "struct Bytes", At);
  }
  encode(t) {
    const e = t instanceof Uint8Array ? t : new Uint8Array(t), n = new rt("u64").encode(e.length);
    return new Uint8Array([...n, ...e]);
  }
  decode(t, e) {
    if (t.length < At)
      throw new B(L.DECODE_ERROR, "Invalid byte data size.");
    const n = e + At, s = t.slice(e, n), i = E(new rt("u64").decode(s, 0)[0]).toNumber(), a = t.slice(n, n + i);
    if (a.length !== i)
      throw new B(L.DECODE_ERROR, "Invalid bytes byte data size.");
    return [a, n + i];
  }
}, pt(mn, "ByteCoder"), D(mn, "memorySize", 1), mn), yn, ia, cs, nn, mp, yp, bp, ds, wp = (ds = class extends yt {
  constructor(e, n) {
    const s = new rt("u64"), i = Object.values(n).reduce(
      (a, o) => Math.min(a, o.encodedLength),
      0
    );
    super(`enum ${e}`, `enum ${e}`, s.encodedLength + i);
    Ie(this, nn);
    D(this, "name");
    D(this, "coders");
    Ie(this, yn);
    Ie(this, ia);
    Ie(this, cs);
    this.name = e, this.coders = n, Ut(this, yn, s), Ut(this, ia, i), Ut(this, cs, !(hp.test(this.type) || Si(n)));
  }
  encode(e) {
    if (typeof e == "string" && this.coders[e])
      return an(this, nn, yp).call(this, e);
    const [n, ...s] = Object.keys(e);
    if (!n)
      throw new B(L.INVALID_DECODE_VALUE, "A field for the case must be provided.");
    if (s.length !== 0)
      throw new B(L.INVALID_DECODE_VALUE, "Only one field must be provided.");
    const i = this.coders[n], a = Object.keys(this.coders).indexOf(n);
    if (a === -1) {
      const d = Object.keys(this.coders).map((h) => `'${h}'`).join(", ");
      throw new B(
        L.INVALID_DECODE_VALUE,
        `Invalid case '${n}'. Valid cases: ${d}.`
      );
    }
    const o = i.encode(e[n]);
    return new Uint8Array([...ht(this, yn).encode(a), ...o]);
  }
  decode(e, n) {
    if (ht(this, cs) && e.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid enum data size.");
    const s = new rt("u64").decode(e, n)[0], i = Pr(s), a = Object.keys(this.coders)[i];
    if (!a)
      throw new B(
        L.INVALID_DECODE_VALUE,
        `Invalid caseIndex "${i}". Valid cases: ${Object.keys(this.coders)}.`
      );
    const o = this.coders[a], d = n + ht(this, yn).encodedLength;
    if (ht(this, cs) && e.length < d + o.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid enum data size.");
    const [h, f] = o.decode(e, d);
    return an(this, nn, mp).call(this, this.coders[a]) ? an(this, nn, bp).call(this, a, f) : [{ [a]: h }, f];
  }
}, yn = new WeakMap(), ia = new WeakMap(), cs = new WeakMap(), nn = new WeakSet(), // Checks that we're handling a native enum that is of type void.
mp = function(e) {
  return this.type !== so && e.type === la;
}, yp = function(e) {
  const n = this.coders[e], s = n.encode([]), i = Object.keys(this.coders).indexOf(e), a = new Uint8Array(ht(this, ia) - n.encodedLength);
  return ct([ht(this, yn).encode(i), a, s]);
}, bp = function(e, n) {
  return [e, n];
}, pt(ds, "EnumCoder"), ds), tC = /* @__PURE__ */ pt((r) => {
  switch (r) {
    case "u8":
      return 1;
    case "u16":
      return 2;
    case "u32":
      return 4;
    default:
      throw new B(L.TYPE_NOT_SUPPORTED, `Invalid number type: ${r}`);
  }
}, "getLength"), us, K = (us = class extends yt {
  constructor(e, n = {
    padToWordSize: !1
  }) {
    const s = n.padToWordSize ? At : tC(e);
    super("number", e, s);
    D(this, "baseType");
    D(this, "options");
    this.baseType = e, this.options = n;
  }
  encode(e) {
    let n;
    try {
      n = Ir(e);
    } catch {
      throw new B(L.ENCODE_ERROR, `Invalid ${this.baseType}.`);
    }
    if (n.length > this.encodedLength)
      throw new B(L.ENCODE_ERROR, `Invalid ${this.baseType}, too many bytes.`);
    return Ir(n, this.encodedLength);
  }
  decode(e, n) {
    if (e.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid number data size.");
    const s = e.slice(n, n + this.encodedLength);
    if (s.length !== this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid number byte data size.");
    return [Pr(s), n + this.encodedLength];
  }
}, pt(us, "NumberCoder"), us), hs, Ip = (hs = class extends wp {
  encode(t) {
    return super.encode(this.toSwayOption(t));
  }
  toSwayOption(t) {
    return t !== void 0 ? { Some: t } : { None: [] };
  }
  decode(t, e) {
    const [n, s] = super.decode(t, e);
    return [this.toOption(n), s];
  }
  toOption(t) {
    if (t && "Some" in t)
      return t.Some;
  }
}, pt(hs, "OptionCoder"), hs), As, eC = (As = class extends yt {
  constructor() {
    super("raw untyped slice", "raw untyped slice", At);
  }
  encode(t) {
    if (!Array.isArray(t))
      throw new B(L.ENCODE_ERROR, "Expected array value.");
    const n = new mt(new K("u8"), t.length).encode(t), s = new rt("u64").encode(n.length);
    return new Uint8Array([...s, ...n]);
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid raw slice data size.");
    const n = e + At, s = t.slice(e, n), i = E(new rt("u64").decode(s, 0)[0]).toNumber(), a = t.slice(n, n + i);
    if (a.length !== i)
      throw new B(L.DECODE_ERROR, "Invalid raw slice byte data size.");
    const o = new mt(new K("u8"), i), [d] = o.decode(a, 0);
    return [d, n + i];
  }
}, pt(As, "RawSliceCoder"), As), bn, kd = (bn = class extends yt {
  constructor() {
    super("struct", "struct String", At);
  }
  encode(t) {
    const e = Ar(t), n = new rt("u64").encode(t.length);
    return new Uint8Array([...n, ...e]);
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid std string data size.");
    const n = e + At, s = t.slice(e, n), i = E(new rt("u64").decode(s, 0)[0]).toNumber(), a = t.slice(n, n + i);
    if (a.length !== i)
      throw new B(L.DECODE_ERROR, "Invalid std string byte data size.");
    return [Io(a), n + i];
  }
}, pt(bn, "StdStringCoder"), D(bn, "memorySize", 1), bn), In, rC = (In = class extends yt {
  constructor() {
    super("strSlice", "str", At);
  }
  encode(t) {
    const e = Ar(t), n = new rt("u64").encode(t.length);
    return new Uint8Array([...n, ...e]);
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid string slice data size.");
    const n = e + At, s = t.slice(e, n), i = E(new rt("u64").decode(s, 0)[0]).toNumber(), a = t.slice(n, n + i);
    if (a.length !== i)
      throw new B(L.DECODE_ERROR, "Invalid string slice byte data size.");
    return [Io(a), n + i];
  }
}, pt(In, "StrSliceCoder"), D(In, "memorySize", 1), In), ls, nC = (ls = class extends yt {
  constructor(t) {
    super("string", `str[${t}]`, t);
  }
  encode(t) {
    if (t.length !== this.encodedLength)
      throw new B(L.ENCODE_ERROR, "Value length mismatch during encode.");
    return Ar(t);
  }
  decode(t, e) {
    if (t.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid string data size.");
    const n = t.slice(e, e + this.encodedLength);
    if (n.length !== this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid string byte data size.");
    return [Io(n), e + this.encodedLength];
  }
}, pt(ls, "StringCoder"), ls), aa, _s, xo = (_s = class extends yt {
  constructor(e, n) {
    const s = Object.values(n).reduce(
      (i, a) => i + a.encodedLength,
      0
    );
    super("struct", `struct ${e}`, s);
    D(this, "name");
    D(this, "coders");
    Ie(this, aa);
    this.name = e, this.coders = n, Ut(this, aa, Si(n));
  }
  encode(e) {
    return yo(
      Object.keys(this.coders).map((n) => {
        const s = this.coders[n], i = e[n];
        if (!(s instanceof Ip) && i == null)
          throw new B(
            L.ENCODE_ERROR,
            `Invalid ${this.type}. Field "${n}" not present.`
          );
        return s.encode(i);
      })
    );
  }
  decode(e, n) {
    if (!ht(this, aa) && e.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid struct data size.");
    let s = n;
    return [Object.keys(this.coders).reduce((a, o) => {
      const d = this.coders[o];
      let h;
      return [h, s] = d.decode(e, s), a[o] = h, a;
    }, {}), s];
  }
}, aa = new WeakMap(), pt(_s, "StructCoder"), _s), oa, ps, Ep = (ps = class extends yt {
  constructor(e) {
    const n = e.reduce((s, i) => s + i.encodedLength, 0);
    super("tuple", `(${e.map((s) => s.type).join(", ")})`, n);
    D(this, "coders");
    Ie(this, oa);
    this.coders = e, Ut(this, oa, Si(e));
  }
  encode(e) {
    if (this.coders.length !== e.length)
      throw new B(L.ENCODE_ERROR, "Types/values length mismatch.");
    return yo(this.coders.map((n, s) => n.encode(e[s])));
  }
  decode(e, n) {
    if (!ht(this, oa) && e.length < this.encodedLength)
      throw new B(L.DECODE_ERROR, "Invalid tuple data size.");
    let s = n;
    return [this.coders.map((a) => {
      let o;
      return [o, s] = a.decode(e, s), o;
    }), s];
  }
}, oa = new WeakMap(), pt(ps, "TupleCoder"), ps), fs, gs, sC = (gs = class extends yt {
  constructor(e) {
    super("struct", "struct Vec", At);
    D(this, "coder");
    Ie(this, fs);
    this.coder = e, Ut(this, fs, Si([e]));
  }
  encode(e) {
    if (!Array.isArray(e) && !sl(e))
      throw new B(
        L.ENCODE_ERROR,
        "Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array."
      );
    const n = new rt("u64");
    if (sl(e))
      return new Uint8Array([...n.encode(e.length), ...e]);
    const s = e.map((a) => this.coder.encode(a)), i = n.encode(e.length);
    return new Uint8Array([...i, ...yo(s)]);
  }
  decode(e, n) {
    if (!ht(this, fs) && e.length < this.encodedLength || e.length > pp)
      throw new B(L.DECODE_ERROR, "Invalid vec data size.");
    const s = n + At, i = e.slice(n, s), a = E(new rt("u64").decode(i, 0)[0]).toNumber(), o = a * this.coder.encodedLength, d = e.slice(s, s + o);
    if (!ht(this, fs) && d.length !== o)
      throw new B(L.DECODE_ERROR, "Invalid vec byte data size.");
    let h = s;
    const f = [];
    for (let g = 0; g < a; g++) {
      const [y, R] = this.coder.decode(e, h);
      f.push(y), h = R;
    }
    return [f, h];
  }
}, fs = new WeakMap(), pt(gs, "VecCoder"), gs), Cp = /* @__PURE__ */ pt((r) => {
  switch (r) {
    case void 0:
    case yi:
      return yi;
    default:
      throw new B(
        L.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version '${r}' is unsupported.`
      );
  }
}, "getEncodingVersion"), ji = /* @__PURE__ */ pt((r, t) => {
  const e = r.types.find((n) => n.typeId === t);
  if (!e)
    throw new B(
      L.TYPE_NOT_FOUND,
      `Type with typeId '${t}' doesn't exist in the ABI.`
    );
  return e;
}, "findTypeById"), iC = /* @__PURE__ */ pt((r, t) => t.filter((e) => ji(r, e.type).type !== la), "findNonVoidInputs"), aC = /* @__PURE__ */ pt((r) => {
  var n;
  const t = r.find((s) => s.name === "buf"), e = (n = t == null ? void 0 : t.originalTypeArguments) == null ? void 0 : n[0];
  if (!t || !e)
    throw new B(
      L.INVALID_COMPONENT,
      "The Vec type provided is missing or has a malformed 'buf' component."
    );
  return e;
}, "findVectorBufferArgument"), ur, Ud = (ur = class {
  constructor(t, e) {
    D(this, "abi");
    D(this, "name");
    D(this, "type");
    D(this, "originalTypeArguments");
    D(this, "components");
    this.abi = t, this.name = e.name;
    const n = ji(t, e.type);
    if (n.type.length > 256)
      throw new B(
        L.INVALID_COMPONENT,
        `The provided ABI type is too long: ${n.type}.`
      );
    this.type = n.type, this.originalTypeArguments = e.typeArguments, this.components = ur.getResolvedGenericComponents(
      t,
      e,
      n.components,
      n.typeParameters ?? ur.getImplicitGenericTypeParameters(t, n.components)
    );
  }
  static getResolvedGenericComponents(t, e, n, s) {
    if (n === null)
      return null;
    if (s === null || s.length === 0)
      return n.map((o) => new ur(t, o));
    const i = s.reduce(
      (o, d, h) => {
        var g;
        const f = { ...o };
        return f[d] = structuredClone(
          (g = e.typeArguments) == null ? void 0 : g[h]
        ), f;
      },
      {}
    );
    return this.resolveGenericArgTypes(
      t,
      n,
      i
    ).map((o) => new ur(t, o));
  }
  static resolveGenericArgTypes(t, e, n) {
    return e.map((s) => {
      if (n[s.type] !== void 0)
        return {
          ...n[s.type],
          name: s.name
        };
      if (s.typeArguments)
        return {
          ...structuredClone(s),
          typeArguments: this.resolveGenericArgTypes(
            t,
            s.typeArguments,
            n
          )
        };
      const i = ji(t, s.type), a = this.getImplicitGenericTypeParameters(t, i.components);
      return a && a.length > 0 ? {
        ...structuredClone(s),
        typeArguments: a.map((o) => n[o])
      } : s;
    });
  }
  static getImplicitGenericTypeParameters(t, e, n) {
    if (!Array.isArray(e))
      return null;
    const s = n ?? [];
    return e.forEach((i) => {
      const a = ji(t, i.type);
      if (VE.test(a.type)) {
        s.push(a.typeId);
        return;
      }
      Array.isArray(i.typeArguments) && this.getImplicitGenericTypeParameters(t, i.typeArguments, s);
    }), s.length > 0 ? s : null;
  }
  getSignature() {
    const t = this.getArgSignaturePrefix(), e = this.getArgSignatureContent();
    return `${t}${e}`;
  }
  getArgSignaturePrefix() {
    return lp.test(this.type) ? "s" : td.test(this.type) ? "a" : _p.test(this.type) ? "e" : "";
  }
  getArgSignatureContent() {
    var i, a;
    if (this.type === "raw untyped ptr")
      return "rawptr";
    if (this.type === "raw untyped slice")
      return "rawslice";
    const t = (i = Ap.exec(this.type)) == null ? void 0 : i.groups;
    if (t)
      return `str[${t.length}]`;
    if (this.components === null)
      return this.type;
    const e = (a = td.exec(this.type)) == null ? void 0 : a.groups;
    if (e)
      return `[${this.components[0].getSignature()};${e.length}]`;
    const n = this.originalTypeArguments !== null ? `<${this.originalTypeArguments.map((o) => new ur(this.abi, o).getSignature()).join(",")}>` : "", s = `(${this.components.map((o) => o.getSignature()).join(",")})`;
    return `${n}${s}`;
  }
}, pt(ur, "ResolvedAbiType"), ur), ws, oC = (ws = class extends yt {
  constructor() {
    super("void", la, 0);
  }
  encode(t) {
    return new Uint8Array([]);
  }
  decode(t, e) {
    return [void 0, e];
  }
}, pt(ws, "VoidCoder"), ws);
function rd(r, t) {
  const { getCoder: e } = t;
  return r.reduce((n, s) => {
    const i = n;
    return i[s.name] = e(s, t), i;
  }, {});
}
pt(rd, "getCoders");
var Zn = /* @__PURE__ */ pt((r, t) => {
  var h, f, g, y;
  switch (r.type) {
    case TE:
    case NE:
    case DE:
      return new K(r.type);
    case FE:
    case OE:
      return new rt("u64");
    case QE:
      return new rt("u256");
    case ME:
      return new eC();
    case PE:
      return new $E();
    case LE:
      return new ot();
    case kE:
      return new JE();
    case GE:
      return new KE();
    case zE:
      return new kd();
    case XE:
      return new rC();
    case la:
      return new oC();
  }
  const e = (h = Ap.exec(r.type)) == null ? void 0 : h.groups;
  if (e) {
    const R = parseInt(e.length, 10);
    return new nC(R);
  }
  const n = r.components, s = (f = td.exec(r.type)) == null ? void 0 : f.groups;
  if (s) {
    const R = parseInt(s.length, 10), Q = n[0];
    if (!Q)
      throw new B(
        L.INVALID_COMPONENT,
        "The provided Array type is missing an item of 'component'."
      );
    const x = Zn(Q);
    return new mt(x, R);
  }
  if (r.type === UE) {
    const R = aC(n), Q = new Ud(r.abi, R), x = Zn(Q, { encoding: yi });
    return new sC(x);
  }
  const i = (g = r.type.match(WE)) == null ? void 0 : g[0];
  if (lp.test(r.type) && i) {
    const R = rd(n, { getCoder: Zn });
    return new xo(i, R);
  }
  if (_p.test(r.type) && i) {
    const R = rd(n, { getCoder: Zn });
    return r.type === so ? new Ip(i, R) : new wp(i, R);
  }
  if ((y = HE.exec(r.type)) == null ? void 0 : y.groups) {
    const R = n.map((Q) => Zn(Q, { encoding: yi }));
    return new Ep(R);
  }
  throw new B(
    L.CODER_NOT_FOUND,
    `Coder not found: ${JSON.stringify(r)}.`
  );
}, "getCoder");
function Bp(r = yi) {
  switch (r) {
    case yi:
      return Zn;
    default:
      throw new B(
        L.UNSUPPORTED_ENCODING_VERSION,
        `Encoding version ${r} is unsupported.`
      );
  }
}
pt(Bp, "getCoderForEncoding");
var ms, pn = (ms = class {
  static getCoder(t, e, n = {
    padToWordSize: !1
  }) {
    const s = new Ud(t, e);
    return Bp(n.encoding)(s, n);
  }
  static encode(t, e, n, s) {
    return this.getCoder(t, e, s).encode(n);
  }
  static decode(t, e, n, s, i) {
    return this.getCoder(t, e, i).decode(n, s);
  }
}, pt(ms, "AbiCoder"), ms), cC = /* @__PURE__ */ pt((r) => {
  const { jsonAbi: t, inputs: e } = r;
  let n = !1;
  return e.reduceRight((s, i) => {
    const a = ji(t, i.type);
    return n = n || a.type !== la && !hp.test(a.type), [{ ...i, isOptional: !n }, ...s];
  }, []);
}, "getFunctionInputs"), dC = /* @__PURE__ */ pt((r, t) => {
  if (r.length >= t.length)
    return r;
  const e = r.slice();
  return e.length = t.length, e.fill(void 0, r.length), e;
}, "padValuesWithUndefined"), tn, uC = (tn = class {
  constructor(t, e) {
    D(this, "signature");
    D(this, "selector");
    D(this, "selectorBytes");
    D(this, "encoding");
    D(this, "name");
    D(this, "jsonFn");
    D(this, "attributes");
    D(this, "jsonAbiOld");
    D(this, "jsonFnOld");
    this.jsonFn = e, this.jsonAbiOld = t, this.jsonFnOld = t.functions.find((n) => n.name === e.name), this.name = e.name, this.signature = tn.getSignature(this.jsonAbiOld, this.jsonFnOld), this.selector = tn.getFunctionSelector(this.signature), this.selectorBytes = new kd().encode(this.name), this.encoding = Cp(t.encoding), this.attributes = this.jsonFn.attributes ?? [];
  }
  static getSignature(t, e) {
    const n = e.inputs.map(
      (s) => new Ud(t, s).getSignature()
    );
    return `${e.name}(${n.join(",")})`;
  }
  static getFunctionSelector(t) {
    const e = zt(_n(t, "utf-8"));
    return E(e.slice(0, 10)).toHex(8);
  }
  encodeArguments(t) {
    const n = cC({ jsonAbi: this.jsonAbiOld, inputs: this.jsonFnOld.inputs }).filter((a) => !a.isOptional).length;
    if (t.length < n)
      throw new B(
        L.ABI_TYPES_AND_VALUES_MISMATCH,
        `Invalid number of arguments. Expected a minimum of ${n} arguments, received ${t.length}`
      );
    const s = this.jsonFnOld.inputs.map(
      (a) => pn.getCoder(this.jsonAbiOld, a, {
        encoding: this.encoding
      })
    ), i = dC(t, this.jsonFn.inputs);
    return new Ep(s).encode(i);
  }
  decodeArguments(t) {
    const e = J(t), n = iC(this.jsonAbiOld, this.jsonFnOld.inputs);
    if (n.length === 0) {
      if (e.length === 0)
        return;
      throw new B(
        L.DECODE_ERROR,
        `Types/values length mismatch during decode. ${JSON.stringify({
          count: {
            types: this.jsonFn.inputs.length,
            nonVoidInputs: n.length,
            values: e.length
          },
          value: {
            args: this.jsonFn.inputs,
            nonVoidInputs: n,
            values: e
          }
        })}`
      );
    }
    return this.jsonFnOld.inputs.reduce(
      (i, a) => {
        const o = pn.getCoder(this.jsonAbiOld, a, { encoding: this.encoding }), [d, h] = o.decode(e, i.offset);
        return {
          decoded: [...i.decoded, d],
          offset: h
        };
      },
      { decoded: [], offset: 0 }
    ).decoded;
  }
  decodeOutput(t) {
    const e = J(t);
    return pn.getCoder(this.jsonAbiOld, this.jsonFnOld.output, {
      encoding: this.encoding
    }).decode(e, 0);
  }
  /**
   * Checks if the function is read-only i.e. it only reads from storage, does not write to it.
   *
   * @returns True if the function is read-only or pure, false otherwise.
   */
  isReadOnly() {
    var e;
    const t = this.attributes.find((n) => n.name === "storage");
    return !((e = t == null ? void 0 : t.arguments) != null && e.includes("write"));
  }
}, pt(tn, "FunctionFragment"), tn), hC = /* @__PURE__ */ pt((r, t) => r.find((e) => e.concreteTypeId === t), "findTypeByConcreteId"), Gd = /* @__PURE__ */ pt((r, t) => r.concreteTypes.find((e) => e.concreteTypeId === t), "findConcreteTypeById");
function Ro(r, t, e) {
  const n = Gd(r, e);
  if (n.metadataTypeId !== void 0)
    return n.metadataTypeId;
  const s = hC(t, e);
  return s ? s.typeId : (t.push({
    typeId: t.length,
    type: n.type,
    components: So(n.components),
    concreteTypeId: e,
    typeParameters: n.typeParameters ?? null,
    originalConcreteTypeId: n == null ? void 0 : n.concreteTypeId
  }), t.length - 1);
}
pt(Ro, "finsertTypeIdByConcreteTypeId");
function zd(r, t, e) {
  var n;
  return ((n = e.typeArguments) == null ? void 0 : n.map((s) => {
    const i = Gd(r, s);
    return {
      name: "",
      type: isNaN(s) ? Ro(r, t, s) : s,
      // originalTypeId: cTypeId,
      typeArguments: zd(r, t, i)
    };
  })) ?? null;
}
pt(zd, "parseFunctionTypeArguments");
function fn(r, t, e, n) {
  const s = Ro(r, t, e), i = Gd(r, e);
  return {
    name: n ?? "",
    type: s,
    // concreteTypeId,
    typeArguments: zd(r, t, i)
  };
}
pt(fn, "parseConcreteType");
function So(r, t, e) {
  return (e == null ? void 0 : e.map((n) => {
    const { typeId: s, name: i, typeArguments: a } = n, o = isNaN(s) ? Ro(r, t, s) : s;
    return {
      name: i,
      type: o,
      // originalTypeId: typeId,
      typeArguments: So(r, t, a)
    };
  })) ?? null;
}
pt(So, "parseComponents");
function vp(r) {
  if (!r.specVersion)
    return r;
  const t = [];
  r.metadataTypes.forEach((a) => {
    const o = {
      typeId: a.metadataTypeId,
      type: a.type,
      components: a.components ?? (a.type === "()" ? [] : null),
      typeParameters: a.typeParameters ?? null
    };
    t.push(o);
  }), t.forEach((a) => {
    a.components = So(r, t, a.components);
  });
  const e = r.functions.map((a) => {
    const o = a.inputs.map(
      ({ concreteTypeId: h, name: f }) => fn(r, t, h, f)
    ), d = fn(r, t, a.output, "");
    return { ...a, inputs: o, output: d };
  }), n = r.configurables.map((a) => ({
    name: a.name,
    configurableType: fn(r, t, a.concreteTypeId),
    offset: a.offset
  })), s = r.loggedTypes.map((a) => ({
    logId: a.logId,
    loggedType: fn(r, t, a.concreteTypeId)
  }));
  return {
    encoding: r.encodingVersion,
    types: t,
    functions: e,
    loggedTypes: s,
    messagesTypes: r.messagesTypes,
    configurables: n
  };
}
pt(vp, "transpileAbi");
var ys, rr = (ys = class {
  constructor(t) {
    D(this, "functions");
    D(this, "configurables");
    D(this, "jsonAbi");
    D(this, "encoding");
    D(this, "jsonAbiOld");
    this.jsonAbi = t, this.encoding = Cp(t.encodingVersion), this.jsonAbiOld = vp(t), this.functions = Object.fromEntries(
      this.jsonAbi.functions.map((e) => [e.name, new uC(this.jsonAbiOld, e)])
    ), this.configurables = Object.fromEntries(this.jsonAbi.configurables.map((e) => [e.name, e]));
  }
  /**
   * Returns function fragment for a dynamic input.
   * @param nameOrSignatureOrSelector - name (e.g. 'transfer'), signature (e.g. 'transfer(address,uint256)') or selector (e.g. '0x00000000a9059cbb') of the function fragment
   */
  getFunction(t) {
    const e = Object.values(this.functions).find(
      (n) => n.name === t || n.signature === t || n.selector === t
    );
    if (e !== void 0)
      return e;
    throw new B(
      L.FUNCTION_NOT_FOUND,
      `function ${t} not found: ${JSON.stringify(e)}.`
    );
  }
  // Decode the result of a function call
  decodeFunctionResult(t, e) {
    return (typeof t == "string" ? this.getFunction(t) : t).decodeOutput(e);
  }
  decodeLog(t, e) {
    const n = this.jsonAbiOld.loggedTypes.find((s) => s.logId === e);
    if (!n)
      throw new B(
        L.LOG_TYPE_NOT_FOUND,
        `Log type with logId '${e}' doesn't exist in the ABI.`
      );
    return pn.decode(this.jsonAbiOld, n.loggedType, J(t), 0, {
      encoding: this.encoding
    });
  }
  encodeConfigurable(t, e) {
    const n = this.jsonAbiOld.configurables.find((s) => s.name === t);
    if (!n)
      throw new B(
        L.CONFIGURABLE_NOT_FOUND,
        `A configurable with the '${t}' was not found in the ABI.`
      );
    return pn.encode(this.jsonAbiOld, n.configurableType, e, {
      encoding: this.encoding
    });
  }
  encodeType(t, e) {
    const n = fn(
      this.jsonAbi,
      this.jsonAbiOld.types,
      t,
      ""
    );
    return pn.encode(this.jsonAbiOld, n, e, {
      encoding: this.encoding
    });
  }
  decodeType(t, e) {
    const n = fn(
      this.jsonAbi,
      this.jsonAbiOld.types,
      t,
      ""
    );
    return pn.decode(this.jsonAbiOld, n, e, 0, { encoding: this.encoding });
  }
}, pt(ys, "Interface"), ys), tR = /* @__PURE__ */ pt((r, t) => {
  const [e, n] = new rt("u64").decode(r, 0), [s, i] = new ot().decode(r, n), [a, o] = new ot().decode(r, i), [d, h] = new kd().decode(
    r,
    o + At + At
  ), f = r.slice(h), g = t ? new rr(t).getFunction(d).decodeArguments(f) : void 0;
  return {
    amount: e,
    assetId: s,
    contractId: a,
    functionSelector: d,
    functionArgs: g
  };
}, "decodeScriptData"), AC = Object.defineProperty, je = (r, t) => AC(r, "name", { value: t, configurable: !0 });
function Ln(r) {
  return r.length === 66 && /(0x)[0-9a-f]{64}$/i.test(r);
}
je(Ln, "isB256");
function Xd(r) {
  return r.length === 130 && /(0x)[0-9a-f]{128}$/i.test(r);
}
je(Xd, "isPublicKey");
function To(r) {
  return r.length === 42 && /(0x)[0-9a-f]{40}$/i.test(r);
}
je(To, "isEvmAddress");
function xp(r) {
  return r.toLowerCase();
}
je(xp, "normalizeB256");
function Ta(r) {
  return "b256Address" in r;
}
je(Ta, "isAddress");
var Hi = /* @__PURE__ */ je((r) => {
  if (Ta(r))
    return r;
  if ("address" in r && Ta(r.address))
    return r.address;
  if ("id" in r && Ta(r.id))
    return r.id;
  throw new B(B.CODES.INVALID_ADDRESS, "Invalid address");
}, "addressify"), lC = /* @__PURE__ */ je(() => W(er(32)), "getRandomB256"), _C = /* @__PURE__ */ je((r) => {
  try {
    if (!Ln(r))
      throw new B(B.CODES.INVALID_B256_ADDRESS, `Invalid B256 Address: ${r}.`);
    const t = J(r).slice(12), e = new Uint8Array(12).fill(0);
    return W(ct([e, t]));
  } catch {
    throw new B(
      B.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${r}.`
    );
  }
}, "toB256AddressEvm"), pC = /* @__PURE__ */ je((r) => {
  if (!To(r))
    throw new B(B.CODES.INVALID_EVM_ADDRESS, "Invalid EVM address format.");
  return r.replace("0x", "0x000000000000000000000000");
}, "padFirst12BytesOfEvmAddress"), fC = /* @__PURE__ */ je((r) => pC(r), "fromEvmAddressToB256"), Rp = /* @__PURE__ */ je((r) => {
  if (!Xd(r))
    throw new B(B.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${r}.`);
  return W(sn(J(r)));
}, "fromPublicKeyToB256"), gC = /* @__PURE__ */ je((r) => {
  if (typeof r != "string" && "toB256" in r)
    return r.toB256();
  if (Ln(r))
    return r;
  if (Xd(r))
    return Rp(r);
  if (To(r))
    return fC(r);
  throw new B(
    B.CODES.PARSE_FAILED,
    "Unknown address format: only 'B256', 'Public Key (512)', or 'EVM Address' are supported."
  );
}, "fromDynamicInputToB256"), Pe, wt = (Pe = class {
  // #endregion address-2
  /**
   * @param address - A B256 address, public key, EVM address, or Address instance
   */
  constructor(t) {
    // #region address-2
    D(this, "b256Address");
    const e = gC(t);
    this.b256Address = xp(e);
  }
  /**
   * Takes an B256 Address and returns back an checksum address.
   * The implementation follows the ERC-55 https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md.
   *
   * @returns A new `ChecksumAddress` instance
   */
  toChecksum() {
    return Pe.toChecksum(this.b256Address);
  }
  /**
   * Returns the `b256Address` property
   */
  toAddress() {
    return this.b256Address;
  }
  /**
   * Returns the B256 hash address as a string
   *
   * @returns The B256 address
   */
  toB256() {
    return this.b256Address;
  }
  /**
   * Returns the B256 hash address as a Uint8Array
   *
   * @returns The B256 address as a Uint8Array
   */
  toBytes() {
    return J(this.b256Address);
  }
  /**
   * Returns the B256 hash address as a string
   *
   * @returns The B256 address
   */
  toHexString() {
    return this.toB256();
  }
  /**
   * returns the address `checksum` as a string
   *
   * @returns The `b256Address` property as a string
   */
  toString() {
    return this.toChecksum();
  }
  /**
   * Converts and returns the `b256Address` property as a string
   * @returns The `b256Address` property as a JSON string
   */
  toJSON() {
    return this.b256Address;
  }
  /**
   * Converts to an EVM address
   *
   * @returns an {@link EvmAddress | `EvmAddress`} representation of the address
   */
  toEvmAddress() {
    return {
      bits: _C(this.b256Address)
    };
  }
  /**
   * Wraps the B256 property and returns as an `AssetId`.
   * @returns The B256 property as an {@link AssetId | `AssetId`}
   */
  toAssetId() {
    return {
      bits: this.b256Address
    };
  }
  /**
   * Wraps the B256 address `checksum` and returns it as a string
   * @returns The B256 address `checksum` as a string
   */
  valueOf() {
    return this.toChecksum();
  }
  /**
   * Compares this the `b256Address` property to another for direct equality
   * @param other - Another address to compare against
   * @returns The equality of the comparison
   */
  equals(t) {
    return this.toChecksum() === t.toChecksum();
  }
  /**
   * Takes a Public Key, hashes it, and creates an `Address`
   *
   * @param publicKey - A wallets public key
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromPublicKey(t) {
    const e = Rp(t);
    return new Pe(e);
  }
  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromB256(t) {
    if (!Ln(t))
      throw new B(
        B.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    return new Pe(t);
  }
  /**
   * Creates an `Address` with a randomized `b256Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom() {
    return new Pe(lC());
  }
  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromString(t) {
    return new Pe(t);
  }
  /**
   * Takes an ambiguous string or address and creates an `Address`
   *
   * @returns a new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromAddressOrString(t) {
    return new Pe(t);
  }
  /**
   * Takes a dynamic string or `Address` and creates an `Address`
   *
   * @param addressId - A string containing B256, or Public Key
   * @throws Error - Unknown address if the format is not recognized
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromDynamicInput(t) {
    return new Pe(t);
  }
  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromEvmAddress(t) {
    if (!To(t))
      throw new B(
        B.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${t}.`
      );
    return new Pe(t);
  }
  /**
   * Takes an ChecksumAddress and validates if it is a valid checksum address.
   *
   * @returns A `boolean` instance indicating if the address is valid.
   */
  static isChecksumValid(t) {
    let e = t;
    return t.startsWith("0x") || (e = `0x${t}`), e.trim().length !== 66 ? !1 : Pe.toChecksum(W(e)) === e;
  }
  /** @hidden */
  static toChecksum(t) {
    if (!Ln(t))
      throw new B(
        B.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${t}.`
      );
    const e = W(t).toLowerCase().slice(2), n = sn(e);
    let s = "0x";
    for (let i = 0; i < 32; ++i) {
      const a = n[i], o = e.charAt(i * 2), d = e.charAt(i * 2 + 1);
      s += (a & 240) >= 128 ? o.toUpperCase() : o, s += (a & 15) >= 8 ? d.toUpperCase() : d;
    }
    return s;
  }
}, je(Pe, "Address"), Pe), wC = Object.defineProperty, Nt = (r, t) => wC(r, "name", { value: t, configurable: !0 }), jr, bs, Ot = (bs = class extends yt {
  constructor(e) {
    const n = (8 - e % 8) % 8, s = e + n;
    super(
      "ByteArray",
      // While this might sound like a [u8; N] coder it's actually not.
      // A [u8; N] coder would pad every u8 to 8 bytes which would
      // make every u8 have the same size as a u64.
      // We are packing four u8s into u64s here, avoiding this padding.
      `[u64; ${s / 4}]`,
      s
    );
    D(this, "length");
    Ie(this, jr);
    this.length = e, Ut(this, jr, n);
  }
  encode(e) {
    const n = [], s = J(e);
    return n.push(s), ht(this, jr) && n.push(new Uint8Array(ht(this, jr))), ct(n);
  }
  decode(e, n) {
    let s, i = n;
    [s, i] = [W(e.slice(i, i + this.length)), i + this.length];
    const a = s;
    return ht(this, jr) && ([s, i] = [null, i + ht(this, jr)]), [a, i];
  }
}, jr = new WeakMap(), Nt(bs, "ByteArrayCoder"), bs), Is, kn = (Is = class extends xo {
  constructor() {
    super("TxPointer", {
      blockHeight: new K("u32", { padToWordSize: !0 }),
      txIndex: new K("u16", { padToWordSize: !0 })
    });
  }
  static decodeFromGqlScalar(t) {
    if (t.length !== 12)
      throw new B(
        L.DECODE_ERROR,
        `Invalid TxPointer scalar string length ${t.length}. It must have length 12.`
      );
    const [e, n] = [t.substring(0, 8), t.substring(8)];
    return {
      blockHeight: parseInt(e, 16),
      txIndex: parseInt(n, 16)
    };
  }
}, Nt(Is, "TxPointerCoder"), Is), vt = /* @__PURE__ */ ((r) => (r[r.Coin = 0] = "Coin", r[r.Contract = 1] = "Contract", r[r.Message = 2] = "Message", r))(vt || {}), Es, il = (Es = class extends yt {
  constructor() {
    super("InputCoin", "struct InputCoin", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new ot().encode(t.txID)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.outputIndex)), e.push(new ot().encode(t.owner)), e.push(new rt("u64").encode(t.amount)), e.push(new ot().encode(t.assetId)), e.push(new kn().encode(t.txPointer)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.witnessIndex)), e.push(new rt("u64").encode(t.predicateGasUsed)), e.push(new rt("u64").encode(t.predicateLength)), e.push(new rt("u64").encode(t.predicateDataLength)), e.push(new Ot(t.predicateLength.toNumber()).encode(t.predicate)), e.push(
      new Ot(t.predicateDataLength.toNumber()).encode(t.predicateData)
    ), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new ot().decode(t, s);
    const i = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new ot().decode(t, s);
    const o = n;
    [n, s] = new rt("u64").decode(t, s);
    const d = n;
    [n, s] = new ot().decode(t, s);
    const h = n;
    [n, s] = new kn().decode(t, s);
    const f = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const g = Number(n);
    [n, s] = new rt("u64").decode(t, s);
    const y = n;
    [n, s] = new rt("u64").decode(t, s);
    const R = n;
    [n, s] = new rt("u64").decode(t, s);
    const Q = n;
    [n, s] = new Ot(R.toNumber()).decode(t, s);
    const x = n;
    return [n, s] = new Ot(Q.toNumber()).decode(t, s), [
      {
        type: 0,
        txID: i,
        outputIndex: a,
        owner: o,
        amount: d,
        assetId: h,
        txPointer: f,
        witnessIndex: g,
        predicateGasUsed: y,
        predicateLength: R,
        predicateDataLength: Q,
        predicate: x,
        predicateData: n
      },
      s
    ];
  }
}, Nt(Es, "InputCoinCoder"), Es), Cs, ao = (Cs = class extends yt {
  constructor() {
    super("InputContract", "struct InputContract", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new ot().encode(t.txID)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.outputIndex)), e.push(new ot().encode(t.balanceRoot)), e.push(new ot().encode(t.stateRoot)), e.push(new kn().encode(t.txPointer)), e.push(new ot().encode(t.contractID)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new ot().decode(t, s);
    const i = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new ot().decode(t, s);
    const o = n;
    [n, s] = new ot().decode(t, s);
    const d = n;
    [n, s] = new kn().decode(t, s);
    const h = n;
    return [n, s] = new ot().decode(t, s), [
      {
        type: 1,
        txID: i,
        outputIndex: a,
        balanceRoot: o,
        stateRoot: d,
        txPointer: h,
        contractID: n
      },
      s
    ];
  }
}, Nt(Cs, "InputContractCoder"), Cs), Sn, gn = (Sn = class extends yt {
  constructor() {
    super("InputMessage", "struct InputMessage", 0);
  }
  static getMessageId(t) {
    const e = [];
    return e.push(new Ot(32).encode(t.sender)), e.push(new Ot(32).encode(t.recipient)), e.push(new Ot(32).encode(t.nonce)), e.push(new rt("u64").encode(t.amount)), e.push(J(t.data || "0x")), zt(ct(e));
  }
  static encodeData(t) {
    const e = J(t || "0x"), n = e.length;
    return new Ot(n).encode(e);
  }
  encode(t) {
    const e = [], n = Sn.encodeData(t.data);
    return e.push(new Ot(32).encode(t.sender)), e.push(new Ot(32).encode(t.recipient)), e.push(new rt("u64").encode(t.amount)), e.push(new Ot(32).encode(t.nonce)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.witnessIndex)), e.push(new rt("u64").encode(t.predicateGasUsed)), e.push(new rt("u64").encode(n.length)), e.push(new rt("u64").encode(t.predicateLength)), e.push(new rt("u64").encode(t.predicateDataLength)), e.push(new Ot(n.length).encode(n)), e.push(new Ot(t.predicateLength.toNumber()).encode(t.predicate)), e.push(
      new Ot(t.predicateDataLength.toNumber()).encode(t.predicateData)
    ), ct(e);
  }
  static decodeData(t) {
    const e = J(t), n = e.length, [s] = new Ot(n).decode(e, 0);
    return J(s);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new ot().decode(t, s);
    const i = n;
    [n, s] = new ot().decode(t, s);
    const a = n;
    [n, s] = new rt("u64").decode(t, s);
    const o = n;
    [n, s] = new ot().decode(t, s);
    const d = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const h = Number(n);
    [n, s] = new rt("u64").decode(t, s);
    const f = n;
    [n, s] = new K("u32", { padToWordSize: !0 }).decode(t, s);
    const g = n;
    [n, s] = new rt("u64").decode(t, s);
    const y = n;
    [n, s] = new rt("u64").decode(t, s);
    const R = n;
    [n, s] = new Ot(g).decode(t, s);
    const Q = n;
    [n, s] = new Ot(y.toNumber()).decode(t, s);
    const x = n;
    return [n, s] = new Ot(R.toNumber()).decode(t, s), [
      {
        type: 2,
        sender: i,
        recipient: a,
        amount: o,
        witnessIndex: h,
        nonce: d,
        predicateGasUsed: f,
        dataLength: g,
        predicateLength: y,
        predicateDataLength: R,
        data: Q,
        predicate: x,
        predicateData: n
      },
      s
    ];
  }
}, Nt(Sn, "InputMessageCoder"), Sn), Bs, Cr = (Bs = class extends yt {
  constructor() {
    super("Input", "struct Input", 0);
  }
  encode(t) {
    const e = [];
    e.push(new K("u8", { padToWordSize: !0 }).encode(t.type));
    const { type: n } = t;
    switch (n) {
      case 0: {
        e.push(new il().encode(t));
        break;
      }
      case 1: {
        e.push(new ao().encode(t));
        break;
      }
      case 2: {
        e.push(new gn().encode(t));
        break;
      }
      default:
        throw new B(
          L.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${n}.`
        );
    }
    return ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new K("u8", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    switch (i) {
      case 0:
        return [n, s] = new il().decode(t, s), [n, s];
      case 1:
        return [n, s] = new ao().decode(t, s), [n, s];
      case 2:
        return [n, s] = new gn().decode(t, s), [n, s];
      default:
        throw new B(
          L.INVALID_TRANSACTION_INPUT,
          `Invalid transaction input type: ${i}.`
        );
    }
  }
}, Nt(Bs, "InputCoder"), Bs), lt = /* @__PURE__ */ ((r) => (r[r.Coin = 0] = "Coin", r[r.Contract = 1] = "Contract", r[r.Change = 2] = "Change", r[r.Variable = 3] = "Variable", r[r.ContractCreated = 4] = "ContractCreated", r))(lt || {}), vs, al = (vs = class extends yt {
  constructor() {
    super("OutputCoin", "struct OutputCoin", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new ot().encode(t.to)), e.push(new rt("u64").encode(t.amount)), e.push(new ot().encode(t.assetId)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new ot().decode(t, s);
    const i = n;
    [n, s] = new rt("u64").decode(t, s);
    const a = n;
    return [n, s] = new ot().decode(t, s), [
      {
        type: 0,
        to: i,
        amount: a,
        assetId: n
      },
      s
    ];
  }
}, Nt(vs, "OutputCoinCoder"), vs), xs, oo = (xs = class extends yt {
  constructor() {
    super("OutputContract", "struct OutputContract", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new K("u8", { padToWordSize: !0 }).encode(t.inputIndex)), e.push(new ot().encode(t.balanceRoot)), e.push(new ot().encode(t.stateRoot)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new K("u8", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    [n, s] = new ot().decode(t, s);
    const a = n;
    return [n, s] = new ot().decode(t, s), [
      {
        type: 1,
        inputIndex: i,
        balanceRoot: a,
        stateRoot: n
      },
      s
    ];
  }
}, Nt(xs, "OutputContractCoder"), xs), Rs, ol = (Rs = class extends yt {
  constructor() {
    super("OutputChange", "struct OutputChange", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new ot().encode(t.to)), e.push(new rt("u64").encode(t.amount)), e.push(new ot().encode(t.assetId)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new ot().decode(t, s);
    const i = n;
    [n, s] = new rt("u64").decode(t, s);
    const a = n;
    return [n, s] = new ot().decode(t, s), [
      {
        type: 2,
        to: i,
        amount: a,
        assetId: n
      },
      s
    ];
  }
}, Nt(Rs, "OutputChangeCoder"), Rs), Ss, cl = (Ss = class extends yt {
  constructor() {
    super("OutputVariable", "struct OutputVariable", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new ot().encode(t.to)), e.push(new rt("u64").encode(t.amount)), e.push(new ot().encode(t.assetId)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new ot().decode(t, s);
    const i = n;
    [n, s] = new rt("u64").decode(t, s);
    const a = n;
    return [n, s] = new ot().decode(t, s), [
      {
        type: 3,
        to: i,
        amount: a,
        assetId: n
      },
      s
    ];
  }
}, Nt(Ss, "OutputVariableCoder"), Ss), Ts, dl = (Ts = class extends yt {
  constructor() {
    super("OutputContractCreated", "struct OutputContractCreated", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new ot().encode(t.contractId)), e.push(new ot().encode(t.stateRoot)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new ot().decode(t, s);
    const i = n;
    return [n, s] = new ot().decode(t, s), [
      {
        type: 4,
        contractId: i,
        stateRoot: n
      },
      s
    ];
  }
}, Nt(Ts, "OutputContractCreatedCoder"), Ts), Ns, Br = (Ns = class extends yt {
  constructor() {
    super("Output", " struct Output", 0);
  }
  encode(t) {
    const e = [];
    e.push(new K("u8", { padToWordSize: !0 }).encode(t.type));
    const { type: n } = t;
    switch (n) {
      case 0: {
        e.push(new al().encode(t));
        break;
      }
      case 1: {
        e.push(new oo().encode(t));
        break;
      }
      case 2: {
        e.push(new ol().encode(t));
        break;
      }
      case 3: {
        e.push(new cl().encode(t));
        break;
      }
      case 4: {
        e.push(new dl().encode(t));
        break;
      }
      default:
        throw new B(
          L.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${n}.`
        );
    }
    return ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new K("u8", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    switch (i) {
      case 0:
        return [n, s] = new al().decode(t, s), [n, s];
      case 1:
        return [n, s] = new oo().decode(t, s), [n, s];
      case 2:
        return [n, s] = new ol().decode(t, s), [n, s];
      case 3:
        return [n, s] = new cl().decode(t, s), [n, s];
      case 4:
        return [n, s] = new dl().decode(t, s), [n, s];
      default:
        throw new B(
          L.INVALID_TRANSACTION_OUTPUT,
          `Invalid transaction output type: ${i}.`
        );
    }
  }
}, Nt(Ns, "OutputCoder"), Ns), ke = /* @__PURE__ */ ((r) => (r[r.Tip = 1] = "Tip", r[r.WitnessLimit = 2] = "WitnessLimit", r[r.Maturity = 4] = "Maturity", r[r.MaxFee = 8] = "MaxFee", r[r.Expiration = 16] = "Expiration", r))(ke || {}), mC = /* @__PURE__ */ Nt((r) => r.sort((t, e) => t.type - e.type), "sortPolicies");
function Sp(r) {
  const t = /* @__PURE__ */ new Set();
  r.forEach((e) => {
    if (t.has(e.type))
      throw new B(
        L.DUPLICATED_POLICY,
        "Duplicate policy type found: 8"
      );
    t.add(e.type);
  });
}
Nt(Sp, "validateDuplicatedPolicies");
var Ds, vr = (Ds = class extends yt {
  constructor() {
    super("Policies", "array Policy", 0);
  }
  encode(t) {
    Sp(t);
    const e = mC(t), n = [];
    return e.forEach(({ data: s, type: i }) => {
      switch (i) {
        case 8:
        case 1:
        case 2:
          n.push(new rt("u64").encode(s));
          break;
        case 4:
        case 16:
          n.push(new K("u32", { padToWordSize: !0 }).encode(s));
          break;
        default:
          throw new B(L.INVALID_POLICY_TYPE, `Invalid policy type: ${i}`);
      }
    }), ct(n);
  }
  decode(t, e, n) {
    let s = e;
    const i = [];
    if (n & 1) {
      const [a, o] = new rt("u64").decode(t, s);
      s = o, i.push({ type: 1, data: a });
    }
    if (n & 2) {
      const [a, o] = new rt("u64").decode(t, s);
      s = o, i.push({ type: 2, data: a });
    }
    if (n & 4) {
      const [a, o] = new K("u32", { padToWordSize: !0 }).decode(
        t,
        s
      );
      s = o, i.push({ type: 4, data: a });
    }
    if (n & 8) {
      const [a, o] = new rt("u64").decode(t, s);
      s = o, i.push({ type: 8, data: a });
    }
    if (n & 16) {
      const [a, o] = new K("u32", { padToWordSize: !0 }).decode(
        t,
        s
      );
      s = o, i.push({ type: 16, data: a });
    }
    return [i, s];
  }
}, Nt(Ds, "PoliciesCoder"), Ds), ut = /* @__PURE__ */ ((r) => (r[r.Call = 0] = "Call", r[r.Return = 1] = "Return", r[r.ReturnData = 2] = "ReturnData", r[r.Panic = 3] = "Panic", r[r.Revert = 4] = "Revert", r[r.Log = 5] = "Log", r[r.LogData = 6] = "LogData", r[r.Transfer = 7] = "Transfer", r[r.TransferOut = 8] = "TransferOut", r[r.ScriptResult = 9] = "ScriptResult", r[r.MessageOut = 10] = "MessageOut", r[r.Mint = 11] = "Mint", r[r.Burn = 12] = "Burn", r))(ut || {}), nd = /* @__PURE__ */ Nt((r, t) => {
  const e = J(r), n = J(t);
  return zt(ct([e, n]));
}, "getMintedAssetId"), eR = /* @__PURE__ */ Nt((r, t) => ({
  bits: nd(r, t)
}), "createAssetId"), rR = /* @__PURE__ */ Nt((r) => {
  const t = [];
  return t.push(new Ot(32).encode(r.sender)), t.push(new Ot(32).encode(r.recipient)), t.push(new Ot(32).encode(r.nonce)), t.push(new rt("u64").encode(r.amount)), t.push(J(r.data || "0x")), zt(ct(t));
}, "getMessageId"), Fs, ul = (Fs = class extends xo {
  constructor() {
    super("StorageSlot", {
      key: new ot(),
      value: new ot()
    });
  }
}, Nt(Fs, "StorageSlotCoder"), Fs), qe = /* @__PURE__ */ ((r) => (r[r.ConsensusParameters = 0] = "ConsensusParameters", r[r.StateTransition = 1] = "StateTransition", r))(qe || {}), Qs, hl = (Qs = class extends yt {
  constructor() {
    super("UpgradePurpose", "UpgradePurpose", 0);
  }
  encode(t) {
    const e = [], { type: n } = t;
    switch (e.push(new K("u8", { padToWordSize: !0 }).encode(n)), n) {
      case 0: {
        const s = t.data;
        e.push(new K("u16", { padToWordSize: !0 }).encode(s.witnessIndex)), e.push(new ot().encode(s.checksum));
        break;
      }
      case 1: {
        const s = t.data;
        e.push(new ot().encode(s.bytecodeRoot));
        break;
      }
      default:
        throw new B(
          L.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${n}`
        );
    }
    return ct(e);
  }
  decode(t, e) {
    let n = e, s;
    [s, n] = new K("u8", { padToWordSize: !0 }).decode(t, n);
    const i = s;
    switch (i) {
      case 0: {
        [s, n] = new K("u16", { padToWordSize: !0 }).decode(t, n);
        const a = s;
        return [s, n] = new ot().decode(t, n), [{ type: i, data: { witnessIndex: a, checksum: s } }, n];
      }
      case 1:
        return [s, n] = new ot().decode(t, n), [{ type: i, data: { bytecodeRoot: s } }, n];
      default:
        throw new B(
          L.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${i}`
        );
    }
  }
}, Nt(Qs, "UpgradePurposeCoder"), Qs), Os, xr = (Os = class extends yt {
  constructor() {
    super(
      "Witness",
      // Types of dynamic length are not supported in the ABI
      "unknown",
      0
    );
  }
  encode(t) {
    const e = [];
    return e.push(new K("u32", { padToWordSize: !0 }).encode(t.dataLength)), e.push(new Ot(t.dataLength).encode(t.data)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new K("u32", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    return [n, s] = new Ot(i).decode(t, s), [
      {
        dataLength: i,
        data: n
      },
      s
    ];
  }
}, Nt(Os, "WitnessCoder"), Os), Ct = /* @__PURE__ */ ((r) => (r[r.Script = 0] = "Script", r[r.Create = 1] = "Create", r[r.Mint = 2] = "Mint", r[r.Upgrade = 3] = "Upgrade", r[r.Upload = 4] = "Upload", r[r.Blob = 5] = "Blob", r))(Ct || {}), Ms, Al = (Ms = class extends yt {
  constructor() {
    super("TransactionScript", "struct TransactionScript", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new rt("u64").encode(t.scriptGasLimit)), e.push(new ot().encode(t.receiptsRoot)), e.push(new rt("u64").encode(t.scriptLength)), e.push(new rt("u64").encode(t.scriptDataLength)), e.push(new K("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(new Ot(t.scriptLength.toNumber()).encode(t.script)), e.push(new Ot(t.scriptDataLength.toNumber()).encode(t.scriptData)), e.push(new vr().encode(t.policies)), e.push(new mt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new mt(new Br(), t.outputsCount).encode(t.outputs)), e.push(new mt(new xr(), t.witnessesCount).encode(t.witnesses)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new rt("u64").decode(t, s);
    const i = n;
    [n, s] = new ot().decode(t, s);
    const a = n;
    [n, s] = new rt("u64").decode(t, s);
    const o = n;
    [n, s] = new rt("u64").decode(t, s);
    const d = n;
    [n, s] = new K("u32", { padToWordSize: !0 }).decode(t, s);
    const h = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const f = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const g = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const y = n;
    [n, s] = new Ot(o.toNumber()).decode(t, s);
    const R = n;
    [n, s] = new Ot(d.toNumber()).decode(t, s);
    const Q = n;
    [n, s] = new vr().decode(t, s, h);
    const x = n;
    [n, s] = new mt(new Cr(), f).decode(t, s);
    const N = n;
    [n, s] = new mt(new Br(), g).decode(t, s);
    const U = n;
    return [n, s] = new mt(new xr(), y).decode(t, s), [
      {
        type: 0,
        scriptGasLimit: i,
        scriptLength: o,
        scriptDataLength: d,
        policyTypes: h,
        inputsCount: f,
        outputsCount: g,
        witnessesCount: y,
        receiptsRoot: a,
        script: R,
        scriptData: Q,
        policies: x,
        inputs: N,
        outputs: U,
        witnesses: n
      },
      s
    ];
  }
}, Nt(Ms, "TransactionScriptCoder"), Ms), Ps, ll = (Ps = class extends yt {
  constructor() {
    super("TransactionCreate", "struct TransactionCreate", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new K("u16", { padToWordSize: !0 }).encode(t.bytecodeWitnessIndex)), e.push(new ot().encode(t.salt)), e.push(new rt("u64").encode(t.storageSlotsCount)), e.push(new K("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(
      new mt(new ul(), t.storageSlotsCount.toNumber()).encode(
        t.storageSlots
      )
    ), e.push(new vr().encode(t.policies)), e.push(new mt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new mt(new Br(), t.outputsCount).encode(t.outputs)), e.push(new mt(new xr(), t.witnessesCount).encode(t.witnesses)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    [n, s] = new ot().decode(t, s);
    const a = n;
    [n, s] = new rt("u64").decode(t, s);
    const o = n;
    [n, s] = new K("u32", { padToWordSize: !0 }).decode(t, s);
    const d = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const h = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const f = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const g = n;
    [n, s] = new mt(new ul(), o.toNumber()).decode(
      t,
      s
    );
    const y = n;
    [n, s] = new vr().decode(t, s, d);
    const R = n;
    [n, s] = new mt(new Cr(), h).decode(t, s);
    const Q = n;
    [n, s] = new mt(new Br(), f).decode(t, s);
    const x = n;
    return [n, s] = new mt(new xr(), g).decode(t, s), [
      {
        type: 1,
        bytecodeWitnessIndex: i,
        policyTypes: d,
        storageSlotsCount: o,
        inputsCount: h,
        outputsCount: f,
        witnessesCount: g,
        salt: a,
        policies: R,
        storageSlots: y,
        inputs: Q,
        outputs: x,
        witnesses: n
      },
      s
    ];
  }
}, Nt(Ps, "TransactionCreateCoder"), Ps), Ls, _l = (Ls = class extends yt {
  constructor() {
    super("TransactionMint", "struct TransactionMint", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new kn().encode(t.txPointer)), e.push(new ao().encode(t.inputContract)), e.push(new oo().encode(t.outputContract)), e.push(new rt("u64").encode(t.mintAmount)), e.push(new ot().encode(t.mintAssetId)), e.push(new rt("u64").encode(t.gasPrice)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new kn().decode(t, s);
    const i = n;
    [n, s] = new ao().decode(t, s);
    const a = n;
    [n, s] = new oo().decode(t, s);
    const o = n;
    [n, s] = new rt("u64").decode(t, s);
    const d = n;
    [n, s] = new ot().decode(t, s);
    const h = n;
    return [n, s] = new rt("u64").decode(t, s), [
      {
        type: 2,
        txPointer: i,
        inputContract: a,
        outputContract: o,
        mintAmount: d,
        mintAssetId: h,
        gasPrice: n
      },
      s
    ];
  }
}, Nt(Ls, "TransactionMintCoder"), Ls), ks, pl = (ks = class extends yt {
  constructor() {
    super("TransactionUpgrade", "struct TransactionUpgrade", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new hl().encode(t.upgradePurpose)), e.push(new K("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(new vr().encode(t.policies)), e.push(new mt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new mt(new Br(), t.outputsCount).encode(t.outputs)), e.push(new mt(new xr(), t.witnessesCount).encode(t.witnesses)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new hl().decode(t, s);
    const i = n;
    [n, s] = new K("u32", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const o = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const d = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const h = n;
    [n, s] = new vr().decode(t, s, a);
    const f = n;
    [n, s] = new mt(new Cr(), o).decode(t, s);
    const g = n;
    [n, s] = new mt(new Br(), d).decode(t, s);
    const y = n;
    return [n, s] = new mt(new xr(), h).decode(t, s), [
      {
        type: 3,
        upgradePurpose: i,
        policyTypes: a,
        inputsCount: o,
        outputsCount: d,
        witnessesCount: h,
        policies: f,
        inputs: g,
        outputs: y,
        witnesses: n
      },
      s
    ];
  }
}, Nt(ks, "TransactionUpgradeCoder"), ks), Us, fl = (Us = class extends yt {
  constructor() {
    super("TransactionUpload", "struct TransactionUpload", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new ot().encode(t.root)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.witnessIndex)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.subsectionIndex)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.subsectionsNumber)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.proofSetCount)), e.push(new K("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(new mt(new ot(), t.proofSetCount).encode(t.proofSet)), e.push(new vr().encode(t.policies)), e.push(new mt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new mt(new Br(), t.outputsCount).encode(t.outputs)), e.push(new mt(new xr(), t.witnessesCount).encode(t.witnesses)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new ot().decode(t, s);
    const i = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const o = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const d = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const h = n;
    [n, s] = new K("u32", { padToWordSize: !0 }).decode(t, s);
    const f = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const g = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const y = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const R = n;
    [n, s] = new mt(new ot(), h).decode(t, s);
    const Q = n;
    [n, s] = new vr().decode(t, s, f);
    const x = n;
    [n, s] = new mt(new Cr(), g).decode(t, s);
    const N = n;
    [n, s] = new mt(new Br(), y).decode(t, s);
    const U = n;
    return [n, s] = new mt(new xr(), R).decode(t, s), [
      {
        type: 4,
        root: i,
        witnessIndex: a,
        subsectionIndex: o,
        subsectionsNumber: d,
        proofSetCount: h,
        policyTypes: f,
        inputsCount: g,
        outputsCount: y,
        witnessesCount: R,
        proofSet: Q,
        policies: x,
        inputs: N,
        outputs: U,
        witnesses: n
      },
      s
    ];
  }
}, Nt(Us, "TransactionUploadCoder"), Us), Gs, gl = (Gs = class extends yt {
  constructor() {
    super("TransactionBlob", "struct TransactionBlob", 0);
  }
  encode(t) {
    const e = [];
    return e.push(new ot().encode(t.blobId)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.witnessIndex)), e.push(new K("u32", { padToWordSize: !0 }).encode(t.policyTypes)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.inputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.outputsCount)), e.push(new K("u16", { padToWordSize: !0 }).encode(t.witnessesCount)), e.push(new vr().encode(t.policies)), e.push(new mt(new Cr(), t.inputsCount).encode(t.inputs)), e.push(new mt(new Br(), t.outputsCount).encode(t.outputs)), e.push(new mt(new xr(), t.witnessesCount).encode(t.witnesses)), ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new ot().decode(t, s);
    const i = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const a = n;
    [n, s] = new K("u32", { padToWordSize: !0 }).decode(t, s);
    const o = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const d = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const h = n;
    [n, s] = new K("u16", { padToWordSize: !0 }).decode(t, s);
    const f = n;
    [n, s] = new vr().decode(t, s, o);
    const g = n;
    [n, s] = new mt(new Cr(), d).decode(t, s);
    const y = n;
    [n, s] = new mt(new Br(), h).decode(t, s);
    const R = n;
    return [n, s] = new mt(new xr(), f).decode(t, s), [
      {
        type: 5,
        blobId: i,
        witnessIndex: a,
        policyTypes: o,
        inputsCount: d,
        outputsCount: h,
        witnessesCount: f,
        policies: g,
        inputs: y,
        outputs: R,
        witnesses: n
      },
      s
    ];
  }
}, Nt(Gs, "TransactionBlobCoder"), Gs), zs, lr = (zs = class extends yt {
  constructor() {
    super("Transaction", "struct Transaction", 0);
  }
  encode(t) {
    const e = [];
    e.push(new K("u8", { padToWordSize: !0 }).encode(t.type));
    const { type: n } = t;
    switch (t.type) {
      case 0: {
        e.push(
          new Al().encode(t)
        );
        break;
      }
      case 1: {
        e.push(
          new ll().encode(t)
        );
        break;
      }
      case 2: {
        e.push(new _l().encode(t));
        break;
      }
      case 3: {
        e.push(
          new pl().encode(t)
        );
        break;
      }
      case 4: {
        e.push(
          new fl().encode(t)
        );
        break;
      }
      case 5: {
        e.push(new gl().encode(t));
        break;
      }
      default:
        throw new B(
          L.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${n}`
        );
    }
    return ct(e);
  }
  decode(t, e) {
    let n, s = e;
    [n, s] = new K("u8", { padToWordSize: !0 }).decode(t, s);
    const i = n;
    switch (i) {
      case 0:
        return [n, s] = new Al().decode(t, s), [n, s];
      case 1:
        return [n, s] = new ll().decode(t, s), [n, s];
      case 2:
        return [n, s] = new _l().decode(t, s), [n, s];
      case 3:
        return [n, s] = new pl().decode(t, s), [n, s];
      case 4:
        return [n, s] = new fl().decode(t, s), [n, s];
      case 5:
        return [n, s] = new gl().decode(t, s), [n, s];
      default:
        throw new B(
          L.UNSUPPORTED_TRANSACTION_TYPE,
          `Unsupported transaction type: ${i}`
        );
    }
  }
}, Nt(zs, "TransactionCoder"), zs), Xs, nR = (Xs = class extends xo {
  constructor() {
    super("UtxoId", {
      transactionId: new ot(),
      outputIndex: new K("u16", { padToWordSize: !0 })
    });
  }
}, Nt(Xs, "UtxoIdCoder"), Xs);
function yC(r) {
  return r != null && typeof r == "object" && r["@@functional/placeholder"] === !0;
}
function Tp(r) {
  return function t(e) {
    return arguments.length === 0 || yC(e) ? t : r.apply(this, arguments);
  };
}
var bC = /* @__PURE__ */ Tp(function(t) {
  return t === null ? "Null" : t === void 0 ? "Undefined" : Object.prototype.toString.call(t).slice(8, -1);
});
function IC(r) {
  return new RegExp(r.source, r.flags ? r.flags : (r.global ? "g" : "") + (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.sticky ? "y" : "") + (r.unicode ? "u" : "") + (r.dotAll ? "s" : ""));
}
function Np(r, t, e) {
  if (e || (e = new CC()), EC(r))
    return r;
  var n = function(i) {
    var a = e.get(r);
    if (a)
      return a;
    e.set(r, i);
    for (var o in r)
      Object.prototype.hasOwnProperty.call(r, o) && (i[o] = Np(r[o], !0, e));
    return i;
  };
  switch (bC(r)) {
    case "Object":
      return n(Object.create(Object.getPrototypeOf(r)));
    case "Array":
      return n(Array(r.length));
    case "Date":
      return new Date(r.valueOf());
    case "RegExp":
      return IC(r);
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "BigInt64Array":
    case "BigUint64Array":
      return r.slice();
    default:
      return r;
  }
}
function EC(r) {
  var t = typeof r;
  return r == null || t != "object" && t != "function";
}
var CC = /* @__PURE__ */ function() {
  function r() {
    this.map = {}, this.length = 0;
  }
  return r.prototype.set = function(t, e) {
    var n = this.hash(t), s = this.map[n];
    s || (this.map[n] = s = []), s.push([t, e]), this.length += 1;
  }, r.prototype.hash = function(t) {
    var e = [];
    for (var n in t)
      e.push(Object.prototype.toString.call(t[n]));
    return e.join();
  }, r.prototype.get = function(t) {
    if (this.length <= 180) {
      for (var e in this.map)
        for (var a = this.map[e], n = 0; n < a.length; n += 1) {
          var s = a[n];
          if (s[0] === t)
            return s[1];
        }
      return;
    }
    var i = this.hash(t), a = this.map[i];
    if (a)
      for (var n = 0; n < a.length; n += 1) {
        var s = a[n];
        if (s[0] === t)
          return s[1];
      }
  }, r;
}(), Be = /* @__PURE__ */ Tp(function(t) {
  return t != null && typeof t.clone == "function" ? t.clone() : Np(t);
});
const Hd = JSON, BC = (r) => r.toUpperCase(), vC = (r) => {
  const t = {};
  return r.forEach((e, n) => {
    t[n] = e;
  }), t;
}, xC = (r, t, e) => r.document ? r : {
  document: r,
  variables: t,
  requestHeaders: e,
  signal: void 0
}, RC = (r, t, e) => r.query ? r : {
  query: r,
  variables: t,
  requestHeaders: e,
  signal: void 0
}, SC = (r, t) => r.documents ? r : {
  documents: r,
  requestHeaders: t,
  signal: void 0
};
function Na(r, t) {
  if (!!!r)
    throw new Error(t);
}
function TC(r) {
  return typeof r == "object" && r !== null;
}
function NC(r, t) {
  if (!!!r)
    throw new Error(
      "Unexpected invariant triggered."
    );
}
const DC = /\r\n|[\n\r]/g;
function sd(r, t) {
  let e = 0, n = 1;
  for (const s of r.body.matchAll(DC)) {
    if (typeof s.index == "number" || NC(!1), s.index >= t)
      break;
    e = s.index + s[0].length, n += 1;
  }
  return {
    line: n,
    column: t + 1 - e
  };
}
function FC(r) {
  return Dp(
    r.source,
    sd(r.source, r.start)
  );
}
function Dp(r, t) {
  const e = r.locationOffset.column - 1, n = "".padStart(e) + r.body, s = t.line - 1, i = r.locationOffset.line - 1, a = t.line + i, o = t.line === 1 ? e : 0, d = t.column + o, h = `${r.name}:${a}:${d}
`, f = n.split(/\r\n|[\n\r]/g), g = f[s];
  if (g.length > 120) {
    const y = Math.floor(d / 80), R = d % 80, Q = [];
    for (let x = 0; x < g.length; x += 80)
      Q.push(g.slice(x, x + 80));
    return h + wl([
      [`${a} |`, Q[0]],
      ...Q.slice(1, y + 1).map((x) => ["|", x]),
      ["|", "^".padStart(R)],
      ["|", Q[y + 1]]
    ]);
  }
  return h + wl([
    // Lines specified like this: ["prefix", "string"],
    [`${a - 1} |`, f[s - 1]],
    [`${a} |`, g],
    ["|", "^".padStart(d)],
    [`${a + 1} |`, f[s + 1]]
  ]);
}
function wl(r) {
  const t = r.filter(([n, s]) => s !== void 0), e = Math.max(...t.map(([n]) => n.length));
  return t.map(([n, s]) => n.padStart(e) + (s ? " " + s : "")).join(`
`);
}
function QC(r) {
  const t = r[0];
  return t == null || "kind" in t || "length" in t ? {
    nodes: t,
    source: r[1],
    positions: r[2],
    path: r[3],
    originalError: r[4],
    extensions: r[5]
  } : t;
}
class Vd extends Error {
  /**
   * An array of `{ line, column }` locations within the source GraphQL document
   * which correspond to this error.
   *
   * Errors during validation often contain multiple locations, for example to
   * point out two things with the same name. Errors during execution include a
   * single location, the field which produced the error.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array describing the JSON-path into the execution response which
   * corresponds to this error. Only included for errors during execution.
   *
   * Enumerable, and appears in the result of JSON.stringify().
   */
  /**
   * An array of GraphQL AST Nodes corresponding to this error.
   */
  /**
   * The source GraphQL document for the first location of this error.
   *
   * Note that if this Error represents more than one node, the source may not
   * represent nodes after the first node.
   */
  /**
   * An array of character offsets within the source GraphQL document
   * which correspond to this error.
   */
  /**
   * The original error thrown from a field resolver during execution.
   */
  /**
   * Extension fields to add to the formatted error.
   */
  /**
   * @deprecated Please use the `GraphQLErrorOptions` constructor overload instead.
   */
  constructor(t, ...e) {
    var n, s, i;
    const { nodes: a, source: o, positions: d, path: h, originalError: f, extensions: g } = QC(e);
    super(t), this.name = "GraphQLError", this.path = h ?? void 0, this.originalError = f ?? void 0, this.nodes = ml(
      Array.isArray(a) ? a : a ? [a] : void 0
    );
    const y = ml(
      (n = this.nodes) === null || n === void 0 ? void 0 : n.map((Q) => Q.loc).filter((Q) => Q != null)
    );
    this.source = o ?? (y == null || (s = y[0]) === null || s === void 0 ? void 0 : s.source), this.positions = d ?? (y == null ? void 0 : y.map((Q) => Q.start)), this.locations = d && o ? d.map((Q) => sd(o, Q)) : y == null ? void 0 : y.map((Q) => sd(Q.source, Q.start));
    const R = TC(
      f == null ? void 0 : f.extensions
    ) ? f == null ? void 0 : f.extensions : void 0;
    this.extensions = (i = g ?? R) !== null && i !== void 0 ? i : /* @__PURE__ */ Object.create(null), Object.defineProperties(this, {
      message: {
        writable: !0,
        enumerable: !0
      },
      name: {
        enumerable: !1
      },
      nodes: {
        enumerable: !1
      },
      source: {
        enumerable: !1
      },
      positions: {
        enumerable: !1
      },
      originalError: {
        enumerable: !1
      }
    }), f != null && f.stack ? Object.defineProperty(this, "stack", {
      value: f.stack,
      writable: !0,
      configurable: !0
    }) : Error.captureStackTrace ? Error.captureStackTrace(this, Vd) : Object.defineProperty(this, "stack", {
      value: Error().stack,
      writable: !0,
      configurable: !0
    });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let t = this.message;
    if (this.nodes)
      for (const e of this.nodes)
        e.loc && (t += `

` + FC(e.loc));
    else if (this.source && this.locations)
      for (const e of this.locations)
        t += `

` + Dp(this.source, e);
    return t;
  }
  toJSON() {
    const t = {
      message: this.message
    };
    return this.locations != null && (t.locations = this.locations), this.path != null && (t.path = this.path), this.extensions != null && Object.keys(this.extensions).length > 0 && (t.extensions = this.extensions), t;
  }
}
function ml(r) {
  return r === void 0 || r.length === 0 ? void 0 : r;
}
function Ce(r, t, e) {
  return new Vd(`Syntax Error: ${e}`, {
    source: r,
    positions: [t]
  });
}
class OC {
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The Token at which this Node begins.
   */
  /**
   * The Token at which this Node ends.
   */
  /**
   * The Source document the AST represents.
   */
  constructor(t, e, n) {
    this.start = t.start, this.end = e.end, this.startToken = t, this.endToken = e, this.source = n;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}
class Fp {
  /**
   * The kind of Token.
   */
  /**
   * The character offset at which this Node begins.
   */
  /**
   * The character offset at which this Node ends.
   */
  /**
   * The 1-indexed line number on which this Token appears.
   */
  /**
   * The 1-indexed column number at which this Token begins.
   */
  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   *
   * Note: is undefined for punctuation tokens, but typed as string for
   * convenience in the parser.
   */
  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  constructor(t, e, n, s, i, a) {
    this.kind = t, this.start = e, this.end = n, this.line = s, this.column = i, this.value = a, this.prev = null, this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
const Qp = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    // Note: fragment variable definitions are deprecated and will removed in v17.0.0
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
}, MC = new Set(Object.keys(Qp));
function yl(r) {
  const t = r == null ? void 0 : r.kind;
  return typeof t == "string" && MC.has(t);
}
var $n;
(function(r) {
  r.QUERY = "query", r.MUTATION = "mutation", r.SUBSCRIPTION = "subscription";
})($n || ($n = {}));
var id;
(function(r) {
  r.QUERY = "QUERY", r.MUTATION = "MUTATION", r.SUBSCRIPTION = "SUBSCRIPTION", r.FIELD = "FIELD", r.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION", r.FRAGMENT_SPREAD = "FRAGMENT_SPREAD", r.INLINE_FRAGMENT = "INLINE_FRAGMENT", r.VARIABLE_DEFINITION = "VARIABLE_DEFINITION", r.SCHEMA = "SCHEMA", r.SCALAR = "SCALAR", r.OBJECT = "OBJECT", r.FIELD_DEFINITION = "FIELD_DEFINITION", r.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION", r.INTERFACE = "INTERFACE", r.UNION = "UNION", r.ENUM = "ENUM", r.ENUM_VALUE = "ENUM_VALUE", r.INPUT_OBJECT = "INPUT_OBJECT", r.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION";
})(id || (id = {}));
var dt;
(function(r) {
  r.NAME = "Name", r.DOCUMENT = "Document", r.OPERATION_DEFINITION = "OperationDefinition", r.VARIABLE_DEFINITION = "VariableDefinition", r.SELECTION_SET = "SelectionSet", r.FIELD = "Field", r.ARGUMENT = "Argument", r.FRAGMENT_SPREAD = "FragmentSpread", r.INLINE_FRAGMENT = "InlineFragment", r.FRAGMENT_DEFINITION = "FragmentDefinition", r.VARIABLE = "Variable", r.INT = "IntValue", r.FLOAT = "FloatValue", r.STRING = "StringValue", r.BOOLEAN = "BooleanValue", r.NULL = "NullValue", r.ENUM = "EnumValue", r.LIST = "ListValue", r.OBJECT = "ObjectValue", r.OBJECT_FIELD = "ObjectField", r.DIRECTIVE = "Directive", r.NAMED_TYPE = "NamedType", r.LIST_TYPE = "ListType", r.NON_NULL_TYPE = "NonNullType", r.SCHEMA_DEFINITION = "SchemaDefinition", r.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", r.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", r.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", r.FIELD_DEFINITION = "FieldDefinition", r.INPUT_VALUE_DEFINITION = "InputValueDefinition", r.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", r.UNION_TYPE_DEFINITION = "UnionTypeDefinition", r.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", r.ENUM_VALUE_DEFINITION = "EnumValueDefinition", r.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", r.DIRECTIVE_DEFINITION = "DirectiveDefinition", r.SCHEMA_EXTENSION = "SchemaExtension", r.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension", r.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension", r.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension", r.UNION_TYPE_EXTENSION = "UnionTypeExtension", r.ENUM_TYPE_EXTENSION = "EnumTypeExtension", r.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension";
})(dt || (dt = {}));
function ad(r) {
  return r === 9 || r === 32;
}
function ta(r) {
  return r >= 48 && r <= 57;
}
function Op(r) {
  return r >= 97 && r <= 122 || // A-Z
  r >= 65 && r <= 90;
}
function Mp(r) {
  return Op(r) || r === 95;
}
function PC(r) {
  return Op(r) || ta(r) || r === 95;
}
function LC(r) {
  var t;
  let e = Number.MAX_SAFE_INTEGER, n = null, s = -1;
  for (let a = 0; a < r.length; ++a) {
    var i;
    const o = r[a], d = kC(o);
    d !== o.length && (n = (i = n) !== null && i !== void 0 ? i : a, s = a, a !== 0 && d < e && (e = d));
  }
  return r.map((a, o) => o === 0 ? a : a.slice(e)).slice(
    (t = n) !== null && t !== void 0 ? t : 0,
    s + 1
  );
}
function kC(r) {
  let t = 0;
  for (; t < r.length && ad(r.charCodeAt(t)); )
    ++t;
  return t;
}
function UC(r, t) {
  const e = r.replace(/"""/g, '\\"""'), n = e.split(/\r\n|[\n\r]/g), s = n.length === 1, i = n.length > 1 && n.slice(1).every((R) => R.length === 0 || ad(R.charCodeAt(0))), a = e.endsWith('\\"""'), o = r.endsWith('"') && !a, d = r.endsWith("\\"), h = o || d, f = (
    // add leading and trailing new lines only if it improves readability
    !s || r.length > 70 || h || i || a
  );
  let g = "";
  const y = s && ad(r.charCodeAt(0));
  return (f && !y || i) && (g += `
`), g += e, (f || h) && (g += `
`), '"""' + g + '"""';
}
var Y;
(function(r) {
  r.SOF = "<SOF>", r.EOF = "<EOF>", r.BANG = "!", r.DOLLAR = "$", r.AMP = "&", r.PAREN_L = "(", r.PAREN_R = ")", r.SPREAD = "...", r.COLON = ":", r.EQUALS = "=", r.AT = "@", r.BRACKET_L = "[", r.BRACKET_R = "]", r.BRACE_L = "{", r.PIPE = "|", r.BRACE_R = "}", r.NAME = "Name", r.INT = "Int", r.FLOAT = "Float", r.STRING = "String", r.BLOCK_STRING = "BlockString", r.COMMENT = "Comment";
})(Y || (Y = {}));
class GC {
  /**
   * The previously focused non-ignored token.
   */
  /**
   * The currently focused non-ignored token.
   */
  /**
   * The (1-indexed) line containing the current token.
   */
  /**
   * The character offset at which the current line begins.
   */
  constructor(t) {
    const e = new Fp(Y.SOF, 0, 0, 0, 0);
    this.source = t, this.lastToken = e, this.token = e, this.line = 1, this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  /**
   * Advances the token stream to the next non-ignored token.
   */
  advance() {
    return this.lastToken = this.token, this.token = this.lookahead();
  }
  /**
   * Looks ahead and returns the next non-ignored token, but does not change
   * the state of Lexer.
   */
  lookahead() {
    let t = this.token;
    if (t.kind !== Y.EOF)
      do
        if (t.next)
          t = t.next;
        else {
          const e = XC(this, t.end);
          t.next = e, e.prev = t, t = e;
        }
      while (t.kind === Y.COMMENT);
    return t;
  }
}
function zC(r) {
  return r === Y.BANG || r === Y.DOLLAR || r === Y.AMP || r === Y.PAREN_L || r === Y.PAREN_R || r === Y.SPREAD || r === Y.COLON || r === Y.EQUALS || r === Y.AT || r === Y.BRACKET_L || r === Y.BRACKET_R || r === Y.BRACE_L || r === Y.PIPE || r === Y.BRACE_R;
}
function Ti(r) {
  return r >= 0 && r <= 55295 || r >= 57344 && r <= 1114111;
}
function No(r, t) {
  return Pp(r.charCodeAt(t)) && Lp(r.charCodeAt(t + 1));
}
function Pp(r) {
  return r >= 55296 && r <= 56319;
}
function Lp(r) {
  return r >= 56320 && r <= 57343;
}
function Un(r, t) {
  const e = r.source.body.codePointAt(t);
  if (e === void 0)
    return Y.EOF;
  if (e >= 32 && e <= 126) {
    const n = String.fromCodePoint(e);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + e.toString(16).toUpperCase().padStart(4, "0");
}
function be(r, t, e, n, s) {
  const i = r.line, a = 1 + e - r.lineStart;
  return new Fp(t, e, n, i, a, s);
}
function XC(r, t) {
  const e = r.source.body, n = e.length;
  let s = t;
  for (; s < n; ) {
    const i = e.charCodeAt(s);
    switch (i) {
      // Ignored ::
      //   - UnicodeBOM
      //   - WhiteSpace
      //   - LineTerminator
      //   - Comment
      //   - Comma
      //
      // UnicodeBOM :: "Byte Order Mark (U+FEFF)"
      //
      // WhiteSpace ::
      //   - "Horizontal Tab (U+0009)"
      //   - "Space (U+0020)"
      //
      // Comma :: ,
      case 65279:
      // <BOM>
      case 9:
      // \t
      case 32:
      // <space>
      case 44:
        ++s;
        continue;
      // LineTerminator ::
      //   - "New Line (U+000A)"
      //   - "Carriage Return (U+000D)" [lookahead != "New Line (U+000A)"]
      //   - "Carriage Return (U+000D)" "New Line (U+000A)"
      case 10:
        ++s, ++r.line, r.lineStart = s;
        continue;
      case 13:
        e.charCodeAt(s + 1) === 10 ? s += 2 : ++s, ++r.line, r.lineStart = s;
        continue;
      // Comment
      case 35:
        return HC(r, s);
      // Token ::
      //   - Punctuator
      //   - Name
      //   - IntValue
      //   - FloatValue
      //   - StringValue
      //
      // Punctuator :: one of ! $ & ( ) ... : = @ [ ] { | }
      case 33:
        return be(r, Y.BANG, s, s + 1);
      case 36:
        return be(r, Y.DOLLAR, s, s + 1);
      case 38:
        return be(r, Y.AMP, s, s + 1);
      case 40:
        return be(r, Y.PAREN_L, s, s + 1);
      case 41:
        return be(r, Y.PAREN_R, s, s + 1);
      case 46:
        if (e.charCodeAt(s + 1) === 46 && e.charCodeAt(s + 2) === 46)
          return be(r, Y.SPREAD, s, s + 3);
        break;
      case 58:
        return be(r, Y.COLON, s, s + 1);
      case 61:
        return be(r, Y.EQUALS, s, s + 1);
      case 64:
        return be(r, Y.AT, s, s + 1);
      case 91:
        return be(r, Y.BRACKET_L, s, s + 1);
      case 93:
        return be(r, Y.BRACKET_R, s, s + 1);
      case 123:
        return be(r, Y.BRACE_L, s, s + 1);
      case 124:
        return be(r, Y.PIPE, s, s + 1);
      case 125:
        return be(r, Y.BRACE_R, s, s + 1);
      // StringValue
      case 34:
        return e.charCodeAt(s + 1) === 34 && e.charCodeAt(s + 2) === 34 ? JC(r, s) : WC(r, s);
    }
    if (ta(i) || i === 45)
      return VC(r, s, i);
    if (Mp(i))
      return qC(r, s);
    throw Ce(
      r.source,
      s,
      i === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : Ti(i) || No(e, s) ? `Unexpected character: ${Un(r, s)}.` : `Invalid character: ${Un(r, s)}.`
    );
  }
  return be(r, Y.EOF, n, n);
}
function HC(r, t) {
  const e = r.source.body, n = e.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = e.charCodeAt(s);
    if (i === 10 || i === 13)
      break;
    if (Ti(i))
      ++s;
    else if (No(e, s))
      s += 2;
    else
      break;
  }
  return be(
    r,
    Y.COMMENT,
    t,
    s,
    e.slice(t + 1, s)
  );
}
function VC(r, t, e) {
  const n = r.source.body;
  let s = t, i = e, a = !1;
  if (i === 45 && (i = n.charCodeAt(++s)), i === 48) {
    if (i = n.charCodeAt(++s), ta(i))
      throw Ce(
        r.source,
        s,
        `Invalid number, unexpected digit after 0: ${Un(
          r,
          s
        )}.`
      );
  } else
    s = Tc(r, s, i), i = n.charCodeAt(s);
  if (i === 46 && (a = !0, i = n.charCodeAt(++s), s = Tc(r, s, i), i = n.charCodeAt(s)), (i === 69 || i === 101) && (a = !0, i = n.charCodeAt(++s), (i === 43 || i === 45) && (i = n.charCodeAt(++s)), s = Tc(r, s, i), i = n.charCodeAt(s)), i === 46 || Mp(i))
    throw Ce(
      r.source,
      s,
      `Invalid number, expected digit but got: ${Un(
        r,
        s
      )}.`
    );
  return be(
    r,
    a ? Y.FLOAT : Y.INT,
    t,
    s,
    n.slice(t, s)
  );
}
function Tc(r, t, e) {
  if (!ta(e))
    throw Ce(
      r.source,
      t,
      `Invalid number, expected digit but got: ${Un(
        r,
        t
      )}.`
    );
  const n = r.source.body;
  let s = t + 1;
  for (; ta(n.charCodeAt(s)); )
    ++s;
  return s;
}
function WC(r, t) {
  const e = r.source.body, n = e.length;
  let s = t + 1, i = s, a = "";
  for (; s < n; ) {
    const o = e.charCodeAt(s);
    if (o === 34)
      return a += e.slice(i, s), be(r, Y.STRING, t, s + 1, a);
    if (o === 92) {
      a += e.slice(i, s);
      const d = e.charCodeAt(s + 1) === 117 ? e.charCodeAt(s + 2) === 123 ? YC(r, s) : jC(r, s) : ZC(r, s);
      a += d.value, s += d.size, i = s;
      continue;
    }
    if (o === 10 || o === 13)
      break;
    if (Ti(o))
      ++s;
    else if (No(e, s))
      s += 2;
    else
      throw Ce(
        r.source,
        s,
        `Invalid character within String: ${Un(
          r,
          s
        )}.`
      );
  }
  throw Ce(r.source, s, "Unterminated string.");
}
function YC(r, t) {
  const e = r.source.body;
  let n = 0, s = 3;
  for (; s < 12; ) {
    const i = e.charCodeAt(t + s++);
    if (i === 125) {
      if (s < 5 || !Ti(n))
        break;
      return {
        value: String.fromCodePoint(n),
        size: s
      };
    }
    if (n = n << 4 | Vi(i), n < 0)
      break;
  }
  throw Ce(
    r.source,
    t,
    `Invalid Unicode escape sequence: "${e.slice(
      t,
      t + s
    )}".`
  );
}
function jC(r, t) {
  const e = r.source.body, n = bl(e, t + 2);
  if (Ti(n))
    return {
      value: String.fromCodePoint(n),
      size: 6
    };
  if (Pp(n) && e.charCodeAt(t + 6) === 92 && e.charCodeAt(t + 7) === 117) {
    const s = bl(e, t + 8);
    if (Lp(s))
      return {
        value: String.fromCodePoint(n, s),
        size: 12
      };
  }
  throw Ce(
    r.source,
    t,
    `Invalid Unicode escape sequence: "${e.slice(t, t + 6)}".`
  );
}
function bl(r, t) {
  return Vi(r.charCodeAt(t)) << 12 | Vi(r.charCodeAt(t + 1)) << 8 | Vi(r.charCodeAt(t + 2)) << 4 | Vi(r.charCodeAt(t + 3));
}
function Vi(r) {
  return r >= 48 && r <= 57 ? r - 48 : r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : -1;
}
function ZC(r, t) {
  const e = r.source.body;
  switch (e.charCodeAt(t + 1)) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw Ce(
    r.source,
    t,
    `Invalid character escape sequence: "${e.slice(
      t,
      t + 2
    )}".`
  );
}
function JC(r, t) {
  const e = r.source.body, n = e.length;
  let s = r.lineStart, i = t + 3, a = i, o = "";
  const d = [];
  for (; i < n; ) {
    const h = e.charCodeAt(i);
    if (h === 34 && e.charCodeAt(i + 1) === 34 && e.charCodeAt(i + 2) === 34) {
      o += e.slice(a, i), d.push(o);
      const f = be(
        r,
        Y.BLOCK_STRING,
        t,
        i + 3,
        // Return a string of the lines joined with U+000A.
        LC(d).join(`
`)
      );
      return r.line += d.length - 1, r.lineStart = s, f;
    }
    if (h === 92 && e.charCodeAt(i + 1) === 34 && e.charCodeAt(i + 2) === 34 && e.charCodeAt(i + 3) === 34) {
      o += e.slice(a, i), a = i + 1, i += 4;
      continue;
    }
    if (h === 10 || h === 13) {
      o += e.slice(a, i), d.push(o), h === 13 && e.charCodeAt(i + 1) === 10 ? i += 2 : ++i, o = "", a = i, s = i;
      continue;
    }
    if (Ti(h))
      ++i;
    else if (No(e, i))
      i += 2;
    else
      throw Ce(
        r.source,
        i,
        `Invalid character within String: ${Un(
          r,
          i
        )}.`
      );
  }
  throw Ce(r.source, i, "Unterminated string.");
}
function qC(r, t) {
  const e = r.source.body, n = e.length;
  let s = t + 1;
  for (; s < n; ) {
    const i = e.charCodeAt(s);
    if (PC(i))
      ++s;
    else
      break;
  }
  return be(
    r,
    Y.NAME,
    t,
    s,
    e.slice(t, s)
  );
}
const $C = 10, kp = 2;
function Wd(r) {
  return Do(r, []);
}
function Do(r, t) {
  switch (typeof r) {
    case "string":
      return JSON.stringify(r);
    case "function":
      return r.name ? `[function ${r.name}]` : "[function]";
    case "object":
      return KC(r, t);
    default:
      return String(r);
  }
}
function KC(r, t) {
  if (r === null)
    return "null";
  if (t.includes(r))
    return "[Circular]";
  const e = [...t, r];
  if (tB(r)) {
    const n = r.toJSON();
    if (n !== r)
      return typeof n == "string" ? n : Do(n, e);
  } else if (Array.isArray(r))
    return rB(r, e);
  return eB(r, e);
}
function tB(r) {
  return typeof r.toJSON == "function";
}
function eB(r, t) {
  const e = Object.entries(r);
  return e.length === 0 ? "{}" : t.length > kp ? "[" + nB(r) + "]" : "{ " + e.map(
    ([s, i]) => s + ": " + Do(i, t)
  ).join(", ") + " }";
}
function rB(r, t) {
  if (r.length === 0)
    return "[]";
  if (t.length > kp)
    return "[Array]";
  const e = Math.min($C, r.length), n = r.length - e, s = [];
  for (let i = 0; i < e; ++i)
    s.push(Do(r[i], t));
  return n === 1 ? s.push("... 1 more item") : n > 1 && s.push(`... ${n} more items`), "[" + s.join(", ") + "]";
}
function nB(r) {
  const t = Object.prototype.toString.call(r).replace(/^\[object /, "").replace(/]$/, "");
  if (t === "Object" && typeof r.constructor == "function") {
    const e = r.constructor.name;
    if (typeof e == "string" && e !== "")
      return e;
  }
  return t;
}
const sB = globalThis.process && // eslint-disable-next-line no-undef
!0, iB = (
  /* c8 ignore next 6 */
  // FIXME: https://github.com/graphql/graphql-js/issues/2317
  sB ? function(t, e) {
    return t instanceof e;
  } : function(t, e) {
    if (t instanceof e)
      return !0;
    if (typeof t == "object" && t !== null) {
      var n;
      const s = e.prototype[Symbol.toStringTag], i = (
        // We still need to support constructor's name to detect conflicts with older versions of this library.
        Symbol.toStringTag in t ? t[Symbol.toStringTag] : (n = t.constructor) === null || n === void 0 ? void 0 : n.name
      );
      if (s === i) {
        const a = Wd(t);
        throw new Error(`Cannot use ${s} "${a}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return !1;
  }
);
class Up {
  constructor(t, e = "GraphQL request", n = {
    line: 1,
    column: 1
  }) {
    typeof t == "string" || Na(!1, `Body must be a string. Received: ${Wd(t)}.`), this.body = t, this.name = e, this.locationOffset = n, this.locationOffset.line > 0 || Na(
      !1,
      "line in locationOffset is 1-indexed and must be positive."
    ), this.locationOffset.column > 0 || Na(
      !1,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function aB(r) {
  return iB(r, Up);
}
function Gp(r, t) {
  const e = new oB(r, t), n = e.parseDocument();
  return Object.defineProperty(n, "tokenCount", {
    enumerable: !1,
    value: e.tokenCount
  }), n;
}
class oB {
  constructor(t, e = {}) {
    const n = aB(t) ? t : new Up(t);
    this._lexer = new GC(n), this._options = e, this._tokenCounter = 0;
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  /**
   * Converts a name lex token into a name parse node.
   */
  parseName() {
    const t = this.expectToken(Y.NAME);
    return this.node(t, {
      kind: dt.NAME,
      value: t.value
    });
  }
  // Implements the parsing rules in the Document section.
  /**
   * Document : Definition+
   */
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: dt.DOCUMENT,
      definitions: this.many(
        Y.SOF,
        this.parseDefinition,
        Y.EOF
      )
    });
  }
  /**
   * Definition :
   *   - ExecutableDefinition
   *   - TypeSystemDefinition
   *   - TypeSystemExtension
   *
   * ExecutableDefinition :
   *   - OperationDefinition
   *   - FragmentDefinition
   *
   * TypeSystemDefinition :
   *   - SchemaDefinition
   *   - TypeDefinition
   *   - DirectiveDefinition
   *
   * TypeDefinition :
   *   - ScalarTypeDefinition
   *   - ObjectTypeDefinition
   *   - InterfaceTypeDefinition
   *   - UnionTypeDefinition
   *   - EnumTypeDefinition
   *   - InputObjectTypeDefinition
   */
  parseDefinition() {
    if (this.peek(Y.BRACE_L))
      return this.parseOperationDefinition();
    const t = this.peekDescription(), e = t ? this._lexer.lookahead() : this._lexer.token;
    if (e.kind === Y.NAME) {
      switch (e.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (t)
        throw Ce(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (e.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(e);
  }
  // Implements the parsing rules in the Operations section.
  /**
   * OperationDefinition :
   *  - SelectionSet
   *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
   */
  parseOperationDefinition() {
    const t = this._lexer.token;
    if (this.peek(Y.BRACE_L))
      return this.node(t, {
        kind: dt.OPERATION_DEFINITION,
        operation: $n.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    const e = this.parseOperationType();
    let n;
    return this.peek(Y.NAME) && (n = this.parseName()), this.node(t, {
      kind: dt.OPERATION_DEFINITION,
      operation: e,
      name: n,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * OperationType : one of query mutation subscription
   */
  parseOperationType() {
    const t = this.expectToken(Y.NAME);
    switch (t.value) {
      case "query":
        return $n.QUERY;
      case "mutation":
        return $n.MUTATION;
      case "subscription":
        return $n.SUBSCRIPTION;
    }
    throw this.unexpected(t);
  }
  /**
   * VariableDefinitions : ( VariableDefinition+ )
   */
  parseVariableDefinitions() {
    return this.optionalMany(
      Y.PAREN_L,
      this.parseVariableDefinition,
      Y.PAREN_R
    );
  }
  /**
   * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
   */
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: dt.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(Y.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(Y.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  /**
   * Variable : $ Name
   */
  parseVariable() {
    const t = this._lexer.token;
    return this.expectToken(Y.DOLLAR), this.node(t, {
      kind: dt.VARIABLE,
      name: this.parseName()
    });
  }
  /**
   * ```
   * SelectionSet : { Selection+ }
   * ```
   */
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: dt.SELECTION_SET,
      selections: this.many(
        Y.BRACE_L,
        this.parseSelection,
        Y.BRACE_R
      )
    });
  }
  /**
   * Selection :
   *   - Field
   *   - FragmentSpread
   *   - InlineFragment
   */
  parseSelection() {
    return this.peek(Y.SPREAD) ? this.parseFragment() : this.parseField();
  }
  /**
   * Field : Alias? Name Arguments? Directives? SelectionSet?
   *
   * Alias : Name :
   */
  parseField() {
    const t = this._lexer.token, e = this.parseName();
    let n, s;
    return this.expectOptionalToken(Y.COLON) ? (n = e, s = this.parseName()) : s = e, this.node(t, {
      kind: dt.FIELD,
      alias: n,
      name: s,
      arguments: this.parseArguments(!1),
      directives: this.parseDirectives(!1),
      selectionSet: this.peek(Y.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  /**
   * Arguments[Const] : ( Argument[?Const]+ )
   */
  parseArguments(t) {
    const e = t ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(Y.PAREN_L, e, Y.PAREN_R);
  }
  /**
   * Argument[Const] : Name : Value[?Const]
   */
  parseArgument(t = !1) {
    const e = this._lexer.token, n = this.parseName();
    return this.expectToken(Y.COLON), this.node(e, {
      kind: dt.ARGUMENT,
      name: n,
      value: this.parseValueLiteral(t)
    });
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  // Implements the parsing rules in the Fragments section.
  /**
   * Corresponds to both FragmentSpread and InlineFragment in the spec.
   *
   * FragmentSpread : ... FragmentName Directives?
   *
   * InlineFragment : ... TypeCondition? Directives? SelectionSet
   */
  parseFragment() {
    const t = this._lexer.token;
    this.expectToken(Y.SPREAD);
    const e = this.expectOptionalKeyword("on");
    return !e && this.peek(Y.NAME) ? this.node(t, {
      kind: dt.FRAGMENT_SPREAD,
      name: this.parseFragmentName(),
      directives: this.parseDirectives(!1)
    }) : this.node(t, {
      kind: dt.INLINE_FRAGMENT,
      typeCondition: e ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentDefinition :
   *   - fragment FragmentName on TypeCondition Directives? SelectionSet
   *
   * TypeCondition : NamedType
   */
  parseFragmentDefinition() {
    const t = this._lexer.token;
    return this.expectKeyword("fragment"), this._options.allowLegacyFragmentVariables === !0 ? this.node(t, {
      kind: dt.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      variableDefinitions: this.parseVariableDefinitions(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    }) : this.node(t, {
      kind: dt.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(!1),
      selectionSet: this.parseSelectionSet()
    });
  }
  /**
   * FragmentName : Name but not `on`
   */
  parseFragmentName() {
    if (this._lexer.token.value === "on")
      throw this.unexpected();
    return this.parseName();
  }
  // Implements the parsing rules in the Values section.
  /**
   * Value[Const] :
   *   - [~Const] Variable
   *   - IntValue
   *   - FloatValue
   *   - StringValue
   *   - BooleanValue
   *   - NullValue
   *   - EnumValue
   *   - ListValue[?Const]
   *   - ObjectValue[?Const]
   *
   * BooleanValue : one of `true` `false`
   *
   * NullValue : `null`
   *
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseValueLiteral(t) {
    const e = this._lexer.token;
    switch (e.kind) {
      case Y.BRACKET_L:
        return this.parseList(t);
      case Y.BRACE_L:
        return this.parseObject(t);
      case Y.INT:
        return this.advanceLexer(), this.node(e, {
          kind: dt.INT,
          value: e.value
        });
      case Y.FLOAT:
        return this.advanceLexer(), this.node(e, {
          kind: dt.FLOAT,
          value: e.value
        });
      case Y.STRING:
      case Y.BLOCK_STRING:
        return this.parseStringLiteral();
      case Y.NAME:
        switch (this.advanceLexer(), e.value) {
          case "true":
            return this.node(e, {
              kind: dt.BOOLEAN,
              value: !0
            });
          case "false":
            return this.node(e, {
              kind: dt.BOOLEAN,
              value: !1
            });
          case "null":
            return this.node(e, {
              kind: dt.NULL
            });
          default:
            return this.node(e, {
              kind: dt.ENUM,
              value: e.value
            });
        }
      case Y.DOLLAR:
        if (t)
          if (this.expectToken(Y.DOLLAR), this._lexer.token.kind === Y.NAME) {
            const n = this._lexer.token.value;
            throw Ce(
              this._lexer.source,
              e.start,
              `Unexpected variable "$${n}" in constant value.`
            );
          } else
            throw this.unexpected(e);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    const t = this._lexer.token;
    return this.advanceLexer(), this.node(t, {
      kind: dt.STRING,
      value: t.value,
      block: t.kind === Y.BLOCK_STRING
    });
  }
  /**
   * ListValue[Const] :
   *   - [ ]
   *   - [ Value[?Const]+ ]
   */
  parseList(t) {
    const e = () => this.parseValueLiteral(t);
    return this.node(this._lexer.token, {
      kind: dt.LIST,
      values: this.any(Y.BRACKET_L, e, Y.BRACKET_R)
    });
  }
  /**
   * ```
   * ObjectValue[Const] :
   *   - { }
   *   - { ObjectField[?Const]+ }
   * ```
   */
  parseObject(t) {
    const e = () => this.parseObjectField(t);
    return this.node(this._lexer.token, {
      kind: dt.OBJECT,
      fields: this.any(Y.BRACE_L, e, Y.BRACE_R)
    });
  }
  /**
   * ObjectField[Const] : Name : Value[?Const]
   */
  parseObjectField(t) {
    const e = this._lexer.token, n = this.parseName();
    return this.expectToken(Y.COLON), this.node(e, {
      kind: dt.OBJECT_FIELD,
      name: n,
      value: this.parseValueLiteral(t)
    });
  }
  // Implements the parsing rules in the Directives section.
  /**
   * Directives[Const] : Directive[?Const]+
   */
  parseDirectives(t) {
    const e = [];
    for (; this.peek(Y.AT); )
      e.push(this.parseDirective(t));
    return e;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  /**
   * ```
   * Directive[Const] : @ Name Arguments[?Const]?
   * ```
   */
  parseDirective(t) {
    const e = this._lexer.token;
    return this.expectToken(Y.AT), this.node(e, {
      kind: dt.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(t)
    });
  }
  // Implements the parsing rules in the Types section.
  /**
   * Type :
   *   - NamedType
   *   - ListType
   *   - NonNullType
   */
  parseTypeReference() {
    const t = this._lexer.token;
    let e;
    if (this.expectOptionalToken(Y.BRACKET_L)) {
      const n = this.parseTypeReference();
      this.expectToken(Y.BRACKET_R), e = this.node(t, {
        kind: dt.LIST_TYPE,
        type: n
      });
    } else
      e = this.parseNamedType();
    return this.expectOptionalToken(Y.BANG) ? this.node(t, {
      kind: dt.NON_NULL_TYPE,
      type: e
    }) : e;
  }
  /**
   * NamedType : Name
   */
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: dt.NAMED_TYPE,
      name: this.parseName()
    });
  }
  // Implements the parsing rules in the Type Definition section.
  peekDescription() {
    return this.peek(Y.STRING) || this.peek(Y.BLOCK_STRING);
  }
  /**
   * Description : StringValue
   */
  parseDescription() {
    if (this.peekDescription())
      return this.parseStringLiteral();
  }
  /**
   * ```
   * SchemaDefinition : Description? schema Directives[Const]? { OperationTypeDefinition+ }
   * ```
   */
  parseSchemaDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("schema");
    const n = this.parseConstDirectives(), s = this.many(
      Y.BRACE_L,
      this.parseOperationTypeDefinition,
      Y.BRACE_R
    );
    return this.node(t, {
      kind: dt.SCHEMA_DEFINITION,
      description: e,
      directives: n,
      operationTypes: s
    });
  }
  /**
   * OperationTypeDefinition : OperationType : NamedType
   */
  parseOperationTypeDefinition() {
    const t = this._lexer.token, e = this.parseOperationType();
    this.expectToken(Y.COLON);
    const n = this.parseNamedType();
    return this.node(t, {
      kind: dt.OPERATION_TYPE_DEFINITION,
      operation: e,
      type: n
    });
  }
  /**
   * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
   */
  parseScalarTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("scalar");
    const n = this.parseName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: dt.SCALAR_TYPE_DEFINITION,
      description: e,
      name: n,
      directives: s
    });
  }
  /**
   * ObjectTypeDefinition :
   *   Description?
   *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
   */
  parseObjectTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("type");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: dt.OBJECT_TYPE_DEFINITION,
      description: e,
      name: n,
      interfaces: s,
      directives: i,
      fields: a
    });
  }
  /**
   * ImplementsInterfaces :
   *   - implements `&`? NamedType
   *   - ImplementsInterfaces & NamedType
   */
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(Y.AMP, this.parseNamedType) : [];
  }
  /**
   * ```
   * FieldsDefinition : { FieldDefinition+ }
   * ```
   */
  parseFieldsDefinition() {
    return this.optionalMany(
      Y.BRACE_L,
      this.parseFieldDefinition,
      Y.BRACE_R
    );
  }
  /**
   * FieldDefinition :
   *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
   */
  parseFieldDefinition() {
    const t = this._lexer.token, e = this.parseDescription(), n = this.parseName(), s = this.parseArgumentDefs();
    this.expectToken(Y.COLON);
    const i = this.parseTypeReference(), a = this.parseConstDirectives();
    return this.node(t, {
      kind: dt.FIELD_DEFINITION,
      description: e,
      name: n,
      arguments: s,
      type: i,
      directives: a
    });
  }
  /**
   * ArgumentsDefinition : ( InputValueDefinition+ )
   */
  parseArgumentDefs() {
    return this.optionalMany(
      Y.PAREN_L,
      this.parseInputValueDef,
      Y.PAREN_R
    );
  }
  /**
   * InputValueDefinition :
   *   - Description? Name : Type DefaultValue? Directives[Const]?
   */
  parseInputValueDef() {
    const t = this._lexer.token, e = this.parseDescription(), n = this.parseName();
    this.expectToken(Y.COLON);
    const s = this.parseTypeReference();
    let i;
    this.expectOptionalToken(Y.EQUALS) && (i = this.parseConstValueLiteral());
    const a = this.parseConstDirectives();
    return this.node(t, {
      kind: dt.INPUT_VALUE_DEFINITION,
      description: e,
      name: n,
      type: s,
      defaultValue: i,
      directives: a
    });
  }
  /**
   * InterfaceTypeDefinition :
   *   - Description? interface Name Directives[Const]? FieldsDefinition?
   */
  parseInterfaceTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("interface");
    const n = this.parseName(), s = this.parseImplementsInterfaces(), i = this.parseConstDirectives(), a = this.parseFieldsDefinition();
    return this.node(t, {
      kind: dt.INTERFACE_TYPE_DEFINITION,
      description: e,
      name: n,
      interfaces: s,
      directives: i,
      fields: a
    });
  }
  /**
   * UnionTypeDefinition :
   *   - Description? union Name Directives[Const]? UnionMemberTypes?
   */
  parseUnionTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("union");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseUnionMemberTypes();
    return this.node(t, {
      kind: dt.UNION_TYPE_DEFINITION,
      description: e,
      name: n,
      directives: s,
      types: i
    });
  }
  /**
   * UnionMemberTypes :
   *   - = `|`? NamedType
   *   - UnionMemberTypes | NamedType
   */
  parseUnionMemberTypes() {
    return this.expectOptionalToken(Y.EQUALS) ? this.delimitedMany(Y.PIPE, this.parseNamedType) : [];
  }
  /**
   * EnumTypeDefinition :
   *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
   */
  parseEnumTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("enum");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseEnumValuesDefinition();
    return this.node(t, {
      kind: dt.ENUM_TYPE_DEFINITION,
      description: e,
      name: n,
      directives: s,
      values: i
    });
  }
  /**
   * ```
   * EnumValuesDefinition : { EnumValueDefinition+ }
   * ```
   */
  parseEnumValuesDefinition() {
    return this.optionalMany(
      Y.BRACE_L,
      this.parseEnumValueDefinition,
      Y.BRACE_R
    );
  }
  /**
   * EnumValueDefinition : Description? EnumValue Directives[Const]?
   */
  parseEnumValueDefinition() {
    const t = this._lexer.token, e = this.parseDescription(), n = this.parseEnumValueName(), s = this.parseConstDirectives();
    return this.node(t, {
      kind: dt.ENUM_VALUE_DEFINITION,
      description: e,
      name: n,
      directives: s
    });
  }
  /**
   * EnumValue : Name but not `true`, `false` or `null`
   */
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null")
      throw Ce(
        this._lexer.source,
        this._lexer.token.start,
        `${ba(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  /**
   * InputObjectTypeDefinition :
   *   - Description? input Name Directives[Const]? InputFieldsDefinition?
   */
  parseInputObjectTypeDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("input");
    const n = this.parseName(), s = this.parseConstDirectives(), i = this.parseInputFieldsDefinition();
    return this.node(t, {
      kind: dt.INPUT_OBJECT_TYPE_DEFINITION,
      description: e,
      name: n,
      directives: s,
      fields: i
    });
  }
  /**
   * ```
   * InputFieldsDefinition : { InputValueDefinition+ }
   * ```
   */
  parseInputFieldsDefinition() {
    return this.optionalMany(
      Y.BRACE_L,
      this.parseInputValueDef,
      Y.BRACE_R
    );
  }
  /**
   * TypeSystemExtension :
   *   - SchemaExtension
   *   - TypeExtension
   *
   * TypeExtension :
   *   - ScalarTypeExtension
   *   - ObjectTypeExtension
   *   - InterfaceTypeExtension
   *   - UnionTypeExtension
   *   - EnumTypeExtension
   *   - InputObjectTypeDefinition
   */
  parseTypeSystemExtension() {
    const t = this._lexer.lookahead();
    if (t.kind === Y.NAME)
      switch (t.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(t);
  }
  /**
   * ```
   * SchemaExtension :
   *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
   *  - extend schema Directives[Const]
   * ```
   */
  parseSchemaExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    const e = this.parseConstDirectives(), n = this.optionalMany(
      Y.BRACE_L,
      this.parseOperationTypeDefinition,
      Y.BRACE_R
    );
    if (e.length === 0 && n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: dt.SCHEMA_EXTENSION,
      directives: e,
      operationTypes: n
    });
  }
  /**
   * ScalarTypeExtension :
   *   - extend scalar Name Directives[Const]
   */
  parseScalarTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    const e = this.parseName(), n = this.parseConstDirectives();
    if (n.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: dt.SCALAR_TYPE_EXTENSION,
      name: e,
      directives: n
    });
  }
  /**
   * ObjectTypeExtension :
   *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend type Name ImplementsInterfaces? Directives[Const]
   *  - extend type Name ImplementsInterfaces
   */
  parseObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    const e = this.parseName(), n = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (n.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: dt.OBJECT_TYPE_EXTENSION,
      name: e,
      interfaces: n,
      directives: s,
      fields: i
    });
  }
  /**
   * InterfaceTypeExtension :
   *  - extend interface Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
   *  - extend interface Name ImplementsInterfaces? Directives[Const]
   *  - extend interface Name ImplementsInterfaces
   */
  parseInterfaceTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    const e = this.parseName(), n = this.parseImplementsInterfaces(), s = this.parseConstDirectives(), i = this.parseFieldsDefinition();
    if (n.length === 0 && s.length === 0 && i.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: dt.INTERFACE_TYPE_EXTENSION,
      name: e,
      interfaces: n,
      directives: s,
      fields: i
    });
  }
  /**
   * UnionTypeExtension :
   *   - extend union Name Directives[Const]? UnionMemberTypes
   *   - extend union Name Directives[Const]
   */
  parseUnionTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    const e = this.parseName(), n = this.parseConstDirectives(), s = this.parseUnionMemberTypes();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: dt.UNION_TYPE_EXTENSION,
      name: e,
      directives: n,
      types: s
    });
  }
  /**
   * EnumTypeExtension :
   *   - extend enum Name Directives[Const]? EnumValuesDefinition
   *   - extend enum Name Directives[Const]
   */
  parseEnumTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    const e = this.parseName(), n = this.parseConstDirectives(), s = this.parseEnumValuesDefinition();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: dt.ENUM_TYPE_EXTENSION,
      name: e,
      directives: n,
      values: s
    });
  }
  /**
   * InputObjectTypeExtension :
   *   - extend input Name Directives[Const]? InputFieldsDefinition
   *   - extend input Name Directives[Const]
   */
  parseInputObjectTypeExtension() {
    const t = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    const e = this.parseName(), n = this.parseConstDirectives(), s = this.parseInputFieldsDefinition();
    if (n.length === 0 && s.length === 0)
      throw this.unexpected();
    return this.node(t, {
      kind: dt.INPUT_OBJECT_TYPE_EXTENSION,
      name: e,
      directives: n,
      fields: s
    });
  }
  /**
   * ```
   * DirectiveDefinition :
   *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
   * ```
   */
  parseDirectiveDefinition() {
    const t = this._lexer.token, e = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(Y.AT);
    const n = this.parseName(), s = this.parseArgumentDefs(), i = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const a = this.parseDirectiveLocations();
    return this.node(t, {
      kind: dt.DIRECTIVE_DEFINITION,
      description: e,
      name: n,
      arguments: s,
      repeatable: i,
      locations: a
    });
  }
  /**
   * DirectiveLocations :
   *   - `|`? DirectiveLocation
   *   - DirectiveLocations | DirectiveLocation
   */
  parseDirectiveLocations() {
    return this.delimitedMany(Y.PIPE, this.parseDirectiveLocation);
  }
  /*
   * DirectiveLocation :
   *   - ExecutableDirectiveLocation
   *   - TypeSystemDirectiveLocation
   *
   * ExecutableDirectiveLocation : one of
   *   `QUERY`
   *   `MUTATION`
   *   `SUBSCRIPTION`
   *   `FIELD`
   *   `FRAGMENT_DEFINITION`
   *   `FRAGMENT_SPREAD`
   *   `INLINE_FRAGMENT`
   *
   * TypeSystemDirectiveLocation : one of
   *   `SCHEMA`
   *   `SCALAR`
   *   `OBJECT`
   *   `FIELD_DEFINITION`
   *   `ARGUMENT_DEFINITION`
   *   `INTERFACE`
   *   `UNION`
   *   `ENUM`
   *   `ENUM_VALUE`
   *   `INPUT_OBJECT`
   *   `INPUT_FIELD_DEFINITION`
   */
  parseDirectiveLocation() {
    const t = this._lexer.token, e = this.parseName();
    if (Object.prototype.hasOwnProperty.call(id, e.value))
      return e;
    throw this.unexpected(t);
  }
  // Core parsing utility functions
  /**
   * Returns a node that, if configured to do so, sets a "loc" field as a
   * location object, used to identify the place in the source that created a
   * given parsed object.
   */
  node(t, e) {
    return this._options.noLocation !== !0 && (e.loc = new OC(
      t,
      this._lexer.lastToken,
      this._lexer.source
    )), e;
  }
  /**
   * Determines if the next token is of a given kind
   */
  peek(t) {
    return this._lexer.token.kind === t;
  }
  /**
   * If the next token is of the given kind, return that token after advancing the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectToken(t) {
    const e = this._lexer.token;
    if (e.kind === t)
      return this.advanceLexer(), e;
    throw Ce(
      this._lexer.source,
      e.start,
      `Expected ${zp(t)}, found ${ba(e)}.`
    );
  }
  /**
   * If the next token is of the given kind, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalToken(t) {
    return this._lexer.token.kind === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * If the next token is a given keyword, advance the lexer.
   * Otherwise, do not change the parser state and throw an error.
   */
  expectKeyword(t) {
    const e = this._lexer.token;
    if (e.kind === Y.NAME && e.value === t)
      this.advanceLexer();
    else
      throw Ce(
        this._lexer.source,
        e.start,
        `Expected "${t}", found ${ba(e)}.`
      );
  }
  /**
   * If the next token is a given keyword, return "true" after advancing the lexer.
   * Otherwise, do not change the parser state and return "false".
   */
  expectOptionalKeyword(t) {
    const e = this._lexer.token;
    return e.kind === Y.NAME && e.value === t ? (this.advanceLexer(), !0) : !1;
  }
  /**
   * Helper function for creating an error when an unexpected lexed token is encountered.
   */
  unexpected(t) {
    const e = t ?? this._lexer.token;
    return Ce(
      this._lexer.source,
      e.start,
      `Unexpected ${ba(e)}.`
    );
  }
  /**
   * Returns a possibly empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  any(t, e, n) {
    this.expectToken(t);
    const s = [];
    for (; !this.expectOptionalToken(n); )
      s.push(e.call(this));
    return s;
  }
  /**
   * Returns a list of parse nodes, determined by the parseFn.
   * It can be empty only if open token is missing otherwise it will always return non-empty list
   * that begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  optionalMany(t, e, n) {
    if (this.expectOptionalToken(t)) {
      const s = [];
      do
        s.push(e.call(this));
      while (!this.expectOptionalToken(n));
      return s;
    }
    return [];
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list begins with a lex token of openKind and ends with a lex token of closeKind.
   * Advances the parser to the next lex token after the closing token.
   */
  many(t, e, n) {
    this.expectToken(t);
    const s = [];
    do
      s.push(e.call(this));
    while (!this.expectOptionalToken(n));
    return s;
  }
  /**
   * Returns a non-empty list of parse nodes, determined by the parseFn.
   * This list may begin with a lex token of delimiterKind followed by items separated by lex tokens of tokenKind.
   * Advances the parser to the next lex token after last item in the list.
   */
  delimitedMany(t, e) {
    this.expectOptionalToken(t);
    const n = [];
    do
      n.push(e.call(this));
    while (this.expectOptionalToken(t));
    return n;
  }
  advanceLexer() {
    const { maxTokens: t } = this._options, e = this._lexer.advance();
    if (e.kind !== Y.EOF && (++this._tokenCounter, t !== void 0 && this._tokenCounter > t))
      throw Ce(
        this._lexer.source,
        e.start,
        `Document contains more that ${t} tokens. Parsing aborted.`
      );
  }
}
function ba(r) {
  const t = r.value;
  return zp(r.kind) + (t != null ? ` "${t}"` : "");
}
function zp(r) {
  return zC(r) ? `"${r}"` : r;
}
function cB(r) {
  return `"${r.replace(dB, uB)}"`;
}
const dB = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function uB(r) {
  return hB[r.charCodeAt(0)];
}
const hB = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 2F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 3F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 4F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  // 5F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  // 6F
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
], AB = Object.freeze({});
function lB(r, t, e = Qp) {
  const n = /* @__PURE__ */ new Map();
  for (const U of Object.values(dt))
    n.set(U, _B(t, U));
  let s, i = Array.isArray(r), a = [r], o = -1, d = [], h = r, f, g;
  const y = [], R = [];
  do {
    o++;
    const U = o === a.length, H = U && d.length !== 0;
    if (U) {
      if (f = R.length === 0 ? void 0 : y[y.length - 1], h = g, g = R.pop(), H)
        if (i) {
          h = h.slice();
          let P = 0;
          for (const [M, O] of d) {
            const k = M - P;
            O === null ? (h.splice(k, 1), P++) : h[k] = O;
          }
        } else {
          h = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(h)
          );
          for (const [P, M] of d)
            h[P] = M;
        }
      o = s.index, a = s.keys, d = s.edits, i = s.inArray, s = s.prev;
    } else if (g) {
      if (f = i ? o : a[o], h = g[f], h == null)
        continue;
      y.push(f);
    }
    let X;
    if (!Array.isArray(h)) {
      var Q, x;
      yl(h) || Na(!1, `Invalid AST Node: ${Wd(h)}.`);
      const P = U ? (Q = n.get(h.kind)) === null || Q === void 0 ? void 0 : Q.leave : (x = n.get(h.kind)) === null || x === void 0 ? void 0 : x.enter;
      if (X = P == null ? void 0 : P.call(t, h, f, g, y, R), X === AB)
        break;
      if (X === !1) {
        if (!U) {
          y.pop();
          continue;
        }
      } else if (X !== void 0 && (d.push([f, X]), !U))
        if (yl(X))
          h = X;
        else {
          y.pop();
          continue;
        }
    }
    if (X === void 0 && H && d.push([f, h]), U)
      y.pop();
    else {
      var N;
      s = {
        inArray: i,
        index: o,
        keys: a,
        edits: d,
        prev: s
      }, i = Array.isArray(h), a = i ? h : (N = e[h.kind]) !== null && N !== void 0 ? N : [], o = -1, d = [], g && R.push(g), g = h;
    }
  } while (s !== void 0);
  return d.length !== 0 ? d[d.length - 1][1] : r;
}
function _B(r, t) {
  const e = r[t];
  return typeof e == "object" ? e : typeof e == "function" ? {
    enter: e,
    leave: void 0
  } : {
    enter: r.enter,
    leave: r.leave
  };
}
function Xp(r) {
  return lB(r, fB);
}
const pB = 80, fB = {
  Name: {
    leave: (r) => r.value
  },
  Variable: {
    leave: (r) => "$" + r.name
  },
  // Document
  Document: {
    leave: (r) => it(r.definitions, `

`)
  },
  OperationDefinition: {
    leave(r) {
      const t = bt("(", it(r.variableDefinitions, ", "), ")"), e = it(
        [
          r.operation,
          it([r.name, t]),
          it(r.directives, " ")
        ],
        " "
      );
      return (e === "query" ? "" : e + " ") + r.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable: r, type: t, defaultValue: e, directives: n }) => r + ": " + t + bt(" = ", e) + bt(" ", it(n, " "))
  },
  SelectionSet: {
    leave: ({ selections: r }) => ir(r)
  },
  Field: {
    leave({ alias: r, name: t, arguments: e, directives: n, selectionSet: s }) {
      const i = bt("", r, ": ") + t;
      let a = i + bt("(", it(e, ", "), ")");
      return a.length > pB && (a = i + bt(`(
`, Da(it(e, `
`)), `
)`)), it([a, it(n, " "), s], " ");
    }
  },
  Argument: {
    leave: ({ name: r, value: t }) => r + ": " + t
  },
  // Fragments
  FragmentSpread: {
    leave: ({ name: r, directives: t }) => "..." + r + bt(" ", it(t, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition: r, directives: t, selectionSet: e }) => it(
      [
        "...",
        bt("on ", r),
        it(t, " "),
        e
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name: r, typeCondition: t, variableDefinitions: e, directives: n, selectionSet: s }) => (
      // or removed in the future.
      `fragment ${r}${bt("(", it(e, ", "), ")")} on ${t} ${bt("", it(n, " "), " ")}` + s
    )
  },
  // Value
  IntValue: {
    leave: ({ value: r }) => r
  },
  FloatValue: {
    leave: ({ value: r }) => r
  },
  StringValue: {
    leave: ({ value: r, block: t }) => t ? UC(r) : cB(r)
  },
  BooleanValue: {
    leave: ({ value: r }) => r ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value: r }) => r
  },
  ListValue: {
    leave: ({ values: r }) => "[" + it(r, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields: r }) => "{" + it(r, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name: r, value: t }) => r + ": " + t
  },
  // Directive
  Directive: {
    leave: ({ name: r, arguments: t }) => "@" + r + bt("(", it(t, ", "), ")")
  },
  // Type
  NamedType: {
    leave: ({ name: r }) => r
  },
  ListType: {
    leave: ({ type: r }) => "[" + r + "]"
  },
  NonNullType: {
    leave: ({ type: r }) => r + "!"
  },
  // Type System Definitions
  SchemaDefinition: {
    leave: ({ description: r, directives: t, operationTypes: e }) => bt("", r, `
`) + it(["schema", it(t, " "), ir(e)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation: r, type: t }) => r + ": " + t
  },
  ScalarTypeDefinition: {
    leave: ({ description: r, name: t, directives: e }) => bt("", r, `
`) + it(["scalar", t, it(e, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description: r, name: t, interfaces: e, directives: n, fields: s }) => bt("", r, `
`) + it(
      [
        "type",
        t,
        bt("implements ", it(e, " & ")),
        it(n, " "),
        ir(s)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description: r, name: t, arguments: e, type: n, directives: s }) => bt("", r, `
`) + t + (Il(e) ? bt(`(
`, Da(it(e, `
`)), `
)`) : bt("(", it(e, ", "), ")")) + ": " + n + bt(" ", it(s, " "))
  },
  InputValueDefinition: {
    leave: ({ description: r, name: t, type: e, defaultValue: n, directives: s }) => bt("", r, `
`) + it(
      [t + ": " + e, bt("= ", n), it(s, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description: r, name: t, interfaces: e, directives: n, fields: s }) => bt("", r, `
`) + it(
      [
        "interface",
        t,
        bt("implements ", it(e, " & ")),
        it(n, " "),
        ir(s)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description: r, name: t, directives: e, types: n }) => bt("", r, `
`) + it(
      ["union", t, it(e, " "), bt("= ", it(n, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description: r, name: t, directives: e, values: n }) => bt("", r, `
`) + it(["enum", t, it(e, " "), ir(n)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description: r, name: t, directives: e }) => bt("", r, `
`) + it([t, it(e, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description: r, name: t, directives: e, fields: n }) => bt("", r, `
`) + it(["input", t, it(e, " "), ir(n)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description: r, name: t, arguments: e, repeatable: n, locations: s }) => bt("", r, `
`) + "directive @" + t + (Il(e) ? bt(`(
`, Da(it(e, `
`)), `
)`) : bt("(", it(e, ", "), ")")) + (n ? " repeatable" : "") + " on " + it(s, " | ")
  },
  SchemaExtension: {
    leave: ({ directives: r, operationTypes: t }) => it(
      ["extend schema", it(r, " "), ir(t)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name: r, directives: t }) => it(["extend scalar", r, it(t, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name: r, interfaces: t, directives: e, fields: n }) => it(
      [
        "extend type",
        r,
        bt("implements ", it(t, " & ")),
        it(e, " "),
        ir(n)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name: r, interfaces: t, directives: e, fields: n }) => it(
      [
        "extend interface",
        r,
        bt("implements ", it(t, " & ")),
        it(e, " "),
        ir(n)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name: r, directives: t, types: e }) => it(
      [
        "extend union",
        r,
        it(t, " "),
        bt("= ", it(e, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name: r, directives: t, values: e }) => it(["extend enum", r, it(t, " "), ir(e)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name: r, directives: t, fields: e }) => it(["extend input", r, it(t, " "), ir(e)], " ")
  }
};
function it(r, t = "") {
  var e;
  return (e = r == null ? void 0 : r.filter((n) => n).join(t)) !== null && e !== void 0 ? e : "";
}
function ir(r) {
  return bt(`{
`, Da(it(r, `
`)), `
}`);
}
function bt(r, t, e = "") {
  return t != null && t !== "" ? r + t + e : "";
}
function Da(r) {
  return bt("  ", r.replace(/\n/g, `
  `));
}
function Il(r) {
  var t;
  return (t = r == null ? void 0 : r.some((e) => e.includes(`
`))) !== null && t !== void 0 ? t : !1;
}
const El = (r) => {
  var n, s;
  let t;
  const e = r.definitions.filter((i) => i.kind === "OperationDefinition");
  return e.length === 1 && (t = (s = (n = e[0]) == null ? void 0 : n.name) == null ? void 0 : s.value), t;
}, Nc = (r) => {
  if (typeof r == "string") {
    let e;
    try {
      const n = Gp(r);
      e = El(n);
    } catch {
    }
    return { query: r, operationName: e };
  }
  const t = El(r);
  return { query: Xp(r), operationName: t };
};
class Zi extends Error {
  constructor(t, e) {
    const n = `${Zi.extractMessage(t)}: ${JSON.stringify({
      response: t,
      request: e
    })}`;
    super(n), Object.setPrototypeOf(this, Zi.prototype), this.response = t, this.request = e, typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, Zi);
  }
  static extractMessage(t) {
    var e, n;
    return ((n = (e = t.errors) == null ? void 0 : e[0]) == null ? void 0 : n.message) ?? `GraphQL Error (Code: ${t.status})`;
  }
}
var Ia = { exports: {} }, Cl;
function gB() {
  return Cl || (Cl = 1, function(r, t) {
    var e = typeof globalThis < "u" && globalThis || typeof self < "u" && self || typeof jA < "u" && jA, n = function() {
      function i() {
        this.fetch = !1, this.DOMException = e.DOMException;
      }
      return i.prototype = e, new i();
    }();
    (function(i) {
      (function(a) {
        var o = typeof i < "u" && i || typeof self < "u" && self || typeof o < "u" && o, d = {
          searchParams: "URLSearchParams" in o,
          iterable: "Symbol" in o && "iterator" in Symbol,
          blob: "FileReader" in o && "Blob" in o && function() {
            try {
              return new Blob(), !0;
            } catch {
              return !1;
            }
          }(),
          formData: "FormData" in o,
          arrayBuffer: "ArrayBuffer" in o
        };
        function h(A) {
          return A && DataView.prototype.isPrototypeOf(A);
        }
        if (d.arrayBuffer)
          var f = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ], g = ArrayBuffer.isView || function(A) {
            return A && f.indexOf(Object.prototype.toString.call(A)) > -1;
          };
        function y(A) {
          if (typeof A != "string" && (A = String(A)), /[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(A) || A === "")
            throw new TypeError('Invalid character in header field name: "' + A + '"');
          return A.toLowerCase();
        }
        function R(A) {
          return typeof A != "string" && (A = String(A)), A;
        }
        function Q(A) {
          var p = {
            next: function() {
              var m = A.shift();
              return { done: m === void 0, value: m };
            }
          };
          return d.iterable && (p[Symbol.iterator] = function() {
            return p;
          }), p;
        }
        function x(A) {
          this.map = {}, A instanceof x ? A.forEach(function(p, m) {
            this.append(m, p);
          }, this) : Array.isArray(A) ? A.forEach(function(p) {
            this.append(p[0], p[1]);
          }, this) : A && Object.getOwnPropertyNames(A).forEach(function(p) {
            this.append(p, A[p]);
          }, this);
        }
        x.prototype.append = function(A, p) {
          A = y(A), p = R(p);
          var m = this.map[A];
          this.map[A] = m ? m + ", " + p : p;
        }, x.prototype.delete = function(A) {
          delete this.map[y(A)];
        }, x.prototype.get = function(A) {
          return A = y(A), this.has(A) ? this.map[A] : null;
        }, x.prototype.has = function(A) {
          return this.map.hasOwnProperty(y(A));
        }, x.prototype.set = function(A, p) {
          this.map[y(A)] = R(p);
        }, x.prototype.forEach = function(A, p) {
          for (var m in this.map)
            this.map.hasOwnProperty(m) && A.call(p, this.map[m], m, this);
        }, x.prototype.keys = function() {
          var A = [];
          return this.forEach(function(p, m) {
            A.push(m);
          }), Q(A);
        }, x.prototype.values = function() {
          var A = [];
          return this.forEach(function(p) {
            A.push(p);
          }), Q(A);
        }, x.prototype.entries = function() {
          var A = [];
          return this.forEach(function(p, m) {
            A.push([m, p]);
          }), Q(A);
        }, d.iterable && (x.prototype[Symbol.iterator] = x.prototype.entries);
        function N(A) {
          if (A.bodyUsed)
            return Promise.reject(new TypeError("Already read"));
          A.bodyUsed = !0;
        }
        function U(A) {
          return new Promise(function(p, m) {
            A.onload = function() {
              p(A.result);
            }, A.onerror = function() {
              m(A.error);
            };
          });
        }
        function H(A) {
          var p = new FileReader(), m = U(p);
          return p.readAsArrayBuffer(A), m;
        }
        function X(A) {
          var p = new FileReader(), m = U(p);
          return p.readAsText(A), m;
        }
        function P(A) {
          for (var p = new Uint8Array(A), m = new Array(p.length), b = 0; b < p.length; b++)
            m[b] = String.fromCharCode(p[b]);
          return m.join("");
        }
        function M(A) {
          if (A.slice)
            return A.slice(0);
          var p = new Uint8Array(A.byteLength);
          return p.set(new Uint8Array(A)), p.buffer;
        }
        function O() {
          return this.bodyUsed = !1, this._initBody = function(A) {
            this.bodyUsed = this.bodyUsed, this._bodyInit = A, A ? typeof A == "string" ? this._bodyText = A : d.blob && Blob.prototype.isPrototypeOf(A) ? this._bodyBlob = A : d.formData && FormData.prototype.isPrototypeOf(A) ? this._bodyFormData = A : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) ? this._bodyText = A.toString() : d.arrayBuffer && d.blob && h(A) ? (this._bodyArrayBuffer = M(A.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer])) : d.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(A) || g(A)) ? this._bodyArrayBuffer = M(A) : this._bodyText = A = Object.prototype.toString.call(A) : this._bodyText = "", this.headers.get("content-type") || (typeof A == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : d.searchParams && URLSearchParams.prototype.isPrototypeOf(A) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"));
          }, d.blob && (this.blob = function() {
            var A = N(this);
            if (A)
              return A;
            if (this._bodyBlob)
              return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]));
          }, this.arrayBuffer = function() {
            if (this._bodyArrayBuffer) {
              var A = N(this);
              return A || (ArrayBuffer.isView(this._bodyArrayBuffer) ? Promise.resolve(
                this._bodyArrayBuffer.buffer.slice(
                  this._bodyArrayBuffer.byteOffset,
                  this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                )
              ) : Promise.resolve(this._bodyArrayBuffer));
            } else
              return this.blob().then(H);
          }), this.text = function() {
            var A = N(this);
            if (A)
              return A;
            if (this._bodyBlob)
              return X(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(P(this._bodyArrayBuffer));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as text");
            return Promise.resolve(this._bodyText);
          }, d.formData && (this.formData = function() {
            return this.text().then(j);
          }), this.json = function() {
            return this.text().then(JSON.parse);
          }, this;
        }
        var k = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function G(A) {
          var p = A.toUpperCase();
          return k.indexOf(p) > -1 ? p : A;
        }
        function z(A, p) {
          if (!(this instanceof z))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          p = p || {};
          var m = p.body;
          if (A instanceof z) {
            if (A.bodyUsed)
              throw new TypeError("Already read");
            this.url = A.url, this.credentials = A.credentials, p.headers || (this.headers = new x(A.headers)), this.method = A.method, this.mode = A.mode, this.signal = A.signal, !m && A._bodyInit != null && (m = A._bodyInit, A.bodyUsed = !0);
          } else
            this.url = String(A);
          if (this.credentials = p.credentials || this.credentials || "same-origin", (p.headers || !this.headers) && (this.headers = new x(p.headers)), this.method = G(p.method || this.method || "GET"), this.mode = p.mode || this.mode || null, this.signal = p.signal || this.signal, this.referrer = null, (this.method === "GET" || this.method === "HEAD") && m)
            throw new TypeError("Body not allowed for GET or HEAD requests");
          if (this._initBody(m), (this.method === "GET" || this.method === "HEAD") && (p.cache === "no-store" || p.cache === "no-cache")) {
            var b = /([?&])_=[^&]*/;
            if (b.test(this.url))
              this.url = this.url.replace(b, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
            else {
              var S = /\?/;
              this.url += (S.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
            }
          }
        }
        z.prototype.clone = function() {
          return new z(this, { body: this._bodyInit });
        };
        function j(A) {
          var p = new FormData();
          return A.trim().split("&").forEach(function(m) {
            if (m) {
              var b = m.split("="), S = b.shift().replace(/\+/g, " "), F = b.join("=").replace(/\+/g, " ");
              p.append(decodeURIComponent(S), decodeURIComponent(F));
            }
          }), p;
        }
        function Z(A) {
          var p = new x(), m = A.replace(/\r?\n[\t ]+/g, " ");
          return m.split("\r").map(function(b) {
            return b.indexOf(`
`) === 0 ? b.substr(1, b.length) : b;
          }).forEach(function(b) {
            var S = b.split(":"), F = S.shift().trim();
            if (F) {
              var I = S.join(":").trim();
              p.append(F, I);
            }
          }), p;
        }
        O.call(z.prototype);
        function $(A, p) {
          if (!(this instanceof $))
            throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
          p || (p = {}), this.type = "default", this.status = p.status === void 0 ? 200 : p.status, this.ok = this.status >= 200 && this.status < 300, this.statusText = p.statusText === void 0 ? "" : "" + p.statusText, this.headers = new x(p.headers), this.url = p.url || "", this._initBody(A);
        }
        O.call($.prototype), $.prototype.clone = function() {
          return new $(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new x(this.headers),
            url: this.url
          });
        }, $.error = function() {
          var A = new $(null, { status: 0, statusText: "" });
          return A.type = "error", A;
        };
        var v = [301, 302, 303, 307, 308];
        $.redirect = function(A, p) {
          if (v.indexOf(p) === -1)
            throw new RangeError("Invalid status code");
          return new $(null, { status: p, headers: { location: A } });
        }, a.DOMException = o.DOMException;
        try {
          new a.DOMException();
        } catch {
          a.DOMException = function(p, m) {
            this.message = p, this.name = m;
            var b = Error(p);
            this.stack = b.stack;
          }, a.DOMException.prototype = Object.create(Error.prototype), a.DOMException.prototype.constructor = a.DOMException;
        }
        function u(A, p) {
          return new Promise(function(m, b) {
            var S = new z(A, p);
            if (S.signal && S.signal.aborted)
              return b(new a.DOMException("Aborted", "AbortError"));
            var F = new XMLHttpRequest();
            function I() {
              F.abort();
            }
            F.onload = function() {
              var C = {
                status: F.status,
                statusText: F.statusText,
                headers: Z(F.getAllResponseHeaders() || "")
              };
              C.url = "responseURL" in F ? F.responseURL : C.headers.get("X-Request-URL");
              var tt = "response" in F ? F.response : F.responseText;
              setTimeout(function() {
                m(new $(tt, C));
              }, 0);
            }, F.onerror = function() {
              setTimeout(function() {
                b(new TypeError("Network request failed"));
              }, 0);
            }, F.ontimeout = function() {
              setTimeout(function() {
                b(new TypeError("Network request failed"));
              }, 0);
            }, F.onabort = function() {
              setTimeout(function() {
                b(new a.DOMException("Aborted", "AbortError"));
              }, 0);
            };
            function _(C) {
              try {
                return C === "" && o.location.href ? o.location.href : C;
              } catch {
                return C;
              }
            }
            F.open(S.method, _(S.url), !0), S.credentials === "include" ? F.withCredentials = !0 : S.credentials === "omit" && (F.withCredentials = !1), "responseType" in F && (d.blob ? F.responseType = "blob" : d.arrayBuffer && S.headers.get("Content-Type") && S.headers.get("Content-Type").indexOf("application/octet-stream") !== -1 && (F.responseType = "arraybuffer")), p && typeof p.headers == "object" && !(p.headers instanceof x) ? Object.getOwnPropertyNames(p.headers).forEach(function(C) {
              F.setRequestHeader(C, R(p.headers[C]));
            }) : S.headers.forEach(function(C, tt) {
              F.setRequestHeader(tt, C);
            }), S.signal && (S.signal.addEventListener("abort", I), F.onreadystatechange = function() {
              F.readyState === 4 && S.signal.removeEventListener("abort", I);
            }), F.send(typeof S._bodyInit > "u" ? null : S._bodyInit);
          });
        }
        return u.polyfill = !0, o.fetch || (o.fetch = u, o.Headers = x, o.Request = z, o.Response = $), a.Headers = x, a.Request = z, a.Response = $, a.fetch = u, a;
      })({});
    })(n), n.fetch.ponyfill = !0, delete n.fetch.polyfill;
    var s = e.fetch ? e : n;
    t = s.fetch, t.default = s.fetch, t.fetch = s.fetch, t.Headers = s.Headers, t.Request = s.Request, t.Response = s.Response, r.exports = t;
  }(Ia, Ia.exports)), Ia.exports;
}
var co = gB();
const Fa = /* @__PURE__ */ y_(co), wB = /* @__PURE__ */ iw({
  __proto__: null,
  default: Fa
}, [co]), Yn = (r) => {
  let t = {};
  return r && (typeof Headers < "u" && r instanceof Headers || wB && co.Headers && r instanceof co.Headers ? t = vC(r) : Array.isArray(r) ? r.forEach(([e, n]) => {
    e && n !== void 0 && (t[e] = n);
  }) : t = r), t;
}, Bl = (r) => r.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim(), mB = (r) => {
  if (!Array.isArray(r.query)) {
    const n = r, s = [`query=${encodeURIComponent(Bl(n.query))}`];
    return r.variables && s.push(`variables=${encodeURIComponent(n.jsonSerializer.stringify(n.variables))}`), n.operationName && s.push(`operationName=${encodeURIComponent(n.operationName)}`), s.join("&");
  }
  if (typeof r.variables < "u" && !Array.isArray(r.variables))
    throw new Error("Cannot create query with given variable type, array expected");
  const t = r, e = r.query.reduce((n, s, i) => (n.push({
    query: Bl(s),
    variables: t.variables ? t.jsonSerializer.stringify(t.variables[i]) : void 0
  }), n), []);
  return `query=${encodeURIComponent(t.jsonSerializer.stringify(e))}`;
}, yB = (r) => async (t) => {
  const { url: e, query: n, variables: s, operationName: i, fetch: a, fetchOptions: o, middleware: d } = t, h = { ...t.headers };
  let f = "", g;
  r === "POST" ? (g = IB(n, s, i, o.jsonSerializer), typeof g == "string" && (h["Content-Type"] = "application/json")) : f = mB({
    query: n,
    variables: s,
    operationName: i,
    jsonSerializer: o.jsonSerializer ?? Hd
  });
  const y = {
    method: r,
    headers: h,
    body: g,
    ...o
  };
  let R = e, Q = y;
  if (d) {
    const x = await Promise.resolve(d({ ...y, url: e, operationName: i, variables: s })), { url: N, ...U } = x;
    R = N, Q = U;
  }
  return f && (R = `${R}?${f}`), await a(R, Q);
};
class bB {
  constructor(t, e = {}) {
    this.url = t, this.requestConfig = e, this.rawRequest = async (...n) => {
      const [s, i, a] = n, o = RC(s, i, a), { headers: d, fetch: h = Fa, method: f = "POST", requestMiddleware: g, responseMiddleware: y, ...R } = this.requestConfig, { url: Q } = this;
      o.signal !== void 0 && (R.signal = o.signal);
      const { operationName: x } = Nc(o.query);
      return Dc({
        url: Q,
        query: o.query,
        variables: o.variables,
        headers: {
          ...Yn(Fc(d)),
          ...Yn(o.requestHeaders)
        },
        operationName: x,
        fetch: h,
        method: f,
        fetchOptions: R,
        middleware: g
      }).then((N) => (y && y(N), N)).catch((N) => {
        throw y && y(N), N;
      });
    };
  }
  async request(t, ...e) {
    const [n, s] = e, i = xC(t, n, s), { headers: a, fetch: o = Fa, method: d = "POST", requestMiddleware: h, responseMiddleware: f, ...g } = this.requestConfig, { url: y } = this;
    i.signal !== void 0 && (g.signal = i.signal);
    const { query: R, operationName: Q } = Nc(i.document);
    return Dc({
      url: y,
      query: R,
      variables: i.variables,
      headers: {
        ...Yn(Fc(a)),
        ...Yn(i.requestHeaders)
      },
      operationName: Q,
      fetch: o,
      method: d,
      fetchOptions: g,
      middleware: h
    }).then((x) => (f && f(x), x.data)).catch((x) => {
      throw f && f(x), x;
    });
  }
  // prettier-ignore
  batchRequests(t, e) {
    const n = SC(t, e), { headers: s, ...i } = this.requestConfig;
    n.signal !== void 0 && (i.signal = n.signal);
    const a = n.documents.map(({ document: d }) => Nc(d).query), o = n.documents.map(({ variables: d }) => d);
    return Dc({
      url: this.url,
      query: a,
      // @ts-expect-error TODO reconcile batch variables into system.
      variables: o,
      headers: {
        ...Yn(Fc(s)),
        ...Yn(n.requestHeaders)
      },
      operationName: void 0,
      fetch: this.requestConfig.fetch ?? Fa,
      method: this.requestConfig.method || "POST",
      fetchOptions: i,
      middleware: this.requestConfig.requestMiddleware
    }).then((d) => (this.requestConfig.responseMiddleware && this.requestConfig.responseMiddleware(d), d.data)).catch((d) => {
      throw this.requestConfig.responseMiddleware && this.requestConfig.responseMiddleware(d), d;
    });
  }
  setHeaders(t) {
    return this.requestConfig.headers = t, this;
  }
  /**
   * Attach a header to the client. All subsequent requests will have this header.
   */
  setHeader(t, e) {
    const { headers: n } = this.requestConfig;
    return n ? n[t] = e : this.requestConfig.headers = { [t]: e }, this;
  }
  /**
   * Change the client endpoint. All subsequent requests will send to this endpoint.
   */
  setEndpoint(t) {
    return this.url = t, this;
  }
}
const Dc = async (r) => {
  const { query: t, variables: e, fetchOptions: n } = r, s = yB(BC(r.method ?? "post")), i = Array.isArray(r.query), a = await s(r), o = await EB(a, n.jsonSerializer ?? Hd), d = Array.isArray(o) ? !o.some(({ data: f }) => !f) : !!o.data, h = Array.isArray(o) || !o.errors || Array.isArray(o.errors) && !o.errors.length || n.errorPolicy === "all" || n.errorPolicy === "ignore";
  if (a.ok && h && d) {
    const { errors: f, ...g } = (Array.isArray(o), o), y = n.errorPolicy === "ignore" ? g : o;
    return {
      ...i ? { data: y } : y,
      headers: a.headers,
      status: a.status
    };
  } else {
    const f = typeof o == "string" ? {
      error: o
    } : o;
    throw new Zi(
      // @ts-expect-error TODO
      { ...f, status: a.status, headers: a.headers },
      { query: t, variables: e }
    );
  }
}, IB = (r, t, e, n) => {
  const s = n ?? Hd;
  if (!Array.isArray(r))
    return s.stringify({ query: r, variables: t, operationName: e });
  if (typeof t < "u" && !Array.isArray(t))
    throw new Error("Cannot create request body with given variable type, array expected");
  const i = r.reduce((a, o, d) => (a.push({ query: o, variables: t ? t[d] : void 0 }), a), []);
  return s.stringify(i);
}, EB = async (r, t) => {
  let e;
  return r.headers.forEach((n, s) => {
    s.toLowerCase() === "content-type" && (e = n);
  }), e && (e.toLowerCase().startsWith("application/json") || e.toLowerCase().startsWith("application/graphql+json") || e.toLowerCase().startsWith("application/graphql-response+json")) ? t.parse(await r.text()) : r.text();
}, Fc = (r) => typeof r == "function" ? r() : r;
var uo = function() {
  return uo = Object.assign || function(t) {
    for (var e, n = 1, s = arguments.length; n < s; n++) {
      e = arguments[n];
      for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    }
    return t;
  }, uo.apply(this, arguments);
};
var Qa = /* @__PURE__ */ new Map(), od = /* @__PURE__ */ new Map(), Hp = !0, ho = !1;
function Vp(r) {
  return r.replace(/[\s,]+/g, " ").trim();
}
function CB(r) {
  return Vp(r.source.body.substring(r.start, r.end));
}
function BB(r) {
  var t = /* @__PURE__ */ new Set(), e = [];
  return r.definitions.forEach(function(n) {
    if (n.kind === "FragmentDefinition") {
      var s = n.name.value, i = CB(n.loc), a = od.get(s);
      a && !a.has(i) ? Hp && console.warn("Warning: fragment with name " + s + ` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`) : a || od.set(s, a = /* @__PURE__ */ new Set()), a.add(i), t.has(i) || (t.add(i), e.push(n));
    } else
      e.push(n);
  }), uo(uo({}, r), { definitions: e });
}
function vB(r) {
  var t = new Set(r.definitions);
  t.forEach(function(n) {
    n.loc && delete n.loc, Object.keys(n).forEach(function(s) {
      var i = n[s];
      i && typeof i == "object" && t.add(i);
    });
  });
  var e = r.loc;
  return e && (delete e.startToken, delete e.endToken), r;
}
function xB(r) {
  var t = Vp(r);
  if (!Qa.has(t)) {
    var e = Gp(r, {
      experimentalFragmentVariables: ho,
      allowLegacyFragmentVariables: ho
    });
    if (!e || e.kind !== "Document")
      throw new Error("Not a valid GraphQL document.");
    Qa.set(t, vB(BB(e)));
  }
  return Qa.get(t);
}
function q(r) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  typeof r == "string" && (r = [r]);
  var n = r[0];
  return t.forEach(function(s, i) {
    s && s.kind === "Document" ? n += s.loc.source.body : n += s, n += r[i + 1];
  }), xB(n);
}
function RB() {
  Qa.clear(), od.clear();
}
function SB() {
  Hp = !1;
}
function TB() {
  ho = !0;
}
function NB() {
  ho = !1;
}
var ki = {
  gql: q,
  resetCaches: RB,
  disableFragmentWarnings: SB,
  enableExperimentalFragmentVariables: TB,
  disableExperimentalFragmentVariables: NB
};
(function(r) {
  r.gql = ki.gql, r.resetCaches = ki.resetCaches, r.disableFragmentWarnings = ki.disableFragmentWarnings, r.enableExperimentalFragmentVariables = ki.enableExperimentalFragmentVariables, r.disableExperimentalFragmentVariables = ki.disableExperimentalFragmentVariables;
})(q || (q = {}));
q.default = q;
var St = "0x0000000000000000000000000000000000000000000000000000000000000000", sR = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", iR = 16 * 1024, aR = 16, oR = 1024 * 1024 * 1024, cR = 1024 * 1024 * 1024, dR = 255, uR = 1024 * 1024, hR = 1024 * 1024, DB = "0xffffffffffff0000", Wp = "0xffffffffffff0001", FB = "0xffffffffffff0003", QB = "0xffffffffffff0004", OB = "0xffffffffffff0005", AR = "0x0", MB = [
  "ArithmeticError",
  "ArithmeticOverflow",
  "AssetIdNotFound",
  "BalanceOverflow",
  "BlobIdAlreadyUploaded",
  "BlobNotFound",
  "BytecodeAlreadyUploaded",
  "CanNotGetGasPriceInPredicate",
  "ContractIdAlreadyDeployed",
  "ContractInstructionNotAllowed",
  "ContractMaxSize",
  "ContractMismatch",
  "ContractNotFound",
  "ContractNotInInputs",
  "EcalError",
  "ExpectedCoinInput",
  "ExpectedInternalContext",
  "ExpectedNestedCaller",
  "ExpectedOutputVariable",
  "ExpectedParentInternalContext",
  "ExpectedUnallocatedStack",
  "GasCostNotDefined",
  "InputContractDoesNotExist",
  "InputNotFound",
  "InternalBalanceOverflow",
  "InvalidBlockHeight",
  "InvalidEllipticCurvePoint",
  "InvalidFlags",
  "InvalidImmediateValue",
  "InvalidInstruction",
  "InvalidMetadataIdentifier",
  "InvalidUpgradePurposeType",
  "MalformedCallStructure",
  "MaxStaticContractsReached",
  "MemoryGrowthOverlap",
  "MemoryNotExecutable",
  "MemoryOverflow",
  "MemoryOwnership",
  "MemoryWriteOverlap",
  "MessageDataTooLong",
  "NotEnoughBalance",
  "OutOfGas",
  "OutputNotFound",
  "OverridingConsensusParameters",
  "OverridingStateTransactionBytecode",
  "PolicyIsNotSet",
  "PolicyNotFound",
  "PredicateReturnedNonOne",
  "ProofInUploadNotFound",
  "ReservedRegisterNotWritable",
  "Revert",
  "StorageSlotsNotFound",
  "ThePartIsNotSequentiallyConnected",
  "TooManyReceipts",
  "TooManySlots",
  "TransactionMaturity",
  "TransactionValidity",
  "TransferAmountCannotBeZero",
  "TransferZeroCoins",
  "UninitalizedMemoryAccess",
  "UnknownPanicReason",
  "UnknownStateTransactionBytecodeRoot",
  "UnsupportedCurveId",
  "UnsupportedOperationType",
  "WitnessNotFound"
], PB = "https://docs.rs/fuel-asm/latest/fuel_asm/enum.PanicReason.html";
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Fo = /* @__PURE__ */ BigInt(0), Qo = /* @__PURE__ */ BigInt(1), LB = /* @__PURE__ */ BigInt(2);
function Gn(r) {
  return r instanceof Uint8Array || ArrayBuffer.isView(r) && r.constructor.name === "Uint8Array";
}
function _a(r) {
  if (!Gn(r))
    throw new Error("Uint8Array expected");
}
function bi(r, t) {
  if (typeof t != "boolean")
    throw new Error(r + " boolean expected, got " + t);
}
const kB = /* @__PURE__ */ Array.from({ length: 256 }, (r, t) => t.toString(16).padStart(2, "0"));
function Ii(r) {
  _a(r);
  let t = "";
  for (let e = 0; e < r.length; e++)
    t += kB[r[e]];
  return t;
}
function Kn(r) {
  const t = r.toString(16);
  return t.length & 1 ? "0" + t : t;
}
function Yd(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  return r === "" ? Fo : BigInt("0x" + r);
}
const Dr = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function vl(r) {
  if (r >= Dr._0 && r <= Dr._9)
    return r - Dr._0;
  if (r >= Dr.A && r <= Dr.F)
    return r - (Dr.A - 10);
  if (r >= Dr.a && r <= Dr.f)
    return r - (Dr.a - 10);
}
function Ei(r) {
  if (typeof r != "string")
    throw new Error("hex string expected, got " + typeof r);
  const t = r.length, e = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const n = new Uint8Array(e);
  for (let s = 0, i = 0; s < e; s++, i += 2) {
    const a = vl(r.charCodeAt(i)), o = vl(r.charCodeAt(i + 1));
    if (a === void 0 || o === void 0) {
      const d = r[i] + r[i + 1];
      throw new Error('hex string expected, got non-hex character "' + d + '" at index ' + i);
    }
    n[s] = a * 16 + o;
  }
  return n;
}
function xn(r) {
  return Yd(Ii(r));
}
function jd(r) {
  return _a(r), Yd(Ii(Uint8Array.from(r).reverse()));
}
function Ci(r, t) {
  return Ei(r.toString(16).padStart(t * 2, "0"));
}
function Zd(r, t) {
  return Ci(r, t).reverse();
}
function UB(r) {
  return Ei(Kn(r));
}
function or(r, t, e) {
  let n;
  if (typeof t == "string")
    try {
      n = Ei(t);
    } catch (i) {
      throw new Error(r + " must be hex string or Uint8Array, cause: " + i);
    }
  else if (Gn(t))
    n = Uint8Array.from(t);
  else
    throw new Error(r + " must be hex string or Uint8Array");
  const s = n.length;
  if (typeof e == "number" && s !== e)
    throw new Error(r + " of length " + e + " expected, got " + s);
  return n;
}
function ea(...r) {
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    _a(s), t += s.length;
  }
  const e = new Uint8Array(t);
  for (let n = 0, s = 0; n < r.length; n++) {
    const i = r[n];
    e.set(i, s), s += i.length;
  }
  return e;
}
function GB(r, t) {
  if (r.length !== t.length)
    return !1;
  let e = 0;
  for (let n = 0; n < r.length; n++)
    e |= r[n] ^ t[n];
  return e === 0;
}
function zB(r) {
  if (typeof r != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(r));
}
const Qc = (r) => typeof r == "bigint" && Fo <= r;
function Oo(r, t, e) {
  return Qc(r) && Qc(t) && Qc(e) && t <= r && r < e;
}
function Rn(r, t, e, n) {
  if (!Oo(t, e, n))
    throw new Error("expected valid " + r + ": " + e + " <= n < " + n + ", got " + t);
}
function Yp(r) {
  let t;
  for (t = 0; r > Fo; r >>= Qo, t += 1)
    ;
  return t;
}
function XB(r, t) {
  return r >> BigInt(t) & Qo;
}
function HB(r, t, e) {
  return r | (e ? Qo : Fo) << BigInt(t);
}
const Jd = (r) => (LB << BigInt(r - 1)) - Qo, Oc = (r) => new Uint8Array(r), xl = (r) => Uint8Array.from(r);
function jp(r, t, e) {
  if (typeof r != "number" || r < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof e != "function")
    throw new Error("hmacFn must be a function");
  let n = Oc(r), s = Oc(r), i = 0;
  const a = () => {
    n.fill(1), s.fill(0), i = 0;
  }, o = (...g) => e(s, n, ...g), d = (g = Oc()) => {
    s = o(xl([0]), g), n = o(), g.length !== 0 && (s = o(xl([1]), g), n = o());
  }, h = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let g = 0;
    const y = [];
    for (; g < t; ) {
      n = o();
      const R = n.slice();
      y.push(R), g += n.length;
    }
    return ea(...y);
  };
  return (g, y) => {
    a(), d(g);
    let R;
    for (; !(R = y(h())); )
      d();
    return a(), R;
  };
}
const VB = {
  bigint: (r) => typeof r == "bigint",
  function: (r) => typeof r == "function",
  boolean: (r) => typeof r == "boolean",
  string: (r) => typeof r == "string",
  stringOrUint8Array: (r) => typeof r == "string" || Gn(r),
  isSafeInteger: (r) => Number.isSafeInteger(r),
  array: (r) => Array.isArray(r),
  field: (r, t) => t.Fp.isValid(r),
  hash: (r) => typeof r == "function" && Number.isSafeInteger(r.outputLen)
};
function pa(r, t, e = {}) {
  const n = (s, i, a) => {
    const o = VB[i];
    if (typeof o != "function")
      throw new Error("invalid validator function");
    const d = r[s];
    if (!(a && d === void 0) && !o(d, r))
      throw new Error("param " + String(s) + " is invalid. Expected " + i + ", got " + d);
  };
  for (const [s, i] of Object.entries(t))
    n(s, i, !1);
  for (const [s, i] of Object.entries(e))
    n(s, i, !0);
  return r;
}
const WB = () => {
  throw new Error("not implemented");
};
function cd(r) {
  const t = /* @__PURE__ */ new WeakMap();
  return (e, ...n) => {
    const s = t.get(e);
    if (s !== void 0)
      return s;
    const i = r(e, ...n);
    return t.set(e, i), i;
  };
}
const YB = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  aInRange: Rn,
  abool: bi,
  abytes: _a,
  bitGet: XB,
  bitLen: Yp,
  bitMask: Jd,
  bitSet: HB,
  bytesToHex: Ii,
  bytesToNumberBE: xn,
  bytesToNumberLE: jd,
  concatBytes: ea,
  createHmacDrbg: jp,
  ensureBytes: or,
  equalBytes: GB,
  hexToBytes: Ei,
  hexToNumber: Yd,
  inRange: Oo,
  isBytes: Gn,
  memoized: cd,
  notImplemented: WB,
  numberToBytesBE: Ci,
  numberToBytesLE: Zd,
  numberToHexUnpadded: Kn,
  numberToVarBytesBE: UB,
  utf8ToBytes: zB,
  validateObject: pa
}, Symbol.toStringTag, { value: "Module" }));
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const ve = BigInt(0), Gt = BigInt(1), An = /* @__PURE__ */ BigInt(2), jB = /* @__PURE__ */ BigInt(3), dd = /* @__PURE__ */ BigInt(4), Rl = /* @__PURE__ */ BigInt(5), Sl = /* @__PURE__ */ BigInt(8);
function Ue(r, t) {
  const e = r % t;
  return e >= ve ? e : t + e;
}
function ZB(r, t, e) {
  if (t < ve)
    throw new Error("invalid exponent, negatives unsupported");
  if (e <= ve)
    throw new Error("invalid modulus");
  if (e === Gt)
    return ve;
  let n = Gt;
  for (; t > ve; )
    t & Gt && (n = n * r % e), r = r * r % e, t >>= Gt;
  return n;
}
function Ze(r, t, e) {
  let n = r;
  for (; t-- > ve; )
    n *= n, n %= e;
  return n;
}
function ud(r, t) {
  if (r === ve)
    throw new Error("invert: expected non-zero number");
  if (t <= ve)
    throw new Error("invert: expected positive modulus, got " + t);
  let e = Ue(r, t), n = t, s = ve, i = Gt;
  for (; e !== ve; ) {
    const o = n / e, d = n % e, h = s - i * o;
    n = e, e = d, s = i, i = h;
  }
  if (n !== Gt)
    throw new Error("invert: does not exist");
  return Ue(s, t);
}
function JB(r) {
  const t = (r - Gt) / An;
  let e, n, s;
  for (e = r - Gt, n = 0; e % An === ve; e /= An, n++)
    ;
  for (s = An; s < r && ZB(s, t, r) !== r - Gt; s++)
    if (s > 1e3)
      throw new Error("Cannot find square root: likely non-prime P");
  if (n === 1) {
    const a = (r + Gt) / dd;
    return function(d, h) {
      const f = d.pow(h, a);
      if (!d.eql(d.sqr(f), h))
        throw new Error("Cannot find square root");
      return f;
    };
  }
  const i = (e + Gt) / An;
  return function(o, d) {
    if (o.pow(d, t) === o.neg(o.ONE))
      throw new Error("Cannot find square root");
    let h = n, f = o.pow(o.mul(o.ONE, s), e), g = o.pow(d, i), y = o.pow(d, e);
    for (; !o.eql(y, o.ONE); ) {
      if (o.eql(y, o.ZERO))
        return o.ZERO;
      let R = 1;
      for (let x = o.sqr(y); R < h && !o.eql(x, o.ONE); R++)
        x = o.sqr(x);
      const Q = o.pow(f, Gt << BigInt(h - R - 1));
      f = o.sqr(Q), g = o.mul(g, Q), y = o.mul(y, f), h = R;
    }
    return g;
  };
}
function qB(r) {
  if (r % dd === jB) {
    const t = (r + Gt) / dd;
    return function(n, s) {
      const i = n.pow(s, t);
      if (!n.eql(n.sqr(i), s))
        throw new Error("Cannot find square root");
      return i;
    };
  }
  if (r % Sl === Rl) {
    const t = (r - Rl) / Sl;
    return function(n, s) {
      const i = n.mul(s, An), a = n.pow(i, t), o = n.mul(s, a), d = n.mul(n.mul(o, An), a), h = n.mul(o, n.sub(d, n.ONE));
      if (!n.eql(n.sqr(h), s))
        throw new Error("Cannot find square root");
      return h;
    };
  }
  return JB(r);
}
const $B = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function KB(r) {
  const t = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  }, e = $B.reduce((n, s) => (n[s] = "function", n), t);
  return pa(r, e);
}
function tv(r, t, e) {
  if (e < ve)
    throw new Error("invalid exponent, negatives unsupported");
  if (e === ve)
    return r.ONE;
  if (e === Gt)
    return t;
  let n = r.ONE, s = t;
  for (; e > ve; )
    e & Gt && (n = r.mul(n, s)), s = r.sqr(s), e >>= Gt;
  return n;
}
function ev(r, t) {
  const e = new Array(t.length), n = t.reduce((i, a, o) => r.is0(a) ? i : (e[o] = i, r.mul(i, a)), r.ONE), s = r.inv(n);
  return t.reduceRight((i, a, o) => r.is0(a) ? i : (e[o] = r.mul(i, e[o]), r.mul(i, a)), s), e;
}
function Zp(r, t) {
  const e = t !== void 0 ? t : r.toString(2).length, n = Math.ceil(e / 8);
  return { nBitLength: e, nByteLength: n };
}
function Jp(r, t, e = !1, n = {}) {
  if (r <= ve)
    throw new Error("invalid field: expected ORDER > 0, got " + r);
  const { nBitLength: s, nByteLength: i } = Zp(r, t);
  if (i > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let a;
  const o = Object.freeze({
    ORDER: r,
    isLE: e,
    BITS: s,
    BYTES: i,
    MASK: Jd(s),
    ZERO: ve,
    ONE: Gt,
    create: (d) => Ue(d, r),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof d);
      return ve <= d && d < r;
    },
    is0: (d) => d === ve,
    isOdd: (d) => (d & Gt) === Gt,
    neg: (d) => Ue(-d, r),
    eql: (d, h) => d === h,
    sqr: (d) => Ue(d * d, r),
    add: (d, h) => Ue(d + h, r),
    sub: (d, h) => Ue(d - h, r),
    mul: (d, h) => Ue(d * h, r),
    pow: (d, h) => tv(o, d, h),
    div: (d, h) => Ue(d * ud(h, r), r),
    // Same as above, but doesn't normalize
    sqrN: (d) => d * d,
    addN: (d, h) => d + h,
    subN: (d, h) => d - h,
    mulN: (d, h) => d * h,
    inv: (d) => ud(d, r),
    sqrt: n.sqrt || ((d) => (a || (a = qB(r)), a(o, d))),
    invertBatch: (d) => ev(o, d),
    // TODO: do we really need constant cmov?
    // We don't have const-time bigints anyway, so probably will be not very useful
    cmov: (d, h, f) => f ? h : d,
    toBytes: (d) => e ? Zd(d, i) : Ci(d, i),
    fromBytes: (d) => {
      if (d.length !== i)
        throw new Error("Field.fromBytes: expected " + i + " bytes, got " + d.length);
      return e ? jd(d) : xn(d);
    }
  });
  return Object.freeze(o);
}
function qp(r) {
  if (typeof r != "bigint")
    throw new Error("field order must be bigint");
  const t = r.toString(2).length;
  return Math.ceil(t / 8);
}
function $p(r) {
  const t = qp(r);
  return t + Math.ceil(t / 2);
}
function rv(r, t, e = !1) {
  const n = r.length, s = qp(t), i = $p(t);
  if (n < 16 || n < i || n > 1024)
    throw new Error("expected " + i + "-1024 bytes of input, got " + n);
  const a = e ? jd(r) : xn(r), o = Ue(a, t - Gt) + Gt;
  return e ? Zd(o, s) : Ci(o, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const Tl = BigInt(0), Ea = BigInt(1);
function Mc(r, t) {
  const e = t.negate();
  return r ? e : t;
}
function Kp(r, t) {
  if (!Number.isSafeInteger(r) || r <= 0 || r > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + r);
}
function Pc(r, t) {
  Kp(r, t);
  const e = Math.ceil(t / r) + 1, n = 2 ** (r - 1);
  return { windows: e, windowSize: n };
}
function nv(r, t) {
  if (!Array.isArray(r))
    throw new Error("array expected");
  r.forEach((e, n) => {
    if (!(e instanceof t))
      throw new Error("invalid point at index " + n);
  });
}
function sv(r, t) {
  if (!Array.isArray(r))
    throw new Error("array of scalars expected");
  r.forEach((e, n) => {
    if (!t.isValid(e))
      throw new Error("invalid scalar at index " + n);
  });
}
const Lc = /* @__PURE__ */ new WeakMap(), tf = /* @__PURE__ */ new WeakMap();
function kc(r) {
  return tf.get(r) || 1;
}
function iv(r, t) {
  return {
    constTimeNegate: Mc,
    hasPrecomputes(e) {
      return kc(e) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(e, n, s = r.ZERO) {
      let i = e;
      for (; n > Tl; )
        n & Ea && (s = s.add(i)), i = i.double(), n >>= Ea;
      return s;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(e, n) {
      const { windows: s, windowSize: i } = Pc(n, t), a = [];
      let o = e, d = o;
      for (let h = 0; h < s; h++) {
        d = o, a.push(d);
        for (let f = 1; f < i; f++)
          d = d.add(o), a.push(d);
        o = d.double();
      }
      return a;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(e, n, s) {
      const { windows: i, windowSize: a } = Pc(e, t);
      let o = r.ZERO, d = r.BASE;
      const h = BigInt(2 ** e - 1), f = 2 ** e, g = BigInt(e);
      for (let y = 0; y < i; y++) {
        const R = y * a;
        let Q = Number(s & h);
        s >>= g, Q > a && (Q -= f, s += Ea);
        const x = R, N = R + Math.abs(Q) - 1, U = y % 2 !== 0, H = Q < 0;
        Q === 0 ? d = d.add(Mc(U, n[x])) : o = o.add(Mc(H, n[N]));
      }
      return { p: o, f: d };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(e, n, s, i = r.ZERO) {
      const { windows: a, windowSize: o } = Pc(e, t), d = BigInt(2 ** e - 1), h = 2 ** e, f = BigInt(e);
      for (let g = 0; g < a; g++) {
        const y = g * o;
        if (s === Tl)
          break;
        let R = Number(s & d);
        if (s >>= f, R > o && (R -= h, s += Ea), R === 0)
          continue;
        let Q = n[y + Math.abs(R) - 1];
        R < 0 && (Q = Q.negate()), i = i.add(Q);
      }
      return i;
    },
    getPrecomputes(e, n, s) {
      let i = Lc.get(n);
      return i || (i = this.precomputeWindow(n, e), e !== 1 && Lc.set(n, s(i))), i;
    },
    wNAFCached(e, n, s) {
      const i = kc(e);
      return this.wNAF(i, this.getPrecomputes(i, e, s), n);
    },
    wNAFCachedUnsafe(e, n, s, i) {
      const a = kc(e);
      return a === 1 ? this.unsafeLadder(e, n, i) : this.wNAFUnsafe(a, this.getPrecomputes(a, e, s), n, i);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(e, n) {
      Kp(n, t), tf.set(e, n), Lc.delete(e);
    }
  };
}
function av(r, t, e, n) {
  if (nv(e, r), sv(n, t), e.length !== n.length)
    throw new Error("arrays of points and scalars must have equal length");
  const s = r.ZERO, i = Yp(BigInt(e.length)), a = i > 12 ? i - 3 : i > 4 ? i - 2 : i ? 2 : 1, o = (1 << a) - 1, d = new Array(o + 1).fill(s), h = Math.floor((t.BITS - 1) / a) * a;
  let f = s;
  for (let g = h; g >= 0; g -= a) {
    d.fill(s);
    for (let R = 0; R < n.length; R++) {
      const Q = n[R], x = Number(Q >> BigInt(g) & BigInt(o));
      d[x] = d[x].add(e[R]);
    }
    let y = s;
    for (let R = d.length - 1, Q = s; R > 0; R--)
      Q = Q.add(d[R]), y = y.add(Q);
    if (f = f.add(y), g !== 0)
      for (let R = 0; R < a; R++)
        f = f.double();
  }
  return f;
}
function ef(r) {
  return KB(r.Fp), pa(r, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  }), Object.freeze({
    ...Zp(r.n, r.nBitLength),
    ...r,
    p: r.Fp.ORDER
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Nl(r) {
  r.lowS !== void 0 && bi("lowS", r.lowS), r.prehash !== void 0 && bi("prehash", r.prehash);
}
function ov(r) {
  const t = ef(r);
  pa(t, {
    a: "field",
    b: "field"
  }, {
    allowedPrivateKeyLengths: "array",
    wrapPrivateKey: "boolean",
    isTorsionFree: "function",
    clearCofactor: "function",
    allowInfinityPoint: "boolean",
    fromBytes: "function",
    toBytes: "function"
  });
  const { endo: e, Fp: n, a: s } = t;
  if (e) {
    if (!n.eql(s, n.ZERO))
      throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");
    if (typeof e != "object" || typeof e.beta != "bigint" || typeof e.splitScalar != "function")
      throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function");
  }
  return Object.freeze({ ...t });
}
const { bytesToNumberBE: cv, hexToBytes: dv } = YB;
class uv extends Error {
  constructor(t = "") {
    super(t);
  }
}
const Or = {
  // asn.1 DER encoding utils
  Err: uv,
  // Basic building block is TLV (Tag-Length-Value)
  _tlv: {
    encode: (r, t) => {
      const { Err: e } = Or;
      if (r < 0 || r > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length & 1)
        throw new e("tlv.encode: unpadded data");
      const n = t.length / 2, s = Kn(n);
      if (s.length / 2 & 128)
        throw new e("tlv.encode: long form length too big");
      const i = n > 127 ? Kn(s.length / 2 | 128) : "";
      return Kn(r) + i + s + t;
    },
    // v - value, l - left bytes (unparsed)
    decode(r, t) {
      const { Err: e } = Or;
      let n = 0;
      if (r < 0 || r > 256)
        throw new e("tlv.encode: wrong tag");
      if (t.length < 2 || t[n++] !== r)
        throw new e("tlv.decode: wrong tlv");
      const s = t[n++], i = !!(s & 128);
      let a = 0;
      if (!i)
        a = s;
      else {
        const d = s & 127;
        if (!d)
          throw new e("tlv.decode(long): indefinite length not supported");
        if (d > 4)
          throw new e("tlv.decode(long): byte length is too big");
        const h = t.subarray(n, n + d);
        if (h.length !== d)
          throw new e("tlv.decode: length bytes not complete");
        if (h[0] === 0)
          throw new e("tlv.decode(long): zero leftmost byte");
        for (const f of h)
          a = a << 8 | f;
        if (n += d, a < 128)
          throw new e("tlv.decode(long): not minimal encoding");
      }
      const o = t.subarray(n, n + a);
      if (o.length !== a)
        throw new e("tlv.decode: wrong value length");
      return { v: o, l: t.subarray(n + a) };
    }
  },
  // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
  // since we always use positive integers here. It must always be empty:
  // - add zero byte if exists
  // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
  _int: {
    encode(r) {
      const { Err: t } = Or;
      if (r < Lr)
        throw new t("integer: negative integers are not allowed");
      let e = Kn(r);
      if (Number.parseInt(e[0], 16) & 8 && (e = "00" + e), e.length & 1)
        throw new t("unexpected DER parsing assertion: unpadded hex");
      return e;
    },
    decode(r) {
      const { Err: t } = Or;
      if (r[0] & 128)
        throw new t("invalid signature integer: negative");
      if (r[0] === 0 && !(r[1] & 128))
        throw new t("invalid signature integer: unnecessary leading zero");
      return cv(r);
    }
  },
  toSig(r) {
    const { Err: t, _int: e, _tlv: n } = Or, s = typeof r == "string" ? dv(r) : r;
    _a(s);
    const { v: i, l: a } = n.decode(48, s);
    if (a.length)
      throw new t("invalid signature: left bytes after parsing");
    const { v: o, l: d } = n.decode(2, i), { v: h, l: f } = n.decode(2, d);
    if (f.length)
      throw new t("invalid signature: left bytes after parsing");
    return { r: e.decode(o), s: e.decode(h) };
  },
  hexFromSig(r) {
    const { _tlv: t, _int: e } = Or, n = t.encode(2, e.encode(r.r)), s = t.encode(2, e.encode(r.s)), i = n + s;
    return t.encode(48, i);
  }
}, Lr = BigInt(0), Ee = BigInt(1);
BigInt(2);
const Dl = BigInt(3);
BigInt(4);
function hv(r) {
  const t = ov(r), { Fp: e } = t, n = Jp(t.n, t.nBitLength), s = t.toBytes || ((x, N, U) => {
    const H = N.toAffine();
    return ea(Uint8Array.from([4]), e.toBytes(H.x), e.toBytes(H.y));
  }), i = t.fromBytes || ((x) => {
    const N = x.subarray(1), U = e.fromBytes(N.subarray(0, e.BYTES)), H = e.fromBytes(N.subarray(e.BYTES, 2 * e.BYTES));
    return { x: U, y: H };
  });
  function a(x) {
    const { a: N, b: U } = t, H = e.sqr(x), X = e.mul(H, x);
    return e.add(e.add(X, e.mul(x, N)), U);
  }
  if (!e.eql(e.sqr(t.Gy), a(t.Gx)))
    throw new Error("bad generator point: equation left != right");
  function o(x) {
    return Oo(x, Ee, t.n);
  }
  function d(x) {
    const { allowedPrivateKeyLengths: N, nByteLength: U, wrapPrivateKey: H, n: X } = t;
    if (N && typeof x != "bigint") {
      if (Gn(x) && (x = Ii(x)), typeof x != "string" || !N.includes(x.length))
        throw new Error("invalid private key");
      x = x.padStart(U * 2, "0");
    }
    let P;
    try {
      P = typeof x == "bigint" ? x : xn(or("private key", x, U));
    } catch {
      throw new Error("invalid private key, expected hex or " + U + " bytes, got " + typeof x);
    }
    return H && (P = Ue(P, X)), Rn("private key", P, Ee, X), P;
  }
  function h(x) {
    if (!(x instanceof y))
      throw new Error("ProjectivePoint expected");
  }
  const f = cd((x, N) => {
    const { px: U, py: H, pz: X } = x;
    if (e.eql(X, e.ONE))
      return { x: U, y: H };
    const P = x.is0();
    N == null && (N = P ? e.ONE : e.inv(X));
    const M = e.mul(U, N), O = e.mul(H, N), k = e.mul(X, N);
    if (P)
      return { x: e.ZERO, y: e.ZERO };
    if (!e.eql(k, e.ONE))
      throw new Error("invZ was invalid");
    return { x: M, y: O };
  }), g = cd((x) => {
    if (x.is0()) {
      if (t.allowInfinityPoint && !e.is0(x.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: N, y: U } = x.toAffine();
    if (!e.isValid(N) || !e.isValid(U))
      throw new Error("bad point: x or y not FE");
    const H = e.sqr(U), X = a(N);
    if (!e.eql(H, X))
      throw new Error("bad point: equation left != right");
    if (!x.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return !0;
  });
  class y {
    constructor(N, U, H) {
      if (this.px = N, this.py = U, this.pz = H, N == null || !e.isValid(N))
        throw new Error("x required");
      if (U == null || !e.isValid(U))
        throw new Error("y required");
      if (H == null || !e.isValid(H))
        throw new Error("z required");
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(N) {
      const { x: U, y: H } = N || {};
      if (!N || !e.isValid(U) || !e.isValid(H))
        throw new Error("invalid affine point");
      if (N instanceof y)
        throw new Error("projective point not allowed");
      const X = (P) => e.eql(P, e.ZERO);
      return X(U) && X(H) ? y.ZERO : new y(U, H, e.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(N) {
      const U = e.invertBatch(N.map((H) => H.pz));
      return N.map((H, X) => H.toAffine(U[X])).map(y.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(N) {
      const U = y.fromAffine(i(or("pointHex", N)));
      return U.assertValidity(), U;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(N) {
      return y.BASE.multiply(d(N));
    }
    // Multiscalar Multiplication
    static msm(N, U) {
      return av(y, n, N, U);
    }
    // "Private method", don't use it directly
    _setWindowSize(N) {
      Q.setWindowSize(this, N);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      g(this);
    }
    hasEvenY() {
      const { y: N } = this.toAffine();
      if (e.isOdd)
        return !e.isOdd(N);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(N) {
      h(N);
      const { px: U, py: H, pz: X } = this, { px: P, py: M, pz: O } = N, k = e.eql(e.mul(U, O), e.mul(P, X)), G = e.eql(e.mul(H, O), e.mul(M, X));
      return k && G;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new y(this.px, e.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: N, b: U } = t, H = e.mul(U, Dl), { px: X, py: P, pz: M } = this;
      let O = e.ZERO, k = e.ZERO, G = e.ZERO, z = e.mul(X, X), j = e.mul(P, P), Z = e.mul(M, M), $ = e.mul(X, P);
      return $ = e.add($, $), G = e.mul(X, M), G = e.add(G, G), O = e.mul(N, G), k = e.mul(H, Z), k = e.add(O, k), O = e.sub(j, k), k = e.add(j, k), k = e.mul(O, k), O = e.mul($, O), G = e.mul(H, G), Z = e.mul(N, Z), $ = e.sub(z, Z), $ = e.mul(N, $), $ = e.add($, G), G = e.add(z, z), z = e.add(G, z), z = e.add(z, Z), z = e.mul(z, $), k = e.add(k, z), Z = e.mul(P, M), Z = e.add(Z, Z), z = e.mul(Z, $), O = e.sub(O, z), G = e.mul(Z, j), G = e.add(G, G), G = e.add(G, G), new y(O, k, G);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(N) {
      h(N);
      const { px: U, py: H, pz: X } = this, { px: P, py: M, pz: O } = N;
      let k = e.ZERO, G = e.ZERO, z = e.ZERO;
      const j = t.a, Z = e.mul(t.b, Dl);
      let $ = e.mul(U, P), v = e.mul(H, M), u = e.mul(X, O), A = e.add(U, H), p = e.add(P, M);
      A = e.mul(A, p), p = e.add($, v), A = e.sub(A, p), p = e.add(U, X);
      let m = e.add(P, O);
      return p = e.mul(p, m), m = e.add($, u), p = e.sub(p, m), m = e.add(H, X), k = e.add(M, O), m = e.mul(m, k), k = e.add(v, u), m = e.sub(m, k), z = e.mul(j, p), k = e.mul(Z, u), z = e.add(k, z), k = e.sub(v, z), z = e.add(v, z), G = e.mul(k, z), v = e.add($, $), v = e.add(v, $), u = e.mul(j, u), p = e.mul(Z, p), v = e.add(v, u), u = e.sub($, u), u = e.mul(j, u), p = e.add(p, u), $ = e.mul(v, p), G = e.add(G, $), $ = e.mul(m, p), k = e.mul(A, k), k = e.sub(k, $), $ = e.mul(A, v), z = e.mul(m, z), z = e.add(z, $), new y(k, G, z);
    }
    subtract(N) {
      return this.add(N.negate());
    }
    is0() {
      return this.equals(y.ZERO);
    }
    wNAF(N) {
      return Q.wNAFCached(this, N, y.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(N) {
      const { endo: U, n: H } = t;
      Rn("scalar", N, Lr, H);
      const X = y.ZERO;
      if (N === Lr)
        return X;
      if (this.is0() || N === Ee)
        return this;
      if (!U || Q.hasPrecomputes(this))
        return Q.wNAFCachedUnsafe(this, N, y.normalizeZ);
      let { k1neg: P, k1: M, k2neg: O, k2: k } = U.splitScalar(N), G = X, z = X, j = this;
      for (; M > Lr || k > Lr; )
        M & Ee && (G = G.add(j)), k & Ee && (z = z.add(j)), j = j.double(), M >>= Ee, k >>= Ee;
      return P && (G = G.negate()), O && (z = z.negate()), z = new y(e.mul(z.px, U.beta), z.py, z.pz), G.add(z);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(N) {
      const { endo: U, n: H } = t;
      Rn("scalar", N, Ee, H);
      let X, P;
      if (U) {
        const { k1neg: M, k1: O, k2neg: k, k2: G } = U.splitScalar(N);
        let { p: z, f: j } = this.wNAF(O), { p: Z, f: $ } = this.wNAF(G);
        z = Q.constTimeNegate(M, z), Z = Q.constTimeNegate(k, Z), Z = new y(e.mul(Z.px, U.beta), Z.py, Z.pz), X = z.add(Z), P = j.add($);
      } else {
        const { p: M, f: O } = this.wNAF(N);
        X = M, P = O;
      }
      return y.normalizeZ([X, P])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(N, U, H) {
      const X = y.BASE, P = (O, k) => k === Lr || k === Ee || !O.equals(X) ? O.multiplyUnsafe(k) : O.multiply(k), M = P(this, U).add(P(N, H));
      return M.is0() ? void 0 : M;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(N) {
      return f(this, N);
    }
    isTorsionFree() {
      const { h: N, isTorsionFree: U } = t;
      if (N === Ee)
        return !0;
      if (U)
        return U(y, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: N, clearCofactor: U } = t;
      return N === Ee ? this : U ? U(y, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(N = !0) {
      return bi("isCompressed", N), this.assertValidity(), s(y, this, N);
    }
    toHex(N = !0) {
      return bi("isCompressed", N), Ii(this.toRawBytes(N));
    }
  }
  y.BASE = new y(t.Gx, t.Gy, e.ONE), y.ZERO = new y(e.ZERO, e.ONE, e.ZERO);
  const R = t.nBitLength, Q = iv(y, t.endo ? Math.ceil(R / 2) : R);
  return {
    CURVE: t,
    ProjectivePoint: y,
    normPrivateKeyToScalar: d,
    weierstrassEquation: a,
    isWithinCurveOrder: o
  };
}
function Av(r) {
  const t = ef(r);
  return pa(t, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  }), Object.freeze({ lowS: !0, ...t });
}
function lv(r) {
  const t = Av(r), { Fp: e, n } = t, s = e.BYTES + 1, i = 2 * e.BYTES + 1;
  function a(u) {
    return Ue(u, n);
  }
  function o(u) {
    return ud(u, n);
  }
  const { ProjectivePoint: d, normPrivateKeyToScalar: h, weierstrassEquation: f, isWithinCurveOrder: g } = hv({
    ...t,
    toBytes(u, A, p) {
      const m = A.toAffine(), b = e.toBytes(m.x), S = ea;
      return bi("isCompressed", p), p ? S(Uint8Array.from([A.hasEvenY() ? 2 : 3]), b) : S(Uint8Array.from([4]), b, e.toBytes(m.y));
    },
    fromBytes(u) {
      const A = u.length, p = u[0], m = u.subarray(1);
      if (A === s && (p === 2 || p === 3)) {
        const b = xn(m);
        if (!Oo(b, Ee, e.ORDER))
          throw new Error("Point is not on curve");
        const S = f(b);
        let F;
        try {
          F = e.sqrt(S);
        } catch (C) {
          const tt = C instanceof Error ? ": " + C.message : "";
          throw new Error("Point is not on curve" + tt);
        }
        const I = (F & Ee) === Ee;
        return (p & 1) === 1 !== I && (F = e.neg(F)), { x: b, y: F };
      } else if (A === i && p === 4) {
        const b = e.fromBytes(m.subarray(0, e.BYTES)), S = e.fromBytes(m.subarray(e.BYTES, 2 * e.BYTES));
        return { x: b, y: S };
      } else {
        const b = s, S = i;
        throw new Error("invalid Point, expected length of " + b + ", or uncompressed " + S + ", got " + A);
      }
    }
  }), y = (u) => Ii(Ci(u, t.nByteLength));
  function R(u) {
    const A = n >> Ee;
    return u > A;
  }
  function Q(u) {
    return R(u) ? a(-u) : u;
  }
  const x = (u, A, p) => xn(u.slice(A, p));
  class N {
    constructor(A, p, m) {
      this.r = A, this.s = p, this.recovery = m, this.assertValidity();
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(A) {
      const p = t.nByteLength;
      return A = or("compactSignature", A, p * 2), new N(x(A, 0, p), x(A, p, 2 * p));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(A) {
      const { r: p, s: m } = Or.toSig(or("DER", A));
      return new N(p, m);
    }
    assertValidity() {
      Rn("r", this.r, Ee, n), Rn("s", this.s, Ee, n);
    }
    addRecoveryBit(A) {
      return new N(this.r, this.s, A);
    }
    recoverPublicKey(A) {
      const { r: p, s: m, recovery: b } = this, S = O(or("msgHash", A));
      if (b == null || ![0, 1, 2, 3].includes(b))
        throw new Error("recovery id invalid");
      const F = b === 2 || b === 3 ? p + t.n : p;
      if (F >= e.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const I = b & 1 ? "03" : "02", _ = d.fromHex(I + y(F)), C = o(F), tt = a(-S * C), et = a(m * C), nt = d.BASE.multiplyAndAddUnsafe(_, tt, et);
      if (!nt)
        throw new Error("point at infinify");
      return nt.assertValidity(), nt;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return R(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new N(this.r, a(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return Ei(this.toDERHex());
    }
    toDERHex() {
      return Or.hexFromSig({ r: this.r, s: this.s });
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return Ei(this.toCompactHex());
    }
    toCompactHex() {
      return y(this.r) + y(this.s);
    }
  }
  const U = {
    isValidPrivateKey(u) {
      try {
        return h(u), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: h,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const u = $p(t.n);
      return rv(t.randomBytes(u), t.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(u = 8, A = d.BASE) {
      return A._setWindowSize(u), A.multiply(BigInt(3)), A;
    }
  };
  function H(u, A = !0) {
    return d.fromPrivateKey(u).toRawBytes(A);
  }
  function X(u) {
    const A = Gn(u), p = typeof u == "string", m = (A || p) && u.length;
    return A ? m === s || m === i : p ? m === 2 * s || m === 2 * i : u instanceof d;
  }
  function P(u, A, p = !0) {
    if (X(u))
      throw new Error("first arg must be private key");
    if (!X(A))
      throw new Error("second arg must be public key");
    return d.fromHex(A).multiply(h(u)).toRawBytes(p);
  }
  const M = t.bits2int || function(u) {
    if (u.length > 8192)
      throw new Error("input is too large");
    const A = xn(u), p = u.length * 8 - t.nBitLength;
    return p > 0 ? A >> BigInt(p) : A;
  }, O = t.bits2int_modN || function(u) {
    return a(M(u));
  }, k = Jd(t.nBitLength);
  function G(u) {
    return Rn("num < 2^" + t.nBitLength, u, Lr, k), Ci(u, t.nByteLength);
  }
  function z(u, A, p = j) {
    if (["recovered", "canonical"].some((ft) => ft in p))
      throw new Error("sign() legacy options not supported");
    const { hash: m, randomBytes: b } = t;
    let { lowS: S, prehash: F, extraEntropy: I } = p;
    S == null && (S = !0), u = or("msgHash", u), Nl(p), F && (u = or("prehashed msgHash", m(u)));
    const _ = O(u), C = h(A), tt = [G(C), G(_)];
    if (I != null && I !== !1) {
      const ft = I === !0 ? b(e.BYTES) : I;
      tt.push(or("extraEntropy", ft));
    }
    const et = ea(...tt), nt = _;
    function Ft(ft) {
      const Et = M(ft);
      if (!g(Et))
        return;
      const nr = o(Et), Rt = d.BASE.multiply(Et).toAffine(), Bt = a(Rt.x);
      if (Bt === Lr)
        return;
      const Oe = a(nr * a(nt + Bt * C));
      if (Oe === Lr)
        return;
      let Tt = (Rt.x === Bt ? 0 : 2) | Number(Rt.y & Ee), Qt = Oe;
      return S && R(Oe) && (Qt = Q(Oe), Tt ^= 1), new N(Bt, Qt, Tt);
    }
    return { seed: et, k2sig: Ft };
  }
  const j = { lowS: t.lowS, prehash: !1 }, Z = { lowS: t.lowS, prehash: !1 };
  function $(u, A, p = j) {
    const { seed: m, k2sig: b } = z(u, A, p), S = t;
    return jp(S.hash.outputLen, S.nByteLength, S.hmac)(m, b);
  }
  d.BASE._setWindowSize(8);
  function v(u, A, p, m = Z) {
    var Tt;
    const b = u;
    A = or("msgHash", A), p = or("publicKey", p);
    const { lowS: S, prehash: F, format: I } = m;
    if (Nl(m), "strict" in m)
      throw new Error("options.strict was renamed to lowS");
    if (I !== void 0 && I !== "compact" && I !== "der")
      throw new Error("format must be compact or der");
    const _ = typeof b == "string" || Gn(b), C = !_ && !I && typeof b == "object" && b !== null && typeof b.r == "bigint" && typeof b.s == "bigint";
    if (!_ && !C)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let tt, et;
    try {
      if (C && (tt = new N(b.r, b.s)), _) {
        try {
          I !== "compact" && (tt = N.fromDER(b));
        } catch (Qt) {
          if (!(Qt instanceof Or.Err))
            throw Qt;
        }
        !tt && I !== "der" && (tt = N.fromCompact(b));
      }
      et = d.fromHex(p);
    } catch {
      return !1;
    }
    if (!tt || S && tt.hasHighS())
      return !1;
    F && (A = t.hash(A));
    const { r: nt, s: Ft } = tt, ft = O(A), Et = o(Ft), nr = a(ft * Et), Rt = a(nt * Et), Bt = (Tt = d.BASE.multiplyAndAddUnsafe(et, nr, Rt)) == null ? void 0 : Tt.toAffine();
    return Bt ? a(Bt.x) === nt : !1;
  }
  return {
    CURVE: t,
    getPublicKey: H,
    getSharedSecret: P,
    sign: $,
    verify: v,
    ProjectivePoint: d,
    Signature: N,
    utils: U
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function _v(r) {
  return {
    hash: r,
    hmac: (t, ...e) => Bo(r, t, _I(...e)),
    randomBytes: pI
  };
}
function pv(r, t) {
  const e = (n) => lv({ ...r, ..._v(n) });
  return { ...e(t), create: e };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const rf = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), Fl = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), fv = BigInt(1), hd = BigInt(2), Ql = (r, t) => (r + t / hd) / t;
function gv(r) {
  const t = rf, e = BigInt(3), n = BigInt(6), s = BigInt(11), i = BigInt(22), a = BigInt(23), o = BigInt(44), d = BigInt(88), h = r * r * r % t, f = h * h * r % t, g = Ze(f, e, t) * f % t, y = Ze(g, e, t) * f % t, R = Ze(y, hd, t) * h % t, Q = Ze(R, s, t) * R % t, x = Ze(Q, i, t) * Q % t, N = Ze(x, o, t) * x % t, U = Ze(N, d, t) * N % t, H = Ze(U, o, t) * x % t, X = Ze(H, e, t) * f % t, P = Ze(X, a, t) * Q % t, M = Ze(P, n, t) * h % t, O = Ze(M, hd, t);
  if (!Ad.eql(Ad.sqr(O), r))
    throw new Error("Cannot find square root");
  return O;
}
const Ad = Jp(rf, void 0, void 0, { sqrt: gv }), Wr = pv({
  a: BigInt(0),
  // equation params: a, b
  b: BigInt(7),
  Fp: Ad,
  // Field's prime: 2n**256n - 2n**32n - 2n**9n - 2n**8n - 2n**7n - 2n**6n - 2n**4n - 1n
  n: Fl,
  // Curve order, total count of valid points in the field
  // Base point (x, y) aka generator point
  Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
  Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
  h: BigInt(1),
  // Cofactor
  lowS: !0,
  // Allow only low-S signatures by default in sign() and verify()
  endo: {
    // Endomorphism, see above
    beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
    splitScalar: (r) => {
      const t = Fl, e = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), n = -fv * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = e, a = BigInt("0x100000000000000000000000000000000"), o = Ql(i * r, t), d = Ql(-n * r, t);
      let h = Ue(r - o * e - d * s, t), f = Ue(-o * n - d * i, t);
      const g = h > a, y = f > a;
      if (g && (h = t - h), y && (f = t - f), h > a || f > a)
        throw new Error("splitScalar: Endomorphism failed, k=" + r);
      return { k1neg: g, k1: h, k2neg: y, k2: f };
    }
  }
}, sn);
BigInt(0);
Wr.ProjectivePoint;
var Ca = { exports: {} }, Ol;
function wv() {
  if (Ol) return Ca.exports;
  Ol = 1;
  var r = typeof Reflect == "object" ? Reflect : null, t = r && typeof r.apply == "function" ? r.apply : function(M, O, k) {
    return Function.prototype.apply.call(M, O, k);
  }, e;
  r && typeof r.ownKeys == "function" ? e = r.ownKeys : Object.getOwnPropertySymbols ? e = function(M) {
    return Object.getOwnPropertyNames(M).concat(Object.getOwnPropertySymbols(M));
  } : e = function(M) {
    return Object.getOwnPropertyNames(M);
  };
  function n(P) {
    console && console.warn && console.warn(P);
  }
  var s = Number.isNaN || function(M) {
    return M !== M;
  };
  function i() {
    i.init.call(this);
  }
  Ca.exports = i, Ca.exports.once = U, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._eventsCount = 0, i.prototype._maxListeners = void 0;
  var a = 10;
  function o(P) {
    if (typeof P != "function")
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof P);
  }
  Object.defineProperty(i, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
      return a;
    },
    set: function(P) {
      if (typeof P != "number" || P < 0 || s(P))
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + P + ".");
      a = P;
    }
  }), i.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, i.prototype.setMaxListeners = function(M) {
    if (typeof M != "number" || M < 0 || s(M))
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + M + ".");
    return this._maxListeners = M, this;
  };
  function d(P) {
    return P._maxListeners === void 0 ? i.defaultMaxListeners : P._maxListeners;
  }
  i.prototype.getMaxListeners = function() {
    return d(this);
  }, i.prototype.emit = function(M) {
    for (var O = [], k = 1; k < arguments.length; k++) O.push(arguments[k]);
    var G = M === "error", z = this._events;
    if (z !== void 0)
      G = G && z.error === void 0;
    else if (!G)
      return !1;
    if (G) {
      var j;
      if (O.length > 0 && (j = O[0]), j instanceof Error)
        throw j;
      var Z = new Error("Unhandled error." + (j ? " (" + j.message + ")" : ""));
      throw Z.context = j, Z;
    }
    var $ = z[M];
    if ($ === void 0)
      return !1;
    if (typeof $ == "function")
      t($, this, O);
    else
      for (var v = $.length, u = Q($, v), k = 0; k < v; ++k)
        t(u[k], this, O);
    return !0;
  };
  function h(P, M, O, k) {
    var G, z, j;
    if (o(O), z = P._events, z === void 0 ? (z = P._events = /* @__PURE__ */ Object.create(null), P._eventsCount = 0) : (z.newListener !== void 0 && (P.emit(
      "newListener",
      M,
      O.listener ? O.listener : O
    ), z = P._events), j = z[M]), j === void 0)
      j = z[M] = O, ++P._eventsCount;
    else if (typeof j == "function" ? j = z[M] = k ? [O, j] : [j, O] : k ? j.unshift(O) : j.push(O), G = d(P), G > 0 && j.length > G && !j.warned) {
      j.warned = !0;
      var Z = new Error("Possible EventEmitter memory leak detected. " + j.length + " " + String(M) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      Z.name = "MaxListenersExceededWarning", Z.emitter = P, Z.type = M, Z.count = j.length, n(Z);
    }
    return P;
  }
  i.prototype.addListener = function(M, O) {
    return h(this, M, O, !1);
  }, i.prototype.on = i.prototype.addListener, i.prototype.prependListener = function(M, O) {
    return h(this, M, O, !0);
  };
  function f() {
    if (!this.fired)
      return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function g(P, M, O) {
    var k = { fired: !1, wrapFn: void 0, target: P, type: M, listener: O }, G = f.bind(k);
    return G.listener = O, k.wrapFn = G, G;
  }
  i.prototype.once = function(M, O) {
    return o(O), this.on(M, g(this, M, O)), this;
  }, i.prototype.prependOnceListener = function(M, O) {
    return o(O), this.prependListener(M, g(this, M, O)), this;
  }, i.prototype.removeListener = function(M, O) {
    var k, G, z, j, Z;
    if (o(O), G = this._events, G === void 0)
      return this;
    if (k = G[M], k === void 0)
      return this;
    if (k === O || k.listener === O)
      --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete G[M], G.removeListener && this.emit("removeListener", M, k.listener || O));
    else if (typeof k != "function") {
      for (z = -1, j = k.length - 1; j >= 0; j--)
        if (k[j] === O || k[j].listener === O) {
          Z = k[j].listener, z = j;
          break;
        }
      if (z < 0)
        return this;
      z === 0 ? k.shift() : x(k, z), k.length === 1 && (G[M] = k[0]), G.removeListener !== void 0 && this.emit("removeListener", M, Z || O);
    }
    return this;
  }, i.prototype.off = i.prototype.removeListener, i.prototype.removeAllListeners = function(M) {
    var O, k, G;
    if (k = this._events, k === void 0)
      return this;
    if (k.removeListener === void 0)
      return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : k[M] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete k[M]), this;
    if (arguments.length === 0) {
      var z = Object.keys(k), j;
      for (G = 0; G < z.length; ++G)
        j = z[G], j !== "removeListener" && this.removeAllListeners(j);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (O = k[M], typeof O == "function")
      this.removeListener(M, O);
    else if (O !== void 0)
      for (G = O.length - 1; G >= 0; G--)
        this.removeListener(M, O[G]);
    return this;
  };
  function y(P, M, O) {
    var k = P._events;
    if (k === void 0)
      return [];
    var G = k[M];
    return G === void 0 ? [] : typeof G == "function" ? O ? [G.listener || G] : [G] : O ? N(G) : Q(G, G.length);
  }
  i.prototype.listeners = function(M) {
    return y(this, M, !0);
  }, i.prototype.rawListeners = function(M) {
    return y(this, M, !1);
  }, i.listenerCount = function(P, M) {
    return typeof P.listenerCount == "function" ? P.listenerCount(M) : R.call(P, M);
  }, i.prototype.listenerCount = R;
  function R(P) {
    var M = this._events;
    if (M !== void 0) {
      var O = M[P];
      if (typeof O == "function")
        return 1;
      if (O !== void 0)
        return O.length;
    }
    return 0;
  }
  i.prototype.eventNames = function() {
    return this._eventsCount > 0 ? e(this._events) : [];
  };
  function Q(P, M) {
    for (var O = new Array(M), k = 0; k < M; ++k)
      O[k] = P[k];
    return O;
  }
  function x(P, M) {
    for (; M + 1 < P.length; M++)
      P[M] = P[M + 1];
    P.pop();
  }
  function N(P) {
    for (var M = new Array(P.length), O = 0; O < M.length; ++O)
      M[O] = P[O].listener || P[O];
    return M;
  }
  function U(P, M) {
    return new Promise(function(O, k) {
      function G(j) {
        P.removeListener(M, z), k(j);
      }
      function z() {
        typeof P.removeListener == "function" && P.removeListener("error", G), O([].slice.call(arguments));
      }
      X(P, M, z, { once: !0 }), M !== "error" && H(P, G, { once: !0 });
    });
  }
  function H(P, M, O) {
    typeof P.on == "function" && X(P, "error", M, O);
  }
  function X(P, M, O, k) {
    if (typeof P.on == "function")
      k.once ? P.once(M, O) : P.on(M, O);
    else if (typeof P.addEventListener == "function")
      P.addEventListener(M, function G(z) {
        k.once && P.removeEventListener(M, G), O(z);
      });
    else
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof P);
  }
  return Ca.exports;
}
var nf = wv(), mv = Object.defineProperty, xe = (r, t) => mv(r, "name", { value: t, configurable: !0 }), yv = "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", Hs, bv = (Hs = class {
  constructor(t, e, n, s, i, a = 0) {
    D(this, "left");
    D(this, "right");
    D(this, "parent");
    D(this, "hash");
    D(this, "data");
    D(this, "index");
    this.left = t, this.right = e, this.parent = n, this.hash = s, this.data = i, this.index = a;
  }
}, xe(Hs, "Node"), Hs), Ao = bv;
function qd(r) {
  return _r("0x00".concat(r.slice(2)));
}
xe(qd, "hashLeaf");
function $d(r, t) {
  return _r("0x01".concat(r.slice(2)).concat(t.slice(2)));
}
xe($d, "hashNode");
function Iv(r) {
  const t = [];
  for (let a = 0; a < r.length; a += 1) {
    const o = qd(r[a]), d = new Ao(-1, -1, -1, o, r[a]);
    d.index = a, t.push(d);
  }
  const e = [...t];
  let n = [...t], s = t.length + 1 >> 1, i = t.length & 1;
  for (; ; ) {
    let a = 0;
    for (; a < s - i; a += 1) {
      const o = a << 1, d = $d(n[o].hash, n[o + 1].hash);
      t[a] = new Ao(n[o].index, n[o + 1].index, -1, d, "");
      const h = e.length;
      t[a].index = h, e[n[o].index].parent = h, e[n[o + 1].index].parent = h, e.push(t[a]);
    }
    if (s === 1)
      break;
    i === 1 && (t[a] = n[a << 1]), i = s & 1, s = s + 1 >> 1, n = [...t];
  }
  return e;
}
xe(Iv, "constructTree");
function Kd(r) {
  if (!r.length)
    return yv;
  const t = [];
  for (let i = 0; i < r.length; i += 1) {
    const a = qd(r[i]);
    t.push(new Ao(-1, -1, -1, a, r[i]));
  }
  let e = t, n = t.length + 1 >> 1, s = t.length & 1;
  for (; ; ) {
    let i = 0;
    for (; i < n - s; i += 1) {
      const a = i << 1, o = $d(e[a].hash, e[a + 1].hash);
      t[i] = new Ao(e[a].index, e[a + 1].index, -1, o, "");
    }
    if (s === 1 && (t[i] = e[i << 1]), n === 1)
      break;
    s = n & 1, n = n + 1 >> 1, e = t;
  }
  return t[0].hash;
}
xe(Kd, "calcRoot");
function Ev(r, t) {
  const e = [];
  for (let n = t, s = r[t].parent; s !== -1; n = s, s = r[s].parent)
    r[s].left === n ? e.push(r[r[s].right].hash) : e.push(r[r[s].left].hash);
  return e;
}
xe(Ev, "getProof");
var Cv = "0x00", sf = "0x01";
function af(r, t) {
  const e = "0x00".concat(r.slice(2)).concat(_r(t).slice(2));
  return [_r(e), e];
}
xe(af, "hashLeaf");
function un(r, t) {
  const e = "0x01".concat(r.slice(2)).concat(t.slice(2));
  return [_r(e), e];
}
xe(un, "hashNode");
function Oa(r) {
  const t = sf.length;
  return ["0x".concat(r.slice(t, t + 64)), "0x".concat(r.slice(t + 64))];
}
xe(Oa, "parseLeaf");
function of(r) {
  const t = sf.length;
  return ["0x".concat(r.slice(t, t + 64)), "0x".concat(r.slice(t + 64))];
}
xe(of, "parseNode");
function Ma(r) {
  return r.slice(0, 4) === Cv;
}
xe(Ma, "isLeaf");
var Vs, Bv = (Vs = class {
  constructor(t, e, n, s, i) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "BitMask");
    D(this, "NumSideNodes");
    D(this, "SiblingData");
    this.SideNodes = t, this.NonMembershipLeafData = e, this.BitMask = n, this.NumSideNodes = s, this.SiblingData = i;
  }
}, xe(Vs, "SparseCompactMerkleProof"), Vs), vv = Bv, Ws, xv = (Ws = class {
  constructor(t, e, n) {
    D(this, "SideNodes");
    D(this, "NonMembershipLeafData");
    D(this, "SiblingData");
    this.SideNodes = t, this.NonMembershipLeafData = e, this.SiblingData = n;
  }
}, xe(Ws, "SparseMerkleProof"), Ws), Rv = xv, ze = "0x0000000000000000000000000000000000000000000000000000000000000000", Qr = 256;
function wn(r, t) {
  const e = r.slice(2), n = "0x".concat(
    e.slice(Math.floor(t / 8) * 2, Math.floor(t / 8) * 2 + 2)
  );
  return (Number(n) & 1 << 7 - t % 8) > 0 ? 1 : 0;
}
xe(wn, "getBitAtFromMSB");
function cf(r) {
  let t = 0, e = r.length - 1;
  const n = r;
  for (; t < e; )
    [n[t], n[e]] = [
      n[e],
      n[t]
    ], t += 1, e -= 1;
  return n;
}
xe(cf, "reverseSideNodes");
function df(r, t) {
  let e = 0;
  for (let n = 0; n < Qr && wn(r, n) === wn(t, n); n += 1)
    e += 1;
  return e;
}
xe(df, "countCommonPrefix");
function uf(r) {
  const t = [], e = [];
  let n;
  for (let i = 0; i < r.SideNodes.length; i += 1)
    n = r.SideNodes[i], n === ze ? t.push(0) : (e.push(n), t.push(1));
  return new vv(
    e,
    r.NonMembershipLeafData,
    t,
    r.SideNodes.length,
    r.SiblingData
  );
}
xe(uf, "compactProof");
var Ys, Sv = (Ys = class {
  constructor() {
    D(this, "ms");
    D(this, "root");
    const t = {};
    this.ms = t, this.root = ze, this.ms[this.root] = ze;
  }
  get(t) {
    return this.ms[t];
  }
  set(t, e) {
    this.ms[t] = e;
  }
  setRoot(t) {
    this.root = t;
  }
  sideNodesForRoot(t, e) {
    const n = [];
    if (e === ze)
      return [n, ze, "", ""];
    let s = this.get(e);
    if (Ma(s))
      return [n, e, s, ""];
    let i, a, o = "", d = "";
    for (let f = 0; f < Qr; f += 1) {
      if ([i, a] = of(s), wn(t, f) === 1 ? (d = i, o = a) : (d = a, o = i), n.push(d), o === ze) {
        s = "";
        break;
      }
      if (s = this.get(o), Ma(s))
        break;
    }
    const h = this.get(d);
    return [cf(n), o, s, h];
  }
  deleteWithSideNodes(t, e, n, s) {
    if (n === ze)
      return this.root;
    const [i] = Oa(s);
    if (i !== t)
      return this.root;
    let a = "", o = "", d = "", h = "", f = !1;
    for (let g = 0; g < e.length; g += 1)
      if (e[g] !== "") {
        if (d = e[g], o === "")
          if (h = this.get(d), Ma(h)) {
            a = d, o = d;
            continue;
          } else
            o = ze, f = !0;
        !f && d === ze || (f || (f = !0), wn(t, e.length - 1 - g) === 1 ? [a, o] = un(d, o) : [a, o] = un(o, d), this.set(a, o), o = a);
      }
    return a === "" && (a = ze), a;
  }
  updateWithSideNodes(t, e, n, s, i) {
    let a, o;
    this.set(_r(e), e), [a, o] = af(t, e), this.set(a, o), o = a;
    let d;
    if (s === ze)
      d = Qr;
    else {
      const [h] = Oa(i);
      d = df(t, h);
    }
    d !== Qr && (wn(t, d) === 1 ? [a, o] = un(s, o) : [a, o] = un(o, s), this.set(a, o), o = a);
    for (let h = 0; h < Qr; h += 1) {
      let f;
      const g = Qr - n.length;
      if (h - g < 0 || n[h - g] === "")
        if (d !== Qr && d > Qr - 1 - h)
          f = ze;
        else
          continue;
      else
        f = n[h - g];
      wn(t, Qr - 1 - h) === 1 ? [a, o] = un(f, o) : [a, o] = un(o, f), this.set(a, o), o = a;
    }
    return a;
  }
  update(t, e) {
    const [n, s, i] = this.sideNodesForRoot(t, this.root), a = this.updateWithSideNodes(t, e, n, s, i);
    this.setRoot(a);
  }
  delete(t) {
    const [e, n, s] = this.sideNodesForRoot(t, this.root), i = this.deleteWithSideNodes(t, e, n, s);
    this.setRoot(i);
  }
  prove(t) {
    const [e, n, s, i] = this.sideNodesForRoot(t, this.root), a = [];
    for (let h = 0; h < e.length; h += 1)
      e[h] !== "" && a.push(e[h]);
    let o = "";
    if (n !== ze) {
      const [h] = Oa(s);
      h !== t && (o = s);
    }
    return new Rv(a, o, i);
  }
  proveCompacted(t) {
    const e = this.prove(t);
    return uf(e);
  }
}, xe(Ys, "SparseMerkleTree"), Ys), Tv = Object.defineProperty, T = (r, t) => Tv(r, "name", { value: t, configurable: !0 }), at = {
  eth: {
    mainnet: 1,
    sepolia: 11155111,
    foundry: 31337
  },
  fuel: {
    devnet: 0,
    testnet: 0,
    mainnet: 9889
  }
}, Nv = /* @__PURE__ */ T((r) => {
  if (r === "ethereum")
    return at.eth.sepolia;
  if (r === "fuel")
    return at.fuel.testnet;
}, "getDefaultChainId"), Dv = /* @__PURE__ */ T(({
  asset: r,
  chainId: t,
  networkType: e
}) => r.networks.find(
  (s) => s.chainId === t && s.type === e
), "getAssetNetwork"), hf = /* @__PURE__ */ T(({
  asset: r,
  chainId: t,
  networkType: e
}) => {
  const { networks: n, ...s } = r, i = t ?? Nv(e);
  if (i === void 0)
    return;
  const a = Dv({
    asset: r,
    chainId: i,
    networkType: e
  });
  if (a)
    return {
      ...s,
      ...a
    };
}, "getAssetWithNetwork"), lR = /* @__PURE__ */ T((r, t) => hf({
  asset: r,
  networkType: "ethereum",
  chainId: t
}), "getAssetEth"), _R = /* @__PURE__ */ T((r, t) => hf({
  asset: r,
  networkType: "fuel",
  chainId: t
}), "getAssetFuel"), Fv = "/", Qv = /^\/|\/$/g, Ov = /* @__PURE__ */ T((r = "") => r.replace(Qv, ""), "trimPath");
function Af(r, ...t) {
  const e = r != null, n = (r == null ? void 0 : r[0]) === "/" && r.length > 1, s = [r, ...t].filter(Boolean).map(Ov);
  return n && e && s.unshift(""), s.join(Fv);
}
T(Af, "urlJoin");
function lf(r, t = "./") {
  return r.map((e) => ({
    ...e,
    icon: Af(t, e.icon)
  }));
}
T(lf, "resolveIconPaths");
var Mv = "https://assets.fuel.network/providers/", Pv = [
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "eth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.sepolia,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: at.eth.foundry,
        decimals: 18
      },
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.devnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: at.fuel.testnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        decimals: 9,
        assetId: "0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07"
      }
    ]
  },
  {
    name: "WETH",
    symbol: "WETH",
    icon: "weth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xa38a5a8beeb08d95744bc7f58528073f4052b254def59eba20c99c202b5acaa3",
        decimals: 9
      }
    ]
  },
  {
    name: "weETH",
    symbol: "weETH",
    icon: "weETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x239ed6e12b7ce4089ee245244e3bf906999a6429c2a9a445a1e1faf56914a4ab",
        decimals: 9
      }
    ]
  },
  {
    name: "rsETH",
    symbol: "rsETH",
    icon: "rsETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xbae80f7fb8aa6b90d9b01ef726ec847cc4f59419c4d5f2ea88fec785d1b0e849",
        decimals: 9
      }
    ]
  },
  {
    name: "rETH",
    symbol: "rETH",
    icon: "reth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xae78736cd615f374d3085123a210448e74fc6393",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xf3f9a0ed0ce8eac5f89d6b83e41b3848212d5b5f56108c54a205bb228ca30c16",
        decimals: 9
      }
    ]
  },
  {
    name: "wbETH",
    symbol: "wbETH",
    icon: "wbeth.png",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xa2E3356610840701BDf5611a53974510Ae27E2e1",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x7843c74bef935e837f2bcf67b5d64ecb46dd53ff86375530b0caf3699e8ffafe",
        decimals: 9
      }
    ]
  },
  {
    name: "rstETH",
    symbol: "rstETH",
    icon: "rstETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x7a4EffD87C2f3C55CA251080b1343b605f327E3a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x962792286fbc9b1d5860b4551362a12249362c21594c77abf4b3fe2bbe8d977a",
        decimals: 9
      }
    ]
  },
  {
    name: "amphrETH",
    symbol: "amphrETH",
    icon: "amphrETH.png",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x5fD13359Ba15A84B76f7F87568309040176167cd",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x05fc623e57bd7bc1258efa8e4f62b05af5471d73df6f2c2dc11ecc81134c4f36",
        decimals: 9
      }
    ]
  },
  {
    name: "Manta mBTC",
    symbol: "Manta mBTC",
    icon: "manta-mbtc.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x4041381e947CFD3D483d67a25C6aa9Dc924250c5",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xaf3111a248ff7a3238cdeea845bb2d43cf3835f1f6b8c9d28360728b55b9ce5b",
        decimals: 9
      }
    ]
  },
  {
    name: "Manta mETH",
    symbol: "Manta mETH",
    icon: "manta-meth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x8CdF550C04Bc9B9F10938368349C9c8051A772b6",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xafd219f513317b1750783c6581f55530d6cf189a5863fd18bd1b3ffcec1714b4",
        decimals: 9
      }
    ]
  },
  {
    name: "Manta mUSD",
    symbol: "Manta mUSD",
    icon: "manta-musd.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x3f24E1d7a973867fC2A03fE199E5502514E0e11E",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x89cb9401e55d49c3269654dd1cdfb0e80e57823a4a7db98ba8fc5953b120fef4",
        decimals: 9
      }
    ]
  },
  {
    name: "pumpBTC",
    symbol: "pumpBTC",
    icon: "pumpbtc.webp",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xf469fbd2abcd6b9de8e169d128226c0fc90a012e",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x0aa5eb2bb97ca915288b653a2529355d4dc66de2b37533213f0e4aeee3d3421f",
        decimals: 8
      }
    ]
  },
  {
    name: "FBTC",
    symbol: "FBTC",
    icon: "fbtc.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xc96de26018a54d51c097160568752c4e3bd6c364",
        decimals: 8
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xb5ecb0a1e08e2abbabf624ffea089df933376855f468ade35c6375b00c33996a",
        decimals: 8
      }
    ]
  },
  {
    name: "SolvBTC",
    symbol: "SolvBTC",
    icon: "solvBTC.webp",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x7a56e1c57c7475ccf742a1832b028f0456652f97",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1186afea9affb88809c210e13e2330b5258c2cef04bb8fff5eff372b7bd3f40f",
        decimals: 9
      }
    ]
  },
  {
    name: "SolvBTC.BBN",
    symbol: "SolvBTC.BBN",
    icon: "SolvBTC.BBN.png",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xd9d920aa40f578ab794426f5c90f6c731d159def",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x7a4f087c957d30218223c2baaaa365355c9ca81b6ea49004cfb1590a5399216f",
        decimals: 9
      }
    ]
  },
  {
    name: "Mantle mETH",
    symbol: "Mantle mETH",
    icon: "mantle-meth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x642a5db59ec323c2f846d4d4cf3e58d78aff64accf4f8f6455ba0aa3ef000a3b",
        decimals: 9
      }
    ]
  },
  {
    name: "sDAI",
    symbol: "sDAI",
    icon: "sdai.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x83f20f44975d03b1b09e64809b757c47f942beea",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x9e46f919fbf978f3cad7cd34cca982d5613af63ff8aab6c379e4faa179552958",
        decimals: 9
      }
    ]
  },
  {
    name: "USDT",
    symbol: "USDT",
    icon: "usdt.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xa0265fb5c32f6e8db3197af3c7eb05c48ae373605b8165b6f4a51c5b0ba4812e",
        decimals: 6
      }
    ]
  },
  {
    name: "USDC",
    symbol: "USDC",
    icon: "usdc.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: 6
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x286c479da40dc953bddc3bb4c453b608bba2e0ac483b077bd475174115395e6b",
        decimals: 6
      }
    ]
  },
  {
    name: "USDe",
    symbol: "USDe",
    icon: "USDe.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x4c9edd5852cd905f086c759e8383e09bff1e68b3",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xb6133b2ef9f6153eb869125d23dcf20d1e735331b5e41b15a6a7a6cec70e8651",
        decimals: 9
      }
    ]
  },
  {
    name: "sUSDe",
    symbol: "sUSDe",
    icon: "sUSDe.webp",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x9d39a5de30e57443bff2a8307a4256c8797a3497",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xd05563025104fc36496c15c7021ad6b31034b0e89a356f4f818045d1f48808bc",
        decimals: 9
      }
    ]
  },
  {
    name: "rsUSDe",
    symbol: "rsUSDe",
    icon: "rsUSDe.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x82f5104b23FF2FA54C2345F821dAc9369e9E0B26",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x78d4522ec607f6e8efb66ea49439d1ee48623cf763f9688a8eada025def033d9",
        decimals: 9
      }
    ]
  },
  {
    name: "wstETH",
    symbol: "wstETH",
    icon: "wsteth.svg",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1a7815cc9f75db5c24a5b0814bfb706bb9fe485333e98254015de8f48f84c67b",
        decimals: 9
      }
    ]
  },
  {
    name: "ezETH",
    symbol: "ezETH",
    icon: "ezeth.webp",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x91b3559edb2619cde8ffb2aa7b3c3be97efd794ea46700db7092abeee62281b0",
        decimals: 9
      }
    ]
  },
  {
    name: "pzETH",
    symbol: "pzETH",
    icon: "pzETH.webp",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x8c9532a60e0e7c6bbd2b2c1303f63ace1c3e9811",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x1493d4ec82124de8f9b625682de69dcccda79e882b89a55a8c737b12de67bd68",
        decimals: 9
      }
    ]
  },
  {
    name: "Re7LRT",
    symbol: "Re7LRT",
    icon: "Re7LRT.png",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0x84631c0d0081FDe56DeB72F6DE77abBbF6A9f93a",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0xf2fc648c23a5db24610a1cf696acc4f0f6d9a7d6028dd9944964ab23f6e35995",
        decimals: 9
      }
    ]
  },
  {
    name: "steakLRT",
    symbol: "steakLRT",
    icon: "steakLRT.png",
    networks: [
      {
        type: "ethereum",
        chainId: at.eth.mainnet,
        address: "0xBEEF69Ac7870777598A04B2bd4771c71212E6aBc",
        decimals: 18
      },
      {
        type: "fuel",
        chainId: at.fuel.mainnet,
        contractId: "0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8",
        assetId: "0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30",
        decimals: 9
      }
    ]
  }
], pR = lf(Pv, Mv), _f = {
  mainnet: "https://mainnet-explorer.fuel.network",
  testnet: "https://explorer-indexer-testnet.fuel.network"
}, pf = /* @__PURE__ */ T(async (r, t) => {
  const e = await fetch(`${r}${t}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  try {
    return await e.json();
  } catch {
    return null;
  }
}, "request"), Lv = /* @__PURE__ */ T((r) => {
  const t = new URLSearchParams();
  return Object.entries(r).forEach(([e, n]) => {
    t.set(e, n.toString());
  }), t.size > 0 ? `?${t.toString()}` : "";
}, "buildQueryString"), fR = /* @__PURE__ */ T((r) => {
  const { network: t = "mainnet", assetId: e } = r, n = _f[t];
  return pf(n, `/assets/${e}`);
}, "getAssetById"), gR = /* @__PURE__ */ T(async (r) => {
  const { network: t = "mainnet", owner: e, pagination: n = { last: 10 } } = r, s = _f[t], { last: i } = n, a = Lv({ last: i }), o = await pf(s, `/accounts/${e}/assets${a}`);
  return o || { data: [], pageInfo: { count: 0 } };
}, "getAssetsByOwner"), tu = /* @__PURE__ */ T((r) => {
  let t, e, n;
  return Array.isArray(r) ? (e = r[0], t = r[1], n = r[2] ?? void 0) : (e = r.amount, t = r.assetId, n = r.max ?? void 0), {
    assetId: W(t),
    amount: E(e),
    max: n ? E(n) : void 0
  };
}, "coinQuantityfy"), kv = /* @__PURE__ */ T((r) => {
  const { amount: t, assetId: e } = r, n = [...r.coinQuantities], s = n.findIndex((i) => i.assetId === e);
  return s !== -1 ? n[s].amount = n[s].amount.add(t) : n.push({ assetId: e, amount: t }), n;
}, "addAmountToCoinQuantities"), Uv = q`
    fragment InputCoinFragment on InputCoin {
  type: __typename
  utxoId
  owner
  amount
  assetId
  txPointer
  coinWitnessIndex: witnessIndex
  predicateGasUsed
  predicate
  predicateData
}
    `, Gv = q`
    fragment InputMessageFragment on InputMessage {
  type: __typename
  sender
  recipient
  amount
  nonce
  messageWitnessIndex: witnessIndex
  predicateGasUsed
  data
  predicate
  predicateData
}
    `, zv = q`
    fragment InputContractFragment on InputContract {
  type: __typename
  utxoId
  balanceRoot
  stateRoot
  txPointer
  contractId
}
    `, Xv = q`
    fragment OutputCoinFragment on CoinOutput {
  type: __typename
  to
  amount
  assetId
}
    `, Hv = q`
    fragment OutputContractFragment on ContractOutput {
  type: __typename
  inputIndex
  balanceRoot
  stateRoot
}
    `, Vv = q`
    fragment OutputChangeFragment on ChangeOutput {
  type: __typename
  to
  amount
  assetId
}
    `, Wv = q`
    fragment OutputVariableFragment on VariableOutput {
  type: __typename
  to
  amount
  assetId
}
    `, Yv = q`
    fragment OutputContractCreatedFragment on ContractCreated {
  type: __typename
  contract
  stateRoot
}
    `, eu = q`
    fragment SubmittedStatusFragment on SubmittedStatus {
  type: __typename
  time
}
    `, Hn = q`
    fragment receiptFragment on Receipt {
  id
  pc
  is
  to
  toAddress
  amount
  assetId
  gas
  param1
  param2
  val
  ptr
  digest
  reason
  ra
  rb
  rc
  rd
  len
  receiptType
  result
  gasUsed
  data
  sender
  recipient
  nonce
  contractId
  subId
}
    `, ff = q`
    fragment SuccessStatusFragment on SuccessStatus {
  type: __typename
  time
  programState {
    returnType
    data
  }
  receipts {
    ...receiptFragment
  }
  totalGas
  totalFee
}
    ${Hn}`, gf = q`
    fragment SuccessStatusWithBlockIdFragment on SuccessStatus {
  ...SuccessStatusFragment
  block {
    id
  }
}
    ${ff}`, jv = q`
    fragment malleableTransactionFieldsFragment on Transaction {
  receiptsRoot
  inputs {
    type: __typename
    ... on InputCoin {
      txPointer
    }
    ... on InputContract {
      txPointer
    }
  }
  outputs {
    type: __typename
    ... on CoinOutput {
      to
      amount
      assetId
    }
    ... on ContractOutput {
      inputIndex
      balanceRoot
      stateRoot
    }
    ... on ChangeOutput {
      to
      amount
      assetId
    }
    ... on VariableOutput {
      to
      amount
      assetId
    }
    ... on ContractCreated {
      contract
      stateRoot
    }
  }
}
    `, wf = q`
    fragment FailureStatusFragment on FailureStatus {
  type: __typename
  totalGas
  totalFee
  time
  reason
  receipts {
    ...receiptFragment
  }
}
    ${Hn}`, mf = q`
    fragment FailureStatusWithBlockIdFragment on FailureStatus {
  ...FailureStatusFragment
  block {
    id
  }
}
    ${wf}`, ru = q`
    fragment SqueezedOutStatusFragment on SqueezedOutStatus {
  type: __typename
  reason
}
    `, yf = q`
    fragment PreconfirmationSuccessStatusFragment on PreconfirmationSuccessStatus {
  type: __typename
  totalGas
  totalFee
  resolvedOutputs {
    utxoId
    output {
      type: __typename
      ... on CoinOutput {
        to
        amount
        assetId
      }
      ... on ContractOutput {
        inputIndex
        balanceRoot
        stateRoot
      }
      ... on ChangeOutput {
        to
        amount
        assetId
      }
      ... on VariableOutput {
        to
        amount
        assetId
      }
      ... on ContractCreated {
        contract
        stateRoot
      }
    }
  }
  preconfirmationReceipts: receipts {
    ...receiptFragment
  }
}
    ${Hn}`, bf = q`
    fragment PreconfirmationFailureStatusFragment on PreconfirmationFailureStatus {
  type: __typename
  reason
  totalGas
  totalFee
  resolvedOutputs {
    utxoId
    output {
      type: __typename
      ... on CoinOutput {
        to
        amount
        assetId
      }
      ... on ContractOutput {
        inputIndex
        balanceRoot
        stateRoot
      }
      ... on ChangeOutput {
        to
        amount
        assetId
      }
      ... on VariableOutput {
        to
        amount
        assetId
      }
      ... on ContractCreated {
        contract
        stateRoot
      }
    }
  }
  preconfirmationReceipts: receipts {
    ...receiptFragment
  }
}
    ${Hn}`, If = q`
    fragment transactionStatusSubscriptionFragment on TransactionStatus {
  ... on SubmittedStatus {
    ...SubmittedStatusFragment
  }
  ... on SuccessStatus {
    ...SuccessStatusWithBlockIdFragment
    transaction {
      ...malleableTransactionFieldsFragment
    }
  }
  ... on FailureStatus {
    ...FailureStatusWithBlockIdFragment
    transaction {
      ...malleableTransactionFieldsFragment
    }
  }
  ... on SqueezedOutStatus {
    ...SqueezedOutStatusFragment
  }
  ... on PreconfirmationSuccessStatus {
    ...PreconfirmationSuccessStatusFragment
  }
  ... on PreconfirmationFailureStatus {
    ...PreconfirmationFailureStatusFragment
  }
}
    ${eu}
${gf}
${jv}
${mf}
${ru}
${yf}
${bf}`, Zv = q`
    fragment transactionStatusFragment on TransactionStatus {
  ... on SubmittedStatus {
    ...SubmittedStatusFragment
  }
  ... on SuccessStatus {
    ...SuccessStatusFragment
  }
  ... on FailureStatus {
    ...FailureStatusFragment
  }
  ... on SqueezedOutStatus {
    ...SqueezedOutStatusFragment
  }
}
    ${eu}
${ff}
${wf}
${ru}`, Ef = q`
    fragment transactionFragment on Transaction {
  id
  rawPayload
  status {
    ...transactionStatusFragment
  }
}
    ${Zv}`, Jv = q`
    fragment transactionRawPayloadFragment on Transaction {
  id
  rawPayload
}
    `, qv = q`
    fragment inputEstimatePredicatesFragment on Input {
  ... on InputCoin {
    predicateGasUsed
  }
  ... on InputMessage {
    predicateGasUsed
  }
}
    `, Cf = q`
    fragment transactionEstimatePredicatesFragment on Transaction {
  inputs {
    ...inputEstimatePredicatesFragment
  }
}
    ${qv}`, $v = q`
    fragment dryRunFailureAssembleTxFragment on DryRunFailureStatus {
  type: __typename
  reason
  receipts {
    ...receiptFragment
  }
}
    ${Hn}`, Kv = q`
    fragment dryRunSuccessAssembleTxFragment on DryRunSuccessStatus {
  type: __typename
  receipts {
    ...receiptFragment
  }
}
    ${Hn}`, t1 = q`
    fragment dryRunFailureStatusFragment on DryRunFailureStatus {
  type: __typename
  totalGas
  totalFee
  reason
  programState {
    returnType
    data
  }
}
    `, e1 = q`
    fragment dryRunSuccessStatusFragment on DryRunSuccessStatus {
  type: __typename
  totalGas
  totalFee
  programState {
    returnType
    data
  }
}
    `, r1 = q`
    fragment dryRunTransactionStatusFragment on DryRunTransactionStatus {
  ... on DryRunFailureStatus {
    ...dryRunFailureStatusFragment
  }
  ... on DryRunSuccessStatus {
    ...dryRunSuccessStatusFragment
  }
}
    ${t1}
${e1}`, n1 = q`
    fragment dryRunTransactionExecutionStatusFragment on DryRunTransactionExecutionStatus {
  id
  status {
    ...dryRunTransactionStatusFragment
  }
  receipts {
    ...receiptFragment
  }
}
    ${r1}
${Hn}`, Mo = q`
    fragment blockFragment on Block {
  id
  height
  header {
    time
    daHeight
    stateTransitionBytecodeVersion
    transactionsCount
    transactionsRoot
    messageOutboxRoot
    eventInboxRoot
    prevRoot
    applicationHash
  }
  transactions {
    id
  }
}
    `, nu = q`
    fragment coinFragment on Coin {
  type: __typename
  utxoId
  amount
  assetId
  blockCreated
  txCreatedIdx
}
    `, s1 = q`
    fragment messageCoinFragment on MessageCoin {
  type: __typename
  sender
  recipient
  nonce
  amount
  assetId
  daHeight
}
    `, Bf = q`
    fragment messageFragment on Message {
  amount
  sender
  recipient
  data
  daHeight
}
    `, i1 = q`
    fragment getMessageFragment on Message {
  ...messageFragment
  nonce
}
    ${Bf}`, a1 = q`
    fragment messageProofFragment on MessageProof {
  messageProof {
    proofSet
    proofIndex
  }
  blockProof {
    proofSet
    proofIndex
  }
  messageBlockHeader {
    version
    id
    daHeight
    consensusParametersVersion
    stateTransitionBytecodeVersion
    transactionsCount
    messageReceiptCount
    transactionsRoot
    messageOutboxRoot
    eventInboxRoot
    height
    prevRoot
    time
    applicationHash
  }
  commitBlockHeader {
    version
    id
    daHeight
    consensusParametersVersion
    stateTransitionBytecodeVersion
    transactionsCount
    messageReceiptCount
    transactionsRoot
    messageOutboxRoot
    eventInboxRoot
    height
    prevRoot
    time
    applicationHash
  }
  sender
  recipient
  amount
  data
}
    `, o1 = q`
    fragment TxParametersFragment on TxParameters {
  version
  maxInputs
  maxOutputs
  maxWitnesses
  maxGasPerTx
  maxSize
  maxBytecodeSubsections
}
    `, c1 = q`
    fragment PredicateParametersFragment on PredicateParameters {
  version
  maxPredicateLength
  maxPredicateDataLength
  maxGasPerPredicate
  maxMessageDataLength
}
    `, d1 = q`
    fragment ScriptParametersFragment on ScriptParameters {
  version
  maxScriptLength
  maxScriptDataLength
}
    `, u1 = q`
    fragment ContractParametersFragment on ContractParameters {
  version
  contractMaxSize
  maxStorageSlots
}
    `, h1 = q`
    fragment FeeParametersFragment on FeeParameters {
  version
  gasPriceFactor
  gasPerByte
}
    `, A1 = q`
    fragment DependentCostFragment on DependentCost {
  ... on LightOperation {
    type: __typename
    base
    unitsPerGas
  }
  ... on HeavyOperation {
    type: __typename
    base
    gasPerUnit
  }
}
    `, l1 = q`
    fragment GasCostsFragment on GasCosts {
  contractRoot {
    ...DependentCostFragment
  }
  stateRoot {
    ...DependentCostFragment
  }
  vmInitialization {
    ...DependentCostFragment
  }
  s256 {
    ...DependentCostFragment
  }
  ecr1
  newStoragePerByte
}
    ${A1}`, _1 = q`
    fragment consensusParametersFragment on ConsensusParameters {
  version
  txParams {
    ...TxParametersFragment
  }
  predicateParams {
    ...PredicateParametersFragment
  }
  scriptParams {
    ...ScriptParametersFragment
  }
  contractParams {
    ...ContractParametersFragment
  }
  feeParams {
    ...FeeParametersFragment
  }
  gasCosts {
    ...GasCostsFragment
  }
  baseAssetId
  chainId
}
    ${o1}
${c1}
${d1}
${u1}
${h1}
${l1}`, vf = q`
    fragment chainInfoFragment on ChainInfo {
  name
  daHeight
  consensusParameters {
    ...consensusParametersFragment
  }
  latestBlock {
    header {
      consensusParametersVersion
    }
  }
}
    ${_1}`, p1 = q`
    fragment contractBalanceFragment on ContractBalance {
  contract
  amount
  assetId
}
    `, Ni = q`
    fragment pageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `, xf = q`
    fragment nodeInfoFragment on NodeInfo {
  utxoValidation
  vmBacktrace
  maxTx
  maxDepth
  nodeVersion
  indexation {
    balances
    coinsToSpend
    assetMetadata
  }
}
    `, f1 = q`
    fragment relayedTransactionStatusFragment on RelayedTransactionStatus {
  ... on RelayedTransactionFailed {
    blockHeight
    failure
  }
}
    `, g1 = q`
    query getVersion {
  nodeInfo {
    nodeVersion
  }
}
    `, w1 = q`
    query getNodeInfo {
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${xf}`, m1 = q`
    query getChain {
  chain {
    ...chainInfoFragment
  }
}
    ${vf}`, y1 = q`
    query getChainAndNodeInfo {
  chain {
    ...chainInfoFragment
  }
  nodeInfo {
    ...nodeInfoFragment
  }
}
    ${vf}
${xf}`, b1 = q`
    query getTransaction($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    ...transactionFragment
  }
}
    ${Ef}`, I1 = q`
    query getTransactionWithReceipts($transactionId: TransactionId!) {
  transaction(id: $transactionId) {
    id
    rawPayload
    status {
      ... on SubmittedStatus {
        ...SubmittedStatusFragment
      }
      ... on SuccessStatus {
        ...SuccessStatusWithBlockIdFragment
      }
      ... on FailureStatus {
        ...FailureStatusWithBlockIdFragment
      }
      ... on SqueezedOutStatus {
        ...SqueezedOutStatusFragment
      }
      ... on PreconfirmationSuccessStatus {
        ...PreconfirmationSuccessStatusFragment
      }
      ... on PreconfirmationFailureStatus {
        ...PreconfirmationFailureStatusFragment
      }
    }
  }
}
    ${eu}
${gf}
${mf}
${ru}
${yf}
${bf}`, E1 = q`
    query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
  transactions(after: $after, before: $before, first: $first, last: $last) {
    edges {
      node {
        rawPayload
      }
    }
    pageInfo {
      ...pageInfoFragment
    }
  }
}
    ${Ni}`, C1 = q`
    query getTransactionsByOwner($owner: Address!, $after: String, $before: String, $first: Int, $last: Int) {
  transactionsByOwner(
    owner: $owner
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...transactionFragment
      }
    }
  }
}
    ${Ni}
${Ef}`, B1 = q`
    query estimatePredicates($encodedTransaction: HexString!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
}
    ${Cf}`, v1 = q`
    query estimatePredicatesAndGasPrice($encodedTransaction: HexString!, $blockHorizon: U32!) {
  estimatePredicates(tx: $encodedTransaction) {
    ...transactionEstimatePredicatesFragment
  }
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    ${Cf}`, x1 = q`
    query getLatestBlock {
  chain {
    latestBlock {
      ...blockFragment
    }
  }
}
    ${Mo}`, R1 = q`
    query getLatestBlockHeight {
  chain {
    latestBlock {
      height
    }
  }
}
    `, S1 = q`
    query getBlock($blockId: BlockId, $height: U32) {
  block(id: $blockId, height: $height) {
    ...blockFragment
  }
}
    ${Mo}`, T1 = q`
    query getBlockWithTransactions($blockId: BlockId, $blockHeight: U32) {
  block(id: $blockId, height: $blockHeight) {
    ...blockFragment
    transactions {
      ...transactionRawPayloadFragment
    }
  }
}
    ${Mo}
${Jv}`, N1 = q`
    query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
  blocks(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...blockFragment
      }
    }
  }
}
    ${Ni}
${Mo}`, D1 = q`
    query getCoin($coinId: UtxoId!) {
  coin(utxoId: $coinId) {
    ...coinFragment
    owner
  }
}
    ${nu}`, F1 = q`
    query getCoins($filter: CoinFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
  coins(
    filter: $filter
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...coinFragment
      }
    }
  }
}
    ${Ni}
${nu}`, Q1 = q`
    query getCoinsToSpend($owner: Address!, $queryPerAsset: [SpendQueryElementInput!]!, $excludedIds: ExcludeInput) {
  coinsToSpend(
    owner: $owner
    queryPerAsset: $queryPerAsset
    excludedIds: $excludedIds
  ) {
    ...coinFragment
    ...messageCoinFragment
  }
}
    ${nu}
${s1}`, O1 = q`
    query getContract($contractId: ContractId!) {
  contract(id: $contractId) {
    bytecode
    id
  }
}
    `, M1 = q`
    query getContractBalance($contract: ContractId!, $asset: AssetId!) {
  contractBalance(contract: $contract, asset: $asset) {
    ...contractBalanceFragment
  }
}
    ${p1}`, P1 = q`
    query getBalance($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    amount
  }
}
    `, L1 = q`
    query getBalanceV2($owner: Address!, $assetId: AssetId!) {
  balance(owner: $owner, assetId: $assetId) {
    amountU128
  }
}
    `, k1 = q`
    query getLatestGasPrice {
  latestGasPrice {
    gasPrice
  }
}
    `, U1 = q`
    query estimateGasPrice($blockHorizon: U32!) {
  estimateGasPrice(blockHorizon: $blockHorizon) {
    gasPrice
  }
}
    `, G1 = q`
    query getBalances($filter: BalanceFilterInput!, $after: String, $before: String, $first: Int, $last: Int) {
  balances(
    filter: $filter
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    edges {
      node {
        assetId
        amount
      }
    }
  }
}
    `, z1 = q`
    query getBalancesV2($filter: BalanceFilterInput!, $after: String, $before: String, $first: Int, $last: Int, $supportsPagination: Boolean!) {
  balances(
    filter: $filter
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo @include(if: $supportsPagination) {
      ...pageInfoFragment
    }
    edges {
      node {
        assetId
        amountU128
      }
    }
  }
}
    ${Ni}`, X1 = q`
    query getMessages($owner: Address!, $after: String, $before: String, $first: Int, $last: Int) {
  messages(
    owner: $owner
    after: $after
    before: $before
    first: $first
    last: $last
  ) {
    pageInfo {
      ...pageInfoFragment
    }
    edges {
      node {
        ...getMessageFragment
      }
    }
  }
}
    ${Ni}
${i1}`, H1 = q`
    query daCompressedBlock($height: U32!) {
  daCompressedBlock(height: $height) {
    bytes
  }
}
    `, V1 = q`
    query getMessageProof($transactionId: TransactionId!, $nonce: Nonce!, $commitBlockId: BlockId, $commitBlockHeight: U32) {
  messageProof(
    transactionId: $transactionId
    nonce: $nonce
    commitBlockId: $commitBlockId
    commitBlockHeight: $commitBlockHeight
  ) {
    ...messageProofFragment
  }
}
    ${a1}`, W1 = q`
    query getMessageStatus($nonce: Nonce!) {
  messageStatus(nonce: $nonce) {
    state
  }
}
    `, Y1 = q`
    query getRelayedTransactionStatus($relayedTransactionId: RelayedTransactionId!) {
  relayedTransactionStatus(id: $relayedTransactionId) {
    ...relayedTransactionStatusFragment
  }
}
    ${f1}`, j1 = q`
    query getAssetDetails($assetId: AssetId!) {
  assetDetails(id: $assetId) {
    subId
    contractId
    totalSupply
  }
}
    `, Z1 = q`
    query assembleTx($tx: HexString!, $blockHorizon: U32!, $requiredBalances: [RequiredBalance!]!, $feeAddressIndex: U16!, $excludeInput: ExcludeInput, $estimatePredicates: Boolean, $reserveGas: U64) {
  assembleTx(
    tx: $tx
    blockHorizon: $blockHorizon
    requiredBalances: $requiredBalances
    feeAddressIndex: $feeAddressIndex
    excludeInput: $excludeInput
    estimatePredicates: $estimatePredicates
    reserveGas: $reserveGas
  ) {
    transaction {
      id
      inputs {
        ... on InputCoin {
          ...InputCoinFragment
        }
        ... on InputContract {
          ...InputContractFragment
        }
        ... on InputMessage {
          ...InputMessageFragment
        }
      }
      outputs {
        ... on CoinOutput {
          ...OutputCoinFragment
        }
        ... on ContractOutput {
          ...OutputContractFragment
        }
        ... on ChangeOutput {
          ...OutputChangeFragment
        }
        ... on VariableOutput {
          ...OutputVariableFragment
        }
        ... on ContractCreated {
          ...OutputContractCreatedFragment
        }
      }
      policies {
        tip
        witnessLimit
        maturity
        maxFee
      }
      witnesses
      scriptGasLimit
    }
    status {
      ... on DryRunFailureStatus {
        ...dryRunFailureAssembleTxFragment
      }
      ... on DryRunSuccessStatus {
        ...dryRunSuccessAssembleTxFragment
      }
    }
    gasPrice
  }
}
    ${Uv}
${zv}
${Gv}
${Xv}
${Hv}
${Vv}
${Wv}
${Yv}
${$v}
${Kv}`, J1 = q`
    query dryRun($encodedTransactions: [HexString!]!, $utxoValidation: Boolean, $gasPrice: U64) {
  dryRun(
    txs: $encodedTransactions
    utxoValidation: $utxoValidation
    gasPrice: $gasPrice
  ) {
    ...dryRunTransactionExecutionStatusFragment
  }
}
    ${n1}`, q1 = q`
    mutation submit($encodedTransaction: HexString!) {
  submit(tx: $encodedTransaction) {
    id
  }
}
    `, $1 = q`
    mutation produceBlocks($startTimestamp: Tai64Timestamp, $blocksToProduce: U32!) {
  produceBlocks(
    blocksToProduce: $blocksToProduce
    startTimestamp: $startTimestamp
  )
}
    `, K1 = q`
    query getMessageByNonce($nonce: Nonce!) {
  message(nonce: $nonce) {
    ...messageFragment
  }
}
    ${Bf}`, tx = q`
    query isUserAccount($blobId: BlobId!, $contractId: ContractId!, $transactionId: TransactionId!) {
  blob(id: $blobId) {
    id
  }
  contract(id: $contractId) {
    id
  }
  transaction(id: $transactionId) {
    id
  }
}
    `, ex = q`
    query getConsensusParametersVersion {
  chain {
    latestBlock {
      header {
        consensusParametersVersion
      }
    }
  }
}
    `, rx = q`
    subscription submitAndAwaitStatus($encodedTransaction: HexString!, $estimatePredicates: Boolean, $includePreConfirmation: Boolean) {
  submitAndAwaitStatus(
    tx: $encodedTransaction
    estimatePredicates: $estimatePredicates
    includePreconfirmation: $includePreConfirmation
  ) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${If}`, nx = q`
    subscription statusChange($transactionId: TransactionId!, $includePreConfirmation: Boolean) {
  statusChange(
    id: $transactionId
    includePreconfirmation: $includePreConfirmation
  ) {
    ...transactionStatusSubscriptionFragment
  }
}
    ${If}`;
function Rf(r) {
  return {
    getVersion(t, e) {
      return r(g1, t, e);
    },
    getNodeInfo(t, e) {
      return r(w1, t, e);
    },
    getChain(t, e) {
      return r(m1, t, e);
    },
    getChainAndNodeInfo(t, e) {
      return r(y1, t, e);
    },
    getTransaction(t, e) {
      return r(b1, t, e);
    },
    getTransactionWithReceipts(t, e) {
      return r(I1, t, e);
    },
    getTransactions(t, e) {
      return r(E1, t, e);
    },
    getTransactionsByOwner(t, e) {
      return r(C1, t, e);
    },
    estimatePredicates(t, e) {
      return r(B1, t, e);
    },
    estimatePredicatesAndGasPrice(t, e) {
      return r(v1, t, e);
    },
    getLatestBlock(t, e) {
      return r(x1, t, e);
    },
    getLatestBlockHeight(t, e) {
      return r(R1, t, e);
    },
    getBlock(t, e) {
      return r(S1, t, e);
    },
    getBlockWithTransactions(t, e) {
      return r(T1, t, e);
    },
    getBlocks(t, e) {
      return r(N1, t, e);
    },
    getCoin(t, e) {
      return r(D1, t, e);
    },
    getCoins(t, e) {
      return r(F1, t, e);
    },
    getCoinsToSpend(t, e) {
      return r(Q1, t, e);
    },
    getContract(t, e) {
      return r(O1, t, e);
    },
    getContractBalance(t, e) {
      return r(M1, t, e);
    },
    getBalance(t, e) {
      return r(P1, t, e);
    },
    getBalanceV2(t, e) {
      return r(L1, t, e);
    },
    getLatestGasPrice(t, e) {
      return r(k1, t, e);
    },
    estimateGasPrice(t, e) {
      return r(U1, t, e);
    },
    getBalances(t, e) {
      return r(G1, t, e);
    },
    getBalancesV2(t, e) {
      return r(z1, t, e);
    },
    getMessages(t, e) {
      return r(X1, t, e);
    },
    daCompressedBlock(t, e) {
      return r(H1, t, e);
    },
    getMessageProof(t, e) {
      return r(V1, t, e);
    },
    getMessageStatus(t, e) {
      return r(W1, t, e);
    },
    getRelayedTransactionStatus(t, e) {
      return r(Y1, t, e);
    },
    getAssetDetails(t, e) {
      return r(j1, t, e);
    },
    assembleTx(t, e) {
      return r(Z1, t, e);
    },
    dryRun(t, e) {
      return r(J1, t, e);
    },
    submit(t, e) {
      return r(q1, t, e);
    },
    produceBlocks(t, e) {
      return r($1, t, e);
    },
    getMessageByNonce(t, e) {
      return r(K1, t, e);
    },
    isUserAccount(t, e) {
      return r(tx, t, e);
    },
    getConsensusParametersVersion(t, e) {
      return r(ex, t, e);
    },
    submitAndAwaitStatus(t, e) {
      return r(rx, t, e);
    },
    statusChange(t, e) {
      return r(nx, t, e);
    }
  };
}
T(Rf, "getSdk");
var Ml = /* @__PURE__ */ T((r) => {
  const t = {};
  return "bytes" in r ? t.predicate = {
    predicate: W(r.bytes),
    predicateAddress: r.address.toB256(),
    predicateData: W(r.getPredicateData())
  } : t.address = r.address.toB256(), t;
}, "resolveAccountForAssembleTxParams"), ts = /* @__PURE__ */ T(async (r) => {
  const { gasPrice: t, transactionRequest: e, setGasLimit: n, setMaxFee: s, provider: i } = r, a = Fe(n), o = Fe(s), d = e.type === Ct.Script;
  if (a && d) {
    const h = e.gasLimit;
    if (E(n).lt(E(h)))
      throw new B(
        L.GAS_LIMIT_TOO_LOW,
        `Gas limit '${n}' is lower than the required: '${h}'.`
      );
    e.gasLimit = E(n);
  }
  if (o) {
    const h = e.maxFee;
    if (E(s).lt(h))
      throw new B(
        L.MAX_FEE_TOO_LOW,
        `Max fee '${s}' is lower than the required: '${h}'.`
      );
    e.maxFee = E(s);
  }
  if (a && !o) {
    const { maxFee: h } = await i.estimateTxGasAndFee({
      transactionRequest: e,
      gasPrice: t
    });
    e.maxFee = h;
  }
  return e;
}, "setAndValidateGasAndFeeForAssembledTx"), on = {
  RPC_CONSISTENCY: /The required fuel block height is higher than the current block height. Required: \d+, Current: \d+/,
  NOT_ENOUGH_COINS_MAX_COINS: /the target cannot be met due to no coins available or exceeding the \d+ coin limit./,
  ASSET_NOT_FOUND: /resource was not found in table/,
  MULTIPLE_CHANGE_POLICIES: /The asset ([a-fA-F0-9]{64}) has multiple change policies/,
  DUPLICATE_CHANGE_OUTPUT_ACCOUNT: /required balances contain duplicate \(asset, account\) pair/,
  INSUFFICIENT_FEE_AMOUNT: /InsufficientFeeAmount { expected: (\d+), provided: (\d+) }/
}, sx = /* @__PURE__ */ T((r) => {
  if (on.NOT_ENOUGH_COINS_MAX_COINS.test(r.message))
    return new B(
      L.INSUFFICIENT_FUNDS_OR_MAX_COINS,
      "Insufficient funds or too many small value coins. Consider combining UTXOs.",
      {},
      r
    );
  if (on.MULTIPLE_CHANGE_POLICIES.test(r.message)) {
    const t = r.message.match(/asset ([a-fA-F0-9]{64})/), e = (t == null ? void 0 : t[1]) || "";
    return new B(
      L.CHANGE_OUTPUT_COLLISION,
      `OutputChange address for asset 0x${e} differs between transaction request and assembleTx parameters.`,
      {},
      r
    );
  }
  if (on.DUPLICATE_CHANGE_OUTPUT_ACCOUNT.test(r.message))
    return new B(
      L.DUPLICATE_CHANGE_OUTPUT_ACCOUNT,
      "The parameter 'accountCoinQuantities' of assembleTx contains duplicate entries for the same assetId with different 'changeOutputAccount'.",
      {},
      r
    );
  if (on.ASSET_NOT_FOUND.test(r.message))
    return new B(
      L.ASSET_NOT_FOUND,
      "Asset not found for given asset id.",
      {},
      r
    );
  if (on.RPC_CONSISTENCY.test(r.message))
    return new B(L.RPC_CONSISTENCY, r.message, {}, r);
  if (on.INSUFFICIENT_FEE_AMOUNT.test(r.message)) {
    const t = r.message.match(on.INSUFFICIENT_FEE_AMOUNT);
    return new B(L.FUNDS_TOO_LOW, (t == null ? void 0 : t[0]) || r.message, {}, r);
  }
  return new B(L.INVALID_REQUEST, r.message, {}, r);
}, "mapGqlErrorMessage"), Pl = /* @__PURE__ */ T((r, t) => t ? new B(
  r.code,
  `${r.message}

${t}`,
  r.metadata,
  r.rawError
) : r, "mapGqlErrorWithIncompatibleNodeVersion"), Sf = /* @__PURE__ */ T((r, t = !1) => {
  if (!Array.isArray(r))
    return;
  const e = r.map(sx);
  if (e.length === 1)
    throw Pl(e[0], t);
  const n = e.map((s) => s.message).join(`
`);
  throw Pl(
    new B(L.INVALID_REQUEST, n, {}, e),
    t
  );
}, "assertGqlResponseHasNoErrors"), We, ld = (We = class {
  constructor(t, e) {
    D(this, "events", []);
    D(this, "parsingLeftover", "");
    this.stream = t, this.onEvent = e;
  }
  static async create(t) {
    const { url: e, query: n, variables: s, fetchFn: i, operationName: a, onEvent: o } = t, d = await i(`${e}-sub`, {
      method: "POST",
      body: JSON.stringify({
        query: Xp(n),
        variables: s,
        operationName: a
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "text/event-stream"
      }
    }), [h, f] = d.body.tee().map((g) => g.getReader());
    return await new We(h).next(), new We(f, o);
  }
  /**
   * This method will take a stream reader and parse the event from the stream.
   *
   * @param reader - The reader of the SSE stream
   * @param parsingLeftover - The leftover string from parsing the previous event
   * @returns The event parsed as a full GraphQL response, whether the stream is done and the leftover string after parsing
   */
  static async readEvent(t, e = "") {
    let n = e;
    const s = /data:.*\n\n/g;
    for (; ; ) {
      const i = [...n.matchAll(s)].flatMap((h) => h);
      if (i.length > 0)
        try {
          return {
            event: JSON.parse(i[0].replace(/^data:/, "")),
            done: !1,
            parsingLeftover: n.replace(i[0], "")
          };
        } catch {
          throw new B(
            L.STREAM_PARSING_ERROR,
            `Error while parsing stream data response: ${n}`
          );
        }
      const { value: a, done: o } = await t.read();
      if (o)
        return { event: void 0, done: o, parsingLeftover: "" };
      const d = We.textDecoder.decode(a).replace(`:keep-alive-text

`, "");
      n += d;
    }
  }
  /**
   * Gets automatically called when iterating in a `for-await-of` loop.
   * It can also be called manually.
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next
   */
  async next() {
    var t;
    for (; ; ) {
      const e = this.events.shift();
      if (e)
        return (t = this.onEvent) == null || t.call(this, e), Sf(
          e.errors,
          We.incompatibleNodeVersionMessage
        ), { value: e.data, done: !1 };
      const { event: n, done: s, parsingLeftover: i } = await We.readEvent(
        this.stream,
        this.parsingLeftover
      );
      if (this.parsingLeftover = i, s)
        return { value: void 0, done: !0 };
      this.events.push(n);
    }
  }
  /**
   * Gets called when `break` is called in a `for-await-of` loop.
   */
  return() {
    return Promise.resolve({ done: !0, value: void 0 });
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}, T(We, "FuelGraphqlSubscriber"), D(We, "incompatibleNodeVersionMessage", !1), D(We, "textDecoder", new TextDecoder()), We), ix = /* @__PURE__ */ T((r) => {
  const { type: t } = r;
  switch (r.type) {
    case vt.Coin: {
      const e = J(r.predicate ?? "0x"), n = J(r.predicateData ?? "0x");
      return {
        type: vt.Coin,
        txID: W(J(r.id).slice(0, kr)),
        outputIndex: Pr(J(r.id).slice(kr, io)),
        owner: W(r.owner),
        amount: E(r.amount),
        assetId: W(r.assetId),
        txPointer: {
          blockHeight: Pr(J(r.txPointer).slice(0, 8)),
          txIndex: Pr(J(r.txPointer).slice(8, 16))
        },
        witnessIndex: r.witnessIndex,
        predicateGasUsed: E(r.predicateGasUsed),
        predicateLength: E(e.length),
        predicateDataLength: E(n.length),
        predicate: W(e),
        predicateData: W(n)
      };
    }
    case vt.Contract:
      return {
        type: vt.Contract,
        txID: W(r.txID || St),
        outputIndex: 0,
        balanceRoot: St,
        stateRoot: St,
        txPointer: {
          blockHeight: Pr(J(r.txPointer).slice(0, 8)),
          txIndex: Pr(J(r.txPointer).slice(8, 16))
        },
        contractID: W(r.contractId)
      };
    case vt.Message: {
      const e = J(r.predicate ?? "0x"), n = J(r.predicateData ?? "0x"), s = J(r.data ?? "0x");
      return {
        type: vt.Message,
        sender: W(r.sender),
        recipient: W(r.recipient),
        amount: E(r.amount),
        nonce: W(r.nonce),
        witnessIndex: r.witnessIndex,
        predicateGasUsed: E(r.predicateGasUsed),
        predicateLength: E(e.length),
        predicateDataLength: E(n.length),
        predicate: W(e),
        predicateData: W(n),
        data: W(s),
        dataLength: s.length
      };
    }
    default:
      throw new B(
        L.INVALID_TRANSACTION_INPUT,
        `Invalid transaction input type: ${t}.`
      );
  }
}, "inputify"), ax = /* @__PURE__ */ T((r) => {
  const { type: t } = r;
  switch (t) {
    case lt.Coin:
      return {
        type: lt.Coin,
        to: W(r.to),
        amount: E(r.amount),
        assetId: W(r.assetId)
      };
    case lt.Contract:
      return {
        type: lt.Contract,
        inputIndex: r.inputIndex,
        balanceRoot: St,
        stateRoot: St
      };
    case lt.Change:
      return {
        type: lt.Change,
        to: W(r.to),
        amount: E(0),
        assetId: W(r.assetId)
      };
    case lt.Variable:
      return {
        type: lt.Variable,
        to: W(r.to || St),
        amount: E(r.amount),
        assetId: W(r.assetId || St)
      };
    case lt.ContractCreated:
      return {
        type: lt.ContractCreated,
        contractId: W(r.contractId),
        stateRoot: W(r.stateRoot)
      };
    default:
      throw new B(
        L.INVALID_TRANSACTION_INPUT,
        `Invalid transaction output type: ${t}.`
      );
  }
}, "outputify"), Ll = /* @__PURE__ */ T((r) => !("data" in r), "isMessageCoin"), wR = /* @__PURE__ */ T((r) => "utxoId" in r, "isRawCoin"), mR = /* @__PURE__ */ T((r) => "recipient" in r, "isRawMessage"), ox = /* @__PURE__ */ T((r) => "id" in r, "isCoin"), yR = /* @__PURE__ */ T((r) => "recipient" in r, "isMessage"), _d = /* @__PURE__ */ T((r) => {
  const { name: t, daHeight: e, consensusParameters: n, latestBlock: s } = r, {
    contractParams: i,
    feeParams: a,
    predicateParams: o,
    scriptParams: d,
    txParams: h,
    gasCosts: f,
    baseAssetId: g,
    chainId: y,
    version: R
  } = n;
  return {
    name: t,
    baseChainHeight: E(e),
    consensusParameters: {
      version: R,
      chainId: E(y),
      baseAssetId: g,
      feeParameters: {
        version: a.version,
        gasPerByte: E(a.gasPerByte),
        gasPriceFactor: E(a.gasPriceFactor)
      },
      contractParameters: {
        version: i.version,
        contractMaxSize: E(i.contractMaxSize),
        maxStorageSlots: E(i.maxStorageSlots)
      },
      txParameters: {
        version: h.version,
        maxInputs: E(h.maxInputs),
        maxOutputs: E(h.maxOutputs),
        maxWitnesses: E(h.maxWitnesses),
        maxGasPerTx: E(h.maxGasPerTx),
        maxSize: E(h.maxSize),
        maxBytecodeSubsections: E(h.maxBytecodeSubsections)
      },
      predicateParameters: {
        version: o.version,
        maxPredicateLength: E(o.maxPredicateLength),
        maxPredicateDataLength: E(o.maxPredicateDataLength),
        maxGasPerPredicate: E(o.maxGasPerPredicate),
        maxMessageDataLength: E(o.maxMessageDataLength)
      },
      scriptParameters: {
        version: d.version,
        maxScriptLength: E(d.maxScriptLength),
        maxScriptDataLength: E(d.maxScriptDataLength)
      },
      gasCosts: f
    },
    latestBlock: s
  };
}, "deserializeChain"), cx = /* @__PURE__ */ T((r) => {
  const { name: t, baseChainHeight: e, consensusParameters: n, latestBlock: s } = r, {
    contractParameters: i,
    feeParameters: a,
    predicateParameters: o,
    scriptParameters: d,
    txParameters: h,
    gasCosts: f,
    baseAssetId: g,
    chainId: y,
    version: R
  } = n;
  return {
    name: t,
    daHeight: e.toString(),
    consensusParameters: {
      version: R,
      chainId: y.toString(),
      baseAssetId: g,
      feeParams: {
        version: a.version,
        gasPerByte: a.gasPerByte.toString(),
        gasPriceFactor: a.gasPriceFactor.toString()
      },
      contractParams: {
        version: i.version,
        contractMaxSize: i.contractMaxSize.toString(),
        maxStorageSlots: i.maxStorageSlots.toString()
      },
      txParams: {
        version: h.version,
        maxInputs: h.maxInputs.toString(),
        maxOutputs: h.maxOutputs.toString(),
        maxWitnesses: h.maxWitnesses.toString(),
        maxGasPerTx: h.maxGasPerTx.toString(),
        maxSize: h.maxSize.toString(),
        maxBytecodeSubsections: h.maxBytecodeSubsections.toString()
      },
      predicateParams: {
        version: o.version,
        maxPredicateLength: o.maxPredicateLength.toString(),
        maxPredicateDataLength: o.maxPredicateDataLength.toString(),
        maxGasPerPredicate: o.maxGasPerPredicate.toString(),
        maxMessageDataLength: o.maxMessageDataLength.toString()
      },
      scriptParams: {
        version: d.version,
        maxScriptLength: d.maxScriptLength.toString(),
        maxScriptDataLength: d.maxScriptDataLength.toString()
      },
      gasCosts: f
    },
    latestBlock: s
  };
}, "serializeChain"), pd = /* @__PURE__ */ T((r) => {
  const { maxDepth: t, maxTx: e, nodeVersion: n, utxoValidation: s, vmBacktrace: i, indexation: a } = r;
  return {
    maxDepth: E(t),
    maxTx: E(e),
    nodeVersion: n,
    utxoValidation: s,
    vmBacktrace: i,
    indexation: a
  };
}, "deserializeNodeInfo"), dx = /* @__PURE__ */ T((r) => {
  const { maxDepth: t, maxTx: e, nodeVersion: n, utxoValidation: s, vmBacktrace: i, indexation: a } = r;
  return {
    maxDepth: t.toString(),
    maxTx: e.toString(),
    nodeVersion: n,
    utxoValidation: s,
    vmBacktrace: i,
    indexation: a
  };
}, "serializeNodeInfo"), ux = /* @__PURE__ */ T((r) => ({
  consensusParametersTimestamp: r.consensusParametersTimestamp,
  chain: _d(r.chain),
  nodeInfo: pd(r.nodeInfo)
}), "deserializeProviderCache"), Tf = /* @__PURE__ */ T(async (r) => ({
  consensusParametersTimestamp: r.consensusParametersTimestamp,
  chain: cx(await r.getChain()),
  nodeInfo: dx(await r.getNode())
}), "serializeProviderCache"), Dt = /* @__PURE__ */ T((r) => r || St, "hexOrZero"), Re = /* @__PURE__ */ T((r) => {
  const { receiptType: t } = r;
  switch (t) {
    case "CALL": {
      const e = Dt(r.id || r.contractId);
      return {
        type: ut.Call,
        id: e,
        to: Dt(r == null ? void 0 : r.to),
        amount: E(r.amount),
        assetId: Dt(r.assetId),
        gas: E(r.gas),
        param1: E(r.param1),
        param2: E(r.param2),
        pc: E(r.pc),
        is: E(r.is)
      };
    }
    case "RETURN":
      return {
        type: ut.Return,
        id: Dt(r.id || r.contractId),
        val: E(r.val),
        pc: E(r.pc),
        is: E(r.is)
      };
    case "RETURN_DATA":
      return {
        type: ut.ReturnData,
        id: Dt(r.id || r.contractId),
        ptr: E(r.ptr),
        len: E(r.len),
        digest: Dt(r.digest),
        pc: E(r.pc),
        data: Dt(r.data),
        is: E(r.is)
      };
    case "PANIC":
      return {
        type: ut.Panic,
        id: Dt(r.id),
        reason: E(r.reason),
        pc: E(r.pc),
        is: E(r.is),
        contractId: Dt(r.contractId)
      };
    case "REVERT":
      return {
        type: ut.Revert,
        id: Dt(r.id || r.contractId),
        val: E(r.ra),
        pc: E(r.pc),
        is: E(r.is)
      };
    case "LOG": {
      const e = E(r.ra), n = E(r.rb), s = E(r.rc), i = E(r.rd);
      return {
        type: ut.Log,
        id: Dt(r.id || r.contractId),
        ra: e,
        rb: n,
        rc: s,
        rd: i,
        pc: E(r.pc),
        is: E(r.is)
      };
    }
    case "LOG_DATA": {
      const e = E(r.ra), n = E(r.rb);
      return {
        type: ut.LogData,
        id: Dt(r.id || r.contractId),
        ra: e,
        rb: n,
        ptr: E(r.ptr),
        len: E(r.len),
        digest: Dt(r.digest),
        pc: E(r.pc),
        data: Dt(r.data),
        is: E(r.is)
      };
    }
    case "TRANSFER": {
      const e = Dt(r.id || r.contractId);
      return {
        type: ut.Transfer,
        id: e,
        to: Dt(r.toAddress || (r == null ? void 0 : r.to)),
        amount: E(r.amount),
        assetId: Dt(r.assetId),
        pc: E(r.pc),
        is: E(r.is)
      };
    }
    case "TRANSFER_OUT": {
      const e = Dt(r.id || r.contractId);
      return {
        type: ut.TransferOut,
        id: e,
        to: Dt(r.toAddress || r.to),
        amount: E(r.amount),
        assetId: Dt(r.assetId),
        pc: E(r.pc),
        is: E(r.is)
      };
    }
    case "SCRIPT_RESULT":
      return {
        type: ut.ScriptResult,
        result: E(r.result),
        gasUsed: E(r.gasUsed)
      };
    case "MESSAGE_OUT": {
      const e = Dt(r.sender), n = Dt(r.recipient), s = Dt(r.nonce), i = E(r.amount), a = r.data ? J(r.data) : Uint8Array.from([]), o = Dt(r.digest), d = E(r.len).toNumber(), h = gn.getMessageId({
        sender: e,
        recipient: n,
        nonce: s,
        amount: i,
        data: W(a)
      });
      return {
        type: ut.MessageOut,
        sender: e,
        recipient: n,
        amount: i,
        nonce: s,
        len: d,
        data: a,
        digest: o,
        messageId: h
      };
    }
    case "MINT": {
      const e = Dt(r.id || r.contractId), n = Dt(r.subId), s = nd(e, n);
      return {
        type: ut.Mint,
        subId: n,
        contractId: e,
        assetId: s,
        val: E(r.val),
        pc: E(r.pc),
        is: E(r.is)
      };
    }
    case "BURN": {
      const e = Dt(r.id || r.contractId), n = Dt(r.subId), s = nd(e, n);
      return {
        type: ut.Burn,
        subId: n,
        contractId: e,
        assetId: s,
        val: E(r.val),
        pc: E(r.pc),
        is: E(r.is)
      };
    }
    default:
      throw new B(L.INVALID_RECEIPT_TYPE, `Invalid receipt type: ${t}.`);
  }
}, "deserializeReceipt"), hx = /* @__PURE__ */ T((r) => {
  let t;
  switch (r.type) {
    case "InputCoin":
      t = {
        type: vt.Coin,
        id: r.utxoId,
        amount: E(r.amount),
        assetId: r.assetId,
        owner: r.owner,
        txPointer: `0x${r.txPointer}`,
        witnessIndex: Number(r.coinWitnessIndex),
        predicate: r.predicate,
        predicateData: r.predicateData,
        predicateGasUsed: E(r.predicateGasUsed)
      };
      break;
    case "InputMessage":
      t = {
        type: vt.Message,
        nonce: r.nonce,
        amount: E(r.amount),
        recipient: r.recipient,
        sender: r.sender,
        data: r.data,
        witnessIndex: Number(r.messageWitnessIndex),
        predicate: r.predicate,
        predicateData: r.predicateData,
        predicateGasUsed: E(r.predicateGasUsed)
      };
      break;
    case "InputContract":
      t = {
        type: vt.Contract,
        contractId: r.contractId,
        txPointer: `0x${r.txPointer}`,
        txID: W(J(r.utxoId).slice(0, 32))
      };
      break;
    default:
      Eo();
  }
  return t;
}, "deserializeInput"), Ax = /* @__PURE__ */ T((r) => {
  let t;
  switch (r.type) {
    case "CoinOutput":
      t = {
        type: lt.Coin,
        amount: E(r.amount),
        assetId: r.assetId,
        to: r.to
      };
      break;
    case "ContractOutput":
      t = {
        type: lt.Contract,
        inputIndex: Number(r.inputIndex)
      };
      break;
    case "ChangeOutput":
      t = {
        type: lt.Change,
        assetId: r.assetId,
        to: r.to
      };
      break;
    case "ContractCreated":
      t = {
        type: lt.ContractCreated,
        stateRoot: r.stateRoot,
        contractId: r.contract
      };
      break;
    case "VariableOutput":
      t = {
        type: lt.Variable,
        amount: E(r.amount),
        assetId: r.assetId,
        to: r.to
      };
      break;
    default:
      Eo();
  }
  return t;
}, "deserializeOutput"), Nf = /* @__PURE__ */ T((r) => {
  let t;
  switch (r.type) {
    case "CoinOutput":
      t = {
        type: lt.Coin,
        amount: E(r.amount),
        assetId: r.assetId,
        to: r.to
      };
      break;
    case "ContractOutput":
      t = {
        type: lt.Contract,
        inputIndex: Number(r.inputIndex),
        balanceRoot: r.balanceRoot,
        stateRoot: r.stateRoot
      };
      break;
    case "ChangeOutput":
      t = {
        type: lt.Change,
        assetId: r.assetId,
        to: r.to,
        amount: E(r.amount)
      };
      break;
    case "ContractCreated":
      t = {
        type: lt.ContractCreated,
        stateRoot: r.stateRoot,
        contractId: r.contract
      };
      break;
    case "VariableOutput":
      t = {
        type: lt.Variable,
        amount: E(r.amount),
        assetId: r.assetId,
        to: r.to
      };
      break;
    default:
      Eo();
  }
  return t;
}, "deserializeProcessedTxOutput"), lx = /* @__PURE__ */ T((r) => r.type === ut.Revert && r.val.toString("hex") === Wp, "doesReceiptHaveMissingOutputVariables"), _x = /* @__PURE__ */ T((r) => r.type === ut.Panic && r.contractId !== "0x0000000000000000000000000000000000000000000000000000000000000000", "doesReceiptHaveMissingContractId"), kl = /* @__PURE__ */ T((r) => r.reduce(
  (t, e) => (lx(e) && t.missingOutputVariables.push(e), _x(e) && t.missingOutputContractIds.push(e), t),
  {
    missingOutputVariables: [],
    missingOutputContractIds: []
  }
), "getReceiptsWithMissingData"), bR = /* @__PURE__ */ T((r) => Re(r), "assembleReceiptByType"), px = "https://app.fuel.network", fx = /* @__PURE__ */ T((r, t) => `${{
  address: "address",
  txId: "transaction",
  blockNumber: "block"
}[r] || r}/${t}`, "getPathFromInput"), IR = /* @__PURE__ */ T((r = {}) => {
  const { blockExplorerUrl: t, path: e, providerUrl: n, address: s, txId: i, blockNumber: a } = r, o = t || px, d = [
    {
      key: "address",
      value: s
    },
    {
      key: "txId",
      value: i
    },
    {
      key: "blockNumber",
      value: a
    }
  ], h = d.filter((P) => !!P.value).map(({ key: P, value: M }) => ({
    key: P,
    value: M
  })), f = h.length > 0;
  if (h.length > 1)
    throw new B(
      L.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `Only one of the following can be passed in to buildBlockExplorerUrl: ${d.map((P) => P.key).join(", ")}.`
    );
  if (e && h.length > 0) {
    const P = d.map(({ key: M }) => M).join(", ");
    throw new B(
      L.ERROR_BUILDING_BLOCK_EXPLORER_URL,
      `You cannot pass in a path to 'buildBlockExplorerUrl' along with any of the following: ${P}.`
    );
  }
  const g = f ? fx(
    h[0].key,
    h[0].value
  ) : "", y = /^\/|\/$/gm, R = e ? e.replace(y, "") : g, Q = o.replace(y, ""), x = n == null ? void 0 : n.replace(y, ""), N = x ? encodeURIComponent(x) : void 0, U = Q.match(/^https?:\/\//) ? "" : "https://", H = x != null && x.match(/^https?:\/\//) ? "" : "https://";
  return `${U}${Q}/${R}${N ? `?providerUrl=${H}${N}` : ""}`;
}, "buildBlockExplorerUrl"), Di = /* @__PURE__ */ T((r) => r.filter(
  (n) => n.type === ut.ScriptResult
).reduce((n, s) => n.add(s.gasUsed), E(0)), "getGasUsedFromReceipts");
function Qe(r, t) {
  const e = E(t.base);
  let n = E(0);
  return "unitsPerGas" in t ? n = E(r).div(E(t.unitsPerGas)) : n = E(r).mul(E(t.gasPerUnit)), e.add(n);
}
T(Qe, "resolveGasDependentCosts");
function Df(r, t, e) {
  const n = [], s = r.filter((o) => {
    if ("owner" in o || "sender" in o) {
      if ("predicate" in o && o.predicate && o.predicate !== "0x")
        return !0;
      if (!n.includes(o.witnessIndex))
        return n.push(o.witnessIndex), !0;
    }
    return !1;
  }), i = Qe(t, e.vmInitialization);
  return s.reduce((o, d) => "predicate" in d && d.predicate && d.predicate !== "0x" ? o.add(
    i.add(Qe(J(d.predicate).length, e.contractRoot)).add(E(d.predicateGasUsed))
  ) : o.add(e.ecr1), E(0));
}
T(Df, "gasUsedByInputs");
function su(r) {
  const { gasCosts: t, gasPerByte: e, inputs: n, metadataGas: s, txBytesSize: i } = r, a = Qe(i, t.vmInitialization), o = E(i).mul(e), d = Df(n, i, t);
  return a.add(o).add(d).add(s).maxU64();
}
T(su, "getMinGas");
function Po(r) {
  const {
    gasPerByte: t,
    witnessesLength: e,
    witnessLimit: n,
    minGas: s,
    gasLimit: i = E(0),
    maxGasPerTx: a
  } = r;
  let o = E(0);
  n != null && n.gt(0) && n.gte(e) && (o = E(n).sub(e).mul(t));
  const d = o.add(s).add(i);
  return d.gte(a) ? a : d;
}
T(Po, "getMaxGas");
function iu({
  gasCosts: r,
  stateRootSize: t,
  txBytesSize: e,
  contractBytesSize: n
}) {
  const s = Qe(n, r.contractRoot), i = Qe(t, r.stateRoot), a = Qe(e, r.s256), o = E(100), d = Qe(o, r.s256);
  return s.add(i).add(a).add(d).maxU64();
}
T(iu, "calculateMetadataGasForTxCreate");
function au({
  gasCosts: r,
  txBytesSize: t
}) {
  return Qe(t, r.s256);
}
T(au, "calculateMetadataGasForTxScript");
function Ff({
  gasCosts: r,
  txBytesSize: t,
  witnessBytesSize: e
}) {
  const n = Qe(t, r.s256), s = Qe(e, r.s256);
  return n.add(s);
}
T(Ff, "calculateMetadataGasForTxBlob");
function fd({
  gasCosts: r,
  txBytesSize: t,
  consensusSize: e
}) {
  const n = Qe(t, r.s256);
  if (e) {
    const s = Qe(e, r.s256);
    n.add(s);
  }
  return n;
}
T(fd, "calculateMetadataGasForTxUpgrade");
function Qf({
  gasCosts: r,
  txBytesSize: t,
  subsectionSize: e,
  subsectionsSize: n
}) {
  const s = Qe(t, r.s256), i = Qe(e, r.s256);
  s.add(i);
  const a = Qe(n, r.stateRoot);
  return s.add(a), s;
}
T(Qf, "calculateMetadataGasForTxUpload");
function Of({
  gasCosts: r,
  baseMinGas: t,
  subsectionSize: e
}) {
  const n = E(r.newStoragePerByte).mul(e);
  return E(t).add(n);
}
T(Of, "calculateMinGasForTxUpload");
var Bi = /* @__PURE__ */ T((r) => {
  const { gas: t, gasPrice: e, priceFactor: n, tip: s } = r;
  return t.mul(e).div(n).add(E(s));
}, "calculateGasFee");
function lo(r) {
  return Object.keys(r).forEach((t) => {
    var e;
    switch ((e = r[t]) == null ? void 0 : e.constructor.name) {
      case "Uint8Array":
        r[t] = W(r[t]);
        break;
      case "Array":
        r[t] = lo(r[t]);
        break;
      case "BN":
        r[t] = r[t].toHex();
        break;
      case "Address":
        r[t] = r[t].toB256();
        break;
      case "Object":
        r[t] = lo(r[t]);
        break;
    }
  }), r;
}
T(lo, "normalize");
function Mf(r) {
  return lo(Be(r));
}
T(Mf, "normalizeJSON");
var gx = /* @__PURE__ */ T((r, t) => {
  let e = `The transaction reverted with reason: "${r}".`;
  return MB.includes(r) && (e = `${e}

You can read more about this error at:

${PB}#variant.${r}`), new B(L.SCRIPT_REVERTED, e, {
    ...t,
    reason: r
  });
}, "assemblePanicError"), Ui = /* @__PURE__ */ T((r) => JSON.stringify(r, null, 2), "stringify"), wx = /* @__PURE__ */ T((r, t, e) => {
  let n = "The transaction reverted with an unknown reason.";
  const s = r.find(({ type: a }) => a === ut.Revert);
  let i = "";
  if (s) {
    const a = E(s.val).toHex(), o = t[t.length - 1], d = t[t.length - 2];
    switch (a) {
      case DB: {
        i = "require", n = `The transaction reverted because a "require" statement has thrown ${t.length ? Ui(o) : "an error."}.`;
        break;
      }
      case FB: {
        const h = t.length >= 2 ? ` comparing ${Ui(o)} and ${Ui(d)}.` : ".";
        i = "assert_eq", n = `The transaction reverted because of an "assert_eq" statement${h}`;
        break;
      }
      case OB: {
        const h = t.length >= 2 ? ` comparing ${Ui(d)} and ${Ui(o)}.` : ".";
        i = "assert_ne", n = `The transaction reverted because of an "assert_ne" statement${h}`;
        break;
      }
      case QB:
        i = "assert", n = 'The transaction reverted because an "assert" statement failed to evaluate to true.';
        break;
      case Wp:
        i = "MissingOutputVariable", n = `The transaction reverted because it's missing an "OutputVariable".`;
        break;
      default:
        throw new B(
          L.UNKNOWN,
          `The transaction reverted with an unknown reason: ${s.val}`,
          {
            ...e,
            reason: "unknown"
          }
        );
    }
  }
  return new B(L.SCRIPT_REVERTED, n, {
    ...e,
    reason: i
  });
}, "assembleRevertError"), ou = /* @__PURE__ */ T((r) => {
  const { receipts: t, statusReason: e, logs: n, groupedLogs: s } = r, i = t.some(({ type: d }) => d === ut.Panic), a = t.some(({ type: d }) => d === ut.Revert), o = {
    logs: n,
    groupedLogs: s,
    receipts: t,
    panic: i,
    revert: a,
    reason: ""
  };
  return i ? gx(e, o) : wx(t, n, o);
}, "extractTxError"), Pa = /* @__PURE__ */ T((...r) => {
  const t = {};
  function e({ amount: n, assetId: s }) {
    t[s] ? t[s] = t[s].add(n) : t[s] = n;
  }
  return T(e, "addToMap"), r.forEach((n) => n.forEach(e)), Object.entries(t).map(([n, s]) => ({ assetId: n, amount: s }));
}, "mergeQuantities"), js, ER = (js = class extends Error {
  constructor() {
    super(...arguments);
    D(this, "name", "ChangeOutputCollisionError");
    D(this, "message", 'A ChangeOutput with the same "assetId" already exists for a different "to" address');
  }
}, T(js, "ChangeOutputCollisionError"), js), Zs, mx = (Zs = class extends Error {
  constructor(e) {
    super();
    D(this, "name", "NoWitnessAtIndexError");
    this.index = e, this.message = `Witness at index "${e}" was not found`;
  }
}, T(Zs, "NoWitnessAtIndexError"), Zs), Js, CR = (Js = class extends Error {
  constructor(e) {
    super();
    D(this, "name", "NoWitnessByOwnerError");
    this.owner = e, this.message = `A witness for the given owner "${e}" was not found`;
  }
}, T(Js, "NoWitnessByOwnerError"), Js), Rr = /* @__PURE__ */ T((r) => r.type === vt.Coin, "isRequestInputCoin"), Lo = /* @__PURE__ */ T((r) => r.type === vt.Message, "isRequestInputMessage"), Pf = /* @__PURE__ */ T((r) => r.type === vt.Message && E(r.data).isZero(), "isRequestInputMessageWithoutData"), ko = /* @__PURE__ */ T((r) => Rr(r) || Lo(r), "isRequestInputCoinOrMessage"), zn = /* @__PURE__ */ T((r) => Rr(r) || Pf(r), "isRequestInputResource"), Lf = /* @__PURE__ */ T((r) => Rr(r) ? r.owner : r.recipient, "getRequestInputResourceOwner"), gd = /* @__PURE__ */ T((r, t) => Lf(r) === t.toB256(), "isRequestInputResourceFromOwner"), Ul = /* @__PURE__ */ T((r) => ko(r) && !!r.predicate && W(r.predicate) !== "0x", "isPredicate"), yx = /* @__PURE__ */ T((r, t, e) => r.filter(zn).reduce((n, s) => Rr(s) && s.assetId === t || Lo(s) && t === e ? n.add(s.amount) : n, E(0)), "getAssetAmountInRequestInputs"), BR = /* @__PURE__ */ T((r) => r.filter(zn).reduce(
  (t, e) => (Rr(e) ? t.utxos.push(e.id) : t.messages.push(e.nonce), t),
  {
    utxos: [],
    messages: []
  }
), "cacheRequestInputsResources"), bx = /* @__PURE__ */ T((r, t) => r.reduce(
  (e, n) => (Rr(n) && n.owner === t.toB256() ? e.utxos.push(n.id) : Lo(n) && n.recipient === t.toB256() && e.messages.push(n.nonce), e),
  {
    utxos: [],
    messages: []
  }
), "cacheRequestInputsResourcesFromOwner"), Ix = /* @__PURE__ */ T((r, t) => {
  const { inputs: e, outputs: n } = t, s = new Set(e.filter(Rr).map((o) => o.assetId));
  e.some((o) => Lo(o) && E(o.amount).gt(0)) && s.add(r);
  const i = new Set(
    n.filter((o) => o.type === lt.Change).map((o) => o.assetId)
  );
  return new Set([...s].filter((o) => !i.has(o))).size;
}, "getBurnableAssetCount"), kf = /* @__PURE__ */ T((r, t, e = !1) => {
  if (e === !0 || Ix(r, t) <= 0)
    return;
  const n = [
    "Asset burn detected.",
    "Add the relevant change outputs to the transaction to avoid burning assets.",
    "Or enable asset burn, upon sending the transaction."
  ].join(`
`);
  throw new B(L.ASSET_BURN_DETECTED, n);
}, "validateTransactionForAssetBurn"), Ex = /* @__PURE__ */ T((r) => {
  const t = J(r);
  return {
    data: W(t),
    dataLength: t.length
  };
}, "witnessify"), Tn, fa = (Tn = class {
  /**
   * Constructor for initializing a base transaction request.
   *
   * @param baseTransactionRequest - Optional object containing properties to initialize the transaction request.
   */
  constructor({
    tip: t,
    maturity: e,
    expiration: n,
    maxFee: s,
    witnessLimit: i,
    inputs: a,
    outputs: o,
    witnesses: d,
    flag: h
  } = {}) {
    /** Gas price for transaction */
    D(this, "tip");
    /** Block until which tx cannot be included */
    D(this, "maturity");
    /** The block number after which the transaction is no longer valid. */
    D(this, "expiration");
    /** The maximum fee payable by this transaction using BASE_ASSET. */
    D(this, "maxFee");
    /** The maximum amount of witness data allowed for the transaction */
    D(this, "witnessLimit");
    /** List of inputs */
    D(this, "inputs", []);
    /** List of outputs */
    D(this, "outputs", []);
    /** List of witnesses */
    D(this, "witnesses", []);
    /**
     * The current status of the transaction
     */
    D(this, "flag", { state: void 0, transactionId: void 0, summary: void 0 });
    this.tip = t ? E(t) : void 0, this.maturity = e && e > 0 ? e : void 0, this.expiration = n && n > 0 ? n : void 0, this.witnessLimit = Fe(i) ? E(i) : void 0, this.maxFee = E(s), this.inputs = a ?? [], this.outputs = o ?? [], this.witnesses = d ?? [], this.flag = h ?? { state: void 0, transactionId: void 0, summary: void 0 };
  }
  static getPolicyMeta(t) {
    let e = 0;
    const n = [], { tip: s, witnessLimit: i, maturity: a, expiration: o } = t;
    return E(s).gt(0) && (e += ke.Tip, n.push({ data: E(s), type: ke.Tip })), Fe(i) && E(i).gte(0) && (e += ke.WitnessLimit, n.push({ data: E(i), type: ke.WitnessLimit })), a && a > 0 && (e += ke.Maturity, n.push({ data: a, type: ke.Maturity })), e += ke.MaxFee, n.push({ data: t.maxFee, type: ke.MaxFee }), o && o > 0 && (e += ke.Expiration, n.push({ data: o, type: ke.Expiration })), {
      policyTypes: e,
      policies: n
    };
  }
  /**
   * Method to obtain the base transaction details.
   *
   * @returns The base transaction details.
   */
  getBaseTransaction() {
    var a, o, d;
    const t = ((a = this.inputs) == null ? void 0 : a.map(ix)) ?? [], e = ((o = this.outputs) == null ? void 0 : o.map(ax)) ?? [], n = ((d = this.witnesses) == null ? void 0 : d.map(Ex)) ?? [], { policyTypes: s, policies: i } = Tn.getPolicyMeta(this);
    return {
      policyTypes: s,
      inputs: t,
      outputs: e,
      policies: i,
      witnesses: n,
      inputsCount: t.length,
      outputsCount: e.length,
      witnessesCount: n.length
    };
  }
  /**
   * Converts the transaction request to a byte array.
   *
   * @returns The transaction bytes.
   */
  toTransactionBytes() {
    return new lr().encode(this.toTransaction());
  }
  /**
   * @hidden
   *
   * Pushes an input to the list without any side effects and returns the index
   */
  pushInput(t) {
    return this.inputs.push(t), this.inputs.length - 1;
  }
  /**
   * @hidden
   *
   * Pushes an output to the list without any side effects and returns the index
   */
  pushOutput(t) {
    return this.outputs.push(t), this.outputs.length - 1;
  }
  /**
   * @hidden
   *
   * Pushes a witness to the list and returns the index
   *
   * @param signature - The signature to add to the witness.
   * @returns The index of the created witness.
   */
  addWitness(t) {
    return this.witnesses.push(t), this.witnesses.length - 1;
  }
  /**
   * @hidden
   *
   * Creates an empty witness without any side effects and returns the index
   *
   * @returns The index of the created witness.
   */
  addEmptyWitness() {
    return this.addWitness(ct([St, St]));
  }
  /**
   * Updates the witness for a given owner and signature.
   *
   * @param address - The address to get the coin input witness index for.
   * @param signature - The signature to update the witness with.
   */
  updateWitnessByOwner(t, e) {
    const n = new wt(t), s = this.getCoinInputWitnessIndexByOwner(n);
    typeof s == "number" && this.updateWitness(s, e);
  }
  /**
   * Updates an existing witness without any side effects.
   *
   * @param index - The index of the witness to update.
   * @param witness - The new witness.
   * @throws If the witness does not exist.
   */
  updateWitness(t, e) {
    if (!this.witnesses[t])
      throw new mx(t);
    this.witnesses[t] = e;
  }
  /**
   * Helper function to add an external signature to the transaction.
   *
   * @param account - The account/s to sign to the transaction.
   * @returns The transaction with the signature witness added.
   */
  async addAccountWitnesses(t) {
    const e = Array.isArray(t) ? t : [t];
    return await Promise.all(
      e.map(async (n) => {
        this.addWitness(await n.signTransaction(this));
      })
    ), this;
  }
  /**
   * Gets the coin inputs for a transaction.
   *
   * @returns The coin inputs.
   */
  getCoinInputs() {
    return this.inputs.filter(
      (t) => t.type === vt.Coin
    );
  }
  /**
   * Gets the coin outputs for a transaction.
   *
   * @returns The coin outputs.
   */
  getCoinOutputs() {
    return this.outputs.filter(
      (t) => t.type === lt.Coin
    );
  }
  /**
   * Gets the change outputs for a transaction.
   *
   * @returns The change outputs.
   */
  getChangeOutputs() {
    return this.outputs.filter(
      (t) => t.type === lt.Change
    );
  }
  /**
   * @hidden
   *
   * Returns the witnessIndex of the found CoinInput.
   */
  getCoinInputWitnessIndexByOwner(t) {
    const e = Hi(t), n = this.inputs.find((s) => {
      switch (s.type) {
        case vt.Coin:
          return W(s.owner) === e.toB256();
        case vt.Message:
          return W(s.recipient) === e.toB256();
        default:
          return !1;
      }
    });
    return n == null ? void 0 : n.witnessIndex;
  }
  /**
   * Adds a single coin input to the transaction and a change output for the related
   * assetId, if one it was not added yet.
   *
   * @param coin - Coin resource.
   */
  addCoinInput(t) {
    const { assetId: e, owner: n, amount: s, id: i, predicate: a, predicateData: o } = t;
    let d;
    t.predicate ? d = 0 : (d = this.getCoinInputWitnessIndexByOwner(n), typeof d != "number" && (d = this.addEmptyWitness()));
    const h = {
      id: i,
      type: vt.Coin,
      owner: n.toB256(),
      amount: s,
      assetId: e,
      txPointer: "0x00000000000000000000000000000000",
      witnessIndex: d,
      predicate: a,
      predicateData: o
    };
    this.pushInput(h), this.addChangeOutput(n, e);
  }
  /**
   * Adds a single message input to the transaction and a change output for the
   * asset against the message
   *
   * @param message - Message resource.
   */
  addMessageInput(t) {
    const { recipient: e, sender: n, amount: s, predicate: i, nonce: a, predicateData: o } = t;
    let d;
    t.predicate ? d = 0 : (d = this.getCoinInputWitnessIndexByOwner(e), typeof d != "number" && (d = this.addEmptyWitness()));
    const h = {
      nonce: a,
      type: vt.Message,
      sender: n.toB256(),
      recipient: e.toB256(),
      data: Ll(t) ? "0x" : t.data,
      amount: s,
      witnessIndex: d,
      predicate: i,
      predicateData: o
    };
    this.pushInput(h), Ll(t) && this.addChangeOutput(e, t.assetId);
  }
  /**
   * Adds a single resource to the transaction by adding a coin/message input and a
   * change output for the related assetId, if one it was not added yet.
   *
   * @param resource - The resource to add.
   * @returns This transaction.
   */
  addResource(t) {
    return ox(t) ? this.addCoinInput(t) : this.addMessageInput(t), this;
  }
  /**
   * Adds multiple resources to the transaction by adding coin/message inputs and change
   * outputs from the related assetIds.
   *
   * @param resources - The resources to add.
   * @returns This transaction.
   */
  addResources(t) {
    return t.forEach((e) => this.addResource(e)), this;
  }
  /**
   * Adds a coin output to the transaction.
   *
   * @param to - Address of the owner.
   * @param amount - Amount of coin.
   * @param assetId - Asset ID of coin.
   */
  addCoinOutput(t, e, n) {
    return this.pushOutput({
      type: lt.Coin,
      to: Hi(t).toB256(),
      amount: e,
      assetId: n
    }), this;
  }
  /**
   * Adds multiple coin outputs to the transaction.
   *
   * @param to - Address of the destination.
   * @param quantities - Quantities of coins.
   */
  addCoinOutputs(t, e) {
    return e.map(tu).forEach((n) => {
      this.pushOutput({
        type: lt.Coin,
        to: Hi(t).toB256(),
        amount: n.amount,
        assetId: n.assetId
      });
    }), this;
  }
  /**
   * Adds a change output to the transaction.
   *
   * @param to - Address of the owner.
   * @param assetId - Asset ID of coin.
   */
  addChangeOutput(t, e) {
    this.getChangeOutputs().find(
      (s) => W(s.assetId) === e
    ) || this.pushOutput({
      type: lt.Change,
      to: Hi(t).toB256(),
      assetId: e
    });
  }
  /**
   * @hidden
   */
  byteSize() {
    return this.toTransactionBytes().length;
  }
  /**
   * @hidden
   */
  metadataGas(t) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Not implemented");
  }
  /**
   * @hidden
   */
  calculateMinGas(t) {
    const { consensusParameters: e } = t, {
      gasCosts: n,
      feeParameters: { gasPerByte: s }
    } = e;
    return su({
      gasPerByte: s,
      gasCosts: n,
      inputs: this.inputs,
      txBytesSize: this.byteSize(),
      metadataGas: this.metadataGas(n)
    });
  }
  calculateMaxGas(t, e) {
    const { consensusParameters: n } = t, {
      feeParameters: { gasPerByte: s },
      txParameters: { maxGasPerTx: i }
    } = n, a = this.toTransaction().witnesses.reduce(
      (o, d) => o + d.dataLength,
      0
    );
    return Po({
      gasPerByte: s,
      minGas: e,
      witnessesLength: a,
      witnessLimit: this.witnessLimit,
      maxGasPerTx: i
    });
  }
  /**
   * Funds the transaction with fake UTXOs for each assetId and amount in the
   * quantities array.
   *
   * @param quantities - CoinQuantity Array.
   * @param baseAssetId - The base asset to fund the transaction.
   * @deprecated - This method is deprecated and will be removed in future versions.
   * Please use `Account.generateFakeResources` along with `this.addResources` instead.
   */
  fundWithFakeUtxos(t, e, n) {
    const s = /* @__PURE__ */ T((a) => this.inputs.find((o) => "assetId" in o ? o.assetId === a : !1), "findAssetInput"), i = /* @__PURE__ */ T((a, o) => {
      const d = s(a);
      let h = o;
      a === e && (h = E("1000000000000000000")), d && "assetId" in d ? (d.id = W(er(io)), d.amount = h) : this.addResources([
        {
          id: W(er(io)),
          amount: h,
          assetId: a,
          owner: n || wt.fromRandom(),
          blockCreated: E(1),
          txCreatedIdx: E(1)
        }
      ]);
    }, "updateAssetInput");
    return i(e, E(1e11)), t.forEach((a) => i(a.assetId, a.amount)), this;
  }
  /**
   * Retrieves an array of CoinQuantity for each coin output present in the transaction.
   * a transaction.
   *
   * @returns  CoinQuantity array.
   */
  getCoinOutputsQuantities() {
    return this.getCoinOutputs().map(({ amount: e, assetId: n }) => ({
      amount: E(e),
      assetId: n.toString()
    }));
  }
  /**
   * Return the minimum amount in native coins required to create
   * a transaction.
   *
   * @returns The transaction as a JSON object.
   */
  toJSON() {
    return Mf(this);
  }
  removeWitness(t) {
    this.witnesses.splice(t, 1), this.adjustWitnessIndexes(t);
  }
  adjustWitnessIndexes(t) {
    this.inputs.filter(zn).forEach((e) => {
      e.witnessIndex > t && (e.witnessIndex -= 1);
    });
  }
  updatePredicateGasUsed(t) {
    const e = t.filter(ko);
    this.inputs.filter(zn).forEach((n) => {
      const s = Lf(n), i = e.find(
        (a) => gd(a, new wt(String(s)))
      );
      i && "predicateGasUsed" in i && E(i.predicateGasUsed).gt(0) && (n.predicateGasUsed = i.predicateGasUsed);
    });
  }
  byteLength() {
    return this.toTransactionBytes().byteLength;
  }
  /**
   * @hidden
   *
   * Used internally to update the state of a transaction request.
   *
   * @param state - The state to update.
   */
  updateState(t, e, n) {
    if (!e) {
      this.flag = { state: void 0, transactionId: void 0, summary: void 0 };
      return;
    }
    const s = this.getTransactionId(t);
    this.flag = { state: e, transactionId: s, summary: n };
  }
}, T(Tn, "BaseTransactionRequest"), Tn);
function Fi(r, t) {
  const e = r.toTransaction();
  e.type === Ct.Script && (e.receiptsRoot = St), e.inputs = e.inputs.map((i) => {
    const a = Be(i);
    switch (a.type) {
      // Zero out on signing: txPointer, predicateGasUsed
      case vt.Coin:
        return a.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, a.predicateGasUsed = E(0), a;
      // Zero out on signing: predicateGasUsed
      case vt.Message:
        return a.predicateGasUsed = E(0), a;
      // Zero out on signing: txID, outputIndex, balanceRoot, stateRoot, and txPointer
      case vt.Contract:
        return a.txPointer = {
          blockHeight: 0,
          txIndex: 0
        }, a.txID = St, a.outputIndex = 0, a.balanceRoot = St, a.stateRoot = St, a;
      default:
        return a;
    }
  }), e.outputs = e.outputs.map((i) => {
    const a = Be(i);
    switch (a.type) {
      // Zero out on signing: balanceRoot, stateRoot
      case lt.Contract:
        return a.balanceRoot = St, a.stateRoot = St, a;
      // Zero out on signing: amount
      case lt.Change:
        return a.amount = E(0), a;
      // Zero out on signing: amount, to and assetId
      case lt.Variable:
        return a.to = St, a.amount = E(0), a.assetId = St, a;
      default:
        return a;
    }
  }), e.witnessesCount = 0, e.witnesses = [];
  const n = dp(t), s = ct([n, new lr().encode(e)]);
  return zt(s);
}
T(Fi, "hashTransaction");
var qs, _o = (qs = class extends fa {
  /**
   * Creates an instance `BlobTransactionRequest`.
   *
   * @param blobTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: e, blobId: n, ...s }) {
    super(s);
    /** Type of the transaction */
    D(this, "type", Ct.Blob);
    /** Blob ID */
    D(this, "blobId");
    /** Witness index of the bytecode to create */
    D(this, "witnessIndex");
    this.blobId = n, this.witnessIndex = e ?? 0;
  }
  static from(e) {
    return new this(Be(e));
  }
  /**
   * Converts the transaction request to a `TransactionBlob`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const e = this.getBaseTransaction(), { witnessIndex: n, blobId: s } = this;
    return {
      type: Ct.Blob,
      ...e,
      blobId: s,
      witnessIndex: n
    };
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Fi(this, e);
  }
  /**
   * Calculates the metadata gas cost for a blob transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   * @returns metadata gas cost for the blob transaction.
   */
  metadataGas(e) {
    return Ff({
      gasCosts: e,
      txBytesSize: this.byteSize(),
      witnessBytesSize: this.witnesses[this.witnessIndex].length
    });
  }
}, T(qs, "BlobTransactionRequest"), qs), Cx = /* @__PURE__ */ T((r) => {
  const t = new Uint8Array(32);
  return t.set(J(r)), t;
}, "getStorageValue"), Bx = /* @__PURE__ */ T((r) => {
  let t, e;
  return Array.isArray(r) ? (t = r[0], e = r[1]) : (t = r.key, e = r.value), {
    key: W(t),
    value: W(Cx(e))
  };
}, "storageSlotify"), $s, wd = ($s = class extends fa {
  /**
   * Creates an instance `CreateTransactionRequest`.
   *
   * @param createTransactionRequestLike - The initial values for the instance
   */
  constructor({ bytecodeWitnessIndex: e, salt: n, storageSlots: s, ...i }) {
    super(i);
    /** Type of the transaction */
    D(this, "type", Ct.Create);
    /** Witness index of contract bytecode to create */
    D(this, "bytecodeWitnessIndex");
    /** Salt */
    D(this, "salt");
    /** List of storage slots to initialize */
    D(this, "storageSlots");
    this.bytecodeWitnessIndex = e ?? 0, this.salt = W(n ?? St), this.storageSlots = [...s ?? []];
  }
  static from(e) {
    return new this(Be(e));
  }
  /**
   * Converts the transaction request to a `TransactionCreate`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    var i;
    const e = this.getBaseTransaction(), n = this.bytecodeWitnessIndex, s = ((i = this.storageSlots) == null ? void 0 : i.map(Bx)) ?? [];
    return {
      type: Ct.Create,
      ...e,
      bytecodeWitnessIndex: n,
      storageSlotsCount: E(s.length),
      salt: this.salt ? W(this.salt) : St,
      storageSlots: s
    };
  }
  /**
   * Get contract created outputs for the transaction.
   *
   * @returns An array of contract created transaction request outputs.
   */
  getContractCreatedOutputs() {
    return this.outputs.filter(
      (e) => e.type === lt.ContractCreated
    );
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Fi(this, e);
  }
  /**
   * Adds a contract created output to the transaction request.
   *
   * @param contractId - The contract ID.
   * @param stateRoot - The state root.
   */
  addContractCreatedOutput(e, n) {
    this.pushOutput({
      type: lt.ContractCreated,
      contractId: e,
      stateRoot: n
    });
  }
  metadataGas(e) {
    return iu({
      contractBytesSize: E(J(this.witnesses[this.bytecodeWitnessIndex] || "0x").length),
      gasCosts: e,
      stateRootSize: this.storageSlots.length,
      txBytesSize: this.byteSize()
    });
  }
}, T($s, "CreateTransactionRequest"), $s), Gl = {
  /*
      Opcode::RET(REG_ZERO)
      Opcode::NOOP
    */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: J("0x24000000"),
  encodeScriptData: /* @__PURE__ */ T(() => new Uint8Array(0), "encodeScriptData")
}, vx = {
  /*
          The following code loads some basic values into registers and calls SMO to create an output message
          5040C010 	- ADDI r16 $is i16   [r16 now points to memory 16 bytes from the start of this program (start of receiver data)]
          5D44C006	- LW r17 $is i6      [r17 set to the 6th word in this program (6*8=48 bytes from the start of this program)]
          4C400011	- SMO r16 r0 r0 r17  [send message out to address starting at memory position r16 with amount in r17]
          24000000	- RET                [return 0]
          00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000 [recipient address]
          00000000 00000000 [amount value]
      */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  bytes: J("0x5040C0105D44C0064C40001124000000"),
  encodeScriptData: /* @__PURE__ */ T(() => new Uint8Array(0), "encodeScriptData")
}, Ks, Yr = (Ks = class extends fa {
  /**
   * Constructor for `ScriptTransactionRequest`.
   *
   * @param scriptTransactionRequestLike - The initial values for the instance.
   */
  constructor({ script: e, scriptData: n, gasLimit: s, ...i } = {}) {
    super(i);
    /** Type of the transaction */
    D(this, "type", Ct.Script);
    /** Gas limit for transaction */
    D(this, "gasLimit");
    /** Script to execute */
    D(this, "script");
    /** Script input data (parameters) */
    D(this, "scriptData");
    D(this, "abis");
    this.gasLimit = E(s), this.script = J(e ?? Gl.bytes), this.scriptData = J(n ?? Gl.encodeScriptData()), this.abis = i.abis;
  }
  static from(e) {
    return new this(Be(e));
  }
  /**
   * Helper function to estimate and fund the transaction request with a specified account.
   *
   * @param account - The account to fund the transaction.
   * @param params - The parameters for the transaction cost.
   * @returns The current instance of the `ScriptTransactionRequest` funded.
   *
   * @deprecated Use `provider.assembleTx` instead.
   * Check the migration guide https://docs.fuel.network/guide/assembling-transactions/migration-guide.html for more information.
   */
  async estimateAndFund(e, { signatureCallback: n, quantities: s = [] } = {}) {
    const i = await e.getTransactionCost(this, { signatureCallback: n, quantities: s });
    return this.maxFee = i.maxFee, this.gasLimit = i.gasUsed, await e.fund(this, i), this;
  }
  /**
   * Converts the transaction request to a `TransactionScript`.
   *
   * @returns The transaction script object.
   */
  toTransaction() {
    const e = J(this.script ?? "0x"), n = J(this.scriptData ?? "0x");
    return {
      type: Ct.Script,
      scriptGasLimit: this.gasLimit,
      ...super.getBaseTransaction(),
      scriptLength: E(e.length),
      scriptDataLength: E(n.length),
      receiptsRoot: St,
      script: W(e),
      scriptData: W(n)
    };
  }
  /**
   * Get contract inputs for the transaction.
   *
   * @returns An array of contract transaction request inputs.
   */
  getContractInputs() {
    return this.inputs.filter(
      (e) => e.type === vt.Contract
    );
  }
  /**
   * Get contract outputs for the transaction.
   *
   * @returns An array of contract transaction request outputs.
   */
  getContractOutputs() {
    return this.outputs.filter(
      (e) => e.type === lt.Contract
    );
  }
  /**
   * Get variable outputs for the transaction.
   *
   * @returns An array of variable transaction request outputs.
   */
  getVariableOutputs() {
    return this.outputs.filter(
      (e) => e.type === lt.Variable
    );
  }
  /**
   * Set the script and its data.
   *
   * @param script - The abstract script request.
   * @param data - The script data.
   */
  setScript(e, n) {
    this.scriptData = e.encodeScriptData(n), this.script = e.bytes;
  }
  /**
   * Adds variable outputs to the transaction request.
   *
   * @param numberOfVariables - The number of variables to add.
   * @returns The new length of the outputs array.
   */
  addVariableOutputs(e = 1) {
    let n = e;
    for (; n; )
      this.pushOutput({
        type: lt.Variable
      }), n -= 1;
    return this.outputs.length - 1;
  }
  /**
   * Adds a variable output to the transaction request.
   *
   * @param to - The recipient address as a BytesLike object. Defaults to ZeroBytes32 if not provided.
   * @param amount - The amount to be transferred as a BigNumberish object. Defaults to 0 if not provided.
   * @param assetId - The asset ID as a BytesLike object. Defaults to ZeroBytes32 if not provided.
   */
  addVariableOutput(e, n, s) {
    this.pushOutput({
      type: lt.Variable,
      to: e,
      amount: n,
      assetId: s
    });
  }
  /**
   * Calculates the maximum gas for the transaction.
   *
   * @param chainInfo - The chain information.
   * @param minGas - The minimum gas.
   * @returns the maximum gas.
   */
  calculateMaxGas(e, n) {
    const { consensusParameters: s } = e, {
      feeParameters: { gasPerByte: i },
      txParameters: { maxGasPerTx: a }
    } = s, o = this.toTransaction().witnesses.reduce(
      (d, h) => d + h.dataLength,
      0
    );
    return Po({
      gasPerByte: i,
      minGas: n,
      witnessesLength: o,
      witnessLimit: this.witnessLimit,
      gasLimit: this.gasLimit,
      maxGasPerTx: a
    });
  }
  /**
   * Adds a contract input and output to the transaction request.
   *
   * @param contract - The contract ID.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  addContractInputAndOutput(e) {
    const n = Hi(e);
    if (this.getContractInputs().find((i) => i.contractId === n.toB256()))
      return this;
    const s = super.pushInput({
      type: vt.Contract,
      contractId: n.toB256(),
      txPointer: "0x00000000000000000000000000000000"
    });
    return this.pushOutput({
      type: lt.Contract,
      inputIndex: s
    }), this;
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Fi(this, e);
  }
  /**
   * Sets the data for the transaction request.
   *
   * @param abi - Script JSON ABI.
   * @param args - The input arguments.
   * @returns The current instance of the `ScriptTransactionRequest`.
   */
  setData(e, n) {
    const s = new rr(e);
    return this.scriptData = s.functions.main.encodeArguments(n), this;
  }
  metadataGas(e) {
    return au({
      gasCosts: e,
      txBytesSize: this.byteSize()
    });
  }
}, T(Ks, "ScriptTransactionRequest"), Ks), Nn, zl = (Nn = class extends fa {
  /**
   * Creates an instance `UpgradeTransactionRequest`.
   *
   * @param upgradeTransactionRequestLike - The initial values for the instance
   */
  constructor({
    upgradePurpose: e,
    bytecodeWitnessIndex: n,
    ...s
  } = {}) {
    super(s);
    /** The type of transaction */
    D(this, "type", Ct.Upgrade);
    /** The upgrade purpose */
    D(this, "upgradePurpose");
    /** Witness index of consensus */
    D(this, "bytecodeWitnessIndex");
    this.bytecodeWitnessIndex = n ?? 0, this.upgradePurpose = e ?? {
      type: qe.ConsensusParameters,
      checksum: "0x"
    };
  }
  static from(e) {
    return e instanceof Nn ? e : new this(Be(e));
  }
  /**
   * Adds a consensus parameters upgrade purpose.
   *
   * @param consensus - The consensus bytecode.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addConsensusParametersUpgradePurpose(e) {
    return this.bytecodeWitnessIndex = this.addWitness(e), this.upgradePurpose = {
      type: qe.ConsensusParameters,
      checksum: _r(e)
    }, this;
  }
  /**
   * Adds a state transition upgrade purpose.
   *
   * @param bytecodeRoot - The Merkle root of the state transition.
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addStateTransitionUpgradePurpose(e) {
    return this.upgradePurpose = {
      type: qe.StateTransition,
      data: W(e)
    }, this;
  }
  /**
   * Adds an upgrade purpose.
   *
   * @param type - The upgrade purpose type.
   * @param data - The bytecode or merkle root of upgrade purpose
   *
   * @returns - The current instance of `UpgradeTransactionRequest`.
   */
  addUpgradePurpose(e, n) {
    return e === qe.ConsensusParameters && this.addConsensusParametersUpgradePurpose(n), e === qe.StateTransition && this.addStateTransitionUpgradePurpose(n), this;
  }
  /**
   * Converts the transaction request to a `TransactionUpgrade`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    let e;
    if (this.upgradePurpose.type === qe.ConsensusParameters)
      e = {
        type: qe.ConsensusParameters,
        data: {
          witnessIndex: this.bytecodeWitnessIndex,
          checksum: this.upgradePurpose.checksum
        }
      };
    else if (this.upgradePurpose.type === qe.StateTransition)
      e = {
        type: qe.StateTransition,
        data: {
          bytecodeRoot: W(this.upgradePurpose.data)
        }
      };
    else
      throw new B(B.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
    return {
      type: Ct.Upgrade,
      ...super.getBaseTransaction(),
      upgradePurpose: e
    };
  }
  /**
   * Gets the Transaction ID by hashing the transaction
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Fi(this, e);
  }
  /**
   * Calculates the metadata gas cost for an upgrade transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upgrade transaction.
   */
  metadataGas(e) {
    const n = this.byteSize();
    if (this.upgradePurpose.type === qe.ConsensusParameters) {
      const s = this.bytecodeWitnessIndex, i = this.witnesses[s].length;
      return fd({
        gasCosts: e,
        txBytesSize: n,
        consensusSize: i
      });
    }
    if (this.upgradePurpose.type === qe.StateTransition)
      return fd({
        gasCosts: e,
        txBytesSize: n
      });
    throw new B(B.CODES.NOT_IMPLEMENTED, "Invalid upgrade purpose");
  }
}, T(Nn, "UpgradeTransactionRequest"), Nn), Dn, Xl = (Dn = class extends fa {
  /**
   * Creates an instance `UploadTransactionRequest`.
   *
   * @param uploadTransactionRequestLike - The initial values for the instance
   */
  constructor({ witnessIndex: e, subsection: n, ...s } = {}) {
    super(s);
    /** Type of the transaction */
    D(this, "type", Ct.Upload);
    /** The witness index of the subsection of the bytecode. */
    D(this, "witnessIndex");
    /** The subsection data. */
    D(this, "subsection");
    this.witnessIndex = e ?? 0, this.subsection = n ?? {
      proofSet: [],
      root: St,
      subsectionIndex: 0,
      subsectionsNumber: 0
    };
  }
  static from(e) {
    return e instanceof Dn ? e : new this(Be(e));
  }
  /**
   * Adds the subsection.
   *
   * @param subsection - The subsection data.
   */
  addSubsection(e) {
    const { subsection: n, ...s } = e;
    this.subsection = s, this.witnessIndex = this.addWitness(n);
  }
  /**
   * Gets the Transaction Request by hashing the transaction.
   *
   * @param chainId - The chain ID.
   *
   * @returns - A hash of the transaction, which is the transaction ID.
   */
  getTransactionId(e) {
    return Fi(this, e);
  }
  /**
   * Converts the transaction request to a `TransactionUpload`.
   *
   * @returns The transaction create object.
   */
  toTransaction() {
    const e = this.getBaseTransaction(), { subsectionIndex: n, subsectionsNumber: s, root: i, proofSet: a } = this.subsection;
    return {
      type: Ct.Upload,
      ...e,
      subsectionIndex: n,
      subsectionsNumber: s,
      root: W(i),
      proofSet: a.map(W),
      witnessIndex: this.witnessIndex,
      proofSetCount: a.length
    };
  }
  /**
   * Calculates the metadata gas cost for an upload transaction.
   *
   * @param gasCosts - gas costs passed from the chain.
   *
   * @returns metadata gas cost for the upload transaction.
   */
  metadataGas(e) {
    return Qf({
      gasCosts: e,
      txBytesSize: this.byteSize(),
      subsectionSize: J(this.witnesses[this.witnessIndex]).length,
      subsectionsSize: this.subsection.subsectionsNumber
    });
  }
  /**
   * Calculates the minimum gas for an upload transaction.
   *
   * @param chainInfo - The chain information.
   *
   * @returns the minimum gas for the upload transaction
   */
  calculateMinGas(e) {
    const n = super.calculateMinGas(e), { gasCosts: s } = e.consensusParameters, i = this.witnesses[this.witnessIndex] ?? St;
    return Of({
      gasCosts: s,
      baseMinGas: n.toNumber(),
      subsectionSize: J(i).length
    });
  }
}, T(Dn, "UploadTransactionRequest"), Dn), ti, vR = (ti = class {
}, T(ti, "AbstractScriptRequest"), ti), Te = /* @__PURE__ */ T((r) => {
  if (r instanceof Yr || r instanceof wd || r instanceof _o || r instanceof zl || r instanceof Xl)
    return r;
  const { type: t } = r;
  switch (r.type) {
    case Ct.Script:
      return Yr.from(r);
    case Ct.Create:
      return wd.from(r);
    case Ct.Blob:
      return _o.from(r);
    case Ct.Upgrade:
      return zl.from(r);
    case Ct.Upload:
      return Xl.from(r);
    default:
      throw new B(
        L.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${t}.`
      );
  }
}, "transactionRequestify"), cn = /* @__PURE__ */ T((r) => r.type === Ct.Script, "isTransactionTypeScript"), xx = /* @__PURE__ */ T((r) => r.type === Ct.Create, "isTransactionTypeCreate"), xR = /* @__PURE__ */ T((r) => r.type === Ct.Blob, "isTransactionTypeBlob"), RR = /* @__PURE__ */ T((r) => r.type === Ct.Upgrade, "isTransactionTypeUpgrade"), SR = /* @__PURE__ */ T((r) => r.type === Ct.Upload, "isTransactionTypeUpload"), Gi = /* @__PURE__ */ new Map(), ei, Hl = (ei = class {
  constructor(t) {
    D(this, "ttl");
    if (this.ttl = t, typeof t != "number" || this.ttl <= 0)
      throw new B(
        L.INVALID_TTL,
        `Invalid TTL: ${this.ttl}. Use a value greater than zero.`
      );
  }
  // Add resources to the cache
  set(t, e) {
    const n = this.setupResourcesCache(e);
    Gi.set(t, n);
  }
  unset(t) {
    Gi.delete(t);
  }
  getActiveData(t) {
    const e = { utxos: [], messages: [] }, n = Date.now(), s = [];
    return Gi.forEach((i, a) => {
      if (n - i.timestamp < this.ttl) {
        const d = i.owners.get(t);
        d && (e.utxos.push(...d.utxos), e.messages.push(...d.messages));
      } else
        s.push(a);
    }), s.forEach(this.unset), e.utxos.reverse(), e.messages.reverse(), e;
  }
  isCached(t, e) {
    const n = Date.now();
    let s = !1;
    const i = [];
    for (const [a, o] of Gi.entries())
      if (n - o.timestamp < this.ttl) {
        const h = o.owners.get(t);
        if (h != null && h.utxos.has(e) || h != null && h.messages.has(e)) {
          s = !0;
          break;
        }
      } else
        i.push(a);
    return i.forEach(this.unset), s;
  }
  clear() {
    Gi.clear();
  }
  setupResourcesCache(t) {
    const e = Date.now(), n = {
      owners: /* @__PURE__ */ new Map(),
      timestamp: e
    };
    return t.filter(ko).forEach((s) => {
      var d, h;
      const { owner: i, key: a, type: o } = this.extractResourceData(s);
      n.owners.has(i) || n.owners.set(i, { utxos: /* @__PURE__ */ new Set(), messages: /* @__PURE__ */ new Set() }), o === "utxo" ? (d = n.owners.get(i)) == null || d.utxos.add(a) : (h = n.owners.get(i)) == null || h.messages.add(a);
    }), n;
  }
  extractResourceData(t) {
    return Rr(t) ? { owner: W(t.owner), key: W(t.id), type: "utxo" } : { owner: W(t.recipient), key: W(t.nonce), type: "message" };
  }
}, T(ei, "ResourceCache"), ei), Rx = /* @__PURE__ */ T((r) => {
  var O;
  const {
    gasPrice: t,
    rawPayload: e,
    tip: n,
    consensusParameters: { gasCosts: s, feeParams: i, maxGasPerTx: a }
  } = r, o = E(i.gasPerByte), d = E(i.gasPriceFactor), h = J(e), [f] = new lr().decode(h, 0), { type: g, witnesses: y, inputs: R, policies: Q } = f;
  let x = E(0), N = E(0);
  if (g !== Ct.Create && g !== Ct.Script)
    return E(0);
  if (g === Ct.Create) {
    const { bytecodeWitnessIndex: k, storageSlots: G } = f, z = E(J(y[k].data).length);
    x = iu({
      contractBytesSize: z,
      gasCosts: s,
      stateRootSize: G.length || 0,
      txBytesSize: h.length
    });
  } else {
    const { scriptGasLimit: k } = f;
    k && (N = k), x = au({
      gasCosts: s,
      txBytesSize: h.length
    });
  }
  const U = su({
    gasCosts: s,
    gasPerByte: E(o),
    inputs: R,
    metadataGas: x,
    txBytesSize: h.length
  }), H = (O = Q.find((k) => k.type === ke.WitnessLimit)) == null ? void 0 : O.data, X = y.reduce((k, G) => k + G.dataLength, 0), P = Po({
    gasPerByte: o,
    minGas: U,
    witnessesLength: X,
    gasLimit: N,
    witnessLimit: H,
    maxGasPerTx: a
  });
  return Bi({
    gasPrice: t,
    gas: P,
    priceFactor: d,
    tip: n
  });
}, "calculateTXFeeForSummary");
function Uf(r, t) {
  return r.filter((e) => t.includes(e.type));
}
T(Uf, "getInputsByTypes");
function Uo(r, t) {
  return r.filter((e) => e.type === t);
}
T(Uo, "getInputsByType");
function Gf(r) {
  return Uo(r, vt.Coin);
}
T(Gf, "getInputsCoin");
function zf(r) {
  return Uo(r, vt.Message);
}
T(zf, "getInputsMessage");
function cu(r) {
  return Uf(r, [vt.Coin, vt.Message]);
}
T(cu, "getInputsCoinAndMessage");
function md(r) {
  return r.type === vt.Coin;
}
T(md, "isInputCoin");
function Xf(r) {
  return Uo(r, vt.Contract);
}
T(Xf, "getInputsContract");
function Hf(r, t) {
  return Gf(r).find((n) => n.assetId === t);
}
T(Hf, "findCoinInput");
function Vf(r, t) {
  const e = /* @__PURE__ */ new Map();
  return cu(r).forEach((n) => {
    const s = md(n) ? n.assetId : t, i = md(n) ? n.owner : n.recipient;
    let a = e.get(s);
    a || (a = /* @__PURE__ */ new Map(), e.set(s, a));
    let o = a.get(i);
    o || (o = new E_(0), a.set(i, o)), a.set(i, o.add(n.amount));
  }), e;
}
T(Vf, "aggregateInputsAmountsByAssetAndOwner");
function Wf(r) {
  var t;
  return (t = zf(r)) == null ? void 0 : t[0];
}
T(Wf, "findMessageInput");
function du(r, t, e = !1) {
  const n = Hf(r, t);
  if (n)
    return n;
  if (e)
    return Wf(r);
}
T(du, "getInputFromAssetId");
function Yf(r, t) {
  if (t == null)
    return;
  const e = r == null ? void 0 : r[t];
  if (e) {
    if (e.type !== vt.Contract)
      throw new B(
        L.INVALID_TRANSACTION_INPUT,
        "Contract input should be of type 'contract'."
      );
    return e;
  }
}
T(Yf, "getInputContractFromIndex");
function Go(r) {
  return r.type === vt.Coin ? r.owner.toString() : r.type === vt.Message ? r.recipient.toString() : "";
}
T(Go, "getInputAccountAddress");
function Qi(r, t) {
  return r.filter((e) => e.type === t);
}
T(Qi, "getOutputsByType");
function jf(r) {
  return Qi(r, lt.ContractCreated);
}
T(jf, "getOutputsContractCreated");
function uu(r) {
  return Qi(r, lt.Coin);
}
T(uu, "getOutputsCoin");
function Zf(r) {
  return Qi(r, lt.Change);
}
T(Zf, "getOutputsChange");
function Jf(r) {
  return Qi(r, lt.Contract);
}
T(Jf, "getOutputsContract");
function Sx(r) {
  return Qi(r, lt.Variable);
}
T(Sx, "getOutputsVariable");
var Tx = /* @__PURE__ */ ((r) => (r.Create = "Create", r.Mint = "Mint", r.Script = "Script", r.Upgrade = "Upgrade", r.Upload = "Upload", r.Blob = "Blob", r))(Tx || {}), qf = /* @__PURE__ */ ((r) => (r.submitted = "submitted", r.success = "success", r.squeezedout = "squeezedout", r.failure = "failure", r.preconfirmationSuccess = "preconfirmationSuccess", r.preconfirmationFailure = "preconfirmationFailure", r))(qf || {}), Nx = /* @__PURE__ */ ((r) => (r.payBlockProducer = "Pay network fee to block producer", r.contractCreated = "Contract created", r.transfer = "Transfer asset", r.contractCall = "Contract call", r.receive = "Receive asset", r.withdrawFromFuel = "Withdraw from Fuel", r))(Nx || {}), Dx = /* @__PURE__ */ ((r) => (r[r.contract = 0] = "contract", r[r.account = 1] = "account", r))(Dx || {}), Fx = /* @__PURE__ */ ((r) => (r.ethereum = "ethereum", r.fuel = "fuel", r))(Fx || {});
function vi(r, t) {
  return (r ?? []).filter((e) => e.type === t);
}
T(vi, "getReceiptsByType");
function zo(r) {
  switch (r) {
    case Ct.Mint:
      return "Mint";
    case Ct.Create:
      return "Create";
    case Ct.Script:
      return "Script";
    case Ct.Blob:
      return "Blob";
    case Ct.Upgrade:
      return "Upgrade";
    case Ct.Upload:
      return "Upload";
    default:
      throw new B(
        L.UNSUPPORTED_TRANSACTION_TYPE,
        `Unsupported transaction type: ${r}.`
      );
  }
}
T(zo, "getTransactionTypeName");
function Vn(r, t) {
  return zo(r) === t;
}
T(Vn, "isType");
function hu(r) {
  return Vn(
    r,
    "Mint"
    /* Mint */
  );
}
T(hu, "isTypeMint");
function Xo(r) {
  return Vn(
    r,
    "Create"
    /* Create */
  );
}
T(Xo, "isTypeCreate");
function Ho(r) {
  return Vn(
    r,
    "Script"
    /* Script */
  );
}
T(Ho, "isTypeScript");
function Au(r) {
  return Vn(
    r,
    "Upgrade"
    /* Upgrade */
  );
}
T(Au, "isTypeUpgrade");
function lu(r) {
  return Vn(
    r,
    "Upload"
    /* Upload */
  );
}
T(lu, "isTypeUpload");
function _u(r) {
  return Vn(
    r,
    "Blob"
    /* Blob */
  );
}
T(_u, "isTypeBlob");
function Qx(r) {
  return (t) => r.assetId === t.assetId;
}
T(Qx, "hasSameAssetId");
function $f(r) {
  return vi(r, ut.Call);
}
T($f, "getReceiptsCall");
function Kf(r) {
  return vi(r, ut.MessageOut);
}
T(Kf, "getReceiptsMessageOut");
function tg(r, t) {
  const e = r.assetsSent || [], n = t.assetsSent || [], s = /* @__PURE__ */ new Map();
  return e.forEach((i) => {
    s.set(i.assetId, { ...i });
  }), n.forEach((i) => {
    const a = s.get(i.assetId);
    a ? a.amount = E(a.amount).add(i.amount) : s.set(i.assetId, { ...i });
  }), Array.from(s.values());
}
T(tg, "mergeAssets");
function eg(r, t) {
  var e, n, s, i, a, o, d, h;
  return r.name === t.name && ((e = r.from) == null ? void 0 : e.address) === ((n = t.from) == null ? void 0 : n.address) && ((s = r.to) == null ? void 0 : s.address) === ((i = t.to) == null ? void 0 : i.address) && ((a = r.from) == null ? void 0 : a.type) === ((o = t.from) == null ? void 0 : o.type) && ((d = r.to) == null ? void 0 : d.type) === ((h = t.to) == null ? void 0 : h.type);
}
T(eg, "isSameOperation");
function rg(r, t) {
  var e, n;
  return (e = t.assetsSent) != null && e.length ? (n = r.assetsSent) != null && n.length ? tg(r, t) : t.assetsSent : r.assetsSent;
}
T(rg, "mergeAssetsSent");
function ng(r, t) {
  var e;
  return (e = t.calls) != null && e.length ? [...r.calls || [], ...t.calls] : r.calls;
}
T(ng, "mergeCalls");
function sg(r, t) {
  var e;
  return {
    ...r,
    assetsSent: rg(r, t),
    calls: ng(r, t),
    receipts: [
      ...r.receipts || [],
      ...((e = t.receipts) == null ? void 0 : e.filter((n) => {
        var s;
        return !((s = r.receipts) != null && s.some((i) => i === n));
      })) || []
    ]
  };
}
T(sg, "mergeOperations");
function xi(r, t) {
  const e = r.findIndex((n) => eg(n, t));
  return e === -1 ? [...r, t] : r.map((n, s) => s === e ? sg(n, t) : n);
}
T(xi, "addOperation");
function Ox(r) {
  return vi(r, ut.TransferOut);
}
T(Ox, "getReceiptsTransferOut");
function ig({
  inputs: r,
  receipts: t,
  baseAssetId: e
}) {
  return Kf(t).reduce(
    (i, a) => {
      const o = du(r, e, !0);
      if (o) {
        const d = Go(o);
        return xi(i, {
          name: "Withdraw from Fuel",
          from: {
            type: 1,
            address: d
          },
          to: {
            type: 1,
            address: a.recipient.toString(),
            chain: "ethereum"
            /* ethereum */
          },
          assetsSent: [
            {
              amount: a.amount,
              assetId: e
            }
          ],
          receipts: [a]
        });
      }
      return i;
    },
    []
  );
}
T(ig, "getWithdrawFromFuelOperations");
function ag(r, t, e, n, s) {
  return (t == null ? void 0 : t[r.contractID]) ? [] : [];
}
T(ag, "getContractCalls");
function og(r) {
  var t;
  return (t = r.amount) != null && t.isZero() ? void 0 : [
    {
      amount: r.amount,
      assetId: r.assetId
    }
  ];
}
T(og, "getAssetsSent");
function cg(r, t, e, n, s, i, a) {
  const o = r.assetId === St ? a : r.assetId, d = du(e, o, o === a);
  if (!d)
    return [];
  const h = Go(d), f = ag(t, n);
  return [
    {
      name: "Contract call",
      from: {
        type: 1,
        address: h
      },
      to: {
        type: 0,
        address: r.to
      },
      assetsSent: og(r),
      calls: f,
      receipts: [r]
    }
  ];
}
T(cg, "processCallReceipt");
function dg({
  inputs: r,
  outputs: t,
  receipts: e,
  abiMap: n,
  rawPayload: s,
  maxInputs: i,
  baseAssetId: a
}) {
  const o = $f(e);
  return Jf(t).flatMap((h) => {
    const f = Yf(r, h.inputIndex);
    return f ? o.filter((g) => g.to === f.contractID).flatMap(
      (g) => cg(
        g,
        f,
        r,
        n,
        s,
        i,
        a
      )
    ) : [];
  });
}
T(dg, "getContractCallOperations");
function ug(r, t, e) {
  const { to: n, assetId: s, amount: i } = r;
  let { id: a } = r;
  const o = t.some((h) => h.contractID === n) ? 0 : 1;
  if (St === a) {
    const h = e.find((f) => f.assetId === s);
    a = (h == null ? void 0 : h.to) || a;
  }
  return {
    name: "Transfer asset",
    from: {
      type: t.some((h) => h.contractID === a) ? 0 : 1,
      address: a
    },
    to: {
      type: o,
      address: n
    },
    assetsSent: [
      {
        assetId: s.toString(),
        amount: i
      }
    ],
    receipts: [r]
  };
}
T(ug, "extractTransferOperationFromReceipt");
function hg({
  inputs: r,
  outputs: t,
  receipts: e,
  baseAssetId: n
}) {
  let s = [];
  const i = uu(t), a = Xf(r), o = Zf(t), d = Vf(r, n);
  i.forEach(({ amount: g, assetId: y, to: R }) => {
    const Q = d.get(y) || /* @__PURE__ */ new Map();
    let x, N;
    for (const [U, H] of Q)
      if (N || (N = U), H.gte(g)) {
        x = U;
        break;
      }
    x = x || N, x && (s = xi(s, {
      name: "Transfer asset",
      from: {
        type: 1,
        address: x
      },
      to: {
        type: 1,
        address: R
      },
      assetsSent: [{ assetId: y, amount: g }]
    }));
  });
  const h = vi(
    e,
    ut.Transfer
  ), f = vi(
    e,
    ut.TransferOut
  );
  return [...h, ...f].forEach((g) => {
    const y = ug(g, a, o);
    s = xi(s, y);
  }), s;
}
T(hg, "getTransferOperations");
function Ag(r) {
  return uu(r).reduce((n, s) => xi(n, {
    name: "Pay network fee to block producer",
    from: {
      type: 1,
      address: "Network"
    },
    to: {
      type: 1,
      address: s.to.toString()
    },
    assetsSent: [
      {
        assetId: s.assetId.toString(),
        amount: s.amount
      }
    ]
  }), []);
}
T(Ag, "getPayProducerOperations");
function lg({ inputs: r, outputs: t }) {
  const e = jf(t), n = cu(r)[0], s = Go(n);
  return e.reduce((a, o) => xi(a, {
    name: "Contract created",
    from: {
      type: 1,
      address: s
    },
    to: {
      type: 0,
      address: (o == null ? void 0 : o.contractId) || ""
    }
  }), []);
}
T(lg, "getContractCreatedOperations");
function pu({
  transactionType: r,
  inputs: t,
  outputs: e,
  receipts: n,
  abiMap: s,
  rawPayload: i,
  maxInputs: a,
  baseAssetId: o
}) {
  return Xo(r) ? [...lg({ inputs: t, outputs: e })] : Ho(r) ? [
    ...hg({ inputs: t, outputs: e, receipts: n, baseAssetId: o }),
    ...dg({
      inputs: t,
      outputs: e,
      receipts: n,
      abiMap: s,
      rawPayload: i,
      maxInputs: a,
      baseAssetId: o
    }),
    ...ig({ inputs: t, receipts: n, baseAssetId: o })
  ] : [...Ag(e)];
}
T(pu, "getOperations");
var TR = /* @__PURE__ */ T((r) => Re(r), "processGqlReceipt"), _g = /* @__PURE__ */ T((r) => {
  const t = [];
  return r.forEach((e) => {
    e.type === ut.Mint && t.push({
      subId: e.subId,
      contractId: e.contractId,
      assetId: e.assetId,
      amount: e.val
    });
  }), t;
}, "extractMintedAssetsFromReceipts"), pg = /* @__PURE__ */ T((r) => {
  const t = [];
  return r.forEach((e) => {
    e.type === ut.Burn && t.push({
      subId: e.subId,
      contractId: e.contractId,
      assetId: e.assetId,
      amount: e.val
    });
  }), t;
}, "extractBurnedAssetsFromReceipts"), Mx = /* @__PURE__ */ T((r) => {
  switch (r) {
    case "FailureStatus":
      return "failure";
    case "SuccessStatus":
      return "success";
    case "SubmittedStatus":
      return "submitted";
    case "SqueezedOutStatus":
      return "squeezedout";
    case "PreconfirmationSuccessStatus":
      return "preconfirmationSuccess";
    case "PreconfirmationFailureStatus":
      return "preconfirmationFailure";
    default:
      throw new B(
        L.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${r}.`
      );
  }
}, "getTransactionStatusName"), Vl = /* @__PURE__ */ T((r) => {
  const t = [];
  return r == null || r.forEach(
    ({ utxoId: e, output: n }) => t.push({
      utxoId: e,
      output: Nf(n)
    })
  ), t;
}, "extractResolvedOutputs"), fg = /* @__PURE__ */ T((r) => {
  var x, N, U, H, X, P;
  let t, e, n, s, i, a, o = [], d, h = !1, f = !1, g = !1, y = !1, R = !1;
  if (r != null && r.type)
    switch (n = Mx(r.type), r.type) {
      case "SuccessStatus":
        t = r.time, e = (x = r.block) == null ? void 0 : x.id, f = !0, a = (N = r.receipts) == null ? void 0 : N.map(Re), s = E(r.totalFee), i = E(r.totalGas);
        break;
      case "FailureStatus":
        t = r.time, e = (U = r.block) == null ? void 0 : U.id, h = !0, s = E(r.totalFee), a = (H = r.receipts) == null ? void 0 : H.map(Re), i = E(r.totalGas);
        break;
      case "SubmittedStatus":
        t = r.time, g = !0;
        break;
      case "PreconfirmationSuccessStatus":
        y = !0, s = E(r.totalFee), i = E(r.totalGas), a = (X = r.preconfirmationReceipts) == null ? void 0 : X.map(Re), o = Vl(r.resolvedOutputs);
        break;
      case "PreconfirmationFailureStatus":
        R = !0, s = E(r.totalFee), i = E(r.totalGas), a = (P = r.preconfirmationReceipts) == null ? void 0 : P.map(Re), o = Vl(r.resolvedOutputs), d = r.reason;
        break;
    }
  return {
    time: t,
    blockId: e,
    status: n,
    totalFee: s,
    totalGas: i,
    receipts: a,
    isStatusFailure: h,
    isStatusSuccess: f,
    isStatusPending: g,
    isStatusPreConfirmationSuccess: y,
    isStatusPreConfirmationFailure: R,
    resolvedOutputs: o,
    errorReason: d
  };
}, "processGraphqlStatus"), gg = /* @__PURE__ */ T((r) => r && "totalFee" in r ? E(r.totalFee) : void 0, "getTotalFeeFromStatus");
function Oi(r) {
  var A, p;
  const {
    id: t,
    receipts: e,
    gasPerByte: n,
    gasPriceFactor: s,
    transaction: i,
    transactionBytes: a,
    gqlTransactionStatus: o,
    abiMap: d = {},
    maxInputs: h,
    gasCosts: f,
    maxGasPerTx: g,
    gasPrice: y,
    baseAssetId: R
  } = r, Q = Di(e), x = W(a), N = pu({
    transactionType: i.type,
    inputs: i.inputs || [],
    outputs: i.outputs || [],
    receipts: e,
    rawPayload: x,
    abiMap: d,
    maxInputs: h,
    baseAssetId: R
  }), U = zo(i.type), H = E((p = (A = i.policies) == null ? void 0 : A.find((m) => m.type === ke.Tip)) == null ? void 0 : p.data), { isStatusFailure: X, isStatusPending: P, isStatusSuccess: M, blockId: O, status: k, time: G, totalFee: z } = fg(o), j = z ?? Rx({
    gasPrice: y,
    rawPayload: x,
    tip: H,
    consensusParameters: {
      gasCosts: f,
      maxGasPerTx: g,
      feeParams: {
        gasPerByte: n,
        gasPriceFactor: s
      }
    }
  }), Z = _g(e), $ = pg(e);
  let v;
  return G && (v = Q_.fromTai64(G)), {
    id: t,
    tip: H,
    fee: j,
    gasUsed: Q,
    operations: N,
    type: U,
    blockId: O,
    time: G,
    status: k,
    receipts: e,
    mintedAssets: Z,
    burnedAssets: $,
    isTypeMint: hu(i.type),
    isTypeCreate: Xo(i.type),
    isTypeScript: Ho(i.type),
    isTypeUpgrade: Au(i.type),
    isTypeUpload: lu(i.type),
    isTypeBlob: _u(i.type),
    isStatusFailure: X,
    isStatusSuccess: M,
    isStatusPending: P,
    date: v,
    transaction: i
  };
}
T(Oi, "assembleTransactionSummary");
function wg(r) {
  var z, j;
  const { id: t, gqlTransactionStatus: e, transactionRequest: n, baseAssetId: s, maxInputs: i, abiMap: a } = r;
  let o, d, h, f, g, y, R;
  const {
    isStatusFailure: Q,
    isStatusSuccess: x,
    isStatusPending: N,
    status: U,
    receipts: H,
    resolvedOutputs: X,
    errorReason: P,
    totalFee: M,
    isStatusPreConfirmationFailure: O,
    isStatusPreConfirmationSuccess: k
  } = fg(e);
  if (H && (h = Di(H), y = _g(H), R = pg(H)), n && (g = n.toTransaction(), o = zo(g.type), f = E((j = (z = g.policies) == null ? void 0 : z.find((Z) => Z.type === ke.Tip)) == null ? void 0 : j.data), H)) {
    const Z = W(new lr().encode(g));
    d = pu({
      transactionType: g.type,
      inputs: g.inputs || [],
      outputs: g.outputs || [],
      receipts: H,
      rawPayload: Z,
      abiMap: a,
      maxInputs: i,
      baseAssetId: s
    });
  }
  return {
    id: t,
    fee: M,
    type: o,
    status: U,
    receipts: H,
    gasUsed: h,
    tip: f,
    isStatusPreConfirmationFailure: O,
    isStatusPreConfirmationSuccess: k,
    isStatusFailure: Q,
    isStatusSuccess: x,
    isStatusPending: N,
    ...g && {
      isTypeMint: hu(g.type),
      isTypeCreate: Xo(g.type),
      isTypeScript: Ho(g.type),
      isTypeUpgrade: Au(g.type),
      isTypeUpload: lu(g.type),
      isTypeBlob: _u(g.type)
    },
    mintedAssets: y,
    burnedAssets: R,
    resolvedOutputs: X,
    errorReason: P,
    transaction: g,
    operations: d
  };
}
T(wg, "assemblePreConfirmationTransactionSummary");
function ra(r) {
  const { receipts: t, mainAbi: e, externalAbis: n = {} } = r;
  let s = "";
  if (e.programType === "contract") {
    const i = t.find(
      (a) => a.type === ut.Call && a.id === St
    );
    i && (s = i.to);
  }
  return t.reduce(
    ({ logs: i, groupedLogs: a }, o) => {
      if (o.type === ut.LogData || o.type === ut.Log) {
        const d = o.id === St || s === o.id;
        if (d || n[o.id]) {
          const f = d ? new rr(e) : new rr(n[o.id]), g = o.type === ut.Log ? new rt("u64").encode(o.ra) : o.data, [y] = f.decodeLog(g, o.rb.toString());
          i.push(y), a[o.id] = [...a[o.id] || [], y];
        }
      }
      return { logs: i, groupedLogs: a };
    },
    { logs: [], groupedLogs: {} }
  );
}
T(ra, "getAllDecodedLogs");
var Fn, yd = (Fn = class {
  /**
   * Constructor for `TransactionResponse`.
   *
   * @param tx - The transaction ID or TransactionRequest.
   * @param provider - The provider.
   */
  constructor(t, e, n, s, i) {
    /** Transaction ID */
    D(this, "id");
    /** Current provider */
    D(this, "provider");
    /** Gas used on the transaction */
    D(this, "gasUsed", E(0));
    /** The graphql Transaction with receipts object. */
    D(this, "gqlTransaction");
    D(this, "request");
    D(this, "status");
    D(this, "abis");
    D(this, "preConfirmationStatus");
    D(this, "waitingForStreamData", !1);
    D(this, "statusResolvers", /* @__PURE__ */ new Map());
    this.submitTxSubscription = i, typeof t == "string" ? this.id = t : (this.id = t.getTransactionId(n), this.request = t), this.provider = e, this.abis = s, this.waitForResult = this.waitForResult.bind(this), this.waitForPreConfirmation = this.waitForPreConfirmation.bind(this);
  }
  /**
   * Async constructor for `TransactionResponse`. This method can be used to create
   * an instance of `TransactionResponse` and wait for the transaction to be fetched
   * from the chain, ensuring that the `gqlTransaction` property is set.
   *
   * @param id - The transaction ID.
   * @param provider - The provider.
   */
  static async create(t, e, n) {
    const s = await e.getChainId(), i = new Fn(t, e, s, n);
    return await i.fetch(), i;
  }
  applyMalleableSubscriptionFields(t) {
    const e = this.status;
    if (!e)
      return;
    const n = t;
    (e.type === "SuccessStatus" || e.type === "FailureStatus") && (n.inputs = n.inputs.map((s, i) => {
      var a;
      if ("txPointer" in s) {
        const o = (a = e.transaction.inputs) == null ? void 0 : a[i];
        return {
          ...s,
          txPointer: kn.decodeFromGqlScalar(o.txPointer)
        };
      }
      return s;
    }), n.outputs = e.transaction.outputs.map(Nf), e.transaction.receiptsRoot && (n.receiptsRoot = e.transaction.receiptsRoot));
  }
  async getTransaction() {
    if (this.request) {
      const i = this.request.toTransaction();
      return this.applyMalleableSubscriptionFields(i), {
        tx: i,
        bytes: this.request.toTransactionBytes()
      };
    }
    const t = this.gqlTransaction ?? await this.fetch(), { rawPayload: e } = t, n = J(e), [s] = new lr().decode(n, 0);
    return {
      tx: s,
      bytes: n
    };
  }
  /**
   *
   * NOTE: This method is only called within `getTransactionSummary`, which is invoked after `getTransaction`.
   * Since `getTransaction` only resolves once the transaction has been processed,
   * the status at this point is guaranteed to be either `SuccessStatus` or `FailureStatus`.
   */
  getReceipts() {
    const t = this.getTransactionStatus();
    switch (t == null ? void 0 : t.type) {
      case "SuccessStatus":
      case "FailureStatus":
        return t.receipts.map(Re);
      default:
        return [];
    }
  }
  /**
   * Fetch the transaction with receipts from the provider.
   *
   * @returns Transaction with receipts query result.
   */
  async fetch() {
    const t = await this.provider.operations.getTransactionWithReceipts({
      transactionId: this.id
    });
    if (!t.transaction) {
      const e = await this.provider.operations.statusChange({
        transactionId: this.id
      });
      for await (const { statusChange: n } of e)
        if (n) {
          this.status = n;
          break;
        }
      return this.fetch();
    }
    return this.gqlTransaction = t.transaction, t.transaction;
  }
  /**
   * Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
   * fetch it from the provider
   *
   * @param contractsAbiMap - The contracts ABI map.
   * @returns
   */
  async getTransactionSummary(t) {
    const { tx: e, bytes: n } = await this.getTransaction(), { gasPerByte: s, gasPriceFactor: i, gasCosts: a, maxGasPerTx: o } = await this.provider.getGasConfig(), d = this.getTransactionStatus(), f = gg(d) ? E(0) : await this.provider.getLatestGasPrice(), g = (await this.provider.getChain()).consensusParameters.txParameters.maxInputs, y = await this.provider.getBaseAssetId();
    return Oi({
      id: this.id,
      receipts: this.getReceipts(),
      transaction: e,
      transactionBytes: n,
      gqlTransactionStatus: d,
      gasPerByte: s,
      gasPriceFactor: i,
      abiMap: t,
      maxInputs: g,
      gasCosts: a,
      maxGasPerTx: o,
      gasPrice: f,
      baseAssetId: y
    });
  }
  async getPreConfirmationTransactionSummary(t) {
    const e = await this.provider.getBaseAssetId(), n = (await this.provider.getChain()).consensusParameters.txParameters.maxInputs;
    return wg({
      id: this.id,
      gqlTransactionStatus: this.preConfirmationStatus || this.status,
      baseAssetId: e,
      maxInputs: n,
      abiMap: t,
      transactionRequest: this.request
    });
  }
  resolveStatus(t) {
    (this.statusResolvers.get(t) || []).forEach((n) => n()), this.statusResolvers.delete(t);
  }
  async waitForStatus(t) {
    return new Promise((e, n) => {
      const s = this.statusResolvers.get(t) || [];
      s.push(() => {
        e();
      }), this.statusResolvers.set(t, s), this.waitForStatusChange().catch(n);
    });
  }
  /**
   * Waits for the status change of the transaction.
   * If the transaction is already in a final state, it will return immediately.
   * If the transaction is not in a final state, it will wait for the status change.
   * If we are already subscribed to the status change, it will return immediately.
   */
  async waitForStatusChange() {
    var n;
    const t = (n = this.status) == null ? void 0 : n.type;
    if (t && (t === "FailureStatus" || t === "SuccessStatus")) {
      this.resolveStatus("preConfirmation"), this.resolveStatus("confirmation");
      return;
    }
    if (this.waitingForStreamData)
      return;
    this.waitingForStreamData = !0;
    const e = this.submitTxSubscription ?? await this.provider.operations.statusChange({
      transactionId: this.id,
      includePreConfirmation: !0
    });
    for await (const s of e) {
      const i = "statusChange" in s ? s.statusChange : s.submitAndAwaitStatus;
      if (this.status = i, i.type === "SqueezedOutStatus")
        throw new B(
          L.TRANSACTION_SQUEEZED_OUT,
          `Transaction Squeezed Out with reason: ${i.reason}`
        );
      if ((i.type === "PreconfirmationSuccessStatus" || i.type === "PreconfirmationFailureStatus") && (this.preConfirmationStatus = i, this.resolveStatus("preConfirmation"), !this.statusResolvers.get("confirmation"))) {
        this.waitingForStreamData = !1;
        break;
      }
      if (i.type === "SuccessStatus" || i.type === "FailureStatus") {
        this.resolveStatus("confirmation"), this.resolveStatus("preConfirmation"), this.waitingForStreamData = !1;
        break;
      }
    }
  }
  async waitForConfirmationStatuses() {
    try {
      await this.waitForStatus("confirmation");
    } catch (t) {
      throw this.unsetResourceCache(), t;
    }
  }
  async waitForPreConfirmationStatuses() {
    try {
      await this.waitForStatus("preConfirmation");
    } catch (t) {
      throw this.unsetResourceCache(), t;
    }
  }
  /**
   * Assembles the result of a transaction by retrieving the transaction summary,
   * decoding logs (if available), and handling transaction failure.
   *
   * This method can be used to obtain the result of a transaction that has just
   * been submitted or one that has already been processed.
   *
   * @template TTransactionType - The type of the transaction.
   * @param contractsAbiMap - The map of contract ABIs.
   * @returns - The assembled transaction result.
   * @throws If the transaction status is a failure.
   */
  async assembleResult(t) {
    const e = await this.getTransactionSummary(t), n = {
      ...e
    };
    let { logs: s, groupedLogs: i } = { logs: [], groupedLogs: {} };
    this.abis && ({ logs: s, groupedLogs: i } = ra({
      receipts: e.receipts,
      mainAbi: this.abis.main,
      externalAbis: this.abis.otherContractsAbis
    }), n.logs = s, n.groupedLogs = i);
    const { receipts: a } = n, o = this.getTransactionStatus();
    if ((o == null ? void 0 : o.type) === "FailureStatus") {
      const { reason: d } = o;
      throw ou({
        receipts: a,
        statusReason: d,
        logs: s,
        groupedLogs: i
      });
    }
    return n;
  }
  async assemblePreConfirmationResult(t) {
    const e = await this.getPreConfirmationTransactionSummary(t), n = {
      ...e,
      logs: [],
      groupedLogs: {}
    };
    let { logs: s, groupedLogs: i } = { logs: [], groupedLogs: {} };
    return this.abis && e.receipts && ({ logs: s, groupedLogs: i } = ra({
      receipts: e.receipts,
      mainAbi: this.abis.main,
      externalAbis: this.abis.otherContractsAbis
    }), n.logs = s, n.groupedLogs = i), n;
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @returns The completed transaction result
   */
  async waitForResult(t) {
    return await this.waitForConfirmationStatuses(), this.unsetResourceCache(), this.assembleResult(t);
  }
  /**
   * Waits for the transaction's pre-confirmation and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   * @returns The pre-confirmed transaction result
   */
  async waitForPreConfirmation(t) {
    return await this.waitForPreConfirmationStatuses(), this.unsetResourceCache(), this.assemblePreConfirmationResult(t);
  }
  /**
   * Waits for transaction to complete and returns the result.
   *
   * @param contractsAbiMap - The contracts ABI map.
   */
  async wait(t) {
    return this.waitForResult(t);
  }
  unsetResourceCache() {
    var t;
    (t = this.provider.cache) == null || t.unset(this.id);
  }
  getTransactionStatus() {
    var t;
    return this.status ?? ((t = this.gqlTransaction) == null ? void 0 : t.status);
  }
}, T(Fn, "TransactionResponse"), Fn);
function mg(r, t, e = {}) {
  let n = "";
  return t.programType === "contract" && (n = r.find(
    (i) => i.type === ut.Call && i.id === St
  ).to), r.reduce((s, i) => {
    if (i.type === ut.LogData || i.type === ut.Log) {
      const a = i.id === St || n === i.id;
      if (a || e[i.id]) {
        const d = a ? new rr(t) : new rr(e[i.id]), h = i.type === ut.Log ? new rt("u64").encode(i.ra) : i.data, [f] = d.decodeLog(h, i.rb.toString());
        s.push(f);
      }
    }
    return s;
  }, []);
}
T(mg, "getDecodedLogs");
function fu(r, t) {
  const e = r.baseDelay ?? 150;
  switch (r.backoff) {
    case "linear":
      return e * t;
    case "fixed":
      return e;
    case "exponential":
    default:
      return 2 ** (t - 1) * e;
  }
}
T(fu, "getWaitDelay");
function gu(r, t, e = 0) {
  return t === void 0 ? r : async (...n) => {
    var s;
    try {
      return await r(...n);
    } catch (i) {
      const a = i;
      if (((s = a.cause) == null ? void 0 : s.code) !== "ECONNREFUSED")
        throw a;
      const o = e + 1;
      if (o > t.maxRetries)
        throw a;
      const d = fu(t, o);
      return await Td(d), gu(r, t, o)(...n);
    }
  };
}
T(gu, "autoRetryFetch");
var Px = /* @__PURE__ */ T(async (r) => {
  var i;
  const { response: t, isSubscription: e } = r;
  let n;
  const s = t.clone();
  if (e) {
    const a = (i = s.body) == null ? void 0 : i.getReader(), { event: o } = await ld.readEvent(a);
    n = o == null ? void 0 : o.extensions;
  } else
    n = (await s.json()).extensions;
  return {
    extensions: n
  };
}, "parseGraphqlResponse"), Jn = /* @__PURE__ */ T((r) => {
  const { paginationLimit: t, inputArgs: e = {} } = r, { first: n, last: s, after: i, before: a } = e;
  if (i && a)
    throw new B(
      L.INVALID_INPUT_PARAMETERS,
      'Pagination arguments "after" and "before" cannot be used together'
    );
  if ((n || 0) > t || (s || 0) > t)
    throw new B(
      L.INVALID_INPUT_PARAMETERS,
      `Pagination limit for this query cannot exceed ${t} items`
    );
  if (n && a)
    throw new B(
      L.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "first" with "before" is not supported'
    );
  if (s && i)
    throw new B(
      L.INVALID_INPUT_PARAMETERS,
      'The use of pagination argument "last" with "after" is not supported'
    );
  return !n && !s && (e.first = t), e;
}, "validatePaginationArgs"), Wl = 10, Yl = 512, yg = 60, Lx = 100, kx = 1e4, Ux = 5, Gx = 2e4, zx = 1.2, Xx = [
  "submit",
  "submitAndAwaitStatus",
  "produceBlocks"
], st, po, bg, bd = (st = class {
  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  constructor(t, e = {}) {
    Ie(this, po);
    D(this, "operations");
    D(this, "cache");
    /** @hidden */
    D(this, "url");
    /** @hidden */
    D(this, "urlWithoutAuth");
    /** @hidden */
    D(this, "consensusParametersTimestamp");
    D(this, "options", {
      timeout: void 0,
      resourceCacheTTL: void 0,
      fetch: void 0,
      retryOptions: void 0,
      headers: void 0,
      cache: void 0
    });
    const { url: n, urlWithoutAuth: s, headers: i } = st.extractBasicAuth(t);
    this.url = n, this.urlWithoutAuth = s, this.url = t;
    const { FUELS: a } = m_, o = { ...i, ...e.headers, Source: `ts-sdk-${a}` };
    this.options = {
      ...this.options,
      ...e,
      headers: o
    }, this.operations = this.createOperations();
    const { resourceCacheTTL: d, cache: h } = this.options;
    if (h) {
      const { consensusParametersTimestamp: f, chain: g, nodeInfo: y } = ux(h);
      this.consensusParametersTimestamp = f, st.chainInfoCache[this.urlWithoutAuth] = g, st.nodeInfoCache[this.urlWithoutAuth] = y;
    }
    Fe(d) ? d !== -1 ? this.cache = new Hl(d) : this.cache = void 0 : this.cache = new Hl(Gx);
  }
  /**
   * @hidden
   * @param url - If provided, clears cache only for given url
   */
  static clearChainAndNodeCaches(t) {
    if (t) {
      delete st.inflightFetchChainAndNodeInfoRequests[t], delete st.chainInfoCache[t], delete st.nodeInfoCache[t], delete st.currentBlockHeightCache[t];
      return;
    }
    st.inflightFetchChainAndNodeInfoRequests = {}, st.nodeInfoCache = {}, st.chainInfoCache = {}, st.currentBlockHeightCache = {};
  }
  static extractOperationName(t) {
    var e;
    return (e = t == null ? void 0 : t.toString().match(/"operationName":"(.+)"/)) == null ? void 0 : e[1];
  }
  static isWriteOperation(t) {
    return Xx.includes(this.extractOperationName(t));
  }
  static normalizeUrl(t) {
    return t.replace(/-sub$/, "");
  }
  static hasWriteOperationHappened(t) {
    return Fe(st.currentBlockHeightCache[this.normalizeUrl(t)]);
  }
  /**
   * @hidden
   */
  static getFetchFn(t) {
    const { retryOptions: e, timeout: n, headers: s } = t;
    return gu(async (...i) => {
      const a = i[0], o = i[1], d = n ? AbortSignal.timeout(n) : void 0;
      let h = {
        ...o,
        signal: d,
        headers: { ...o == null ? void 0 : o.headers, ...s }
      };
      return t.requestMiddleware && (h = await t.requestMiddleware(h)), st.ENABLE_RPC_CONSISTENCY && st.hasWriteOperationHappened(a) && st.applyBlockHeight(h, a), st.fetchAndProcessBlockHeight(a, h, t);
    }, e);
  }
  static applyBlockHeight(t, e) {
    var i;
    const n = this.normalizeUrl(e), s = st.currentBlockHeightCache[n] ?? 0;
    t.body = (i = t.body) == null ? void 0 : i.toString().replace(/}$/, `,"extensions":{"required_fuel_block_height":${s}}}`);
  }
  static async fetchAndProcessBlockHeight(t, e, n) {
    const s = /* @__PURE__ */ T(() => n.fetch ? n.fetch(t, e, n) : fetch(t, e), "fetchFn");
    st.isWriteOperation(e.body) && !st.hasWriteOperationHappened(t) && (st.currentBlockHeightCache[st.normalizeUrl(t)] = 0);
    let a = await s();
    if (!st.ENABLE_RPC_CONSISTENCY)
      return a;
    const o = {
      maxRetries: 5,
      baseDelay: 500
    };
    for (let d = o.maxRetries; d > 0; --d) {
      const { extensions: h } = await Px({
        response: a,
        isSubscription: t.endsWith("-sub")
      });
      if (st.setCurrentBlockHeight(t, h == null ? void 0 : h.current_fuel_block_height), !(h != null && h.fuel_block_height_precondition_failed))
        break;
      const f = o.maxRetries - d + 1, g = fu(o, f);
      await Td(g), a = await s();
    }
    return a;
  }
  static setCurrentBlockHeight(t, e) {
    const n = st.hasWriteOperationHappened(t);
    if (!Fe(e) || !n)
      return;
    const s = st.normalizeUrl(t);
    e > st.currentBlockHeightCache[s] && (st.currentBlockHeightCache[s] = e);
  }
  static extractBasicAuth(t) {
    let e;
    try {
      e = new URL(t);
    } catch (a) {
      throw new B(B.CODES.INVALID_URL, "Invalid URL provided.", { url: t }, a);
    }
    const n = e.username, s = e.password, i = `${e.origin}${e.pathname}`;
    return n && s ? {
      url: t,
      urlWithoutAuth: i,
      headers: { Authorization: `Basic ${btoa(`${n}:${s}`)}` }
    } : { url: t, urlWithoutAuth: t, headers: void 0 };
  }
  /**
   * Initialize Provider async stuff
   */
  async init() {
    return await this.fetchChainAndNodeInfo(), this;
  }
  /**
   * Returns the `chainInfo` for the current network.
   *
   * @returns the chain information configuration.
   */
  async getChain() {
    return await this.init(), st.chainInfoCache[this.urlWithoutAuth];
  }
  /**
   * Returns the `nodeInfo` for the current network.
   *
   * @returns the node information configuration.
   */
  async getNode() {
    return await this.init(), st.nodeInfoCache[this.urlWithoutAuth];
  }
  /**
   * Returns some helpful parameters related to gas fees.
   */
  async getGasConfig() {
    await this.init();
    const {
      txParameters: { maxGasPerTx: t },
      predicateParameters: { maxGasPerPredicate: e },
      feeParameters: { gasPriceFactor: n, gasPerByte: s },
      gasCosts: i
    } = (await this.getChain()).consensusParameters;
    return {
      maxGasPerTx: t,
      maxGasPerPredicate: e,
      gasPriceFactor: n,
      gasPerByte: s,
      gasCosts: i
    };
  }
  /**
   * Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.
   *
   * @param url - The URL to connect to.
   * @param options - Additional options for the provider.
   */
  async connect(t, e) {
    const { url: n, urlWithoutAuth: s, headers: i } = st.extractBasicAuth(t);
    this.url = n, this.urlWithoutAuth = s, this.options = e ?? this.options, this.options = { ...this.options, headers: { ...this.options.headers, ...i } }, this.operations = this.createOperations(), await this.init();
  }
  /**
   * Return the chain and node information.
   * @param ignoreCache - If true, ignores the cache and re-fetch configs.
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo(t = !1) {
    const e = st.nodeInfoCache[this.urlWithoutAuth], n = st.chainInfoCache[this.urlWithoutAuth];
    if (e && n && !t)
      return { nodeInfo: e, chain: n };
    const i = st.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth];
    if (i)
      return i.then((o) => (this.consensusParametersTimestamp = o.consensusParametersTimestamp, {
        nodeInfo: st.nodeInfoCache[this.urlWithoutAuth],
        chain: st.chainInfoCache[this.urlWithoutAuth]
      }));
    const a = this.operations.getChainAndNodeInfo().then((o) => ({
      chain: _d(o.chain),
      nodeInfo: pd(o.nodeInfo),
      consensusParametersTimestamp: Date.now()
    })).then((o) => (st.setIncompatibleNodeVersionMessage(o.nodeInfo), st.chainInfoCache[this.urlWithoutAuth] = o.chain, st.nodeInfoCache[this.urlWithoutAuth] = o.nodeInfo, this.consensusParametersTimestamp = o.consensusParametersTimestamp, o)).catch((o) => {
      const d = new B(
        B.CODES.CONNECTION_REFUSED,
        "Unable to fetch chain and node info from the network",
        { url: this.urlWithoutAuth },
        o
      );
      throw d.cause = { code: "ECONNREFUSED" }, d;
    }).finally(() => {
      delete st.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth];
    });
    return st.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth] = a, st.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth].then((o) => (this.consensusParametersTimestamp = o.consensusParametersTimestamp, {
      nodeInfo: st.nodeInfoCache[this.urlWithoutAuth],
      chain: st.chainInfoCache[this.urlWithoutAuth]
    }));
  }
  /**
   * @hidden
   */
  static setIncompatibleNodeVersionMessage(t) {
    const { isMajorSupported: e, isMinorSupported: n, supportedVersion: s } = w_(t.nodeVersion);
    (!e || !n) && (st.incompatibleNodeVersionMessage = [
      `The Fuel Node that you are trying to connect to is using fuel-core version ${t.nodeVersion}.`,
      `The TS SDK currently supports fuel-core version ${s}.`,
      "Things may not work as expected."
    ].join(`
`), ld.incompatibleNodeVersionMessage = st.incompatibleNodeVersionMessage);
  }
  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   * @hidden
   */
  createOperations() {
    const t = st.getFetchFn(this.options), e = new bB(this.urlWithoutAuth, {
      fetch: /* @__PURE__ */ T((i, a) => t(i.toString(), a || {}, this.options), "fetch"),
      responseMiddleware: /* @__PURE__ */ T((i) => {
        if ("response" in i) {
          const a = i.response;
          Sf(
            a.errors,
            st.incompatibleNodeVersionMessage
          );
        }
      }, "responseMiddleware")
    }), n = /* @__PURE__ */ T((i, a) => {
      const o = i.definitions.find((h) => h.kind === "OperationDefinition");
      return (o == null ? void 0 : o.operation) === "subscription" ? ld.create({
        url: this.urlWithoutAuth,
        query: i,
        fetchFn: /* @__PURE__ */ T((h, f) => t(h, f, this.options), "fetchFn"),
        variables: a,
        operationName: o.name.value,
        onEvent: /* @__PURE__ */ T((h) => {
          var f;
          st.setCurrentBlockHeight(
            this.urlWithoutAuth,
            (f = h.extensions) == null ? void 0 : f.current_fuel_block_height
          );
        }, "onEvent")
      }) : e.request(i, a);
    }, "executeQuery"), s = /* @__PURE__ */ T((i) => ({
      getBlobs(a) {
        const o = a.blobIds.map((g, y) => `$blobId${y}: BlobId!`).join(", "), d = a.blobIds.map((g, y) => `blob${y}: blob(id: $blobId${y}) { id }`).join(`
`), h = a.blobIds.reduce(
          (g, y, R) => (g[`blobId${R}`] = y, g),
          {}
        ), f = q`
          query getBlobs(${o}) {
            ${d}
          }
        `;
        return i(f, h);
      }
    }), "customOperations");
    return { ...Rf(n), ...s(n) };
  }
  /**
   * Returns the version of the connected node.
   *
   * @returns A promise that resolves to the version string.
   */
  async getVersion() {
    const {
      nodeInfo: { nodeVersion: t }
    } = await this.operations.getVersion();
    return t;
  }
  /**
   * Returns the latest block number.
   *
   * @returns A promise that resolves to the latest block number.
   */
  async getBlockNumber() {
    const {
      chain: {
        latestBlock: { height: t }
      }
    } = await this.operations.getLatestBlockHeight();
    return E(t);
  }
  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
   */
  async fetchNode() {
    const { nodeInfo: t } = await this.operations.getNodeInfo(), e = pd(t);
    return st.nodeInfoCache[this.urlWithoutAuth] = e, e;
  }
  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain() {
    const { chain: t } = await this.operations.getChain(), e = _d(t);
    return st.chainInfoCache[this.urlWithoutAuth] = e, e;
  }
  /**
   * Returns the chain ID for the current provider network.
   *
   * @returns A promise that resolves to the chain ID number.
   */
  async getChainId() {
    const {
      consensusParameters: { chainId: t }
    } = await this.getChain();
    return t.toNumber();
  }
  /**
   * Returns the base asset ID for the current provider network.
   *
   * @returns the base asset ID.
   */
  async getBaseAssetId() {
    const t = await this.getChain(), {
      consensusParameters: { baseAssetId: e }
    } = t;
    return e;
  }
  /**
   * Retrieves the details of an asset given its ID.
   *
   * @param assetId - The unique identifier of the asset.
   * @returns A promise that resolves to an object containing the asset details.
   */
  async getAssetDetails(t) {
    const { assetMetadata: e } = await this.getNodeFeatures();
    if (!e)
      throw new B(
        L.UNSUPPORTED_FEATURE,
        "The current node does not supports fetching asset details"
      );
    const { assetDetails: n } = await this.operations.getAssetDetails({ assetId: t }), { contractId: s, subId: i, totalSupply: a } = n;
    return {
      subId: i,
      contractId: s,
      totalSupply: E(a)
    };
  }
  /**
   * @hidden
   */
  async validateTransaction(t) {
    const {
      consensusParameters: {
        txParameters: { maxInputs: e, maxOutputs: n }
      }
    } = await this.getChain();
    if (E(t.inputs.length).gt(e))
      throw new B(
        L.MAX_INPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of inputs. Tx inputs: ${t.inputs.length}, max inputs: ${e}`
      );
    if (E(t.outputs.length).gt(n))
      throw new B(
        L.MAX_OUTPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of outputs. Tx outputs: ${t.outputs.length}, max outputs: ${n}`
      );
  }
  /**
   * Submits a transaction to the chain to be executed.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param sendTransactionParams - The provider send transaction parameters (optional).
   * @returns A promise that resolves to the transaction response object.
   */
  async sendTransaction(t, {
    enableAssetBurn: e,
    estimateTxDependencies: n = !0,
    includePreConfirmation: s = !0
  } = {}) {
    const i = Te(t);
    kf(
      await this.getBaseAssetId(),
      i,
      e
    ), n && await this.estimateTxDependencies(i), await this.validateTransaction(i);
    const a = W(i.toTransactionBytes());
    let o;
    cn(i) && (o = i.abis);
    const d = await this.operations.submitAndAwaitStatus({
      encodedTransaction: a,
      includePreConfirmation: !0
    });
    an(this, po, bg).call(this, i.inputs, i.getTransactionId(await this.getChainId()));
    const h = await this.getChainId();
    return new yd(i, this, h, o, d);
  }
  /**
   * Executes a transaction without actually submitting it to the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param sendTransactionParams - The provider call parameters (optional).
   * @returns A promise that resolves to the call result object.
   */
  async dryRun(t, { utxoValidation: e, estimateTxDependencies: n = !0 } = {}) {
    const s = Te(t);
    if (n)
      return this.estimateTxDependencies(s);
    const i = W(s.toTransactionBytes()), { dryRun: a } = await this.operations.dryRun({
      encodedTransactions: i,
      utxoValidation: e || !1
    }), [{ receipts: o, status: d }] = a;
    return { receipts: o.map(Re), dryRunStatus: d };
  }
  /**
   * Estimates the gas usage for predicates in a transaction request.
   *
   * @template T - The type of the transaction request object.
   *
   * @param transactionRequest - The transaction request to estimate predicates for.
   * @returns A promise that resolves to the updated transaction request with estimated gas usage for predicates.
   */
  async estimatePredicates(t) {
    if (!t.inputs.some(
      (a) => Ul(a) && E(a.predicateGasUsed).isZero()
    ))
      return t;
    const n = W(t.toTransactionBytes()), s = await this.operations.estimatePredicates({
      encodedTransaction: n
    }), { estimatePredicates: i } = s;
    return t = this.parseEstimatePredicatesResponse(
      t,
      i
    ), t;
  }
  /**
   * Estimates the gas price and predicates for a given transaction request and block horizon.
   *
   * @param transactionRequest - The transaction request to estimate predicates and gas price for.
   * @param blockHorizon - The block horizon to use for gas price estimation.
   * @returns A promise that resolves to an object containing the updated transaction
   * request and the estimated gas price.
   */
  async estimatePredicatesAndGasPrice(t, e) {
    if (!t.inputs.some(
      (a) => Ul(a) && E(a.predicateGasUsed).isZero()
    )) {
      const a = await this.estimateGasPrice(e);
      return { transactionRequest: t, gasPrice: a };
    }
    const {
      estimateGasPrice: { gasPrice: s },
      estimatePredicates: i
    } = await this.operations.estimatePredicatesAndGasPrice({
      blockHorizon: String(e),
      encodedTransaction: W(t.toTransactionBytes())
    });
    return t = this.parseEstimatePredicatesResponse(
      t,
      i
    ), { transactionRequest: t, gasPrice: E(s) };
  }
  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @param gasPrice - The gas price to use for the transaction, if not provided it will be fetched.
   * @returns A promise that resolves to the estimate transaction dependencies.
   */
  async estimateTxDependencies(t, { gasPrice: e } = {}) {
    if (xx(t))
      return {
        rawReceipts: [],
        receipts: [],
        outputVariables: 0,
        missingContractIds: []
      };
    let n = [], s = [];
    const i = [];
    let a = 0, o;
    await this.validateTransaction(t);
    const d = e ?? await this.estimateGasPrice(10);
    for (let h = 0; h < Wl; h++) {
      const {
        dryRun: [{ receipts: f, status: g }]
      } = await this.operations.dryRun({
        encodedTransactions: [W(t.toTransactionBytes())],
        utxoValidation: !1,
        gasPrice: d.toString()
      });
      n = f, s = f.map(Re), o = g;
      const { missingOutputVariables: y, missingOutputContractIds: R } = kl(s);
      if ((y.length !== 0 || R.length !== 0) && cn(t)) {
        a += y.length, t.addVariableOutputs(y.length), R.forEach(({ contractId: N }) => {
          t.addContractInputAndOutput(new wt(N)), i.push(N);
        });
        const { maxFee: x } = await this.estimateTxGasAndFee({
          transactionRequest: t,
          gasPrice: d
        });
        t.maxFee = x;
      } else
        break;
    }
    return {
      rawReceipts: n,
      receipts: s,
      outputVariables: a,
      missingContractIds: i,
      dryRunStatus: o
    };
  }
  /**
   * Dry runs multiple transactions and checks for missing dependencies in batches.
   *
   * Transactions are dry run in batches. After each dry run, transactions requiring
   * further modifications are identified. The method iteratively updates these transactions
   * and performs subsequent dry runs until all dependencies for each transaction are satisfied.
   *
   * @param transactionRequests - Array of transaction request objects.
   * @returns A promise that resolves to an array of results for each transaction.
   */
  async estimateMultipleTxDependencies(t) {
    const e = t.map(() => ({
      rawReceipts: [],
      receipts: [],
      outputVariables: 0,
      missingContractIds: [],
      dryRunStatus: void 0
    })), n = Be(t), s = /* @__PURE__ */ new Map();
    n.forEach((o, d) => {
      cn(o) && s.set(d, W(o.toTransactionBytes()));
    });
    let i = Array.from(s.keys()), a = 0;
    for (; i.length > 0 && a < Wl; ) {
      const o = i.map(
        (f) => s.get(f)
      ), d = await this.operations.dryRun({
        encodedTransactions: o,
        utxoValidation: !1
      }), h = [];
      for (let f = 0; f < d.dryRun.length; f++) {
        const g = i[f], { receipts: y, status: R } = d.dryRun[f], Q = e[g];
        Q.receipts = y.map(Re), Q.dryRunStatus = R;
        const { missingOutputVariables: x, missingOutputContractIds: N } = kl(
          Q.receipts
        ), U = x.length > 0 || N.length > 0, H = n[g];
        if (U && cn(H)) {
          Q.outputVariables += x.length, H.addVariableOutputs(x.length), N.forEach(({ contractId: P }) => {
            H.addContractInputAndOutput(new wt(P)), Q.missingContractIds.push(P);
          });
          const { maxFee: X } = await this.estimateTxGasAndFee({
            transactionRequest: H
          });
          H.maxFee = X, s.set(g, W(H.toTransactionBytes())), h.push(g);
        }
      }
      i = h, a += 1;
    }
    return e;
  }
  /**
   * Dry runs multiple transactions.
   *
   * @param transactionRequests - Array of transaction request objects.
   * @param sendTransactionParams - The provider call parameters (optional).
   *
   * @returns A promise that resolves to an array of results for each transaction call.
   */
  async dryRunMultipleTransactions(t, { utxoValidation: e, estimateTxDependencies: n = !0 } = {}) {
    if (n)
      return this.estimateMultipleTxDependencies(t);
    const s = t.map((o) => W(o.toTransactionBytes())), { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: e || !1
    });
    return i.map(({ receipts: o, status: d }) => ({ receipts: o.map(Re), dryRunStatus: d }));
  }
  async autoRefetchConfigs() {
    var a;
    if (Date.now() - (this.consensusParametersTimestamp ?? 0) < 6e4)
      return;
    if (!((a = st.chainInfoCache) != null && a[this.urlWithoutAuth])) {
      await this.fetchChainAndNodeInfo(!0);
      return;
    }
    const n = st.chainInfoCache[this.urlWithoutAuth], {
      latestBlock: {
        header: { consensusParametersVersion: s }
      }
    } = n, {
      chain: {
        latestBlock: {
          header: { consensusParametersVersion: i }
        }
      }
    } = await this.operations.getConsensusParametersVersion();
    s !== i && await this.fetchChainAndNodeInfo(!0);
  }
  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param params - The parameters for estimating the transaction gas and fee.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(t) {
    const { transactionRequest: e, gasPrice: n } = t;
    let s = n;
    await this.autoRefetchConfigs();
    const i = await this.getChain(), { gasPriceFactor: a, maxGasPerTx: o } = await this.getGasConfig(), d = e.calculateMinGas(i);
    Fe(s) || (s = await this.estimateGasPrice(10));
    const h = Bi({
      gasPrice: E(s),
      gas: d,
      priceFactor: a,
      tip: e.tip
    }).add(1);
    let f = E(0);
    cn(e) && (f = e.gasLimit, e.gasLimit.eq(0) && (e.gasLimit = d, e.gasLimit = o.sub(
      e.calculateMaxGas(i, d)
    ), f = e.gasLimit));
    const g = e.calculateMaxGas(i, d), y = Bi({
      gasPrice: E(s),
      gas: g,
      priceFactor: a,
      tip: e.tip
    }).add(1);
    return {
      minGas: d,
      minFee: h,
      maxGas: g,
      maxFee: y,
      gasPrice: s,
      gasLimit: f
    };
  }
  /**
   * Executes a signed transaction without applying the states changes
   * on the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added
   *
   * @param transactionRequestLike - The transaction request object.
   * @param estimateTxParams - The estimate transaction params (optional).
   * @returns A promise that resolves to the call result object.
   */
  async simulate(t, { estimateTxDependencies: e = !0 } = {}) {
    const n = Te(t);
    if (e)
      return this.estimateTxDependencies(n);
    const s = [W(n.toTransactionBytes())], { dryRun: i } = await this.operations.dryRun({
      encodedTransactions: s,
      utxoValidation: !0
    });
    return { receipts: i.map((o) => {
      const { id: d, receipts: h, status: f } = o, g = h.map(Re);
      return { id: d, receipts: g, status: f };
    })[0].receipts };
  }
  /**
   * @hidden
   *
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the transaction.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param transactionCostParams - The transaction cost parameters (optional).
   *
   * @returns A promise that resolves to the transaction cost object.
   *
   * @deprecated Use provider.assembleTx instead
   * Check the migration guide https://docs.fuel.network/docs/fuels-ts/transactions/assemble-tx-migration-guide/ for more information.
   */
  async getTransactionCost(t, { signatureCallback: e, gasPrice: n } = {}) {
    const s = Be(Te(t)), i = s.maxFee.eq(0), a = cn(s);
    a && (s.gasLimit = E(0));
    const o = Be(s);
    let d = 0;
    if (e && cn(o)) {
      const O = o.witnesses.length;
      await e(o), d = o.witnesses.length - O;
    }
    let h;
    n ? (h = n, await this.estimatePredicates(o)) : { gasPrice: h } = await this.estimatePredicatesAndGasPrice(o, 10), s.updatePredicateGasUsed(o.inputs);
    let { maxFee: f, maxGas: g, minFee: y, minGas: R, gasLimit: Q } = await this.estimateTxGasAndFee({
      // Fetches and returns a gas price
      transactionRequest: o,
      gasPrice: h
    }), x = [], N = [], U, H = [], X = 0, P = E(0);
    if (s.maxFee = f, a) {
      if (s.gasLimit = Q, e && await e(s), { rawReceipts: x, receipts: N, missingContractIds: H, outputVariables: X, dryRunStatus: U } = await this.estimateTxDependencies(s, { gasPrice: h }), U && "reason" in U)
        throw this.extractDryRunError(s, N, U.reason);
      const { maxGasPerTx: O } = await this.getGasConfig(), k = Di(N);
      P = E(k.muln(zx)).max(O.sub(R)), s.gasLimit = P, { maxFee: f, maxGas: g, minFee: y, minGas: R } = await this.estimateTxGasAndFee({
        transactionRequest: s,
        gasPrice: h
      });
    }
    const M = {
      gasPrice: h.toString(),
      receipts: x
    };
    return {
      rawReceipts: x,
      receipts: N,
      gasUsed: P,
      gasPrice: h,
      minGas: R,
      maxGas: g,
      minFee: y,
      maxFee: f,
      outputVariables: X,
      missingContractIds: H,
      addedSignatures: d,
      estimatedPredicates: s.inputs,
      dryRunStatus: U,
      updateMaxFee: i,
      transactionSummary: M
    };
  }
  /**
   * Assembles a transaction by completely estimating and funding it.
   *
   * @param params - Parameters used to assemble the transaction.
   *
   * @returns The assembled transaction request, estimated gas price, and receipts
   */
  async assembleTx(t) {
    var P, M, O;
    const {
      request: e,
      reserveGas: n,
      resourcesIdsToIgnore: s,
      feePayerAccount: i,
      blockHorizon: a = 10,
      estimatePredicates: o = !0,
      accountCoinQuantities: d = []
    } = t, h = /* @__PURE__ */ new Set(), f = await this.getBaseAssetId();
    let g = -1, y;
    const R = d.map((k, G) => {
      const { amount: z, assetId: j, account: Z = i, changeOutputAccount: $ } = k, v = $ ? $.address.toB256() : Z.address.toB256();
      h.add(Z.address.toB256());
      const u = {
        change: v
      };
      return j === f && (y = u.change), Z.address.equals(i.address) && (g = G), {
        account: Ml(Z),
        amount: E(z).toString(10),
        assetId: j,
        changePolicy: u
      };
    });
    g === -1 && (h.add(i.address.toB256()), g = R.push({
      account: Ml(i),
      amount: E(0).toString(10),
      // Since the correct fee amount cannot be determined yet, we can use 0
      assetId: f,
      changePolicy: {
        change: y || i.address.toB256()
      }
    }) - 1);
    const Q = await this.adjustResourcesToIgnoreForAddresses(
      Array.from(h),
      s
    ), {
      assembleTx: { status: x, transaction: N, gasPrice: U }
    } = await this.operations.assembleTx({
      tx: W(e.toTransactionBytes()),
      blockHorizon: String(a),
      feeAddressIndex: String(g),
      requiredBalances: R,
      estimatePredicates: o,
      excludeInput: Q,
      reserveGas: n ? E(n).toString(10) : void 0
    });
    if (x.type === "DryRunFailureStatus") {
      const k = x.receipts.map(Re);
      throw this.extractDryRunError(e, k, x.reason);
    }
    e.witnesses = N.witnesses || e.witnesses, e.inputs = ((P = N.inputs) == null ? void 0 : P.map(hx)) || e.inputs, e.outputs = ((M = N.outputs) == null ? void 0 : M.map(Ax)) || e.outputs, (O = N.policies) != null && O.maxFee && (e.maxFee = E(N.policies.maxFee)), e.type === Ct.Script && (e.gasLimit = E(N.scriptGasLimit).add(E(n)));
    const H = x.receipts, X = await this.getChainId();
    return e.updateState(X, "funded", {
      gasPrice: U.toString(),
      receipts: H
    }), {
      assembledRequest: e,
      gasPrice: E(U),
      receipts: x.receipts.map(Re),
      rawReceipts: H
    };
  }
  /**
   * Returns coins for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get (optional).
   * @param paginationArgs - Pagination arguments (optional).
   *
   * @returns A promise that resolves to the coins.
   */
  async getCoins(t, e, n) {
    const s = new wt(t), {
      coins: { edges: i, pageInfo: a }
    } = await this.operations.getCoins({
      ...Jn({
        paginationLimit: Yl,
        inputArgs: n
      }),
      filter: { owner: s.toB256(), assetId: e && W(e) }
    });
    return {
      coins: i.map(({ node: d }) => ({
        id: d.utxoId,
        assetId: d.assetId,
        amount: E(d.amount),
        owner: s,
        blockCreated: E(d.blockCreated),
        txCreatedIdx: E(d.txCreatedIdx)
      })),
      pageInfo: a
    };
  }
  /**
   * Returns resources for the given owner satisfying the spend query.
   *
   * @param owner - The address to get resources for.
   * @param quantities - The coin quantities to get.
   * @param resourcesIdsToIgnore - IDs of excluded resources from the selection (optional).
   * @returns A promise that resolves to the resources.
   */
  async getResourcesToSpend(t, e, n) {
    const s = new wt(t), i = await this.adjustResourcesToIgnoreForAddresses(
      [s.b256Address],
      n
    ), a = {
      owner: s.toB256(),
      queryPerAsset: e.map(tu).map(({ assetId: h, amount: f, max: g }) => ({
        assetId: W(h),
        amount: (f.eqn(0) ? E(1) : f).toString(10),
        max: g ? g.toString(10) : void 0
      })),
      excludedIds: i
    };
    return (await this.operations.getCoinsToSpend(a)).coinsToSpend.flat().map((h) => {
      switch (h.type) {
        case "MessageCoin":
          return {
            amount: E(h.amount),
            assetId: h.assetId,
            daHeight: E(h.daHeight),
            sender: new wt(h.sender),
            recipient: new wt(h.recipient),
            nonce: h.nonce
          };
        case "Coin":
          return {
            id: h.utxoId,
            amount: E(h.amount),
            assetId: h.assetId,
            owner: s,
            blockCreated: E(h.blockCreated),
            txCreatedIdx: E(h.txCreatedIdx)
          };
        default:
          return null;
      }
    }).filter((h) => !!h);
  }
  /**
   * Returns an array of blobIds that exist on chain, for a given array of blobIds.
   *
   * @param blobIds - blobIds to check.
   * @returns - A promise that resolves to an array of blobIds that exist on chain.
   */
  async getBlobs(t) {
    const e = await this.operations.getBlobs({ blobIds: t }), n = [];
    return Object.keys(e).forEach((s) => {
      const i = e[s];
      n.push((i == null ? void 0 : i.id) ?? null);
    }), n.filter((s) => s);
  }
  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block or null.
   */
  async getBlock(t) {
    let e;
    if (t === "latest") {
      const {
        chain: { latestBlock: o }
      } = await this.operations.getLatestBlock();
      e = o;
    } else {
      const d = typeof t == "string" && Ln(t) ? { blockId: t } : { height: E(t).toString(10) };
      e = (await this.operations.getBlock(d)).block;
    }
    if (!e)
      return null;
    const { header: n, height: s, id: i, transactions: a } = e;
    return {
      id: i,
      height: E(s),
      time: n.time,
      header: {
        applicationHash: n.applicationHash,
        daHeight: E(n.daHeight),
        eventInboxRoot: n.eventInboxRoot,
        messageOutboxRoot: n.messageOutboxRoot,
        prevRoot: n.prevRoot,
        stateTransitionBytecodeVersion: n.stateTransitionBytecodeVersion,
        transactionsCount: n.transactionsCount,
        transactionsRoot: n.transactionsRoot
      },
      transactionIds: a.map((o) => o.id)
    };
  }
  /**
   * Returns all the blocks matching the given parameters.
   *
   * @param params - The parameters to query blocks.
   * @returns A promise that resolves to the blocks.
   */
  async getBlocks(t) {
    const {
      blocks: { edges: e, pageInfo: n }
    } = await this.operations.getBlocks({
      ...Jn({
        paginationLimit: Ux,
        inputArgs: t
      })
    });
    return { blocks: e.map(({ node: i }) => ({
      id: i.id,
      height: E(i.height),
      time: i.header.time,
      header: {
        applicationHash: i.header.applicationHash,
        daHeight: E(i.header.daHeight),
        eventInboxRoot: i.header.eventInboxRoot,
        messageOutboxRoot: i.header.messageOutboxRoot,
        prevRoot: i.header.prevRoot,
        stateTransitionBytecodeVersion: i.header.stateTransitionBytecodeVersion,
        transactionsCount: i.header.transactionsCount,
        transactionsRoot: i.header.transactionsRoot
      },
      transactionIds: i.transactions.map((a) => a.id)
    })), pageInfo: n };
  }
  /**
   * Returns block matching the given ID or type, including transaction data.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlockWithTransactions(t) {
    let e;
    typeof t == "number" ? e = { blockHeight: E(t).toString(10) } : t === "latest" ? e = { blockHeight: (await this.getBlockNumber()).toString() } : typeof t == "string" && Ln(t) ? e = { blockId: t } : e = { blockHeight: E(t).toString() };
    const { block: n } = await this.operations.getBlockWithTransactions(e);
    return n ? {
      id: n.id,
      height: E(n.height, 10),
      time: n.header.time,
      header: {
        applicationHash: n.header.applicationHash,
        daHeight: E(n.header.daHeight),
        eventInboxRoot: n.header.eventInboxRoot,
        messageOutboxRoot: n.header.messageOutboxRoot,
        prevRoot: n.header.prevRoot,
        stateTransitionBytecodeVersion: n.header.stateTransitionBytecodeVersion,
        transactionsCount: n.header.transactionsCount,
        transactionsRoot: n.header.transactionsRoot
      },
      transactionIds: n.transactions.map((s) => s.id),
      transactions: n.transactions.map(
        (s) => {
          var i;
          return (i = new lr().decode(J(s.rawPayload), 0)) == null ? void 0 : i[0];
        }
      )
    } : null;
  }
  /**
   * Get transaction with the given ID.
   *
   * @param transactionId - ID of the transaction.
   * @returns A promise that resolves to the transaction.
   */
  async getTransaction(t) {
    var n;
    const { transaction: e } = await this.operations.getTransaction({ transactionId: t });
    if (!e)
      return null;
    try {
      return (n = new lr().decode(
        J(e.rawPayload),
        0
      )) == null ? void 0 : n[0];
    } catch (s) {
      if (s instanceof B && s.code === L.UNSUPPORTED_TRANSACTION_TYPE)
        return console.warn("Unsupported transaction type encountered"), null;
      throw s;
    }
  }
  /**
   * Retrieves transactions based on the provided pagination arguments.
   * @param paginationArgs - The pagination arguments for retrieving transactions.
   * @returns A promise that resolves to an object containing the retrieved transactions and pagination information.
   */
  async getTransactions(t) {
    const {
      transactions: { edges: e, pageInfo: n }
    } = await this.operations.getTransactions({
      ...Jn({
        inputArgs: t,
        paginationLimit: yg
      })
    }), s = new lr();
    return { transactions: e.map(({ node: { rawPayload: a } }) => {
      try {
        return s.decode(J(a), 0)[0];
      } catch (o) {
        if (o instanceof B && o.code === L.UNSUPPORTED_TRANSACTION_TYPE)
          return console.warn("Unsupported transaction type encountered"), null;
        throw o;
      }
    }).filter((a) => a !== null), pageInfo: n };
  }
  /**
   * Fetches a compressed block at the specified height.
   *
   * @param height - The height of the block to fetch.
   * @returns The compressed block if available, otherwise `null`.
   */
  async daCompressedBlock(t) {
    const { daCompressedBlock: e } = await this.operations.daCompressedBlock({
      height: t
    });
    return e || null;
  }
  /**
   * Get deployed contract with the given ID.
   *
   * @param contractId - ID of the contract.
   * @returns A promise that resolves to the contract.
   */
  async getContract(t) {
    const { contract: e } = await this.operations.getContract({ contractId: t });
    return e || null;
  }
  /**
   * Returns the balance for the given contract for the given asset ID.
   *
   * @param contractId - The contract ID to get the balance for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getContractBalance(t, e) {
    const { contractBalance: n } = await this.operations.getContractBalance({
      contract: new wt(t).toB256(),
      asset: W(e)
    });
    return E(n.amount, 10);
  }
  /**
   * Returns the balance for the given owner for the given asset ID.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getBalance(t, e) {
    const { balance: n } = await this.operations.getBalanceV2({
      owner: new wt(t).toB256(),
      assetId: W(e)
    });
    return E(n.amountU128, 10);
  }
  /**
   * Returns balances for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the balances.
   */
  async getBalances(t, e) {
    let n = { first: kx };
    const { balancesPagination: s } = await this.getNodeFeatures();
    s && (n = Jn({
      inputArgs: e,
      paginationLimit: Lx
    }));
    const {
      balances: { edges: i, pageInfo: a }
    } = await this.operations.getBalancesV2({
      ...n,
      filter: { owner: new wt(t).toB256() },
      supportsPagination: s
    });
    return {
      balances: i.map(({ node: d }) => ({
        assetId: d.assetId,
        amount: E(d.amountU128)
      })),
      ...s ? { pageInfo: a } : {}
    };
  }
  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the messages.
   */
  async getMessages(t, e) {
    const {
      messages: { edges: n, pageInfo: s }
    } = await this.operations.getMessages({
      ...Jn({
        inputArgs: e,
        paginationLimit: Yl
      }),
      owner: new wt(t).toB256()
    });
    return {
      messages: n.map(({ node: a }) => ({
        messageId: gn.getMessageId({
          sender: a.sender,
          recipient: a.recipient,
          nonce: a.nonce,
          amount: E(a.amount),
          data: a.data
        }),
        sender: new wt(a.sender),
        recipient: new wt(a.recipient),
        nonce: a.nonce,
        amount: E(a.amount),
        data: gn.decodeData(a.data),
        daHeight: E(a.daHeight)
      })),
      pageInfo: s
    };
  }
  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param transactionId - The transaction to get message from.
   * @param messageId - The message id from MessageOut receipt.
   * @param commitBlockId - The commit block id (optional).
   * @param commitBlockHeight - The commit block height (optional).
   * @returns A promise that resolves to the message proof.
   */
  async getMessageProof(t, e, n, s) {
    let i = {
      transactionId: t,
      nonce: e
    };
    if (n && s)
      throw new B(
        L.INVALID_INPUT_PARAMETERS,
        "commitBlockId and commitBlockHeight cannot be used together"
      );
    n && (i = {
      ...i,
      commitBlockId: n
    }), s && (i = {
      ...i,
      // Convert BN into a number string required on the query
      // This should probably be fixed on the fuel client side
      commitBlockHeight: s.toNumber().toString()
    });
    const a = await this.operations.getMessageProof(i), {
      messageProof: o,
      messageBlockHeader: d,
      commitBlockHeader: h,
      blockProof: f,
      sender: g,
      recipient: y,
      amount: R,
      data: Q
    } = a.messageProof;
    return {
      messageProof: {
        proofIndex: E(o.proofIndex),
        proofSet: o.proofSet
      },
      blockProof: {
        proofIndex: E(f.proofIndex),
        proofSet: f.proofSet
      },
      messageBlockHeader: {
        id: d.id,
        daHeight: E(d.daHeight),
        transactionsCount: Number(d.transactionsCount),
        transactionsRoot: d.transactionsRoot,
        height: E(d.height),
        prevRoot: d.prevRoot,
        time: d.time,
        applicationHash: d.applicationHash,
        messageReceiptCount: Number(d.messageReceiptCount),
        messageOutboxRoot: d.messageOutboxRoot,
        consensusParametersVersion: Number(d.consensusParametersVersion),
        eventInboxRoot: d.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(d.stateTransitionBytecodeVersion)
      },
      commitBlockHeader: {
        id: h.id,
        daHeight: E(h.daHeight),
        transactionsCount: Number(h.transactionsCount),
        transactionsRoot: h.transactionsRoot,
        height: E(h.height),
        prevRoot: h.prevRoot,
        time: h.time,
        applicationHash: h.applicationHash,
        messageReceiptCount: Number(h.messageReceiptCount),
        messageOutboxRoot: h.messageOutboxRoot,
        consensusParametersVersion: Number(h.consensusParametersVersion),
        eventInboxRoot: h.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(h.stateTransitionBytecodeVersion)
      },
      sender: new wt(g),
      recipient: new wt(y),
      nonce: e,
      amount: E(R),
      data: Q
    };
  }
  /**
   * Get the latest gas price from the node.
   *
   * @returns A promise that resolves to the latest gas price.
   */
  async getLatestGasPrice() {
    const { latestGasPrice: t } = await this.operations.getLatestGasPrice();
    return E(t.gasPrice);
  }
  /**
   * Returns the estimate gas price for the given block horizon.
   *
   * @param blockHorizon - The block horizon to estimate gas price for.
   * @returns A promise that resolves to the estimated gas price.
   */
  async estimateGasPrice(t) {
    const { estimateGasPrice: e } = await this.operations.estimateGasPrice({
      blockHorizon: String(t)
    });
    return E(e.gasPrice);
  }
  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param nonce - The nonce of the message to get status from.
   * @returns A promise that resolves to the message status
   */
  async getMessageStatus(t) {
    return (await this.operations.getMessageStatus({ nonce: t })).messageStatus;
  }
  /**
   * Lets you produce blocks with custom timestamps and the block number of the last block produced.
   *
   * @param amount - The amount of blocks to produce.
   * @param startTime - The UNIX timestamp (milliseconds) to set for the first produced block (optional).
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(t, e) {
    const { produceBlocks: n } = await this.operations.produceBlocks({
      blocksToProduce: E(t).toString(10),
      startTimestamp: e ? Q_.fromUnixMilliseconds(e).toTai64() : void 0
    });
    return E(n);
  }
  /**
   * Check if the given ID is an account.
   *
   * @param id - The ID to check.
   * @returns A promise that resolves to the result of the check.
   */
  async isUserAccount(t) {
    return await this.getAddressType(t) === "Account";
  }
  /**
   * Determines the type of address based on the provided ID.
   *
   * @param id - The ID to be checked.
   * @returns A promise that resolves to a string indicating the type of address.
   */
  async getAddressType(t) {
    const { contract: e, blob: n, transaction: s } = await this.operations.isUserAccount({
      blobId: t,
      contractId: t,
      transactionId: t
    });
    if (e)
      return "Contract";
    if (n)
      return "Blob";
    if (s)
      return "Transaction";
    try {
      if (await this.getAssetDetails(t))
        return "Asset";
    } catch {
    }
    return "Account";
  }
  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  async getTransactionResponse(t) {
    const e = await this.getChainId();
    return new yd(t, this, e);
  }
  /**
   * Returns Message for given nonce.
   *
   * @param nonce - The nonce of the message to retrieve.
   * @returns A promise that resolves to the Message object or null.
   */
  async getMessageByNonce(t) {
    const { message: e } = await this.operations.getMessageByNonce({ nonce: t });
    return e ? {
      messageId: gn.getMessageId({
        sender: e.sender,
        recipient: e.recipient,
        nonce: t,
        amount: E(e.amount),
        data: e.data
      }),
      sender: new wt(e.sender),
      recipient: new wt(e.recipient),
      nonce: t,
      amount: E(e.amount),
      data: gn.decodeData(e.data),
      daHeight: E(e.daHeight)
    } : null;
  }
  /**
   * Get the relayed transaction for the given transaction ID.
   *
   * @param relayedTransactionId - The relayed transaction ID to get the response for.
   * @returns A promise that resolves to the relayed transaction.
   */
  async getRelayedTransactionStatus(t) {
    const { relayedTransactionStatus: e } = await this.operations.getRelayedTransactionStatus({
      relayedTransactionId: t
    });
    return e || null;
  }
  /**
   * @hidden
   */
  extractDryRunError(t, e, n) {
    let s = [], i = {};
    return t.type === Ct.Script && t.abis && ({ logs: s, groupedLogs: i } = ra({
      receipts: e,
      mainAbi: t.abis.main,
      externalAbis: t.abis.otherContractsAbis
    })), ou({
      logs: s,
      groupedLogs: i,
      receipts: e,
      statusReason: n
    });
  }
  /**
   * @hidden
   */
  async getNodeFeatures() {
    const { indexation: t } = await this.getNode();
    return {
      assetMetadata: !!(t != null && t.assetMetadata),
      balancesPagination: !!(t != null && t.balances),
      coinsToSpend: !!(t != null && t.coinsToSpend)
    };
  }
  /**
   * @hidden
   */
  parseEstimatePredicatesResponse(t, { inputs: e }) {
    return e && e.forEach((n, s) => {
      n && "predicateGasUsed" in n && E(n.predicateGasUsed).gt(0) && (t.inputs[s].predicateGasUsed = n.predicateGasUsed);
    }), t;
  }
  /**
   * @hidden
   *
   * This helper adjusts the resources to be excluded for a given set of addresses.
   * Supporting multiple addresses is important because of the `assembleTx` method,
   * which may be invoked with different addresses. It handles both messages and UTXOs,
   * ensuring the total number of inputs does not exceed the maximum allowed by the chain's
   * consensus parameters. The resources specified in the `resourcesIdsToIgnore` parameter have priority
   * over those retrieved from the cache.
   */
  async adjustResourcesToIgnoreForAddresses(t, e) {
    var s, i;
    const n = {
      messages: ((s = e == null ? void 0 : e.messages) == null ? void 0 : s.map((a) => W(a))) || [],
      utxos: ((i = e == null ? void 0 : e.utxos) == null ? void 0 : i.map((a) => W(a))) || []
    };
    if (this.cache) {
      const a = this.cache, o = t.map((f) => a.getActiveData(f)), {
        consensusParameters: {
          txParameters: { maxInputs: d }
        }
      } = await this.getChain(), h = d.toNumber();
      for (let f = 0; f < o.length; f++) {
        let g = n.utxos.length + n.messages.length;
        if (g >= h || (n.utxos = [...n.utxos, ...o[f].utxos.slice(0, h - g)], g = n.utxos.length + n.messages.length, g >= h))
          break;
        n.messages = [...n.messages, ...o[f].messages.slice(0, h - g)];
      }
    }
    return n;
  }
}, po = new WeakSet(), /**
 * @hidden
 */
bg = function(t, e) {
  this.cache && this.cache.set(e, t);
}, T(st, "Provider"), /**
 * Governs whether to include the required block height in the request body
 * for block-sensitive operations like when submitting a transaction.
 *
 * This ensures that the operation is executed at the correct block height,
 * regardless of which node in the network the request is routed to.
 *
 * `true` by default.
 */
D(st, "ENABLE_RPC_CONSISTENCY", !0), /** @hidden */
D(st, "inflightFetchChainAndNodeInfoRequests", {}), /** @hidden */
D(st, "chainInfoCache", {}), /** @hidden */
D(st, "nodeInfoCache", {}), /** @hidden */
D(st, "currentBlockHeightCache", {}), /** @hidden */
D(st, "incompatibleNodeVersionMessage", ""), st);
async function Hx(r) {
  const { id: t, provider: e, abiMap: n } = r, { transaction: s } = await e.operations.getTransactionWithReceipts({
    transactionId: t
  });
  if (!s)
    throw new B(
      L.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${t}.`
    );
  const [i] = new lr().decode(
    J(s.rawPayload),
    0
  );
  let a = [];
  s != null && s.status && "receipts" in s.status && (a = s.status.receipts);
  const o = a.map(Re), {
    consensusParameters: {
      feeParameters: { gasPerByte: d, gasPriceFactor: h },
      txParameters: { maxInputs: f, maxGasPerTx: g },
      gasCosts: y
    }
  } = await e.getChain(), Q = gg(s.status) ? E(0) : await e.getLatestGasPrice(), x = await e.getBaseAssetId();
  return {
    ...Oi({
      id: s.id,
      receipts: o,
      transaction: i,
      transactionBytes: J(s.rawPayload),
      gqlTransactionStatus: s.status,
      gasPerByte: E(d),
      gasPriceFactor: E(h),
      abiMap: n,
      maxInputs: f,
      gasCosts: y,
      maxGasPerTx: g,
      gasPrice: Q,
      baseAssetId: x
    })
  };
}
T(Hx, "getTransactionSummary");
async function Vx(r) {
  const { provider: t, transactionRequest: e, abiMap: n } = r, { receipts: s } = await t.dryRun(e), { gasPerByte: i, gasPriceFactor: a, gasCosts: o, maxGasPerTx: d } = await t.getGasConfig(), h = (await t.getChain()).consensusParameters.txParameters.maxInputs, f = e.toTransaction(), g = e.toTransactionBytes(), y = await t.getLatestGasPrice(), R = await t.getBaseAssetId();
  return Oi({
    id: e.getTransactionId(await t.getChainId()),
    receipts: s,
    transaction: f,
    transactionBytes: g,
    abiMap: n,
    gasPerByte: i,
    gasPriceFactor: a,
    maxInputs: h,
    gasCosts: o,
    maxGasPerTx: d,
    gasPrice: y,
    baseAssetId: R
  });
}
T(Vx, "getTransactionSummaryFromRequest");
async function Wx(r) {
  const { filters: t, provider: e, abiMap: n } = r, { owner: s, ...i } = t, a = Jn({
    inputArgs: i,
    paginationLimit: yg
  }), { transactionsByOwner: o } = await e.operations.getTransactionsByOwner({
    ...a,
    owner: s
  }), { edges: d, pageInfo: h } = o, {
    consensusParameters: {
      feeParameters: { gasPerByte: f, gasPriceFactor: g },
      txParameters: { maxInputs: y, maxGasPerTx: R },
      gasCosts: Q
    }
  } = await e.getChain(), x = await e.getLatestGasPrice(), N = await e.getBaseAssetId();
  return {
    transactions: d.map((H) => {
      const { node: X } = H, { id: P, rawPayload: M, status: O } = X, [k] = new lr().decode(J(M), 0);
      let G = [];
      X != null && X.status && "receipts" in X.status && (G = X.status.receipts);
      const z = G.map(Re);
      return {
        ...Oi({
          id: P,
          receipts: z,
          transaction: k,
          transactionBytes: J(M),
          gqlTransactionStatus: O,
          abiMap: n,
          gasPerByte: f,
          gasPriceFactor: g,
          maxInputs: y,
          gasCosts: Q,
          maxGasPerTx: R,
          gasPrice: x,
          baseAssetId: N
        })
      };
    }),
    pageInfo: h
  };
}
T(Wx, "getTransactionsSummaries");
var NR = /* @__PURE__ */ T(async (r) => {
  const { provider: t, transactionSummary: e } = r, { id: n, transactionBytes: s, gasPrice: i, receipts: a } = e, {
    consensusParameters: {
      baseAssetId: o,
      txParameters: { maxInputs: d, maxGasPerTx: h },
      feeParameters: { gasPriceFactor: f, gasPerByte: g },
      gasCosts: y
    }
  } = await t.getChain(), R = J(s), [Q] = new lr().decode(R, 0);
  return Oi({
    id: n,
    transaction: Q,
    transactionBytes: R,
    receipts: a.map(Re),
    gasPrice: E(i),
    // From chain
    baseAssetId: o,
    maxInputs: d,
    gasCosts: y,
    maxGasPerTx: h,
    gasPerByte: g,
    gasPriceFactor: f
  });
}, "assembleTransactionSummaryFromJson"), DR = /* @__PURE__ */ T(async (r) => {
  const { id: t, status: e, abis: n, request: s, provider: i, gqlTransaction: a, preConfirmationStatus: o } = r;
  return {
    id: t,
    status: e,
    abis: n,
    requestJson: s ? JSON.stringify(s.toJSON()) : void 0,
    providerUrl: i.url,
    providerCache: await Tf(i),
    gqlTransaction: a,
    preConfirmationStatus: o
  };
}, "serializeTransactionResponseJson"), FR = /* @__PURE__ */ T((r) => {
  const {
    id: t,
    abis: e,
    status: n,
    providerUrl: s,
    requestJson: i,
    providerCache: a,
    gqlTransaction: o,
    preConfirmationStatus: d
  } = r, h = new bd(s, { cache: a }), { chainId: f } = a.chain.consensusParameters, g = new yd(t, h, Number(f), e);
  return i && (g.request = Te(JSON.parse(i))), g.status = n, g.gqlTransaction = o, g.preConfirmationStatus = d, g;
}, "deserializeTransactionResponseJson"), ri, Yx = (ri = class {
}, T(ri, "AbstractAccount"), ri), jx = /* @__PURE__ */ T((r) => {
  const t = new rt("u64");
  return r.reduce((e, n) => {
    const { assetId: s, amount: i, contractId: a } = n, o = t.encode(i), d = ct([new wt(a).toBytes(), o, J(s)]);
    return ct([e, d]);
  }, new Uint8Array());
}, "formatTransferToContractScriptData"), Zx = /* @__PURE__ */ T(async (r) => {
  const t = jx(r);
  await fo();
  let e = new Uint8Array();
  return r.forEach((n, s) => {
    const i = (ed + At + Ki) * s;
    e = ct([
      e,
      // Load ScriptData into register 0x10.
      c_(16, 0, u_.ScriptData).to_bytes(),
      // Add the offset to 0x10 so it will point to the current contract ID, store in 0x11.
      mr(17, 16, i).to_bytes(),
      // Add CONTRACT_ID_LEN to 0x11 to point to the amount in the ScriptData, store in 0x12.
      mr(18, 17, ed).to_bytes(),
      // Load word to the amount at 0x12 into register 0x13.
      qi(19, 18, 0).to_bytes(),
      // Add WORD_SIZE to 0x12 to point to the asset ID in the ScriptData, store in 0x14.
      mr(20, 18, At).to_bytes(),
      // Perform the transfer using contract ID in 0x11, amount in 0x13, and asset ID in 0x14.
      a_(17, 19, 20).to_bytes()
    ]);
  }), e = ct([e, vd(1).to_bytes()]), { script: e, scriptData: t };
}, "assembleTransferToContractScript"), Jx = /* @__PURE__ */ T((r, t) => {
  const e = Math.ceil(r.length / t), n = [];
  for (let s = 0; s < e; s += 1) {
    const i = s * t, a = (s + 1) * t;
    n.push(r.slice(i, a));
  }
  return n;
}, "splitCoinsIntoBatches"), qx = 5, ni, Vo = (ni = class extends Yx {
  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   * @param connector - A FuelConnector instance (optional).
   */
  constructor(e, n, s) {
    super();
    /**
     * The address associated with the account.
     */
    D(this, "address");
    /**
     * The provider used to interact with the network.
     */
    D(this, "_provider");
    /**
     * The connector for use with external wallets
     */
    D(this, "_connector");
    /**
     * Prepares a function to submit all transactions either sequentially or in parallel.
     *
     * @param params - The parameters for preparing the submitAll callback.
     *
     * @returns A callback that, when called, submits all transactions and returns their results and any errors encountered.
     */
    D(this, "prepareSubmitAll", /* @__PURE__ */ T((e) => {
      const { txs: n, mode: s = "sequential" } = e;
      return async () => {
        const i = [], a = [];
        if (s === "sequential")
          for (const o of n)
            try {
              const h = await (await this.sendTransaction(o)).waitForResult();
              i.push(h);
            } catch (d) {
              a.push(d);
            }
        else
          (await Promise.allSettled(
            n.map(async (d) => (await this.sendTransaction(d)).waitForResult())
          )).forEach((d) => {
            d.status === "fulfilled" ? i.push(d.value) : a.push(d.reason);
          });
        return { txResponses: i, errors: a };
      };
    }, "prepareSubmitAll"));
    this._provider = n, this._connector = s, this.address = new wt(e);
  }
  /**
   * The provider used to interact with the network.
   *
   * @returns A Provider instance.
   *
   * @throws `FuelError` if the provider is not set.
   */
  get provider() {
    if (!this._provider)
      throw new B(L.MISSING_PROVIDER, "Provider not set");
    return this._provider;
  }
  /**
   * Sets the provider for the account.
   *
   * @param provider - A Provider instance.
   */
  set provider(e) {
    this._provider = e;
  }
  /**
   * Changes the provider connection for the account.
   *
   * @param provider - A Provider instance.
   * @returns The updated Provider instance.
   */
  connect(e) {
    return this._provider = e, this.provider;
  }
  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - Quantities of resources to be obtained.
   * @param resourcesIdsToIgnore - IDs of resources to be excluded from the query (optional).
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(e, n) {
    return this.provider.getResourcesToSpend(this.address, e, n);
  }
  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve (optional).
   * @returns A promise that resolves to an array of Coins.
   */
  async getCoins(e, n) {
    return this.provider.getCoins(this.address, e, n);
  }
  /**
   * Retrieves messages owned by the account.
   *
   * @returns A promise that resolves to an array of Messages.
   */
  async getMessages(e) {
    return this.provider.getMessages(this.address, e);
  }
  /**
   * Retrieves the balance of the account for the given asset.
   *
   * @param assetId - The asset ID to check the balance for (optional).
   * @returns A promise that resolves to the balance amount.
   */
  async getBalance(e) {
    const n = e ?? await this.provider.getBaseAssetId();
    return await this.provider.getBalance(this.address, n);
  }
  /**
   * Retrieves all the balances for the account.
   *
   * @returns A promise that resolves to an array of Coins and their quantities.
   */
  async getBalances() {
    return this.provider.getBalances(this.address);
  }
  /**
   * Funds a transaction request by adding the necessary resources.
   *
   * @typeParam T - The type of the TransactionRequest.
   * @param request - The transaction request to fund.
   * @param params - The estimated transaction parameters.
   * @returns A promise that resolves to the funded transaction request.
   *
   * @deprecated Use provider.assembleTx instead
   * Check the migration guide https://docs.fuel.network/docs/fuels-ts/transactions/assemble-tx-migration-guide/ for more information.
   */
  async fund(e, n) {
    var M;
    const {
      addedSignatures: s,
      estimatedPredicates: i,
      requiredQuantities: a,
      updateMaxFee: o,
      gasPrice: d,
      transactionSummary: h
    } = n, f = await this.provider.getChainId(), g = e.maxFee, y = await this.provider.getBaseAssetId(), R = ((M = a.find((O) => O.assetId === y)) == null ? void 0 : M.amount) || E(0), Q = kv({
      amount: E(g),
      assetId: y,
      coinQuantities: a
    }), x = {};
    Q.forEach(({ amount: O, assetId: k }) => {
      x[k] = {
        required: O,
        owned: E(0)
      };
    }), e.inputs.filter(zn).forEach((O) => {
      const G = Rr(O) ? String(O.assetId) : y;
      x[G] && (x[G].owned = x[G].owned.add(O.amount));
    });
    let N = [];
    Object.entries(x).forEach(([O, { owned: k, required: G }]) => {
      k.lt(G) && N.push({
        assetId: O,
        amount: G.sub(k)
      });
    });
    let U = N.length > 0, H = 0;
    for (; U && H < qx; ) {
      const O = await this.getResourcesToSpend(
        N,
        bx(e.inputs, this.address)
      );
      e.addResources(O), e.updatePredicateGasUsed(i);
      const k = Be(e);
      if (s && Array.from({ length: s }).forEach(
        () => k.addEmptyWitness()
      ), !o) {
        U = !1;
        break;
      }
      const { maxFee: G } = await this.provider.estimateTxGasAndFee({
        transactionRequest: k,
        gasPrice: d
      }), z = yx(
        e.inputs.filter(zn),
        y,
        y
      ), j = R.add(G);
      z.gt(j) ? U = !1 : N = [
        {
          amount: j.sub(z),
          assetId: y
        }
      ], H += 1;
    }
    if (U)
      throw new B(
        L.INSUFFICIENT_FUNDS_OR_MAX_COINS,
        `The account ${this.address} does not have enough base asset funds to cover the transaction execution.`
      );
    e.updateState(f, "funded", h), await this.provider.validateTransaction(e), e.updatePredicateGasUsed(i);
    const X = Be(e);
    if (s && Array.from({ length: s }).forEach(() => X.addEmptyWitness()), !o)
      return e;
    const { maxFee: P } = await this.provider.estimateTxGasAndFee({
      transactionRequest: X,
      gasPrice: d
    });
    return e.maxFee = P, e;
  }
  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(e, n, s, i = {}) {
    let a = new Yr(i);
    a = this.addTransfer(a, {
      destination: e,
      amount: n,
      assetId: s || await this.provider.getBaseAssetId()
    });
    const { gasPrice: o, transactionRequest: d } = await this.assembleTx(a);
    return a = await ts({
      gasPrice: o,
      provider: this.provider,
      transactionRequest: d,
      setGasLimit: i == null ? void 0 : i.gasLimit,
      setMaxFee: i == null ? void 0 : i.maxFee
    }), a;
  }
  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(e, n, s, i = {}) {
    const a = await this.createTransfer(e, n, s, i);
    return this.sendTransaction(a, { estimateTxDependencies: !1 });
  }
  /**
   * Transfers multiple amounts of a token to multiple recipients.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @param txParams - Optional transaction parameters.
   * @returns A promise that resolves to a `TransactionResponse` object representing the transaction result.
   */
  async batchTransfer(e, n = {}) {
    let s = new Yr(n);
    s = this.addBatchTransfer(s, e);
    const { gasPrice: i, transactionRequest: a } = await this.assembleTx(s);
    return s = await ts({
      gasPrice: i,
      provider: this.provider,
      transactionRequest: a,
      setGasLimit: n == null ? void 0 : n.gasLimit,
      setMaxFee: n == null ? void 0 : n.maxFee
    }), this.sendTransaction(s, { estimateTxDependencies: !1 });
  }
  /**
   * Adds a transfer to the given transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - The object representing the transfer to be made.
   * @returns The updated transaction request with the added transfer.
   */
  addTransfer(e, n) {
    const { destination: s, amount: i, assetId: a } = n;
    return this.validateTransferAmount(i), e.addCoinOutput(new wt(s), i, a), e;
  }
  /**
   * Adds multiple transfers to a script transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The updated script transaction request.
   */
  addBatchTransfer(e, n) {
    return n.forEach(({ destination: s, amount: i, assetId: a }) => {
      this.addTransfer(e, {
        destination: s,
        amount: i,
        assetId: a
      });
    }), e;
  }
  /**
   * Transfers coins to a contract address.
   *
   * @param contractId - The address of the contract.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async transferToContract(e, n, s, i = {}) {
    return this.batchTransferToContracts([{ amount: n, assetId: s, contractId: e }], i);
  }
  async batchTransferToContracts(e, n = {}) {
    let s = new Yr({
      ...n
    });
    const i = [], a = await this.provider.getBaseAssetId(), o = e.map((y) => {
      const R = E(y.amount), Q = new wt(y.contractId), x = y.assetId ? W(y.assetId) : a;
      if (R.lte(0))
        throw new B(
          L.INVALID_TRANSFER_AMOUNT,
          "Transfer amount must be a positive number."
        );
      return s.addContractInputAndOutput(Q), i.push({ amount: R, assetId: x }), {
        amount: R,
        contractId: Q.toB256(),
        assetId: x
      };
    }), { script: d, scriptData: h } = await Zx(o);
    s.script = d, s.scriptData = h;
    const { gasPrice: f, transactionRequest: g } = await this.assembleTx(s, i);
    return s = await ts({
      gasPrice: f,
      provider: this.provider,
      transactionRequest: g,
      setGasLimit: n == null ? void 0 : n.gasLimit,
      setMaxFee: n == null ? void 0 : n.maxFee
    }), this.sendTransaction(s);
  }
  /**
   * Withdraws an amount of the base asset to the base chain.
   *
   * @param recipient - Address of the recipient on the base chain.
   * @param amount - Amount of base asset.
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(e, n, s = {}) {
    const i = new wt(e), a = J(
      "0x".concat(i.toHexString().substring(2).padStart(64, "0"))
    ), o = J(
      "0x".concat(E(n).toHex().substring(2).padStart(16, "0"))
    ), h = { script: new Uint8Array([
      ...J(vx.bytes),
      ...a,
      ...o
    ]), ...s }, f = await this.provider.getBaseAssetId();
    let g = new Yr(h);
    const y = [{ amount: E(n), assetId: f }], { gasPrice: R, transactionRequest: Q } = await this.assembleTx(g, y);
    return g = await ts({
      gasPrice: R,
      provider: this.provider,
      transactionRequest: Q,
      setGasLimit: s == null ? void 0 : s.gasLimit,
      setMaxFee: s == null ? void 0 : s.maxFee
    }), this.sendTransaction(g);
  }
  /**
   * Consolidates base asset UTXOs into fewer, larger ones.
   *
   * Retrieves a limited number of base asset coins (as defined by `Provider.RESOURCES_PAGE_SIZE_LIMIT`),
   * assembles consolidation transactions, and submits them to the network.
   *
   * Note: This method currently supports only the base asset.
   *
   * @param params - The parameters for coin consolidation, including the asset ID, mode, and output number.
   * @returns A promise that resolves to the response of the submitted transactions.
   * @throws Will throw an error if the asset is not a base asset as non-base asset consolidation is not implemented.
   */
  async consolidateCoins(e) {
    const { assetId: n } = e, { coins: s } = await this.getCoins(n), a = await this.provider.getBaseAssetId() === n;
    let o;
    const d = {
      coins: s,
      mode: e.mode,
      outputNum: e.outputNum
    };
    if (a)
      ({ submitAll: o } = await this.assembleBaseAssetConsolidationTxs(d));
    else
      throw new B(
        L.UNSUPPORTED_FEATURE,
        "Consolidation for non-base assets is not supported yet."
      );
    return o();
  }
  /**
   * Assembles transactions for consolidating base asset coins into fewer UTXOs.
   *
   * This method splits the provided coins into batches and creates transaction requests
   * to consolidate them. It calculates the necessary fee and sets up the transactions
   * to be submitted either in parallel (default) or sequentially.
   *
   * @param params - The parameters for assembling base asset consolidation transactions.
   *
   * @returns An object containing the assembled transactions, the total fee cost, and a callback to submit all transactions.
   */
  async assembleBaseAssetConsolidationTxs(e) {
    const { coins: n, mode: s = "parallel", outputNum: i = 1 } = e, a = await this.provider.getBaseAssetId();
    this.validateConsolidationTxsCoins(n, a);
    const o = await this.provider.getChain(), d = o.consensusParameters.txParameters.maxInputs.toNumber();
    let h = E(0);
    const f = [], g = Jx(n, d), y = await this.provider.estimateGasPrice(10), R = i > 1;
    g.filter((x) => x.length > 1).forEach((x) => {
      const N = new Yr({
        script: "0x"
      });
      N.addResources(x), R && Array.from({ length: i - 1 }).forEach(() => {
        N.addCoinOutput(this.address, 0, a);
      });
      const U = N.calculateMinGas(o), H = Bi({
        gasPrice: y,
        gas: U,
        priceFactor: o.consensusParameters.feeParameters.gasPriceFactor,
        tip: N.tip
      });
      if (N.maxFee = H, R) {
        const P = N.inputs.filter(Rr).reduce((M, O) => M.add(O.amount), E(0)).div(i + 1);
        N.outputs.forEach((M) => {
          M.type === lt.Coin && (M.amount = P);
        });
      }
      h = h.add(H), f.push(N);
    });
    const Q = this.prepareSubmitAll({ txs: f, mode: s });
    return { txs: f, totalFeeCost: h, submitAll: Q };
  }
  /**
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the transaction.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param transactionCostParams - The transaction cost parameters (optional).
   *
   * @returns A promise that resolves to the transaction cost object.
   *
   * @deprecated Use provider.assembleTx instead
   * Check the migration guide https://docs.fuel.network/docs/fuels-ts/transactions/assemble-tx-migration-guide/ for more information.
   */
  async getTransactionCost(e, { signatureCallback: n, quantities: s = [], gasPrice: i } = {}) {
    const a = Be(Te(e)), o = await this.provider.getBaseAssetId(), d = a.getCoinOutputsQuantities(), h = Pa(d, s), f = [{ assetId: o, amount: E("100000000000000000") }], g = /* @__PURE__ */ T((Q) => a.inputs.find((x) => x.type === vt.Coin ? x.assetId === Q : Pf(x) ? o === Q : !1), "findAssetInput"), y = /* @__PURE__ */ T((Q, x) => {
      const N = g(Q), U = x;
      N && "amount" in N ? N.amount = U : a.addResources(
        this.generateFakeResources([
          {
            amount: x,
            assetId: Q
          }
        ])
      );
    }, "updateAssetInput");
    return Pa(h, f).forEach(
      ({ amount: Q, assetId: x }) => y(x, Q)
    ), {
      ...await this.provider.getTransactionCost(a, {
        signatureCallback: n,
        gasPrice: i
      }),
      requiredQuantities: h
    };
  }
  /**
   * Sign a message from the account via the connector.
   *
   * @param message - the message to sign.
   * @returns a promise that resolves to the signature.
   *
   * @hidden
   */
  async signMessage(e) {
    if (!this._connector)
      throw new B(L.MISSING_CONNECTOR, "A connector is required to sign messages.");
    return this._connector.signMessage(this.address.toString(), e);
  }
  /**
   * Signs a transaction from the account via the connector..
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature of the transaction.
   */
  async signTransaction(e, n = {}) {
    if (!this._connector)
      throw new B(
        L.MISSING_CONNECTOR,
        "A connector is required to sign transactions."
      );
    const s = Te(e), { transactionRequest: i, connectorsSendTxParams: a } = await this.setTransactionStateForConnectors({
      transactionRequest: s,
      connectorOptions: n
    });
    return this._connector.signTransaction(
      this.address.toString(),
      i,
      a
    );
  }
  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @param sendTransactionParams - The provider send transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(e, { estimateTxDependencies: n = !0, ...s } = {}) {
    const i = Te(e);
    if (this._connector) {
      const a = await this.setTransactionStateForConnectors({
        transactionRequest: i,
        connectorOptions: s
      }), o = await this._connector.sendTransaction(
        this.address.toString(),
        a.transactionRequest,
        a.connectorsSendTxParams
      );
      return typeof o == "string" ? this.provider.getTransactionResponse(o) : o;
    }
    return n && await this.provider.estimateTxDependencies(i), this.provider.sendTransaction(i, {
      estimateTxDependencies: !1
    });
  }
  /**
   * Simulates a transaction.
   *
   * @param transactionRequestLike - The transaction request to be simulated.
   * @param estimateTxParams - The estimate transaction params (optional).
   * @returns A promise that resolves to the call result.
   */
  async simulateTransaction(e, { estimateTxDependencies: n = !0 } = {}) {
    const s = Te(e);
    return n && await this.provider.estimateTxDependencies(s), this.provider.simulate(s, { estimateTxDependencies: !1 });
  }
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(e) {
    return e.map((n) => ({
      id: W(er(io)),
      owner: this.address,
      blockCreated: E(1),
      txCreatedIdx: E(1),
      ...n
    }));
  }
  /** @hidden */
  async prepareTransactionForSend(e) {
    const { transactionId: n } = e.flag;
    if (!Fe(n))
      return e;
    const s = await this.provider.getChainId(), i = e.getTransactionId(s);
    return n !== i && e.updateState(s), e;
  }
  /** @hidden */
  async prepareTransactionSummary(e) {
    const n = await this.provider.getChainId();
    return Fe(e.flag.summary) ? {
      ...e.flag.summary,
      id: e.getTransactionId(n),
      transactionBytes: W(e.toTransactionBytes())
    } : void 0;
  }
  /** @hidden * */
  async assembleTx(e, n = []) {
    const s = e.outputs.filter((o) => o.type === lt.Coin).map(({ amount: o, assetId: d }) => ({ assetId: String(d), amount: E(o) }));
    e.gasLimit = E(0), e.maxFee = E(0);
    const { assembledRequest: i, gasPrice: a } = await this.provider.assembleTx({
      request: e,
      accountCoinQuantities: Pa(s, n),
      feePayerAccount: this
    });
    return { transactionRequest: i, gasPrice: a };
  }
  /** @hidden * */
  validateTransferAmount(e) {
    if (E(e).lte(0))
      throw new B(
        L.INVALID_TRANSFER_AMOUNT,
        "Transfer amount must be a positive number."
      );
  }
  /** @hidden * */
  async estimateAndFundTransaction(e, n, s) {
    let i = e;
    const a = await this.getTransactionCost(i, s);
    return i = this.validateGasLimitAndMaxFee({
      transactionRequest: i,
      gasUsed: a.gasUsed,
      maxFee: a.maxFee,
      txParams: n
    }), i = await this.fund(i, a), i;
  }
  /** @hidden * */
  validateGasLimitAndMaxFee({
    gasUsed: e,
    maxFee: n,
    transactionRequest: s,
    txParams: { gasLimit: i, maxFee: a }
  }) {
    const o = Te(s);
    if (!Fe(i))
      o.gasLimit = e;
    else if (e.gt(i))
      throw new B(
        L.GAS_LIMIT_TOO_LOW,
        `Gas limit '${i}' is lower than the required: '${e}'.`
      );
    if (!Fe(a))
      o.maxFee = n;
    else if (n.gt(a))
      throw new B(
        L.MAX_FEE_TOO_LOW,
        `Max fee '${a}' is lower than the required: '${n}'.`
      );
    return o;
  }
  /** @hidden * */
  validateConsolidationTxsCoins(e, n) {
    if (e.length <= 1)
      throw new B(L.NO_COINS_TO_CONSOLIDATE, "No coins to consolidate.");
    if (!e.every((s) => s.assetId === n))
      throw new B(
        L.COINS_ASSET_ID_MISMATCH,
        "All coins to consolidate must be from the same asset id."
      );
  }
  /** @hidden * */
  async setTransactionStateForConnectors(e) {
    const { transactionRequest: n, connectorOptions: s } = e, { onBeforeSend: i, skipCustomFee: a = !1 } = s, o = await this.prepareTransactionForSend(n), d = {
      onBeforeSend: i,
      skipCustomFee: a,
      provider: {
        url: this.provider.url,
        cache: await Tf(this.provider)
      },
      transactionState: n.flag.state,
      transactionSummary: await this.prepareTransactionSummary(n)
    };
    return { transactionRequest: o, connectorsSendTxParams: d };
  }
}, T(ni, "Account"), ni), Qn, na = (Qn = class {
  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
  constructor(t) {
    D(this, "address");
    D(this, "publicKey");
    D(this, "compressedPublicKey");
    D(this, "privateKey");
    typeof t == "string" && t.match(/^[0-9a-f]*$/i) && t.length === 64 && (t = `0x${t}`);
    const e = Ir(t, 32);
    this.privateKey = W(e), this.publicKey = W(Wr.getPublicKey(e, !1).slice(1)), this.compressedPublicKey = W(Wr.getPublicKey(e, !0)), this.address = new wt(this.publicKey);
  }
  /**
   * Sign data using the Signer instance
   *
   * Signature is a 64 byte array of the concatenated r and s values with the compressed recoveryParam byte.
   * @ignore
   * [Read more](FuelLabs/fuel-specs/specs/protocol/cryptographic_primitives.md#public-key-cryptography)
   *
   * @param data - The data to be sign
   * @returns hashed signature
   */
  sign(t) {
    const e = Wr.sign(J(t), J(this.privateKey)), n = Ir(`0x${e.r.toString(16)}`, 32), s = Ir(`0x${e.s.toString(16)}`, 32);
    return s[0] |= (e.recovery || 0) << 7, W(ct([n, s]));
  }
  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(t) {
    const e = Wr.ProjectivePoint.fromHex(J(this.compressedPublicKey)), n = Wr.ProjectivePoint.fromHex(J(t));
    return `0x${e.add(n).toHex(!0)}`;
  }
  /**
   * Recover the public key from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - hashed signature
   * @returns public key from signature from the
   */
  static recoverPublicKey(t, e) {
    const n = J(e), s = n.slice(0, 32), i = n.slice(32, 64), a = (i[0] & 128) >> 7;
    i[0] &= 127;
    const d = new Wr.Signature(BigInt(W(s)), BigInt(W(i))).addRecoveryBit(
      a
    ).recoverPublicKey(J(t)).toRawBytes(!1).slice(1);
    return W(d);
  }
  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(t, e) {
    return new wt(Qn.recoverPublicKey(t, e));
  }
  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(t) {
    return t ? _r(ct([er(32), J(t)])) : er(32);
  }
  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(t) {
    const e = Wr.ProjectivePoint.fromHex(J(t));
    return W(e.toRawBytes(!1).slice(1));
  }
}, T(Qn, "Signer"), Qn), jl = 13, Zl = 8, Jl = 1, Uc = 32, $x = 16, ql = /* @__PURE__ */ T((r) => /^0x/.test(r) ? r.slice(2) : r, "removeHexPrefix");
async function Ig(r, t, e) {
  const n = _n(ql(r), "hex"), s = new wt(t), i = er(Uc), a = ap({
    password: _n(e),
    salt: i,
    dklen: Uc,
    n: 2 ** jl,
    r: Zl,
    p: Jl
  }), o = er($x), d = await EE(n, a, o), h = Uint8Array.from([...a.subarray(16, 32), ...d]), f = op(h), g = Xi(f, "hex"), y = {
    id: vE(),
    version: 3,
    address: ql(s.toHexString()),
    crypto: {
      cipher: "aes-128-ctr",
      mac: g,
      cipherparams: { iv: Xi(o, "hex") },
      ciphertext: Xi(d, "hex"),
      kdf: "scrypt",
      kdfparams: {
        dklen: Uc,
        n: 2 ** jl,
        p: Jl,
        r: Zl,
        salt: Xi(i, "hex")
      }
    }
  };
  return JSON.stringify(y);
}
T(Ig, "encryptKeystoreWallet");
async function Eg(r, t) {
  const e = JSON.parse(r), {
    crypto: {
      mac: n,
      ciphertext: s,
      cipherparams: { iv: i },
      kdfparams: { dklen: a, n: o, r: d, p: h, salt: f }
    }
  } = e, g = _n(s, "hex"), y = _n(i, "hex"), R = _n(f, "hex"), Q = _n(t), x = ap({
    password: Q,
    salt: R,
    n: o,
    p: h,
    r: d,
    dklen: a
  }), N = Uint8Array.from([...x.subarray(16, 32), ...g]), U = op(N), H = Xi(U, "hex");
  if (n !== H)
    throw new B(
      L.INVALID_PASSWORD,
      "Failed to decrypt the keystore wallet, the provided password is incorrect."
    );
  const X = await IE(g, x, y);
  return W(X);
}
T(Eg, "decryptKeystoreWallet");
var En, Kx = (En = class extends Vo {
  /**
   * Creates a new BaseWalletUnlocked instance.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   */
  constructor(e, n) {
    const s = new na(e);
    super(s.address, n);
    /**
     * A function that returns the wallet's signer.
     */
    D(this, "signer");
    this.signer = () => s;
  }
  /**
   * Gets the private key of the wallet.
   *
   * @returns The private key of the wallet.
   */
  get privateKey() {
    return this.signer().privateKey;
  }
  /**
   * Gets the public key of the wallet.
   *
   * @returns
   */
  get publicKey() {
    return this.signer().publicKey;
  }
  /**
   * Signs a message with the wallet's private key.
   *
   * @param message - The message to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signMessage(e) {
    const n = await this.signer().sign(up(e));
    return W(n);
  }
  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature as a ECDSA 64 bytes string.
   */
  async signTransaction(e) {
    const n = Te(e), s = await this.provider.getChainId(), i = n.getTransactionId(s), a = await this.signer().sign(i);
    return W(a);
  }
  /**
   * Populates a transaction with the witnesses signature.
   *
   * @param transactionRequestLike - The transaction request to populate.
   * @returns The populated transaction request.
   */
  async populateTransactionWitnessesSignature(e) {
    const n = Te(e), s = await this.signTransaction(n);
    return n.updateWitnessByOwner(this.address, s), n;
  }
  /**
   * Populates the witness signature for a transaction and sends it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequestLike - The transaction request to send.
   * @param estimateTxDependencies - Whether to estimate the transaction dependencies.
   * @returns A promise that resolves to the TransactionResponse object.
   */
  async sendTransaction(e, { estimateTxDependencies: n = !1, enableAssetBurn: s } = {}) {
    const i = Te(e);
    return kf(
      await this.provider.getBaseAssetId(),
      i,
      s
    ), n && await this.provider.estimateTxDependencies(i), this.provider.sendTransaction(
      await this.populateTransactionWitnessesSignature(i),
      { estimateTxDependencies: !1, enableAssetBurn: s }
    );
  }
  /**
   * Populates the witness signature for a transaction and sends a call to the network using `provider.dryRun`.
   *
   * @param transactionRequestLike - The transaction request to simulate.
   * @returns A promise that resolves to the CallResult object.
   */
  async simulateTransaction(e, { estimateTxDependencies: n = !0 } = {}) {
    const s = Te(e);
    return n && await this.provider.estimateTxDependencies(s), this.provider.dryRun(
      await this.populateTransactionWitnessesSignature(s),
      {
        utxoValidation: !0,
        estimateTxDependencies: !1
      }
    );
  }
  /**
   * Encrypts an unlocked wallet with a password.
   *
   * @param password - the password to encrypt the wallet with.
   * @returns - the encrypted wallet.
   */
  async encrypt(e) {
    return Ig(this.privateKey, this.address, e);
  }
}, T(En, "BaseWalletUnlocked"), /**
 * Default HDWallet path.
 */
D(En, "defaultPath", "m/44'/1179993420'/0'/0/0"), En), Ba = [
  "abandon",
  "ability",
  "able",
  "about",
  "above",
  "absent",
  "absorb",
  "abstract",
  "absurd",
  "abuse",
  "access",
  "accident",
  "account",
  "accuse",
  "achieve",
  "acid",
  "acoustic",
  "acquire",
  "across",
  "act",
  "action",
  "actor",
  "actress",
  "actual",
  "adapt",
  "add",
  "addict",
  "address",
  "adjust",
  "admit",
  "adult",
  "advance",
  "advice",
  "aerobic",
  "affair",
  "afford",
  "afraid",
  "again",
  "age",
  "agent",
  "agree",
  "ahead",
  "aim",
  "air",
  "airport",
  "aisle",
  "alarm",
  "album",
  "alcohol",
  "alert",
  "alien",
  "all",
  "alley",
  "allow",
  "almost",
  "alone",
  "alpha",
  "already",
  "also",
  "alter",
  "always",
  "amateur",
  "amazing",
  "among",
  "amount",
  "amused",
  "analyst",
  "anchor",
  "ancient",
  "anger",
  "angle",
  "angry",
  "animal",
  "ankle",
  "announce",
  "annual",
  "another",
  "answer",
  "antenna",
  "antique",
  "anxiety",
  "any",
  "apart",
  "apology",
  "appear",
  "apple",
  "approve",
  "april",
  "arch",
  "arctic",
  "area",
  "arena",
  "argue",
  "arm",
  "armed",
  "armor",
  "army",
  "around",
  "arrange",
  "arrest",
  "arrive",
  "arrow",
  "art",
  "artefact",
  "artist",
  "artwork",
  "ask",
  "aspect",
  "assault",
  "asset",
  "assist",
  "assume",
  "asthma",
  "athlete",
  "atom",
  "attack",
  "attend",
  "attitude",
  "attract",
  "auction",
  "audit",
  "august",
  "aunt",
  "author",
  "auto",
  "autumn",
  "average",
  "avocado",
  "avoid",
  "awake",
  "aware",
  "away",
  "awesome",
  "awful",
  "awkward",
  "axis",
  "baby",
  "bachelor",
  "bacon",
  "badge",
  "bag",
  "balance",
  "balcony",
  "ball",
  "bamboo",
  "banana",
  "banner",
  "bar",
  "barely",
  "bargain",
  "barrel",
  "base",
  "basic",
  "basket",
  "battle",
  "beach",
  "bean",
  "beauty",
  "because",
  "become",
  "beef",
  "before",
  "begin",
  "behave",
  "behind",
  "believe",
  "below",
  "belt",
  "bench",
  "benefit",
  "best",
  "betray",
  "better",
  "between",
  "beyond",
  "bicycle",
  "bid",
  "bike",
  "bind",
  "biology",
  "bird",
  "birth",
  "bitter",
  "black",
  "blade",
  "blame",
  "blanket",
  "blast",
  "bleak",
  "bless",
  "blind",
  "blood",
  "blossom",
  "blouse",
  "blue",
  "blur",
  "blush",
  "board",
  "boat",
  "body",
  "boil",
  "bomb",
  "bone",
  "bonus",
  "book",
  "boost",
  "border",
  "boring",
  "borrow",
  "boss",
  "bottom",
  "bounce",
  "box",
  "boy",
  "bracket",
  "brain",
  "brand",
  "brass",
  "brave",
  "bread",
  "breeze",
  "brick",
  "bridge",
  "brief",
  "bright",
  "bring",
  "brisk",
  "broccoli",
  "broken",
  "bronze",
  "broom",
  "brother",
  "brown",
  "brush",
  "bubble",
  "buddy",
  "budget",
  "buffalo",
  "build",
  "bulb",
  "bulk",
  "bullet",
  "bundle",
  "bunker",
  "burden",
  "burger",
  "burst",
  "bus",
  "business",
  "busy",
  "butter",
  "buyer",
  "buzz",
  "cabbage",
  "cabin",
  "cable",
  "cactus",
  "cage",
  "cake",
  "call",
  "calm",
  "camera",
  "camp",
  "can",
  "canal",
  "cancel",
  "candy",
  "cannon",
  "canoe",
  "canvas",
  "canyon",
  "capable",
  "capital",
  "captain",
  "car",
  "carbon",
  "card",
  "cargo",
  "carpet",
  "carry",
  "cart",
  "case",
  "cash",
  "casino",
  "castle",
  "casual",
  "cat",
  "catalog",
  "catch",
  "category",
  "cattle",
  "caught",
  "cause",
  "caution",
  "cave",
  "ceiling",
  "celery",
  "cement",
  "census",
  "century",
  "cereal",
  "certain",
  "chair",
  "chalk",
  "champion",
  "change",
  "chaos",
  "chapter",
  "charge",
  "chase",
  "chat",
  "cheap",
  "check",
  "cheese",
  "chef",
  "cherry",
  "chest",
  "chicken",
  "chief",
  "child",
  "chimney",
  "choice",
  "choose",
  "chronic",
  "chuckle",
  "chunk",
  "churn",
  "cigar",
  "cinnamon",
  "circle",
  "citizen",
  "city",
  "civil",
  "claim",
  "clap",
  "clarify",
  "claw",
  "clay",
  "clean",
  "clerk",
  "clever",
  "click",
  "client",
  "cliff",
  "climb",
  "clinic",
  "clip",
  "clock",
  "clog",
  "close",
  "cloth",
  "cloud",
  "clown",
  "club",
  "clump",
  "cluster",
  "clutch",
  "coach",
  "coast",
  "coconut",
  "code",
  "coffee",
  "coil",
  "coin",
  "collect",
  "color",
  "column",
  "combine",
  "come",
  "comfort",
  "comic",
  "common",
  "company",
  "concert",
  "conduct",
  "confirm",
  "congress",
  "connect",
  "consider",
  "control",
  "convince",
  "cook",
  "cool",
  "copper",
  "copy",
  "coral",
  "core",
  "corn",
  "correct",
  "cost",
  "cotton",
  "couch",
  "country",
  "couple",
  "course",
  "cousin",
  "cover",
  "coyote",
  "crack",
  "cradle",
  "craft",
  "cram",
  "crane",
  "crash",
  "crater",
  "crawl",
  "crazy",
  "cream",
  "credit",
  "creek",
  "crew",
  "cricket",
  "crime",
  "crisp",
  "critic",
  "crop",
  "cross",
  "crouch",
  "crowd",
  "crucial",
  "cruel",
  "cruise",
  "crumble",
  "crunch",
  "crush",
  "cry",
  "crystal",
  "cube",
  "culture",
  "cup",
  "cupboard",
  "curious",
  "current",
  "curtain",
  "curve",
  "cushion",
  "custom",
  "cute",
  "cycle",
  "dad",
  "damage",
  "damp",
  "dance",
  "danger",
  "daring",
  "dash",
  "daughter",
  "dawn",
  "day",
  "deal",
  "debate",
  "debris",
  "decade",
  "december",
  "decide",
  "decline",
  "decorate",
  "decrease",
  "deer",
  "defense",
  "define",
  "defy",
  "degree",
  "delay",
  "deliver",
  "demand",
  "demise",
  "denial",
  "dentist",
  "deny",
  "depart",
  "depend",
  "deposit",
  "depth",
  "deputy",
  "derive",
  "describe",
  "desert",
  "design",
  "desk",
  "despair",
  "destroy",
  "detail",
  "detect",
  "develop",
  "device",
  "devote",
  "diagram",
  "dial",
  "diamond",
  "diary",
  "dice",
  "diesel",
  "diet",
  "differ",
  "digital",
  "dignity",
  "dilemma",
  "dinner",
  "dinosaur",
  "direct",
  "dirt",
  "disagree",
  "discover",
  "disease",
  "dish",
  "dismiss",
  "disorder",
  "display",
  "distance",
  "divert",
  "divide",
  "divorce",
  "dizzy",
  "doctor",
  "document",
  "dog",
  "doll",
  "dolphin",
  "domain",
  "donate",
  "donkey",
  "donor",
  "door",
  "dose",
  "double",
  "dove",
  "draft",
  "dragon",
  "drama",
  "drastic",
  "draw",
  "dream",
  "dress",
  "drift",
  "drill",
  "drink",
  "drip",
  "drive",
  "drop",
  "drum",
  "dry",
  "duck",
  "dumb",
  "dune",
  "during",
  "dust",
  "dutch",
  "duty",
  "dwarf",
  "dynamic",
  "eager",
  "eagle",
  "early",
  "earn",
  "earth",
  "easily",
  "east",
  "easy",
  "echo",
  "ecology",
  "economy",
  "edge",
  "edit",
  "educate",
  "effort",
  "egg",
  "eight",
  "either",
  "elbow",
  "elder",
  "electric",
  "elegant",
  "element",
  "elephant",
  "elevator",
  "elite",
  "else",
  "embark",
  "embody",
  "embrace",
  "emerge",
  "emotion",
  "employ",
  "empower",
  "empty",
  "enable",
  "enact",
  "end",
  "endless",
  "endorse",
  "enemy",
  "energy",
  "enforce",
  "engage",
  "engine",
  "enhance",
  "enjoy",
  "enlist",
  "enough",
  "enrich",
  "enroll",
  "ensure",
  "enter",
  "entire",
  "entry",
  "envelope",
  "episode",
  "equal",
  "equip",
  "era",
  "erase",
  "erode",
  "erosion",
  "error",
  "erupt",
  "escape",
  "essay",
  "essence",
  "estate",
  "eternal",
  "ethics",
  "evidence",
  "evil",
  "evoke",
  "evolve",
  "exact",
  "example",
  "excess",
  "exchange",
  "excite",
  "exclude",
  "excuse",
  "execute",
  "exercise",
  "exhaust",
  "exhibit",
  "exile",
  "exist",
  "exit",
  "exotic",
  "expand",
  "expect",
  "expire",
  "explain",
  "expose",
  "express",
  "extend",
  "extra",
  "eye",
  "eyebrow",
  "fabric",
  "face",
  "faculty",
  "fade",
  "faint",
  "faith",
  "fall",
  "false",
  "fame",
  "family",
  "famous",
  "fan",
  "fancy",
  "fantasy",
  "farm",
  "fashion",
  "fat",
  "fatal",
  "father",
  "fatigue",
  "fault",
  "favorite",
  "feature",
  "february",
  "federal",
  "fee",
  "feed",
  "feel",
  "female",
  "fence",
  "festival",
  "fetch",
  "fever",
  "few",
  "fiber",
  "fiction",
  "field",
  "figure",
  "file",
  "film",
  "filter",
  "final",
  "find",
  "fine",
  "finger",
  "finish",
  "fire",
  "firm",
  "first",
  "fiscal",
  "fish",
  "fit",
  "fitness",
  "fix",
  "flag",
  "flame",
  "flash",
  "flat",
  "flavor",
  "flee",
  "flight",
  "flip",
  "float",
  "flock",
  "floor",
  "flower",
  "fluid",
  "flush",
  "fly",
  "foam",
  "focus",
  "fog",
  "foil",
  "fold",
  "follow",
  "food",
  "foot",
  "force",
  "forest",
  "forget",
  "fork",
  "fortune",
  "forum",
  "forward",
  "fossil",
  "foster",
  "found",
  "fox",
  "fragile",
  "frame",
  "frequent",
  "fresh",
  "friend",
  "fringe",
  "frog",
  "front",
  "frost",
  "frown",
  "frozen",
  "fruit",
  "fuel",
  "fun",
  "funny",
  "furnace",
  "fury",
  "future",
  "gadget",
  "gain",
  "galaxy",
  "gallery",
  "game",
  "gap",
  "garage",
  "garbage",
  "garden",
  "garlic",
  "garment",
  "gas",
  "gasp",
  "gate",
  "gather",
  "gauge",
  "gaze",
  "general",
  "genius",
  "genre",
  "gentle",
  "genuine",
  "gesture",
  "ghost",
  "giant",
  "gift",
  "giggle",
  "ginger",
  "giraffe",
  "girl",
  "give",
  "glad",
  "glance",
  "glare",
  "glass",
  "glide",
  "glimpse",
  "globe",
  "gloom",
  "glory",
  "glove",
  "glow",
  "glue",
  "goat",
  "goddess",
  "gold",
  "good",
  "goose",
  "gorilla",
  "gospel",
  "gossip",
  "govern",
  "gown",
  "grab",
  "grace",
  "grain",
  "grant",
  "grape",
  "grass",
  "gravity",
  "great",
  "green",
  "grid",
  "grief",
  "grit",
  "grocery",
  "group",
  "grow",
  "grunt",
  "guard",
  "guess",
  "guide",
  "guilt",
  "guitar",
  "gun",
  "gym",
  "habit",
  "hair",
  "half",
  "hammer",
  "hamster",
  "hand",
  "happy",
  "harbor",
  "hard",
  "harsh",
  "harvest",
  "hat",
  "have",
  "hawk",
  "hazard",
  "head",
  "health",
  "heart",
  "heavy",
  "hedgehog",
  "height",
  "hello",
  "helmet",
  "help",
  "hen",
  "hero",
  "hidden",
  "high",
  "hill",
  "hint",
  "hip",
  "hire",
  "history",
  "hobby",
  "hockey",
  "hold",
  "hole",
  "holiday",
  "hollow",
  "home",
  "honey",
  "hood",
  "hope",
  "horn",
  "horror",
  "horse",
  "hospital",
  "host",
  "hotel",
  "hour",
  "hover",
  "hub",
  "huge",
  "human",
  "humble",
  "humor",
  "hundred",
  "hungry",
  "hunt",
  "hurdle",
  "hurry",
  "hurt",
  "husband",
  "hybrid",
  "ice",
  "icon",
  "idea",
  "identify",
  "idle",
  "ignore",
  "ill",
  "illegal",
  "illness",
  "image",
  "imitate",
  "immense",
  "immune",
  "impact",
  "impose",
  "improve",
  "impulse",
  "inch",
  "include",
  "income",
  "increase",
  "index",
  "indicate",
  "indoor",
  "industry",
  "infant",
  "inflict",
  "inform",
  "inhale",
  "inherit",
  "initial",
  "inject",
  "injury",
  "inmate",
  "inner",
  "innocent",
  "input",
  "inquiry",
  "insane",
  "insect",
  "inside",
  "inspire",
  "install",
  "intact",
  "interest",
  "into",
  "invest",
  "invite",
  "involve",
  "iron",
  "island",
  "isolate",
  "issue",
  "item",
  "ivory",
  "jacket",
  "jaguar",
  "jar",
  "jazz",
  "jealous",
  "jeans",
  "jelly",
  "jewel",
  "job",
  "join",
  "joke",
  "journey",
  "joy",
  "judge",
  "juice",
  "jump",
  "jungle",
  "junior",
  "junk",
  "just",
  "kangaroo",
  "keen",
  "keep",
  "ketchup",
  "key",
  "kick",
  "kid",
  "kidney",
  "kind",
  "kingdom",
  "kiss",
  "kit",
  "kitchen",
  "kite",
  "kitten",
  "kiwi",
  "knee",
  "knife",
  "knock",
  "know",
  "lab",
  "label",
  "labor",
  "ladder",
  "lady",
  "lake",
  "lamp",
  "language",
  "laptop",
  "large",
  "later",
  "latin",
  "laugh",
  "laundry",
  "lava",
  "law",
  "lawn",
  "lawsuit",
  "layer",
  "lazy",
  "leader",
  "leaf",
  "learn",
  "leave",
  "lecture",
  "left",
  "leg",
  "legal",
  "legend",
  "leisure",
  "lemon",
  "lend",
  "length",
  "lens",
  "leopard",
  "lesson",
  "letter",
  "level",
  "liar",
  "liberty",
  "library",
  "license",
  "life",
  "lift",
  "light",
  "like",
  "limb",
  "limit",
  "link",
  "lion",
  "liquid",
  "list",
  "little",
  "live",
  "lizard",
  "load",
  "loan",
  "lobster",
  "local",
  "lock",
  "logic",
  "lonely",
  "long",
  "loop",
  "lottery",
  "loud",
  "lounge",
  "love",
  "loyal",
  "lucky",
  "luggage",
  "lumber",
  "lunar",
  "lunch",
  "luxury",
  "lyrics",
  "machine",
  "mad",
  "magic",
  "magnet",
  "maid",
  "mail",
  "main",
  "major",
  "make",
  "mammal",
  "man",
  "manage",
  "mandate",
  "mango",
  "mansion",
  "manual",
  "maple",
  "marble",
  "march",
  "margin",
  "marine",
  "market",
  "marriage",
  "mask",
  "mass",
  "master",
  "match",
  "material",
  "math",
  "matrix",
  "matter",
  "maximum",
  "maze",
  "meadow",
  "mean",
  "measure",
  "meat",
  "mechanic",
  "medal",
  "media",
  "melody",
  "melt",
  "member",
  "memory",
  "mention",
  "menu",
  "mercy",
  "merge",
  "merit",
  "merry",
  "mesh",
  "message",
  "metal",
  "method",
  "middle",
  "midnight",
  "milk",
  "million",
  "mimic",
  "mind",
  "minimum",
  "minor",
  "minute",
  "miracle",
  "mirror",
  "misery",
  "miss",
  "mistake",
  "mix",
  "mixed",
  "mixture",
  "mobile",
  "model",
  "modify",
  "mom",
  "moment",
  "monitor",
  "monkey",
  "monster",
  "month",
  "moon",
  "moral",
  "more",
  "morning",
  "mosquito",
  "mother",
  "motion",
  "motor",
  "mountain",
  "mouse",
  "move",
  "movie",
  "much",
  "muffin",
  "mule",
  "multiply",
  "muscle",
  "museum",
  "mushroom",
  "music",
  "must",
  "mutual",
  "myself",
  "mystery",
  "myth",
  "naive",
  "name",
  "napkin",
  "narrow",
  "nasty",
  "nation",
  "nature",
  "near",
  "neck",
  "need",
  "negative",
  "neglect",
  "neither",
  "nephew",
  "nerve",
  "nest",
  "net",
  "network",
  "neutral",
  "never",
  "news",
  "next",
  "nice",
  "night",
  "noble",
  "noise",
  "nominee",
  "noodle",
  "normal",
  "north",
  "nose",
  "notable",
  "note",
  "nothing",
  "notice",
  "novel",
  "now",
  "nuclear",
  "number",
  "nurse",
  "nut",
  "oak",
  "obey",
  "object",
  "oblige",
  "obscure",
  "observe",
  "obtain",
  "obvious",
  "occur",
  "ocean",
  "october",
  "odor",
  "off",
  "offer",
  "office",
  "often",
  "oil",
  "okay",
  "old",
  "olive",
  "olympic",
  "omit",
  "once",
  "one",
  "onion",
  "online",
  "only",
  "open",
  "opera",
  "opinion",
  "oppose",
  "option",
  "orange",
  "orbit",
  "orchard",
  "order",
  "ordinary",
  "organ",
  "orient",
  "original",
  "orphan",
  "ostrich",
  "other",
  "outdoor",
  "outer",
  "output",
  "outside",
  "oval",
  "oven",
  "over",
  "own",
  "owner",
  "oxygen",
  "oyster",
  "ozone",
  "pact",
  "paddle",
  "page",
  "pair",
  "palace",
  "palm",
  "panda",
  "panel",
  "panic",
  "panther",
  "paper",
  "parade",
  "parent",
  "park",
  "parrot",
  "party",
  "pass",
  "patch",
  "path",
  "patient",
  "patrol",
  "pattern",
  "pause",
  "pave",
  "payment",
  "peace",
  "peanut",
  "pear",
  "peasant",
  "pelican",
  "pen",
  "penalty",
  "pencil",
  "people",
  "pepper",
  "perfect",
  "permit",
  "person",
  "pet",
  "phone",
  "photo",
  "phrase",
  "physical",
  "piano",
  "picnic",
  "picture",
  "piece",
  "pig",
  "pigeon",
  "pill",
  "pilot",
  "pink",
  "pioneer",
  "pipe",
  "pistol",
  "pitch",
  "pizza",
  "place",
  "planet",
  "plastic",
  "plate",
  "play",
  "please",
  "pledge",
  "pluck",
  "plug",
  "plunge",
  "poem",
  "poet",
  "point",
  "polar",
  "pole",
  "police",
  "pond",
  "pony",
  "pool",
  "popular",
  "portion",
  "position",
  "possible",
  "post",
  "potato",
  "pottery",
  "poverty",
  "powder",
  "power",
  "practice",
  "praise",
  "predict",
  "prefer",
  "prepare",
  "present",
  "pretty",
  "prevent",
  "price",
  "pride",
  "primary",
  "print",
  "priority",
  "prison",
  "private",
  "prize",
  "problem",
  "process",
  "produce",
  "profit",
  "program",
  "project",
  "promote",
  "proof",
  "property",
  "prosper",
  "protect",
  "proud",
  "provide",
  "public",
  "pudding",
  "pull",
  "pulp",
  "pulse",
  "pumpkin",
  "punch",
  "pupil",
  "puppy",
  "purchase",
  "purity",
  "purpose",
  "purse",
  "push",
  "put",
  "puzzle",
  "pyramid",
  "quality",
  "quantum",
  "quarter",
  "question",
  "quick",
  "quit",
  "quiz",
  "quote",
  "rabbit",
  "raccoon",
  "race",
  "rack",
  "radar",
  "radio",
  "rail",
  "rain",
  "raise",
  "rally",
  "ramp",
  "ranch",
  "random",
  "range",
  "rapid",
  "rare",
  "rate",
  "rather",
  "raven",
  "raw",
  "razor",
  "ready",
  "real",
  "reason",
  "rebel",
  "rebuild",
  "recall",
  "receive",
  "recipe",
  "record",
  "recycle",
  "reduce",
  "reflect",
  "reform",
  "refuse",
  "region",
  "regret",
  "regular",
  "reject",
  "relax",
  "release",
  "relief",
  "rely",
  "remain",
  "remember",
  "remind",
  "remove",
  "render",
  "renew",
  "rent",
  "reopen",
  "repair",
  "repeat",
  "replace",
  "report",
  "require",
  "rescue",
  "resemble",
  "resist",
  "resource",
  "response",
  "result",
  "retire",
  "retreat",
  "return",
  "reunion",
  "reveal",
  "review",
  "reward",
  "rhythm",
  "rib",
  "ribbon",
  "rice",
  "rich",
  "ride",
  "ridge",
  "rifle",
  "right",
  "rigid",
  "ring",
  "riot",
  "ripple",
  "risk",
  "ritual",
  "rival",
  "river",
  "road",
  "roast",
  "robot",
  "robust",
  "rocket",
  "romance",
  "roof",
  "rookie",
  "room",
  "rose",
  "rotate",
  "rough",
  "round",
  "route",
  "royal",
  "rubber",
  "rude",
  "rug",
  "rule",
  "run",
  "runway",
  "rural",
  "sad",
  "saddle",
  "sadness",
  "safe",
  "sail",
  "salad",
  "salmon",
  "salon",
  "salt",
  "salute",
  "same",
  "sample",
  "sand",
  "satisfy",
  "satoshi",
  "sauce",
  "sausage",
  "save",
  "say",
  "scale",
  "scan",
  "scare",
  "scatter",
  "scene",
  "scheme",
  "school",
  "science",
  "scissors",
  "scorpion",
  "scout",
  "scrap",
  "screen",
  "script",
  "scrub",
  "sea",
  "search",
  "season",
  "seat",
  "second",
  "secret",
  "section",
  "security",
  "seed",
  "seek",
  "segment",
  "select",
  "sell",
  "seminar",
  "senior",
  "sense",
  "sentence",
  "series",
  "service",
  "session",
  "settle",
  "setup",
  "seven",
  "shadow",
  "shaft",
  "shallow",
  "share",
  "shed",
  "shell",
  "sheriff",
  "shield",
  "shift",
  "shine",
  "ship",
  "shiver",
  "shock",
  "shoe",
  "shoot",
  "shop",
  "short",
  "shoulder",
  "shove",
  "shrimp",
  "shrug",
  "shuffle",
  "shy",
  "sibling",
  "sick",
  "side",
  "siege",
  "sight",
  "sign",
  "silent",
  "silk",
  "silly",
  "silver",
  "similar",
  "simple",
  "since",
  "sing",
  "siren",
  "sister",
  "situate",
  "six",
  "size",
  "skate",
  "sketch",
  "ski",
  "skill",
  "skin",
  "skirt",
  "skull",
  "slab",
  "slam",
  "sleep",
  "slender",
  "slice",
  "slide",
  "slight",
  "slim",
  "slogan",
  "slot",
  "slow",
  "slush",
  "small",
  "smart",
  "smile",
  "smoke",
  "smooth",
  "snack",
  "snake",
  "snap",
  "sniff",
  "snow",
  "soap",
  "soccer",
  "social",
  "sock",
  "soda",
  "soft",
  "solar",
  "soldier",
  "solid",
  "solution",
  "solve",
  "someone",
  "song",
  "soon",
  "sorry",
  "sort",
  "soul",
  "sound",
  "soup",
  "source",
  "south",
  "space",
  "spare",
  "spatial",
  "spawn",
  "speak",
  "special",
  "speed",
  "spell",
  "spend",
  "sphere",
  "spice",
  "spider",
  "spike",
  "spin",
  "spirit",
  "split",
  "spoil",
  "sponsor",
  "spoon",
  "sport",
  "spot",
  "spray",
  "spread",
  "spring",
  "spy",
  "square",
  "squeeze",
  "squirrel",
  "stable",
  "stadium",
  "staff",
  "stage",
  "stairs",
  "stamp",
  "stand",
  "start",
  "state",
  "stay",
  "steak",
  "steel",
  "stem",
  "step",
  "stereo",
  "stick",
  "still",
  "sting",
  "stock",
  "stomach",
  "stone",
  "stool",
  "story",
  "stove",
  "strategy",
  "street",
  "strike",
  "strong",
  "struggle",
  "student",
  "stuff",
  "stumble",
  "style",
  "subject",
  "submit",
  "subway",
  "success",
  "such",
  "sudden",
  "suffer",
  "sugar",
  "suggest",
  "suit",
  "summer",
  "sun",
  "sunny",
  "sunset",
  "super",
  "supply",
  "supreme",
  "sure",
  "surface",
  "surge",
  "surprise",
  "surround",
  "survey",
  "suspect",
  "sustain",
  "swallow",
  "swamp",
  "swap",
  "swarm",
  "swear",
  "sweet",
  "swift",
  "swim",
  "swing",
  "switch",
  "sword",
  "symbol",
  "symptom",
  "syrup",
  "system",
  "table",
  "tackle",
  "tag",
  "tail",
  "talent",
  "talk",
  "tank",
  "tape",
  "target",
  "task",
  "taste",
  "tattoo",
  "taxi",
  "teach",
  "team",
  "tell",
  "ten",
  "tenant",
  "tennis",
  "tent",
  "term",
  "test",
  "text",
  "thank",
  "that",
  "theme",
  "then",
  "theory",
  "there",
  "they",
  "thing",
  "this",
  "thought",
  "three",
  "thrive",
  "throw",
  "thumb",
  "thunder",
  "ticket",
  "tide",
  "tiger",
  "tilt",
  "timber",
  "time",
  "tiny",
  "tip",
  "tired",
  "tissue",
  "title",
  "toast",
  "tobacco",
  "today",
  "toddler",
  "toe",
  "together",
  "toilet",
  "token",
  "tomato",
  "tomorrow",
  "tone",
  "tongue",
  "tonight",
  "tool",
  "tooth",
  "top",
  "topic",
  "topple",
  "torch",
  "tornado",
  "tortoise",
  "toss",
  "total",
  "tourist",
  "toward",
  "tower",
  "town",
  "toy",
  "track",
  "trade",
  "traffic",
  "tragic",
  "train",
  "transfer",
  "trap",
  "trash",
  "travel",
  "tray",
  "treat",
  "tree",
  "trend",
  "trial",
  "tribe",
  "trick",
  "trigger",
  "trim",
  "trip",
  "trophy",
  "trouble",
  "truck",
  "true",
  "truly",
  "trumpet",
  "trust",
  "truth",
  "try",
  "tube",
  "tuition",
  "tumble",
  "tuna",
  "tunnel",
  "turkey",
  "turn",
  "turtle",
  "twelve",
  "twenty",
  "twice",
  "twin",
  "twist",
  "two",
  "type",
  "typical",
  "ugly",
  "umbrella",
  "unable",
  "unaware",
  "uncle",
  "uncover",
  "under",
  "undo",
  "unfair",
  "unfold",
  "unhappy",
  "uniform",
  "unique",
  "unit",
  "universe",
  "unknown",
  "unlock",
  "until",
  "unusual",
  "unveil",
  "update",
  "upgrade",
  "uphold",
  "upon",
  "upper",
  "upset",
  "urban",
  "urge",
  "usage",
  "use",
  "used",
  "useful",
  "useless",
  "usual",
  "utility",
  "vacant",
  "vacuum",
  "vague",
  "valid",
  "valley",
  "valve",
  "van",
  "vanish",
  "vapor",
  "various",
  "vast",
  "vault",
  "vehicle",
  "velvet",
  "vendor",
  "venture",
  "venue",
  "verb",
  "verify",
  "version",
  "very",
  "vessel",
  "veteran",
  "viable",
  "vibrant",
  "vicious",
  "victory",
  "video",
  "view",
  "village",
  "vintage",
  "violin",
  "virtual",
  "virus",
  "visa",
  "visit",
  "visual",
  "vital",
  "vivid",
  "vocal",
  "voice",
  "void",
  "volcano",
  "volume",
  "vote",
  "voyage",
  "wage",
  "wagon",
  "wait",
  "walk",
  "wall",
  "walnut",
  "want",
  "warfare",
  "warm",
  "warrior",
  "wash",
  "wasp",
  "waste",
  "water",
  "wave",
  "way",
  "wealth",
  "weapon",
  "wear",
  "weasel",
  "weather",
  "web",
  "wedding",
  "weekend",
  "weird",
  "welcome",
  "west",
  "wet",
  "whale",
  "what",
  "wheat",
  "wheel",
  "when",
  "where",
  "whip",
  "whisper",
  "wide",
  "width",
  "wife",
  "wild",
  "will",
  "win",
  "window",
  "wine",
  "wing",
  "wink",
  "winner",
  "winter",
  "wire",
  "wisdom",
  "wise",
  "wish",
  "witness",
  "wolf",
  "woman",
  "wonder",
  "wood",
  "wool",
  "word",
  "work",
  "world",
  "worry",
  "worth",
  "wrap",
  "wreck",
  "wrestle",
  "wrist",
  "write",
  "wrong",
  "yard",
  "year",
  "yellow",
  "you",
  "young",
  "youth",
  "zebra",
  "zero",
  "zone",
  "zoo"
], t2 = /* @__PURE__ */ ((r) => (r.english = "english", r))(t2 || {});
function Cg(r) {
  return (1 << r) - 1;
}
T(Cg, "getLowerMask");
function wu(r) {
  return (1 << r) - 1 << 8 - r;
}
T(wu, "getUpperMask");
function La(r) {
  return Array.isArray(r) ? r : r.split(/\s+/);
}
T(La, "getWords");
function Bg(r) {
  return Array.isArray(r) ? r.join(" ") : r;
}
T(Bg, "getPhrase");
function vg(r) {
  const t = [0];
  let e = 11;
  for (let i = 0; i < r.length; i += 1)
    e > 8 ? (t[t.length - 1] <<= 8, t[t.length - 1] |= r[i], e -= 8) : (t[t.length - 1] <<= e, t[t.length - 1] |= r[i] >> 8 - e, t.push(r[i] & Cg(8 - e)), e += 3);
  const n = r.length / 4, s = J(zt(r))[0] & wu(n);
  return t[t.length - 1] <<= n, t[t.length - 1] |= s >> 8 - n, t;
}
T(vg, "entropyToMnemonicIndices");
function xg(r, t) {
  const e = Math.ceil(11 * r.length / 8), n = J(new Uint8Array(e));
  let s = 0;
  for (let h = 0; h < r.length; h += 1) {
    const f = t.indexOf(r[h].normalize("NFKD"));
    if (f === -1)
      throw new B(
        L.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${r[h]}' is not found in the provided wordlist.`
      );
    for (let g = 0; g < 11; g += 1)
      f & 1 << 10 - g && (n[s >> 3] |= 1 << 7 - s % 8), s += 1;
  }
  const i = 32 * r.length / 3, a = r.length / 3, o = wu(a);
  if ((J(zt(n.slice(0, i / 8)))[0] & o) !== (n[n.length - 1] & o))
    throw new B(
      L.INVALID_CHECKSUM,
      "Checksum validation failed for the provided mnemonic."
    );
  return n.slice(0, i / 8);
}
T(xg, "mnemonicWordsToEntropy");
var e2 = Ar("Bitcoin seed"), r2 = "0x0488ade4", n2 = "0x04358394", $l = [12, 15, 18, 21, 24];
function Id(r) {
  if (r.length !== 2048)
    throw new B(
      L.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${r.length}.`
    );
}
T(Id, "assertWordList");
function Rg(r) {
  if (r.length % 4 !== 0 || r.length < 16 || r.length > 32)
    throw new B(
      L.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${r.length} bytes.`
    );
}
T(Rg, "assertEntropy");
function ka(r) {
  if (!$l.includes(r.length)) {
    const t = `Invalid mnemonic size. Expected one of [${$l.join(
      ", "
    )}] words, but got ${r.length}.`;
    throw new B(L.INVALID_MNEMONIC, t);
  }
}
T(ka, "assertMnemonic");
var Xe, s2 = (Xe = class {
  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(t = Ba) {
    D(this, "wordlist");
    this.wordlist = t, Id(this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(t) {
    return Xe.mnemonicToEntropy(t, this.wordlist);
  }
  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(t) {
    return Xe.entropyToMnemonic(t, this.wordlist);
  }
  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(t, e = Ba) {
    const n = La(t);
    return ka(n), W(xg(n, e));
  }
  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(t, e = Ba) {
    const n = J(t);
    return Id(e), Rg(n), vg(n).map((s) => e[s]).join(" ");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(t, e = "") {
    ka(La(t));
    const n = Ar(Bg(t)), s = Ar(`mnemonic${e}`);
    return CE(n, s, 2048, 64, "sha512");
  }
  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(t, e = "") {
    const n = Xe.mnemonicToSeed(t, e);
    return Xe.masterKeysFromSeed(n);
  }
  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(t) {
    const e = La(t);
    let n = 0;
    try {
      ka(e);
    } catch {
      return !1;
    }
    for (; n < e.length; ) {
      if (Xe.binarySearch(e[n]) === !1)
        return !1;
      n += 1;
    }
    return !0;
  }
  static binarySearch(t) {
    const e = Ba;
    let n = 0, s = e.length - 1;
    for (; n <= s; ) {
      const i = Math.floor((n + s) / 2);
      if (e[i] === t)
        return !0;
      t < e[i] ? s = i - 1 : n = i + 1;
    }
    return !1;
  }
  /**
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, the default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static masterKeysFromSeed(t) {
    const e = J(t);
    if (e.length < 16 || e.length > 64)
      throw new B(
        L.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${e.length} bytes.`
      );
    return J(cp("sha512", e2, e));
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(t, e = !1) {
    const n = Xe.masterKeysFromSeed(t), s = J(e ? n2 : r2), i = "0x00", a = "0x00000000", o = "0x00000000", d = n.slice(32), h = n.slice(0, 32), f = ct([
      s,
      i,
      a,
      o,
      d,
      ct(["0x00", h])
    ]), g = bo(zt(zt(f)), 0, 4);
    return Nd(ct([f, g]));
  }
  /**
   *  Create a new mnemonic using a randomly generated number as entropy.
   *  As defined in BIP39, the entropy must be a multiple of 32 bits, and its size must be between 128 and 256 bits.
   *  Therefore, the possible values for `strength` are 128, 160, 192, 224, and 256.
   *  If not provided, the default entropy length will be set to 256 bits.
   *  The return is a list of words that encodes the generated entropy.
   *
   *
   * @param size - Number of bytes used as an entropy
   * @param extraEntropy - Optional extra entropy to increase randomness
   * @returns A randomly generated mnemonic
   */
  static generate(t = 32, e = "") {
    const n = e ? zt(ct([er(t), J(e)])) : er(t);
    return Xe.entropyToMnemonic(n);
  }
}, T(Xe, "Mnemonic"), Xe), mu = s2, Sg = 2147483648, Tg = W("0x0488ade4"), yu = W("0x0488b21e"), Ng = W("0x04358394"), bu = W("0x043587cf");
function Ed(r) {
  return Nd(ct([r, bo(zt(zt(r)), 0, 4)]));
}
T(Ed, "base58check");
function Dg(r = !1, t = !1) {
  return r ? t ? bu : yu : t ? Ng : Tg;
}
T(Dg, "getExtendedKeyPrefix");
function Fg(r) {
  return [yu, bu].includes(W(r.slice(0, 4)));
}
T(Fg, "isPublicExtendedKey");
function Qg(r) {
  return [Tg, Ng, yu, bu].includes(
    W(r.slice(0, 4))
  );
}
T(Qg, "isValidExtendedKey");
function Og(r, t = 0) {
  const e = r.split("/");
  if (e.length === 0 || e[0] === "m" && t !== 0)
    throw new B(L.HD_WALLET_ERROR, `invalid path - ${r}`);
  return e[0] === "m" && e.shift(), e.map(
    (n) => ~n.indexOf("'") ? parseInt(n, 10) + Sg : parseInt(n, 10)
  );
}
T(Og, "parsePath");
var hr, i2 = (hr = class {
  /**
   * HDWallet is a implementation of the BIP-0044 and BIP-0032, Multi-Account Hierarchy for Deterministic Wallets
   *
   * @param config - Wallet configurations
   */
  constructor(t) {
    D(this, "depth", 0);
    D(this, "index", 0);
    D(this, "fingerprint", W("0x00000000"));
    D(this, "parentFingerprint", W("0x00000000"));
    D(this, "privateKey");
    D(this, "publicKey");
    D(this, "chainCode");
    if (t.privateKey) {
      const e = new na(t.privateKey);
      this.publicKey = W(e.compressedPublicKey), this.privateKey = W(t.privateKey);
    } else {
      if (!t.publicKey)
        throw new B(
          L.HD_WALLET_ERROR,
          "Both public and private Key cannot be missing. At least one should be provided."
        );
      this.publicKey = W(t.publicKey);
    }
    this.parentFingerprint = t.parentFingerprint || this.parentFingerprint, this.fingerprint = bo(BE(zt(this.publicKey)), 0, 4), this.depth = t.depth || this.depth, this.index = t.index || this.index, this.chainCode = t.chainCode;
  }
  get extendedKey() {
    return this.toExtendedKey();
  }
  /**
   * Derive the current HDWallet instance navigating only on the index.
   * `Ex.: m/44'/0 -> Ex.: m/44'/1 -> m/44'/2`. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
   *
   * @param index - Index of the child HDWallet.
   * @returns A new instance of HDWallet on the derived index
   */
  deriveIndex(t) {
    const e = this.privateKey && J(this.privateKey), n = J(this.publicKey), s = J(this.chainCode), i = new Uint8Array(37);
    if (t & Sg) {
      if (!e)
        throw new B(
          L.HD_WALLET_ERROR,
          "Cannot derive a hardened index without a private Key."
        );
      i.set(e, 1);
    } else
      i.set(J(this.publicKey));
    i.set(Ir(t, 4), 33);
    const a = J(cp("sha512", s, i)), o = a.slice(0, 32), d = a.slice(32);
    if (e) {
      const y = E(o).add(e).mod("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141").toBytes(32);
      return new hr({
        privateKey: y,
        chainCode: d,
        index: t,
        depth: this.depth + 1,
        parentFingerprint: this.fingerprint
      });
    }
    const f = new na(W(o)).addPoint(n);
    return new hr({
      publicKey: f,
      chainCode: d,
      index: t,
      depth: this.depth + 1,
      parentFingerprint: this.fingerprint
    });
  }
  /**
   * Derive the current HDWallet instance to the path. [Learn more](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
   *
   * @param path - The string representation of the child HDWallet. `Ex.: m/44'/0'/0'/0/0`
   * @returns A new instance of HDWallet on the derived path
   */
  derivePath(t) {
    return Og(t, this.depth).reduce((n, s) => n.deriveIndex(s), this);
  }
  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param isPublic - enable to export public extendedKey, it not required when HDWallet didn't have the privateKey.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  toExtendedKey(t = !1, e = !1) {
    if (this.depth >= 256)
      throw new B(
        L.HD_WALLET_ERROR,
        `Exceeded max depth of 255. Current depth: ${this.depth}.`
      );
    const n = Dg(this.privateKey == null || t, e), s = W(Uint8Array.from([this.depth])), i = this.parentFingerprint, a = go(this.index, 4), o = this.chainCode, d = this.privateKey != null && !t ? ct(["0x00", this.privateKey]) : this.publicKey, h = J(ct([n, s, i, a, o, d]));
    return Ed(h);
  }
  /**
   * Create HDWallet instance from seed
   *
   * @param seed - Seed
   * @returns A new instance of HDWallet
   */
  static fromSeed(t) {
    const e = mu.masterKeysFromSeed(t);
    return new hr({
      chainCode: J(e.slice(32)),
      privateKey: J(e.slice(0, 32))
    });
  }
  static fromExtendedKey(t) {
    const e = W(Ir(P_(t))), n = J(e), s = Ed(n.slice(0, 78)) === t;
    if (n.length !== 82 || !Qg(n))
      throw new B(L.HD_WALLET_ERROR, "Provided key is not a valid extended key.");
    if (!s)
      throw new B(L.HD_WALLET_ERROR, "Provided key has an invalid checksum.");
    const i = n[4], a = W(n.slice(5, 9)), o = parseInt(W(n.slice(9, 13)).substring(2), 16), d = W(n.slice(13, 45)), h = n.slice(45, 78);
    if (i === 0 && a !== "0x00000000" || i === 0 && o !== 0)
      throw new B(
        L.HD_WALLET_ERROR,
        "Inconsistency detected: Depth is zero but fingerprint/index is non-zero."
      );
    if (Fg(n)) {
      if (h[0] !== 3)
        throw new B(L.HD_WALLET_ERROR, "Invalid public extended key.");
      return new hr({
        publicKey: h,
        chainCode: d,
        index: o,
        depth: i,
        parentFingerprint: a
      });
    }
    if (h[0] !== 0)
      throw new B(L.HD_WALLET_ERROR, "Invalid private extended key.");
    return new hr({
      privateKey: h.slice(1),
      chainCode: d,
      index: o,
      depth: i,
      parentFingerprint: a
    });
  }
}, T(hr, "HDWallet"), hr), Gc = i2, si, Mg = (si = class extends Vo {
  /**
   * Unlocks the wallet using the provided private key and returns an instance of WalletUnlocked.
   *
   * @param privateKey - The private key used to unlock the wallet.
   * @returns An instance of WalletUnlocked.
   */
  unlock(t) {
    return new hn(t, this._provider);
  }
}, T(si, "WalletLocked"), si), He, hn = (He = class extends Kx {
  /**
   * Locks the wallet and returns an instance of WalletLocked.
   *
   * @returns An instance of WalletLocked.
   */
  lock() {
    return this.signer = () => new na("0x00"), new Mg(this.address, this._provider);
  }
  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An instance of WalletUnlocked.
   */
  static generate(t) {
    const e = na.generatePrivateKey(t == null ? void 0 : t.entropy);
    return new He(e, t == null ? void 0 : t.provider);
  }
  /**
   * Create a Wallet Unlocked from a seed.
   *
   * @param seed - The seed phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromSeed(t, e, n) {
    const i = Gc.fromSeed(t).derivePath(e || He.defaultPath);
    return new He(i.privateKey, n);
  }
  /**
   * Create a Wallet Unlocked from a mnemonic phrase.
   *
   * @param mnemonic - The mnemonic phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @param passphrase - The passphrase for the mnemonic (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromMnemonic(t, e, n, s) {
    const i = mu.mnemonicToSeed(t, n), o = Gc.fromSeed(i).derivePath(e || He.defaultPath);
    return new He(o.privateKey, s);
  }
  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An instance of WalletUnlocked.
   */
  static fromExtendedKey(t, e) {
    const n = Gc.fromExtendedKey(t);
    return new He(n.privateKey, e);
  }
  /**
   * Create a Wallet Unlocked from an encrypted JSON.
   *
   * @param jsonWallet - The encrypted JSON keystore.
   * @param password - The password to decrypt the JSON.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static async fromEncryptedJson(t, e, n) {
    const s = await Eg(t, e);
    return new He(s, n);
  }
}, T(He, "WalletUnlocked"), He), cr, Ke = (cr = class {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(t, e) {
    return new Mg(t, e);
  }
  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(t, e) {
    return new hn(t, e);
  }
}, T(cr, "Wallet"), /**
 * Generate a new Wallet Unlocked with a random key pair.
 *
 * @param generateOptions - Options to customize the generation process (optional).
 * @returns An unlocked wallet instance.
 */
D(cr, "generate", hn.generate), /**
 * Create a Wallet Unlocked from a seed.
 *
 * @param seed - The seed phrase.
 * @param provider - A Provider instance (optional).
 * @param path - The derivation path (optional).
 * @returns An unlocked wallet instance.
 */
D(cr, "fromSeed", hn.fromSeed), /**
 * Create a Wallet Unlocked from a mnemonic phrase.
 *
 * @param mnemonic - The mnemonic phrase.
 * @param provider - A Provider instance (optional).
 * @param path - The derivation path (optional).
 * @param passphrase - The passphrase for the mnemonic (optional).
 * @returns An unlocked wallet instance.
 */
D(cr, "fromMnemonic", hn.fromMnemonic), /**
 * Create a Wallet Unlocked from an extended key.
 *
 * @param extendedKey - The extended key.
 * @param provider - A Provider instance (optional).
 * @returns An unlocked wallet instance.
 */
D(cr, "fromExtendedKey", hn.fromExtendedKey), /**
 * Create a Wallet Unlocked from an encrypted JSON.
 *
 * @param jsonWallet - The encrypted JSON keystore.
 * @param password - The password to decrypt the JSON.
 * @param provider - A Provider instance (optional).
 * @returns An unlocked wallet instance.
 */
D(cr, "fromEncryptedJson", hn.fromEncryptedJson), cr), ii, a2 = (ii = class {
  constructor() {
    D(this, "storage", /* @__PURE__ */ new Map());
  }
  async getItem(t) {
    return await this.storage.get(t);
  }
  async setItem(t, e) {
    await this.storage.set(t, e);
  }
  async removeItem(t) {
    await this.storage.delete(t);
  }
  async clear() {
    await this.storage.clear();
  }
}, T(ii, "MemoryStorage"), ii), Cn, Zr, o2 = (Cn = class {
  constructor(t) {
    Ie(this, Zr);
    D(this, "pathKey", "{}");
    D(this, "rootPath", `m/44'/1179993420'/${this.pathKey}'/0/0`);
    D(this, "numberOfAccounts", 0);
    Ut(this, Zr, t.secret || mu.generate()), this.rootPath = t.rootPath || this.rootPath, this.numberOfAccounts = t.numberOfAccounts || 1;
  }
  getDerivePath(t) {
    return this.rootPath.includes(this.pathKey) ? this.rootPath.replace(this.pathKey, String(t)) : `${this.rootPath}/${t}`;
  }
  serialize() {
    return {
      secret: ht(this, Zr),
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts
    };
  }
  getAccounts() {
    const t = [];
    let e = 0;
    do {
      const n = Ke.fromMnemonic(ht(this, Zr), this.getDerivePath(e));
      t.push({
        publicKey: n.publicKey,
        address: n.address
      }), e += 1;
    } while (e < this.numberOfAccounts);
    return t;
  }
  addAccount() {
    this.numberOfAccounts += 1;
    const t = Ke.fromMnemonic(ht(this, Zr), this.getDerivePath(this.numberOfAccounts - 1));
    return {
      publicKey: t.publicKey,
      address: t.address
    };
  }
  exportAccount(t) {
    let e = 0;
    const n = new wt(t);
    do {
      const s = Ke.fromMnemonic(ht(this, Zr), this.getDerivePath(e));
      if (s.address.equals(n))
        return s.privateKey;
      e += 1;
    } while (e < this.numberOfAccounts);
    throw new B(
      L.WALLET_MANAGER_ERROR,
      `Account with address '${t}' not found in derived wallets.`
    );
  }
  getWallet(t) {
    const e = this.exportAccount(t);
    return Ke.fromPrivateKey(e);
  }
}, Zr = new WeakMap(), T(Cn, "MnemonicVault"), D(Cn, "type", "mnemonic"), Cn), Bn, Mr, c2 = (Bn = class {
  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(t = {}) {
    Ie(this, Mr, []);
    t.secret ? Ut(this, Mr, [t.secret]) : Ut(this, Mr, t.accounts || [Ke.generate().privateKey]);
  }
  serialize() {
    return {
      accounts: ht(this, Mr)
    };
  }
  getPublicAccount(t) {
    const e = Ke.fromPrivateKey(t);
    return {
      address: e.address,
      publicKey: e.publicKey
    };
  }
  getAccounts() {
    return ht(this, Mr).map((t) => this.getPublicAccount(t));
  }
  addAccount() {
    const t = Ke.generate();
    return ht(this, Mr).push(t.privateKey), this.getPublicAccount(t.privateKey);
  }
  exportAccount(t) {
    const e = new wt(t), n = ht(this, Mr).find(
      (s) => Ke.fromPrivateKey(s).address.equals(e)
    );
    if (!n)
      throw new B(
        L.WALLET_MANAGER_ERROR,
        `No private key found for address '${t}'.`
      );
    return n;
  }
  getWallet(t) {
    const e = this.exportAccount(t);
    return Ke.fromPrivateKey(e);
  }
}, Mr = new WeakMap(), T(Bn, "PrivateKeyVault"), D(Bn, "type", "privateKey"), Bn), Fr = {
  invalid_vault_type: "The provided Vault type is invalid.",
  address_not_found: "No private key found for address the specified wallet address.",
  vault_not_found: "The specified vault was not found.",
  wallet_not_unlocked: "The wallet is currently locked."
};
function fr(r, t) {
  if (!r)
    throw new B(L.WALLET_MANAGER_ERROR, t);
}
T(fr, "assert");
var $r, Me, Jr, dr, Ri, Pg, Lg, QR = ($r = class extends nf.EventEmitter {
  constructor(e) {
    super();
    Ie(this, Ri);
    /**
     * Storage
     *
     * Persistent encrypted data. `The default storage works only on memory`.
     */
    D(this, "storage", new a2());
    /* Key name passed to the storage */
    D(this, "STORAGE_KEY", "WalletManager");
    // `This variables are only accessible from inside the class`
    Ie(this, Me, []);
    Ie(this, Jr, "");
    Ie(this, dr, !0);
    this.storage = (e == null ? void 0 : e.storage) || this.storage;
  }
  get isLocked() {
    return ht(this, dr);
  }
  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault(e) {
    fr(!ht(this, dr), Fr.wallet_not_unlocked);
    const n = ht(this, Me).find((s, i) => i === e);
    return fr(n, Fr.vault_not_found), n.vault.serialize();
  }
  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults() {
    return ht(this, Me).map((e, n) => ({
      title: e.title,
      type: e.type,
      vaultId: n
    }));
  }
  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts() {
    return ht(this, Me).flatMap(
      (e, n) => e.vault.getAccounts().map((s) => ({ ...s, vaultId: n }))
    );
  }
  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(e) {
    const n = new wt(e), s = ht(this, Me).find(
      (i) => i.vault.getAccounts().find((a) => a.address.equals(n))
    );
    return fr(s, Fr.address_not_found), s.vault.getWallet(n);
  }
  /**
   * Export specific account privateKey
   */
  exportPrivateKey(e) {
    const n = new wt(e);
    fr(!ht(this, dr), Fr.wallet_not_unlocked);
    const s = ht(this, Me).find(
      (i) => i.vault.getAccounts().find((a) => a.address.equals(n))
    );
    return fr(s, Fr.address_not_found), s.vault.exportAccount(n);
  }
  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(e) {
    await this.loadState();
    const n = ht(this, Me)[(e == null ? void 0 : e.vaultId) || 0];
    await fr(n, Fr.vault_not_found);
    const s = n.vault.addAccount();
    return await this.saveState(), s;
  }
  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(e) {
    ht(this, Me).splice(e, 1), await this.saveState();
  }
  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(e) {
    await this.loadState();
    const n = this.getVaultClass(e.type), s = new n(e);
    Ut(this, Me, ht(this, Me).concat({
      title: e.title,
      type: e.type,
      vault: s
    })), await this.saveState();
  }
  /**
   * Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
   * secrets.
   */
  lock() {
    Ut(this, dr, !0), Ut(this, Me, []), Ut(this, Jr, ""), this.emit("lock");
  }
  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(e) {
    Ut(this, Jr, e), Ut(this, dr, !1);
    try {
      await this.loadState(), this.emit("unlock");
    } catch (n) {
      throw await this.lock(), n;
    }
  }
  /**
   * Update WalletManager encryption passphrase
   */
  async updatePassphrase(e, n) {
    const s = ht(this, dr);
    await this.unlock(e), Ut(this, Jr, n), await this.saveState(), await this.loadState(), s && await this.lock();
  }
  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await fr(!ht(this, dr), Fr.wallet_not_unlocked);
    const e = await this.storage.getItem(this.STORAGE_KEY);
    if (e) {
      const n = await yE(ht(this, Jr), JSON.parse(e));
      Ut(this, Me, an(this, Ri, Lg).call(this, n.vaults));
    }
  }
  /**
   * Store encrypted WalletManager state on storage
   */
  async saveState() {
    await fr(!ht(this, dr), Fr.wallet_not_unlocked);
    const e = await bE(ht(this, Jr), {
      vaults: an(this, Ri, Pg).call(this, ht(this, Me))
    });
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(e)), this.emit("update");
  }
  /**
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  getVaultClass(e) {
    const n = $r.Vaults.find((s) => s.type === e);
    return fr(n, Fr.invalid_vault_type), n;
  }
}, Me = new WeakMap(), Jr = new WeakMap(), dr = new WeakMap(), Ri = new WeakSet(), /**
 * Serialize all vaults to store
 *
 * `This is only accessible from inside the class`
 */
Pg = function(e) {
  return e.map(({ title: n, type: s, vault: i }) => ({
    title: n,
    type: s,
    data: i.serialize()
  }));
}, /**
 * Deserialize all vaults to state
 *
 * `This is only accessible from inside the class`
 */
Lg = function(e) {
  return e.map(({ title: n, type: s, data: i }) => {
    const a = this.getVaultClass(s);
    return {
      title: n,
      type: s,
      vault: new a(i)
    };
  });
}, T($r, "WalletManager"), /**
 * Vaults
 *
 * Vaults are responsible to store secret keys and return an `Wallet` instance,
 * to interact with the network.
 *
 * Each vault has access to its own state
 *
 */
D($r, "Vaults", [o2, c2]), $r), vn, OR = (vn = class {
  constructor(t) {
    throw new B(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  serialize() {
    throw new B(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  getAccounts() {
    throw new B(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  addAccount() {
    throw new B(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  exportAccount(t) {
    throw new B(L.NOT_IMPLEMENTED, "Not implemented.");
  }
  getWallet(t) {
    throw new B(L.NOT_IMPLEMENTED, "Not implemented.");
  }
}, T(vn, "Vault"), D(vn, "type"), vn), ai, MR = (ai = class {
}, T(ai, "StorageAbstract"), ai), d2 = 32, De = 16, Je = 17, jn = 18, u2 = 8, h2 = 8, A2 = 16;
function kg(r) {
  const [t] = new rt("u64").decode(r, h2);
  return t.toNumber();
}
T(kg, "getBytecodeDataOffset");
function Wo(r) {
  const [t] = new rt("u64").decode(r, A2);
  return t.toNumber();
}
T(Wo, "getBytecodeConfigurableOffset");
function Ug(r) {
  const t = Wo(r), e = r.slice(0, t);
  return zt(e);
}
T(Ug, "getBytecodeId");
function l2(r) {
  const t = kg(r), e = r.slice(0, t);
  return zt(e);
}
T(l2, "getLegacyBlobId");
function Gg(r, t) {
  const { RegId: e, Instruction: n } = __, s = e.pc().to_u8(), i = e.sp().to_u8(), a = e.is().to_u8(), o = /* @__PURE__ */ T((x) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    ln(De, s),
    // hold the address of the blob ID.
    mr(
      De,
      De,
      x * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    ln(Je, i),
    // REG_GENERAL_USE to hold the size of the blob.
    Ha(jn, De),
    // Push the blob contents onto the stack.
    Yi(De, 0, jn, 1),
    // Move on to the data section length
    mr(De, De, d2),
    // load the size of the data section into REG_GENERAL_USE
    qi(jn, De, 0),
    // after we have read the length of the data section, we move the pointer to the actual
    // data by skipping WORD_SIZE bytes.
    mr(De, De, u2),
    // load the data section of the executable
    Yi(De, 0, jn, 2),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    Ga(Je, Je, a),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    Xa(Je, Je, 4),
    // Jump to the start of the contract we loaded.
    za(Je)
  ], "getInstructions"), d = /* @__PURE__ */ T((x) => [
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    // 1. Load the blob content into memory
    // Find the start of the hardcoded blob ID, which is located after the loader code ends.
    ln(De, s),
    // hold the address of the blob ID.
    mr(
      De,
      De,
      x * n.size()
    ),
    // The code is going to be loaded from the current value of SP onwards, save
    // the location into REG_START_OF_LOADED_CODE so we can jump into it at the end.
    ln(Je, i),
    // REG_GENERAL_USE to hold the size of the blob.
    Ha(jn, De),
    // Push the blob contents onto the stack.
    Yi(De, 0, jn, 1),
    // Jump into the memory where the contract is loaded.
    // What follows is called _jmp_mem by the sway compiler.
    // Subtract the address contained in IS because jmp will add it back.
    Ga(Je, Je, a),
    // jmp will multiply by 4, so we need to divide to cancel that out.
    Xa(Je, Je, 4),
    // Jump to the start of the contract we loaded.
    za(Je)
  ], "getInstructionsNoDataSection"), h = Wo(r);
  if (r.length < h)
    throw new Error(
      `Data section offset is out of bounds, offset: ${h}, binary length: ${r.length}`
    );
  const f = r.slice(h);
  if (f.length > 0) {
    const x = o(0).length;
    if (x > 65535)
      throw new Error("Too many instructions, exceeding u16::MAX.");
    const N = new Uint8Array(
      o(x).flatMap(
        (M) => Array.from(M.to_bytes())
      )
    ), U = new Uint8Array(t), H = new Uint8Array(8);
    new DataView(H.buffer).setBigUint64(0, BigInt(f.length), !1);
    const P = new Uint8Array([
      ...N,
      ...U,
      ...H
    ]);
    return {
      loaderBytecode: ct([P, f]),
      blobOffset: P.length
    };
  }
  const g = d(0).length;
  if (g > 65535)
    throw new Error("Too many instructions, exceeding u16::MAX.");
  const y = new Uint8Array(
    d(g).flatMap(
      (x) => Array.from(x.to_bytes())
    )
  ), R = new Uint8Array(t);
  return { loaderBytecode: new Uint8Array([...y, ...R]) };
}
T(Gg, "getPredicateScriptLoaderInstructions");
async function zg(r, t) {
  const { assembledRequest: e } = await r.provider.assembleTx({
    request: t,
    feePayerAccount: r,
    accountCoinQuantities: []
  });
  return e;
}
T(zg, "fundBlobTx");
function Xg(r, t) {
  const { configurables: e } = r, n = [];
  return e.forEach((s) => {
    n.push({ ...s, offset: s.offset - t });
  }), { ...r, configurables: n };
}
T(Xg, "adjustConfigurableOffsets");
async function Iu({
  deployer: r,
  bytecode: t,
  abi: e,
  loaderInstanceCallback: n
}) {
  const s = Ug(J(t)), i = Wo(J(t)), a = t.slice(0, i), o = new _o({
    blobId: s,
    witnessIndex: 0,
    witnesses: [a]
  }), { loaderBytecode: d, blobOffset: h } = Gg(
    J(t),
    J(s)
  ), f = a.length - (h || 0), g = Xg(e, f), y = (await r.provider.getBlobs([s])).length > 0, R = n(d, g);
  if (y)
    return {
      waitForResult: /* @__PURE__ */ T(() => Promise.resolve(R), "waitForResult"),
      blobId: s
    };
  const Q = await zg(r, o);
  return {
    waitForResult: /* @__PURE__ */ T(async () => {
      try {
        if ((await (await r.sendTransaction(Q)).waitForResult()).status !== "success")
          throw new Error();
      } catch {
        throw new B(L.TRANSACTION_FAILED, "Failed to deploy predicate chunk");
      }
      return R;
    }, "waitForResult"),
    blobId: s
  };
}
T(Iu, "deployScriptOrPredicate");
var _2 = /* @__PURE__ */ T((r) => {
  const e = J(r), n = N_(e, 16384), s = Kd(n.map((a) => W(a)));
  return _r(ct(["0x4655454C", s]));
}, "getPredicateRoot"), wr, PR = (wr = class extends Vo {
  /**
   * Creates an instance of the Predicate class.
   *
   * @param bytecode - The bytecode of the predicate.
   * @param abi - The JSON ABI of the predicate.
   * @param provider - The provider used to interact with the blockchain.
   * @param data - The predicate input data (optional).
   * @param configurableConstants - Optional configurable constants for the predicate.
   */
  constructor({
    bytecode: e,
    abi: n,
    provider: s,
    data: i,
    configurableConstants: a
  }) {
    const { predicateBytes: o, predicateInterface: d } = wr.processPredicateData(
      e,
      n,
      a
    ), h = new wt(_2(o));
    super(h, s);
    D(this, "bytes");
    D(this, "predicateData", []);
    D(this, "interface");
    D(this, "initialBytecode");
    D(this, "configurableConstants");
    this.initialBytecode = J(e), this.bytes = o, this.interface = d, this.configurableConstants = a, i !== void 0 && i.length > 0 && (this.predicateData = i);
  }
  /**
   * Populates the transaction data with predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns The transaction request with predicate data.
   */
  populateTransactionPredicateData(e) {
    const n = Te(e), s = this.getIndexFromPlaceholderWitness(n);
    return s !== -1 && n.removeWitness(s), n.inputs.filter(ko).forEach((i) => {
      gd(i, this.address) && (i.predicate = W(this.bytes), i.predicateData = W(this.getPredicateData()), i.witnessIndex = 0);
    }), n;
  }
  /**
   * Sends a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the transaction response.
   */
  sendTransaction(e) {
    const n = Te(e);
    return super.sendTransaction(n, { estimateTxDependencies: !1 });
  }
  /**
   * Simulates a transaction with the populated predicate data.
   *
   * @param transactionRequestLike - The transaction request-like object.
   * @returns A promise that resolves to the call result.
   */
  simulateTransaction(e) {
    const n = Te(e);
    return super.simulateTransaction(n, { estimateTxDependencies: !1 });
  }
  /**
   * Retrieves the properly encoded predicate data.
   *
   * @returns A Uint8Array containing the encoded predicate data. If no predicate data is available, returns an empty Uint8Array.
   */
  getPredicateData() {
    var n;
    if (!this.predicateData.length)
      return new Uint8Array();
    const e = (n = this.interface) == null ? void 0 : n.functions.main;
    return (e == null ? void 0 : e.encodeArguments(this.predicateData)) || new Uint8Array();
  }
  /**
   * Creates a new Predicate instance from an existing Predicate instance.
   * @param overrides - The data and configurable constants to override.
   * @returns A new Predicate instance with the same bytecode, ABI and provider but with the ability to set the data and configurable constants.
   */
  toNewInstance(e = {}) {
    return new wr({
      bytecode: this.initialBytecode,
      abi: this.interface.jsonAbi,
      provider: this.provider,
      data: e.data ?? this.predicateData,
      configurableConstants: e.configurableConstants ?? this.configurableConstants
    });
  }
  /**
   * Sets the predicate data.
   *
   * @param data - The data to be set for the predicate.
   */
  setData(e) {
    this.predicateData = e;
  }
  /**
   * Processes the predicate data and returns the altered bytecode and interface.
   *
   * @param bytes - The bytes of the predicate.
   * @param jsonAbi - The JSON ABI of the predicate.
   * @param configurableConstants - Optional configurable constants for the predicate.
   * @returns An object containing the new predicate bytes and interface.
   */
  static processPredicateData(e, n, s) {
    let i = J(e);
    const a = new rr(n);
    if (a.functions.main === void 0)
      throw new B(
        L.ABI_MAIN_METHOD_MISSING,
        'Cannot use ABI without "main" function.'
      );
    return s && Object.keys(s).length && (i = wr.setConfigurableConstants(
      i,
      s,
      a
    )), {
      predicateBytes: i,
      predicateInterface: a
    };
  }
  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param resourcesIdsToIgnore - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(e, n) {
    return (await this.provider.getResourcesToSpend(
      this.address,
      e,
      n
    )).map((i) => ({
      ...i,
      predicate: W(this.bytes),
      predicateData: W(this.getPredicateData())
    }));
  }
  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(e) {
    return super.generateFakeResources(e).map((n) => ({
      ...n,
      predicate: W(this.bytes),
      predicateData: W(this.getPredicateData())
    }));
  }
  /**
   * Sets the configurable constants for the predicate.
   *
   * @param bytes - The bytes of the predicate.
   * @param configurableConstants - Configurable constants to be set.
   * @param abiInterface - The ABI interface of the predicate.
   * @returns The mutated bytes with the configurable constants set.
   */
  static setConfigurableConstants(e, n, s) {
    const i = e;
    try {
      if (Object.keys(s.configurables).length === 0)
        throw new B(
          L.INVALID_CONFIGURABLE_CONSTANTS,
          "Predicate has no configurable constants to be set"
        );
      Object.entries(n).forEach(([a, o]) => {
        if (!(s != null && s.configurables[a]))
          throw new B(
            L.CONFIGURABLE_NOT_FOUND,
            `No configurable constant named '${a}' found in the Predicate`
          );
        const { offset: d } = s.configurables[a], h = s.encodeConfigurable(a, o);
        i.set(h, d);
      });
    } catch (a) {
      throw new B(
        L.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${a.message}.`
      );
    }
    return i;
  }
  /**
   * Returns the index of the witness placeholder that was added to this predicate.
   * If no witness placeholder was added, it returns -1.
   * @param request - The transaction request.
   * @returns The index of the witness placeholder, or -1 if there is no witness placeholder.
   */
  getIndexFromPlaceholderWitness(e) {
    var a;
    const n = e.inputs.filter(zn).filter((o) => gd(o, this.address));
    let s = -1;
    const i = n.find((o) => !o.predicate);
    return i && (s = i.witnessIndex, n.every((d) => !d.predicate) || (a = n[0]) != null && a.predicate && (s = -1)), s;
  }
  /**
   *
   * @param account - The account used to pay the deployment costs.
   * @returns The _blobId_ and a _waitForResult_ callback that returns the deployed predicate
   * once the blob deployment transaction finishes.
   *
   * The returned loader predicate will have the same configurable constants
   * as the original predicate which was used to generate the loader predicate.
   */
  async deploy(e) {
    return Iu({
      deployer: e,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: /* @__PURE__ */ T((n, s) => new wr({
        bytecode: n,
        abi: s,
        provider: this.provider,
        data: this.predicateData
      }), "loaderInstanceCallback")
    });
  }
}, T(wr, "Predicate"), wr), Hg = /* @__PURE__ */ ((r) => (r.ping = "ping", r.version = "version", r.connect = "connect", r.disconnect = "disconnect", r.isConnected = "isConnected", r.accounts = "accounts", r.currentAccount = "currentAccount", r.signTransaction = "signTransaction", r.signMessage = "signMessage", r.sendTransaction = "sendTransaction", r.assets = "assets", r.addAsset = "addAsset", r.addAssets = "addAssets", r.networks = "networks", r.currentNetwork = "currentNetwork", r.addNetwork = "addNetwork", r.selectNetwork = "selectNetwork", r.addABI = "addABI", r.getABI = "getABI", r.hasABI = "hasABI", r))(Hg || {}), Eu = /* @__PURE__ */ ((r) => (r.connectors = "connectors", r.currentConnector = "currentConnector", r.connection = "connection", r.accounts = "accounts", r.currentAccount = "currentAccount", r.networks = "networks", r.currentNetwork = "currentNetwork", r.assets = "assets", r.abis = "abis", r))(Eu || {}), Vg = "FuelConnector", oi, p2 = (oi = class {
  constructor(t) {
    D(this, "storage");
    this.storage = t;
  }
  async setItem(t, e) {
    this.storage.setItem(t, e);
  }
  async getItem(t) {
    return this.storage.getItem(t);
  }
  async removeItem(t) {
    this.storage.removeItem(t);
  }
  async clear() {
    this.storage.clear();
  }
}, T(oi, "LocalStorage"), oi), ci, f2 = (ci = class extends nf.EventEmitter {
  constructor() {
    super(...arguments);
    D(this, "name", "");
    D(this, "metadata", {});
    D(this, "connected", !1);
    D(this, "installed", !1);
    D(this, "external", !0);
    D(this, "events", Eu);
  }
  /**
   * Should return true if the connector is loaded
   * in less then one second.
   *
   * @returns Always true.
   */
  async ping() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current version of the connector
   * and the network version that is compatible.
   *
   * @returns boolean - connection status.
   */
  async version() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the connector is connected
   * to any of the accounts available.
   *
   * @returns The connection status.
   */
  async isConnected() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the accounts authorized for the
   * current connection.
   *
   * @returns The accounts addresses strings
   */
  async accounts() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the connection process and return
   * true if the account authorize the connection.
   *
   * and return false if the user reject the connection.
   *
   * @emits accounts
   * @returns boolean - connection status.
   */
  async connect() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should disconnect the current connection and
   * return false if the disconnection was successful.
   *
   * @emits assets connection
   * @returns The connection status.
   */
  async disconnect() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the sign message process and return
   * the signed message.
   *
   * @param address - The address to sign the message
   * @param message - The message to sign all text will be treated as text utf-8
   *
   * @returns Message signature
   */
  async signMessage(e, n) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the sign transaction process and return
   * the signed transaction.
   *
   * @param address - The address to sign the transaction
   * @param transaction - The transaction to sign
   *
   * @returns Transaction signature
   */
  async signTransaction(e, n, s) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the send transaction process and return
   * the transaction id submitted to the network.
   *
   * If the network is not available for the connection
   * it should throw an error to avoid the transaction
   * to be sent to the wrong network and lost.
   *
   * @param address - The address to sign the transaction
   * @param transaction - The transaction to send
   * @param params - Optional parameters to send the transaction
   * @returns The transaction id or transaction response
   */
  async sendTransaction(e, n, s) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current account selected inside the connector, if the account
   * is authorized for the connection.
   *
   * If the account is not authorized it should return null.
   *
   * @returns The current account selected otherwise null.
   */
  async currentAccount() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the assets metadata to the connector and return true if the asset
   * was added successfully.
   *
   * If the asset already exists it should throw an error.
   *
   * @emits assets
   * @param assets - The assets to add the metadata to the connection.
   * @throws Error if the asset already exists
   * @returns True if the asset was added successfully
   */
  async addAssets(e) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the asset metadata to the connector and return true if the asset
   * was added successfully.
   *
   * If the asset already exists it should throw an error.
   *
   * @emits assets
   * @param asset - The asset to add the metadata to the connection.
   * @throws Error if the asset already exists
   * @returns True if the asset was added successfully
   */
  async addAsset(e) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the assets added to the connector. If a connection is already established.
   *
   * @returns Array of assets metadata from the connector vinculated to the all accounts from a specific Wallet.
   */
  async assets() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the add network process and return true if the network was added successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param networkUrl - The URL of the network to be added.
   * @returns Return true if the network was added successfully
   */
  async addNetwork(e) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should start the select network process and return true if the network has change successfully.
   *
   * @emits networks
   * @throws Error if the network already exists
   * @param network - The network to be selected.
   * @returns Return true if the network was added successfully
   */
  async selectNetwork(e) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return all the networks available from the connector. If the connection is already established.
   *
   * @returns Return all the networks added to the connector.
   */
  async networks() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the current network selected inside the connector. Even if the connection is not established.
   *
   * @returns Return the current network selected inside the connector.
   */
  async currentNetwork() {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should add the ABI to the connector and return true if the ABI was added successfully.
   *
   * @param contractId - The contract id to add the ABI.
   * @param abi - The JSON ABI that represents a contract.
   * @returns Return true if the ABI was added successfully.
   */
  async addABI(e, n) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return the ABI from the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the ABI.
   * @returns The ABI if it exists, otherwise return null.
   */
  async getABI(e) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Should return true if the abi exists in the connector vinculated to the all accounts from a specific Wallet.
   *
   * @param id - The contract id to get the abi
   * @returns Returns true if the abi exists or false if not.
   */
  async hasABI(e) {
    throw new B(B.CODES.NOT_IMPLEMENTED, "Method not implemented.");
  }
  /**
   * Event listener for the connector.
   *
   * @param eventName - The event name to listen
   * @param listener - The listener function
   */
  on(e, n) {
    return super.on(e, n), this;
  }
}, T(ci, "FuelConnector"), ci);
function Wg(r, { cache: t, cacheTime: e, key: n }) {
  return async (...s) => {
    var a, o, d;
    if (t[n] && ((a = t[n]) != null && a.value))
      return (o = t[n]) == null ? void 0 : o.value;
    clearTimeout((d = t[n]) == null ? void 0 : d.timeout);
    const i = await r(...s);
    return t[n] = {
      timeout: Number(
        setTimeout(() => {
          t[n] = null;
        }, e)
      ),
      value: i
    }, i;
  };
}
T(Wg, "cacheFor");
function g2(r) {
  window.dispatchEvent(
    new CustomEvent(Vg, {
      detail: r
    })
  );
}
T(g2, "dispatchFuelConnectorEvent");
function Yg() {
  const r = {};
  return r.promise = new Promise((t, e) => {
    r.reject = e, r.resolve = t;
  }), r;
}
T(Yg, "deferPromise");
async function Wi(r, t = 1050) {
  const e = new Promise((n, s) => {
    setTimeout(() => {
      s(new B(B.CODES.TIMEOUT_EXCEEDED, "Promise timed out"));
    }, t);
  });
  return Promise.race([e, r]);
}
T(Wi, "withTimeout");
var w2 = 2e3, m2 = 5e3, { warn: y2 } = console, tr, LR = (tr = class extends f2 {
  constructor(e = tr.defaultConfig) {
    super();
    D(this, "_storage", null);
    D(this, "_connectors", []);
    D(this, "_targetObject", null);
    D(this, "_unsubscribes", []);
    D(this, "_targetUnsubscribe", /* @__PURE__ */ T(() => {
    }, "_targetUnsubscribe"));
    D(this, "_pingCache", {});
    D(this, "_currentConnector");
    D(this, "_initializationPromise", null);
    /**
     * Setup a listener for the FuelConnector event and add the connector
     * to the list of new connectors.
     */
    D(this, "setupConnectorListener", /* @__PURE__ */ T(() => {
      const { _targetObject: e } = this, n = Vg;
      if (e != null && e.on)
        return e.on(n, this.addConnector), () => {
          var s;
          (s = e.off) == null || s.call(e, n, this.addConnector);
        };
      if (e != null && e.addEventListener) {
        const s = /* @__PURE__ */ T((i) => {
          this.addConnector(i.detail);
        }, "handler");
        return e.addEventListener(n, s), () => {
          var i;
          (i = e.removeEventListener) == null || i.call(e, n, s);
        };
      }
      return () => {
      };
    }, "setupConnectorListener"));
    /**
     * Add a new connector to the list of connectors.
     */
    D(this, "addConnector", /* @__PURE__ */ T(async (e) => {
      this.getConnector(e) || this._connectors.push(e), await this.fetchConnectorStatus(e), this.emit(this.events.connectors, this._connectors), this._currentConnector || await this.selectConnector(e.name, {
        emitEvents: !1
      });
    }, "addConnector"));
    D(this, "triggerConnectorEvents", /* @__PURE__ */ T(async () => {
      const [e, n, s] = await Promise.all([
        this.isConnected(),
        this.networks(),
        this.currentNetwork()
      ]);
      if (this.emit(this.events.connection, e), this.emit(this.events.networks, n), this.emit(this.events.currentNetwork, s), e) {
        const [i, a] = await Promise.all([
          this.accounts(),
          this.currentAccount()
        ]);
        this.emit(this.events.accounts, i), this.emit(this.events.currentAccount, a);
      }
    }, "triggerConnectorEvents"));
    /**
     * Get a connector from the list of connectors.
     */
    D(this, "getConnector", /* @__PURE__ */ T((e) => this._connectors.find((n) => {
      const s = typeof e == "string" ? e : e.name;
      return n.name === s || n === e;
    }) || null, "getConnector"));
    this.setMaxListeners(1e3), this._connectors = e.connectors ?? [], this._targetObject = this.getTargetObject(e.targetObject), this._storage = e.storage === void 0 ? this.getStorage() : e.storage, this.setupMethods(), this._initializationPromise = this.initialize();
  }
  async initialize() {
    try {
      const e = this.setDefaultConnector();
      this._targetUnsubscribe = this.setupConnectorListener(), await e;
    } catch {
      throw new B(L.INVALID_PROVIDER, "Error initializing Fuel Connector");
    }
  }
  async init() {
    return await this._initializationPromise, this;
  }
  /**
   * Return the target object to listen for global events.
   */
  getTargetObject(e) {
    return e || (typeof window < "u" ? window : typeof document < "u" ? document : null);
  }
  /**
   * Return the storage used.
   */
  getStorage() {
    if (typeof window < "u")
      return new p2(window.localStorage);
  }
  /**
   * Setup the default connector from the storage.
   */
  async setDefaultConnector() {
    var n, s;
    const e = await ((n = this._storage) == null ? void 0 : n.getItem(tr.STORAGE_KEY)) || ((s = this._connectors[0]) == null ? void 0 : s.name);
    if (e)
      return this.selectConnector(e, {
        emitEvents: !1
      });
  }
  /**
   * Start listener for all the events of the current
   * connector and emit them to the Fuel instance
   */
  setupConnectorEvents(e) {
    if (!this._currentConnector)
      return;
    const n = this._currentConnector;
    this._unsubscribes.map((s) => s()), this._unsubscribes = e.map((s) => {
      const i = /* @__PURE__ */ T((...a) => this.emit(s, ...a), "handler");
      return n.on(s, i), () => n.off(s, i);
    });
  }
  /**
   * Call method from the current connector.
   */
  async callMethod(e, ...n) {
    const s = await this.hasConnector();
    if (await this.pingConnector(), !this._currentConnector || !s)
      throw new B(
        L.MISSING_CONNECTOR,
        `No connector selected for calling ${e}. Use hasConnector before executing other methods.`
      );
    if (typeof this._currentConnector[e] == "function")
      return this._currentConnector[e](...n);
  }
  /**
   * Create a method for each method proxy that is available on the Common interface
   * and call the method from the current connector.
   */
  setupMethods() {
    Object.values(Hg).forEach((e) => {
      this[e] = async (...n) => this.callMethod(e, ...n);
    });
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status.
   */
  async fetchConnectorStatus(e) {
    const n = Date.now(), [s, i] = await Promise.allSettled([
      Wi(e.isConnected()),
      Wi(this.pingConnector(e))
    ]);
    return n < (e._latestUpdate || 0) || (e._latestUpdate = Date.now(), e.installed = i.status === "fulfilled" && i.value, e.connected = s.status === "fulfilled" && s.value), {
      installed: e.installed,
      connected: e.connected
    };
  }
  /**
   * Fetch the status of all connectors and set the installed and connected
   * status.
   */
  async fetchConnectorsStatus() {
    return Promise.all(
      this._connectors.map(async (e) => this.fetchConnectorStatus(e))
    );
  }
  /**
   * Fetch the status of a connector and set the installed and connected
   * status. If no connector is provided it will ping the current connector.
   */
  async pingConnector(e) {
    const n = e || this._currentConnector;
    if (!n)
      return !1;
    try {
      return await Wg(async () => Wi(n.ping()), {
        key: n.name,
        cache: this._pingCache,
        cacheTime: m2
      })();
    } catch {
      throw new B(L.INVALID_PROVIDER, "Current connector is not available.");
    }
  }
  /**
   * Return the list of connectors with the status of installed and connected.
   */
  async connectors() {
    return await this.fetchConnectorsStatus(), this._connectors;
  }
  /**
   * Set the current connector to be used.
   */
  async selectConnector(e, n = {
    emitEvents: !0
  }) {
    var a, o;
    const s = this.getConnector(e);
    if (!s)
      return !1;
    if (((a = this._currentConnector) == null ? void 0 : a.name) === e)
      return !0;
    const { installed: i } = await this.fetchConnectorStatus(s);
    return i ? (this._currentConnector = s, this.emit(this.events.currentConnector, s), this.setupConnectorEvents(Object.values(Eu)), await ((o = this._storage) == null ? void 0 : o.setItem(tr.STORAGE_KEY, s.name)), n.emitEvents && this.triggerConnectorEvents(), !0) : !1;
  }
  /**
   * Return the current selected connector.
   */
  currentConnector() {
    return this._currentConnector;
  }
  /**
   * Return true if any connector is available.
   */
  async hasConnector() {
    if (this._currentConnector)
      return !0;
    const e = Yg();
    return this.once(this.events.currentConnector, () => {
      e.resolve(!0);
    }), Wi(e.promise, w2).then(() => !0).catch(() => !1);
  }
  async hasWallet() {
    return this.hasConnector();
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   *
   * @deprecated getProvider is deprecated and is going to be removed in the future, use getWallet instead.
   */
  async getProvider(e) {
    return y2(
      "getProvider is deprecated and is going to be removed in the future, use getWallet instead."
    ), this._getProvider(e);
  }
  /**
   * Return a Fuel Provider instance with extends features to work with
   * connectors.
   */
  async _getProvider(e) {
    let n;
    if (e && "getTransactionResponse" in e)
      n = e;
    else if (e && "chainId" in e && "url" in e)
      n = new bd(e.url);
    else {
      if (e)
        throw new B(L.INVALID_PROVIDER, "Provider is not valid.");
      {
        const s = await this.currentNetwork();
        n = new bd(s.url);
      }
    }
    return n;
  }
  /**
   * Return a Fuel Wallet Locked instance with extends features to work with
   * connectors.
   */
  async getWallet(e, n) {
    const s = await this._getProvider(n);
    return new Vo(e, s, this);
  }
  /**
   * Remove all open listeners this is useful when you want to
   * remove the Fuel instance and avoid memory leaks.
   */
  unsubscribe() {
    this._unsubscribes.map((e) => e()), this._targetUnsubscribe(), this.removeAllListeners();
  }
  /**
   * Clean all the data from the storage.
   */
  async clean() {
    var e;
    await ((e = this._storage) == null ? void 0 : e.removeItem(tr.STORAGE_KEY));
  }
  /**
   * Removes all listeners and cleans the storage.
   */
  async destroy() {
    this.unsubscribe(), await this.clean();
  }
}, T(tr, "Fuel"), D(tr, "STORAGE_KEY", "fuel-current-connector"), D(tr, "defaultConfig", {}), tr), b2 = Object.defineProperty, xt = (r, t) => b2(r, "name", { value: t, configurable: !0 }), di, jg = (di = class {
}, xt(di, "AbstractProgram"), di), ui, kR = (ui = class extends jg {
}, xt(ui, "AbstractContract"), ui);
function Cd(r, t) {
  if (!r)
    throw new B(L.TRANSACTION_ERROR, t);
}
xt(Cd, "assert");
function Yo(r) {
  return r.reduce((t, e, n) => {
    const { program: s, externalAbis: i } = e.getCallConfig();
    return n === 0 ? (t.main = s.interface.jsonAbi, t.otherContractsAbis = {}) : t.otherContractsAbis[s.id.toB256()] = s.interface.jsonAbi, t.otherContractsAbis = { ...t.otherContractsAbis, ...i }, t;
  }, {});
}
xt(Yo, "getAbisFromAllCalls");
var UR = /* @__PURE__ */ xt((r, t, e) => {
  if (!t)
    return [];
  const { main: n, otherContractsAbis: s } = Yo(e);
  return mg(r, n, s);
}, "getResultLogs"), Cu = /* @__PURE__ */ xt((r) => {
  const { receipts: t, mainCallConfig: e, functionScopes: n } = r;
  if (!e)
    return { logs: [], groupedLogs: {} };
  const { main: s, otherContractsAbis: i } = Yo(n);
  return ra({ receipts: t, mainAbi: s, externalAbis: i });
}, "getAllResultLogs"), gr, hi, Bu = (hi = class {
  constructor(...t) {
    Ie(this, gr);
    Ut(this, gr, t || []);
  }
  entries() {
    return ht(this, gr);
  }
  push(...t) {
    ht(this, gr).push(...t);
  }
  concat(t) {
    return ht(this, gr).concat(t);
  }
  extend(t) {
    ht(this, gr).push(...t);
  }
  toBytes() {
    return ct(
      ht(this, gr).reduce((t, e) => (t.push(e.to_bytes()), t), [])
    );
  }
  toHex() {
    return W(this.toBytes());
  }
  toString() {
    return `Program:
${JSON.stringify(ht(this, gr), null, 2)}`;
  }
  byteLength() {
    return this.toBytes().byteLength;
  }
}, gr = new WeakMap(), xt(hi, "InstructionSet"), hi), I2 = /* @__PURE__ */ xt((r) => gp + fp({ maxInputs: r }), "calculateScriptDataBaseOffset");
function Zg(r) {
  const t = [...r.receipts];
  let e, n;
  if (t.forEach((i) => {
    i.type === ut.ScriptResult ? e = i : (i.type === ut.Return || i.type === ut.ReturnData || i.type === ut.Revert) && (n = i);
  }), !e || !n)
    throw new B(L.SCRIPT_REVERTED, "Transaction reverted.");
  return {
    code: e.result,
    gasUsed: e.gasUsed,
    receipts: t,
    scriptResultReceipt: e,
    returnReceipt: n,
    callResult: r
  };
}
xt(Zg, "callResultToScriptResult");
function jo(r, t, e = [], n = {}) {
  var s;
  try {
    const i = Zg(r);
    return t(i);
  } catch (i) {
    if (i.code === L.SCRIPT_REVERTED) {
      const a = (s = r == null ? void 0 : r.dryRunStatus) == null ? void 0 : s.reason;
      throw ou({
        logs: e,
        groupedLogs: n,
        receipts: r.receipts,
        statusReason: a
      });
    }
    throw i;
  }
}
xt(jo, "decodeCallResult");
function Jg(r, t, e, n) {
  return jo(
    r,
    (s) => {
      if (s.returnReceipt.type === ut.Revert)
        throw new B(
          L.SCRIPT_REVERTED,
          `Script Reverted. Logs: ${JSON.stringify(e)}`
        );
      if (s.returnReceipt.type !== ut.Return && s.returnReceipt.type !== ut.ReturnData) {
        const { type: a } = s.returnReceipt;
        throw new B(
          L.SCRIPT_REVERTED,
          `Script Return Type [${a}] Invalid. Logs: ${JSON.stringify({
            logs: e,
            groupedLogs: n,
            receipt: s.returnReceipt
          })}`
        );
      }
      let i;
      return s.returnReceipt.type === ut.Return && (i = s.returnReceipt.val), s.returnReceipt.type === ut.ReturnData && (i = t.func.decodeOutput(s.returnReceipt.data)[0]), i;
    },
    e
  );
}
xt(Jg, "callResultToInvocationResult");
var On, vu = (On = class {
  /**
   * Creates an instance of the ScriptRequest class.
   *
   * @param bytes - The bytes of the script.
   * @param scriptDataEncoder - The script data encoder function.
   * @param scriptResultDecoder - The script result decoder function.
   */
  constructor(t, e, n) {
    /**
     * The bytes of the script.
     */
    D(this, "bytes");
    /**
     * A function to encode the script data.
     */
    D(this, "scriptDataEncoder");
    /**
     * A function to decode the script result.
     */
    D(this, "scriptResultDecoder");
    this.bytes = J(t), this.scriptDataEncoder = e, this.scriptResultDecoder = n;
  }
  /**
   * Gets the script data offset for the given bytes.
   *
   * @param byteLength - The byte length of the script.
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  static getScriptDataOffsetWithScriptBytes(t, e) {
    return fp({ maxInputs: e }) + gp + t;
  }
  /**
   * Gets the script data offset.
   *
   * @param maxInputs - The maxInputs value from the chain's consensus params.
   * @returns The script data offset.
   */
  getScriptDataOffset(t) {
    return On.getScriptDataOffsetWithScriptBytes(this.bytes.length, t);
  }
  /**
   * Encodes the data for a script call.
   *
   * @param data - The script data.
   * @returns The encoded data.
   */
  encodeScriptData(t) {
    const e = this.scriptDataEncoder(t);
    return ArrayBuffer.isView(e) ? e : (this.bytes = J(e.script), e.data);
  }
  /**
   * Decodes the result of a script call.
   *
   * @param callResult - The CallResult from the script call.
   * @param logs - Optional logs associated with the decoding.
   * @returns The decoded result.
   */
  decodeCallResult(t, e = []) {
    return jo(t, this.scriptResultDecoder, e);
  }
}, xt(On, "ScriptRequest"), On), qg = {
  assetIdOffset: 0,
  amountOffset: 0,
  gasForwardedOffset: 0,
  callDataOffset: 0
}, E2 = St, $g = /* @__PURE__ */ xt(({
  callDataOffset: r,
  gasForwardedOffset: t,
  amountOffset: e,
  assetIdOffset: n
}) => {
  const s = new Bu(
    qn(16, r),
    qn(17, e),
    qi(17, 17, 0),
    qn(18, n)
  );
  return t ? s.push(
    qn(19, t),
    qi(19, 19, 0),
    Xc(16, 17, 18, 19)
  ) : s.push(Xc(16, 17, 18, l.cgas().to_u8())), s;
}, "getSingleCallInstructions");
function Bd(r) {
  if (!r.length)
    return new Uint8Array();
  const t = new Bu();
  for (let e = 0; e < r.length; e += 1)
    t.extend($g(r[e]).entries());
  return t.push(vd(1)), t.toBytes();
}
xt(Bd, "getInstructions");
var C2 = /* @__PURE__ */ xt((r) => r === ut.Return || r === ut.ReturnData, "isReturnType"), B2 = /* @__PURE__ */ xt((r, t) => r.find(
  ({ type: e, id: n, to: s }) => e === ut.Call && n === E2 && s === t
), "getMainCallReceipt"), v2 = /* @__PURE__ */ xt((r) => (t) => {
  if (Pr(t.code) !== 0)
    throw new B(L.SCRIPT_REVERTED, "Transaction reverted.");
  const e = B2(
    t.receipts,
    r.toB256()
  ), n = E(e == null ? void 0 : e.is);
  return t.receipts.filter(({ type: i }) => C2(i)).flatMap((i) => n.eq(E(i.is)) ? i.type === ut.Return ? [new rt("u64").encode(i.val)] : i.type === ut.ReturnData ? [J(i.data)] : [new Uint8Array()] : []);
}, "scriptResultDecoder"), x2 = /* @__PURE__ */ xt((r, t, e = [], n = {}) => jo(r, v2(t), e, n), "decodeContractCallScriptResult"), R2 = /* @__PURE__ */ xt((r) => r.reduce(
  (t, e) => {
    const n = { ...qg };
    return e.gas && (n.gasForwardedOffset = 1), t + $g(n).byteLength();
  },
  V.size()
  // placeholder for single RET instruction which is added later
), "getCallInstructionsLength"), S2 = /* @__PURE__ */ xt((r, t) => new vu(
  // Script to call the contract, start with stub size matching length of calls
  Bd(new Array(r.length).fill(qg)),
  (e) => {
    var R;
    const n = e.length;
    if (n === 0)
      return { data: new Uint8Array(), script: new Uint8Array() };
    const s = R2(e), i = (8 - s % 8) % 8, a = s + i, o = I2(t.toNumber()) + a, d = [];
    let h = o;
    const f = [];
    for (let Q = 0; Q < n; Q += 1) {
      const x = e[Q], N = h, U = N + At, H = U + Ki, X = H + ed + At + At, P = X + x.fnSelectorBytes.byteLength, M = J(x.data);
      let O = 0;
      f.push(new rt("u64").encode(x.amount || 0)), f.push(new ot().encode(((R = x.assetId) == null ? void 0 : R.toString()) || St)), f.push(x.contractId.toBytes()), f.push(new rt("u64").encode(X)), f.push(new rt("u64").encode(P)), f.push(x.fnSelectorBytes), f.push(M), x.gas && (f.push(new rt("u64").encode(x.gas)), O = P + M.byteLength);
      const k = {
        amountOffset: N,
        assetIdOffset: U,
        gasForwardedOffset: O,
        callDataOffset: H
      };
      d.push(k), h = o + ct(f).byteLength;
    }
    const g = Bd(d);
    return { data: ct(f), script: g };
  },
  () => [new Uint8Array()]
), "getContractCallScript"), xu = /* @__PURE__ */ xt((r, t, e, n, s = {}) => {
  var d;
  const i = (d = r[0]) == null ? void 0 : d.getCallConfig();
  if (r.length === 1 && i && "bytes" in i.program)
    return Jg({ receipts: t }, i, n, s);
  const o = x2(
    { receipts: t },
    (i == null ? void 0 : i.program).id,
    n,
    s
  ).map((h, f) => {
    var y;
    const { func: g } = r[f].getCallConfig();
    return (y = g.decodeOutput(h)) == null ? void 0 : y[0];
  });
  return e ? o : o == null ? void 0 : o[0];
}, "extractInvocationResult"), T2 = /* @__PURE__ */ xt(async (r) => {
  var Q;
  const { funcScope: t, isMultiCall: e, program: n, transactionResponse: s } = r, i = await s.waitForResult(), { receipts: a } = i, o = Array.isArray(t) ? t : [t], d = (Q = o[0]) == null ? void 0 : Q.getCallConfig(), { logs: h, groupedLogs: f } = Cu({ receipts: a, mainCallConfig: d, functionScopes: o }), g = xu(
    o,
    a,
    e,
    h,
    f
  ), y = Di(a);
  return {
    isMultiCall: e,
    functionScopes: o,
    value: g,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: h,
    groupedLogs: f,
    gasUsed: y
  };
}, "buildFunctionResult"), N2 = /* @__PURE__ */ xt(async (r) => {
  var Q;
  const { funcScope: t, isMultiCall: e, program: n, transactionResponse: s } = r, i = await s.waitForPreConfirmation(), { receipts: a } = i, o = Array.isArray(t) ? t : [t], d = (Q = o[0]) == null ? void 0 : Q.getCallConfig();
  let h, f, g, y;
  return a && ({ logs: h, groupedLogs: f } = Cu({ receipts: a, mainCallConfig: d, functionScopes: o }), y = xu(o, a, e, h, f), g = Di(a)), {
    isMultiCall: e,
    functionScopes: o,
    program: n,
    transactionResult: i,
    transactionResponse: s,
    transactionId: s.id,
    logs: h,
    groupedLogs: f,
    gasUsed: g,
    value: y
  };
}, "buildPreConfirmationFunctionResult"), zc = /* @__PURE__ */ xt((r) => {
  var y;
  const { funcScopes: t, callResult: e, isMultiCall: n } = r, { receipts: s } = e, i = Array.isArray(t) ? t : [t], a = (y = i[0]) == null ? void 0 : y.getCallConfig(), { logs: o, groupedLogs: d } = Cu({ receipts: s, mainCallConfig: a, functionScopes: i }), h = xu(
    i,
    s,
    n,
    o,
    d
  ), f = Di(s);
  return {
    functionScopes: i,
    callResult: e,
    isMultiCall: n,
    gasUsed: f,
    value: h
  };
}, "buildDryRunResult");
function Kg(r) {
  const { program: t, args: e, forward: n, func: s, callParameters: i, externalAbis: a } = r.getCallConfig(), o = s.encodeArguments(e);
  return {
    contractId: t.id,
    fnSelectorBytes: s.selectorBytes,
    data: o,
    assetId: n == null ? void 0 : n.assetId,
    amount: n == null ? void 0 : n.amount,
    gas: i == null ? void 0 : i.gasLimit,
    externalContractsAbis: a
  };
}
xt(Kg, "createContractCall");
var Ai, tw = (Ai = class {
  /**
   * Constructs an instance of BaseInvocationScope.
   *
   * @param program - The abstract program to be invoked.
   * @param isMultiCall - A flag indicating whether the invocation is a multi-call.
   */
  constructor(t, e) {
    D(this, "transactionRequest");
    D(this, "program");
    D(this, "functionInvocationScopes", []);
    D(this, "txParameters");
    D(this, "assembleTxParameters");
    D(this, "requiredCoins", []);
    D(this, "isMultiCall", !1);
    D(this, "hasCallParamsGasLimit", !1);
    // flag to check if any of the callParams has gasLimit set
    D(this, "externalAbis", {});
    /**
     * @deprecated - Should be removed with `addSigners`
     */
    D(this, "addSignersCallback");
    this.program = t, this.isMultiCall = e, this.transactionRequest = new Yr();
  }
  /**
   * Getter for the contract calls.
   *
   * @returns An array of contract calls.
   */
  get calls() {
    return this.functionInvocationScopes.map((t) => Kg(t));
  }
  /**
   * Updates the script request with the current contract calls.
   */
  async updateScriptRequest() {
    const t = this.getProvider(), {
      consensusParameters: {
        txParameters: { maxInputs: e }
      }
    } = await t.getChain(), n = S2(this.functionInvocationScopes, e);
    this.transactionRequest.setScript(n, this.calls);
  }
  /**
   * Updates the transaction request with the current input/output.
   */
  updateContractInputAndOutput() {
    this.calls.forEach((e) => {
      e.contractId && this.transactionRequest.addContractInputAndOutput(e.contractId), e.externalContractsAbis && Object.keys(e.externalContractsAbis).forEach(
        (n) => this.transactionRequest.addContractInputAndOutput(new wt(n))
      );
    });
  }
  /**
   * Gets the required coins for the transaction.
   *
   * @returns An array of required coin quantities.
   */
  getRequiredCoins() {
    return this.calls.map((e) => ({
      assetId: String(e.assetId),
      amount: E(e.amount || 0)
    })).filter(({ assetId: e, amount: n }) => e && !E(n).isZero());
  }
  /**
   * Updates the required coins for the transaction.
   */
  updateRequiredCoins() {
    const t = this.getRequiredCoins(), e = /* @__PURE__ */ xt((n, { assetId: s, amount: i }) => {
      var o;
      const a = ((o = n.get(s)) == null ? void 0 : o.amount) || E(0);
      return n.set(s, {
        assetId: String(s),
        amount: a.add(i)
      });
    }, "reduceForwardCoins");
    this.requiredCoins = Array.from(
      t.reduce(e, /* @__PURE__ */ new Map()).values()
    );
  }
  /**
   * Adds a single call to the invocation scope.
   *
   * @param funcScope - The function scope to add.
   * @returns The current instance of the class.
   */
  addCall(t) {
    return this.addCalls([t]), this;
  }
  /**
   * Adds multiple calls to the invocation scope.
   *
   * @param funcScopes - An array of function scopes to add.
   * @returns The current instance of the class.
   */
  addCalls(t) {
    return this.functionInvocationScopes.push(...t), this.updateContractInputAndOutput(), this.updateRequiredCoins(), this;
  }
  /**
   * Prepares the transaction by updating the script request, required coins, and checking the gas limit.
   */
  async prepareTransaction() {
    await fo(), await this.updateScriptRequest(), this.updateRequiredCoins(), this.checkGasLimitTotal(), this.transactionRequest.type === Ct.Script && (this.transactionRequest.abis = Yo(this.functionInvocationScopes));
  }
  /**
   * Checks if the total gas limit is within the acceptable range.
   */
  checkGasLimitTotal() {
    const t = this.calls.reduce((e, n) => e.add(n.gas || 0), E(0));
    if (this.transactionRequest.gasLimit.eq(0))
      this.transactionRequest.gasLimit = t;
    else if (t.gt(this.transactionRequest.gasLimit))
      throw new B(
        L.TRANSACTION_ERROR,
        "Transaction's gasLimit must be equal to or greater than the combined forwarded gas of all calls."
      );
  }
  /**
   * Gets the transaction cost for dry running the transaction.
   *
   * @returns The transaction cost details.
   *
   * @deprecated Use contract.fundWithRequiredCoins instead
   * Check the migration guide https://docs.fuel.network/docs/fuels-ts/transactions/assemble-tx-migration-guide/ for more information.
   */
  async getTransactionCost() {
    const t = Be(await this.getTransactionRequest());
    return (this.program.account ?? Ke.generate({ provider: this.getProvider() })).getTransactionCost(t, {
      quantities: this.getRequiredCoins(),
      signatureCallback: this.addSignersCallback
    });
  }
  /**
   * Funds the transaction request with the required coins and returns it.
   *
   * @returns The transaction request.
   */
  async fundWithRequiredCoins() {
    var f, g;
    let t = await this.getTransactionRequest();
    t = Be(t);
    let { feePayerAccount: e, accountCoinQuantities: n, ...s } = this.assembleTxParameters ?? {};
    t.maxFee = E(0), t.gasLimit = E(0);
    const i = this.getProvider(), a = this.program.account ?? Ke.generate({ provider: i }), o = await i.getBaseAssetId();
    if (e || (e = a), !n) {
      const y = t.outputs.filter((R) => R.type === lt.Coin).map(({ amount: R, assetId: Q }) => ({ assetId: String(Q), amount: E(R) }));
      n = Pa(y, this.requiredCoins), n.length || n.push({ assetId: o, amount: E(0) });
    }
    let { assembledRequest: d, gasPrice: h } = await i.assembleTx({
      request: t,
      feePayerAccount: e,
      accountCoinQuantities: n,
      ...s
    });
    return d = d, await ts({
      gasPrice: h,
      provider: i,
      transactionRequest: d,
      setGasLimit: (f = this.txParameters) == null ? void 0 : f.gasLimit,
      setMaxFee: (g = this.txParameters) == null ? void 0 : g.maxFee
    }), d;
  }
  /**
   * @deprecated - Should be removed with `addSigners`
   */
  async legacyFundWithRequiredCoins() {
    var o;
    let t = await this.getTransactionRequest();
    t = Be(t);
    const e = await this.getTransactionCost(), { gasUsed: n, missingContractIds: s, outputVariables: i, maxFee: a } = e;
    return this.setDefaultTxParams(t, n, a), s.forEach((d) => {
      t.addContractInputAndOutput(new wt(d));
    }), t.addVariableOutputs(i), await ((o = this.program.account) == null ? void 0 : o.fund(t, e)), this.addSignersCallback && await this.addSignersCallback(t), t;
  }
  /**
   * Sets the transaction parameters.
   *
   * @param txParams - The transaction parameters to set.
   * @returns The current instance of the class.
   */
  txParams(t) {
    var n;
    this.txParameters = t;
    const e = this.transactionRequest;
    return e.tip = E(t.tip || e.tip), e.gasLimit = E(t.gasLimit || e.gasLimit), e.maxFee = t.maxFee ? E(t.maxFee) : e.maxFee, e.witnessLimit = t.witnessLimit ? E(t.witnessLimit) : e.witnessLimit, e.maturity = t.maturity || e.maturity, e.expiration = t.expiration || e.expiration, e.addVariableOutputs(((n = this.txParameters) == null ? void 0 : n.variableOutputs) || 0), this;
  }
  /**
   * Sets the transaction parameters.
   *
   * @param assembleTxParams - The assembleTx parameters to set when invoking the `provider.assembleTx` method.
   * @returns The current instance of the class.
   */
  assembleTxParams(t) {
    return this.assembleTxParameters = t, this;
  }
  /**
   * Adds contracts to the invocation scope.
   *
   * @param contracts - An array of contracts to add.
   * @returns The current instance of the class.
   */
  addContracts(t) {
    return t.forEach((e) => {
      typeof e == "string" ? this.transactionRequest.addContractInputAndOutput(new wt(e)) : (this.transactionRequest.addContractInputAndOutput(e.id), this.externalAbis[e.id.toB256()] = e.interface.jsonAbi);
    }), this;
  }
  /**
   * Adds an asset transfer to an Account on the contract call transaction request.
   *
   * @param transferParams - The object representing the transfer to be made.
   * @returns The current instance of the class.
   */
  addTransfer(t) {
    const { amount: e, destination: n, assetId: s } = t;
    return this.transactionRequest = this.transactionRequest.addCoinOutput(
      new wt(n),
      e,
      s
    ), this;
  }
  /**
   * Adds multiple transfers to the contract call transaction request.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The current instance of the class.
   */
  addBatchTransfer(t) {
    return t.forEach(({ destination: e, amount: n, assetId: s }) => {
      this.transactionRequest = this.transactionRequest.addCoinOutput(
        new wt(e),
        n,
        s
      );
    }), this;
  }
  /**
   * Adds signers to the transaction request.
   *
   * @param signers - The signers to add.
   * @returns The current instance of the class.
   *
   * @deprecated This method is deprecated and will be removed in a future versions.
   * All signatures should be manually added to the transaction request witnesses. If your
   * Sway program relies on in-code signature validation, visit this guide:
   * https://docs.fuel.network/docs/fuels-ts/cookbook/sway-script-with-signature-validation/
   */
  addSigners(t) {
    return this.addSignersCallback = (e) => e.addAccountWitnesses(t), this;
  }
  /**
   * Prepares and returns the transaction request object.
   *
   * @returns The prepared transaction request.
   */
  async getTransactionRequest() {
    return await this.prepareTransaction(), this.transactionRequest;
  }
  /**
   * Sets the transaction request. Useful when you have used `getTransactionRequest` or
   * `fundWithRequiredCoins` from the scope to apply customizations to the transaction request.
   *
   * @param request - The transaction request to set.
   * @returns The current instance of the class.
   */
  fromRequest(t) {
    return this.transactionRequest = t, this;
  }
  /**
   * Submits the contract call transaction and returns a promise that resolves to an object
   * containing the transaction ID and a function to wait for the result. The promise will resolve
   * as soon as the transaction is submitted to the node.
   *
   * @param params - Optional parameters for the call.
   * - `skipAssembleTx`: A boolean indicating whether to skip assembling the transaction. This is useful
   *   when customizations were made to the transaction request using the `assembleTx` method.
   *
   * @returns A promise that resolves to an object containing:
   * - `transactionId`: The ID of the submitted transaction.
   * - `waitForResult`: A function that waits for the transaction result.
   * - `waitForPreConfirmation`: A function that waits for the transaction pre-confirmation.
   * @template T - The type of the return value.
   */
  async call(t) {
    Cd(this.program.account, "Wallet is required!");
    let e = await this.getTransactionRequest();
    (t == null ? void 0 : t.skipAssembleTx) || (this.addSignersCallback ? e = await this.legacyFundWithRequiredCoins() : e = await this.fundWithRequiredCoins());
    const s = await this.program.account.sendTransaction(e, {
      estimateTxDependencies: !1
    });
    return {
      transactionId: s.id,
      waitForResult: /* @__PURE__ */ xt(async () => T2({
        funcScope: this.functionInvocationScopes,
        isMultiCall: this.isMultiCall,
        program: this.program,
        transactionResponse: s
      }), "waitForResult"),
      waitForPreConfirmation: /* @__PURE__ */ xt(async () => N2({
        funcScope: this.functionInvocationScopes,
        isMultiCall: this.isMultiCall,
        program: this.program,
        transactionResponse: s
      }), "waitForPreConfirmation")
    };
  }
  /**
   * Simulates a transaction.
   *
   * @returns The result of the invocation call.
   */
  async simulate() {
    if (Cd(this.program.account, "Wallet is required!"), !("populateTransactionWitnessesSignature" in this.program.account))
      throw new B(
        L.ABI_MAIN_METHOD_MISSING,
        "An unlocked wallet is required to simulate a contract call."
      );
    const t = await this.fundWithRequiredCoins(), e = await this.program.account.simulateTransaction(t, {
      estimateTxDependencies: !1
    });
    return zc({
      funcScopes: this.functionInvocationScopes,
      callResult: e,
      isMultiCall: this.isMultiCall
    });
  }
  /**
   * Executes a transaction in dry run mode.
   *
   * @returns The result of the invocation call.
   *
   * @deprecated Use .get instead
   */
  async dryRun() {
    const { receipts: t } = await this.getTransactionCost(), e = {
      receipts: t
    };
    return zc({
      funcScopes: this.functionInvocationScopes,
      callResult: e,
      isMultiCall: this.isMultiCall
    });
  }
  async get() {
    let t = await this.getTransactionRequest();
    t = Be(t), t.maxFee = E(0), t.gasLimit = E(0), t.inputs = t.inputs.filter((f) => f.type !== vt.Coin);
    const e = this.getProvider(), n = this.program.account ?? Ke.generate({ provider: e }), s = await e.getBaseAssetId(), i = t.outputs.filter((f) => f.type === lt.Coin).map(({ amount: f, assetId: g }) => ({ assetId: String(g), amount: E(f) })).concat(this.requiredCoins), a = n.generateFakeResources(i), o = a.find((f) => f.assetId === s), d = E("1000000000000000");
    if (o)
      o.amount = o.amount.add(d);
    else {
      const [f] = n.generateFakeResources([
        { assetId: s, amount: d }
      ]);
      a.push(f);
    }
    t.addResources(a);
    const { receipts: h } = await e.assembleTx({
      request: t,
      feePayerAccount: n
    });
    return zc({
      funcScopes: this.functionInvocationScopes,
      callResult: { receipts: h },
      isMultiCall: this.isMultiCall
    });
  }
  getProvider() {
    return this.program.provider;
  }
  /**
   * In case the gasLimit is *not* set by the user, this method sets a default value.
   */
  setDefaultTxParams(t, e, n) {
    var d, h;
    const s = Fe((d = this.txParameters) == null ? void 0 : d.gasLimit) || this.hasCallParamsGasLimit, i = Fe((h = this.txParameters) == null ? void 0 : h.maxFee), { gasLimit: a, maxFee: o } = t;
    if (!s)
      t.gasLimit = e;
    else if (a.lt(e))
      throw new B(
        L.GAS_LIMIT_TOO_LOW,
        `Gas limit '${a}' is lower than the required: '${e}'.`
      );
    if (!i)
      t.maxFee = n;
    else if (n.gt(o))
      throw new B(
        L.MAX_FEE_TOO_LOW,
        `Max fee '${o}' is lower than the required: '${n}'.`
      );
  }
}, xt(Ai, "BaseInvocationScope"), Ai), li, ew = (li = class extends tw {
  /**
   * Constructs an instance of FunctionInvocationScope.
   *
   * @param program - The program.
   * @param func - The function fragment.
   * @param args - The arguments.
   */
  constructor(e, n, s) {
    super(e, !1);
    D(this, "func");
    D(this, "callParameters");
    D(this, "forward");
    D(this, "args");
    this.func = n, this.args = s || [], this.setArguments(...s), super.addCall(this);
  }
  /**
   * Gets the call configuration.
   *
   * @returns The call configuration.
   */
  getCallConfig() {
    return {
      func: this.func,
      program: this.program,
      callParameters: this.callParameters,
      txParameters: this.txParameters,
      forward: this.forward,
      args: this.args,
      externalAbis: this.externalAbis
    };
  }
  /**
   * Sets the arguments for the function invocation.
   *
   * @param args - The arguments.
   * @returns The instance of FunctionInvocationScope.
   */
  setArguments(...e) {
    return this.args = e || [], this;
  }
  /**
   * Sets the call parameters for the function invocation.
   *
   * @param callParams - The call parameters.
   * @returns The instance of FunctionInvocationScope.
   * @throws If the function is not payable and forward is set.
   */
  callParams(e) {
    if (!this.hasCallParamsGasLimit && (e == null ? void 0 : e.gasLimit) !== void 0 && (this.hasCallParamsGasLimit = !0), this.callParameters = e, e != null && e.forward) {
      if (!this.func.attributes.find((n) => n.name === "payable"))
        throw new B(
          L.TRANSACTION_ERROR,
          `The target function ${this.func.name} cannot accept forwarded funds as it's not marked as 'payable'.`
        );
      this.forward = tu(e.forward);
    }
    return this.setArguments(...this.args), this.updateRequiredCoins(), this;
  }
}, xt(li, "FunctionInvocationScope"), li), _i, D2 = (_i = class extends tw {
  /**
   * Constructs an instance of MultiCallInvocationScope.
   *
   * @param contract - The contract.
   * @param funcScopes - An array of function invocation scopes.
   */
  constructor(t, e) {
    super(t, !0), this.addCalls(e);
  }
  /**
   * Adds a single function invocation scope to the multi-call invocation scope.
   *
   * @param funcScope - The function invocation scope.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCall(t) {
    return super.addCalls([t]);
  }
  /**
   * Adds multiple function invocation scopes to the multi-call invocation scope.
   *
   * @param funcScopes - An array of function invocation scopes.
   * @returns The instance of MultiCallInvocationScope.
   */
  addCalls(t) {
    return super.addCalls(t);
  }
}, xt(_i, "MultiCallInvocationScope"), _i), pi, Ua = (pi = class {
  /**
   * Creates an instance of the Contract class.
   *
   * @param id - The contract's address.
   * @param abi - The contract's ABI (JSON ABI or Interface instance).
   * @param accountOrProvider - The account or provider for interaction.
   */
  constructor(t, e, n) {
    /**
     * The unique contract identifier.
     */
    D(this, "id");
    /**
     * The provider for interacting with the contract.
     */
    D(this, "provider");
    /**
     * The contract's ABI interface.
     */
    D(this, "interface");
    /**
     * The account associated with the contract, if available.
     */
    D(this, "account");
    /**
     * A collection of functions available on the contract.
     */
    D(this, "functions", {});
    this.interface = e instanceof rr ? e : new rr(e), this.id = new wt(t), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), Object.keys(this.interface.functions).forEach((s) => {
      const i = this.interface.getFunction(s);
      Object.defineProperty(this.functions, i.name, {
        value: this.buildFunction(i),
        writable: !1
      });
    });
  }
  /**
   * Build a function invocation scope for the provided function fragment.
   *
   * @param func - The function fragment to build a scope for.
   * @returns A function that creates a FunctionInvocationScope.
   */
  buildFunction(t) {
    return (() => {
      const e = /* @__PURE__ */ xt((...n) => new ew(this, t, n), "funcInvocationScopeCreator");
      return Object.defineProperty(e, "isReadOnly", {
        value: /* @__PURE__ */ xt(() => t.isReadOnly(), "value"),
        writable: !1
      }), e;
    })();
  }
  /**
   * Create a multi-call invocation scope for the provided function invocation scopes.
   *
   * @param calls - An array of FunctionInvocationScopes to execute in a batch.
   * @returns A MultiCallInvocationScope instance.
   */
  multiCall(t) {
    return new D2(this, t);
  }
  /**
   * Get the balance for a given asset ID for this contract.
   *
   * @param assetId - The specified asset ID.
   * @returns The balance of the contract for the specified asset.
   */
  getBalance(t) {
    return this.provider.getContractBalance(this.id, t);
  }
}, xt(pi, "Contract"), pi), F2 = Object.defineProperty, Ji = (r, t) => F2(r, "name", { value: t, configurable: !0 }), fi, Q2 = (fi = class extends ew {
  constructor() {
    super(...arguments);
    D(this, "scriptRequest");
  }
  async updateScriptRequest() {
    this.scriptRequest || await this.buildScriptRequest(), this.transactionRequest.setScript(this.scriptRequest, this.args);
  }
  async buildScriptRequest() {
    const e = this.program.bytes;
    if (!await this.program.provider.getChain())
      throw new B(
        B.CODES.CHAIN_INFO_CACHE_EMPTY,
        "Provider chain info cache is empty. Please make sure to initialize the `Provider` properly by running `new Provider()`"
      );
    this.scriptRequest = new vu(
      e,
      (s) => this.func.encodeArguments(s),
      () => []
    );
  }
}, Ji(fi, "ScriptInvocationScope"), fi), gi, O2 = (gi = class extends jg {
}, Ji(gi, "AbstractScript"), gi), Mn, GR = (Mn = class extends O2 {
  /**
   * Create a new instance of the Script class.
   *
   * @param bytecode - The compiled bytecode of the script.
   * @param abi - The ABI interface for the script.
   * @param account - The account associated with the script.
   */
  constructor(e, n, s) {
    super();
    /**
     * The compiled bytecode of the script.
     */
    D(this, "bytes");
    /**
     * The ABI interface for the script.
     */
    D(this, "interface");
    /**
     * The account associated with the script.
     */
    D(this, "account");
    /**
     * The script request object.
     */
    D(this, "script");
    /**
     * The provider used for interacting with the network.
     */
    D(this, "provider");
    /**
     * Functions that can be invoked within the script.
     */
    D(this, "functions");
    this.bytes = J(e), this.interface = new rr(n), this.provider = s.provider, this.account = s, this.functions = {
      main: /* @__PURE__ */ Ji((...i) => new Q2(this, this.interface.getFunction("main"), i), "main")
    };
  }
  /**
   * Set the configurable constants of the script.
   *
   * @param configurables - An object containing the configurable constants and their values.
   * @throws Will throw an error if the script has no configurable constants to be set or if an invalid constant is provided.
   * @returns This instance of the `Script`.
   */
  setConfigurableConstants(e) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new B(
          B.CODES.INVALID_CONFIGURABLE_CONSTANTS,
          "The script does not have configurable constants to be set"
        );
      Object.entries(e).forEach(([n, s]) => {
        if (!this.interface.configurables[n])
          throw new B(
            B.CODES.CONFIGURABLE_NOT_FOUND,
            `The script does not have a configurable constant named: '${n}'`
          );
        const { offset: i } = this.interface.configurables[n], a = this.interface.encodeConfigurable(n, s);
        this.bytes.set(a, i);
      });
    } catch (n) {
      throw new B(
        B.CODES.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants: ${n.message}.`
      );
    }
    return this;
  }
  /**
   *
   * @param account - The account used to pay the deployment costs.
   * @returns The _blobId_ and a _waitForResult_ callback that returns the deployed predicate
   * once the blob deployment transaction finishes.
   *
   * The returned loader script will have the same configurable constants
   * as the original script which was used to generate the loader script.
   */
  deploy(e) {
    return Iu({
      deployer: e,
      abi: this.interface.jsonAbi,
      bytecode: this.bytes,
      loaderInstanceCallback: /* @__PURE__ */ Ji((n, s) => new Mn(n, s, this.account), "loaderInstanceCallback")
    });
  }
}, Ji(Mn, "Script"), Mn);
new vu(
  /*
    Opcode::RET(REG_ZERO)
    Opcode::NOOP
  */
  // TODO: Don't use hardcoded scripts: https://github.com/FuelLabs/fuels-ts/issues/281
  "0x24000000",
  () => new Uint8Array(0),
  () => {
  }
);
var zR = "https://devnet.fuel.network/v1/graphql", XR = "https://testnet.fuel.network/v1/graphql", M2 = Object.defineProperty, $e = (r, t) => M2(r, "name", { value: t, configurable: !0 }), P2 = /* @__PURE__ */ $e((r) => {
  const { RegId: t, Instruction: e } = __, n = 12, s = r.length, i = kr, a = ct(r.map((d) => J(d))), o = new Bu(
    // 1. load the blob contents into memory
    // find the start of the hardcoded blob ids, which are located after the code ends
    ln(16, t.pc().to_u8()),
    // 0x10 to hold the address of the current blob id
    mr(16, 16, n * e.size()),
    // The contract is going to be loaded from the current value of SP onwards, save
    // the location into 0x16 so we can jump into it later on
    ln(22, t.sp().to_u8()),
    // loop counter
    qn(19, s),
    // LOOP starts here
    // 0x11 to hold the size of the current blob
    Ha(17, 16),
    // push the blob contents onto the stack
    Yi(16, 0, 17, 1),
    // move on to the next blob
    mr(16, 16, i),
    // decrement the loop counter
    o_(19, 19, 1),
    // Jump backwards (3+1) instructions if the counter has not reached 0
    d_(19, t.zero().to_u8(), 3),
    // Jump into the memory where the contract is loaded
    // what follows is called _jmp_mem by the sway compiler
    // subtract the address contained in IS because jmp will add it back
    Ga(22, 22, t.is().to_u8()),
    // jmp will multiply by 4 so we need to divide to cancel that out
    Xa(22, 22, 4),
    // jump to the start of the contract we loaded
    za(22)
  ).toBytes();
  return ct([o, a]);
}, "getLoaderInstructions"), L2 = /* @__PURE__ */ $e((r, t) => {
  const e = [];
  for (let n = 0, s = 0; n < r.length; n += t, s++) {
    let i = r.slice(n, n + t), a = i.length;
    a % At !== 0 && (i = ct([i, new Uint8Array(t - i.length)]), a = i.length), e.push({ id: s, size: a, bytecode: i });
  }
  return e;
}, "getContractChunks"), k2 = /* @__PURE__ */ $e((r) => {
  const e = J(r), n = N_(e, 16384);
  return Kd(n.map((s) => W(s)));
}, "getContractRoot"), U2 = /* @__PURE__ */ $e((r) => {
  const t = new Sv();
  return r.forEach(({ key: e, value: n }) => t.update(zt(e), n)), t.root;
}, "getContractStorageRoot"), G2 = /* @__PURE__ */ $e((r, t, e) => {
  const n = k2(J(r));
  return zt(ct(["0x4655454C", t, n, e]));
}, "getContractId"), Kl = /* @__PURE__ */ $e((r) => W(r.startsWith("0x") ? r : `0x${r}`), "hexlifyWithPrefix"), t_ = 0.95, Pn, z2 = (Pn = class {
  /**
   * Create a ContractFactory instance.
   *
   * @param bytecode - The bytecode of the contract.
   * @param abi - The contract's ABI (Application Binary Interface).
   * @param accountOrProvider - An account or provider to be associated with the factory.
   */
  constructor(t, e, n = null, s = []) {
    D(this, "bytecode");
    D(this, "interface");
    D(this, "provider");
    D(this, "account");
    D(this, "storageSlots");
    this.bytecode = J(t), e instanceof rr ? this.interface = e : this.interface = new rr(e), n && "provider" in n ? (this.provider = n.provider, this.account = n) : (this.provider = n, this.account = null), this.storageSlots = s;
  }
  /**
   * Connect the factory to a provider.
   *
   * @param provider - The provider to be associated with the factory.
   * @returns A new ContractFactory instance.
   */
  connect(t) {
    return new Pn(this.bytecode, this.interface, t);
  }
  /**
   * Create a transaction request to deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns The CreateTransactionRequest object for deploying the contract.
   */
  createTransactionRequest(t) {
    const e = ((t == null ? void 0 : t.storageSlots) ?? []).concat(this.storageSlots).map(({ key: d, value: h }) => ({
      key: Kl(d),
      value: Kl(h)
    })).filter((d, h, f) => f.findIndex((g) => g.key === d.key) === h).sort(({ key: d }, { key: h }) => d.localeCompare(h)), n = {
      salt: er(32),
      ...t ?? {},
      storageSlots: e
    };
    if (!this.provider)
      throw new B(
        L.MISSING_PROVIDER,
        "Cannot create transaction request without provider"
      );
    const s = (t == null ? void 0 : t.bytecode) || this.bytecode, i = n.stateRoot || U2(n.storageSlots), a = G2(s, n.salt, i), o = new wd({
      bytecodeWitnessIndex: 0,
      witnesses: [s],
      ...n
    });
    return o.addContractCreatedOutput(a, i), {
      contractId: a,
      transactionRequest: o
    };
  }
  /**
   * Takes a transaction request, estimates it and funds it.
   *
   * @param request - the request to fund.
   * @param options - options for funding the request.
   * @returns a funded transaction request.
   */
  async fundTransactionRequest(t, e = {}) {
    const n = this.getAccount(), { maxFee: s } = e, i = await n.getTransactionCost(t);
    if (Fe(s)) {
      if (i.maxFee.gt(s))
        throw new B(
          L.MAX_FEE_TOO_LOW,
          `Max fee '${e.maxFee}' is lower than the required: '${i.maxFee}'.`
        );
    } else
      t.maxFee = i.maxFee;
    return await n.fund(t, i), t;
  }
  async assembleTx(t, e = {}) {
    const n = this.getAccount(), { maxFee: s } = e;
    t.maxFee = E(0);
    const { gasPrice: i, assembledRequest: a } = await n.provider.assembleTx({
      request: t,
      feePayerAccount: n,
      accountCoinQuantities: []
    });
    return t = await ts({
      gasPrice: i,
      provider: n.provider,
      transactionRequest: a,
      setMaxFee: s
    }), t;
  }
  /**
   * Deploy a contract of any length with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deploy(t = {}) {
    const e = this.getAccount(), { consensusParameters: n } = await e.provider.getChain(), s = n.contractParameters.contractMaxSize.toNumber();
    return this.bytecode.length > s ? this.deployAsBlobTx(t) : this.deployAsCreateTx(t);
  }
  /**
   * Deploy a contract with the specified options.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsCreateTx(t = {}) {
    const e = this.getAccount(), { consensusParameters: n } = await e.provider.getChain(), s = n.contractParameters.contractMaxSize.toNumber();
    if (this.bytecode.length > s)
      throw new B(
        L.CONTRACT_SIZE_EXCEEDS_LIMIT,
        "Contract bytecode is too large. Please use `deployAsBlobTx` instead."
      );
    const { contractId: i, transactionRequest: a } = await this.prepareDeploy(t), o = await e.sendTransaction(a);
    return {
      contractId: i,
      waitForResult: /* @__PURE__ */ $e(async () => {
        const f = await o.waitForResult();
        return { contract: new Ua(i, this.interface, e), transactionResult: f };
      }, "waitForResult"),
      waitForPreConfirmation: /* @__PURE__ */ $e(async () => {
        const f = await o.waitForPreConfirmation();
        return { contract: new Ua(i, this.interface, e), transactionResult: f };
      }, "waitForPreConfirmation"),
      waitForTransactionId: /* @__PURE__ */ $e(() => Promise.resolve(o.id), "waitForTransactionId")
    };
  }
  /**
   * Chunks and deploys a contract via a loader contract. Suitable for deploying contracts larger than the max contract size.
   *
   * @param deployOptions - Options for deploying the contract.
   * @returns A promise that resolves to the deployed contract instance.
   */
  async deployAsBlobTx(t = {
    chunkSizeMultiplier: t_
  }) {
    const e = this.getAccount(), { configurableConstants: n, chunkSizeMultiplier: s } = t;
    n && this.setConfigurableConstants(n);
    const i = await this.getMaxChunkSize(t, s), a = L2(J(this.bytecode), i).map((O) => {
      const k = this.blobTransactionRequest({
        ...t,
        bytecode: O.bytecode
      });
      return {
        ...O,
        transactionRequest: k,
        blobId: k.blobId
      };
    }), o = a.map(({ blobId: O }) => O), d = P2(o), { contractId: h, transactionRequest: f } = this.createTransactionRequest({
      bytecode: d,
      ...t
    }), g = [...new Set(o)], y = await e.provider.getBlobs(g), R = g.filter((O) => !y.includes(O));
    let Q = E(0);
    const x = await e.provider.getChain(), N = await e.provider.estimateGasPrice(10), U = x.consensusParameters.feeParameters.gasPriceFactor;
    for (const { transactionRequest: O, blobId: k } of a) {
      if (R.includes(k)) {
        const j = O.calculateMinGas(x), Z = Bi({
          gasPrice: N,
          gas: j,
          priceFactor: U,
          tip: O.tip
        }).add(1);
        Q = Q.add(Z);
      }
      const G = f.calculateMinGas(x), z = Bi({
        gasPrice: N,
        gas: G,
        priceFactor: U,
        tip: f.tip
      }).add(1);
      Q = Q.add(z);
    }
    if (Q.gt(await e.getBalance()))
      throw new B(L.FUNDS_TOO_LOW, "Insufficient balance to deploy contract.");
    let H;
    const X = new Promise((O) => {
      H = O;
    });
    return { waitForResult: /* @__PURE__ */ $e(async () => {
      const O = [];
      for (const { blobId: j, transactionRequest: Z } of a)
        if (!O.includes(j) && R.includes(j)) {
          const $ = await this.assembleTx(Z, t);
          let v;
          try {
            v = await (await e.sendTransaction($)).waitForResult();
          } catch (u) {
            if (u.message.indexOf(`BlobId is already taken ${j}`) > -1) {
              O.push(j);
              continue;
            }
            throw new B(L.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          }
          if (!v.status || v.status !== qf.success)
            throw new B(L.TRANSACTION_FAILED, "Failed to deploy contract chunk");
          O.push(j);
        }
      await this.assembleTx(f, t), H(f.getTransactionId(await e.provider.getChainId()));
      const G = await (await e.sendTransaction(f)).waitForResult();
      return { contract: new Ua(h, this.interface, e), transactionResult: G };
    }, "waitForResult"), contractId: h, waitForTransactionId: /* @__PURE__ */ $e(() => X, "waitForTransactionId") };
  }
  /**
   * Set configurable constants of the contract with the specified values.
   *
   * @param configurableConstants - An object containing configurable names and their values.
   */
  setConfigurableConstants(t) {
    try {
      if (!Object.keys(this.interface.configurables).length)
        throw new B(
          L.CONFIGURABLE_NOT_FOUND,
          "Contract does not have configurables to be set"
        );
      Object.entries(t).forEach(([n, s]) => {
        if (!this.interface.configurables[n])
          throw new B(
            L.CONFIGURABLE_NOT_FOUND,
            `Contract does not have a configurable named: '${n}'`
          );
        const { offset: i } = this.interface.configurables[n], a = this.interface.encodeConfigurable(n, s), o = J(this.bytecode);
        o.set(a, i), this.bytecode = o;
      });
    } catch (e) {
      throw new B(
        L.INVALID_CONFIGURABLE_CONSTANTS,
        `Error setting configurable constants on contract: ${e.message}.`
      );
    }
  }
  getAccount() {
    if (!this.account)
      throw new B(L.ACCOUNT_REQUIRED, "Account not assigned to contract.");
    return this.account;
  }
  async prepareDeploy(t) {
    const { configurableConstants: e } = t;
    e && this.setConfigurableConstants(e);
    const { contractId: n, transactionRequest: s } = this.createTransactionRequest(t);
    return await this.assembleTx(s, t), {
      contractId: n,
      transactionRequest: s
    };
  }
  /**
   * Create a blob transaction request, used for deploying contract chunks.
   *
   * @param options - options for creating a blob transaction request.
   * @returns a populated BlobTransactionRequest.
   */
  blobTransactionRequest(t) {
    const { bytecode: e } = t;
    return new _o({
      blobId: _r(e),
      witnessIndex: 0,
      witnesses: [e],
      ...t
    });
  }
  /**
   * Get the maximum chunk size for deploying a contract by chunks.
   */
  async getMaxChunkSize(t, e = t_) {
    if (e < 0 || e > 1)
      throw new B(
        L.INVALID_CHUNK_SIZE_MULTIPLIER,
        "Chunk size multiplier must be between 0 and 1"
      );
    const n = this.getAccount(), { consensusParameters: s } = await n.provider.getChain(), i = s.contractParameters.contractMaxSize.toNumber(), a = s.txParameters.maxSize.toNumber(), o = 64e3, d = a < i ? a : i, h = d < o ? d : o, f = this.blobTransactionRequest({
      ...t,
      bytecode: er(32)
    }).addResources(
      n.generateFakeResources([
        { assetId: await n.provider.getBaseAssetId(), amount: E(1) }
      ])
    ), g = (h - f.byteLength() - At) * e;
    return Math.round(g / At) * At;
  }
}, $e(Pn, "ContractFactory"), Pn), HR = 9, VR = 3, WR = 9, YR = 9, jR = 18, ZR = 15, JR = 12, qR = 9, X2 = Object.defineProperty, rw = (r, t) => X2(r, "name", { value: t, configurable: !0 }), e_ = {
  programType: "contract",
  specVersion: "1",
  encodingVersion: "1",
  concreteTypes: [
    {
      type: "()",
      concreteTypeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
    },
    {
      type: "enum standards::src5::AccessError",
      concreteTypeId: "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d",
      metadataTypeId: 1
    },
    {
      type: "enum standards::src5::State",
      concreteTypeId: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      metadataTypeId: 2
    },
    {
      type: "enum std::option::Option<struct std::contract_id::ContractId>",
      concreteTypeId: "0d79387ad3bacdc3b7aad9da3a96f4ce60d9a1b6002df254069ad95a3931d5c8",
      metadataTypeId: 4,
      typeArguments: [
        "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
      ]
    },
    {
      type: "enum sway_libs::ownership::errors::InitializationError",
      concreteTypeId: "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893",
      metadataTypeId: 5
    },
    {
      type: "enum sway_libs::upgradability::errors::SetProxyOwnerError",
      concreteTypeId: "3c6e90ae504df6aad8b34a93ba77dc62623e00b777eecacfa034a8ac6e890c74",
      metadataTypeId: 6
    },
    {
      type: "str",
      concreteTypeId: "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    },
    {
      type: "struct std::contract_id::ContractId",
      concreteTypeId: "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54",
      metadataTypeId: 9
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyOwnerSet",
      concreteTypeId: "96dd838b44f99d8ccae2a7948137ab6256c48ca4abc6168abc880de07fba7247",
      metadataTypeId: 10
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyTargetSet",
      concreteTypeId: "1ddc0adda1270a016c08ffd614f29f599b4725407c8954c8b960bdf651a9a6c8",
      metadataTypeId: 11
    }
  ],
  metadataTypes: [
    {
      type: "b256",
      metadataTypeId: 0
    },
    {
      type: "enum standards::src5::AccessError",
      metadataTypeId: 1,
      components: [
        {
          name: "NotOwner",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "enum standards::src5::State",
      metadataTypeId: 2,
      components: [
        {
          name: "Uninitialized",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          name: "Initialized",
          typeId: 3
        },
        {
          name: "Revoked",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "enum std::identity::Identity",
      metadataTypeId: 3,
      components: [
        {
          name: "Address",
          typeId: 8
        },
        {
          name: "ContractId",
          typeId: 9
        }
      ]
    },
    {
      type: "enum std::option::Option",
      metadataTypeId: 4,
      components: [
        {
          name: "None",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        },
        {
          name: "Some",
          typeId: 7
        }
      ],
      typeParameters: [7]
    },
    {
      type: "enum sway_libs::ownership::errors::InitializationError",
      metadataTypeId: 5,
      components: [
        {
          name: "CannotReinitialized",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "enum sway_libs::upgradability::errors::SetProxyOwnerError",
      metadataTypeId: 6,
      components: [
        {
          name: "CannotUninitialize",
          typeId: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d"
        }
      ]
    },
    {
      type: "generic T",
      metadataTypeId: 7
    },
    {
      type: "struct std::address::Address",
      metadataTypeId: 8,
      components: [
        {
          name: "bits",
          typeId: 0
        }
      ]
    },
    {
      type: "struct std::contract_id::ContractId",
      metadataTypeId: 9,
      components: [
        {
          name: "bits",
          typeId: 0
        }
      ]
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyOwnerSet",
      metadataTypeId: 10,
      components: [
        {
          name: "new_proxy_owner",
          typeId: 2
        }
      ]
    },
    {
      type: "struct sway_libs::upgradability::events::ProxyTargetSet",
      metadataTypeId: 11,
      components: [
        {
          name: "new_target",
          typeId: 9
        }
      ]
    }
  ],
  functions: [
    {
      inputs: [],
      name: "proxy_target",
      output: "0d79387ad3bacdc3b7aad9da3a96f4ce60d9a1b6002df254069ad95a3931d5c8",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Returns the target contract of the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Returns"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * [Option<ContractId>] - The new proxy contract to which all fallback calls will be passed or `None`."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "storage",
          arguments: ["read"]
        }
      ]
    },
    {
      inputs: [
        {
          name: "new_target",
          concreteTypeId: "29c10735d33b5159f0c71ee1dbd17b36a3e69e41f00fab0d42e1bd9f428d8a54"
        }
      ],
      name: "set_proxy_target",
      output: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Change the target contract of the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Additional Information"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" This method can only be called by the `proxy_owner`."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Arguments"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * `new_target`: [ContractId] - The new proxy contract to which all fallback calls will be passed."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Reverts"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * When not called by `proxy_owner`."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "doc-comment",
          arguments: [" * Write: `1`"]
        },
        {
          name: "storage",
          arguments: ["read", "write"]
        }
      ]
    },
    {
      inputs: [],
      name: "proxy_owner",
      output: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Returns the owner of the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Returns"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * [State] - Represents the state of ownership for this contract."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "storage",
          arguments: ["read"]
        }
      ]
    },
    {
      inputs: [],
      name: "initialize_proxy",
      output: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Initializes the proxy contract."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Additional Information"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " This method sets the storage values using the values of the configurable constants `INITIAL_TARGET` and `INITIAL_OWNER`."
          ]
        },
        {
          name: "doc-comment",
          arguments: [
            " This then allows methods that write to storage to be called."
          ]
        },
        {
          name: "doc-comment",
          arguments: [" This method can only be called once."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Reverts"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * When `storage::SRC14.proxy_owner` is not [State::Uninitialized]."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Writes: `2`"]
        },
        {
          name: "storage",
          arguments: ["write"]
        }
      ]
    },
    {
      inputs: [
        {
          name: "new_proxy_owner",
          concreteTypeId: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c"
        }
      ],
      name: "set_proxy_owner",
      output: "2e38e77b22c314a449e91fafed92a43826ac6aa403ae6a8acb6cf58239fbaf5d",
      attributes: [
        {
          name: "doc-comment",
          arguments: [" Changes proxy ownership to the passed State."]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Additional Information"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " This method can be used to transfer ownership between Identities or to revoke ownership."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Arguments"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [
            " * `new_proxy_owner`: [State] - The new state of the proxy ownership."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Reverts"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * When the sender is not the current proxy owner."]
        },
        {
          name: "doc-comment",
          arguments: [
            " * When the new state of the proxy ownership is [State::Uninitialized]."
          ]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" # Number of Storage Accesses"]
        },
        {
          name: "doc-comment",
          arguments: [""]
        },
        {
          name: "doc-comment",
          arguments: [" * Reads: `1`"]
        },
        {
          name: "doc-comment",
          arguments: [" * Writes: `1`"]
        },
        {
          name: "storage",
          arguments: ["write"]
        }
      ]
    }
  ],
  loggedTypes: [
    {
      logId: "4571204900286667806",
      concreteTypeId: "3f702ea3351c9c1ece2b84048006c8034a24cbc2bad2e740d0412b4172951d3d"
    },
    {
      logId: "2151606668983994881",
      concreteTypeId: "1ddc0adda1270a016c08ffd614f29f599b4725407c8954c8b960bdf651a9a6c8"
    },
    {
      logId: "2161305517876418151",
      concreteTypeId: "1dfe7feadc1d9667a4351761230f948744068a090fe91b1bc6763a90ed5d3893"
    },
    {
      logId: "4354576968059844266",
      concreteTypeId: "3c6e90ae504df6aad8b34a93ba77dc62623e00b777eecacfa034a8ac6e890c74"
    },
    {
      logId: "10870989709723147660",
      concreteTypeId: "96dd838b44f99d8ccae2a7948137ab6256c48ca4abc6168abc880de07fba7247"
    },
    {
      logId: "10098701174489624218",
      concreteTypeId: "8c25cb3686462e9a86d2883c5688a22fe738b0bbc85f458d2d2b5f3f667c6d5a"
    }
  ],
  messagesTypes: [],
  configurables: [
    {
      name: "INITIAL_TARGET",
      concreteTypeId: "0d79387ad3bacdc3b7aad9da3a96f4ce60d9a1b6002df254069ad95a3931d5c8",
      offset: 13368
    },
    {
      name: "INITIAL_OWNER",
      concreteTypeId: "192bc7098e2fe60635a9918afb563e4e5419d386da2bdbf0d716b4bc8549802c",
      offset: 13320
    }
  ]
}, H2 = [
  {
    key: "7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd55",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    key: "7bb458adc1d118713319a5baa00a2d049dd64d2916477d2688d76970c898cd56",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    key: "bb79927b15d9259ea316f2ecb2297d6cc8851888a98278c0a2e03e1a091ea754",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  {
    key: "bb79927b15d9259ea316f2ecb2297d6cc8851888a98278c0a2e03e1a091ea755",
    value: "0000000000000000000000000000000000000000000000000000000000000000"
  }
], qr, r_ = (qr = class extends Ua {
  constructor(t, e) {
    super(t, e_, e);
  }
}, rw(qr, "Src14OwnedProxy"), D(qr, "abi", e_), D(qr, "storageSlots", H2), qr), n_ = uI(
  "H4sIAAAAAAAAA9Vbe3Abx3lfgCAFvayz+TAFSjaUUjJkRwosUQ4ly9IhIATSEM2DSVpUGBhg64c0cSyIlVQ5tsccN001aSZlHcdlO06GrtOp6z4GAB+C7T7YR2bUiTtlZhxbTeMWmiatFAst60YZqm6j/r5v93DHw4GOJ84f0QznFne73+5+j9/32FVgISxOCOEV/K/Dn7o259GuXRO/JcSQ8c6CML4nwkZJF8HFnWLovZLXeK/kOyG89+JbGN9C+BZe+q2uEfRE4LIBGiv1VHThdi0i5gJdGTHa7TW0WNNY4JLmoFfXE4jPi3T5ep/q112j337Vr8WIF3PV373nAol5YfTls6OG8Id6m9E3+DG0tVB5F96/onG7b0akejWh9XaMpWNhYcSnL44exPv49JzLnNtoTtDMpMvaR0FvmxHPaaPd6B/rGDMSxRCP7WmaMxJ5I10Wt47qYg2etxnR/CJ/i7Tj29nuSr/42Tlux3yYLygC36+aMxiIzotTuuck+LeD+If9hoxEIQS6MdDX8DxgRAudNvrzNvql96Hvl/TFJdDfaaPfDbo9oL8az7tBf8hGf8GiXxTL0/cuKPpPg36Hjf4R0O1V678H9E9b9IuaRX+m9X3on1f0HwD9XTb6Z0A3Cfrr8LwX9Ccs+jOWnOIzkm+16c8p+juXvl/9f0Z0GnonHP19CeqfigmR6hGeVER4jb5Z7FH7a+jL32Atf2tEp84ELoUxV9XYQzQWOnVO6pRvzIi+AhugdTehPVtpV8/r/TyPTcxWdIv246CfIf3dHNGEES0GjXihRHSq9+z5slrHBOYLy3XkJ7nN6zg7brar17F6c0AXYjP+lr5fNWW+x/4nqsc1PK3mHLLmLGatOaddxtSxboHPsGHF6/7Zc6MDGJNs1o347CJ4/i/pcrgEvl/AvOcCl3Teb+CCk5b/tmq5zVyE3P4cNP4C4/8S40+7y63uklr7GUtuReKXktuMfxm5tSq5ST10lVvdu6bcoON3KB0PGokpjTAq8H1nf8/vME4lcoRlQann+TFux9rnHLTfgQ2QzuCbbw57PgJcDIZ660lOYab/PejIBez77aq1vyH3nfdjfDePjxaL3I5gzmh+Pn1Z22P0Cr+kuRnYOTuEdjfhMeQziXYoFKsXkq9OPVxxCnbrH+3C2Eg75Dnt5geO0V5TPeBNr+ZJxTTowNkh6EAwlKzXoaunIb//hA4sQJb/ZcSnFqUO0J6ctPyHXXRgHuNeBY3XoAN/Bj08X0MHjigd6LZ0oPCSKXfIbX0qnhtMJXL3dXh891q2MA0ZOmmt/JaiFcR48If1qZPb0haOuNjCtiW2kBTe1CDah9U+0oXiaAbjUy0C6/A1xjRxqktsT0VzhxojQge+ebHGwB28pkLRiAi/EX8lyHyMgY/xmUnwYBp8nEmX9VkjMW0ELpLukS059c/7lotMNJtMwqD1b6D17+DtRcgEOFRLJit+6JQJYgoN6wG+G/l0OVOAXKbAk87ARYll1bbtnXKRaxFzn8U68BSvYDywwU2u3neVLM7bbDtj2fb0Ym3b9mxStl3xN9W27X3PtO2vCHHzc34zXhKTgeikCMTHRSAxJgJ9JWH052CP5h6dcZgI8B4jAnGOWIv1HjGiuU6JD851iTbqC7sKh8o+yCOX5XZ02mr3+PTAD4V4htZxNSwmsK7fxvruXhS0zhXmOuUasb5ESaTB38AVzHc1aPZfofo/Ze3Lc5HHDGNfh0qw+6q1fZL40QjdOdUt7sZTx3M1/Li3MdJEfthzB2JKrHMB6/RChjch1jpjrhnjd5PfAu40utCOUkzY2BsUpw6KGxt7gkRb0kvkzmHMesR2uuRx2Dm2i2XZB5s08TESlLgWoXgyn8EaQ6HedoqhbwC9bPqyuA7vgzXohVkGhLtl4CbRonZ0Ghhs0TIiGvkO2D3Fl9inTvtsIswtcjvG89WDHzrmg83ivfKf/P1wE2SSgRzB96uGKZenlFwq+iblWJL40RMkDBEUN2u9u0Q6Aru4gtjoqubUA7u+ZphGAnKFrpKtMW/KhPM5ndtxxNrqvRZDPM5xCPhJ+A7d4yfpHeaC3mVc9M4+H3x/lX1ka9nHSSH+2GYfrZgXtrhUP9AnyrqXhO4ZogUYqQMjpX4A16EfKzEHYgCao4r+J1ievGfSDciN2tEZWtcEyzPZZMoqCFn5+H0XvWcbPMftSJfVtmxwwYUXdVWyw94CV/BnyanOaa/gm2b2Z9wq+8YC0VxlLObSbONN+91vG29YfAcNwjXob+CdXLV+98Fe+pEfDaAP4jHCeEefWwL9ZI+78AcdMwTZ5QbYWJhzM9gYYbJjzK2Krr4M3U0c//RDt7hPvVsfznu2JjuMwBWd9m3YcGv/B+CbZxm+fYh8rzsXOITx/ZBzdOHjMgbMXwQtituADYiTONajGCxvWHEb7LYqbhMPKfzvlvg/NcZtxv9Cd6Udz8MnuuUHvqwt1pHzRwuUE9A4Fz/oOy79YIH8oBmPIp6nfMvN54tBRf+IlQtMEQ6qXGAqo74Beym2yl2PmOYG+t3WA9w7KPxtPR1jW7pBuzsLbJ7K7O7xzcN3NJDfgO3BZxTO23zGdYQHsG/KNf1tsQ5diyHeTMA+D5IdYr0xxLDURvxsHwteE35hXe2ob+SGVSylfFQ+KOOoKRm7ESaTXQ8SxhmQOWR6VXfqnN3WupdiXJblz3FUuV6H7/Nh3SEzPgbGdIf6pqFPYdKnbhfa12x+2MLPYdCGL8Yawbcm4l9I62mnusTN6ll/s3z61qea5jAfeHRC534x/KZ+8ll/M56w35zpI7EmrLWDeEE1CenfIANT9g6575R6Aru1dFnlOFV9Q8ofS9/C+UqecAO8QJ6RyMs19LBvzr7Y63uB7IJ1BjqK71m8H8f7SV4b6xJ8bDRntRO5jLWOnMyfUD8A35vS5Wwzy/0wyZL9KzC64l+vKX6vs8lSt+Mm4T/+6vHXAH+0gv2gigWYZ3GSo0Zy1G24tK46nhLjLn7wNHSklbARa2wNleFT4oypreyDh3MNqUO5FbAZ8lF+LdksmpMxHT7PQ/4J77xtg4NiywCYvPEBPTCUFVryAT2dhO/W0R9xGPvDcmYlYvBVWP9qrL+V6UfY32e4jbwO/VspXlE+fdzmx8wYxM4jpe+kiz5h2W+uFXF6Hb3Dk/kGGWFfLKMw+NYaSkyT/mH+9jmFp9D/Cp6afLPbFvI1Sx6Yw+A1S50l2hSbEF61ks6m+nL1sGWN/A7yFr/Rq/vBY9QVKZ/B3rm21GXV8qTsjnz4PsVjs2H/PNktchCOSRx5xXa2jzTHyeFQClg1nA8D47YcBz4Bo6j+cx68HKY8H+8fOt5NeZFpu2RDs0XLhmaGpM06/XHdE7LOCrsxx/WofJ/G9SAOYgwlGzpLORRjOHKjuxzr/W/269H8ONa0g2p4JmZSXNAC3mLN7ci9QqgD6Oa3VDRfrzB3DfD3DNqUI9hy2akh7O3T+DuGuuWQGVdBz9eCb7rE5yL5FunH4lN+zD+i1i1tn8ZR/MZx91mKq8kPUCyHmtL0S2bu6tjPd5SPJblCR4qEm5r0sVMU33Ebaxamz6DaO35/Vu1hFdqP2b7V0TfKeRojPs7XtaSuI+6MEW2su5KfgietDppPKJoRtB930HzCheYnZT7suq+vK99MMlD58BTlHKrOkfM76J+20Yf/RV32skiCp1TXMWVxI+Regoz2jsQ+EYHeTaBWAd63YJ4Z5LCuddl/VjUuo9KXfDS1Y1vw3qIPmYVtMtuFvRVr7O0zam+qpk97m6Y4w9wb9rGEr19SfKV9ZbCvg1h7ybGvIvb1ceyrDt9O2/bVWmNfL6l9Bd33ZdG37ws6QLVaVR8iG5mi2HCJjQS6eK2eQBfXfr5CY1CDq9iZrG25+doKX6geq+I9qrHPEu+xlgbCINTV3Hy6937l08flfqjvzEVuR4gPs5W9uceagmurWPfDdMYBXsbB5wTbYWXdUxR78t4hkwUlo1a0R13wYFzZ/GnL5gtk89C7Qg7P+4xelddzjq/wS557vGTm31jXKkULOIrzoMvaR4EZ5C/8CjMqfRn3VIwI7CLd4pgW63tPrU/Fi9OaWhvFKXJvsYzM/3mfM7LOETlB9TiV5z/A8bYL3zg+MvdPeSTe3YQzBML8f8J4lcdW1VPvUzVdqj2a9k28NuuYbYgbsqhjHqc6Jn5vIL5K3PCg5kQ6ZWG3ev/oM+SrKvGRx4yPbPm8p1TxxxTj0t7gD+Fbw1bcD9/UJTI1cHOD+t2EdovJV9s3wXqP8yz6bsMkE6c2mO9UP9gJ8yxK80q54BnTwvjzq9hQ+rVIkORO+sfxKugYKh9Y41jHLer3BrQ/4lg/favYKNeQQEvOi2dMC8l5cQ5jxcYUb1AOpM6uqmLkAGHJMrRs8a06H6hNawXRknENZGXlFmY9omasW6lxmTEu5nghOh1UMY5bfGvPexdteW+nzHuR61p5r8opeQ+o/9TOe08q3bblvaRPZt57xJb3XqxhUwWXvDdXO+8VXHems1Rb3gvfUzPv3eeS99r0H3jzwfLecSvvzVPOgTOjwiL22WnLe7nu6ZL3EnaZeS/VGSnvrYwFvU5uSz1PO/LeTpX3Up1c1iIJt6y8d/GnyE3DP2FuGv4wc1PozuhPmpui75M/T7lpla2q/MXFLt1qjr73qzkGoiUxgjqqqunX2+uqhLXQQ8Za9b1Bfa/47JEuTx31AY16uS7hrJPZ68LIoaz9OGq07ZRjNCd9c5TrNsrntpGIF/VHrj0G8dTxbAIfyBdQzkE1I1lb70esSfkdxhEekm+C7TRQX+SEK+zfIXuq4aOG2UX7Ixqo+WrIXbV6/qbqm1Sz5n7JDrOfhj5ezFfH3xQ97hPrYvxFP8qBSX/pnopZJxizycsNkxEPLJFziDCZ6o9LbRc1AZsOgG7IRQ/sdHE/pRrrHTWM4PI1DJu9Uz5LfKT4IQnMg79ifGWsz827nXdDrgXyTWwbZR5Ddwh4jPO8GH1zCmMXuD/OlEF30rRj51nmSeF73XYW63IXIj+vvpmY7Acmr6yNyfn53T0dhDcW3vYhRxqi857YmDwPBy7E8/N3xnzjsv6/xH7NuokNL71WTT4NvBy24iclX4opvmCLmW6kNvqQjo8tjY8RE1BthfYWz1GM6a3lr8CbF1zOZo+RDgHD6O6BjI8SeaqPUB0I/g9nNHxuDJrV9Gaqz40R/w2QLtSTn2lQe6Fza2o7zq1zYfY7/QUaI8+a+/OoUwW3wj5vBTbehvkn5fzI/6rn/3b1/MDqyrk17jOUg3tA607Q2gtaiBNqnVuLAy68CdnWaJ2H96MuUw5uAd1bQBe5W+6MPMt2XeOPXdZI9T5zjROgtRO0OkBrF2jBZmqucaPLGtdRrGDTgSG5Fjf51/P5tn18OqWJdCroSaegN1ey0F3o5tWM0/fYdFfI8+Cl9ctWaz/QQaplRsxaJp+VGdymPGA4twq1TIrp11AdXIv59OZYM/sXrmXCj7QNDuiqlimolskx1KcI42JzqGsKbiebKXYIaoj/if+obV6P2uYNqG020jm6rbZJd1a4tsn+2HxPbVqTdX6J89ZKrdPct73+uMRPAQNCzrMu8PcA+atUMixSg2FPqjfstdmzXe9x11BHHdbAXb3wGtDSLJlV0fwSywz+DndE5F2IQzncxQuvBY3rsF/IP4fzMvjtqrimvk+dWfOZ3zL+x4zpbBjvteIMC+NxT4vxmvDTxHjcBXHDeO9tDoynOLgGxnu3qhxW9pcYz3dE3THe+zUXjKe43sT40gfE+JILxo8B48MK4zEHY3zJwnjwZ5nzefhI1IoRb8UXdmsxDZiawx0g5z5WrKZarPTtFK9TjV5bCb1sw3MV363j+jR/O8/9UDfHeuncGvEI67c6l8N5bDVebFe1Kds5HuxT3SujGo/7fTTRoPwY6tmV2M3tTF/FEuy/KI7gengYdxICB6lgnRTPoha8Q4d8dKFvge6nN8I29KwIRurEvYhF78Y7GW9U3VWwxxvFKswZ5lhdCx0GD/rhryyf8wvKz9yv2g7bk/dFlsqhoYPthM8ouIZR4jbH9nxWQDhBcTvdeeUzC2DYuhTOyimnQx95V1jyl843TJmNm++hf42UE9HdaIV5VNOzMC/ZpW8Br0IbB0RggDFP3kdEvUiLDQicZzTzfWfUAVDLaWL68EvAP5ozByxpAR7cqO5KkK2a/oDupgL/2EaoLiTfo61s0vyG8wK33KgB90QqOa6qL+H+oFVf2oy9bcKaPkL1JZVPtqraxQTnTYy9aC+5LwKZLn+2pGIkyBr662I737HbDseflNPLGgV8WNVZkh3bcFcLdBGrVmORb4fCLcRjzD+ZS+B+OOfV0v4kJsD+3M5YQOPv+F6KvLO3AxiwhzAglVi4U+sJ4mxqYa/WG55L9S/chXrbHPA8C6wJhgabxzDXDUbMCPHv2OYxo0sPc/45BOzsGRwzDuFeOsWe6CvnBoOXYuMlFQdiPO7IXxZtqs4J3nfNGd068A41mMqdzgLdtwe+bXa904la4OdULbIFtRO6B9MFvqk7V1V9v6l0hWogpq5U7kBDV7ZDV4LQlU32WiSwFHfWKjhj6oJNXnXynBFxskM33yS9xJrWgkeEj3TGD/mg3rSsfOpvN+WjZPQpyGifxGlVVyNb7kPewPUAxlnEjqBVuVvr3Lvfo7CW7sJDVoQFU6Sf8Hmw1XjhTKWdKJCv4bW6+07PBcddbr5H6ND/keq71Pg/BZW71HRfP9iLOOEeYEKftG/3u9Sof2ypvm+Zp9pEJ2jsxvg9GN/tdt8S6zDv0VIOp2Su7l5KmX8MMm+DzDfwPVqpS83QJdJNA7pUuQPm0GM+h7DO4/iOlTqDWwiD5nrQDCzVI+iJFbsu55P31/bJ/oWfpU+GbDln+qA+GePeruWTf1b/sqPHTj+WPjEy+vCD9N+CxC8/eCJtf/f49NCf/NW3Wo/vXP/7r06u2ub76pu9W1viT24589bR7LmJvx+UfY/9yqMPjjK9o48ePXF05JGjn31QkrHoyT4bv7vq7RduWeV5nf8J7/7s9hd3bXj+pmv8T4jXHnvm8eZ/3Py1F1vevVzY+uQj536t9cwfPn167vdK+wIrb/qDgQMjjzzyiyO/9OnY6Oix0T17BniR9xw70S+XL764+Zt3fP7A9t/N/+ZE57Nf/vrLvkvPvzZ7cNOb//qZYwfLl18+uv/V/5j8h4eu+8Ku/xk+uePbe3/06xf23ZVr+sG7/m8Uv9HxR0fvemvl2vu9D6f3bfzxUz/47sbnHn7u7V/9ja6rX/3i3kfH/9To/dHLkms7/1c+d7yuns+r50H5vF19335ePtvfkM8W9X3lEfn0qff1n1PPDvV8Vj7rJuXT88b/AzdExjYINgAA"
), Kr, $R = (Kr = class extends z2 {
  constructor(t) {
    super(
      n_,
      r_.abi,
      t,
      r_.storageSlots
    );
  }
  static deploy(t, e = {}) {
    return new Kr(t).deploy(e);
  }
}, rw(Kr, "Src14OwnedProxyFactory"), D(Kr, "bytecode", n_), Kr);
export {
  Ki as ASSET_ID_LEN,
  Yx as AbstractAccount,
  kR as AbstractContract,
  jg as AbstractProgram,
  vR as AbstractScriptRequest,
  Vo as Account,
  wt as Address,
  Dx as AddressType,
  mt as ArrayCoder,
  ot as B256Coder,
  JE as B512Coder,
  Lx as BALANCES_PAGE_SIZE_LIMIT,
  Ux as BLOCKS_PAGE_SIZE_LIMIT,
  E_ as BN,
  kr as BYTES_32,
  fa as BaseTransactionRequest,
  Kx as BaseWalletUnlocked,
  rt as BigNumberCoder,
  _o as BlobTransactionRequest,
  $E as BooleanCoder,
  Ot as ByteArrayCoder,
  KE as ByteCoder,
  at as CHAIN_IDS,
  ed as CONTRACT_ID_LEN,
  iR as CONTRACT_MAX_SIZE,
  Fx as ChainName,
  ER as ChangeOutputCollisionError,
  yt as Coder,
  pb as Commands,
  Ua as Contract,
  z2 as ContractFactory,
  wd as CreateTransactionRequest,
  YR as DECIMAL_FUEL,
  qR as DECIMAL_GWEI,
  ZR as DECIMAL_KWEI,
  JR as DECIMAL_MWEI,
  jR as DECIMAL_WEI,
  WR as DEFAULT_DECIMAL_UNITS,
  VR as DEFAULT_MIN_PRECISION,
  HR as DEFAULT_PRECISION,
  Gx as DEFAULT_RESOURCE_CACHE_TTL,
  zR as DEVNET_NETWORK_URL,
  Q_ as DateTime,
  yi as ENCODING_V1,
  sR as EmptyRoot,
  wp as EnumCoder,
  L as ErrorCode,
  FB as FAILED_ASSERT_EQ_SIGNAL,
  OB as FAILED_ASSERT_NE_SIGNAL,
  QB as FAILED_ASSERT_SIGNAL,
  DB as FAILED_REQUIRE_SIGNAL,
  Wp as FAILED_TRANSFER_TO_ADDRESS_SIGNAL,
  AR as FAILED_UNKNOWN_SIGNAL,
  LR as Fuel,
  __ as FuelAsm,
  f2 as FuelConnector,
  Vg as FuelConnectorEventType,
  Eu as FuelConnectorEventTypes,
  Hg as FuelConnectorMethods,
  B as FuelError,
  ew as FunctionInvocationScope,
  zx as GAS_USED_MODIFIER,
  Gc as HDWallet,
  K2 as INPUT_COIN_FIXED_SIZE,
  Cr as InputCoder,
  il as InputCoinCoder,
  ao as InputContractCoder,
  gn as InputMessageCoder,
  vt as InputType,
  Bu as InstructionSet,
  rr as Interface,
  t2 as Language,
  p2 as LocalStorage,
  hR as MAX_PREDICATE_DATA_LENGTH,
  uR as MAX_PREDICATE_LENGTH,
  cR as MAX_SCRIPT_DATA_LENGTH,
  oR as MAX_SCRIPT_LENGTH,
  dR as MAX_STATIC_CONTRACTS,
  aR as MAX_WITNESSES,
  $l as MNEMONIC_SIZES,
  a2 as MemoryStorage,
  mu as Mnemonic,
  o2 as MnemonicVault,
  D2 as MultiCallInvocationScope,
  kx as NON_PAGINATED_BALANCES_SIZE,
  mx as NoWitnessAtIndexError,
  CR as NoWitnessByOwnerError,
  K as NumberCoder,
  Nx as OperationName,
  Ip as OptionCoder,
  ol as OutputChangeCoder,
  Br as OutputCoder,
  al as OutputCoinCoder,
  oo as OutputContractCoder,
  dl as OutputContractCreatedCoder,
  lt as OutputType,
  cl as OutputVariableCoder,
  PB as PANIC_DOC_URL,
  MB as PANIC_REASONS,
  vr as PoliciesCoder,
  ke as PolicyType,
  PR as Predicate,
  c2 as PrivateKeyVault,
  bd as Provider,
  Yl as RESOURCES_PAGE_SIZE_LIMIT,
  eC as RawSliceCoder,
  ut as ReceiptType,
  gp as SCRIPT_FIXED_SIZE,
  GR as Script,
  vu as ScriptRequest,
  Yr as ScriptTransactionRequest,
  na as Signer,
  r_ as Src14OwnedProxy,
  $R as Src14OwnedProxyFactory,
  kd as StdStringCoder,
  MR as StorageAbstract,
  ul as StorageSlotCoder,
  rC as StrSliceCoder,
  nC as StringCoder,
  xo as StructCoder,
  XR as TESTNET_NETWORK_URL,
  yg as TRANSACTIONS_PAGE_SIZE_LIMIT,
  gl as TransactionBlobCoder,
  lr as TransactionCoder,
  ll as TransactionCreateCoder,
  _l as TransactionMintCoder,
  yd as TransactionResponse,
  Al as TransactionScriptCoder,
  qf as TransactionStatus,
  Ct as TransactionType,
  Tx as TransactionTypeName,
  pl as TransactionUpgradeCoder,
  fl as TransactionUploadCoder,
  Ep as TupleCoder,
  kn as TxPointerCoder,
  io as UTXO_ID_LEN,
  hl as UpgradePurposeCoder,
  qe as UpgradePurposeTypeEnum,
  zl as UpgradeTransactionRequest,
  Xl as UploadTransactionRequest,
  nR as UtxoIdCoder,
  OR as Vault,
  sC as VecCoder,
  At as WORD_SIZE,
  Ke as Wallet,
  Mg as WalletLocked,
  QR as WalletManager,
  hn as WalletUnlocked,
  xr as WitnessCoder,
  St as ZeroBytes32,
  kv as addAmountToCoinQuantities,
  xi as addOperation,
  Hi as addressify,
  Vf as aggregateInputsAmountsByAssetAndOwner,
  J as arrayify,
  gx as assemblePanicError,
  wg as assemblePreConfirmationTransactionSummary,
  bR as assembleReceiptByType,
  wx as assembleRevertError,
  Oi as assembleTransactionSummary,
  NR as assembleTransactionSummaryFromJson,
  Cd as assert,
  Eo as assertUnreachable,
  pR as assets,
  E as bn,
  _n as bufferFromString,
  IR as buildBlockExplorerUrl,
  zc as buildDryRunResult,
  T2 as buildFunctionResult,
  N2 as buildPreConfirmationFunctionResult,
  Wg as cacheFor,
  BR as cacheRequestInputsResources,
  bx as cacheRequestInputsResourcesFromOwner,
  Bi as calculateGasFee,
  Ff as calculateMetadataGasForTxBlob,
  iu as calculateMetadataGasForTxCreate,
  au as calculateMetadataGasForTxScript,
  fd as calculateMetadataGasForTxUpgrade,
  Qf as calculateMetadataGasForTxUpload,
  Of as calculateMinGasForTxUpload,
  Rx as calculateTXFeeForSummary,
  fp as calculateVmTxMemory,
  Y2 as capitalizeString,
  N_ as chunkAndPadBytes,
  tu as coinQuantityfy,
  q2 as compressBytecode,
  cp as computeHmac,
  ct as concat,
  yo as concatBytes,
  eR as createAssetId,
  W2 as createConfig,
  bo as dataSlice,
  P_ as decodeBase58,
  tR as decodeScriptData,
  uI as decompressBytecode,
  yE as decrypt,
  IE as decryptJsonWalletData,
  J2 as defaultConsensusKey,
  Z2 as defaultSnapshotConfigs,
  Yg as deferPromise,
  Iu as deployScriptOrPredicate,
  _d as deserializeChain,
  hx as deserializeInput,
  pd as deserializeNodeInfo,
  Ax as deserializeOutput,
  Nf as deserializeProcessedTxOutput,
  ux as deserializeProviderCache,
  Re as deserializeReceipt,
  FR as deserializeTransactionResponseJson,
  g2 as dispatchFuelConnectorEvent,
  Nd as encodeBase58,
  bE as encrypt,
  EE as encryptJsonWalletData,
  Ba as english,
  pg as extractBurnedAssetsFromReceipts,
  xu as extractInvocationResult,
  _g as extractMintedAssetsFromReceipts,
  Vl as extractResolvedOutputs,
  ou as extractTxError,
  Db as format,
  Nb as formatUnits,
  gC as fromDynamicInputToB256,
  fC as fromEvmAddressToB256,
  Rp as fromPublicKeyToB256,
  Mv as fuelAssetsBaseUrl,
  Df as gasUsedByInputs,
  Yo as getAbisFromAllCalls,
  ra as getAllDecodedLogs,
  Cu as getAllResultLogs,
  yx as getAssetAmountInRequestInputs,
  fR as getAssetById,
  lR as getAssetEth,
  _R as getAssetFuel,
  Dv as getAssetNetwork,
  hf as getAssetWithNetwork,
  gR as getAssetsByOwner,
  Ix as getBurnableAssetCount,
  Wo as getBytecodeConfigurableOffset,
  kg as getBytecodeDataOffset,
  Ug as getBytecodeId,
  dg as getContractCallOperations,
  lg as getContractCreatedOperations,
  G2 as getContractId,
  k2 as getContractRoot,
  U2 as getContractStorageRoot,
  mg as getDecodedLogs,
  Nv as getDefaultChainId,
  Di as getGasUsedFromReceipts,
  Go as getInputAccountAddress,
  Yf as getInputContractFromIndex,
  du as getInputFromAssetId,
  Uo as getInputsByType,
  Uf as getInputsByTypes,
  Gf as getInputsCoin,
  cu as getInputsCoinAndMessage,
  Xf as getInputsContract,
  zf as getInputsMessage,
  l2 as getLegacyBlobId,
  Po as getMaxGas,
  rR as getMessageId,
  su as getMinGas,
  nd as getMintedAssetId,
  pu as getOperations,
  Qi as getOutputsByType,
  Zf as getOutputsChange,
  uu as getOutputsCoin,
  Jf as getOutputsContract,
  jf as getOutputsContractCreated,
  Sx as getOutputsVariable,
  Ag as getPayProducerOperations,
  _2 as getPredicateRoot,
  lC as getRandomB256,
  vi as getReceiptsByType,
  $f as getReceiptsCall,
  Kf as getReceiptsMessageOut,
  Ox as getReceiptsTransferOut,
  kl as getReceiptsWithMissingData,
  Lf as getRequestInputResourceOwner,
  UR as getResultLogs,
  gg as getTotalFeeFromStatus,
  Mx as getTransactionStatusName,
  Hx as getTransactionSummary,
  Vx as getTransactionSummaryFromRequest,
  zo as getTransactionTypeName,
  Wx as getTransactionsSummaries,
  hg as getTransferOperations,
  ig as getWithdrawFromFuelOperations,
  Qx as hasSameAssetId,
  _r as hash,
  up as hashMessage,
  W as hexlify,
  Kl as hexlifyWithPrefix,
  ix as inputify,
  Ta as isAddress,
  Ln as isB256,
  ox as isCoin,
  Fe as isDefined,
  To as isEvmAddress,
  md as isInputCoin,
  yR as isMessage,
  Ll as isMessageCoin,
  Ul as isPredicate,
  Xd as isPublicKey,
  wR as isRawCoin,
  mR as isRawMessage,
  Rr as isRequestInputCoin,
  ko as isRequestInputCoinOrMessage,
  Lo as isRequestInputMessage,
  Pf as isRequestInputMessageWithoutData,
  zn as isRequestInputResource,
  gd as isRequestInputResourceFromOwner,
  xR as isTransactionTypeBlob,
  xx as isTransactionTypeCreate,
  cn as isTransactionTypeScript,
  RR as isTransactionTypeUpgrade,
  SR as isTransactionTypeUpload,
  Vn as isType,
  _u as isTypeBlob,
  Xo as isTypeCreate,
  hu as isTypeMint,
  Ho as isTypeScript,
  Au as isTypeUpgrade,
  lu as isTypeUpload,
  op as keccak256,
  $2 as keyFromPassword,
  Fb as max,
  Pa as mergeQuantities,
  Qb as multiply,
  xp as normalizeB256,
  Mf as normalizeJSON,
  j2 as normalizeString,
  ax as outputify,
  pC as padFirst12BytesOfEvmAddress,
  CE as pbkdf2,
  TR as processGqlReceipt,
  fg as processGraphqlStatus,
  er as randomBytes,
  vE as randomUUID,
  Pv as rawAssets,
  Ml as resolveAccountForAssembleTxParams,
  Qe as resolveGasDependentCosts,
  lf as resolveIconPaths,
  Gl as returnZeroScript,
  BE as ripemd160,
  ap as scrypt,
  cx as serializeChain,
  dx as serializeNodeInfo,
  Tf as serializeProviderCache,
  DR as serializeTransactionResponseJson,
  ts as setAndValidateGasAndFeeForAssembledTx,
  zt as sha256,
  Td as sleep,
  mC as sortPolicies,
  Xi as stringFromBuffer,
  _C as toB256AddressEvm,
  Ir as toBytes,
  Tb as toFixed,
  go as toHex,
  Pr as toNumber,
  Ar as toUtf8Bytes,
  Io as toUtf8String,
  Te as transactionRequestify,
  dp as uint64ToBytesBE,
  Af as urlJoin,
  kf as validateTransactionForAssetBurn,
  Wi as withTimeout,
  vx as withdrawScript
};
//# sourceMappingURL=browser.mjs.map
