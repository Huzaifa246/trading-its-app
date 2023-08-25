import axios from 'axios';
import { UserHeader } from '../header';
import { decryptData } from '../encryption_decryption/Decryption';
import { encryptData } from '../encryption_decryption/Encryption';

async function UpdatePasswordApi(userId, oldPassword, newPassword) {
    try {
        const releaseBody = {
            userId : userId,
            oldPassword: oldPassword,
            newPassword: newPassword
        };
        console.log(releaseBody, "api")
        const encryptedPostData = await encryptData(releaseBody);
        console.log(encryptedPostData, "encrypted data")


        const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/users/update-password`,
            { data: encryptedPostData },
            { headers: UserHeader });
        const encryptedData = response.data.data;

        const decryptedData = await decryptData(encryptedData);
        console.log('Decrypted response:', decryptedData);
        return decryptedData;
    } catch (error) {
        console.error('Error fetching data From Update Pass API:', error);
        return [];
    }
}

export default UpdatePasswordApi;