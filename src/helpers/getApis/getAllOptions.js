import axios from 'axios';
import { decryptData } from '../encryption_decryption/Decryption';

async function fetchAllTradeOption() {
  try {
    const response = await axios.get('https://itsapp-3606ea51973b.herokuapp.com/api/admin/get-all-trade-options');
    const encryptedData = response.data.data;
    const decryptedData = await decryptData(encryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

export default fetchAllTradeOption;