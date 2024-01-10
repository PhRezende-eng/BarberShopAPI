class Schedule {
    id: number;
    barbershop_id: number;
    user_id: number;
    client_name: string;
    date: string;
    time: number;

    constructor(id: number, barbershop_id: number, user_id: number, client_name: string, date: string, time: number) {
        this.id = id;
        this.barbershop_id = barbershop_id;
        this.user_id = user_id;
        this.client_name = client_name;
        this.date = date;
        this.time = time;
    }
}