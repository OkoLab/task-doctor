import WorkTime from "./WorkTime";
import {ITimePeriod, IClusterPeriod} from "./Interfaces"

export default class Clusters {
    private _clusterTime: number
    private _workTime: WorkTime;

    constructor(start: string, stop: string, clusterTime: number){
        this._workTime = new WorkTime(start, stop);
        this._clusterTime = clusterTime;
    }

    getEmpty(busy: Array<IClusterPeriod>): Array<IClusterPeriod> {
        const emptyPeriodsStack = this.getEmptyPeriodsStack(busy);
        const emptyClustersStack = this.getEmptyClusters(emptyPeriodsStack)
        return emptyClustersStack;
    }

    private getEmptyPeriodsStack(busyClusters: Array<IClusterPeriod>):Array<ITimePeriod> {
        const emptyPeriodStack: Array<ITimePeriod> = [];
        const sortBusyClusters = this.sort(busyClusters);
    
        const openingTime = this._workTime.start;
        const closingTime = this._workTime.stop;
    
        let currentTime = new Date(openingTime);
        for (let i = 0; i < sortBusyClusters.length; i++) {
            const busyStartTime = new Date(`${this._workTime.today}T${sortBusyClusters[i].start}`);
            const busyStopTime = new Date(`${this._workTime.today}T${sortBusyClusters[i].stop}`);
    
            const emptyPeriod: ITimePeriod = {
                start: currentTime,
                stop: busyStartTime
            };
            emptyPeriodStack.push(emptyPeriod);
            
            currentTime = busyStopTime;
        }
    
        if(currentTime<closingTime){
            const emptyPeriod: ITimePeriod = {
                start: currentTime,
                stop: closingTime
            };
            emptyPeriodStack.push(emptyPeriod);
        }
    
        return emptyPeriodStack;
    }

    private getEmptyClusters(emptyPeriodStack: Array<ITimePeriod>): Array<IClusterPeriod> {
  
        let emptyClustersStack: Array<IClusterPeriod> = [];
        for (let i = 0; i < emptyPeriodStack.length; i++) {
            let currentTime: Date = emptyPeriodStack[i].start;
            let finishedTime: Date = new Date(currentTime);
            finishedTime.setMinutes(finishedTime.getMinutes()+30);
            
            while(currentTime < emptyPeriodStack[i].stop && finishedTime < emptyPeriodStack[i].stop) {
    
                const emptyPeriod: IClusterPeriod = {
                    start: this.formatTime(currentTime),
                    stop: this.formatTime(finishedTime),
                };
                emptyClustersStack.push(emptyPeriod);
                currentTime.setMinutes(currentTime.getMinutes()+30);
                finishedTime.setMinutes(finishedTime.getMinutes()+30);
            }
        }
    
        return emptyClustersStack;
    }

    private sort(arr: Array<IClusterPeriod>) {
        return arr.sort((a: any, b: any) => (a.start.replace(/[^0-9]/gi, '')) - b.start.replace(/[^0-9]/gi, ''));
    }
    
    private formatTime(time: Date): string {
        const hours = String(time.getHours()).padStart(2, "0");
        const minutes = String(time.getMinutes()).padStart(2, "0");
    
        return `${hours}:${minutes}`;
    }

}





