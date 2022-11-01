export declare function addNumber(...args: number[]): number;
/**
 * damagePct, healsPct, etc.
 */
export declare function addPct(...args: string[]): string;
export interface HitData {
    hits: number;
    totalHits: number;
}
/**
 * directHitPct, critHitPct, etc.
 */
export declare function addHitPct(...args: HitData[]): {
    hits: number;
    hitPct: string;
};
export declare function addOverHealPct(...args: string[]): string;
export interface MaxHitData {
    hit: string;
    hitDamage: number;
}
/**
 * maxHit, maxHeal, etc.
 */
export declare function addMax(...args: MaxHitData[]): MaxHitData;
