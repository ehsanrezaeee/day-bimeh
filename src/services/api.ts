import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://stage.api.sanaap.co/api/v2/app/DEY/agent/verification/signup/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to send phone number and create OTP
export const createOTP = async (phone_number:any) => {
    const response = await apiClient.post('create_otp/', { phone_number });
    return response.data;
};
