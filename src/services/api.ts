import axios from 'axios';

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
