
export class patientHistory {
    // id?: number;
    basicStats: {
        height: number,
        weight: number
    };
    smoking:string;
    alcoholDrinking:string;
    drugUsage:any;
    surgeries:any;
    otherDrugUsage:string;
    otherSurgery:string;
    

    constructor(obj:any) {
        this.basicStats =obj.basicStats;
        this.smoking = obj.smoking;
        this.alcoholDrinking = obj.alcoholDrinking;
        this.drugUsage = obj.drugUsage;
        this.surgeries = obj.surgeries;
        this.otherDrugUsage =obj.otherDrugUsage;
        this.otherSurgery = obj.otherSurgery;

    }
}