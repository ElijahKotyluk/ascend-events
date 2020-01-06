export interface IEvent {
    name: string | symbol;
    fn: () => void;
}

export default class Event implements IEvent {
    public name: string;
    public fn: () => void;

    constructor(name: string, fn: () => void) {
        this.name = name;
        this.fn = fn;
    }
}
