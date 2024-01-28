class Response {
    data: string | Object;
    error?: string | Object;
    status_code: number;
    status_message: string;
    access_token?: string | Object;
    refresh_token?: string | Object;
    type?: string;

    constructor(
        data?: string | Object,
        status_code?: number,
        status_message?: string,
        access_token?: string | Object,
        refresh_token?: string | Object,
        type?: string,
        error?: string,
    ) {
        this.data = data ?? "Ok";
        this.status_code = status_code ?? 200;
        this.status_message = status_message ?? "Success";
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.type = type;
        this.type = error;
    };


    static error(message: string, status?: number) {
        const response = new Response();
        response.error = message;
        response.status_code = status ?? 500;
        response.status_message = "Error";
        return response;
    }

}


export default Response;