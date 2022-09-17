export declare type JobType = 'dps' | 'healer' | 'tank' | 'hand' | 'land' | 'unknown';
export interface EncounterData {
    duration: string;
    durationSeconds: number;
    zoneName: string;
    dps: number;
    last10DPS: number;
    last30DPS: number;
    last60DPS: number;
    hps: number;
    damage: number;
    healed: number;
    shield: number;
}
export interface LimitBreakData {
    name: 'Limit Break';
    dps: number;
    hps: number;
    damage: number;
    healed: number;
    shield: number;
    maxHit: string;
    maxHeal: string;
}
export interface CombatantData {
    name: string;
    job: string;
    jobType: JobType;
    dps: number;
    last10DPS: number;
    last30DPS: number;
    last60DPS: number;
    hps: number;
    swings: number;
    hits: number;
    deaths: number;
    directHits: number;
    directHitPct: string;
    critHits: number;
    critHitPct: string;
    directCritHits: number;
    directCritHitPct: string;
    damage: number;
    damageTaken: number;
    damagePct: string;
    healed: number;
    healsTaken: number;
    healsPct: string;
    overHeal: number;
    overHealPct: string;
    shield: number;
    shieldPct: string;
    maxHit: string;
    maxHitDamage: number;
    maxHeal: string;
    maxHealDamage: number;
}
export interface ExtendData {
    active: boolean;
    encounter: EncounterData;
    combatant: CombatantData[];
    limitBreak?: LimitBreakData;
}
export declare type EventType = 'CombatData' | 'LogLine' | 'ImportedLogLines' | 'ChangeZone' | 'ChangePrimaryPlayer' | 'OnlineStatusChanged' | 'PartyChanged' | 'BroadcastMessage';
export interface EventData {
    type: EventType;
    extendData?: ExtendData;
    rseq?: number;
    [key: string]: any;
}
export declare type EventCallback = (data: EventData) => any;
