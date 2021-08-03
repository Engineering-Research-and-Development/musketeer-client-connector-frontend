export class Datasets {
    training?: DataFile;
    validation?: DataFile;
    test?: DataFile;

    constructor() {
        // this.validation = null;
        // this.test = null;
    }
}

export class DataFile {
    _id: string;
    name: string;
    path: string;
    dimension?: number;
    added?: string;
    format: 'csv' | 'pkl';
    header?: boolean;
    label?: boolean;

    constructor() {
        this.name = '';
        this.path = '';
        this.format = 'csv';
        this.header = false;
        this.label = false;
    }
}

export class FileSpecs {
    type: string;
    spec: DataFile;

    constructor(dataFile: DataFile) {
        this.type = 'FileSystem';
        this.spec = dataFile;
    }
}