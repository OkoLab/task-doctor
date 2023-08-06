import App from "./App";
import { IClusterPeriod } from "./Interfaces";

const busy: Array<IClusterPeriod> = [
    { start: "10:30", stop: "10:50" },
    { start: "18:40", stop: "18:50" },
    { start: "14:40", stop: "15:50" },
    { start: "16:40", stop: "17:20" },
    { start: "20:05", stop: "20:20" },
  ];
  
const app = new App("09:00", "21:00", 30);
console.log(app.result(busy));