import axios from 'axios';
import { encryptData } from '../encryption_decryption/Encryption';
import { decryptData } from '../encryption_decryption/Decryption';
import { UserHeader } from '../header';

async function UpdateImage(userId, base64String) {
    try {
        const releaseBody = {
            profileImageBase64: base64String,
        };
        console.log(releaseBody, "api")
        const encryptedPostData = encryptData(releaseBody);
        console.log(encryptedPostData, "encrypted data")


        const response = await axios.put(`${import.meta.env.VITE_APP_API}/api/users/update-profile-picture/${userId}`,
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

export default UpdateImage;