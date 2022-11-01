/*! ffxiv-overlay-plugin | DSRKafuU (https://dsrkafuu.net) | Copyright (c) MIT License */
import OverlayAPI from './overlay';
export { OverlayAPI };
export { default as isCEFSharp } from './modules/isCEFSharp';
export { class2job, job2class } from './modules/jobClassConversion';
export { default as mergeCombatant } from './modules/mergeCombatant';
export type { JobType, EncounterData, LimitBreakData, CombatantData, ExtendData, EventType, EventData, EventCallback, } from './types';
