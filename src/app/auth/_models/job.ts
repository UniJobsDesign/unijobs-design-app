export class Job {
    id: number;
    description: string;
    hpw: number;
    cost: number;
    uniUserId: number;
    location: string;
    startDate: string;
    endDate: string;
    skillIds: number[] = new Array();
}
