export class User {

    firstname: string;
    lastname: string;
    password: string;
    email: string;

    constructor(firstname: string, lastname: string, password: string, email: string) {
        this.firstname  = firstname;
        this.lastname   = lastname;
        this.password   = password;
        this.email      = email;
    }
}
