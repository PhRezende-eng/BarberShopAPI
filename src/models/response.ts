class Response {
    data?: Object;
    status_code?: number;
    status_message?: string;
    access_token?: string;
    refresh_token?: string;

    constructor(data?: Object,
        status_code?: number,
        status_message?: string,
        access_token?: string,
        refresh_token?: string) {
        this.data = data ?? "Ok";
        this.status_code = status_code ?? 200;
        this.status_message = status_message ?? "Success";
        this.data = access_token;
        this.refresh_token = refresh_token;
    };


}


export default Response;