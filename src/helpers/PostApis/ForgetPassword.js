import axios from 'axios';
import { decryptData } from '../encryption_decryption/Decryption';
import { UserHeader } from './../header';

async function ForgetPasswordApi() {
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
    console.error('Email is wrong ERROR:', error);
    return { success: false, message: 'Email is wrong ERROR' };
  }
}

export default ForgetPasswordApi;