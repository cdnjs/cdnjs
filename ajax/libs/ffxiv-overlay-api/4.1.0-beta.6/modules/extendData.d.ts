import { EventMessage } from '../types';
/**
 * inject extended data
 */
declare function extendData(data: EventMessage, seperateLB: boolean): EventMessage;
export default extendData;
