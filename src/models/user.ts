abstract class UserModel {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    profile: string;
    password: string;

    constructor(id: number, name: string, email: string, profile: string, password: string, avatar?: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatar = avatar;
        this.profile = profile;
        this.password = password;
    }
}

export class UserADMModel extends UserModel {
    work_days?: string[];
    work_hours?: number[];

    constructor(id: number, name: string, email: string, profile: string, password: string, avatar: string | null, work_days?: string[], work_hours?: number[]) {
        super(id, name, email, profile, password, avatar || undefined);
        this.work_days = work_days;
        this.work_hours = work_hours;
    }
}

export class UserEmployeeModel extends UserModel {
    barber_shop_id: number;
    work_days: string[];
    work_hours: number[];

    constructor(id: number, name: string, email: string, barber_shop_id: number, work_days: string[], work_hours: number[], profile: string, password: string, avatar: string | null) {
        super(id, name, email, profile, password, avatar || undefined);
        this.barber_shop_id = barber_shop_id;
        this.work_days = work_days;
        this.work_hours = work_hours;
    }
}