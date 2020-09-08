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
    name: string;
    path: string;
    dimension?: number;
    added?: string;
    format: string;
    header: boolean;

    constructor() {
        this.name = '';
        this.path = '';
        this.format = 'csv';
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