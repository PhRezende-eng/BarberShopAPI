class Response {
    data: string;
    error?: string;
    status_code: number;
    status_message: string;
    access_token?: string;
    refresh_token?: string;
    type?: string;

    constructor(
        data?: string,
        status_code?: number,
        status_message?: string,
        access_token?: string,
        refresh_token?: string,
        type?: string,
        error?: string,
    ) {
        this.data = data ?? "Ok";
        this.error = error;
        this.status_code = status_code ?? 200;
        this.status_message = status_message ?? "Success";
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.type = type;
    };


    static error(message: string, status?: number) {
        const response = new Response();
        response.data = message;
        response.error = message;
        response.status_code = status ?? 500;
        response.status_message = "Error";
        return response;
    }

}


export default Response;