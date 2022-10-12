import { TomSettings, RecursivePartial } from './types/index';
import { TomInput } from './types/index';
export default function getSettings(input: TomInput, settings_user: RecursivePartial<TomSettings>): TomSettings;
