import type { Plugin } from '../types';
import type { PrivateEventsAPI, EventsAPI } from './events/events';
export type { EventsAPI };
declare const EventsPlugin: Plugin<EventsAPI & PrivateEventsAPI>;
export default EventsPlugin;
