class BarbershopModel {
    id: number;
    user_id: number;
    name: string;
    email: string;
    opening_day: string[];
    opening_hours: number[];

    constructor(id: number, name: string, user_id: number, email: string, opening_day: string[], opening_hours: number[]) {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.opening_day = opening_day;
        this.opening_hours = opening_hours;
    }
}