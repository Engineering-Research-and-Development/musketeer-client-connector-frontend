import { Privacy } from './privacy';
import { Status } from './task-status';

export class Task {
    id: number;
    name: string;

    // task definition
    quorum: number;
    round: number;
    epoch: number;

    // task details
    data?: any;
    target?: any;
    reward?: any;
    algorithm?: any;
    privacy: Privacy;
    participants: string[];
    initiator: string;
    start: string;
    status: Status;
    generalDescription?: string;
    featuresDescription?: string;

    constructor() {
        this.name = '';
        this.privacy = Privacy.POM1;
        this.participants = [];
        this.initiator = '';
        this.algorithm = null;
        this.start = '';
        this.quorum = 1;
        this.round = 1;
        this.epoch = 1;
        this.status = Status.CREATED;
    }
}