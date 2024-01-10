class User {
    id: number;
    name: string;
    email: string;
    password: string;
    profile: string;
    work_days: string[];
    work_hours: number[];

    constructor(id: number, name: string, email: string, password: string, profile: string, work_days: string[], work_hours: number[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.profile = profile;
        this.work_days = work_days;
        this.work_hours = work_hours;
    }
}