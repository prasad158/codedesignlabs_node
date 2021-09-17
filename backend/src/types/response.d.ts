interface IBody {
    success: boolean;
    data?: any;
    msg?: string;
    stack?: any
    error?: any;
    token?: string;
}

declare namespace Express {
    export interface Response {
        sendRes: (status: number, body: IBody) => void;
    }
}