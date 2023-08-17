import axios from 'axios';
import { encryptData } from '../encryption_decryption/Encryption';
import { decryptData } from '../encryption_decryption/Decryption';

async function DepositInvestment(userId, amount) {
  try {
    const releaseBody = {
      userId: userId,
      amount: amount
    };
    console.log(releaseBody, "api")
    const encryptedPostData = await encryptData(releaseBody);
    console.log(encryptedPostData, "encrypted data DepositInvestment")


    const response = await axios.post(`${import.meta.env.VITE_APP_API}/api/users/deposit-in-user-account`,
      { data: encryptedPostData },
      {
        headers: {
          "Content-Type": "application/json",
        },
      });

    const encryptedData = response.data.data;

    // Decrypt the encrypted data
    const decryptedData = await decryptData(encryptedData);
    console.log('Decrypted response:', decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data From DepositInvestment:', error);
    return [];
  }
}

export default DepositInvestment;