import { Privacy } from './privacy';

export interface Algorithm {
    id: number;
    name: string;
    type: 'clustering' | 'classification' | 'regression' | 'preprocessing';
    POM: Privacy;
    label: string;
    description: string;
    properties: Property[];
}

export interface Property {
    name: string;
    label: string;
    defaultValue?: number | string;
    type: string;
    description: string;
    value?: number | string;
    options?: any[];
}