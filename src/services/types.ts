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

export interface County {
    id: number;
    is_active: boolean;
    name: string;
    fanavaran_code: string;
    name_split: string;
    province: Province;
    creator_user?: User;
}

export interface Branch {
    id: number;
    name: string;
    insurance: number;
    province: number;
    county: number;
}

export interface BranchResource {
    status_code: number;
    message: string;
    is_success: boolean;
    error_details: ErrorDetails;
    response: Branch[];
}

export interface TokenResource {
    status_code: number;
    message: string;
    is_success: boolean;
    error_details: ErrorDetails;
    response: {
        access:string;
        refresh:string;
    };
}

export interface agentData {
    address: number;
    agent_type: string;
    agent_code: boolean;
    city_code: number;
    county: number;
    first_name: string;
    last_name: string;
    insurance_branch:number;
    phone: number;
    phone_number: number;
    province:string;
    Name:string

}

