import mitt from "mitt";
type EventType = 'reply'
export const emitter = mitt<Record<EventType, any>>(); 