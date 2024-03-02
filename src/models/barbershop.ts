export class BarbershopModel {
    id: number;
    user_id: number;
    name: string;
    email: string;
    opening_days: string[];
    opening_hours: number[];

    constructor(id: number, name: string, user_id: number, email: string, opening_days: string[], opening_hours: number[]) {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.opening_days = opening_days;
        this.opening_hours = opening_hours;
    }
}