export default class WorkTime {

    private _start: Date;
    private _stop: Date;
    private _today: string;

    constructor(start: string, stop: string) {
        
        this._today = this.getTodayDate();
        this._start = new Date(`${this._today}T${start}`);
        this._stop = new Date(`${this._today}T${stop}`);
    }

    get start() {
        return this._start;
    }
    get stop() {
        return this._stop;
    }
    get today() {
        return this._today;
    }

    private getTodayDate() {
        const date = new Date();
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }
}