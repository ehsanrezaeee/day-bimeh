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
