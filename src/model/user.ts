export class User {
    user: string;
    password: string;
    org?: string;

    constructor() {
        this.user = '';
        this.password = '';
        this.org = '';
    }
}