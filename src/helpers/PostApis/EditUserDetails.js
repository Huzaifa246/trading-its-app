import axios from 'axios';
import { encryptData } from '../encryption_decryption/Encryption';
import { decryptData } from '../encryption_decryption/Decryption';
import { UserHeader } from '../header';

async function EditUserDetails(userId, fullName, binanceId) {
    try {
        const releaseBody = {
            fullName: fullName,
            binanceId: binanceId
        };
        console.log(releaseBody, "api")
        const encryptedPostData = await encryptData(releaseBody);
        console.log(encryptedPostData, "encrypted data")


        const response = await axios.put(`${import.meta.env.VITE_APP_API}/api/users/user-edit-details/${userId}`,
            { data: encryptedPostData },
            {
                headers: UserHeader
            });

        const encryptedData = response.data.data;

        // Decrypt the encrypted data
        const decryptedData = await decryptData(encryptedData);
        console.log('Decrypted response:', decryptedData);
        return decryptedData;
    } catch (error) {
        console.error('Error fetching data From Release API:', error);
        return [];
    }
}

export default EditUserDetails;