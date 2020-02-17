export interface Listener {
    fn: Function;
    once: boolean;
}
export default class EventEmitter {

    // Properties
    maxListeners: number;
    events: Map<string | symbol, Listener[]>;

    // Methods
    constructor();
    private _addListener;
    addListener(eventName: string | symbol, listener: Function): EventEmitter;
    emit(eventName: string | symbol, ...args: any[]): EventEmitter;
    getListenerCount(eventName: string | symbol): number;
    setMaxListeners(num: number): EventEmitter;
    listeners(eventName: string | symbol): Listener[];
    off(eventName: string | symbol, listener: Function): EventEmitter;
    on(eventName: string | symbol, listener: Function): EventEmitter;
    once(eventName: string | symbol, listener: Function): EventEmitter;
    prependListener(eventName: string | symbol, listener: Function): EventEmitter;
    prependOnceListener(eventName: string | symbol, listener: Function): EventEmitter;
    removeAllListeners(eventName?: string | symbol): EventEmitter;
    removeListener(eventName: string | symbol, listener: Function): EventEmitter;
}