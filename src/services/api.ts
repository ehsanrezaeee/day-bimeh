import axios from 'axios';
import {BranchResource, County, Province} from "./types.ts";

const apiClient = axios.create({
    baseURL: 'https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createOTP = async (phone_number:any) => {
    const response = await apiClient.post('create_otp/', { phone_number });
    return response.data;
};
export const validateOTP = async (code:any, phone_number:any) => {
    const response = await apiClient.post('validate_otp/', { code,phone_number });
    return response.data;
};
export const checkAgency = async (agent_code:any) => {
    const response = await apiClient.post('check_agency_code/', { agent_code });
    return response.data;
};

export const getProvinces = async () : Promise<Province[]> => {
    const response = await axios.get('https://stage.api.sanaap.co/base/provinces_wop/');
    return response.data;
};

export const getCounties = async (id:string) : Promise<County[]> => {
    const response = await axios.get(`https://stage.api.sanaap.co/base/counties_wop?province=${id}`);
    return response.data;
};

export const getBranch = async (id:string,name:string) : Promise<BranchResource> => {
    const response = await axios.get(`https://stage.api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/?province=${id}&insurance=DEY&name=${name}`);
    return response.data;
};

export const registerAgent = async (agent:Record<string, any>) => {
    const response = await apiClient.post('/', { ...agent });
    return response.data;
};
