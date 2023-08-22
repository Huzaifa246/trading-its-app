import axios from 'axios';
import { decryptData } from '../encryption_decryption/Decryption';
import { AdminHeader } from '../header';

async function fetchCharUserTrade(tradeId, startDate, endDate) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/users/graph-data/${tradeId}/${startDate}/${endDate}`;
    console.log(url);

    const response = await axios.get(url,{
      headers: AdminHeader,
    }
  );
    const encryptedData = response.data.data;
    const decryptedData = await decryptData(encryptedData);

    console.log(decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at Past Trade:', error);
    return [];
  }
}

export default fetchCharUserTrade;
