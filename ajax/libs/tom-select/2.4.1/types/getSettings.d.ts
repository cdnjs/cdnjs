import { TomSettings, RecursivePartial } from './types/index.ts';
import { TomInput } from './types/index.ts';
export default function getSettings(input: TomInput, settings_user: RecursivePartial<TomSettings>): TomSettings;
