import axios from 'axios';
import { decryptData } from '../encryption_decryption/Decryption';
import { UserHeader } from '../header';

async function fetchAllReferral(userId) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_API}/api/users/referral-get-by-user/${userId}`
      , {
        headers: UserHeader,
      }
    );
    const encryptedData = response.data.data;
    const decryptedData = await decryptData(encryptedData);
    console.log(decryptedData)
    return decryptedData;
  } catch (error) {
    console.log(response.message)
    console.error('Error fetching data:', error);
    return error;
  }
}

export default fetchAllReferral;