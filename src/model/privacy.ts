export enum Privacy {
    POM1 = 1,
    POM2 = 2,
    POM3 = 3,
    POM4 = 4,
    POM5 = 5,
    POM6 = 6,
    POM7 = 7,
    POM8 = 8,
}

export class PrivacyLevel {
    name?: string;
    privacy: Privacy;
    description: string;
    label: string;
    specs?: Specs;
}

interface Specs {
    privacy: number;
    storage: number;
    overload: number;
    communication: number;
    accountability: number;
    client: boolean;
    server: boolean;
}