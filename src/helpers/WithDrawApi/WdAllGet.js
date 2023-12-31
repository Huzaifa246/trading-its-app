import axios from 'axios';
import { UserHeader } from '../header';
import { decryptData } from '../encryption_decryption/Decryption';

async function WithDrawAll(userId, status = '', pageNumber) {
  let url = `${import.meta.env.VITE_APP_API}/api/users/get-user-all-withdraw/${userId}/${pageNumber}`;
    try {
      const params = {};
      if (status) {
        params.status = status;
      }

      const response = await axios.get(url, {
        headers: UserHeader,
        params,
      });

      if (response.status === 200) {
        const encryptedData = response.data.data;
        const decryptedData = await decryptData(encryptedData);
        console.log(decryptedData)
        return decryptedData;
      } else {
        console.error(`Failed to fetch data. Status code: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching data at getWithdrawals:', error);
      return null;
    }
  }

export default WithDrawAll;
