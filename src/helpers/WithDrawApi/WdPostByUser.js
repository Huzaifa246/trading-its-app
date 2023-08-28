import axios from 'axios';
import { encryptData } from '../encryption_decryption/Encryption';
import { decryptData } from '../encryption_decryption/Decryption';
import { UserHeader } from '../header';

async function WdPostByUser(userId, amount, idOfSender) {
  try {
    const releaseBody = {
      amount: amount,
      idOfSender: idOfSender
    };
    console.log(releaseBody, "api")
    const encryptedPostData = await encryptData(releaseBody);
    console.log(encryptedPostData, "encrypted data Withdraw PostByUser")


    const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/users/user-withdraw/${userId}`,
      { data: encryptedPostData },
      {
        headers: UserHeader,
      });

    const encryptedData = response.data.data;

    // Decrypt the encrypted data
    const decryptedData = await decryptData(encryptedData);
    console.log('Decrypted response:', decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data From Withdraw PostByUser:', error);
    return [];
  }
}

export default WdPostByUser;