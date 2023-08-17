import axios from 'axios';
import { decryptData } from '../encryption_decryption/Decryption';

async function fetchPastUserTrade(tradeId, startDate, endDate) {
  try {
    let url = `${import.meta.env.VITE_APP_API}/api/users/graph-data/${tradeId}/${startDate}/${endDate}`;
    // const queryParams = [];

    // if (startDate !== "" && endDate !== "") {
    //   queryParams.push(`${encodeURIComponent(startDate)}`);
    //   queryParams.push(`${encodeURIComponent(endDate)}`);
    // }

    // if (queryParams.length > 0) {
    //   url += `/${queryParams.join('/')}`;
    // }

    console.log(url);

    const response = await axios.get(url);
    const encryptedData = response.data.data;
    const decryptedData = await decryptData(encryptedData);

    console.log(decryptedData);
    return decryptedData;
  } catch (error) {
    console.error('Error fetching data at Past Trade:', error);
    return [];
  }
}

export default fetchPastUserTrade;
