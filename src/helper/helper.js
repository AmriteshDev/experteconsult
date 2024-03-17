import axios from 'axios';

const apiBaseUrl = 'https://api.experteconsult.com/admin';

export async function fetchPostData(url, requestData) {
    try {
        let requestConfig = {
            method: 'post',
            url: `${apiBaseUrl}${url}`,
        };

        const ProfileData = JSON.parse(localStorage.getItem('ProfileData'));

        requestData.AdminID = ProfileData.AdminID;
        requestData.SessionID = ProfileData.SessionID;
        requestConfig.data = requestData;

        const response = await axios(requestConfig);
        return response.data;
    } catch (error) {
        throw error;
    }
}