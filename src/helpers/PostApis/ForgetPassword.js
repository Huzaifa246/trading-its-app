import axios from 'axios';
import { decryptData } from '../encryption_decryption/Decryption';
import { UserHeader } from './../header';

async function ForgetPassword() {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/users/reset-password`
      ,   {
        headers: UserHeader,
      }
    );
    const encryptedData = response.data.data;
    const decryptedData = await decryptData(encryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at Delete Users Api:', error);
    return [];
  }
}

export default ForgetPassword;