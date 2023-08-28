import axios from 'axios';
import { encryptData } from '../encryption_decryption/Encryption';
import { decryptData } from '../encryption_decryption/Decryption';
import { UserHeader } from '../header';

async function WdPostCancelUser(userId, amount, cancellation = '', withDrawId) {
  try {
    const requestBody = {
      amount: amount,
    };

    const encryptedPostData = await encryptData(requestBody);
    console.log(encryptedPostData, "encrypted data Withdraw PostByUser")

    const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/users/user-withdraw/${userId}?cancellation=${cancellation}&withDrawId=${withDrawId}`,
      { data: encryptedPostData },
      {
        headers: UserHeader,
      });

    console.log(response, "api")

    const encryptedData = response?.data?.data;

    // Decrypt the encrypted data
    const decryptedData = await decryptData(encryptedData);
    console.log('Decrypted response:', decryptedData);
    return decryptedData;

  } catch (error) {
    console.error('Error fetching data From Withdraw PostByUser:', error);
    return error;
  }
}

export default WdPostCancelUser;
