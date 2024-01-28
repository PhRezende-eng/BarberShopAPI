class TokenModel {
    iat?: number;
    exp?: number;
    status?: string;

    constructor(iat?: number, exp?: number, status?: string) {
        this.iat = iat;
        this.exp = exp;
        this.status = status;
    }
}