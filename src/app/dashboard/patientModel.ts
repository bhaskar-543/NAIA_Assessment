import { patientHistory } from "../history/patientHistoryModel";

export class patient {
    id?: number;
    name: string;
    age: number;
    sex: string;
    checkIn: string;
    history?:patientHistory;

    constructor(obj:any) {
        this.id = (obj.id)? obj.id :undefined;
        this.name = obj.name;
        this.age = obj.age;
        this.sex = obj.sex;
        this.checkIn = obj.checkIn;
        this.history = obj.history

    }
}