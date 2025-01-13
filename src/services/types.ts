export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
}

export interface Province {
    id: number;
    code: string;
    country: number;
    creator_user: User;
    is_active: boolean;
    name: string;
    name_split: string;
}

export interface ErrorDetails {
    type: string;
    code: string;
    detail: string;
    attr: string;
    fa_details: string;
}

export interface ResponseData {
    status_code: number;
    message: string;
    is_success: boolean;
    error_details: ErrorDetails;
    response: null;
}
